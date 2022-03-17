import { apiSuccess } from '../../core';

export class BookmarkApi {
  client;

  constructor(client) {
    this.client = client;
  }

  async list({ _id }) {
    const data = await this.client.post({
      url: `/api/user/bookmark`,
      data: { _id },
    });

    return apiSuccess(data);
  }

  async add({ url, _id }) {
    const data = await this.client.post({
      url: `/api/user/bookmark/${url}`,
      data: { _id },
    });

    return apiSuccess(data);
  }

  async remove({ url, _id }) {
    const data = await this.client.delete({
      url: `/api/user/bookmark/${url}`,
      data: { _id },
    });

    return apiSuccess(data);
  }
}
