import View from './View.js';
import { $ } from '../helper/dom.js';
import { login } from '../api/index.js';

export default class LoginView extends View {
  constructor(element = $('.app'), template = new Template()) {
    super(element);

    this.template = template;
    this.element.innerHTML = this.template.initialize();
    this.baz();
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
            <form class="forms">
              <!-- <label>이메일</label> -->
              <input type="text" id="login-email" placeholder="이메일" />
              <!-- <label>비밀번호</label> -->
              <input type="password" id="login-password" placeholder="비밀번호" />
              <button data-submit="login">로그인</button>
              <p class="message">계정이 없으신가요? <a href="/signup.html">회원가입하기</a></p>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
