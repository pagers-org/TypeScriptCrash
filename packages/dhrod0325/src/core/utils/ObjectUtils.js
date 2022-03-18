export class ObjectUtils {
  static deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    for (let key of Object.keys(obj)) {
      result[key] = this.deepCopy(obj[key]);
    }

    return result;
  }
}
