import {Component} from "../core/Component";
import {Debounce} from "../utils/Debounce";
import {ViewUtils} from "../utils/ViewUtils";
import {createRandomFoxImageUrl, createRandomPin, pinTemplate} from "../utils/Pin";
import {addBookmark, removeBookmark} from "../../api";
import {EVENT} from "../utils/Constant";

const STATE_EXPLORE = 'STATE_EXPLORE';
const STATE_SAVED = 'STATE_SAVED';

export class PinList extends Component {
    currentLoadedPinCount = 0;
    rowCount = 10;
    navigate = STATE_EXPLORE;
    isPinLoading = false;

    pushPin(pin = createRandomPin(this.currentLoadedPinCount)) {
        this.emitter.emit(EVENT.LoadingProgress.SHOW);

        const appendElement = ViewUtils.stringToElement(pinTemplate(pin));
        this.appendChild(appendElement);

        const togglePinElem = appendElement.querySelector('.togglePin');

        this.state.user.bookMarks.forEach(bookMark => {
            const url = parseInt(bookMark.url);

            if (url === pin.key || url === pin.url * 1) {
                togglePinElem.setAttribute('checked', 'checked');
            }
        });

        togglePinElem.addEventListener('click', (e) => {
            this.pinToggleEvent(e.target, pin);
        });

        this.currentLoadedPinCount++;

        this.emitter.emit(EVENT.LoadingProgress.HIDE);
    }

    loadPinList(loadCount = this.rowCount) {
        if (this.isPinLoading)
            return;

        this.isPinLoading = true;

        this.emitter.emit(EVENT.LoadingProgress.SHOW);

        for (let i = 0; i < loadCount; i++) {
            Debounce.debounce(() => {
                this.pushPin();
                this.isPinLoading = false;
            }, 500)();
        }
    }

    clear() {
        this.innerHTML = '';
    }

    pinToggleEvent(element, pin) {
        element.checked ? this.favButtonClicked({pin}) : this.cancelFavButtonClicked({pin, element});
    }

    loadFavorite() {
        this.navigate = STATE_SAVED;
        this.clear();

        this.state.user.bookMarks.forEach(bookMark => {
            bookMark.image = createRandomFoxImageUrl(bookMark.url);
            this.pushPin(bookMark);
        });
    }

    loadExplore() {
        this.navigate = STATE_EXPLORE;
        this.clear();

        this.loadPinList();
    }

    async favButtonClicked({pin}) {
        const data = {
            ...this.state.user,
            ...{
                key: pin.key ? pin.key : pin.url
            }
        };

        await addBookmark(data);

        this.state.user.bookMarks.push({
            url: pin.key,
            _id: pin._id
        });
    }

    async cancelFavButtonClicked({pin, element}) {
        const data = {
            ...this.state.user,
            ...{
                key: pin.key ? pin.key : pin.url
            }
        };

        await removeBookmark(data);

        this.state.user.bookMarks = this.state.user.bookMarks.filter(bookMark => {
            const url = parseInt(bookMark.url);
            const dataKey = parseInt(data.key);
            const dataUrl = parseInt(data.url);

            return url !== dataKey && url !== dataUrl;
        });

        if (this.navigate === STATE_SAVED) {
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    mounted() {
        this.loadPinList();

        this.addOnScrollBottomEvent();

        this.emitter.on(EVENT.PinNav.SAVE_CLICKED, this.loadFavorite.bind(this));
        this.emitter.on(EVENT.PinNav.EXPLORE_CLICKED, this.loadExplore.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.loadPinList);
    }

    addOnScrollBottomEvent() {
        window.addEventListener('scroll', () => {
            if (this.navigate === STATE_SAVED) {
                return;
            }

            const {
                scrollTop, scrollHeight, clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                this.loadPinList();
            }
        });
    }
}

window.customElements.define('pin-list', PinList);
