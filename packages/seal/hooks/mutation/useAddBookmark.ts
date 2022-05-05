import { addBookmark } from 'api';
import { useMutation, UseMutationResult } from 'react-query';
import { AddBookmarkRequest } from 'types/api';

const useAddBookmark = (): UseMutationResult<
	void,
	never,
	AddBookmarkRequest,
	unknown
> => {
	return useMutation(addBookmark);
};

export default useAddBookmark;
