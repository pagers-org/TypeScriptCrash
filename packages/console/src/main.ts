import '../assets/index.css';
import { fetchData } from './api/index';
import { $, toggleLoading, debounce } from './helper';
import StorageManager from './utils/storageMap';
import { STORAGE_KEY_NAMES, FOX_IMAGES_URL } from './utils/constants';
import { ElementInterface, IdInterface } from 'Global';
import { getRandom } from './helper/randomId';

const storageMap = new StorageManager(STORAGE_KEY_NAMES.USER_TOKEN);

(() => {
  const isLogin = storageMap.getValue();
  if (isLogin !== null) return;

  location.replace('./login.html');
})();

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
  const random = getRandom();
  const pin = `
  <div class="pin">
    <div class="button-wrapper">
      ${createHeartElem(globalIndex, random, false)}
    </div>
    <img src="${FOX_IMAGES_URL}${random}.jpg" />
  </div>`;
  toggleLoading();
  return pin;
};

const createHeartElem = (
  index: number,
  key: string | number,
  isChecked = false,
) => {
  return `
<div class="anim-icon anim-icon-md heart">
  <input type="checkbox" id="heart${index}" key=${key} 
  ${isChecked && 'checked'}/>
  <label for="heart${index}" key=${key}></label>
</div>`;
};

let globalIndex = 0;
const loadMore = debounce(() => {
  const container = $('.container');
  const pinList = [];
  for (let i = 10; i > 0; i--) {
    ++globalIndex;
    pinList.push(createPin());
  }

  container.insertAdjacentHTML('afterbegin', pinList.join(''));
}, 500);
loadMore();
window.addEventListener('scroll', () => {
  const loader = $('.loader');
  if (loader === null) return;
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

const setMainInnerHtml = (contents: string) => {
  $main.innerHTML = contents;
};

const mainAddOrRemoveClass = (isAdd: boolean, className: string) => {
  const method = isAdd ? 'add' : 'remove';
  $main.classList[method](className);
};

const render = (event: Event, page: string) => {
  if ((<HTMLElement>event.target).matches(page)) {
    switch (page) {
      case '#explore':
        return renderExplorePage();
      case '#saved':
        return renderSavePage();
      case '#profile':
        return renderProfilePage();
    }
  }
};

const renderProfilePage = () => {
  mainAddOrRemoveClass(false, 'saved');
  setMainInnerHtml(`<h1>profile</h1>`);
};

const renderExplorePage = () => {
  mainAddOrRemoveClass(false, 'saved');
  setMainInnerHtml(`
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
        ({ _id, url }: ElementInterface, index: number) => `
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

$main.addEventListener('click', async (event: MouseEvent) => {
  const target = event.target as HTMLInputElement;
  const targetAttrKey = target.getAttribute('key') as string;
  const requestUrl = `/user/bookmark/${targetAttrKey}`;

  if (targetAttrKey?.length > 3) {
    await fetchData<IdInterface>(
      'removeBookmark',
      requestUrl,
      { _id },
      'DELETE',
    );
    renderSavePage();
  }

  if (target.matches('input[id^="heart"]')) {
    if (target.checked) {
      await fetchData('addBookmark', requestUrl, { _id });
      return;
    }

    const result: ElementInterface[] = await fetchData<IdInterface>(
      'getBookmarkList',
      '/user/bookmark',
      {
        _id,
      },
    );

    const selectedImage = result.filter(item => item.url === targetAttrKey);
    await fetchData<IdInterface>(
      'removeBookmark',
      `/user/bookmark/${selectedImage[0]?._id}`,
      { _id },
      'DELETE',
    );
    return;
  }
});
