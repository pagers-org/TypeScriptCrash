import '../assets/index.css';
import { BookmarkDataType } from 'Fox';
import { addBookmark, getBookmarkList, removeBookmark } from './api/index';
import { MAX_IMG_COUNT, FOX_IMG_URL, Tabs } from './constatnt';
import { $, toggleLoading, debounce } from './helper/index';
import { getUserInfo } from './helper/storage';

(() => {
  if (getUserInfo() !== null) return;
  location.replace('./login.html');
})();

let globalIndex = 0;

const createPin = (num: number) => {
  toggleLoading();
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const image = document.createElement('img');
  const random = Math.floor(Math.random() * MAX_IMG_COUNT) + 1;
  image.src = `${FOX_IMG_URL}/${random}.jpg`;
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = HeartButton(globalIndex, random);
  pin.classList.add('pin');
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  toggleLoading();
  return pin;
};

const HeartButton = (
  id: number,
  key: number | BookmarkDataType,
  isSaved?: boolean,
) => {
  if (isSaved) key as BookmarkDataType;
  return `
  <div class="anim-icon anim-icon-md heart">
    <input type="checkbox" id="heart${id}" ${isSaved && 'checked'}/>
    <label for="heart${id}" key=${isSaved ? key._id : key}></label>
  </div>
  `;
};

const loadMore = debounce(() => {
  const container = $<HTMLDivElement>('.container');
  const pinList: HTMLDivElement[] = [];
  for (let i = 10; i > 0; i--) {
    pinList.push(createPin(++globalIndex));
  }
  container.append(...pinList);
}, 500);

loadMore();

window.addEventListener('scroll', () => {
  const loader = $<HTMLDivElement>('.loader');
  if (loader === null) return;
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

$<HTMLLinkElement>('nav').addEventListener('click', event => {
  event.stopPropagation();
  const { target } = event;

  if (target === null) {
    console.log('target is null');
    return;
  }

  if (!target.matches('input')) return;

  const tabName = target.id;
  changeTab(tabName);
});

const changeTab = async (tabName: string) => {
  const $main = $<HTMLBodyElement>('main');
  $main.innerHTML = '';

  if (tabName === Tabs.EXPLORE) {
    $main.classList.remove('saved');
    $main.innerHTML = `
      <div class="container"></div>
      <div class="loader"></div>
    `;

    globalIndex = 0;
    loadMore();

    return;
  }

  if (tabName === Tabs.SAVED) {
    $main.classList.add('saved');
    const result = await getBookmarkList('/user/bookmark', {
      _id: getUserInfo(),
    });
    console.log(result);
    const $content = `
    <div class="container">
    ${result
        .map((item: BookmarkDataType, index: number) =>
          renderSavedPin(item, index),
        )
        .join('')}
    </div>
    `;

    $main.innerHTML = $content;
  }
};

const renderSavedPin = (item: BookmarkDataType, id: number) => {
  return `
  <div class="pin">
        <div class="button-wrapper">
          ${HeartButton(id, item, true)}
        </div><img src="${FOX_IMG_URL}/${item.url}.jpg">
      </div>
  `;
};

$('main').addEventListener('click', async event => {
  if (!event.target.matches('label[for^="heart"]')) return;
  const bookmarkId = event.target.getAttribute('key');
  const selectedPin = event.target.closest('.pin');

  const isSavedTab = $('main').classList.contains('saved');
  if (!isSavedTab) {
    await addBookmark(`/user/bookmark/${bookmarkId}`, {
      _id: getUserInfo(),
    });
    console.log('북마크에 추가');
    return;
  }

  await removeBookmark(`/user/bookmark/${bookmarkId}`, {
    _id: getUserInfo(),
  });
  selectedPin.style.display = 'none';
  console.log('북마크에서 제거');
});
