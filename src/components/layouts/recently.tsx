"use client";

import type { RecentlyModel } from "@mx-space/api-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteConfig } from "@/config";
import { motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import React from "react";

interface RecentliesProps {
	Recentlies: RecentlyModel[];
}

export const TimelineRecentlyLayout: React.FC<RecentliesProps> = ({ Recentlies }) => {
	return (
		<>
			<div className="w-full flex flex-col items-start mb-6 px-4 sm:px-6 lg:px-8">
				<motion.h1
					className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-10"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<mark className="line">动态</mark>
					<div className="mt-4 text-sm text-muted-foreground max-w-2xl whitespace-pre-line">
						{`"每一步都在寻找，属于自己的光。"

在这条路上，悄悄走过每个晨曦 | 不需要大声宣告，也不怕孤单
不必急于追寻远方，步伐已在心中轻轻起舞 | 每一次转身，都是心底的坚定
偶尔迷失，也不过是寻找到更好的自己 | 在平凡的日子里，悄然期待着某个瞬间的不同
只是那些小小的坚持，让一切变得真实而温暖 | 直到有一天，所有的点滴拼凑成属于我的故事。

今天的我，正一步一步走向明天的自己`}
					</div>
				</motion.h1>
			</div>
			<div className="ml-24 ontainer mx-auto px-4 py-8 max-w-4xl">
				<div className="relative mt-5">
					{/* Timeline line */}
					<div className="absolute left-0 w-0.5 h-full bg-gray-200" />

					{Recentlies.map((recently, index) => (
						<motion.div
							key={recently.id}
							className="mb-8 flex items-start w-full relative pl-8"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="w-full">
								<Card className="w-full">
									<CardHeader>
										<div className="flex items-center space-x-4">
											<Avatar>
												<AvatarImage src={SiteConfig.Avatar} alt={SiteConfig.master} />
												<AvatarFallback>{SiteConfig.master[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">{SiteConfig.master}</p>
												<p className="text-xs text-muted-foreground">
													<Clock className="inline-block w-3 h-3 mr-1" />
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
									<CardFooter className="text-sm text-muted-foreground">
										<MessageCircle className="w-4 h-4 mr-2" />
										<span>
											ID:
											{recently.id}
										</span>
									</CardFooter>
								</Card>
							</div>
							{/* Timeline dot */}
							<div className="absolute left-0 top-6 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
						</motion.div>
					))}
				</div>
			</div>
		</>
	);
};

export default TimelineRecentlyLayout;
