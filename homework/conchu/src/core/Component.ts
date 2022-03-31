interface Common {
  template(): void;
  setup(): void;
  render(): void;
  setState<T>(newState: T): void;
}
export default abstract class Component implements Common {
  $target;
  $props;
  $state: { data?: any; total?: string };
  constructor ($target: any, $props: any) {
    this.$state = { data: [], total: '' };
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
  }
  render(): void {
    this.$target.innerHTML = this.template();
  }
  template(): void {
    throw new Error('Method not implemented.');
  }
  setup(): void {
    //
  }
  setState<T>(newState: T): void {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
