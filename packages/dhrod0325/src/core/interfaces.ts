import { ElementBindArgs } from '@/core';

export interface IElementBinder {
  setWatchElementValue(key: string | symbol, value: any): void;

  eventAttributeBind({ elem, attrName, attributeValue }: ElementBindArgs): void;

  inputAttributeBind({ elem, attrName, attributeValue }: ElementBindArgs): void;

  attrAttributeBind({ elem, attrName, attributeValue }: ElementBindArgs): void;

  bindEvents(): void;
}

export interface IComponent {
  setUp(): void;

  render(): void;

  bindEvents(): void;

  runMounted(): void;
}

export interface IEventEmitter {
  emit(eventName: string, data?: any): void;

  on(eventName: string, callback: EventListenerOrEventListenerObject): void;
}

export interface IStorage<Key, Value> {
  getItem(key: Key): Value;

  setItem(key: Key, value: Value): void;
}
