var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// node_modules/.pnpm/tsup@8.2.4_jiti@1.21.6_postcss@8.4.41_typescript@5.5.4_yaml@2.5.0/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl, importMetaUrl;
var init_cjs_shims = __esm({
  "node_modules/.pnpm/tsup@8.2.4_jiti@1.21.6_postcss@8.4.41_typescript@5.5.4_yaml@2.5.0/node_modules/tsup/assets/cjs_shims.js"() {
    getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
    importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
  }
});

// node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/.pnpm/minimist@1.2.8/node_modules/minimist/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    function hasKey(obj, keys2) {
      var o = obj;
      keys2.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys2[keys2.length - 1];
      return key in o;
    }
    function isNumber2(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
    module2.exports = function(args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      if (typeof opts.unknown === "function") {
        flags.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags.allBools = true;
      } else {
        [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          [].concat(aliases[key2]).forEach(function(k) {
            flags.strings[k] = true;
          });
        }
      });
      var defaults2 = opts.default || {};
      var argv5 = { _: [] };
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setKey(obj, keys2, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys2.length - 1; i2++) {
          var key2 = keys2[i2];
          if (isConstructorOrProto(o, key2)) {
            return;
          }
          if (o[key2] === void 0) {
            o[key2] = {};
          }
          if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype) {
            o[key2] = {};
          }
          if (o[key2] === Array.prototype) {
            o[key2] = [];
          }
          o = o[key2];
        }
        var lastKey = keys2[keys2.length - 1];
        if (isConstructorOrProto(o, lastKey)) {
          return;
        }
        if (o === Object.prototype || o === Number.prototype || o === String.prototype) {
          o = {};
        }
        if (o === Array.prototype) {
          o = [];
        }
        if (o[lastKey] === void 0 || flags.bools[lastKey] || typeof o[lastKey] === "boolean") {
          o[lastKey] = value2;
        } else if (Array.isArray(o[lastKey])) {
          o[lastKey].push(value2);
        } else {
          o[lastKey] = [o[lastKey], value2];
        }
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags.strings[key2] && isNumber2(val) ? Number(val) : val;
        setKey(argv5, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x) {
          setKey(argv5, x.split("."), value2);
        });
      }
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults2[key2] === void 0 ? false : defaults2[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv5._.push(flags.strings._ || !isNumber2(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv5._.push.apply(argv5._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults2).forEach(function(k) {
        if (!hasKey(argv5, k.split("."))) {
          setKey(argv5, k.split("."), defaults2[k]);
          (aliases[k] || []).forEach(function(x) {
            setKey(argv5, x.split("."), defaults2[k]);
          });
        }
      });
      if (opts["--"]) {
        argv5["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function(k) {
          argv5._.push(k);
        });
      }
      return argv5;
    };
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var has3 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events2() {
    }
    if (Object.create) {
      Events2.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events2().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
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
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events2();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events2();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has3.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event2) {
      var evt = prefix ? prefix + event2 : event2, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event2) {
      var evt = prefix ? prefix + event2 : event2, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event2, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event2, listeners.fn, void 0, true);
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
          if (listeners[i].once) this.removeListener(event2, listeners[i].fn, void 0, true);
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
    };
    EventEmitter3.prototype.on = function on(event2, fn, context) {
      return addListener(this, event2, fn, context, false);
    };
    EventEmitter3.prototype.once = function once(event2, fn, context) {
      return addListener(this, event2, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event2, fn, context, once) {
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
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event2) {
      var evt;
      if (event2) {
        evt = prefix ? prefix + event2 : event2;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events2();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter3;
    }
  }
});

// node_modules/.pnpm/ansis@3.3.2/node_modules/ansis/index.js
var require_ansis = __commonJS({
  "node_modules/.pnpm/ansis@3.3.2/node_modules/ansis/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var { round: e, floor: t, max: n } = Math;
    var r = (e2) => {
      let [, t2] = /([a-f\d]{3,6})/i.exec(e2) || [], n2 = t2 ? t2.length : 0;
      if (3 === n2) t2 = t2[0] + t2[0] + t2[1] + t2[1] + t2[2] + t2[2];
      else if (6 !== n2) return [0, 0, 0];
      let r2 = parseInt(t2, 16);
      return [r2 >> 16 & 255, r2 >> 8 & 255, 255 & r2];
    };
    var i = (t2, n2, r2) => t2 === n2 && n2 === r2 ? t2 < 8 ? 16 : t2 > 248 ? 231 : e((t2 - 8) / 247 * 24) + 232 : 16 + 36 * e(t2 / 51) + 6 * e(n2 / 51) + e(r2 / 51);
    var o = (r2) => {
      let i2, o2, l2, s2, c2, u2;
      return r2 < 8 ? 30 + r2 : r2 < 16 ? r2 - 8 + 90 : (r2 >= 232 ? i2 = o2 = l2 = (10 * (r2 - 232) + 8) / 255 : (u2 = (r2 -= 16) % 36, i2 = t(r2 / 36) / 5, o2 = t(u2 / 6) / 5, l2 = u2 % 6 / 5), s2 = 2 * n(i2, o2, l2), 0 === s2 ? 30 : (c2 = 30 + (e(l2) << 2 | e(o2) << 1 | e(i2)), 2 === s2 ? c2 + 60 : c2));
    };
    var l = (e2, t2, n2) => o(i(e2, t2, n2));
    var s = ((e2) => {
      const t2 = (e3) => !!c2.find((t3) => e3.test(t3)), n2 = globalThis, r2 = n2.Deno, i2 = null != r2, o2 = n2.process || r2 || {}, l2 = o2.stdout, s2 = "win32" === (i2 ? r2.build.os : o2.platform), c2 = o2.argv || o2.args || [];
      let u2 = o2.env || {}, a2 = -1;
      if (i2) try {
        u2 = u2.toObject();
      } catch (e3) {
        a2 = 0;
      }
      const p2 = "FORCE_COLOR", g2 = u2[p2], f2 = parseInt(g2), d2 = "false" === g2 ? 0 : isNaN(f2) ? 3 : f2, b2 = "NO_COLOR" in u2 || 0 === d2 || t2(/^-{1,2}(no-color|color=(false|never))$/), _2 = p2 in u2 && d2 || t2(/^-{1,2}color=?(true|always)?$/), O2 = (u2.NEXT_RUNTIME || "").indexOf("edge") > -1 || "PM2_HOME" in u2 && "pm_id" in u2 || (i2 ? r2.isatty(1) : l2 && "isTTY" in l2);
      return b2 ? 0 : (a2 < 0 && (a2 = ((e3, t3, n3) => {
        const { TERM: r3, COLORTERM: i3 } = e3;
        return "TF_BUILD" in e3 ? 1 : "TEAMCITY_VERSION" in e3 ? 2 : "CI" in e3 ? ["GITHUB_ACTIONS", "GITEA_ACTIONS"].some((t4) => t4 in e3) ? 3 : 1 : !t3 || /-mono|dumb/i.test(r3) ? 0 : n3 || "truecolor" === i3 || "24bit" === i3 || "xterm-kitty" === r3 ? 3 : /-256(colou?r)?$/i.test(r3) ? 2 : /^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(r3) ? 1 : 3;
      })(u2, O2, s2)), _2 && 0 === a2 ? 3 : a2);
    })();
    var c = s > 0;
    var u = { open: "", close: "" };
    var a = c ? (e2, t2) => ({ open: `\x1B[${e2}m`, close: `\x1B[${t2}m` }) : () => u;
    var p = 39;
    var g = 49;
    var f = (e2) => (t2, n2, r2) => e2(i(t2, n2, r2));
    var d = (e2) => (t2) => {
      let [n2, i2, o2] = r(t2);
      return e2(n2, i2, o2);
    };
    var b = (e2) => a(`38;5;${e2}`, p);
    var _ = (e2) => a(`48;5;${e2}`, g);
    var O = (e2, t2, n2) => a(`38;2;${e2};${t2};${n2}`, p);
    var y = (e2, t2, n2) => a(`48;2;${e2};${t2};${n2}`, g);
    1 === s ? (b = (e2) => a(o(e2), p), _ = (e2) => a(o(e2) + 10, g), O = (e2, t2, n2) => a(l(e2, t2, n2), p), y = (e2, t2, n2) => a(l(e2, t2, n2) + 10, g)) : 2 === s && (O = f(b), y = f(_));
    var m;
    var x;
    var h = { ansi256: b, bgAnsi256: _, fg: b, bg: _, rgb: O, bgRgb: y, hex: d(O), bgHex: d(y), visible: u, reset: a(0, 0), inverse: a(7, 27), hidden: a(8, 28), bold: a(1, 22), dim: a(2, 22), italic: a(3, 23), underline: a(4, 24), strikethrough: a(9, 29), strike: a(9, 29), grey: a(90, p), gray: a(90, p), bgGrey: a(100, g), bgGray: a(100, g) };
    var T = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    var $2 = "Bright";
    var I = 30;
    for (m of T) x = "bg" + m[0].toUpperCase() + m.slice(1), h[m] = a(I, p), h[m + $2] = a(I + 60, p), h[x] = a(I + 10, g), h[x + $2] = a(I + 70, g), I++;
    var { defineProperty: R, defineProperties: v, setPrototypeOf: C } = Object;
    var E = /[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    var w = /(\r?\n)/g;
    var M = {};
    var N = ({ _p: e2 }, { open: t2, close: n2 }) => {
      const r2 = (e3, ...t3) => {
        if (!e3) return "";
        let n3 = r2._p, { _a: i3, _b: o3 } = n3, l2 = null != e3.raw ? String.raw(e3, ...t3) : "" + e3;
        if (l2.includes("\x1B")) for (; null != n3; ) {
          let e4 = n3.close, t4 = e4.length;
          if (t4) {
            let r3, i4 = 0, o4 = "";
            for (; ~(r3 = l2.indexOf(e4, i4)); ) o4 += l2.slice(i4, r3) + n3.open, i4 = r3 + t4;
            i4 && (l2 = o4 + l2.slice(i4));
          }
          n3 = n3._p;
        }
        return l2.includes("\n") && (l2 = l2.replace(w, o3 + "$1" + i3)), i3 + l2 + o3;
      };
      let i2 = t2, o2 = n2;
      return null != e2 && (i2 = e2._a + t2, o2 = n2 + e2._b), C(r2, P), r2._p = { open: t2, close: n2, _a: i2, _b: o2, _p: e2 }, r2.open = i2, r2.close = o2, r2;
    };
    var A = function() {
      const e2 = (e3) => "" + e3;
      return e2.isSupported = () => c, e2.strip = (e3) => e3.replace(E, ""), e2.extend = (t2) => {
        for (let e3 in t2) {
          let n2 = t2[e3], i2 = typeof n2, o2 = "string" === i2 ? O(...r(n2)) : n2;
          M[e3] = "function" === i2 ? { get() {
            return (...e4) => N(this, n2(...e4));
          } } : { get() {
            let t3 = N(this, o2);
            return R(this, e3, { value: t3 }), t3;
          } };
        }
        P = v({}, M), C(e2, P);
      }, e2.extend(h), e2;
    };
    var P;
    var S = new A();
    module2.exports = S, module2.exports.Ansis = A;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var path2 = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path2.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var path2 = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match2) => {
        return match2 === "\\" ? "" : match2;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens2 = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens2.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob9 = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob9 = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob9 = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob9) glob9 = utils.removeBackslashes(glob9);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob9,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens2.push(token);
        }
        state.tokens = tokens2;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens2[idx].isPrefix = true;
              tokens2[idx].value = prefix;
            } else {
              tokens2[idx].value = value;
            }
            depth(tokens2[idx]);
            state.maxDepth += tokens2[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens2[tokens2.length - 1].value = value;
            depth(tokens2[tokens2.length - 1]);
            state.maxDepth += tokens2[tokens2.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type2, char) => {
      return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse5 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens2 = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens: tokens2
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type2) => {
        state[type2]++;
        stack.push(type2);
      };
      const decrement = (type2) => {
        state[type2]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens2.push(tok);
        prev = tok;
      };
      const extglobOpen = (type2, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse5(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match2 = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match2 && match2[0].length > 2) {
            slashes = match2[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens2.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens2.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens2.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens2.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match2 = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match2) {
            value += match2[0];
            state.index += match2[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse5.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create5 = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match2 = /^(.*?)\.(\w+)$/.exec(str);
            if (!match2) return;
            const source2 = create5(match2[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match2[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create5(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse5;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var path2 = require("path");
    var scan = require_scan();
    var parse5 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject2 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob9, options, returnState = false) => {
      if (Array.isArray(glob9)) {
        const fns = glob9.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob9) && glob9.tokens && glob9.input;
      if (glob9 === "" || typeof glob9 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex2 = isState ? picomatch.compileRe(glob9, options) : picomatch.makeRe(glob9, options, false, true);
      const state = regex2.state;
      delete regex2.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match: match2, output } = picomatch.test(input, regex2, options, { glob: glob9, posix });
        const result = { glob: glob9, state, regex: regex2, posix, input, output, match: match2, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex2, options, { glob: glob9, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match2 = input === glob9;
      let output = match2 && format ? format(input) : input;
      if (match2 === false) {
        output = format ? format(input) : input;
        match2 = output === glob9;
      }
      if (match2 === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match2 = picomatch.matchBase(input, regex2, options, posix);
        } else {
          match2 = regex2.exec(output);
        }
      }
      return { isMatch: Boolean(match2), match: match2, output };
    };
    picomatch.matchBase = (input, glob9, options, posix = utils.isWindows(options)) => {
      const regex2 = glob9 instanceof RegExp ? glob9 : picomatch.makeRe(glob9, options);
      return regex2.test(path2.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
      return parse5(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex2 = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex2.state = state;
      }
      return regex2;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse5.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse5(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = require_picomatch();
  }
});

// node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports2, module2) {
    init_cjs_shims();
    module2.exports = function(path2, stripTrailing) {
      if (typeof path2 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path2 === "\\" || path2 === "/") return "/";
      var len = path2.length;
      if (len <= 1) return path2;
      var prefix = "";
      if (len > 4 && path2[3] === "\\") {
        var ch = path2[2];
        if ((ch === "?" || ch === ".") && path2.slice(0, 2) === "\\\\") {
          path2 = path2.slice(2);
          prefix = "//";
        }
      }
      var segs = path2.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var picomatch = require_picomatch2();
    var normalizePath = require_normalize_path();
    var BANG = "!";
    var DEFAULT_OPTIONS = { returnIndex: false };
    var arrify = (item) => Array.isArray(item) ? item : [item];
    var createPattern = (matcher, options) => {
      if (typeof matcher === "function") {
        return matcher;
      }
      if (typeof matcher === "string") {
        const glob9 = picomatch(matcher, options);
        return (string) => matcher === string || glob9(string);
      }
      if (matcher instanceof RegExp) {
        return (string) => matcher.test(string);
      }
      return (string) => false;
    };
    var matchPatterns = (patterns, negPatterns, args, returnIndex) => {
      const isList = Array.isArray(args);
      const _path = isList ? args[0] : args;
      if (!isList && typeof _path !== "string") {
        throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
      }
      const path2 = normalizePath(_path, false);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path2)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path2].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path2)) {
          return returnIndex ? index : true;
        }
      }
      return returnIndex ? -1 : false;
    };
    var anymatch8 = (matchers, testString, options = DEFAULT_OPTIONS) => {
      if (matchers == null) {
        throw new TypeError("anymatch: specify first argument");
      }
      const opts = typeof options === "boolean" ? { returnIndex: options } : options;
      const returnIndex = opts.returnIndex || false;
      const mtchers = arrify(matchers);
      const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG).map((item) => item.slice(1)).map((item) => picomatch(item, opts));
      const patterns = mtchers.filter((item) => typeof item !== "string" || typeof item === "string" && item.charAt(0) !== BANG).map((matcher) => createPattern(matcher, opts));
      if (testString == null) {
        return (testString2, ri = false) => {
          const returnIndex2 = typeof ri === "boolean" ? ri : false;
          return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
        };
      }
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    };
    anymatch8.default = anymatch8;
    module2.exports = anymatch8;
  }
});

// node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
  "node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js"(exports2) {
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports2.matchToToken = function(match2) {
      var token = { type: "invalid", value: match2[0], closed: void 0 };
      if (match2[1]) token.type = "string", token.closed = !!(match2[3] || match2[4]);
      else if (match2[5]) token.type = "comment";
      else if (match2[6]) token.type = "comment", token.closed = !!match2[7];
      else if (match2[8]) token.type = "regex";
      else if (match2[9]) token.type = "number";
      else if (match2[10]) token.type = "name";
      else if (match2[11]) token.type = "punctuator";
      else if (match2[12]) token.type = "whitespace";
      return token;
    };
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isIdentifierChar = isIdentifierChar;
    exports2.isIdentifierName = isIdentifierName;
    exports2.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        pos += set[i];
        if (pos > code) return false;
        pos += set[i + 1];
        if (pos >= code) return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65) return code === 36;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48) return code === 36;
      if (code < 58) return true;
      if (code < 65) return false;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    function isIdentifierName(name) {
      let isFirst = true;
      for (let i = 0; i < name.length; i++) {
        let cp = name.charCodeAt(i);
        if ((cp & 64512) === 55296 && i + 1 < name.length) {
          const trail = name.charCodeAt(++i);
          if ((trail & 64512) === 56320) {
            cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
          }
        }
        if (isFirst) {
          isFirst = false;
          if (!isIdentifierStart(cp)) {
            return false;
          }
        } else if (!isIdentifierChar(cp)) {
          return false;
        }
      }
      return !isFirst;
    }
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isKeyword = isKeyword;
    exports2.isReservedWord = isReservedWord;
    exports2.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports2.isStrictBindReservedWord = isStrictBindReservedWord;
    exports2.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
      strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
      strictBind: ["eval", "arguments"]
    };
    var keywords = new Set(reservedWords.keyword);
    var reservedWordsStrictSet = new Set(reservedWords.strict);
    var reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
    function isReservedWord(word, inModule) {
      return inModule && word === "await" || word === "enum";
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
    function isStrictBindReservedWord(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }
    function isKeyword(word) {
      return keywords.has(word);
    }
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.24.7/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "isIdentifierChar", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    });
    Object.defineProperty(exports2, "isIdentifierName", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierName;
      }
    });
    Object.defineProperty(exports2, "isIdentifierStart", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    });
    Object.defineProperty(exports2, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    Object.defineProperty(exports2, "isReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictBindReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    });
    Object.defineProperty(exports2, "isStrictReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  }
});

// node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js"(exports2, module2) {
    init_cjs_shims();
    var argv5 = process.argv || [];
    var env2 = process.env;
    var isColorSupported = !("NO_COLOR" in env2 || argv5.includes("--no-color")) && ("FORCE_COLOR" in env2 || argv5.includes("--color") || process.platform === "win32" || require != null && require("tty").isatty(1) && env2.TERM !== "dumb" || "CI" in env2);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "";
      let cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let init = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: init("\x1B[0m", "\x1B[0m"),
        bold: init("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: init("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: init("\x1B[3m", "\x1B[23m"),
        underline: init("\x1B[4m", "\x1B[24m"),
        inverse: init("\x1B[7m", "\x1B[27m"),
        hidden: init("\x1B[8m", "\x1B[28m"),
        strikethrough: init("\x1B[9m", "\x1B[29m"),
        black: init("\x1B[30m", "\x1B[39m"),
        red: init("\x1B[31m", "\x1B[39m"),
        green: init("\x1B[32m", "\x1B[39m"),
        yellow: init("\x1B[33m", "\x1B[39m"),
        blue: init("\x1B[34m", "\x1B[39m"),
        magenta: init("\x1B[35m", "\x1B[39m"),
        cyan: init("\x1B[36m", "\x1B[39m"),
        white: init("\x1B[37m", "\x1B[39m"),
        gray: init("\x1B[90m", "\x1B[39m"),
        bgBlack: init("\x1B[40m", "\x1B[49m"),
        bgRed: init("\x1B[41m", "\x1B[49m"),
        bgGreen: init("\x1B[42m", "\x1B[49m"),
        bgYellow: init("\x1B[43m", "\x1B[49m"),
        bgBlue: init("\x1B[44m", "\x1B[49m"),
        bgMagenta: init("\x1B[45m", "\x1B[49m"),
        bgCyan: init("\x1B[46m", "\x1B[49m"),
        bgWhite: init("\x1B[47m", "\x1B[49m")
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js"(exports2, module2) {
    init_cjs_shims();
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
    }
    var key;
    var convert = module2.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    for (model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        channels = convert[model].channels;
        labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
    }
    var channels;
    var labels;
    var model;
    convert.rgb.hsl = function(rgb2) {
      var r = rgb2[0] / 255;
      var g = rgb2[1] / 255;
      var b = rgb2[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      var l;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb2) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb2[0] / 255;
      var g = rgb2[1] / 255;
      var b = rgb2[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);
      var diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb2) {
      var r = rgb2[0];
      var g = rgb2[1];
      var b = rgb2[2];
      var h = convert.rgb.hsl(rgb2)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb2) {
      var r = rgb2[0] / 255;
      var g = rgb2[1] / 255;
      var b = rgb2[2] / 255;
      var c;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }
    convert.rgb.keyword = function(rgb2) {
      var reversed = reverseKeywords[rgb2];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb2, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb2) {
      var r = rgb2[0] / 255;
      var g = rgb2[1] / 255;
      var b = rgb2[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb2) {
      var xyz = convert.rgb.xyz(rgb2);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb2;
      var val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      t1 = 2 * l - t2;
      rgb2 = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb2[i] = val * 255;
      }
      return rgb2;
    };
    convert.hsl.hsv = function(hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l;
      l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      n = wh + f * (v - wh);
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      var color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      var match2 = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match2) {
        return [0, 0, 0];
      }
      var colorString = match2[0];
      if (match2[0].length === 3) {
        colorString = colorString.split("").map(function(char) {
          return char + char;
        }).join("");
      }
      var integer = parseInt(colorString, 16);
      var r = integer >> 16 & 255;
      var g = integer >> 8 & 255;
      var b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb2) {
      var r = rgb2[0] / 255;
      var g = rgb2[1] / 255;
      var b = rgb2[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;
      if (l < 0.5) {
        c = 2 * s * l;
      } else {
        c = 2 * s * (1 - l);
      }
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      var f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c) + 0.5 * c;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb2) {
      return [rgb2[0] / 255 * 65535, rgb2[1] / 255 * 65535, rgb2[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray3) {
      return [0, 100, gray3[0]];
    };
    convert.gray.cmyk = function(gray3) {
      return [0, 0, 0, gray3[0]];
    };
    convert.gray.lab = function(gray3) {
      return [gray3[0], 0, 0];
    };
    convert.gray.hex = function(gray3) {
      var val = Math.round(gray3[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb2) {
      var val = (rgb2[0] + rgb2[1] + rgb2[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js"(exports2, module2) {
    init_cjs_shims();
    var conversions = require_conversions();
    function buildGraph() {
      var graph = {};
      var models = Object.keys(conversions);
      for (var len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      var graph = buildGraph();
      var queue2 = [fromModel];
      graph[fromModel].distance = 0;
      while (queue2.length) {
        var current = queue2.pop();
        var adjacents = Object.keys(conversions[current]);
        for (var len = adjacents.length, i = 0; i < len; i++) {
          var adjacent = adjacents[i];
          var node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue2.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link2(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      var path2 = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path2.unshift(graph[cur].parent);
        fn = link2(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path2;
      return fn;
    }
    module2.exports = function(fromModel) {
      var graph = deriveBFS(fromModel);
      var conversion = {};
      var models = Object.keys(graph);
      for (var len = models.length, i = 0; i < len; i++) {
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js"(exports2, module2) {
    init_cjs_shims();
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      var wrappedFn = function(args) {
        if (args === void 0 || args === null) {
          return args;
        }
        if (arguments.length > 1) {
          args = Array.prototype.slice.call(arguments);
        }
        var result = fn(args);
        if (typeof result === "object") {
          for (var len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach(function(fromModel) {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      var routes = route(fromModel);
      var routeModels = Object.keys(routes);
      routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var colorConvert = require_color_convert();
    var wrapAnsi162 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi2562 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m2 = (fn, offset) => function() {
      const rgb2 = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb2[0]};${rgb2[1]};${rgb2[2]}m`;
    };
    function assembleStyles2() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
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
          gray: [90, 39],
          // Bright color
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
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.grey = styles2.color.gray;
      for (const groupName of Object.keys(styles2)) {
        const group2 = styles2[groupName];
        for (const styleName of Object.keys(group2)) {
          const style2 = group2[styleName];
          styles2[styleName] = {
            open: `\x1B[${style2[0]}m`,
            close: `\x1B[${style2[1]}m`
          };
          group2[styleName] = styles2[styleName];
          codes.set(style2[0], style2[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group2,
          enumerable: false
        });
        Object.defineProperty(styles2, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b) => [r, g, b];
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      styles2.color.ansi = {
        ansi: wrapAnsi162(ansi2ansi, 0)
      };
      styles2.color.ansi256 = {
        ansi256: wrapAnsi2562(ansi2ansi, 0)
      };
      styles2.color.ansi16m = {
        rgb: wrapAnsi16m2(rgb2rgb, 0)
      };
      styles2.bgColor.ansi = {
        ansi: wrapAnsi162(ansi2ansi, 10)
      };
      styles2.bgColor.ansi256 = {
        ansi256: wrapAnsi2562(ansi2ansi, 10)
      };
      styles2.bgColor.ansi16m = {
        rgb: wrapAnsi16m2(rgb2rgb, 10)
      };
      for (let key of Object.keys(colorConvert)) {
        if (typeof colorConvert[key] !== "object") {
          continue;
        }
        const suite = colorConvert[key];
        if (key === "ansi16") {
          key = "ansi";
        }
        if ("ansi16" in suite) {
          styles2.color.ansi[key] = wrapAnsi162(suite.ansi16, 0);
          styles2.bgColor.ansi[key] = wrapAnsi162(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles2.color.ansi256[key] = wrapAnsi2562(suite.ansi256, 0);
          styles2.bgColor.ansi256[key] = wrapAnsi2562(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles2.color.ansi16m[key] = wrapAnsi16m2(suite.rgb, 0);
          styles2.bgColor.ansi16m[key] = wrapAnsi16m2(suite.rgb, 10);
        }
      }
      return styles2;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles2
    });
  }
});

// node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = (flag, argv5) => {
      argv5 = argv5 || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv5.indexOf(prefix + flag);
      const terminatorPos = argv5.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var os2 = require("os");
    var hasFlag = require_has_flag();
    var env2 = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env2) {
      forceColor = env2.FORCE_COLOR.length === 0 || parseInt(env2.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os2.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env2) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env2) || env2.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env2) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env2.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env2) {
        const version2 = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env2.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env2.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env2) {
        return 1;
      }
      if (env2.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js
var require_templates = __commonJS({
  "node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES3 = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      return ESCAPES3.get(c) || c;
    }
    function parseArguments(name, args) {
      const results = [];
      const chunks = args.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        if (!isNaN(chunk)) {
          results.push(Number(chunk));
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style2) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style2)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles2) {
      const enabled = {};
      for (const layer of styles2) {
        for (const style2 of layer.styles) {
          enabled[style2[0]] = layer.inverse ? null : style2.slice(1);
        }
      }
      let current = chalk;
      for (const styleName of Object.keys(enabled)) {
        if (Array.isArray(enabled[styleName])) {
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          if (enabled[styleName].length > 0) {
            current = current[styleName].apply(current, enabled[styleName]);
          } else {
            current = current[styleName];
          }
        }
      }
      return current;
    }
    module2.exports = (chalk, tmp) => {
      const styles2 = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse2, style2, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style2) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles2.length === 0 ? str : buildStyle(chalk, styles2)(str));
          styles2.push({ inverse: inverse2, styles: parseStyle(style2) });
        } else if (close) {
          if (styles2.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles2)(chunk.join("")));
          chunk = [];
          styles2.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles2.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles2.length} closing bracket${styles2.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js
var require_chalk = __commonJS({
  "node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var escapeStringRegexp2 = require_escape_string_regexp();
    var ansiStyles2 = require_ansi_styles();
    var stdoutColor = require_supports_color().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles2 = /* @__PURE__ */ Object.create(null);
    function applyOptions(obj, options) {
      options = options || {};
      const scLevel = stdoutColor ? stdoutColor.level : 0;
      obj.level = options.level === void 0 ? scLevel : options.level;
      obj.enabled = "enabled" in options ? options.enabled : obj.level > 0;
    }
    function Chalk(options) {
      if (!this || !(this instanceof Chalk) || this.template) {
        const chalk = {};
        applyOptions(chalk, options);
        chalk.template = function() {
          const args = [].slice.call(arguments);
          return chalkTag.apply(null, [chalk.template].concat(args));
        };
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
        chalk.template.constructor = Chalk;
        return chalk.template;
      }
      applyOptions(this, options);
    }
    if (isSimpleWindowsTerm) {
      ansiStyles2.blue.open = "\x1B[94m";
    }
    for (const key of Object.keys(ansiStyles2)) {
      ansiStyles2[key].closeRe = new RegExp(escapeStringRegexp2(ansiStyles2[key].close), "g");
      styles2[key] = {
        get() {
          const codes = ansiStyles2[key];
          return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
        }
      };
    }
    styles2.visible = {
      get() {
        return build3.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles2.color.closeRe = new RegExp(escapeStringRegexp2(ansiStyles2.color.close), "g");
    for (const model of Object.keys(ansiStyles2.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles2[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles2.color[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles2.color.close,
              closeRe: ansiStyles2.color.closeRe
            };
            return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles2.bgColor.closeRe = new RegExp(escapeStringRegexp2(ansiStyles2.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles2.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles2[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles2.bgColor[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles2.bgColor.close,
              closeRe: ansiStyles2.bgColor.closeRe
            };
            return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, styles2);
    function build3(_styles, _empty, key) {
      const builder = function() {
        return applyStyle.apply(builder, arguments);
      };
      builder._styles = _styles;
      builder._empty = _empty;
      const self = this;
      Object.defineProperty(builder, "level", {
        enumerable: true,
        get() {
          return self.level;
        },
        set(level) {
          self.level = level;
        }
      });
      Object.defineProperty(builder, "enabled", {
        enumerable: true,
        get() {
          return self.enabled;
        },
        set(enabled) {
          self.enabled = enabled;
        }
      });
      builder.hasGrey = this.hasGrey || key === "gray" || key === "grey";
      builder.__proto__ = proto;
      return builder;
    }
    function applyStyle() {
      const args = arguments;
      const argsLen = args.length;
      let str = String(arguments[0]);
      if (argsLen === 0) {
        return "";
      }
      if (argsLen > 1) {
        for (let a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!this.enabled || this.level <= 0 || !str) {
        return this._empty ? "" : str;
      }
      const originalDim = ansiStyles2.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles2.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles2.dim.open = originalDim;
      return str;
    }
    function chalkTag(chalk, strings) {
      if (!Array.isArray(strings)) {
        return [].slice.call(arguments, 1).join(" ");
      }
      const args = [].slice.call(arguments, 2);
      const parts = [strings.raw[0]];
      for (let i = 1; i < strings.length; i++) {
        parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
        parts.push(String(strings.raw[i]));
      }
      return template(chalk, parts.join(""));
    }
    Object.defineProperties(Chalk.prototype, styles2);
    module2.exports = Chalk();
    module2.exports.supportsColor = stdoutColor;
    module2.exports.default = module2.exports;
  }
});

// node_modules/.pnpm/@babel+highlight@7.24.7/node_modules/@babel/highlight/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/@babel+highlight@7.24.7/node_modules/@babel/highlight/lib/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = highlight2;
    exports2.shouldHighlight = shouldHighlight;
    var _jsTokens = require_js_tokens();
    var _helperValidatorIdentifier = require_lib();
    var _picocolors = _interopRequireWildcard(require_picocolors(), true);
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap) return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e)) return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
      }
      return n.default = e, t && t.set(e, n), n;
    }
    var colors = typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? (0, _picocolors.createColors)(false) : _picocolors.default;
    var compose = (f, g) => (v) => f(g(v));
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    function getDefs(colors2) {
      return {
        keyword: colors2.cyan,
        capitalized: colors2.yellow,
        jsxIdentifier: colors2.yellow,
        punctuator: colors2.yellow,
        number: colors2.magenta,
        string: colors2.green,
        regex: colors2.magenta,
        comment: colors2.gray,
        invalid: compose(compose(colors2.white, colors2.bgRed), colors2.bold)
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET = /^[()[\]{}]$/;
    var tokenize2;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType = function(token, offset, text) {
        if (token.type === "name") {
          if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, true) || sometimesKeywords.has(token.value)) {
            return "keyword";
          }
          if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.slice(offset - 2, offset) === "</")) {
            return "jsxIdentifier";
          }
          if (token.value[0] !== token.value[0].toLowerCase()) {
            return "capitalized";
          }
        }
        if (token.type === "punctuator" && BRACKET.test(token.value)) {
          return "bracket";
        }
        if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
          return "punctuator";
        }
        return token.type;
      };
      tokenize2 = function* (text) {
        let match2;
        while (match2 = _jsTokens.default.exec(text)) {
          const token = _jsTokens.matchToToken(match2);
          yield {
            type: getTokenType(token, match2.index, text),
            value: token.value
          };
        }
      };
    }
    function highlightTokens(defs, text) {
      let highlighted = "";
      for (const {
        type: type2,
        value
      } of tokenize2(text)) {
        const colorize = defs[type2];
        if (colorize) {
          highlighted += value.split(NEWLINE).map((str) => colorize(str)).join("\n");
        } else {
          highlighted += value;
        }
      }
      return highlighted;
    }
    function shouldHighlight(options) {
      return colors.isColorSupported || options.forceColor;
    }
    var pcWithForcedColor = void 0;
    function getColors(forceColor) {
      if (forceColor) {
        var _pcWithForcedColor;
        (_pcWithForcedColor = pcWithForcedColor) != null ? _pcWithForcedColor : pcWithForcedColor = (0, _picocolors.createColors)(true);
        return pcWithForcedColor;
      }
      return colors;
    }
    function highlight2(code, options = {}) {
      if (code !== "" && shouldHighlight(options)) {
        const defs = getDefs(getColors(options.forceColor));
        return highlightTokens(defs, code);
      } else {
        return code;
      }
    }
    {
      let chalk, chalkWithForcedColor;
      exports2.getChalk = ({
        forceColor
      }) => {
        var _chalk;
        (_chalk = chalk) != null ? _chalk : chalk = require_chalk();
        if (forceColor) {
          var _chalkWithForcedColor;
          (_chalkWithForcedColor = chalkWithForcedColor) != null ? _chalkWithForcedColor : chalkWithForcedColor = new chalk.constructor({
            enabled: true,
            level: 1
          });
          return chalkWithForcedColor;
        }
        return chalk;
      };
    }
  }
});

// node_modules/.pnpm/@babel+code-frame@7.24.7/node_modules/@babel/code-frame/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@babel+code-frame@7.24.7/node_modules/@babel/code-frame/lib/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.codeFrameColumns = codeFrameColumns2;
    exports2.default = _default;
    var _highlight = require_lib2();
    var _picocolors = _interopRequireWildcard(require_picocolors(), true);
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap) return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e)) return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
      }
      return n.default = e, t && t.set(e, n), n;
    }
    var colors = typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? (0, _picocolors.createColors)(false) : _picocolors.default;
    var compose = (f, g) => (v) => f(g(v));
    var pcWithForcedColor = void 0;
    function getColors(forceColor) {
      if (forceColor) {
        var _pcWithForcedColor;
        (_pcWithForcedColor = pcWithForcedColor) != null ? _pcWithForcedColor : pcWithForcedColor = (0, _picocolors.createColors)(true);
        return pcWithForcedColor;
      }
      return colors;
    }
    var deprecationWarningShown = false;
    function getDefs(colors2) {
      return {
        gutter: colors2.gray,
        marker: compose(colors2.red, colors2.bold),
        message: compose(colors2.red, colors2.bold)
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    function getMarkerLines(loc, source, opts) {
      const startLoc = Object.assign({
        column: 0,
        line: -1
      }, loc.start);
      const endLoc = Object.assign({}, startLoc, loc.end);
      const {
        linesAbove = 2,
        linesBelow = 3
      } = opts || {};
      const startLine = startLoc.line;
      const startColumn = startLoc.column;
      const endLine = endLoc.line;
      const endColumn = endLoc.column;
      let start = Math.max(startLine - (linesAbove + 1), 0);
      let end = Math.min(source.length, endLine + linesBelow);
      if (startLine === -1) {
        start = 0;
      }
      if (endLine === -1) {
        end = source.length;
      }
      const lineDiff = endLine - startLine;
      const markerLines = {};
      if (lineDiff) {
        for (let i = 0; i <= lineDiff; i++) {
          const lineNumber = i + startLine;
          if (!startColumn) {
            markerLines[lineNumber] = true;
          } else if (i === 0) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
          } else if (i === lineDiff) {
            markerLines[lineNumber] = [0, endColumn];
          } else {
            const sourceLength = source[lineNumber - i].length;
            markerLines[lineNumber] = [0, sourceLength];
          }
        }
      } else {
        if (startColumn === endColumn) {
          if (startColumn) {
            markerLines[startLine] = [startColumn, 0];
          } else {
            markerLines[startLine] = true;
          }
        } else {
          markerLines[startLine] = [startColumn, endColumn - startColumn];
        }
      }
      return {
        start,
        end,
        markerLines
      };
    }
    function codeFrameColumns2(rawLines, loc, opts = {}) {
      const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts);
      const colors2 = getColors(opts.forceColor);
      const defs = getDefs(colors2);
      const maybeHighlight = (fmt, string) => {
        return highlighted ? fmt(string) : string;
      };
      const lines = rawLines.split(NEWLINE);
      const {
        start,
        end,
        markerLines
      } = getMarkerLines(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines;
      let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index) => {
        const number = start + 1 + index;
        const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
        const gutter = ` ${paddedNumber} |`;
        const hasMarker = markerLines[number];
        const lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
            const numberOfMarkers = hasMarker[1] || 1;
            markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
            if (lastMarkerLine && opts.message) {
              markerLine += " " + maybeHighlight(defs.message, opts.message);
            }
          }
          return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine].join("");
        } else {
          return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        }
      }).join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (highlighted) {
        return colors2.reset(frame);
      } else {
        return frame;
      }
    }
    function _default(rawLines, lineNumber, colNumber, opts = {}) {
      if (!deprecationWarningShown) {
        deprecationWarningShown = true;
        const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        if (process.emitWarning) {
          process.emitWarning(message, "DeprecationWarning");
        } else {
          const deprecationError = new Error(message);
          deprecationError.name = "DeprecationWarning";
          console.warn(new Error(message));
        }
      }
      colNumber = Math.max(colNumber, 0);
      const location = {
        start: {
          column: colNumber,
          line: lineNumber
        }
      };
      return codeFrameColumns2(rawLines, location, opts);
    }
  }
});

// node_modules/.pnpm/imurmurhash@0.1.4/node_modules/imurmurhash/imurmurhash.js
var require_imurmurhash = __commonJS({
  "node_modules/.pnpm/imurmurhash@0.1.4/node_modules/imurmurhash/imurmurhash.js"(exports2, module2) {
    init_cjs_shims();
    (function() {
      var cache;
      function MurmurHash3(key, seed) {
        var m = this instanceof MurmurHash3 ? this : cache;
        m.reset(seed);
        if (typeof key === "string" && key.length > 0) {
          m.hash(key);
        }
        if (m !== this) {
          return m;
        }
      }
      ;
      MurmurHash3.prototype.hash = function(key) {
        var h1, k1, i, top, len;
        len = key.length;
        this.len += len;
        k1 = this.k1;
        i = 0;
        switch (this.rem) {
          case 0:
            k1 ^= len > i ? key.charCodeAt(i++) & 65535 : 0;
          case 1:
            k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 8 : 0;
          case 2:
            k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 16 : 0;
          case 3:
            k1 ^= len > i ? (key.charCodeAt(i) & 255) << 24 : 0;
            k1 ^= len > i ? (key.charCodeAt(i++) & 65280) >> 8 : 0;
        }
        this.rem = len + this.rem & 3;
        len -= this.rem;
        if (len > 0) {
          h1 = this.h1;
          while (1) {
            k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
            k1 = k1 << 15 | k1 >>> 17;
            k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
            h1 ^= k1;
            h1 = h1 << 13 | h1 >>> 19;
            h1 = h1 * 5 + 3864292196 & 4294967295;
            if (i >= len) {
              break;
            }
            k1 = key.charCodeAt(i++) & 65535 ^ (key.charCodeAt(i++) & 65535) << 8 ^ (key.charCodeAt(i++) & 65535) << 16;
            top = key.charCodeAt(i++);
            k1 ^= (top & 255) << 24 ^ (top & 65280) >> 8;
          }
          k1 = 0;
          switch (this.rem) {
            case 3:
              k1 ^= (key.charCodeAt(i + 2) & 65535) << 16;
            case 2:
              k1 ^= (key.charCodeAt(i + 1) & 65535) << 8;
            case 1:
              k1 ^= key.charCodeAt(i) & 65535;
          }
          this.h1 = h1;
        }
        this.k1 = k1;
        return this;
      };
      MurmurHash3.prototype.result = function() {
        var k1, h1;
        k1 = this.k1;
        h1 = this.h1;
        if (k1 > 0) {
          k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
          k1 = k1 << 15 | k1 >>> 17;
          k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
          h1 ^= k1;
        }
        h1 ^= this.len;
        h1 ^= h1 >>> 16;
        h1 = h1 * 51819 + (h1 & 65535) * 2246770688 & 4294967295;
        h1 ^= h1 >>> 13;
        h1 = h1 * 44597 + (h1 & 65535) * 3266445312 & 4294967295;
        h1 ^= h1 >>> 16;
        return h1 >>> 0;
      };
      MurmurHash3.prototype.reset = function(seed) {
        this.h1 = typeof seed === "number" ? seed : 0;
        this.rem = this.k1 = this.len = 0;
        return this;
      };
      cache = new MurmurHash3();
      if (typeof module2 != "undefined") {
        module2.exports = MurmurHash3;
      } else {
        this.MurmurHash3 = MurmurHash3;
      }
    })();
  }
});

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/signals.js
var require_signals = __commonJS({
  "node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/signals.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.signals = void 0;
    exports2.signals = [];
    exports2.signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      exports2.signals.push(
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
      exports2.signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unload = exports2.load = exports2.onExit = exports2.signals = void 0;
    var signals_js_1 = require_signals();
    Object.defineProperty(exports2, "signals", { enumerable: true, get: function() {
      return signals_js_1.signals;
    } });
    var processOk2 = (process9) => !!process9 && typeof process9 === "object" && typeof process9.removeListener === "function" && typeof process9.emit === "function" && typeof process9.reallyExit === "function" && typeof process9.listeners === "function" && typeof process9.kill === "function" && typeof process9.pid === "number" && typeof process9.on === "function";
    var kExitEmitter2 = Symbol.for("signal-exit emitter");
    var global2 = globalThis;
    var ObjectDefineProperty2 = Object.defineProperty.bind(Object);
    var Emitter2 = class {
      emitted = {
        afterExit: false,
        exit: false
      };
      listeners = {
        afterExit: [],
        exit: []
      };
      count = 0;
      id = Math.random();
      constructor() {
        if (global2[kExitEmitter2]) {
          return global2[kExitEmitter2];
        }
        ObjectDefineProperty2(global2, kExitEmitter2, {
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
        const list3 = this.listeners[ev];
        const i = list3.indexOf(fn);
        if (i === -1) {
          return;
        }
        if (i === 0 && list3.length === 1) {
          list3.length = 0;
        } else {
          list3.splice(i, 1);
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
    };
    var SignalExitBase2 = class {
    };
    var signalExitWrap2 = (handler2) => {
      return {
        onExit(cb, opts) {
          return handler2.onExit(cb, opts);
        },
        load() {
          return handler2.load();
        },
        unload() {
          return handler2.unload();
        }
      };
    };
    var SignalExitFallback2 = class extends SignalExitBase2 {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    var SignalExit2 = class extends SignalExitBase2 {
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process8.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter2();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process9) {
        super();
        this.#process = process9;
        this.#sigListeners = {};
        for (const sig of signals_js_1.signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count } = this.#emitter;
            const p = process9;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process9.kill(process9.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process9.reallyExit;
        this.#originalProcessEmit = process9.emit;
      }
      onExit(cb, opts) {
        if (!processOk2(this.#process)) {
          return () => {
          };
        }
        if (this.#loaded === false) {
          this.load();
        }
        const ev = opts?.alwaysLast ? "afterExit" : "exit";
        this.#emitter.on(ev, cb);
        return () => {
          this.#emitter.removeListener(ev, cb);
          if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
            this.unload();
          }
        };
      }
      load() {
        if (this.#loaded) {
          return;
        }
        this.#loaded = true;
        this.#emitter.count += 1;
        for (const sig of signals_js_1.signals) {
          try {
            const fn = this.#sigListeners[sig];
            if (fn)
              this.#process.on(sig, fn);
          } catch (_) {
          }
        }
        this.#process.emit = (ev, ...a) => {
          return this.#processEmit(ev, ...a);
        };
        this.#process.reallyExit = (code) => {
          return this.#processReallyExit(code);
        };
      }
      unload() {
        if (!this.#loaded) {
          return;
        }
        this.#loaded = false;
        signals_js_1.signals.forEach((sig) => {
          const listener = this.#sigListeners[sig];
          if (!listener) {
            throw new Error("Listener not defined for signal: " + sig);
          }
          try {
            this.#process.removeListener(sig, listener);
          } catch (_) {
          }
        });
        this.#process.emit = this.#originalProcessEmit;
        this.#process.reallyExit = this.#originalProcessReallyExit;
        this.#emitter.count -= 1;
      }
      #processReallyExit(code) {
        if (!processOk2(this.#process)) {
          return 0;
        }
        this.#process.exitCode = code || 0;
        this.#emitter.emit("exit", this.#process.exitCode, null);
        return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
      }
      #processEmit(ev, ...args) {
        const og = this.#originalProcessEmit;
        if (ev === "exit" && processOk2(this.#process)) {
          if (typeof args[0] === "number") {
            this.#process.exitCode = args[0];
          }
          const ret = og.call(this.#process, ev, ...args);
          this.#emitter.emit("exit", this.#process.exitCode, null);
          return ret;
        } else {
          return og.call(this.#process, ev, ...args);
        }
      }
    };
    var process8 = globalThis.process;
    _a = signalExitWrap2(processOk2(process8) ? new SignalExit2(process8) : new SignalExitFallback2()), /**
     * Called when the process is exiting, whether via signal, explicit
     * exit, or running out of stuff to do.
     *
     * If the global process object is not suitable for instrumentation,
     * then this will be a no-op.
     *
     * Returns a function that may be used to unload signal-exit.
     */
    exports2.onExit = _a.onExit, /**
     * Load the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports2.load = _a.load, /**
     * Unload the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports2.unload = _a.unload;
  }
});

// node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    module2.exports = writeFile11;
    module2.exports.sync = writeFileSync3;
    module2.exports._getTmpname = getTmpname;
    module2.exports._cleanupOnExit = cleanupOnExit;
    var fs = require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit: onExit2 } = require_cjs();
    var path2 = require("path");
    var { promisify } = require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = require("worker_threads");
        return workerThreads.threadId;
      } catch (e) {
        return 0;
      }
    }();
    var invocations = 0;
    function getTmpname(filename) {
      return filename + "." + MurmurHash3(__filename).hash(String(process.pid)).hash(String(threadId)).hash(String(++invocations)).result();
    }
    function cleanupOnExit(tmpfile) {
      return () => {
        try {
          fs.unlinkSync(typeof tmpfile === "function" ? tmpfile() : tmpfile);
        } catch {
        }
      };
    }
    function serializeActiveFile(absoluteName) {
      return new Promise((resolve3) => {
        if (!activeFiles[absoluteName]) {
          activeFiles[absoluteName] = [];
        }
        activeFiles[absoluteName].push(resolve3);
        if (activeFiles[absoluteName].length === 1) {
          resolve3();
        }
      });
    }
    function isChownErrOk(err) {
      if (err.code === "ENOSYS") {
        return true;
      }
      const nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (err.code === "EINVAL" || err.code === "EPERM") {
          return true;
        }
      }
      return false;
    }
    async function writeFileAsync(filename, data, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      let fd;
      let tmpfile;
      const removeOnExitHandler = onExit2(cleanupOnExit(() => tmpfile));
      const absoluteName = path2.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify(fs.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify(fs.stat)(truename).catch(() => {
          });
          if (stats) {
            if (options.mode == null) {
              options.mode = stats.mode;
            }
            if (options.chown == null && process.getuid) {
              options.chown = { uid: stats.uid, gid: stats.gid };
            }
          }
        }
        fd = await promisify(fs.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify(fs.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify(fs.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify(fs.fsync)(fd);
        }
        await promisify(fs.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify(fs.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify(fs.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify(fs.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify(fs.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify(fs.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile11(filename, data, options, callback) {
      if (options instanceof Function) {
        callback = options;
        options = {};
      }
      const promise = writeFileAsync(filename, data, options);
      if (callback) {
        try {
          const result = await promise;
          return callback(result);
        } catch (err) {
          return callback(err);
        }
      }
      return promise;
    }
    function writeFileSync3(filename, data, options) {
      if (typeof options === "string") {
        options = { encoding: options };
      } else if (!options) {
        options = {};
      }
      try {
        filename = fs.realpathSync(filename);
      } catch (ex) {
      }
      const tmpfile = getTmpname(filename);
      if (!options.mode || !options.chown) {
        try {
          const stats = fs.statSync(filename);
          options = Object.assign({}, options);
          if (!options.mode) {
            options.mode = stats.mode;
          }
          if (!options.chown && process.getuid) {
            options.chown = { uid: stats.uid, gid: stats.gid };
          }
        } catch (ex) {
        }
      }
      let fd;
      const cleanup = cleanupOnExit(tmpfile);
      const removeOnExitHandler = onExit2(cleanup);
      let threw = true;
      try {
        fd = fs.openSync(tmpfile, "w", options.mode || 438);
        if (options.tmpfileCreated) {
          options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          fs.writeSync(fd, data, 0, data.length, 0);
        } else if (data != null) {
          fs.writeSync(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          fs.fsyncSync(fd);
        }
        fs.closeSync(fd);
        fd = null;
        if (options.chown) {
          try {
            fs.chownSync(tmpfile, options.chown.uid, options.chown.gid);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        if (options.mode) {
          try {
            fs.chmodSync(tmpfile, options.mode);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        fs.renameSync(tmpfile, filename);
        threw = false;
      } finally {
        if (fd) {
          try {
            fs.closeSync(fd);
          } catch (ex) {
          }
        }
        removeOnExitHandler();
        if (threw) {
          cleanup();
        }
      }
    }
  }
});

// node_modules/.pnpm/tree-kill@1.2.2/node_modules/tree-kill/index.js
var require_tree_kill = __commonJS({
  "node_modules/.pnpm/tree-kill@1.2.2/node_modules/tree-kill/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var childProcess = require("child_process");
    var spawn4 = childProcess.spawn;
    var exec3 = childProcess.exec;
    module2.exports = function(pid, signal, callback) {
      if (typeof signal === "function" && callback === void 0) {
        callback = signal;
        signal = void 0;
      }
      pid = parseInt(pid);
      if (Number.isNaN(pid)) {
        if (callback) {
          return callback(new Error("pid must be a number"));
        } else {
          throw new Error("pid must be a number");
        }
      }
      var tree = {};
      var pidsToProcess = {};
      tree[pid] = [];
      pidsToProcess[pid] = 1;
      switch (process.platform) {
        case "win32":
          exec3("taskkill /pid " + pid + " /T /F", callback);
          break;
        case "darwin":
          buildProcessTree(pid, tree, pidsToProcess, function(parentPid) {
            return spawn4("pgrep", ["-P", parentPid]);
          }, function() {
            killAll(tree, signal, callback);
          });
          break;
        // case 'sunos':
        //     buildProcessTreeSunOS(pid, tree, pidsToProcess, function () {
        //         killAll(tree, signal, callback);
        //     });
        //     break;
        default:
          buildProcessTree(pid, tree, pidsToProcess, function(parentPid) {
            return spawn4("ps", ["-o", "pid", "--no-headers", "--ppid", parentPid]);
          }, function() {
            killAll(tree, signal, callback);
          });
          break;
      }
    };
    function killAll(tree, signal, callback) {
      var killed = {};
      try {
        Object.keys(tree).forEach(function(pid) {
          tree[pid].forEach(function(pidpid) {
            if (!killed[pidpid]) {
              killPid(pidpid, signal);
              killed[pidpid] = 1;
            }
          });
          if (!killed[pid]) {
            killPid(pid, signal);
            killed[pid] = 1;
          }
        });
      } catch (err) {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
      if (callback) {
        return callback();
      }
    }
    function killPid(pid, signal) {
      try {
        process.kill(parseInt(pid, 10), signal);
      } catch (err) {
        if (err.code !== "ESRCH") throw err;
      }
    }
    function buildProcessTree(parentPid, tree, pidsToProcess, spawnChildProcessesList, cb) {
      var ps = spawnChildProcessesList(parentPid);
      var allData = "";
      ps.stdout.on("data", function(data) {
        var data = data.toString("ascii");
        allData += data;
      });
      var onClose = function(code) {
        delete pidsToProcess[parentPid];
        if (code != 0) {
          if (Object.keys(pidsToProcess).length == 0) {
            cb();
          }
          return;
        }
        allData.match(/\d+/g).forEach(function(pid) {
          pid = parseInt(pid, 10);
          tree[parentPid].push(pid);
          tree[pid] = [];
          pidsToProcess[pid] = 1;
          buildProcessTree(pid, tree, pidsToProcess, spawnChildProcessesList, cb);
        });
      };
      ps.on("close", onClose);
    }
  }
});

// syncify/cli.ts
init_cjs_shims();
var import_node_process11 = require("process");
var import_minimist = __toESM(require_minimist());

// syncify/index.ts
init_cjs_shims();
var import_node_process10 = require("process");

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/allFalse.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isTruthy.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/type.js
init_cjs_shims();
function type(input) {
  if (input === null) {
    return "Null";
  } else if (input === void 0) {
    return "Undefined";
  } else if (Number.isNaN(input)) {
    return "NaN";
  }
  const typeResult = Object.prototype.toString.call(input).slice(8, -1);
  return typeResult === "AsyncFunction" ? "Promise" : typeResult;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isArray.js
init_cjs_shims();
var { isArray } = Array;

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isTruthy.js
function isTruthy(x) {
  if (isArray(x)) {
    return x.length > 0;
  }
  if (type(x) === "Object") {
    return Object.keys(x).length > 0;
  }
  return Boolean(x);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/allFalse.js
function allFalse(...inputs) {
  let counter = 0;
  while (counter < inputs.length) {
    const x = inputs[counter];
    if (type(x) === "Function") {
      if (isTruthy(x())) {
        return false;
      }
    } else if (isTruthy(x)) {
      return false;
    }
    counter++;
  }
  return true;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/allTrue.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isFalsy.js
init_cjs_shims();
function isFalsy(x) {
  if (isArray(x)) {
    return x.length === 0;
  }
  if (type(x) === "Object") {
    return Object.keys(x).length === 0;
  }
  return !x;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/allTrue.js
function allTrue(...inputs) {
  let counter = 0;
  while (counter < inputs.length) {
    const x = inputs[counter];
    if (type(x) === "Function") {
      if (isFalsy(x())) {
        return false;
      }
    } else if (isFalsy(x)) {
      return false;
    }
    counter++;
  }
  return true;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/anyTrue.js
init_cjs_shims();
function anyTrue(...inputs) {
  let counter = 0;
  while (counter < inputs.length) {
    const x = inputs[counter];
    if (type(x) === "Function") {
      if (isTruthy(x())) {
        return true;
      }
    } else if (isTruthy(x)) {
      return true;
    }
    counter++;
  }
  return false;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/createPath.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isInteger.js
init_cjs_shims();
function _isInteger(n) {
  return n << 0 === n;
}
var isInteger = Number.isInteger || _isInteger;

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/createPath.js
function createPath(path2, delimiter = ".") {
  return typeof path2 === "string" ? path2.split(delimiter).map((x) => isInteger(x) ? Number(x) : x) : path2;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/path.js
init_cjs_shims();
function pathFn(pathInput, obj) {
  let willReturn = obj;
  let counter = 0;
  const pathArrValue = createPath(pathInput);
  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === void 0) {
      return void 0;
    }
    if (willReturn[pathArrValue[counter]] === null) return void 0;
    willReturn = willReturn[pathArrValue[counter]];
    counter++;
  }
  return willReturn;
}
function path(pathInput, obj) {
  if (arguments.length === 1) return (_obj) => path(pathInput, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  return pathFn(pathInput, obj);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/equals.js
init_cjs_shims();
function _indexOf(valueToFind, list3) {
  if (!isArray(list3))
    throw new Error(`Cannot read property 'indexOf' of ${list3}`);
  const typeOfValue = type(valueToFind);
  if (!["Array", "NaN", "Object", "RegExp"].includes(typeOfValue))
    return list3.indexOf(valueToFind);
  let index = -1;
  let foundIndex = -1;
  const { length } = list3;
  while (++index < length && foundIndex === -1)
    if (equals(list3[index], valueToFind))
      foundIndex = index;
  return foundIndex;
}
function _arrayFromIterator(iter) {
  const list3 = [];
  let next;
  while (!(next = iter.next()).done)
    list3.push(next.value);
  return list3;
}
function _compareSets(a, b) {
  if (a.size !== b.size)
    return false;
  const aList = _arrayFromIterator(a.values());
  const bList = _arrayFromIterator(b.values());
  const filtered = aList.filter((aInstance) => _indexOf(aInstance, bList) === -1);
  return filtered.length === 0;
}
function compareErrors(a, b) {
  if (a.message !== b.message) return false;
  if (a.toString !== b.toString) return false;
  return a.toString() === b.toString();
}
function parseDate(maybeDate) {
  if (!maybeDate.toDateString) return [false];
  return [true, maybeDate.getTime()];
}
function parseRegex(maybeRegex) {
  if (maybeRegex.constructor !== RegExp) return [false];
  return [true, maybeRegex.toString()];
}
function equals(a, b) {
  if (arguments.length === 1) return (_b) => equals(a, _b);
  if (Object.is(a, b)) return true;
  const aType = type(a);
  if (aType !== type(b)) return false;
  if (aType === "Function")
    return a.name === void 0 ? false : a.name === b.name;
  if (["NaN", "Null", "Undefined"].includes(aType)) return true;
  if (["BigInt", "Number"].includes(aType)) {
    if (Object.is(-0, a) !== Object.is(-0, b)) return false;
    return a.toString() === b.toString();
  }
  if (["Boolean", "String"].includes(aType))
    return a.toString() === b.toString();
  if (aType === "Array") {
    const aClone = Array.from(a);
    const bClone = Array.from(b);
    if (aClone.toString() !== bClone.toString())
      return false;
    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex]))
          loopArrayFlag = false;
      }
    });
    return loopArrayFlag;
  }
  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);
  if (aRegex[0])
    return bRegex[0] ? aRegex[1] === bRegex[1] : false;
  else if (bRegex[0]) return false;
  const aDate = parseDate(a);
  const bDate = parseDate(b);
  if (aDate[0])
    return bDate[0] ? aDate[1] === bDate[1] : false;
  else if (bDate[0]) return false;
  if (a instanceof Error) {
    if (!(b instanceof Error)) return false;
    return compareErrors(a, b);
  }
  if (aType === "Set")
    return _compareSets(a, b);
  if (aType === "Object") {
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length)
      return false;
    let loopObjectFlag = true;
    aKeys.forEach((aKeyInstance) => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];
        if (aValue !== bValue && !equals(aValue, bValue))
          loopObjectFlag = false;
      }
    });
    return loopObjectFlag;
  }
  return false;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/delay.js
init_cjs_shims();
var DELAY = "RAMBDAX_DELAY";
function delay(ms) {
  return new Promise((resolve3) => {
    setTimeout(() => {
      resolve3(DELAY);
    }, ms);
  });
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/includes.js
init_cjs_shims();
function includes(valueToFind, iterable) {
  if (arguments.length === 1)
    return (_iterable) => includes(valueToFind, _iterable);
  if (typeof iterable === "string") {
    return iterable.includes(valueToFind);
  }
  if (!iterable) {
    throw new TypeError(`Cannot read property 'indexOf' of ${iterable}`);
  }
  if (!isArray(iterable)) return false;
  return _indexOf(valueToFind, iterable) > -1;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/isType.js
init_cjs_shims();
function isType(xType, x) {
  if (arguments.length === 1) {
    return (xHolder) => isType(xType, xHolder);
  }
  return type(x) === xType;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/mapParallelAsync.js
init_cjs_shims();
async function mapParallelAsyncFn(fn, arr) {
  const promised = arr.map((a, i) => fn(a, i));
  return Promise.all(promised);
}
function mapParallelAsync(fn, arr) {
  if (arguments.length === 1) {
    return async (holder) => mapParallelAsyncFn(fn, holder);
  }
  return new Promise((resolve3, reject) => {
    mapParallelAsyncFn(fn, arr).then(resolve3).catch(reject);
  });
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/omit.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/includes.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/compare.js
init_cjs_shims();
function compare(a, b) {
  return String(a) === String(b);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/includes.js
function includes2(a, list3) {
  let index = -1;
  const { length } = list3;
  while (++index < length)
    if (compare(list3[index], a))
      return true;
  return false;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/omit.js
function omit(propsToOmit, obj) {
  if (arguments.length === 1) return (_obj) => omit(propsToOmit, _obj);
  if (obj === null || obj === void 0)
    return void 0;
  const propsToOmitValue = createPath(propsToOmit, ",");
  const willReturn = {};
  for (const key in obj)
    if (!includes2(key, propsToOmitValue))
      willReturn[key] = obj[key];
  return willReturn;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/has.js
init_cjs_shims();
function has(prop, obj) {
  if (arguments.length === 1) return (_obj) => has(prop, _obj);
  if (!obj) return false;
  return obj.hasOwnProperty(prop);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/hasPath.js
init_cjs_shims();
function hasPath(pathInput, obj) {
  if (arguments.length === 1) {
    return (objHolder) => hasPath(pathInput, objHolder);
  }
  return path(pathInput, obj) !== void 0;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/isEmpty.js
init_cjs_shims();
function isEmpty(input) {
  const inputType = type(input);
  if (["Undefined", "NaN", "Number", "Null"].includes(inputType))
    return false;
  if (!input) return true;
  if (inputType === "Object") {
    return Object.keys(input).length === 0;
  }
  if (inputType === "Array") {
    return input.length === 0;
  }
  return false;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/isNil.js
init_cjs_shims();
function isNil(x) {
  return x === void 0 || x === null;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/last.js
init_cjs_shims();
function last(listOrString) {
  if (typeof listOrString === "string") {
    return listOrString[listOrString.length - 1] || "";
  }
  return listOrString[listOrString.length - 1];
}

// syncify/modes/upload.ts
init_cjs_shims();
var import_fast_glob = __toESM(require("fast-glob"));
var import_pathe8 = require("pathe");
var import_fs_extra3 = require("fs-extra");

// syncify/requests/client.ts
init_cjs_shims();

// node_modules/.pnpm/p-map@7.0.2/node_modules/p-map/index.js
init_cjs_shims();
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true,
  signal
} = {}) {
  return new Promise((resolve3, reject_) => {
    if (iterable[Symbol.iterator] === void 0 && iterable[Symbol.asyncIterator] === void 0) {
      throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`);
    }
    if (typeof mapper !== "function") {
      throw new TypeError("Mapper function is required");
    }
    if (!(Number.isSafeInteger(concurrency) && concurrency >= 1 || concurrency === Number.POSITIVE_INFINITY)) {
      throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
    }
    const result = [];
    const errors = [];
    const skippedIndexesMap = /* @__PURE__ */ new Map();
    let isRejected = false;
    let isResolved = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;
    const iterator = iterable[Symbol.iterator] === void 0 ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
    const reject = (reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
    };
    if (signal) {
      if (signal.aborted) {
        reject(signal.reason);
      }
      signal.addEventListener("abort", () => {
        reject(signal.reason);
      });
    }
    const next = async () => {
      if (isResolved) {
        return;
      }
      const nextItem = await iterator.next();
      const index = currentIndex;
      currentIndex++;
      if (nextItem.done) {
        isIterableDone = true;
        if (resolvingCount === 0 && !isResolved) {
          if (!stopOnError && errors.length > 0) {
            reject(new AggregateError(errors));
            return;
          }
          isResolved = true;
          if (skippedIndexesMap.size === 0) {
            resolve3(result);
            return;
          }
          const pureResult = [];
          for (const [index2, value] of result.entries()) {
            if (skippedIndexesMap.get(index2) === pMapSkip) {
              continue;
            }
            pureResult.push(value);
          }
          resolve3(pureResult);
        }
        return;
      }
      resolvingCount++;
      (async () => {
        try {
          const element = await nextItem.value;
          if (isResolved) {
            return;
          }
          const value = await mapper(element, index);
          if (value === pMapSkip) {
            skippedIndexesMap.set(index, value);
          }
          result[index] = value;
          resolvingCount--;
          await next();
        } catch (error3) {
          if (stopOnError) {
            reject(error3);
          } else {
            errors.push(error3);
            resolvingCount--;
            try {
              await next();
            } catch (error4) {
              reject(error4);
            }
          }
        }
      })();
    };
    (async () => {
      for (let index = 0; index < concurrency; index++) {
        try {
          await next();
        } catch (error3) {
          reject(error3);
          break;
        }
        if (isIterableDone || isRejected) {
          break;
        }
      }
    })();
  });
}
var pMapSkip = Symbol("skip");

// syncify/requests/queue.ts
init_cjs_shims();

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/index.js
init_cjs_shims();

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
init_cjs_shims();
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/.pnpm/p-timeout@6.1.2/node_modules/p-timeout/index.js
init_cjs_shims();
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer2;
  const wrappedPromise = new Promise((resolve3, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve3, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer2 = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve3(fallback());
        } catch (error3) {
          reject(error3);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve3();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve3(await promise);
      } catch (error3) {
        reject(error3);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer2);
    timer2 = void 0;
  };
  return cancelablePromise;
}

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/priority-queue.js
init_cjs_shims();

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/lower-bound.js
init_cjs_shims();
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

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/priority-queue.js
var PriorityQueue = class {
  #queue = [];
  enqueue(run2, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run: run2
    };
    if (this.size && this.#queue[this.size - 1].priority >= options.priority) {
      this.#queue.push(element);
      return;
    }
    const index = lowerBound(this.#queue, element, (a, b) => b.priority - a.priority);
    this.#queue.splice(index, 0, element);
  }
  dequeue() {
    const item = this.#queue.shift();
    return item?.run;
  }
  filter(options) {
    return this.#queue.filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return this.#queue.length;
  }
};

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/index.js
var PQueue = class extends import_index.default {
  #carryoverConcurrencyCount;
  #isIntervalIgnored;
  #intervalCount = 0;
  #intervalCap;
  #interval;
  #intervalEnd = 0;
  #intervalId;
  #timeoutId;
  #queue;
  #queueClass;
  #pending = 0;
  // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
  #concurrency;
  #isPaused;
  #throwOnTimeout;
  /**
      Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
  
      Applies to each future operation.
      */
  timeout;
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    super();
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
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap?.toString() ?? ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval?.toString() ?? ""}\` (${typeof options.interval})`);
    }
    this.#carryoverConcurrencyCount = options.carryoverConcurrencyCount;
    this.#isIntervalIgnored = options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0;
    this.#intervalCap = options.intervalCap;
    this.#interval = options.interval;
    this.#queue = new options.queueClass();
    this.#queueClass = options.queueClass;
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    this.#throwOnTimeout = options.throwOnTimeout === true;
    this.#isPaused = options.autoStart === false;
  }
  get #doesIntervalAllowAnother() {
    return this.#isIntervalIgnored || this.#intervalCount < this.#intervalCap;
  }
  get #doesConcurrentAllowAnother() {
    return this.#pending < this.#concurrency;
  }
  #next() {
    this.#pending--;
    this.#tryToStartAnother();
    this.emit("next");
  }
  #onResumeInterval() {
    this.#onInterval();
    this.#initializeIntervalIfNeeded();
    this.#timeoutId = void 0;
  }
  get #isIntervalPaused() {
    const now = Date.now();
    if (this.#intervalId === void 0) {
      const delay2 = this.#intervalEnd - now;
      if (delay2 < 0) {
        this.#intervalCount = this.#carryoverConcurrencyCount ? this.#pending : 0;
      } else {
        if (this.#timeoutId === void 0) {
          this.#timeoutId = setTimeout(() => {
            this.#onResumeInterval();
          }, delay2);
        }
        return true;
      }
    }
    return false;
  }
  #tryToStartAnother() {
    if (this.#queue.size === 0) {
      if (this.#intervalId) {
        clearInterval(this.#intervalId);
      }
      this.#intervalId = void 0;
      this.emit("empty");
      if (this.#pending === 0) {
        this.emit("idle");
      }
      return false;
    }
    if (!this.#isPaused) {
      const canInitializeInterval = !this.#isIntervalPaused;
      if (this.#doesIntervalAllowAnother && this.#doesConcurrentAllowAnother) {
        const job = this.#queue.dequeue();
        if (!job) {
          return false;
        }
        this.emit("active");
        job();
        if (canInitializeInterval) {
          this.#initializeIntervalIfNeeded();
        }
        return true;
      }
    }
    return false;
  }
  #initializeIntervalIfNeeded() {
    if (this.#isIntervalIgnored || this.#intervalId !== void 0) {
      return;
    }
    this.#intervalId = setInterval(() => {
      this.#onInterval();
    }, this.#interval);
    this.#intervalEnd = Date.now() + this.#interval;
  }
  #onInterval() {
    if (this.#intervalCount === 0 && this.#pending === 0 && this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = void 0;
    }
    this.#intervalCount = this.#carryoverConcurrencyCount ? this.#pending : 0;
    this.#processQueue();
  }
  /**
  Executes all queued functions until it reaches the limit.
  */
  #processQueue() {
    while (this.#tryToStartAnother()) {
    }
  }
  get concurrency() {
    return this.#concurrency;
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    this.#concurrency = newConcurrency;
    this.#processQueue();
  }
  async #throwOnAbort(signal) {
    return new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => {
        reject(signal.reason);
      }, { once: true });
    });
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      throwOnTimeout: this.#throwOnTimeout,
      ...options
    };
    return new Promise((resolve3, reject) => {
      this.#queue.enqueue(async () => {
        this.#pending++;
        this.#intervalCount++;
        try {
          options.signal?.throwIfAborted();
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), { milliseconds: options.timeout });
          }
          if (options.signal) {
            operation = Promise.race([operation, this.#throwOnAbort(options.signal)]);
          }
          const result = await operation;
          resolve3(result);
          this.emit("completed", result);
        } catch (error3) {
          if (error3 instanceof TimeoutError && !options.throwOnTimeout) {
            resolve3();
            return;
          }
          reject(error3);
          this.emit("error", error3);
        } finally {
          this.#next();
        }
      }, options);
      this.emit("add");
      this.#tryToStartAnother();
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!this.#isPaused) {
      return this;
    }
    this.#isPaused = false;
    this.#processQueue();
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    this.#isPaused = true;
  }
  /**
  Clear the queue.
  */
  clear() {
    this.#queue = new this.#queueClass();
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (this.#queue.size === 0) {
      return;
    }
    await this.#onEvent("empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit2) {
    if (this.#queue.size < limit2) {
      return;
    }
    await this.#onEvent("next", () => this.#queue.size < limit2);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (this.#pending === 0 && this.#queue.size === 0) {
      return;
    }
    await this.#onEvent("idle");
  }
  async #onEvent(event2, filter) {
    return new Promise((resolve3) => {
      const listener = () => {
        if (filter && !filter()) {
          return;
        }
        this.off(event2, listener);
        resolve3();
      };
      this.on(event2, listener);
    });
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return this.#queue.size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return this.#queue.filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return this.#pending;
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return this.#isPaused;
  }
};

// syncify/requests/queue.ts
var import_axios = __toESM(require("axios"));
var axios = import_axios.default.create({
  responseType: "json",
  headers: {}
});
var queue = new PQueue({
  // concurrency: 5,
  interval: 500,
  intervalCap: 2
});
function requeue(status) {
  if (status === 429 || status === 500) return true;
  if (!queue.isPaused) queue.pause();
  return false;
}

// syncify/utils/timer.ts
init_cjs_shims();
var import_node_perf_hooks = require("perf_hooks");

// syncify/utils/native.ts
init_cjs_shims();
var import_node_console = require("console");
var import_node_process = require("process");
var import_node_events = require("events");
var event = new import_node_events.EventEmitter();
var { error, log, warn, clear } = new import_node_console.Console(import_node_process.stdout, import_node_process.stderr);
var {
  create,
  assign,
  defineProperty,
  defineProperties,
  keys,
  values,
  setPrototypeOf
} = Object;
var toArray = Array.from;
var toBuffer = Buffer.from;
var { abs } = Math;
var { toString: toString2 } = Object.prototype;

// syncify/utils/timer.ts
var timer = new class Timer {
  /**
   * Timer cache
   *
   * Holds reference to different running timers
   */
  marks = [];
  /**
   * Timer Reference
   *
   * Similar to `mark[]` but provides identifer timers.
   */
  time = {};
  /**
   * Timer Cache
   *
   * Used to stop a timer but maintain a reference.
   */
  cache = {};
  /**
   * Current Time
   *
   * Sugar for the `stop` function.
   */
  now(id) {
    return this.stop(id || true);
  }
  /**
   * Current Time
   *
   * Sugar for the `stop` function.
   */
  sec(id) {
    const t = this.stop(id || true);
    return t.slice(0, t.lastIndexOf(" "));
  }
  /**
   * Pause Timer
   *
   * Pauses a timer and sets it into `cache` -
   * Use `now()` to retreive and remove.
   */
  pause(id) {
    if (id in this.marks) {
      this.cache[id] = this.stop(id || true);
    }
  }
  /**
   * Start timer
   *
   * Captures the current timestamp and applies it to the mark model.
   */
  start(id) {
    if (id) {
      this.time[id] = import_node_perf_hooks.performance.now();
    } else {
      this.marks.push(import_node_perf_hooks.performance.now());
    }
  }
  /**
   * Clear timers
   *
   * Removes all the timing references from the mark model.
   */
  clear(id) {
    if (id) {
      if (id in this.time) {
        delete this.time[id];
        return;
      }
      if (id in this.cache) {
        delete this.cache[id];
        return;
      }
    }
    while (this.marks.length !== 0) this.marks.pop();
  }
  /**
   * Stop timer
   *
   * Stops the timer and returns the execution time as a string.
   * The function will remove the mark from cache by default, unless
   * passing a `boolean` value `true` which will return the _current_
   * elapsed time of the last known mark in cache without removing it.
   *
   * Supports following formats:
   *
   * - Miliseconds: `10ms`
   * - Seconds and Miliseconds: `2s 45ms`
   * - Minutes, Seconds and Miliseconds: `2m 35sec 33ms`
   */
  stop(now = false, end = false) {
    let gt;
    if (typeof now === "boolean") {
      gt = now ? this.marks[this.marks.length - 1] : this.marks.pop();
    } else if (now) {
      if (now in this.cache) {
        const s2 = this.cache[now];
        delete this.cache[now];
        return s2;
      }
      if (end) {
        gt = this.time[now];
        delete this.time[now];
      } else {
        gt = this.time[now];
      }
    }
    const ms = import_node_perf_hooks.performance.now() - gt;
    if (ms < 1e3) return `${abs(+ms.toFixed(0))}ms`;
    const s = ms / 1e3;
    if (s < 60) return `${abs(+s.toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
    const m = abs(+(s / 60).toFixed(0));
    return `${m}m ${abs(+(s - 60 * Number(m)).toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
  }
}();

// syncify/utils/utils.ts
init_cjs_shims();
var import_node_crypto = require("crypto");
var import_node_module = require("module");

// node_modules/.pnpm/strip-json-comments@5.0.1/node_modules/strip-json-comments/index.js
init_cjs_shims();
var singleComment = Symbol("singleComment");
var multiComment = Symbol("multiComment");
var stripWithoutWhitespace = () => "";
var stripWithWhitespace = (string, start, end) => string.slice(start, end).replace(/\S/g, " ");
var isEscaped = (jsonString, quotePosition) => {
  let index = quotePosition - 1;
  let backslashCount = 0;
  while (jsonString[index] === "\\") {
    index -= 1;
    backslashCount += 1;
  }
  return Boolean(backslashCount % 2);
};
function stripJsonComments(jsonString, { whitespace = true, trailingCommas = false } = {}) {
  if (typeof jsonString !== "string") {
    throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof jsonString}\``);
  }
  const strip2 = whitespace ? stripWithWhitespace : stripWithoutWhitespace;
  let isInsideString = false;
  let isInsideComment = false;
  let offset = 0;
  let buffer = "";
  let result = "";
  let commaIndex = -1;
  for (let index = 0; index < jsonString.length; index++) {
    const currentCharacter = jsonString[index];
    const nextCharacter = jsonString[index + 1];
    if (!isInsideComment && currentCharacter === '"') {
      const escaped = isEscaped(jsonString, index);
      if (!escaped) {
        isInsideString = !isInsideString;
      }
    }
    if (isInsideString) {
      continue;
    }
    if (!isInsideComment && currentCharacter + nextCharacter === "//") {
      buffer += jsonString.slice(offset, index);
      offset = index;
      isInsideComment = singleComment;
      index++;
    } else if (isInsideComment === singleComment && currentCharacter + nextCharacter === "\r\n") {
      index++;
      isInsideComment = false;
      buffer += strip2(jsonString, offset, index);
      offset = index;
      continue;
    } else if (isInsideComment === singleComment && currentCharacter === "\n") {
      isInsideComment = false;
      buffer += strip2(jsonString, offset, index);
      offset = index;
    } else if (!isInsideComment && currentCharacter + nextCharacter === "/*") {
      buffer += jsonString.slice(offset, index);
      offset = index;
      isInsideComment = multiComment;
      index++;
      continue;
    } else if (isInsideComment === multiComment && currentCharacter + nextCharacter === "*/") {
      index++;
      isInsideComment = false;
      buffer += strip2(jsonString, offset, index + 1);
      offset = index + 1;
      continue;
    } else if (trailingCommas && !isInsideComment) {
      if (commaIndex !== -1) {
        if (currentCharacter === "}" || currentCharacter === "]") {
          buffer += jsonString.slice(offset, index);
          result += strip2(buffer, 0, 1) + buffer.slice(1);
          buffer = "";
          offset = index;
          commaIndex = -1;
        } else if (currentCharacter !== " " && currentCharacter !== "	" && currentCharacter !== "\r" && currentCharacter !== "\n") {
          buffer += jsonString.slice(offset, index);
          offset = index;
          commaIndex = -1;
        }
      } else if (currentCharacter === ",") {
        result += buffer + jsonString.slice(offset, index);
        buffer = "";
        offset = index;
        commaIndex = index;
      }
    }
  }
  return result + buffer + (isInsideComment ? strip2(jsonString.slice(offset)) : jsonString.slice(offset));
}

// syncify/ansi/symbol.ts
init_cjs_shims();

// syncify/ansi/colors.ts
init_cjs_shims();

// node_modules/.pnpm/ansis@3.3.2/node_modules/ansis/index.mjs
init_cjs_shims();
var import_index2 = __toESM(require_ansis(), 1);
var { ansi256, fg, bgAnsi256, bg, rgb, bgRgb, hex, bgHex, reset, inverse, hidden, visible, bold, dim, italic, underline, strikethrough, strike, black, red, green, yellow, blue, magenta, cyan, white, grey, gray, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGrey, bgGray, bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright } = import_index2.default;

// syncify/ansi/colors.ts
var clear2 = "\x1B[H\x1B[2J";
import_index2.default.extend(
  {
    brown: "#c19a6b",
    pink: "#ff75d1",
    teal: "#91EBC2",
    lightGray: "#2a2a2e",
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
  pink,
  brown,
  teal,
  orange,
  lavender,
  neonGreen,
  neonCyan,
  neonRouge,
  neonMagenta
} = import_index2.default;

// syncify/ansi/symbol.ts
var Tree = {
  /**
   * Tree Line Top
   *
   * ```bash
   * ┌─
   * ```
   */
  open: `${lightGray.open}\u250C\u2500${lightGray.close} `,
  /**
   * Tree Line Stub
   *
   * ```bash
   * ├
   * ```
   */
  stub: `${lightGray.open}\u251C${lightGray.close}  `,
  /**
   * Tree Line Dash
   *
   * ```bash
   * ├─
   * ```
   */
  dash: `${lightGray.open}\u251C\u2500${lightGray.close} `,
  /**
   * Tree Line (without suffixed whitespace)
   *
   * ```bash
   * │
   * ```
   */
  trim: `${lightGray.open}\u2502${lightGray.close}`,
  /**
   * Tree Line
   *
   * ```bash
   * │
   * ```
   */
  line: `${lightGray.open}\u2502${lightGray.close}  `,
  /**
   * Tree Line Next
   *
   * Newline plus line (i.e: `\n` will prepend but not append)
   *
   * ```bash
   *
   * │
   * ```
   */
  next: `${"\n"}${lightGray.open}\u2502${lightGray.close}`,
  /**
   * Tree Line After
   *
   * Line appended with newline (i.e: `\n` will append)
   *
   * ```bash
   * │
   *
   * ```
   */
  after: `${lightGray.open}\u2502${lightGray.close}`,
  /**
   * Tree Line Wrap
   *
   * Newlines and line (i.e: `\n` will prepend and append)
   *
   * ```bash
   *
   * │
   *
   * ```
   */
  wrap: `${"\n"}${lightGray.open}\u2502${lightGray.close}${"\n"}`,
  /**
   * Tree Line Base
   *
   * ```bash
   * └─
   * ```
   */
  base: `${lightGray.open}\u2514\u2500${lightGray.close} `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  red: `${red2.dim.open}\u2502${red2.dim.close}  `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  redTrim: `${red2.dim.open}\u2502${red2.dim.close}`,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellow: `${yellow2.dim.open}\u2502${yellow2.dim.close}  `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellowTrim: `${yellow2.dim.open}\u2502${yellow2.dim.close}`,
  /**
   * Tree Line Indentation
   *
   * Symbols used for next level lines
   */
  indent: {
    /**
     * Tree Indent Line Top
     *
     * ```bash
     * ├──┬─
     * ```
     */
    edge: `${lightGray.open}\u251C\u2500\u2500\u252C\u2500${lightGray.close} `,
    /**
     * Tree Indent Line  Fall
     *
     * ```bash
     * ├──┐
     * ```
     */
    fall: `${lightGray.open}\u251C\u2500\u2500\u2510${lightGray.close} `,
    /**
     * Tree Indent Line
     *
     * ```bash
     * │  │
     * ```
     */
    line: `${lightGray.open}\u2502  \u2502${lightGray.close} `,
    /**
     * Tree Indent Line Stub
     *
     * ```bash
     * │  ├
     * ```
     */
    stub: `${lightGray.open}\u2502  \u251C${lightGray.close} `,
    /**
     * Tree Indent Line Dash
     *
     * ```bash
     * │  ├─
     * ```
     */
    dash: `${lightGray.open}\u2502  \u251C\u2500${lightGray.close} `,
    /**
     * Tree Indent Line Base
     *
     * ```bash
     * │  └─
     * ```
     */
    base: `${lightGray.open}\u2502  \u2514\u2500${lightGray.close} `
  }
};
var PIP = `${gray2.open}|${gray2.close}`;
var HSH = `${gray2.open}#${gray2.close}`;
var PLS = `${gray2.open}+${gray2.close}`;
var MIN = `${gray2.open}-${gray2.close}`;
var COM = `${gray2.open},${gray2.close}`;
var CHK = `${neonGreen.open}\u2713${neonGreen.close}`;
var BAD = `${redBright2.open}\u{10102}${redBright2.close}`;
var COL = `${gray2.open}:${gray2.close}`;
var ARR = `${gray2.open}\u2192${gray2.close}`;
var CHV = `${gray2.open}\u25B8${gray2.close}`;
var ARL = `${gray2.open}\u2942${gray2.close}`;
var TLD = `${gray2.open}~${gray2.close}`;
var DSH = `${gray2.open}\u2014${gray2.close}`;
var LPR = `${gray2.open}(${gray2.close}`;
var RPR = `${gray2.open})${gray2.close}`;
var LCB = `${gray2.open}{${gray2.close}`;
var RCB = `${gray2.open}}${gray2.close}`;
var LSB = `${gray2.open}[${gray2.close}`;
var RSB = `${gray2.open}]${gray2.close}`;
var LAN = `${gray2.open}<${gray2.close}`;
var RAN = `${gray2.open}>${gray2.close}`;

// syncify/utils/utils.ts
function merge(source, ...patches) {
  const arr = isArray2(source);
  return function apply(isArr, copy2, patch) {
    const type2 = typeof patch;
    if (patch && type2 === "object") {
      if (isArray2(patch)) {
        for (const p of patch) copy2 = apply(isArr, copy2, p);
      } else {
        for (const k in patch) {
          const val = patch[k];
          if (isFunction(val)) {
            copy2[k] = val(copy2[k], merge);
          } else if (val === void 0) {
            if (isArr) {
              copy2.splice(k, 1);
            } else {
              delete copy2[k];
            }
          } else if (val === null || isObject(val) === false || isArray2(val)) {
            copy2[k] = val;
          } else if (typeof copy2[k] === "object") {
            copy2[k] = val === copy2[k] ? val : merge(copy2[k], val);
          } else {
            copy2[k] = apply(false, {}, val);
          }
        }
      }
    } else if (type2 === "function") {
      copy2 = patch(copy2, merge);
    }
    return copy2;
  }(arr, arr ? source.slice() : assign({}, source), patches);
}
function has2(prop, object2) {
  return isObject(object2) ? prop in object2 : false;
}
function hasProp(object2) {
  const isObj = isObject(object2);
  return (prop) => isObj ? prop in object2 : false;
}
function object(input) {
  return input ? assign(create(null), input) : create(null);
}
function detect(string, { onlyFirst = false } = {}) {
  const ansi = string.match(new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|"), onlyFirst ? void 0 : "g"));
  return ansi !== null ? ansi : false;
}
function jsonc(data) {
  if (stripJsonComments(data).trim() === "") return {};
  try {
    return new Function(`return ${stripJsonComments(data).trim()}`)();
  } catch {
    return {};
  }
}
async function dynamicImport(id, { format }) {
  if (format === "esm") {
    return (file) => import(file);
  } else {
    return getImport(id);
  }
}
function getImport(name) {
  if (isFunction(require)) return require(name);
  return (0, import_node_module.createRequire)(importMetaUrl)(name);
}
function inferLoader(ext) {
  if (ext === ".mjs" || ext === ".cjs") return "js";
  return ext.slice(1);
}
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? `0${hur}` : hur) + COL + (min < 10 ? `0${min}` : min) + COL + (sec < 10 ? `0${sec}` : sec);
}
function getChunk(array, perChunk = 2) {
  return array.reduce((acc, item, index) => {
    const ci = Math.floor(index / perChunk);
    if (!acc[ci]) acc[ci] = [];
    acc[ci].push(item);
    return acc;
  }, []);
}
function pNext() {
  return new Promise((resolve3) => {
    if (isFunction(setImmediate)) {
      setImmediate(resolve3);
    } else {
      setTimeout(resolve3);
    }
  });
}
function sanitize(message) {
  if (isBuffer(message)) return message.toString();
  if (isObject(message) || isArray2(message)) return JSON.stringify(message);
  if (isBoolean(message) || isNumber(message)) return `${message}`;
  return isString(message) ? message : String(message);
}
function checksum(input) {
  return (0, import_node_crypto.createHash)("md5").update(input).digest("hex");
}
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
function plural(word, size2) {
  if (size2 >= 2 || size2 === 0) return word[word.length - 1] !== "s" ? `${word}s` : word;
  return word[word.length - 1] !== "s" ? word : word.slice(0, -1);
}
function toUpcase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function addSuffix(number) {
  const a = number % 10;
  const b = number % 100;
  return number + (a === 1 && b !== 11 ? "st" : a === 2 && b !== 12 ? "nd" : a === 3 && b !== 13 ? "rd" : "th");
}
function glueString(...input) {
  return input.join(" ");
}
function glue(...input) {
  return isArray2(input[0]) ? input[0].join("") : input.join("");
}
function ws(array, prop = null) {
  let size2 = 0;
  if (isArray2(array)) {
    for (const item of array) {
      if (prop) {
        if (item[prop].length > size2) size2 = item[prop].length;
      } else {
        if (item.length > size2) size2 = item.length;
      }
    }
  } else {
    for (const item in array) if (item.length > size2) size2 = item.length;
  }
  size2 = size2 + 1;
  return function curried(string) {
    const n = isString(string) ? size2 - string.length : size2 - string;
    return n < 1 ? " " : " ".repeat(n);
  };
}
function uuid() {
  return Math.random().toString(36).slice(2);
}
function isNil2(input) {
  return input === void 0 || input === null;
}
function isEmptyString(input) {
  if (isBuffer(input)) return input.toString().trim().length === 0;
  return input.trim().length === 0;
}
function isEmpty2(input) {
  if (isObject(input)) {
    for (const _ in input) return false;
    return true;
  }
  if (isArray2(input)) return input.length === 0;
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN2(input)) return false;
  return !input;
}
function isArray2(param) {
  return Array.isArray(param);
}
function isObject(param) {
  return typeof param === "object";
}
function isString(param) {
  return typeof param === "string";
}
function isRegex(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === "RegExp";
}
function isFunction(param) {
  return typeof param === "function";
}
function isBoolean(param) {
  return typeof param === "boolean";
}
function isNumber(param) {
  return typeof param === "number";
}
function isNaN2(param) {
  return Number.isNaN(param);
}
function isNull(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === "Null";
}
function isUndefined(param) {
  return typeof param === "undefined";
}
function isBuffer(param) {
  return Buffer.isBuffer(param);
}

// syncify/model/$.ts
init_cjs_shims();
var import_node_process3 = require("process");

// syncify/cli/size.ts
init_cjs_shims();
var import_node_process2 = require("process");
var import_node_child_process = require("child_process");
var import_node_url = require("url");
var import_pathe = require("pathe");
function exec(command, args, shell) {
  return (0, import_node_child_process.execFileSync)(command, args, {
    encoding: "utf8",
    shell,
    stdio: [
      "ignore",
      "pipe",
      "ignore"
    ]
  }).trim();
}
function execNative(command, shell) {
  const __dirname = (0, import_pathe.dirname)((0, import_node_url.fileURLToPath)(importMetaUrl));
  return exec((0, import_pathe.join)(__dirname, command), [], shell).split(/\r?\n/);
}
function create2(columns, rows) {
  const cols = Number.parseInt(columns, 10);
  return {
    wrap: cols > 85 ? 85 : cols,
    cols: Number.parseInt(columns, 10),
    rows: Number.parseInt(rows, 10)
  };
}
function size() {
  if (import_node_process2.stdout && import_node_process2.stdout.columns && import_node_process2.stdout.rows) return create2(import_node_process2.stdout.columns, import_node_process2.stdout.rows);
  if (import_node_process2.stderr && import_node_process2.stderr.columns && import_node_process2.stderr.rows) return create2(import_node_process2.stderr.columns, import_node_process2.stderr.rows);
  if (import_node_process2.env.COLUMNS && import_node_process2.env.LINES) return create2(import_node_process2.env.COLUMNS, import_node_process2.env.LINES);
  if (import_node_process2.platform === "win32") {
    try {
      const size2 = execNative("vendor/windows/term-size.exe", false);
      if (size2.length === 2) return create2(size2[0], size2[1]);
    } catch {
    }
  } else {
    if (import_node_process2.platform === "darwin") {
      try {
        const size2 = execNative("vendor/macos/term-size", true);
        if (size2.length === 2) return create2(size2[0], size2[1]);
      } catch {
      }
    }
    try {
      const size2 = exec("resize", ["-u"]).match(/\d+/g);
      if (size2.length === 2) return create2(size2[0], size2[1]);
    } catch {
    }
    if (import_node_process2.env.TERM) {
      try {
        const cols = exec("tput", ["cols"]);
        const rows = exec("tput", ["lines"]);
        if (cols && rows) return create2(cols, rows);
      } catch {
      }
    }
  }
  return create2(80, 24);
}

// syncify/const.ts
init_cjs_shims();
var SYNCIFY_CONFIG = [
  "syncify.config.js",
  "syncify.config.mjs",
  "syncify.config.cjs",
  "syncify.config.ts",
  "syncify.config.json"
];
var CACHE_REFS = [
  "build",
  "checksum",
  "metafields",
  "pages",
  "paths",
  "schema",
  "sections",
  "settings",
  "templates"
];
var BASE_DIRS = [
  ["cache", "node_modules"],
  ["input", "source"],
  ["output", "theme"],
  ["export", "export"],
  ["import", "import"],
  ["config", "."]
];
var PATH_KEYS = [
  "assets",
  "config",
  "layout",
  "customers",
  "locales",
  "sections",
  "schema",
  "snippets",
  "templates",
  "metaobject",
  "metafields",
  "pages",
  "redirects"
];
var BUILD_GROUPS = [
  "styles",
  "scripts",
  "svgs",
  "sections",
  "layouts",
  "metaobject",
  "templates",
  "snippets",
  "locales",
  "configs",
  "schema",
  "pages",
  "metafields",
  "assets"
];
var THEME_DIRS = [
  "templates",
  "templates/customers",
  "templates/metaobject",
  "assets",
  "config",
  "layout",
  "locales",
  "sections",
  "snippets"
];
var CONFIG_FILE_EXT = [
  "js",
  "cjs",
  "mjs",
  "ts"
];
var REGEX_OR_CHARS = /([|,])/g;
var REGEX_EXTJS = /\.(mjs|cjs|ts|js|tsx|jsx)$/;
var SHOPIFY_REQUEST_ERRORS = {
  /**
   * 404 ERROR
   */
  404: "The requested resource was not found.",
  /**
   * 400 ERROR
   */
  400: "The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application / json. This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process.",
  /**
   * 303 ERROR
   */
  303: "The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource.",
  /**
   * 401 ERROR
   */
  401: "The necessary authentication credentials are not present in the request or are incorrect",
  /**
   * 402 ERROR
   */
  402: "The requested shop is currently frozen. The shop owner needs to log in to the shop's admin, and pay the outstanding balance to unfreeze the shop.",
  /**
   * 406 ERROR
   */
  406: "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.",
  /**
   * 423 ERROR
   */
  423: "The requested shop is currently locked. Shops are locked if they repeatedly exceed their API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk.",
  /**
   * 403 ERROR
   */
  403: "The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action.",
  /**
   * 501 ERROR
   */
  501: "The requested endpoint is not available on that particular shop, e.g. requesting access to a Shopify Plus\u2013only API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use.",
  /**
   * 503 ERROR
   */
  503: "The server is currently unavailable. Check the Shopify status page for reported service outages. See https://www.shopifystatus.com"
};

// syncify/model/defaults.ts
init_cjs_shims();
var defaults = () => ({
  input: "source",
  output: "theme",
  import: "import",
  export: "export",
  config: ".",
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
    sections: "sections/**/*.{liquid,json}"
  },
  transform: {
    svg: null,
    style: null,
    script: null,
    json: {
      indent: 2,
      useTab: false,
      crlf: false,
      comments: true,
      exclude: [],
      terse: false
    },
    liquid: {
      terse: false
    }
  },
  publish: {
    bindVersion: false,
    publishRole: "unpublished",
    themeLimit: 3,
    tunnelPort: 80
  },
  spawn: {
    build: null,
    watch: null
  },
  hot: false,
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});

// syncify/model/processor.ts
init_cjs_shims();
var processor = () => ({
  sharp: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {}
  },
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
    tsconfig: void 0,
    bundle: true,
    format: "esm",
    globalName: void 0,
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
  sprite: {
    mode: {
      inline: true,
      symbol: {
        example: false
      }
    },
    shape: {
      transform: ["svgo"],
      id: {
        generator: "svg-%s"
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      dimensionAttributes: false,
      namespaceClassnames: false,
      namespaceIDs: false
    }
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
});

// syncify/model/plugins.ts
init_cjs_shims();
var plugins = () => ({
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
});

// syncify/model/$.ts
function paths() {
  const state = object();
  for (const path2 of PATH_KEYS) {
    state[path2] = object({
      input: null,
      match: null,
      config: null
    });
  }
  state.transforms = /* @__PURE__ */ new Map();
  return state;
}
var $ = new class Bundle {
  /**
   * The users configuration settings merged with defaults
   */
  static defaults = defaults();
  /**
   * Plugins
   */
  static plugins = plugins();
  /**
   * The processors configuration settings
   */
  static processor = processor();
  /**
   * The parsed contents of `package.json` file
   */
  static package = object();
  /**
   * Cache interface
   */
  static cache = object();
  /**
   * Chokidar watch instance
   */
  static watch = /* @__PURE__ */ new Set();
  /**
   * Process Child
   */
  process;
  /**
   * Whether or not to restart process
   */
  restart = false;
  /**
   * Cached reference of the CLI commands passed
   */
  cli = {};
  /**
   * Websockets HOT reloading
   */
  wss = null;
  /**
   * Stats information for the output directory
   *
   * @default null
   */
  stats = {};
  /**
   * CLI provided filters
   *
   * @default null
   */
  filters = {};
  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  commands = {};
  /**
   * The version defined in the package.json
   *
   * @default null
   */
  version = "0.3.0-beta";
  /**
   * The current working directory
   *
   * @default null
   */
  cwd = null;
  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  argv = import_node_process3.argv.slice(2).join(" ");
  /**
   * Error store, holds reference to errors
   *
   * @default Set<string>
   */
  errors = /* @__PURE__ */ new Set();
  /**
   * Error store, holds reference to errors
   *
   * The file uri input path - The `Map` will hold
   * process identifier and a `Set` of stack messages.
   *
   * @default
   * {}
   */
  warnings = /* @__PURE__ */ new Map();
  /**
   * Theme Publishing
   */
  publish = {
    ngrok: null,
    bindVersion: false,
    publishRole: "unpublished",
    themeLimit: 3,
    tunnelPort: 80
  };
  /**
   * Version Control
   *
   * @default
   * {
   *  dir: null,
   *  number: null,
   *  zip: null,
   *  patch: 0,
   *  major: 0,
   *  minor: 0,
   *  update: null
   * }
   */
  vc = {
    dir: null,
    number: null,
    zip: null,
    patch: 0,
    major: 0,
    minor: 0,
    update: null
  };
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
  env = {
    cli: false,
    tree: false,
    dev: true,
    prod: false,
    ready: false,
    sync: 0,
    file: null,
    vars: {}
  };
  /**
   * Hot reload mode options - Use the `mode.hot` reference to
   * determine whether or not HOT reloading is enabled.
   *
   * @default
   * {
   *  inject: true,
   *  server: 3000,
   *  socket: 8089,
   *  method: 'hot',
   *  scroll: 'preserved',
   *  layouts: [ 'theme.liquid' ],
   *  label: 'visible',
   *  renderer: '{% render \'hot.js\', server: 3000, socket: 8089 %}',
   *  snippet: null,
   *  output: null,
   *  alive: {}
   * }
   */
  hot = {
    inject: true,
    server: 3e3,
    socket: 8089,
    history: false,
    method: "hot",
    strategy: "hydrate",
    scroll: "preserved",
    layouts: ["theme.liquid"],
    label: "visible",
    snippet: null,
    output: null,
    alive: {},
    renderer: "{% render 'hot.js'" + [
      "",
      "server: 3000",
      "socket: 8089",
      'strategy: "hydrate"',
      'scroll: "preserved"',
      'label: "visible"',
      "history: false",
      'method: "hot"'
    ].join(", ") + " %}"
  };
  /**
   * Log State
   */
  log = {
    idle: false,
    group: "Syncify",
    title: "",
    uri: "",
    listen: null,
    thrown: null,
    queue: /* @__PURE__ */ new Set(),
    changes: object(),
    config: {
      clear: true,
      silent: false,
      stats: true,
      warnings: true
    }
  };
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = {
    build: false,
    interactive: false,
    dev: true,
    prod: false,
    strap: false,
    watch: false,
    clean: false,
    cache: false,
    setup: false,
    upload: false,
    import: false,
    metafields: false,
    terse: false,
    hot: false,
    pages: false,
    pull: false,
    force: false,
    views: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false,
    release: false,
    publish: false,
    themes: false
  };
  /**
   * The configuration file name resolution
   *
   * @default
   * {
   *  base: null,
   *  ext: null,
   *  path: null,
   *  relative: null
   *  type: null
   * }
   */
  file = {
    base: null,
    path: null,
    relative: null
  };
  /**
   * Files store - Holds a `Set` reference to all files
   */
  files = /* @__PURE__ */ new Map();
  /**
   * Base directory path references
   */
  dirs = {
    cache: null,
    config: null,
    export: null,
    import: null,
    input: null,
    output: null,
    sourcemaps: {
      root: null,
      scripts: null,
      styles: null
    }
  };
  /**
   * Passed commands that may be of importance in the transform or build processes.
   *
   * @default
   * {
   *   config: null,
   *   delete: null,
   *   filter: null,
   *   input: null,
   *   output: null
   * }
   */
  cmd = {
    config: null,
    delete: null,
    filter: null,
    input: null,
    output: null
  };
  /**
   * The available stores as per configuration in `package.json` file
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  stores = [];
  /**
   * The sync clients. Multiple stores and themes can run concurrently.
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  sync = object({
    themes: [],
    stores: []
  });
  /**
   * Spawn related configuration operations
   */
  spawn = object({
    paths: /* @__PURE__ */ new Set(),
    streams: /* @__PURE__ */ new Map(),
    invoked: false,
    commands: object()
  });
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
  section = {
    global: null,
    prefixDir: false,
    separator: "-",
    paths: null,
    baseDir: /* @__PURE__ */ new Set(),
    schema: null,
    shared: /* @__PURE__ */ new Map()
  };
  /**
   * Snippet sub-directory configuration
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
  snippet = {
    global: null,
    paths: null,
    prefixDir: false,
    separator: "-",
    baseDir: /* @__PURE__ */ new Set()
  };
  /**
   * Directory structure paths.
   *
   * Includes a special `transforms` Map reference for transform related files
   * which may potentially be using an extension that would lead to it being identified
   * as a different file type. This occurs when (for example) snippet generated transforms
   * are inferred. The `transform` option will point to resolved file names and the values
   * for each entry will equal an enum `Type` number. The following transforms are identifiable:
   *
   * - `7` > `Type.Style`
   * - `8` > `Type.Script`
   * - `9` > `Type.SVG`
   */
  paths = paths();
  /**
   * Page transforms
   *
   * @default
   * {
   *  export: {
   *    quotes: '“”‘’',
   *    html: true,
   *    linkify: false,
   *    typographer: false,
   *    xhtmlOut: false,
   *    breaks: true,
   *    langPrefix: 'language-'
   *  },
   *  import: {
   *    codeBlockStyle: 'fenced',
   *    emDelimiter: '_',
   *    fence: '```',
   *    headingStyle: 'atx',
   *    hr: '---',
   *    linkReferenceStyle: 'full',
   *    linkStyle: 'inlined',
   *    strongDelimiter: '**',
   *    bulletListMarker: '-'
   *  }
   *}
   */
  page = object({
    safeSync: true,
    author: "",
    global: null,
    suffixDir: false,
    language: "html",
    export: {
      quotes: "\u201C\u201D\u2018\u2019",
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: "language-"
    },
    import: {
      codeBlockStyle: "fenced",
      emDelimiter: "_",
      fence: "```",
      headingStyle: "atx",
      hr: "---",
      linkReferenceStyle: "full",
      linkStyle: "inlined",
      strongDelimiter: "**",
      bulletListMarker: "-"
    }
  });
  /**
   * Script transforms
   *
   * @default []
   */
  script = [];
  /**
   * Style tranforms
   *
   * @default []
   */
  style = [];
  /**
   * SVG transforms
   *
   * @default []
   */
  svg = [];
  /**
   * Liquid Transforms
   *
   * @default []
   */
  liquid = {
    terse: {
      enabled: false,
      exclude: null,
      liquid: {
        minifySchema: true
      },
      markup: {
        // EXPOSED
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true,
        //
        // OVERRIDES
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
  };
  /**
   * Liquid Transforms
   *
   * @default []
   */
  json = {
    crlf: false,
    cache: null,
    comments: false,
    exclude: null,
    indent: 2,
    useTab: false,
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
  };
  /**
   * Image transforms
   */
  image;
  /**
   * Holds an instance of FSWatcher. Chokidar is leveraged in for watching,
   * and this value exposes the instance and it can be used anywhere in the
   * module. In addition, the main Chokidar is extended to support `.has()`
   *
   * @default null // defaults to null unless watch mode is invoked
   */
  get watch() {
    return Bundle.watch;
  }
  /**
   * Set the FSWatch instance reference
   */
  set watch(instance) {
    Bundle.watch = instance;
  }
  /**
  * Merged terse minification configuration
  */
  get cache() {
    return Bundle.cache;
  }
  /**
    * Merged terse minification configuration
    */
  set cache(cache) {
    Bundle.cache = cache;
  }
  /**
   * Processor Configurations
   */
  get processor() {
    return Bundle.processor;
  }
  /**
   * Merge users configuration with default
   */
  set config(data) {
    Bundle.defaults = merge(Bundle.defaults, data);
  }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config() {
    return Bundle.defaults;
  }
  /**
   * Merge the `package.json` contents
   */
  set pkg(data) {
    Bundle.package = data;
  }
  /**
   * Returns the `package.json` contents
   */
  get pkg() {
    return Bundle.package;
  }
  /**
   * Plugins
   */
  get plugins() {
    return Bundle.plugins;
  }
  /**
   * The terminal rows and columns size
   */
  get terminal() {
    return size();
  }
}();

// syncify/requests/assets.ts
init_cjs_shims();

// syncify/model/file.ts
init_cjs_shims();
var File = class {
  constructor({
    base,
    dir,
    ext,
    name,
    root
  }) {
    this.base = base;
    this.dir = dir;
    this.ext = ext;
    this.name = name;
    this.root = root;
  }
  /**
   * Configuration reference. This will hold a reference to additional data.
   * Typically, this is used for transforms, wherein it holds the indexed config.
   *
   * @default undefined // getter when required
   */
  data = void 0;
  /**
   * Hash reference of the file contents, used for diffing comparison, couples with
   * the caching datasets.
   *
   * @example
   *
   * 'aa11bb22cc33dd44ee55ff66gg77'
   */
  hash;
  /**
   * A unique UUID reference for this file - This option can change
   * where required and when dealing with multiple stores at the request level.
   *
   * @example
   *
   * 'ABD41WX'
   */
  uuid;
  /**
   * The file type that was intercepted. This is an enum number value.
   * The number value will infer on how the file should be handled and uses
   * the `FileType` enum for checks.
   *
   * @example
   *
   * file.type === FileType.Template
   *
   */
  type;
  /**
   * The resource API endpoint to which the file will be synced.
   * This will be passed to the request client.
   *
   * @example
   *
   * 'assets'
   * 'redirects'
   */
  resource;
  /**
   * The root of the file path
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/' OR 'c:\'
   */
  root;
  /**
   * The full directory path such.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/home/user/dir' OR 'c:\path\dir'
   */
  dir;
  /**
   * The file name without extension (if any).
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename' // filename.ext
   */
  name;
  /**
   * The filename extension including the dot, eg: `.liquid`
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '.ext'
   */
  ext;
  /**
   * The input base filename including file extension.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename.ext'
   */
  base;
  /**
   * The input relative path location from current _root_ working directory
   *
   * @example
   *
   * 'source/views/sections/dir/file.liquid'
   */
  relative;
  /**
   * The `key` value will be passed into the sync request. This
   * will contain the namespace and base name and is used for
   * uploading to Shopify stores.
   *
   * @example
   *
   * 'sections/file.liquid'
   * 'snippets/file.liquid'
   * 'templates/index.liquid'
   */
  key;
  /**
   * The `namespace` value will typically refelect the output
   * parent directory name reference, but sometimes this might
   * be a unique value depending on the file type we are handling.
   *
   * @example
   *
   * 'snippets'
   * 'sections'
   * 'templates'
   */
  namespace;
  /**
   * The file kind grouping. This is used internally and describes
   * the type of file we are working with.
   *
   * @example
   *
   * 'json'
   * 'liquid'
   * 'sass'
   * 'css'
   *
   * // etc etc
   */
  kind;
  /**
   * The chokidar passed path - this is full URI file path.
   *
   * @example
   *
   * 'User/name/project/source/dir/file.liquid'
   */
  input;
  /**
   * The output path location which files will be written. Only theme specific files
   * have an output path location, when a file writes from its source (like a metafield) or
   * if the file is handled in an asset pipeline transform then this will have a `null` value.
   *
   * @example
   *
   * // When file is theme specific
   * 'User/name/project/theme/dir/filename.liquid'
   *
   * // When file is not theme specific
   * null
   */
  output;
  /**
   * The file size in bytes before any augmentation is applied. This
   * value will be assigned post-context, typically in a transform.
   *
   * @example
   *
   * 1024 // => 1.24kb
   */
  size;
};

// syncify/log/loggers.ts
init_cjs_shims();
var import_node_readline = require("readline");
var import_node_util = require("util");
var import_node_process9 = require("process");
var import_node_notifier = __toESM(require("node-notifier"));

// syncify/cli/intercept.ts
init_cjs_shims();
var import_node_stream = require("stream");
var import_node_console2 = require("console");

// syncify/cli/interpolate.ts
init_cjs_shims();

// syncify/ansi/ansi.ts
init_cjs_shims();

// node_modules/.pnpm/wrap-ansi@9.0.0/node_modules/wrap-ansi/index.js
init_cjs_shims();

// node_modules/.pnpm/string-width@7.2.0/node_modules/string-width/index.js
init_cjs_shims();

// node_modules/.pnpm/strip-ansi@7.1.0/node_modules/strip-ansi/index.js
init_cjs_shims();

// node_modules/.pnpm/ansi-regex@6.0.1/node_modules/ansi-regex/index.js
init_cjs_shims();
function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.1.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}

// node_modules/.pnpm/get-east-asian-width@1.2.0/node_modules/get-east-asian-width/index.js
init_cjs_shims();

// node_modules/.pnpm/get-east-asian-width@1.2.0/node_modules/get-east-asian-width/lookup.js
init_cjs_shims();
function isAmbiguous(x) {
  return x === 161 || x === 164 || x === 167 || x === 168 || x === 170 || x === 173 || x === 174 || x >= 176 && x <= 180 || x >= 182 && x <= 186 || x >= 188 && x <= 191 || x === 198 || x === 208 || x === 215 || x === 216 || x >= 222 && x <= 225 || x === 230 || x >= 232 && x <= 234 || x === 236 || x === 237 || x === 240 || x === 242 || x === 243 || x >= 247 && x <= 250 || x === 252 || x === 254 || x === 257 || x === 273 || x === 275 || x === 283 || x === 294 || x === 295 || x === 299 || x >= 305 && x <= 307 || x === 312 || x >= 319 && x <= 322 || x === 324 || x >= 328 && x <= 331 || x === 333 || x === 338 || x === 339 || x === 358 || x === 359 || x === 363 || x === 462 || x === 464 || x === 466 || x === 468 || x === 470 || x === 472 || x === 474 || x === 476 || x === 593 || x === 609 || x === 708 || x === 711 || x >= 713 && x <= 715 || x === 717 || x === 720 || x >= 728 && x <= 731 || x === 733 || x === 735 || x >= 768 && x <= 879 || x >= 913 && x <= 929 || x >= 931 && x <= 937 || x >= 945 && x <= 961 || x >= 963 && x <= 969 || x === 1025 || x >= 1040 && x <= 1103 || x === 1105 || x === 8208 || x >= 8211 && x <= 8214 || x === 8216 || x === 8217 || x === 8220 || x === 8221 || x >= 8224 && x <= 8226 || x >= 8228 && x <= 8231 || x === 8240 || x === 8242 || x === 8243 || x === 8245 || x === 8251 || x === 8254 || x === 8308 || x === 8319 || x >= 8321 && x <= 8324 || x === 8364 || x === 8451 || x === 8453 || x === 8457 || x === 8467 || x === 8470 || x === 8481 || x === 8482 || x === 8486 || x === 8491 || x === 8531 || x === 8532 || x >= 8539 && x <= 8542 || x >= 8544 && x <= 8555 || x >= 8560 && x <= 8569 || x === 8585 || x >= 8592 && x <= 8601 || x === 8632 || x === 8633 || x === 8658 || x === 8660 || x === 8679 || x === 8704 || x === 8706 || x === 8707 || x === 8711 || x === 8712 || x === 8715 || x === 8719 || x === 8721 || x === 8725 || x === 8730 || x >= 8733 && x <= 8736 || x === 8739 || x === 8741 || x >= 8743 && x <= 8748 || x === 8750 || x >= 8756 && x <= 8759 || x === 8764 || x === 8765 || x === 8776 || x === 8780 || x === 8786 || x === 8800 || x === 8801 || x >= 8804 && x <= 8807 || x === 8810 || x === 8811 || x === 8814 || x === 8815 || x === 8834 || x === 8835 || x === 8838 || x === 8839 || x === 8853 || x === 8857 || x === 8869 || x === 8895 || x === 8978 || x >= 9312 && x <= 9449 || x >= 9451 && x <= 9547 || x >= 9552 && x <= 9587 || x >= 9600 && x <= 9615 || x >= 9618 && x <= 9621 || x === 9632 || x === 9633 || x >= 9635 && x <= 9641 || x === 9650 || x === 9651 || x === 9654 || x === 9655 || x === 9660 || x === 9661 || x === 9664 || x === 9665 || x >= 9670 && x <= 9672 || x === 9675 || x >= 9678 && x <= 9681 || x >= 9698 && x <= 9701 || x === 9711 || x === 9733 || x === 9734 || x === 9737 || x === 9742 || x === 9743 || x === 9756 || x === 9758 || x === 9792 || x === 9794 || x === 9824 || x === 9825 || x >= 9827 && x <= 9829 || x >= 9831 && x <= 9834 || x === 9836 || x === 9837 || x === 9839 || x === 9886 || x === 9887 || x === 9919 || x >= 9926 && x <= 9933 || x >= 9935 && x <= 9939 || x >= 9941 && x <= 9953 || x === 9955 || x === 9960 || x === 9961 || x >= 9963 && x <= 9969 || x === 9972 || x >= 9974 && x <= 9977 || x === 9979 || x === 9980 || x === 9982 || x === 9983 || x === 10045 || x >= 10102 && x <= 10111 || x >= 11094 && x <= 11097 || x >= 12872 && x <= 12879 || x >= 57344 && x <= 63743 || x >= 65024 && x <= 65039 || x === 65533 || x >= 127232 && x <= 127242 || x >= 127248 && x <= 127277 || x >= 127280 && x <= 127337 || x >= 127344 && x <= 127373 || x === 127375 || x === 127376 || x >= 127387 && x <= 127404 || x >= 917760 && x <= 917999 || x >= 983040 && x <= 1048573 || x >= 1048576 && x <= 1114109;
}
function isFullWidth(x) {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
}
function isWide(x) {
  return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9800 && x <= 9811 || x === 9855 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12771 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 19903 || x >= 19968 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101632 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129672 || x >= 129680 && x <= 129725 || x >= 129727 && x <= 129733 || x >= 129742 && x <= 129755 || x >= 129760 && x <= 129768 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
}

// node_modules/.pnpm/get-east-asian-width@1.2.0/node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/.pnpm/emoji-regex@10.4.0/node_modules/emoji-regex/index.mjs
init_cjs_shims();
var emoji_regex_default = () => {
  return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

// node_modules/.pnpm/string-width@7.2.0/node_modules/string-width/index.js
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;
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

// node_modules/.pnpm/ansi-styles@6.2.1/node_modules/ansi-styles/index.js
init_cjs_shims();
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red3, green3, blue3) => `\x1B[${38 + offset};2;${red3};${green3};${blue3}m`;
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
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group2] of Object.entries(styles)) {
    for (const [styleName, style2] of Object.entries(group2)) {
      styles[styleName] = {
        open: `\x1B[${style2[0]}m`,
        close: `\x1B[${style2[1]}m`
      };
      group2[styleName] = styles[styleName];
      codes.set(style2[0], style2[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group2,
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
      value: (red3, green3, blue3) => {
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
      },
      enumerable: false
    },
    hexToRgb: {
      value: (hex2) => {
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
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex2) => styles.rgbToAnsi256(...styles.hexToRgb(hex2)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value: (code) => {
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
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red3, green3, blue3) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red3, green3, blue3)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex2) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex2)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/wrap-ansi@9.0.0/node_modules/wrap-ansi/index.js
var ESCAPES = /* @__PURE__ */ new Set([
  "\x1B",
  "\x9B"
]);
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var wrapAnsiCode = (code) => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
var wrapWord = (rows, word, columns) => {
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
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last2 = words.length;
  while (last2 > 0) {
    if (stringWidth(words[last2 - 1]) > 0) {
      break;
    }
    last2--;
  }
  if (last2 === words.length) {
    return string;
  }
  return words.slice(0, last2).join(" ") + words.slice(last2).join("");
};
var exec2 = (string, columns, options = {}) => {
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
      const { groups } = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(preString.slice(preStringIndex)) || { groups: {} };
      if (groups.code !== void 0) {
        const code2 = Number.parseFloat(groups.code);
        escapeCode = code2 === END_CODE ? void 0 : code2;
      } else if (groups.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
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
};
function wrapAnsi(string, columns, options) {
  return String(string).normalize().replaceAll("\r\n", "\n").split("\n").map((line) => exec2(line, columns, options)).join("\n");
}

// node_modules/.pnpm/clean-stack@5.2.0/node_modules/clean-stack/index.js
init_cjs_shims();

// node_modules/.pnpm/escape-string-regexp@5.0.0/node_modules/escape-string-regexp/index.js
init_cjs_shims();
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/.pnpm/clean-stack@5.2.0/node_modules/clean-stack/home-directory.js
init_cjs_shims();
var import_node_os = __toESM(require("os"), 1);
var getHomeDirectory = () => import_node_os.default.homedir().replace(/\\/g, "/");
var home_directory_default = getHomeDirectory;

// node_modules/.pnpm/clean-stack@5.2.0/node_modules/clean-stack/index.js
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function cleanStack(stack, { pretty = false, basePath: basePath2, pathFilter } = {}) {
  const basePathRegex = basePath2 && new RegExp(`(file://)?${escapeStringRegexp(basePath2.replace(/\\/g, "/"))}/?`, "g");
  const homeDirectory = pretty ? home_directory_default() : "";
  if (typeof stack !== "string") {
    return void 0;
  }
  return stack.replace(/\\/g, "/").split("\n").filter((line) => {
    const pathMatches = line.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match2 = pathMatches[1];
    if (match2.includes(".app/Contents/Resources/electron.asar") || match2.includes(".app/Contents/Resources/default_app.asar") || match2.includes("node_modules/electron/dist/resources/electron.asar") || match2.includes("node_modules/electron/dist/resources/default_app.asar")) {
      return false;
    }
    return pathFilter ? !pathRegex.test(match2) && pathFilter(match2) : !pathRegex.test(match2);
  }).filter((line) => line.trim() !== "").map((line) => {
    if (basePathRegex) {
      line = line.replace(basePathRegex, "");
    }
    if (pretty) {
      line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDirectory, "~")));
    }
    return line;
  }).join("\n");
}

// syncify/ansi/ansi.ts
function Prefix(name, ...suffix) {
  const spacer = name.length > 9 ? "  " : " ".repeat(11 - name.length);
  const joiner = suffix.length > 0 ? suffix.length === 1 ? ARR + "  " + suffix[0] : suffix.length === 2 ? ARR + "  " + suffix[0] + " " + ARR + " " + suffix[1] : ARR + "  " + suffix[0] + " " + ARR + " " + suffix[1] + " " + Append(suffix[2]) : "";
  return name + spacer + joiner;
}
function Append(input) {
  return input ? TLD + " " + reset2.gray(input) : "";
}
function Encase(encase, input, { spaced = false } = {}) {
  const WS = spaced ? " " : "";
  switch (encase) {
    case "AN":
      return LAN + WS + input + WS + RAN;
    case "CB":
      return LCB + WS + input + WS + RCB;
    case "PR":
      return LPR + WS + input + WS + RPR;
    case "SB":
      return LSB + WS + input + WS + RSB;
  }
}
var Suffix = object({
  /**
   * Warning in yellow stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type w and press enter to view
   * ```
   */
  warning: yellow2(` ${TLD} Type ${bold2("w")} and press ${bold2("enter")} to view`),
  /**
   * Error in red stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type v and press enter to view
   * ```
   */
  error: red2(` ${TLD} Type ${bold2("v")} and press ${bold2("enter")} to view`),
  /**
   * Stack Trace in Gray applied to error contexts
   *
   * ```bash
   * Type s and press enter to view stack trace
   * ```
   */
  stack: gray2(`Type ${bold2("s")} and press ${bold2("enter")} to view stack trace`)
});
var Ruler = (width = $.terminal.wrap, newlines = true) => {
  const line = "\u251C" + "\u2500".repeat(width - 10);
  return newlines ? `${lightGray.open}${"\n"}${line}${"\n"}\u2502${lightGray.close}` : `${lightGray.open}${line}${lightGray.close}`;
};
var Top = (label) => Tree.open + reset2.gray(`${label} ~ ${getTime()}`);
var Wrap = (...input) => {
  const style2 = object({ color: null, line: Tree.line });
  let lines;
  let write4 = "";
  if (isArray2(input[0])) {
    if (isObject(input[1])) assign(style2, input[1]);
    lines = wrapAnsi(input[0].join(" "), $.terminal.wrap).split("\n");
  } else {
    if (isObject(input[input.length - 1])) assign(style2, input.pop());
    lines = wrapAnsi(input.join(" "), $.terminal.wrap).split("\n");
  }
  while (lines.length !== 0) {
    const line = lines.shift().trim();
    if (line.length > 0) {
      write4 += style2.line + (style2.color ? style2.color(line) : line) + "\n";
    } else {
      write4 += style2.line + "\n";
    }
  }
  return write4.trimEnd();
};
var Break = (input) => Tree.trim + "\n" + Tree.line + input + "\n" + Tree.trim;
var Line = (input) => Tree.line + input;
var LineRed = (input) => Tree.red + input;
var LineYellow = (input) => Tree.yellow + input;
var NextLine = (input) => Tree.trim + "\n" + Tree.line + input;
var Next = (input) => Tree.line + input + "\n" + Tree.line;
var Dash = (input) => Tree.dash + input;
var End = (input) => Tree.base + reset2.gray(`${input} ~ ${getTime()}`) + "\n";
function Context(data) {
  const space = ws(data.entries);
  const message = Create({ type: data.type || "error" });
  if (isString(data.stack)) {
    const stack = data.cleanStack ? cleanStack(data.stack, { pretty: true, basePath: $.cwd }) : data.stack;
    message.Wrap(stack.split("\n"), gray2).NL.Newline();
  }
  for (const key in data.entries) {
    if (isUndefined(data.entries[key])) continue;
    let string;
    if (isNumber(data.entries[key])) {
      if (isNaN2(data.entries[key])) continue;
      string = neonRouge(sanitize(data.entries[key]));
    } else {
      string = sanitize(data.entries[key]);
    }
    if (string.length === 0) continue;
    const entry = data.type === "warning" ? yellowBright2(key) : redBright2(key);
    if (key === "source" || key === "output" || key === "input" || key === "file") {
      message.Line(entry + COL + " " + space(key) + underline2(string), gray2);
    } else {
      message.Line(entry + COL + " " + space(key) + string, gray2);
    }
  }
  if (data.stack === true) message.NL.Line(Suffix.stack);
  return message.toString();
}
var Message = class {
  /**
   * The type of tree message to generate - This will
   * default the `Tree.line` to a specific color, meaning
   * the `.line()` will be output according to the type.
   *
   * @default 'info
   */
  type = "info";
  /**
   * The Tree line color based on message type
   *
   * @default Tree.line
   */
  line;
  /**
   * The Tree trim color based on message type
   *
   * @default Tree.trim
   */
  trim;
  /**
   * Optionally provide an existing structure to build from.
   *
   * @default []
   */
  text;
  constructor(options) {
    if (isObject(options)) {
      const has3 = hasProp(options);
      this.type = has3("type") ? options.type : "info";
      this.text = has3("text") ? options.text : [];
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
      this.text = [];
    }
  }
  /**
   * Return Structure
   *
   * Returns the current structure being built.
   */
  toRaw() {
    return this.text;
  }
  /**
   * Generate string with ending line
   *
   * Applies a `.join` glue to the `this.text[]` - Calling this function
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
    if (this.text.length === 0) return "";
    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
    let output;
    if (color) {
      output = color(glue(this.text));
    } else if (this.type === "info") {
      output = white2(glue(this.text));
    } else if (this.type === "error") {
      output = red2(glue(this.text));
    } else if (this.type === "warning") {
      output = yellowBright2(glue(this.text));
    } else {
      output = glue(this.text);
    }
    this.text = [];
    return output + "\n" + this.trim;
  }
  /**
   * Generate string - Trims any newlines in last entry
   *
   * Applies a `.join` glue to the `text[]` - Call this function
   * will clear the message array. Use `toRaw()` to obtain current
   * string build.
   *
   * ```bash
   * │ ending content
   * ```
   */
  toString(color) {
    if (this.text.length === 0) return "";
    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
    let output;
    if (color) {
      output = color(glue(this.text));
    } else if (this.type === "info") {
      output = white2(glue(this.text));
    } else if (this.type === "error") {
      output = red2(glue(this.text));
    } else if (this.type === "warning") {
      output = yellowBright2(glue(this.text));
    } else {
      output = glue(this.text);
    }
    this.text = [];
    return output;
  }
  /**
   * Get Line
   *
   * Returns a line at the specific index. Defaults to last known line
   */
  Get(index = this.text.length - 1) {
    return this.text[index];
  }
  /**
   * Remove Line
   *
   * Removes a line at specific index
   */
  Remove(index) {
    this.text.splice(index, 1);
    return this;
  }
  /**
   * Replace and persist
   *
   * Replaces an entry at the provided index
   */
  Replace(index, input, color) {
    if (this.text[index]) {
      this.text[index] = this.line + (color ? color(input) : input) + "\n";
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
  Ruler(width = $.terminal.wrap) {
    this.text.push(Tree.trim + "\n" + lightGray(`\u251C${"\u2500".repeat(width)}`) + "\n" + Tree.trim + "\n");
    return this;
  }
  /**
   * Tree Newline using applied
   *
   * ```bash
   * │\n
   * ```
   */
  get NL() {
    this.text.push(this.trim + "\n");
    return this;
  }
  /**
   * Newline only
   *
   * ```bash
   * \n
   * ```
   */
  get BR() {
    this.text.push("\n");
    return this;
  }
  /**
   * Tree Pop
   *
   * ```bash
   * │\n
   * ```
   */
  Pop() {
    this.text.pop();
    return this;
  }
  /**
   * Tree Newline
   *
   * ```bash
   * │\n
   * ```
   */
  Newline(line, color) {
    if (isNumber(line)) {
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
      for (let i = 0; i < line; i++) this.text.push(input);
    } else {
      if (line === "") {
        this.text.push("\n");
      } else if (line === "line") {
        this.text.push(Tree.trim + "\n");
      } else if (line === "yellow") {
        this.text.push(Tree.yellowTrim + "\n");
      } else if (line === "red") {
        this.text.push(Tree.redTrim + "\n");
      } else {
        this.text.push(this.trim + "\n");
      }
    }
    return this;
  }
  /**
   * Tree Inline - Appends to the previous entry. If no entries
   * exist in the message, a new one is created with tree line prefix.
   *
   * Use `Push()` method to insert entry without line prefix.
   *
   * ```bash
   * │ previous <input> # <input> will prefix with single whitespace
   * ```
   */
  Inline(input, color) {
    const length = this.text.length;
    if (length > 0) {
      this.text[length - 1] = this.text[length - 1].trimEnd() + " " + (color ? color(input) : input) + "\n";
    } else {
      this.text.push(this.line + (color ? color(input) : input) + "\n");
    }
    return this;
  }
  /**
   * Tree Line Trim
   *
   * ```bash
   * │input\n
   * ```
   */
  Trim(input, color) {
    this.text.push(this.line + (color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Push string entry
   *
   * Unlike `Line` or other methods, this call will simply apply
   * a `this.text.push(string)` of the input.
   *
   * **NOTE** Newline `NWL` will be appended to insertion
   */
  Insert(input, color) {
    this.text.push((color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Tree Line
   *
   * ```bash
   * │ input\n
   * ```
   */
  Line(input, color) {
    if (this.type === "error") return this.Error(input, color);
    if (this.type === "warning") return this.Warn(input, color);
    this.text.push(this.line + (color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Tree Error Line (red)
   *
   * ```bash
   * │ input\n
   * ```
   */
  Error(input, color) {
    this.text.push(Tree.red + (color ? color(input) : red2(input)) + "\n");
    return this;
  }
  /**
   * Tree Warn Line (yellow)
   *
   * ```bash
   * │ input
   * ```
   */
  Warn(input, color) {
    this.text.push(Tree.yellow + (color ? color(input) : yellow2(input)) + "\n");
    return this;
  }
  /**
   * Tree Line Break
   *
   * ```bash
   * │\n
   * │ input\n
   * │\n
   * ```
   */
  Break(input, color) {
    this.text.push(this.trim + "\n" + this.line + (color ? color(input) : input) + "\n" + this.trim + "\n");
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
    this.text.push(Top(label) + "\n");
    return this;
  }
  /**
   * Tree End
   *
   * ```bash
   * │\n
   * └─ input\n
   * ```
   */
  End(input) {
    this.text.push(End(input));
    return this;
  }
  /**
   * Tree Context
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
    this.text.push(Context(data) + "\n");
    return this;
  }
  /**
   * Tree Dash
   *
   * ```bash
   * ├─ input\n
   * ```
   */
  Dash(input, color) {
    this.text.push(Tree.dash + (color ? color(input) : input) + "\n");
    return this;
  }
  /**
   * Tree Multiline
   *
   * Prefixes a multiline string with tree line
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Multiline(input) {
    const lines = isArray2(input) ? input : input.split("\n");
    while (lines.length !== 0) {
      this.text.push(this.line + lines.shift() + "\n");
    }
    return this;
  }
  /**
   * Tree Wrap
   *
   * Accepts `string[]` or `...string[]` spread. The last entry accepts an
   * optional Ansis color. The **input** will be passed to `Wrap` and the
   * returning output will end with newline.
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Wrap(...input) {
    const style2 = object({ line: this.line });
    if (this.type === "error") {
      style2.color = red2;
    } else if (this.type === "warning") {
      style2.color = yellow2;
    } else {
      style2.color = whiteBright2;
    }
    if (isArray2(input[0])) {
      if (isFunction(input[1])) style2.color = input.pop();
      this.text.push(Wrap(input[0], style2) + "\n");
    } else {
      if (isFunction(input[input.length - 1])) style2.color = input.pop();
      this.text.push(Wrap(input, style2) + "\n");
    }
    return this;
  }
};
function Create(options) {
  if ($.env.tree === false) {
    if (isObject(options)) {
      options.type = "nil";
    } else {
      options = object({ type: "nil" });
    }
  }
  return new Message(options);
}

// syncify/cli/interpolate.ts
function Format(input, { type: type2 = "info" } = {}) {
  const message = Create({ type: type2 });
  const lines = isArray2(input) ? input : input.split("\n");
  const color = type2 === "error" ? "red" : type2 === "warn" ? "yellow" : "line";
  while (lines.length !== 0) {
    const line = lines.shift();
    if (line.trim().length > 0) {
      message.Line(line.trimEnd());
    } else {
      message.Newline(color);
    }
  }
  return message.Newline(color).toString();
}
function Context2(data) {
  const space = ws(data.entries);
  const hasMessage = has2("message", data);
  if (!has2("warning", data)) data.warning = false;
  if (!hasMessage) {
    if (data.warning === false) {
      data.message = Create({ type: "error" }).NL;
    } else {
      data.message = Create({ type: "warn" }).NL;
    }
  }
  for (const key in data.entries) {
    const string = sanitize(data.entries[key]);
    if (key === "source" || key === "output" || key === "input" || key === "file") {
      data.message.Line(white2(key) + COL + space(key) + TLD + underline2(string), gray2);
    } else {
      data.message.Line(white2(key) + COL + space(key) + string, gray2);
    }
  }
  if (isString(data.stack)) {
    if (data.warning === false) {
      $.errors.add(data.stack);
    }
    data.message.Break(Suffix.stack);
  }
  return data.message.toLine();
}
function Sample(code, {
  line = Tree.line,
  span = null
} = {}) {
  if (line === "red") {
    line = Tree.red;
  } else if (line === "yellow") {
    line = Tree.yellow;
  }
  if (span !== null) {
    const end = has2("end", span) ? span.end : span.start + 1;
    return line + "\n" + [
      line + blue2(`${span.start - 1}`) + COL,
      line + blue2(`${span.start}`) + COL + code,
      line + blue2(`${end}`) + COL
    ].join("\n");
  }
  return line + "\n" + line + code;
}
function Multiline(input, { type: type2 = "info", color = white2 } = {}) {
  const line = type2 === "error" ? "red" : type2 === "warn" ? "yellow" : "line";
  return Create({ type: type2 }).Newline(line).Wrap(input, color).toLine();
}

// syncify/cli/spinner.ts
init_cjs_shims();

// node_modules/.pnpm/log-update@6.1.0/node_modules/log-update/index.js
init_cjs_shims();
var import_node_process7 = __toESM(require("process"), 1);

// node_modules/.pnpm/ansi-escapes@7.0.0/node_modules/ansi-escapes/index.js
init_cjs_shims();

// node_modules/.pnpm/ansi-escapes@7.0.0/node_modules/ansi-escapes/base.js
var base_exports = {};
__export(base_exports, {
  beep: () => beep,
  clearScreen: () => clearScreen,
  clearTerminal: () => clearTerminal,
  cursorBackward: () => cursorBackward,
  cursorDown: () => cursorDown,
  cursorForward: () => cursorForward,
  cursorGetPosition: () => cursorGetPosition,
  cursorHide: () => cursorHide,
  cursorLeft: () => cursorLeft,
  cursorMove: () => cursorMove,
  cursorNextLine: () => cursorNextLine,
  cursorPrevLine: () => cursorPrevLine,
  cursorRestorePosition: () => cursorRestorePosition,
  cursorSavePosition: () => cursorSavePosition,
  cursorShow: () => cursorShow,
  cursorTo: () => cursorTo,
  cursorUp: () => cursorUp,
  enterAlternativeScreen: () => enterAlternativeScreen,
  eraseDown: () => eraseDown,
  eraseEndLine: () => eraseEndLine,
  eraseLine: () => eraseLine,
  eraseLines: () => eraseLines,
  eraseScreen: () => eraseScreen,
  eraseStartLine: () => eraseStartLine,
  eraseUp: () => eraseUp,
  exitAlternativeScreen: () => exitAlternativeScreen,
  iTerm: () => iTerm,
  image: () => image,
  link: () => link,
  scrollDown: () => scrollDown,
  scrollUp: () => scrollUp
});
init_cjs_shims();
var import_node_process4 = __toESM(require("process"), 1);

// node_modules/.pnpm/environment@1.1.0/node_modules/environment/index.js
init_cjs_shims();
var isBrowser = globalThis.window?.document !== void 0;
var isNode = globalThis.process?.versions?.node !== void 0;
var isBun = globalThis.process?.versions?.bun !== void 0;
var isDeno = globalThis.Deno?.version?.deno !== void 0;
var isElectron = globalThis.process?.versions?.electron !== void 0;
var isJsDom = globalThis.navigator?.userAgent?.includes("jsdom") === true;
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDedicatedWorker = typeof DedicatedWorkerGlobalScope !== "undefined" && globalThis instanceof DedicatedWorkerGlobalScope;
var isSharedWorker = typeof SharedWorkerGlobalScope !== "undefined" && globalThis instanceof SharedWorkerGlobalScope;
var isServiceWorker = typeof ServiceWorkerGlobalScope !== "undefined" && globalThis instanceof ServiceWorkerGlobalScope;
var platform2 = globalThis.navigator?.userAgentData?.platform;
var isMacOs = platform2 === "macOS" || globalThis.navigator?.platform === "MacIntel" || globalThis.navigator?.userAgent?.includes(" Mac ") === true || globalThis.process?.platform === "darwin";
var isWindows = platform2 === "Windows" || globalThis.navigator?.platform === "Win32" || globalThis.process?.platform === "win32";
var isLinux = platform2 === "Linux" || globalThis.navigator?.platform?.startsWith("Linux") === true || globalThis.navigator?.userAgent?.includes(" Linux ") === true || globalThis.process?.platform === "linux";
var isIos = platform2 === "iOS" || globalThis.navigator?.platform === "MacIntel" && globalThis.navigator?.maxTouchPoints > 1 || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform);
var isAndroid = platform2 === "Android" || globalThis.navigator?.platform === "Android" || globalThis.navigator?.userAgent?.includes(" Android ") === true || globalThis.process?.platform === "android";

// node_modules/.pnpm/ansi-escapes@7.0.0/node_modules/ansi-escapes/base.js
var ESC = "\x1B[";
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var isTerminalApp = !isBrowser && import_node_process4.default.env.TERM_PROGRAM === "Apple_Terminal";
var isWindows2 = !isBrowser && import_node_process4.default.platform === "win32";
var cwdFunction = isBrowser ? () => {
  throw new Error("`process.cwd()` only works in Node.js, not the browser.");
} : import_node_process4.default.cwd;
var cursorTo = (x, y) => {
  if (typeof x !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  if (typeof y !== "number") {
    return ESC + (x + 1) + "G";
  }
  return ESC + (y + 1) + SEP + (x + 1) + "H";
};
var cursorMove = (x, y) => {
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
};
var cursorUp = (count = 1) => ESC + count + "A";
var cursorDown = (count = 1) => ESC + count + "B";
var cursorForward = (count = 1) => ESC + count + "C";
var cursorBackward = (count = 1) => ESC + count + "D";
var cursorLeft = ESC + "G";
var cursorSavePosition = isTerminalApp ? "\x1B7" : ESC + "s";
var cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC + "u";
var cursorGetPosition = ESC + "6n";
var cursorNextLine = ESC + "E";
var cursorPrevLine = ESC + "F";
var cursorHide = ESC + "?25l";
var cursorShow = ESC + "?25h";
var eraseLines = (count) => {
  let clear4 = "";
  for (let i = 0; i < count; i++) {
    clear4 += eraseLine + (i < count - 1 ? cursorUp() : "");
  }
  if (count) {
    clear4 += cursorLeft;
  }
  return clear4;
};
var eraseEndLine = ESC + "K";
var eraseStartLine = ESC + "1K";
var eraseLine = ESC + "2K";
var eraseDown = ESC + "J";
var eraseUp = ESC + "1J";
var eraseScreen = ESC + "2J";
var scrollUp = ESC + "S";
var scrollDown = ESC + "T";
var clearScreen = "\x1Bc";
var clearTerminal = isWindows2 ? `${eraseScreen}${ESC}0f` : `${eraseScreen}${ESC}3J${ESC}H`;
var enterAlternativeScreen = ESC + "?1049h";
var exitAlternativeScreen = ESC + "?1049l";
var beep = BEL;
var link = (text, url) => [
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
].join("");
var image = (data, options = {}) => {
  let returnValue = `${OSC}1337;File=inline=1`;
  if (options.width) {
    returnValue += `;width=${options.width}`;
  }
  if (options.height) {
    returnValue += `;height=${options.height}`;
  }
  if (options.preserveAspectRatio === false) {
    returnValue += ";preserveAspectRatio=0";
  }
  return returnValue + ":" + Buffer.from(data).toString("base64") + BEL;
};
var iTerm = {
  setCwd: (cwd = cwdFunction()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
  annotation(message, options = {}) {
    let returnValue = `${OSC}1337;`;
    const hasX = options.x !== void 0;
    const hasY = options.y !== void 0;
    if ((hasX || hasY) && !(hasX && hasY && options.length !== void 0)) {
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

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
init_cjs_shims();
var import_node_process6 = __toESM(require("process"), 1);

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
init_cjs_shims();
var import_node_process5 = __toESM(require("process"), 1);

// node_modules/.pnpm/onetime@7.0.0/node_modules/onetime/index.js
init_cjs_shims();

// node_modules/.pnpm/mimic-function@5.0.1/node_modules/mimic-function/index.js
init_cjs_shims();
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
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
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@7.0.0/node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
init_cjs_shims();

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
init_cjs_shims();
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

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process8) => !!process8 && typeof process8 === "object" && typeof process8.removeListener === "function" && typeof process8.emit === "function" && typeof process8.reallyExit === "function" && typeof process8.listeners === "function" && typeof process8.kill === "function" && typeof process8.pid === "number" && typeof process8.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
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
    const list3 = this.listeners[ev];
    const i = list3.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list3.length === 1) {
      list3.length = 0;
    } else {
      list3.splice(i, 1);
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
};
var SignalExitBase = class {
};
var signalExitWrap = (handler2) => {
  return {
    onExit(cb, opts) {
      return handler2.onExit(cb, opts);
    },
    load() {
      return handler2.load();
    },
    unload() {
      return handler2.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process3.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process8) {
    super();
    this.#process = process8;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process8;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process8.kill(process8.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process8.reallyExit;
    this.#originalProcessEmit = process8.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
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

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var terminal = import_node_process5.default.stderr.isTTY ? import_node_process5.default.stderr : import_node_process5.default.stdout.isTTY ? import_node_process5.default.stdout : void 0;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = import_node_process6.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = import_node_process6.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/.pnpm/slice-ansi@7.1.0/node_modules/slice-ansi/index.js
init_cjs_shims();

// node_modules/.pnpm/is-fullwidth-code-point@5.0.0/node_modules/is-fullwidth-code-point/index.js
init_cjs_shims();
function isFullwidthCodePoint(codePoint) {
  if (!Number.isInteger(codePoint)) {
    return false;
  }
  return eastAsianWidth(codePoint) === 2;
}

// node_modules/.pnpm/slice-ansi@7.1.0/node_modules/slice-ansi/index.js
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
function findNumberIndex(string) {
  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index);
    if (codePoint >= CODE_POINT_0 && codePoint <= CODE_POINT_9) {
      return index;
    }
  }
  return -1;
}
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
function undoAnsiCodes(codes) {
  const reduced = reduceAnsiCodes(codes);
  const endCodes = reduced.map(({ endCode }) => endCode);
  return endCodes.reverse().join("");
}
function sliceAnsi(string, start, end) {
  const tokens2 = tokenize(string, end);
  let activeCodes = [];
  let position = 0;
  let returnValue = "";
  let include = false;
  for (const token of tokens2) {
    if (end !== void 0 && position >= end) {
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

// node_modules/.pnpm/log-update@6.1.0/node_modules/log-update/index.js
var defaultTerminalHeight = 24;
var getWidth = ({ columns = 80 }) => columns;
var fitToTerminalHeight = (stream, text) => {
  const terminalHeight = stream.rows ?? defaultTerminalHeight;
  const lines = text.split("\n");
  const toRemove = Math.max(0, lines.length - terminalHeight);
  return toRemove ? sliceAnsi(text, stripAnsi(lines.slice(0, toRemove).join("\n")).length + 1) : text;
};
function createLogUpdate(stream, { showCursor = false } = {}) {
  let previousLineCount = 0;
  let previousWidth = getWidth(stream);
  let previousOutput = "";
  const reset3 = () => {
    previousOutput = "";
    previousWidth = getWidth(stream);
    previousLineCount = 0;
  };
  const render = (...arguments_) => {
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
  };
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
var logUpdate = createLogUpdate(import_node_process7.default.stdout);
var log_update_default = logUpdate;
var logUpdateStderr = createLogUpdate(import_node_process7.default.stderr);

// syncify/cli/spinner.ts
function Spinner2() {
  let interval;
  let active = false;
  let message = "";
  let tline = true;
  const loaders = object({
    arrows: object({
      interval: 120,
      frames: [
        "\u25B9\u25B9\u25B9\u25B9",
        "\u25B8\u25B9\u25B9\u25B9",
        "\u25B9\u25B8\u25B9\u25B9",
        "\u25B9\u25B9\u25B8\u25B9",
        "\u25B9\u25B9\u25B9\u25B8"
      ]
    }),
    brielle: object({
      interval: 50,
      frames: [
        "\u280B",
        "\u2819",
        "\u2839",
        "\u2838",
        "\u283C",
        "\u2834",
        "\u2826",
        "\u2827",
        "\u2807",
        "\u280F"
      ]
    }),
    spinning: object({
      interval: 60,
      frames: [
        "\u25D0",
        "\u25D3",
        "\u25D1",
        "\u25D2"
      ]
    })
  });
  const defaults2 = object({
    label: "",
    line: true,
    color: null,
    style: "brielle",
    action: null
  });
  const spinner2 = function spinner3(input, settings) {
    let options = object(defaults2);
    if (isObject(input)) {
      options = assign(options, input);
    } else if (isString(input)) {
      options.label = input;
      if (isObject(settings)) {
        options = assign(options, settings);
      }
    }
    active = true;
    tline = options.line;
    let color;
    let frame = 0;
    let frames;
    let size2 = 0;
    if (options.action !== null) {
      options.style = "arrows";
      color = has2("color", options.action) ? options.action.color : neonGreen;
      frames = loaders.arrows.frames;
      size2 = frames.length;
    } else {
      color = isFunction(options.color) ? options.color : pink;
      message = options.label;
      frames = loaders[options.style].frames;
      size2 = frames.length;
    }
    log_update_default.done();
    interval = setInterval(() => {
      if (!active) return;
      let label;
      if (options.action !== null) {
        const string = glueString(
          bold2(options.action.before),
          frames[frame = ++frame % size2],
          options.action.after
        );
        label = color(message !== "" ? Prefix(message, string) : string);
      } else {
        label = color(glueString(frames[frame = ++frame % size2], message));
      }
      log_update_default(options.line ? Break(label) : label);
    }, loaders[options.style].interval);
  };
  spinner2.update = function(input) {
    message = input;
  };
  spinner2.stop = function(input) {
    if (active === false) return;
    active = false;
    if (input) {
      log_update_default(tline ? Break(input) : input);
      log_update_default.done();
    } else {
      log_update_default.clear();
    }
    clearInterval(interval);
    interval = void 0;
    message = "";
  };
  defineProperty(spinner2, "active", {
    get() {
      return active;
    }
  });
  return spinner2;
}

// syncify/log/errors.ts
init_cjs_shims();

// syncify/ansi/codeframe.ts
init_cjs_shims();
var highlight = (string) => redBright2(string.replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, orange("$1")).replace(/({{2}-?[a-zA-Z0-9_\-.'"[\]]+-?}{2})/g, teal("$1")).replace(/((?:www|http:|https:)+[^\s]+[\w])/g, underline2("$1")).replace(/(\/)(.*?)(\/)/g, teal("$1") + neonCyan("$2") + teal("$3")).replace(/(\\)(\W)/g, gray2("$1") + neonCyan("$2")).replace(/(:)(?= )/g, gray2("$1")).replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, neonCyan.bold("$1")));
var tokens = (string) => string.replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>|:|,)/g, neonCyan("$1")).replace(/(['"].*?['"])/g, gray2("$1"));
var extract = (text) => {
  let lines = "";
  const valid = text.indexOf("- Valid syntax:");
  if (valid > -1) {
    lines = "\n" + text.slice(valid).slice(1).replace(/(Valid syntax)(:)(.*)/, redBright2("$1") + gray2("$2") + teal("$3"));
    return text.slice(0, valid) + lines;
  }
  return text;
};
var Shopify = (input, source) => {
  const output = [];
  const lineExp = /\(line \d+\):/;
  const nameExp = /'(.*?)'/;
  let indent = "  ";
  const wrapLimit = $.terminal.cols - 10;
  let line = NaN;
  let column = NaN;
  let space = 0;
  if (isString(input)) {
  }
  const frame = [];
  for (let i = 0, s = input.length; i < s; i++) {
    let text = input[i];
    if (lineExp.test(text)) {
      const lineIndex = text.indexOf("):");
      const numberIndex = text.indexOf("(line");
      if (lineIndex > -1 && numberIndex > -1) {
        output.unshift(
          glue(
            Tree.red,
            red2.bold(text.slice(0, lineIndex + 2)),
            "\n",
            Tree.redTrim
          )
        );
        line = Number(text.slice(numberIndex + 6, lineIndex));
        space = sanitize(line).length + 3;
        text = extract(text.slice(lineIndex + 2));
        output.push(
          glue(
            highlight(Wrap(text, { line: Tree.red, color: redBright2 })),
            "\n",
            Tree.redTrim,
            "\n",
            Tree.redTrim
          )
        );
        if (source.length > 1) {
          const before = glue(
            Tree.redTrim,
            " ".repeat(space - sanitize(line - 1).length),
            blue2(`${line - 1}`),
            " ",
            Tree.trim
          );
          const current = glue(
            Tree.redTrim,
            " ",
            red2.bold(">"),
            " ",
            blue2(`${line}`),
            " ",
            Tree.trim
          );
          let match2 = "";
          let errLine = source[line - 1].replace(/\t/g, "  ").trimEnd();
          const errLead = errLine.match(/^\s*/)[0];
          if (nameExp.test(text)) {
            match2 = text.match(nameExp)[1];
            column = source[line - 1].indexOf(match2);
            if (column < 0) column = NaN;
          }
          let prevLine = source[line - 2].replace(/\t/g, "  ").trimEnd();
          const prevLead = prevLine.match(/^\s*/)[0].length;
          if (errLead.length === prevLead) {
            prevLine = "  " + prevLine.trimStart();
            indent = "  ";
          } else if (errLead.length < prevLead) {
            prevLine = "    " + prevLine.trimStart();
            indent = "  ";
          } else {
            prevLine = "  " + prevLine.trimStart();
            indent = "    ";
          }
          if (prevLine.length > wrapLimit) {
            prevLine = prevLine.slice(0, wrapLimit - 3) + "...";
          }
          frame.push(before + gray2(prevLine));
          errLine = indent + errLine.trimStart();
          if (errLine.length > wrapLimit) {
            errLine = errLine.slice(0, wrapLimit - 3) + "...";
          }
          if (isNaN(column)) {
            frame.push(
              glue(
                current,
                white2(tokens(errLine)),
                "\n",
                Tree.redTrim
              )
            );
          } else {
            frame.push(
              current + white2(tokens(errLine)),
              glue(
                Tree.redTrim,
                " ".repeat(space - 1),
                BAD,
                " ",
                Tree.redTrim,
                " ".repeat(errLine.indexOf(match2)),
                redBright2("^".repeat(match2.length)),
                "\n" + Tree.redTrim
              )
            );
          }
        }
      }
    } else {
      output.push(
        highlight(
          Wrap(text, {
            line: Tree.red,
            color: redBright2
          })
        )
      );
    }
  }
  return {
    line,
    column,
    output: output.join("\n") + "\n" + frame.join("\n")
  };
};

// syncify/log/errors.ts
function spawn(data) {
  const newlines = data.split("\n").reduce((acc, line) => {
    const ansi = detect(line);
    let before = "";
    let after = "";
    if (ansi !== false) {
      if (ansi.length > 2) {
        const chunk = getChunk(ansi, ansi.length / 2);
        before = glue(chunk[0]);
        after = glue(chunk[1] || "");
      } else {
        before = ansi[0];
        after = ansi[1] || "";
      }
    }
    const clean = line.trim().replace(new RegExp($.cwd, "g"), "");
    if (clean.length === 0) {
      acc.push([Tree.trim]);
    } else {
      const prefix = [];
      const nwl2 = wrapAnsi(clean, $.terminal.wrap, {
        hard: true
      }).split("\n");
      while (nwl2.length !== 0) {
        let line2 = nwl2.shift();
        if (nwl2.length !== 0) {
          if (nwl2[0].length === 1) {
            line2 = line2 + nwl2.shift();
          }
        }
        prefix.push(Tree.line + before + line2 + after);
      }
      acc.push(prefix);
    }
    return acc;
  }, []);
  const format = [];
  let n = false;
  while (newlines.length !== 0) {
    const line = newlines.shift();
    if (newlines.length !== 0 && line.length > 1) {
      if (format.length > 0 && format[format.length - 1] !== Tree.trim) {
        format.push(Tree.trim);
      }
      format.push(line.join("\n"));
    } else if (line === Tree.trim) {
      if (n) {
        n = false;
      } else {
        n = true;
        format.push(line[0]);
      }
    } else {
      format.push(line[0]);
    }
  }
  log_update_default(format.join("\n"));
}
function request(file, e, options) {
  const defaults2 = { log: true, store: false };
  const config = assign(defaults2, options);
  if (config.store === true) config.data = object();
  const response = hasPath("error.asset", e.data) ? e.data.error.asset : hasPath("errors.asset", e.data) ? e.data.errors.asset : null;
  if (e.status === 422) {
    const { value } = JSON.parse(e.config.data).asset;
    const { output: output2, line, column } = Shopify(response, value.split("\n"));
    const context2 = object({
      stack: false,
      entries: object({
        column,
        line,
        file: TLD + file,
        details: e.statusText,
        status: white2(sanitize(e.status)),
        processor: neonMagenta("SHOPIFY API")
      })
    });
    const message2 = Create({ type: "error" }).NL.Insert(output2, gray2).NL.Context(context2).toString();
    if (config.store) {
      config.data.message = output2;
      config.data.rawMessage = strip(output2);
      config.data.context = context2;
    }
    if (config.log) error(message2);
    if (config.store) return config.data;
    return message2;
  }
  if (e.status in SHOPIFY_REQUEST_ERRORS) {
    const message2 = Create({ type: "error" }).NL.Wrap(SHOPIFY_REQUEST_ERRORS[e.status]).toLine();
    const context2 = object({
      stack: false,
      entries: object({
        status: e.status,
        message: e.statusText,
        source: `${file}`
      })
    });
    if (config.store) {
      config.data.message = message2;
      config.data.context = context2;
    }
    const output2 = glue(Tree.red, "\n", message2, Context2(context2));
    if (config.log) error(output2);
    if (config.store) return config.data;
    return output2;
  }
  const message = red2("Unknown error has occured");
  const context = {
    stack: false,
    entries: {
      status: e.status,
      message: e.statusText,
      source: `${file}`
    }
  };
  if (config.store) {
    config.data.message = message;
    config.data.context = context;
  }
  const output = glue(
    Tree.red,
    "\n",
    message,
    Context2({
      stack: false,
      entries: object({
        status: e.status,
        message: e.statusText,
        source: `${file}`
      })
    })
  );
  if (config.log) error(output);
  if (config.store) return config.data;
  return output;
}
function throws(e, entries) {
  const context = {
    stack: false,
    entries: {
      ...entries
    }
  };
  const message = e instanceof Error ? has2("message", e) ? e.message : e.toString() : e;
  if (has2("stack", e)) context.stack = e.stack;
  if (has2("code", e)) context.entries.code = e.code;
  if (has2("name", e)) context.entries.name = e.name;
  if (context.stack === false) {
    error(
      glue(
        Format(message, { type: "error" }),
        Context2(context)
      )
    );
    process.exit(0);
  } else {
    $.errors.add(
      glue(
        Format(message, { type: "error" }),
        Context2(context)
      )
    );
  }
}
var write = (message, context) => (e) => {
  error(
    glue(
      Format(e.message, { type: "error" }),
      Context2(
        {
          stack: e.stack,
          entries: {
            ...context,
            code: e.code,
            name: e.name,
            details: message
          }
        }
      )
    )
  );
};
function json(e, file) {
  e.fileName = file.base;
  const entries = object();
  let line;
  const message = Create({ type: "error" }).NL.Wrap(e.message.split("\n")[0], red2.bold).NL;
  if (has2("codeFrame", e)) {
    message.Newline();
    const lines = e.codeFrame.split("\n");
    const rawFrame = e.rawCodeFrame.split("\n");
    let i = 0;
    while (lines.length !== 0) {
      if (has2("line", entries) === false) {
        const raw = rawFrame[i].trimStart();
        if (raw[0] === ">") {
          const number = raw.slice(1).trimStart().match(/^\d+/);
          if (number !== null) line = Number(number[0]);
        }
      }
      message.Line(lines.shift());
      i = i + 1;
    }
    message.Newline();
  }
  const stack = [];
  const trace = e.stack.split("\n");
  while (trace.length !== 0) stack.push(Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    message.NL.Context({
      stack: true,
      entries: {
        line,
        name: e.name,
        file: TLD + file.relative,
        processor: neonMagenta("JSON")
      }
    }).toString()
  );
}
function sass(file, e) {
  const message = Create({ type: "error" }).NL.Wrap(e.sassMessage, red2.bold).Newline();
  if (has2("span", e)) {
    const { span } = e;
    const code = has2("context", span) ? span.context : span.text;
    if (code.length === 0) return "";
    message.Newline();
    const { start, end } = span;
    const space = sanitize(end.line + 1).length;
    if (start.line === end.line) {
      let same = space - sanitize(end.line).length;
      if (start.line > 1) message.Line(`${" ".repeat(same) + blue2(`${end.line}`)} ${Tree.trim}`);
      same = space - sanitize(end.line + 1).length;
      message.Line(`${" ".repeat(same) + blue2(`${end.line + 1}`)} ${Tree.trim} ${code.trimEnd()}`);
      message.Line(`${" ".repeat(space - 1) + BAD} ${Tree.redTrim} ${" ".repeat(end.column) + bold2("^")}`);
    } else {
      const content = code.slice(span.start.offset, span.end.offset);
      const lines = content.split("\n");
      let from = span.start.line + 1;
      for (const line of lines) {
        const number = sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        message.Line(`${align + blue2(number)} ${Tree.trim} ${line}`);
      }
    }
  }
  error(
    message.NL.Context({
      stack: e.sassStack,
      entries: {
        line: e.span.start.line,
        name: e.name,
        input: file.input,
        cause: e.cause,
        processor: neonMagenta("SASS Dart")
      }
    }).toString()
  );
}
function esbuild(e) {
  const message = Create({ type: "error" }).NL.Wrap(e.text, red2.bold).Newline();
  const span = e.location;
  const space = sanitize(span.line).length;
  let same = space - sanitize(e.location.line).length;
  if (span.line > 1) message.Line(`${" ".repeat(same) + blue2(`${span.line - 1}`)} ${Tree.trim}`);
  same = space - sanitize(span.line).length;
  error(
    message.Line(`${" ".repeat(same) + blue2(`${span.line}`)} ${Tree.trim} ${span.lineText}`).Line(`${" ".repeat(space - 1) + BAD} ${Tree.redTrim} ${" ".repeat(span.column) + bold2("^")}`).NL.NL.Context({
      stack: false,
      entries: {
        suggest: whiteBright2(span.suggestion),
        line: e.location.line,
        column: e.location.column,
        plugin: e.pluginName,
        namespace: span.namespace,
        file: TLD + e.location.file,
        processor: neonMagenta("ESBuild")
      }
    }).toString()
  );
}
function postcss(file, e) {
  const stack = [];
  const trace = cleanStack(e.stack, { pretty: true, basePath: $.cwd }).split("\n");
  while (trace.length !== 0) stack.push(Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    Create({ type: "error" }).NL.Wrap(`${e.name}${COL} ${e.reason}`, red2.bold).Newline().Multiline(e.showSourceCode(true)).NL.NL.Context({
      stack: true,
      entries: {
        line: e.line,
        column: e.column,
        source: file.input,
        file: file.input === e.file ? void 0 : e.file,
        plugin: blue2(e.plugin),
        processor: neonMagenta("PostCSS")
      }
    }).toString()
  );
}

// syncify/cli/progress.ts
init_cjs_shims();
function progress(total, opts = {}) {
  const options = assign({
    showPercentage: true,
    barColor: "neonGreen",
    percentColor: "whiteBright",
    barSize: 40,
    clearOnComplete: false
  }, opts);
  let percent = 0;
  const align = (output) => Tree.line + output + " ".repeat(Math.max(0, options.barSize - output.length));
  const bar = (length, empty = false) => (empty ? "\u25B1" : "\u25B0").repeat(length);
  const stop = () => {
    if (options.clearOnComplete) console.clear();
  };
  const increment = (incrementBy = 1) => {
    const filled = percent + incrementBy;
    percent = Math.min(filled, total);
    if (percent === total) stop();
  };
  const decrement = (decrementBy = 1) => {
    const filled = percent - decrementBy;
    percent = Math.max(filled, 0);
  };
  const render = (percentColor) => {
    const progress2 = Math.round(percent / total * options.barSize);
    const filled = bar(progress2);
    const empty = bar(options.barSize - progress2, true);
    let output = import_index2.default[options.barColor](filled) + lightGray(empty);
    if (options.showPercentage) {
      output += (percentColor || whiteBright2)(` ${String(Math.round(percent / total * 100))}%`);
    }
    return align(output);
  };
  return {
    stop,
    increment,
    decrement,
    render,
    /**
     * Returns the percent filled amount
     */
    get percent() {
      return percent;
    }
  };
}

// syncify/log/runtime.ts
init_cjs_shims();
var import_pathe2 = require("pathe");

// syncify/log/throws.ts
init_cjs_shims();
var import_node_process8 = require("process");
var warnings = {};
function warnOption(group2) {
  if (!has(group2, warnings)) warnings[group2] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      warnings[group2].push(yellowBright2(message));
    } else {
      warnings[group2].push(yellowBright2(message + COL + " " + bold2(value)));
    }
  };
}
function typeError({
  option,
  name,
  provided,
  expects
}) {
  error(
    Create({ type: "error" }).Line("TYPE ERROR", bold2).NL.Line(`An invalid ${cyan2(option)} type value was provided within your ${bold2($.file.base)} file.`).Line(`The ${cyan2(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`).NL.Line(`provided${COL} ${yellowBright2(type(provided).toLowerCase())}`).Line(`expected${COL} ${blue2(expects.replace(/([|,])/g, gray2("$1")))}`).Line(`location${COL} ${TLD}${gray2.underline($.file.base)}`).NL.Line("How to fix?", gray2.bold).Line(`You need to change the option value to use the ${blue2("expected")} type.`, gray2).Line(`Use the ${white2("defineConfig")} named export for type checking`, gray2).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function invalidCommand({
  message,
  expected,
  provided = void 0,
  fix
}) {
  if (!provided) {
    provided = import_node_process8.argv.slice(2).join(" ");
    expected = whiteBright2(`syncify ${provided} ${cyan2(expected.replace(/([|,-])/g, gray2("$1")))}`);
  } else {
    expected = whiteBright2(`syncify ${expected}`);
  }
  error(
    Create({ type: "error" }).Line("COMMAND ERROR", bold2).NL.Wrap(message).NL.Line(`provided${COL} ${whiteBright2("$")} ${whiteBright2("syncify " + provided)}`).Line(`expected${COL} ${whiteBright2("$")} ${expected}`).NL.Line("How to fix?", gray2.bold).Wrap(fix, gray2).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function invalidTarget({
  type: type2,
  message,
  provided,
  expected,
  fix
}) {
  if (REGEX_OR_CHARS.test(provided)) {
    provided = provided.replace(REGEX_OR_CHARS, gray2("$1"));
  }
  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, gray2("$1"));
  }
  error(
    Create({ type: "error" }).Line("INVALID TARGET", bold2).NL.Wrap(`Invalid ${cyan2(type2)} target provided. `, ...message).NL.Line(`provided${COL} ${yellowBright2(expected)}`).Line(`expected${COL} ${blue2(provided)}`).NL.Line("How to fix?", gray2.bold).Wrap(fix, gray2).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingDependency(deps) {
  const message = Create({
    type: "error"
  }).Line("DEPENDENCY ERROR", bold2).NL;
  if (isString(deps)) {
    message.Wrap(`Missing ${cyan2(deps)} dependency. You need to install ${cyan2(deps)} to use it as a processor.`).NL.Line("How to fix?", gray2.bold).Line("Install the above module as a development dependency, for example:").NL.Line(`$ pnpm add ${deps} -D`, whiteBright2);
  } else {
    const info = [
      `Missing ${cyan2(`${deps.length}`)} dependencies. You are attempting to use processor`,
      "(transforms) which are not yet installed. Install the below modules as development",
      "dependencies or disable the transform:"
    ];
    message.Wrap(info).Newline();
    for (const dep of deps) {
      message.Line(`$ pnpm add ${dep} -D`, whiteBright2);
    }
  }
  error(
    message.NL.Wrap("If you are using a different package manager please consider adopting pnpm.", gray2).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingOption({
  option,
  key,
  expects,
  reason
}) {
  if (option.indexOf(".") > -1) {
    option = option.split(".").filter(Boolean).join(gray2(" \u2192 "));
  }
  error(
    Create({ type: "error" }).Line("MISSING OPTION", bold2).NL.Wrap(`Missing ${Encase("CB", cyan2(option))} config option. The ${cyan2(key)} option must be defined`).NL.Line(`expected${COL} ${blue2(expects.replace(/([|,])/g, gray2("$1")))}`).Line(`location${COL} ${gray2.underline($.file.base)}`).NL.Line("Why?", gray2.bold).Wrap(reason, gray2).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function invalidError({
  option,
  name,
  value,
  expects,
  reason = [""]
}) {
  if (option.indexOf(".") > -1) {
    option = option.split(".").filter(Boolean).join(gray2(" \u2192 "));
  }
  error(
    Create({ type: "error" }).Line("INVALID ERROR", bold2).NL.Wrap(`Invalid ${cyan2(option)} configuration. The ${cyan2(name)} option is invalid. `, ...reason).NL.Line(`provided${COL} ${yellowBright2(value)}`).Line(`expected${COL} ${blue2(expects.replace(/([|,])/g, gray2("$1")))}`).NL.Line("How to fix?", gray2.bold).Line("You need to update the option and use one of the expected values.", gray2).Line(`Use the ${white2("defineConfig")} named export for type checking`, gray2).End($.log.group).BR.toString(red2)
  );
  process.exit(0);
}
function missingStores(cwd) {
  error(
    Create({ type: "error" }).Line(`${"MISSING REFERENCE"}`, bold2).NL.Line(`You have not provided any ${bold2("stores")} within your ${cyan2("package.json")} file.`).NL.Line("How to fix?", white2.bold).Line(`You need to provide ${cyan2("stores")} via ${cyan2("syncify")} key`, gray2).Line("passing both your store name and a key > value list of theme targets.", gray2).NL.Line("{", gray2).Line('  "syncify": {'.replace(/"/g, white2('"')), gray2).Line('    "stores": {'.replace(/"/g, white2('"')), gray2).Line(`      "domain": "${redBright2("your-store")}"`.replace(/"/g, white2('"')), gray2).Line('      "themes": {}'.replace(/"/g, white2('"')), gray2).Line("    }", gray2).Line("  }", gray2).Line("}", gray2).NL.Line(`Replace the ${white2("your-store")} with the name of your .myshopify domain.`, gray2).Line("Syncify will prompt you and provide a list of theme targets to select from.", gray2).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingConfig(cwd) {
  error(
    Create({ type: "nil" }).Line(`${`Missing ${cyan2("syncify.config.js")} configuration`}`, bold2).BR.Line("Unable to resolve a configuration file within the workspace").BR.Line(`at${COL} ${gray2.underline("~" + cwd)}`).BR.Line("How to fix?", white2.bold).Line("You need to add one the following files to your project", gray2).BR.Line(` - ${white2("syncify.config.ts")}`, gray2).Line(` - ${white2("syncify.config.js")}`, gray2).Line(` - ${white2("syncify.config.mjs")}`, gray2).Line(` - ${white2("syncify.config.cjs")}`, gray2).Line(` - ${white2("syncify.config.json")}`, gray2).BR.Line(`You can also provide configuration in your ${white2("package.json")}`, gray2).Line(`file using the ${cyan2('"syncify": { "config": {} }')} 'property.`, gray2).BR.toString(red2)
  );
  process.exit(0);
}
function missingEnv(cwd) {
  const message = [
    `Missing ${cyan2(".env")} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${cyan2(".env")} or ${cyan2("syncify.env")} file present in the root of your project`
  ];
  error(
    Create({ type: "error" }).Line("MISSING ENV", bold2).NL.Wrap(message).NL.End($.log.group).BR.toString(red2)
  );
  process.exit(0);
}
function errorRuntime(e, options) {
  const message = e instanceof Error ? has("message", e) ? e.message : e.toString() : e;
  if (has("code", e)) options.entries.code = e.code;
  if (has("name", e)) options.entries.name = e.name;
  error(
    Create({ type: "error" }).Line("ERROR", bold2).NL.Wrap(options.message, redBright2).NL.Wrap(message, redBright2.bold).NL.Line("How to fix?", gray2.bold).Wrap(options.solution, gray2).NL.Context({
      entries: options.entries
    }).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function throwError(message, solution) {
  error(
    Create({ type: "error" }).Line("ERROR", bold2).NL.Wrap(message).NL.Line("How to fix?", gray2.bold).Wrap(solution, gray2).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function unknownError(option, value) {
  if (option.indexOf(".") > -1) {
    option = Encase("CB", glueString(
      option.split(".").filter(Boolean).join(gray2(" \u2192 ")),
      ARR,
      redBright2.bold(value)
    ), {
      spaced: true
    });
  }
  const file = $.file.base === "package.json" ? `${blue2("syncify")} config in the ${blue2("package.json")} file.` : `${blue2($.file.base)} file.`;
  error(
    Create({ type: "error" }).Line("ERROR", bold2).NL.Line(`Unknown ${cyan2(option)} option provided.`).NL.Line("How to fix?", gray2.bold).Line(`The ${cyan2(value)} option is invalid or unsupported.`).Line(`You need to remove it from the ${file}`).End($.log.group).BR.toString()
  );
  process.exit(0);
}

// syncify/log/runtime.ts
var runtime = function($2) {
  clear3();
  if ($2.log.config.silent) return;
  $2.env.tree = true;
  const message = Create().BR.Top("Syncify").NL.Line(`v${$2.version}`, bold2.whiteBright);
  if ($2.terminal.cols < 80) {
    message.Newline("red").Error("TERMINAL WIDTH WARNING", bold2).Newline("red").Error(`Your terminal width is below ${bold2(`${100}`)} columns (currently ${bold2(`${$2.terminal.cols}`)})`).Error("This is not recommended for usage with Syncify (size matters).").Error("Expand your terminal wider for an optimal logging experience.");
  }
  log(message.toLine());
};
runtime.time = function() {
  log(
    Break(lightGray(`Started in ${timer.stop("runtime")}`))
  );
};
runtime.modes = function($2) {
  const message = Create();
  let seq = $2.env.prod ? "--prod" : "--dev";
  if ($2.mode.themes) {
    return log(
      message.Wrap(
        "Select theme target/s to be inserted into your package.json file.",
        "You will be given a code example after selecting where you will define",
        "a custom target name. If you would like to create a new theme, then run",
        `the ${cyan2("publish")} resource`,
        gray2
      ).toLine()
    );
  }
  if ($2.mode.cache) {
    if (seq !== "") {
      seq += ` ${TLD} cache`;
    } else {
      seq += "cache";
    }
  }
  if ($2.mode.clean) {
    if (seq !== "") {
      seq += ` ${TLD} clean`;
    } else {
      seq += "clean";
    }
  }
  if ($2.spawn.invoked) {
    if (seq !== "") {
      seq += ` ${TLD} build`;
    } else {
      seq += "build";
    }
  }
  if ($2.mode.build) {
    if (seq !== "") {
      seq += ` ${TLD} build`;
    } else {
      seq += "build";
    }
  }
  if ($2.mode.export) {
    if (seq !== "") {
      seq += ` ${TLD} export`;
    } else {
      seq += "export";
    }
  }
  if ($2.mode.publish) {
    if (seq !== "") {
      seq += ` ${TLD} publish`;
    } else {
      seq += "publish";
    }
  }
  if ($2.mode.import) {
    if (seq !== "") {
      seq += ` ${TLD} import`;
    } else {
      seq += "import";
    }
  }
  if ($2.mode.watch) {
    if (seq !== "") {
      seq += ` ${TLD} watch`;
    } else {
      seq += "watch";
    }
    if ($2.mode.hot) {
      seq += ` ${TLD} hot`;
    }
  }
  if (seq !== "") {
    message.Line(seq, gray2);
    seq = "";
  }
  if (!isEmpty($2.filters)) {
    message.NL.Line(`Filters${COL}`, white2.bold);
    const space = ws($2.filters);
    for (const group2 in $2.filters) {
      const join24 = white2($2.filters[group2].map((k) => (0, import_pathe2.relative)($2.cwd, k)).join(", "));
      message.Line(` ${TLD} ${group2}${COL}${space(group2)}${join24}`, neonCyan);
    }
  }
  log(message.toLine());
};
runtime.spawns = function($2) {
  if ($2.mode.build || $2.mode.watch) {
    const message = Create().Line(`Spawned${COL}`, white2.bold);
    const space = ws($2.spawn.commands);
    for (const name in $2.spawn.commands) {
      const sp = space(name);
      const pid = $2.spawn.commands[name].pid;
      message.Line(` ${TLD} ${neonCyan(name)}${COL}${sp}PID ${ARR} #${pink(`${pid}`)}`, gray2);
    }
    log(message.toLine());
  }
};
runtime.stores = function($2) {
  const text = Create();
  const size2 = $2.sync.themes.length;
  if (allFalse($2.mode.upload, $2.mode.import, $2.mode.build, $2.mode.clean)) {
    if (size2 > 0) {
      text.Line(`Editors${COL}`, bold2.white);
      getThemeURLS(text, $2.sync.themes, "editor");
    }
  }
  if (anyTrue($2.mode.upload, $2.mode.import, $2.mode.watch)) {
    if (size2 > 0) {
      if ($2.mode.upload || $2.mode.import) {
        text.NL.Line(`Targets${COL}`, bold2.white);
      } else {
        text.NL.Line(`Previews${COL}`, bold2.white);
      }
      getThemeURLS(text, $2.sync.themes, "preview");
    }
  }
  log(text.toLine());
};
runtime.warnings = function getRuntimeWarnings($2) {
  if (!$2.log.config.warnings) return;
  const props = keys(warnings);
  const amount = props.reduce((n, k) => {
    n = n + warnings[k].length;
    return n;
  }, 0);
  if (amount === 0) return;
  const message = Create({ type: "warning" }).Line(`${amount} ${plural("Warning", amount)}`, bold2);
  for (const key of props) {
    const item = warnings[key];
    if (item.length > 0) {
      if (item.length === amount) {
        message.Newline().Line(`${key} ${plural("Warning", item.length)}`, bold2).Newline();
      } else {
        message.Newline().Line(`${item.length} ${key} ${plural("Warning", item.length)}`, bold2);
      }
      for (const text of item) {
        message.Line(`${DSH} ${text}`, yellowBright2);
      }
    }
  }
  warn(message.toString());
};
function getThemeURLS(text, themes2, url) {
  const width = themes2.reduce((size2, { target, store }) => {
    const name = store.indexOf(".");
    if (name > size2.store) size2.store = name;
    if (target.length > size2.theme) size2.theme = target.length;
    return size2;
  }, {
    store: 0,
    theme: 0
  });
  for (const { target, store, id } of themes2) {
    const name = store.slice(0, store.indexOf("."));
    const type2 = url === "editor" ? `https://${store}/admin/themes/${id}/editor` : `https://${store}?preview_theme_id=${id}`;
    text.Line(
      glueString(
        " ",
        TLD,
        pink(name),
        " ".repeat(width.store - name.length),
        ARR,
        " ",
        pink.bold(target),
        " ".repeat(width.theme - target.length),
        ARR,
        " ",
        gray2.underline(type2)
      )
    );
  }
}

// syncify/log/loggers.ts
var spinner = Spinner2();
var hline = (options) => {
  log(
    Ruler(
      options.width,
      options.newlines
    )
  );
};
var write2 = (message, {
  color,
  type: type2 = null,
  prefix = null,
  suffix = null
} = {}) => {
  if (type2 === "error") {
    if (prefix === null) {
      error(
        glueString(
          LineRed(color ? color(message) : redBright2(message)),
          Append(suffix)
        )
      );
    } else {
      error(
        LineRed(
          (color || redBright2)(
            Prefix(
              prefix,
              glueString(
                message,
                Append(suffix)
              )
            )
          )
        )
      );
    }
  } else if (type2 === "warning") {
    if (prefix === null) {
      log(
        LineYellow(
          glueString(
            color ? color(message) : yellowBright2(message),
            Append(suffix)
          )
        )
      );
    } else {
      log(
        LineYellow(
          (color || yellowBright2)(
            Prefix(
              prefix,
              glueString(
                message,
                Append(suffix)
              )
            )
          )
        )
      );
    }
  } else {
    if (prefix === null) {
      log(
        Line(
          glueString(
            color ? color(message) : whiteBright2(message),
            Append(suffix)
          )
        )
      );
    } else {
      log(
        Line(
          (color || whiteBright2)(
            Prefix(
              prefix,
              glueString(
                message,
                Append(suffix)
              )
            )
          )
        )
      );
    }
  }
};
var nwl = (entry) => {
  if (entry === "") {
    log("\n");
  } else if (entry === "red") {
    log(Tree.red);
  } else if (entry === "yellow") {
    log(Tree.yellow);
  } else {
    log(Tree.line);
  }
};
var clear3 = (force = false) => {
  if (force === false && $.log.config.clear === false) return;
  const count = import_node_process9.stdout.rows - 2;
  log(count > 0 ? "\n".repeat(count) : "");
  (0, import_node_readline.cursorTo)(import_node_process9.stdout, 0, 0);
  (0, import_node_readline.clearScreenDown)(import_node_process9.stdout);
};
var group = (name) => {
  if ($.log.config.silent || $.env.tree === false) return;
  log(End($.log.group));
  if ($.log.config.clear && name !== false) clear3();
  if (isString(name)) {
    $.log.group = name;
    log("\n" + Top($.log.group));
  }
};
var task = (name) => {
  if ($.log.config.silent || $.env.tree === false) return;
  if (isString(name)) {
    log(Dash(gray2(name) + " " + Append(getTime())));
  } else {
    clear3();
    log(
      Tree.line + "\n" + Dash(
        glueString(
          gray2($.log.group),
          Append(getTime())
        )
      )
    );
  }
};
var process7 = (label, ...message) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if (message.length === 2) {
    log(
      Line(
        whiteBright2(
          Prefix(
            "process",
            glueString(
              bold2(label),
              CHV,
              message[0],
              Append(message[1])
            )
          )
        )
      )
    );
  } else {
    log(
      Line(
        whiteBright2(
          Prefix(
            "process",
            glueString(
              bold2(label),
              Append(message[0])
            )
          )
        )
      )
    );
  }
};
var changed = (file) => {
  if ($.log.config.silent === true || $.mode.watch === false) return;
  timer.start();
  const name = glueString(file.kind, CHV, toUpcase(file.namespace));
  const change = has2(file.relative, $.log.changes) ? $.log.changes[file.relative] + 1 : 1;
  $.log.changes[file.relative] = change;
  if ($.log.group !== name) {
    nwl();
    group(name);
    if ($.log.title !== file.namespace) $.log.title = file.namespace;
  } else if ($.log.config.clear) {
    nwl();
    group(name);
  }
  if ($.log.uri !== file.relative) {
    $.log.uri = file.input;
  }
  log(
    NextLine(
      neonCyan(
        Prefix("changed", glueString(
          file.relative,
          Append(`${change} change${change > 1 ? "s" : ""}`)
        ))
      )
    )
  );
};
var minified = (...p) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if (p.length === 1) {
    log(
      Line(
        whiteBright2(
          Prefix("minified", bold2(p[0]))
        )
      )
    );
  } else if (p.length === 4) {
    log(
      Line(
        whiteBright2(
          Prefix(
            "minified",
            glueString(
              bold2(p[0]),
              ARR,
              p[1],
              ARL,
              p[2],
              TLD,
              "saved",
              p[3]
            )
          )
        )
      )
    );
  } else {
    log(
      Line(
        whiteBright2(
          Prefix(
            "minified",
            glueString(
              bold2(p[0]),
              ARL,
              p[1],
              TLD,
              "saved",
              p[2],
              Append(
                timer.now()
              )
            )
          )
        )
      )
    );
  }
};
var syncing = (path2, { hot: hot2 = false } = {}) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if ($.warnings.has(path2)) {
    log(
      LineYellow(
        yellowBright2(
          Prefix(
            "warning",
            glueString(
              sanitize($.warnings.get(path2).size),
              plural("warning", $.warnings[path2].size),
              Suffix.warning
            )
          )
        )
      )
    );
  }
  log(
    Line(
      magentaBright2(
        Prefix("syncing", path2)
      )
    )
  );
  if (queue.pending > (hot2 ? 0 : 2)) {
    log(
      Line(
        orange(
          Prefix("queued", glueString(path2, TLD, bold2(addSuffix(queue.pending)), "in queue"))
        )
      )
    );
  }
};
var prompt = (message, notify) => {
  log(
    Line(
      orange(
        Prefix("prompt", message)
      )
    ),
    End($.log.group)
  );
  if (isObject(notify)) import_node_notifier.default.notify(notify).notify();
  return () => log(Top($.log.group));
};
var resource = (type2, store) => {
  if ($.mode.watch) {
    $.log.queue.add(
      [
        type2,
        store.domain,
        timer.stop()
      ]
    );
    if ($.log.idle) return;
    else $.log.idle = true;
    queue.onIdle().then(() => {
      for (const [type3, store2, ctime] of $.log.queue) {
        log(
          Line(
            neonGreen(
              Prefix(
                "uploaded",
                glueString(
                  bold2(type3),
                  ARR,
                  store2,
                  Append(ctime)
                )
              )
            )
          )
        );
      }
      $.log.queue.clear();
      $.log.idle = false;
    });
  } else {
    log(
      Line(
        neonGreen(
          Prefix(
            "uploaded",
            glueString(
              bold2(type2),
              ARR,
              store.domain,
              Append(timer.stop())
            )
          )
        )
      )
    );
  }
};
var upload = (theme3) => {
  if ($.log.config.silent) return;
  if ($.mode.watch) {
    $.log.queue.add([theme3.target, theme3.store, timer.stop()]);
    if ($.log.idle) return;
    else $.log.idle = true;
    queue.onIdle().then(() => {
      for (const [
        target,
        store,
        ctime
      ] of $.log.queue) {
        log(
          Line(
            neonGreen(
              Prefix("uploaded", bold2(target), store, ctime)
            )
          )
        );
      }
      $.log.queue.clear();
      $.log.idle = false;
    });
  } else {
    log(
      Line(
        neonGreen(
          Prefix("uploaded", bold2(theme3.target), theme3.store, timer.stop())
        )
      )
    );
  }
};
var invalid = (path2, message) => {
  log(
    LineRed(
      red2(
        Prefix("invalid", path2)
      )
    )
  );
  import_node_notifier.default.notify(
    {
      title: "Syncify Error",
      sound: "Pop",
      open: path2,
      subtitle: path2,
      message: "Invalid error"
    }
  ).notify();
  if (message) {
    error(
      Multiline(
        message,
        {
          type: "error",
          color: red2.bold
        }
      )
    );
  }
};
var error2 = (input, { suffix = null, notify = null } = {}) => {
  error(
    LineRed(
      red2(
        Prefix("error", suffix ? input + " " + Append(suffix) : input)
      )
    )
  );
  if (notify !== null) {
    import_node_notifier.default.notify(notify).notify();
  }
};
var spawn2 = (name) => {
  return function(...input) {
    if (!$.spawn.invoked) $.spawn.invoked = true;
    if ($.log.group !== "Spawn") {
      log(End($.log.group));
      if ($.log.group !== "Syncify") clear3();
      log(Top("Spawn"));
      $.log.group = "Spawn";
    }
    if ($.log.title !== name) {
      log(Next(neonCyan(name)));
      $.log.title = name;
    }
    spawn.call(this, input.toString());
  };
};
var warn2 = (message, suffix) => {
  if (suffix) {
    log(
      LineYellow(
        yellowBright2(
          Prefix("warning", message) + Append(suffix)
        )
      )
    );
  } else {
    log(
      LineYellow(
        yellowBright2(
          Prefix("warning", message)
        )
      )
    );
  }
};
var retrying = (file, theme3) => {
  log(
    Line(
      orange(
        Prefix("retrying", file, theme3.target, theme3.store)
      )
    )
  );
};
var deleted = (file, theme3) => {
  log(
    Line(
      blueBright2(
        Prefix("deleted", file, theme3.target, theme3.store)
      )
    )
  );
};
var transform = (label, ...suffix) => {
  if ($.mode.build) return;
  if (suffix.length > 0) {
    log(
      Line(
        whiteBright2(
          Prefix(
            "transform",
            glueString(
              bold2(label),
              ARR,
              suffix[0],
              suffix.length === 2 ? glueString(
                ARR,
                suffix[1]
              ) : suffix.length === 3 ? glueString(
                ARR,
                suffix[1],
                Append(suffix[2])
              ) : ""
            )
          )
        )
      )
    );
  } else {
    log(
      Line(
        whiteBright2(
          Prefix(
            "transform",
            bold2(label)
          )
        )
      )
    );
  }
};
var zipped = (size2, path2) => {
  log(
    Line(
      whiteBright2(
        Prefix(
          "zipped",
          glueString(
            bold2("ZIP"),
            size2,
            Append(path2)
          )
        )
      )
    )
  );
};
var skipped = (file, reason) => {
  if ($.mode.export || $.mode.build) return;
  log(
    Line(
      Prefix(
        "skipped",
        glueString(
          isString(file) ? file : file.key,
          Append(reason)
        )
      )
    )
  );
};
var title = (label) => {
  log(
    Break(
      whiteBright2.bold(label)
    )
  );
};
var hot = (id) => {
  log(
    Line(
      neonRouge(
        Prefix(
          "reloaded",
          glueString(
            bold2("HOT RELOAD"),
            Append(timer.now(id))
          )
        )
      )
    )
  );
};
var exported = (from, to) => {
  if ($.mode.build) return;
  log(
    Line(
      teal(
        Prefix(
          "exported",
          glueString(
            bold2(from),
            ARR,
            bold2(to)
          )
        )
      )
    )
  );
};
var version = (vc, type2) => {
  log(
    Line(
      whiteBright2(
        Prefix(
          "version",
          glueString(
            vc.number,
            ARL,
            vc.update.number,
            Append(type2)
          )
        )
      )
    )
  );
};

// syncify/requests/assets.ts
async function find(asset, theme3) {
  const request2 = merge($.sync.stores[theme3.sidx].client, {
    method: "get",
    url: theme3.url,
    params: { "asset[key]": asset }
  });
  return axios(request2).then(({ data }) => data.asset.value).catch(() => false);
}
async function upload2(asset, config) {
  const request2 = merge($.sync.stores[config.theme.sidx].client, {
    method: "put",
    url: config.theme.url,
    data: {
      asset: {
        key: config.key,
        value: asset
      }
    }
  });
  return axios(request2).then(() => true).catch((e) => {
    error2(config.key);
    request(config.key, e.response);
    return false;
  });
}
async function get(theme3, config) {
  const request2 = merge(config, { method: "get", url: theme3.url });
  try {
    const { data } = await axios(request2);
    return data;
  } catch (e) {
    if (e.response && (e.response.status === 429 || e.response.status === 500)) {
      if (config.params["asset[key]"]) {
        retrying(config.params["asset[key]"], theme3);
        queue.add(() => get(theme3, config));
      }
    } else {
      if ($.mode.upload) {
        throw e.response;
      } else {
        if (config.params["asset[key]"]) {
          error2(config.params["asset[key]"]);
          request(config.params["asset[key]"], e.response);
        }
      }
    }
  }
}
var limit;
async function sync(theme3, file, config) {
  if (queue.isPaused) return;
  if (queue.concurrency > 2) {
    if (limit >= 20) queue.concurrency--;
    if (limit >= 32) queue.concurrency--;
    if (limit >= 39) await delay(500);
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }
  $.mode.upload === false && $.mode.import === false && timer.start();
  const promise = await axios(config).then(({ headers, data }) => {
    if ($.mode.import === false && config.method === "get") return data;
    if (config.method === "delete") {
      deleted(file.relative, theme3);
    } else {
      if ($.mode.watch) {
        $.mode.hot === true && file.type !== 10 /* Script */ && file.type !== 9 /* Style */ && hot();
        upload(theme3);
      } else if ($.mode.upload) {
        event.emit("upload", {
          status: 0 /* Success */,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        event.emit("import", {
          status: 0 /* Success */,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          },
          get data() {
            return data;
          }
        });
      }
    }
    limit = parseInt(headers["x-shopify-shop-api-call-limit"].slice(0, 2), 10);
  }).catch((e) => {
    if (e.response && (e.response.status === 429 || e.response.status === 500)) {
      if ($.mode.upload === false && $.mode.import === false) {
        retrying(file.key, theme3);
      }
      queue.add(() => sync(theme3, file, config));
      if ($.mode.upload) {
        event.emit("upload", {
          status: 1 /* Retry */,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        event.emit("import", {
          status: 1 /* Retry */,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          }
        });
      }
    } else {
      if ($.mode.upload) {
        return event.emit("upload", {
          status: 2 /* Failed */,
          error: e.response,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        if (e.response === void 0) {
          event.emit("import", {
            status: 3 /* Empty */,
            get theme() {
              return theme3;
            },
            get file() {
              return file;
            }
          });
        } else {
          return event.emit("import", {
            status: 2 /* Failed */,
            error: e.response,
            get theme() {
              return theme3;
            },
            get file() {
              return file;
            }
          });
        }
      } else {
        error2(file.key, {
          suffix: "shopify rejected the request",
          notify: {
            title: "Request Error",
            message: `Failed to sync ${file.key}`
          }
        });
        if (e.isAxiosError) {
          request(file.relative, e.response);
        }
      }
    }
    return pMapSkip;
  });
  return promise;
}

// syncify/requests/metafields.ts
init_cjs_shims();
var import_axios2 = __toESM(require("axios"));
var import_fs_extra = require("fs-extra");
var import_pathe3 = require("pathe");
var import_prompts = __toESM(require("prompts"));
async function find2(store, field) {
  if (arguments.length === 1) return (_field) => find2(store, _field);
  if (allFalse(has("namespace", field), has("key", field))) {
    invalid("invalid fields");
    return void 0;
  }
  return import_axios2.default.get("metafields.json", store.client).then(({ data }) => {
    return data.metafields.find((m) => field.namespace === m.namespace && field.key === m.key);
  }).catch((e) => {
    console.log(e);
    return void 0;
  });
}
async function create3(store, metafield) {
  if (arguments.length === 1) return (_metafield) => create3(store, _metafield);
  metafield.type = "json";
  metafield.namespace = "email";
  metafield.value_type = "json_string";
  metafield.key = "eng";
  return import_axios2.default.post("metafields.json", { metafield }, store.client).then(({ data }) => {
    console.log("created", data);
    return data.metafield;
  }).catch((e) => {
    console.log(e);
    if (!store.queue) return request(metafield.namespace, e.response);
    if (requeue(e.response.status)) {
      queue.add(() => create3(store, metafield));
      return void 0;
    } else {
      return request(store.store, e.response);
    }
  });
}
async function update(store, id, metafield) {
  if (is(arguments.length, 1)) return (_id, _field) => update(store, _id, _field);
  return import_axios2.default.put(`metafields/${id}.json`, { metafield }, store.client).then((d) => {
    console.log("created");
    return d.data.metafield;
  }).catch((e) => {
    if (!store.queue) return request(metafield.namespace, e.response);
    if (requeue(e.response.status)) {
      queue.add(() => update(store, id, metafield));
    } else {
      return request(store.store, e.response);
    }
  });
}
async function sync2(store, field) {
  if (is(arguments.length, 1)) return (_field) => sync2(store, _field);
  const data = await find2(store, field);
  if (!data) return create3(store, field);
  return update(store, data.id, assign(field, { id: data.id, type: "json" })).catch((e) => {
    if (!store.queue) return request(field.namespace, e.response);
    if (requeue(e.response.status)) {
      queue.add(() => sync2(store, field));
    } else {
      return request(store.store, e.response);
    }
  });
}

// syncify/requests/client.ts
function client({ stores, themes: themes2 }) {
  return {
    assets: async (method, file, content) => {
      const payload = isUndefined(content) ? {
        method,
        params: {
          "asset[key]": file.key
        }
      } : {
        method,
        data: {
          asset: {
            key: file.key,
            value: content
          }
        }
      };
      await queue.add(() => pMap(themes2, async (theme3) => {
        if ($.mode.upload) timer.start(file.uuid);
        await sync(theme3, file, assign(
          { url: theme3.url },
          stores[theme3.sidx].client,
          payload
        ));
      }));
    },
    pages: async (method, file, content) => {
      await queue.add(() => pMap(stores, async (store) => {
        if ($.mode.upload) timer.start();
        console.log(content);
      }));
    },
    // @ts-expect-error
    metafields: (content) => {
      return queue.add(function() {
        return mapParallelAsync(async function(store) {
          await sync2(store, content);
        }, stores);
      });
    }
  };
}

// syncify/process/files.ts
init_cjs_shims();
var import_pathe6 = require("pathe");

// syncify/process/context.ts
init_cjs_shims();
var import_pathe5 = require("pathe");

// syncify/utils/paths.ts
init_cjs_shims();
var import_pathe4 = require("pathe");
function globPath(path2) {
  return isArray2(path2) ? path2.filter((uri) => /\*/.test(uri)) : /\*/.test(path2) ? path2 : null;
}
function lastPath(path2) {
  if (isArray2(path2)) return path2.map(lastPath);
  if (path2.indexOf("/") === -1) return path2;
  const dir = path2.endsWith("/") ? (0, import_pathe4.dirname)(path2.slice(0, -1)) : (0, import_pathe4.dirname)(path2);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
}
function parentPath(path2) {
  if (isArray2(path2)) return path2.map(parentPath);
  const last2 = path2.lastIndexOf("/");
  if (last2 === -1) return path2;
  const glob9 = path2.indexOf("*");
  return glob9 === -1 ? path2.slice(0, last2) : path2.slice(0, glob9);
}
function normalPath(input, cwd = null) {
  const regex2 = new RegExp(`^\\.?\\/?${input}\\/`);
  return function prepend(path2) {
    if (Array.isArray(path2)) return path2.map(prepend);
    const ignore = path2.charCodeAt(0) === 33;
    if (ignore) path2 = path2.slice(1);
    if (regex2.test(path2)) return ignore ? "!" + path2 : path2;
    if (path2.charCodeAt(0) === 46 && path2.charCodeAt(1) === 46 && path2.charCodeAt(2) === 47) {
      throwError(
        `Invalid path defined at: ${COL} ${yellowBright2(`"${path2}"`)}`,
        ["Paths must be relative to source"]
      );
    }
    if (cwd !== null) {
      const exists2 = (0, import_pathe4.join)(cwd, path2);
      return (ignore ? "!" : "") + (exists2.startsWith(input) ? exists2 : (0, import_pathe4.join)(input, path2));
    } else {
      return (ignore ? "!" : "") + (0, import_pathe4.join)(input, path2);
    }
  };
}
var basePath = (cwd) => (path2) => {
  if (path2.indexOf("*") !== -1) {
    throwError(
      `Base directory path cannot contain glob${COL} ${yellowBright2(`"${path2}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
  if (path2.charCodeAt(0) === 46) {
    if (path2.length === 1) return cwd + "/";
    if (path2.charCodeAt(1) === 47) {
      path2 = path2.slice(1);
    } else {
      throwError(
        `Directory path is invalid at${COL} ${yellowBright2(`"${path2}"`)}`,
        ["Ensure that path you are resolving is correctly formed"]
      );
    }
  }
  if (path2.charCodeAt(0) === 47) {
    if (path2.length === 1) {
      return cwd + "/";
    } else {
      path2 = path2.slice(1);
    }
  }
  if (/^[a-zA-Z0-9_-]+/.test(path2)) {
    path2 = (0, import_pathe4.join)(cwd, path2);
    return last(path2).charCodeAt(0) === 47 ? path2 : path2 + "/";
  } else {
    throwError(
      `Directory path is invalid at${COL} ${yellowBright2(`"${path2}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
};

// syncify/process/context.ts
function svg(file) {
  const config = $.svg.filter((context) => {
    if (context.input.has(file.input)) return true;
    if (!context.match(file.input)) return false;
    context.input.add(file.input);
    return true;
  });
  if (isUndefined(config)) return file;
  defineProperty(file, "data", { get() {
    return config;
  } });
  return file;
}
function style(file) {
  const config = $.style.find((x) => x.watch(file.input));
  if (isUndefined(config)) {
    file.type = 14 /* Asset */;
    return file;
  }
  defineProperty(file, "data", { get() {
    return config;
  } });
  if (config.snippet) {
    file.namespace = "snippets";
    file.key = (0, import_pathe5.join)("snippets", config.rename);
  } else {
    file.key = (0, import_pathe5.join)("assets", config.rename);
  }
  if (file.output) {
    if (file.data.rename !== (0, import_pathe5.basename)(file.output)) {
      if (config.snippet) {
        file.output = (0, import_pathe5.join)($.dirs.output, file.key);
      } else {
        file.output = (0, import_pathe5.join)(parentPath(file.output), file.data.rename);
      }
    }
  } else {
    file.output = (0, import_pathe5.join)($.dirs.output, file.key);
  }
  return file;
}
function script(file) {
  const config = $.script.filter((config2) => config2.watch.has(file.input));
  if (config.length === 0) return file;
  defineProperty(file, "data", { get() {
    return config;
  } });
  return file;
}
function schema(fn, file) {
  defineProperty(file, "data", { get() {
    return fn;
  } });
  return file;
}
function section(file) {
  if ($.section.prefixDir) {
    if (file.base.endsWith("-group.json")) return file;
    if (isRegex($.section.global) && $.section.global.test(file.input)) return file;
    const last2 = lastPath(file.input);
    if ($.section.baseDir.has(last2)) return file;
    const rename = lastPath(file.input) + $.section.separator + file.base;
    file.name = rename;
    file.key = (0, import_pathe5.join)(file.namespace, rename);
    file.output = (0, import_pathe5.join)((0, import_pathe5.dirname)(file.output), rename);
  }
  return file;
}
function snippet(file) {
  if ($.snippet.prefixDir) {
    if (isRegex($.snippet.global) && $.snippet.global.test(file.input)) return file;
    const last2 = lastPath(file.input);
    if ($.snippet.baseDir.has(last2)) return file;
    const rename = last2 + $.snippet.separator + file.base;
    file.name = rename;
    file.key = (0, import_pathe5.join)(file.namespace, rename);
    file.output = (0, import_pathe5.join)((0, import_pathe5.dirname)(file.output), rename);
  }
  return file;
}

// syncify/process/files.ts
function getFileKind(ext) {
  switch (ext) {
    case ".liquid":
      return "Liquid" /* Liquid */;
    case ".json":
      return "JSON" /* JSON */;
    case ".html":
      return "HTML" /* HTML */;
    case ".md":
      return "Markdown" /* Markdown */;
    case ".js":
    case ".mjs":
      return "JavaScript" /* JavaScript */;
    case ".jsx":
      return "JSX" /* JSX */;
    case ".ts":
      return "TypeScript" /* TypeScript */;
    case ".tsx":
      return "TSX" /* TSX */;
    case ".svg":
      return "SVG" /* SVG */;
    case ".css":
      return "CSS" /* CSS */;
    case ".scss":
      return "SCSS" /* SCSS */;
    case ".sass":
      return "SASS" /* SASS */;
    case ".mov":
    case ".mp4":
    case ".webm":
    case ".ogg":
      return "Video" /* Video */;
    case ".ico":
    case ".jpg":
    case ".png":
    case ".gif":
    case ".pjpg":
    case ".webp":
      return "Image" /* Image */;
    case ".eot":
    case ".ttf":
    case ".woff":
    case ".woff2":
      return "Font" /* Font */;
    case ".pdf":
      return "PDF" /* PDF */;
    case ".yaml":
    case ".yml":
      return "YAML" /* Yaml */;
  }
  return "Unknown" /* Unknown */;
}
function renameFile({ name, dir, ext, namespace }, rename) {
  let newName = rename;
  if (/\[dir\]/.test(newName)) newName = newName.replace(/\[dir\]/g, dir);
  if (/\[name\]/.test(newName)) newName = newName.replace(/\[name\]/g, name);
  if (/\[file\]/.test(newName)) newName = newName.replace(/\[file\]/g, name);
  if (/\[ext\]/.test(newName)) newName = newName.replace(/\[ext\]/g, ext);
  if (namespace === "snippets" && rename.endsWith(".liquid") === false) return newName + ".liquid";
  if (!rename.endsWith(".[ext]") || !rename.endsWith(ext)) {
    return /\.[a-z]+$/.test(rename) ? newName : newName + ext;
  }
  return newName;
}
function setFile(file, input, output) {
  file.size = NaN;
  return function(namespace, type2, kind) {
    let key;
    if (type2 === 15 /* Metafield */ || type2 === 16 /* Page */) {
      key = (0, import_pathe6.join)(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = (0, import_pathe6.join)(namespace, file.base);
      output = (0, import_pathe6.join)(output, key);
    }
    if (kind === -1) input = $.cache.paths[input];
    file.uuid = uuid();
    file.type = type2;
    file.key = key;
    file.namespace = namespace;
    file.kind = kind;
    file.input = input;
    file.output = output;
    file.relative = (0, import_pathe6.relative)($.cwd, input);
    return file;
  };
}
function setImportFile(parsedFile, output) {
  const file = parsedFile;
  return (key, namespace) => {
    return assign({}, file, {
      uuid: uuid(),
      key,
      namespace,
      output,
      kind: getFileKind(file.ext),
      relative: (0, import_pathe6.relative)($.cwd, output)
    });
  };
}
function parseFileQuick(path2) {
  return parseFile($.paths, $.dirs.output)(path2);
}
function parseFile(paths2, output) {
  return function fn(path2) {
    const file = new File((0, import_pathe6.parse)(path2));
    const define2 = setFile(file, path2, output);
    if (file.ext === ".liquid") {
      if (paths2.sections.match(path2)) {
        return section(define2("sections" /* Sections */, 4 /* Section */, "Liquid" /* Liquid */));
      } else if (paths2.snippets.match(path2)) {
        return snippet(define2("snippets" /* Snippets */, 3 /* Snippet */, "Liquid" /* Liquid */));
      } else if (paths2.layout.match(path2)) {
        return define2("layout" /* Layout */, 2 /* Layout */, "Liquid" /* Liquid */);
      } else if (paths2.templates.match(path2)) {
        return define2("templates" /* Templates */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.customers.match(path2)) {
        return define2("templates/customers" /* Customers */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.metaobject.match(path2)) {
        return define2("templates/metaobject" /* Metaobject */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.transforms.get(path2) === 9 /* Style */) {
        return style(define2("snippets" /* Snippets */, 9 /* Style */, "CSS" /* CSS */));
      }
    } else if (file.ext === ".schema" && paths2.schema.match(path2)) {
      return schema(fn, define2("schema" /* Schema */, 5 /* Schema */, "JSON" /* JSON */));
    } else if (file.ext === ".json") {
      if (paths2.metafields.match(path2)) {
        return define2("metafields" /* Metafields */, 15 /* Metafield */, "JSON" /* JSON */);
      } else if (paths2.sections.match(path2)) {
        return section(define2("sections" /* Sections */, 4 /* Section */, "JSON" /* JSON */));
      } else if (paths2.templates.match(path2)) {
        return define2("templates" /* Templates */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.config.match(path2)) {
        return define2("config" /* Config */, 7 /* Config */, "JSON" /* JSON */);
      } else if (paths2.locales.match(path2)) {
        return define2("locales" /* Locales */, 8 /* Locale */, "JSON" /* JSON */);
      } else if (paths2.customers.match(path2)) {
        return define2("templates/customers" /* Customers */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.metaobject.match(path2)) {
        return define2("templates/metaobject" /* Metaobject */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.schema.match(path2)) {
        return schema(fn, define2("schema" /* Schema */, 5 /* Schema */, "JSON" /* JSON */));
      }
    }
    switch (file.ext) {
      case ".js":
      case ".mjs":
        return script(define2("assets" /* Assets */, 10 /* Script */, "JavaScript" /* JavaScript */));
      case ".ts":
        return script(define2("assets" /* Assets */, 10 /* Script */, "TypeScript" /* TypeScript */));
      case ".tsx":
        return script(define2("assets" /* Assets */, 10 /* Script */, "TSX" /* TSX */));
      case ".jsx":
        return script(define2("assets" /* Assets */, 10 /* Script */, "JSX" /* JSX */));
      case ".svg":
        return svg(define2("assets" /* Assets */, 11 /* Svg */, "SVG" /* SVG */));
      case ".css":
        return style(define2("assets" /* Assets */, 9 /* Style */, "CSS" /* CSS */));
      case ".scss":
        return style(define2("assets" /* Assets */, 9 /* Style */, "SCSS" /* SCSS */));
      case ".sass":
        return style(define2("assets" /* Assets */, 9 /* Style */, "SASS" /* SASS */));
      case ".md":
        return define2("pages" /* Pages */, 16 /* Page */, "Markdown" /* Markdown */);
      case ".html":
        return define2("pages" /* Pages */, 16 /* Page */, "HTML" /* HTML */);
    }
    if (paths2.assets.match(path2)) {
      if ($.spawn.invoked) return define2("assets" /* Assets */, 17 /* Spawn */);
      switch (file.ext) {
        case ".json":
          return define2("assets" /* Assets */, 14 /* Asset */, "JSON" /* JSON */);
        case ".svg":
          return define2("assets" /* Assets */, 14 /* Asset */, "SVG" /* SVG */);
        case ".css":
          return define2("assets" /* Assets */, 14 /* Asset */, "CSS" /* CSS */);
        case ".ico":
        case ".jpg":
        case ".png":
        case ".gif":
        case ".webp":
        case ".pjpg":
          return define2("assets" /* Assets */, 14 /* Asset */, "Image" /* Image */);
        case ".mov":
        case ".mp4":
        case ".webm":
        case ".ogg":
          return define2("assets" /* Assets */, 14 /* Asset */, "Video" /* Video */);
        case ".pdf":
          return define2("assets" /* Assets */, 14 /* Asset */, "PDF" /* PDF */);
        case ".eot":
        case ".ttf":
        case ".woff":
        case ".woff2":
          return define2("assets" /* Assets */, 14 /* Asset */, "Font" /* Font */);
      }
    }
    return void 0;
  };
}
function importFile(key, outputPath) {
  const path2 = (0, import_pathe6.join)(outputPath, key);
  const file = new File((0, import_pathe6.parse)(path2));
  const define2 = setImportFile(file, path2);
  if (key.startsWith("sections/")) {
    return define2(key, "sections" /* Sections */);
  } else if (key.startsWith("snippets/")) {
    return define2(key, "snippets" /* Snippets */);
  } else if (key.startsWith("layout/")) {
    return define2(key, "layout" /* Layout */);
  } else if (key.startsWith("customers/", 10)) {
    return define2(key, "templates/customers" /* Customers */);
  } else if (key.startsWith("metaobject/", 10)) {
    return define2(key, "templates/metaobject" /* Metaobject */);
  } else if (key.startsWith("templates/")) {
    return define2(key, "templates" /* Templates */);
  } else if (key.startsWith("config/")) {
    return define2(key, "config" /* Config */);
  } else if (key.startsWith("locales/")) {
    return define2(key, "locales" /* Locales */);
  } else if (key.startsWith("assets/")) {
    return define2(key, "assets" /* Assets */);
  }
}
var outputFile = (output) => (path2) => {
  const file = new File((0, import_pathe6.parse)(path2));
  const merge2 = setFile(file, path2, output);
  switch ((0, import_pathe6.basename)(file.dir)) {
    case "sections":
      return merge2("sections" /* Sections */, 4 /* Section */, -1);
    case "snippets":
      return merge2("snippets" /* Snippets */, 3 /* Snippet */, -1);
    case "layout":
      return merge2("layout" /* Layout */, 2 /* Layout */);
    case "templates":
      return merge2("templates" /* Templates */, 1 /* Template */, -1);
    case "customers":
      return merge2("templates/customers" /* Customers */, 1 /* Template */, -1);
    case "metaobject":
      return merge2("templates/metaobject" /* Metaobject */, 1 /* Template */, -1);
    case "config":
      return merge2("config" /* Config */, 7 /* Config */, -1);
    case "locales":
      return merge2("locales" /* Locales */, 8 /* Locale */, -1);
    case "assets":
      return merge2("assets" /* Assets */, 14 /* Asset */, -1);
  }
};

// syncify/utils/sizes.ts
init_cjs_shims();
var import_node_zlib = __toESM(require("zlib"));
var UNITS = [
  "b",
  "kb",
  "mb",
  "gb",
  "tb"
];
function stringSize(value) {
  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}
function byteSize(string) {
  return isString(string) ? toBuffer(string).toString().length : string.toString().length;
}
function byteConvert(bytes) {
  if (bytes === 0) return `${bold2("0")}b`;
  const size2 = parseInt(String(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    )
  ), 10);
  return size2 === 0 ? `${bold2(`${bytes}`)}${UNITS[size2]}` : `${bold2((bytes / 1024 ** size2).toFixed(1))}${UNITS[size2]}`;
}
function sizeDiff(content, beforeSize) {
  const size2 = byteSize(content);
  return {
    isSmaller: size2 > beforeSize || size2 === beforeSize,
    gzip: byteConvert(import_node_zlib.default.gzipSync(content).length),
    before: byteConvert(beforeSize),
    after: byteConvert(size2),
    saved: byteConvert(beforeSize - size2)
  };
}

// syncify/plugins/hooks.ts
init_cjs_shims();
async function onAsset(file, input, update2, request2) {
  if (isUndefined(update2) || update2 === false) {
    return request2("put", file, input);
  } else if (isString(update2)) {
    return request2("put", file, update2);
  } else if (isBuffer(update2)) {
    return request2("put", file, update2.toString());
  } else {
    return request2("put", file, input);
  }
}

// syncify/hot/inject.ts
init_cjs_shims();
var import_fs_extra2 = require("fs-extra");
var import_pathe7 = require("pathe");
var EXP = /{%-?\s*render\s+['"]hot\.js['"]/;
async function injectSnippet() {
  const key = "snippets/hot.js.liquid";
  const [theme3] = $.sync.themes;
  const snippet2 = await (0, import_fs_extra2.readFile)($.hot.snippet);
  const upload4 = await upload2(snippet2.toString(), { theme: theme3, key });
  log_update_default(Line(gray2(` ${TLD} ${neonCyan(key)} uploaded snippet injection`)));
  return upload4;
}
function hasSnippet(content) {
  return EXP.test(content);
}
function inject(content) {
  if (!hasSnippet(content)) return writeRender(content);
}
function removeRender(content) {
  const render = content.search(EXP);
  if (render > -1) {
    const start = content.slice(0, render);
    const slice = content.slice(content.indexOf("%}") + 2);
    return start + slice;
  }
  return content;
}
function writeRender(content) {
  const ender = content.indexOf("<head>") + 6;
  const start = content.slice(0, ender);
  return start + "\n" + $.hot.renderer + "\n" + content.slice(ender);
}
async function ejectRender(path2) {
  const exists2 = await (0, import_fs_extra2.pathExists)(path2);
  if (!exists2) return null;
  const local = await (0, import_fs_extra2.readFile)(path2);
  let content = local.toString();
  const [theme3] = $.sync.themes;
  const name = (0, import_pathe7.basename)(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme3);
  if (isString(string)) {
    if (EXP.test(string)) {
      content = removeRender(content);
      const removed = await upload2(content, { theme: theme3, key });
      return removed;
    }
    return true;
  } else {
  }
}
async function injectRender(path2) {
  const exists2 = await (0, import_fs_extra2.pathExists)(path2);
  if (!exists2) return null;
  const local = await (0, import_fs_extra2.readFile)(path2);
  let content = local.toString();
  if (!EXP.test(content)) {
    content = writeRender(content);
    await (0, import_fs_extra2.writeFile)(path2, content);
    log_update_default(Line(gray2(` ${TLD} injected render tag in output layout`)));
  }
  const [theme3] = $.sync.themes;
  const name = (0, import_pathe7.basename)(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme3);
  if (isString(string)) {
    if (EXP.test(string)) content = removeRender(content);
    const upload4 = await upload2(content, { theme: theme3, key });
    if (upload4) {
      log_update_default(Line(gray2(` ${TLD} uploaded and inject render tag`)));
      return true;
    }
    return false;
  } else {
  }
}

// syncify/modes/upload.ts
function getModel(size2) {
  if (size2 === 0) {
    throwError("Empty output directory", [
      `There are no files within ${neonCyan((0, import_pathe8.relative)($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme3 of $.sync.themes) {
    if (theme3.target.length > width) width = theme3.target.length;
    const key = `${theme3.store}:${theme3.target}`;
    if (!sync4.has(key)) {
      sync4.set(key, {
        active: sync4.size === 0,
        log: null,
        size: size2,
        processed: "",
        failed: 0,
        success: 0,
        retry: 0,
        progress: progress(size2),
        get theme() {
          return theme3;
        },
        errors: {
          remote: /* @__PURE__ */ new Map(),
          retry: /* @__PURE__ */ new Set()
        }
      });
    }
  }
  return sync4;
}
async function upload3(cb) {
  group("Upload");
  spinner("Preparing", { style: "spinning" });
  timer.start("upload");
  const request2 = client($.sync);
  const hashook = isFunction(cb);
  const parse5 = outputFile($.dirs.output);
  const files = import_fast_glob.default.sync(`${$.dirs.output}/**`).sort();
  const sync4 = getModel(files.length);
  let interval = null;
  await delay(500);
  function logger(message) {
    const record = message.toRaw();
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    log_update_default(message.toString());
    interval = setInterval(() => {
      record[3] = Line(
        gray2(
          Prefix(
            "Elapsed",
            whiteBright2.bold(timer.now("upload"))
          )
        )
      ) + "\n";
      log_update_default(glue(record));
    }, 100);
  }
  function callback(item) {
    spinner.stop();
    const { file, theme: theme3 } = item;
    const key = `${theme3.store}:${theme3.target}`;
    const record = sync4.get(key);
    const message = Create().NL.Line(toUpcase(file.namespace), bold2.whiteBright).NL.Line(Prefix("Elapsed", whiteBright2.bold(timer.now("upload"))), gray2).Line(Prefix("Duration", whiteBright2(timer.stop(file.uuid))), gray2).Line(Prefix("Size", whiteBright2(stringSize(file.size))), gray2).Newline();
    if (item.status === 0 /* Success */) {
      if (record.errors.retry.has(file.input)) {
        record.retry -= 1;
        record.errors.retry.delete(file.input);
      }
      record.success += 1;
      record.progress.increment(1);
      record.processed = neonCyan(file.key);
    } else if (item.status === 1 /* Retry */) {
      if (!record.errors.retry.has(file.input)) {
        record.retry += 1;
        record.errors.retry.add(file.input);
      }
      record.processed = orange(file.key);
    } else if (item.status === 2 /* Failed */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      if (!record.errors.remote.has(file.output)) {
        record.failed += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);
        record.processed = redBright2(file.key);
      }
    }
    for (const [id, { success, size: size2, failed, retry, progress: progress2, processed }] of sync4) {
      const [store, target] = id.split(":");
      const uploaded = `${bold2(`${success}`)} ${white2("of")} ${bold2(`${size2}`)}`;
      const retrying2 = bold2(`${retry}`);
      const failures = bold2(`${failed}`);
      message.Line(`${bold2(target.toUpperCase())}  ${ARR}  ${store}`, whiteBright2).NL.Line(processed).NL.Line(Prefix("uploaded", uploaded), whiteBright2).Line(Prefix("retrying", retrying2), retry > 0 ? orange : whiteBright2).Line(Prefix("failures", failures), failed > 0 ? redBright2 : whiteBright2).NL.Insert(progress2.render()).Newline();
    }
    logger(message);
  }
  event.on("upload", callback);
  await delay(500);
  for (const path2 of files) {
    const file = parse5(path2);
    let input;
    try {
      const read = await (0, import_fs_extra3.readFile)(file.output);
      input = read.toString();
      if (file.namespace === "layout") {
        if (hasSnippet(input)) {
          input = removeRender(input);
        }
      }
      file.size = byteSize(input);
      if (!hashook) {
        await request2.assets("put", file, input);
      } else {
        const update2 = cb.apply({ ...file }, input);
        await onAsset(file, input, update2, request2.assets);
      }
    } catch (e) {
      write("Error reading output file", {
        file: file.key,
        source: file.relative
      })(e);
    }
  }
  await queue.onIdle();
  clearInterval(interval);
  log_update_default.clear();
  group("Errors");
  let hasErrors = false;
  for (const {
    errors,
    theme: theme3,
    failed,
    success,
    size: size2
  } of sync4.values()) {
    if (errors.remote.size > 0) {
      const name = bold2(`${theme3.target.toUpperCase()} THEME`);
      const failures = bold2(`${failed}`);
      const uploaded = `${bold2(`${success}`)} ${white2("of")} ${bold2(`${size2}`)}`;
      log(
        Create().Line(`${name}  ${ARR}  ${theme3.store}`).NL.Line(Prefix("uploaded", uploaded), neonGreen).Line(Prefix("failures", failures), redBright2).NL.toString()
      );
      let number = 1;
      for (const record of errors.remote.values()) {
        const errno = `${(number < 10 ? "0" : "") + number++}`;
        nwl();
        write2(redBright2.bold(`ERROR ${errno}`));
        request(record.file.input, record.error);
      }
      hline();
      hasErrors = true;
    }
  }
  await delay(500);
  if (!hasErrors) {
    log(Break(gray2("No errors!")));
  }
  log_update_default(Break("Uploaded Completed"));
  process.exit(0);
}

// syncify/modes/build.ts
init_cjs_shims();
var import_anymatch = __toESM(require_anymatch());
var import_fast_glob2 = __toESM(require("fast-glob"));

// syncify/transform/asset.ts
init_cjs_shims();
var import_fs_extra4 = require("fs-extra");
var import_pathe9 = require("pathe");
function passthrough(file, sync4) {
  const { type: type2, relative: relative15, kind, key, output } = file;
  return async (data) => {
    if (type2 !== 17 /* Spawn */) {
      if ($.mode.watch) {
        $.watch.unwatch(output);
      }
      await (0, import_fs_extra4.writeFile)(output, data).catch(
        write("Error writing asset to output directory", {
          file: relative15,
          source: relative15
        })
      );
    }
    ;
    if ($.mode.hot) {
      syncing(key, { hot: true });
      if (kind === "JavaScript" /* JavaScript */) {
        $.wss.script(file.uuid, (0, import_pathe9.basename)(key));
      } else if (kind === "CSS" /* CSS */) {
        $.wss.stylesheet(file.uuid, (0, import_pathe9.basename)(key));
      }
    }
    if ($.env.sync !== 0 && $.mode.build === false) {
      await sync4("put", file, data);
    }
  };
}
async function compile(file, sync4, cb) {
  const copy2 = passthrough(file, sync4);
  const data = await (0, import_fs_extra4.readFile)(file.input).catch(
    write("Error reading asset file", {
      file: file.relative,
      source: file.relative
    })
  );
  if (data) {
    const value = data.toString();
    if (isEmptyString(value)) {
      if ($.mode.watch) skipped(file, "empty file");
      return null;
    }
    if (!isFunction(cb)) return copy2(value);
    const update2 = cb.apply({ ...file }, value);
    if (isUndefined(update2) || update2 === false) {
      return copy2(value);
    } else if (isType(update2)) {
      return copy2(update2);
    } else if (isBuffer(update2)) {
      return copy2(update2.toString());
    }
    await copy2(value);
  }
  return null;
}

// syncify/transform/liquid.ts
init_cjs_shims();
var import_html_minifier_terser = require("html-minifier-terser");
var import_pathe11 = require("pathe");
var import_fs_extra7 = require("fs-extra");

// syncify/transform/schema.ts
init_cjs_shims();
var import_fs_extra5 = require("fs-extra");

// node_modules/.pnpm/parse-json@8.1.0/node_modules/parse-json/index.js
init_cjs_shims();
var import_code_frame = __toESM(require_lib3(), 1);

// node_modules/.pnpm/index-to-position@0.1.2/node_modules/index-to-position/index.js
init_cjs_shims();
var safeLastIndexOf = (string, searchString, index) => index < 0 ? -1 : string.lastIndexOf(searchString, index);
function getPosition(text, textIndex) {
  const lineBreakBefore = safeLastIndexOf(text, "\n", textIndex - 1);
  const column = textIndex - lineBreakBefore - 1;
  let line = 0;
  for (let index = lineBreakBefore; index >= 0; index = safeLastIndexOf(text, "\n", index - 1)) {
    line++;
  }
  return { line, column };
}
function indexToLineColumn(text, textIndex, { oneBased = false } = {}) {
  if (textIndex < 0 || textIndex >= text.length && text.length > 0) {
    throw new RangeError("Index out of bounds");
  }
  const position = getPosition(text, textIndex);
  return oneBased ? { line: position.line + 1, column: position.column + 1 } : position;
}

// node_modules/.pnpm/parse-json@8.1.0/node_modules/parse-json/index.js
var getCodePoint = (character) => `\\u{${character.codePointAt(0).toString(16)}}`;
var JSONError = class _JSONError extends Error {
  name = "JSONError";
  fileName;
  codeFrame;
  rawCodeFrame;
  #message;
  constructor(message) {
    super();
    this.#message = message;
    Error.captureStackTrace?.(this, _JSONError);
  }
  get message() {
    const { fileName, codeFrame } = this;
    return `${this.#message}${fileName ? ` in ${fileName}` : ""}${codeFrame ? `

${codeFrame}
` : ""}`;
  }
  set message(message) {
    this.#message = message;
  }
};
var generateCodeFrame = (string, location, highlightCode = true) => (0, import_code_frame.codeFrameColumns)(string, { start: location }, { highlightCode });
var getErrorLocation = (string, message) => {
  const match2 = message.match(/in JSON at position (?<index>\d+)(?: \(line (?<line>\d+) column (?<column>\d+)\))?$/);
  if (!match2) {
    return;
  }
  let { index, line, column } = match2.groups;
  if (line && column) {
    return { line: Number(line), column: Number(column) };
  }
  index = Number(index);
  if (index === string.length) {
    const { line: line2, column: column2 } = indexToLineColumn(string, string.length - 1, { oneBased: true });
    return { line: line2, column: column2 + 1 };
  }
  return indexToLineColumn(string, index, { oneBased: true });
};
var addCodePointToUnexpectedToken = (message) => message.replace(
  // TODO[engine:node@>=20]: The token always quoted after Node.js 20
  /(?<=^Unexpected token )(?<quote>')?(.)\k<quote>/,
  (_, _quote, token) => `"${token}"(${getCodePoint(token)})`
);
function parseJson(string, reviver, fileName) {
  if (typeof reviver === "string") {
    fileName = reviver;
    reviver = void 0;
  }
  let message;
  try {
    return JSON.parse(string, reviver);
  } catch (error3) {
    message = error3.message;
  }
  let location;
  if (string) {
    location = getErrorLocation(string, message);
    message = addCodePointToUnexpectedToken(message);
  } else {
    message += " while parsing empty string";
  }
  const jsonError = new JSONError(message);
  jsonError.fileName = fileName;
  if (location) {
    jsonError.codeFrame = generateCodeFrame(string, location);
    jsonError.rawCodeFrame = generateCodeFrame(
      string,
      location,
      /* highlightCode */
      false
    );
  }
  throw jsonError;
}

// syncify/log/warnings.ts
init_cjs_shims();
function getStack(processor2, uri) {
  if ($.warnings.has(uri)) {
    const file = $.warnings.get(uri);
    if (file.has(processor2)) {
      return file.get(processor2);
    }
    return file.set(processor2, /* @__PURE__ */ new Set()).get(processor2);
  }
  return $.warnings.set(uri, /* @__PURE__ */ new Map([[processor2, /* @__PURE__ */ new Set()]])).get(uri).get(processor2);
}
function schema2(file, options) {
  const stack = getStack("Shared Schema", file.input);
  const output = Create({ type: "warning" }).NL.Wrap(options.message, yellowBright2).NL.Context({
    stack: false,
    type: "warning",
    entries: {
      reference: options.$ref,
      schema: options.schema,
      section: file.relative,
      shared: options.shared
    }
  });
  stack.add(output.toString());
}
var sass2 = (file) => (message, options) => {
  const stack = getStack("sass", file.input);
  const output = Create({ type: "warning" }).NL.Wrap(message, yellowBright2);
  if (has2("span", options)) {
    if (isUndefined(options.span)) return;
    const { span } = options;
    const code = has2("context", span) ? span.context : span.text;
    const content = code.slice(span.start.offset, span.end.offset);
    const lines = content.split("\n");
    if (lines.length < 15) {
      const space = sanitize(span.end.line).length;
      let from = span.start.line + 1;
      for (const line of lines) {
        const number = sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        output.Trim(`   ${align + blue2(number)} ${Tree.trim} ${line}`);
      }
    }
  }
  const context = output.NL.Wrap(options.stack, yellowBright2).NL.Context({
    stack: false,
    entries: {
      source: file.relative,
      deprecated: options.deprecation ? "Yes" : "No"
    }
  }).toString();
  if (!stack.has(context)) stack.add(context);
  if (!$.mode.build) {
    log(
      LineYellow(
        yellowBright2(
          Prefix(
            "warning",
            glueString(sanitize(stack.size), plural("warning", stack.size))
          ) + Suffix.warning
        )
      )
    );
  }
};
function esbuild2(data) {
}
function postcss2(file, data) {
  const stack = getStack("postcss", file.input);
  const output = glue(
    Sample(
      data.node.toString(),
      {
        line: "yellow",
        span: isNumber(data.endLine) ? {
          start: data.line,
          end: data.endLine
        } : {
          start: data.line,
          end: data.endLine
        }
      }
    ),
    Context(
      {
        stack: false,
        entries: {
          column: data.column,
          file: file.relative,
          plugin: data.plugin
        }
      }
    )
  );
  if (!stack.has(output)) {
    stack.add(output);
    warn(output);
  }
}

// syncify/terser/liquid.ts
init_cjs_shims();
function minifySchema(schema3) {
  if ($.liquid.terse.liquid.minifySchema === false) {
    if ($.json.useTab) {
      return JSON.stringify(schema3, null, "	".repeat($.json.indent));
    } else {
      return JSON.stringify(schema3, null, $.json.indent);
    }
  }
  return JSON.stringify(schema3, null, 0);
}

// syncify/transform/schema.ts
async function ExtractSchema(file) {
  const read = await (0, import_fs_extra5.readFile)(file.input);
  const content = read.toString();
  const open = content.search(/{%-?\s*schema/);
  if (open < 0) return [content, null, null];
  const begin = content.indexOf("%}", open + 2) + 2;
  const start = content.slice(begin);
  const ender = begin + start.search(/{%-?\s*endschema/);
  if (ender < 0) {
    error2("Missing {% endschema %} tag in file.", {
      suffix: file.relative,
      notify: {
        title: "Invalid Syntax",
        message: "Missing {% endschema %} tag in file."
      }
    });
    return null;
  }
  try {
    const schema3 = parseJson(content.slice(begin, ender));
    return [
      content.slice(0, begin),
      schema3,
      content.slice(ender)
    ];
  } catch (e) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base} in ExtractSchema`
      }
    });
    if (e instanceof JSONError) {
      json(e, file);
    }
    return null;
  }
}
function InjectSettings(file, schema3) {
  const settings = [];
  for (let i = 0, s = schema3.length; i < s; i++) {
    if (!has2("$ref", schema3[i])) {
      settings.push(schema3[i]);
      continue;
    }
    const [key, prop] = schema3[i].$ref.split(".");
    if ($.section.shared.has(key)) {
      const shared = $.section.shared.get(key);
      if (has2(prop, shared.schema)) {
        if (isArray2(shared.schema[prop])) {
          settings.push(...shared.schema[prop]);
        } else if (isObject(shared.schema[prop])) {
          if (has2("settings", shared.schema[prop])) {
            settings.push(...shared.schema[prop].settings);
          } else {
            settings.push(shared.schema[prop]);
          }
        }
      } else {
        if ($.mode.build) {
          schema2(file, {
            shared: shared.uri,
            $ref: schema3[i].$ref,
            schema: "settings",
            message: [
              `An unknown Shared Schema reference key of ${bold2(schema3[i].$ref)} was provided.`,
              `There is no such key ${bold2(prop)} within the shared schema.`
            ]
          });
        } else {
          warn2(`undefined $ref ${bold2(prop)} in ${bold2(key)} `, file.base);
        }
      }
    } else {
      if ($.mode.build) {
        schema2(file, {
          shared: prop,
          $ref: schema3[i].$ref,
          schema: "settings",
          message: [
            `An unknown Shared Schema file reference ${bold2(schema3[i].$ref)} was provided`,
            `to ${bold2("settings")} within section file ${bold2(file.base)}. There is no known shared`,
            "schema file using that name."
          ]
        });
      } else {
        warn2(`unknown $ref ${bold2(schema3[i].$ref)} `, file.base);
      }
    }
  }
  return settings;
}
function InjectBlocks(file, schema3) {
  const blocks = [];
  for (let i = 0, s = schema3.length; i < s; i++) {
    if (has2("$ref", schema3[i])) {
      const [key, prop] = schema3[i].$ref.split(".");
      if ($.section.shared.has(key)) {
        const shared = $.section.shared.get(key);
        if (has2(prop, shared.schema)) {
          if (isArray2(shared.schema[prop])) {
            blocks.push(...shared.schema[prop]);
          } else {
            blocks.push(shared.schema[prop]);
          }
        } else {
          if ($.mode.build) {
            schema2(file, {
              shared: prop,
              $ref: schema3[i].$ref,
              schema: "blocks",
              message: [
                `An unknown Shared Schema key reference of ${bold2(schema3[i].$ref)} was provided`,
                `to the ${bold2("blocks")} within section file ${bold2(file.base)}. The shared schema`,
                `file exists, but the key ${bold2(prop)} does not.`
              ]
            });
          } else {
            warn2(`undefined $ref ${bold2(prop)} in ${bold2(key)} `, file.base);
          }
        }
      } else {
        if ($.mode.build) {
          schema2(file, {
            shared: prop,
            $ref: schema3[i].$ref,
            schema: "blocks",
            message: [
              `An unknown Shared Schema file reference ${bold2(schema3[i].$ref)} was provided`,
              `to ${bold2("blocks")} within section file ${bold2(file.base)}. There is no known shared`,
              "schema file using that name."
            ]
          });
        } else {
          warn2(`unknown $ref ${bold2(schema3[i].$ref)} `, file.base);
        }
      }
    } else {
      const block = {};
      for (const prop in schema3[i]) {
        if (prop !== "settings") block[prop] = schema3[i][prop];
      }
      if (block.type === "@app") {
        blocks.push(block);
        continue;
      }
      block.settings = [];
      if (has2("settings", schema3[i])) {
        for (const setting of schema3[i].settings) {
          if (has2("$ref", setting)) {
            const [key, prop] = setting.$ref.split(".");
            if ($.section.shared.has(key)) {
              const shared = $.section.shared.get(key);
              if (has2(prop, shared.schema)) {
                if (isArray2(shared.schema[prop])) {
                  block.settings.push(...shared.schema[prop]);
                } else if (isObject(shared.schema[prop])) {
                  if (has2("settings", shared.schema[prop])) {
                    block.settings.push(...shared.schema[prop].settings);
                  } else {
                    block.settings.push(shared.schema[prop]);
                  }
                }
              } else {
                if ($.mode.build) {
                  schema2(file, {
                    shared: prop,
                    $ref: schema3[i].$ref,
                    schema: `blocks ${ARR} settings`,
                    message: [
                      `An unknown Shared Schema key reference of ${bold2(schema3[i].$ref)} was provided`,
                      `to the ${bold2("blocks")} schema id ${bold2(setting.id)} within section file`,
                      `${bold2(file.base)}. The shared schema file exists, but the key ${bold2(prop)} does not.`
                    ]
                  });
                } else {
                  warn2(`undefined $ref ${bold2(prop)} in ${bold2(key)} `, file.base);
                }
              }
            } else {
              if ($.mode.build) {
                schema2(file, {
                  shared: prop,
                  $ref: schema3[i].$ref,
                  schema: `blocks ${ARR} settings`,
                  message: [
                    `An unknown Shared Schema file reference ${bold2(schema3[i].$ref)} was provided`,
                    `to ${bold2("blocks")} schema id ${bold2(setting.id)} within section file ${bold2(file.base)}.`,
                    "There is no known shared schema file using that name."
                  ]
                });
              } else {
                warn2(`unknown $ref ${bold2(setting.$ref)} `, file.base);
              }
            }
          } else {
            block.settings.push(setting);
          }
        }
      }
      blocks.push(block);
    }
  }
  return blocks;
}
async function ParseSharedSchema(file) {
  try {
    const read = await (0, import_fs_extra5.readFile)(file.input);
    const hash = checksum(read);
    if (has2(file.input, $.cache.schema) && $.cache.checksum[file.input] === hash && $.section.shared.has(file.name)) {
      return $.section.shared.get(file.name);
    }
    ;
    $.cache.checksum[file.input] = hash;
    const data = read.toString();
    if (data.trim().length === 0) {
      warn2("empty file", "no shared schema defined");
      return null;
    }
    const schema3 = parseJson(data.toString());
    if (has2("$schema", schema3)) delete schema3.$schema;
    if (has2("$description", schema3)) delete schema3.$description;
    for (const prop in schema3) {
      if (isObject(schema3[prop])) {
        if (has2("$description", schema3[prop])) {
          delete schema3[prop].$description;
        }
      } else if (isArray2(schema3[prop])) {
        for (const setting of schema3[prop]) {
          if (has2("$description", setting)) delete setting.$description;
        }
      }
    }
    return $.section.shared.set(file.name, {
      uri: file.input,
      schema: schema3
    }).get(file.name);
  } catch (e) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base}`
      }
    });
    if (e instanceof JSONError) {
      json(e, file);
    }
    return null;
  }
}
async function CreateSection(file) {
  const read = await ExtractSchema(file);
  if (read === null) return null;
  const [before, schema3, after] = read;
  if (schema3 === null) return before;
  const schemaProp = hasProp(schema3);
  if (schemaProp("settings")) {
    schema3.settings = InjectSettings(file, schema3.settings);
  }
  if (schemaProp("blocks")) {
    schema3.blocks = InjectBlocks(file, schema3.blocks);
  }
  return glue(
    before.trimEnd(),
    "\n",
    minifySchema(schema3),
    "\n",
    after.trimStart()
  );
}
async function compile2(file, sync4, cb) {
  const shared = await ParseSharedSchema(file);
  if (shared === null) return null;
  const files = toArray($.cache.schema[shared.uri]);
  const sections = await pMap(files, (p) => {
    return defineProperty(file.data(p), "data", {
      get() {
        return $.cache.sections[p];
      }
    });
  });
  process7("Shared Schema", `${sections.length} ${plural("section", sections.length)}`);
  for (const section2 of sections) {
    const value = await CreateSection(section2);
    syncing(section2.key);
    await sync4("put", section2, value);
    if ($.mode.hot) {
      if (file.type === 4 /* Section */) {
        $.wss.section(section2.name);
      } else if (section2.type !== 10 /* Script */ && section2.type !== 9 /* Style */) {
        await queue.onIdle().then(() => $.wss.replace());
      }
    }
  }
}

// syncify/transform/style.ts
init_cjs_shims();
var import_pathe10 = require("pathe");
var import_fs_extra6 = require("fs-extra");
var import_postcss = __toESM(require("postcss"));
var sass3 = null;
var tailwind = null;
async function load2(id) {
  if (id === "sass") {
    sass3 = require("sass");
    return isNil2(sass3) === false;
  }
  if (id === "tailwind") {
    tailwind = require("tailwindcss");
    return isNil2(tailwind) === false;
  }
}
function write3(file, sync4, hook) {
  const scope = isFunction(hook) ? { ...file } : false;
  return async (data) => {
    if (isNil2(data)) return null;
    let content;
    if (scope !== false) {
      const update2 = hook.apply({ ...file }, toBuffer(data));
      if (isUndefined(update2) || update2 === false) {
        content = data;
      } else if (isString(update2) || isBuffer(update2)) {
        content = sanitize(update2);
      }
    } else {
      content = data;
    }
    $.cache.checksum[file.input] = checksum(content);
    (0, import_fs_extra6.writeFile)(file.output, content).catch(write("Error writing stylesheet to output", {
      input: file.relative,
      output: (0, import_pathe10.relative)($.cwd, file.output)
    }));
    const size2 = sizeDiff(data, file.size);
    if (size2.isSmaller) {
      if (file.kind === "SCSS" /* SCSS */ || file.kind === "SASS" /* SASS */ || file.kind === "Tailwind" /* Tailwind */) {
        transform(file.kind, bold2("CSS"), size2.before, timer.stop(file.uuid));
      } else {
        transform("CSS", size2.before, `gzip ${size2.gzip}`);
      }
    } else {
      if (file.kind === "Tailwind" /* Tailwind */) {
        minified("Tailwind" /* Tailwind */, size2.before, size2.after, size2.saved);
      } else {
        minified("CSS", size2.before, size2.after, size2.saved);
      }
    }
    if ($.mode.hot) {
      $.wss.stylesheet(file.uuid, (0, import_pathe10.basename)(file.key));
    }
    if (file.kind !== "Tailwind" /* Tailwind */) {
      syncing(file.key);
    }
    if (sync4 === null) return content;
    await sync4("put", file, content);
  };
}
async function sassProcess(file) {
  if (isUndefined(file.data) || isBoolean(file.data.sass) && file.data.sass === false) {
    return readStyleFile(file);
  }
  const options = isObject(file.data.sass) ? merge($.processor.sass.config, file.data.sass) : $.processor.sass.config;
  if (file.ext === ".scss" || file.ext === ".sass") {
    $.mode.watch && timer.start();
    try {
      const { css, sourceMap } = sass3.compile(file.data.input, {
        loadPaths: options.include,
        sourceMapIncludeSources: file.data.postcss,
        sourceMap: options.sourcemap,
        style: options.style,
        alertColor: false,
        alertAscii: false,
        quietDeps: options.quietDeps,
        charset: file.data.snippet === false,
        logger: {
          debug: (msg) => console.log("DEBUG", msg),
          warn: sass2(file)
        }
      });
      if (options.sourcemap) {
        const map = (0, import_pathe10.join)($.dirs.sourcemaps.styles, file.base + ".map");
        (0, import_fs_extra6.writeFile)(map, JSON.stringify(sourceMap)).catch(
          write("Error writing SASS Source Map file to the cache directory", {
            file: (0, import_pathe10.relative)($.cwd, map),
            source: file.relative
          })
        );
      }
      process7("SASS Dart", timer.stop());
      file.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e) {
      if ($.mode.watch) {
        timer.clear();
        error2(file.relative, {
          notify: {
            title: "SCSS Transform Error",
            message: `SASS Dart failed to process ${file.base}`
          }
        });
        sass(file, e);
      }
      return null;
    }
  }
  return readStyleFile(file);
}
async function tailwindParse(file, queue2) {
  for (const map in $.processor.tailwind.map) {
    if ($.processor.tailwind.map[map].has(file.input)) {
      const item = parseFileQuick($.style[map].input);
      if (isUndefined(item)) continue;
      timer.start(item.uuid);
      item.kind = "Tailwind" /* Tailwind */;
      const style2 = await tailwindProcess(item);
      isString(style2) && queue2.push([item, style2]);
    }
  }
  return queue2;
}
async function tailwindProcess(file) {
  if ($.mode.hot) timer.start(file.uuid);
  const output = write3(file, null, null);
  const read = await readStyleFile(file);
  const post = await postcssProcess(file, read.css, read.map);
  if (post === null) return null;
  if (file.data.snippet) {
    return output(createSnippet(post, file.data.attrs));
  } else {
    return output(post);
  }
}
async function readStyleFile(file) {
  try {
    const css = await (0, import_fs_extra6.readFile)(file.input);
    file.size = byteSize(css);
    return {
      css: css.toString(),
      map: null
    };
  } catch (e) {
    timer.clear();
    error2(file.relative, {
      notify: {
        title: "Read Error",
        message: `File ${file.base} could not be read`
      }
    });
    throws(e, {
      source: file.relative,
      transform: "style"
    });
    return null;
  }
}
async function postcssProcess(file, css, map) {
  const { data } = file;
  const isTWCSS = isBoolean(data.tailwind) === false;
  const plugins2 = isTWCSS && data.tailwind ? [tailwind(data.tailwind)].concat(data.postcss) : data.postcss;
  try {
    if ($.mode.watch && file.kind !== "Tailwind" /* Tailwind */) timer.start();
    const result = await (0, import_postcss.default)(plugins2).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? { prev: map, inline: false, absolute: true } : null
    });
    if ($.mode.watch && file.kind !== "Tailwind" /* Tailwind */) {
      process7("PostCSS", timer.stop());
    }
    const issues = result.warnings();
    if (issues.length > 0) {
      for (const warning of issues) {
        postcss2(file, warning);
      }
    }
    return result.css.toString();
  } catch (e) {
    if ($.mode.watch) {
      timer.clear();
      error2(file.relative, {
        notify: {
          title: "PostCSS Transform Error",
          message: `PostCSS failed to process ${file.base}`
        }
      });
      postcss(file, e);
    }
    return null;
  }
}
function createSnippet(string, attrs) {
  return attrs.length > 0 ? `<style ${attrs.join(" ")}>${string}</style>` : `<style>${string}</style>`;
}
async function compile3(file, sync4, cb) {
  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);
  const output = write3(file, sync4, cb);
  try {
    if (isUndefined(file.data) || isBoolean(file.data.sass) && file.data.sass === false) return readStyleFile(file);
    const out = await sassProcess(file);
    if (out === null) return null;
    if (isNil2(import_postcss.default) || isUndefined(file.data) || !file.data.postcss && !file.data.snippet) {
      return output(out.css);
    }
    if (file.data.postcss) {
      const post = await postcssProcess(file, out.css, out.map);
      if (post === null) return null;
      if (file.data.snippet) {
        return output(createSnippet(post, file.data.attrs));
      } else {
        return output(post);
      }
    }
    return file.data.snippet ? output(createSnippet(out.css, file.data.attrs)) : output(out.css);
  } catch (e) {
    console.log(e);
    return null;
  }
}

// syncify/transform/liquid.ts
var LiquidLineComments = /{%-?\s*#[\s\S]+?%}/g;
var LiquidBlockComments = /{%-?\s*comment\s*-?%}[\s\S]+?{%-?\s*endcomment\s*-?%}/g;
var LiquidTag = /{%-?\s*liquid[\s\S]+?%}/g;
var ScriptJsonWhitespace = /[^,:'"a-zA-Z0-9=] +[^'"a-zA-Z0-9=}{]/g;
function removeComments(content) {
  return $.liquid.terse.markup.removeComments ? content.replace(LiquidBlockComments, "").replace(LiquidLineComments, "") : content;
}
function minifyLiquidTag(content) {
  return content.replace(LiquidTag, (tag) => "\n" + tag.replace(/#.*?$/gm, "") + "\n");
}
function minifySchema2(file, content) {
  if (!$.liquid.terse.liquid.minifySchema) return removeComments(content);
  const open = content.search(/{%-?\s*schema/);
  if (open > -1) {
    const begin = content.indexOf("%}", open + 2) + 2;
    const start = content.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);
    if (ender > -1) {
      const parse5 = JSON.parse(content.slice(begin, ender));
      const minified2 = JSON.stringify(parse5, null, 0);
      const schema3 = content.slice(0, begin) + minified2 + content.slice(ender);
      return removeComments(schema3);
    }
    invalid(file.relative);
  }
  return removeComments(content);
}
function removeDashes(content) {
  if (!$.liquid.terse.liquid.stripTrims) return content;
  return content;
}
async function htmlMinify(file, content) {
  try {
    const htmlmin = await (0, import_html_minifier_terser.minify)(content, $.liquid.terse.markup);
    return htmlmin;
  } catch (e) {
    invalid(file.relative);
    console.error(e);
    return null;
  }
}
var transform2 = (file) => async (data) => {
  if (file.type === 2 /* Layout */ && $.mode.hot) {
    if (hasSnippet(data) === false) {
      data = inject(data);
    }
  }
  if (!$.mode.terse) {
    (0, import_fs_extra7.writeFile)(file.output, data).catch(
      write("Error writing liquid file to output", {
        input: file.relative,
        output: (0, import_pathe11.relative)($.cwd, file.output)
      })
    );
    transform(file.kind, toUpcase(file.namespace), byteConvert(file.size), timer.now());
    return data;
  }
  let htmlmin;
  if (file.base.endsWith(".js.liquid")) {
    htmlmin = data.replace(ScriptJsonWhitespace, "").replace(/(?<=[:,]) +(?=['"{[])/g, "").replace(/{{%/g, "{ {%").replace(/%}}/g, "%} }").replace(/(?<=[%}]})\s+(?=[\]}])/g, " ").replace(/>\s+(?=[{[])/, ">").replace(/(?<=[}\]])\s<\//g, "</");
  } else if (file.base.endsWith(".json.liquid")) {
    htmlmin = JSON.stringify(JSON.parse(data), null, 0);
  } else {
    const content = file.type === 4 /* Section */ ? minifySchema2(file, data) : removeComments(data);
    const htmlterser = await htmlMinify(file, content);
    htmlmin = minifyLiquidTag(htmlterser);
  }
  process7("HTML Terser", timer.now());
  if (isNil2(htmlmin)) {
    (0, import_fs_extra7.writeFile)(file.output, data).catch(
      write("Error writing liquid file to output", {
        input: file.relative,
        output: (0, import_pathe11.relative)($.cwd, file.output)
      })
    );
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, "");
  (0, import_fs_extra7.writeFile)(file.output, postmin);
  const size2 = sizeDiff(data, file.size);
  if (size2.isSmaller) {
    transform(`${file.namespace} ${size2.before} \u2192 gzip ${size2.gzip}`);
  } else {
    minified("Liquid", size2.before, size2.after, size2.saved);
  }
  return postmin;
};
async function compile4(file, sync4, cb) {
  if ($.mode.watch) timer.start();
  const read = await (0, import_fs_extra7.readFile)(file.input);
  let input = read.toString();
  if ($.mode.build) {
    if (file.namespace === "layout") {
      if (hasSnippet(input)) {
        input = removeRender(input);
      }
    }
  }
  if (file.type === 4 /* Section */) {
    const section2 = await CreateSection(file);
    if (section2 === null) return null;
    input = section2;
  }
  file.size = byteSize(input);
  const edit = transform2(file);
  let content;
  if (isFunction(cb)) {
    const update2 = cb.apply({ ...file }, input);
    if (isUndefined(update2) || update2 === false) {
      content = await edit(input);
    } else if (isString(update2)) {
      content = await edit(update2);
    } else if (isBuffer(update2)) {
      content = await edit(update2.toString());
    }
  } else {
    content = await edit(input);
  }
  $.cache.checksum[file.input] = checksum(content);
  if ($.processor.tailwind.map !== null && file.type !== 9 /* Style */) {
    const request2 = await tailwindParse(file, [[file, content]]);
    for (const req of request2) {
      await sync4("put", req[0], req[1]);
      syncing(req[0].key);
    }
  } else {
    syncing(file.key);
    await sync4("put", file, content);
  }
  if ($.mode.hot) {
    if (file.type === 4 /* Section */) {
      $.wss.section(file.name);
    } else {
      await queue.onIdle().then(() => $.wss.replace());
    }
  }
}

// syncify/transform/json.ts
init_cjs_shims();
var import_fs_extra8 = require("fs-extra");
function parse2(file, data) {
  try {
    return parseJson(data);
  } catch (e) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base}`
      }
    });
    if (e instanceof JSONError) {
      json(e, file);
    }
    return null;
  }
}
function minifyJSON(data, space = 0) {
  try {
    return JSON.stringify(data, null, space);
  } catch (e) {
    console.log(e);
    return null;
  }
}
async function jsonCompile(file, data, space = 0) {
  const minified2 = minifyJSON(data, space);
  if (isNil(minified2)) {
    if ($.mode.watch) timer.stop();
    return data;
  }
  if (space === 0) {
    const size2 = sizeDiff(minified2, file.size);
    minified("JSON", size2.before, size2.after, size2.saved);
  } else {
    transform("JSON", file.namespace, byteConvert(file.size), timer.now());
  }
  if (file.type === 15 /* Metafield */) return minified2;
  (0, import_fs_extra8.writeFile)(file.output, minified2).catch(
    write("Error writing JSON", {
      file: file.relative
    })
  );
  return minified2;
}
async function compile5(file, sync4, cb) {
  $.mode.watch && timer.start();
  const json2 = await (0, import_fs_extra8.readFile)(file.input).catch(
    write("Error reading JSON file", {
      file: file.relative
    })
  );
  if (isBuffer(json2)) {
    const read = json2.toString();
    file.size = byteSize(read);
    if (read.trim().length === 0) {
      skipped(file, "empty file");
      return null;
    }
    if (file.type === 7 /* Config */ && file.name === "settings_data") {
      for (const theme3 of $.sync.themes) {
        const settings_data = await find("config/settings_data.json", theme3);
        if (settings_data) {
        }
      }
    }
    const data = parse2(file, read);
    if (data === null) return null;
    if (isEmpty2(data)) {
      skipped(file, "empty file");
      return null;
    }
    let space = $.json.indent;
    if ($.json.terse.enabled) {
      switch (file.type) {
        case 4 /* Section */:
          if ($.json.terse.options.groups) space = 0;
          break;
        case 14 /* Asset */:
          if ($.json.terse.options.assets) space = 0;
          break;
        case 8 /* Locale */:
          if ($.json.terse.options.locales) space = 0;
          break;
        case 1 /* Template */:
          if ($.json.terse.options.templates) space = 0;
          break;
        case 7 /* Config */:
          if ($.json.terse.options.config) space = 0;
          break;
        case 15 /* Metafield */:
          if ($.json.terse.options.metafields) space = 0;
          break;
        case 6 /* Metaobject */:
          if ($.json.terse.options.metaobject) space = 0;
          break;
      }
    }
    let content;
    if (isFunction(cb)) {
      const update2 = cb.apply({ ...file }, data);
      if (isUndefined(update2)) {
        content = await jsonCompile(file, data, space);
      } else if (isArray2(update2) || isObject(update2)) {
        content = await jsonCompile(file, sanitize(update2), space);
      } else if (isString(update2)) {
        content = await jsonCompile(file, parse2(file, update2), space);
      } else if (isBuffer(update2)) {
        content = await jsonCompile(file, parse2(file, update2.toString()), space);
      }
    } else {
      content = await jsonCompile(file, data, space);
    }
    $.cache.checksum[file.input] = checksum(content);
    if (file.type !== 9 /* Style */ && $.processor.tailwind.map !== null) {
      const request2 = await tailwindParse(file, [[file, content]]);
      for (const req of request2) {
        await sync4("put", req[0], req[1]);
        syncing(req[0].key);
      }
    } else {
      syncing(file.key);
      await sync4("put", file, content);
    }
    $.mode.hot && await queue.onIdle().then(() => $.wss.replace());
  }
}

// syncify/transform/script.ts
init_cjs_shims();
var import_fs_extra9 = require("fs-extra");
var import_esbuild = __toESM(require("esbuild"));
var import_pathe12 = require("pathe");
async function esbuildBundle(bundle) {
  bundle.watch.clear();
  const result = await import_esbuild.default.build(bundle.esbuild);
  if ($.mode.terse && $.mode.build) {
    bundle.size = byteSize(result.outputFiles[0].text);
  }
  if ($.mode.watch) {
    await getWatchPaths(bundle, result.metafile.inputs);
  } else {
    if (!bundle.watch.has(bundle.input)) bundle.watch.add(bundle.input);
    if (!$.watch.has(bundle.input)) $.watch.add(bundle.input);
  }
}
async function getWatchPaths(bundle, inputs) {
  const store = [];
  const { cwd, watch: watch2, mode } = $;
  for (const file in inputs) {
    if (file.indexOf("/node_modules/") > -1) continue;
    const path2 = (0, import_pathe12.join)(cwd, file);
    if (!bundle.watch.has(path2)) bundle.watch.add(path2);
    if (!watch2.has(path2)) watch2.add(path2);
    if (mode.watch) store.push(path2);
  }
  if (mode.watch) {
    await pNext().then(() => {
      for (const path2 of bundle.watch) {
        if (path2.indexOf("/node_modules/") > -1) continue;
        if (bundle.watchCustom !== null && bundle.watchCustom(path2)) continue;
        if (!has2(path2.slice(cwd.length + 1), inputs)) {
          bundle.watch.delete(path2);
          watch2.unwatch(path2);
        }
      }
    });
  }
}
function createSnippet2(string, attrs) {
  return attrs.length > 0 ? `<script ${attrs.join(" ")}>${string}</script>` : `<script>${string}</script>`;
}
function runHook(hook) {
  if (!isType("Function", hook)) return false;
  return function(file, content) {
    const update2 = hook.apply({ ...file }, content);
    if (update2 === false) {
      write2("cancelled");
      return null;
    }
    if (isType("String", update2)) {
      write2("augment");
      return update2;
    }
    if (isBuffer(update2)) {
      write2("augment");
      return update2.toString();
    }
    return content;
  };
}
async function compile6(file, sync4, hooks2) {
  if (!file.data) return;
  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);
  const hook = runHook(hooks2);
  const trigger2 = file.data.length;
  for (const bundle of file.data) {
    const {
      key,
      input,
      output,
      snippet: snippet2,
      attrs,
      esbuild: { format }
    } = bundle;
    try {
      const { metafile, outputFiles, warnings: warnings2 } = await import_esbuild.default.build(bundle.esbuild);
      if (trigger2 > 1) {
        nwl();
        write2((0, import_pathe12.relative)($.cwd, input));
      }
      if ($.mode.watch) {
        await getWatchPaths(bundle, metafile.inputs);
      }
      if (warnings2.length > 0) esbuild2(warnings2);
      for (const { text, path: path2 } of outputFiles) {
        if (path2.endsWith(".map")) {
          const map = (0, import_pathe12.join)($.dirs.sourcemaps.scripts, `${file.base}.map`);
          (0, import_fs_extra9.writeFile)(map, text).catch(write("Error writing JavaScript Source Map to cache", {
            file: (0, import_pathe12.relative)($.cwd, map),
            source: file.relative
          }));
        } else {
          if ($.mode.terse) {
            if (isNaN(bundle.size)) {
              transform(file.kind, `${bold2(format.toUpperCase())} bundle`);
              minified(stringSize(text));
            } else {
              const { before, after, saved } = sizeDiff(text, bundle.size);
              transform(`${bold2(format.toUpperCase())} bundle \u2192 ${bold2(stringSize(text))}`);
              minified(null, before, after, saved);
            }
          } else {
            transform(`${bold2(format.toUpperCase())} bundle \u2192 ${bold2(stringSize(text))}`);
          }
          let content;
          if (snippet2) {
            content = createSnippet2(text, attrs);
            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }
            await (0, import_fs_extra9.writeFile)(output, content).catch(
              write("Error writing inline <script> snippet", {
                file: file.relative
              })
            );
            exported("script", "snippet");
          } else {
            content = text;
            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }
            await (0, import_fs_extra9.writeFile)(output, content).catch(write("Error writing JavaScript asset", {
              file: file.relative
            }));
          }
          if ($.mode.hot) {
            syncing(key, { hot: true });
            $.wss.script(file.uuid, file.base);
            await sync4("put", bundle, content);
          } else if (!$.mode.build) {
            syncing(key);
            await sync4("put", bundle, content);
          }
        }
      }
      ;
    } catch (e) {
      if (has2("errors", e)) {
        timer.clear();
        error2(file.relative, {
          notify: {
            title: "JavaScript Error",
            message: `Transform failed for ${file.base}`
          }
        });
        $.errors.add(input);
        e.errors.forEach(esbuild);
      }
    }
  }
  if (trigger2 > 1) nwl();
}

// syncify/transform/svg.ts
init_cjs_shims();
var import_svgo = __toESM(require("svgo"));
var import_svg_sprite = __toESM(require("svg-sprite"));
var import_pathe13 = require("pathe");
var import_fs_extra10 = require("fs-extra");
async function getFile(path2) {
  const svg2 = await (0, import_fs_extra10.readFile)(path2);
  return [
    path2,
    svg2.toString(),
    byteSize(svg2)
  ];
}
function getSprite(sprite) {
  return new Promise(function(resolve3, reject) {
    sprite.compile((error3, svg2) => {
      if (error3) return reject(error3);
      for (const m in svg2) {
        for (const p in svg2[m]) {
          resolve3(svg2[m][p].contents.toString());
        }
      }
    });
  });
}
function compileSprite(context, request2, _cb) {
  async function run2(config) {
    const file = assign({}, context);
    if ($.mode.watch) timer.start();
    file.kind = "Sprite" /* Sprite */;
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = (0, import_pathe13.join)("snippets", renameFile(file, config.rename));
      file.output = (0, import_pathe13.join)($.dirs.output, file.key);
    } else {
      file.key = (0, import_pathe13.join)("assets", renameFile(file, config.rename));
      file.output = (0, import_pathe13.join)($.dirs.output, file.key);
    }
    const options = config.sprite === true ? $.processor.sprite : config.sprite;
    const sprite = new import_svg_sprite.default(options);
    const items = await pMap(toArray(config.input), getFile).catch(
      write("Error reading an SVG file", {
        file: file.base,
        source: file.relative
      })
    );
    if (items) {
      const svgs = items.filter(([path2, svg2]) => {
        if (hasLiquid(svg2)) {
          skipped((0, import_pathe13.relative)($.cwd, path2), "Liquid Detected");
          return false;
        }
        return true;
      });
      file.size = 0;
      for (const [path2, svg2, size3] of svgs) {
        sprite.add(path2, null, svg2);
        file.size = file.size + size3;
      }
      const content = await getSprite(sprite);
      const length = svgs.length;
      process7("SVG Sprite", `${length} ${plural("SVG", length)}`, timer.stop());
      await (0, import_fs_extra10.writeFile)(file.output, content).catch(
        write("Error writing SVG Sprite", {
          file: file.key,
          caller: context.relative
        })
      );
      const size2 = sizeDiff(content, file.size);
      if (size2.isSmaller) {
        transform(`${file.kind} ${size2.before}`, `gzip ${size2.gzip}`);
      } else {
        minified(file.kind, size2.before, size2.after, size2.saved);
      }
      if (request2) {
        syncing(file.key);
        await request2("put", file, content);
      }
    }
  }
  ;
  return run2;
}
function hasLiquid(svg2) {
  return /^(?:{{[\s\S]+?}}|{%[\s\S]+?%})|[^"'](?:{{[\s\S]+?}}|{%[\s\S]+?%})[^'"]/m.test(svg2);
}
function patchPathVoids(svg2) {
  const patch = /<path[^>]*[a-zA-Z"'\s](>)(?!\s*<\/path>)/g;
  if (patch.test(svg2)) {
    const before = `${gray2(`<${white2("path")}>`)}`;
    const after = `${neonGreen(`<${white2("path")} />`)}`;
    transform("SVG", before, after, "patched solidus");
    return svg2.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, "$1 /$2");
  }
  return svg2;
}
function compileInline(context, request2, _cb) {
  const file = assign({}, context);
  async function run2(config) {
    if ($.mode.watch) timer.start();
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = (0, import_pathe13.join)("snippets", renameFile(file, config.rename));
      file.output = (0, import_pathe13.join)($.dirs.output, file.key);
    } else {
      file.key = (0, import_pathe13.join)("assets", renameFile(file, config.rename));
      file.output = (0, import_pathe13.join)($.dirs.output, file.key);
    }
    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const read = await (0, import_fs_extra10.readFile)(file.input);
    const node = read.toString();
    if (hasLiquid(node)) {
      skipped(file, "Liquid Detected");
      return null;
    }
    const patch = patchPathVoids(node);
    file.size = byteSize(patch);
    let svg2;
    try {
      svg2 = import_svgo.default.optimize(patch, options);
    } catch (e) {
      error2(file.relative, {
        notify: {
          title: "Transform Error",
          message: `SVGO failed to optimize ${file.key}`
        }
      });
      throws(e, {
        source: file.relative,
        output: file.key,
        processor: "SVGO"
      });
      return null;
    }
    process7("SVGO", timer.stop());
    const { data } = svg2;
    const size2 = sizeDiff(data, file.size);
    if (size2.isSmaller) {
      transform(`${file.kind} ${size2.before} \u2192 gzip ${size2.gzip}`);
    } else {
      minified(file.kind, size2.before, size2.after, size2.saved);
    }
    await (0, import_fs_extra10.writeFile)(file.output, data).catch(
      write("Error writing SVG", {
        file: file.key,
        caller: context.relative
      })
    );
    if (request2) {
      syncing(file.key);
      await request2("put", file, data);
    }
  }
  ;
  return run2;
}
async function compile7(file, request2, cb) {
  if ($.mode.watch) timer.start();
  const sprite = compileSprite(file, request2, cb);
  const inline = compileInline(file, request2, cb);
  const length = file.data.length;
  for (let i = 0; i < length; i++) {
    const config = file.data[i];
    if (i > 0 && $.mode.watch) {
      changed(file);
    }
    if (config.format === "sprite") {
      await sprite(config);
    } else if (config.format === "file") {
      await inline(config);
    }
  }
}

// syncify/process/cache.ts
init_cjs_shims();
var import_pathe14 = require("pathe");
var import_fs_extra11 = require("fs-extra");
var import_node_zlib2 = __toESM(require("zlib"));
var import_cbor = __toESM(require("cbor"));
var import_write_file_atomic = __toESM(require_lib4());
var cq = new PQueue();
function decode(uri) {
  const content = (0, import_fs_extra11.readFileSync)(uri);
  const gunzip = import_node_zlib2.default.gunzipSync(content);
  return import_cbor.default.decode(gunzip);
}
function save(uri, data) {
  return async () => {
    const encoded = await import_cbor.default.encodeAsync(data, {
      omitUndefinedProperties: true,
      canonical: true
    });
    const gzip = import_node_zlib2.default.gzipSync(encoded);
    gzip[9] = 3;
    return (0, import_write_file_atomic.default)(uri, gzip);
  };
}
async function getCache(cli) {
  $.cache.uri = create(null);
  const cachdir = (0, import_pathe14.join)($.cwd, "node_modules", ".cache");
  if (!(0, import_fs_extra11.existsSync)(cachdir)) (0, import_fs_extra11.mkdirSync)(cachdir);
  const root = (0, import_pathe14.join)(cachdir, "syncify");
  if (!(0, import_fs_extra11.existsSync)(root)) (0, import_fs_extra11.mkdirSync)(root);
  for (const file of CACHE_REFS) {
    $.cache.uri[file] = (0, import_pathe14.join)(root, `${file}.bin`);
    if ((0, import_fs_extra11.existsSync)($.cache.uri[file])) {
      $.cache[file] = decode($.cache.uri[file]);
    } else {
      $.cache[file] = {};
      cq.add(save($.cache.uri[file], $.cache[file]));
    }
  }
  if (!has2("hotSnippet", $.cache.build)) $.cache.build.hotSnippet = [];
  if (cli.cache) return clearCache();
}
function clearCache(id = null) {
  if (id === null) {
    for (const key of CACHE_REFS) {
      if (!isEmpty($.cache[key])) {
        $.cache[key] = {};
        cq.add(save($.cache.uri[key], $.cache[key]));
      }
    }
    return cq.onIdle();
  }
  $.cache[id] = {};
  return cq.add(save($.cache.uri[id], $.cache[id]));
}
function cacheDone() {
  return cq.onIdle();
}
function saveCache(id = null) {
  if (id === null) {
    for (const key of CACHE_REFS) {
      if (!isEmpty($.cache[key])) {
        cq.add(save($.cache.uri[key], $.cache[key]));
      }
    }
    return cq.onIdle();
  } else {
    return cq.add(save($.cache.uri[id], $.cache[id]));
  }
}
function getPageCache(domain, pageId = NaN) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (isNaN(pageId) === false) {
    if (hasPath(`${store}.${pageId}`, $.cache.pages)) {
      return $.cache.pages[store][pageId];
    }
    if (!has2(store, $.cache.pages)) {
      $.cache.pages[store] = { [pageId]: {} };
    } else {
      $.cache.pages[store][pageId] = {};
    }
    cq.add(save($.cache.uri.pages, $.cache.pages));
    return $.cache.pages[store][pageId];
  } else {
    if (!has2(store, $.cache.pages)) {
      $.cache.pages[store] = {};
      cq.add(save($.cache.uri.pages, $.cache.pages));
    }
  }
  return $.cache.pages[store];
}
function setPageCache(domain, data) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (!has2(store, $.cache.pages)) {
    $.cache.pages[store] = { [data.id]: data };
  } else {
    $.cache.pages[store][data.id] = data;
  }
  cq.add(save($.cache.uri.pages, $.cache.pages));
  return $.cache.pages[store][data.id];
}

// syncify/modes/build.ts
function getModel2() {
  const report = {
    stats: {
      total: 0,
      errors: 0,
      skipped: 0,
      bundled: 0
    }
  };
  for (const group2 of BUILD_GROUPS) {
    report[group2] = {
      group: group2,
      time: "",
      size: 0,
      files: [],
      report: null
    };
  }
  return report;
}
async function build(cb) {
  timer.start("build");
  if (!$.mode.export) {
    nwl();
    task("Build");
    nwl();
  }
  const SVG = /* @__PURE__ */ new Set();
  const errors = Create({ type: "error" });
  const message = Create().Newline();
  const report = getModel2();
  const hasFilter = isEmpty2($.filters) === false;
  const parse5 = parseFile($.paths, $.dirs.output);
  const match2 = (0, import_anymatch.default)(toArray($.watch.values()));
  const globs = await (0, import_fast_glob2.default)("**", { absolute: true, cwd: $.dirs.input });
  const cache = $.cache.paths;
  for (const path2 of globs.filter(match2)) {
    const file = parse5(path2);
    if (isUndefined(file)) continue;
    switch (file.type) {
      case 9 /* Style */:
        report.styles.files.push(file);
        break;
      case 10 /* Script */:
        report.scripts.files.push(file);
        break;
      case 4 /* Section */:
        report.sections.files.push(file);
        break;
      case 2 /* Layout */:
        report.layouts.files.push(file);
        break;
      case 3 /* Snippet */:
        report.snippets.files.push(file);
        break;
      case 8 /* Locale */:
        report.locales.files.push(file);
        break;
      case 7 /* Config */:
        report.configs.files.push(file);
        break;
      case 1 /* Template */:
        report.templates.files.push(file);
        break;
      case 16 /* Page */:
        report.pages.files.push(file);
        break;
      case 14 /* Asset */:
        report.assets.files.push(file);
        break;
      case 15 /* Metafield */:
        report.metafields.files.push(file);
        break;
      case 11 /* Svg */:
        for (const { uuid: uuid2, format, input } of file.data) {
          if (!SVG.has(uuid2)) {
            SVG.add(uuid2);
            if (format === "sprite") {
              report.svgs.files.push(file);
            } else {
              for (const snippet2 of input) {
                report.svgs.files.push(parse5(snippet2));
              }
            }
          }
        }
        break;
    }
  }
  function handle(record, transform3) {
    timer.start(record.group);
    return async function(file) {
      timer.start(file.uuid);
      report.stats.total += 1;
      try {
        cache[file.output] = file.input;
        const value = file.ext === ".json" ? await compile5(file, cb) : await transform3(file, cb);
        if (value === null || isNaN(file.size)) {
          report.stats.skipped += 1;
          return {
            name: file.base,
            input: file.relative,
            time: timer.stop(file.uuid),
            output: file.key,
            error: "Skipped File"
          };
        }
        report.stats.bundled += 1;
        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          error: null,
          time: timer.stop(file.uuid),
          size: sizeDiff(value, file.size)
        };
      } catch (e) {
        report.stats.errors += 1;
        errors.Line(e.message);
        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          time: timer.stop(file.uuid),
          error: e.message
        };
      }
    };
  }
  async function bundle(group2, fn) {
    const filter = hasFilter && has2(group2, $.filters) ? $.filters[group2] : null;
    if (filter && filter.includes(group2) === false) return 0;
    const record = report[group2];
    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn), { stopOnError: true });
    record.time = timer.stop(group2);
    const files = record.report.length;
    const count = bold2(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? "  " : " ";
    message.Line(Prefix(group2, `${count} ${plural("file", files)}${space}${Append(record.time)}`));
  }
  await bundle("svgs", compile7);
  await bundle("layouts", compile4);
  await bundle("templates", compile4);
  await bundle("sections", compile4);
  await bundle("snippets", compile4);
  await bundle("locales", compile5);
  await bundle("configs", compile5);
  await bundle("assets", compile);
  await bundle("styles", compile3);
  await bundle("scripts", compile6);
  await saveCache();
  if ($.mode.export === false && $.mode.publish === false) {
    message.NL.Dash("Completed", gray2).NL.Line(Prefix("version", `${$.vc.number}`)).Line(Prefix("processed", `${bold2(`${report.stats.total}`)} files`)).Line(Prefix("bundled", `${bold2(`${report.stats.bundled}`)} files`)).Line(Prefix("skipped", `${bold2(`${report.stats.skipped}`)} files`)).Line(Prefix("duration", timer.now("build"))).Line(Prefix("warnings", bold2(`${$.warnings.size}`))).Line(Prefix("errors", bold2(`${report.stats.errors}`)));
    if ($.warnings.size > 0) {
      message.NL.Dash("Warnings", gray2).Newline();
      let group2;
      let count = 0;
      for (const err of $.warnings.keys()) {
        for (const [processor2, warnings2] of $.warnings.get(err)) {
          if (group2 !== processor2) {
            count = 1;
            group2 = processor2;
          } else {
            count = count + 1;
            message.Ruler();
          }
          message.Warn(`${bold2("WARNING")} ${HSH}${bold2(`${count}`)}`, yellowBright2).Newline("yellow").Warn(group2, yellowBright2);
          for (const warn3 of warnings2) {
            message.Insert(warn3);
          }
        }
      }
      log(
        message.NL.End($.log.group).BR.toString(whiteBright2)
      );
    } else {
      log(
        message.NL.End($.log.group).BR.toString(whiteBright2)
      );
    }
    process.exit(0);
  } else {
  }
}

// syncify/modes/watch.ts
init_cjs_shims();

// syncify/transform/pages.ts
init_cjs_shims();
var import_fs_extra12 = require("fs-extra");
var import_gray_matter = __toESM(require("gray-matter"));
var import_prompts2 = __toESM(require("prompts"));
var import_markdown_it = __toESM(require("markdown-it"));
var import_turndown = require("@syncify/turndown");

// syncify/process/metafields.ts
init_cjs_shims();
function checkMetafieldType(type2) {
  return type2 === "boolean" || type2 === "color" || type2 === "date" || type2 === "date_time" || type2 === "dimension" || type2 === "json" || type2 === "money" || type2 === "multi_line_text_field" || type2 === "number_decimal" || type2 === "number_integer" || type2 === "rating" || type2 === "rich_text_field" || type2 === "single_line_text_field" || type2 === "url" || type2 === "volume" || type2 === "weight";
}
function getPageMetafields(file, metafields) {
  for (const metafield of metafields) {
    for (const prop of [
      "key",
      "type",
      "value",
      "namespace",
      "description"
    ]) {
      if (prop !== "description" && !has(prop, metafield)) {
        invalid(file.relative, [
          `Missing ${blue2.bold(prop)} property key value in a ${yellowBright2.bold("metafields")}`,
          "value in frontmatter. Frontmatter metafields require you provide the following keys:",
          "",
          `${gray2("-")} ${white2("key")}`,
          `${gray2("-")} ${white2("type")}`,
          `${gray2("-")} ${white2("value")}`,
          `${gray2("-")} ${white2("namespace")}`,
          "",
          `${gray2("Update the metafield entry to include")} ${white2(prop)}`
        ]);
        return false;
      }
      if (prop === "type") {
        const type2 = metafield[prop];
        if (!checkMetafieldType(type2)) {
          invalid(file.relative, [
            `Invalid type ${blue2.bold(type2)} provided in frontmatter ${yellowBright2.bold("metafields")}`,
            `value. Frontmatter metafields ${bold2("must")} be one of following types:`,
            "",
            `${gray2("-")} ${white2("boolean")}`,
            `${gray2("-")} ${white2("color")}`,
            `${gray2("-")} ${white2("date")}`,
            `${gray2("-")} ${white2("date_time")}`,
            `${gray2("-")} ${white2("dimension")}`,
            `${gray2("-")} ${white2("json")}`,
            `${gray2("-")} ${white2("money")}`,
            `${gray2("-")} ${white2("multi_line_text_field")}`,
            `${gray2("-")} ${white2("number_decimal")}`,
            `${gray2("-")} ${white2("number_integer")}`,
            `${gray2("-")} ${white2("rating")}`,
            `${gray2("-")} ${white2("rich_text_field")}`,
            `${gray2("-")} ${white2("single_line_text_field")}`,
            `${gray2("-")} ${white2("url")}`,
            `${gray2("-")} ${white2("volume")}`,
            `${gray2("-")} ${white2("weigh")}`,
            "",
            `${gray2("Update the metafield entry to an accepted")} ${white2("type")}`
          ]);
          return false;
        }
      }
    }
  }
  return true;
}

// syncify/requests/pages.ts
init_cjs_shims();
var import_axios3 = __toESM(require("axios"));
async function list(store) {
  return import_axios3.default.get("pages.json", store.client).then(({ data }) => {
    return data.pages;
  }).catch((e) => {
    return request(store.store, e.response);
  });
}
async function find3(store, page) {
  if (allFalse(has("handle", page), has("title", page))) {
    console.log("invalid fields");
    return void 0;
  }
  return import_axios3.default.get("pages.json", store.client).then(({ data }) => {
    if (has("handle", page) && has("title", page)) {
      return data.pages.find((p) => page.title === p.title && page.handle === p.handle);
    } else if (has("handle", page)) {
      return data.pages.find((p) => page.handle === p.handle);
    } else if (has("title", page)) {
      return data.pages.find((p) => page.title === p.title);
    } else {
      return void 0;
    }
  }).catch((e) => {
    console.log(e);
    return void 0;
  });
}
async function create4(store, page) {
  if (!$.mode.upload) timer.start();
  const promise = await import_axios3.default.post("/pages.json", { page }, store.client).then(({ data }) => {
    resource("page", store);
    return data.page;
  }).catch((e) => {
    if (requeue(e.response.status)) {
      queue.add(() => create4(store, page));
    } else {
      if (hasPath("response.data", e.response)) {
        request(page.title, e.response);
      }
    }
  });
  if (!promise) return void 0;
  setPageCache(store.domain, promise);
  return promise;
}
async function sync3(store, file, page) {
  const { mode } = $;
  if (!mode.upload) timer.start();
  const url = `pages/${page.id}.json`;
  const promise = await import_axios3.default.put(url, { page }, store.client).then(({ data }) => {
    if (mode.watch) {
      resource("page", store);
    } else if (mode.upload) {
      event.emit("upload", "uploaded", page, {
        key: file.key,
        namespace: file.namespace,
        fileSize: stringSize(page.body_html)
      });
    }
    return data.page;
  }).catch((e) => {
    if (requeue(e.response.status)) {
      queue.add(() => sync3(store, file, page));
    } else {
      console.log(e);
    }
  });
  if (!promise) return void 0;
  return promise;
}

// syncify/transform/pages.ts
function toMarkdown(content) {
  return new import_turndown.Turndown($.page.import).use(import_turndown.GithubFlavor).turndown(content);
}
async function promptAction(store) {
  const resume = prompt("No matching pages, select an option", {
    title: "No matching pages",
    message: "Open CLI and select an option"
  });
  const prompt6 = await (0, import_prompts2.default)({
    type: "select",
    name: "action",
    message: "Page Resources",
    hint: " ",
    instructions: false,
    choices: [
      {
        title: "Create Page",
        description: `Create a new page on ${store.domain}`,
        value: 1 /* Create */
      },
      {
        title: "Select Page",
        description: `Select a page to overwrite on ${store.domain}`,
        value: 2 /* Select */
      },
      {
        title: "Cancel",
        description: "Cancel, and skip this sync operation",
        value: 4 /* Cancel */
      }
    ]
  });
  return {
    resume,
    action: prompt6.action
  };
}
async function selectPage(store) {
  const remote = await list(store);
  if (!remote) return;
  const choices = remote.map(
    (page) => ({
      title: page.title,
      description: `https://admin.shopify.com/store/${store.store.toLowerCase()}/pages/${page.id}`,
      value: page.id
    })
  );
  choices.push(
    {
      title: tui.hr(20, false),
      disabled: true,
      selected: false
    },
    {
      title: "Create New Page",
      description: `Create a new page on ${store.domain}`,
      value: 1 /* Create */
    },
    {
      title: "Cancel",
      description: "Cancel, and skip this sync operation",
      value: 4 /* Cancel */
    }
  );
  const prompt6 = await (0, import_prompts2.default)({
    type: "select",
    name: "action",
    message: "Choose Page",
    hint: " ",
    instructions: false,
    choices
  });
  return prompt6.action;
}
async function promptOverwrite(remote) {
  const choices = [
    {
      title: "View Source",
      description: "Prints the page source in the CLI",
      value: 5 /* View */
    },
    {
      title: "Update Local",
      description: "Update the local source with remote version",
      value: 3 /* Update */
    },
    {
      title: "Overwrite Remote",
      description: "Overwrite the remote version with local source",
      value: 6 /* Overwrite */
    },
    {
      title: "Cancel",
      description: "Cancel, and skip this sync operation",
      value: 4 /* Cancel */
    }
  ];
  const resume = prompt("Remote version is newer than local version", {
    title: "Remote \u2192 Local",
    message: "Remote version has changed"
  });
  const prompt6 = await (0, import_prompts2.default)({
    type: "select",
    name: "action",
    message: "Page Resources",
    hint: " ",
    instructions: false,
    choices
  });
  if (prompt6.action === 5 /* View */) {
    nwl("");
    log(remote.body_html);
    nwl("");
    const next = await (0, import_prompts2.default)({
      type: "select",
      name: "action",
      message: "Page Resources",
      hint: " ",
      instructions: false,
      choices: choices.slice(1)
    });
    return {
      resume,
      action: next.action
    };
  } else {
    return {
      resume,
      action: prompt6.action
    };
  }
}
function getPayloadFromFrontmatter(file, data) {
  const payload = {
    title: has2("title", data) ? data.title : toUpcase(file.name.replace(/[._-]/g, " "))
  };
  if (has2("handle", data)) {
    let before;
    let handle = data.handle;
    if (/^[./]{1,2}/.test(handle)) {
      before = handle;
      handle = handle.replace(/^[./]{1,2}/, "");
      warn2(`handle ${CHV} ${before} ${ARR} ${handle}`, "fixed start");
    }
    if (/^pages\//.test(handle)) {
      before = handle;
      handle = handle.replace(/^pages\//, "");
      warn2(`handle ${CHV} ${before} ${ARR} ${handle}`, "fixed sub-path");
    }
    if (/[_/]/.test(data.handle)) {
      before = handle;
      handle = handle.replace(/[_/]/g, "-");
      warn2(`handle ${CHV} ${before} ${ARR} ${handle}`, "fixed invalid characters");
    }
    payload.handle = handle;
  } else {
    if (has2("title", data)) {
      payload.handle = handleize(data.title);
    } else {
      payload.handle = file.name.toLowerCase();
    }
  }
  if (has2("author", data) && $.page.author !== "") {
    let before;
    let author = data.author;
    if (/\//.test(data.author)) {
      before = data.author;
      author = before.replace(/\//g, " ");
      warn2(`author ${CHV} ${before} ${ARR} ${author}`, "fixed invalid characters");
    }
    payload.author = author;
  } else {
    data.author = $.page.author;
  }
  if (has2("published", data)) {
    if (isBoolean(data.published)) {
      payload.published = data.published;
    } else {
      warn2(`published ${CHV} expected boolean, got ${typeof data.published}`, "defaulted to false");
      payload.published = false;
    }
  } else {
    payload.published = true;
  }
  if (has2("template_suffix", data)) {
    if (has2("template", data)) {
      warn2("duplicate template_suffix references", "using template");
      delete data.template_suffix;
    } else {
      data.template = data.template_suffix;
      delete data.template_suffix;
    }
  }
  if (has2("template", data)) {
    payload.template_suffix = data.template;
  } else {
    if ($.page.suffixDir && (isRegex($.page.global) && $.page.global.test(file.input) !== false)) {
      payload.template_suffix = lastPath(file.input);
    }
  }
  if (has2("metafield", data)) {
    warn2("use metafields instead of metafield", "sync will still process");
    data.metafields = data.metafield;
    delete data.metafield;
  }
  if (has2("metafields", data)) {
    if (isObject(data.metafields)) {
      payload.metafields = [data.metafields];
    }
  } else {
    payload.metafields = void 0;
  }
  return payload;
}
async function compile8(file, _cb) {
  if ($.sync.stores.length > 1) {
    skipped(file, "pages do not support multistore sync");
    return null;
  }
  const read = await (0, import_fs_extra12.readFile)(file.input);
  if (isEmpty(read.toString())) {
    if ($.mode.watch) skipped(file, "empty file");
    return null;
  }
  const frontmatter = (0, import_gray_matter.default)(read);
  const { data, content } = merge(frontmatter);
  const payload = getPayloadFromFrontmatter(file, data);
  if (isArray2(payload.metafields) && !getPageMetafields(file, payload.metafields)) {
    return null;
  }
  if (file.kind === "Markdown" /* Markdown */) {
    timer.start();
    payload.body_html = (0, import_markdown_it.default)($.page.export).render(content);
    transform(`${bold2("Markdown")} ${ARR} ${bold2("HTML")} ${TLD} ${timer.stop()}`);
  } else {
    transform("HTML");
    payload.body_html = content;
  }
  const store = $.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await find3(store, { handle: payload.handle });
  if (isArray2(remote)) {
    invalid(file.relative, [
      `Multiple pages returned when matching on handle ${blue2.bold(payload.handle)}`,
      "Syncify is unsure on how to handle this request and has cancelled the sync. Please",
      "check the provided handle in your webshop."
    ]);
    return null;
  }
  let cached = getPageCache(shopName);
  if (isObject(remote)) {
    payload.id = remote.id;
    cached = setPageCache(shopName, remote);
  }
  if (isUndefined(remote)) {
    if ($.page.safeSync) {
      const prompt6 = await promptAction(store);
      if (prompt6.action === 2 /* Select */) {
        const action = await selectPage(store);
        if (action === 4 /* Cancel */) {
          return prompt6.resume();
        } else if (action === 1 /* Create */) {
          prompt6.resume();
          syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray2(`${TLD} ${file.relative}`)}`);
          return create4(store, payload);
        } else {
          payload.id = action;
          prompt6.resume();
        }
      } else if (prompt6.action === 1 /* Create */) {
        prompt6.resume();
        syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray2(`${TLD} ${file.relative}`)}`);
        return create4(store, payload);
      } else {
        return prompt6.resume();
      }
    }
  }
  if (isObject(remote)) {
    const online = new Date(remote.updated_at).getTime();
    const local = new Date(cached.updated_at).getTime();
    if (online > local && remote.body_html !== payload.body_html) {
      const prompt6 = await promptOverwrite(remote);
      if (prompt6.action === 3 /* Update */) {
        prompt6.resume();
        let convert = remote.body_html;
        if ($.page.language === "markdown") {
          const markdown2 = toMarkdown(convert);
          transform(`${file.name}.html ${ARR} ${file.base}`);
          convert = (0, import_gray_matter.stringify)("\n" + markdown2, frontmatter.data);
        }
        $.watch.unwatch(file.input);
        await (0, import_fs_extra12.writeFile)(file.input, convert);
        setPageCache(store.domain, remote);
        $.watch.add(file.input);
      } else if (prompt6.action === 4 /* Cancel */) {
        return prompt6.resume();
      } else if (prompt6.action === 6 /* Overwrite */) {
        prompt6.resume();
      }
    }
  }
  if ($.mode.build) return payload.body_html;
  syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray2(`${TLD} ${file.relative}`)}`);
  const update2 = await sync3(store, file, payload);
  if (!update2) return;
  await saveCache("pages");
}

// syncify/modes/watch.ts
function watch(callback) {
  const request2 = client($.sync);
  const parse5 = parseFile($.paths, $.dirs.output);
  if ($.mode.hot) $.wss.connected();
  $.watch.on("all", onchange);
  function onchange(event2, path2) {
    const file = parse5(path2);
    if (isUndefined(file)) return;
    if (file.base === $.file.base) return;
    if (file.type !== 17 /* Spawn */) changed(file);
    if (event2 === "change" || event2 === "add") {
      handler2(file);
    } else if (event2 === "unlink") {
      if (file.type === 16 /* Page */) {
        return request2.pages("delete", file);
      } else {
        return request2.assets("delete", file);
      }
    }
  }
  ;
  async function handler2(file) {
    try {
      switch (file.type) {
        case 10 /* Script */:
          return compile6(file, request2.assets, callback);
        case 16 /* Page */:
          return compile8(file, callback);
        case 11 /* Svg */:
          return compile7(file, request2.assets, callback);
        case 14 /* Asset */:
        case 17 /* Spawn */:
          return compile(file, request2.assets, callback);
        case 5 /* Schema */:
          return compile2(file, request2.assets, callback);
        case 9 /* Style */:
          return compile3(file, request2.assets, callback);
        case 2 /* Layout */:
        case 3 /* Snippet */:
          return compile4(file, request2.assets, callback);
        case 6 /* Metaobject */:
        case 1 /* Template */:
        case 4 /* Section */:
          return file.kind === "JSON" /* JSON */ ? compile5(file, request2.assets, callback) : compile4(file, request2.assets, callback);
        case 7 /* Config */:
        case 8 /* Locale */:
          return compile5(file, request2.assets, callback);
        case 15 /* Metafield */:
          return compile5(file, request2.metafields, callback);
      }
    } catch (e) {
      console.error(e);
      error2(e);
    }
  }
}

// syncify/modes/themes.ts
init_cjs_shims();

// syncify/requests/themes.ts
init_cjs_shims();
var import_axios4 = __toESM(require("axios"));
async function list2(store) {
  return import_axios4.default.get("themes.json", store.client).then(({ data }) => {
    return data.themes;
  }).catch((e) => {
    return request(store.store, e.response);
  });
}

// syncify/modes/themes.ts
var import_enquirer = require("enquirer");
var theme = {
  pointer(choice, i) {
    const item = this.state.index === i ? lightGray("\u251C ") : lightGray("\u2502 ");
    return i === 0 ? lightGray("\u2502 ") + "\n" + item : item;
  },
  prefix: lightGray("\u2502 "),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red2.bold,
    warning: yellowBright2,
    muted: gray2,
    disabled: gray2,
    typing: gray2
  },
  symbols: {
    ellipsisLarge: "",
    ellipsisSmall: "",
    prefix: {
      pending: "",
      submitted: "\u2713",
      cancelled: "\u{10102}"
    },
    separator: {
      pending: "",
      submitted: " \u2192 ",
      cancelled: " \u{10102} "
    }
  }
};
async function listThemes(store) {
  let separator = 0;
  const items = await list2(store);
  const themes2 = items.filter(({ role }) => role !== "demo");
  const space = ws(themes2, "name");
  const choices = themes2.map((value) => {
    if (value.name.length > separator) separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${gray2(value.role)}`,
      value
    };
  });
  choices.push(
    {
      role: "separator",
      message: lightGray("\u2500".repeat(separator))
    },
    {
      name: "create",
      message: "Create Theme"
    },
    {
      name: "create",
      message: "Remove Theme"
    }
  );
  if ($.sync.stores.length > 1) {
    choices.push(
      {
        role: "separator",
        message: lightGray("\u2500".repeat(separator))
      },
      {
        name: "store",
        message: "Select Stores",
        hint: `${space("Select Stores")} ${TLD} ${gray2("go back and choose store")}`
      }
    );
  }
  const { targets } = await (0, import_enquirer.prompt)({
    name: "targets",
    type: "select",
    multiple: true,
    message: "Select Themes",
    hint: "Press spacebar to select",
    theme,
    choices,
    result(names) {
      return values(this.map(names));
    },
    format(value) {
      if (isArray2(value) && value.length > 0) {
        return neonCyan(`${value.join(whiteBright2(", "))}`);
      }
    }
  });
  const config = {
    domain: store.store.toLowerCase(),
    themes: {}
  };
  const fields = [];
  for (const theme3 of targets) {
    config.themes["${" + theme3.name + "}"] = theme3.id;
    fields.push({
      name: theme3.name,
      message: theme3.name,
      validate(value, _, field) {
        if (field && field.name === theme3.name) {
          if (/[A-Z]/.test(value)) {
            return "\n" + reset2.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = neonCyan.italic;
  theme.styles.typing = neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet2 = await (0, import_enquirer.prompt)({
    name: "stores",
    type: "snippet",
    required: targets.map(({ name }) => name),
    message: "Theme Targets",
    newline: "\n",
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return neonGreen(`${this.state.completed}% completed`);
        }
      }
      return ` ${ARR}  ${orange(`${this.state.completed}% completed`)}`;
    },
    theme,
    fields,
    template
  });
  const json2 = { syncify: JSON.parse(snippet2.stores.result) };
  const save2 = await (0, import_enquirer.prompt)({
    name: "save",
    type: "confirm",
    message: "Save Settings",
    theme,
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    },
    footer: Tree.line + [
      "",
      gray2("The following store and theme references will be saved"),
      gray2("to your package.json file on the syncify key property."),
      "",
      JSON.stringify(json2.syncify, null, 2).split("\n").join("\n" + Tree.line),
      ""
    ].join("\n" + Tree.line)
  });
  console.log(save2);
}
async function listStores() {
  const space = ws($.sync.stores, "store");
  const choices = $.sync.stores.map((value) => {
    return {
      name: value.domain,
      message: value.store,
      hint: `${space(value.store)} ${TLD} ${gray2(`https://${value.domain}`)}`,
      value
    };
  });
  const { store } = await (0, import_enquirer.prompt)({
    name: "store",
    type: "select",
    message: "Select Stores",
    choices,
    theme,
    result() {
      return this.focused.value;
    },
    format(value) {
      return neonGreen(value);
    }
  });
  return listThemes(store);
}
async function themes() {
  if ($.sync.stores.length > 1) {
    return listStores();
  } else {
    return listThemes($.sync.stores[0]);
  }
}

// syncify/modes/import.ts
init_cjs_shims();
var import_pathe15 = require("pathe");
var import_fs_extra13 = require("fs-extra");
async function getModel3() {
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme3 of $.sync.themes) {
    if (theme3.target.length > width) width = theme3.target.length;
    const store = $.sync.stores[theme3.sidx];
    const key = `${theme3.store}:${theme3.target}`;
    const { assets } = await get(theme3, store.client);
    if (!sync4.has(key)) {
      sync4.set(key, {
        active: sync4.size === 0,
        log: null,
        number: sync4.size + 1,
        size: assets.length,
        transfers: 0,
        warning: 0,
        failed: 0,
        success: 0,
        retry: 0,
        progress: progress(assets.length),
        get files() {
          return assets;
        },
        get theme() {
          return theme3;
        },
        errors: {
          local: /* @__PURE__ */ new Map(),
          remote: /* @__PURE__ */ new Map(),
          retry: /* @__PURE__ */ new Set()
        }
      });
    }
  }
  return sync4;
}
function getDoneLog(record, output, time) {
  const success = `${bold2(`${record.success}`)} ${white2("of")} ${bold2(`${record.size}`)}`;
  const failed = bold2(`${record.failed}`);
  const target = bold2(`${record.theme.target.toUpperCase()}`);
  return Create().Line(Prefix(target, ARR), neonCyan).NL.Line(`completed in ${gray2(time)}`).NL.Line(Prefix("synced", success), whiteBright2).Line(Prefix("errors", failed), record.failed > 0 ? redBright2 : whiteBright2).Line(Prefix("location", gray2.underline(output))).NL.Insert(record.progress.render()).Line.toString();
}
function getWaitLog(record) {
  return Create().Line(`${bold2(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, gray2.dim).NL.Line(`${bold2(addSuffix(record.number))} in queue`, magenta2).NL.Line(Prefix("synced", `${bold2("0")} ${white2("of")} ${bold2(`${record.size}`)}`), gray2.dim).Line(Prefix("retry", bold2("0")), gray2.dim).Line(Prefix("errors", bold2("0")), gray2.dim).NL.Insert(record.progress.render(gray2.dim)).NL.toString();
}
async function importing(cb) {
  let remaining = 0;
  let transfers = 0;
  timer.start("import");
  group("Import");
  spinner("Preparing", { style: "spinning" });
  const sync4 = await getModel3();
  await delay(500);
  function callback(item) {
    spinner.stop();
    const { theme: theme3, file } = item;
    const key = `${theme3.store}:${theme3.target}`;
    const record = sync4.get(key);
    const preview = `https://${theme3.store}?preview_theme_id=${theme3.id}`;
    const prefix = Create().NL.Line(Prefix("Duration", whiteBright2(timer.now("import"))), gray2).Line(Prefix("Transfers", whiteBright2(`${transfers++}`)), gray2).Line(Prefix("Syncing", pink(`${bold2(theme3.target)}  ${ARR}  ${theme3.store}`)), gray2).Line(Prefix("Preview", underline2(preview)), gray2).Ruler();
    let processing = "";
    if (item.status === 3 /* Empty */) {
      (0, import_fs_extra13.writeFileSync)(file.output, "");
      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);
      processing = yellowBright2(file.key);
    } else if (item.status === 0 /* Success */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);
      const buffer = Buffer.from(item.data.value || null, "utf8");
      (0, import_fs_extra13.writeFileSync)(file.output, buffer);
      processing = neonGreen(file.key);
    } else if (item.status === 1 /* Retry */) {
      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.add(file.output);
      }
      processing = orange(file.key);
    } else if (item.status === 2 /* Failed */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      if (!record.errors.remote.has(file.output)) {
        record.failed += 1;
        record.transfers += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);
      }
      processing = redBright2(file.key);
    }
    const success = `${bold2(`${record.success}`)} ${white2("of")} ${bold2(`${record.size}`)}`;
    const retried = bold2(`${record.retry}`);
    const failed = bold2(`${record.failed}`);
    const warnings2 = bold2(`${record.warning}`);
    const status = Create().NL.Line(`${bold2(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, neonCyan).NL.Line(processing).NL.Line(Prefix("synced", success), whiteBright2).Line(Prefix("retry", retried), record.retry > 0 ? orange : whiteBright2).Line(Prefix("warning", warnings2), record.warning > 0 ? yellowBright2 : whiteBright2).Line(Prefix("failed", failed), record.failed > 0 ? redBright2 : whiteBright2).NL.Insert(record.progress.render()).NL.Ruler();
    const message = [prefix.toString()];
    let counter = 0;
    for (const stream of sync4.values()) {
      if (stream.active) {
        message.push(status.toString());
      } else {
        if (stream.log === null) {
          counter = counter + 1;
          stream.number = counter;
          message.push(getWaitLog(stream));
        } else {
          message.push(stream.log);
        }
      }
    }
    log_update_default(glue(message));
  }
  event.on("import", callback);
  remaining = sync4.size - 1;
  for (const [id, record] of sync4) {
    const [store, target] = id.split(":");
    const output = (0, import_pathe15.join)($.dirs.import, store, target);
    timer.start(id);
    record.active = true;
    for (const { key } of record.files) {
      const file = importFile(key, output);
      const payload = assign({
        url: record.theme.url,
        method: "get",
        params: {
          "asset[key]": file.key
        }
      }, $.sync.stores[record.theme.sidx].client);
      await queue.add(() => sync(record.theme, file, payload));
    }
    await queue.onIdle();
    remaining = remaining - 1;
    record.active = false;
    record.log = getDoneLog(sync4.get(id), (0, import_pathe15.relative)($.cwd, output), timer.stop(id));
  }
  for (const { errors } of sync4.values()) {
    if (errors.remote.size > 0) {
    }
  }
}

// syncify/modes/export.ts
init_cjs_shims();
var import_fs_extra16 = require("fs-extra");
var import_pathe19 = require("pathe");
var import_fast_glob4 = require("fast-glob");
var import_adm_zip = __toESM(require("adm-zip"));

// syncify/process/validate.ts
init_cjs_shims();
var import_pathe16 = require("pathe");
var import_fast_glob3 = require("fast-glob");
var import_prompts3 = __toESM(require("prompts"));
async function hasTemplateMismatch(cwd) {
  const files = await (0, import_fast_glob3.glob)("templates/*", { cwd, absolute: true });
  const exclude = /* @__PURE__ */ new Set();
  const exists2 = /* @__PURE__ */ new Set();
  for (const file of files) {
    const { name } = (0, import_pathe16.parse)(file);
    const templates = files.filter((path2) => (0, import_pathe16.parse)(path2).name === name);
    if (templates.length > 1 && !exists2.has(name)) exists2.add(name);
  }
  if (exists2.size === 0) return 1 /* None */;
  if (exists2.size > 1) {
    write2(`${bold2(`${exists2.size}`)} mismatch template files`, {
      suffix: "error",
      type: "error"
    });
  } else {
    write2(`${bold2(`${exists2.size}`)} mismatch template file`, {
      suffix: "error",
      type: "error"
    });
  }
  const resume = prompt(`select ${bold2(".json")} or ${bold2(".liquid")} template`, {
    title: "Export Error",
    message: "Multiple templates detected"
  });
  const { action } = await (0, import_prompts3.default)([
    {
      name: "action",
      type: "select",
      message: "Select an Option",
      hint: " ",
      instructions: false,
      choices: [
        {
          title: "Select Templates",
          description: "Choose which templates to export",
          value: "select"
        },
        {
          title: "Export .json Templates",
          description: "Exports the .json templates",
          value: "json"
        },
        {
          title: "Export .liquid Templates",
          description: "Exports the .liquid templates",
          value: "liquid"
        },
        {
          title: "Cancel Export",
          value: "cancel"
        }
      ]
    }
  ]);
  if (action === "select") {
    const choices = [];
    for (const name of exists2) {
      choices.push({
        name: "choice",
        type: "toggle",
        message: "templates",
        hint: " ",
        active: `${name}.json`,
        inactive: `${name}.liquid`,
        onState: ({ value }) => {
          if (value) {
            exclude.add((0, import_pathe16.join)(cwd, "templates", `${name}.liquid`));
          } else {
            exclude.add((0, import_pathe16.join)(cwd, "templates", `${name}.json`));
          }
        }
      });
    }
    await (0, import_prompts3.default)(choices).then(() => resume());
    return exclude;
  } else if (action === "json") {
    for (const name of exists2) {
      exclude.add((0, import_pathe16.join)(cwd, "templates", `${name}.json`));
    }
    resume();
    return exclude;
  } else if (action === "liquid") {
    for (const name of exists2) {
      exclude.add((0, import_pathe16.join)(cwd, "templates", `${name}.liquid`));
    }
    resume();
    return exclude;
  } else if (action === "cancel") {
    resume();
  }
  return 2 /* Cancel */;
}
function isEmptyOutputDir(stats) {
  if (stats.assets === 0 && stats.config === 0 && stats.templates === 0 && stats.layout === 0 && stats.snippets === 0 && stats.sections === 0) {
    throwError("Empty output directory", [
      `There are no files within ${neonCyan((0, import_pathe16.relative)($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
}

// syncify/options/files.ts
init_cjs_shims();
var import_dotenv = __toESM(require("dotenv"));
var import_pathe18 = require("pathe");
var import_fs_extra15 = require("fs-extra");

// syncify/requests/require.ts
init_cjs_shims();
var import_node_url2 = require("url");
var import_fs_extra14 = require("fs-extra");
var import_pathe17 = require("pathe");
var import_esbuild2 = require("esbuild");
function findUp(name, startDir, stopDir = (0, import_pathe17.parse)(startDir).root) {
  let dir = startDir;
  while (dir !== stopDir) {
    const file = (0, import_pathe17.join)(dir, name);
    if ((0, import_fs_extra14.existsSync)(file)) return file;
    if ((0, import_pathe17.extname)(file) !== ".json") {
      const path2 = file + ".json";
      if ((0, import_fs_extra14.existsSync)(path2)) return path2;
    }
    dir = (0, import_pathe17.dirname)(dir);
  }
  return null;
}
function getTSConfigFromFile(cwd, filename) {
  if (!(0, import_fs_extra14.existsSync)((0, import_pathe17.join)(cwd, filename))) return null;
  return (0, import_pathe17.isAbsolute)(filename) ? (0, import_fs_extra14.existsSync)(filename) ? filename : null : findUp(filename, cwd);
}
function getTSConfigFromExtends(cwd, name) {
  if ((0, import_pathe17.isAbsolute)(name)) return (0, import_fs_extra14.existsSync)(name) ? name : null;
  if (name.startsWith(".")) return findUp(name, cwd);
  return require.resolve(name, { paths: [cwd] });
}
function getTSConfig(dir = process.cwd(), name = "tsconfig.json", isExtends = false) {
  dir = (0, import_pathe17.resolve)(dir);
  const id = isExtends ? getTSConfigFromExtends(dir, name) : getTSConfigFromFile(dir, name);
  if (!id) return null;
  const data = jsonc((0, import_fs_extra14.readFileSync)(id, "utf-8"));
  const configDir = (0, import_pathe17.dirname)(id);
  if (has("baseURL", data.compilerOptions)) {
    data.compilerOptions.baseUrl = (0, import_pathe17.join)(configDir, data.compilerOptions.baseUrl);
  }
  const extendsFiles = [];
  if (data.extends) {
    const extendsList = isArray2(data.extends) ? data.extends : [data.extends];
    const extendsData = {};
    for (const name2 of extendsList) {
      const parentConfig = getTSConfig(configDir, name2, true);
      if (parentConfig) {
        assign(extendsData, {
          ...parentConfig?.data,
          compilerOptions: {
            ...extendsData.compilerOptions,
            ...parentConfig?.data?.compilerOptions
          }
        });
        extendsFiles.push(...parentConfig.files);
      }
    }
    assign(data, {
      ...extendsData,
      ...data,
      compilerOptions: {
        ...extendsData.compilerOptions,
        ...data.compilerOptions
      }
    });
  }
  delete data.extends;
  return {
    path: id,
    data,
    files: [...extendsFiles, id]
  };
}
function loadTSConfig(dir, name) {
  return getTSConfig(dir, name);
}
function defaultGetOutputFile(path2, format) {
  return path2.replace(REGEX_EXTJS, `.bundled_${uuid()}.${format === "esm" ? "mjs" : "cjs"}`);
}
function isCommonJSorESM(inputFile) {
  if (typeof jest === "undefined") return "cjs";
  const ext = (0, import_pathe17.extname)(inputFile);
  if (ext === ".js") {
    return $.pkg.type === "module" ? "esm" : "cjs";
  } else if (ext === ".ts") {
    return "esm";
  } else if (ext === ".mjs") {
    return "esm";
  }
  return "cjs";
}
function tsconfigPathsToRegExp(paths2) {
  return paths2 === null ? null : keys(paths2 || {}).map((key) => new RegExp(`^${key.replace(/\*/, ".*")}$`));
}
function match(id, patterns) {
  if (!patterns) return false;
  return patterns.some((p) => {
    if (isRegex(p)) return p.test(id);
    return id === p || id.startsWith(p + "/");
  });
}
function externalPlugin({
  external,
  notExternal
} = {}) {
  return {
    name: "bundle-require:external",
    setup({ onResolve }) {
      onResolve({ filter: /.*/ }, async (args) => {
        if (args.path.charCodeAt(0) === 46 || (0, import_pathe17.isAbsolute)(args.path)) return;
        if (match(args.path, external)) return { external: true };
        if (match(args.path, notExternal)) return;
        return { external: true };
      });
    }
  };
}
function injectFileScopePlugin() {
  return {
    name: "bundle-require:inject-file-scope",
    setup(ctx) {
      ctx.initialOptions.define = {
        ...ctx.initialOptions.define,
        __dirname: "__injected_dirname__",
        __filename: "__injected_filename__",
        "import.meta.url": "__injected_import_meta_url__"
      };
      ctx.onLoad({ filter: REGEX_EXTJS }, async (args) => {
        const contents = await (0, import_fs_extra14.readFile)(args.path, "utf-8");
        const injectLines = [
          `const __injected_filename__ = ${JSON.stringify(args.path)};`,
          `const __injected_dirname__ = ${JSON.stringify((0, import_pathe17.dirname)(args.path))};`,
          `const __injected_import_meta_url__ = ${JSON.stringify((0, import_node_url2.pathToFileURL)(args.path).href)};`
        ];
        return {
          contents: glue(injectLines) + contents,
          loader: inferLoader((0, import_pathe17.extname)(args.path))
        };
      });
    }
  };
}
async function bundleRequire(options) {
  if (!REGEX_EXTJS.test(options.filepath)) {
    throw new Error(`${options.filepath} is not a valid JS file`);
  }
  const preserveTemporaryFile = options.preserveTemporaryFile ?? !!process.env.BUNDLE_REQUIRE_PRESERVE;
  const cwd = options.cwd || $.cwd;
  const format = options.format ?? isCommonJSorESM(options.filepath);
  const tsc = options.tsconfig === null ? null : loadTSConfig(cwd, options.tsconfig);
  const resolvePaths = tsconfigPathsToRegExp(tsc?.data.compilerOptions?.paths || {});
  async function extractResult(result) {
    if (!result.outputFiles) {
      throw new Error("[bundle-require] no output files");
    }
    const { text } = result.outputFiles[0];
    const getOutputFile = options.getOutputFile || defaultGetOutputFile;
    const outfile = (0, import_pathe17.join)($.dirs.cache, getOutputFile(options.filepath, format));
    (0, import_fs_extra14.writeFileSync)(outfile, text, "utf8");
    let mod;
    const req = options.require || dynamicImport;
    try {
      mod = await req(format === "esm" ? (0, import_node_url2.pathToFileURL)(outfile).href : outfile, { format });
    } finally {
      if (!preserveTemporaryFile) await (0, import_fs_extra14.unlink)(outfile);
    }
    return {
      mod,
      dependencies: result.metafile ? keys(result.metafile.inputs) : []
    };
  }
  ;
  const ctx = await (0, import_esbuild2.build)({
    ...options.esbuildOptions,
    entryPoints: [options.filepath],
    absWorkingDir: cwd,
    outfile: "out.js",
    format,
    write: false,
    platform: "node",
    sourcemap: "inline",
    bundle: true,
    metafile: true,
    plugins: [
      ...has("plugins", options.esbuildOptions) ? options.esbuildOptions.plugins : [],
      externalPlugin({
        external: options.external,
        notExternal: resolvePaths
      }),
      injectFileScopePlugin()
    ]
  });
  const extract2 = await extractResult(ctx);
  return extract2;
}

// syncify/options/files.ts
async function configFile(cwd) {
  let path2 = null;
  for (const file of SYNCIFY_CONFIG) {
    path2 = (0, import_pathe18.join)(cwd, file);
    const exists2 = await (0, import_fs_extra15.pathExists)(path2);
    if (exists2) break;
    path2 = null;
  }
  if (path2 === null) return null;
  try {
    if ((0, import_pathe18.extname)(path2) === ".json") {
      $.file.path = path2;
      $.file.relative = (0, import_pathe18.relative)(cwd, path2);
      $.file.base = (0, import_pathe18.basename)(path2);
      const json2 = await (0, import_fs_extra15.readFile)(path2);
      return jsonc(json2.toString());
    } else {
      $.file.path = path2;
      $.file.relative = (0, import_pathe18.relative)(cwd, path2);
      $.file.base = (0, import_pathe18.basename)(path2);
      const config = await bundleRequire({
        cwd,
        filepath: path2
      });
      return config.mod.syncify || config.mod.default || config.mod;
    }
  } catch (e) {
    const jsonconfig = (0, import_pathe18.join)(cwd, "syncify.config.json");
    const hasFile = await (0, import_fs_extra15.pathExists)(jsonconfig);
    if (hasFile) return (0, import_fs_extra15.readJson)(jsonconfig);
    return null;
  }
}
async function getPackageJson(cli) {
  const uri = (0, import_pathe18.join)(cli.cwd, "package.json");
  const has3 = await (0, import_fs_extra15.pathExists)(uri);
  if (!has3) throw new Error('Missing "package.json" file');
  try {
    $.pkg = await (0, import_fs_extra15.readJson)(uri);
    if (hasPath("syncify.stores", $.pkg)) {
      if (isArray2($.pkg.syncify.stores)) {
        $.stores = $.pkg.syncify.stores;
      } else if (isObject($.pkg.syncify.stores) && isEmpty2($.pkg.syncify.stores) === false) {
        $.stores = [$.pkg.syncify.stores];
      }
    } else {
      if (cli.strap === null) {
        missingStores(cli.cwd);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function setPkgVersion(current, increment) {
  const uri = (0, import_pathe18.join)($.cwd, "package.json");
  try {
    const pkg = await (0, import_fs_extra15.readFile)(uri);
    const str = pkg.toString();
    const ver = str.indexOf('"version"');
    const sqo = str.indexOf('"', ver + 10) + 1;
    const eqo = str.indexOf('"', sqo + 1);
    const num = str.slice(sqo, eqo);
    if (num === current) {
      await (0, import_fs_extra15.writeFile)(uri, `${str.slice(0, sqo)}${increment}${str.slice(eqo)}`);
      await getPackageJson($.cli);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function getEnvFile(cli) {
  let path2 = (0, import_pathe18.join)(cli.cwd, ".env");
  if (await (0, import_fs_extra15.pathExists)(path2)) {
    const env2 = import_dotenv.default.config({ path: path2 });
    if (env2.error) {
      throws(env2.error, { path: path2 });
      return null;
    }
    $.env.file = path2;
    $.env.vars = env2.parsed;
  } else {
    path2 = (0, import_pathe18.join)(cli.cwd, "syncify.env");
    if (await (0, import_fs_extra15.pathExists)(path2)) {
      const env2 = import_dotenv.default.config({ path: path2 });
      if (env2.error) {
        throws(env2.error.message, { path: path2 });
        return null;
      }
      $.env.file = path2;
      $.env.vars = env2.parsed;
    } else {
      if (cli.setup === false && cli.strap === null) {
        missingEnv(cli.cwd);
      }
    }
  }
}

// syncify/modes/export.ts
async function exporting(cb) {
  let { themeVersion } = $.cache.build;
  timer.start("export");
  if ($.mode.build) {
    group("Build");
    await build(cb);
  } else {
    isEmptyOutputDir($.stats);
  }
  const validate2 = await hasTemplateMismatch($.dirs.output);
  if (validate2 === 2 /* Cancel */) return;
  if (validate2 === 1 /* None */) {
    if ($.mode.build) {
      timer.stop("build");
    }
  }
  if ($.mode.publish) {
    title("Exporting");
  } else {
    group("Export");
  }
  nwl();
  if (!await (0, import_fs_extra16.pathExists)($.dirs.export)) {
    await (0, import_fs_extra16.mkdir)($.dirs.export);
  }
  const zip = new import_adm_zip.default();
  for (const dir of THEME_DIRS) {
    const uri = (0, import_pathe19.join)($.dirs.output, dir);
    const has3 = await (0, import_fs_extra16.pathExists)(uri);
    if (has3) {
      const files = await (0, import_fast_glob4.glob)("*", { cwd: uri, absolute: true });
      for (const file of files) {
        const path2 = `${dir}/${(0, import_pathe19.basename)(file)}`;
        const stat2 = (0, import_fs_extra16.statSync)(file);
        if (stat2.size === 0) {
          zip.addFile(path2, toBuffer(" "));
          warn2(path2, "empty file");
        } else {
          if (validate2 === 1 /* None */ || validate2.has(file) === false) {
            zip.addLocalFile(file, dir);
          }
        }
      }
    }
  }
  const size2 = byteSize(zip.toBuffer());
  if ($.vc.update !== null) {
    if (!await (0, import_fs_extra16.pathExists)($.vc.update.dir)) await (0, import_fs_extra16.mkdir)($.vc.update.dir);
    version($.vc, "bump");
    zipped(stringSize(size2), (0, import_pathe19.relative)($.cwd, $.vc.update.zip));
    try {
      await zip.writeZipPromise($.vc.update.zip);
      themeVersion = $.vc.update.number;
    } catch (e) {
      return throws(e, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  } else {
    if (!await (0, import_fs_extra16.pathExists)($.vc.dir)) {
      await (0, import_fs_extra16.mkdir)($.vc.dir);
      version($.vc, "created");
    } else {
      version($.vc, "overwrite");
    }
    zipped(stringSize(size2), (0, import_pathe19.relative)($.cwd, $.vc.zip));
    try {
      await zip.writeZipPromise($.vc.zip);
    } catch (e) {
      return throws(e, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  }
  if ($.pkg.version !== themeVersion) {
    const bump = await setPkgVersion($.pkg.version, themeVersion);
    if (bump) {
      process7("package.json", "version bumped");
      $.cache.build.themeVersion = themeVersion;
      await saveCache("build");
    } else {
      warn2("package.json version failed to bump", "manual increment required");
    }
  }
  timer.stop("export");
  if ($.mode.publish === false) {
    group();
    nwl("");
    process.exit(0);
  }
}

// syncify/modes/publish.ts
init_cjs_shims();
var import_uWebSockets = __toESM(require("uWebSockets.js"));
var import_prompts4 = __toESM(require("prompts"));
var import_fs_extra17 = require("fs-extra");
async function publish(cb) {
  await exporting(cb);
  timer.start("publish");
  title("Publishing");
  const app = import_uWebSockets.default.App().get("/*", (response, request2) => {
    response.writeHeader("Access-Control-Allow-Origin", "*");
    response.writeHeader("Cache-Control", "public, max-age=0");
    const uri = $.vc.dir + request2.getUrl();
    (0, import_fs_extra17.existsSync)(uri) ? response.end((0, import_fs_extra17.readFileSync)(uri)) : response.endWithoutBody();
  }).listen($.publish.tunnelPort, (token) => {
    if (!token) {
      console.log("Failed to listen to port " + $.publish.tunnelPort);
    }
  });
  await delay(500);
  timer.start("ngrok");
  const src = `${$.vc.number}.zip`;
  write2(gray2(src), { prefix: "server" });
  for (const store of $.sync.stores) {
    timer.start(store.domain);
    write2(store.domain, { prefix: "webshop", color: neonCyan });
    write2(`${bold2("role")} ${ARR} ${$.publish.publishRole}`, { prefix: "publish" });
    write2(bold2(`v${$.vc.number}`), { prefix: "version", color: magentaBright2 });
    nwl();
    await delay(1e3);
    spinner("uploading", {
      style: "spinning",
      color: neonGreen
    });
    await delay(2e3);
    spinner.update("dispatched");
    await delay(2e3);
    spinner.update("extracting");
    await delay(2e3);
    spinner.update("processing");
    await delay(1e3);
    spinner.stop("done");
    write2(`${bold2("published")} ${ARR} ${store.domain}`, {
      prefix: "status",
      color: neonGreen,
      suffix: timer.now(store.domain)
    });
  }
  app.close();
  nwl();
  group();
  nwl();
  await (0, import_prompts4.default)([
    {
      name: "action",
      hint: " ",
      type: "select",
      message: "Post-Publishing",
      choices: [
        {
          title: "Update Config",
          value: "config"
        },
        {
          title: "Publish Themes",
          value: "publish"
        },
        {
          title: "Delete Themes",
          value: "delete"
        }
      ]
    }
  ]);
}

// syncify/log/stdin.ts
init_cjs_shims();
function stdin(data) {
  const input = data.toString().trim().toLowerCase();
  if (input === "v") {
    const items = keys($.errors);
    for (let i = 0, l = items.length; i < l; i++) {
      const prop = items[i];
      if ($.errors[prop].size === 0) continue;
      if (i > 0) hline();
      write2(bold2.whiteBright(prop));
      for (const message of $.errors[prop].values()) {
        if (isString(message) && message.length > 0) {
          error(message);
        }
      }
      $.errors[prop].clear();
    }
    if ($.mode.upload) {
      group();
      process.exit(0);
    }
  } else if (input === "s") {
    for (const message of $.errors) {
      if (isString(message) && message.length > 0) {
        error(message);
      }
    }
    $.errors.clear();
  } else if (input === "w") {
    const warnings2 = $.warnings[$.log.uri];
    for (const prop of warnings2.keys()) {
      const warning = warnings2.get(prop);
      if (warning.size === 0) continue;
      const message = Create({ type: "warning" }).Newline("yellow").Ruler().Newline("yellow").Line(prop.toUpperCase(), bold2.yellow).Newline("yellow");
      for (const text of warning.values()) {
        if (isString(text) && text.length > 0) {
          message.Line(text);
        }
      }
      warn(message.toString());
      warning.clear();
    }
  }
}

// syncify/log/help.ts
init_cjs_shims();
function help(cli) {
  log(clear2);
  const DSH2 = lightGray("-".repeat(80));
  const usage = `
    ${bold2("SYNCIFY CLI  " + ARR + whiteBright2("  v0.3.0-beta"))}

    ${whiteBright2("Please provide a command argument.")}

    ${bold2("USAGE" + COL)}

    $ syncify                    ${gray2.italic("Show this screen")}
    $ syncify {store} [theme]    ${gray2.italic("Store and theme targeting")}

    ${bold2("HELP" + COL)}

    -h, --help                   ${gray2.italic("Print a list of all available commands")}
    -h, --help examples          ${gray2.italic("Print a list of command examples")}

  `;
  if (cli.help === null) {
    return log(usage);
  }
  const examples = `
    ${bold2("SYNCIFY CLI  " + ARR + whiteBright2("  v0.3.0-beta"))}

    Below are some usage examples for working with the Syncify CLI.
    The ${gray2("=")} character is optional and samples are using the ${gray2("$ sy")} alias.

    ${bold2("TARGETING" + COL)}

    ${gray2("Target 1 store and 1 theme")}:
    $ sy your-store${gray2("=")}theme-1

    ${gray2("Target 1 store and 2 theme")}:
    $ sy your-store${gray2("=")}theme-1,some-theme,test-theme

    ${gray2("Target 2 stores and 1 theme")}:
    $ sy ---your-store${gray2("=")}theme-1 --another-store${gray2("=")}some-theme

    ${gray2("Target 2 stores and 4 theme")}:
    $ sy --your-store${gray2("=")}theme-1,theme-2 --another-store${gray2("=")}some-theme,test-theme

  ${DSH2}

    ${bold2("BUILDING" + COL)}

    ${gray2("Build theme from source")}:
    $ sy --build

    ${gray2("Build theme with terse minification")}:
    $ sy --build --terse

    ${gray2("Build theme and clean")}:
    $ sy --build --clean --terse

  ${DSH2}

    ${bold2("WATCHING" + COL)}

    ${gray2("Watch 1 store and 1 theme")}:
    $ sy your-store${gray2("=")}theme-1 --watch

    ${gray2("Watch 1 store and 2 themes with hot reloading")}:
    $ sy your-store${gray2("=")}theme-1,theme-2 --watch --hot

    ${gray2("Watch 2 stores and 1 theme")}:
    $ sy --your-store${gray2("=")}theme-1 --another-store${gray2("=")}some-theme --watch

    ${gray2("Watch 2 stores and 2 themes")}:
    $ sy --your-store${gray2("=")}theme-1,theme-2 --another-store${gray2("=")}some-theme,test-theme --watch

    ${gray2("Watch 1 store with 2 themes and clean mode with hot live reloads")}:
    $ sy your-store${gray2("=")}theme-1,theme-2 --watch --clean --hot

    ${gray2("Watch 1 store with 2 themes in production mode")}:
    $ sy your-store${gray2("=")}theme-1,theme-2 --prod --watch

  `;
  const commands = `
    ${bold2("SYNCIFY CLI  " + ARR + whiteBright2("  v0.3.0-beta"))}

    Welcome to the Syncify CLI. The command line utility assumes that you have
    defined stores, themes and setup credentials within a ${gray2(".env")} file.

    ${bold2("ALIASES" + COL)}

      $ sy                         ${gray2.italic("Shorthand for syncify")}

    ${bold2("COMMANDS" + COL)}

      $ syncify                    ${gray2.italic("Show this screen")}
      $ syncify {store} [theme]    ${gray2.italic("Store and theme targeting")}

    ${bold2("THEMES" + COL)}

        --{store} [theme]          ${gray2.italic("A store reference command (run examples)")}
      -t, --theme [theme]          ${gray2.italic("A comma seprated list of themes")}

    ${bold2("PATHS" + COL)}

      -c, --config    <path>       ${gray2.italic("Set config directory path")}
      -i, --input     <path>       ${gray2.italic("Set input directory path")}
      -o, --output    <path>       ${gray2.italic("Set output directory path")}

    ${bold2("MODES" + COL)}

      -w, --watch                  ${gray2.italic("Run watch mode")}
      -b, --build                  ${gray2.italic("Run build mode from input")}
      -u, --upload                 ${gray2.italic("Run upload mode theme to stores")}
      -d, --import                 ${gray2.italic("Run download mode from theme and stores")}
      -e, --export                 ${gray2.italic("Run export mode and generate theme zip")}
      -p, --publish                ${gray2.italic("Run publish and create a release")}
      -r, --resource               ${gray2.italic("Run resource mode, resource name expected")}

    ${bold2("RESOURCES" + COL)}

      -r, --resource themes        ${gray2.italic("Run the themes resource")}
      -r, --resource assets        ${gray2.italic("Run the theme assets resource")}
      -r, --resource pages         ${gray2.italic("Run the pages resource")}
      -r, --resource metafields    ${gray2.italic("Run the metafields resource")}
      -r, --resource redirects     ${gray2.italic("Run the redirects resource")}
      -r, --resource files         ${gray2.italic("Run the files resource")}

    ${bold2("ENVIRONMENT" + COL)}

      --dev                       ${gray2.italic("Build in development mode (default)")}
      --prod                      ${gray2.italic("Build in production mode")}
      --hot                       ${gray2.italic("Run watch with hot-reloads")}

    ${bold2("OPERATIONS" + COL)}

      --clean                     ${gray2.italic("Clean the output, use with modes")}
      --silent                    ${gray2.italic("Silent logging, only errors will print")}
      --cache                     ${gray2.italic("Purges the local .cache references")}

    ${bold2("TRIGGERS" + COL)}

      --spawn  [list]             ${gray2.italic("Invoke a defined spawn child process/s")}
      --delete [list]             ${gray2.italic("Delete a remote and local file")}
      --terse  [list]             ${gray2.italic("invoke minify mode, accepts resource/s")}

    ${bold2("TRANSFORMS" + COL)}

      --script                    ${gray2.italic("Run the script transform in isolation")}
      --style                     ${gray2.italic("Run the style transform in isolation")}
      --svg                       ${gray2.italic("Run the svg transform in isolation")}
      --image                     ${gray2.italic("Run the image transform in isolation")}

    ${bold2("UTILITY" + COL)}

      -f, --filter <path>         ${gray2.italic("Filter operation to be used with modes")}

    ${bold2("VERSIONING" + COL)}

      --bump patch                ${gray2.italic("Apply a patch version bump, use in export mode")}
      --bump minor                ${gray2.italic("Apply a minor version bump, use in export mode")}
      --bump major                ${gray2.italic("Apply a major version bump, use in export mode")}

    ${bold2("STRAPS" + COL)}

      --strap dusk                ${gray2.italic("Import and generate a dusk strap")}
      --strap dawn                ${gray2.italic("Import and generate a dawn strap")}
      --strap silk                ${gray2.italic("Import and generate a silk strap")}

    ${bold2("HELP" + COL)}

      -h, --help                  ${gray2.italic("Print this screen")}
      -h, --help examples         ${gray2.italic("Print a list of command examples")}

    ${DSH2}

    ${gray2("BY \u039D\u0399\u039A\u039F\u039B\u0391\u03A3 \u03A3\u0391\u0392\u0392\u0399\u0394\u0397\u03A3")}

    ${gray2.underline("https://github.com/panoply")}
    ${gray2.underline("https://x.com/niksavvidis")}

  `;
  log(cli.help === "examples" ? examples : commands);
}

// syncify/options/define.ts
init_cjs_shims();
var import_chokidar = require("chokidar");

// syncify/options/dirs.ts
init_cjs_shims();
var import_fs_extra18 = require("fs-extra");
var import_pathe20 = require("pathe");
async function setCacheDirs() {
  await createDirs($.dirs.cache);
  await createDirs($.dirs.sourcemaps.root);
  return Promise.all(
    [
      createDirs($.dirs.sourcemaps.scripts),
      createDirs($.dirs.sourcemaps.styles)
    ]
  );
}
async function setThemeDirs(basePath2) {
  if (!basePath2) basePath2 = $.dirs.output;
  if (await (0, import_fs_extra18.pathExists)(basePath2)) {
    if ($.mode.clean) {
      try {
        await (0, import_fs_extra18.emptyDir)(basePath2);
      } catch (e) {
        throw new Error(e);
      }
    }
  } else {
    try {
      await (0, import_fs_extra18.mkdir)(basePath2);
    } catch (e) {
      throw new Error(e);
    }
  }
  for (const dir of THEME_DIRS) {
    const uri = (0, import_pathe20.join)(basePath2, dir);
    const name = dir.startsWith("templates/") ? dir.slice(10) : dir;
    if (!await (0, import_fs_extra18.pathExists)(uri)) {
      try {
        await (0, import_fs_extra18.mkdir)(uri);
        $.stats[name] = 0;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      $.stats[name] = (0, import_fs_extra18.readdirSync)(uri).length;
    }
  }
}
async function setBaseDirs(cli) {
  const base = basePath($.cwd);
  for (const [dir, def] of BASE_DIRS) {
    if (dir === "cache") {
      $.dirs[dir] = (0, import_pathe20.join)($.cwd, def, ".syncify");
      $.dirs.sourcemaps = create(null);
      $.dirs.sourcemaps.root = (0, import_pathe20.join)($.dirs[dir], "sourcemaps");
      $.dirs.sourcemaps.scripts = (0, import_pathe20.join)($.dirs.sourcemaps.root, "scripts");
      $.dirs.sourcemaps.styles = (0, import_pathe20.join)($.dirs.sourcemaps.root, "styles");
      continue;
    }
    if (dir === "import") {
      $.dirs[dir] = base($.mode.import && has2("output", cli) ? cli.output : $.config.import);
      continue;
    } else if (dir === "export") {
      $.dirs[dir] = base($.mode.export && has2("output", cli) ? cli.output : $.config.export);
      continue;
    } else if (has2(dir, cli) && cli[dir] === def && $.config[dir] === def) {
      $.dirs[dir] = base(cli[dir]);
      continue;
    }
    const path2 = isString(cli[dir]) ? cli[dir] : $.config[dir];
    if (isString(path2)) {
      $.dirs[dir] = base(path2);
    } else {
      typeError({
        option: "config",
        name: dir,
        provided: path2,
        expects: "string"
      });
    }
  }
  $.watch.add($.file.path);
}
async function setImportDirs() {
  const { dirs, sync: sync4, mode } = $;
  if (!mode.import) return;
  if (!await (0, import_fs_extra18.pathExists)(dirs.import)) {
    try {
      await (0, import_fs_extra18.mkdir)(dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }
  for (const theme3 in sync4.themes) {
    const { store, target } = sync4.themes[theme3];
    const dir = (0, import_pathe20.join)(dirs.import, store);
    if (await (0, import_fs_extra18.pathExists)(dir)) {
      if (mode.clean) {
        try {
          await (0, import_fs_extra18.emptyDir)(dir);
        } catch (e) {
          throw new Error(e);
        }
      }
    } else {
      try {
        await (0, import_fs_extra18.mkdir)(dir);
      } catch (e) {
        throw new Error(e);
      }
    }
    await setThemeDirs((0, import_pathe20.join)(dir, target));
  }
}
async function createDirs(path2) {
  if (isArray2(path2)) {
    for (const uri of path2) {
      if (!await (0, import_fs_extra18.pathExists)(uri)) {
        try {
          await (0, import_fs_extra18.mkdir)(uri);
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  } else {
    if (!await (0, import_fs_extra18.pathExists)(path2)) {
      try {
        await (0, import_fs_extra18.mkdir)(path2);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}

// syncify/options/json.ts
init_cjs_shims();
var import_anymatch3 = __toESM(require_anymatch());

// syncify/utils/options.ts
init_cjs_shims();
var import_pathe21 = require("pathe");
var import_fast_glob5 = __toESM(require("fast-glob"));
var import_anymatch2 = __toESM(require_anymatch());
var import_fs_extra19 = require("fs-extra");
function getStoresFromEnv() {
  const stores = [];
  const admin = /* @__PURE__ */ new Set();
  for (const prop in $.env.vars) {
    const p = prop.toLowerCase();
    if (p.endsWith("_api_token")) {
      stores.push({
        domain: `${p.slice(0, p.indexOf("_api_token"))}`,
        themes: {}
      });
    } else if (p.endsWith("_api_key")) {
      const domain = `${p.slice(0, p.indexOf("_api_key"))}`;
      if (!admin.has(domain)) {
        stores.push({ domain, themes: {} });
        admin.add(domain);
      }
    } else if (p.endsWith("_api_secret")) {
      const domain = `${p.slice(0, p.indexOf("_api_secret"))}`;
      if (!admin.has(domain)) {
        stores.push({ domain, themes: {} });
        admin.add(domain);
      }
    }
  }
  if (stores.length > 0) return stores;
  missingEnv($.cwd);
}
function authURL(domain) {
  let api_token = domain + "_api_token";
  if (!has2(api_token, $.env.vars)) {
    api_token = api_token.toUpperCase();
  }
  if (has2(api_token, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { "X-Shopify-Access-Token": $.env.vars[api_token] }
    };
  }
  let api_key = domain + "_api_key";
  let api_secret = domain + "_api_secret";
  if (!has2(api_key, $.env.vars)) {
    api_key = api_key.toUpperCase();
  }
  if (!has2(api_secret, $.env.vars)) {
    api_secret = api_secret.toUpperCase();
  }
  if (has2(api_key, $.env.vars) && has2(api_secret, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: $.env.vars[api_key],
        password: $.env.vars[api_secret]
      }
    };
  }
  throwError(
    `Invalid or missing ${cyan2(domain + ".myshopify.com")} credentials`,
    [
      `Your shop credentials in the ${cyan2.bold((0, import_pathe21.basename)($.env.file))} file could`,
      "not be read correctly or are missing. Please check your environment file and ensure",
      "you have provided valid authorization."
    ]
  );
}
function getResolvedPaths(filePath, hook) {
  const { cwd } = $;
  const match2 = isFunction(hook) ? [] : false;
  const warn3 = warnOption("Path Resolver");
  const path2 = normalPath($.dirs.input, $.cwd);
  if (isArray2(filePath)) {
    const paths2 = [];
    for (const item of filePath) {
      const uri = path2(item);
      const resolved = import_fast_glob5.default.sync(uri, {
        cwd,
        absolute: true
      });
      if (match2 !== false) {
        const test = hook(uri);
        if (isString(test)) {
          match2.push(test);
        } else if (isArray2(test)) {
          match2.push(...test);
        }
      }
      if (resolved.length === 0) {
        warn3("No files can be resolved in", item);
      } else {
        paths2.push(...resolved);
      }
    }
    return match2 === false ? paths2 : { paths: paths2, match: (0, import_anymatch2.default)(match2) };
  }
  if (isString(filePath)) {
    const uri = path2(filePath);
    const paths2 = import_fast_glob5.default.sync(uri, { cwd });
    if (paths2.length === 0) {
      warn3("No files can be resolved in", filePath);
    }
    if (match2 !== false) {
      const test = hook(uri);
      if (isString(test)) {
        match2.push(test);
      } else if (isArray2(test)) {
        match2.push(...test);
      }
    }
    return match2 === false ? paths2 : { paths: paths2, match: (0, import_anymatch2.default)(match2) };
  }
  typeError({
    option: "uri",
    name: "uri/path",
    provided: filePath,
    expects: "string | string[]"
  });
}
function getTransform(transforms, opts) {
  if (!has2("assertSnippet", opts)) opts.assertSnippet = true;
  if (isString(transforms)) {
    const { paths: paths2, match: match2 } = getResolvedPaths(transforms, (watch2) => {
      if (opts.addWatch) $.watch.add(watch2);
      return globPath(watch2);
    });
    if (paths2) {
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: (0, import_pathe21.basename)(input),
          snippet: false
        } : {
          input,
          rename: (0, import_pathe21.basename)(input)
        });
      } else {
        return opts.assertSnippet ? {
          input: paths2,
          rename: "[name].[ext]",
          snippet: false,
          match: match2
        } : {
          input: paths2,
          rename: "[name].[ext]",
          match: match2
        };
      }
    }
  } else if (isArray2(transforms)) {
    if (transforms.every(isString)) {
      const { paths: paths2, match: match2 } = getResolvedPaths(transforms, (watch2) => {
        if (opts.addWatch) $.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: (0, import_pathe21.basename)(input),
          snippet: false
        } : {
          input,
          rename: (0, import_pathe21.basename)(input)
        });
      } else {
        return opts.assertSnippet ? {
          input: paths2,
          rename: "[name].[ext]",
          snippet: false,
          match: match2
        } : {
          input: paths2,
          rename: "[name].[ext]",
          match: match2
        };
      }
    } else if (transforms.every(isObject)) {
      return transforms.map((option) => {
        if (!has2("input", option)) {
          invalidError({
            option: "tranform",
            name: "input",
            value: option,
            expects: "{ input: string | string[] }"
          });
        }
        const { paths: paths2, match: match2 } = getResolvedPaths(option.input, (watch2) => {
          if (opts.addWatch) $.watch.add(watch2);
          return globPath(watch2);
        });
        option.match = match2;
        option.input = paths2[0];
        if (opts.assertSnippet && !has2("snippet", option)) option.snippet = false;
        if (!has2("rename", option)) {
          option.rename = option.snippet ? "[name].liquid" : "[name].[ext]";
        }
        return option;
      });
    }
  } else if (isObject(transforms)) {
    const config = [];
    if (has2("input", transforms)) {
      const record = merge(transforms);
      const { paths: paths2, match: match2 } = getResolvedPaths(record.input, (watch2) => {
        if (opts.addWatch) $.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.assertSnippet && !has2("snippet", record)) {
        record.snippet = false;
      }
      if (!has2("rename", record)) {
        record.rename = record.snippet ? "[name].liquid" : "[name].[ext]";
      }
      if (opts.flatten) {
        for (const input of paths2) {
          config.push(assign({}, record, { input }));
        }
      } else {
        record.input = paths2;
        record.match = match2;
        config.push(record);
      }
    } else {
      for (const prop in transforms) {
        const record = { snippet: prop.startsWith("snippets/") };
        const asset = prop.startsWith("assets/");
        const option = transforms[prop];
        const rename = asset || record.snippet;
        if (isString(option)) {
          if (rename) {
            record.rename = asset ? prop.slice(7) : prop.slice(9);
          }
          const { paths: paths2, match: match2 } = getResolvedPaths(option, (watch2) => {
            if (opts.addWatch) $.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths2) {
            if (opts.flatten) {
              for (const input of paths2) config.push(assign({}, record, { input }));
            } else {
              config.push(assign({}, record, { input: paths2, match: match2 }));
            }
          }
        } else if (isObject(option)) {
          if (!has2("input", option)) {
            invalidError({
              option: "transform",
              name: prop,
              value: option,
              expects: "{ input: string | string[] }"
            });
          }
          const { paths: paths2, match: match2 } = getResolvedPaths(option.input, (watch2) => {
            if (opts.addWatch) $.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths2.length > 0) {
            const merge2 = rename ? assign({}, option, record, { rename: asset ? prop.slice(7) : prop.slice(9) }) : assign({}, record, option);
            if (opts.flatten) {
              for (const input of paths2) {
                config.push(assign({}, merge2, { input }));
              }
            } else {
              config.push(assign(merge2, { input: paths2, match: match2 }));
            }
          }
        } else if (isArray2(option)) {
          if (option.every(isString)) {
            const { paths: paths2, match: match2 } = getResolvedPaths(option, (watch2) => {
              if (opts.addWatch) $.watch.add(watch2);
              return globPath(watch2);
            });
            if (hasRenameNamespace(prop)) record.rename = (0, import_pathe21.basename)(prop);
            if (paths2) {
              if (opts.flatten) {
                for (const input of paths2) {
                  config.push(assign({}, record, { input }));
                }
              } else {
                config.push(assign({}, record, { input: paths2, match: match2 }));
              }
            }
          } else {
            typeError({
              option: "transform",
              name: prop,
              provided: option,
              expects: "string[]"
            });
          }
        }
      }
    }
    return config;
  }
}
function getModules(pkg, name) {
  if (has2("devDependencies", pkg)) {
    if (has2(name, pkg.devDependencies)) return true;
  }
  if (has2("dependencies", pkg)) {
    if (has2(name, pkg.dependencies)) return true;
  }
  if (has2("peerDependencies", pkg)) {
    if (has2(name, pkg.peerDependencies)) return true;
  }
  if (has2("optionalDependencies", pkg)) {
    if (has2(name, pkg.peerDependencies)) return true;
  }
  return false;
}
async function getConfigFilePath(filename) {
  for (const ext of CONFIG_FILE_EXT) {
    const filepath = `${filename}.${ext}`;
    const fileExists = await (0, import_fs_extra19.pathExists)(filepath);
    if (fileExists) return filepath;
  }
  return null;
}
async function readConfigFile(filename, options) {
  try {
    const path2 = await getConfigFilePath(filename);
    if (path2 !== null) {
      const config = await bundleRequire({
        cwd: $.cwd,
        filepath: path2,
        ...options || {}
      });
      return {
        path: path2,
        config: config.mod.syncify || config.mod.default || config.mod
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}
function hasRenameNamespace(rename) {
  return /\[(?:file|name|dir|ext)\]/.test(rename);
}
function renameFile2(src, rename) {
  let name = rename;
  const dir = lastPath(src);
  const ext = (0, import_pathe21.extname)(src);
  const file = (0, import_pathe21.basename)(src, ext);
  if (isUndefined(rename)) return { dir, ext, file, name: file };
  if (/(\[dir\])/.test(name)) name = name.replace("[dir]", dir);
  if (/(\[name\])/.test(name)) name = name.replace("[name]", file);
  if (/(\[file\])/.test(name)) name = name.replace("[file]", file);
  if (/(\.?\[ext\])/.test(name)) name = name.replace(/\.?\[ext\]/, ext);
  return {
    ext,
    file,
    dir,
    name: rename.replace(rename, name)
  };
}

// syncify/options/json.ts
function setJsonOptions() {
  if (!has2("transform", $.config) || !has2("json", $.config.transform)) return;
  const { json: json2 } = $.config.transform;
  if (isNil2(json2)) return;
  if (!isObject(json2)) {
    typeError(
      {
        option: "processors",
        name: "json",
        expects: "{}",
        provided: typeof json2
      }
    );
  }
  if (isEmpty2(json2)) return;
  const warn3 = warnOption("liquid configuration");
  for (const option in json2) {
    if (option === "indent") {
      if (isNumber(json2[option])) {
        $.json[option] = json2[option];
        continue;
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json2[option],
            expects: "number"
          }
        );
      }
    }
    if (option === "comments") {
      if (isBoolean(json2[option])) {
        $.json[option] = json2[option];
        continue;
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json2[option],
            expects: "boolean"
          }
        );
      }
    }
    if (option === "useTab") {
      if (isBoolean(json2[option])) {
        $.json[option] = json2[option];
        continue;
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json2[option],
            expects: "boolean"
          }
        );
      }
    }
    if (option === "exclude") {
      const exclude = isString(json2[option]) ? [json2[option]] : json2[option];
      if (isArray2(exclude)) {
        $.json[option] = (0, import_anymatch3.default)(getResolvedPaths(json2[option]));
        continue;
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: exclude[option],
            expects: "string | string[]"
          }
        );
      }
    }
    if (option === "terse" && $.mode.terse === true) {
      if (isEmpty2(json2.terse)) {
        $.json.terse.enabled = false;
        warn3("Terse option is empty, minification will not apply");
      } else if (isBoolean(json2.terse) && json2.terse === true) {
        $.json.terse.enabled = true;
      } else if (isObject(json2.terse)) {
        $.json.terse.enabled = true;
        for (const p in json2.terse) {
          if (p !== "exclude" && has2(p, $.json.terse)) {
            if (isBoolean(json2.terse[option])) {
              $.json.terse[p] = json2.terse[p];
              continue;
            } else {
              typeError(
                {
                  option: `json ${ARR} terse`,
                  name: p,
                  provided: json2.terse[p],
                  expects: "boolean"
                }
              );
            }
          } else if (p === "exclude") {
            $.json.terse.exclude = (0, import_anymatch3.default)(getResolvedPaths(json2.terse[option]));
          }
        }
      }
    }
  }
}

// syncify/options/modes.ts
init_cjs_shims();
function setModes(cli) {
  const resource2 = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transform3 = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  const watch2 = anyTrue(resource2, cli.upload, cli.import) ? false : cli.watch;
  $.mode = assign($.mode, {
    watch: watch2,
    dev: !cli.prod,
    prod: cli.prod,
    setup: cli.setup,
    strap: cli.strap !== null,
    hot: allTrue(cli.watch, cli.hot),
    interactive: cli.interactive,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    cache: allTrue(cli.build, cli.cache),
    force: cli.force,
    views: cli.views,
    script: transform3 ? cli.script : false,
    style: transform3 ? cli.style : false,
    image: transform3 ? cli.image : false,
    svg: transform3 ? cli.svg : false,
    terse: anyTrue(cli.terse, cli.prod),
    clean: anyTrue(resource2, transform3, cli.upload) ? false : allTrue(cli.export, cli.build) || cli.clean,
    build: anyTrue(cli.watch, cli.import) ? false : cli.build,
    upload: anyTrue(transform3, watch2) ? false : cli.upload,
    export: cli.export,
    import: anyTrue(resource2, transform3, cli.upload, cli.watch, cli.build) ? false : cli.import,
    publish: cli.publish,
    release: isString(cli.release),
    themes: cli._[0] === "themes"
  });
  if ($.mode.themes) {
    cli._ = [];
    return;
  }
  validateCommands($.mode, cli);
  if ($.mode.release) {
    $.mode.clean = true;
    $.mode.build = true;
    $.mode.export = true;
    $.mode.publish = true;
  }
  if ($.mode.build) {
    const build3 = allFalse(
      $.mode.script,
      $.mode.style,
      $.mode.svg,
      $.mode.pages,
      $.mode.metafields,
      $.mode.image
    );
    if (build3) {
      $.mode.script = true;
      $.mode.style = true;
      $.mode.svg = true;
      $.mode.image = true;
      $.mode.views = true;
    }
  }
}
function validateCommands(modes, cli) {
  if (cli.cache && cli.build === false) {
    invalidCommand({
      expected: "-b, --build",
      message: [
        "Cache resets can only be executed along side build operations"
      ],
      fix: [
        `Attempting to purge cache outside ${bold2("build")} mode Syncify requires you to pass`,
        "the build mode flags when executing a cache reset, for example:",
        "\n\n",
        `${whiteBright2("$")} ${white2(`syncify ${$.argv} ${blue2("-b --cache")}`)}`,
        "\n\n",
        `Run ${gray2("syncify --help")} for more information, or pass an execution`,
        `operation mode as per the ${whiteBright2("expected")} value.`,
        "\n\n"
      ]
    });
  }
  if (values(modes).every((cmd) => cmd === false)) {
    invalidCommand(
      {
        expected: "--<cmd>",
        message: [
          "Execution is unclear, you have not provided Syncify with a valid operation",
          "mode to execute"
        ],
        fix: [
          "Syncify requires that you provide an operation. In most cases, this",
          "error occurs when you have forgotten to pass the mode, for example:",
          "\n\n",
          `${whiteBright2("$")} ${whiteBright2(`syncify ${LAN}${cyan2("mode")}${RAN}`)}`,
          "\n\n",
          `Run ${blue2("syncify --help")} for more information`
        ]
      }
    );
  }
  if (modes.export) {
    const props = keys(modes);
    props.push(
      "filter",
      // -f
      "delete",
      // -d
      "spawn",
      // -s
      "resource"
      // -r
    );
    for (const mode of props) {
      if (mode === "build" || mode === "clean" || mode === "cache" || mode === "export") continue;
      if (modes[mode]) {
        const invalid2 = props.filter((cmd) => cmd !== "build" && cmd !== "clean" && cmd !== "export");
        invalid2.push(
          "f\\b",
          // --filter
          "u\\b",
          // --upload
          "w\\b",
          // --watch
          "s\\b",
          // --spawn
          "d\\b",
          // --delete
          "r\\b"
          // --resource
        );
        const valid = invalid2.map((cmd) => {
          if (cmd === "filter" || cmd === "f" || cmd === "resource" || cmd === "-r") {
            return `--?${cmd}.*?(?=(--?${invalid2.join("|--?")}))`;
          } else {
            return `--?${cmd}`;
          }
        }).join("|");
        const pexp = new RegExp(`(--?${invalid2.join("|--?")})`, "g");
        const eexp = new RegExp(`(${valid})`, "g");
        return invalidCommand(
          {
            message: [
              `Bad command ${LPR}argv${RPR} sequence passed with ${blue2("export")} mode.`,
              "Theme exports are performed in isolation. You command includes",
              "execution modes that cannot be run when exporting theme/s"
            ],
            provided: $.argv.replace(pexp, red2("$1")).replace(/(--export)/, blue2("$1")),
            expected: $.argv.replace(eexp, "").replace(/(--export)/, blue2("$1")),
            fix: [
              `Removed the flags marked ${red2("red")} as shown in provided aboved.`
            ]
          }
        );
      }
    }
  }
}

// syncify/options/snippets.ts
init_cjs_shims();
function setSnippetOptions() {
  if (!isObject($.config.paths.snippets)) return;
  const { snippets } = $.config.paths;
  if (has2("input", snippets)) return;
  if (isEmpty2(snippets.input)) return;
  if (!isObject(snippets)) {
    typeError({
      option: "paths",
      name: "snippets",
      expects: "{}",
      provided: typeof snippets
    });
  }
  for (const option in $.snippet) {
    if (option === "input") continue;
    if (option === "prefixDir") {
      if (isBoolean(snippets[option])) {
        $.snippet[option] = snippets[option];
        continue;
      } else {
        typeError({
          option: "views.snippets",
          name: option,
          provided: snippets[option],
          expects: "boolean"
        });
      }
    }
    if (option === "separator") {
      if (isString(snippets[option])) {
        if (/[.@:_-]/.test(snippets[option])) {
          $.section[option] = snippets[option];
          continue;
        } else {
          invalidError({
            option: "views.snippets",
            name: option,
            value: snippets[option],
            expects: "@ | _ | : | - | ."
          });
        }
      } else {
        typeError({
          option: "views.snippets",
          name: option,
          provided: snippets[option],
          expects: "string"
        });
      }
    }
    if (option === "global") {
      const globals = isString(snippets[option]) ? [snippets[option]] : snippets[option];
      if (isArray2(globals)) {
        if (globals.length > 0) {
          $.snippet[option] = new RegExp(`${globals.join("|")}`);
          continue;
        }
      } else {
        typeError({
          option: "views.snippets",
          name: option,
          provided: snippets[option],
          expects: "string | string[]"
        });
      }
    }
  }
}

// syncify/options/sections.ts
init_cjs_shims();
var import_pathe22 = require("pathe");
var import_fs_extra20 = require("fs-extra");
async function setSectionOptions() {
  if (!isObject($.config.paths.snippets)) return;
  const { sections } = $.config.paths;
  if (has2("input", sections)) return;
  if (isEmpty2(sections.input)) return;
  if (!isObject(sections)) {
    typeError({
      option: "views",
      name: "sections",
      expects: "{}",
      provided: typeof sections
    });
  }
  for (const option in $.section) {
    if (option === "input") continue;
    if (option === "prefixDir") {
      if (isBoolean(sections[option])) {
        $.section[option] = sections[option];
        continue;
      } else {
        typeError(
          {
            option: "views.sections",
            name: option,
            provided: sections[option],
            expects: "boolean"
          }
        );
      }
    }
    if (option === "separator") {
      if (isString(sections[option])) {
        if (/[@:_-]/.test(sections[option])) {
          $.section[option] = sections[option];
          continue;
        } else {
          invalidError(
            {
              option: "view.sections",
              name: option,
              value: sections[option],
              expects: "@ | _ | : | -"
            }
          );
        }
      } else {
        typeError(
          {
            option: "views.sections",
            name: option,
            provided: sections[option],
            expects: "string"
          }
        );
      }
    }
    if (option === "global") {
      const globals = isString(sections[option]) ? [sections[option]] : sections[option];
      if (isArray2(globals)) {
        if (globals.length > 0) {
          $.section[option] = new RegExp(`${globals.join("|")}`);
          continue;
        }
      } else {
        typeError(
          {
            option: "paths.sections",
            name: option,
            provided: sections[option],
            expects: "string | string[]"
          }
        );
      }
    }
    if (option === "shared" && $.paths.schema.input !== null && $.paths.schema.input.size > 0) {
      await setSharedSchema();
      await setSchemaJson();
      defineProperty($.section, "schema", { get() {
        return $.cache.schema;
      } });
    }
  }
}
async function setSharedSchema() {
  for (const uri of $.paths.schema.input) {
    const ext = (0, import_pathe22.extname)(uri);
    const key = (0, import_pathe22.basename)(uri, ext);
    if ($.section.shared.has(key)) {
      throwError(`Duplicated shared schema file name ${bold2.yellow(key + ext)} detected.`, [
        "Shared Schema JSON file names must be unique across the workspace.",
        "Update the file name and try again."
      ]);
    }
    try {
      const read = await (0, import_fs_extra20.readFile)(uri);
      const data = read.toString();
      if (data.trim().length === 0) continue;
      const schema3 = parseJson(data.toString());
      if (has2("$schema", schema3)) delete schema3.$schema;
      if (has2("$description", schema3)) delete schema3.$description;
      for (const prop in schema3) {
        if (isObject(schema3[prop])) {
          if (has2("$description", schema3[prop])) {
            delete schema3[prop].$description;
          }
        } else if (isArray2(schema3[prop])) {
          for (const setting of schema3[prop]) {
            if (has2("$description", setting)) delete setting.$description;
          }
        }
      }
      $.cache.schema[uri] = /* @__PURE__ */ new Set();
      $.section.shared.set(key, { uri, schema: schema3 });
    } catch (e) {
      error2((0, import_pathe22.relative)($.cwd, uri), {
        notify: {
          title: "JSON Error (setSharedSchema)",
          message: `Error when parsing ${(0, import_pathe22.basename)(uri)}`
        }
      });
      if (e instanceof JSONError) {
        json(e, {
          relative: (0, import_pathe22.relative)($.cwd, uri),
          base: (0, import_pathe22.basename)(uri)
        });
      }
      return null;
    }
  }
}
async function setSchemaJson() {
  const { shared } = $.section;
  const warn3 = warnOption("Section Schema");
  for (const file of $.paths.sections.input) {
    const read = await (0, import_fs_extra20.readFile)(file);
    const hash = checksum(read);
    if (has2(file, $.cache.schema) && $.cache.checksum[file] === hash) continue;
    $.cache.checksum[file] = hash;
    const data = read.toString();
    const open = data.search(/{%-?\s*schema/);
    if (open < 0) continue;
    const begin = data.indexOf("%}", open + 2) + 2;
    const start = data.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);
    if (ender < 0) {
      warn3("Liquid Parse Error", (0, import_pathe22.relative)($.cwd, file));
      continue;
    }
    try {
      const schema3 = JSON.parse(data.slice(begin, ender));
      const schemaProp = hasProp(schema3);
      if (schemaProp("settings")) {
        for (const setting of schema3.settings) {
          if (has2("$ref", setting)) {
            const fname = setting.$ref.split(".")[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }
        }
      }
      if (schemaProp("blocks")) {
        for (const block of schema3.blocks) {
          const blockProp = hasProp(block);
          if (blockProp("$ref")) {
            const fname = block.$ref.split(".")[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }
          if (blockProp("settings")) {
            for (const setting of block.settings) {
              if (has2("$ref", setting)) {
                const fname = setting.$ref.split(".")[0];
                if (shared.has(fname)) {
                  $.cache.schema[shared.get(fname).uri].add(file);
                }
              }
            }
          }
        }
      }
    } catch (e) {
      if (has2(file, $.cache.sections)) delete $.cache.sections[file];
      warn3("JSON Parse Error", (0, import_pathe22.relative)($.cwd, file));
    }
  }
}

// syncify/options/sync.ts
init_cjs_shims();

// syncify/cli/prompts.ts
init_cjs_shims();
var import_enquirer2 = require("enquirer");
var theme2 = {
  prefix: lightGray("\u2502 "),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red2.bold,
    warning: yellowBright2,
    muted: gray2,
    disabled: gray2,
    typing: gray2
  },
  symbols: {
    ellipsisLarge: "",
    ellipsisSmall: "",
    prefix: {
      pending: "",
      submitted: "\u2713",
      cancelled: "\u{10102}"
    },
    separator: {
      pending: "",
      submitted: " \u2192 ",
      cancelled: " \u{10102} "
    }
  },
  pointer(choice, index) {
    const prefix = this.state.index === index ? Tree.stub.trimEnd() + " " : Tree.trim + " ";
    return index === 0 ? Tree.trim + "\n" + prefix : prefix;
  }
};
async function Connect(store) {
  let separator = 0;
  const style2 = { ...theme2 };
  const items = await list2(store);
  const themes2 = items.filter(({ role }) => role !== "demo");
  const space = ws(themes2, "name");
  const choices = themes2.map((value) => {
    if (value.name.length > separator) separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${gray2(value.role)}`,
      value
    };
  });
  choices.push(
    {
      role: "separator",
      message: lightGray("\u2500".repeat(separator))
    },
    {
      name: "create",
      message: "Create Theme",
      value: "create"
    }
  );
  const { targets } = await (0, import_enquirer2.prompt)({
    name: "targets",
    type: "select",
    multiple: true,
    message: "Select Themes",
    hint: "Press spacebar to select",
    theme: style2,
    choices,
    result(names) {
      return values(this.map(names));
    },
    format(value) {
      if (isArray2(value) && value.length > 0) {
        return neonCyan(`${value.join(whiteBright2(", "))}`);
      }
    }
  });
  const config = { domain: store.store.toLowerCase(), themes: {} };
  const fields = [];
  for (const theme3 of targets) {
    config.themes["${" + theme3.name + "}"] = theme3.id;
    fields.push({
      name: theme3.name,
      message: theme3.name,
      validate(value, _, field) {
        if (field && field.name === theme3.name) {
          if (/[A-Z]/.test(value)) {
            return "\n" + reset2.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + reset2.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  style2.styles.primary = neonCyan.italic;
  style2.styles.typing = neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet2 = await (0, import_enquirer2.prompt)({
    name: "stores",
    type: "snippet",
    required: targets.map(({ name }) => name),
    message: "Theme Targets",
    newline: "\n",
    theme: style2,
    fields,
    template,
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return neonGreen(`${this.state.completed}% completed`);
        }
      }
      return ` ${ARR}  ${orange(`${this.state.completed}% completed`)}`;
    }
  });
  const json2 = { syncify: JSON.parse(snippet2.stores.result) };
  const save2 = await (0, import_enquirer2.prompt)({
    name: "save",
    type: "confirm",
    message: "Save Settings",
    theme: style2,
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    },
    footer: Tree.line + [
      "",
      gray2("The following store and theme references will be saved"),
      gray2("to your package.json file on the syncify key property."),
      "",
      JSON.stringify(json2.syncify, null, 2).split("\n").join("\n" + Tree.line),
      ""
    ].join("\n" + Tree.line)
  });
  console.log(save2);
}

// syncify/options/sync.ts
async function setSync(cli) {
  const storeRequired = anyTrue(
    $.mode.metafields,
    $.mode.pages,
    $.mode.redirects,
    $.mode.release,
    $.mode.publish,
    $.mode.themes
  );
  const themeRequired = anyTrue(
    $.mode.watch,
    $.mode.upload,
    $.mode.import
  );
  let stores;
  let items = [];
  let queue2 = false;
  if (storeRequired && cli._.length === 0 && $.mode.themes === false) {
    invalidCommand({
      expected: "syncify <store>",
      message: [
        "You have not provided a store to target, which is required",
        "when running in a resource mode that syncs to a remote source"
      ],
      fix: [
        "Provide the store target name as the first command argument",
        "followed by theme target/s and other flags."
      ]
    });
  }
  if ($.mode.themes && $.stores.length > 0) {
    items = getStoresFromEnv();
  } else {
    stores = cli._.length === 0 ? $.stores.map(({ domain }) => domain) : cli._[0].split(",");
    items = $.stores.filter(({ domain }) => includes(domain, stores));
    queue2 = items.length > 1;
  }
  for (const store of items) {
    const domain = `${store.domain}.myshopify.com`.toLowerCase();
    const client2 = authURL(store.domain);
    const sidx = $.sync.stores.push({ store: store.domain, domain, client: client2, queue: queue2 }) - 1;
    if ($.mode.themes) continue;
    if ($.mode.metafields || $.mode.pages) return;
    let themes2 = [];
    if (has2("theme", cli)) {
      themes2 = cli.theme.split(",");
    } else if (has2(store.domain, cli)) {
      themes2 = cli[store.domain].split(",");
    } else if (has2("themes", store)) {
      themes2 = keys(store.themes);
    }
    if (themes2.length === 0) {
      await Connect($.sync.stores[sidx]);
    }
    for (const target of themes2) {
      if (!has2(target, store.themes)) {
        invalidTarget({
          type: "theme",
          expected: keys(store.themes).join(","),
          provided: target,
          message: [
            `Unknown theme target (${blue2(target)}) provided to ${blue2(store.domain)} store`,
            `Your ${blue2($.file.base)} file contains no such theme using this name.`
          ],
          fix: [
            `Provide an ${blue2("expected")} theme target or update/add an existing target.`,
            `You have ${blue2(`${themes2.length}`)} theme targets defined for ${blue2(store.domain)}:`,
            "\n\n",
            `${DSH} ${themes2.join(`
${DSH} `)}`,
            "\n\n"
          ]
        });
      }
      $.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });
    }
  }
  if (storeRequired && $.sync.stores.length === 0) {
    invalidCommand({
      expected: "syncify <store>",
      message: [
        "You have not provided store to target, which is required",
        "when running in a resource mode that syncs to a remote source"
      ],
      fix: [
        "Provide the store target name as the first command argument followed by themes",
        "target/s and other flags. Based on your current configuration:",
        "\n\n",
        `${DSH} ${white2("$")} syncify ${$.stores.join(`
${DSH} ${white2("$")} syncify `)}`,
        "\n\n"
      ]
    });
  }
  if (themeRequired && $.sync.themes.length === 0) {
    invalidCommand(
      {
        expected: "-t <theme>",
        message: [
          "You have not provided a theme to target, which is required",
          "when running this resource mode."
        ],
        fix: [
          `Provide a theme name to target following a ${blue2("-t")} or ${blue2("--theme")} flag.`,
          "Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s."
        ]
      }
    );
  }
  if ($.sync.stores.length === 0) {
    throwError("Unknown, missing or invalid store/theme targets", [
      "Check your store config"
    ]);
  }
  $.env.sync = $.sync.stores.length === 1 && $.sync.themes.length === 1 ? 1 : 2;
}

// syncify/options/paths.ts
init_cjs_shims();
var import_fast_glob6 = __toESM(require("fast-glob"));
var import_anymatch4 = __toESM(require_anymatch());
var import_pathe23 = require("pathe");
async function setPaths() {
  const path2 = normalPath($.dirs.input);
  const getPaths = (key, fallback) => {
    const files = $.config.paths[key];
    if (!files) {
      return [path2(fallback)];
    }
    if (isArray2(files)) {
      return files.map(path2);
    }
    if (isObject(files) && files.input) {
      return isArray2(files.input) ? files.input.map(path2) : [path2(files.input)];
    }
    return [path2(files)];
  };
  for (const key of PATH_KEYS) {
    let paths2 = [];
    switch (key) {
      case "customers":
        paths2 = getPaths(key, "templates/customers/*");
        break;
      case "metaobject":
        paths2 = getPaths(key, "templates/metaobject/*");
        break;
      case "schema":
        paths2 = getPaths(key, "schema/*");
        break;
      default:
        if ($.config.paths[key]) paths2 = getPaths(key, "");
    }
    if (key === "snippets" || key === "sections") {
      paths2.forEach((p) => $[key].baseDir.add(lastPath((0, import_pathe23.dirname)(p))));
    } else if (key === "assets") {
      paths2.push((0, import_pathe23.join)($.dirs.output, "assets/*"));
    }
    for (const p of paths2) {
      if (key !== "metafields" && key !== "redirects") {
        const foundPaths = await (0, import_fast_glob6.default)(p, { cwd: $.cwd });
        if (foundPaths.length) {
          foundPaths.forEach((entry) => $.paths[key].input.add(entry));
          $.watch.add(p);
        } else if (key !== "assets" || p !== (0, import_pathe23.join)($.dirs.output, "assets/*")) {
        }
      }
      $.paths[key].match = (0, import_anymatch4.default)(paths2);
    }
  }
}

// syncify/options/version.ts
init_cjs_shims();
var import_pathe24 = require("pathe");
function parseVersionNumber(version2) {
  const match2 = version2.match(/^(\d{1,2})\.(\d{1,2})\.(\d{1,2})$/);
  if (!match2) {
    throw new Error("Unable to parse: " + version2);
  }
  return {
    patch: parseInt(match2[3], 10),
    minor: parseInt(match2[2], 10),
    major: parseInt(match2[1], 10)
  };
}
function setVersion(cli) {
  const has3 = hasProp($.cache.build);
  if (!has3("syncifyVersion")) {
    $.cache.build.syncifyVersion = $.version;
  }
  if (!has3("themeVersion")) {
    $.cache.build.themeVersion = $.pkg.version;
  }
  if ($.cache.build.themeVersion !== $.pkg.number) {
    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = (0, import_pathe24.join)($.dirs.export, `v${$.vc.major}`);
    $.vc.update.zip = (0, import_pathe24.join)($.vc.update.dir, `${$.vc.number}.zip`);
    const v = parseVersionNumber($.cache.build.themeVersion);
    $.vc.number = $.cache.build.themeVersion;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = (0, import_pathe24.join)($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = (0, import_pathe24.join)($.vc.dir, `${$.vc.number}.zip`);
  } else {
    const v = parseVersionNumber($.pkg.version);
    $.vc.number = $.pkg.version;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = (0, import_pathe24.join)($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = (0, import_pathe24.join)($.vc.dir, `${$.vc.number}.zip`);
  }
  if (cli.release !== null) {
    $.vc.update = object($.vc);
    if (cli.release === "patch") {
      $.vc.update.patch = $.vc.patch + 1;
      $.vc.update.bump = "patch";
    } else if (cli.release === "minor") {
      $.vc.update.minor = $.vc.minor + 1;
      $.vc.update.bump = "minor";
    } else if (cli.release === "major") {
      $.vc.update.major = $.vc.major + 1;
      $.vc.update.bump = "major";
      $.vc.update.dir = (0, import_pathe24.join)($.dirs.export, `v${$.vc.update.major}`);
    }
    $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
    $.vc.update.zip = (0, import_pathe24.join)($.vc.update.dir, `${$.vc.update.number}.zip`);
  }
}

// syncify/options/spawn.ts
init_cjs_shims();
var import_tree_kill = __toESM(require_tree_kill());

// syncify/cli/spawn.ts
init_cjs_shims();
var import_cross_spawn = require("cross-spawn");
function spawned(name, command, callback) {
  const child = (0, import_cross_spawn.spawn)(command.cmd, command.args, { stdio: "pipe" });
  command.pid = child.pid;
  (async function wait() {
    if ($.env.ready === false) {
      await delay(100);
      return wait();
    }
    child.stdio[0].on("data", callback.bind({ name, type: "stdin" }));
    child.stdio[0].on("data", callback.bind({ name, type: "stdout" }));
    child.stdio[2].on("data", callback.bind({ name, type: "stderr" }));
    $.spawn.streams.set(name, child);
  })();
}

// syncify/cli/exit.ts
init_cjs_shims();
var trigger = false;
var register = false;
var hooks = /* @__PURE__ */ new Set();
function exit(manual, signal) {
  if (trigger) return;
  trigger = true;
  for (const hook of hooks) hook();
  if (manual) process.exit(128 + signal);
}
function kill(callback) {
  hooks.add(callback);
  if (!register) {
    register = true;
    process.once("exit", exit);
    process.once("SIGINT", exit.bind(void 0, true, 2));
    process.once("SIGTERM", exit.bind(void 0, true, 15));
    process.on("message", (message) => {
      if (message === "shutdown") exit(true, -128);
    });
  }
  return () => hooks.delete(callback);
}

// syncify/options/spawn.ts
function setSpawns() {
  const { mode, spawn: spawn4, config } = $;
  if (!has2("spawn", config) || isNil2(config.spawn)) return;
  if (!isObject(config.spawn)) {
    typeError(
      {
        option: "config",
        name: "spawn",
        provided: config.spawn,
        expects: "{ build: {}, watch: {} }"
      }
    );
  }
  const has3 = hasProp(config.spawn);
  let run2 = null;
  if (mode.build && has3("build")) run2 = "build";
  if (mode.watch && has3("watch")) run2 = "watch";
  if (isNil2(mode) || isNil2(config.spawn[run2])) return;
  if (!isObject(config.spawn[run2])) {
    typeError(
      {
        option: "spawn",
        name: run2,
        provided: config.spawn[run2],
        expects: "{ build: {}, watch: {} }"
      }
    );
  }
  if (isEmpty2(config.spawn[run2])) return;
  for (const name in config.spawn[run2]) {
    const command = config.spawn[run2][name];
    if (isString(command)) {
      $.spawn.commands[name] = object();
      const cmd = command.trimStart().indexOf(" ") > -1 ? command.trimStart().split(" ") : [command];
      $.spawn.commands[name].cmd = cmd.shift().trim();
      $.spawn.commands[name].args = cmd;
      $.spawn.commands[name].pid = NaN;
      spawned(name, $.spawn.commands[name], spawn2(name));
    } else if (isArray2(command)) {
      const cmd = command.shift().trim();
      $.spawn.commands[name] = object({
        cmd,
        args: command,
        pid: NaN
      });
      spawned(name, $.spawn.commands[name], spawn2(name));
    } else {
      typeError({
        option: "spawn",
        name: run2,
        provided: config.spawn[run2],
        expects: "string | string[]"
      });
    }
  }
  runtime.spawns($);
  kill(() => {
    queue.pause();
    queue.clear();
    nwl("");
    spawn4.streams.forEach((child, name) => {
      log(`- ${gray2(`pid: #${child.pid} (${name}) process exited`)}`);
      (0, import_tree_kill.default)(child.pid);
    });
    nwl("");
    spawn4.streams.clear();
    process.exit(0);
  });
}

// syncify/options/script.ts
init_cjs_shims();
var import_pathe25 = require("pathe");
var import_anymatch5 = __toESM(require_anymatch());
async function setScriptOptions() {
  if (!has2("script", $.config.transform)) return;
  if (!$.config.transform.script || isEmpty2($.config.transform.script)) return;
  const warn3 = warnOption("Script Transform");
  if (has2("entryPoints", $.processor.esbuild)) {
    warn3("processor option is not allowed and was omitted", "entryPoints");
    delete $.processor.esbuild.entryPoints;
  }
  const transforms = getTransform($.config.transform.script, {
    addWatch: false,
    flatten: true
  });
  const esbuildOptions = omit([
    "input",
    "watch",
    "rename",
    "snippet"
  ]);
  if (!has2("absWorkingDir", $.processor.esbuild)) {
    $.processor.esbuild.absWorkingDir = $.cwd;
  }
  for (const script2 of transforms) {
    const keyDir = script2.snippet ? "snippets" : "assets";
    const { name } = renameFile2(script2.input, script2.rename);
    let rename;
    if (!name.endsWith(".js") && !name.endsWith(".mjs")) {
      rename = name + ".js";
    } else if (name.endsWith(".cjs")) {
      invalidError({
        option: "transform.script",
        name: "rename",
        value: name,
        expects: ".js | .mjs",
        reason: [
          "You cannot use cjs extensions in Shopify themes.",
          "The .cjs extension is for Node, themes are a web environment. "
        ]
      });
    } else {
      rename = name;
    }
    const has3 = hasProp(script2);
    const bundle = object();
    if (script2.snippet) {
      if (!rename.endsWith(".liquid")) rename = rename + ".liquid";
      bundle.attrs = [];
      bundle.snippet = true;
      bundle.namespace = "snippets" /* Snippets */;
      bundle.type = 3 /* Snippet */;
      if (has3("attrs") && isEmpty2(script2.attrs) === false) {
        if (isArray2(script2.attrs)) {
          for (let i = 0; i < script2.attrs.length; i++) {
            const attr = script2.attrs[i];
            if (isArray2(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              typeError(
                {
                  option: "transform.script",
                  name: `attrs[${i}]`,
                  provided: attr,
                  expects: "string[]"
                }
              );
            }
          }
        } else {
          typeError(
            {
              option: "transform.script",
              name: "attrs",
              provided: script2.attrs,
              expects: "[ [ name: string, value: string ] ]"
            }
          );
        }
      }
    } else {
      bundle.attrs = [];
      bundle.snippet = false;
      bundle.namespace = "assets" /* Assets */;
      bundle.type = 10 /* Script */;
    }
    bundle.uuid = uuid();
    bundle.snippet = script2.snippet;
    bundle.input = script2.input;
    bundle.output = (0, import_pathe25.join)($.dirs.output, keyDir, rename);
    bundle.key = (0, import_pathe25.join)(keyDir, rename);
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;
    $.processor.esbuild.outfile = bundle.output;
    if ($.mode.watch) $.watch.unwatch(bundle.output);
    if (has3("esbuild")) {
      if (isBoolean(script2.esbuild) || isNil2(script2.esbuild)) {
        bundle.esbuild = isEmpty2(esbuildOptions) ? merge($.processor.esbuild) : merge($.processor.esbuild, esbuildOptions);
      } else if (isObject(script2.esbuild)) {
        const esProp = hasProp(script2.esbuild);
        for (const prop in [
          "entryPoints",
          "outdir",
          "watch",
          "absWorkingDir",
          "watch",
          "write",
          "logLevel",
          "incremental"
        ]) {
          if (prop === "entryPoints" && esProp(prop)) {
            warn3('Option is not allowed, use Syncify "input" instead', prop);
          } else if (prop === "outdir" && esProp(prop)) {
            warn3("Option is not allowed, Syncify will handle output location", prop);
          } else if (prop === "watch" && esProp(prop)) {
            warn3("Option is not allowed, declare watch paths using Syncify", prop);
          } else if (esProp(prop)) {
            warn3("Option is not allowed and will be ignored", prop);
          }
        }
        if (esProp("plugins") && has2("plugins", $.processor.esbuild)) {
          script2.esbuild.plugins.unshift(...$.processor.esbuild.plugins);
        }
        bundle.esbuild = isEmpty2(esbuildOptions) ? merge($.processor.esbuild, script2.esbuild) : merge($.processor.esbuild, script2.esbuild, esbuildOptions);
      } else {
        typeError({
          option: "script",
          name: "esbuild",
          provided: typeof script2.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      bundle.esbuild = isEmpty2(esbuildOptions) ? merge($.processor.esbuild) : merge($.processor.esbuild, esbuildOptions);
    }
    bundle.esbuild.entryPoints = [bundle.input];
    if ($.mode.watch) {
      if (!has3("watch")) {
        bundle.watch = /* @__PURE__ */ new Set();
      } else {
        if (!isArray2(script2.watch)) {
          typeError({
            option: "script",
            name: "watch",
            provided: script2.watch,
            expects: "string[]"
          });
        }
        const watchers = getResolvedPaths(script2.watch);
        bundle.watchCustom = (0, import_anymatch5.default)(watchers);
        bundle.watch = new Set(watchers);
      }
    } else {
      bundle.watch = /* @__PURE__ */ new Set();
    }
    try {
      await esbuildBundle(bundle);
    } catch (e) {
      errorRuntime(e, {
        message: [
          "Syncify has failed to initialize due to a script transform prebuild error.",
          "Script transforms execute runtime builds but the compile process did not complete.",
          "This is typically due to invalid JavaScript syntax but may also be caused due to invalid",
          "transform options being passed."
        ],
        solution: [
          "You will need to correct the error encountered. Alternatively you can skip Syncify",
          "from applying the transform by excluding the file."
        ],
        entries: {
          processor: "ESBuild"
        }
      });
    }
    if ($.mode.terse) {
      bundle.esbuild = merge(bundle.esbuild, { exclude: void 0 });
    }
    $.script.push(bundle);
  }
}

// syncify/options/style.ts
init_cjs_shims();
var import_fast_glob7 = __toESM(require("fast-glob"));
var import_anymatch6 = __toESM(require_anymatch());
var import_pathe26 = require("pathe");
var import_fs_extra21 = require("fs-extra");
async function getExternalModules() {
  const postcss4 = await readConfigFile("postcss.config", {
    tsconfig: null
  });
  if (postcss4 !== null) {
    $.processor.postcss.file = postcss4.path;
    $.processor.postcss.config = postcss4.config;
    $.watch.add(postcss4.path);
  }
  $.processor.tailwind.installed = getModules($.pkg, "tailwindcss");
  if ($.processor.tailwind.installed) {
    const loaded = await load2("tailwind");
    if (!loaded) {
      throwError("Unable to dynamically import TailwindCSS", [
        "Ensure you have installed tailwindcss"
      ]);
    }
    const tw = await readConfigFile("tailwind.config", {
      tsconfig: null
    });
    if (tw !== null) {
      $.processor.tailwind.file = tw.path;
      $.processor.tailwind.config = tw.config;
      $.watch.add(tw.path);
    }
  }
  $.processor.sass.installed = getModules($.pkg, "sass");
  if ($.processor.sass.installed) {
    const loaded = await load2("sass");
    if (!loaded) {
      throwError("Unable to dynamically import SASS", [
        "Ensure you have installed sass"
      ]);
    }
  }
}
async function setStyleConfig() {
  if (!has2("style", $.config.transform)) return;
  if (!$.config.transform.style || isEmpty2($.config.transform.style)) return;
  await getExternalModules();
  const warn3 = warnOption("Style Transform");
  const styles2 = getTransform($.config.transform.style, {
    addWatch: false,
    flatten: true
  });
  const path2 = normalPath($.config.input);
  for (let i = 0; i < styles2.length; i++) {
    const style2 = styles2[i];
    const has3 = hasProp(style2);
    const bundle = object();
    bundle.uuid = uuid();
    bundle.input = style2.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = null;
    bundle.sass = false;
    bundle.tailwind = null;
    if (has3("postcss")) {
      if (isArray2(style2.postcss) && style2.postcss.length > 0) {
        defineProperty(bundle, "postcss", {
          get() {
            return style2.postcss;
          }
        });
      } else {
        if (isBoolean(style2.postcss) && style2.postcss !== false && isNil2(style2.postcss) === false) {
          defineProperty(bundle, "postcss", {
            get() {
              return merge($.processor.postcss.config);
            }
          });
        } else {
          typeError(
            {
              option: "style",
              name: "postcss",
              provided: bundle.postcss,
              expects: "boolean | []"
            }
          );
        }
      }
    } else {
      defineProperty(bundle, "postcss", {
        get() {
          return merge($.processor.postcss.config);
        }
      });
    }
    if (has3("tailwind")) {
      if (!$.processor.tailwind.installed) {
        missingDependency("tailwindcss");
      }
      const override = isObject(style2.tailwind);
      if (override || isBoolean(style2.tailwind) && style2.tailwind !== false && isNil2(style2.tailwind) === false) {
        const tw = merge(override ? style2.tailwind : $.processor.tailwind.config);
        if (isArray2(tw.content) && isEmpty2(tw.content)) {
          tw.content = [(0, import_pathe26.join)($.dirs.input, "**", "*.{js,ts,jsx,tsx,vue,svelte,liquid,json,schema}")];
        }
        defineProperty(bundle, "tailwind", {
          get() {
            return tw;
          }
        });
        if ($.mode.watch && isArray2(bundle.tailwind.content)) {
          const files = await (0, import_fast_glob7.default)(bundle.tailwind.content);
          if ($.processor.tailwind.map === null) {
            $.processor.tailwind.map = object();
          }
          $.processor.tailwind.map[i] = new Set(files);
        }
      } else {
        typeError(
          {
            option: "style",
            name: "tailwind",
            provided: bundle.tailwind,
            expects: "boolean | {}"
          }
        );
      }
    }
    if (has3("sass") && style2.sass !== false && $.processor.sass.installed === true) {
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && isNil2(style2.sass) === false) {
        if (!$.processor.sass.installed) missingDependency("sass");
        if (override === false) {
          defineProperty(bundle, "sass", {
            get() {
              return style2.sass;
            }
          });
        } else {
          bundle.sass = merge($.processor.sass.config, style2.sass);
          for (const option in style2.sass) {
            if (option === "sourcemap" || option === "warnings" || option === "quietDeps") {
              if (isBoolean(style2.sass[option])) {
                bundle.sass[option] = style2.sass[option];
              } else {
                typeError(
                  {
                    option: "sass",
                    name: option,
                    provided: style2.sass[option],
                    expects: "boolean"
                  }
                );
              }
            } else if (option === "style") {
              if (isString(style2.sass[option]) === false) {
                typeError(
                  {
                    option: "sass",
                    name: option,
                    provided: style2.sass[option],
                    expects: "string"
                  }
                );
              }
              if (style2.sass[option] === "expanded" || style2.sass[option] === "compressed") {
                bundle.sass[option] = style2.sass[option];
              } else {
                invalidError(
                  {
                    option: "sass",
                    name: option,
                    value: style2.sass[option],
                    expects: "expanded | compressed"
                  }
                );
              }
            } else if (option === "includePaths") {
              if (isArray2(style2.sass[option])) {
                const includePaths = [];
                for (const path3 of style2.sass[option]) {
                  const resolve3 = (0, import_pathe26.join)($.cwd, path3);
                  if (await (0, import_fs_extra21.exists)(resolve3)) {
                    includePaths.push(resolve3);
                  } else {
                    warn3("Cannot resolve sass includePath entry", path3);
                  }
                }
                bundle.sass[option] = includePaths;
              } else {
                typeError(
                  {
                    option: "sass",
                    name: option,
                    provided: style2.sass[option],
                    expects: "string[]"
                  }
                );
              }
            }
          }
          ;
        }
      } else {
        typeError(
          {
            option: "style",
            name: "sass",
            provided: style2.sass,
            expects: "boolean | {}"
          }
        );
      }
      if (style2.snippet === false && !/\.s[ac]ss/.test((0, import_pathe26.extname)(bundle.input))) {
        warn3("Input is not a sass file", bundle.input);
      }
    }
    let rename = renameFile2(style2.rename);
    if (has3("rename") && isNil2(style2) === false) {
      if (isString(style2.rename) === false) {
        typeError(
          {
            option: "styles",
            name: "rename",
            provided: style2.rename,
            expects: "string"
          }
        );
      }
      rename = renameFile2(bundle.input, style2.rename);
      if (/[a-zA-Z0-9_.-]+/.test(rename.name) === false) {
        typeError(
          {
            option: "sass",
            name: "rename",
            provided: rename,
            expects: "Characters: [a-zA-Z0-9_.-]"
          }
        );
      }
      if (rename.name.endsWith(".css")) {
        bundle.rename = rename.name;
      } else {
        if (rename.name.endsWith(".scss")) {
          rename.name = rename.name.replace(".scss", ".css");
        } else if (rename.name.endsWith(".sass")) {
          rename.name = rename.name.replace(".sass", ".css");
        } else if (!rename.name.endsWith(".liquid")) {
          rename.name = rename.name + ".css";
        }
      }
    }
    const watch2 = [];
    if ($.mode.watch && has3("watch")) {
      if (!isArray2(style2.watch)) {
        typeError(
          {
            option: "styles",
            name: "watch",
            provided: style2.watch,
            expects: "string[]"
          }
        );
      }
      for (const uri of style2.watch) {
        const globs = await (0, import_fast_glob7.default)((0, import_pathe26.join)($.cwd, path2(uri)));
        if (globs.length === 0 && uri[0] !== "!") {
          warn3("Cannot resolve watch glob/path uri", uri);
        }
        for (const p of globs) {
          if (await (0, import_fs_extra21.exists)(p)) {
            watch2.push(p);
          } else {
            warn3("No file exists in path", p);
          }
        }
      }
      ;
      watch2.push(bundle.input);
      for (const path3 of watch2) $.watch.add(path3);
      bundle.watch = (0, import_anymatch6.default)(watch2);
    } else {
      bundle.watch = (0, import_anymatch6.default)([bundle.input]);
      $.watch.add(bundle.input);
    }
    if (isObject(bundle.sass)) {
      bundle.sass.include.unshift($.cwd, (0, import_pathe26.join)($.cwd, rename.dir));
      if (hasPath("sass.include", style2)) {
        bundle.sass.include = style2.sass.include.map((p) => (0, import_pathe26.join)($.cwd, p));
      }
    }
    if (has3("snippet")) {
      if (!isBoolean(style2.snippet)) {
        typeError(
          {
            option: "styles",
            name: "snippet",
            provided: style2.snippet,
            expects: "boolean"
          }
        );
      }
      bundle.snippet = style2.snippet;
      if (bundle.snippet === true && has3("attrs") && isEmpty2(style2.attrs) === false) {
        if (isArray2(style2.attrs)) {
          for (let i2 = 0; i2 < style2.attrs.length; i2++) {
            const attr = style2.attrs[i2];
            if (isArray2(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              typeError(
                {
                  option: "style",
                  name: `attrs[${i2}]`,
                  provided: attr,
                  expects: "string[]"
                }
              );
            }
          }
        } else {
          typeError(
            {
              option: "style",
              name: "attrs",
              provided: style2.attrs,
              expects: "[ string[] ]"
            }
          );
        }
      }
    }
    if (bundle.snippet) {
      if (!has2("rename", bundle)) {
        bundle.rename = rename.name;
      }
      if (rename.name.endsWith(".liquid") === false || bundle.rename.endsWith(".liquid") === false) {
        bundle.rename = rename.name + ".liquid";
      }
      $.paths.transforms.set(bundle.input, 9 /* Style */);
      if ($.mode.watch) {
        $.watch.unwatch((0, import_pathe26.join)($.dirs.output, "snippets", bundle.rename));
      }
    } else {
      bundle.rename = rename.name;
      if ($.mode.watch) {
        $.watch.unwatch((0, import_pathe26.join)($.dirs.output, "assets", rename.name));
      }
    }
    $.style.push(bundle);
  }
  ;
}

// syncify/options/liquid.ts
init_cjs_shims();
var import_anymatch7 = __toESM(require_anymatch());
var LIQUID_TERSE_KEYS = [
  "minifySchema"
];
var MARKUP_TERSE_KEYS = [
  "minifyCSS",
  "minifyJS",
  "collapseWhitespace",
  "removeComments"
];
function setLiquidOptions() {
  const { mode } = $;
  if (!has2("liquid", $.config.transform) || isEmpty2($.config.transform.liquid)) return;
  if (!isObject($.config.transform.liquid)) {
    typeError(
      {
        option: "transform",
        name: "liquid",
        expects: "{}",
        provided: typeof $.config.transform.liquid
      }
    );
  }
  const warn3 = warnOption("liquid configuration");
  if (has2("terse", $.config.transform.liquid) && mode.terse === true) {
    if (isEmpty2($.config.transform.liquid.terse)) {
      $.liquid.terse.enabled = false;
      warn3("Terse option is empty, minification will not apply");
    } else if (isBoolean($.config.transform.liquid) && $.config.transform.liquid === true) {
      $.liquid.terse.enabled = true;
    } else if (isObject($.config.transform.liquid.terse)) {
      $.liquid.terse.enabled = true;
      const { terse } = $.config.transform.liquid;
      for (const p of LIQUID_TERSE_KEYS) {
        if (has2(p, terse)) $.liquid.terse.liquid[p] = terse[p];
      }
      for (const p in MARKUP_TERSE_KEYS) {
        if (has2(p, terse)) $.liquid.terse.markup[p] = terse[p];
      }
      if (has2("exclude", terse)) {
        $.liquid.terse.exclude = (0, import_anymatch7.default)(getResolvedPaths(terse.exclude));
      }
    }
  }
}

// syncify/options/svg.ts
init_cjs_shims();
var import_pathe27 = require("pathe");
async function setSvgOptions() {
  if (!has2("svg", $.config.transform)) return;
  if (!$.config.transform.svg || isEmpty2($.config.transform.svg)) return;
  const warn3 = warnOption("SVG Transform");
  const svgs = getTransform($.config.transform.svg, {
    addWatch: true,
    flatten: false
  });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path2) => {
      if ((0, import_pathe27.extname)(path2) === ".svg") return true;
      warn3("Excluded file which is not an SVG type", (0, import_pathe27.relative)($.cwd, path2));
      return false;
    });
    if (files.length === 0) {
      warn3("No SVG file paths were resolved");
      continue;
    }
    const has3 = hasProp(svg2);
    const bundle = object();
    bundle.uuid = uuid();
    bundle.input = new Set(files);
    bundle.format = null;
    bundle.match = svg2.match;
    bundle.rename = svg2.rename;
    bundle.snippet = svg2.snippet;
    if (has3("svgo") && has3("sprite")) {
      invalidError(
        {
          option: "transform",
          name: "svg",
          value: "svgo AND sprite",
          expects: "svgo OR sprite"
        }
      );
    }
    if (!has3("format")) {
      if (has3("svgo")) {
        bundle.format = "file";
        bundle.svgo = isObject(svg2.svgo) ? merge($.processor.svgo, svg2.svgo) : true;
      } else if (has3("sprite")) {
        bundle.format = "sprite";
        bundle.sprite = isObject(svg2.sprite) ? merge($.processor.sprite, svg2.sprite) : true;
      } else {
        missingOption(
          {
            option: "transform.svg",
            key: "format",
            expects: "sprite | file",
            reason: [
              `SVG transforms require you to define ${cyan2("format")} Syncify needs to knows how`,
              "it should handle the input and which processor to use for the transform."
            ]
          }
        );
      }
    } else {
      if (svg2.format === "file" || svg2.format === "sprite") {
        bundle.format = svg2.format;
        if (svg2.format === "file") {
          bundle.svgo = true;
        } else {
          bundle.sprite = true;
        }
      } else {
        invalidError(
          {
            option: "transform > svg",
            name: "format",
            value: svg2.format,
            expects: '"sprite" | "file"'
          }
        );
      }
    }
    $.svg.push(bundle);
  }
  ;
}

// syncify/options/hot.ts
init_cjs_shims();
var import_pathe29 = require("pathe");

// syncify/hot/server.ts
init_cjs_shims();
var import_uWebSockets2 = __toESM(require("uWebSockets.js"));
var import_node_http = __toESM(require("http"));
var import_serve_static = __toESM(require("serve-static"));
var import_finalhandler = __toESM(require("finalhandler"));
var import_fast_glob8 = __toESM(require("fast-glob"));
var import_fs_extra22 = require("fs-extra");
var import_pathe28 = require("pathe");
var HOTError = {
  enable: true,
  output: []
};
async function injection() {
  log_update_default(Line(gray2("validating snippet injection")));
  const snippet2 = await injectSnippet();
  if (snippet2) {
    log_update_default(Line(gray2("validating layouts")));
    for (const layout in $.hot.alive) {
      const exists2 = await (0, import_fs_extra22.pathExists)(layout);
      if (!exists2) {
        log_update_default(Line(gray2("layout has not yet been bundled, building now...")));
        const files = import_fast_glob8.default.sync($.paths.layout.config, {
          cwd: $.dirs.input,
          absolute: true
        });
        for (const input of files) {
          if ((0, import_pathe28.basename)(input) === (0, import_pathe28.basename)(layout)) {
            const source = await (0, import_fs_extra22.readFile)(input);
            await (0, import_fs_extra22.writeFile)(layout, source);
          }
        }
        log_update_default(Line(gray2("layout was bundled from source, injecting hot snippet")));
      }
      try {
        const render = await injectRender(layout);
        if (!render) {
          log_update_default.clear();
          error2("Failed to inject hot reload render tag", {
            notify: {
              title: "HOT Reloading Failed",
              message: "HOT Reloading is disabled"
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    log_update_default.clear();
  } else {
    log_update_default.clear();
    error2("Failed to upload snippet");
  }
}
async function server() {
  if (!HOTError.enable) {
    HOTError.output.push(
      Tree.red,
      Tree.red + redBright2("Change the socket port address or kill the session occupying it."),
      Tree.red + redBright2("This error typically occurs when multiple Syncify instances are active.")
    );
    error2(redBright2(`${bold2("ERROR")} on ${bold2(`${$.hot.method === "hot" ? "HOT" : "LIVE"} Reload:`)}`));
    log(HOTError.output.join("\n"));
    return null;
  }
  log(Line(bold2(`${$.hot.method === "hot" ? "HOT Reload" : "LIVE Reload"}${COL}`)));
  log_update_default(Line("configuring HOT Reload"));
  await injection();
  const url = (0, import_pathe28.join)($.dirs.output, "assets");
  const app = import_uWebSockets2.default.App();
  app.get("/*", (response, request2) => {
    response.writeHeader("Access-Control-Allow-Origin", "*");
    response.writeHeader("Cache-Control", "public, max-age=0");
    const uri = url + request2.getUrl();
    (0, import_fs_extra22.existsSync)(uri) ? response.end((0, import_fs_extra22.readFileSync)(uri)) : response.endWithoutBody();
  });
  app.listen($.hot.server, (token) => {
    if (token) {
      log_update_default(Line(`${neonCyan("server")}  ${ARR}  ${gray2("PORT")}  ${ARR} ${pink(`${$.hot.server}`)}`));
    } else {
      console.log("Failed to listen to port " + $.hot.server);
    }
  });
  return app;
}
async function socket() {
  let listener;
  const topics = [
    "script",
    "stylesheet",
    "section",
    "svg",
    "assets",
    "reload",
    "replace",
    "connect",
    "disconnect",
    "connected"
  ];
  const app = await server();
  const ws2 = app.ws("/ws", {
    compression: import_uWebSockets2.default.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    open: (ws3) => {
      for (const topic of topics) {
        ws3.subscribe(topic);
      }
    },
    message(ws3, message, isBinary) {
      hot(Buffer.from(message).toString(isBinary ? "binary" : "utf8"));
    }
  }).listen($.hot.socket, (token) => {
    listener = token;
    if (token) {
      log(Line(`${neonCyan("socket")}  ${ARR}  ${gray2("PORT")}  ${ARR} ${pink(`${$.hot.socket}`)}`));
      for (const p in $.hot.alive) {
        log(Line(`${neonCyan("layout")}  ${ARR}  ${gray2((0, import_pathe28.relative)($.cwd, p))}`));
      }
      nwl();
    } else {
      console.log("Failed to listen on websocket");
    }
  });
  kill(() => {
    ws2.close();
    import_uWebSockets2.default.us_listen_socket_close(listener);
  });
  return {
    get http() {
      return ws2;
    },
    script: (uuid2, src) => ws2.publish("script", `script,${src},${uuid2}`),
    stylesheet: (uuid2, href) => ws2.publish("stylesheet", `stylesheet,${href},${uuid2}`),
    section: (id) => ws2.publish("section", `section,${id}`),
    svg: (id) => ws2.publish("svg", `svg,${id}`),
    assets: () => ws2.publish("assets", "assets"),
    reload: () => ws2.publish("reload", "reload"),
    replace: () => ws2.publish("replace", "replace"),
    connected: () => ws2.publish("connected", "connected"),
    disconnect: () => ws2.publish("disconnect", "disconnect")
  };
}

// syncify/options/hot.ts
async function setHotReloads() {
  if ($.mode.watch !== true) {
    if ($.cache.build.hotSnippet.length > 0) {
      for (const path2 of $.cache.build.hotSnippet) await ejectRender(path2);
      $.cache.build.hotSnippet = [];
    }
    return;
  }
  if ($.mode.hot === false && $.config.hot === false) {
    if ($.cache.build.hotSnippet.length > 0) {
      for (const path2 of $.cache.build.hotSnippet) await ejectRender(path2);
      $.cache.build.hotSnippet = [];
    }
    return;
  }
  if ($.mode.hot === false && $.config.hot === true) {
    $.mode.hot = true;
  }
  const warn3 = warnOption("HOT Reloads");
  if ($.env.sync > 1) {
    warn3("HOT Reloads can only be used on 1 store");
    return;
  } else if ($.sync.themes.length > 1) {
    warn3("HOT Reloads can only be used on 1 theme");
    return;
  }
  if (allFalse(isObject($.config.hot), isBoolean($.config.hot), isNil2($.config.hot))) {
    typeError({
      option: "config",
      name: "hot",
      provided: $.config.hot,
      expects: "boolean | {}"
    });
  }
  if (isObject($.config.hot) && isEmpty2($.config.hot) === false) {
    const has3 = hasProp($.hot);
    for (const prop in $.config.hot) {
      if (!has3(prop)) {
        unknownError(`hot.${prop}`, $.config.hot[prop]);
      }
      if (prop === "label") {
        if ($.config.hot[prop] === "visible" || $.config.hot[prop] === "hidden") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "visible | hidden"
          });
        }
      } else if (prop === "strategy") {
        if ($.config.hot[prop] === "hydrate" || $.config.hot[prop] === "replace") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "hydrate | replace"
          });
        }
      } else if (prop === "method") {
        if ($.config.hot[prop] === "hot" || $.config.hot[prop] === "refresh") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "hot | refresh"
          });
        }
      } else if (prop === "scroll") {
        if ($.config.hot[prop] === "preserved" || $.config.hot[prop] === "top") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "preserved | top"
          });
        }
      } else if (typeof $.hot[prop] === typeof $.config.hot[prop]) {
        $.hot[prop] = $.config.hot[prop];
      } else {
        typeError({
          option: "hot",
          name: prop,
          provided: $.config.hot[prop],
          expects: typeof $.hot[prop]
        });
      }
    }
  }
  $.hot.snippet = (0, import_pathe29.join)($.cwd, "node_modules", "@syncify/cli", "hot.js.liquid");
  $.hot.output = (0, import_pathe29.join)($.dirs.output, "snippets", "hot.js.liquid");
  const base = (0, import_pathe29.join)($.dirs.output, "layout");
  for (const layout of $.hot.layouts) {
    const path2 = (0, import_pathe29.join)(base, layout);
    $.hot.alive[path2] = false;
    if (!$.cache.build.hotSnippet.includes(base)) {
      $.cache.build.hotSnippet.push(base);
    }
  }
  $.hot.renderer = "{% render 'hot.js'" + [
    "",
    `server: ${$.hot.server}`,
    `socket: ${$.hot.socket}`,
    `strategy: "${$.hot.strategy}"`,
    `scroll: "${$.hot.scroll}"`,
    `label: "${$.hot.label}"`,
    `history: "${$.hot.history}`,
    `method: "${$.hot.method}"`
  ].join(", ") + " %}";
  $.wss = await socket();
}

// syncify/options/filters.ts
init_cjs_shims();
var import_pathe30 = require("pathe");
function throwCommandError(type2, cmd) {
  const pattern = [];
  const ref = object();
  if ($.mode.upload) {
    ref.base = "output";
    ref.from = "output";
    ref.dirs = THEME_DIRS.map((dir) => `${white2("-")} ${blue2(dir)}`);
    ref.fix = [
      `The ${blue2("--filter")} (or ${blue2("-f")}) flag command argument expects you`,
      "provide a theme output directory as the starting point. Filtering begins with",
      "a Shopify output directory name, for example:",
      "",
      `${white2("$")} ${white2(`syncify --filter ${blue2("sections/file.liquid")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("snippets/*")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("templates/*.json")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${bold2(ref.base)} directory`,
      "based on the starting point directory name. You can pass glob star matches following the",
      `directory namespace or starting point ignores (${blue2("!")}) as long the directory can match.`
    ];
  } else {
    ref.base = "input";
    ref.from = "paths";
    ref.dirs = PATH_KEYS.map((dir) => `${white2("-")} ${blue2(dir)}`);
    ref.fix = [
      `The ${blue2("--filter")} (or ${blue2("-f")}) flag command argument expects you`,
      `provide a ${yellow2.bold("paths")} key name as the starting point. Filtering begins with`,
      "a Shopify output directory name, for example:",
      "",
      `${white2("$")} ${white2(`syncify --filter ${blue2("sections/file.liquid")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("snippets/*")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("templates/*.json")}`)}`,
      `${white2("$")} ${white2(`syncify --filter ${blue2("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${bold2(ref.base)} directory`,
      `based on the starting point ${bold2("paths")} name. You can pass glob star matches following the`,
      `starting point or ignores (${blue2("!")}) as long the reference can match.`
    ];
  }
  if (type2 === "pattern") {
    pattern.push(`Invalid ${blue2("--filter")} pattern provided. You cannot pass starting point`);
    if (cmd[0] === "*") {
      pattern.push(`glob (${blue2("*")}) stars as filters, Syncify does not support this.`);
    } else if (cmd[0] === "/") {
      pattern.push(`path (${blue2("/")}) roots as filters, Syncify does not support this.`);
    } else if (cmd[0] === ".") {
      pattern.push(`dot paths (${blue2(".")})  as filters, Syncify does not support this.`);
    }
    pattern.push(
      `Use a starting point reference name based on the ${blue2(ref.from)} key property`,
      `in your ${blue2($.file.base)} file.`
    );
  } else {
    pattern.push(
      `Invalid directory provided. The ${blue2("--filter")} pattern expects the starting point`,
      "directory path be one of the following:",
      "",
      ...ref.dirs,
      ""
    );
  }
  invalidCommand({
    message: pattern,
    expected: "--filter <dir>",
    fix: ref.fix
  });
}
function parseFilter(base, input, regexp) {
  if (input[0] === "*" || input[0] === "/" || input[0] === ".") {
    throwCommandError("pattern", input);
  }
  if (input[0] === "!") {
    if (!regexp.test(input.slice(1))) throwCommandError("dir", input);
    return;
  }
  if (!regexp.test(input)) throwCommandError("dir", input);
  const path2 = input.slice(0, input.indexOf("/"));
  if (!isArray2($.filters[path2])) $.filters[path2] = [];
  $.filters[path2].push((0, import_pathe30.join)(base, input));
}
function setFilters(cli) {
  if (!has2("filter", cli)) return;
  const base = $.mode.upload ? $.dirs.output : $.dirs.input;
  const filter = cli.filter.replace(/\s+/g, " ").trim();
  const regexp = $.mode.upload ? new RegExp(`^(${THEME_DIRS.join("|")})`) : new RegExp(`^(${PATH_KEYS.join("|")})`);
  if (filter.indexOf(",") > -1) {
    const multiple = filter.split(",").filter(Boolean).map((entry) => entry.trim());
    for (const input of multiple) {
      parseFilter(base, input, regexp);
    }
  } else {
    parseFilter(base, filter, regexp);
  }
}

// syncify/options/publish.ts
init_cjs_shims();
async function setPublishConfig() {
  if (isObject($.config.publish) && isEmpty2($.config.publish) === false) {
    for (const prop in $.config.publish) {
      if (!has2(prop, $.publish)) unknownError(`publish.${prop}`, $.config.publish[prop]);
      if (prop === "tunnelPort") {
        if (isNumber($.config.publish[prop]) && isNaN($.config.publish[prop]) === false) {
          $.publish[prop] = $.config.publish[prop];
        } else {
          invalidError({
            option: "publish",
            name: prop,
            value: $.config.hot[prop],
            expects: "visible | hidden"
          });
        }
      } else if (prop === "publishRole") {
        if ($.config.publish[prop] === "main" || $.config.publish[prop] === "unpublished" || $.config.publish[prop] === "development") {
          $.publish[prop] = $.config.publish[prop];
        } else {
          invalidError({
            option: "publish",
            name: prop,
            value: $.config.hot[prop],
            expects: "main | unpublished | development"
          });
        }
      } else if (prop === "bindVersion") {
        if (isBoolean($.config.publish[prop])) {
          $.publish[prop] = $.config.publish[prop];
        } else {
          typeError({
            option: "bindVersion",
            name: prop,
            provided: $.config.publish[prop],
            expects: typeof $.publish[prop]
          });
        }
      } else if (prop === "themeLimit") {
        if (isNumber($.config.publish[prop])) {
          if ($.config.publish[prop] > 5) {
            invalidError({
              option: "publish",
              name: prop,
              value: $.config.hot[prop],
              expects: "1 - 5",
              reason: [
                "Syncify requries a theme limit between 1 and 5."
              ]
            });
          } else {
            $.publish[prop] = $.config.publish[prop];
          }
        } else {
          typeError({
            option: "themeLimit",
            name: prop,
            provided: $.config.publish[prop],
            expects: typeof $.publish[prop]
          });
        }
      }
    }
  }
  if ($.mode.publish === true || $.mode.release === true) {
    if (!has2("ngrok_auth_token", $.env.vars)) {
      throwError(
        "Missing ngrok auth token",
        [
          "Theme publishing requires an ngrok authorisation token",
          `This is easy to obtain, visit ${underline2("https://ngrok.com")}`,
          `and create a ${bold2("free")} account to get a token.`,
          "",
          `Once you have obtained an auth token, provide it in your ${gray2(".env")}`,
          "file, use the following environment variable name:",
          "",
          `${whiteBright2('ngrok_auth_token = ""')}`
        ]
      );
    }
  }
}

// syncify/options/define.ts
async function define(cli, options) {
  timer.start("runtime");
  runtime($);
  await getEnvFile(cli);
  await getPackageJson(cli);
  await getConfig(cli);
  await getCache(cli);
  setMisc(cli);
  setModes(cli);
  if ($.mode.setup || $.mode.strap) return;
  process.env.SYNCIFY_ENV = $.env.dev ? "dev" : "prod";
  process.env.SYNCIFY_WATCH = String($.mode.watch);
  setBaseDirs(cli);
  setVersion(cli);
  setFilters(cli);
  runtime.modes($);
  await setSync(cli);
  if ($.mode.themes) return;
  setChokidar(cli.watch || cli.upload);
  setProcessors();
  setPublishConfig();
  setSpawns();
  await Promise.all(
    [
      setCacheDirs(),
      setThemeDirs(),
      setImportDirs(),
      setPaths()
    ]
  ).catch((e) => {
    throws(e, { details: "Directory and path generation error" });
  });
  if ($.mode.themes) return;
  setJsonOptions();
  setLiquidOptions();
  setSnippetOptions();
  setPlugins();
  if (!$.mode.build) runtime.stores($);
  await setSectionOptions();
  await setScriptOptions();
  await setSvgOptions();
  await setStyleConfig();
  const promise = await Promise.all(
    [
      setHotReloads(),
      cacheDone()
    ]
  ).catch((e) => {
    throws(e, {
      details: "Runtime error"
    });
  });
  runtime.warnings($);
  if (!$.mode.build) runtime.time();
  return promise;
}
function setMisc(cli) {
  $.restart = false;
  $.cli = cli;
  $.cwd = cli.cwd;
  $.env.cli = cli.cli;
  $.env.prod = cli.prod;
  $.env.dev = cli.dev && !cli.prod;
  $.terminal.wrap = Math.round($.terminal.cols - $.terminal.cols / 3);
  const prop = hasProp($.config.log);
  if (prop("silent")) $.log.config.silent = $.config.log.silent;
  if (prop("clear")) $.log.config.clear = $.config.log.clear;
  if (prop("stats")) $.log.config.stats = $.config.log.stats;
  if (prop("warnings")) $.log.config.warnings = $.config.log.warnings;
}
function setChokidar(watch2) {
  if (!watch2) return;
  $.watch = new import_chokidar.FSWatcher({
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: ["*.map"],
    ignorePermissionErrors: true
  });
  $.watch = Object.defineProperties($.watch, {
    has: {
      value(path2, dir = $.cwd) {
        return $.watch._watched.has(dir) ? $.watch._watched.get(dir).items.has(path2) : false;
      }
    },
    paths: {
      get() {
        return toArray(this._closers.keys());
      }
    },
    watching: {
      get() {
        return $.watch._watched;
      }
    }
  });
}
function setProcessors() {
  if (has2("processors", $.config) && isObject(process.config)) {
    for (const prop in $.config.processors) {
      if (isEmpty2($.config.processors[prop])) {
        continue;
      }
      if (isArray2($.config.processors[prop])) {
        $.processor[prop].config = $.config.processors[prop];
      } else if (isObject($.config.processors[prop])) {
        if (prop === "esbuild") {
          $.processor[prop] = merge($.processor[prop], $.config.processors[prop]);
        } else {
          $.processor[prop].config = merge($.processor[prop].config, $.config.processors[prop]);
        }
      }
    }
  }
}
function setPlugins() {
  if (!has2("plugins", $.config)) return;
  if (!isArray2($.config.plugins)) return;
  for (const plugin of $.config.plugins) {
    if (has2("onInit", plugin)) plugin.onInit.call({ ...$ }, $.config);
    if (has2("onChange", plugin)) {
      $.plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }
    if (has2("onTransform", plugin)) {
      $.plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }
    if ($.mode.watch) {
      if (has2("onWatch", plugin)) {
        $.plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }
      if (has2("onReload", plugin)) {
        $.plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }
    if ($.mode.build) {
      if (has2("onBuild", plugin)) {
        $.plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }
  }
}
async function getConfig(cli) {
  const config = await configFile(cli.cwd);
  if (config !== null) {
    $.config = config;
  } else if (has2("syncify", $.pkg)) {
    if (has2("config", $.pkg.syncify)) {
      $.config = $.pkg.syncify.config;
    } else if (!has2("stores", $.pkg.syncify) && cli.setup === false && cli.strap === null) {
      missingConfig(cli.cwd);
    }
  }
}

// syncify/modes/setup.ts
init_cjs_shims();
var import_enquirer3 = require("enquirer");

// syncify/requests/access.ts
init_cjs_shims();
async function get2(client2) {
  return axios.get("/oauth/access_scopes.json", client2).then(({ data }) => {
    return data;
  }).catch((e) => {
    return false;
  });
}

// syncify/modes/setup.ts
async function setup() {
  const message = Create({ type: "info" });
  const model = {
    store: null,
    domain: null,
    token: null,
    ngrok: null,
    version: null,
    scopes: {
      read_content: false,
      read_files: false,
      read_online_store_pages: false,
      read_themes: false,
      write_content: false,
      write_files: false,
      write_online_store_pages: false,
      write_themes: false
    }
  };
  const theme3 = assign({}, theme2, {
    pointer(choice, index) {
      const prefix = this.state.index === index ? Tree.stub.trimEnd() + " " : Tree.trim + " ";
      return prefix;
    }
  });
  const messages = [
    `Existing Setup${COL}  `,
    `Shopify Domain${COL}  `,
    `Admin API Token${COL} `,
    `Ngrok API Token${COL} `
  ];
  if ($.env.file !== null) {
    return log(
      message.Line("Environment references exist, setup can only be used for new installations.").NL.End($.log.group).BR.toString()
    );
  }
  const { domain } = await (0, import_enquirer3.prompt)({
    type: "input",
    name: "domain",
    message: messages[1],
    required: true,
    format(value) {
      return value + ".myshopify.com";
    },
    validate(value) {
      this.state.symbols.pointer = "  ";
      return value === ".myshopify.com" || value.length === 0 ? "Enter myshopify.com domain name" : true;
    },
    theme: theme3
  });
  const { token } = await (0, import_enquirer3.prompt)({
    type: "input",
    name: "token",
    required: true,
    message: messages[2],
    theme: theme3,
    validate(value) {
      this.state.symbols.pointer = "  ";
      return !value || value.length < 10 ? "Invalid Admin API Token" : true;
    }
  });
  const { ngrok } = await (0, import_enquirer3.prompt)({
    type: "input",
    name: "ngrok",
    required: true,
    message: messages[3],
    theme: theme3,
    validate(value) {
      this.state.symbols.pointer = "  ";
      return !value || value.length < 10 ? "Invalid Ngrok API Token" : true;
    }
  });
  const scopes = await get2({
    baseURL: `https://${domain}.myshopify.com/admin`,
    headers: { "X-Shopify-Access-Token": token.trim() }
  });
  if (isBoolean(scopes)) {
    return log(
      message.NL.Wrap(
        `Connection failed on ${cyan2(`${domain}.myshopify.com`)}. Please check the API Access Token`,
        "is correct and you have set the right access scopes, then try again.",
        red2
      ).NL.End($.log.group).BR.toString()
    );
  }
  if (scopes.access_scopes.length > 0) {
    message.Newline();
    for (const { handle } of scopes.access_scopes) {
      if (handle in model.scopes) {
        model.scopes[handle] = true;
        message.Line(`${CHK} ${handle}`);
      }
    }
  }
  let count = 0;
  for (const scope in model.scopes) {
    if (model.scopes[scope] === false) {
      message.Line(`${BAD} ${scope}`, red2);
      count = count + 1;
    }
  }
  if (count > 0) {
    return log(
      message.NL.Wrap(
        "Syncify requires read and write access to all the above resources.",
        "Provide access to all scopes listed in red (above) and try again.",
        red2
      ).NL.End($.log.group).BR.toString()
    );
  }
  log(message.toLine());
  model.store = domain;
  model.domain = `${domain}.myshopify.com`;
  model.token = token.trim();
  model.ngrok = ngrok.trim();
}

// syncify/modes/strap.ts
init_cjs_shims();
var import_enquirer4 = require("enquirer");
var import_fs_extra23 = require("fs-extra");
var import_pathe31 = require("pathe");
async function strap() {
  const dir = (0, import_pathe31.join)($.cwd, "node_modules", "@syncify/cli", "straps");
  const straps = {
    dawn: (0, import_pathe31.join)(dir, "dawn"),
    dusk: (0, import_pathe31.join)(dir, "dusk"),
    silk: (0, import_pathe31.join)(dir, "silk")
  };
  const theme3 = assign({}, theme2, {
    pointer(choice, index) {
      const prefix = this.state.index === index ? Tree.stub.trimEnd() + " " : Tree.trim + " ";
      return prefix;
    }
  });
  const { template } = await (0, import_enquirer4.prompt)({
    type: "select",
    name: "template",
    message: `Choose Strap${COL}    `,
    required: true,
    theme: theme3,
    choices: [
      {
        name: "dusk",
        message: "Dusk  ",
        hint: "Stripped theme"
      },
      {
        name: "dawn",
        message: "Dawn  ",
        hint: "Shopify Slop"
      },
      {
        name: "silk",
        message: "Silk  ",
        hint: "Custom theme"
      }
    ]
  });
  (0, import_fs_extra23.copy)(straps[template], $.cwd);
}

// syncify/api.ts
init_cjs_shims();

// syncify/index.ts
async function run(options, config, callback) {
  if (has("_", options)) options._ = options._.slice(1);
  if (import_node_process10.argv.slice(2).length === 0 || options.help === "examples" || isString(options.help) && options.help.length === 0) return help(options);
  await define(options, config);
  if ($.mode.themes) return themes();
  if ($.mode.setup) return setup();
  if ($.mode.strap) return strap();
  process.stdin.on("data", stdin);
  try {
    $.env.ready = true;
    if ($.mode.build && $.mode.export === false) {
      return build(callback);
    } else if ($.mode.watch) {
      return watch(callback);
    } else if ($.mode.upload) {
      return upload3(callback);
    } else if ($.mode.import) {
      return importing(callback);
    } else if ($.mode.export && $.mode.publish === false) {
      return exporting(callback);
    } else if ($.mode.publish) {
      return publish(callback);
    } else if ($.mode.interactive) {
      return console.log("TODO: --interactive is not yet supported");
    } else if ($.mode.metafields) {
      return console.log("TODO: --metafields is not yet supported");
    }
  } catch (e) {
    console.log(e);
  }
}

// syncify/cli.ts
run((0, import_minimist.default)(import_node_process11.argv.slice(1), {
  alias: {
    /* DIRECTORIES -------------------------------- */
    config: "c",
    input: "i",
    output: "o",
    /* MODES -------------------------------------- */
    build: "b",
    watch: "w",
    upload: "u",
    publish: "p",
    /* RESOURCE ----------------------------------- */
    theme: "t",
    help: "h",
    spawn: "s",
    /* OPERATIONS --------------------------------- */
    resource: "r",
    filter: "f",
    delete: "d"
  },
  default: {
    cwd: process.cwd(),
    /* DIRECTORIES -------------------------------- */
    config: ".",
    input: "source",
    /* ENV ---------------------------------------- */
    cli: true,
    dev: true,
    prod: false,
    /* MODES -------------------------------------- */
    setup: false,
    import: false,
    export: false,
    build: false,
    watch: false,
    upload: false,
    terse: false,
    hot: false,
    interactive: false,
    publish: false,
    release: false,
    /* TRANSFORMS --------------------------------- */
    views: false,
    script: false,
    style: false,
    svg: false,
    image: false,
    /* RESOURCES ---------------------------------- */
    metafields: false,
    pages: false,
    redirects: false,
    /* OPERATIONS --------------------------------- */
    doctor: false,
    clean: false,
    silent: false,
    force: false,
    cache: false,
    /* STRAPS ------------------------------------ */
    strap: null,
    /* VERSIONING -------------------------------- */
    bump: null,
    /* HELP --------------------------------------- */
    help: null
  },
  boolean: [
    /* MODES -------------------------------------- */
    "build",
    "watch",
    "upload",
    "import",
    "export",
    "hot",
    "terse",
    "interactive",
    "setup",
    /* ENV ---------------------------------------- */
    "dev",
    "prod",
    /* RESOURCE ----------------------------------- */
    "metafields",
    "pages",
    "redirects",
    /* OPERATIONS --------------------------------- */
    "clean",
    "silent",
    "pull",
    "force",
    "test",
    "cache",
    "doctor",
    /* GENERATORS --------------------------------- */
    "strap",
    /* TRANSFORMS --------------------------------- */
    "views",
    "script",
    "style",
    "svg",
    "image"
  ],
  string: [
    /* DIRECTORIES -------------------------------- */
    "input",
    // --input ./path/dir | -i ./path/dir
    "output",
    // --output ./path/dir | -o ./path/dir
    "config",
    // --config ./path/dir | -c ./path/dir
    /* MODES -------------------------------------- */
    "theme",
    // --theme foo | -t foo | (comma lists: foo,bar,baz)
    "spawn",
    // --spawn foo | (comma lists: foo,bar,baz)
    "del",
    // --delete file.liquid | --del file.ext | (comma lists: foo,bar,baz)
    "release",
    // --release patch | --release minor | --release major
    /* OPERATIONS --------------------------------- */
    "bump",
    // --bump major | --bump minor | --bump patch
    "resource",
    /* FILTERING ---------------------------------- */
    "filter",
    /* HELP --------------------------------------- */
    "help",
    /* TODO --------------------------------------- */
    "strap"
    // --strap silk | --strap dawn | --strap dusk
  ]
})).catch(console.error);
/*! Bundled license information:

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

imurmurhash/imurmurhash.js:
  (**
   * @preserve
   * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
   *
   * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
   * @see http://github.com/homebrewing/brauhaus-diff
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *)
*/
