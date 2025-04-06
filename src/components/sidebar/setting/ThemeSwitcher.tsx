"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";

const themes = [
	{
		value: "light",
		label: "Light",
		alias: ["day", "sun", "亮色", "明るい", "白色", "日间", "昼間", "shiro", "shiroko", "白", "日"],
		icon: "mingcute:sun-line",
	},
	{
		value: "dark",
		label: "Dark",
		alias: ["night", "moon", "暗色", "暗い", "黑色", "夜间", "夜", "yoon", "yoonji", "黑", "暗"],
		icon: "mingcute:moon-line",
	},
	{
		value: "system",
		label: "System",
		alias: ["auto", "system default", "系统", "システム", "システムデフォルト", "系统默认", "default"],
		icon: "mingcute:monitor-line",
	},
];

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(theme);
	const t = useTranslations();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between dark:bg-gray-900 dark:text-gray-300"
				>
					<div className="flex items-center">
						<Icon
							icon={
								themes.find(themeItem => themeItem.value === value)?.icon
								?? "mingcute:question-line"
							}
							className="mr-2 size-4"
						/>
						{`${t("currentTheme")}: ${t(`themes.${themes.find(themeItem => themeItem.value === value)?.value}`)
						|| t("themes.system")}`}
					</div>
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder={t("themes.searchThemes")}
					/>
					<CommandList>
						<CommandEmpty>{t("themes.noThemeFound")}</CommandEmpty>
						<CommandGroup>
							{themes.map(themeItem => (
								<CommandItem
									key={themeItem.value}
									value={themeItem.value}
									keywords={themeItem.alias}
									onSelect={(currentValue) => {
										setValue(currentValue);
										setTheme(currentValue);
										setOpen(false);
									}}
								>
									<Icon icon={themeItem.icon} className="mr-2 size-4" />
									<span>{t(`themes.${themeItem.value}`)}</span>
									<Icon
										icon="mingcute:check-line"
										className={cn(
											"ml-auto",
											value === themeItem.value ? "opacity-100" : "opacity-0",
										)}
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
