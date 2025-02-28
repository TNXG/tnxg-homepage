"use client";

import type { Locale } from "@/locales";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserLocale, setUserLocale } from "@/lib/server-utils";
import { locales } from "@/locales";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function switchLanguage(locale: Locale) {
	setUserLocale(locale);
}

const alias = {
	zh: [
		"中文",
		"汉语",
		"简体中文",
		"普通话",
		"汉",
		"zh",
		"zh-cn",
		"zh_cn",
		"zh-hans",
		"zh-hans-cn",
		"chinese",
		"mandarin",
		"simplified chinese",
		"chinese simplified",
		"china",
		"汉字",
		"简体",
	],
	ja: [
		"日本語",
		"日语",
		"にほんご",
		"jp",
		"ja",
		"ja-jp",
		"japanese",
		"nihongo",
		"nippon-go",
	],
	en: [
		"English",
		"英语",
		"en",
		"en-us",
		"en-us-utf8",
		"eng",
		"en-gb",
		"american english",
		"british english",
		"english language",
	],
};

export function LanguageSwitcher() {
	const t = useTranslations();
	const [locale, setLocale] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// Fetch locale asynchronously
		const fetchLocale = async () => {
			const userLocale = await getUserLocale();
			setLocale(userLocale);
		};

		fetchLocale();
	}, []);

	if (locale === null) {
		return (
			<Button variant="outline" className="w-[200px] justify-start">
				<Skeleton className="h-4 w-[150px]" />
			</Button>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between dark:bg-gray-900 dark:text-gray-300"
				>
					<Icon icon="mingcute:translate-line" className="mr-2 size-4" />
					{`${t("currentLanguage")}: ${t(`languages.${locale}`)}`}
					<Icon icon="mingcute:align-arrow-down-line" className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={t("languages.searchLanguages")} />
					<CommandList>
						<CommandEmpty>{t("languages.noLanguageFound")}</CommandEmpty>
						<CommandGroup>
							{locales.map(loc => (
								<CommandItem
									key={loc}
									value={loc}
									keywords={alias[loc]}
									onSelect={(currentValue) => {
										switchLanguage(currentValue as Locale);
										setLocale(currentValue);
										setOpen(false);
									}}
								>
									<span>{t(`languages.${loc}`)}</span>
									<Icon
										icon="mingcute:check-line"
										className={`ml-auto ${locale === loc ? "opacity-100" : "opacity-0"}`}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
