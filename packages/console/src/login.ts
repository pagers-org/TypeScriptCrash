import '../assets/page/login.css';
import { fetchData } from './api/index';
import { $, $all } from './helper';
import { REGEX_EMAIL, STORAGE_KEY_NAMES, HOST_URL } from './utils/constants';
import StorageMap from './utils/storageMap';

const storageMap = new StorageMap(STORAGE_KEY_NAMES.USER_TOKEN);

$all('.message a').forEach((tag: Element) => {
  tag.addEventListener('click', () => {
    $all('.forms').forEach((form: Element) => {
      form.classList.toggle('hidden');
    });
  });
});

$('button[data-submit="signup"]').addEventListener(
  'click',
  async (event: Event) => {
    event.preventDefault();

    const email = $<HTMLInputElement>('#signup-email').value;
    const password = $<HTMLInputElement>('#signup-password').value;
    const passwordConfirm = $<HTMLInputElement>(
      '#signup-password-confirm',
    ).value;

    if (password !== passwordConfirm) return alert('패스워드를 확인해주세요.');
    if (!REGEX_EMAIL.test(email)) return alert('옳지 않은 이메일 형식입니다.');

    await fetchData('sign up', '/user', {
      email,
      password,
      status: 0,
    });

    alert('회원가입이 완료되었습니다.\n로그인해주세요.');
  },
);

$('button[data-submit="login"]').addEventListener(
  'click',
  async (event: Event) => {
    event.preventDefault();

    const email = $<HTMLInputElement>('#login-email').value;
    const password = $<HTMLInputElement>('#login-password').value;
    const data = await fetchData('login', '/user/login', {
      email,
      password,
    });
    const { _id, email: userEmail } = data[0];
    alert(`환영합니다, ${userEmail}님!`);
    storageMap.setValue(_id);
    location.replace(HOST_URL);
  },
);
