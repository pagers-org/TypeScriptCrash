import { $ } from '@/utils/utils';

export const RankList = () => {
  const container = $('.rank-list');

  function setCountryRanksByConfirmedCases(data: any) {
    const sorted = data.Countries.sort(
      (a: any, b: any) => b.TotalConfirmed - a.TotalConfirmed,
    );
    sorted.forEach((value: any) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-item flex align-center');
      li.setAttribute('id', value.Slug);
      const span = document.createElement('span');
      span.textContent = value.TotalConfirmed;
      span.setAttribute('class', 'cases');
      const p = document.createElement('p');
      p.setAttribute('class', 'country');
      p.textContent = value.Country;
      li.appendChild(span);
      li.appendChild(p);
      container.appendChild(li);
    });
  }

  return {
    setCountryRanksByConfirmedCases,
    container,
  };
};
