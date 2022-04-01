import { Component } from 'covid';
import { api } from '@/lib/Api';
import { debounce, getIdByEventTarget } from '@/lib/utils';
import { RankList } from '@/components/Rank/RankList';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export class App {
  private readonly components: Component[];

  constructor(components: Component[]) {
    this.components = components;
  }

  public run() {
    this.setUp();

    this.bindEvents();
  }

  private async setUp() {
    const data = await api().getCovidSummary();
    const summaryInfo = new SummaryWrapper(data);

    this.setUpWithSummary(summaryInfo);
  }

  private bindEvents() {
    window.addEventListener(RankList.CLICK_EVENT, e => {
      debounce(() => {
        const selectedId = getIdByEventTarget((e as CustomEvent).detail);

        if (selectedId === 'united-states')
          return alert('데이터가 많아 총괄 현황은 제공하지 않아요 😭');

        const loadings = this.getLoadingComponents();

        if (loadings.length > 0)
          return console.log('component 가 로딩중입니다');

        this.loadData(selectedId);
      }, 200)();
    });
  }

  private loadData(selectedId: string) {
    this.components.forEach(component => {
      component.loadData && component.loadData(selectedId);
    });
  }

  private setUpWithSummary(summaryInfo: SummaryWrapper) {
    this.components.forEach(
      component => component.setup && component.setup(summaryInfo),
    );
  }

  private getLoadingComponents() {
    return [...this.components].filter(
      component => component.isLoading && component.isLoading(),
    );
  }
}
