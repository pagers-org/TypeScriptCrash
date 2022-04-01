import { SummaryInfo } from 'covid';
import { BaseComponent } from '@/lib/Component';

export class Confirmed extends BaseComponent {
  public setup(data: SummaryInfo): void {
    this.setHtml(`${data.TotalConfirmed}`);
  }

  private setHtml(count: string): void {
    this.$container.innerText = count;
  }
}
