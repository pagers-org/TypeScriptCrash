import { Country, CountryTotalCounterProp, Summary } from '../types';

export function $(selector: string): HTMLElement {
  return <HTMLElement>document.querySelector(selector);
}

export function getDateTime(date: number | string | Date) {
  return new Date(date).getTime();
}

export function getDateString(date: Date) {
  return new Date(date).toLocaleString();
}

export function timeDiff(a: Date, b: Date) {
  return getDateTime(b) - getDateTime(a);
}

export function calcTotalCountData(
  data: Summary,
  prop: CountryTotalCounterProp,
) {
  return data.Countries.reduce((total, current) => total + current[prop], 0);
}

export function findClickedId(event: Event): string | undefined {
  let selectedId!: string | undefined;

  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement?.id;
  }

  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }

  return selectedId;
}

export function sortedData(data: Country[]): Country[] {
  return data.sort((a, b) => timeDiff(a.Date, b.Date));
}
