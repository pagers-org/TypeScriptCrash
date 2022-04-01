/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Country } from 'covid';
import { $, getDateString } from '@/lib/utils';
import { api } from '@/lib/Api';
import { AsyncComponent } from '@/lib/Component';

export class ChartBox extends AsyncComponent {
  private readonly VIEW_DATE_COUNT = -14;

  // @ts-ignore
  private chart;

  public async loadAsyncData(selectedId: string) {
    const data = await api().getConfirmed(selectedId);

    if (data) {
      this.render(this.createData(data), this.createLabel(data));
    }
  }

  private viewDataList(data: Country[]) {
    return data.slice(this.VIEW_DATE_COUNT);
  }

  private createData(data: Country[]): string[] {
    const list = this.viewDataList(data);

    return list.map(value => value.Cases);
  }

  private createLabel(data: Country[]): string[] {
    const list = this.viewDataList(data);
    return list.map(value => getDateString(value.Date).slice(5, -1));
  }

  private render(data: string[], labels: string[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = ($('#lineChart') as HTMLCanvasElement).getContext('2d');

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
    });
  }
}
