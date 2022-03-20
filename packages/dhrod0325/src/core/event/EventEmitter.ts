import { IEventEmitter } from '@/core';

export class EventEmitter extends EventTarget implements IEventEmitter {
  emit(eventName: string, data: any = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: data,
      }),
    );
  }

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    this.addEventListener(eventName, callback);
  }
}
