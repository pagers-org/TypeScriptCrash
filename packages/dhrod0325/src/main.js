import '../assets/index.css';

import './classes/components/PinList';
import './classes/components/PinNav';
import './classes/components/LoadingProgress';

import { App } from './classes/App';
import { AuthUtils } from './classes/utils/AuthUtils';
import { getBookmarkList } from './api';
import { EventEmitter } from './classes/core/EventEmitter';

const _id = AuthUtils.getToken();

if (!_id) {
  location.replace('./login.html');
} else {
  const bookMarks = await getBookmarkList({ _id });
  const emitter = new EventEmitter();

  const state = {
    user: {
      _id,
      bookMarks,
    },
  };

  const componentParam = { state, emitter };

  const app = new App(document.querySelector('.app'));

  const pinList = document.createElement('pin-list');
  const pinNav = document.createElement('pin-nav');
  const loadingProgress = document.createElement('loading-progress');

  app.addComponent(pinNav, componentParam);
  app.addComponent(pinList, componentParam);
  app.addComponent(loadingProgress, componentParam);
}
