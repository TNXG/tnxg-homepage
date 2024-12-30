import type { RecentlyModel } from "@mx-space/api-client";
import RecentlyLayout from "@/components/layouts/recently";
import { MarkdownRender } from "@/components/render/markdown";
import { APIConfig } from "@/config";
import { cache } from "react";
import "server-only";

export const metadata = {
	title: "动态",
};

// 使用 cache 包装整个数据获取函数
const getRecentlies = cache(async (): Promise<RecentlyModel[]> => {
	try {
		const res = await fetch(APIConfig.endpoints.recently, {
			next: { revalidate: 60 }, // 添加缓存控制
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch recently data: ${res.status}`);
		}

		const data: RecentlyModel[] = (await res.json()).data;

		// 处理 markdown 内容
		const RecentliesData = await Promise.all(
			data.map(async recently => ({
				...recently,
				content: await MarkdownRender(recently.content),
			})),
		);

		return RecentliesData;
	}
	catch (error) {
		console.error("Error fetching recently data:", error);
		return [];
	}
});

// 重命名为 Page 组件（Next.js 13+ 约定）
export default async function Page() {
	const recentlies = await getRecentlies();

	return (
		<div className="ml-0 xl:ml-96">
			<RecentlyLayout Recentlies={recentlies} />
		</div>
	);
}
