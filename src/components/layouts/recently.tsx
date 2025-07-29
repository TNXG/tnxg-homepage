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
		<div className="mb-6 mt-5 px-2 flex flex-col w-full items-start lg:px-6 sm:px-4">
			<motion.h1
				className="text-2xl font-bold mt-8 lg:text-4xl sm:text-3xl sm:mt-10"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line">{t(RecentlyConfig.title)}</mark>
				<div className="text-muted-foreground text-sm mt-4 max-w-full whitespace-pre-wrap break-words sm:max-w-[80%]">
					{t(RecentlyConfig.description)}
				</div>
			</motion.h1>

			<div className="mx-auto ml-4 px-2 py-6 max-w-[95%] w-full sm:ml-8 sm:px-4 sm:py-8 lg:max-w-4xl sm:max-w-2xl">
				<div className="mt-5 relative">
					<div className="bg-gray-200 h-full w-0.5 left-0 absolute" />

					{Recentlies.map((recently, index) => (
						<motion.div
							key={recently.id}
							className="mb-6 pl-6 flex w-full items-start relative sm:mb-8 sm:pl-8"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="w-full">
								<Card className="w-full">
									<CardHeader>
										<div className="flex items-center space-x-4">
											<Avatar className="rounded-full">
												<AvatarImage src={SiteConfig.Avatar} alt={t(SiteConfig.master)} />
												<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">{t(SiteConfig.master)}</p>
												<p className="text-muted-foreground text-xs">
													<Clock className="mr-1 size-3 inline-block" />
													{format(new Date(recently.created), "yyyy-MM-dd HH:mm:ss")}
												</p>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div
											className="prose max-w-none"
											// eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
											dangerouslySetInnerHTML={{
												__html: (recently.content || "文章获取失败"),
											}}
										/>
									</CardContent>
									<Separator className="my-2" />
									<CardFooter className="text-muted-foreground text-sm">
										<MessageCircle className="mr-2 size-4" />
										<span>
											ID:
											{recently.id}
										</span>
									</CardFooter>
								</Card>
							</div>
							<div className="bg-primary rounded-full size-4 left-0 top-6 absolute -translate-x-1/2" />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimelineRecentlyLayout;
