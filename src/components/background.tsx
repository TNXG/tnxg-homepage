"use client";

import { useEffect, useState } from "react";

const images = [
	"https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
	"https://cdn.tnxg.top/images/cover/tomori_nst.png",
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
		<div
			id="background"
			className="max-w-[50vw] w-auto opacity-[0.5] aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-[1] object-cover custom-clip-path"
		/>
	);
}

export default Background;
