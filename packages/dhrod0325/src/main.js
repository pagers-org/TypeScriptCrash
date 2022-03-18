import '/assets/index.css';

import { App, EventEmitter } from './core';

import { bookMarkApi, KEY_USER_TOKEN, storage, User } from './view';

const _id = storage.getItem(KEY_USER_TOKEN);

if (!_id) {
  redirectLoginPage();
} else {
  render().then();
}

function redirectLoginPage() {
  location.replace('./login.html');
}

async function render() {
  const { data: bookMarks } = await bookMarkApi.list({ _id });

  console.log(bookMarks);

  const user = new User({ _id, bookMarks });

  const state = {
    user,
  };

  const emitter = new EventEmitter();
  const componentParam = { state, emitter };

  const app = new App(document.querySelector('#app'));

  app.addComponent(document.createElement('pin-nav'), componentParam);
  app.addComponent(document.createElement('pin-list'), componentParam);
  app.addComponent(document.createElement('loading-progress'), componentParam);
}
