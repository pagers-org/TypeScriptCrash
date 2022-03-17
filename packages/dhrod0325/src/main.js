import '../assets/index.css';

import { App, EventEmitter } from './core';

import { bookMarkApi, KEY_USER_TOKEN, storage } from './view';

const _id = storage.getItem(KEY_USER_TOKEN);

if (!_id) {
  location.replace('./login.html');
} else {
  const { data: bookMarks } = await bookMarkApi.list({ _id });

  const state = {
    user: {
      _id,
      bookMarks,
    },
  };

  const emitter = new EventEmitter();
  const componentParam = { state, emitter };

  const app = new App(document.querySelector('.app'));

  app.addComponent(document.createElement('pin-nav'), componentParam);
  app.addComponent(document.createElement('pin-list'), componentParam);
  app.addComponent(document.createElement('loading-progress'), componentParam);
}
