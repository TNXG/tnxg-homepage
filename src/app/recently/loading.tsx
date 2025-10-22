"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RECENTLY_SKELETON_KEYS = ["r1", "r2", "r3", "r4", "r5"] as const;

export default function Page() {
	return (
		<div
			className="mx-auto mb-10 mt-6 px-4 flex flex-col max-w-4xl items-start lg:px-10 sm:px-6"
			aria-busy="true"
			aria-live="polite"
		>
			{/* Title skeleton */}
			<div className="mt-12 w-full space-y-4">
				<Skeleton className="h-12 w-48 lg:h-14 lg:w-56 sm:h-12 sm:w-48" />
				<div className="space-y-2">
					<Skeleton className="h-4 max-w-2xl w-full" />
					<Skeleton className="h-4 max-w-2xl w-2/3" />
				</div>
			</div>

			{/* Recently items skeleton */}
			<div className="fade-in animate-in mx-auto mt-8 px-2 py-10 flex flex-col max-w-4xl w-full duration-500 items-start sm:px-4">
				<div className="w-full space-y-6">
					{RECENTLY_SKELETON_KEYS.map(key => (
						<Card
							key={key}
							className="border-border/50 px-4 py-4 border rounded-lg bg-white/70 flex gap-4 w-full items-start backdrop-blur-md sm:px-6 sm:py-5 dark:bg-gray-800/70"
						>
							{/* Timeline dot skeleton */}
							<div className="mt-2 flex-shrink-0">
								<Skeleton className="bg-primary/50 rounded-full size-3" />
							</div>

							{/* Content skeleton */}
							<div className="flex-1 w-full space-y-3">
								{/* Date skeleton */}
								<Skeleton className="h-3 w-24" />
								{/* Title skeleton */}
								<Skeleton className="h-5 w-3/4" />
								{/* Description skeleton */}
								<div className="pt-2 space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-5/6" />
									<Skeleton className="h-4 w-4/5" />
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
