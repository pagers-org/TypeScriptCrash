import { login } from 'api';
import type { AxiosResponse } from 'axios';
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';
import type { LoginRequest, LoginResponse } from 'types/api';

const useLogin = (
	options?: UseMutationOptions<
		AxiosResponse<LoginResponse[]>,
		never,
		LoginRequest,
		unknown
	>,
): UseMutationResult<
	AxiosResponse<LoginResponse[]>,
	never,
	LoginRequest,
	unknown
> => {
	return useMutation(login, options);
};

export default useLogin;
