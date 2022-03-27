import { Component } from '../../interfaces';
import { Summary } from '../../types';
import { $, getDateString } from '../../lib/utils';

export class LastUpdateTime implements Component {
  private readonly SELECTOR_ID = '.last-updated-time';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.SELECTOR_ID);
  }

  public setup(data: Summary): void {
    this.update(data);
  }

  public setHtml(html: string): void {
    this.$container.innerText = html;
  }

  private update(data: Summary): void {
    this.setHtml(getDateString(data.Date));
  }
}
