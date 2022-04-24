import { getBookmarkList } from '../../../api';

export default class Bookmark {
  constructor(private userToken: string) {
    this.userToken = userToken;
  }

  async template() {
    const result = await this.getList();
    if (result === undefined) return `<div>데이터가 없어요!</div>`;
    const $content = `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => /*html*/ `
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
    const result = await getBookmarkList<{ _id: string; url: string }[]>({
      _id: this.userToken,
    });
    return result;
  }
}
