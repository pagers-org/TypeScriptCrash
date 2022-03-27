import { $, sortByTimeStamp } from '../lib/utils';
import { Country } from '../types';
import { createRecoveredListItem } from '../lib/template';

export class RecoveredList {
  readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.recovered-list');
  }

  setRecoveredList(data?: Country[]) {
    if (!data) return;

    const sorted = data.sort((a, b) => sortByTimeStamp(b.Date, a.Date));

    sorted.forEach(value => {
      this.$container.appendChild(createRecoveredListItem(value));
    });
  }

  clearRecoveredList() {
    this.$container.innerHTML = '';
  }
}
