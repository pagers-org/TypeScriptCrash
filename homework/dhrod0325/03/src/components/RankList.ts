import { $ } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';
import { EventEmitter } from '../lib/EventEmitter';
import { createRankListItem } from '../lib/template';

export class RankList implements Component {
  private readonly $rankList: HTMLElement;

  constructor(eventEmitter: EventEmitter) {
    this.$rankList = $('.rank-list');
    this.$rankList.addEventListener('click', e => {
      eventEmitter.emit('rankItemClicked', e);
    });
  }

  public setup(data: Summary): void {
    this.setCountryRanksByConfirmedCases(data);
  }

  private setCountryRanksByConfirmedCases(data: Summary) {
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );

    sorted.forEach(value => {
      this.$rankList.appendChild(createRankListItem(value));
    });
  }
}
