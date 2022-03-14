export class App {
    container;

    state = {
        pinList: []
    }

    stateProxy = new Proxy(this.state, {
        set(target, p, value, receiver) {
            target[p] = value;
            return true;
        }
    });

    constructor(container) {
        this.authCheck();

        this.container = container;
    }

    addComponent(componentElement) {
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