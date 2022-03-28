import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { Component } from '@/interfaces';
import { SummaryInfo } from '@/types';
import { api } from '@/lib/Api';
import { useSpinner } from '../Helper/Spinner';

export class DeathTotalList implements Component {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    this.$total = new DeathTotal();
    this.$list = new DeathList();
  }

  public setup(data: SummaryInfo): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string) {
    this.$list.clear();

    await useSpinner(this.$list.container(), this.SPINNER_ID, async () => {
      const data = await api.getDeaths(selectedId);
      await this.$list.loadData(data);

      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
