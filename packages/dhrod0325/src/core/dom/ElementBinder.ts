import { Component } from "@/core";

export declare type ElementBindArg = {
  elem: HTMLElement;
  attrName: string;
  attributeValue: string;
}

export interface IElementBinder {
  setWatchElementValue(key: string | symbol, value: any): void;

  eventAttributeBind({ elem, attrName, attributeValue }: ElementBindArg): void;

  inputAttributeBind({ elem, attrName, attributeValue }: ElementBindArg): void;

  attrAttributeBind({ elem, attrName, attributeValue }: ElementBindArg): void;

  bindEvents(): void;
}

export class ElementBinder implements IElementBinder {
  private readonly $context: Component;

  private readonly $watchElements: any = {};

  private readonly $container: Node | null;

  private readonly $method: any;

  private readonly $data: any;

  constructor(context: Component) {
    const { $container, $method, $data } = context;

    this.$context = context;
    this.$container = $container;
    this.$method = $method;
    this.$data = $data;
  }

  setWatchElementValue(key: string | symbol, value: any) {
    const dataBindElement = this.$watchElements[key];

    if (!dataBindElement) {
      return;
    }

    dataBindElement.value = value;
  }

  eventAttributeBind({ elem, attrName, attributeValue }: ElementBindArg) {
    const eventName = attrName.substring(1, attrName.length);
    const method = this.$method[attributeValue].bind(this.$context);

    elem.addEventListener(eventName, method);
  }

  inputAttributeBind({ elem, attrName, attributeValue }: ElementBindArg) {
    this.$watchElements[attributeValue] = elem;

    elem.addEventListener("input", ({ target }) => {
      const key = (target as HTMLInputElement)?.getAttribute(attrName);

      if (key == null) {
        return;
      }

      this.$data[key] = (target as HTMLInputElement)?.value;
    });
  }

  attrAttributeBind({ elem, attrName, attributeValue }: ElementBindArg) {
    const mAttributeName = attrName.replaceAll("m-attr-", "");
    if (mAttributeName === "checked") {
      if (this.$data[attributeValue]) {
        elem.setAttribute(mAttributeName, "checked");
      }
    } else {
      elem.setAttribute(mAttributeName, this.$data[attributeValue]);
    }
  }

  bindEvents() {
    if (!this.$container) {
      return;
    }

    (<HTMLElement>this.$container).querySelectorAll("*").forEach(elem => {
      elem.getAttributeNames().forEach(attrName => {
        const attributeValue = elem.getAttribute(attrName);
        const bindingArguments: ElementBindArg = { elem, attrName, attributeValue } as ElementBindArg;

        if (attrName.startsWith("@")) {
          this.eventAttributeBind(bindingArguments);
        } else if (attrName === "m-input-data") {
          this.inputAttributeBind(bindingArguments);
        } else if (attrName.startsWith("m-attr")) {
          this.attrAttributeBind(bindingArguments);
        }
      });
    });
  }
}
