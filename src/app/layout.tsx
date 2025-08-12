import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Background } from "@/components/background";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SidebarLayout } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Favicon } from "@/components/ui/favicon";

import { Toaster } from "@/components/ui/sonner";

import { SiteConfig } from "@/config";

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

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
	const headersList = await headers();
	const pathname = headersList.get("x-pathname") || "";
	const locale = await getLocale();
	const messages = await getMessages();

	const excludedPaths = ["/signin", "/dashboard"];
	const hideComponents = excludedPaths.includes(pathname);

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<Favicon />
			</head>
			<body>
				<ThemeProvider
					attribute={["class", "data-theme"]}
					defaultTheme="system"
					enableSystem
					storageKey="theme"
					disableTransitionOnChange
				>
					<NextIntlClientProvider messages={messages}>
						{hideComponents
							? (
									<>{children}</>
								)
							: (
									<SidebarLayout>
										{children}
										<Background />
									</SidebarLayout>
								)}
					</NextIntlClientProvider>
				</ThemeProvider>
				<Toaster />
				{!hideComponents && <ScrollToTop />}
			</body>
		</html>
	);
}
