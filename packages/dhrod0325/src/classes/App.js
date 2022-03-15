import {AuthUtils} from "./utils/AuthUtils";

export class App {
    container;
    components = [];
    store = {};

    constructor(container) {
        AuthUtils.authCheck();

        this.container = container;
    }

    addComponent(componentElement) {
        this.components.push(componentElement);
        this.container.appendChild(componentElement);
        componentElement.store = this.store;
        componentElement.render();
    }
}
