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
				<Button variant="outline" size="icon" className="size-8">
					<Settings className="size-[1.2rem]" />
					<span className="sr-only">Settings</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[90vw] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold dark:text-white sm:text-xl">
						Settings
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm dark:text-gray-300 sm:text-base">
						{t("settingsDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-6 py-4 sm:gap-8">
					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-medium text-gray-700 dark:text-white sm:text-base">
							Language
						</h3>
						<LanguageSwitcher />
					</div>
					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-medium text-gray-700 dark:text-white sm:text-base">
							Theme
						</h3>
						<ThemeSwitcher />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
