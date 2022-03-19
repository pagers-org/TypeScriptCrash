import { ObjectUtils } from '../utils/ObjectUtils';

export class ProxyData {
  constructor(data, callback) {
    return new Proxy(data, {
      set: (obj, prop, value) => {
        if (obj[prop] === value) {
          return true;
        }

        const beforeObject = ObjectUtils.deepCopy(obj);

        obj[prop] = value;

        callback(beforeObject, obj, prop, value);

        return true;
      },
    });
  }
}
