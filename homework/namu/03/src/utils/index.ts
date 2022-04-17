// utils
export const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error("null");
  return element;
};

export function getUnixTimestamp(date: string | number | Date) {
  return new Date(date).getTime();
}
