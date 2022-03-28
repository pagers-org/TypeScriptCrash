/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Component } from '@/interfaces';
import { Country, SummaryInfo } from '@/types';
import { $, getDateString } from '@/lib/utils';
import { api } from '@/lib/Api';

export class ChartBox implements Component {
  private readonly VIEW_DATE_COUNT = -14;

  // @ts-ignore
  private chart;

  setup(data: SummaryInfo): void {
    //throw new Error('Method not implemented.');
  }

  public async loadData(selectedId: string) {
    const data = await api.getConfirmed(selectedId);

    if (data) this.render(this.createData(data), this.createLabel(data));
  }

  private filteredViewDateData(data: Country[]) {
    return data.slice(this.VIEW_DATE_COUNT);
  }

  private createData(data: Country[]): string[] {
    return this.filteredViewDateData(data).map(value => value.Cases);
  }

  private createLabel(data: Country[]) {
    return this.filteredViewDateData(data).map(value =>
      getDateString(value.Date).slice(5, -1),
    );
  }

  private render(data: string[], labels: string[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = (<HTMLCanvasElement>$('#lineChart')).getContext('2d');

    // @ts-ignore
    Chart.defaults.global.defaultFontColor = '#f5eaea';
    // @ts-ignore
    Chart.defaults.global.defaultFontFamily = 'Exo 2';

    // @ts-ignore
    this.chart = new Chart(ctx, {
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
