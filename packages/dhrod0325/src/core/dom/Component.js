import { ObjectUtils } from '../utils/ObjectUtils';
import { DomUtils } from '../utils/DomUtils';

class ComponentElementBinder {
  $context;

  $watchElements = [];

  $container;

  $method;

  $data;

  constructor(context) {
    const { $container, $method, $data } = context;

    this.$context = context;
    this.$container = $container;
    this.$method = $method;
    this.$data = $data;

    this.$data.callbackList.push((beforeObject, obj, prop, value) => {
      this.setWatchElementValue(prop, value);
    });
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
    const method = this.$method[attributeValue].bind(this.$context);

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
}

class ComponentProxyData {
  constructor(data, callback) {
    const proxy = new Proxy(data, {
      set: (obj, prop, value) => {
        if (obj[prop] === value) {
          return true;
        }

        const beforeObject = ObjectUtils.deepCopy(obj);

        obj[prop] = value;

        if (proxy.executeCallback)
          proxy.executeCallback(beforeObject, obj, prop, value);

        return true;
      },
    });

    proxy.callbackList = [];

    if (callback) proxy.callbackList.push(callback);

    proxy.executeCallback = (beforeObject, obj, prop, value) => {
      proxy.callbackList.forEach(
        callback =>
          function () {
            callback(beforeObject, obj, prop, value);
          },
      );
    };

    return proxy;
  }
}

export class Component extends HTMLElement {
  $container;

  $state;

  $emitter;

  $data;

  $method;

  $elementBinder;

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

    this.$data = new ComponentProxyData(data);

    this.$container = DomUtils.createElementByTemplate(template);

    this.replaceWith(this.$container);

    this.$elementBinder = new ComponentElementBinder(this);
  }

  setUp() {
    //override
  }

  render() {
    //override
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

  bindEvents() {
    this.$elementBinder.bindEvents();
  }
}
