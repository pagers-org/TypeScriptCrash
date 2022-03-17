export class User {
  _id;
  bookMarks;

  constructor({ _id, bookMarks = [] }) {
    this._id = _id;
    this.bookMarks = bookMarks;
  }

  removeBookmark(url) {
    this.bookMarks = this.bookMarks.filter(bookMark => {
      return +url !== +bookMark.url;
    });
  }

  isBookmarked(url) {
    for (const bookmark of this.bookMarks) {
      if (+url === +bookmark.url) {
        return true;
      }
    }

    return false;
  }
}
