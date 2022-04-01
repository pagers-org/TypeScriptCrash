import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { createElement } from '@/lib/utils';
import { CountriesWrapper } from '@/@model/CountriesWrapper';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export const template = (value: Country): Element => {
  return createElement(`
  <li class="list-item flex align-center" id="${value.Slug}">
    <span class="cases">${value.TotalConfirmed}</span>
    <p class="country">${value.Country}</p>
  </li>
`);
};

export class RankList extends BaseComponent {
  public static readonly CLICK_EVENT = 'RankList.CLICK_EVENT';

  public setup(summary: SummaryWrapper): void {
    this.$container.addEventListener('click', e => {
      window.dispatchEvent(
        new CustomEvent(RankList.CLICK_EVENT, { detail: e }),
      );
    });

    this.addItemsByTotalConfirmed(summary);
  }

  private addItemsByTotalConfirmed(data: SummaryWrapper): void {
    const countries = new CountriesWrapper(data.summary.Countries);
    countries.getSortedByTotalConfirmed().forEach(value => this.addItem(value));
  }

  private addItem(value: Country): void {
    this.$container.appendChild(template(value));
  }
}
