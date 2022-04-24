export const Api = {
  BASE_URL: 'http://localhost:3000/api',
  FOX_IMG_URL: 'https://randomfox.ca/images',
} as const;

export const REG_EMAIL =
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const MAX_IMG_COUNT = 123;

export const Auth = {
  USER_TOKEN: 'user_token',
  LOGIN: '로그인',
  SIGN_UP: '회원가입',
} as const;

export const Tabs = {
  EXPLORE: 'explore',
  SAVED: 'saved',
} as const;

export const MESSAGE = {
  AUTH_ERROR: '올바르지 않은 인증정보입니다.',
  CHECK_PW: '패스워드를 확인해주세요.',
  INVALID_EMAIL: '옳지 않은 이메일 형식입니다.',
  WELCOME: (email: string) => {
    return `환영합니다, ${email}님!`;
  },
  JOIN_SUCESS: '회원가입이 완료되었습니다.\n로그인해주세요.',
} as const;
