export class IdFinder {
  private readonly event: Event;

  constructor(event: Event) {
    this.event = event;
  }

  public findId(): string {
    const id = this.findByParagraphOrSpan();
    return id ? id : this.findByLi();
  }

  private findByParagraphOrSpan() {
    const { target } = this.event;

    const isParagraphElement = target instanceof HTMLParagraphElement;
    const isSpanElement = target instanceof HTMLSpanElement;

    if (isParagraphElement || isSpanElement) {
      const { parentElement } = target;
      return parentElement ? parentElement.id : '';
    }
  }

  private findByLi() {
    const { target } = this.event;

    const isLiElement = target instanceof HTMLLIElement;
    return isLiElement ? target.id : '';
  }
}
