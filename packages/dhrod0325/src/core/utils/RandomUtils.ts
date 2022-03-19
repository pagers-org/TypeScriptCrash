export class RandomUtils {
  static nextInt(max:number) {
    return Math.floor(Math.random() * max) + 1;
  }
}
