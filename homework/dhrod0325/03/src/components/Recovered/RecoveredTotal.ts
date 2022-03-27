import { Country, Summary } from '../../types';
import { $, calcTotalRecovered } from '../../lib/utils';

export class RecoveredTotal {
  private readonly CONTAINER_SELECTOR = '.recovered';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public loadData(data: Summary): void {
    const count = calcTotalRecovered(data);

    this.setHtml(String(count));
  }

  public setHtml(count: string): void {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]): void {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
