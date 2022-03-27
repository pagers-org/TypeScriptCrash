import { Country } from '../../types';
import { $, sortedData } from '../../lib/utils';
import { createRecoveredListItem } from '../../lib/template';

export class RecoveredList {
  readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.recovered-list');
  }

  setItems(data?: Country[]) {
    if (!data) return;

    const sorted = sortedData(data);

    sorted.forEach(value => {
      this.$container.appendChild(createRecoveredListItem(value));
    });
  }

  clear() {
    this.$container.innerHTML = '';
  }
}
