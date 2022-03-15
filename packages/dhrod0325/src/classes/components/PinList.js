import {Component} from "../core/Component";
import {addBookmark, removeBookmark} from "../../api";
import {ViewUtils} from "../utils/ViewUtils";

export class PinList extends Component {
    rowCount = 10;
    pinListId = 0;

    connectedCallback() {
        this.loadMore();
    }

    createPin(pin) {
        return `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" id="heart${pin.id}" @click="togglePin">
                        <label for="heart${pin.id}"></label>
                    </div>
                </div>
                <img src="${pin.image}" alt=""/>
            </div>
        `;
    }

    pushPin(pin = this.createRandomPin()) {
        const template = document.createElement('template');
        template.innerHTML = this.createPin(pin);

        const appendElement = template.content.firstElementChild;
        this.appendChild(appendElement);

        appendElement.querySelectorAll('*').forEach(element => {
            const clickEvent = element.getAttribute('@click');

            if (clickEvent) {
                element.addEventListener('click', () => {
                    this.events[clickEvent](element, pin);
                })
            }
        });
    }

    createRandomPin() {
        const key = Math.floor(Math.random() * 123) + 1;

        return {
            id: this.pinListId++,
            image: 'https://randomfox.ca/images/' + key + '.jpg',
            key
        }
    }

    loadMore() {
        for (let i = 0; i < this.rowCount; i++) {
            ViewUtils.debounce(() => {
                this.pushPin();
            }, 500)();
        }
    }

    events = {
        togglePin: async (element, pin) => {
            if (element.checked) {
                const _id = localStorage.getItem('user_token');
                await addBookmark(`/api/user/bookmark/${pin.key}`, {_id},);
                console.log('add bookmark');
            } else {
                const _id = localStorage.getItem('user_token');
                await removeBookmark(`/api/user/bookmark/${pin.key}`, {_id},);
                console.log('remove bookmark');
            }
        }
    }
}

