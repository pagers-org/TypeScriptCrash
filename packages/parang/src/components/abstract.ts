import { $addEvent } from '../helper';

export default abstract class AbstractComponent {
  $element;

  constructor($element: HTMLElement) {
    this.$element = $element;
    this.render();
    this.bindEventGroup();
  }

  render() {
    console.log('call render');
  }

  eventGroup() {
    console.log('call eventGroup');
    return [];
  }

  bindEventGroup() {
    this.eventGroup().forEach(({ type, callback }) => {
      $addEvent(this.$element, type, callback);
    });
  }
}
