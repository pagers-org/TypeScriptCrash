import axios from 'axios';
import {
	BASE_URL,
	FOX_PICTURE_MAX_NUMBER,
	PAGE_SIZE,
	RANDOM_FOX_URL,
} from 'constants/index';
import { Feeds } from 'types';
import type {
	AddBookmarkRequest,
	GetBookmarksRequest,
	GetBookmarksResponse,
	GetFoxPicturesRequese,
	GetFoxPicutreResponse,
	LoginRequest,
	LoginResponse,
	SignupRequest,
} from 'types/api';

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

export const login = async ({ email, password }: LoginRequest) => {
	const response = await api.post<LoginResponse[]>('/user/login', {
		email,
		password,
	});

	return response;
};

export const signup = async ({ email, password }: SignupRequest) => {
	await api.post<never>('/user', {
		email,
		password,
	});
};

export const addBookmark = async ({ _id, filename }: AddBookmarkRequest) => {
	await api.post<never>(`/user/bookmark/${filename}`, {
		_id,
	});
};

export const getBookmarks = async ({ _id }: GetBookmarksRequest) => {
	const response = api.post<GetBookmarksResponse[]>('/user/bookmark', {
		_id,
	});

	return response;
};

export const getFoxPictures = ({
	page,
	size = PAGE_SIZE,
}: GetFoxPicturesRequese) => {
	return new Promise<GetFoxPicutreResponse>((resolve) => {
		const result: Feeds[] = [];

		for (let i = 1; i <= size; i += 1) {
			const index = (page - 1) * size + i;

			if (index > FOX_PICTURE_MAX_NUMBER) break;
			result.push({
				id: index,
				imageUrl: `${RANDOM_FOX_URL}/${index}.jpg`,
			});
		}

		setTimeout(() => {
			resolve({
				feeds: result,
				isLast: result.length < size,
				nextPage: page + 1,
			});
		}, 500);
	});
};
