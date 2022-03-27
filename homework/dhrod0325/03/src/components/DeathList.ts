import { $, sortByTimeStamp } from '../lib/utils';
import { Country } from '../types';
import { createDeathTotalListItem } from '../lib/template';

export class DeathList {
  readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.deaths-list');
  }

  public async loadData(data?: Country[]) {
    this.setDeathsList(data);
  }

  public clearDeathList() {
    this.$container.innerHTML = '';
  }

  private setDeathsList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort((a, b) => sortByTimeStamp(a.Date, b.Date));

    sorted.forEach(country => {
      this.$container.appendChild(createDeathTotalListItem(country));
    });
  }
}
