"use client";

import { LoadingSpinner } from "@/components/loading";

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<LoadingSpinner />
		</div>
	);
}
