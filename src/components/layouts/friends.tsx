"use client";

import type { Arch } from "@/lib/icon";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FriendsConfig, SiteConfig } from "@/config";
import { getArchIcon } from "@/lib/icon";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FriendsProps {
	friends: Friend[];
}

export const FriendsLayout: React.FC<FriendsProps> = ({ friends }) => {
	const t = useTranslations();
	const [shuffledFriends, setShuffledFriends] = useState<Friend[]>([]);

	useEffect(() => {
		const shuffleArray = (array: Friend[]) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]];
			}
		};

		const newShuffledFriends = [...friends];
		shuffleArray(newShuffledFriends);
		setShuffledFriends(newShuffledFriends);

		// Add touch device support for hover effect
		const cards = document.querySelectorAll("#friend-card > *");
		cards.forEach((card) => {
			card.addEventListener("touchstart", () => {
				card.classList.add("group-hover");
			});
			card.addEventListener("touchend", () => {
				card.classList.remove("group-hover");
			});
		});

		return () => {
			cards.forEach((card) => {
				card.removeEventListener("touchstart", () => {});
				card.removeEventListener("touchend", () => {});
			});
		};
	}, [friends]);

	return (
		<div className="mb-6 mt-5 flex flex-col items-start px-4 sm:px-6 lg:px-8">
			<motion.h1
				className="mt-10 text-2xl font-bold sm:text-3xl lg:text-4xl"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line">{t(FriendsConfig.title)}</mark>
				<p className="text-muted-foreground mt-6 max-w-2xl text-sm leading-relaxed">
					{t(FriendsConfig.description.text)}
					{" "}
					<mark>
						<Link
							href={FriendsConfig.description.link.url}
							target="_blank"
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[#FF5522]"
						>
							{t(FriendsConfig.description.link.text)}
						</Link>
					</mark>
					{" "}
					{t(FriendsConfig.description.suffix)}
					<br />
					{t("friends.opml.text")}
					{" "}
					<mark>
						<Link
							href={SiteConfig.opmlURL}
							target="_blank"
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[#FF5522]"
						>
							{t("friends.opml.link.text")}
						</Link>
					</mark>
					{" "}
					{t("friends.opml.suffix")}
					{" "}
					<mark>
						<Link
							href={SiteConfig.followListURL}
							target="_blank"
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[#FF5522]"
						>
							{t("friends.opml.followList")}
						</Link>
					</mark>
				</p>
			</motion.h1>
			<div className="animate-in fade-in container mx-auto mt-2 flex flex-col items-center px-4 py-12 duration-500">
				<div id="friend-card" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
					{shuffledFriends.map(friend => (
						<Card
							key={`${friend.name}`}
							className="group relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
						>
							<CardContent className="p-4">
								<a href={friend.url} target="_blank" rel="noopener noreferrer" className="block">
									<div className="flex flex-col items-center">
										<Avatar className="mb-3 size-20 rounded-full transition-all duration-300 group-hover:opacity-40 group-hover:blur-sm sm:mb-4 sm:size-24 md:size-28 lg:size-32">
											<AvatarImage src={friend.avatar} alt={friend.name} />
											<AvatarFallback>{friend.name[0]}</AvatarFallback>
										</Avatar>
										<h3 className="text-center text-base font-semibold sm:text-lg">{friend.name}</h3>
									</div>
									<div
										id="friend-card-hover"
										className="bg-background/60 absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
									>
										<h3 className="text-shadow-sm mb-2 text-base font-semibold sm:text-lg">{friend.name}</h3>
										<p
											className="text-muted-foreground text-shadow-sm mb-2 overflow-hidden text-ellipsis text-xs sm:mb-4 sm:text-sm"
											style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
										>
											{friend.description}
										</p>
										<p className="text-muted-foreground text-shadow-sm mb-2 max-w-full truncate text-xs sm:mb-4">
											{friend.url}
										</p>
										<div className="mt-2 flex flex-wrap justify-center gap-2">
											{friend.techstack.map((tech, index) => (
												<TooltipProvider key={index} delayDuration={100}>
													<Tooltip>
														<TooltipTrigger>
															<Icon icon={getArchIcon(tech as Arch)} className="text-primary size-6" />
														</TooltipTrigger>
														<TooltipContent>
															<p>{tech}</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											))}
										</div>
									</div>
								</a>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default FriendsLayout;
