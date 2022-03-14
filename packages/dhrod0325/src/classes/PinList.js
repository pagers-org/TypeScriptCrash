import {$, debounce} from "../helper";
import {addBookmark} from "../api";

export class PinList extends HTMLElement {
    rowCount = 10;
    globalIndex = 0;

    connectedCallback() {
        this.toggleLoading();

        this.loadMore();

        this.toggleLoading();

        this.events();
    }

    createPin() {
        const pin = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const image = document.createElement('img');
        const random = Math.floor(Math.random() * 123) + 1;

        image.src = `https://randomfox.ca/images/${random}.jpg`;

        buttonWrapper.setAttribute('class', 'button-wrapper');

        buttonWrapper.innerHTML = `
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${this.globalIndex}" />
            <label for="heart${this.globalIndex}"></label>
          </div>
          `;

        buttonWrapper.querySelector('[type="checkbox"]').addEventListener('click', async (e) => {
            const _id = localStorage.getItem('user_token');
            await addBookmark(`/api/user/bookmark/${random}`, {_id},);
            console.log('북마크에 저장되었습니다.');
        });

        pin.classList.add('pin');
        pin.appendChild(buttonWrapper);
        pin.appendChild(image);

        this.appendChild(pin);

        this.globalIndex++;
    }

    toggleLoading() {
        $('.loading').classList.toggle('hidden');
    }

    loadMore() {
        for (let i = this.rowCount; i > 0; i--) {
            debounce(() => {
                this.createPin();
            }, 500)();
        }
    }

    events() {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                this.loadMore();
            }
        });
    }
}