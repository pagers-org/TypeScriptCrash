import '../assets/index.css';
import { addBookmark, getBookmarkList, removeBookmark } from './api';
import { $, toggleLoading, debounce } from './helper/index.js';

(() => {
  const isLogin = localStorage.getItem('user_token');
  if (isLogin !== null) return;

  location.replace('./login.html');
})();

let globalIndex = 0;
const _id = localStorage.getItem('user_token');

const createPin = () => {
  toggleLoading();
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const image = document.createElement('img');
  const random = Math.floor(Math.random() * 123) + 1;
  image.src = `https://randomfox.ca/images/${random}.jpg`;
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = `
  <div class="anim-icon anim-icon-md heart">
    <input type="checkbox" id="heart${globalIndex}" key=${random} />
    <label for="heart${globalIndex}" key=${random}></label>
  </div>
  `;
  pin.classList.add('pin');
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  toggleLoading();
  return pin;
};

const loadMore = debounce(() => {
  const container = $('.container');
  const pinList = [];
  for (let i = 10; i > 0; i--) {
    pinList.push(createPin(++globalIndex));
  }
  container.append(...pinList);
}, 500);

loadMore();

window.addEventListener('scroll', () => {
  const loader = $('.loader');
  if (loader === null) return;
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

$('nav').addEventListener('click', async event => {
  event.stopPropagation();
  if (!event.target.matches('input')) return;

  const $main = $('main');
  $main.innerHTML = '';

  if (event.target.matches('#explore')) {
    renderExplorePage($main);
  }
  if (event.target.matches('#saved')) {
    renderSavePage($main);
  }
});

const renderExplorePage = async $main => {
  $main.classList.remove('saved');
  $main.innerHTML = `
      <div class="container"></div>
      <div class="loader"></div>
    `;

  globalIndex = 0;
  loadMore();
};

const renderSavePage = async $main => {
  $main.classList.add('saved');
  const result = await getBookmarkList('/user/bookmark', { _id });
  const $content = `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" key=${_id} checked>
            <label for="heart${index}" key=${_id}></label>
          </div>
        </div><img src="https://randomfox.ca/images/${url}.jpg">
      </div>`,
      )
      .join('')}
    </div>
    `;

  $main.innerHTML = $content;
};

$('main').addEventListener('click', async event => {
  event.stopPropagation();
  const $main = $('main');
  const requestUrl = `/user/bookmark/${event.target.getAttribute('key')}`;
  if (event.target.getAttribute('key')?.length > 3) {
    await removeBookmark(requestUrl, { _id });
    renderSavePage($main);
  }
  // 아래함수는 아직..작업중입니당
  if (event.target.matches('input[id^="heart"]')) {
    if (event.target.checked) {
      await addBookmark(requestUrl, { _id });
    }
  }

  if (!event.target.matches('label[for^="heart"]')) return;
  console.log('북마크에 저장되었습니다.');
});
