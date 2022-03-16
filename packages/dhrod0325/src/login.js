import '../assets/page/login.css';

import {App} from "./classes/App";
import {EventEmitter} from "./classes/core/EventEmitter";

import "./classes/components/LoginForm";

const app = new App(document.querySelector('.app'));

const loginForm = document.createElement('login-form');

const state = {};
const emitter = new EventEmitter();

app.addComponent(loginForm, {state, emitter});