/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Country } from 'covid';
import { $, getDateString } from '@/lib/utils';
import { api } from '@/lib/Api';
import { AsyncComponent } from '@/lib/Component';
import { Chart } from 'chart.js';

export class ChartBox extends AsyncComponent {
  private readonly VIEW_DATE_COUNT = -14;

  private chart?: Chart;

  private $container: HTMLCanvasElement;
  private countries: Country[] = [];

  constructor() {
    super();

    Chart.defaults.global.defaultFontColor = '#f5eaea';
    Chart.defaults.global.defaultFontFamily = 'Exo 2';

    this.$container = $('#lineChart') as HTMLCanvasElement;
  }

  public async loadAsyncData(selectedId: string) {
    this.destroy();

    await this.initCountries(selectedId);

    this.create();
  }

  private async initCountries(selectedId: string) {
    const countries = await api().getConfirmed(selectedId);
    this.countries = [...countries].slice(this.VIEW_DATE_COUNT);
  }

  private createChartData(): number[] {
    return this.countries.map(value => +value.Cases);
  }

  private createChartLabel(): string[] {
    return this.countries.map(value => getDateString(value.Date).slice(5, -1));
  }

  private createChartOption(): Chart.ChartConfiguration {
    const data = this.createChartData();
    const labels = this.createChartLabel();

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

  private destroy() {
    this.chart && this.chart.destroy();
  }

  private create() {
    const ctx = this.$container.getContext('2d');

    if (!ctx) throw new Error('chart create fail');

    const option = this.createChartOption();

    this.chart = new Chart(ctx, option);
  }
}
