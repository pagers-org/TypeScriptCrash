import { Country, Summary } from '../../types';
import { $, calcTotalDeaths } from '../../lib/utils';

export class DeathTotal {
  private readonly CONTAINER_SELECTOR = '.deaths';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public loadData(data: Summary) {
    const count = calcTotalDeaths(data);
    this.setHtml(String(count));
  }

  public setHtml(count: string) {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
