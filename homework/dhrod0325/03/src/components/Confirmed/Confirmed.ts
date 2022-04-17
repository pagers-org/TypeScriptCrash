import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class Confirmed extends BaseComponent {
  public setup(summary: SummaryWrapper): void {
    this.setHtml(`${summary.getTotalConfirmed()}`);
  }
}
