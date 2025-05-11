"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface TermsProps {
	content?: string;
}

export const TermsLayout: React.FC<TermsProps> = ({ content }) => {
	useEffect(() => {
		const hash = decodeURIComponent(window.location.hash);
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});

				element.classList.add(
					"bg-yellow-100",
					"text-gray-800",
					"dark:bg-[#444444]",
					"dark:text-white",
					"ring-2",
					"ring-[#77BBDD]",
					"rounded-lg",
					"px-2",
					"py-1",
					"shadow-md",
					"transition-all",
					"duration-500",
					"scale-105",
				);

				const fadeTimeout = setTimeout(() => {
					element.classList.remove("bg-yellow-100", "dark:bg-[#444444]", "ring-2", "shadow-md", "scale-105");
					element.classList.add("opacity-90");
				}, 2000);

				const cleanupTimeout = setTimeout(() => {
					element.classList.remove(
						"text-gray-800",
						"dark:text-white",
						"rounded-lg",
						"px-2",
						"py-1",
						"opacity-90",
					);
				}, 3000);

				return () => {
					clearTimeout(fadeTimeout);
					clearTimeout(cleanupTimeout);
				};
			}
		}
	}, []);

	return (
		<div className="mb-6 mt-5 px-2 flex flex-col w-full items-start lg:px-6 sm:px-4">
			<motion.h1
				className="text-2xl font-bold mt-8 lg:text-4xl sm:text-3xl sm:mt-10"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<mark className="line">网站须知</mark>
				<div className="text-muted-foreground text-sm mt-4 max-w-full whitespace-pre-wrap break-words sm:max-w-[80%]">
					请仔细阅读以下内容，了解本站的使用条款、隐私政策和免责声明。
				</div>
			</motion.h1>

			<div className="mx-auto px-2 py-6 max-w-[95%] w-full sm:px-4 sm:py-8 lg:max-w-4xl sm:max-w-2xl">
				<motion.div
					className="mt-5"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<Card className="w-full shadow-sm">
						<CardHeader>
							<div className="flex items-center space-x-4">
								<Icon
									icon="mingcute:file-more-line"
									className="text-primary size-6"
								/>
								<p className="text-lg font-medium">网站须知</p>
							</div>
						</CardHeader>
						<CardContent>
							<div
								className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
								dangerouslySetInnerHTML={{
									__html: content || "文章获取失败",
								}}
							/>
						</CardContent>
						<Separator className="my-2" />
					</Card>
				</motion.div>
			</div>
		</div>
	);
};

export default TermsLayout;
