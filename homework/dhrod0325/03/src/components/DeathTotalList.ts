import {
  $,
  calcTotalCountData,
  createSpinnerElement,
  getUnixTimestamp,
  sortByTimeStamp,
} from '../lib/utils';
import { Country, Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';
import { createDeathTotalListItem } from '../lib/template';

export class DeathTotalList implements Component {
  private readonly $deathsTotal: HTMLElement;
  private readonly $deathsList: HTMLElement;
  private readonly $deathSpinner: HTMLElement;

  constructor() {
    this.$deathsTotal = $('.deaths');

    this.$deathsList = $('.deaths-list');

    this.$deathSpinner = createSpinnerElement('deaths-spinner');
  }

  setup(data: Summary): void {
    const count = calcTotalCountData(data, 'TotalDeaths');
    this.setTotalDeathsByWorld(String(count));
  }

  public async loadData(selectedId: string | undefined) {
    this.clearDeathList();

    this.startLoadingAnimation();

    const deathResponse = await api.fetchCountryInfo(selectedId, 'deaths');

    this.setDeathsList(deathResponse);

    this.setTotalDeathsByCountry(deathResponse);

    this.endLoadingAnimation();
  }

  private startLoadingAnimation() {
    this.$deathsList.appendChild(this.$deathSpinner);
  }

  private endLoadingAnimation() {
    this.$deathsList.removeChild(this.$deathSpinner);
  }

  private clearDeathList() {
    this.$deathsList.innerHTML = '';
  }

  private setTotalDeathsByWorld(count: string) {
    this.$deathsTotal.innerText = count;
  }

  private setDeathsList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort((a, b) => sortByTimeStamp(a.Date, b.Date));

    sorted.forEach(country => {
      this.$deathsList.appendChild(createDeathTotalListItem(country));
    });
  }

  private setTotalDeathsByCountry(data?: Country[]) {
    if (!data) return;

    this.setTotalDeathsByWorld(data[0].Cases);
  }
}
