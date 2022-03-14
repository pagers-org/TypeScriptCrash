import View from './View.js';
import { $, $all } from '../helper/dom.js';
import { login, signup } from '../api/index.js';

export default class LoginView extends View {
  constructor(element = $('.app'), template = new Template()) {
    super(element);

    this.template = template;
    this.element.innerHTML = this.template.initialize();
    this.foo();
    this.bar();
    this.baz();
  }

  foo() {
    $all('.message a').forEach(tag => {
      tag.addEventListener('click', () => {
        $all('.forms').forEach(form => {
          form.classList.toggle('hidden');
        });
      });
    });
  }

  bar() {
    $('button[data-submit="signup"]').addEventListener('click', async event => {
      event.preventDefault();

      const email = $('#signup-email').value;
      const password = $('#signup-password').value;
      const passwordConfirm = $('#signup-password-confirm').value;

      if (password !== passwordConfirm)
        return alert('패스워드를 확인해주세요.');
      const regEmail =
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!regEmail.test(email)) return alert('옳지 않은 이메일 형식입니다.');

      await signup('http://localhost:3000/api/user', {
        email,
        password,
        status: 0,
      });

      alert('회원가입이 완료되었습니다.\n로그인해주세요.');
    });
  }

  baz() {
    $('button[data-submit="login"]').addEventListener('click', async event => {
      event.preventDefault();

      const email = $('#login-email').value;
      const password = $('#login-password').value;

      const data = await login('http://localhost:3000/api/user/login', {
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

class Template {
  initialize() {
    return `
      <div class="login-wrapper">
        <div class="login-page">
          <div class="container">
            <form class="forms hidden">
              <!-- <label>이메일</label> -->
              <input type="text" id="signup-email" placeholder="이메일" />
              <!-- <label>비밀번호</label> -->
              <input type="password" id="signup-password" placeholder="비밀번호" />
              <!-- <label>비밀번호 확인</label> -->
              <input type="password" id="signup-password-confirm" placeholder="비밀번호 확인" />
              <button data-submit="signup">회원가입</button>
              <p class="message">계정이 있으신가요? <a href="#">로그인하기</a></p>
            </form>
            <form class="forms">
              <!-- <label>이메일</label> -->
              <input type="text" id="login-email" placeholder="이메일" />
              <!-- <label>비밀번호</label> -->
              <input type="password" id="login-password" placeholder="비밀번호" />
              <button data-submit="login">로그인</button>
              <p class="message">계정이 없으신가요? <a href="#">회원가입하기</a></p>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
