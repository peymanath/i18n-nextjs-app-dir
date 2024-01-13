"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, i18n, langName } from "@/dictionary";

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
	const pathName = usePathname();

	const redirectedPathName = (locale: string) => {
		if (!pathName) return "/";

		const pathnameIsMissingLocale = i18n.locales.every(
			locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`,
		);

		if (pathnameIsMissingLocale) {
			if (locale === i18n.defaultLocale) return pathName;
			return `/${locale}${pathName}`;
		} else {
			if (locale === i18n.defaultLocale) {
				const segments = pathName.split("/");
				const isHome = segments.length === 2;
				if (isHome) return "/";

				segments.splice(1, 1);
				return segments.join("/");
			}

			const segments = pathName.split("/");
			segments[1] = locale;
			return segments.join("/");
		}
	};

	return (
		<ul>
			{i18n.locales.map(locale => {
				return (
					<li key={locale}>
						<Link href={redirectedPathName(locale)}>{langName[locale]}</Link>
					</li>
				);
			})}
		</ul>
	);
}
