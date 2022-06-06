import { getFoxPictures } from 'api';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { GetFoxPicutreResponse } from 'types/api';

const useFoxPictures = (): UseInfiniteQueryResult<
	GetFoxPicutreResponse,
	never
> => {
	return useInfiniteQuery(
		'getFoxPictures',
		({ pageParam = 1 }) => getFoxPictures({ page: pageParam }),
		{
			getNextPageParam: ({ isLast, nextPage }) =>
				isLast ? undefined : nextPage,
		},
	);
};

export default useFoxPictures;
