function createOnChangeProxy(callback, obj) {
    return new Proxy(obj, {
        get(target, property) {
            const item = target[property];

            if (item && typeof item === 'object') {
                return createOnChangeProxy(() => {
                    callback(target, property);
                }, item);
            }

            return item;
        },
        set(target, property, newValue) {
            target[property] = newValue;

            callback(target, property);

            return true;
        },
    })
}

export class Store {
    state = {};
    stateProxy = Proxy;

    constructor(callback) {
        this.stateProxy = createOnChangeProxy(callback, this.state);
    }

    setAttribute(key, value) {
        this.stateProxy[key] = value;
    }

    getAttribute(key, defaultValue = '') {
        return this.state[key] ? this.state[key] : defaultValue;
    }
}