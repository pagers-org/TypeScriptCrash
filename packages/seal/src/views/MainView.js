import { addBookmark, getBookmarkList } from '../api';
import {
  BASE_URL,
  LOCAL_STORAGE_KEY,
  MAX_IMAGE_NUMBER,
  RANDOM_IMAGE_URL,
} from '../constant';
import { debounce } from '../helper';
import { $, toggleLoading } from '../helper/dom';
import { getLocalStorage } from '../helper/localstorage';
import { getRandomNumber } from '../helper/random';

export default class MainView {
  constructor(template = new Template()) {
    this.element = $('.app');
    this.checkLogin();
    this.loadMore = this.loadMoreWithDebounce();
    this.template = template;
    this.initializeTemplate();

    this._id = getLocalStorage(LOCAL_STORAGE_KEY.USER_TOKEN);

    this.globalIndex = 0;

    this.bindEvents();
  }

  bindEvents() {
    $('main').addEventListener('click', this.handleClickBookmark.bind(this));
    window.addEventListener('scroll', this.handleWindowScroll.bind(this));
    $('nav').addEventListener('click', this.handleClickTab.bind(this));
  }

  initializeTemplate() {
    this.element.innerHTML = this.template.initialize();
    this.loadMore();
    $('.saved').style.display = 'none';
  }

  checkLogin() {
    if (this._id !== null) return;

    location.replace('./login.html');
  }

  createPin() {
    toggleLoading();

    const random = getRandomNumber(MAX_IMAGE_NUMBER);

    const pin = this.template.getPin(this.globalIndex, random);

    toggleLoading();

    return pin;
  }

  loadMoreWithDebounce() {
    return debounce(() => {
      const container = $('.container');
      const pinList = [];
      for (let i = 10; i > 0; i--) {
        pinList.push(this.createPin());
      }
      container.innerHTML += pinList.join('');
    }, 500);
  }

  async renderBookmark() {
    const saved = $('.saved');

    const result = await getBookmarkList(`${BASE_URL}/user/bookmark`, {
      _id: this._id,
    });
    const $content = this.template.getBookmarkTab(result);

    saved.innerHTML = $content;
  }

  async handleClickTab(event) {
    event.stopPropagation();
    const saved = $('.saved');
    const container = $('.container');
    if (!event.target.matches('input')) return;

    const tab = event.target.id;

    switch (tab) {
      case 'saved': {
        saved.style.display = 'block';
        container.style.display = 'none';

        this.renderBookmark();
        break;
      }
      case 'explore': {
        saved.style.display = 'none';
        container.style.display = 'block';

        this.globalIndex = 0;
        this.loadMore();
        break;
      }
    }
  }

  handleWindowScroll() {
    const loader = $('.loader');

    if (loader === null) return;

    const { y, height } = loader.getBoundingClientRect();

    if (-y < height * 0.8) return;

    this.loadMore();
  }

  async handleClickBookmark(event) {
    if (!event.target.matches('label[for^="heart"]')) return;
    await addBookmark(
      `${BASE_URL}/user/bookmark/${event.target.getAttribute('key')}`,
      { _id: this._id },
    );
    console.log('북마크에 저장되었습니다.');
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
        <div class="saved"></div>
        <div class="loader"></div>
      </main>
    `;
  }

  getPin(index, random) {
    const imageSrc = `${RANDOM_IMAGE_URL}/${random}.jpg`;

    return `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" />
            <label for="heart${index}" key=${random}></label>
          </div>
        </div>
        <img src="${imageSrc}" />
      </div>
    `;
  }

  getBookmarkTab(result) {
    return `
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
          </div><img src="${RANDOM_IMAGE_URL}/${url}.jpg">
        </div>`,
        )
        .join('')}
      </div>
    `;
  }
}
