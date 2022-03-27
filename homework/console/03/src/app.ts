import Chart from 'chartjs';
import { TextElement, CountryStatus, CovidSummary } from 'Covid';
// utils
function $(selector: string) {
  return document.querySelector(selector);
}
function getUnixTimestamp(date: Date) {
  return new Date(date).getTime();
}

// DOM
const confirmedTotal = $('.confirmed-total') as TextElement;
const deathsTotal = $('.deaths') as TextElement;
const recoveredTotal = $('.recovered') as TextElement;
const lastUpdatedTime = $('.last-updated-time') as TextElement;
const rankList = $('.rank-list') as TextElement;
const deathsList = $('.deaths-list') as TextElement;
const recoveredList = $('.recovered-list') as TextElement;
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

// api
async function fetchCovidSummary() {
  const response = await fetch('https://api.covid19api.com/summary');
  const result = await response.json();
  return result;
}

async function fetchCountryInfo(
  countryCode: string,
  status: string,
): Promise<CountryStatus[]> {
  const response = await fetch(
    `https://api.covid19api.com/country/${countryCode}/status/${status}`,
  );
  const result = await response.json();
  return result;
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList?.addEventListener('click', handleListClick);
}

async function handleListClick(event: Event) {
  let selectedId = '';
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event?.target?.parentElement?.id || '';
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  if (selectedId === 'united-states')
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo(selectedId, 'deaths');
  const recoveredResponse = await fetchCountryInfo(selectedId, 'recovered');
  const confirmedResponse = await fetchCountryInfo(selectedId, 'confirmed');
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data: CountryStatus[]) {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList?.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = '';
}

function setTotalDeathsByCountry(data: CountryStatus[]) {
  deathsTotal.innerText = data[0].Cases.toString();
}

function setRecoveredList(data: CountryStatus[]) {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases.toString();
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList?.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: CountryStatus[]) {
  recoveredTotal.innerText = data[0].Cases.toString();
}

function startLoadingAnimation() {
  deathsList?.appendChild(deathSpinner);
  recoveredList?.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList?.removeChild(deathSpinner);
  recoveredList?.removeChild(recoveredSpinner);
}

async function setupData(): Promise<void> {
  const data = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: string[], labels: string[]) {
  const canvas = $('#lineChart') as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

  // eslint-disable-next-line no-undef
  Chart.defaults.global.defaultFontColor = '#f5eaea';
  // eslint-disable-next-line no-undef
  Chart.defaults.global.defaultFontFamily = 'Exo 2';
  // eslint-disable-next-line no-undef
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

function setChartData(data: CountryStatus[]) {
  const chartData = data.slice(-14).map(value => value.Cases.toString());
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: CovidSummary) {
  confirmedTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalConfirmed),
    0,
  ).toString();
}

function setTotalDeathsByWorld(data: CovidSummary) {
  deathsTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalDeaths),
    0,
  ).toString();
}

function setTotalRecoveredByWorld(data: CovidSummary) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalRecovered),
    0,
  ).toString();
}

function setCountryRanksByConfirmedCases(data: CovidSummary) {
  const sorted = data.Countries.sort(
    (a, b) => b.TotalConfirmed - a.TotalConfirmed,
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed.toString();
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList?.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: CovidSummary) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
