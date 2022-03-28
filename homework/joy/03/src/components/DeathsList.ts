import { $, getUnixTimestamp } from '@/utils/utils';

export const DeathsList = () => {
  const container = $('.deaths-list');

  function setDeathsList(data: any) {
    const sorted = data.sort(
      (a: any, b: any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    sorted.forEach((value: any) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-item-b flex align-center');
      const span = document.createElement('span');
      span.textContent = value.Cases;
      span.setAttribute('class', 'deaths');
      const p = document.createElement('p');
      p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
      li.appendChild(span);
      li.appendChild(p);
      container.appendChild(li);
    });
  }

  function clearDeathList() {
    container.innerHTML = null;
  }

  return {
    container,
    setDeathsList,
    clearDeathList,
  };
};
