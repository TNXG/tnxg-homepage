"use client";

import { SiteConfig } from "@/config";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Background() {
	const [randomImage] = useState(
		SiteConfig.BackgroundConfig.images[
			Math.floor(Math.random() * SiteConfig.BackgroundConfig.images.length)
		],
	);
	const backgroundRef = useRef<HTMLDivElement | null>(null);

	const updateBackgroundImage = () => {
		const background = backgroundRef.current;
		if (background) {
			const img = new Image();
			img.onload = () => {
				background.style.backgroundImage = `url(${randomImage})`;
			};
			img.src = randomImage;
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						updateBackgroundImage();
						observer.disconnect();
					}
				});
			},
			{
				rootMargin: "0px",
				threshold: 0.1,
			},
		);

		const background = backgroundRef.current;
		if (background) {
			observer.observe(background);
		}

		return () => {
			observer.disconnect();
		};
	}, [randomImage]);

	return (
		<motion.div
			ref={backgroundRef}
			className="custom-clip-path bg-transparent h-full max-w-[50vw] w-auto aspect-[0.5] bottom-0 right-0 fixed bg-cover bg-center bg-no-repeat object-cover -z-[1]"
			initial={{ opacity: 0 }}
			animate={{ opacity: SiteConfig.BackgroundConfig.opacity }}
			transition={{ duration: 1 }}
		/>
	);
}

export default Background;
