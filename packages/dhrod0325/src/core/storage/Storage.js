export class Storage {
  storage;

  constructor(storage) {
    this.storage = storage;
  }

  getItem(key, defaultValue = null) {
    const result = this.storage.getItem(key);

    return result ? result : defaultValue;
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }
}
