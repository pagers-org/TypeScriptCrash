import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.covid19api.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

interface SystemErrorInterface {
  code: string;
  message: string;
}

const fetchData = async <T>(path: string, params?: T) => {
  try {
    const result = await api.get(path, params);
    return result.data;
  } catch (error) {
    const err = error as SystemErrorInterface;
    return alert(err.message);
  }
};

export async function fetchCovidSummary<T>(): Promise<T> {
  return fetchData('/summuary');
}

export async function fetchCountryInfo<T>(
  countryCode: string,
  status: string,
): Promise<T> {
  return fetchData(`country/${countryCode}/status/${status}`);
}
