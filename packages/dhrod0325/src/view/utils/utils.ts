import { IMAGE_API_URL, MAX_IMAGE_NUMBER, Pin } from '@/view';
import { RandomUtils } from '@/core';

export function createFoxImageUrl(url: number): string {
  return `${IMAGE_API_URL}/${url}.jpg`;
}

export function createRandomPin(index: string | number): Pin {
  const url = RandomUtils.nextInt(MAX_IMAGE_NUMBER);
  const image = createFoxImageUrl(url);

  return {
    index,
    image,
    url,
  };
}
