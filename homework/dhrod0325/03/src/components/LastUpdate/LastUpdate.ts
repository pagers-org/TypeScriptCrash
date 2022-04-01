import { getDateString } from '@/lib/utils';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export class LastUpdate extends BaseComponent {
  public setup(data: SummaryWrapper): void {
    this.update(data);
  }

  public setHtml(html: string): void {
    this.$container.innerText = html;
  }

  private update(data: SummaryWrapper): void {
    this.setHtml(getDateString(data.summary.Date));
  }
}
