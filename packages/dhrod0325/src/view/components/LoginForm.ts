import { Component } from '@/core';
import { KEY, storage, userApi } from '@/view';
import { LoginParam } from '@/view/api/UserApi';

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
    this.setContainer(template);
    this.setData({
      email: String,
      password: String,
      signEmail: String,
      signPassword: String,
      signPasswordConfirm: String,
    });
    this.setMethod(this);
  }

  toggleForm(e: Event | null) {
    if (e) e.preventDefault();

    this.$container
      .querySelectorAll('.forms')
      .forEach(form => form.classList.toggle('hidden'));
  }

  async loginButtonClicked(e: Event) {
    e.preventDefault();

    const { result, message, data } = await userApi.login(
      this.$data as LoginParam,
    );

    if (!result) {
      return alert(message);
    }

    this.successLogin(data._id, data.email);
  }

  async joinButtonClicked(e: Event) {
    e.preventDefault();

    const { signEmail, signPassword, signPasswordConfirm } = this.$data;

    const { result, message } = await userApi.signup({
      signEmail,
      signPassword,
      signPasswordConfirm,
    });

    if (!result) {
      return alert(message);
    }

    this.successJoin();
  }

  successJoin(): void {
    alert('회원가입이 완료되었습니다.\n 로그인해주세요.');
    this.toggleForm(null);
  }

  successLogin(_id: string, email: string) {
    alert(`환영합니다, ${email}님!`);
    storage.setItem(KEY.USER_TOKEN, _id);
    location.replace('/');
  }
}

window.customElements.define('login-form', LoginForm);
