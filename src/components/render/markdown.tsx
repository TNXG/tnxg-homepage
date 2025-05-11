import type { ShikiTransformerContext } from "@shikijs/core";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { Element } from "hast";
import type { BundledLanguage } from "shiki";
import { SiteConfig } from "@/config";
import rehypeShiki from "@shikijs/rehype";
import { cache } from "react";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

// Bilibili视频信息获取
async function getBilibiliVideoInfo(url: string) {
	const videoIdMatch = url.match(/bilibili\.com\/video\/([a-zA-Z0-9]+)/);
	if (!videoIdMatch) {
		return null;
	}

	const videoId = videoIdMatch[1];
	const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${videoId}`;

	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch Bilibili video info: ${response.status}`);
		}

		const data = await response.json();
		if (data.code !== 0) {
			console.warn(`Bilibili API returned error code: ${data.code}`);
			return null;
		}

		const { title, desc, owner, pic } = data.data;
		return {
			title,
			desc,
			author: owner.name,
			cover: pic,
		};
	} catch (error) {
		console.error("Error fetching Bilibili video info:", error);
		return null;
	}
}

export const MarkdownRender = cache(async (content: string): Promise<string> => {
	try {
		// 检查内容是否为空
		if (!content || content.trim() === "") {
			console.warn("Empty content passed to MarkdownRender");
			return "<div class=\"prose-custom dark:prose-custom-dark\"><p>No content available.</p></div>";
		}

		// 添加自定义排版样式的包装器
		const wrapWithTypography = (html: string) => `<div class="prose-custom dark:prose-custom-dark">${html}</div>`;

		const options: RehypeShikiOptions = {
			theme: "dark-plus",
			langs: SiteConfig.Shiki.langs as BundledLanguage[],
			transformers: [
				{
					code(this: ShikiTransformerContext, node: Element) {
						const currentLang = this.options.lang || "text";
						const codeContent = this.source;
						const originalClassName = (node.properties?.className as string[]) || [];
						node.properties = {
							...node.properties,
							className: [
								...originalClassName,
								"font-mono",
								"rounded-lg",
								"overflow-hidden",
								"bg-[#1E1E1E]",
								"mb-4",
							],
						};
						node.tagName = "div";
						node.children = [
							{
								type: "element",
								tagName: "div",
								properties: {
									className: [
										"flex",
										"items-center",
										"justify-between",
										"px-4",
										"py-2",
										"bg-[#323233]",
										"text-white",
										"rounded-lg",
									],
								},
								children: [
									{
										type: "element",
										tagName: "span",
										properties: { className: ["text-sm"] },
										children: [{ type: "text", value: currentLang }],
									},
									{
										type: "element",
										tagName: "button",
										properties: {
											"className": [
												"bg-[#4D4D4D]",
												"hover:bg-[#5A5A5A]",
												"text-white",
												"px-2",
												"py-1",
												"rounded",
												"text-xs",
											],
											"data-code-content": codeContent.replace(/`/g, "\\`"),
										},
										children: [{ type: "text", value: "复制" }],
									},
								],
							},
							...node.children,
						];
						return node;
					},
				},
			],
		};

		const bilibiliLinks: { node: any; url: string }[] = [];

		const processor = unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(remarkMath)
			.use(rehypeKatex)
			.use(rehypeShiki, options)
			.use(rehypeStringify)
			.use(() => (tree) => {
				visit(tree, "element", (node: any) => {
					if (node.tagName === "img") {
						const originalClassName = (node.properties?.className || []) as string[];
						node.properties = {
							...node.properties,
							className: [
								...originalClassName,
								"my-4",
							],
							loading: "lazy",
						};
					}

					if (node.tagName === "a" && node.properties?.href) {
						const url = node.properties.href;
						if (url.includes("bilibili.com")) {
							bilibiliLinks.push({ node, url });
						} else {
							node.properties.target = "_blank";
							node.properties.rel = "noopener noreferrer";
						}
					}

					// 新增标题ID处理
					if (/^h[1-6]$/.test(node.tagName)) {
						const textContent = node.children
							.filter((child: any) => child.type === "text")
							.map((child: any) => child.value)
							.join("")
							.trim()
							.toLowerCase()
							.replace(/[^\w\u4E00-\u9FA5]+/g, "-")
							.replace(/^-|-$/g, "");

						if (textContent) {
							node.properties = node.properties || {};
							node.properties.id = `${textContent}`;
						}
					}
				});
			});

		const result = await processor.process(content);
		let htmlContent = result.toString();

		// 处理所有 Bilibili 链接
		for (const { url } of bilibiliLinks) {
			const videoInfo = await getBilibiliVideoInfo(url);
			if (videoInfo) {
				const linkCount = (videoInfo.desc.match(/https?:\/\/\S+/g) || []).length;
				const processedDesc = linkCount > 5
					? videoInfo.desc.replace(/https?:\/\/\S+/g, "").trim()
					: videoInfo.desc.trim();

				const videoHtml = `
					<div class="mt-6 relative rounded-lg border bg-card text-card-foreground shadow-sm mb-4">
						<div class="flex flex-col sm:flex-row">
							<div class="w-full sm:w-[180px] h-[200px] sm:h-[160px] flex-shrink-0 relative overflow-hidden">
								<img 
									src="${videoInfo.cover}" 
									alt="${videoInfo.title}" 
									class="absolute inset-0 w-full h-full object-cover object-center rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none" 
									referrerpolicy="no-referrer"
									loading="lazy"
								/>
							</div>
							<div class="flex-1 p-3 sm:p-4 min-h-0">
								<div class="flex flex-col h-full">
									<div class="flex-1 min-h-0">
										<h3 class="font-semibold leading-tight text-base mb-1 line-clamp-1">${videoInfo.title}</h3>
										<p class="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 overflow-hidden">${processedDesc}</p>
									</div>
									<div class="flex items-center gap-2 mt-2 pt-2 border-t">
										<span class="inline-flex items-center text-xs text-muted-foreground">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-3 w-3">
												<circle cx="12" cy="12" r="10"/>
												<path d="M12 16v-4"/>
												<path d="M12 8h.01"/>
											</svg>
											作者: ${videoInfo.author}
										</span>
										<span class="text-xs text-muted-foreground">•</span>
										<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-xs text-primary hover:underline">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-3 w-3">
												<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
												<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
											</svg>
											查看原视频
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				`;
				htmlContent = htmlContent.replace(`<a href="${url}">${url}</a>`, videoHtml);
			}
		}

		// 使用自定义排版样式包装HTML内容
		return wrapWithTypography(htmlContent);
	} catch (error) {
		console.error("处理 Markdown 内容时出错:", error);
		throw error;
	}
});

export default MarkdownRender;
