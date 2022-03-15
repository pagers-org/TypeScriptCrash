export class Component extends HTMLElement {
    store;

    connectedCallback() {
        this.render();
    }

    render() {
    }

    onStateChange(target, property) {
        const watchItems = this.watch();

        for (const key in watchItems) {
            if (key === property) {
                watchItems[key].apply(this);
            }
        }

        this.render();
    }

    watch() {
        return {}
    }

    events() {

    }
}
