import { Country, SummaryInfo } from 'covid';
import { BaseComponent } from '@/lib/BaseComponent';

export class RecoveredTotal extends BaseComponent {
  public loadData(data: SummaryInfo): void {
    this.setHtml(`${data.TotalRecovered}`);
  }

  public setHtml(count: string): void {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]): void {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
