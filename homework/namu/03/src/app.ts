import Chart from "chart.js";

interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

interface Premium {}

interface Country {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Premium: Premium;
}

interface CountryStatus {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: Date;
}

interface SummaryObject {
  ID: string;
  Message: string;
  Global: Global;
  Countries: Country[];
  Date: Date;
}

// utils
function $(selector: string) {
  return document.querySelector(selector);
}
function getUnixTimestamp(date: string | number | Date) {
  return new Date(date).getTime();
}

// DOM
const confirmedTotal = $(".confirmed-total") as HTMLParagraphElement;
const deathsTotal = $(".deaths") as HTMLParagraphElement;
const recoveredTotal = $(".recovered") as HTMLParagraphElement;
const lastUpdatedTime = $(".last-updated-time") as HTMLParagraphElement;
const rankList = $(".rank-list");
const deathsList = $(".deaths-list");
const recoveredList = $(".recovered-list");
const deathSpinner = createSpinnerElement("deaths-spinner");
const recoveredSpinner = createSpinnerElement("recovered-spinner");

function createSpinnerElement(id: string): HTMLDivElement {
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

// state
let isDeathLoading = false;

// api
async function fetchCovidSummary(): Promise<SummaryObject> {
  const response = await fetch("https://api.covid19api.com/summary");
  const result = await response.json();
  return result;
}

async function fetchCountryInfo(
  countryCode: string | undefined,
  status: string
) {
  if (!countryCode) alert("Error with CountryCode");
  const response = await fetch(
    `https://api.covid19api.com/country/${countryCode}/status/${status}`
  );
  const result = await response.json();
  return result;
}

// methods
function startApp(): void {
  setupData();
  initEvents();
}

// events
function initEvents(): void {
  rankList?.addEventListener("click", handleListClick);
}

async function handleListClick(event: Event): Promise<void> {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event?.target?.parentElement?.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  if (selectedId === "united-states")
    return alert("데이터가 많아 총괄 현황은 제공하지 않아요😭");

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo(selectedId, "deaths");
  const recoveredResponse = await fetchCountryInfo(selectedId, "recovered");
  const confirmedResponse = await fetchCountryInfo(selectedId, "confirmed");
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: CountryStatus[]): void {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-item-b flex align-center");
    const span = document.createElement("span");
    span.textContent = value.Cases.toString();
    span.setAttribute("class", "deaths");
    const p = document.createElement("p");
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList?.appendChild(li);
  });
}

function clearDeathList(): void {
  if (deathsList) {
    deathsList.innerHTML = "";
  }
}

function setTotalDeathsByCountry(data: CountryStatus[]): void {
  if (deathsTotal) {
    deathsTotal.innerText = data[0].Cases.toString();
  }
}

function setRecoveredList(data: CountryStatus[]): void {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-item-b flex align-center");
    const span = document.createElement("span");
    span.textContent = value.Cases.toString();
    span.setAttribute("class", "recovered");
    const p = document.createElement("p");
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList?.appendChild(li);
  });
}

function clearRecoveredList(): void {
  if (recoveredList) {
    recoveredList.innerHTML = "";
  }
}

function setTotalRecoveredByCountry(data: CountryStatus[]): void {
  if (recoveredTotal) {
    recoveredTotal.innerText = data[0].Cases.toString();
  }
}

function startLoadingAnimation(): void {
  deathsList?.appendChild(deathSpinner);
  recoveredList?.appendChild(recoveredSpinner);
}

function endLoadingAnimation(): void {
  deathsList?.removeChild(deathSpinner);
  recoveredList?.removeChild(recoveredSpinner);
}

async function setupData(): Promise<void> {
  const data = await fetchCovidSummary();
  console.log("data", data);
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]): void {
  const canvas = $("#lineChart") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  // eslint-disable-next-line no-undef
  // Chart.defaults.global.defaultFontColor = "#f5eaea";
  // // eslint-disable-next-line no-undef
  // Chart.defaults.global.defaultFontFamily = "Exo 2";
  // // eslint-disable-next-line no-undef
  // new Chart(ctx, {
  //   type: "line",
  //   data: {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Confirmed for the last two weeks",
  //         backgroundColor: "#feb72b",
  //         borderColor: "#feb72b",
  //         data,
  //       },
  //     ],
  //   },
  //   options: {},
  // });
}

function setChartData(data: CountryStatus[]): void {
  const chartData = data.slice(-14).map((value) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value) => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: SummaryObject): void {
  if (confirmedTotal) {
    confirmedTotal.innerText = data.Countries.reduce(
      (total, current) => (total += current.TotalConfirmed),
      0
    ).toString();
  }
}

function setTotalDeathsByWorld(data: SummaryObject): void {
  if (deathsTotal) {
    deathsTotal.innerText = data.Countries.reduce(
      (total, current) => (total += current.TotalDeaths),
      0
    ).toString();
  }
}

function setTotalRecoveredByWorld(data: SummaryObject): void {
  if (recoveredTotal) {
    recoveredTotal.innerText = data.Countries.reduce(
      (total, current) => (total += current.TotalRecovered),
      0
    ).toString();
  }
}

function setCountryRanksByConfirmedCases(data: SummaryObject): void {
  const sorted = data.Countries.sort(
    (a, b) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value) => {
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
    rankList?.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: SummaryObject): void {
  if (lastUpdatedTime) {
    lastUpdatedTime.innerText = new Date(data.Date).toLocaleString().toString();
  }
}

startApp();
