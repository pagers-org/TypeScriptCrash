export class IdFinder {
  private readonly event: Event;

  private parentFromElements = [HTMLParagraphElement, HTMLSpanElement];
  private targetFromElements = [HTMLLIElement];

  constructor(event: Event) {
    this.event = event;
  }

  public findId(): string {
    if (this.isParentFrom()) {
      return this.findIdFromParent();
    } else if (this.isTargetFrom()) {
      return this.findIdFromTarget();
    }

    throw new Error('Not Found id');
  }

  private findIdFromParent() {
    const { target } = this.event;
    const { parentElement } = target as HTMLElement;
    return parentElement ? parentElement.id : '';
  }

  private findIdFromTarget() {
    const { target } = this.event;
    return (target as HTMLElement).id;
  }

  private isParentFrom() {
    const { target } = this.event;

    return (
      this.parentFromElements.filter(clazz => target instanceof clazz).length >
      0
    );
  }

  private isTargetFrom() {
    const { target } = this.event;
    return (
      this.targetFromElements.filter(clazz => target instanceof clazz).length >
      0
    );
  }
}
