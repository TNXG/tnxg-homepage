"use client";

import type { Arch } from "@/lib/icon";
import type React from "react";
import { SubmitFriendForm } from "@/components/submit-friend";
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

interface Friend {
	name: string;
	url: string;
	avatar: string;
	description: string;
	techstack: string[];
	state: number;
}

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
		// 使用 setTimeout 来异步设置状态，避免在 useEffect 中直接调用 setState
		const timerId = setTimeout(() => {
			setShuffledFriends(newShuffledFriends);
		}, 0);

		// Add touch device support for hover effect
		const cards = document.querySelectorAll("#friend-card > *");

		// Define named functions for event listeners
		const handleTouchStart = (e: Event) => {
			const element = e.currentTarget as HTMLElement;
			element.classList.add("group-hover");
		};

		const handleTouchEnd = (e: Event) => {
			const element = e.currentTarget as HTMLElement;
			element.classList.remove("group-hover");
		};

		cards.forEach((card) => {
			card.addEventListener("touchstart", handleTouchStart);
			card.addEventListener("touchend", handleTouchEnd);
		});

		return () => {
			cards.forEach((card) => {
				card.removeEventListener("touchstart", handleTouchStart);
				card.removeEventListener("touchend", handleTouchEnd);
			});
			clearTimeout(timerId);
		};
	}, [friends]);

	return (
		<div className="mb-6 mt-5 px-4 flex flex-col items-start lg:px-8 sm:px-6">
			<motion.h1
				className="text-2xl font-bold mt-10 lg:text-4xl sm:text-3xl"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line">{t(FriendsConfig.title)}</mark>
				<p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-2xl">
					{t(FriendsConfig.description.text)}
					{" "}
					<mark>
						<Link
							href={FriendsConfig.description.link.url}
							target="_blank"
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-110"
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
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-110"
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
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-110"
						>
							{t("friends.opml.followList")}
						</Link>
					</mark>
				</p>
				<div className="flex justify-start">
					<SubmitFriendForm />
				</div>
			</motion.h1>
			<div className="mx-auto mt-2 px-4 py-12 flex flex-col duration-500 items-center animate-in fade-in container">
				<div id="friend-card" className="gap-4 grid grid-cols-1 sm:gap-6 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
					{shuffledFriends.map(friend => (
						<Card
							key={`${friend.name}`}
							className="group transition-all duration-300 relative overflow-hidden active:scale-95 hover:scale-105"
						>
							<CardContent className="p-4">
								<a href={friend.url} target="_blank" rel="noopener noreferrer" className="block">
									<div className="flex flex-col items-center">
										<Avatar className="mb-3 rounded-full size-20 transition-all duration-300 sm:mb-4 group-hover:opacity-40 lg:size-32 md:size-28 sm:size-24 group-hover:blur-sm">
											<AvatarImage src={friend.avatar} alt={friend.name} />
											<AvatarFallback>{friend.name[0]}</AvatarFallback>
										</Avatar>
										<h3 className="text-base font-semibold text-center sm:text-lg">{friend.name}</h3>
									</div>
									<div
										id="friend-card-hover"
										className="p-4 text-center bg-[#ffffff] opacity-0 flex flex-col transition-opacity duration-300 items-center inset-0 justify-center absolute backdrop-blur-md dark:bg-[#121212]/60 group-hover:opacity-100"
									>
										<h3 className="text-base font-semibold text-shadow-sm mb-2 sm:text-lg">{friend.name}</h3>
										<p
											className="text-xs text-muted-foreground text-shadow-sm mb-2 text-ellipsis overflow-hidden sm:text-sm sm:mb-4"
											style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
										>
											{friend.description}
										</p>
										<p className="text-xs text-muted-foreground text-shadow-sm mb-2 max-w-full truncate sm:mb-4">
											{friend.url}
										</p>
										<div className="mt-2 flex flex-wrap gap-2 justify-center">
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
