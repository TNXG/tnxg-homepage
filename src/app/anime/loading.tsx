"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TAB_SKELETON_KEYS = ["plan", "done", "doing", "onHold", "dropped"] as const;
const CARD_SKELETON_KEYS = ["c1", "c2", "c3", "c4", "c5", "c6"] as const;

export default function Page() {
	return (
		<div className="mx-auto py-8 container" aria-busy="true" aria-live="polite">
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Profile skeleton */}
				<Card className="mb-6 bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
					<CardContent className="pt-6">
						<div className="flex gap-4 items-center">
							<Skeleton className="rounded-full h-16 w-16" />
							<div className="w-full space-y-2">
								<Skeleton className="h-6 w-40" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Tabs skeleton */}
				<div className="gap-2 grid grid-cols-5">
					{TAB_SKELETON_KEYS.map(key => (
						<Skeleton key={key} className="h-9" />
					))}
				</div>

				{/* Cards grid skeleton */}
				<div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
					{CARD_SKELETON_KEYS.map(key => (
						<Card key={key} className="bg-white/70 overflow-hidden backdrop-blur-md dark:bg-gray-800/70">
							<Skeleton className="h-40 w-full" />
							<CardContent className="p-4 space-y-2">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-2 w-full" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
