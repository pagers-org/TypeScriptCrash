import { toggleLoading } from '../helper';

export class Explore {
  constructor() {
    console.log('초기화');
  }

  async allResolve() {
    toggleLoading();
    const numbers = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 123) + 1,
    );
    const url = num => `https://randomfox.ca/images/${num}.jpg`;
    const result = await Promise.all(numbers.map(random => fetch(url(random))));
    toggleLoading();
    return result;
  }
}
