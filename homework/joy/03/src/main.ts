import '@/assets/style.css';

import { DeathsList, RecoveredList, RankList } from '@/components/ChartList';

import { createSpinnerElement } from '@/utils/utils';
import { ConfirmedTotal } from '@/components/ConfirmedTotal';
import { DeathsTotal } from '@/components/DeathsTotal';
import { RecoveredTotal } from '@/components/RecoveredTotal';
import { LastUpdatedTime } from '@/components/LastUpdatedTime';
import { fetchCountryInfo, fetchCovidSummary } from '@/api';
import { ChartWrapper } from '@/components/ChartWrapper';

import { CountryInfo, Summary } from '@/types/type';

const deathsList = new DeathsList();
const recoveredList = new RecoveredList();
const rankList = new RankList();

const confirmedTotal = ConfirmedTotal();
const deathTotal = DeathsTotal();
const recoveredTotal = RecoveredTotal();
const lastUpdatedTime = LastUpdatedTime();

const chartWrapper = ChartWrapper();

const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

// state
let isDeathLoading = false;

// methods
function startApp() {
  setupData();
  initEvents();
}

async function setupData() {
  const data = await fetchCovidSummary<Summary>();

  confirmedTotal.setTotalConfirmedNumber(data);
  deathTotal.setTotalDeathsByWorld(data);
  recoveredTotal.setTotalRecoveredByWorld(data);
  rankList.setCountryRanksByConfirmedCases(data);
  lastUpdatedTime.setLastUpdatedTimestamp(data);
}

// events
function initEvents() {
  rankList.container.addEventListener('click', handleListClick);
}

async function handleListClick(event: any) {
  let selectedId = '';

  //Element > HTML Element > HTMLParagraphElement
  //타입단언
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  if (selectedId === 'united-states')
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');

  deathsList.clearList();
  recoveredList.clearList();

  startLoadingAnimation();
  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo<CountryInfo[]>(
    selectedId,
    'deaths',
  );
  const recoveredResponse = await fetchCountryInfo<CountryInfo[]>(
    selectedId,
    'recovered',
  );
  const confirmedResponse = await fetchCountryInfo<CountryInfo[]>(
    selectedId,
    'confirmed',
  );
  endLoadingAnimation();

  deathsList.setList(deathResponse, 'deaths');
  recoveredList.setList(recoveredResponse, 'recovered');

  deathTotal.setTotalDeathsByCountry(deathResponse);

  recoveredTotal.setTotalRecoveredByCountry(recoveredResponse);
  chartWrapper.setChartData(confirmedResponse);

  isDeathLoading = false;
}

function startLoadingAnimation() {
  deathsList.container.appendChild(deathSpinner);
  recoveredList.container.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.container.removeChild(deathSpinner);
  recoveredList.container.removeChild(recoveredSpinner);
}

startApp();
