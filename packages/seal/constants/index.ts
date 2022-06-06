export const BASE_URL = 'http://localhost:3000/api';
export const RANDOM_FOX_URL = 'https://randomfox.ca/images';

export const FOX_PICTURE_MAX_NUMBER = 123;

export const PAGE_SIZE = 10;

export const EMAIL_REGEX =
	/^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const ERROR_MESSAGE = {
	INVALID_EMAIL: '옳지 않은 이메일 형식입니다.',
	REQUIRED: '필수 입력입니다.',
	NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
};

export const SUCCESS_MESSAGE = {
	SIGNUP: '회원가입이 완료되었습니다.\n로그인해주세요.',
	LOGIN: (email: string) => `환영합니다, ${email}님!`,
};
