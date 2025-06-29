"use client";

import { decode } from "blurhash";
import { useEffect, useRef, useState } from "react";

export function BlurhashImage({
	hash,
	width = 32,
	height = 32,
	punch = 1,
	className = "",
	onLoad,
}: {
	hash: string;
	width?: number;
	height?: number;
	punch?: number;
	className?: string;
	onLoad?: () => void;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!hash || !canvasRef.current)
			return;

		const loadBlurhash = async () => {
			try {
				const pixels = decode(hash, width, height, punch);
				const ctx = canvasRef.current?.getContext("2d");
				if (!ctx)
					return;

				const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);
				ctx.putImageData(imageData, 0, 0);
				setIsLoaded(true);
				onLoad?.();
			} catch (error) {
				console.error("Error decoding Blurhash:", error);
			}
		};

		// 添加一个小的延迟以确保canvas已经准备好
		const timer = setTimeout(loadBlurhash, 10);

		return () => {
			clearTimeout(timer);
		};
	}, [hash, width, height, punch, onLoad]);

	// 预加载效果
	useEffect(() => {
		if (!canvasRef.current)
			return;

		// 设置初始状态 - 半透明的渐变背景
		const ctx = canvasRef.current.getContext("2d");
		if (ctx && !isLoaded) {
			const gradient = ctx.createLinearGradient(0, 0, width, height);
			gradient.addColorStop(0, "rgba(100, 150, 200, 0.3)");
			gradient.addColorStop(0.5, "rgba(150, 100, 200, 0.3)");
			gradient.addColorStop(1, "rgba(200, 150, 100, 0.3)");

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
		}
	}, [width, height, isLoaded]);

	if (!hash)
		return null;

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			className={`${className} transition-all duration-700 ease-out ${
				isLoaded
					? "opacity-100 scale-100 blur-0"
					: "opacity-50 scale-105 blur-sm"
			}`}
			style={{
				filter: isLoaded ? "none" : "blur(2px)",
				transform: isLoaded ? "scale(1)" : "scale(1.05)",
			}}
			aria-hidden="true"
		/>
	);
}
