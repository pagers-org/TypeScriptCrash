export class Component extends HTMLElement {
    state;

    connectedCallback() {
        this.render();
    }

    render() {
    }

    setState(state) {
        this.state = state;
    }

    addOnScrollBottomEvent(callback) {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                callback();
            }
        });
    }
}
