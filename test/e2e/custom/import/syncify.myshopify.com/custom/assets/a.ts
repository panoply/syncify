<script>// node_modules/.pnpm/@hotwired+stimulus@3.2.1/node_modules/@hotwired/stimulus/dist/stimulus.js
var EventListener = class {
  constructor(eventTarget, eventName, eventOptions) {
    this.eventTarget = eventTarget;
    this.eventName = eventName;
    this.eventOptions = eventOptions;
    this.unorderedBindings = /* @__PURE__ */ new Set();
  }
  connect() {
    this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
  }
  disconnect() {
    this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
  }
  bindingConnected(binding) {
    this.unorderedBindings.add(binding);
  }
  bindingDisconnected(binding) {
    this.unorderedBindings.delete(binding);
  }
  handleEvent(event) {
    const extendedEvent = extendEvent(event);
    for (const binding of this.bindings) {
      if (extendedEvent.immediatePropagationStopped) {
        break;
      } else {
        binding.handleEvent(extendedEvent);
      }
    }
  }
  hasBindings() {
    return this.unorderedBindings.size > 0;
  }
  get bindings() {
    return Array.from(this.unorderedBindings).sort((left, right) => {
      const leftIndex = left.index, rightIndex = right.index;
      return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
    });
  }
};
function extendEvent(event) {
  if ("immediatePropagationStopped" in event) {
    return event;
  } else {
    const { stopImmediatePropagation } = event;
    return Object.assign(event, {
      immediatePropagationStopped: false,
      stopImmediatePropagation() {
        this.immediatePropagationStopped = true;
        stopImmediatePropagation.call(this);
      }
    });
  }
}
var Dispatcher = class {
  constructor(application) {
    this.application = application;
    this.eventListenerMaps = /* @__PURE__ */ new Map();
    this.started = false;
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.eventListeners.forEach((eventListener) => eventListener.connect());
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this.eventListeners.forEach((eventListener) => eventListener.disconnect());
    }
  }
  get eventListeners() {
    return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
  }
  bindingConnected(binding) {
    this.fetchEventListenerForBinding(binding).bindingConnected(binding);
  }
  bindingDisconnected(binding, clearEventListeners = false) {
    this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    if (clearEventListeners)
      this.clearEventListenersForBinding(binding);
  }
  handleError(error2, message, detail = {}) {
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  clearEventListenersForBinding(binding) {
    const eventListener = this.fetchEventListenerForBinding(binding);
    if (!eventListener.hasBindings()) {
      eventListener.disconnect();
      this.removeMappedEventListenerFor(binding);
    }
  }
  removeMappedEventListenerFor(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    eventListenerMap.delete(cacheKey);
    if (eventListenerMap.size == 0)
      this.eventListenerMaps.delete(eventTarget);
  }
  fetchEventListenerForBinding(binding) {
    const { eventTarget, eventName, eventOptions } = binding;
    return this.fetchEventListener(eventTarget, eventName, eventOptions);
  }
  fetchEventListener(eventTarget, eventName, eventOptions) {
    const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
    const cacheKey = this.cacheKey(eventName, eventOptions);
    let eventListener = eventListenerMap.get(cacheKey);
    if (!eventListener) {
      eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
      eventListenerMap.set(cacheKey, eventListener);
    }
    return eventListener;
  }
  createEventListener(eventTarget, eventName, eventOptions) {
    const eventListener = new EventListener(eventTarget, eventName, eventOptions);
    if (this.started) {
      eventListener.connect();
    }
    return eventListener;
  }
  fetchEventListenerMapForEventTarget(eventTarget) {
    let eventListenerMap = this.eventListenerMaps.get(eventTarget);
    if (!eventListenerMap) {
      eventListenerMap = /* @__PURE__ */ new Map();
      this.eventListenerMaps.set(eventTarget, eventListenerMap);
    }
    return eventListenerMap;
  }
  cacheKey(eventName, eventOptions) {
    const parts = [eventName];
    Object.keys(eventOptions).sort().forEach((key) => {
      parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
    });
    return parts.join(":");
  }
};
var defaultActionDescriptorFilters = {
  stop({ event, value }) {
    if (value)
      event.stopPropagation();
    return true;
  },
  prevent({ event, value }) {
    if (value)
      event.preventDefault();
    return true;
  },
  self({ event, value, element }) {
    if (value) {
      return element === event.target;
    } else {
      return true;
    }
  }
};
var descriptorPattern = /^(?:(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
function parseActionDescriptorString(descriptorString) {
  const source = descriptorString.trim();
  const matches = source.match(descriptorPattern) || [];
  let eventName = matches[1];
  let keyFilter = matches[2];
  if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
    eventName += `.${keyFilter}`;
    keyFilter = "";
  }
  return {
    eventTarget: parseEventTarget(matches[3]),
    eventName,
    eventOptions: matches[6] ? parseEventOptions(matches[6]) : {},
    identifier: matches[4],
    methodName: matches[5],
    keyFilter
  };
}
function parseEventTarget(eventTargetName) {
  if (eventTargetName == "window") {
    return window;
  } else if (eventTargetName == "document") {
    return document;
  }
}
function parseEventOptions(eventOptions) {
  return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
}
function stringifyEventTarget(eventTarget) {
  if (eventTarget == window) {
    return "window";
  } else if (eventTarget == document) {
    return "document";
  }
}
function camelize(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
}
function namespaceCamelize(value) {
  return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
}
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function dasherize(value) {
  return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
}
function tokenize(value) {
  return value.match(/[^\s]+/g) || [];
}
var Action = class {
  constructor(element, index, descriptor, schema) {
    this.element = element;
    this.index = index;
    this.eventTarget = descriptor.eventTarget || element;
    this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
    this.eventOptions = descriptor.eventOptions || {};
    this.identifier = descriptor.identifier || error("missing identifier");
    this.methodName = descriptor.methodName || error("missing method name");
    this.keyFilter = descriptor.keyFilter || "";
    this.schema = schema;
  }
  static forToken(token, schema) {
    return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
  }
  toString() {
    const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
    const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
    return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
  }
  isFilterTarget(event) {
    if (!this.keyFilter) {
      return false;
    }
    const filteres = this.keyFilter.split("+");
    const modifiers = ["meta", "ctrl", "alt", "shift"];
    const [meta, ctrl, alt, shift] = modifiers.map((modifier) => filteres.includes(modifier));
    if (event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift) {
      return true;
    }
    const standardFilter = filteres.filter((key) => !modifiers.includes(key))[0];
    if (!standardFilter) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(this.keyMappings, standardFilter)) {
      error(`contains unknown key filter: ${this.keyFilter}`);
    }
    return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
  }
  get params() {
    const params = {};
    const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
    for (const { name, value } of Array.from(this.element.attributes)) {
      const match = name.match(pattern);
      const key = match && match[1];
      if (key) {
        params[camelize(key)] = typecast(value);
      }
    }
    return params;
  }
  get eventTargetName() {
    return stringifyEventTarget(this.eventTarget);
  }
  get keyMappings() {
    return this.schema.keyMappings;
  }
};
var defaultEventNames = {
  a: () => "click",
  button: () => "click",
  form: () => "submit",
  details: () => "toggle",
  input: (e) => e.getAttribute("type") == "submit" ? "click" : "input",
  select: () => "change",
  textarea: () => "input"
};
function getDefaultEventNameForElement(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName in defaultEventNames) {
    return defaultEventNames[tagName](element);
  }
}
function error(message) {
  throw new Error(message);
}
function typecast(value) {
  try {
    return JSON.parse(value);
  } catch (o_O) {
    return value;
  }
}
var Binding = class {
  constructor(context, action) {
    this.context = context;
    this.action = action;
  }
  get index() {
    return this.action.index;
  }
  get eventTarget() {
    return this.action.eventTarget;
  }
  get eventOptions() {
    return this.action.eventOptions;
  }
  get identifier() {
    return this.context.identifier;
  }
  handleEvent(event) {
    if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(event)) {
      this.invokeWithEvent(event);
    }
  }
  get eventName() {
    return this.action.eventName;
  }
  get method() {
    const method = this.controller[this.methodName];
    if (typeof method == "function") {
      return method;
    }
    throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
  }
  applyEventModifiers(event) {
    const { element } = this.action;
    const { actionDescriptorFilters } = this.context.application;
    let passes = true;
    for (const [name, value] of Object.entries(this.eventOptions)) {
      if (name in actionDescriptorFilters) {
        const filter = actionDescriptorFilters[name];
        passes = passes && filter({ name, value, event, element });
      } else {
        continue;
      }
    }
    return passes;
  }
  invokeWithEvent(event) {
    const { target, currentTarget } = event;
    try {
      const { params } = this.action;
      const actionEvent = Object.assign(event, { params });
      this.method.call(this.controller, actionEvent);
      this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
    } catch (error2) {
      const { identifier, controller, element, index } = this;
      const detail = { identifier, controller, element, index, event };
      this.context.handleError(error2, `invoking action "${this.action}"`, detail);
    }
  }
  willBeInvokedByEvent(event) {
    const eventTarget = event.target;
    if (event instanceof KeyboardEvent && this.action.isFilterTarget(event)) {
      return false;
    }
    if (this.element === eventTarget) {
      return true;
    } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
      return this.scope.containsElement(eventTarget);
    } else {
      return this.scope.containsElement(this.action.element);
    }
  }
  get controller() {
    return this.context.controller;
  }
  get methodName() {
    return this.action.methodName;
  }
  get element() {
    return this.scope.element;
  }
  get scope() {
    return this.context.scope;
  }
};
var ElementObserver = class {
  constructor(element, delegate) {
    this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
    this.element = element;
    this.started = false;
    this.delegate = delegate;
    this.elements = /* @__PURE__ */ new Set();
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.refresh();
    }
  }
  pause(callback) {
    if (this.started) {
      this.mutationObserver.disconnect();
      this.started = false;
    }
    callback();
    if (!this.started) {
      this.mutationObserver.observe(this.element, this.mutationObserverInit);
      this.started = true;
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      const matches = new Set(this.matchElementsInTree());
      for (const element of Array.from(this.elements)) {
        if (!matches.has(element)) {
          this.removeElement(element);
        }
      }
      for (const element of Array.from(matches)) {
        this.addElement(element);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    if (mutation.type == "attributes") {
      this.processAttributeChange(mutation.target, mutation.attributeName);
    } else if (mutation.type == "childList") {
      this.processRemovedNodes(mutation.removedNodes);
      this.processAddedNodes(mutation.addedNodes);
    }
  }
  processAttributeChange(node, attributeName) {
    const element = node;
    if (this.elements.has(element)) {
      if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
        this.delegate.elementAttributeChanged(element, attributeName);
      } else {
        this.removeElement(element);
      }
    } else if (this.matchElement(element)) {
      this.addElement(element);
    }
  }
  processRemovedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element) {
        this.processTree(element, this.removeElement);
      }
    }
  }
  processAddedNodes(nodes) {
    for (const node of Array.from(nodes)) {
      const element = this.elementFromNode(node);
      if (element && this.elementIsActive(element)) {
        this.processTree(element, this.addElement);
      }
    }
  }
  matchElement(element) {
    return this.delegate.matchElement(element);
  }
  matchElementsInTree(tree = this.element) {
    return this.delegate.matchElementsInTree(tree);
  }
  processTree(tree, processor) {
    for (const element of this.matchElementsInTree(tree)) {
      processor.call(this, element);
    }
  }
  elementFromNode(node) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      return node;
    }
  }
  elementIsActive(element) {
    if (element.isConnected != this.element.isConnected) {
      return false;
    } else {
      return this.element.contains(element);
    }
  }
  addElement(element) {
    if (!this.elements.has(element)) {
      if (this.elementIsActive(element)) {
        this.elements.add(element);
        if (this.delegate.elementMatched) {
          this.delegate.elementMatched(element);
        }
      }
    }
  }
  removeElement(element) {
    if (this.elements.has(element)) {
      this.elements.delete(element);
      if (this.delegate.elementUnmatched) {
        this.delegate.elementUnmatched(element);
      }
    }
  }
};
var AttributeObserver = class {
  constructor(element, attributeName, delegate) {
    this.attributeName = attributeName;
    this.delegate = delegate;
    this.elementObserver = new ElementObserver(element, this);
  }
  get element() {
    return this.elementObserver.element;
  }
  get selector() {
    return `[${this.attributeName}]`;
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get started() {
    return this.elementObserver.started;
  }
  matchElement(element) {
    return element.hasAttribute(this.attributeName);
  }
  matchElementsInTree(tree) {
    const match = this.matchElement(tree) ? [tree] : [];
    const matches = Array.from(tree.querySelectorAll(this.selector));
    return match.concat(matches);
  }
  elementMatched(element) {
    if (this.delegate.elementMatchedAttribute) {
      this.delegate.elementMatchedAttribute(element, this.attributeName);
    }
  }
  elementUnmatched(element) {
    if (this.delegate.elementUnmatchedAttribute) {
      this.delegate.elementUnmatchedAttribute(element, this.attributeName);
    }
  }
  elementAttributeChanged(element, attributeName) {
    if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
      this.delegate.elementAttributeValueChanged(element, attributeName);
    }
  }
};
function add(map, key, value) {
  fetch(map, key).add(value);
}
function del(map, key, value) {
  fetch(map, key).delete(value);
  prune(map, key);
}
function fetch(map, key) {
  let values = map.get(key);
  if (!values) {
    values = /* @__PURE__ */ new Set();
    map.set(key, values);
  }
  return values;
}
function prune(map, key) {
  const values = map.get(key);
  if (values != null && values.size == 0) {
    map.delete(key);
  }
}
var Multimap = class {
  constructor() {
    this.valuesByKey = /* @__PURE__ */ new Map();
  }
  get keys() {
    return Array.from(this.valuesByKey.keys());
  }
  get values() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((values, set) => values.concat(Array.from(set)), []);
  }
  get size() {
    const sets = Array.from(this.valuesByKey.values());
    return sets.reduce((size, set) => size + set.size, 0);
  }
  add(key, value) {
    add(this.valuesByKey, key, value);
  }
  delete(key, value) {
    del(this.valuesByKey, key, value);
  }
  has(key, value) {
    const values = this.valuesByKey.get(key);
    return values != null && values.has(value);
  }
  hasKey(key) {
    return this.valuesByKey.has(key);
  }
  hasValue(value) {
    const sets = Array.from(this.valuesByKey.values());
    return sets.some((set) => set.has(value));
  }
  getValuesForKey(key) {
    const values = this.valuesByKey.get(key);
    return values ? Array.from(values) : [];
  }
  getKeysForValue(value) {
    return Array.from(this.valuesByKey).filter(([_key, values]) => values.has(value)).map(([key, _values]) => key);
  }
};
var SelectorObserver = class {
  constructor(element, selector, delegate, details = {}) {
    this.selector = selector;
    this.details = details;
    this.elementObserver = new ElementObserver(element, this);
    this.delegate = delegate;
    this.matchesByElement = new Multimap();
  }
  get started() {
    return this.elementObserver.started;
  }
  start() {
    this.elementObserver.start();
  }
  pause(callback) {
    this.elementObserver.pause(callback);
  }
  stop() {
    this.elementObserver.stop();
  }
  refresh() {
    this.elementObserver.refresh();
  }
  get element() {
    return this.elementObserver.element;
  }
  matchElement(element) {
    const matches = element.matches(this.selector);
    if (this.delegate.selectorMatchElement) {
      return matches && this.delegate.selectorMatchElement(element, this.details);
    }
    return matches;
  }
  matchElementsInTree(tree) {
    const match = this.matchElement(tree) ? [tree] : [];
    const matches = Array.from(tree.querySelectorAll(this.selector)).filter((match2) => this.matchElement(match2));
    return match.concat(matches);
  }
  elementMatched(element) {
    this.selectorMatched(element);
  }
  elementUnmatched(element) {
    this.selectorUnmatched(element);
  }
  elementAttributeChanged(element, _attributeName) {
    const matches = this.matchElement(element);
    const matchedBefore = this.matchesByElement.has(this.selector, element);
    if (!matches && matchedBefore) {
      this.selectorUnmatched(element);
    }
  }
  selectorMatched(element) {
    if (this.delegate.selectorMatched) {
      this.delegate.selectorMatched(element, this.selector, this.details);
      this.matchesByElement.add(this.selector, element);
    }
  }
  selectorUnmatched(element) {
    this.delegate.selectorUnmatched(element, this.selector, this.details);
    this.matchesByElement.delete(this.selector, element);
  }
};
var StringMapObserver = class {
  constructor(element, delegate) {
    this.element = element;
    this.delegate = delegate;
    this.started = false;
    this.stringMap = /* @__PURE__ */ new Map();
    this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
  }
  start() {
    if (!this.started) {
      this.started = true;
      this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
      this.refresh();
    }
  }
  stop() {
    if (this.started) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.started = false;
    }
  }
  refresh() {
    if (this.started) {
      for (const attributeName of this.knownAttributeNames) {
        this.refreshAttribute(attributeName, null);
      }
    }
  }
  processMutations(mutations) {
    if (this.started) {
      for (const mutation of mutations) {
        this.processMutation(mutation);
      }
    }
  }
  processMutation(mutation) {
    const attributeName = mutation.attributeName;
    if (attributeName) {
      this.refreshAttribute(attributeName, mutation.oldValue);
    }
  }
  refreshAttribute(attributeName, oldValue) {
    const key = this.delegate.getStringMapKeyForAttribute(attributeName);
    if (key != null) {
      if (!this.stringMap.has(attributeName)) {
        this.stringMapKeyAdded(key, attributeName);
      }
      const value = this.element.getAttribute(attributeName);
      if (this.stringMap.get(attributeName) != value) {
        this.stringMapValueChanged(value, key, oldValue);
      }
      if (value == null) {
        const oldValue2 = this.stringMap.get(attributeName);
        this.stringMap.delete(attributeName);
        if (oldValue2)
          this.stringMapKeyRemoved(key, attributeName, oldValue2);
      } else {
        this.stringMap.set(attributeName, value);
      }
    }
  }
  stringMapKeyAdded(key, attributeName) {
    if (this.delegate.stringMapKeyAdded) {
      this.delegate.stringMapKeyAdded(key, attributeName);
    }
  }
  stringMapValueChanged(value, key, oldValue) {
    if (this.delegate.stringMapValueChanged) {
      this.delegate.stringMapValueChanged(value, key, oldValue);
    }
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    if (this.delegate.stringMapKeyRemoved) {
      this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
    }
  }
  get knownAttributeNames() {
    return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
  }
  get currentAttributeNames() {
    return Array.from(this.element.attributes).map((attribute) => attribute.name);
  }
  get recordedAttributeNames() {
    return Array.from(this.stringMap.keys());
  }
};
var TokenListObserver = class {
  constructor(element, attributeName, delegate) {
    this.attributeObserver = new AttributeObserver(element, attributeName, this);
    this.delegate = delegate;
    this.tokensByElement = new Multimap();
  }
  get started() {
    return this.attributeObserver.started;
  }
  start() {
    this.attributeObserver.start();
  }
  pause(callback) {
    this.attributeObserver.pause(callback);
  }
  stop() {
    this.attributeObserver.stop();
  }
  refresh() {
    this.attributeObserver.refresh();
  }
  get element() {
    return this.attributeObserver.element;
  }
  get attributeName() {
    return this.attributeObserver.attributeName;
  }
  elementMatchedAttribute(element) {
    this.tokensMatched(this.readTokensForElement(element));
  }
  elementAttributeValueChanged(element) {
    const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
    this.tokensUnmatched(unmatchedTokens);
    this.tokensMatched(matchedTokens);
  }
  elementUnmatchedAttribute(element) {
    this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
  }
  tokensMatched(tokens) {
    tokens.forEach((token) => this.tokenMatched(token));
  }
  tokensUnmatched(tokens) {
    tokens.forEach((token) => this.tokenUnmatched(token));
  }
  tokenMatched(token) {
    this.delegate.tokenMatched(token);
    this.tokensByElement.add(token.element, token);
  }
  tokenUnmatched(token) {
    this.delegate.tokenUnmatched(token);
    this.tokensByElement.delete(token.element, token);
  }
  refreshTokensForElement(element) {
    const previousTokens = this.tokensByElement.getValuesForKey(element);
    const currentTokens = this.readTokensForElement(element);
    const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
    if (firstDifferingIndex == -1) {
      return [[], []];
    } else {
      return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
    }
  }
  readTokensForElement(element) {
    const attributeName = this.attributeName;
    const tokenString = element.getAttribute(attributeName) || "";
    return parseTokenString(tokenString, element, attributeName);
  }
};
function parseTokenString(tokenString, element, attributeName) {
  return tokenString.trim().split(/\s+/).filter((content) => content.length).map((content, index) => ({ element, attributeName, content, index }));
}
function zip(left, right) {
  const length = Math.max(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]);
}
function tokensAreEqual(left, right) {
  return left && right && left.index == right.index && left.content == right.content;
}
var ValueListObserver = class {
  constructor(element, attributeName, delegate) {
    this.tokenListObserver = new TokenListObserver(element, attributeName, this);
    this.delegate = delegate;
    this.parseResultsByToken = /* @__PURE__ */ new WeakMap();
    this.valuesByTokenByElement = /* @__PURE__ */ new WeakMap();
  }
  get started() {
    return this.tokenListObserver.started;
  }
  start() {
    this.tokenListObserver.start();
  }
  stop() {
    this.tokenListObserver.stop();
  }
  refresh() {
    this.tokenListObserver.refresh();
  }
  get element() {
    return this.tokenListObserver.element;
  }
  get attributeName() {
    return this.tokenListObserver.attributeName;
  }
  tokenMatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).set(token, value);
      this.delegate.elementMatchedValue(element, value);
    }
  }
  tokenUnmatched(token) {
    const { element } = token;
    const { value } = this.fetchParseResultForToken(token);
    if (value) {
      this.fetchValuesByTokenForElement(element).delete(token);
      this.delegate.elementUnmatchedValue(element, value);
    }
  }
  fetchParseResultForToken(token) {
    let parseResult = this.parseResultsByToken.get(token);
    if (!parseResult) {
      parseResult = this.parseToken(token);
      this.parseResultsByToken.set(token, parseResult);
    }
    return parseResult;
  }
  fetchValuesByTokenForElement(element) {
    let valuesByToken = this.valuesByTokenByElement.get(element);
    if (!valuesByToken) {
      valuesByToken = /* @__PURE__ */ new Map();
      this.valuesByTokenByElement.set(element, valuesByToken);
    }
    return valuesByToken;
  }
  parseToken(token) {
    try {
      const value = this.delegate.parseValueForToken(token);
      return { value };
    } catch (error2) {
      return { error: error2 };
    }
  }
};
var BindingObserver = class {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.bindingsByAction = /* @__PURE__ */ new Map();
  }
  start() {
    if (!this.valueListObserver) {
      this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
      this.valueListObserver.start();
    }
  }
  stop() {
    if (this.valueListObserver) {
      this.valueListObserver.stop();
      delete this.valueListObserver;
      this.disconnectAllActions();
    }
  }
  get element() {
    return this.context.element;
  }
  get identifier() {
    return this.context.identifier;
  }
  get actionAttribute() {
    return this.schema.actionAttribute;
  }
  get schema() {
    return this.context.schema;
  }
  get bindings() {
    return Array.from(this.bindingsByAction.values());
  }
  connectAction(action) {
    const binding = new Binding(this.context, action);
    this.bindingsByAction.set(action, binding);
    this.delegate.bindingConnected(binding);
  }
  disconnectAction(action) {
    const binding = this.bindingsByAction.get(action);
    if (binding) {
      this.bindingsByAction.delete(action);
      this.delegate.bindingDisconnected(binding);
    }
  }
  disconnectAllActions() {
    this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
    this.bindingsByAction.clear();
  }
  parseValueForToken(token) {
    const action = Action.forToken(token, this.schema);
    if (action.identifier == this.identifier) {
      return action;
    }
  }
  elementMatchedValue(element, action) {
    this.connectAction(action);
  }
  elementUnmatchedValue(element, action) {
    this.disconnectAction(action);
  }
};
var ValueObserver = class {
  constructor(context, receiver) {
    this.context = context;
    this.receiver = receiver;
    this.stringMapObserver = new StringMapObserver(this.element, this);
    this.valueDescriptorMap = this.controller.valueDescriptorMap;
  }
  start() {
    this.stringMapObserver.start();
    this.invokeChangedCallbacksForDefaultValues();
  }
  stop() {
    this.stringMapObserver.stop();
  }
  get element() {
    return this.context.element;
  }
  get controller() {
    return this.context.controller;
  }
  getStringMapKeyForAttribute(attributeName) {
    if (attributeName in this.valueDescriptorMap) {
      return this.valueDescriptorMap[attributeName].name;
    }
  }
  stringMapKeyAdded(key, attributeName) {
    const descriptor = this.valueDescriptorMap[attributeName];
    if (!this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
    }
  }
  stringMapValueChanged(value, name, oldValue) {
    const descriptor = this.valueDescriptorNameMap[name];
    if (value === null)
      return;
    if (oldValue === null) {
      oldValue = descriptor.writer(descriptor.defaultValue);
    }
    this.invokeChangedCallback(name, value, oldValue);
  }
  stringMapKeyRemoved(key, attributeName, oldValue) {
    const descriptor = this.valueDescriptorNameMap[key];
    if (this.hasValue(key)) {
      this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
    } else {
      this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
    }
  }
  invokeChangedCallbacksForDefaultValues() {
    for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
      if (defaultValue != void 0 && !this.controller.data.has(key)) {
        this.invokeChangedCallback(name, writer(defaultValue), void 0);
      }
    }
  }
  invokeChangedCallback(name, rawValue, rawOldValue) {
    const changedMethodName = `${name}Changed`;
    const changedMethod = this.receiver[changedMethodName];
    if (typeof changedMethod == "function") {
      const descriptor = this.valueDescriptorNameMap[name];
      try {
        const value = descriptor.reader(rawValue);
        let oldValue = rawOldValue;
        if (rawOldValue) {
          oldValue = descriptor.reader(rawOldValue);
        }
        changedMethod.call(this.receiver, value, oldValue);
      } catch (error2) {
        if (error2 instanceof TypeError) {
          error2.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error2.message}`;
        }
        throw error2;
      }
    }
  }
  get valueDescriptors() {
    const { valueDescriptorMap } = this;
    return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
  }
  get valueDescriptorNameMap() {
    const descriptors = {};
    Object.keys(this.valueDescriptorMap).forEach((key) => {
      const descriptor = this.valueDescriptorMap[key];
      descriptors[descriptor.name] = descriptor;
    });
    return descriptors;
  }
  hasValue(attributeName) {
    const descriptor = this.valueDescriptorNameMap[attributeName];
    const hasMethodName = `has${capitalize(descriptor.name)}`;
    return this.receiver[hasMethodName];
  }
};
var TargetObserver = class {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.targetsByName = new Multimap();
  }
  start() {
    if (!this.tokenListObserver) {
      this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
      this.tokenListObserver.start();
    }
  }
  stop() {
    if (this.tokenListObserver) {
      this.disconnectAllTargets();
      this.tokenListObserver.stop();
      delete this.tokenListObserver;
    }
  }
  tokenMatched({ element, content: name }) {
    if (this.scope.containsElement(element)) {
      this.connectTarget(element, name);
    }
  }
  tokenUnmatched({ element, content: name }) {
    this.disconnectTarget(element, name);
  }
  connectTarget(element, name) {
    var _a;
    if (!this.targetsByName.has(name, element)) {
      this.targetsByName.add(name, element);
      (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
    }
  }
  disconnectTarget(element, name) {
    var _a;
    if (this.targetsByName.has(name, element)) {
      this.targetsByName.delete(name, element);
      (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
    }
  }
  disconnectAllTargets() {
    for (const name of this.targetsByName.keys) {
      for (const element of this.targetsByName.getValuesForKey(name)) {
        this.disconnectTarget(element, name);
      }
    }
  }
  get attributeName() {
    return `data-${this.context.identifier}-target`;
  }
  get element() {
    return this.context.element;
  }
  get scope() {
    return this.context.scope;
  }
};
function readInheritableStaticArrayValues(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return Array.from(ancestors.reduce((values, constructor2) => {
    getOwnStaticArrayValues(constructor2, propertyName).forEach((name) => values.add(name));
    return values;
  }, /* @__PURE__ */ new Set()));
}
function readInheritableStaticObjectPairs(constructor, propertyName) {
  const ancestors = getAncestorsForConstructor(constructor);
  return ancestors.reduce((pairs, constructor2) => {
    pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
    return pairs;
  }, []);
}
function getAncestorsForConstructor(constructor) {
  const ancestors = [];
  while (constructor) {
    ancestors.push(constructor);
    constructor = Object.getPrototypeOf(constructor);
  }
  return ancestors.reverse();
}
function getOwnStaticArrayValues(constructor, propertyName) {
  const definition = constructor[propertyName];
  return Array.isArray(definition) ? definition : [];
}
function getOwnStaticObjectPairs(constructor, propertyName) {
  const definition = constructor[propertyName];
  return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
}
var OutletObserver = class {
  constructor(context, delegate) {
    this.context = context;
    this.delegate = delegate;
    this.outletsByName = new Multimap();
    this.outletElementsByName = new Multimap();
    this.selectorObserverMap = /* @__PURE__ */ new Map();
  }
  start() {
    if (this.selectorObserverMap.size === 0) {
      this.outletDefinitions.forEach((outletName) => {
        const selector = this.selector(outletName);
        const details = { outletName };
        if (selector) {
          this.selectorObserverMap.set(outletName, new SelectorObserver(document.body, selector, this, details));
        }
      });
      this.selectorObserverMap.forEach((observer) => observer.start());
    }
    this.dependentContexts.forEach((context) => context.refresh());
  }
  stop() {
    if (this.selectorObserverMap.size > 0) {
      this.disconnectAllOutlets();
      this.selectorObserverMap.forEach((observer) => observer.stop());
      this.selectorObserverMap.clear();
    }
  }
  refresh() {
    this.selectorObserverMap.forEach((observer) => observer.refresh());
  }
  selectorMatched(element, _selector, { outletName }) {
    const outlet = this.getOutlet(element, outletName);
    if (outlet) {
      this.connectOutlet(outlet, element, outletName);
    }
  }
  selectorUnmatched(element, _selector, { outletName }) {
    const outlet = this.getOutletFromMap(element, outletName);
    if (outlet) {
      this.disconnectOutlet(outlet, element, outletName);
    }
  }
  selectorMatchElement(element, { outletName }) {
    return this.hasOutlet(element, outletName) && element.matches(`[${this.context.application.schema.controllerAttribute}~=${outletName}]`);
  }
  connectOutlet(outlet, element, outletName) {
    var _a;
    if (!this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.add(outletName, outlet);
      this.outletElementsByName.add(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
    }
  }
  disconnectOutlet(outlet, element, outletName) {
    var _a;
    if (this.outletElementsByName.has(outletName, element)) {
      this.outletsByName.delete(outletName, outlet);
      this.outletElementsByName.delete(outletName, element);
      (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
    }
  }
  disconnectAllOutlets() {
    for (const outletName of this.outletElementsByName.keys) {
      for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
        for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
          this.disconnectOutlet(outlet, element, outletName);
        }
      }
    }
  }
  selector(outletName) {
    return this.scope.outlets.getSelectorForOutletName(outletName);
  }
  get outletDependencies() {
    const dependencies = new Multimap();
    this.router.modules.forEach((module) => {
      const constructor = module.definition.controllerConstructor;
      const outlets = readInheritableStaticArrayValues(constructor, "outlets");
      outlets.forEach((outlet) => dependencies.add(outlet, module.identifier));
    });
    return dependencies;
  }
  get outletDefinitions() {
    return this.outletDependencies.getKeysForValue(this.identifier);
  }
  get dependentControllerIdentifiers() {
    return this.outletDependencies.getValuesForKey(this.identifier);
  }
  get dependentContexts() {
    const identifiers = this.dependentControllerIdentifiers;
    return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
  }
  hasOutlet(element, outletName) {
    return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
  }
  getOutlet(element, outletName) {
    return this.application.getControllerForElementAndIdentifier(element, outletName);
  }
  getOutletFromMap(element, outletName) {
    return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
  }
  get scope() {
    return this.context.scope;
  }
  get identifier() {
    return this.context.identifier;
  }
  get application() {
    return this.context.application;
  }
  get router() {
    return this.application.router;
  }
};
var Context = class {
  constructor(module, scope) {
    this.logDebugActivity = (functionName, detail = {}) => {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.logDebugActivity(this.identifier, functionName, detail);
    };
    this.module = module;
    this.scope = scope;
    this.controller = new module.controllerConstructor(this);
    this.bindingObserver = new BindingObserver(this, this.dispatcher);
    this.valueObserver = new ValueObserver(this, this.controller);
    this.targetObserver = new TargetObserver(this, this);
    this.outletObserver = new OutletObserver(this, this);
    try {
      this.controller.initialize();
      this.logDebugActivity("initialize");
    } catch (error2) {
      this.handleError(error2, "initializing controller");
    }
  }
  connect() {
    this.bindingObserver.start();
    this.valueObserver.start();
    this.targetObserver.start();
    this.outletObserver.start();
    try {
      this.controller.connect();
      this.logDebugActivity("connect");
    } catch (error2) {
      this.handleError(error2, "connecting controller");
    }
  }
  refresh() {
    this.outletObserver.refresh();
  }
  disconnect() {
    try {
      this.controller.disconnect();
      this.logDebugActivity("disconnect");
    } catch (error2) {
      this.handleError(error2, "disconnecting controller");
    }
    this.outletObserver.stop();
    this.targetObserver.stop();
    this.valueObserver.stop();
    this.bindingObserver.stop();
  }
  get application() {
    return this.module.application;
  }
  get identifier() {
    return this.module.identifier;
  }
  get schema() {
    return this.application.schema;
  }
  get dispatcher() {
    return this.application.dispatcher;
  }
  get element() {
    return this.scope.element;
  }
  get parentElement() {
    return this.element.parentElement;
  }
  handleError(error2, message, detail = {}) {
    const { identifier, controller, element } = this;
    detail = Object.assign({ identifier, controller, element }, detail);
    this.application.handleError(error2, `Error ${message}`, detail);
  }
  targetConnected(element, name) {
    this.invokeControllerMethod(`${name}TargetConnected`, element);
  }
  targetDisconnected(element, name) {
    this.invokeControllerMethod(`${name}TargetDisconnected`, element);
  }
  outletConnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletConnected`, outlet, element);
  }
  outletDisconnected(outlet, element, name) {
    this.invokeControllerMethod(`${namespaceCamelize(name)}OutletDisconnected`, outlet, element);
  }
  invokeControllerMethod(methodName, ...args) {
    const controller = this.controller;
    if (typeof controller[methodName] == "function") {
      controller[methodName](...args);
    }
  }
};
function bless(constructor) {
  return shadow(constructor, getBlessedProperties(constructor));
}
function shadow(constructor, properties) {
  const shadowConstructor = extend(constructor);
  const shadowProperties = getShadowProperties(constructor.prototype, properties);
  Object.defineProperties(shadowConstructor.prototype, shadowProperties);
  return shadowConstructor;
}
function getBlessedProperties(constructor) {
  const blessings = readInheritableStaticArrayValues(constructor, "blessings");
  return blessings.reduce((blessedProperties, blessing) => {
    const properties = blessing(constructor);
    for (const key in properties) {
      const descriptor = blessedProperties[key] || {};
      blessedProperties[key] = Object.assign(descriptor, properties[key]);
    }
    return blessedProperties;
  }, {});
}
function getShadowProperties(prototype, properties) {
  return getOwnKeys(properties).reduce((shadowProperties, key) => {
    const descriptor = getShadowedDescriptor(prototype, properties, key);
    if (descriptor) {
      Object.assign(shadowProperties, { [key]: descriptor });
    }
    return shadowProperties;
  }, {});
}
function getShadowedDescriptor(prototype, properties, key) {
  const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
  const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
  if (!shadowedByValue) {
    const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
    if (shadowingDescriptor) {
      descriptor.get = shadowingDescriptor.get || descriptor.get;
      descriptor.set = shadowingDescriptor.set || descriptor.set;
    }
    return descriptor;
  }
}
var getOwnKeys = (() => {
  if (typeof Object.getOwnPropertySymbols == "function") {
    return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
  } else {
    return Object.getOwnPropertyNames;
  }
})();
var extend = (() => {
  function extendWithReflect(constructor) {
    function extended() {
      return Reflect.construct(constructor, arguments, new.target);
    }
    extended.prototype = Object.create(constructor.prototype, {
      constructor: { value: extended }
    });
    Reflect.setPrototypeOf(extended, constructor);
    return extended;
  }
  function testReflectExtension() {
    const a = function() {
      this.a.call(this);
    };
    const b = extendWithReflect(a);
    b.prototype.a = function() {
    };
    return new b();
  }
  try {
    testReflectExtension();
    return extendWithReflect;
  } catch (error2) {
    return (constructor) => class extended extends constructor {
    };
  }
})();
function blessDefinition(definition) {
  return {
    identifier: definition.identifier,
    controllerConstructor: bless(definition.controllerConstructor)
  };
}
var Module = class {
  constructor(application, definition) {
    this.application = application;
    this.definition = blessDefinition(definition);
    this.contextsByScope = /* @__PURE__ */ new WeakMap();
    this.connectedContexts = /* @__PURE__ */ new Set();
  }
  get identifier() {
    return this.definition.identifier;
  }
  get controllerConstructor() {
    return this.definition.controllerConstructor;
  }
  get contexts() {
    return Array.from(this.connectedContexts);
  }
  connectContextForScope(scope) {
    const context = this.fetchContextForScope(scope);
    this.connectedContexts.add(context);
    context.connect();
  }
  disconnectContextForScope(scope) {
    const context = this.contextsByScope.get(scope);
    if (context) {
      this.connectedContexts.delete(context);
      context.disconnect();
    }
  }
  fetchContextForScope(scope) {
    let context = this.contextsByScope.get(scope);
    if (!context) {
      context = new Context(this, scope);
      this.contextsByScope.set(scope, context);
    }
    return context;
  }
};
var ClassMap = class {
  constructor(scope) {
    this.scope = scope;
  }
  has(name) {
    return this.data.has(this.getDataKey(name));
  }
  get(name) {
    return this.getAll(name)[0];
  }
  getAll(name) {
    const tokenString = this.data.get(this.getDataKey(name)) || "";
    return tokenize(tokenString);
  }
  getAttributeName(name) {
    return this.data.getAttributeNameForKey(this.getDataKey(name));
  }
  getDataKey(name) {
    return `${name}-class`;
  }
  get data() {
    return this.scope.data;
  }
};
var DataMap = class {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.getAttribute(name);
  }
  set(key, value) {
    const name = this.getAttributeNameForKey(key);
    this.element.setAttribute(name, value);
    return this.get(key);
  }
  has(key) {
    const name = this.getAttributeNameForKey(key);
    return this.element.hasAttribute(name);
  }
  delete(key) {
    if (this.has(key)) {
      const name = this.getAttributeNameForKey(key);
      this.element.removeAttribute(name);
      return true;
    } else {
      return false;
    }
  }
  getAttributeNameForKey(key) {
    return `data-${this.identifier}-${dasherize(key)}`;
  }
};
var Guide = class {
  constructor(logger) {
    this.warnedKeysByObject = /* @__PURE__ */ new WeakMap();
    this.logger = logger;
  }
  warn(object, key, message) {
    let warnedKeys = this.warnedKeysByObject.get(object);
    if (!warnedKeys) {
      warnedKeys = /* @__PURE__ */ new Set();
      this.warnedKeysByObject.set(object, warnedKeys);
    }
    if (!warnedKeys.has(key)) {
      warnedKeys.add(key);
      this.logger.warn(message, object);
    }
  }
};
function attributeValueContainsToken(attributeName, token) {
  return `[${attributeName}~="${token}"]`;
}
var TargetSet = class {
  constructor(scope) {
    this.scope = scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(targetName) {
    return this.find(targetName) != null;
  }
  find(...targetNames) {
    return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), void 0);
  }
  findAll(...targetNames) {
    return targetNames.reduce((targets, targetName) => [
      ...targets,
      ...this.findAllTargets(targetName),
      ...this.findAllLegacyTargets(targetName)
    ], []);
  }
  findTarget(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findElement(selector);
  }
  findAllTargets(targetName) {
    const selector = this.getSelectorForTargetName(targetName);
    return this.scope.findAllElements(selector);
  }
  getSelectorForTargetName(targetName) {
    const attributeName = this.schema.targetAttributeForScope(this.identifier);
    return attributeValueContainsToken(attributeName, targetName);
  }
  findLegacyTarget(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.deprecate(this.scope.findElement(selector), targetName);
  }
  findAllLegacyTargets(targetName) {
    const selector = this.getLegacySelectorForTargetName(targetName);
    return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
  }
  getLegacySelectorForTargetName(targetName) {
    const targetDescriptor = `${this.identifier}.${targetName}`;
    return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
  }
  deprecate(element, targetName) {
    if (element) {
      const { identifier } = this;
      const attributeName = this.schema.targetAttribute;
      const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
      this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
    }
    return element;
  }
  get guide() {
    return this.scope.guide;
  }
};
var OutletSet = class {
  constructor(scope, controllerElement) {
    this.scope = scope;
    this.controllerElement = controllerElement;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get schema() {
    return this.scope.schema;
  }
  has(outletName) {
    return this.find(outletName) != null;
  }
  find(...outletNames) {
    return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), void 0);
  }
  findAll(...outletNames) {
    return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
  }
  getSelectorForOutletName(outletName) {
    const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
    return this.controllerElement.getAttribute(attributeName);
  }
  findOutlet(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    if (selector)
      return this.findElement(selector, outletName);
  }
  findAllOutlets(outletName) {
    const selector = this.getSelectorForOutletName(outletName);
    return selector ? this.findAllElements(selector, outletName) : [];
  }
  findElement(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
  }
  findAllElements(selector, outletName) {
    const elements = this.scope.queryElements(selector);
    return elements.filter((element) => this.matchesElement(element, selector, outletName));
  }
  matchesElement(element, selector, outletName) {
    const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
    return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
  }
};
var Scope = class _Scope {
  constructor(schema, element, identifier, logger) {
    this.targets = new TargetSet(this);
    this.classes = new ClassMap(this);
    this.data = new DataMap(this);
    this.containsElement = (element2) => {
      return element2.closest(this.controllerSelector) === this.element;
    };
    this.schema = schema;
    this.element = element;
    this.identifier = identifier;
    this.guide = new Guide(logger);
    this.outlets = new OutletSet(this.documentScope, element);
  }
  findElement(selector) {
    return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
  }
  findAllElements(selector) {
    return [
      ...this.element.matches(selector) ? [this.element] : [],
      ...this.queryElements(selector).filter(this.containsElement)
    ];
  }
  queryElements(selector) {
    return Array.from(this.element.querySelectorAll(selector));
  }
  get controllerSelector() {
    return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
  }
  get isDocumentScope() {
    return this.element === document.documentElement;
  }
  get documentScope() {
    return this.isDocumentScope ? this : new _Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
  }
};
var ScopeObserver = class {
  constructor(element, schema, delegate) {
    this.element = element;
    this.schema = schema;
    this.delegate = delegate;
    this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
    this.scopesByIdentifierByElement = /* @__PURE__ */ new WeakMap();
    this.scopeReferenceCounts = /* @__PURE__ */ new WeakMap();
  }
  start() {
    this.valueListObserver.start();
  }
  stop() {
    this.valueListObserver.stop();
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  parseValueForToken(token) {
    const { element, content: identifier } = token;
    const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
    let scope = scopesByIdentifier.get(identifier);
    if (!scope) {
      scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
      scopesByIdentifier.set(identifier, scope);
    }
    return scope;
  }
  elementMatchedValue(element, value) {
    const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
    this.scopeReferenceCounts.set(value, referenceCount);
    if (referenceCount == 1) {
      this.delegate.scopeConnected(value);
    }
  }
  elementUnmatchedValue(element, value) {
    const referenceCount = this.scopeReferenceCounts.get(value);
    if (referenceCount) {
      this.scopeReferenceCounts.set(value, referenceCount - 1);
      if (referenceCount == 1) {
        this.delegate.scopeDisconnected(value);
      }
    }
  }
  fetchScopesByIdentifierForElement(element) {
    let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
    if (!scopesByIdentifier) {
      scopesByIdentifier = /* @__PURE__ */ new Map();
      this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
    }
    return scopesByIdentifier;
  }
};
var Router = class {
  constructor(application) {
    this.application = application;
    this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
    this.scopesByIdentifier = new Multimap();
    this.modulesByIdentifier = /* @__PURE__ */ new Map();
  }
  get element() {
    return this.application.element;
  }
  get schema() {
    return this.application.schema;
  }
  get logger() {
    return this.application.logger;
  }
  get controllerAttribute() {
    return this.schema.controllerAttribute;
  }
  get modules() {
    return Array.from(this.modulesByIdentifier.values());
  }
  get contexts() {
    return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
  }
  start() {
    this.scopeObserver.start();
  }
  stop() {
    this.scopeObserver.stop();
  }
  loadDefinition(definition) {
    this.unloadIdentifier(definition.identifier);
    const module = new Module(this.application, definition);
    this.connectModule(module);
    const afterLoad = definition.controllerConstructor.afterLoad;
    if (afterLoad) {
      afterLoad(definition.identifier, this.application);
    }
  }
  unloadIdentifier(identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      this.disconnectModule(module);
    }
  }
  getContextForElementAndIdentifier(element, identifier) {
    const module = this.modulesByIdentifier.get(identifier);
    if (module) {
      return module.contexts.find((context) => context.element == element);
    }
  }
  handleError(error2, message, detail) {
    this.application.handleError(error2, message, detail);
  }
  createScopeForElementAndIdentifier(element, identifier) {
    return new Scope(this.schema, element, identifier, this.logger);
  }
  scopeConnected(scope) {
    this.scopesByIdentifier.add(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.connectContextForScope(scope);
    }
  }
  scopeDisconnected(scope) {
    this.scopesByIdentifier.delete(scope.identifier, scope);
    const module = this.modulesByIdentifier.get(scope.identifier);
    if (module) {
      module.disconnectContextForScope(scope);
    }
  }
  connectModule(module) {
    this.modulesByIdentifier.set(module.identifier, module);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.connectContextForScope(scope));
  }
  disconnectModule(module) {
    this.modulesByIdentifier.delete(module.identifier);
    const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
    scopes.forEach((scope) => module.disconnectContextForScope(scope));
  }
};
var defaultSchema = {
  controllerAttribute: "data-controller",
  actionAttribute: "data-action",
  targetAttribute: "data-target",
  targetAttributeForScope: (identifier) => `data-${identifier}-target`,
  outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
  keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n])))
};
function objectFromEntries(array) {
  return array.reduce((memo, [k, v]) => Object.assign(Object.assign({}, memo), { [k]: v }), {});
}
var Application = class {
  constructor(element = document.documentElement, schema = defaultSchema) {
    this.logger = console;
    this.debug = false;
    this.logDebugActivity = (identifier, functionName, detail = {}) => {
      if (this.debug) {
        this.logFormattedMessage(identifier, functionName, detail);
      }
    };
    this.element = element;
    this.schema = schema;
    this.dispatcher = new Dispatcher(this);
    this.router = new Router(this);
    this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
  }
  static start(element, schema) {
    const application = new this(element, schema);
    application.start();
    return application;
  }
  async start() {
    await domReady();
    this.logDebugActivity("application", "starting");
    this.dispatcher.start();
    this.router.start();
    this.logDebugActivity("application", "start");
  }
  stop() {
    this.logDebugActivity("application", "stopping");
    this.dispatcher.stop();
    this.router.stop();
    this.logDebugActivity("application", "stop");
  }
  register(identifier, controllerConstructor) {
    this.load({ identifier, controllerConstructor });
  }
  registerActionOption(name, filter) {
    this.actionDescriptorFilters[name] = filter;
  }
  load(head, ...rest) {
    const definitions = Array.isArray(head) ? head : [head, ...rest];
    definitions.forEach((definition) => {
      if (definition.controllerConstructor.shouldLoad) {
        this.router.loadDefinition(definition);
      }
    });
  }
  unload(head, ...rest) {
    const identifiers = Array.isArray(head) ? head : [head, ...rest];
    identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
  }
  get controllers() {
    return this.router.contexts.map((context) => context.controller);
  }
  getControllerForElementAndIdentifier(element, identifier) {
    const context = this.router.getContextForElementAndIdentifier(element, identifier);
    return context ? context.controller : null;
  }
  handleError(error2, message, detail) {
    var _a;
    this.logger.error(`%s

%o

%o`, message, error2, detail);
    (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error2);
  }
  logFormattedMessage(identifier, functionName, detail = {}) {
    detail = Object.assign({ application: this }, detail);
    this.logger.groupCollapsed(`${identifier} #${functionName}`);
    this.logger.log("details:", Object.assign({}, detail));
    this.logger.groupEnd();
  }
};
function domReady() {
  return new Promise((resolve) => {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", () => resolve());
    } else {
      resolve();
    }
  });
}
function ClassPropertiesBlessing(constructor) {
  const classes = readInheritableStaticArrayValues(constructor, "classes");
  return classes.reduce((properties, classDefinition) => {
    return Object.assign(properties, propertiesForClassDefinition(classDefinition));
  }, {});
}
function propertiesForClassDefinition(key) {
  return {
    [`${key}Class`]: {
      get() {
        const { classes } = this;
        if (classes.has(key)) {
          return classes.get(key);
        } else {
          const attribute = classes.getAttributeName(key);
          throw new Error(`Missing attribute "${attribute}"`);
        }
      }
    },
    [`${key}Classes`]: {
      get() {
        return this.classes.getAll(key);
      }
    },
    [`has${capitalize(key)}Class`]: {
      get() {
        return this.classes.has(key);
      }
    }
  };
}
function OutletPropertiesBlessing(constructor) {
  const outlets = readInheritableStaticArrayValues(constructor, "outlets");
  return outlets.reduce((properties, outletDefinition) => {
    return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
  }, {});
}
function propertiesForOutletDefinition(name) {
  const camelizedName = namespaceCamelize(name);
  return {
    [`${camelizedName}Outlet`]: {
      get() {
        const outlet = this.outlets.find(name);
        if (outlet) {
          const outletController = this.application.getControllerForElementAndIdentifier(outlet, name);
          if (outletController) {
            return outletController;
          } else {
            throw new Error(`Missing "data-controller=${name}" attribute on outlet element for "${this.identifier}" controller`);
          }
        }
        throw new Error(`Missing outlet element "${name}" for "${this.identifier}" controller`);
      }
    },
    [`${camelizedName}Outlets`]: {
      get() {
        const outlets = this.outlets.findAll(name);
        if (outlets.length > 0) {
          return outlets.map((outlet) => {
            const controller = this.application.getControllerForElementAndIdentifier(outlet, name);
            if (controller) {
              return controller;
            } else {
              console.warn(`The provided outlet element is missing the outlet controller "${name}" for "${this.identifier}"`, outlet);
            }
          }).filter((controller) => controller);
        }
        return [];
      }
    },
    [`${camelizedName}OutletElement`]: {
      get() {
        const outlet = this.outlets.find(name);
        if (outlet) {
          return outlet;
        } else {
          throw new Error(`Missing outlet element "${name}" for "${this.identifier}" controller`);
        }
      }
    },
    [`${camelizedName}OutletElements`]: {
      get() {
        return this.outlets.findAll(name);
      }
    },
    [`has${capitalize(camelizedName)}Outlet`]: {
      get() {
        return this.outlets.has(name);
      }
    }
  };
}
function TargetPropertiesBlessing(constructor) {
  const targets = readInheritableStaticArrayValues(constructor, "targets");
  return targets.reduce((properties, targetDefinition) => {
    return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
  }, {});
}
function propertiesForTargetDefinition(name) {
  return {
    [`${name}Target`]: {
      get() {
        const target = this.targets.find(name);
        if (target) {
          return target;
        } else {
          throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
        }
      }
    },
    [`${name}Targets`]: {
      get() {
        return this.targets.findAll(name);
      }
    },
    [`has${capitalize(name)}Target`]: {
      get() {
        return this.targets.has(name);
      }
    }
  };
}
function ValuePropertiesBlessing(constructor) {
  const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
  const propertyDescriptorMap = {
    valueDescriptorMap: {
      get() {
        return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
          const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, this.identifier);
          const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
          return Object.assign(result, { [attributeName]: valueDescriptor });
        }, {});
      }
    }
  };
  return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
    return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
  }, propertyDescriptorMap);
}
function propertiesForValueDefinitionPair(valueDefinitionPair, controller) {
  const definition = parseValueDefinitionPair(valueDefinitionPair, controller);
  const { key, name, reader: read, writer: write } = definition;
  return {
    [name]: {
      get() {
        const value = this.data.get(key);
        if (value !== null) {
          return read(value);
        } else {
          return definition.defaultValue;
        }
      },
      set(value) {
        if (value === void 0) {
          this.data.delete(key);
        } else {
          this.data.set(key, write(value));
        }
      }
    },
    [`has${capitalize(name)}`]: {
      get() {
        return this.data.has(key) || definition.hasCustomDefaultValue;
      }
    }
  };
}
function parseValueDefinitionPair([token, typeDefinition], controller) {
  return valueDescriptorForTokenAndTypeDefinition({
    controller,
    token,
    typeDefinition
  });
}
function parseValueTypeConstant(constant) {
  switch (constant) {
    case Array:
      return "array";
    case Boolean:
      return "boolean";
    case Number:
      return "number";
    case Object:
      return "object";
    case String:
      return "string";
  }
}
function parseValueTypeDefault(defaultValue) {
  switch (typeof defaultValue) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
  }
  if (Array.isArray(defaultValue))
    return "array";
  if (Object.prototype.toString.call(defaultValue) === "[object Object]")
    return "object";
}
function parseValueTypeObject(payload) {
  const typeFromObject = parseValueTypeConstant(payload.typeObject.type);
  if (!typeFromObject)
    return;
  const defaultValueType = parseValueTypeDefault(payload.typeObject.default);
  if (typeFromObject !== defaultValueType) {
    const propertyPath = payload.controller ? `${payload.controller}.${payload.token}` : payload.token;
    throw new Error(`The specified default value for the Stimulus Value "${propertyPath}" must match the defined type "${typeFromObject}". The provided default value of "${payload.typeObject.default}" is of type "${defaultValueType}".`);
  }
  return typeFromObject;
}
function parseValueTypeDefinition(payload) {
  const typeFromObject = parseValueTypeObject({
    controller: payload.controller,
    token: payload.token,
    typeObject: payload.typeDefinition
  });
  const typeFromDefaultValue = parseValueTypeDefault(payload.typeDefinition);
  const typeFromConstant = parseValueTypeConstant(payload.typeDefinition);
  const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
  if (type)
    return type;
  const propertyPath = payload.controller ? `${payload.controller}.${payload.typeDefinition}` : payload.token;
  throw new Error(`Unknown value type "${propertyPath}" for "${payload.token}" value`);
}
function defaultValueForDefinition(typeDefinition) {
  const constant = parseValueTypeConstant(typeDefinition);
  if (constant)
    return defaultValuesByType[constant];
  const defaultValue = typeDefinition.default;
  if (defaultValue !== void 0)
    return defaultValue;
  return typeDefinition;
}
function valueDescriptorForTokenAndTypeDefinition(payload) {
  const key = `${dasherize(payload.token)}-value`;
  const type = parseValueTypeDefinition(payload);
  return {
    type,
    key,
    name: camelize(key),
    get defaultValue() {
      return defaultValueForDefinition(payload.typeDefinition);
    },
    get hasCustomDefaultValue() {
      return parseValueTypeDefault(payload.typeDefinition) !== void 0;
    },
    reader: readers[type],
    writer: writers[type] || writers.default
  };
}
var defaultValuesByType = {
  get array() {
    return [];
  },
  boolean: false,
  number: 0,
  get object() {
    return {};
  },
  string: ""
};
var readers = {
  array(value) {
    const array = JSON.parse(value);
    if (!Array.isArray(array)) {
      throw new TypeError(`expected value of type "array" but instead got value "${value}" of type "${parseValueTypeDefault(array)}"`);
    }
    return array;
  },
  boolean(value) {
    return !(value == "0" || String(value).toLowerCase() == "false");
  },
  number(value) {
    return Number(value);
  },
  object(value) {
    const object = JSON.parse(value);
    if (object === null || typeof object != "object" || Array.isArray(object)) {
      throw new TypeError(`expected value of type "object" but instead got value "${value}" of type "${parseValueTypeDefault(object)}"`);
    }
    return object;
  },
  string(value) {
    return value;
  }
};
var writers = {
  default: writeString,
  array: writeJSON,
  object: writeJSON
};
function writeJSON(value) {
  return JSON.stringify(value);
}
function writeString(value) {
  return `${value}`;
}
var Controller = class {
  constructor(context) {
    this.context = context;
  }
  static get shouldLoad() {
    return true;
  }
  static afterLoad(_identifier, _application) {
    return;
  }
  get application() {
    return this.context.application;
  }
  get scope() {
    return this.context.scope;
  }
  get element() {
    return this.scope.element;
  }
  get identifier() {
    return this.scope.identifier;
  }
  get targets() {
    return this.scope.targets;
  }
  get outlets() {
    return this.scope.outlets;
  }
  get classes() {
    return this.scope.classes;
  }
  get data() {
    return this.scope.data;
  }
  initialize() {
  }
  connect() {
  }
  disconnect() {
  }
  dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
    const type = prefix ? `${prefix}:${eventName}` : eventName;
    const event = new CustomEvent(type, { detail, bubbles, cancelable });
    target.dispatchEvent(event);
    return event;
  }
};
Controller.blessings = [
  ClassPropertiesBlessing,
  TargetPropertiesBlessing,
  ValuePropertiesBlessing,
  OutletPropertiesBlessing
];
Controller.targets = [];
Controller.outlets = [];
Controller.values = {};

// src/scripts/globs/a.ts
var ClipboardController = class extends Controller {
  static {
    this.targets = ["source"];
  }
  copy() {
    this.dispatch("copy", {
      detail: { content: this.sourceTarget.value }
    });
    navigator.clipboard.writeText(this.sourceTarget.value);
  }
};

// src/scripts/snippet.ts
ClipboardController.targets.pop();
Application.start();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL0Bob3R3aXJlZCtzdGltdWx1c0AzLjIuMS9ub2RlX21vZHVsZXMvQGhvdHdpcmVkL3N0aW11bHVzL2Rpc3Qvc3RpbXVsdXMuanMiLCAic3JjL3NjcmlwdHMvZ2xvYnMvYS50cyIsICJzcmMvc2NyaXB0cy9zbmlwcGV0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKlxuU3RpbXVsdXMgMy4yLjFcbkNvcHlyaWdodCBcdTAwQTkgMjAyMiBCYXNlY2FtcCwgTExDXG4gKi9cbmNsYXNzIEV2ZW50TGlzdGVuZXIge1xuICAgIGNvbnN0cnVjdG9yKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucykge1xuICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0aGlzLmV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucztcbiAgICAgICAgdGhpcy51bm9yZGVyZWRCaW5kaW5ncyA9IG5ldyBTZXQoKTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLCB0aGlzLCB0aGlzLmV2ZW50T3B0aW9ucyk7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcywgdGhpcy5ldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgICBiaW5kaW5nQ29ubmVjdGVkKGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy51bm9yZGVyZWRCaW5kaW5ncy5hZGQoYmluZGluZyk7XG4gICAgfVxuICAgIGJpbmRpbmdEaXNjb25uZWN0ZWQoYmluZGluZykge1xuICAgICAgICB0aGlzLnVub3JkZXJlZEJpbmRpbmdzLmRlbGV0ZShiaW5kaW5nKTtcbiAgICB9XG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdmVudCA9IGV4dGVuZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgZm9yIChjb25zdCBiaW5kaW5nIG9mIHRoaXMuYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChleHRlbmRlZEV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYmluZGluZy5oYW5kbGVFdmVudChleHRlbmRlZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXNCaW5kaW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5vcmRlcmVkQmluZGluZ3Muc2l6ZSA+IDA7XG4gICAgfVxuICAgIGdldCBiaW5kaW5ncygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy51bm9yZGVyZWRCaW5kaW5ncykuc29ydCgobGVmdCwgcmlnaHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRJbmRleCA9IGxlZnQuaW5kZXgsIHJpZ2h0SW5kZXggPSByaWdodC5pbmRleDtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0SW5kZXggPCByaWdodEluZGV4ID8gLTEgOiBsZWZ0SW5kZXggPiByaWdodEluZGV4ID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGV4dGVuZEV2ZW50KGV2ZW50KSB7XG4gICAgaWYgKFwiaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIgaW4gZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgeyBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gfSA9IGV2ZW50O1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihldmVudCwge1xuICAgICAgICAgICAgaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvbjtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyTWFwcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRMaXN0ZW5lcikgPT4gZXZlbnRMaXN0ZW5lci5jb25uZWN0KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5mb3JFYWNoKChldmVudExpc3RlbmVyKSA9PiBldmVudExpc3RlbmVyLmRpc2Nvbm5lY3QoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLnZhbHVlcygpKS5yZWR1Y2UoKGxpc3RlbmVycywgbWFwKSA9PiBsaXN0ZW5lcnMuY29uY2F0KEFycmF5LmZyb20obWFwLnZhbHVlcygpKSksIFtdKTtcbiAgICB9XG4gICAgYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyRm9yQmluZGluZyhiaW5kaW5nKS5iaW5kaW5nQ29ubmVjdGVkKGJpbmRpbmcpO1xuICAgIH1cbiAgICBiaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcsIGNsZWFyRXZlbnRMaXN0ZW5lcnMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lckZvckJpbmRpbmcoYmluZGluZykuYmluZGluZ0Rpc2Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICAgICAgaWYgKGNsZWFyRXZlbnRMaXN0ZW5lcnMpXG4gICAgICAgICAgICB0aGlzLmNsZWFyRXZlbnRMaXN0ZW5lcnNGb3JCaW5kaW5nKGJpbmRpbmcpO1xuICAgIH1cbiAgICBoYW5kbGVFcnJvcihlcnJvciwgbWVzc2FnZSwgZGV0YWlsID0ge30pIHtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5oYW5kbGVFcnJvcihlcnJvciwgYEVycm9yICR7bWVzc2FnZX1gLCBkZXRhaWwpO1xuICAgIH1cbiAgICBjbGVhckV2ZW50TGlzdGVuZXJzRm9yQmluZGluZyhiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lckZvckJpbmRpbmcoYmluZGluZyk7XG4gICAgICAgIGlmICghZXZlbnRMaXN0ZW5lci5oYXNCaW5kaW5ncygpKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFwcGVkRXZlbnRMaXN0ZW5lckZvcihiaW5kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVNYXBwZWRFdmVudExpc3RlbmVyRm9yKGJpbmRpbmcpIHtcbiAgICAgICAgY29uc3QgeyBldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMgfSA9IGJpbmRpbmc7XG4gICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJNYXAgPSB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lck1hcEZvckV2ZW50VGFyZ2V0KGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmNhY2hlS2V5KGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgZXZlbnRMaXN0ZW5lck1hcC5kZWxldGUoY2FjaGVLZXkpO1xuICAgICAgICBpZiAoZXZlbnRMaXN0ZW5lck1hcC5zaXplID09IDApXG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLmRlbGV0ZShldmVudFRhcmdldCk7XG4gICAgfVxuICAgIGZldGNoRXZlbnRMaXN0ZW5lckZvckJpbmRpbmcoYmluZGluZykge1xuICAgICAgICBjb25zdCB7IGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyB9ID0gYmluZGluZztcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyk7XG4gICAgfVxuICAgIGZldGNoRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXZlbnRMaXN0ZW5lck1hcCA9IHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyTWFwRm9yRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuY2FjaGVLZXkoZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgICAgICBsZXQgZXZlbnRMaXN0ZW5lciA9IGV2ZW50TGlzdGVuZXJNYXAuZ2V0KGNhY2hlS2V5KTtcbiAgICAgICAgaWYgKCFldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyID0gdGhpcy5jcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyTWFwLnNldChjYWNoZUtleSwgZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG4gICAgfVxuICAgIGNyZWF0ZUV2ZW50TGlzdGVuZXIoZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSBuZXcgRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbiAgICB9XG4gICAgZmV0Y2hFdmVudExpc3RlbmVyTWFwRm9yRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgbGV0IGV2ZW50TGlzdGVuZXJNYXAgPSB0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLmdldChldmVudFRhcmdldCk7XG4gICAgICAgIGlmICghZXZlbnRMaXN0ZW5lck1hcCkge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lck1hcHMuc2V0KGV2ZW50VGFyZ2V0LCBldmVudExpc3RlbmVyTWFwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnRMaXN0ZW5lck1hcDtcbiAgICB9XG4gICAgY2FjaGVLZXkoZXZlbnROYW1lLCBldmVudE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBbZXZlbnROYW1lXTtcbiAgICAgICAgT2JqZWN0LmtleXMoZXZlbnRPcHRpb25zKVxuICAgICAgICAgICAgLnNvcnQoKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgcGFydHMucHVzaChgJHtldmVudE9wdGlvbnNba2V5XSA/IFwiXCIgOiBcIiFcIn0ke2tleX1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiOlwiKTtcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRBY3Rpb25EZXNjcmlwdG9yRmlsdGVycyA9IHtcbiAgICBzdG9wKHsgZXZlbnQsIHZhbHVlIH0pIHtcbiAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgcHJldmVudCh7IGV2ZW50LCB2YWx1ZSB9KSB7XG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgc2VsZih7IGV2ZW50LCB2YWx1ZSwgZWxlbWVudCB9KSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IGV2ZW50LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5jb25zdCBkZXNjcmlwdG9yUGF0dGVybiA9IC9eKD86KC4rPykoPzpcXC4oLis/KSk/KD86QCh3aW5kb3d8ZG9jdW1lbnQpKT8tPik/KC4rPykoPzojKFteOl0rPykpKD86OiguKykpPyQvO1xuZnVuY3Rpb24gcGFyc2VBY3Rpb25EZXNjcmlwdG9yU3RyaW5nKGRlc2NyaXB0b3JTdHJpbmcpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBkZXNjcmlwdG9yU3RyaW5nLnRyaW0oKTtcbiAgICBjb25zdCBtYXRjaGVzID0gc291cmNlLm1hdGNoKGRlc2NyaXB0b3JQYXR0ZXJuKSB8fCBbXTtcbiAgICBsZXQgZXZlbnROYW1lID0gbWF0Y2hlc1sxXTtcbiAgICBsZXQga2V5RmlsdGVyID0gbWF0Y2hlc1syXTtcbiAgICBpZiAoa2V5RmlsdGVyICYmICFbXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJrZXlwcmVzc1wiXS5pbmNsdWRlcyhldmVudE5hbWUpKSB7XG4gICAgICAgIGV2ZW50TmFtZSArPSBgLiR7a2V5RmlsdGVyfWA7XG4gICAgICAgIGtleUZpbHRlciA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGV2ZW50VGFyZ2V0OiBwYXJzZUV2ZW50VGFyZ2V0KG1hdGNoZXNbM10pLFxuICAgICAgICBldmVudE5hbWUsXG4gICAgICAgIGV2ZW50T3B0aW9uczogbWF0Y2hlc1s2XSA/IHBhcnNlRXZlbnRPcHRpb25zKG1hdGNoZXNbNl0pIDoge30sXG4gICAgICAgIGlkZW50aWZpZXI6IG1hdGNoZXNbNF0sXG4gICAgICAgIG1ldGhvZE5hbWU6IG1hdGNoZXNbNV0sXG4gICAgICAgIGtleUZpbHRlcixcbiAgICB9O1xufVxuZnVuY3Rpb24gcGFyc2VFdmVudFRhcmdldChldmVudFRhcmdldE5hbWUpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXROYW1lID09IFwid2luZG93XCIpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnRUYXJnZXROYW1lID09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyc2VFdmVudE9wdGlvbnMoZXZlbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIGV2ZW50T3B0aW9uc1xuICAgICAgICAuc3BsaXQoXCI6XCIpXG4gICAgICAgIC5yZWR1Y2UoKG9wdGlvbnMsIHRva2VuKSA9PiBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHsgW3Rva2VuLnJlcGxhY2UoL14hLywgXCJcIildOiAhL14hLy50ZXN0KHRva2VuKSB9KSwge30pO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5RXZlbnRUYXJnZXQoZXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQgPT0gd2luZG93KSB7XG4gICAgICAgIHJldHVybiBcIndpbmRvd1wiO1xuICAgIH1cbiAgICBlbHNlIGlmIChldmVudFRhcmdldCA9PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gXCJkb2N1bWVudFwiO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FtZWxpemUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKD86W18tXSkoW2EtejAtOV0pL2csIChfLCBjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xufVxuZnVuY3Rpb24gbmFtZXNwYWNlQ2FtZWxpemUodmFsdWUpIHtcbiAgICByZXR1cm4gY2FtZWxpemUodmFsdWUucmVwbGFjZSgvLS0vZywgXCItXCIpLnJlcGxhY2UoL19fL2csIFwiX1wiKSk7XG59XG5mdW5jdGlvbiBjYXBpdGFsaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59XG5mdW5jdGlvbiBkYXNoZXJpemUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFtBLVpdKS9nLCAoXywgY2hhcikgPT4gYC0ke2NoYXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cbmZ1bmN0aW9uIHRva2VuaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hdGNoKC9bXlxcc10rL2cpIHx8IFtdO1xufVxuXG5jbGFzcyBBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGluZGV4LCBkZXNjcmlwdG9yLCBzY2hlbWEpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0ID0gZGVzY3JpcHRvci5ldmVudFRhcmdldCB8fCBlbGVtZW50O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGRlc2NyaXB0b3IuZXZlbnROYW1lIHx8IGdldERlZmF1bHRFdmVudE5hbWVGb3JFbGVtZW50KGVsZW1lbnQpIHx8IGVycm9yKFwibWlzc2luZyBldmVudCBuYW1lXCIpO1xuICAgICAgICB0aGlzLmV2ZW50T3B0aW9ucyA9IGRlc2NyaXB0b3IuZXZlbnRPcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLmlkZW50aWZpZXIgPSBkZXNjcmlwdG9yLmlkZW50aWZpZXIgfHwgZXJyb3IoXCJtaXNzaW5nIGlkZW50aWZpZXJcIik7XG4gICAgICAgIHRoaXMubWV0aG9kTmFtZSA9IGRlc2NyaXB0b3IubWV0aG9kTmFtZSB8fCBlcnJvcihcIm1pc3NpbmcgbWV0aG9kIG5hbWVcIik7XG4gICAgICAgIHRoaXMua2V5RmlsdGVyID0gZGVzY3JpcHRvci5rZXlGaWx0ZXIgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuICAgIHN0YXRpYyBmb3JUb2tlbih0b2tlbiwgc2NoZW1hKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh0b2tlbi5lbGVtZW50LCB0b2tlbi5pbmRleCwgcGFyc2VBY3Rpb25EZXNjcmlwdG9yU3RyaW5nKHRva2VuLmNvbnRlbnQpLCBzY2hlbWEpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgZXZlbnRGaWx0ZXIgPSB0aGlzLmtleUZpbHRlciA/IGAuJHt0aGlzLmtleUZpbHRlcn1gIDogXCJcIjtcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0TmFtZSA/IGBAJHt0aGlzLmV2ZW50VGFyZ2V0TmFtZX1gIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZXZlbnROYW1lfSR7ZXZlbnRGaWx0ZXJ9JHtldmVudFRhcmdldH0tPiR7dGhpcy5pZGVudGlmaWVyfSMke3RoaXMubWV0aG9kTmFtZX1gO1xuICAgIH1cbiAgICBpc0ZpbHRlclRhcmdldChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMua2V5RmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZXMgPSB0aGlzLmtleUZpbHRlci5zcGxpdChcIitcIik7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVycyA9IFtcIm1ldGFcIiwgXCJjdHJsXCIsIFwiYWx0XCIsIFwic2hpZnRcIl07XG4gICAgICAgIGNvbnN0IFttZXRhLCBjdHJsLCBhbHQsIHNoaWZ0XSA9IG1vZGlmaWVycy5tYXAoKG1vZGlmaWVyKSA9PiBmaWx0ZXJlcy5pbmNsdWRlcyhtb2RpZmllcikpO1xuICAgICAgICBpZiAoZXZlbnQubWV0YUtleSAhPT0gbWV0YSB8fCBldmVudC5jdHJsS2V5ICE9PSBjdHJsIHx8IGV2ZW50LmFsdEtleSAhPT0gYWx0IHx8IGV2ZW50LnNoaWZ0S2V5ICE9PSBzaGlmdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhbmRhcmRGaWx0ZXIgPSBmaWx0ZXJlcy5maWx0ZXIoKGtleSkgPT4gIW1vZGlmaWVycy5pbmNsdWRlcyhrZXkpKVswXTtcbiAgICAgICAgaWYgKCFzdGFuZGFyZEZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMua2V5TWFwcGluZ3MsIHN0YW5kYXJkRmlsdGVyKSkge1xuICAgICAgICAgICAgZXJyb3IoYGNvbnRhaW5zIHVua25vd24ga2V5IGZpbHRlcjogJHt0aGlzLmtleUZpbHRlcn1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5rZXlNYXBwaW5nc1tzdGFuZGFyZEZpbHRlcl0udG9Mb3dlckNhc2UoKSAhPT0gZXZlbnQua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGdldCBwYXJhbXMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cChgXmRhdGEtJHt0aGlzLmlkZW50aWZpZXJ9LSguKyktcGFyYW0kYCwgXCJpXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IHsgbmFtZSwgdmFsdWUgfSBvZiBBcnJheS5mcm9tKHRoaXMuZWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKHBhdHRlcm4pO1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2NhbWVsaXplKGtleSldID0gdHlwZWNhc3QodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIGdldCBldmVudFRhcmdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlFdmVudFRhcmdldCh0aGlzLmV2ZW50VGFyZ2V0KTtcbiAgICB9XG4gICAgZ2V0IGtleU1hcHBpbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2hlbWEua2V5TWFwcGluZ3M7XG4gICAgfVxufVxuY29uc3QgZGVmYXVsdEV2ZW50TmFtZXMgPSB7XG4gICAgYTogKCkgPT4gXCJjbGlja1wiLFxuICAgIGJ1dHRvbjogKCkgPT4gXCJjbGlja1wiLFxuICAgIGZvcm06ICgpID0+IFwic3VibWl0XCIsXG4gICAgZGV0YWlsczogKCkgPT4gXCJ0b2dnbGVcIixcbiAgICBpbnB1dDogKGUpID0+IChlLmdldEF0dHJpYnV0ZShcInR5cGVcIikgPT0gXCJzdWJtaXRcIiA/IFwiY2xpY2tcIiA6IFwiaW5wdXRcIiksXG4gICAgc2VsZWN0OiAoKSA9PiBcImNoYW5nZVwiLFxuICAgIHRleHRhcmVhOiAoKSA9PiBcImlucHV0XCIsXG59O1xuZnVuY3Rpb24gZ2V0RGVmYXVsdEV2ZW50TmFtZUZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGFnTmFtZSBpbiBkZWZhdWx0RXZlbnROYW1lcykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdEV2ZW50TmFtZXNbdGFnTmFtZV0oZWxlbWVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cbmZ1bmN0aW9uIHR5cGVjYXN0KHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAob19PKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmNsYXNzIEJpbmRpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGFjdGlvbikge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uaW5kZXg7XG4gICAgfVxuICAgIGdldCBldmVudFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmV2ZW50VGFyZ2V0O1xuICAgIH1cbiAgICBnZXQgZXZlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uZXZlbnRPcHRpb25zO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBpZiAodGhpcy53aWxsQmVJbnZva2VkQnlFdmVudChldmVudCkgJiYgdGhpcy5hcHBseUV2ZW50TW9kaWZpZXJzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5pbnZva2VXaXRoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBldmVudE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbi5ldmVudE5hbWU7XG4gICAgfVxuICAgIGdldCBtZXRob2QoKSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMuY29udHJvbGxlclt0aGlzLm1ldGhvZE5hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBY3Rpb24gXCIke3RoaXMuYWN0aW9ufVwiIHJlZmVyZW5jZXMgdW5kZWZpbmVkIG1ldGhvZCBcIiR7dGhpcy5tZXRob2ROYW1lfVwiYCk7XG4gICAgfVxuICAgIGFwcGx5RXZlbnRNb2RpZmllcnMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBlbGVtZW50IH0gPSB0aGlzLmFjdGlvbjtcbiAgICAgICAgY29uc3QgeyBhY3Rpb25EZXNjcmlwdG9yRmlsdGVycyB9ID0gdGhpcy5jb250ZXh0LmFwcGxpY2F0aW9uO1xuICAgICAgICBsZXQgcGFzc2VzID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZXZlbnRPcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgaW4gYWN0aW9uRGVzY3JpcHRvckZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBhY3Rpb25EZXNjcmlwdG9yRmlsdGVyc1tuYW1lXTtcbiAgICAgICAgICAgICAgICBwYXNzZXMgPSBwYXNzZXMgJiYgZmlsdGVyKHsgbmFtZSwgdmFsdWUsIGV2ZW50LCBlbGVtZW50IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhc3NlcztcbiAgICB9XG4gICAgaW52b2tlV2l0aEV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgdGFyZ2V0LCBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgcGFyYW1zIH0gPSB0aGlzLmFjdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbkV2ZW50ID0gT2JqZWN0LmFzc2lnbihldmVudCwgeyBwYXJhbXMgfSk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZC5jYWxsKHRoaXMuY29udHJvbGxlciwgYWN0aW9uRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxvZ0RlYnVnQWN0aXZpdHkodGhpcy5tZXRob2ROYW1lLCB7IGV2ZW50LCB0YXJnZXQsIGN1cnJlbnRUYXJnZXQsIGFjdGlvbjogdGhpcy5tZXRob2ROYW1lIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50LCBpbmRleCB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbCA9IHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCwgaW5kZXgsIGV2ZW50IH07XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuaGFuZGxlRXJyb3IoZXJyb3IsIGBpbnZva2luZyBhY3Rpb24gXCIke3RoaXMuYWN0aW9ufVwiYCwgZGV0YWlsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aWxsQmVJbnZva2VkQnlFdmVudChldmVudCkge1xuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCAmJiB0aGlzLmFjdGlvbi5pc0ZpbHRlclRhcmdldChldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSBldmVudFRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnRUYXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ICYmIHRoaXMuZWxlbWVudC5jb250YWlucyhldmVudFRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmNvbnRhaW5zRWxlbWVudChldmVudFRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5jb250YWluc0VsZW1lbnQodGhpcy5hY3Rpb24uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gICAgZ2V0IG1ldGhvZE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbi5tZXRob2ROYW1lO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjb3BlO1xuICAgIH1cbn1cblxuY2xhc3MgRWxlbWVudE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0ID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4gdGhpcy5wcm9jZXNzTXV0YXRpb25zKG11dGF0aW9ucykpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQsIHRoaXMubXV0YXRpb25PYnNlcnZlckluaXQpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGF1c2UoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQsIHRoaXMubXV0YXRpb25PYnNlcnZlckluaXQpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gbmV3IFNldCh0aGlzLm1hdGNoRWxlbWVudHNJblRyZWUoKSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcy5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBBcnJheS5mcm9tKG1hdGNoZXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NNdXRhdGlvbnMobXV0YXRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTXV0YXRpb24obXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NNdXRhdGlvbihtdXRhdGlvbikge1xuICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQXR0cmlidXRlQ2hhbmdlKG11dGF0aW9uLnRhcmdldCwgbXV0YXRpb24uYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobXV0YXRpb24udHlwZSA9PSBcImNoaWxkTGlzdFwiKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NSZW1vdmVkTm9kZXMobXV0YXRpb24ucmVtb3ZlZE5vZGVzKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0FkZGVkTm9kZXMobXV0YXRpb24uYWRkZWROb2Rlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc0F0dHJpYnV0ZUNoYW5nZShub2RlLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBub2RlO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmVsZW1lbnRBdHRyaWJ1dGVDaGFuZ2VkICYmIHRoaXMubWF0Y2hFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXR0cmlidXRlQ2hhbmdlZChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm1hdGNoRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5hZGRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NSZW1vdmVkTm9kZXMobm9kZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIEFycmF5LmZyb20obm9kZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50RnJvbU5vZGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RyZWUoZWxlbWVudCwgdGhpcy5yZW1vdmVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzQWRkZWROb2Rlcyhub2Rlcykge1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgQXJyYXkuZnJvbShub2RlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRGcm9tTm9kZShub2RlKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICYmIHRoaXMuZWxlbWVudElzQWN0aXZlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzVHJlZShlbGVtZW50LCB0aGlzLmFkZEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1hdGNoRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm1hdGNoRWxlbWVudChlbGVtZW50KTtcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50c0luVHJlZSh0cmVlID0gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm1hdGNoRWxlbWVudHNJblRyZWUodHJlZSk7XG4gICAgfVxuICAgIHByb2Nlc3NUcmVlKHRyZWUsIHByb2Nlc3Nvcikge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5tYXRjaEVsZW1lbnRzSW5UcmVlKHRyZWUpKSB7XG4gICAgICAgICAgICBwcm9jZXNzb3IuY2FsbCh0aGlzLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50RnJvbU5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudElzQWN0aXZlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb25uZWN0ZWQgIT0gdGhpcy5lbGVtZW50LmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNvbnRhaW5zKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50SXNBY3RpdmUoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmFkZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRNYXRjaGVkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmVsZW1lbnRVbm1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRVbm1hdGNoZWQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEF0dHJpYnV0ZU9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGVOYW1lO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyID0gbmV3IEVsZW1lbnRPYnNlcnZlcihlbGVtZW50LCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRPYnNlcnZlci5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgc2VsZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfV1gO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcGF1c2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIucGF1c2UoY2FsbGJhY2spO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnJlZnJlc2goKTtcbiAgICB9XG4gICAgZ2V0IHN0YXJ0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRPYnNlcnZlci5zdGFydGVkO1xuICAgIH1cbiAgICBtYXRjaEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lKTtcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50c0luVHJlZSh0cmVlKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5tYXRjaEVsZW1lbnQodHJlZSkgPyBbdHJlZV0gOiBbXTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IEFycmF5LmZyb20odHJlZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoLmNvbmNhdChtYXRjaGVzKTtcbiAgICB9XG4gICAgZWxlbWVudE1hdGNoZWQoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRVbm1hdGNoZWQoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkQXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRVbm1hdGNoZWRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50QXR0cmlidXRlQ2hhbmdlZChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmVsZW1lbnRBdHRyaWJ1dGVWYWx1ZUNoYW5nZWQgJiYgdGhpcy5hdHRyaWJ1dGVOYW1lID09IGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudEF0dHJpYnV0ZVZhbHVlQ2hhbmdlZChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkKG1hcCwga2V5LCB2YWx1ZSkge1xuICAgIGZldGNoKG1hcCwga2V5KS5hZGQodmFsdWUpO1xufVxuZnVuY3Rpb24gZGVsKG1hcCwga2V5LCB2YWx1ZSkge1xuICAgIGZldGNoKG1hcCwga2V5KS5kZWxldGUodmFsdWUpO1xuICAgIHBydW5lKG1hcCwga2V5KTtcbn1cbmZ1bmN0aW9uIGZldGNoKG1hcCwga2V5KSB7XG4gICAgbGV0IHZhbHVlcyA9IG1hcC5nZXQoa2V5KTtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgICB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xufVxuZnVuY3Rpb24gcHJ1bmUobWFwLCBrZXkpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBtYXAuZ2V0KGtleSk7XG4gICAgaWYgKHZhbHVlcyAhPSBudWxsICYmIHZhbHVlcy5zaXplID09IDApIHtcbiAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cbn1cblxuY2xhc3MgTXVsdGltYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZhbHVlc0J5S2V5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleS5rZXlzKCkpO1xuICAgIH1cbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgICBjb25zdCBzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5LnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIHNldHMucmVkdWNlKCh2YWx1ZXMsIHNldCkgPT4gdmFsdWVzLmNvbmNhdChBcnJheS5mcm9tKHNldCkpLCBbXSk7XG4gICAgfVxuICAgIGdldCBzaXplKCkge1xuICAgICAgICBjb25zdCBzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5LnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIHNldHMucmVkdWNlKChzaXplLCBzZXQpID0+IHNpemUgKyBzZXQuc2l6ZSwgMCk7XG4gICAgfVxuICAgIGFkZChrZXksIHZhbHVlKSB7XG4gICAgICAgIGFkZCh0aGlzLnZhbHVlc0J5S2V5LCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgZGVsKHRoaXMudmFsdWVzQnlLZXksIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBoYXMoa2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZhbHVlc0J5S2V5LmdldChrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzICE9IG51bGwgJiYgdmFsdWVzLmhhcyh2YWx1ZSk7XG4gICAgfVxuICAgIGhhc0tleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzQnlLZXkuaGFzKGtleSk7XG4gICAgfVxuICAgIGhhc1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNldHMgPSBBcnJheS5mcm9tKHRoaXMudmFsdWVzQnlLZXkudmFsdWVzKCkpO1xuICAgICAgICByZXR1cm4gc2V0cy5zb21lKChzZXQpID0+IHNldC5oYXModmFsdWUpKTtcbiAgICB9XG4gICAgZ2V0VmFsdWVzRm9yS2V5KGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZhbHVlc0J5S2V5LmdldChrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzID8gQXJyYXkuZnJvbSh2YWx1ZXMpIDogW107XG4gICAgfVxuICAgIGdldEtleXNGb3JWYWx1ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5KVxuICAgICAgICAgICAgLmZpbHRlcigoW19rZXksIHZhbHVlc10pID0+IHZhbHVlcy5oYXModmFsdWUpKVxuICAgICAgICAgICAgLm1hcCgoW2tleSwgX3ZhbHVlc10pID0+IGtleSk7XG4gICAgfVxufVxuXG5jbGFzcyBJbmRleGVkTXVsdGltYXAgZXh0ZW5kcyBNdWx0aW1hcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMua2V5c0J5VmFsdWUgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMua2V5c0J5VmFsdWUua2V5cygpKTtcbiAgICB9XG4gICAgYWRkKGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3VwZXIuYWRkKGtleSwgdmFsdWUpO1xuICAgICAgICBhZGQodGhpcy5rZXlzQnlWYWx1ZSwgdmFsdWUsIGtleSk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLmRlbGV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgZGVsKHRoaXMua2V5c0J5VmFsdWUsIHZhbHVlLCBrZXkpO1xuICAgIH1cbiAgICBoYXNWYWx1ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzQnlWYWx1ZS5oYXModmFsdWUpO1xuICAgIH1cbiAgICBnZXRLZXlzRm9yVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc2V0ID0gdGhpcy5rZXlzQnlWYWx1ZS5nZXQodmFsdWUpO1xuICAgICAgICByZXR1cm4gc2V0ID8gQXJyYXkuZnJvbShzZXQpIDogW107XG4gICAgfVxufVxuXG5jbGFzcyBTZWxlY3Rvck9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzZWxlY3RvciwgZGVsZWdhdGUsIGRldGFpbHMgPSB7fSkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyID0gbmV3IEVsZW1lbnRPYnNlcnZlcihlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLm1hdGNoZXNCeUVsZW1lbnQgPSBuZXcgTXVsdGltYXAoKTtcbiAgICB9XG4gICAgZ2V0IHN0YXJ0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRPYnNlcnZlci5zdGFydGVkO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcGF1c2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIucGF1c2UoY2FsbGJhY2spO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnJlZnJlc2goKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRPYnNlcnZlci5lbGVtZW50O1xuICAgIH1cbiAgICBtYXRjaEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gZWxlbWVudC5tYXRjaGVzKHRoaXMuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5zZWxlY3Rvck1hdGNoRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMgJiYgdGhpcy5kZWxlZ2F0ZS5zZWxlY3Rvck1hdGNoRWxlbWVudChlbGVtZW50LCB0aGlzLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cbiAgICBtYXRjaEVsZW1lbnRzSW5UcmVlKHRyZWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLm1hdGNoRWxlbWVudCh0cmVlKSA/IFt0cmVlXSA6IFtdO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gQXJyYXkuZnJvbSh0cmVlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3RvcikpLmZpbHRlcigobWF0Y2gpID0+IHRoaXMubWF0Y2hFbGVtZW50KG1hdGNoKSk7XG4gICAgICAgIHJldHVybiBtYXRjaC5jb25jYXQobWF0Y2hlcyk7XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvck1hdGNoZWQoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsZW1lbnRVbm1hdGNoZWQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yVW5tYXRjaGVkKGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbGVtZW50QXR0cmlidXRlQ2hhbmdlZChlbGVtZW50LCBfYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5tYXRjaEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRCZWZvcmUgPSB0aGlzLm1hdGNoZXNCeUVsZW1lbnQuaGFzKHRoaXMuc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgICBpZiAoIW1hdGNoZXMgJiYgbWF0Y2hlZEJlZm9yZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvclVubWF0Y2hlZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3Rvck1hdGNoZWQoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5zZWxlY3Rvck1hdGNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc2VsZWN0b3JNYXRjaGVkKGVsZW1lbnQsIHRoaXMuc2VsZWN0b3IsIHRoaXMuZGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZXNCeUVsZW1lbnQuYWRkKHRoaXMuc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdG9yVW5tYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zZWxlY3RvclVubWF0Y2hlZChlbGVtZW50LCB0aGlzLnNlbGVjdG9yLCB0aGlzLmRldGFpbHMpO1xuICAgICAgICB0aGlzLm1hdGNoZXNCeUVsZW1lbnQuZGVsZXRlKHRoaXMuc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgIH1cbn1cblxuY2xhc3MgU3RyaW5nTWFwT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RyaW5nTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB0aGlzLnByb2Nlc3NNdXRhdGlvbnMobXV0YXRpb25zKSk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci50YWtlUmVjb3JkcygpO1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0cmlidXRlTmFtZSBvZiB0aGlzLmtub3duQXR0cmlidXRlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc011dGF0aW9ucyhtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc011dGF0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lO1xuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG11dGF0aW9uLm9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZGVsZWdhdGUuZ2V0U3RyaW5nTWFwS2V5Rm9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdHJpbmdNYXAuaGFzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXBLZXlBZGRlZChrZXksIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RyaW5nTWFwLmdldChhdHRyaWJ1dGVOYW1lKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKHZhbHVlLCBrZXksIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnN0cmluZ01hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXAuZGVsZXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXBLZXlSZW1vdmVkKGtleSwgYXR0cmlidXRlTmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmdNYXBLZXlBZGRlZChrZXksIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5QWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5QWRkZWQoa2V5LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmdNYXBWYWx1ZUNoYW5nZWQodmFsdWUsIGtleSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnN0cmluZ01hcFZhbHVlQ2hhbmdlZCh2YWx1ZSwga2V5LCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLnN0cmluZ01hcEtleVJlbW92ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQga25vd25BdHRyaWJ1dGVOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh0aGlzLmN1cnJlbnRBdHRyaWJ1dGVOYW1lcy5jb25jYXQodGhpcy5yZWNvcmRlZEF0dHJpYnV0ZU5hbWVzKSkpO1xuICAgIH1cbiAgICBnZXQgY3VycmVudEF0dHJpYnV0ZU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQuYXR0cmlidXRlcykubWFwKChhdHRyaWJ1dGUpID0+IGF0dHJpYnV0ZS5uYW1lKTtcbiAgICB9XG4gICAgZ2V0IHJlY29yZGVkQXR0cmlidXRlTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc3RyaW5nTWFwLmtleXMoKSk7XG4gICAgfVxufVxuXG5jbGFzcyBUb2tlbkxpc3RPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPYnNlcnZlciA9IG5ldyBBdHRyaWJ1dGVPYnNlcnZlcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnRva2Vuc0J5RWxlbWVudCA9IG5ldyBNdWx0aW1hcCgpO1xuICAgIH1cbiAgICBnZXQgc3RhcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIuc3RhcnRlZDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcGF1c2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5wYXVzZShjYWxsYmFjayk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnJlZnJlc2goKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBhdHRyaWJ1dGVOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5hdHRyaWJ1dGVOYW1lO1xuICAgIH1cbiAgICBlbGVtZW50TWF0Y2hlZEF0dHJpYnV0ZShlbGVtZW50KSB7XG4gICAgICAgIHRoaXMudG9rZW5zTWF0Y2hlZCh0aGlzLnJlYWRUb2tlbnNGb3JFbGVtZW50KGVsZW1lbnQpKTtcbiAgICB9XG4gICAgZWxlbWVudEF0dHJpYnV0ZVZhbHVlQ2hhbmdlZChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IFt1bm1hdGNoZWRUb2tlbnMsIG1hdGNoZWRUb2tlbnNdID0gdGhpcy5yZWZyZXNoVG9rZW5zRm9yRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgdGhpcy50b2tlbnNVbm1hdGNoZWQodW5tYXRjaGVkVG9rZW5zKTtcbiAgICAgICAgdGhpcy50b2tlbnNNYXRjaGVkKG1hdGNoZWRUb2tlbnMpO1xuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkQXR0cmlidXRlKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy50b2tlbnNVbm1hdGNoZWQodGhpcy50b2tlbnNCeUVsZW1lbnQuZ2V0VmFsdWVzRm9yS2V5KGVsZW1lbnQpKTtcbiAgICB9XG4gICAgdG9rZW5zTWF0Y2hlZCh0b2tlbnMpIHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuKSA9PiB0aGlzLnRva2VuTWF0Y2hlZCh0b2tlbikpO1xuICAgIH1cbiAgICB0b2tlbnNVbm1hdGNoZWQodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4gdGhpcy50b2tlblVubWF0Y2hlZCh0b2tlbikpO1xuICAgIH1cbiAgICB0b2tlbk1hdGNoZWQodG9rZW4pIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS50b2tlbk1hdGNoZWQodG9rZW4pO1xuICAgICAgICB0aGlzLnRva2Vuc0J5RWxlbWVudC5hZGQodG9rZW4uZWxlbWVudCwgdG9rZW4pO1xuICAgIH1cbiAgICB0b2tlblVubWF0Y2hlZCh0b2tlbikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnRva2VuVW5tYXRjaGVkKHRva2VuKTtcbiAgICAgICAgdGhpcy50b2tlbnNCeUVsZW1lbnQuZGVsZXRlKHRva2VuLmVsZW1lbnQsIHRva2VuKTtcbiAgICB9XG4gICAgcmVmcmVzaFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VucyA9IHRoaXMudG9rZW5zQnlFbGVtZW50LmdldFZhbHVlc0ZvcktleShlbGVtZW50KTtcbiAgICAgICAgY29uc3QgY3VycmVudFRva2VucyA9IHRoaXMucmVhZFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGlmZmVyaW5nSW5kZXggPSB6aXAocHJldmlvdXNUb2tlbnMsIGN1cnJlbnRUb2tlbnMpLmZpbmRJbmRleCgoW3ByZXZpb3VzVG9rZW4sIGN1cnJlbnRUb2tlbl0pID0+ICF0b2tlbnNBcmVFcXVhbChwcmV2aW91c1Rva2VuLCBjdXJyZW50VG9rZW4pKTtcbiAgICAgICAgaWYgKGZpcnN0RGlmZmVyaW5nSW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBbW10sIFtdXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbcHJldmlvdXNUb2tlbnMuc2xpY2UoZmlyc3REaWZmZXJpbmdJbmRleCksIGN1cnJlbnRUb2tlbnMuc2xpY2UoZmlyc3REaWZmZXJpbmdJbmRleCldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlYWRUb2tlbnNGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHRoaXMuYXR0cmlidXRlTmFtZTtcbiAgICAgICAgY29uc3QgdG9rZW5TdHJpbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gcGFyc2VUb2tlblN0cmluZyh0b2tlblN0cmluZywgZWxlbWVudCwgYXR0cmlidXRlTmFtZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyc2VUb2tlblN0cmluZyh0b2tlblN0cmluZywgZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiB0b2tlblN0cmluZ1xuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgICAgIC5maWx0ZXIoKGNvbnRlbnQpID0+IGNvbnRlbnQubGVuZ3RoKVxuICAgICAgICAubWFwKChjb250ZW50LCBpbmRleCkgPT4gKHsgZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgY29udGVudCwgaW5kZXggfSkpO1xufVxuZnVuY3Rpb24gemlwKGxlZnQsIHJpZ2h0KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgobGVmdC5sZW5ndGgsIHJpZ2h0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGggfSwgKF8sIGluZGV4KSA9PiBbbGVmdFtpbmRleF0sIHJpZ2h0W2luZGV4XV0pO1xufVxuZnVuY3Rpb24gdG9rZW5zQXJlRXF1YWwobGVmdCwgcmlnaHQpIHtcbiAgICByZXR1cm4gbGVmdCAmJiByaWdodCAmJiBsZWZ0LmluZGV4ID09IHJpZ2h0LmluZGV4ICYmIGxlZnQuY29udGVudCA9PSByaWdodC5jb250ZW50O1xufVxuXG5jbGFzcyBWYWx1ZUxpc3RPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlciA9IG5ldyBUb2tlbkxpc3RPYnNlcnZlcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnBhcnNlUmVzdWx0c0J5VG9rZW4gPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB0aGlzLnZhbHVlc0J5VG9rZW5CeUVsZW1lbnQgPSBuZXcgV2Vha01hcCgpO1xuICAgIH1cbiAgICBnZXQgc3RhcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuc3RhcnRlZDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIucmVmcmVzaCgpO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGF0dHJpYnV0ZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuTGlzdE9ic2VydmVyLmF0dHJpYnV0ZU5hbWU7XG4gICAgfVxuICAgIHRva2VuTWF0Y2hlZCh0b2tlbikge1xuICAgICAgICBjb25zdCB7IGVsZW1lbnQgfSA9IHRva2VuO1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLmZldGNoUGFyc2VSZXN1bHRGb3JUb2tlbih0b2tlbik7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFZhbHVlc0J5VG9rZW5Gb3JFbGVtZW50KGVsZW1lbnQpLnNldCh0b2tlbiwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZFZhbHVlKGVsZW1lbnQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2tlblVubWF0Y2hlZCh0b2tlbikge1xuICAgICAgICBjb25zdCB7IGVsZW1lbnQgfSA9IHRva2VuO1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLmZldGNoUGFyc2VSZXN1bHRGb3JUb2tlbih0b2tlbik7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFZhbHVlc0J5VG9rZW5Gb3JFbGVtZW50KGVsZW1lbnQpLmRlbGV0ZSh0b2tlbik7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRVbm1hdGNoZWRWYWx1ZShlbGVtZW50LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2hQYXJzZVJlc3VsdEZvclRva2VuKHRva2VuKSB7XG4gICAgICAgIGxldCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2VSZXN1bHRzQnlUb2tlbi5nZXQodG9rZW4pO1xuICAgICAgICBpZiAoIXBhcnNlUmVzdWx0KSB7XG4gICAgICAgICAgICBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2VUb2tlbih0b2tlbik7XG4gICAgICAgICAgICB0aGlzLnBhcnNlUmVzdWx0c0J5VG9rZW4uc2V0KHRva2VuLCBwYXJzZVJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0O1xuICAgIH1cbiAgICBmZXRjaFZhbHVlc0J5VG9rZW5Gb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHZhbHVlc0J5VG9rZW4gPSB0aGlzLnZhbHVlc0J5VG9rZW5CeUVsZW1lbnQuZ2V0KGVsZW1lbnQpO1xuICAgICAgICBpZiAoIXZhbHVlc0J5VG9rZW4pIHtcbiAgICAgICAgICAgIHZhbHVlc0J5VG9rZW4gPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc0J5VG9rZW5CeUVsZW1lbnQuc2V0KGVsZW1lbnQsIHZhbHVlc0J5VG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXNCeVRva2VuO1xuICAgIH1cbiAgICBwYXJzZVRva2VuKHRva2VuKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGVsZWdhdGUucGFyc2VWYWx1ZUZvclRva2VuKHRva2VuKTtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBCaW5kaW5nT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc0J5QWN0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlTGlzdE9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlTGlzdE9ic2VydmVyID0gbmV3IFZhbHVlTGlzdE9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcy5hY3Rpb25BdHRyaWJ1dGUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlTGlzdE9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlTGlzdE9ic2VydmVyLnN0b3AoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZhbHVlTGlzdE9ic2VydmVyO1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0QWxsQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldCBhY3Rpb25BdHRyaWJ1dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVtYS5hY3Rpb25BdHRyaWJ1dGU7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuc2NoZW1hO1xuICAgIH1cbiAgICBnZXQgYmluZGluZ3MoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuYmluZGluZ3NCeUFjdGlvbi52YWx1ZXMoKSk7XG4gICAgfVxuICAgIGNvbm5lY3RBY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGJpbmRpbmcgPSBuZXcgQmluZGluZyh0aGlzLmNvbnRleHQsIGFjdGlvbik7XG4gICAgICAgIHRoaXMuYmluZGluZ3NCeUFjdGlvbi5zZXQoYWN0aW9uLCBiaW5kaW5nKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5iaW5kaW5nQ29ubmVjdGVkKGJpbmRpbmcpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBjb25zdCBiaW5kaW5nID0gdGhpcy5iaW5kaW5nc0J5QWN0aW9uLmdldChhY3Rpb24pO1xuICAgICAgICBpZiAoYmluZGluZykge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc0J5QWN0aW9uLmRlbGV0ZShhY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5iaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RBbGxBY3Rpb25zKCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmcpID0+IHRoaXMuZGVsZWdhdGUuYmluZGluZ0Rpc2Nvbm5lY3RlZChiaW5kaW5nLCB0cnVlKSk7XG4gICAgICAgIHRoaXMuYmluZGluZ3NCeUFjdGlvbi5jbGVhcigpO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlRm9yVG9rZW4odG9rZW4pIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gQWN0aW9uLmZvclRva2VuKHRva2VuLCB0aGlzLnNjaGVtYSk7XG4gICAgICAgIGlmIChhY3Rpb24uaWRlbnRpZmllciA9PSB0aGlzLmlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudE1hdGNoZWRWYWx1ZShlbGVtZW50LCBhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0QWN0aW9uKGFjdGlvbik7XG4gICAgfVxuICAgIGVsZW1lbnRVbm1hdGNoZWRWYWx1ZShlbGVtZW50LCBhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0QWN0aW9uKGFjdGlvbik7XG4gICAgfVxufVxuXG5jbGFzcyBWYWx1ZU9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0LCByZWNlaXZlcikge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgIHRoaXMuc3RyaW5nTWFwT2JzZXJ2ZXIgPSBuZXcgU3RyaW5nTWFwT2JzZXJ2ZXIodGhpcy5lbGVtZW50LCB0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZURlc2NyaXB0b3JNYXAgPSB0aGlzLmNvbnRyb2xsZXIudmFsdWVEZXNjcmlwdG9yTWFwO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdNYXBPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFja3NGb3JEZWZhdWx0VmFsdWVzKCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc3RyaW5nTWFwT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5jb250cm9sbGVyO1xuICAgIH1cbiAgICBnZXRTdHJpbmdNYXBLZXlGb3JBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSBpbiB0aGlzLnZhbHVlRGVzY3JpcHRvck1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVEZXNjcmlwdG9yTWFwW2F0dHJpYnV0ZU5hbWVdLm5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5QWRkZWQoa2V5LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLnZhbHVlRGVzY3JpcHRvck1hcFthdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1ZhbHVlKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW52b2tlQ2hhbmdlZENhbGxiYWNrKGtleSwgZGVzY3JpcHRvci53cml0ZXIodGhpcy5yZWNlaXZlcltrZXldKSwgZGVzY3JpcHRvci53cml0ZXIoZGVzY3JpcHRvci5kZWZhdWx0VmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmdNYXBWYWx1ZUNoYW5nZWQodmFsdWUsIG5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLnZhbHVlRGVzY3JpcHRvck5hbWVNYXBbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZSA9IGRlc2NyaXB0b3Iud3JpdGVyKGRlc2NyaXB0b3IuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhuYW1lLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICBzdHJpbmdNYXBLZXlSZW1vdmVkKGtleSwgYXR0cmlidXRlTmFtZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHRoaXMudmFsdWVEZXNjcmlwdG9yTmFtZU1hcFtrZXldO1xuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhrZXksIGRlc2NyaXB0b3Iud3JpdGVyKHRoaXMucmVjZWl2ZXJba2V5XSksIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW52b2tlQ2hhbmdlZENhbGxiYWNrKGtleSwgZGVzY3JpcHRvci53cml0ZXIoZGVzY3JpcHRvci5kZWZhdWx0VmFsdWUpLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlQ2hhbmdlZENhbGxiYWNrc0ZvckRlZmF1bHRWYWx1ZXMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgeyBrZXksIG5hbWUsIGRlZmF1bHRWYWx1ZSwgd3JpdGVyIH0gb2YgdGhpcy52YWx1ZURlc2NyaXB0b3JzKSB7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICE9IHVuZGVmaW5lZCAmJiAhdGhpcy5jb250cm9sbGVyLmRhdGEuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhuYW1lLCB3cml0ZXIoZGVmYXVsdFZhbHVlKSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZva2VDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgcmF3VmFsdWUsIHJhd09sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRNZXRob2ROYW1lID0gYCR7bmFtZX1DaGFuZ2VkYDtcbiAgICAgICAgY29uc3QgY2hhbmdlZE1ldGhvZCA9IHRoaXMucmVjZWl2ZXJbY2hhbmdlZE1ldGhvZE5hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIGNoYW5nZWRNZXRob2QgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JOYW1lTWFwW25hbWVdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRlc2NyaXB0b3IucmVhZGVyKHJhd1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSByYXdPbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocmF3T2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgPSBkZXNjcmlwdG9yLnJlYWRlcihyYXdPbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZWRNZXRob2QuY2FsbCh0aGlzLnJlY2VpdmVyLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVHlwZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBgU3RpbXVsdXMgVmFsdWUgXCIke3RoaXMuY29udGV4dC5pZGVudGlmaWVyfS4ke2Rlc2NyaXB0b3IubmFtZX1cIiAtICR7ZXJyb3IubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFsdWVEZXNjcmlwdG9ycygpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZURlc2NyaXB0b3JNYXAgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZURlc2NyaXB0b3JNYXApLm1hcCgoa2V5KSA9PiB2YWx1ZURlc2NyaXB0b3JNYXBba2V5XSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZURlc2NyaXB0b3JOYW1lTWFwKCkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnZhbHVlRGVzY3JpcHRvck1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JNYXBba2V5XTtcbiAgICAgICAgICAgIGRlc2NyaXB0b3JzW2Rlc2NyaXB0b3IubmFtZV0gPSBkZXNjcmlwdG9yO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICAgIH1cbiAgICBoYXNWYWx1ZShhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLnZhbHVlRGVzY3JpcHRvck5hbWVNYXBbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGNvbnN0IGhhc01ldGhvZE5hbWUgPSBgaGFzJHtjYXBpdGFsaXplKGRlc2NyaXB0b3IubmFtZSl9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZWl2ZXJbaGFzTWV0aG9kTmFtZV07XG4gICAgfVxufVxuXG5jbGFzcyBUYXJnZXRPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnRhcmdldHNCeU5hbWUgPSBuZXcgTXVsdGltYXAoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy50b2tlbkxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlciA9IG5ldyBUb2tlbkxpc3RPYnNlcnZlcih0aGlzLmVsZW1lbnQsIHRoaXMuYXR0cmlidXRlTmFtZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdEFsbFRhcmdldHMoKTtcbiAgICAgICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuc3RvcCgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9rZW5NYXRjaGVkKHsgZWxlbWVudCwgY29udGVudDogbmFtZSB9KSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3BlLmNvbnRhaW5zRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0VGFyZ2V0KGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRva2VuVW5tYXRjaGVkKHsgZWxlbWVudCwgY29udGVudDogbmFtZSB9KSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdFRhcmdldChlbGVtZW50LCBuYW1lKTtcbiAgICB9XG4gICAgY29ubmVjdFRhcmdldChlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldHNCeU5hbWUuaGFzKG5hbWUsIGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldHNCeU5hbWUuYWRkKG5hbWUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy50b2tlbkxpc3RPYnNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhdXNlKCgpID0+IHRoaXMuZGVsZWdhdGUudGFyZ2V0Q29ubmVjdGVkKGVsZW1lbnQsIG5hbWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0VGFyZ2V0KGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy50YXJnZXRzQnlOYW1lLmhhcyhuYW1lLCBlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXRzQnlOYW1lLmRlbGV0ZShuYW1lLCBlbGVtZW50KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXVzZSgoKSA9PiB0aGlzLmRlbGVnYXRlLnRhcmdldERpc2Nvbm5lY3RlZChlbGVtZW50LCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdEFsbFRhcmdldHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLnRhcmdldHNCeU5hbWUua2V5cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMudGFyZ2V0c0J5TmFtZS5nZXRWYWx1ZXNGb3JLZXkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RUYXJnZXQoZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGF0dHJpYnV0ZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiBgZGF0YS0ke3RoaXMuY29udGV4dC5pZGVudGlmaWVyfS10YXJnZXRgO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuc2NvcGU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWFkSW5oZXJpdGFibGVTdGF0aWNBcnJheVZhbHVlcyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gZ2V0QW5jZXN0b3JzRm9yQ29uc3RydWN0b3IoY29uc3RydWN0b3IpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFuY2VzdG9ycy5yZWR1Y2UoKHZhbHVlcywgY29uc3RydWN0b3IpID0+IHtcbiAgICAgICAgZ2V0T3duU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkuZm9yRWFjaCgobmFtZSkgPT4gdmFsdWVzLmFkZChuYW1lKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSwgbmV3IFNldCgpKSk7XG59XG5mdW5jdGlvbiByZWFkSW5oZXJpdGFibGVTdGF0aWNPYmplY3RQYWlycyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gZ2V0QW5jZXN0b3JzRm9yQ29uc3RydWN0b3IoY29uc3RydWN0b3IpO1xuICAgIHJldHVybiBhbmNlc3RvcnMucmVkdWNlKChwYWlycywgY29uc3RydWN0b3IpID0+IHtcbiAgICAgICAgcGFpcnMucHVzaCguLi5nZXRPd25TdGF0aWNPYmplY3RQYWlycyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSk7XG4gICAgICAgIHJldHVybiBwYWlycztcbiAgICB9LCBbXSk7XG59XG5mdW5jdGlvbiBnZXRBbmNlc3RvcnNGb3JDb25zdHJ1Y3Rvcihjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IFtdO1xuICAgIHdoaWxlIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICBhbmNlc3RvcnMucHVzaChjb25zdHJ1Y3Rvcik7XG4gICAgICAgIGNvbnN0cnVjdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ycy5yZXZlcnNlKCk7XG59XG5mdW5jdGlvbiBnZXRPd25TdGF0aWNBcnJheVZhbHVlcyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGNvbnN0cnVjdG9yW3Byb3BlcnR5TmFtZV07XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikgPyBkZWZpbml0aW9uIDogW107XG59XG5mdW5jdGlvbiBnZXRPd25TdGF0aWNPYmplY3RQYWlycyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGNvbnN0cnVjdG9yW3Byb3BlcnR5TmFtZV07XG4gICAgcmV0dXJuIGRlZmluaXRpb24gPyBPYmplY3Qua2V5cyhkZWZpbml0aW9uKS5tYXAoKGtleSkgPT4gW2tleSwgZGVmaW5pdGlvbltrZXldXSkgOiBbXTtcbn1cblxuY2xhc3MgT3V0bGV0T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5vdXRsZXRzQnlOYW1lID0gbmV3IE11bHRpbWFwKCk7XG4gICAgICAgIHRoaXMub3V0bGV0RWxlbWVudHNCeU5hbWUgPSBuZXcgTXVsdGltYXAoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JPYnNlcnZlck1hcC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxldERlZmluaXRpb25zLmZvckVhY2goKG91dGxldE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3Iob3V0bGV0TmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IHsgb3V0bGV0TmFtZSB9O1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuc2V0KG91dGxldE5hbWUsIG5ldyBTZWxlY3Rvck9ic2VydmVyKGRvY3VtZW50LmJvZHksIHNlbGVjdG9yLCB0aGlzLCBkZXRhaWxzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IG9ic2VydmVyLnN0YXJ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVwZW5kZW50Q29udGV4dHMuZm9yRWFjaCgoY29udGV4dCkgPT4gY29udGV4dC5yZWZyZXNoKCkpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RBbGxPdXRsZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IG9ic2VydmVyLnN0b3AoKSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IG9ic2VydmVyLnJlZnJlc2goKSk7XG4gICAgfVxuICAgIHNlbGVjdG9yTWF0Y2hlZChlbGVtZW50LCBfc2VsZWN0b3IsIHsgb3V0bGV0TmFtZSB9KSB7XG4gICAgICAgIGNvbnN0IG91dGxldCA9IHRoaXMuZ2V0T3V0bGV0KGVsZW1lbnQsIG91dGxldE5hbWUpO1xuICAgICAgICBpZiAob3V0bGV0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RPdXRsZXQob3V0bGV0LCBlbGVtZW50LCBvdXRsZXROYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RvclVubWF0Y2hlZChlbGVtZW50LCBfc2VsZWN0b3IsIHsgb3V0bGV0TmFtZSB9KSB7XG4gICAgICAgIGNvbnN0IG91dGxldCA9IHRoaXMuZ2V0T3V0bGV0RnJvbU1hcChlbGVtZW50LCBvdXRsZXROYW1lKTtcbiAgICAgICAgaWYgKG91dGxldCkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0T3V0bGV0KG91dGxldCwgZWxlbWVudCwgb3V0bGV0TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0b3JNYXRjaEVsZW1lbnQoZWxlbWVudCwgeyBvdXRsZXROYW1lIH0pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhc091dGxldChlbGVtZW50LCBvdXRsZXROYW1lKSAmJlxuICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzKGBbJHt0aGlzLmNvbnRleHQuYXBwbGljYXRpb24uc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGV9fj0ke291dGxldE5hbWV9XWApKTtcbiAgICB9XG4gICAgY29ubmVjdE91dGxldChvdXRsZXQsIGVsZW1lbnQsIG91dGxldE5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMub3V0bGV0RWxlbWVudHNCeU5hbWUuaGFzKG91dGxldE5hbWUsIGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxldHNCeU5hbWUuYWRkKG91dGxldE5hbWUsIG91dGxldCk7XG4gICAgICAgICAgICB0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lLmFkZChvdXRsZXROYW1lLCBlbGVtZW50KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuc2VsZWN0b3JPYnNlcnZlck1hcC5nZXQob3V0bGV0TmFtZSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXVzZSgoKSA9PiB0aGlzLmRlbGVnYXRlLm91dGxldENvbm5lY3RlZChvdXRsZXQsIGVsZW1lbnQsIG91dGxldE5hbWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0T3V0bGV0KG91dGxldCwgZWxlbWVudCwgb3V0bGV0TmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lLmhhcyhvdXRsZXROYW1lLCBlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsZXRzQnlOYW1lLmRlbGV0ZShvdXRsZXROYW1lLCBvdXRsZXQpO1xuICAgICAgICAgICAgdGhpcy5vdXRsZXRFbGVtZW50c0J5TmFtZS5kZWxldGUob3V0bGV0TmFtZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXBcbiAgICAgICAgICAgICAgICAuZ2V0KG91dGxldE5hbWUpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF1c2UoKCkgPT4gdGhpcy5kZWxlZ2F0ZS5vdXRsZXREaXNjb25uZWN0ZWQob3V0bGV0LCBlbGVtZW50LCBvdXRsZXROYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdEFsbE91dGxldHMoKSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3V0bGV0TmFtZSBvZiB0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lLmtleXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lLmdldFZhbHVlc0ZvcktleShvdXRsZXROYW1lKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb3V0bGV0IG9mIHRoaXMub3V0bGV0c0J5TmFtZS5nZXRWYWx1ZXNGb3JLZXkob3V0bGV0TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0T3V0bGV0KG91dGxldCwgZWxlbWVudCwgb3V0bGV0TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdG9yKG91dGxldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUub3V0bGV0cy5nZXRTZWxlY3RvckZvck91dGxldE5hbWUob3V0bGV0TmFtZSk7XG4gICAgfVxuICAgIGdldCBvdXRsZXREZXBlbmRlbmNpZXMoKSB7XG4gICAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IG5ldyBNdWx0aW1hcCgpO1xuICAgICAgICB0aGlzLnJvdXRlci5tb2R1bGVzLmZvckVhY2goKG1vZHVsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSBtb2R1bGUuZGVmaW5pdGlvbi5jb250cm9sbGVyQ29uc3RydWN0b3I7XG4gICAgICAgICAgICBjb25zdCBvdXRsZXRzID0gcmVhZEluaGVyaXRhYmxlU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIFwib3V0bGV0c1wiKTtcbiAgICAgICAgICAgIG91dGxldHMuZm9yRWFjaCgob3V0bGV0KSA9PiBkZXBlbmRlbmNpZXMuYWRkKG91dGxldCwgbW9kdWxlLmlkZW50aWZpZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZXBlbmRlbmNpZXM7XG4gICAgfVxuICAgIGdldCBvdXRsZXREZWZpbml0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGV0RGVwZW5kZW5jaWVzLmdldEtleXNGb3JWYWx1ZSh0aGlzLmlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBnZXQgZGVwZW5kZW50Q29udHJvbGxlcklkZW50aWZpZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRsZXREZXBlbmRlbmNpZXMuZ2V0VmFsdWVzRm9yS2V5KHRoaXMuaWRlbnRpZmllcik7XG4gICAgfVxuICAgIGdldCBkZXBlbmRlbnRDb250ZXh0cygpIHtcbiAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSB0aGlzLmRlcGVuZGVudENvbnRyb2xsZXJJZGVudGlmaWVycztcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLmNvbnRleHRzLmZpbHRlcigoY29udGV4dCkgPT4gaWRlbnRpZmllcnMuaW5jbHVkZXMoY29udGV4dC5pZGVudGlmaWVyKSk7XG4gICAgfVxuICAgIGhhc091dGxldChlbGVtZW50LCBvdXRsZXROYW1lKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0T3V0bGV0KGVsZW1lbnQsIG91dGxldE5hbWUpIHx8ICEhdGhpcy5nZXRPdXRsZXRGcm9tTWFwKGVsZW1lbnQsIG91dGxldE5hbWUpO1xuICAgIH1cbiAgICBnZXRPdXRsZXQoZWxlbWVudCwgb3V0bGV0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5nZXRDb250cm9sbGVyRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgb3V0bGV0TmFtZSk7XG4gICAgfVxuICAgIGdldE91dGxldEZyb21NYXAoZWxlbWVudCwgb3V0bGV0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRsZXRzQnlOYW1lLmdldFZhbHVlc0ZvcktleShvdXRsZXROYW1lKS5maW5kKChvdXRsZXQpID0+IG91dGxldC5lbGVtZW50ID09PSBlbGVtZW50KTtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjb3BlO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgYXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYXBwbGljYXRpb247XG4gICAgfVxuICAgIGdldCByb3V0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLnJvdXRlcjtcbiAgICB9XG59XG5cbmNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG1vZHVsZSwgc2NvcGUpIHtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5ID0gKGZ1bmN0aW9uTmFtZSwgZGV0YWlsID0ge30pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgICAgIGRldGFpbCA9IE9iamVjdC5hc3NpZ24oeyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50IH0sIGRldGFpbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmxvZ0RlYnVnQWN0aXZpdHkodGhpcy5pZGVudGlmaWVyLCBmdW5jdGlvbk5hbWUsIGRldGFpbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBtb2R1bGUuY29udHJvbGxlckNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLmJpbmRpbmdPYnNlcnZlciA9IG5ldyBCaW5kaW5nT2JzZXJ2ZXIodGhpcywgdGhpcy5kaXNwYXRjaGVyKTtcbiAgICAgICAgdGhpcy52YWx1ZU9ic2VydmVyID0gbmV3IFZhbHVlT2JzZXJ2ZXIodGhpcywgdGhpcy5jb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy50YXJnZXRPYnNlcnZlciA9IG5ldyBUYXJnZXRPYnNlcnZlcih0aGlzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vdXRsZXRPYnNlcnZlciA9IG5ldyBPdXRsZXRPYnNlcnZlcih0aGlzLCB0aGlzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJpbml0aWFsaXplXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgXCJpbml0aWFsaXppbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy50YXJnZXRPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0aGlzLm91dGxldE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIuY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiY29ubmVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIFwiY29ubmVjdGluZyBjb250cm9sbGVyXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMub3V0bGV0T2JzZXJ2ZXIucmVmcmVzaCgpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBcImRpc2Nvbm5lY3RpbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm91dGxldE9ic2VydmVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy50YXJnZXRPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgIHRoaXMudmFsdWVPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgIHRoaXMuYmluZGluZ09ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGUuYXBwbGljYXRpb247XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGUuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZ2V0IHNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24uc2NoZW1hO1xuICAgIH1cbiAgICBnZXQgZGlzcGF0Y2hlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24uZGlzcGF0Y2hlcjtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBwYXJlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwgPSB7fSkge1xuICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXIsIGVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGRldGFpbCA9IE9iamVjdC5hc3NpZ24oeyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50IH0sIGRldGFpbCk7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24uaGFuZGxlRXJyb3IoZXJyb3IsIGBFcnJvciAke21lc3NhZ2V9YCwgZGV0YWlsKTtcbiAgICB9XG4gICAgdGFyZ2V0Q29ubmVjdGVkKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5pbnZva2VDb250cm9sbGVyTWV0aG9kKGAke25hbWV9VGFyZ2V0Q29ubmVjdGVkYCwgZWxlbWVudCk7XG4gICAgfVxuICAgIHRhcmdldERpc2Nvbm5lY3RlZChlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHRoaXMuaW52b2tlQ29udHJvbGxlck1ldGhvZChgJHtuYW1lfVRhcmdldERpc2Nvbm5lY3RlZGAsIGVsZW1lbnQpO1xuICAgIH1cbiAgICBvdXRsZXRDb25uZWN0ZWQob3V0bGV0LCBlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHRoaXMuaW52b2tlQ29udHJvbGxlck1ldGhvZChgJHtuYW1lc3BhY2VDYW1lbGl6ZShuYW1lKX1PdXRsZXRDb25uZWN0ZWRgLCBvdXRsZXQsIGVsZW1lbnQpO1xuICAgIH1cbiAgICBvdXRsZXREaXNjb25uZWN0ZWQob3V0bGV0LCBlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHRoaXMuaW52b2tlQ29udHJvbGxlck1ldGhvZChgJHtuYW1lc3BhY2VDYW1lbGl6ZShuYW1lKX1PdXRsZXREaXNjb25uZWN0ZWRgLCBvdXRsZXQsIGVsZW1lbnQpO1xuICAgIH1cbiAgICBpbnZva2VDb250cm9sbGVyTWV0aG9kKG1ldGhvZE5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuY29udHJvbGxlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sbGVyW21ldGhvZE5hbWVdID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29udHJvbGxlclttZXRob2ROYW1lXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYmxlc3MoY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gc2hhZG93KGNvbnN0cnVjdG9yLCBnZXRCbGVzc2VkUHJvcGVydGllcyhjb25zdHJ1Y3RvcikpO1xufVxuZnVuY3Rpb24gc2hhZG93KGNvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3Qgc2hhZG93Q29uc3RydWN0b3IgPSBleHRlbmQoY29uc3RydWN0b3IpO1xuICAgIGNvbnN0IHNoYWRvd1Byb3BlcnRpZXMgPSBnZXRTaGFkb3dQcm9wZXJ0aWVzKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc2hhZG93Q29uc3RydWN0b3IucHJvdG90eXBlLCBzaGFkb3dQcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gc2hhZG93Q29uc3RydWN0b3I7XG59XG5mdW5jdGlvbiBnZXRCbGVzc2VkUHJvcGVydGllcyhjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGJsZXNzaW5ncyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcImJsZXNzaW5nc1wiKTtcbiAgICByZXR1cm4gYmxlc3NpbmdzLnJlZHVjZSgoYmxlc3NlZFByb3BlcnRpZXMsIGJsZXNzaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBibGVzc2luZyhjb25zdHJ1Y3Rvcik7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBibGVzc2VkUHJvcGVydGllc1trZXldIHx8IHt9O1xuICAgICAgICAgICAgYmxlc3NlZFByb3BlcnRpZXNba2V5XSA9IE9iamVjdC5hc3NpZ24oZGVzY3JpcHRvciwgcHJvcGVydGllc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmxlc3NlZFByb3BlcnRpZXM7XG4gICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0U2hhZG93UHJvcGVydGllcyhwcm90b3R5cGUsIHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gZ2V0T3duS2V5cyhwcm9wZXJ0aWVzKS5yZWR1Y2UoKHNoYWRvd1Byb3BlcnRpZXMsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZ2V0U2hhZG93ZWREZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvcGVydGllcywga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2hhZG93UHJvcGVydGllcywgeyBba2V5XTogZGVzY3JpcHRvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhZG93UHJvcGVydGllcztcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBnZXRTaGFkb3dlZERlc2NyaXB0b3IocHJvdG90eXBlLCBwcm9wZXJ0aWVzLCBrZXkpIHtcbiAgICBjb25zdCBzaGFkb3dpbmdEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIGtleSk7XG4gICAgY29uc3Qgc2hhZG93ZWRCeVZhbHVlID0gc2hhZG93aW5nRGVzY3JpcHRvciAmJiBcInZhbHVlXCIgaW4gc2hhZG93aW5nRGVzY3JpcHRvcjtcbiAgICBpZiAoIXNoYWRvd2VkQnlWYWx1ZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0aWVzLCBrZXkpLnZhbHVlO1xuICAgICAgICBpZiAoc2hhZG93aW5nRGVzY3JpcHRvcikge1xuICAgICAgICAgICAgZGVzY3JpcHRvci5nZXQgPSBzaGFkb3dpbmdEZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLmdldDtcbiAgICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gc2hhZG93aW5nRGVzY3JpcHRvci5zZXQgfHwgZGVzY3JpcHRvci5zZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfVxufVxuY29uc3QgZ2V0T3duS2V5cyA9ICgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gKG9iamVjdCkgPT4gWy4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gICAgfVxufSkoKTtcbmNvbnN0IGV4dGVuZCA9ICgoKSA9PiB7XG4gICAgZnVuY3Rpb24gZXh0ZW5kV2l0aFJlZmxlY3QoY29uc3RydWN0b3IpIHtcbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5jb25zdHJ1Y3QoY29uc3RydWN0b3IsIGFyZ3VtZW50cywgbmV3LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kZWQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBleHRlbmRlZCB9LFxuICAgICAgICB9KTtcbiAgICAgICAgUmVmbGVjdC5zZXRQcm90b3R5cGVPZihleHRlbmRlZCwgY29uc3RydWN0b3IpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRlc3RSZWZsZWN0RXh0ZW5zaW9uKCkge1xuICAgICAgICBjb25zdCBhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5hLmNhbGwodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGIgPSBleHRlbmRXaXRoUmVmbGVjdChhKTtcbiAgICAgICAgYi5wcm90b3R5cGUuYSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiKCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHRlc3RSZWZsZWN0RXh0ZW5zaW9uKCk7XG4gICAgICAgIHJldHVybiBleHRlbmRXaXRoUmVmbGVjdDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAoY29uc3RydWN0b3IpID0+IGNsYXNzIGV4dGVuZGVkIGV4dGVuZHMgY29uc3RydWN0b3Ige1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIGJsZXNzRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWRlbnRpZmllcjogZGVmaW5pdGlvbi5pZGVudGlmaWVyLFxuICAgICAgICBjb250cm9sbGVyQ29uc3RydWN0b3I6IGJsZXNzKGRlZmluaXRpb24uY29udHJvbGxlckNvbnN0cnVjdG9yKSxcbiAgICB9O1xufVxuXG5jbGFzcyBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uLCBkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvbjtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uID0gYmxlc3NEZWZpbml0aW9uKGRlZmluaXRpb24pO1xuICAgICAgICB0aGlzLmNvbnRleHRzQnlTY29wZSA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMgPSBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldCBjb250cm9sbGVyQ29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmluaXRpb24uY29udHJvbGxlckNvbnN0cnVjdG9yO1xuICAgIH1cbiAgICBnZXQgY29udGV4dHMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY29ubmVjdGVkQ29udGV4dHMpO1xuICAgIH1cbiAgICBjb25uZWN0Q29udGV4dEZvclNjb3BlKHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmZldGNoQ29udGV4dEZvclNjb3BlKHNjb3BlKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDb250ZXh0cy5hZGQoY29udGV4dCk7XG4gICAgICAgIGNvbnRleHQuY29ubmVjdCgpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0Q29udGV4dEZvclNjb3BlKHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRzQnlTY29wZS5nZXQoc2NvcGUpO1xuICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRDb250ZXh0cy5kZWxldGUoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmZXRjaENvbnRleHRGb3JTY29wZShzY29wZSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuY29udGV4dHNCeVNjb3BlLmdldChzY29wZSk7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRoaXMsIHNjb3BlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dHNCeVNjb3BlLnNldChzY29wZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxufVxuXG5jbGFzcyBDbGFzc01hcCB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIH1cbiAgICBoYXMobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyh0aGlzLmdldERhdGFLZXkobmFtZSkpO1xuICAgIH1cbiAgICBnZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGwobmFtZSlbMF07XG4gICAgfVxuICAgIGdldEFsbChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHRva2VuU3RyaW5nID0gdGhpcy5kYXRhLmdldCh0aGlzLmdldERhdGFLZXkobmFtZSkpIHx8IFwiXCI7XG4gICAgICAgIHJldHVybiB0b2tlbml6ZSh0b2tlblN0cmluZyk7XG4gICAgfVxuICAgIGdldEF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkodGhpcy5nZXREYXRhS2V5KG5hbWUpKTtcbiAgICB9XG4gICAgZ2V0RGF0YUtleShuYW1lKSB7XG4gICAgICAgIHJldHVybiBgJHtuYW1lfS1jbGFzc2A7XG4gICAgfVxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5kYXRhO1xuICAgIH1cbn1cblxuY2xhc3MgRGF0YU1hcCB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlTmFtZUZvcktleShrZXkpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlTmFtZUZvcktleShrZXkpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSk7XG4gICAgfVxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlTmFtZUZvcktleShrZXkpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0QXR0cmlidXRlTmFtZUZvcktleShrZXkpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBgZGF0YS0ke3RoaXMuaWRlbnRpZmllcn0tJHtkYXNoZXJpemUoa2V5KX1gO1xuICAgIH1cbn1cblxuY2xhc3MgR3VpZGUge1xuICAgIGNvbnN0cnVjdG9yKGxvZ2dlcikge1xuICAgICAgICB0aGlzLndhcm5lZEtleXNCeU9iamVjdCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICB3YXJuKG9iamVjdCwga2V5LCBtZXNzYWdlKSB7XG4gICAgICAgIGxldCB3YXJuZWRLZXlzID0gdGhpcy53YXJuZWRLZXlzQnlPYmplY3QuZ2V0KG9iamVjdCk7XG4gICAgICAgIGlmICghd2FybmVkS2V5cykge1xuICAgICAgICAgICAgd2FybmVkS2V5cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHRoaXMud2FybmVkS2V5c0J5T2JqZWN0LnNldChvYmplY3QsIHdhcm5lZEtleXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghd2FybmVkS2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgd2FybmVkS2V5cy5hZGQoa2V5KTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4obWVzc2FnZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKGF0dHJpYnV0ZU5hbWUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGBbJHthdHRyaWJ1dGVOYW1lfX49XCIke3Rva2VufVwiXWA7XG59XG5cbmNsYXNzIFRhcmdldFNldCB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLnNjaGVtYTtcbiAgICB9XG4gICAgaGFzKHRhcmdldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZCh0YXJnZXROYW1lKSAhPSBudWxsO1xuICAgIH1cbiAgICBmaW5kKC4uLnRhcmdldE5hbWVzKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXROYW1lcy5yZWR1Y2UoKHRhcmdldCwgdGFyZ2V0TmFtZSkgPT4gdGFyZ2V0IHx8IHRoaXMuZmluZFRhcmdldCh0YXJnZXROYW1lKSB8fCB0aGlzLmZpbmRMZWdhY3lUYXJnZXQodGFyZ2V0TmFtZSksIHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGZpbmRBbGwoLi4udGFyZ2V0TmFtZXMpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldE5hbWVzLnJlZHVjZSgodGFyZ2V0cywgdGFyZ2V0TmFtZSkgPT4gW1xuICAgICAgICAgICAgLi4udGFyZ2V0cyxcbiAgICAgICAgICAgIC4uLnRoaXMuZmluZEFsbFRhcmdldHModGFyZ2V0TmFtZSksXG4gICAgICAgICAgICAuLi50aGlzLmZpbmRBbGxMZWdhY3lUYXJnZXRzKHRhcmdldE5hbWUpLFxuICAgICAgICBdLCBbXSk7XG4gICAgfVxuICAgIGZpbmRUYXJnZXQodGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5maW5kRWxlbWVudChzZWxlY3Rvcik7XG4gICAgfVxuICAgIGZpbmRBbGxUYXJnZXRzKHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZmluZEFsbEVsZW1lbnRzKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgZ2V0U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHRoaXMuc2NoZW1hLnRhcmdldEF0dHJpYnV0ZUZvclNjb3BlKHRoaXMuaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZUNvbnRhaW5zVG9rZW4oYXR0cmlidXRlTmFtZSwgdGFyZ2V0TmFtZSk7XG4gICAgfVxuICAgIGZpbmRMZWdhY3lUYXJnZXQodGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0TGVnYWN5U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZXByZWNhdGUodGhpcy5zY29wZS5maW5kRWxlbWVudChzZWxlY3RvciksIHRhcmdldE5hbWUpO1xuICAgIH1cbiAgICBmaW5kQWxsTGVnYWN5VGFyZ2V0cyh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRMZWdhY3lTZWxlY3RvckZvclRhcmdldE5hbWUodGFyZ2V0TmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmZpbmRBbGxFbGVtZW50cyhzZWxlY3RvcikubWFwKChlbGVtZW50KSA9PiB0aGlzLmRlcHJlY2F0ZShlbGVtZW50LCB0YXJnZXROYW1lKSk7XG4gICAgfVxuICAgIGdldExlZ2FjeVNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldERlc2NyaXB0b3IgPSBgJHt0aGlzLmlkZW50aWZpZXJ9LiR7dGFyZ2V0TmFtZX1gO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKHRoaXMuc2NoZW1hLnRhcmdldEF0dHJpYnV0ZSwgdGFyZ2V0RGVzY3JpcHRvcik7XG4gICAgfVxuICAgIGRlcHJlY2F0ZShlbGVtZW50LCB0YXJnZXROYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIgfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gdGhpcy5zY2hlbWEudGFyZ2V0QXR0cmlidXRlO1xuICAgICAgICAgICAgY29uc3QgcmV2aXNlZEF0dHJpYnV0ZU5hbWUgPSB0aGlzLnNjaGVtYS50YXJnZXRBdHRyaWJ1dGVGb3JTY29wZShpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHRoaXMuZ3VpZGUud2FybihlbGVtZW50LCBgdGFyZ2V0OiR7dGFyZ2V0TmFtZX1gLCBgUGxlYXNlIHJlcGxhY2UgJHthdHRyaWJ1dGVOYW1lfT1cIiR7aWRlbnRpZmllcn0uJHt0YXJnZXROYW1lfVwiIHdpdGggJHtyZXZpc2VkQXR0cmlidXRlTmFtZX09XCIke3RhcmdldE5hbWV9XCIuIGAgK1xuICAgICAgICAgICAgICAgIGBUaGUgJHthdHRyaWJ1dGVOYW1lfSBhdHRyaWJ1dGUgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgU3RpbXVsdXMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBndWlkZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZ3VpZGU7XG4gICAgfVxufVxuXG5jbGFzcyBPdXRsZXRTZXQge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlLCBjb250cm9sbGVyRWxlbWVudCkge1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckVsZW1lbnQgPSBjb250cm9sbGVyRWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5zY2hlbWE7XG4gICAgfVxuICAgIGhhcyhvdXRsZXROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQob3V0bGV0TmFtZSkgIT0gbnVsbDtcbiAgICB9XG4gICAgZmluZCguLi5vdXRsZXROYW1lcykge1xuICAgICAgICByZXR1cm4gb3V0bGV0TmFtZXMucmVkdWNlKChvdXRsZXQsIG91dGxldE5hbWUpID0+IG91dGxldCB8fCB0aGlzLmZpbmRPdXRsZXQob3V0bGV0TmFtZSksIHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGZpbmRBbGwoLi4ub3V0bGV0TmFtZXMpIHtcbiAgICAgICAgcmV0dXJuIG91dGxldE5hbWVzLnJlZHVjZSgob3V0bGV0cywgb3V0bGV0TmFtZSkgPT4gWy4uLm91dGxldHMsIC4uLnRoaXMuZmluZEFsbE91dGxldHMob3V0bGV0TmFtZSldLCBbXSk7XG4gICAgfVxuICAgIGdldFNlbGVjdG9yRm9yT3V0bGV0TmFtZShvdXRsZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnNjaGVtYS5vdXRsZXRBdHRyaWJ1dGVGb3JTY29wZSh0aGlzLmlkZW50aWZpZXIsIG91dGxldE5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgfVxuICAgIGZpbmRPdXRsZXQob3V0bGV0TmFtZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0U2VsZWN0b3JGb3JPdXRsZXROYW1lKG91dGxldE5hbWUpO1xuICAgICAgICBpZiAoc2VsZWN0b3IpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRWxlbWVudChzZWxlY3Rvciwgb3V0bGV0TmFtZSk7XG4gICAgfVxuICAgIGZpbmRBbGxPdXRsZXRzKG91dGxldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yRm9yT3V0bGV0TmFtZShvdXRsZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yID8gdGhpcy5maW5kQWxsRWxlbWVudHMoc2VsZWN0b3IsIG91dGxldE5hbWUpIDogW107XG4gICAgfVxuICAgIGZpbmRFbGVtZW50KHNlbGVjdG9yLCBvdXRsZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5zY29wZS5xdWVyeUVsZW1lbnRzKHNlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmZpbHRlcigoZWxlbWVudCkgPT4gdGhpcy5tYXRjaGVzRWxlbWVudChlbGVtZW50LCBzZWxlY3Rvciwgb3V0bGV0TmFtZSkpWzBdO1xuICAgIH1cbiAgICBmaW5kQWxsRWxlbWVudHMoc2VsZWN0b3IsIG91dGxldE5hbWUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLnNjb3BlLnF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpO1xuICAgICAgICByZXR1cm4gZWxlbWVudHMuZmlsdGVyKChlbGVtZW50KSA9PiB0aGlzLm1hdGNoZXNFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yLCBvdXRsZXROYW1lKSk7XG4gICAgfVxuICAgIG1hdGNoZXNFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yLCBvdXRsZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXJBdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSh0aGlzLnNjb3BlLnNjaGVtYS5jb250cm9sbGVyQXR0cmlidXRlKSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSAmJiBjb250cm9sbGVyQXR0cmlidXRlLnNwbGl0KFwiIFwiKS5pbmNsdWRlcyhvdXRsZXROYW1lKTtcbiAgICB9XG59XG5cbmNsYXNzIFNjb3BlIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlbWEsIGVsZW1lbnQsIGlkZW50aWZpZXIsIGxvZ2dlcikge1xuICAgICAgICB0aGlzLnRhcmdldHMgPSBuZXcgVGFyZ2V0U2V0KHRoaXMpO1xuICAgICAgICB0aGlzLmNsYXNzZXMgPSBuZXcgQ2xhc3NNYXAodGhpcyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFwKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRhaW5zRWxlbWVudCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KHRoaXMuY29udHJvbGxlclNlbGVjdG9yKSA9PT0gdGhpcy5lbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5ndWlkZSA9IG5ldyBHdWlkZShsb2dnZXIpO1xuICAgICAgICB0aGlzLm91dGxldHMgPSBuZXcgT3V0bGV0U2V0KHRoaXMuZG9jdW1lbnRTY29wZSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGZpbmRFbGVtZW50KHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgPyB0aGlzLmVsZW1lbnQgOiB0aGlzLnF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpLmZpbmQodGhpcy5jb250YWluc0VsZW1lbnQpO1xuICAgIH1cbiAgICBmaW5kQWxsRWxlbWVudHMoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLih0aGlzLmVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgPyBbdGhpcy5lbGVtZW50XSA6IFtdKSxcbiAgICAgICAgICAgIC4uLnRoaXMucXVlcnlFbGVtZW50cyhzZWxlY3RvcikuZmlsdGVyKHRoaXMuY29udGFpbnNFbGVtZW50KSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgcXVlcnlFbGVtZW50cyhzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlclNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGUsIHRoaXMuaWRlbnRpZmllcik7XG4gICAgfVxuICAgIGdldCBpc0RvY3VtZW50U2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGRvY3VtZW50U2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRG9jdW1lbnRTY29wZVxuICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICA6IG5ldyBTY29wZSh0aGlzLnNjaGVtYSwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLmlkZW50aWZpZXIsIHRoaXMuZ3VpZGUubG9nZ2VyKTtcbiAgICB9XG59XG5cbmNsYXNzIFNjb3BlT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHNjaGVtYSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlciA9IG5ldyBWYWx1ZUxpc3RPYnNlcnZlcih0aGlzLmVsZW1lbnQsIHRoaXMuY29udHJvbGxlckF0dHJpYnV0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyQnlFbGVtZW50ID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgdGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnZhbHVlTGlzdE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckF0dHJpYnV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGU7XG4gICAgfVxuICAgIHBhcnNlVmFsdWVGb3JUb2tlbih0b2tlbikge1xuICAgICAgICBjb25zdCB7IGVsZW1lbnQsIGNvbnRlbnQ6IGlkZW50aWZpZXIgfSA9IHRva2VuO1xuICAgICAgICBjb25zdCBzY29wZXNCeUlkZW50aWZpZXIgPSB0aGlzLmZldGNoU2NvcGVzQnlJZGVudGlmaWVyRm9yRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbGV0IHNjb3BlID0gc2NvcGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUgPSB0aGlzLmRlbGVnYXRlLmNyZWF0ZVNjb3BlRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzY29wZXNCeUlkZW50aWZpZXIuc2V0KGlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2NvcGU7XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQ291bnQgPSAodGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cy5nZXQodmFsdWUpIHx8IDApICsgMTtcbiAgICAgICAgdGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cy5zZXQodmFsdWUsIHJlZmVyZW5jZUNvdW50KTtcbiAgICAgICAgaWYgKHJlZmVyZW5jZUNvdW50ID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc2NvcGVDb25uZWN0ZWQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRVbm1hdGNoZWRWYWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCByZWZlcmVuY2VDb3VudCA9IHRoaXMuc2NvcGVSZWZlcmVuY2VDb3VudHMuZ2V0KHZhbHVlKTtcbiAgICAgICAgaWYgKHJlZmVyZW5jZUNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlUmVmZXJlbmNlQ291bnRzLnNldCh2YWx1ZSwgcmVmZXJlbmNlQ291bnQgLSAxKTtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VDb3VudCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zY29wZURpc2Nvbm5lY3RlZCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2hTY29wZXNCeUlkZW50aWZpZXJGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHNjb3Blc0J5SWRlbnRpZmllciA9IHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyQnlFbGVtZW50LmdldChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFzY29wZXNCeUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHNjb3Blc0J5SWRlbnRpZmllciA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyQnlFbGVtZW50LnNldChlbGVtZW50LCBzY29wZXNCeUlkZW50aWZpZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY29wZXNCeUlkZW50aWZpZXI7XG4gICAgfVxufVxuXG5jbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvbjtcbiAgICAgICAgdGhpcy5zY29wZU9ic2VydmVyID0gbmV3IFNjb3BlT2JzZXJ2ZXIodGhpcy5lbGVtZW50LCB0aGlzLnNjaGVtYSwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyID0gbmV3IE11bHRpbWFwKCk7XG4gICAgICAgIHRoaXMubW9kdWxlc0J5SWRlbnRpZmllciA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLnNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGxvZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24ubG9nZ2VyO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckF0dHJpYnV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGU7XG4gICAgfVxuICAgIGdldCBtb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIudmFsdWVzKCkpO1xuICAgIH1cbiAgICBnZXQgY29udGV4dHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMucmVkdWNlKChjb250ZXh0cywgbW9kdWxlKSA9PiBjb250ZXh0cy5jb25jYXQobW9kdWxlLmNvbnRleHRzKSwgW10pO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zY29wZU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc2NvcGVPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIGxvYWREZWZpbml0aW9uKGRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy51bmxvYWRJZGVudGlmaWVyKGRlZmluaXRpb24uaWRlbnRpZmllcik7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IG5ldyBNb2R1bGUodGhpcy5hcHBsaWNhdGlvbiwgZGVmaW5pdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdE1vZHVsZShtb2R1bGUpO1xuICAgICAgICBjb25zdCBhZnRlckxvYWQgPSBkZWZpbml0aW9uLmNvbnRyb2xsZXJDb25zdHJ1Y3Rvci5hZnRlckxvYWQ7XG4gICAgICAgIGlmIChhZnRlckxvYWQpIHtcbiAgICAgICAgICAgIGFmdGVyTG9hZChkZWZpbml0aW9uLmlkZW50aWZpZXIsIHRoaXMuYXBwbGljYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVubG9hZElkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RNb2R1bGUobW9kdWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDb250ZXh0Rm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlLmNvbnRleHRzLmZpbmQoKGNvbnRleHQpID0+IGNvbnRleHQuZWxlbWVudCA9PSBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVFcnJvcihlcnJvciwgbWVzc2FnZSwgZGV0YWlsKSB7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24uaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGRldGFpbCk7XG4gICAgfVxuICAgIGNyZWF0ZVNjb3BlRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gbmV3IFNjb3BlKHRoaXMuc2NoZW1hLCBlbGVtZW50LCBpZGVudGlmaWVyLCB0aGlzLmxvZ2dlcik7XG4gICAgfVxuICAgIHNjb3BlQ29ubmVjdGVkKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyLmFkZChzY29wZS5pZGVudGlmaWVyLCBzY29wZSk7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IHRoaXMubW9kdWxlc0J5SWRlbnRpZmllci5nZXQoc2NvcGUuaWRlbnRpZmllcik7XG4gICAgICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgICAgIG1vZHVsZS5jb25uZWN0Q29udGV4dEZvclNjb3BlKHNjb3BlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY29wZURpc2Nvbm5lY3RlZChzY29wZSkge1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllci5kZWxldGUoc2NvcGUuaWRlbnRpZmllciwgc2NvcGUpO1xuICAgICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZ2V0KHNjb3BlLmlkZW50aWZpZXIpO1xuICAgICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgICAgICBtb2R1bGUuZGlzY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29ubmVjdE1vZHVsZShtb2R1bGUpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLnNldChtb2R1bGUuaWRlbnRpZmllciwgbW9kdWxlKTtcbiAgICAgICAgY29uc3Qgc2NvcGVzID0gdGhpcy5zY29wZXNCeUlkZW50aWZpZXIuZ2V0VmFsdWVzRm9yS2V5KG1vZHVsZS5pZGVudGlmaWVyKTtcbiAgICAgICAgc2NvcGVzLmZvckVhY2goKHNjb3BlKSA9PiBtb2R1bGUuY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0TW9kdWxlKG1vZHVsZSkge1xuICAgICAgICB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZGVsZXRlKG1vZHVsZS5pZGVudGlmaWVyKTtcbiAgICAgICAgY29uc3Qgc2NvcGVzID0gdGhpcy5zY29wZXNCeUlkZW50aWZpZXIuZ2V0VmFsdWVzRm9yS2V5KG1vZHVsZS5pZGVudGlmaWVyKTtcbiAgICAgICAgc2NvcGVzLmZvckVhY2goKHNjb3BlKSA9PiBtb2R1bGUuZGlzY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkpO1xuICAgIH1cbn1cblxuY29uc3QgZGVmYXVsdFNjaGVtYSA9IHtcbiAgICBjb250cm9sbGVyQXR0cmlidXRlOiBcImRhdGEtY29udHJvbGxlclwiLFxuICAgIGFjdGlvbkF0dHJpYnV0ZTogXCJkYXRhLWFjdGlvblwiLFxuICAgIHRhcmdldEF0dHJpYnV0ZTogXCJkYXRhLXRhcmdldFwiLFxuICAgIHRhcmdldEF0dHJpYnV0ZUZvclNjb3BlOiAoaWRlbnRpZmllcikgPT4gYGRhdGEtJHtpZGVudGlmaWVyfS10YXJnZXRgLFxuICAgIG91dGxldEF0dHJpYnV0ZUZvclNjb3BlOiAoaWRlbnRpZmllciwgb3V0bGV0KSA9PiBgZGF0YS0ke2lkZW50aWZpZXJ9LSR7b3V0bGV0fS1vdXRsZXRgLFxuICAgIGtleU1hcHBpbmdzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBlbnRlcjogXCJFbnRlclwiLCB0YWI6IFwiVGFiXCIsIGVzYzogXCJFc2NhcGVcIiwgc3BhY2U6IFwiIFwiLCB1cDogXCJBcnJvd1VwXCIsIGRvd246IFwiQXJyb3dEb3duXCIsIGxlZnQ6IFwiQXJyb3dMZWZ0XCIsIHJpZ2h0OiBcIkFycm93UmlnaHRcIiwgaG9tZTogXCJIb21lXCIsIGVuZDogXCJFbmRcIiB9LCBvYmplY3RGcm9tRW50cmllcyhcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuc3BsaXQoXCJcIikubWFwKChjKSA9PiBbYywgY10pKSksIG9iamVjdEZyb21FbnRyaWVzKFwiMDEyMzQ1Njc4OVwiLnNwbGl0KFwiXCIpLm1hcCgobikgPT4gW24sIG5dKSkpLFxufTtcbmZ1bmN0aW9uIG9iamVjdEZyb21FbnRyaWVzKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZSgobWVtbywgW2ssIHZdKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtZW1vKSwgeyBba106IHYgfSkpLCB7fSk7XG59XG5cbmNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBzY2hlbWEgPSBkZWZhdWx0U2NoZW1hKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gY29uc29sZTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkgPSAoaWRlbnRpZmllciwgZnVuY3Rpb25OYW1lLCBkZXRhaWwgPSB7fSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ0Zvcm1hdHRlZE1lc3NhZ2UoaWRlbnRpZmllciwgZnVuY3Rpb25OYW1lLCBkZXRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIodGhpcyk7XG4gICAgICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcih0aGlzKTtcbiAgICAgICAgdGhpcy5hY3Rpb25EZXNjcmlwdG9yRmlsdGVycyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRBY3Rpb25EZXNjcmlwdG9yRmlsdGVycyk7XG4gICAgfVxuICAgIHN0YXRpYyBzdGFydChlbGVtZW50LCBzY2hlbWEpIHtcbiAgICAgICAgY29uc3QgYXBwbGljYXRpb24gPSBuZXcgdGhpcyhlbGVtZW50LCBzY2hlbWEpO1xuICAgICAgICBhcHBsaWNhdGlvbi5zdGFydCgpO1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb247XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICBhd2FpdCBkb21SZWFkeSgpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJhcHBsaWNhdGlvblwiLCBcInN0YXJ0aW5nXCIpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdGFydFwiKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdG9wcGluZ1wiKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuc3RvcCgpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJhcHBsaWNhdGlvblwiLCBcInN0b3BcIik7XG4gICAgfVxuICAgIHJlZ2lzdGVyKGlkZW50aWZpZXIsIGNvbnRyb2xsZXJDb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLmxvYWQoeyBpZGVudGlmaWVyLCBjb250cm9sbGVyQ29uc3RydWN0b3IgfSk7XG4gICAgfVxuICAgIHJlZ2lzdGVyQWN0aW9uT3B0aW9uKG5hbWUsIGZpbHRlcikge1xuICAgICAgICB0aGlzLmFjdGlvbkRlc2NyaXB0b3JGaWx0ZXJzW25hbWVdID0gZmlsdGVyO1xuICAgIH1cbiAgICBsb2FkKGhlYWQsIC4uLnJlc3QpIHtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBBcnJheS5pc0FycmF5KGhlYWQpID8gaGVhZCA6IFtoZWFkLCAuLi5yZXN0XTtcbiAgICAgICAgZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24uY29udHJvbGxlckNvbnN0cnVjdG9yLnNob3VsZExvYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5sb2FkRGVmaW5pdGlvbihkZWZpbml0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVubG9hZChoZWFkLCAuLi5yZXN0KSB7XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXJzID0gQXJyYXkuaXNBcnJheShoZWFkKSA/IGhlYWQgOiBbaGVhZCwgLi4ucmVzdF07XG4gICAgICAgIGlkZW50aWZpZXJzLmZvckVhY2goKGlkZW50aWZpZXIpID0+IHRoaXMucm91dGVyLnVubG9hZElkZW50aWZpZXIoaWRlbnRpZmllcikpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5jb250ZXh0cy5tYXAoKGNvbnRleHQpID0+IGNvbnRleHQuY29udHJvbGxlcik7XG4gICAgfVxuICAgIGdldENvbnRyb2xsZXJGb3JFbGVtZW50QW5kSWRlbnRpZmllcihlbGVtZW50LCBpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnJvdXRlci5nZXRDb250ZXh0Rm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBjb250ZXh0ID8gY29udGV4dC5jb250cm9sbGVyIDogbnVsbDtcbiAgICB9XG4gICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGRldGFpbCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGAlc1xcblxcbiVvXFxuXFxuJW9gLCBtZXNzYWdlLCBlcnJvciwgZGV0YWlsKTtcbiAgICAgICAgKF9hID0gd2luZG93Lm9uZXJyb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKHdpbmRvdywgbWVzc2FnZSwgXCJcIiwgMCwgMCwgZXJyb3IpO1xuICAgIH1cbiAgICBsb2dGb3JtYXR0ZWRNZXNzYWdlKGlkZW50aWZpZXIsIGZ1bmN0aW9uTmFtZSwgZGV0YWlsID0ge30pIHtcbiAgICAgICAgZGV0YWlsID0gT2JqZWN0LmFzc2lnbih7IGFwcGxpY2F0aW9uOiB0aGlzIH0sIGRldGFpbCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGAke2lkZW50aWZpZXJ9ICMke2Z1bmN0aW9uTmFtZX1gKTtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKFwiZGV0YWlsczpcIiwgT2JqZWN0LmFzc2lnbih7fSwgZGV0YWlsKSk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZG9tUmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwibG9hZGluZ1wiKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzUHJvcGVydGllc0JsZXNzaW5nKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcImNsYXNzZXNcIik7XG4gICAgcmV0dXJuIGNsYXNzZXMucmVkdWNlKChwcm9wZXJ0aWVzLCBjbGFzc0RlZmluaXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgcHJvcGVydGllc0ZvckNsYXNzRGVmaW5pdGlvbihjbGFzc0RlZmluaXRpb24pKTtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBwcm9wZXJ0aWVzRm9yQ2xhc3NEZWZpbml0aW9uKGtleSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIFtgJHtrZXl9Q2xhc3NgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGNsYXNzZXMuZ2V0QXR0cmlidXRlTmFtZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgYXR0cmlidXRlIFwiJHthdHRyaWJ1dGV9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYCR7a2V5fUNsYXNzZXNgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYXNzZXMuZ2V0QWxsKGtleSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShrZXkpfUNsYXNzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmhhcyhrZXkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBPdXRsZXRQcm9wZXJ0aWVzQmxlc3NpbmcoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBvdXRsZXRzID0gcmVhZEluaGVyaXRhYmxlU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIFwib3V0bGV0c1wiKTtcbiAgICByZXR1cm4gb3V0bGV0cy5yZWR1Y2UoKHByb3BlcnRpZXMsIG91dGxldERlZmluaXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgcHJvcGVydGllc0Zvck91dGxldERlZmluaXRpb24ob3V0bGV0RGVmaW5pdGlvbikpO1xuICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIHByb3BlcnRpZXNGb3JPdXRsZXREZWZpbml0aW9uKG5hbWUpIHtcbiAgICBjb25zdCBjYW1lbGl6ZWROYW1lID0gbmFtZXNwYWNlQ2FtZWxpemUobmFtZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2Ake2NhbWVsaXplZE5hbWV9T3V0bGV0YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRsZXQgPSB0aGlzLm91dGxldHMuZmluZChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0bGV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG91dGxldENvbnRyb2xsZXIgPSB0aGlzLmFwcGxpY2F0aW9uLmdldENvbnRyb2xsZXJGb3JFbGVtZW50QW5kSWRlbnRpZmllcihvdXRsZXQsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0bGV0Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dGxldENvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgXCJkYXRhLWNvbnRyb2xsZXI9JHtuYW1lfVwiIGF0dHJpYnV0ZSBvbiBvdXRsZXQgZWxlbWVudCBmb3IgXCIke3RoaXMuaWRlbnRpZmllcn1cIiBjb250cm9sbGVyYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG91dGxldCBlbGVtZW50IFwiJHtuYW1lfVwiIGZvciBcIiR7dGhpcy5pZGVudGlmaWVyfVwiIGNvbnRyb2xsZXJgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtgJHtjYW1lbGl6ZWROYW1lfU91dGxldHNgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dGxldHMgPSB0aGlzLm91dGxldHMuZmluZEFsbChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0bGV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRsZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvdXRsZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmFwcGxpY2F0aW9uLmdldENvbnRyb2xsZXJGb3JFbGVtZW50QW5kSWRlbnRpZmllcihvdXRsZXQsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIHByb3ZpZGVkIG91dGxldCBlbGVtZW50IGlzIG1pc3NpbmcgdGhlIG91dGxldCBjb250cm9sbGVyIFwiJHtuYW1lfVwiIGZvciBcIiR7dGhpcy5pZGVudGlmaWVyfVwiYCwgb3V0bGV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGNvbnRyb2xsZXIpID0+IGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYCR7Y2FtZWxpemVkTmFtZX1PdXRsZXRFbGVtZW50YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRsZXQgPSB0aGlzLm91dGxldHMuZmluZChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0bGV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRsZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgb3V0bGV0IGVsZW1lbnQgXCIke25hbWV9XCIgZm9yIFwiJHt0aGlzLmlkZW50aWZpZXJ9XCIgY29udHJvbGxlcmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtgJHtjYW1lbGl6ZWROYW1lfU91dGxldEVsZW1lbnRzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsZXRzLmZpbmRBbGwobmFtZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShjYW1lbGl6ZWROYW1lKX1PdXRsZXRgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGxldHMuaGFzKG5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBUYXJnZXRQcm9wZXJ0aWVzQmxlc3NpbmcoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCB0YXJnZXRzID0gcmVhZEluaGVyaXRhYmxlU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIFwidGFyZ2V0c1wiKTtcbiAgICByZXR1cm4gdGFyZ2V0cy5yZWR1Y2UoKHByb3BlcnRpZXMsIHRhcmdldERlZmluaXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgcHJvcGVydGllc0ZvclRhcmdldERlZmluaXRpb24odGFyZ2V0RGVmaW5pdGlvbikpO1xuICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIHByb3BlcnRpZXNGb3JUYXJnZXREZWZpbml0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBbYCR7bmFtZX1UYXJnZXRgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0cy5maW5kKG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyB0YXJnZXQgZWxlbWVudCBcIiR7bmFtZX1cIiBmb3IgXCIke3RoaXMuaWRlbnRpZmllcn1cIiBjb250cm9sbGVyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2Ake25hbWV9VGFyZ2V0c2BdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0cy5maW5kQWxsKG5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2BoYXMke2NhcGl0YWxpemUobmFtZSl9VGFyZ2V0YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXRzLmhhcyhuYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gVmFsdWVQcm9wZXJ0aWVzQmxlc3NpbmcoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCB2YWx1ZURlZmluaXRpb25QYWlycyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY09iamVjdFBhaXJzKGNvbnN0cnVjdG9yLCBcInZhbHVlc1wiKTtcbiAgICBjb25zdCBwcm9wZXJ0eURlc2NyaXB0b3JNYXAgPSB7XG4gICAgICAgIHZhbHVlRGVzY3JpcHRvck1hcDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZURlZmluaXRpb25QYWlycy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWVEZWZpbml0aW9uUGFpcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURlc2NyaXB0b3IgPSBwYXJzZVZhbHVlRGVmaW5pdGlvblBhaXIodmFsdWVEZWZpbml0aW9uUGFpciwgdGhpcy5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHRoaXMuZGF0YS5nZXRBdHRyaWJ1dGVOYW1lRm9yS2V5KHZhbHVlRGVzY3JpcHRvci5rZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2F0dHJpYnV0ZU5hbWVdOiB2YWx1ZURlc2NyaXB0b3IgfSk7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB2YWx1ZURlZmluaXRpb25QYWlycy5yZWR1Y2UoKHByb3BlcnRpZXMsIHZhbHVlRGVmaW5pdGlvblBhaXIpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgcHJvcGVydGllc0ZvclZhbHVlRGVmaW5pdGlvblBhaXIodmFsdWVEZWZpbml0aW9uUGFpcikpO1xuICAgIH0sIHByb3BlcnR5RGVzY3JpcHRvck1hcCk7XG59XG5mdW5jdGlvbiBwcm9wZXJ0aWVzRm9yVmFsdWVEZWZpbml0aW9uUGFpcih2YWx1ZURlZmluaXRpb25QYWlyLCBjb250cm9sbGVyKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHBhcnNlVmFsdWVEZWZpbml0aW9uUGFpcih2YWx1ZURlZmluaXRpb25QYWlyLCBjb250cm9sbGVyKTtcbiAgICBjb25zdCB7IGtleSwgbmFtZSwgcmVhZGVyOiByZWFkLCB3cml0ZXI6IHdyaXRlIH0gPSBkZWZpbml0aW9uO1xuICAgIHJldHVybiB7XG4gICAgICAgIFtuYW1lXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoa2V5LCB3cml0ZSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtgaGFzJHtjYXBpdGFsaXplKG5hbWUpfWBdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXMoa2V5KSB8fCBkZWZpbml0aW9uLmhhc0N1c3RvbURlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVEZWZpbml0aW9uUGFpcihbdG9rZW4sIHR5cGVEZWZpbml0aW9uXSwgY29udHJvbGxlcikge1xuICAgIHJldHVybiB2YWx1ZURlc2NyaXB0b3JGb3JUb2tlbkFuZFR5cGVEZWZpbml0aW9uKHtcbiAgICAgICAgY29udHJvbGxlcixcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIHR5cGVEZWZpbml0aW9uLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGVDb25zdGFudChjb25zdGFudCkge1xuICAgIHN3aXRjaCAoY29uc3RhbnQpIHtcbiAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgIHJldHVybiBcImFycmF5XCI7XG4gICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgIHJldHVybiBcImJvb2xlYW5cIjtcbiAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3RcIjtcbiAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICB9XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlVHlwZURlZmF1bHQoZGVmYXVsdFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJib29sZWFuXCI7XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIHJldHVybiBcIm51bWJlclwiO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSlcbiAgICAgICAgcmV0dXJuIFwiYXJyYXlcIjtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRlZmF1bHRWYWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIpXG4gICAgICAgIHJldHVybiBcIm9iamVjdFwiO1xufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGVPYmplY3QocGF5bG9hZCkge1xuICAgIGNvbnN0IHR5cGVGcm9tT2JqZWN0ID0gcGFyc2VWYWx1ZVR5cGVDb25zdGFudChwYXlsb2FkLnR5cGVPYmplY3QudHlwZSk7XG4gICAgaWYgKCF0eXBlRnJvbU9iamVjdClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZVR5cGUgPSBwYXJzZVZhbHVlVHlwZURlZmF1bHQocGF5bG9hZC50eXBlT2JqZWN0LmRlZmF1bHQpO1xuICAgIGlmICh0eXBlRnJvbU9iamVjdCAhPT0gZGVmYXVsdFZhbHVlVHlwZSkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eVBhdGggPSBwYXlsb2FkLmNvbnRyb2xsZXIgPyBgJHtwYXlsb2FkLmNvbnRyb2xsZXJ9LiR7cGF5bG9hZC50b2tlbn1gIDogcGF5bG9hZC50b2tlbjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3BlY2lmaWVkIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBTdGltdWx1cyBWYWx1ZSBcIiR7cHJvcGVydHlQYXRofVwiIG11c3QgbWF0Y2ggdGhlIGRlZmluZWQgdHlwZSBcIiR7dHlwZUZyb21PYmplY3R9XCIuIFRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlIG9mIFwiJHtwYXlsb2FkLnR5cGVPYmplY3QuZGVmYXVsdH1cIiBpcyBvZiB0eXBlIFwiJHtkZWZhdWx0VmFsdWVUeXBlfVwiLmApO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZUZyb21PYmplY3Q7XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlVHlwZURlZmluaXRpb24ocGF5bG9hZCkge1xuICAgIGNvbnN0IHR5cGVGcm9tT2JqZWN0ID0gcGFyc2VWYWx1ZVR5cGVPYmplY3Qoe1xuICAgICAgICBjb250cm9sbGVyOiBwYXlsb2FkLmNvbnRyb2xsZXIsXG4gICAgICAgIHRva2VuOiBwYXlsb2FkLnRva2VuLFxuICAgICAgICB0eXBlT2JqZWN0OiBwYXlsb2FkLnR5cGVEZWZpbml0aW9uLFxuICAgIH0pO1xuICAgIGNvbnN0IHR5cGVGcm9tRGVmYXVsdFZhbHVlID0gcGFyc2VWYWx1ZVR5cGVEZWZhdWx0KHBheWxvYWQudHlwZURlZmluaXRpb24pO1xuICAgIGNvbnN0IHR5cGVGcm9tQ29uc3RhbnQgPSBwYXJzZVZhbHVlVHlwZUNvbnN0YW50KHBheWxvYWQudHlwZURlZmluaXRpb24pO1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlRnJvbU9iamVjdCB8fCB0eXBlRnJvbURlZmF1bHRWYWx1ZSB8fCB0eXBlRnJvbUNvbnN0YW50O1xuICAgIGlmICh0eXBlKVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICBjb25zdCBwcm9wZXJ0eVBhdGggPSBwYXlsb2FkLmNvbnRyb2xsZXIgPyBgJHtwYXlsb2FkLmNvbnRyb2xsZXJ9LiR7cGF5bG9hZC50eXBlRGVmaW5pdGlvbn1gIDogcGF5bG9hZC50b2tlbjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdmFsdWUgdHlwZSBcIiR7cHJvcGVydHlQYXRofVwiIGZvciBcIiR7cGF5bG9hZC50b2tlbn1cIiB2YWx1ZWApO1xufVxuZnVuY3Rpb24gZGVmYXVsdFZhbHVlRm9yRGVmaW5pdGlvbih0eXBlRGVmaW5pdGlvbikge1xuICAgIGNvbnN0IGNvbnN0YW50ID0gcGFyc2VWYWx1ZVR5cGVDb25zdGFudCh0eXBlRGVmaW5pdGlvbik7XG4gICAgaWYgKGNvbnN0YW50KVxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlc0J5VHlwZVtjb25zdGFudF07XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdHlwZURlZmluaXRpb24uZGVmYXVsdDtcbiAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgcmV0dXJuIHR5cGVEZWZpbml0aW9uO1xufVxuZnVuY3Rpb24gdmFsdWVEZXNjcmlwdG9yRm9yVG9rZW5BbmRUeXBlRGVmaW5pdGlvbihwYXlsb2FkKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7ZGFzaGVyaXplKHBheWxvYWQudG9rZW4pfS12YWx1ZWA7XG4gICAgY29uc3QgdHlwZSA9IHBhcnNlVmFsdWVUeXBlRGVmaW5pdGlvbihwYXlsb2FkKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBrZXksXG4gICAgICAgIG5hbWU6IGNhbWVsaXplKGtleSksXG4gICAgICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlRm9yRGVmaW5pdGlvbihwYXlsb2FkLnR5cGVEZWZpbml0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGhhc0N1c3RvbURlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVZhbHVlVHlwZURlZmF1bHQocGF5bG9hZC50eXBlRGVmaW5pdGlvbikgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZGVyOiByZWFkZXJzW3R5cGVdLFxuICAgICAgICB3cml0ZXI6IHdyaXRlcnNbdHlwZV0gfHwgd3JpdGVycy5kZWZhdWx0LFxuICAgIH07XG59XG5jb25zdCBkZWZhdWx0VmFsdWVzQnlUeXBlID0ge1xuICAgIGdldCBhcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgYm9vbGVhbjogZmFsc2UsXG4gICAgbnVtYmVyOiAwLFxuICAgIGdldCBvYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9LFxuICAgIHN0cmluZzogXCJcIixcbn07XG5jb25zdCByZWFkZXJzID0ge1xuICAgIGFycmF5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGV4cGVjdGVkIHZhbHVlIG9mIHR5cGUgXCJhcnJheVwiIGJ1dCBpbnN0ZWFkIGdvdCB2YWx1ZSBcIiR7dmFsdWV9XCIgb2YgdHlwZSBcIiR7cGFyc2VWYWx1ZVR5cGVEZWZhdWx0KGFycmF5KX1cImApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9LFxuICAgIGJvb2xlYW4odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICEodmFsdWUgPT0gXCIwXCIgfHwgU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpID09IFwiZmFsc2VcIik7XG4gICAgfSxcbiAgICBudW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfSxcbiAgICBvYmplY3QodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIGlmIChvYmplY3QgPT09IG51bGwgfHwgdHlwZW9mIG9iamVjdCAhPSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZXhwZWN0ZWQgdmFsdWUgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBpbnN0ZWFkIGdvdCB2YWx1ZSBcIiR7dmFsdWV9XCIgb2YgdHlwZSBcIiR7cGFyc2VWYWx1ZVR5cGVEZWZhdWx0KG9iamVjdCl9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sXG4gICAgc3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxufTtcbmNvbnN0IHdyaXRlcnMgPSB7XG4gICAgZGVmYXVsdDogd3JpdGVTdHJpbmcsXG4gICAgYXJyYXk6IHdyaXRlSlNPTixcbiAgICBvYmplY3Q6IHdyaXRlSlNPTixcbn07XG5mdW5jdGlvbiB3cml0ZUpTT04odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuZnVuY3Rpb24gd3JpdGVTdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gYCR7dmFsdWV9YDtcbn1cblxuY2xhc3MgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHNob3VsZExvYWQoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgYWZ0ZXJMb2FkKF9pZGVudGlmaWVyLCBfYXBwbGljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnZXQgYXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYXBwbGljYXRpb247XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zY29wZTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgdGFyZ2V0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUudGFyZ2V0cztcbiAgICB9XG4gICAgZ2V0IG91dGxldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLm91dGxldHM7XG4gICAgfVxuICAgIGdldCBjbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5jbGFzc2VzO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZGF0YTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICB9XG4gICAgZGlzcGF0Y2goZXZlbnROYW1lLCB7IHRhcmdldCA9IHRoaXMuZWxlbWVudCwgZGV0YWlsID0ge30sIHByZWZpeCA9IHRoaXMuaWRlbnRpZmllciwgYnViYmxlcyA9IHRydWUsIGNhbmNlbGFibGUgPSB0cnVlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCB0eXBlID0gcHJlZml4ID8gYCR7cHJlZml4fToke2V2ZW50TmFtZX1gIDogZXZlbnROYW1lO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbCwgYnViYmxlcywgY2FuY2VsYWJsZSB9KTtcbiAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxufVxuQ29udHJvbGxlci5ibGVzc2luZ3MgPSBbXG4gICAgQ2xhc3NQcm9wZXJ0aWVzQmxlc3NpbmcsXG4gICAgVGFyZ2V0UHJvcGVydGllc0JsZXNzaW5nLFxuICAgIFZhbHVlUHJvcGVydGllc0JsZXNzaW5nLFxuICAgIE91dGxldFByb3BlcnRpZXNCbGVzc2luZyxcbl07XG5Db250cm9sbGVyLnRhcmdldHMgPSBbXTtcbkNvbnRyb2xsZXIub3V0bGV0cyA9IFtdO1xuQ29udHJvbGxlci52YWx1ZXMgPSB7fTtcblxuZXhwb3J0IHsgQXBwbGljYXRpb24sIEF0dHJpYnV0ZU9ic2VydmVyLCBDb250ZXh0LCBDb250cm9sbGVyLCBFbGVtZW50T2JzZXJ2ZXIsIEluZGV4ZWRNdWx0aW1hcCwgTXVsdGltYXAsIFNlbGVjdG9yT2JzZXJ2ZXIsIFN0cmluZ01hcE9ic2VydmVyLCBUb2tlbkxpc3RPYnNlcnZlciwgVmFsdWVMaXN0T2JzZXJ2ZXIsIGFkZCwgZGVmYXVsdFNjaGVtYSwgZGVsLCBmZXRjaCwgcHJ1bmUgfTtcbiIsICJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnQGhvdHdpcmVkL3N0aW11bHVzJztcblxuZXhwb3J0IGNsYXNzIENsaXBib2FyZENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgc3RhdGljIHRhcmdldHMgPSBbJ3NvdXJjZSddO1xuICBzb3VyY2VUYXJnZXQ6IGFueTtcblxuICBjb3B5KCkge1xuXG4gICAgdGhpcy5kaXNwYXRjaCgnY29weScsIHtcbiAgICAgIGRldGFpbDogeyBjb250ZW50OiB0aGlzLnNvdXJjZVRhcmdldC52YWx1ZSB9XG4gICAgfSk7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy5zb3VyY2VUYXJnZXQudmFsdWUpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkQ29udHJvbGxlciB9IGZyb20gJ3F1eC1hbGlhcydcblxuQ2xpcGJvYXJkQ29udHJvbGxlci50YXJnZXRzLnBvcCgpXG5cbkFwcGxpY2F0aW9uLnN0YXJ0KCk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBSUEsSUFBTSxnQkFBTixNQUFvQjtBQUFBLEVBQ2hCLFlBQVksYUFBYSxXQUFXLGNBQWM7QUFDOUMsU0FBSyxjQUFjO0FBQ25CLFNBQUssWUFBWTtBQUNqQixTQUFLLGVBQWU7QUFDcEIsU0FBSyxvQkFBb0Isb0JBQUksSUFBSTtBQUFBLEVBQ3JDO0FBQUEsRUFDQSxVQUFVO0FBQ04sU0FBSyxZQUFZLGlCQUFpQixLQUFLLFdBQVcsTUFBTSxLQUFLLFlBQVk7QUFBQSxFQUM3RTtBQUFBLEVBQ0EsYUFBYTtBQUNULFNBQUssWUFBWSxvQkFBb0IsS0FBSyxXQUFXLE1BQU0sS0FBSyxZQUFZO0FBQUEsRUFDaEY7QUFBQSxFQUNBLGlCQUFpQixTQUFTO0FBQ3RCLFNBQUssa0JBQWtCLElBQUksT0FBTztBQUFBLEVBQ3RDO0FBQUEsRUFDQSxvQkFBb0IsU0FBUztBQUN6QixTQUFLLGtCQUFrQixPQUFPLE9BQU87QUFBQSxFQUN6QztBQUFBLEVBQ0EsWUFBWSxPQUFPO0FBQ2YsVUFBTSxnQkFBZ0IsWUFBWSxLQUFLO0FBQ3ZDLGVBQVcsV0FBVyxLQUFLLFVBQVU7QUFDakMsVUFBSSxjQUFjLDZCQUE2QjtBQUMzQztBQUFBLE1BQ0osT0FDSztBQUNELGdCQUFRLFlBQVksYUFBYTtBQUFBLE1BQ3JDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLGNBQWM7QUFDVixXQUFPLEtBQUssa0JBQWtCLE9BQU87QUFBQSxFQUN6QztBQUFBLEVBQ0EsSUFBSSxXQUFXO0FBQ1gsV0FBTyxNQUFNLEtBQUssS0FBSyxp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QU0sT0FBTyxTQUFTLEdBQUcsTUFBTSxJQUFJLFNBQVMsS0FBSztBQUNqRCxVQUFNLFFBQVEsSUFBSSxZQUFZLE1BQU0sRUFBRSxRQUFRLFNBQVMsV0FBVyxDQUFDO0FBQ25FLFdBQU8sY0FBYyxLQUFLO0FBQzFCLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUFDQSxXQUFXLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNKO0FBQ0EsV0FBVyxVQUFVLENBQUM7QUFDdEIsV0FBVyxVQUFVLENBQUM7QUFDdEIsV0FBVyxTQUFTLENBQUM7OztBQ24yRWQsSUFBTSxzQkFBTixjQUFrQyxXQUFXO0FBQUEsRUFDbEQ7QUFBQSxTQUFPLFVBQVUsQ0FBQyxRQUFRO0FBQUE7QUFBQSxFQUcxQixPQUFPO0FBRUwsU0FBSyxTQUFTLFFBQVE7QUFBQSxNQUNwQixRQUFRLEVBQUUsU0FBUyxLQUFLLGFBQWEsTUFBTTtBQUFBLElBQzdDLENBQUM7QUFDRCxjQUFVLFVBQVUsVUFBVSxLQUFLLGFBQWEsS0FBSztBQUFBLEVBQ3ZEO0FBQ0Y7OztBQ1ZBLG9CQUFvQixRQUFRLElBQUk7QUFFaEMsWUFBWSxNQUFNOyIsCiAgIm5hbWVzIjogWyJlcnJvciIsICJtYXRjaCIsICJvbGRWYWx1ZSIsICJlcnJvciIsICJjb25zdHJ1Y3RvciIsICJlbGVtZW50Il0KfQo=
</script>