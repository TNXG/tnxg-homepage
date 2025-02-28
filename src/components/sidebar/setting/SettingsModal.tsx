"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SettingsModal() {
	const t = useTranslations();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings className="size-[1.2rem]" />
					<span className="sr-only">{t("settings")}</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[90vw] rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px] dark:bg-gray-800">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold sm:text-xl dark:text-white">
						{t("settings")}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm sm:text-base dark:text-gray-300">
						{t("settingsDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 py-4 sm:gap-8">
					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-medium text-gray-700 sm:text-base dark:text-white">
							{t("language")}
						</h3>
						<LanguageSwitcher />
					</div>
					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-medium text-gray-700 sm:text-base dark:text-white">
							{t("theme")}
						</h3>
						<ThemeSwitcher />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
