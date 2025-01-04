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
					<Settings className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">{t("settings")}</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-w-[90vw] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<DialogHeader>
					<DialogTitle className="dark:text-white text-lg sm:text-xl font-semibold">
						{t("settings")}
					</DialogTitle>
					<DialogDescription className="dark:text-gray-300 text-sm sm:text-base mt-2">
						{t("settingsDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 sm:gap-8 py-4">
					<div className="flex flex-col gap-4">
						<h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-white">
							{t("language")}
						</h3>
						<LanguageSwitcher />
					</div>
					<div className="flex flex-col gap-4">
						<h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-white">
							{t("theme")}
						</h3>
						<ThemeSwitcher />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
