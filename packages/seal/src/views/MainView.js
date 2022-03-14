import { addBookmark, getBookmarkList } from '../api';
import { debounce } from '../helper';
import { $, toggleLoading } from '../helper/dom';
import View from './View';

export default class MainView extends View {
  constructor(element = $('.app'), template = new Template()) {
    super(element);
    this.baz();
    this.loadMore();
    this.foo();

    this.template = template;
    this.element.innerHTML = this.template.initialize();

    this.globalIndex = 0;

    this.bar();
    this.hou();
  }

  baz() {
    const isLogin = localStorage.getItem('user_token');
    if (isLogin !== null) return;

    location.replace('./login.html');
  }

  createPin() {
    toggleLoading();
    const pin = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const image = document.createElement('img');
    const random = Math.floor(Math.random() * 123) + 1;
    image.src = `https://randomfox.ca/images/${random}.jpg`;
    buttonWrapper.setAttribute('class', 'button-wrapper');
    buttonWrapper.innerHTML = `
    <div class="anim-icon anim-icon-md heart">
      <input type="checkbox" id="heart${this.globalIndex}" />
      <label for="heart${this.globalIndex}" key=${random}></label>
    </div>
    `;
    pin.classList.add('pin');
    pin.appendChild(buttonWrapper);
    pin.appendChild(image);
    toggleLoading();
    return pin;
  }

  loadMore() {
    debounce(() => {
      const container = $('.container');
      const pinList = [];
      for (let i = 10; i > 0; i--) {
        pinList.push(this.createPin(++this.globalIndex));
      }
      container.append(...pinList);
    }, 500)();
  }

  foo() {
    window.addEventListener('scroll', () => {
      const loader = $('.loader');
      if (loader === null) return;
      if (loader.getBoundingClientRect().top > window.innerHeight) return;
      this.loadMore();
    });
  }

  bar() {
    $('nav').addEventListener('click', async event => {
      event.stopPropagation();
      if (!event.target.matches('input')) return;

      const $main = $('main');
      $main.innerHTML = '';

      if (event.target.matches('#explore')) {
        $main.classList.remove('saved');
        $main.innerHTML = `
        <div class="container"></div>
        <div class="loader"></div>
      `;

        this.globalIndex = 0;
        this.loadMore();
      }

      if (event.target.matches('#saved')) {
        $main.classList.add('saved');
        const _id = localStorage.getItem('user_token');
        const result = await getBookmarkList(
          'http://localhost:3000/api/user/bookmark',
          { _id },
        );
        const $content = `
      <div class="container">
      ${result
        .map(
          ({ _id, url }, index) => `
        <div class="pin">
          <div class="button-wrapper">
            <div class="anim-icon anim-icon-md heart">
              <input type="checkbox" id="heart${index}" checked>
              <label for="heart${index}" key=${_id}></label>
            </div>
          </div><img src="https://randomfox.ca/images/${url}.jpg">
        </div>`,
        )
        .join('')}
      </div>
      `;

        $main.innerHTML = $content;
      }
    });
  }

  hou() {
    $('main').addEventListener('click', async event => {
      if (!event.target.matches('label[for^="heart"]')) return;
      const _id = localStorage.getItem('user_token');
      await addBookmark(
        `http://localhost:3000/api/user/bookmark/${event.target.getAttribute(
          'key',
        )}`,
        { _id },
      );
      console.log('북마크에 저장되었습니다.');
    });
  }
}

class Template {
  initialize() {
    return `
      <header>
        <nav>
          <div class="item">
            <input type="radio" name="menubtn" id="explore" checked />
            <label for="explore" data-label="explore">
              <svg class="explore" width="50" height="50" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H8V8H4V4Z" fill="currentColor" />
                <path d="M4 10H8V14H4V10Z" fill="currentColor" />
                <path d="M8 16H4V20H8V16Z" fill="currentColor" />
                <path d="M10 4H14V8H10V4Z" fill="currentColor" />
                <path d="M14 10H10V14H14V10Z" fill="currentColor" />
                <path d="M10 16H14V20H10V16Z" fill="currentColor" />
                <path d="M20 4H16V8H20V4Z" fill="currentColor" />
                <path d="M16 10H20V14H16V10Z" fill="currentColor" />
                <path d="M20 16H16V20H20V16Z" fill="currentColor" />
              </svg>
            </label>
          </div>

          <div class="item">
            <input type="radio" name="menubtn" id="saved" />
            <label for="saved" data-label="saved">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19 20H17.1717L12.7072 15.5354C12.3166 15.1449 11.6835 15.1449 11.2929 15.5354L6.82843 20L5 20V7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34314 19 7V20ZM17 7C17 6.44772 16.5523 6 16 6H8C7.44772 6 7 6.44772 7 7V17L9.87873 14.1212C11.0503 12.9497 12.9498 12.9497 14.1214 14.1212L17 16.9999V7Z"
                  fill="currentColor" />
              </svg>
            </label>
          </div>
        </nav>
      </header>
      <main>
        <div class="container"></div>
        <div class="loader"></div>
      </main>
    `;
  }
}
