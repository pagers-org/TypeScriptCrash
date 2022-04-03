import { Component } from 'covid';
import { api } from '@/lib/Api';
import { RankList } from '@/components/Rank/RankList';
import { SummaryWrapper } from '@/model/SummaryWrapper';
import { useTimer } from '@/lib/TimeChecker';
import { IdFinder } from '@/lib/IdFinder';
import { MSG } from '@/lib/Constant';

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
    const timer = useTimer('clickEvent');

    window.addEventListener(RankList.CLICK_EVENT, event => {
      if (!timer.isTimeOver()) return;
      timer.setWaitTime(1000);

      if (this.isLoading()) return console.log(MSG.LOADING_COMPONENT);

      const selectedId = new IdFinder((event as CustomEvent).detail).findId();
      if (selectedId === 'united-states') return alert(MSG.MANY_DATA);
      this.loadData(selectedId);
    });
  }

  private isLoading() {
    const loadings = this.getLoadingComponents();
    return loadings.length > 0;
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
