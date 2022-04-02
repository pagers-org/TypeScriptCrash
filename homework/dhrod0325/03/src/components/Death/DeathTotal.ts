import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class DeathTotal extends BaseComponent {
  public loadData(summary: SummaryWrapper) {
    this.setHtml(`${summary.getTotalDeaths()}`);
  }

  public setHtmlByFirstCountry(countries: Country[] | undefined) {
    countries && this.setHtml(countries[0].Cases);
  }
}
