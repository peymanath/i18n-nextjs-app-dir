import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/dictionary/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(): string | undefined {
	const lang = i18n.locales.join(",");

	let headers = { "accept-language": `${lang};` };

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;
	const languages = new Negotiator({ headers }).languages();
	const locale = matchLocale(languages, locales, i18n.defaultLocale);
	return locale;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const pathnameIsMissingLocale = i18n.locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	if (pathname.startsWith("/_next") || pathname.includes("/api/") || PUBLIC_FILE.test(pathname)) {
		return;
	}

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale();

		if (locale === i18n.defaultLocale) {
			return NextResponse.rewrite(
				new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url),
			);
		}

		return NextResponse.redirect(
			new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url),
		);
	}
}
