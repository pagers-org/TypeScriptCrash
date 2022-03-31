import { Country } from 'covid';
import { getDateString } from '@/lib/utils';

export function createElement(html: string): HTMLElement {
  const f = document.createElement('template');
  f.innerHTML = html;

  return f.content.firstElementChild as HTMLElement;
}

export const createRecoveredListItem = (value: Country): Element => {
  return createElement(`
  <li class="list-item-b flex align-center">
    <span class="recovered">${value.Cases}</span>
    <p>${getDateString(value.Date).slice(0, -3)}</p>
  </li>
`);
};

export const createRankListItem = (value: Country): Element => {
  return createElement(`
  <li class="list-item flex align-center" id="${value.Slug}">
    <span class="cases">${value.TotalConfirmed}</span>
    <p class="country">${value.Country}</p>
  </li>
`);
};
