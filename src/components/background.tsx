"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
	"https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
	"https://cdn.tnxg.top/images/cover/tomori_nst.png",
	"https://cdn.tnxg.top/images/cover/MyGo!!!!!_Kaisou_Soyo.nst.png",
];

export function Background() {
	const [randomImage] = useState(images[Math.floor(Math.random() * images.length)]);

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
			className="max-w-[50vw] w-auto opacity-[0.5] aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-[1] object-cover custom-clip-path"
			initial={{ opacity: 0 }} // 初始状态，透明
			animate={{ opacity: 0.5 }} // 动画结束，设置透明度为0.5
			transition={{ duration: 1 }} // 动画持续时间
		/>
	);
}

export default Background;
