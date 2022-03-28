import { Country, Summary, SummaryInfo, TotalCounterProp } from '@/types';

export function $(selector: string): HTMLElement {
  return <HTMLElement>document.querySelector(selector);
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
  const result = data.sort((a, b) => timeDiff(a.Date, b.Date));

  return [...result];
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
