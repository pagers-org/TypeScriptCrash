import { CountryTotalCounterProp, Summary } from '../types';

export function $(selector: string): HTMLElement {
  return <HTMLElement>document.querySelector(selector);
}

export function getUnixTimestamp(date: number | string | Date) {
  return new Date(date).getTime();
}

export function calcTotalCountData(
  data: Summary,
  prop: CountryTotalCounterProp,
) {
  return data.Countries.reduce((total, current) => total + current[prop], 0);
}

export function getDateString(date: Date) {
  return new Date(date).toLocaleString();
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

export function sortByTimeStamp(a: Date, b: Date) {
  return getUnixTimestamp(b) - getUnixTimestamp(a);
}
