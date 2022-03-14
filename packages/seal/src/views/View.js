export default class View {
  constructor(element) {
    if (element) throw 'element를 설정해주세요!';

    this.element = element;
    this.display = this.element.style.display || '';

    return this;
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }

  show() {
    this.element.style.display = this.display;
    return this;
  }

  on(eventName, handler) {
    this.element.addEventListener(eventName, handler);
    return this;
  }

  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.element.dispatchEvent(event);
    return this;
  }
}
