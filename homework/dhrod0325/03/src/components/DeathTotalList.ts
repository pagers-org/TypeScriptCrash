import { Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';
import { useSpinner } from '../lib/Spinner';
import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';

export class DeathTotalList implements Component {
  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    this.$total = new DeathTotal();
    this.$list = new DeathList();
  }

  setup(data: Summary): void {
    this.$total.loadData(data);
  }

  public async loadData(selectedId: string | undefined) {
    this.$list.clear();

    await useSpinner(this.$list.$container, 'deaths-spinner', async () => {
      const deathResponse = await api.fetchCountryInfo(selectedId, 'deaths');

      this.$list.loadData(deathResponse);
      this.$total.setHtmlByFirstCountry(deathResponse);
    });
  }
}
