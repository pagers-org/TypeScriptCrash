export type CountryInfoStatus = 'deaths' | 'recovered' | 'confirmed';

// summary api 전용
export type Summary = {
  ID: string;
  Message: string;
  Global: Global;
  Countries: CountriesInfo[];
  Date: Date;
};
// country/${countryCode}/status/${status} api 전용
export type CountryInfo = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: string;
  Status: string;
  Date: Date;
};

type Global = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
};
export type CountriesInfo = {
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
  Premium: {};
};