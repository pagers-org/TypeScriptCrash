import { CountryStatus } from "../types";

export function createSpinnerElement(id: string): HTMLDivElement {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("id", id);
  wrapperDiv.setAttribute(
    "class",
    "spinner-wrapper flex justify-center align-center"
  );
  const spinnerDiv = document.createElement("div");
  spinnerDiv.setAttribute("class", "ripple-spinner");
  spinnerDiv.appendChild(document.createElement("div"));
  spinnerDiv.appendChild(document.createElement("div"));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

export function createDeathItemElement(value: CountryStatus): HTMLLIElement {
  const li = document.createElement("li");
  li.setAttribute("class", "list-item-b flex align-center");
  const span = document.createElement("span");
  span.textContent = value.Cases.toString();
  span.setAttribute("class", "deaths");
  const p = document.createElement("p");
  p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
  li.appendChild(span);
  li.appendChild(p);
  return li;
}
