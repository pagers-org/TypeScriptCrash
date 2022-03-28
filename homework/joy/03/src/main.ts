import '@/assets/style.css';
import { createSpinnerElement } from '@/utils/utils';
import { ConfirmedTotal } from '@/components/ConfirmedTotal';
import { DeathsTotal } from '@/components/DeathsTotal';
import { RecoveredTotal } from '@/components/RecoveredTotal';
import { LastUpdatedTime } from '@/components/LastUpdatedTime';
import { RankList } from '@/components/RankList';
import { DeathsList } from '@/components/DeathsList';
import { RecoveredList } from '@/components/RecoveredList';
import { fetchCountryInfo, fetchCovidSummary } from '@/api';
import { ChartWrapper } from '@/components/ChartWrapper';

const confirmedTotal = ConfirmedTotal();
const deathTotal = DeathsTotal();
const recoveredTotal = RecoveredTotal();
const lastUpdatedTime = LastUpdatedTime();
const rankList = RankList();
const deathsList = DeathsList();
const recoveredList = RecoveredList();
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

// events
function initEvents() {
  rankList.container.addEventListener('click', handleListClick);
}

async function handleListClick(event: any) {
  let selectedId;
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

  deathsList.clearDeathList();
  recoveredList.clearRecoveredList();

  startLoadingAnimation();
  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo(selectedId, 'deaths');
  const recoveredResponse = await fetchCountryInfo(selectedId, 'recovered');
  const confirmedResponse = await fetchCountryInfo(selectedId, 'confirmed');
  endLoadingAnimation();

  deathsList.setDeathsList(deathResponse);
  deathTotal.setTotalDeathsByCountry(deathResponse);
  recoveredList.setRecoveredList(recoveredResponse);
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

async function setupData() {
  const data = await fetchCovidSummary();

  confirmedTotal.setTotalConfirmedNumber(data);
  deathTotal.setTotalDeathsByWorld(data);
  recoveredTotal.setTotalRecoveredByWorld(data);
  rankList.setCountryRanksByConfirmedCases(data);
  lastUpdatedTime.setLastUpdatedTimestamp(data);
}

startApp();
