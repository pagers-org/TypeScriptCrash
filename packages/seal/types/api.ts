export interface GetFoxPicturesRequese {
	page: number;
	size?: number;
}

export type Feeds = {
	id: number;
	imageUrl: string;
};

export interface GetFoxPicutreResponse {
	feeds: Feeds[];
	isLast: boolean;
	nextPage: number;
}
