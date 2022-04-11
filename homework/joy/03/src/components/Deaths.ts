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

export class Deaths {
  private readonly deathsList = $('.deaths-list');

  private readonly deathsTotal = $('.deaths');
  private readonly deathsSpinner = createSpinnerElement('deaths-spinner');

  //DeathsList
  private sortDeathsList(data: CountryInfo[]) {
    return data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
  }
  public clearDeathsList() {
    this.deathsList.innerHTML = '';
  }
  public setDeathsList(data: CountryInfo[]) {
    const sorted = this.sortDeathsList(data);
    sorted.forEach(value => {
      const element = template(value);
      this.deathsList.appendChild(element);
    });
  }

  //DeathsTotal
  public setTotalDeathsByCountry(data: CountryInfo[]) {
    this.deathsTotal.innerText = data[0].Cases;
  }
  public setTotalDeathsByWorld(data: Summary) {
    this.deathsTotal.innerText = `${data.Countries.reduce(
      (total, current) => (total += current.TotalDeaths),
      0,
    )}`;
  }

  //TODO Spinner도 callback을 이용하여 수정
  //DeathsSpinner
  public addDeathsSpinner() {
    this.deathsList.appendChild(this.deathsSpinner);
  }
  public removeDeathsSpinner() {
    this.deathsList.removeChild(this.deathsSpinner);
  }
}
