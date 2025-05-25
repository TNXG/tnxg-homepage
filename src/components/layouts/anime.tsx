"use client";

import type { BangumiCollectionItem, BangumiUserData } from "@/app/anime/page";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 根据不同的媒体类型和收藏状态返回对应的文本
const getCollectionName = (collectionType: number, subjectType: number) => {
	// 对于搁置和抛弃状态，直接返回
	if (collectionType === 4)
		return "搁置";
	if (collectionType === 5)
		return "抛弃";

	// 根据媒体类型确定动词
	let prefix = "";
	let suffix = "";

	// 默认为看（书籍、动画、三次元）
	if (subjectType === 1 || subjectType === 2 || subjectType === 6) {
		prefix = "想";
		suffix = "看";
	} else if (subjectType === 3) {
		prefix = "想";
		suffix = "听";
	} else if (subjectType === 4) {
		prefix = "想";
		suffix = "玩";
	}

	// 根据收藏类型组合词语
	switch (collectionType) {
		case 1: // 想看/想听/想玩
			return prefix + suffix;
		case 2: // 看过/听过/玩过
			return `${suffix}过`;
		case 3: // 在看/在听/在玩
			return `在${suffix}`;
		default:
			return "未知";
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
	1: { name: "书籍", icon: "mingcute:book-6-line" },
	2: { name: "动画", icon: "mingcute:tv-2-line" },
	3: { name: "音乐", icon: "mingcute:music-line" },
	4: { name: "游戏", icon: "mingcute:game-1-line" },
	6: { name: "三次元", icon: "mingcute:user-heart-line" },
};

const SubjectTypeIcon = ({ type }: { type: number }) => {
	const iconName = SUBJECT_TYPES[type as keyof typeof SUBJECT_TYPES]?.icon || "mingcute:star-line";
	return <Icon icon={iconName} className="h-4 w-4" />;
};

const CollectionBadge = ({ type, subjectType }: { type: number; subjectType: number }) => {
	const color = COLLECTION_COLORS[type as keyof typeof COLLECTION_COLORS];
	const name = getCollectionName(type, subjectType);
	return (
		<Badge className={color}>
			{name}
		</Badge>
	);
};

const AnimeCard = ({ item }: { item: BangumiCollectionItem }) => {
	const { subject, type, rate, ep_status, vol_status } = item;
	const progress = subject.eps ? Math.round((ep_status / subject.eps) * 100) : 0;

	return (
		<Card className="mx-auto w-[80%] transition-shadow duration-300 overflow-hidden sm:w-full hover:shadow-md">
			<div className="h-40 w-full relative overflow-hidden">
				{subject.images?.common && (
					<img
						src={subject.images.common}
						alt={subject.name_cn || subject.name}
						className="h-full w-full object-cover"
						style={{ objectPosition: "center" }}
					/>
				)}
				<div className="bg-gradient-to-t opacity-70 inset-0 absolute from-black/60 to-transparent"></div>
				<div className="flex gap-2 right-2 top-2 absolute">
					<Badge variant="secondary" className="flex gap-1 items-center">
						<SubjectTypeIcon type={subject.type} />
						{SUBJECT_TYPES[subject.type as keyof typeof SUBJECT_TYPES]?.name}
					</Badge>
					<CollectionBadge type={type} subjectType={subject.type} />
				</div>
			</div>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg line-clamp-1">
					<a
						href={`https://bgm.tv/subject/${subject.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-blue-600 hover:underline"
					>
						{subject.name_cn || subject.name}
					</a>
				</CardTitle>
				<CardDescription className="flex gap-2 items-center">
					{subject.score > 0 && (
						<span className="flex gap-1 items-center">
							<Icon icon="mingcute:star-fill" className="text-yellow-400 h-4 w-4" />
							{subject.score.toFixed(1)}
						</span>
					)}
					{rate > 0 && (
						<span className="flex gap-1 items-center">
							<span className="text-muted-foreground text-sm">我的评分:</span>
							{rate}
						</span>
					)}
					{subject.date && (
						<span className="flex gap-1 items-center">
							<Icon icon="mingcute:calendar-line" className="h-4 w-4" />
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
								进度:
								{ep_status}
								/
								{subject.eps}
								集
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
								进度:
								{vol_status}
								/
								{subject.volumes}
								卷
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

const UserProfile = ({ userInfo }: { userInfo: BangumiUserData }) => {
	return (
		<Card className="mb-6">
			<CardContent className="pt-6 flex gap-4 items-center">
				<Avatar className="h-16 w-16">
					<AvatarImage src={userInfo.avatar.large} alt={userInfo.nickname} />
					<AvatarFallback>{userInfo.nickname.slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="text-xl font-bold">{userInfo.nickname}</h2>
					<p className="text-muted-foreground text-sm">{userInfo.sign || "这个人很懒，什么都没留下"}</p>
					<div className="mt-1">
						<a
							href={`https://bgm.tv/user/${userInfo.username}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs text-blue-500 hover:underline"
						>
							@
							{userInfo.username}
							{" "}
							on Bangumi
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export const BangumiLayout = ({ collections, userInfo }: { collections: BangumiCollectionItem[]; userInfo: BangumiUserData }) => {
	// 按照收藏类型分组
	const collectionsByType = {
		1: collections.filter(item => item.type === 1), // 想看
		2: collections.filter(item => item.type === 2), // 看过
		3: collections.filter(item => item.type === 3), // 在看
		4: collections.filter(item => item.type === 4), // 搁置
		5: collections.filter(item => item.type === 5), // 抛弃
	};

	// 默认显示的标签（如果有"在看"的内容，则默认显示"在看"，否则显示"看过"）
	const defaultTab = collectionsByType[3].length > 0 ? "3" : "2";

	return (
		<div className="space-y-6">
			<UserProfile userInfo={userInfo} />

			<Tabs defaultValue={defaultTab} className="w-full">
				<TabsList className="grid grid-cols-5 w-full">
					<TabsTrigger value="1">
						计划
						{" "}
						<Badge variant="secondary" className="ml-1">{collectionsByType[1].length}</Badge>
					</TabsTrigger>
					<TabsTrigger value="2">
						完成
						{" "}
						<Badge variant="secondary" className="ml-1">{collectionsByType[2].length}</Badge>
					</TabsTrigger>
					<TabsTrigger value="3">
						进行中
						{" "}
						<Badge variant="secondary" className="ml-1">{collectionsByType[3].length}</Badge>
					</TabsTrigger>
					<TabsTrigger value="4">
						搁置
						{" "}
						<Badge variant="secondary" className="ml-1">{collectionsByType[4].length}</Badge>
					</TabsTrigger>
					<TabsTrigger value="5">
						抛弃
						{" "}
						<Badge variant="secondary" className="ml-1">{collectionsByType[5].length}</Badge>
					</TabsTrigger>
				</TabsList>

				{Object.entries(collectionsByType).map(([type, items]) => (
					<TabsContent key={type} value={type} className="mt-6">
						{items.length > 0
							? (
									<div className="gap-4 grid grid-cols-1 place-items-center lg:grid-cols-3 md:grid-cols-2 sm:place-items-start">
										{items.map(item => (
											<AnimeCard key={item.subject_id} item={item} />
										))}
									</div>
								)
							: (
									<div className="py-12 text-center">
										<p className="text-muted-foreground">暂无内容</p>
									</div>
								)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default BangumiLayout;
