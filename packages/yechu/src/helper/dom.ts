export const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
};

export const $all = <T extends HTMLElement>(
  selector: string,
): NodeListOf<T> => {
  const elements = document.querySelectorAll(selector) as NodeListOf<T>;
  if (elements === null) throw new Error('elements are null');
  return elements;
};

export const toggleLoading = (): boolean =>
  $('.loading').classList.toggle('hidden');

export const toggleForm = () => {
  $all<HTMLFormElement>('.forms').forEach(form => {
    form.classList.toggle('hidden');
  });
};
