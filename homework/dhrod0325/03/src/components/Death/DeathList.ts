import { Country } from 'covid';

import { sortedCountriesByDate } from '@/lib/utils';
import { DeathListItem } from '@/components/Death/DeathListItem';
import { BaseComponent } from '@/lib/Component';

export class DeathList extends BaseComponent {
  public async loadData(data?: Country[]) {
    if (!data) return;

    sortedCountriesByDate(data).forEach(country => this.addItem(country));
  }

  public clear() {
    this.$container.innerHTML = '';
  }

  private addItem(country: Country) {
    const deathListItem = new DeathListItem(country);
    const elem = deathListItem.getElement();

    this.$container.appendChild(elem);
  }
}
