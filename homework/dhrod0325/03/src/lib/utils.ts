export function $<Elem extends Element>(selector: string): Elem | null {
  const $el = document.querySelector(selector);

  if (!$el) throw new Error('null element');

  return $el as Elem;
}

export function getIdByEventTarget(event: Event): string {
  const { target } = event;

  const isParagraphElement = target instanceof HTMLParagraphElement;
  const isSpanElement = target instanceof HTMLSpanElement;

  if (isParagraphElement || isSpanElement) {
    const { parentElement } = target;
    return parentElement ? parentElement.id : '';
  }

  const isLiElement = target instanceof HTMLLIElement;

  return isLiElement ? target.id : '';
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

export function debounce(callback: () => void, timeout: number) {
  let debounce: any;

  return () => {
    if (debounce) clearTimeout(debounce);

    debounce = setTimeout(() => {
      callback();
    }, timeout);
  };
}

export function createElement(html: string): HTMLElement {
  const f = document.createElement('template');
  f.innerHTML = html;

  return f.content.firstElementChild as HTMLElement;
}
