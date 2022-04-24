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
    if (e.target === null) throw new Error(' element is null');
    const target = e.target as HTMLButtonElement;
    const { parentElement: signForm, innerText: targetButton } = target;

    const email: string = signForm.children[0].value;
    const password: string = signForm.children[1].value;

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
  location.replace('http://localhost:5510/');
};
