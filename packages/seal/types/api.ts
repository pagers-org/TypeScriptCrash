/* eslint-disable @typescript-eslint/no-empty-interface */
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
