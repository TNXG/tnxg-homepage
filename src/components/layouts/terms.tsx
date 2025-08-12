"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
		<div className="mx-auto px-4 py-8 container sm:py-12">
			<motion.div
				className="mb-8 sm:mb-12"
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<h1 className="text-2xl font-bold lg:text-4xl sm:text-3xl">
					<mark className="line">网站须知</mark>
				</h1>
				<div className="text-muted-foreground text-sm mt-4 max-w-full whitespace-pre-wrap break-words sm:max-w-[80%]">
					请仔细阅读以下内容，了解本站的使用条款、隐私政策和免责声明。
				</div>
			</motion.div>

			<div className="mx-auto max-w-4xl">
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
				>
					<Card className="w-full shadow-sm transition-shadow duration-300 hover:shadow-md">
						<CardHeader>
							<div className="flex gap-3 items-center">
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
