import { Component, RandomUtils } from '../../core';
import {
  EVENT_PIN_NAV_EXPLORE_CLICKED,
  EVENT_PIN_NAV_SAVE_CLICKED,
  EVENT_PROGRESS_HIDE,
  EVENT_PROGRESS_SHOW,
  MAX_IMAGE_NUMBER,
  NAV_STATE_EXPLORE,
  NAV_STATE_SAVED,
} from '../constant/Constant';

function createFoxImageUrl(url) {
  return `https://randomfox.ca/images/${url}.jpg`;
}

function createRandomPin(index) {
  const url = RandomUtils.nextInt(MAX_IMAGE_NUMBER);
  const image = createFoxImageUrl(url);

  return {
    index,
    image,
    url,
  };
}

const template = `<div class="pin-list"></div>`;

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
      { threshold: 0.7 },
    );
  }

  mounted() {
    this.loadPinList();

    this.$emitter.on(EVENT_PIN_NAV_SAVE_CLICKED, this.loadFavorite.bind(this));
    this.$emitter.on(
      EVENT_PIN_NAV_EXPLORE_CLICKED,
      this.loadExplore.bind(this),
    );
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
    this.$emitter.emit(EVENT_PROGRESS_SHOW);

    for (let i = 0; i < loadCount; i++) {
      const pinElem = this.createPin();

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
    this.$state.NAV_STATE = NAV_STATE_SAVED;
    this.clear();

    this.$state.user.bookMarks.forEach(bookMark => {
      bookMark.image = createFoxImageUrl(bookMark.url);
      this.createPin(bookMark);
    });
  }

  loadExplore() {
    this.$state.NAV_STATE = NAV_STATE_EXPLORE;
    this.clear();

    this.loadPinList();
  }
}

window.customElements.define('pin-list', PinList);
