import { $ } from '../helper/dom.js';
import { login } from '../api/index.js';
import { BASE_URL, INDEX_PAGE, LOCAL_STORAGE_KEY } from '../constant/index.js';
import { setLocalStorage } from '../helper/localstorage.js';

export default class LoginView {
  constructor(template = new Template()) {
    this.element = $('.app');
    this.template = template;
    this.element.innerHTML = this.template.initialize();
    this.handleLoginButton();
  }

  handleLoginButton() {
    $('button[data-submit="login"]').addEventListener('click', async event => {
      event.preventDefault();

      const email = $('#login-email').value;
      const password = $('#login-password').value;

      const data = await login(`${BASE_URL}/user/login`, {
        email,
        password,
      });

      const { _id, email: userEmail } = data[0];

      alert(`환영합니다, ${userEmail}님!`);
      setLocalStorage(LOCAL_STORAGE_KEY.USER_TOKEN, _id);
      location.replace(`${INDEX_PAGE}/`);
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
