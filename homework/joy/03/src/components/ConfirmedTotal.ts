import { $ } from '@/utils/utils';
import { Summary } from '@/types/type';

export class ConfirmedTotal {
  private readonly confirmedTotal = $('.confirmed-total');

  public setTotalConfirmedNumber(data: Summary) {
    this.confirmedTotal.innerText = data.Countries.reduce(
      (total: any, current: any) => (total += current.TotalConfirmed),
      0,
    );
  }
}