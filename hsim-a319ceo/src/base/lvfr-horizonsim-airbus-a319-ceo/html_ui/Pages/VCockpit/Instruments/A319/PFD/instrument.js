/**
 * Types of subscribable array change event.
 */
var SubscribableArrayEventType;
(function (SubscribableArrayEventType) {
    /** An element was added. */
    SubscribableArrayEventType["Added"] = "Added";
    /** An element was removed. */
    SubscribableArrayEventType["Removed"] = "Removed";
    /** The array was cleared. */
    SubscribableArrayEventType["Cleared"] = "Cleared";
})(SubscribableArrayEventType || (SubscribableArrayEventType = {}));
/**
 * An abstract implementation of a subscribable which allows adding, removing, and notifying subscribers.
 */
class AbstractSubscribable {
    constructor() {
        this.subs = [];
    }
    /** @inheritdoc */
    sub(fn, initialNotify) {
        this.subs.push(fn);
        if (initialNotify) {
            fn(this.get());
        }
    }
    /** @inheritdoc */
    unsub(fn) {
        const index = this.subs.indexOf(fn);
        if (index >= 0) {
            this.subs.splice(index, 1);
        }
    }
    /**
     * Notifies subscribers that this subscribable's value has changed.
     */
    notify() {
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                this.subs[i](this.get());
            }
            catch (error) {
                console.error(`AbstractSubscribable: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
    }
}
/**
 * Checks if two values are equal using the strict equality operator.
 * @param a The first value.
 * @param b The second value.
 * @returns whether a and b are equal.
 */
AbstractSubscribable.DEFAULT_EQUALITY_FUNC = (a, b) => a === b;

/**
 * A subscribable subject whose value can be freely manipulated.
 */
class Subject extends AbstractSubscribable {
    /**
     * Constructs an observable Subject.
     * @param value The initial value.
     * @param equalityFunc The function to use to check for equality.
     * @param mutateFunc The function to use to mutate the subject's value.
     */
    constructor(value, equalityFunc, mutateFunc) {
        super();
        this.value = value;
        this.equalityFunc = equalityFunc;
        this.mutateFunc = mutateFunc;
    }
    /**
     * Creates and returns a new Subject.
     * @param v The initial value of the subject.
     * @param equalityFunc The function to use to check for equality between subject values. Defaults to the strict
     * equality comparison (`===`).
     * @param mutateFunc The function to use to change the subject's value. If not defined, new values will replace
     * old values by variable assignment.
     * @returns A Subject instance.
     */
    static create(v, equalityFunc, mutateFunc) {
        return new Subject(v, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : Subject.DEFAULT_EQUALITY_FUNC, mutateFunc);
    }
    /**
     * Sets the value of this subject and notifies subscribers if the value changed.
     * @param value The new value.
     */
    set(value) {
        if (!this.equalityFunc(value, this.value)) {
            if (this.mutateFunc) {
                this.mutateFunc(this.value, value);
            }
            else {
                this.value = value;
            }
            this.notify();
        }
    }
    /**
     * Applies a partial set of properties to this subject's value and notifies subscribers if the value changed as a
     * result.
     * @param value The properties to apply.
     */
    apply(value) {
        let changed = false;
        for (const prop in value) {
            changed = value[prop] !== this.value[prop];
            if (changed) {
                break;
            }
        }
        Object.assign(this.value, value);
        changed && this.notify();
    }
    /** @inheritdoc */
    notify() {
        super.notify();
    }
    /**
     * Gets the value of this subject.
     * @returns The value of this subject.
     */
    get() {
        return this.value;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return mutateFunc
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
            : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
    }
}
/**
 * A subscribable subject that is a mapped stream from one or more input subscribables.
 */
class MappedSubject extends AbstractSubscribable {
    /**
     * Creates a new MappedSubject.
     * @param mapFunc The function which maps this subject's inputs to a value.
     * @param equalityFunc The function which this subject uses to check for equality between values.
     * @param mutateFunc The function which this subject uses to change its value.
     * @param initialVal The initial value of this subject.
     * @param inputs The subscribables which provide the inputs to this subject.
     */
    constructor(mapFunc, equalityFunc, mutateFunc, initialVal, ...inputs) {
        super();
        this.mapFunc = mapFunc;
        this.equalityFunc = equalityFunc;
        this.inputs = inputs;
        this.inputValues = inputs.map(input => input.get());
        if (initialVal && mutateFunc) {
            this.value = initialVal;
            mutateFunc(this.value, this.mapFunc(this.inputValues));
            this.mutateFunc = (newVal) => { mutateFunc(this.value, newVal); };
        }
        else {
            this.value = this.mapFunc(this.inputValues);
            this.mutateFunc = (newVal) => { this.value = newVal; };
        }
        this.inputHandlers = this.inputs.map((input, index) => this.updateValue.bind(this, index));
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].sub(this.inputHandlers[i]);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(mapFunc, ...args) {
        let equalityFunc, mutateFunc, initialVal;
        if (typeof args[0] === 'function') {
            equalityFunc = args.shift();
        }
        else {
            equalityFunc = MappedSubject.DEFAULT_EQUALITY_FUNC;
        }
        if (typeof args[0] === 'function') {
            mutateFunc = args.shift();
            initialVal = args.shift();
        }
        return new MappedSubject(mapFunc, equalityFunc, mutateFunc, initialVal, ...args);
    }
    /**
     * Updates an input value, then re-maps this subject's value, and notifies subscribers if this results in a change to
     * the mapped value according to this subject's equality function.
     * @param index The index of the input value to update.
     */
    updateValue(index) {
        this.inputValues[index] = this.inputs[index].get();
        const value = this.mapFunc(this.inputValues, this.value);
        if (!this.equalityFunc(this.value, value)) {
            this.mutateFunc(value);
            this.notify();
        }
    }
    /**
     * Gets the current value of the subject.
     * @returns The current value.
     */
    get() {
        return this.value;
    }
    /**
     * Destroys the subscription to the parent subscribable.
     */
    destroy() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].unsub(this.inputHandlers[i]);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return new MappedSubject(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : MappedSubject.DEFAULT_EQUALITY_FUNC, mutateFunc, initialVal, this);
    }
}

/**
 * A class for subjects that return a computed value.
 * @class ComputedSubject
 * @template I The type of the input value.
 * @template T The type of the computed output value.
 */
class ComputedSubject {
    /**
     * Creates an instance of ComputedSubject.
     * @param value The initial value.
     * @param computeFn The computation function.
     */
    constructor(value, computeFn) {
        this.computeFn = computeFn;
        this._subs = [];
        this._value = value;
        this._computedValue = computeFn(value);
    }
    /**
     * Creates and returns a new ComputedSubject.
     * @param v The initial value of the Subject.
     * @param fn A function which transforms raw values to computed values.
     * @returns A ComputedSubject instance.
     */
    static create(v, fn) {
        return new ComputedSubject(v, fn);
    }
    /**
     * Sets the new value and notifies the subscribers when value changed.
     * @param value The new value.
     */
    set(value) {
        this._value = value;
        const compValue = this.computeFn(value);
        if (compValue !== this._computedValue) {
            this._computedValue = compValue;
            const subLen = this._subs.length;
            for (let i = 0; i < subLen; i++) {
                this._subs[i](this._computedValue, this._value);
            }
        }
    }
    /**
     * Gets the computed value of the Subject.
     * @returns The computed value.
     */
    get() {
        return this._computedValue;
    }
    /**
     * Gets the raw value of the Subject.
     * @returns The raw value.
     */
    getRaw() {
        return this._value;
    }
    /**
     * Subscribes to the subject with a callback function. The function will be called whenever the computed value of
     * this Subject changes.
     * @param fn A callback function.
     * @param initialNotify Whether to immediately notify the callback function with the current compured and raw values
     * of this Subject after it is subscribed. False by default.
     */
    sub(fn, initialNotify) {
        this._subs.push(fn);
        if (initialNotify) {
            fn(this._computedValue, this._value);
        }
    }
    /**
     * Unsubscribes a callback function from this Subject.
     * @param fn The callback function to unsubscribe.
     */
    unsub(fn) {
        const index = this._subs.indexOf(fn);
        if (index >= 0) {
            this._subs.splice(index, 1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return mutateFunc
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
            : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
    }
}

/* eslint-disable no-inner-declarations */
/** A releative render position. */
var RenderPosition;
(function (RenderPosition) {
    RenderPosition[RenderPosition["Before"] = 0] = "Before";
    RenderPosition[RenderPosition["After"] = 1] = "After";
    RenderPosition[RenderPosition["In"] = 2] = "In";
})(RenderPosition || (RenderPosition = {}));
/**
 * A display component in the component framework.
 * @typedef P The type of properties for this component.
 * @typedef C The type of context that this component might have.
 */
class DisplayComponent {
    /**
     * Creates an instance of a DisplayComponent.
     * @param props The propertis of the component.
     */
    constructor(props) {
        /** The context on this component, if any. */
        this.context = undefined;
        /** The type of context for this component, if any. */
        this.contextType = undefined;
        this.props = props;
    }
    /**
     * A callback that is called before the component is rendered.
     */
    onBeforeRender() { return; }
    /**
     * A callback that is called after the component is rendered.
     * @param node The component's VNode.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAfterRender(node) { return; }
    /**
     * Destroys this component.
     */
    destroy() { return; }
    /**
     * Gets a context data subscription from the context collection.
     * @param context The context to get the subscription for.
     * @returns The requested context.
     * @throws An error if no data for the specified context type could be found.
     */
    getContext(context) {
        if (this.context !== undefined && this.contextType !== undefined) {
            const index = this.contextType.indexOf(context);
            return this.context[index];
        }
        throw new Error('Could not find the provided context type.');
    }
}
/**
 * A reference to a component or element node.
 */
class NodeReference {
    constructor() {
        /** The internal reference instance. */
        this._instance = null;
    }
    /**
     * The instance of the element or component.
     * @returns The instance of the element or component.
     */
    get instance() {
        if (this._instance !== null) {
            return this._instance;
        }
        throw new Error('Instance was null.');
    }
    /**
     * Sets the value of the instance.
     */
    set instance(val) {
        this._instance = val;
    }
    /**
     * Gets the instance, or null if the instance is not populated.
     * @returns The component or element instance.
     */
    getOrDefault() {
        return this._instance;
    }
}
/**
 * Provides a context of data that can be passed down to child components via a provider.
 */
class Context {
    /**
     * Creates an instance of a Context.
     * @param defaultValue The default value of this context.
     */
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
        /**
         * The provider component that can be set to a specific context value.
         * @param props The props of the provider component.
         * @returns A new context provider.
         */
        this.Provider = (props) => new ContextProvider(props, this);
    }
}
/**
 * A provider component that can be set to a specific context value.
 */
class ContextProvider extends DisplayComponent {
    /**
     * Creates an instance of a ContextProvider.
     * @param props The props on the component.
     * @param parent The parent context instance for this provider.
     */
    constructor(props, parent) {
        super(props);
        this.parent = parent;
    }
    /** @inheritdoc */
    render() {
        var _a;
        const children = (_a = this.props.children) !== null && _a !== void 0 ? _a : [];
        return FSComponent.buildComponent(FSComponent.Fragment, this.props, ...children);
    }
}
/**
 * The FS component namespace.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var FSComponent;
(function (FSComponent) {
    /**
     * Valid SVG element tags.
     */
    const svgTags = {
        'circle': true,
        'clipPath': true,
        'color-profile': true,
        'cursor': true,
        'defs': true,
        'desc': true,
        'ellipse': true,
        'g': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'text': true
    };
    /**
     * A fragment of existing elements with no specific root.
     * @param props The fragment properties.
     * @returns The fragment children.
     */
    function Fragment(props) {
        return props.children;
    }
    FSComponent.Fragment = Fragment;
    /**
     * Builds a JSX based FSComponent.
     * @param type The DOM element tag that will be built.
     * @param props The properties to apply to the DOM element.
     * @param children Any children of this DOM element.
     * @returns The JSX VNode for the component or element.
     */
    // eslint-disable-next-line no-inner-declarations
    function buildComponent(type, props, ...children) {
        let vnode = null;
        if (typeof type === 'string') {
            let element;
            if (svgTags[type] !== undefined) {
                element = document.createElementNS('http://www.w3.org/2000/svg', type);
            }
            else {
                element = document.createElement(type);
            }
            if (props !== null) {
                for (const key in props) {
                    if (key === 'ref' && props.ref !== undefined) {
                        props.ref.instance = element;
                    }
                    else {
                        const prop = props[key];
                        if (prop instanceof Subject || prop instanceof MappedSubject || prop instanceof ComputedSubject) {
                            element.setAttribute(key, prop.get());
                            prop.sub((v) => {
                                element.setAttribute(key, v);
                            });
                        }
                        else {
                            element.setAttribute(key, prop);
                        }
                    }
                }
            }
            vnode = {
                instance: element,
                props: props,
                children: null
            };
            vnode.children = createChildNodes(vnode, children);
        }
        else if (typeof type === 'function') {
            if (children !== null && props === null) {
                props = {
                    children: children
                };
            }
            else if (props !== null) {
                props.children = children;
            }
            if (typeof type === 'function' && type.name === 'Fragment') {
                let childNodes = type(props);
                //Handle the case where the single fragment children is an array of nodes passsed down from above
                if (childNodes !== null && childNodes.length > 0 && Array.isArray(childNodes[0])) {
                    childNodes = childNodes[0];
                }
                vnode = {
                    instance: null,
                    props,
                    children: childNodes
                };
            }
            else {
                let instance;
                try {
                    instance = type(props);
                }
                catch (_a) {
                    instance = new type(props);
                }
                if (props !== null && props.ref !== null && props.ref !== undefined) {
                    props.ref.instance = instance;
                }
                if (instance.contextType !== undefined) {
                    instance.context = instance.contextType.map(c => Subject.create(c.defaultValue));
                }
                vnode = {
                    instance,
                    props,
                    children: [instance.render()]
                };
            }
        }
        return vnode;
    }
    FSComponent.buildComponent = buildComponent;
    /**
     * Creates the collection of child VNodes.
     * @param parent The parent VNode.
     * @param children The JSX children to convert to nodes.
     * @returns A collection of child VNodes.
     */
    function createChildNodes(parent, children) {
        let vnodes = null;
        if (children !== null && children !== undefined && children.length > 0) {
            vnodes = [];
            for (const child of children) {
                if (child !== null) {
                    if (child instanceof Subject || child instanceof MappedSubject || child instanceof ComputedSubject) {
                        const subjectValue = child.get().toString();
                        const node = {
                            instance: subjectValue === '' ? ' ' : subjectValue,
                            children: null,
                            props: null,
                            root: undefined,
                        };
                        child.sub((v) => {
                            if (node.root !== undefined) {
                                // TODO workaround. gotta find a solution for the text node vanishing when text is empty
                                node.root.nodeValue = v === '' ? ' ' : v.toString();
                            }
                        });
                        vnodes.push(node);
                    }
                    else if (child instanceof Array) {
                        const arrayNodes = createChildNodes(parent, child);
                        if (arrayNodes !== null) {
                            vnodes.push(...arrayNodes);
                        }
                    }
                    else if (typeof child === 'string' || typeof child === 'number') {
                        vnodes.push(createStaticContentNode(child));
                    }
                    else if (typeof child === 'object') {
                        vnodes.push(child);
                    }
                }
            }
        }
        return vnodes;
    }
    FSComponent.createChildNodes = createChildNodes;
    /**
     * Creates a static content VNode.
     * @param content The content to create a node for.
     * @returns A static content VNode.
     */
    function createStaticContentNode(content) {
        return {
            instance: content,
            children: null,
            props: null
        };
    }
    FSComponent.createStaticContentNode = createStaticContentNode;
    /**
     * Renders a VNode to a DOM element.
     * @param node The node to render.
     * @param element The DOM element to render to.
     * @param position The RenderPosition to put the item in.
     */
    function render(node, element, position = RenderPosition.In) {
        if (node.children && node.children.length > 0 && element !== null) {
            const componentInstance = node.instance;
            if (componentInstance !== null && componentInstance.onBeforeRender !== undefined) {
                componentInstance.onBeforeRender();
            }
            if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
                insertNode(node, position, element);
            }
            else {
                for (const child of node.children) {
                    insertNode(child, position, element);
                }
            }
            const instance = node.instance;
            if (instance instanceof ContextProvider) {
                visitNodes(node, (n) => {
                    const nodeInstance = n.instance;
                    if (nodeInstance !== null && nodeInstance.contextType !== undefined) {
                        const contextSlot = nodeInstance.contextType.indexOf(instance.parent);
                        if (contextSlot >= 0) {
                            if (nodeInstance.context === undefined) {
                                nodeInstance.context = [];
                            }
                            nodeInstance.context[contextSlot].set(instance.props.value);
                        }
                        if (nodeInstance instanceof ContextProvider && nodeInstance !== instance && nodeInstance.parent === instance.parent) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            if (componentInstance !== null && componentInstance.onAfterRender !== undefined) {
                componentInstance.onAfterRender(node);
            }
        }
    }
    FSComponent.render = render;
    /**
     * Inserts a node into the DOM.
     * @param node The node to insert.
     * @param position The position to insert the node in.
     * @param element The element to insert relative to.
     */
    function insertNode(node, position, element) {
        var _a, _b, _c, _d, _e, _f;
        if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
            switch (position) {
                case RenderPosition.In:
                    element.appendChild(node.instance);
                    node.root = (_a = element.lastChild) !== null && _a !== void 0 ? _a : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentElement('beforebegin', node.instance);
                    node.root = (_b = element.previousSibling) !== null && _b !== void 0 ? _b : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentElement('afterend', node.instance);
                    node.root = (_c = element.nextSibling) !== null && _c !== void 0 ? _c : undefined;
                    break;
            }
            if (node.children !== null) {
                for (const child of node.children) {
                    insertNode(child, RenderPosition.In, node.instance);
                }
            }
        }
        else if (typeof node.instance === 'string') {
            switch (position) {
                case RenderPosition.In:
                    element.insertAdjacentHTML('beforeend', node.instance);
                    node.root = (_d = element.lastChild) !== null && _d !== void 0 ? _d : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentHTML('beforebegin', node.instance);
                    node.root = (_e = element.previousSibling) !== null && _e !== void 0 ? _e : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentHTML('afterend', node.instance);
                    node.root = (_f = element.nextSibling) !== null && _f !== void 0 ? _f : undefined;
                    break;
            }
        }
        else if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                render(node[i], element);
            }
        }
        else {
            render(node, element);
        }
    }
    /**
     * Render a node before a DOM element.
     * @param node The node to render.
     * @param element The element to render boeore.
     */
    function renderBefore(node, element) {
        render(node, element, RenderPosition.Before);
    }
    FSComponent.renderBefore = renderBefore;
    /**
     * Render a node after a DOM element.
     * @param node The node to render.
     * @param element The element to render after.
     */
    function renderAfter(node, element) {
        render(node, element, RenderPosition.After);
    }
    FSComponent.renderAfter = renderAfter;
    /**
     * Remove a previously rendered element.  Currently, this is just a simple
     * wrapper so that all of our high-level "component maniuplation" state is kept
     * in the FSComponent API, but it's not doing anything other than a simple
     * remove() on the element.   This can probably be enhanced.
     * @param element The element to remove.
     */
    function remove(element) {
        if (element !== null) {
            element.remove();
        }
    }
    FSComponent.remove = remove;
    /**
     * Creates a component or element node reference.
     * @returns A new component or element node reference.
     */
    function createRef() {
        return new NodeReference();
    }
    FSComponent.createRef = createRef;
    /**
     * Creates a new context to hold data for passing to child components.
     * @param defaultValue The default value of this context.
     * @returns A new context.
     */
    function createContext(defaultValue) {
        return new Context(defaultValue);
    }
    FSComponent.createContext = createContext;
    /**
     * Visits VNodes with a supplied visitor function within the given children tree.
     * @param node The node to visit.
     * @param visitor The visitor function to inspect VNodes with. Return true if the search should stop at the visited
     * node and not proceed any further down the node's children.
     * @returns True if the visitation should break, or false otherwise.
     */
    function visitNodes(node, visitor) {
        const stopVisitation = visitor(node);
        if (!stopVisitation && node.children !== null) {
            for (let i = 0; i < node.children.length; i++) {
                visitNodes(node.children[i], visitor);
            }
        }
        return true;
    }
    FSComponent.visitNodes = visitNodes;
    /**
     * An empty callback handler.
     */
    FSComponent.EmptyHandler = () => { return; };
})(FSComponent || (FSComponent = {}));
FSComponent.Fragment;

// eslint-disable-next-line @typescript-eslint/no-namespace
var Wait;
(function (Wait) {
    /**
     * Waits for a set amount of time.
     * @param delay The amount of time to wait in milliseconds.
     * @returns a Promise which is fulfilled after the delay.
     */
    // eslint-disable-next-line no-inner-declarations
    function awaitDelay(delay) {
        return new Promise(resolve => setTimeout(() => resolve(), delay));
    }
    Wait.awaitDelay = awaitDelay;
    /**
     * Waits for a condition to be satisfied.
     * @param predicate A function which evaluates whether the condition is satisfied.
     * @param interval The interval, in milliseconds, at which to evaluate the condition. A zero or negative value
     * causes the condition to be evaluated every frame. Defaults to 0.
     * @param timeout The amount of time, in milliseconds, before the returned Promise is rejected if the condition is
     * not satisfied. A zero or negative value causes the Promise to never be rejected and the condition to be
     * continually evaluated until it is satisfied. Defaults to 0.
     * @returns a Promise which is fulfilled when the condition is satisfied.
     */
    // eslint-disable-next-line no-inner-declarations
    function awaitCondition(predicate, interval = 0, timeout = 0) {
        const t0 = Date.now();
        if (interval <= 0) {
            const loopFunc = (resolve, reject) => {
                if (timeout > 0 && Date.now() - t0 >= timeout) {
                    reject('Await condition timed out.');
                }
                else {
                    predicate() ? resolve() : requestAnimationFrame(loopFunc.bind(undefined, resolve, reject));
                }
            };
            return new Promise((resolve, reject) => { loopFunc(resolve, reject); });
        }
        else {
            return new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    if (timeout > 0 && Date.now() - t0 > timeout) {
                        clearInterval(timer);
                        reject('Await condition timed out.');
                    }
                    else if (predicate()) {
                        clearInterval(timer);
                        resolve();
                    }
                }, interval);
            });
        }
    }
    Wait.awaitCondition = awaitCondition;
})(Wait || (Wait = {}));

/**
 * An event bus consumer for a specific topic.
 */
class Consumer {
    /**
     * Creates an instance of a Consumer.
     * @param bus The event bus to subscribe to.
     * @param topic The topic of the subscription.
     * @param state The state for the consumer to track.
     * @param currentHandler The current build filter handler stack, if any.
     */
    constructor(bus, topic, state = {}, currentHandler) {
        this.bus = bus;
        this.topic = topic;
        this.state = state;
        this.currentHandler = currentHandler;
    }
    /**
     * Handles an event using the provided event handler.
     * @param handler The event handler for the event.
     */
    handle(handler) {
        if (this.currentHandler !== undefined) {
            /**
             * The handler reference to store.
             * @param data The input data to the handler.
             */
            this.handlerReference = (data) => {
                if (this.currentHandler !== undefined) {
                    this.currentHandler(data, this.state, handler);
                }
            };
            this.bus.on(this.topic, this.handlerReference);
        }
        else {
            this.bus.on(this.topic, handler);
        }
    }
    /**
     * Disables handling of the event.
     * @param handler The handler to disable.
     */
    off(handler) {
        if (this.handlerReference !== undefined) {
            this.bus.off(this.topic, this.handlerReference);
        }
        else {
            this.bus.off(this.topic, handler);
        }
    }
    /**
     * Caps the event subscription to a specified frequency, in Hz.
     * @param frequency The frequency, in Hz, to cap to.
     * @returns A new consumer with the applied frequency filter.
     */
    atFrequency(frequency) {
        const deltaTimeTrigger = 1000 / frequency;
        return new Consumer(this.bus, this.topic, { previousTime: Date.now() }, (data, state, next) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - state.previousTime;
            if (deltaTimeTrigger <= deltaTime) {
                while ((state.previousTime + deltaTimeTrigger) < currentTime) {
                    state.previousTime += deltaTimeTrigger;
                }
                this.with(data, next);
            }
        });
    }
    /**
     * Quantizes the numerical event data to consume only at the specified decimal precision.
     * @param precision The decimal precision to snap to.
     * @returns A new consumer with the applied precision filter.
     */
    withPrecision(precision) {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            const dataValue = data;
            const multiplier = Math.pow(10, precision);
            const currentValueAtPrecision = Math.round(dataValue * multiplier) / multiplier;
            if (currentValueAtPrecision !== state.lastValue) {
                state.lastValue = currentValueAtPrecision;
                this.with(currentValueAtPrecision, next);
            }
        });
    }
    /**
     * Quantizes the Arinc429 event data to consume only at the specified decimal precision.
     * @param precision The decimal precision to snap to.
     * @returns A new consumer with the applied precision filter.
     */
    withArinc429Precision(precision) {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            const dataValue = data.value;
            const multiplier = Math.pow(10, precision);
            const currentValueAtPrecision = Math.round(dataValue * multiplier) / multiplier;
            if (currentValueAtPrecision !== state.lastValue
                || state.hasNormalOps !== data.isNormalOperation()
                || state.isNoComputedData !== data.isNoComputedData()
                || state.isFailureWarning !== data.isFailureWarning()) {
                state.lastValue = currentValueAtPrecision;
                state.hasNormalOps = data.isNormalOperation();
                state.isNoComputedData = data.isNoComputedData();
                state.isFailureWarning = data.isFailureWarning();
                this.with(data, next);
            }
        });
    }
    /**
     * Filter the subscription to consume only when the SSM value changes.
     * @returns A new consumer with the applied ssm filter.
     */
    whenArinc429SsmChanged() {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            if (data.ssm !== state.lastSsm) {
                state.lastSsm = data.ssm;
                this.with(data, next);
            }
        });
    }
    /**
     * Filter the subscription to consume only when the value has changed by a minimum amount.
     * @param amount The minimum amount threshold below which the consumer will not consume.
     * @returns A new consumer with the applied change threshold filter.
     */
    whenChangedBy(amount) {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            const dataValue = data;
            const diff = Math.abs(dataValue - state.lastValue);
            if (diff >= amount) {
                state.lastValue = dataValue;
                this.with(data, next);
            }
        });
    }
    /**
     * Filter the subscription to consume only if the value has changed. At all.  Really only
     * useful for strings or other events that don't change much.
     * @returns A new consumer with the applied change threshold filter.
     */
    whenChanged() {
        return new Consumer(this.bus, this.topic, { lastValue: '' }, (data, state, next) => {
            if (state.lastValue !== data) {
                state.lastValue = data;
                this.with(data, next);
            }
        });
    }
    /**
     * Filters events by time such that events will not be consumed until a minimum duration
     * has passed since the previous event.
     * @param deltaTime The minimum delta time between events.
     * @returns A new consumer with the applied change threshold filter.
     */
    onlyAfter(deltaTime) {
        return new Consumer(this.bus, this.topic, { previousTime: Date.now() }, (data, state, next) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - state.previousTime;
            if (timeDiff > deltaTime) {
                state.previousTime += deltaTime;
                this.with(data, next);
            }
        });
    }
    /**
     * Builds a handler stack from the current handler.
     * @param data The data to send in to the handler.
     * @param handler The handler to use for processing.
     */
    with(data, handler) {
        if (this.currentHandler !== undefined) {
            this.currentHandler(data, this.state, handler);
        }
        else {
            handler(data);
        }
    }
}

/**
 * A typed container for subscribers interacting with the Event Bus.
 */
class EventSubscriber {
    /**
     * Creates an instance of an EventSubscriber.
     * @param bus The EventBus that is the parent of this instance.
     */
    constructor(bus) {
        this.bus = bus;
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @returns A consumer to bind the event handler to.
     */
    on(topic) {
        return new Consumer(this.bus, topic);
    }
}

/// <reference types="msfstypes/JS/common" />
/**
 * An event bus that can be used to publish data from backend
 * components and devices to consumers.
 */
class EventBus {
    /**
     * Creates an instance of an EventBus.
     * @param useStorageSync Whether or not to use storage sync (optional, default false)
     */
    constructor(useStorageSync) {
        this._topicHandlersMap = new Map();
        this._wildcardHandlers = new Array();
        this._eventCache = new Map();
        this._busId = Math.floor(Math.random() * 2147483647);
        const syncFunc = useStorageSync ? EventBusStorageSync : EventBusCoherentSync;
        this._busSync = new syncFunc(this.pub.bind(this), this._busId);
        this.syncEvent('event_bus', 'resync_request', false);
        this.on('event_bus', (data) => {
            if (data == 'resync_request') {
                this.resyncEvents();
            }
        });
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @param handler The handler to be called when an event happens.
     */
    on(topic, handler) {
        var _a;
        const handlers = this._topicHandlersMap.get(topic);
        const isNew = !(handlers && handlers.push(handler));
        if (isNew) {
            this._topicHandlersMap.set(topic, [handler]);
        }
        const lastState = (_a = this._eventCache.get(topic)) === null || _a === void 0 ? void 0 : _a.data;
        if (this._eventCache.get(topic) !== undefined) {
            handler(lastState);
        }
    }
    /**
     * Unsubscribes a handler from the topic's events.
     * @param topic The topic to unsubscribe from.
     * @param handler The handler to unsubscribe from topic.
     */
    off(topic, handler) {
        const handlers = this._topicHandlersMap.get(topic);
        if (handlers) {
            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
    }
    /**
     * Subscribe to the handler as * to all topics.
     * @param handler The handler to subscribe to all events.
     */
    onAll(handler) {
        this._wildcardHandlers.push(handler);
    }
    /**
     * Unsubscribe the handler from all topics.
     * @param handler The handler to unsubscribe from all events.
     */
    offAll(handler) {
        const handlerIndex = this._wildcardHandlers.indexOf(handler);
        if (handlerIndex > -1) {
            this._wildcardHandlers.splice(handlerIndex >>> 0, 1);
        }
    }
    /**
     * Publishes an event to the topic on the bus.
     * @param topic The topic to publish to.
     * @param data The data portion of the event.
     * @param sync Whether or not this message needs to be synced on local stoage.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    pub(topic, data, sync = false, isCached = true) {
        if (isCached) {
            this._eventCache.set(topic, { data: data, synced: sync });
        }
        const handlers = this._topicHandlersMap.get(topic);
        if (handlers !== undefined) {
            const len = handlers.length;
            for (let i = 0; i < len; i++) {
                try {
                    handlers[i](data);
                }
                catch (error) {
                    console.error(`Error in EventBus Handler: ${error}`);
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
        }
        // We don't know if anything is subscribed on busses in other instruments,
        // so we'll unconditionally sync if sync is true and trust that the
        // publisher knows what it's doing.
        if (sync) {
            this.syncEvent(topic, data, isCached);
        }
        // always push to wildcard handlers
        const wcLen = this._wildcardHandlers.length;
        for (let i = 0; i < wcLen; i++) {
            this._wildcardHandlers[i](topic, data);
        }
    }
    /**
     * Re-sync all synced events
     */
    resyncEvents() {
        for (const [topic, event] of this._eventCache) {
            if (event.synced) {
                this.syncEvent(topic, event.data, true);
            }
        }
    }
    /**
     * Publish an event to the sync bus.
     * @param topic The topic to publish to.
     * @param data The data to publish.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    syncEvent(topic, data, isCached) {
        this._busSync.sendEvent(topic, data, isCached);
    }
    /**
     * Gets a typed publisher from the event bus..
     * @returns The typed publisher.
     */
    getPublisher() {
        return this;
    }
    /**
     * Gets a typed subscriber from the event bus.
     * @returns The typed subscriber.
     */
    getSubscriber() {
        return new EventSubscriber(this);
    }
}
/**
 * A class that manages event bus synchronization via data storage.
 */
class EventBusStorageSync {
    /**
     * Creates an instance of EventBusStorageSync.
     * @param recvEventCb A callback to execute when an event is received on the bus.
     * @param busId The ID of the bus.  Derp.
     */
    constructor(recvEventCb, busId) {
        this.recvEventCb = recvEventCb;
        this.busId = busId;
        window.addEventListener('storage', this.receiveEvent.bind(this));
    }
    /**
     * Sends an event via storage events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     */
    sendEvent(topic, data) {
        // TODO can we do the stringing more gc friendly?
        // TODO we could not stringify on simple types, but the receiver wouldn't know I guess
        // TODO add handling for busIds to avoid message loops
        localStorage.setItem(EventBusStorageSync.EB_KEY, `${topic.toString()},${data !== undefined ? JSON.stringify(data) : EventBusStorageSync.EMPTY_DATA}`);
        // TODO move removeItem to a function called at intervals instead of every time?
        localStorage.removeItem(EventBusStorageSync.EB_KEY);
    }
    /**
     * Receives an event from storage and syncs onto the bus.
     * @param e The storage event that was received.
     */
    receiveEvent(e) {
        // TODO only react on topics that have subscribers
        if (e.key === EventBusStorageSync.EB_KEY && e.newValue) {
            const val = e.newValue.split(',');
            this.recvEventCb(val[0], val.length > 1 ? JSON.parse(val[1]) : undefined, true);
        }
    }
}
EventBusStorageSync.EMPTY_DATA = '{}';
EventBusStorageSync.EB_KEY = 'eb.evt';
/**
 * A class that manages event bus synchronization via Coherent notifications.
 */
class EventBusCoherentSync {
    /**
     * Creates an instance of EventBusCoherentSync.
     * @param recvEventCb A callback to execute when an event is received on the bus.
     * @param busId The ID of the bus.  Derp.
     */
    constructor(recvEventCb, busId) {
        this.evtNum = 0;
        this.lastEventSynced = -1;
        this.recvEventCb = recvEventCb;
        this.busId = busId;
        this.listener = RegisterViewListener(EventBusCoherentSync.EB_LISTENER_KEY);
        this.listener.on(EventBusCoherentSync.EB_KEY, this.receiveEvent.bind(this));
    }
    /**
     * Sends an event via Coherent events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     * @param isCached Whether or not this event is cached.
     */
    sendEvent(topic, data, isCached) {
        this.listener.triggerToAllSubscribers(EventBusCoherentSync.EB_KEY, { topic, data, isCached, busId: this.busId, evtNum: this.evtNum++ });
    }
    /**
     * Receives an event via Coherent and syncs onto the bus.
     * @param e The storage event that was received.
     */
    receiveEvent(e) {
        // If we've sent this event, don't act on it.
        if (e.busId == this.busId) {
            return;
        }
        if (this.lastEventSynced !== e.evtNum) {
            // TODO only react on topics that have subscribers
            this.lastEventSynced = e.evtNum;
            this.recvEventCb(e['topic'], e['data'], undefined, e['isCached']);
        }
    }
}
EventBusCoherentSync.EMPTY_DATA = '{}';
EventBusCoherentSync.EB_KEY = 'eb.evt';
EventBusCoherentSync.EB_LISTENER_KEY = 'JS_LISTENER_SIMVARS';

/**
 * A basic event-bus publisher.
 */
class BasePublisher {
    /**
     * Creates an instance of BasePublisher.
     * @param bus The common event bus.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(bus, pacer = undefined) {
        this.bus = bus;
        this.publisher = this.bus.getPublisher();
        this.publishActive = false;
        this.pacer = pacer;
    }
    /**
     * Start publishing.
     */
    startPublish() {
        this.publishActive = true;
    }
    /**
     * Stop publishing.
     */
    stopPublish() {
        this.publishActive = false;
    }
    /**
     * Tells whether or not the publisher is currently active.
     * @returns True if the publisher is active, false otherwise.
     */
    isPublishing() {
        return this.publishActive;
    }
    /**
     * A callback called when the publisher receives an update cycle.
     */
    onUpdate() {
        return;
    }
    /**
     * Publish a message if publishing is acpive
     * @param topic The topic key to publish to.
     * @param data The data type for chosen topic.
     * @param sync Whether or not the event should be synced via local storage.
     * @param isCached Whether or not the event should be cached.
     */
    publish(topic, data, sync = false, isCached = true) {
        if (this.publishActive && (!this.pacer || this.pacer.canPublish(topic, data))) {
            this.publisher.pub(topic, data, sync, isCached);
        }
    }
}
/**
 * A base class for publishers that need to handle simvars with built-in
 * support for pacing callbacks.
 */
class SimVarPublisher extends BasePublisher {
    /**
     * Create a SimVarPublisher
     * @param simVarMap A map of simvar event type keys to a SimVarDefinition.
     * @param bus The EventBus to use for publishing.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(simVarMap, bus, pacer = undefined) {
        super(bus, pacer);
        this.simvars = simVarMap;
        this.subscribed = new Set();
    }
    /**
     * Subscribe to an event type to begin publishing.
     * @param data Key of the event type in the simVarMap
     */
    subscribe(data) {
        this.subscribed.add(data);
    }
    /**
     * Unsubscribe to an event to stop publishing.
     * @param data Key of the event type in the simVarMap
     */
    unsubscribe(data) {
        // TODO If we have multiple subscribers we may want to add reference counting here.
        this.subscribed.delete(data);
    }
    /**
     * Read the value of a given simvar by its key.
     * @param key The key of the simvar in simVarMap
     * @returns The value returned by SimVar.GetSimVarValue()
     */
    getValue(key) {
        const simvar = this.simvars.get(key);
        if (simvar === undefined) {
            return undefined;
        }
        return SimVar.GetSimVarValue(simvar.name, simvar.type);
    }
    /**
     * Publish all subscribed data points to the bus.
     */
    onUpdate() {
        for (const data of this.subscribed.values()) {
            const value = this.getValue(data);
            if (value !== undefined) {
                this.publish(data, value);
            }
        }
    }
    /**
     * Change the simvar read for a given key.
     * @param key The key of the simvar in simVarMap
     * @param value The new value to set the simvar to.
     */
    updateSimVarSource(key, value) {
        this.simvars.set(key, value);
    }
}

/**
 * A publisher for publishing H:Events on the bus.
 */
class HEventPublisher extends BasePublisher {
    /**
     * Dispatches an H:Event to the event bus.
     * @param hEvent The H:Event to dispatch.
     * @param sync Whether this event should be synced (optional, default false)
     */
    dispatchHEvent(hEvent, sync = false) {
        //console.log(`dispaching hevent:  ${hEvent}`);
        this.publish('hEvent', hEvent, sync, false);
    }
}

/**
 * Valid type arguments for Set/GetSimVarValue
 */
var SimVarValueType;
(function (SimVarValueType) {
    SimVarValueType["Number"] = "number";
    SimVarValueType["Degree"] = "degrees";
    SimVarValueType["Knots"] = "knots";
    SimVarValueType["Feet"] = "feet";
    SimVarValueType["Meters"] = "meters";
    SimVarValueType["FPM"] = "feet per minute";
    SimVarValueType["Radians"] = "radians";
    SimVarValueType["InHG"] = "inches of mercury";
    SimVarValueType["MB"] = "Millibars";
    SimVarValueType["Bool"] = "Bool";
    SimVarValueType["Celsius"] = "celsius";
    SimVarValueType["MHz"] = "MHz";
    SimVarValueType["KHz"] = "KHz";
    SimVarValueType["NM"] = "nautical mile";
    SimVarValueType["String"] = "string";
    SimVarValueType["RPM"] = "Rpm";
    SimVarValueType["PPH"] = "Pounds per hour";
    SimVarValueType["GPH"] = "gph";
    SimVarValueType["Farenheit"] = "farenheit";
    SimVarValueType["PSI"] = "psi";
    SimVarValueType["GAL"] = "gallons";
    SimVarValueType["Hours"] = "Hours";
    SimVarValueType["Volts"] = "Volts";
    SimVarValueType["Amps"] = "Amperes";
    SimVarValueType["Seconds"] = "seconds";
    SimVarValueType["Enum"] = "Enum";
    SimVarValueType["LLA"] = "latlonalt";
    SimVarValueType["MetersPerSecond"] = "meters per second";
    SimVarValueType["GForce"] = "G Force";
})(SimVarValueType || (SimVarValueType = {}));

/// <reference types="msfstypes/JS/dataStorage" />
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line @typescript-eslint/no-namespace
var DataStore;
(function (DataStore) {
    /**
     * Writes a keyed value to the data store.
     * @param key A key.
     * @param value The value to set.
     */
    function set(key, value) {
        SetStoredData(key, JSON.stringify(value));
    }
    DataStore.set = set;
    /**
     * Retrieves a keyed value from the data store.
     * @param key A key.
     * @returns the value stored under the key, or undefined if one could not be retrieved.
     */
    function get(key) {
        try {
            const string = GetStoredData(key);
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }
    DataStore.get = get;
    /**
     * Removes a key from the data store.
     * @param key The key to remove.
     */
    function remove(key) {
        DeleteStoredData(key);
    }
    DataStore.remove = remove;
})(DataStore || (DataStore = {}));

/**
 * A publisher of clock events.
 */
class ClockPublisher extends BasePublisher {
    // eslint-disable-next-line jsdoc/require-jsdoc
    onUpdate() {
        this.publish('realTime', Date.now());
        this.publish('simTime', ClockPublisher.absoluteTimeToUNIXTime(SimVar.GetSimVarValue('E:ABSOLUTE TIME', 'seconds')));
    }
    /**
     * Converts the sim's absolute time to a UNIX timestamp. The sim's absolute time value is equivalent to a .NET
     * DateTime.Ticks value (epoch = 00:00:00 01 Jan 0001).
     * @param absoluteTime an absolute time value, in units of seconds.
     * @returns the UNIX timestamp corresponding to the absolute time value.
     */
    static absoluteTimeToUNIXTime(absoluteTime) {
        return (absoluteTime - 62135596800) * 1000;
    }
}
/**
 * A clock which keeps track of real-world and sim time.
 */
class Clock {
    /**
     * Constructor.
     * @param bus The event bus to use to publish events from this clock.
     */
    constructor(bus) {
        this.publisher = new ClockPublisher(bus);
    }
    /**
     * Initializes this clock.
     */
    init() {
        this.publisher.startPublish();
    }
    /**
     * Updates this clock.
     */
    onUpdate() {
        this.publisher.onUpdate();
    }
}

/**
 * Provides queued reading on top of another reader.
 *
 * Requires that the variable is written by a queued writer.
 *
 * Internally this reads values and writes 0 when it consumes the value.
 */
class QueuedSimVarReader {
    constructor(simVar) {
        this.isResetting = false;
        this.simVar = simVar;
    }
    register(identifier, callback) {
        this.simVar.register(identifier, () => {
            this.resetSimVar();
            callback();
        });
    }
    update() {
        if (!this.isResetting) {
            this.simVar.update();
        }
    }
    resetSimVar() {
        this.isResetting = true;
        this.simVar.write(0).then(() => {
            this.isResetting = false;
        });
    }
}

/**
 * Reads (either directly or through a callback) and writes variables.
 */
class SimVarReaderWriter {
    constructor(simVarName) {
        this.callbacks = new Map();
        this.simVarName = simVarName;
    }
    register(identifier, callback) {
        this.callbacks.set(identifier, callback);
    }
    update() {
        const identifier = this.read();
        if (this.handles(identifier)) {
            this.notify(identifier);
        }
    }
    read() {
        return SimVar.GetSimVarValue(this.simVarName, 'number');
    }
    write(value) {
        return SimVar.SetSimVarValue(this.simVarName, 'number', value);
    }
    handles(identifier) {
        return this.callbacks.get(identifier) !== undefined;
    }
    notify(identifier) {
        this.callbacks.get(identifier)();
    }
}

function getActivateFailureSimVarName(prefix) {
    return `L:${prefix}_FAILURE_ACTIVATE`;
}
function getDeactivateFailureSimVarName(prefix) {
    return `L:${prefix}_FAILURE_DEACTIVATE`;
}

class FailuresConsumer {
    constructor(simVarPrefix) {
        this.activeFailures = new Map();
        this.callbacks = new Map();
        this.activateFailureReader = new QueuedSimVarReader(new SimVarReaderWriter(getActivateFailureSimVarName(simVarPrefix)));
        this.deactivateFailureReader = new QueuedSimVarReader(new SimVarReaderWriter(getDeactivateFailureSimVarName(simVarPrefix)));
    }
    register(identifier, callback) {
        if (this.callbacks.get(identifier) !== undefined) {
            throw new Error(`Cannot register the same failure identifier (${identifier}) multiple times.`);
        }
        this.callbacks.set(identifier, callback || ((_) => { }));
        this.activateFailureReader.register(identifier, () => {
            this.onReadCallback(identifier, true);
        });
        this.deactivateFailureReader.register(identifier, () => {
            this.onReadCallback(identifier, false);
        });
    }
    update() {
        this.activateFailureReader.update();
        this.deactivateFailureReader.update();
    }
    isActive(identifier) {
        return this.activeFailures.get(identifier) === true;
    }
    onReadCallback(identifier, value) {
        this.callbacks.get(identifier)(value);
        this.activeFailures.set(identifier, value);
    }
}

// One can rightfully argue that this constant shouldn't be located in @flybywiresim/failures.
// Once we create an A320 specific package, such as @flybywiresim/a320, we can move it there.
const A320Failure = Object.freeze({
    Fac1Failure: 22000,
    Fac2Failure: 22001,
    TransformerRectifier1: 24000,
    TransformerRectifier2: 24001,
    TransformerRectifierEssential: 24002,
    Elac1Failure: 27000,
    Elac2Failure: 27001,
    Sec1Failure: 27002,
    Sec2Failure: 27003,
    Sec3Failure: 27004,
    Fcdc1Failure: 27005,
    Fcdc2Failure: 27006,
    GreenReservoirLeak: 29000,
    BlueReservoirLeak: 29001,
    YellowReservoirLeak: 29002,
    GreenReservoirAirLeak: 29003,
    BlueReservoirAirLeak: 29004,
    YellowReservoirAirLeak: 29005,
    GreenReservoirReturnLeak: 29006,
    BlueReservoirReturnLeak: 29007,
    YellowReservoirReturnLeak: 29008,
    LeftPfdDisplay: 31000,
    RightPfdDisplay: 31001,
    FlightWarningComputer1: 31500,
    FlightWarningComputer2: 31501,
    LgciuPowerSupply1: 32000,
    LgciuPowerSupply2: 32001,
    LgciuInternalError1: 32002,
    LgciuInternalError2: 32003,
    GearProxSensorDamageGearUplockNose1: 32004,
    GearProxSensorDamageGearDownlockNose2: 32005,
    GearProxSensorDamageGearUplockRight1: 32006,
    GearProxSensorDamageGearDownlockRight2: 32007,
    GearProxSensorDamageGearUplockLeft2: 32008,
    GearProxSensorDamageGearDownlockLeft1: 32009,
    GearProxSensorDamageGearDoorClosedNose1: 32010,
    GearProxSensorDamageGearDoorOpenedNose2: 32011,
    GearProxSensorDamageGearDoorClosedRight2: 32012,
    GearProxSensorDamageGearDoorOpenedRight1: 32013,
    GearProxSensorDamageGearDoorClosedLeft2: 32014,
    GearProxSensorDamageGearDoorOpenedLeft1: 32015,
    GearActuatorJammedGearNose: 32020,
    GearActuatorJammedGearLeft: 32021,
    GearActuatorJammedGearRight: 32022,
    GearActuatorJammedGearDoorNose: 32023,
    GearActuatorJammedGearDoorLeft: 32024,
    GearActuatorJammedGearDoorRight: 32025,
    RadioAltimeter1: 34000,
    RadioAltimeter2: 34001,
});

class Arinc429WordSsmParseError extends Error {
    constructor(ssm) {
        super();
        this.ssm = ssm;
    }
}
class Arinc429Word {
    constructor(word) {
        Arinc429Word.f64View[0] = word;
        const ssm = Arinc429Word.u32View[0];
        if (ssm >= 0b00 && ssm <= 0b11) {
            this.ssm = ssm;
        }
        else {
            throw new Arinc429WordSsmParseError(ssm);
        }
        this.value = Arinc429Word.f32View[1];
    }
    static empty() {
        return new Arinc429Word(0);
    }
    static fromSimVarValue(name) {
        return new Arinc429Word(SimVar.GetSimVarValue(name, 'number'));
    }
    isFailureWarning() {
        return this.ssm === Arinc429Word.SignStatusMatrix.FailureWarning;
    }
    isNoComputedData() {
        return this.ssm === Arinc429Word.SignStatusMatrix.NoComputedData;
    }
    isFunctionalTest() {
        return this.ssm === Arinc429Word.SignStatusMatrix.FunctionalTest;
    }
    isNormalOperation() {
        return this.ssm === Arinc429Word.SignStatusMatrix.NormalOperation;
    }
    /**
     * Returns the value when normal operation, the supplied default value otherwise.
     */
    valueOr(defaultValue) {
        return this.isNormalOperation() ? this.value : defaultValue;
    }
    getBitValue(bit) {
        return ((this.value >> (bit - 1)) & 1) !== 0;
    }
    getBitValueOr(bit, defaultValue) {
        return this.isNormalOperation() ? ((this.value >> (bit - 1)) & 1) !== 0 : defaultValue;
    }
}
Arinc429Word.SignStatusMatrix = Object.freeze({
    FailureWarning: 0b00,
    NoComputedData: 0b01,
    FunctionalTest: 0b10,
    NormalOperation: 0b11,
});
Arinc429Word.f64View = new Float64Array(1);
Arinc429Word.u32View = new Uint32Array(Arinc429Word.f64View.buffer);
Arinc429Word.f32View = new Float32Array(Arinc429Word.f64View.buffer);

const calculateHorizonOffsetFromPitch = (pitch) => {
    if (pitch > -5 && pitch <= 20) {
        return pitch * 1.8;
    }
    if (pitch > 20 && pitch <= 30) {
        return -0.04 * pitch ** 2 + 3.4 * pitch - 16;
    }
    if (pitch > 30) {
        return 20 + pitch;
    }
    if (pitch < -5 && pitch >= -15) {
        return 0.04 * pitch ** 2 + 2.2 * pitch + 1;
    }
    return pitch - 8;
};
const calculateVerticalOffsetFromRoll = (roll) => {
    let offset = 0;
    if (Math.abs(roll) > 60) {
        offset = Math.max(0, 41 - 35.87 / Math.sin(Math.abs(roll) / 180 * Math.PI));
    }
    return offset;
};
const SmoothSin = (origin, destination, smoothFactor, dTime) => {
    if (origin === undefined) {
        return destination;
    }
    if (Math.abs(destination - origin) < Number.EPSILON) {
        return destination;
    }
    const delta = destination - origin;
    let result = origin + delta * Math.sin(Math.min(smoothFactor * dTime, 1.0) * Math.PI / 2.0);
    if ((origin < destination && result > destination) || (origin > destination && result < destination)) {
        result = destination;
    }
    return result;
};
class LagFilter {
    constructor(timeConstant) {
        this.PreviousInput = 0;
        this.PreviousOutput = 0;
        this.TimeConstant = timeConstant;
    }
    reset() {
        this.PreviousInput = 0;
        this.PreviousOutput = 0;
    }
    /**
     *
     * @param input Input to filter
     * @param deltaTime in seconds
     * @returns {number} Filtered output
     */
    step(input, deltaTime) {
        const filteredInput = !Number.isNaN(input) ? input : 0;
        const scaledDeltaTime = deltaTime * this.TimeConstant;
        const sum0 = scaledDeltaTime + 2;
        const output = (filteredInput + this.PreviousInput) * scaledDeltaTime / sum0
            + (2 - scaledDeltaTime) / sum0 * this.PreviousOutput;
        this.PreviousInput = filteredInput;
        if (Number.isFinite(output)) {
            this.PreviousOutput = output;
            return output;
        }
        return 0;
    }
}
class RateLimiter {
    constructor(risingRate, fallingRate) {
        this.PreviousOutput = 0;
        this.RisingRate = risingRate;
        this.FallingRate = fallingRate;
    }
    step(input, deltaTime) {
        const filteredInput = !Number.isNaN(input) ? input : 0;
        const subInput = filteredInput - this.PreviousOutput;
        const scaledUpper = deltaTime * this.RisingRate;
        const scaledLower = deltaTime * this.FallingRate;
        const output = this.PreviousOutput + Math.max(Math.min(scaledUpper, subInput), scaledLower);
        this.PreviousOutput = output;
        return output;
    }
}
/**
 * Gets the smallest angle between two angles
 * @param angle1 First angle in degrees
 * @param angle2 Second angle in degrees
 * @returns {number} Smallest angle between angle1 and angle2 in degrees
 */
const getSmallestAngle = (angle1, angle2) => {
    let smallestAngle = angle1 - angle2;
    if (smallestAngle > 180) {
        smallestAngle -= 360;
    }
    else if (smallestAngle < -180) {
        smallestAngle += 360;
    }
    return smallestAngle;
};

/**
 * Allows interacting with the persistent storage
 */
class NXDataStore {
    static get listener() {
        if (this.mListener === undefined) {
            this.mListener = RegisterViewListener('JS_LISTENER_SIMVARS', null, true);
        }
        return this.mListener;
    }
    static get(key, defaultVal) {
        const val = GetStoredData(`A32NX_${key}`);
        // GetStoredData returns null on error, or empty string for keys that don't exist (why isn't that an error??)
        // We could use SearchStoredData, but that spams the console with every key (somebody left their debug print in)
        if (val === null || val.length === 0) {
            return defaultVal;
        }
        return val;
    }
    /**
     * Sets a value in persistent storage
     *
     * @param key The property key
     * @param val The value to assign to the property
     */
    static set(key, val) {
        SetStoredData(`A32NX_${key}`, val);
        this.listener.triggerToAllSubscribers('A32NX_NXDATASTORE_UPDATE', key, val);
    }
    static subscribe(key, callback) {
        return Coherent.on('A32NX_NXDATASTORE_UPDATE', (updatedKey, value) => {
            if (key === '*' || key === updatedKey) {
                callback(updatedKey, value);
            }
        }).clear;
    }
    static getAndSubscribe(key, callback, defaultVal) {
        callback(key, NXDataStore.get(key, defaultVal));
        return NXDataStore.subscribe(key, callback);
    }
}

var DisplayUnitState;
(function (DisplayUnitState) {
    DisplayUnitState[DisplayUnitState["On"] = 0] = "On";
    DisplayUnitState[DisplayUnitState["Off"] = 1] = "Off";
    DisplayUnitState[DisplayUnitState["Selftest"] = 2] = "Selftest";
    DisplayUnitState[DisplayUnitState["Standby"] = 3] = "Standby";
})(DisplayUnitState || (DisplayUnitState = {}));
class DisplayUnit extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.state = SimVar.GetSimVarValue('L:A32NX_COLD_AND_DARK_SPAWN', 'Bool') ? DisplayUnitState.Off : DisplayUnitState.Standby;
        this.electricityState = 0;
        this.potentiometer = 0;
        this.timeOut = 0;
        this.selfTestRef = FSComponent.createRef();
        this.pfdRef = FSComponent.createRef();
        this.backLightBleedRef = FSComponent.createRef();
        this.isHomeCockpitMode = false;
        this.failed = false;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        const isCaptainSide = getDisplayIndex() === 1;
        sub.on(isCaptainSide ? 'potentiometerCaptain' : 'potentiometerFo').whenChanged().handle((value) => {
            this.potentiometer = value;
            this.updateState();
        });
        sub.on(isCaptainSide ? 'elec' : 'elecFo').whenChanged().handle((value) => {
            this.electricityState = value;
            this.updateState();
        });
        sub.on('realTime').atFrequency(1).handle((_t) => {
            // override MSFS menu animations setting for this instrument
            if (!document.documentElement.classList.contains('animationsEnabled')) {
                document.documentElement.classList.add('animationsEnabled');
            }
        });
        this.props.failed.sub((f) => {
            this.failed = f;
            this.updateState();
        });
        NXDataStore.getAndSubscribe('HOME_COCKPIT_ENABLED', (_key, val) => {
            this.isHomeCockpitMode = val === '1';
            this.updateState();
        }, '0');
    }
    setTimer(time) {
        this.timeOut = window.setTimeout(() => {
            if (this.state === DisplayUnitState.Standby) {
                this.state = DisplayUnitState.Off;
            }
            if (this.state === DisplayUnitState.Selftest) {
                this.state = DisplayUnitState.On;
            }
            this.updateState();
        }, time * 1000);
    }
    updateState() {
        if (this.state !== DisplayUnitState.Off && this.failed) {
            this.state = DisplayUnitState.Off;
            clearTimeout(this.timeOut);
        }
        else if (this.state === DisplayUnitState.On && (this.potentiometer === 0 || this.electricityState === 0)) {
            this.state = DisplayUnitState.Standby;
            this.setTimer(10);
        }
        else if (this.state === DisplayUnitState.Standby && (this.potentiometer !== 0 && this.electricityState !== 0)) {
            this.state = DisplayUnitState.On;
            clearTimeout(this.timeOut);
        }
        else if (this.state === DisplayUnitState.Off && (this.potentiometer !== 0 && this.electricityState !== 0 && !this.failed)) {
            this.state = DisplayUnitState.Selftest;
            this.setTimer(parseInt(NXDataStore.get('CONFIG_SELF_TEST_TIME', '15')));
        }
        else if (this.state === DisplayUnitState.Selftest && (this.potentiometer === 0 || this.electricityState === 0)) {
            this.state = DisplayUnitState.Off;
            clearTimeout(this.timeOut);
        }
        if (this.state === DisplayUnitState.Selftest) {
            this.selfTestRef.instance.style.display = 'block';
            this.pfdRef.instance.style.display = 'none';
            this.backLightBleedRef.instance.style.display = this.isHomeCockpitMode ? 'none' : 'block';
        }
        else if (this.state === DisplayUnitState.On) {
            this.selfTestRef.instance.style.display = 'none';
            this.pfdRef.instance.style.display = 'block';
            this.backLightBleedRef.instance.style.display = this.isHomeCockpitMode ? 'none' : 'block';
        }
        else {
            this.selfTestRef.instance.style.display = 'none';
            this.pfdRef.instance.style.display = 'none';
            this.backLightBleedRef.instance.style.display = 'none';
        }
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("div", { ref: this.backLightBleedRef, class: "BacklightBleed" }),
            FSComponent.buildComponent("svg", { ref: this.selfTestRef, class: "SelfTest", viewBox: "0 0 600 600" },
                FSComponent.buildComponent("rect", { class: "SelfTestBackground", x: "0", y: "0", width: "100%", height: "100%" }),
                FSComponent.buildComponent("text", { class: "SelfTestText", x: "50%", y: "50%" }, "SELF TEST IN PROGRESS"),
                FSComponent.buildComponent("text", { class: "SelfTestText", x: "50%", y: "56%" }, "(MAX 40 SECONDS)")),
            FSComponent.buildComponent("div", { style: "display:none", ref: this.pfdRef }, this.props.children)));
    }
}

// Copyright (c) 2021-2022 FlyByWire Simulations
// Copyright (c) 2021-2022 Synaptic Simulations
//
// SPDX-License-Identifier: GPL-3.0
/**
 * This enum represents a Control Law selected by the guidance system.
 */
var ControlLaw;
(function (ControlLaw) {
    /**
     * The only parameter for the Heading law is the desired heading.
     */
    ControlLaw[ControlLaw["HEADING"] = 1] = "HEADING";
    /**
     * The only parameter for the Track law is the desired course.
     */
    ControlLaw[ControlLaw["TRACK"] = 2] = "TRACK";
    /**
     * The lateral path law allows for complex lateral path traversal. It requires three parameters:
     * - Crosstrack Error (XTE)
     * - Track Angle Error (TAE)
     * - Roll Angle (Phi)
     */
    ControlLaw[ControlLaw["LATERAL_PATH"] = 3] = "LATERAL_PATH";
})(ControlLaw || (ControlLaw = {}));
var RequestedVerticalMode;
(function (RequestedVerticalMode) {
    RequestedVerticalMode[RequestedVerticalMode["None"] = 0] = "None";
    RequestedVerticalMode[RequestedVerticalMode["SpeedThrust"] = 1] = "SpeedThrust";
    RequestedVerticalMode[RequestedVerticalMode["VpathThrust"] = 2] = "VpathThrust";
    RequestedVerticalMode[RequestedVerticalMode["VpathSpeed"] = 3] = "VpathSpeed";
    RequestedVerticalMode[RequestedVerticalMode["FpaSpeed"] = 4] = "FpaSpeed";
    RequestedVerticalMode[RequestedVerticalMode["VsSpeed"] = 5] = "VsSpeed";
})(RequestedVerticalMode || (RequestedVerticalMode = {}));

var LateralMode;
(function (LateralMode) {
    LateralMode[LateralMode["NONE"] = 0] = "NONE";
    LateralMode[LateralMode["HDG"] = 10] = "HDG";
    LateralMode[LateralMode["TRACK"] = 11] = "TRACK";
    LateralMode[LateralMode["NAV"] = 20] = "NAV";
    LateralMode[LateralMode["LOC_CPT"] = 30] = "LOC_CPT";
    LateralMode[LateralMode["LOC_TRACK"] = 31] = "LOC_TRACK";
    LateralMode[LateralMode["LAND"] = 32] = "LAND";
    LateralMode[LateralMode["FLARE"] = 33] = "FLARE";
    LateralMode[LateralMode["ROLL_OUT"] = 34] = "ROLL_OUT";
    LateralMode[LateralMode["RWY"] = 40] = "RWY";
    LateralMode[LateralMode["RWY_TRACK"] = 41] = "RWY_TRACK";
    LateralMode[LateralMode["GA_TRACK"] = 50] = "GA_TRACK";
})(LateralMode || (LateralMode = {}));
var ArmedLateralMode;
(function (ArmedLateralMode) {
    ArmedLateralMode[ArmedLateralMode["NAV"] = 0] = "NAV";
    ArmedLateralMode[ArmedLateralMode["LOC"] = 1] = "LOC";
})(ArmedLateralMode || (ArmedLateralMode = {}));
var VerticalMode;
(function (VerticalMode) {
    VerticalMode[VerticalMode["NONE"] = 0] = "NONE";
    VerticalMode[VerticalMode["ALT"] = 10] = "ALT";
    VerticalMode[VerticalMode["ALT_CPT"] = 11] = "ALT_CPT";
    VerticalMode[VerticalMode["OP_CLB"] = 12] = "OP_CLB";
    VerticalMode[VerticalMode["OP_DES"] = 13] = "OP_DES";
    VerticalMode[VerticalMode["VS"] = 14] = "VS";
    VerticalMode[VerticalMode["FPA"] = 15] = "FPA";
    VerticalMode[VerticalMode["ALT_CST"] = 20] = "ALT_CST";
    VerticalMode[VerticalMode["ALT_CST_CPT"] = 21] = "ALT_CST_CPT";
    VerticalMode[VerticalMode["CLB"] = 22] = "CLB";
    VerticalMode[VerticalMode["DES"] = 23] = "DES";
    VerticalMode[VerticalMode["FINAL"] = 24] = "FINAL";
    VerticalMode[VerticalMode["GS_CPT"] = 30] = "GS_CPT";
    VerticalMode[VerticalMode["GS_TRACK"] = 31] = "GS_TRACK";
    VerticalMode[VerticalMode["LAND"] = 32] = "LAND";
    VerticalMode[VerticalMode["FLARE"] = 33] = "FLARE";
    VerticalMode[VerticalMode["ROLL_OUT"] = 34] = "ROLL_OUT";
    VerticalMode[VerticalMode["SRS"] = 40] = "SRS";
    VerticalMode[VerticalMode["SRS_GA"] = 41] = "SRS_GA";
    VerticalMode[VerticalMode["TCAS"] = 50] = "TCAS";
})(VerticalMode || (VerticalMode = {}));
var ArmedVerticalMode;
(function (ArmedVerticalMode) {
    ArmedVerticalMode[ArmedVerticalMode["ALT"] = 0] = "ALT";
    ArmedVerticalMode[ArmedVerticalMode["ALT_CST"] = 1] = "ALT_CST";
    ArmedVerticalMode[ArmedVerticalMode["CLB"] = 2] = "CLB";
    ArmedVerticalMode[ArmedVerticalMode["DES"] = 3] = "DES";
    ArmedVerticalMode[ArmedVerticalMode["GS"] = 4] = "GS";
    ArmedVerticalMode[ArmedVerticalMode["FINAL"] = 5] = "FINAL";
    ArmedVerticalMode[ArmedVerticalMode["TCAS"] = 6] = "TCAS";
})(ArmedVerticalMode || (ArmedVerticalMode = {}));
function isArmed(bitmask, armedBit) {
    return ((bitmask >> armedBit) & 1) === 1;
}

const TensDigits = (value) => {
    let text;
    if (value < 0) {
        text = (value + 100).toString();
    }
    else if (value >= 100) {
        text = (value - 100).toString().padEnd(2, '0');
    }
    else {
        text = value.toString().padEnd(2, '0');
    }
    return text;
};
const HundredsDigit = (value) => {
    let text;
    if (value < 0) {
        text = (value + 1).toString();
    }
    else if (value >= 10) {
        text = (value - 10).toString();
    }
    else {
        text = value.toString();
    }
    return text;
};
const ThousandsDigit = (value) => {
    let text;
    if (!Number.isNaN(value)) {
        text = (value % 10).toString();
    }
    else {
        text = '';
    }
    return text;
};
const TenThousandsDigit = (value) => {
    let text;
    if (!Number.isNaN(value)) {
        text = value.toString();
    }
    else {
        text = '';
    }
    return text;
};
class DigitalAltitudeReadout extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.mda = 0;
        this.altitude = 0;
        this.fwc1AltAlertPulsing = false;
        this.fwc2AltAlertPulsing = false;
        this.fwc1AltAlertFlashing = false;
        this.fwc2AltAlertFlashing = false;
        this.isNegativeSub = Subject.create('hidden');
        this.colorSub = Subject.create('');
        this.showThousandsZeroSub = Subject.create(false);
        this.tenDigitsSub = Subject.create(0);
        this.hundredsValue = Subject.create(0);
        this.hundredsPosition = Subject.create(0);
        this.thousandsValue = Subject.create(0);
        this.thousandsPosition = Subject.create(0);
        this.tenThousandsValue = Subject.create(0);
        this.tenThousandsPosition = Subject.create(0);
        this.altReadoutOutline = Subject.create('NormalStroke Yellow');
    }
    handleAltAlert() {
        const anyPulsing = this.fwc1AltAlertPulsing || this.fwc2AltAlertPulsing;
        const anyFlashing = this.fwc1AltAlertFlashing || this.fwc2AltAlertFlashing;
        let className = 'NormalStroke Yellow';
        if (anyFlashing) {
            className = 'NormalStroke Amber BlinkInfinite';
        }
        else if (anyPulsing && !anyFlashing) {
            className = 'AltitudeAlertPulse Yellow';
        }
        this.altReadoutOutline.set(className);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('mda').whenChanged().handle((mda) => {
            this.mda = mda;
            this.updateColor();
        });
        sub.on('altitudeAr').handle((altitude) => {
            const isNegative = altitude.value < 0;
            this.isNegativeSub.set(isNegative ? 'visible' : 'hidden');
            this.altitude = altitude.value;
            this.updateColor();
            const absAlt = Math.abs(Math.max(Math.min(altitude.value, 50000), -1500));
            const tensDigits = absAlt % 100;
            this.tenDigitsSub.set(tensDigits);
            const HundredsValue = Math.floor((absAlt / 100) % 10);
            this.hundredsValue.set(HundredsValue);
            let HundredsPosition = 0;
            if (tensDigits > 80) {
                HundredsPosition = tensDigits / 20 - 4;
                this.hundredsPosition.set(HundredsPosition);
            }
            else {
                this.hundredsPosition.set(0);
            }
            const ThousandsValue = Math.floor((absAlt / 1000) % 10);
            this.thousandsValue.set(ThousandsValue);
            let ThousandsPosition = 0;
            if (HundredsValue >= 9) {
                ThousandsPosition = HundredsPosition;
                this.thousandsPosition.set(ThousandsPosition);
            }
            else {
                this.thousandsPosition.set(0);
            }
            const TenThousandsValue = Math.floor((absAlt / 10000) % 10);
            this.tenThousandsValue.set(TenThousandsValue);
            let TenThousandsPosition = 0;
            if (ThousandsValue >= 9) {
                TenThousandsPosition = ThousandsPosition;
            }
            this.tenThousandsPosition.set(TenThousandsPosition);
            const showThousandsZero = TenThousandsValue !== 0;
            this.showThousandsZeroSub.set(showThousandsZero);
        });
        sub.on('fwc1AltAlertPulsing').whenChanged().handle((altAlertPulsing) => {
            this.fwc1AltAlertPulsing = altAlertPulsing;
            this.handleAltAlert();
        });
        sub.on('fwc1AltAlertFlashing').whenChanged().handle((altAlertFlashing) => {
            this.fwc1AltAlertFlashing = altAlertFlashing;
            this.handleAltAlert();
        });
        sub.on('fwc2AltAlertPulsing').whenChanged().handle((altAlertPulsing) => {
            this.fwc2AltAlertPulsing = altAlertPulsing;
            this.handleAltAlert();
        });
        sub.on('fwc2AltAlertFlashing').whenChanged().handle((altAlertFlashing) => {
            this.fwc2AltAlertFlashing = altAlertFlashing;
            this.handleAltAlert();
        });
    }
    updateColor() {
        const color = (this.mda !== 0 && this.altitude < this.mda) ? 'Amber' : 'Green';
        this.colorSub.set(color);
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "AltReadoutGroup" },
            FSComponent.buildComponent("g", null,
                FSComponent.buildComponent("svg", { x: "117.754", y: "76.3374", width: "13.5", height: "8.9706", viewBox: "0 0 13.5 8.9706" },
                    FSComponent.buildComponent(Drum, { type: "ten-thousands", position: this.tenThousandsPosition, value: this.tenThousandsValue, color: this.colorSub, showZero: Subject.create(false), getText: TenThousandsDigit, valueSpacing: 1, distanceSpacing: 7, displayRange: 1, amount: 2 }),
                    FSComponent.buildComponent(Drum, { type: "thousands", position: this.thousandsPosition, value: this.thousandsValue, color: this.colorSub, showZero: this.showThousandsZeroSub, getText: ThousandsDigit, valueSpacing: 1, distanceSpacing: 7, displayRange: 1, amount: 2 }),
                    FSComponent.buildComponent(Drum, { type: "hundreds", position: this.hundredsPosition, value: this.hundredsValue, color: this.colorSub, getText: HundredsDigit, valueSpacing: 1, distanceSpacing: 7, displayRange: 1, amount: 10 })),
                FSComponent.buildComponent("svg", { x: "130.85", y: "73.6664", width: "8.8647", height: "14.313", viewBox: "0 0 8.8647 14.313" },
                    FSComponent.buildComponent(Drum, { type: "tens", amount: 4, position: this.tenDigitsSub, value: this.tenDigitsSub, color: this.colorSub, getText: TensDigits, valueSpacing: 20, distanceSpacing: 4.7, displayRange: 40 }))),
            FSComponent.buildComponent("path", { id: "AltReadoutReducedAccurMarks", class: "NormalStroke Amber", style: "display: none", d: "m132.61 81.669h4.7345m-4.7345-1.6933h4.7345" }),
            FSComponent.buildComponent("path", { id: "AltReadoutOutline", class: this.altReadoutOutline, d: "m117.75 76.337h13.096v-2.671h8.8647v14.313h-8.8647v-2.671h-13.096" }),
            FSComponent.buildComponent("g", { id: "AltNegativeText", class: "FontLarge EndAlign", visibility: this.isNegativeSub },
                FSComponent.buildComponent("text", { class: "White", x: "121.51714", y: "77.956947" }, "N"),
                FSComponent.buildComponent("text", { class: "White", x: "121.7", y: "83.251389" }, "E"),
                FSComponent.buildComponent("text", { class: "White", x: "121.63675", y: "88.486031" }, "G"))));
    }
}
class Drum extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.digitRefElements = [];
        this.position = 0;
        this.value = 0;
        this.color = 'Green';
        this.showZero = true;
        this.gRef = FSComponent.createRef();
    }
    buildElements(amount) {
        const highestPosition = Math.round((this.position + this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing;
        const highestValue = Math.round((this.value + this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing;
        const graduationElements = [];
        for (let i = 0; i < amount; i++) {
            const elementPosition = highestPosition - i * this.props.valueSpacing;
            const offset = -elementPosition * this.props.distanceSpacing / this.props.valueSpacing;
            let elementVal = highestValue - i * this.props.valueSpacing;
            if (!this.showZero && elementVal === 0) {
                elementVal = NaN;
            }
            const digitRef = FSComponent.createRef();
            if (this.props.type === 'hundreds') {
                graduationElements.push(FSComponent.buildComponent("text", { ref: digitRef, transform: `translate(0 ${offset})`, class: `FontLargest MiddleAlign ${this.color}`, x: "11.631", y: "7.1" }));
            }
            else if (this.props.type === 'thousands') {
                graduationElements.push(FSComponent.buildComponent("text", { ref: digitRef, transform: `translate(0 ${offset})`, class: `FontLargest MiddleAlign ${this.color}`, x: "7.18", y: "7.1" }));
            }
            else if (this.props.type === 'ten-thousands') {
                graduationElements.push(FSComponent.buildComponent("text", { ref: digitRef, transform: `translate(0 ${offset})`, class: `FontLargest MiddleAlign ${this.color}`, x: "2.498", y: "7.1" }));
            }
            else if (this.props.type === 'tens') {
                graduationElements.push(FSComponent.buildComponent("text", { ref: digitRef, transform: `translate(0 ${offset})`, class: `FontSmallest MiddleAlign ${this.color}`, x: "4.5894", y: "8.9133" }));
            }
            this.digitRefElements.push(digitRef);
        }
        return graduationElements;
    }
    getOffset(position) {
        const className = `translate(0 ${position * this.props.distanceSpacing / this.props.valueSpacing})`;
        this.gRef.instance.setAttribute('transform', className);
    }
    updateValue() {
        let highestPosition = Math.round((this.position + this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing;
        if (highestPosition > this.position + this.props.displayRange) {
            highestPosition -= this.props.valueSpacing;
        }
        let highestValue = Math.round((this.value + this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing;
        if (highestValue > this.value + this.props.displayRange) {
            highestValue -= this.props.valueSpacing;
        }
        for (let i = 0; i < this.props.amount; i++) {
            let elementVal = highestValue - i * this.props.valueSpacing;
            const elementPosition = highestPosition - i * this.props.valueSpacing;
            const offset = -elementPosition * this.props.distanceSpacing / this.props.valueSpacing;
            if (!this.showZero && elementVal === 0) {
                elementVal = NaN;
            }
            const text = this.props.getText(elementVal);
            this.digitRefElements[i].instance.setAttribute('transform', `translate(0 ${offset})`);
            if (this.digitRefElements[i].instance.textContent !== text) {
                this.digitRefElements[i].instance.textContent = text;
            }
            this.digitRefElements[i].instance.classList.replace('Green', this.color);
            this.digitRefElements[i].instance.classList.replace('Amber', this.color);
        }
    }
    onAfterRender(node) {
        var _a;
        super.onAfterRender(node);
        this.props.position.sub((p) => {
            this.position = p;
            this.getOffset(p);
        }, true);
        this.props.value.sub((p) => {
            this.value = p;
            this.updateValue();
        }, true);
        this.props.color.sub((p) => {
            this.color = p;
            this.updateValue();
        });
        (_a = this.props.showZero) === null || _a === void 0 ? void 0 : _a.sub((p) => {
            this.showZero = p;
            this.updateValue();
        }, true);
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.gRef }, this.buildElements(this.props.amount)));
    }
}

class VerticalTape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.refElement = FSComponent.createRef();
        this.tickRefs = [];
    }
    buildSpeedGraduationPoints() {
        var _a;
        const numTicks = Math.round(this.props.displayRange * 2 / this.props.valueSpacing);
        const clampedValue = Math.max(Math.min(this.props.tapeValue.get(), this.props.upperLimit), this.props.lowerLimit);
        let lowestValue = Math.max(Math.round((clampedValue - this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing, this.props.lowerLimit);
        if (lowestValue < this.props.tapeValue.get() - this.props.displayRange) {
            lowestValue += this.props.valueSpacing;
        }
        const graduationPoints = [];
        for (let i = 0; i < numTicks; i++) {
            const elementValue = lowestValue + i * this.props.valueSpacing;
            if (elementValue <= ((_a = this.props.upperLimit) !== null && _a !== void 0 ? _a : Infinity)) {
                const offset = -elementValue * this.props.distanceSpacing / this.props.valueSpacing;
                const element = { elementValue, offset };
                if (element) {
                    let text = '';
                    if (elementValue % 20 === 0) {
                        text = Math.abs(elementValue).toString().padStart(3, '0');
                    }
                    const tickRef = FSComponent.createRef();
                    graduationPoints.push(FSComponent.buildComponent("g", { ref: tickRef, transform: `translate(0 ${offset})` },
                        FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m19.031 80.818h-2.8206" }),
                        FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "8.0348943", y: "82.936722" }, text)));
                    this.tickRefs.push(tickRef);
                }
            }
        }
        return graduationPoints;
    }
    buildAltitudeGraduationPoints() {
        var _a;
        const numTicks = Math.round(this.props.displayRange * 2 / this.props.valueSpacing);
        const clampedValue = Math.max(Math.min(this.props.tapeValue.get(), this.props.upperLimit), this.props.lowerLimit);
        let lowestValue = Math.max(Math.round((clampedValue - this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing, this.props.lowerLimit);
        if (lowestValue < this.props.tapeValue.get() - this.props.displayRange) {
            lowestValue += this.props.valueSpacing;
        }
        const graduationPoints = [];
        for (let i = 0; i < numTicks; i++) {
            const elementValue = lowestValue + i * this.props.valueSpacing;
            if (elementValue <= ((_a = this.props.upperLimit) !== null && _a !== void 0 ? _a : Infinity)) {
                const offset = -elementValue * this.props.distanceSpacing / this.props.valueSpacing;
                const element = { elementValue, offset };
                if (element) {
                    let text = '';
                    if (elementValue % 500 === 0) {
                        text = (Math.abs(elementValue) / 100).toString().padStart(3, '0');
                    }
                    const tickRef = FSComponent.createRef();
                    graduationPoints.push(FSComponent.buildComponent("g", { ref: tickRef, transform: `translate(0 ${offset}` },
                        FSComponent.buildComponent("path", { class: "NormalStroke White HiddenElement", d: "m115.79 81.889 1.3316-1.0783-1.3316-1.0783" }),
                        FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m130.85 80.819h-2.0147" }),
                        FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "123.28826", y: "82.64006" }, text)));
                    this.tickRefs.push(tickRef);
                }
            }
        }
        return graduationPoints;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.tapeValue.sub((newValue) => {
            var _a, _b, _c;
            const multiplier = 100;
            const currentValueAtPrecision = Math.round(newValue * multiplier) / multiplier;
            const clampedValue = Math.max(Math.min(currentValueAtPrecision, (_a = this.props.upperLimit) !== null && _a !== void 0 ? _a : Infinity), (_b = this.props.lowerLimit) !== null && _b !== void 0 ? _b : -Infinity);
            let lowestValue = Math.max(Math.round((clampedValue - this.props.displayRange) / this.props.valueSpacing) * this.props.valueSpacing, this.props.lowerLimit);
            if (lowestValue < currentValueAtPrecision - this.props.displayRange) {
                lowestValue += this.props.valueSpacing;
            }
            for (let i = 0; i < this.tickRefs.length - 1; i++) {
                const elementValue = lowestValue + i * this.props.valueSpacing;
                if (elementValue <= ((_c = this.props.upperLimit) !== null && _c !== void 0 ? _c : Infinity)) {
                    const offset = -elementValue * this.props.distanceSpacing / this.props.valueSpacing;
                    const element = { elementValue, offset };
                    if (element) {
                        this.tickRefs[i].instance.setAttribute('transform', `translate(0 ${offset})`);
                        let text = '';
                        if (this.props.type === 'speed') {
                            if (elementValue % 20 === 0) {
                                text = Math.abs(elementValue).toString().padStart(3, '0');
                            }
                        }
                        else if (this.props.type === 'altitude') {
                            if (elementValue % 500 === 0) {
                                text = (Math.abs(elementValue) / 100).toString().padStart(3, '0');
                                this.tickRefs[i].instance.getElementsByTagName('path')[0].classList.remove('HiddenElement');
                            }
                            else {
                                this.tickRefs[i].instance.getElementsByTagName('path')[0].classList.add('HiddenElement');
                            }
                        }
                        if (this.tickRefs[i].instance.getElementsByTagName('text')[0].textContent !== text) {
                            this.tickRefs[i].instance.getElementsByTagName('text')[0].textContent = text;
                        }
                    }
                }
            }
            this.refElement.instance.style.transform = `translate3d(0px, ${clampedValue * this.props.distanceSpacing / this.props.valueSpacing}px, 0px)`;
        }, true);
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.refElement },
            this.props.type === 'altitude' && this.buildAltitudeGraduationPoints(),
            this.props.type === 'speed' && this.buildSpeedGraduationPoints(),
            this.props.children));
    }
}

const DisplayRange$3 = 570;
const ValueSpacing$5 = 100;
const DistanceSpacing$5 = 7.5;
class LandingElevationIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.landingElevationIndicator = FSComponent.createRef();
        this.altitude = 0;
        this.landingElevation = new Arinc429Word(0);
        this.flightPhase = 0;
        this.delta = 0;
    }
    handleLandingElevation() {
        const landingElevationValid = !this.landingElevation.isFailureWarning() && !this.landingElevation.isNoComputedData();
        const delta = this.altitude - this.landingElevation.value;
        const offset = (delta - DisplayRange$3) * DistanceSpacing$5 / ValueSpacing$5;
        this.delta = delta;
        if (delta > DisplayRange$3 || (this.flightPhase !== 7 && this.flightPhase !== 8) || !landingElevationValid) {
            this.landingElevationIndicator.instance.classList.add('HiddenElement');
        }
        else {
            this.landingElevationIndicator.instance.classList.remove('HiddenElement');
        }
        this.landingElevationIndicator.instance.setAttribute('d', `m130.85 123.56h-13.096v${offset}h13.096z`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fwcFlightPhase').whenChanged().handle((fp) => {
            this.flightPhase = fp;
            if ((fp !== 7 && fp !== 8) || this.delta > DisplayRange$3) {
                this.landingElevationIndicator.instance.classList.add('HiddenElement');
            }
            else {
                this.landingElevationIndicator.instance.classList.remove('HiddenElement');
            }
        });
        sub.on('landingElevation').whenChanged().handle((le) => {
            this.landingElevation = le;
            this.handleLandingElevation();
        });
        sub.on('altitudeAr').handle((a) => {
            this.altitude = a.value;
            this.handleLandingElevation();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { ref: this.landingElevationIndicator, id: "AltTapeLandingElevation", class: "EarthFill" }));
    }
}
class RadioAltIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.visibilitySub = Subject.create('hidden');
        this.offsetSub = Subject.create('');
        this.radioAltitude = new Arinc429Word(0);
    }
    setOffset() {
        if (this.props.filteredRadioAltitude.get() > DisplayRange$3 || this.radioAltitude.isFailureWarning() || this.radioAltitude.isNoComputedData()) {
            this.visibilitySub.set('hidden');
        }
        else {
            this.visibilitySub.set('visible');
            const offset = (this.props.filteredRadioAltitude.get() - DisplayRange$3) * DistanceSpacing$5 / ValueSpacing$5;
            this.offsetSub.set(`m131.15 123.56h2.8709v${offset}h-2.8709z`);
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        this.props.filteredRadioAltitude.sub((_filteredRadioAltitude) => {
            this.setOffset();
        }, true);
        sub.on('chosenRa').handle((ra) => {
            this.radioAltitude = ra;
            this.setOffset();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { visibility: this.visibilitySub, id: "AltTapeGroundReference", class: "Fill Red", d: this.offsetSub }));
    }
}
class MinimumDescentAltitudeIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.visibility = Subject.create('hidden');
        this.path = Subject.create('');
        this.altitude = 0;
        this.radioAltitudeValid = false;
        this.qnhLandingAltValid = false;
        this.qfeLandingAltValid = false;
        this.inLandingPhases = false;
        this.altMode = 'STD';
        this.mda = new Arinc429Word(0);
        this.landingElevation = new Arinc429Word(0);
    }
    updateIndication() {
        this.qnhLandingAltValid = !this.landingElevation.isFailureWarning()
            && !this.landingElevation.isNoComputedData()
            && this.inLandingPhases
            && this.altMode === 'QNH';
        this.qfeLandingAltValid = this.inLandingPhases
            && this.altMode === 'QFE';
        const altDelta = this.mda.value - this.altitude;
        const showMda = (this.radioAltitudeValid || this.qnhLandingAltValid || this.qfeLandingAltValid)
            && Math.abs(altDelta) <= 570
            && !this.mda.isFailureWarning()
            && !this.mda.isNoComputedData();
        if (!showMda) {
            this.visibility.set('hidden');
            return;
        }
        const offset = altDelta * DistanceSpacing$5 / ValueSpacing$5;
        this.path.set(`m 127.9276,${80.249604 - offset} h 5.80948 v 1.124908 h -5.80948 z`);
        this.visibility.set('visible');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('chosenRa').whenArinc429SsmChanged().handle((ra) => {
            this.radioAltitudeValid = !ra.isFailureWarning() && !ra.isNoComputedData();
            this.updateIndication();
        });
        sub.on('landingElevation').withArinc429Precision(0).handle((landingElevation) => {
            this.landingElevation = landingElevation;
            this.updateIndication();
        });
        sub.on('baroMode').whenChanged().handle((m) => {
            this.altMode = m;
            this.updateIndication();
        });
        sub.on('altitudeAr').withArinc429Precision(0).handle((a) => {
            // TODO filtered alt
            this.altitude = a.value;
            this.updateIndication();
        });
        sub.on('mda').whenChanged().handle((mda) => {
            // TODO get a real word
            this.mda.value = mda;
            this.mda.ssm = mda > 0 ? Arinc429Word.SignStatusMatrix.NormalOperation : Arinc429Word.SignStatusMatrix.NoComputedData;
            this.updateIndication();
        });
        sub.on('fwcFlightPhase').whenChanged().handle((fp) => {
            this.inLandingPhases = fp === 7 || fp === 8;
            this.updateIndication();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { visibility: this.visibility, id: "AltTapeMdaIndicator", class: "Fill Amber", d: this.path }));
    }
}
class AltitudeIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.subscribable = Subject.create(0);
        this.tapeRef = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const pf = this.props.bus.getSubscriber();
        pf.on('altitudeAr').handle((a) => {
            if (a.isNormalOperation()) {
                this.subscribable.set(a.value);
                this.tapeRef.instance.style.display = 'inline';
            }
            else {
                this.tapeRef.instance.style.display = 'none';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "AltitudeTape" },
            FSComponent.buildComponent(AltTapeBackground, null),
            FSComponent.buildComponent(LandingElevationIndicator, { bus: this.props.bus }),
            FSComponent.buildComponent("g", { ref: this.tapeRef },
                FSComponent.buildComponent(VerticalTape, { displayRange: DisplayRange$3 + 60, valueSpacing: ValueSpacing$5, distanceSpacing: DistanceSpacing$5, lowerLimit: -1500, upperLimit: 50000, tapeValue: this.subscribable, type: "altitude" }))));
    }
}
class AltTapeBackground extends DisplayComponent {
    render() {
        return (FSComponent.buildComponent("path", { id: "AltTapeBackground", d: "m130.85 123.56h-13.096v-85.473h13.096z", class: "TapeBackground" }));
    }
}
class AltitudeIndicatorOfftape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.abnormal = FSComponent.createRef();
        this.tcasFailed = FSComponent.createRef();
        this.normal = FSComponent.createRef();
        this.altitude = Subject.create(0);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('altitudeAr').handle((altitude) => {
            if (!altitude.isNormalOperation()) {
                this.normal.instance.style.display = 'none';
                this.abnormal.instance.removeAttribute('style');
            }
            else {
                this.altitude.set(altitude.value);
                this.abnormal.instance.style.display = 'none';
                this.normal.instance.removeAttribute('style');
            }
        });
        sub.on('tcasFail').whenChanged().handle((tcasFailed) => {
            if (tcasFailed) {
                this.tcasFailed.instance.style.display = 'inline';
            }
            else {
                this.tcasFailed.instance.style.display = 'none';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { ref: this.abnormal, style: "display: none" },
                FSComponent.buildComponent("path", { id: "AltTapeOutline", class: "NormalStroke Red", d: "m117.75 123.56h13.096v-85.473h-13.096" }),
                FSComponent.buildComponent("path", { id: "AltReadoutBackground", class: "BlackFill", d: "m131.35 85.308h-13.63v-8.9706h13.63z" }),
                FSComponent.buildComponent("text", { id: "AltFailText", class: "Blink9Seconds FontLargest Red EndAlign", x: "131.16769", y: "83.433167" }, "ALT")),
            FSComponent.buildComponent("g", { ref: this.tcasFailed, style: "display: none" },
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontMedium Amber EndAlign", x: "141.5", y: "100" }, "T"),
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontMedium Amber EndAlign", x: "141.5", y: "105" }, "C"),
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontMedium Amber EndAlign", x: "141.5", y: "110" }, "A"),
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontMedium Amber EndAlign", x: "141.5", y: "115" }, "S")),
            FSComponent.buildComponent("g", { ref: this.normal, style: "display: none" },
                FSComponent.buildComponent("path", { id: "AltTapeOutline", class: "NormalStroke White", d: "m117.75 123.56h17.83m-4.7345-85.473v85.473m-13.096-85.473h17.83" }),
                FSComponent.buildComponent(MinimumDescentAltitudeIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent(SelectedAltIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent(AltimeterIndicator, { bus: this.props.bus, altitude: this.altitude }),
                FSComponent.buildComponent(MetricAltIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent("path", { id: "AltReadoutBackground", class: "BlackFill", d: "m130.85 85.308h-13.13v-8.9706h13.13v-2.671h8.8647v14.313h-8.8647z" }),
                FSComponent.buildComponent(RadioAltIndicator, { bus: this.props.bus, filteredRadioAltitude: this.props.filteredRadioAltitude }),
                FSComponent.buildComponent(DigitalAltitudeReadout, { bus: this.props.bus }))));
    }
}
class SelectedAltIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.mode = 'QNH';
        this.selectedAltLowerGroupRef = FSComponent.createRef();
        this.selectedAltLowerText = FSComponent.createRef();
        this.selectedAltLowerFLText = FSComponent.createRef();
        this.selectedAltUpperGroupRef = FSComponent.createRef();
        this.selectedAltUpperText = FSComponent.createRef();
        this.selectedAltUpperFLText = FSComponent.createRef();
        this.targetGroupRef = FSComponent.createRef();
        this.blackFill = FSComponent.createRef();
        this.targetSymbolRef = FSComponent.createRef();
        this.altTapeTargetText = FSComponent.createRef();
        this.altitude = new Arinc429Word(0);
        this.targetAltitudeSelected = 0;
        this.shownTargetAltitude = 0;
        this.constraint = 0;
        this.textSub = Subject.create('');
        this.isManaged = false;
        this.activeVerticalMode = 0;
    }
    handleAltManagedChange() {
        // TODO find proper logic for this (what happens when a constraint is sent by the fms but vertical mode is not managed)
        const clbActive = this.activeVerticalMode !== VerticalMode.OP_CLB && this.activeVerticalMode !== VerticalMode.OP_DES
            && this.activeVerticalMode !== VerticalMode.VS && this.activeVerticalMode !== VerticalMode.FPA;
        const selectedAltIgnored = this.activeVerticalMode >= VerticalMode.GS_CPT && this.activeVerticalMode < VerticalMode.ROLL_OUT || this.activeVerticalMode === VerticalMode.FINAL;
        this.isManaged = this.constraint > 0 && clbActive;
        this.shownTargetAltitude = this.updateTargetAltitude(this.targetAltitudeSelected, this.isManaged, this.constraint);
        if (selectedAltIgnored) {
            this.selectedAltLowerFLText.instance.classList.remove('Cyan');
            this.selectedAltLowerFLText.instance.classList.remove('Magenta');
            this.selectedAltLowerFLText.instance.classList.add('White');
            this.selectedAltLowerText.instance.classList.remove('Cyan');
            this.selectedAltLowerText.instance.classList.remove('Magenta');
            this.selectedAltLowerText.instance.classList.add('White');
            this.selectedAltUpperFLText.instance.classList.remove('Cyan');
            this.selectedAltUpperFLText.instance.classList.remove('Magenta');
            this.selectedAltUpperFLText.instance.classList.add('White');
            this.selectedAltUpperText.instance.classList.remove('Cyan');
            this.selectedAltUpperText.instance.classList.remove('Magenta');
            this.selectedAltUpperText.instance.classList.add('White');
            this.altTapeTargetText.instance.classList.remove('Cyan');
            this.altTapeTargetText.instance.classList.add('White');
            this.targetSymbolRef.instance.classList.remove('Cyan');
            this.targetSymbolRef.instance.classList.remove('Magenta');
            this.targetSymbolRef.instance.classList.add('White');
        }
        else if (this.isManaged) {
            this.selectedAltLowerFLText.instance.classList.remove('Cyan');
            this.selectedAltLowerFLText.instance.classList.remove('White');
            this.selectedAltLowerFLText.instance.classList.add('Magenta');
            this.selectedAltLowerText.instance.classList.remove('Cyan');
            this.selectedAltLowerText.instance.classList.remove('White');
            this.selectedAltLowerText.instance.classList.add('Magenta');
            this.selectedAltUpperFLText.instance.classList.remove('Cyan');
            this.selectedAltUpperFLText.instance.classList.remove('White');
            this.selectedAltUpperFLText.instance.classList.add('Magenta');
            this.selectedAltUpperText.instance.classList.remove('Cyan');
            this.selectedAltUpperText.instance.classList.remove('White');
            this.selectedAltUpperText.instance.classList.add('Magenta');
            this.altTapeTargetText.instance.classList.remove('Cyan');
            this.altTapeTargetText.instance.classList.remove('White');
            this.altTapeTargetText.instance.classList.add('Magenta');
            this.targetSymbolRef.instance.classList.remove('Cyan');
            this.targetSymbolRef.instance.classList.remove('White');
            this.targetSymbolRef.instance.classList.add('Magenta');
        }
        else {
            this.selectedAltLowerFLText.instance.classList.add('Cyan');
            this.selectedAltLowerFLText.instance.classList.remove('Magenta');
            this.selectedAltLowerFLText.instance.classList.remove('White');
            this.selectedAltLowerText.instance.classList.add('Cyan');
            this.selectedAltLowerText.instance.classList.remove('Magenta');
            this.selectedAltLowerText.instance.classList.remove('White');
            this.selectedAltUpperFLText.instance.classList.add('Cyan');
            this.selectedAltUpperFLText.instance.classList.remove('Magenta');
            this.selectedAltUpperFLText.instance.classList.remove('White');
            this.selectedAltUpperText.instance.classList.add('Cyan');
            this.selectedAltUpperText.instance.classList.remove('Magenta');
            this.selectedAltUpperText.instance.classList.remove('White');
            this.altTapeTargetText.instance.classList.add('Cyan');
            this.altTapeTargetText.instance.classList.remove('Magenta');
            this.altTapeTargetText.instance.classList.remove('White');
            this.targetSymbolRef.instance.classList.add('Cyan');
            this.targetSymbolRef.instance.classList.remove('Magenta');
            this.targetSymbolRef.instance.classList.remove('White');
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('activeVerticalMode').whenChanged().handle((v) => {
            this.activeVerticalMode = v;
            this.handleAltManagedChange();
            this.getOffset();
            this.handleAltitudeDisplay();
            this.setText();
        });
        sub.on('selectedAltitude').whenChanged().handle((m) => {
            this.targetAltitudeSelected = m;
            this.handleAltManagedChange();
            this.getOffset();
            this.handleAltitudeDisplay();
            this.setText();
        });
        sub.on('altConstraint').whenChanged().handle((m) => {
            this.constraint = m;
            this.handleAltManagedChange();
            this.getOffset();
            this.handleAltitudeDisplay();
            this.setText();
        });
        sub.on('altitudeAr').withArinc429Precision(2).handle((a) => {
            this.altitude = a;
            this.handleAltitudeDisplay();
            this.getOffset();
        });
        sub.on('baroMode').whenChanged().handle((m) => {
            this.mode = m;
            if (this.mode === 'STD') {
                this.selectedAltLowerFLText.instance.style.visibility = 'visible';
                this.selectedAltUpperFLText.instance.style.visibility = 'visible';
            }
            else {
                this.selectedAltLowerFLText.instance.style.visibility = 'hidden';
                this.selectedAltUpperFLText.instance.style.visibility = 'hidden';
            }
            this.handleAltitudeDisplay();
            this.setText();
        });
    }
    updateTargetAltitude(targetAltitude, isManaged, constraint) {
        return isManaged ? constraint : targetAltitude;
    }
    handleAltitudeDisplay() {
        if (this.altitude.value - this.shownTargetAltitude > DisplayRange$3) {
            this.selectedAltLowerGroupRef.instance.style.display = 'block';
            this.selectedAltUpperGroupRef.instance.style.display = 'none';
            this.targetGroupRef.instance.style.display = 'none';
        }
        else if (this.altitude.value - this.shownTargetAltitude < -DisplayRange$3) {
            this.targetGroupRef.instance.style.display = 'none';
            this.selectedAltUpperGroupRef.instance.style.display = 'block';
            this.selectedAltLowerGroupRef.instance.style.display = 'none';
        }
        else {
            this.selectedAltUpperGroupRef.instance.style.display = 'none';
            this.selectedAltLowerGroupRef.instance.style.display = 'none';
            this.targetGroupRef.instance.style.display = 'inline';
        }
    }
    setText() {
        let boxLength = 19.14;
        let text = '0';
        if (this.mode === 'STD') {
            text = Math.round(this.shownTargetAltitude / 100).toString().padStart(3, '0');
            boxLength = 12.5;
        }
        else {
            text = Math.round(this.shownTargetAltitude).toString().padStart(5, ' ');
        }
        this.textSub.set(text);
        this.blackFill.instance.setAttribute('d', `m117.75 77.784h${boxLength}v6.0476h-${boxLength}z`);
    }
    getOffset() {
        const offset = (this.altitude.value - this.shownTargetAltitude) * DistanceSpacing$5 / ValueSpacing$5;
        this.targetGroupRef.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "SelectedAltLowerGroup", ref: this.selectedAltLowerGroupRef },
                FSComponent.buildComponent("text", { id: "SelectedAltLowerText", ref: this.selectedAltLowerText, class: "FontMedium EndAlign Cyan", x: "135.7511", y: "128.70299", style: "white-space: pre" }, this.textSub),
                FSComponent.buildComponent("text", { id: "SelectedAltLowerFLText", ref: this.selectedAltLowerFLText, class: "FontSmall MiddleAlign Cyan", x: "120.87094", y: "128.71681" }, "FL")),
            FSComponent.buildComponent("g", { id: "SelectedAltUpperGroup", ref: this.selectedAltUpperGroupRef },
                FSComponent.buildComponent("text", { id: "SelectedAltUpperText", ref: this.selectedAltUpperText, class: "FontMedium EndAlign Cyan", x: "136.22987", y: "37.250134", style: "white-space: pre" }, this.textSub),
                FSComponent.buildComponent("text", { id: "SelectedAltUpperFLText", ref: this.selectedAltUpperFLText, class: "FontSmall MiddleAlign Cyan", x: "120.85925", y: "37.125755" }, "FL")),
            FSComponent.buildComponent("g", { id: "AltTapeTargetSymbol", ref: this.targetGroupRef },
                FSComponent.buildComponent("path", { class: "BlackFill", ref: this.blackFill }),
                FSComponent.buildComponent("path", { class: "NormalStroke Cyan", ref: this.targetSymbolRef, d: "m122.79 83.831v6.5516h-7.0514v-8.5675l2.0147-1.0079m4.8441-3.0238v-6.5516h-6.8588v8.5675l2.0147 1.0079" }),
                FSComponent.buildComponent("text", { id: "AltTapeTargetText", ref: this.altTapeTargetText, class: "FontMedium StartAlign Cyan", x: "118.228", y: "83.067062", style: "white-space: pre" }, this.textSub))));
    }
}
class AltimeterIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.mode = Subject.create('');
        this.text = Subject.create('');
        this.pressure = 0;
        this.unit = '';
        this.transAlt = 0;
        this.transAltAppr = 0;
        this.flightPhase = 0;
        this.stdGroup = FSComponent.createRef();
        this.qfeGroup = FSComponent.createRef();
        this.qfeBorder = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('baroMode').whenChanged().handle((m) => {
            if (m === 'QFE') {
                this.mode.set(m);
                this.stdGroup.instance.classList.add('HiddenElement');
                this.qfeGroup.instance.classList.remove('HiddenElement');
                this.qfeBorder.instance.classList.remove('HiddenElement');
            }
            else if (m === 'QNH') {
                this.mode.set(m);
                this.stdGroup.instance.classList.add('HiddenElement');
                this.qfeGroup.instance.classList.remove('HiddenElement');
                this.qfeBorder.instance.classList.add('HiddenElement');
            }
            else if (m === 'STD') {
                this.mode.set(m);
                this.stdGroup.instance.classList.remove('HiddenElement');
                this.qfeGroup.instance.classList.add('HiddenElement');
                this.qfeBorder.instance.classList.add('HiddenElement');
            }
            else {
                this.mode.set(m);
                this.stdGroup.instance.classList.add('HiddenElement');
                this.qfeGroup.instance.classList.add('HiddenElement');
                this.qfeBorder.instance.classList.add('HiddenElement');
            }
            this.getText();
        });
        sub.on('fmgcFlightPhase').whenChanged().handle((fp) => {
            this.flightPhase = fp;
            this.handleBlink();
        });
        sub.on('transAlt').whenChanged().handle((ta) => {
            this.transAlt = ta;
            this.handleBlink();
            this.getText();
        });
        sub.on('transAltAppr').whenChanged().handle((ta) => {
            this.transAltAppr = ta;
            this.handleBlink();
            this.getText();
        });
        sub.on('units').whenChanged().handle((u) => {
            this.unit = u;
            this.getText();
        });
        sub.on('pressure').whenChanged().handle((p) => {
            this.pressure = p;
            this.getText();
        });
        this.props.altitude.sub((_a) => {
            this.handleBlink();
        });
    }
    handleBlink() {
        if (this.mode.get() === 'STD') {
            if (this.flightPhase > 3 && this.transAltAppr > this.props.altitude.get() && this.transAltAppr !== 0) {
                this.stdGroup.instance.classList.add('BlinkInfinite');
            }
            else {
                this.stdGroup.instance.classList.remove('BlinkInfinite');
            }
        }
        else if (this.flightPhase <= 3 && this.transAlt < this.props.altitude.get() && this.transAlt !== 0) {
            this.qfeGroup.instance.classList.add('BlinkInfinite');
        }
        else {
            this.qfeGroup.instance.classList.remove('BlinkInfinite');
        }
    }
    getText() {
        if (this.pressure !== null) {
            if (this.unit === 'millibar') {
                this.text.set(Math.round(this.pressure).toString());
            }
            else {
                this.text.set(this.pressure.toFixed(2));
            }
        }
        else {
            this.text.set('');
        }
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { ref: this.stdGroup, id: "STDAltimeterModeGroup" },
                FSComponent.buildComponent("path", { class: "NormalStroke Yellow", d: "m124.79 131.74h13.096v7.0556h-13.096z" }),
                FSComponent.buildComponent("text", { class: "FontMedium Cyan AlignLeft", x: "125.75785", y: "137.36" }, "STD")),
            FSComponent.buildComponent("g", { id: "AltimeterGroup" },
                FSComponent.buildComponent("g", { ref: this.qfeGroup, id: "QFEGroup" },
                    FSComponent.buildComponent("path", { ref: this.qfeBorder, class: "NormalStroke White", d: "m 116.83686,133.0668 h 13.93811 v 5.8933 h -13.93811 z" }),
                    FSComponent.buildComponent("text", { id: "AltimeterModeText", class: "FontMedium White", x: "118.23066", y: "138.11342" }, this.mode),
                    FSComponent.buildComponent("text", { id: "AltimeterSettingText", class: "FontMedium MiddleAlign Cyan", x: "141.25583", y: "138.09006" }, this.text)))));
    }
}
class MetricAltIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.needsUpdate = false;
        this.metricAlt = FSComponent.createRef();
        this.metricAltText = FSComponent.createRef();
        this.metricAltTargetText = FSComponent.createRef();
        this.state = {
            altitude: new Arinc429Word(0),
            MDA: 0,
            targetAltSelected: 0,
            targetAltManaged: 0,
            altIsManaged: false,
            metricAltToggle: false,
        };
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('mda').whenChanged().handle((mda) => {
            this.state.MDA = mda;
            this.needsUpdate = true;
        });
        sub.on('altitudeAr').handle((a) => {
            this.state.altitude = a;
            this.needsUpdate = true;
        });
        sub.on('selectedAltitude').whenChanged().handle((m) => {
            this.state.targetAltSelected = m;
            this.needsUpdate = true;
        });
        sub.on('altConstraint').handle((m) => {
            this.state.targetAltManaged = m;
            this.needsUpdate = true;
        });
        sub.on('metricAltToggle').whenChanged().handle((m) => {
            this.state.metricAltToggle = m;
            this.needsUpdate = true;
        });
        sub.on('realTime').handle(this.updateState.bind(this));
    }
    updateState(_time) {
        if (this.needsUpdate) {
            this.needsUpdate = false;
            const showMetricAlt = this.state.metricAltToggle;
            if (!showMetricAlt) {
                this.metricAlt.instance.style.display = 'none';
            }
            else {
                this.metricAlt.instance.style.display = 'inline';
                const currentMetricAlt = Math.round(this.state.altitude.value * 0.3048 / 10) * 10;
                this.metricAltText.instance.textContent = currentMetricAlt.toString();
                const targetMetric = Math.round((this.state.altIsManaged ? this.state.targetAltManaged : this.state.targetAltSelected) * 0.3048 / 10) * 10;
                this.metricAltTargetText.instance.textContent = targetMetric.toString();
                if (this.state.altIsManaged) {
                    this.metricAltTargetText.instance.classList.replace('Cyan', 'Magenta');
                }
                else {
                    this.metricAltTargetText.instance.classList.replace('Magenta', 'Cyan');
                }
                if (this.state.altitude.value > this.state.MDA) {
                    this.metricAltText.instance.classList.replace('Green', 'Amber');
                }
                else {
                    this.metricAltText.instance.classList.replace('Amber', 'Green');
                }
            }
        }
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "MetricAltGroup", ref: this.metricAlt },
            FSComponent.buildComponent("path", { class: "NormalStroke Yellow", d: "m116.56 140.22h29.213v7.0556h-29.213z" }),
            FSComponent.buildComponent("text", { class: "FontMedium Cyan MiddleAlign", x: "142.03537", y: "145.8689" }, "M"),
            FSComponent.buildComponent("text", { ref: this.metricAltText, id: "MetricAltText", class: "FontMedium Cyan MiddleAlign", x: "128.64708", y: "145.86191" }, "0"),
            FSComponent.buildComponent("g", { id: "MetricAltTargetGroup" },
                FSComponent.buildComponent("text", { id: "MetricAltTargetText", ref: this.metricAltTargetText, class: "FontSmallest Green MiddleAlign", x: "94.088852", y: "37.926617" }, "0"),
                FSComponent.buildComponent("text", { class: "FontSmallest Cyan MiddleAlign", x: "105.25774", y: "37.872921" }, "M"))));
    }
}

const DistanceSpacing$4 = 15;
const ValueSpacing$4 = 10;
class FlightPathDirector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.data = {
            roll: new Arinc429Word(0),
            pitch: new Arinc429Word(0),
            fpa: new Arinc429Word(0),
            da: new Arinc429Word(0),
            fdPitch: 0,
            fdRoll: 0,
            fdActive: true,
            activeLateralMode: 0,
            activeVerticalMode: 0,
        };
        this.isTrkFpaActive = false;
        this.needsUpdate = false;
        this.isVisible = false;
        this.birdPath = FSComponent.createRef();
        this.birdPathWings = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fd1Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 1) {
                this.data.fdActive = fd;
                this.needsUpdate = true;
            }
        });
        sub.on('fd2Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 2) {
                this.data.fdActive = fd;
                this.needsUpdate = true;
            }
        });
        sub.on('trkFpaActive').whenChanged().handle((a) => {
            this.isTrkFpaActive = a;
            this.needsUpdate = true;
        });
        sub.on('fpa').handle((fpa) => {
            this.data.fpa = fpa;
            this.needsUpdate = true;
        });
        sub.on('da').handle((da) => {
            this.data.da = da;
            this.needsUpdate = true;
        });
        sub.on('activeVerticalMode').whenChanged().handle((vm) => {
            this.data.activeLateralMode = vm;
            this.needsUpdate = true;
        });
        sub.on('activeLateralMode').whenChanged().handle((lm) => {
            this.data.activeLateralMode = lm;
            this.needsUpdate = true;
        });
        sub.on('fdPitch').handle((fdp) => {
            this.data.fdPitch = fdp;
            this.needsUpdate = true;
        });
        sub.on('fdBank').handle((fdr) => {
            this.data.fdRoll = fdr;
            this.needsUpdate = true;
        });
        sub.on('rollAr').handle((r) => {
            this.data.roll = r;
            this.needsUpdate = true;
        });
        sub.on('pitchAr').handle((p) => {
            this.data.pitch = p;
            this.needsUpdate = true;
        });
        sub.on('realTime').handle((_t) => {
            this.handlePath();
            if (this.needsUpdate && this.isVisible) {
                this.moveBird();
            }
        });
        this.props.isAttExcessive.sub((_a) => {
            this.needsUpdate = true;
        }, true);
    }
    handlePath() {
        const showLateralFD = this.data.activeLateralMode !== 0 && this.data.activeLateralMode !== 34 && this.data.activeLateralMode !== 40;
        const showVerticalFD = this.data.activeVerticalMode !== 0 && this.data.activeVerticalMode !== 34;
        const daAndFpaValid = this.data.fpa.isNormalOperation() && this.data.da.isNormalOperation();
        if (!showVerticalFD && !showLateralFD || !this.isTrkFpaActive
            || !this.data.fdActive || !daAndFpaValid || this.props.isAttExcessive.get()) {
            this.birdPath.instance.style.visibility = 'hidden';
            this.isVisible = false;
        }
        else {
            this.birdPath.instance.style.visibility = 'visible';
            this.isVisible = true;
        }
    }
    moveBird() {
        if (this.data.fdActive && this.isTrkFpaActive) {
            const FDRollOrder = this.data.fdRoll;
            const FDRollOrderLim = Math.max(Math.min(FDRollOrder, 45), -45);
            const FDPitchOrder = this.data.fdPitch;
            const FDPitchOrderLim = Math.max(Math.min(FDPitchOrder, 22.5), -22.5) * 1.9;
            const daLimConv = Math.max(Math.min(this.data.da.value, 21), -21) * DistanceSpacing$4 / ValueSpacing$4;
            const pitchSubFpaConv = (calculateHorizonOffsetFromPitch(this.data.pitch.value) - calculateHorizonOffsetFromPitch(this.data.fpa.value));
            const rollCos = Math.cos(this.data.roll.value * Math.PI / 180);
            const rollSin = Math.sin(-this.data.roll.value * Math.PI / 180);
            const FDRollOffset = FDRollOrderLim * 0.77;
            const xOffsetFpv = daLimConv * rollCos - pitchSubFpaConv * rollSin;
            const yOffsetFpv = pitchSubFpaConv * rollCos + daLimConv * rollSin;
            const xOffset = xOffsetFpv - FDPitchOrderLim * rollSin;
            const yOffset = yOffsetFpv + FDPitchOrderLim * rollCos;
            this.birdPath.instance.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0px)`;
            this.birdPathWings.instance.setAttribute('transform', `rotate(${FDRollOffset} 15.5 15.5)`);
        }
        this.needsUpdate = false;
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.birdPath },
            FSComponent.buildComponent("svg", { x: "53.4", y: "65.3", width: "31px", height: "31px", version: "1.1", viewBox: "0 0 31 31", xmlns: "http://www.w3.org/2000/svg" },
                FSComponent.buildComponent("g", { ref: this.birdPathWings, class: "CornerRound" },
                    FSComponent.buildComponent("path", { class: "NormalOutline", 
                        // eslint-disable-next-line max-len
                        d: "m16.507 15.501a1.0074 1.008 0 1 0-2.0147 0 1.0074 1.008 0 1 0 2.0147 0zm7.5551 0 6.5478-1.5119v3.0238l-6.5478-1.5119m-17.125 0-6.5478-1.5119v3.0238l6.5478-1.5119h17.125" }),
                    FSComponent.buildComponent("path", { class: "NormalStroke Green", 
                        // eslint-disable-next-line max-len
                        d: "m16.507 15.501a1.0074 1.008 0 1 0-2.0147 0 1.0074 1.008 0 1 0 2.0147 0zm7.5551 0 6.5478-1.5119v3.0238l-6.5478-1.5119m-17.125 0-6.5478-1.5119v3.0238l6.5478-1.5119h17.125" })))));
    }
}

const DistanceSpacing$3 = 15;
const ValueSpacing$3 = 10;
class FlightPathVector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.bird = FSComponent.createRef();
        this.fpvFlag = FSComponent.createRef();
        this.isTrkFpaActive = false;
        this.data = {
            roll: new Arinc429Word(0),
            pitch: new Arinc429Word(0),
            fpa: new Arinc429Word(0),
            da: new Arinc429Word(0),
        };
        this.needsUpdate = false;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('trkFpaActive').whenChanged().handle((a) => {
            this.isTrkFpaActive = a;
            if (this.isTrkFpaActive) {
                this.moveBird();
                this.bird.instance.classList.remove('HiddenElement');
            }
            else {
                this.bird.instance.classList.add('HiddenElement');
            }
        });
        sub.on('fpa').handle((fpa) => {
            this.data.fpa = fpa;
            this.needsUpdate = true;
        });
        sub.on('da').handle((da) => {
            this.data.da = da;
            this.needsUpdate = true;
        });
        sub.on('rollAr').handle((r) => {
            this.data.roll = r;
            this.needsUpdate = true;
        });
        sub.on('pitchAr').handle((p) => {
            this.data.pitch = p;
            this.needsUpdate = true;
        });
        sub.on('realTime').handle((_t) => {
            if (this.needsUpdate) {
                this.needsUpdate = false;
                const daAndFpaValid = this.data.fpa.isNormalOperation() && this.data.da.isNormalOperation();
                if (this.isTrkFpaActive && daAndFpaValid) {
                    this.fpvFlag.instance.style.visibility = 'hidden';
                    this.bird.instance.classList.remove('HiddenElement');
                    this.moveBird();
                }
                else if (this.isTrkFpaActive && this.data.pitch.isNormalOperation() && this.data.roll.isNormalOperation()) {
                    this.fpvFlag.instance.style.visibility = 'visible';
                    this.bird.instance.classList.add('HiddenElement');
                }
            }
        });
    }
    moveBird() {
        const daLimConv = Math.max(Math.min(this.data.da.value, 21), -21) * DistanceSpacing$3 / ValueSpacing$3;
        const pitchSubFpaConv = (calculateHorizonOffsetFromPitch(this.data.pitch.value) - calculateHorizonOffsetFromPitch(this.data.fpa.value));
        const rollCos = Math.cos(this.data.roll.value * Math.PI / 180);
        const rollSin = Math.sin(-this.data.roll.value * Math.PI / 180);
        const xOffset = daLimConv * rollCos - pitchSubFpaConv * rollSin;
        const yOffset = pitchSubFpaConv * rollCos + daLimConv * rollSin;
        this.bird.instance.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0px)`;
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { ref: this.bird, id: "bird" },
                FSComponent.buildComponent("svg", { x: "53.4", y: "65.3", width: "31px", height: "31px", version: "1.1", viewBox: "0 0 31 31", xmlns: "http://www.w3.org/2000/svg" },
                    FSComponent.buildComponent("g", null,
                        FSComponent.buildComponent("path", { class: "NormalOutline", 
                            // eslint-disable-next-line max-len
                            d: "m17.766 15.501c8.59e-4 -1.2531-1.0142-2.2694-2.2665-2.2694-1.2524 0-2.2674 1.0163-2.2665 2.2694-8.57e-4 1.2531 1.0142 2.2694 2.2665 2.2694 1.2524 0 2.2674-1.0163 2.2665-2.2694z" }),
                        FSComponent.buildComponent("path", { class: "ThickOutline", d: "m17.766 15.501h5.0367m-9.5698 0h-5.0367m7.3033-2.2678v-2.5199" }),
                        FSComponent.buildComponent("path", { class: "NormalStroke Green", 
                            // eslint-disable-next-line max-len
                            d: "m17.766 15.501c8.59e-4 -1.2531-1.0142-2.2694-2.2665-2.2694-1.2524 0-2.2674 1.0163-2.2665 2.2694-8.57e-4 1.2531 1.0142 2.2694 2.2665 2.2694 1.2524 0 2.2674-1.0163 2.2665-2.2694z" }),
                        FSComponent.buildComponent("path", { class: "ThickStroke Green", d: "m17.766 15.501h5.0367m-9.5698 0h-5.0367m7.3033-2.2678v-2.5199" })))),
            FSComponent.buildComponent("text", { ref: this.fpvFlag, style: "visibility:hidden", id: "FPVFlag", x: "62.987099", y: "89.42025", class: "Blink9Seconds FontLargest Red EndAlign" }, "FPV")));
    }
}

class AttitudeIndicatorFixedUpper extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.roll = new Arinc429Word(0);
        this.pitch = new Arinc429Word(0);
        this.visibilitySub = Subject.create('hidden');
        this.rollProtSymbol = FSComponent.createRef();
        this.rollProtLostSymbol = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('rollAr').handle((roll) => {
            this.roll = roll;
            if (!this.roll.isNormalOperation()) {
                this.visibilitySub.set('hidden');
            }
            else {
                this.visibilitySub.set('visible');
            }
        });
        sub.on('pitchAr').handle((pitch) => {
            this.pitch = pitch;
            if (!this.pitch.isNormalOperation()) {
                this.visibilitySub.set('hidden');
            }
            else {
                this.visibilitySub.set('visible');
            }
        });
        sub.on('fcdcDiscreteWord1').handle((fcdcWord1) => {
            const isNormalLawActive = fcdcWord1.getBitValue(11) && !fcdcWord1.isFailureWarning();
            this.rollProtSymbol.instance.style.display = isNormalLawActive ? 'block' : 'none';
            this.rollProtLostSymbol.instance.style.display = !isNormalLawActive ? 'block' : 'none';
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "AttitudeUpperInfoGroup", visibility: this.visibilitySub },
            FSComponent.buildComponent("g", { id: "RollProtGroup", ref: this.rollProtSymbol, style: "display: none", class: "SmallStroke Green" },
                FSComponent.buildComponent("path", { id: "RollProtRight", d: "m105.64 62.887 1.5716-0.8008m-1.5716-0.78293 1.5716-0.8008" }),
                FSComponent.buildComponent("path", { id: "RollProtLeft", d: "m32.064 61.303-1.5716-0.8008m1.5716 2.3845-1.5716-0.8008" })),
            FSComponent.buildComponent("g", { id: "RollProtLost", ref: this.rollProtLostSymbol, style: "display: none", class: "NormalStroke Amber" },
                FSComponent.buildComponent("path", { id: "RollProtLostRight", d: "m107.77 60.696-1.7808 1.7818m1.7808 0-1.7808-1.7818" }),
                FSComponent.buildComponent("path", { id: "RollProtLostLeft", d: "m30.043 62.478 1.7808-1.7818m-1.7808 0 1.7808 1.7818" })),
            FSComponent.buildComponent("g", { class: "SmallStroke White" },
                FSComponent.buildComponent("path", { d: "m98.645 51.067 2.8492-2.8509" }),
                FSComponent.buildComponent("path", { d: "m39.168 51.067-2.8492-2.8509" }),
                FSComponent.buildComponent("path", { d: "m90.858 44.839a42.133 42.158 0 0 0-43.904 0" }),
                FSComponent.buildComponent("path", { d: "m89.095 43.819 1.8313-3.1738 1.7448 1.0079-1.8313 3.1738" }),
                FSComponent.buildComponent("path", { d: "m84.259 41.563 0.90817-2.4967-1.8932-0.68946-0.90818 2.4966" }),
                FSComponent.buildComponent("path", { d: "m75.229 39.142 0.46109-2.6165 1.9841 0.35005-0.46109 2.6165" }),
                FSComponent.buildComponent("path", { d: "m60.6 39.492-0.46109-2.6165 1.9841-0.35005 0.46109 2.6165" }),
                FSComponent.buildComponent("path", { d: "m53.553 41.563-0.90818-2.4967 0.9466-0.34474 0.9466-0.34472 0.90818 2.4966" }),
                FSComponent.buildComponent("path", { d: "m46.973 44.827-1.8313-3.1738 1.7448-1.0079 1.8313 3.1738" })),
            FSComponent.buildComponent("path", { class: "NormalStroke Yellow CornerRound", d: "m68.906 38.650-2.5184-3.7000h5.0367l-2.5184 3.7000" })));
    }
}
class AttitudeIndicatorFixedCenter extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.roll = new Arinc429Word(0);
        this.pitch = new Arinc429Word(0);
        this.visibilitySub = Subject.create('hidden');
        this.failureVis = Subject.create('hidden');
        this.fdVisibilitySub = Subject.create('hidden');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('rollAr').handle((r) => {
            this.roll = r;
            if (!this.roll.isNormalOperation()) {
                this.visibilitySub.set('display:none');
                this.failureVis.set('display:block');
                this.fdVisibilitySub.set('display:none');
            }
            else {
                this.visibilitySub.set('display:inline');
                this.failureVis.set('display:none');
                if (!this.props.isAttExcessive.get()) {
                    this.fdVisibilitySub.set('display:inline');
                }
            }
        });
        sub.on('pitchAr').handle((p) => {
            this.pitch = p;
            if (!this.pitch.isNormalOperation()) {
                this.visibilitySub.set('display:none');
                this.failureVis.set('display:block');
                this.fdVisibilitySub.set('display:none');
            }
            else {
                this.visibilitySub.set('display:inline');
                this.failureVis.set('display:none');
                if (!this.props.isAttExcessive.get()) {
                    this.fdVisibilitySub.set('display:inline');
                }
            }
        });
        this.props.isAttExcessive.sub((a) => {
            if (a) {
                this.fdVisibilitySub.set('display:none');
            }
            else if (this.roll.isNormalOperation() && this.pitch.isNormalOperation()) {
                this.fdVisibilitySub.set('display:inline');
            }
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("text", { style: this.failureVis, id: "AttFailText", class: "Blink9Seconds FontLargest Red EndAlign", x: "75.893127", y: "83.136955" }, "ATT"),
            FSComponent.buildComponent("g", { id: "AttitudeSymbolsGroup", style: this.visibilitySub },
                FSComponent.buildComponent(SidestickIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent("path", { class: "BlackFill", d: "m67.647 82.083v-2.5198h2.5184v2.5198z" }),
                FSComponent.buildComponent("g", { style: this.fdVisibilitySub },
                    FSComponent.buildComponent(FDYawBar, { bus: this.props.bus }),
                    FSComponent.buildComponent(FlightDirector, { bus: this.props.bus })),
                FSComponent.buildComponent("path", { class: "NormalOutline", d: "m67.647 82.083v-2.5198h2.5184v2.5198z" }),
                FSComponent.buildComponent("path", { class: "NormalStroke Yellow", d: "m67.647 82.083v-2.5198h2.5184v2.5198z" }),
                FSComponent.buildComponent("g", { class: "NormalOutline" },
                    FSComponent.buildComponent("path", { d: "m88.55 86.114h2.5184v-4.0317h12.592v-2.5198h-15.11z" }),
                    FSComponent.buildComponent("path", { d: "m34.153 79.563h15.11v6.5516h-2.5184v-4.0317h-12.592z" })),
                FSComponent.buildComponent("g", { id: "FixedAircraftReference", class: "NormalStroke Yellow BlackFill" },
                    FSComponent.buildComponent("path", { d: "m88.55 86.114h2.5184v-4.0317h12.592v-2.5198h-15.11z" }),
                    FSComponent.buildComponent("path", { d: "m34.153 79.563h15.11v6.5516h-2.5184v-4.0317h-12.592z" })),
                FSComponent.buildComponent(FlightPathVector, { bus: this.props.bus }),
                FSComponent.buildComponent(FlightPathDirector, { bus: this.props.bus, isAttExcessive: this.props.isAttExcessive }))));
    }
}
class FDYawBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lateralMode = 0;
        this.fdYawCommand = 0;
        this.fdActive = false;
        this.yawRef = FSComponent.createRef();
    }
    isActive() {
        if (!this.fdActive || !(this.lateralMode === 40 || this.lateralMode === 33 || this.lateralMode === 34)) {
            return false;
        }
        return true;
    }
    setOffset() {
        const offset = -Math.max(Math.min(this.fdYawCommand, 45), -45) * 0.44;
        if (this.isActive()) {
            this.yawRef.instance.style.visibility = 'visible';
            this.yawRef.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fdYawCommand').handle((fy) => {
            this.fdYawCommand = fy;
            if (this.isActive()) {
                this.setOffset();
            }
            else {
                this.yawRef.instance.style.visibility = 'hidden';
            }
        });
        sub.on('activeLateralMode').whenChanged().handle((lm) => {
            this.lateralMode = lm;
            if (this.isActive()) {
                this.setOffset();
            }
            else {
                this.yawRef.instance.style.visibility = 'hidden';
            }
        });
        // FIXME, differentiate properly (without duplication)
        sub.on('fd1Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 1) {
                this.fdActive = fd;
                if (this.isActive()) {
                    this.setOffset();
                }
                else {
                    this.yawRef.instance.style.visibility = 'hidden';
                }
            }
        });
        sub.on('fd2Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 2) {
                this.fdActive = fd;
                if (this.isActive()) {
                    this.setOffset();
                }
                else {
                    this.yawRef.instance.style.visibility = 'hidden';
                }
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { ref: this.yawRef, id: "GroundYawSymbol", class: "NormalStroke Green", d: "m67.899 82.536v13.406h2.0147v-13.406l-1.0074-1.7135z" }));
    }
}
class FlightDirector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lateralMode = 0;
        this.verticalMode = 0;
        this.fdActive = false;
        this.trkFpaActive = false;
        this.fdBank = 0;
        this.fdPitch = 0;
        this.fdRef = FSComponent.createRef();
        this.lateralRef1 = FSComponent.createRef();
        this.lateralRef2 = FSComponent.createRef();
        this.verticalRef1 = FSComponent.createRef();
        this.verticalRef2 = FSComponent.createRef();
    }
    handleFdState() {
        const [toggled, showLateral, showVertical] = this.isActive();
        let FDRollOffset = 0;
        let FDPitchOffset = 0;
        if (toggled && showLateral) {
            const FDRollOrder = this.fdBank;
            FDRollOffset = Math.min(Math.max(FDRollOrder, -45), 45) * 0.44;
            this.lateralRef1.instance.setAttribute('visibility', 'visible');
            this.lateralRef1.instance.style.transform = `translate3d(${FDRollOffset}px, 0px, 0px)`;
            this.lateralRef2.instance.setAttribute('visibility', 'visible');
            this.lateralRef2.instance.style.transform = `translate3d(${FDRollOffset}px, 0px, 0px)`;
        }
        else {
            this.lateralRef1.instance.setAttribute('visibility', 'hidden');
            this.lateralRef2.instance.setAttribute('visibility', 'hidden');
        }
        if (toggled && showVertical) {
            const FDPitchOrder = this.fdPitch;
            FDPitchOffset = Math.min(Math.max(FDPitchOrder, -22.5), 22.5) * 0.89;
            this.verticalRef1.instance.setAttribute('visibility', 'visible');
            this.verticalRef1.instance.style.transform = `translate3d(0px, ${FDPitchOffset}px, 0px)`;
            this.verticalRef2.instance.setAttribute('visibility', 'visible');
            this.verticalRef2.instance.style.transform = `translate3d(0px, ${FDPitchOffset}px, 0px)`;
        }
        else {
            this.verticalRef1.instance.setAttribute('visibility', 'hidden');
            this.verticalRef2.instance.setAttribute('visibility', 'hidden');
        }
    }
    isActive() {
        const toggled = this.fdActive && !this.trkFpaActive;
        const showLateralFD = this.lateralMode !== 0 && this.lateralMode !== 34 && this.lateralMode !== 40;
        const showVerticalFD = this.verticalMode !== 0 && this.verticalMode !== 34;
        return [toggled, showLateralFD, showVerticalFD];
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fd1Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 1) {
                this.fdActive = fd;
                if (this.isActive()[0]) {
                    this.fdRef.instance.style.display = 'inline';
                }
                else {
                    this.fdRef.instance.style.display = 'none';
                }
            }
        });
        sub.on('fd2Active').whenChanged().handle((fd) => {
            if (getDisplayIndex() === 2) {
                this.fdActive = fd;
                if (this.isActive()[0]) {
                    this.fdRef.instance.style.display = 'inline';
                }
                else {
                    this.fdRef.instance.style.display = 'none';
                }
            }
        });
        sub.on('trkFpaActive').whenChanged().handle((tr) => {
            this.trkFpaActive = tr;
            if (this.isActive()[0]) {
                this.fdRef.instance.style.display = 'inline';
            }
            else {
                this.fdRef.instance.style.display = 'none';
            }
        });
        sub.on('fdBank').withPrecision(2).handle((fd) => {
            this.fdBank = fd;
            this.handleFdState();
        });
        sub.on('fdPitch').withPrecision(2).handle((fd) => {
            this.fdPitch = fd;
            this.handleFdState();
        });
        sub.on('activeLateralMode').whenChanged().handle((vm) => {
            this.lateralMode = vm;
            this.handleFdState();
        });
        sub.on('activeVerticalMode').whenChanged().handle((lm) => {
            this.verticalMode = lm;
            this.handleFdState();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.fdRef, style: "display: none" },
            FSComponent.buildComponent("g", { class: "ThickOutline" },
                FSComponent.buildComponent("path", { ref: this.lateralRef1, d: "m68.903 61.672v38.302" }),
                FSComponent.buildComponent("path", { ref: this.verticalRef1, d: "m49.263 80.823h39.287" })),
            FSComponent.buildComponent("g", { class: "ThickStroke Green" },
                FSComponent.buildComponent("path", { ref: this.lateralRef2, id: "FlightDirectorRoll", d: "m68.903 61.672v38.302" }),
                FSComponent.buildComponent("path", { ref: this.verticalRef2, id: "FlightDirectorPitch", d: "m49.263 80.823h39.287" }))));
    }
}
class SidestickIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.captPitchCommand = new Arinc429Word(0);
        this.foPitchCommand = new Arinc429Word(0);
        this.captRollCommand = new Arinc429Word(0);
        this.foRollCommand = new Arinc429Word(0);
        this.fcdc1DiscreteWord2 = new Arinc429Word(0);
        this.fcdc2DiscreteWord2 = new Arinc429Word(0);
        this.onGround = true;
        this.crossHairRef = FSComponent.createRef();
        this.onGroundForVisibility = Subject.create('visible');
        this.engOneRunning = false;
        this.engTwoRunning = false;
    }
    handleSideStickIndication() {
        const oneEngineRunning = this.engOneRunning || this.engTwoRunning;
        const showIndicator = this.onGround && oneEngineRunning
            && !this.captPitchCommand.isFailureWarning()
            && !this.captRollCommand.isFailureWarning()
            && !this.foPitchCommand.isFailureWarning()
            && !this.foRollCommand.isFailureWarning();
        const foStickDisabledFcdc1 = this.fcdc1DiscreteWord2.getBitValueOr(29, false);
        const foStickDisabledFcdc2 = this.fcdc2DiscreteWord2.getBitValueOr(29, false);
        const captStickDisabledFcdc1 = this.fcdc1DiscreteWord2.getBitValueOr(28, false);
        const captStickDisabledFcdc2 = this.fcdc2DiscreteWord2.getBitValueOr(28, false);
        const foStickDisabled = foStickDisabledFcdc1 || foStickDisabledFcdc2;
        const captStickDisabled = captStickDisabledFcdc1 || captStickDisabledFcdc2;
        const totalPitchCommand = Math.max(Math.min(((foStickDisabled ? 0 : this.foPitchCommand.value) + (captStickDisabled ? 0 : this.captPitchCommand.value)), 16), -16) * -1.43875;
        const totalRollCommand = Math.max(Math.min((foStickDisabled ? 0 : this.foRollCommand.value) + (captStickDisabled ? 0 : this.captRollCommand.value), 20), -20) * 1.478;
        if (!showIndicator) {
            this.onGroundForVisibility.set('hidden');
        }
        else {
            this.onGroundForVisibility.set('visible');
            this.crossHairRef.instance.style.transform = `translate3d(${totalRollCommand}px, ${totalPitchCommand}px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('noseGearCompressed').whenChanged().handle((g) => {
            this.onGround = g;
            this.handleSideStickIndication();
        });
        sub.on('engOneRunning').whenChanged().handle((e) => {
            this.engOneRunning = e;
            this.handleSideStickIndication();
        });
        sub.on('engTwoRunning').whenChanged().handle((e) => {
            this.engTwoRunning = e;
            this.handleSideStickIndication();
        });
        sub.on('fcdc1DiscreteWord2').whenChanged().handle((discreteWord2) => {
            this.fcdc1DiscreteWord2 = discreteWord2;
            this.handleSideStickIndication();
        });
        sub.on('fcdc2DiscreteWord2').whenChanged().handle((discreteWord2) => {
            this.fcdc2DiscreteWord2 = discreteWord2;
            this.handleSideStickIndication();
        });
        sub.on('fcdcCaptPitchCommand').whenChanged().handle((x) => {
            this.captPitchCommand = x;
            this.handleSideStickIndication();
        });
        sub.on('fcdcFoPitchCommand').whenChanged().handle((x) => {
            this.foPitchCommand = x;
            this.handleSideStickIndication();
        });
        sub.on('fcdcCaptRollCommand').whenChanged().handle((y) => {
            this.captRollCommand = y;
            this.handleSideStickIndication();
        });
        sub.on('fcdcFoRollCommand').whenChanged().handle((y) => {
            this.foRollCommand = y;
            this.handleSideStickIndication();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "GroundCursorGroup", class: "NormalStroke White", visibility: this.onGroundForVisibility },
            FSComponent.buildComponent("path", { id: "GroundCursorBorders", d: "m92.327 103.75h6.0441v-6.0476m-58.93 0v6.0476h6.0441m46.842-45.861h6.0441v6.0476m-58.93 0v-6.0476h6.0441" }),
            FSComponent.buildComponent("path", { ref: this.crossHairRef, id: "GroundCursorCrosshair", d: "m73.994 81.579h-4.3316v4.3341m-5.8426-4.3341h4.3316v4.3341m5.8426-5.846h-4.3316v-4.3341m-5.8426 4.3341h4.3316v-4.3341" })));
    }
}

class ShowForSecondsComponent extends DisplayComponent {
    constructor(props, displayTimeInSeconds) {
        super(props);
        this.timeout = 0;
        this.modeChangedPathRef = FSComponent.createRef();
        this.isShown = false;
        this.displayModeChangedPath = (cancel = false) => {
            if (cancel || !this.isShown) {
                clearTimeout(this.timeout);
                this.modeChangedPathRef.instance.classList.remove('ModeChangedPath');
            }
            else {
                this.modeChangedPathRef.instance.classList.add('ModeChangedPath');
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.modeChangedPathRef.instance.classList.remove('ModeChangedPath');
                }, this.displayTimeInSeconds * 1000);
            }
        };
        this.displayTimeInSeconds = displayTimeInSeconds;
    }
}
class FMA extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.activeLateralMode = 0;
        this.activeVerticalMode = 0;
        this.armedVerticalModeSub = Subject.create(0);
        this.athrModeMessage = 0;
        this.machPreselVal = 0;
        this.speedPreselVal = 0;
        this.setHoldSpeed = false;
        this.tdReached = false;
        this.tcasRaInhibited = Subject.create(false);
        this.trkFpaDeselected = Subject.create(false);
        this.fcdcDiscreteWord1 = new Arinc429Word(0);
        this.fwcFlightPhase = 0;
        this.firstBorderRef = FSComponent.createRef();
        this.secondBorderRef = FSComponent.createRef();
        this.AB3Message = Subject.create(false);
    }
    handleFMABorders() {
        const sharedModeActive = this.activeLateralMode === 32 || this.activeLateralMode === 33
            || this.activeLateralMode === 34 || (this.activeLateralMode === 20 && this.activeVerticalMode === 24);
        const BC3Message = getBC3Message(this.props.isAttExcessive.get(), this.armedVerticalModeSub.get(), this.setHoldSpeed, this.trkFpaDeselected.get(), this.tcasRaInhibited.get(), this.fcdcDiscreteWord1, this.fwcFlightPhase, this.tdReached)[0] !== null;
        const engineMessage = this.athrModeMessage;
        const AB3Message = (this.machPreselVal !== -1
            || this.speedPreselVal !== -1) && !BC3Message && engineMessage === 0;
        let secondBorder;
        if (sharedModeActive && !this.props.isAttExcessive.get()) {
            secondBorder = '';
        }
        else if (BC3Message) {
            secondBorder = 'm66.241 0.33732v15.766';
        }
        else {
            secondBorder = 'm66.241 0.33732v20.864';
        }
        let firstBorder;
        if (AB3Message && !this.props.isAttExcessive.get()) {
            firstBorder = 'm33.117 0.33732v15.766';
        }
        else {
            firstBorder = 'm33.117 0.33732v20.864';
        }
        this.AB3Message.set(AB3Message);
        this.firstBorderRef.instance.setAttribute('d', firstBorder);
        this.secondBorderRef.instance.setAttribute('d', secondBorder);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        this.props.isAttExcessive.sub((_a) => {
            this.handleFMABorders();
        });
        sub.on('fmaVerticalArmed').whenChanged().handle((a) => {
            this.armedVerticalModeSub.set(a);
            this.handleFMABorders();
        });
        sub.on('activeLateralMode').whenChanged().handle((activeLateralMode) => {
            this.activeLateralMode = activeLateralMode;
            this.handleFMABorders();
        });
        sub.on('activeVerticalMode').whenChanged().handle((activeVerticalMode) => {
            this.activeVerticalMode = activeVerticalMode;
            this.handleFMABorders();
        });
        sub.on('speedPreselVal').whenChanged().handle((s) => {
            this.speedPreselVal = s;
            this.handleFMABorders();
        });
        sub.on('machPreselVal').whenChanged().handle((m) => {
            this.machPreselVal = m;
            this.handleFMABorders();
        });
        sub.on('setHoldSpeed').whenChanged().handle((shs) => {
            this.setHoldSpeed = shs;
            this.handleFMABorders();
        });
        sub.on('tcasRaInhibited').whenChanged().handle((tra) => {
            this.tcasRaInhibited.set(tra);
            this.handleFMABorders();
        });
        sub.on('trkFpaDeselectedTCAS').whenChanged().handle((trk) => {
            this.trkFpaDeselected.set(trk);
            this.handleFMABorders();
        });
        sub.on('fcdcDiscreteWord1').whenChanged().handle((fcdcDiscreteWord1) => {
            this.fcdcDiscreteWord1 = fcdcDiscreteWord1;
            this.handleFMABorders();
        });
        sub.on('fwcFlightPhase').whenChanged().handle((fwcFlightPhase) => {
            this.fwcFlightPhase = fwcFlightPhase;
        });
        sub.on('tdReached').whenChanged().handle((tdr) => {
            this.tdReached = tdr;
            this.handleFMABorders();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "FMA" },
            FSComponent.buildComponent("g", { class: "NormalStroke Grey" },
                FSComponent.buildComponent("path", { ref: this.firstBorderRef }),
                FSComponent.buildComponent("path", { ref: this.secondBorderRef }),
                FSComponent.buildComponent("path", { d: "m102.52 0.33732v20.864" }),
                FSComponent.buildComponent("path", { d: "m133.72 0.33732v20.864" })),
            FSComponent.buildComponent(Row1, { bus: this.props.bus, isAttExcessive: this.props.isAttExcessive }),
            FSComponent.buildComponent(Row2, { bus: this.props.bus, isAttExcessive: this.props.isAttExcessive }),
            FSComponent.buildComponent(Row3, { bus: this.props.bus, isAttExcessive: this.props.isAttExcessive, AB3Message: this.AB3Message })));
    }
}
class Row1 extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.b1Cell = FSComponent.createRef();
        this.c1Cell = FSComponent.createRef();
        this.D1D2Cell = FSComponent.createRef();
        this.BC1Cell = FSComponent.createRef();
        this.cellsToHide = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.isAttExcessive.sub((a) => {
            if (a) {
                this.cellsToHide.instance.style.display = 'none';
                this.b1Cell.instance.displayModeChangedPath(true);
                this.c1Cell.instance.displayModeChangedPath(true);
                this.BC1Cell.instance.displayModeChangedPath(true);
            }
            else {
                this.cellsToHide.instance.style.display = 'inline';
                this.b1Cell.instance.displayModeChangedPath();
                this.c1Cell.instance.displayModeChangedPath();
                this.BC1Cell.instance.displayModeChangedPath();
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent(A1A2Cell, { bus: this.props.bus }),
            FSComponent.buildComponent("g", { ref: this.cellsToHide },
                FSComponent.buildComponent(B1Cell, { ref: this.b1Cell, bus: this.props.bus }),
                FSComponent.buildComponent(C1Cell, { ref: this.c1Cell, bus: this.props.bus }),
                FSComponent.buildComponent(D1D2Cell, { ref: this.D1D2Cell, bus: this.props.bus }),
                FSComponent.buildComponent(BC1Cell, { ref: this.BC1Cell, bus: this.props.bus })),
            FSComponent.buildComponent(E1Cell, { bus: this.props.bus })));
    }
}
class Row2 extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.cellsToHide = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.isAttExcessive.sub((a) => {
            if (a) {
                this.cellsToHide.instance.style.display = 'none';
            }
            else {
                this.cellsToHide.instance.style.display = 'inline';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent(A2Cell, { bus: this.props.bus }),
            FSComponent.buildComponent("g", { ref: this.cellsToHide },
                FSComponent.buildComponent(B2Cell, { bus: this.props.bus }),
                FSComponent.buildComponent(C2Cell, { bus: this.props.bus })),
            FSComponent.buildComponent(E2Cell, { bus: this.props.bus })));
    }
}
class A2Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.text = Subject.create('');
        this.className = Subject.create('FontMedium MiddleAlign Cyan');
        this.autoBrkRef = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('autoBrakeMode').whenChanged().handle((am) => {
            switch (am) {
                case 0:
                    this.text.set('');
                    break;
                case 1:
                    this.text.set(' ');
                    break;
                case 2:
                    this.text.set(' ');
                    break;
                case 3:
                    // MAX will be shown in 3rd row
                    this.text.set('');
                    break;
            }
        });
        sub.on('autoBrakeActive').whenChanged().handle((am) => {
            if (am) {
                this.autoBrkRef.instance.style.visibility = 'hidden';
            }
            else {
                this.autoBrkRef.instance.style.visibility = 'visible';
            }
        });
        sub.on('AThrMode').whenChanged().handle((athrMode) => {
            // ATHR mode overrides BRK LO and MED memo
            if (athrMode > 0 && athrMode <= 6) {
                this.autoBrkRef.instance.style.visibility = 'hidden';
            }
            else {
                this.autoBrkRef.instance.style.visibility = 'visible';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { ref: this.autoBrkRef, class: this.className, x: "16.782249", y: "14.329653", style: "white-space: pre" }, this.text));
    }
}
class Row3 extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.cellsToHide = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.isAttExcessive.sub((a) => {
            if (a) {
                this.cellsToHide.instance.style.display = 'none';
            }
            else {
                this.cellsToHide.instance.style.display = 'inline';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent(A3Cell, { bus: this.props.bus, AB3Message: this.props.AB3Message }),
            FSComponent.buildComponent("g", { ref: this.cellsToHide },
                FSComponent.buildComponent(AB3Cell, { bus: this.props.bus }),
                FSComponent.buildComponent(D3Cell, { bus: this.props.bus })),
            FSComponent.buildComponent(BC3Cell, { isAttExcessive: this.props.isAttExcessive, bus: this.props.bus }),
            FSComponent.buildComponent(E3Cell, { bus: this.props.bus })));
    }
}
class A1A2Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.athrMode = 0;
        this.cellRef = FSComponent.createRef();
        this.flexTemp = 0;
        this.autoBrakeActive = false;
        this.autoBrakeMode = 0;
    }
    setText() {
        let text = '';
        this.isShown = true;
        switch (this.athrMode) {
            case 1:
                this.displayModeChangedPath(true);
                text = `
                                <path class="NormalStroke White" d="m25.114 1.8143v13.506h-16.952v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">TOGA</text>
                            `;
                break;
            case 2:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke White" d="m31.521 1.8143v13.506h-30.217v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">GA SOFT</text>
                            </g>`;
                break;
            case 3:
                this.displayModeChangedPath(true);
                const FlexTemp = Math.round(this.flexTemp);
                const FlexText = FlexTemp >= 0 ? (`+${FlexTemp}`) : FlexTemp.toString();
                text = `<g>
                                <path class="NormalStroke White" d="m31.521 1.8143v13.506h-30.217v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">
                                    <tspan xml:space="preserve">FLX  </tspan>
                                    <tspan class="Cyan">${FlexText}</tspan>
                                </text>
                            </g>`;
                break;
            case 4:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke White" d="m25.114 1.8143v13.506h-16.952v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">DTO</text>
                            </g>`;
                break;
            case 5:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke White" d="m25.114 1.8143v13.506h-16.952v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">MCT</text>
                            </g>`;
                break;
            case 6:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke Amber" d="m25.114 1.8143v13.506h-16.952v-13.506z" />
                                <text class="FontMedium MiddleAlign White" x="16.782249" y="7.1280665">MAN</text>
                                <text class="FontMedium MiddleAlign White" x="16.869141" y="14.351689">THR</text>
                            </g>`;
                break;
            case 7:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">SPEED</text>';
                this.displayModeChangedPath();
                break;
            case 8:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">MACH</text>';
                this.displayModeChangedPath();
                break;
            case 9:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">THR MCT</text>';
                this.displayModeChangedPath();
                break;
            case 10:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">THR CLB</text>';
                this.displayModeChangedPath();
                break;
            case 11:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">THR LVR</text>';
                this.displayModeChangedPath();
                break;
            case 12:
                text = '<text  class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">THR IDLE</text>';
                this.displayModeChangedPath();
                break;
            case 13:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke Amber BlinkInfinite" d="m0.70556 1.8143h30.927v6.0476h-30.927z" />
                                <text class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">A.FLOOR</text>
                            </g>`;
                break;
            case 14:
                this.displayModeChangedPath(true);
                text = `<g>
                                <path class="NormalStroke Amber BlinkInfinite" d="m0.70556 1.8143h30.927v6.0476h-30.927z" />
                                <text class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">TOGA LK</text>
                            </g>`;
                break;
            default:
                if (this.autoBrakeActive) {
                    switch (this.autoBrakeMode) {
                        case 1:
                            text = '<text class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">BRK LO</text>';
                            this.displayModeChangedPath();
                            break;
                        case 2:
                            text = '<text class="FontMedium MiddleAlign Green" x="16.782249" y="7.1280665">BRK MED</text>';
                            this.displayModeChangedPath();
                            break;
                        default:
                            text = '';
                            this.isShown = false;
                            this.displayModeChangedPath(true);
                    }
                }
                else {
                    text = '';
                    this.isShown = false;
                    this.displayModeChangedPath(true);
                }
        }
        this.cellRef.instance.innerHTML = text;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('flexTemp').whenChanged().handle((f) => {
            this.flexTemp = f;
            this.setText();
        });
        sub.on('AThrMode').whenChanged().handle((athrMode) => {
            this.athrMode = athrMode;
            this.setText();
        });
        sub.on('autoBrakeActive').whenChanged().handle((am) => {
            this.autoBrakeActive = am;
            this.setText();
        });
        sub.on('autoBrakeMode').whenChanged().handle((a) => {
            this.autoBrakeMode = a;
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, visibility: "hidden", class: "NormalStroke White", d: "m0.70556 1.8143h30.927v6.0476h-30.927z" }),
            FSComponent.buildComponent("g", { ref: this.cellRef })));
    }
}
class A3Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.classSub = Subject.create('');
        this.textSub = Subject.create('');
        this.autobrakeMode = 0;
        this.AB3Message = false;
    }
    onUpdateAthrModeMessage(message) {
        let text = '';
        let className = '';
        switch (message) {
            case 1:
                text = 'THR LK';
                className = 'Amber BlinkInfinite';
                break;
            case 2:
                text = 'LVR TOGA';
                className = 'White BlinkInfinite';
                break;
            case 3:
                text = 'LVR CLB';
                className = 'White BlinkInfinite';
                break;
            case 4:
                text = 'LVR MCT';
                className = 'White BlinkInfinite';
                break;
            case 5:
                text = 'LVR ASYM';
                className = 'Amber';
                break;
            default:
                text = '';
        }
        this.textSub.set(text);
        this.classSub.set(`FontMedium MiddleAlign ${className}`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('athrModeMessage').whenChanged().handle((m) => {
            this.onUpdateAthrModeMessage(m);
        });
        sub.on('autoBrakeMode').whenChanged().handle((am) => {
            this.autobrakeMode = am;
            this.handleAutobrakeMode();
        });
        this.props.AB3Message.sub((ab3) => {
            this.AB3Message = ab3;
            this.handleAutobrakeMode();
        });
        sub.on('autoBrakeActive').whenChanged().handle((a) => {
            if (a) {
                this.classSub.set('HiddenElement');
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { class: this.classSub, x: "16.989958", y: "21.641243" }, this.textSub));
    }
}
class AB3Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.speedPreselVal = -1;
        this.machPreselVal = -1;
        this.athrModeMessage = 0;
        this.textSub = Subject.create('');
    }
    getText() {
        if (this.athrModeMessage === 0) {
            if (this.speedPreselVal !== -1 && this.machPreselVal === -1) {
                const text = Math.round(this.speedPreselVal);
                this.textSub.set(`SPEED SEL ${text}`);
            }
            else if (this.machPreselVal !== -1 && this.speedPreselVal === -1) {
                this.textSub.set(`MACH SEL ${this.machPreselVal.toFixed(2)}`);
            }
            else if (this.machPreselVal === -1 && this.speedPreselVal === -1) {
                this.textSub.set('');
            }
        }
        else {
            this.textSub.set('');
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('speedPreselVal').whenChanged().handle((m) => {
            this.speedPreselVal = m;
            this.getText();
        });
        sub.on('machPreselVal').whenChanged().handle((m) => {
            this.machPreselVal = m;
            this.getText();
        });
        sub.on('athrModeMessage').whenChanged().handle((m) => {
            this.athrModeMessage = m;
            this.getText();
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign Cyan", x: "35.434673", y: "21.656223" }, this.textSub));
    }
}
class B1Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 10);
        this.boxClassSub = Subject.create('');
        this.boxPathStringSub = Subject.create('');
        this.activeVerticalModeSub = Subject.create(0);
        this.speedProtectionPathRef = FSComponent.createRef();
        this.inModeReversionPathRef = FSComponent.createRef();
        this.fmaTextRef = FSComponent.createRef();
        this.selectedVS = 0;
        this.inSpeedProtection = false;
        this.fmaModeReversion = false;
        this.expediteMode = false;
        this.crzAltMode = false;
        this.tcasModeDisarmed = false;
        this.FPA = 0;
    }
    getText() {
        let text;
        let additionalText = '';
        this.isShown = true;
        switch (this.activeVerticalModeSub.get()) {
            case VerticalMode.GS_TRACK:
                text = 'G/S';
                break;
            /*  case 2:
            text = 'F-G/S';
            break; */
            case VerticalMode.GS_CPT:
                text = 'G/S*';
                break;
            /*  case 4:
            text = 'F-G/S*';
            break; */
            case VerticalMode.SRS:
            case VerticalMode.SRS_GA:
                text = 'SRS';
                break;
            case VerticalMode.TCAS:
                text = 'TCAS';
                break;
            /*  case 9:
            text = 'FINAL';
            break; */
            case VerticalMode.DES:
                text = 'DES';
                break;
            case VerticalMode.OP_DES:
                if (this.expediteMode) {
                    text = 'EXP DES';
                }
                else {
                    text = 'OP DES';
                }
                break;
            case VerticalMode.CLB:
                text = 'CLB';
                break;
            case VerticalMode.OP_CLB:
                if (this.expediteMode) {
                    text = 'EXP CLB';
                }
                else {
                    text = 'OP CLB';
                }
                break;
            case VerticalMode.ALT:
                if (this.crzAltMode) {
                    text = 'ALT CRZ';
                }
                else {
                    text = 'ALT';
                }
                break;
            case VerticalMode.ALT_CPT:
                text = 'ALT*';
                break;
            case VerticalMode.ALT_CST_CPT:
                text = 'ALT CST*';
                break;
            case VerticalMode.ALT_CST:
                text = 'ALT CST';
                break;
            /* case 18:
                text = 'ALT CRZ';
                break; */
            case VerticalMode.FPA: {
                const FPAText = `${(this.FPA >= 0 ? '+' : '')}${(Math.round(this.FPA * 10) / 10).toFixed(1)}°`;
                text = 'FPA';
                additionalText = FPAText;
                break;
            }
            case VerticalMode.VS: {
                const VSText = `${(this.selectedVS >= 0 ? '+' : '')}${Math.round(this.selectedVS).toString()}`.padStart(5, ' ');
                text = 'V/S';
                additionalText = VSText;
                break;
            }
            default:
                text = '';
                this.isShown = false;
                this.displayModeChangedPath(true);
        }
        const inSpeedProtection = this.inSpeedProtection && (this.activeVerticalModeSub.get() === 14 || this.activeVerticalModeSub.get() === 15);
        if (inSpeedProtection || this.fmaModeReversion) {
            this.boxClassSub.set('NormalStroke None');
        }
        else {
            this.boxClassSub.set('NormalStroke White');
        }
        if (inSpeedProtection) {
            this.speedProtectionPathRef.instance.setAttribute('visibility', 'visible');
        }
        else {
            this.speedProtectionPathRef.instance.setAttribute('visibility', 'hidden');
        }
        const boxPathString = this.activeVerticalModeSub.get() === 50 && this.tcasModeDisarmed ? 'm34.656 1.8143h29.918v13.506h-29.918z' : 'm34.656 1.8143h29.918v6.0476h-29.918z';
        this.boxPathStringSub.set(boxPathString);
        this.fmaTextRef.instance.innerHTML = `<tspan>${text}</tspan><tspan xml:space="preserve" class=${inSpeedProtection ? 'PulseCyanFill' : 'Cyan'}>${additionalText}</tspan>`;
        return text.length > 0;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('activeVerticalMode').whenChanged().handle((activeVerticalMode) => {
            this.activeVerticalModeSub.set(activeVerticalMode);
            this.getText();
            this.displayModeChangedPath();
        });
        sub.on('selectedFpa').whenChanged().handle((fpa) => {
            this.FPA = fpa;
            this.getText();
        });
        sub.on('apVsSelected').whenChanged().handle((svs) => {
            this.selectedVS = svs;
            this.getText();
        });
        sub.on('fmaModeReversion').whenChanged().handle((reversion) => {
            this.fmaModeReversion = reversion;
            if (reversion) {
                this.inModeReversionPathRef.instance.setAttribute('visibility', 'visible');
            }
            else {
                this.inModeReversionPathRef.instance.setAttribute('visibility', 'hidden');
            }
            this.getText();
        });
        sub.on('fmaSpeedProtection').whenChanged().handle((protection) => {
            this.inSpeedProtection = protection;
            this.getText();
        });
        sub.on('expediteMode').whenChanged().handle((e) => {
            this.expediteMode = e;
            this.getText();
        });
        sub.on('crzAltMode').whenChanged().handle((c) => {
            this.crzAltMode = c;
            this.getText();
        });
        sub.on('tcasModeDisarmed').whenChanged().handle((t) => {
            this.tcasModeDisarmed = t;
            this.getText();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, class: this.boxClassSub, visibility: "hidden", d: this.boxPathStringSub }),
            FSComponent.buildComponent("path", { ref: this.speedProtectionPathRef, class: "NormalStroke Amber BlinkInfinite", d: "m34.656 1.8143h29.918v6.0476h-29.918z" }),
            FSComponent.buildComponent("path", { ref: this.inModeReversionPathRef, class: "NormalStroke White BlinkInfinite", d: "m34.656 1.8143h29.918v6.0476h-29.918z" }),
            FSComponent.buildComponent("text", { ref: this.fmaTextRef, style: "white-space: pre", class: "FontMedium MiddleAlign Green", x: "49.921795", y: "7.1040988" })));
    }
}
class B2Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.text1Sub = Subject.create('');
        this.text2Sub = Subject.create('');
        this.classSub = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fmaVerticalArmed').whenChanged().handle((fmv) => {
            const altArmed = (fmv >> 0) & 1;
            const altCstArmed = (fmv >> 1) & 1;
            const clbArmed = (fmv >> 2) & 1;
            const desArmed = (fmv >> 3) & 1;
            const gsArmed = (fmv >> 4) & 1;
            const finalArmed = (fmv >> 5) & 1;
            let text1;
            let color1 = 'Cyan';
            if (clbArmed) {
                text1 = 'CLB';
            }
            else if (desArmed) {
                text1 = 'DES';
            }
            else if (altCstArmed) {
                text1 = 'ALT';
                color1 = 'Magenta';
            }
            else if (altArmed) {
                text1 = 'ALT';
            }
            else {
                text1 = '';
            }
            let text2;
            if (gsArmed) {
                text2 = 'G/S';
            }
            else if (finalArmed) {
                text2 = 'FINAL';
            }
            else {
                text2 = '';
            }
            this.text1Sub.set(text1);
            this.text2Sub.set(text2);
            this.classSub.set(`FontMedium MiddleAlign ${color1}`);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { class: this.classSub, x: "41.477474", y: "14.329653" }, this.text1Sub),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign Cyan", x: "54.59803", y: "14.382949" }, this.text2Sub)));
    }
}
class C1Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 10);
        this.textSub = Subject.create('');
        this.activeLateralMode = 0;
        this.activeVerticalMode = 0;
        this.armedVerticalMode = 0;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('activeLateralMode').whenChanged().handle((lm) => {
            this.activeLateralMode = lm;
            const isShown = this.updateText();
            if (isShown) {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
        });
        sub.on('activeVerticalMode').whenChanged().handle((lm) => {
            this.activeVerticalMode = lm;
            const isShown = this.updateText();
            if (isShown) {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
        });
        sub.on('fmaVerticalArmed').whenChanged().handle((va) => {
            this.armedVerticalMode = va;
            const hasChanged = this.updateText();
            if (hasChanged) {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
        });
    }
    updateText() {
        const finalArmed = (this.armedVerticalMode >> 5) & 1;
        let text;
        this.isShown = true;
        if (this.activeLateralMode === LateralMode.GA_TRACK) {
            text = 'GA TRK';
        }
        else if (this.activeLateralMode === LateralMode.LOC_CPT) {
            text = 'LOC *';
        }
        else if (this.activeLateralMode === LateralMode.HDG) {
            text = 'HDG';
        }
        else if (this.activeLateralMode === LateralMode.RWY) {
            text = 'RWY';
        }
        else if (this.activeLateralMode === LateralMode.RWY_TRACK) {
            text = 'RWY TRK';
        }
        else if (this.activeLateralMode === LateralMode.TRACK) {
            text = 'TRACK';
        }
        else if (this.activeLateralMode === LateralMode.LOC_TRACK) {
            text = 'LOC';
        }
        else if (this.activeLateralMode === LateralMode.NAV && !finalArmed && this.activeVerticalMode !== VerticalMode.FINAL) {
            text = 'NAV';
        }
        else if (this.activeLateralMode === LateralMode.NAV && finalArmed && this.activeVerticalMode !== VerticalMode.FINAL) {
            text = 'APP NAV';
        }
        else {
            text = '';
            this.isShown = false;
        }
        const hasChanged = text.length > 0 && text !== this.textSub.get();
        if (hasChanged || text.length === 0) {
            this.textSub.set(text);
        }
        return hasChanged;
    }
    render() {
        // case 2:
        //     text = 'LOC B/C*';
        //     id = 2;
        //     break;
        // case 4:
        //     text = 'F-LOC*';
        //     id = 4;
        //     break;
        // case 9:
        //     text = 'LOC B/C';
        //     id = 9;
        //     break;
        // case 11:
        //     text = 'F-LOC';
        //     id = 11;
        //     break;
        // case 12:
        //     text = 'APP NAV';
        //     id = 12;
        //     break;
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, class: "NormalStroke White", visibility: "hidden", d: "m100.87 1.8143v6.0476h-33.075l1e-6 -6.0476z" }),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign Green", x: "84.856567", y: "6.9873109" }, this.textSub)));
    }
}
class C2Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.fmaLateralArmed = 0;
        this.fmaVerticalArmed = 0;
        this.activeVerticalMode = 0;
        this.textSub = Subject.create('');
    }
    getText() {
        const navArmed = isArmed(this.fmaLateralArmed, ArmedLateralMode.NAV);
        const locArmed = isArmed(this.fmaLateralArmed, ArmedLateralMode.LOC);
        const finalArmed = isArmed(this.fmaVerticalArmed, ArmedVerticalMode.FINAL);
        let text = '';
        if (locArmed) {
            // case 1:
            //     text = 'LOC B/C';
            //     break;
            text = 'LOC';
            // case 3:
            //     text = 'F-LOC';
            //     break;
        }
        else if (navArmed && (finalArmed || this.activeVerticalMode === VerticalMode.FINAL)) {
            text = 'APP NAV';
        }
        else if (navArmed) {
            text = 'NAV';
        }
        this.textSub.set(text);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fmaLateralArmed').whenChanged().handle((fla) => {
            this.fmaLateralArmed = fla;
            this.getText();
        });
        sub.on('fmaVerticalArmed').whenChanged().handle((fva) => {
            this.fmaVerticalArmed = fva;
            this.getText();
        });
        sub.on('activeVerticalMode').whenChanged().handle((avm) => {
            this.activeVerticalMode = avm;
            this.getText();
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign Cyan", x: "84.734184", y: "14.440415" }, this.textSub));
    }
}
class BC1Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.lastLateralMode = 0;
        this.lastVerticalMode = 0;
        this.textSub = Subject.create('');
    }
    setText() {
        let text;
        this.isShown = true;
        if (this.lastVerticalMode === VerticalMode.ROLL_OUT) {
            text = 'ROLL OUT';
        }
        else if (this.lastVerticalMode === VerticalMode.FLARE) {
            text = 'FLARE';
        }
        else if (this.lastVerticalMode === VerticalMode.LAND) {
            text = 'LAND';
        }
        else if (this.lastVerticalMode === VerticalMode.FINAL && this.lastLateralMode === LateralMode.NAV) {
            text = 'FINAL APP';
        }
        else {
            text = '';
        }
        if (text !== '') {
            this.displayModeChangedPath();
        }
        else {
            this.isShown = false;
            this.displayModeChangedPath(true);
        }
        this.textSub.set(text);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('activeVerticalMode').whenChanged().handle((v) => {
            this.lastVerticalMode = v;
            this.setText();
        });
        sub.on('activeLateralMode').whenChanged().handle((l) => {
            this.lastLateralMode = l;
            this.setText();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, class: "NormalStroke White", visibility: "hidden", d: "m50.178 1.8143h35.174v6.0476h-35.174z" }),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign Green", x: "67.9795", y: "6.8893085" }, this.textSub)));
    }
}
const getBC3Message = (isAttExcessive, armedVerticalMode, setHoldSpeed, trkFpaDeselectedTCAS, tcasRaInhibited, fcdcWord1, fwcFlightPhase, tdReached) => {
    const armedVerticalBitmask = armedVerticalMode;
    const TCASArmed = (armedVerticalBitmask >> 6) & 1;
    const flightPhaseForWarning = fwcFlightPhase >= 2 && fwcFlightPhase <= 9 && fwcFlightPhase !== 4 && fwcFlightPhase !== 5;
    let text;
    let className;
    // All currently unused message are set to false
    if (!fcdcWord1.getBitValue(11)
        && !fcdcWord1.getBitValue(12)
        && !fcdcWord1.getBitValue(13)
        && !fcdcWord1.getBitValue(15)
        && !fcdcWord1.isFailureWarning()
        && flightPhaseForWarning) {
        text = 'MAN PITCH TRIM ONLY';
        className = 'Red Blink9Seconds';
    }
    else if (fcdcWord1.getBitValue(15) && !fcdcWord1.isFailureWarning() && flightPhaseForWarning) {
        text = 'USE MAN PITCH TRIM';
        className = 'PulseAmber9Seconds Amber';
    }
    else if (TCASArmed && !isAttExcessive) {
        text = '  TCAS               ';
        className = 'Cyan';
    }
    else if (tcasRaInhibited && !isAttExcessive) {
        text = 'TCAS RA INHIBITED';
        className = 'White';
    }
    else if (trkFpaDeselectedTCAS && !isAttExcessive) {
        text = 'TRK FPA DESELECTED';
        className = 'White';
    }
    else if (tdReached) {
        text = 'T/D REACHED';
        className = 'White';
    }
    else if (setHoldSpeed) {
        text = 'SET HOLD SPEED';
        className = 'White';
    }
    else {
        return [null, null];
    }
    return [text, className];
};
class BC3Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.bc3Cell = FSComponent.createRef();
        this.classNameSub = Subject.create('');
        this.isAttExcessive = false;
        this.armedVerticalMode = 0;
        this.setHoldSpeed = false;
        this.tcasRaInhibited = false;
        this.trkFpaDeselected = false;
        this.fcdcDiscreteWord1 = new Arinc429Word(0);
        this.fwcFlightPhase = 0;
        this.tdReached = false;
    }
    fillBC3Cell() {
        const [text, className] = getBC3Message(this.isAttExcessive, this.armedVerticalMode, this.setHoldSpeed, this.trkFpaDeselected, this.tcasRaInhibited, this.fcdcDiscreteWord1, this.fwcFlightPhase, this.tdReached);
        this.classNameSub.set(`FontMedium MiddleAlign ${className}`);
        if (text !== null) {
            this.bc3Cell.instance.innerHTML = text;
        }
        else {
            this.bc3Cell.instance.innerHTML = '';
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        this.props.isAttExcessive.sub((e) => {
            this.isAttExcessive = e;
            this.fillBC3Cell();
        });
        sub.on('fmaVerticalArmed').whenChanged().handle((v) => {
            this.armedVerticalMode = v;
            this.fillBC3Cell();
        });
        sub.on('setHoldSpeed').whenChanged().handle((shs) => {
            this.setHoldSpeed = shs;
            this.fillBC3Cell();
        });
        sub.on('tcasRaInhibited').whenChanged().handle((tra) => {
            this.tcasRaInhibited = tra;
            this.fillBC3Cell();
        });
        sub.on('trkFpaDeselectedTCAS').whenChanged().handle((trk) => {
            this.trkFpaDeselected = trk;
            this.fillBC3Cell();
        });
        sub.on('fcdcDiscreteWord1').whenChanged().handle((fcdcDiscreteWord1) => {
            this.fcdcDiscreteWord1 = fcdcDiscreteWord1;
            this.fillBC3Cell();
        });
        sub.on('fwcFlightPhase').whenChanged().handle((fwcFlightPhase) => {
            this.fwcFlightPhase = fwcFlightPhase;
        });
        sub.on('tdReached').whenChanged().handle((tdr) => {
            this.tdReached = tdr;
            this.fillBC3Cell();
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { ref: this.bc3Cell, class: this.classNameSub, x: "68.087875", y: "21.627102", style: "white-space: pre" }));
    }
}
class D1D2Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.text1Sub = Subject.create('');
        this.text2Sub = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('approachCapability').whenChanged().handle((c) => {
            let text1;
            let text2;
            this.isShown = true;
            switch (c) {
                case 1:
                    text1 = 'CAT1';
                    break;
                case 2:
                    text1 = 'CAT2';
                    break;
                case 3:
                    text1 = 'CAT3';
                    text2 = 'SINGLE';
                    break;
                case 4:
                    text1 = 'CAT3';
                    text2 = 'DUAL';
                    break;
                case 5:
                    text1 = 'AUTO';
                    text2 = 'LAND';
                    break;
                case 6:
                    text1 = 'F-APP';
                    break;
                case 7:
                    text1 = 'F-APP';
                    text2 = '+ RAW';
                    break;
                case 8:
                    text1 = 'RAW';
                    text2 = 'ONLY';
                    break;
                default:
                    text1 = '';
            }
            this.text1Sub.set(text1);
            if (text2) {
                this.text2Sub.set(text2);
                this.modeChangedPathRef.instance.setAttribute('d', 'm104.1 1.8143h27.994v13.506h-27.994z');
            }
            else {
                this.text2Sub.set('');
                this.modeChangedPathRef.instance.setAttribute('d', 'm104.1 1.8143h27.994v6.0476h-27.994z');
            }
            if (text1.length === 0 && !text2) {
                this.isShown = false;
            }
            this.displayModeChangedPath();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "118.45866", y: "7.125926" }, this.text1Sub),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "118.39752", y: "14.289783" }, this.text2Sub),
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, class: "NormalStroke White", visibility: "hidden" })));
    }
}
class D3Cell extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.textRef = FSComponent.createRef();
        this.classNameSub = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('mda').whenChanged().handle((mda) => {
            if (mda !== 0) {
                const MDAText = Math.round(mda).toString().padStart(6, ' ');
                this.textRef.instance.innerHTML = `<tspan>BARO</tspan><tspan class="Cyan" xml:space="preserve">${MDAText}</tspan>`;
            }
            else {
                this.textRef.instance.innerHTML = '';
            }
        });
        sub.on('dh').whenChanged().handle((dh) => {
            let fontSize = 'FontSmallest';
            if (dh !== -1 && dh !== -2) {
                const DHText = Math.round(dh).toString().padStart(4, ' ');
                this.textRef.instance.innerHTML = `
                        <tspan>RADIO</tspan><tspan class="Cyan" xml:space="preserve">${DHText}</tspan>
                    `;
            }
            else if (dh === -2) {
                this.textRef.instance.innerHTML = '<tspan>NO DH</tspan>';
                fontSize = 'FontMedium';
            }
            else {
                this.textRef.instance.innerHTML = '';
            }
            this.classNameSub.set(`${fontSize} MiddleAlign White`);
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { ref: this.textRef, class: this.classNameSub, x: "118.38384", y: "21.104172" }));
    }
}
class E1Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.ap1Active = false;
        this.ap2Active = false;
        this.textSub = Subject.create('');
    }
    setText() {
        let text;
        this.isShown = true;
        if (this.ap1Active && !this.ap2Active) {
            text = 'AP1';
        }
        else if (this.ap2Active && !this.ap1Active) {
            text = 'AP2';
        }
        else if (!this.ap2Active && !this.ap1Active) {
            text = '';
            this.isShown = false;
        }
        else {
            text = 'AP1+2';
        }
        this.displayModeChangedPath();
        this.textSub.set(text);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('ap1Active').whenChanged().handle((ap) => {
            this.ap1Active = ap;
            this.displayModeChangedPath();
            this.setText();
        });
        sub.on('ap2Active').whenChanged().handle((ap) => {
            this.ap2Active = ap;
            this.displayModeChangedPath();
            this.setText();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, visibility: "hidden", class: "NormalStroke White", d: "m156.13 1.8143v6.0476h-20.81v-6.0476z" }),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "145.61546", y: "6.9559975" }, this.textSub)));
    }
}
class E2Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.fd1Active = false;
        this.fd2Active = false;
        this.ap1Active = false;
        this.ap2Active = false;
        this.textSub = Subject.create('');
    }
    getText() {
        this.isShown = true;
        if (!this.ap1Active && !this.ap2Active && !this.fd1Active && !this.fd2Active) {
            this.isShown = false;
            this.textSub.set('');
        }
        else {
            const text = `${this.fd1Active ? '1' : '-'} FD ${this.fd2Active ? '2' : '-'}`;
            this.textSub.set(text);
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('fd1Active').whenChanged().handle((fd) => {
            this.fd1Active = fd;
            if (fd || this.fd2Active) {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
            this.getText();
        });
        sub.on('ap1Active').whenChanged().handle((fd) => {
            this.ap1Active = fd;
            this.getText();
        });
        sub.on('ap2Active').whenChanged().handle((fd) => {
            this.ap2Active = fd;
            this.getText();
        });
        sub.on('fd2Active').whenChanged().handle((fd) => {
            this.fd2Active = fd;
            if (fd || this.fd1Active) {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
            this.getText();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, d: "m156.13 9.0715v6.0476h-20.81v-6.0476z", visibility: "hidden", class: "NormalStroke White" }),
            FSComponent.buildComponent("text", { class: "FontMedium MiddleAlign White", x: "145.95045", style: "word-spacing: -1.9844px", y: "14.417698" }, this.textSub)));
    }
}
class E3Cell extends ShowForSecondsComponent {
    constructor(props) {
        super(props, 9);
        this.classSub = Subject.create('');
        this.posSub = Subject.create(0);
    }
    getClass(athrStatus) {
        let className = '';
        this.isShown = true;
        switch (athrStatus) {
            case 1:
                className = 'Cyan FontSmall';
                break;
            case 2:
                className = 'White FontMedium';
                break;
            default:
                this.isShown = false;
                className = 'HiddenElement';
        }
        return className;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('athrStatus').whenChanged().handle((a) => {
            const className = this.getClass(a);
            this.posSub.set(a === 1 ? 21.253048 : 21.753487);
            this.classSub.set(`MiddleAlign ${className}`);
            if (className !== 'HiddenElement') {
                this.displayModeChangedPath();
            }
            else {
                this.displayModeChangedPath(true);
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { ref: this.modeChangedPathRef, class: "NormalStroke White", visibility: "hidden", d: "m135.32 16.329h20.81v6.0476h-20.81z" }),
            FSComponent.buildComponent("text", { class: this.classSub, x: "145.75578", y: this.posSub }, "A/THR")));
    }
}

class HorizontalTape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.refElement = FSComponent.createRef();
        this.tapeOffset = 0;
        this.tickNumberRefs = [];
        this.currentDrawnHeading = 0;
        this.yOffset = 0;
    }
    buildHorizonTicks() {
        const result = { ticks: [], labels: [] };
        result.ticks.push(FSComponent.buildComponent("path", { transform: "translate(0 0)", class: "NormalStroke White", d: "m68.906 80.823v1.8" }));
        for (let i = 0; i < 6; i++) {
            const headingOffset = (1 + i) * this.props.valueSpacing;
            const dX = this.props.distanceSpacing / this.props.valueSpacing * headingOffset;
            if (headingOffset % 10 === 0) {
                result.ticks.push(FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m68.906 80.823v1.8", transform: `translate(${dX} 0)` }));
                result.ticks.unshift(FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m68.906 80.823v1.8", transform: `translate(${-dX} 0)` }));
            }
        }
        return result;
    }
    buildHeadingTicks() {
        const result = {
            ticks: [],
            labels: [],
        };
        const tickLength = 4;
        let textRef = FSComponent.createRef();
        result.ticks.push(FSComponent.buildComponent("path", { class: "NormalStroke White", d: `m68.913 145.34v${tickLength}`, transform: "translate(0 0)" }));
        result.labels.push(FSComponent.buildComponent("text", { id: "HeadingLabel", class: "White MiddleAlign FontMedium", ref: textRef, x: "68.979425", y: "154.64206", transform: `translate(${0} 0)` }, "360"));
        this.tickNumberRefs.push(textRef);
        for (let i = 0; i < 6; i++) {
            const headingOffset = (1 + i) * this.props.valueSpacing;
            const dX = this.props.distanceSpacing / this.props.valueSpacing * headingOffset;
            if (headingOffset % 10 === 0) {
                result.ticks.push(FSComponent.buildComponent("path", { class: "NormalStroke White", d: `m68.913 145.34v${tickLength}`, transform: `translate(${dX} 0)` }));
                result.ticks.unshift(FSComponent.buildComponent("path", { class: "NormalStroke White", d: `m68.913 145.34v${tickLength}`, transform: `translate(${-dX} 0)` }));
            }
            else {
                result.ticks.push(FSComponent.buildComponent("path", { class: "NormalStroke White", d: `m68.913 145.34v${tickLength * 0.42}`, transform: `translate(${dX} 0)` }));
                result.ticks.unshift(FSComponent.buildComponent("path", { class: "NormalStroke White", d: `m68.913 145.34v${tickLength * 0.42}`, transform: `translate(${-dX} 0)` }));
            }
            if (headingOffset % 10 === 0) {
                textRef = FSComponent.createRef();
                result.labels.unshift(FSComponent.buildComponent("text", { id: "HeadingLabel", class: `White MiddleAlign ${i % 3 === 0 ? 'FontSmallest' : 'FontMedium'}`, ref: textRef, x: "68.979425", y: "154.64206", transform: `translate(${-dX} 0)` }, headingOffset));
                this.tickNumberRefs.unshift(textRef);
                textRef = FSComponent.createRef();
                result.labels.push(FSComponent.buildComponent("text", { id: "HeadingLabel", class: `White MiddleAlign ${i % 3 === 0 ? 'FontSmallest' : 'FontMedium'}`, ref: textRef, x: "68.979425", y: "154.64206", transform: `translate(${dX} 0)` }, (360 - headingOffset)));
                this.tickNumberRefs.push(textRef);
            }
        }
        return result;
    }
    onAfterRender(node) {
        var _a;
        super.onAfterRender(node);
        const pf = this.props.bus.getSubscriber();
        (_a = this.props.yOffset) === null || _a === void 0 ? void 0 : _a.sub((yOffset) => {
            this.yOffset = yOffset;
            this.refElement.instance.style.transform = `translate3d(${this.tapeOffset}px, ${yOffset}px, 0px)`;
        });
        pf.on('headingAr').handle((newVal) => {
            const multiplier = 100;
            const currentValueAtPrecision = Math.round(newVal.value * multiplier) / multiplier;
            const tapeOffset = -currentValueAtPrecision % 10 * this.props.distanceSpacing / this.props.valueSpacing;
            if (currentValueAtPrecision / 10 >= this.currentDrawnHeading + 1 || currentValueAtPrecision / 10 <= this.currentDrawnHeading) {
                this.currentDrawnHeading = Math.floor(currentValueAtPrecision / 10);
                const start = 330 + (this.currentDrawnHeading) * 10;
                this.tickNumberRefs.forEach((t, index) => {
                    const scrollerValue = t.instance;
                    if (scrollerValue !== null) {
                        const hdg = (start + index * 10) % 360;
                        if (hdg % 10 === 0) {
                            const content = hdg !== 0 ? (hdg / 10).toFixed(0) : '0';
                            if (scrollerValue.textContent !== content) {
                                scrollerValue.textContent = content;
                            }
                        }
                        else {
                            scrollerValue.textContent = '';
                        }
                        if (hdg % 30 === 0) {
                            scrollerValue.classList.remove('FontSmallest');
                            scrollerValue.classList.add('FontMedium');
                        }
                        else {
                            scrollerValue.classList.add('FontSmallest');
                            scrollerValue.classList.remove('FontMedium');
                        }
                    }
                });
            }
            this.tapeOffset = tapeOffset;
            this.refElement.instance.style.transform = `translate3d(${tapeOffset}px, ${this.yOffset}px, 0px)`;
        });
    }
    render() {
        const tapeContent = this.props.type === 'horizon' ? this.buildHorizonTicks() : this.buildHeadingTicks();
        return (FSComponent.buildComponent("g", { id: "HeadingTick", ref: this.refElement },
            tapeContent.ticks,
            this.props.type === 'headingTape' && tapeContent.labels));
    }
}

const DisplayRange$2 = 24;
const DistanceSpacing$2 = 7.555;
const ValueSpacing$2 = 5;
class HeadingTape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.headingTapeRef = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.failed.sub((failed) => {
            if (failed) {
                this.headingTapeRef.instance.style.visibility = 'hidden';
            }
            else {
                this.headingTapeRef.instance.style.visibility = 'visible';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.headingTapeRef },
            FSComponent.buildComponent("path", { id: "HeadingTapeBackground", d: "m32.138 145.34h73.536v10.382h-73.536z", class: "TapeBackground" }),
            FSComponent.buildComponent(HorizontalTape, { bus: this.props.bus, type: "headingTape", displayRange: DisplayRange$2 + 3, valueSpacing: ValueSpacing$2, distanceSpacing: DistanceSpacing$2 })));
    }
}
class HeadingOfftape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.normalRef = FSComponent.createRef();
        this.abnormalRef = FSComponent.createRef();
        this.heading = Subject.create(0);
        this.ILSCourse = Subject.create(0);
        this.lsPressed = Subject.create(false);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('headingAr').handle((h) => {
            this.heading.set(h.value);
            if (h.isNormalOperation()) {
                this.normalRef.instance.style.visibility = 'visible';
                this.abnormalRef.instance.style.visibility = 'hidden';
            }
            else {
                this.normalRef.instance.style.visibility = 'hidden';
                this.abnormalRef.instance.style.visibility = 'visible';
            }
        });
        sub.on('ilsCourse').whenChanged().handle((n) => {
            this.ILSCourse.set(n);
        });
        sub.on('hEvent').handle((eventName) => {
            if (eventName === `A320_Neo_PFD_BTN_LS_${getDisplayIndex()}`) {
                this.lsPressed.set(!this.lsPressed.get());
            }
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { ref: this.abnormalRef },
                FSComponent.buildComponent("path", { id: "HeadingTapeBackground", d: "m32.138 145.34h73.536v10.382h-73.536z", class: "TapeBackground" }),
                FSComponent.buildComponent("path", { id: "HeadingTapeOutline", class: "NormalStroke Red", d: "m32.138 156.23v-10.886h73.536v10.886" }),
                FSComponent.buildComponent("text", { id: "HDGFailText", class: "Blink9Seconds FontLargest EndAlign Red", x: "75.926208", y: "151.95506" }, "HDG")),
            FSComponent.buildComponent("g", { id: "HeadingOfftapeGroup", ref: this.normalRef },
                FSComponent.buildComponent("path", { id: "HeadingTapeOutline", class: "NormalStroke White", d: "m32.138 156.23v-10.886h73.536v10.886" }),
                FSComponent.buildComponent(SelectedHeading, { heading: this.heading, bus: this.props.bus }),
                FSComponent.buildComponent(QFUIndicator, { heading: this.heading, ILSCourse: this.ILSCourse, lsPressed: this.lsPressed }),
                FSComponent.buildComponent("path", { class: "Fill Yellow", d: "m69.61 147.31h-1.5119v-8.0635h1.5119z" }),
                FSComponent.buildComponent(GroundTrackBug, { bus: this.props.bus, heading: this.heading }))));
    }
}
class SelectedHeading extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.selectedHeading = NaN;
        this.showSelectedHeading = 0;
        this.targetIndicator = FSComponent.createRef();
        this.headingTextRight = FSComponent.createRef();
        this.headingTextLeft = FSComponent.createRef();
        this.text = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        const spsub = this.props.bus.getSubscriber();
        spsub.on('selectedHeading').whenChanged().handle((h) => {
            if (this.showSelectedHeading === 1) {
                this.selectedHeading = h;
                this.handleDelta(this.props.heading.get(), this.selectedHeading);
            }
            else {
                this.selectedHeading = NaN;
            }
        });
        sub.on('showSelectedHeading').whenChanged().handle((sh) => {
            this.showSelectedHeading = sh;
            if (this.showSelectedHeading === 0) {
                this.selectedHeading = NaN;
            }
            this.handleDelta(this.props.heading.get(), this.selectedHeading);
        });
        this.props.heading.sub((h) => {
            this.handleDelta(h, this.selectedHeading);
        }, true);
    }
    handleDelta(heading, selectedHeading) {
        const headingDelta = getSmallestAngle(selectedHeading, heading);
        this.text.set(Math.round(selectedHeading).toString().padStart(3, '0'));
        if (Number.isNaN(selectedHeading)) {
            this.headingTextLeft.instance.classList.add('HiddenElement');
            this.targetIndicator.instance.classList.add('HiddenElement');
            this.headingTextRight.instance.classList.add('HiddenElement');
            return;
        }
        if (Math.abs(headingDelta) < DisplayRange$2) {
            const offset = headingDelta * DistanceSpacing$2 / ValueSpacing$2;
            this.targetIndicator.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
            this.targetIndicator.instance.classList.remove('HiddenElement');
            this.headingTextRight.instance.classList.add('HiddenElement');
            this.headingTextLeft.instance.classList.add('HiddenElement');
            return;
        }
        this.targetIndicator.instance.classList.add('HiddenElement');
        if (headingDelta > 0) {
            this.headingTextRight.instance.classList.remove('HiddenElement');
            this.headingTextLeft.instance.classList.add('HiddenElement');
        }
        else {
            this.headingTextRight.instance.classList.add('HiddenElement');
            this.headingTextLeft.instance.classList.remove('HiddenElement');
        }
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("path", { ref: this.targetIndicator, id: "HeadingTargetIndicator", class: "NormalStroke Cyan CornerRound", d: "m69.978 145.1 1.9501-5.3609h-6.0441l1.9501 5.3609" }),
            FSComponent.buildComponent("text", { ref: this.headingTextRight, id: "SelectedHeadingTextRight", class: "FontSmallest MiddleAlign Cyan", x: "101.70432", y: "144.34792" }, this.text),
            FSComponent.buildComponent("text", { ref: this.headingTextLeft, id: "SelectedHeadingTextLeft", class: "FontSmallest MiddleAlign Cyan", x: "36.418198", y: "144.32108" }, this.text)));
    }
}
class GroundTrackBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.trackIndicator = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('groundTrackAr').handle((groundTrack) => {
            //  if (groundTrack.isNormalOperation()) {
            const offset = getSmallestAngle(groundTrack.value, this.props.heading.get()) * DistanceSpacing$2 / ValueSpacing$2;
            this.trackIndicator.instance.style.display = 'inline';
            this.trackIndicator.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
            //   } else {
            //       this.trackIndicator.instance.style.display = 'none';
            //   }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.trackIndicator, id: "ActualTrackIndicator" },
            FSComponent.buildComponent("path", { class: "ThickOutline CornerRound", d: "m68.906 145.75-1.2592 1.7639 1.2592 1.7639 1.2592-1.7639z" }),
            FSComponent.buildComponent("path", { class: "ThickStroke Green CornerRound", d: "m68.906 145.75-1.2592 1.7639 1.2592 1.7639 1.2592-1.7639z" })));
    }
}
class QFUIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.qfuContainer = FSComponent.createRef();
        this.ilsCourseRight = FSComponent.createRef();
        this.ilsCourseLeft = FSComponent.createRef();
        this.ilsCoursePointer = FSComponent.createRef();
        this.heading = 0;
        this.ilsCourse = -1;
        this.lsPressed = false;
        this.text = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.heading.sub((h) => {
            this.heading = h;
            const delta = getSmallestAngle(this.ilsCourse, this.heading);
            this.text.set(Math.round(this.ilsCourse).toString().padStart(3, '0'));
            if (this.ilsCourse < 0) {
                this.qfuContainer.instance.classList.add('HiddenElement');
            }
            else if (this.lsPressed) {
                this.qfuContainer.instance.classList.remove('HiddenElement');
                if (Math.abs(delta) > DisplayRange$2) {
                    if (delta > 0) {
                        this.ilsCourseRight.instance.classList.remove('HiddenElement');
                        this.ilsCourseLeft.instance.classList.add('HiddenElement');
                        this.ilsCoursePointer.instance.classList.add('HiddenElement');
                    }
                    else {
                        this.ilsCourseLeft.instance.classList.remove('HiddenElement');
                        this.ilsCourseRight.instance.classList.add('HiddenElement');
                        this.ilsCoursePointer.instance.classList.add('HiddenElement');
                    }
                }
                else {
                    const offset = getSmallestAngle(this.ilsCourse, this.heading) * DistanceSpacing$2 / ValueSpacing$2;
                    this.ilsCoursePointer.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                    this.ilsCoursePointer.instance.classList.remove('HiddenElement');
                    this.ilsCourseRight.instance.classList.add('HiddenElement');
                    this.ilsCourseLeft.instance.classList.add('HiddenElement');
                }
            }
        });
        this.props.ILSCourse.sub((c) => {
            this.ilsCourse = c;
            const delta = getSmallestAngle(this.ilsCourse, this.heading);
            this.text.set(Math.round(this.ilsCourse).toString().padStart(3, '0'));
            if (c < 0) {
                this.qfuContainer.instance.classList.add('HiddenElement');
            }
            else if (this.lsPressed) {
                this.qfuContainer.instance.classList.remove('HiddenElement');
                if (Math.abs(delta) > DisplayRange$2) {
                    if (delta > 0) {
                        this.ilsCourseRight.instance.classList.remove('HiddenElement');
                        this.ilsCourseLeft.instance.classList.add('HiddenElement');
                        this.ilsCoursePointer.instance.classList.add('HiddenElement');
                    }
                    else {
                        this.ilsCourseLeft.instance.classList.remove('HiddenElement');
                        this.ilsCourseRight.instance.classList.add('HiddenElement');
                        this.ilsCoursePointer.instance.classList.add('HiddenElement');
                    }
                }
                else {
                    const offset = getSmallestAngle(this.ilsCourse, this.heading) * DistanceSpacing$2 / ValueSpacing$2;
                    this.ilsCoursePointer.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                    this.ilsCoursePointer.instance.classList.remove('HiddenElement');
                    this.ilsCourseRight.instance.classList.add('HiddenElement');
                    this.ilsCourseLeft.instance.classList.add('HiddenElement');
                }
            }
        });
        this.props.lsPressed.sub((ls) => {
            this.lsPressed = ls;
            // ilsCourse may be negative if tuned via the RMP then back to MCDU
            if (ls && this.ilsCourse >= 0) {
                this.qfuContainer.instance.classList.remove('HiddenElement');
            }
            else {
                this.qfuContainer.instance.classList.add('HiddenElement');
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.qfuContainer },
            FSComponent.buildComponent("g", { id: "ILSCoursePointer", class: "HiddenElement", ref: this.ilsCoursePointer },
                FSComponent.buildComponent("path", { class: "ThickOutline", d: "m66.992 152.82h3.8279m-1.914-6.5471v9.4518" }),
                FSComponent.buildComponent("path", { class: "ThickStroke Magenta", d: "m66.992 152.82h3.8279m-1.914-6.5471v9.4518" })),
            FSComponent.buildComponent("g", { id: "ILSCourseRight", class: "HiddenElement", ref: this.ilsCourseRight },
                FSComponent.buildComponent("path", { class: "BlackFill NormalStroke White", d: "m100.57 149.68h12.088v6.5516h-12.088z" }),
                FSComponent.buildComponent("text", { id: "ILSCourseTextRight", class: "FontMedium MiddleAlign Magenta", x: "106.95047", y: "155.22305" }, this.text)),
            FSComponent.buildComponent("g", { id: "ILSCourseLeft", class: "HiddenElement", ref: this.ilsCourseLeft },
                FSComponent.buildComponent("path", { class: "BlackFill NormalStroke White", d: "m26.094 156.18v-6.5516h12.088v6.5516z" }),
                FSComponent.buildComponent("text", { id: "ILSCourseTextLeft", class: "FontMedium MiddleAlign Magenta", x: "32.406616", y: "155.22305" }, this.text))));
    }
}

const DisplayRange$1 = 35;
const DistanceSpacing$1 = 15;
const ValueSpacing$1 = 10;
class HeadingBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.isActive = false;
        this.selectedHeading = 0;
        this.heading = new Arinc429Word(0);
        this.horizonHeadingBug = FSComponent.createRef();
        this.yOffset = 0;
    }
    calculateAndSetOffset() {
        const headingDelta = getSmallestAngle(this.selectedHeading, this.heading.value);
        const offset = headingDelta * DistanceSpacing$1 / ValueSpacing$1;
        if (Math.abs(offset) <= DisplayRange$1 + 10) {
            this.horizonHeadingBug.instance.classList.remove('HiddenElement');
            this.horizonHeadingBug.instance.style.transform = `translate3d(${offset}px, ${this.yOffset}px, 0px)`;
        }
        else {
            this.horizonHeadingBug.instance.classList.add('HiddenElement');
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('selectedHeading').whenChanged().handle((s) => {
            this.selectedHeading = s;
            if (this.isActive) {
                this.calculateAndSetOffset();
            }
        });
        sub.on('headingAr').handle((h) => {
            this.heading = h;
            if (this.isActive) {
                this.calculateAndSetOffset();
            }
        });
        sub.on(this.props.isCaptainSide ? 'fd1Active' : 'fd2Active').whenChanged().handle((fd) => {
            this.isActive = !fd;
            if (this.isActive) {
                this.horizonHeadingBug.instance.classList.remove('HiddenElement');
            }
            else {
                this.horizonHeadingBug.instance.classList.add('HiddenElement');
            }
        });
        this.props.yOffset.sub((yOffset) => {
            this.yOffset = yOffset;
            if (this.isActive) {
                this.calculateAndSetOffset();
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.horizonHeadingBug, id: "HorizonHeadingBug" },
            FSComponent.buildComponent("path", { class: "ThickOutline", d: "m68.906 80.823v-9.0213" }),
            FSComponent.buildComponent("path", { class: "ThickStroke Cyan", d: "m68.906 80.823v-9.0213" })));
    }
}
class Horizon extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.pitchGroupRef = FSComponent.createRef();
        this.rollGroupRef = FSComponent.createRef();
        this.pitchProtSymbolUpper = FSComponent.createRef();
        this.pitchProtSymbolLower = FSComponent.createRef();
        this.pitchProtLostSymbolUpper = FSComponent.createRef();
        this.pitchProtLostSymbolLower = FSComponent.createRef();
        this.yOffset = Subject.create(0);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const apfd = this.props.bus.getSubscriber();
        apfd.on('pitchAr').withArinc429Precision(3).handle((pitch) => {
            const multiplier = 1000;
            const currentValueAtPrecision = Math.round(pitch.value * multiplier) / multiplier;
            if (pitch.isNormalOperation()) {
                this.pitchGroupRef.instance.style.display = 'block';
                this.pitchGroupRef.instance.style.transform = `translate3d(0px, ${calculateHorizonOffsetFromPitch(currentValueAtPrecision)}px, 0px)`;
            }
            else {
                this.pitchGroupRef.instance.style.display = 'none';
            }
            const yOffset = Math.max(Math.min(calculateHorizonOffsetFromPitch(currentValueAtPrecision), 31.563), -31.563);
            this.yOffset.set(yOffset);
        });
        apfd.on('rollAr').withArinc429Precision(2).handle((roll) => {
            const multiplier = 100;
            const currentValueAtPrecision = Math.round(roll.value * multiplier) / multiplier;
            if (roll.isNormalOperation()) {
                this.rollGroupRef.instance.style.display = 'block';
                this.rollGroupRef.instance.setAttribute('transform', `rotate(${-currentValueAtPrecision} 68.814 80.730)`);
            }
            else {
                this.rollGroupRef.instance.style.display = 'none';
            }
        });
        apfd.on('fcdcDiscreteWord1').handle((fcdcWord1) => {
            const isNormalLawActive = fcdcWord1.getBitValue(11) && !fcdcWord1.isFailureWarning();
            this.pitchProtSymbolLower.instance.style.display = isNormalLawActive ? 'block' : 'none';
            this.pitchProtSymbolUpper.instance.style.display = isNormalLawActive ? 'block' : 'none';
            this.pitchProtLostSymbolLower.instance.style.display = !isNormalLawActive ? 'block' : 'none';
            this.pitchProtLostSymbolUpper.instance.style.display = !isNormalLawActive ? 'block' : 'none';
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "RollGroup", ref: this.rollGroupRef, style: "display:none" },
            FSComponent.buildComponent("g", { id: "PitchGroup", ref: this.pitchGroupRef },
                FSComponent.buildComponent("path", { d: "m23.906 80.823v-160h90v160z", class: "SkyFill" }),
                FSComponent.buildComponent("path", { d: "m113.91 223.82h-90v-143h90z", class: "EarthFill" }),
                FSComponent.buildComponent("g", { class: "NormalStroke White" },
                    FSComponent.buildComponent("path", { d: "m66.406 85.323h5h0" }),
                    FSComponent.buildComponent("path", { d: "m64.406 89.823h9h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 94.073h5h0" }),
                    FSComponent.buildComponent("path", { d: "m59.406 97.823h19h0" }),
                    FSComponent.buildComponent("path", { d: "m64.406 103.82h9h0" }),
                    FSComponent.buildComponent("path", { d: "m59.406 108.82h19h0" }),
                    FSComponent.buildComponent("path", { d: "m55.906 118.82h26h0" }),
                    FSComponent.buildComponent("path", { d: "m52.906 138.82h32h0" }),
                    FSComponent.buildComponent("path", { d: "m47.906 168.82h42h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 76.323h5h0" }),
                    FSComponent.buildComponent("path", { d: "m64.406 71.823h9h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 67.323h5h0" }),
                    FSComponent.buildComponent("path", { d: "m59.406 62.823h19h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 58.323h5h0" }),
                    FSComponent.buildComponent("path", { d: "m64.406 53.823h9h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 49.323h5h0" }),
                    FSComponent.buildComponent("path", { d: "m59.406 44.823h19h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 40.573h5h0" }),
                    FSComponent.buildComponent("path", { d: "m64.406 36.823h9h0" }),
                    FSComponent.buildComponent("path", { d: "m66.406 33.573h5h0" }),
                    FSComponent.buildComponent("path", { d: "m55.906 30.823h26h0" }),
                    FSComponent.buildComponent("path", { d: "m52.906 10.823h32h0" }),
                    FSComponent.buildComponent("path", { d: "m47.906-19.177h42h0" })),
                FSComponent.buildComponent("g", { id: "PitchProtUpper", ref: this.pitchProtSymbolUpper, style: "display: none", class: "NormalStroke Green" },
                    FSComponent.buildComponent("path", { d: "m51.506 31.523h4m-4-1.4h4" }),
                    FSComponent.buildComponent("path", { d: "m86.306 31.523h-4m4-1.4h-4" })),
                FSComponent.buildComponent("g", { id: "PitchProtLostUpper", ref: this.pitchProtLostSymbolUpper, style: "display: none", class: "NormalStroke Amber" },
                    FSComponent.buildComponent("path", { d: "m52.699 30.116 1.4142 1.4142m-1.4142 0 1.4142-1.4142" }),
                    FSComponent.buildComponent("path", { d: "m85.114 31.53-1.4142-1.4142m1.4142 0-1.4142 1.4142" })),
                FSComponent.buildComponent("g", { id: "PitchProtLower", ref: this.pitchProtSymbolLower, style: "display: none", class: "NormalStroke Green" },
                    FSComponent.buildComponent("path", { d: "m59.946 104.52h4m-4-1.4h4" }),
                    FSComponent.buildComponent("path", { d: "m77.867 104.52h-4m4-1.4h-4" })),
                FSComponent.buildComponent("g", { id: "PitchProtLostLower", ref: this.pitchProtLostSymbolLower, style: "display: none", class: "NormalStroke Amber" },
                    FSComponent.buildComponent("path", { d: "m61.199 103.12 1.4142 1.4142m-1.4142 0 1.4142-1.4142" }),
                    FSComponent.buildComponent("path", { d: "m76.614 104.53-1.4142-1.4142m1.4142 0-1.4142 1.4142" })),
                FSComponent.buildComponent("path", { d: "m68.906 121.82-8.0829 14h2.8868l5.1962-9 5.1962 9h2.8868z", class: "NormalStroke Red" }),
                FSComponent.buildComponent("path", { d: "m57.359 163.82 11.547-20 11.547 20h-4.0414l-7.5056-13-7.5056 13z", class: "NormalStroke Red" }),
                FSComponent.buildComponent("path", { d: "m71.906 185.32v3.5h15l-18-18-18 18h15v-3.5h-6.5l9.5-9.5 9.5 9.5z", class: "NormalStroke Red" }),
                FSComponent.buildComponent("path", { d: "m60.824 13.823h2.8868l5.1962 9 5.1962-9h2.8868l-8.0829 14z", class: "NormalStroke Red" }),
                FSComponent.buildComponent("path", { d: "m61.401-13.177h-4.0414l11.547 20 11.547-20h-4.0414l-7.5056 13z", class: "NormalStroke Red" }),
                FSComponent.buildComponent("path", { d: "m68.906-26.177-9.5-9.5h6.5v-3.5h-15l18 18 18-18h-15v3.5h6.5z", class: "NormalStroke Red" }),
                FSComponent.buildComponent(TailstrikeIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent("path", { d: "m23.906 80.823h90h0", class: "NormalOutline" }),
                FSComponent.buildComponent("path", { d: "m23.906 80.823h90h0", class: "NormalStroke White" }),
                FSComponent.buildComponent("g", { class: "FontSmall White Fill EndAlign" },
                    FSComponent.buildComponent("text", { x: "55.729935", y: "64.812828" }, "10"),
                    FSComponent.buildComponent("text", { x: "88.618317", y: "64.812714" }, "10"),
                    FSComponent.buildComponent("text", { x: "54.710766", y: "46.931034" }, "20"),
                    FSComponent.buildComponent("text", { x: "89.564583", y: "46.930969" }, "20"),
                    FSComponent.buildComponent("text", { x: "50.867237", y: "32.910896" }, "30"),
                    FSComponent.buildComponent("text", { x: "93.408119", y: "32.910839" }, "30"),
                    FSComponent.buildComponent("text", { x: "48.308414", y: "12.690886" }, "50"),
                    FSComponent.buildComponent("text", { x: "96.054962", y: "12.690853" }, "50"),
                    FSComponent.buildComponent("text", { x: "43.050652", y: "-17.138285" }, "80"),
                    FSComponent.buildComponent("text", { x: "101.48304", y: "-17.138248" }, "80"),
                    FSComponent.buildComponent("text", { x: "55.781109", y: "99.81395" }, "10"),
                    FSComponent.buildComponent("text", { x: "88.669487", y: "99.813919" }, "10"),
                    FSComponent.buildComponent("text", { x: "54.645519", y: "110.8641" }, "20"),
                    FSComponent.buildComponent("text", { x: "89.892426", y: "110.86408" }, "20"),
                    FSComponent.buildComponent("text", { x: "51.001217", y: "120.96314" }, "30"),
                    FSComponent.buildComponent("text", { x: "93.280037", y: "120.96311" }, "30"),
                    FSComponent.buildComponent("text", { x: "48.220913", y: "140.69778" }, "50"),
                    FSComponent.buildComponent("text", { x: "96.090324", y: "140.69786" }, "50"),
                    FSComponent.buildComponent("text", { x: "43.125065", y: "170.80962" }, "80"),
                    FSComponent.buildComponent("text", { x: "101.38947", y: "170.80959" }, "80"))),
            FSComponent.buildComponent("path", { d: "m40.952 49.249v-20.562h55.908v20.562z", class: "NormalOutline SkyFill" }),
            FSComponent.buildComponent("path", { d: "m40.952 49.249v-20.562h55.908v20.562z", class: "NormalStroke White" }),
            FSComponent.buildComponent(SideslipIndicator, { bus: this.props.bus, instrument: this.props.instrument }),
            FSComponent.buildComponent(RisingGround, { bus: this.props.bus, filteredRadioAltitude: this.props.filteredRadioAlt }),
            FSComponent.buildComponent(HorizontalTape, { type: "horizon", bus: this.props.bus, displayRange: DisplayRange$1, valueSpacing: ValueSpacing$1, distanceSpacing: DistanceSpacing$1, yOffset: this.yOffset }),
            FSComponent.buildComponent(HeadingBug, { bus: this.props.bus, isCaptainSide: getDisplayIndex() === 1, yOffset: this.yOffset }),
            FSComponent.buildComponent(RadioAltAndDH, { bus: this.props.bus, filteredRadioAltitude: this.props.filteredRadioAlt, attExcessive: this.props.isAttExcessive })));
    }
}
class TailstrikeIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.tailStrike = FSComponent.createRef();
        this.needsUpdate = false;
        this.tailStrikeConditions = {
            altitude: new Arinc429Word(0),
            speed: 0,
            tla1: 0,
            tla2: 0,
        };
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('chosenRa').handle((ra) => {
            this.tailStrikeConditions.altitude = ra;
            this.needsUpdate = true;
        });
        sub.on('tla1').whenChanged().handle((tla) => {
            this.tailStrikeConditions.tla1 = tla;
            this.needsUpdate = true;
        });
        sub.on('tla2').whenChanged().handle((tla) => {
            this.tailStrikeConditions.tla2 = tla;
            this.needsUpdate = true;
        });
        sub.on('speedAr').whenChanged().handle((speed) => {
            this.tailStrikeConditions.speed = speed.value;
            this.needsUpdate = true;
        });
        sub.on('realTime').onlyAfter(2).handle(this.hideShow.bind(this));
    }
    hideShow(_time) {
        if (this.needsUpdate) {
            this.needsUpdate = false;
            if (this.tailStrikeConditions.altitude.value > 400 || this.tailStrikeConditions.speed < 50 || this.tailStrikeConditions.tla1 >= 35 || this.tailStrikeConditions.tla2 >= 35) {
                this.tailStrike.instance.style.display = 'none';
            }
            else {
                this.tailStrike.instance.style.display = 'inline';
            }
        }
    }
    render() {
        return (FSComponent.buildComponent("path", { ref: this.tailStrike, id: "TailstrikeWarning", d: "m72.682 50.223h2.9368l-6.7128 8-6.7128-8h2.9368l3.7759 4.5z", class: "NormalStroke Amber" }));
    }
}
class RadioAltAndDH extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.daRaGroup = FSComponent.createRef();
        this.roll = new Arinc429Word(0);
        this.dh = 0;
        this.filteredRadioAltitude = 0;
        this.radioAltitude = new Arinc429Word(0);
        this.transAlt = 0;
        this.transAltAppr = 0;
        this.fmgcFlightPhase = 0;
        this.altitude = new Arinc429Word(0);
        this.attDhText = FSComponent.createRef();
        this.radioAltText = Subject.create('0');
        this.radioAlt = FSComponent.createRef();
        this.classSub = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('rollAr').handle((roll) => {
            this.roll = roll;
        });
        sub.on('dh').whenChanged().handle((dh) => {
            this.dh = dh;
        });
        sub.on('transAlt').whenChanged().handle((ta) => {
            this.transAlt = ta;
        });
        sub.on('transAltAppr').whenChanged().handle((ta) => {
            this.transAltAppr = ta;
        });
        sub.on('fmgcFlightPhase').whenChanged().handle((fp) => {
            this.fmgcFlightPhase = fp;
        });
        sub.on('altitudeAr').handle((a) => {
            this.altitude = a;
        });
        sub.on('chosenRa').handle((ra) => {
            if (!this.props.attExcessive.get()) {
                this.radioAltitude = ra;
                const raFailed = !this.radioAltitude.isFailureWarning();
                const raHasData = !this.radioAltitude.isNoComputedData();
                const raValue = this.filteredRadioAltitude;
                const verticalOffset = calculateVerticalOffsetFromRoll(this.roll.value);
                const chosenTransalt = this.fmgcFlightPhase <= 3 ? this.transAlt : this.transAltAppr;
                const belowTransitionAltitude = chosenTransalt !== 0 && (!this.altitude.isNoComputedData() && !this.altitude.isNoComputedData()) && this.altitude.value < chosenTransalt;
                let size = 'FontLarge';
                const DHValid = this.dh >= 0;
                let text = '';
                let color = 'Amber';
                if (raHasData) {
                    if (raFailed) {
                        if (raValue < 2500) {
                            if (raValue > 400 || (raValue > this.dh + 100 && DHValid)) {
                                color = 'Green';
                            }
                            if (raValue < 400) {
                                size = 'FontLargest';
                            }
                            if (raValue < 5) {
                                text = Math.round(raValue).toString();
                            }
                            else if (raValue <= 50) {
                                text = (Math.round(raValue / 5) * 5).toString();
                            }
                            else if (raValue > 50 || (raValue > this.dh + 100 && DHValid)) {
                                text = (Math.round(raValue / 10) * 10).toString();
                            }
                        }
                    }
                    else {
                        color = belowTransitionAltitude ? 'Red Blink9Seconds' : 'Red';
                        text = 'RA';
                    }
                }
                this.daRaGroup.instance.style.transform = `translate3d(0px, ${-verticalOffset}px, 0px)`;
                if (raFailed && DHValid && raValue <= this.dh) {
                    this.attDhText.instance.style.visibility = 'visible';
                }
                else {
                    this.attDhText.instance.style.visibility = 'hidden';
                }
                this.radioAltText.set(text);
                this.classSub.set(`${size} ${color} MiddleAlign TextOutline`);
            }
        });
        this.props.filteredRadioAltitude.sub((fra) => {
            this.filteredRadioAltitude = fra;
        }, true);
        this.props.attExcessive.sub((ae) => {
            if (ae) {
                this.radioAlt.instance.style.visibility = 'hidden';
            }
            else {
                this.radioAlt.instance.style.visibility = 'visible';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.daRaGroup, id: "DHAndRAGroup" },
            FSComponent.buildComponent("text", { ref: this.attDhText, id: "AttDHText", x: "73.511879", y: "113.19068", class: "FontLargest Amber EndAlign Blink9Seconds TextOutline" }, "DH"),
            FSComponent.buildComponent("text", { ref: this.radioAlt, id: "RadioAlt", x: "69.202454", y: "119.76205", class: this.classSub }, this.radioAltText)));
    }
}
class SideslipIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.latAccFilter = new LagFilter(0.5);
        this.estimatedBetaFilter = new LagFilter(2);
        this.betaTargetFilter = new LagFilter(2);
        this.classNameSub = Subject.create('Yellow');
        this.filteredLatAccSub = Subject.create(0);
        this.rollTriangle = FSComponent.createRef();
        this.slideSlip = FSComponent.createRef();
        this.siFailFlag = FSComponent.createRef();
        this.onGround = true;
        this.leftMainGearCompressed = true;
        this.rightMainGearCompressed = true;
        this.roll = new Arinc429Word(0);
        this.beta = new Arinc429Word(0);
        this.betaTarget = new Arinc429Word(0);
        this.latAcc = new Arinc429Word(0);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('leftMainGearCompressed').whenChanged().handle((og) => {
            this.leftMainGearCompressed = og;
            this.onGround = this.rightMainGearCompressed || og;
            this.determineSlideSlip();
        });
        sub.on('rightMainGearCompressed').whenChanged().handle((og) => {
            this.rightMainGearCompressed = og;
            this.onGround = this.leftMainGearCompressed || og;
            this.determineSlideSlip();
        });
        sub.on('rollAr').withArinc429Precision(2).handle((roll) => {
            this.roll = roll;
            this.determineSlideSlip();
        });
        sub.on('estimatedBeta').withArinc429Precision(2).handle((beta) => {
            this.beta = beta;
            this.determineSlideSlip();
        });
        sub.on('betaTarget').withArinc429Precision(2).handle((betaTarget) => {
            this.betaTarget = betaTarget;
            this.determineSlideSlip();
        });
        sub.on('latAcc').withArinc429Precision(2).handle((latAcc) => {
            this.latAcc = latAcc;
        });
        sub.on('realTime').handle(() => {
            this.filteredLatAccSub.set(this.latAccFilter.step(this.latAcc.valueOr(0), this.props.instrument.deltaTime / 1000));
        });
        this.filteredLatAccSub.sub(() => {
            this.determineSlideSlip();
        });
    }
    determineSlideSlip() {
        const multiplier = 100;
        const currentValueAtPrecision = Math.round(this.roll.value * multiplier) / multiplier;
        const verticalOffset = calculateVerticalOffsetFromRoll(currentValueAtPrecision);
        let offset = 0;
        let betaTargetActive = false;
        if (this.onGround && this.latAcc.isFailureWarning() || !this.onGround && this.latAcc.isFailureWarning() && this.beta.isFailureWarning()) {
            this.slideSlip.instance.style.visibility = 'hidden';
            this.siFailFlag.instance.style.display = 'block';
        }
        else {
            this.slideSlip.instance.style.visibility = 'visible';
            this.siFailFlag.instance.style.display = 'none';
        }
        if (!this.onGround && !this.beta.isFailureWarning() && !(this.betaTarget.isFailureWarning() || this.betaTarget.isNoComputedData())) {
            offset = Math.max(Math.min(this.beta.value - this.betaTarget.value, 15), -15);
            betaTargetActive = true;
        }
        else if (!this.onGround && !this.beta.isFailureWarning()) {
            offset = Math.max(Math.min(this.beta.value, 15), -15);
        }
        else {
            const latAcc = this.filteredLatAccSub.get();
            const accInG = Math.min(0.3, Math.max(-0.3, latAcc));
            offset = Math.round(-accInG * 15 / 0.3 * multiplier) / multiplier;
        }
        this.rollTriangle.instance.style.transform = `translate3d(0px, ${verticalOffset.toFixed(2)}px, 0px)`;
        this.classNameSub.set(betaTargetActive ? 'Cyan' : 'Yellow');
        this.slideSlip.instance.style.transform = `translate3d(${offset}px, 0px, 0px)`;
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "RollTriangleGroup", ref: this.rollTriangle, class: "NormalStroke Yellow CornerRound" },
            FSComponent.buildComponent("path", { d: "m66.074 43.983 2.8604-4.2333 2.8604 4.2333z" }),
            FSComponent.buildComponent("path", { id: "SideSlipIndicator", ref: this.slideSlip, class: this.classNameSub, d: "m73.974 47.208-1.4983-2.2175h-7.0828l-1.4983 2.2175z" }),
            FSComponent.buildComponent("text", { id: "SIFailText", ref: this.siFailFlag, x: "72.315376", y: "48.116844", class: "FontSmall Red Blink9Seconds EndAlign" }, "SI")));
    }
}
class RisingGround extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.radioAlt = new Arinc429Word(0);
        this.lastPitch = new Arinc429Word(0);
        this.horizonGroundRectangle = FSComponent.createRef();
    }
    setOffset() {
        const targetPitch = (this.radioAlt.isNoComputedData() || this.radioAlt.isFailureWarning()) ? 200 : 0.1 * this.props.filteredRadioAltitude.get();
        const targetOffset = Math.max(Math.min(calculateHorizonOffsetFromPitch(this.lastPitch.value + targetPitch) - 31.563, 0), -63.093);
        this.horizonGroundRectangle.instance.style.transform = `translate3d(0px, ${targetOffset.toFixed(2)}px, 0px)`;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('pitchAr').handle((pitch) => {
            this.lastPitch = pitch;
        });
        sub.on('chosenRa').handle((p) => {
            this.radioAlt = p;
            this.setOffset();
        });
        this.props.filteredRadioAltitude.sub((_fra) => {
            this.setOffset();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.horizonGroundRectangle, id: "HorizonGroundRectangle" },
            FSComponent.buildComponent("path", { d: "m113.95 157.74h-90.08v-45.357h90.08z", class: "NormalOutline EarthFill" }),
            FSComponent.buildComponent("path", { d: "m113.95 157.74h-90.08v-45.357h90.08z", class: "NormalStroke White" })));
    }
}

class LandingSystem extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lsButtonPressedVisibility = false;
        this.xtkValid = Subject.create(false);
        this.ldevRequest = false;
        this.lsGroupRef = FSComponent.createRef();
        this.gsReferenceLine = FSComponent.createRef();
        this.deviationGroup = FSComponent.createRef();
        this.ldevRef = FSComponent.createRef();
        this.vdevRef = FSComponent.createRef();
        this.altitude = Arinc429Word.empty();
    }
    handleGsReferenceLine() {
        if (this.lsButtonPressedVisibility || (this.altitude.isNormalOperation())) {
            this.gsReferenceLine.instance.style.display = 'inline';
        }
        else if (!this.lsButtonPressedVisibility) {
            this.gsReferenceLine.instance.style.display = 'none';
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('hEvent').handle((eventName) => {
            if (eventName === `A320_Neo_PFD_BTN_LS_${getDisplayIndex()}`) {
                this.lsButtonPressedVisibility = !this.lsButtonPressedVisibility;
                SimVar.SetSimVarValue(`L:BTN_LS_${getDisplayIndex()}_FILTER_ACTIVE`, 'Bool', this.lsButtonPressedVisibility);
                this.lsGroupRef.instance.style.display = this.lsButtonPressedVisibility ? 'inline' : 'none';
                this.handleGsReferenceLine();
            }
        });
        sub.on(getDisplayIndex() === 1 ? 'ls1Button' : 'ls2Button').whenChanged().handle((lsButton) => {
            this.lsButtonPressedVisibility = lsButton;
            this.lsGroupRef.instance.style.display = this.lsButtonPressedVisibility ? 'inline' : 'none';
            this.deviationGroup.instance.style.display = this.lsButtonPressedVisibility ? 'none' : 'inline';
            this.handleGsReferenceLine();
        });
        sub.on('altitudeAr').handle((altitude) => {
            this.altitude = altitude;
            this.handleGsReferenceLine();
        });
        sub.on(getDisplayIndex() === 1 ? 'ldevRequestLeft' : 'ldevRequestRight').whenChanged().handle((ldevRequest) => {
            this.ldevRequest = ldevRequest;
            this.updateLdevVisibility();
        });
        sub.on('xtk').whenChanged().handle((xtk) => {
            this.xtkValid.set(Math.abs(xtk) > 0);
        });
        this.xtkValid.sub(() => {
            this.updateLdevVisibility();
        });
    }
    updateLdevVisibility() {
        this.ldevRef.instance.style.display = this.ldevRequest && this.xtkValid ? 'inline' : 'none';
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "LSGroup", ref: this.lsGroupRef, style: "display: none" },
                FSComponent.buildComponent(LandingSystemInfo, { bus: this.props.bus }),
                FSComponent.buildComponent("g", { id: "LSGroup" },
                    FSComponent.buildComponent(LocalizerIndicator, { bus: this.props.bus, instrument: this.props.instrument }),
                    FSComponent.buildComponent(GlideSlopeIndicator, { bus: this.props.bus, instrument: this.props.instrument }),
                    FSComponent.buildComponent(MarkerBeaconIndicator, { bus: this.props.bus })),
                FSComponent.buildComponent("path", { ref: this.gsReferenceLine, class: "Yellow Fill", d: "m115.52 80.067v1.5119h-8.9706v-1.5119z" })),
            FSComponent.buildComponent("g", { id: "DeviationGroup", ref: this.deviationGroup, style: "display: none" },
                FSComponent.buildComponent("g", { id: "LateralDeviationGroup", ref: this.ldevRef, style: "display: none" },
                    FSComponent.buildComponent(LDevIndicator, { bus: this.props.bus })),
                FSComponent.buildComponent("g", { id: "VerticalDeviationGroup", ref: this.vdevRef, style: "display: none" },
                    FSComponent.buildComponent(VDevIndicator, { bus: this.props.bus }))),
            FSComponent.buildComponent("path", { ref: this.gsReferenceLine, class: "Yellow Fill", d: "m115.52 80.067v1.5119h-8.9706v-1.5119z" })));
    }
}
class LandingSystemInfo extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.hasDme = false;
        this.identText = Subject.create('');
        this.freqTextLeading = Subject.create('');
        this.freqTextTrailing = Subject.create('');
        this.navFreq = 0;
        this.dme = 0;
        this.rmpTuned = false;
        this.dmeVisibilitySub = Subject.create('hidden');
        this.destRef = FSComponent.createRef();
        this.lsInfoGroup = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        // normally the ident and freq should be always displayed when an ILS freq is set, but currently it only show when we have a signal
        sub.on('hasLoc').whenChanged().handle((hasLoc) => {
            if (hasLoc) {
                this.lsInfoGroup.instance.style.display = 'inline';
            }
            else {
                this.lsInfoGroup.instance.style.display = 'none';
            }
        });
        sub.on('hasDme').whenChanged().handle((hasDme) => {
            this.hasDme = hasDme;
            this.updateContents();
        });
        sub.on('navIdent').whenChanged().handle((navIdent) => {
            this.identText.set(navIdent);
            this.updateContents();
        });
        sub.on('navFreq').whenChanged().handle((navFreq) => {
            this.navFreq = navFreq;
            this.updateContents();
        });
        sub.on('dme').whenChanged().handle((dme) => {
            this.dme = dme;
            this.updateContents();
        });
        sub.on('ilsRMPTuned').whenChanged().handle((rmpTuned) => {
            this.rmpTuned = rmpTuned;
            this.updateContents();
        });
    }
    updateContents() {
        const freqTextSplit = (Math.round(this.navFreq * 1000) / 1000).toString().split('.');
        this.freqTextLeading.set(freqTextSplit[0] === '0' ? '' : freqTextSplit[0]);
        if (freqTextSplit[1]) {
            this.freqTextTrailing.set(`.${freqTextSplit[1].padEnd(2, '0')}`);
        }
        else {
            this.freqTextTrailing.set('');
        }
        let distLeading = '';
        let distTrailing = '';
        if (this.hasDme && !this.rmpTuned) {
            this.dmeVisibilitySub.set('display: inline');
            const dist = Math.round(this.dme * 10) / 10;
            if (dist < 20) {
                const distSplit = dist.toString().split('.');
                distLeading = distSplit[0];
                distTrailing = `.${distSplit.length > 1 ? distSplit[1] : '0'}`;
            }
            else {
                distLeading = Math.round(dist).toString();
                distTrailing = '';
            }
            // eslint-disable-next-line max-len
            this.destRef.instance.innerHTML = `<tspan id="ILSDistLeading" class="FontLarge StartAlign">${distLeading}</tspan><tspan id="ILSDistTrailing" class="FontSmallest StartAlign">${distTrailing}</tspan>`;
        }
        else {
            this.dmeVisibilitySub.set('display: none');
        }
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "LSInfoGroup", ref: this.lsInfoGroup },
            FSComponent.buildComponent("text", { id: "ILSIdent", class: "Magenta FontLarge AlignLeft", x: "1.184", y: "145.11522" }, this.identText),
            FSComponent.buildComponent("text", { id: "ILSFreqLeading", class: "Magenta FontLarge AlignLeft", x: "1.3610243", y: "151.11575" }, this.freqTextLeading),
            FSComponent.buildComponent("text", { id: "ILSFreqTrailing", class: "Magenta FontSmallest AlignLeft", x: "12.964463", y: "151.24084" }, this.freqTextTrailing),
            FSComponent.buildComponent("g", { id: "ILSDistGroup", style: this.dmeVisibilitySub },
                FSComponent.buildComponent("text", { ref: this.destRef, class: "Magenta AlignLeft", x: "1.3685881", y: "157.26602" }),
                FSComponent.buildComponent("text", { class: "Cyan FontSmallest AlignLeft", x: "17.159119", y: "157.22606" }, "NM"))));
    }
}
class LocalizerIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lagFilter = new LagFilter(1.5);
        this.rightDiamond = FSComponent.createRef();
        this.leftDiamond = FSComponent.createRef();
        this.locDiamond = FSComponent.createRef();
        this.diamondGroup = FSComponent.createRef();
    }
    handleNavRadialError(radialError) {
        const deviation = this.lagFilter.step(radialError, this.props.instrument.deltaTime / 1000);
        const dots = deviation / 0.8;
        if (dots > 2) {
            this.rightDiamond.instance.classList.remove('HiddenElement');
            this.leftDiamond.instance.classList.add('HiddenElement');
            this.locDiamond.instance.classList.add('HiddenElement');
        }
        else if (dots < -2) {
            this.rightDiamond.instance.classList.add('HiddenElement');
            this.leftDiamond.instance.classList.remove('HiddenElement');
            this.locDiamond.instance.classList.add('HiddenElement');
        }
        else {
            this.locDiamond.instance.classList.remove('HiddenElement');
            this.rightDiamond.instance.classList.add('HiddenElement');
            this.leftDiamond.instance.classList.add('HiddenElement');
            this.locDiamond.instance.style.transform = `translate3d(${dots * 30.221 / 2}px, 0px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('hasLoc').whenChanged().handle((hasLoc) => {
            if (hasLoc) {
                this.diamondGroup.instance.classList.remove('HiddenElement');
                this.props.bus.on('navRadialError', this.handleNavRadialError.bind(this));
            }
            else {
                this.diamondGroup.instance.classList.add('HiddenElement');
                this.lagFilter.reset();
                this.props.bus.off('navRadialError', this.handleNavRadialError.bind(this));
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "LocalizerSymbolsGroup" },
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m54.804 130.51a1.0073 1.0079 0 1 0-2.0147 0 1.0073 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m39.693 130.51a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m85.024 130.51a1.0073 1.0079 0 1 0-2.0147 0 1.0073 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m100.13 130.51a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("g", { class: "HiddenElement", ref: this.diamondGroup },
                FSComponent.buildComponent("path", { id: "LocDiamondRight", ref: this.rightDiamond, class: "NormalStroke Magenta HiddenElement", d: "m99.127 133.03 3.7776-2.5198-3.7776-2.5198" }),
                FSComponent.buildComponent("path", { id: "LocDiamondLeft", ref: this.leftDiamond, class: "NormalStroke Magenta HiddenElement", d: "m38.686 133.03-3.7776-2.5198 3.7776-2.5198" }),
                FSComponent.buildComponent("path", { id: "LocDiamond", ref: this.locDiamond, class: "NormalStroke Magenta HiddenElement", d: "m65.129 130.51 3.7776 2.5198 3.7776-2.5198-3.7776-2.5198z" })),
            FSComponent.buildComponent("path", { id: "LocalizerNeutralLine", class: "Yellow Fill", d: "m68.098 134.5v-8.0635h1.5119v8.0635z" })));
    }
}
class GlideSlopeIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lagFilter = new LagFilter(1.5);
        this.upperDiamond = FSComponent.createRef();
        this.lowerDiamond = FSComponent.createRef();
        this.glideSlopeDiamond = FSComponent.createRef();
        this.diamondGroup = FSComponent.createRef();
        this.hasGlideSlope = false;
    }
    handleGlideSlopeError(glideSlopeError) {
        const deviation = this.lagFilter.step(glideSlopeError, this.props.instrument.deltaTime / 1000);
        const dots = deviation / 0.4;
        if (dots > 2) {
            this.upperDiamond.instance.classList.remove('HiddenElement');
            this.lowerDiamond.instance.classList.add('HiddenElement');
            this.glideSlopeDiamond.instance.classList.add('HiddenElement');
        }
        else if (dots < -2) {
            this.upperDiamond.instance.classList.add('HiddenElement');
            this.lowerDiamond.instance.classList.remove('HiddenElement');
            this.glideSlopeDiamond.instance.classList.add('HiddenElement');
        }
        else {
            this.upperDiamond.instance.classList.add('HiddenElement');
            this.lowerDiamond.instance.classList.add('HiddenElement');
            this.glideSlopeDiamond.instance.classList.remove('HiddenElement');
            this.glideSlopeDiamond.instance.style.transform = `translate3d(0px, ${dots * 30.238 / 2}px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('hasGlideslope').whenChanged().handle((hasGlideSlope) => {
            this.hasGlideSlope = hasGlideSlope;
            if (hasGlideSlope) {
                this.diamondGroup.instance.classList.remove('HiddenElement');
            }
            else {
                this.diamondGroup.instance.classList.add('HiddenElement');
                this.lagFilter.reset();
            }
        });
        sub.on('glideSlopeError').handle((gs) => {
            if (this.hasGlideSlope) {
                this.handleGlideSlopeError(gs);
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "LocalizerSymbolsGroup" },
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m110.71 50.585a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m110.71 65.704a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m110.71 95.942a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m110.71 111.06a1.0074 1.0079 0 1 0-2.0147 0 1.0074 1.0079 0 1 0 2.0147 0z" }),
            FSComponent.buildComponent("g", { class: "HideGSDiamond", ref: this.diamondGroup },
                FSComponent.buildComponent("path", { id: "GlideSlopeDiamondLower", ref: this.upperDiamond, class: "NormalStroke Magenta HiddenElement", d: "m107.19 111.06 2.5184 3.7798 2.5184-3.7798" }),
                FSComponent.buildComponent("path", { id: "GlideSlopeDiamondUpper", ref: this.lowerDiamond, class: "NormalStroke Magenta HiddenElement", d: "m107.19 50.585 2.5184-3.7798 2.5184 3.7798" }),
                FSComponent.buildComponent("path", { id: "GlideSlopeDiamond", ref: this.glideSlopeDiamond, class: "NormalStroke Magenta HiddenElement", d: "m109.7 77.043-2.5184 3.7798 2.5184 3.7798 2.5184-3.7798z" }))));
    }
}
class VDevIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.VDevSymbolLower = FSComponent.createRef();
        this.VDevSymbolUpper = FSComponent.createRef();
        this.VDevSymbol = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        // TODO use correct simvar once RNAV is implemented
        const deviation = 0;
        const dots = deviation / 100;
        {
            this.VDevSymbolLower.instance.style.visibility = 'hidden';
            this.VDevSymbolUpper.instance.style.visibility = 'hidden';
            this.VDevSymbol.instance.style.visibility = 'visible';
            this.VDevSymbol.instance.style.transform = `translate3d(0px, ${dots * 30.238 / 2}px, 0px)`;
        }
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "VertDevSymbolsGroup", style: "display: none" },
            FSComponent.buildComponent("text", { class: "FontSmall AlignRight Green", x: "95.022", y: "43.126" }, "V/DEV"),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m108.7 65.704h2.0147" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m108.7 50.585h2.0147" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m108.7 111.06h2.0147" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m108.7 95.942h2.0147" }),
            FSComponent.buildComponent("path", { id: "VDevSymbolLower", ref: this.VDevSymbolLower, class: "NormalStroke Green", d: "m107.19 111.06v2.0159h5.0368v-2.0159" }),
            FSComponent.buildComponent("path", { id: "VDevSymbolUpper", ref: this.VDevSymbolUpper, class: "NormalStroke Green", d: "m107.19 50.585v-2.0159h5.0368v2.0159" }),
            FSComponent.buildComponent("path", { id: "VDevSymbol", ref: this.VDevSymbol, class: "NormalStroke Green", d: "m112.22 78.807h-5.0368v4.0318h5.0368v-2.0159z" })));
    }
}
class LDevIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.LDevSymbolLeft = FSComponent.createRef();
        this.LDevSymbolRight = FSComponent.createRef();
        this.LDevSymbol = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('xtk').whenChanged().withPrecision(3).handle((xtk) => {
            const dots = xtk / 0.1;
            if (dots > 2) {
                this.LDevSymbolRight.instance.style.visibility = 'visible';
                this.LDevSymbolLeft.instance.style.visibility = 'hidden';
                this.LDevSymbol.instance.style.visibility = 'hidden';
            }
            else if (dots < -2) {
                this.LDevSymbolRight.instance.style.visibility = 'hidden';
                this.LDevSymbolLeft.instance.style.visibility = 'visible';
                this.LDevSymbol.instance.style.visibility = 'hidden';
            }
            else {
                this.LDevSymbolRight.instance.style.visibility = 'hidden';
                this.LDevSymbolLeft.instance.style.visibility = 'hidden';
                this.LDevSymbol.instance.style.visibility = 'visible';
                this.LDevSymbol.instance.style.transform = `translate3d(${dots * 30.238 / 2}px, 0px, 0px)`;
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "LatDeviationSymbolsGroup" },
            FSComponent.buildComponent("text", { class: "FontSmall AlignRight Green", x: "30.888", y: "122.639" }, "L/DEV"),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m38.686 129.51v2.0158" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m53.796 129.51v2.0158" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m84.017 129.51v2.0158" }),
            FSComponent.buildComponent("path", { class: "NormalStroke White", d: "m99.127 129.51v2.0158" }),
            FSComponent.buildComponent("path", { id: "LDevSymbolLeft", ref: this.LDevSymbolLeft, class: "NormalStroke Green", d: "m38.686 127.99h-2.0147v5.0397h2.0147" }),
            FSComponent.buildComponent("path", { id: "LDevSymbolRight", ref: this.LDevSymbolRight, class: "NormalStroke Green", d: "m99.127 127.99h2.0147v5.0397h-2.0147" }),
            FSComponent.buildComponent("path", { id: "LDevSymbol", ref: this.LDevSymbol, class: "NormalStroke Green", d: "m66.892 127.99v5.0397h4.0294v-5.0397h-2.0147z" }),
            FSComponent.buildComponent("path", { id: "LDevNeutralLine", class: "Yellow Fill", d: "m68.098 134.5v-8.0635h1.5119v8.0635z" })));
    }
}
class MarkerBeaconIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.classNames = Subject.create('HiddenElement');
        this.markerText = Subject.create('');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        const baseClass = 'FontLarge StartAlign';
        sub.on('markerBeacon').whenChanged().handle((markerState) => {
            if (markerState === 0) {
                this.classNames.set(`${baseClass} HiddenElement`);
            }
            else if (markerState === 1) {
                this.classNames.set(`${baseClass} Cyan OuterMarkerBlink`);
                this.markerText.set('OM');
            }
            else if (markerState === 2) {
                this.classNames.set(`${baseClass} Amber MiddleMarkerBlink`);
                this.markerText.set('MM');
            }
            else {
                this.classNames.set(`${baseClass} White InnerMarkerBlink`);
                this.markerText.set('IM');
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { id: "ILSMarkerText", class: this.classNames, x: "98.339211", y: "125.12898" }, this.markerText));
    }
}

class LinearDeviationIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lastIsActive = false;
        this.component = FSComponent.createRef();
        this.upperLinearDeviationReadout = FSComponent.createRef();
        this.lowerLinearDeviationReadout = FSComponent.createRef();
        this.linearDeviationDot = FSComponent.createRef();
        this.linearDeviationDotUpperHalf = FSComponent.createRef();
        this.linearDeviationDotLowerHalf = FSComponent.createRef();
        this.latchSymbol = FSComponent.createRef();
        this.altitude = Subject.create(new Arinc429Word(0));
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('altitude').handle((alt) => {
            const altitude = new Arinc429Word(alt);
            this.altitude.set(altitude);
        });
        sub.on('linearDeviationActive').whenChanged().handle((isActive) => {
            this.lastIsActive = isActive;
            hideOrShow(this.component)(isActive);
            hideOrShow(this.upperLinearDeviationReadout)(isActive);
            hideOrShow(this.lowerLinearDeviationReadout)(isActive);
        });
        sub.on('verticalProfileLatched').whenChanged().handle(hideOrShow(this.latchSymbol));
        sub.on('targetAltitude').atFrequency(5).handle((targetAltitude) => {
            const altitude = this.altitude.get();
            if (!altitude.isNormalOperation()) {
                return;
            }
            const deviation = altitude.value - targetAltitude;
            // Only update this if it's actually active
            if (!this.lastIsActive) {
                return;
            }
            const pixelOffset = this.pixelOffsetFromDeviation(Math.max(Math.min(deviation, 500), -500));
            this.component.instance.style.transform = `translate3d(0px, ${pixelOffset}px, 0px)`;
            const linearDeviationReadoutText = Math.min(99, Math.round(Math.abs(deviation) / 100)).toFixed(0).padStart(2, '0');
            this.upperLinearDeviationReadout.instance.textContent = linearDeviationReadoutText;
            this.lowerLinearDeviationReadout.instance.textContent = linearDeviationReadoutText;
            if (deviation > 540) {
                this.lowerLinearDeviationReadout.instance.style.visibility = 'visible';
                this.linearDeviationDotLowerHalf.instance.style.visibility = 'visible';
                this.upperLinearDeviationReadout.instance.style.visibility = 'hidden';
                this.linearDeviationDotUpperHalf.instance.style.visibility = 'hidden';
                this.linearDeviationDot.instance.style.visibility = 'hidden';
            }
            else if (deviation > -500 && deviation < 500) {
                this.lowerLinearDeviationReadout.instance.style.visibility = 'hidden';
                this.linearDeviationDotLowerHalf.instance.style.visibility = 'hidden';
                this.upperLinearDeviationReadout.instance.style.visibility = 'hidden';
                this.linearDeviationDotUpperHalf.instance.style.visibility = 'hidden';
                this.linearDeviationDot.instance.style.visibility = 'visible';
            }
            else if (deviation < -540) {
                this.lowerLinearDeviationReadout.instance.style.visibility = 'hidden';
                this.linearDeviationDotLowerHalf.instance.style.visibility = 'hidden';
                this.upperLinearDeviationReadout.instance.style.visibility = 'visible';
                this.linearDeviationDotUpperHalf.instance.style.visibility = 'visible';
                this.linearDeviationDot.instance.style.visibility = 'hidden';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "LinearDeviationIndicator" },
            FSComponent.buildComponent("text", { ref: this.upperLinearDeviationReadout, x: "110", y: "42.5", class: "FontSmallest Green" }),
            FSComponent.buildComponent("g", { ref: this.component, id: "LinearDeviationDot" },
                FSComponent.buildComponent("path", { id: "EntireDot", ref: this.linearDeviationDot, d: "m119.26 80.796a1.511 1.5119 0 1 0-3.022 0 1.511 1.5119 0 1 0 3.022 0z", class: "Fill Green" }),
                FSComponent.buildComponent("path", { id: "DotUpperHalf", style: "visiblity: hidden;", ref: this.linearDeviationDotUpperHalf, d: "m116.24 80.796c4.9e-4 -0.83466 0.67686-1.511 1.511-1.511 0.83418 0 1.5105 0.67635 1.511 1.511h-1.511z", class: "Fill Green" }),
                FSComponent.buildComponent("path", { id: "DotLowerHalf", style: "visiblity: hidden;", ref: this.linearDeviationDotLowerHalf, d: "m116.24 80.796c4.9e-4 0.83465 0.67686 1.511 1.511 1.511 0.83418 0 1.5105-0.67636 1.511-1.511h-1.511z", class: "Fill Green" }),
                FSComponent.buildComponent("path", { ref: this.latchSymbol, d: "m 119 78.3 h -3 v 5 h 3", class: "Magenta" })),
            FSComponent.buildComponent("text", { ref: this.lowerLinearDeviationReadout, x: "110", y: "123", class: "FontSmallest Green" })));
    }
    pixelOffsetFromDeviation(deviation) {
        return deviation * 40.5 / 500;
    }
}
function hideOrShow(component) {
    return (isActive) => {
        if (isActive) {
            component.instance.removeAttribute('style');
        }
        else {
            component.instance.setAttribute('style', 'display: none');
        }
    };
}

const ValueSpacing = 10;
const DistanceSpacing = 10;
const DisplayRange = 42;
class V1BugElement extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.offsetSub = Subject.create('translate3d(0px, 0px, 0px)');
        this.visibilitySub = Subject.create('hidden');
        this.flightPhase = 0;
        this.v1Speed = 0;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const pf = this.props.bus.getSubscriber();
        pf.on('v1').whenChanged().handle((g) => {
            this.v1Speed = g;
            this.getV1Offset();
            this.getV1Visibility();
        });
        pf.on('fwcFlightPhase').whenChanged().handle((g) => {
            this.flightPhase = g;
            this.getV1Visibility();
        });
    }
    getV1Offset() {
        const offset = -this.v1Speed * DistanceSpacing / ValueSpacing;
        this.offsetSub.set(`transform:translate3d(0px, ${offset}px, 0px)`);
    }
    getV1Visibility() {
        if (this.flightPhase <= 4 && this.v1Speed !== 0) {
            this.visibilitySub.set('visible');
        }
        else {
            this.visibilitySub.set('hidden');
        }
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "V1BugGroup", style: this.offsetSub, visibility: this.visibilitySub },
            FSComponent.buildComponent("path", { class: "NormalStroke Cyan", d: "m16.613 80.82h5.4899" }),
            FSComponent.buildComponent("text", { class: "FontLarge MiddleAlign Cyan", x: "26.205544", y: "82.96" }, "1")));
    }
}
class VRBugElement extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.offsetSub = Subject.create('');
        this.visibilitySub = Subject.create('hidden');
        this.flightPhase = 0;
        this.vrSpeed = 0;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const pf = this.props.bus.getSubscriber();
        pf.on('vr').whenChanged().handle((g) => {
            this.vrSpeed = g;
            this.getVrOffset();
            this.getVrVisibility();
        });
        pf.on('fwcFlightPhase').whenChanged().handle((g) => {
            this.flightPhase = g;
            this.getVrVisibility();
        });
    }
    getVrOffset() {
        const offset = -this.vrSpeed * DistanceSpacing / ValueSpacing;
        this.offsetSub.set(`translate(0 ${offset})`);
    }
    getVrVisibility() {
        if (this.flightPhase <= 4 && this.vrSpeed !== 0) {
            this.visibilitySub.set('visible');
        }
        else {
            this.visibilitySub.set('hidden');
        }
    }
    render() {
        return (FSComponent.buildComponent("path", { visibility: this.visibilitySub, transform: this.offsetSub, id: "RotateSpeedMarker", class: "NormalStroke Cyan", d: "m21.549 80.82a1.2592 1.2599 0 1 0-2.5184 0 1.2592 1.2599 0 1 0 2.5184 0z" }));
    }
}
class AirspeedIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.speedSub = Subject.create(0);
        this.speedTapeOutlineRef = FSComponent.createRef();
        this.speedTapeElements = FSComponent.createRef();
        this.failedGroup = FSComponent.createRef();
        this.showBarsRef = FSComponent.createRef();
        this.vfeNext = FSComponent.createRef();
        this.altitude = new Arinc429Word(0);
        this.flapHandleIndex = 0;
        this.barTimeout = 0;
        this.onGround = Subject.create(true);
        this.airSpeed = new Arinc429Word(0);
    }
    setOutline() {
        let airspeedValue;
        if (this.airSpeed.isFailureWarning() || (this.airSpeed.isNoComputedData() && !this.onGround.get())) {
            airspeedValue = NaN;
        }
        else if (this.airSpeed.isNoComputedData()) {
            airspeedValue = 30;
        }
        else {
            airspeedValue = this.airSpeed.value;
        }
        this.speedSub.set(airspeedValue);
        if (Number.isNaN(airspeedValue)) {
            this.speedTapeElements.instance.classList.add('HiddenElement');
            this.failedGroup.instance.classList.remove('HiddenElement');
        }
        else {
            this.speedTapeElements.instance.classList.remove('HiddenElement');
            this.failedGroup.instance.classList.add('HiddenElement');
        }
        const length = 42.9 + Math.max(Math.max(Math.min(Number.isNaN(airspeedValue) ? 100 : airspeedValue, 72.1), 30) - 30, 0);
        this.speedTapeOutlineRef.instance.setAttribute('d', `m19.031 38.086v${length}`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const pf = this.props.bus.getSubscriber();
        pf.on('vfeNext').whenChanged().handle((vfe) => {
            if (this.altitude.value < 15000 && this.flapHandleIndex < 4) {
                const offset = -vfe * DistanceSpacing / ValueSpacing;
                this.vfeNext.instance.classList.remove('HiddenElement');
                this.vfeNext.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
            }
            else {
                this.vfeNext.instance.classList.add('HiddenElement');
            }
        });
        pf.on('altitudeAr').withArinc429Precision(2).handle((a) => {
            this.altitude = a;
            if (this.altitude.isNormalOperation() && this.altitude.value < 15000 && this.flapHandleIndex < 4) {
                this.vfeNext.instance.classList.remove('HiddenElement');
            }
            else {
                this.vfeNext.instance.classList.add('HiddenElement');
            }
        });
        pf.on('flapHandleIndex').whenChanged().handle((a) => {
            this.flapHandleIndex = a;
            if (this.altitude.isNormalOperation() && this.altitude.value < 15000 && this.flapHandleIndex < 4) {
                this.vfeNext.instance.classList.remove('HiddenElement');
            }
            else {
                this.vfeNext.instance.classList.add('HiddenElement');
            }
        });
        pf.on('speedAr').handle((airSpeed) => {
            this.airSpeed = airSpeed;
            this.setOutline();
        });
        pf.on('leftMainGearCompressed').whenChanged().handle((g) => {
            this.leftMainGearCompressed = g;
            this.onGround.set(this.rightMainGearCompressed || g);
            this.setOutline();
        });
        pf.on('rightMainGearCompressed').whenChanged().handle((g) => {
            this.rightMainGearCompressed = g;
            this.onGround.set(this.leftMainGearCompressed || g);
            this.setOutline();
        });
        // showBars replacement
        this.onGround.sub((g) => {
            if (g) {
                this.showBarsRef.instance.style.display = 'none';
                clearTimeout(this.barTimeout);
            }
            else {
                this.barTimeout = setTimeout(() => {
                    this.showBarsRef.instance.style.display = 'block';
                }, 10000);
            }
            this.setOutline();
        });
    }
    render() {
        const length = 42.9 + Math.max(Math.max(Math.min(100, 72.1), 30) - 30, 0);
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "FailedGroup", ref: this.failedGroup, class: "HiddenElement" },
                FSComponent.buildComponent("path", { id: "SpeedTapeBackground", class: "TapeBackground", d: "m1.9058 123.56v-85.473h17.125v85.473z" }),
                FSComponent.buildComponent("text", { id: "SpeedFailText", class: "Blink9Seconds FontLargest EndAlign Red", x: "17.756115", y: "83.386398" }, "SPD"),
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineRight", ref: this.speedTapeOutlineRef, class: "NormalStroke Red", d: `m19.031 38.086v${length}` })),
            FSComponent.buildComponent("g", { id: "SpeedTapeElementsGroup", ref: this.speedTapeElements },
                FSComponent.buildComponent("path", { id: "SpeedTapeBackground", class: "TapeBackground", d: "m1.9058 123.56v-85.473h17.125v85.473z" }),
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineRight", ref: this.speedTapeOutlineRef, class: "NormalStroke White", d: `m19.031 38.086v${length}` }),
                FSComponent.buildComponent(VerticalTape, { tapeValue: this.speedSub, lowerLimit: 30, upperLimit: 660, valueSpacing: ValueSpacing, displayRange: DisplayRange + 6, distanceSpacing: DistanceSpacing, type: "speed" },
                    FSComponent.buildComponent(V1BugElement, { bus: this.props.bus }),
                    FSComponent.buildComponent(VRBugElement, { bus: this.props.bus }),
                    FSComponent.buildComponent(FlapsSpeedPointBugs, { bus: this.props.bus }),
                    FSComponent.buildComponent("path", { id: "VFeNextMarker", ref: this.vfeNext, class: "NormalStroke Amber", d: "m19.031 81.34h-2.8709m0-1.0079h2.8709" }),
                    FSComponent.buildComponent(VProtBug, { bus: this.props.bus })),
                FSComponent.buildComponent(VMaxBar, { bus: this.props.bus }),
                FSComponent.buildComponent(VAlphaProtBar, { bus: this.props.bus }),
                FSComponent.buildComponent(VStallWarnBar, { bus: this.props.bus }),
                FSComponent.buildComponent("g", { ref: this.showBarsRef },
                    FSComponent.buildComponent(VLsBar, { bus: this.props.bus })),
                FSComponent.buildComponent(VAlphaLimBar, { bus: this.props.bus }),
                FSComponent.buildComponent(SpeedTrendArrow, { airspeed: this.speedSub, instrument: this.props.instrument, bus: this.props.bus }),
                FSComponent.buildComponent(V1Offtape, { bus: this.props.bus }))));
    }
}
class FlapsSpeedPointBugs extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.greenDotBug = FSComponent.createRef();
        this.flapsBug = FSComponent.createRef();
        this.slatBug = FSComponent.createRef();
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "GreenDotSpeedMarker", ref: this.greenDotBug, style: "transform:translate3d(0px, 0px,0px)" },
                FSComponent.buildComponent("path", { class: "ThickOutline", d: "m20.29 80.85a1.2592 1.2599 0 1 0-2.5184 0 1.2592 1.2599 0 1 0 2.5184 0z" }),
                FSComponent.buildComponent("path", { class: "ThickStroke Green", d: "m20.29 80.85a1.2592 1.2599 0 1 0-2.5184 0 1.2592 1.2599 0 1 0 2.5184 0z" })),
            FSComponent.buildComponent("g", { id: "FlapsSlatsBug", ref: this.flapsBug, style: "transform: translate3d(0px, 0px,0px)" },
                FSComponent.buildComponent("path", { class: "NormalStroke Green", d: "m19.031 80.82h3.8279" }),
                FSComponent.buildComponent("text", { class: "FontLarge MiddleAlign Green", x: "27.536509", y: "83.327988" }, "F")),
            FSComponent.buildComponent("g", { id: "FlapsSlatsBug", ref: this.slatBug, style: "transform: translate3d(0px, 0px,0px)" },
                FSComponent.buildComponent("path", { class: "NormalStroke Green", d: "m19.031 80.82h3.8279" }),
                FSComponent.buildComponent("text", { class: "FontLarge MiddleAlign Green", x: "27.536509", y: "83.327988" }, "S"))));
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('flapHandleIndex').whenChanged().handle((f) => {
            if (f === 0) {
                this.greenDotBug.instance.style.visibility = 'visible';
                this.flapsBug.instance.style.visibility = 'hidden';
                this.slatBug.instance.style.visibility = 'hidden';
            }
            else if (f === 1) {
                this.greenDotBug.instance.style.visibility = 'hidden';
                this.flapsBug.instance.style.visibility = 'hidden';
                this.slatBug.instance.style.visibility = 'visible';
            }
            else if (f === 2 || f === 3) {
                this.greenDotBug.instance.style.visibility = 'hidden';
                this.flapsBug.instance.style.visibility = 'visible';
                this.slatBug.instance.style.visibility = 'hidden';
            }
            else {
                this.greenDotBug.instance.style.visibility = 'hidden';
                this.flapsBug.instance.style.visibility = 'hidden';
                this.slatBug.instance.style.visibility = 'hidden';
            }
        });
        sub.on('greenDotSpeed').whenChanged()
            .handle((gd) => {
            this.greenDotBug.instance.style.transform = `translate3d(0px,${getSpeedTapeOffset(gd)}px, 0px`;
        });
        sub.on('slatSpeed').whenChanged()
            .handle((sls) => {
            this.slatBug.instance.style.transform = `translate3d(0px,${getSpeedTapeOffset(sls)}px, 0px`;
        });
        sub.on('fSpeed').whenChanged()
            .handle((fs) => {
            this.flapsBug.instance.style.transform = `translate3d(0px,${getSpeedTapeOffset(fs)}px, 0px`;
        });
    }
}
const getSpeedTapeOffset = (speed) => -speed * DistanceSpacing / ValueSpacing;
class AirspeedIndicatorOfftape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.lowerRef = FSComponent.createRef();
        this.offTapeRef = FSComponent.createRef();
        this.offTapeFailedRef = FSComponent.createRef();
        this.decelRef = FSComponent.createRef();
        this.spdLimFlagRef = FSComponent.createRef();
        this.onGround = true;
        this.leftMainGearCompressed = true;
        this.rightMainGearCompressed = true;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('leftMainGearCompressed').whenChanged().handle((g) => {
            this.leftMainGearCompressed = g;
            this.onGround = this.rightMainGearCompressed || g;
        });
        sub.on('rightMainGearCompressed').whenChanged().handle((g) => {
            this.rightMainGearCompressed = g;
            this.onGround = this.leftMainGearCompressed || g;
        });
        sub.on('speedAr').handle((speed) => {
            let airspeedValue;
            if (speed.isFailureWarning() || (speed.isNoComputedData() && !this.onGround)) {
                airspeedValue = NaN;
            }
            else if (speed.isNoComputedData()) {
                airspeedValue = 30;
            }
            else {
                airspeedValue = speed.value;
            }
            if (Number.isNaN(airspeedValue)) {
                this.offTapeRef.instance.classList.add('HiddenElement');
                this.offTapeFailedRef.instance.classList.remove('HiddenElement');
            }
            else {
                this.offTapeRef.instance.classList.remove('HiddenElement');
                this.offTapeFailedRef.instance.classList.add('HiddenElement');
                const clampedSpeed = Math.max(Math.min(airspeedValue, 660), 30);
                const showLower = clampedSpeed > 72;
                if (showLower) {
                    this.lowerRef.instance.setAttribute('visibility', 'visible');
                }
                else {
                    this.lowerRef.instance.setAttribute('visibility', 'hidden');
                }
            }
        });
        sub.on('autoBrakeDecel').whenChanged().handle((a) => {
            if (a) {
                this.decelRef.instance.style.visibility = 'visible';
            }
            else {
                this.decelRef.instance.style.visibility = 'hidden';
            }
        });
        sub.on('facToUse').whenChanged().handle((a) => {
            if (a === 0) {
                this.spdLimFlagRef.instance.style.visibility = 'visible';
            }
            else {
                this.spdLimFlagRef.instance.style.visibility = 'hidden';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "OfftapeFailedGroup", ref: this.offTapeFailedRef },
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineUpper", class: "NormalStroke Red", d: "m1.9058 38.086h21.859" }),
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineLower", class: "NormalStroke Red", d: "m1.9058 123.56h21.859" })),
            FSComponent.buildComponent("g", { id: "SpeedOfftapeGroup", ref: this.offTapeRef },
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineUpper", class: "NormalStroke White", d: "m1.9058 38.086h21.859" }),
                FSComponent.buildComponent(SpeedTarget, { bus: this.props.bus }),
                FSComponent.buildComponent("text", { id: "AutoBrkDecel", ref: this.decelRef, class: "FontMedium EndAlign Green", x: "20.53927", y: "129.06996" }, "DECEL"),
                FSComponent.buildComponent("path", { class: "Fill Yellow SmallOutline", d: "m13.994 80.46v0.7257h6.5478l3.1228 1.1491v-3.0238l-3.1228 1.1491z" }),
                FSComponent.buildComponent("path", { class: "Fill Yellow SmallOutline", d: "m0.092604 81.185v-0.7257h2.0147v0.7257z" }),
                FSComponent.buildComponent("path", { id: "SpeedTapeOutlineLower", ref: this.lowerRef, class: "NormalStroke White", d: "m1.9058 123.56h21.859" }),
                FSComponent.buildComponent("g", { ref: this.spdLimFlagRef },
                    FSComponent.buildComponent("text", { id: "SpdLimFailTextUpper", x: "32.077583", y: "116.57941", class: "FontMedium EndAlign Red Blink9Seconds" }, "SPD"),
                    FSComponent.buildComponent("text", { id: "SpdLimFailTextLower", x: "32.107349", y: "122.14585", class: "FontMedium EndAlign Red Blink9Seconds" }, "LIM")))));
    }
}
class SpeedTrendArrow extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.refElement = FSComponent.createRef();
        this.arrowBaseRef = FSComponent.createRef();
        this.arrowHeadRef = FSComponent.createRef();
        this.offset = Subject.create('');
        this.pathString = Subject.create('');
        this.lagFilter = new LagFilter(1.6);
        this.airspeedAccRateLimiter = new RateLimiter(1.2, -1.2);
        this.previousAirspeed = 0;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('realTime').handle((_t) => {
            const deltaTime = this.props.instrument.deltaTime;
            const clamped = Math.max(this.props.airspeed.get(), 30);
            const airspeedAcc = (clamped - this.previousAirspeed) / deltaTime * 1000;
            this.previousAirspeed = clamped;
            let filteredAirspeedAcc = this.lagFilter.step(airspeedAcc, deltaTime / 1000);
            filteredAirspeedAcc = this.airspeedAccRateLimiter.step(filteredAirspeedAcc, deltaTime / 1000);
            const targetSpeed = filteredAirspeedAcc * 10;
            if (Math.abs(targetSpeed) < 1) {
                this.refElement.instance.style.visibility = 'hidden';
            }
            else {
                this.refElement.instance.style.visibility = 'visible';
                let pathString;
                const sign = Math.sign(filteredAirspeedAcc);
                const offset = -targetSpeed * DistanceSpacing / ValueSpacing;
                const neutralPos = 80.823;
                if (sign > 0) {
                    pathString = `m15.455 ${neutralPos + offset} l -1.2531 2.4607 M15.455 ${neutralPos + offset} l 1.2531 2.4607`;
                }
                else {
                    pathString = `m15.455 ${neutralPos + offset} l 1.2531 -2.4607 M15.455 ${neutralPos + offset} l -1.2531 -2.4607`;
                }
                this.offset.set(`m15.455 80.823v${offset.toFixed(10)}`);
                this.pathString.set(pathString);
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "SpeedTrendArrow", ref: this.refElement },
            FSComponent.buildComponent("path", { id: "SpeedTrendArrowBase", ref: this.arrowBaseRef, class: "NormalStroke Yellow", d: this.offset }),
            FSComponent.buildComponent("path", { id: "SpeedTrendArrowHead", ref: this.arrowHeadRef, class: "NormalStroke Yellow", d: this.pathString })));
    }
}
class VLsBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.previousTime = new Date().appTime();
        this.vlsPath = Subject.create('');
        this.vAlphaProt = new Arinc429Word(0);
        this.vStallWarn = new Arinc429Word(0);
        this.airSpeed = new Arinc429Word(0);
        this.vls = 0;
        this.fcdc1DiscreteWord1 = new Arinc429Word(0);
        this.fcdc2DiscreteWord1 = new Arinc429Word(0);
        this.smoothSpeeds = (vlsDestination) => {
            const currentTime = new Date().appTime();
            const deltaTime = currentTime - this.previousTime;
            const seconds = deltaTime / 1000;
            const vls = SmoothSin(this.vls, vlsDestination, 0.5, seconds);
            this.previousTime = currentTime;
            return vls;
        };
    }
    setVlsPath() {
        const normalLawActive = this.fcdc1DiscreteWord1.getBitValueOr(11, false) || this.fcdc2DiscreteWord1.getBitValueOr(11, false);
        const VLsPos = (this.airSpeed.value - this.vls) * DistanceSpacing / ValueSpacing + 80.818;
        const offset = (this.vls - (normalLawActive ? this.vAlphaProt.valueOr(0) : this.vStallWarn.valueOr(0))) * DistanceSpacing / ValueSpacing;
        this.vlsPath.set(`m19.031 ${VLsPos}h 1.9748v${offset}`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('vAlphaProt').withArinc429Precision(2).handle((a) => {
            this.vAlphaProt = a;
            this.setVlsPath();
        });
        sub.on('vStallWarn').withArinc429Precision(2).handle((a) => {
            this.vStallWarn = a;
            this.setVlsPath();
        });
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.airSpeed = s;
            this.setVlsPath();
        });
        sub.on('vls').handle((vls) => {
            this.vls = this.smoothSpeeds(vls);
            this.setVlsPath();
        });
        sub.on('fcdc1DiscreteWord1').handle((word) => {
            this.fcdc1DiscreteWord1 = word;
            this.setVlsPath();
        });
        sub.on('fcdc2DiscreteWord1').handle((word) => {
            this.fcdc2DiscreteWord1 = word;
            this.setVlsPath();
        });
    }
    render() {
        return FSComponent.buildComponent("path", { id: "VLsIndicator", class: "NormalStroke Amber", d: this.vlsPath });
    }
}
class VAlphaLimBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.VAlimIndicator = FSComponent.createRef();
        this.airSpeed = new Arinc429Word(0);
        this.vAlphaLim = new Arinc429Word(0);
        this.fcdc1DiscreteWord1 = new Arinc429Word(0);
        this.fcdc2DiscreteWord1 = new Arinc429Word(0);
    }
    setAlphaLimBarPath() {
        const normalLawActive = this.fcdc1DiscreteWord1.getBitValueOr(11, false) || this.fcdc2DiscreteWord1.getBitValueOr(11, false);
        if (this.vAlphaLim.value - this.airSpeed.value < -DisplayRange || this.vAlphaLim.isFailureWarning() || this.vAlphaLim.isNoComputedData() || !normalLawActive) {
            this.VAlimIndicator.instance.style.visibility = 'hidden';
        }
        else {
            this.VAlimIndicator.instance.style.visibility = 'visible';
            const delta = this.airSpeed.value - DisplayRange - this.vAlphaLim.value;
            const offset = delta * DistanceSpacing / ValueSpacing;
            this.VAlimIndicator.instance.setAttribute('d', `m19.031 123.56h3.425v${offset}h-3.425z`);
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.airSpeed = s;
            this.setAlphaLimBarPath();
        });
        sub.on('vAlphaMax').handle((al) => {
            this.vAlphaLim = al;
            this.setAlphaLimBarPath();
        });
        sub.on('fcdc1DiscreteWord1').handle((word) => {
            this.fcdc1DiscreteWord1 = word;
            this.setAlphaLimBarPath();
        });
        sub.on('fcdc2DiscreteWord1').handle((word) => {
            this.fcdc2DiscreteWord1 = word;
            this.setAlphaLimBarPath();
        });
    }
    render() {
        return FSComponent.buildComponent("path", { ref: this.VAlimIndicator, id: "VAlimIndicator", class: "Fill Red" });
    }
}
class VAlphaProtBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.VAprotIndicator = FSComponent.createRef();
        this.airSpeed = new Arinc429Word(0);
        this.vAlphaProt = new Arinc429Word(0);
        this.fcdc1DiscreteWord1 = new Arinc429Word(0);
        this.fcdc2DiscreteWord1 = new Arinc429Word(0);
    }
    setAlphaProtBarPath() {
        const normalLawActive = this.fcdc1DiscreteWord1.getBitValueOr(11, false) || this.fcdc2DiscreteWord1.getBitValueOr(11, false);
        if (this.airSpeed.value - this.vAlphaProt.value > DisplayRange || this.vAlphaProt.isFailureWarning() || this.vAlphaProt.isNoComputedData() || !normalLawActive) {
            this.VAprotIndicator.instance.style.visibility = 'hidden';
        }
        else {
            this.VAprotIndicator.instance.style.visibility = 'visible';
            const delta = Math.max(this.airSpeed.value - this.vAlphaProt.value, -DisplayRange);
            const offset = delta * DistanceSpacing / ValueSpacing;
            this.VAprotIndicator.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.airSpeed = s;
            this.setAlphaProtBarPath();
        });
        sub.on('vAlphaProt').withArinc429Precision(2).handle((word) => {
            this.vAlphaProt = word;
            this.setAlphaProtBarPath();
        });
        sub.on('fcdc1DiscreteWord1').handle((word) => {
            this.fcdc1DiscreteWord1 = word;
            this.setAlphaProtBarPath();
        });
        sub.on('fcdc2DiscreteWord1').handle((word) => {
            this.fcdc2DiscreteWord1 = word;
            this.setAlphaProtBarPath();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { id: "VAlphaProtBarberpole", ref: this.VAprotIndicator, class: "BarAmber", 
            // eslint-disable-next-line max-len
            d: "m19.031 169.9v-1.4111h2.9213v1.4111zm2.9213-2.923v1.5119m0-4.4349v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-10.18h2.9213v1.4111h-2.9213zm2.9213 4.3341v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.846v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-5.846v-1.4111h2.9213v1.4111zm2.9213 0v1.5119m0-4.4349v1.5119m0-4.4349v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-10.18h2.9213v1.4111h-2.9213zm2.9213 4.3341v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.846v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-5.846v-1.4111h2.9213v1.4111zm2.9213 0v1.5119m0-4.4349v1.5119m0-4.4349v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-10.18h2.9213v1.4111h-2.9213zm2.9213 4.3341v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.846v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-5.846v-1.4111h2.9213v1.4111zm2.9213 0v1.5119m0-4.4349v1.5119m0-4.4349v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.8461v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-10.18h2.9213v1.4111h-2.9213zm2.9213 4.3341v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm2.9213-5.846v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm0-5.846v-1.4111h2.9213v1.4111zm2.9213 0v1.5119m0-4.4349v1.5119m0-4.4349v1.5119m-2.9213 1.4111v-1.4111h2.9213v1.4111zm1.9748-4.3341h0.94654v1.4111h-2.9213v-1.4111z" }));
    }
}
class VMaxBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.VMaxIndicator = FSComponent.createRef();
        this.airSpeed = new Arinc429Word(0);
        this.vMax = 0;
    }
    setVMaxBarPath() {
        if (this.airSpeed.value - this.vMax < -DisplayRange) {
            this.VMaxIndicator.instance.style.visibility = 'hidden';
        }
        else {
            this.VMaxIndicator.instance.style.visibility = 'visible';
            const delta = Math.min(this.airSpeed.value - this.vMax, DisplayRange);
            const offset = delta * DistanceSpacing / ValueSpacing;
            this.VMaxIndicator.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.airSpeed = s;
            this.setVMaxBarPath();
        });
        sub.on('vMax').withPrecision(2).handle((v) => {
            this.vMax = v;
            this.setVMaxBarPath();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { id: "OverspeedBarberpole", ref: this.VMaxIndicator, class: "BarRed", 
            // eslint-disable-next-line max-len
            d: "m22.053-2.2648v-2.6206m-3.022-2.419v2.419h3.022v-2.419zm3.022 10.079v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.4191h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.4191h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.4191h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m-3.022 5.0397h3.022v-2.4191h-3.022zm3.022-17.538h-3.022v2.4191h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419z" }));
    }
}
class VStallWarnBar extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.VStallWarnIndicator = FSComponent.createRef();
        this.airSpeed = new Arinc429Word(0);
        this.vStallWarn = new Arinc429Word(0);
        this.fcdc1DiscreteWord1 = new Arinc429Word(0);
        this.fcdc2DiscreteWord1 = new Arinc429Word(0);
    }
    setVStallWarnBarPath() {
        const normalLawActive = this.fcdc1DiscreteWord1.getBitValueOr(11, false) || this.fcdc2DiscreteWord1.getBitValueOr(11, false);
        if (this.airSpeed.value - this.vStallWarn.value > DisplayRange || this.vStallWarn.isFailureWarning() || this.vStallWarn.isNoComputedData() || normalLawActive) {
            this.VStallWarnIndicator.instance.style.visibility = 'hidden';
        }
        else {
            this.VStallWarnIndicator.instance.style.visibility = 'visible';
            const delta = Math.max(this.airSpeed.value - this.vStallWarn.value, -DisplayRange);
            const offset = delta * DistanceSpacing / ValueSpacing;
            this.VStallWarnIndicator.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.airSpeed = s;
            this.setVStallWarnBarPath();
        });
        sub.on('vStallWarn').withArinc429Precision(2).handle((v) => {
            this.vStallWarn = v;
            this.setVStallWarnBarPath();
        });
        sub.on('fcdc1DiscreteWord1').handle((word) => {
            this.fcdc1DiscreteWord1 = word;
            this.setVStallWarnBarPath();
        });
        sub.on('fcdc2DiscreteWord1').handle((word) => {
            this.fcdc2DiscreteWord1 = word;
            this.setVStallWarnBarPath();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { id: "StallWarnBarberpole", ref: this.VStallWarnIndicator, class: "BarRed", 
            // eslint-disable-next-line max-len
            d: "m22.053 85.835v-2.6206m-3.022-2.419v2.419h3.022v-2.419zm3.022 10.079v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.4191h3.022zm0 12.498v-2.419h-3.022v2.419zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.419h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0-12.498h-3.022v2.4191h3.022zm0 12.498v-2.4191h-3.022v2.4191zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419zm3.022 25.198v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m0 7.6603v-2.6206m-3.022 5.0397h3.022v-2.4191h-3.022zm3.022-17.538h-3.022v2.419h3.022zm0 12.498v-2.419h-3.022v2.419zm0-7.4588v2.4191h-3.022v-2.4191zm-3.022-10.079v2.419h3.022v-2.419z" }));
    }
}
class V1Offtape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.v1TextRef = FSComponent.createRef();
        this.v1Speed = 0;
    }
    onAfterRender() {
        const sub = this.props.bus.getSubscriber();
        sub.on('speed').handle((s) => {
            const speed = new Arinc429Word(s);
            if (this.v1Speed - speed.value > DisplayRange) {
                this.v1TextRef.instance.style.visibility = 'visible';
            }
            else {
                this.v1TextRef.instance.style.visibility = 'hidden';
            }
        });
        sub.on('v1').whenChanged().handle((v1) => {
            this.v1Speed = v1;
            this.v1TextRef.instance.textContent = Math.round(v1).toString();
        });
        sub.on('fwcFlightPhase').whenChanged().handle((p) => {
            if (p <= 4) {
                this.v1TextRef.instance.style.visibility = 'visible';
            }
            else {
                this.v1TextRef.instance.style.visibility = 'hidden';
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { ref: this.v1TextRef, id: "V1SpeedText", class: "FontTiny Cyan", x: "21.271021", y: "43.23" }, "0"));
    }
}
class SpeedTarget extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.upperBoundRef = FSComponent.createRef();
        this.lowerBoundRef = FSComponent.createRef();
        this.speedTargetRef = FSComponent.createRef();
        this.currentVisible = this.upperBoundRef;
        this.textSub = Subject.create('0');
        this.decelActive = false;
        this.needsUpdate = true;
        this.speedState = {
            speed: new Arinc429Word(0),
            targetSpeed: 100,
            managedTargetSpeed: 100,
            holdValue: 100,
            isSpeedManaged: false,
            isMach: false,
        };
    }
    handleManagedSpeed() {
        if (this.speedState.isSpeedManaged) {
            this.currentVisible.instance.classList.replace('Cyan', 'Magenta');
            const text = Math.round(this.speedState.managedTargetSpeed).toString().padStart(3, '0');
            this.textSub.set(text);
        }
        else {
            this.currentVisible.instance.classList.replace('Magenta', 'Cyan');
            const text = Math.round(this.speedState.managedTargetSpeed).toString().padStart(3, '0');
            this.textSub.set(text);
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.needsUpdate = true;
        const sub = this.props.bus.getSubscriber();
        sub.on('isSelectedSpeed').whenChanged().handle((s) => {
            this.speedState.isSpeedManaged = !s;
            this.needsUpdate = true;
        });
        sub.on('speedAr').withArinc429Precision(2).handle((s) => {
            this.speedState.speed = s;
            this.needsUpdate = true;
        });
        sub.on('holdValue').whenChanged().handle((s) => {
            this.speedState.holdValue = s;
            this.needsUpdate = true;
        });
        sub.on('machActive').whenChanged().handle((s) => {
            this.speedState.isMach = s;
            this.needsUpdate = true;
        });
        sub.on('targetSpeedManaged').whenChanged().handle((s) => {
            this.speedState.managedTargetSpeed = s;
            this.needsUpdate = true;
        });
        sub.on('autoBrakeDecel').whenChanged().handle((a) => {
            this.decelActive = a;
            this.needsUpdate = true;
        });
        sub.on('realTime').handle(this.onFrameUpdate.bind(this));
    }
    onFrameUpdate(_realTime) {
        if (this.needsUpdate === true) {
            this.needsUpdate = false;
            this.determineTargetSpeed();
            const inRange = this.handleLowerUpperBound();
            this.handleManagedSpeed();
            if (inRange) {
                const multiplier = 100;
                const currentValueAtPrecision = Math.round(this.speedState.speed.value * multiplier) / multiplier;
                const offset = (currentValueAtPrecision - (this.speedState.isSpeedManaged
                    ? this.speedState.managedTargetSpeed : this.speedState.targetSpeed)) * DistanceSpacing / ValueSpacing;
                this.speedTargetRef.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
            }
            else {
                const text = Math.round(this.speedState.isSpeedManaged ? this.speedState.managedTargetSpeed : this.speedState.targetSpeed).toString().padStart(3, '0');
                this.textSub.set(text);
            }
        }
    }
    determineTargetSpeed() {
        const isSelected = !this.speedState.isSpeedManaged;
        if (isSelected) {
            if (this.speedState.isMach) {
                const holdValue = this.speedState.holdValue;
                this.speedState.targetSpeed = SimVar.GetGameVarValue('FROM MACH TO KIAS', 'number', holdValue === null ? undefined : holdValue);
            }
            else {
                this.speedState.targetSpeed = this.speedState.holdValue;
            }
        }
    }
    handleLowerUpperBound() {
        let inRange = false;
        const currentTargetSpeed = this.speedState.isSpeedManaged ? this.speedState.managedTargetSpeed : this.speedState.targetSpeed;
        if (this.speedState.speed.value - currentTargetSpeed > DisplayRange) {
            this.upperBoundRef.instance.style.visibility = 'visible';
            this.lowerBoundRef.instance.style.visibility = 'hidden';
            this.speedTargetRef.instance.style.visibility = 'hidden';
            this.currentVisible = this.upperBoundRef;
        }
        else if (this.speedState.speed.value - currentTargetSpeed < -DisplayRange && !this.decelActive) {
            this.lowerBoundRef.instance.style.visibility = 'visible';
            this.upperBoundRef.instance.style.visibility = 'hidden';
            this.speedTargetRef.instance.style.visibility = 'hidden';
            this.currentVisible = this.lowerBoundRef;
        }
        else if (Math.abs(this.speedState.speed.value - currentTargetSpeed) < DisplayRange) {
            this.lowerBoundRef.instance.style.visibility = 'hidden';
            this.upperBoundRef.instance.style.visibility = 'hidden';
            this.speedTargetRef.instance.style.visibility = 'visible';
            this.currentVisible = this.speedTargetRef;
            inRange = true;
        }
        else {
            this.lowerBoundRef.instance.style.visibility = 'hidden';
            this.upperBoundRef.instance.style.visibility = 'hidden';
            this.speedTargetRef.instance.style.visibility = 'hidden';
        }
        return inRange;
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("text", { ref: this.upperBoundRef, id: "SelectedSpeedLowerText", class: "FontSmallest EndAlign Cyan", x: "24.078989", y: "128.27917" }, this.textSub),
            FSComponent.buildComponent("text", { ref: this.lowerBoundRef, id: "SelectedSpeedLowerText", class: "FontSmallest EndAlign Cyan", x: "24.113895", y: "36.670692" }, this.textSub),
            FSComponent.buildComponent("path", { ref: this.speedTargetRef, class: "NormalStroke CornerRound Cyan", style: "transform: translate3d(0px, 0px, 0px)", d: "m19.274 81.895 5.3577 1.9512v-6.0476l-5.3577 1.9512" }),
            FSComponent.buildComponent(SpeedMargins, { bus: this.props.bus })));
    }
}
class SpeedMargins extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.entireComponentRef = FSComponent.createRef();
        this.upperSpeedMarginRef = FSComponent.createRef();
        this.lowerSpeedMarginRef = FSComponent.createRef();
        this.currentSpeed = new Arinc429Word(0);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('showSpeedMargins').handle(this.hideOrShow(this.entireComponentRef));
        sub.on('speedAr').withArinc429Precision(2).handle((s) => this.currentSpeed = s);
        sub.on('upperSpeedMargin').handle(this.moveToSpeed(this.upperSpeedMarginRef));
        sub.on('lowerSpeedMargin').handle(this.moveToSpeed(this.lowerSpeedMarginRef));
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.entireComponentRef, id: "SpeedMargins", style: "display: none;" },
            FSComponent.buildComponent("path", { ref: this.upperSpeedMarginRef, id: "UpperSpeedMargin", class: "Fill Magenta", d: "m19.7 80.5 h 5.3577 v 0.7 h-5.3577 z" }),
            FSComponent.buildComponent("path", { ref: this.lowerSpeedMarginRef, id: "LowerSpeedMargin", class: "Fill Magenta", d: "m19.7 80.5 h 5.3577 v 0.7 h-5.3577 z" })));
    }
    moveToSpeed(component) {
        return (speed) => {
            const offset = (Math.round(100 * (this.currentSpeed.value - speed) * DistanceSpacing / ValueSpacing) / 100).toFixed(2);
            const isInRange = Math.abs(this.currentSpeed.value - speed) < DisplayRange;
            component.instance.style.visibility = isInRange ? 'visible' : 'hidden';
            if (isInRange) {
                component.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
            }
        };
    }
    hideOrShow(component) {
        return (isActive) => {
            if (isActive) {
                component.instance.removeAttribute('style');
            }
            else {
                component.instance.setAttribute('style', 'display: none');
            }
        };
    }
}
class MachNumber extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.machTextSub = Subject.create('');
        this.failedRef = FSComponent.createRef();
        this.showMach = false;
        this.onGround = false;
        this.leftMainGearCompressed = true;
        this.rightMainGearCompressed = true;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('machAr').handle((mach) => {
            if (!mach.isNormalOperation() && !this.onGround) {
                this.machTextSub.set('');
                this.failedRef.instance.style.display = 'inline';
                return;
            }
            this.failedRef.instance.style.display = 'none';
            const machPermille = Math.round(mach.valueOr(0) * 1000);
            if (this.showMach && machPermille < 450) {
                this.showMach = false;
                this.machTextSub.set('');
            }
            else if (!this.showMach && machPermille > 500) {
                this.showMach = true;
            }
            if (this.showMach) {
                this.machTextSub.set(`.${machPermille}`);
            }
        });
        sub.on('leftMainGearCompressed').whenChanged().handle((g) => {
            this.leftMainGearCompressed = g;
            this.onGround = this.rightMainGearCompressed || g;
        });
        sub.on('rightMainGearCompressed').whenChanged().handle((g) => {
            this.rightMainGearCompressed = g;
            this.onGround = this.leftMainGearCompressed || g;
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("text", { ref: this.failedRef, id: "MachFailText", class: "Blink9Seconds FontLargest StartAlign Red", x: "5.4257932", y: "136.88908" }, "MACH"),
            FSComponent.buildComponent("text", { id: "CurrentMachText", class: "FontLargest StartAlign Green", x: "5.566751", y: "137.03004" }, this.machTextSub)));
    }
}
class VProtBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.vProtBug = FSComponent.createRef();
        this.fcdcWord1 = new Arinc429Word(0);
        this.Vmax = 0;
    }
    handleVProtBugDisplay() {
        const showVProt = this.Vmax > 240;
        const offset = -(this.Vmax + 6) * DistanceSpacing / ValueSpacing;
        const isNormalLawActive = this.fcdcWord1.getBitValue(11) && !this.fcdcWord1.isFailureWarning();
        if (showVProt && isNormalLawActive) {
            this.vProtBug.instance.style.display = 'block';
            this.vProtBug.instance.style.transform = `translate3d(0px, ${offset}px, 0px)`;
        }
        else {
            this.vProtBug.instance.style.display = 'none';
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('vMax').whenChanged().handle((vm) => {
            this.Vmax = vm;
            this.handleVProtBugDisplay();
        });
        sub.on('fcdcDiscreteWord1').whenChanged().handle((word) => {
            this.fcdcWord1 = word;
            this.handleVProtBugDisplay();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { id: "SpeedProtSymbol", ref: this.vProtBug, style: "display: none" },
            FSComponent.buildComponent("path", { class: "NormalOutline", d: "m13.994 81.289h3.022m-3.022-1.0079h3.022" }),
            FSComponent.buildComponent("path", { class: "NormalStroke Green", d: "m13.994 81.289h3.022m-3.022-1.0079h3.022" })));
    }
}

class VerticalSpeedIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.yOffsetSub = Subject.create(0);
        this.needleColour = Subject.create('Green');
        this.radioAlt = new Arinc429Word(0);
        this.vsFailed = FSComponent.createRef();
        this.vsNormal = FSComponent.createRef();
        this.lagFilter = new LagFilter(2);
        this.needsUpdate = false;
        this.vspeedTcas = FSComponent.createRef();
        this.filteredRadioAltitude = 0;
        this.tcasState = {
            tcasState: 0,
            isTcasCorrective: false,
            tcasRedZoneL: 0,
            tcasRedZoneH: 0,
            tcasGreenZoneL: 0,
            tcasGreenZoneH: 0,
        };
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('tcasState').whenChanged().handle((s) => {
            this.tcasState.tcasState = s;
            this.needsUpdate = true;
        });
        sub.on('tcasCorrective').whenChanged().handle((s) => {
            this.tcasState.isTcasCorrective = s;
            this.needsUpdate = true;
        });
        sub.on('tcasRedZoneL').whenChanged().handle((s) => {
            this.tcasState.tcasRedZoneL = s;
            this.needsUpdate = true;
        });
        sub.on('tcasRedZoneH').whenChanged().handle((s) => {
            this.tcasState.tcasRedZoneH = s;
            this.needsUpdate = true;
        });
        sub.on('tcasGreenZoneL').whenChanged().handle((s) => {
            this.tcasState.tcasGreenZoneL = s;
            this.needsUpdate = true;
        });
        sub.on('tcasGreenZoneH').whenChanged().handle((s) => {
            this.tcasState.tcasGreenZoneH = s;
            this.needsUpdate = true;
        });
        sub.on('realTime').handle((_r) => {
            if (this.needsUpdate) {
                if (this.tcasState.tcasState === 2) {
                    this.needleColour.set('White');
                }
                this.vspeedTcas.instance.update(this.tcasState);
            }
        });
        sub.on('vs').withArinc429Precision(2).handle((vs) => {
            const filteredVS = this.lagFilter.step(vs.value, this.props.instrument.deltaTime / 1000);
            const absVSpeed = Math.abs(filteredVS);
            if (!vs.isNormalOperation()) {
                this.vsFailed.instance.style.visibility = 'visible';
                this.vsNormal.instance.style.visibility = 'hidden';
            }
            else {
                this.vsFailed.instance.style.visibility = 'hidden';
                this.vsNormal.instance.style.visibility = 'visible';
            }
            const radioAltitudeValid = !this.radioAlt.isNoComputedData() && !this.radioAlt.isFailureWarning();
            if (this.tcasState.tcasState !== 2) {
                if (absVSpeed >= 6000
                    || (vs.value <= -2000 && radioAltitudeValid && this.filteredRadioAltitude <= 2500 && this.filteredRadioAltitude >= 1000)
                    || (vs.value <= -1200 && radioAltitudeValid && this.filteredRadioAltitude <= 1000)) {
                    this.needleColour.set('Amber');
                }
                else {
                    this.needleColour.set('Green');
                }
            }
            const sign = Math.sign(filteredVS);
            if (absVSpeed < 1000) {
                this.yOffsetSub.set(filteredVS / 1000 * -27.22);
            }
            else if (absVSpeed < 2000) {
                this.yOffsetSub.set((filteredVS - sign * 1000) / 1000 * -10.1 - sign * 27.22);
            }
            else if (absVSpeed < 6000) {
                this.yOffsetSub.set((filteredVS - sign * 2000) / 4000 * -10.1 - sign * 37.32);
            }
            else {
                this.yOffsetSub.set(sign * -47.37);
            }
        });
        sub.on('chosenRa').handle((ra) => {
            this.radioAlt = ra;
        });
        this.props.filteredRadioAltitude.sub((filteredRadioAltitude) => {
            this.filteredRadioAltitude = filteredRadioAltitude;
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { class: "TapeBackground", d: "m151.84 131.72 4.1301-15.623v-70.556l-4.1301-15.623h-5.5404v101.8z" }),
            FSComponent.buildComponent("g", { id: "VSpeedFailText", ref: this.vsFailed },
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontLargest Red EndAlign", x: "153.13206", y: "77.501472" }, "V"),
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontLargest Red EndAlign", x: "153.13406", y: "83.211388" }, "/"),
                FSComponent.buildComponent("text", { class: "Blink9Seconds FontLargest Red EndAlign", x: "152.99374", y: "88.870819" }, "S")),
            FSComponent.buildComponent(VSpeedTcas, { ref: this.vspeedTcas, bus: this.props.bus }),
            FSComponent.buildComponent("g", { id: "VerticalSpeedGroup", ref: this.vsNormal },
                FSComponent.buildComponent("g", { class: "Fill White" },
                    FSComponent.buildComponent("path", { d: "m149.92 54.339v-1.4615h1.9151v1.4615z" }),
                    FSComponent.buildComponent("path", { d: "m149.92 44.26v-1.4615h1.9151v1.4615z" }),
                    FSComponent.buildComponent("path", { d: "m149.92 34.054v-1.2095h1.9151v1.2095z" }),
                    FSComponent.buildComponent("path", { d: "m151.84 107.31h-1.9151v1.4615h1.9151z" }),
                    FSComponent.buildComponent("path", { d: "m151.84 117.39h-1.9151v1.4615h1.9151z" }),
                    FSComponent.buildComponent("path", { d: "m151.84 127.59h-1.9151v1.2095h1.9151z" })),
                FSComponent.buildComponent("g", { class: "SmallStroke  White" },
                    FSComponent.buildComponent("path", { d: "m149.92 67.216h1.7135h0" }),
                    FSComponent.buildComponent("path", { d: "m151.84 48.569h-1.9151h0" }),
                    FSComponent.buildComponent("path", { d: "m151.84 38.489h-1.9151h0" }),
                    FSComponent.buildComponent("path", { d: "m149.92 94.43h1.7135h0" }),
                    FSComponent.buildComponent("path", { d: "m151.84 113.08h-1.9151h0" }),
                    FSComponent.buildComponent("path", { d: "m151.84 123.16h-1.9151h0" })),
                FSComponent.buildComponent("g", { class: "FontSmallest MiddleAlign Fill White" },
                    FSComponent.buildComponent("text", { x: "148.47067", y: "109.72845" }, "1"),
                    FSComponent.buildComponent("text", { x: "148.24495", y: "119.8801" }, "2"),
                    FSComponent.buildComponent("text", { x: "148.27068", y: "129.90607" }, "6"),
                    FSComponent.buildComponent("text", { x: "148.49667", y: "55.316456" }, "1"),
                    FSComponent.buildComponent("text", { x: "148.26495", y: "45.356102" }, "2"),
                    FSComponent.buildComponent("text", { x: "148.21367", y: "35.195072" }, "6")),
                FSComponent.buildComponent("path", { class: "Fill Yellow", d: "m145.79 80.067h6.0476v1.5119h-6.0476z" }),
                FSComponent.buildComponent(VSpeedNeedle, { yOffset: this.yOffsetSub, needleColour: this.needleColour }),
                FSComponent.buildComponent(VSpeedText, { bus: this.props.bus, yOffset: this.yOffsetSub, textColour: this.needleColour.map((c) => (c === 'White' ? 'Green' : c)) }))));
    }
}
class VSpeedNeedle extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.outLineRef = FSComponent.createRef();
        this.indicatorRef = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const dxFull = 12;
        const dxBorder = 5;
        const centerX = 162.74;
        const centerY = 80.822;
        this.props.yOffset.sub((yOffset) => {
            const path = `m${centerX - dxBorder} ${centerY + dxBorder / dxFull * yOffset} l ${dxBorder - dxFull} ${(1 - dxBorder / dxFull) * yOffset}`;
            this.outLineRef.instance.setAttribute('d', path);
            this.indicatorRef.instance.setAttribute('d', path);
        });
        this.props.needleColour.sub((colour) => {
            this.indicatorRef.instance.setAttribute('class', `HugeStroke ${colour}`);
        }, true);
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("path", { ref: this.outLineRef, class: "HugeOutline" }),
            FSComponent.buildComponent("path", { ref: this.indicatorRef, id: "VSpeedIndicator" })));
    }
}
class VSpeedText extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.vsTextRef = FSComponent.createRef();
        this.groupRef = FSComponent.createRef();
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on('vs').handle((vs) => {
            const absVSpeed = Math.abs(vs.value);
            if (absVSpeed < 200) {
                this.groupRef.instance.setAttribute('visibility', 'hidden');
                return;
            }
            this.groupRef.instance.setAttribute('visibility', 'visible');
            const sign = Math.sign(vs.value);
            const textOffset = this.props.yOffset.get() - sign * 2.4;
            const text = (Math.round(absVSpeed / 100) < 10 ? '0' : '') + Math.round(absVSpeed / 100).toString();
            this.vsTextRef.instance.textContent = text;
            this.groupRef.instance.setAttribute('transform', `translate(0 ${textOffset})`);
        });
        this.props.textColour.sub((colour) => {
            const className = `FontSmallest MiddleAlign ${colour}`;
            this.vsTextRef.instance.setAttribute('class', className);
        }, true);
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.groupRef, id: "VSpeedTextGroup" },
            FSComponent.buildComponent("path", { class: "BackgroundFill", d: "m158.4 83.011h-7.0514v-4.3989h7.0514z" }),
            FSComponent.buildComponent("text", { ref: this.vsTextRef, id: "VSpeedText", x: "155.14055", y: "82.554756" })));
    }
}
class VSpeedTcas extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.tcasGroup = FSComponent.createRef();
        this.nonCorrective = FSComponent.createRef();
        this.background = FSComponent.createRef();
        this.redZoneElement = FSComponent.createRef();
        this.greenZoneElement = FSComponent.createRef();
        this.redZone = Subject.create(-1);
        this.redZoneHigh = Subject.create(-1);
        this.greenZone = Subject.create(-1);
        this.greenZoneHigh = Subject.create(-1);
        this.extended = Subject.create(false);
        this.isCorrective = Subject.create(false);
    }
    update(state) {
        if (state.tcasState !== 2) {
            this.tcasGroup.instance.classList.add('HiddenElement');
            this.nonCorrective.instance.classList.add('HiddenElement');
        }
        else if (state.isTcasCorrective) {
            this.tcasGroup.instance.classList.remove('HiddenElement');
            this.background.instance.classList.remove('HiddenElement');
            this.redZone.set(state.tcasRedZoneL);
            this.redZoneHigh.set(state.tcasRedZoneH);
            this.greenZone.set(state.tcasGreenZoneL);
            this.greenZoneHigh.set(state.tcasGreenZoneH);
            this.nonCorrective.instance.classList.add('HiddenElement');
        }
        else {
            this.background.instance.classList.add('HiddenElement');
            this.nonCorrective.instance.classList.add('HiddenElement');
            this.isCorrective.set(false);
            this.extended.set(false);
            this.redZone.set(state.tcasRedZoneL);
            this.redZoneHigh.set(state.tcasRedZoneH);
        }
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { id: "VerticalSpeedTCASGroup", ref: this.tcasGroup },
                FSComponent.buildComponent("rect", { ref: this.background, class: "TapeBackground", height: "101.8", width: "5.5404", y: "29.92", x: "151.84" }),
                FSComponent.buildComponent(VSpeedTcasZone, { ref: this.redZoneElement, zoneBoundLow: this.redZone, zoneBoundHigh: this.redZoneHigh, zoneClass: "Fill Red", isCorrective: this.isCorrective, extended: Subject.create(false) }),
                FSComponent.buildComponent(VSpeedTcasZone, { ref: this.greenZoneElement, zoneBoundLow: this.greenZone, zoneBoundHigh: this.greenZoneHigh, zoneClass: "Fill Green", extended: this.extended, isCorrective: this.isCorrective })),
            FSComponent.buildComponent("g", { id: "VerticalSpeedTCASGroupNonCorrective", ref: this.nonCorrective },
                FSComponent.buildComponent(VSpeedTcasZone, { zoneBoundLow: this.redZone, zoneBoundHigh: this.redZoneHigh, zoneClass: "Fill Red", extended: Subject.create(false), isCorrective: Subject.create(false) }))));
    }
}
class VSpeedTcasZone extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.zoneUpper = 0;
        this.zoneLower = 0;
        this.extended = false;
        this.isCorrective = false;
        this.path = FSComponent.createRef();
        this.getYoffset = (VSpeed) => {
            const absVSpeed = Math.abs(VSpeed);
            const sign = Math.sign(VSpeed);
            if (absVSpeed < 1000) {
                return VSpeed / 1000 * -27.22;
            }
            if (absVSpeed < 2000) {
                return (VSpeed - sign * 1000) / 1000 * -10.1 - sign * 27.22;
            }
            if (absVSpeed < 6000) {
                return (VSpeed - sign * 2000) / 4000 * -10.1 - sign * 37.32;
            }
            return sign * -47.37;
        };
    }
    drawTcasZone() {
        if (this.zoneLower !== -1 && this.zoneUpper !== -1) {
            let y1;
            let y2;
            let y3;
            let y4;
            if (this.zoneLower >= 6000) {
                y1 = 29.92;
            }
            else if (this.zoneLower <= -6000) {
                y1 = 131.72;
            }
            else {
                y1 = 80.822 + this.getYoffset(this.zoneLower);
            }
            if (this.zoneUpper >= 6000) {
                y2 = 29.92;
            }
            else if (this.zoneUpper <= -6000) {
                y2 = 131.72;
            }
            else {
                y2 = 80.822 + this.getYoffset(this.zoneUpper);
            }
            if ((Math.abs(this.zoneUpper) > 1750 && Math.abs(this.zoneUpper) > Math.abs(this.zoneLower))
                || (this.isCorrective && this.props.zoneClass === 'Fill Red')) {
                y3 = y2;
            }
            else {
                // y3 = 80.822 + getYoffset(zoneBounds[1] / 2);
                y3 = 80.822;
            }
            if (Math.abs(this.zoneLower) > 1750 && Math.abs(this.zoneLower) > Math.abs(this.zoneUpper)
                || (this.isCorrective && this.props.zoneClass === 'Fill Red')) {
                y4 = y1;
            }
            else {
                // y4 = 80.822 + getYoffset(zoneBounds[0] / 2);
                y4 = 80.822;
            }
            const x1 = 151.84;
            const x2 = this.extended ? 162.74 : 157.3804;
            this.path.instance.setAttribute('d', `m${x1},${y1} L${x1},${y2} L${x2},${y3} L${x2},${y4} L${x1},${y1}z`);
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.zoneBoundLow.sub((z) => {
            this.zoneLower = z;
            this.drawTcasZone();
        });
        this.props.zoneBoundHigh.sub((z) => {
            this.zoneUpper = z;
            this.drawTcasZone();
        });
        this.props.extended.sub((z) => {
            this.extended = z;
            this.drawTcasZone();
        });
        this.props.isCorrective.sub((z) => {
            this.isCorrective = z;
            this.drawTcasZone();
        });
    }
    render() {
        return (FSComponent.buildComponent("path", { ref: this.path, class: this.props.zoneClass }));
    }
}

const getDisplayIndex = () => {
    const url = document.getElementsByTagName('a32nx-pfd')[0].getAttribute('url');
    return url ? parseInt(url.substring(url.length - 1), 10) : 0;
};
class PFDComponent extends DisplayComponent {
    constructor(props) {
        super(props);
        this.headingFailed = Subject.create(true);
        this.displayFailed = Subject.create(false);
        this.isAttExcessive = Subject.create(false);
        this.pitch = new Arinc429Word(0);
        this.roll = new Arinc429Word(0);
        this.ownRadioAltitude = new Arinc429Word(0);
        this.filteredRadioAltitude = Subject.create(0);
        this.radioAltitudeFilter = new LagFilter(5);
        this.failuresConsumer = new FailuresConsumer('A32NX');
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.failuresConsumer.register(getDisplayIndex() === 1 ? A320Failure.LeftPfdDisplay : A320Failure.RightPfdDisplay);
        const sub = this.props.bus.getSubscriber();
        sub.on('headingAr').handle((h) => {
            if (this.headingFailed.get() !== h.isNormalOperation()) {
                this.headingFailed.set(!h.isNormalOperation());
            }
        });
        sub.on('rollAr').handle((r) => {
            this.roll = r;
        });
        sub.on('pitchAr').handle((p) => {
            this.pitch = p;
        });
        sub.on('realTime').atFrequency(1).handle((_t) => {
            this.failuresConsumer.update();
            this.displayFailed.set(this.failuresConsumer.isActive(getDisplayIndex() === 1 ? A320Failure.LeftPfdDisplay : A320Failure.RightPfdDisplay));
            if (!this.isAttExcessive.get() && ((this.pitch.isNormalOperation()
                && (this.pitch.value > 25 || this.pitch.value < -13)) || (this.roll.isNormalOperation() && Math.abs(this.roll.value) > 45))) {
                this.isAttExcessive.set(true);
            }
            else if (this.isAttExcessive.get() && this.pitch.isNormalOperation() && this.pitch.value < 22 && this.pitch.value > -10
                && this.roll.isNormalOperation() && Math.abs(this.roll.value) < 40) {
                this.isAttExcessive.set(false);
            }
        });
        sub.on('chosenRa').handle((ra) => {
            this.ownRadioAltitude = ra;
            const filteredRadioAltitude = this.radioAltitudeFilter.step(this.ownRadioAltitude.value, this.props.instrument.deltaTime / 1000);
            this.filteredRadioAltitude.set(filteredRadioAltitude);
        });
    }
    render() {
        return (FSComponent.buildComponent(DisplayUnit, { failed: this.displayFailed, bus: this.props.bus },
            FSComponent.buildComponent("svg", { class: "pfd-svg", version: "1.1", viewBox: "0 0 158.75 158.75", xmlns: "http://www.w3.org/2000/svg" },
                FSComponent.buildComponent(Horizon, { bus: this.props.bus, instrument: this.props.instrument, isAttExcessive: this.isAttExcessive, filteredRadioAlt: this.filteredRadioAltitude }),
                FSComponent.buildComponent(AttitudeIndicatorFixedCenter, { bus: this.props.bus, isAttExcessive: this.isAttExcessive }),
                FSComponent.buildComponent("path", { id: "Mask1", class: "BackgroundFill", 
                    // eslint-disable-next-line max-len
                    d: "m32.138 101.25c7.4164 13.363 21.492 21.652 36.768 21.652 15.277 0 29.352-8.2886 36.768-21.652v-40.859c-7.4164-13.363-21.492-21.652-36.768-21.652-15.277 0-29.352 8.2886-36.768 21.652zm-32.046 57.498h158.66v-158.75h-158.66z" }),
                FSComponent.buildComponent(HeadingTape, { bus: this.props.bus, failed: this.headingFailed }),
                FSComponent.buildComponent(AltitudeIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent(AirspeedIndicator, { bus: this.props.bus, instrument: this.props.instrument }),
                FSComponent.buildComponent("path", { id: "Mask2", class: "BackgroundFill", 
                    // eslint-disable-next-line max-len
                    d: "m32.138 145.34h73.536v10.382h-73.536zm0-44.092c7.4164 13.363 21.492 21.652 36.768 21.652 15.277 0 29.352-8.2886 36.768-21.652v-40.859c-7.4164-13.363-21.492-21.652-36.768-21.652-15.277 0-29.352 8.2886-36.768 21.652zm-32.046 57.498h158.66v-158.75h-158.66zm115.14-35.191v-85.473h20.344v85.473zm-113.33 0v-85.473h27.548v85.473z" }),
                FSComponent.buildComponent(AirspeedIndicatorOfftape, { bus: this.props.bus }),
                FSComponent.buildComponent(LandingSystem, { bus: this.props.bus, instrument: this.props.instrument }),
                FSComponent.buildComponent(AttitudeIndicatorFixedUpper, { bus: this.props.bus }),
                FSComponent.buildComponent(VerticalSpeedIndicator, { bus: this.props.bus, instrument: this.props.instrument, filteredRadioAltitude: this.filteredRadioAltitude }),
                FSComponent.buildComponent(HeadingOfftape, { bus: this.props.bus, failed: this.headingFailed }),
                FSComponent.buildComponent(AltitudeIndicatorOfftape, { bus: this.props.bus, filteredRadioAltitude: this.filteredRadioAltitude }),
                FSComponent.buildComponent(LinearDeviationIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent(MachNumber, { bus: this.props.bus }),
                FSComponent.buildComponent(FMA, { bus: this.props.bus, isAttExcessive: this.isAttExcessive }))));
    }
}

class AdirsValueProvider {
    constructor(bus, pfdSimvar) {
        this.bus = bus;
        this.pfdSimvar = pfdSimvar;
    }
    start() {
        const sub = this.bus.getSubscriber();
        const displayIndex = getDisplayIndex();
        sub.on('attHdgKnob').whenChanged().handle((k) => {
            const inertialSource = getSupplier(displayIndex, k);
            this.pfdSimvar.updateSimVarSource('vsInert', { name: `L:A32NX_ADIRS_IR_${inertialSource}_VERTICAL_SPEED`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('pitch', { name: `L:A32NX_ADIRS_IR_${inertialSource}_PITCH`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('roll', { name: `L:A32NX_ADIRS_IR_${inertialSource}_ROLL`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('heading', { name: `L:A32NX_ADIRS_IR_${inertialSource}_HEADING`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('groundTrack', { name: `L:A32NX_ADIRS_IR_${inertialSource}_TRACK`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('fpaRaw', { name: `L:A32NX_ADIRS_IR_${inertialSource}_FLIGHT_PATH_ANGLE`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('daRaw', { name: `L:A32NX_ADIRS_IR_${inertialSource}_DRIFT_ANGLE`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('latAccRaw', { name: `L:A32NX_ADIRS_IR_${inertialSource}_BODY_LATERAL_ACC`, type: SimVarValueType.Number });
        });
        sub.on('airKnob').whenChanged().handle((a) => {
            const airSource = getSupplier(displayIndex, a);
            this.pfdSimvar.updateSimVarSource('speed', { name: `L:A32NX_ADIRS_ADR_${airSource}_COMPUTED_AIRSPEED`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('vsBaro', { name: `L:A32NX_ADIRS_ADR_${airSource}_BAROMETRIC_VERTICAL_SPEED`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('altitude', { name: `L:A32NX_ADIRS_ADR_${airSource}_ALTITUDE`, type: SimVarValueType.Number });
            this.pfdSimvar.updateSimVarSource('mach', { name: `L:A32NX_ADIRS_ADR_${airSource}_MACH`, type: SimVarValueType.Number });
        });
    }
}
const isCaptainSide = (displayIndex) => displayIndex === 1;
const getSupplier = (displayIndex, knobValue) => {
    const adirs3ToCaptain = 0;
    const adirs3ToFO = 2;
    if (isCaptainSide(displayIndex)) {
        return knobValue === adirs3ToCaptain ? 3 : 1;
    }
    return knobValue === adirs3ToFO ? 3 : 2;
};

class ArincValueProvider {
    constructor(bus) {
        this.bus = bus;
        this.roll = new Arinc429Word(0);
        this.pitch = new Arinc429Word(0);
        this.groundTrack = new Arinc429Word(0);
        this.heading = new Arinc429Word(0);
        this.speed = new Arinc429Word(0);
        this.altitude = new Arinc429Word(0);
        this.mach = new Arinc429Word(0);
        this.vsInert = new Arinc429Word(0);
        this.vsBaro = new Arinc429Word(0);
        this.groundSpeed = new Arinc429Word(0);
        this.ownRadioAltitude = new Arinc429Word(0);
        this.oppRadioAltitude = new Arinc429Word(0);
        this.fpa = new Arinc429Word(0);
        this.da = new Arinc429Word(0);
        this.ownLandingElevation = new Arinc429Word(0);
        this.oppLandingElevation = new Arinc429Word(0);
        this.latAcc = new Arinc429Word(0);
        this.fcdc1DiscreteWord1 = new Arinc429Word(0);
        this.fcdc2DiscreteWord1 = new Arinc429Word(0);
        this.fcdc1DiscreteWord2 = new Arinc429Word(0);
        this.fcdc2DiscreteWord2 = new Arinc429Word(0);
        this.fcdcToUse = 0;
        this.fac1Healthy = false;
        this.fac2Healthy = false;
        this.fac1VAlphaMax = new Arinc429Word(0);
        this.fac2VAlphaMax = new Arinc429Word(0);
        this.facToUse = 0;
    }
    init() {
        const publisher = this.bus.getPublisher();
        const subscriber = this.bus.getSubscriber();
        subscriber.on('pitch').handle((p) => {
            this.pitch = new Arinc429Word(p);
            publisher.pub('pitchAr', this.pitch);
        });
        subscriber.on('roll').handle((p) => {
            this.roll = new Arinc429Word(p);
            publisher.pub('rollAr', this.roll);
        });
        subscriber.on('groundTrack').handle((gt) => {
            this.groundTrack = new Arinc429Word(gt);
            publisher.pub('groundTrackAr', this.groundTrack);
        });
        subscriber.on('heading').handle((h) => {
            this.heading = new Arinc429Word(h);
            publisher.pub('headingAr', this.heading);
        });
        subscriber.on('speed').handle((s) => {
            this.speed = new Arinc429Word(s);
            publisher.pub('speedAr', this.speed);
        });
        subscriber.on('altitude').handle((a) => {
            this.altitude = new Arinc429Word(a);
            publisher.pub('altitudeAr', this.altitude);
        });
        subscriber.on('mach').handle((m) => {
            this.mach = new Arinc429Word(m);
            publisher.pub('machAr', this.mach);
        });
        subscriber.on('vsInert').handle((ivs) => {
            this.vsInert = new Arinc429Word(ivs);
            if (this.vsInert.isNormalOperation()) {
                publisher.pub('vs', this.vsInert);
            }
        });
        subscriber.on('vsBaro').handle((vsb) => {
            this.vsBaro = new Arinc429Word(vsb);
            if (!this.vsInert.isNormalOperation()) {
                publisher.pub('vs', this.vsBaro);
            }
        });
        subscriber.on('groundSpeed').handle((gs) => {
            this.groundSpeed = new Arinc429Word(gs);
            publisher.pub('gs', this.groundSpeed);
        });
        subscriber.on('radioAltitude1').handle((ra) => {
            if (getDisplayIndex() === 1) {
                this.ownRadioAltitude = new Arinc429Word(ra);
            }
            else {
                this.oppRadioAltitude = new Arinc429Word(ra);
            }
            this.determineAndPublishChosenRadioAltitude(publisher);
        });
        subscriber.on('radioAltitude2').handle((ra) => {
            if (getDisplayIndex() === 2) {
                this.ownRadioAltitude = new Arinc429Word(ra);
            }
            else {
                this.oppRadioAltitude = new Arinc429Word(ra);
            }
            this.determineAndPublishChosenRadioAltitude(publisher);
        });
        subscriber.on('fpaRaw').handle((fpa) => {
            this.fpa = new Arinc429Word(fpa);
            publisher.pub('fpa', this.fpa);
        });
        subscriber.on('daRaw').handle((da) => {
            this.da = new Arinc429Word(da);
            publisher.pub('da', this.da);
        });
        subscriber.on('landingElevation1').handle((elevation) => {
            if (getDisplayIndex() === 1) {
                this.ownLandingElevation.value = elevation;
            }
            else {
                this.oppLandingElevation.value = elevation;
            }
            this.determineAndPublishChosenLandingElevation(publisher);
        });
        subscriber.on('landingElevation1Ssm').handle((ssm) => {
            if (getDisplayIndex() === 1) {
                this.ownLandingElevation.ssm = ssm;
            }
            else {
                this.oppLandingElevation.ssm = ssm;
            }
            this.determineAndPublishChosenLandingElevation(publisher);
        });
        subscriber.on('landingElevation1').handle((elevation) => {
            if (getDisplayIndex() === 1) {
                this.oppLandingElevation.value = elevation;
            }
            else {
                this.ownLandingElevation.value = elevation;
            }
            this.determineAndPublishChosenLandingElevation(publisher);
        });
        subscriber.on('landingElevation1Ssm').handle((ssm) => {
            if (getDisplayIndex() === 1) {
                this.oppLandingElevation.ssm = ssm;
            }
            else {
                this.ownLandingElevation.ssm = ssm;
            }
            this.determineAndPublishChosenLandingElevation(publisher);
        });
        subscriber.on('latAccRaw').handle((latAcc) => {
            this.latAcc = new Arinc429Word(latAcc);
            publisher.pub('latAcc', this.latAcc);
        });
        subscriber.on('fcdc1DiscreteWord1Raw').handle((discreteWord1) => {
            this.fcdc1DiscreteWord1 = new Arinc429Word(discreteWord1);
            this.fcdcToUse = this.determineFcdcToUse();
            publisher.pub('fcdc1DiscreteWord1', this.fcdc1DiscreteWord1);
            if (this.fcdcToUse === 1) {
                publisher.pub('fcdcDiscreteWord1', this.fcdc1DiscreteWord1);
            }
        });
        subscriber.on('fcdc2DiscreteWord1Raw').handle((discreteWord1) => {
            this.fcdc2DiscreteWord1 = new Arinc429Word(discreteWord1);
            this.fcdcToUse = this.determineFcdcToUse();
            publisher.pub('fcdc2DiscreteWord1', this.fcdc2DiscreteWord1);
            if (this.fcdcToUse === 2) {
                publisher.pub('fcdcDiscreteWord1', this.fcdc2DiscreteWord1);
            }
        });
        subscriber.on('fcdc1DiscreteWord2Raw').handle((discreteWord2) => {
            this.fcdc1DiscreteWord2 = new Arinc429Word(discreteWord2);
            publisher.pub('fcdc1DiscreteWord2', this.fcdc1DiscreteWord2);
        });
        subscriber.on('fcdc2DiscreteWord2Raw').handle((discreteWord2) => {
            this.fcdc2DiscreteWord2 = new Arinc429Word(discreteWord2);
            publisher.pub('fcdc2DiscreteWord2', this.fcdc2DiscreteWord2);
        });
        subscriber.on('fcdc1CaptPitchCommandRaw').handle((word) => {
            if (this.fcdcToUse === 1) {
                publisher.pub('fcdcCaptPitchCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc2CaptPitchCommandRaw').handle((word) => {
            if (this.fcdcToUse === 2) {
                publisher.pub('fcdcCaptPitchCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc1FoPitchCommandRaw').handle((word) => {
            if (this.fcdcToUse === 1) {
                publisher.pub('fcdcFoPitchCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc2FoPitchCommandRaw').handle((word) => {
            if (this.fcdcToUse === 2) {
                publisher.pub('fcdcFoPitchCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc1CaptRollCommandRaw').handle((word) => {
            if (this.fcdcToUse === 1) {
                publisher.pub('fcdcCaptRollCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc2CaptRollCommandRaw').handle((word) => {
            if (this.fcdcToUse === 2) {
                publisher.pub('fcdcCaptRollCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc1FoRollCommandRaw').handle((word) => {
            if (this.fcdcToUse === 1) {
                publisher.pub('fcdcFoRollCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fcdc2FoRollCommandRaw').handle((word) => {
            if (this.fcdcToUse === 2) {
                publisher.pub('fcdcFoRollCommand', new Arinc429Word(word));
            }
        });
        subscriber.on('fac1Healthy').handle((val) => {
            this.fac1Healthy = val;
            this.determineFacToUse(publisher);
        });
        subscriber.on('fac2Healthy').handle((val) => {
            this.fac2Healthy = val;
            this.determineFacToUse(publisher);
        });
        subscriber.on('fac1VAlphaMaxRaw').handle((word) => {
            this.fac1VAlphaMax = new Arinc429Word(word);
            this.determineFacToUse(publisher);
            if (this.facToUse === 1) {
                publisher.pub('vAlphaMax', this.fac1VAlphaMax);
            }
            else if (this.facToUse === 0) {
                publisher.pub('vAlphaMax', new Arinc429Word(0));
            }
        });
        subscriber.on('fac2VAlphaMaxRaw').handle((word) => {
            this.fac2VAlphaMax = new Arinc429Word(word);
            this.determineFacToUse(publisher);
            if (this.facToUse === 2) {
                publisher.pub('vAlphaMax', this.fac2VAlphaMax);
            }
        });
        subscriber.on('fac1VAlphaProtRaw').handle((word) => {
            if (this.facToUse === 1) {
                publisher.pub('vAlphaProt', new Arinc429Word(word));
            }
            else if (this.facToUse === 0) {
                publisher.pub('vAlphaProt', new Arinc429Word(0));
            }
        });
        subscriber.on('fac2VAlphaProtRaw').handle((word) => {
            if (this.facToUse === 2) {
                publisher.pub('vAlphaProt', new Arinc429Word(word));
            }
        });
        subscriber.on('fac1VStallWarnRaw').handle((word) => {
            if (this.facToUse === 1) {
                publisher.pub('vStallWarn', new Arinc429Word(word));
            }
            else if (this.facToUse === 0) {
                publisher.pub('vStallWarn', new Arinc429Word(0));
            }
        });
        subscriber.on('fac2VStallWarnRaw').handle((word) => {
            if (this.facToUse === 2) {
                publisher.pub('vStallWarn', new Arinc429Word(word));
            }
        });
        subscriber.on('fac1EstimatedBetaRaw').handle((word) => {
            if (this.facToUse === 1) {
                publisher.pub('estimatedBeta', new Arinc429Word(word));
            }
            else if (this.facToUse === 0) {
                publisher.pub('estimatedBeta', new Arinc429Word(0));
            }
        });
        subscriber.on('fac2EstimatedBetaRaw').handle((word) => {
            if (this.facToUse === 2) {
                publisher.pub('estimatedBeta', new Arinc429Word(word));
            }
        });
        subscriber.on('fac1BetaTargetRaw').handle((word) => {
            if (this.facToUse === 1) {
                publisher.pub('betaTarget', new Arinc429Word(word));
            }
            else if (this.facToUse === 0) {
                publisher.pub('betaTarget', new Arinc429Word(0));
            }
        });
        subscriber.on('fac2BetaTargetRaw').handle((word) => {
            if (this.facToUse === 2) {
                publisher.pub('betaTarget', new Arinc429Word(word));
            }
        });
    }
    determineAndPublishChosenRadioAltitude(publisher) {
        const ownRadioAltitudeHasData = !this.ownRadioAltitude.isFailureWarning() && !this.ownRadioAltitude.isNoComputedData();
        const oppRadioAltitudeHasData = !this.oppRadioAltitude.isFailureWarning() && !this.oppRadioAltitude.isNoComputedData();
        const chosenRadioAltitude = (
        // the own RA has no data and the opposite one has data
        (!ownRadioAltitudeHasData && oppRadioAltitudeHasData)
            // the own RA has FW and the opposite has NCD
            || this.ownRadioAltitude.isFailureWarning() && this.oppRadioAltitude.isNoComputedData()) ? this.oppRadioAltitude : this.ownRadioAltitude;
        publisher.pub('chosenRa', chosenRadioAltitude);
    }
    determineAndPublishChosenLandingElevation(publisher) {
        const useOpposite = (this.ownLandingElevation.isFailureWarning()
            || this.ownLandingElevation.isNoComputedData())
            && !this.oppLandingElevation.isFailureWarning()
            && !this.oppLandingElevation.isNoComputedData();
        if (useOpposite) {
            publisher.pub('landingElevation', this.oppLandingElevation);
        }
        else {
            publisher.pub('landingElevation', this.ownLandingElevation);
        }
    }
    determineFcdcToUse() {
        if (getDisplayIndex() === 1) {
            if ((this.fcdc1DiscreteWord1.isFailureWarning() && !this.fcdc2DiscreteWord1.isFailureWarning())
                || (!this.fcdc1DiscreteWord1.getBitValueOr(24, false) && this.fcdc2DiscreteWord1.getBitValueOr(24, false))) {
                return 2;
            }
            return 1;
        }
        if (!((!this.fcdc1DiscreteWord1.isFailureWarning() && this.fcdc2DiscreteWord1.isFailureWarning())
            || (this.fcdc1DiscreteWord1.getBitValueOr(24, false) && !this.fcdc2DiscreteWord1.getBitValueOr(24, false)))) {
            return 2;
        }
        return 1;
    }
    // Determine which FAC bus to use for FE function. If FAC HEALTHY discrete is low or any word is coded FW,
    // declare FAC as invalid. For simplicty reasons, only check SSM of words that use the same data, so all failure cases are
    // handled while minimizing the words that have to be checked.
    // Left PFD uses FAC 1 when both are valid, the right PFD uses FAC 2. In case of invalidity, switchover is performed.
    // If no FAC is valid, set facToUse to 0. This causes the SPD LIM flag to be displayed.
    determineFacToUse(publisher) {
        const fac1Valid = this.fac1Healthy && !this.fac1VAlphaMax.isFailureWarning();
        const fac2Valid = this.fac2Healthy && !this.fac2VAlphaMax.isFailureWarning();
        if (getDisplayIndex() === 1 && fac1Valid) {
            this.facToUse = 1;
        }
        else if (getDisplayIndex() === 2 && fac2Valid) {
            this.facToUse = 1;
        }
        else if (fac1Valid) {
            this.facToUse = 1;
        }
        else if (fac2Valid) {
            this.facToUse = 2;
        }
        else {
            this.facToUse = 0;
        }
        publisher.pub('facToUse', this.facToUse);
    }
}

var PFDVars;
(function (PFDVars) {
    PFDVars["coldDark"] = "L:A32NX_COLD_AND_DARK_SPAWN";
    PFDVars["elec"] = "L:A32NX_ELEC_AC_ESS_BUS_IS_POWERED";
    PFDVars["elecFo"] = "L:A32NX_ELEC_AC_2_BUS_IS_POWERED";
    PFDVars["potentiometerCaptain"] = "LIGHT POTENTIOMETER:88";
    PFDVars["potentiometerFo"] = "LIGHT POTENTIOMETER:90";
    PFDVars["pitch"] = "L:A32NX_ADIRS_IR_1_PITCH";
    PFDVars["roll"] = "L:A32NX_ADIRS_IR_1_ROLL";
    PFDVars["heading"] = "L:A32NX_ADIRS_IR_1_HEADING";
    PFDVars["altitude"] = "L:A32NX_ADIRS_ADR_1_ALTITUDE";
    PFDVars["speed"] = "L:A32NX_ADIRS_ADR_1_COMPUTED_AIRSPEED";
    PFDVars["noseGearCompressed"] = "L:A32NX_LGCIU_1_NOSE_GEAR_COMPRESSED";
    PFDVars["leftMainGearCompressed"] = "L:A32NX_LGCIU_1_LEFT_GEAR_COMPRESSED";
    PFDVars["rightMainGearCompressed"] = "L:A32NX_LGCIU_1_RIGHT_GEAR_COMPRESSED";
    PFDVars["activeLateralMode"] = "L:A32NX_FMA_LATERAL_MODE";
    PFDVars["activeVerticalMode"] = "L:A32NX_FMA_VERTICAL_MODE";
    PFDVars["fmaModeReversion"] = "L:A32NX_FMA_MODE_REVERSION";
    PFDVars["fmaSpeedProtection"] = "L:A32NX_FMA_SPEED_PROTECTION_MODE";
    PFDVars["AThrMode"] = "L:A32NX_AUTOTHRUST_MODE";
    PFDVars["apVsSelected"] = "L:A32NX_AUTOPILOT_VS_SELECTED";
    PFDVars["approachCapability"] = "L:A32NX_ApproachCapability";
    PFDVars["ap1Active"] = "L:A32NX_AUTOPILOT_1_ACTIVE";
    PFDVars["ap2Active"] = "L:A32NX_AUTOPILOT_2_ACTIVE";
    PFDVars["fmaVerticalArmed"] = "L:A32NX_FMA_VERTICAL_ARMED";
    PFDVars["fmaLateralArmed"] = "L:A32NX_FMA_LATERAL_ARMED";
    PFDVars["fd1Active"] = "AUTOPILOT FLIGHT DIRECTOR ACTIVE:1";
    PFDVars["fd2Active"] = "AUTOPILOT FLIGHT DIRECTOR ACTIVE:2";
    PFDVars["athrStatus"] = "L:A32NX_AUTOTHRUST_STATUS";
    PFDVars["athrModeMessage"] = "L:A32NX_AUTOTHRUST_MODE_MESSAGE";
    PFDVars["machPreselVal"] = "L:A32NX_MachPreselVal";
    PFDVars["speedPreselVal"] = "L:A32NX_SpeedPreselVal";
    PFDVars["mda"] = "L:A32NX_MINIMUM_DESCENT_ALTITUDE";
    PFDVars["dh"] = "L:A32NX_DECISION_HEIGHT";
    PFDVars["attHdgKnob"] = "L:A32NX_ATT_HDG_SWITCHING_KNOB";
    PFDVars["airKnob"] = "L:A32NX_AIR_DATA_SWITCHING_KNOB";
    PFDVars["vsBaro"] = "L:A32NX_ADIRS_ADR_1_BAROMETRIC_VERTICAL_SPEED";
    PFDVars["vsInert"] = "L:A32NX_ADIRS_IR_1_VERTICAL_SPEED";
    PFDVars["fdYawCommand"] = "L:A32NX_FLIGHT_DIRECTOR_YAW";
    PFDVars["fdBank"] = "L:A32NX_FLIGHT_DIRECTOR_BANK";
    PFDVars["fdPitch"] = "L:A32NX_FLIGHT_DIRECTOR_PITCH";
    PFDVars["v1"] = "L:AIRLINER_V1_SPEED";
    PFDVars["vr"] = "L:AIRLINER_VR_SPEED";
    PFDVars["fwcFlightPhase"] = "L:A32NX_FWC_FLIGHT_PHASE";
    PFDVars["fmgcFlightPhase"] = "L:A32NX_FMGC_FLIGHT_PHASE";
    PFDVars["hasLoc"] = "L:A32NX_RADIO_RECEIVER_LOC_IS_VALID";
    PFDVars["hasDme"] = "NAV HAS DME:3";
    PFDVars["navIdent"] = "NAV IDENT:3";
    PFDVars["navFreq"] = "NAV FREQUENCY:3";
    PFDVars["dme"] = "NAV DME:3";
    PFDVars["navRadialError"] = "L:A32NX_RADIO_RECEIVER_LOC_DEVIATION";
    PFDVars["hasGlideslope"] = "L:A32NX_RADIO_RECEIVER_GS_IS_VALID";
    PFDVars["glideSlopeError"] = "L:A32NX_RADIO_RECEIVER_GS_DEVIATION";
    PFDVars["markerBeacon"] = "MARKER BEACON STATE";
    PFDVars["isAltManaged"] = "L:A32NX_FCU_ALT_MANAGED";
    PFDVars["targetSpeedManaged"] = "L:A32NX_SPEEDS_MANAGED_PFD";
    PFDVars["vMax"] = "L:A32NX_SPEEDS_VMAX";
    PFDVars["mach"] = "L:A32NX_ADIRS_ADR_1_MACH";
    PFDVars["flapHandleIndex"] = "L:A32NX_FLAPS_HANDLE_INDEX";
    PFDVars["greenDotSpeed"] = "L:A32NX_SPEEDS_GD";
    PFDVars["slatSpeed"] = "L:A32NX_SPEEDS_S";
    PFDVars["fSpeed"] = "L:A32NX_SPEEDS_F";
    PFDVars["transAlt"] = "L:AIRLINER_TRANS_ALT";
    PFDVars["transAltAppr"] = "L:AIRLINER_APPR_TRANS_ALT";
    PFDVars["groundTrack"] = "L:A32NX_ADIRS_IR_1_TRACK";
    PFDVars["showSelectedHeading"] = "L:A320_FCU_SHOW_SELECTED_HEADING";
    PFDVars["altConstraint"] = "L:A32NX_FG_ALTITUDE_CONSTRAINT";
    PFDVars["trkFpaActive"] = "L:A32NX_TRK_FPA_MODE_ACTIVE";
    PFDVars["aoa"] = "INCIDENCE ALPHA";
    PFDVars["groundHeadingTrue"] = "GPS GROUND TRUE HEADING";
    PFDVars["groundTrackTrue"] = "GPS GROUND TRUE TRACK";
    PFDVars["selectedFpa"] = "L:A32NX_AUTOPILOT_FPA_SELECTED";
    PFDVars["vfeNext"] = "L:A32NX_SPEEDS_VFEN";
    PFDVars["ilsCourse"] = "L:A32NX_FM_LS_COURSE";
    PFDVars["ilsRMPTuned"] = "L:A32NX_RMP_ILS_TUNED";
    PFDVars["metricAltToggle"] = "L:A32NX_METRIC_ALT_TOGGLE";
    PFDVars["tla1"] = "L:A32NX_AUTOTHRUST_TLA:1";
    PFDVars["tla2"] = "L:A32NX_AUTOTHRUST_TLA:2";
    PFDVars["tcasState"] = "L:A32NX_TCAS_STATE";
    PFDVars["tcasCorrective"] = "L:A32NX_TCAS_RA_CORRECTIVE";
    PFDVars["tcasRedZoneL"] = "L:A32NX_TCAS_VSPEED_RED:1";
    PFDVars["tcasRedZoneH"] = "L:A32NX_TCAS_VSPEED_RED:2";
    PFDVars["tcasGreenZoneL"] = "L:A32NX_TCAS_VSPEED_GREEN:1";
    PFDVars["tcasGreenZoneH"] = "L:A32NX_TCAS_VSPEED_GREEN:2";
    PFDVars["tcasFail"] = "L:A32NX_TCAS_FAULT";
    PFDVars["engOneRunning"] = "GENERAL ENG COMBUSTION:1";
    PFDVars["engTwoRunning"] = "GENERAL ENG COMBUSTION:2";
    PFDVars["expediteMode"] = "L:A32NX_FMA_EXPEDITE_MODE";
    PFDVars["setHoldSpeed"] = "L:A32NX_PFD_MSG_SET_HOLD_SPEED";
    PFDVars["tdReached"] = "L:A32NX_PFD_MSG_TD_REACHED";
    PFDVars["vls"] = "L:A32NX_SPEEDS_VLS";
    PFDVars["trkFpaDeselectedTCAS"] = "L:A32NX_AUTOPILOT_TCAS_MESSAGE_TRK_FPA_DESELECTION";
    PFDVars["tcasRaInhibited"] = "L:A32NX_AUTOPILOT_TCAS_MESSAGE_RA_INHIBITED";
    PFDVars["groundSpeed"] = "L:A32NX_ADIRS_IR_1_GROUND_SPEED";
    PFDVars["radioAltitude1"] = "L:A32NX_RA_1_RADIO_ALTITUDE";
    PFDVars["radioAltitude2"] = "L:A32NX_RA_2_RADIO_ALTITUDE";
    PFDVars["crzAltMode"] = "L:A32NX_FMA_CRUISE_ALT_MODE";
    PFDVars["tcasModeDisarmed"] = "L:A32NX_AUTOPILOT_TCAS_MESSAGE_DISARM";
    PFDVars["flexTemp"] = "L:A32NX_TO_FLEX_TEMP";
    PFDVars["autoBrakeMode"] = "L:A32NX_AUTOBRAKES_ARMED_MODE";
    PFDVars["autoBrakeActive"] = "L:A32NX_AUTOBRAKES_ACTIVE";
    PFDVars["autoBrakeDecel"] = "L:A32NX_AUTOBRAKES_DECEL_LIGHT";
    PFDVars["fpaRaw"] = "L:A32NX_ADIRS_IR_1_FLIGHT_PATH_ANGLE";
    PFDVars["daRaw"] = "L:A32NX_ADIRS_IR_1_DRIFT_ANGLE";
    PFDVars["latAccRaw"] = "L:A32NX_ADIRS_IR_1_BODY_LATERAL_ACC";
    PFDVars["ls1Button"] = "L:BTN_LS_1_FILTER_ACTIVE";
    PFDVars["ls2Button"] = "L:BTN_LS_2_FILTER_ACTIVE";
    PFDVars["fcdc1DiscreteWord1Raw"] = "L:A32NX_FCDC_1_DISCRETE_WORD_1";
    PFDVars["fcdc2DiscreteWord1Raw"] = "L:A32NX_FCDC_2_DISCRETE_WORD_1";
    PFDVars["fcdc1DiscreteWord2Raw"] = "L:A32NX_FCDC_1_DISCRETE_WORD_2";
    PFDVars["fcdc2DiscreteWord2Raw"] = "L:A32NX_FCDC_2_DISCRETE_WORD_2";
    PFDVars["fcdc1CaptPitchCommandRaw"] = "L:A32NX_FCDC_1_CAPT_PITCH_COMMAND";
    PFDVars["fcdc2CaptPitchCommandRaw"] = "L:A32NX_FCDC_2_CAPT_PITCH_COMMAND";
    PFDVars["fcdc1FoPitchCommandRaw"] = "L:A32NX_FCDC_1_FO_PITCH_COMMAND";
    PFDVars["fcdc2FoPitchCommandRaw"] = "L:A32NX_FCDC_2_FO_PITCH_COMMAND";
    PFDVars["fcdc1CaptRollCommandRaw"] = "L:A32NX_FCDC_1_CAPT_ROLL_COMMAND";
    PFDVars["fcdc2CaptRollCommandRaw"] = "L:A32NX_FCDC_2_CAPT_ROLL_COMMAND";
    PFDVars["fcdc1FoRollCommandRaw"] = "L:A32NX_FCDC_1_FO_ROLL_COMMAND";
    PFDVars["fcdc2FoRollCommandRaw"] = "L:A32NX_FCDC_2_FO_ROLL_COMMAND";
    PFDVars["xtk"] = "L:A32NX_FG_CROSS_TRACK_ERROR";
    PFDVars["ldevLeft"] = "L:A32NX_FMGC_L_LDEV_REQUEST";
    PFDVars["ldevRight"] = "L:A32NX_FMGC_R_LDEV_REQUEST";
    PFDVars["landingElevation1"] = "L:A32NX_FM1_LANDING_ELEVATION";
    PFDVars["landingElevation1Ssm"] = "L:A32NX_FM1_LANDING_ELEVATION_SSM";
    PFDVars["landingElevation2"] = "L:A32NX_FM2_LANDING_ELEVATION";
    PFDVars["landingElevation2Ssm"] = "L:A32NX_FM2_LANDING_ELEVATION_SSM";
    PFDVars["fac1Healthy"] = "L:A32NX_FAC_1_HEALTHY";
    PFDVars["fac2Healthy"] = "L:A32NX_FAC_2_HEALTHY";
    PFDVars["fac1VAlphaProtRaw"] = "L:A32NX_FAC_1_V_ALPHA_PROT";
    PFDVars["fac2VAlphaProtRaw"] = "L:A32NX_FAC_2_V_ALPHA_PROT";
    PFDVars["fac1VAlphaMaxRaw"] = "L:A32NX_FAC_1_V_ALPHA_LIM";
    PFDVars["fac2VAlphaMaxRaw"] = "L:A32NX_FAC_2_V_ALPHA_LIM";
    PFDVars["fac1VStallWarnRaw"] = "L:A32NX_FAC_1_V_STALL_WARN";
    PFDVars["fac2VStallWarnRaw"] = "L:A32NX_FAC_2_V_STALL_WARN";
    PFDVars["fac1EstimatedBetaRaw"] = "L:A32NX_FAC_1_ESTIMATED_SIDESLIP";
    PFDVars["fac2EstimatedBetaRaw"] = "L:A32NX_FAC_2_ESTIMATED_SIDESLIP";
    PFDVars["fac1BetaTargetRaw"] = "L:A32NX_FAC_1_SIDESLIP_TARGET";
    PFDVars["fac2BetaTargetRaw"] = "L:A32NX_FAC_2_SIDESLIP_TARGET";
    PFDVars["fwc1AltAlertPulsing"] = "L:A32NX_FWS_FWC_1_ALT_ALERT_PULSING";
    PFDVars["fwc2AltAlertPulsing"] = "L:A32NX_FWS_FWC_2_ALT_ALERT_PULSING";
    PFDVars["fwc1AltAlertFlashing"] = "L:A32NX_FWS_FWC_1_ALT_ALERT_FLASHING";
    PFDVars["fwc2AltAlertFlashing"] = "L:A32NX_FWS_FWC_2_ALT_ALERT_FLASHING";
    PFDVars["linearDeviationActive"] = "L:A32NX_PFD_LINEAR_DEVIATION_ACTIVE";
    PFDVars["targetAltitude"] = "L:A32NX_PFD_TARGET_ALTITUDE";
    PFDVars["verticalProfileLatched"] = "L:A32NX_PFD_VERTICAL_PROFILE_LATCHED";
    PFDVars["showSpeedMargins"] = "L:A32NX_PFD_SHOW_SPEED_MARGINS";
    PFDVars["upperSpeedMargin"] = "L:A32NX_PFD_UPPER_SPEED_MARGIN";
    PFDVars["lowerSpeedMargin"] = "L:A32NX_PFD_LOWER_SPEED_MARGIN";
})(PFDVars || (PFDVars = {}));
/** A publisher to poll and publish nav/com simvars. */
class PFDSimvarPublisher extends SimVarPublisher {
    constructor(bus) {
        super(PFDSimvarPublisher.simvars, bus);
    }
}
PFDSimvarPublisher.simvars = new Map([
    ['coldDark', { name: PFDVars.coldDark, type: SimVarValueType.Number }],
    ['elec', { name: PFDVars.elec, type: SimVarValueType.Bool }],
    ['elecFo', { name: PFDVars.elecFo, type: SimVarValueType.Bool }],
    ['potentiometerCaptain', { name: PFDVars.potentiometerCaptain, type: SimVarValueType.Number }],
    ['potentiometerFo', { name: PFDVars.potentiometerFo, type: SimVarValueType.Number }],
    ['pitch', { name: PFDVars.pitch, type: SimVarValueType.Number }],
    ['roll', { name: PFDVars.roll, type: SimVarValueType.Number }],
    ['heading', { name: PFDVars.heading, type: SimVarValueType.Number }],
    ['altitude', { name: PFDVars.altitude, type: SimVarValueType.Number }],
    ['speed', { name: PFDVars.speed, type: SimVarValueType.Number }],
    ['noseGearCompressed', { name: PFDVars.noseGearCompressed, type: SimVarValueType.Bool }],
    ['leftMainGearCompressed', { name: PFDVars.leftMainGearCompressed, type: SimVarValueType.Bool }],
    ['rightMainGearCompressed', { name: PFDVars.rightMainGearCompressed, type: SimVarValueType.Bool }],
    ['activeLateralMode', { name: PFDVars.activeLateralMode, type: SimVarValueType.Number }],
    ['activeVerticalMode', { name: PFDVars.activeVerticalMode, type: SimVarValueType.Number }],
    ['fmaModeReversion', { name: PFDVars.fmaModeReversion, type: SimVarValueType.Bool }],
    ['fmaSpeedProtection', { name: PFDVars.fmaSpeedProtection, type: SimVarValueType.Bool }],
    ['AThrMode', { name: PFDVars.AThrMode, type: SimVarValueType.Number }],
    ['apVsSelected', { name: PFDVars.apVsSelected, type: SimVarValueType.FPM }],
    ['approachCapability', { name: PFDVars.approachCapability, type: SimVarValueType.Number }],
    ['ap1Active', { name: PFDVars.ap1Active, type: SimVarValueType.Bool }],
    ['ap2Active', { name: PFDVars.ap2Active, type: SimVarValueType.Bool }],
    ['fmaVerticalArmed', { name: PFDVars.fmaVerticalArmed, type: SimVarValueType.Number }],
    ['fmaLateralArmed', { name: PFDVars.fmaLateralArmed, type: SimVarValueType.Number }],
    ['fd1Active', { name: PFDVars.fd1Active, type: SimVarValueType.Bool }],
    ['fd2Active', { name: PFDVars.fd2Active, type: SimVarValueType.Bool }],
    ['athrStatus', { name: PFDVars.athrStatus, type: SimVarValueType.Number }],
    ['athrModeMessage', { name: PFDVars.athrModeMessage, type: SimVarValueType.Number }],
    ['machPreselVal', { name: PFDVars.machPreselVal, type: SimVarValueType.Number }],
    ['speedPreselVal', { name: PFDVars.speedPreselVal, type: SimVarValueType.Knots }],
    ['mda', { name: PFDVars.mda, type: SimVarValueType.Feet }],
    ['dh', { name: PFDVars.dh, type: SimVarValueType.Feet }],
    ['attHdgKnob', { name: PFDVars.attHdgKnob, type: SimVarValueType.Enum }],
    ['airKnob', { name: PFDVars.airKnob, type: SimVarValueType.Enum }],
    ['vsBaro', { name: PFDVars.vsBaro, type: SimVarValueType.Number }],
    ['vsInert', { name: PFDVars.vsInert, type: SimVarValueType.Number }],
    ['fdYawCommand', { name: PFDVars.fdYawCommand, type: SimVarValueType.Number }],
    ['fdBank', { name: PFDVars.fdBank, type: SimVarValueType.Number }],
    ['fdPitch', { name: PFDVars.fdPitch, type: SimVarValueType.Number }],
    ['v1', { name: PFDVars.v1, type: SimVarValueType.Knots }],
    ['vr', { name: PFDVars.vr, type: SimVarValueType.Knots }],
    ['fwcFlightPhase', { name: PFDVars.fwcFlightPhase, type: SimVarValueType.Number }],
    ['fmgcFlightPhase', { name: PFDVars.fmgcFlightPhase, type: SimVarValueType.Enum }],
    ['hasLoc', { name: PFDVars.hasLoc, type: SimVarValueType.Bool }],
    ['hasDme', { name: PFDVars.hasDme, type: SimVarValueType.Bool }],
    ['navIdent', { name: PFDVars.navIdent, type: SimVarValueType.String }],
    ['navFreq', { name: PFDVars.navFreq, type: SimVarValueType.MHz }],
    ['dme', { name: PFDVars.dme, type: SimVarValueType.NM }],
    ['navRadialError', { name: PFDVars.navRadialError, type: SimVarValueType.Degree }],
    ['hasGlideslope', { name: PFDVars.hasGlideslope, type: SimVarValueType.Bool }],
    ['glideSlopeError', { name: PFDVars.glideSlopeError, type: SimVarValueType.Degree }],
    ['markerBeacon', { name: PFDVars.markerBeacon, type: SimVarValueType.Enum }],
    ['isAltManaged', { name: PFDVars.isAltManaged, type: SimVarValueType.Bool }],
    ['targetSpeedManaged', { name: PFDVars.targetSpeedManaged, type: SimVarValueType.Knots }],
    ['vMax', { name: PFDVars.vMax, type: SimVarValueType.Number }],
    ['mach', { name: PFDVars.mach, type: SimVarValueType.Number }],
    ['flapHandleIndex', { name: PFDVars.flapHandleIndex, type: SimVarValueType.Number }],
    ['greenDotSpeed', { name: PFDVars.greenDotSpeed, type: SimVarValueType.Number }],
    ['slatSpeed', { name: PFDVars.slatSpeed, type: SimVarValueType.Number }],
    ['fSpeed', { name: PFDVars.fSpeed, type: SimVarValueType.Number }],
    ['transAlt', { name: PFDVars.transAlt, type: SimVarValueType.Number }],
    ['transAltAppr', { name: PFDVars.transAltAppr, type: SimVarValueType.Number }],
    ['groundTrack', { name: PFDVars.groundTrack, type: SimVarValueType.Number }],
    ['showSelectedHeading', { name: PFDVars.showSelectedHeading, type: SimVarValueType.Number }],
    ['altConstraint', { name: PFDVars.altConstraint, type: SimVarValueType.Feet }],
    ['trkFpaActive', { name: PFDVars.trkFpaActive, type: SimVarValueType.Bool }],
    ['aoa', { name: PFDVars.aoa, type: SimVarValueType.Degree }],
    ['groundHeadingTrue', { name: PFDVars.groundHeadingTrue, type: SimVarValueType.Degree }],
    ['groundTrackTrue', { name: PFDVars.groundTrackTrue, type: SimVarValueType.Degree }],
    ['selectedFpa', { name: PFDVars.selectedFpa, type: SimVarValueType.Degree }],
    ['vfeNext', { name: PFDVars.vfeNext, type: SimVarValueType.Number }],
    ['ilsCourse', { name: PFDVars.ilsCourse, type: SimVarValueType.Number }],
    ['ilsRMPTuned', { name: PFDVars.ilsRMPTuned, type: SimVarValueType.Bool }],
    ['metricAltToggle', { name: PFDVars.metricAltToggle, type: SimVarValueType.Bool }],
    ['tla1', { name: PFDVars.tla1, type: SimVarValueType.Number }],
    ['tla2', { name: PFDVars.tla2, type: SimVarValueType.Number }],
    ['tcasState', { name: PFDVars.tcasState, type: SimVarValueType.Enum }],
    ['tcasCorrective', { name: PFDVars.tcasCorrective, type: SimVarValueType.Bool }],
    ['tcasRedZoneL', { name: PFDVars.tcasRedZoneL, type: SimVarValueType.Number }],
    ['tcasRedZoneH', { name: PFDVars.tcasRedZoneH, type: SimVarValueType.Number }],
    ['tcasGreenZoneL', { name: PFDVars.tcasGreenZoneL, type: SimVarValueType.Number }],
    ['tcasGreenZoneH', { name: PFDVars.tcasGreenZoneH, type: SimVarValueType.Number }],
    ['tcasFail', { name: PFDVars.tcasFail, type: SimVarValueType.Bool }],
    ['engOneRunning', { name: PFDVars.engOneRunning, type: SimVarValueType.Bool }],
    ['engTwoRunning', { name: PFDVars.engTwoRunning, type: SimVarValueType.Bool }],
    ['expediteMode', { name: PFDVars.expediteMode, type: SimVarValueType.Bool }],
    ['setHoldSpeed', { name: PFDVars.setHoldSpeed, type: SimVarValueType.Bool }],
    ['tdReached', { name: PFDVars.tdReached, type: SimVarValueType.Bool }],
    ['vls', { name: PFDVars.vls, type: SimVarValueType.Number }],
    ['trkFpaDeselectedTCAS', { name: PFDVars.trkFpaDeselectedTCAS, type: SimVarValueType.Bool }],
    ['tcasRaInhibited', { name: PFDVars.tcasRaInhibited, type: SimVarValueType.Bool }],
    ['groundSpeed', { name: PFDVars.groundSpeed, type: SimVarValueType.Number }],
    ['radioAltitude1', { name: PFDVars.radioAltitude1, type: SimVarValueType.Number }],
    ['radioAltitude2', { name: PFDVars.radioAltitude2, type: SimVarValueType.Number }],
    ['crzAltMode', { name: PFDVars.crzAltMode, type: SimVarValueType.Bool }],
    ['tcasModeDisarmed', { name: PFDVars.tcasModeDisarmed, type: SimVarValueType.Bool }],
    ['flexTemp', { name: PFDVars.flexTemp, type: SimVarValueType.Number }],
    ['autoBrakeMode', { name: PFDVars.autoBrakeMode, type: SimVarValueType.Number }],
    ['autoBrakeActive', { name: PFDVars.autoBrakeActive, type: SimVarValueType.Bool }],
    ['autoBrakeDecel', { name: PFDVars.autoBrakeDecel, type: SimVarValueType.Bool }],
    ['fpaRaw', { name: PFDVars.fpaRaw, type: SimVarValueType.Number }],
    ['daRaw', { name: PFDVars.daRaw, type: SimVarValueType.Number }],
    ['latAccRaw', { name: PFDVars.latAccRaw, type: SimVarValueType.Number }],
    ['ls1Button', { name: PFDVars.ls1Button, type: SimVarValueType.Bool }],
    ['ls2Button', { name: PFDVars.ls2Button, type: SimVarValueType.Bool }],
    ['fcdc1DiscreteWord1Raw', { name: PFDVars.fcdc1DiscreteWord1Raw, type: SimVarValueType.Number }],
    ['fcdc2DiscreteWord1Raw', { name: PFDVars.fcdc2DiscreteWord1Raw, type: SimVarValueType.Number }],
    ['fcdc1DiscreteWord2Raw', { name: PFDVars.fcdc1DiscreteWord2Raw, type: SimVarValueType.Number }],
    ['fcdc2DiscreteWord2Raw', { name: PFDVars.fcdc2DiscreteWord2Raw, type: SimVarValueType.Number }],
    ['fcdc1CaptPitchCommandRaw', { name: PFDVars.fcdc1CaptPitchCommandRaw, type: SimVarValueType.Number }],
    ['fcdc2CaptPitchCommandRaw', { name: PFDVars.fcdc2CaptPitchCommandRaw, type: SimVarValueType.Number }],
    ['fcdc1FoPitchCommandRaw', { name: PFDVars.fcdc1FoPitchCommandRaw, type: SimVarValueType.Number }],
    ['fcdc2FoPitchCommandRaw', { name: PFDVars.fcdc2FoPitchCommandRaw, type: SimVarValueType.Number }],
    ['fcdc1CaptRollCommandRaw', { name: PFDVars.fcdc1CaptRollCommandRaw, type: SimVarValueType.Number }],
    ['fcdc2CaptRollCommandRaw', { name: PFDVars.fcdc2CaptRollCommandRaw, type: SimVarValueType.Number }],
    ['fcdc1FoRollCommandRaw', { name: PFDVars.fcdc1FoRollCommandRaw, type: SimVarValueType.Number }],
    ['fcdc2FoRollCommandRaw', { name: PFDVars.fcdc2FoRollCommandRaw, type: SimVarValueType.Number }],
    ['xtk', { name: PFDVars.xtk, type: SimVarValueType.NM }],
    ['ldevRequestLeft', { name: PFDVars.ldevLeft, type: SimVarValueType.Bool }],
    ['ldevRequestRight', { name: PFDVars.ldevRight, type: SimVarValueType.Bool }],
    ['landingElevation1', { name: PFDVars.landingElevation1, type: SimVarValueType.Number }],
    ['landingElevation1Ssm', { name: PFDVars.landingElevation1Ssm, type: SimVarValueType.Number }],
    ['landingElevation2', { name: PFDVars.landingElevation2, type: SimVarValueType.Number }],
    ['landingElevation2Ssm', { name: PFDVars.landingElevation2Ssm, type: SimVarValueType.Number }],
    ['fac1Healthy', { name: PFDVars.fac1Healthy, type: SimVarValueType.Bool }],
    ['fac2Healthy', { name: PFDVars.fac2Healthy, type: SimVarValueType.Bool }],
    ['fac1VAlphaProtRaw', { name: PFDVars.fac1VAlphaProtRaw, type: SimVarValueType.Number }],
    ['fac2VAlphaProtRaw', { name: PFDVars.fac2VAlphaProtRaw, type: SimVarValueType.Number }],
    ['fac1VAlphaMaxRaw', { name: PFDVars.fac1VAlphaMaxRaw, type: SimVarValueType.Number }],
    ['fac2VAlphaMaxRaw', { name: PFDVars.fac2VAlphaMaxRaw, type: SimVarValueType.Number }],
    ['fac1VStallWarnRaw', { name: PFDVars.fac1VStallWarnRaw, type: SimVarValueType.Number }],
    ['fac2VStallWarnRaw', { name: PFDVars.fac2VStallWarnRaw, type: SimVarValueType.Number }],
    ['fac1EstimatedBetaRaw', { name: PFDVars.fac1EstimatedBetaRaw, type: SimVarValueType.Number }],
    ['fac2EstimatedBetaRaw', { name: PFDVars.fac2EstimatedBetaRaw, type: SimVarValueType.Number }],
    ['fac1BetaTargetRaw', { name: PFDVars.fac1BetaTargetRaw, type: SimVarValueType.Number }],
    ['fac2BetaTargetRaw', { name: PFDVars.fac2BetaTargetRaw, type: SimVarValueType.Number }],
    ['fwc1AltAlertPulsing', { name: PFDVars.fwc1AltAlertPulsing, type: SimVarValueType.Bool }],
    ['fwc2AltAlertPulsing', { name: PFDVars.fwc2AltAlertPulsing, type: SimVarValueType.Bool }],
    ['fwc1AltAlertFlashing', { name: PFDVars.fwc1AltAlertFlashing, type: SimVarValueType.Bool }],
    ['fwc2AltAlertFlashing', { name: PFDVars.fwc2AltAlertFlashing, type: SimVarValueType.Bool }],
    ['linearDeviationActive', { name: PFDVars.linearDeviationActive, type: SimVarValueType.Bool }],
    ['targetAltitude', { name: PFDVars.targetAltitude, type: SimVarValueType.Feet }],
    ['verticalProfileLatched', { name: PFDVars.verticalProfileLatched, type: SimVarValueType.Bool }],
    ['showSpeedMargins', { name: PFDVars.showSpeedMargins, type: SimVarValueType.Bool }],
    ['upperSpeedMargin', { name: PFDVars.upperSpeedMargin, type: SimVarValueType.Knots }],
    ['lowerSpeedMargin', { name: PFDVars.lowerSpeedMargin, type: SimVarValueType.Knots }],
]);

class SimplaneValueProvider {
    constructor(bus) {
        this.bus = bus;
        this.publisher = this.bus.getPublisher();
    }
    onUpdate() {
        const units = Simplane.getPressureSelectedUnits();
        const pressure = Simplane.getPressureValue(units);
        const isSelected = Simplane.getAutoPilotAirspeedSelected();
        const isMach = Simplane.getAutoPilotMachModeActive();
        const selectedHeading = Simplane.getAutoPilotSelectedHeadingLockValue(false) || 0;
        const selectedAltitude = Simplane.getAutoPilotDisplayedAltitudeLockValue();
        const holdValue = isMach ? Simplane.getAutoPilotMachHoldValue() : Simplane.getAutoPilotAirspeedHoldValue();
        const baroMode = Simplane.getPressureSelectedMode(Aircraft.A320_NEO);
        this.publisher.pub('units', units);
        this.publisher.pub('pressure', pressure);
        this.publisher.pub('isSelectedSpeed', isSelected);
        this.publisher.pub('machActive', isMach);
        this.publisher.pub('holdValue', holdValue);
        this.publisher.pub('selectedHeading', selectedHeading);
        this.publisher.pub('selectedAltitude', selectedAltitude);
        this.publisher.pub('baroMode', baroMode);
    }
}

class A32NX_PFD extends BaseInstrument {
    constructor() {
        super();
        /**
         * "mainmenu" = 0
         * "loading" = 1
         * "briefing" = 2
         * "ingame" = 3
         */
        this.gameState = 0;
        this.bus = new EventBus();
        this.simVarPublisher = new PFDSimvarPublisher(this.bus);
        this.hEventPublisher = new HEventPublisher(this.bus);
        this.arincProvider = new ArincValueProvider(this.bus);
        this.simplaneValueProvider = new SimplaneValueProvider(this.bus);
        this.clock = new Clock(this.bus);
        this.adirsValueProvider = new AdirsValueProvider(this.bus, this.simVarPublisher);
    }
    get templateID() {
        return 'A32NX_PFD';
    }
    getDeltaTime() {
        return this.deltaTime;
    }
    onInteractionEvent(args) {
        this.hEventPublisher.dispatchHEvent(args[0]);
    }
    connectedCallback() {
        super.connectedCallback();
        this.arincProvider.init();
        this.clock.init();
        this.simVarPublisher.subscribe('elec');
        this.simVarPublisher.subscribe('elecFo');
        this.simVarPublisher.subscribe('coldDark');
        this.simVarPublisher.subscribe('potentiometerCaptain');
        this.simVarPublisher.subscribe('potentiometerFo');
        this.simVarPublisher.subscribe('pitch');
        this.simVarPublisher.subscribe('roll');
        this.simVarPublisher.subscribe('heading');
        this.simVarPublisher.subscribe('altitude');
        this.simVarPublisher.subscribe('speed');
        this.simVarPublisher.subscribe('noseGearCompressed');
        this.simVarPublisher.subscribe('leftMainGearCompressed');
        this.simVarPublisher.subscribe('rightMainGearCompressed');
        this.simVarPublisher.subscribe('activeLateralMode');
        this.simVarPublisher.subscribe('activeVerticalMode');
        this.simVarPublisher.subscribe('fmaModeReversion');
        this.simVarPublisher.subscribe('fmaSpeedProtection');
        this.simVarPublisher.subscribe('AThrMode');
        this.simVarPublisher.subscribe('apVsSelected');
        this.simVarPublisher.subscribe('approachCapability');
        this.simVarPublisher.subscribe('ap1Active');
        this.simVarPublisher.subscribe('ap2Active');
        this.simVarPublisher.subscribe('fmaVerticalArmed');
        this.simVarPublisher.subscribe('fmaLateralArmed');
        this.simVarPublisher.subscribe('fd1Active');
        this.simVarPublisher.subscribe('fd2Active');
        this.simVarPublisher.subscribe('athrStatus');
        this.simVarPublisher.subscribe('athrModeMessage');
        this.simVarPublisher.subscribe('machPreselVal');
        this.simVarPublisher.subscribe('speedPreselVal');
        this.simVarPublisher.subscribe('mda');
        this.simVarPublisher.subscribe('dh');
        this.simVarPublisher.subscribe('attHdgKnob');
        this.simVarPublisher.subscribe('airKnob');
        this.simVarPublisher.subscribe('vsBaro');
        this.simVarPublisher.subscribe('vsInert');
        this.simVarPublisher.subscribe('fdYawCommand');
        this.simVarPublisher.subscribe('fdBank');
        this.simVarPublisher.subscribe('fdPitch');
        this.simVarPublisher.subscribe('hasLoc');
        this.simVarPublisher.subscribe('hasDme');
        this.simVarPublisher.subscribe('navIdent');
        this.simVarPublisher.subscribe('navFreq');
        this.simVarPublisher.subscribe('dme');
        this.simVarPublisher.subscribe('navRadialError');
        this.simVarPublisher.subscribe('hasGlideslope');
        this.simVarPublisher.subscribe('glideSlopeError');
        this.simVarPublisher.subscribe('markerBeacon');
        this.simVarPublisher.subscribe('v1');
        this.simVarPublisher.subscribe('fwcFlightPhase');
        this.simVarPublisher.subscribe('fmgcFlightPhase');
        this.simVarPublisher.subscribe('vr');
        this.simVarPublisher.subscribe('vMax');
        this.simVarPublisher.subscribe('isAltManaged');
        this.simVarPublisher.subscribe('mach');
        this.simVarPublisher.subscribe('flapHandleIndex');
        this.simVarPublisher.subscribe('greenDotSpeed');
        this.simVarPublisher.subscribe('slatSpeed');
        this.simVarPublisher.subscribe('fSpeed');
        this.simVarPublisher.subscribe('transAlt');
        this.simVarPublisher.subscribe('transAltAppr');
        this.simVarPublisher.subscribe('groundTrack');
        this.simVarPublisher.subscribe('showSelectedHeading');
        this.simVarPublisher.subscribe('altConstraint');
        this.simVarPublisher.subscribe('trkFpaActive');
        this.simVarPublisher.subscribe('aoa');
        this.simVarPublisher.subscribe('groundHeadingTrue');
        this.simVarPublisher.subscribe('groundTrackTrue');
        this.simVarPublisher.subscribe('selectedFpa');
        this.simVarPublisher.subscribe('targetSpeedManaged');
        this.simVarPublisher.subscribe('vfeNext');
        this.simVarPublisher.subscribe('ilsCourse');
        this.simVarPublisher.subscribe('ilsRMPTuned');
        this.simVarPublisher.subscribe('tla1');
        this.simVarPublisher.subscribe('tla2');
        this.simVarPublisher.subscribe('metricAltToggle');
        this.simVarPublisher.subscribe('landingElevation');
        this.simVarPublisher.subscribe('tcasState');
        this.simVarPublisher.subscribe('tcasCorrective');
        this.simVarPublisher.subscribe('tcasRedZoneL');
        this.simVarPublisher.subscribe('tcasRedZoneH');
        this.simVarPublisher.subscribe('tcasGreenZoneL');
        this.simVarPublisher.subscribe('tcasGreenZoneH');
        this.simVarPublisher.subscribe('tcasFail');
        this.simVarPublisher.subscribe('engOneRunning');
        this.simVarPublisher.subscribe('engTwoRunning');
        this.simVarPublisher.subscribe('expediteMode');
        this.simVarPublisher.subscribe('setHoldSpeed');
        this.simVarPublisher.subscribe('tdReached');
        this.simVarPublisher.subscribe('vls');
        this.simVarPublisher.subscribe('trkFpaDeselectedTCAS');
        this.simVarPublisher.subscribe('tcasRaInhibited');
        this.simVarPublisher.subscribe('groundSpeed');
        this.simVarPublisher.subscribe('radioAltitude1');
        this.simVarPublisher.subscribe('radioAltitude2');
        this.simVarPublisher.subscribe('crzAltMode');
        this.simVarPublisher.subscribe('tcasModeDisarmed');
        this.simVarPublisher.subscribe('flexTemp');
        this.simVarPublisher.subscribe('autoBrakeMode');
        this.simVarPublisher.subscribe('autoBrakeActive');
        this.simVarPublisher.subscribe('autoBrakeDecel');
        this.simVarPublisher.subscribe('fpaRaw');
        this.simVarPublisher.subscribe('daRaw');
        this.simVarPublisher.subscribe('latAccRaw');
        this.simVarPublisher.subscribe('ls1Button');
        this.simVarPublisher.subscribe('ls2Button');
        this.simVarPublisher.subscribe('xtk');
        this.simVarPublisher.subscribe('ldevRequestLeft');
        this.simVarPublisher.subscribe('ldevRequestRight');
        this.simVarPublisher.subscribe('landingElevation1');
        this.simVarPublisher.subscribe('landingElevation1Ssm');
        this.simVarPublisher.subscribe('landingElevation2');
        this.simVarPublisher.subscribe('landingElevation2Ssm');
        this.simVarPublisher.subscribe('fcdc1DiscreteWord1Raw');
        this.simVarPublisher.subscribe('fcdc2DiscreteWord1Raw');
        this.simVarPublisher.subscribe('fcdc1DiscreteWord2Raw');
        this.simVarPublisher.subscribe('fcdc2DiscreteWord2Raw');
        this.simVarPublisher.subscribe('fcdc1CaptPitchCommandRaw');
        this.simVarPublisher.subscribe('fcdc2CaptPitchCommandRaw');
        this.simVarPublisher.subscribe('fcdc1FoPitchCommandRaw');
        this.simVarPublisher.subscribe('fcdc2FoPitchCommandRaw');
        this.simVarPublisher.subscribe('fcdc1CaptRollCommandRaw');
        this.simVarPublisher.subscribe('fcdc2CaptRollCommandRaw');
        this.simVarPublisher.subscribe('fcdc1FoRollCommandRaw');
        this.simVarPublisher.subscribe('fcdc2FoRollCommandRaw');
        this.simVarPublisher.subscribe('fac1Healthy');
        this.simVarPublisher.subscribe('fac2Healthy');
        this.simVarPublisher.subscribe('fac1VAlphaProtRaw');
        this.simVarPublisher.subscribe('fac2VAlphaProtRaw');
        this.simVarPublisher.subscribe('fac1VAlphaMaxRaw');
        this.simVarPublisher.subscribe('fac2VAlphaMaxRaw');
        this.simVarPublisher.subscribe('fac1VStallWarnRaw');
        this.simVarPublisher.subscribe('fac2VStallWarnRaw');
        this.simVarPublisher.subscribe('fac1EstimatedBetaRaw');
        this.simVarPublisher.subscribe('fac2EstimatedBetaRaw');
        this.simVarPublisher.subscribe('fac1BetaTargetRaw');
        this.simVarPublisher.subscribe('fac2BetaTargetRaw');
        this.simVarPublisher.subscribe('fwc1AltAlertPulsing');
        this.simVarPublisher.subscribe('fwc2AltAlertPulsing');
        this.simVarPublisher.subscribe('fwc1AltAlertFlashing');
        this.simVarPublisher.subscribe('fwc2AltAlertFlashing');
        this.simVarPublisher.subscribe('linearDeviationActive');
        this.simVarPublisher.subscribe('verticalProfileLatched');
        this.simVarPublisher.subscribe('targetAltitude');
        this.simVarPublisher.subscribe('showSpeedMargins');
        this.simVarPublisher.subscribe('upperSpeedMargin');
        this.simVarPublisher.subscribe('lowerSpeedMargin');
        FSComponent.render(FSComponent.buildComponent(PFDComponent, { bus: this.bus, instrument: this }), document.getElementById('PFD_CONTENT'));
    }
    /**
   * A callback called when the instrument gets a frame update.
   */
    Update() {
        super.Update();
        if (this.gameState !== 3) {
            const gamestate = this.getGameState();
            if (gamestate === 3) {
                this.simVarPublisher.startPublish();
                this.hEventPublisher.startPublish();
                this.adirsValueProvider.start();
            }
            this.gameState = gamestate;
        }
        else {
            this.simVarPublisher.onUpdate();
            this.simplaneValueProvider.onUpdate();
            this.clock.onUpdate();
        }
    }
}
registerInstrument('a32nx-pfd', A32NX_PFD);
