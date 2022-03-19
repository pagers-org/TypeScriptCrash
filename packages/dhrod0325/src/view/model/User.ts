import { bookMarkApi, Pin } from "@/view";

export interface BookmarkItem {
  _id: string;
  url: number;
  image?: string;
}

export class Bookmark {
  private items: Array<BookmarkItem>;

  constructor(items: Array<BookmarkItem>) {
    this.items = items;
  }

  add(bookmark: BookmarkItem) {
    this.items = [...this.items, bookmark];
  }

  remove(url: number) {
    this.items = [...this.items].filter(bookMark => +url !== +bookMark.url);
  }

  isMarked(url: number) {
    for (const bookmark of this.items) {
      if (+url === +bookmark.url) {
        return true;
      }
    }

    return false;
  }
}

export interface IUser {
  _id: string;
  bookMark: Bookmark;
}

export class User implements IUser {
  _id: string;
  bookMark: Bookmark;

  constructor({ _id, bookMarks = [] }: any) {
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