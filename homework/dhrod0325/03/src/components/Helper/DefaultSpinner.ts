import { Spinner } from 'covid';
import { createElement } from '@/lib/template';

const template = (id: string) => {
  return createElement(`
  <div id="${id}" class="spinner-wrapper flex justify-center align-center">
    <div class="ripple-spinner">
      <div></div>
      <div></div>
    </div>
  </div>
  `);
};

export class DefaultSpinner implements Spinner {
  private readonly $container: HTMLElement;
  private readonly $spinner: HTMLElement;

  constructor($container: HTMLElement, spinnerId: string) {
    this.$container = $container;
    this.$spinner = template(spinnerId);
  }

  public async spin(callback: () => void) {
    this.show();

    await callback();

    this.hide();
  }

  private show(): void {
    this.$container.appendChild(this.$spinner);
  }

  private hide(): void {
    this.$container.removeChild(this.$spinner);
  }
}
