import { Country } from 'covid';
import { createElement, getDateString } from '@/lib/utils';
import { BaseComponent } from '@/lib/Component';
import { CountriesWrapper } from '@/@model/CountriesWrapper';

const template = (value: Country): Element => {
  return createElement(`
  <li class="list-item-b flex align-center">
    <span class="recovered">${value.Cases}</span>
    <p>${getDateString(value.Date).slice(0, -3)}</p>
  </li>
`);
};

export class RecoveredList extends BaseComponent {
  public setItems(countries?: Country[]): void {
    if (!countries) return;

    const countriesWrapper = new CountriesWrapper(countries);
    countriesWrapper.getSortedByDate().forEach(value => this.addItem(value));
  }

  public clear(): void {
    this.$container.innerHTML = '';
  }

  public addItem(country: Country): void {
    this.$container.appendChild(template(country));
  }
}
