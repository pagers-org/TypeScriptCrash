import { bookMarkApi, BookmarkItem, Pin } from '@/view';
import { Bookmark } from '@/view/model/Bookmark';

export declare type UserConstructor = {
  _id: string;
  bookMarks: Array<BookmarkItem>;
};

export interface IUser {
  _id: string;
  bookMark: Bookmark;
}

export class User implements IUser {
  _id: string;
  bookMark: Bookmark;

  constructor({ _id, bookMarks = [] }: UserConstructor) {
    this._id = _id;
    this.bookMark = new Bookmark(bookMarks);
  }

  async cancelBookMark(url: number) {
    const { _id } = this;

    await bookMarkApi.remove({ url, _id });
    this.bookMark.remove(url);
  }

  async addBookMark(url: number, pin: Pin) {
    const { _id } = this;

    await bookMarkApi.add({ url, _id });
    this.bookMark.add(pin as BookmarkItem);
  }
}
