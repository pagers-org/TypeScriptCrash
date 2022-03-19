import { apiSuccess, HttpClient } from "@/core";

export declare type BookmarkParam = {
  _id: string;
  url?: number;
}

export class BookmarkApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async list({ _id }: BookmarkParam) {
    const data = await this.client.post({
      url: `/api/user/bookmark`,
      data: { _id }
    });

    return apiSuccess(data);
  }

  async add({ url, _id }: BookmarkParam) {
    const data = await this.client.post({
      url: `/api/user/bookmark/${url}`,
      data: { _id }
    });

    return apiSuccess(data);
  }

  async remove({ url, _id }: BookmarkParam) {
    const data = await this.client.delete({
      url: `/api/user/bookmark/${url}`,
      data: { _id }
    });

    return apiSuccess(data);
  }
}
