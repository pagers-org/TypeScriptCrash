import axios from 'axios';
import { CountryInfoStatus } from '../types';

const api = axios.create({
  baseURL: 'https://api.covid19api.com/',
});

const fetchData = async <T>(path: string, params?: T) => {
  try {
    const result = await api.get(path, params);
    return result.data;
  } catch (error) {
    return alert(error);
  }
};

export async function fetchCovidSummary<T>(): Promise<T> {
  return fetchData('/summuary');
}

export async function fetchCountryInfo<T>(
  countryCode: string,
  status: CountryInfoStatus,
): Promise<T> {
  return fetchData(`country/${countryCode}/status/${status}`);
}
