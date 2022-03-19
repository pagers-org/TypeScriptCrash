export interface IStorage<Key, Value> {
  getItem(key: Key): Value;

  setItem(key: Key, value: Value): void;
}

export class StorageAdapter<Key, Value> {
  private storage: IStorage<Key, Value>;

  constructor(storage: IStorage<Key, Value>) {
    this.storage = storage;
  }

  getItem(key: Key, defaultValue = null) {
    const result = this.storage.getItem(key);
    return result ? result : defaultValue;
  }

  setItem(key: Key, value: Value): void {
    this.storage.setItem(key, value);
  }
}
