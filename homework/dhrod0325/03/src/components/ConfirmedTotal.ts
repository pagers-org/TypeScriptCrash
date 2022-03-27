import { $, calcTotalCountData } from '../lib/utils';
import { Component } from '../interfaces';
import { Summary } from '../types';

export class ConfirmedTotal implements Component {
  private readonly $confirmedTotal: HTMLElement;

  constructor() {
    this.$confirmedTotal = $('.confirmed-total');
  }

  setup(data: Summary): void {
    const count = calcTotalCountData(data, 'TotalConfirmed');
    this.setCountNumber(String(count));
  }

  private setCountNumber(count: string) {
    this.$confirmedTotal.innerText = count;
  }
}
