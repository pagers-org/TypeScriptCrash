import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class Confirmed extends BaseComponent {
  public setup(data: SummaryWrapper): void {
    this.setHtml(`${data.getTotalConfirmed()}`);
  }
}
