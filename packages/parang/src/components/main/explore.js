import { GET_IMAGE_COUNT, IMAGE_API_URL } from '../../constants';
import { toggleLoading } from '../../helper';
import Client from '../../api/config/client';

export class Explore {
  constructor() {
    this.client = new Client({ baseURL: IMAGE_API_URL });
  }

  // async getBookmarkList() {}

  async getImageList() {
    toggleLoading();
    const numbers = Array.from(
      { length: GET_IMAGE_COUNT },
      () => Math.floor(Math.random() * 123) + 1,
    );
    const result = await Promise.all(
      numbers.map(random => this.client.getImage(random)),
    );
    toggleLoading();
    return result;
  }
}
