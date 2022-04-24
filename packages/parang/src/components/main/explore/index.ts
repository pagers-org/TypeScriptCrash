import { getFoxImages, setBookmark } from '../../../api';
import { toggleLoading, debounce, createUUID, $ } from '../../../helper';

const GET_IMAGE_COUNT = 10;
const MAX_FOX_IMAGE_COUNT = 123;

export default class Explore {
  photoIndex = 0;
  static userToken: string;

  constructor(userToken: string) {
    Explore.userToken = userToken;

    this.loadMore();

    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight < scrollHeight - 5) return;
      this.loadMore();
    });
  }

  template() {
    return '<div class="container"></div>';
  }

  loadMore = debounce(() => {
    this.createPin();
  }, 500);

  async createPin() {
    const imageList = await this.getImageList();
    $('.container').append(
      ...imageList.map(({ url: foxImageURL }) => {
        const pin = document.createElement('div');
        pin.classList.add('pin');
        pin.innerHTML = /*html*/ `
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${this.photoIndex}" />
            <label for="heart${this.photoIndex++}" key=${createUUID()}></label>
          </div>
        </div>
        <img src="${foxImageURL}" />
        `;
        return pin;
      }),
    );
  }

  getFoxNumber() {
    return Math.floor(Math.random() * MAX_FOX_IMAGE_COUNT) + 1;
  }

  async getImageList() {
    toggleLoading();
    const numbers = Array.from({ length: GET_IMAGE_COUNT }, () =>
      this.getFoxNumber(),
    );
    const result = await Promise.all(
      numbers.map(random => getFoxImages(random)),
    );
    toggleLoading();
    return result;
  }

  static async likeFox(event: Event) {
    const $target = event.target as HTMLLabelElement;
    if (!$target.matches('label[for^="heart"]')) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const key = $target.getAttribute('key')!;
    await setBookmark(key, { _id: this.userToken });
    alert('북마크에 저장되었습니다.');
  }
}
