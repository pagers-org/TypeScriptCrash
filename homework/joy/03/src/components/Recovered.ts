import { $, getUnixTimestamp, createSpinnerElement } from '@/utils/utils';
import { CountryInfo, Summary } from '@/types/type';

const template = (value: CountryInfo) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-item-b flex align-center');
  const span = document.createElement('span');
  span.textContent = value.Cases;
  span.setAttribute('class', 'recovered');
  const p = document.createElement('p');
  p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
  li.appendChild(span);
  li.appendChild(p);
  return li;
};

export class Recovered {
  private readonly recoveredList = $('.recovered-list');
  private readonly recoveredTotal = $('.recovered');
  private readonly recoveredSpinner = createSpinnerElement('recovered-spinner');

  //RecoveredList
  private sortRecoveredList(data: CountryInfo[]) {
    return data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
  }
  public clearRecoveredList() {
    this.recoveredList.innerHTML = '';
  }
  public setRecoveredList(data: CountryInfo[]) {
    const sorted = this.sortRecoveredList(data);
    sorted.forEach(value => {
      const element = template(value);
      this.recoveredList.appendChild(element);
    });
  }

  //RecoveredTotal
  public setTotalRecoveredByCountry(data: CountryInfo[]) {
    this.recoveredTotal.innerText = data[0].Cases;
  }
  public setTotalRecoveredByWorld(data: Summary) {
    this.recoveredTotal.innerText = `${data.Countries.reduce(
      (total, current) => (total += current.TotalRecovered),
      0,
    )}`;
  }

  //RecoveredSpinner
  public addRecoveredSpinner() {
    this.recoveredList.appendChild(this.recoveredSpinner);
  }
  public removeRecoveredSpinner() {
    this.recoveredList.removeChild(this.recoveredSpinner);
  }
}
