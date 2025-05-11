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

const CodeEventStatus = ({ codeEvent }: { codeEvent: CodeEvent }) => {
	const t = useTranslations();
	const { platform, editor, project, language, eventTime } = codeEvent;

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
				{" "}
			</div>
			<p className="font-bold">{project}</p>
			<p className="text-muted-foreground text-xs mt-1 dark:text-gray-400">
				{t("sidebar.status.codingAt", { time: new Date(eventTime).toLocaleString() })}
			</p>
			<p className="text-muted-foreground text-xs mt-1 dark:text-gray-400">
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

	useEffect(() => {
		const fetchAppDesc = async () => {
			if (!appDescCache) {
				try {
					const response = await fetch(`https://cdn.jsdelivr.net/gh/Innei/reporter-assets@main/app-desc.json`);
					if (!response.ok)
						throw new Error("Failed to fetch app description");
					const appdesc = await response.json();
					setAppDescCache(appdesc);
					return appdesc;
				} catch (error) {
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

		if (!SiteConfig.Features.StatusAPI) {
			return;
		}

		const initializeAppDesc = async () => {
			if (!appDescCache) {
				await fetchAppDesc();
			}
		};

		initializeAppDesc();

		// 创建 SSE 连接
		const timeoutId = setTimeout(() => {
			const reportEventSource: EventSource = new EventSource(APIConfig.endpoints.status);
			const codeEventSource: EventSource = new EventSource(`${APIConfig.endpoints.space_status}/?sse=true&interval=5000`);

			reportEventSource.onmessage = async (event) => {
				try {
					const data: ProcessData = JSON.parse(event.data);
					if (data.processName) {
						const message = await fixProcessMessage(data.processName);
						setReportMessage(t("sidebar.status.masterUsing", { master: t(SiteConfig.master), message }));
					}

					if (data.mediaInfo) {
						setMediaInfo(data.mediaInfo);
					}
				} catch (error) {
					console.error("Error parsing report message:", error);
				}
			};

			codeEventSource.onmessage = async (event) => {
				try {
					const response = JSON.parse(event.data);
					// 检查响应是否包含错误信息
					if (response && response.error) {
						setCodeEvent(null);
						return;
					}

					const codeEventData: CodeEvent | null = response;
					if (codeEventData) {
						setCodeEvent(codeEventData);
					}
				} catch {
					console.warn("Error parsing code event message:", event.data);
				}
			};

			// 错误处理
			reportEventSource.onerror = () => {
				console.error("Report EventSource failed");
				reportEventSource.close();
			};

			codeEventSource.onerror = () => {
				console.error("Code EventSource failed");
				codeEventSource.close();
			};

			// 清理函数
			return () => {
				clearTimeout(timeoutId);
				reportEventSource?.close();
				codeEventSource?.close();
			};
		}, 1000);
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

	const onlineStatus = reportMessage || mediaInfo || codeEvent;

	return (
		<div className="relative">
			{onlineStatus
				? (
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Avatar className="rounded-full transition-transform hover:scale-105">
										<AvatarImage src={SiteConfig.Avatar} alt={t("sidebar.status.avatarAlt")} loading="lazy" />
										<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
									</Avatar>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={10} className="p-0 w-72 dark:border-gray-700 dark:bg-gray-800">
									<Card className="border-none shadow-lg dark:bg-gray-800">
										<CardContent className="p-4 space-y-4">

											{reportMessage && (
												<div className="bg-primary/10 dark:bg-primary/20 text-sm p-3 rounded-lg dark:text-gray-200">
													{reportMessage}
												</div>
											)}

											{codeEvent && <CodeEventStatus codeEvent={codeEvent} />}

											{mediaInfo && (
												<div className="bg-primary/10 dark:bg-primary/20 text-sm p-3 rounded-lg dark:text-gray-200">
													<div className="flex items-center space-x-4">
														{albumImage
															? (
																	<div className="size-16 relative">
																		{imageLoading && <Skeleton className="rounded-md size-full inset-0 absolute" />}
																		<img
																			ref={imgRef}
																			src={albumImage || "/placeholder.svg"}
																			alt={t("sidebar.status.albumAlt")}
																			className={`size-16 rounded-md object-cover ${imageLoading ? "hidden" : "block"}`}
																			onLoad={() => setImageLoading(false)}
																			onError={() => setImageLoading(false)}
																		/>
																	</div>
																)
															: (
																	<div className="rounded-md size-16">
																		<SelfIcon name="MyGO!!!!!_Icon" />
																	</div>
																)}

														<div className="flex-1 min-w-0">
															<p className="text-base font-semibold truncate">{mediaInfo.title}</p>
															{mediaInfo.artist && (
																<p className="text-muted-foreground text-sm truncate dark:text-gray-400">
																	{mediaInfo.artist}
																</p>
															)}
															{mediaInfo.AlbumTitle && (
																<p className="text-muted-foreground text-xs truncate dark:text-gray-500">
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
						<Avatar className="rounded-full transition-transform hover:scale-105">
							<AvatarImage src={SiteConfig.Avatar} alt={t("sidebar.status.avatarAlt")} loading="lazy" />
							<AvatarFallback>{t(SiteConfig.master)[0]}</AvatarFallback>
						</Avatar>
					)}
			{SiteConfig.Features.StatusDot && (
				<span className="right-0 top-0 absolute">
					<span className="flex size-2.5 relative">
						{/* 脉冲动画层 */}
						<span
							className={cn(
								"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
								onlineStatus ? "bg-green-400" : "hidden",
							)}
						/>
						{/* 实心中心点 */}
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
