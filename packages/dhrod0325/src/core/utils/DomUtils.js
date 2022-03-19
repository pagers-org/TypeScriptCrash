export class DomUtils {
  static createElementByTemplate(template) {
    const element = document.createElement('template');
    element.innerHTML = template;
    return element.content.firstElementChild.cloneNode(true);
  }
}
