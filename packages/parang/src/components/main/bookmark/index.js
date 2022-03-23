import { getBookmarkList } from '../../../api';

export default class Bookmark {
  userToken;

  constructor(userToken) {
    this.userToken = userToken;
  }

  async template() {
    const result = await this.getList();
    const $content = `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" checked>
            <label for="heart${index}" key=${_id}></label>
          </div>
        </div>
        <img src="https://randomfox.ca/images/${url}.jpg" />
      </div>`,
      )
      .join('')}
    </div>
    `;

    return $content;
  }

  async getList() {
    const result = await getBookmarkList({ _id: this.userToken });
    return result;
  }
}
