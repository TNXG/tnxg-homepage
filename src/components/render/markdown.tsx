import type { ShikiTransformerContext } from "@shikijs/core";
import type { RehypeShikiOptions } from "@shikijs/rehype";
import type { Element } from "hast";
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

export const MarkdownRender = cache(async (content: string): Promise<string> => {
	try {
		const options: RehypeShikiOptions = {
			theme: "dark-plus",
			langs: ["python", "javascript", "json"],
			transformers: [
				{
					code(this: ShikiTransformerContext, node: Element) {
						// 获取当前代码块的语言
						const currentLang = this.options.lang || "text";
						const codeContent = this.source;

						// 保留原有的类名
						const originalClassName
                            = (node.properties?.className as string[]) || [];

						// 添加新的类名，同时保留原有的类名
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

		const processor = unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(remarkMath)
			.use(rehypeKatex)
			.use(rehypeShiki, options)
			.use(remarkGfm)
			.use(rehypeStringify);

		const result = await processor.process(content);

		return result.toString();
	}
	catch (error) {
		console.error("处理 Markdown 内容时出错:", error);
		throw error;
	}
});

export default MarkdownRender;
