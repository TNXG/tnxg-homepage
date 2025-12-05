"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { APIConfig, SiteConfig } from "@/config";
import { getLangIcon } from "@/lib/icon";
import { cn } from "@/lib/utils";

interface SongInfo {
	name: string;
	album: {
		name: string;
		image: string;
	};
	artists: { name: string }[];
}

interface CodeEvent {
	id: number;
	uid: number;
	eventTime: number;
	language: string;
	project: string;
	relativeFile: string;
	absoluteFile: string;
	editor: string;
	platform: string;
	gitOrigin: string;
	gitBranch: string;
}

const CodeEventStatus = ({ codeEvent }: { codeEvent: CodeEvent }) => {
	const t = useTranslations();
	const { platform, editor, project, language, eventTime } = codeEvent;

	// 验证日期是否有效
	const date = new Date(eventTime);
	const isValidDate = eventTime && !Number.isNaN(date.getTime());

	// 检查编辑器和平台信息是否有效
	const hasEditorInfo = editor && platform;

	return (
		<div className="bg-primary/10 dark:bg-primary/20 text-sm p-3 rounded-lg dark:text-gray-200">
			<div>
				{t(SiteConfig.master)}
				{" "}
				<Icon icon={getLangIcon(language)} className="text-lg inline-block" />
				{" "}
				<span className="text-muted-foreground text-xs dark:text-gray-400">{language}</span>
				{" "}
				{t("sidebar.status.busy")}
			</div>
			<p className="font-bold">{project}</p>
			{isValidDate && (
				<p className="text-muted-foreground text-xs mt-1 dark:text-gray-400">
					{t("sidebar.status.codingAt", { time: date.toLocaleString() })}
				</p>
			)}
			{hasEditorInfo && (
				<p className="text-muted-foreground text-xs mt-1 dark:text-gray-400">
					{t("sidebar.status.usingEditorOnPlatform", { editor, platform })}
				</p>
			)}
		</div>
	);
};

export const SidebarAvatar = () => {
	const t = useTranslations();
	const [songInfo, setSongInfo] = useState<SongInfo | null>(null);
	const [codeEvent, setCodeEvent] = useState<CodeEvent | null>(null);
	const [imageLoading, setImageLoading] = useState(true);
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		const codeEventSource: EventSource = new EventSource(`${APIConfig.endpoints.space_status}/codetime?sse=true&interval=5000`);
		const songEventSource: EventSource = new EventSource(`${APIConfig.endpoints.status}/ncm?sse=true`);

		songEventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.song) {
					setSongInfo(data.song);
				}
			} catch (error) {
				console.error("Error parsing song message:", error);
			}
		};

		codeEventSource.onmessage = (event) => {
			try {
				const data: CodeEvent = JSON.parse(event.data);
				if (data) {
					setCodeEvent(data);
				}
			} catch {
				console.warn("Error parsing code event message:", event.data);
			}
		};

		songEventSource.onerror = () => {
			console.warn("Song EventSource failed");
			songEventSource.close();
		};

		codeEventSource.onerror = () => {
			console.warn("Code EventSource failed");
			codeEventSource.close();
		};

		return () => {
			songEventSource.close();
			codeEventSource.close();
		};
	}, []);

	useEffect(() => {
		if (imgRef.current) {
			const observer = new MutationObserver(() => {
				setImageLoading(true);
			});

			observer.observe(imgRef.current, { attributes: true, attributeFilter: ["src"] });

			return () => observer.disconnect();
		}
	}, [imgRef.current]);

	const getAlbumImage = () => {
		if (!songInfo?.album?.image)
			return null;
		return songInfo.album.image;
	};

	const albumImage = getAlbumImage();
	const onlineStatus = songInfo || codeEvent;

	return (
		<div className="relative">
			{onlineStatus
				? (
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Avatar className="rounded-full transition-transform hover:scale-105">
										<AvatarImage
											src={SiteConfig.Avatar}
											alt={t("sidebar.status.avatarAlt")}
											loading="lazy"
										/>
										<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
									</Avatar>
								</TooltipTrigger>
								<TooltipContent
									side="right"
									sideOffset={10}
									className="p-0 w-72 dark:border-gray-700 dark:bg-gray-800"
								>
									<Card className="border-none shadow-lg dark:bg-gray-800">
										<CardContent className="p-4 space-y-4">
											{codeEvent && <CodeEventStatus codeEvent={codeEvent} />}

											{songInfo && (
												<div className="bg-primary/10 dark:bg-primary/20 text-sm p-3 rounded-lg dark:text-gray-200">
													<div className="flex items-center space-x-4">
														{albumImage
															? (
																	<div className="size-16 relative">
																		{imageLoading && <Skeleton className="rounded-md size-full inset-0 absolute" />}
																		<img
																			ref={imgRef}
																			src={albumImage}
																			alt={t("sidebar.status.albumAlt")}
																			className={`rounded-md size-16 object-cover ${imageLoading ? "hidden" : "block"}`}
																			onLoad={() => setImageLoading(false)}
																			onError={() => setImageLoading(false)}
																		/>
																	</div>
																)
															: (
																	<div className="rounded-md size-16">
																		<Skeleton className="rounded-md size-full" />
																	</div>
																)}

														<div className="flex-1 min-w-0">
															<p className="text-base font-semibold truncate">{songInfo.name}</p>
															{songInfo.artists.length > 0 && (
																<p className="text-muted-foreground text-sm truncate dark:text-gray-400">
																	{songInfo.artists.map(artist => artist.name).join(", ")}
																</p>
															)}
															{songInfo.album.name && (
																<p className="text-muted-foreground text-xs truncate dark:text-gray-500">
																	{songInfo.album.name}
																</p>
															)}
														</div>
													</div>
												</div>
											)}
										</CardContent>
									</Card>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				: (
						<Avatar className="rounded-full transition-transform hover:scale-105">
							<AvatarImage src={SiteConfig.Avatar} alt={t("sidebar.status.avatarAlt")} loading="lazy" />
							<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
						</Avatar>
					)}
			{SiteConfig.Features.StatusDot && (
				<span className="right-0 top-0 absolute">
					<span className="flex size-2.5 relative">
						<span
							className={cn(
								"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
								onlineStatus ? "bg-green-400" : "hidden",
							)}
						/>
						<span
							className={cn(
								"relative inline-flex h-2.5 w-2.5 rounded-full",
								onlineStatus ? "bg-green-500" : "bg-gray-300",
							)}
						/>
					</span>
				</span>
			)}
		</div>
	);
};

export default SidebarAvatar;
