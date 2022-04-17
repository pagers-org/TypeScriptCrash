import axios from 'axios';
import { CountryStatus } from 'Covid';

const api = axios.create({
  baseURL: 'https://api.covid19api.com/',
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
  },
});

export interface SystemErrorInterface {
  code: string;
  message: string;
}

export const makeFetch = async (path: string) => {
  try {
    const result = await api.get(path);
    return result.data;
  } catch (error) {
    const err = error as SystemErrorInterface;
    return alert(err.message);
  }
};

export async function fetchCovidSummary() {
  return makeFetch('summary');
}

export async function fetchCountryInfo(
  countryCode: string,
  status: string,
): Promise<CountryStatus[]> {
  return makeFetch(`country/${countryCode}/status/${status}`);
}
