import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class LastUpdate extends BaseComponent {
  public setup(summary: SummaryWrapper): void {
    this.update(summary);
  }

  private update(summary: SummaryWrapper): void {
    this.setHtml(summary.getDateString());
  }
}
