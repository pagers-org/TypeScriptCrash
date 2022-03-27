import { $, calcTotalCountData, sortByTimeStamp } from '../lib/utils';
import { Country, Summary } from '../types';
import { api } from '../lib/api';
import { Component } from '../interfaces';
import { RecoveredSpinner } from './RecoveredSpinner';
import { RecoveredTotal } from './RecoveredTotal';
import { createRecoveredListItem } from '../lib/template';

export class RecoveredList implements Component {
  private readonly $recoveredList: HTMLElement;

  private readonly $spinner: RecoveredSpinner;

  private readonly $total: RecoveredTotal;

  constructor() {
    this.$recoveredList = $('.recovered-list');

    this.$spinner = new RecoveredSpinner(this.$recoveredList);

    this.$total = new RecoveredTotal();
  }

  setup(data: Summary): void {
    const TotalRecovered = calcTotalCountData(data, 'TotalRecovered');
    this.setTotalRecoveredByWorld(String(TotalRecovered));
  }

  public async loadData(selectedId: string | undefined) {
    this.clearRecoveredList();

    this.startLoadingAnimation();

    const recoveredResponse = await api.fetchCountryInfo(
      selectedId,
      'recovered',
    );

    this.setRecoveredList(recoveredResponse);
    this.setTotalRecoveredByCountry(recoveredResponse);

    this.endLoadingAnimation();
  }

  private setRecoveredList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort((a, b) => sortByTimeStamp(b.Date, a.Date));

    sorted.forEach(value => {
      this.$recoveredList.appendChild(createRecoveredListItem(value));
    });
  }

  private startLoadingAnimation() {
    this.$spinner.show();
  }

  private endLoadingAnimation() {
    this.$spinner.hide();
  }

  private clearRecoveredList() {
    this.$recoveredList.innerHTML = '';
  }

  private setTotalRecoveredByWorld(count: string) {
    this.$total.setTotalHtml(count);
  }

  private setTotalRecoveredByCountry(data?: Country[]) {
    if (!data) return;

    this.setTotalRecoveredByWorld(data[0].Cases);
  }
}
