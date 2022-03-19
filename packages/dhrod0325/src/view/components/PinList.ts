import { Component } from '@/core';
import {
  createFoxImageUrl,
  createRandomPin,
  EVENT_PIN_NAV_EXPLORE_CLICKED,
  EVENT_PIN_NAV_SAVE_CLICKED,
  EVENT_PROGRESS_HIDE,
  EVENT_PROGRESS_SHOW,
  NAV_STATE,
  Pin,
  PinItem,
} from '@/view';

const template = `<div class="pin-list"></div>`;

export class PinList extends Component {
  PIN_LOAD_COUNT = 10;

  currentLoadedPinCount = 0;

  private scrollObserver: IntersectionObserver;

  setUp() {
    this.setContainer(template);
    this.createScrollObserver();
  }

  mounted() {
    this.loadPinList();

    this.$emitter.on(EVENT_PIN_NAV_SAVE_CLICKED, this.loadFavorite.bind(this));
    this.$emitter.on(
      EVENT_PIN_NAV_EXPLORE_CLICKED,
      this.loadExplore.bind(this),
    );
  }

  createScrollObserver() {
    this.scrollObserver = new IntersectionObserver(
      (entries, io) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            io.unobserve(entry.target);
            this.loadPinList();
          }
        });
      },
      { threshold: 0.7 },
    );
  }

  createPin(pin: Pin = createRandomPin(this.currentLoadedPinCount)) {
    const appendElement = <PinItem>document.createElement('pin-item');
    appendElement.setPin(pin);
    appendElement.setState(this.$state);
    appendElement.setEmitter(this.$emitter);

    this.$container.appendChild(appendElement);

    this.currentLoadedPinCount++;

    return appendElement;
  }

  loadPinList(loadCount = this.PIN_LOAD_COUNT) {
    this.$emitter.emit(EVENT_PROGRESS_SHOW);

    for (let i = 0; i < loadCount; i++) {
      const pinElem = this.createPin();

      if (!(pinElem.$container instanceof HTMLElement)) {
        continue;
      }

      const isLast = i === loadCount - 1;

      if (isLast) {
        this.$emitter.emit(EVENT_PROGRESS_HIDE);
        this.scrollObserver.observe(pinElem.$container);
      }
    }
  }

  clear() {
    this.$container.innerHTML = '';
    this.scrollObserver.disconnect();
  }

  loadFavorite() {
    this.$state.NAV_STATE = NAV_STATE.SAVED;
    this.clear();

    this.$state.user.bookMark.items.forEach((bookMark: Pin) => {
      bookMark.image = createFoxImageUrl(bookMark.url);
      this.createPin(bookMark);
    });
  }

  loadExplore() {
    this.$state.NAV_STATE = NAV_STATE.EXPLORE;
    this.clear();

    this.loadPinList();
  }
}

window.customElements.define('pin-list', PinList);
