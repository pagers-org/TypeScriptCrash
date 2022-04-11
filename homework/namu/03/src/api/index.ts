import { COVID_API_BASE_URL } from "../constants";
import { SummaryObject } from "../types";

// api
export async function fetchCovidSummary(): Promise<SummaryObject> {
  const response = await fetch(`${COVID_API_BASE_URL}/summary`);
  const result = await response.json();
  return result;
}

export async function fetchCountryInfo(
  countryCode: string | undefined,
  status: string
) {
  if (!countryCode) alert("Error with CountryCode");
  const response = await fetch(
    `${COVID_API_BASE_URL}/country/${countryCode}/status/${status}`
  );
  const result = await response.json();
  return result;
}
