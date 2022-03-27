import { $, calcTotalCountData } from '../lib/utils';
import { Country, Summary } from '../types';

export class DeathTotal {
  private $container: HTMLElement;

  constructor() {
    this.$container = $('.deaths');
  }

  loadData(data: Summary) {
    const count = calcTotalCountData(data, 'TotalDeaths');
    this.setByWorld(String(count));
  }

  setByWorld(count: string) {
    this.$container.innerText = count;
  }

  setTotalDeathsByCountry(data?: Country[]) {
    if (!data) return;
    this.setByWorld(data[0].Cases);
  }
}
