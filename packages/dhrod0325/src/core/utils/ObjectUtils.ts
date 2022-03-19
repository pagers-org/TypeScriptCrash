export class ObjectUtils {
  static deepCopy(obj:any) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    const result:any = Array.isArray(obj) ? [] : {};

    for (let key of Object.keys(obj)) {
      result[key] = this.deepCopy(obj[key]);
    }

    return result;
  }
}
