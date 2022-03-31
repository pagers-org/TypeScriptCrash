declare module 'Covid' {
  export interface SystemErrorInterface {
    code: string;
    message: string;
  }

  export type SummaryType = {
    Countries: CountriesSummaryType[];
    Date: string;
    Global: object;
    ID: string;
    Message: string;
  };

  type FullCountriesObjType = {
    Country: string;
    CountryCode: string;
    Date: string;
    ID: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: object;
    Slug: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  };

  type NoNeedCountriesKey =
    | 'CountryCode'
    | 'ID'
    | 'NewConfirmed'
    | 'NewDeaths'
    | 'NewRecovered'
    | 'Premium';

  type CountriesSummaryType = Omit<FullCountriesObjType, NoNeedCountriesKey>;

  type NeedCountryKey = 'Cases' | 'City' | 'Date';

  type CountryDetail = {
    Cases: string;
    City: string;
    CityCode: string;
    Country: string;
    CountryCode: string;
    Date: string;
    Lat: string;
    Lon: string;
    Province: string;
    Status: string;
  };

  export type TotalType = 'TotalConfirmed' | 'TotalDeaths' | 'TotalRecovered';
  export type PickCountriesDetailType = Pick<CountryDetail, NeedCountryKey>;
}
