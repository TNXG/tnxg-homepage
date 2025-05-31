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
			{/* Original Hero Section */}
			<div className="font-moonbridge mx-auto px-4 py-8 pt-16 flex flex-col items-start justify-center md:flex-row">
				<div className="avatar">
					<Avatar className="mask mask-squircle size-24 -z-1">
						<AvatarImage
							src={SiteConfig.Avatar || "/placeholder.svg"}
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

			{/* Enhanced Information Section */}
			<div className="mx-auto px-4 max-w-6xl w-full space-y-8">
				{/* Learning Status Section */}
				<section>
					<div className="mb-6 flex gap-2 items-center">
						<Icon icon="mingcute:book-open-line" className="text-[#77BBDD] h-6 w-6" />
						<h2 className="text-3xl font-bold">{t(`${SiteConfig.LearningConfig.sectionTitle}`)}</h2>
					</div>

					<div className="gap-6 grid grid-cols-1 md:grid-cols-2">
						{/* Currently Studying */}
						<Card className="transition-shadow hover:shadow-lg">
							<CardHeader>
								<CardTitle className="flex gap-2 items-center">
									{SiteConfig.LearningConfig.sections.currentlyStudying.icon === "TrendingUp" && (
										<Icon icon="mingcute:trending-up-line" className={`${SiteConfig.LearningConfig.sections.currentlyStudying.iconColor} h-5 w-5`} />
									)}
									{t(`${SiteConfig.LearningConfig.sections.currentlyStudying.title}`)}
								</CardTitle>
								<CardDescription>{t(`${SiteConfig.LearningConfig.sections.currentlyStudying.description}`)}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{SiteConfig.LearningConfig.sections.currentlyStudying.languages.map(language => (
										<Badge key={language.name} variant="default" className={language.color}>
											<Icon icon={language.icon} className="mr-1 h-4 w-4" />
											{language.name}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Exploring New Technologies */}
						<Card className="transition-shadow hover:shadow-lg">
							<CardHeader>
								<CardTitle className="flex gap-2 items-center">
									{SiteConfig.LearningConfig.sections.exploring.icon === "Code" && (
										<Icon icon="mingcute:code-line" className={`${SiteConfig.LearningConfig.sections.exploring.iconColor} h-5 w-5`} />
									)}
									{t(`${SiteConfig.LearningConfig.sections.exploring.title}`)}
								</CardTitle>
								<CardDescription>{t(`${SiteConfig.LearningConfig.sections.exploring.description}`)}</CardDescription>
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

						{/* Framework Mastery */}
						<Card className="transition-shadow md:col-span-2 hover:shadow-lg">
							<CardHeader>
								<CardTitle className="flex gap-2 items-center">
									{SiteConfig.LearningConfig.sections.frameworks.icon === "Award" && (
										<Icon icon="mingcute:trophy-line" className={`${SiteConfig.LearningConfig.sections.frameworks.iconColor} h-5 w-5`} />
									)}
									{t(`${SiteConfig.LearningConfig.sections.frameworks.title}`)}
								</CardTitle>
								<CardDescription>{t(`${SiteConfig.LearningConfig.sections.frameworks.description}`)}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="gap-4 grid grid-cols-2 md:grid-cols-3">
									{SiteConfig.LearningConfig.sections.frameworks.frameworks.map(framework => (
										<div key={framework.name} className={`p-2 rounded-lg ${framework.color} flex gap-2 transition-colors items-center`}>
											<Icon icon={framework.icon} className={`${framework.iconColor || ""} h-5 w-5`} />
											<span className="text-sm font-medium">{framework.name}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* WakaTime Stats Section */}
				<section>
					<div className="mb-6 flex gap-2 items-center">
						<Icon icon="mingcute:code-line" className="text-[#77BBDD] h-6 w-6" />
						<h2 className="text-3xl font-bold">{t("home.wakatime.title")}</h2>
						<Badge variant="outline" className="ml-2">
							<Icon icon="mingcute:time-line" className="mr-1 h-3 w-3" />
							{wakaTimeData?.timeTrackingData.data.range.range === "all_time" ? t("home.wakatime.allTime") : t("home.wakatime.recentActivity")}
						</Badge>
					</div>

					{wakaTimeData
						? (
								<div className="gap-4 grid grid-cols-1 lg:grid-cols-4">
									{/* First Row: Key Stats */}
									<Card className="lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="flex gap-2 items-center">
												<Icon icon="mingcute:data-2-line" className="text-[#77BBDD] h-5 w-5" />
												{t("home.wakatime.keyStats")}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="gap-6 grid grid-cols-2">
												{/* Total Time */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:trending-up-line" className="text-[#77BBDD] h-4 w-4" />
														<span className="text-sm font-medium">{t("home.wakatime.totalTime")}</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold">
														{wakaTimeData.timeTrackingData.data.grand_total.human_readable_total}
													</div>
													<p className="text-muted-foreground text-xs flex gap-1 items-center">
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
														<Icon icon="mingcute:trophy-line" className="text-[#77BBDD] h-4 w-4" />
														<span className="text-sm font-medium">{t("home.wakatime.bestDay")}</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold">
														{wakaTimeData.timeTrackingData.data.best_day.text}
													</div>
													<p className="text-muted-foreground text-xs">
														{formatDate(wakaTimeData.timeTrackingData.data.best_day.date)}
													</p>
												</div>

												{/* Active Days */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:calendar-line" className="text-[#77BBDD] h-4 w-4" />
														<span className="text-sm font-medium">{t("home.wakatime.activeDays")}</span>
													</div>
													<div className="text-xl text-[#77BBDD] font-bold flex gap-1 items-center">
														<span>{wakaTimeData.timeTrackingData.data.range.days_minus_holidays}</span>
														<span>{t("home.wakatime.days")}</span>
													</div>
													<p className="text-muted-foreground text-xs flex gap-1 items-center">
														<span>
															{t("home.wakatime.totalDays")}
															:
														</span>
														<span>{wakaTimeData.timeTrackingData.data.range.days_including_holidays}</span>
														<span>{t("home.wakatime.days")}</span>
													</p>
												</div>

												{/* Period */}
												<div className="flex flex-col space-y-1">
													<div className="flex gap-2 items-center">
														<Icon icon="mingcute:time-line" className="text-[#77BBDD] h-4 w-4" />
														<span className="text-sm font-medium">{t("home.wakatime.period")}</span>
													</div>
													<div className="text-sm font-medium flex gap-1 items-center">
														<span>{formatDate(wakaTimeData.timeTrackingData.data.range.start)}</span>
														<span>-</span>
														<span>{formatDate(wakaTimeData.timeTrackingData.data.range.end)}</span>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>

									{/* Languages Card */}
									<Card className="lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle>{t("home.wakatime.topLanguages")}</CardTitle>
											<CardDescription>{t("home.wakatime.mostUsedLanguages")}</CardDescription>
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
															<div className="text-sm font-medium w-20">{lang.name}</div>
															<Progress value={lang.percent} className="flex-1 h-2" />
															<div className="text-muted-foreground text-sm text-right w-12">
																{lang.percent.toFixed(1)}
																%
															</div>
														</div>
													))}
											</div>
										</CardContent>
									</Card>

									{/* Operating Systems Card */}
									<Card className="lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="flex gap-2 items-center">
												<Icon icon="mingcute:laptop-line" className="h-5 w-5" />
												{t("home.wakatime.operatingSystems")}
											</CardTitle>
											<CardDescription>{t("home.wakatime.environmentUsage")}</CardDescription>
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
															<div className="text-sm font-medium w-20">{os.name}</div>
															<Progress value={os.percent} className="flex-1 h-2" />
															<div className="text-muted-foreground text-sm text-right w-12">
																{os.percent.toFixed(1)}
																%
															</div>
														</div>
													))}
											</div>
										</CardContent>
									</Card>

									{/* Activity Insights Card */}
									<Card className="lg:col-span-2">
										<CardHeader className="pb-2">
											<CardTitle className="flex gap-2 items-center">
												<Icon icon="mingcute:trending-up-line" className="h-5 w-5" />
												{t("home.wakatime.activityInsights")}
											</CardTitle>
											<CardDescription>{t("home.wakatime.codingHabits")}</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{/* Daily Average */}
												<div className="flex flex-col gap-1">
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium">{t("home.wakatime.dailyAverage")}</span>
														<span className="text-[#77BBDD] font-bold">
															{wakaTimeData.timeTrackingData.data.grand_total.human_readable_daily_average}
														</span>
													</div>
													<Progress
														value={Math.min(
															(Number.parseFloat(wakaTimeData.timeTrackingData.data.grand_total.human_readable_daily_average.replace(/[^0-9.]/g, "")) / 8) * 100,
															100,
														)}
														className="h-2"
													/>
												</div>

												{/* Productivity Score - Calculated based on consistency */}
												<div className="flex flex-col gap-1">
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium">{t("home.wakatime.productivityScore")}</span>
														<span className="text-[#77BBDD] font-bold">
															{Math.round((wakaTimeData.timeTrackingData.data.range.days_minus_holidays
																/ wakaTimeData.timeTrackingData.data.range.days_including_holidays) * 100)}
															%
														</span>
													</div>
													<Progress
														value={(wakaTimeData.timeTrackingData.data.range.days_minus_holidays
															/ wakaTimeData.timeTrackingData.data.range.days_including_holidays) * 100}
														className="h-2"
													/>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							)
						: (
								<Card>
									<CardContent className="py-8 text-center">
										<p className="text-muted-foreground">{t("home.wakatime.unableToLoad")}</p>
										<p className="text-muted-foreground text-sm mt-2">
											{t("home.wakatime.checkSettings")}
										</p>
									</CardContent>
								</Card>
							)}
				</section>
			</div>
		</div>
	);
};

export default HomeLayout;
