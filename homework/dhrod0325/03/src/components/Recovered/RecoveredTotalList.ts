import { RecoveredList } from './RecoveredList';
import { Component } from '@/interfaces';
import { RecoveredTotal } from './RecoveredTotal';
import { SummaryInfo } from '@/types';
import { api } from '@/lib/Api';
import { useSpinner } from '../Helper/Spinner';

export class RecoveredTotalList implements Component {
  private readonly SPINNER_ID = 'recovered-spinner';

  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    this.$total = new RecoveredTotal();
    this.$list = new RecoveredList();
  }

  public setup(data: SummaryInfo): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string) {
    this.$list.clear();

    await useSpinner(this.$list.container(), this.SPINNER_ID, async () => {
      const data = await api.getRecovered(selectedId);

      this.$list.setItems(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
