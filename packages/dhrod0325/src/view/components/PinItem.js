import { Component } from '../../core';
import { bookMarkApi, NAV_STATE_EXPLORE } from '../index';

const template = `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" class="togglePin" @click="pinToggleEvent" m-attr-id="pinId" m-attr-checked="isBookmark">
                        <label class="pin-label" m-attr-for="pinId"></label>
                    </div>
                </div>
                <img alt="" src="" m-attr-src="pinSrc"/>
            </div>
        `;

export class PinItem extends Component {
  pin;

  setUp() {
    const pinSrc = this.pin.image;
    const pinId = `heart-${this.pin.index}`;
    const isBookmark = this.$state.user.isBookmarked(this.pin.url);

    this.initialize({
      template,
      data: {
        pinId,
        pinSrc,
        isBookmark,
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

  setPin(pin) {
    this.pin = pin;
  }

  async favButtonClicked({ pin }) {
    const data = {
      ...this.$state.user,
      ...pin,
    };

    await bookMarkApi.add(data);
    this.$state.user.bookMarks.push(pin);
  }

  async cancelFavButtonClicked({ pin, target }) {
    const data = {
      ...this.$state.user,
      ...pin,
    };

    await bookMarkApi.remove(data);
    this.$state.user.removeBookmark(data.url);

    //TODO refactoring
    if (this.$state.NAV_STATE === NAV_STATE_EXPLORE) {
      target.parentElement.parentElement.parentElement.remove();
    }
  }
}

window.customElements.define('pin-item', PinItem);
