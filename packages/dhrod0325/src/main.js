import '../assets/index.css';

import {PinList} from "./classes/components/PinList";
import {PinNav} from "./classes/components/PinNav";
import {Loading} from "./classes/components/Loading";

import {App} from "./classes/App";
import {AuthUtils} from "./classes/utils/AuthUtils";
import {addBookmark, getBookmarkList, removeBookmark} from "./api";
import {createRandomFoxImageUrl} from "./classes/components/Pin";

window.customElements.define('pin-list', PinList);
window.customElements.define('pin-nav', PinNav);
window.customElements.define('loading-bar', Loading);

AuthUtils.authCheck();

const _id = AuthUtils.getToken();
const bookMarks = [];

const state = {
    user: {
        _id,
        bookMarks
    },
    navigate: 'pin-list'
}

state.user.bookMarks = await getBookmarkList(state.user);

const app = new App(document.querySelector('.app'));

const pinList = document.createElement('pin-list');
const pinNav = document.createElement('pin-nav');
const loading = document.createElement('loading-bar');

app.addComponent(pinNav, state);
app.addComponent(pinList, state);
app.addComponent(loading, state);

pinNav.addEventListener(PinNav.EVENTS.savedClicked, async (e) => {
    pinList.scrollEventUse = false;
    pinList.clear();

    state.user.bookMarks.forEach(bookMark => {
        bookMark.image = createRandomFoxImageUrl(bookMark.url);

        pinList.pushPin(bookMark);
    });

    state.navigate = 'saved';
});

pinNav.addEventListener(PinNav.EVENTS.exploreClicked, e => {
    pinList.scrollEventUse = true;
    pinList.clear();
    pinList.loadPinList();

    state.navigate = 'explore';
});

pinList.addEventListener(PinList.EVENTS.favButtonClicked, async (e) => {
    const {pin} = e.detail;

    const data = {
        _id: AuthUtils.getToken(),
        key: pin.key
    }

    await addBookmark(data);

    state.user.bookMarks.push({
        url: pin.key,
        _id: pin._id
    });
});

pinList.addEventListener(PinList.EVENTS.cancelFavButtonClicked, async (e) => {
    const {pin, element} = e.detail;

    const data = {
        _id: AuthUtils.getToken(),
        key: pin.key ? pin.key : pin.url
    }

    await removeBookmark(data);

    state.user.bookMarks = state.user.bookMarks.filter(bookMark => {
        return parseInt(bookMark.url) !== data.key;
    });

    if (state.navigate === 'saved') {
        element.parentElement.parentElement.parentElement.remove();
    }
});

pinList.addEventListener(PinList.EVENTS.prePin, e => {
    loading.show();
});

pinList.addEventListener(PinList.EVENTS.afterPin, e => {
    loading.hide();
});