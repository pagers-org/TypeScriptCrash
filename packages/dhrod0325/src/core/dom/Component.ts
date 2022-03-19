import { DomUtils, ElementBinder, IElementBinder, IEventEmitter, ProxyCallbackData, ProxyData } from "@/core";

interface IComponent {
  setUp(): void;

  render(): void;

  bindEvents(): void;

  runMounted(): void;
}

export class Component extends HTMLElement implements IComponent {
  $container: HTMLElement;

  $state: any;

  $emitter: IEventEmitter;

  $data: ProxyData;

  $method: object;

  $elementBinder: IElementBinder;

  private isMounted = false;

  /**
   * setUp 메소드에서 호출
   */
  initialize({ data = {}, method = {}, template = "" }) {
    this.$method = method;

    this.setContainer(template);

    this.setData(new ProxyData(data, this.onDataChanged.bind(this)));

    this.setElementBinder(new ElementBinder(this));
  }

  connectedCallback() {
    this.setUp();

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
  onDataChanged({ prop, value }: ProxyCallbackData): void {
    this.$elementBinder.setWatchElementValue(prop, value);
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
