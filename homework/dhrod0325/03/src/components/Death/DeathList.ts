import { Country } from 'covid';

import { sortedCountriesByDate } from '@/lib/utils';
import { DeathListItem } from '@/components/Death/DeathListItem';
import { BaseComponent } from '@/lib/BaseComponent';

export class DeathList extends BaseComponent {
  public clear() {
    this.$container.innerHTML = '';
  }

  public async loadData(data?: Country[]) {
    if (!data) return;

    sortedCountriesByDate(data).forEach(country => {
      const deathListItem = new DeathListItem(country);
      const elem = deathListItem.getElement();

      this.$container.appendChild(elem);
    });
  }
}
