import '../assets/index.css';

import {PinList} from "./classes/components/PinList";
import {PinNav} from "./classes/components/PinNav";

import {App} from "./classes/App";
import {AuthUtils} from "./classes/utils/AuthUtils";

window.customElements.define('pin-list', PinList);
window.customElements.define('pin-nav', PinNav);

AuthUtils.authCheck();

const app = new App(document.querySelector('.container'));

const pinList = document.createElement('pin-list');
const pinNav = document.createElement('pin-nav');

app.addComponent(pinNav);
app.addComponent(pinList);

pinNav.addEventListener('savedClicked', e => {
    pinList.scrollEventUse = false;
    pinList.clear();

    const {bookMarks} = e.detail;

    bookMarks.forEach(bookMark => {
        bookMark.image = `https://randomfox.ca/images/${bookMark.url}.jpg`;
        pinList.pushPin(bookMark);
    });
});

pinNav.addEventListener('exploreClicked', e => {
    pinList.scrollEventUse = true;
    pinList.clear();
    
    pinList.loadPinList();
});