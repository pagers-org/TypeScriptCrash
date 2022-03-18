const USER_TOKEN = 'USER_TOKEN';

export const setUserToken = token => {
  try {
    if (!token) throw new Error('유효하지 않은 토큰입니다.');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }

  localStorage.setItem(USER_TOKEN, token);
};

export const getUserToken = () => {
  try {
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) throw new Error('로그인 후 이용해주세요!');
    return token;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
