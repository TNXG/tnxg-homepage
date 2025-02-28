import type { RecentlyModel } from "@mx-space/api-client";
import type { Metadata } from "next";
import RecentlyLayout from "@/components/layouts/recently";
import { MarkdownRender } from "@/components/render/markdown";
import { APIConfig } from "@/config";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
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
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch recently data: ${res.status}`);
		}

		const originalData: RecentlyModel[] = (await res.json()).data;

		// 获取 Misskey 数据
		const misskeyRes = await fetch(`${APIConfig.endpoints.misskey}/api/users/notes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: APIConfig.misskey.user,
				limit: 40,
				i: APIConfig.misskey.token,
			}),
		});

		let combinedData = [...originalData];

		if (misskeyRes.ok) {
			const misskeyData = await misskeyRes.json();
			const misskeyRecentlies: RecentlyModel[] = misskeyData.map((note: any) => {
				// 处理图片
				const imageUrls = note.files?.map((file: any) => file.url) || [];
				const imageMarkdown = imageUrls.length
					? `\n\n${imageUrls.map((url: string) => `![image](${url})`).join("\n")}`
					: "";

				return {
					id: `misskey-${note.id}`,
					content: (note.text || "") + imageMarkdown,
					created: new Date(note.createdAt).toISOString(),
					modified: new Date(note.createdAt).toISOString(),
				};
			});
			combinedData = [...combinedData, ...misskeyRecentlies];
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
	}
	catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
});

// 重命名为 Page 组件（Next.js 13+ 约定）
export default async function Page() {
	const recentlies = await getRecentlies();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-4xl">
				<RecentlyLayout Recentlies={recentlies} />
			</div>
		</div>
	);
}
