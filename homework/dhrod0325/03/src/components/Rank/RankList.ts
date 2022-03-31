import { createRankListItem } from '@/lib/template';
import { Country, Summary } from 'covid';
import { BaseComponent } from '@/lib/BaseComponent';
import { sortedCountriesByTotalConfirmed } from '@/lib/utils';

export class RankList extends BaseComponent {
  public static readonly CLICK_EVENT = 'RankList.CLICK_EVENT';

  public setup(data: Summary): void {
    this.$container.addEventListener('click', e => {
      window.dispatchEvent(
        new CustomEvent(RankList.CLICK_EVENT, { detail: e }),
      );
    });

    this.addItemsByTotalConfirmed(data);
  }

  private addItemsByTotalConfirmed(data: Summary): void {
    sortedCountriesByTotalConfirmed(data.Countries).forEach(value =>
      this.addItem(value),
    );
  }

  private addItem(value: Country): void {
    this.$container.appendChild(createRankListItem(value));
  }
}
