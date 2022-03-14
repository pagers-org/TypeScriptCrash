import '../assets/index.css';

import {PinList} from "./classes/components/PinList";
import {App} from "./classes/App";

window.customElements.define('pin-list', PinList);

const app = new App(document.querySelector('.container'));

const pinListElem = document.createElement('pin-list');

app.addComponent(pinListElem);

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        pinListElem.loadMore();
    }
});
