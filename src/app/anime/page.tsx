import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
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

const getBangumiUserData = async (): Promise<BangumiUserData> => {
	return fetch(`https://api.bgm.tv/v0/users/${APIConfig.bangumi.username}`, {
		headers: {
			"User-Agent": "TNXG/tnxg-homepage (https://github.com/tnxg/tnxg-homepage)",
		},
	}).then(res => res.json()) as Promise<BangumiUserData>;
};

const getBangumiCollections = async (): Promise<BangumiCollectionItem[]> => {
	const allCollections: BangumiCollectionItem[] = [];
	let offset = 0;
	const limit = 50; // 每页数量
	let hasMore = true;

	while (hasMore) {
		const response = await fetch(`https://api.bgm.tv/v0/users/${APIConfig.bangumi.username}/collections?offset=${offset}&limit=${limit}`, {
			headers: {
				"User-Agent": "TNXG/tnxg-homepage (https://github.com/tnxg/tnxg-homepage)",
			},
		}).then(res => res.json()) as BangumiCollectionsResponse;

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
