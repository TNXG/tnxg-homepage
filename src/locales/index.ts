import { getUserLocale } from "@/lib/server-utils";

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	// 获取简单语言代码用于加载语言文件
	const simpleLocale = locale.split("-")[0];

	return {
		locale, // 使用完整的语言标签作为HTML的lang属性
		messages: (await import(`./${simpleLocale}.json`)).default,
	};
});

export type Locale = (typeof locales)[number];

export const locales = ["zh-CN", "ja-JP", "en-US"] as const;
export const defaultLocale: Locale = "zh-CN";

// 为了向后兼容，提供简单语言代码到标准语言标签的映射
export const localeMapping: Record<string, Locale> = {
	zh: "zh-CN",
	ja: "ja-JP",
	en: "en-US",
};
