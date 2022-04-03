import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '../Helper/DefaultSpinner';
import { AsyncComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class DeathTotalList extends AsyncComponent {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal = new DeathTotal('.deaths');
  private readonly $list: DeathList = new DeathList('.deaths-list');

  public setup(summary: SummaryWrapper): void {
    this.$total.loadData(summary);
  }

  public prepareAsync(): void {
    this.$list.clearHtml();
  }

  public async loadDataAsync(selectedId: string) {
    const spinner = new DefaultSpinner(
      this.$list.getContainer(),
      this.SPINNER_ID,
    );

    await spinner.spin(async () => {
      const countries = await api().getDeathCountries(selectedId);

      this.$list.loadData(countries);
      this.$total.setHtmlByFirstCountry(countries);
    });
  }
}
