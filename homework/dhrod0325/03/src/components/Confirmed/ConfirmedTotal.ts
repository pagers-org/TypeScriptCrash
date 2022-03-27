import { Component } from '../../interfaces';
import { Summary } from '../../types';
import { $, calcTotalConfirmed } from '../../lib/utils';

export class ConfirmedTotal implements Component {
  private readonly CONTAINER_SELECTOR = '.confirmed-total';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public setup(data: Summary): void {
    const count = calcTotalConfirmed(data);
    this.setHtml(String(count));
  }

  private setHtml(count: string): void {
    this.$container.innerText = count;
  }
}
