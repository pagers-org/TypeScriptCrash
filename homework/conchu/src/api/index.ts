import axios from 'axios';
import { SystemErrorInterface } from 'Covid';
import { BASE_URL } from '../constant';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

const fetchData = async (path: string) => {
  try {
    const result = await api.get(path);
    return result.data;
  } catch (error) {
    const err = error as SystemErrorInterface;
    return alert(err.message);
  }
};

export async function fetchCovidSummary<T>(): Promise<T> {
  return fetchData('summary');
}

export async function fetchCountryInfo<T>(
  countryCode: string,
  status: string,
): Promise<T> {
  return fetchData(`country/${countryCode}/status/${status}`);
}
