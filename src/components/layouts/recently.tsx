"use client";

import type { RecentlyModel } from "@mx-space/api-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecentlyConfig, SiteConfig } from "@/config";
import { motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface RecentliesProps {
	Recentlies: RecentlyModel[];
}

export const TimelineRecentlyLayout: React.FC<RecentliesProps> = ({ Recentlies }) => {
	const t = useTranslations();
	return (
		<div className="mb-6 mt-5 flex w-full flex-col items-start px-2 sm:px-4 lg:px-6">
			<motion.h1
				className="mt-8 text-2xl font-bold sm:mt-10 sm:text-3xl lg:text-4xl"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line">{t(RecentlyConfig.title)}</mark>
				<div className="text-muted-foreground mt-4 max-w-full whitespace-pre-wrap break-words text-sm sm:max-w-[80%]">
					{t(RecentlyConfig.description)}
				</div>
			</motion.h1>

			<div className="mx-auto ml-4 w-full max-w-[95%] px-2 py-6 sm:ml-8 sm:max-w-2xl sm:px-4 sm:py-8 lg:max-w-4xl">
				<div className="relative mt-5">
					<div className="absolute left-0 h-full w-0.5 bg-gray-200" />

					{Recentlies.map((recently, index) => (
						<motion.div
							key={recently.id}
							className="relative mb-6 flex w-full items-start pl-6 sm:mb-8 sm:pl-8"
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
													<Clock className="mr-1 inline-block size-3" />
													{new Date(recently.created).toLocaleString()}
												</p>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div
											className="prose max-w-none"
											dangerouslySetInnerHTML={{ __html: recently.content }}
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
							<div className="bg-primary absolute left-0 top-6 size-4 -translate-x-1/2 rounded-full" />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimelineRecentlyLayout;
