import '../assets/page/login.css';
import { login, signup } from './api/index.js';
import { $all } from './helper/index.js';
import { REG_EMAIL, LOGIN } from './constant';
import { setUserInfo } from './storage';

function toggleForm() {
  $all('.forms').forEach(form => {
    form.classList.toggle('hidden');
  });
}

$all('.message a').forEach(tag => {
  tag.addEventListener('click', toggleForm);
});

$all('button').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();

    const { parentElement, innerText: targetButton } = e.target;
    const email = parentElement.children[0].value;
    const password = parentElement.children[1].value;

    if (targetButton === LOGIN) {
      const data = await login('/user/login', {
        email,
        password,
      });

      if (!data[0]) alert('올바르지 않은 인증정보입니다. ');
      const { _id, email: userEmail } = data[0];
      alert(`환영합니다, ${userEmail}님!`);
      setUserInfo(_id);
      goMainPage();
      return;
    }

    const passwordConfirm = parentElement.children[2].value;
    if (password !== passwordConfirm) return alert('패스워드를 확인해주세요.');
    if (!REG_EMAIL.test(email)) return alert('옳지 않은 이메일 형식입니다.');

    await signup('/user', {
      email,
      password,
      status: 0,
    });

    alert('회원가입이 완료되었습니다.\n로그인해주세요.');
    goLoginPage();
  });
});

const goMainPage = () => {
  location.replace('http://localhost:5510/');
};
const goLoginPage = () => {
  toggleForm();
};
