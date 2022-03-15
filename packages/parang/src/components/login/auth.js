import Client from '../../api';
import { REGEXP_EMAIL } from '../../constants';
import { $, $all } from '../../helper';

export class Auth {
  constructor() {
    this.client = new Client({
      headers: new Headers({ 'content-type': 'application/json' }),
    });

    $('.login-page').addEventListener('click', event => {
      if (!event.target.matches('a')) return;
      $all('.forms').forEach(({ classList }) => classList.toggle('hidden'));
    });

    $('button[data-submit="signup"]').addEventListener('click', async event => {
      event.preventDefault();

      const email = $('#signup-email').value;
      const password = $('#signup-password').value;
      const passwordConfirm = $('#signup-password-confirm').value;

      if (password !== passwordConfirm)
        return alert('패스워드를 확인해주세요.');
      if (!REGEXP_EMAIL.test(email))
        return alert('옳지 않은 이메일 형식입니다.');

      await this.client.request('/api/user', {
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

      const data = await this.client.request('/api/user/login', {
        email,
        password,
      });
      const { _id, email: userEmail } = data[0];
      alert(`환영합니다, ${userEmail}님!`);
      localStorage.setItem('user_token', _id);
      location.replace('http://localhost:5510/');
    });
  }
}
