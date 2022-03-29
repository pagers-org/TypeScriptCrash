import { fetchCountryInfo, fetchCovidSummary } from './api';
import './style.css';
import { GetCountryResponse, GetSummaryResponse } from './types';
import { $, getUnixTimestamp } from './utils';
import {
  Chart,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';

// DOM
const confirmedTotal = $('.confirmed-total');
const deathsTotal = $('.deaths');
const recoveredTotal = $('.recovered');
const lastUpdatedTime = $('.last-updated-time');
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
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
  let selectedId = '';
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event?.target?.parentElement?.id as string;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id as string;
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

function setDeathsList(data: GetCountryResponse[]) {
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
    deathsList.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = '';
}

function setTotalDeathsByCountry(data: GetCountryResponse[]) {
  deathsTotal.textContent = data[0].Cases.toString();
}

function setRecoveredList(data: GetCountryResponse[]) {
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
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: GetCountryResponse[]) {
  recoveredTotal.textContent = data[0].Cases.toString();
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
  const data = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data: number[], labels: string[]) {
  const canvas = $('#lineChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';

  Chart.register(...registerables);
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

  Chart.getChart('lineChart')?.destroy();

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

function setChartData(data: GetCountryResponse[]) {
  const chartData = data.slice(-14).map(value => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: GetSummaryResponse) {
  confirmedTotal.textContent = data.Countries.reduce(
    (total, current) => (total += current.TotalConfirmed),
    0,
  ).toString();
}

function setTotalDeathsByWorld(data: GetSummaryResponse) {
  deathsTotal.textContent = data.Countries.reduce(
    (total, current) => (total += current.TotalDeaths),
    0,
  ).toString();
}

function setTotalRecoveredByWorld(data: GetSummaryResponse) {
  recoveredTotal.textContent = data.Countries.reduce(
    (total, current) => (total += current.TotalRecovered),
    0,
  ).toString();
}

function setCountryRanksByConfirmedCases(data: GetSummaryResponse) {
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
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: GetSummaryResponse) {
  lastUpdatedTime.textContent = new Date(data.Date).toLocaleString();
}

startApp();
