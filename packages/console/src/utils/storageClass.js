export default class StorageManager {
  #key;
  #value;
  constructor(key) {
    this.#key = key;
  }

  convertItemProps(value) {
    this.#value = JSON.stringify(value);
  }
  parseItemProps(value) {
    this.#value = JSON.parse(value);
  }

  setItemProps(value) {
    this.convertItemProps(value);
    localStorage.removeItem(this.#key);
    localStorage.setItem(this.#key, this.#value);
  }

  getItemProps() {
    const localStorageItem = localStorage.getItem(this.#key);
    if (localStorageItem) {
      try {
        this.parseItemProps(localStorageItem);
        return this.#value;
      } catch (error) {
        console.warn(error);
      }
    }
    return this.#value;
  }
}
