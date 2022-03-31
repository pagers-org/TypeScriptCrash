import Chart from 'chart.js/auto';
import { SummaryType, PickCountriesDetailType } from 'Covid';
import { fetchCountryInfo, fetchCovidSummary } from './api';
import { COUNTRY, PEOPLE_STATUS } from './constant';
import ConfirmCasesRank from './components/ConfirmCasesRank';
import TotalConfirmed from './components/TotalConfirmed';
import TotalDeaths from './components/TotalDeaths';
import TotalDeathsList from './components/TotalDeathsList';
import TotalRecovered from './components/TotalRecover';
import TotalRecoveredList from './components/TotalRecoveredList';
import UpdateTimeStamp from './components/UpdateTimeStamp';
import { $ } from './utils/common';

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

  new TotalDeathsList(deathsList, { data: deathResponse });
  new TotalRecoveredList(recoveredList, { data: deathResponse });
  setTotalDeathsByCountry(deathResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function clearInnerHTML(elem: HTMLElement): void {
  elem.innerHTML = '';
}

function clearDeathList(): void {
  clearInnerHTML(deathsList);
}

function setTotalDeathsByCountry(data: PickCountriesDetailType[]) {
  deathsTotal.innerText = data[0].Cases;
}

function clearRecoveredList() {
  clearInnerHTML(recoveredList);
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
  new TotalDeaths(deathsTotal, { data });
  new TotalRecovered(recoveredTotal, { data });
  new ConfirmCasesRank(rankList, { data });
  new TotalConfirmed(confirmedTotal, { data });
  new UpdateTimeStamp(lastUpdatedTime, { data });
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

startApp();
