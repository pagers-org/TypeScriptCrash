import { Component } from '../core/Component';
import { Debounce } from '../utils/Debounce';
import { createRandomFoxImageUrl, createRandomPin } from '../utils/Pin';
import { EVENT, NAV_STATE } from '../common/Constant';

import './PinItem';

const template = `
<div class="pin-list"></div>
`;

export class PinList extends Component {
  PIN_LOAD_COUNT = 10;

  currentLoadedPinCount = 0;
  isPinLoading = false;

  setUp() {
    this.initialize({
      template,
    });
  }

  mounted() {
    this.loadPinList();

    this.scrollBottomEvent();

    this.$emitter.on(EVENT.PinNav.SAVE_CLICKED, this.loadFavorite.bind(this));
    this.$emitter.on(EVENT.PinNav.EXPLORE_CLICKED, this.loadExplore.bind(this));
  }

  pushPin(pin = createRandomPin(this.currentLoadedPinCount)) {
    const appendElement = document.createElement('pin-item');
    appendElement.setPin(pin);
    appendElement.setState(this.$state);
    appendElement.setEmitter(this.$emitter);

    this.$container.appendChild(appendElement);

    this.currentLoadedPinCount++;
  }

  loadPinList(loadCount = this.PIN_LOAD_COUNT) {
    if (this.isPinLoading) return;

    this.isPinLoading = true;

    this.$emitter.emit(EVENT.LoadingProgress.SHOW);

    for (let i = 0; i < loadCount; i++) {
      Debounce.debounce(() => {
        this.pushPin();

        const isLast = i === loadCount - 1;

        if (isLast) {
          this.isPinLoading = false;
          this.$emitter.emit(EVENT.LoadingProgress.HIDE);
        }
      }, 500)();
    }
  }

  clear() {
    this.$container.innerHTML = '';
  }

  loadFavorite() {
    this.$state.NAV_STATE = NAV_STATE.STATE_SAVED;
    this.clear();

    this.$state.user.bookMarks.forEach(bookMark => {
      bookMark.image = createRandomFoxImageUrl(bookMark.url);
      this.pushPin(bookMark);
    });
  }

  loadExplore() {
    this.$state.NAV_STATE = NAV_STATE.STATE_EXPLORE;
    this.clear();

    this.loadPinList();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.loadPinList);
  }

  scrollBottomEvent() {
    window.addEventListener('scroll', () => {
      if (this.$state.NAV_STATE === NAV_STATE.STATE_SAVED) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.loadPinList();
      }
    });
  }
}

window.customElements.define('pin-list', PinList);
