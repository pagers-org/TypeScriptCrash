import { signup } from 'api';
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';
import { SignupRequest } from 'types/api';

const useSignup = (
	options?: UseMutationOptions<void, never, SignupRequest, unknown>,
): UseMutationResult<void, never, SignupRequest, unknown> => {
	return useMutation(signup, options);
};

export default useSignup;
