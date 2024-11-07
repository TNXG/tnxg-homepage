import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarLayout } from "@/components/sidebar";
import Background from "@/components/background";

const images = ["https://cdn.tnxg.top/images/cover/119207866_p0_nst.png"];

const image = images[Math.floor(Math.random() * images.length)];

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="zh" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SidebarLayout>
						<div className="ml-0 lg:ml-60" id="main">
							{children}
							<Background imageUrl={image} />
						</div>
					</SidebarLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
