import axios from 'axios';
import {
	BASE_URL,
	FOX_PICTURE_MAX_NUMBER,
	PAGE_SIZE,
	RANDOM_FOX_URL,
} from 'constants/index';
import { Feeds, GetFoxPicturesRequese, GetFoxPicutreResponse } from 'types/api';

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

export const getFoxPictures = ({
	page,
	size = PAGE_SIZE,
}: GetFoxPicturesRequese): Promise<GetFoxPicutreResponse> => {
	return new Promise((resolve) => {
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
