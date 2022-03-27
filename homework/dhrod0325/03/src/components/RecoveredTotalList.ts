import { calcTotalCountData } from '../lib/utils';
import { Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';
import { RecoveredTotal } from './RecoveredTotal';
import { useSpinner } from '../lib/Spinner';
import { RecoveredList } from './RecoveredList';

export class RecoveredTotalList implements Component {
  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    this.$total = new RecoveredTotal();
    this.$list = new RecoveredList();
  }

  setup(data: Summary): void {
    const TotalRecovered = calcTotalCountData(data, 'TotalRecovered');
    this.$total.setHtml(String(TotalRecovered));
  }

  public async loadData(selectedId: string | undefined) {
    this.$list.clear();

    await useSpinner(this.$list.$container, 'recovered-spinner', async () => {
      const recoveredResponse = await api.fetchCountryInfo(
        selectedId,
        'recovered',
      );

      this.$list.setItems(recoveredResponse);
      this.$total.setByCountry(recoveredResponse);
    });
  }
}
