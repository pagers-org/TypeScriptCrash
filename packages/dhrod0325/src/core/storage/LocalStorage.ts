import { IStorage } from '@/core';

export class LocalStorage implements IStorage<string, any> {
  getItem(key: string): any {
    const value = localStorage.getItem(key);

    if (value == null) {
      throw new Error('value is null');
    }

    return JSON.parse(value);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
