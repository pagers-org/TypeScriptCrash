import { Country } from '../types';

export function createDeathTotalListItem(value: Country): HTMLElement {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-item-b flex align-center');

  const span = document.createElement('span');
  span.textContent = value.Cases;
  span.setAttribute('class', 'deaths');

  const p = document.createElement('p');
  p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

  li.appendChild(span);
  li.appendChild(p);

  return li;
}

export function createRankListItem(value: Country): HTMLElement {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-item flex align-center');
  li.setAttribute('id', value.Slug);

  const span = document.createElement('span');
  span.textContent = String(value.TotalConfirmed);
  span.setAttribute('class', 'cases');

  const p = document.createElement('p');
  p.setAttribute('class', 'country');
  p.textContent = value.Country;

  li.appendChild(span);
  li.appendChild(p);

  return li;
}

export function createRecoveredListItem(value: Country): HTMLElement {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'list-item-b flex align-center');
  const span = document.createElement('span');

  span.textContent = String(value.Cases);
  span.setAttribute('class', 'recovered');

  const p = document.createElement('p');
  p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);

  $li.appendChild(span);
  $li.appendChild(p);

  return $li;
}
