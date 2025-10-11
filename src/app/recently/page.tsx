import type { RecentlyModel } from "@mx-space/api-client";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import RecentlyLayout from "@/components/layouts/recently";
import { MarkdownRender } from "@/components/render/markdown";
import { APIConfig } from "@/config";
import "server-only";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: t("sidebar.sections.recently"),
	};
}

// 使用 cache 包装整个数据获取函数
const getRecentlies = cache(async (): Promise<RecentlyModel[]> => {
	try {
		// 获取原有数据
		const res = await fetch(APIConfig.endpoints.recently, {
			next: { revalidate: 60 * 10 }, // 10 分钟缓存
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch recently data: ${res.status}`);
		}

		const data = await res.json();
		if (!data || !data.data) {
			throw new Error("Invalid response format");
		}

		const originalData: RecentlyModel[] = data.data;

		// 获取 Blinko 数据
		const blinkoRes = await fetch(`${APIConfig.endpoints.blinko}/v1/note/list`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${APIConfig.blinko.token}`,
			},
			next: { revalidate: 60 * 10 },
		});

		let combinedData = [...originalData];

		if (blinkoRes.ok) {
			const blinkoData = await blinkoRes.json();
			const blinkoRecentlies: RecentlyModel[] = blinkoData
				.filter((note: BlinkoNote) => note.type === 0)
				.map((note: BlinkoNote) => ({
					id: `blinko-${note.id}`,
					content: note.content,
					created: new Date(note.createdAt),
					modified: new Date(note.updatedAt),
				}));
			combinedData = [...combinedData, ...blinkoRecentlies];
		}

		// 按时间排序
		combinedData.sort((a, b) =>
			new Date(b.created).getTime() - new Date(a.created).getTime(),
		);

		// 处理 markdown 内容
		const RecentliesData = await Promise.all(
			combinedData.map(async recently => ({
				...recently,
				content: await MarkdownRender(recently.content),
			})),
		);

		return RecentliesData;
	} catch (error) {
		console.error("Error fetching recently data:", error);
		// 返回空数组，但记录详细错误信息
		const locale = await getLocale();
		const t = await getTranslations({ locale });
		console.warn(t("common.errors.content_load_failed"));
		return [];
	}
});

// 重命名为 Page 组件（Next.js 13+ 约定）
export default async function Page() {
	const recentlies = await getRecentlies();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="max-w-4xl w-full">
				<RecentlyLayout Recentlies={recentlies} />
			</div>
		</div>
	);
}
