export class Component extends HTMLElement {
    state;

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
    }

    watch() {
        return {}
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
