import '../assets/page/login.css';
import { fetchData } from './api/index.js';
import { $, $all } from './helper/index.js';
import { REGEX_EMAIL, STORAGE_KEY_NAMES } from './utils/constants';
import { storageManager } from './utils/storageManager';

$all('.message a').forEach(tag => {
  tag.addEventListener('click', () => {
    $all('.forms').forEach(form => {
      form.classList.toggle('hidden');
    });
  });
});

$('button[data-submit="signup"]').addEventListener('click', async event => {
  event.preventDefault();

  const email = $('#signup-email').value;
  const password = $('#signup-password').value;
  const passwordConfirm = $('#signup-password-confirm').value;

  if (password !== passwordConfirm) return alert('패스워드를 확인해주세요.');
  if (!REGEX_EMAIL.test(email)) return alert('옳지 않은 이메일 형식입니다.');

  await fetchData('sign up', '/user', {
    email,
    password,
    status: 0,
  });

  alert('회원가입이 완료되었습니다.\n로그인해주세요.');
});

$('button[data-submit="login"]').addEventListener('click', async event => {
  event.preventDefault();

  const email = $('#login-email').value;
  const password = $('#login-password').value;

  const data = await fetchData('login', '/user/login', {
    email,
    password,
  });
  const { _id, email: userEmail } = data[0];
  alert(`환영합니다, ${userEmail}님!`);
  storageManager.setItemProps(STORAGE_KEY_NAMES.USER_TOKEN, _id);
  location.replace('http://localhost:5510/');
});
