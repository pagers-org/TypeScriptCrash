import { getDateString } from '@/lib/utils';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/model/SummaryWrapper';

export class LastUpdate extends BaseComponent {
  public setup(data: SummaryWrapper): void {
    this.update(data);
  }

  private update(data: SummaryWrapper): void {
    this.setHtml(getDateString(data.summary.Date));
  }
}
