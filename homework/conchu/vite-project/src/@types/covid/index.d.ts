declare module 'Covid' {
  export type SummaryType = {
    Countries: Array<PickCountriesType>;
    Date: string;
    Global: object;
    ID: string;
    Message: string;
  };

  type PickCountriesType = Omit<
    CountriesObjectType,
    | 'CountryCode'
    | 'ID'
    | 'NewConfirmed'
    | 'NewDeaths'
    | 'NewRecovered'
    | 'Premium'
  >;

  type CountriesObjectType = {
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

  export type PickCountriesDetailType = Pick<
    CountryDetail,
    'Cases' | 'City' | 'Date'
  >;

  type CountryDetail = {
    Cases: number;
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
}
