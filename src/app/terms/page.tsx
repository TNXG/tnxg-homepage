import type { Metadata } from "next";
import TermsLayout from "@/components/layouts/terms";
import { MarkdownRender } from "@/components/render/markdown";
import { getContentFile } from "@/lib/server-utils";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import "server-only";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: t("sidebar.sections.terms"),
	};
}

const getTermsContent = cache(async () => {
	try {
		// 读取terms.md文件内容
		const response = await getContentFile("terms.md");
		if (!response) {
			throw new Error("Terms content not found");
		}
		// 渲染Markdown内容
		const renderedContent = await MarkdownRender(response);
		return renderedContent;
	} catch (error) {
		console.error("Error fetching terms content:", error);
		const locale = await getLocale();
		const t = await getTranslations({ locale });
		return `<p>${t("common.errors.content_load_failed")}</p>`;
	}
});

// Page 组件（Next.js 13+ 约定）
export default async function Page() {
	const termsContent = await getTermsContent();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="max-w-4xl w-full">
				<TermsLayout content={termsContent} />
			</div>
		</div>
	);
}
