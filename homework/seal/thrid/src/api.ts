import axios from 'axios';
import { CountryStatus, GetCountryResponse, GetSummaryResponse } from './types';

const api = axios.create({
  baseURL: 'https://api.covid19api.com',
});

export async function fetchCovidSummary() {
  const response = await api.get<GetSummaryResponse>('/summary');

  return response.data;
}

export async function fetchCountryInfo(
  countryCode: string,
  status: CountryStatus,
) {
  const response = await api.get<GetCountryResponse[]>(
    `/country/${countryCode}/status/${status}`,
  );

  return response.data;
}
