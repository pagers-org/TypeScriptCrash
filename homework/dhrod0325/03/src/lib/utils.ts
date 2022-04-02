export function $<Elem extends Element>(selector: string): Elem | null {
  const $el = document.querySelector(selector);
  if (!$el) throw new Error('null element');
  return $el as Elem;
}

export function getDateTime(date: number | string | Date): number {
  return new Date(date).getTime();
}

export function getDateString(date: Date): string {
  return new Date(date).toLocaleString();
}

export function getDateTimeDiff(a: Date, b: Date): number {
  return getDateTime(b) - getDateTime(a);
}

export function createElement(html: string): HTMLElement {
  const f = document.createElement('template');
  f.innerHTML = html;
  return f.content.firstElementChild as HTMLElement;
}
