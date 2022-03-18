import { ObjectUtils } from '../utils/ObjectUtils';

export class Component extends HTMLElement {
  $container;

  $state;

  $emitter;

  $data;

  $method;

  $watchElements = {};

  isMounted = false;

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

  /**
   * setUp 메소드에서 호출
   */
  initialize({ data = {}, method = {}, template = '' }) {
    this.$method = method;

    this.$data = this.createDataProxy(data);

    this.$container = this.createElementByTemplate(template);

    this.replaceWith(this.$container);
  }

  setUp() {
    //override
  }

  render() {
    //override
  }

  bindEvents() {
    if (!this.$container) {
      return;
    }

    this.$container.querySelectorAll('*').forEach(elem => {
      elem.getAttributeNames().forEach(attrName => {
        const attributeValue = elem.getAttribute(attrName);
        const bindingArguments = { elem, attrName, attributeValue };

        if (attrName.startsWith('@')) {
          this.eventAttributeBind(bindingArguments);
        } else if (attrName === 'm-input-data') {
          this.inputAttributeBind(bindingArguments);
        } else if (attrName.startsWith('m-attr')) {
          this.attrAttributeBind(bindingArguments);
        }
      });
    });
  }

  mounted() {
    //override
  }

  disconnectedCallback() {
    //override
  }

  setState(state) {
    this.$state = state;
  }

  setEmitter(emitter) {
    this.$emitter = emitter;
  }

  onChangeData(beforeObject, afterObject, key, value) {
    this.setWatchElementValue(key, value);
  }

  createDataProxy(data) {
    return new Proxy(data, {
      set: (obj, prop, value) => {
        if (obj[prop] === value) {
          return true;
        }

        const beforeObject = ObjectUtils.deepCopy(obj);

        obj[prop] = value;

        this.onChangeData(beforeObject, obj, prop, value);

        return true;
      },
    });
  }

  createElementByTemplate(template) {
    const element = document.createElement('template');
    element.innerHTML = template;
    return element.content.firstElementChild.cloneNode(true);
  }

  setWatchElementValue(key, value) {
    const dataBindElement = this.$watchElements[key];

    if (!dataBindElement) {
      return;
    }

    dataBindElement.value = value;
  }

  eventAttributeBind({ elem, attrName, attributeValue }) {
    const eventName = attrName.substring(1, attrName.length);
    const method = this.$method[attributeValue].bind(this);

    elem.addEventListener(eventName, method);
  }

  inputAttributeBind({ elem, attrName, attributeValue }) {
    this.$watchElements[attributeValue] = elem;

    elem.addEventListener('input', ({ target }) => {
      const key = target.getAttribute(attrName);

      this.$data[key] = target.value;
    });
  }

  attrAttributeBind({ elem, attrName, attributeValue }) {
    const mAttributeName = attrName.replaceAll('m-attr-', '');
    if (mAttributeName === 'checked') {
      if (this.$data[attributeValue]) {
        elem.setAttribute(mAttributeName, 'checked');
      }
    } else {
      elem.setAttribute(mAttributeName, this.$data[attributeValue]);
    }
  }
}
