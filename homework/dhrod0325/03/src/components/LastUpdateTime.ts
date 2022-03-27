import { $ } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';

export class LastUpdateTime implements Component {
  private readonly $lastUpdatedTime: HTMLElement;

  constructor() {
    this.$lastUpdatedTime = $('.last-updated-time');
  }

  public setup(data: Summary): void {
    this.setLastUpdatedTimestamp(data);
  }

  private setLastUpdatedTimestamp(data: Summary) {
    this.$lastUpdatedTime.innerText = this.getDateString(data);
  }

  private getDateString(data: Summary) {
    return new Date(data.Date).toLocaleString();
  }
}
