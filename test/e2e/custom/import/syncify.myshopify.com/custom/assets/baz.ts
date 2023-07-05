var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/vnode.js
var require_vnode = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/vnode.js"(exports, module) {
    "use strict";
    function Vnode(tag, key, attrs, children, text, dom) {
      return { tag, key, attrs, children, text, dom, domSize: void 0, state: void 0, events: void 0, instance: void 0 };
    }
    Vnode.normalize = function(node) {
      if (Array.isArray(node))
        return Vnode("[", void 0, void 0, Vnode.normalizeChildren(node), void 0, void 0);
      if (node == null || typeof node === "boolean")
        return null;
      if (typeof node === "object")
        return node;
      return Vnode("#", void 0, void 0, String(node), void 0, void 0);
    };
    Vnode.normalizeChildren = function(input) {
      var children = [];
      if (input.length) {
        var isKeyed = input[0] != null && input[0].key != null;
        for (var i = 1; i < input.length; i++) {
          if ((input[i] != null && input[i].key != null) !== isKeyed) {
            throw new TypeError(
              isKeyed && (input[i] != null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys."
            );
          }
        }
        for (var i = 0; i < input.length; i++) {
          children[i] = Vnode.normalize(input[i]);
        }
      }
      return children;
    };
    module.exports = Vnode;
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/hyperscriptVnode.js
var require_hyperscriptVnode = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/hyperscriptVnode.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function() {
      var attrs = arguments[this], start = this + 1, children;
      if (attrs == null) {
        attrs = {};
      } else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
        attrs = {};
        start = this;
      }
      if (arguments.length === start + 1) {
        children = arguments[start];
        if (!Array.isArray(children))
          children = [children];
      } else {
        children = [];
        while (start < arguments.length)
          children.push(arguments[start++]);
      }
      return Vnode("", attrs.key, attrs, children);
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/hasOwn.js
var require_hasOwn = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/hasOwn.js"(exports, module) {
    "use strict";
    module.exports = {}.hasOwnProperty;
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/hyperscript.js
var require_hyperscript = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/hyperscript.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var hyperscriptVnode = require_hyperscriptVnode();
    var hasOwn = require_hasOwn();
    var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
    var selectorCache = {};
    function isEmpty(object) {
      for (var key in object)
        if (hasOwn.call(object, key))
          return false;
      return true;
    }
    function compileSelector(selector) {
      var match, tag = "div", classes = [], attrs = {};
      while (match = selectorParser.exec(selector)) {
        var type = match[1], value = match[2];
        if (type === "" && value !== "")
          tag = value;
        else if (type === "#")
          attrs.id = value;
        else if (type === ".")
          classes.push(value);
        else if (match[3][0] === "[") {
          var attrValue = match[6];
          if (attrValue)
            attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
          if (match[4] === "class")
            classes.push(attrValue);
          else
            attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
        }
      }
      if (classes.length > 0)
        attrs.className = classes.join(" ");
      return selectorCache[selector] = { tag, attrs };
    }
    function execSelector(state, vnode) {
      var attrs = vnode.attrs;
      var hasClass = hasOwn.call(attrs, "class");
      var className = hasClass ? attrs.class : attrs.className;
      vnode.tag = state.tag;
      vnode.attrs = {};
      if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
        var newAttrs = {};
        for (var key in attrs) {
          if (hasOwn.call(attrs, key))
            newAttrs[key] = attrs[key];
        }
        attrs = newAttrs;
      }
      for (var key in state.attrs) {
        if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) {
          attrs[key] = state.attrs[key];
        }
      }
      if (className != null || state.attrs.className != null)
        attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
      if (hasClass)
        attrs.class = null;
      for (var key in attrs) {
        if (hasOwn.call(attrs, key) && key !== "key") {
          vnode.attrs = attrs;
          break;
        }
      }
      return vnode;
    }
    function hyperscript(selector) {
      if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
        throw Error("The selector must be either a string or a component.");
      }
      var vnode = hyperscriptVnode.apply(1, arguments);
      if (typeof selector === "string") {
        vnode.children = Vnode.normalizeChildren(vnode.children);
        if (selector !== "[")
          return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
      }
      vnode.tag = selector;
      return vnode;
    }
    module.exports = hyperscript;
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/trust.js
var require_trust = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/trust.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(html) {
      if (html == null)
        html = "";
      return Vnode("<", void 0, void 0, html, void 0, void 0);
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/fragment.js
var require_fragment = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/fragment.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var hyperscriptVnode = require_hyperscriptVnode();
    module.exports = function() {
      var vnode = hyperscriptVnode.apply(0, arguments);
      vnode.tag = "[";
      vnode.children = Vnode.normalizeChildren(vnode.children);
      return vnode;
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/hyperscript.js
var require_hyperscript2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/hyperscript.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript();
    hyperscript.trust = require_trust();
    hyperscript.fragment = require_fragment();
    module.exports = hyperscript;
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/promise/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/promise/polyfill.js"(exports, module) {
    "use strict";
    var PromisePolyfill = function(executor) {
      if (!(this instanceof PromisePolyfill))
        throw new Error("Promise must be called with 'new'.");
      if (typeof executor !== "function")
        throw new TypeError("executor must be a function.");
      var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
      var instance = self._instance = { resolvers, rejectors };
      var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
      function handler(list, shouldAbsorb) {
        return function execute(value) {
          var then;
          try {
            if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
              if (value === self)
                throw new TypeError("Promise can't be resolved with itself.");
              executeOnce(then.bind(value));
            } else {
              callAsync(function() {
                if (!shouldAbsorb && list.length === 0)
                  console.error("Possible unhandled promise rejection:", value);
                for (var i = 0; i < list.length; i++)
                  list[i](value);
                resolvers.length = 0, rejectors.length = 0;
                instance.state = shouldAbsorb;
                instance.retry = function() {
                  execute(value);
                };
              });
            }
          } catch (e) {
            rejectCurrent(e);
          }
        };
      }
      function executeOnce(then) {
        var runs = 0;
        function run(fn) {
          return function(value) {
            if (runs++ > 0)
              return;
            fn(value);
          };
        }
        var onerror = run(rejectCurrent);
        try {
          then(run(resolveCurrent), onerror);
        } catch (e) {
          onerror(e);
        }
      }
      executeOnce(executor);
    };
    PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
      var self = this, instance = self._instance;
      function handle(callback, list, next, state) {
        list.push(function(value) {
          if (typeof callback !== "function")
            next(value);
          else
            try {
              resolveNext(callback(value));
            } catch (e) {
              if (rejectNext)
                rejectNext(e);
            }
        });
        if (typeof instance.retry === "function" && state === instance.state)
          instance.retry();
      }
      var resolveNext, rejectNext;
      var promise = new PromisePolyfill(function(resolve, reject) {
        resolveNext = resolve, rejectNext = reject;
      });
      handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
      return promise;
    };
    PromisePolyfill.prototype.catch = function(onRejection) {
      return this.then(null, onRejection);
    };
    PromisePolyfill.prototype.finally = function(callback) {
      return this.then(
        function(value) {
          return PromisePolyfill.resolve(callback()).then(function() {
            return value;
          });
        },
        function(reason) {
          return PromisePolyfill.resolve(callback()).then(function() {
            return PromisePolyfill.reject(reason);
          });
        }
      );
    };
    PromisePolyfill.resolve = function(value) {
      if (value instanceof PromisePolyfill)
        return value;
      return new PromisePolyfill(function(resolve) {
        resolve(value);
      });
    };
    PromisePolyfill.reject = function(value) {
      return new PromisePolyfill(function(resolve, reject) {
        reject(value);
      });
    };
    PromisePolyfill.all = function(list) {
      return new PromisePolyfill(function(resolve, reject) {
        var total = list.length, count = 0, values = [];
        if (list.length === 0)
          resolve([]);
        else
          for (var i = 0; i < list.length; i++) {
            (function(i2) {
              function consume(value) {
                count++;
                values[i2] = value;
                if (count === total)
                  resolve(values);
              }
              if (list[i2] != null && (typeof list[i2] === "object" || typeof list[i2] === "function") && typeof list[i2].then === "function") {
                list[i2].then(consume, reject);
              } else
                consume(list[i2]);
            })(i);
          }
      });
    };
    PromisePolyfill.race = function(list) {
      return new PromisePolyfill(function(resolve, reject) {
        for (var i = 0; i < list.length; i++) {
          list[i].then(resolve, reject);
        }
      });
    };
    module.exports = PromisePolyfill;
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/promise/promise.js
var require_promise = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/promise/promise.js"(exports, module) {
    "use strict";
    var PromisePolyfill = require_polyfill();
    if (typeof window !== "undefined") {
      if (typeof window.Promise === "undefined") {
        window.Promise = PromisePolyfill;
      } else if (!window.Promise.prototype.finally) {
        window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
      }
      module.exports = window.Promise;
    } else if (typeof global !== "undefined") {
      if (typeof global.Promise === "undefined") {
        global.Promise = PromisePolyfill;
      } else if (!global.Promise.prototype.finally) {
        global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
      }
      module.exports = global.Promise;
    } else {
      module.exports = PromisePolyfill;
    }
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/render.js
var require_render = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render/render.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function($window) {
      var $doc = $window && $window.document;
      var currentRedraw;
      var nameSpace = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML"
      };
      function getNameSpace(vnode) {
        return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
      }
      function checkState(vnode, original) {
        if (vnode.state !== original)
          throw new Error("'vnode.state' must not be modified.");
      }
      function callHook(vnode) {
        var original = vnode.state;
        try {
          return this.apply(original, arguments);
        } finally {
          checkState(vnode, original);
        }
      }
      function activeElement() {
        try {
          return $doc.activeElement;
        } catch (e) {
          return null;
        }
      }
      function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
        for (var i = start; i < end; i++) {
          var vnode = vnodes[i];
          if (vnode != null) {
            createNode(parent, vnode, hooks, ns, nextSibling);
          }
        }
      }
      function createNode(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        if (typeof tag === "string") {
          vnode.state = {};
          if (vnode.attrs != null)
            initLifecycle(vnode.attrs, vnode, hooks);
          switch (tag) {
            case "#":
              createText(parent, vnode, nextSibling);
              break;
            case "<":
              createHTML(parent, vnode, ns, nextSibling);
              break;
            case "[":
              createFragment(parent, vnode, hooks, ns, nextSibling);
              break;
            default:
              createElement(parent, vnode, hooks, ns, nextSibling);
          }
        } else
          createComponent(parent, vnode, hooks, ns, nextSibling);
      }
      function createText(parent, vnode, nextSibling) {
        vnode.dom = $doc.createTextNode(vnode.children);
        insertNode(parent, vnode.dom, nextSibling);
      }
      var possibleParents = { caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup" };
      function createHTML(parent, vnode, ns, nextSibling) {
        var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
        var temp = $doc.createElement(possibleParents[match[1]] || "div");
        if (ns === "http://www.w3.org/2000/svg") {
          temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + vnode.children + "</svg>";
          temp = temp.firstChild;
        } else {
          temp.innerHTML = vnode.children;
        }
        vnode.dom = temp.firstChild;
        vnode.domSize = temp.childNodes.length;
        vnode.instance = [];
        var fragment = $doc.createDocumentFragment();
        var child;
        while (child = temp.firstChild) {
          vnode.instance.push(child);
          fragment.appendChild(child);
        }
        insertNode(parent, fragment, nextSibling);
      }
      function createFragment(parent, vnode, hooks, ns, nextSibling) {
        var fragment = $doc.createDocumentFragment();
        if (vnode.children != null) {
          var children = vnode.children;
          createNodes(fragment, children, 0, children.length, hooks, null, ns);
        }
        vnode.dom = fragment.firstChild;
        vnode.domSize = fragment.childNodes.length;
        insertNode(parent, fragment, nextSibling);
      }
      function createElement(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        var attrs = vnode.attrs;
        var is = attrs && attrs.is;
        ns = getNameSpace(vnode) || ns;
        var element = ns ? is ? $doc.createElementNS(ns, tag, { is }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, { is }) : $doc.createElement(tag);
        vnode.dom = element;
        if (attrs != null) {
          setAttrs(vnode, attrs, ns);
        }
        insertNode(parent, element, nextSibling);
        if (!maybeSetContentEditable(vnode)) {
          if (vnode.children != null) {
            var children = vnode.children;
            createNodes(element, children, 0, children.length, hooks, null, ns);
            if (vnode.tag === "select" && attrs != null)
              setLateSelectAttrs(vnode, attrs);
          }
        }
      }
      function initComponent(vnode, hooks) {
        var sentinel;
        if (typeof vnode.tag.view === "function") {
          vnode.state = Object.create(vnode.tag);
          sentinel = vnode.state.view;
          if (sentinel.$$reentrantLock$$ != null)
            return;
          sentinel.$$reentrantLock$$ = true;
        } else {
          vnode.state = void 0;
          sentinel = vnode.tag;
          if (sentinel.$$reentrantLock$$ != null)
            return;
          sentinel.$$reentrantLock$$ = true;
          vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
        }
        initLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null)
          initLifecycle(vnode.attrs, vnode, hooks);
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode)
          throw Error("A view cannot return the vnode it received as argument");
        sentinel.$$reentrantLock$$ = null;
      }
      function createComponent(parent, vnode, hooks, ns, nextSibling) {
        initComponent(vnode, hooks);
        if (vnode.instance != null) {
          createNode(parent, vnode.instance, hooks, ns, nextSibling);
          vnode.dom = vnode.instance.dom;
          vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
        } else {
          vnode.domSize = 0;
        }
      }
      function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
        if (old === vnodes || old == null && vnodes == null)
          return;
        else if (old == null || old.length === 0)
          createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
        else if (vnodes == null || vnodes.length === 0)
          removeNodes(parent, old, 0, old.length);
        else {
          var isOldKeyed = old[0] != null && old[0].key != null;
          var isKeyed = vnodes[0] != null && vnodes[0].key != null;
          var start = 0, oldStart = 0;
          if (!isOldKeyed)
            while (oldStart < old.length && old[oldStart] == null)
              oldStart++;
          if (!isKeyed)
            while (start < vnodes.length && vnodes[start] == null)
              start++;
          if (isOldKeyed !== isKeyed) {
            removeNodes(parent, old, oldStart, old.length);
            createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
          } else if (!isKeyed) {
            var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
            start = start < oldStart ? start : oldStart;
            for (; start < commonLength; start++) {
              o = old[start];
              v = vnodes[start];
              if (o === v || o == null && v == null)
                continue;
              else if (o == null)
                createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
              else if (v == null)
                removeNode(parent, o);
              else
                updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
            }
            if (old.length > commonLength)
              removeNodes(parent, old, start, old.length);
            if (vnodes.length > commonLength)
              createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
          } else {
            var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
            while (oldEnd >= oldStart && end >= start) {
              oe = old[oldEnd];
              ve = vnodes[end];
              if (oe.key !== ve.key)
                break;
              if (oe !== ve)
                updateNode(parent, oe, ve, hooks, nextSibling, ns);
              if (ve.dom != null)
                nextSibling = ve.dom;
              oldEnd--, end--;
            }
            while (oldEnd >= oldStart && end >= start) {
              o = old[oldStart];
              v = vnodes[start];
              if (o.key !== v.key)
                break;
              oldStart++, start++;
              if (o !== v)
                updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
            }
            while (oldEnd >= oldStart && end >= start) {
              if (start === end)
                break;
              if (o.key !== ve.key || oe.key !== v.key)
                break;
              topSibling = getNextSibling(old, oldStart, nextSibling);
              moveNodes(parent, oe, topSibling);
              if (oe !== v)
                updateNode(parent, oe, v, hooks, topSibling, ns);
              if (++start <= --end)
                moveNodes(parent, o, nextSibling);
              if (o !== ve)
                updateNode(parent, o, ve, hooks, nextSibling, ns);
              if (ve.dom != null)
                nextSibling = ve.dom;
              oldStart++;
              oldEnd--;
              oe = old[oldEnd];
              ve = vnodes[end];
              o = old[oldStart];
              v = vnodes[start];
            }
            while (oldEnd >= oldStart && end >= start) {
              if (oe.key !== ve.key)
                break;
              if (oe !== ve)
                updateNode(parent, oe, ve, hooks, nextSibling, ns);
              if (ve.dom != null)
                nextSibling = ve.dom;
              oldEnd--, end--;
              oe = old[oldEnd];
              ve = vnodes[end];
            }
            if (start > end)
              removeNodes(parent, old, oldStart, oldEnd + 1);
            else if (oldStart > oldEnd)
              createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
            else {
              var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
              for (i = 0; i < vnodesLength; i++)
                oldIndices[i] = -1;
              for (i = end; i >= start; i--) {
                if (map == null)
                  map = getKeyMap(old, oldStart, oldEnd + 1);
                ve = vnodes[i];
                var oldIndex = map[ve.key];
                if (oldIndex != null) {
                  pos = oldIndex < pos ? oldIndex : -1;
                  oldIndices[i - start] = oldIndex;
                  oe = old[oldIndex];
                  old[oldIndex] = null;
                  if (oe !== ve)
                    updateNode(parent, oe, ve, hooks, nextSibling, ns);
                  if (ve.dom != null)
                    nextSibling = ve.dom;
                  matched++;
                }
              }
              nextSibling = originalNextSibling;
              if (matched !== oldEnd - oldStart + 1)
                removeNodes(parent, old, oldStart, oldEnd + 1);
              if (matched === 0)
                createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
              else {
                if (pos === -1) {
                  lisIndices = makeLisIndices(oldIndices);
                  li = lisIndices.length - 1;
                  for (i = end; i >= start; i--) {
                    v = vnodes[i];
                    if (oldIndices[i - start] === -1)
                      createNode(parent, v, hooks, ns, nextSibling);
                    else {
                      if (lisIndices[li] === i - start)
                        li--;
                      else
                        moveNodes(parent, v, nextSibling);
                    }
                    if (v.dom != null)
                      nextSibling = vnodes[i].dom;
                  }
                } else {
                  for (i = end; i >= start; i--) {
                    v = vnodes[i];
                    if (oldIndices[i - start] === -1)
                      createNode(parent, v, hooks, ns, nextSibling);
                    if (v.dom != null)
                      nextSibling = vnodes[i].dom;
                  }
                }
              }
            }
          }
        }
      }
      function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
        var oldTag = old.tag, tag = vnode.tag;
        if (oldTag === tag) {
          vnode.state = old.state;
          vnode.events = old.events;
          if (shouldNotUpdate(vnode, old))
            return;
          if (typeof oldTag === "string") {
            if (vnode.attrs != null) {
              updateLifecycle(vnode.attrs, vnode, hooks);
            }
            switch (oldTag) {
              case "#":
                updateText(old, vnode);
                break;
              case "<":
                updateHTML(parent, old, vnode, ns, nextSibling);
                break;
              case "[":
                updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                break;
              default:
                updateElement(old, vnode, hooks, ns);
            }
          } else
            updateComponent(parent, old, vnode, hooks, nextSibling, ns);
        } else {
          removeNode(parent, old);
          createNode(parent, vnode, hooks, ns, nextSibling);
        }
      }
      function updateText(old, vnode) {
        if (old.children.toString() !== vnode.children.toString()) {
          old.dom.nodeValue = vnode.children;
        }
        vnode.dom = old.dom;
      }
      function updateHTML(parent, old, vnode, ns, nextSibling) {
        if (old.children !== vnode.children) {
          removeHTML(parent, old);
          createHTML(parent, vnode, ns, nextSibling);
        } else {
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
          vnode.instance = old.instance;
        }
      }
      function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
        updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
        var domSize = 0, children = vnode.children;
        vnode.dom = null;
        if (children != null) {
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child != null && child.dom != null) {
              if (vnode.dom == null)
                vnode.dom = child.dom;
              domSize += child.domSize || 1;
            }
          }
          if (domSize !== 1)
            vnode.domSize = domSize;
        }
      }
      function updateElement(old, vnode, hooks, ns) {
        var element = vnode.dom = old.dom;
        ns = getNameSpace(vnode) || ns;
        if (vnode.tag === "textarea") {
          if (vnode.attrs == null)
            vnode.attrs = {};
        }
        updateAttrs(vnode, old.attrs, vnode.attrs, ns);
        if (!maybeSetContentEditable(vnode)) {
          updateNodes(element, old.children, vnode.children, hooks, null, ns);
        }
      }
      function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode)
          throw Error("A view cannot return the vnode it received as argument");
        updateLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null)
          updateLifecycle(vnode.attrs, vnode, hooks);
        if (vnode.instance != null) {
          if (old.instance == null)
            createNode(parent, vnode.instance, hooks, ns, nextSibling);
          else
            updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
          vnode.dom = vnode.instance.dom;
          vnode.domSize = vnode.instance.domSize;
        } else if (old.instance != null) {
          removeNode(parent, old.instance);
          vnode.dom = void 0;
          vnode.domSize = 0;
        } else {
          vnode.dom = old.dom;
          vnode.domSize = old.domSize;
        }
      }
      function getKeyMap(vnodes, start, end) {
        var map = /* @__PURE__ */ Object.create(null);
        for (; start < end; start++) {
          var vnode = vnodes[start];
          if (vnode != null) {
            var key = vnode.key;
            if (key != null)
              map[key] = start;
          }
        }
        return map;
      }
      var lisTemp = [];
      function makeLisIndices(a) {
        var result = [0];
        var u = 0, v = 0, i = 0;
        var il = lisTemp.length = a.length;
        for (var i = 0; i < il; i++)
          lisTemp[i] = a[i];
        for (var i = 0; i < il; ++i) {
          if (a[i] === -1)
            continue;
          var j = result[result.length - 1];
          if (a[j] < a[i]) {
            lisTemp[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
            if (a[result[c]] < a[i]) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (a[i] < a[result[u]]) {
            if (u > 0)
              lisTemp[i] = result[u - 1];
            result[u] = i;
          }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
          result[u] = v;
          v = lisTemp[v];
        }
        lisTemp.length = 0;
        return result;
      }
      function getNextSibling(vnodes, i, nextSibling) {
        for (; i < vnodes.length; i++) {
          if (vnodes[i] != null && vnodes[i].dom != null)
            return vnodes[i].dom;
        }
        return nextSibling;
      }
      function moveNodes(parent, vnode, nextSibling) {
        var frag = $doc.createDocumentFragment();
        moveChildToFrag(parent, frag, vnode);
        insertNode(parent, frag, nextSibling);
      }
      function moveChildToFrag(parent, frag, vnode) {
        while (vnode.dom != null && vnode.dom.parentNode === parent) {
          if (typeof vnode.tag !== "string") {
            vnode = vnode.instance;
            if (vnode != null)
              continue;
          } else if (vnode.tag === "<") {
            for (var i = 0; i < vnode.instance.length; i++) {
              frag.appendChild(vnode.instance[i]);
            }
          } else if (vnode.tag !== "[") {
            frag.appendChild(vnode.dom);
          } else if (vnode.children.length === 1) {
            vnode = vnode.children[0];
            if (vnode != null)
              continue;
          } else {
            for (var i = 0; i < vnode.children.length; i++) {
              var child = vnode.children[i];
              if (child != null)
                moveChildToFrag(parent, frag, child);
            }
          }
          break;
        }
      }
      function insertNode(parent, dom, nextSibling) {
        if (nextSibling != null)
          parent.insertBefore(dom, nextSibling);
        else
          parent.appendChild(dom);
      }
      function maybeSetContentEditable(vnode) {
        if (vnode.attrs == null || vnode.attrs.contenteditable == null && // attribute
        vnode.attrs.contentEditable == null)
          return false;
        var children = vnode.children;
        if (children != null && children.length === 1 && children[0].tag === "<") {
          var content = children[0].children;
          if (vnode.dom.innerHTML !== content)
            vnode.dom.innerHTML = content;
        } else if (children != null && children.length !== 0)
          throw new Error("Child node of a contenteditable must be trusted.");
        return true;
      }
      function removeNodes(parent, vnodes, start, end) {
        for (var i = start; i < end; i++) {
          var vnode = vnodes[i];
          if (vnode != null)
            removeNode(parent, vnode);
        }
      }
      function removeNode(parent, vnode) {
        var mask = 0;
        var original = vnode.state;
        var stateResult, attrsResult;
        if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
          var result = callHook.call(vnode.state.onbeforeremove, vnode);
          if (result != null && typeof result.then === "function") {
            mask = 1;
            stateResult = result;
          }
        }
        if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
          var result = callHook.call(vnode.attrs.onbeforeremove, vnode);
          if (result != null && typeof result.then === "function") {
            mask |= 2;
            attrsResult = result;
          }
        }
        checkState(vnode, original);
        if (!mask) {
          onremove(vnode);
          removeChild(parent, vnode);
        } else {
          if (stateResult != null) {
            var next = function() {
              if (mask & 1) {
                mask &= 2;
                if (!mask)
                  reallyRemove();
              }
            };
            stateResult.then(next, next);
          }
          if (attrsResult != null) {
            var next = function() {
              if (mask & 2) {
                mask &= 1;
                if (!mask)
                  reallyRemove();
              }
            };
            attrsResult.then(next, next);
          }
        }
        function reallyRemove() {
          checkState(vnode, original);
          onremove(vnode);
          removeChild(parent, vnode);
        }
      }
      function removeHTML(parent, vnode) {
        for (var i = 0; i < vnode.instance.length; i++) {
          parent.removeChild(vnode.instance[i]);
        }
      }
      function removeChild(parent, vnode) {
        while (vnode.dom != null && vnode.dom.parentNode === parent) {
          if (typeof vnode.tag !== "string") {
            vnode = vnode.instance;
            if (vnode != null)
              continue;
          } else if (vnode.tag === "<") {
            removeHTML(parent, vnode);
          } else {
            if (vnode.tag !== "[") {
              parent.removeChild(vnode.dom);
              if (!Array.isArray(vnode.children))
                break;
            }
            if (vnode.children.length === 1) {
              vnode = vnode.children[0];
              if (vnode != null)
                continue;
            } else {
              for (var i = 0; i < vnode.children.length; i++) {
                var child = vnode.children[i];
                if (child != null)
                  removeChild(parent, child);
              }
            }
          }
          break;
        }
      }
      function onremove(vnode) {
        if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function")
          callHook.call(vnode.state.onremove, vnode);
        if (vnode.attrs && typeof vnode.attrs.onremove === "function")
          callHook.call(vnode.attrs.onremove, vnode);
        if (typeof vnode.tag !== "string") {
          if (vnode.instance != null)
            onremove(vnode.instance);
        } else {
          var children = vnode.children;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child != null)
                onremove(child);
            }
          }
        }
      }
      function setAttrs(vnode, attrs, ns) {
        if (vnode.tag === "input" && attrs.type != null)
          vnode.dom.setAttribute("type", attrs.type);
        var isFileInput = attrs != null && vnode.tag === "input" && attrs.type === "file";
        for (var key in attrs) {
          setAttr(vnode, key, null, attrs[key], ns, isFileInput);
        }
      }
      function setAttr(vnode, key, old, value, ns, isFileInput) {
        if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object" || key === "type" && vnode.tag === "input")
          return;
        if (key[0] === "o" && key[1] === "n")
          return updateEvent(vnode, key, value);
        if (key.slice(0, 6) === "xlink:")
          vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
        else if (key === "style")
          updateStyle(vnode.dom, old, value);
        else if (hasPropertyKey(vnode, key, ns)) {
          if (key === "value") {
            if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && (isFileInput || vnode.dom === activeElement()))
              return;
            if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value)
              return;
            if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value)
              return;
            if (isFileInput && "" + value !== "") {
              console.error("`value` is read-only on file inputs!");
              return;
            }
          }
          vnode.dom[key] = value;
        } else {
          if (typeof value === "boolean") {
            if (value)
              vnode.dom.setAttribute(key, "");
            else
              vnode.dom.removeAttribute(key);
          } else
            vnode.dom.setAttribute(key === "className" ? "class" : key, value);
        }
      }
      function removeAttr(vnode, key, old, ns) {
        if (key === "key" || key === "is" || old == null || isLifecycleMethod(key))
          return;
        if (key[0] === "o" && key[1] === "n")
          updateEvent(vnode, key, void 0);
        else if (key === "style")
          updateStyle(vnode.dom, old, null);
        else if (hasPropertyKey(vnode, key, ns) && key !== "className" && key !== "title" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) {
          vnode.dom[key] = null;
        } else {
          var nsLastIndex = key.indexOf(":");
          if (nsLastIndex !== -1)
            key = key.slice(nsLastIndex + 1);
          if (old !== false)
            vnode.dom.removeAttribute(key === "className" ? "class" : key);
        }
      }
      function setLateSelectAttrs(vnode, attrs) {
        if ("value" in attrs) {
          if (attrs.value === null) {
            if (vnode.dom.selectedIndex !== -1)
              vnode.dom.value = null;
          } else {
            var normalized = "" + attrs.value;
            if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
              vnode.dom.value = normalized;
            }
          }
        }
        if ("selectedIndex" in attrs)
          setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, void 0);
      }
      function updateAttrs(vnode, old, attrs, ns) {
        if (old && old === attrs) {
          console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major");
        }
        if (attrs != null) {
          if (vnode.tag === "input" && attrs.type != null)
            vnode.dom.setAttribute("type", attrs.type);
          var isFileInput = vnode.tag === "input" && attrs.type === "file";
          for (var key in attrs) {
            setAttr(vnode, key, old && old[key], attrs[key], ns, isFileInput);
          }
        }
        var val;
        if (old != null) {
          for (var key in old) {
            if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) {
              removeAttr(vnode, key, val, ns);
            }
          }
        }
      }
      function isFormAttribute(vnode, attr) {
        return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
      }
      function isLifecycleMethod(attr) {
        return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
      }
      function hasPropertyKey(vnode, key, ns) {
        return ns === void 0 && // If it's a custom element, just keep it.
        (vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || // If it's a normal element, let's try to avoid a few browser bugs.
        key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode.dom;
      }
      var uppercaseRegex = /[A-Z]/g;
      function toLowerCase(capital) {
        return "-" + capital.toLowerCase();
      }
      function normalizeKey(key) {
        return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
      }
      function updateStyle(element, old, style) {
        if (old === style) {
        } else if (style == null) {
          element.style.cssText = "";
        } else if (typeof style !== "object") {
          element.style.cssText = style;
        } else if (old == null || typeof old !== "object") {
          element.style.cssText = "";
          for (var key in style) {
            var value = style[key];
            if (value != null)
              element.style.setProperty(normalizeKey(key), String(value));
          }
        } else {
          for (var key in style) {
            var value = style[key];
            if (value != null && (value = String(value)) !== String(old[key])) {
              element.style.setProperty(normalizeKey(key), value);
            }
          }
          for (var key in old) {
            if (old[key] != null && style[key] == null) {
              element.style.removeProperty(normalizeKey(key));
            }
          }
        }
      }
      function EventDict() {
        this._ = currentRedraw;
      }
      EventDict.prototype = /* @__PURE__ */ Object.create(null);
      EventDict.prototype.handleEvent = function(ev) {
        var handler = this["on" + ev.type];
        var result;
        if (typeof handler === "function")
          result = handler.call(ev.currentTarget, ev);
        else if (typeof handler.handleEvent === "function")
          handler.handleEvent(ev);
        if (this._ && ev.redraw !== false)
          (0, this._)();
        if (result === false) {
          ev.preventDefault();
          ev.stopPropagation();
        }
      };
      function updateEvent(vnode, key, value) {
        if (vnode.events != null) {
          vnode.events._ = currentRedraw;
          if (vnode.events[key] === value)
            return;
          if (value != null && (typeof value === "function" || typeof value === "object")) {
            if (vnode.events[key] == null)
              vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
          } else {
            if (vnode.events[key] != null)
              vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = void 0;
          }
        } else if (value != null && (typeof value === "function" || typeof value === "object")) {
          vnode.events = new EventDict();
          vnode.dom.addEventListener(key.slice(2), vnode.events, false);
          vnode.events[key] = value;
        }
      }
      function initLifecycle(source, vnode, hooks) {
        if (typeof source.oninit === "function")
          callHook.call(source.oninit, vnode);
        if (typeof source.oncreate === "function")
          hooks.push(callHook.bind(source.oncreate, vnode));
      }
      function updateLifecycle(source, vnode, hooks) {
        if (typeof source.onupdate === "function")
          hooks.push(callHook.bind(source.onupdate, vnode));
      }
      function shouldNotUpdate(vnode, old) {
        do {
          if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
            var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
            if (force !== void 0 && !force)
              break;
          }
          if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
            var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
            if (force !== void 0 && !force)
              break;
          }
          return false;
        } while (false);
        vnode.dom = old.dom;
        vnode.domSize = old.domSize;
        vnode.instance = old.instance;
        vnode.attrs = old.attrs;
        vnode.children = old.children;
        vnode.text = old.text;
        return true;
      }
      var currentDOM;
      return function(dom, vnodes, redraw) {
        if (!dom)
          throw new TypeError("DOM element being rendered to does not exist.");
        if (currentDOM != null && dom.contains(currentDOM)) {
          throw new TypeError("Node is currently being rendered to and thus is locked.");
        }
        var prevRedraw = currentRedraw;
        var prevDOM = currentDOM;
        var hooks = [];
        var active = activeElement();
        var namespace = dom.namespaceURI;
        currentDOM = dom;
        currentRedraw = typeof redraw === "function" ? redraw : void 0;
        try {
          if (dom.vnodes == null)
            dom.textContent = "";
          vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
          updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? void 0 : namespace);
          dom.vnodes = vnodes;
          if (active != null && activeElement() !== active && typeof active.focus === "function")
            active.focus();
          for (var i = 0; i < hooks.length; i++)
            hooks[i]();
        } finally {
          currentRedraw = prevRedraw;
          currentDOM = prevDOM;
        }
      };
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render.js
var require_render2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/render.js"(exports, module) {
    "use strict";
    module.exports = require_render()(typeof window !== "undefined" ? window : null);
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/api/mount-redraw.js
var require_mount_redraw = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/api/mount-redraw.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    module.exports = function(render, schedule, console2) {
      var subscriptions = [];
      var pending = false;
      var offset = -1;
      function sync() {
        for (offset = 0; offset < subscriptions.length; offset += 2) {
          try {
            render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw);
          } catch (e) {
            console2.error(e);
          }
        }
        offset = -1;
      }
      function redraw() {
        if (!pending) {
          pending = true;
          schedule(function() {
            pending = false;
            sync();
          });
        }
      }
      redraw.sync = sync;
      function mount(root, component) {
        if (component != null && component.view == null && typeof component !== "function") {
          throw new TypeError("m.mount expects a component, not a vnode.");
        }
        var index = subscriptions.indexOf(root);
        if (index >= 0) {
          subscriptions.splice(index, 2);
          if (index <= offset)
            offset -= 2;
          render(root, []);
        }
        if (component != null) {
          subscriptions.push(root, component);
          render(root, Vnode(component), redraw);
        }
      }
      return { mount, redraw };
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/mount-redraw.js
var require_mount_redraw2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/mount-redraw.js"(exports, module) {
    "use strict";
    var render = require_render2();
    module.exports = require_mount_redraw()(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null);
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/querystring/build.js
var require_build = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/querystring/build.js"(exports, module) {
    "use strict";
    module.exports = function(object) {
      if (Object.prototype.toString.call(object) !== "[object Object]")
        return "";
      var args = [];
      for (var key in object) {
        destructure(key, object[key]);
      }
      return args.join("&");
      function destructure(key2, value) {
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            destructure(key2 + "[" + i + "]", value[i]);
          }
        } else if (Object.prototype.toString.call(value) === "[object Object]") {
          for (var i in value) {
            destructure(key2 + "[" + i + "]", value[i]);
          }
        } else
          args.push(encodeURIComponent(key2) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
      }
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/assign.js
var require_assign = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/assign.js"(exports, module) {
    "use strict";
    var hasOwn = require_hasOwn();
    module.exports = Object.assign || function(target, source) {
      for (var key in source) {
        if (hasOwn.call(source, key))
          target[key] = source[key];
      }
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/build.js
var require_build2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/build.js"(exports, module) {
    "use strict";
    var buildQueryString = require_build();
    var assign = require_assign();
    module.exports = function(template, params) {
      if (/:([^\/\.-]+)(\.{3})?:/.test(template)) {
        throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");
      }
      if (params == null)
        return template;
      var queryIndex = template.indexOf("?");
      var hashIndex = template.indexOf("#");
      var queryEnd = hashIndex < 0 ? template.length : hashIndex;
      var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
      var path = template.slice(0, pathEnd);
      var query = {};
      assign(query, params);
      var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m2, key, variadic) {
        delete query[key];
        if (params[key] == null)
          return m2;
        return variadic ? params[key] : encodeURIComponent(String(params[key]));
      });
      var newQueryIndex = resolved.indexOf("?");
      var newHashIndex = resolved.indexOf("#");
      var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
      var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
      var result = resolved.slice(0, newPathEnd);
      if (queryIndex >= 0)
        result += template.slice(queryIndex, queryEnd);
      if (newQueryIndex >= 0)
        result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
      var querystring = buildQueryString(query);
      if (querystring)
        result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
      if (hashIndex >= 0)
        result += template.slice(hashIndex);
      if (newHashIndex >= 0)
        result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
      return result;
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/request/request.js
var require_request = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/request/request.js"(exports, module) {
    "use strict";
    var buildPathname = require_build2();
    var hasOwn = require_hasOwn();
    module.exports = function($window, Promise2, oncompletion) {
      var callbackCount = 0;
      function PromiseProxy(executor) {
        return new Promise2(executor);
      }
      PromiseProxy.prototype = Promise2.prototype;
      PromiseProxy.__proto__ = Promise2;
      function makeRequest(factory) {
        return function(url, args) {
          if (typeof url !== "string") {
            args = url;
            url = url.url;
          } else if (args == null)
            args = {};
          var promise = new Promise2(function(resolve, reject) {
            factory(buildPathname(url, args.params), args, function(data) {
              if (typeof args.type === "function") {
                if (Array.isArray(data)) {
                  for (var i = 0; i < data.length; i++) {
                    data[i] = new args.type(data[i]);
                  }
                } else
                  data = new args.type(data);
              }
              resolve(data);
            }, reject);
          });
          if (args.background === true)
            return promise;
          var count = 0;
          function complete() {
            if (--count === 0 && typeof oncompletion === "function")
              oncompletion();
          }
          return wrap(promise);
          function wrap(promise2) {
            var then = promise2.then;
            promise2.constructor = PromiseProxy;
            promise2.then = function() {
              count++;
              var next = then.apply(promise2, arguments);
              next.then(complete, function(e) {
                complete();
                if (count === 0)
                  throw e;
              });
              return wrap(next);
            };
            return promise2;
          }
        };
      }
      function hasHeader(args, name) {
        for (var key in args.headers) {
          if (hasOwn.call(args.headers, key) && key.toLowerCase() === name)
            return true;
        }
        return false;
      }
      return {
        request: makeRequest(function(url, args, resolve, reject) {
          var method = args.method != null ? args.method.toUpperCase() : "GET";
          var body = args.body;
          var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams);
          var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
          var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false;
          var original = xhr, replacedAbort;
          var abort = xhr.abort;
          xhr.abort = function() {
            aborted = true;
            abort.call(this);
          };
          xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : void 0, typeof args.password === "string" ? args.password : void 0);
          if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          }
          if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
            xhr.setRequestHeader("Accept", "application/json, text/*");
          }
          if (args.withCredentials)
            xhr.withCredentials = args.withCredentials;
          if (args.timeout)
            xhr.timeout = args.timeout;
          xhr.responseType = responseType;
          for (var key in args.headers) {
            if (hasOwn.call(args.headers, key)) {
              xhr.setRequestHeader(key, args.headers[key]);
            }
          }
          xhr.onreadystatechange = function(ev) {
            if (aborted)
              return;
            if (ev.target.readyState === 4) {
              try {
                var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                var response = ev.target.response, message;
                if (responseType === "json") {
                  if (!ev.target.responseType && typeof args.extract !== "function") {
                    try {
                      response = JSON.parse(ev.target.responseText);
                    } catch (e) {
                      response = null;
                    }
                  }
                } else if (!responseType || responseType === "text") {
                  if (response == null)
                    response = ev.target.responseText;
                }
                if (typeof args.extract === "function") {
                  response = args.extract(ev.target, args);
                  success = true;
                } else if (typeof args.deserialize === "function") {
                  response = args.deserialize(response);
                }
                if (success)
                  resolve(response);
                else {
                  var completeErrorResponse = function() {
                    try {
                      message = ev.target.responseText;
                    } catch (e) {
                      message = response;
                    }
                    var error = new Error(message);
                    error.code = ev.target.status;
                    error.response = response;
                    reject(error);
                  };
                  if (xhr.status === 0) {
                    setTimeout(function() {
                      if (isTimeout)
                        return;
                      completeErrorResponse();
                    });
                  } else
                    completeErrorResponse();
                }
              } catch (e) {
                reject(e);
              }
            }
          };
          xhr.ontimeout = function(ev) {
            isTimeout = true;
            var error = new Error("Request timed out");
            error.code = ev.target.status;
            reject(error);
          };
          if (typeof args.config === "function") {
            xhr = args.config(xhr, args, url) || xhr;
            if (xhr !== original) {
              replacedAbort = xhr.abort;
              xhr.abort = function() {
                aborted = true;
                replacedAbort.call(this);
              };
            }
          }
          if (body == null)
            xhr.send();
          else if (typeof args.serialize === "function")
            xhr.send(args.serialize(body));
          else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams)
            xhr.send(body);
          else
            xhr.send(JSON.stringify(body));
        }),
        jsonp: makeRequest(function(url, args, resolve, reject) {
          var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
          var script = $window.document.createElement("script");
          $window[callbackName] = function(data) {
            delete $window[callbackName];
            script.parentNode.removeChild(script);
            resolve(data);
          };
          script.onerror = function() {
            delete $window[callbackName];
            script.parentNode.removeChild(script);
            reject(new Error("JSONP request failed"));
          };
          script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
          $window.document.documentElement.appendChild(script);
        })
      };
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/request.js
var require_request2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/request.js"(exports, module) {
    "use strict";
    var PromisePolyfill = require_promise();
    var mountRedraw = require_mount_redraw2();
    module.exports = require_request()(typeof window !== "undefined" ? window : null, PromisePolyfill, mountRedraw.redraw);
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/querystring/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/querystring/parse.js"(exports, module) {
    "use strict";
    function decodeURIComponentSave(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return str;
      }
    }
    module.exports = function(string) {
      if (string === "" || string == null)
        return {};
      if (string.charAt(0) === "?")
        string = string.slice(1);
      var entries = string.split("&"), counters = {}, data = {};
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i].split("=");
        var key = decodeURIComponentSave(entry[0]);
        var value = entry.length === 2 ? decodeURIComponentSave(entry[1]) : "";
        if (value === "true")
          value = true;
        else if (value === "false")
          value = false;
        var levels = key.split(/\]\[?|\[/);
        var cursor = data;
        if (key.indexOf("[") > -1)
          levels.pop();
        for (var j = 0; j < levels.length; j++) {
          var level = levels[j], nextLevel = levels[j + 1];
          var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
          if (level === "") {
            var key = levels.slice(0, j).join();
            if (counters[key] == null) {
              counters[key] = Array.isArray(cursor) ? cursor.length : 0;
            }
            level = counters[key]++;
          } else if (level === "__proto__")
            break;
          if (j === levels.length - 1)
            cursor[level] = value;
          else {
            var desc = Object.getOwnPropertyDescriptor(cursor, level);
            if (desc != null)
              desc = desc.value;
            if (desc == null)
              cursor[level] = desc = isNumber ? [] : {};
            cursor = desc;
          }
        }
      }
      return data;
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/parse.js
var require_parse2 = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/parse.js"(exports, module) {
    "use strict";
    var parseQueryString = require_parse();
    module.exports = function(url) {
      var queryIndex = url.indexOf("?");
      var hashIndex = url.indexOf("#");
      var queryEnd = hashIndex < 0 ? url.length : hashIndex;
      var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
      var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
      if (!path)
        path = "/";
      else {
        if (path[0] !== "/")
          path = "/" + path;
        if (path.length > 1 && path[path.length - 1] === "/")
          path = path.slice(0, -1);
      }
      return {
        path,
        params: queryIndex < 0 ? {} : parseQueryString(url.slice(queryIndex + 1, queryEnd))
      };
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/compileTemplate.js
var require_compileTemplate = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/pathname/compileTemplate.js"(exports, module) {
    "use strict";
    var parsePathname = require_parse2();
    module.exports = function(template) {
      var templateData = parsePathname(template);
      var templateKeys = Object.keys(templateData.params);
      var keys = [];
      var regexp = new RegExp("^" + templateData.path.replace(
        // I escape literal text so people can use things like `:file.:ext` or
        // `:lang-:locale` in routes. This is all merged into one pass so I
        // don't also accidentally escape `-` and make it harder to detect it to
        // ban it from template parameters.
        /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
        function(m2, key, extra) {
          if (key == null)
            return "\\" + m2;
          keys.push({ k: key, r: extra === "..." });
          if (extra === "...")
            return "(.*)";
          if (extra === ".")
            return "([^/]+)\\.";
          return "([^/]+)" + (extra || "");
        }
      ) + "$");
      return function(data) {
        for (var i = 0; i < templateKeys.length; i++) {
          if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]])
            return false;
        }
        if (!keys.length)
          return regexp.test(data.path);
        var values = regexp.exec(data.path);
        if (values == null)
          return false;
        for (var i = 0; i < keys.length; i++) {
          data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
        }
        return true;
      };
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/censor.js
var require_censor = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/util/censor.js"(exports, module) {
    "use strict";
    var hasOwn = require_hasOwn();
    var magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");
    module.exports = function(attrs, extras) {
      var result = {};
      if (extras != null) {
        for (var key in attrs) {
          if (hasOwn.call(attrs, key) && !magic.test(key) && extras.indexOf(key) < 0) {
            result[key] = attrs[key];
          }
        }
      } else {
        for (var key in attrs) {
          if (hasOwn.call(attrs, key) && !magic.test(key)) {
            result[key] = attrs[key];
          }
        }
      }
      return result;
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/api/router.js
var require_router = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/api/router.js"(exports, module) {
    "use strict";
    var Vnode = require_vnode();
    var m2 = require_hyperscript();
    var Promise2 = require_promise();
    var buildPathname = require_build2();
    var parsePathname = require_parse2();
    var compileTemplate = require_compileTemplate();
    var assign = require_assign();
    var censor = require_censor();
    var sentinel = {};
    function decodeURIComponentSave(component) {
      try {
        return decodeURIComponent(component);
      } catch (e) {
        return component;
      }
    }
    module.exports = function($window, mountRedraw) {
      var callAsync = $window == null ? null : typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout;
      var p = Promise2.resolve();
      var scheduled = false;
      var ready = false;
      var state = 0;
      var compiled, fallbackRoute;
      var currentResolver = sentinel, component, attrs, currentPath, lastUpdate;
      var RouterRoot = {
        onbeforeupdate: function() {
          state = state ? 2 : 1;
          return !(!state || sentinel === currentResolver);
        },
        onremove: function() {
          $window.removeEventListener("popstate", fireAsync, false);
          $window.removeEventListener("hashchange", resolveRoute, false);
        },
        view: function() {
          if (!state || sentinel === currentResolver)
            return;
          var vnode = [Vnode(component, attrs.key, attrs)];
          if (currentResolver)
            vnode = currentResolver.render(vnode[0]);
          return vnode;
        }
      };
      var SKIP = route.SKIP = {};
      function resolveRoute() {
        scheduled = false;
        var prefix = $window.location.hash;
        if (route.prefix[0] !== "#") {
          prefix = $window.location.search + prefix;
          if (route.prefix[0] !== "?") {
            prefix = $window.location.pathname + prefix;
            if (prefix[0] !== "/")
              prefix = "/" + prefix;
          }
        }
        var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponentSave).slice(route.prefix.length);
        var data = parsePathname(path);
        assign(data.params, $window.history.state);
        function reject(e) {
          console.error(e);
          setPath(fallbackRoute, null, { replace: true });
        }
        loop(0);
        function loop(i) {
          for (; i < compiled.length; i++) {
            if (compiled[i].check(data)) {
              var payload = compiled[i].component;
              var matchedRoute = compiled[i].route;
              var localComp = payload;
              var update = lastUpdate = function(comp) {
                if (update !== lastUpdate)
                  return;
                if (comp === SKIP)
                  return loop(i + 1);
                component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                attrs = data.params, currentPath = path, lastUpdate = null;
                currentResolver = payload.render ? payload : null;
                if (state === 2)
                  mountRedraw.redraw();
                else {
                  state = 2;
                  mountRedraw.redraw.sync();
                }
              };
              if (payload.view || typeof payload === "function") {
                payload = {};
                update(localComp);
              } else if (payload.onmatch) {
                p.then(function() {
                  return payload.onmatch(data.params, path, matchedRoute);
                }).then(update, path === fallbackRoute ? null : reject);
              } else
                update("div");
              return;
            }
          }
          if (path === fallbackRoute) {
            throw new Error("Could not resolve default route " + fallbackRoute + ".");
          }
          setPath(fallbackRoute, null, { replace: true });
        }
      }
      function fireAsync() {
        if (!scheduled) {
          scheduled = true;
          callAsync(resolveRoute);
        }
      }
      function setPath(path, data, options) {
        path = buildPathname(path, data);
        if (ready) {
          fireAsync();
          var state2 = options ? options.state : null;
          var title = options ? options.title : null;
          if (options && options.replace)
            $window.history.replaceState(state2, title, route.prefix + path);
          else
            $window.history.pushState(state2, title, route.prefix + path);
        } else {
          $window.location.href = route.prefix + path;
        }
      }
      function route(root, defaultRoute, routes) {
        if (!root)
          throw new TypeError("DOM element being rendered to does not exist.");
        compiled = Object.keys(routes).map(function(route2) {
          if (route2[0] !== "/")
            throw new SyntaxError("Routes must start with a '/'.");
          if (/:([^\/\.-]+)(\.{3})?:/.test(route2)) {
            throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");
          }
          return {
            route: route2,
            component: routes[route2],
            check: compileTemplate(route2)
          };
        });
        fallbackRoute = defaultRoute;
        if (defaultRoute != null) {
          var defaultData = parsePathname(defaultRoute);
          if (!compiled.some(function(i) {
            return i.check(defaultData);
          })) {
            throw new ReferenceError("Default route doesn't match any known routes.");
          }
        }
        if (typeof $window.history.pushState === "function") {
          $window.addEventListener("popstate", fireAsync, false);
        } else if (route.prefix[0] === "#") {
          $window.addEventListener("hashchange", resolveRoute, false);
        }
        ready = true;
        mountRedraw.mount(root, RouterRoot);
        resolveRoute();
      }
      route.set = function(path, data, options) {
        if (lastUpdate != null) {
          options = options || {};
          options.replace = true;
        }
        lastUpdate = null;
        setPath(path, data, options);
      };
      route.get = function() {
        return currentPath;
      };
      route.prefix = "#!";
      route.Link = {
        view: function(vnode) {
          var child = m2(
            vnode.attrs.selector || "a",
            censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
            vnode.children
          );
          var options, onclick, href;
          if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
            child.attrs.href = null;
            child.attrs["aria-disabled"] = "true";
          } else {
            options = vnode.attrs.options;
            onclick = vnode.attrs.onclick;
            href = buildPathname(child.attrs.href, vnode.attrs.params);
            child.attrs.href = route.prefix + href;
            child.attrs.onclick = function(e) {
              var result;
              if (typeof onclick === "function") {
                result = onclick.call(e.currentTarget, e);
              } else if (onclick == null || typeof onclick !== "object") {
              } else if (typeof onclick.handleEvent === "function") {
                onclick.handleEvent(e);
              }
              if (
                // Skip if `onclick` prevented default
                result !== false && !e.defaultPrevented && // Ignore everything but left clicks
                (e.button === 0 || e.which === 0 || e.which === 1) && // Let the browser handle `target=_blank`, etc.
                (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
              ) {
                e.preventDefault();
                e.redraw = false;
                route.set(href, null, options);
              }
            };
          }
          return child;
        }
      };
      route.param = function(key) {
        return attrs && key != null ? attrs[key] : attrs;
      };
      return route;
    };
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/route.js
var require_route = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/route.js"(exports, module) {
    "use strict";
    var mountRedraw = require_mount_redraw2();
    module.exports = require_router()(typeof window !== "undefined" ? window : null, mountRedraw);
  }
});

// node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/index.js
var require_mithril = __commonJS({
  "node_modules/.pnpm/mithril@2.2.2/node_modules/mithril/index.js"(exports, module) {
    "use strict";
    var hyperscript = require_hyperscript2();
    var request = require_request2();
    var mountRedraw = require_mount_redraw2();
    var m2 = function m3() {
      return hyperscript.apply(this, arguments);
    };
    m2.m = hyperscript;
    m2.trust = hyperscript.trust;
    m2.fragment = hyperscript.fragment;
    m2.Fragment = "[";
    m2.mount = mountRedraw.mount;
    m2.route = require_route();
    m2.render = require_render2();
    m2.redraw = mountRedraw.redraw;
    m2.request = request.request;
    m2.jsonp = request.jsonp;
    m2.parseQueryString = require_parse();
    m2.buildQueryString = require_build();
    m2.parsePathname = require_parse2();
    m2.buildPathname = require_build2();
    m2.vnode = require_vnode();
    m2.PromisePolyfill = require_polyfill();
    m2.censor = require_censor();
    module.exports = m2;
  }
});

// src/scripts/components/bar.ts
var import_mithril = __toESM(require_mithril());
function bar_default() {
  const node = document.querySelector("#some-vnode");
  import_mithril.default.mount(node, {
    view: () => [
      (0, import_mithril.default)(
        ".row.justify-content-center.my-5",
        (0, import_mithril.default)(
          ".col-auto.bg-danger",
          (0, import_mithril.default)("h1", "FOO - Virtual DOM")
        )
      )
    ]
  });
}

// src/scripts/components/foo.ts
function foo_default() {
  return "";
}

// src/scripts/extensions/file.mjs
function mjs() {
  return "file.mjs";
}

// src/scripts/components/baz.ts
function baz_default() {
  mjs();
  return "fsssssssssssssss";
}

// node_modules/.pnpm/@hotwired+stimulus@3.2.1/node_modules/@hotwired/stimulus/dist/stimulus.js
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
  } catch (error) {
    return (constructor) => class extended extends constructor {
    };
  }
})();
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

// src/scripts/components/qux.ts
function qux_default() {
  ClipboardController.targets.push("foo");
  return "qux";
}

// src/scripts/components/test.ts
function test_default() {
  foo_default();
  qux_default();
  return "test";
}

// src/scripts/bundle.ts
console.log("hello sissel");
bar_default();
foo_default();
baz_default();
qux_default();
test_default();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL21pdGhyaWxAMi4yLjIvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3Zub2RlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdFZub2RlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3V0aWwvaGFzT3duLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsICJub2RlX21vZHVsZXMvLnBucG0vbWl0aHJpbEAyLjIuMi9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZW5kZXIvdHJ1c3QuanMiLCAibm9kZV9tb2R1bGVzLy5wbnBtL21pdGhyaWxAMi4yLjIvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL2ZyYWdtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL2h5cGVyc2NyaXB0LmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3Byb21pc2UvcG9seWZpbGwuanMiLCAibm9kZV9tb2R1bGVzLy5wbnBtL21pdGhyaWxAMi4yLjIvbm9kZV9tb2R1bGVzL21pdGhyaWwvcHJvbWlzZS9wcm9taXNlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9yZW5kZXIuanMiLCAibm9kZV9tb2R1bGVzLy5wbnBtL21pdGhyaWxAMi4yLjIvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCAibm9kZV9tb2R1bGVzLy5wbnBtL21pdGhyaWxAMi4yLjIvbm9kZV9tb2R1bGVzL21pdGhyaWwvbW91bnQtcmVkcmF3LmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL2J1aWxkLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3V0aWwvYXNzaWduLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3JlcXVlc3QvcmVxdWVzdC5qcyIsICJub2RlX21vZHVsZXMvLnBucG0vbWl0aHJpbEAyLjIuMi9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0LmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2NvbXBpbGVUZW1wbGF0ZS5qcyIsICJub2RlX21vZHVsZXMvLnBucG0vbWl0aHJpbEAyLjIuMi9ub2RlX21vZHVsZXMvbWl0aHJpbC91dGlsL2NlbnNvci5qcyIsICJub2RlX21vZHVsZXMvLnBucG0vbWl0aHJpbEAyLjIuMi9ub2RlX21vZHVsZXMvbWl0aHJpbC9hcGkvcm91dGVyLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL3JvdXRlLmpzIiwgIm5vZGVfbW9kdWxlcy8ucG5wbS9taXRocmlsQDIuMi4yL25vZGVfbW9kdWxlcy9taXRocmlsL2luZGV4LmpzIiwgInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvYmFyLnRzIiwgInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvZm9vLnRzIiwgInNyYy9zY3JpcHRzL2V4dGVuc2lvbnMvZmlsZS5tanMiLCAic3JjL3NjcmlwdHMvY29tcG9uZW50cy9iYXoudHMiLCAibm9kZV9tb2R1bGVzLy5wbnBtL0Bob3R3aXJlZCtzdGltdWx1c0AzLjIuMS9ub2RlX21vZHVsZXMvQGhvdHdpcmVkL3N0aW11bHVzL2Rpc3Qvc3RpbXVsdXMuanMiLCAic3JjL3NjcmlwdHMvZ2xvYnMvYS50cyIsICJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3F1eC50cyIsICJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rlc3QudHMiLCAic3JjL3NjcmlwdHMvYnVuZGxlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBWbm9kZSh0YWcsIGtleSwgYXR0cnMsIGNoaWxkcmVuLCB0ZXh0LCBkb20pIHtcblx0cmV0dXJuIHt0YWc6IHRhZywga2V5OiBrZXksIGF0dHJzOiBhdHRycywgY2hpbGRyZW46IGNoaWxkcmVuLCB0ZXh0OiB0ZXh0LCBkb206IGRvbSwgZG9tU2l6ZTogdW5kZWZpbmVkLCBzdGF0ZTogdW5kZWZpbmVkLCBldmVudHM6IHVuZGVmaW5lZCwgaW5zdGFuY2U6IHVuZGVmaW5lZH1cbn1cblZub2RlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHJldHVybiBWbm9kZShcIltcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0aWYgKG5vZGUgPT0gbnVsbCB8fCB0eXBlb2Ygbm9kZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiBudWxsXG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIG5vZGVcblx0cmV0dXJuIFZub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgU3RyaW5nKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbn1cblZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0dmFyIGNoaWxkcmVuID0gW11cblx0aWYgKGlucHV0Lmxlbmd0aCkge1xuXHRcdHZhciBpc0tleWVkID0gaW5wdXRbMF0gIT0gbnVsbCAmJiBpbnB1dFswXS5rZXkgIT0gbnVsbFxuXHRcdC8vIE5vdGU6IHRoaXMgaXMgYSAqdmVyeSogcGVyZi1zZW5zaXRpdmUgY2hlY2suXG5cdFx0Ly8gRnVuIGZhY3Q6IG1lcmdpbmcgdGhlIGxvb3AgbGlrZSB0aGlzIGlzIHNvbWVob3cgZmFzdGVyIHRoYW4gc3BsaXR0aW5nXG5cdFx0Ly8gaXQsIG5vdGljZWFibHkgc28uXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKChpbnB1dFtpXSAhPSBudWxsICYmIGlucHV0W2ldLmtleSAhPSBudWxsKSAhPT0gaXNLZXllZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRcdGlzS2V5ZWQgJiYgKGlucHV0W2ldICE9IG51bGwgfHwgdHlwZW9mIGlucHV0W2ldID09PSBcImJvb2xlYW5cIilcblx0XHRcdFx0XHRcdD8gXCJJbiBmcmFnbWVudHMsIHZub2RlcyBtdXN0IGVpdGhlciBhbGwgaGF2ZSBrZXlzIG9yIG5vbmUgaGF2ZSBrZXlzLiBZb3UgbWF5IHdpc2ggdG8gY29uc2lkZXIgdXNpbmcgYW4gZXhwbGljaXQga2V5ZWQgZW1wdHkgZnJhZ21lbnQsIG0uZnJhZ21lbnQoe2tleTogLi4ufSksIGluc3RlYWQgb2YgYSBob2xlLlwiXG5cdFx0XHRcdFx0XHQ6IFwiSW4gZnJhZ21lbnRzLCB2bm9kZXMgbXVzdCBlaXRoZXIgYWxsIGhhdmUga2V5cyBvciBub25lIGhhdmUga2V5cy5cIlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNoaWxkcmVuW2ldID0gVm5vZGUubm9ybWFsaXplKGlucHV0W2ldKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2hpbGRyZW5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWbm9kZVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxuLy8gQ2FsbCB2aWEgYGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoc3RhcnRPZmZzZXQsIGFyZ3VtZW50cylgXG4vL1xuLy8gVGhlIHJlYXNvbiBJIGRvIGl0IHRoaXMgd2F5LCBmb3J3YXJkaW5nIHRoZSBhcmd1bWVudHMgYW5kIHBhc3NpbmcgdGhlIHN0YXJ0XG4vLyBvZmZzZXQgaW4gYHRoaXNgLCBpcyBzbyBJIGRvbid0IGhhdmUgdG8gY3JlYXRlIGEgdGVtcG9yYXJ5IGFycmF5IGluIGFcbi8vIHBlcmZvcm1hbmNlLWNyaXRpY2FsIHBhdGguXG4vL1xuLy8gSW4gbmF0aXZlIEVTNiwgSSdkIGluc3RlYWQgYWRkIGEgZmluYWwgYC4uLmFyZ3NgIHBhcmFtZXRlciB0byB0aGVcbi8vIGBoeXBlcnNjcmlwdGAgYW5kIGBmcmFnbWVudGAgZmFjdG9yaWVzIGFuZCBkZWZpbmUgdGhpcyBhc1xuLy8gYGh5cGVyc2NyaXB0Vm5vZGUoLi4uYXJncylgLCBzaW5jZSBtb2Rlcm4gZW5naW5lcyBkbyBvcHRpbWl6ZSB0aGF0IGF3YXkuIEJ1dFxuLy8gRVM1ICh3aGF0IE1pdGhyaWwuanMgcmVxdWlyZXMgdGhhbmtzIHRvIElFIHN1cHBvcnQpIGRvZXNuJ3QgZ2l2ZSBtZSB0aGF0IGx1eHVyeSxcbi8vIGFuZCBlbmdpbmVzIGFyZW4ndCBuZWFybHkgaW50ZWxsaWdlbnQgZW5vdWdoIHRvIGRvIGVpdGhlciBvZiB0aGVzZTpcbi8vXG4vLyAxLiBFbGlkZSB0aGUgYWxsb2NhdGlvbiBmb3IgYFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKWAgd2hlbiBpdCdzIHBhc3NlZCB0b1xuLy8gICAgYW5vdGhlciBmdW5jdGlvbiBvbmx5IHRvIGJlIGluZGV4ZWQuXG4vLyAyLiBFbGlkZSBhbiBgYXJndW1lbnRzYCBhbGxvY2F0aW9uIHdoZW4gaXQncyBwYXNzZWQgdG8gYW55IGZ1bmN0aW9uIG90aGVyXG4vLyAgICB0aGFuIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgIG9yIGBSZWZsZWN0LmFwcGx5YC5cbi8vXG4vLyBJbiBFUzYsIGl0J2QgcHJvYmFibHkgbG9vayBjbG9zZXIgdG8gdGhpcyAoSSdkIG5lZWQgdG8gcHJvZmlsZSBpdCwgdGhvdWdoKTpcbi8vIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXR0cnMsIC4uLmNoaWxkcmVuKSB7XG4vLyAgICAgaWYgKGF0dHJzID09IG51bGwgfHwgdHlwZW9mIGF0dHJzID09PSBcIm9iamVjdFwiICYmIGF0dHJzLnRhZyA9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuLy8gICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoY2hpbGRyZW5bMF0pKSBjaGlsZHJlbiA9IGNoaWxkcmVuWzBdXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgQXJyYXkuaXNBcnJheShhdHRycykgPyBhdHRycyA6IFthdHRycywgLi4uY2hpbGRyZW5dXG4vLyAgICAgICAgIGF0dHJzID0gdW5kZWZpbmVkXG4vLyAgICAgfVxuLy9cbi8vICAgICBpZiAoYXR0cnMgPT0gbnVsbCkgYXR0cnMgPSB7fVxuLy8gICAgIHJldHVybiBWbm9kZShcIlwiLCBhdHRycy5rZXksIGF0dHJzLCBjaGlsZHJlbilcbi8vIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhdHRycyA9IGFyZ3VtZW50c1t0aGlzXSwgc3RhcnQgPSB0aGlzICsgMSwgY2hpbGRyZW5cblxuXHRpZiAoYXR0cnMgPT0gbnVsbCkge1xuXHRcdGF0dHJzID0ge31cblx0fSBlbHNlIGlmICh0eXBlb2YgYXR0cnMgIT09IFwib2JqZWN0XCIgfHwgYXR0cnMudGFnICE9IG51bGwgfHwgQXJyYXkuaXNBcnJheShhdHRycykpIHtcblx0XHRhdHRycyA9IHt9XG5cdFx0c3RhcnQgPSB0aGlzXG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gc3RhcnQgKyAxKSB7XG5cdFx0Y2hpbGRyZW4gPSBhcmd1bWVudHNbc3RhcnRdXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkgY2hpbGRyZW4gPSBbY2hpbGRyZW5dXG5cdH0gZWxzZSB7XG5cdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdHdoaWxlIChzdGFydCA8IGFyZ3VtZW50cy5sZW5ndGgpIGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW3N0YXJ0KytdKVxuXHR9XG5cblx0cmV0dXJuIFZub2RlKFwiXCIsIGF0dHJzLmtleSwgYXR0cnMsIGNoaWxkcmVuKVxufVxuIiwgIi8vIFRoaXMgZXhpc3RzIHNvIEknbSBvbmx5IHNhdmluZyBpdCBvbmNlLlxuXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSB7fS5oYXNPd25Qcm9wZXJ0eVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBoeXBlcnNjcmlwdFZub2RlID0gcmVxdWlyZShcIi4vaHlwZXJzY3JpcHRWbm9kZVwiKVxudmFyIGhhc093biA9IHJlcXVpcmUoXCIuLi91dGlsL2hhc093blwiKVxuXG52YXIgc2VsZWN0b3JQYXJzZXIgPSAvKD86KF58I3xcXC4pKFteI1xcLlxcW1xcXV0rKSl8KFxcWyguKz8pKD86XFxzKj1cXHMqKFwifCd8KSgoPzpcXFxcW1wiJ1xcXV18LikqPylcXDUpP1xcXSkvZ1xudmFyIHNlbGVjdG9yQ2FjaGUgPSB7fVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdCkge1xuXHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBpZiAoaGFzT3duLmNhbGwob2JqZWN0LCBrZXkpKSByZXR1cm4gZmFsc2Vcblx0cmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gY29tcGlsZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG5cdHZhciBtYXRjaCwgdGFnID0gXCJkaXZcIiwgY2xhc3NlcyA9IFtdLCBhdHRycyA9IHt9XG5cdHdoaWxlIChtYXRjaCA9IHNlbGVjdG9yUGFyc2VyLmV4ZWMoc2VsZWN0b3IpKSB7XG5cdFx0dmFyIHR5cGUgPSBtYXRjaFsxXSwgdmFsdWUgPSBtYXRjaFsyXVxuXHRcdGlmICh0eXBlID09PSBcIlwiICYmIHZhbHVlICE9PSBcIlwiKSB0YWcgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiI1wiKSBhdHRycy5pZCA9IHZhbHVlXG5cdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCIuXCIpIGNsYXNzZXMucHVzaCh2YWx1ZSlcblx0XHRlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcblx0XHRcdHZhciBhdHRyVmFsdWUgPSBtYXRjaFs2XVxuXHRcdFx0aWYgKGF0dHJWYWx1ZSkgYXR0clZhbHVlID0gYXR0clZhbHVlLnJlcGxhY2UoL1xcXFwoW1wiJ10pL2csIFwiJDFcIikucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpXG5cdFx0XHRpZiAobWF0Y2hbNF0gPT09IFwiY2xhc3NcIikgY2xhc3Nlcy5wdXNoKGF0dHJWYWx1ZSlcblx0XHRcdGVsc2UgYXR0cnNbbWF0Y2hbNF1dID0gYXR0clZhbHVlID09PSBcIlwiID8gYXR0clZhbHVlIDogYXR0clZhbHVlIHx8IHRydWVcblx0XHR9XG5cdH1cblx0aWYgKGNsYXNzZXMubGVuZ3RoID4gMCkgYXR0cnMuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxuXHRyZXR1cm4gc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0gPSB7dGFnOiB0YWcsIGF0dHJzOiBhdHRyc31cbn1cblxuZnVuY3Rpb24gZXhlY1NlbGVjdG9yKHN0YXRlLCB2bm9kZSkge1xuXHR2YXIgYXR0cnMgPSB2bm9kZS5hdHRyc1xuXHR2YXIgaGFzQ2xhc3MgPSBoYXNPd24uY2FsbChhdHRycywgXCJjbGFzc1wiKVxuXHR2YXIgY2xhc3NOYW1lID0gaGFzQ2xhc3MgPyBhdHRycy5jbGFzcyA6IGF0dHJzLmNsYXNzTmFtZVxuXG5cdHZub2RlLnRhZyA9IHN0YXRlLnRhZ1xuXHR2bm9kZS5hdHRycyA9IHt9XG5cblx0aWYgKCFpc0VtcHR5KHN0YXRlLmF0dHJzKSAmJiAhaXNFbXB0eShhdHRycykpIHtcblx0XHR2YXIgbmV3QXR0cnMgPSB7fVxuXG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkpIG5ld0F0dHJzW2tleV0gPSBhdHRyc1trZXldXG5cdFx0fVxuXG5cdFx0YXR0cnMgPSBuZXdBdHRyc1xuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHN0YXRlLmF0dHJzKSB7XG5cdFx0aWYgKGhhc093bi5jYWxsKHN0YXRlLmF0dHJzLCBrZXkpICYmIGtleSAhPT0gXCJjbGFzc05hbWVcIiAmJiAhaGFzT3duLmNhbGwoYXR0cnMsIGtleSkpe1xuXHRcdFx0YXR0cnNba2V5XSA9IHN0YXRlLmF0dHJzW2tleV1cblx0XHR9XG5cdH1cblx0aWYgKGNsYXNzTmFtZSAhPSBudWxsIHx8IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsKSBhdHRycy5jbGFzc05hbWUgPVxuXHRcdGNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHQ/IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHRcdD8gU3RyaW5nKHN0YXRlLmF0dHJzLmNsYXNzTmFtZSkgKyBcIiBcIiArIFN0cmluZyhjbGFzc05hbWUpXG5cdFx0XHRcdDogY2xhc3NOYW1lXG5cdFx0XHQ6IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHRcdD8gc3RhdGUuYXR0cnMuY2xhc3NOYW1lXG5cdFx0XHRcdDogbnVsbFxuXG5cdGlmIChoYXNDbGFzcykgYXR0cnMuY2xhc3MgPSBudWxsXG5cblx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpICYmIGtleSAhPT0gXCJrZXlcIikge1xuXHRcdFx0dm5vZGUuYXR0cnMgPSBhdHRyc1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gaHlwZXJzY3JpcHQoc2VsZWN0b3IpIHtcblx0aWYgKHNlbGVjdG9yID09IG51bGwgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBzZWxlY3Rvci52aWV3ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHR0aHJvdyBFcnJvcihcIlRoZSBzZWxlY3RvciBtdXN0IGJlIGVpdGhlciBhIHN0cmluZyBvciBhIGNvbXBvbmVudC5cIik7XG5cdH1cblxuXHR2YXIgdm5vZGUgPSBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KDEsIGFyZ3VtZW50cylcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0XHRpZiAoc2VsZWN0b3IgIT09IFwiW1wiKSByZXR1cm4gZXhlY1NlbGVjdG9yKHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdIHx8IGNvbXBpbGVTZWxlY3RvcihzZWxlY3RvciksIHZub2RlKVxuXHR9XG5cblx0dm5vZGUudGFnID0gc2VsZWN0b3Jcblx0cmV0dXJuIHZub2RlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwZXJzY3JpcHRcbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaHRtbCkge1xuXHRpZiAoaHRtbCA9PSBudWxsKSBodG1sID0gXCJcIlxuXHRyZXR1cm4gVm5vZGUoXCI8XCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBodG1sLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG52YXIgaHlwZXJzY3JpcHRWbm9kZSA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0Vm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIHZub2RlID0gaHlwZXJzY3JpcHRWbm9kZS5hcHBseSgwLCBhcmd1bWVudHMpXG5cblx0dm5vZGUudGFnID0gXCJbXCJcblx0dm5vZGUuY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0cmV0dXJuIHZub2RlXG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGh5cGVyc2NyaXB0ID0gcmVxdWlyZShcIi4vcmVuZGVyL2h5cGVyc2NyaXB0XCIpXG5cbmh5cGVyc2NyaXB0LnRydXN0ID0gcmVxdWlyZShcIi4vcmVuZGVyL3RydXN0XCIpXG5oeXBlcnNjcmlwdC5mcmFnbWVudCA9IHJlcXVpcmUoXCIuL3JlbmRlci9mcmFnbWVudFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGVyc2NyaXB0XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcbi8qKiBAY29uc3RydWN0b3IgKi9cbnZhciBQcm9taXNlUG9seWZpbGwgPSBmdW5jdGlvbihleGVjdXRvcikge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZVBvbHlmaWxsKSkgdGhyb3cgbmV3IEVycm9yKFwiUHJvbWlzZSBtdXN0IGJlIGNhbGxlZCB3aXRoICduZXcnLlwiKVxuXHRpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpXG5cblx0dmFyIHNlbGYgPSB0aGlzLCByZXNvbHZlcnMgPSBbXSwgcmVqZWN0b3JzID0gW10sIHJlc29sdmVDdXJyZW50ID0gaGFuZGxlcihyZXNvbHZlcnMsIHRydWUpLCByZWplY3RDdXJyZW50ID0gaGFuZGxlcihyZWplY3RvcnMsIGZhbHNlKVxuXHR2YXIgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZSA9IHtyZXNvbHZlcnM6IHJlc29sdmVycywgcmVqZWN0b3JzOiByZWplY3RvcnN9XG5cdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdGZ1bmN0aW9uIGhhbmRsZXIobGlzdCwgc2hvdWxkQWJzb3JiKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGUodmFsdWUpIHtcblx0XHRcdHZhciB0aGVuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoc2hvdWxkQWJzb3JiICYmIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mICh0aGVuID0gdmFsdWUudGhlbikgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuXCIpXG5cdFx0XHRcdFx0ZXhlY3V0ZU9uY2UodGhlbi5iaW5kKHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjYWxsQXN5bmMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXNob3VsZEFic29yYiAmJiBsaXN0Lmxlbmd0aCA9PT0gMCkgY29uc29sZS5lcnJvcihcIlBvc3NpYmxlIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjpcIiwgdmFsdWUpXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIGxpc3RbaV0odmFsdWUpXG5cdFx0XHRcdFx0XHRyZXNvbHZlcnMubGVuZ3RoID0gMCwgcmVqZWN0b3JzLmxlbmd0aCA9IDBcblx0XHRcdFx0XHRcdGluc3RhbmNlLnN0YXRlID0gc2hvdWxkQWJzb3JiXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5yZXRyeSA9IGZ1bmN0aW9uKCkge2V4ZWN1dGUodmFsdWUpfVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdEN1cnJlbnQoZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZXhlY3V0ZU9uY2UodGhlbikge1xuXHRcdHZhciBydW5zID0gMFxuXHRcdGZ1bmN0aW9uIHJ1bihmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChydW5zKysgPiAwKSByZXR1cm5cblx0XHRcdFx0Zm4odmFsdWUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBvbmVycm9yID0gcnVuKHJlamVjdEN1cnJlbnQpXG5cdFx0dHJ5IHt0aGVuKHJ1bihyZXNvbHZlQ3VycmVudCksIG9uZXJyb3IpfSBjYXRjaCAoZSkge29uZXJyb3IoZSl9XG5cdH1cblxuXHRleGVjdXRlT25jZShleGVjdXRvcilcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGlvbikge1xuXHR2YXIgc2VsZiA9IHRoaXMsIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2Vcblx0ZnVuY3Rpb24gaGFuZGxlKGNhbGxiYWNrLCBsaXN0LCBuZXh0LCBzdGF0ZSkge1xuXHRcdGxpc3QucHVzaChmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSBuZXh0KHZhbHVlKVxuXHRcdFx0ZWxzZSB0cnkge3Jlc29sdmVOZXh0KGNhbGxiYWNrKHZhbHVlKSl9IGNhdGNoIChlKSB7aWYgKHJlamVjdE5leHQpIHJlamVjdE5leHQoZSl9XG5cdFx0fSlcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlLnJldHJ5ID09PSBcImZ1bmN0aW9uXCIgJiYgc3RhdGUgPT09IGluc3RhbmNlLnN0YXRlKSBpbnN0YW5jZS5yZXRyeSgpXG5cdH1cblx0dmFyIHJlc29sdmVOZXh0LCByZWplY3ROZXh0XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtyZXNvbHZlTmV4dCA9IHJlc29sdmUsIHJlamVjdE5leHQgPSByZWplY3R9KVxuXHRoYW5kbGUob25GdWxmaWxsZWQsIGluc3RhbmNlLnJlc29sdmVycywgcmVzb2x2ZU5leHQsIHRydWUpLCBoYW5kbGUob25SZWplY3Rpb24sIGluc3RhbmNlLnJlamVjdG9ycywgcmVqZWN0TmV4dCwgZmFsc2UpXG5cdHJldHVybiBwcm9taXNlXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24ob25SZWplY3Rpb24pIHtcblx0cmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbilcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdHJldHVybiB0aGlzLnRoZW4oXG5cdFx0ZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlUG9seWZpbGwucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRmdW5jdGlvbihyZWFzb24pIHtcblx0XHRcdHJldHVybiBQcm9taXNlUG9seWZpbGwucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlamVjdChyZWFzb24pO1xuXHRcdFx0fSlcblx0XHR9XG5cdClcbn1cblByb21pc2VQb2x5ZmlsbC5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZVBvbHlmaWxsKSByZXR1cm4gdmFsdWVcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSkge3Jlc29sdmUodmFsdWUpfSlcbn1cblByb21pc2VQb2x5ZmlsbC5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtyZWplY3QodmFsdWUpfSlcbn1cblByb21pc2VQb2x5ZmlsbC5hbGwgPSBmdW5jdGlvbihsaXN0KSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciB0b3RhbCA9IGxpc3QubGVuZ3RoLCBjb3VudCA9IDAsIHZhbHVlcyA9IFtdXG5cdFx0aWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXNvbHZlKFtdKVxuXHRcdGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQoZnVuY3Rpb24oaSkge1xuXHRcdFx0XHRmdW5jdGlvbiBjb25zdW1lKHZhbHVlKSB7XG5cdFx0XHRcdFx0Y291bnQrK1xuXHRcdFx0XHRcdHZhbHVlc1tpXSA9IHZhbHVlXG5cdFx0XHRcdFx0aWYgKGNvdW50ID09PSB0b3RhbCkgcmVzb2x2ZSh2YWx1ZXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGxpc3RbaV0gIT0gbnVsbCAmJiAodHlwZW9mIGxpc3RbaV0gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGxpc3RbaV0gPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mIGxpc3RbaV0udGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0bGlzdFtpXS50aGVuKGNvbnN1bWUsIHJlamVjdClcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGNvbnN1bWUobGlzdFtpXSlcblx0XHRcdH0pKGkpXG5cdFx0fVxuXHR9KVxufVxuUHJvbWlzZVBvbHlmaWxsLnJhY2UgPSBmdW5jdGlvbihsaXN0KSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdFtpXS50aGVuKHJlc29sdmUsIHJlamVjdClcblx0XHR9XG5cdH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZVBvbHlmaWxsXG4iLCAiLyogZ2xvYmFsIHdpbmRvdyAqL1xuXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3BvbHlmaWxsXCIpXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2Ygd2luZG93LlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHR3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCF3aW5kb3cuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdHdpbmRvdy5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUHJvbWlzZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsLlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRnbG9iYWwuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCFnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdGdsb2JhbC5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuUHJvbWlzZVxufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlUG9seWZpbGxcbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdykge1xuXHR2YXIgJGRvYyA9ICR3aW5kb3cgJiYgJHdpbmRvdy5kb2N1bWVudFxuXHR2YXIgY3VycmVudFJlZHJhd1xuXG5cdHZhciBuYW1lU3BhY2UgPSB7XG5cdFx0c3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG5cdFx0bWF0aDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCJcblx0fVxuXG5cdGZ1bmN0aW9uIGdldE5hbWVTcGFjZSh2bm9kZSkge1xuXHRcdHJldHVybiB2bm9kZS5hdHRycyAmJiB2bm9kZS5hdHRycy54bWxucyB8fCBuYW1lU3BhY2Vbdm5vZGUudGFnXVxuXHR9XG5cblx0Ly9zYW5pdHkgY2hlY2sgdG8gZGlzY291cmFnZSBwZW9wbGUgZnJvbSBkb2luZyBgdm5vZGUuc3RhdGUgPSAuLi5gXG5cdGZ1bmN0aW9uIGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKSB7XG5cdFx0aWYgKHZub2RlLnN0YXRlICE9PSBvcmlnaW5hbCkgdGhyb3cgbmV3IEVycm9yKFwiJ3Zub2RlLnN0YXRlJyBtdXN0IG5vdCBiZSBtb2RpZmllZC5cIilcblx0fVxuXG5cdC8vTm90ZTogdGhlIGhvb2sgaXMgcGFzc2VkIGFzIHRoZSBgdGhpc2AgYXJndW1lbnQgdG8gYWxsb3cgcHJveHlpbmcgdGhlXG5cdC8vYXJndW1lbnRzIHdpdGhvdXQgcmVxdWlyaW5nIGEgZnVsbCBhcnJheSBhbGxvY2F0aW9uIHRvIGRvIHNvLiBJdCBhbHNvXG5cdC8vdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoZSBjdXJyZW50IGB2bm9kZWAgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IGluXG5cdC8vYWxsIGxpZmVjeWNsZSBtZXRob2RzLlxuXHRmdW5jdGlvbiBjYWxsSG9vayh2bm9kZSkge1xuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5KG9yaWdpbmFsLCBhcmd1bWVudHMpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXHRcdH1cblx0fVxuXG5cdC8vIElFMTEgKGF0IGxlYXN0KSB0aHJvd3MgYW4gVW5zcGVjaWZpZWRFcnJvciB3aGVuIGFjY2Vzc2luZyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHdoZW5cblx0Ly8gaW5zaWRlIGFuIGlmcmFtZS4gQ2F0Y2ggYW5kIHN3YWxsb3cgdGhpcyBlcnJvciwgYW5kIGhlYXZ5LWhhbmRpZGx5IHJldHVybiBudWxsLlxuXHRmdW5jdGlvbiBhY3RpdmVFbGVtZW50KCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gJGRvYy5hY3RpdmVFbGVtZW50XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cblx0Ly9jcmVhdGVcblx0ZnVuY3Rpb24gY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRcdGNhc2UgXCIjXCI6IGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRjYXNlIFwiPFwiOiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdGNhc2UgXCJbXCI6IGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRkZWZhdWx0OiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlVGV4dChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZub2RlLmRvbSA9ICRkb2MuY3JlYXRlVGV4dE5vZGUodm5vZGUuY2hpbGRyZW4pXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIHZub2RlLmRvbSwgbmV4dFNpYmxpbmcpXG5cdH1cblx0dmFyIHBvc3NpYmxlUGFyZW50cyA9IHtjYXB0aW9uOiBcInRhYmxlXCIsIHRoZWFkOiBcInRhYmxlXCIsIHRib2R5OiBcInRhYmxlXCIsIHRmb290OiBcInRhYmxlXCIsIHRyOiBcInRib2R5XCIsIHRoOiBcInRyXCIsIHRkOiBcInRyXCIsIGNvbGdyb3VwOiBcInRhYmxlXCIsIGNvbDogXCJjb2xncm91cFwifVxuXHRmdW5jdGlvbiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciBtYXRjaCA9IHZub2RlLmNoaWxkcmVuLm1hdGNoKC9eXFxzKj88KFxcdyspL2ltKSB8fCBbXVxuXHRcdC8vIG5vdCB1c2luZyB0aGUgcHJvcGVyIHBhcmVudCBtYWtlcyB0aGUgY2hpbGQgZWxlbWVudChzKSB2YW5pc2guXG5cdFx0Ly8gICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0Ly8gICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0ZD5pPC90ZD48dGQ+ajwvdGQ+XCJcblx0XHQvLyAgICAgY29uc29sZS5sb2coZGl2LmlubmVySFRNTClcblx0XHQvLyAtLT4gXCJpalwiLCBubyA8dGQ+IGluIHNpZ2h0LlxuXHRcdHZhciB0ZW1wID0gJGRvYy5jcmVhdGVFbGVtZW50KHBvc3NpYmxlUGFyZW50c1ttYXRjaFsxXV0gfHwgXCJkaXZcIilcblx0XHRpZiAobnMgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIikge1xuXHRcdFx0dGVtcC5pbm5lckhUTUwgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj5cIiArIHZub2RlLmNoaWxkcmVuICsgXCI8L3N2Zz5cIlxuXHRcdFx0dGVtcCA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0ZW1wLmlubmVySFRNTCA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSB0ZW1wLmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0Ly8gQ2FwdHVyZSBub2RlcyB0byByZW1vdmUsIHNvIHdlIGRvbid0IGNvbmZ1c2UgdGhlbS5cblx0XHR2bm9kZS5pbnN0YW5jZSA9IFtdXG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHR2YXIgY2hpbGRcblx0XHR3aGlsZSAoY2hpbGQgPSB0ZW1wLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHZub2RlLmluc3RhbmNlLnB1c2goY2hpbGQpXG5cdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZClcblx0XHR9XG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdGNyZWF0ZU5vZGVzKGZyYWdtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IGZyYWdtZW50LmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGhcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHR2YXIgYXR0cnMgPSB2bm9kZS5hdHRyc1xuXHRcdHZhciBpcyA9IGF0dHJzICYmIGF0dHJzLmlzXG5cblx0XHRucyA9IGdldE5hbWVTcGFjZSh2bm9kZSkgfHwgbnNcblxuXHRcdHZhciBlbGVtZW50ID0gbnMgP1xuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKSA6XG5cdFx0XHRpcyA/ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcsIHtpczogaXN9KSA6ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0dm5vZGUuZG9tID0gZWxlbWVudFxuXG5cdFx0aWYgKGF0dHJzICE9IG51bGwpIHtcblx0XHRcdHNldEF0dHJzKHZub2RlLCBhdHRycywgbnMpXG5cdFx0fVxuXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGVsZW1lbnQsIG5leHRTaWJsaW5nKVxuXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdGlmICh2bm9kZS5jaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRcdGNyZWF0ZU5vZGVzKGVsZW1lbnQsIGNoaWxkcmVuLCAwLCBjaGlsZHJlbi5sZW5ndGgsIGhvb2tzLCBudWxsLCBucylcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBhdHRycyAhPSBudWxsKSBzZXRMYXRlU2VsZWN0QXR0cnModm5vZGUsIGF0dHJzKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpbml0Q29tcG9uZW50KHZub2RlLCBob29rcykge1xuXHRcdHZhciBzZW50aW5lbFxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnLnZpZXcgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSBPYmplY3QuY3JlYXRlKHZub2RlLnRhZylcblx0XHRcdHNlbnRpbmVsID0gdm5vZGUuc3RhdGUudmlld1xuXHRcdFx0aWYgKHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkICE9IG51bGwpIHJldHVyblxuXHRcdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSB0cnVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZub2RlLnN0YXRlID0gdm9pZCAwXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnRhZ1xuXHRcdFx0aWYgKHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkICE9IG51bGwpIHJldHVyblxuXHRcdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSB0cnVlXG5cdFx0XHR2bm9kZS5zdGF0ZSA9ICh2bm9kZS50YWcucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLnRhZy5wcm90b3R5cGUudmlldyA9PT0gXCJmdW5jdGlvblwiKSA/IG5ldyB2bm9kZS50YWcodm5vZGUpIDogdm5vZGUudGFnKHZub2RlKVxuXHRcdH1cblx0XHRpbml0TGlmZWN5Y2xlKHZub2RlLnN0YXRlLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHR2bm9kZS5pbnN0YW5jZSA9IFZub2RlLm5vcm1hbGl6ZShjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLnZpZXcsIHZub2RlKSlcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgPT09IHZub2RlKSB0aHJvdyBFcnJvcihcIkEgdmlldyBjYW5ub3QgcmV0dXJuIHRoZSB2bm9kZSBpdCByZWNlaXZlZCBhcyBhcmd1bWVudFwiKVxuXHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gbnVsbFxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0aW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmRvbSAhPSBudWxsID8gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZSA6IDBcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdH1cblx0fVxuXG5cdC8vdXBkYXRlXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RnJhZ21lbnR9IHBhcmVudCAtIHRoZSBwYXJlbnQgZWxlbWVudFxuXHQgKiBAcGFyYW0ge1Zub2RlW10gfCBudWxsfSBvbGQgLSB0aGUgbGlzdCBvZiB2bm9kZXMgb2YgdGhlIGxhc3QgYHJlbmRlcigpYCBjYWxsIGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHBhcnQgb2YgdGhlIHRyZWVcblx0ICogQHBhcmFtIHtWbm9kZVtdIHwgbnVsbH0gdm5vZGVzIC0gYXMgYWJvdmUsIGJ1dCBmb3IgdGhlIGN1cnJlbnQgYHJlbmRlcigpYCBjYWxsLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGhvb2tzIC0gYW4gYWNjdW11bGF0b3Igb2YgcG9zdC1yZW5kZXIgaG9va3MgKG9uY3JlYXRlL29udXBkYXRlKVxuXHQgKiBAcGFyYW0ge0VsZW1lbnQgfCBudWxsfSBuZXh0U2libGluZyAtIHRoZSBuZXh0IERPTSBub2RlIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQgdGhhdCBpcyBub3QgdGhlIGxhc3QgaXRlbSBpbiBpdHNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRcblx0ICogQHBhcmFtIHsnc3ZnJyB8ICdtYXRoJyB8IFN0cmluZyB8IG51bGx9IG5zKSAtIHRoZSBjdXJyZW50IFhNTCBuYW1lc3BhY2UsIGlmIGFueVxuXHQgKiBAcmV0dXJucyB2b2lkXG5cdCAqL1xuXHQvLyBUaGlzIGZ1bmN0aW9uIGRpZmZzIGFuZCBwYXRjaGVzIGxpc3RzIG9mIHZub2RlcywgYm90aCBrZXllZCBhbmQgdW5rZXllZC5cblx0Ly9cblx0Ly8gV2Ugd2lsbDpcblx0Ly9cblx0Ly8gMS4gZGVzY3JpYmUgaXRzIGdlbmVyYWwgc3RydWN0dXJlXG5cdC8vIDIuIGZvY3VzIG9uIHRoZSBkaWZmIGFsZ29yaXRobSBvcHRpbWl6YXRpb25zXG5cdC8vIDMuIGRpc2N1c3MgRE9NIG5vZGUgb3BlcmF0aW9ucy5cblxuXHQvLyAjIyBPdmVydmlldzpcblx0Ly9cblx0Ly8gVGhlIHVwZGF0ZU5vZGVzKCkgZnVuY3Rpb246XG5cdC8vIC0gZGVhbHMgd2l0aCB0cml2aWFsIGNhc2VzXG5cdC8vIC0gZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBsaXN0cyBhcmUga2V5ZWQgb3IgdW5rZXllZCBiYXNlZCBvbiB0aGUgZmlyc3Qgbm9uLW51bGwgbm9kZVxuXHQvLyAgIG9mIGVhY2ggbGlzdC5cblx0Ly8gLSBkaWZmcyB0aGVtIGFuZCBwYXRjaGVzIHRoZSBET00gaWYgbmVlZGVkICh0aGF0J3MgdGhlIGJydW50IG9mIHRoZSBjb2RlKVxuXHQvLyAtIG1hbmFnZXMgdGhlIGxlZnRvdmVyczogYWZ0ZXIgZGlmZmluZywgYXJlIHRoZXJlOlxuXHQvLyAgIC0gb2xkIG5vZGVzIGxlZnQgdG8gcmVtb3ZlP1xuXHQvLyBcdCAtIG5ldyBub2RlcyB0byBpbnNlcnQ/XG5cdC8vIFx0IGRlYWwgd2l0aCB0aGVtIVxuXHQvL1xuXHQvLyBUaGUgbGlzdHMgYXJlIG9ubHkgaXRlcmF0ZWQgb3ZlciBvbmNlLCB3aXRoIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIG5vZGVzIGluIGBvbGRgIHRoYXRcblx0Ly8gYXJlIHZpc2l0ZWQgaW4gdGhlIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGFuZCBpbiB0aGUgYHJlbW92ZU5vZGVzYCBsb29wLlxuXG5cdC8vICMjIERpZmZpbmdcblx0Ly9cblx0Ly8gUmVhZGluZyBodHRwczovL2dpdGh1Yi5jb20vbG9jYWx2b2lkL2l2aS9ibG9iL2RkYzA5ZDA2YWJhZWY0NTI0OGU2MTMzZjcwNDBkMDBkM2M2YmU4NTMvcGFja2FnZXMvaXZpL3NyYy92ZG9tL2ltcGxlbWVudGF0aW9uLnRzI0w2MTctTDgzN1xuXHQvLyBtYXkgYmUgZ29vZCBmb3IgY29udGV4dCBvbiBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UtYmFzZWQgbG9naWMgZm9yIG1vdmluZyBub2Rlcy5cblx0Ly9cblx0Ly8gSW4gb3JkZXIgdG8gZGlmZiBrZXllZCBsaXN0cywgb25lIGhhcyB0b1xuXHQvL1xuXHQvLyAxKSBtYXRjaCBub2RlcyBpbiBib3RoIGxpc3RzLCBwZXIga2V5LCBhbmQgdXBkYXRlIHRoZW0gYWNjb3JkaW5nbHlcblx0Ly8gMikgY3JlYXRlIHRoZSBub2RlcyBwcmVzZW50IGluIHRoZSBuZXcgbGlzdCwgYnV0IGFic2VudCBpbiB0aGUgb2xkIG9uZVxuXHQvLyAzKSByZW1vdmUgdGhlIG5vZGVzIHByZXNlbnQgaW4gdGhlIG9sZCBsaXN0LCBidXQgYWJzZW50IGluIHRoZSBuZXcgb25lXG5cdC8vIDQpIGZpZ3VyZSBvdXQgd2hhdCBub2RlcyBpbiAxKSB0byBtb3ZlIGluIG9yZGVyIHRvIG1pbmltaXplIHRoZSBET00gb3BlcmF0aW9ucy5cblx0Ly9cblx0Ly8gVG8gYWNoaWV2ZSAxKSBvbmUgY2FuIGNyZWF0ZSBhIGRpY3Rpb25hcnkgb2Yga2V5cyA9PiBpbmRleCAoZm9yIHRoZSBvbGQgbGlzdCksIHRoZW4gaXRlcmF0ZVxuXHQvLyBvdmVyIHRoZSBuZXcgbGlzdCBhbmQgZm9yIGVhY2ggbmV3IHZub2RlLCBmaW5kIHRoZSBjb3JyZXNwb25kaW5nIHZub2RlIGluIHRoZSBvbGQgbGlzdCB1c2luZ1xuXHQvLyB0aGUgbWFwLlxuXHQvLyAyKSBpcyBhY2hpZXZlZCBpbiB0aGUgc2FtZSBzdGVwOiBpZiBhIG5ldyBub2RlIGhhcyBubyBjb3JyZXNwb25kaW5nIGVudHJ5IGluIHRoZSBtYXAsIGl0IGlzIG5ld1xuXHQvLyBhbmQgbXVzdCBiZSBjcmVhdGVkLlxuXHQvLyBGb3IgdGhlIHJlbW92YWxzLCB3ZSBhY3R1YWxseSByZW1vdmUgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIHVwZGF0ZWQgZnJvbSB0aGUgb2xkIGxpc3QuXG5cdC8vIFRoZSBub2RlcyB0aGF0IHJlbWFpbiBpbiB0aGF0IGxpc3QgYWZ0ZXIgMSkgYW5kIDIpIGhhdmUgYmVlbiBwZXJmb3JtZWQgY2FuIGJlIHNhZmVseSByZW1vdmVkLlxuXHQvLyBUaGUgZm91cnRoIHN0ZXAgaXMgYSBiaXQgbW9yZSBjb21wbGV4IGFuZCByZWxpZXMgb24gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSAoTElTKVxuXHQvLyBhbGdvcml0aG0uXG5cdC8vXG5cdC8vIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgaXMgdGhlIGxpc3Qgb2Ygbm9kZXMgdGhhdCBjYW4gcmVtYWluIGluIHBsYWNlLiBJbWFnaW5lIGdvaW5nXG5cdC8vIGZyb20gYDEsMiwzLDQsNWAgdG8gYDQsNSwxLDIsM2Agd2hlcmUgdGhlIG51bWJlcnMgYXJlIG5vdCBuZWNlc3NhcmlseSB0aGUga2V5cywgYnV0IHRoZSBpbmRpY2VzXG5cdC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleWVkIG5vZGVzIGluIHRoZSBvbGQgbGlzdCAoa2V5ZWQgbm9kZXMgYGUsZCxjLGIsYWAgPT4gYGIsYSxlLGQsY2Agd291bGRcblx0Ly8gIG1hdGNoIHRoZSBhYm92ZSBsaXN0cywgZm9yIGV4YW1wbGUpLlxuXHQvL1xuXHQvLyBJbiB0aGVyZSBhcmUgdHdvIGluY3JlYXNpbmcgc3Vic2VxdWVuY2VzOiBgNCw1YCBhbmQgYDEsMiwzYCwgdGhlIGxhdHRlciBiZWluZyB0aGUgbG9uZ2VzdC4gV2Vcblx0Ly8gY2FuIHVwZGF0ZSB0aG9zZSBub2RlcyB3aXRob3V0IG1vdmluZyB0aGVtLCBhbmQgb25seSBjYWxsIGBpbnNlcnROb2RlYCBvbiBgNGAgYW5kIGA1YC5cblx0Ly9cblx0Ly8gQGxvY2Fsdm9pZCBhZGFwdGVkIHRoZSBhbGdvIHRvIGFsc28gc3VwcG9ydCBub2RlIGRlbGV0aW9ucyBhbmQgaW5zZXJ0aW9ucyAodGhlIGBsaXNgIGlzIGFjdHVhbGx5XG5cdC8vIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgKm9mIG9sZCBub2RlcyBzdGlsbCBwcmVzZW50IGluIHRoZSBuZXcgbGlzdCopLlxuXHQvL1xuXHQvLyBJdCBpcyBhIGdlbmVyYWwgYWxnb3JpdGhtIHRoYXQgaXMgZmlyZXByb29mIGluIGFsbCBjaXJjdW1zdGFuY2VzLCBidXQgaXQgcmVxdWlyZXMgdGhlIGFsbG9jYXRpb25cblx0Ly8gYW5kIHRoZSBjb25zdHJ1Y3Rpb24gb2YgYSBga2V5ID0+IG9sZEluZGV4YCBtYXAsIGFuZCB0aHJlZSBhcnJheXMgKG9uZSB3aXRoIGBuZXdJbmRleCA9PiBvbGRJbmRleGAsXG5cdC8vIHRoZSBgTElTYCBhbmQgYSB0ZW1wb3Jhcnkgb25lIHRvIGNyZWF0ZSB0aGUgTElTKS5cblx0Ly9cblx0Ly8gU28gd2UgY2hlYXQgd2hlcmUgd2UgY2FuOiBpZiB0aGUgdGFpbHMgb2YgdGhlIGxpc3RzIGFyZSBpZGVudGljYWwsIHRoZXkgYXJlIGd1YXJhbnRlZWQgdG8gYmUgcGFydCBvZlxuXHQvLyB0aGUgTElTIGFuZCBjYW4gYmUgdXBkYXRlZCB3aXRob3V0IG1vdmluZyB0aGVtLlxuXHQvL1xuXHQvLyBJZiB0d28gbm9kZXMgYXJlIHN3YXBwZWQsIHRoZXkgYXJlIGd1YXJhbnRlZWQgbm90IHRvIGJlIHBhcnQgb2YgdGhlIExJUywgYW5kIG11c3QgYmUgbW92ZWQgKHdpdGhcblx0Ly8gdGhlIGV4Y2VwdGlvbiBvZiB0aGUgbGFzdCBub2RlIGlmIHRoZSBsaXN0IGlzIGZ1bGx5IHJldmVyc2VkKS5cblx0Ly9cblx0Ly8gIyMgRmluZGluZyB0aGUgbmV4dCBzaWJsaW5nLlxuXHQvL1xuXHQvLyBgdXBkYXRlTm9kZSgpYCBhbmQgYGNyZWF0ZU5vZGUoKWAgZXhwZWN0IGEgbmV4dFNpYmxpbmcgcGFyYW1ldGVyIHRvIHBlcmZvcm0gRE9NIG9wZXJhdGlvbnMuXG5cdC8vIFdoZW4gdGhlIGxpc3QgaXMgYmVpbmcgdHJhdmVyc2VkIHRvcC1kb3duLCBhdCBhbnkgaW5kZXgsIHRoZSBET00gbm9kZXMgdXAgdG8gdGhlIHByZXZpb3VzXG5cdC8vIHZub2RlIHJlZmxlY3QgdGhlIGNvbnRlbnQgb2YgdGhlIG5ldyBsaXN0LCB3aGVyZWFzIHRoZSByZXN0IG9mIHRoZSBET00gbm9kZXMgcmVmbGVjdCB0aGUgb2xkXG5cdC8vIGxpc3QuIFRoZSBuZXh0IHNpYmxpbmcgbXVzdCBiZSBsb29rZWQgZm9yIGluIHRoZSBvbGQgbGlzdCB1c2luZyBgZ2V0TmV4dFNpYmxpbmcoLi4uIG9sZFN0YXJ0ICsgMSAuLi4pYC5cblx0Ly9cblx0Ly8gSW4gdGhlIG90aGVyIHNjZW5hcmlvcyAoc3dhcHMsIHVwd2FyZHMgdHJhdmVyc2FsLCBtYXAtYmFzZWQgZGlmZiksXG5cdC8vIHRoZSBuZXcgdm5vZGVzIGxpc3QgaXMgdHJhdmVyc2VkIHVwd2FyZHMuIFRoZSBET00gbm9kZXMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCByZWZsZWN0IHRoZVxuXHQvLyBib3R0b20gcGFydCBvZiB0aGUgbmV3IHZub2RlcyBsaXN0LCBhbmQgd2UgY2FuIHVzZSB0aGUgYHYuZG9tYCAgdmFsdWUgb2YgdGhlIHByZXZpb3VzIG5vZGVcblx0Ly8gYXMgdGhlIG5leHQgc2libGluZyAoY2FjaGVkIGluIHRoZSBgbmV4dFNpYmxpbmdgIHZhcmlhYmxlKS5cblxuXG5cdC8vICMjIERPTSBub2RlIG1vdmVzXG5cdC8vXG5cdC8vIEluIG1vc3Qgc2NlbmFyaW9zIGB1cGRhdGVOb2RlKClgIGFuZCBgY3JlYXRlTm9kZSgpYCBwZXJmb3JtIHRoZSBET00gb3BlcmF0aW9ucy4gSG93ZXZlcixcblx0Ly8gdGhpcyBpcyBub3QgdGhlIGNhc2UgaWYgdGhlIG5vZGUgbW92ZWQgKHNlY29uZCBhbmQgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgYWxnbykuIFdlIG1vdmVcblx0Ly8gdGhlIG9sZCBET00gbm9kZXMgYmVmb3JlIHVwZGF0ZU5vZGUgcnVucyBiZWNhdXNlIGl0IGVuYWJsZXMgdXMgdG8gdXNlIHRoZSBjYWNoZWQgYG5leHRTaWJsaW5nYFxuXHQvLyB2YXJpYWJsZSByYXRoZXIgdGhhbiBmZXRjaGluZyBpdCB1c2luZyBgZ2V0TmV4dFNpYmxpbmcoKWAuXG5cdC8vXG5cdC8vIFRoZSBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBjdXJyZW50bHkgaW5zZXJ0cyBub2RlcyB1bmNvbmRpdGlvbmFsbHksIGxlYWRpbmcgdG8gaXNzdWVzXG5cdC8vIGxpa2UgIzE3OTEgYW5kICMxOTk5LiBXZSBuZWVkIHRvIGJlIHNtYXJ0ZXIgYWJvdXQgdGhvc2Ugc2l0dWF0aW9ucyB3aGVyZSBhZGphc2NlbnQgb2xkXG5cdC8vIG5vZGVzIHJlbWFpbiB0b2dldGhlciBpbiB0aGUgbmV3IGxpc3QgaW4gYSB3YXkgdGhhdCBpc24ndCBjb3ZlcmVkIGJ5IHBhcnRzIG9uZSBhbmRcblx0Ly8gdGhyZWUgb2YgdGhlIGRpZmYgYWxnby5cblxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlcyhwYXJlbnQsIG9sZCwgdm5vZGVzLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0aWYgKG9sZCA9PT0gdm5vZGVzIHx8IG9sZCA9PSBudWxsICYmIHZub2RlcyA9PSBudWxsKSByZXR1cm5cblx0XHRlbHNlIGlmIChvbGQgPT0gbnVsbCB8fCBvbGQubGVuZ3RoID09PSAwKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2RlcywgMCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRlbHNlIGlmICh2bm9kZXMgPT0gbnVsbCB8fCB2bm9kZXMubGVuZ3RoID09PSAwKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgMCwgb2xkLmxlbmd0aClcblx0XHRlbHNlIHtcblx0XHRcdHZhciBpc09sZEtleWVkID0gb2xkWzBdICE9IG51bGwgJiYgb2xkWzBdLmtleSAhPSBudWxsXG5cdFx0XHR2YXIgaXNLZXllZCA9IHZub2Rlc1swXSAhPSBudWxsICYmIHZub2Rlc1swXS5rZXkgIT0gbnVsbFxuXHRcdFx0dmFyIHN0YXJ0ID0gMCwgb2xkU3RhcnQgPSAwXG5cdFx0XHRpZiAoIWlzT2xkS2V5ZWQpIHdoaWxlIChvbGRTdGFydCA8IG9sZC5sZW5ndGggJiYgb2xkW29sZFN0YXJ0XSA9PSBudWxsKSBvbGRTdGFydCsrXG5cdFx0XHRpZiAoIWlzS2V5ZWQpIHdoaWxlIChzdGFydCA8IHZub2Rlcy5sZW5ndGggJiYgdm5vZGVzW3N0YXJ0XSA9PSBudWxsKSBzdGFydCsrXG5cdFx0XHRpZiAoaXNPbGRLZXllZCAhPT0gaXNLZXllZCkge1xuXHRcdFx0XHRyZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgb2xkU3RhcnQsIG9sZC5sZW5ndGgpXG5cdFx0XHRcdGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdH0gZWxzZSBpZiAoIWlzS2V5ZWQpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgaW5kZXggcGFzdCB0aGUgZW5kIG9mIGVpdGhlciBsaXN0IChjYXVzZXMgZGVvcHRzKS5cblx0XHRcdFx0dmFyIGNvbW1vbkxlbmd0aCA9IG9sZC5sZW5ndGggPCB2bm9kZXMubGVuZ3RoID8gb2xkLmxlbmd0aCA6IHZub2Rlcy5sZW5ndGhcblx0XHRcdFx0Ly8gUmV3aW5kIGlmIG5lY2Vzc2FyeSB0byB0aGUgZmlyc3Qgbm9uLW51bGwgaW5kZXggb24gZWl0aGVyIHNpZGUuXG5cdFx0XHRcdC8vIFdlIGNvdWxkIGFsdGVybmF0aXZlbHkgZWl0aGVyIGV4cGxpY2l0bHkgY3JlYXRlIG9yIHJlbW92ZSBub2RlcyB3aGVuIGBzdGFydCAhPT0gb2xkU3RhcnRgXG5cdFx0XHRcdC8vIGJ1dCB0aGF0IHdvdWxkIGJlIG9wdGltaXppbmcgZm9yIHNwYXJzZSBsaXN0cyB3aGljaCBhcmUgbW9yZSByYXJlIHRoYW4gZGVuc2Ugb25lcy5cblx0XHRcdFx0c3RhcnQgPSBzdGFydCA8IG9sZFN0YXJ0ID8gc3RhcnQgOiBvbGRTdGFydFxuXHRcdFx0XHRmb3IgKDsgc3RhcnQgPCBjb21tb25MZW5ndGg7IHN0YXJ0KyspIHtcblx0XHRcdFx0XHRvID0gb2xkW3N0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdFx0aWYgKG8gPT09IHYgfHwgbyA9PSBudWxsICYmIHYgPT0gbnVsbCkgY29udGludWVcblx0XHRcdFx0XHRlbHNlIGlmIChvID09IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIGdldE5leHRTaWJsaW5nKG9sZCwgc3RhcnQgKyAxLCBuZXh0U2libGluZykpXG5cdFx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSByZW1vdmVOb2RlKHBhcmVudCwgbylcblx0XHRcdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBzdGFydCArIDEsIG5leHRTaWJsaW5nKSwgbnMpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG9sZC5sZW5ndGggPiBjb21tb25MZW5ndGgpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBzdGFydCwgb2xkLmxlbmd0aClcblx0XHRcdFx0aWYgKHZub2Rlcy5sZW5ndGggPiBjb21tb25MZW5ndGgpIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGtleWVkIGRpZmZcblx0XHRcdFx0dmFyIG9sZEVuZCA9IG9sZC5sZW5ndGggLSAxLCBlbmQgPSB2bm9kZXMubGVuZ3RoIC0gMSwgbWFwLCBvLCB2LCBvZSwgdmUsIHRvcFNpYmxpbmdcblxuXHRcdFx0XHQvLyBib3R0b20tdXBcblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRcdGlmIChvZS5rZXkgIT09IHZlLmtleSkgYnJlYWtcblx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB0b3AtZG93blxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdG8gPSBvbGRbb2xkU3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0XHRpZiAoby5rZXkgIT09IHYua2V5KSBicmVha1xuXHRcdFx0XHRcdG9sZFN0YXJ0KyssIHN0YXJ0Kytcblx0XHRcdFx0XHRpZiAobyAhPT0gdikgdXBkYXRlTm9kZShwYXJlbnQsIG8sIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZyksIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHN3YXBzIGFuZCBsaXN0IHJldmVyc2Fsc1xuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdGlmIChzdGFydCA9PT0gZW5kKSBicmVha1xuXHRcdFx0XHRcdGlmIChvLmtleSAhPT0gdmUua2V5IHx8IG9lLmtleSAhPT0gdi5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0dG9wU2libGluZyA9IGdldE5leHRTaWJsaW5nKG9sZCwgb2xkU3RhcnQsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdG1vdmVOb2RlcyhwYXJlbnQsIG9lLCB0b3BTaWJsaW5nKVxuXHRcdFx0XHRcdGlmIChvZSAhPT0gdikgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2LCBob29rcywgdG9wU2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKCsrc3RhcnQgPD0gLS1lbmQpIG1vdmVOb2RlcyhwYXJlbnQsIG8sIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdGlmIChvICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG8sIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRTdGFydCsrOyBvbGRFbmQtLVxuXHRcdFx0XHRcdG9lID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tlbmRdXG5cdFx0XHRcdFx0byA9IG9sZFtvbGRTdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGJvdHRvbSB1cCBvbmNlIGFnYWluXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0aWYgKG9lLmtleSAhPT0gdmUua2V5KSBicmVha1xuXHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdG9sZEVuZC0tLCBlbmQtLVxuXHRcdFx0XHRcdG9lID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tlbmRdXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHN0YXJ0ID4gZW5kKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEpXG5cdFx0XHRcdGVsc2UgaWYgKG9sZFN0YXJ0ID4gb2xkRW5kKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCArIDEsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vIGluc3BpcmVkIGJ5IGl2aSBodHRwczovL2dpdGh1Yi5jb20vaXZpanMvaXZpLyBieSBCb3JpcyBLYXVsXG5cdFx0XHRcdFx0dmFyIG9yaWdpbmFsTmV4dFNpYmxpbmcgPSBuZXh0U2libGluZywgdm5vZGVzTGVuZ3RoID0gZW5kIC0gc3RhcnQgKyAxLCBvbGRJbmRpY2VzID0gbmV3IEFycmF5KHZub2Rlc0xlbmd0aCksIGxpPTAsIGk9MCwgcG9zID0gMjE0NzQ4MzY0NywgbWF0Y2hlZCA9IDAsIG1hcCwgbGlzSW5kaWNlc1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCB2bm9kZXNMZW5ndGg7IGkrKykgb2xkSW5kaWNlc1tpXSA9IC0xXG5cdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdGlmIChtYXAgPT0gbnVsbCkgbWFwID0gZ2V0S2V5TWFwKG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEpXG5cdFx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tpXVxuXHRcdFx0XHRcdFx0dmFyIG9sZEluZGV4ID0gbWFwW3ZlLmtleV1cblx0XHRcdFx0XHRcdGlmIChvbGRJbmRleCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHBvcyA9IChvbGRJbmRleCA8IHBvcykgPyBvbGRJbmRleCA6IC0xIC8vIGJlY29tZXMgLTEgaWYgbm9kZXMgd2VyZSByZS1vcmRlcmVkXG5cdFx0XHRcdFx0XHRcdG9sZEluZGljZXNbaS1zdGFydF0gPSBvbGRJbmRleFxuXHRcdFx0XHRcdFx0XHRvZSA9IG9sZFtvbGRJbmRleF1cblx0XHRcdFx0XHRcdFx0b2xkW29sZEluZGV4XSA9IG51bGxcblx0XHRcdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkKytcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV4dFNpYmxpbmcgPSBvcmlnaW5hbE5leHRTaWJsaW5nXG5cdFx0XHRcdFx0aWYgKG1hdGNoZWQgIT09IG9sZEVuZCAtIG9sZFN0YXJ0ICsgMSkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRcdGlmIChtYXRjaGVkID09PSAwKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCArIDEsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAocG9zID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHQvLyB0aGUgaW5kaWNlcyBvZiB0aGUgaW5kaWNlcyBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgcGFydCBvZiB0aGVcblx0XHRcdFx0XHRcdFx0Ly8gbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIGluIHRoZSBvbGRJbmRpY2VzIGxpc3Rcblx0XHRcdFx0XHRcdFx0bGlzSW5kaWNlcyA9IG1ha2VMaXNJbmRpY2VzKG9sZEluZGljZXMpXG5cdFx0XHRcdFx0XHRcdGxpID0gbGlzSW5kaWNlcy5sZW5ndGggLSAxXG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0diA9IHZub2Rlc1tpXVxuXHRcdFx0XHRcdFx0XHRcdGlmIChvbGRJbmRpY2VzW2ktc3RhcnRdID09PSAtMSkgY3JlYXRlTm9kZShwYXJlbnQsIHYsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobGlzSW5kaWNlc1tsaV0gPT09IGkgLSBzdGFydCkgbGktLVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBtb3ZlTm9kZXMocGFyZW50LCB2LCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHYuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdm5vZGVzW2ldLmRvbVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHYgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdFx0XHRpZiAob2xkSW5kaWNlc1tpLXN0YXJ0XSA9PT0gLTEpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdGlmICh2LmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZub2Rlc1tpXS5kb21cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHZhciBvbGRUYWcgPSBvbGQudGFnLCB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAob2xkVGFnID09PSB0YWcpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gb2xkLnN0YXRlXG5cdFx0XHR2bm9kZS5ldmVudHMgPSBvbGQuZXZlbnRzXG5cdFx0XHRpZiAoc2hvdWxkTm90VXBkYXRlKHZub2RlLCBvbGQpKSByZXR1cm5cblx0XHRcdGlmICh0eXBlb2Ygb2xkVGFnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRcdH1cblx0XHRcdFx0c3dpdGNoIChvbGRUYWcpIHtcblx0XHRcdFx0XHRjYXNlIFwiI1wiOiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCI8XCI6IHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCJbXCI6IHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucyk7IGJyZWFrXG5cdFx0XHRcdFx0ZGVmYXVsdDogdXBkYXRlRWxlbWVudChvbGQsIHZub2RlLCBob29rcywgbnMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZW1vdmVOb2RlKHBhcmVudCwgb2xkKVxuXHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuLnRvU3RyaW5nKCkgIT09IHZub2RlLmNoaWxkcmVuLnRvU3RyaW5nKCkpIHtcblx0XHRcdG9sZC5kb20ubm9kZVZhbHVlID0gdm5vZGUuY2hpbGRyZW5cblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuICE9PSB2bm9kZS5jaGlsZHJlbikge1xuXHRcdFx0cmVtb3ZlSFRNTChwYXJlbnQsIG9sZClcblx0XHRcdGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlRnJhZ21lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dXBkYXRlTm9kZXMocGFyZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdHZhciBkb21TaXplID0gMCwgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdHZub2RlLmRvbSA9IG51bGxcblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZC5kb20gIT0gbnVsbCkge1xuXHRcdFx0XHRcdGlmICh2bm9kZS5kb20gPT0gbnVsbCkgdm5vZGUuZG9tID0gY2hpbGQuZG9tXG5cdFx0XHRcdFx0ZG9tU2l6ZSArPSBjaGlsZC5kb21TaXplIHx8IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvbVNpemUgIT09IDEpIHZub2RlLmRvbVNpemUgPSBkb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgaG9va3MsIG5zKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0bnMgPSBnZXROYW1lU3BhY2Uodm5vZGUpIHx8IG5zXG5cblx0XHRpZiAodm5vZGUudGFnID09PSBcInRleHRhcmVhXCIpIHtcblx0XHRcdGlmICh2bm9kZS5hdHRycyA9PSBudWxsKSB2bm9kZS5hdHRycyA9IHt9XG5cdFx0fVxuXHRcdHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQuYXR0cnMsIHZub2RlLmF0dHJzLCBucylcblx0XHRpZiAoIW1heWJlU2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSkge1xuXHRcdFx0dXBkYXRlTm9kZXMoZWxlbWVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgaG9va3MsIG51bGwsIG5zKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUoY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS52aWV3LCB2bm9kZSkpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHR1cGRhdGVMaWZlY3ljbGUodm5vZGUuc3RhdGUsIHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgdXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGlmIChvbGQuaW5zdGFuY2UgPT0gbnVsbCkgY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlLCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmluc3RhbmNlLmRvbVNpemVcblx0XHR9XG5cdFx0ZWxzZSBpZiAob2xkLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdHJlbW92ZU5vZGUocGFyZW50LCBvbGQuaW5zdGFuY2UpXG5cdFx0XHR2bm9kZS5kb20gPSB1bmRlZmluZWRcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGdldEtleU1hcCh2bm9kZXMsIHN0YXJ0LCBlbmQpIHtcblx0XHR2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRcdGZvciAoOyBzdGFydCA8IGVuZDsgc3RhcnQrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGtleSA9IHZub2RlLmtleVxuXHRcdFx0XHRpZiAoa2V5ICE9IG51bGwpIG1hcFtrZXldID0gc3RhcnRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1hcFxuXHR9XG5cdC8vIExpZnRlZCBmcm9tIGl2aSBodHRwczovL2dpdGh1Yi5jb20vaXZpanMvaXZpL1xuXHQvLyB0YWtlcyBhIGxpc3Qgb2YgdW5pcXVlIG51bWJlcnMgKC0xIGlzIHNwZWNpYWwgYW5kIGNhblxuXHQvLyBvY2N1ciBtdWx0aXBsZSB0aW1lcykgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kaWNlc1xuXHQvLyBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nXG5cdC8vIHN1YnNlcXVlbmNlXG5cdHZhciBsaXNUZW1wID0gW11cblx0ZnVuY3Rpb24gbWFrZUxpc0luZGljZXMoYSkge1xuXHRcdHZhciByZXN1bHQgPSBbMF1cblx0XHR2YXIgdSA9IDAsIHYgPSAwLCBpID0gMFxuXHRcdHZhciBpbCA9IGxpc1RlbXAubGVuZ3RoID0gYS5sZW5ndGhcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIGxpc1RlbXBbaV0gPSBhW2ldXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgKytpKSB7XG5cdFx0XHRpZiAoYVtpXSA9PT0gLTEpIGNvbnRpbnVlXG5cdFx0XHR2YXIgaiA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV1cblx0XHRcdGlmIChhW2pdIDwgYVtpXSkge1xuXHRcdFx0XHRsaXNUZW1wW2ldID0galxuXHRcdFx0XHRyZXN1bHQucHVzaChpKVxuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0fVxuXHRcdFx0dSA9IDBcblx0XHRcdHYgPSByZXN1bHQubGVuZ3RoIC0gMVxuXHRcdFx0d2hpbGUgKHUgPCB2KSB7XG5cdFx0XHRcdC8vIEZhc3QgaW50ZWdlciBhdmVyYWdlIHdpdGhvdXQgb3ZlcmZsb3cuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdHZhciBjID0gKHUgPj4+IDEpICsgKHYgPj4+IDEpICsgKHUgJiB2ICYgMSlcblx0XHRcdFx0aWYgKGFbcmVzdWx0W2NdXSA8IGFbaV0pIHtcblx0XHRcdFx0XHR1ID0gYyArIDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2ID0gY1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoYVtpXSA8IGFbcmVzdWx0W3VdXSkge1xuXHRcdFx0XHRpZiAodSA+IDApIGxpc1RlbXBbaV0gPSByZXN1bHRbdSAtIDFdXG5cdFx0XHRcdHJlc3VsdFt1XSA9IGlcblx0XHRcdH1cblx0XHR9XG5cdFx0dSA9IHJlc3VsdC5sZW5ndGhcblx0XHR2ID0gcmVzdWx0W3UgLSAxXVxuXHRcdHdoaWxlICh1LS0gPiAwKSB7XG5cdFx0XHRyZXN1bHRbdV0gPSB2XG5cdFx0XHR2ID0gbGlzVGVtcFt2XVxuXHRcdH1cblx0XHRsaXNUZW1wLmxlbmd0aCA9IDBcblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRmdW5jdGlvbiBnZXROZXh0U2libGluZyh2bm9kZXMsIGksIG5leHRTaWJsaW5nKSB7XG5cdFx0Zm9yICg7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh2bm9kZXNbaV0gIT0gbnVsbCAmJiB2bm9kZXNbaV0uZG9tICE9IG51bGwpIHJldHVybiB2bm9kZXNbaV0uZG9tXG5cdFx0fVxuXHRcdHJldHVybiBuZXh0U2libGluZ1xuXHR9XG5cblx0Ly8gVGhpcyBjb3ZlcnMgYSByZWFsbHkgc3BlY2lmaWMgZWRnZSBjYXNlOlxuXHQvLyAtIFBhcmVudCBub2RlIGlzIGtleWVkIGFuZCBjb250YWlucyBjaGlsZFxuXHQvLyAtIENoaWxkIGlzIHJlbW92ZWQsIHJldHVybnMgdW5yZXNvbHZlZCBwcm9taXNlIGluIGBvbmJlZm9yZXJlbW92ZWBcblx0Ly8gLSBQYXJlbnQgbm9kZSBpcyBtb3ZlZCBpbiBrZXllZCBkaWZmXG5cdC8vIC0gUmVtYWluaW5nIGNoaWxkcmVuIHN0aWxsIG5lZWQgbW92ZWQgYXBwcm9wcmlhdGVseVxuXHQvL1xuXHQvLyBJZGVhbGx5LCBJJ2QgdHJhY2sgcmVtb3ZlZCBub2RlcyBhcyB3ZWxsLCBidXQgdGhhdCBpbnRyb2R1Y2VzIGEgbG90IG1vcmVcblx0Ly8gY29tcGxleGl0eSBhbmQgSSdtIG5vdCBleGFjdGx5IGludGVyZXN0ZWQgaW4gZG9pbmcgdGhhdC5cblx0ZnVuY3Rpb24gbW92ZU5vZGVzKHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWcgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIHZub2RlKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnLCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCB2bm9kZSkge1xuXHRcdC8vIERvZGdlIHRoZSByZWN1cnNpb24gb3ZlcmhlYWQgaW4gYSBmZXcgb2YgdGhlIG1vc3QgY29tbW9uIGNhc2VzLlxuXHRcdHdoaWxlICh2bm9kZS5kb20gIT0gbnVsbCAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmluc3RhbmNlXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuaW5zdGFuY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRmcmFnLmFwcGVuZENoaWxkKHZub2RlLmluc3RhbmNlW2ldKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLnRhZyAhPT0gXCJbXCIpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgcmVjdXJzZSBmb3IgdGV4dCBub2RlcyAqb3IqIGVsZW1lbnRzLCBqdXN0IGZyYWdtZW50c1xuXHRcdFx0XHRmcmFnLmFwcGVuZENoaWxkKHZub2RlLmRvbSlcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHZub2RlID0gdm5vZGUuY2hpbGRyZW5bMF1cblx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV1cblx0XHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCkgbW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgY2hpbGQpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaW5zZXJ0Tm9kZShwYXJlbnQsIGRvbSwgbmV4dFNpYmxpbmcpIHtcblx0XHRpZiAobmV4dFNpYmxpbmcgIT0gbnVsbCkgcGFyZW50Lmluc2VydEJlZm9yZShkb20sIG5leHRTaWJsaW5nKVxuXHRcdGVsc2UgcGFyZW50LmFwcGVuZENoaWxkKGRvbSlcblx0fVxuXG5cdGZ1bmN0aW9uIG1heWJlU2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSB7XG5cdFx0aWYgKHZub2RlLmF0dHJzID09IG51bGwgfHwgKFxuXHRcdFx0dm5vZGUuYXR0cnMuY29udGVudGVkaXRhYmxlID09IG51bGwgJiYgLy8gYXR0cmlidXRlXG5cdFx0XHR2bm9kZS5hdHRycy5jb250ZW50RWRpdGFibGUgPT0gbnVsbCAvLyBwcm9wZXJ0eVxuXHRcdCkpIHJldHVybiBmYWxzZVxuXHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGNoaWxkcmVuWzBdLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdHZhciBjb250ZW50ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0XHRcdGlmICh2bm9kZS5kb20uaW5uZXJIVE1MICE9PSBjb250ZW50KSB2bm9kZS5kb20uaW5uZXJIVE1MID0gY29udGVudFxuXHRcdH1cblx0XHRlbHNlIGlmIChjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2hpbGQgbm9kZSBvZiBhIGNvbnRlbnRlZGl0YWJsZSBtdXN0IGJlIHRydXN0ZWQuXCIpXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdC8vcmVtb3ZlXG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kKSB7XG5cdFx0Zm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHJlbW92ZU5vZGUocGFyZW50LCB2bm9kZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZShwYXJlbnQsIHZub2RlKSB7XG5cdFx0dmFyIG1hc2sgPSAwXG5cdFx0dmFyIG9yaWdpbmFsID0gdm5vZGUuc3RhdGVcblx0XHR2YXIgc3RhdGVSZXN1bHQsIGF0dHJzUmVzdWx0XG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnN0YXRlLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLm9uYmVmb3JlcmVtb3ZlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRtYXNrID0gMVxuXHRcdFx0XHRzdGF0ZVJlc3VsdCA9IHJlc3VsdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRtYXNrIHw9IDJcblx0XHRcdFx0YXR0cnNSZXN1bHQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cblx0XHQvLyBJZiB3ZSBjYW4sIHRyeSB0byBmYXN0LXBhdGggaXQgYW5kIGF2b2lkIGFsbCB0aGUgb3ZlcmhlYWQgb2YgYXdhaXRpbmdcblx0XHRpZiAoIW1hc2spIHtcblx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHN0YXRlUmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0XHRpZiAobWFzayAmIDEpIHsgbWFzayAmPSAyOyBpZiAoIW1hc2spIHJlYWxseVJlbW92ZSgpIH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzdGF0ZVJlc3VsdC50aGVuKG5leHQsIG5leHQpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXR0cnNSZXN1bHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRcdGlmIChtYXNrICYgMikgeyBtYXNrICY9IDE7IGlmICghbWFzaykgcmVhbGx5UmVtb3ZlKCkgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGF0dHJzUmVzdWx0LnRoZW4obmV4dCwgbmV4dClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZWFsbHlSZW1vdmUoKSB7XG5cdFx0XHRjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbClcblx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlSFRNTChwYXJlbnQsIHZub2RlKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5pbnN0YW5jZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZub2RlLmluc3RhbmNlW2ldKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVDaGlsZChwYXJlbnQsIHZub2RlKSB7XG5cdFx0Ly8gRG9kZ2UgdGhlIHJlY3Vyc2lvbiBvdmVyaGVhZCBpbiBhIGZldyBvZiB0aGUgbW9zdCBjb21tb24gY2FzZXMuXG5cdFx0d2hpbGUgKHZub2RlLmRvbSAhPSBudWxsICYmIHZub2RlLmRvbS5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHZub2RlID0gdm5vZGUuaW5zdGFuY2Vcblx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdFx0cmVtb3ZlSFRNTChwYXJlbnQsIHZub2RlKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHZub2RlLnRhZyAhPT0gXCJbXCIpIHtcblx0XHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQodm5vZGUuZG9tKVxuXHRcdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikpIGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHZub2RlID0gdm5vZGUuY2hpbGRyZW5bMF1cblx0XHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIHJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBvbnJlbW92ZSh2bm9kZSkge1xuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLm9ucmVtb3ZlLCB2bm9kZSlcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9ucmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25yZW1vdmUsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkgb25yZW1vdmUodm5vZGUuaW5zdGFuY2UpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG9ucmVtb3ZlKGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly9hdHRyc1xuXHRmdW5jdGlvbiBzZXRBdHRycyh2bm9kZSwgYXR0cnMsIG5zKSB7XG5cdFx0Ly8gSWYgeW91IGFzc2lnbiBhbiBpbnB1dCB0eXBlIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSBJRSAxMSB3aXRoIGFuIGFzc2lnbm1lbnQgZXhwcmVzc2lvbiwgYW4gZXJyb3Igd2lsbCBvY2N1ci5cblx0XHQvL1xuXHRcdC8vIEFsc28sIHRoZSBET00gZG9lcyB0aGluZ3MgdG8gaW5wdXRzIGJhc2VkIG9uIHRoZSB2YWx1ZSwgc28gaXQgbmVlZHMgc2V0IGZpcnN0LlxuXHRcdC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL01pdGhyaWxKUy9taXRocmlsLmpzL2lzc3Vlcy8yNjIyXG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGF0dHJzLnR5cGUgIT0gbnVsbCkgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgYXR0cnMudHlwZSlcblx0XHR2YXIgaXNGaWxlSW5wdXQgPSBhdHRycyAhPSBudWxsICYmIHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGF0dHJzLnR5cGUgPT09IFwiZmlsZVwiXG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRzZXRBdHRyKHZub2RlLCBrZXksIG51bGwsIGF0dHJzW2tleV0sIG5zLCBpc0ZpbGVJbnB1dClcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0QXR0cih2bm9kZSwga2V5LCBvbGQsIHZhbHVlLCBucywgaXNGaWxlSW5wdXQpIHtcblx0XHRpZiAoa2V5ID09PSBcImtleVwiIHx8IGtleSA9PT0gXCJpc1wiIHx8IHZhbHVlID09IG51bGwgfHwgaXNMaWZlY3ljbGVNZXRob2Qoa2V5KSB8fCAob2xkID09PSB2YWx1ZSAmJiAhaXNGb3JtQXR0cmlidXRlKHZub2RlLCBrZXkpKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwga2V5ID09PSBcInR5cGVcIiAmJiB2bm9kZS50YWcgPT09IFwiaW5wdXRcIikgcmV0dXJuXG5cdFx0aWYgKGtleVswXSA9PT0gXCJvXCIgJiYga2V5WzFdID09PSBcIm5cIikgcmV0dXJuIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKVxuXHRcdGlmIChrZXkuc2xpY2UoMCwgNikgPT09IFwieGxpbms6XCIpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwga2V5LnNsaWNlKDYpLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIHZhbHVlKVxuXHRcdGVsc2UgaWYgKGhhc1Byb3BlcnR5S2V5KHZub2RlLCBrZXksIG5zKSkge1xuXHRcdFx0aWYgKGtleSA9PT0gXCJ2YWx1ZVwiKSB7XG5cdFx0XHRcdC8vIE9ubHkgZG8gdGhlIGNvZXJjaW9uIGlmIHdlJ3JlIGFjdHVhbGx5IGdvaW5nIHRvIGNoZWNrIHRoZSB2YWx1ZS5cblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW1wbGljaXQtY29lcmNpb24gKi9cblx0XHRcdFx0Ly9zZXR0aW5nIGlucHV0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIGJ5IHR5cGluZyBvbiBmb2N1c2VkIGVsZW1lbnQgbW92ZXMgY3Vyc29yIHRvIGVuZCBpbiBDaHJvbWVcblx0XHRcdFx0Ly9zZXR0aW5nIGlucHV0W3R5cGU9ZmlsZV1bdmFsdWVdIHRvIHNhbWUgdmFsdWUgY2F1c2VzIGFuIGVycm9yIHRvIGJlIGdlbmVyYXRlZCBpZiBpdCdzIG5vbi1lbXB0eVxuXHRcdFx0XHRpZiAoKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiIHx8IHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSAmJiAoaXNGaWxlSW5wdXQgfHwgdm5vZGUuZG9tID09PSBhY3RpdmVFbGVtZW50KCkpKSByZXR1cm5cblx0XHRcdFx0Ly9zZXR0aW5nIHNlbGVjdFt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSB3aGlsZSBoYXZpbmcgc2VsZWN0IG9wZW4gYmxpbmtzIHNlbGVjdCBkcm9wZG93biBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBvbGQgIT09IG51bGwgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgb3B0aW9uW3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcIm9wdGlvblwiICYmIG9sZCAhPT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRcdC8vc2V0dGluZyBpbnB1dFt0eXBlPWZpbGVdW3ZhbHVlXSB0byBkaWZmZXJlbnQgdmFsdWUgaXMgYW4gZXJyb3IgaWYgaXQncyBub24tZW1wdHlcblx0XHRcdFx0Ly8gTm90IGlkZWFsLCBidXQgaXQgYXQgbGVhc3Qgd29ya3MgYXJvdW5kIHRoZSBtb3N0IGNvbW1vbiBzb3VyY2Ugb2YgdW5jYXVnaHQgZXhjZXB0aW9ucyBmb3Igbm93LlxuXHRcdFx0XHRpZiAoaXNGaWxlSW5wdXQgJiYgXCJcIiArIHZhbHVlICE9PSBcIlwiKSB7IGNvbnNvbGUuZXJyb3IoXCJgdmFsdWVgIGlzIHJlYWQtb25seSBvbiBmaWxlIGlucHV0cyFcIik7IHJldHVybiB9XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8taW1wbGljaXQtY29lcmNpb24gKi9cblx0XHRcdH1cblx0XHRcdHZub2RlLmRvbVtrZXldID0gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSwgXCJcIilcblx0XHRcdFx0ZWxzZSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSlcblx0XHRcdH1cblx0XHRcdGVsc2Ugdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXkgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBrZXksIHZhbHVlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVBdHRyKHZub2RlLCBrZXksIG9sZCwgbnMpIHtcblx0XHRpZiAoa2V5ID09PSBcImtleVwiIHx8IGtleSA9PT0gXCJpc1wiIHx8IG9sZCA9PSBudWxsIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleSkpIHJldHVyblxuXHRcdGlmIChrZXlbMF0gPT09IFwib1wiICYmIGtleVsxXSA9PT0gXCJuXCIpIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHVuZGVmaW5lZClcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIG51bGwpXG5cdFx0ZWxzZSBpZiAoXG5cdFx0XHRoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucylcblx0XHRcdCYmIGtleSAhPT0gXCJjbGFzc05hbWVcIlxuXHRcdFx0JiYga2V5ICE9PSBcInRpdGxlXCIgLy8gY3JlYXRlcyBcIm51bGxcIiBhcyB0aXRsZVxuXHRcdFx0JiYgIShrZXkgPT09IFwidmFsdWVcIiAmJiAoXG5cdFx0XHRcdHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIlxuXHRcdFx0XHR8fCB2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgdm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpXG5cdFx0XHQpKVxuXHRcdFx0JiYgISh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkgPT09IFwidHlwZVwiKVxuXHRcdCkge1xuXHRcdFx0dm5vZGUuZG9tW2tleV0gPSBudWxsXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBuc0xhc3RJbmRleCA9IGtleS5pbmRleE9mKFwiOlwiKVxuXHRcdFx0aWYgKG5zTGFzdEluZGV4ICE9PSAtMSkga2V5ID0ga2V5LnNsaWNlKG5zTGFzdEluZGV4ICsgMSlcblx0XHRcdGlmIChvbGQgIT09IGZhbHNlKSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycykge1xuXHRcdGlmIChcInZhbHVlXCIgaW4gYXR0cnMpIHtcblx0XHRcdGlmKGF0dHJzLnZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHZub2RlLmRvbS52YWx1ZSA9IG51bGxcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBub3JtYWxpemVkID0gXCJcIiArIGF0dHJzLnZhbHVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0XHRcdFx0aWYgKHZub2RlLmRvbS52YWx1ZSAhPT0gbm9ybWFsaXplZCB8fCB2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHR2bm9kZS5kb20udmFsdWUgPSBub3JtYWxpemVkXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKFwic2VsZWN0ZWRJbmRleFwiIGluIGF0dHJzKSBzZXRBdHRyKHZub2RlLCBcInNlbGVjdGVkSW5kZXhcIiwgbnVsbCwgYXR0cnMuc2VsZWN0ZWRJbmRleCwgdW5kZWZpbmVkKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQsIGF0dHJzLCBucykge1xuXHRcdGlmIChvbGQgJiYgb2xkID09PSBhdHRycykge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiRG9uJ3QgcmV1c2UgYXR0cnMgb2JqZWN0LCB1c2UgbmV3IG9iamVjdCBmb3IgZXZlcnkgcmVkcmF3LCB0aGlzIHdpbGwgdGhyb3cgaW4gbmV4dCBtYWpvclwiKVxuXHRcdH1cblx0XHRpZiAoYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gSWYgeW91IGFzc2lnbiBhbiBpbnB1dCB0eXBlIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSBJRSAxMSB3aXRoIGFuIGFzc2lnbm1lbnQgZXhwcmVzc2lvbiwgYW4gZXJyb3Igd2lsbCBvY2N1ci5cblx0XHRcdC8vXG5cdFx0XHQvLyBBbHNvLCB0aGUgRE9NIGRvZXMgdGhpbmdzIHRvIGlucHV0cyBiYXNlZCBvbiB0aGUgdmFsdWUsIHNvIGl0IG5lZWRzIHNldCBmaXJzdC5cblx0XHRcdC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL01pdGhyaWxKUy9taXRocmlsLmpzL2lzc3Vlcy8yNjIyXG5cdFx0XHRpZiAodm5vZGUudGFnID09PSBcImlucHV0XCIgJiYgYXR0cnMudHlwZSAhPSBudWxsKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBhdHRycy50eXBlKVxuXHRcdFx0dmFyIGlzRmlsZUlucHV0ID0gdm5vZGUudGFnID09PSBcImlucHV0XCIgJiYgYXR0cnMudHlwZSA9PT0gXCJmaWxlXCJcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0XHRzZXRBdHRyKHZub2RlLCBrZXksIG9sZCAmJiBvbGRba2V5XSwgYXR0cnNba2V5XSwgbnMsIGlzRmlsZUlucHV0KVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdmFsXG5cdFx0aWYgKG9sZCAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2xkKSB7XG5cdFx0XHRcdGlmICgoKHZhbCA9IG9sZFtrZXldKSAhPSBudWxsKSAmJiAoYXR0cnMgPT0gbnVsbCB8fCBhdHRyc1trZXldID09IG51bGwpKSB7XG5cdFx0XHRcdFx0cmVtb3ZlQXR0cih2bm9kZSwga2V5LCB2YWwsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwgYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcInZhbHVlXCIgfHwgYXR0ciA9PT0gXCJjaGVja2VkXCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZEluZGV4XCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZFwiICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpIHx8IHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50XG5cdH1cblx0ZnVuY3Rpb24gaXNMaWZlY3ljbGVNZXRob2QoYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcIm9uaW5pdFwiIHx8IGF0dHIgPT09IFwib25jcmVhdGVcIiB8fCBhdHRyID09PSBcIm9udXBkYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmVyZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JldXBkYXRlXCJcblx0fVxuXHRmdW5jdGlvbiBoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucykge1xuXHRcdC8vIEZpbHRlciBvdXQgbmFtZXNwYWNlZCBrZXlzXG5cdFx0cmV0dXJuIG5zID09PSB1bmRlZmluZWQgJiYgKFxuXHRcdFx0Ly8gSWYgaXQncyBhIGN1c3RvbSBlbGVtZW50LCBqdXN0IGtlZXAgaXQuXG5cdFx0XHR2bm9kZS50YWcuaW5kZXhPZihcIi1cIikgPiAtMSB8fCB2bm9kZS5hdHRycyAhPSBudWxsICYmIHZub2RlLmF0dHJzLmlzIHx8XG5cdFx0XHQvLyBJZiBpdCdzIGEgbm9ybWFsIGVsZW1lbnQsIGxldCdzIHRyeSB0byBhdm9pZCBhIGZldyBicm93c2VyIGJ1Z3MuXG5cdFx0XHRrZXkgIT09IFwiaHJlZlwiICYmIGtleSAhPT0gXCJsaXN0XCIgJiYga2V5ICE9PSBcImZvcm1cIiAmJiBrZXkgIT09IFwid2lkdGhcIiAmJiBrZXkgIT09IFwiaGVpZ2h0XCIvLyAmJiBrZXkgIT09IFwidHlwZVwiXG5cdFx0XHQvLyBEZWZlciB0aGUgcHJvcGVydHkgY2hlY2sgdW50aWwgKmFmdGVyKiB3ZSBjaGVjayBldmVyeXRoaW5nLlxuXHRcdCkgJiYga2V5IGluIHZub2RlLmRvbVxuXHR9XG5cblx0Ly9zdHlsZVxuXHR2YXIgdXBwZXJjYXNlUmVnZXggPSAvW0EtWl0vZ1xuXHRmdW5jdGlvbiB0b0xvd2VyQ2FzZShjYXBpdGFsKSB7IHJldHVybiBcIi1cIiArIGNhcGl0YWwudG9Mb3dlckNhc2UoKSB9XG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZUtleShrZXkpIHtcblx0XHRyZXR1cm4ga2V5WzBdID09PSBcIi1cIiAmJiBrZXlbMV0gPT09IFwiLVwiID8ga2V5IDpcblx0XHRcdGtleSA9PT0gXCJjc3NGbG9hdFwiID8gXCJmbG9hdFwiIDpcblx0XHRcdFx0a2V5LnJlcGxhY2UodXBwZXJjYXNlUmVnZXgsIHRvTG93ZXJDYXNlKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKGVsZW1lbnQsIG9sZCwgc3R5bGUpIHtcblx0XHRpZiAob2xkID09PSBzdHlsZSkge1xuXHRcdFx0Ly8gU3R5bGVzIGFyZSBlcXVpdmFsZW50LCBkbyBub3RoaW5nLlxuXHRcdH0gZWxzZSBpZiAoc3R5bGUgPT0gbnVsbCkge1xuXHRcdFx0Ly8gTmV3IHN0eWxlIGlzIG1pc3NpbmcsIGp1c3QgY2xlYXIgaXQuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc3R5bGUgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIE5ldyBzdHlsZSBpcyBhIHN0cmluZywgbGV0IGVuZ2luZSBkZWFsIHdpdGggcGF0Y2hpbmcuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZVxuXHRcdH0gZWxzZSBpZiAob2xkID09IG51bGwgfHwgdHlwZW9mIG9sZCAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0Ly8gYG9sZGAgaXMgbWlzc2luZyBvciBhIHN0cmluZywgYHN0eWxlYCBpcyBhbiBvYmplY3QuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0XHQvLyBBZGQgbmV3IHN0eWxlIHByb3BlcnRpZXNcblx0XHRcdGZvciAodmFyIGtleSBpbiBzdHlsZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBzdHlsZVtrZXldXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpLCBTdHJpbmcodmFsdWUpKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBCb3RoIG9sZCAmIG5ldyBhcmUgKGRpZmZlcmVudCkgb2JqZWN0cy5cblx0XHRcdC8vIFVwZGF0ZSBzdHlsZSBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gc3R5bGVba2V5XVxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSBTdHJpbmcodmFsdWUpKSAhPT0gU3RyaW5nKG9sZFtrZXldKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkobm9ybWFsaXplS2V5KGtleSksIHZhbHVlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBSZW1vdmUgc3R5bGUgcHJvcGVydGllcyB0aGF0IG5vIGxvbmdlciBleGlzdFxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9sZCkge1xuXHRcdFx0XHRpZiAob2xkW2tleV0gIT0gbnVsbCAmJiBzdHlsZVtrZXldID09IG51bGwpIHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSGVyZSdzIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0aGlzIHdvcmtzOlxuXHQvLyAxLiBUaGUgZXZlbnQgbmFtZXMgYXJlIGFsd2F5cyAoYnkgZGVzaWduKSBwcmVmaXhlZCBieSBgb25gLlxuXHQvLyAyLiBUaGUgRXZlbnRMaXN0ZW5lciBpbnRlcmZhY2UgYWNjZXB0cyBlaXRoZXIgYSBmdW5jdGlvbiBvciBhbiBvYmplY3Rcblx0Ly8gICAgd2l0aCBhIGBoYW5kbGVFdmVudGAgbWV0aG9kLlxuXHQvLyAzLiBUaGUgb2JqZWN0IGRvZXMgbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAsIHRvIGF2b2lkXG5cdC8vICAgIGFueSBwb3RlbnRpYWwgaW50ZXJmZXJlbmNlIHdpdGggdGhhdCAoZS5nLiBzZXR0ZXJzKS5cblx0Ly8gNC4gVGhlIGV2ZW50IG5hbWUgaXMgcmVtYXBwZWQgdG8gdGhlIGhhbmRsZXIgYmVmb3JlIGNhbGxpbmcgaXQuXG5cdC8vIDUuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgZXYudGFyZ2V0ID09PSB0aGlzYC4gV2UgcmVwbGljYXRlXG5cdC8vICAgIHRoYXQgYmVsb3cuXG5cdC8vIDYuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgcmV0dXJuIGZhbHNlYCBwcmV2ZW50cyB0aGUgZGVmYXVsdFxuXHQvLyAgICBhY3Rpb24gYW5kIHN0b3BzIGV2ZW50IHByb3BhZ2F0aW9uLiBXZSByZXBsaWNhdGUgdGhhdCBiZWxvdy5cblx0ZnVuY3Rpb24gRXZlbnREaWN0KCkge1xuXHRcdC8vIFNhdmUgdGhpcywgc28gdGhlIGN1cnJlbnQgcmVkcmF3IGlzIGNvcnJlY3RseSB0cmFja2VkLlxuXHRcdHRoaXMuXyA9IGN1cnJlbnRSZWRyYXdcblx0fVxuXHRFdmVudERpY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRFdmVudERpY3QucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGV2KSB7XG5cdFx0dmFyIGhhbmRsZXIgPSB0aGlzW1wib25cIiArIGV2LnR5cGVdXG5cdFx0dmFyIHJlc3VsdFxuXHRcdGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSByZXN1bHQgPSBoYW5kbGVyLmNhbGwoZXYuY3VycmVudFRhcmdldCwgZXYpXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIuaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgaGFuZGxlci5oYW5kbGVFdmVudChldilcblx0XHRpZiAodGhpcy5fICYmIGV2LnJlZHJhdyAhPT0gZmFsc2UpICgwLCB0aGlzLl8pKClcblx0XHRpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9XG5cdH1cblxuXHQvL2V2ZW50XG5cdGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKSB7XG5cdFx0aWYgKHZub2RlLmV2ZW50cyAhPSBudWxsKSB7XG5cdFx0XHR2bm9kZS5ldmVudHMuXyA9IGN1cnJlbnRSZWRyYXdcblx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSA9PT0gdmFsdWUpIHJldHVyblxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcblx0XHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXldID09IG51bGwpIHZub2RlLmRvbS5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB2YWx1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXldICE9IG51bGwpIHZub2RlLmRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcblx0XHRcdHZub2RlLmV2ZW50cyA9IG5ldyBFdmVudERpY3QoKVxuXHRcdFx0dm5vZGUuZG9tLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLCB2bm9kZS5ldmVudHMsIGZhbHNlKVxuXHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB2YWx1ZVxuXHRcdH1cblx0fVxuXG5cdC8vbGlmZWN5Y2xlXG5cdGZ1bmN0aW9uIGluaXRMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpIHtcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmluaXQgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbChzb3VyY2Uub25pbml0LCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKGNhbGxIb29rLmJpbmQoc291cmNlLm9uY3JlYXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub251cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChjYWxsSG9vay5iaW5kKHNvdXJjZS5vbnVwZGF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSB7XG5cdFx0ZG8ge1xuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dmFyIGZvcmNlID0gY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZSwgdm5vZGUsIG9sZClcblx0XHRcdFx0aWYgKGZvcmNlICE9PSB1bmRlZmluZWQgJiYgIWZvcmNlKSBicmVha1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnN0YXRlLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dmFyIGZvcmNlID0gY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbmJlZm9yZXVwZGF0ZSwgdm5vZGUsIG9sZClcblx0XHRcdFx0aWYgKGZvcmNlICE9PSB1bmRlZmluZWQgJiYgIWZvcmNlKSBicmVha1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fSB3aGlsZSAoZmFsc2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHR2bm9kZS5pbnN0YW5jZSA9IG9sZC5pbnN0YW5jZVxuXHRcdC8vIE9uZSB3b3VsZCB0aGluayBoYXZpbmcgdGhlIGFjdHVhbCBsYXRlc3QgYXR0cmlidXRlcyB3b3VsZCBiZSBpZGVhbCxcblx0XHQvLyBidXQgaXQgZG9lc24ndCBsZXQgdXMgcHJvcGVybHkgZGlmZiBiYXNlZCBvbiBvdXIgY3VycmVudCBpbnRlcm5hbFxuXHRcdC8vIHJlcHJlc2VudGF0aW9uLiBXZSBoYXZlIHRvIHNhdmUgbm90IG9ubHkgdGhlIG9sZCBET00gaW5mbywgYnV0IGFsc29cblx0XHQvLyB0aGUgYXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBpdCwgYXMgd2UgZGlmZiAqdGhhdCosIG5vdCBhZ2FpbnN0IHRoZVxuXHRcdC8vIERPTSBkaXJlY3RseSAod2l0aCBhIGZldyBleGNlcHRpb25zIGluIGBzZXRBdHRyYCkuIEFuZCwgb2YgY291cnNlLCB3ZVxuXHRcdC8vIG5lZWQgdG8gc2F2ZSB0aGUgY2hpbGRyZW4gYW5kIHRleHQgYXMgdGhleSBhcmUgY29uY2VwdHVhbGx5IG5vdFxuXHRcdC8vIHVubGlrZSBzcGVjaWFsIFwiYXR0cmlidXRlc1wiIGludGVybmFsbHkuXG5cdFx0dm5vZGUuYXR0cnMgPSBvbGQuYXR0cnNcblx0XHR2bm9kZS5jaGlsZHJlbiA9IG9sZC5jaGlsZHJlblxuXHRcdHZub2RlLnRleHQgPSBvbGQudGV4dFxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHR2YXIgY3VycmVudERPTVxuXG5cdHJldHVybiBmdW5jdGlvbihkb20sIHZub2RlcywgcmVkcmF3KSB7XG5cdFx0aWYgKCFkb20pIHRocm93IG5ldyBUeXBlRXJyb3IoXCJET00gZWxlbWVudCBiZWluZyByZW5kZXJlZCB0byBkb2VzIG5vdCBleGlzdC5cIilcblx0XHRpZiAoY3VycmVudERPTSAhPSBudWxsICYmIGRvbS5jb250YWlucyhjdXJyZW50RE9NKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vZGUgaXMgY3VycmVudGx5IGJlaW5nIHJlbmRlcmVkIHRvIGFuZCB0aHVzIGlzIGxvY2tlZC5cIilcblx0XHR9XG5cdFx0dmFyIHByZXZSZWRyYXcgPSBjdXJyZW50UmVkcmF3XG5cdFx0dmFyIHByZXZET00gPSBjdXJyZW50RE9NXG5cdFx0dmFyIGhvb2tzID0gW11cblx0XHR2YXIgYWN0aXZlID0gYWN0aXZlRWxlbWVudCgpXG5cdFx0dmFyIG5hbWVzcGFjZSA9IGRvbS5uYW1lc3BhY2VVUklcblxuXHRcdGN1cnJlbnRET00gPSBkb21cblx0XHRjdXJyZW50UmVkcmF3ID0gdHlwZW9mIHJlZHJhdyA9PT0gXCJmdW5jdGlvblwiID8gcmVkcmF3IDogdW5kZWZpbmVkXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEZpcnN0IHRpbWUgcmVuZGVyaW5nIGludG8gYSBub2RlIGNsZWFycyBpdCBvdXRcblx0XHRcdGlmIChkb20udm5vZGVzID09IG51bGwpIGRvbS50ZXh0Q29udGVudCA9IFwiXCJcblx0XHRcdHZub2RlcyA9IFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKEFycmF5LmlzQXJyYXkodm5vZGVzKSA/IHZub2RlcyA6IFt2bm9kZXNdKVxuXHRcdFx0dXBkYXRlTm9kZXMoZG9tLCBkb20udm5vZGVzLCB2bm9kZXMsIGhvb2tzLCBudWxsLCBuYW1lc3BhY2UgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiID8gdW5kZWZpbmVkIDogbmFtZXNwYWNlKVxuXHRcdFx0ZG9tLnZub2RlcyA9IHZub2Rlc1xuXHRcdFx0Ly8gYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGNhbiByZXR1cm4gbnVsbDogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW50ZXJhY3Rpb24uaHRtbCNkb20tZG9jdW1lbnQtYWN0aXZlZWxlbWVudFxuXHRcdFx0aWYgKGFjdGl2ZSAhPSBudWxsICYmIGFjdGl2ZUVsZW1lbnQoKSAhPT0gYWN0aXZlICYmIHR5cGVvZiBhY3RpdmUuZm9jdXMgPT09IFwiZnVuY3Rpb25cIikgYWN0aXZlLmZvY3VzKClcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIGhvb2tzW2ldKClcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y3VycmVudFJlZHJhdyA9IHByZXZSZWRyYXdcblx0XHRcdGN1cnJlbnRET00gPSBwcmV2RE9NXG5cdFx0fVxuXHR9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9yZW5kZXIvcmVuZGVyXCIpKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsKVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZW5kZXIsIHNjaGVkdWxlLCBjb25zb2xlKSB7XG5cdHZhciBzdWJzY3JpcHRpb25zID0gW11cblx0dmFyIHBlbmRpbmcgPSBmYWxzZVxuXHR2YXIgb2Zmc2V0ID0gLTFcblxuXHRmdW5jdGlvbiBzeW5jKCkge1xuXHRcdGZvciAob2Zmc2V0ID0gMDsgb2Zmc2V0IDwgc3Vic2NyaXB0aW9ucy5sZW5ndGg7IG9mZnNldCArPSAyKSB7XG5cdFx0XHR0cnkgeyByZW5kZXIoc3Vic2NyaXB0aW9uc1tvZmZzZXRdLCBWbm9kZShzdWJzY3JpcHRpb25zW29mZnNldCArIDFdKSwgcmVkcmF3KSB9XG5cdFx0XHRjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpIH1cblx0XHR9XG5cdFx0b2Zmc2V0ID0gLTFcblx0fVxuXG5cdGZ1bmN0aW9uIHJlZHJhdygpIHtcblx0XHRpZiAoIXBlbmRpbmcpIHtcblx0XHRcdHBlbmRpbmcgPSB0cnVlXG5cdFx0XHRzY2hlZHVsZShmdW5jdGlvbigpIHtcblx0XHRcdFx0cGVuZGluZyA9IGZhbHNlXG5cdFx0XHRcdHN5bmMoKVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRyZWRyYXcuc3luYyA9IHN5bmNcblxuXHRmdW5jdGlvbiBtb3VudChyb290LCBjb21wb25lbnQpIHtcblx0XHRpZiAoY29tcG9uZW50ICE9IG51bGwgJiYgY29tcG9uZW50LnZpZXcgPT0gbnVsbCAmJiB0eXBlb2YgY29tcG9uZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJtLm1vdW50IGV4cGVjdHMgYSBjb21wb25lbnQsIG5vdCBhIHZub2RlLlwiKVxuXHRcdH1cblxuXHRcdHZhciBpbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihyb290KVxuXHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRzdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMilcblx0XHRcdGlmIChpbmRleCA8PSBvZmZzZXQpIG9mZnNldCAtPSAyXG5cdFx0XHRyZW5kZXIocm9vdCwgW10pXG5cdFx0fVxuXG5cdFx0aWYgKGNvbXBvbmVudCAhPSBudWxsKSB7XG5cdFx0XHRzdWJzY3JpcHRpb25zLnB1c2gocm9vdCwgY29tcG9uZW50KVxuXHRcdFx0cmVuZGVyKHJvb3QsIFZub2RlKGNvbXBvbmVudCksIHJlZHJhdylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge21vdW50OiBtb3VudCwgcmVkcmF3OiByZWRyYXd9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHJlbmRlciA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2FwaS9tb3VudC1yZWRyYXdcIikocmVuZGVyLCB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSBcInVuZGVmaW5lZFwiID8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIDogbnVsbCwgdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgPyBjb25zb2xlIDogbnVsbClcbiIsICJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybiBcIlwiXG5cblx0dmFyIGFyZ3MgPSBbXVxuXHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cdFx0ZGVzdHJ1Y3R1cmUoa2V5LCBvYmplY3Rba2V5XSlcblx0fVxuXG5cdHJldHVybiBhcmdzLmpvaW4oXCImXCIpXG5cblx0ZnVuY3Rpb24gZGVzdHJ1Y3R1cmUoa2V5LCB2YWx1ZSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRkZXN0cnVjdHVyZShrZXkgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gdmFsdWUpIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5ICsgXCJbXCIgKyBpICsgXCJdXCIsIHZhbHVlW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGFyZ3MucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiID8gXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIikpXG5cdH1cbn1cbiIsICIvLyBUaGlzIGV4aXN0cyBzbyBJJ20gb25seSBzYXZpbmcgaXQgb25jZS5cblwidXNlIHN0cmljdFwiXG5cbnZhciBoYXNPd24gPSByZXF1aXJlKFwiLi9oYXNPd25cIilcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKSB7XG5cdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcblx0XHRpZiAoaGFzT3duLmNhbGwoc291cmNlLCBrZXkpKSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG5cdH1cbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG52YXIgYnVpbGRRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuLi9xdWVyeXN0cmluZy9idWlsZFwiKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCIuLi91dGlsL2Fzc2lnblwiKVxuXG4vLyBSZXR1cm5zIGBwYXRoYCBmcm9tIGB0ZW1wbGF0ZWAgKyBgcGFyYW1zYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZW1wbGF0ZSwgcGFyYW1zKSB7XG5cdGlmICgoLzooW15cXC9cXC4tXSspKFxcLnszfSk/Oi8pLnRlc3QodGVtcGxhdGUpKSB7XG5cdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGVtcGxhdGUgcGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIGJ5IGVpdGhlciBhICcvJywgJy0nLCBvciAnLicuXCIpXG5cdH1cblx0aWYgKHBhcmFtcyA9PSBudWxsKSByZXR1cm4gdGVtcGxhdGVcblx0dmFyIHF1ZXJ5SW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKFwiP1wiKVxuXHR2YXIgaGFzaEluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihcIiNcIilcblx0dmFyIHF1ZXJ5RW5kID0gaGFzaEluZGV4IDwgMCA/IHRlbXBsYXRlLmxlbmd0aCA6IGhhc2hJbmRleFxuXHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPCAwID8gcXVlcnlFbmQgOiBxdWVyeUluZGV4XG5cdHZhciBwYXRoID0gdGVtcGxhdGUuc2xpY2UoMCwgcGF0aEVuZClcblx0dmFyIHF1ZXJ5ID0ge31cblxuXHRhc3NpZ24ocXVlcnksIHBhcmFtcylcblxuXHR2YXIgcmVzb2x2ZWQgPSBwYXRoLnJlcGxhY2UoLzooW15cXC9cXC4tXSspKFxcLnszfSk/L2csIGZ1bmN0aW9uKG0sIGtleSwgdmFyaWFkaWMpIHtcblx0XHRkZWxldGUgcXVlcnlba2V5XVxuXHRcdC8vIElmIG5vIHN1Y2ggcGFyYW1ldGVyIGV4aXN0cywgZG9uJ3QgaW50ZXJwb2xhdGUgaXQuXG5cdFx0aWYgKHBhcmFtc1trZXldID09IG51bGwpIHJldHVybiBtXG5cdFx0Ly8gRXNjYXBlIG5vcm1hbCBwYXJhbWV0ZXJzLCBidXQgbm90IHZhcmlhZGljIG9uZXMuXG5cdFx0cmV0dXJuIHZhcmlhZGljID8gcGFyYW1zW2tleV0gOiBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHBhcmFtc1trZXldKSlcblx0fSlcblxuXHQvLyBJbiBjYXNlIHRoZSB0ZW1wbGF0ZSBzdWJzdGl0dXRpb24gYWRkcyBuZXcgcXVlcnkvaGFzaCBwYXJhbWV0ZXJzLlxuXHR2YXIgbmV3UXVlcnlJbmRleCA9IHJlc29sdmVkLmluZGV4T2YoXCI/XCIpXG5cdHZhciBuZXdIYXNoSW5kZXggPSByZXNvbHZlZC5pbmRleE9mKFwiI1wiKVxuXHR2YXIgbmV3UXVlcnlFbmQgPSBuZXdIYXNoSW5kZXggPCAwID8gcmVzb2x2ZWQubGVuZ3RoIDogbmV3SGFzaEluZGV4XG5cdHZhciBuZXdQYXRoRW5kID0gbmV3UXVlcnlJbmRleCA8IDAgPyBuZXdRdWVyeUVuZCA6IG5ld1F1ZXJ5SW5kZXhcblx0dmFyIHJlc3VsdCA9IHJlc29sdmVkLnNsaWNlKDAsIG5ld1BhdGhFbmQpXG5cblx0aWYgKHF1ZXJ5SW5kZXggPj0gMCkgcmVzdWx0ICs9IHRlbXBsYXRlLnNsaWNlKHF1ZXJ5SW5kZXgsIHF1ZXJ5RW5kKVxuXHRpZiAobmV3UXVlcnlJbmRleCA+PSAwKSByZXN1bHQgKz0gKHF1ZXJ5SW5kZXggPCAwID8gXCI/XCIgOiBcIiZcIikgKyByZXNvbHZlZC5zbGljZShuZXdRdWVyeUluZGV4LCBuZXdRdWVyeUVuZClcblx0dmFyIHF1ZXJ5c3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZyhxdWVyeSlcblx0aWYgKHF1ZXJ5c3RyaW5nKSByZXN1bHQgKz0gKHF1ZXJ5SW5kZXggPCAwICYmIG5ld1F1ZXJ5SW5kZXggPCAwID8gXCI/XCIgOiBcIiZcIikgKyBxdWVyeXN0cmluZ1xuXHRpZiAoaGFzaEluZGV4ID49IDApIHJlc3VsdCArPSB0ZW1wbGF0ZS5zbGljZShoYXNoSW5kZXgpXG5cdGlmIChuZXdIYXNoSW5kZXggPj0gMCkgcmVzdWx0ICs9IChoYXNoSW5kZXggPCAwID8gXCJcIiA6IFwiJlwiKSArIHJlc29sdmVkLnNsaWNlKG5ld0hhc2hJbmRleClcblx0cmV0dXJuIHJlc3VsdFxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBidWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2J1aWxkXCIpXG52YXIgaGFzT3duID0gcmVxdWlyZShcIi4uL3V0aWwvaGFzT3duXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdywgUHJvbWlzZSwgb25jb21wbGV0aW9uKSB7XG5cdHZhciBjYWxsYmFja0NvdW50ID0gMFxuXG5cdGZ1bmN0aW9uIFByb21pc2VQcm94eShleGVjdXRvcikge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShleGVjdXRvcilcblx0fVxuXG5cdC8vIEluIGNhc2UgdGhlIGdsb2JhbCBQcm9taXNlIGlzIHNvbWUgdXNlcmxhbmQgbGlicmFyeSdzIHdoZXJlIHRoZXkgcmVseSBvblxuXHQvLyBgZm9vIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvcmAsIGB0aGlzLmNvbnN0cnVjdG9yLnJlc29sdmUodmFsdWUpYCwgb3Jcblx0Ly8gc2ltaWxhci4gTGV0J3MgKm5vdCogYnJlYWsgdGhlbS5cblx0UHJvbWlzZVByb3h5LnByb3RvdHlwZSA9IFByb21pc2UucHJvdG90eXBlXG5cdFByb21pc2VQcm94eS5fX3Byb3RvX18gPSBQcm9taXNlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxuXHRmdW5jdGlvbiBtYWtlUmVxdWVzdChmYWN0b3J5KSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHVybCwgYXJncykge1xuXHRcdFx0aWYgKHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIpIHsgYXJncyA9IHVybDsgdXJsID0gdXJsLnVybCB9XG5cdFx0XHRlbHNlIGlmIChhcmdzID09IG51bGwpIGFyZ3MgPSB7fVxuXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0ZmFjdG9yeShidWlsZFBhdGhuYW1lKHVybCwgYXJncy5wYXJhbXMpLCBhcmdzLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgYXJncy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFbaV0gPSBuZXcgYXJncy50eXBlKGRhdGFbaV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgZGF0YSA9IG5ldyBhcmdzLnR5cGUoZGF0YSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdFx0XHR9LCByZWplY3QpXG5cdFx0XHR9KVxuXHRcdFx0aWYgKGFyZ3MuYmFja2dyb3VuZCA9PT0gdHJ1ZSkgcmV0dXJuIHByb21pc2Vcblx0XHRcdHZhciBjb3VudCA9IDBcblx0XHRcdGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuXHRcdFx0XHRpZiAoLS1jb3VudCA9PT0gMCAmJiB0eXBlb2Ygb25jb21wbGV0aW9uID09PSBcImZ1bmN0aW9uXCIpIG9uY29tcGxldGlvbigpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB3cmFwKHByb21pc2UpXG5cblx0XHRcdGZ1bmN0aW9uIHdyYXAocHJvbWlzZSkge1xuXHRcdFx0XHR2YXIgdGhlbiA9IHByb21pc2UudGhlblxuXHRcdFx0XHQvLyBTZXQgdGhlIGNvbnN0cnVjdG9yLCBzbyBlbmdpbmVzIGtub3cgdG8gbm90IGF3YWl0IG9yIHJlc29sdmVcblx0XHRcdFx0Ly8gdGhpcyBhcyBhIG5hdGl2ZSBwcm9taXNlLiBBdCB0aGUgdGltZSBvZiB3cml0aW5nLCB0aGlzIGlzXG5cdFx0XHRcdC8vIG9ubHkgbmVjZXNzYXJ5IGZvciBWOCwgYnV0IHRoZWlyIGJlaGF2aW9yIGlzIHRoZSBjb3JyZWN0XG5cdFx0XHRcdC8vIGJlaGF2aW9yIHBlciBzcGVjLiBTZWUgdGhpcyBzcGVjIGlzc3VlIGZvciBtb3JlIGRldGFpbHM6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L2VjbWEyNjIvaXNzdWVzLzE1NzcuIEFsc28sIHNlZSB0aGVcblx0XHRcdFx0Ly8gY29ycmVzcG9uZGluZyBjb21tZW50IGluIGByZXF1ZXN0L3Rlc3RzL3Rlc3QtcmVxdWVzdC5qc2AgZm9yXG5cdFx0XHRcdC8vIGEgYml0IG1vcmUgYmFja2dyb3VuZCBvbiB0aGUgaXNzdWUgYXQgaGFuZC5cblx0XHRcdFx0cHJvbWlzZS5jb25zdHJ1Y3RvciA9IFByb21pc2VQcm94eVxuXHRcdFx0XHRwcm9taXNlLnRoZW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb3VudCsrXG5cdFx0XHRcdFx0dmFyIG5leHQgPSB0aGVuLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cylcblx0XHRcdFx0XHRuZXh0LnRoZW4oY29tcGxldGUsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdGNvbXBsZXRlKClcblx0XHRcdFx0XHRcdGlmIChjb3VudCA9PT0gMCkgdGhyb3cgZVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0cmV0dXJuIHdyYXAobmV4dClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcHJvbWlzZVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhhc0hlYWRlcihhcmdzLCBuYW1lKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZ3MuaGVhZGVycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZ3MuaGVhZGVycywga2V5KSAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSkgcmV0dXJuIHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHJlcXVlc3Q6IG1ha2VSZXF1ZXN0KGZ1bmN0aW9uKHVybCwgYXJncywgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgbWV0aG9kID0gYXJncy5tZXRob2QgIT0gbnVsbCA/IGFyZ3MubWV0aG9kLnRvVXBwZXJDYXNlKCkgOiBcIkdFVFwiXG5cdFx0XHR2YXIgYm9keSA9IGFyZ3MuYm9keVxuXHRcdFx0dmFyIGFzc3VtZUpTT04gPSAoYXJncy5zZXJpYWxpemUgPT0gbnVsbCB8fCBhcmdzLnNlcmlhbGl6ZSA9PT0gSlNPTi5zZXJpYWxpemUpICYmICEoYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuRm9ybURhdGEgfHwgYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuVVJMU2VhcmNoUGFyYW1zKVxuXHRcdFx0dmFyIHJlc3BvbnNlVHlwZSA9IGFyZ3MucmVzcG9uc2VUeXBlIHx8ICh0eXBlb2YgYXJncy5leHRyYWN0ID09PSBcImZ1bmN0aW9uXCIgPyBcIlwiIDogXCJqc29uXCIpXG5cblx0XHRcdHZhciB4aHIgPSBuZXcgJHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpLCBhYm9ydGVkID0gZmFsc2UsIGlzVGltZW91dCA9IGZhbHNlXG5cdFx0XHR2YXIgb3JpZ2luYWwgPSB4aHIsIHJlcGxhY2VkQWJvcnRcblx0XHRcdHZhciBhYm9ydCA9IHhoci5hYm9ydFxuXG5cdFx0XHR4aHIuYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0YWJvcnRlZCA9IHRydWVcblx0XHRcdFx0YWJvcnQuY2FsbCh0aGlzKVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgYXJncy5hc3luYyAhPT0gZmFsc2UsIHR5cGVvZiBhcmdzLnVzZXIgPT09IFwic3RyaW5nXCIgPyBhcmdzLnVzZXIgOiB1bmRlZmluZWQsIHR5cGVvZiBhcmdzLnBhc3N3b3JkID09PSBcInN0cmluZ1wiID8gYXJncy5wYXNzd29yZCA6IHVuZGVmaW5lZClcblxuXHRcdFx0aWYgKGFzc3VtZUpTT04gJiYgYm9keSAhPSBudWxsICYmICFoYXNIZWFkZXIoYXJncywgXCJjb250ZW50LXR5cGVcIikpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgIT09IFwiZnVuY3Rpb25cIiAmJiAhaGFzSGVhZGVyKGFyZ3MsIFwiYWNjZXB0XCIpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC8qXCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy53aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSBhcmdzLndpdGhDcmVkZW50aWFsc1xuXHRcdFx0aWYgKGFyZ3MudGltZW91dCkgeGhyLnRpbWVvdXQgPSBhcmdzLnRpbWVvdXRcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGVcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZ3MuaGVhZGVycykge1xuXHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJncy5oZWFkZXJzLCBrZXkpKSB7XG5cdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBhcmdzLmhlYWRlcnNba2V5XSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgdGhyb3cgZXJyb3JzIG9uIHhoci5hYm9ydCgpLlxuXHRcdFx0XHRpZiAoYWJvcnRlZCkgcmV0dXJuXG5cblx0XHRcdFx0aWYgKGV2LnRhcmdldC5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gKGV2LnRhcmdldC5zdGF0dXMgPj0gMjAwICYmIGV2LnRhcmdldC5zdGF0dXMgPCAzMDApIHx8IGV2LnRhcmdldC5zdGF0dXMgPT09IDMwNCB8fCAoL15maWxlOlxcL1xcLy9pKS50ZXN0KHVybClcblx0XHRcdFx0XHRcdC8vIFdoZW4gdGhlIHJlc3BvbnNlIHR5cGUgaXNuJ3QgXCJcIiBvciBcInRleHRcIixcblx0XHRcdFx0XHRcdC8vIGB4aHIucmVzcG9uc2VUZXh0YCBpcyB0aGUgd3JvbmcgdGhpbmcgdG8gdXNlLlxuXHRcdFx0XHRcdFx0Ly8gQnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIGFuZCB0aHJvdyBoZXJlLCBhbmQgd2Vcblx0XHRcdFx0XHRcdC8vIHNob3VsZCBob25vciB0aGF0IGFuZCBkbyB0aGUgcmlnaHQgdGhpbmcgYnlcblx0XHRcdFx0XHRcdC8vIHByZWZlcnJpbmcgYHhoci5yZXNwb25zZWAgd2hlcmUgcG9zc2libGUvcHJhY3RpY2FsLlxuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZXYudGFyZ2V0LnJlc3BvbnNlLCBtZXNzYWdlXG5cblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZVR5cGUgPT09IFwianNvblwiKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEZvciBJRSBhbmQgRWRnZSwgd2hpY2ggZG9uJ3QgaW1wbGVtZW50XG5cdFx0XHRcdFx0XHRcdC8vIGByZXNwb25zZVR5cGU6IFwianNvblwiYC5cblx0XHRcdFx0XHRcdFx0aWYgKCFldi50YXJnZXQucmVzcG9uc2VUeXBlICYmIHR5cGVvZiBhcmdzLmV4dHJhY3QgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBuby1jb250ZW50IHdoaWNoIHdpbGwgbm90IHBhcnNlLlxuXHRcdFx0XHRcdFx0XHRcdHRyeSB7IHJlc3BvbnNlID0gSlNPTi5wYXJzZShldi50YXJnZXQucmVzcG9uc2VUZXh0KSB9XG5cdFx0XHRcdFx0XHRcdFx0Y2F0Y2ggKGUpIHsgcmVzcG9uc2UgPSBudWxsIH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICghcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcblx0XHRcdFx0XHRcdFx0Ly8gT25seSB1c2UgdGhpcyBkZWZhdWx0IGlmIGl0J3MgdGV4dC4gSWYgYSBwYXJzZWRcblx0XHRcdFx0XHRcdFx0Ly8gZG9jdW1lbnQgaXMgbmVlZGVkIG9uIG9sZCBJRSBhbmQgZnJpZW5kcyAoYWxsXG5cdFx0XHRcdFx0XHRcdC8vIHVuc3VwcG9ydGVkKSwgdGhlIHVzZXIgc2hvdWxkIHVzZSBhIGN1c3RvbVxuXHRcdFx0XHRcdFx0XHQvLyBgY29uZmlnYCBpbnN0ZWFkLiBUaGV5J3JlIGFscmVhZHkgdXNpbmcgdGhpcyBhdFxuXHRcdFx0XHRcdFx0XHQvLyB0aGVpciBvd24gcmlzay5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlID09IG51bGwpIHJlc3BvbnNlID0gZXYudGFyZ2V0LnJlc3BvbnNlVGV4dFxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MuZXh0cmFjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gYXJncy5leHRyYWN0KGV2LnRhcmdldCwgYXJncylcblx0XHRcdFx0XHRcdFx0c3VjY2VzcyA9IHRydWVcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGFyZ3MuZGVzZXJpYWxpemUocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoc3VjY2VzcykgcmVzb2x2ZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgY29tcGxldGVFcnJvclJlc3BvbnNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHsgbWVzc2FnZSA9IGV2LnRhcmdldC5yZXNwb25zZVRleHQgfVxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoIChlKSB7IG1lc3NhZ2UgPSByZXNwb25zZSB9XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IuY29kZSA9IGV2LnRhcmdldC5zdGF0dXNcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBVc2Ugc2V0VGltZW91dCB0byBwdXNoIHRoaXMgY29kZSBibG9jayBvbnRvIHRoZSBldmVudCBxdWV1ZVxuXHRcdFx0XHRcdFx0XHRcdC8vIFRoaXMgYWxsb3dzIGB4aHIub250aW1lb3V0YCB0byBydW4gaW4gdGhlIGNhc2UgdGhhdCB0aGVyZSBpcyBhIHRpbWVvdXRcblx0XHRcdFx0XHRcdFx0XHQvLyBXaXRob3V0IHRoaXMgc2V0VGltZW91dCwgYHhoci5vbnRpbWVvdXRgIGRvZXNuJ3QgaGF2ZSBhIGNoYW5jZSB0byByZWplY3Rcblx0XHRcdFx0XHRcdFx0XHQvLyBhcyBgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZWAgd2lsbCBydW4gYmVmb3JlIGl0XG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpc1RpbWVvdXQpIHJldHVyblxuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGVFcnJvclJlc3BvbnNlKClcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgY29tcGxldGVFcnJvclJlc3BvbnNlKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKGV2KSB7XG5cdFx0XHRcdGlzVGltZW91dCA9IHRydWVcblx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKFwiUmVxdWVzdCB0aW1lZCBvdXRcIilcblx0XHRcdFx0ZXJyb3IuY29kZSA9IGV2LnRhcmdldC5zdGF0dXNcblx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuY29uZmlnID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0eGhyID0gYXJncy5jb25maWcoeGhyLCBhcmdzLCB1cmwpIHx8IHhoclxuXG5cdFx0XHRcdC8vIFByb3BhZ2F0ZSB0aGUgYGFib3J0YCB0byBhbnkgcmVwbGFjZW1lbnQgWEhSIGFzIHdlbGwuXG5cdFx0XHRcdGlmICh4aHIgIT09IG9yaWdpbmFsKSB7XG5cdFx0XHRcdFx0cmVwbGFjZWRBYm9ydCA9IHhoci5hYm9ydFxuXHRcdFx0XHRcdHhoci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YWJvcnRlZCA9IHRydWVcblx0XHRcdFx0XHRcdHJlcGxhY2VkQWJvcnQuY2FsbCh0aGlzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYm9keSA9PSBudWxsKSB4aHIuc2VuZCgpXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJncy5zZXJpYWxpemUgPT09IFwiZnVuY3Rpb25cIikgeGhyLnNlbmQoYXJncy5zZXJpYWxpemUoYm9keSkpXG5cdFx0XHRlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgJHdpbmRvdy5Gb3JtRGF0YSB8fCBib2R5IGluc3RhbmNlb2YgJHdpbmRvdy5VUkxTZWFyY2hQYXJhbXMpIHhoci5zZW5kKGJvZHkpXG5cdFx0XHRlbHNlIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGJvZHkpKVxuXHRcdH0pLFxuXHRcdGpzb25wOiBtYWtlUmVxdWVzdChmdW5jdGlvbih1cmwsIGFyZ3MsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIGNhbGxiYWNrTmFtZSA9IGFyZ3MuY2FsbGJhY2tOYW1lIHx8IFwiX21pdGhyaWxfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTE2KSArIFwiX1wiICsgY2FsbGJhY2tDb3VudCsrXG5cdFx0XHR2YXIgc2NyaXB0ID0gJHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG5cdFx0XHQkd2luZG93W2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdGRlbGV0ZSAkd2luZG93W2NhbGxiYWNrTmFtZV1cblx0XHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuXHRcdFx0XHRyZXNvbHZlKGRhdGEpXG5cdFx0XHR9XG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIkpTT05QIHJlcXVlc3QgZmFpbGVkXCIpKVxuXHRcdFx0fVxuXHRcdFx0c2NyaXB0LnNyYyA9IHVybCArICh1cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIikgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoYXJncy5jYWxsYmFja0tleSB8fCBcImNhbGxiYWNrXCIpICsgXCI9XCIgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoY2FsbGJhY2tOYW1lKVxuXHRcdFx0JHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuXHRcdH0pLFxuXHR9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3Byb21pc2UvcHJvbWlzZVwiKVxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVxdWVzdC9yZXF1ZXN0XCIpKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsLCBQcm9taXNlUG9seWZpbGwsIG1vdW50UmVkcmF3LnJlZHJhdylcbiIsICJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBkZWNvZGVVUklDb21wb25lbnRTYXZlKHN0cikge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuXHR9IGNhdGNoKGVycikge1xuXHRcdHJldHVybiBzdHJcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cmluZykge1xuXHRpZiAoc3RyaW5nID09PSBcIlwiIHx8IHN0cmluZyA9PSBudWxsKSByZXR1cm4ge31cblx0aWYgKHN0cmluZy5jaGFyQXQoMCkgPT09IFwiP1wiKSBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMSlcblxuXHR2YXIgZW50cmllcyA9IHN0cmluZy5zcGxpdChcIiZcIiksIGNvdW50ZXJzID0ge30sIGRhdGEgPSB7fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW50cnkgPSBlbnRyaWVzW2ldLnNwbGl0KFwiPVwiKVxuXHRcdHZhciBrZXkgPSBkZWNvZGVVUklDb21wb25lbnRTYXZlKGVudHJ5WzBdKVxuXHRcdHZhciB2YWx1ZSA9IGVudHJ5Lmxlbmd0aCA9PT0gMiA/IGRlY29kZVVSSUNvbXBvbmVudFNhdmUoZW50cnlbMV0pIDogXCJcIlxuXG5cdFx0aWYgKHZhbHVlID09PSBcInRydWVcIikgdmFsdWUgPSB0cnVlXG5cdFx0ZWxzZSBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZVxuXG5cdFx0dmFyIGxldmVscyA9IGtleS5zcGxpdCgvXFxdXFxbP3xcXFsvKVxuXHRcdHZhciBjdXJzb3IgPSBkYXRhXG5cdFx0aWYgKGtleS5pbmRleE9mKFwiW1wiKSA+IC0xKSBsZXZlbHMucG9wKClcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGxldmVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGxldmVsID0gbGV2ZWxzW2pdLCBuZXh0TGV2ZWwgPSBsZXZlbHNbaiArIDFdXG5cdFx0XHR2YXIgaXNOdW1iZXIgPSBuZXh0TGV2ZWwgPT0gXCJcIiB8fCAhaXNOYU4ocGFyc2VJbnQobmV4dExldmVsLCAxMCkpXG5cdFx0XHRpZiAobGV2ZWwgPT09IFwiXCIpIHtcblx0XHRcdFx0dmFyIGtleSA9IGxldmVscy5zbGljZSgwLCBqKS5qb2luKClcblx0XHRcdFx0aWYgKGNvdW50ZXJzW2tleV0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvdW50ZXJzW2tleV0gPSBBcnJheS5pc0FycmF5KGN1cnNvcikgPyBjdXJzb3IubGVuZ3RoIDogMFxuXHRcdFx0XHR9XG5cdFx0XHRcdGxldmVsID0gY291bnRlcnNba2V5XSsrXG5cdFx0XHR9XG5cdFx0XHQvLyBEaXNhbGxvdyBkaXJlY3QgcHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0ZWxzZSBpZiAobGV2ZWwgPT09IFwiX19wcm90b19fXCIpIGJyZWFrXG5cdFx0XHRpZiAoaiA9PT0gbGV2ZWxzLmxlbmd0aCAtIDEpIGN1cnNvcltsZXZlbF0gPSB2YWx1ZVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIFJlYWQgb3duIHByb3BlcnRpZXMgZXhjbHVzaXZlbHkgdG8gZGlzYWxsb3cgaW5kaXJlY3Rcblx0XHRcdFx0Ly8gcHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0XHR2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3Vyc29yLCBsZXZlbClcblx0XHRcdFx0aWYgKGRlc2MgIT0gbnVsbCkgZGVzYyA9IGRlc2MudmFsdWVcblx0XHRcdFx0aWYgKGRlc2MgPT0gbnVsbCkgY3Vyc29yW2xldmVsXSA9IGRlc2MgPSBpc051bWJlciA/IFtdIDoge31cblx0XHRcdFx0Y3Vyc29yID0gZGVzY1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4uL3F1ZXJ5c3RyaW5nL3BhcnNlXCIpXG5cbi8vIFJldHVybnMgYHtwYXRoLCBwYXJhbXN9YCBmcm9tIGB1cmxgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCkge1xuXHR2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKFwiP1wiKVxuXHR2YXIgaGFzaEluZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpXG5cdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA8IDAgPyB1cmwubGVuZ3RoIDogaGFzaEluZGV4XG5cdHZhciBwYXRoRW5kID0gcXVlcnlJbmRleCA8IDAgPyBxdWVyeUVuZCA6IHF1ZXJ5SW5kZXhcblx0dmFyIHBhdGggPSB1cmwuc2xpY2UoMCwgcGF0aEVuZCkucmVwbGFjZSgvXFwvezIsfS9nLCBcIi9cIilcblxuXHRpZiAoIXBhdGgpIHBhdGggPSBcIi9cIlxuXHRlbHNlIHtcblx0XHRpZiAocGF0aFswXSAhPT0gXCIvXCIpIHBhdGggPSBcIi9cIiArIHBhdGhcblx0XHRpZiAocGF0aC5sZW5ndGggPiAxICYmIHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKVxuXHR9XG5cdHJldHVybiB7XG5cdFx0cGF0aDogcGF0aCxcblx0XHRwYXJhbXM6IHF1ZXJ5SW5kZXggPCAwXG5cdFx0XHQ/IHt9XG5cdFx0XHQ6IHBhcnNlUXVlcnlTdHJpbmcodXJsLnNsaWNlKHF1ZXJ5SW5kZXggKyAxLCBxdWVyeUVuZCkpLFxuXHR9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBhcnNlUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXJzZVwiKVxuXG4vLyBDb21waWxlcyBhIHRlbXBsYXRlIGludG8gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcmVzb2x2ZWQgcGF0aCAod2l0aG91dCBxdWVyeVxuLy8gc3RyaW5ncykgYW5kIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRlbXBsYXRlIHBhcmFtZXRlcnMgd2l0aCB0aGVpclxuLy8gcGFyc2VkIHZhbHVlcy4gVGhpcyBleHBlY3RzIHRoZSBpbnB1dCBvZiB0aGUgY29tcGlsZWQgdGVtcGxhdGUgdG8gYmUgdGhlXG4vLyBvdXRwdXQgb2YgYHBhcnNlUGF0aG5hbWVgLiBOb3RlIHRoYXQgaXQgZG9lcyAqbm90KiByZW1vdmUgcXVlcnkgcGFyYW1ldGVyc1xuLy8gc3BlY2lmaWVkIGluIHRoZSB0ZW1wbGF0ZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcblx0dmFyIHRlbXBsYXRlRGF0YSA9IHBhcnNlUGF0aG5hbWUodGVtcGxhdGUpXG5cdHZhciB0ZW1wbGF0ZUtleXMgPSBPYmplY3Qua2V5cyh0ZW1wbGF0ZURhdGEucGFyYW1zKVxuXHR2YXIga2V5cyA9IFtdXG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKFwiXlwiICsgdGVtcGxhdGVEYXRhLnBhdGgucmVwbGFjZShcblx0XHQvLyBJIGVzY2FwZSBsaXRlcmFsIHRleHQgc28gcGVvcGxlIGNhbiB1c2UgdGhpbmdzIGxpa2UgYDpmaWxlLjpleHRgIG9yXG5cdFx0Ly8gYDpsYW5nLTpsb2NhbGVgIGluIHJvdXRlcy4gVGhpcyBpcyBhbGwgbWVyZ2VkIGludG8gb25lIHBhc3Mgc28gSVxuXHRcdC8vIGRvbid0IGFsc28gYWNjaWRlbnRhbGx5IGVzY2FwZSBgLWAgYW5kIG1ha2UgaXQgaGFyZGVyIHRvIGRldGVjdCBpdCB0b1xuXHRcdC8vIGJhbiBpdCBmcm9tIHRlbXBsYXRlIHBhcmFtZXRlcnMuXG5cdFx0LzooW15cXC8uLV0rKShcXC57M318XFwuKD8hXFwuKXwtKT98W1xcXFxeJCorLigpfFxcW1xcXXt9XS9nLFxuXHRcdGZ1bmN0aW9uKG0sIGtleSwgZXh0cmEpIHtcblx0XHRcdGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIFwiXFxcXFwiICsgbVxuXHRcdFx0a2V5cy5wdXNoKHtrOiBrZXksIHI6IGV4dHJhID09PSBcIi4uLlwifSlcblx0XHRcdGlmIChleHRyYSA9PT0gXCIuLi5cIikgcmV0dXJuIFwiKC4qKVwiXG5cdFx0XHRpZiAoZXh0cmEgPT09IFwiLlwiKSByZXR1cm4gXCIoW14vXSspXFxcXC5cIlxuXHRcdFx0cmV0dXJuIFwiKFteL10rKVwiICsgKGV4dHJhIHx8IFwiXCIpXG5cdFx0fVxuXHQpICsgXCIkXCIpXG5cdHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0Ly8gRmlyc3QsIGNoZWNrIHRoZSBwYXJhbXMuIFVzdWFsbHksIHRoZXJlIGlzbid0IGFueSwgYW5kIGl0J3MganVzdFxuXHRcdC8vIGNoZWNraW5nIGEgc3RhdGljIHNldC5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlS2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRlbXBsYXRlRGF0YS5wYXJhbXNbdGVtcGxhdGVLZXlzW2ldXSAhPT0gZGF0YS5wYXJhbXNbdGVtcGxhdGVLZXlzW2ldXSkgcmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdC8vIElmIG5vIGludGVycG9sYXRpb25zIGV4aXN0LCBsZXQncyBza2lwIGFsbCB0aGUgY2VyZW1vbnlcblx0XHRpZiAoIWtleXMubGVuZ3RoKSByZXR1cm4gcmVnZXhwLnRlc3QoZGF0YS5wYXRoKVxuXHRcdHZhciB2YWx1ZXMgPSByZWdleHAuZXhlYyhkYXRhLnBhdGgpXG5cdFx0aWYgKHZhbHVlcyA9PSBudWxsKSByZXR1cm4gZmFsc2Vcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRhdGEucGFyYW1zW2tleXNbaV0ua10gPSBrZXlzW2ldLnIgPyB2YWx1ZXNbaSArIDFdIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlc1tpICsgMV0pXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cbn1cbiIsICJcInVzZSBzdHJpY3RcIlxuXG4vLyBOb3RlOiB0aGlzIGlzIG1pbGRseSBwZXJmLXNlbnNpdGl2ZS5cbi8vXG4vLyBJdCBkb2VzICpub3QqIHVzZSBgZGVsZXRlYCAtIGR5bmFtaWMgYGRlbGV0ZWBzIHVzdWFsbHkgY2F1c2Ugb2JqZWN0cyB0byBiYWlsXG4vLyBvdXQgaW50byBkaWN0aW9uYXJ5IG1vZGUgYW5kIGp1c3QgZ2VuZXJhbGx5IGNhdXNlIGEgYnVuY2ggb2Ygb3B0aW1pemF0aW9uXG4vLyBpc3N1ZXMgd2l0aGluIGVuZ2luZXMuXG4vL1xuLy8gSWRlYWxseSwgSSB3b3VsZCd2ZSBwcmVmZXJyZWQgdG8gZG8gdGhpcywgaWYgaXQgd2VyZW4ndCBmb3IgdGhlIG9wdGltaXphdGlvblxuLy8gaXNzdWVzOlxuLy9cbi8vIGBgYGpzXG4vLyBjb25zdCBoYXNPd24gPSByZXF1aXJlKFwiLi9oYXNPd25cIilcbi8vIGNvbnN0IG1hZ2ljID0gW1xuLy8gICAgIFwia2V5XCIsIFwib25pbml0XCIsIFwib25jcmVhdGVcIiwgXCJvbmJlZm9yZXVwZGF0ZVwiLCBcIm9udXBkYXRlXCIsXG4vLyAgICAgXCJvbmJlZm9yZXJlbW92ZVwiLCBcIm9ucmVtb3ZlXCIsXG4vLyBdXG4vLyBtb2R1bGUuZXhwb3J0cyA9IChhdHRycywgZXh0cmFzKSA9PiB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBhdHRycylcbi8vICAgICBmb3IgKGNvbnN0IGtleSBvZiBtYWdpYykgZGVsZXRlIHJlc3VsdFtrZXldXG4vLyAgICAgaWYgKGV4dHJhcyAhPSBudWxsKSBmb3IgKGNvbnN0IGtleSBvZiBleHRyYXMpIGRlbGV0ZSByZXN1bHRba2V5XVxuLy8gICAgIHJldHVybiByZXN1bHRcbi8vIH1cbi8vIGBgYFxuXG52YXIgaGFzT3duID0gcmVxdWlyZShcIi4vaGFzT3duXCIpXG4vLyBXb3JkcyBpbiBSZWdFeHAgbGl0ZXJhbHMgYXJlIHNvbWV0aW1lcyBtYW5nbGVkIGluY29ycmVjdGx5IGJ5IHRoZSBpbnRlcm5hbCBidW5kbGVyLCBzbyB1c2UgUmVnRXhwKCkuXG52YXIgbWFnaWMgPSBuZXcgUmVnRXhwKFwiXig/OmtleXxvbmluaXR8b25jcmVhdGV8b25iZWZvcmV1cGRhdGV8b251cGRhdGV8b25iZWZvcmVyZW1vdmV8b25yZW1vdmUpJFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGF0dHJzLCBleHRyYXMpIHtcblx0dmFyIHJlc3VsdCA9IHt9XG5cblx0aWYgKGV4dHJhcyAhPSBudWxsKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkgJiYgIW1hZ2ljLnRlc3Qoa2V5KSAmJiBleHRyYXMuaW5kZXhPZihrZXkpIDwgMCkge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJzW2tleV1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkgJiYgIW1hZ2ljLnRlc3Qoa2V5KSkge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJzW2tleV1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIG0gPSByZXF1aXJlKFwiLi4vcmVuZGVyL2h5cGVyc2NyaXB0XCIpXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoXCIuLi9wcm9taXNlL3Byb21pc2VcIilcblxudmFyIGJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYnVpbGRcIilcbnZhciBwYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL3BhcnNlXCIpXG52YXIgY29tcGlsZVRlbXBsYXRlID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2NvbXBpbGVUZW1wbGF0ZVwiKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCIuLi91dGlsL2Fzc2lnblwiKVxudmFyIGNlbnNvciA9IHJlcXVpcmUoXCIuLi91dGlsL2NlbnNvclwiKVxuXG52YXIgc2VudGluZWwgPSB7fVxuXG5mdW5jdGlvbiBkZWNvZGVVUklDb21wb25lbnRTYXZlKGNvbXBvbmVudCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50KVxuXHR9IGNhdGNoKGUpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkd2luZG93LCBtb3VudFJlZHJhdykge1xuXHR2YXIgY2FsbEFzeW5jID0gJHdpbmRvdyA9PSBudWxsXG5cdFx0Ly8gSW4gY2FzZSBNaXRocmlsLmpzJyBsb2FkZWQgZ2xvYmFsbHkgd2l0aG91dCB0aGUgRE9NLCBsZXQncyBub3QgYnJlYWtcblx0XHQ/IG51bGxcblx0XHQ6IHR5cGVvZiAkd2luZG93LnNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gJHdpbmRvdy5zZXRJbW1lZGlhdGUgOiAkd2luZG93LnNldFRpbWVvdXRcblx0dmFyIHAgPSBQcm9taXNlLnJlc29sdmUoKVxuXG5cdHZhciBzY2hlZHVsZWQgPSBmYWxzZVxuXG5cdC8vIHN0YXRlID09PSAwOiBpbml0XG5cdC8vIHN0YXRlID09PSAxOiBzY2hlZHVsZWRcblx0Ly8gc3RhdGUgPT09IDI6IGRvbmVcblx0dmFyIHJlYWR5ID0gZmFsc2Vcblx0dmFyIHN0YXRlID0gMFxuXG5cdHZhciBjb21waWxlZCwgZmFsbGJhY2tSb3V0ZVxuXG5cdHZhciBjdXJyZW50UmVzb2x2ZXIgPSBzZW50aW5lbCwgY29tcG9uZW50LCBhdHRycywgY3VycmVudFBhdGgsIGxhc3RVcGRhdGVcblxuXHR2YXIgUm91dGVyUm9vdCA9IHtcblx0XHRvbmJlZm9yZXVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRzdGF0ZSA9IHN0YXRlID8gMiA6IDFcblx0XHRcdHJldHVybiAhKCFzdGF0ZSB8fCBzZW50aW5lbCA9PT0gY3VycmVudFJlc29sdmVyKVxuXHRcdH0sXG5cdFx0b25yZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZmlyZUFzeW5jLCBmYWxzZSlcblx0XHRcdCR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgcmVzb2x2ZVJvdXRlLCBmYWxzZSlcblx0XHR9LFxuXHRcdHZpZXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCFzdGF0ZSB8fCBzZW50aW5lbCA9PT0gY3VycmVudFJlc29sdmVyKSByZXR1cm5cblx0XHRcdC8vIFdyYXAgaW4gYSBmcmFnbWVudCB0byBwcmVzZXJ2ZSBleGlzdGluZyBrZXkgc2VtYW50aWNzXG5cdFx0XHR2YXIgdm5vZGUgPSBbVm5vZGUoY29tcG9uZW50LCBhdHRycy5rZXksIGF0dHJzKV1cblx0XHRcdGlmIChjdXJyZW50UmVzb2x2ZXIpIHZub2RlID0gY3VycmVudFJlc29sdmVyLnJlbmRlcih2bm9kZVswXSlcblx0XHRcdHJldHVybiB2bm9kZVxuXHRcdH0sXG5cdH1cblxuXHR2YXIgU0tJUCA9IHJvdXRlLlNLSVAgPSB7fVxuXG5cdGZ1bmN0aW9uIHJlc29sdmVSb3V0ZSgpIHtcblx0XHRzY2hlZHVsZWQgPSBmYWxzZVxuXHRcdC8vIENvbnNpZGVyIHRoZSBwYXRobmFtZSBob2xpc3RpY2FsbHkuIFRoZSBwcmVmaXggbWlnaHQgZXZlbiBiZSBpbnZhbGlkLFxuXHRcdC8vIGJ1dCB0aGF0J3Mgbm90IG91ciBwcm9ibGVtLlxuXHRcdHZhciBwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLmhhc2hcblx0XHRpZiAocm91dGUucHJlZml4WzBdICE9PSBcIiNcIikge1xuXHRcdFx0cHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyBwcmVmaXhcblx0XHRcdGlmIChyb3V0ZS5wcmVmaXhbMF0gIT09IFwiP1wiKSB7XG5cdFx0XHRcdHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBwcmVmaXhcblx0XHRcdFx0aWYgKHByZWZpeFswXSAhPT0gXCIvXCIpIHByZWZpeCA9IFwiL1wiICsgcHJlZml4XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIFRoaXMgc2VlbWluZ2x5IHVzZWxlc3MgYC5jb25jYXQoKWAgc3BlZWRzIHVwIHRoZSB0ZXN0cyBxdWl0ZSBhIGJpdCxcblx0XHQvLyBzaW5jZSB0aGUgcmVwcmVzZW50YXRpb24gaXMgY29uc2lzdGVudGx5IGEgcmVsYXRpdmVseSBwb29ybHlcblx0XHQvLyBvcHRpbWl6ZWQgY29ucyBzdHJpbmcuXG5cdFx0dmFyIHBhdGggPSBwcmVmaXguY29uY2F0KClcblx0XHRcdC5yZXBsYWNlKC8oPzolW2EtZjg5XVthLWYwLTldKSsvZ2ltLCBkZWNvZGVVUklDb21wb25lbnRTYXZlKVxuXHRcdFx0LnNsaWNlKHJvdXRlLnByZWZpeC5sZW5ndGgpXG5cdFx0dmFyIGRhdGEgPSBwYXJzZVBhdGhuYW1lKHBhdGgpXG5cblx0XHRhc3NpZ24oZGF0YS5wYXJhbXMsICR3aW5kb3cuaGlzdG9yeS5zdGF0ZSlcblxuXHRcdGZ1bmN0aW9uIHJlamVjdChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpXG5cdFx0XHRzZXRQYXRoKGZhbGxiYWNrUm91dGUsIG51bGwsIHtyZXBsYWNlOiB0cnVlfSlcblx0XHR9XG5cblx0XHRsb29wKDApXG5cdFx0ZnVuY3Rpb24gbG9vcChpKSB7XG5cdFx0XHQvLyBzdGF0ZSA9PT0gMDogaW5pdFxuXHRcdFx0Ly8gc3RhdGUgPT09IDE6IHNjaGVkdWxlZFxuXHRcdFx0Ly8gc3RhdGUgPT09IDI6IGRvbmVcblx0XHRcdGZvciAoOyBpIDwgY29tcGlsZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGNvbXBpbGVkW2ldLmNoZWNrKGRhdGEpKSB7XG5cdFx0XHRcdFx0dmFyIHBheWxvYWQgPSBjb21waWxlZFtpXS5jb21wb25lbnRcblx0XHRcdFx0XHR2YXIgbWF0Y2hlZFJvdXRlID0gY29tcGlsZWRbaV0ucm91dGVcblx0XHRcdFx0XHR2YXIgbG9jYWxDb21wID0gcGF5bG9hZFxuXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBsYXN0VXBkYXRlID0gZnVuY3Rpb24oY29tcCkge1xuXHRcdFx0XHRcdFx0aWYgKHVwZGF0ZSAhPT0gbGFzdFVwZGF0ZSkgcmV0dXJuXG5cdFx0XHRcdFx0XHRpZiAoY29tcCA9PT0gU0tJUCkgcmV0dXJuIGxvb3AoaSArIDEpXG5cdFx0XHRcdFx0XHRjb21wb25lbnQgPSBjb21wICE9IG51bGwgJiYgKHR5cGVvZiBjb21wLnZpZXcgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgY29tcCA9PT0gXCJmdW5jdGlvblwiKT8gY29tcCA6IFwiZGl2XCJcblx0XHRcdFx0XHRcdGF0dHJzID0gZGF0YS5wYXJhbXMsIGN1cnJlbnRQYXRoID0gcGF0aCwgbGFzdFVwZGF0ZSA9IG51bGxcblx0XHRcdFx0XHRcdGN1cnJlbnRSZXNvbHZlciA9IHBheWxvYWQucmVuZGVyID8gcGF5bG9hZCA6IG51bGxcblx0XHRcdFx0XHRcdGlmIChzdGF0ZSA9PT0gMikgbW91bnRSZWRyYXcucmVkcmF3KClcblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IDJcblx0XHRcdFx0XHRcdFx0bW91bnRSZWRyYXcucmVkcmF3LnN5bmMoKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBUaGVyZSdzIG5vIHVuZGVyc3RhdGluZyBob3cgbXVjaCBJICp3aXNoKiBJIGNvdWxkXG5cdFx0XHRcdFx0Ly8gdXNlIGBhc3luY2AvYGF3YWl0YCBoZXJlLi4uXG5cdFx0XHRcdFx0aWYgKHBheWxvYWQudmlldyB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRwYXlsb2FkID0ge31cblx0XHRcdFx0XHRcdHVwZGF0ZShsb2NhbENvbXApXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKHBheWxvYWQub25tYXRjaCkge1xuXHRcdFx0XHRcdFx0cC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBheWxvYWQub25tYXRjaChkYXRhLnBhcmFtcywgcGF0aCwgbWF0Y2hlZFJvdXRlKVxuXHRcdFx0XHRcdFx0fSkudGhlbih1cGRhdGUsIHBhdGggPT09IGZhbGxiYWNrUm91dGUgPyBudWxsIDogcmVqZWN0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHVwZGF0ZShcImRpdlwiKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYXRoID09PSBmYWxsYmFja1JvdXRlKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIGRlZmF1bHQgcm91dGUgXCIgKyBmYWxsYmFja1JvdXRlICsgXCIuXCIpXG5cdFx0XHR9XG5cdFx0XHRzZXRQYXRoKGZhbGxiYWNrUm91dGUsIG51bGwsIHtyZXBsYWNlOiB0cnVlfSlcblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgaXQgdW5jb25kaXRpb25hbGx5IHNvIGBtLnJvdXRlLnNldGAgYW5kIGBtLnJvdXRlLkxpbmtgIGJvdGggd29yayxcblx0Ly8gZXZlbiBpZiBuZWl0aGVyIGBwdXNoU3RhdGVgIG5vciBgaGFzaGNoYW5nZWAgYXJlIHN1cHBvcnRlZC4gSXQnc1xuXHQvLyBjbGVhcmVkIGlmIGBoYXNoY2hhbmdlYCBpcyB1c2VkLCBzaW5jZSB0aGF0IG1ha2VzIGl0IGF1dG9tYXRpY2FsbHlcblx0Ly8gYXN5bmMuXG5cdGZ1bmN0aW9uIGZpcmVBc3luYygpIHtcblx0XHRpZiAoIXNjaGVkdWxlZCkge1xuXHRcdFx0c2NoZWR1bGVkID0gdHJ1ZVxuXHRcdFx0Ly8gVE9ETzoganVzdCBkbyBgbW91bnRSZWRyYXcucmVkcmF3KClgIGhlcmUgYW5kIGVsaWRlIHRoZSB0aW1lclxuXHRcdFx0Ly8gZGVwZW5kZW5jeS4gTm90ZSB0aGF0IHRoaXMgd2lsbCBtdWNrIHdpdGggdGVzdHMgYSAqbG90Kiwgc28gaXQnc1xuXHRcdFx0Ly8gbm90IGFzIGVhc3kgb2YgYSBjaGFuZ2UgYXMgaXQgc291bmRzLlxuXHRcdFx0Y2FsbEFzeW5jKHJlc29sdmVSb3V0ZSlcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRQYXRoKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHRwYXRoID0gYnVpbGRQYXRobmFtZShwYXRoLCBkYXRhKVxuXHRcdGlmIChyZWFkeSkge1xuXHRcdFx0ZmlyZUFzeW5jKClcblx0XHRcdHZhciBzdGF0ZSA9IG9wdGlvbnMgPyBvcHRpb25zLnN0YXRlIDogbnVsbFxuXHRcdFx0dmFyIHRpdGxlID0gb3B0aW9ucyA/IG9wdGlvbnMudGl0bGUgOiBudWxsXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcGxhY2UpICR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZS5wcmVmaXggKyBwYXRoKVxuXHRcdFx0ZWxzZSAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGUucHJlZml4ICsgcGF0aClcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZS5wcmVmaXggKyBwYXRoXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcm91dGUocm9vdCwgZGVmYXVsdFJvdXRlLCByb3V0ZXMpIHtcblx0XHRpZiAoIXJvb3QpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJET00gZWxlbWVudCBiZWluZyByZW5kZXJlZCB0byBkb2VzIG5vdCBleGlzdC5cIilcblxuXHRcdGNvbXBpbGVkID0gT2JqZWN0LmtleXMocm91dGVzKS5tYXAoZnVuY3Rpb24ocm91dGUpIHtcblx0XHRcdGlmIChyb3V0ZVswXSAhPT0gXCIvXCIpIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlJvdXRlcyBtdXN0IHN0YXJ0IHdpdGggYSAnLycuXCIpXG5cdFx0XHRpZiAoKC86KFteXFwvXFwuLV0rKShcXC57M30pPzovKS50ZXN0KHJvdXRlKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJSb3V0ZSBwYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBlaXRoZXIgJy8nLCAnLicsIG9yICctJy5cIilcblx0XHRcdH1cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJvdXRlOiByb3V0ZSxcblx0XHRcdFx0Y29tcG9uZW50OiByb3V0ZXNbcm91dGVdLFxuXHRcdFx0XHRjaGVjazogY29tcGlsZVRlbXBsYXRlKHJvdXRlKSxcblx0XHRcdH1cblx0XHR9KVxuXHRcdGZhbGxiYWNrUm91dGUgPSBkZWZhdWx0Um91dGVcblx0XHRpZiAoZGVmYXVsdFJvdXRlICE9IG51bGwpIHtcblx0XHRcdHZhciBkZWZhdWx0RGF0YSA9IHBhcnNlUGF0aG5hbWUoZGVmYXVsdFJvdXRlKVxuXG5cdFx0XHRpZiAoIWNvbXBpbGVkLnNvbWUoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuY2hlY2soZGVmYXVsdERhdGEpIH0pKSB7XG5cdFx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkRlZmF1bHQgcm91dGUgZG9lc24ndCBtYXRjaCBhbnkga25vd24gcm91dGVzLlwiKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHQkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmaXJlQXN5bmMsIGZhbHNlKVxuXHRcdH0gZWxzZSBpZiAocm91dGUucHJlZml4WzBdID09PSBcIiNcIikge1xuXHRcdFx0JHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByZXNvbHZlUm91dGUsIGZhbHNlKVxuXHRcdH1cblxuXHRcdHJlYWR5ID0gdHJ1ZVxuXHRcdG1vdW50UmVkcmF3Lm1vdW50KHJvb3QsIFJvdXRlclJvb3QpXG5cdFx0cmVzb2x2ZVJvdXRlKClcblx0fVxuXHRyb3V0ZS5zZXQgPSBmdW5jdGlvbihwYXRoLCBkYXRhLCBvcHRpb25zKSB7XG5cdFx0aWYgKGxhc3RVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblx0XHRcdG9wdGlvbnMucmVwbGFjZSA9IHRydWVcblx0XHR9XG5cdFx0bGFzdFVwZGF0ZSA9IG51bGxcblx0XHRzZXRQYXRoKHBhdGgsIGRhdGEsIG9wdGlvbnMpXG5cdH1cblx0cm91dGUuZ2V0ID0gZnVuY3Rpb24oKSB7cmV0dXJuIGN1cnJlbnRQYXRofVxuXHRyb3V0ZS5wcmVmaXggPSBcIiMhXCJcblx0cm91dGUuTGluayA9IHtcblx0XHR2aWV3OiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdFx0Ly8gT21pdCB0aGUgdXNlZCBwYXJhbWV0ZXJzIGZyb20gdGhlIHJlbmRlcmVkIGVsZW1lbnQgLSB0aGV5IGFyZVxuXHRcdFx0Ly8gaW50ZXJuYWwuIEFsc28sIGNlbnNvciB0aGUgdmFyaW91cyBsaWZlY3ljbGUgbWV0aG9kcy5cblx0XHRcdC8vXG5cdFx0XHQvLyBXZSBkb24ndCBzdHJpcCB0aGUgb3RoZXIgcGFyYW1ldGVycyBiZWNhdXNlIGZvciBjb252ZW5pZW5jZSB3ZVxuXHRcdFx0Ly8gbGV0IHRoZW0gYmUgc3BlY2lmaWVkIGluIHRoZSBzZWxlY3RvciBhcyB3ZWxsLlxuXHRcdFx0dmFyIGNoaWxkID0gbShcblx0XHRcdFx0dm5vZGUuYXR0cnMuc2VsZWN0b3IgfHwgXCJhXCIsXG5cdFx0XHRcdGNlbnNvcih2bm9kZS5hdHRycywgW1wib3B0aW9uc1wiLCBcInBhcmFtc1wiLCBcInNlbGVjdG9yXCIsIFwib25jbGlja1wiXSksXG5cdFx0XHRcdHZub2RlLmNoaWxkcmVuXG5cdFx0XHQpXG5cdFx0XHR2YXIgb3B0aW9ucywgb25jbGljaywgaHJlZlxuXG5cdFx0XHQvLyBMZXQncyBwcm92aWRlIGEgKnJpZ2h0KiB3YXkgdG8gZGlzYWJsZSBhIHJvdXRlIGxpbmssIHJhdGhlciB0aGFuXG5cdFx0XHQvLyBsZXR0aW5nIHBlb3BsZSBzY3JldyB1cCBhY2Nlc3NpYmlsaXR5IG9uIGFjY2lkZW50LlxuXHRcdFx0Ly9cblx0XHRcdC8vIFRoZSBhdHRyaWJ1dGUgaXMgY29lcmNlZCBzbyB1c2VycyBkb24ndCBnZXQgc3VycHJpc2VkIG92ZXJcblx0XHRcdC8vIGBkaXNhYmxlZDogMGAgcmVzdWx0aW5nIGluIGEgYnV0dG9uIHRoYXQncyBzb21laG93IHJvdXRhYmxlXG5cdFx0XHQvLyBkZXNwaXRlIGJlaW5nIHZpc2libHkgZGlzYWJsZWQuXG5cdFx0XHRpZiAoY2hpbGQuYXR0cnMuZGlzYWJsZWQgPSBCb29sZWFuKGNoaWxkLmF0dHJzLmRpc2FibGVkKSkge1xuXHRcdFx0XHRjaGlsZC5hdHRycy5ocmVmID0gbnVsbFxuXHRcdFx0XHRjaGlsZC5hdHRyc1tcImFyaWEtZGlzYWJsZWRcIl0gPSBcInRydWVcIlxuXHRcdFx0XHQvLyBJZiB5b3UgKnJlYWxseSogZG8gd2FudCBhZGQgYG9uY2xpY2tgIG9uIGEgZGlzYWJsZWQgbGluaywgdXNlXG5cdFx0XHRcdC8vIGFuIGBvbmNyZWF0ZWAgaG9vayB0byBhZGQgaXQuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zID0gdm5vZGUuYXR0cnMub3B0aW9uc1xuXHRcdFx0XHRvbmNsaWNrID0gdm5vZGUuYXR0cnMub25jbGlja1xuXHRcdFx0XHQvLyBFYXNpZXIgdG8gYnVpbGQgaXQgbm93IHRvIGtlZXAgaXQgaXNvbW9ycGhpYy5cblx0XHRcdFx0aHJlZiA9IGJ1aWxkUGF0aG5hbWUoY2hpbGQuYXR0cnMuaHJlZiwgdm5vZGUuYXR0cnMucGFyYW1zKVxuXHRcdFx0XHRjaGlsZC5hdHRycy5ocmVmID0gcm91dGUucHJlZml4ICsgaHJlZlxuXHRcdFx0XHRjaGlsZC5hdHRycy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHZhciByZXN1bHRcblx0XHRcdFx0XHRpZiAodHlwZW9mIG9uY2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gb25jbGljay5jYWxsKGUuY3VycmVudFRhcmdldCwgZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9uY2xpY2sgPT0gbnVsbCB8fCB0eXBlb2Ygb25jbGljayAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdFx0Ly8gZG8gbm90aGluZ1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9uY2xpY2suaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0b25jbGljay5oYW5kbGVFdmVudChlKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEFkYXB0ZWQgZnJvbSBSZWFjdCBSb3V0ZXIncyBpbXBsZW1lbnRhdGlvbjpcblx0XHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9yZWFjdC1yb3V0ZXIvYmxvYi81MjBhMGFjZDQ4YWUxYjA2NmViMGIwN2Q2ZDRkMTc5MGExZDAyNDgyL3BhY2thZ2VzL3JlYWN0LXJvdXRlci1kb20vbW9kdWxlcy9MaW5rLmpzXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBUcnkgdG8gYmUgZmxleGlibGUgYW5kIGludHVpdGl2ZSBpbiBob3cgd2UgaGFuZGxlIGxpbmtzLlxuXHRcdFx0XHRcdC8vIEZ1biBmYWN0OiBsaW5rcyBhcmVuJ3QgYXMgb2J2aW91cyB0byBnZXQgcmlnaHQgYXMgeW91XG5cdFx0XHRcdFx0Ly8gd291bGQgZXhwZWN0LiBUaGVyZSdzIGEgbG90IG1vcmUgdmFsaWQgd2F5cyB0byBjbGljayBhXG5cdFx0XHRcdFx0Ly8gbGluayB0aGFuIHRoaXMsIGFuZCBvbmUgbWlnaHQgd2FudCB0byBub3Qgc2ltcGx5IGNsaWNrIGFcblx0XHRcdFx0XHQvLyBsaW5rLCBidXQgcmlnaHQgY2xpY2sgb3IgY29tbWFuZC1jbGljayBpdCB0byBjb3B5IHRoZVxuXHRcdFx0XHRcdC8vIGxpbmsgdGFyZ2V0LCBldGMuIE5vcGUsIHRoaXMgaXNuJ3QganVzdCBmb3IgYmxpbmQgcGVvcGxlLlxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdC8vIFNraXAgaWYgYG9uY2xpY2tgIHByZXZlbnRlZCBkZWZhdWx0XG5cdFx0XHRcdFx0XHRyZXN1bHQgIT09IGZhbHNlICYmICFlLmRlZmF1bHRQcmV2ZW50ZWQgJiZcblx0XHRcdFx0XHRcdC8vIElnbm9yZSBldmVyeXRoaW5nIGJ1dCBsZWZ0IGNsaWNrc1xuXHRcdFx0XHRcdFx0KGUuYnV0dG9uID09PSAwIHx8IGUud2hpY2ggPT09IDAgfHwgZS53aGljaCA9PT0gMSkgJiZcblx0XHRcdFx0XHRcdC8vIExldCB0aGUgYnJvd3NlciBoYW5kbGUgYHRhcmdldD1fYmxhbmtgLCBldGMuXG5cdFx0XHRcdFx0XHQoIWUuY3VycmVudFRhcmdldC50YXJnZXQgfHwgZS5jdXJyZW50VGFyZ2V0LnRhcmdldCA9PT0gXCJfc2VsZlwiKSAmJlxuXHRcdFx0XHRcdFx0Ly8gTm8gbW9kaWZpZXIga2V5c1xuXHRcdFx0XHRcdFx0IWUuY3RybEtleSAmJiAhZS5tZXRhS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmFsdEtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRlLnJlZHJhdyA9IGZhbHNlXG5cdFx0XHRcdFx0XHRyb3V0ZS5zZXQoaHJlZiwgbnVsbCwgb3B0aW9ucylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGlsZFxuXHRcdH0sXG5cdH1cblx0cm91dGUucGFyYW0gPSBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gYXR0cnMgJiYga2V5ICE9IG51bGwgPyBhdHRyc1trZXldIDogYXR0cnNcblx0fVxuXG5cdHJldHVybiByb3V0ZVxufVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2FwaS9yb3V0ZXJcIikodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IG51bGwsIG1vdW50UmVkcmF3KVxuIiwgIlwidXNlIHN0cmljdFwiXG5cbnZhciBoeXBlcnNjcmlwdCA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0XCIpXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCIuL3JlcXVlc3RcIilcbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG52YXIgbSA9IGZ1bmN0aW9uIG0oKSB7IHJldHVybiBoeXBlcnNjcmlwdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH1cbm0ubSA9IGh5cGVyc2NyaXB0XG5tLnRydXN0ID0gaHlwZXJzY3JpcHQudHJ1c3Rcbm0uZnJhZ21lbnQgPSBoeXBlcnNjcmlwdC5mcmFnbWVudFxubS5GcmFnbWVudCA9IFwiW1wiXG5tLm1vdW50ID0gbW91bnRSZWRyYXcubW91bnRcbm0ucm91dGUgPSByZXF1aXJlKFwiLi9yb3V0ZVwiKVxubS5yZW5kZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJcIilcbm0ucmVkcmF3ID0gbW91bnRSZWRyYXcucmVkcmF3XG5tLnJlcXVlc3QgPSByZXF1ZXN0LnJlcXVlc3Rcbm0uanNvbnAgPSByZXF1ZXN0Lmpzb25wXG5tLnBhcnNlUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxubS5idWlsZFF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4vcXVlcnlzdHJpbmcvYnVpbGRcIilcbm0ucGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuL3BhdGhuYW1lL3BhcnNlXCIpXG5tLmJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXRobmFtZS9idWlsZFwiKVxubS52bm9kZSA9IHJlcXVpcmUoXCIuL3JlbmRlci92bm9kZVwiKVxubS5Qcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3BvbHlmaWxsXCIpXG5tLmNlbnNvciA9IHJlcXVpcmUoXCIuL3V0aWwvY2Vuc29yXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gbVxuIiwgImltcG9ydCBtIGZyb20gJ21pdGhyaWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG5cbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb21lLXZub2RlJyk7XG5cbiAgbS5tb3VudChub2RlLCB7XG4gICAgdmlldzogKCkgPT4gW1xuICAgICAgbShcbiAgICAgICAgJy5yb3cuanVzdGlmeS1jb250ZW50LWNlbnRlci5teS01JyxcbiAgICAgICAgbSgnLmNvbC1hdXRvLmJnLWRhbmdlcicsXG4gICAgICAgICAgbSgnaDEnLCAnRk9PIC0gVmlydHVhbCBET00nKSxcblxuICAgICAgICApXG4gICAgICApXG4gICAgXVxuICB9KTtcblxufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcnO1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBtanMoKSB7XG4gIHJldHVybiAnZmlsZS5tanMnO1xufVxuIiwgImltcG9ydCB7IG1qcyB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZmlsZS5tanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICBtanMoKVxuXG4gIHJldHVybiAnZnNzc3Nzc3Nzc3Nzc3Nzcyc7XG59XG4iLCAiLypcblN0aW11bHVzIDMuMi4xXG5Db3B5cmlnaHQgXHUwMEE5IDIwMjIgQmFzZWNhbXAsIExMQ1xuICovXG5jbGFzcyBFdmVudExpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5ldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnM7XG4gICAgICAgIHRoaXMudW5vcmRlcmVkQmluZGluZ3MgPSBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcywgdGhpcy5ldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMsIHRoaXMuZXZlbnRPcHRpb25zKTtcbiAgICB9XG4gICAgYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMudW5vcmRlcmVkQmluZGluZ3MuYWRkKGJpbmRpbmcpO1xuICAgIH1cbiAgICBiaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy51bm9yZGVyZWRCaW5kaW5ncy5kZWxldGUoYmluZGluZyk7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZlbnQgPSBleHRlbmRFdmVudChldmVudCk7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZyBvZiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoZXh0ZW5kZWRFdmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbmRpbmcuaGFuZGxlRXZlbnQoZXh0ZW5kZWRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzQmluZGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVub3JkZXJlZEJpbmRpbmdzLnNpemUgPiAwO1xuICAgIH1cbiAgICBnZXQgYmluZGluZ3MoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMudW5vcmRlcmVkQmluZGluZ3MpLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsZWZ0SW5kZXggPSBsZWZ0LmluZGV4LCByaWdodEluZGV4ID0gcmlnaHQuaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gbGVmdEluZGV4IDwgcmlnaHRJbmRleCA/IC0xIDogbGVmdEluZGV4ID4gcmlnaHRJbmRleCA/IDEgOiAwO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBleHRlbmRFdmVudChldmVudCkge1xuICAgIGlmIChcImltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiIGluIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIH0gPSBldmVudDtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZXZlbnQsIHtcbiAgICAgICAgICAgIGltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogZmFsc2UsXG4gICAgICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbi5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBEaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lck1hcHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLmZvckVhY2goKGV2ZW50TGlzdGVuZXIpID0+IGV2ZW50TGlzdGVuZXIuY29ubmVjdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRMaXN0ZW5lcikgPT4gZXZlbnRMaXN0ZW5lci5kaXNjb25uZWN0KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBldmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ldmVudExpc3RlbmVyTWFwcy52YWx1ZXMoKSkucmVkdWNlKChsaXN0ZW5lcnMsIG1hcCkgPT4gbGlzdGVuZXJzLmNvbmNhdChBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSkpLCBbXSk7XG4gICAgfVxuICAgIGJpbmRpbmdDb25uZWN0ZWQoYmluZGluZykge1xuICAgICAgICB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lckZvckJpbmRpbmcoYmluZGluZykuYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICB9XG4gICAgYmluZGluZ0Rpc2Nvbm5lY3RlZChiaW5kaW5nLCBjbGVhckV2ZW50TGlzdGVuZXJzID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5mZXRjaEV2ZW50TGlzdGVuZXJGb3JCaW5kaW5nKGJpbmRpbmcpLmJpbmRpbmdEaXNjb25uZWN0ZWQoYmluZGluZyk7XG4gICAgICAgIGlmIChjbGVhckV2ZW50TGlzdGVuZXJzKVxuICAgICAgICAgICAgdGhpcy5jbGVhckV2ZW50TGlzdGVuZXJzRm9yQmluZGluZyhiaW5kaW5nKTtcbiAgICB9XG4gICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGRldGFpbCA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24uaGFuZGxlRXJyb3IoZXJyb3IsIGBFcnJvciAke21lc3NhZ2V9YCwgZGV0YWlsKTtcbiAgICB9XG4gICAgY2xlYXJFdmVudExpc3RlbmVyc0ZvckJpbmRpbmcoYmluZGluZykge1xuICAgICAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5mZXRjaEV2ZW50TGlzdGVuZXJGb3JCaW5kaW5nKGJpbmRpbmcpO1xuICAgICAgICBpZiAoIWV2ZW50TGlzdGVuZXIuaGFzQmluZGluZ3MoKSkge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcHBlZEV2ZW50TGlzdGVuZXJGb3IoYmluZGluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlTWFwcGVkRXZlbnRMaXN0ZW5lckZvcihiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zIH0gPSBiaW5kaW5nO1xuICAgICAgICBjb25zdCBldmVudExpc3RlbmVyTWFwID0gdGhpcy5mZXRjaEV2ZW50TGlzdGVuZXJNYXBGb3JFdmVudFRhcmdldChldmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5jYWNoZUtleShldmVudE5hbWUsIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJNYXAuZGVsZXRlKGNhY2hlS2V5KTtcbiAgICAgICAgaWYgKGV2ZW50TGlzdGVuZXJNYXAuc2l6ZSA9PSAwKVxuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyTWFwcy5kZWxldGUoZXZlbnRUYXJnZXQpO1xuICAgIH1cbiAgICBmZXRjaEV2ZW50TGlzdGVuZXJGb3JCaW5kaW5nKGJpbmRpbmcpIHtcbiAgICAgICAgY29uc3QgeyBldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMgfSA9IGJpbmRpbmc7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgICBmZXRjaEV2ZW50TGlzdGVuZXIoZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJNYXAgPSB0aGlzLmZldGNoRXZlbnRMaXN0ZW5lck1hcEZvckV2ZW50VGFyZ2V0KGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmNhY2hlS2V5KGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgbGV0IGV2ZW50TGlzdGVuZXIgPSBldmVudExpc3RlbmVyTWFwLmdldChjYWNoZUtleSk7XG4gICAgICAgIGlmICghZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lciA9IHRoaXMuY3JlYXRlRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lck1hcC5zZXQoY2FjaGVLZXksIGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudExpc3RlbmVyO1xuICAgIH1cbiAgICBjcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucykge1xuICAgICAgICBjb25zdCBldmVudExpc3RlbmVyID0gbmV3IEV2ZW50TGlzdGVuZXIoZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG4gICAgfVxuICAgIGZldGNoRXZlbnRMaXN0ZW5lck1hcEZvckV2ZW50VGFyZ2V0KGV2ZW50VGFyZ2V0KSB7XG4gICAgICAgIGxldCBldmVudExpc3RlbmVyTWFwID0gdGhpcy5ldmVudExpc3RlbmVyTWFwcy5nZXQoZXZlbnRUYXJnZXQpO1xuICAgICAgICBpZiAoIWV2ZW50TGlzdGVuZXJNYXApIHtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLnNldChldmVudFRhcmdldCwgZXZlbnRMaXN0ZW5lck1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXJNYXA7XG4gICAgfVxuICAgIGNhY2hlS2V5KGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gW2V2ZW50TmFtZV07XG4gICAgICAgIE9iamVjdC5rZXlzKGV2ZW50T3B0aW9ucylcbiAgICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goYCR7ZXZlbnRPcHRpb25zW2tleV0gPyBcIlwiIDogXCIhXCJ9JHtrZXl9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIjpcIik7XG4gICAgfVxufVxuXG5jb25zdCBkZWZhdWx0QWN0aW9uRGVzY3JpcHRvckZpbHRlcnMgPSB7XG4gICAgc3RvcCh7IGV2ZW50LCB2YWx1ZSB9KSB7XG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHByZXZlbnQoeyBldmVudCwgdmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHNlbGYoeyBldmVudCwgdmFsdWUsIGVsZW1lbnQgfSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID09PSBldmVudC50YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuY29uc3QgZGVzY3JpcHRvclBhdHRlcm4gPSAvXig/OiguKz8pKD86XFwuKC4rPykpPyg/OkAod2luZG93fGRvY3VtZW50KSk/LT4pPyguKz8pKD86IyhbXjpdKz8pKSg/OjooLispKT8kLztcbmZ1bmN0aW9uIHBhcnNlQWN0aW9uRGVzY3JpcHRvclN0cmluZyhkZXNjcmlwdG9yU3RyaW5nKSB7XG4gICAgY29uc3Qgc291cmNlID0gZGVzY3JpcHRvclN0cmluZy50cmltKCk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHNvdXJjZS5tYXRjaChkZXNjcmlwdG9yUGF0dGVybikgfHwgW107XG4gICAgbGV0IGV2ZW50TmFtZSA9IG1hdGNoZXNbMV07XG4gICAgbGV0IGtleUZpbHRlciA9IG1hdGNoZXNbMl07XG4gICAgaWYgKGtleUZpbHRlciAmJiAhW1wia2V5ZG93blwiLCBcImtleXVwXCIsIFwia2V5cHJlc3NcIl0uaW5jbHVkZXMoZXZlbnROYW1lKSkge1xuICAgICAgICBldmVudE5hbWUgKz0gYC4ke2tleUZpbHRlcn1gO1xuICAgICAgICBrZXlGaWx0ZXIgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBldmVudFRhcmdldDogcGFyc2VFdmVudFRhcmdldChtYXRjaGVzWzNdKSxcbiAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICBldmVudE9wdGlvbnM6IG1hdGNoZXNbNl0gPyBwYXJzZUV2ZW50T3B0aW9ucyhtYXRjaGVzWzZdKSA6IHt9LFxuICAgICAgICBpZGVudGlmaWVyOiBtYXRjaGVzWzRdLFxuICAgICAgICBtZXRob2ROYW1lOiBtYXRjaGVzWzVdLFxuICAgICAgICBrZXlGaWx0ZXIsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXROYW1lKSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0TmFtZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0TmFtZSA9PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcnNlRXZlbnRPcHRpb25zKGV2ZW50T3B0aW9ucykge1xuICAgIHJldHVybiBldmVudE9wdGlvbnNcbiAgICAgICAgLnNwbGl0KFwiOlwiKVxuICAgICAgICAucmVkdWNlKChvcHRpb25zLCB0b2tlbikgPT4gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7IFt0b2tlbi5yZXBsYWNlKC9eIS8sIFwiXCIpXTogIS9eIS8udGVzdCh0b2tlbikgfSksIHt9KTtcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeUV2ZW50VGFyZ2V0KGV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0ID09IHdpbmRvdykge1xuICAgICAgICByZXR1cm4gXCJ3aW5kb3dcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnRUYXJnZXQgPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIFwiZG9jdW1lbnRcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbWVsaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyg/OltfLV0pKFthLXowLTldKS9nLCAoXywgY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cbmZ1bmN0aW9uIG5hbWVzcGFjZUNhbWVsaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNhbWVsaXplKHZhbHVlLnJlcGxhY2UoLy0tL2csIFwiLVwiKS5yZXBsYWNlKC9fXy9nLCBcIl9cIikpO1xufVxuZnVuY3Rpb24gY2FwaXRhbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xufVxuZnVuY3Rpb24gZGFzaGVyaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyhbQS1aXSkvZywgKF8sIGNoYXIpID0+IGAtJHtjaGFyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5mdW5jdGlvbiB0b2tlbml6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXRjaCgvW15cXHNdKy9nKSB8fCBbXTtcbn1cblxuY2xhc3MgQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBpbmRleCwgZGVzY3JpcHRvciwgc2NoZW1hKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldCA9IGRlc2NyaXB0b3IuZXZlbnRUYXJnZXQgfHwgZWxlbWVudDtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBkZXNjcmlwdG9yLmV2ZW50TmFtZSB8fCBnZXREZWZhdWx0RXZlbnROYW1lRm9yRWxlbWVudChlbGVtZW50KSB8fCBlcnJvcihcIm1pc3NpbmcgZXZlbnQgbmFtZVwiKTtcbiAgICAgICAgdGhpcy5ldmVudE9wdGlvbnMgPSBkZXNjcmlwdG9yLmV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5pZGVudGlmaWVyID0gZGVzY3JpcHRvci5pZGVudGlmaWVyIHx8IGVycm9yKFwibWlzc2luZyBpZGVudGlmaWVyXCIpO1xuICAgICAgICB0aGlzLm1ldGhvZE5hbWUgPSBkZXNjcmlwdG9yLm1ldGhvZE5hbWUgfHwgZXJyb3IoXCJtaXNzaW5nIG1ldGhvZCBuYW1lXCIpO1xuICAgICAgICB0aGlzLmtleUZpbHRlciA9IGRlc2NyaXB0b3Iua2V5RmlsdGVyIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICAgIH1cbiAgICBzdGF0aWMgZm9yVG9rZW4odG9rZW4sIHNjaGVtYSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXModG9rZW4uZWxlbWVudCwgdG9rZW4uaW5kZXgsIHBhcnNlQWN0aW9uRGVzY3JpcHRvclN0cmluZyh0b2tlbi5jb250ZW50KSwgc2NoZW1hKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50RmlsdGVyID0gdGhpcy5rZXlGaWx0ZXIgPyBgLiR7dGhpcy5rZXlGaWx0ZXJ9YCA6IFwiXCI7XG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldE5hbWUgPyBgQCR7dGhpcy5ldmVudFRhcmdldE5hbWV9YCA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmV2ZW50TmFtZX0ke2V2ZW50RmlsdGVyfSR7ZXZlbnRUYXJnZXR9LT4ke3RoaXMuaWRlbnRpZmllcn0jJHt0aGlzLm1ldGhvZE5hbWV9YDtcbiAgICB9XG4gICAgaXNGaWx0ZXJUYXJnZXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmtleUZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVzID0gdGhpcy5rZXlGaWx0ZXIuc3BsaXQoXCIrXCIpO1xuICAgICAgICBjb25zdCBtb2RpZmllcnMgPSBbXCJtZXRhXCIsIFwiY3RybFwiLCBcImFsdFwiLCBcInNoaWZ0XCJdO1xuICAgICAgICBjb25zdCBbbWV0YSwgY3RybCwgYWx0LCBzaGlmdF0gPSBtb2RpZmllcnMubWFwKChtb2RpZmllcikgPT4gZmlsdGVyZXMuaW5jbHVkZXMobW9kaWZpZXIpKTtcbiAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkgIT09IG1ldGEgfHwgZXZlbnQuY3RybEtleSAhPT0gY3RybCB8fCBldmVudC5hbHRLZXkgIT09IGFsdCB8fCBldmVudC5zaGlmdEtleSAhPT0gc2hpZnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YW5kYXJkRmlsdGVyID0gZmlsdGVyZXMuZmlsdGVyKChrZXkpID0+ICFtb2RpZmllcnMuaW5jbHVkZXMoa2V5KSlbMF07XG4gICAgICAgIGlmICghc3RhbmRhcmRGaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmtleU1hcHBpbmdzLCBzdGFuZGFyZEZpbHRlcikpIHtcbiAgICAgICAgICAgIGVycm9yKGBjb250YWlucyB1bmtub3duIGtleSBmaWx0ZXI6ICR7dGhpcy5rZXlGaWx0ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMua2V5TWFwcGluZ3Nbc3RhbmRhcmRGaWx0ZXJdLnRvTG93ZXJDYXNlKCkgIT09IGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBnZXQgcGFyYW1zKCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYF5kYXRhLSR7dGhpcy5pZGVudGlmaWVyfS0oLispLXBhcmFtJGAsIFwiaVwiKTtcbiAgICAgICAgZm9yIChjb25zdCB7IG5hbWUsIHZhbHVlIH0gb2YgQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChwYXR0ZXJuKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tjYW1lbGl6ZShrZXkpXSA9IHR5cGVjYXN0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBnZXQgZXZlbnRUYXJnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5RXZlbnRUYXJnZXQodGhpcy5ldmVudFRhcmdldCk7XG4gICAgfVxuICAgIGdldCBrZXlNYXBwaW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmtleU1hcHBpbmdzO1xuICAgIH1cbn1cbmNvbnN0IGRlZmF1bHRFdmVudE5hbWVzID0ge1xuICAgIGE6ICgpID0+IFwiY2xpY2tcIixcbiAgICBidXR0b246ICgpID0+IFwiY2xpY2tcIixcbiAgICBmb3JtOiAoKSA9PiBcInN1Ym1pdFwiLFxuICAgIGRldGFpbHM6ICgpID0+IFwidG9nZ2xlXCIsXG4gICAgaW5wdXQ6IChlKSA9PiAoZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09IFwic3VibWl0XCIgPyBcImNsaWNrXCIgOiBcImlucHV0XCIpLFxuICAgIHNlbGVjdDogKCkgPT4gXCJjaGFuZ2VcIixcbiAgICB0ZXh0YXJlYTogKCkgPT4gXCJpbnB1dFwiLFxufTtcbmZ1bmN0aW9uIGdldERlZmF1bHRFdmVudE5hbWVGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRhZ05hbWUgaW4gZGVmYXVsdEV2ZW50TmFtZXMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFdmVudE5hbWVzW3RhZ05hbWVdKGVsZW1lbnQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG59XG5mdW5jdGlvbiB0eXBlY2FzdCh2YWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKG9fTykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5jbGFzcyBCaW5kaW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgfVxuICAgIGdldCBpbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmluZGV4O1xuICAgIH1cbiAgICBnZXQgZXZlbnRUYXJnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbi5ldmVudFRhcmdldDtcbiAgICB9XG4gICAgZ2V0IGV2ZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmV2ZW50T3B0aW9ucztcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMud2lsbEJlSW52b2tlZEJ5RXZlbnQoZXZlbnQpICYmIHRoaXMuYXBwbHlFdmVudE1vZGlmaWVycyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW52b2tlV2l0aEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZXZlbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uZXZlbnROYW1lO1xuICAgIH1cbiAgICBnZXQgbWV0aG9kKCkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLmNvbnRyb2xsZXJbdGhpcy5tZXRob2ROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWN0aW9uIFwiJHt0aGlzLmFjdGlvbn1cIiByZWZlcmVuY2VzIHVuZGVmaW5lZCBtZXRob2QgXCIke3RoaXMubWV0aG9kTmFtZX1cImApO1xuICAgIH1cbiAgICBhcHBseUV2ZW50TW9kaWZpZXJzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdGhpcy5hY3Rpb247XG4gICAgICAgIGNvbnN0IHsgYWN0aW9uRGVzY3JpcHRvckZpbHRlcnMgfSA9IHRoaXMuY29udGV4dC5hcHBsaWNhdGlvbjtcbiAgICAgICAgbGV0IHBhc3NlcyA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmV2ZW50T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lIGluIGFjdGlvbkRlc2NyaXB0b3JGaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gYWN0aW9uRGVzY3JpcHRvckZpbHRlcnNbbmFtZV07XG4gICAgICAgICAgICAgICAgcGFzc2VzID0gcGFzc2VzICYmIGZpbHRlcih7IG5hbWUsIHZhbHVlLCBldmVudCwgZWxlbWVudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXNzZXM7XG4gICAgfVxuICAgIGludm9rZVdpdGhFdmVudChldmVudCkge1xuICAgICAgICBjb25zdCB7IHRhcmdldCwgY3VycmVudFRhcmdldCB9ID0gZXZlbnQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IHBhcmFtcyB9ID0gdGhpcy5hY3Rpb247XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25FdmVudCA9IE9iamVjdC5hc3NpZ24oZXZlbnQsIHsgcGFyYW1zIH0pO1xuICAgICAgICAgICAgdGhpcy5tZXRob2QuY2FsbCh0aGlzLmNvbnRyb2xsZXIsIGFjdGlvbkV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5sb2dEZWJ1Z0FjdGl2aXR5KHRoaXMubWV0aG9kTmFtZSwgeyBldmVudCwgdGFyZ2V0LCBjdXJyZW50VGFyZ2V0LCBhY3Rpb246IHRoaXMubWV0aG9kTmFtZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCwgaW5kZXggfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBkZXRhaWwgPSB7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXIsIGVsZW1lbnQsIGluZGV4LCBldmVudCB9O1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmhhbmRsZUVycm9yKGVycm9yLCBgaW52b2tpbmcgYWN0aW9uIFwiJHt0aGlzLmFjdGlvbn1cImAsIGRldGFpbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2lsbEJlSW52b2tlZEJ5RXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQgJiYgdGhpcy5hY3Rpb24uaXNGaWx0ZXJUYXJnZXQoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCA9PT0gZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCAmJiB0aGlzLmVsZW1lbnQuY29udGFpbnMoZXZlbnRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5jb250YWluc0VsZW1lbnQoZXZlbnRUYXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuY29udGFpbnNFbGVtZW50KHRoaXMuYWN0aW9uLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjb250cm9sbGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNvbnRyb2xsZXI7XG4gICAgfVxuICAgIGdldCBtZXRob2ROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24ubWV0aG9kTmFtZTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zY29wZTtcbiAgICB9XG59XG5cbmNsYXNzIEVsZW1lbnRPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVySW5pdCA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHRoaXMucHJvY2Vzc011dGF0aW9ucyhtdXRhdGlvbnMpKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0KTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0KTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLnRha2VSZWNvcmRzKCk7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IG5ldyBTZXQodGhpcy5tYXRjaEVsZW1lbnRzSW5UcmVlKCkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIEFycmF5LmZyb20odGhpcy5lbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbShtYXRjaGVzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzTXV0YXRpb25zKG11dGF0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc011dGF0aW9uKG11dGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzTXV0YXRpb24obXV0YXRpb24pIHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0F0dHJpYnV0ZUNoYW5nZShtdXRhdGlvbi50YXJnZXQsIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG11dGF0aW9uLnR5cGUgPT0gXCJjaGlsZExpc3RcIikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVtb3ZlZE5vZGVzKG11dGF0aW9uLnJlbW92ZWROb2Rlcyk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NBZGRlZE5vZGVzKG11dGF0aW9uLmFkZGVkTm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NBdHRyaWJ1dGVDaGFuZ2Uobm9kZSwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXR0cmlidXRlQ2hhbmdlZCAmJiB0aGlzLm1hdGNoRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudEF0dHJpYnV0ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzUmVtb3ZlZE5vZGVzKG5vZGVzKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBBcnJheS5mcm9tKG5vZGVzKSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudEZyb21Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlKGVsZW1lbnQsIHRoaXMucmVtb3ZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc0FkZGVkTm9kZXMobm9kZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIEFycmF5LmZyb20obm9kZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50RnJvbU5vZGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAmJiB0aGlzLmVsZW1lbnRJc0FjdGl2ZShlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RyZWUoZWxlbWVudCwgdGhpcy5hZGRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5tYXRjaEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICAgIG1hdGNoRWxlbWVudHNJblRyZWUodHJlZSA9IHRoaXMuZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5tYXRjaEVsZW1lbnRzSW5UcmVlKHRyZWUpO1xuICAgIH1cbiAgICBwcm9jZXNzVHJlZSh0cmVlLCBwcm9jZXNzb3IpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubWF0Y2hFbGVtZW50c0luVHJlZSh0cmVlKSkge1xuICAgICAgICAgICAgcHJvY2Vzc29yLmNhbGwodGhpcywgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudEZyb21Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRJc0FjdGl2ZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmlzQ29ubmVjdGVkICE9IHRoaXMuZWxlbWVudC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jb250YWlucyhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudElzQWN0aXZlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5hZGQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5kZWxldGUoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBBdHRyaWJ1dGVPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlTmFtZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlciA9IG5ldyBFbGVtZW50T2JzZXJ2ZXIoZWxlbWVudCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gYFske3RoaXMuYXR0cmlidXRlTmFtZX1dYDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnBhdXNlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBzdGFydGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RhcnRlZDtcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cmlidXRlTmFtZSk7XG4gICAgfVxuICAgIG1hdGNoRWxlbWVudHNJblRyZWUodHJlZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMubWF0Y2hFbGVtZW50KHRyZWUpID8gW3RyZWVdIDogW107XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBBcnJheS5mcm9tKHRyZWUucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKSk7XG4gICAgICAgIHJldHVybiBtYXRjaC5jb25jYXQobWF0Y2hlcyk7XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudFVubWF0Y2hlZEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkQXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudEF0dHJpYnV0ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXR0cmlidXRlVmFsdWVDaGFuZ2VkICYmIHRoaXMuYXR0cmlidXRlTmFtZSA9PSBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRBdHRyaWJ1dGVWYWx1ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZChtYXAsIGtleSwgdmFsdWUpIHtcbiAgICBmZXRjaChtYXAsIGtleSkuYWRkKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGRlbChtYXAsIGtleSwgdmFsdWUpIHtcbiAgICBmZXRjaChtYXAsIGtleSkuZGVsZXRlKHZhbHVlKTtcbiAgICBwcnVuZShtYXAsIGtleSk7XG59XG5mdW5jdGlvbiBmZXRjaChtYXAsIGtleSkge1xuICAgIGxldCB2YWx1ZXMgPSBtYXAuZ2V0KGtleSk7XG4gICAgaWYgKCF2YWx1ZXMpIHtcbiAgICAgICAgdmFsdWVzID0gbmV3IFNldCgpO1xuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbn1cbmZ1bmN0aW9uIHBydW5lKG1hcCwga2V5KSB7XG4gICAgY29uc3QgdmFsdWVzID0gbWFwLmdldChrZXkpO1xuICAgIGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB2YWx1ZXMuc2l6ZSA9PSAwKSB7XG4gICAgICAgIG1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG59XG5cbmNsYXNzIE11bHRpbWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZXNCeUtleSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMudmFsdWVzQnlLZXkua2V5cygpKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgICAgY29uc3Qgc2V0cyA9IEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleS52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiBzZXRzLnJlZHVjZSgodmFsdWVzLCBzZXQpID0+IHZhbHVlcy5jb25jYXQoQXJyYXkuZnJvbShzZXQpKSwgW10pO1xuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgc2V0cyA9IEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleS52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiBzZXRzLnJlZHVjZSgoc2l6ZSwgc2V0KSA9PiBzaXplICsgc2V0LnNpemUsIDApO1xuICAgIH1cbiAgICBhZGQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBhZGQodGhpcy52YWx1ZXNCeUtleSwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIGRlbCh0aGlzLnZhbHVlc0J5S2V5LCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgaGFzKGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXNCeUtleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcyAhPSBudWxsICYmIHZhbHVlcy5oYXModmFsdWUpO1xuICAgIH1cbiAgICBoYXNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlc0J5S2V5LmhhcyhrZXkpO1xuICAgIH1cbiAgICBoYXNWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5LnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIHNldHMuc29tZSgoc2V0KSA9PiBzZXQuaGFzKHZhbHVlKSk7XG4gICAgfVxuICAgIGdldFZhbHVlc0ZvcktleShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXNCeUtleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcyA/IEFycmF5LmZyb20odmFsdWVzKSA6IFtdO1xuICAgIH1cbiAgICBnZXRLZXlzRm9yVmFsdWUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleSlcbiAgICAgICAgICAgIC5maWx0ZXIoKFtfa2V5LCB2YWx1ZXNdKSA9PiB2YWx1ZXMuaGFzKHZhbHVlKSlcbiAgICAgICAgICAgIC5tYXAoKFtrZXksIF92YWx1ZXNdKSA9PiBrZXkpO1xuICAgIH1cbn1cblxuY2xhc3MgSW5kZXhlZE11bHRpbWFwIGV4dGVuZHMgTXVsdGltYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmtleXNCeVZhbHVlID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmtleXNCeVZhbHVlLmtleXMoKSk7XG4gICAgfVxuICAgIGFkZChrZXksIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLmFkZChrZXksIHZhbHVlKTtcbiAgICAgICAgYWRkKHRoaXMua2V5c0J5VmFsdWUsIHZhbHVlLCBrZXkpO1xuICAgIH1cbiAgICBkZWxldGUoa2V5LCB2YWx1ZSkge1xuICAgICAgICBzdXBlci5kZWxldGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIGRlbCh0aGlzLmtleXNCeVZhbHVlLCB2YWx1ZSwga2V5KTtcbiAgICB9XG4gICAgaGFzVmFsdWUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c0J5VmFsdWUuaGFzKHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0S2V5c0ZvclZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNldCA9IHRoaXMua2V5c0J5VmFsdWUuZ2V0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHNldCA/IEFycmF5LmZyb20oc2V0KSA6IFtdO1xuICAgIH1cbn1cblxuY2xhc3MgU2VsZWN0b3JPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIGRlbGVnYXRlLCBkZXRhaWxzID0ge30pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlciA9IG5ldyBFbGVtZW50T2JzZXJ2ZXIoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5tYXRjaGVzQnlFbGVtZW50ID0gbmV3IE11bHRpbWFwKCk7XG4gICAgfVxuICAgIGdldCBzdGFydGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RhcnRlZDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnBhdXNlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuZWxlbWVudDtcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGVsZW1lbnQubWF0Y2hlcyh0aGlzLnNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc2VsZWN0b3JNYXRjaEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzICYmIHRoaXMuZGVsZWdhdGUuc2VsZWN0b3JNYXRjaEVsZW1lbnQoZWxlbWVudCwgdGhpcy5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50c0luVHJlZSh0cmVlKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5tYXRjaEVsZW1lbnQodHJlZSkgPyBbdHJlZV0gOiBbXTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IEFycmF5LmZyb20odHJlZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpKS5maWx0ZXIoKG1hdGNoKSA9PiB0aGlzLm1hdGNoRWxlbWVudChtYXRjaCkpO1xuICAgICAgICByZXR1cm4gbWF0Y2guY29uY2F0KG1hdGNoZXMpO1xuICAgIH1cbiAgICBlbGVtZW50TWF0Y2hlZChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JNYXRjaGVkKGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvclVubWF0Y2hlZChlbGVtZW50KTtcbiAgICB9XG4gICAgZWxlbWVudEF0dHJpYnV0ZUNoYW5nZWQoZWxlbWVudCwgX2F0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMubWF0Y2hFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBtYXRjaGVkQmVmb3JlID0gdGhpcy5tYXRjaGVzQnlFbGVtZW50Lmhhcyh0aGlzLnNlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgICAgaWYgKCFtYXRjaGVzICYmIG1hdGNoZWRCZWZvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3JVbm1hdGNoZWQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0b3JNYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc2VsZWN0b3JNYXRjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNlbGVjdG9yTWF0Y2hlZChlbGVtZW50LCB0aGlzLnNlbGVjdG9yLCB0aGlzLmRldGFpbHMpO1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVzQnlFbGVtZW50LmFkZCh0aGlzLnNlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RvclVubWF0Y2hlZChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuc2VsZWN0b3JVbm1hdGNoZWQoZWxlbWVudCwgdGhpcy5zZWxlY3RvciwgdGhpcy5kZXRhaWxzKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzQnlFbGVtZW50LmRlbGV0ZSh0aGlzLnNlbGVjdG9yLCBlbGVtZW50KTtcbiAgICB9XG59XG5cbmNsYXNzIFN0cmluZ01hcE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0cmluZ01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4gdGhpcy5wcm9jZXNzTXV0YXRpb25zKG11dGF0aW9ucykpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQsIHsgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUgfSk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZU5hbWUgb2YgdGhpcy5rbm93bkF0dHJpYnV0ZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NNdXRhdGlvbnMobXV0YXRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTXV0YXRpb24obXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NNdXRhdGlvbihtdXRhdGlvbikge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gbXV0YXRpb24uYXR0cmlidXRlTmFtZTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBtdXRhdGlvbi5vbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBvbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmRlbGVnYXRlLmdldFN0cmluZ01hcEtleUZvckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RyaW5nTWFwLmhhcyhhdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwS2V5QWRkZWQoa2V5LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0cmluZ01hcC5nZXQoYXR0cmlidXRlTmFtZSkgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmluZ01hcFZhbHVlQ2hhbmdlZCh2YWx1ZSwga2V5LCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5zdHJpbmdNYXAuZ2V0KGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwLmRlbGV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob2xkVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwLnNldChhdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5QWRkZWQoa2V5LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLnN0cmluZ01hcEtleUFkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnN0cmluZ01hcEtleUFkZGVkKGtleSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKHZhbHVlLCBrZXksIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLnN0cmluZ01hcFZhbHVlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zdHJpbmdNYXBWYWx1ZUNoYW5nZWQodmFsdWUsIGtleSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0cmluZ01hcEtleVJlbW92ZWQoa2V5LCBhdHRyaWJ1dGVOYW1lLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5zdHJpbmdNYXBLZXlSZW1vdmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnN0cmluZ01hcEtleVJlbW92ZWQoa2V5LCBhdHRyaWJ1dGVOYW1lLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGtub3duQXR0cmlidXRlTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodGhpcy5jdXJyZW50QXR0cmlidXRlTmFtZXMuY29uY2F0KHRoaXMucmVjb3JkZWRBdHRyaWJ1dGVOYW1lcykpKTtcbiAgICB9XG4gICAgZ2V0IGN1cnJlbnRBdHRyaWJ1dGVOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5lbGVtZW50LmF0dHJpYnV0ZXMpLm1hcCgoYXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUubmFtZSk7XG4gICAgfVxuICAgIGdldCByZWNvcmRlZEF0dHJpYnV0ZU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN0cmluZ01hcC5rZXlzKCkpO1xuICAgIH1cbn1cblxuY2xhc3MgVG9rZW5MaXN0T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIgPSBuZXcgQXR0cmlidXRlT2JzZXJ2ZXIoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy50b2tlbnNCeUVsZW1lbnQgPSBuZXcgTXVsdGltYXAoKTtcbiAgICB9XG4gICAgZ2V0IHN0YXJ0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0YXJ0ZWQ7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIucGF1c2UoY2FsbGJhY2spO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIuYXR0cmlidXRlTmFtZTtcbiAgICB9XG4gICAgZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnRva2Vuc01hdGNoZWQodGhpcy5yZWFkVG9rZW5zRm9yRWxlbWVudChlbGVtZW50KSk7XG4gICAgfVxuICAgIGVsZW1lbnRBdHRyaWJ1dGVWYWx1ZUNoYW5nZWQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBbdW5tYXRjaGVkVG9rZW5zLCBtYXRjaGVkVG9rZW5zXSA9IHRoaXMucmVmcmVzaFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIHRoaXMudG9rZW5zVW5tYXRjaGVkKHVubWF0Y2hlZFRva2Vucyk7XG4gICAgICAgIHRoaXMudG9rZW5zTWF0Y2hlZChtYXRjaGVkVG9rZW5zKTtcbiAgICB9XG4gICAgZWxlbWVudFVubWF0Y2hlZEF0dHJpYnV0ZShlbGVtZW50KSB7XG4gICAgICAgIHRoaXMudG9rZW5zVW5tYXRjaGVkKHRoaXMudG9rZW5zQnlFbGVtZW50LmdldFZhbHVlc0ZvcktleShlbGVtZW50KSk7XG4gICAgfVxuICAgIHRva2Vuc01hdGNoZWQodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4gdGhpcy50b2tlbk1hdGNoZWQodG9rZW4pKTtcbiAgICB9XG4gICAgdG9rZW5zVW5tYXRjaGVkKHRva2Vucykge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW4pID0+IHRoaXMudG9rZW5Vbm1hdGNoZWQodG9rZW4pKTtcbiAgICB9XG4gICAgdG9rZW5NYXRjaGVkKHRva2VuKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUudG9rZW5NYXRjaGVkKHRva2VuKTtcbiAgICAgICAgdGhpcy50b2tlbnNCeUVsZW1lbnQuYWRkKHRva2VuLmVsZW1lbnQsIHRva2VuKTtcbiAgICB9XG4gICAgdG9rZW5Vbm1hdGNoZWQodG9rZW4pIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS50b2tlblVubWF0Y2hlZCh0b2tlbik7XG4gICAgICAgIHRoaXMudG9rZW5zQnlFbGVtZW50LmRlbGV0ZSh0b2tlbi5lbGVtZW50LCB0b2tlbik7XG4gICAgfVxuICAgIHJlZnJlc2hUb2tlbnNGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUb2tlbnMgPSB0aGlzLnRva2Vuc0J5RWxlbWVudC5nZXRWYWx1ZXNGb3JLZXkoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2tlbnMgPSB0aGlzLnJlYWRUb2tlbnNGb3JFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBmaXJzdERpZmZlcmluZ0luZGV4ID0gemlwKHByZXZpb3VzVG9rZW5zLCBjdXJyZW50VG9rZW5zKS5maW5kSW5kZXgoKFtwcmV2aW91c1Rva2VuLCBjdXJyZW50VG9rZW5dKSA9PiAhdG9rZW5zQXJlRXF1YWwocHJldmlvdXNUb2tlbiwgY3VycmVudFRva2VuKSk7XG4gICAgICAgIGlmIChmaXJzdERpZmZlcmluZ0luZGV4ID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gW1tdLCBbXV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3ByZXZpb3VzVG9rZW5zLnNsaWNlKGZpcnN0RGlmZmVyaW5nSW5kZXgpLCBjdXJyZW50VG9rZW5zLnNsaWNlKGZpcnN0RGlmZmVyaW5nSW5kZXgpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWFkVG9rZW5zRm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLmF0dHJpYnV0ZU5hbWU7XG4gICAgICAgIGNvbnN0IHRva2VuU3RyaW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkgfHwgXCJcIjtcbiAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5TdHJpbmcodG9rZW5TdHJpbmcsIGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVG9rZW5TdHJpbmcodG9rZW5TdHJpbmcsIGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gdG9rZW5TdHJpbmdcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgICAuZmlsdGVyKChjb250ZW50KSA9PiBjb250ZW50Lmxlbmd0aClcbiAgICAgICAgLm1hcCgoY29udGVudCwgaW5kZXgpID0+ICh7IGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGNvbnRlbnQsIGluZGV4IH0pKTtcbn1cbmZ1bmN0aW9uIHppcChsZWZ0LCByaWdodCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KGxlZnQubGVuZ3RoLCByaWdodC5sZW5ndGgpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoIH0sIChfLCBpbmRleCkgPT4gW2xlZnRbaW5kZXhdLCByaWdodFtpbmRleF1dKTtcbn1cbmZ1bmN0aW9uIHRva2Vuc0FyZUVxdWFsKGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIGxlZnQgJiYgcmlnaHQgJiYgbGVmdC5pbmRleCA9PSByaWdodC5pbmRleCAmJiBsZWZ0LmNvbnRlbnQgPT0gcmlnaHQuY29udGVudDtcbn1cblxuY2xhc3MgVmFsdWVMaXN0T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIgPSBuZXcgVG9rZW5MaXN0T2JzZXJ2ZXIoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5wYXJzZVJlc3VsdHNCeVRva2VuID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgdGhpcy52YWx1ZXNCeVRva2VuQnlFbGVtZW50ID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgZ2V0IHN0YXJ0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnN0YXJ0ZWQ7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnJlZnJlc2goKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuTGlzdE9ic2VydmVyLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBhdHRyaWJ1dGVOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkxpc3RPYnNlcnZlci5hdHRyaWJ1dGVOYW1lO1xuICAgIH1cbiAgICB0b2tlbk1hdGNoZWQodG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBlbGVtZW50IH0gPSB0b2tlbjtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5mZXRjaFBhcnNlUmVzdWx0Rm9yVG9rZW4odG9rZW4pO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hWYWx1ZXNCeVRva2VuRm9yRWxlbWVudChlbGVtZW50KS5zZXQodG9rZW4sIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWRWYWx1ZShlbGVtZW50LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9rZW5Vbm1hdGNoZWQodG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBlbGVtZW50IH0gPSB0b2tlbjtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5mZXRjaFBhcnNlUmVzdWx0Rm9yVG9rZW4odG9rZW4pO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hWYWx1ZXNCeVRva2VuRm9yRWxlbWVudChlbGVtZW50KS5kZWxldGUodG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkVmFsdWUoZWxlbWVudCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZldGNoUGFyc2VSZXN1bHRGb3JUb2tlbih0b2tlbikge1xuICAgICAgICBsZXQgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlUmVzdWx0c0J5VG9rZW4uZ2V0KHRva2VuKTtcbiAgICAgICAgaWYgKCFwYXJzZVJlc3VsdCkge1xuICAgICAgICAgICAgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5wYXJzZVJlc3VsdHNCeVRva2VuLnNldCh0b2tlbiwgcGFyc2VSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZVJlc3VsdDtcbiAgICB9XG4gICAgZmV0Y2hWYWx1ZXNCeVRva2VuRm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGxldCB2YWx1ZXNCeVRva2VuID0gdGhpcy52YWx1ZXNCeVRva2VuQnlFbGVtZW50LmdldChlbGVtZW50KTtcbiAgICAgICAgaWYgKCF2YWx1ZXNCeVRva2VuKSB7XG4gICAgICAgICAgICB2YWx1ZXNCeVRva2VuID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNCeVRva2VuQnlFbGVtZW50LnNldChlbGVtZW50LCB2YWx1ZXNCeVRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzQnlUb2tlbjtcbiAgICB9XG4gICAgcGFyc2VUb2tlbih0b2tlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRlbGVnYXRlLnBhcnNlVmFsdWVGb3JUb2tlbih0b2tlbik7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQmluZGluZ09ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuYmluZGluZ3NCeUFjdGlvbiA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZUxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlciA9IG5ldyBWYWx1ZUxpc3RPYnNlcnZlcih0aGlzLmVsZW1lbnQsIHRoaXMuYWN0aW9uQXR0cmlidXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZUxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZUxpc3RPYnNlcnZlcjtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdEFsbEFjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgYWN0aW9uQXR0cmlidXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2hlbWEuYWN0aW9uQXR0cmlidXRlO1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGJpbmRpbmdzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmJpbmRpbmdzQnlBY3Rpb24udmFsdWVzKCkpO1xuICAgIH1cbiAgICBjb25uZWN0QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBjb25zdCBiaW5kaW5nID0gbmV3IEJpbmRpbmcodGhpcy5jb250ZXh0LCBhY3Rpb24pO1xuICAgICAgICB0aGlzLmJpbmRpbmdzQnlBY3Rpb24uc2V0KGFjdGlvbiwgYmluZGluZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYmluZGluZyA9IHRoaXMuYmluZGluZ3NCeUFjdGlvbi5nZXQoYWN0aW9uKTtcbiAgICAgICAgaWYgKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NCeUFjdGlvbi5kZWxldGUoYWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuYmluZGluZ0Rpc2Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0QWxsQWN0aW9ucygpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nKSA9PiB0aGlzLmRlbGVnYXRlLmJpbmRpbmdEaXNjb25uZWN0ZWQoYmluZGluZywgdHJ1ZSkpO1xuICAgICAgICB0aGlzLmJpbmRpbmdzQnlBY3Rpb24uY2xlYXIoKTtcbiAgICB9XG4gICAgcGFyc2VWYWx1ZUZvclRva2VuKHRva2VuKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IEFjdGlvbi5mb3JUb2tlbih0b2tlbiwgdGhpcy5zY2hlbWEpO1xuICAgICAgICBpZiAoYWN0aW9uLmlkZW50aWZpZXIgPT0gdGhpcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkVmFsdWUoZWxlbWVudCwgYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdEFjdGlvbihhY3Rpb24pO1xuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkVmFsdWUoZWxlbWVudCwgYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdEFjdGlvbihhY3Rpb24pO1xuICAgIH1cbn1cblxuY2xhc3MgVmFsdWVPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICB0aGlzLnN0cmluZ01hcE9ic2VydmVyID0gbmV3IFN0cmluZ01hcE9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVEZXNjcmlwdG9yTWFwID0gdGhpcy5jb250cm9sbGVyLnZhbHVlRGVzY3JpcHRvck1hcDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RyaW5nTWFwT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2tzRm9yRGVmYXVsdFZhbHVlcygpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnN0cmluZ01hcE9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gICAgZ2V0U3RyaW5nTWFwS2V5Rm9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgaW4gdGhpcy52YWx1ZURlc2NyaXB0b3JNYXApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlRGVzY3JpcHRvck1hcFthdHRyaWJ1dGVOYW1lXS5uYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0cmluZ01hcEtleUFkZGVkKGtleSwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JNYXBbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmICghdGhpcy5oYXNWYWx1ZShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhrZXksIGRlc2NyaXB0b3Iud3JpdGVyKHRoaXMucmVjZWl2ZXJba2V5XSksIGRlc2NyaXB0b3Iud3JpdGVyKGRlc2NyaXB0b3IuZGVmYXVsdFZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKHZhbHVlLCBuYW1lLCBvbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JOYW1lTWFwW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb2xkVmFsdWUgPSBkZXNjcmlwdG9yLndyaXRlcihkZXNjcmlwdG9yLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLnZhbHVlRGVzY3JpcHRvck5hbWVNYXBba2V5XTtcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2soa2V5LCBkZXNjcmlwdG9yLndyaXRlcih0aGlzLnJlY2VpdmVyW2tleV0pLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhrZXksIGRlc2NyaXB0b3Iud3JpdGVyKGRlc2NyaXB0b3IuZGVmYXVsdFZhbHVlKSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZUNoYW5nZWRDYWxsYmFja3NGb3JEZWZhdWx0VmFsdWVzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHsga2V5LCBuYW1lLCBkZWZhdWx0VmFsdWUsIHdyaXRlciB9IG9mIHRoaXMudmFsdWVEZXNjcmlwdG9ycykge1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPSB1bmRlZmluZWQgJiYgIXRoaXMuY29udHJvbGxlci5kYXRhLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgd3JpdGVyKGRlZmF1bHRWYWx1ZSksIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIHJhd1ZhbHVlLCByYXdPbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkTWV0aG9kTmFtZSA9IGAke25hbWV9Q2hhbmdlZGA7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRNZXRob2QgPSB0aGlzLnJlY2VpdmVyW2NoYW5nZWRNZXRob2ROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGFuZ2VkTWV0aG9kID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHRoaXMudmFsdWVEZXNjcmlwdG9yTmFtZU1hcFtuYW1lXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkZXNjcmlwdG9yLnJlYWRlcihyYXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gcmF3T2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHJhd09sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gZGVzY3JpcHRvci5yZWFkZXIocmF3T2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFuZ2VkTWV0aG9kLmNhbGwodGhpcy5yZWNlaXZlciwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gYFN0aW11bHVzIFZhbHVlIFwiJHt0aGlzLmNvbnRleHQuaWRlbnRpZmllcn0uJHtkZXNjcmlwdG9yLm5hbWV9XCIgLSAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHZhbHVlRGVzY3JpcHRvcnMoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWVEZXNjcmlwdG9yTWFwIH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWVEZXNjcmlwdG9yTWFwKS5tYXAoKGtleSkgPT4gdmFsdWVEZXNjcmlwdG9yTWFwW2tleV0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWVEZXNjcmlwdG9yTmFtZU1hcCgpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy52YWx1ZURlc2NyaXB0b3JNYXApLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHRoaXMudmFsdWVEZXNjcmlwdG9yTWFwW2tleV07XG4gICAgICAgICAgICBkZXNjcmlwdG9yc1tkZXNjcmlwdG9yLm5hbWVdID0gZGVzY3JpcHRvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgICB9XG4gICAgaGFzVmFsdWUoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JOYW1lTWFwW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBjb25zdCBoYXNNZXRob2ROYW1lID0gYGhhcyR7Y2FwaXRhbGl6ZShkZXNjcmlwdG9yLm5hbWUpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VpdmVyW2hhc01ldGhvZE5hbWVdO1xuICAgIH1cbn1cblxuY2xhc3MgVGFyZ2V0T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy50YXJnZXRzQnlOYW1lID0gbmV3IE11bHRpbWFwKCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIgPSBuZXcgVG9rZW5MaXN0T2JzZXJ2ZXIodGhpcy5lbGVtZW50LCB0aGlzLmF0dHJpYnV0ZU5hbWUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnRva2VuTGlzdE9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RBbGxUYXJnZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnN0b3AoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRva2VuTGlzdE9ic2VydmVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRva2VuTWF0Y2hlZCh7IGVsZW1lbnQsIGNvbnRlbnQ6IG5hbWUgfSkge1xuICAgICAgICBpZiAodGhpcy5zY29wZS5jb250YWluc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFRhcmdldChlbGVtZW50LCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2tlblVubWF0Y2hlZCh7IGVsZW1lbnQsIGNvbnRlbnQ6IG5hbWUgfSkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RUYXJnZXQoZWxlbWVudCwgbmFtZSk7XG4gICAgfVxuICAgIGNvbm5lY3RUYXJnZXQoZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy50YXJnZXRzQnlOYW1lLmhhcyhuYW1lLCBlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXRzQnlOYW1lLmFkZChuYW1lLCBlbGVtZW50KTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXVzZSgoKSA9PiB0aGlzLmRlbGVnYXRlLnRhcmdldENvbm5lY3RlZChlbGVtZW50LCBuYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdFRhcmdldChlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0c0J5TmFtZS5oYXMobmFtZSwgZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0c0J5TmFtZS5kZWxldGUobmFtZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnRva2VuTGlzdE9ic2VydmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF1c2UoKCkgPT4gdGhpcy5kZWxlZ2F0ZS50YXJnZXREaXNjb25uZWN0ZWQoZWxlbWVudCwgbmFtZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RBbGxUYXJnZXRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy50YXJnZXRzQnlOYW1lLmtleXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLnRhcmdldHNCeU5hbWUuZ2V0VmFsdWVzRm9yS2V5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0VGFyZ2V0KGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBhdHRyaWJ1dGVOYW1lKCkge1xuICAgICAgICByZXR1cm4gYGRhdGEtJHt0aGlzLmNvbnRleHQuaWRlbnRpZmllcn0tdGFyZ2V0YDtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjb3BlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVhZEluaGVyaXRhYmxlU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkge1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IGdldEFuY2VzdG9yc0ZvckNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhbmNlc3RvcnMucmVkdWNlKCh2YWx1ZXMsIGNvbnN0cnVjdG9yKSA9PiB7XG4gICAgICAgIGdldE93blN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUpLmZvckVhY2goKG5hbWUpID0+IHZhbHVlcy5hZGQobmFtZSkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIG5ldyBTZXQoKSkpO1xufVxuZnVuY3Rpb24gcmVhZEluaGVyaXRhYmxlU3RhdGljT2JqZWN0UGFpcnMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkge1xuICAgIGNvbnN0IGFuY2VzdG9ycyA9IGdldEFuY2VzdG9yc0ZvckNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKTtcbiAgICByZXR1cm4gYW5jZXN0b3JzLnJlZHVjZSgocGFpcnMsIGNvbnN0cnVjdG9yKSA9PiB7XG4gICAgICAgIHBhaXJzLnB1c2goLi4uZ2V0T3duU3RhdGljT2JqZWN0UGFpcnMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkpO1xuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSwgW10pO1xufVxuZnVuY3Rpb24gZ2V0QW5jZXN0b3JzRm9yQ29uc3RydWN0b3IoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBhbmNlc3RvcnMgPSBbXTtcbiAgICB3aGlsZSAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgYW5jZXN0b3JzLnB1c2goY29uc3RydWN0b3IpO1xuICAgICAgICBjb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHJldHVybiBhbmNlc3RvcnMucmV2ZXJzZSgpO1xufVxuZnVuY3Rpb24gZ2V0T3duU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkge1xuICAgIGNvbnN0IGRlZmluaXRpb24gPSBjb25zdHJ1Y3Rvcltwcm9wZXJ0eU5hbWVdO1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGRlZmluaXRpb24pID8gZGVmaW5pdGlvbiA6IFtdO1xufVxuZnVuY3Rpb24gZ2V0T3duU3RhdGljT2JqZWN0UGFpcnMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkge1xuICAgIGNvbnN0IGRlZmluaXRpb24gPSBjb25zdHJ1Y3Rvcltwcm9wZXJ0eU5hbWVdO1xuICAgIHJldHVybiBkZWZpbml0aW9uID8gT2JqZWN0LmtleXMoZGVmaW5pdGlvbikubWFwKChrZXkpID0+IFtrZXksIGRlZmluaXRpb25ba2V5XV0pIDogW107XG59XG5cbmNsYXNzIE91dGxldE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMub3V0bGV0c0J5TmFtZSA9IG5ldyBNdWx0aW1hcCgpO1xuICAgICAgICB0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lID0gbmV3IE11bHRpbWFwKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JPYnNlcnZlck1hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5vdXRsZXREZWZpbml0aW9ucy5mb3JFYWNoKChvdXRsZXROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yKG91dGxldE5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB7IG91dGxldE5hbWUgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLnNldChvdXRsZXROYW1lLCBuZXcgU2VsZWN0b3JPYnNlcnZlcihkb2N1bWVudC5ib2R5LCBzZWxlY3RvciwgdGhpcywgZGV0YWlscykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLmZvckVhY2goKG9ic2VydmVyKSA9PiBvYnNlcnZlci5zdGFydCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlcGVuZGVudENvbnRleHRzLmZvckVhY2goKGNvbnRleHQpID0+IGNvbnRleHQucmVmcmVzaCgpKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JPYnNlcnZlck1hcC5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0QWxsT3V0bGV0cygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLmZvckVhY2goKG9ic2VydmVyKSA9PiBvYnNlcnZlci5zdG9wKCkpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwLmZvckVhY2goKG9ic2VydmVyKSA9PiBvYnNlcnZlci5yZWZyZXNoKCkpO1xuICAgIH1cbiAgICBzZWxlY3Rvck1hdGNoZWQoZWxlbWVudCwgX3NlbGVjdG9yLCB7IG91dGxldE5hbWUgfSkge1xuICAgICAgICBjb25zdCBvdXRsZXQgPSB0aGlzLmdldE91dGxldChlbGVtZW50LCBvdXRsZXROYW1lKTtcbiAgICAgICAgaWYgKG91dGxldCkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0T3V0bGV0KG91dGxldCwgZWxlbWVudCwgb3V0bGV0TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0b3JVbm1hdGNoZWQoZWxlbWVudCwgX3NlbGVjdG9yLCB7IG91dGxldE5hbWUgfSkge1xuICAgICAgICBjb25zdCBvdXRsZXQgPSB0aGlzLmdldE91dGxldEZyb21NYXAoZWxlbWVudCwgb3V0bGV0TmFtZSk7XG4gICAgICAgIGlmIChvdXRsZXQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdE91dGxldChvdXRsZXQsIGVsZW1lbnQsIG91dGxldE5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdG9yTWF0Y2hFbGVtZW50KGVsZW1lbnQsIHsgb3V0bGV0TmFtZSB9KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5oYXNPdXRsZXQoZWxlbWVudCwgb3V0bGV0TmFtZSkgJiZcbiAgICAgICAgICAgIGVsZW1lbnQubWF0Y2hlcyhgWyR7dGhpcy5jb250ZXh0LmFwcGxpY2F0aW9uLnNjaGVtYS5jb250cm9sbGVyQXR0cmlidXRlfX49JHtvdXRsZXROYW1lfV1gKSk7XG4gICAgfVxuICAgIGNvbm5lY3RPdXRsZXQob3V0bGV0LCBlbGVtZW50LCBvdXRsZXROYW1lKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLm91dGxldEVsZW1lbnRzQnlOYW1lLmhhcyhvdXRsZXROYW1lLCBlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsZXRzQnlOYW1lLmFkZChvdXRsZXROYW1lLCBvdXRsZXQpO1xuICAgICAgICAgICAgdGhpcy5vdXRsZXRFbGVtZW50c0J5TmFtZS5hZGQob3V0bGV0TmFtZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnNlbGVjdG9yT2JzZXJ2ZXJNYXAuZ2V0KG91dGxldE5hbWUpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF1c2UoKCkgPT4gdGhpcy5kZWxlZ2F0ZS5vdXRsZXRDb25uZWN0ZWQob3V0bGV0LCBlbGVtZW50LCBvdXRsZXROYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdE91dGxldChvdXRsZXQsIGVsZW1lbnQsIG91dGxldE5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5vdXRsZXRFbGVtZW50c0J5TmFtZS5oYXMob3V0bGV0TmFtZSwgZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGV0c0J5TmFtZS5kZWxldGUob3V0bGV0TmFtZSwgb3V0bGV0KTtcbiAgICAgICAgICAgIHRoaXMub3V0bGV0RWxlbWVudHNCeU5hbWUuZGVsZXRlKG91dGxldE5hbWUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5zZWxlY3Rvck9ic2VydmVyTWFwXG4gICAgICAgICAgICAgICAgLmdldChvdXRsZXROYW1lKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhdXNlKCgpID0+IHRoaXMuZGVsZWdhdGUub3V0bGV0RGlzY29ubmVjdGVkKG91dGxldCwgZWxlbWVudCwgb3V0bGV0TmFtZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RBbGxPdXRsZXRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IG91dGxldE5hbWUgb2YgdGhpcy5vdXRsZXRFbGVtZW50c0J5TmFtZS5rZXlzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5vdXRsZXRFbGVtZW50c0J5TmFtZS5nZXRWYWx1ZXNGb3JLZXkob3V0bGV0TmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG91dGxldCBvZiB0aGlzLm91dGxldHNCeU5hbWUuZ2V0VmFsdWVzRm9yS2V5KG91dGxldE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdE91dGxldChvdXRsZXQsIGVsZW1lbnQsIG91dGxldE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RvcihvdXRsZXROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLm91dGxldHMuZ2V0U2VsZWN0b3JGb3JPdXRsZXROYW1lKG91dGxldE5hbWUpO1xuICAgIH1cbiAgICBnZXQgb3V0bGV0RGVwZW5kZW5jaWVzKCkge1xuICAgICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBuZXcgTXVsdGltYXAoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubW9kdWxlcy5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gbW9kdWxlLmRlZmluaXRpb24uY29udHJvbGxlckNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgY29uc3Qgb3V0bGV0cyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcIm91dGxldHNcIik7XG4gICAgICAgICAgICBvdXRsZXRzLmZvckVhY2goKG91dGxldCkgPT4gZGVwZW5kZW5jaWVzLmFkZChvdXRsZXQsIG1vZHVsZS5pZGVudGlmaWVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVwZW5kZW5jaWVzO1xuICAgIH1cbiAgICBnZXQgb3V0bGV0RGVmaW5pdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dGxldERlcGVuZGVuY2llcy5nZXRLZXlzRm9yVmFsdWUodGhpcy5pZGVudGlmaWVyKTtcbiAgICB9XG4gICAgZ2V0IGRlcGVuZGVudENvbnRyb2xsZXJJZGVudGlmaWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGV0RGVwZW5kZW5jaWVzLmdldFZhbHVlc0ZvcktleSh0aGlzLmlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBnZXQgZGVwZW5kZW50Q29udGV4dHMoKSB7XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXJzID0gdGhpcy5kZXBlbmRlbnRDb250cm9sbGVySWRlbnRpZmllcnM7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5jb250ZXh0cy5maWx0ZXIoKGNvbnRleHQpID0+IGlkZW50aWZpZXJzLmluY2x1ZGVzKGNvbnRleHQuaWRlbnRpZmllcikpO1xuICAgIH1cbiAgICBoYXNPdXRsZXQoZWxlbWVudCwgb3V0bGV0TmFtZSkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldE91dGxldChlbGVtZW50LCBvdXRsZXROYW1lKSB8fCAhIXRoaXMuZ2V0T3V0bGV0RnJvbU1hcChlbGVtZW50LCBvdXRsZXROYW1lKTtcbiAgICB9XG4gICAgZ2V0T3V0bGV0KGVsZW1lbnQsIG91dGxldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24uZ2V0Q29udHJvbGxlckZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIG91dGxldE5hbWUpO1xuICAgIH1cbiAgICBnZXRPdXRsZXRGcm9tTWFwKGVsZW1lbnQsIG91dGxldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0bGV0c0J5TmFtZS5nZXRWYWx1ZXNGb3JLZXkob3V0bGV0TmFtZSkuZmluZCgob3V0bGV0KSA9PiBvdXRsZXQuZWxlbWVudCA9PT0gZWxlbWVudCk7XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zY29wZTtcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFwcGxpY2F0aW9uO1xuICAgIH1cbiAgICBnZXQgcm91dGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5yb3V0ZXI7XG4gICAgfVxufVxuXG5jbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGUsIHNjb3BlKSB7XG4gICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eSA9IChmdW5jdGlvbk5hbWUsIGRldGFpbCA9IHt9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXIsIGVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgICAgICBkZXRhaWwgPSBPYmplY3QuYXNzaWduKHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCB9LCBkZXRhaWwpO1xuICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5sb2dEZWJ1Z0FjdGl2aXR5KHRoaXMuaWRlbnRpZmllciwgZnVuY3Rpb25OYW1lLCBkZXRhaWwpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgbW9kdWxlLmNvbnRyb2xsZXJDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nT2JzZXJ2ZXIgPSBuZXcgQmluZGluZ09ic2VydmVyKHRoaXMsIHRoaXMuZGlzcGF0Y2hlcik7XG4gICAgICAgIHRoaXMudmFsdWVPYnNlcnZlciA9IG5ldyBWYWx1ZU9ic2VydmVyKHRoaXMsIHRoaXMuY29udHJvbGxlcik7XG4gICAgICAgIHRoaXMudGFyZ2V0T2JzZXJ2ZXIgPSBuZXcgVGFyZ2V0T2JzZXJ2ZXIodGhpcywgdGhpcyk7XG4gICAgICAgIHRoaXMub3V0bGV0T2JzZXJ2ZXIgPSBuZXcgT3V0bGV0T2JzZXJ2ZXIodGhpcywgdGhpcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiaW5pdGlhbGl6ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIFwiaW5pdGlhbGl6aW5nIGNvbnRyb2xsZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy52YWx1ZU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMudGFyZ2V0T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5vdXRsZXRPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmNvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImNvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBcImNvbm5lY3RpbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm91dGxldE9ic2VydmVyLnJlZnJlc2goKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJkaXNjb25uZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgXCJkaXNjb25uZWN0aW5nIGNvbnRyb2xsZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdXRsZXRPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgIHRoaXMudGFyZ2V0T2JzZXJ2ZXIuc3RvcCgpO1xuICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZXIuc3RvcCgpO1xuICAgICAgICB0aGlzLmJpbmRpbmdPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIGdldCBhcHBsaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlLmFwcGxpY2F0aW9uO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLnNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGRpc3BhdGNoZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLmRpc3BhdGNoZXI7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgcGFyZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICBoYW5kbGVFcnJvcihlcnJvciwgbWVzc2FnZSwgZGV0YWlsID0ge30pIHtcbiAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBkZXRhaWwgPSBPYmplY3QuYXNzaWduKHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCB9LCBkZXRhaWwpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmhhbmRsZUVycm9yKGVycm9yLCBgRXJyb3IgJHttZXNzYWdlfWAsIGRldGFpbCk7XG4gICAgfVxuICAgIHRhcmdldENvbm5lY3RlZChlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHRoaXMuaW52b2tlQ29udHJvbGxlck1ldGhvZChgJHtuYW1lfVRhcmdldENvbm5lY3RlZGAsIGVsZW1lbnQpO1xuICAgIH1cbiAgICB0YXJnZXREaXNjb25uZWN0ZWQoZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB0aGlzLmludm9rZUNvbnRyb2xsZXJNZXRob2QoYCR7bmFtZX1UYXJnZXREaXNjb25uZWN0ZWRgLCBlbGVtZW50KTtcbiAgICB9XG4gICAgb3V0bGV0Q29ubmVjdGVkKG91dGxldCwgZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB0aGlzLmludm9rZUNvbnRyb2xsZXJNZXRob2QoYCR7bmFtZXNwYWNlQ2FtZWxpemUobmFtZSl9T3V0bGV0Q29ubmVjdGVkYCwgb3V0bGV0LCBlbGVtZW50KTtcbiAgICB9XG4gICAgb3V0bGV0RGlzY29ubmVjdGVkKG91dGxldCwgZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB0aGlzLmludm9rZUNvbnRyb2xsZXJNZXRob2QoYCR7bmFtZXNwYWNlQ2FtZWxpemUobmFtZSl9T3V0bGV0RGlzY29ubmVjdGVkYCwgb3V0bGV0LCBlbGVtZW50KTtcbiAgICB9XG4gICAgaW52b2tlQ29udHJvbGxlck1ldGhvZChtZXRob2ROYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmNvbnRyb2xsZXI7XG4gICAgICAgIGlmICh0eXBlb2YgY29udHJvbGxlclttZXRob2ROYW1lXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXJbbWV0aG9kTmFtZV0oLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJsZXNzKGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIHNoYWRvdyhjb25zdHJ1Y3RvciwgZ2V0Qmxlc3NlZFByb3BlcnRpZXMoY29uc3RydWN0b3IpKTtcbn1cbmZ1bmN0aW9uIHNoYWRvdyhjb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHNoYWRvd0NvbnN0cnVjdG9yID0gZXh0ZW5kKGNvbnN0cnVjdG9yKTtcbiAgICBjb25zdCBzaGFkb3dQcm9wZXJ0aWVzID0gZ2V0U2hhZG93UHJvcGVydGllcyhjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHNoYWRvd0NvbnN0cnVjdG9yLnByb3RvdHlwZSwgc2hhZG93UHJvcGVydGllcyk7XG4gICAgcmV0dXJuIHNoYWRvd0NvbnN0cnVjdG9yO1xufVxuZnVuY3Rpb24gZ2V0Qmxlc3NlZFByb3BlcnRpZXMoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBibGVzc2luZ3MgPSByZWFkSW5oZXJpdGFibGVTdGF0aWNBcnJheVZhbHVlcyhjb25zdHJ1Y3RvciwgXCJibGVzc2luZ3NcIik7XG4gICAgcmV0dXJuIGJsZXNzaW5ncy5yZWR1Y2UoKGJsZXNzZWRQcm9wZXJ0aWVzLCBibGVzc2luZykgPT4ge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYmxlc3NpbmcoY29uc3RydWN0b3IpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gYmxlc3NlZFByb3BlcnRpZXNba2V5XSB8fCB7fTtcbiAgICAgICAgICAgIGJsZXNzZWRQcm9wZXJ0aWVzW2tleV0gPSBPYmplY3QuYXNzaWduKGRlc2NyaXB0b3IsIHByb3BlcnRpZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsZXNzZWRQcm9wZXJ0aWVzO1xuICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIGdldFNoYWRvd1Byb3BlcnRpZXMocHJvdG90eXBlLCBwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIGdldE93bktleXMocHJvcGVydGllcykucmVkdWNlKChzaGFkb3dQcm9wZXJ0aWVzLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IGdldFNoYWRvd2VkRGVzY3JpcHRvcihwcm90b3R5cGUsIHByb3BlcnRpZXMsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHNoYWRvd1Byb3BlcnRpZXMsIHsgW2tleV06IGRlc2NyaXB0b3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYWRvd1Byb3BlcnRpZXM7XG4gICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0U2hhZG93ZWREZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvcGVydGllcywga2V5KSB7XG4gICAgY29uc3Qgc2hhZG93aW5nRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBrZXkpO1xuICAgIGNvbnN0IHNoYWRvd2VkQnlWYWx1ZSA9IHNoYWRvd2luZ0Rlc2NyaXB0b3IgJiYgXCJ2YWx1ZVwiIGluIHNoYWRvd2luZ0Rlc2NyaXB0b3I7XG4gICAgaWYgKCFzaGFkb3dlZEJ5VmFsdWUpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvcGVydGllcywga2V5KS52YWx1ZTtcbiAgICAgICAgaWYgKHNoYWRvd2luZ0Rlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gc2hhZG93aW5nRGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5nZXQ7XG4gICAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9IHNoYWRvd2luZ0Rlc2NyaXB0b3Iuc2V0IHx8IGRlc2NyaXB0b3Iuc2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH1cbn1cbmNvbnN0IGdldE93bktleXMgPSAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIChvYmplY3QpID0+IFsuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpLCAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCldO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICAgIH1cbn0pKCk7XG5jb25zdCBleHRlbmQgPSAoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGV4dGVuZFdpdGhSZWZsZWN0KGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KGNvbnN0cnVjdG9yLCBhcmd1bWVudHMsIG5ldy50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuZGVkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogZXh0ZW5kZWQgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIFJlZmxlY3Quc2V0UHJvdG90eXBlT2YoZXh0ZW5kZWQsIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0ZXN0UmVmbGVjdEV4dGVuc2lvbigpIHtcbiAgICAgICAgY29uc3QgYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYS5jYWxsKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBiID0gZXh0ZW5kV2l0aFJlZmxlY3QoYSk7XG4gICAgICAgIGIucHJvdG90eXBlLmEgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHJldHVybiBuZXcgYigpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB0ZXN0UmVmbGVjdEV4dGVuc2lvbigpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kV2l0aFJlZmxlY3Q7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gKGNvbnN0cnVjdG9yKSA9PiBjbGFzcyBleHRlbmRlZCBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5mdW5jdGlvbiBibGVzc0RlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkZW50aWZpZXI6IGRlZmluaXRpb24uaWRlbnRpZmllcixcbiAgICAgICAgY29udHJvbGxlckNvbnN0cnVjdG9yOiBibGVzcyhkZWZpbml0aW9uLmNvbnRyb2xsZXJDb25zdHJ1Y3RvciksXG4gICAgfTtcbn1cblxuY2xhc3MgTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbiwgZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvbiA9IGJsZXNzRGVmaW5pdGlvbihkZWZpbml0aW9uKTtcbiAgICAgICAgdGhpcy5jb250ZXh0c0J5U2NvcGUgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENvbnRleHRzID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbi5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uLmNvbnRyb2xsZXJDb25zdHJ1Y3RvcjtcbiAgICB9XG4gICAgZ2V0IGNvbnRleHRzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNvbm5lY3RlZENvbnRleHRzKTtcbiAgICB9XG4gICAgY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5mZXRjaENvbnRleHRGb3JTY29wZShzY29wZSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMuYWRkKGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmNvbm5lY3QoKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0c0J5U2NvcGUuZ2V0KHNjb3BlKTtcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMuZGVsZXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2hDb250ZXh0Rm9yU2NvcGUoc2NvcGUpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRzQnlTY29wZS5nZXQoc2NvcGUpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0aGlzLCBzY29wZSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRzQnlTY29wZS5zZXQoc2NvcGUsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cblxuY2xhc3MgQ2xhc3NNYXAge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgaGFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXModGhpcy5nZXREYXRhS2V5KG5hbWUpKTtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsKG5hbWUpWzBdO1xuICAgIH1cbiAgICBnZXRBbGwobmFtZSkge1xuICAgICAgICBjb25zdCB0b2tlblN0cmluZyA9IHRoaXMuZGF0YS5nZXQodGhpcy5nZXREYXRhS2V5KG5hbWUpKSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gdG9rZW5pemUodG9rZW5TdHJpbmcpO1xuICAgIH1cbiAgICBnZXRBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXRBdHRyaWJ1dGVOYW1lRm9yS2V5KHRoaXMuZ2V0RGF0YUtleShuYW1lKSk7XG4gICAgfVxuICAgIGdldERhdGFLZXkobmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7bmFtZX0tY2xhc3NgO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZGF0YTtcbiAgICB9XG59XG5cbmNsYXNzIERhdGFNYXAge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChrZXkpO1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBdHRyaWJ1dGVOYW1lRm9yS2V5KGtleSkge1xuICAgICAgICByZXR1cm4gYGRhdGEtJHt0aGlzLmlkZW50aWZpZXJ9LSR7ZGFzaGVyaXplKGtleSl9YDtcbiAgICB9XG59XG5cbmNsYXNzIEd1aWRlIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnZXIpIHtcbiAgICAgICAgdGhpcy53YXJuZWRLZXlzQnlPYmplY3QgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgd2FybihvYmplY3QsIGtleSwgbWVzc2FnZSkge1xuICAgICAgICBsZXQgd2FybmVkS2V5cyA9IHRoaXMud2FybmVkS2V5c0J5T2JqZWN0LmdldChvYmplY3QpO1xuICAgICAgICBpZiAoIXdhcm5lZEtleXMpIHtcbiAgICAgICAgICAgIHdhcm5lZEtleXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICB0aGlzLndhcm5lZEtleXNCeU9iamVjdC5zZXQob2JqZWN0LCB3YXJuZWRLZXlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXdhcm5lZEtleXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHdhcm5lZEtleXMuYWRkKGtleSk7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKG1lc3NhZ2UsIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVZhbHVlQ29udGFpbnNUb2tlbihhdHRyaWJ1dGVOYW1lLCB0b2tlbikge1xuICAgIHJldHVybiBgWyR7YXR0cmlidXRlTmFtZX1+PVwiJHt0b2tlbn1cIl1gO1xufVxuXG5jbGFzcyBUYXJnZXRTZXQge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5zY2hlbWE7XG4gICAgfVxuICAgIGhhcyh0YXJnZXROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQodGFyZ2V0TmFtZSkgIT0gbnVsbDtcbiAgICB9XG4gICAgZmluZCguLi50YXJnZXROYW1lcykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0TmFtZXMucmVkdWNlKCh0YXJnZXQsIHRhcmdldE5hbWUpID0+IHRhcmdldCB8fCB0aGlzLmZpbmRUYXJnZXQodGFyZ2V0TmFtZSkgfHwgdGhpcy5maW5kTGVnYWN5VGFyZ2V0KHRhcmdldE5hbWUpLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBmaW5kQWxsKC4uLnRhcmdldE5hbWVzKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXROYW1lcy5yZWR1Y2UoKHRhcmdldHMsIHRhcmdldE5hbWUpID0+IFtcbiAgICAgICAgICAgIC4uLnRhcmdldHMsXG4gICAgICAgICAgICAuLi50aGlzLmZpbmRBbGxUYXJnZXRzKHRhcmdldE5hbWUpLFxuICAgICAgICAgICAgLi4udGhpcy5maW5kQWxsTGVnYWN5VGFyZ2V0cyh0YXJnZXROYW1lKSxcbiAgICAgICAgXSwgW10pO1xuICAgIH1cbiAgICBmaW5kVGFyZ2V0KHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZmluZEVsZW1lbnQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBmaW5kQWxsVGFyZ2V0cyh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvckZvclRhcmdldE5hbWUodGFyZ2V0TmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmZpbmRBbGxFbGVtZW50cyhzZWxlY3Rvcik7XG4gICAgfVxuICAgIGdldFNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnNjaGVtYS50YXJnZXRBdHRyaWJ1dGVGb3JTY29wZSh0aGlzLmlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKGF0dHJpYnV0ZU5hbWUsIHRhcmdldE5hbWUpO1xuICAgIH1cbiAgICBmaW5kTGVnYWN5VGFyZ2V0KHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldExlZ2FjeVNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVwcmVjYXRlKHRoaXMuc2NvcGUuZmluZEVsZW1lbnQoc2VsZWN0b3IpLCB0YXJnZXROYW1lKTtcbiAgICB9XG4gICAgZmluZEFsbExlZ2FjeVRhcmdldHModGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0TGVnYWN5U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5maW5kQWxsRWxlbWVudHMoc2VsZWN0b3IpLm1hcCgoZWxlbWVudCkgPT4gdGhpcy5kZXByZWNhdGUoZWxlbWVudCwgdGFyZ2V0TmFtZSkpO1xuICAgIH1cbiAgICBnZXRMZWdhY3lTZWxlY3RvckZvclRhcmdldE5hbWUodGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCB0YXJnZXREZXNjcmlwdG9yID0gYCR7dGhpcy5pZGVudGlmaWVyfS4ke3RhcmdldE5hbWV9YDtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlQ29udGFpbnNUb2tlbih0aGlzLnNjaGVtYS50YXJnZXRBdHRyaWJ1dGUsIHRhcmdldERlc2NyaXB0b3IpO1xuICAgIH1cbiAgICBkZXByZWNhdGUoZWxlbWVudCwgdGFyZ2V0TmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgeyBpZGVudGlmaWVyIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHRoaXMuc2NoZW1hLnRhcmdldEF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGNvbnN0IHJldmlzZWRBdHRyaWJ1dGVOYW1lID0gdGhpcy5zY2hlbWEudGFyZ2V0QXR0cmlidXRlRm9yU2NvcGUoaWRlbnRpZmllcik7XG4gICAgICAgICAgICB0aGlzLmd1aWRlLndhcm4oZWxlbWVudCwgYHRhcmdldDoke3RhcmdldE5hbWV9YCwgYFBsZWFzZSByZXBsYWNlICR7YXR0cmlidXRlTmFtZX09XCIke2lkZW50aWZpZXJ9LiR7dGFyZ2V0TmFtZX1cIiB3aXRoICR7cmV2aXNlZEF0dHJpYnV0ZU5hbWV9PVwiJHt0YXJnZXROYW1lfVwiLiBgICtcbiAgICAgICAgICAgICAgICBgVGhlICR7YXR0cmlidXRlTmFtZX0gYXR0cmlidXRlIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uIG9mIFN0aW11bHVzLmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICBnZXQgZ3VpZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmd1aWRlO1xuICAgIH1cbn1cblxuY2xhc3MgT3V0bGV0U2V0IHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZSwgY29udHJvbGxlckVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJFbGVtZW50ID0gY29udHJvbGxlckVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZ2V0IHNjaGVtYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuc2NoZW1hO1xuICAgIH1cbiAgICBoYXMob3V0bGV0TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKG91dGxldE5hbWUpICE9IG51bGw7XG4gICAgfVxuICAgIGZpbmQoLi4ub3V0bGV0TmFtZXMpIHtcbiAgICAgICAgcmV0dXJuIG91dGxldE5hbWVzLnJlZHVjZSgob3V0bGV0LCBvdXRsZXROYW1lKSA9PiBvdXRsZXQgfHwgdGhpcy5maW5kT3V0bGV0KG91dGxldE5hbWUpLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBmaW5kQWxsKC4uLm91dGxldE5hbWVzKSB7XG4gICAgICAgIHJldHVybiBvdXRsZXROYW1lcy5yZWR1Y2UoKG91dGxldHMsIG91dGxldE5hbWUpID0+IFsuLi5vdXRsZXRzLCAuLi50aGlzLmZpbmRBbGxPdXRsZXRzKG91dGxldE5hbWUpXSwgW10pO1xuICAgIH1cbiAgICBnZXRTZWxlY3RvckZvck91dGxldE5hbWUob3V0bGV0TmFtZSkge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gdGhpcy5zY2hlbWEub3V0bGV0QXR0cmlidXRlRm9yU2NvcGUodGhpcy5pZGVudGlmaWVyLCBvdXRsZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlckVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgIH1cbiAgICBmaW5kT3V0bGV0KG91dGxldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yRm9yT3V0bGV0TmFtZShvdXRsZXROYW1lKTtcbiAgICAgICAgaWYgKHNlbGVjdG9yKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEVsZW1lbnQoc2VsZWN0b3IsIG91dGxldE5hbWUpO1xuICAgIH1cbiAgICBmaW5kQWxsT3V0bGV0cyhvdXRsZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvckZvck91dGxldE5hbWUob3V0bGV0TmFtZSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RvciA/IHRoaXMuZmluZEFsbEVsZW1lbnRzKHNlbGVjdG9yLCBvdXRsZXROYW1lKSA6IFtdO1xuICAgIH1cbiAgICBmaW5kRWxlbWVudChzZWxlY3Rvciwgb3V0bGV0TmFtZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuc2NvcGUucXVlcnlFbGVtZW50cyhzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBlbGVtZW50cy5maWx0ZXIoKGVsZW1lbnQpID0+IHRoaXMubWF0Y2hlc0VsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IsIG91dGxldE5hbWUpKVswXTtcbiAgICB9XG4gICAgZmluZEFsbEVsZW1lbnRzKHNlbGVjdG9yLCBvdXRsZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5zY29wZS5xdWVyeUVsZW1lbnRzKHNlbGVjdG9yKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLmZpbHRlcigoZWxlbWVudCkgPT4gdGhpcy5tYXRjaGVzRWxlbWVudChlbGVtZW50LCBzZWxlY3Rvciwgb3V0bGV0TmFtZSkpO1xuICAgIH1cbiAgICBtYXRjaGVzRWxlbWVudChlbGVtZW50LCBzZWxlY3Rvciwgb3V0bGV0TmFtZSkge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyQXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUodGhpcy5zY29wZS5zY2hlbWEuY29udHJvbGxlckF0dHJpYnV0ZSkgfHwgXCJcIjtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgJiYgY29udHJvbGxlckF0dHJpYnV0ZS5zcGxpdChcIiBcIikuaW5jbHVkZXMob3V0bGV0TmFtZSk7XG4gICAgfVxufVxuXG5jbGFzcyBTY29wZSB7XG4gICAgY29uc3RydWN0b3Ioc2NoZW1hLCBlbGVtZW50LCBpZGVudGlmaWVyLCBsb2dnZXIpIHtcbiAgICAgICAgdGhpcy50YXJnZXRzID0gbmV3IFRhcmdldFNldCh0aGlzKTtcbiAgICAgICAgdGhpcy5jbGFzc2VzID0gbmV3IENsYXNzTWFwKHRoaXMpO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hcCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb250YWluc0VsZW1lbnQgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdCh0aGlzLmNvbnRyb2xsZXJTZWxlY3RvcikgPT09IHRoaXMuZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMuZ3VpZGUgPSBuZXcgR3VpZGUobG9nZ2VyKTtcbiAgICAgICAgdGhpcy5vdXRsZXRzID0gbmV3IE91dGxldFNldCh0aGlzLmRvY3VtZW50U2NvcGUsIGVsZW1lbnQpO1xuICAgIH1cbiAgICBmaW5kRWxlbWVudChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpID8gdGhpcy5lbGVtZW50IDogdGhpcy5xdWVyeUVsZW1lbnRzKHNlbGVjdG9yKS5maW5kKHRoaXMuY29udGFpbnNFbGVtZW50KTtcbiAgICB9XG4gICAgZmluZEFsbEVsZW1lbnRzKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi4odGhpcy5lbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpID8gW3RoaXMuZWxlbWVudF0gOiBbXSksXG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpLmZpbHRlcih0aGlzLmNvbnRhaW5zRWxlbWVudCksXG4gICAgICAgIF07XG4gICAgfVxuICAgIHF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXJTZWxlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlQ29udGFpbnNUb2tlbih0aGlzLnNjaGVtYS5jb250cm9sbGVyQXR0cmlidXRlLCB0aGlzLmlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBnZXQgaXNEb2N1bWVudFNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBkb2N1bWVudFNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0RvY3VtZW50U2NvcGVcbiAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgOiBuZXcgU2NvcGUodGhpcy5zY2hlbWEsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy5pZGVudGlmaWVyLCB0aGlzLmd1aWRlLmxvZ2dlcik7XG4gICAgfVxufVxuXG5jbGFzcyBTY29wZU9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzY2hlbWEsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIgPSBuZXcgVmFsdWVMaXN0T2JzZXJ2ZXIodGhpcy5lbGVtZW50LCB0aGlzLmNvbnRyb2xsZXJBdHRyaWJ1dGUsIHRoaXMpO1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllckJ5RWxlbWVudCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHRoaXMuc2NvcGVSZWZlcmVuY2VDb3VudHMgPSBuZXcgV2Vha01hcCgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlci5zdGFydCgpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnZhbHVlTGlzdE9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXJBdHRyaWJ1dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVtYS5jb250cm9sbGVyQXR0cmlidXRlO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlRm9yVG9rZW4odG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBlbGVtZW50LCBjb250ZW50OiBpZGVudGlmaWVyIH0gPSB0b2tlbjtcbiAgICAgICAgY29uc3Qgc2NvcGVzQnlJZGVudGlmaWVyID0gdGhpcy5mZXRjaFNjb3Blc0J5SWRlbnRpZmllckZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGxldCBzY29wZSA9IHNjb3Blc0J5SWRlbnRpZmllci5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3BlID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVTY29wZUZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgc2NvcGVzQnlJZGVudGlmaWVyLnNldChpZGVudGlmaWVyLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjb3BlO1xuICAgIH1cbiAgICBlbGVtZW50TWF0Y2hlZFZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZUNvdW50ID0gKHRoaXMuc2NvcGVSZWZlcmVuY2VDb3VudHMuZ2V0KHZhbHVlKSB8fCAwKSArIDE7XG4gICAgICAgIHRoaXMuc2NvcGVSZWZlcmVuY2VDb3VudHMuc2V0KHZhbHVlLCByZWZlcmVuY2VDb3VudCk7XG4gICAgICAgIGlmIChyZWZlcmVuY2VDb3VudCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNjb3BlQ29ubmVjdGVkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQ291bnQgPSB0aGlzLnNjb3BlUmVmZXJlbmNlQ291bnRzLmdldCh2YWx1ZSk7XG4gICAgICAgIGlmIChyZWZlcmVuY2VDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cy5zZXQodmFsdWUsIHJlZmVyZW5jZUNvdW50IC0gMSk7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlQ291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc2NvcGVEaXNjb25uZWN0ZWQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZldGNoU2NvcGVzQnlJZGVudGlmaWVyRm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGxldCBzY29wZXNCeUlkZW50aWZpZXIgPSB0aGlzLnNjb3Blc0J5SWRlbnRpZmllckJ5RWxlbWVudC5nZXQoZWxlbWVudCk7XG4gICAgICAgIGlmICghc2NvcGVzQnlJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBzY29wZXNCeUlkZW50aWZpZXIgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllckJ5RWxlbWVudC5zZXQoZWxlbWVudCwgc2NvcGVzQnlJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2NvcGVzQnlJZGVudGlmaWVyO1xuICAgIH1cbn1cblxuY2xhc3MgUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuc2NvcGVPYnNlcnZlciA9IG5ldyBTY29wZU9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcy5zY2hlbWEsIHRoaXMpO1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllciA9IG5ldyBNdWx0aW1hcCgpO1xuICAgICAgICB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5zY2hlbWE7XG4gICAgfVxuICAgIGdldCBsb2dnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLmxvZ2dlcjtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXJBdHRyaWJ1dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVtYS5jb250cm9sbGVyQXR0cmlidXRlO1xuICAgIH1cbiAgICBnZXQgbW9kdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLnZhbHVlcygpKTtcbiAgICB9XG4gICAgZ2V0IGNvbnRleHRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLnJlZHVjZSgoY29udGV4dHMsIG1vZHVsZSkgPT4gY29udGV4dHMuY29uY2F0KG1vZHVsZS5jb250ZXh0cyksIFtdKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2NvcGVPYnNlcnZlci5zdGFydCgpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnNjb3BlT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICBsb2FkRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMudW5sb2FkSWRlbnRpZmllcihkZWZpbml0aW9uLmlkZW50aWZpZXIpO1xuICAgICAgICBjb25zdCBtb2R1bGUgPSBuZXcgTW9kdWxlKHRoaXMuYXBwbGljYXRpb24sIGRlZmluaXRpb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3RNb2R1bGUobW9kdWxlKTtcbiAgICAgICAgY29uc3QgYWZ0ZXJMb2FkID0gZGVmaW5pdGlvbi5jb250cm9sbGVyQ29uc3RydWN0b3IuYWZ0ZXJMb2FkO1xuICAgICAgICBpZiAoYWZ0ZXJMb2FkKSB7XG4gICAgICAgICAgICBhZnRlckxvYWQoZGVmaW5pdGlvbi5pZGVudGlmaWVyLCB0aGlzLmFwcGxpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bmxvYWRJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0TW9kdWxlKG1vZHVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q29udGV4dEZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5jb250ZXh0cy5maW5kKChjb250ZXh0KSA9PiBjb250ZXh0LmVsZW1lbnQgPT0gZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGRldGFpbCkge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwpO1xuICAgIH1cbiAgICBjcmVhdGVTY29wZUZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTY29wZSh0aGlzLnNjaGVtYSwgZWxlbWVudCwgaWRlbnRpZmllciwgdGhpcy5sb2dnZXIpO1xuICAgIH1cbiAgICBzY29wZUNvbm5lY3RlZChzY29wZSkge1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllci5hZGQoc2NvcGUuaWRlbnRpZmllciwgc2NvcGUpO1xuICAgICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZ2V0KHNjb3BlLmlkZW50aWZpZXIpO1xuICAgICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgICAgICBtb2R1bGUuY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NvcGVEaXNjb25uZWN0ZWQoc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZXNCeUlkZW50aWZpZXIuZGVsZXRlKHNjb3BlLmlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChzY29wZS5pZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgbW9kdWxlLmRpc2Nvbm5lY3RDb250ZXh0Rm9yU2NvcGUoc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbm5lY3RNb2R1bGUobW9kdWxlKSB7XG4gICAgICAgIHRoaXMubW9kdWxlc0J5SWRlbnRpZmllci5zZXQobW9kdWxlLmlkZW50aWZpZXIsIG1vZHVsZSk7XG4gICAgICAgIGNvbnN0IHNjb3BlcyA9IHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyLmdldFZhbHVlc0ZvcktleShtb2R1bGUuaWRlbnRpZmllcik7XG4gICAgICAgIHNjb3Blcy5mb3JFYWNoKChzY29wZSkgPT4gbW9kdWxlLmNvbm5lY3RDb250ZXh0Rm9yU2NvcGUoc2NvcGUpKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdE1vZHVsZShtb2R1bGUpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmRlbGV0ZShtb2R1bGUuaWRlbnRpZmllcik7XG4gICAgICAgIGNvbnN0IHNjb3BlcyA9IHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyLmdldFZhbHVlc0ZvcktleShtb2R1bGUuaWRlbnRpZmllcik7XG4gICAgICAgIHNjb3Blcy5mb3JFYWNoKChzY29wZSkgPT4gbW9kdWxlLmRpc2Nvbm5lY3RDb250ZXh0Rm9yU2NvcGUoc2NvcGUpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRTY2hlbWEgPSB7XG4gICAgY29udHJvbGxlckF0dHJpYnV0ZTogXCJkYXRhLWNvbnRyb2xsZXJcIixcbiAgICBhY3Rpb25BdHRyaWJ1dGU6IFwiZGF0YS1hY3Rpb25cIixcbiAgICB0YXJnZXRBdHRyaWJ1dGU6IFwiZGF0YS10YXJnZXRcIixcbiAgICB0YXJnZXRBdHRyaWJ1dGVGb3JTY29wZTogKGlkZW50aWZpZXIpID0+IGBkYXRhLSR7aWRlbnRpZmllcn0tdGFyZ2V0YCxcbiAgICBvdXRsZXRBdHRyaWJ1dGVGb3JTY29wZTogKGlkZW50aWZpZXIsIG91dGxldCkgPT4gYGRhdGEtJHtpZGVudGlmaWVyfS0ke291dGxldH0tb3V0bGV0YCxcbiAgICBrZXlNYXBwaW5nczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgZW50ZXI6IFwiRW50ZXJcIiwgdGFiOiBcIlRhYlwiLCBlc2M6IFwiRXNjYXBlXCIsIHNwYWNlOiBcIiBcIiwgdXA6IFwiQXJyb3dVcFwiLCBkb3duOiBcIkFycm93RG93blwiLCBsZWZ0OiBcIkFycm93TGVmdFwiLCByaWdodDogXCJBcnJvd1JpZ2h0XCIsIGhvbWU6IFwiSG9tZVwiLCBlbmQ6IFwiRW5kXCIgfSwgb2JqZWN0RnJvbUVudHJpZXMoXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLnNwbGl0KFwiXCIpLm1hcCgoYykgPT4gW2MsIGNdKSkpLCBvYmplY3RGcm9tRW50cmllcyhcIjAxMjM0NTY3ODlcIi5zcGxpdChcIlwiKS5tYXAoKG4pID0+IFtuLCBuXSkpKSxcbn07XG5mdW5jdGlvbiBvYmplY3RGcm9tRW50cmllcyhhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKG1lbW8sIFtrLCB2XSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWVtbyksIHsgW2tdOiB2IH0pKSwge30pO1xufVxuXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgc2NoZW1hID0gZGVmYXVsdFNjaGVtYSkge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGNvbnNvbGU7XG4gICAgICAgIHRoaXMuZGVidWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5ID0gKGlkZW50aWZpZXIsIGZ1bmN0aW9uTmFtZSwgZGV0YWlsID0ge30pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dGb3JtYXR0ZWRNZXNzYWdlKGlkZW50aWZpZXIsIGZ1bmN0aW9uTmFtZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKHRoaXMpO1xuICAgICAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuYWN0aW9uRGVzY3JpcHRvckZpbHRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0QWN0aW9uRGVzY3JpcHRvckZpbHRlcnMpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RhcnQoZWxlbWVudCwgc2NoZW1hKSB7XG4gICAgICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gbmV3IHRoaXMoZWxlbWVudCwgc2NoZW1hKTtcbiAgICAgICAgYXBwbGljYXRpb24uc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uO1xuICAgIH1cbiAgICBhc3luYyBzdGFydCgpIHtcbiAgICAgICAgYXdhaXQgZG9tUmVhZHkoKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdGFydGluZ1wiKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMucm91dGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImFwcGxpY2F0aW9uXCIsIFwic3RhcnRcIik7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImFwcGxpY2F0aW9uXCIsIFwic3RvcHBpbmdcIik7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlci5zdG9wKCk7XG4gICAgICAgIHRoaXMucm91dGVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdG9wXCIpO1xuICAgIH1cbiAgICByZWdpc3RlcihpZGVudGlmaWVyLCBjb250cm9sbGVyQ29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5sb2FkKHsgaWRlbnRpZmllciwgY29udHJvbGxlckNvbnN0cnVjdG9yIH0pO1xuICAgIH1cbiAgICByZWdpc3RlckFjdGlvbk9wdGlvbihuYW1lLCBmaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25EZXNjcmlwdG9yRmlsdGVyc1tuYW1lXSA9IGZpbHRlcjtcbiAgICB9XG4gICAgbG9hZChoZWFkLCAuLi5yZXN0KSB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gQXJyYXkuaXNBcnJheShoZWFkKSA/IGhlYWQgOiBbaGVhZCwgLi4ucmVzdF07XG4gICAgICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLmNvbnRyb2xsZXJDb25zdHJ1Y3Rvci5zaG91bGRMb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubG9hZERlZmluaXRpb24oZGVmaW5pdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1bmxvYWQoaGVhZCwgLi4ucmVzdCkge1xuICAgICAgICBjb25zdCBpZGVudGlmaWVycyA9IEFycmF5LmlzQXJyYXkoaGVhZCkgPyBoZWFkIDogW2hlYWQsIC4uLnJlc3RdO1xuICAgICAgICBpZGVudGlmaWVycy5mb3JFYWNoKChpZGVudGlmaWVyKSA9PiB0aGlzLnJvdXRlci51bmxvYWRJZGVudGlmaWVyKGlkZW50aWZpZXIpKTtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY29udGV4dHMubWFwKChjb250ZXh0KSA9PiBjb250ZXh0LmNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBnZXRDb250cm9sbGVyRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5yb3V0ZXIuZ2V0Q29udGV4dEZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQuY29udHJvbGxlciA6IG51bGw7XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgJXNcXG5cXG4lb1xcblxcbiVvYCwgbWVzc2FnZSwgZXJyb3IsIGRldGFpbCk7XG4gICAgICAgIChfYSA9IHdpbmRvdy5vbmVycm9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh3aW5kb3csIG1lc3NhZ2UsIFwiXCIsIDAsIDAsIGVycm9yKTtcbiAgICB9XG4gICAgbG9nRm9ybWF0dGVkTWVzc2FnZShpZGVudGlmaWVyLCBmdW5jdGlvbk5hbWUsIGRldGFpbCA9IHt9KSB7XG4gICAgICAgIGRldGFpbCA9IE9iamVjdC5hc3NpZ24oeyBhcHBsaWNhdGlvbjogdGhpcyB9LCBkZXRhaWwpO1xuICAgICAgICB0aGlzLmxvZ2dlci5ncm91cENvbGxhcHNlZChgJHtpZGVudGlmaWVyfSAjJHtmdW5jdGlvbk5hbWV9YCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhcImRldGFpbHM6XCIsIE9iamVjdC5hc3NpZ24oe30sIGRldGFpbCkpO1xuICAgICAgICB0aGlzLmxvZ2dlci5ncm91cEVuZCgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRvbVJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImxvYWRpbmdcIikge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBDbGFzc1Byb3BlcnRpZXNCbGVzc2luZyhjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGNsYXNzZXMgPSByZWFkSW5oZXJpdGFibGVTdGF0aWNBcnJheVZhbHVlcyhjb25zdHJ1Y3RvciwgXCJjbGFzc2VzXCIpO1xuICAgIHJldHVybiBjbGFzc2VzLnJlZHVjZSgocHJvcGVydGllcywgY2xhc3NEZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BlcnRpZXNGb3JDbGFzc0RlZmluaXRpb24oY2xhc3NEZWZpbml0aW9uKSk7XG4gICAgfSwge30pO1xufVxuZnVuY3Rpb24gcHJvcGVydGllc0ZvckNsYXNzRGVmaW5pdGlvbihrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBbYCR7a2V5fUNsYXNzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzZXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBjbGFzc2VzLmdldEF0dHJpYnV0ZU5hbWUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIGF0dHJpYnV0ZSBcIiR7YXR0cmlidXRlfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2Ake2tleX1DbGFzc2VzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmdldEFsbChrZXkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2BoYXMke2NhcGl0YWxpemUoa2V5KX1DbGFzc2BdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5oYXMoa2V5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gT3V0bGV0UHJvcGVydGllc0JsZXNzaW5nKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3Qgb3V0bGV0cyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcIm91dGxldHNcIik7XG4gICAgcmV0dXJuIG91dGxldHMucmVkdWNlKChwcm9wZXJ0aWVzLCBvdXRsZXREZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BlcnRpZXNGb3JPdXRsZXREZWZpbml0aW9uKG91dGxldERlZmluaXRpb24pKTtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBwcm9wZXJ0aWVzRm9yT3V0bGV0RGVmaW5pdGlvbihuYW1lKSB7XG4gICAgY29uc3QgY2FtZWxpemVkTmFtZSA9IG5hbWVzcGFjZUNhbWVsaXplKG5hbWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIFtgJHtjYW1lbGl6ZWROYW1lfU91dGxldGBdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0bGV0ID0gdGhpcy5vdXRsZXRzLmZpbmQobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG91dGxldCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdXRsZXRDb250cm9sbGVyID0gdGhpcy5hcHBsaWNhdGlvbi5nZXRDb250cm9sbGVyRm9yRWxlbWVudEFuZElkZW50aWZpZXIob3V0bGV0LCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dGxldENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRsZXRDb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIFwiZGF0YS1jb250cm9sbGVyPSR7bmFtZX1cIiBhdHRyaWJ1dGUgb24gb3V0bGV0IGVsZW1lbnQgZm9yIFwiJHt0aGlzLmlkZW50aWZpZXJ9XCIgY29udHJvbGxlcmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBvdXRsZXQgZWxlbWVudCBcIiR7bmFtZX1cIiBmb3IgXCIke3RoaXMuaWRlbnRpZmllcn1cIiBjb250cm9sbGVyYCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYCR7Y2FtZWxpemVkTmFtZX1PdXRsZXRzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRsZXRzID0gdGhpcy5vdXRsZXRzLmZpbmRBbGwobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG91dGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0bGV0c1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob3V0bGV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5hcHBsaWNhdGlvbi5nZXRDb250cm9sbGVyRm9yRWxlbWVudEFuZElkZW50aWZpZXIob3V0bGV0LCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBwcm92aWRlZCBvdXRsZXQgZWxlbWVudCBpcyBtaXNzaW5nIHRoZSBvdXRsZXQgY29udHJvbGxlciBcIiR7bmFtZX1cIiBmb3IgXCIke3RoaXMuaWRlbnRpZmllcn1cImAsIG91dGxldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChjb250cm9sbGVyKSA9PiBjb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2Ake2NhbWVsaXplZE5hbWV9T3V0bGV0RWxlbWVudGBdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0bGV0ID0gdGhpcy5vdXRsZXRzLmZpbmQobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG91dGxldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0bGV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG91dGxldCBlbGVtZW50IFwiJHtuYW1lfVwiIGZvciBcIiR7dGhpcy5pZGVudGlmaWVyfVwiIGNvbnRyb2xsZXJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYCR7Y2FtZWxpemVkTmFtZX1PdXRsZXRFbGVtZW50c2BdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0bGV0cy5maW5kQWxsKG5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2BoYXMke2NhcGl0YWxpemUoY2FtZWxpemVkTmFtZSl9T3V0bGV0YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdXRsZXRzLmhhcyhuYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gVGFyZ2V0UHJvcGVydGllc0JsZXNzaW5nKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcInRhcmdldHNcIik7XG4gICAgcmV0dXJuIHRhcmdldHMucmVkdWNlKChwcm9wZXJ0aWVzLCB0YXJnZXREZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BlcnRpZXNGb3JUYXJnZXREZWZpbml0aW9uKHRhcmdldERlZmluaXRpb24pKTtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBwcm9wZXJ0aWVzRm9yVGFyZ2V0RGVmaW5pdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2Ake25hbWV9VGFyZ2V0YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldHMuZmluZChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgdGFyZ2V0IGVsZW1lbnQgXCIke25hbWV9XCIgZm9yIFwiJHt0aGlzLmlkZW50aWZpZXJ9XCIgY29udHJvbGxlcmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtgJHtuYW1lfVRhcmdldHNgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldHMuZmluZEFsbChuYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtgaGFzJHtjYXBpdGFsaXplKG5hbWUpfVRhcmdldGBdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0cy5oYXMobmFtZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIFZhbHVlUHJvcGVydGllc0JsZXNzaW5nKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgdmFsdWVEZWZpbml0aW9uUGFpcnMgPSByZWFkSW5oZXJpdGFibGVTdGF0aWNPYmplY3RQYWlycyhjb25zdHJ1Y3RvciwgXCJ2YWx1ZXNcIik7XG4gICAgY29uc3QgcHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge1xuICAgICAgICB2YWx1ZURlc2NyaXB0b3JNYXA6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVEZWZpbml0aW9uUGFpcnMucmVkdWNlKChyZXN1bHQsIHZhbHVlRGVmaW5pdGlvblBhaXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEZXNjcmlwdG9yID0gcGFyc2VWYWx1ZURlZmluaXRpb25QYWlyKHZhbHVlRGVmaW5pdGlvblBhaXIsIHRoaXMuaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLmRhdGEuZ2V0QXR0cmlidXRlTmFtZUZvcktleSh2YWx1ZURlc2NyaXB0b3Iua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFthdHRyaWJ1dGVOYW1lXTogdmFsdWVEZXNjcmlwdG9yIH0pO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdmFsdWVEZWZpbml0aW9uUGFpcnMucmVkdWNlKChwcm9wZXJ0aWVzLCB2YWx1ZURlZmluaXRpb25QYWlyKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BlcnRpZXNGb3JWYWx1ZURlZmluaXRpb25QYWlyKHZhbHVlRGVmaW5pdGlvblBhaXIpKTtcbiAgICB9LCBwcm9wZXJ0eURlc2NyaXB0b3JNYXApO1xufVxuZnVuY3Rpb24gcHJvcGVydGllc0ZvclZhbHVlRGVmaW5pdGlvblBhaXIodmFsdWVEZWZpbml0aW9uUGFpciwgY29udHJvbGxlcikge1xuICAgIGNvbnN0IGRlZmluaXRpb24gPSBwYXJzZVZhbHVlRGVmaW5pdGlvblBhaXIodmFsdWVEZWZpbml0aW9uUGFpciwgY29udHJvbGxlcik7XG4gICAgY29uc3QgeyBrZXksIG5hbWUsIHJlYWRlcjogcmVhZCwgd3JpdGVyOiB3cml0ZSB9ID0gZGVmaW5pdGlvbjtcbiAgICByZXR1cm4ge1xuICAgICAgICBbbmFtZV06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb24uZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGtleSwgd3JpdGUodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShuYW1lKX1gXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFzKGtleSkgfHwgZGVmaW5pdGlvbi5oYXNDdXN0b21EZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlRGVmaW5pdGlvblBhaXIoW3Rva2VuLCB0eXBlRGVmaW5pdGlvbl0sIGNvbnRyb2xsZXIpIHtcbiAgICByZXR1cm4gdmFsdWVEZXNjcmlwdG9yRm9yVG9rZW5BbmRUeXBlRGVmaW5pdGlvbih7XG4gICAgICAgIGNvbnRyb2xsZXIsXG4gICAgICAgIHRva2VuLFxuICAgICAgICB0eXBlRGVmaW5pdGlvbixcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVUeXBlQ29uc3RhbnQoY29uc3RhbnQpIHtcbiAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgQXJyYXk6XG4gICAgICAgICAgICByZXR1cm4gXCJhcnJheVwiO1xuICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICByZXR1cm4gXCJib29sZWFuXCI7XG4gICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0XCI7XG4gICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGVEZWZhdWx0KGRlZmF1bHRWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiYm9vbGVhblwiO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmF1bHRWYWx1ZSkpXG4gICAgICAgIHJldHVybiBcImFycmF5XCI7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkZWZhdWx0VmFsdWUpID09PSBcIltvYmplY3QgT2JqZWN0XVwiKVxuICAgICAgICByZXR1cm4gXCJvYmplY3RcIjtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVUeXBlT2JqZWN0KHBheWxvYWQpIHtcbiAgICBjb25zdCB0eXBlRnJvbU9iamVjdCA9IHBhcnNlVmFsdWVUeXBlQ29uc3RhbnQocGF5bG9hZC50eXBlT2JqZWN0LnR5cGUpO1xuICAgIGlmICghdHlwZUZyb21PYmplY3QpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWVUeXBlID0gcGFyc2VWYWx1ZVR5cGVEZWZhdWx0KHBheWxvYWQudHlwZU9iamVjdC5kZWZhdWx0KTtcbiAgICBpZiAodHlwZUZyb21PYmplY3QgIT09IGRlZmF1bHRWYWx1ZVR5cGUpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlQYXRoID0gcGF5bG9hZC5jb250cm9sbGVyID8gYCR7cGF5bG9hZC5jb250cm9sbGVyfS4ke3BheWxvYWQudG9rZW59YCA6IHBheWxvYWQudG9rZW47XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCBkZWZhdWx0IHZhbHVlIGZvciB0aGUgU3RpbXVsdXMgVmFsdWUgXCIke3Byb3BlcnR5UGF0aH1cIiBtdXN0IG1hdGNoIHRoZSBkZWZpbmVkIHR5cGUgXCIke3R5cGVGcm9tT2JqZWN0fVwiLiBUaGUgcHJvdmlkZWQgZGVmYXVsdCB2YWx1ZSBvZiBcIiR7cGF5bG9hZC50eXBlT2JqZWN0LmRlZmF1bHR9XCIgaXMgb2YgdHlwZSBcIiR7ZGVmYXVsdFZhbHVlVHlwZX1cIi5gKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVGcm9tT2JqZWN0O1xufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGVEZWZpbml0aW9uKHBheWxvYWQpIHtcbiAgICBjb25zdCB0eXBlRnJvbU9iamVjdCA9IHBhcnNlVmFsdWVUeXBlT2JqZWN0KHtcbiAgICAgICAgY29udHJvbGxlcjogcGF5bG9hZC5jb250cm9sbGVyLFxuICAgICAgICB0b2tlbjogcGF5bG9hZC50b2tlbixcbiAgICAgICAgdHlwZU9iamVjdDogcGF5bG9hZC50eXBlRGVmaW5pdGlvbixcbiAgICB9KTtcbiAgICBjb25zdCB0eXBlRnJvbURlZmF1bHRWYWx1ZSA9IHBhcnNlVmFsdWVUeXBlRGVmYXVsdChwYXlsb2FkLnR5cGVEZWZpbml0aW9uKTtcbiAgICBjb25zdCB0eXBlRnJvbUNvbnN0YW50ID0gcGFyc2VWYWx1ZVR5cGVDb25zdGFudChwYXlsb2FkLnR5cGVEZWZpbml0aW9uKTtcbiAgICBjb25zdCB0eXBlID0gdHlwZUZyb21PYmplY3QgfHwgdHlwZUZyb21EZWZhdWx0VmFsdWUgfHwgdHlwZUZyb21Db25zdGFudDtcbiAgICBpZiAodHlwZSlcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgY29uc3QgcHJvcGVydHlQYXRoID0gcGF5bG9hZC5jb250cm9sbGVyID8gYCR7cGF5bG9hZC5jb250cm9sbGVyfS4ke3BheWxvYWQudHlwZURlZmluaXRpb259YCA6IHBheWxvYWQudG9rZW47XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHZhbHVlIHR5cGUgXCIke3Byb3BlcnR5UGF0aH1cIiBmb3IgXCIke3BheWxvYWQudG9rZW59XCIgdmFsdWVgKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRWYWx1ZUZvckRlZmluaXRpb24odHlwZURlZmluaXRpb24pIHtcbiAgICBjb25zdCBjb25zdGFudCA9IHBhcnNlVmFsdWVUeXBlQ29uc3RhbnQodHlwZURlZmluaXRpb24pO1xuICAgIGlmIChjb25zdGFudClcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZXNCeVR5cGVbY29uc3RhbnRdO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHR5cGVEZWZpbml0aW9uLmRlZmF1bHQ7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIHJldHVybiB0eXBlRGVmaW5pdGlvbjtcbn1cbmZ1bmN0aW9uIHZhbHVlRGVzY3JpcHRvckZvclRva2VuQW5kVHlwZURlZmluaXRpb24ocGF5bG9hZCkge1xuICAgIGNvbnN0IGtleSA9IGAke2Rhc2hlcml6ZShwYXlsb2FkLnRva2VuKX0tdmFsdWVgO1xuICAgIGNvbnN0IHR5cGUgPSBwYXJzZVZhbHVlVHlwZURlZmluaXRpb24ocGF5bG9hZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5LFxuICAgICAgICBuYW1lOiBjYW1lbGl6ZShrZXkpLFxuICAgICAgICBnZXQgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZUZvckRlZmluaXRpb24ocGF5bG9hZC50eXBlRGVmaW5pdGlvbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBoYXNDdXN0b21EZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VWYWx1ZVR5cGVEZWZhdWx0KHBheWxvYWQudHlwZURlZmluaXRpb24pICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRlcjogcmVhZGVyc1t0eXBlXSxcbiAgICAgICAgd3JpdGVyOiB3cml0ZXJzW3R5cGVdIHx8IHdyaXRlcnMuZGVmYXVsdCxcbiAgICB9O1xufVxuY29uc3QgZGVmYXVsdFZhbHVlc0J5VHlwZSA9IHtcbiAgICBnZXQgYXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGJvb2xlYW46IGZhbHNlLFxuICAgIG51bWJlcjogMCxcbiAgICBnZXQgb2JqZWN0KCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfSxcbiAgICBzdHJpbmc6IFwiXCIsXG59O1xuY29uc3QgcmVhZGVycyA9IHtcbiAgICBhcnJheSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBhcnJheSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBleHBlY3RlZCB2YWx1ZSBvZiB0eXBlIFwiYXJyYXlcIiBidXQgaW5zdGVhZCBnb3QgdmFsdWUgXCIke3ZhbHVlfVwiIG9mIHR5cGUgXCIke3BhcnNlVmFsdWVUeXBlRGVmYXVsdChhcnJheSl9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfSxcbiAgICBib29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAhKHZhbHVlID09IFwiMFwiIHx8IFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKSA9PSBcImZhbHNlXCIpO1xuICAgIH0sXG4gICAgbnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH0sXG4gICAgb2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9iamVjdCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICBpZiAob2JqZWN0ID09PSBudWxsIHx8IHR5cGVvZiBvYmplY3QgIT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGV4cGVjdGVkIHZhbHVlIG9mIHR5cGUgXCJvYmplY3RcIiBidXQgaW5zdGVhZCBnb3QgdmFsdWUgXCIke3ZhbHVlfVwiIG9mIHR5cGUgXCIke3BhcnNlVmFsdWVUeXBlRGVmYXVsdChvYmplY3QpfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9LFxuICAgIHN0cmluZyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbn07XG5jb25zdCB3cml0ZXJzID0ge1xuICAgIGRlZmF1bHQ6IHdyaXRlU3RyaW5nLFxuICAgIGFycmF5OiB3cml0ZUpTT04sXG4gICAgb2JqZWN0OiB3cml0ZUpTT04sXG59O1xuZnVuY3Rpb24gd3JpdGVKU09OKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHdyaXRlU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIGAke3ZhbHVlfWA7XG59XG5cbmNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBzaG91bGRMb2FkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGFmdGVyTG9hZChfaWRlbnRpZmllciwgX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFwcGxpY2F0aW9uO1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuc2NvcGU7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZ2V0IHRhcmdldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLnRhcmdldHM7XG4gICAgfVxuICAgIGdldCBvdXRsZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5vdXRsZXRzO1xuICAgIH1cbiAgICBnZXQgY2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuY2xhc3NlcztcbiAgICB9XG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmRhdGE7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgfVxuICAgIGRpc3BhdGNoKGV2ZW50TmFtZSwgeyB0YXJnZXQgPSB0aGlzLmVsZW1lbnQsIGRldGFpbCA9IHt9LCBwcmVmaXggPSB0aGlzLmlkZW50aWZpZXIsIGJ1YmJsZXMgPSB0cnVlLCBjYW5jZWxhYmxlID0gdHJ1ZSB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHByZWZpeCA/IGAke3ByZWZpeH06JHtldmVudE5hbWV9YCA6IGV2ZW50TmFtZTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWwsIGJ1YmJsZXMsIGNhbmNlbGFibGUgfSk7XG4gICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbn1cbkNvbnRyb2xsZXIuYmxlc3NpbmdzID0gW1xuICAgIENsYXNzUHJvcGVydGllc0JsZXNzaW5nLFxuICAgIFRhcmdldFByb3BlcnRpZXNCbGVzc2luZyxcbiAgICBWYWx1ZVByb3BlcnRpZXNCbGVzc2luZyxcbiAgICBPdXRsZXRQcm9wZXJ0aWVzQmxlc3NpbmcsXG5dO1xuQ29udHJvbGxlci50YXJnZXRzID0gW107XG5Db250cm9sbGVyLm91dGxldHMgPSBbXTtcbkNvbnRyb2xsZXIudmFsdWVzID0ge307XG5cbmV4cG9ydCB7IEFwcGxpY2F0aW9uLCBBdHRyaWJ1dGVPYnNlcnZlciwgQ29udGV4dCwgQ29udHJvbGxlciwgRWxlbWVudE9ic2VydmVyLCBJbmRleGVkTXVsdGltYXAsIE11bHRpbWFwLCBTZWxlY3Rvck9ic2VydmVyLCBTdHJpbmdNYXBPYnNlcnZlciwgVG9rZW5MaXN0T2JzZXJ2ZXIsIFZhbHVlTGlzdE9ic2VydmVyLCBhZGQsIGRlZmF1bHRTY2hlbWEsIGRlbCwgZmV0Y2gsIHBydW5lIH07XG4iLCAiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmRDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIHN0YXRpYyB0YXJnZXRzID0gWydzb3VyY2UnXTtcbiAgc291cmNlVGFyZ2V0OiBhbnk7XG5cbiAgY29weSgpIHtcblxuICAgIHRoaXMuZGlzcGF0Y2goJ2NvcHknLCB7XG4gICAgICBkZXRhaWw6IHsgY29udGVudDogdGhpcy5zb3VyY2VUYXJnZXQudmFsdWUgfVxuICAgIH0pO1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMuc291cmNlVGFyZ2V0LnZhbHVlKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENsaXBib2FyZENvbnRyb2xsZXIgfSBmcm9tICdxdXgtYWxpYXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICBDbGlwYm9hcmRDb250cm9sbGVyLnRhcmdldHMucHVzaCgnZm9vJylcblxuICByZXR1cm4gJ3F1eCc7XG59XG4iLCAiaW1wb3J0IGZvbyAgZnJvbSAnLi9mb28nXG5pbXBvcnQgcXV4IGZyb20gJy4uL2NvbXBvbmVudHMvcXV4JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuXG4gIGZvbygpXG4gIHF1eCgpXG5cbiAgcmV0dXJuICd0ZXN0Jztcbn1cbiIsICJpbXBvcnQgYmFyIGZyb20gJy4vY29tcG9uZW50cy9iYXInO1xuaW1wb3J0IGZvbyBmcm9tICcuL2NvbXBvbmVudHMvZm9vJztcbmltcG9ydCBiYXogZnJvbSAnLi9jb21wb25lbnRzL2Jheic7XG5pbXBvcnQgcXV4IGZyb20gJy4vY29tcG9uZW50cy9xdXgnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLi9jb21wb25lbnRzL3Rlc3QnO1xuXG5jb25zb2xlLmxvZygnaGVsbG8gc2lzc2VsJyk7XG4vLyBzc1xuYmFyKCk7XG5mb28oKTtcbmJheigpO1xucXV4KCk7XG50ZXN0KClcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLGFBQVMsTUFBTSxLQUFLLEtBQUssT0FBTyxVQUFVLE1BQU0sS0FBSztBQUNwRCxhQUFPLEVBQUMsS0FBVSxLQUFVLE9BQWMsVUFBb0IsTUFBWSxLQUFVLFNBQVMsUUFBVyxPQUFPLFFBQVcsUUFBUSxRQUFXLFVBQVUsT0FBUztBQUFBLElBQ2pLO0FBQ0EsVUFBTSxZQUFZLFNBQVMsTUFBTTtBQUNoQyxVQUFJLE1BQU0sUUFBUSxJQUFJO0FBQUcsZUFBTyxNQUFNLEtBQUssUUFBVyxRQUFXLE1BQU0sa0JBQWtCLElBQUksR0FBRyxRQUFXLE1BQVM7QUFDcEgsVUFBSSxRQUFRLFFBQVEsT0FBTyxTQUFTO0FBQVcsZUFBTztBQUN0RCxVQUFJLE9BQU8sU0FBUztBQUFVLGVBQU87QUFDckMsYUFBTyxNQUFNLEtBQUssUUFBVyxRQUFXLE9BQU8sSUFBSSxHQUFHLFFBQVcsTUFBUztBQUFBLElBQzNFO0FBQ0EsVUFBTSxvQkFBb0IsU0FBUyxPQUFPO0FBQ3pDLFVBQUksV0FBVyxDQUFDO0FBQ2hCLFVBQUksTUFBTSxRQUFRO0FBQ2pCLFlBQUksVUFBVSxNQUFNLENBQUMsS0FBSyxRQUFRLE1BQU0sQ0FBQyxFQUFFLE9BQU87QUFJbEQsaUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFD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TUFBTTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxJQUFJLE9BQU87QUFDUCxXQUFPLEtBQUssTUFBTTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTLFdBQVcsRUFBRSxTQUFTLEtBQUssU0FBUyxTQUFTLENBQUMsR0FBRyxTQUFTLEtBQUssWUFBWSxVQUFVLE1BQU0sYUFBYSxLQUFLLElBQUksQ0FBQyxHQUFHO0FBQzFILFVBQU0sT0FBTyxTQUFTLEdBQUcsTUFBTSxJQUFJLFNBQVMsS0FBSztBQUNqRCxVQUFNLFFBQVEsSUFBSSxZQUFZLE1BQU0sRUFBRSxRQUFRLFNBQVMsV0FBVyxDQUFDO0FBQ25FLFdBQU8sY0FBYyxLQUFLO0FBQzFCLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUFDQSxXQUFXLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNKO0FBQ0EsV0FBVyxVQUFVLENBQUM7QUFDdEIsV0FBVyxVQUFVLENBQUM7QUFDdEIsV0FBVyxTQUFTLENBQUM7OztBQ24yRWQsSUFBTSxzQkFBTixjQUFrQyxXQUFXO0FBQUEsRUFDbEQ7QUFBQSxTQUFPLFVBQVUsQ0FBQyxRQUFRO0FBQUE7QUFBQSxFQUcxQixPQUFPO0FBRUwsU0FBSyxTQUFTLFFBQVE7QUFBQSxNQUNwQixRQUFRLEVBQUUsU0FBUyxLQUFLLGFBQWEsTUFBTTtBQUFBLElBQzdDLENBQUM7QUFDRCxjQUFVLFVBQVUsVUFBVSxLQUFLLGFBQWEsS0FBSztBQUFBLEVBQ3ZEO0FBQ0Y7OztBQ1hlLFNBQVIsY0FBb0I7QUFFekIsc0JBQW9CLFFBQVEsS0FBSyxLQUFLO0FBRXRDLFNBQU87QUFDVDs7O0FDSmUsU0FBUixlQUFvQjtBQUV6QixjQUFJO0FBQ0osY0FBSTtBQUVKLFNBQU87QUFDVDs7O0FDSEEsUUFBUSxJQUFJLGNBQWM7QUFFMUIsWUFBSTtBQUNKLFlBQUk7QUFDSixZQUFJO0FBQ0osWUFBSTtBQUNKLGFBQUs7IiwKICAibmFtZXMiOiBbInJlcXVpcmVfaHlwZXJzY3JpcHQiLCAiaSIsICJyZXF1aXJlX3JlbmRlciIsICJjb25zb2xlIiwgInJlcXVpcmVfbW91bnRfcmVkcmF3IiwgImtleSIsICJyZXF1aXJlX2J1aWxkIiwgIm0iLCAiUHJvbWlzZSIsICJwcm9taXNlIiwgInJlcXVpcmVfcmVxdWVzdCIsICJyZXF1aXJlX3BhcnNlIiwgIm0iLCAibSIsICJQcm9taXNlIiwgInN0YXRlIiwgInJvdXRlIiwgIm0iLCAibSIsICJjb25zdHJ1Y3RvciJdCn0K
