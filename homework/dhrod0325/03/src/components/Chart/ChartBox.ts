/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Country } from 'covid';
import { $ } from '@/lib/utils';
import { api } from '@/lib/Api';
import { AsyncComponent } from '@/lib/Component';
import { Chart } from 'chart.js';
import { createChartOption } from '@/components/Chart/ChartOption';

Chart.defaults.global.defaultFontColor = '#f5eaea';
Chart.defaults.global.defaultFontFamily = 'Exo 2';

export class ChartBox extends AsyncComponent {
  private readonly VIEW_DATE_COUNT = -14;

  private $container = $('#lineChart') as HTMLCanvasElement;

  private chart?: Chart;
  private countries: Country[] = [];

  prepareAsync() {
    //
  }

  public async loadDataAsync(selectedId: string) {
    this.destroy();

    await this.initCountries(selectedId);

    this.create();
  }

  private async initCountries(selectedId: string) {
    const countries = await api().getConfirmedCountries(selectedId);
    this.countries = [...countries].slice(this.VIEW_DATE_COUNT);
  }

  private destroy() {
    this.chart && this.chart.destroy();
  }

  private create() {
    const ctx = this.$container.getContext('2d');

    if (!ctx) throw new Error('chart create fail');

    const option = createChartOption(this.countries);

    this.chart = new Chart(ctx, option);
  }
}
