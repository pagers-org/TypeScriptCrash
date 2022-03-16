import { ViewUtils } from '../utils/ViewUtils';

export class Component extends HTMLElement {
  $state;

  $emitter;

  $data;

  $method;

  $watchElements = {};

  $container;

  isMounted = false;

  connectedCallback() {
    requestAnimationFrame(() => {
      this.setUp();

      this.render();

      this.bindEvents();

      if (!this.isMounted) {
        this.mounted();

        this.isMounted = true;
      }
    });
  }

  /**
   * setUp 메소드에서 호출
   *
   * @param __data
   * @param __method
   * @param __head
   * @param __template
   */
  initialize({
    data: __data = {},
    method: __method = {},
    head: __head,
    template: __template,
  }) {
    this.$data = new Proxy(__data ?? {}, {
      set: (obj, prop, value) => {
        obj[prop] = value;

        if (this.$watchElements[prop]) {
          this.$watchElements[prop].value = value;
        }

        return true;
      },
    });

    this.$method = __method;

    if (__head) {
      document.title = __head;
    }

    if (__template) {
      this.$container = ViewUtils.stringToElement(__template);
      this.replaceWith(this.$container);
    }
  }

  setUp() {
    //OVERRIDE
  }

  render() {
    //OVERRIDE
  }

  bindEvents() {
    if (!this.$container) {
      return;
    }

    this.$container.querySelectorAll('*').forEach(elem => {
      elem.getAttributeNames().forEach(attrName => {
        const attributeValue = elem.getAttribute(attrName);
        if (attrName.startsWith('@')) {
          const eventName = attrName.substring(1, attrName.length);
          const method = this.$method[attributeValue].bind(this);
          elem.addEventListener(eventName, method);
        } else if (attrName === 'm-input-data') {
          this.$watchElements[attributeValue] = elem;

          elem.addEventListener('input', e => {
            const { target } = e;
            const key = target.getAttribute('m-input-data');
            this.$data[key] = target.value;
          });
        } else if (attrName.startsWith('m-attr')) {
          const mAttributeName = attrName.replaceAll('m-attr-', '');
          elem.setAttribute(mAttributeName, this.$data[attributeValue]);
        }
      });
    });
  }

  mounted() {
    //OVERRIDE
  }

  disconnectedCallback() {
    //OVERRIDE
  }

  setState(state) {
    this.$state = state;
  }

  setEmitter(emitter) {
    this.$emitter = emitter;
  }
}
