import {
  DomUtils,
  ElementBinder,
  IComponent,
  IElementBinder,
  IEventEmitter,
  ProxyData,
  ProxyDataCallbackArgs,
  Value,
} from '@/core';

export class Component extends HTMLElement implements IComponent {
  $container: HTMLElement;

  $state: Value<any>;

  $data: Value<any>;

  $method: object;

  $elementBinder: IElementBinder;

  $emitter: IEventEmitter;

  private isMounted = false;

  connectedCallback() {
    this.setUp();

    this.setUpDefault();

    this.render();

    this.bindEvents();

    this.runMounted();
  }

  runMounted() {
    if (this.isMounted) {
      return;
    }

    this.mounted();

    this.isMounted = true;
  }

  setUpDefault() {
    if (!this.$data) {
      this.setData(new ProxyData({}, this.onDataChanged.bind(this)));
    }

    if (!this.$elementBinder) {
      this.setElementBinder(new ElementBinder(this));
    }
  }

  setUp(): void {
    //
  }

  render(): void {
    //
  }

  mounted(): void {
    //
  }

  //TODO Refactoring
  onDataChanged({ prop, value }: ProxyDataCallbackArgs): void {
    this.$elementBinder.setWatchElementValue(prop, value);
  }

  setMethod(method: object) {
    this.$method = method;
  }

  setData(data: ProxyData): void {
    this.$data = data;
  }

  setState(state: object): void {
    this.$state = state;
  }

  setEmitter(emitter: IEventEmitter): void {
    this.$emitter = emitter;
  }

  setContainer(template: string): void {
    try {
      this.$container = DomUtils.createElementByTemplate(template);
      this.replaceWith(this.$container);
    } catch (e) {
      console.log(e);
    }
  }

  setElementBinder(elementBinder: IElementBinder): void {
    this.$elementBinder = elementBinder;
  }

  bindEvents(): void {
    this.$elementBinder.bindEvents();
  }
}
