export type Summary = {
  ID: string;
  Message: string;
  Global?: Global;
  Countries: Country[];
  Date: Date;
};

export interface SummaryInfo extends Summary {
  TotalConfirmed: number;
  TotalRecovered: number;
  TotalDeaths: number;
}

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

export type TotalCounterProp =
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

export type ApiCountryInfoType = 'confirmed' | 'deaths' | 'recovered';
