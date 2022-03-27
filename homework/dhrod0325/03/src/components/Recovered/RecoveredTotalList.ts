import { RecoveredList } from './RecoveredList';
import { Component } from '../../interfaces';
import { RecoveredTotal } from './RecoveredTotal';
import { Summary } from '../../types';
import { useSpinner } from '../../lib/Spinner';
import { api } from '../../lib/api';

export class RecoveredTotalList implements Component {
  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    this.$total = new RecoveredTotal();
    this.$list = new RecoveredList();
  }

  setup(data: Summary): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string | undefined) {
    this.$list.clear();

    await useSpinner(this.$list.$container, 'recovered-spinner', async () => {
      const data = await api.fetchCountryInfo(selectedId, 'recovered');

      this.$list.setItems(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
