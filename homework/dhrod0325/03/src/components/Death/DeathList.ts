import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { CountriesWrapper } from '@/@model/CountriesWrapper';
import { createElement, getDateString } from '@/lib/utils';

const template = (country: Country) => {
  return createElement(`
          <li class="list-item-b flex align-center">
            <span class="deaths">${country.Cases}</span>
            <p>${getDateString(country.Date).slice(0, -3)}</p>
          </li>
        `);
};

export class DeathList extends BaseComponent {
  public loadData(countries?: Country[]) {
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
    this.$container.appendChild(template(country));
  }
}
