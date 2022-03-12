import { $, debounce } from '../helper/index.js';

let index = 0;

const createPin = () => {
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = `
  <div class="anim-icon anim-icon-md heart">
    <input type="checkbox" id="heart${index}" />
    <label for="heart${index}"></label>
  </div>
  `;
  pin.classList.add('pin');
  // const height = Math.trunc(Math.random() * 100) + 200;
  const image = document.createElement('img');
  // image.src = 'https://picsum.photos/400/' + height;
  const rendom = Math.floor(Math.random() * 123) + 1;
  image.width = '460';
  image.src = `https://randomfox.ca/images/${rendom}.jpg`;
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  return pin;
};

const loadMore = debounce(() => {
  const container = $('.container');
  const pinList = [];
  for (let i = 10; i > 0; i--) {
    pinList.push(createPin(++index));
  }
  container.append(...pinList);
}, 500);

window.addEventListener('scroll', () => {
  const loader = $('.loader');
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

loadMore();
