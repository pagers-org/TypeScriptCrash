import { ApiCountryInfoType, Country, Summary } from 'covid';
import { HttpClient } from './HttpClient';

const API_BASE_URL = 'https://api.covid19api.com';

const API_SUMMARY_URL = `${API_BASE_URL}/summary`;
const API_COUNTRY_URL = `${API_BASE_URL}/country`;

export class Api {
  private httpClient: HttpClient = new HttpClient();

  private async getCountryInfo(
    countryCode: string,
    status: ApiCountryInfoType,
  ): Promise<Country[]> {
    if (!countryCode) throw new Error('require countryCode');

    return await this.httpClient.get({
      url: `${API_COUNTRY_URL}/${countryCode}/status/${status}`,
    });
  }

  public async getSummary(): Promise<Summary> {
    return await this.httpClient.get({
      url: API_SUMMARY_URL,
    });
  }

  public async getConfirmedCountries(countryCode: string) {
    return await this.getCountryInfo(countryCode, 'confirmed');
  }

  public async getDeathCountries(countryCode: string) {
    return await this.getCountryInfo(countryCode, 'deaths');
  }

  public async getRecoveredCountries(countryCode: string) {
    return await this.getCountryInfo(countryCode, 'recovered');
  }

  public async getCovidSummary() {
    return await this.getSummary();
  }
}

export const api = () => new Api();
