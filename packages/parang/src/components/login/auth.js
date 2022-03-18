import Client from '../../api';
import { EVENT_TYPE, FOX_EXPLORE_MAIN, HTTP_METHODS } from '../../constants';
import {
  $all,
  $initValue,
  $value,
  isEmpty,
  isEquals,
  isValidEmail,
  setUserToken,
} from '../../helper';
import AbstractComponent from '../abstract';

export class Auth extends AbstractComponent {
  constructor() {
    super();
    this.client = Client;

    this.inputSelectors = [
      '#signup-email',
      '#signup-password',
      '#signup-password-confirm',
      '#login-email',
      '#login-password',
    ];
  }

  template() {
    return `
    <div class="app">
      <div class="login-wrapper">
        <div class="login-page">
          <div class="container">
            <form class="forms hidden">
              <input type="text" id="signup-email" placeholder="이메일" />
              <input type="password" id="signup-password" placeholder="비밀번호" />
              <input type="password" id="signup-password-confirm" placeholder="비밀번호 확인" />
              <button data-submit="signup">회원가입</button>
              <p class="message">계정이 있으신가요? <a href="#">로그인하기</a></p>
            </form>
            <form class="forms">
              <input type="text" id="login-email" placeholder="이메일" />
              <input type="password" id="login-password" placeholder="비밀번호" />
              <button data-submit="login">로그인</button>
              <p class="message">계정이 없으신가요? <a href="#">회원가입하기</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  render() {
    document.body.innerHTML = this.template();
    this.$element = document.body.firstElementChild;
  }

  eventGroup() {
    return [
      { type: EVENT_TYPE.CLICK, callback: this.toggleForm.bind(this) },
      { type: EVENT_TYPE.CLICK, callback: this.signup.bind(this) },
      { type: EVENT_TYPE.CLICK, callback: this.login.bind(this) },
    ];
  }

  toggleForm({ target }) {
    if (!target.matches('a')) return;

    $all('.forms').forEach(({ classList }) => {
      $initValue(this.inputSelectors);
      classList.toggle('hidden');
    });
  }

  async signup(event) {
    event.preventDefault();
    if (!event.target.matches('button[data-submit="signup"]')) return;

    const [{ value: email }, { value: password }, { value: passwordConfirm }] =
      $value(this.inputSelectors);

    if (isEquals(password, passwordConfirm))
      return alert('패스워드를 확인해주세요.');
    if (!isValidEmail(email)) return alert('옳지 않은 이메일 형식입니다.');

    const params = {
      method: HTTP_METHODS.POST,
      url: '/api/user',
      body: { email, password },
    };

    try {
      await this.client.request(params);
      alert('회원가입이 완료되었습니다.\n로그인해주세요.');
    } catch (error) {
      alert(error.message);
    } finally {
      $initValue(this.inputSelectors);
    }
  }

  async login(event) {
    event.preventDefault();
    if (!event.target.matches('button[data-submit="login"]')) return;

    const [{ value: email }, { value: password }] = $value(this.inputSelectors);

    if (!isValidEmail(email)) return alert('옳지 않은 이메일 형식입니다.');

    const params = {
      method: HTTP_METHODS.POST,
      url: '/api/user/login',
      body: { email, password },
    };

    try {
      const userData = await this.client.request(params);
      if (isEmpty(userData)) throw new Error('해당 계정은 올바르지 않습니다.');
      this.successLogin(userData[0]);
    } catch (error) {
      alert(error.message);
    }
  }

  successLogin({ _id, email }) {
    alert(`환영합니다, ${email}님!`);
    setUserToken(_id);
    location.replace(FOX_EXPLORE_MAIN);
  }
}
