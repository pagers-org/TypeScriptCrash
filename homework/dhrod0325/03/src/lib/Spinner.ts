export function createSpinnerElement(id: string) {
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

export class Spinner {
  private readonly $container: HTMLElement;

  private readonly $spinner: HTMLElement;

  constructor($container: HTMLElement, spinnerId: string) {
    this.$container = $container;
    this.$spinner = createSpinnerElement(spinnerId);
  }

  public show() {
    this.$container.appendChild(this.$spinner);
  }

  public hide() {
    this.$container.removeChild(this.$spinner);
  }

  public async spin(callback: () => void) {
    await this.show();

    await callback();

    await this.hide();
  }
}

export const useSpinner = async (
  $container: HTMLElement,
  spinnerId: string,
  callback: () => void,
) => {
  const spinner = new Spinner($container, spinnerId);

  return await spinner.spin(callback);
};
