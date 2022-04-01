import { SummaryInfo } from 'covid';

import { RecoveredList } from './RecoveredList';
import { RecoveredTotal } from './RecoveredTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '@/components/Helper/DefaultSpinner';
import { LoadingComponent } from '@/lib/Component';

export class RecoveredTotalList extends LoadingComponent {
  private readonly SPINNER_ID = 'recovered-spinner';

  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    super();

    this.$total = new RecoveredTotal('.recovered');
    this.$list = new RecoveredList('.recovered-list');
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
      const data = await api().getRecovered(selectedId);

      this.$list.setItems(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
