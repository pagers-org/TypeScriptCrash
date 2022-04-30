import { getFoxPictures } from 'api';
import { useInfiniteQuery } from 'react-query';

const useFoxPictures = () => {
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
