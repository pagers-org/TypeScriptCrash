const BASE_URL = 'https://api.covid19api.com';
// api
export async function fetchCovidSummary<T>(): Promise<T> {
  const response = await fetch(`${BASE_URL}/summary`);
  const result = await response.json();
  return result;
}

export async function fetchCountryInfo<T>(
  countryCode: string | undefined,
  status: string,
): Promise<T> {
  const response = await fetch(
    `${BASE_URL}/country/${countryCode}/status/${status}`,
  );
  const result = await response.json();
  return result;
}
