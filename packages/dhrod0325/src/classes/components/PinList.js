import { Component } from '../core/Component';
import { createRandomFoxImageUrl, createRandomPin } from '../utils/PinUtils';
import { EVENT, NAV_STATE } from '../common/Constant';

import './PinItem';

const template = `
<div class="pin-list"></div>
`;

export class PinList extends Component {
  PIN_LOAD_COUNT = 10;

  currentLoadedPinCount = 0;

  scrollObserver;

  setUp() {
    this.initialize({
      template,
    });

    this.scrollObserver = new IntersectionObserver(
      (entries, io) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            io.unobserve(entry.target);
            this.loadPinList();
          }
        });
      },
      {
        threshold: 0.7,
      },
    );
  }

  mounted() {
    this.loadPinList();

    this.$emitter.on(EVENT.PinNav.SAVE_CLICKED, this.loadFavorite.bind(this));
    this.$emitter.on(EVENT.PinNav.EXPLORE_CLICKED, this.loadExplore.bind(this));
  }

  createPin(pin = createRandomPin(this.currentLoadedPinCount)) {
    const appendElement = document.createElement('pin-item');
    appendElement.setPin(pin);
    appendElement.setState(this.$state);
    appendElement.setEmitter(this.$emitter);

    this.$container.appendChild(appendElement);

    this.currentLoadedPinCount++;

    return appendElement;
  }

  loadPinList(loadCount = this.PIN_LOAD_COUNT) {
    this.$emitter.emit(EVENT.LoadingProgress.SHOW);

    for (let i = 0; i < loadCount; i++) {
      const pinElem = this.createPin();

      const isLast = i === loadCount - 1;

      if (isLast) {
        this.$emitter.emit(EVENT.LoadingProgress.HIDE);

        setTimeout(() => {
          const ee = pinElem.$container;
          this.scrollObserver.observe(ee);
        }, 20);
      }
    }
  }

  clear() {
    this.$container.innerHTML = '';
    this.scrollObserver.disconnect();
  }

  loadFavorite() {
    this.$state.NAV_STATE = NAV_STATE.STATE_SAVED;
    this.clear();

    this.$state.user.bookMarks.forEach(bookMark => {
      bookMark.image = createRandomFoxImageUrl(bookMark.url);
      this.createPin(bookMark);
    });
  }

  loadExplore() {
    this.$state.NAV_STATE = NAV_STATE.STATE_EXPLORE;
    this.clear();

    this.loadPinList();
  }
}

window.customElements.define('pin-list', PinList);
