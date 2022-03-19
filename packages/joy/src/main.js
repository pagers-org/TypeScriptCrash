import '../assets/index.css';
import { addBookmark, getBookmarkList, removeBookmark } from './api';
import { $, $all, toggleLoading, debounce } from './util';
import { heartBtnWrapper, explore_tab, saved_tab } from './components';
import { RANDOM_IMG_URL, RANDOM_IMG_MAX, RENDER_IMG_MAX } from './constant';

//무한 스크롤
const loadMore = debounce(() => {
  const container = $('.container');
  const pinList = [];
  for (let i = RENDER_IMG_MAX; i > 0; i--) {
    pinList.push(createPin(++globalIndex));
  }
  container.append(...pinList);
}, 500);

//IIFE, 즉시 실행 함수
(() => {
  const isLogin = localStorage.getItem('user_token');
  if (isLogin !== null) {
    loadMore();
    return;
  }
  location.replace('./login.html');
})();

////////////////////////////////////////////////////////

let globalIndex = 0;

//여우 사진 게시글 만들기
const createPin = () => {
  toggleLoading();
  const pin = document.createElement('div');
  const image = document.createElement('img');

  const random = Math.floor(Math.random() * RANDOM_IMG_MAX) + 1;
  image.src = `${RANDOM_IMG_URL}/${random}.jpg`;
  const buttonWrapper = heartBtnWrapper(globalIndex, random);
  
  pin.classList.add('pin');
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  toggleLoading();
  return pin;
};

//스크롤 시 새로운 사진 추가
window.addEventListener('scroll', () => {
  const loader = $('.loader');
  if (loader === null) return;
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

//탭 전환
$('nav').addEventListener('click', async (event) => {
  event.stopPropagation(); //이벤트 버블링 제거
  if (!event.target.matches('input')) return;
  const $main = $('main');
  $main.innerHTML = '';

  //선택한 탭이 explore라면
  if (event.target.matches('#explore')) {
    $main.classList.remove('saved');
    $main.innerHTML = explore_tab();
    globalIndex = 0;
    loadMore();
  }

  //선택한 탭이 saved(=bookmark)라면
  if (event.target.matches('#saved')) {
    $main.classList.add('saved');
    const _id = localStorage.getItem('user_token');
    const result = await getBookmarkList({ _id });
    const $content = saved_tab(result);

    $main.innerHTML = $content;

    
  }
});

//북마크 선택
//이벤트 위임
//TODO 삭제, 저장 후 리렌더링
$('main').addEventListener('click', async (event) => {
  if (event.target.matches('label[for^="heart"]')) {
    const selected_tab = Array.from($all('.item'))
      .find((elem) => elem.querySelector('input').checked)
      .querySelector('input').id;
    const _id = localStorage.getItem('user_token');
    const _key = event.target.getAttribute('key');

    if (selected_tab === 'explore'){
      await addBookmark({
        _id,
        _key,
      });
      alert('북마크에 저장되었습니다.');
    } else if(selected_tab === 'saved'){
      await removeBookmark({
        _id,
        _key,
      });
      alert('북마크가 삭제되었습니다.');
    }
  }
});