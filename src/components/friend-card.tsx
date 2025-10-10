"use client";

import type { Arch } from "@/lib/icon";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getArchIcon, getDomain, getDomainIcon, getFavicon, getMainDomain } from "@/lib/icon";
import { cn } from "@/lib/utils";

export interface FriendCardProps {
	friend: Friend;
	className?: string;
}

export const FriendCard = React.memo<FriendCardProps>(({ friend, className }) => {
	const memoizedData = useMemo(() => ({
		title: friend.name,
		domainTip: getMainDomain(friend.url, true),
		domainIcon: getDomainIcon(friend.url),
		siteIcon: getFavicon(getDomain(friend.url)),
	}), [friend.url, friend.name]);

	// 格式化友链加入时间
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString("zh-CN", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
		} catch {
			return dateString;
		}
	};

	const { title, domainTip, domainIcon, siteIcon } = memoizedData;

	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild>
				<Link
					href={friend.url}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"group flex items-start gap-3 w-full max-w-xl mx-auto",
						"px-4 py-3 sm:px-5 sm:py-4 rounded-xl",
						"bg-white/70 backdrop-blur-md dark:bg-gray-800/70",
						"border border-border/50",
						"transition-transform duration-200 motion-reduce:transition-none",
						"hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/10",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						className,
					)}
				>
					<div className="relative">
						<Avatar className="rounded-full bg-white size-11 ring-1 ring-black/5 shadow-sm sm:size-12 dark:ring-white/10">
							<AvatarImage src={friend.avatar} alt={friend.name} loading="lazy" decoding="async" />
							<AvatarFallback>{friend.name?.[0] ?? "?"}</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-base leading-snug tracking-tight font-semibold truncate sm:text-lg">{friend.name}</p>
						<p className="text-muted-foreground text-sm leading-relaxed mt-1 truncate sm:text-base">
							{friend.description}
						</p>
					</div>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="top" className="p-0 max-w-md">
				<Card className="border-0 bg-white/70 shadow-lg backdrop-blur-md dark:bg-gray-800/70">
					<div className="px-4 py-3 flex gap-2.5 items-center">
						{/* site icon - 使用站点的 favicon */}
						<Avatar className="rounded-full size-6">
							<AvatarImage src={siteIcon} alt={`${friend.name} site icon`} loading="lazy" decoding="async" />
							<AvatarFallback>
								<Icon icon="ph:globe" className="opacity-60 size-4" />
							</AvatarFallback>
						</Avatar>
						<div className="me-2 flex-1">
							<h3 className="text-base font-semibold truncate">{title}</h3>
							<code className="text-xs opacity-80" title={domainTip}>
								<span>{getDomain(friend.url)}</span>
								{domainIcon && <Icon icon={domainIcon} className="ms-1 align-super opacity-80 size-3 inline" />}
							</code>
						</div>
						<div className="gap-1.5 hidden items-center sm:flex">
							{friend.techstack?.slice(0, 6).map(arch => (
								<span key={arch} title={arch}>
									<Icon icon={getArchIcon(arch as Arch)} className="text-primary size-5" />
								</span>
							))}
						</div>
					</div>
					<div className="bg-background/90 px-4 py-3 border-t rounded-b-xl relative overflow-hidden">
						{/* 友链加入时间 - 背景大字体显示 */}
						<div className="text-3xl font-bold opacity-10 pointer-events-none whitespace-nowrap absolute -bottom-1 -right-1">
							{formatDate(friend.created)}
						</div>
						<p className="text-sm leading-relaxed relative z-10 line-clamp-3">{friend.description}</p>
					</div>
				</Card>
			</TooltipContent>
		</Tooltip>
	);
});

export default FriendCard;
