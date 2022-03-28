export async function fetchCovidSummary() {
  const response = await fetch('https://api.covid19api.com/summary');
  const result = await response.json();
  return result;
}

export async function fetchCountryInfo(countryCode: any, status: any) {
  const response = await fetch(
    `https://api.covid19api.com/country/${countryCode}/status/${status}`,
  );
  const result = await response.json();
  return result;
}
