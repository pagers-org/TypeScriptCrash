import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class DeathTotal extends BaseComponent {
  public loadData(summaryWrapper: SummaryWrapper) {
    this.setHtml(`${summaryWrapper.getTotalDeaths()}`);
  }

  public setHtmlByFirstCountry(data: Country[] | undefined) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
