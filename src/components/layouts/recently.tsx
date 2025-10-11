"use client";

import type { RecentlyModel } from "@mx-space/api-client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecentlyConfig, SiteConfig } from "@/config";

interface RecentliesProps {
	Recentlies: RecentlyModel[];
}

export const TimelineRecentlyLayout: React.FC<RecentliesProps> = ({ Recentlies }) => {
	const t = useTranslations();

	return (
		<div className="mb-10 mt-6 px-2 flex flex-col w-full items-start lg:px-8 sm:px-4">
			<motion.h1
				className="text-2xl tracking-tight font-semibold mt-8 lg:text-4xl sm:text-3xl sm:mt-10"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line from-primary text-transparent to-fuchsia-500 bg-gradient-to-r bg-clip-text">
					{t(RecentlyConfig.title)}
				</mark>
				<div className="text-muted-foreground text-sm leading-relaxed mt-4 max-w-full whitespace-pre-wrap break-words sm:max-w-[80%]">
					{t(RecentlyConfig.description)}
				</div>
			</motion.h1>

			<div className="mx-auto ml-4 px-2 py-6 max-w-[95%] w-full sm:ml-8 sm:px-4 sm:py-8 lg:max-w-4xl sm:max-w-2xl">
				<div className="mt-5 relative">
					{/* Timeline vertical line */}
					<div className="from-primary/40 via-primary/15 dark:from-primary/50 dark:via-primary/20 h-full w-px pointer-events-none left-0 top-0 absolute to-transparent bg-gradient-to-b" />

					{Recentlies.map((recently, index) => (
						<motion.div
							key={recently.id}
							className="group mb-6 pl-6 flex w-full items-start relative sm:mb-8 sm:pl-10"
							initial={{ opacity: 0, x: -24 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: index * 0.06 }}
						>
							{/* Timeline dot */}
							<div className="left-0 top-7 absolute -translate-x-1/2">
								<div className="relative">
									<span className="bg-primary ring-primary/20 rounded-full size-3 block ring-4 shadow-lg" />
									<span className="bg-primary/20 rounded-full opacity-0 transition-opacity duration-300 inset-0 absolute blur-[2px] -m-1 group-hover:opacity-100" />
								</div>
							</div>

							<div className="w-full">
								<Card className="border-border/60 bg-background/60 dark:bg-background/50 hover:border-primary/30 border w-full shadow-sm transition-all duration-300 backdrop-blur-md hover:shadow-lg">
									<CardHeader className="pb-3">
										<div className="flex gap-3 items-center">
											<Avatar className="border-border/50 border rounded-full">
												<AvatarImage src={SiteConfig.Avatar} alt={t(SiteConfig.master)} />
												<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
											</Avatar>
											<div className="min-w-0">
												<p className="text-sm leading-none font-medium truncate">{t(SiteConfig.master)}</p>
												<p className="text-muted-foreground text-xs mt-1 flex gap-1 items-center">
													<Clock className="size-3" />
													<span className="tabular-nums">
														{format(new Date(recently.created), "yyyy-MM-dd HH:mm:ss")}
													</span>
												</p>
											</div>
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<div
											className="prose prose-sm sm:prose-base dark:prose-invert leading-relaxed max-w-none"
											// eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
											dangerouslySetInnerHTML={{
												__html: recently.content || "文章获取失败",
											}}
										/>
									</CardContent>
									<Separator className="my-3" />
									<CardFooter className="text-muted-foreground text-xs justify-between">
										<div className="flex gap-2 items-center">
											<MessageCircle className="size-3.5" />
											<span className="font-mono">
												ID:
												{recently.id}
											</span>
										</div>
										<div className="text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
											{index + 1}
											{" "}
											/
											{Recentlies.length}
										</div>
									</CardFooter>
								</Card>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimelineRecentlyLayout;
