import { $, calcTotalCountData } from '../lib/utils';
import { Country, Summary } from '../types';

export class DeathTotal {
  private $container: HTMLElement;

  constructor() {
    this.$container = $('.deaths');
  }

  loadData(data: Summary) {
    const count = calcTotalCountData(data, 'TotalDeaths');

    this.setTotalCount(String(count));
  }

  setTotalCount(count: string) {
    this.$container.innerText = count;
  }

  setByCountry(data?: Country[]) {
    if (!data) return;

    this.setTotalCount(data[0].Cases);
  }
}
