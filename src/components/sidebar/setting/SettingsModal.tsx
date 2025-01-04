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
			<DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
				<DialogHeader>
					<DialogTitle className="dark:text-white">{t("settings")}</DialogTitle>
					<DialogDescription className="dark:text-gray-300">
						{t("settingsDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col items-start gap-4">
						<h3 className="text-sm font-medium dark:text-white">{t("language")}</h3>
						<LanguageSwitcher />
					</div>
					<div className="flex flex-col items-start gap-4">
						<h3 className="text-sm font-medium dark:text-white">{t("theme")}</h3>
						<ThemeSwitcher />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
