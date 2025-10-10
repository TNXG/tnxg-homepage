"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FriendCard } from "@/components/friend-card";
import { SubmitFriendForm } from "@/components/submit-friend";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FriendsConfig, SiteConfig } from "@/config";

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
		const timerId = setTimeout(() => {
			setShuffledFriends(newShuffledFriends);
		}, 0);

		return () => {
			clearTimeout(timerId);
		};
	}, [friends]);

	return (
		<div className="mx-auto mb-10 mt-6 px-4 flex flex-col max-w-6xl items-start lg:px-10 sm:px-6">
			<motion.h1
				className="text-3xl tracking-tight font-bold mt-12 lg:text-5xl sm:text-4xl"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<mark className="line">{t(FriendsConfig.title)}</mark>
				<p className="text-muted-foreground text-sm leading-relaxed mt-6 max-w-2xl">
					{t(FriendsConfig.description.text)}
					{" "}
					<mark>
						<Link
							href={FriendsConfig.description.link.url}
							target="_blank"
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-105"
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
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-105"
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
							className="text-[#3388BB] transition-all duration-300 ease-in-out hover:text-[#FF5522] hover:scale-105"
						>
							{t("friends.opml.followList")}
						</Link>
					</mark>
				</p>
				<div className="mt-2 flex justify-start">
					<SubmitFriendForm />
				</div>
			</motion.h1>
			<div className="fade-in animate-in mx-auto mt-2 px-2 py-10 flex flex-col max-w-6xl w-full duration-500 items-center sm:px-4">
				{shuffledFriends.length === 0
					? (
							<div className="border-border/50 px-6 py-10 text-center border rounded-2xl bg-white/70 max-w-2xl w-full transition-all backdrop-blur-md dark:bg-gray-800/70 hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1">
								<h2 className="text-xl tracking-tight font-semibold">{t("common.empty.title", { default: "暂无友链" })}</h2>
								<p className="text-muted-foreground mt-2">{t("common.empty.description", { default: "暂时没有可展示的友链，请稍后再来或提交你的站点～" })}</p>
								<div className="mt-4 flex justify-center"><SubmitFriendForm /></div>
							</div>
						)
					: (
							<TooltipProvider delayDuration={200}>
								<div id="friend-card" className="gap-6 grid grid-cols-1 w-full sm:gap-8 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
									{shuffledFriends.map(friend => (
										<FriendCard key={friend.id ?? friend.name} friend={friend} />
									))}
								</div>
							</TooltipProvider>
						)}
			</div>
		</div>
	);
};

export default FriendsLayout;
