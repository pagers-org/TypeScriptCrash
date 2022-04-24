const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
};

const $all = (selector: string) => document.querySelectorAll(selector);

const toggleLoading = () => $('.loading').classList.toggle('hidden');

export { $, $all, toggleLoading };
