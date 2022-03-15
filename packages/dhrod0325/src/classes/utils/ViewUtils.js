export class ViewUtils {
    static stringToElement(str) {
        const template = document.createElement('template');
        template.innerHTML = str;
        return template.content.firstElementChild;
    }
}