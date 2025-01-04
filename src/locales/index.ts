import { getUserLocale } from "@/lib/server-utils";

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: (await import(`./${locale}.json`)).default,
	};
});

export type Locale = (typeof locales)[number];

export const locales = ["zh", "ja", "en"] as const;
export const defaultLocale: Locale = "zh";
