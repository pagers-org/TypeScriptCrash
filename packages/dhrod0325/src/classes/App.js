export class App {
  container;
  components = [];

  constructor(container) {
    this.container = container;
  }

  addComponent(componentElement, { state, emitter }) {
    componentElement.setState(state);
    componentElement.setEmitter(emitter);

    this.components.push(componentElement);
    this.container.appendChild(componentElement);
  }
}
