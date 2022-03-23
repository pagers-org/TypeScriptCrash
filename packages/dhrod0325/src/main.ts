import '/assets/index.css';
import { App, Component, EventEmitter } from './core';
import { KEY, storage, User } from './view';

try {
  const _id = storage.getItem(KEY.USER_TOKEN);

  render(_id).then();
} catch (e) {
  redirectLoginPage();
}

function redirectLoginPage() {
  location.replace('./login.html');
}

async function render(_id: string) {
  const user = new User({ _id });
  await user.loadBookMark();

  const state = {
    user,
  };

  const emitter = new EventEmitter();
  const componentParam = { state, emitter };

  const app = new App(document.querySelector('#app'));

  app.addComponent(
    <Component>document.createElement('pin-nav'),
    componentParam,
  );
  app.addComponent(
    <Component>document.createElement('pin-list'),
    componentParam,
  );
  app.addComponent(
    <Component>document.createElement('loading-progress'),
    componentParam,
  );
}
