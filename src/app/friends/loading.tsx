"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FRIEND_CARD_SKELETON_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;

export default function Page() {
	return (
		<div className="mx-auto mb-10 mt-6 px-4 flex flex-col max-w-6xl items-start lg:px-10 sm:px-6" aria-busy="true" aria-live="polite">
			{/* Title skeleton */}
			<div className="mt-12 w-full space-y-4">
				<Skeleton className="h-12 w-64 lg:h-16 lg:w-96 sm:h-14 sm:w-80" />
				<div className="space-y-2">
					<Skeleton className="h-4 max-w-2xl w-full" />
					<Skeleton className="h-4 max-w-2xl w-3/4" />
					<Skeleton className="h-4 max-w-2xl w-1/2" />
				</div>
				<Skeleton className="mt-4 h-10 w-32" />
			</div>

			{/* Friends cards grid skeleton */}
			<div className="fade-in animate-in mx-auto mt-2 px-2 py-10 flex flex-col max-w-6xl w-full duration-500 items-center sm:px-4">
				<div className="gap-6 grid grid-cols-1 w-full sm:gap-8 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
					{FRIEND_CARD_SKELETON_KEYS.map(key => (
						<Card key={key} className="group border-border/50 mx-auto px-4 py-3 border rounded-xl bg-white/70 flex gap-3 max-w-xl w-full items-start backdrop-blur-md sm:px-5 sm:py-4 dark:bg-gray-800/70">
							{/* Avatar skeleton */}
							<Skeleton className="rounded-full bg-white size-11 ring-1 ring-black/5 shadow-sm sm:size-12 dark:ring-white/10" />

							{/* Content skeleton */}
							<div className="flex-1 min-w-0 space-y-2">
								<Skeleton className="h-5 w-3/4 sm:h-6" />
								<Skeleton className="h-4 w-full sm:h-4" />
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
