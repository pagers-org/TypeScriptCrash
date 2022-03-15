export class App {
    container;
    components = [];

    constructor(container) {
        this.container = container;
    }

    addComponent(componentElement, state = {}) {
        componentElement.setState(state);

        this.components.push(componentElement);
        this.container.appendChild(componentElement);
    }
}
