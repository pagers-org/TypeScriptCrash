import { Country } from 'covid';
import { DeathListItem } from '@/components/Death/DeathListItem';
import { BaseComponent } from '@/lib/Component';
import { CountriesWrapper } from '@/@model/CountriesWrapper';

export class DeathList extends BaseComponent {
  public async loadData(countries?: Country[]) {
    if (!countries) return;

    const countriesWrapper = new CountriesWrapper(countries);

    countriesWrapper
      .getSortedByDate()
      .forEach(country => this.addItem(country));
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
