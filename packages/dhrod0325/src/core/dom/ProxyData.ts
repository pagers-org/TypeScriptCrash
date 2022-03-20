import { ObjectUtils, ProxyDataCallbackArgs, Value } from '@/core';

export class ProxyData {
  constructor(
    data: Value<any>,
    callback: (args: ProxyDataCallbackArgs) => void,
  ) {
    return new Proxy(data, {
      set: (obj, prop, value) => {
        if (obj[prop] === value) {
          return true;
        }

        const beforeObject = ObjectUtils.deepCopy(obj);

        obj[prop] = value;

        const callbackArgs: ProxyDataCallbackArgs = {
          beforeObject,
          obj,
          prop,
          value,
        };

        callback(callbackArgs);

        return true;
      },
    });
  }
}
