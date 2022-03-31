import { Country, Summary, SummaryInfo, TotalCounterProp } from 'covid';

export function $(selector: string): HTMLElement {
  const $el = document.querySelector(selector);

  if (!$el) throw new Error('null element');

  return $el as HTMLElement;
}

export function getDateTime(date: number | string | Date): number {
  return new Date(date).getTime();
}

export function getDateString(date: Date): string {
  return new Date(date).toLocaleString();
}

export function timeDiff(a: Date, b: Date): number {
  return getDateTime(b) - getDateTime(a);
}

export function getIdByEventTarget(event: Event): string | undefined {
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    return event.target.parentElement?.id;
  }

  if (event.target instanceof HTMLLIElement) {
    return event.target.id;
  }

  return undefined;
}

export function sortedCountriesByTotalConfirmed(data: Country[]): Country[] {
  return [...data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)];
}

export function sortedCountriesByDate(data: Country[]): Country[] {
  return [...data.sort((a, b) => timeDiff(a.Date, b.Date))];
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
