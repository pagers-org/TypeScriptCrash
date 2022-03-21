import { USER_TOKEN } from '../constatnt';

export const setUserInfo = id => {
  try {
    if (!id) return null;
    localStorage.setItem(USER_TOKEN, id);
  } catch (e) {
    // denied or full
  }
};
export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem(USER_TOKEN);
    if (!userInfo) return null;
    return userInfo;
  } catch (e) {
    //denied or full
  }
};
