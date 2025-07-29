declare global {
	export interface Friend {
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

	export interface MediaInfoResponse {
		name: string;
		artist: string;
		album: string | null;
		image: string | null;
		tns: string | null;
	}

	export interface BlinkoNote {
		id: number;
		type: number;
		content: string;
		isArchived: boolean;
		isRecycle: boolean;
		isShare: boolean;
		isTop: boolean;
		isReviewed: boolean;
		sharePassword: string;
		shareEncryptedUrl: string | null;
		shareExpiryDate: string | null;
		shareMaxView: number;
		shareViewCount: number;
		metadata: BlinkoMetadata;
		accountId: number;
		createdAt: string;
		updatedAt: string;
		attachments: any[];
		tags: BlinkoTag[];
		references: any[];
		referencedBy: any[];
		_count: BlinkoCount;
		isInternalShared: boolean;
	}

	export interface BlinkoMetadata {
		isIndexed: boolean;
	}

	export interface BlinkoTag {
		BlinkoId: number;
		BlinkoNoteId: number;
		BlinkoTagId: number;
		BlinkoTag: BlinkoTagDetails;
	}

	export interface BlinkoTagDetails {
		BlinkoId: number;
		BlinkoName: string;
		BlinkoIcon: string;
		BlinkoParent: number;
		BlinkoSortOrder: number;
		BlinkoCreatedAt: string;
		BlinkoUpdatedAt: string;
	}

	export interface BlinkoCount {
		BlinkoComments: number;
		BlinkoHistories: number;
	}

}

export { };
