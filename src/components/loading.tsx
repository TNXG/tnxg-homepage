"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export function LoadingSpinner({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col items-center justify-center gap-2", className)}>
			<Icon icon="mingcute:loading-line" className="text-primary size-6 animate-spin" />
			<p className="text-sm text-muted-foreground">别着急，坐和放宽</p>
		</div>
	);
}

export default LoadingSpinner;
