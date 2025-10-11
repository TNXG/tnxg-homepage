"use client";

import type { BangumiCollectionItem, BangumiUserData } from "@/app/anime/page";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 根据不同的媒体类型和收藏状态返回对应的文本（i18n）
const getCollectionName = (
	collectionType: number,
	subjectType: number,
	t: ReturnType<typeof useTranslations>,
) => {
	const actionKey = subjectType === 3 ? "listen" : subjectType === 4 ? "play" : "watch";
	if (collectionType === 4)
		return t("anime.collection.states.onHold");
	if (collectionType === 5)
		return t("anime.collection.states.dropped");
	const action = t(`anime.collection.actions.${actionKey}`);
	switch (collectionType) {
		case 1:
			return t("anime.collection.states.want", { action });
		case 2:
			return t("anime.collection.states.done", { action });
		case 3:
			return t("anime.collection.states.doing", { action });
		default:
			return "";
	}
};

const COLLECTION_COLORS = {
	1: "bg-blue-100 text-blue-800",
	2: "bg-green-100 text-green-800",
	3: "bg-yellow-100 text-yellow-800",
	4: "bg-gray-100 text-gray-800",
	5: "bg-red-100 text-red-800",
};

const SUBJECT_TYPES = {
	1: { key: "1", icon: "mingcute:book-6-line" },
	2: { key: "2", icon: "mingcute:tv-2-line" },
	3: { key: "3", icon: "mingcute:music-line" },
	4: { key: "4", icon: "mingcute:game-1-line" },
	6: { key: "6", icon: "mingcute:user-heart-line" },
} as const;

const SubjectTypeIcon = ({ type }: { type: number }) => {
	const iconName = SUBJECT_TYPES[type as keyof typeof SUBJECT_TYPES]?.icon || "mingcute:star-line";
	return <Icon icon={iconName} className="h-4 w-4" aria-hidden="true" />;
};

const CollectionBadge = ({ type, subjectType, t }: { type: number; subjectType: number; t: ReturnType<typeof useTranslations> }) => {
	const color = COLLECTION_COLORS[type as keyof typeof COLLECTION_COLORS];
	const name = getCollectionName(type, subjectType, t);
	return (
		<Badge className={color} aria-label={name}>
			{name}
		</Badge>
	);
};

const AnimeCard = ({ item, t }: { item: BangumiCollectionItem; t: ReturnType<typeof useTranslations> }) => {
	const { subject, type, rate, ep_status, vol_status } = item;
	const progress = subject.eps
		? Math.round((ep_status / subject.eps) * 100)
		: 0;

	return (
		<Card className="bg-white/70 w-full transition-shadow duration-300 overflow-hidden backdrop-blur-md dark:bg-gray-800/70 hover:shadow-md">
			<div className="h-40 w-full relative overflow-hidden">
				{subject.images?.common && (
					<img
						src={subject.images.common}
						alt={subject.name_cn || subject.name}
						className="h-full w-full object-cover"
						style={{ objectPosition: "center" }}
						loading="lazy"
					/>
				)}
				<div className="opacity-70 inset-0 absolute from-black/60 to-transparent bg-gradient-to-t"></div>
				<div className="flex gap-2 right-2 top-2 absolute">
					{(() => {
						const typeKey = SUBJECT_TYPES[subject.type as keyof typeof SUBJECT_TYPES]?.key ?? "";
						const label = t(`anime.subjectTypes.${typeKey}`);
						return (
							<Badge variant="secondary" className="flex gap-1 items-center" aria-label={label}>
								<SubjectTypeIcon type={subject.type} />
								{label}
							</Badge>
						);
					})()}
					<CollectionBadge type={type} subjectType={subject.type} t={t} />
				</div>
			</div>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg line-clamp-1">
					<a
						href={`https://bgm.tv/subject/${subject.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-blue-600 hover:underline"
						aria-label={`${subject.name_cn || subject.name} - ${t("anime.linkOnBangumi")}`}
					>
						{subject.name_cn || subject.name}
					</a>
				</CardTitle>
				<CardDescription className="flex gap-2 items-center">
					{subject.score > 0 && (
						<span className="flex gap-1 items-center">
							<Icon icon="mingcute:star-fill" className="text-yellow-400 h-4 w-4" aria-hidden="true" />
							<span aria-label={t("anime.score")}>
								{subject.score.toFixed(1)}
							</span>
						</span>
					)}
					{rate > 0 && (
						<span className="flex gap-1 items-center">
							<span className="text-muted-foreground text-sm">
								{t("anime.myRating")}
								:
							</span>
							{rate}
						</span>
					)}
					{subject.date && (
						<span className="flex gap-1 items-center">
							<Icon icon="mingcute:calendar-line" className="h-4 w-4" aria-hidden="true" />
							{subject.date}
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{subject.short_summary && (
					<p className="text-muted-foreground text-sm line-clamp-2">{subject.short_summary}</p>
				)}
				{subject.eps > 0 && type === 3 && (
					<div className="mt-2">
						<div className="text-xs mb-1 flex justify-between">
							<span>
								{t("anime.progress")}
								:
								{ep_status}
								/
								{subject.eps}
								{t("anime.episodesUnit")}
							</span>
							<span>
								{progress}
								%
							</span>
						</div>
						<Progress value={progress} className="h-2" />
					</div>
				)}
				{subject.volumes > 0 && subject.type === 1 && (
					<div className="mt-2">
						<div className="text-xs mb-1 flex justify-between">
							<span>
								{t("anime.progress")}
								:
								{vol_status}
								/
								{subject.volumes}
								{t("anime.volumesUnit")}
							</span>
							<span>
								{Math.round((vol_status / subject.volumes) * 100)}
								%
							</span>
						</div>
						<Progress value={Math.round((vol_status / subject.volumes) * 100)} className="h-2" />
					</div>
				)}
			</CardContent>
			<CardFooter className="pt-0 flex flex-col gap-2">
				{item.tags && item.tags.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{item.tags.slice(0, 3).map(tag => (
							<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
						))}
						{item.tags.length > 3 && (
							<span className="text-muted-foreground text-xs">
								+
								{item.tags.length - 3}
							</span>
						)}
					</div>
				)}
				{item.comment && (
					<p className="text-muted-foreground text-sm italic">
						"
						{item.comment}
						"
					</p>
				)}
			</CardFooter>
		</Card>
	);
};

const UserProfile = ({ userInfo, t }: { userInfo: BangumiUserData; t: ReturnType<typeof useTranslations> }) => {
	return (
		<Card className="mb-6 bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
			<CardContent className="pt-6 flex gap-4 items-center">
				<Avatar className="h-16 w-16">
					<AvatarImage src={userInfo.avatar.large} alt={userInfo.nickname} />
					<AvatarFallback>{userInfo.nickname.slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="text-xl font-bold">{userInfo.nickname}</h2>
					<p className="text-muted-foreground text-sm">{userInfo.sign || t("anime.profileEmptySign")}</p>
					<div className="mt-1">
						<a
							href={`https://bgm.tv/user/${userInfo.username}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs text-blue-500 hover:underline"
							aria-label={t("anime.linkOnBangumi")}
						>
							@
							{userInfo.username}
							{" "}
							{t("anime.linkOnBangumi")}
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const BangumiLayout = ({ collections, userInfo }: { collections: BangumiCollectionItem[]; userInfo: BangumiUserData }) => {
	const t = useTranslations();
	// 按照收藏类型分组
	const collectionsByType = {
		1: collections.filter(item => item.type === 1), // 想看
		2: collections.filter(item => item.type === 2), // 看过
		3: collections.filter(item => item.type === 3), // 在看
		4: collections.filter(item => item.type === 4), // 搁置
		5: collections.filter(item => item.type === 5), // 抛弃
	};

	// 默认显示的标签（如果有"在看"的内容，则默认显示"在看"，否则显示"看过"）
	const defaultTab = collectionsByType[3].length > 0
		? "3"
		: "2";

	return (
		<div className="space-y-6" role="region" aria-label={t("sidebar.sections.anime")}>
			<UserProfile userInfo={userInfo} t={t} />

			<Tabs defaultValue={defaultTab} className="w-full">
				<nav aria-label="Tabs">
					<TabsList className="w-full">
						<TabsTrigger value="1" aria-label={`${t("anime.tabs.plan")} ${collectionsByType[1].length}`}>
							{t("anime.tabs.plan")}
							{" "}
							<Badge variant="secondary" className="ml-1" aria-hidden="true">{collectionsByType[1].length}</Badge>
						</TabsTrigger>
						<TabsTrigger value="2" aria-label={`${t("anime.tabs.done")} ${collectionsByType[2].length}`}>
							{t("anime.tabs.done")}
							{" "}
							<Badge variant="secondary" className="ml-1" aria-hidden="true">{collectionsByType[2].length}</Badge>
						</TabsTrigger>
						<TabsTrigger value="3" aria-label={`${t("anime.tabs.doing")} ${collectionsByType[3].length}`}>
							{t("anime.tabs.doing")}
							{" "}
							<Badge variant="secondary" className="ml-1" aria-hidden="true">{collectionsByType[3].length}</Badge>
						</TabsTrigger>
						<TabsTrigger value="4" aria-label={`${t("anime.tabs.onHold")} ${collectionsByType[4].length}`}>
							{t("anime.tabs.onHold")}
							{" "}
							<Badge variant="secondary" className="ml-1" aria-hidden="true">{collectionsByType[4].length}</Badge>
						</TabsTrigger>
						<TabsTrigger value="5" aria-label={`${t("anime.tabs.dropped")} ${collectionsByType[5].length}`}>
							{t("anime.tabs.dropped")}
							{" "}
							<Badge variant="secondary" className="ml-1" aria-hidden="true">{collectionsByType[5].length}</Badge>
						</TabsTrigger>
					</TabsList>
				</nav>

				{Object.entries(collectionsByType).map(([type, items]) => (
					<TabsContent key={type} value={type} className="mt-6">
						{items.length > 0
							? (
									<div className="columns-1 lg:columns-3 md:columns-2" style={{ columnGap: "1rem" }}>
										{items.map(item => (
											<div key={item.subject_id} className="mb-4" style={{ breakInside: "avoid" }}>
												<AnimeCard item={item} t={t} />
											</div>
										))}
									</div>
								)
							: (
									<div className="py-12 text-center">
										<p className="text-muted-foreground">{t("anime.empty")}</p>
									</div>
								)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default BangumiLayout;
