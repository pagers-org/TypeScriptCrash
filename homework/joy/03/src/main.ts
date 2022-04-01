import '@/assets/style.css';
import { CountryInfo, Summary } from '@/types/type';
import { fetchCountryInfo, fetchCovidSummary } from '@/api';

import { Deaths } from '@/components/Deaths';
import { Recovered } from '@/components/Recovered';
import { Rank } from '@/components/Rank';
import { LastUpdatedTime } from '@/components/LastUpdatedTime';
import { ConfirmedTotal } from '@/components/ConfirmedTotal';
import { ChartWrapper } from '@/components/ChartWrapper';

const deaths = new Deaths();
const recovered = new Recovered();
const rankList = new Rank();

const lastUpdatedTime = new LastUpdatedTime();
const confirmedTotal = new ConfirmedTotal();
const chartWrapper = new ChartWrapper();

// state
let isDeathLoading = false;

// methods
function startApp() {
  setupData();
  initEvents();
}

async function setupData() {
  const data = await fetchCovidSummary<Summary>();

  //TODO set하는 함수들을 묶어서 사용 (Mapped Type)
  confirmedTotal.setTotalConfirmedNumber(data);
  deaths.setTotalDeathsByWorld(data);
  recovered.setTotalRecoveredByWorld(data);
  rankList.setCountryRanksByConfirmedCases(data);
  lastUpdatedTime.setLastUpdatedTimestamp(data);
}

// events
function initEvents() {
  rankList.rankList.addEventListener('click', handleListClick);
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

  deaths.clearDeathsList();
  recovered.clearRecoveredList();

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

  deaths.setDeathsList(deathResponse);
  recovered.setRecoveredList(recoveredResponse);
  deaths.setTotalDeathsByCountry(deathResponse);
  recovered.setTotalRecoveredByCountry(recoveredResponse);
  chartWrapper.setChartData(confirmedResponse);

  isDeathLoading = false;
}

function startLoadingAnimation() {
  deaths.addDeathsSpinner();
  recovered.addRecoveredSpinner();
}

function endLoadingAnimation() {
  deaths.removeDeathsSpinner();
  recovered.removeRecoveredSpinner();
}

startApp();
