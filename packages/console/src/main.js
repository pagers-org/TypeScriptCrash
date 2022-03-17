import '../assets/index.css';
import { fetchData } from './api';
import { $, toggleLoading, debounce } from './helper/index.js';
import StorageManager from './utils/storageClass';
import { STORAGE_KEY_NAMES } from './utils/constants';
const storageManager = new StorageManager(STORAGE_KEY_NAMES.USER_TOKEN);

(() => {
  const isLogin = storageManager.getItemProps();
  if (isLogin !== null) return;

  location.replace('./login.html');
})();

let globalIndex = 0;
const _id = storageManager.getItemProps();
const $main = $('main');
const $nav = $('nav');

const createPin = () => {
  toggleLoading();
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const image = document.createElement('img');
  const random = Math.floor(Math.random() * 123) + 1;
  image.src = `https://randomfox.ca/images/${random}.jpg`;
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = createHeartElem(globalIndex, random, false);

  pin.classList.add('pin');
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  toggleLoading();
  return pin;
};

const createHeartElem = (index, key, isChecked = false) => {
  return `
  <div class="anim-icon anim-icon-md heart">
  <input type="checkbox" id="heart${index}" key=${key} ${
    isChecked && 'checked'
  }/>
  <label for="heart${index}" key=${key}></label>
</div>`;
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

$nav.addEventListener('click', async event => {
  event.stopPropagation();
  if (!event.target.matches('input')) return;

  $main.innerHTML = '';

  if (event.target.matches('#explore')) {
    renderExplorePage();
  }
  if (event.target.matches('#saved')) {
    renderSavePage();
  }
});

const renderExplorePage = async () => {
  $main.classList.remove('saved');
  $main.innerHTML = `
      <div class="container"></div>
      <div class="loader"></div>
    `;

  globalIndex = 0;
  loadMore();
};

const renderSavePage = async () => {
  $main.classList.add('saved');
  const result = await fetchData('getBookmarkList', '/user/bookmark', { _id });
  const $content = `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => `
      <div class="pin">
        <div class="button-wrapper">
        ${createHeartElem(index, _id, true)}
        </div><img src="https://randomfox.ca/images/${url}.jpg">
      </div>`,
      )
      .join('')}
    </div>
    `;

  $main.innerHTML = $content;
};

$main.addEventListener('click', async event => {
  const targetAttrKey = event.target.getAttribute('key');
  const requestUrl = `/user/bookmark/${targetAttrKey}`;
  if (targetAttrKey?.length > 3) {
    await fetchData('removeBookmark', requestUrl, { _id }, 'DELETE');
    renderSavePage();
  }

  if (event.target.matches('input[id^="heart"]')) {
    if (event.target.checked) {
      await fetchData('addBookmark', requestUrl, { _id });
      return;
    }

    const result = await fetchData('getBookmarkList', '/user/bookmark', {
      _id,
    });
    const selectedImage = result.filter(item => {
      return item.url === targetAttrKey;
    });
    await fetchData(
      'removeBookmark',
      `/user/bookmark/${selectedImage[0]?._id}`,
      { _id },
      'DELETE',
    );
    return;
  }

  if (!event.target.matches('label[for^="heart"]')) return;
});
