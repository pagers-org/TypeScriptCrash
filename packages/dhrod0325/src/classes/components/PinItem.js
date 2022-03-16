import { Component } from '../core/Component';
import { addBookmark, removeBookmark } from '../../api';
import { NAV_STATE } from '../common/Constant';

const template = `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" id="heart" class="togglePin" @click="pinToggleEvent" m-attr-id="pinId">
                        <label for="heart" class="pin-label" m-attr-for="pinId"></label>
                    </div>
                </div>
                <img src="" alt="" m-attr-src="pinSrc"/>
            </div>
        `;

export class PinItem extends Component {
  pin;

  setUp() {
    const pinSrc = this.pin.image;
    const pinId = `heart-${this.pin._id}`;

    this.initialize({
      template,
      data: {
        pinId,
        pinSrc,
      },
      method: {
        pinToggleEvent({ target }) {
          const { pin } = this;

          target.checked
            ? this.favButtonClicked({ pin })
            : this.cancelFavButtonClicked({ pin, target });
        },
      },
    });
  }

  mounted() {
    const inputEl = this.$container.querySelector('.togglePin');

    this.$state.user.bookMarks.forEach(bookMark => {
      const url = Number(bookMark.url);
      const { key: pinKey, url: pinUrl } = this.pin;

      if (url === Number(pinKey) || url === Number(pinUrl)) {
        inputEl.setAttribute('checked', 'checked');
      }
    });
  }

  setPin(pin) {
    this.pin = pin;
  }

  async favButtonClicked({ pin }) {
    const data = {
      ...this.$state.user,
      ...{
        key: pin.key ? pin.key : pin.url,
      },
    };

    await addBookmark(data);

    this.$state.user.bookMarks.push({
      url: pin.key,
      _id: pin._id,
    });
  }

  async cancelFavButtonClicked({ pin, target }) {
    const data = {
      ...this.$state.user,
      ...{
        key: pin.key ? pin.key : pin.url,
      },
    };

    await removeBookmark(data);

    this.$state.user.bookMarks = this.$state.user.bookMarks.filter(bookMark => {
      const url = parseInt(bookMark.url);
      const dataKey = parseInt(data.key);
      const dataUrl = parseInt(data.url);

      return url !== dataKey && url !== dataUrl;
    });

    if (this.$state.NAV_STATE === NAV_STATE.STATE_SAVED) {
      target.parentElement.parentElement.parentElement.remove();
    }
  }
}

window.customElements.define('pin-item', PinItem);
