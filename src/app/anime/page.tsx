import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import { BangumiLayout } from "@/components/layouts/anime";
import { APIConfig } from "@/config";
import "server-only";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: t("sidebar.sections.anime"),
	};
}

interface BangumiImage {
	small: string;
	grid: string;
	large: string;
	medium: string;
	common: string;
}

interface BangumiTag {
	name: string;
	count: number;
	total_cont: number;
}

interface BangumiSubject {
	date: string;
	images: BangumiImage;
	name: string;
	name_cn: string;
	short_summary: string;
	tags: BangumiTag[];
	score: number;
	type: number;
	id: number;
	eps: number;
	volumes: number;
	collection_total: number;
	rank: number;
}

export interface BangumiCollectionItem {
	updated_at: string;
	comment: string | null;
	tags: string[];
	subject: BangumiSubject;
	subject_id: number;
	vol_status: number;
	ep_status: number;
	subject_type: number;
	type: number;
	rate: number;
	private: boolean;
}

export interface BangumiUserData {
	avatar: {
		large: string;
		medium: string;
		small: string;
	};
	sign: string;
	url: string;
	username: string;
	nickname: string;
	id: number;
	user_group: number;
	reg_time: string;
	email: string;
	time_offset: number;
}

export interface BangumiCollectionsResponse {
	data: BangumiCollectionItem[];
	total: number;
	limit: number;
	offset: number;
}

// 获取用户数据的缓存函数
const getBangumiUserData = cache(async (): Promise<BangumiUserData> => {
	const response = await fetch(`https://api.bgm.tv/v0/users/${APIConfig.bangumi.username}`, {
		headers: {
			"User-Agent": "TNXG/tnxg-homepage (https://github.com/tnxg/tnxg-homepage)",
		},
		next: { revalidate: 60 * 30 }, // 30 分钟缓存
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch user data: ${response.status}`);
	}

	return response.json() as Promise<BangumiUserData>;
});

// 获取单页收藏数据的缓存函数
const getBangumiCollectionsPage = cache(async (offset: number, limit: number): Promise<BangumiCollectionsResponse> => {
	const response = await fetch(`https://api.bgm.tv/v0/users/${APIConfig.bangumi.username}/collections?offset=${offset}&limit=${limit}`, {
		headers: {
			"User-Agent": "TNXG/tnxg-homepage (https://github.com/tnxg/tnxg-homepage)",
		},
		next: { revalidate: 1800 }, // 30 分钟缓存
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch collections: ${response.status}`);
	}

	return response.json() as Promise<BangumiCollectionsResponse>;
});

// 获取所有收藏数据
const getBangumiCollections = async (): Promise<BangumiCollectionItem[]> => {
	const allCollections: BangumiCollectionItem[] = [];
	let offset = 0;
	const limit = 50; // 每页数量
	let hasMore = true;

	while (hasMore) {
		const response = await getBangumiCollectionsPage(offset, limit);

		allCollections.push(...response.data);

		// 检查是否还有更多数据
		offset += limit;
		hasMore = response.offset + response.data.length < response.total;
	}

	return allCollections;
};

// Page 组件（Next.js 13+ 约定）
// Page 组件（Next.js 13+ 约定）
export default async function Page() {
	const userData = await getBangumiUserData();
	const collections = await getBangumiCollections();
	return (
		<div className="mx-auto py-8 container">
			<div className="mx-auto max-w-4xl">
				<BangumiLayout collections={collections} userInfo={userData} />
			</div>
		</div>
	);
}
