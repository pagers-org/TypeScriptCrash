import { $, calcTotalCountData } from '../lib/utils';
import { Component } from '../interfaces';
import { Summary } from '../types';

export class ConfirmedTotal implements Component {
  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.confirmed-total');
  }

  setup(data: Summary): void {
    const count = calcTotalCountData(data, 'TotalConfirmed');
    this.setTotal(String(count));
  }

  private setTotal(count: string) {
    this.$container.innerText = count;
  }
}
