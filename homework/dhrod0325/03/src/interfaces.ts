import { Summary } from './types';

export interface SetupAble {
  setup(data: Summary): void;
}

export interface LoadDataAble {
  loadData?(selectedId: string | undefined): void;
}

export interface Component extends SetupAble, LoadDataAble {
  onLoad?(): void;
}

export interface IEventEmitter {
  emit(eventName: string, data?: any): void;

  on(eventName: string, callback: EventListenerOrEventListenerObject): void;
}
