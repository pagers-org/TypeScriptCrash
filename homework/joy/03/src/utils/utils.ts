/* eslint-disable @typescript-eslint/ban-ts-comment */

// utils
export function $(selector: string) {
  return document.querySelector(selector);
}

export function getUnixTimestamp(date: Date) {
  return new Date(date).getTime();
}

export function createSpinnerElement(id: any) {
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
