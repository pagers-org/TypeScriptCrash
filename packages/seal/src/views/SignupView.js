import View from './View.js';
import { $ } from '../helper/dom.js';
import { signup } from '../api/index.js';

export default class SignupView extends View {
  constructor(element = $('.signup'), template = new Template()) {
    super(element);

    this.template = template;
    this.element.innerHTML = this.template.initialize();
    this.bar();
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
}

class Template {
  initialize() {
    return `
      <div class="login-wrapper">
        <div class="login-page">
          <div class="container">
            <form class="forms">
              <!-- <label>이메일</label> -->
              <input type="text" id="signup-email" placeholder="이메일" />
              <!-- <label>비밀번호</label> -->
              <input type="password" id="signup-password" placeholder="비밀번호" />
              <!-- <label>비밀번호 확인</label> -->
              <input type="password" id="signup-password-confirm" placeholder="비밀번호 확인" />
              <button data-submit="signup">회원가입</button>
              <p class="message">계정이 있으신가요? <a href="/login.html">로그인하기</a></p>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
