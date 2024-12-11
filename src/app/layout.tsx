import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SidebarLayout } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import { SiteConfig } from "@/config";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		template: `%s | ${SiteConfig.title}`,
		default: `${SiteConfig.title} - ${SiteConfig.description}`,
	},
};

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange={true}>
					<SidebarLayout>
						{children}
						<Background />
					</SidebarLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}

export default RootLayout;
