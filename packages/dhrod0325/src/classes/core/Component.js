export class Component extends HTMLElement {
    state = {};

    connectedCallback() {
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    render() {
    }
}
