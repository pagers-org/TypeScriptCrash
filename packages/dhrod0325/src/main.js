import '../assets/index.css';

import {PinList} from "./classes/PinList";
import {$, authCheck} from "./helper";
import {getBookmarkList} from "./api";


authCheck();

window.customElements.define('pin-list', PinList);

$('nav').addEventListener('click', async event => {
    event.stopPropagation();

    if (!event.target.matches('input')) return;

    const $main = $('main');
    $main.innerHTML = '';

    if (event.target.matches('#explore')) {
        $main.classList.remove('saved');
        $main.innerHTML = `
      <pin-list></pin-list>
      <div class="loader"></div>
    `;

    }

    if (event.target.matches('#saved')) {
        $main.classList.add('saved');
        const _id = localStorage.getItem('user_token');
        const result = await getBookmarkList({_id});
        $main.innerHTML = `
    <div class="container">
    ${result.map(({_id, url}, index) => `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" checked>
            <label for="heart${index}" key=${_id}></label>
          </div>
        </div><img src="https://randomfox.ca/images/${url}.jpg">
      </div>`,).join('')}
    </div>
    `;
    }
});