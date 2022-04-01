import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { SummaryInfo } from 'covid';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '../Helper/DefaultSpinner';
import { LoadingComponent } from '@/lib/Component';

export class DeathTotalList extends LoadingComponent {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    super();

    this.$total = new DeathTotal('.deaths');
    this.$list = new DeathList('.deaths-list');
  }

  public setup(data: SummaryInfo): void {
    this.$total.loadData(data);
  }

  public loadAsyncPrepare(): void {
    this.$list.clear();
  }

  public async loadAsyncData(selectedId: string) {
    const spinner = new DefaultSpinner(this.$list.$container, this.SPINNER_ID);
    await spinner.spin(async () => {
      const data = await api().getDeaths(selectedId);
      await this.$list.loadData(data);

      data && this.$total.setHtmlByFirstCountry(data);
    });
  }
}
