export class App {
    container;
    components = [];
    store = {};

    constructor(container) {
        this.container = container;
    }

    addComponent(componentElement) {
        this.components.push(componentElement);
        this.container.appendChild(componentElement);
        componentElement.store = this.store;
    }
}
