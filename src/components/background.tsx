"use client";

interface BackgroundProps {
	imageUrl: string;
}

export default function Background({ imageUrl }: BackgroundProps) {
	return (
		<div
			id="background"
			className="max-w-[50vw] w-auto opacity-[0.5] aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-10 object-cover custom-clip-path"
			style={{ backgroundImage: `url(${imageUrl})` }}
		/>
	);
}
