import { Background } from "@/components/background";
import { SidebarLayout } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange={true}>
					<SidebarLayout>
						<div className="ml-0 lg:ml-96">
							{children}
							<Background />
						</div>
					</SidebarLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}

export default RootLayout;
