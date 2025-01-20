declare global {
	interface Friend {
		id: string;
		name: string;
		url: string;
		avatar: string;
		description: string;
		state: number;
		techstack: string[];
		email?: string;
		created: string;
		rssurl: string | null;
	}

	interface MediaInfoResponse {
		name: string;
		artist: string;
		album: string | null;
		image: string | null;
		tns: string | null;
	}

}

export { };
