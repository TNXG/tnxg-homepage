"use client";

import { LoadingSpinner } from "@/components/loading";

export default function Page() {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<LoadingSpinner />
		</div>
	);
}
