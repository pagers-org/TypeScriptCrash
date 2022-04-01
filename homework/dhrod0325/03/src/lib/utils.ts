import { Country, Summary, SummaryInfo, TotalCounterProp } from 'covid';

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

export function sortedCountriesByTotalConfirmed(data: Country[]): Country[] {
  return [...data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)];
}

export function sortedCountriesByDate(data: Country[]): Country[] {
  return [...data.sort((a, b) => getDateTimeDiff(a.Date, b.Date))];
}

export function createSummaryInfo(summary: Summary): SummaryInfo {
  function calcTotalCountData(data: Summary, prop: TotalCounterProp): number {
    return data.Countries.reduce((total, current) => total + current[prop], 0);
  }

  function totalConfirmed(data: Summary) {
    return calcTotalCountData(data, 'TotalConfirmed');
  }

  function totalRecovered(data: Summary) {
    return calcTotalCountData(data, 'TotalRecovered');
  }

  function totalDeaths(data: Summary) {
    return calcTotalCountData(data, 'TotalDeaths');
  }

  const summaryInfo = { ...summary } as SummaryInfo;

  summaryInfo.TotalConfirmed = totalConfirmed(summary);
  summaryInfo.TotalRecovered = totalRecovered(summary);
  summaryInfo.TotalDeaths = totalDeaths(summary);

  return summaryInfo;
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
