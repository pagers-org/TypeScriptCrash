import { $ } from '../lib/utils';
import { Country } from '../types';

export class RecoveredTotal {
  private readonly $recoveredTotal: HTMLElement;

  constructor() {
    this.$recoveredTotal = $('.recovered');
  }

  public setTotalHtml(count: number | string) {
    this.$recoveredTotal.innerText = String(count);
  }

  public setTotalRecoveredByWorld(count: string) {
    this.setTotalHtml(count);
  }

  public setTotalRecoveredByCountry(data?: Country[]) {
    if (!data) return;
    this.setTotalRecoveredByWorld(data[0].Cases);
  }
}
