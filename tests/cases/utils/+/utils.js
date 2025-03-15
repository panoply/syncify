'use strict';

var child_process = require('child_process');
var crypto = require('crypto');
var events = require('events');
var util = require('util');
var types = require('util/types');
var zlib = require('zlib');
var path = require('path');
var process4 = require('process');
var url = require('url');
var os = require('os');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var zlib__default = /*#__PURE__*/_interopDefault(zlib);
var process4__default = /*#__PURE__*/_interopDefault(process4);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    var has2 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    __name(Events, "Events");
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    __name(EE, "EE");
    function addListener(emitter, event2, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event2 : event2;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    __name(addListener, "addListener");
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    __name(clearEvent, "clearEvent");
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    __name(EventEmitter3, "EventEmitter");
    EventEmitter3.prototype.eventNames = /* @__PURE__ */ __name(function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has2.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    }, "eventNames");
    EventEmitter3.prototype.listeners = /* @__PURE__ */ __name(function listeners(event2) {
      var evt = prefix ? prefix + event2 : event2, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    }, "listeners");
    EventEmitter3.prototype.listenerCount = /* @__PURE__ */ __name(function listenerCount(event2) {
      var evt = prefix ? prefix + event2 : event2, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    }, "listenerCount");
    EventEmitter3.prototype.emit = /* @__PURE__ */ __name(function emit(event2, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event2, listeners.fn, undefined, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event2, listeners[i].fn, undefined, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    }, "emit");
    EventEmitter3.prototype.on = /* @__PURE__ */ __name(function on(event2, fn, context) {
      return addListener(this, event2, fn, context, false);
    }, "on");
    EventEmitter3.prototype.once = /* @__PURE__ */ __name(function once(event2, fn, context) {
      return addListener(this, event2, fn, context, true);
    }, "once");
    EventEmitter3.prototype.removeListener = /* @__PURE__ */ __name(function removeListener(event2, fn, context, once) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    }, "removeListener");
    EventEmitter3.prototype.removeAllListeners = /* @__PURE__ */ __name(function removeAllListeners(event2) {
      var evt;
      if (event2) {
        evt = prefix ? prefix + event2 : event2;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    }, "removeAllListeners");
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter3;
    }
  }
});

// packages/glue/dist/index.mjs
var g = /* @__PURE__ */ __name(function(...r) {
  return typeof r[0] == "string" ? r.join("") : r[0].join("");
}, "g");
g.join = function(n, ...r) {
  return arguments.length === 1 ? (...t) => typeof t[0] == "string" ? t.join(n) : t[0].join(n) : typeof r[0] == "string" ? r.join(n) : r[0].join(n);
};
g.ws = (...n) => typeof n[0] == "string" ? n.join(" ") : n[0].join(" ");
g.nl = (...n) => typeof n[0] == "string" ? n.join("\n") : n[0].join("\n");
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
var require_ansis = __commonJS2({
  "../../node_modules/.pnpm/ansis@3.9.0/node_modules/ansis/index.js"(exports, module) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var { round: e, floor: t, max: r } = Math;
    var n = /* @__PURE__ */ __name((e2) => {
      let [, t2] = /([a-f\d]{3,6})/i.exec(e2) || [], r2 = t2 ? t2.length : 0;
      if (3 === r2) t2 = t2[0] + t2[0] + t2[1] + t2[1] + t2[2] + t2[2];
      else if (6 !== r2) return [0, 0, 0];
      let n2 = parseInt(t2, 16);
      return [n2 >> 16 & 255, n2 >> 8 & 255, 255 & n2];
    }, "n");
    var l = /* @__PURE__ */ __name((t2, r2, n2) => t2 === r2 && r2 === n2 ? t2 < 8 ? 16 : t2 > 248 ? 231 : e((t2 - 8) / 247 * 24) + 232 : 16 + 36 * e(t2 / 51) + 6 * e(r2 / 51) + e(n2 / 51), "l");
    var i = /* @__PURE__ */ __name((n2) => {
      let l2, i2, o2, s2, a2;
      return n2 < 8 ? 30 + n2 : n2 < 16 ? n2 - 8 + 90 : (n2 >= 232 ? l2 = i2 = o2 = (10 * (n2 - 232) + 8) / 255 : (a2 = (n2 -= 16) % 36, l2 = t(n2 / 36) / 5, i2 = t(a2 / 6) / 5, o2 = a2 % 6 / 5), s2 = 2 * r(l2, i2, o2), s2 ? 30 + (e(o2) << 2 | e(i2) << 1 | e(l2)) + (2 === s2 ? 60 : 0) : 30);
    }, "i");
    var o = (() => {
      var _a19, _b12;
      let e2 = /* @__PURE__ */ __name((e3) => i2.some((t3) => e3.test(t3)), "e2"), t2 = globalThis, r2 = t2.Deno, n2 = !!r2, l2 = t2.process || r2 || {}, i2 = l2.argv || l2.args || [], o2 = l2.env || {}, s2 = -1;
      if (n2) try {
        o2 = o2.toObject();
      } catch (e3) {
        s2 = 0;
      }
      let a2 = !!o2.PM2_HOME && !!o2.pm_id || ((_a19 = o2.NEXT_RUNTIME) == null ? undefined : _a19.includes("edge")) || (n2 ? r2.isatty(1) : !!((_b12 = l2.stdout) == null ? undefined : _b12.isTTY)), c2 = "FORCE_COLOR", u2 = o2[c2], p2 = parseInt(u2), f2 = isNaN(p2) ? "false" === u2 ? 0 : -1 : p2, g22 = c2 in o2 && f2 || e2(/^-{1,2}color=?(true|always)?$/);
      return g22 && (s2 = f2), s2 < 0 && (s2 = ((e3, t3, r3) => {
        let { TERM: n3, COLORTERM: l3 } = e3;
        return "truecolor" === l3 || "24bit" === l3 ? 3 : "ansi256" === l3 ? 2 : "ansi" === l3 || e3.TF_BUILD ? 1 : e3.TEAMCITY_VERSION ? 2 : e3.CI ? ["GITHUB_ACTIONS", "GITEA_ACTIONS"].some((t4) => t4 in e3) ? 3 : 1 : !t3 || /-mono|dumb/i.test(n3) ? 0 : r3 || /^xterm-(kitty|direct)$/i.test(n3) ? 3 : /-256(colou?r)?$/i.test(n3) ? 2 : /^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(n3) ? 1 : 3;
      })(o2, a2, "win32" === (n2 ? r2.build.os : l2.platform))), !f2 || o2.NO_COLOR || e2(/^-{1,2}(no-color|color=(false|never))$/) ? 0 : g22 && 0 === s2 ? 3 : s2;
    })();
    var s = o > 0;
    var a = { open: "", close: "" };
    var c = s ? (e2, t2) => ({ open: "\x1B[".concat(e2, "m"), close: "\x1B[".concat(t2, "m") }) : () => a;
    var u = 39;
    var p = 49;
    var f = /* @__PURE__ */ __name((e2, t2) => (r2, n2, o2) => c(((e3, t3, r3) => i(l(e3, t3, r3)))(r2, n2, o2) + e2, t2), "f");
    var g2 = /* @__PURE__ */ __name((e2) => (t2, r2, n2) => e2(l(t2, r2, n2)), "g");
    var d = /* @__PURE__ */ __name((e2) => (t2) => {
      let [r2, l2, i2] = n(t2);
      return e2(r2, l2, i2);
    }, "d");
    var b = /* @__PURE__ */ __name((e2) => c("38;5;".concat(e2), u), "b");
    var _ = /* @__PURE__ */ __name((e2) => c("48;5;".concat(e2), p), "_");
    var O = /* @__PURE__ */ __name((e2, t2, r2) => c("38;2;".concat(e2, ";").concat(t2, ";").concat(r2), u), "O");
    var m = /* @__PURE__ */ __name((e2, t2, r2) => c("48;2;".concat(e2, ";").concat(t2, ";").concat(r2), p), "m");
    1 === o ? (b = /* @__PURE__ */ __name((e2) => c(i(e2), u), "b"), _ = /* @__PURE__ */ __name((e2) => c(i(e2) + 10, p), "_"), O = f(0, u), m = f(10, p)) : 2 === o && (O = g2(b), m = g2(_));
    var x;
    var y;
    var $2 = { ansi256: b, bgAnsi256: _, fg: b, bg: _, rgb: O, bgRgb: m, hex: d(O), bgHex: d(m), visible: a, reset: c(0, 0), bold: c(1, 22), dim: c(2, 22), italic: c(3, 23), underline: c(4, 24), inverse: c(7, 27), hidden: c(8, 28) };
    var h = "black,red,green,yellow,blue,magenta,cyan,white".split(",");
    var T = "Bright";
    var I = 30;
    for (x of h) y = "bg" + x[0].toUpperCase() + x.slice(1), $2[x] = c(I, u), $2[x + T] = c(I + 60, u), $2[y] = c(I + 10, p), $2[y + T] = c(I + 70, p), I++;
    $2.grey = $2.gray = c(90, u), $2.bgGrey = $2.bgGray = c(100, p), $2.strikethrough = $2.strike = c(9, 29);
    var R;
    var { create: v, defineProperty: C, setPrototypeOf: E } = Object;
    var w = {};
    var M = /* @__PURE__ */ __name(({ _p: e2 }, { open: t2, close: r2 }) => {
      let n2 = /* @__PURE__ */ __name((e3, ...t3) => {
        if (null == e3 || "" === e3) return "";
        let r3 = n2._p, { _a: l3, _b: i3 } = r3, o2 = (e3 == null ? undefined : e3.raw) ? String.raw(e3, ...t3) : "" + e3;
        if (~o2.indexOf("\x1B")) for (; r3; ) {
          let e4, t4 = r3.close, n3 = r3.open, l4 = t4.length, i4 = "", s2 = 0;
          if (l4) {
            for (; ~(e4 = o2.indexOf(t4, s2)); s2 = e4 + l4) i4 += o2.slice(s2, e4) + n3;
            o2 = i4 + o2.slice(s2);
          }
          r3 = r3._p;
        }
        return ~o2.indexOf("\n") && (o2 = o2.replace(/(\r?\n)/g, i3 + "$1" + l3)), l3 + o2 + i3;
      }, "n2"), l2 = t2, i2 = r2;
      return e2 && (l2 = e2._a + t2, i2 = r2 + e2._b), E(n2, R), n2._p = { open: t2, close: r2, _a: l2, _b: i2, _p: e2 }, n2.open = l2, n2.close = i2, n2;
    }, "M");
    var N = /* @__PURE__ */ __name(function() {
      let e2 = { isSupported: /* @__PURE__ */ __name(() => s, "isSupported"), strip: /* @__PURE__ */ __name((e3) => e3.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ""), "strip"), extend(t2) {
        for (let e3 in t2) {
          let r2 = t2[e3], l2 = (typeof r2)[0], i2 = "s" === l2 ? O(...n(r2)) : r2;
          w[e3] = "f" === l2 ? { get() {
            return (...e4) => M(this, r2(...e4));
          } } : { get() {
            let t3 = M(this, i2);
            return C(this, e3, { value: t3 }), t3;
          } };
        }
        return R = v({}, w), E(e2, R), e2;
      } };
      return e2.extend($2);
    }, "N");
    var A = new N();
    module.exports = A, module.exports.Ansis = N, A.default = A;
  }
});
var import_index = __toESM2(require_ansis(), 1);
import_index.default.extend(
  {
    brown: "#c19a6b",
    pink: "#ff75d1",
    teal: "#91EBC2",
    lightGray: "#2a2a2e",
    midGray: "#2a2929",
    orange: "#FFAB40",
    lavender: "#8080FF",
    neonGreen: "#56ef83",
    neonCyan: "#69d5fd",
    neonRouge: "#FF8095",
    neonMagenta: "#7b68ee"
  }
);
var {
  // STANDARD
  cyan: cyan2,
  red: red2,
  green: green2,
  yellow: yellow2,
  magenta: magenta2,
  blue: blue2,
  white: white2,
  gray: gray2,
  dim: dim2,
  // BRIGHT
  cyanBright: cyanBright2,
  redBright: redBright2,
  greenBright: greenBright2,
  yellowBright: yellowBright2,
  magentaBright: magentaBright2,
  blueBright: blueBright2,
  whiteBright: whiteBright2,
  // OTHER
  strip,
  // STYLES
  underline: underline2,
  bold: bold2,
  reset: reset2,
  // CUSTOM
  lightGray,
  midGray,
  pink,
  brown,
  teal,
  orange,
  lavender,
  neonGreen,
  neonCyan,
  neonRouge,
  neonMagenta
} = import_index.default;
var COL = "".concat(gray2.open, ":").concat(gray2.close);
var TLD = "".concat(gray2.open, "~").concat(gray2.close);
var DSH = "".concat(gray2.open, "\u2014").concat(gray2.close);
function sanitize(message) {
  if (Buffer.isBuffer(message)) return message.toString();
  if (Array.isArray(message) || typeof message === "object") return JSON.stringify(message);
  if (typeof message === "boolean" || typeof message === "number") return "".concat(message);
  return typeof message === "string" ? message : String(message);
}
__name(sanitize, "sanitize");
function eq(array, prop = null) {
  let size = 0;
  if (Array.isArray(array)) {
    for (const item of array) {
      if (prop) {
        if (item[prop].length > size) {
          size = item[prop].length;
        }
      } else {
        if (item.length > size) {
          size = item.length;
        }
      }
    }
  } else {
    for (const item in array) {
      if (item.length > size) size = item.length;
    }
  }
  size = size + 1;
  return /* @__PURE__ */ __name(function curried(string) {
    const n = typeof string === "string" ? size - string.length : size - string;
    return n < 1 ? " " : " ".repeat(n);
  }, "curried");
}
__name(eq, "eq");
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? "0".concat(hur) : hur) + COL + (min < 10 ? "0".concat(min) : min) + COL + (sec < 10 ? "0".concat(sec) : sec);
}
__name(getTime, "getTime");
function exec(command2, args, shell) {
  return child_process.execFileSync(command2, args, {
    encoding: "utf8",
    shell,
    stdio: [
      "ignore",
      "pipe",
      "ignore"
    ]
  }).trim();
}
__name(exec, "exec");
function execNative(command2, shell) {
  const __dirname = path.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('utils.js', document.baseURI).href))));
  return exec(path.join(__dirname, command2), [], shell).split(/\r?\n/);
}
__name(execNative, "execNative");
function create(columns, rows) {
  const cols = Number.parseInt(columns, 10);
  return {
    wrap: cols > 85 ? 85 : cols,
    cols: Number.parseInt(columns, 10),
    rows: Number.parseInt(rows, 10)
  };
}
__name(create, "create");
function tsize() {
  if (process4.stdout && process4.stdout.columns && process4.stdout.rows) return create(process4.stdout.columns, process4.stdout.rows);
  if (process4.stderr && process4.stderr.columns && process4.stderr.rows) return create(process4.stderr.columns, process4.stderr.rows);
  if (process4.env.COLUMNS && process4.env.LINES) return create(process4.env.COLUMNS, process4.env.LINES);
  if (process4.platform === "win32") {
    try {
      const size = execNative("vendor/windows/term-size.exe", false);
      if (size.length === 2) return create(size[0], size[1]);
    } catch {
    }
  } else {
    if (process4.platform === "darwin") {
      try {
        const size = execNative("vendor/macos/term-size", true);
        if (size.length === 2) return create(size[0], size[1]);
      } catch {
      }
    }
    try {
      const size = exec("resize", ["-u"]).match(/\d+/g);
      if (size.length === 2) return create(size[0], size[1]);
    } catch {
    }
    if (process4.env.TERM) {
      try {
        const cols = exec("tput", ["cols"]);
        const rows = exec("tput", ["lines"]);
        if (cols && rows) return create(cols, rows);
      } catch {
      }
    }
  }
  return create(80, 24);
}
__name(tsize, "tsize");
var Tree = /* @__PURE__ */ Object.create(null);
Tree.open = "".concat(lightGray.open, "\u250C\u2500").concat(lightGray.close, " ");
Tree.stub = "".concat(lightGray.open, "\u251C").concat(lightGray.close, "  ");
Tree.dash = "".concat(lightGray.open, "\u251C\u2500").concat(lightGray.close, " ");
Tree.trim = "".concat(lightGray.open, "\u2502").concat(lightGray.close);
Tree.line = "".concat(lightGray.open, "\u2502").concat(lightGray.close, "  ");
Tree.next = "\n".concat(lightGray.open, "\u2502").concat(lightGray.close);
Tree.after = "".concat(lightGray.open, "\u2502").concat(lightGray.close, "\n");
Tree.wrap = "\n".concat(lightGray.open, "\u2502").concat(lightGray.close, "\n");
Tree.base = "".concat(lightGray.open, "\u2514\u2500").concat(lightGray.close, " ");
Tree.red = "".concat(red2.dim.open, "\u2502").concat(red2.dim.close, "  ");
Tree.redTrim = "".concat(red2.dim.open, "\u2502").concat(red2.dim.close);
Tree.yellow = "".concat(yellow2.dim.open, "\u2502").concat(yellow2.dim.close, "  ");
Tree.yellowTrim = "".concat(yellow2.dim.open, "\u2502").concat(yellow2.dim.close);
Tree.indent = /* @__PURE__ */ Object.create(null);
Tree.indent.edge = "".concat(lightGray.open, "\u251C\u2500\u2500\u252C\u2500").concat(lightGray.close, " ");
Tree.indent.fall = "".concat(lightGray.open, "\u251C\u2500\u2500\u2510").concat(lightGray.close, " ");
Tree.indent.line = "".concat(lightGray.open, "\u2502  \u2502").concat(lightGray.close, " ");
Tree.indent.stub = "".concat(lightGray.open, "\u2502  \u251C").concat(lightGray.close, " ");
Tree.indent.dash = "".concat(lightGray.open, "\u2502  \u251C\u2500").concat(lightGray.close, " ");
Tree.indent.base = "".concat(lightGray.open, "\u2502  \u2514\u2500").concat(lightGray.close, " ");
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?".concat(ST, ")"),
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? undefined : "g");
}
__name(ansiRegex, "ansiRegex");
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(regex, "");
}
__name(stripAnsi, "stripAnsi");
function isAmbiguous(x) {
  return x === 161 || x === 164 || x === 167 || x === 168 || x === 170 || x === 173 || x === 174 || x >= 176 && x <= 180 || x >= 182 && x <= 186 || x >= 188 && x <= 191 || x === 198 || x === 208 || x === 215 || x === 216 || x >= 222 && x <= 225 || x === 230 || x >= 232 && x <= 234 || x === 236 || x === 237 || x === 240 || x === 242 || x === 243 || x >= 247 && x <= 250 || x === 252 || x === 254 || x === 257 || x === 273 || x === 275 || x === 283 || x === 294 || x === 295 || x === 299 || x >= 305 && x <= 307 || x === 312 || x >= 319 && x <= 322 || x === 324 || x >= 328 && x <= 331 || x === 333 || x === 338 || x === 339 || x === 358 || x === 359 || x === 363 || x === 462 || x === 464 || x === 466 || x === 468 || x === 470 || x === 472 || x === 474 || x === 476 || x === 593 || x === 609 || x === 708 || x === 711 || x >= 713 && x <= 715 || x === 717 || x === 720 || x >= 728 && x <= 731 || x === 733 || x === 735 || x >= 768 && x <= 879 || x >= 913 && x <= 929 || x >= 931 && x <= 937 || x >= 945 && x <= 961 || x >= 963 && x <= 969 || x === 1025 || x >= 1040 && x <= 1103 || x === 1105 || x === 8208 || x >= 8211 && x <= 8214 || x === 8216 || x === 8217 || x === 8220 || x === 8221 || x >= 8224 && x <= 8226 || x >= 8228 && x <= 8231 || x === 8240 || x === 8242 || x === 8243 || x === 8245 || x === 8251 || x === 8254 || x === 8308 || x === 8319 || x >= 8321 && x <= 8324 || x === 8364 || x === 8451 || x === 8453 || x === 8457 || x === 8467 || x === 8470 || x === 8481 || x === 8482 || x === 8486 || x === 8491 || x === 8531 || x === 8532 || x >= 8539 && x <= 8542 || x >= 8544 && x <= 8555 || x >= 8560 && x <= 8569 || x === 8585 || x >= 8592 && x <= 8601 || x === 8632 || x === 8633 || x === 8658 || x === 8660 || x === 8679 || x === 8704 || x === 8706 || x === 8707 || x === 8711 || x === 8712 || x === 8715 || x === 8719 || x === 8721 || x === 8725 || x === 8730 || x >= 8733 && x <= 8736 || x === 8739 || x === 8741 || x >= 8743 && x <= 8748 || x === 8750 || x >= 8756 && x <= 8759 || x === 8764 || x === 8765 || x === 8776 || x === 8780 || x === 8786 || x === 8800 || x === 8801 || x >= 8804 && x <= 8807 || x === 8810 || x === 8811 || x === 8814 || x === 8815 || x === 8834 || x === 8835 || x === 8838 || x === 8839 || x === 8853 || x === 8857 || x === 8869 || x === 8895 || x === 8978 || x >= 9312 && x <= 9449 || x >= 9451 && x <= 9547 || x >= 9552 && x <= 9587 || x >= 9600 && x <= 9615 || x >= 9618 && x <= 9621 || x === 9632 || x === 9633 || x >= 9635 && x <= 9641 || x === 9650 || x === 9651 || x === 9654 || x === 9655 || x === 9660 || x === 9661 || x === 9664 || x === 9665 || x >= 9670 && x <= 9672 || x === 9675 || x >= 9678 && x <= 9681 || x >= 9698 && x <= 9701 || x === 9711 || x === 9733 || x === 9734 || x === 9737 || x === 9742 || x === 9743 || x === 9756 || x === 9758 || x === 9792 || x === 9794 || x === 9824 || x === 9825 || x >= 9827 && x <= 9829 || x >= 9831 && x <= 9834 || x === 9836 || x === 9837 || x === 9839 || x === 9886 || x === 9887 || x === 9919 || x >= 9926 && x <= 9933 || x >= 9935 && x <= 9939 || x >= 9941 && x <= 9953 || x === 9955 || x === 9960 || x === 9961 || x >= 9963 && x <= 9969 || x === 9972 || x >= 9974 && x <= 9977 || x === 9979 || x === 9980 || x === 9982 || x === 9983 || x === 10045 || x >= 10102 && x <= 10111 || x >= 11094 && x <= 11097 || x >= 12872 && x <= 12879 || x >= 57344 && x <= 63743 || x >= 65024 && x <= 65039 || x === 65533 || x >= 127232 && x <= 127242 || x >= 127248 && x <= 127277 || x >= 127280 && x <= 127337 || x >= 127344 && x <= 127373 || x === 127375 || x === 127376 || x >= 127387 && x <= 127404 || x >= 917760 && x <= 917999 || x >= 983040 && x <= 1048573 || x >= 1048576 && x <= 1114109;
}
__name(isAmbiguous, "isAmbiguous");
function isFullWidth(x) {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
}
__name(isFullWidth, "isFullWidth");
function isWide(x) {
  return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9776 && x <= 9783 || x >= 9800 && x <= 9811 || x === 9855 || x >= 9866 && x <= 9871 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12773 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101631 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x >= 119552 && x <= 119638 || x >= 119648 && x <= 119670 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129673 || x >= 129679 && x <= 129734 || x >= 129742 && x <= 129756 || x >= 129759 && x <= 129769 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
}
__name(isWide, "isWide");
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError("Expected a code point, got `".concat(typeof codePoint, "`."));
  }
}
__name(validate, "validate");
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}
__name(eastAsianWidth, "eastAsianWidth");
var emoji_regex_default = /* @__PURE__ */ __name(() => {
  return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
}, "emoji_regex_default");
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = new RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  if (!countAnsiEscapeCodes) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if (emoji_regex_default().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}
__name(stringWidth, "stringWidth");
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = /* @__PURE__ */ __name((offset = 0) => (code) => "\x1B[".concat(code + offset, "m"), "wrapAnsi16");
var wrapAnsi256 = /* @__PURE__ */ __name((offset = 0) => (code) => "\x1B[".concat(38 + offset, ";5;").concat(code, "m"), "wrapAnsi256");
var wrapAnsi16m = /* @__PURE__ */ __name((offset = 0) => (red3, green3, blue3) => "\x1B[".concat(38 + offset, ";2;").concat(red3, ";").concat(green3, ";").concat(blue3, "m"), "wrapAnsi16m");
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: "\x1B[".concat(style[0], "m"),
        close: "\x1B[".concat(style[1], "m")
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value: /* @__PURE__ */ __name((red3, green3, blue3) => {
        if (red3 === green3 && green3 === blue3) {
          if (red3 < 8) {
            return 16;
          }
          if (red3 > 248) {
            return 231;
          }
          return Math.round((red3 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red3 / 255 * 5) + 6 * Math.round(green3 / 255 * 5) + Math.round(blue3 / 255 * 5);
      }, "value"),
      enumerable: false
    },
    hexToRgb: {
      value: /* @__PURE__ */ __name((hex2) => {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex2.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      }, "value"),
      enumerable: false
    },
    hexToAnsi256: {
      value: /* @__PURE__ */ __name((hex2) => styles.rgbToAnsi256(...styles.hexToRgb(hex2)), "value"),
      enumerable: false
    },
    ansi256ToAnsi: {
      value: /* @__PURE__ */ __name((code) => {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red3;
        let green3;
        let blue3;
        if (code >= 232) {
          red3 = ((code - 232) * 10 + 8) / 255;
          green3 = red3;
          blue3 = red3;
        } else {
          code -= 16;
          const remainder = code % 36;
          red3 = Math.floor(code / 36) / 5;
          green3 = Math.floor(remainder / 6) / 5;
          blue3 = remainder % 6 / 5;
        }
        const value = Math.max(red3, green3, blue3) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue3) << 2 | Math.round(green3) << 1 | Math.round(red3));
        if (value === 2) {
          result += 60;
        }
        return result;
      }, "value"),
      enumerable: false
    },
    rgbToAnsi: {
      value: /* @__PURE__ */ __name((red3, green3, blue3) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red3, green3, blue3)), "value"),
      enumerable: false
    },
    hexToAnsi: {
      value: /* @__PURE__ */ __name((hex2) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex2)), "value"),
      enumerable: false
    }
  });
  return styles;
}
__name(assembleStyles, "assembleStyles");
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;
var ESCAPES = /* @__PURE__ */ new Set([
  "\x1B",
  "\x9B"
]);
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = "".concat(ANSI_OSC, "8;;");
var wrapAnsiCode = /* @__PURE__ */ __name((code) => "".concat(ESCAPES.values().next().value).concat(ANSI_CSI).concat(code).concat(ANSI_SGR_TERMINATOR), "wrapAnsiCode");
var wrapAnsiHyperlink = /* @__PURE__ */ __name((url) => "".concat(ESCAPES.values().next().value).concat(ANSI_ESCAPE_LINK).concat(url).concat(ANSI_ESCAPE_BELL), "wrapAnsiHyperlink");
var wordLengths = /* @__PURE__ */ __name((string) => string.split(" ").map((character) => stringWidth(character)), "wordLengths");
var wrapWord = /* @__PURE__ */ __name((rows, word, columns) => {
  const characters = [...word];
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let visible2 = stringWidth(stripAnsi(rows.at(-1)));
  for (const [index, character] of characters.entries()) {
    const characterLength = stringWidth(character);
    if (visible2 + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible2 = 0;
    }
    if (ESCAPES.has(character)) {
      isInsideEscape = true;
      const ansiEscapeLinkCandidate = characters.slice(index + 1, index + 1 + ANSI_ESCAPE_LINK.length).join("");
      isInsideLinkEscape = ansiEscapeLinkCandidate === ANSI_ESCAPE_LINK;
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
      continue;
    }
    visible2 += characterLength;
    if (visible2 === columns && index < characters.length - 1) {
      rows.push("");
      visible2 = 0;
    }
  }
  if (!visible2 && rows.at(-1).length > 0 && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
}, "wrapWord");
var stringVisibleTrimSpacesRight = /* @__PURE__ */ __name((string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last > 0) {
    if (stringWidth(words[last - 1]) > 0) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
}, "stringVisibleTrimSpacesRight");
var exec2 = /* @__PURE__ */ __name((string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const lengths = wordLengths(string);
  let rows = [""];
  for (const [index, word] of string.split(" ").entries()) {
    if (options.trim !== false) {
      rows[rows.length - 1] = rows.at(-1).trimStart();
    }
    let rowLength = stringWidth(rows.at(-1));
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength > 0 || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    if (options.hard && lengths[index] > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      continue;
    }
    if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows.push("");
    }
    if (rowLength + lengths[index] > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      continue;
    }
    rows[rows.length - 1] += word;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  const pre = [...preString];
  let preStringIndex = 0;
  for (const [index, character] of pre.entries()) {
    returnValue += character;
    if (ESCAPES.has(character)) {
      const { groups } = new RegExp("(?:\\".concat(ANSI_CSI, "(?<code>\\d+)m|\\").concat(ANSI_ESCAPE_LINK, "(?<uri>.*)").concat(ANSI_ESCAPE_BELL, ")")).exec(preString.slice(preStringIndex)) || { groups: {} };
      if (groups.code !== undefined) {
        const code2 = Number.parseFloat(groups.code);
        escapeCode = code2 === END_CODE ? undefined : code2;
      } else if (groups.uri !== undefined) {
        escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
      }
    }
    const code = ansi_styles_default.codes.get(Number(escapeCode));
    if (pre[index + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(code);
      }
    } else if (character === "\n") {
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
    preStringIndex += character.length;
  }
  return returnValue;
}, "exec2");
function wrapAnsi(string, columns, options) {
  return String(string).normalize().replaceAll("\r\n", "\n").split("\n").map((line) => exec2(line, columns, options)).join("\n");
}
__name(wrapAnsi, "wrapAnsi");
function escRegex(string) {
  if (typeof string !== "string") throw new TypeError("Expected a string");
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
__name(escRegex, "escRegex");
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function cleanStack(stack, { pretty = false, basePath, pathFilter } = {}) {
  const basePathRegex = basePath && new RegExp("(file://)?".concat(escRegex(basePath.replace(/\\/g, "/")), "/?"), "g");
  const homeDirectory = pretty ? os.homedir().replace(/\\/g, "/") : "";
  if (typeof stack !== "string") {
    return undefined;
  }
  return stack.replace(/\\/g, "/").split("\n").filter((line) => {
    const pathMatches = line.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) return true;
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) return false;
    return pathFilter ? !pathRegex.test(match) && pathFilter(match) : !pathRegex.test(match);
  }).filter((line) => line.trim() !== "").map((line) => {
    if (basePathRegex) line = line.replace(basePathRegex, "");
    if (pretty) {
      line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDirectory, "~")));
    }
    return line;
  }).join("\n");
}
__name(cleanStack, "cleanStack");
var Suffix = /* @__PURE__ */ Object.create(null);
Suffix.warning = yellow2(" ".concat(TLD, " Type ").concat(bold2("w"), " and press ").concat(bold2("enter"), " to view all warning/s"));
Suffix.error = red2(" ".concat(TLD, " Type ").concat(bold2("v"), " and press ").concat(bold2("enter"), " to view all error/s"));
Suffix.stack = gray2("Type ".concat(bold2("s"), " and press ").concat(bold2("enter"), " to view stack trace"));
var Top = /* @__PURE__ */ __name((label) => Tree.open + reset2.gray("".concat(label, " ~ ").concat(getTime())), "Top");
var Wrap = /* @__PURE__ */ __name((...input) => {
  const style = { color: null, line: Tree.line };
  const width = tsize().wrap - 5;
  let lines;
  let write = "";
  if (Array.isArray(input[0])) {
    if (typeof input[1] === "object") {
      Object.assign(style, input[1]);
    }
    lines = wrapAnsi(input[0].join(" "), width, { hard: true }).split("\n");
  } else {
    if (typeof input[input.length - 1] === "object") {
      Object.assign(style, input.pop());
    }
    lines = wrapAnsi(input.join(" "), width, { hard: true }).split("\n");
  }
  while (lines.length !== 0) {
    const line = lines.shift().trim();
    if (line.length > 0) {
      write += style.line + (style.color ? style.color(line) : line) + "\n";
    } else {
      write += style.line + "\n";
    }
  }
  return write.trimEnd();
}, "Wrap");
function End(input) {
  return Tree.base + reset2.gray("".concat(input, " ~ ").concat(getTime())) + "\n";
}
__name(End, "End");
function Context(data) {
  const space = eq(data.entries);
  const message = Create({ type: data.type || "error" }).Newline("line");
  if (typeof data.stack === "string") {
    const stack = data.cleanStack ? cleanStack(data.stack, { pretty: true }) : data.stack;
    message.Wrap(stack.split("\n"), gray2).NL.Newline();
  }
  let line = "";
  let col = "";
  if ("line" in data.entries && +data.entries.line > -1) line = ":".concat(data.entries.line);
  if (line !== "" && "column" in data.entries && +data.entries.column > -1) col = ":".concat(data.entries.column);
  for (const key in data.entries) {
    if (data.entries[key] === undefined) continue;
    let string;
    const isFailed = key === "failed";
    if (typeof data.entries[key] === "number") {
      if (isNaN(data.entries[key])) continue;
      string = neonRouge(sanitize(data.entries[key]));
    } else if (!isFailed) {
      string = sanitize(data.entries[key]);
    }
    if (!isFailed && string.length === 0) continue;
    const entry = data.type === "warning" ? yellowBright2(key) : redBright2(key);
    if (key === "source" || key === "output" || key === "input" || key === "file") {
      message.Line(entry + COL + " " + space(key) + underline2(string + line + col), gray2);
    } else if (isFailed) {
      if (Array.isArray(data.entries[key])) {
        for (const fail of data.entries[key]) {
          message.Line(entry + COL + " " + space(key) + underline2(fail), gray2);
        }
      } else {
        message.Line(entry + COL + " " + space(key) + underline2(data.entries[key]), gray2);
      }
    } else {
      message.Line(entry + COL + " " + space(key) + string, gray2);
    }
  }
  if (data.stack === true) {
    message.NL.Line(Suffix.stack);
  }
  return message.toString();
}
__name(Context, "Context");
var _a;
var Message = (_a = class {
  constructor(options) {
    /**
     * The type of tree message to generate - This will
     * default the `Tree.line` to a specific color, meaning
     * the `.line()` will be output according to the type.
     *
     * @default 'info
     */
    __publicField(this, "type", "info");
    /**
     * Stack entry track
     *
     * @default {}
     */
    __publicField(this, "track");
    /**
     * The Tree line color based on message type
     *
     * @default Tree.line
     */
    __publicField(this, "template");
    /**
     * The Tree line color based on message type
     *
     * @default Tree.line
     */
    __publicField(this, "line");
    /**
     * The Tree trim color based on message type
     *
     * @default Tree.trim
     */
    __publicField(this, "trim");
    /**
     * Optionally provide an existing structure to build from.
     *
     * @default []
     */
    __publicField(this, "stack");
    if (typeof options === "object") {
      this.type = "type" in options ? options.type : "info";
      this.stack = "stack" in options ? options.stack : [];
      this.track = "track" in options ? options.track : /* @__PURE__ */ Object.create(null);
      if (this.type === "error") {
        this.line = Tree.red;
        this.trim = Tree.redTrim;
      } else if (this.type === "warning") {
        this.line = Tree.yellow;
        this.trim = Tree.yellowTrim;
      } else if (this.type === "nil") {
        this.line = "";
        this.trim = "";
      } else {
        this.line = Tree.line;
        this.trim = Tree.trim;
      }
    } else {
      this.line = Tree.line;
      this.trim = Tree.trim;
      this.stack = [];
      this.track = /* @__PURE__ */ Object.create(null);
    }
  }
  /**
   * Return Structure
   *
   * Returns the current structure being built.
   */
  toRaw() {
    return this.stack;
  }
  /**
   * Generate string with ending line
   *
   * Applies a `.join` glue to the `this.stack[]` - Calling this function
   * will clear the message array. Use `toRaw()` to obtain current
   * string build.
   *
   * The difference with `toLine()` and `toString()` is that this caller
   * will append a newline line to end of output.
   *
   * ```bash
   * \n
   * │
   * ```
   */
  toLine(color) {
    if (this.stack.length === 0) return "";
    this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd();
    let output;
    if (color) {
      output = color(g(this.stack));
    } else if (this.type === "info") {
      output = white2(g(this.stack));
    } else if (this.type === "error") {
      output = red2(g(this.stack));
    } else if (this.type === "warning") {
      output = yellowBright2(g(this.stack));
    } else {
      output = g(this.stack);
    }
    this.stack = [];
    for (const _ in this.track) {
      this.track = /* @__PURE__ */ Object.create(null);
      break;
    }
    return output + "\n" + this.trim;
  }
  /**
   * Generate string - Trims any newlines in last entry
   *
   * Applies a `.join` glue to the `text[]` - Clears the `this.stack[]` array,
   * but can be prevented by passing `{ clear: false }` as option.
   *
   *
   * > Use `toRaw()` to obtain current string[] build.
   *
   * ```bash
   * │ ending content
   * ```
   */
  toString({ clear: clear2 = true, color = undefined, trim = true } = {}) {
    if (this.stack.length === 0) return "";
    if (trim) {
      this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd();
    }
    let output;
    if (color) {
      output = color(this.stack.join(""));
    } else if (this.type === "info") {
      output = white2(this.stack.join(""));
    } else if (this.type === "error") {
      output = red2(this.stack.join(""));
    } else if (this.type === "warning") {
      output = yellowBright2(this.stack.join(""));
    } else {
      output = this.stack.join("");
    }
    if (clear2) this.Reset();
    return output;
  }
  Reset() {
    this.stack = [];
    for (const _ in this.track) {
      this.track = /* @__PURE__ */ Object.create(null);
      break;
    }
  }
  /**
   * Get Line
   *
   * Returns a line at the specific index. Defaults to last known line
   */
  Get(index = this.stack.length - 1) {
    return this.stack[index];
  }
  /**
   * Track Stack entry
   *
   * When called, an index in the stack is tracked. The message in the stack
   * can then be referenced and updated at a later time using `Update`. If
   * the stack is empty, no track applies.
   *
   * The function **must** be called following a write method and the last known
   * entry index in the stack is what is saved. If a tacked reference exists
   * with the `id` provided, it will be overwritten.
   *
   * All tracked references are cleared on `toString` or `toLine`
   */
  Template(id, {
    placeholder = false,
    color = null,
    insert = false
  } = {}) {
    if (placeholder === true) this.stack.push("");
    if (this.stack.length > 0) {
      this.track[id] = {
        index: this.stack.length - 1,
        color,
        insert
      };
    }
    return this;
  }
  /**
   * Tree Update
   *
   * Updates a stack entry at either a `Track()` identifier index or index (depending on `id`)
   * parameter `type` provided. The stack will be augmented and updated, at the index provided.
   * Passing an `string[]` input will result in spliced insertion.
   *
   * @example
   * // Assuming Track('ref') was called during message creation
   *
  * // If ref was index 1 in the stack
  * _.Update('ref', ['hello', 'world'])
  *
  * // Before
  * ['│ foo\n', '│ bar\n', '│ baz\n']
  * // After
  * ['│ foo\n', '│ hello\n', '│ world\n', '│ baz\n']
  *
  */
  Update(id, input, newColor = null) {
    let index = NaN;
    if (typeof id === "string" && id in this.track) {
      index = this.track[id].index;
    } else if (typeof id === "number") {
      index = id;
    }
    if (isNaN(index) || typeof this.stack[index] !== "string") return this;
    const lines = typeof input === "string" ? [input] : input;
    const replace = [];
    const color = newColor || this.track[id].color;
    const insert = this.track[id].insert;
    while (lines.length !== 0) {
      const line = lines.shift();
      if (insert) {
        replace.push(color ? color(line) : line);
      } else {
        replace.push(this.line + (color ? color(line) : line) + "\n");
      }
    }
    this.stack.splice(index, 1, ...replace);
    return this;
  }
  /**
   * Remove Line
   *
   * Removes a line at specific index
   *
   * @example
   * // Assuming the stack contains the following:
   * [
   *   '│ foo',
   *   '│ bar',
   *   '│ baz'
   * ]
   *
   * // Calling .remove(0) will remove first index
   * [
   *   '│ bar',
   *   '│ baz'
   * ]
   */
  Remove(index) {
    this.stack.splice(index, 1);
    return this;
  }
  /**
   * Replace and persist
   *
   * Replaces an entry at the provided index. Line is prefixed and not required in `input`
   *
   * @example
   * _.Replace(1, 'qux')
   *
   * // Before
   * [ '│ foo', '│ bar', '│ baz' ]
   *
   * // After
   * [ '│ foo', '│ qux', '│ baz' ]
   */
  Replace(index, input, color) {
    if (this.stack[index]) {
      this.stack[index] = this.line + (color ? color(input) : input) + "\n";
    }
    return this;
  }
  /**
   * Tree Horizontal Line
   *
   * Prints a horizontal line separator which will default to
   * spanning the `wrap` of the terminal pane.
   *
   * ```bash
   * │\n
   * ├─────────────────────\n
   * │\n
   * ```
   */
  Ruler(width = undefined) {
    if (width === undefined) width = tsize().wrap;
    this.stack.push(Tree.trim + "\n" + lightGray("\u251C".concat("\u2500".repeat(width))) + "\n" + Tree.trim + "\n");
    return this;
  }
  /**
   * Returns the current text index in the stack
   */
  get index() {
    return this.stack.length - 1;
  }
  /**
   * Tree Newline
   *
   * Works the same as `Newline()` but is exposed as getter
   *
   * ```bash
   * │\n
   * ```
   */
  get NL() {
    this.stack.push(this.trim + "\n");
    return this;
  }
  /**
   * Newline only
   *
   * Pushed a newline into the stack
   *
   * ```bash
   * \n
   * ```
   */
  get BR() {
    this.stack.push("\n");
    return this;
  }
  /**
   * Tree Pop
   *
   * Removes the last entry in the message stack.
   *
   * ```bash
   * │\n
   * ```
   *
   * @example
   * // Assuming the stack contains the following:
   * [
   *   '│ foo',
   *   '│ bar',
   *   '│ baz'
   * ]
   *
   * // Calling .pop() will remove the last entry:
   * [
   *   '│ foo',
   *   '│ bar'
   * ]
   */
  Pop() {
    this.stack.pop();
    return this;
  }
  /**
   * Tree Newline
   *
   * Returns a newline, accepts `addLines` parameter that accepts a `number`
   * and when provided will generate multiple newlines. In addition (or optionally)
   * a `color` can be provided, which expects a valid color string name.
   *
   * ```bash
   * │\n
   * ```
   *
   * ---
   *
   * **Passing Color**
   *
   * Passing `Newlines('red')` will a line in red.
   *
   * ```bash
   * │\n
   * ```
   *
   * ---
   *
   * **Passing Lines and Color**
   *
   * Passing `Newlines(2, 'red')` will generate the following string in red.
   *
   * ```bash
   * │\n
   * │\n
   * ```
   */
  Newline(addLines, color) {
    if (typeof addLines === "number") {
      let input = this.trim + "\n";
      if (color) {
        if (color === "yellow") {
          input = Tree.yellowTrim + "\n";
        } else if (color === "red") {
          input = Tree.redTrim + "\n";
        } else if (color === "") {
          input = "\n";
        }
      }
      for (let i = 0; i < addLines; i++) this.stack.push(input);
    } else {
      if (addLines === "") {
        this.stack.push("\n");
      } else if (addLines === "line") {
        this.stack.push(Tree.trim + "\n");
      } else if (addLines === "yellow") {
        this.stack.push(Tree.yellowTrim + "\n");
      } else if (addLines === "red") {
        this.stack.push(Tree.redTrim + "\n");
      } else {
        this.stack.push(this.trim + "\n");
      }
    }
    return this;
  }
  /**
   * Tree Inline
   *
   * Appends to the previous entry. If no entries exist in the message, a new one is
   * created with tree line prefix.
   *
   * > Use `Push()` method to insert entry without line prefix.
   *
   * @example
   * _.Inline('baz qux')
   *
   * // Before
   * [ '│ hello', '│ foo bar\n' ]
   *
   * // After
   * [ '│ hello', '│ foo bar baz qux\n' ]
   *
   * // If the stack is empty, default behaviour applied
   *
   * // Before
   * []
   *
   * // After
   * [ '│ baz qux' ]
   */
  Inline(input, ...options) {
    let index = this.stack.length > 0 ? this.stack.length - 1 : NaN;
    let color = null;
    if (options.length > 0) {
      if (options.length === 2) {
        index = options[0];
        color = options[1];
      } else if (options.length === 1) {
        if (typeof options[0] === "number") {
          index = options[0];
        } else {
          color = options[0];
        }
      }
    }
    if (index > -1) {
      this.stack[index] = this.stack[index].trimEnd() + " " + (color ? color(input) : input) + "\n";
    } else {
      this.stack.push(this.line + (color ? color(input) : input) + "\n");
    }
    return this;
  }
  /**
   * Tree Insert
   *
   * Pushes input onto the stack, but does not prefix line or append newline.
   * Inserts the `input` as is, and accepts an optional `color` function.
   *
   * @example
   * _.Insert('bar baz qux')
   *
   * // Before
   * [ '│ hello', '│ foo' ]
   *
   * // After
   * [ '│ hello', '│ foo', 'bar baz qux' ]
   */
  Insert(input, color) {
    this.stack.push(color ? color(input) : input);
    return this;
  }
  /**
   * Tree Line
   *
   * Pushes a string onto the message stack. Prefixes with a `│` and
   * suffixes with newline `\n`. This is _typically_ the most common method.
   *
   * ```bash
   * │ input\n
   * ```
   *
   * @example
   * _.Line('world')
   *
   * // Before
   * [ '│ hello\n' ]
   *
   * // After
   * [ '│ hello\n', '│ world\n' ]
   */
  Line(input, color) {
    if (this.type === "error") return this.Error(input, color);
    if (this.type === "warning") return this.Warn(input, color);
    this.stack.push(this.line + (color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Tree Error Line (red)
   *
   * Same as `Line()` but tree line suffix is `red`
   *
   * ```bash
   * │ input\n
   * ```
   */
  Error(input, color) {
    this.stack.push(Tree.red + (color ? color(input) : red2(input)) + "\n");
    return this;
  }
  /**
   * Tree Warn Line (yellow)
   *
   * Same as `Line()` but tree line suffix is `yellow`
   *
   * ```bash
   * │ input\n
   * ```
   */
  Warn(input, color) {
    this.stack.push(Tree.yellow + (color ? color(input) : yellow2(input)) + "\n");
    return this;
  }
  /**
   * Tree Line Break
   *
   * Appends and Prepends newlines, effectively wrapping the `input` in
   * paragraphical format.
   *
   * ```bash
   * │\n
   * │ input\n
   * │\n
   * ```
   */
  Break(input, color) {
    this.stack.push(this.trim + "\n" + this.line + (color ? color(input) : input) + "\n" + this.trim + "\n");
    return this;
  }
  /**
   * Tree Top
   *
   * ```bash
   * \n
   * ┌─ Label ~ 01:59:20\n
   * ```
   */
  Top(label) {
    this.stack.push(Top(label) + "\n");
    return this;
  }
  /**
   * Tree End
   *
   * Returns a tree ender with optional timestamp suffix appended.
   * Timestamp suffix defaults to `true` and will be applied.
   *
   * ```bash
   * # Passing true to timestamp (default)
   * └─ input ~ 01:59:20\n
   *
   * # Passing false to timestamp
   * └─ input\n
   * ```
   */
  End(input, timestamp = true) {
    this.stack.push(End(input));
    return this;
  }
  /**
   * Tree Context
   *
   * Accepts a contextual model. The context will be parsed and
   * pushed onto the stack.
   *
   * ```bash
   * │
   * │ code:      422
   * │ file:     ~source/dir/filename.liquid
   * │ status:    Unprocessed Entity
   * │
   * │ Type s and press enter to view stack trace
   * ```
   */
  Context(data) {
    this.stack.push(Context(data) + "\n");
    return this;
  }
  /**
   * Tree Dash
   *
   * Applies prefixed tree dash to input
   *
   * ```bash
   * ├─ input\n
   * ```
   */
  Dash(input, color) {
    this.stack.push(Tree.dash + (color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Tree Multiline
   *
   * Prefixes a multiline string with tree line. This method does
   * not apply wrap, but instead applies a `.split('\n')` on string
   * input (if single string is passed). The method accepts `...string`
   * spread or `string[]` parameter value.
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   *
   * @example
   * // Passing a string with newlines
   * _.Multline('hello\nworld') => [ '│ hello\n', '│ world\n' ]
   *
   * // Passing an array of strings
   * _.Multline(['hello', 'world']) => [ '│ hello\n', '│ world\n' ]
   *
   * // Passing a spread
   *  _.Multline('hello', 'world') => [ '│ hello\n', '│ world\n' ]
   */
  Multiline(...input) {
    const lines = typeof input[0] === "string" ? input.length === 1 ? input[0].split("\n") : input : input[0];
    while (lines.length !== 0) {
      this.stack.push(this.line + lines.shift() + "\n");
    }
    return this;
  }
  /**
   * Tree Wrap
   *
   * Accepts `string[]` or `...string[]` spread. The last entry accepts an
   * optional Ansis color. The **input** will be passed to {@link Wrap} and the
   * returning output will end with newline.
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Wrap(...input) {
    const style = { line: this.line };
    if (this.type === "error") {
      style.color = red2;
    } else if (this.type === "warning") {
      style.color = yellow2;
    } else {
      style.color = whiteBright2;
    }
    if (typeof input[0] === "string") {
      if (typeof input[input.length - 1] === "function") style.color = input.pop();
      this.stack.push(Wrap(input, style) + "\n");
    } else if (Array.isArray(input[0])) {
      if (typeof input[1] === "function") style.color = input.pop();
      this.stack.push(Wrap(input[0], style) + "\n");
    }
    return this;
  }
}, __name(_a, "Message"), _a);
function Create(options = undefined) {
  if (options === undefined) {
    options = { type: "", tree: true };
  } else {
    if ("text" in options) {
      options.stack = options.text;
      delete options.text;
    }
    Object.assign({ type: "", tree: true }, options);
  }
  return new Message(options);
}
__name(Create, "Create");
var base_exports = {};
__export(base_exports, {
  beep: /* @__PURE__ */ __name(() => beep, "beep"),
  clearScreen: /* @__PURE__ */ __name(() => clearScreen, "clearScreen"),
  clearTerminal: /* @__PURE__ */ __name(() => clearTerminal, "clearTerminal"),
  cursorBackward: /* @__PURE__ */ __name(() => cursorBackward, "cursorBackward"),
  cursorDown: /* @__PURE__ */ __name(() => cursorDown, "cursorDown"),
  cursorForward: /* @__PURE__ */ __name(() => cursorForward, "cursorForward"),
  cursorGetPosition: /* @__PURE__ */ __name(() => cursorGetPosition, "cursorGetPosition"),
  cursorHide: /* @__PURE__ */ __name(() => cursorHide, "cursorHide"),
  cursorLeft: /* @__PURE__ */ __name(() => cursorLeft, "cursorLeft"),
  cursorMove: /* @__PURE__ */ __name(() => cursorMove, "cursorMove"),
  cursorNextLine: /* @__PURE__ */ __name(() => cursorNextLine, "cursorNextLine"),
  cursorPrevLine: /* @__PURE__ */ __name(() => cursorPrevLine, "cursorPrevLine"),
  cursorRestorePosition: /* @__PURE__ */ __name(() => cursorRestorePosition, "cursorRestorePosition"),
  cursorSavePosition: /* @__PURE__ */ __name(() => cursorSavePosition, "cursorSavePosition"),
  cursorShow: /* @__PURE__ */ __name(() => cursorShow, "cursorShow"),
  cursorTo: /* @__PURE__ */ __name(() => cursorTo, "cursorTo"),
  cursorUp: /* @__PURE__ */ __name(() => cursorUp, "cursorUp"),
  enterAlternativeScreen: /* @__PURE__ */ __name(() => enterAlternativeScreen, "enterAlternativeScreen"),
  eraseDown: /* @__PURE__ */ __name(() => eraseDown, "eraseDown"),
  eraseEndLine: /* @__PURE__ */ __name(() => eraseEndLine, "eraseEndLine"),
  eraseLine: /* @__PURE__ */ __name(() => eraseLine, "eraseLine"),
  eraseLines: /* @__PURE__ */ __name(() => eraseLines, "eraseLines"),
  eraseScreen: /* @__PURE__ */ __name(() => eraseScreen, "eraseScreen"),
  eraseStartLine: /* @__PURE__ */ __name(() => eraseStartLine, "eraseStartLine"),
  eraseUp: /* @__PURE__ */ __name(() => eraseUp, "eraseUp"),
  exitAlternativeScreen: /* @__PURE__ */ __name(() => exitAlternativeScreen, "exitAlternativeScreen"),
  iTerm: /* @__PURE__ */ __name(() => iTerm, "iTerm"),
  image: /* @__PURE__ */ __name(() => image, "image"),
  link: /* @__PURE__ */ __name(() => link, "link"),
  scrollDown: /* @__PURE__ */ __name(() => scrollDown, "scrollDown"),
  scrollUp: /* @__PURE__ */ __name(() => scrollUp, "scrollUp")
});
var _a2;
var isBrowser = ((_a2 = globalThis.window) == null ? undefined : _a2.document) !== undefined;
var _a7, _b5;
((_b5 = (_a7 = globalThis.navigator) == null ? undefined : _a7.userAgent) == null ? undefined : _b5.includes("jsdom")) === true;
var _a8, _b6;
var platform2 = (_b6 = (_a8 = globalThis.navigator) == null ? undefined : _a8.userAgentData) == null ? undefined : _b6.platform;
var _a9, _b7, _c, _d;
platform2 === "macOS" || ((_a9 = globalThis.navigator) == null ? undefined : _a9.platform) === "MacIntel" || ((_c = (_b7 = globalThis.navigator) == null ? undefined : _b7.userAgent) == null ? undefined : _c.includes(" Mac ")) === true || ((_d = globalThis.process) == null ? undefined : _d.platform) === "darwin";
var _a11, _b9, _c2, _d2, _e;
platform2 === "Linux" || ((_b9 = (_a11 = globalThis.navigator) == null ? undefined : _a11.platform) == null ? undefined : _b9.startsWith("Linux")) === true || ((_d2 = (_c2 = globalThis.navigator) == null ? undefined : _c2.userAgent) == null ? undefined : _d2.includes(" Linux ")) === true || ((_e = globalThis.process) == null ? undefined : _e.platform) === "linux";
var _a13, _b11, _c4, _d3;
platform2 === "Android" || ((_a13 = globalThis.navigator) == null ? undefined : _a13.platform) === "Android" || ((_c4 = (_b11 = globalThis.navigator) == null ? undefined : _b11.userAgent) == null ? undefined : _c4.includes(" Android ")) === true || ((_d3 = globalThis.process) == null ? undefined : _d3.platform) === "android";
var ESC = "\x1B[";
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var isTerminalApp = !isBrowser && process4__default.default.env.TERM_PROGRAM === "Apple_Terminal";
var isWindows2 = !isBrowser && process4__default.default.platform === "win32";
var cwdFunction = isBrowser ? () => {
  throw new Error("`process.cwd()` only works in Node.js, not the browser.");
} : process4__default.default.cwd;
var cursorTo = /* @__PURE__ */ __name((x, y) => {
  if (typeof x !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  if (typeof y !== "number") {
    return ESC + (x + 1) + "G";
  }
  return ESC + (y + 1) + SEP + (x + 1) + "H";
}, "cursorTo");
var cursorMove = /* @__PURE__ */ __name((x, y) => {
  if (typeof x !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  let returnValue = "";
  if (x < 0) {
    returnValue += ESC + -x + "D";
  } else if (x > 0) {
    returnValue += ESC + x + "C";
  }
  if (y < 0) {
    returnValue += ESC + -y + "A";
  } else if (y > 0) {
    returnValue += ESC + y + "B";
  }
  return returnValue;
}, "cursorMove");
var cursorUp = /* @__PURE__ */ __name((count = 1) => ESC + count + "A", "cursorUp");
var cursorDown = /* @__PURE__ */ __name((count = 1) => ESC + count + "B", "cursorDown");
var cursorForward = /* @__PURE__ */ __name((count = 1) => ESC + count + "C", "cursorForward");
var cursorBackward = /* @__PURE__ */ __name((count = 1) => ESC + count + "D", "cursorBackward");
var cursorLeft = ESC + "G";
var cursorSavePosition = isTerminalApp ? "\x1B7" : ESC + "s";
var cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC + "u";
var cursorGetPosition = ESC + "6n";
var cursorNextLine = ESC + "E";
var cursorPrevLine = ESC + "F";
var cursorHide = ESC + "?25l";
var cursorShow = ESC + "?25h";
var eraseLines = /* @__PURE__ */ __name((count) => {
  let clear2 = "";
  for (let i = 0; i < count; i++) {
    clear2 += eraseLine + (i < count - 1 ? cursorUp() : "");
  }
  if (count) {
    clear2 += cursorLeft;
  }
  return clear2;
}, "eraseLines");
var eraseEndLine = ESC + "K";
var eraseStartLine = ESC + "1K";
var eraseLine = ESC + "2K";
var eraseDown = ESC + "J";
var eraseUp = ESC + "1J";
var eraseScreen = ESC + "2J";
var scrollUp = ESC + "S";
var scrollDown = ESC + "T";
var clearScreen = "\x1Bc";
var clearTerminal = isWindows2 ? "".concat(eraseScreen).concat(ESC, "0f") : "".concat(eraseScreen).concat(ESC, "3J").concat(ESC, "H");
var enterAlternativeScreen = ESC + "?1049h";
var exitAlternativeScreen = ESC + "?1049l";
var beep = BEL;
var link = /* @__PURE__ */ __name((text, url) => [
  OSC,
  "8",
  SEP,
  SEP,
  url,
  BEL,
  text,
  OSC,
  "8",
  SEP,
  SEP,
  BEL
].join(""), "link");
var image = /* @__PURE__ */ __name((data, options = {}) => {
  let returnValue = "".concat(OSC, "1337;File=inline=1");
  if (options.width) {
    returnValue += ";width=".concat(options.width);
  }
  if (options.height) {
    returnValue += ";height=".concat(options.height);
  }
  if (options.preserveAspectRatio === false) {
    returnValue += ";preserveAspectRatio=0";
  }
  return returnValue + ":" + Buffer.from(data).toString("base64") + BEL;
}, "image");
var iTerm = {
  setCwd: /* @__PURE__ */ __name((cwd2 = cwdFunction()) => "".concat(OSC, "50;CurrentDir=").concat(cwd2).concat(BEL), "setCwd"),
  annotation(message, options = {}) {
    let returnValue = "".concat(OSC, "1337;");
    const hasX = options.x !== undefined;
    const hasY = options.y !== undefined;
    if ((hasX || hasY) && !(hasX && hasY && options.length !== undefined)) {
      throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
    }
    message = message.replaceAll("|", "");
    returnValue += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
    if (options.length > 0) {
      returnValue += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join("|");
    } else {
      returnValue += message;
    }
    return returnValue + BEL;
  }
};
var copyProperty = /* @__PURE__ */ __name((to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
}, "copyProperty");
var canCopyProperty = /* @__PURE__ */ __name(function(toDescriptor, fromDescriptor) {
  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
}, "canCopyProperty");
var changePrototype = /* @__PURE__ */ __name((to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
}, "changePrototype");
var wrappedToString = /* @__PURE__ */ __name((withName, fromBody) => "/* Wrapped ".concat(withName, "*/\n").concat(fromBody), "wrappedToString");
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = /* @__PURE__ */ __name((to, from, name) => {
  const withName = name === "" ? "" : "with ".concat(name.trim(), "() ");
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
}, "changeToString");
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}
__name(mimicFunction, "mimicFunction");
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = /* @__PURE__ */ __name((function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = /* @__PURE__ */ __name(function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = undefined;
    } else if (options.throw === true) {
      throw new Error("Function `".concat(functionName, "` can only be called once"));
    }
    return returnValue;
  }, "onetime2");
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
}, "onetime");
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error("The given function `".concat(function_.name, "` is not wrapped by the `onetime` package"));
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}
var processOk = /* @__PURE__ */ __name((process7) => !!process7 && typeof process7 === "object" && typeof process7.removeListener === "function" && typeof process7.emit === "function" && typeof process7.reallyExit === "function" && typeof process7.listeners === "function" && typeof process7.kill === "function" && typeof process7.pid === "number" && typeof process7.on === "function", "processOk");
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var _a14;
var Emitter = (_a14 = class {
  constructor() {
    __publicField(this, "emitted", {
      afterExit: false,
      exit: false
    });
    __publicField(this, "listeners", {
      afterExit: [],
      exit: []
    });
    __publicField(this, "count", 0);
    __publicField(this, "id", Math.random());
    if (global[kExitEmitter]) {
      return global[kExitEmitter];
    }
    ObjectDefineProperty(global, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
}, __name(_a14, "Emitter"), _a14);
var _a15;
var SignalExitBase = (_a15 = class {
}, __name(_a15, "SignalExitBase"), _a15);
var signalExitWrap = /* @__PURE__ */ __name((handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
}, "signalExitWrap");
var _a16;
var SignalExitFallback = (_a16 = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
}, __name(_a16, "SignalExitFallback"), _a16);
var _hupSig, _emitter, _process, _originalProcessEmit, _originalProcessReallyExit, _sigListeners, _loaded, __this_instances, processReallyExit_fn, processEmit_fn, _a17;
var SignalExit = (_a17 = class extends SignalExitBase {
  constructor(process7) {
    super();
    __privateAdd(this, __this_instances);
    // "SIGHUP" throws an `ENOSYS` error on Windows,
    // so use a supported signal instead
    /* c8 ignore start */
    __privateAdd(this, _hupSig, process3.platform === "win32" ? "SIGINT" : "SIGHUP");
    /* c8 ignore stop */
    __privateAdd(this, _emitter, new Emitter());
    __privateAdd(this, _process);
    __privateAdd(this, _originalProcessEmit);
    __privateAdd(this, _originalProcessReallyExit);
    __privateAdd(this, _sigListeners, {});
    __privateAdd(this, _loaded, false);
    __privateSet(this, _process, process7);
    __privateSet(this, _sigListeners, {});
    for (const sig of signals) {
      __privateGet(this, _sigListeners)[sig] = () => {
        const listeners = __privateGet(this, _process).listeners(sig);
        let { count } = __privateGet(this, _emitter);
        const p = process7;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = __privateGet(this, _emitter).emit("exit", null, sig);
          const s = sig === "SIGHUP" ? __privateGet(this, _hupSig) : sig;
          if (!ret)
            process7.kill(process7.pid, s);
        }
      };
    }
    __privateSet(this, _originalProcessReallyExit, process7.reallyExit);
    __privateSet(this, _originalProcessEmit, process7.emit);
  }
  onExit(cb, opts) {
    if (!processOk(__privateGet(this, _process))) {
      return () => {
      };
    }
    if (__privateGet(this, _loaded) === false) {
      this.load();
    }
    const ev = (opts == null ? undefined : opts.alwaysLast) ? "afterExit" : "exit";
    __privateGet(this, _emitter).on(ev, cb);
    return () => {
      __privateGet(this, _emitter).removeListener(ev, cb);
      if (__privateGet(this, _emitter).listeners["exit"].length === 0 && __privateGet(this, _emitter).listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (__privateGet(this, _loaded)) {
      return;
    }
    __privateSet(this, _loaded, true);
    __privateGet(this, _emitter).count += 1;
    for (const sig of signals) {
      try {
        const fn = __privateGet(this, _sigListeners)[sig];
        if (fn)
          __privateGet(this, _process).on(sig, fn);
      } catch (_) {
      }
    }
    __privateGet(this, _process).emit = (ev, ...a) => {
      return __privateMethod(this, __this_instances, processEmit_fn).call(this, ev, ...a);
    };
    __privateGet(this, _process).reallyExit = (code) => {
      return __privateMethod(this, __this_instances, processReallyExit_fn).call(this, code);
    };
  }
  unload() {
    if (!__privateGet(this, _loaded)) {
      return;
    }
    __privateSet(this, _loaded, false);
    signals.forEach((sig) => {
      const listener = __privateGet(this, _sigListeners)[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        __privateGet(this, _process).removeListener(sig, listener);
      } catch (_) {
      }
    });
    __privateGet(this, _process).emit = __privateGet(this, _originalProcessEmit);
    __privateGet(this, _process).reallyExit = __privateGet(this, _originalProcessReallyExit);
    __privateGet(this, _emitter).count -= 1;
  }
}, _hupSig = new WeakMap(), _emitter = new WeakMap(), _process = new WeakMap(), _originalProcessEmit = new WeakMap(), _originalProcessReallyExit = new WeakMap(), _sigListeners = new WeakMap(), _loaded = new WeakMap(), __this_instances = new WeakSet(), processReallyExit_fn = /* @__PURE__ */ __name(function(code) {
  if (!processOk(__privateGet(this, _process))) {
    return 0;
  }
  __privateGet(this, _process).exitCode = code || 0;
  __privateGet(this, _emitter).emit("exit", __privateGet(this, _process).exitCode, null);
  return __privateGet(this, _originalProcessReallyExit).call(__privateGet(this, _process), __privateGet(this, _process).exitCode);
}, "#processReallyExit"), processEmit_fn = /* @__PURE__ */ __name(function(ev, ...args) {
  const og = __privateGet(this, _originalProcessEmit);
  if (ev === "exit" && processOk(__privateGet(this, _process))) {
    if (typeof args[0] === "number") {
      __privateGet(this, _process).exitCode = args[0];
    }
    const ret = og.call(__privateGet(this, _process), ev, ...args);
    __privateGet(this, _emitter).emit("exit", __privateGet(this, _process).exitCode, null);
    return ret;
  } else {
    return og.call(__privateGet(this, _process), ev, ...args);
  }
}, "#processEmit"), __name(_a17, "SignalExit"), _a17);
var process3 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process3) ? new SignalExit(process3) : new SignalExitFallback());
var terminal = process4__default.default.stderr.isTTY ? process4__default.default.stderr : process4__default.default.stdout.isTTY ? process4__default.default.stdout : undefined;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process4__default.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process4__default.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== undefined) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;
function isFullwidthCodePoint(codePoint) {
  if (!Number.isInteger(codePoint)) {
    return false;
  }
  return eastAsianWidth(codePoint) === 2;
}
__name(isFullwidthCodePoint, "isFullwidthCodePoint");
var ESCAPES2 = /* @__PURE__ */ new Set([27, 155]);
var CODE_POINT_0 = "0".codePointAt(0);
var CODE_POINT_9 = "9".codePointAt(0);
var endCodesSet = /* @__PURE__ */ new Set();
var endCodesMap = /* @__PURE__ */ new Map();
for (const [start, end] of ansi_styles_default.codes) {
  endCodesSet.add(ansi_styles_default.color.ansi(end));
  endCodesMap.set(ansi_styles_default.color.ansi(start), ansi_styles_default.color.ansi(end));
}
function getEndCode(code) {
  if (endCodesSet.has(code)) {
    return code;
  }
  if (endCodesMap.has(code)) {
    return endCodesMap.get(code);
  }
  code = code.slice(2);
  if (code.includes(";")) {
    code = code[0] + "0";
  }
  const returnValue = ansi_styles_default.codes.get(Number.parseInt(code, 10));
  if (returnValue) {
    return ansi_styles_default.color.ansi(returnValue);
  }
  return ansi_styles_default.reset.open;
}
__name(getEndCode, "getEndCode");
function findNumberIndex(string) {
  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index);
    if (codePoint >= CODE_POINT_0 && codePoint <= CODE_POINT_9) {
      return index;
    }
  }
  return -1;
}
__name(findNumberIndex, "findNumberIndex");
function parseAnsiCode(string, offset) {
  string = string.slice(offset, offset + 19);
  const startIndex = findNumberIndex(string);
  if (startIndex !== -1) {
    let endIndex = string.indexOf("m", startIndex);
    if (endIndex === -1) {
      endIndex = string.length;
    }
    return string.slice(0, endIndex + 1);
  }
}
__name(parseAnsiCode, "parseAnsiCode");
function tokenize(string, endCharacter = Number.POSITIVE_INFINITY) {
  const returnValue = [];
  let index = 0;
  let visibleCount = 0;
  while (index < string.length) {
    const codePoint = string.codePointAt(index);
    if (ESCAPES2.has(codePoint)) {
      const code = parseAnsiCode(string, index);
      if (code) {
        returnValue.push({
          type: "ansi",
          code,
          endCode: getEndCode(code)
        });
        index += code.length;
        continue;
      }
    }
    const isFullWidth2 = isFullwidthCodePoint(codePoint);
    const character = String.fromCodePoint(codePoint);
    returnValue.push({
      type: "character",
      value: character,
      isFullWidth: isFullWidth2
    });
    index += character.length;
    visibleCount += isFullWidth2 ? 2 : character.length;
    if (visibleCount >= endCharacter) {
      break;
    }
  }
  return returnValue;
}
__name(tokenize, "tokenize");
function reduceAnsiCodes(codes) {
  let returnValue = [];
  for (const code of codes) {
    if (code.code === ansi_styles_default.reset.open) {
      returnValue = [];
    } else if (endCodesSet.has(code.code)) {
      returnValue = returnValue.filter((returnValueCode) => returnValueCode.endCode !== code.code);
    } else {
      returnValue = returnValue.filter((returnValueCode) => returnValueCode.endCode !== code.endCode);
      returnValue.push(code);
    }
  }
  return returnValue;
}
__name(reduceAnsiCodes, "reduceAnsiCodes");
function undoAnsiCodes(codes) {
  const reduced = reduceAnsiCodes(codes);
  const endCodes = reduced.map(({ endCode }) => endCode);
  return endCodes.reverse().join("");
}
__name(undoAnsiCodes, "undoAnsiCodes");
function sliceAnsi(string, start, end) {
  const tokens2 = tokenize(string, end);
  let activeCodes = [];
  let position = 0;
  let returnValue = "";
  let include = false;
  for (const token of tokens2) {
    if (end !== undefined && position >= end) {
      break;
    }
    if (token.type === "ansi") {
      activeCodes.push(token);
      if (include) {
        returnValue += token.code;
      }
    } else {
      if (!include && position >= start) {
        include = true;
        activeCodes = reduceAnsiCodes(activeCodes);
        returnValue = activeCodes.map(({ code }) => code).join("");
      }
      if (include) {
        returnValue += token.value;
      }
      position += token.isFullWidth ? 2 : token.value.length;
    }
  }
  returnValue += undoAnsiCodes(activeCodes);
  return returnValue;
}
__name(sliceAnsi, "sliceAnsi");
var defaultTerminalHeight = 24;
var getWidth = /* @__PURE__ */ __name(({ columns = 80 }) => columns, "getWidth");
var fitToTerminalHeight = /* @__PURE__ */ __name((stream, text) => {
  const terminalHeight = stream.rows ?? defaultTerminalHeight;
  const lines = text.split("\n");
  const toRemove = Math.max(0, lines.length - terminalHeight);
  return toRemove ? sliceAnsi(text, stripAnsi(lines.slice(0, toRemove).join("\n")).length + 1) : text;
}, "fitToTerminalHeight");
function createLogUpdate(stream, { showCursor = false } = {}) {
  let previousLineCount = 0;
  let previousWidth = getWidth(stream);
  let previousOutput = "";
  const reset3 = /* @__PURE__ */ __name(() => {
    previousOutput = "";
    previousWidth = getWidth(stream);
    previousLineCount = 0;
  }, "reset3");
  const render = /* @__PURE__ */ __name((...arguments_) => {
    if (!showCursor) {
      cli_cursor_default.hide();
    }
    let output = fitToTerminalHeight(stream, arguments_.join(" ") + "\n");
    const width = getWidth(stream);
    if (output === previousOutput && previousWidth === width) {
      return;
    }
    previousOutput = output;
    previousWidth = width;
    output = wrapAnsi(output, width, { trim: false, hard: true, wordWrap: false });
    stream.write(base_exports.eraseLines(previousLineCount) + output);
    previousLineCount = output.split("\n").length;
  }, "render");
  render.clear = () => {
    stream.write(base_exports.eraseLines(previousLineCount));
    reset3();
  };
  render.done = () => {
    reset3();
    if (!showCursor) {
      cli_cursor_default.show();
    }
  };
  return render;
}
__name(createLogUpdate, "createLogUpdate");
createLogUpdate(process4__default.default.stdout);
createLogUpdate(process4__default.default.stderr);

// syncify/utils/const.ts
var DAY_IN_MS = 24 * 60 * 60 * 1e3;
var PATH_KEYS = [
  "assets",
  "config",
  "layout",
  "customers",
  "locales",
  "sections",
  "schema",
  "blocks",
  "snippets",
  "templates",
  "metaobject",
  "metafields",
  "pages",
  "redirects"
];
var UNITS = [
  "b",
  "kb",
  "mb",
  "gb",
  "tb"
];

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
var import_index2 = __toESM(require_eventemitter3());

// node_modules/.pnpm/p-timeout@6.1.4/node_modules/p-timeout/index.js
var _TimeoutError = class _TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
__name(_TimeoutError, "TimeoutError");
var TimeoutError = _TimeoutError;
var _AbortError = class _AbortError extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
__name(_AbortError, "AbortError");
var AbortError = _AbortError;
var getDOMException = /* @__PURE__ */ __name((errorMessage) => globalThis.DOMException === undefined ? new AbortError(errorMessage) : new DOMException(errorMessage), "getDOMException");
var getAbortedReason = /* @__PURE__ */ __name((signal) => {
  const reason = signal.reason === undefined ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
}, "getAbortedReason");
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  let abortHandler;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError("Expected `milliseconds` to be a positive number, got `".concat(milliseconds, "`"));
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      abortHandler = /* @__PURE__ */ __name(() => {
        reject(getAbortedReason(signal));
      }, "abortHandler");
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(undefined, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? "Promise timed out after ".concat(milliseconds, " milliseconds");
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
    if (abortHandler && options.signal) {
      options.signal.removeEventListener("abort", abortHandler);
    }
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(undefined, timer);
    timer = undefined;
  };
  return cancelablePromise;
}
__name(pTimeout, "pTimeout");

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/lower-bound.js
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}
__name(lowerBound, "lowerBound");

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/priority-queue.js
var _queue;
var _PriorityQueue = class _PriorityQueue {
  constructor() {
    __privateAdd(this, _queue, []);
  }
  enqueue(run, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run
    };
    if (this.size && __privateGet(this, _queue)[this.size - 1].priority >= options.priority) {
      __privateGet(this, _queue).push(element);
      return;
    }
    const index = lowerBound(__privateGet(this, _queue), element, (a, b) => b.priority - a.priority);
    __privateGet(this, _queue).splice(index, 0, element);
  }
  dequeue() {
    const item = __privateGet(this, _queue).shift();
    return item == null ? undefined : item.run;
  }
  filter(options) {
    return __privateGet(this, _queue).filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __privateGet(this, _queue).length;
  }
};
_queue = new WeakMap();
__name(_PriorityQueue, "PriorityQueue");
var PriorityQueue = _PriorityQueue;

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/index.js
var _carryoverConcurrencyCount, _isIntervalIgnored, _intervalCount, _intervalCap, _interval, _intervalEnd, _intervalId, _timeoutId, _queue2, _queueClass, _pending, _concurrency, _isPaused, _throwOnTimeout, _PQueue_instances, doesIntervalAllowAnother_get, doesConcurrentAllowAnother_get, next_fn, onResumeInterval_fn, isIntervalPaused_get, tryToStartAnother_fn, initializeIntervalIfNeeded_fn, onInterval_fn, processQueue_fn, throwOnAbort_fn, onEvent_fn;
var _PQueue = class _PQueue extends import_index2.default {
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    var _a19, _b12;
    super();
    __privateAdd(this, _PQueue_instances);
    __privateAdd(this, _carryoverConcurrencyCount);
    __privateAdd(this, _isIntervalIgnored);
    __privateAdd(this, _intervalCount, 0);
    __privateAdd(this, _intervalCap);
    __privateAdd(this, _interval);
    __privateAdd(this, _intervalEnd, 0);
    __privateAdd(this, _intervalId);
    __privateAdd(this, _timeoutId);
    __privateAdd(this, _queue2);
    __privateAdd(this, _queueClass);
    __privateAdd(this, _pending, 0);
    // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
    __privateAdd(this, _concurrency);
    __privateAdd(this, _isPaused);
    __privateAdd(this, _throwOnTimeout);
    /**
        Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
    
        Applies to each future operation.
        */
    __publicField(this, "timeout");
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError("Expected `intervalCap` to be a number from 1 and up, got `".concat(((_a19 = options.intervalCap) == null ? undefined : _a19.toString()) ?? "", "` (").concat(typeof options.intervalCap, ")"));
    }
    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError("Expected `interval` to be a finite number >= 0, got `".concat(((_b12 = options.interval) == null ? undefined : _b12.toString()) ?? "", "` (").concat(typeof options.interval, ")"));
    }
    __privateSet(this, _carryoverConcurrencyCount, options.carryoverConcurrencyCount);
    __privateSet(this, _isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0);
    __privateSet(this, _intervalCap, options.intervalCap);
    __privateSet(this, _interval, options.interval);
    __privateSet(this, _queue2, new options.queueClass());
    __privateSet(this, _queueClass, options.queueClass);
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    __privateSet(this, _throwOnTimeout, options.throwOnTimeout === true);
    __privateSet(this, _isPaused, options.autoStart === false);
  }
  get concurrency() {
    return __privateGet(this, _concurrency);
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError("Expected `concurrency` to be a number from 1 and up, got `".concat(newConcurrency, "` (").concat(typeof newConcurrency, ")"));
    }
    __privateSet(this, _concurrency, newConcurrency);
    __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      throwOnTimeout: __privateGet(this, _throwOnTimeout),
      ...options
    };
    return new Promise((resolve, reject) => {
      __privateGet(this, _queue2).enqueue(async () => {
        var _a19;
        __privateWrapper(this, _pending)._++;
        __privateWrapper(this, _intervalCount)._++;
        try {
          (_a19 = options.signal) == null ? undefined : _a19.throwIfAborted();
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), { milliseconds: options.timeout });
          }
          if (options.signal) {
            operation = Promise.race([operation, __privateMethod(this, _PQueue_instances, throwOnAbort_fn).call(this, options.signal)]);
          }
          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error) {
          if (error instanceof TimeoutError && !options.throwOnTimeout) {
            resolve();
            return;
          }
          reject(error);
          this.emit("error", error);
        } finally {
          __privateMethod(this, _PQueue_instances, next_fn).call(this);
        }
      }, options);
      this.emit("add");
      __privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this);
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!__privateGet(this, _isPaused)) {
      return this;
    }
    __privateSet(this, _isPaused, false);
    __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    __privateSet(this, _isPaused, true);
  }
  /**
  Clear the queue.
  */
  clear() {
    __privateSet(this, _queue2, new (__privateGet(this, _queueClass))());
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (__privateGet(this, _queue2).size === 0) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit) {
    if (__privateGet(this, _queue2).size < limit) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "next", () => __privateGet(this, _queue2).size < limit);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (__privateGet(this, _pending) === 0 && __privateGet(this, _queue2).size === 0) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "idle");
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return __privateGet(this, _queue2).size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return __privateGet(this, _queue2).filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return __privateGet(this, _pending);
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return __privateGet(this, _isPaused);
  }
};
_carryoverConcurrencyCount = new WeakMap();
_isIntervalIgnored = new WeakMap();
_intervalCount = new WeakMap();
_intervalCap = new WeakMap();
_interval = new WeakMap();
_intervalEnd = new WeakMap();
_intervalId = new WeakMap();
_timeoutId = new WeakMap();
_queue2 = new WeakMap();
_queueClass = new WeakMap();
_pending = new WeakMap();
_concurrency = new WeakMap();
_isPaused = new WeakMap();
_throwOnTimeout = new WeakMap();
_PQueue_instances = new WeakSet();
doesIntervalAllowAnother_get = /* @__PURE__ */ __name(function() {
  return __privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalCount) < __privateGet(this, _intervalCap);
}, "#doesIntervalAllowAnother");
doesConcurrentAllowAnother_get = /* @__PURE__ */ __name(function() {
  return __privateGet(this, _pending) < __privateGet(this, _concurrency);
}, "#doesConcurrentAllowAnother");
next_fn = /* @__PURE__ */ __name(function() {
  __privateWrapper(this, _pending)._--;
  __privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this);
  this.emit("next");
}, "#next");
onResumeInterval_fn = /* @__PURE__ */ __name(function() {
  __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  __privateMethod(this, _PQueue_instances, initializeIntervalIfNeeded_fn).call(this);
  __privateSet(this, _timeoutId, undefined);
}, "#onResumeInterval");
isIntervalPaused_get = /* @__PURE__ */ __name(function() {
  const now = Date.now();
  if (__privateGet(this, _intervalId) === undefined) {
    const delay2 = __privateGet(this, _intervalEnd) - now;
    if (delay2 < 0) {
      __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
    } else {
      if (__privateGet(this, _timeoutId) === undefined) {
        __privateSet(this, _timeoutId, setTimeout(() => {
          __privateMethod(this, _PQueue_instances, onResumeInterval_fn).call(this);
        }, delay2));
      }
      return true;
    }
  }
  return false;
}, "#isIntervalPaused");
tryToStartAnother_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet(this, _queue2).size === 0) {
    if (__privateGet(this, _intervalId)) {
      clearInterval(__privateGet(this, _intervalId));
    }
    __privateSet(this, _intervalId, undefined);
    this.emit("empty");
    if (__privateGet(this, _pending) === 0) {
      this.emit("idle");
    }
    return false;
  }
  if (!__privateGet(this, _isPaused)) {
    const canInitializeInterval = !__privateGet(this, _PQueue_instances, isIntervalPaused_get);
    if (__privateGet(this, _PQueue_instances, doesIntervalAllowAnother_get) && __privateGet(this, _PQueue_instances, doesConcurrentAllowAnother_get)) {
      const job = __privateGet(this, _queue2).dequeue();
      if (!job) {
        return false;
      }
      this.emit("active");
      job();
      if (canInitializeInterval) {
        __privateMethod(this, _PQueue_instances, initializeIntervalIfNeeded_fn).call(this);
      }
      return true;
    }
  }
  return false;
}, "#tryToStartAnother");
initializeIntervalIfNeeded_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalId) !== undefined) {
    return;
  }
  __privateSet(this, _intervalId, setInterval(() => {
    __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  }, __privateGet(this, _interval)));
  __privateSet(this, _intervalEnd, Date.now() + __privateGet(this, _interval));
}, "#initializeIntervalIfNeeded");
onInterval_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet(this, _intervalCount) === 0 && __privateGet(this, _pending) === 0 && __privateGet(this, _intervalId)) {
    clearInterval(__privateGet(this, _intervalId));
    __privateSet(this, _intervalId, undefined);
  }
  __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
  __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
}, "#onInterval");
/**
Executes all queued functions until it reaches the limit.
*/
processQueue_fn = /* @__PURE__ */ __name(function() {
  while (__privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this)) {
  }
}, "#processQueue");
throwOnAbort_fn = /* @__PURE__ */ __name(async function(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(signal.reason);
    }, { once: true });
  });
}, "#throwOnAbort");
onEvent_fn = /* @__PURE__ */ __name(async function(event2, filter) {
  return new Promise((resolve) => {
    const listener = /* @__PURE__ */ __name(() => {
      if (filter && !filter()) {
        return;
      }
      this.off(event2, listener);
      resolve();
    }, "listener");
    this.on(event2, listener);
  });
}, "#onEvent");
__name(_PQueue, "PQueue");
var PQueue = _PQueue;

// syncify/model/defaults.ts
var defaults = /* @__PURE__ */ __name(() => ({
  input: "source",
  output: "theme",
  import: "import",
  export: "export",
  config: ".",
  editor: null,
  paths: {
    assets: "assets/*",
    config: "config/*.json",
    layout: "layout/*.liquid",
    locales: "locales/*.json",
    metafields: "metafields/**/*.json",
    redirects: "redirects.yaml",
    schema: "schema/*.{schema,json}",
    templates: "templates/*",
    customers: "templates/customers/*",
    metaobject: "templates/metaobject/*",
    pages: "pages/*",
    snippets: "snippets/**/*.liquid",
    sections: "sections/**/*.{liquid,json}",
    blocks: "blocks/*.liquid"
  },
  transform: {
    svg: null,
    style: null,
    script: null,
    json: {
      crlf: false,
      indent: 2,
      useTab: false,
      sortObjects: false,
      stripComments: false,
      sortTargets: [],
      noSortList: [],
      terse: false
    },
    liquid: {
      terse: false
    }
  },
  spawn: {
    build: null,
    watch: null
  },
  hot: {
    server: 41001,
    socket: 51001,
    method: "hot",
    client: "inject",
    label: true,
    eject: true,
    layouts: [
      "theme.liquid"
    ],
    flags: [
      "--no-preview-bar"
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
}), "defaults");

// syncify/model/extends.ts
var _Stores = class _Stores extends Array {
  get default() {
    return this[0];
  }
  push(store) {
    const index = super.push(store);
    _Stores.map[store.name] = index - 1;
    return index;
  }
  set(name, store) {
    const index = _Stores.map[name];
    return index !== undefined ? assign(this[index], store) : undefined;
  }
  get(name) {
    const index = _Stores.map[name];
    return index !== undefined ? this[index] : undefined;
  }
  has(name) {
    const index = _Stores.map[name];
    return index !== undefined && this[index] !== undefined;
  }
};
__name(_Stores, "Stores");
__publicField(_Stores, "map", object());
var Stores = _Stores;
var _Targets = class _Targets extends Array {
  get raw() {
    return _Targets.raw;
  }
  set raw(raw) {
    _Targets.raw = raw;
  }
  get default() {
    return this[0];
  }
  push(theme) {
    const index = super.push(theme);
    _Targets.map[theme.target] = index - 1;
    return index;
  }
  set(name, theme) {
    const index = _Targets.map[name];
    return index !== undefined ? assign(this[index], theme) : undefined;
  }
  get(name) {
    const index = _Targets.map[name];
    return index !== undefined ? this[index] : undefined;
  }
  has(name) {
    const index = _Targets.map[name];
    return index !== undefined && this[index] !== undefined;
  }
};
__name(_Targets, "Targets");
__publicField(_Targets, "raw", object());
__publicField(_Targets, "map", object());
var Targets = _Targets;

// syncify/model/plugins.ts
var plugins = /* @__PURE__ */ __name(() => ({
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
}), "plugins");

// syncify/model/processor.ts
var processor = /* @__PURE__ */ __name(() => ({
  tailwind: {
    installed: false,
    loaded: false,
    file: false,
    map: null,
    config: null
  },
  sass: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      warnings: true,
      style: "compressed",
      sourcemap: true,
      quietDeps: false,
      include: ["node_modules"]
    }
  },
  esbuild: {
    tsconfig: undefined,
    bundle: true,
    format: "esm",
    globalName: undefined,
    target: "es2016",
    metafile: true,
    external: [],
    platform: "browser",
    splitting: false,
    sourcemap: "linked",
    write: false,
    logLevel: "silent",
    plugins: []
  },
  postcss: {
    file: false,
    config: []
  },
  svgo: {
    multipass: true,
    js2svg: {
      indent: 2,
      pretty: true
    },
    plugins: [
      "preset-default"
    ]
  }
}), "processor");

// syncify/model/$.ts
var paths = /* @__PURE__ */ __name(() => {
  const state = object();
  for (const path of PATH_KEYS) {
    state[path] = object({
      input: null,
      match: null,
      config: null,
      rename: []
    });
  }
  state.transforms = /* @__PURE__ */ new Map();
  return state;
}, "paths");
var pm = /* @__PURE__ */ __name(() => {
  if (!process4.env.npm_config_user_agent) return "?";
  const userAgent = process4.env.npm_config_user_agent;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return name === "npminstall" ? "cnpm" : name;
}, "pm");
var _a18;
var $ = new (_a18 = class {
  constructor() {
    /**
     * The user platform OS
     */
    __publicField(this, "platform", os.platform());
    /**
     * The Syncify Github Repository
     */
    __publicField(this, "github", "https://github.com/panoply/syncify.git");
    /**
     * The version of Syncify running
     */
    __publicField(this, "version", "1.0.0-alpha.1");
    /**
     * **READY AT RUNTIME**
     *
     * Home or temporary directory if home fails
     *
     * @example
     * '/Users/sissel/.syncify'
     */
    __publicField(this, "home", path.join(os.homedir(), ".syncify"));
    /**
     * The provided command passed on the CLI.
     *
     * > The references sliced[2] copy of `process.argv`
     */
    __publicField(this, "argv");
    /**
     * The path to node.js binary
     */
    __publicField(this, "node");
    /**
     * The path to the script binary being run
     */
    __publicField(this, "bin");
    /**
     * Model representing the shopify stores
     */
    __publicField(this, "stores", new Stores());
    /**
     * Model representing the shopify themes
     * Each theme can access their associated {@link Stores}
     */
    __publicField(this, "target", new Targets());
    /**
     * Cache copy of the invoked commands in which syncify was started.
     * By default, this structure will assign `target` and `filter` entries
     * only, as they are parsed and handled in their own respective define
     * operations.
     */
    __publicField(this, "cmd", object({
      target: [],
      filter: [],
      batch: 14
    }));
    /**
     * Whether or not synicfy is running.
      */
    __publicField(this, "running", false);
    /**
     * **READY AT RUNTIME**
     *
     * The current working directory
     *
     * @example
     * '/Users/sissel/projects/site-name'
     */
    __publicField(this, "cwd", process4.cwd());
    /**
     * **READY AT RUNTIME**
     *
     * Encoded checksum of the CWD
     *
     * @example
     * 'eb4e712f2f3970b7'
     */
    __publicField(this, "hash", checksum(this.cwd));
    /**
     * **READY AT RUNTIME**
     *
     * Root directory base
     *
     * @example
      * '/Users/sissel/.syncify/eb4e712f2f3970b7'
      */
    __publicField(this, "root", path.join(this.home, this.hash));
    /**
     * Base directory path references. These are fully resolved absolute URI
     * paths pointing to all base directory locations, included cached locations.
     */
    __publicField(this, "dirs", object({
      module: null,
      config: null,
      export: null,
      import: null,
      input: null,
      output: null,
      hot: path.join(this.root, "hot"),
      cache: path.join(this.root, "cache"),
      versions: path.join(this.root, "versions"),
      sourcemaps: {
        root: path.join(this.root, "sourcemaps"),
        scripts: path.join(this.root, "sourcemaps", "scripts"),
        styles: path.join(this.root, "sourcemaps", "styles")
      }
    }));
    /**
     * Configuration file path resolutions for `syncify.config` and `package.json`
     * and other required files.
     */
    __publicField(this, "file", object({
      keychain: path.join(this.home, ".keychain"),
      pkg: path.join(this.cwd, "package.json"),
      notifier: path.join(this.home, "icon.png"),
      project: null,
      tsconfig: null,
      targets: null,
      env: null,
      config: null,
      githook: null
    }));
    /**
     * Global keychain for store access tokens stored in home
     */
    __publicField(this, "keychain", null);
    /**
     * The project store which references the parsed cache project file. This reference
     * is a `Proxy` type and will apply atomic writes to the project cache file.
     * The data this reference holds lives in the root project location of the users OS.
     *
     * > This will be `null` and populated at runtime in one of the first operations to occur.
     */
    __publicField(this, "project", null);
    /**
     * The installation binary being used
     */
    __publicField(this, "using", null);
    /**
     * Process Child
     */
    __publicField(this, "process", null);
    /**
     * Whether or not to restart process
     */
    __publicField(this, "restart", false);
    /**
     * Websockets HOT reloading instance
     *
     * @default null
     */
    __publicField(this, "wss", null);
    /**
     * Stats information for the output directory
     *
     * @default null
     */
    __publicField(this, "stats", object());
    /**
     * CLI provided filters
     *
     * @default null
     */
    __publicField(this, "filters", object());
    /**
     * Error store, holds reference to errors
     *
     * @default Set<string>
     */
    __publicField(this, "errors", /* @__PURE__ */ new Set());
    /**
     * Error store, holds reference to errors
     *
     * The file uri input path - The `Map` will hold
     * process identifier and a `Set` of stack messages.
     *
     * @default
     * {}
     */
    __publicField(this, "warnings", /* @__PURE__ */ new Map());
    /**
     * Directory structure paths.
     *
     * Includes a special `transforms` Map reference for transform related files
     * which may potentially be using an extension that would lead to it being identified
     * as a different file type. This occurs when (for example) a snippet generated transform
     * is set as an output.
     *
     * >**NOTE**
     * >
     * > The `transform` option will point to resolved file names and the values for each entry
     * > will equal an enum `Type` number. The following transforms are identifiable:
     *
     * - `7` > `Type.Style`
     * - `8` > `Type.Script`
     * - `9` > `Type.SVG`
     */
    __publicField(this, "paths", paths());
    /**
     * Execution options which describe the invocation and operation
     * instructions Syncify was initialised.
     *
     * @default
     * {
     *  cli: false,
     *  dev: true,
     *  prod: false
     *  sync: 0,
     *  vars: {}
     * }
     */
    __publicField(this, "env", object({
      dev: true,
      cli: false,
      tree: false,
      prod: false,
      ready: false,
      sync: 0,
      vars: null
    }));
    __publicField(this, "git", {});
    /**
     * Version Control settings
     */
    __publicField(this, "vc", object({
      cache: null,
      source: 1,
      dir: null,
      number: null,
      zip: null,
      patch: 0,
      major: 0,
      minor: 0,
      update: null
    }));
    /**
     * Hot reload mode options - Use the `mode.hot` reference to
     * determine whether or not HOT reloading is enabled.
     */
    __publicField(this, "hot", object({
      source: null,
      route: null,
      server: 41001,
      socket: 51001,
      label: true,
      eject: true,
      method: "hot",
      client: "inject",
      alias: {},
      layouts: [
        "theme.liquid"
      ],
      version: object({
        source: null,
        remote: null,
        local: "0.4.9"
      }),
      flags: object({
        "no-preview-bar": true,
        "no-checkout-preloads": false,
        "no-perfkit": false,
        "no-trekkie": false,
        "no-shopify-features": false,
        "no-web-pixels-manager": false
      }),
      cache: object({
        root: null,
        snippet: null,
        layouts: []
      }),
      alive: object({
        snippet: false,
        layouts: object()
      })
    }));
    /**
     * Log State
     */
    __publicField(this, "log", object({
      idle: false,
      group: "Syncify",
      mode: "watch",
      title: "",
      uri: "",
      listen: null,
      thrown: null,
      queue: /* @__PURE__ */ new Set(),
      changes: object()
    }));
    __publicField(this, "bulk", object({
      update: [],
      delete: [],
      complete: 0,
      transfroms: 0,
      uploaded: 0,
      progress: null,
      errors: /* @__PURE__ */ new Map(),
      synced: /* @__PURE__ */ new Set(),
      warnings: /* @__PURE__ */ new Map(),
      log: Create().NL.Template("C", { placeholder: true, color: neonCyan }).Template("T", { placeholder: true }).Template("U", { placeholder: true, color: neonGreen, insert: true }).Newline()
    }));
    /**
     * The operation mode executing
     *
     * @default false // all modes are false by default
     */
    __publicField(this, "mode", object({
      _: null,
      bind: false,
      build: false,
      clean: false,
      bulk: false,
      create: false,
      doctor: false,
      dev: false,
      export: false,
      force: false,
      git: false,
      help: false,
      hot: false,
      import: false,
      projects: false,
      inspect: false,
      keychain: false,
      main: false,
      metafields: false,
      pages: false,
      prod: false,
      prompt: false,
      prune: false,
      publish: false,
      pull: false,
      push: false,
      stash: false,
      redirects: false,
      liquid: false,
      json: false,
      script: false,
      style: false,
      svg: false,
      setup: false,
      suggest: false,
      terse: false,
      theme: false,
      unpublished: false,
      version: false,
      watch: false
    }));
    /**
     * Spawn related configuration operations
     */
    __publicField(this, "spawn", object({
      paths: /* @__PURE__ */ new Set(),
      streams: /* @__PURE__ */ new Map(),
      commands: object(),
      invoked: false
    }));
    /**
     * Section sub-directory configuration
     *
     * @todo
     * Allow anymatch global patterns
     *
     * @default
     * {
     *   prefixDir: false,
     *   separator: '-',
     *   global: null
     * }
     */
    __publicField(this, "section", object({
      schema: null,
      shared: /* @__PURE__ */ new Map(),
      template: object()
    }));
    /**
     * Page transforms
     *
     * Populated during the setPages options generation
     */
    __publicField(this, "page", null);
    /**
     * Script transforms
     *
     * @default []
     */
    __publicField(this, "script", []);
    /**
     * Style tranforms
     *
     * @default []
     */
    __publicField(this, "style", []);
    /**
     * SVG transforms
     *
     * @default []
     */
    __publicField(this, "svg", []);
    /**
     * Liquid Transforms
     *
     * @default []
     */
    __publicField(this, "liquid", object({
      terse: {
        enabled: false,
        exclude: null,
        liquid: {
          minifySchema: true
        },
        markup: {
          // EXPOSED
          //
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeComments: true,
          // OVERRIDES
          //
          caseSensitive: false,
          collapseBooleanAttributes: false,
          collapseInlineTagWhitespace: false,
          conservativeCollapse: false,
          keepClosingSlash: false,
          noNewlinesBeforeTagClose: false,
          preventAttributesEscaping: false,
          removeEmptyAttributes: false,
          removeEmptyElements: false,
          removeOptionalTags: false,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: false,
          continueOnParseError: true,
          trimCustomFragments: false,
          ignoreCustomFragments: [
            /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
            /<style[\s\S]*?<\/style>/,
            /<script[\s\S]*?<\/script>/,
            /{%[\s\S]*?%}/
          ]
        }
      }
    }));
    /**
     * Liquid Transforms
     *
     * @default []
     */
    __publicField(this, "json", object({
      crlf: false,
      cache: null,
      stripComments: false,
      exclude: null,
      indent: 2,
      useTab: false,
      sortObjects: false,
      sortTargets: [],
      noSortList: [],
      terse: {
        enabled: false,
        exclude: null,
        options: {
          assets: true,
          config: true,
          locales: true,
          metafields: true,
          metaobject: true,
          groups: true,
          templates: true
        }
      }
    }));
  }
  /**
  * Returns the {@link Bundle.cache} static model
  */
  get cache() {
    return _a18.cache;
  }
  /**
    * Merge the cache model
    */
  set cache(cache) {
    merge(_a18.cache, cache);
  }
  /**
  * Returns the {@link Bundle.checksum} static model
  */
  get checksum() {
    return _a18.cache.checksum;
  }
  /**
  * Returns the {@link Bundle.queue} static instance
  */
  get queue() {
    return _a18.queue;
  }
  /**
   * Processor Configurations
   */
  get processor() {
    return _a18.processor;
  }
  /**
   * Merge users configuration with default
   */
  set config(data) {
    _a18.config = merge(_a18.config, data);
  }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config() {
    return _a18.config;
  }
  /**
   * Returns the `package.json` contents
   */
  get pkg() {
    return _a18.package;
  }
  /**
   * Set the `package.json` contents
   */
  set pkg(pkg) {
    _a18.package = pkg;
  }
  /**
   * Returns the `package.json` contents
   */
  get pm() {
    return _a18.pm === null ? pm() : _a18.pm;
  }
  /**
   * Set the `package.json` contents
   */
  set pm(manager) {
    _a18.pm = manager;
  }
  /**
   * Plugins
   */
  get plugins() {
    return _a18.plugins;
  }
  /**
   * The terminal rows and columns size
   */
  get terminal() {
    return tsize();
  }
}, __name(_a18, "Bundle"), /**
 * The users configuration settings merged with defaults
 */
__publicField(_a18, "config", defaults()), /**
 * Plugins
 */
__publicField(_a18, "plugins", plugins()), /**
 * The processors configuration settings
 */
__publicField(_a18, "processor", processor()), /**
 * The parsed contents of `package.json` file
 *
 * > When `null` there is no `package.json` file present in the project.
 */
__publicField(_a18, "package", null), /**
 * The package manager used
 */
__publicField(_a18, "pm", null), /**
 * Promises to await upon
 */
__publicField(_a18, "queue", new PQueue()), /**
 * Cache interface
 */
__publicField(_a18, "cache", object()), _a18)();

// syncify/utils/utils.ts
var command = util.promisify(child_process.exec);
var event = new events.EventEmitter();
var NooP = /* @__PURE__ */ __name(() => {
}, "NooP");
var { assign, defineProperty, defineProperties, keys, values, setPrototypeOf, create: create2 } = Object;
var toArray = Array.from;
var toBuffer = Buffer.from;
var { abs } = Math;
var { toString } = Object.prototype;
var isBuffer = Buffer.isBuffer;
function type(input) {
  if (input === null) return "null";
  if (input === undefined) return "undefined";
  if (isNaN2(input)) return "NaN";
  if (isBuffer(input)) return "Buffer";
  const result = toString.call(input).slice(8, -1);
  return result === "AsyncFunction" ? "Promise" : result;
}
__name(type, "type");
function isNil(input) {
  return input === undefined || input === null;
}
__name(isNil, "isNil");
function isEven(number) {
  return number % 2 === 0;
}
__name(isEven, "isEven");
function isEmptyString(input) {
  if (isBuffer(input)) return input.toString().trim().length === 0;
  return input.trim().length === 0;
}
__name(isEmptyString, "isEmptyString");
function isEmpty(input) {
  if (isObject(input)) {
    for (const _ in input) return false;
    return true;
  }
  if (isArray(input)) return input.length === 0;
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN2(input)) return true;
  return !input;
}
__name(isEmpty, "isEmpty");
function isPromise(param) {
  return toString.call(param).slice(8, -1) === "Promise";
}
__name(isPromise, "isPromise");
function isAwait(param) {
  return toString.call(param).slice(8, -1) === "Promise" || isAsync(param);
}
__name(isAwait, "isAwait");
function isArray(param) {
  return Array.isArray(param);
}
__name(isArray, "isArray");
function isObject(param) {
  return toString.call(param).slice(8, -1) === "Object";
}
__name(isObject, "isObject");
function isStringStrict(param) {
  return typeof param === "string" && param.length > 0;
}
__name(isStringStrict, "isStringStrict");
function isString(param) {
  return toString.call(param).slice(8, -1) === "String";
}
__name(isString, "isString");
function isDate(param) {
  return toString.call(param).slice(8, -1) === "Date";
}
__name(isDate, "isDate");
function isRegex(param) {
  return toString.call(param).slice(8, -1) === "RegExp";
}
__name(isRegex, "isRegex");
function isFunction(param) {
  return typeof param === "function";
}
__name(isFunction, "isFunction");
function isBoolean(param) {
  return typeof param === "boolean";
}
__name(isBoolean, "isBoolean");
function isConstructor(object2, key) {
  return key === "constructor" && isFunction(object2[key]) || key === "__proto__";
}
__name(isConstructor, "isConstructor");
function isNumberStrict(param) {
  return isNumber(param) || /^0x[0-9a-f]+$/i.test(param) || /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(param);
}
__name(isNumberStrict, "isNumberStrict");
function isNumber(param) {
  return typeof param === "number";
}
__name(isNumber, "isNumber");
function isNaN2(param) {
  return Number.isNaN(param);
}
__name(isNaN2, "isNaN");
function isNull(param) {
  return param === null;
}
__name(isNull, "isNull");
function isUndefined(param) {
  return typeof param === "undefined" && param === undefined;
}
__name(isUndefined, "isUndefined");
function isAsync(param) {
  return types.isAsyncFunction(param);
}
__name(isAsync, "isAsync");
function object(input) {
  return input ? Object.assign(/* @__PURE__ */ Object.create(null), input) : /* @__PURE__ */ Object.create(null);
}
__name(object, "object");
function checksum(input, outputLength = -1) {
  const hash = outputLength > -1 ? crypto.createHash("shake256", { outputLength }) : crypto.createHash("md5");
  return hash.update(input).digest("hex");
}
__name(checksum, "checksum");
async function openInEditor(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const process7 = child_process.spawn($.project.textEditor, [filePath], {
        stdio: "ignore",
        detached: true
      });
      process7.unref();
      resolve(true);
    } catch (error) {
      reject(new Error("Failed to open file: ".concat(error.message)));
    }
  });
}
__name(openInEditor, "openInEditor");
function getChunk(array, perChunk = 2) {
  return array.reduce((acc, item, index) => {
    const ci = Math.floor(index / perChunk);
    if (!acc[ci]) acc[ci] = [];
    acc[ci].push(item);
    return acc;
  }, []);
}
__name(getChunk, "getChunk");
function includes(a, list) {
  let index = -1;
  const size = list.length;
  while (++index < size) if (String(list[index]) === String(a)) return true;
  return false;
}
__name(includes, "includes");
function hasPath(path, param) {
  if (isNil(param)) return false;
  if (isObject(param) === false) return false;
  let object2 = param;
  let counter = 0;
  const props = path.split(".");
  while (counter < props.length) {
    if (isNil(object2)) return false;
    if (object2[props[counter]] === null) return false;
    object2 = object2[props[counter]];
    counter++;
  }
  return object2 !== undefined;
}
__name(hasPath, "hasPath");
function has(prop, object2) {
  return isObject(object2) ? prop in object2 : false;
}
__name(has, "has");
function hasProp(object2) {
  const isObj = isObject(object2);
  return (prop) => isObj ? prop in object2 : false;
}
__name(hasProp, "hasProp");
function getProp(object2, ...keys2) {
  let current = object2;
  for (let i = 0, s = keys2.length; i < s; i++) {
    if (!isObject("object")) return undefined;
    current = current[keys2[i]];
  }
  return current;
}
__name(getProp, "getProp");
function merge(source, ...patches) {
  const arr = isArray(source);
  return (/* @__PURE__ */ __name(function apply(isArr, copy, patch) {
    const type2 = typeof patch;
    if (patch && type2 === "object") {
      if (isArray(patch)) {
        for (const p of patch) copy = apply(isArr, copy, p);
      } else {
        for (const k in patch) {
          const val = patch[k];
          if (isFunction(val)) {
            copy[k] = val(copy[k], merge);
          } else if (val === undefined) {
            if (isArr) {
              copy.splice(k, 1);
            } else {
              delete copy[k];
            }
          } else if (val === null || isObject(val) === false || isArray(val)) {
            copy[k] = val;
          } else if (typeof copy[k] === "object") {
            copy[k] = val === copy[k] ? val : merge(copy[k], val);
          } else {
            copy[k] = apply(false, {}, val);
          }
        }
      }
    } else if (type2 === "function") {
      copy = patch(copy, merge);
    }
    return copy;
  }, "apply"))(arr, arr ? source.slice() : Object.assign({}, source), patches);
}
__name(merge, "merge");
function omit(props, input) {
  if (arguments.length === 1) return (o) => omit(props, o);
  if (input === null || input === undefined) {
    return undefined;
  }
  const newObject = object();
  for (const key in input) {
    if (!includes(key, props)) {
      newObject[key] = input[key];
    }
  }
  return newObject;
}
__name(omit, "omit");
function forMap(cb, array) {
  const s = array.length;
  if (s === 0) return [];
  const a = [];
  let i = -1;
  while (++i < s) {
    const v = cb(array[i]);
    if (!isNil(v)) a.push(v);
  }
  return a;
}
__name(forMap, "forMap");
function forEach(cb, array) {
  if (arguments.length === 1) return (a) => forEach(cb, a);
  const s = array.length;
  if (s === 0) return;
  let i = -1;
  while (++i < s) if (cb(array[i]) === false) break;
}
__name(forEach, "forEach");
function pNext() {
  return new Promise((resolve) => isFunction(setImmediate) ? setImmediate(resolve) : setTimeout(resolve));
}
__name(pNext, "pNext");
async function pSerial(...tasks) {
  if (isArray(tasks[0])) {
    try {
      await Promise.all(tasks[0]);
    } catch (e) {
      throw Error(e);
    }
  } else {
    for (let i = 0, s = tasks.length; i < s; i++) {
      const task = tasks[i];
      if (isAwait(task)) {
        try {
          await tasks[i]();
        } catch (e) {
          throw Error(e);
        }
      } else {
        tasks[i]();
      }
    }
  }
}
__name(pSerial, "pSerial");
function delay(ms = 1e3) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(delay, "delay");
function debouncePromise(fn, delay2, onError) {
  let timeout;
  let transit;
  let pending;
  return /* @__PURE__ */ __name(function debounced(...args) {
    if (transit) {
      pending = /* @__PURE__ */ __name(() => {
        debounced(...args);
        pending = undefined;
      }, "pending");
    } else {
      if (timeout != null) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = undefined;
        transit = fn(...args).catch(onError).finally(() => {
          transit = undefined;
          if (pending) pending();
        });
      }, delay2);
    }
  }, "debounced");
}
__name(debouncePromise, "debouncePromise");
function eqWS(array, { prop = null, padding = 0 } = {}) {
  let size = 0;
  if (isArray(array)) {
    for (let i = 0, s = array.length; i < s; i++) {
      if (prop) {
        if (array[i][prop].length > size) {
          size = array[i][prop].length;
        }
      } else {
        if (array[i].length > size) {
          size = array[i].length;
        }
      }
    }
  } else {
    for (const item in array) {
      if (item.length > size) size = item.length;
    }
  }
  size = size + 1;
  const p = padding > 0 ? " ".repeat(padding) : "";
  return (string) => {
    const n = isString(string) ? size - string.length : size - string;
    const s = n < 1 ? " " : " ".repeat(n);
    return s + p;
  };
}
__name(eqWS, "eqWS");
function uuid() {
  return Math.random().toString(36).slice(2);
}
__name(uuid, "uuid");
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
__name(handleize, "handleize");
function toPascalCase(string) {
  return string.replace(/[^a-zA-Z0-9_:]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
}
__name(toPascalCase, "toPascalCase");
function plural(word, size) {
  if (size === 1) return word;
  if (size >= 2 || size === 0) return word[word.length - 1] !== "s" ? "".concat(word, "s") : word;
  return word[word.length - 1] !== "s" ? word : word.slice(0, -1);
}
__name(plural, "plural");
function toUpcase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
__name(toUpcase, "toUpcase");
function addSuffix(number) {
  const a = number % 10;
  const b = number % 100;
  return number + (a === 1 && b !== 11 ? "st" : a === 2 && b !== 12 ? "nd" : a === 3 && b !== 13 ? "rd" : "th");
}
__name(addSuffix, "addSuffix");
function stringSize(value) {
  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}
__name(stringSize, "stringSize");
function byteSize(string) {
  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;
}
__name(byteSize, "byteSize");
function byteConvert(bytes) {
  if (bytes === 0) return "".concat(bold2("0"), "b");
  const size = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
  return size === 0 ? "".concat(bold2("".concat(bytes))).concat(UNITS[size]) : "".concat(bold2((bytes / 1024 ** size).toFixed(1))).concat(UNITS[size]);
}
__name(byteConvert, "byteConvert");
function sizeDiff(content, beforeSize) {
  const size = byteSize(content);
  return {
    get isSmaller() {
      return size > beforeSize || size === beforeSize;
    },
    get brotli() {
      return byteConvert(zlib__default.default.brotliCompressSync(content).length);
    },
    get before() {
      return byteConvert(beforeSize);
    },
    get after() {
      return byteConvert(size);
    },
    get saved() {
      return byteConvert(beforeSize - size);
    }
  };
}
__name(sizeDiff, "sizeDiff");
function getFuture(months) {
  const current = new Date(Date.now());
  current.setMonth(current.getMonth() + months);
  const d = current.getDate();
  current.setDate(1);
  current.setDate(Math.min(d, new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()));
  return current.getTime();
}
__name(getFuture, "getFuture");
function prettyDate(time) {
  const date = new Date(time);
  const locale = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return locale.replace(/\d+/, addSuffix(date.getDate()));
}
__name(prettyDate, "prettyDate");
function hasDayPassed(timestamp) {
  return Date.now() - timestamp > DAY_IN_MS;
}
__name(hasDayPassed, "hasDayPassed");
function convertTimer(ms, { min = "min", sec = "s" } = {}) {
  const m = Math.floor(ms / 6e4);
  const s = +(ms % 6e4 / 1e3).toFixed(0);
  return m > 0 ? "".concat(m, "min ").concat(s < 10 && s > 0 ? "0" : "").concat(s > 0 ? s + "sec" : "") : "".concat(s, "sec");
}
__name(convertTimer, "convertTimer");
function getTime2() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? "0".concat(hur) : hur) + ":" + (min < 10 ? "0".concat(min) : min) + ":" + (sec < 10 ? "0".concat(sec) : sec);
}
__name(getTime2, "getTime");
function getDateTime() {
  const now = /* @__PURE__ */ new Date();
  const d = now.getDate();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (d < 10 ? "0".concat(d + 1) : "".concat(d + 1)) + DSH + (m < 10 ? "0".concat(m) : m) + DSH + y + " " + (hur < 10 ? "0".concat(hur) : hur) + COL + (min < 10 ? "0".concat(min) : min) + COL + (sec < 10 ? "0".concat(sec) : sec);
}
__name(getDateTime, "getDateTime");

exports.NooP = NooP;
exports.abs = abs;
exports.addSuffix = addSuffix;
exports.assign = assign;
exports.byteConvert = byteConvert;
exports.byteSize = byteSize;
exports.checksum = checksum;
exports.command = command;
exports.convertTimer = convertTimer;
exports.create = create2;
exports.debouncePromise = debouncePromise;
exports.defineProperties = defineProperties;
exports.defineProperty = defineProperty;
exports.delay = delay;
exports.eqWS = eqWS;
exports.event = event;
exports.forEach = forEach;
exports.forMap = forMap;
exports.getChunk = getChunk;
exports.getDateTime = getDateTime;
exports.getFuture = getFuture;
exports.getProp = getProp;
exports.getTime = getTime2;
exports.handleize = handleize;
exports.has = has;
exports.hasDayPassed = hasDayPassed;
exports.hasPath = hasPath;
exports.hasProp = hasProp;
exports.includes = includes;
exports.isArray = isArray;
exports.isAsync = isAsync;
exports.isAwait = isAwait;
exports.isBoolean = isBoolean;
exports.isBuffer = isBuffer;
exports.isConstructor = isConstructor;
exports.isDate = isDate;
exports.isEmpty = isEmpty;
exports.isEmptyString = isEmptyString;
exports.isEven = isEven;
exports.isFunction = isFunction;
exports.isNaN = isNaN2;
exports.isNil = isNil;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isNumberStrict = isNumberStrict;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isRegex = isRegex;
exports.isString = isString;
exports.isStringStrict = isStringStrict;
exports.isUndefined = isUndefined;
exports.keys = keys;
exports.merge = merge;
exports.object = object;
exports.omit = omit;
exports.openInEditor = openInEditor;
exports.pNext = pNext;
exports.pSerial = pSerial;
exports.plural = plural;
exports.prettyDate = prettyDate;
exports.setPrototypeOf = setPrototypeOf;
exports.sizeDiff = sizeDiff;
exports.stringSize = stringSize;
exports.toArray = toArray;
exports.toBuffer = toBuffer;
exports.toPascalCase = toPascalCase;
exports.toString = toString;
exports.toUpcase = toUpcase;
exports.type = type;
exports.uuid = uuid;
exports.values = values;
