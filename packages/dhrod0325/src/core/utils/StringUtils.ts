export class StringUtils {
  static isEmail(email: string): boolean {
    const regEmail = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return regEmail.test(email);
  }
}
