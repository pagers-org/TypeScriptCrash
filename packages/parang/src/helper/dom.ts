export const $ = <T extends HTMLElement>(selector: string) => {
  const element = document.querySelector(selector);
  if (!element) throw new ReferenceError('옳지 못한 접근입니다.');
  return element as T;
};

export const $all = <T extends HTMLElement>(selector: string) => {
  const elements = document.querySelectorAll(selector);
  if (!elements) throw new ReferenceError('옳지 못한 접근입니다.');
  return elements as NodeListOf<T>;
};

export const toggleLoading = (): void => {
  $('.loading').classList.toggle('hidden');
};

export const $value = (selectors: string[]): HTMLInputElement[] =>
  Array.from({ length: selectors.length }, (_, index) => $(selectors[index]));

export const $resetInputValue = (selectors: string[]) =>
  selectors.forEach(selector => ($<HTMLInputElement>(selector).value = ''));

export const $addEvent = (
  $element: HTMLElement,
  eventType: keyof HTMLElementEventMap,
  listenser: EventListenerOrEventListenerObject,
) => $element.addEventListener(eventType, listenser);
