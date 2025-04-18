import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SidebarLayout } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Favicon } from "@/components/ui/favicon";
import { Toaster } from "@/components/ui/sonner";
import { SiteConfig } from "@/config";
import { NextIntlClientProvider } from "next-intl";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	const title = `${t(SiteConfig.title)} - ${t(SiteConfig.description)}`;
	const description = t(SiteConfig.description);

	return {
		title: {
			template: `%s | ${t(SiteConfig.title)}`,
			default: title,
		},
		description,
		keywords: SiteConfig.keywords,
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
				<ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange>
					<NextIntlClientProvider messages={messages}>
						<SidebarLayout>
							{children}
							<Background />
						</SidebarLayout>
					</NextIntlClientProvider>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}

export default RootLayout;
