import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class RecoveredTotal extends BaseComponent {
  public loadData(data: SummaryWrapper): void {
    this.setHtml(`${data.getTotalRecovered()}`);
  }

  public setHtmlByFirstCountry(data?: Country[]): void {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
