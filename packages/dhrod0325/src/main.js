import '../assets/index.css';

import {PinList} from "./classes/components/PinList";
import {App} from "./classes/App";
import {Store} from "./classes/core/Store";

window.customElements.define('pin-list', PinList);

const app = new App(document.querySelector('.container'));
const store = new Store((target, property) => {
    app.components.forEach(component => {
        component.onStateChange(target, property);
    });
});

app.store = store;

const pinList = document.createElement('pin-list');

app.addComponent(pinList);

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        pinList.loadMore();
    }
});