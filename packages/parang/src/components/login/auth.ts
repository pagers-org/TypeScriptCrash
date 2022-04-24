import { login, signup } from '../../api';
import { FOX_EXPLORE_MAIN } from '../../constants';
import {
  $all,
  $resetInputValue,
  $value,
  isValidEmail,
  setUserToken,
} from '../../helper';
import AbstractComponent from '../abstract';

export default class Auth extends AbstractComponent {
  $element: HTMLElement;
  inputSelectors: string[];

  bindMembers() {
    this.inputSelectors = [
      '#signup-email',
      '#signup-password',
      '#signup-password-confirm',
      '#login-email',
      '#login-password',
    ];
  }

  template() {
    return /*html*/ `
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
    this.$element = document.body.firstElementChild as HTMLElement;
  }

  eventGroup() {
    return [
      { type: 'click' as keyof HTMLElementEventMap, callback: this.toggleForm },
      { type: 'click' as keyof HTMLElementEventMap, callback: this.signup },
      { type: 'click' as keyof HTMLElementEventMap, callback: this.login },
    ];
  }

  toggleForm = (event: Event) => {
    const $target = event.target as HTMLAnchorElement;
    if (!$target.matches('a')) return;

    $all('.forms').forEach(({ classList }) => {
      $resetInputValue(this.inputSelectors);
      classList.toggle('hidden');
    });
  };

  signup = async (event: Event) => {
    event.preventDefault();
    const $target = event.target as HTMLButtonElement;
    if (!$target.matches('button[data-submit="signup"]')) return;

    const [{ value: email }, { value: password }, { value: passwordConfirm }] =
      $value(this.inputSelectors);

    if (password !== passwordConfirm) return alert('패스워드를 확인해주세요.');
    if (!isValidEmail(email)) return alert('옳지 않은 이메일 형식입니다.');

    try {
      await signup({ email, password });
      alert('회원가입이 완료되었습니다.\n로그인해주세요.');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      $resetInputValue(this.inputSelectors);
    }
  };

  login = async (event: Event) => {
    event.preventDefault();
    const $target = event.target as HTMLButtonElement;
    if (!$target.matches('button[data-submit="login"]')) return;

    const [_1, _2, _3, { value: email }, { value: password }] = $value(
      this.inputSelectors,
    );

    if (!isValidEmail(email)) return alert('옳지 않은 이메일 형식입니다.');

    try {
      const userData = await login<{ _id: string; email: string }[]>({
        email,
        password,
      });
      if (userData === undefined)
        return alert('해당 계정은 올바르지 않습니다.');
      this.successLogin(userData[0]);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  successLogin({ _id, email }: { _id: string; email: string }) {
    alert(`환영합니다, ${email}님!`);
    setUserToken(_id);
    location.replace(FOX_EXPLORE_MAIN);
  }
}
