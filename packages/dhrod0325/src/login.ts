import '/assets/page/login.css';

import { App, DomUtils, EventEmitter } from './core';

import './view';

const app = new App(document.querySelector('#app'));

const state = {};
const emitter = new EventEmitter();

app.addComponent(document.createElement('login-form'), {
  state,
  emitter,
});

DomUtils.createComponent('pin-nav');
