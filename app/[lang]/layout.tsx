import LocaleSwitcher from "@/components/locale-switcher";
import "./globals.css";
import { Locale, dir } from "@/dictionary";

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { lang: Locale };
}) {
	return (
		<html
			lang={params.lang}
			dir={dir[params.lang]}>
			<body>
				<LocaleSwitcher lang={params.lang} />
				{children}
			</body>
		</html>
	);
}
