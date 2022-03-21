import { Component } from '@/core';

export class DomUtils {
  static createElementByTemplate(template: string): HTMLElement {
    const element: HTMLTemplateElement = document.createElement('template');

    element.innerHTML = template;

    const container = element.content.firstElementChild;

    if (container === null) {
      throw new Error('container is null');
    }

    return <HTMLElement>container.cloneNode(true);
  }

  static createComponent(tagName: string): Component {
    const element = document.createElement(tagName);

    if (!this.isComponent(element)) {
      throw new Error('element is not Component');
    }

    return <Component>element;
  }

  static isComponent(element: any) {
    return element instanceof Component;
  }
}
