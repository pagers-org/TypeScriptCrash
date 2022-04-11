import { Country } from 'covid';
import { getDateTimeDiff } from '@/lib/utils';

export class CountriesWrapper {
  private countries: Country[];

  constructor(countries: Country[]) {
    this.countries = countries;
  }

  public getSortedByDate(): Country[] {
    const sort = (a: Country, b: Country) => getDateTimeDiff(a.Date, b.Date);

    return [...this.countries.sort(sort)];
  }

  public getSortedByTotalConfirmed(): Country[] {
    const sort = (a: Country, b: Country) =>
      b.TotalConfirmed - a.TotalConfirmed;

    return [...this.countries.sort(sort)];
  }
}
