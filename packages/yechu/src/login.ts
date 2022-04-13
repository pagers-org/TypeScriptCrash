import '../assets/page/login.css';
import { login, signup } from './api/index';
import { $all, $ } from './helper/index';
import { REG_EMAIL, Auth, MESSAGE } from './constatnt';
import { setUserInfo } from './helper/storage';
import { toggleForm } from './helper/dom';

$<HTMLDivElement>('.container').addEventListener('click', e => {
  const elem = e.target as HTMLDivElement;
  const clickedElement = elem.tagName.toLowerCase();
  const messageLink = 'a';
  if (clickedElement !== messageLink) return;
  toggleForm();
});

$all<HTMLButtonElement>('button').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();

    const elem = e.target as HTMLButtonElement;
    if (!elem) throw new Error('button element is null');
    const { parentElement: signForm, innerText: targetButton } = elem;

    const email = signForm.children[0].value;
    const password = signForm.children[1].value;

    if (targetButton === Auth.LOGIN) {
      const data = await login('/user/login', {
        email,
        password,
      });

      if (!data[0]) return alert(MESSAGE.AUTH_ERROR);
      const { _id, email: userEmail } = data[0];
      alert(`환영합니다, ${userEmail}님!`);
      setUserInfo(_id);
      goMainPage();
      return;
    }
    const passwordConfirm = signForm.children[2].value;
    if (password !== passwordConfirm) return alert(MESSAGE.CHECK_PW);
    if (!REG_EMAIL.test(email)) return alert(MESSAGE.INVALID_EMAIL);

    await signup('/user', {
      email,
      password,
      status: 0,
    });

    alert(MESSAGE.JOIN_SUCESS);
    toggleForm();
  });
});

const goMainPage = () => {
  // location.replace('http://localhost:5510/');
};
