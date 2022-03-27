export type Summary = {
  ID: string;
  Message: string;
  Global: Global;
  Countries: Country[];
  Date: Date;
};

export type Country = {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Cases: string;
};

export type CountryTotalCounterProp =
  | 'TotalDeaths'
  | 'TotalConfirmed'
  | 'TotalRecovered';

export type Global = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
};

export const totalDataTypes = [
  'TotalDeaths',
  'TotalConfirmed',
  'TotalRecovered',
];
