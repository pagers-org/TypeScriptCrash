import { Component } from '../../interfaces';
import { Country, Summary } from '../../types';
import { EventEmitter } from '../../lib/EventEmitter';
import { createRankListItem } from '../../lib/template';
import { $ } from '../../lib/utils';

export class RankList implements Component {
  private CONTAINER_SELECTOR = '.rank-list';

  private readonly ITEM_CLICK_EVENT_NAME = 'rankItemClicked';

  private readonly $container: HTMLElement;

  constructor(eventEmitter: EventEmitter) {
    this.$container = $(this.CONTAINER_SELECTOR);
    this.$container.addEventListener('click', e => {
      eventEmitter.emit(this.ITEM_CLICK_EVENT_NAME, e);
    });
  }

  public setup(data: Summary): void {
    this.setByTotalConfirmed(data);
  }

  private setByTotalConfirmed(data: Summary): void {
    this.sortedData(data).forEach(value => this.addItem(value));
  }

  private sortedData(data: Summary): Country[] {
    return data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  }

  private addItem(value: Country): void {
    this.$container.appendChild(createRankListItem(value));
  }
}
