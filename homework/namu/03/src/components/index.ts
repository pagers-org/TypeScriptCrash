import { Country, CountryStatus } from "../types";

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

export function createRecoveredItemElement(
  value: CountryStatus
): HTMLLIElement {
  const li = document.createElement("li");
  li.setAttribute("class", "list-item-b flex align-center");
  const span = document.createElement("span");
  span.textContent = value.Cases.toString();
  span.setAttribute("class", "recovered");
  const p = document.createElement("p");
  p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
  li.appendChild(span);
  li.appendChild(p);
  return li;
}

export function createCountryRankItemElement(value: Country): HTMLLIElement {
  const li = document.createElement("li");
  li.setAttribute("class", "list-item flex align-center");
  li.setAttribute("id", value.Slug);
  const span = document.createElement("span");
  span.textContent = value.TotalConfirmed.toString();
  span.setAttribute("class", "cases");
  const p = document.createElement("p");
  p.setAttribute("class", "country");
  p.textContent = value.Country;
  li.appendChild(span);
  li.appendChild(p);
  return li;
}
