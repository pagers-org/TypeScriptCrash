import '../assets/index.css';
import { addBookmark, getBookmarkList } from './api/index';
import { $, toggleLoading, debounce } from './helper/index.js';
import { getUserInfo } from './storage';

const userId = getUserInfo();

(() => {
  if (userId !== null) return;
  location.replace('./login.html');
})();

let globalIndex = 0;

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
    <input type="checkbox" id="heart${globalIndex}" />
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
    $main.classList.remove('saved');
    $main.innerHTML = `
      <div class="container"></div>
      <div class="loader"></div>
    `;

    globalIndex = 0;
    loadMore();
  }

  if (event.target.matches('#saved')) {
    $main.classList.add('saved');
    const result = await getBookmarkList('/user/bookmark', { _id: userId });
    const $content = `
    <div class="container">
    ${result
        .map(
          ({ _id, url }, index) =>
            `
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

$('main').addEventListener('click', async event => {
  if (!event.target.matches('label[for^="heart"]')) return;
  await addBookmark(`/user/bookmark/${event.target.getAttribute('key')}`, {
    _id: userId,
  });
  console.log('북마크에 저장되었습니다.');
});
