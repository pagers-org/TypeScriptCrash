export const $ = selector => document.querySelector(selector);

export const $all = selector => document.querySelectorAll(selector);

export const toggleLoading = () => $('.loading').classList.toggle('hidden');

export const $value = selectors =>
  Array.from({ length: selectors.length }, (_, index) => $(selectors[index]));

export const $initValue = selectors =>
  selectors.forEach(selector => ($(selector).value = ''));

export const $addEvent = ($element, eventType, listenser) =>
  $element.addEventListener(eventType, listenser);
