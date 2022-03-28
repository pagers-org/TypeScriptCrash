import { Component } from '@/interfaces';
import { SummaryInfo } from '@/types';
import { $ } from '@/lib/utils';

export class Confirmed implements Component {
  private readonly CONTAINER_SELECTOR = '.confirmed-total';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public setup(data: SummaryInfo): void {
    this.setHtml(String(data.TotalConfirmed));
  }

  private setHtml(count: string): void {
    this.$container.innerText = count;
  }
}
