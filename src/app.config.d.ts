import type { RecentlyModel } from "@mx-space/api-client";

declare global {
	interface Friend {
		id: string;
		name: string;
		url: string;
		avatar: string;
		description: string;
		hide: boolean;
		state: number;
	}
}

export { };
