import Chart from 'chart.js/auto';
import {
  SummaryType,
  PickCountriesDetailType,
  CountriesSummaryType,
} from 'Covid';
import { fetchCountryInfo, fetchCovidSummary } from './api';
import { getUnixTimestamp } from './utils/common';
import { COUNTRY, PEOPLE_STATUS } from './constant';
// utils 타입
function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
}

//HTMLElement or HTMLSpanElement
const confirmedTotal = $<HTMLSpanElement>('.confirmed-total');
const deathsTotal = $<HTMLParagraphElement>('.deaths');
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id: string) {
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

// state

let isDeathLoading = false;
// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event: Event) {
  const { target } = event;

  let selectedId = '';
  if (
    target instanceof HTMLParagraphElement ||
    target instanceof HTMLSpanElement
  ) {
    selectedId = target?.parentElement?.id || '';
  }
  if (target instanceof HTMLLIElement) {
    selectedId = target.id;
  }
  if (isDeathLoading) {
    return;
  }
  if (selectedId === 'united-states') return alert(COUNTRY.USA);

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    PEOPLE_STATUS.DEATHS,
  );
  const recoveredResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    PEOPLE_STATUS.RECOVERED,
  );
  const confirmedResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    PEOPLE_STATUS.CONFIRMED,
  );
  endLoadingAnimation();

  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}
/*
function sortDate2<T>(data: T){
//not summary 
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  return sorted;
//summary 
  // const sorted = data.Countries.sort(
  //   (a, b) => b.TotalConfirmed - a.TotalConfirmed,
  // );
  // return sorted;
}
*/
function sortDate(
  data: PickCountriesDetailType[] | SummaryType,
  isSummary = false,
): CountriesSummaryType[] | PickCountriesDetailType[] {
  if (!isSummary) {
    data = data as PickCountriesDetailType[];
    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );
    return sorted;
  }
  data = data as SummaryType;
  const sorted = data.Countries.sort(
    (a, b) => b.TotalConfirmed - a.TotalConfirmed,
  );
  return sorted;
}
function setDeathsList(data: PickCountriesDetailType[]) {
  const sorted = sortDate(data);
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList.appendChild(li);
  });
}

function clearDeathList(): void {
  const list = deathsList;
  list.innerHTML = '';
}

function setTotalDeathsByCountry(data: PickCountriesDetailType[]) {
  deathsTotal.innerText = data[0].Cases;
}

function setRecoveredList(data: PickCountriesDetailType[]) {
  const sorted = sortDate(data);
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: PickCountriesDetailType[]) {
  recoveredTotal.innerText = data[0].Cases;
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const data = await fetchCovidSummary<SummaryType>();
  getTotal(data, 'TotalConfirmed');
  getTotal(data, 'TotalDeaths');
  getTotal(data, 'TotalRecovered');
  // setTotalConfirmedNumber(data);
  // setTotalDeathsByWorld(data);
  // setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {
  const $chartContainer = $('.chart-container');
  $chartContainer.innerHTML = /*html*/ `
    <canvas id="lineChart"
            class="corona-chart"
            style="width: 100%; height: 356px; background-color: #5b5656;"
    ></canvas>`;
  const $chart = $<HTMLCanvasElement>('#lineChart');
  const ctx = $chart.getContext('2d');
  if (ctx === null) throw new Error('canvas is null');
  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: PickCountriesDetailType[]) {
  const chartData = data.slice(-14).map(value => +value.Cases);
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

type TotalType = 'TotalConfirmed' | 'TotalDeaths' | 'TotalRecovered';
// type TotalTable = Record<
//   TotalType,
//   (data: SummaryType, type: TotalType) => string
// >;

function getTotal(data: SummaryType, key: TotalType) {
  data.Countries.reduce((acc, curr) => (acc += curr[key]), 0).toString;
}

// function setTotalConfirmedNumber(data: SummaryType) {
//   confirmedTotal.innerText = data.Countries.reduce(
//     (total, current) => (total += current.TotalConfirmed),
//     0,
//   ).toString();
// }

// function setTotalDeathsByWorld(data: SummaryType) {
//   deathsTotal.innerText = data.Countries.reduce(
//     (total, current) => (total += current.TotalDeaths),
//     0,
//   ).toString();
// }

// function setTotalRecoveredByWorld(data: SummaryType) {
//   recoveredTotal.innerText = data.Countries.reduce(
//     (total, current) => (total += current.TotalRecovered),
//     0,
//   ).toString();
// }

function setCountryRanksByConfirmedCases(data: SummaryType) {
  const sorted = sortDate(data, true);
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug.toString());
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: SummaryType) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
