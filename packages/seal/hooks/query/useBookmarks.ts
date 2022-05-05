import { getBookmarks } from 'api';
import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import type { GetBookmarksRequest, GetBookmarksResponse } from 'types/api';

const useBookmarks = (
	request: GetBookmarksRequest,
): UseQueryResult<AxiosResponse<GetBookmarksResponse[]>, never> => {
	return useQuery(['getBookmarks', request], () => getBookmarks(request));
};

export default useBookmarks;
