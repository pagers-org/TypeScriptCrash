import { elementTable } from '../constant';
import {
  TotalType,
  SummaryType,
  PickCountriesDetailType,
  CountriesSummaryType,
} from 'Covid';

export function getUnixTimestamp(date: string) {
  return new Date(date).getTime();
}

export function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
}

function setInnerText(key: TotalType, result: string) {
  return (elementTable[key].innerText = result || '');
}
export function getTotal(data: SummaryType, key: TotalType) {
  const result = data.Countries.reduce(
    (acc, curr) => (acc += curr[key]),
    0,
  ).toLocaleString();
  return setInnerText(key, result);
}
//.. 일단 빼놓음 나중에 수정
function sortDate(
  data: PickCountriesDetailType[] | SummaryType,
  isSummary = false,
): CountriesSummaryType[] | PickCountriesDetailType[] {
  if (!isSummary) {
    data = data as PickCountriesDetailType[];
    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    return sorted;
  }
  data = data as SummaryType;
  const sorted = data.Countries.sort(
    (a, b) => b.TotalConfirmed - a.TotalConfirmed,
  );
  return sorted;
}
