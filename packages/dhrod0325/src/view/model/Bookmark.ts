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
