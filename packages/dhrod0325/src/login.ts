import "/assets/page/login.css";

import { App, Component, DomUtils, EventEmitter } from "./core";

import "./view";

const app = new App(<Element>document.querySelector("#app"));

const state = {};
const emitter = new EventEmitter();

app.addComponent(<Component>document.createElement("login-form"), { state, emitter });

DomUtils.createComponent('pin-nav');