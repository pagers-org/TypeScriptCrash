import { $ } from '@/utils/utils';
import { Summary } from '@/types/type';

export class LastUpdatedTime {
  private readonly lastUpdatedTime = $('.last-updated-time');

  public setLastUpdatedTimestamp(data: Summary) {
    this.lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
  }
}