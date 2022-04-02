import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '../Helper/DefaultSpinner';
import { AsyncComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class DeathTotalList extends AsyncComponent {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    super();

    this.$total = new DeathTotal('.deaths');
    this.$list = new DeathList('.deaths-list');
  }

  public setup(data: SummaryWrapper): void {
    this.$total.loadData(data);
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
      const data = await api().getDeaths(selectedId);

      this.$list.loadData(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
