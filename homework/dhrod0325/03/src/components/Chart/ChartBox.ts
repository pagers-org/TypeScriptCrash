/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Country } from 'covid';
import { $, getDateString } from '@/lib/utils';
import { api } from '@/lib/Api';
import { AsyncComponent } from '@/lib/Component';

export class ChartBox extends AsyncComponent {
  private readonly VIEW_DATE_COUNT = -14;

  // @ts-ignore
  private chart;
  private $container: HTMLCanvasElement;
  private countries: Country[] = [];

  constructor() {
    super();

    // @ts-ignore
    Chart.defaults.global.defaultFontColor = '#f5eaea';
    // @ts-ignore
    Chart.defaults.global.defaultFontFamily = 'Exo 2';

    this.$container = $('#lineChart') as HTMLCanvasElement;
  }

  public async loadAsyncData(selectedId: string) {
    this.destroy();

    const countries = await api().getConfirmed(selectedId);

    this.countries = [...countries].slice(this.VIEW_DATE_COUNT);

    this.render();
  }

  private createData(): string[] {
    return this.countries.map(value => value.Cases);
  }

  private createLabel(): string[] {
    return this.countries.map(value => getDateString(value.Date).slice(5, -1));
  }

  private destroy() {
    this.chart && this.chart.destroy();
  }

  private createChartOption() {
    const data = this.createData();
    const labels = this.createLabel();

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

  private createChart() {
    const ctx = this.$container.getContext('2d');
    const option = this.createChartOption();
    // @ts-ignore
    this.chart = new Chart(ctx, option);
  }

  private render(): void {
    this.createChart();
  }
}
