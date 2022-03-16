import '../assets/index.css';

import './classes/components/PinList';
import './classes/components/PinNav';
import './classes/components/LoadingProgress';

import { App } from './classes/App';
import { AuthUtils } from './classes/utils/AuthUtils';
import { EventEmitter } from './classes/core/EventEmitter';
import { HttpClient } from './classes/core/HttpClient';
import { BookmarkApi } from './api/BookmarkApi';

const _id = AuthUtils.getToken();

if (!_id) {
  location.replace('./login.html');
} else {
  const bookMarks = await BookmarkApi.getBookmarkList({ _id });
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

const client = new HttpClient({ baseUrl: 'http://localhost:3000' });
client.post({ url: '/api/user/login' }).then(res => {
  console.log(res);
});
