import { $ } from '../lib/utils';
import { Country } from '../types';

export class RecoveredTotal {
  private readonly $recoveredTotal: HTMLElement;

  constructor() {
    this.$recoveredTotal = $('.recovered');
  }

  public setHtml(count: number | string) {
    this.$recoveredTotal.innerText = String(count);
  }

  public setByCountry(data?: Country[]) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
