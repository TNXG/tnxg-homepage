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

	interface MediaInfoResponse {
		name: string;
		artist: string;
		album: string | null;
		image: string | null;
		tns: string | null;
	}

}

export { };
