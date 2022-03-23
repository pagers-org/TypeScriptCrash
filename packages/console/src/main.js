import '../assets/index.css';
import { fetchData } from './api';
import { $, toggleLoading, debounce } from './helper/index.js';
import StorageManager from './utils/storageMap';
import { STORAGE_KEY_NAMES, FOX_IMAGES_URL } from './utils/constants';

const storageMap = new StorageManager(STORAGE_KEY_NAMES.USER_TOKEN);

(() => {
  const isLogin = storageMap.getValue();
  if (isLogin !== null) return;

  location.replace('./login.html');
})();
let globalIndex = 0;
const _id = storageMap.getValue();
const $main = $('main');

const NAV_MENU = ['saved', 'explore', 'profile'];

NAV_MENU.forEach(item =>
  $(`input[id^=${item}]`).addEventListener('click', event =>
    render(event, `#${item}`),
  ),
);

const createPin = () => {
  toggleLoading();
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const image = document.createElement('img');
  const random = Math.floor(Math.random() * 123) + 1;
  image.src = `${FOX_IMAGES_URL}${random}.jpg`;
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
  $main.innerHTML = contents;
};

const mainAddOrRemoveClass = (isAdd, className) => {
  const method = isAdd ? 'add' : 'remove';
  $main.classList[method](className);
};

<<<<<<< HEAD
  if (event.target.matches('#explore')) {
    new RenderPage('#explore').explore();
  }
  if (event.target.matches('#saved')) {
    new RenderPage('#saved').save();
=======
const render = (event, page) => {
  if (event.target.matches(page)) {
    switch (page) {
      case '#explore':
        return renderExplorePage();
      case '#saved':
        return renderSavePage();
      case '#profile':
        return renderProfilePage();
    }
>>>>>>> fc426c2d109dd576496940968553c2e4ef9df47b
  }
};

const renderProfilePage = () => {
  mainAddOrRemoveClass(false, 'saved');
  setMainInnerHtml(`<h1>profile</h1>`);
};

<<<<<<< HEAD
class RenderPage {
  constructor(mathchName) {
    this.mathchName = mathchName;
  }
}
let matchesThis = {
  explore() {
    return renderExplorePage();
  },
  save() {
    return renderSavePage();
  },
};
Object.assign(RenderPage.prototype, matchesThis);

const renderExplorePage = async () => {
  $main.classList.remove('saved');
  $main.innerHTML = `
=======
const renderExplorePage = () => {
  mainAddOrRemoveClass(false, 'saved');
  setMainInnerHtml(`
>>>>>>> fc426c2d109dd576496940968553c2e4ef9df47b
      <div class="container"></div>
      <div class="loader"></div>
    `);
  globalIndex = 0;
  loadMore();
};

const renderSavePage = async () => {
  mainAddOrRemoveClass(true, 'saved');
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

$main.addEventListener('click', async ({ target }) => {
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
    const selectedImage = result.filter(item => item.url === targetAttrKey);
    await fetchData(
      'removeBookmark',
      `/user/bookmark/${selectedImage[0]?._id}`,
      { _id },
      'DELETE',
    );
    return;
  }
});
