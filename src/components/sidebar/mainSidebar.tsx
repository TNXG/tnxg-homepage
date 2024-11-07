"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import { SidebarConfig, SiteConfig } from "@/config";

export default function SidebarLayout({
	children,
}: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const Navigation = () => (
		<Card className="mx-2">
			<CardContent>
				<SidebarMenu className="mt-2">
					{SidebarConfig.sections.map((item) => (
						<SidebarMenuItem key={item.name} className="mt-2">
							<SidebarMenuButton asChild isActive={pathname === item.href}>
								<Link href={item.href}>
									<Icon icon={item.icon} className="mr-2 h-4 w-4" />
									{item.name}
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
							<Avatar>
								<AvatarImage src={SiteConfig.Avatar} alt="Avatar" />
							</Avatar>
							<h1 className="text-base font-bold">{SiteConfig.title}</h1>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<Navigation />
					</SidebarContent>
					<SidebarFooter>
						<Separator className="mx-4 border-2" />
						<div className="text-center mt-5 text-sm lg:text-base mb-2">
							<p>
								{SidebarConfig.copyright.text.replace(
									"{{date}}",
									`${new Date().getFullYear()}`,
								)}
							</p>
							<p className="text-sm">
								Designed by{" "}
								<a
									href="https://github.com/TNXG/tnxg-homepage"
									target="_blank"
									rel="noreferrer"
									className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
								>
									tnxg-homepage
								</a>
							</p>
						</div>
					</SidebarFooter>
				</Sidebar>

				<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
					<DrawerTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="fixed left-4 top-4 md:hidden"
						>
							<Icon
								icon="mingcute:menu-line"
								className="h-[1.2rem] w-[1.2rem]"
							/>
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>{SiteConfig.title}</DrawerTitle>
							<DrawerDescription>{SiteConfig.description}</DrawerDescription>
						</DrawerHeader>
						<div className="p-4">
							<Navigation />
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button variant="outline">Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<main>{children}</main>
			</div>
		</SidebarProvider>
	);
}
