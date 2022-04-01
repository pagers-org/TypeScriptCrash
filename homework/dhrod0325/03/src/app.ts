import './assets/css/main.css';

import { Component } from 'covid';

import { RecoveredTotalList } from '@/components/Recovered/RecoveredTotalList';
import { DeathTotalList } from '@/components/Death/DeathTotalList';
import { RankList } from '@/components/Rank/RankList';
import { ChartBox } from '@/components/Chart/ChartBox';
import { Confirmed } from '@/components/Confirmed/Confirmed';
import { LastUpdate } from '@/components/LastUpdate/LastUpdate';
import { App } from '@/lib/App';

const components: Component[] = [
  new RankList('.rank-list'),
  new Confirmed('.confirmed-total'),
  new LastUpdate('.last-updated-time'),
  new RecoveredTotalList(),
  new DeathTotalList(),
  new ChartBox(),
];

const app = new App(components);
app.run();
