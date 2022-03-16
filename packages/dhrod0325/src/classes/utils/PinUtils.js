import { RandomUtils } from './RandomUtils';

export function createRandomFoxImageUrl(key) {
  return `https://randomfox.ca/images/${key}.jpg`;
}

export function createRandomPin(pinId) {
  const key = RandomUtils.nextInt(123);

  return {
    _id: pinId,
    image: createRandomFoxImageUrl(key),
    key,
  };
}
