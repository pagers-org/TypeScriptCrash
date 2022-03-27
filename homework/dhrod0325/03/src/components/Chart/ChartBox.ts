/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Component } from '../../interfaces';
import { Country, Summary } from '../../types';
import { api } from '../../lib/api';
import { $, getDateString } from '../../lib/utils';

export class ChartBox implements Component {
  setup(data: Summary): void {
    //throw new Error('Method not implemented.');
  }

  async loadData(selectedId: string | undefined) {
    const data = await api.fetchCountryInfo(selectedId, 'confirmed');

    if (data) {
      this.renderChart(this.getData(data), this.getLabel(data));
    }
  }

  private getData(data: Country[]): string[] {
    return data.slice(-14).map(value => value.Cases);
  }

  private getLabel(data: Country[]) {
    return data.slice(-14).map(value => getDateString(value.Date).slice(5, -1));
  }

  private renderChart(data: string[], labels: string[]) {
    const ctx = (<HTMLCanvasElement>$('#lineChart')).getContext('2d');

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
