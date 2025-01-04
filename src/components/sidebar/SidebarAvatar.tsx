"use client";

import { AvatarImage, Avatar as UIAvatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SiteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface MediaInfo {
	SourceAppName: string;
	artist: string;
	title: string;
}

interface ProcessData {
	processName: string;
	mediaInfo?: MediaInfo;
}

interface MediaInfoResponse {
	name: string;
	artist: string;
	album: string | null;
	image: string | null;
	tns: string | null;
}

export const SidebarAvatar = () => {
	const t = useTranslations("sidebar.status");
	const [reportMessage, setReportMessage] = useState<string | null>(null);
	const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
	const [appDescCache, setAppDescCache] = useState<Record<string, string> | null>(null);
	const [lastFetchedMedia, setLastFetchedMedia] = useState<MediaInfo | null>(null);
	const [mediaInfoResponse, setMediaInfoResponse] = useState<MediaInfoResponse | null>(null);

	const fetchAppDesc = async () => {
		if (!appDescCache) {
			try {
				const response = await fetch(`https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main/app-desc.json`);
				if (!response.ok)
					throw new Error("Failed to fetch app description");
				const appdesc = await response.json();
				setAppDescCache(appdesc);
				return appdesc;
			}
			catch (error) {
				console.error(error);
			}
		}
		return appDescCache;
	};

	const fixProcessMessage = async (process: string) => {
		const appdesc = await fetchAppDesc();
		let message = process;
		if (appdesc && appdesc[process]) {
			message = `${process} ${appdesc[process]}`;
		}
		return message;
	};

	const fetchMediaInfo = async (songName: string, artist: string) => {
		try {
			const response = await fetch(`/api/getMediainfo?songName=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artist)}`);
			if (!response.ok)
				throw new Error("Failed to fetch media info");
			const data: MediaInfoResponse = await response.json();
			setMediaInfoResponse(data);
		}
		catch (error) {
			console.error("Failed to fetch media info:", error);
		}
	};

	useEffect(() => {
		if (!SiteConfig.Features.StatusAPI) {
			return;
		}

		const initializeAppDesc = async () => {
			if (!appDescCache) {
				await fetchAppDesc();
			}
		};

		initializeAppDesc();

		const intervalId = setInterval(() => {
			fetch("/api/getReportMsg")
				.then((response) => {
					if (!response.ok) {
						console.error("Failed to fetch report message:", response.statusText);
						return;
					}
					return response.json();
				})
				.then(async (data: ProcessData) => {
					if (data.processName) {
						const message = await fixProcessMessage(data.processName);
						setReportMessage(t("masterUsing", { message })); // 使用翻译
					}

					if (data.mediaInfo) {
						const newMediaInfo = data.mediaInfo;
						if (!lastFetchedMedia || lastFetchedMedia.title !== newMediaInfo.title || lastFetchedMedia.artist !== newMediaInfo.artist) {
							setMediaInfo(newMediaInfo);
							setLastFetchedMedia(newMediaInfo);
							await fetchMediaInfo(newMediaInfo.title, newMediaInfo.artist);
						}
					}
				})
				.catch((error) => {
					console.error("Error fetching media info:", error);
					setReportMessage(null);
					setMediaInfo(null);
				});
		}, 7000);

		return () => {
			clearInterval(intervalId);
		};
	}, [appDescCache, lastFetchedMedia]);

	return (
		<div className="relative">
			{reportMessage
				? (
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger asChild>
									<UIAvatar className="transition-transform hover:scale-105">
										<AvatarImage src={SiteConfig.Avatar} alt={t("avatarAlt")} />
									</UIAvatar>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={10} className="w-72 p-0 dark:bg-gray-800 dark:border-gray-700">
									<Card className="border-none shadow-lg dark:bg-gray-800">
										<CardContent className="p-4 space-y-4">
											<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 text-sm dark:text-gray-200">
												{reportMessage}
											</div>
											{mediaInfoResponse
												? (
														<div className="flex items-center space-x-4">
															{mediaInfoResponse.image && (
																<img
																	src={mediaInfoResponse.image}
																	alt={t("albumAlt")}
																	className="w-16 h-16 rounded-md object-cover"
																/>
															)}
															<div className="flex-1 min-w-0">
																<p className="text-base font-semibold truncate">{mediaInfoResponse.name}</p>
																{mediaInfoResponse.artist && (
																	<p className="text-sm text-muted-foreground dark:text-gray-400 truncate">
																		{mediaInfoResponse.artist}
																	</p>
																)}
																{mediaInfoResponse.album && (
																	<p className="text-xs text-muted-foreground dark:text-gray-500 truncate">
																		{mediaInfoResponse.album}
																	</p>
																)}
															</div>
														</div>
													)
												: (
														mediaInfo && (
															<div className="text-sm">
																<p className="font-semibold">{mediaInfo.title}</p>
																{mediaInfo.artist && <p className="text-muted-foreground">{mediaInfo.artist}</p>}
															</div>
														)
													)}
										</CardContent>
									</Card>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				: (
						<UIAvatar className="transition-transform hover:scale-105">
							<AvatarImage src={SiteConfig.Avatar} alt={t("avatarAlt")} />
						</UIAvatar>
					)}
			<span
				className={cn(
					"absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
					reportMessage ? "bg-green-500" : "bg-gray-300",
				)}
			/>
		</div>
	);
};

export default SidebarAvatar;
