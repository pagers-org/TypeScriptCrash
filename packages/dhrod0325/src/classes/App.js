export class App {
    container;
    components = [];

    state = {
        pinList: []
    }

    stateProxy = createOnChangeProxy((target, property) => {
        this.components.forEach(e => {
            e.dispatchEvent(new CustomEvent('onStateChange', {
                detail: {target, property}
            }));
        });
    }, this.state);

    constructor(container) {
        this.authCheck();

        this.container = container;
    }

    addComponent(componentElement) {
        this.components.push(componentElement);

        componentElement.setState(this.stateProxy);

        this.container.appendChild(componentElement);

        componentElement.render();
    }

    authCheck() {
        const isLogin = localStorage.getItem('user_token');

        if (isLogin !== null) {
            return;
        }

        location.replace('./login.html');
    }
}

function createOnChangeProxy(callback, target) {
    return new Proxy(target, {
        get(target, property) {
            const item = target[property];

            if (item && typeof item === 'object') {
                return createOnChangeProxy(() => {
                    callback(target, property);
                }, item);
            }

            return item
        },
        set(target, property, newValue) {
            if (target[property] === newValue) {
                return true;
            }

            target[property] = newValue
            callback(target, property);

            return true
        },
    })
}
