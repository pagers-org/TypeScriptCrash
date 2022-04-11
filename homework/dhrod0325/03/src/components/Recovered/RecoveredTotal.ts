import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class RecoveredTotal extends BaseComponent {
  public loadData(summary: SummaryWrapper): void {
    this.setHtml(`${summary.getTotalRecovered()}`);
  }

  public setHtmlByFirstCountry(countries?: Country[]): void {
    if (!countries) return;

    this.setHtml(countries[0].Cases);
  }
}
