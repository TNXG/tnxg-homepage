"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SiteConfig } from "@/config";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

import React from "react";

export const HomeLayout: React.FC = () => {
	const t = useTranslations();

	return (
		<div className="w-full flex flex-col items-start mb-6 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col md:flex-row items-start justify-center mx-auto px-4 py-8 pt-16 font-[moonbridge]">
				<div className="avatar">
					<Avatar className="w-24 h-24 mask mask-squircle -z-1">
						<AvatarImage src={SiteConfig.Avatar} alt={t(SiteConfig.master)} loading="lazy" className="h-24 w-24 object-cover" />
						<AvatarFallback className="mask mask-squircle">{t(SiteConfig.master)[0]}</AvatarFallback>
					</Avatar>
				</div>
				<div className="ml-0 md:ml-4 mt-4 md:mt-0">
					<h1 className="text-6xl font-bold">{t(SiteConfig.HomeConfig.greeting)}</h1>
					<div className="flex items-center space-x-2">
						<h2 className="text-5xl font-bold mt-4">{t(SiteConfig.HomeConfig.namePrefix)}</h2>
						<h2 className="text-5xl font-bold text-[#77BBDD] mt-4">
							<sup className="text-xs">{t(SiteConfig.HomeConfig.nameJP)}</sup>
							<br />
							{t(SiteConfig.master)}
						</h2>
						<span className="text-2xl font-medium break-words">{t(SiteConfig.HomeConfig.nameEN)}</span>
					</div>
					<br />
					<p className="text-xl mt-2">{t(SiteConfig.HomeConfig.motto)}</p>
					<div className="flex flex-wrap items-center gap-4 mt-4 mb-4 font-sans">
						{SiteConfig.HomeConfig.socialLinks.map((link, index) => (
							<Button
								key={index}
								asChild
								className="gap-2"
							>
								<a href={link.url} target="_blank" rel="noopener noreferrer">
									<Icon icon={link.icon} width="24" height="24" />
									<span>{t(link.name)}</span>
								</a>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeLayout;
