"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { APIConfig, SiteConfig } from "@/config";
import { getLangIcon, SelfIcon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface MediaInfo {
	SourceAppName: string;
	artist: string;
	title: string;
	AlbumThumbnail: string;
	AlbumTitle: string;
	AlbumArtist: string;
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

interface ProcessData {
	processName: string;
	mediaInfo?: MediaInfo;
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

	return (
		<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 text-sm dark:text-gray-200">
			<div>
				{t(SiteConfig.master)}
				{" "}
				<Icon icon={getLangIcon(language)} className="text-lg inline-block" />
				{" "}
				<span className="text-xs text-muted-foreground dark:text-gray-400">{language}</span>
				{" "}
				{t("sidebar.status.busy")}
				{" "}
			</div>
			<p className="font-bold">{project}</p>
			<p className="mt-1 text-xs text-muted-foreground dark:text-gray-400">
				{t("sidebar.status.codingAt", { time: new Date(eventTime).toLocaleString() })}
			</p>
			<p className="mt-1 text-xs text-muted-foreground dark:text-gray-400">
				{t("sidebar.status.usingEditorOnPlatform", { editor, platform })}
			</p>
		</div>
	);
};

export const SidebarAvatar = () => {
	const t = useTranslations();
	const [reportMessage, setReportMessage] = useState<string | null>(null);
	const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
	const [appDescCache, setAppDescCache] = useState<Record<string, string> | null>(null);
	const [imageLoading, setImageLoading] = useState(true);
	const [codeEvent, setCodeEvent] = useState<CodeEvent | null>(null);
	const imgRef = useRef<HTMLImageElement | null>(null);

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

		const fetchReportMessage = async () => {
			try {
				const [reportResponse, codeEventResponse] = await Promise.all([
					fetch("/api/getReportMsg"),
					fetch(APIConfig.endpoints.space_status),
				]);
				if (!reportResponse.ok) {
					console.error("Failed to fetch report message:", reportResponse.statusText);
					return;
				}
				if (!codeEventResponse.ok) {
					console.error("Failed to fetch code event:", codeEventResponse.statusText);
					return;
				}
				const data: ProcessData = await reportResponse.json();
				const codeEventData: CodeEvent | null = (await codeEventResponse.json()).data;

				if (codeEventData) {
					setCodeEvent(codeEventData);
				}

				if (data.processName) {
					const message = await fixProcessMessage(data.processName);
					setReportMessage(t("sidebar.status.masterUsing", { master: t(SiteConfig.master), message }));
				}

				if (data.mediaInfo) {
					setMediaInfo(data.mediaInfo);
				}
			}
			catch (error) {
				console.error("Error fetching media info:", error);
				setReportMessage(null);
				setMediaInfo(null);
			}
		};
		fetchReportMessage();

		const intervalId = setInterval(fetchReportMessage, 7000);

		return () => {
			clearInterval(intervalId);
		};
	}, [appDescCache, SiteConfig.Features.StatusAPI]);

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
		if (!mediaInfo?.AlbumThumbnail)
			return null;

		// 检测是否是base64格式
		if (!mediaInfo.AlbumThumbnail.startsWith("https") && !mediaInfo.AlbumThumbnail.startsWith("http")) {
			// 添加base64前缀
			const mimeType = mediaInfo.AlbumThumbnail.startsWith("/9j/") ? "image/jpeg" : "image/png";
			return `data:${mimeType};base64,${mediaInfo.AlbumThumbnail}`;
		}

		return mediaInfo.AlbumThumbnail;
	};

	const albumImage = getAlbumImage();
	return (
		<div className="relative">
			{reportMessage || mediaInfo || codeEvent
				? (
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Avatar className="transition-transform hover:scale-105 rounded-full">
										<AvatarImage src={SiteConfig.Avatar} alt={t("sidebar.status.avatarAlt")} loading="lazy" />
										<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
									</Avatar>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={10} className="w-72 p-0 dark:bg-gray-800 dark:border-gray-700">
									<Card className="border-none shadow-lg dark:bg-gray-800">
										<CardContent className="p-4 space-y-4">
											<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 text-sm dark:text-gray-200">
												{reportMessage}
											</div>

											{codeEvent && <CodeEventStatus codeEvent={codeEvent} />}

											{mediaInfo && (
												<div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 text-sm dark:text-gray-200">
													<div className="flex items-center space-x-4">
														{albumImage
															? (
																	<div className="relative w-16 h-16">
																		{imageLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-md" />}
																		<img
																			ref={imgRef}
																			src={albumImage || "/placeholder.svg"}
																			alt={t("sidebar.status.albumAlt")}
																			className={`w-16 h-16 rounded-md object-cover ${imageLoading ? "hidden" : "block"}`}
																			onLoad={() => setImageLoading(false)}
																			onError={() => setImageLoading(false)}
																		/>
																	</div>
																)
															: (
																	<div className="w-16 h-16 rounded-md">
																		<SelfIcon name="MyGO!!!!!_Icon" />
																	</div>
																)}

														<div className="flex-1 min-w-0">
															<p className="text-base font-semibold truncate">{mediaInfo.title}</p>
															{mediaInfo.artist && (
																<p className="text-sm text-muted-foreground dark:text-gray-400 truncate">
																	{mediaInfo.artist}
																</p>
															)}
															{mediaInfo.AlbumTitle && (
																<p className="text-xs text-muted-foreground dark:text-gray-500 truncate">
																	{mediaInfo.AlbumTitle}
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
						<Avatar className="transition-transform hover:scale-105 rounded-full">
							<AvatarImage src={SiteConfig.Avatar} alt={t("sidebar.status.avatarAlt")} loading="lazy" />
							<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
						</Avatar>
					)}
			{SiteConfig.Features.StatusDot && (
				<span className="absolute top-0 right-0">
					<span className="relative flex h-2.5 w-2.5">
						{/* 脉冲动画层 */}
						<span
							className={cn(
								"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
								reportMessage ? "bg-green-400" : "hidden",
							)}
						/>
						{/* 实心中心点 */}
						<span
							className={cn(
								"relative inline-flex h-2.5 w-2.5 rounded-full",
								reportMessage ? "bg-green-500" : "bg-gray-300",
							)}
						/>
					</span>
				</span>
			)}
		</div>
	);
};

export default SidebarAvatar;
