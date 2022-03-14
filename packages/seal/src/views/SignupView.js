import View from './View.js';
import { $ } from '../helper/dom.js';
import { signup } from '../api/index.js';
import { BASE_URL, ERROR_MESSAGE, INDEX_PAGE, SUCCESS_MESSAGE } from '../constant/index.js';

export default class SignupView extends View {
  constructor(element = $('.signup'), template = new Template()) {
    super(element);

    this.template = template;
    this.element.innerHTML = this.template.initialize();
    this.handleSignupButton();
  }

  handleSignupButton() {
    $('button[data-submit="signup"]').addEventListener('click', async event => {
      event.preventDefault();

      const email = $('#signup-email').value;
      const password = $('#signup-password').value;
      const passwordConfirm = $('#signup-password-confirm').value;

      if (password !== passwordConfirm)
        return alert(ERROR_MESSAGE.WRONG_PASSWORD);

      if (this.checkEmailFormat(email))
        return alert(ERROR_MESSAGE.INVALID_EMAIL_FORMAT);

      await signup(`${BASE_URL}/api/user`, {
        email,
        password,
        status: 0, // TODO: status 상수화
      });

      alert(SUCCESS_MESSAGE.SIGNUP);
      location.replace(`${INDEX_PAGE}/login.html`);
    });
  }

  checkEmailFormat(email) {
    const regEmail =
      /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return !regEmail.test(email);
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
