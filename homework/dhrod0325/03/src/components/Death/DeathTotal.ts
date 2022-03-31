import { Country, SummaryInfo } from 'covid';
import { BaseComponent } from '@/lib/BaseComponent';

export class DeathTotal extends BaseComponent {
  public loadData(data: SummaryInfo) {
    this.setHtml(`${data.TotalDeaths}`);
  }

  public setHtml(count: string) {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
