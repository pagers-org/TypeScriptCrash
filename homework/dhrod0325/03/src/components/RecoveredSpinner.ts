import { createSpinnerElement } from '../lib/utils';

export class RecoveredSpinner {
  private readonly $container: HTMLElement;

  private readonly $recoveredSpinner: HTMLElement;

  constructor($container: HTMLElement) {
    this.$container = $container;
    this.$recoveredSpinner = createSpinnerElement('recovered-spinner');
  }

  public show() {
    this.$container.appendChild(this.$recoveredSpinner);
  }

  public hide() {
    this.$container.removeChild(this.$recoveredSpinner);
  }
}
