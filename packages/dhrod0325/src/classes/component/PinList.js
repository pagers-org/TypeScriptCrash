import {Component} from "../core/Component";
import {debounce} from "../core/debounce";

export class PinList extends Component {
    rowCount = 10;
    pinListId = 0;

    render() {
        this.innerHTML = this.state.pinList.map(this.createPin).join('');
        this.loadMore();
    }

    createPin(pin) {
        return `
            <div class="pin">
                <div class="button-wrapper">
                    <div class="anim-icon anim-icon-md heart">
                        <input type="checkbox" id="heart${pin.id}">
                        <label for="heart${pin.id}"></label>
                    </div>
                </div>
                <img src="${pin.image}" alt=""/>
            </div>
        `;
    }

    pushPin(pin = this.createRandomPin()) {
        this.state.pinList.push(pin);

        const template = document.createElement('template');
        template.innerHTML = this.createPin(pin);
        this.appendChild(template.content.firstElementChild);
    }

    createRandomPin() {
        return {
            id: this.pinListId++,
            image: 'https://randomfox.ca/images/' + (Math.floor(Math.random() * 123) + 1) + '.jpg'
        }
    }

    loadMore() {
        for (let i = 0; i < this.rowCount; i++) {
            debounce(() => {
                this.pushPin();
            }, 500)();
        }
    }
}