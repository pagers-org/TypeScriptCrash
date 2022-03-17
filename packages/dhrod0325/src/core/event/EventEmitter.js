export class EventEmitter extends EventTarget {
  emit(eventName, data = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: data,
      }),
    );
  }

  on(eventName, callback) {
    this.addEventListener(eventName, callback);
  }
}
