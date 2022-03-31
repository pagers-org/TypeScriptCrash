import { Component, SummaryInfo } from 'covid';

import { RecoveredList } from './RecoveredList';
import { RecoveredTotal } from './RecoveredTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '@/components/Helper/DefaultSpinner';

export class RecoveredTotalList implements Component {
  private readonly SPINNER_ID = 'recovered-spinner';

  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    this.$total = new RecoveredTotal('.recovered');
    this.$list = new RecoveredList('.recovered-list');
  }

  public setup(data: SummaryInfo): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string) {
    this.$list.clear();

    const spinner = new DefaultSpinner(this.$list.$container, this.SPINNER_ID);
    await spinner.spin(async () => {
      const data = await api.getRecovered(selectedId);

      this.$list.setItems(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
