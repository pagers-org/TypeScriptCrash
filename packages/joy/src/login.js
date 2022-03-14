import '../assets/page/login.css';
import { login, signup } from './api/index.js';
import { $, $all } from './util/dom.js';

$all('.message a').forEach((tag) => {
  tag.addEventListener('click', () => {
    $all('.forms').forEach((form) => {
      form.classList.toggle('hidden');
    });
  });
});

$('button[data-submit="signup"]').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = $('#signup-email').value;
  const password = $('#signup-password').value;
  const passwordConfirm = $('#signup-password-confirm').value;

  if (password !== passwordConfirm) return alert('패스워드를 확인해주세요.');
  const regEmail =
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regEmail.test(email)) return alert('옳지 않은 이메일 형식입니다.');

  await signup({
    email,
    password,
    status: 0,
  });

  alert('회원가입이 완료되었습니다.\n로그인해주세요.');
});

$('button[data-submit="login"]').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = $('#login-email').value;
  const password = $('#login-password').value;

  const data = await login({
    email,
    password,
  });
  const { _id, email: userEmail } = data[0];
  alert(`환영합니다, ${userEmail}님!`);
  localStorage.setItem('user_token', _id);
  location.replace('http://localhost:5510/');
});
