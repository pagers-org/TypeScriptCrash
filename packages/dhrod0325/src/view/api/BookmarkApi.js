import { ApiResponse } from '../../core';

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

    return ApiResponse.success(data);
  }

  async add({ key, _id }) {
    const data = await this.client.post({
      url: `/api/user/bookmark/${key}`,
      data: { _id },
    });

    return ApiResponse.success(data);
  }

  async remove({ key, _id }) {
    const data = await this.client.delete({
      url: `/api/user/bookmark/${key}`,
      data: { _id },
    });

    return ApiResponse.success(data);
  }
}
