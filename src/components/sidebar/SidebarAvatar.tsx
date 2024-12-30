"use client";

import { AvatarImage, Avatar as UIAvatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SiteConfig } from "@/config";
import { cn } from "@/lib/utils";
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
	const [ReportStatus, setReportStatus] = useState<boolean>(false);
	const [ReportMessage, setReportMessage] = useState<string | null>(null);
	const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
	const [appDescCache, setAppDescCache] = useState<Record<string, string> | null>(null);
	const [lastFetchedMedia, setLastFetchedMedia] = useState<MediaInfo | null>(null);
	const [mediaInfoResponse, setMediaInfoResponse] = useState<MediaInfoResponse | null>(null);

	const fetchAppDesc = async () => {
		if (!appDescCache) {
			const response = await fetch(`https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main/app-desc.json`);
			const appdesc = await response.json();
			setAppDescCache(appdesc);
			return appdesc;
		}
		return appDescCache;
	};

	const fixProcessMessage = async (process: string) => {
		if (!appDescCache) {
			await fetchAppDesc();
		}
		const appdesc = appDescCache;
		let returndata = process;

		if (appdesc && appdesc[process]) {
			returndata = `${process} ${appdesc[process]}`;
		}
		return returndata;
	};

	const fetchMediaInfo = async (songName: string, artist: string) => {
		const response = await fetch(`/api/getMediainfo?songName=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artist)}`);
		if (response.ok) {
			const data: MediaInfoResponse = await response.json();
			setMediaInfoResponse(data);
		}
		else {
			console.error("Failed to fetch media info:", response.statusText);
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
						console.error("Failed to fetch media info:", response.statusText);
						return;
					}
					return response.json();
				})
				.then(async (data: ProcessData) => {
					if (data.processName) {
						setReportStatus(true);
						const message = await fixProcessMessage(data.processName);
						setReportMessage(`Master 正在使用 ${message}`);
					}

					if (data.mediaInfo) {
						if (!lastFetchedMedia || lastFetchedMedia.title !== data.mediaInfo.title || lastFetchedMedia.artist !== data.mediaInfo.artist) {
							setMediaInfo(data.mediaInfo);
							setLastFetchedMedia(data.mediaInfo);
							await fetchMediaInfo(data.mediaInfo.title, data.mediaInfo.artist);
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
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger asChild>
						<UIAvatar className="transition-transform hover:scale-105">
							<AvatarImage src={SiteConfig.Avatar} alt="Avatar" />
						</UIAvatar>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={10} className="w-72 p-0">
						<Card className="border-none shadow-lg">
							<CardContent className="p-4 space-y-4">
								{ReportStatus && (
									<div className="bg-primary/10 rounded-lg p-3 text-sm">
										{ReportMessage}
									</div>
								)}
								{mediaInfoResponse
									? (
											<div className="flex items-center space-x-4">
												{mediaInfoResponse.image && (
													<img
														src={mediaInfoResponse.image}
														alt="Album Art"
														className="w-16 h-16 rounded-md object-cover"
													/>
												)}
												<div className="flex-1 min-w-0">
													<p className="text-base font-semibold truncate">
														{mediaInfoResponse.name}
													</p>
													{mediaInfoResponse.artist && (
														<p className="text-sm text-muted-foreground truncate">
															{mediaInfoResponse.artist}
														</p>
													)}
													{mediaInfoResponse.album && (
														<p className="text-xs text-muted-foreground truncate">
															{mediaInfoResponse.album}
														</p>
													)}
												</div>
											</div>
										)
									: mediaInfo && (
										<div className="text-sm">
											<p className="font-semibold">{mediaInfo.title}</p>
											{mediaInfo.artist && (
												<p className="text-muted-foreground">{mediaInfo.artist}</p>
											)}
										</div>
									)}
							</CardContent>
						</Card>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			{SiteConfig.Features.StatusDot && (
				<span
					className={cn(
						"absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
						ReportStatus ? "bg-green-500" : "bg-gray-300",
					)}
				/>
			)}
		</div>
	);
};

export default SidebarAvatar;
