import { Component } from '../core/Component';
import { Validator } from '../core/Validator';
import { AuthUtils } from '../utils/AuthUtils';
import { login, signup } from '../../api';

const template = `
 <div class="login-wrapper">
        <div class="login-page">
            <div class="container">

                <form class="forms hidden">
                    <input type="text" id="signup-email" placeholder="이메일" m-input-data="signEmail" />
                    <input type="password" id="signup-password" placeholder="비밀번호" m-input-data="signPassword" />
                    <input type="password" id="signup-password-confirm" placeholder="비밀번호 확인" m-input-data="signPasswordConfirm" />
                    
                    <button @click="joinButtonClicked">회원가입</button>
                    <p class="message" @click="toggleForm">계정이 있으신가요? <a href="#">로그인하기</a></p>
                </form>

                <form class="forms">
                    <input type="text" id="login-email" placeholder="이메일" m-input-data="email" />
                    <input type="password" id="login-password" placeholder="비밀번호" m-input-data="password" />
                    
                    <button @click="loginButtonClicked">로그인</button>
                    <p class="message" @click="toggleForm">계정이 없으신가요? <a href="#">회원가입하기</a></p>
                </form>
            </div>
        </div>
    </div>
`;

export class LoginForm extends Component {
  setUp() {
    this.initialize({
      template,
      data: {
        email: String,
        password: String,
        signEmail: String,
        signPassword: String,
        signPasswordConfirm: String,
      },
      method: {
        toggleForm(e) {
          e.preventDefault();

          document
            .querySelectorAll('.forms')
            .forEach(form => form.classList.toggle('hidden'));
        },
        async loginButtonClicked(e) {
          e.preventDefault();

          const { email, password } = this.$data;

          if (!Validator.isValidEmail(email)) {
            return alert('옳지 않은 이메일 형식입니다.');
          }

          const data = await login({ email, password });

          if (!data.length) {
            alert('이메일 또는 비밀번호를 확인하세요');
            return;
          }

          const { _id, email: userEmail } = data[0];

          alert(`환영합니다, ${userEmail}님!`);

          AuthUtils.setToken(_id);

          location.replace('/');
        },
        async joinButtonClicked(e) {
          e.preventDefault();

          const { signEmail, signPassword, signPasswordConfirm } = this.$data;

          if (!Validator.isValidPassword(signPassword, signPasswordConfirm)) {
            return alert('패스워드를 확인해주세요.');
          }

          if (!Validator.isValidEmail(signEmail)) {
            return alert('옳지 않은 이메일 형식입니다.');
          }

          await signup({
            email: signEmail,
            password: signPassword,
            status: 0,
          });

          alert('회원가입이 완료되었습니다.\n 로그인해주세요.');

          this.$method.toggleForm(e);
        },
      },
    });
  }
}

window.customElements.define('login-form', LoginForm);
