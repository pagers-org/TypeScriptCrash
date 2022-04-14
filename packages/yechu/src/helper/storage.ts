import { Auth } from '../constatnt';

export const setUserInfo = (id: string) => {
  try {
    if (!id) return null;
    localStorage.setItem(Auth.USER_TOKEN, id);
    return;
  } catch (e) {
    return alert(e);
  }
};
export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem(Auth.USER_TOKEN);
    if (!userInfo) return null;
    return userInfo;
  } catch (e) {
    return alert(e);
  }
};
