import Client from '../api/index.js';
import { Profile, Explore, Bookmark } from '../components/index.js';
import { debounce } from '../helper/debounce.js';
import { $ } from '../helper/dom.js';
import { getUserToken } from '../helper/storage.js';
import { createUUID } from '../helper/utils.js';

export default class MainView {
  userToken;
  client;
  photoIndex;
  profile;
  expore;
  bookmark;

  constructor() {
    this.userToken = getUserToken();
    if (this.userToken === undefined) location.replace('./login.html');

    this.client = new Client({
      headers: new Headers({ 'content-type': 'application/json' }),
    });

    this.photoIndex = 0;

    this.profile = new Profile();
    this.explore = new Explore();
    this.bookmark = new Bookmark();

    this.$container = $('.container');

    this.loadMore();

    // onload 완료 후
    window.addEventListener('scroll', () => {
      const loader = $('.loader');
      if (loader === null) return;
      if (loader.getBoundingClientRect().top > window.innerHeight) return;
      this.loadMore();
    });

    $('nav').addEventListener('click', this.tabChange.bind(this));

    $('main').addEventListener('click', this.likeFox);
  }

  async tabChange(event) {
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
    }

    if (event.target.matches('#saved')) {
      $main.classList.add('saved');
      const result = await this.client.request('/api/user/bookmark', {
        _id: this.userToken,
      });
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
  }

  async likeFox(event) {
    if (!event.target.matches('label[for^="heart"]')) return;
    const _id = getUserToken();
    await this.client.request(
      `/api/user/bookmark/${event.target.getAttribute('key')}`,
      { _id },
    );
    alert('북마크에 저장되었습니다.');
  }

  createPin() {
    this.explore.getImageList().then(items => {
      this.$container.append(
        ...items.map(({ url: foxImageURL }) => {
          const pin = document.createElement('div');
          const buttonWrapper = document.createElement('div');
          const image = document.createElement('img');
          image.src = foxImageURL;
          buttonWrapper.setAttribute('class', 'button-wrapper');
          buttonWrapper.innerHTML = `
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${this.photoIndex}" />
            <label for="heart${this.photoIndex}" key=${createUUID()}></label>
          </div>
          `;
          pin.classList.add('pin');
          pin.appendChild(buttonWrapper);
          pin.appendChild(image);
          return pin;
        }),
      );
    });
  }

  loadMore = debounce(() => {
    this.createPin();
  }, 500);
}
