import { TotalType } from 'Covid';
import { $ } from './utils/common';

export const BASE_URL = 'https://api.covid19api.com/';

export const COUNTRY = {
  USA: '데이터가 많아 총괄 현황은 제공하지 않아요😭',
};

export const PEOPLE_STATUS = {
  DEATHS: 'deaths',
  RECOVERED: 'recovered',
  CONFIRMED: 'confirmed',
};

// 이런 경우 ElementTable을 type파일로 가져가는게 좋을까요? 여기에 있는게 좋을까요?
export type ElementTable = Record<TotalType, HTMLElement>;

export const elementTable: ElementTable = {
  TotalConfirmed: $('.confirmed-total'),
  TotalDeaths: $('.deaths'),
  TotalRecovered: $('.recovered'),
};
