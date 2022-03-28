declare module 'Covid' {
  export enum Status {
    Confirmed = 'confirmed',
    Deaths = 'deaths',
    Recovered = 'recovered',
  }

  export interface CountryStatus {
    Country: Country;
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Cases: number;
    Status: Status;
    Date: Date;
  }

  export interface CovidSummary {
    ID: string;
    Message: string;
    Global: Global;
    Countries: Country[];
    Date: Date;
  }

  export interface Country {
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
  }

  export interface Global {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
  }
}
