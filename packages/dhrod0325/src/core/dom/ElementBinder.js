export class ElementBinder {
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
