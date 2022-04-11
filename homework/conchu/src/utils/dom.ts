function createDivElement(): HTMLDivElement {
  return document.createElement('div');
}
export function clearInnerHTML(elem: HTMLElement): void {
  elem.innerHTML = '';
}
//spinner
function createWrapper(id: string): HTMLDivElement {
  const wrapperDiv = createDivElement();
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  return wrapperDiv;
}

function createSpinner(): HTMLDivElement {
  const spinnerDiv = createDivElement();
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(createDivElement());
  spinnerDiv.appendChild(createDivElement());
  return spinnerDiv;
}
export function createSpinnerElement(id: string): HTMLDivElement {
  const wrapperDiv = createWrapper(id);
  const spinnerDiv = createSpinner();
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}
