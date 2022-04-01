import { Summary, TotalCounterProp } from 'covid';

export class SummaryWrapper {
  public summary: Summary;

  constructor(summary: Summary) {
    this.summary = summary;
  }

  private calcTotalCountData(prop: TotalCounterProp): number {
    return this.summary.Countries.reduce(
      (total, current) => total + current[prop],
      0,
    );
  }

  public getTotalConfirmed() {
    return this.calcTotalCountData('TotalConfirmed');
  }

  public getTotalRecovered() {
    return this.calcTotalCountData('TotalRecovered');
  }

  public getTotalDeaths() {
    return this.calcTotalCountData('TotalDeaths');
  }
}
