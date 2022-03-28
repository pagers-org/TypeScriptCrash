import { $, getUnixTimestamp } from '@/utils/utils';

export const RecoveredList = () => {
  const container = $('.recovered-list');

  function clearRecoveredList() {
    container.innerHTML = null;
  }

  function setRecoveredList(data: any) {
    const sorted = data.sort(
      (a: any, b: any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    sorted.forEach((value: any) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-item-b flex align-center');
      const span = document.createElement('span');
      span.textContent = value.Cases;
      span.setAttribute('class', 'recovered');
      const p = document.createElement('p');
      p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
      li.appendChild(span);
      li.appendChild(p);
      container.appendChild(li);
    });
  }

  return {
    container,
    clearRecoveredList,
    setRecoveredList,
  };
};
