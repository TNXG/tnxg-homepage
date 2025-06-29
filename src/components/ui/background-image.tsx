"use client";

import { useEffect, useState } from "react";

interface BackgroundImageProps {
	src: string;
	className?: string;
	onLoad?: () => void;
	onError?: () => void;
}

export function BackgroundImage({ src, className = "", onLoad, onError }: BackgroundImageProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const img = new Image();

		img.onload = () => {
			setIsLoaded(true);
			onLoad?.();
		};

		img.onerror = () => {
			setHasError(true);
			onError?.();
		};

		img.src = src;

		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [src, onLoad, onError]);

	if (hasError)
		return null;

	return (
		<img
			alt="Background"
			className={`${className} transition-opacity duration-1000 ${
				isLoaded ? "opacity-100" : "opacity-0"
			}`}
			src={src}
		/>
	);
}
