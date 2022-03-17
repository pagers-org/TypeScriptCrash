export class RandomUtils {
  static nextInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
}
