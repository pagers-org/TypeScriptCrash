import { createElement, getDateString } from '@/lib/utils';
import { Country } from 'covid';

export class DeathListItem {
  private country: Country;

  constructor(country: Country) {
    this.country = country;
  }

  public getElement(): HTMLElement {
    return createElement(`
          <li class="list-item-b flex align-center">
            <span class="deaths">${this.country.Cases}</span>
            <p>${getDateString(this.country.Date).slice(0, -3)}</p>
          </li>
        `);
  }
}
