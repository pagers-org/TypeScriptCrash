// utils
export function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector) as T;
  if(element === null) throw new Error('element is null!!!');
  return element;
}

export function getUnixTimestamp(date: Date) {
  return new Date(date).getTime();
}

export function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}
