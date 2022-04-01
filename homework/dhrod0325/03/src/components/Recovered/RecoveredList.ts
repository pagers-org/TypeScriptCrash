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
  public setItems(data?: Country[]): void {
    if (!data) return;

    const countries = new CountriesWrapper(data);
    countries.getSortedByDate().forEach(value => this.addItem(value));
  }

  public clear(): void {
    this.$container.innerHTML = '';
  }

  public addItem(value: Country): void {
    const child = template(value);

    this.$container.appendChild(child);
  }
}
