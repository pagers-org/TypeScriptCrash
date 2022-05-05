import { Feeds, UserBasicForm } from 'types';

export interface GetFoxPicturesRequese {
	page: number;
	size?: number;
}

export interface GetFoxPicutreResponse {
	feeds: Feeds[];
	isLast: boolean;
	nextPage: number;
}

export interface LoginRequest extends UserBasicForm {}

export interface SignupRequest extends UserBasicForm {}

export interface LoginResponse extends UserBasicForm {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface AddBookmarkRequest {
	_id: string;
	filename: string;
}

export interface GetBookmarksRequest {
	_id: string;
}

export interface GetBookmarksResponse {
	_id: string;
	url: string;
}
