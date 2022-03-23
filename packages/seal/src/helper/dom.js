export const $ = selector => document.querySelector(selector);

export const $all = selector => document.querySelectorAll(selector);

export const toggleLoading = () => $('.loading').classList.toggle('hidden');

export const setDisplay = (element, display) =>
  (element.style.display = display);
