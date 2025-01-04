import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SidebarLayout } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Favicon } from "@/components/ui/favicon";
import { SiteConfig } from "@/config";
import { NextIntlClientProvider } from "next-intl";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: {
			template: `%s | ${t(SiteConfig.title)}`,
			default: `${t(SiteConfig.title)} - ${t(SiteConfig.description)}`,
		},
	};
}

export async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<Favicon />
			</head>
			<body>
				<ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange={true}>
					<NextIntlClientProvider messages={messages}>
						<SidebarLayout>
							{children}
							<Background />
						</SidebarLayout>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

export default RootLayout;
