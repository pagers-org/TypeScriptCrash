import { Component } from 'covid';
import { api } from '@/lib/Api';
import { createSummaryInfo, getIdByEventTarget } from '@/lib/utils';
import { RankList } from '@/components/Rank/RankList';

export class App {
  private readonly components: Component[];

  constructor(components: Component[]) {
    this.components = components;
  }

  public startApp() {
    this.setUp();

    this.bindEvents();
  }

  private async setUp() {
    const data = await api.getCovidSummary();
    const summaryInfo = createSummaryInfo(data);
    this.components.forEach(
      component => component.setup && component.setup(summaryInfo),
    );
  }

  private bindEvents() {
    window.addEventListener(RankList.CLICK_EVENT, e => {
      const selectedId = getIdByEventTarget((e as CustomEvent).detail);

      if (selectedId === 'united-states')
        return alert('데이터가 많아 총괄 현황은 제공하지 않아요 😭');

      this.components.forEach(
        component => component.loadData && component.loadData(selectedId),
      );
    });
  }
}
