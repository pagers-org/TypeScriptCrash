import { DomUtils } from '../utils/DomUtils';
import { ProxyData } from './ProxyData';
import { ElementBinder } from './ElementBinder';

export class Component extends HTMLElement {
  $container;

  $state;

  $emitter;

  $data;

  $method;

  $elementBinder;

  isMounted = false;

  /**
   * setUp 메소드에서 호출
   */
  initialize({ data = {}, method = {}, template = '' }) {
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

  setUp() {
    console.log('setUp');
  }

  render() {
    console.log('render');
  }

  mounted() {
    console.log('mounted');
  }

  //TODO Refactoring
  onDataChanged(beforeObject, obj, prop, value) {
    this.$elementBinder.setWatchElementValue(prop, value);
  }

  setData(data) {
    this.$data = data;
  }

  setState(state) {
    this.$state = state;
  }

  setEmitter(emitter) {
    this.$emitter = emitter;
  }

  setContainer(template) {
    this.$container = DomUtils.createElementByTemplate(template);
    this.replaceWith(this.$container);
  }

  setElementBinder(elementBinder) {
    this.$elementBinder = elementBinder;
  }

  bindEvents() {
    this.$elementBinder.bindEvents();
  }
}
