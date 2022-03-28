import { $, sortedData } from '@/lib/utils';
import { Country } from '@/types';
import { createDeathTotalListItem } from '@/lib/template';

export class DeathList {
  private readonly CONTAINER_SELECTOR = '.deaths-list';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public container() {
    return this.$container;
  }

  public clear(): void {
    this.$container.innerHTML = '';
  }

  public async loadData(data?: Country[]) {
    this.setItems(data);
  }

  private setItems(data?: Country[]): void {
    if (!data) return;

    sortedData(data).forEach(country => this.addItem(country));
  }

  private addItem(country: Country): void {
    const child = createDeathTotalListItem(country);

    this.$container.appendChild(child);
  }
}
