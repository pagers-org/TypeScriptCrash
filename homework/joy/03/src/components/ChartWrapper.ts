import { $ } from '@/utils/utils';
import { CountryInfo } from '@/types/type';

export class ChartWrapper {
  private readonly temp = -14;

  public setChartData(data: CountryInfo[]) {
    console.log(data);
    const chartData = data.slice(this.temp).map(value => value.Cases);
    const chartLabel = data
      .slice(this.temp)
      .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));

    this.renderChart(chartData, chartLabel);
  }

  private renderChart(data: string[], labels: string[]) {
    const ctx = $<HTMLCanvasElement>('#lineChart').getContext('2d');

    // @ts-ignore
    Chart.defaults.global.defaultFontColor = '#f5eaea';
    // @ts-ignore
    Chart.defaults.global.defaultFontFamily = 'Exo 2';
    // @ts-ignore
    new Chart(ctx, {
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
      options: {},
    });
  }
}
