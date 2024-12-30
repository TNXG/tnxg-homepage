"use client";

import { SiteConfig } from "@/config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Background() {
	const [randomImage] = useState(
		SiteConfig.BackgroundConfig.images[
			Math.floor(Math.random() * SiteConfig.BackgroundConfig.images.length)
		],
	);

	const updateBackgroundImage = () => {
		const background = document.getElementById("background") as HTMLElement | null;
		if (background) {
			const img = new Image();
			img.onload = () => {
				background.style.backgroundImage = `url(${randomImage})`;
			};
			img.src = randomImage;
		}
	};

	useEffect(() => {
		updateBackgroundImage();
	}, [randomImage]);

	return (
		<motion.div
			id="background"
			className="max-w-[50vw] w-auto aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-[1] object-cover custom-clip-path"
			initial={{ opacity: 0 }}
			animate={{ opacity: SiteConfig.BackgroundConfig.opacity }}
			transition={{ duration: 1 }}
		/>
	);
}

export default Background;
