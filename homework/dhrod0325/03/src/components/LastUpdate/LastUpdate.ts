import { Summary } from 'covid';
import { getDateString } from '@/lib/utils';
import { BaseComponent } from '@/lib/Component';

export class LastUpdate extends BaseComponent {
  public setup(data: Summary): void {
    this.update(data);
  }

  public setHtml(html: string): void {
    this.$container.innerText = html;
  }

  private update(data: Summary): void {
    this.setHtml(getDateString(data.Date));
  }
}
