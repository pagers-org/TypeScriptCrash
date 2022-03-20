import { IEventEmitter } from '@/core';

export declare type Value<ValueType> = { [key: string | symbol]: ValueType };

export declare type ComponentRequireArgs = {
  state: any;
  emitter: IEventEmitter;
};

export declare type ElementBindArgs = {
  elem: HTMLElement;
  attrName: string;
  attributeValue: string;
};

export declare type ProxyDataCallbackArgs = {
  beforeObject?: unknown;
  obj?: unknown;
  prop: string | symbol;
  value?: unknown;
};

export declare type HttpRequestArgs = {
  url: string;
  config?: RequestInit;
  data?: object;
};

export declare type ApiResponse = {
  result: boolean;
  message: string;
  data: any;
};
