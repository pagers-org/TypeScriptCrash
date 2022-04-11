import { getDateString } from '@/lib/utils';
import { Chart } from 'chart.js';
import { Country } from 'covid';

class ChartOption {
  private countries: Country[] = [];

  constructor(countries: Country[]) {
    this.countries = countries;
  }

  private getData(): number[] {
    return this.countries.map(value => +value.Cases);
  }

  private getLabels(): string[] {
    return this.countries.map(value => getDateString(value.Date).slice(5, -1));
  }

  public createChartOption(): Chart.ChartConfiguration {
    const data = this.getData();
    const labels = this.getLabels();

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Confirmed for the last two weeks',
            backgroundColor: '#feb72b',
            borderColor: '#feb72b',
            data,
          },
        ],
      },
    };
  }
}

export const createChartOption = (countries: Country[]) =>
  new ChartOption(countries).createChartOption();
