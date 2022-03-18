import { $addEvent } from '../helper';

export default class AbstractComponent {
  constructor() {
    this.render();
    this.bindEventGroup();
  }

  render() {
    console.log('call render');
  }

  eventGroup() {
    return [];
  }

  bindEventGroup() {
    this.eventGroup().forEach(({ type, callback }) => {
      $addEvent(this.$element, type, callback);
    });
  }
}
