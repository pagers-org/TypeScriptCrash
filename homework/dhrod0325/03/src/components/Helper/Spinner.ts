export class Spinner {
  private readonly $container: HTMLElement;

  private readonly $spinner: HTMLElement;

  constructor($container: HTMLElement, spinnerId: string) {
    this.$container = $container;
    this.$spinner = this.create(spinnerId);
  }

  public show(): void {
    this.$container.appendChild(this.$spinner);
  }

  public hide(): void {
    this.$container.removeChild(this.$spinner);
  }

  public async spin(callback: () => void) {
    await this.show();

    await callback();

    await this.hide();
  }

  create(id: string): HTMLElement {
    function createWrapper() {
      const wrapperDiv = document.createElement('div');
      wrapperDiv.setAttribute('id', id);
      wrapperDiv.setAttribute(
        'class',
        'spinner-wrapper flex justify-center align-center',
      );
      return wrapperDiv;
    }

    function createSpinner() {
      const spinnerDiv = document.createElement('div');
      spinnerDiv.setAttribute('class', 'ripple-spinner');
      spinnerDiv.appendChild(document.createElement('div'));
      spinnerDiv.appendChild(document.createElement('div'));

      return spinnerDiv;
    }

    const wrapperDiv = createWrapper();
    const spinnerDiv = createSpinner();

    wrapperDiv.appendChild(spinnerDiv);

    return wrapperDiv;
  }
}

export const useSpinner = (
  $container: HTMLElement,
  spinnerId: string,
  callback: () => void,
) => {
  const spinner = new Spinner($container, spinnerId);
  return spinner.spin(callback);
};
