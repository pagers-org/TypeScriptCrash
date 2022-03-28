import './assets/css/main.css';

import { api } from './lib/Api';
import { Component } from './interfaces';
import { createSummaryInfo, findClickedId } from './lib/utils';
import { EventEmitter } from './lib/EventEmitter';
import { Confirmed } from './components/Confirmed/Confirmed';
import { RecoveredTotalList } from './components/Recovered/RecoveredTotalList';
import { RankList } from './components/Rank/RankList';
import { ChartBox } from './components/Chart/ChartBox';
import { LastUpdate } from './components/LastUpdate/LastUpdate';
import { DeathTotalList } from './components/Death/DeathTotalList';

const eventEmitter = new EventEmitter();

const confirmedTotal = new Confirmed();

const rankList = new RankList(eventEmitter);
const recoveredList = new RecoveredTotalList();
const deathTotalList = new DeathTotalList();

const chart = new ChartBox();

const lastUpdateTime = new LastUpdate();

const components: Component[] = [
  rankList,
  confirmedTotal,
  recoveredList,
  deathTotalList,
  lastUpdateTime,
  chart,
];

function startApp() {
  setup();

  events();
}

async function setup() {
  const data = await api.getCovidSummary();

  const summaryInfo = createSummaryInfo(data);

  components.forEach(component => component.setup(summaryInfo));
}

// events
function events() {
  eventEmitter.on('rankItemClicked', handleListClick);
}

async function handleListClick(event: Event) {
  const selectedId = findClickedId((<CustomEvent>event).detail);

  if (selectedId === 'united-states') {
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');
  }

  components.forEach(
    component => component.loadData && component.loadData(selectedId),
  );
}

startApp();
