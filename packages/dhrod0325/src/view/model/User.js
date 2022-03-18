class Bookmark {
  items;

  constructor(items) {
    this.items = items;
  }

  add(bookmark) {
    this.items = [...this.items, bookmark];
  }

  remove(url) {
    this.items = [...this.items].filter(bookMark => +url !== +bookMark.url);
  }

  isMarked(url) {
    for (const bookmark of this.items) {
      if (+url === +bookmark.url) {
        return true;
      }
    }

    return false;
  }
}

export class User {
  _id;
  bookMark;

  constructor({ _id, bookMarks = [] }) {
    this._id = _id;
    this.bookMark = new Bookmark(bookMarks);
  }
}
