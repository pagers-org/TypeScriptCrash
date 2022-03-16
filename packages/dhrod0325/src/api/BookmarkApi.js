import { client } from '../classes/core/HttpClient';

export class BookmarkApi {
  static getBookmarkList({ _id }) {
    return client.post({
      url: `/api/user/bookmark`,
      data: { _id },
    });
  }

  static addBookmark({ key, _id }) {
    return client.post({
      url: `/api/user/bookmark/${key}`,
      data: { _id },
    });
  }

  static removeBookmark({ key, _id }) {
    return client.delete({
      url: `/api/user/bookmark/${key}`,
      data: { _id },
    });
  }
}
