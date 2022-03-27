import { $ } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';
import { EventEmitter } from '../lib/EventEmitter';
import { createRankListItem } from '../lib/template';

export class RankList implements Component {
  private readonly $container: HTMLElement;

  constructor(eventEmitter: EventEmitter) {
    this.$container = $('.rank-list');
    this.$container.addEventListener('click', e => {
      eventEmitter.emit('rankItemClicked', e);
    });
  }

  public setup(data: Summary): void {
    this.setByTotalConfirmed(data);
  }

  private setByTotalConfirmed(data: Summary) {
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );

    sorted.forEach(value => {
      this.$container.appendChild(createRankListItem(value));
    });
  }
}
