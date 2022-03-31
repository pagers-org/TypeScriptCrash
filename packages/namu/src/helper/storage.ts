export function setLocal(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocal(key: string) {
  return localStorage.getItem(key);
}
