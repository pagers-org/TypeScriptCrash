import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { Component, SummaryInfo } from 'covid';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '../Helper/DefaultSpinner';

export class DeathTotalList implements Component {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    this.$total = new DeathTotal('.deaths');
    this.$list = new DeathList('.deaths-list');
  }

  public setup(data: SummaryInfo): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string) {
    this.$list.clear();

    const spinner = new DefaultSpinner(this.$list.$container, this.SPINNER_ID);
    await spinner.spin(async () => {
      const data = await api.getDeaths(selectedId);
      await this.$list.loadData(data);

      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
