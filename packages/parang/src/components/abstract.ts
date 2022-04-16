import { $addEvent } from '../helper';

export default abstract class AbstractComponent {
  constructor() {
    this.bindMembers();
    this.render();
    this.bindEventGroup();
  }

  bindMembers() {
    console.log('call members');
  }

  render() {
    console.log('call render');
  }

  eventGroup(): {
    type: keyof HTMLElementEventMap;
    callback: EventListenerOrEventListenerObject;
  }[] {
    console.log('call eventGroup');
    return [];
  }

  bindEventGroup() {
    this.eventGroup().forEach(({ type, callback }) => {
      $addEvent(this.$element, type, callback);
    });
  }
}
