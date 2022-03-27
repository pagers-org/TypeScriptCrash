import { Country, Summary } from '../../types';
import { $, calcTotalCountData } from '../../lib/utils';

export class RecoveredTotal {
  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.recovered');
  }

  loadData(data: Summary) {
    const TotalRecovered = calcTotalCountData(data, 'TotalRecovered');
    this.setHtml(String(TotalRecovered));
  }

  public setHtml(count: number | string) {
    this.$container.innerText = String(count);
  }

  public setHtmlByFirstCountry(data?: Country[]) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
