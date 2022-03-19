export const $ = (selector: string) => document.querySelector(selector);

export const $all = (selector: string) => document.querySelectorAll(selector);

export const toggleLoading = () => $(".loading")?.classList.toggle("hidden");
