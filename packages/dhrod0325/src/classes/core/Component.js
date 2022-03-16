import {ViewUtils} from "../utils/ViewUtils";

export class Component extends HTMLElement {
    state;
    emitter;

    $data;
    $method;

    isMounted = false;

    connectedCallback() {
        requestAnimationFrame(() => {
            this.setUp();

            this.render();

            this.bindEvents();

            if (!this.isMounted) {
                this.mounted();

                this.isMounted = true;
            }
        });
    }

    /**
     * setUp 메소드에서 호출
     *
     * @param __data
     * @param __method
     * @param __head
     * @param __template
     */
    initialize(
        {
            data: __data = {},
            method: __method = {},
            head: __head,
            template: __template
        }
    ) {
        this.$data = new Proxy(__data ?? {}, {
            set: (obj, prop, value) => {
                obj[prop] = value;
                return true;
            },
        });

        this.$method = __method;

        if (__head) {
            document.title = __head;
        }

        if (__template) {
            const element = ViewUtils.stringToElement(__template);
            this.appendChild(element);
        }
    }

    setUp() {
    }

    render() {
    }

    bindEvents() {
        this.querySelectorAll('*').forEach(elem => {
            elem.getAttributeNames().forEach(attrName => {
                const attributeValue = elem.getAttribute(attrName);
                if (attrName.startsWith('@')) {
                    const eventName = attrName.substring(1, attrName.length);
                    const method = this.$method[attributeValue].bind(this);
                    elem.addEventListener(eventName, method);
                } else if (attrName === 'm-input-data') {
                    elem.addEventListener('input', (e) => {
                        const {target} = e;
                        const key = target.getAttribute('m-input-data');
                        this.$data[key] = target.value;
                    });
                }
            });
        });
    }

    mounted() {

    }

    disconnectedCallback() {
    }

    setState(state) {
        this.state = state;
    }

    setEmitter(emitter) {
        this.emitter = emitter;
    }
}