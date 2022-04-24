export const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error("null");
  return element;
};

export const $all = (selector: string) => document.querySelectorAll(selector);

export const toggleLoading = () => $(".loading")?.classList.toggle("hidden");
