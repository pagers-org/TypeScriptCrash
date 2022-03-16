import '../assets/index.css';
import { fetchData } from './api';
import { $, toggleLoading, debounce } from './helper/index.js';

(() => {
  const isLogin = localStorage.getItem('user_token');
  if (isLogin !== null) return;

  location.replace('./login.html');
})();

let globalIndex = 0;
const _id = localStorage.getItem('user_token');
const $main = $('main');

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
  const targetAttrKey = event.target.getAttribute('key');
  const requestUrl = `/user/bookmark/${targetAttrKey}`;
  if (targetAttrKey?.length > 3) {
    await fetchData('removeBookmark', requestUrl, { _id }, 'DELETE');
    renderSavePage();
  }
  const result = await fetchData('getBookmarkList', '/user/bookmark', { _id });
  const selectedImage = result.filter(item => {
    return item.url === targetAttrKey;
  });

  if (event.target.matches('input[id^="heart"]')) {
    if (event.target.checked) {
      await fetchData('addBookmark', requestUrl, { _id });
      return;
    } else {
      await fetchData(
        'removeBookmark',
        `/user/bookmark/${selectedImage[0]?._id}`,
        { _id },
        'DELETE',
      );
      return;
    }
  }

  if (!event.target.matches('label[for^="heart"]')) return;
  console.log('북마크에 저장되었습니다.');
});
