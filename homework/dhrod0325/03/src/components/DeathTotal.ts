import { $, calcTotalCountData } from '../lib/utils';
import { Country, Summary } from '../types';

export class DeathTotal {
  private $container: HTMLElement;

  constructor() {
    this.$container = $('.deaths');
  }

  loadData(data: Summary) {
    const count = calcTotalCountData(data, 'TotalDeaths');
    this.setHtml(String(count));
  }

  setHtml(count: string) {
    this.$container.innerText = count;
  }

  setHtmlByFirstCountry(data?: Country[]) {
    if (!data) return;
    this.setHtml(data[0].Cases);
  }
}
