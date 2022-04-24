interface Storage {
  convertItemProps(value: string): void;
  parseItemProps(value: string): void;
  setValue(value: string): void;
  getValue(): void;
}
export default class StorageMap implements Storage {
  private key: string;
  private value: string;
  constructor(key: string) {
    this.key = key;
  }

  convertItemProps(value: string) {
    this.value = JSON.stringify(value);
  }
  parseItemProps(value: string) {
    this.value = JSON.parse(value);
  }

  setValue(value: string) {
    this.convertItemProps(value);
    localStorage.setItem(this.key, this.value);
  }

  getValue() {
    const localStorageItem = localStorage.getItem(this.key);
    if (localStorageItem) {
      try {
        this.parseItemProps(localStorageItem);
        return this.value;
      } catch (error) {
        console.warn(error);
      }
    }
    return this.value;
  }
}
