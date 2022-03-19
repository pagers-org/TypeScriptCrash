import { Component } from "@/core";
import { NAV_STATE } from "@/view";

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

export declare type Pin = {
  index?: string | number;
  image: string;
  url: number;
}

export class PinItem extends Component {
  pin: Pin;

  setUp() {
    const pinSrc = this.pin.image;
    const pinId = `heart-${this.pin.index}`;
    const isBookmark = this.$state.user.bookMark.isMarked(this.pin.url);

    this.initialize({
      template,
      data: {
        pinId,
        pinSrc,
        isBookmark
      },
      method: {
        pinToggleEvent({ target }: Event) {
          // @ts-ignore
          const { pin } = this;

          // @ts-ignore
          target.checked ? this.favButtonClicked(pin) : this.cancelFavButtonClicked(pin);
        }
      }
    });
  }

  setPin(pin: Pin) {
    this.pin = pin;
  }

  async favButtonClicked(pin: Pin) {
    const { url } = pin;

    await this.$state.user.addBookMark(url, pin);
  }

  async cancelFavButtonClicked(pin: Pin) {
    const { url } = pin;

    await this.$state.user.cancelBookMark(url);

    if (this.$state.NAV_STATE === NAV_STATE.SAVED) {
      this.$container.remove();
    }
  }

}

window.customElements.define("pin-item", PinItem);
