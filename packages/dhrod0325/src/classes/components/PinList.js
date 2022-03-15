import {Component} from "../core/Component";
import {addBookmark, removeBookmark} from "../../api";
import {Debounce} from "../utils/Debounce";
import {ViewUtils} from "../utils/ViewUtils";

function pinTemplate(pin) {
    return `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" id="heart${pin._id}" class="togglePin">
                        <label for="heart${pin._id}"></label>
                    </div>
                </div>
                <img src="${pin.image}" alt=""/>
            </div>
        `;
}

function createRandomPin(pinId) {
    const key = Math.floor(Math.random() * 123) + 1;

    return {
        _id: pinId,
        image: 'https://randomfox.ca/images/' + key + '.jpg',
        key
    }
}

export class PinList extends Component {
    currentLoadedPinCount = 0;
    rowCount = 10;
    scrollEventUse = true;

    connectedCallback() {
        this.loadPinList(this.rowCount);

        window.addEventListener('scroll', () => {
            this.scrollEvent();
        });
    }

    pushPin(pin = createRandomPin(this.currentLoadedPinCount)) {
        const appendElement = ViewUtils.stringToElement(pinTemplate(pin));
        this.appendChild(appendElement);
        appendElement.querySelector('.togglePin').addEventListener('click', async (e) => {
            await this.pinToggleEvent(e.target, pin);
        });
        this.currentLoadedPinCount++;
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

    scrollEvent() {
        if (!this.scrollEventUse) {
            return;
        }

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            this.loadPinList();
        }
    }

    async pinToggleEvent(element, pin) {
        const data = {
            _id: localStorage.getItem('user_token'),
            key: pin.key
        }

        if (element.checked) {
            await addBookmark(data);
        } else {
            await removeBookmark(data);
        }
    }
}

