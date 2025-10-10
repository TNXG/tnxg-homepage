"use client";

import type React from "react";
import type { WakaTimeData } from "@/app/page";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SiteConfig } from "@/config";
import { getLangIcon } from "@/lib/icon";

interface HomeLayoutProps {
	wakaTimeData: WakaTimeData | null;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ wakaTimeData }) => {
	const t = useTranslations();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("zh-CN", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="py-8 flex flex-col min-h-screen items-center justify-start">
			<div className="font-moonbridge mx-auto px-4 py-8 pt-16 flex flex-col items-start justify-center md:flex-row">
				<div className="avatar">
					<Avatar className="mask mask-squircle size-24 -z-1">
						<AvatarImage
							src={SiteConfig.Avatar}
							alt={t(SiteConfig.master)}
							loading="lazy"
							className="size-24 object-cover"
						/>
						<AvatarFallback className="mask mask-squircle">{t(SiteConfig.master)[0]}</AvatarFallback>
					</Avatar>
				</div>
				<div className="ml-0 mt-4 md:ml-4 md:mt-0">
					<h1 className="text-6xl font-bold">{t(SiteConfig.HomeConfig.greeting)}</h1>
					<div className="flex items-center space-x-2">
						<h2 className="text-5xl font-bold mt-4">{t(SiteConfig.HomeConfig.namePrefix)}</h2>
						<h2 className="text-5xl text-[#77BBDD] font-bold mt-4">
							<sup className="text-xs">{t(SiteConfig.HomeConfig.nameJP)}</sup>
							<br />
							{t(SiteConfig.master)}
						</h2>
						<span className="text-2xl font-medium break-words">{t(`${SiteConfig.HomeConfig.nameEN}`)}</span>
					</div>
					<br />
					<p className="text-xl mt-2">{t(`${SiteConfig.HomeConfig.motto}`)}</p>
					<div className="font-sans my-4 flex flex-wrap gap-4 items-center">
						{SiteConfig.HomeConfig.socialLinks.map(link => (
							<Button key={link.href} asChild className="gap-2">
								<a href={link.href} target="_blank" rel="noopener noreferrer">
									<Icon icon={link.icon} width="24" height="24" />
									<span>{t(`${link.name}`)}</span>
								</a>
							</Button>
						))}
					</div>
				</div>
			</div>

			<div className="mx-auto px-4 max-w-6xl w-full space-y-8">
				<section>
					<div className="mb-6 flex gap-2 items-center">
						<Icon icon="mingcute:book-open-line" className="text-[#77BBDD] h-6 w-6" />
						<h2 className="text-3xl font-bold">{t(`${SiteConfig.LearningConfig.sectionTitle}`)}</h2>
					</div>

					<div className="gap-6 grid grid-cols-1 md:grid-cols-2">
						<Card className="bg-white/70 transition-shadow backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 hover:shadow-lg">
							<CardHeader>
								<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
									{SiteConfig.LearningConfig.sections.currentlyStudying.icon === "TrendingUp" && (
										<Icon
											icon="mingcute:trending-up-line"
											className={`${SiteConfig.LearningConfig.sections.currentlyStudying.iconColor} h-5 w-5`}
										/>
									)}
									{t(`${SiteConfig.LearningConfig.sections.currentlyStudying.title}`)}
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									{t(`${SiteConfig.LearningConfig.sections.currentlyStudying.description}`)}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{SiteConfig.LearningConfig.sections.currentlyStudying.languages.map(language => (
										<Badge key={language.name} variant="outline" className={language.color}>
											<Icon icon={language.icon} className="mr-1 h-4 w-4" />
											{language.name}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="bg-white/70 transition-shadow backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 hover:shadow-lg">
							<CardHeader>
								<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
									{SiteConfig.LearningConfig.sections.exploring.icon === "Code" && (
										<Icon
											icon="mingcute:code-line"
											className={`${SiteConfig.LearningConfig.sections.exploring.iconColor} h-5 w-5`}
										/>
									)}
									{t(`${SiteConfig.LearningConfig.sections.exploring.title}`)}
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									{t(`${SiteConfig.LearningConfig.sections.exploring.description}`)}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{SiteConfig.LearningConfig.sections.exploring.languages.map(language => (
										<Badge key={language.name} variant="outline" className={language.color}>
											<Icon icon={language.icon} className="mr-1 h-4 w-4" />
											{language.name}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="bg-white/70 transition-all backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 md:col-span-2 hover:shadow-lg dark:hover:shadow-black/20">
							<CardHeader>
								<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
									{SiteConfig.LearningConfig.sections.frameworks.icon === "Award" && (
										<Icon
											icon="mingcute:trophy-line"
											className={`${SiteConfig.LearningConfig.sections.frameworks.iconColor} h-5 w-5`}
										/>
									)}
									{t(`${SiteConfig.LearningConfig.sections.frameworks.title}`)}
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									{t(`${SiteConfig.LearningConfig.sections.frameworks.description}`)}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="gap-4 grid grid-cols-2 md:grid-cols-3">
									{SiteConfig.LearningConfig.sections.frameworks.frameworks.map(framework => (
										<div
											key={framework.name}
											className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex gap-2 transition-colors items-center dark:border-gray-600 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
										>
											<Icon icon={framework.icon} className="h-5 w-5" />
											<span className="text-sm text-gray-900 font-medium dark:text-gray-100">{framework.name}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				<section>
					<div className="mb-6 flex gap-2 items-center">
						<Icon icon="mingcute:code-line" className="text-[#77BBDD] h-6 w-6 dark:text-[#88CCEE]" />
						<h2 className="text-3xl text-gray-900 font-bold dark:text-gray-100">{t("home.wakatime.title")}</h2>
						<Badge
							variant="outline"
							className="text-gray-700 ml-2 border-gray-300 dark:text-gray-300 dark:border-gray-600"
						>
							<Icon icon="mingcute:time-line" className="mr-1 h-3 w-3" />
							{wakaTimeData?.timeTrackingData.data.range.range === "all_time"
								? t("home.wakatime.allTime")
								: t("home.wakatime.recentActivity")}
						</Badge>
					</div>

					{wakaTimeData
						? (
								<div className="gap-4 grid grid-cols-1 lg:grid-cols-4">
									{/* First Row: Key Stats */}
									<Card className="bg-white/70 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
												<Icon icon="mingcute:data-2-line" className="text-[#77BBDD] h-5 w-5 dark:text-[#88CCEE]" />
												{t("home.wakatime.keyStats")}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="gap-6 grid grid-cols-2">
												{/* Total Time */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:trending-up-line" className="text-[#77BBDD] h-4 w-4 dark:text-[#88CCEE]" />
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.totalTime")}
														</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold dark:text-[#88CCEE]">
														{wakaTimeData.timeTrackingData.data.grand_total.human_readable_total}
													</div>
													<p className="text-xs text-gray-500 flex gap-1 items-center dark:text-gray-400">
														<span>
															{t("home.wakatime.dailyAvg")}
															:
														</span>
														<span>{wakaTimeData.timeTrackingData.data.grand_total.human_readable_daily_average}</span>
													</p>
												</div>

												{/* Best Day */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:trophy-line" className="text-[#77BBDD] h-4 w-4 dark:text-[#88CCEE]" />
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.bestDay")}
														</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold dark:text-[#88CCEE]">
														{wakaTimeData.timeTrackingData.data.best_day.text}
													</div>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														{formatDate(wakaTimeData.timeTrackingData.data.best_day.date)}
													</p>
												</div>

												{/* Active Days */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:calendar-line" className="text-[#77BBDD] h-4 w-4 dark:text-[#88CCEE]" />
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.activeDays")}
														</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold flex gap-1 items-center dark:text-[#88CCEE]">
														<span>{wakaTimeData.timeTrackingData.data.range.days_minus_holidays}</span>
														<span>{t("home.wakatime.days")}</span>
													</div>
													<p className="text-xs text-gray-500 flex gap-1 items-center dark:text-gray-400">
														<span>
															{t("home.wakatime.totalDays")}
															:
														</span>
														<span>{wakaTimeData.timeTrackingData.data.range.days_including_holidays}</span>
														<span>{t("home.wakatime.days")}</span>
													</p>
												</div>

												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:time-line" className="text-[#77BBDD] h-4 w-4 dark:text-[#88CCEE]" />
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.period")}
														</span>
													</div>
													<div className="text-sm text-gray-600 font-medium dark:text-gray-300">
														<span>{t("home.wakatime.periodDescription", { start: formatDate(wakaTimeData.timeTrackingData.data.range.start), end: formatDate(wakaTimeData.timeTrackingData.data.range.end) })}</span>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>

									{/* Languages Card */}
									<Card className="bg-white/70 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="text-gray-900 dark:text-gray-100">{t("home.wakatime.topLanguages")}</CardTitle>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												{t("home.wakatime.mostUsedLanguages")}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-3">
												{wakaTimeData.languageData.data
													.filter(lang => lang.percent > 0)
													.slice(0, 5)
													.map(lang => (
														<div key={lang.name} className="flex gap-3 items-center">
															<div className="flex h-6 w-6 items-center justify-center">
																<Icon icon={getLangIcon(lang.name.toLowerCase())} width="20" height="20" />
															</div>
															<div className="text-sm text-gray-700 font-medium w-20 dark:text-gray-300">{lang.name}</div>
															<Progress value={lang.percent} className="bg-gray-200 flex-1 h-2 dark:bg-gray-700" />
															<div className="text-sm text-gray-500 text-right w-12 dark:text-gray-400">
																{lang.percent.toFixed(1)}
																%
															</div>
														</div>
													))}
											</div>
										</CardContent>
									</Card>

									{/* Operating Systems Card */}
									<Card className="bg-white/70 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
												<Icon icon="mingcute:laptop-line" className="h-5 w-5" />
												{t("home.wakatime.operatingSystems")}
											</CardTitle>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												{t("home.wakatime.environmentUsage")}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-3">
												{wakaTimeData.osUsageData.data
													.filter(os => os.percent > 0)
													.map(os => (
														<div key={os.name} className="flex gap-3 items-center">
															<div className="flex h-6 w-6 items-center justify-center">
																{os.name.includes("Mac")
																	? (
																			<Icon icon="simple-icons:apple" width="18" height="18" />
																		)
																	: os.name.includes("Windows")
																		? (
																				<Icon icon="simple-icons:windows" width="18" height="18" />
																			)
																		: os.name.includes("Linux")
																			? (
																					<Icon icon="simple-icons:linux" width="18" height="18" />
																				)
																			: (
																					<Icon icon="mingcute:cpu-line" className="h-4 w-4" />
																				)}
															</div>
															<div className="text-sm text-gray-700 font-medium w-20 dark:text-gray-300">{os.name}</div>
															<Progress value={os.percent} className="bg-gray-200 flex-1 h-2 dark:bg-gray-700" />
															<div className="text-sm text-gray-500 text-right w-12 dark:text-gray-400">
																{os.percent.toFixed(1)}
																%
															</div>
														</div>
													))}
											</div>
										</CardContent>
									</Card>

									{/* Activity Insights Card */}
									<Card className="bg-white/70 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="text-gray-900 flex gap-2 items-center dark:text-gray-100">
												<Icon icon="mingcute:trending-up-line" className="h-5 w-5" />
												{t("home.wakatime.activityInsights")}
											</CardTitle>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												{t("home.wakatime.codingHabits")}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												<div className="flex flex-col gap-1">
													<div className="flex items-center justify-between">
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.dailyAverage")}
														</span>
														<span className="text-[#77BBDD] font-bold dark:text-[#88CCEE]">
															{wakaTimeData.timeTrackingData.data.grand_total.human_readable_daily_average}
															{" "}
															/ 24 hrs
														</span>
													</div>
													<Progress
														value={Math.min(
															(() => {
																// 提取每日平均编码时间（小时）
																const dailyAvgStr = wakaTimeData.timeTrackingData.data.grand_total.human_readable_daily_average;
																// 提取数字部分（小时）
																const hourMatch = dailyAvgStr.match(/([\d.]+)\s*hrs?/);
																const minMatch = dailyAvgStr.match(/([\d.]+)\s*mins?/);

																let totalHours = 0;
																if (hourMatch)
																	totalHours += Number.parseFloat(hourMatch[1]);
																if (minMatch)
																	totalHours += Number.parseFloat(minMatch[1]) / 60;
																return (totalHours / 24) * 100;
															})(),
															100,
														)}
														className="bg-gray-200 h-2 dark:bg-gray-700"
													/>
												</div>

												<div className="flex flex-col gap-1">
													<div className="flex items-center justify-between">
														<span className="text-sm text-gray-700 font-medium dark:text-gray-300">
															{t("home.wakatime.productivityScore")}
														</span>
														<span className="text-[#77BBDD] font-bold dark:text-[#88CCEE]">
															{Math.round(
																(wakaTimeData.timeTrackingData.data.range.days_minus_holidays
																	/ wakaTimeData.timeTrackingData.data.range.days_including_holidays)
																* 100,
															)}
															%
														</span>
													</div>
													<Progress
														value={
															(wakaTimeData.timeTrackingData.data.range.days_minus_holidays
																/ wakaTimeData.timeTrackingData.data.range.days_including_holidays)
															* 100
														}
														className="bg-gray-200 h-2 dark:bg-gray-700"
													/>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							)
						: (
								<Card className="bg-white/70 transition-all backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/70 hover:shadow-md dark:hover:shadow-black/20 dark:hover:shadow-lg">
									<CardContent className="py-8 text-center">
										<p className="text-gray-500 dark:text-gray-400">{t("home.wakatime.unableToLoad")}</p>
										<p className="text-sm text-gray-500 mt-2 dark:text-gray-400">{t("home.wakatime.checkSettings")}</p>
									</CardContent>
								</Card>
							)}
				</section>
			</div>
		</div>
	);
};

export default HomeLayout;
