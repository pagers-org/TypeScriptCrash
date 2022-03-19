import '../assets/index.css';
import { fetchData } from './api';
import { $, toggleLoading, debounce } from './helper/index.js';
import StorageManager from './utils/StorageMap';
import { STORAGE_KEY_NAMES } from './utils/constants';

const storageMap = new StorageManager(STORAGE_KEY_NAMES.USER_TOKEN);

(() => {
  const isLogin = storageMap.getValue();
  if (isLogin !== null) return;

  location.replace('./login.html');
})();

let globalIndex = 0;
const _id = storageMap.getValue();

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

const setMainInnerHtml = contents => {
  const $main = $('main');
  $main.innerHTML = contents;
};

const mainAddRemoveClass = (isAdd, className) => {
  const $main = $('main');
  const method = isAdd ? 'add' : 'remove';
  $main.classList[method](className);
};

$('nav').addEventListener('click', async event => {
  event.stopPropagation();
  if (!event.target.matches('input')) return;

  setMainInnerHtml('');
  render(event, '#explore');
  render(event, '#saved');
});

const render = (event, page) => {
  if (event.target.matches(page)) {
    switch (page) {
      case '#explore':
        return renderExplorePage();
      case '#saved':
        return renderSavePage();
    }
  }
};

const renderExplorePage = async () => {
  mainAddRemoveClass(false, 'saved');
  setMainInnerHtml(`
      <div class="container"></div>
      <div class="loader"></div>
    `);
  globalIndex = 0;
  loadMore();
};

const renderSavePage = async () => {
  mainAddRemoveClass(true, 'saved');
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

  setMainInnerHtml($content);
};

$('main').addEventListener('click', async ({ target }) => {
  const targetAttrKey = target.getAttribute('key');
  const requestUrl = `/user/bookmark/${targetAttrKey}`;
  if (targetAttrKey?.length > 3) {
    await fetchData('removeBookmark', requestUrl, { _id }, 'DELETE');
    renderSavePage();
  }

  if (target.matches('input[id^="heart"]')) {
    if (target.checked) {
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

  if (!target.matches('label[for^="heart"]')) return;
});
