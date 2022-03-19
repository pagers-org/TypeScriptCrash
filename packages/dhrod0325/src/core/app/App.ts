import { Component, EventEmitter } from "@/core";

export declare type ComponentRequireArgs = {
  state: any;
  emitter: EventEmitter;
}

export class App {
  private container: Element | null;

  constructor(container: Element | null) {
    this.container = container;
  }

  addComponent(componentElement: Component, { state, emitter }: ComponentRequireArgs) {
    componentElement.setState(state);
    componentElement.setEmitter(emitter);

    this.container?.appendChild(componentElement);
  }
}
