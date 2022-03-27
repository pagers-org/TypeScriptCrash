import { ApiCountryInfoType, Country, Summary } from '../types';

const API_BASE_URL = 'https://api.covid19api.com';
const API_SUMMARY_URL = `${API_BASE_URL}/summary`;
const API_COUNTRY_URL = `${API_BASE_URL}/country`;

const Api = () => {
  // api
  async function fetchCovidSummary(): Promise<Summary> {
    const response = await fetch(API_SUMMARY_URL, {});
    return await response.json();
  }

  async function fetchCountryInfo(
    countryCode: string | undefined,
    status: ApiCountryInfoType,
  ): Promise<Country[] | undefined> {
    if (!countryCode) return undefined;

    const response = await fetch(
      `${API_COUNTRY_URL}/${countryCode}/status/${status}`,
    );

    return await response.json();
  }

  async function getConfirmed(selectedId: string) {
    return await fetchCountryInfo(selectedId, 'confirmed');
  }

  async function getDeaths(selectedId: string) {
    return await fetchCountryInfo(selectedId, 'deaths');
  }

  async function getRecovered(selectedId: string) {
    return await fetchCountryInfo(selectedId, 'recovered');
  }

  async function getCovidSummary() {
    return await fetchCovidSummary();
  }

  return { getCovidSummary, getRecovered, getDeaths, getConfirmed };
};

export const api = Api();
