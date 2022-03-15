import {Component} from "../core/Component";
import {Debounce} from "../utils/Debounce";
import {ViewUtils} from "../utils/ViewUtils";
import {createRandomPin, pinTemplate} from "./Pin";

export class PinList extends Component {
    static EVENTS = {
        prePin: 'prePin',
        afterPin: 'afterPin',
        favButtonClicked: 'favButtonClicked',
        cancelFavButtonClicked: 'cancelFavButtonClicked'
    }

    currentLoadedPinCount = 0;
    rowCount = 10;
    scrollEventUse = true;

    connectedCallback() {
        this.loadPinList(this.rowCount);

        this.addOnScrollBottomEvent(() => {
            if (!this.scrollEventUse) {
                return;
            }
            this.loadPinList();
        });
    }

    pushPin(pin = createRandomPin(this.currentLoadedPinCount)) {
        this.dispatchEvent(new CustomEvent(PinList.EVENTS.prePin));

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

        this.dispatchEvent(new CustomEvent(PinList.EVENTS.afterPin));
    }

    loadPinList(loadCount = this.rowCount) {
        for (let i = 0; i < loadCount; i++) {
            Debounce.debounce(() => {
                this.pushPin();
            }, 500)();
        }
    }

    clear() {
        this.innerHTML = '';
    }

    pinToggleEvent(element, pin) {
        const detailData = {detail: {element, pin}};

        if (element.checked) {
            this.dispatchEvent(new CustomEvent(PinList.EVENTS.favButtonClicked, detailData));
        } else {
            this.dispatchEvent(new CustomEvent(PinList.EVENTS.cancelFavButtonClicked, detailData));
        }
    }
}

