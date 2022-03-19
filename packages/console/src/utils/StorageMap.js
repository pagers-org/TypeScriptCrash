export default class StorageMap {
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

  setValue(value) {
    this.convertItemProps(value);
    localStorage.setItem(this.#key, this.#value);
  }

  getValue() {
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
