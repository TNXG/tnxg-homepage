"use client";

import { SidebarAvatar } from "@/components/sidebar/SidebarAvatar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarConfig, SiteConfig } from "@/config";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as React from "react";

export default function SidebarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const Navigation = () => (
		<Card className="mx-2 dark:bg-gray-700">
			<CardContent>
				<SidebarMenu className="mt-2">
					<div className="flex justify-around mb-2">
						<TooltipProvider delayDuration={100}>
							{SidebarConfig.externalLinks.map(item => (
								<Tooltip key={item.name}>
									<TooltipTrigger asChild>
										<Link href={item.href} target="_blank" rel="noopener noreferrer">
											<Button variant="ghost" size="icon" className="dark:text-gray-300 dark:hover:bg-gray-600">
												<Icon icon={item.icon} className="h-5 w-5" />
												<span className="sr-only">{item.name}</span>
											</Button>
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{item.name}</p>
									</TooltipContent>
								</Tooltip>
							))}
						</TooltipProvider>
					</div>
					<Separator className="my-2 dark:bg-gray-600" />
					{SidebarConfig.sections.map(item => (
						<SidebarMenuItem key={item.name} className="mt-1">
							<SidebarMenuButton
								asChild
								isActive={pathname === item.href}
								className="flex h-10 w-full items-center justify-center text-lg dark:text-gray-300 dark:hover:bg-gray-600"
							>
								<Link href={item.href} className="flex items-center">
									<Icon icon={item.icon} className="h-6 w-6 mr-2" />
									<span>{item.name}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</CardContent>
		</Card>
	);

	return (
		<SidebarProvider>
			<div className="flex min-h-screen flex-col md:flex-row">
				<Sidebar className="hidden w-60 border-r md:block">
					<SidebarHeader className="p-4">
						<div className="flex items-center space-x-2">
							<SidebarAvatar />
							<h1 className="text-base font-bold">{SiteConfig.title}</h1>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<Navigation />
					</SidebarContent>
					<SidebarFooter>
						<div className="flex justify-center mt-4 md:mt-0">
							<ThemeSwitcher />
						</div>
						<Separator className="dark:bg-gray-600" />
						<div className="text-center mt-5 text-sm lg:text-base mb-2 dark:text-gray-300">
							<p>{SidebarConfig.copyright.text.replace("{{date}}", `${new Date().getFullYear()}`)}</p>
							<p className="text-sm">
								Designed by
								{" "}
								<Link href="https://github.com/TNXG/tnxg-homepage" target="_blank" className="underline text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-110 dark:text-[#66BBFF] dark:hover:text-[#FF7744]">
									tnxg-homepage
								</Link>
							</p>
						</div>
					</SidebarFooter>
				</Sidebar>

				<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
					<DrawerTrigger asChild>
						<Button variant="outline" size="icon" className="fixed left-4 top-4 md:hidden z-10">
							<Icon icon="mingcute:menu-line" className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="dark:bg-gray-800">
						<DrawerHeader>
							<DrawerTitle className="dark:text-white">{SiteConfig.title}</DrawerTitle>
							<DrawerDescription className="dark:text-gray-300">{SiteConfig.description}</DrawerDescription>
						</DrawerHeader>
						<div className="p-4">
							<Navigation />
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button variant="outline" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<SidebarInset>
					<main>{children}</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
