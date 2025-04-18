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
			<DialogContent className="p-6 rounded-lg bg-white max-w-[90vw] shadow-lg dark:bg-gray-800 sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold sm:text-xl dark:text-white">
						Settings
					</DialogTitle>
					<DialogDescription className="text-sm mt-2 sm:text-base dark:text-gray-300">
						{t("settingsDescription")}
					</DialogDescription>
				</DialogHeader>
				<div className="py-4 gap-6 grid sm:gap-8">
					<div className="flex flex-col gap-4">
						<h3 className="text-sm text-gray-700 font-medium sm:text-base dark:text-white">
							Language
						</h3>
						<LanguageSwitcher />
					</div>
					<div className="flex flex-col gap-4">
						<h3 className="text-sm text-gray-700 font-medium sm:text-base dark:text-white">
							Theme
						</h3>
						<ThemeSwitcher />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
