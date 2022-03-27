import { Country, Summary } from '../types';

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
    status: string,
  ): Promise<Country[] | undefined> {
    if (!countryCode) return undefined;

    const response = await fetch(
      `${API_COUNTRY_URL}/${countryCode}/status/${status}`,
    );

    return await response.json();
  }

  return {
    fetchCountryInfo,
    fetchCovidSummary,
  };
};

export const api = Api();
