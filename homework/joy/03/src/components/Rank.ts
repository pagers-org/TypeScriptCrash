import { $ } from '@/utils/utils';
import { Summary, CountriesInfo } from '@/types/type';

const template = (value: CountriesInfo) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-item flex align-center');
  li.setAttribute('id', value.Slug);
  const span = document.createElement('span');
  span.textContent = `${value.TotalConfirmed}`;
  span.setAttribute('class', 'cases');
  const p = document.createElement('p');
  p.setAttribute('class', 'country');
  p.textContent = value.Country;
  li.appendChild(span);
  li.appendChild(p);
  return li;
};

export class Rank {
  public readonly rankList = $('.rank-list');

  //RankList
  private sortRankList(data: Summary) {
    return data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  }
  public setCountryRanksByConfirmedCases(data: Summary) {
    const sorted = this.sortRankList(data);
    sorted.forEach(value => {
      const element = template(value);
      this.rankList.appendChild(element);
    });
  }
}
