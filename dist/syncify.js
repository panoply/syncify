'use strict';

var path2 = require('node:path');
var node_child_process = require('node:child_process');
var process2 = require('node:process');
var node_url = require('node:url');
var node_os = require('node:os');
var readline = require('node:readline');
var types = require('node:util/types');
var notifier2 = require('node-notifier');
var node_crypto = require('node:crypto');
var node_util = require('node:util');
var zlib2 = require('node:zlib');
var node_console = require('node:console');
var node_stream = require('node:stream');
var EventEmitter2 = require('node:events');
var node_fs = require('node:fs');
var glob = require('fast-glob');
var fsExtra = require('fs-extra');
var xior = require('xior');
var json = require('@syncify/json');
var cbor = require('cbor');
var enquirer = require('enquirer');
var acquire = require('@syncify/acquire');
var uws = require('@syncify/uws');
var esbuild = require('esbuild');
var fsPromises2 = require('node:fs/promises');
var watcher = require('@parcel/watcher');
var turndown = require('@syncify/turndown');
var child_process = require('child_process');
var path = require('path');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path2__default = /*#__PURE__*/_interopDefault(path2);
var process2__default = /*#__PURE__*/_interopDefault(process2);
var readline__default = /*#__PURE__*/_interopDefault(readline);
var notifier2__default = /*#__PURE__*/_interopDefault(notifier2);
var zlib2__default = /*#__PURE__*/_interopDefault(zlib2);
var EventEmitter2__default = /*#__PURE__*/_interopDefault(EventEmitter2);
var glob__default = /*#__PURE__*/_interopDefault(glob);
var xior__default = /*#__PURE__*/_interopDefault(xior);
var cbor__default = /*#__PURE__*/_interopDefault(cbor);
var esbuild__default = /*#__PURE__*/_interopDefault(esbuild);
var fsPromises2__default = /*#__PURE__*/_interopDefault(fsPromises2);

/**
 * SYNCIFY CLI ~ v1.0.0-alpha.1
 *
 * E: n.savvidis@gmx.com
 * X: @niksavvidis
 * W: https://syncify.sh
 *
 * © 2025 Νικολας Σαββιδης / Nik Savvidis
 *
 * -----------------------------------------
 *
 * APACHE 2.0 LICENSE
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS LICENSE MUST BE PRESENT IN ALL COPIES
 */
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
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// packages/timer/dist/index.js
var require_dist = __commonJS({
  "packages/timer/dist/index.js"(exports) {
    var perf_hooks = __require("perf_hooks");
    var { floor: e2 } = Math;
    var f = new class {
      marks = [];
      time = /* @__PURE__ */ Object.create(null);
      cache = /* @__PURE__ */ Object.create(null);
      now(t2) {
        return this.stop(t2 || true);
      }
      sec(t2) {
        let r2 = this.stop(t2 || true);
        return r2.slice(0, r2.lastIndexOf(" "));
      }
      pause(t2) {
        t2 in this.marks && (this.cache[t2] = this.stop(t2 || true));
      }
      start(t2) {
        t2 ? this.time[t2] = perf_hooks.performance.now() : this.marks.push(perf_hooks.performance.now());
      }
      clear(t2) {
        if (t2) {
          if (t2 in this.time) {
            delete this.time[t2];
            return;
          }
          if (t2 in this.cache) {
            delete this.cache[t2];
            return;
          }
        }
        for (; this.marks.length !== 0; ) this.marks.pop();
      }
      stop(t2 = false, r2 = false, o2 = false) {
        let n;
        if (typeof t2 == "boolean") n = t2 ? this.marks[this.marks.length - 1] : this.marks.pop();
        else if (t2) {
          if (t2 in this.cache) {
            let m2 = this.cache[t2];
            return delete this.cache[t2], m2;
          }
          r2 ? (n = this.time[t2], delete this.time[t2]) : n = this.time[t2];
        }
        let s2 = perf_hooks.performance.now() - n;
        if (isNaN(s2)) return "";
        if (s2 < 1) return `${Math.round(s2 * 1e3)}\u03BCs`;
        if (s2 < 1e3) return `${Math.floor(s2)}ms`;
        let i = e2(s2 / 1e3);
        if (i < 60) return `${i}s ${e2(s2 % 1e3)}ms`;
        let h = e2(i / 60), a2 = i % 60;
        return h < 60 ? `${h}m ${a2}s ${e2(s2 % 1e3)}ms` : `${e2(h / 60)}h ${h % 60}m ${i % 60}s ${e2(s2 % 1e3)}ms`;
      }
    }();
    exports.timer = f;
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    var has2 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn2, context, once) {
      this.fn = fn2;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event2, fn2, context, once) {
      if (typeof fn2 !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn2, context || emitter, once), evt = prefix ? prefix + event2 : event2;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has2.call(events, name)) names.push(prefix ? name.slice(1) : name);
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
      for (var i = 0, l2 = handlers.length, ee2 = new Array(l2); i < l2; i++) {
        ee2[i] = handlers[i].fn;
      }
      return ee2;
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
    EventEmitter3.prototype.on = function on2(event2, fn2, context) {
      return addListener(this, event2, fn2, context, false);
    };
    EventEmitter3.prototype.once = function once(event2, fn2, context) {
      return addListener(this, event2, fn2, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event2, fn2, context, once) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt]) return this;
      if (!fn2) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn2 && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn2 || once && !listeners[i].once || context && listeners[i].context !== context) {
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
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter3;
    }
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js"(exports, module) {
    var path5 = __require("path");
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
    module.exports = {
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
      SEP: path5.sep,
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
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js"(exports) {
    var path5 = __require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path5.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
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
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js"(exports, module) {
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
      const tokens = [];
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
          tokens.push(token);
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
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
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
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js"(exports, module) {
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
        return args.map((v3) => utils.escapeRegex(v3)).join("..");
      }
      return value;
    };
    var syntaxError = (type2, char) => {
      return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse11 = (input, options) => {
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
      const tokens = [bos];
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
        tokens
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
        tokens.push(tok);
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
            const expression = parse11(rest, { ...options, fastpaths: false }).output;
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
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m2, esc2, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m2;
          }
          if (first === "?") {
            if (esc2) {
              return esc2 + first + (rest ? QMARK.repeat(rest.length) : "");
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
            if (esc2) {
              return esc2 + first + (rest ? star : "");
            }
            return star;
          }
          return esc2 ? m2 : `\\${m2}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m2) => {
              return m2.length % 2 === 0 ? "\\\\" : m2 ? "\\" : "";
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
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
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
                  if (!bos.output && tokens.indexOf(prev) === 1) {
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
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
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
            for (const t2 of toks) {
              state.output += t2.output || t2.value;
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
            tokens.pop();
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
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
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
    parse11.fastpaths = (input, options) => {
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
      const create = (str) => {
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
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse11;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    var path5 = __require("path");
    var scan = require_scan();
    var parse11 = require_parse();
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
      const regex = isState ? picomatch.compileRe(glob9, options) : picomatch.makeRe(glob9, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob: glob9, posix });
        const result = { glob: glob9, state, regex, posix, input, output, match, isMatch };
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
    picomatch.test = (input, regex, options, { glob: glob9, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format2 = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob9;
      let output = match && format2 ? format2(input) : input;
      if (match === false) {
        output = format2 ? format2(input) : input;
        match = output === glob9;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob9, options, posix = utils.isWindows(options)) => {
      const regex = glob9 instanceof RegExp ? glob9 : picomatch.makeRe(glob9, options);
      return regex.test(path5.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
      return parse11(pattern, { ...options, fastpaths: false });
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
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse11.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse11(input, options);
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
    module.exports = picomatch;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js"(exports, module) {
    module.exports = require_picomatch();
  }
});

// node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports, module) {
    module.exports = function(path5, stripTrailing) {
      if (typeof path5 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path5 === "\\" || path5 === "/") return "/";
      var len = path5.length;
      if (len <= 1) return path5;
      var prefix = "";
      if (len > 4 && path5[3] === "\\") {
        var ch = path5[2];
        if ((ch === "?" || ch === ".") && path5.slice(0, 2) === "\\\\") {
          path5 = path5.slice(2);
          prefix = "//";
        }
      }
      var segs = path5.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js"(exports, module) {
    Object.defineProperty(exports, "__esModule", { value: true });
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
      const path5 = normalizePath(_path, false);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path5)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path5].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path5)) {
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
    module.exports = anymatch8;
  }
});

// node_modules/.pnpm/imurmurhash@0.1.4/node_modules/imurmurhash/imurmurhash.js
var require_imurmurhash = __commonJS({
  "node_modules/.pnpm/imurmurhash@0.1.4/node_modules/imurmurhash/imurmurhash.js"(exports, module) {
    (function() {
      var cache;
      function MurmurHash3(key, seed) {
        var m2 = this instanceof MurmurHash3 ? this : cache;
        m2.reset(seed);
        if (typeof key === "string" && key.length > 0) {
          m2.hash(key);
        }
        if (m2 !== this) {
          return m2;
        }
      }
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
      if (typeof module != "undefined") {
        module.exports = MurmurHash3;
      } else {
        this.MurmurHash3 = MurmurHash3;
      }
    })();
  }
});

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/signals.js
var require_signals = __commonJS({
  "node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/signals.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.signals = void 0;
    exports.signals = [];
    exports.signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      exports.signals.push(
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
      exports.signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/cjs/index.js"(exports) {
    var _a14;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unload = exports.load = exports.onExit = exports.signals = void 0;
    var signals_js_1 = require_signals();
    Object.defineProperty(exports, "signals", { enumerable: true, get: function() {
      return signals_js_1.signals;
    } });
    var processOk = (process5) => !!process5 && typeof process5 === "object" && typeof process5.removeListener === "function" && typeof process5.emit === "function" && typeof process5.reallyExit === "function" && typeof process5.listeners === "function" && typeof process5.kill === "function" && typeof process5.pid === "number" && typeof process5.on === "function";
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
      on(ev, fn2) {
        this.listeners[ev].push(fn2);
      }
      removeListener(ev, fn2) {
        const list2 = this.listeners[ev];
        const i = list2.indexOf(fn2);
        if (i === -1) {
          return;
        }
        if (i === 0 && list2.length === 1) {
          list2.length = 0;
        } else {
          list2.splice(i, 1);
        }
      }
      emit(ev, code, signal) {
        if (this.emitted[ev]) {
          return false;
        }
        this.emitted[ev] = true;
        let ret = false;
        for (const fn2 of this.listeners[ev]) {
          ret = fn2(code, signal) === true || ret;
        }
        if (ev === "exit") {
          ret = this.emit("afterExit", code, signal) || ret;
        }
        return ret;
      }
    };
    var SignalExitBase = class {
    };
    var signalExitWrap = (handler) => {
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
    var _hupSig, _emitter, _process, _originalProcessEmit, _originalProcessReallyExit, _sigListeners, _loaded, _SignalExit_instances, processReallyExit_fn, processEmit_fn;
    var SignalExit = class extends SignalExitBase {
      constructor(process5) {
        super();
        __privateAdd(this, _SignalExit_instances);
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        /* c8 ignore start */
        __privateAdd(this, _hupSig, process4.platform === "win32" ? "SIGINT" : "SIGHUP");
        /* c8 ignore stop */
        __privateAdd(this, _emitter, new Emitter());
        __privateAdd(this, _process);
        __privateAdd(this, _originalProcessEmit);
        __privateAdd(this, _originalProcessReallyExit);
        __privateAdd(this, _sigListeners, {});
        __privateAdd(this, _loaded, false);
        __privateSet(this, _process, process5);
        __privateSet(this, _sigListeners, {});
        for (const sig of signals_js_1.signals) {
          __privateGet(this, _sigListeners)[sig] = () => {
            const listeners = __privateGet(this, _process).listeners(sig);
            let { count } = __privateGet(this, _emitter);
            const p = process5;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = __privateGet(this, _emitter).emit("exit", null, sig);
              const s2 = sig === "SIGHUP" ? __privateGet(this, _hupSig) : sig;
              if (!ret)
                process5.kill(process5.pid, s2);
            }
          };
        }
        __privateSet(this, _originalProcessReallyExit, process5.reallyExit);
        __privateSet(this, _originalProcessEmit, process5.emit);
      }
      onExit(cb, opts) {
        if (!processOk(__privateGet(this, _process))) {
          return () => {
          };
        }
        if (__privateGet(this, _loaded) === false) {
          this.load();
        }
        const ev = (opts == null ? void 0 : opts.alwaysLast) ? "afterExit" : "exit";
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
        for (const sig of signals_js_1.signals) {
          try {
            const fn2 = __privateGet(this, _sigListeners)[sig];
            if (fn2)
              __privateGet(this, _process).on(sig, fn2);
          } catch (_) {
          }
        }
        __privateGet(this, _process).emit = (ev, ...a2) => {
          return __privateMethod(this, _SignalExit_instances, processEmit_fn).call(this, ev, ...a2);
        };
        __privateGet(this, _process).reallyExit = (code) => {
          return __privateMethod(this, _SignalExit_instances, processReallyExit_fn).call(this, code);
        };
      }
      unload() {
        if (!__privateGet(this, _loaded)) {
          return;
        }
        __privateSet(this, _loaded, false);
        signals_js_1.signals.forEach((sig) => {
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
    };
    _hupSig = new WeakMap();
    _emitter = new WeakMap();
    _process = new WeakMap();
    _originalProcessEmit = new WeakMap();
    _originalProcessReallyExit = new WeakMap();
    _sigListeners = new WeakMap();
    _loaded = new WeakMap();
    _SignalExit_instances = new WeakSet();
    processReallyExit_fn = function(code) {
      if (!processOk(__privateGet(this, _process))) {
        return 0;
      }
      __privateGet(this, _process).exitCode = code || 0;
      __privateGet(this, _emitter).emit("exit", __privateGet(this, _process).exitCode, null);
      return __privateGet(this, _originalProcessReallyExit).call(__privateGet(this, _process), __privateGet(this, _process).exitCode);
    };
    processEmit_fn = function(ev, ...args) {
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
    };
    var process4 = globalThis.process;
    _a14 = signalExitWrap(processOk(process4) ? new SignalExit(process4) : new SignalExitFallback()), /**
     * Called when the process is exiting, whether via signal, explicit
     * exit, or running out of stuff to do.
     *
     * If the global process object is not suitable for instrumentation,
     * then this will be a no-op.
     *
     * Returns a function that may be used to unload signal-exit.
     */
    exports.onExit = _a14.onExit, /**
     * Load the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports.load = _a14.load, /**
     * Unload the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports.unload = _a14.unload;
  }
});

// node_modules/.pnpm/write-file-atomic@6.0.0/node_modules/write-file-atomic/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/write-file-atomic@6.0.0/node_modules/write-file-atomic/lib/index.js"(exports, module) {
    module.exports = writeFile13;
    module.exports.sync = writeFileSync2;
    module.exports._getTmpname = getTmpname;
    module.exports._cleanupOnExit = cleanupOnExit;
    var fs2 = __require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit } = require_cjs();
    var path5 = __require("path");
    var { promisify: promisify3 } = __require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = __require("worker_threads");
        return workerThreads.threadId;
      } catch (e2) {
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
          fs2.unlinkSync(typeof tmpfile === "function" ? tmpfile() : tmpfile);
        } catch {
        }
      };
    }
    function serializeActiveFile(absoluteName) {
      return new Promise((resolve2) => {
        if (!activeFiles[absoluteName]) {
          activeFiles[absoluteName] = [];
        }
        activeFiles[absoluteName].push(resolve2);
        if (activeFiles[absoluteName].length === 1) {
          resolve2();
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
      const removeOnExitHandler = onExit(cleanupOnExit(() => tmpfile));
      const absoluteName = path5.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify3(fs2.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify3(fs2.stat)(truename).catch(() => {
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
        fd = await promisify3(fs2.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify3(fs2.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify3(fs2.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify3(fs2.fsync)(fd);
        }
        await promisify3(fs2.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify3(fs2.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify3(fs2.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify3(fs2.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify3(fs2.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify3(fs2.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile13(filename, data, options, callback) {
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
    function writeFileSync2(filename, data, options) {
      if (typeof options === "string") {
        options = { encoding: options };
      } else if (!options) {
        options = {};
      }
      try {
        filename = fs2.realpathSync(filename);
      } catch (ex) {
      }
      const tmpfile = getTmpname(filename);
      if (!options.mode || !options.chown) {
        try {
          const stats = fs2.statSync(filename);
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
      const removeOnExitHandler = onExit(cleanup);
      let threw = true;
      try {
        fd = fs2.openSync(tmpfile, "w", options.mode || 438);
        if (options.tmpfileCreated) {
          options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          fs2.writeSync(fd, data, 0, data.length, 0);
        } else if (data != null) {
          fs2.writeSync(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          fs2.fsyncSync(fd);
        }
        fs2.closeSync(fd);
        fd = null;
        if (options.chown) {
          try {
            fs2.chownSync(tmpfile, options.chown.uid, options.chown.gid);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        if (options.mode) {
          try {
            fs2.chmodSync(tmpfile, options.mode);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        fs2.renameSync(tmpfile, filename);
        threw = false;
      } finally {
        if (fd) {
          try {
            fs2.closeSync(fd);
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

// node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js"(exports, module) {
    module.exports = writeFile13;
    module.exports.sync = writeFileSync2;
    module.exports._getTmpname = getTmpname;
    module.exports._cleanupOnExit = cleanupOnExit;
    var fs2 = __require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit } = require_cjs();
    var path5 = __require("path");
    var { promisify: promisify3 } = __require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = __require("worker_threads");
        return workerThreads.threadId;
      } catch (e2) {
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
          fs2.unlinkSync(typeof tmpfile === "function" ? tmpfile() : tmpfile);
        } catch {
        }
      };
    }
    function serializeActiveFile(absoluteName) {
      return new Promise((resolve2) => {
        if (!activeFiles[absoluteName]) {
          activeFiles[absoluteName] = [];
        }
        activeFiles[absoluteName].push(resolve2);
        if (activeFiles[absoluteName].length === 1) {
          resolve2();
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
      const removeOnExitHandler = onExit(cleanupOnExit(() => tmpfile));
      const absoluteName = path5.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify3(fs2.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify3(fs2.stat)(truename).catch(() => {
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
        fd = await promisify3(fs2.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify3(fs2.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify3(fs2.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify3(fs2.fsync)(fd);
        }
        await promisify3(fs2.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify3(fs2.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify3(fs2.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify3(fs2.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify3(fs2.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify3(fs2.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile13(filename, data, options, callback) {
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
    function writeFileSync2(filename, data, options) {
      if (typeof options === "string") {
        options = { encoding: options };
      } else if (!options) {
        options = {};
      }
      try {
        filename = fs2.realpathSync(filename);
      } catch (ex) {
      }
      const tmpfile = getTmpname(filename);
      if (!options.mode || !options.chown) {
        try {
          const stats = fs2.statSync(filename);
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
      const removeOnExitHandler = onExit(cleanup);
      let threw = true;
      try {
        fd = fs2.openSync(tmpfile, "w", options.mode || 438);
        if (options.tmpfileCreated) {
          options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          fs2.writeSync(fd, data, 0, data.length, 0);
        } else if (data != null) {
          fs2.writeSync(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          fs2.fsyncSync(fd);
        }
        fs2.closeSync(fd);
        fd = null;
        if (options.chown) {
          try {
            fs2.chownSync(tmpfile, options.chown.uid, options.chown.gid);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        if (options.mode) {
          try {
            fs2.chmodSync(tmpfile, options.mode);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        fs2.renameSync(tmpfile, filename);
        threw = false;
      } finally {
        if (fd) {
          try {
            fs2.closeSync(fd);
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

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports, module) {
    var p = process || {};
    var argv = p.argv || [];
    var env2 = p.env || {};
    var isColorSupported = !(!!env2.NO_COLOR || argv.includes("--no-color")) && (!!env2.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env2.TERM !== "dumb" || !!env2.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens2 = __commonJS({
  "node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports.matchToToken = function(match) {
      var token = { type: "invalid", value: match[0], closed: void 0 };
      if (match[1]) token.type = "string", token.closed = !!(match[3] || match[4]);
      else if (match[5]) token.type = "comment";
      else if (match[6]) token.type = "comment", token.closed = !!match[7];
      else if (match[8]) token.type = "regex";
      else if (match[9]) token.type = "number";
      else if (match[10]) token.type = "name";
      else if (match[11]) token.type = "punctuator";
      else if (match[12]) token.type = "whitespace";
      return token;
    };
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isIdentifierChar = isIdentifierChar;
    exports.isIdentifierName = isIdentifierName;
    exports.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isKeyword = isKeyword;
    exports.isReservedWord = isReservedWord;
    exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports.isStrictBindReservedWord = isStrictBindReservedWord;
    exports.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
      strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
      strictBind: ["eval", "arguments"]
    };
    var keywords2 = new Set(reservedWords.keyword);
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
      return keywords2.has(word);
    }
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.9/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "isIdentifierChar", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    });
    Object.defineProperty(exports, "isIdentifierName", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierName;
      }
    });
    Object.defineProperty(exports, "isIdentifierStart", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    });
    Object.defineProperty(exports, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    Object.defineProperty(exports, "isReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  }
});

// node_modules/.pnpm/@babel+code-frame@7.26.2/node_modules/@babel/code-frame/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/@babel+code-frame@7.26.2/node_modules/@babel/code-frame/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var picocolors = require_picocolors();
    var jsTokens = require_js_tokens2();
    var helperValidatorIdentifier = require_lib3();
    function isColorSupported() {
      return typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? false : picocolors.isColorSupported;
    }
    var compose = (f, g3) => (v3) => f(g3(v3));
    function buildDefs(colors2) {
      return {
        keyword: colors2.cyan,
        capitalized: colors2.yellow,
        jsxIdentifier: colors2.yellow,
        punctuator: colors2.yellow,
        number: colors2.magenta,
        string: colors2.green,
        regex: colors2.magenta,
        comment: colors2.gray,
        invalid: compose(compose(colors2.white, colors2.bgRed), colors2.bold),
        gutter: colors2.gray,
        marker: compose(colors2.red, colors2.bold),
        message: compose(colors2.red, colors2.bold),
        reset: colors2.reset
      };
    }
    var defsOn = buildDefs(picocolors.createColors(true));
    var defsOff = buildDefs(picocolors.createColors(false));
    function getDefs(enabled) {
      return enabled ? defsOn : defsOff;
    }
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    var NEWLINE$1 = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET2 = /^[()[\]{}]$/;
    var tokenize2;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType2 = function(token, offset, text) {
        if (token.type === "name") {
          if (helperValidatorIdentifier.isKeyword(token.value) || helperValidatorIdentifier.isStrictReservedWord(token.value, true) || sometimesKeywords.has(token.value)) {
            return "keyword";
          }
          if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.slice(offset - 2, offset) === "</")) {
            return "jsxIdentifier";
          }
          if (token.value[0] !== token.value[0].toLowerCase()) {
            return "capitalized";
          }
        }
        if (token.type === "punctuator" && BRACKET2.test(token.value)) {
          return "bracket";
        }
        if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
          return "punctuator";
        }
        return token.type;
      };
      tokenize2 = function* (text) {
        let match;
        while (match = jsTokens.default.exec(text)) {
          const token = jsTokens.matchToToken(match);
          yield {
            type: getTokenType2(token, match.index, text),
            value: token.value
          };
        }
      };
    }
    function highlight3(text) {
      if (text === "") return "";
      const defs = getDefs(true);
      let highlighted = "";
      for (const {
        type: type2,
        value
      } of tokenize2(text)) {
        if (type2 in defs) {
          highlighted += value.split(NEWLINE$1).map((str) => defs[type2](str)).join("\n");
        } else {
          highlighted += value;
        }
      }
      return highlighted;
    }
    var deprecationWarningShown = false;
    var NEWLINE2 = /\r\n|[\n\r\u2028\u2029]/;
    function getMarkerLines2(loc, source, opts) {
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
      const shouldHighlight = opts.forceColor || isColorSupported() && opts.highlightCode;
      const defs = getDefs(shouldHighlight);
      const lines = rawLines.split(NEWLINE2);
      const {
        start,
        end,
        markerLines
      } = getMarkerLines2(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = shouldHighlight ? highlight3(rawLines) : rawLines;
      let frame = highlightedLines.split(NEWLINE2, end).slice(start, end).map((line, index2) => {
        const number = start + 1 + index2;
        const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
        const gutter = ` ${paddedNumber} |`;
        const hasMarker = markerLines[number];
        const lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
            const numberOfMarkers = hasMarker[1] || 1;
            markerLine = ["\n ", defs.gutter(gutter.replace(/\d/g, " ")), " ", markerSpacing, defs.marker("^").repeat(numberOfMarkers)].join("");
            if (lastMarkerLine && opts.message) {
              markerLine += " " + defs.message(opts.message);
            }
          }
          return [defs.marker(">"), defs.gutter(gutter), line.length > 0 ? ` ${line}` : "", markerLine].join("");
        } else {
          return ` ${defs.gutter(gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        }
      }).join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (shouldHighlight) {
        return defs.reset(frame);
      } else {
        return frame;
      }
    }
    function index(rawLines, lineNumber, colNumber, opts = {}) {
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
    exports.codeFrameColumns = codeFrameColumns2;
    exports.default = index;
    exports.highlight = highlight3;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/debug.js"(exports, module) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/constants.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/constants.js"(exports, module) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/re.js"(exports, module) {
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants2();
    var debug = require_debug();
    exports = module.exports = {};
    var re2 = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t2 = exports.t = {};
    var R2 = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R2++;
      debug(name, index, value);
      t2[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
    createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
    createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t2.COERCE], true);
    createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/parse-options.js"(exports, module) {
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/internal/identifiers.js"(exports, module) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a2, b) => {
      const anum = numeric.test(a2);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a2 = +a2;
        b = +b;
      }
      return a2 === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a2, b) => compareIdentifiers(b, a2);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/classes/semver.js"(exports, module) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants2();
    var { safeRe: re2, safeSrc: src, t: t2 } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m2 = version.trim().match(options.loose ? re2[t2.LOOSE] : re2[t2.FULL]);
        if (!m2) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m2[1];
        this.minor = +m2[2];
        this.patch = +m2[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m2[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m2[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m2[5] ? m2[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a2 = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a2, b);
          if (a2 === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b) {
            continue;
          } else {
            return compareIdentifiers(a2, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a2 = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a2, b);
          if (a2 === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b) {
            continue;
          } else {
            return compareIdentifiers(a2, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const r2 = new RegExp(`^${this.options.loose ? src[t2.PRERELEASELOOSE] : src[t2.PRERELEASE]}$`);
            const match = `-${identifier}`.match(r2);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/parse.js
var require_parse2 = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/parse.js"(exports, module) {
    var SemVer = require_semver();
    var parse11 = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er2) {
        if (!throwErrors) {
          return null;
        }
        throw er2;
      }
    };
    module.exports = parse11;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/valid.js"(exports, module) {
    var parse11 = require_parse2();
    var valid = (version, options) => {
      const v3 = parse11(version, options);
      return v3 ? v3.version : null;
    };
    module.exports = valid;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/clean.js"(exports, module) {
    var parse11 = require_parse2();
    var clean = (version, options) => {
      const s2 = parse11(version.trim().replace(/^[=v]+/, ""), options);
      return s2 ? s2.version : null;
    };
    module.exports = clean;
  }
});

// node_modules/.pnpm/spdx-license-ids@3.0.21/node_modules/spdx-license-ids/index.json
var require_spdx_license_ids = __commonJS({
  "node_modules/.pnpm/spdx-license-ids@3.0.21/node_modules/spdx-license-ids/index.json"(exports, module) {
    module.exports = [
      "0BSD",
      "3D-Slicer-1.0",
      "AAL",
      "ADSL",
      "AFL-1.1",
      "AFL-1.2",
      "AFL-2.0",
      "AFL-2.1",
      "AFL-3.0",
      "AGPL-1.0-only",
      "AGPL-1.0-or-later",
      "AGPL-3.0-only",
      "AGPL-3.0-or-later",
      "AMD-newlib",
      "AMDPLPA",
      "AML",
      "AML-glslang",
      "AMPAS",
      "ANTLR-PD",
      "ANTLR-PD-fallback",
      "APAFML",
      "APL-1.0",
      "APSL-1.0",
      "APSL-1.1",
      "APSL-1.2",
      "APSL-2.0",
      "ASWF-Digital-Assets-1.0",
      "ASWF-Digital-Assets-1.1",
      "Abstyles",
      "AdaCore-doc",
      "Adobe-2006",
      "Adobe-Display-PostScript",
      "Adobe-Glyph",
      "Adobe-Utopia",
      "Afmparse",
      "Aladdin",
      "Apache-1.0",
      "Apache-1.1",
      "Apache-2.0",
      "App-s2p",
      "Arphic-1999",
      "Artistic-1.0",
      "Artistic-1.0-Perl",
      "Artistic-1.0-cl8",
      "Artistic-2.0",
      "BSD-1-Clause",
      "BSD-2-Clause",
      "BSD-2-Clause-Darwin",
      "BSD-2-Clause-Patent",
      "BSD-2-Clause-Views",
      "BSD-2-Clause-first-lines",
      "BSD-3-Clause",
      "BSD-3-Clause-Attribution",
      "BSD-3-Clause-Clear",
      "BSD-3-Clause-HP",
      "BSD-3-Clause-LBNL",
      "BSD-3-Clause-Modification",
      "BSD-3-Clause-No-Military-License",
      "BSD-3-Clause-No-Nuclear-License",
      "BSD-3-Clause-No-Nuclear-License-2014",
      "BSD-3-Clause-No-Nuclear-Warranty",
      "BSD-3-Clause-Open-MPI",
      "BSD-3-Clause-Sun",
      "BSD-3-Clause-acpica",
      "BSD-3-Clause-flex",
      "BSD-4-Clause",
      "BSD-4-Clause-Shortened",
      "BSD-4-Clause-UC",
      "BSD-4.3RENO",
      "BSD-4.3TAHOE",
      "BSD-Advertising-Acknowledgement",
      "BSD-Attribution-HPND-disclaimer",
      "BSD-Inferno-Nettverk",
      "BSD-Protection",
      "BSD-Source-Code",
      "BSD-Source-beginning-file",
      "BSD-Systemics",
      "BSD-Systemics-W3Works",
      "BSL-1.0",
      "BUSL-1.1",
      "Baekmuk",
      "Bahyph",
      "Barr",
      "Beerware",
      "BitTorrent-1.0",
      "BitTorrent-1.1",
      "Bitstream-Charter",
      "Bitstream-Vera",
      "BlueOak-1.0.0",
      "Boehm-GC",
      "Boehm-GC-without-fee",
      "Borceux",
      "Brian-Gladman-2-Clause",
      "Brian-Gladman-3-Clause",
      "C-UDA-1.0",
      "CAL-1.0",
      "CAL-1.0-Combined-Work-Exception",
      "CATOSL-1.1",
      "CC-BY-1.0",
      "CC-BY-2.0",
      "CC-BY-2.5",
      "CC-BY-2.5-AU",
      "CC-BY-3.0",
      "CC-BY-3.0-AT",
      "CC-BY-3.0-AU",
      "CC-BY-3.0-DE",
      "CC-BY-3.0-IGO",
      "CC-BY-3.0-NL",
      "CC-BY-3.0-US",
      "CC-BY-4.0",
      "CC-BY-NC-1.0",
      "CC-BY-NC-2.0",
      "CC-BY-NC-2.5",
      "CC-BY-NC-3.0",
      "CC-BY-NC-3.0-DE",
      "CC-BY-NC-4.0",
      "CC-BY-NC-ND-1.0",
      "CC-BY-NC-ND-2.0",
      "CC-BY-NC-ND-2.5",
      "CC-BY-NC-ND-3.0",
      "CC-BY-NC-ND-3.0-DE",
      "CC-BY-NC-ND-3.0-IGO",
      "CC-BY-NC-ND-4.0",
      "CC-BY-NC-SA-1.0",
      "CC-BY-NC-SA-2.0",
      "CC-BY-NC-SA-2.0-DE",
      "CC-BY-NC-SA-2.0-FR",
      "CC-BY-NC-SA-2.0-UK",
      "CC-BY-NC-SA-2.5",
      "CC-BY-NC-SA-3.0",
      "CC-BY-NC-SA-3.0-DE",
      "CC-BY-NC-SA-3.0-IGO",
      "CC-BY-NC-SA-4.0",
      "CC-BY-ND-1.0",
      "CC-BY-ND-2.0",
      "CC-BY-ND-2.5",
      "CC-BY-ND-3.0",
      "CC-BY-ND-3.0-DE",
      "CC-BY-ND-4.0",
      "CC-BY-SA-1.0",
      "CC-BY-SA-2.0",
      "CC-BY-SA-2.0-UK",
      "CC-BY-SA-2.1-JP",
      "CC-BY-SA-2.5",
      "CC-BY-SA-3.0",
      "CC-BY-SA-3.0-AT",
      "CC-BY-SA-3.0-DE",
      "CC-BY-SA-3.0-IGO",
      "CC-BY-SA-4.0",
      "CC-PDDC",
      "CC-PDM-1.0",
      "CC-SA-1.0",
      "CC0-1.0",
      "CDDL-1.0",
      "CDDL-1.1",
      "CDL-1.0",
      "CDLA-Permissive-1.0",
      "CDLA-Permissive-2.0",
      "CDLA-Sharing-1.0",
      "CECILL-1.0",
      "CECILL-1.1",
      "CECILL-2.0",
      "CECILL-2.1",
      "CECILL-B",
      "CECILL-C",
      "CERN-OHL-1.1",
      "CERN-OHL-1.2",
      "CERN-OHL-P-2.0",
      "CERN-OHL-S-2.0",
      "CERN-OHL-W-2.0",
      "CFITSIO",
      "CMU-Mach",
      "CMU-Mach-nodoc",
      "CNRI-Jython",
      "CNRI-Python",
      "CNRI-Python-GPL-Compatible",
      "COIL-1.0",
      "CPAL-1.0",
      "CPL-1.0",
      "CPOL-1.02",
      "CUA-OPL-1.0",
      "Caldera",
      "Caldera-no-preamble",
      "Catharon",
      "ClArtistic",
      "Clips",
      "Community-Spec-1.0",
      "Condor-1.1",
      "Cornell-Lossless-JPEG",
      "Cronyx",
      "Crossword",
      "CrystalStacker",
      "Cube",
      "D-FSL-1.0",
      "DEC-3-Clause",
      "DL-DE-BY-2.0",
      "DL-DE-ZERO-2.0",
      "DOC",
      "DRL-1.0",
      "DRL-1.1",
      "DSDP",
      "DocBook-Schema",
      "DocBook-Stylesheet",
      "DocBook-XML",
      "Dotseqn",
      "ECL-1.0",
      "ECL-2.0",
      "EFL-1.0",
      "EFL-2.0",
      "EPICS",
      "EPL-1.0",
      "EPL-2.0",
      "EUDatagrid",
      "EUPL-1.0",
      "EUPL-1.1",
      "EUPL-1.2",
      "Elastic-2.0",
      "Entessa",
      "ErlPL-1.1",
      "Eurosym",
      "FBM",
      "FDK-AAC",
      "FSFAP",
      "FSFAP-no-warranty-disclaimer",
      "FSFUL",
      "FSFULLR",
      "FSFULLRWD",
      "FTL",
      "Fair",
      "Ferguson-Twofish",
      "Frameworx-1.0",
      "FreeBSD-DOC",
      "FreeImage",
      "Furuseth",
      "GCR-docs",
      "GD",
      "GFDL-1.1-invariants-only",
      "GFDL-1.1-invariants-or-later",
      "GFDL-1.1-no-invariants-only",
      "GFDL-1.1-no-invariants-or-later",
      "GFDL-1.1-only",
      "GFDL-1.1-or-later",
      "GFDL-1.2-invariants-only",
      "GFDL-1.2-invariants-or-later",
      "GFDL-1.2-no-invariants-only",
      "GFDL-1.2-no-invariants-or-later",
      "GFDL-1.2-only",
      "GFDL-1.2-or-later",
      "GFDL-1.3-invariants-only",
      "GFDL-1.3-invariants-or-later",
      "GFDL-1.3-no-invariants-only",
      "GFDL-1.3-no-invariants-or-later",
      "GFDL-1.3-only",
      "GFDL-1.3-or-later",
      "GL2PS",
      "GLWTPL",
      "GPL-1.0-only",
      "GPL-1.0-or-later",
      "GPL-2.0-only",
      "GPL-2.0-or-later",
      "GPL-3.0-only",
      "GPL-3.0-or-later",
      "Giftware",
      "Glide",
      "Glulxe",
      "Graphics-Gems",
      "Gutmann",
      "HIDAPI",
      "HP-1986",
      "HP-1989",
      "HPND",
      "HPND-DEC",
      "HPND-Fenneberg-Livingston",
      "HPND-INRIA-IMAG",
      "HPND-Intel",
      "HPND-Kevlin-Henney",
      "HPND-MIT-disclaimer",
      "HPND-Markus-Kuhn",
      "HPND-Netrek",
      "HPND-Pbmplus",
      "HPND-UC",
      "HPND-UC-export-US",
      "HPND-doc",
      "HPND-doc-sell",
      "HPND-export-US",
      "HPND-export-US-acknowledgement",
      "HPND-export-US-modify",
      "HPND-export2-US",
      "HPND-merchantability-variant",
      "HPND-sell-MIT-disclaimer-xserver",
      "HPND-sell-regexpr",
      "HPND-sell-variant",
      "HPND-sell-variant-MIT-disclaimer",
      "HPND-sell-variant-MIT-disclaimer-rev",
      "HTMLTIDY",
      "HaskellReport",
      "Hippocratic-2.1",
      "IBM-pibs",
      "ICU",
      "IEC-Code-Components-EULA",
      "IJG",
      "IJG-short",
      "IPA",
      "IPL-1.0",
      "ISC",
      "ISC-Veillard",
      "ImageMagick",
      "Imlib2",
      "Info-ZIP",
      "Inner-Net-2.0",
      "InnoSetup",
      "Intel",
      "Intel-ACPI",
      "Interbase-1.0",
      "JPL-image",
      "JPNIC",
      "JSON",
      "Jam",
      "JasPer-2.0",
      "Kastrup",
      "Kazlib",
      "Knuth-CTAN",
      "LAL-1.2",
      "LAL-1.3",
      "LGPL-2.0-only",
      "LGPL-2.0-or-later",
      "LGPL-2.1-only",
      "LGPL-2.1-or-later",
      "LGPL-3.0-only",
      "LGPL-3.0-or-later",
      "LGPLLR",
      "LOOP",
      "LPD-document",
      "LPL-1.0",
      "LPL-1.02",
      "LPPL-1.0",
      "LPPL-1.1",
      "LPPL-1.2",
      "LPPL-1.3a",
      "LPPL-1.3c",
      "LZMA-SDK-9.11-to-9.20",
      "LZMA-SDK-9.22",
      "Latex2e",
      "Latex2e-translated-notice",
      "Leptonica",
      "LiLiQ-P-1.1",
      "LiLiQ-R-1.1",
      "LiLiQ-Rplus-1.1",
      "Libpng",
      "Linux-OpenIB",
      "Linux-man-pages-1-para",
      "Linux-man-pages-copyleft",
      "Linux-man-pages-copyleft-2-para",
      "Linux-man-pages-copyleft-var",
      "Lucida-Bitmap-Fonts",
      "MIPS",
      "MIT",
      "MIT-0",
      "MIT-CMU",
      "MIT-Click",
      "MIT-Festival",
      "MIT-Khronos-old",
      "MIT-Modern-Variant",
      "MIT-Wu",
      "MIT-advertising",
      "MIT-enna",
      "MIT-feh",
      "MIT-open-group",
      "MIT-testregex",
      "MITNFA",
      "MMIXware",
      "MPEG-SSG",
      "MPL-1.0",
      "MPL-1.1",
      "MPL-2.0",
      "MPL-2.0-no-copyleft-exception",
      "MS-LPL",
      "MS-PL",
      "MS-RL",
      "MTLL",
      "Mackerras-3-Clause",
      "Mackerras-3-Clause-acknowledgment",
      "MakeIndex",
      "Martin-Birgmeier",
      "McPhee-slideshow",
      "Minpack",
      "MirOS",
      "Motosoto",
      "MulanPSL-1.0",
      "MulanPSL-2.0",
      "Multics",
      "Mup",
      "NAIST-2003",
      "NASA-1.3",
      "NBPL-1.0",
      "NCBI-PD",
      "NCGL-UK-2.0",
      "NCL",
      "NCSA",
      "NGPL",
      "NICTA-1.0",
      "NIST-PD",
      "NIST-PD-fallback",
      "NIST-Software",
      "NLOD-1.0",
      "NLOD-2.0",
      "NLPL",
      "NOSL",
      "NPL-1.0",
      "NPL-1.1",
      "NPOSL-3.0",
      "NRL",
      "NTP",
      "NTP-0",
      "Naumen",
      "NetCDF",
      "Newsletr",
      "Nokia",
      "Noweb",
      "O-UDA-1.0",
      "OAR",
      "OCCT-PL",
      "OCLC-2.0",
      "ODC-By-1.0",
      "ODbL-1.0",
      "OFFIS",
      "OFL-1.0",
      "OFL-1.0-RFN",
      "OFL-1.0-no-RFN",
      "OFL-1.1",
      "OFL-1.1-RFN",
      "OFL-1.1-no-RFN",
      "OGC-1.0",
      "OGDL-Taiwan-1.0",
      "OGL-Canada-2.0",
      "OGL-UK-1.0",
      "OGL-UK-2.0",
      "OGL-UK-3.0",
      "OGTSL",
      "OLDAP-1.1",
      "OLDAP-1.2",
      "OLDAP-1.3",
      "OLDAP-1.4",
      "OLDAP-2.0",
      "OLDAP-2.0.1",
      "OLDAP-2.1",
      "OLDAP-2.2",
      "OLDAP-2.2.1",
      "OLDAP-2.2.2",
      "OLDAP-2.3",
      "OLDAP-2.4",
      "OLDAP-2.5",
      "OLDAP-2.6",
      "OLDAP-2.7",
      "OLDAP-2.8",
      "OLFL-1.3",
      "OML",
      "OPL-1.0",
      "OPL-UK-3.0",
      "OPUBL-1.0",
      "OSET-PL-2.1",
      "OSL-1.0",
      "OSL-1.1",
      "OSL-2.0",
      "OSL-2.1",
      "OSL-3.0",
      "OpenPBS-2.3",
      "OpenSSL",
      "OpenSSL-standalone",
      "OpenVision",
      "PADL",
      "PDDL-1.0",
      "PHP-3.0",
      "PHP-3.01",
      "PPL",
      "PSF-2.0",
      "Parity-6.0.0",
      "Parity-7.0.0",
      "Pixar",
      "Plexus",
      "PolyForm-Noncommercial-1.0.0",
      "PolyForm-Small-Business-1.0.0",
      "PostgreSQL",
      "Python-2.0",
      "Python-2.0.1",
      "QPL-1.0",
      "QPL-1.0-INRIA-2004",
      "Qhull",
      "RHeCos-1.1",
      "RPL-1.1",
      "RPL-1.5",
      "RPSL-1.0",
      "RSA-MD",
      "RSCPL",
      "Rdisc",
      "Ruby",
      "Ruby-pty",
      "SAX-PD",
      "SAX-PD-2.0",
      "SCEA",
      "SGI-B-1.0",
      "SGI-B-1.1",
      "SGI-B-2.0",
      "SGI-OpenGL",
      "SGP4",
      "SHL-0.5",
      "SHL-0.51",
      "SISSL",
      "SISSL-1.2",
      "SL",
      "SMAIL-GPL",
      "SMLNJ",
      "SMPPL",
      "SNIA",
      "SPL-1.0",
      "SSH-OpenSSH",
      "SSH-short",
      "SSLeay-standalone",
      "SSPL-1.0",
      "SWL",
      "Saxpath",
      "SchemeReport",
      "Sendmail",
      "Sendmail-8.23",
      "Sendmail-Open-Source-1.1",
      "SimPL-2.0",
      "Sleepycat",
      "Soundex",
      "Spencer-86",
      "Spencer-94",
      "Spencer-99",
      "SugarCRM-1.1.3",
      "Sun-PPP",
      "Sun-PPP-2000",
      "SunPro",
      "Symlinks",
      "TAPR-OHL-1.0",
      "TCL",
      "TCP-wrappers",
      "TGPPL-1.0",
      "TMate",
      "TORQUE-1.1",
      "TOSL",
      "TPDL",
      "TPL-1.0",
      "TTWL",
      "TTYP0",
      "TU-Berlin-1.0",
      "TU-Berlin-2.0",
      "TermReadKey",
      "ThirdEye",
      "TrustedQSL",
      "UCAR",
      "UCL-1.0",
      "UMich-Merit",
      "UPL-1.0",
      "URT-RLE",
      "Ubuntu-font-1.0",
      "Unicode-3.0",
      "Unicode-DFS-2015",
      "Unicode-DFS-2016",
      "Unicode-TOU",
      "UnixCrypt",
      "Unlicense",
      "VOSTROM",
      "VSL-1.0",
      "Vim",
      "W3C",
      "W3C-19980720",
      "W3C-20150513",
      "WTFPL",
      "Watcom-1.0",
      "Widget-Workshop",
      "Wsuipa",
      "X11",
      "X11-distribute-modifications-variant",
      "X11-swapped",
      "XFree86-1.1",
      "XSkat",
      "Xdebug-1.03",
      "Xerox",
      "Xfig",
      "Xnet",
      "YPL-1.0",
      "YPL-1.1",
      "ZPL-1.1",
      "ZPL-2.0",
      "ZPL-2.1",
      "Zed",
      "Zeeff",
      "Zend-2.0",
      "Zimbra-1.3",
      "Zimbra-1.4",
      "Zlib",
      "any-OSI",
      "any-OSI-perl-modules",
      "bcrypt-Solar-Designer",
      "blessing",
      "bzip2-1.0.6",
      "check-cvs",
      "checkmk",
      "copyleft-next-0.3.0",
      "copyleft-next-0.3.1",
      "curl",
      "cve-tou",
      "diffmark",
      "dtoa",
      "dvipdfm",
      "eGenix",
      "etalab-2.0",
      "fwlw",
      "gSOAP-1.3b",
      "generic-xts",
      "gnuplot",
      "gtkbook",
      "hdparm",
      "iMatix",
      "libpng-2.0",
      "libselinux-1.0",
      "libtiff",
      "libutil-David-Nugent",
      "lsof",
      "magaz",
      "mailprio",
      "metamail",
      "mpi-permissive",
      "mpich2",
      "mplus",
      "pkgconf",
      "pnmstitch",
      "psfrag",
      "psutils",
      "python-ldap",
      "radvd",
      "snprintf",
      "softSurfer",
      "ssh-keyscan",
      "swrule",
      "threeparttable",
      "ulem",
      "w3m",
      "wwl",
      "xinetd",
      "xkeyboard-config-Zinoviev",
      "xlock",
      "xpp",
      "xzoom",
      "zlib-acknowledgement"
    ];
  }
});

// node_modules/.pnpm/spdx-license-ids@3.0.21/node_modules/spdx-license-ids/deprecated.json
var require_deprecated = __commonJS({
  "node_modules/.pnpm/spdx-license-ids@3.0.21/node_modules/spdx-license-ids/deprecated.json"(exports, module) {
    module.exports = [
      "AGPL-1.0",
      "AGPL-3.0",
      "BSD-2-Clause-FreeBSD",
      "BSD-2-Clause-NetBSD",
      "GFDL-1.1",
      "GFDL-1.2",
      "GFDL-1.3",
      "GPL-1.0",
      "GPL-2.0",
      "GPL-2.0-with-GCC-exception",
      "GPL-2.0-with-autoconf-exception",
      "GPL-2.0-with-bison-exception",
      "GPL-2.0-with-classpath-exception",
      "GPL-2.0-with-font-exception",
      "GPL-3.0",
      "GPL-3.0-with-GCC-exception",
      "GPL-3.0-with-autoconf-exception",
      "LGPL-2.0",
      "LGPL-2.1",
      "LGPL-3.0",
      "Net-SNMP",
      "Nunit",
      "StandardML-NJ",
      "bzip2-1.0.5",
      "eCos-2.0",
      "wxWindows"
    ];
  }
});

// node_modules/.pnpm/spdx-exceptions@2.5.0/node_modules/spdx-exceptions/index.json
var require_spdx_exceptions = __commonJS({
  "node_modules/.pnpm/spdx-exceptions@2.5.0/node_modules/spdx-exceptions/index.json"(exports, module) {
    module.exports = [
      "389-exception",
      "Asterisk-exception",
      "Autoconf-exception-2.0",
      "Autoconf-exception-3.0",
      "Autoconf-exception-generic",
      "Autoconf-exception-generic-3.0",
      "Autoconf-exception-macro",
      "Bison-exception-1.24",
      "Bison-exception-2.2",
      "Bootloader-exception",
      "Classpath-exception-2.0",
      "CLISP-exception-2.0",
      "cryptsetup-OpenSSL-exception",
      "DigiRule-FOSS-exception",
      "eCos-exception-2.0",
      "Fawkes-Runtime-exception",
      "FLTK-exception",
      "fmt-exception",
      "Font-exception-2.0",
      "freertos-exception-2.0",
      "GCC-exception-2.0",
      "GCC-exception-2.0-note",
      "GCC-exception-3.1",
      "Gmsh-exception",
      "GNAT-exception",
      "GNOME-examples-exception",
      "GNU-compiler-exception",
      "gnu-javamail-exception",
      "GPL-3.0-interface-exception",
      "GPL-3.0-linking-exception",
      "GPL-3.0-linking-source-exception",
      "GPL-CC-1.0",
      "GStreamer-exception-2005",
      "GStreamer-exception-2008",
      "i2p-gpl-java-exception",
      "KiCad-libraries-exception",
      "LGPL-3.0-linking-exception",
      "libpri-OpenH323-exception",
      "Libtool-exception",
      "Linux-syscall-note",
      "LLGPL",
      "LLVM-exception",
      "LZMA-exception",
      "mif-exception",
      "OCaml-LGPL-linking-exception",
      "OCCT-exception-1.0",
      "OpenJDK-assembly-exception-1.0",
      "openvpn-openssl-exception",
      "PS-or-PDF-font-exception-20170817",
      "QPL-1.0-INRIA-2004-exception",
      "Qt-GPL-exception-1.0",
      "Qt-LGPL-exception-1.1",
      "Qwt-exception-1.0",
      "SANE-exception",
      "SHL-2.0",
      "SHL-2.1",
      "stunnel-exception",
      "SWI-exception",
      "Swift-exception",
      "Texinfo-exception",
      "u-boot-exception-2.0",
      "UBDL-exception",
      "Universal-FOSS-exception-1.0",
      "vsftpd-openssl-exception",
      "WxWindows-exception-3.1",
      "x11vnc-openssl-exception"
    ];
  }
});

// node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/scan.js
var require_scan2 = __commonJS({
  "node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/scan.js"(exports, module) {
    var licenses = [].concat(require_spdx_license_ids()).concat(require_deprecated());
    var exceptions = require_spdx_exceptions();
    module.exports = function(source) {
      var index = 0;
      function hasMore() {
        return index < source.length;
      }
      function read(value) {
        if (value instanceof RegExp) {
          var chars = source.slice(index);
          var match = chars.match(value);
          if (match) {
            index += match[0].length;
            return match[0];
          }
        } else {
          if (source.indexOf(value, index) === index) {
            index += value.length;
            return value;
          }
        }
      }
      function skipWhitespace() {
        read(/[ ]*/);
      }
      function operator() {
        var string;
        var possibilities = ["WITH", "AND", "OR", "(", ")", ":", "+"];
        for (var i = 0; i < possibilities.length; i++) {
          string = read(possibilities[i]);
          if (string) {
            break;
          }
        }
        if (string === "+" && index > 1 && source[index - 2] === " ") {
          throw new Error("Space before `+`");
        }
        return string && {
          type: "OPERATOR",
          string
        };
      }
      function idstring() {
        return read(/[A-Za-z0-9-.]+/);
      }
      function expectIdstring() {
        var string = idstring();
        if (!string) {
          throw new Error("Expected idstring at offset " + index);
        }
        return string;
      }
      function documentRef() {
        if (read("DocumentRef-")) {
          var string = expectIdstring();
          return { type: "DOCUMENTREF", string };
        }
      }
      function licenseRef() {
        if (read("LicenseRef-")) {
          var string = expectIdstring();
          return { type: "LICENSEREF", string };
        }
      }
      function identifier() {
        var begin = index;
        var string = idstring();
        if (licenses.indexOf(string) !== -1) {
          return {
            type: "LICENSE",
            string
          };
        } else if (exceptions.indexOf(string) !== -1) {
          return {
            type: "EXCEPTION",
            string
          };
        }
        index = begin;
      }
      function parseToken() {
        return operator() || documentRef() || licenseRef() || identifier();
      }
      var tokens = [];
      while (hasMore()) {
        skipWhitespace();
        if (!hasMore()) {
          break;
        }
        var token = parseToken();
        if (!token) {
          throw new Error("Unexpected `" + source[index] + "` at offset " + index);
        }
        tokens.push(token);
      }
      return tokens;
    };
  }
});

// node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/parse.js
var require_parse3 = __commonJS({
  "node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/parse.js"(exports, module) {
    module.exports = function(tokens) {
      var index = 0;
      function hasMore() {
        return index < tokens.length;
      }
      function token() {
        return hasMore() ? tokens[index] : null;
      }
      function next() {
        if (!hasMore()) {
          throw new Error();
        }
        index++;
      }
      function parseOperator(operator) {
        var t2 = token();
        if (t2 && t2.type === "OPERATOR" && operator === t2.string) {
          next();
          return t2.string;
        }
      }
      function parseWith() {
        if (parseOperator("WITH")) {
          var t2 = token();
          if (t2 && t2.type === "EXCEPTION") {
            next();
            return t2.string;
          }
          throw new Error("Expected exception after `WITH`");
        }
      }
      function parseLicenseRef() {
        var begin = index;
        var string = "";
        var t2 = token();
        if (t2.type === "DOCUMENTREF") {
          next();
          string += "DocumentRef-" + t2.string + ":";
          if (!parseOperator(":")) {
            throw new Error("Expected `:` after `DocumentRef-...`");
          }
        }
        t2 = token();
        if (t2.type === "LICENSEREF") {
          next();
          string += "LicenseRef-" + t2.string;
          return { license: string };
        }
        index = begin;
      }
      function parseLicense() {
        var t2 = token();
        if (t2 && t2.type === "LICENSE") {
          next();
          var node2 = { license: t2.string };
          if (parseOperator("+")) {
            node2.plus = true;
          }
          var exception = parseWith();
          if (exception) {
            node2.exception = exception;
          }
          return node2;
        }
      }
      function parseParenthesizedExpression() {
        var left = parseOperator("(");
        if (!left) {
          return;
        }
        var expr = parseExpression();
        if (!parseOperator(")")) {
          throw new Error("Expected `)`");
        }
        return expr;
      }
      function parseAtom() {
        return parseParenthesizedExpression() || parseLicenseRef() || parseLicense();
      }
      function makeBinaryOpParser(operator, nextParser) {
        return function parseBinaryOp() {
          var left = nextParser();
          if (!left) {
            return;
          }
          if (!parseOperator(operator)) {
            return left;
          }
          var right = parseBinaryOp();
          if (!right) {
            throw new Error("Expected expression");
          }
          return {
            left,
            conjunction: operator.toLowerCase(),
            right
          };
        };
      }
      var parseAnd = makeBinaryOpParser("AND", parseAtom);
      var parseExpression = makeBinaryOpParser("OR", parseAnd);
      var node = parseExpression();
      if (!node || hasMore()) {
        throw new Error("Syntax error");
      }
      return node;
    };
  }
});

// node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/index.js
var require_spdx_expression_parse = __commonJS({
  "node_modules/.pnpm/spdx-expression-parse@3.0.1/node_modules/spdx-expression-parse/index.js"(exports, module) {
    var scan = require_scan2();
    var parse11 = require_parse3();
    module.exports = function(source) {
      return parse11(scan(source));
    };
  }
});

// node_modules/.pnpm/spdx-correct@3.2.0/node_modules/spdx-correct/index.js
var require_spdx_correct = __commonJS({
  "node_modules/.pnpm/spdx-correct@3.2.0/node_modules/spdx-correct/index.js"(exports, module) {
    var parse11 = require_spdx_expression_parse();
    var spdxLicenseIds = require_spdx_license_ids();
    function valid(string) {
      try {
        parse11(string);
        return true;
      } catch (error2) {
        return false;
      }
    }
    function sortTranspositions(a2, b) {
      var length = b[0].length - a2[0].length;
      if (length !== 0) return length;
      return a2[0].toUpperCase().localeCompare(b[0].toUpperCase());
    }
    var transpositions = [
      ["APGL", "AGPL"],
      ["Gpl", "GPL"],
      ["GLP", "GPL"],
      ["APL", "Apache"],
      ["ISD", "ISC"],
      ["GLP", "GPL"],
      ["IST", "ISC"],
      ["Claude", "Clause"],
      [" or later", "+"],
      [" International", ""],
      ["GNU", "GPL"],
      ["GUN", "GPL"],
      ["+", ""],
      ["GNU GPL", "GPL"],
      ["GNU LGPL", "LGPL"],
      ["GNU/GPL", "GPL"],
      ["GNU GLP", "GPL"],
      ["GNU LESSER GENERAL PUBLIC LICENSE", "LGPL"],
      ["GNU Lesser General Public License", "LGPL"],
      ["GNU LESSER GENERAL PUBLIC LICENSE", "LGPL-2.1"],
      ["GNU Lesser General Public License", "LGPL-2.1"],
      ["LESSER GENERAL PUBLIC LICENSE", "LGPL"],
      ["Lesser General Public License", "LGPL"],
      ["LESSER GENERAL PUBLIC LICENSE", "LGPL-2.1"],
      ["Lesser General Public License", "LGPL-2.1"],
      ["GNU General Public License", "GPL"],
      ["Gnu public license", "GPL"],
      ["GNU Public License", "GPL"],
      ["GNU GENERAL PUBLIC LICENSE", "GPL"],
      ["MTI", "MIT"],
      ["Mozilla Public License", "MPL"],
      ["Universal Permissive License", "UPL"],
      ["WTH", "WTF"],
      ["WTFGPL", "WTFPL"],
      ["-License", ""]
    ].sort(sortTranspositions);
    var TRANSPOSED = 0;
    var CORRECT = 1;
    var transforms = [
      // e.g. 'mit'
      function(argument) {
        return argument.toUpperCase();
      },
      // e.g. 'MIT '
      function(argument) {
        return argument.trim();
      },
      // e.g. 'M.I.T.'
      function(argument) {
        return argument.replace(/\./g, "");
      },
      // e.g. 'Apache- 2.0'
      function(argument) {
        return argument.replace(/\s+/g, "");
      },
      // e.g. 'CC BY 4.0''
      function(argument) {
        return argument.replace(/\s+/g, "-");
      },
      // e.g. 'LGPLv2.1'
      function(argument) {
        return argument.replace("v", "-");
      },
      // e.g. 'Apache 2.0'
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1");
      },
      // e.g. 'GPL 2'
      function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1.0");
      },
      // e.g. 'Apache Version 2.0'
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2");
      },
      // e.g. 'Apache Version 2'
      function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2.0");
      },
      // e.g. 'ZLIB'
      function(argument) {
        return argument[0].toUpperCase() + argument.slice(1);
      },
      // e.g. 'MPL/2.0'
      function(argument) {
        return argument.replace("/", "-");
      },
      // e.g. 'Apache 2'
      function(argument) {
        return argument.replace(/\s*V\s*(\d)/, "-$1").replace(/(\d)$/, "$1.0");
      },
      // e.g. 'GPL-2.0', 'GPL-3.0'
      function(argument) {
        if (argument.indexOf("3.0") !== -1) {
          return argument + "-or-later";
        } else {
          return argument + "-only";
        }
      },
      // e.g. 'GPL-2.0-'
      function(argument) {
        return argument + "only";
      },
      // e.g. 'GPL2'
      function(argument) {
        return argument.replace(/(\d)$/, "-$1.0");
      },
      // e.g. 'BSD 3'
      function(argument) {
        return argument.replace(/(-| )?(\d)$/, "-$2-Clause");
      },
      // e.g. 'BSD clause 3'
      function(argument) {
        return argument.replace(/(-| )clause(-| )(\d)/, "-$3-Clause");
      },
      // e.g. 'New BSD license'
      function(argument) {
        return argument.replace(/\b(Modified|New|Revised)(-| )?BSD((-| )License)?/i, "BSD-3-Clause");
      },
      // e.g. 'Simplified BSD license'
      function(argument) {
        return argument.replace(/\bSimplified(-| )?BSD((-| )License)?/i, "BSD-2-Clause");
      },
      // e.g. 'Free BSD license'
      function(argument) {
        return argument.replace(/\b(Free|Net)(-| )?BSD((-| )License)?/i, "BSD-2-Clause-$1BSD");
      },
      // e.g. 'Clear BSD license'
      function(argument) {
        return argument.replace(/\bClear(-| )?BSD((-| )License)?/i, "BSD-3-Clause-Clear");
      },
      // e.g. 'Old BSD License'
      function(argument) {
        return argument.replace(/\b(Old|Original)(-| )?BSD((-| )License)?/i, "BSD-4-Clause");
      },
      // e.g. 'BY-NC-4.0'
      function(argument) {
        return "CC-" + argument;
      },
      // e.g. 'BY-NC'
      function(argument) {
        return "CC-" + argument + "-4.0";
      },
      // e.g. 'Attribution-NonCommercial'
      function(argument) {
        return argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "");
      },
      // e.g. 'Attribution-NonCommercial'
      function(argument) {
        return "CC-" + argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "") + "-4.0";
      }
    ];
    var licensesWithVersions = spdxLicenseIds.map(function(id) {
      var match = /^(.*)-\d+\.\d+$/.exec(id);
      return match ? [match[0], match[1]] : [id, null];
    }).reduce(function(objectMap, item) {
      var key = item[1];
      objectMap[key] = objectMap[key] || [];
      objectMap[key].push(item[0]);
      return objectMap;
    }, {});
    var licensesWithOneVersion = Object.keys(licensesWithVersions).map(function makeEntries(key) {
      return [key, licensesWithVersions[key]];
    }).filter(function identifySoleVersions(item) {
      return (
        // Licenses has just one valid version suffix.
        item[1].length === 1 && item[0] !== null && // APL will be considered Apache, rather than APL-1.0
        item[0] !== "APL"
      );
    }).map(function createLastResorts(item) {
      return [item[0], item[1][0]];
    });
    licensesWithVersions = void 0;
    var lastResorts = [
      ["UNLI", "Unlicense"],
      ["WTF", "WTFPL"],
      ["2 CLAUSE", "BSD-2-Clause"],
      ["2-CLAUSE", "BSD-2-Clause"],
      ["3 CLAUSE", "BSD-3-Clause"],
      ["3-CLAUSE", "BSD-3-Clause"],
      ["AFFERO", "AGPL-3.0-or-later"],
      ["AGPL", "AGPL-3.0-or-later"],
      ["APACHE", "Apache-2.0"],
      ["ARTISTIC", "Artistic-2.0"],
      ["Affero", "AGPL-3.0-or-later"],
      ["BEER", "Beerware"],
      ["BOOST", "BSL-1.0"],
      ["BSD", "BSD-2-Clause"],
      ["CDDL", "CDDL-1.1"],
      ["ECLIPSE", "EPL-1.0"],
      ["FUCK", "WTFPL"],
      ["GNU", "GPL-3.0-or-later"],
      ["LGPL", "LGPL-3.0-or-later"],
      ["GPLV1", "GPL-1.0-only"],
      ["GPL-1", "GPL-1.0-only"],
      ["GPLV2", "GPL-2.0-only"],
      ["GPL-2", "GPL-2.0-only"],
      ["GPL", "GPL-3.0-or-later"],
      ["MIT +NO-FALSE-ATTRIBS", "MITNFA"],
      ["MIT", "MIT"],
      ["MPL", "MPL-2.0"],
      ["X11", "X11"],
      ["ZLIB", "Zlib"]
    ].concat(licensesWithOneVersion).sort(sortTranspositions);
    var SUBSTRING = 0;
    var IDENTIFIER = 1;
    var validTransformation = function(identifier) {
      for (var i = 0; i < transforms.length; i++) {
        var transformed = transforms[i](identifier).trim();
        if (transformed !== identifier && valid(transformed)) {
          return transformed;
        }
      }
      return null;
    };
    var validLastResort = function(identifier) {
      var upperCased = identifier.toUpperCase();
      for (var i = 0; i < lastResorts.length; i++) {
        var lastResort = lastResorts[i];
        if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
          return lastResort[IDENTIFIER];
        }
      }
      return null;
    };
    var anyCorrection = function(identifier, check) {
      for (var i = 0; i < transpositions.length; i++) {
        var transposition = transpositions[i];
        var transposed = transposition[TRANSPOSED];
        if (identifier.indexOf(transposed) > -1) {
          var corrected = identifier.replace(
            transposed,
            transposition[CORRECT]
          );
          var checked = check(corrected);
          if (checked !== null) {
            return checked;
          }
        }
      }
      return null;
    };
    module.exports = function(identifier, options) {
      options = options || {};
      var upgrade = options.upgrade === void 0 ? true : !!options.upgrade;
      function postprocess(value) {
        return upgrade ? upgradeGPLs(value) : value;
      }
      var validArugment = typeof identifier === "string" && identifier.trim().length !== 0;
      if (!validArugment) {
        throw Error("Invalid argument. Expected non-empty string.");
      }
      identifier = identifier.trim();
      if (valid(identifier)) {
        return postprocess(identifier);
      }
      var noPlus = identifier.replace(/\+$/, "").trim();
      if (valid(noPlus)) {
        return postprocess(noPlus);
      }
      var transformed = validTransformation(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, function(argument) {
        if (valid(argument)) {
          return argument;
        }
        return validTransformation(argument);
      });
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = validLastResort(identifier);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      transformed = anyCorrection(identifier, validLastResort);
      if (transformed !== null) {
        return postprocess(transformed);
      }
      return null;
    };
    function upgradeGPLs(value) {
      if ([
        "GPL-1.0",
        "LGPL-1.0",
        "AGPL-1.0",
        "GPL-2.0",
        "LGPL-2.0",
        "AGPL-2.0",
        "LGPL-2.1"
      ].indexOf(value) !== -1) {
        return value + "-only";
      } else if ([
        "GPL-1.0+",
        "GPL-2.0+",
        "GPL-3.0+",
        "LGPL-2.0+",
        "LGPL-2.1+",
        "LGPL-3.0+",
        "AGPL-1.0+",
        "AGPL-3.0+"
      ].indexOf(value) !== -1) {
        return value.replace(/\+$/, "-or-later");
      } else if (["GPL-3.0", "LGPL-3.0", "AGPL-3.0"].indexOf(value) !== -1) {
        return value + "-or-later";
      } else {
        return value;
      }
    }
  }
});

// node_modules/.pnpm/validate-npm-package-license@3.0.4/node_modules/validate-npm-package-license/index.js
var require_validate_npm_package_license = __commonJS({
  "node_modules/.pnpm/validate-npm-package-license@3.0.4/node_modules/validate-npm-package-license/index.js"(exports, module) {
    var parse11 = require_spdx_expression_parse();
    var correct = require_spdx_correct();
    var genericWarning = 'license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>"';
    var fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;
    function startsWith(prefix, string) {
      return string.slice(0, prefix.length) === prefix;
    }
    function usesLicenseRef(ast) {
      if (ast.hasOwnProperty("license")) {
        var license = ast.license;
        return startsWith("LicenseRef", license) || startsWith("DocumentRef", license);
      } else {
        return usesLicenseRef(ast.left) || usesLicenseRef(ast.right);
      }
    }
    module.exports = function(argument) {
      var ast;
      try {
        ast = parse11(argument);
      } catch (e2) {
        var match;
        if (argument === "UNLICENSED" || argument === "UNLICENCED") {
          return {
            validForOldPackages: true,
            validForNewPackages: true,
            unlicensed: true
          };
        } else if (match = fileReferenceRE.exec(argument)) {
          return {
            validForOldPackages: true,
            validForNewPackages: true,
            inFile: match[1]
          };
        } else {
          var result = {
            validForOldPackages: false,
            validForNewPackages: false,
            warnings: [genericWarning]
          };
          if (argument.trim().length !== 0) {
            var corrected = correct(argument);
            if (corrected) {
              result.warnings.push(
                'license is similar to the valid expression "' + corrected + '"'
              );
            }
          }
          return result;
        }
      }
      if (usesLicenseRef(ast)) {
        return {
          validForNewPackages: false,
          validForOldPackages: false,
          spdx: true,
          warnings: [genericWarning]
        };
      } else {
        return {
          validForNewPackages: true,
          validForOldPackages: true,
          spdx: true
        };
      }
    };
  }
});

// node_modules/.pnpm/lru-cache@10.4.3/node_modules/lru-cache/dist/commonjs/index.js
var require_commonjs = __commonJS({
  "node_modules/.pnpm/lru-cache@10.4.3/node_modules/lru-cache/dist/commonjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = void 0;
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var warned = /* @__PURE__ */ new Set();
    var PROCESS = typeof process === "object" && !!process ? process : {};
    var emitWarning = (msg, type2, code, fn2) => {
      typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type2, code, fn2) : console.error(`[${code}] ${type2}: ${msg}`);
    };
    var AC = globalThis.AbortController;
    var AS = globalThis.AbortSignal;
    var _a14;
    if (typeof AC === "undefined") {
      AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn2) {
          this._onabort.push(fn2);
        }
      };
      AC = class AbortController {
        constructor() {
          warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
          var _a16, _b13;
          if (this.signal.aborted)
            return;
          this.signal.reason = reason;
          this.signal.aborted = true;
          for (const fn2 of this.signal._onabort) {
            fn2(reason);
          }
          (_b13 = (_a16 = this.signal).onabort) == null ? void 0 : _b13.call(_a16, reason);
        }
      };
      let printACPolyfillWarning = ((_a14 = PROCESS.env) == null ? void 0 : _a14.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
      const warnACPolyfill = () => {
        if (!printACPolyfillWarning)
          return;
        printACPolyfillWarning = false;
        emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
      };
    }
    var shouldWarn = (code) => !warned.has(code);
    var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    var _constructing;
    var _Stack = class _Stack {
      heap;
      length;
      static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls)
          return [];
        __privateSet(_Stack, _constructing, true);
        const s2 = new _Stack(max, HeapCls);
        __privateSet(_Stack, _constructing, false);
        return s2;
      }
      constructor(max, HeapCls) {
        if (!__privateGet(_Stack, _constructing)) {
          throw new TypeError("instantiate Stack using Stack.create(n)");
        }
        this.heap = new HeapCls(max);
        this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    _constructing = new WeakMap();
    // private constructor
    __privateAdd(_Stack, _constructing, false);
    var Stack = _Stack;
    var _a15, _b12, _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _memoMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _LRUCache_instances, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, indexes_fn, rindexes_fn, isValidIndex_fn, evict_fn, backgroundFetch_fn, isBackgroundFetch_fn, connect_fn, moveToTail_fn, delete_fn, clear_fn;
    var _LRUCache = class _LRUCache {
      constructor(options) {
        __privateAdd(this, _LRUCache_instances);
        // options that cannot be changed without disaster
        __privateAdd(this, _max);
        __privateAdd(this, _maxSize);
        __privateAdd(this, _dispose);
        __privateAdd(this, _disposeAfter);
        __privateAdd(this, _fetchMethod);
        __privateAdd(this, _memoMethod);
        /**
         * {@link LRUCache.OptionsBase.ttl}
         */
        __publicField(this, "ttl");
        /**
         * {@link LRUCache.OptionsBase.ttlResolution}
         */
        __publicField(this, "ttlResolution");
        /**
         * {@link LRUCache.OptionsBase.ttlAutopurge}
         */
        __publicField(this, "ttlAutopurge");
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnGet}
         */
        __publicField(this, "updateAgeOnGet");
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnHas}
         */
        __publicField(this, "updateAgeOnHas");
        /**
         * {@link LRUCache.OptionsBase.allowStale}
         */
        __publicField(this, "allowStale");
        /**
         * {@link LRUCache.OptionsBase.noDisposeOnSet}
         */
        __publicField(this, "noDisposeOnSet");
        /**
         * {@link LRUCache.OptionsBase.noUpdateTTL}
         */
        __publicField(this, "noUpdateTTL");
        /**
         * {@link LRUCache.OptionsBase.maxEntrySize}
         */
        __publicField(this, "maxEntrySize");
        /**
         * {@link LRUCache.OptionsBase.sizeCalculation}
         */
        __publicField(this, "sizeCalculation");
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
         */
        __publicField(this, "noDeleteOnFetchRejection");
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
         */
        __publicField(this, "noDeleteOnStaleGet");
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
         */
        __publicField(this, "allowStaleOnFetchAbort");
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
         */
        __publicField(this, "allowStaleOnFetchRejection");
        /**
         * {@link LRUCache.OptionsBase.ignoreFetchAbort}
         */
        __publicField(this, "ignoreFetchAbort");
        // computed properties
        __privateAdd(this, _size);
        __privateAdd(this, _calculatedSize);
        __privateAdd(this, _keyMap);
        __privateAdd(this, _keyList);
        __privateAdd(this, _valList);
        __privateAdd(this, _next);
        __privateAdd(this, _prev);
        __privateAdd(this, _head);
        __privateAdd(this, _tail);
        __privateAdd(this, _free);
        __privateAdd(this, _disposed);
        __privateAdd(this, _sizes);
        __privateAdd(this, _starts);
        __privateAdd(this, _ttls);
        __privateAdd(this, _hasDispose);
        __privateAdd(this, _hasFetchMethod);
        __privateAdd(this, _hasDisposeAfter);
        // conditionally set private methods related to TTL
        __privateAdd(this, _updateItemAge, () => {
        });
        __privateAdd(this, _statusTTL, () => {
        });
        __privateAdd(this, _setItemTTL, () => {
        });
        /* c8 ignore stop */
        __privateAdd(this, _isStale, () => false);
        __privateAdd(this, _removeItemSize, (_i2) => {
        });
        __privateAdd(this, _addItemSize, (_i2, _s2, _st) => {
        });
        __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
          if (size || sizeCalculation) {
            throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
          }
          return 0;
        });
        /**
         * A String value that is used in the creation of the default string
         * description of an object. Called by the built-in method
         * `Object.prototype.toString`.
         */
        __publicField(this, _a15, "LRUCache");
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        __privateSet(this, _max, max);
        __privateSet(this, _maxSize, maxSize);
        this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
          if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        if (memoMethod !== void 0 && typeof memoMethod !== "function") {
          throw new TypeError("memoMethod must be a function if defined");
        }
        __privateSet(this, _memoMethod, memoMethod);
        if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        __privateSet(this, _fetchMethod, fetchMethod);
        __privateSet(this, _hasFetchMethod, !!fetchMethod);
        __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
        __privateSet(this, _keyList, new Array(max).fill(void 0));
        __privateSet(this, _valList, new Array(max).fill(void 0));
        __privateSet(this, _next, new UintArray(max));
        __privateSet(this, _prev, new UintArray(max));
        __privateSet(this, _head, 0);
        __privateSet(this, _tail, 0);
        __privateSet(this, _free, Stack.create(max));
        __privateSet(this, _size, 0);
        __privateSet(this, _calculatedSize, 0);
        if (typeof dispose === "function") {
          __privateSet(this, _dispose, dispose);
        }
        if (typeof disposeAfter === "function") {
          __privateSet(this, _disposeAfter, disposeAfter);
          __privateSet(this, _disposed, []);
        } else {
          __privateSet(this, _disposeAfter, void 0);
          __privateSet(this, _disposed, void 0);
        }
        __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
        __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        if (this.maxEntrySize !== 0) {
          if (__privateGet(this, _maxSize) !== 0) {
            if (!isPosInt(__privateGet(this, _maxSize))) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          __privateMethod(this, _LRUCache_instances, initializeSizeTracking_fn).call(this);
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
        }
        if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
          }
        }
      }
      /**
       * Do not call this method unless you need to inspect the
       * inner workings of the cache.  If anything returned by this
       * object is modified in any way, strange breakage may occur.
       *
       * These fields are private for a reason!
       *
       * @internal
       */
      static unsafeExposeInternals(c) {
        return {
          // properties
          starts: __privateGet(c, _starts),
          ttls: __privateGet(c, _ttls),
          sizes: __privateGet(c, _sizes),
          keyMap: __privateGet(c, _keyMap),
          keyList: __privateGet(c, _keyList),
          valList: __privateGet(c, _valList),
          next: __privateGet(c, _next),
          prev: __privateGet(c, _prev),
          get head() {
            return __privateGet(c, _head);
          },
          get tail() {
            return __privateGet(c, _tail);
          },
          free: __privateGet(c, _free),
          // methods
          isBackgroundFetch: (p) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, isBackgroundFetch_fn).call(_a16, p);
          },
          backgroundFetch: (k2, index, options, context) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, backgroundFetch_fn).call(_a16, k2, index, options, context);
          },
          moveToTail: (index) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, moveToTail_fn).call(_a16, index);
          },
          indexes: (options) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, indexes_fn).call(_a16, options);
          },
          rindexes: (options) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, rindexes_fn).call(_a16, options);
          },
          isStale: (index) => {
            var _a16;
            return __privateGet(_a16 = c, _isStale).call(_a16, index);
          }
        };
      }
      // Protected read-only members
      /**
       * {@link LRUCache.OptionsBase.max} (read-only)
       */
      get max() {
        return __privateGet(this, _max);
      }
      /**
       * {@link LRUCache.OptionsBase.maxSize} (read-only)
       */
      get maxSize() {
        return __privateGet(this, _maxSize);
      }
      /**
       * The total computed size of items in the cache (read-only)
       */
      get calculatedSize() {
        return __privateGet(this, _calculatedSize);
      }
      /**
       * The number of items stored in the cache (read-only)
       */
      get size() {
        return __privateGet(this, _size);
      }
      /**
       * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
       */
      get fetchMethod() {
        return __privateGet(this, _fetchMethod);
      }
      get memoMethod() {
        return __privateGet(this, _memoMethod);
      }
      /**
       * {@link LRUCache.OptionsBase.dispose} (read-only)
       */
      get dispose() {
        return __privateGet(this, _dispose);
      }
      /**
       * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
       */
      get disposeAfter() {
        return __privateGet(this, _disposeAfter);
      }
      /**
       * Return the number of ms left in the item's TTL. If item is not in cache,
       * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
       */
      getRemainingTTL(key) {
        return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
      }
      /**
       * Return a generator yielding `[key, value]` pairs,
       * in order from most recently used to least recently used.
       */
      *entries() {
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.entries}
       *
       * Return a generator yielding `[key, value]` pairs,
       * in order from least recently used to most recently used.
       */
      *rentries() {
        for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
          }
        }
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const k2 = __privateGet(this, _keyList)[i];
          if (k2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield k2;
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.keys}
       *
       * Return a generator yielding the keys in the cache,
       * in order from least recently used to most recently used.
       */
      *rkeys() {
        for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const k2 = __privateGet(this, _keyList)[i];
          if (k2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield k2;
          }
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v3 = __privateGet(this, _valList)[i];
          if (v3 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield __privateGet(this, _valList)[i];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.values}
       *
       * Return a generator yielding the values in the cache,
       * in order from least recently used to most recently used.
       */
      *rvalues() {
        for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const v3 = __privateGet(this, _valList)[i];
          if (v3 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
            yield __privateGet(this, _valList)[i];
          }
        }
      }
      /**
       * Iterating over the cache itself yields the same results as
       * {@link LRUCache.entries}
       */
      [(_b12 = Symbol.iterator, _a15 = Symbol.toStringTag, _b12)]() {
        return this.entries();
      }
      /**
       * Find a value for which the supplied fn method returns a truthy value,
       * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
       */
      find(fn2, getOptions = {}) {
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v3 = __privateGet(this, _valList)[i];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
          if (value === void 0)
            continue;
          if (fn2(value, __privateGet(this, _keyList)[i], this)) {
            return this.get(__privateGet(this, _keyList)[i], getOptions);
          }
        }
      }
      /**
       * Call the supplied function on each item in the cache, in order from most
       * recently used to least recently used.
       *
       * `fn` is called as `fn(value, key, cache)`.
       *
       * If `thisp` is provided, function will be called in the `this`-context of
       * the provided object, or the cache if no `thisp` object is provided.
       *
       * Does not update age or recenty of use, or iterate over stale values.
       */
      forEach(fn2, thisp = this) {
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v3 = __privateGet(this, _valList)[i];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
          if (value === void 0)
            continue;
          fn2.call(thisp, value, __privateGet(this, _keyList)[i], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn2, thisp = this) {
        for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const v3 = __privateGet(this, _valList)[i];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
          if (value === void 0)
            continue;
          fn2.call(thisp, value, __privateGet(this, _keyList)[i], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = false;
        for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
          if (__privateGet(this, _isStale).call(this, i)) {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[i], "expire");
            deleted = true;
          }
        }
        return deleted;
      }
      /**
       * Get the extended info about a given entry, to get its value, size, and
       * TTL info simultaneously. Returns `undefined` if the key is not present.
       *
       * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
       * serialization, the `start` value is always the current timestamp, and the
       * `ttl` is a calculated remaining time to live (negative if expired).
       *
       * Always returns stale values, if their info is found in the cache, so be
       * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
       * if relevant.
       */
      info(key) {
        const i = __privateGet(this, _keyMap).get(key);
        if (i === void 0)
          return void 0;
        const v3 = __privateGet(this, _valList)[i];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
        if (value === void 0)
          return void 0;
        const entry = { value };
        if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
          const ttl = __privateGet(this, _ttls)[i];
          const start = __privateGet(this, _starts)[i];
          if (ttl && start) {
            const remain = ttl - (perf.now() - start);
            entry.ttl = remain;
            entry.start = Date.now();
          }
        }
        if (__privateGet(this, _sizes)) {
          entry.size = __privateGet(this, _sizes)[i];
        }
        return entry;
      }
      /**
       * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
       * passed to {@link LRLUCache#load}.
       *
       * The `start` fields are calculated relative to a portable `Date.now()`
       * timestamp, even if `performance.now()` is available.
       *
       * Stale entries are always included in the `dump`, even if
       * {@link LRUCache.OptionsBase.allowStale} is false.
       *
       * Note: this returns an actual array, not a generator, so it can be more
       * easily passed around.
       */
      dump() {
        const arr = [];
        for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this, { allowStale: true })) {
          const key = __privateGet(this, _keyList)[i];
          const v3 = __privateGet(this, _valList)[i];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
          if (value === void 0 || key === void 0)
            continue;
          const entry = { value };
          if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
            entry.ttl = __privateGet(this, _ttls)[i];
            const age = perf.now() - __privateGet(this, _starts)[i];
            entry.start = Math.floor(Date.now() - age);
          }
          if (__privateGet(this, _sizes)) {
            entry.size = __privateGet(this, _sizes)[i];
          }
          arr.unshift([key, entry]);
        }
        return arr;
      }
      /**
       * Reset the cache and load in the items in entries in the order listed.
       *
       * The shape of the resulting cache may be different if the same options are
       * not used in both caches.
       *
       * The `start` fields are assumed to be calculated relative to a portable
       * `Date.now()` timestamp, even if `performance.now()` is available.
       */
      load(arr) {
        this.clear();
        for (const [key, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key, entry.value, entry);
        }
      }
      /**
       * Add a value to the cache.
       *
       * Note: if `undefined` is specified as a value, this is an alias for
       * {@link LRUCache#delete}
       *
       * Fields on the {@link LRUCache.SetOptions} options param will override
       * their corresponding values in the constructor options for the scope
       * of this single `set()` operation.
       *
       * If `start` is provided, then that will set the effective start
       * time for the TTL calculation. Note that this must be a previous
       * value of `performance.now()` if supported, or a previous value of
       * `Date.now()` if not.
       *
       * Options object may also include `size`, which will prevent
       * calling the `sizeCalculation` function and just use the specified
       * number if it is a positive integer, and `noDisposeOnSet` which
       * will prevent calling a `dispose` function in the case of
       * overwrites.
       *
       * If the `size` (or return value of `sizeCalculation`) for a given
       * entry is greater than `maxEntrySize`, then the item will not be
       * added to the cache.
       *
       * Will update the recency of the entry.
       *
       * If the value is `undefined`, then this is an alias for
       * `cache.delete(key)`. `undefined` is never stored in the cache.
       */
      set(k2, v3, setOptions = {}) {
        var _a16, _b13, _c5, _d4, _e3;
        if (v3 === void 0) {
          this.delete(k2);
          return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = __privateGet(this, _requireSize).call(this, k2, v3, setOptions.size || 0, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize) {
          if (status) {
            status.set = "miss";
            status.maxEntrySizeExceeded = true;
          }
          __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "set");
          return this;
        }
        let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k2);
        if (index === void 0) {
          index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _LRUCache_instances, evict_fn).call(this, false) : __privateGet(this, _size);
          __privateGet(this, _keyList)[index] = k2;
          __privateGet(this, _valList)[index] = v3;
          __privateGet(this, _keyMap).set(k2, index);
          __privateGet(this, _next)[__privateGet(this, _tail)] = index;
          __privateGet(this, _prev)[index] = __privateGet(this, _tail);
          __privateSet(this, _tail, index);
          __privateWrapper(this, _size)._++;
          __privateGet(this, _addItemSize).call(this, index, size, status);
          if (status)
            status.set = "add";
          noUpdateTTL = false;
        } else {
          __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
          const oldVal = __privateGet(this, _valList)[index];
          if (v3 !== oldVal) {
            if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              const { __staleWhileFetching: s2 } = oldVal;
              if (s2 !== void 0 && !noDisposeOnSet) {
                if (__privateGet(this, _hasDispose)) {
                  (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, s2, k2, "set");
                }
                if (__privateGet(this, _hasDisposeAfter)) {
                  (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([s2, k2, "set"]);
                }
              }
            } else if (!noDisposeOnSet) {
              if (__privateGet(this, _hasDispose)) {
                (_c5 = __privateGet(this, _dispose)) == null ? void 0 : _c5.call(this, oldVal, k2, "set");
              }
              if (__privateGet(this, _hasDisposeAfter)) {
                (_d4 = __privateGet(this, _disposed)) == null ? void 0 : _d4.push([oldVal, k2, "set"]);
              }
            }
            __privateGet(this, _removeItemSize).call(this, index);
            __privateGet(this, _addItemSize).call(this, index, size, status);
            __privateGet(this, _valList)[index] = v3;
            if (status) {
              status.set = "replace";
              const oldValue = oldVal && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
              if (oldValue !== void 0)
                status.oldValue = oldValue;
            }
          } else if (status) {
            status.set = "update";
          }
        }
        if (ttl !== 0 && !__privateGet(this, _ttls)) {
          __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
        }
        if (__privateGet(this, _ttls)) {
          if (!noUpdateTTL) {
            __privateGet(this, _setItemTTL).call(this, index, ttl, start);
          }
          if (status)
            __privateGet(this, _statusTTL).call(this, status, index);
        }
        if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
          const dt = __privateGet(this, _disposed);
          let task;
          while (task = dt == null ? void 0 : dt.shift()) {
            (_e3 = __privateGet(this, _disposeAfter)) == null ? void 0 : _e3.call(this, ...task);
          }
        }
        return this;
      }
      /**
       * Evict the least recently used item, returning its value or
       * `undefined` if cache is empty.
       */
      pop() {
        var _a16;
        try {
          while (__privateGet(this, _size)) {
            const val = __privateGet(this, _valList)[__privateGet(this, _head)];
            __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
            if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, val)) {
              if (val.__staleWhileFetching) {
                return val.__staleWhileFetching;
              }
            } else if (val !== void 0) {
              return val;
            }
          }
        } finally {
          if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
            const dt = __privateGet(this, _disposed);
            let task;
            while (task = dt == null ? void 0 : dt.shift()) {
              (_a16 = __privateGet(this, _disposeAfter)) == null ? void 0 : _a16.call(this, ...task);
            }
          }
        }
      }
      /**
       * Check if a key is in the cache, without updating the recency of use.
       * Will return false if the item is stale, even though it is technically
       * in the cache.
       *
       * Check if a key is in the cache, without updating the recency of
       * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
       * to `true` in either the options or the constructor.
       *
       * Will return `false` if the item is stale, even though it is technically in
       * the cache. The difference can be determined (if it matters) by using a
       * `status` argument, and inspecting the `has` field.
       *
       * Will not update item age unless
       * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
       */
      has(k2, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = __privateGet(this, _keyMap).get(k2);
        if (index !== void 0) {
          const v3 = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) && v3.__staleWhileFetching === void 0) {
            return false;
          }
          if (!__privateGet(this, _isStale).call(this, index)) {
            if (updateAgeOnHas) {
              __privateGet(this, _updateItemAge).call(this, index);
            }
            if (status) {
              status.has = "hit";
              __privateGet(this, _statusTTL).call(this, status, index);
            }
            return true;
          } else if (status) {
            status.has = "stale";
            __privateGet(this, _statusTTL).call(this, status, index);
          }
        } else if (status) {
          status.has = "miss";
        }
        return false;
      }
      /**
       * Like {@link LRUCache#get} but doesn't update recency or delete stale
       * items.
       *
       * Returns `undefined` if the item is stale, unless
       * {@link LRUCache.OptionsBase.allowStale} is set.
       */
      peek(k2, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = __privateGet(this, _keyMap).get(k2);
        if (index === void 0 || !allowStale && __privateGet(this, _isStale).call(this, index)) {
          return;
        }
        const v3 = __privateGet(this, _valList)[index];
        return __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3) ? v3.__staleWhileFetching : v3;
      }
      async fetch(k2, fetchOptions = {}) {
        const {
          // get options
          allowStale = this.allowStale,
          updateAgeOnGet = this.updateAgeOnGet,
          noDeleteOnStaleGet = this.noDeleteOnStaleGet,
          // set options
          ttl = this.ttl,
          noDisposeOnSet = this.noDisposeOnSet,
          size = 0,
          sizeCalculation = this.sizeCalculation,
          noUpdateTTL = this.noUpdateTTL,
          // fetch exclusive options
          noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
          ignoreFetchAbort = this.ignoreFetchAbort,
          allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
          context,
          forceRefresh = false,
          status,
          signal
        } = fetchOptions;
        if (!__privateGet(this, _hasFetchMethod)) {
          if (status)
            status.fetch = "get";
          return this.get(k2, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            status
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection,
          allowStaleOnFetchRejection,
          allowStaleOnFetchAbort,
          ignoreFetchAbort,
          status,
          signal
        };
        let index = __privateGet(this, _keyMap).get(k2);
        if (index === void 0) {
          if (status)
            status.fetch = "miss";
          const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k2, index, options, context);
          return p.__returned = p;
        } else {
          const v3 = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
            const stale = allowStale && v3.__staleWhileFetching !== void 0;
            if (status) {
              status.fetch = "inflight";
              if (stale)
                status.returnedStale = true;
            }
            return stale ? v3.__staleWhileFetching : v3.__returned = v3;
          }
          const isStale = __privateGet(this, _isStale).call(this, index);
          if (!forceRefresh && !isStale) {
            if (status)
              status.fetch = "hit";
            __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
            if (updateAgeOnGet) {
              __privateGet(this, _updateItemAge).call(this, index);
            }
            if (status)
              __privateGet(this, _statusTTL).call(this, status, index);
            return v3;
          }
          const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k2, index, options, context);
          const hasStale = p.__staleWhileFetching !== void 0;
          const staleVal = hasStale && allowStale;
          if (status) {
            status.fetch = isStale ? "stale" : "refresh";
            if (staleVal && isStale)
              status.returnedStale = true;
          }
          return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      async forceFetch(k2, fetchOptions = {}) {
        const v3 = await this.fetch(k2, fetchOptions);
        if (v3 === void 0)
          throw new Error("fetch() returned undefined");
        return v3;
      }
      memo(k2, memoOptions = {}) {
        const memoMethod = __privateGet(this, _memoMethod);
        if (!memoMethod) {
          throw new Error("no memoMethod provided to constructor");
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v3 = this.get(k2, options);
        if (!forceRefresh && v3 !== void 0)
          return v3;
        const vv = memoMethod(k2, v3, {
          options,
          context
        });
        this.set(k2, vv, options);
        return vv;
      }
      /**
       * Return a value from the cache. Will update the recency of the cache
       * entry found.
       *
       * If the key is not found, get() will return `undefined`.
       */
      get(k2, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = __privateGet(this, _keyMap).get(k2);
        if (index !== void 0) {
          const value = __privateGet(this, _valList)[index];
          const fetching = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, value);
          if (status)
            __privateGet(this, _statusTTL).call(this, status, index);
          if (__privateGet(this, _isStale).call(this, index)) {
            if (status)
              status.get = "stale";
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "expire");
              }
              if (status && allowStale)
                status.returnedStale = true;
              return allowStale ? value : void 0;
            } else {
              if (status && allowStale && value.__staleWhileFetching !== void 0) {
                status.returnedStale = true;
              }
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (status)
              status.get = "hit";
            if (fetching) {
              return value.__staleWhileFetching;
            }
            __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
            if (updateAgeOnGet) {
              __privateGet(this, _updateItemAge).call(this, index);
            }
            return value;
          }
        } else if (status) {
          status.get = "miss";
        }
      }
      /**
       * Deletes a key out of the cache.
       *
       * Returns true if the key was deleted, false otherwise.
       */
      delete(k2) {
        return __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "delete");
      }
      /**
       * Clear the cache entirely, throwing away all values.
       */
      clear() {
        return __privateMethod(this, _LRUCache_instances, clear_fn).call(this, "delete");
      }
    };
    _max = new WeakMap();
    _maxSize = new WeakMap();
    _dispose = new WeakMap();
    _disposeAfter = new WeakMap();
    _fetchMethod = new WeakMap();
    _memoMethod = new WeakMap();
    _size = new WeakMap();
    _calculatedSize = new WeakMap();
    _keyMap = new WeakMap();
    _keyList = new WeakMap();
    _valList = new WeakMap();
    _next = new WeakMap();
    _prev = new WeakMap();
    _head = new WeakMap();
    _tail = new WeakMap();
    _free = new WeakMap();
    _disposed = new WeakMap();
    _sizes = new WeakMap();
    _starts = new WeakMap();
    _ttls = new WeakMap();
    _hasDispose = new WeakMap();
    _hasFetchMethod = new WeakMap();
    _hasDisposeAfter = new WeakMap();
    _LRUCache_instances = new WeakSet();
    initializeTTLTracking_fn = function() {
      const ttls = new ZeroArray(__privateGet(this, _max));
      const starts = new ZeroArray(__privateGet(this, _max));
      __privateSet(this, _ttls, ttls);
      __privateSet(this, _starts, starts);
      __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
        starts[index] = ttl !== 0 ? start : 0;
        ttls[index] = ttl;
        if (ttl !== 0 && this.ttlAutopurge) {
          const t2 = setTimeout(() => {
            if (__privateGet(this, _isStale).call(this, index)) {
              __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[index], "expire");
            }
          }, ttl + 1);
          if (t2.unref) {
            t2.unref();
          }
        }
      });
      __privateSet(this, _updateItemAge, (index) => {
        starts[index] = ttls[index] !== 0 ? perf.now() : 0;
      });
      __privateSet(this, _statusTTL, (status, index) => {
        if (ttls[index]) {
          const ttl = ttls[index];
          const start = starts[index];
          if (!ttl || !start)
            return;
          status.ttl = ttl;
          status.start = start;
          status.now = cachedNow || getNow();
          const age = status.now - start;
          status.remainingTTL = ttl - age;
        }
      });
      let cachedNow = 0;
      const getNow = () => {
        const n = perf.now();
        if (this.ttlResolution > 0) {
          cachedNow = n;
          const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
          if (t2.unref) {
            t2.unref();
          }
        }
        return n;
      };
      this.getRemainingTTL = (key) => {
        const index = __privateGet(this, _keyMap).get(key);
        if (index === void 0) {
          return 0;
        }
        const ttl = ttls[index];
        const start = starts[index];
        if (!ttl || !start) {
          return Infinity;
        }
        const age = (cachedNow || getNow()) - start;
        return ttl - age;
      };
      __privateSet(this, _isStale, (index) => {
        const s2 = starts[index];
        const t2 = ttls[index];
        return !!t2 && !!s2 && (cachedNow || getNow()) - s2 > t2;
      });
    };
    _updateItemAge = new WeakMap();
    _statusTTL = new WeakMap();
    _setItemTTL = new WeakMap();
    _isStale = new WeakMap();
    initializeSizeTracking_fn = function() {
      const sizes = new ZeroArray(__privateGet(this, _max));
      __privateSet(this, _calculatedSize, 0);
      __privateSet(this, _sizes, sizes);
      __privateSet(this, _removeItemSize, (index) => {
        __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
        sizes[index] = 0;
      });
      __privateSet(this, _requireSize, (k2, v3, size, sizeCalculation) => {
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
          return 0;
        }
        if (!isPosInt(size)) {
          if (sizeCalculation) {
            if (typeof sizeCalculation !== "function") {
              throw new TypeError("sizeCalculation must be a function");
            }
            size = sizeCalculation(v3, k2);
            if (!isPosInt(size)) {
              throw new TypeError("sizeCalculation return invalid (expect positive integer)");
            }
          } else {
            throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
          }
        }
        return size;
      });
      __privateSet(this, _addItemSize, (index, size, status) => {
        sizes[index] = size;
        if (__privateGet(this, _maxSize)) {
          const maxSize = __privateGet(this, _maxSize) - sizes[index];
          while (__privateGet(this, _calculatedSize) > maxSize) {
            __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
          }
        }
        __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
        if (status) {
          status.entrySize = size;
          status.totalCalculatedSize = __privateGet(this, _calculatedSize);
        }
      });
    };
    _removeItemSize = new WeakMap();
    _addItemSize = new WeakMap();
    _requireSize = new WeakMap();
    indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
      if (__privateGet(this, _size)) {
        for (let i = __privateGet(this, _tail); true; ) {
          if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
            break;
          }
          if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
            yield i;
          }
          if (i === __privateGet(this, _head)) {
            break;
          } else {
            i = __privateGet(this, _prev)[i];
          }
        }
      }
    };
    rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
      if (__privateGet(this, _size)) {
        for (let i = __privateGet(this, _head); true; ) {
          if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
            break;
          }
          if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
            yield i;
          }
          if (i === __privateGet(this, _tail)) {
            break;
          } else {
            i = __privateGet(this, _next)[i];
          }
        }
      }
    };
    isValidIndex_fn = function(index) {
      return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
    };
    evict_fn = function(free) {
      var _a16, _b13;
      const head = __privateGet(this, _head);
      const k2 = __privateGet(this, _keyList)[head];
      const v3 = __privateGet(this, _valList)[head];
      if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
        v3.__abortController.abort(new Error("evicted"));
      } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
        if (__privateGet(this, _hasDispose)) {
          (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v3, k2, "evict");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v3, k2, "evict"]);
        }
      }
      __privateGet(this, _removeItemSize).call(this, head);
      if (free) {
        __privateGet(this, _keyList)[head] = void 0;
        __privateGet(this, _valList)[head] = void 0;
        __privateGet(this, _free).push(head);
      }
      if (__privateGet(this, _size) === 1) {
        __privateSet(this, _head, __privateSet(this, _tail, 0));
        __privateGet(this, _free).length = 0;
      } else {
        __privateSet(this, _head, __privateGet(this, _next)[head]);
      }
      __privateGet(this, _keyMap).delete(k2);
      __privateWrapper(this, _size)._--;
      return head;
    };
    backgroundFetch_fn = function(k2, index, options, context) {
      const v3 = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
        return v3;
      }
      const ac = new AC();
      const { signal } = options;
      signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
        signal: ac.signal
      });
      const fetchOpts = {
        signal: ac.signal,
        options,
        context
      };
      const cb = (v4, updateCache = false) => {
        const { aborted } = ac.signal;
        const ignoreAbort = options.ignoreFetchAbort && v4 !== void 0;
        if (options.status) {
          if (aborted && !updateCache) {
            options.status.fetchAborted = true;
            options.status.fetchError = ac.signal.reason;
            if (ignoreAbort)
              options.status.fetchAbortIgnored = true;
          } else {
            options.status.fetchResolved = true;
          }
        }
        if (aborted && !ignoreAbort && !updateCache) {
          return fetchFail(ac.signal.reason);
        }
        const bf2 = p;
        if (__privateGet(this, _valList)[index] === p) {
          if (v4 === void 0) {
            if (bf2.__staleWhileFetching) {
              __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
            } else {
              __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "fetch");
            }
          } else {
            if (options.status)
              options.status.fetchUpdated = true;
            this.set(k2, v4, fetchOpts.options);
          }
        }
        return v4;
      };
      const eb = (er2) => {
        if (options.status) {
          options.status.fetchRejected = true;
          options.status.fetchError = er2;
        }
        return fetchFail(er2);
      };
      const fetchFail = (er2) => {
        const { aborted } = ac.signal;
        const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
        const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
        const noDelete = allowStale || options.noDeleteOnFetchRejection;
        const bf2 = p;
        if (__privateGet(this, _valList)[index] === p) {
          const del = !noDelete || bf2.__staleWhileFetching === void 0;
          if (del) {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "fetch");
          } else if (!allowStaleAborted) {
            __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
          }
        }
        if (allowStale) {
          if (options.status && bf2.__staleWhileFetching !== void 0) {
            options.status.returnedStale = true;
          }
          return bf2.__staleWhileFetching;
        } else if (bf2.__returned === bf2) {
          throw er2;
        }
      };
      const pcall = (res, rej) => {
        var _a16;
        const fmp = (_a16 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a16.call(this, k2, v3, fetchOpts);
        if (fmp && fmp instanceof Promise) {
          fmp.then((v4) => res(v4 === void 0 ? void 0 : v4), rej);
        }
        ac.signal.addEventListener("abort", () => {
          if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
            res(void 0);
            if (options.allowStaleOnFetchAbort) {
              res = (v4) => cb(v4, true);
            }
          }
        });
      };
      if (options.status)
        options.status.fetchDispatched = true;
      const p = new Promise(pcall).then(cb, eb);
      const bf = Object.assign(p, {
        __abortController: ac,
        __staleWhileFetching: v3,
        __returned: void 0
      });
      if (index === void 0) {
        this.set(k2, bf, { ...fetchOpts.options, status: void 0 });
        index = __privateGet(this, _keyMap).get(k2);
      } else {
        __privateGet(this, _valList)[index] = bf;
      }
      return bf;
    };
    isBackgroundFetch_fn = function(p) {
      if (!__privateGet(this, _hasFetchMethod))
        return false;
      const b = p;
      return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
    };
    connect_fn = function(p, n) {
      __privateGet(this, _prev)[n] = p;
      __privateGet(this, _next)[p] = n;
    };
    moveToTail_fn = function(index) {
      if (index !== __privateGet(this, _tail)) {
        if (index === __privateGet(this, _head)) {
          __privateSet(this, _head, __privateGet(this, _next)[index]);
        } else {
          __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
        }
        __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _tail), index);
        __privateSet(this, _tail, index);
      }
    };
    delete_fn = function(k2, reason) {
      var _a16, _b13, _c5, _d4;
      let deleted = false;
      if (__privateGet(this, _size) !== 0) {
        const index = __privateGet(this, _keyMap).get(k2);
        if (index !== void 0) {
          deleted = true;
          if (__privateGet(this, _size) === 1) {
            __privateMethod(this, _LRUCache_instances, clear_fn).call(this, reason);
          } else {
            __privateGet(this, _removeItemSize).call(this, index);
            const v3 = __privateGet(this, _valList)[index];
            if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
              v3.__abortController.abort(new Error("deleted"));
            } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
              if (__privateGet(this, _hasDispose)) {
                (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v3, k2, reason);
              }
              if (__privateGet(this, _hasDisposeAfter)) {
                (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v3, k2, reason]);
              }
            }
            __privateGet(this, _keyMap).delete(k2);
            __privateGet(this, _keyList)[index] = void 0;
            __privateGet(this, _valList)[index] = void 0;
            if (index === __privateGet(this, _tail)) {
              __privateSet(this, _tail, __privateGet(this, _prev)[index]);
            } else if (index === __privateGet(this, _head)) {
              __privateSet(this, _head, __privateGet(this, _next)[index]);
            } else {
              const pi2 = __privateGet(this, _prev)[index];
              __privateGet(this, _next)[pi2] = __privateGet(this, _next)[index];
              const ni = __privateGet(this, _next)[index];
              __privateGet(this, _prev)[ni] = __privateGet(this, _prev)[index];
            }
            __privateWrapper(this, _size)._--;
            __privateGet(this, _free).push(index);
          }
        }
      }
      if (__privateGet(this, _hasDisposeAfter) && ((_c5 = __privateGet(this, _disposed)) == null ? void 0 : _c5.length)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_d4 = __privateGet(this, _disposeAfter)) == null ? void 0 : _d4.call(this, ...task);
        }
      }
      return deleted;
    };
    clear_fn = function(reason) {
      var _a16, _b13, _c5;
      for (const index of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
        const v3 = __privateGet(this, _valList)[index];
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v3)) {
          v3.__abortController.abort(new Error("deleted"));
        } else {
          const k2 = __privateGet(this, _keyList)[index];
          if (__privateGet(this, _hasDispose)) {
            (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v3, k2, reason);
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v3, k2, reason]);
          }
        }
      }
      __privateGet(this, _keyMap).clear();
      __privateGet(this, _valList).fill(void 0);
      __privateGet(this, _keyList).fill(void 0);
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        __privateGet(this, _ttls).fill(0);
        __privateGet(this, _starts).fill(0);
      }
      if (__privateGet(this, _sizes)) {
        __privateGet(this, _sizes).fill(0);
      }
      __privateSet(this, _head, 0);
      __privateSet(this, _tail, 0);
      __privateGet(this, _free).length = 0;
      __privateSet(this, _calculatedSize, 0);
      __privateSet(this, _size, 0);
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_c5 = __privateGet(this, _disposeAfter)) == null ? void 0 : _c5.call(this, ...task);
        }
      }
    };
    var LRUCache = _LRUCache;
    exports.LRUCache = LRUCache;
  }
});

// node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/hosts.js
var require_hosts = __commonJS({
  "node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/hosts.js"(exports, module) {
    var maybeJoin = (...args) => args.every((arg) => arg) ? args.join("") : "";
    var maybeEncode = (arg) => arg ? encodeURIComponent(arg) : "";
    var formatHashFragment = (f) => f.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
    var defaults2 = {
      sshtemplate: ({ domain, user, project: project2, committish }) => `git@${domain}:${user}/${project2}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, user, project: project2, committish }) => `git+ssh://git@${domain}/${user}/${project2}.git${maybeJoin("#", committish)}`,
      edittemplate: ({ domain, user, project: project2, committish, editpath, path: path5 }) => `https://${domain}/${user}/${project2}${maybeJoin("/", editpath, "/", maybeEncode(committish || "HEAD"), "/", path5)}`,
      browsetemplate: ({ domain, user, project: project2, committish, treepath }) => `https://${domain}/${user}/${project2}${maybeJoin("/", treepath, "/", maybeEncode(committish))}`,
      browsetreetemplate: ({ domain, user, project: project2, committish, treepath, path: path5, fragment, hashformat }) => `https://${domain}/${user}/${project2}/${treepath}/${maybeEncode(committish || "HEAD")}/${path5}${maybeJoin("#", hashformat(fragment || ""))}`,
      browseblobtemplate: ({ domain, user, project: project2, committish, blobpath, path: path5, fragment, hashformat }) => `https://${domain}/${user}/${project2}/${blobpath}/${maybeEncode(committish || "HEAD")}/${path5}${maybeJoin("#", hashformat(fragment || ""))}`,
      docstemplate: ({ domain, user, project: project2, treepath, committish }) => `https://${domain}/${user}/${project2}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
      httpstemplate: ({ auth, domain, user, project: project2, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project2}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ domain, user, project: project2, committish, path: path5 }) => `https://${domain}/${user}/${project2}/raw/${maybeEncode(committish || "HEAD")}/${path5}`,
      shortcuttemplate: ({ type: type2, user, project: project2, committish }) => `${type2}:${user}/${project2}${maybeJoin("#", committish)}`,
      pathtemplate: ({ user, project: project2, committish }) => `${user}/${project2}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, user, project: project2 }) => `https://${domain}/${user}/${project2}/issues`,
      hashformat: formatHashFragment
    };
    var hosts = {};
    hosts.github = {
      // First two are insecure and generally shouldn't be used any more, but
      // they are still supported.
      protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "github.com",
      treepath: "tree",
      blobpath: "blob",
      editpath: "edit",
      filetemplate: ({ auth, user, project: project2, committish, path: path5 }) => `https://${maybeJoin(auth, "@")}raw.githubusercontent.com/${user}/${project2}/${maybeEncode(committish || "HEAD")}/${path5}`,
      gittemplate: ({ auth, domain, user, project: project2, committish }) => `git://${maybeJoin(auth, "@")}${domain}/${user}/${project2}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project: project2, committish }) => `https://codeload.${domain}/${user}/${project2}/tar.gz/${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        let [, user, project2, type2, committish] = url.pathname.split("/", 5);
        if (type2 && type2 !== "tree") {
          return;
        }
        if (!type2) {
          committish = url.hash.slice(1);
        }
        if (project2 && project2.endsWith(".git")) {
          project2 = project2.slice(0, -4);
        }
        if (!user || !project2) {
          return;
        }
        return { user, project: project2, committish };
      }
    };
    hosts.bitbucket = {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "bitbucket.org",
      treepath: "src",
      blobpath: "src",
      editpath: "?mode=edit",
      edittemplate: ({ domain, user, project: project2, committish, treepath, path: path5, editpath }) => `https://${domain}/${user}/${project2}${maybeJoin("/", treepath, "/", maybeEncode(committish || "HEAD"), "/", path5, editpath)}`,
      tarballtemplate: ({ domain, user, project: project2, committish }) => `https://${domain}/${user}/${project2}/get/${maybeEncode(committish || "HEAD")}.tar.gz`,
      extract: (url) => {
        let [, user, project2, aux] = url.pathname.split("/", 4);
        if (["get"].includes(aux)) {
          return;
        }
        if (project2 && project2.endsWith(".git")) {
          project2 = project2.slice(0, -4);
        }
        if (!user || !project2) {
          return;
        }
        return { user, project: project2, committish: url.hash.slice(1) };
      }
    };
    hosts.gitlab = {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gitlab.com",
      treepath: "tree",
      blobpath: "tree",
      editpath: "-/edit",
      httpstemplate: ({ auth, domain, user, project: project2, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project2}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project: project2, committish }) => `https://${domain}/${user}/${project2}/repository/archive.tar.gz?ref=${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        const path5 = url.pathname.slice(1);
        if (path5.includes("/-/") || path5.includes("/archive.tar.gz")) {
          return;
        }
        const segments = path5.split("/");
        let project2 = segments.pop();
        if (project2.endsWith(".git")) {
          project2 = project2.slice(0, -4);
        }
        const user = segments.join("/");
        if (!user || !project2) {
          return;
        }
        return { user, project: project2, committish: url.hash.slice(1) };
      }
    };
    hosts.gist = {
      protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gist.github.com",
      editpath: "edit",
      sshtemplate: ({ domain, project: project2, committish }) => `git@${domain}:${project2}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, project: project2, committish }) => `git+ssh://git@${domain}/${project2}.git${maybeJoin("#", committish)}`,
      edittemplate: ({ domain, user, project: project2, committish, editpath }) => `https://${domain}/${user}/${project2}${maybeJoin("/", maybeEncode(committish))}/${editpath}`,
      browsetemplate: ({ domain, project: project2, committish }) => `https://${domain}/${project2}${maybeJoin("/", maybeEncode(committish))}`,
      browsetreetemplate: ({ domain, project: project2, committish, path: path5, hashformat }) => `https://${domain}/${project2}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path5))}`,
      browseblobtemplate: ({ domain, project: project2, committish, path: path5, hashformat }) => `https://${domain}/${project2}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path5))}`,
      docstemplate: ({ domain, project: project2, committish }) => `https://${domain}/${project2}${maybeJoin("/", maybeEncode(committish))}`,
      httpstemplate: ({ domain, project: project2, committish }) => `git+https://${domain}/${project2}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ user, project: project2, committish, path: path5 }) => `https://gist.githubusercontent.com/${user}/${project2}/raw${maybeJoin("/", maybeEncode(committish))}/${path5}`,
      shortcuttemplate: ({ type: type2, project: project2, committish }) => `${type2}:${project2}${maybeJoin("#", committish)}`,
      pathtemplate: ({ project: project2, committish }) => `${project2}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, project: project2 }) => `https://${domain}/${project2}`,
      gittemplate: ({ domain, project: project2, committish }) => `git://${domain}/${project2}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ project: project2, committish }) => `https://codeload.github.com/gist/${project2}/tar.gz/${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        let [, user, project2, aux] = url.pathname.split("/", 4);
        if (aux === "raw") {
          return;
        }
        if (!project2) {
          if (!user) {
            return;
          }
          project2 = user;
          user = null;
        }
        if (project2.endsWith(".git")) {
          project2 = project2.slice(0, -4);
        }
        return { user, project: project2, committish: url.hash.slice(1) };
      },
      hashformat: function(fragment) {
        return fragment && "file-" + formatHashFragment(fragment);
      }
    };
    hosts.sourcehut = {
      protocols: ["git+ssh:", "https:"],
      domain: "git.sr.ht",
      treepath: "tree",
      blobpath: "tree",
      filetemplate: ({ domain, user, project: project2, committish, path: path5 }) => `https://${domain}/${user}/${project2}/blob/${maybeEncode(committish) || "HEAD"}/${path5}`,
      httpstemplate: ({ domain, user, project: project2, committish }) => `https://${domain}/${user}/${project2}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project: project2, committish }) => `https://${domain}/${user}/${project2}/archive/${maybeEncode(committish) || "HEAD"}.tar.gz`,
      bugstemplate: () => null,
      extract: (url) => {
        let [, user, project2, aux] = url.pathname.split("/", 4);
        if (["archive"].includes(aux)) {
          return;
        }
        if (project2 && project2.endsWith(".git")) {
          project2 = project2.slice(0, -4);
        }
        if (!user || !project2) {
          return;
        }
        return { user, project: project2, committish: url.hash.slice(1) };
      }
    };
    for (const [name, host] of Object.entries(hosts)) {
      hosts[name] = Object.assign({}, defaults2, host);
    }
    module.exports = hosts;
  }
});

// node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/parse-url.js
var require_parse_url = __commonJS({
  "node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/parse-url.js"(exports, module) {
    var url = __require("url");
    var lastIndexOfBefore = (str, char, beforeChar) => {
      const startPosition = str.indexOf(beforeChar);
      return str.lastIndexOf(char, startPosition > -1 ? startPosition : Infinity);
    };
    var safeUrl = (u) => {
      try {
        return new url.URL(u);
      } catch {
      }
    };
    var correctProtocol = (arg, protocols) => {
      const firstColon = arg.indexOf(":");
      const proto = arg.slice(0, firstColon + 1);
      if (Object.prototype.hasOwnProperty.call(protocols, proto)) {
        return arg;
      }
      const firstAt = arg.indexOf("@");
      if (firstAt > -1) {
        if (firstAt > firstColon) {
          return `git+ssh://${arg}`;
        } else {
          return arg;
        }
      }
      const doubleSlash = arg.indexOf("//");
      if (doubleSlash === firstColon + 1) {
        return arg;
      }
      return `${arg.slice(0, firstColon + 1)}//${arg.slice(firstColon + 1)}`;
    };
    var correctUrl = (giturl) => {
      const firstAt = lastIndexOfBefore(giturl, "@", "#");
      const lastColonBeforeHash = lastIndexOfBefore(giturl, ":", "#");
      if (lastColonBeforeHash > firstAt) {
        giturl = giturl.slice(0, lastColonBeforeHash) + "/" + giturl.slice(lastColonBeforeHash + 1);
      }
      if (lastIndexOfBefore(giturl, ":", "#") === -1 && giturl.indexOf("//") === -1) {
        giturl = `git+ssh://${giturl}`;
      }
      return giturl;
    };
    module.exports = (giturl, protocols) => {
      const withProtocol = protocols ? correctProtocol(giturl, protocols) : giturl;
      return safeUrl(withProtocol) || safeUrl(correctUrl(withProtocol));
    };
  }
});

// node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/from-url.js
var require_from_url = __commonJS({
  "node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/from-url.js"(exports, module) {
    var parseUrl = require_parse_url();
    var isGitHubShorthand = (arg) => {
      const firstHash = arg.indexOf("#");
      const firstSlash = arg.indexOf("/");
      const secondSlash = arg.indexOf("/", firstSlash + 1);
      const firstColon = arg.indexOf(":");
      const firstSpace = /\s/.exec(arg);
      const firstAt = arg.indexOf("@");
      const spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash;
      const atOnlyAfterHash = firstAt === -1 || firstHash > -1 && firstAt > firstHash;
      const colonOnlyAfterHash = firstColon === -1 || firstHash > -1 && firstColon > firstHash;
      const secondSlashOnlyAfterHash = secondSlash === -1 || firstHash > -1 && secondSlash > firstHash;
      const hasSlash = firstSlash > 0;
      const doesNotEndWithSlash = firstHash > -1 ? arg[firstHash - 1] !== "/" : !arg.endsWith("/");
      const doesNotStartWithDot = !arg.startsWith(".");
      return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
    };
    module.exports = (giturl, opts, { gitHosts, protocols }) => {
      var _a14, _b12;
      if (!giturl) {
        return;
      }
      const correctedUrl = isGitHubShorthand(giturl) ? `github:${giturl}` : giturl;
      const parsed = parseUrl(correctedUrl, protocols);
      if (!parsed) {
        return;
      }
      const gitHostShortcut = gitHosts.byShortcut[parsed.protocol];
      const gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith("www.") ? parsed.hostname.slice(4) : parsed.hostname];
      const gitHostName = gitHostShortcut || gitHostDomain;
      if (!gitHostName) {
        return;
      }
      const gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain];
      let auth = null;
      if (((_a14 = protocols[parsed.protocol]) == null ? void 0 : _a14.auth) && (parsed.username || parsed.password)) {
        auth = `${parsed.username}${parsed.password ? ":" + parsed.password : ""}`;
      }
      let committish = null;
      let user = null;
      let project2 = null;
      let defaultRepresentation = null;
      try {
        if (gitHostShortcut) {
          let pathname = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
          const firstAt = pathname.indexOf("@");
          if (firstAt > -1) {
            pathname = pathname.slice(firstAt + 1);
          }
          const lastSlash = pathname.lastIndexOf("/");
          if (lastSlash > -1) {
            user = decodeURIComponent(pathname.slice(0, lastSlash));
            if (!user) {
              user = null;
            }
            project2 = decodeURIComponent(pathname.slice(lastSlash + 1));
          } else {
            project2 = decodeURIComponent(pathname);
          }
          if (project2.endsWith(".git")) {
            project2 = project2.slice(0, -4);
          }
          if (parsed.hash) {
            committish = decodeURIComponent(parsed.hash.slice(1));
          }
          defaultRepresentation = "shortcut";
        } else {
          if (!gitHostInfo.protocols.includes(parsed.protocol)) {
            return;
          }
          const segments = gitHostInfo.extract(parsed);
          if (!segments) {
            return;
          }
          user = segments.user && decodeURIComponent(segments.user);
          project2 = decodeURIComponent(segments.project);
          committish = decodeURIComponent(segments.committish);
          defaultRepresentation = ((_b12 = protocols[parsed.protocol]) == null ? void 0 : _b12.name) || parsed.protocol.slice(0, -1);
        }
      } catch (err) {
        if (err instanceof URIError) {
          return;
        } else {
          throw err;
        }
      }
      return [gitHostName, user, auth, project2, committish, defaultRepresentation, opts];
    };
  }
});

// node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/index.js"(exports, module) {
    var { LRUCache } = require_commonjs();
    var hosts = require_hosts();
    var fromUrl = require_from_url();
    var parseUrl = require_parse_url();
    var cache = new LRUCache({ max: 1e3 });
    var _gitHosts, _protocols, _GitHost_instances, fill_fn;
    var _GitHost = class _GitHost {
      constructor(type2, user, auth, project2, committish, defaultRepresentation, opts = {}) {
        __privateAdd(this, _GitHost_instances);
        Object.assign(this, __privateGet(_GitHost, _gitHosts)[type2], {
          type: type2,
          user,
          auth,
          project: project2,
          committish,
          default: defaultRepresentation,
          opts
        });
      }
      static addHost(name, host) {
        __privateGet(_GitHost, _gitHosts)[name] = host;
        __privateGet(_GitHost, _gitHosts).byDomain[host.domain] = name;
        __privateGet(_GitHost, _gitHosts).byShortcut[`${name}:`] = name;
        __privateGet(_GitHost, _protocols)[`${name}:`] = { name };
      }
      static fromUrl(giturl, opts) {
        if (typeof giturl !== "string") {
          return;
        }
        const key = giturl + JSON.stringify(opts || {});
        if (!cache.has(key)) {
          const hostArgs = fromUrl(giturl, opts, {
            gitHosts: __privateGet(_GitHost, _gitHosts),
            protocols: __privateGet(_GitHost, _protocols)
          });
          cache.set(key, hostArgs ? new _GitHost(...hostArgs) : void 0);
        }
        return cache.get(key);
      }
      static parseUrl(url) {
        return parseUrl(url);
      }
      hash() {
        return this.committish ? `#${this.committish}` : "";
      }
      ssh(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.sshtemplate, opts);
      }
      sshurl(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.sshurltemplate, opts);
      }
      browse(path5, ...args) {
        if (typeof path5 !== "string") {
          return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.browsetemplate, path5);
        }
        if (typeof args[0] !== "string") {
          return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.browsetreetemplate, { ...args[0], path: path5 });
        }
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.browsetreetemplate, { ...args[1], fragment: args[0], path: path5 });
      }
      // If the path is known to be a file, then browseFile should be used. For some hosts
      // the url is the same as browse, but for others like GitHub a file can use both `/tree/`
      // and `/blob/` in the path. When using a default committish of `HEAD` then the `/tree/`
      // path will redirect to a specific commit. Using the `/blob/` path avoids this and
      // does not redirect to a different commit.
      browseFile(path5, ...args) {
        if (typeof args[0] !== "string") {
          return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.browseblobtemplate, { ...args[0], path: path5 });
        }
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.browseblobtemplate, { ...args[1], fragment: args[0], path: path5 });
      }
      docs(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.docstemplate, opts);
      }
      bugs(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.bugstemplate, opts);
      }
      https(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.httpstemplate, opts);
      }
      git(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.gittemplate, opts);
      }
      shortcut(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.shortcuttemplate, opts);
      }
      path(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.pathtemplate, opts);
      }
      tarball(opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.tarballtemplate, { ...opts, noCommittish: false });
      }
      file(path5, opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.filetemplate, { ...opts, path: path5 });
      }
      edit(path5, opts) {
        return __privateMethod(this, _GitHost_instances, fill_fn).call(this, this.edittemplate, { ...opts, path: path5 });
      }
      getDefaultRepresentation() {
        return this.default;
      }
      toString(opts) {
        if (this.default && typeof this[this.default] === "function") {
          return this[this.default](opts);
        }
        return this.sshurl(opts);
      }
    };
    _gitHosts = new WeakMap();
    _protocols = new WeakMap();
    _GitHost_instances = new WeakSet();
    fill_fn = function(template, opts) {
      if (typeof template !== "function") {
        return null;
      }
      const options = { ...this, ...this.opts, ...opts };
      if (!options.path) {
        options.path = "";
      }
      if (options.path.startsWith("/")) {
        options.path = options.path.slice(1);
      }
      if (options.noCommittish) {
        options.committish = null;
      }
      const result = template(options);
      return options.noGitPlus && result.startsWith("git+") ? result.slice(4) : result;
    };
    __privateAdd(_GitHost, _gitHosts, { byShortcut: {}, byDomain: {} });
    __privateAdd(_GitHost, _protocols, {
      "git+ssh:": { name: "sshurl" },
      "ssh:": { name: "sshurl" },
      "git+https:": { name: "https", auth: true },
      "git:": { auth: true },
      "http:": { auth: true },
      "https:": { auth: true },
      "git+http:": { auth: true }
    });
    var GitHost = _GitHost;
    for (const [name, host] of Object.entries(hosts)) {
      GitHost.addHost(name, host);
    }
    module.exports = GitHost;
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/extract_description.js
var require_extract_description = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/extract_description.js"(exports, module) {
    module.exports = extractDescription;
    function extractDescription(d) {
      if (!d) {
        return;
      }
      if (d === "ERROR: No README data found!") {
        return;
      }
      d = d.trim().split("\n");
      let s2 = 0;
      while (d[s2] && d[s2].trim().match(/^(#|$)/)) {
        s2++;
      }
      const l2 = d.length;
      let e2 = s2 + 1;
      while (e2 < l2 && d[e2].trim()) {
        e2++;
      }
      return d.slice(s2, e2).join(" ").trim();
    }
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/typos.json
var require_typos = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/typos.json"(exports, module) {
    module.exports = {
      topLevel: {
        dependancies: "dependencies",
        dependecies: "dependencies",
        depdenencies: "dependencies",
        devEependencies: "devDependencies",
        depends: "dependencies",
        "dev-dependencies": "devDependencies",
        devDependences: "devDependencies",
        devDepenencies: "devDependencies",
        devdependencies: "devDependencies",
        repostitory: "repository",
        repo: "repository",
        prefereGlobal: "preferGlobal",
        hompage: "homepage",
        hampage: "homepage",
        autohr: "author",
        autor: "author",
        contributers: "contributors",
        publicationConfig: "publishConfig",
        script: "scripts"
      },
      bugs: { web: "url", name: "url" },
      script: { server: "start", tests: "test" }
    };
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/fixer.js
var require_fixer = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/fixer.js"(exports, module) {
    var isValidSemver = require_valid();
    var cleanSemver = require_clean();
    var validateLicense = require_validate_npm_package_license();
    var hostedGitInfo = require_lib5();
    var moduleBuiltin = __require("node:module");
    var depTypes = ["dependencies", "devDependencies", "optionalDependencies"];
    var extractDescription = require_extract_description();
    var url = __require("url");
    var typos = require_typos();
    var isEmail = (str) => str.includes("@") && str.indexOf("@") < str.lastIndexOf(".");
    module.exports = {
      // default warning function
      warn: function() {
      },
      fixRepositoryField: function(data) {
        if (data.repositories) {
          this.warn("repositories");
          data.repository = data.repositories[0];
        }
        if (!data.repository) {
          return this.warn("missingRepository");
        }
        if (typeof data.repository === "string") {
          data.repository = {
            type: "git",
            url: data.repository
          };
        }
        var r2 = data.repository.url || "";
        if (r2) {
          var hosted = hostedGitInfo.fromUrl(r2);
          if (hosted) {
            r2 = data.repository.url = hosted.getDefaultRepresentation() === "shortcut" ? hosted.https() : hosted.toString();
          }
        }
        if (r2.match(/github.com\/[^/]+\/[^/]+\.git\.git$/)) {
          this.warn("brokenGitUrl", r2);
        }
      },
      fixTypos: function(data) {
        Object.keys(typos.topLevel).forEach(function(d) {
          if (Object.prototype.hasOwnProperty.call(data, d)) {
            this.warn("typo", d, typos.topLevel[d]);
          }
        }, this);
      },
      fixScriptsField: function(data) {
        if (!data.scripts) {
          return;
        }
        if (typeof data.scripts !== "object") {
          this.warn("nonObjectScripts");
          delete data.scripts;
          return;
        }
        Object.keys(data.scripts).forEach(function(k2) {
          if (typeof data.scripts[k2] !== "string") {
            this.warn("nonStringScript");
            delete data.scripts[k2];
          } else if (typos.script[k2] && !data.scripts[typos.script[k2]]) {
            this.warn("typo", k2, typos.script[k2], "scripts");
          }
        }, this);
      },
      fixFilesField: function(data) {
        var files = data.files;
        if (files && !Array.isArray(files)) {
          this.warn("nonArrayFiles");
          delete data.files;
        } else if (data.files) {
          data.files = data.files.filter(function(file) {
            if (!file || typeof file !== "string") {
              this.warn("invalidFilename", file);
              return false;
            } else {
              return true;
            }
          }, this);
        }
      },
      fixBinField: function(data) {
        if (!data.bin) {
          return;
        }
        if (typeof data.bin === "string") {
          var b = {};
          var match;
          if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
            b[match[1]] = data.bin;
          } else {
            b[data.name] = data.bin;
          }
          data.bin = b;
        }
      },
      fixManField: function(data) {
        if (!data.man) {
          return;
        }
        if (typeof data.man === "string") {
          data.man = [data.man];
        }
      },
      fixBundleDependenciesField: function(data) {
        var bdd = "bundledDependencies";
        var bd = "bundleDependencies";
        if (data[bdd] && !data[bd]) {
          data[bd] = data[bdd];
          delete data[bdd];
        }
        if (data[bd] && !Array.isArray(data[bd])) {
          this.warn("nonArrayBundleDependencies");
          delete data[bd];
        } else if (data[bd]) {
          data[bd] = data[bd].filter(function(filtered) {
            if (!filtered || typeof filtered !== "string") {
              this.warn("nonStringBundleDependency", filtered);
              return false;
            } else {
              if (!data.dependencies) {
                data.dependencies = {};
              }
              if (!Object.prototype.hasOwnProperty.call(data.dependencies, filtered)) {
                this.warn("nonDependencyBundleDependency", filtered);
                data.dependencies[filtered] = "*";
              }
              return true;
            }
          }, this);
        }
      },
      fixDependencies: function(data) {
        objectifyDeps(data, this.warn);
        addOptionalDepsToDeps(data, this.warn);
        this.fixBundleDependenciesField(data);
        ["dependencies", "devDependencies"].forEach(function(deps) {
          if (!(deps in data)) {
            return;
          }
          if (!data[deps] || typeof data[deps] !== "object") {
            this.warn("nonObjectDependencies", deps);
            delete data[deps];
            return;
          }
          Object.keys(data[deps]).forEach(function(d) {
            var r2 = data[deps][d];
            if (typeof r2 !== "string") {
              this.warn("nonStringDependency", d, JSON.stringify(r2));
              delete data[deps][d];
            }
            var hosted = hostedGitInfo.fromUrl(data[deps][d]);
            if (hosted) {
              data[deps][d] = hosted.toString();
            }
          }, this);
        }, this);
      },
      fixModulesField: function(data) {
        if (data.modules) {
          this.warn("deprecatedModules");
          delete data.modules;
        }
      },
      fixKeywordsField: function(data) {
        if (typeof data.keywords === "string") {
          data.keywords = data.keywords.split(/,\s+/);
        }
        if (data.keywords && !Array.isArray(data.keywords)) {
          delete data.keywords;
          this.warn("nonArrayKeywords");
        } else if (data.keywords) {
          data.keywords = data.keywords.filter(function(kw) {
            if (typeof kw !== "string" || !kw) {
              this.warn("nonStringKeyword");
              return false;
            } else {
              return true;
            }
          }, this);
        }
      },
      fixVersionField: function(data, strict) {
        var loose = !strict;
        if (!data.version) {
          data.version = "";
          return true;
        }
        if (!isValidSemver(data.version, loose)) {
          throw new Error('Invalid version: "' + data.version + '"');
        }
        data.version = cleanSemver(data.version, loose);
        return true;
      },
      fixPeople: function(data) {
        modifyPeople(data, unParsePerson);
        modifyPeople(data, parsePerson);
      },
      fixNameField: function(data, options) {
        if (typeof options === "boolean") {
          options = { strict: options };
        } else if (typeof options === "undefined") {
          options = {};
        }
        var strict = options.strict;
        if (!data.name && !strict) {
          data.name = "";
          return;
        }
        if (typeof data.name !== "string") {
          throw new Error("name field must be a string.");
        }
        if (!strict) {
          data.name = data.name.trim();
        }
        ensureValidName(data.name, strict, options.allowLegacyCase);
        if (moduleBuiltin.builtinModules.includes(data.name)) {
          this.warn("conflictingName", data.name);
        }
      },
      fixDescriptionField: function(data) {
        if (data.description && typeof data.description !== "string") {
          this.warn("nonStringDescription");
          delete data.description;
        }
        if (data.readme && !data.description) {
          data.description = extractDescription(data.readme);
        }
        if (data.description === void 0) {
          delete data.description;
        }
        if (!data.description) {
          this.warn("missingDescription");
        }
      },
      fixReadmeField: function(data) {
        if (!data.readme) {
          this.warn("missingReadme");
          data.readme = "ERROR: No README data found!";
        }
      },
      fixBugsField: function(data) {
        if (!data.bugs && data.repository && data.repository.url) {
          var hosted = hostedGitInfo.fromUrl(data.repository.url);
          if (hosted && hosted.bugs()) {
            data.bugs = { url: hosted.bugs() };
          }
        } else if (data.bugs) {
          if (typeof data.bugs === "string") {
            if (isEmail(data.bugs)) {
              data.bugs = { email: data.bugs };
            } else if (url.parse(data.bugs).protocol) {
              data.bugs = { url: data.bugs };
            } else {
              this.warn("nonEmailUrlBugsString");
            }
          } else {
            bugsTypos(data.bugs, this.warn);
            var oldBugs = data.bugs;
            data.bugs = {};
            if (oldBugs.url) {
              if (typeof oldBugs.url === "string" && url.parse(oldBugs.url).protocol) {
                data.bugs.url = oldBugs.url;
              } else {
                this.warn("nonUrlBugsUrlField");
              }
            }
            if (oldBugs.email) {
              if (typeof oldBugs.email === "string" && isEmail(oldBugs.email)) {
                data.bugs.email = oldBugs.email;
              } else {
                this.warn("nonEmailBugsEmailField");
              }
            }
          }
          if (!data.bugs.email && !data.bugs.url) {
            delete data.bugs;
            this.warn("emptyNormalizedBugs");
          }
        }
      },
      fixHomepageField: function(data) {
        if (!data.homepage && data.repository && data.repository.url) {
          var hosted = hostedGitInfo.fromUrl(data.repository.url);
          if (hosted && hosted.docs()) {
            data.homepage = hosted.docs();
          }
        }
        if (!data.homepage) {
          return;
        }
        if (typeof data.homepage !== "string") {
          this.warn("nonUrlHomepage");
          return delete data.homepage;
        }
        if (!url.parse(data.homepage).protocol) {
          data.homepage = "http://" + data.homepage;
        }
      },
      fixLicenseField: function(data) {
        const license = data.license || data.licence;
        if (!license) {
          return this.warn("missingLicense");
        }
        if (typeof license !== "string" || license.length < 1 || license.trim() === "") {
          return this.warn("invalidLicense");
        }
        if (!validateLicense(license).validForNewPackages) {
          return this.warn("invalidLicense");
        }
      }
    };
    function isValidScopedPackageName(spec) {
      if (spec.charAt(0) !== "@") {
        return false;
      }
      var rest = spec.slice(1).split("/");
      if (rest.length !== 2) {
        return false;
      }
      return rest[0] && rest[1] && rest[0] === encodeURIComponent(rest[0]) && rest[1] === encodeURIComponent(rest[1]);
    }
    function isCorrectlyEncodedName(spec) {
      return !spec.match(/[/@\s+%:]/) && spec === encodeURIComponent(spec);
    }
    function ensureValidName(name, strict, allowLegacyCase) {
      if (name.charAt(0) === "." || !(isValidScopedPackageName(name) || isCorrectlyEncodedName(name)) || strict && !allowLegacyCase && name !== name.toLowerCase() || name.toLowerCase() === "node_modules" || name.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name));
      }
    }
    function modifyPeople(data, fn2) {
      if (data.author) {
        data.author = fn2(data.author);
      }
      ["maintainers", "contributors"].forEach(function(set) {
        if (!Array.isArray(data[set])) {
          return;
        }
        data[set] = data[set].map(fn2);
      });
      return data;
    }
    function unParsePerson(person) {
      if (typeof person === "string") {
        return person;
      }
      var name = person.name || "";
      var u = person.url || person.web;
      var wrappedUrl = u ? " (" + u + ")" : "";
      var e2 = person.email || person.mail;
      var wrappedEmail = e2 ? " <" + e2 + ">" : "";
      return name + wrappedEmail + wrappedUrl;
    }
    function parsePerson(person) {
      if (typeof person !== "string") {
        return person;
      }
      var matchedName = person.match(/^([^(<]+)/);
      var matchedUrl = person.match(/\(([^()]+)\)/);
      var matchedEmail = person.match(/<([^<>]+)>/);
      var obj = {};
      if (matchedName && matchedName[0].trim()) {
        obj.name = matchedName[0].trim();
      }
      if (matchedEmail) {
        obj.email = matchedEmail[1];
      }
      if (matchedUrl) {
        obj.url = matchedUrl[1];
      }
      return obj;
    }
    function addOptionalDepsToDeps(data) {
      var o2 = data.optionalDependencies;
      if (!o2) {
        return;
      }
      var d = data.dependencies || {};
      Object.keys(o2).forEach(function(k2) {
        d[k2] = o2[k2];
      });
      data.dependencies = d;
    }
    function depObjectify(deps, type2, warn2) {
      if (!deps) {
        return {};
      }
      if (typeof deps === "string") {
        deps = deps.trim().split(/[\n\r\s\t ,]+/);
      }
      if (!Array.isArray(deps)) {
        return deps;
      }
      warn2("deprecatedArrayDependencies", type2);
      var o2 = {};
      deps.filter(function(d) {
        return typeof d === "string";
      }).forEach(function(d) {
        d = d.trim().split(/(:?[@\s><=])/);
        var dn2 = d.shift();
        var dv = d.join("");
        dv = dv.trim();
        dv = dv.replace(/^@/, "");
        o2[dn2] = dv;
      });
      return o2;
    }
    function objectifyDeps(data, warn2) {
      depTypes.forEach(function(type2) {
        if (!data[type2]) {
          return;
        }
        data[type2] = depObjectify(data[type2], type2, warn2);
      });
    }
    function bugsTypos(bugs, warn2) {
      if (!bugs) {
        return;
      }
      Object.keys(bugs).forEach(function(k2) {
        if (typos.bugs[k2]) {
          warn2("typo", k2, typos.bugs[k2], "bugs");
          bugs[typos.bugs[k2]] = bugs[k2];
          delete bugs[k2];
        }
      });
    }
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/warning_messages.json
var require_warning_messages = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/warning_messages.json"(exports, module) {
    module.exports = {
      repositories: "'repositories' (plural) Not supported. Please pick one as the 'repository' field",
      missingRepository: "No repository field.",
      brokenGitUrl: "Probably broken git url: %s",
      nonObjectScripts: "scripts must be an object",
      nonStringScript: "script values must be string commands",
      nonArrayFiles: "Invalid 'files' member",
      invalidFilename: "Invalid filename in 'files' list: %s",
      nonArrayBundleDependencies: "Invalid 'bundleDependencies' list. Must be array of package names",
      nonStringBundleDependency: "Invalid bundleDependencies member: %s",
      nonDependencyBundleDependency: "Non-dependency in bundleDependencies: %s",
      nonObjectDependencies: "%s field must be an object",
      nonStringDependency: "Invalid dependency: %s %s",
      deprecatedArrayDependencies: "specifying %s as array is deprecated",
      deprecatedModules: "modules field is deprecated",
      nonArrayKeywords: "keywords should be an array of strings",
      nonStringKeyword: "keywords should be an array of strings",
      conflictingName: "%s is also the name of a node core module.",
      nonStringDescription: "'description' field should be a string",
      missingDescription: "No description",
      missingReadme: "No README data",
      missingLicense: "No license field.",
      nonEmailUrlBugsString: "Bug string field must be url, email, or {email,url}",
      nonUrlBugsUrlField: "bugs.url field must be a string url. Deleted.",
      nonEmailBugsEmailField: "bugs.email field must be a string email. Deleted.",
      emptyNormalizedBugs: "Normalized value of bugs field is an empty object. Deleted.",
      nonUrlHomepage: "homepage field must be a string url. Deleted.",
      invalidLicense: "license should be a valid SPDX license expression",
      typo: "%s should probably be %s."
    };
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/make_warning.js
var require_make_warning = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/make_warning.js"(exports, module) {
    var util = __require("util");
    var messages2 = require_warning_messages();
    module.exports = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      var warningName = args.shift();
      if (warningName === "typo") {
        return makeTypoWarning.apply(null, args);
      } else {
        var msgTemplate = messages2[warningName] ? messages2[warningName] : warningName + ": '%s'";
        args.unshift(msgTemplate);
        return util.format.apply(null, args);
      }
    };
    function makeTypoWarning(providedName, probableName, field) {
      if (field) {
        providedName = field + "['" + providedName + "']";
        probableName = field + "['" + probableName + "']";
      }
      return util.format(messages2.typo, providedName, probableName);
    }
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/normalize.js
var require_normalize = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/normalize.js"(exports, module) {
    module.exports = normalize2;
    var fixer = require_fixer();
    normalize2.fixer = fixer;
    var makeWarning = require_make_warning();
    var fieldsToFix = [
      "name",
      "version",
      "description",
      "repository",
      "modules",
      "scripts",
      "files",
      "bin",
      "man",
      "bugs",
      "keywords",
      "readme",
      "homepage",
      "license"
    ];
    var otherThingsToFix = ["dependencies", "people", "typos"];
    var thingsToFix = fieldsToFix.map(function(fieldName) {
      return ucFirst(fieldName) + "Field";
    });
    thingsToFix = thingsToFix.concat(otherThingsToFix);
    function normalize2(data, warn2, strict) {
      if (warn2 === true) {
        warn2 = null;
        strict = true;
      }
      if (!strict) {
        strict = false;
      }
      if (!warn2 || data.private) {
        warn2 = function() {
        };
      }
      if (data.scripts && data.scripts.install === "node-gyp rebuild" && !data.scripts.preinstall) {
        data.gypfile = true;
      }
      fixer.warn = function() {
        warn2(makeWarning.apply(null, arguments));
      };
      thingsToFix.forEach(function(thingName) {
        fixer["fix" + ucFirst(thingName)](data, strict);
      });
      data._id = data.name + "@" + data.version;
    }
    function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
});

// node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.4.7",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js"(exports, module) {
    var fs2 = __require("fs");
    var path5 = __require("path");
    var os2 = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse11(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys2 = _dotenvKey(options).split(",");
      const length = keys2.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys2[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error2) {
          if (i + 1 >= length) {
            throw error2;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error2) {
        if (error2.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error2;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path5.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path5.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path5.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path6 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path6, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e2) {
          if (debug) {
            _debug(`Failed to load ${path6} ${e2.message}`);
          }
          lastError = e2;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error2) {
        const isRange = error2 instanceof RangeError;
        const invalidKeyLength = error2.message === "Invalid key length";
        const decryptionFailed = error2.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error2;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse: parse11,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// packages/glue/dist/index.mjs
var g = function(...r2) {
  return typeof r2[0] == "string" ? r2.join("") : r2[0].join("");
};
g.join = function(n, ...r2) {
  return arguments.length === 1 ? (...t2) => typeof t2[0] == "string" ? t2.join(n) : t2[0].join(n) : typeof r2[0] == "string" ? r2.join(n) : r2[0].join(n);
};
g.ws = (...n) => typeof n[0] == "string" ? n.join(" ") : n[0].join(" ");
g.nl = (...n) => typeof n[0] == "string" ? n.join(`
`) : n[0].join(`
`);
var yr = Object.create;
var Ne = Object.defineProperty;
var wr = Object.getOwnPropertyDescriptor;
var $r = Object.getOwnPropertyNames;
var Tr = Object.getPrototypeOf;
var kr = Object.prototype.hasOwnProperty;
var Sr = (e2, t2) => () => (t2 || e2((t2 = { exports: {} }).exports, t2), t2.exports);
var vr = (e2, t2) => {
  for (var r2 in t2) Ne(e2, r2, { get: t2[r2], enumerable: true });
};
var Or = (e2, t2, r2, n) => {
  if (t2 && typeof t2 == "object" || typeof t2 == "function") for (let u of $r(t2)) !kr.call(e2, u) && u !== r2 && Ne(e2, u, { get: () => t2[u], enumerable: !(n = wr(t2, u)) || n.enumerable });
  return e2;
};
var Ir = (e2, t2, r2) => (r2 = e2 != null ? yr(Tr(e2)) : {}, Or(Ne(r2, "default", { value: e2, enumerable: true }) , e2));
var Tt = Sr(($t, Ue) => {
  Object.defineProperty($t, "__esModule", { value: true });
  var { round: _, max: Pr } = Math, Bt = (e2) => {
    let [, t2] = /([a-f\d]{3,6})/i.exec(e2) || [], r2 = t2 ? t2.length : 0;
    if (r2 === 3) t2 = t2[0] + t2[0] + t2[1] + t2[1] + t2[2] + t2[2];
    else if (6 ^ r2) return [0, 0, 0];
    let n = parseInt(t2, 16);
    return [n >> 16 & 255, n >> 8 & 255, 255 & n];
  }, At = (e2, t2, r2) => e2 === t2 && t2 === r2 ? e2 < 8 ? 16 : e2 > 248 ? 231 : _((e2 - 8) / 247 * 24) + 232 : 16 + 36 * _(e2 / 51) + 6 * _(t2 / 51) + _(r2 / 51), Me = (e2) => {
    let t2, r2, n, u, i;
    return e2 < 8 ? 30 + e2 : e2 < 16 ? e2 - 8 + 90 : (e2 >= 232 ? t2 = r2 = n = (10 * (e2 - 232) + 8) / 255 : (i = (e2 -= 16) % 36, t2 = (e2 / 36 | 0) / 5, r2 = (i / 6 | 0) / 5, n = i % 6 / 5), u = 2 * Pr(t2, r2, n), u ? 30 + (_(n) << 2 | _(r2) << 1 | _(t2)) + (2 ^ u ? 0 : 60) : 30);
  }, We = (() => {
    var _a14, _b12;
    let e2 = (C2) => i.some((m2) => C2.test(m2)), t2 = globalThis, r2 = t2.Deno, n = !!r2, u = t2.process || r2 || {}, i = u.argv || u.args || [], s2 = u.env || {}, D = -1;
    if (n) try {
      s2 = s2.toObject();
    } catch {
      D = 0;
    }
    let o2 = !!s2.PM2_HOME && !!s2.pm_id || ((_a14 = s2.NEXT_RUNTIME) == null ? void 0 : _a14.includes("edge")) || (n ? r2.isatty(1) : !!((_b12 = u.stdout) == null ? void 0 : _b12.isTTY)), h = "FORCE_COLOR", f = s2[h], c = parseInt(f), p = isNaN(c) ? f === "false" ? 0 : -1 : c, d = h in s2 && p || e2(/^-{1,2}color=?(true|always)?$/);
    return d && (D = p), D < 0 && (D = ((C2, m2, $2) => {
      let { TERM: b, COLORTERM: pe } = C2;
      return pe === "truecolor" || pe === "24bit" ? 3 : pe === "ansi256" ? 2 : pe === "ansi" || C2.TF_BUILD ? 1 : C2.TEAMCITY_VERSION ? 2 : C2.CI ? ["GITHUB_ACTIONS", "GITEA_ACTIONS"].some((xr) => xr in C2) ? 3 : 1 : !m2 || /-mono|dumb/i.test(b) ? 0 : $2 || /^xterm-(kitty|direct)$/i.test(b) ? 3 : /-256(colou?r)?$/i.test(b) ? 2 : /^(screen|tmux|xterm|vt[1-5][0-9]([0-9])?|ansi)|color|cygwin|linux|mintty|rxvt/i.test(b) ? 1 : 3;
    })(s2, o2, (n ? r2.build.os : u.platform) === "win32")), !p || s2.NO_COLOR || e2(/^-{1,2}(no-color|color=(false|never))$/) ? 0 : d && !D ? 3 : D;
  })(), bt = We > 0, j = "", xt = { open: j, close: j }, B = bt ? (e2, t2) => ({ open: `\x1B[${e2}m`, close: `\x1B[${t2}m` }) : () => xt, M = 39, W = 49, ft = (e2, t2) => (r2, n, u) => B(((i, s2, D) => Me(At(i, s2, D)))(r2, n, u) + e2, t2), gt = (e2) => (t2, r2, n) => e2(At(t2, r2, n)), dt = (e2) => (t2) => e2(...Bt(t2)), X = (e2, t2, r2) => B(`38;2;${e2};${t2};${r2}`, M), fe = (e2, t2, r2) => B(`48;2;${e2};${t2};${r2}`, W), ge = (e2) => B(`38;5;${e2}`, M), de = (e2) => B(`48;5;${e2}`, W);
  We === 2 ? (X = gt(ge), fe = gt(de)) : We === 1 && (X = ft(0, M), fe = ft(10, W), ge = (e2) => B(Me(e2), M), de = (e2) => B(Me(e2) + 10, W));
  var _e3, T = { ansi256: ge, bgAnsi256: de, fg: ge, bg: de, rgb: X, bgRgb: fe, hex: dt(X), bgHex: dt(fe), visible: xt, reset: B(0, 0), bold: B(1, 22), dim: B(2, 22), italic: B(3, 23), underline: B(4, 24), inverse: B(7, 27), hidden: B(8, 28) }, Ct = "Bright", he = 30;
  "black,red,green,yellow,blue,magenta,cyan,white".split(",").map((e2) => {
    _e3 = "bg" + e2[0].toUpperCase() + e2.slice(1), T[e2] = B(he, M), T[e2 + Ct] = B(60 + he, M), T[_e3] = B(he + 10, W), T[_e3 + Ct] = B(70 + he++, W);
  }), T.grey = T.gray = B(90, M), T.bgGrey = T.bgGray = B(100, W), T.strikethrough = T.strike = B(9, 29);
  var Ge, { create: Rr, defineProperty: Lr, setPrototypeOf: yt } = Object, Et = {}, mt = ({ _p: e2 }, { open: t2, close: r2 }) => {
    let n = (s2, ...D) => {
      if (!s2) {
        if (t2 && t2 === r2) return t2;
        if (s2 == null || j === s2) return j;
      }
      let o2 = s2.raw ? String.raw(s2, ...D) : j + s2, h = n._p, { _a: f, _b: c } = h;
      if (o2.includes("\x1B")) for (; h; ) {
        let p, d = h.close, C2 = h.open, m2 = d.length, $2 = j, b = 0;
        if (m2) {
          for (; ~(p = o2.indexOf(d, b)); b = p + m2) $2 += o2.slice(b, p) + C2;
          o2 = $2 + o2.slice(b);
        }
        h = h._p;
      }
      return o2.includes(`
`) && (o2 = o2.replace(/(\r?\n)/g, c + "$1" + f)), f + o2 + c;
    }, u = t2, i = r2;
    return e2 && (u = e2._a + t2, i = r2 + e2._b), yt(n, Ge), n._p = { open: t2, close: r2, _a: u, _b: i, _p: e2 }, n.open = u, n.close = i, n;
  }, wt = function() {
    let e2 = { isSupported: () => bt, strip: (t2) => t2.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, j), extend(t2) {
      for (let r2 in t2) {
        let n = t2[r2], u = (typeof n)[0], i = u === "s" ? X(...Bt(n)) : n;
        Et[r2] = u === "f" ? { get() {
          return (...s2) => mt(this, n(...s2));
        } } : { get() {
          let s2 = mt(this, i);
          return Lr(this, r2, { value: s2 }), s2;
        } };
      }
      return Ge = Rr({}, Et), yt(e2, Ge), e2;
    } };
    return e2.extend(T);
  }, je = new wt();
  Ue.exports = je, Ue.exports.Ansis = wt, je.default = je;
});
var v = Ir(Tt());
var { ansi256: ru, fg: nu, bgAnsi256: uu, bg: iu, rgb: su, bgRgb: Du, hex: ou, bgHex: lu, reset: au, inverse: Fu, hidden: cu, visible: pu, bold: He, dim: hu, italic: fu, underline: gu, strikethrough: du, strike: Cu, black: Eu, red: mu, green: Bu, yellow: Au, blue: bu, magenta: xu, cyan: yu, white: wu, grey: $u, gray: Tu, blackBright: ku, redBright: Su, greenBright: vu, yellowBright: Ou, blueBright: Iu, magentaBright: Pu, cyanBright: Ru, whiteBright: Lu, bgBlack: Nu, bgRed: _u, bgGreen: ju, bgYellow: Mu, bgBlue: Wu, bgMagenta: Gu, bgCyan: Uu, bgWhite: Hu, bgGrey: zu, bgGray: Vu, bgBlackBright: Yu, bgRedBright: qu, bgGreenBright: Ku, bgYellowBright: Ju, bgBlueBright: Zu, bgMagentaBright: Xu, bgCyanBright: Qu, bgWhiteBright: ei } = v.default;
var ui = "\x1B[H\x1B[2J";
v.default.extend({ brown: "#c19a6b", pink: "#ff75d1", teal: "#91EBC2", lightGray: "#2a2a2e", midGray: "#2a2929", orange: "#FFAB40", lavender: "#BECAFF", neonTeal: "#03E4DC", neonGreen: "#56ef83", neonCyan: "#69d5fd", neonRouge: "#FF8095", neonMagenta: "#7b68ee" });
var { cyan: si, red: w, green: Di, yellow: x, magenta: oi, blue: li, white: ze, gray: a, dim: ai, cyanBright: Fi, redBright: k, greenBright: ci, yellowBright: P, magentaBright: pi, blueBright: hi, whiteBright: Y, strip: q, underline: Ce, bold: y, reset: Ee, strikethrough: fi, lightGray: F, midGray: gi, pink: kt, brown: di, teal: Ci, orange: Ei, lavender: mi, neonGreen: Q, neonCyan: Bi, neonRouge: St, neonMagenta: me, neonTeal: Ai } = v.default;
`${He.open + x.open}!${x.close + He.close}`;
`${a.open}\u1D20${a.close}`;
`${a.open}|${a.close}`;
var ki = `${a.open}#${a.close}`;
`${a.open}+${a.close}`;
`${a.open}\xB5${a.close}`;
`${a.open}-${a.close}`;
`${a.open},${a.close}`;
var Pi = `${Q.open}\u2713${Q.close}`;
var vt = `${k.open}\u2715${k.close}`;
var R = `${a.open}:${a.close}`;
var K = `${a.open}\u2794${a.close}`;
var Ot = `${a.open}\xBB${a.close}`;
var Ri = `${a.open}\u27A4${a.close}`;
var Li = `${a.open}\u2942${a.close}`;
var Be = `${a.open}~${a.close}`;
var It = `${a.open}\u2014${a.close}`;
var Pt = `${a.open}(${a.close}`;
var Rt = `${a.open})${a.close}`;
var Lt = `${a.open}{${a.close}`;
var Nt = `${a.open}}${a.close}`;
var _t = `${a.open}[${a.close}`;
var jt = `${a.open}]${a.close}`;
var Mt = `${a.open}<${a.close}`;
var Wt = `${a.open}>${a.close}`;
function Ae(e2) {
  return Buffer.isBuffer(e2) ? e2.toString() : Array.isArray(e2) || typeof e2 == "object" ? JSON.stringify(e2) : typeof e2 == "boolean" || typeof e2 == "number" ? `${e2}` : typeof e2 == "string" ? e2 : String(e2);
}
function Gt(e2, t2 = null) {
  let r2 = 0;
  if (Array.isArray(e2)) for (let n of e2) t2 ? n[t2].length > r2 && (r2 = n[t2].length) : n.length > r2 && (r2 = n.length);
  else for (let n in e2) n.length > r2 && (r2 = n.length);
  return r2 = r2 + 1, function(u) {
    let i = typeof u == "string" ? r2 - u.length : r2 - u;
    return i < 1 ? " " : " ".repeat(i);
  };
}
function Ve() {
  let e2 = /* @__PURE__ */ new Date(), t2 = e2.getHours(), r2 = e2.getMinutes(), n = e2.getSeconds();
  return (t2 < 10 ? `0${t2}` : t2) + R + (r2 < 10 ? `0${r2}` : r2) + R + (n < 10 ? `0${n}` : n);
}
function ee(e2, { onlyFirst: t2 = false } = {}) {
  let r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"], n = e2.match(new RegExp(r2.join("|"), t2 ? void 0 : "g"));
  return n !== null ? n : false;
}
var be = " ";
var Mi = "  ";
var Ye = `
`;
var Wi = `

`;
var xe = "";
function ye(e2, t2, r2) {
  return node_child_process.execFileSync(e2, t2, { encoding: "utf8", shell: r2, stdio: ["ignore", "pipe", "ignore"] }).trim();
}
function Ht(e2, t2) {
  let r2 = path2.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('syncify.js', document.baseURI).href))));
  return ye(path2.join(r2, e2), [], t2).split(/\r?\n/);
}
function L(e2, t2) {
  let r2 = Number.parseInt(e2, 10);
  return { wrap: r2 > 85 ? 85 : r2, cols: Number.parseInt(e2, 10), rows: Number.parseInt(t2, 10) };
}
function ue() {
  if (process2.stdout && process2.stdout.columns && process2.stdout.rows) return L(process2.stdout.columns, process2.stdout.rows);
  if (process2.stderr && process2.stderr.columns && process2.stderr.rows) return L(process2.stderr.columns, process2.stderr.rows);
  if (process2.env.COLUMNS && process2.env.LINES) return L(process2.env.COLUMNS, process2.env.LINES);
  if (process2.platform === "win32") try {
    let e2 = Ht("vendor/windows/term-size.exe", false);
    if (e2.length === 2) return L(e2[0], e2[1]);
  } catch {
  }
  else {
    if (process2.platform === "darwin") try {
      let e2 = Ht("vendor/macos/term-size", true);
      if (e2.length === 2) return L(e2[0], e2[1]);
    } catch {
    }
    try {
      let e2 = ye("resize", ["-u"]).match(/\d+/g);
      if (e2.length === 2) return L(e2[0], e2[1]);
    } catch {
    }
    if (process2.env.TERM) try {
      let e2 = ye("tput", ["cols"]), t2 = ye("tput", ["lines"]);
      if (e2 && t2) return L(e2, t2);
    } catch {
    }
  }
  return L(80, 24);
}
var l = { open: `${F.open}\u250C\u2500${F.close} `, stub: `${F.open}\u251C${F.close}  `, dash: `${F.open}\u251C\u2500${F.close} `, trim: `${F.open}\u2502${F.close}`, line: `${F.open}\u2502${F.close}  `, next: `
${F.open}\u2502${F.close}`, newline: `
${F.open}\u2502${F.close}
${F.open}\u2502${F.close}  `, after: `${F.open}\u2502${F.close}
`, wrap: `
${F.open}\u2502${F.close}
`, base: `${F.open}\u2514\u2500${F.close} `, red: `${w.dim.open}\u2502${w.dim.close}  `, redTrim: `${w.dim.open}\u2502${w.dim.close}`, redDash: `${w.dim.open}\u251C\u2500${w.dim.close} `, redStub: `${w.dim.open}\u251C${w.dim.close} `, yellow: `${x.dim.open}\u2502${x.dim.close}  `, yellowTrim: `${x.dim.open}\u2502${x.dim.close}`, yellowDash: `${x.dim.open}\u251C\u2500${x.dim.close} `, yellowStub: `${x.dim.open}\u251C${x.dim.close} `, indent: { edge: `${F.open}\u251C\u2500\u2500\u252C\u2500${F.close} `, fall: `${F.open}\u251C\u2500\u2500\u2510${F.close} `, line: `${F.open}\u2502  \u2502${F.close} `, stub: `${F.open}\u2502  \u251C${F.close} `, dash: `${F.open}\u2502  \u251C\u2500${F.close} `, base: `${F.open}\u2502  \u2514\u2500${F.close} ` } };
var oe = {};
vr(oe, { beep: () => pn, clearScreen: () => ln, clearTerminal: () => an, cursorBackward: () => Yr, cursorDown: () => zr, cursorForward: () => Vr, cursorGetPosition: () => Jr, cursorHide: () => Qr, cursorLeft: () => Yt, cursorMove: () => Hr, cursorNextLine: () => Zr, cursorPrevLine: () => Xr, cursorRestorePosition: () => Kr, cursorSavePosition: () => qr, cursorShow: () => en, cursorTo: () => Ur, cursorUp: () => Vt, enterAlternativeScreen: () => Fn, eraseDown: () => un, eraseEndLine: () => rn, eraseLine: () => qt, eraseLines: () => tn, eraseScreen: () => qe, eraseStartLine: () => nn, eraseUp: () => sn, exitAlternativeScreen: () => cn, iTerm: () => gn, image: () => fn, link: () => hn, scrollDown: () => on, scrollUp: () => Dn });
var _a;
var we = ((_a = globalThis.window) == null ? void 0 : _a.document) !== void 0;
var _a2, _b;
((_b = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b.node) !== void 0;
var _a3, _b2;
((_b2 = (_a3 = globalThis.process) == null ? void 0 : _a3.versions) == null ? void 0 : _b2.bun) !== void 0;
var _a4, _b3;
((_b3 = (_a4 = globalThis.Deno) == null ? void 0 : _a4.version) == null ? void 0 : _b3.deno) !== void 0;
var _a5, _b4;
((_b4 = (_a5 = globalThis.process) == null ? void 0 : _a5.versions) == null ? void 0 : _b4.electron) !== void 0;
var _a6, _b5;
((_b5 = (_a6 = globalThis.navigator) == null ? void 0 : _a6.userAgent) == null ? void 0 : _b5.includes("jsdom")) === true;
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
typeof DedicatedWorkerGlobalScope < "u" && globalThis instanceof DedicatedWorkerGlobalScope;
typeof SharedWorkerGlobalScope < "u" && globalThis instanceof SharedWorkerGlobalScope;
typeof ServiceWorkerGlobalScope < "u" && globalThis instanceof ServiceWorkerGlobalScope;
var _a7, _b6;
var ie = (_b6 = (_a7 = globalThis.navigator) == null ? void 0 : _a7.userAgentData) == null ? void 0 : _b6.platform;
var _a8, _b7, _c, _d;
ie === "macOS" || ((_a8 = globalThis.navigator) == null ? void 0 : _a8.platform) === "MacIntel" || ((_c = (_b7 = globalThis.navigator) == null ? void 0 : _b7.userAgent) == null ? void 0 : _c.includes(" Mac ")) === true || ((_d = globalThis.process) == null ? void 0 : _d.platform) === "darwin";
var _a9, _b8;
ie === "Windows" || ((_a9 = globalThis.navigator) == null ? void 0 : _a9.platform) === "Win32" || ((_b8 = globalThis.process) == null ? void 0 : _b8.platform) === "win32";
var _a10, _b9, _c2, _d2, _e;
ie === "Linux" || ((_b9 = (_a10 = globalThis.navigator) == null ? void 0 : _a10.platform) == null ? void 0 : _b9.startsWith("Linux")) === true || ((_d2 = (_c2 = globalThis.navigator) == null ? void 0 : _c2.userAgent) == null ? void 0 : _d2.includes(" Linux ")) === true || ((_e = globalThis.process) == null ? void 0 : _e.platform) === "linux";
var _a11, _b10, _c3;
ie === "iOS" || ((_a11 = globalThis.navigator) == null ? void 0 : _a11.platform) === "MacIntel" && ((_b10 = globalThis.navigator) == null ? void 0 : _b10.maxTouchPoints) > 1 || /iPad|iPhone|iPod/.test((_c3 = globalThis.navigator) == null ? void 0 : _c3.platform);
var _a12, _b11, _c4, _d3;
ie === "Android" || ((_a12 = globalThis.navigator) == null ? void 0 : _a12.platform) === "Android" || ((_c4 = (_b11 = globalThis.navigator) == null ? void 0 : _b11.userAgent) == null ? void 0 : _c4.includes(" Android ")) === true || ((_d3 = globalThis.process) == null ? void 0 : _d3.platform) === "android";
var g2 = "\x1B[";
var De = "\x1B]";
var J = "\x07";
var se = ";";
var zt = !we && process2__default.default.env.TERM_PROGRAM === "Apple_Terminal";
var Wr = !we && process2__default.default.platform === "win32";
var Gr = we ? () => {
  throw new Error("`process.cwd()` only works in Node.js, not the browser.");
} : process2__default.default.cwd;
var Ur = (e2, t2) => {
  if (typeof e2 != "number") throw new TypeError("The `x` argument is required");
  return typeof t2 != "number" ? g2 + (e2 + 1) + "G" : g2 + (t2 + 1) + se + (e2 + 1) + "H";
};
var Hr = (e2, t2) => {
  if (typeof e2 != "number") throw new TypeError("The `x` argument is required");
  let r2 = "";
  return e2 < 0 ? r2 += g2 + -e2 + "D" : e2 > 0 && (r2 += g2 + e2 + "C"), t2 < 0 ? r2 += g2 + -t2 + "A" : t2 > 0 && (r2 += g2 + t2 + "B"), r2;
};
var Vt = (e2 = 1) => g2 + e2 + "A";
var zr = (e2 = 1) => g2 + e2 + "B";
var Vr = (e2 = 1) => g2 + e2 + "C";
var Yr = (e2 = 1) => g2 + e2 + "D";
var Yt = g2 + "G";
var qr = zt ? "\x1B7" : g2 + "s";
var Kr = zt ? "\x1B8" : g2 + "u";
var Jr = g2 + "6n";
var Zr = g2 + "E";
var Xr = g2 + "F";
var Qr = g2 + "?25l";
var en = g2 + "?25h";
var tn = (e2) => {
  let t2 = "";
  for (let r2 = 0; r2 < e2; r2++) t2 += qt + (r2 < e2 - 1 ? Vt() : "");
  return e2 && (t2 += Yt), t2;
};
var rn = g2 + "K";
var nn = g2 + "1K";
var qt = g2 + "2K";
var un = g2 + "J";
var sn = g2 + "1J";
var qe = g2 + "2J";
var Dn = g2 + "S";
var on = g2 + "T";
var ln = "\x1Bc";
var an = Wr ? `${qe}${g2}0f` : `${qe}${g2}3J${g2}H`;
var Fn = g2 + "?1049h";
var cn = g2 + "?1049l";
var pn = J;
var hn = (e2, t2) => [De, "8", se, se, t2, J, e2, De, "8", se, se, J].join("");
var fn = (e2, t2 = {}) => {
  let r2 = `${De}1337;File=inline=1`;
  return t2.width && (r2 += `;width=${t2.width}`), t2.height && (r2 += `;height=${t2.height}`), t2.preserveAspectRatio === false && (r2 += ";preserveAspectRatio=0"), r2 + ":" + Buffer.from(e2).toString("base64") + J;
};
var gn = { setCwd: (e2 = Gr()) => `${De}50;CurrentDir=${e2}${J}`, annotation(e2, t2 = {}) {
  let r2 = `${De}1337;`, n = t2.x !== void 0, u = t2.y !== void 0;
  if ((n || u) && !(n && u && t2.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
  return e2 = e2.replaceAll("|", ""), r2 += t2.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", t2.length > 0 ? r2 += (n ? [e2, t2.length, t2.x, t2.y] : [t2.length, e2]).join("|") : r2 += e2, r2 + J;
} };
var dn = (e2, t2, r2, n) => {
  if (r2 === "length" || r2 === "prototype" || r2 === "arguments" || r2 === "caller") return;
  let u = Object.getOwnPropertyDescriptor(e2, r2), i = Object.getOwnPropertyDescriptor(t2, r2);
  !Cn(u, i) && n || Object.defineProperty(e2, r2, i);
};
var Cn = function(e2, t2) {
  return e2 === void 0 || e2.configurable || e2.writable === t2.writable && e2.enumerable === t2.enumerable && e2.configurable === t2.configurable && (e2.writable || e2.value === t2.value);
};
var En = (e2, t2) => {
  let r2 = Object.getPrototypeOf(t2);
  r2 !== Object.getPrototypeOf(e2) && Object.setPrototypeOf(e2, r2);
};
var mn = (e2, t2) => `/* Wrapped ${e2}*/
${t2}`;
var Bn = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var An = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var bn = (e2, t2, r2) => {
  let n = r2 === "" ? "" : `with ${r2.trim()}() `, u = mn.bind(null, n, t2.toString());
  Object.defineProperty(u, "name", An);
  let { writable: i, enumerable: s2, configurable: D } = Bn;
  Object.defineProperty(e2, "toString", { value: u, writable: i, enumerable: s2, configurable: D });
};
function Je(e2, t2, { ignoreNonConfigurable: r2 = false } = {}) {
  let { name: n } = e2;
  for (let u of Reflect.ownKeys(t2)) dn(e2, t2, u, r2);
  return En(e2, t2), bn(e2, t2, n), e2;
}
var $e = /* @__PURE__ */ new WeakMap();
var Kt = (e2, t2 = {}) => {
  if (typeof e2 != "function") throw new TypeError("Expected a function");
  let r2, n = 0, u = e2.displayName || e2.name || "<anonymous>", i = function(...s2) {
    if ($e.set(i, ++n), n === 1) r2 = e2.apply(this, s2), e2 = void 0;
    else if (t2.throw === true) throw new Error(`Function \`${u}\` can only be called once`);
    return r2;
  };
  return Je(i, e2), $e.set(i, n), i;
};
Kt.callCount = (e2) => {
  if (!$e.has(e2)) throw new Error(`The given function \`${e2.name}\` is not wrapped by the \`onetime\` package`);
  return $e.get(e2);
};
var Jt = Kt;
var G = [];
G.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && G.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
process.platform === "linux" && G.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
var Te = (e2) => !!e2 && typeof e2 == "object" && typeof e2.removeListener == "function" && typeof e2.emit == "function" && typeof e2.reallyExit == "function" && typeof e2.listeners == "function" && typeof e2.kill == "function" && typeof e2.pid == "number" && typeof e2.on == "function";
var Ze = Symbol.for("signal-exit emitter");
var Xe = globalThis;
var xn = Object.defineProperty.bind(Object);
var Qe = class {
  emitted = { afterExit: false, exit: false };
  listeners = { afterExit: [], exit: [] };
  count = 0;
  id = Math.random();
  constructor() {
    if (Xe[Ze]) return Xe[Ze];
    xn(Xe, Ze, { value: this, writable: false, enumerable: false, configurable: false });
  }
  on(t2, r2) {
    this.listeners[t2].push(r2);
  }
  removeListener(t2, r2) {
    let n = this.listeners[t2], u = n.indexOf(r2);
    u !== -1 && (u === 0 && n.length === 1 ? n.length = 0 : n.splice(u, 1));
  }
  emit(t2, r2, n) {
    if (this.emitted[t2]) return false;
    this.emitted[t2] = true;
    let u = false;
    for (let i of this.listeners[t2]) u = i(r2, n) === true || u;
    return t2 === "exit" && (u = this.emit("afterExit", r2, n) || u), u;
  }
};
var ke = class {
};
var yn = (e2) => ({ onExit(t2, r2) {
  return e2.onExit(t2, r2);
}, load() {
  return e2.load();
}, unload() {
  return e2.unload();
} });
var et = class extends ke {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var _s, _t2, _e2, _u2, _i, _n, _r2, _tt_instances, D_fn, o_fn, _a13;
var tt = (_a13 = class extends ke {
  constructor(t2) {
    super();
    __privateAdd(this, _tt_instances);
    __privateAdd(this, _s, rt.platform === "win32" ? "SIGINT" : "SIGHUP");
    __privateAdd(this, _t2, new Qe());
    __privateAdd(this, _e2);
    __privateAdd(this, _u2);
    __privateAdd(this, _i);
    __privateAdd(this, _n, {});
    __privateAdd(this, _r2, false);
    __privateSet(this, _e2, t2), __privateSet(this, _n, {});
    for (let r2 of G) __privateGet(this, _n)[r2] = () => {
      let n = __privateGet(this, _e2).listeners(r2), { count: u } = __privateGet(this, _t2), i = t2;
      if (typeof i.__signal_exit_emitter__ == "object" && typeof i.__signal_exit_emitter__.count == "number" && (u += i.__signal_exit_emitter__.count), n.length === u) {
        this.unload();
        let s2 = __privateGet(this, _t2).emit("exit", null, r2), D = r2 === "SIGHUP" ? __privateGet(this, _s) : r2;
        s2 || t2.kill(t2.pid, D);
      }
    };
    __privateSet(this, _i, t2.reallyExit), __privateSet(this, _u2, t2.emit);
  }
  onExit(t2, r2) {
    if (!Te(__privateGet(this, _e2))) return () => {
    };
    __privateGet(this, _r2) === false && this.load();
    let n = (r2 == null ? void 0 : r2.alwaysLast) ? "afterExit" : "exit";
    return __privateGet(this, _t2).on(n, t2), () => {
      __privateGet(this, _t2).removeListener(n, t2), __privateGet(this, _t2).listeners.exit.length === 0 && __privateGet(this, _t2).listeners.afterExit.length === 0 && this.unload();
    };
  }
  load() {
    if (!__privateGet(this, _r2)) {
      __privateSet(this, _r2, true), __privateGet(this, _t2).count += 1;
      for (let t2 of G) try {
        let r2 = __privateGet(this, _n)[t2];
        r2 && __privateGet(this, _e2).on(t2, r2);
      } catch {
      }
      __privateGet(this, _e2).emit = (t2, ...r2) => __privateMethod(this, _tt_instances, o_fn).call(this, t2, ...r2), __privateGet(this, _e2).reallyExit = (t2) => __privateMethod(this, _tt_instances, D_fn).call(this, t2);
    }
  }
  unload() {
    __privateGet(this, _r2) && (__privateSet(this, _r2, false), G.forEach((t2) => {
      let r2 = __privateGet(this, _n)[t2];
      if (!r2) throw new Error("Listener not defined for signal: " + t2);
      try {
        __privateGet(this, _e2).removeListener(t2, r2);
      } catch {
      }
    }), __privateGet(this, _e2).emit = __privateGet(this, _u2), __privateGet(this, _e2).reallyExit = __privateGet(this, _i), __privateGet(this, _t2).count -= 1);
  }
}, _s = new WeakMap(), _t2 = new WeakMap(), _e2 = new WeakMap(), _u2 = new WeakMap(), _i = new WeakMap(), _n = new WeakMap(), _r2 = new WeakMap(), _tt_instances = new WeakSet(), D_fn = function(t2) {
  return Te(__privateGet(this, _e2)) ? (__privateGet(this, _e2).exitCode = t2 || 0, __privateGet(this, _t2).emit("exit", __privateGet(this, _e2).exitCode, null), __privateGet(this, _i).call(__privateGet(this, _e2), __privateGet(this, _e2).exitCode)) : 0;
}, o_fn = function(t2, ...r2) {
  let n = __privateGet(this, _u2);
  if (t2 === "exit" && Te(__privateGet(this, _e2))) {
    typeof r2[0] == "number" && (__privateGet(this, _e2).exitCode = r2[0]);
    let u = n.call(__privateGet(this, _e2), t2, ...r2);
    return __privateGet(this, _t2).emit("exit", __privateGet(this, _e2).exitCode, null), u;
  } else return n.call(__privateGet(this, _e2), t2, ...r2);
}, _a13);
var rt = globalThis.process;
var { onExit: Zt} = yn(Te(rt) ? new tt(rt) : new et());
var Xt = process2__default.default.stderr.isTTY ? process2__default.default.stderr : process2__default.default.stdout.isTTY ? process2__default.default.stdout : void 0;
var wn = Xt ? Jt(() => {
  Zt(() => {
    Xt.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var Qt = wn;
var ve = false;
var Z = {};
Z.show = (e2 = process2__default.default.stderr) => {
  e2.isTTY && (ve = false, e2.write("\x1B[?25h"));
};
Z.hide = (e2 = process2__default.default.stderr) => {
  e2.isTTY && (Qt(), ve = true, e2.write("\x1B[?25l"));
};
Z.toggle = (e2, t2) => {
  e2 !== void 0 && (ve = e2), ve ? Z.show(t2) : Z.hide(t2);
};
var nt = Z;
function ut({ onlyFirst: e2 = false } = {}) {
  let r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(r2, e2 ? void 0 : "g");
}
var $n = ut();
function U(e2) {
  if (typeof e2 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e2}\``);
  return e2.replace($n, "");
}
function tr(e2) {
  return e2 === 161 || e2 === 164 || e2 === 167 || e2 === 168 || e2 === 170 || e2 === 173 || e2 === 174 || e2 >= 176 && e2 <= 180 || e2 >= 182 && e2 <= 186 || e2 >= 188 && e2 <= 191 || e2 === 198 || e2 === 208 || e2 === 215 || e2 === 216 || e2 >= 222 && e2 <= 225 || e2 === 230 || e2 >= 232 && e2 <= 234 || e2 === 236 || e2 === 237 || e2 === 240 || e2 === 242 || e2 === 243 || e2 >= 247 && e2 <= 250 || e2 === 252 || e2 === 254 || e2 === 257 || e2 === 273 || e2 === 275 || e2 === 283 || e2 === 294 || e2 === 295 || e2 === 299 || e2 >= 305 && e2 <= 307 || e2 === 312 || e2 >= 319 && e2 <= 322 || e2 === 324 || e2 >= 328 && e2 <= 331 || e2 === 333 || e2 === 338 || e2 === 339 || e2 === 358 || e2 === 359 || e2 === 363 || e2 === 462 || e2 === 464 || e2 === 466 || e2 === 468 || e2 === 470 || e2 === 472 || e2 === 474 || e2 === 476 || e2 === 593 || e2 === 609 || e2 === 708 || e2 === 711 || e2 >= 713 && e2 <= 715 || e2 === 717 || e2 === 720 || e2 >= 728 && e2 <= 731 || e2 === 733 || e2 === 735 || e2 >= 768 && e2 <= 879 || e2 >= 913 && e2 <= 929 || e2 >= 931 && e2 <= 937 || e2 >= 945 && e2 <= 961 || e2 >= 963 && e2 <= 969 || e2 === 1025 || e2 >= 1040 && e2 <= 1103 || e2 === 1105 || e2 === 8208 || e2 >= 8211 && e2 <= 8214 || e2 === 8216 || e2 === 8217 || e2 === 8220 || e2 === 8221 || e2 >= 8224 && e2 <= 8226 || e2 >= 8228 && e2 <= 8231 || e2 === 8240 || e2 === 8242 || e2 === 8243 || e2 === 8245 || e2 === 8251 || e2 === 8254 || e2 === 8308 || e2 === 8319 || e2 >= 8321 && e2 <= 8324 || e2 === 8364 || e2 === 8451 || e2 === 8453 || e2 === 8457 || e2 === 8467 || e2 === 8470 || e2 === 8481 || e2 === 8482 || e2 === 8486 || e2 === 8491 || e2 === 8531 || e2 === 8532 || e2 >= 8539 && e2 <= 8542 || e2 >= 8544 && e2 <= 8555 || e2 >= 8560 && e2 <= 8569 || e2 === 8585 || e2 >= 8592 && e2 <= 8601 || e2 === 8632 || e2 === 8633 || e2 === 8658 || e2 === 8660 || e2 === 8679 || e2 === 8704 || e2 === 8706 || e2 === 8707 || e2 === 8711 || e2 === 8712 || e2 === 8715 || e2 === 8719 || e2 === 8721 || e2 === 8725 || e2 === 8730 || e2 >= 8733 && e2 <= 8736 || e2 === 8739 || e2 === 8741 || e2 >= 8743 && e2 <= 8748 || e2 === 8750 || e2 >= 8756 && e2 <= 8759 || e2 === 8764 || e2 === 8765 || e2 === 8776 || e2 === 8780 || e2 === 8786 || e2 === 8800 || e2 === 8801 || e2 >= 8804 && e2 <= 8807 || e2 === 8810 || e2 === 8811 || e2 === 8814 || e2 === 8815 || e2 === 8834 || e2 === 8835 || e2 === 8838 || e2 === 8839 || e2 === 8853 || e2 === 8857 || e2 === 8869 || e2 === 8895 || e2 === 8978 || e2 >= 9312 && e2 <= 9449 || e2 >= 9451 && e2 <= 9547 || e2 >= 9552 && e2 <= 9587 || e2 >= 9600 && e2 <= 9615 || e2 >= 9618 && e2 <= 9621 || e2 === 9632 || e2 === 9633 || e2 >= 9635 && e2 <= 9641 || e2 === 9650 || e2 === 9651 || e2 === 9654 || e2 === 9655 || e2 === 9660 || e2 === 9661 || e2 === 9664 || e2 === 9665 || e2 >= 9670 && e2 <= 9672 || e2 === 9675 || e2 >= 9678 && e2 <= 9681 || e2 >= 9698 && e2 <= 9701 || e2 === 9711 || e2 === 9733 || e2 === 9734 || e2 === 9737 || e2 === 9742 || e2 === 9743 || e2 === 9756 || e2 === 9758 || e2 === 9792 || e2 === 9794 || e2 === 9824 || e2 === 9825 || e2 >= 9827 && e2 <= 9829 || e2 >= 9831 && e2 <= 9834 || e2 === 9836 || e2 === 9837 || e2 === 9839 || e2 === 9886 || e2 === 9887 || e2 === 9919 || e2 >= 9926 && e2 <= 9933 || e2 >= 9935 && e2 <= 9939 || e2 >= 9941 && e2 <= 9953 || e2 === 9955 || e2 === 9960 || e2 === 9961 || e2 >= 9963 && e2 <= 9969 || e2 === 9972 || e2 >= 9974 && e2 <= 9977 || e2 === 9979 || e2 === 9980 || e2 === 9982 || e2 === 9983 || e2 === 10045 || e2 >= 10102 && e2 <= 10111 || e2 >= 11094 && e2 <= 11097 || e2 >= 12872 && e2 <= 12879 || e2 >= 57344 && e2 <= 63743 || e2 >= 65024 && e2 <= 65039 || e2 === 65533 || e2 >= 127232 && e2 <= 127242 || e2 >= 127248 && e2 <= 127277 || e2 >= 127280 && e2 <= 127337 || e2 >= 127344 && e2 <= 127373 || e2 === 127375 || e2 === 127376 || e2 >= 127387 && e2 <= 127404 || e2 >= 917760 && e2 <= 917999 || e2 >= 983040 && e2 <= 1048573 || e2 >= 1048576 && e2 <= 1114109;
}
function rr(e2) {
  return e2 === 12288 || e2 >= 65281 && e2 <= 65376 || e2 >= 65504 && e2 <= 65510;
}
function nr(e2) {
  return e2 >= 4352 && e2 <= 4447 || e2 === 8986 || e2 === 8987 || e2 === 9001 || e2 === 9002 || e2 >= 9193 && e2 <= 9196 || e2 === 9200 || e2 === 9203 || e2 === 9725 || e2 === 9726 || e2 === 9748 || e2 === 9749 || e2 >= 9776 && e2 <= 9783 || e2 >= 9800 && e2 <= 9811 || e2 === 9855 || e2 >= 9866 && e2 <= 9871 || e2 === 9875 || e2 === 9889 || e2 === 9898 || e2 === 9899 || e2 === 9917 || e2 === 9918 || e2 === 9924 || e2 === 9925 || e2 === 9934 || e2 === 9940 || e2 === 9962 || e2 === 9970 || e2 === 9971 || e2 === 9973 || e2 === 9978 || e2 === 9981 || e2 === 9989 || e2 === 9994 || e2 === 9995 || e2 === 10024 || e2 === 10060 || e2 === 10062 || e2 >= 10067 && e2 <= 10069 || e2 === 10071 || e2 >= 10133 && e2 <= 10135 || e2 === 10160 || e2 === 10175 || e2 === 11035 || e2 === 11036 || e2 === 11088 || e2 === 11093 || e2 >= 11904 && e2 <= 11929 || e2 >= 11931 && e2 <= 12019 || e2 >= 12032 && e2 <= 12245 || e2 >= 12272 && e2 <= 12287 || e2 >= 12289 && e2 <= 12350 || e2 >= 12353 && e2 <= 12438 || e2 >= 12441 && e2 <= 12543 || e2 >= 12549 && e2 <= 12591 || e2 >= 12593 && e2 <= 12686 || e2 >= 12688 && e2 <= 12773 || e2 >= 12783 && e2 <= 12830 || e2 >= 12832 && e2 <= 12871 || e2 >= 12880 && e2 <= 42124 || e2 >= 42128 && e2 <= 42182 || e2 >= 43360 && e2 <= 43388 || e2 >= 44032 && e2 <= 55203 || e2 >= 63744 && e2 <= 64255 || e2 >= 65040 && e2 <= 65049 || e2 >= 65072 && e2 <= 65106 || e2 >= 65108 && e2 <= 65126 || e2 >= 65128 && e2 <= 65131 || e2 >= 94176 && e2 <= 94180 || e2 === 94192 || e2 === 94193 || e2 >= 94208 && e2 <= 100343 || e2 >= 100352 && e2 <= 101589 || e2 >= 101631 && e2 <= 101640 || e2 >= 110576 && e2 <= 110579 || e2 >= 110581 && e2 <= 110587 || e2 === 110589 || e2 === 110590 || e2 >= 110592 && e2 <= 110882 || e2 === 110898 || e2 >= 110928 && e2 <= 110930 || e2 === 110933 || e2 >= 110948 && e2 <= 110951 || e2 >= 110960 && e2 <= 111355 || e2 >= 119552 && e2 <= 119638 || e2 >= 119648 && e2 <= 119670 || e2 === 126980 || e2 === 127183 || e2 === 127374 || e2 >= 127377 && e2 <= 127386 || e2 >= 127488 && e2 <= 127490 || e2 >= 127504 && e2 <= 127547 || e2 >= 127552 && e2 <= 127560 || e2 === 127568 || e2 === 127569 || e2 >= 127584 && e2 <= 127589 || e2 >= 127744 && e2 <= 127776 || e2 >= 127789 && e2 <= 127797 || e2 >= 127799 && e2 <= 127868 || e2 >= 127870 && e2 <= 127891 || e2 >= 127904 && e2 <= 127946 || e2 >= 127951 && e2 <= 127955 || e2 >= 127968 && e2 <= 127984 || e2 === 127988 || e2 >= 127992 && e2 <= 128062 || e2 === 128064 || e2 >= 128066 && e2 <= 128252 || e2 >= 128255 && e2 <= 128317 || e2 >= 128331 && e2 <= 128334 || e2 >= 128336 && e2 <= 128359 || e2 === 128378 || e2 === 128405 || e2 === 128406 || e2 === 128420 || e2 >= 128507 && e2 <= 128591 || e2 >= 128640 && e2 <= 128709 || e2 === 128716 || e2 >= 128720 && e2 <= 128722 || e2 >= 128725 && e2 <= 128727 || e2 >= 128732 && e2 <= 128735 || e2 === 128747 || e2 === 128748 || e2 >= 128756 && e2 <= 128764 || e2 >= 128992 && e2 <= 129003 || e2 === 129008 || e2 >= 129292 && e2 <= 129338 || e2 >= 129340 && e2 <= 129349 || e2 >= 129351 && e2 <= 129535 || e2 >= 129648 && e2 <= 129660 || e2 >= 129664 && e2 <= 129673 || e2 >= 129679 && e2 <= 129734 || e2 >= 129742 && e2 <= 129756 || e2 >= 129759 && e2 <= 129769 || e2 >= 129776 && e2 <= 129784 || e2 >= 131072 && e2 <= 196605 || e2 >= 196608 && e2 <= 262141;
}
function Tn(e2) {
  if (!Number.isSafeInteger(e2)) throw new TypeError(`Expected a code point, got \`${typeof e2}\`.`);
}
function Oe(e2, { ambiguousAsWide: t2 = false } = {}) {
  return Tn(e2), rr(e2) || nr(e2) || t2 && tr(e2) ? 2 : 1;
}
var ur = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var kn = new Intl.Segmenter();
var Sn = new RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function H(e2, t2 = {}) {
  if (typeof e2 != "string" || e2.length === 0) return 0;
  let { ambiguousIsNarrow: r2 = true, countAnsiEscapeCodes: n = false } = t2;
  if (n || (e2 = U(e2)), e2.length === 0) return 0;
  let u = 0, i = { ambiguousAsWide: !r2 };
  for (let { segment: s2 } of kn.segment(e2)) {
    let D = s2.codePointAt(0);
    if (!(D <= 31 || D >= 127 && D <= 159) && !(D >= 8203 && D <= 8207 || D === 65279) && !(D >= 768 && D <= 879 || D >= 6832 && D <= 6911 || D >= 7616 && D <= 7679 || D >= 8400 && D <= 8447 || D >= 65056 && D <= 65071) && !(D >= 55296 && D <= 57343) && !(D >= 65024 && D <= 65039) && !Sn.test(s2)) {
      if (ur().test(s2)) {
        u += 2;
        continue;
      }
      u += Oe(D, i);
    }
  }
  return u;
}
var ir = (e2 = 0) => (t2) => `\x1B[${t2 + e2}m`;
var sr = (e2 = 0) => (t2) => `\x1B[${38 + e2};5;${t2}m`;
var Dr = (e2 = 0) => (t2, r2, n) => `\x1B[${38 + e2};2;${t2};${r2};${n}m`;
var E = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(E.modifier);
var vn = Object.keys(E.color);
var On = Object.keys(E.bgColor);
[...vn, ...On];
function In() {
  let e2 = /* @__PURE__ */ new Map();
  for (let [t2, r2] of Object.entries(E)) {
    for (let [n, u] of Object.entries(r2)) E[n] = { open: `\x1B[${u[0]}m`, close: `\x1B[${u[1]}m` }, r2[n] = E[n], e2.set(u[0], u[1]);
    Object.defineProperty(E, t2, { value: r2, enumerable: false });
  }
  return Object.defineProperty(E, "codes", { value: e2, enumerable: false }), E.color.close = "\x1B[39m", E.bgColor.close = "\x1B[49m", E.color.ansi = ir(), E.color.ansi256 = sr(), E.color.ansi16m = Dr(), E.bgColor.ansi = ir(10), E.bgColor.ansi256 = sr(10), E.bgColor.ansi16m = Dr(10), Object.defineProperties(E, { rgbToAnsi256: { value: (t2, r2, n) => t2 === r2 && r2 === n ? t2 < 8 ? 16 : t2 > 248 ? 231 : Math.round((t2 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t2 / 255 * 5) + 6 * Math.round(r2 / 255 * 5) + Math.round(n / 255 * 5), enumerable: false }, hexToRgb: { value: (t2) => {
    let r2 = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t2.toString(16));
    if (!r2) return [0, 0, 0];
    let [n] = r2;
    n.length === 3 && (n = [...n].map((i) => i + i).join(""));
    let u = Number.parseInt(n, 16);
    return [u >> 16 & 255, u >> 8 & 255, u & 255];
  }, enumerable: false }, hexToAnsi256: { value: (t2) => E.rgbToAnsi256(...E.hexToRgb(t2)), enumerable: false }, ansi256ToAnsi: { value: (t2) => {
    if (t2 < 8) return 30 + t2;
    if (t2 < 16) return 90 + (t2 - 8);
    let r2, n, u;
    if (t2 >= 232) r2 = ((t2 - 232) * 10 + 8) / 255, n = r2, u = r2;
    else {
      t2 -= 16;
      let D = t2 % 36;
      r2 = Math.floor(t2 / 36) / 5, n = Math.floor(D / 6) / 5, u = D % 6 / 5;
    }
    let i = Math.max(r2, n, u) * 2;
    if (i === 0) return 30;
    let s2 = 30 + (Math.round(u) << 2 | Math.round(n) << 1 | Math.round(r2));
    return i === 2 && (s2 += 60), s2;
  }, enumerable: false }, rgbToAnsi: { value: (t2, r2, n) => E.ansi256ToAnsi(E.rgbToAnsi256(t2, r2, n)), enumerable: false }, hexToAnsi: { value: (t2) => E.ansi256ToAnsi(E.hexToAnsi256(t2)), enumerable: false } }), E;
}
var Pn = In();
var S = Pn;
var Pe = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
var Rn = 39;
var st = "\x07";
var ar = "[";
var Ln = "]";
var Fr = "m";
var Ie = `${Ln}8;;`;
var or = (e2) => `${Pe.values().next().value}${ar}${e2}${Fr}`;
var lr = (e2) => `${Pe.values().next().value}${Ie}${e2}${st}`;
var Nn = (e2) => e2.split(" ").map((t2) => H(t2));
var it = (e2, t2, r2) => {
  let n = [...t2], u = false, i = false, s2 = H(U(e2.at(-1)));
  for (let [D, o2] of n.entries()) {
    let h = H(o2);
    if (s2 + h <= r2 ? e2[e2.length - 1] += o2 : (e2.push(o2), s2 = 0), Pe.has(o2) && (u = true, i = n.slice(D + 1, D + 1 + Ie.length).join("") === Ie), u) {
      i ? o2 === st && (u = false, i = false) : o2 === Fr && (u = false);
      continue;
    }
    s2 += h, s2 === r2 && D < n.length - 1 && (e2.push(""), s2 = 0);
  }
  !s2 && e2.at(-1).length > 0 && e2.length > 1 && (e2[e2.length - 2] += e2.pop());
};
var _n2 = (e2) => {
  let t2 = e2.split(" "), r2 = t2.length;
  for (; r2 > 0 && !(H(t2[r2 - 1]) > 0); ) r2--;
  return r2 === t2.length ? e2 : t2.slice(0, r2).join(" ") + t2.slice(r2).join("");
};
var jn = (e2, t2, r2 = {}) => {
  if (r2.trim !== false && e2.trim() === "") return "";
  let n = "", u, i, s2 = Nn(e2), D = [""];
  for (let [c, p] of e2.split(" ").entries()) {
    r2.trim !== false && (D[D.length - 1] = D.at(-1).trimStart());
    let d = H(D.at(-1));
    if (c !== 0 && (d >= t2 && (r2.wordWrap === false || r2.trim === false) && (D.push(""), d = 0), (d > 0 || r2.trim === false) && (D[D.length - 1] += " ", d++)), r2.hard && s2[c] > t2) {
      let C2 = t2 - d, m2 = 1 + Math.floor((s2[c] - C2 - 1) / t2);
      Math.floor((s2[c] - 1) / t2) < m2 && D.push(""), it(D, p, t2);
      continue;
    }
    if (d + s2[c] > t2 && d > 0 && s2[c] > 0) {
      if (r2.wordWrap === false && d < t2) {
        it(D, p, t2);
        continue;
      }
      D.push("");
    }
    if (d + s2[c] > t2 && r2.wordWrap === false) {
      it(D, p, t2);
      continue;
    }
    D[D.length - 1] += p;
  }
  r2.trim !== false && (D = D.map((c) => _n2(c)));
  let o2 = D.join(`
`), h = [...o2], f = 0;
  for (let [c, p] of h.entries()) {
    if (n += p, Pe.has(p)) {
      let { groups: C2 } = new RegExp(`(?:\\${ar}(?<code>\\d+)m|\\${Ie}(?<uri>.*)${st})`).exec(o2.slice(f)) || { groups: {} };
      if (C2.code !== void 0) {
        let m2 = Number.parseFloat(C2.code);
        u = m2 === Rn ? void 0 : m2;
      } else C2.uri !== void 0 && (i = C2.uri.length === 0 ? void 0 : C2.uri);
    }
    let d = S.codes.get(Number(u));
    h[c + 1] === `
` ? (i && (n += lr("")), u && d && (n += or(d))) : p === `
` && (u && d && (n += or(u)), i && (n += lr(i))), f += p.length;
  }
  return n;
};
function O(e2, t2, r2) {
  return String(e2).normalize().replaceAll(`\r
`, `
`).split(`
`).map((n) => jn(n, t2, r2)).join(`
`);
}
function Dt(e2) {
  return Number.isInteger(e2) ? Oe(e2) === 2 : false;
}
var Mn = /* @__PURE__ */ new Set([27, 155]);
var Wn = "0".codePointAt(0);
var Gn = "9".codePointAt(0);
var lt = /* @__PURE__ */ new Set();
var ot = /* @__PURE__ */ new Map();
for (let [e2, t2] of S.codes) lt.add(S.color.ansi(t2)), ot.set(S.color.ansi(e2), S.color.ansi(t2));
function Un(e2) {
  if (lt.has(e2)) return e2;
  if (ot.has(e2)) return ot.get(e2);
  e2 = e2.slice(2), e2.includes(";") && (e2 = e2[0] + "0");
  let t2 = S.codes.get(Number.parseInt(e2, 10));
  return t2 ? S.color.ansi(t2) : S.reset.open;
}
function Hn(e2) {
  for (let t2 = 0; t2 < e2.length; t2++) {
    let r2 = e2.codePointAt(t2);
    if (r2 >= Wn && r2 <= Gn) return t2;
  }
  return -1;
}
function zn(e2, t2) {
  e2 = e2.slice(t2, t2 + 19);
  let r2 = Hn(e2);
  if (r2 !== -1) {
    let n = e2.indexOf("m", r2);
    return n === -1 && (n = e2.length), e2.slice(0, n + 1);
  }
}
function Vn(e2, t2 = Number.POSITIVE_INFINITY) {
  let r2 = [], n = 0, u = 0;
  for (; n < e2.length; ) {
    let i = e2.codePointAt(n);
    if (Mn.has(i)) {
      let o2 = zn(e2, n);
      if (o2) {
        r2.push({ type: "ansi", code: o2, endCode: Un(o2) }), n += o2.length;
        continue;
      }
    }
    let s2 = Dt(i), D = String.fromCodePoint(i);
    if (r2.push({ type: "character", value: D, isFullWidth: s2 }), n += D.length, u += s2 ? 2 : D.length, u >= t2) break;
  }
  return r2;
}
function cr(e2) {
  let t2 = [];
  for (let r2 of e2) r2.code === S.reset.open ? t2 = [] : lt.has(r2.code) ? t2 = t2.filter((n) => n.endCode !== r2.code) : (t2 = t2.filter((n) => n.endCode !== r2.endCode), t2.push(r2));
  return t2;
}
function Yn(e2) {
  return cr(e2).map(({ endCode: n }) => n).reverse().join("");
}
function at(e2, t2, r2) {
  let n = Vn(e2, r2), u = [], i = 0, s2 = "", D = false;
  for (let o2 of n) {
    o2.type === "ansi" ? (u.push(o2), D && (s2 += o2.code)) : (!D && i >= t2 && (D = true, u = cr(u), s2 = u.map(({ code: h }) => h).join("")), D && (s2 += o2.value), i += o2.isFullWidth ? 2 : o2.value.length);
  }
  return s2 += Yn(u), s2;
}
var qn = 24;
var Ft = ({ columns: e2 = 80 }) => e2;
var Kn = (e2, t2) => {
  let r2 = e2.rows ?? qn, n = t2.split(`
`), u = Math.max(0, n.length - r2);
  return u ? at(t2, U(n.slice(0, u).join(`
`)).length + 1) : t2;
};
function N(e2, { showCursor: t2 = false } = {}) {
  let r2 = 0, n = Ft(e2), u = "", i = () => {
    u = "", n = Ft(e2), r2 = 0;
  }, s2 = (...D) => {
    t2 || nt.hide();
    let o2 = Kn(e2, D.join(" ") + `
`), h = Ft(e2);
    o2 === u && n === h || (u = o2, n = h, o2 = O(o2, h, { trim: false, hard: true, wordWrap: false }), e2.write(oe.eraseLines(r2) + o2), r2 = o2.split(`
`).length);
  };
  return s2.clear = () => {
    e2.write(oe.eraseLines(r2)), i();
  }, s2.done = () => {
    i(), t2 || nt.show();
  }, s2;
}
var Jn = N(process2__default.default.stdout);
var z = Jn;
N(process2__default.default.stderr);
function Xn(e2) {
  if (typeof e2 != "string") throw new TypeError("Expected a string");
  return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var hr = /\s+at.*[(\s](.*)\)?/;
var fr = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function gr(e2, { pretty: t2 = false, basePath: r2, pathFilter: n } = {}) {
  let u = r2 && new RegExp(`(file://)?${Xn(r2.replace(/\\/g, "/"))}/?`, "g"), i = t2 ? node_os.homedir().replace(/\\/g, "/") : "";
  if (typeof e2 == "string") return e2.replace(/\\/g, "/").split(`
`).filter((s2) => {
    let D = s2.match(hr);
    if (D === null || !D[1]) return true;
    let o2 = D[1];
    return o2.includes(".app/Contents/Resources/electron.asar") || o2.includes(".app/Contents/Resources/default_app.asar") || o2.includes("node_modules/electron/dist/resources/electron.asar") || o2.includes("node_modules/electron/dist/resources/default_app.asar") ? false : n ? !fr.test(o2) && n(o2) : !fr.test(o2);
  }).filter((s2) => s2.trim() !== "").map((s2) => (u && (s2 = s2.replace(u, "")), t2 && (s2 = s2.replace(hr, (D, o2) => D.replace(o2, o2.replace(i, "~")))), s2)).join(`
`);
}
var Cr = 9;
var Re = " ";
var Qn = Cr + Re.length;
function ae(e2, ...t2) {
  let r2 = ee(e2) ? q(e2).trim() : e2.trim(), n = r2.length > Cr ? Re : " ".repeat(Qn - r2.length), u = /^(error|invalid|failed|rejected)$/.test(r2) ? vt : Ot, i = r2 + Re + n + u + Re, s2 = t2.length;
  if (s2 > 0) {
    if (s2 === 1) return g.ws(i, t2[0]);
    if (s2 === 2) return g.ws(i, t2[0], K, t2[1]);
    if (s2 === 3) return g.ws(i, t2[0], K, t2[1], dr(t2[2]));
    if (s2 === 4) return g.ws(i, t2[0], K, t2[1], K, t2[2], dr(t2[3]));
  }
  return i;
}
function dr(e2) {
  return e2 ? Be + " " + Ee.gray(e2) : "";
}
function mD(e2, t2, { spaced: r2 = false } = {}) {
  let n = r2 ? " " : "";
  switch (e2) {
    case "AN":
      return Mt + n + t2 + n + Wt;
    case "CB":
      return Lt + n + t2 + n + Nt;
    case "PR":
      return Pt + n + t2 + n + Rt;
    case "SB":
      return _t + n + t2 + n + jt;
  }
}
var Fe = /* @__PURE__ */ Object.create(null);
Fe.warning = x(` ${Be} Type ${y("w")} and press ${y("enter")} to view all warning/s`);
Fe.error = w(` ${Be} Type ${y("v")} and press ${y("enter")} to view all error/s`);
Fe.stack = a(`Type ${y("s")} and press ${y("enter")} to view stack trace`);
Fe.bulk = a(`Type ${y("i")} and press ${y("enter")} to inspect bulk file/s`);
var BD = (e2 = void 0, t2 = true) => {
  e2 === void 0 && (e2 = ue().wrap);
  let r2 = F.open + "\u251C" + "\u2500".repeat(e2 - 10) + F.close;
  return t2 ? l.trim + `
` + r2 + `
` + l.trim : r2;
};
function Er(e2, t2 = true) {
  return l.open + Ee.gray(t2 ? `${e2} ~ ${Ve()}` : e2);
}
var mr = (...e2) => {
  let t2 = { color: null, line: l.line }, r2 = "", n;
  for (Array.isArray(e2[0]) ? (typeof e2[1] == "object" && Object.assign(t2, e2[1]), n = e2[0]) : (typeof e2[e2.length - 1] == "object" && Object.assign(t2, e2.pop()), n = e2); n.length !== 0; ) {
    let u = n.shift();
    if (/^\n+$/.test(u)) {
      let i = u.split(`
`).length - 1;
      for (let s2 = 0; s2 < i; s2++) r2 += t2.line + `
`;
    } else u = u.trim(), u.length > 0 ? r2 += t2.line + (t2.color ? t2.color(u) : u) + `
` : r2 += t2.line + `
`;
  }
  return r2.slice(0, -1);
};
var ce = (...e2) => {
  let t2 = { color: null, line: l.line, firstLineTree: true }, r2 = ue().wrap - 5, n, u = "";
  Array.isArray(e2[0]) ? (typeof e2[1] == "object" && Object.assign(t2, e2[1]), n = O(g.ws(e2[0]), r2, { hard: true }).split(`
`)) : (typeof e2[e2.length - 1] == "object" && Object.assign(t2, e2.pop()), n = O(e2.join(" "), r2, { hard: true }).split(`
`));
  for (let i = 0, s2 = n.length; i < s2; i++) {
    let D = n[i], o2 = i === 0 && t2.firstLineTree === false ? "" : t2.line;
    u += o2 + (D.length > 0 ? t2.color ? t2.color(D) : D : "") + `
`;
  }
  return u.trimEnd();
};
var ct = (e2) => l.trim + `
` + l.line + e2 + `
` + l.trim;
function xD(e2) {
  return l.line + e2;
}
function yD(e2) {
  return l.red + e2;
}
function wD(e2) {
  return l.yellow + e2;
}
function $D(e2) {
  return l.trim + `
` + l.line + e2;
}
function kD(e2) {
  return l.dash + e2;
}
function Br(e2, t2 = true) {
  return l.base + Ee.gray(t2 ? `${e2} ~ ${Ve()}` : e2) + `
`;
}
function Ar(e2) {
  let t2 = Gt(e2.entries), r2 = pt({ type: e2.type || "error", tree: "tree" in e2 ? e2.tree : true }).Newline();
  if (typeof e2.stack == "string") {
    let i = e2.cleanStack ? gr(e2.stack, { pretty: true }) : e2.stack;
    /TypeError/.test(i.trimStart()) && (i = i.slice(i.indexOf(`
`) + 1).replace(/^ +/gm, K + be)), r2.Multiline(a(i)).Newline();
  }
  let n = "", u = "";
  "line" in e2.entries && (n = `:${typeof e2.entries.line == "number" ? e2.entries.line : q(e2.entries.line)}`), n !== "" && "column" in e2.entries && (u = `:${typeof e2.entries.column == "number" ? e2.entries.column : q(e2.entries.column)}`);
  for (let i in e2.entries) {
    if (e2.entries[i] === void 0) continue;
    let s2, D = i === "failed";
    if (typeof e2.entries[i] == "number") {
      if (isNaN(e2.entries[i])) continue;
      s2 = St(Ae(e2.entries[i]));
    } else D || (s2 = Ae(e2.entries[i]));
    if (s2.length === 0) continue;
    let o2 = e2.type === "warning" ? P(i) : k(i);
    if (i === "source" || i === "output" || i === "input" || i === "file") r2.Line(`${o2}${R} ${t2(i)}${Ce(s2 + n + u)}`, a);
    else if (D) if (Array.isArray(e2.entries[i])) for (let h of e2.entries[i]) r2.Line(`${o2}${R} ${t2(i)}${Ce(h)}`, a);
    else r2.Line(`${o2}${R} ${t2(i)}${Ce(e2.entries[i])}`, a);
    else r2.Line(`${o2}${R} ${t2(i)}${s2}`, a);
  }
  return e2.stack === true && r2.Newline().Line(Fe.stack), r2.toString();
}
function Le() {
  let e2, t2 = false, r2 = "", n = true, { loaders: u } = Le, i = { label: "", line: true, color: null, style: "spinning", action: null }, s2 = function(o2, h) {
    let f = { ...i };
    typeof o2 == "object" ? f = Object.assign(f, o2) : typeof o2 == "string" && (f.label = o2, typeof h == "object" && (f = Object.assign(f, h))), t2 = true, n = f.line;
    let c, p = 0, d, C2 = 0;
    f.action !== null ? (f.style = "arrows", c = "color" in f.action ? f.action.color : Q, d = u.arrows.frames, C2 = d.length) : (c = typeof f.color == "function" ? f.color : kt, r2 = f.label, d = u[f.style].frames, C2 = d.length), z.done(), e2 = setInterval(() => {
      if (!t2) return;
      let m2;
      if (f.action !== null) {
        let $2 = y(f.action.before) + " " + d[p = ++p % C2] + " " + f.action.after;
        m2 = c(r2 !== "" ? ae(r2, $2) : $2);
      } else m2 = c(d[p = ++p % C2] + " " + r2);
      z(f.line ? ct(m2) : m2);
    }, u[f.style].interval);
  };
  return s2.update = function(D) {
    r2 = D;
  }, s2.stop = function(D) {
    t2 !== false && (t2 = false, D ? (z(n ? ct(D) : D), z.done()) : z.clear(), clearInterval(e2), e2 = void 0, r2 = "");
  }, Object.defineProperty(s2, "active", { get() {
    return t2;
  } }), s2;
}
Le.loaders = { arrows: { interval: 120, frames: ["\u25B9\u25B9\u25B9\u25B9", "\u25B8\u25B9\u25B9\u25B9", "\u25B9\u25B8\u25B9\u25B9", "\u25B9\u25B9\u25B8\u25B9", "\u25B9\u25B9\u25B9\u25B8"] }, brielle: { interval: 80, frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"] }, spinning: { interval: 80, frames: ["\u25D0", "\u25D3", "\u25D1", "\u25D2"] } };
var V = class e {
  static store = /* @__PURE__ */ new Map();
  static stdout = null;
  static stderr = null;
  spin = { active: false, index: NaN, label: xe, color: me, style: "brielle", interval: null };
  id = null;
  type = "info";
  track = /* @__PURE__ */ new Map();
  line;
  trim;
  dash;
  tree = true;
  update = null;
  stack;
  data;
  constructor(t2) {
    typeof t2 == "object" ? (this.id = "id" in t2 ? t2.id : null, this.tree = "tree" in t2 ? t2.tree : true, this.type = "type" in t2 ? t2.type : "info", this.stack = "stack" in t2 ? t2.stack : [], "stderr" in t2 && (e.stderr = t2.stderr, this.update = N.call(this, e.stderr)), "stdout" in t2 && (e.stdout = t2.stdout, this.update = N.call(this, e.stdout)), this.tree ? this.type === "error" ? (this.line = l.red, this.trim = l.redTrim, this.dash = l.redDash, this.update || (this.update = N.call(this, process.stderr))) : this.type === "warning" ? (this.line = l.yellow, this.trim = l.yellowTrim, this.dash = l.yellowDash, this.update || (this.update = N.call(this, process.stderr))) : (this.line = l.line, this.trim = l.trim, this.dash = l.dash) : (this.line = "", this.trim = "", this.dash = "")) : (this.id = null, this.line = l.line, this.trim = l.trim, this.dash = l.dash, this.stack = []), this.update || (this.update = N.call(this, process.stdout));
  }
  toLog(...t2) {
    let r2 = { clear: false, color: void 0, trim: false }, n = null;
    t2.length > 0 && (t2.length === 1 ? typeof t2[0] == "function" ? n = t2[0] : Object.assign(r2, t2[0]) : (Object.assign(r2, t2[0]), n = t2[1]));
    let u = this.toString(r2, n);
    return this.type === "error" || this.type === "warning" ? e.stderr === null ? process.stderr.write(u) : e.stderr.write(u) : e.stdout === null ? process.stdout.write(u) : e.stdout.write(u), this;
  }
  toWrite(t2) {
    return t2(this.toString());
  }
  toLine(t2) {
    if (this.stack.length === 0) return "";
    this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd(), this.stack.push(`
` + this.trim);
    let r2 = g(this.stack);
    return this.stack = [], this.track.clear(), t2 ? t2(r2) : this.type === "info" ? ze(r2) : this.type === "error" ? k(r2) : this.type === "warning" ? P(r2) : r2;
  }
  toUpdate(t2) {
    if (t2 === null) return this.update;
    let r2 = this.toString({ clear: false, trim: false, ...t2 });
    return this.update(r2), this.update;
  }
  toString(...t2) {
    if (this.stack.length === 0) return "";
    let r2 = { clear: true, trim: true, color: void 0 }, n = null;
    t2.length > 0 && (t2.length === 1 ? typeof t2[0] == "function" ? n = t2[0] : Object.assign(r2, t2[0]) : (Object.assign(r2, t2[0]), n = t2[1])), r2.trim && (this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd());
    let u;
    if (r2.color ? u = r2.color(g(this.stack)) : this.type === "info" ? u = ze(g(this.stack)) : this.type === "error" ? u = k(g(this.stack)) : this.type === "warning" ? u = P(g(this.stack)) : u = g(this.stack), r2.clear === true) this.Reset();
    else if (Array.isArray(r2.clear)) {
      for (let i of r2.clear) if (this.track.has(i)) {
        let s2 = this.track.get(i);
        this.stack[s2.index] = "";
      }
    } else if (typeof r2.clear == "string" && this.track.has(r2.clear)) {
      let i = this.track.get(r2.clear);
      this.stack[i.index] = "";
    }
    return n === null ? u : n(u);
  }
  toStack() {
    return this.stack;
  }
  String(t2, r2) {
    return r2(this.toString(t2)), this;
  }
  True(t2, r2) {
    return t2 && r2.call(this, this), this;
  }
  Tree(t2) {
    return t2 === "error" ? (this.line = l.red, this.trim = l.redTrim, this.dash = l.redDash) : t2 === "warning" ? (this.line = l.yellow, this.trim = l.yellowTrim, this.dash = l.yellowDash) : t2 === "nil" ? (this.line = "", this.trim = "", this.dash = "") : (this.line = l.line, this.trim = l.trim, this.dash = l.dash), this;
  }
  Each(t2, r2) {
    for (let n = 0, u = t2.length; n < u; n++) r2.call(this, t2[n], n);
    return this;
  }
  Reset() {
    this.stack = [], this.track.clear(), this.id !== null && e.store.has(this.id) && e.store.delete(this.id);
  }
  get isEmpty() {
    return this.stack.length > 0;
  }
  Get(t2 = this.stack.length - 1) {
    return typeof t2 == "string" && this.track.has(t2) && (t2 = this.track.get(t2).index), this.stack[t2];
  }
  Template(...t2) {
    let r2 = t2.length === 2 ? t2[0] : null, n = Object.assign({ color: null, prefix: false, insert: false, hidden: false, id: null, label: null, message: null, dash: false, index: this.stack.length }, r2 ? t2[1] : t2[0]);
    if (r2 !== null) {
      let u = Array.isArray(r2) ? r2 : [r2];
      n.hidden ? (n.message = u, this.stack.push("")) : this.stack.push(mr(u, { color: n.color, line: n.dash ? this.dash : this.line }) + Ye);
    } else this.stack.push("");
    return typeof n.prefix == "string" && (n.label = n.prefix, n.prefix = true), n.id !== null && (n.index !== this.stack.length - 1 && (n.index = this.stack.length - 1), this.track.set(n.id, n)), this;
  }
  Update(t2, r2 = null, n = null) {
    let u = NaN, i;
    if (typeof t2 == "string" && this.track.has(t2) && (i = this.track.get(t2), u = i.index), isNaN(u) || typeof this.stack[u] != "string") return this;
    let s2 = i.hidden ? r2 === null ? [...i.message] : [""] : typeof r2 == "string" ? [r2] : Array.isArray(r2) ? r2 : [`${r2}`], D = s2.length > 1, o2 = [], h = n || i.color, { prefix: f, insert: c, label: p, dash: d } = i, C2 = d ? this.dash : this.line, m2 = 0;
    for (; s2.length !== 0; ) {
      let b = s2.shift();
      D && m2 > 0 && c === false ? o2.push(b + (h ? h(b) : b)) : o2.push(h ? h(b) : b), m2++;
    }
    let $2 = f ? ae(typeof p == "string" ? p : t2, g(o2)) : D ? g.nl(o2) : g(o2);
    return c ? this.stack.splice(u, 1, $2) : this.stack.splice(u, 1, C2 + $2 + `
`), this;
  }
  Spinner(t2, r2) {
    if (typeof r2 == "object" ? r2 = Object.assign({ style: "brielle", color: me }, { color: this.spin.color, style: this.spin.style }, r2) : r2 = Object.assign({ style: "brielle", color: me }, { color: this.spin.color, style: this.spin.style }), this.spin.active === false) {
      let n = 0;
      this.spin.style = r2.style;
      let u = Le.loaders[this.spin.style], i = u.frames, s2 = i.length;
      this.spin.color = r2.color, this.spin.label = t2, this.spin.active = true, this.spin.index = this.stack.push(this.line + this.spin.color(`${i[n = ++n % s2]} ${this.spin.label}`) + `
`) - 1, this.spin.interval = setInterval(() => {
        if (!this.spin.active) {
          this.Stop();
          return;
        }
        this.stack[this.spin.index] = this.line + this.spin.color(`${i[n = ++n % s2]} ${this.spin.label}`) + `
`, this.toUpdate();
      }, u.interval), this.toUpdate();
    } else this.spin.label = t2, this.spin.color = r2.color;
    return this;
  }
  Stop(t2, r2) {
    return this.spin.active === false ? (t2 && this.Line(t2, r2), this) : (clearInterval(this.spin.interval), t2 ? this.Replace(this.spin.index, t2, r2) : this.Remove(this.spin.index), this.spin.active = false, this.spin.interval = null, this.spin.index = NaN, this.toUpdate({ trim: true }), this.Pop(), this);
  }
  Trim() {
    let t2 = this.stack[this.stack.length - 1] + `
`;
    return t2 ? ((t2 === l.line || t2 === l.trim || t2 === l.red || t2 === l.redTrim || t2 === l.yellow || t2 === l.yellowTrim) && this.Pop(), this) : this;
  }
  Remove(t2, r2 = 1) {
    let n;
    if (typeof t2 == "string") {
      if (!this.track.has(t2)) return this;
      n = this.track.get(t2).index, this.track.delete(t2);
    } else n = t2;
    if (r2 === 1 / 0) {
      this.stack.splice(n);
      for (let [u, i] of this.track.entries()) i.index >= n && this.track.delete(u);
      this.stack = this.stack.slice(0, n);
    } else {
      let u;
      typeof r2 == "string" ? this.track.has(r2) ? (u = this.track.get(r2).index, this.track.delete(r2)) : u = 1 : u = r2, this.stack.splice(n, u);
      for (let [i, s2] of this.track.entries()) s2.index > n && (this.track.get(i).index = s2.index - u);
    }
    return this;
  }
  Mark(t2) {
    return this.track.set(t2, { id: t2, index: this.stack.length, label: null, prefix: false, color: void 0, insert: false, dash: false, hidden: false, message: null }), this.stack.push(""), this;
  }
  Replace(t2, r2, n) {
    let u;
    if (typeof t2 == "string") {
      if (!this.track.has(t2)) return this;
      u = this.track.get(t2).index;
    } else u = t2;
    return this.stack[u] && (this.stack[u] = this.line + (n ? n(r2) : r2) + `
`), this;
  }
  Ruler(t2 = void 0, { noLines: r2 = false } = {}) {
    return t2 === void 0 && (t2 = ue().wrap), this.tree ? r2 ? this.stack.push(F(`\u251C${"\u2500".repeat(t2)}`) + `
`) : this.stack.push(l.trim + `
` + F(`\u251C${"\u2500".repeat(t2)}`) + `
` + l.trim + `
`) : this.stack.push(F("\u2500".repeat(t2)) + `
`), this;
  }
  get index() {
    return this.stack.length - 1;
  }
  get newlines() {
    return this.stack.join("").split(Ye).length;
  }
  get NL() {
    return this.stack.push(this.trim + `
`), this;
  }
  get BR() {
    return this.stack.push(`
`), this;
  }
  Break(t2) {
    return typeof t2 == "number" ? this.stack.push(`
`.repeat(t2)) : this.stack.push(`
`), this;
  }
  Pop(t2 = 1) {
    for (; t2-- > 0; ) this.stack.pop();
    return this;
  }
  Newline(t2, r2) {
    if (typeof t2 == "number") {
      let n = this.trim + `
`;
      r2 && (this.tree && (r2 === "yellow" ? n = l.yellowTrim + `
` : r2 === "red" && (n = l.redTrim + `
`)), r2 === "" && (n = `
`));
      for (let u = 0; u < t2; u++) this.stack.push(n);
    } else t2 === "" ? this.stack.push(`
`) : t2 === "line" ? this.stack.push(l.trim + `
`) : t2 === "yellow" ? this.stack.push((this.tree ? l.yellowTrim : "") + `
`) : t2 === "red" ? this.stack.push((this.tree ? l.redTrim : "") + `
`) : typeof t2 == "string" ? this.stack.push(t2 + `
`) : this.stack.push(this.trim + `
`);
    return this;
  }
  Inline(t2, ...r2) {
    let n = this.stack.length > 0 ? this.stack.length - 1 : NaN, u = null;
    return r2.length > 0 && (r2.length === 2 ? (n = r2[0], u = r2[1]) : r2.length === 1 && (typeof r2[0] == "number" ? n = r2[0] : u = r2[0])), n > -1 ? this.stack[n] = this.stack[n].trimEnd() + " " + (u ? u(t2) : t2) + `
` : this.stack.push(this.line + (u ? u(t2) : t2) + `
`), this;
  }
  Insert(t2, r2) {
    return this.stack.push(r2 ? r2(t2) : t2), this;
  }
  Line(t2, r2) {
    return this.type === "error" ? this.Error(t2, r2) : this.type === "warning" ? this.Warn(t2, r2) : (this.stack.push(this.line + (r2 ? r2(t2) : t2) + `
`), this);
  }
  Prefix(t2, ...r2) {
    let n = typeof r2[r2.length - 1] == "function" ? r2.pop() : null, u = n ? r2.map((s2) => n(s2)) : r2, i = ae(t2, ...u);
    return this.stack.push(this.line + i + `
`), this;
  }
  Prepend(t2, r2) {
    return this.type === "error" ? this.NL.Error(t2, r2) : this.type === "warning" ? this.NL.Warn(t2, r2) : this.NL.Line(t2, r2);
  }
  Append(t2, r2) {
    return this.type === "error" ? this.Error(t2, r2) : this.type === "warning" ? this.Warn(t2, r2) : this.Line(t2, r2), this.Newline();
  }
  Error(t2, r2) {
    return this.stack.push((this.tree ? l.red : "") + (r2 ? r2(t2) : k(t2)) + `
`), this;
  }
  Warn(t2, r2) {
    return this.stack.push((this.tree ? l.yellow : "") + (r2 ? r2(t2) : P(t2)), `
`), this;
  }
  Header(t2, r2) {
    return this.stack.push(this.trim + `
` + this.line + (r2 ? r2(t2) : t2) + `
` + this.trim + `
`), this;
  }
  Top(t2, r2 = true) {
    return this.stack.push(Er(t2, r2) + `
`), this;
  }
  End(t2, r2 = true) {
    return this.stack.push(Br(t2, r2)), this;
  }
  Context(t2) {
    return "tree" in t2 || (t2.tree = this.line !== ""), this.stack.push(Ar(t2) + `
`), this;
  }
  Dash(t2, r2) {
    return this.stack.push((this.tree ? this.dash : `${It} `) + (r2 ? r2(t2) : t2) + `
`), this;
  }
  Multiline(...t2) {
    let r2 = typeof t2[0] == "string" ? t2.length === 1 ? t2[0].split(`
`) : t2 : t2[0];
    for (; r2.length !== 0; ) this.stack.push(this.line + r2.shift() + `
`);
    return this;
  }
  Unshift(t2, r2) {
    return r2 || r2 !== null && (this.type === "error" && (r2 = k), this.type === "warning" && (r2 = P)), this.stack.push(this.line + (r2 ? r2(t2) : t2) + `
`), this;
  }
  Wrap(...t2) {
    let r2 = Y;
    return this.type === "error" ? r2 = k : this.type === "warning" && (r2 = P), typeof t2[0] == "string" ? (typeof t2[t2.length - 1] == "function" && (r2 = t2.pop()), this.stack.push(ce(t2, { color: r2, line: this.line }) + `
`)) : Array.isArray(t2[0]) ? (typeof t2[1] == "function" && (r2 = t2.pop()), this.stack.push(ce(t2[0], { color: r2, line: this.line }) + `
`)) : typeof t2[0] == "function" ? (r2 = t2.shift(), this.stack.push(ce(t2, { color: r2, line: this.line }) + `
`)) : Array.isArray(t2[1]) && (r2 = t2[0], this.stack.push(ce(t2[1], { color: r2, line: this.line }) + `
`)), this;
  }
};
function pt(...e2) {
  let t2, r2;
  if (e2.length === 2 ? (t2 = e2[0], r2 = e2[1]) : e2.length === 1 && (typeof e2[0] == "string" ? t2 = e2[0] : r2 = e2[0]), t2) {
    r2 ? r2.id = t2 : r2 = { id: t2 };
    let n = new V(r2);
    return V.store.set(t2, n).get(t2);
  }
  return new V(r2);
}
function uo(e2, t2 = {}) {
  let r2 = Object.assign({ showPercentage: true, barColor: "neonGreen", prepend: l.line, percentColor: "whiteBright", barSize: 40, clearOnComplete: false }, t2), n = 0, u = (c) => typeof r2.prepend == "string" ? r2.prepend + c + " ".repeat(Math.max(0, r2.barSize - c.length)) : c + " ".repeat(Math.max(0, r2.barSize - c.length)), i = (c, p = false) => (p ? "\u25B1" : "\u25B0").repeat(c), s2 = () => {
    r2.clearOnComplete && console.clear();
  };
  return { stop: s2, increment: (c = 1) => {
    let p = n + c;
    n = Math.min(p, e2), n === e2 && s2();
  }, decrement: (c = 1) => {
    let p = n - c;
    n = Math.max(p, 0);
  }, render: (c) => {
    let p = Math.round(n / e2 * r2.barSize), d = i(p), C2 = i(r2.barSize - p, true), m2 = v.default[r2.barColor](d) + F(C2);
    return r2.showPercentage && (m2 += (c || Y)(` ${String(Math.round(n / e2 * 100))}%`)), u(m2);
  }, reset: (c) => {
    typeof c == "number" && (e2 = c), n !== 0 && (n = 0);
  }, get percent() {
    return n;
  } };
}
var ht = class {
  lines = [];
  maxHeight;
  content;
  newline;
  position = 0;
  prefix;
  suffix;
  empty;
  wrap = { hard: false, trim: true, wordWrap: true };
  options = { input: void 0, newline: true, height: process.stdout.rows - 20, width: process.stdout.columns - 20, wrap: false, tree: false, xPos: 0, yPos: 0 };
  get height() {
    return this.options.height;
  }
  get width() {
    return this.options.width;
  }
  get x() {
    return this.options.xPos;
  }
  set x(t2) {
    this.options.xPos = t2;
  }
  get y() {
    return this.options.yPos;
  }
  set y(t2) {
    this.options.yPos = t2;
  }
  constructor(t2) {
    Object.assign(this.options, t2), this.prefix = this.options.tree ? l.line : "", this.suffix = this.options.newline ? `
` : "", this.empty = g(Array(this.width).fill(be)), typeof this.options.input == "string" ? this.content = this.options.input : (this.content = g.nl(this.options.input), this.lines = this.options.input), this.options.height = "height" in t2 ? t2.height : this.content.split(`
`).length, this.maxHeight = this.content.split(`
`).length - this.options.height - 1;
  }
  setKeypress(t2, r2) {
    return process.stdin.setRawMode(true), readline.emitKeypressEvents(process.stdin), process.stdin.on("keypress", (n, u) => {
      if (u.sequence === "" || u.sequence === "" || u.sequence === "") process.exit(0);
      else if (u.name === "up") {
        if (this.position === 0) return;
        this.scroll(-2).print(), process.stdout.cursorTo(0, t2 + 2);
      } else if (u.name === "down") {
        if (this.position >= r2) return;
        this.scroll(2).print(), process.stdout.cursorTo(0, t2 + 2);
      }
    });
  }
  setContent(t2) {
    return this.content = t2, this.resetLines(), this;
  }
  setPosition(t2 = {}) {
    return "x" in t2 && (this.x = t2.x), "y" in t2 && (this.y = t2.y), this.resetLines(), this;
  }
  setSize(t2) {
    return "width" in t2 && (this.options.width = t2.width), "height" in t2 && (this.options.height = t2.height), this.resetLines(), this;
  }
  setWrap(t2) {
    return typeof t2 == "boolean" ? this.options.wrap = t2 : (this.options.wrap || (this.options.wrap = true), Object.assign(this.wrap, t2)), this.options.wrap && this.resetLines(), this;
  }
  print() {
    this.lines.length === 0 && this.splitContentIntoLines(), this.clear(), process.stdout.cursorTo(this.x, this.y);
    for (let t2 = 0; t2 < this.height; t2++) {
      let r2 = this.lines[t2 + this.position];
      process.stdout.write(this.prefix + (r2 ?? this.empty) + this.suffix);
    }
    return this;
  }
  scroll(t2) {
    return this.position += t2, this;
  }
  clear() {
    process.stdout.cursorTo(this.x, this.y);
    for (let t2 = 0; t2 < this.height; t2++) process.stdout.cursorTo(this.x), process.stdout.write(this.empty + `
`);
    return this;
  }
  resetLines() {
    this.lines = [], this.position = 0;
  }
  splitContentIntoLines() {
    this.content && (this.options.wrap ? this.lines = O(this.content, this.width, this.wrap).split(`
`) : this.lines = this.content.split(`
`));
  }
};
function Fo(e2) {
  return new ht(e2);
}
var A = function(e2, t2, r2) {
  return ee(t2) ? t2.replace(/(?:\u001b\[[;\d]+m)([\s\S]*?)(?=\u001b)/g, function(n, u) {
    let i = u.trim().replace(/([^a-z0-9\s]+)/g, "\\$1"), s2 = new RegExp(`(${i})`, "g");
    return n.replace(s2, (D) => D === xe ? D : D.replace(e2, r2("$1")));
  }) : t2.replace(e2, r2("$1"));
};
A.stream = (e2) => (...t2) => {
  let r2 = e2;
  for (let n of t2) r2 = n(r2);
  return r2;
};
A.quoted = (e2, t2) => A.stream(e2)((r2) => r2.replace(/\B'(?:(?!'\B).)+'/g, t2), (r2) => r2.replace(/\B"(?:(?!"\B).)+"/g, t2));
A.url = (e2, t2) => e2.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, (r2) => {
  let n = q("$1");
  return /^(https?:\/\/|www\.)[./:0-9A-Za-z-]+$/.test(n) ? t2(n) : r2;
});
A.punctuation = (e2, t2) => A(/([|$[\]{}<>:-]+)/, e2, t2);
A.numbers = (e2, t2) => A(/([\d]+)/g, e2, t2);
A.braces = (e2, t2) => e2.replace(/[{}]+/g, (r2) => t2(r2));
A.angles = (e2, t2) => e2.replace(/[<>]+/g, (r2) => t2(r2));
A.brackets = (e2, t2) => A(/([[\]]+)/g, e2, t2);
A.pipes = (e2, t2) => e2.replace(/[|]+/g, (r2) => t2(r2));
A.colons = (e2, t2) => e2.replace(/[:]+/g, (r2) => t2(r2));
A.dash = (e2, t2) => e2.replace(/[-]+/g, (r2) => t2(r2));
A.commas = (e2, t2) => e2.replace(/[,]+/g, (r2) => t2(r2));
A.dollar = (e2, t2) => e2.replace(/[$]+/g, (r2) => t2(r2));
v.Ansis;
var LINUX = process2__default.default.platform === "linux";
var WINDOWS = process2__default.default.platform === "win32";
var SIGNALS = [
  "SIGABRT",
  "SIGALRM",
  "SIGHUP",
  "SIGINT",
  "SIGTERM"
];
if (!WINDOWS) {
  SIGNALS.push(
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
  );
}
if (LINUX) {
  SIGNALS.push(
    "SIGIO",
    "SIGPOLL",
    "SIGPWR",
    "SIGSTKFLT",
    "SIGUNUSED"
  );
}
var kill = function(callback) {
  kill.hooks.add(callback);
  if (!kill.setup) {
    kill.setup = true;
    process2__default.default.once("exit", () => hook());
    for (const signal of SIGNALS) {
      try {
        process2__default.default.once(signal, () => hook(signal));
      } catch {
      }
    }
  }
  return () => kill.hooks.delete(callback);
};
kill.hooks = /* @__PURE__ */ new Set();
kill.setup = false;
kill.fired = false;
kill.exit = function(code = 0) {
  if (code > 0) {
    kill.hooks.clear();
    process2__default.default.exit(code);
  }
  const done = () => {
    if (kill.hooks.size > 0) kill.hooks.clear();
    process2__default.default.exit(code);
  };
  const wait = [];
  kill.hooks.forEach((hook2) => types.isAsyncFunction(hook2) ? wait.push(hook2()) : hook2());
  Promise.allSettled(wait).finally(done);
};
function hook(signal) {
  if (kill.fired === true) return;
  const wait = [];
  const done = () => {
    if (signal) {
      if (WINDOWS && (signal !== "SIGINT" && signal !== "SIGTERM" && signal !== "SIGKILL")) {
        process2__default.default.kill(process2__default.default.pid, "SIGTERM");
      } else {
        process2__default.default.kill(process2__default.default.pid, signal);
      }
    }
  };
  kill.fired = true;
  kill.hooks.forEach((cb) => types.isAsyncFunction(cb) ? wait.push(cb()) : cb());
  Promise.allSettled(wait).finally(done);
}
var prexit = function(...params2) {
  let id;
  let callback;
  if (params2.length === 3) {
    [id, callback, prexit.code] = params2;
  } else if (params2.length === 2) {
    if (typeof params2[0] === "string") {
      [id, callback] = params2;
    } else {
      callback = params2[0];
      id = callback.name || Date.now().toString();
      prexit.code = params2[1];
    }
  } else if (params2.length === 1) {
    callback = params2[0];
    id = callback.name || Date.now().toString();
  }
  if (callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }
    prexit.hooks.set(id, callback);
  }
  if (!prexit.setup) {
    prexit.setup = true;
    readline__default.default.emitKeypressEvents(process2__default.default.stdin);
    if (process2__default.default.stdin.isTTY) process2__default.default.stdin.setRawMode(true);
    process2__default.default.stdin.resume();
    process2__default.default.stdin.on("keypress", async (_, key) => {
      if (prexit.fired) return;
      if (prexit.intercept["escape"] && key.sequence === "\x1B" || prexit.intercept["ctrl+c"] && key.sequence === "" || prexit.intercept["ctrl+d"] && key.sequence === "" || prexit.intercept["ctrl+z"] && key.sequence === "") {
        await hooks();
      }
    });
  }
  return id ? () => prexit.hooks.delete(id) : () => false;
};
prexit.hooks = /* @__PURE__ */ new Map();
prexit.code = 130;
prexit.setup = false;
prexit.fired = false;
prexit.intercept = {
  "escape": true,
  "ctrl+c": true,
  "ctrl+d": false,
  "ctrl+z": false
};
prexit.listener = (handler) => {
  if (!prexit.setup) {
    prexit();
  }
  process2__default.default.stdin.on("keypress", handler);
};
async function hooks() {
  if (prexit.fired) return;
  prexit.fired = true;
  const promises = [];
  for (const [id, hook2] of prexit.hooks) {
    try {
      const result = hook2();
      if (types.isAsyncFunction(hook2)) {
        promises.push(result);
      } else if (result instanceof Promise) {
        promises.push(result);
      }
    } catch (err) {
      console.error(`Error in hook ${id}:`, err);
    }
  }
  await Promise.allSettled(promises);
  process2__default.default.exit(prexit.code);
}
var import_timer3 = __toESM(require_dist());

// packages/update/dist/index.mjs
var w2 = /^(\d+)\.(\d+)\.(\d+)(-([a-z]+)(?:\.(\d+))?)?$/i;
function C(o2, a2, n) {
  let i = (s2) => {
    let e2 = s2.match(w2);
    if (!e2) throw new Error(`Invalid version format: ${s2}`);
    return { parts: [parseInt(e2[1], 10), parseInt(e2[2], 10), parseInt(e2[3], 10)], release: e2[5] || "latest", preRelease: e2[5] ? `${e2[5]}${e2[6] ? `.${e2[6]}` : ""}` : void 0, stage: e2[5] ? parseInt(e2[6] || "0", 10) : null };
  }, p = (s2, e2) => {
    if (!s2 && !e2) return { comparison: 0, step: false };
    if (!s2) return { comparison: 1, step: false };
    if (!e2) return { comparison: -1, step: false };
    let [u, h = "0"] = s2.split("."), [$2, y2 = "0"] = e2.split("."), m2 = n[u.toLowerCase()] || 0, g3 = n[$2.toLowerCase()] || 0;
    if (m2 !== g3) return { comparison: m2 - g3, step: false };
    let f = Number(h) - Number(y2);
    return { comparison: f, step: f !== 0 };
  }, r2 = i(o2), t2 = i(a2), d = () => {
    for (let e2 = 0; e2 < 3; e2++) if (r2.parts[e2] - t2.parts[e2] !== 0) return e2 === 0 ? "major" : e2 === 1 ? "minor" : "patch";
    return p(r2.preRelease, t2.preRelease).comparison !== 0, "patch";
  };
  if (r2.preRelease === t2.preRelease) {
    if (r2.parts.every((s2, e2) => s2 === t2.parts[e2])) return false;
    if (Number(r2.parts.join("")) > Number(t2.parts.join(""))) throw new Error(`Current version is greater than registry version: ${o2} > ${a2}`);
  }
  let l2 = d(), c = p(r2.preRelease, t2.preRelease), b = l2 === "major" || (n[r2.release.toLowerCase()] || 0) < (n[t2.release.toLowerCase()] || 0) || c.comparison > 0 || t2.stage > r2.stage, R2 = r2.preRelease && t2.preRelease ? r2.release === t2.release ? `${r2.release}.${r2.stage} \u2192 ${t2.release}.${t2.stage}` : `${r2.release} \u2192 ${t2.release}` : r2.preRelease ? `${r2.release} \u2192 latest` : `latest \u2192 ${t2.release}`;
  return { change: l2, bump: R2, release: t2.release, breaking: b, step: c.step, current: o2, registry: a2, parse: { get current() {
    return { major: r2.parts[0], minor: r2.parts[1], patch: r2.parts[2], release: r2.release, stage: r2.stage };
  }, get registry() {
    return { major: t2.parts[0], minor: t2.parts[1], patch: t2.parts[2], release: t2.release, stage: t2.stage };
  } } };
}
async function I(o2) {
  let a2 = new AbortController();
  kill(() => a2.abort());
  try {
    return (await (await fetch(`https://registry.npmjs.org/${o2}`, { signal: a2.signal })).json()).version;
  } catch {
    return null;
  }
}
async function v2(o2, a2, { tag: n = "latest", priorities: i = void 0 } = {}) {
  var _a14;
  if (!((_a14 = process == null ? void 0 : process.stdout) == null ? void 0 : _a14.isTTY)) return;
  let p = await I(`${o2}/${n}`);
  return p === null ? false : C(a2, p, { alpha: 1, beta: 2, rc: 3, ...i });
}
var N2 = v2;
var import_timer2 = __toESM(require_dist());
var import_timer = __toESM(require_dist());

// syncify/utils/const.ts
var DIST_PATH = "@syncify/cli/dist/";
var READ_WRITE_OWNER = 493;
var HOT_SNIPPET = "hot.js.liquid";
var HOT_SOURCE = "hot-snippet";
var HOT_SNIPPET_KEY = "snippets/hot.js.liquid";
var JS_TS_CONFIGS = [
  "tsconfig.json",
  "jsconfig.json"
];
var COMMAND_MODES = /* @__PURE__ */ new Set([
  "init",
  "create",
  "build",
  "watch",
  "pack",
  "push",
  "pull",
  "publish",
  "version",
  "keychain",
  "projects",
  "link",
  "git",
  "help",
  "prune",
  "doctor",
  "inspect"
]);
var HOT_SOCKET_TOPICS = [
  "alias",
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
var SYNCIFY_CONFIG = [
  "syncify.config.ts",
  "syncify.config.js",
  "syncify.config.mjs",
  "syncify.config.cjs",
  "syncify.config.json"
];
var TARGET_FILES = [
  "theme.toml",
  "theme.yaml",
  "theme.yml"
];
var CACHE_FILES = [
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
  ["input", "source"],
  ["output", "theme"],
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
  "blocks",
  "snippets",
  "templates",
  "metaobject",
  "metafields",
  "pages",
  "redirects"
];
var THEME_KEYS = [
  "assets",
  "config",
  "layout",
  "customers",
  "locales",
  "sections",
  "blocks",
  "snippets",
  "templates",
  "metaobject"
];
var BUILD_GROUPS = [
  "styles",
  "scripts",
  "svgs",
  "sections",
  "layouts",
  "blocks",
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
  "blocks",
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
var UNITS = [
  "b",
  "kb",
  "mb",
  "gb",
  "tb"
];
var STRAP_THEMES = [
  ["dusk", "    Stripped down skeleton theme structure"],
  ["dawn", "    The official Shopify slop using Syncify"],
  ["silk", "    Advanced Hybrid with SPX and mithril.js", true],
  ["hexx", "    Intermediate starting point with basics", true]
];
var STRAP_EXAMPLES = [
  ["using-paths", "       Strap with paths usage"],
  ["using-rename", "      Strap with rename usage"],
  ["using-sass", "        Strap with sass transform"],
  ["using-schema", "      Strap using Shared Schema"],
  ["using-tailwind", "    Strap using Tailwind transform"],
  ["using-typescript", "  Strap using TypeScript transform"]
];
var REGEX_HOT_SNIPPET = /{%-?\s*render\s*['"]hot\.js['"]\s*-?%}/;

// syncify/model/defaults.ts
var defaults = () => ({
  input: "source",
  output: "theme",
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
      stripComments: false,
      sortArrays: false,
      sortObjects: false,
      noSortList: [],
      terse: false
    },
    liquid: {
      terse: false
    }
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
});

// syncify/model/extends.ts
var Stores = class _Stores extends Array {
  static map = o();
  /**
   * Returns the first store entry
   */
  get default() {
    return this[0];
  }
  /**
   * Extended implementation of `[].push()` which will allow store name querying.
   */
  push(store) {
    const index = super.push(store);
    _Stores.map[store.name] = index - 1;
    return index;
  }
  /**
   * Update a store record by name
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.set('bar', { token: 'abcdefg' })
   */
  set(name, store) {
    const index = _Stores.map[name];
    return index !== void 0 ? assign(this[index], store) : void 0;
  }
  /**
   * Get store by name, e.g:
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.get('bar') // equivalent of $.stores[1]
   */
  get(name) {
    const index = _Stores.map[name];
    return index !== void 0 ? this[index] : void 0;
  }
  /**
   * Does store exist by name
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.has('bar') // equivalent of $.stores[1]
   */
  has(name) {
    const index = _Stores.map[name];
    return index !== void 0 && this[index] !== void 0;
  }
};
var Targets = class _Targets extends Array {
  static raw = o();
  static map = o();
  get raw() {
    return _Targets.raw;
  }
  set raw(raw) {
    _Targets.raw = raw;
  }
  /**
   * Returns the first entry in the stack
   */
  get default() {
    return this[0];
  }
  /**
   * Generate a uid MurMur hash, can be used in isolation
   */
  uid(storeName, themeId) {
    return murmur(storeName, themeId);
  }
  /**
   * Extends push and assigns the `Targets.map` name query helper.
   */
  push(theme2) {
    const index = super.push(theme2);
    _Targets.map[theme2.uid] = index - 1;
    return index;
  }
  /**
   * Updates a theme target in the stack based
   */
  set(uid, theme2) {
    const index = _Targets.map[uid];
    return index !== void 0 ? assign(this[index], theme2) : void 0;
  }
  /**
   * Get a theme target in the stack
   */
  get(uid) {
    const index = _Targets.map[uid];
    return index !== void 0 ? this[index] : void 0;
  }
  /**
   * Whether or not theme exists in the stack
   */
  has(uid) {
    const index = _Targets.map[uid];
    return index !== void 0 && this[index] !== void 0;
  }
};

// syncify/model/plugins.ts
var plugins = () => ({
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
});

// syncify/model/processor.ts
var processor = () => ({
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
  svgo: {
    multipass: true,
    js2svg: {
      indent: 2,
      pretty: true
    },
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false
          }
        }
      }
    ]
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/.pnpm/p-timeout@6.1.4/node_modules/p-timeout/index.js
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
  let timer16;
  let abortHandler;
  const wrappedPromise = new Promise((resolve2, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      abortHandler = () => {
        reject(getAbortedReason(signal));
      };
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve2, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer16 = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve2(fallback());
        } catch (error2) {
          reject(error2);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve2();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve2(await promise);
      } catch (error2) {
        reject(error2);
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
    customTimers.clearTimeout.call(void 0, timer16);
    timer16 = void 0;
  };
  return cancelablePromise;
}

// node_modules/.pnpm/p-queue@8.1.0/node_modules/p-queue/dist/lower-bound.js
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it2 = first + step;
    if (comparator(array[it2], value) <= 0) {
      first = ++it2;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}

// node_modules/.pnpm/p-queue@8.1.0/node_modules/p-queue/dist/priority-queue.js
var _queue;
var PriorityQueue = class {
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
      id: options.id,
      run
    };
    if (this.size === 0 || __privateGet(this, _queue)[this.size - 1].priority >= options.priority) {
      __privateGet(this, _queue).push(element);
      return;
    }
    const index = lowerBound(__privateGet(this, _queue), element, (a2, b) => b.priority - a2.priority);
    __privateGet(this, _queue).splice(index, 0, element);
  }
  setPriority(id, priority) {
    const index = __privateGet(this, _queue).findIndex((element) => element.id === id);
    if (index === -1) {
      throw new ReferenceError(`No promise function with the id "${id}" exists in the queue.`);
    }
    const [item] = __privateGet(this, _queue).splice(index, 1);
    this.enqueue(item.run, { priority, id });
  }
  dequeue() {
    const item = __privateGet(this, _queue).shift();
    return item == null ? void 0 : item.run;
  }
  filter(options) {
    return __privateGet(this, _queue).filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __privateGet(this, _queue).length;
  }
};
_queue = new WeakMap();

// node_modules/.pnpm/p-queue@8.1.0/node_modules/p-queue/dist/index.js
var _carryoverConcurrencyCount, _isIntervalIgnored, _intervalCount, _intervalCap, _interval, _intervalEnd, _intervalId, _timeoutId, _queue2, _queueClass, _pending, _concurrency, _isPaused, _throwOnTimeout, _idAssigner, _PQueue_instances, doesIntervalAllowAnother_get, doesConcurrentAllowAnother_get, next_fn, onResumeInterval_fn, isIntervalPaused_get, tryToStartAnother_fn, initializeIntervalIfNeeded_fn, onInterval_fn, processQueue_fn, throwOnAbort_fn, onEvent_fn;
var PQueue = class extends import_index.default {
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    var _a14, _b12;
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
    // Use to assign a unique identifier to a promise function, if not explicitly specified
    __privateAdd(this, _idAssigner, 1n);
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
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${((_a14 = options.intervalCap) == null ? void 0 : _a14.toString()) ?? ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${((_b12 = options.interval) == null ? void 0 : _b12.toString()) ?? ""}\` (${typeof options.interval})`);
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
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    __privateSet(this, _concurrency, newConcurrency);
    __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
  }
  /**
      Updates the priority of a promise function by its id, affecting its execution order. Requires a defined concurrency limit to take effect.
  
      For example, this can be used to prioritize a promise function to run earlier.
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 0, id: '🦀'});
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦄', {priority: 1});
  
      queue.setPriority('🦀', 2);
      ```
  
      In this case, the promise function with `id: '🦀'` runs second.
  
      You can also deprioritize a promise function to delay its execution:
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 1, id: '🦀'});
      queue.add(async () => '🦄');
      queue.add(async () => '🦄', {priority: 0});
  
      queue.setPriority('🦀', -1);
      ```
      Here, the promise function with `id: '🦀'` executes last.
      */
  setPriority(id, priority) {
    __privateGet(this, _queue2).setPriority(id, priority);
  }
  async add(function_, options = {}) {
    options.id ?? (options.id = (__privateWrapper(this, _idAssigner)._++).toString());
    options = {
      timeout: this.timeout,
      throwOnTimeout: __privateGet(this, _throwOnTimeout),
      ...options
    };
    return new Promise((resolve2, reject) => {
      __privateGet(this, _queue2).enqueue(async () => {
        var _a14;
        __privateWrapper(this, _pending)._++;
        __privateWrapper(this, _intervalCount)._++;
        try {
          (_a14 = options.signal) == null ? void 0 : _a14.throwIfAborted();
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), { milliseconds: options.timeout });
          }
          if (options.signal) {
            operation = Promise.race([operation, __privateMethod(this, _PQueue_instances, throwOnAbort_fn).call(this, options.signal)]);
          }
          const result = await operation;
          resolve2(result);
          this.emit("completed", result);
        } catch (error2) {
          if (error2 instanceof TimeoutError && !options.throwOnTimeout) {
            resolve2();
            return;
          }
          reject(error2);
          this.emit("error", error2);
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
_idAssigner = new WeakMap();
_PQueue_instances = new WeakSet();
doesIntervalAllowAnother_get = function() {
  return __privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalCount) < __privateGet(this, _intervalCap);
};
doesConcurrentAllowAnother_get = function() {
  return __privateGet(this, _pending) < __privateGet(this, _concurrency);
};
next_fn = function() {
  __privateWrapper(this, _pending)._--;
  __privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this);
  this.emit("next");
};
onResumeInterval_fn = function() {
  __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  __privateMethod(this, _PQueue_instances, initializeIntervalIfNeeded_fn).call(this);
  __privateSet(this, _timeoutId, void 0);
};
isIntervalPaused_get = function() {
  const now = Date.now();
  if (__privateGet(this, _intervalId) === void 0) {
    const delay2 = __privateGet(this, _intervalEnd) - now;
    if (delay2 < 0) {
      __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
    } else {
      if (__privateGet(this, _timeoutId) === void 0) {
        __privateSet(this, _timeoutId, setTimeout(() => {
          __privateMethod(this, _PQueue_instances, onResumeInterval_fn).call(this);
        }, delay2));
      }
      return true;
    }
  }
  return false;
};
tryToStartAnother_fn = function() {
  if (__privateGet(this, _queue2).size === 0) {
    if (__privateGet(this, _intervalId)) {
      clearInterval(__privateGet(this, _intervalId));
    }
    __privateSet(this, _intervalId, void 0);
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
};
initializeIntervalIfNeeded_fn = function() {
  if (__privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalId) !== void 0) {
    return;
  }
  __privateSet(this, _intervalId, setInterval(() => {
    __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  }, __privateGet(this, _interval)));
  __privateSet(this, _intervalEnd, Date.now() + __privateGet(this, _interval));
};
onInterval_fn = function() {
  if (__privateGet(this, _intervalCount) === 0 && __privateGet(this, _pending) === 0 && __privateGet(this, _intervalId)) {
    clearInterval(__privateGet(this, _intervalId));
    __privateSet(this, _intervalId, void 0);
  }
  __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
  __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
};
/**
Executes all queued functions until it reaches the limit.
*/
processQueue_fn = function() {
  while (__privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this)) {
  }
};
throwOnAbort_fn = async function(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(signal.reason);
    }, { once: true });
  });
};
onEvent_fn = async function(event2, filter) {
  return new Promise((resolve2) => {
    const listener = () => {
      if (filter && !filter()) {
        return;
      }
      this.off(event2, listener);
      resolve2();
    };
    this.on(event2, listener);
  });
};

// syncify/model/queue.ts
var q2 = new class Enqueue {
  /**
   * Cache Queue
   *
   * Cache specific queue
   */
  cache = new PQueue();
  /**
   * Bulk Queue
   *
   * Used in `watch` mode for batch requests.
   */
  bulk = new PQueue({ concurrency: 1 });
  /**
   * Change Queue
   *
   * Used in `watch` mode for single file changes.
   */
  change = new PQueue();
  /**
   * Task Queue
   *
   * Holds various different operations that can be queue executed
   */
  tasks = new PQueue();
  /**
   * HTTP Queue
   *
   * HTTP Request Queue which performs requests in 1000ms (10 per-cap) intervals. This ensures
   * that requests stay within bounds of limits imposed by Shopify. It does not take into
   * account plan based usage limits, which needs to be addressed in later versions.
   */
  http = new PQueue({ interval: 1e3, intervalCap: 10 });
}();

// syncify/model/$.ts
var $ = new class Bundle {
  /**
   * The users configuration settings merged with defaults
   */
  static config = defaults();
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
   *
   * > When `null` there is no `package.json` file present in the project.
   */
  static package = null;
  /**
   * The package manager used
   */
  static pm = null;
  /**
   * Cache interface
   */
  static cache = o();
  /**
   * The user platform OS
   */
  platform = node_os.platform();
  /**
   * The Syncify Github Repository
   */
  github = "https://github.com/panoply/syncify.git";
  /**
   * The version of Syncify running
   */
  version = "1.0.0-alpha.1";
  /**
   * **READY AT RUNTIME**
   *
   * Home or temporary directory if home fails
   *
   * @example
   * '/Users/sissel/.syncify'
   */
  home = path2.join(node_os.homedir(), ".syncify");
  /**
   * The provided command passed on the CLI.
   *
   * > The references sliced[2] copy of `process.argv`
   */
  argv;
  /**
   * The path to node.js binary
   */
  node;
  /**
   * The path to the script binary being run
   */
  bin;
  /**
   * Model representing the shopify stores
   */
  stores = new Stores();
  /**
   * Model representing the shopify themes
   * Each theme can access their associated {@link Stores}
   */
  target = new Targets();
  /**
   * Cache copy of the invoked commands in which syncify was started.
   * By default, this structure will assign `target` and `filter` entries
   * only, as they are parsed and handled in their own respective define
   * operations.
   */
  cmd = o({
    target: [],
    filter: [],
    batch: 16
  });
  /**
   * Whether or not synicfy is running.
    */
  running = false;
  /**
   * Event Name emitter reference
   */
  event = null;
  /**
   * **READY AT RUNTIME**
   *
   * The current working directory
   *
   * @example
   * '/Users/sissel/projects/site-name'
   */
  cwd = process2.cwd();
  /**
   * **READY AT RUNTIME**
   *
   * Encoded checksum of the CWD
   *
   * @example
   * 'eb4e712f2f3970b7'
   */
  hash = checksum(this.cwd);
  /**
   * **READY AT RUNTIME**
   *
   * Root directory base
   *
   * @example
    * '/Users/sissel/.syncify/eb4e712f2f3970b7'
    */
  root = path2.join(this.home, this.hash);
  /**
   * Base directory path references. These are fully resolved absolute URI
   * paths pointing to all base directory locations, included cached locations.
   */
  dirs = o({
    module: null,
    input: null,
    output: null,
    config: this.cwd,
    hot: path2.join(this.root, "hot"),
    cache: path2.join(this.root, "cache"),
    temp: path2.join(this.root, "temp"),
    versions: path2.join(this.root, "versions"),
    sourcemaps: {
      root: path2.join(this.root, "sourcemaps"),
      scripts: path2.join(this.root, "sourcemaps", "scripts"),
      styles: path2.join(this.root, "sourcemaps", "styles")
    }
  });
  /**
   * Configuration file path resolutions for `syncify.config` and `package.json`
   * and other required files.
   */
  file = o({
    keychain: path2.join(this.home, ".keychain"),
    pkg: path2.join(this.cwd, "package.json"),
    notifier: path2.join(this.home, "icon.png"),
    project: null,
    tsconfig: null,
    targets: null,
    env: null,
    config: null,
    githook: null
  });
  /**
   * Global keychain for store access tokens stored in home
   */
  keychain = null;
  /**
   * The project store which references the parsed cache project file. This reference
   * is a `Proxy` type and will apply atomic writes to the project cache file.
   * The data this reference holds lives in the root project location of the users OS.
   *
   * > This will be `null` and populated at runtime in one of the first operations to occur.
   */
  project = null;
  /**
   * The installation binary being used
   */
  using = null;
  /**
   * Process Child
   */
  process = null;
  /**
   * Whether or not to restart process
   */
  restart = false;
  /**
   * Websockets HOT reloading instance
   *
   * @default null
   */
  wss = null;
  /**
   * Stats information for the output directory
   *
   * @default null
   */
  stats = o();
  /**
   * CLI provided filters
   *
   * @default null
   */
  filters = o();
  /**
   * Error store, holds reference to errors. Map key is {@link File}
   * and values are an array list of string error messages.
   *
   * @default Map<File, string>
   */
  errors = m();
  /**
   * Error stack store. Used in some instances where stack-trace is
   * required and reference is to exist. Stacks are temporary.
   *
   * @default Set<string>
   */
  stacks = s();
  /**
   * Error store, holds reference to errors
   *
   * The file uri input path - The `Map` will hold
   * process identifier and a `Set` of stack messages.
   *
   * @default
   * {}
   */
  warnings = m();
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
  paths = paths();
  /**
   * Stash Import paths
   *
   * Used in `pull` modes and assigns the locations to files that are unresolvable.
   * This will only be assigned and populated in certain modes.
   */
  stash = o({
    assets: null,
    blocks: null,
    config: null,
    customers: null,
    layout: null,
    locales: null,
    metaobject: null,
    sections: null,
    snippets: null,
    templates: null
  });
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
  env = o({
    dev: true,
    cli: false,
    tree: true,
    // TODO - REMOVE THIS
    prod: false,
    ready: false,
    sync: 0,
    vars: null
  });
  git = {};
  /**
   * Version Control settings
   */
  vc = o({
    cache: null,
    source: 1,
    dir: null,
    number: null,
    zip: null,
    patch: 0,
    major: 0,
    minor: 0,
    update: null
  });
  /**
   * Hot reload mode options - Use the `mode.hot` reference to
   * determine whether or not HOT reloading is enabled.
   */
  hot = o({
    source: null,
    route: null,
    ready: false,
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
    version: o({
      source: null,
      remote: null,
      local: "0.4.9"
    }),
    flags: o({
      "no-preview-bar": true,
      "no-checkout-preloads": false,
      "no-perfkit": false,
      "no-trekkie": false,
      "no-shopify-features": false,
      "no-web-pixels-manager": false
    }),
    cache: o({
      root: null,
      snippet: null,
      layouts: []
    }),
    alive: o({
      snippet: false,
      layouts: o()
    })
  });
  /**
   * Log state and console references
   */
  log = o({
    idle: false,
    group: "Syncify",
    mode: null,
    title: "",
    uri: "",
    queue: s(),
    changes: m()
  });
  /**
   * Bulk batch model - used when performing bulk operations in `watch` mode.
   */
  bulk = o({
    id: null,
    group: "",
    files: 0,
    type: null,
    synced: s()
  });
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = o({
    _: null,
    align: false,
    bind: false,
    build: false,
    clean: false,
    debug: false,
    bulk: false,
    create: false,
    doctor: false,
    dev: false,
    pack: false,
    force: false,
    git: false,
    help: false,
    hot: false,
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
    init: false,
    setup: false,
    suggest: false,
    terse: false,
    link: false,
    unpublished: false,
    version: false,
    watch: false
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
  section = o({
    schema: null,
    shared: m(),
    template: o()
  });
  /**
   * Page transforms
   *
   * Populated during the setPages options generation
   */
  page = null;
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
  liquid = o({
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
  });
  /**
   * Liquid Transforms
   *
   * @default []
   */
  json = o({
    crlf: false,
    cache: null,
    stripComments: false,
    exclude: null,
    indent: 2,
    useTab: false,
    sortObjects: false,
    sortArrays: [],
    noSortList: [],
    options: {
      indentSize: 2,
      useTab: false,
      crlf: false,
      arrays: false,
      objects: false,
      removeComments: false,
      exclude: []
    },
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
  });
  /**
  * Returns the {@link Bundle.cache} static model
  */
  get cache() {
    return Bundle.cache;
  }
  /**
   * Returns the {@link Bundle.cache.checksum} static model
   */
  get checksum() {
    return Bundle.cache.checksum;
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
    Bundle.config = merge(Bundle.config, data);
  }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config() {
    return Bundle.config;
  }
  /**
   * Returns the `package.json` contents
   */
  get pkg() {
    return Bundle.package;
  }
  /**
   * Set the `package.json` contents
   */
  set pkg(pkg) {
    Bundle.package = pkg;
  }
  /**
   * Returns the `package.json` contents
   */
  get pm() {
    return Bundle.pm === null ? pm() : Bundle.pm;
  }
  /**
   * Set the `package.json` contents
   */
  set pm(manager) {
    Bundle.pm = manager;
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
    return ue();
  }
}();

// syncify/utils/utils.ts
var command = node_util.promisify(node_child_process.exec);
var NooP = () => {
};
var assign = Object.assign;
var defineProperty = Object.defineProperty;
var keys = Object.keys;
var values = Object.values;
var toArray = Array.from;
var toBuffer = Buffer.from;
var { toString } = Object.prototype;
var isBuffer = Buffer.isBuffer;
function type(input) {
  if (input === null) return "null";
  if (input === void 0) return "undefined";
  if (isNaN2(input)) return "NaN";
  if (isBuffer(input)) return "Buffer";
  const result = toString.call(input).slice(8, -1);
  return result === "AsyncFunction" ? "Promise" : result;
}
function isNil(input) {
  return input === void 0 || input === null;
}
function isEmptyString(input) {
  if (isBuffer(input)) return input.toString().trim().length === 0;
  return input.trim().length === 0;
}
function isEmpty(input) {
  if (isObject(input)) {
    for (const _ in input) return false;
    return true;
  }
  if (isArray(input)) return input.length === 0;
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN2(input)) return true;
  return !input;
}
function isArray(param) {
  return Array.isArray(param);
}
function isObject(param) {
  return toString.call(param).slice(8, -1) === "Object";
}
function isString(param) {
  return toString.call(param).slice(8, -1) === "String";
}
function isRegex(param) {
  return toString.call(param).slice(8, -1) === "RegExp";
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
  return param === null;
}
function isUndefined(param) {
  return typeof param === "undefined" && param === void 0;
}
function last(input) {
  return input[input.length - 1];
}
function paths() {
  return reduce(PATH_KEYS, (state, p) => {
    state[p] = o({
      input: null,
      match: null,
      config: null,
      rename: []
    });
    return state;
  }, o({ transforms: m() }));
}
function pm() {
  if (!process2.env.npm_config_user_agent) return "?";
  const userAgent = process2.env.npm_config_user_agent;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return name === "npminstall" ? "cnpm" : name;
}
function o(input) {
  return input ? Object.assign(/* @__PURE__ */ Object.create(null), input) : /* @__PURE__ */ Object.create(null);
}
function s(value) {
  return new Set(value);
}
function m(input) {
  return new Map(input);
}
function checksum(input, outputLength = -1) {
  const hash = outputLength > -1 ? node_crypto.createHash("shake256", { outputLength }) : node_crypto.createHash("md5");
  return hash.update(input).digest("hex");
}
async function openInEditor(filePath) {
  return new Promise((resolve2, reject) => {
    try {
      const process4 = node_child_process.spawn($.project.textEditor, [filePath], {
        stdio: "ignore",
        detached: true
      });
      process4.unref();
      resolve2(true);
    } catch (error2) {
      reject(new Error(`Failed to open file: ${error2.message}`));
    }
  });
}
function getChunk(array, perChunk = 2) {
  return array.reduce((acc, item, index) => {
    const ci2 = Math.floor(index / perChunk);
    if (!acc[ci2]) acc[ci2] = [];
    acc[ci2].push(item);
    return acc;
  }, []);
}
function includes(a2, list2) {
  let index = -1;
  const size = list2.length;
  while (++index < size) {
    if (String(list2[index]) === String(a2)) return true;
  }
  return false;
}
function hasPath(path5, param) {
  if (isNil(param)) return false;
  if (isObject(param) === false) return false;
  let object = param;
  let counter = 0;
  const props = path5.split(".");
  while (counter < props.length) {
    if (isNil(object)) return false;
    if (object[props[counter]] === null) return false;
    object = object[props[counter]];
    counter++;
  }
  return object !== void 0;
}
function has(prop, object) {
  return isObject(object) ? prop in object : false;
}
function inProp(prop, object) {
  return prop in object;
}
function hasProp(object) {
  const isObj = isObject(object);
  return (prop) => isObj ? prop in object : false;
}
function pathOr(object, path5, fallback) {
  const keys2 = isString(path5) ? path5.split(".") : path5;
  if (keys2.length === 0) return fallback(object);
  let result = object;
  for (const key of keys2) {
    if (result == null || !(key in result)) return fallback(object);
    result = result[key];
  }
  return result;
}
function merge(source, ...patches) {
  const arr = isArray(source);
  return function apply(isArr, copy, patch) {
    const type2 = typeof patch;
    if (patch && type2 === "object") {
      if (isArray(patch)) {
        for (const p of patch) copy = apply(isArr, copy, p);
      } else {
        for (const k2 in patch) {
          const val = patch[k2];
          if (isFunction(val)) {
            copy[k2] = val(copy[k2], merge);
          } else if (val === void 0) {
            if (isArr) {
              copy.splice(k2, 1);
            } else {
              delete copy[k2];
            }
          } else if (val === null || isObject(val) === false || isArray(val)) {
            copy[k2] = val;
          } else if (typeof copy[k2] === "object") {
            copy[k2] = val === copy[k2] ? val : merge(copy[k2], val);
          } else {
            copy[k2] = apply(false, {}, val);
          }
        }
      }
    } else if (type2 === "function") {
      copy = patch(copy, merge);
    }
    return copy;
  }(arr, arr ? source.slice() : Object.assign({}, source), patches);
}
function forMap(cb, array) {
  if (!isArray(array)) return [];
  const s2 = array.length;
  if (s2 === 0) return [];
  const a2 = [];
  let i = 0;
  for (; i < s2; i++) {
    const v3 = cb(array[i]);
    if (!isNil(v3)) a2.push(v3);
  }
  return a2;
}
function reduce(array, cb, model) {
  const s2 = array.length;
  if (s2 === 0) return model;
  let i = 0;
  for (; i < s2; i++) cb(model, array[i]);
  return model;
}
function forEach(cb, array) {
  const s2 = array.length;
  if (s2 === 0) return;
  let i = 0;
  for (; i < s2; i++) if (cb(array[i]) === false) break;
}
function forKeys(cb, object) {
  for (const k2 in object) if (cb(k2) === false) break;
}
function pNext() {
  return new Promise((resolve2) => isFunction(setImmediate) ? setImmediate(resolve2) : setTimeout(resolve2));
}
function delay(ms2 = 1e3) {
  return new Promise((resolve2) => setTimeout(resolve2, ms2));
}
function eqWS(array, { prop = null, padding = 0 } = {}) {
  let size = 0;
  if (isArray(array)) {
    for (let i = 0, s2 = array.length; i < s2; i++) {
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
    const s2 = n < 1 ? " " : " ".repeat(n);
    return s2 + p;
  };
}
function murmur(str, seed) {
  const string = new TextEncoder().encode(str);
  let s2 = string.length;
  let h = seed ^ s2;
  let i = 0;
  let k2;
  while (s2 >= 4) {
    k2 = string[i] & 255 | (string[++i] & 255) << 8 | (string[++i] & 255) << 16 | (string[++i] & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + (((k2 >>> 16) * 1540483477 & 65535) << 16);
    k2 ^= k2 >>> 24;
    k2 = (k2 & 65535) * 1540483477 + (((k2 >>> 16) * 1540483477 & 65535) << 16);
    h = (h & 65535) * 1540483477 + (((h >>> 16) * 1540483477 & 65535) << 16) ^ k2;
    s2 -= 4;
    ++i;
  }
  if (s2 === 3) h ^= (string[i + 2] & 255) << 16;
  if (s2 === 2) h ^= (string[i + 1] & 255) << 8;
  if (s2 === 1) {
    h ^= string[i] & 255;
    h = (h & 65535) * 1540483477 + (((h >>> 16) * 1540483477 & 65535) << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + (((h >>> 16) * 1540483477 & 65535) << 16);
  h ^= h >>> 15;
  return h >>> 0;
}
function uuid() {
  return Math.random().toString(36).slice(2);
}
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
function toPascalCase(string) {
  return string.replace(/[^a-zA-Z0-9_:]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
}
function plur(word, size) {
  if (size === 1) return word;
  if (size >= 2 || size === 0) return word[word.length - 1] !== "s" ? `${word}s` : word;
  return word[word.length - 1] !== "s" ? word : word.slice(0, -1);
}
function toUpcase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function addSuffix(number) {
  const a2 = number % 10;
  const b = number % 100;
  return number + (a2 === 1 && b !== 11 ? "st" : a2 === 2 && b !== 12 ? "nd" : a2 === 3 && b !== 13 ? "rd" : "th");
}
function stringSize(value) {
  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}
function byteSize(string) {
  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;
}
function byteConvert(bytes) {
  if (bytes === 0) return `${y("0")}b`;
  const size = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
  return size === 0 ? `${y(`${bytes}`)}${UNITS[size]}` : `${y((bytes / 1024 ** size).toFixed(1))}${UNITS[size]}`;
}
function sizeDiff(content, beforeSize) {
  const size = byteSize(content);
  return {
    get isSmaller() {
      return size > beforeSize || size === beforeSize;
    },
    get brotli() {
      return byteConvert(zlib2__default.default.brotliCompressSync(content).length);
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
function getFuture(months) {
  const current = new Date(Date.now());
  current.setMonth(current.getMonth() + months);
  const d = current.getDate();
  current.setDate(1);
  current.setDate(Math.min(d, new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()));
  return current.getTime();
}
function prettyDate(time) {
  const date = new Date(time);
  const locale = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return locale.replace(/\d+/, addSuffix(date.getDate()));
}
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? `0${hur}` : hur) + ":" + (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec);
}

// syncify/cli/bulk.ts
function bulk() {
  if ($.bulk.id === null) {
    $.bulk.id = uuid();
    import_timer.timer.start($.bulk.id);
  }
  if ($.bulk.synced.size > 0) {
    $.bulk.synced.clear();
    $.errors.clear();
    $.warnings.clear();
  }
  if (bulk.tui === null) {
    bulk.tui = pt().Template({ prefix: true, id: "changes", color: Bi }).Template({ prefix: true, id: "errors", color: a }).Template({ prefix: true, id: "warnings", color: a }).Template({ prefix: true, id: $.bulk.type, color: Y });
  }
  if (bulk.progress === null) {
    bulk.progress = uo($.bulk.files, {
      barSize: 30,
      prepend: null,
      barColor: $.bulk.type === "uploaded" ? "neonGreen" : "blueBright"
    });
  } else {
    bulk.progress.reset($.bulk.files);
  }
  bulk.tui.Update("changes", `${y($.bulk.files)} Files`).Update("errors", `${y($.errors.size)} Errors`).Update("warnings", `${y($.warnings.size)} Warnings`).Update($.bulk.type, bulk.progress.render()).toUpdate();
}
bulk.notifier = (type2) => {
  notifier2__default.default.notify({
    warnings: {
      contentImage: $.file.notifier,
      title: `Bulk ${plur("Warning", $.warnings.size)}`,
      message: `${$.warnings.size} ${plur("warning", $.warnings.size)} encountered`
    },
    errors: {
      contentImage: $.file.notifier,
      title: `Bulk ${plur("Error", $.errors.size)}`,
      message: `${$.errors.size} ${plur("Error", $.errors.size)} encountered`
    }
  }[type2]);
};
bulk.complete = () => {
  if (!$.mode.bulk) return;
  const color = $.bulk.type === "deleted" ? hi : Q;
  bulk.tui.Update($.bulk.type, `${y($.bulk.synced.size)} Files ${dr(import_timer.timer.stop($.bulk.id))}`, color).Newline();
  if ($.bulk.synced.size > 0) {
    bulk.tui.Line(`Type ${y("i")} and press ${y("enter")} to view ${$.bulk.type}`, a);
  }
  if ($.warnings.size > 0) {
    bulk.tui.Line(`Type ${y("w")} and press ${y("enter")} to view warnings`, a);
    bulk.notifier("warnings");
  }
  if ($.errors.size > 0) {
    bulk.tui.Line(`Type ${y("e")} and press ${y("enter")} to view errors`, a);
    bulk.notifier("errors");
  }
  bulk.tui.toUpdate({ clear: true, trim: true }).done();
  bulk.tui = null;
  bulk.progress = null;
  $.mode.bulk = false;
  $.bulk.files = 0;
  $.bulk.id = null;
};
bulk.synced = (filename, target, store) => {
  const message = $.bulk.type === "uploaded" ? Q(ae("uploaded", filename, y(target), store, import_timer.timer.stop())) : hi(ae("deleted", filename, y(target), store));
  $.bulk.synced.add(xD(message));
};
bulk.progress = null;
bulk.tui = null;
var LogStream = class extends node_stream.Writable {
  /**
   * The Tree line Prefix
   */
  tree = l.line;
  /**
   * Update Prefix (used to swap when calling warn or error)
   */
  prefix(prefix = l.line) {
    this.tree = prefix;
    return this;
  }
  _write(chunk, encoding, next) {
    process2__default.default.stdout.write(this.tree + chunk.toString().trim() + "\n");
    if (next) next();
    this.tree = l.line;
  }
};
var Log = class _Log extends node_console.Console {
  static stdio = new LogStream();
  get stdout() {
    return _Log.stdio;
  }
  get stderr() {
    return _Log.stdio;
  }
  error(message) {
    this.stderr.prefix(l.red).write(message);
  }
  warn(message) {
    this.stderr.prefix(l.yellow).write(message);
  }
  encase(message) {
    this.stdout.write("");
    this.stdout.write(message);
    this.stdout.write("");
    return this;
  }
  wrap(...input) {
    const color = isFunction(last(input)) ? input.pop() : a;
    this.stdout.write(ce(input, { color, firstLineTree: false }));
    return this;
  }
  ln(type2) {
    this.stdout.prefix(type2 === "red" ? l.redTrim : type2 === "yellow" ? l.yellowTrim : l.trim).write("");
    return this;
  }
  nl() {
    process2__default.default.stdout.write("\n\n");
    return this;
  }
};
var console2 = new Log(Log.stdio, Log.stdio);
var { stdout, stderr } = console2;
var event = new class Event extends EventEmitter2__default.default {
  id;
  /**
   * Whether or not an event is listening with the provided name
   */
  has(name) {
    return this.listenerCount(name) > 0;
  }
  /**
   * Changes the current event listening mode. Used for specific run-modes
   * such a bulk operations or stdin debugs.
   */
  mode(name) {
    this.id = name;
    return this;
  }
  /**
   * Each Event
   *
   * Iterates over an array of arguments and emits to the provided event name.
   */
  each(args) {
    for (const arg of args) {
      this.emit(this.id, arg);
    }
  }
}();

// syncify/cli/stdin.ts
var setStdin = stdin;
function stdin() {
  stdin.errors = StdinError();
  if ($.mode.watch) {
    stdin.watch = StdinWatch();
    stdin.warnings = StdinWarning();
  }
}
stdin.errors = void 0;
stdin.watch = void 0;
stdin.warnings = void 0;
stdin.ansi = {
  footer: `USE ${mD("SB", a("\u25C4"))} AND ${mD("SB", a("\u25BA"))} ARROW KEYS TO NAVIGATE`,
  legend: {
    /** `[q] exit debug mode` */
    q: mD("SB", a.bold("q")) + " exit debug mode",
    /** `[s] skip error */
    s: mD("SB", a.bold("s")) + " skip error",
    /** `[w] view warnings */
    w: mD("SB", a.bold("w")) + " view warnings",
    /** `[e] view errors */
    e: mD("SB", a.bold("e")) + " view errors",
    /** `[p] print all errors and exit' */
    p: mD("SB", a.bold("p")) + " print all"
  }
};
function StdinError() {
  const state = {
    index: 0,
    isAttached: false,
    write: [],
    keypress: null,
    skipped: null,
    errors: null,
    warnings: null,
    get shown() {
      return this.write[this.index];
    }
  };
  function listen(write2) {
    if (state.isAttached) return update(write2);
    state.index = 0;
    state.write = write2;
    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === "left") return prev();
      if (key.name === "right") return next();
      if (key.name === "q") return quit();
      if (key.name === "p") return print();
      if (key.name === "s") return event.emit("stdin:skip");
      if (key.name === "w") return event.emit("stdin:warn");
      if (key.name === "e") return event.emit("stdin:errors");
    };
    prexit.listener(state.keypress);
    log.update(state.shown.toString({ clear: false }));
    event.on("stdin:dispose", () => {
      log.update.done();
      dispose();
    });
  }
  function quit() {
  }
  function update(messages2) {
    state.index = 0;
    state.write = messages2;
    log.update.clear();
    log.update(state.shown.toString({ clear: false }));
  }
  function dispose() {
    if (!state.keypress) return;
    state.shown.Remove("debug", Infinity);
    log.update(state.shown.toString({ clear: false }));
    log.update.done();
    process.stdin.removeListener("keypress", state.keypress);
    state.keypress = void 0;
    state.isAttached = false;
    state.write = [];
    state.index = 0;
    if (state.skipped) event.off("stdin:skip", state.skipped);
    if (state.warnings) event.off("stdin:warn", state.warnings);
    if (state.errors) event.off("stdin:errors", state.errors);
    event.off("stdin:dispose", dispose);
  }
  function skip(callback) {
    if (!state.skipped) {
      state.skipped = () => callback(state.index);
      event.on("stdin:skip", state.skipped);
    }
  }
  function errors(callback) {
    if (!state.errors) {
      state.errors = () => callback(state.index);
      event.on("stdin:error", state.errors);
    }
  }
  function warn2(callback) {
    if (!state.warnings) {
      state.warnings = () => callback(state.index);
      event.on("stdin:warn", state.warnings);
    }
  }
  function print() {
    log.update.clear();
    log.update.done();
    log.nl();
    event.emit("stdin:view", state.index);
    state.write.forEach((write2, index) => {
      write2.Remove("legend", "debug").True(index !== state.write.length - 1, (tui) => tui.Pop()).True(index !== state.write.length - 1, (tui) => tui.Ruler()).toLog({ clear: true });
    });
    dispose();
    kill.exit(0);
  }
  function next() {
    if (state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  }
  function prev() {
    if (state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  }
  return {
    get isAttached() {
      return state.isAttached;
    },
    listen,
    dispose,
    update,
    skip,
    warn: warn2,
    errors
  };
}
function StdinWatch() {
  const preview = $.target.map(({ preview: preview2 }) => preview2);
  const editors = $.target.map(({ editor }) => editor);
  const write2 = pt().Newline().Template(preview, { id: "p", hidden: true, color: a.underline }).Template(editors, { id: "a", hidden: true, color: a.underline });
  let keypress;
  function listen() {
    keypress = (_data, key) => {
      if (key.name === "p") return write2.Update("p").toLog({ clear: "p", trim: false });
      if (key.name === "a") return write2.Update("c").toLog({ clear: "a", trim: false });
    };
    prexit.listener(keypress);
    stdin.warnings.listen();
  }
  function dispose() {
    if (keypress) {
      process.stdin.removeListener("keypress", keypress);
      keypress = void 0;
    }
  }
  return { listen, dispose };
}
function StdinWarning() {
  const state = {
    index: 0,
    isAttached: false,
    write: [],
    keypress: null,
    get shown() {
      return this.write[this.index];
    }
  };
  function reset() {
    log.update.clear();
    state.write = [];
    state.index = 0;
  }
  function listen() {
    if (state.isAttached) return;
    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === "left") return prev();
      if (key.name === "right") return next();
      if (key.name === "v") return view();
    };
    prexit.listener(state.keypress);
    event.on("warn:dispose", () => {
      log.update.done();
      dispose();
    });
  }
  function dispose() {
    if (!state.keypress) return;
    process.stdin.removeListener("keypress", state.keypress);
    state.keypress = void 0;
    state.isAttached = false;
    state.write = [];
    state.index = 0;
    event.off("stdin:dispose", dispose);
  }
  function view() {
    if (!$.warnings.has($.log.uri)) return;
    state.write = [];
    state.index = 0;
    let count = 0;
    $.warnings.get($.log.uri).values().forEach((stack) => count += stack.size);
    for (const stack of $.warnings.get($.log.uri).values()) {
      stack.forEach((value) => {
        const tui = pt({ type: "warning " });
        if (count > 1) {
          tui.Newline("line").Append(`WARNING ${state.write.length + 1} of ${count}`, y.yellowBright).Insert(value).Newline("line").End(stdin.ansi.footer);
        } else {
          tui.Insert(value);
        }
        state.write.push(tui);
      });
    }
    log.update(state.shown.toString({ clear: false }));
  }
  function next() {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  }
  function prev() {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  }
  return {
    get isAttached() {
      return state.isAttached;
    },
    listen,
    dispose,
    view,
    reset
  };
}

// syncify/model/modules.ts
var IMPORT_MAP = o({
  "smol-toml": "toml",
  "js-yaml": "yaml",
  "svgo": "svgo",
  "tailwindcss": "tailwind",
  "postcss": "postcss",
  "sass-embedded": "sass",
  "clean-css": "cleancss",
  "markdown-it": "markdown",
  "adm-zip": "admzip",
  "gray-matter": "matter",
  "html-minifier-terser": "terser"
});
var $import = Object.assign(async function(name) {
  const id = IMPORT_MAP[name];
  if ($import[id] !== null) return $import[id];
  try {
    const resolve2 = await import(name);
    $import[id] = resolve2.default || resolve2;
    return $import[id];
  } catch (e2) {
    $import[id] = null;
    throwError(`Module import failed for ${name}`, [
      "Please ensure the module is installed correctly. If this error persists, try",
      "to reinstall Syncify or install the import in isolation."
    ]);
  }
}, {
  toml: null,
  yaml: null,
  postcss: null,
  svgo: null,
  sass: null,
  markdown: null,
  cleancss: null,
  tailwind: null,
  terser: null,
  admzip: null,
  matter: null
});

// packages/codeframe/dist/index.mjs
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_js_tokens = __commonJS2({
  "../../node_modules/.pnpm/js-tokens@9.0.1/node_modules/js-tokens/index.js"(exports, module) {
    var HashbangComment;
    var Identifier;
    var JSXIdentifier;
    var JSXPunctuator;
    var JSXString;
    var JSXText;
    var KeywordsWithExpressionAfter;
    var KeywordsWithNoLineTerminatorAfter;
    var LineTerminatorSequence;
    var MultiLineComment;
    var Newline;
    var NumericLiteral;
    var Punctuator;
    var RegularExpressionLiteral;
    var SingleLineComment;
    var StringLiteral;
    var Template;
    var TokensNotPrecedingObjectLiteral;
    var TokensPrecedingExpression;
    var WhiteSpace;
    RegularExpressionLiteral = /\/(?![*\/])(?:\[(?:[^\]\\\n\r\u2028\u2029]+|\\.)*\]?|[^\/[\\\n\r\u2028\u2029]+|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu;
    Punctuator = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y;
    Identifier = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]+|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu;
    StringLiteral = /(['"])(?:[^'"\\\n\r]+|(?!\1)['"]|\\(?:\r\n|[^]))*(\1)?/y;
    NumericLiteral = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y;
    Template = /[`}](?:[^`\\$]+|\\[^]|\$(?!\{))*(`|\$\{)?/y;
    WhiteSpace = /[\t\v\f\ufeff\p{Zs}]+/yu;
    LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y;
    MultiLineComment = /\/\*(?:[^*]+|\*(?!\/))*(\*\/)?/y;
    SingleLineComment = /\/\/.*/y;
    HashbangComment = /^#!.*/;
    JSXPunctuator = /[<>.:={}]|\/(?![\/*])/y;
    JSXIdentifier = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu;
    JSXString = /(['"])(?:[^'"]+|(?!\1)['"])*(\1)?/y;
    JSXText = /[^<>{}]+/y;
    TokensPrecedingExpression = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/;
    TokensNotPrecedingObjectLiteral = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/;
    KeywordsWithExpressionAfter = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/;
    KeywordsWithNoLineTerminatorAfter = /^(?:return|throw|yield)$/;
    Newline = RegExp(LineTerminatorSequence.source);
    module.exports = function* (input, { jsx = false } = {}) {
      var braces, firstCodePoint, isExpression, lastIndex, lastSignificantToken, length, match, mode, nextLastIndex, nextLastSignificantToken, parenNesting, postfixIncDec, punctuator, stack;
      ({ length } = input);
      lastIndex = 0;
      lastSignificantToken = "";
      stack = [
        { tag: "JS" }
      ];
      braces = [];
      parenNesting = 0;
      postfixIncDec = false;
      if (match = HashbangComment.exec(input)) {
        yield {
          type: "HashbangComment",
          value: match[0]
        };
        lastIndex = match[0].length;
      }
      while (lastIndex < length) {
        mode = stack[stack.length - 1];
        switch (mode.tag) {
          case "JS":
          case "JSNonExpressionParen":
          case "InterpolationInTemplate":
          case "InterpolationInJSX":
            if (input[lastIndex] === "/" && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
              RegularExpressionLiteral.lastIndex = lastIndex;
              if (match = RegularExpressionLiteral.exec(input)) {
                lastIndex = RegularExpressionLiteral.lastIndex;
                lastSignificantToken = match[0];
                postfixIncDec = true;
                yield {
                  type: "RegularExpressionLiteral",
                  value: match[0],
                  closed: match[1] !== void 0 && match[1] !== "\\"
                };
                continue;
              }
            }
            Punctuator.lastIndex = lastIndex;
            if (match = Punctuator.exec(input)) {
              punctuator = match[0];
              nextLastIndex = Punctuator.lastIndex;
              nextLastSignificantToken = punctuator;
              switch (punctuator) {
                case "(":
                  if (lastSignificantToken === "?NonExpressionParenKeyword") {
                    stack.push({
                      tag: "JSNonExpressionParen",
                      nesting: parenNesting
                    });
                  }
                  parenNesting++;
                  postfixIncDec = false;
                  break;
                case ")":
                  parenNesting--;
                  postfixIncDec = true;
                  if (mode.tag === "JSNonExpressionParen" && parenNesting === mode.nesting) {
                    stack.pop();
                    nextLastSignificantToken = "?NonExpressionParenEnd";
                    postfixIncDec = false;
                  }
                  break;
                case "{":
                  Punctuator.lastIndex = 0;
                  isExpression = !TokensNotPrecedingObjectLiteral.test(lastSignificantToken) && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken));
                  braces.push(isExpression);
                  postfixIncDec = false;
                  break;
                case "}":
                  switch (mode.tag) {
                    case "InterpolationInTemplate":
                      if (braces.length === mode.nesting) {
                        Template.lastIndex = lastIndex;
                        match = Template.exec(input);
                        lastIndex = Template.lastIndex;
                        lastSignificantToken = match[0];
                        if (match[1] === "${") {
                          lastSignificantToken = "?InterpolationInTemplate";
                          postfixIncDec = false;
                          yield {
                            type: "TemplateMiddle",
                            value: match[0]
                          };
                        } else {
                          stack.pop();
                          postfixIncDec = true;
                          yield {
                            type: "TemplateTail",
                            value: match[0],
                            closed: match[1] === "`"
                          };
                        }
                        continue;
                      }
                      break;
                    case "InterpolationInJSX":
                      if (braces.length === mode.nesting) {
                        stack.pop();
                        lastIndex += 1;
                        lastSignificantToken = "}";
                        yield {
                          type: "JSXPunctuator",
                          value: "}"
                        };
                        continue;
                      }
                  }
                  postfixIncDec = braces.pop();
                  nextLastSignificantToken = postfixIncDec ? "?ExpressionBraceEnd" : "}";
                  break;
                case "]":
                  postfixIncDec = true;
                  break;
                case "++":
                case "--":
                  nextLastSignificantToken = postfixIncDec ? "?PostfixIncDec" : "?UnaryIncDec";
                  break;
                case "<":
                  if (jsx && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
                    stack.push({ tag: "JSXTag" });
                    lastIndex += 1;
                    lastSignificantToken = "<";
                    yield {
                      type: "JSXPunctuator",
                      value: punctuator
                    };
                    continue;
                  }
                  postfixIncDec = false;
                  break;
                default:
                  postfixIncDec = false;
              }
              lastIndex = nextLastIndex;
              lastSignificantToken = nextLastSignificantToken;
              yield {
                type: "Punctuator",
                value: punctuator
              };
              continue;
            }
            Identifier.lastIndex = lastIndex;
            if (match = Identifier.exec(input)) {
              lastIndex = Identifier.lastIndex;
              nextLastSignificantToken = match[0];
              switch (match[0]) {
                case "for":
                case "if":
                case "while":
                case "with":
                  if (lastSignificantToken !== "." && lastSignificantToken !== "?.") {
                    nextLastSignificantToken = "?NonExpressionParenKeyword";
                  }
              }
              lastSignificantToken = nextLastSignificantToken;
              postfixIncDec = !KeywordsWithExpressionAfter.test(match[0]);
              yield {
                type: match[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
                value: match[0]
              };
              continue;
            }
            StringLiteral.lastIndex = lastIndex;
            if (match = StringLiteral.exec(input)) {
              lastIndex = StringLiteral.lastIndex;
              lastSignificantToken = match[0];
              postfixIncDec = true;
              yield {
                type: "StringLiteral",
                value: match[0],
                closed: match[2] !== void 0
              };
              continue;
            }
            NumericLiteral.lastIndex = lastIndex;
            if (match = NumericLiteral.exec(input)) {
              lastIndex = NumericLiteral.lastIndex;
              lastSignificantToken = match[0];
              postfixIncDec = true;
              yield {
                type: "NumericLiteral",
                value: match[0]
              };
              continue;
            }
            Template.lastIndex = lastIndex;
            if (match = Template.exec(input)) {
              lastIndex = Template.lastIndex;
              lastSignificantToken = match[0];
              if (match[1] === "${") {
                lastSignificantToken = "?InterpolationInTemplate";
                stack.push({
                  tag: "InterpolationInTemplate",
                  nesting: braces.length
                });
                postfixIncDec = false;
                yield {
                  type: "TemplateHead",
                  value: match[0]
                };
              } else {
                postfixIncDec = true;
                yield {
                  type: "NoSubstitutionTemplate",
                  value: match[0],
                  closed: match[1] === "`"
                };
              }
              continue;
            }
            break;
          case "JSXTag":
          case "JSXTagEnd":
            JSXPunctuator.lastIndex = lastIndex;
            if (match = JSXPunctuator.exec(input)) {
              lastIndex = JSXPunctuator.lastIndex;
              nextLastSignificantToken = match[0];
              switch (match[0]) {
                case "<":
                  stack.push({ tag: "JSXTag" });
                  break;
                case ">":
                  stack.pop();
                  if (lastSignificantToken === "/" || mode.tag === "JSXTagEnd") {
                    nextLastSignificantToken = "?JSX";
                    postfixIncDec = true;
                  } else {
                    stack.push({ tag: "JSXChildren" });
                  }
                  break;
                case "{":
                  stack.push({
                    tag: "InterpolationInJSX",
                    nesting: braces.length
                  });
                  nextLastSignificantToken = "?InterpolationInJSX";
                  postfixIncDec = false;
                  break;
                case "/":
                  if (lastSignificantToken === "<") {
                    stack.pop();
                    if (stack[stack.length - 1].tag === "JSXChildren") {
                      stack.pop();
                    }
                    stack.push({ tag: "JSXTagEnd" });
                  }
              }
              lastSignificantToken = nextLastSignificantToken;
              yield {
                type: "JSXPunctuator",
                value: match[0]
              };
              continue;
            }
            JSXIdentifier.lastIndex = lastIndex;
            if (match = JSXIdentifier.exec(input)) {
              lastIndex = JSXIdentifier.lastIndex;
              lastSignificantToken = match[0];
              yield {
                type: "JSXIdentifier",
                value: match[0]
              };
              continue;
            }
            JSXString.lastIndex = lastIndex;
            if (match = JSXString.exec(input)) {
              lastIndex = JSXString.lastIndex;
              lastSignificantToken = match[0];
              yield {
                type: "JSXString",
                value: match[0],
                closed: match[2] !== void 0
              };
              continue;
            }
            break;
          case "JSXChildren":
            JSXText.lastIndex = lastIndex;
            if (match = JSXText.exec(input)) {
              lastIndex = JSXText.lastIndex;
              lastSignificantToken = match[0];
              yield {
                type: "JSXText",
                value: match[0]
              };
              continue;
            }
            switch (input[lastIndex]) {
              case "<":
                stack.push({ tag: "JSXTag" });
                lastIndex++;
                lastSignificantToken = "<";
                yield {
                  type: "JSXPunctuator",
                  value: "<"
                };
                continue;
              case "{":
                stack.push({
                  tag: "InterpolationInJSX",
                  nesting: braces.length
                });
                lastIndex++;
                lastSignificantToken = "?InterpolationInJSX";
                postfixIncDec = false;
                yield {
                  type: "JSXPunctuator",
                  value: "{"
                };
                continue;
            }
        }
        WhiteSpace.lastIndex = lastIndex;
        if (match = WhiteSpace.exec(input)) {
          lastIndex = WhiteSpace.lastIndex;
          yield {
            type: "WhiteSpace",
            value: match[0]
          };
          continue;
        }
        LineTerminatorSequence.lastIndex = lastIndex;
        if (match = LineTerminatorSequence.exec(input)) {
          lastIndex = LineTerminatorSequence.lastIndex;
          postfixIncDec = false;
          if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
            lastSignificantToken = "?NoLineTerminatorHere";
          }
          yield {
            type: "LineTerminatorSequence",
            value: match[0]
          };
          continue;
        }
        MultiLineComment.lastIndex = lastIndex;
        if (match = MultiLineComment.exec(input)) {
          lastIndex = MultiLineComment.lastIndex;
          if (Newline.test(match[0])) {
            postfixIncDec = false;
            if (KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken)) {
              lastSignificantToken = "?NoLineTerminatorHere";
            }
          }
          yield {
            type: "MultiLineComment",
            value: match[0],
            closed: match[1] !== void 0
          };
          continue;
        }
        SingleLineComment.lastIndex = lastIndex;
        if (match = SingleLineComment.exec(input)) {
          lastIndex = SingleLineComment.lastIndex;
          postfixIncDec = false;
          yield {
            type: "SingleLineComment",
            value: match[0]
          };
          continue;
        }
        firstCodePoint = String.fromCodePoint(input.codePointAt(lastIndex));
        lastIndex += firstCodePoint.length;
        lastSignificantToken = firstCodePoint;
        postfixIncDec = false;
        yield {
          type: mode.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
          value: firstCodePoint
        };
      }
      return void 0;
    };
  }
});
var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
var BRACKET = /^[()[\]{}]$/;
var LINE_EXP = /\(line \d+\):/;
var sometimes = /* @__PURE__ */ new Set([
  "as",
  "async",
  "from",
  "get",
  "of",
  "set"
]);
var reserved = /* @__PURE__ */ new Set([
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield"
]);
var keywords = /* @__PURE__ */ new Set([
  "console",
  "break",
  "constructor",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "return",
  "switch",
  "throw",
  "try",
  "var",
  "const",
  "while",
  "with",
  "new",
  "this",
  "super",
  "class",
  "extends",
  "export",
  "import",
  "null",
  "true",
  "false",
  "in",
  "instanceof",
  "typeof",
  "void",
  "delete"
]);
var import_js_tokens = __toESM2(require_js_tokens());
function isStrict(word, inModule) {
  return inModule && word === "await" || word === "enum" || reserved.has(word);
}
var getTokenType = function(token) {
  if (token.type === "IdentifierName") {
    if (keywords.has(token.value) || isStrict(token.value, true) || sometimes.has(token.value)) return "keyword";
    if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
  }
  if (token.type === "Punctuator" && BRACKET.test(token.value)) return "uncolored";
  if (token.type === "Invalid" && token.value === "@") return "punctuator";
  switch (token.type) {
    case "NumericLiteral":
      return "number";
    case "StringLiteral":
    case "JSXString":
    case "NoSubstitutionTemplate":
      return "string";
    case "RegularExpressionLiteral":
      return "regex";
    case "Punctuator":
    case "JSXPunctuator":
      return "punctuator";
    case "MultiLineComment":
    case "SingleLineComment":
      return "comment";
    case "Invalid":
    case "JSXInvalid":
      return "invalid";
    case "JSXIdentifier":
      return "jsx_identifier";
    default:
      return "uncolored";
  }
};
function tokenize(text) {
  const tokens = Array.from((0, import_js_tokens.default)(text, { jsx: true }));
  const syntax = [];
  const tags = /* @__PURE__ */ new Set();
  let p = 0;
  let inLiquid = false;
  for (let i = 0, s2 = tokens.length; i < s2; i++) {
    const token = tokens[i];
    if (token.type === "RegularExpressionLiteral" && tags.has(token.value)) {
      const punctuator = token.value[0];
      const tagName = token.value.slice(1, -1);
      const closer = token.value[token.value.length - 1];
      syntax.push({ type: "punctuator", value: punctuator });
      syntax.push({ type: "jsx_element", value: tagName });
      syntax.push({ type: "punctuator", value: closer });
    } else if (token.type === "TemplateHead") {
      syntax.push({ type: "string", value: token.value.slice(0, -2) });
      syntax.push({ type: "punctuator", value: "${" });
    } else if (token.type === "TemplateMiddle") {
      syntax.push({ type: "punctuator", value: "}" });
      syntax.push({ type: "string", value: token.value.slice(1, -2) });
      syntax.push({ type: "punctuator", value: "${" });
    } else if (token.type === "TemplateTail") {
      syntax.push({ type: "punctuator", value: "}" });
      syntax.push({ type: "string", value: token.value.slice(1) });
    } else if (inLiquid) {
      if ((token.value === "}" || token.value === "%") && tokens[i + 1].value === "}") {
        inLiquid = false;
        syntax.push({ type: "liquid", value: token.value });
        syntax.push({ type: "liquid", value: tokens[i + 1].value });
        i = i + 1;
      } else {
        syntax.push({ type: "liquid", value: token.value });
      }
    } else if (token.type === "JSXIdentifier") {
      if (tokens[i - 1].value === "<") {
        syntax.push({ type: "jsx_element", value: token.value });
        tags.add(`/${token.value}>`);
      } else if (i >= 2 && tokens[i - 2].value === "<" && tokens[i - 1].value === "/") {
        syntax.push({ type: "jsx_element", value: token.value });
      } else {
        syntax.push({ type: getTokenType(token), value: token.value });
      }
    } else if (token.value === "{" && (tokens[i + 1].value === "{" || tokens[i + 1].value === "%")) {
      inLiquid = true;
      syntax.push({ type: "liquid", value: "{" });
      syntax.push({ type: "liquid", value: tokens[i + 1].value });
      i = i + 1;
    } else if (s2 >= i + 2 && token.type === "Punctuator" && token.value === "." && tokens[i + 1].type === "IdentifierName" && tokens[i + 2].type === "Punctuator" && tokens[i + 2].value === "(") {
      syntax.push(
        { type: "punctuator", value: token.value },
        { type: "function", value: tokens[i + 1].value },
        { type: "punctuator", value: "(" }
      );
      p = p + 1;
      i = i + 2;
    } else if (token.type === "Punctuator" && token.value === ")" && p > 0) {
      p = p - 1;
      syntax.push({ type: "punctuator", value: token.value });
    } else {
      syntax.push({ type: getTokenType(token), value: token.value });
    }
  }
  return syntax;
}
function highlight(text, language) {
  if (text === "") return "";
  const defs = colors(language);
  const tokens = tokenize(text);
  let highlighted = "";
  for (const { type: type2, value } of tokens) {
    if (type2 in defs) {
      highlighted += g.nl(value.split(NEWLINE).map(defs[type2]));
    } else {
      highlighted += value;
    }
  }
  return highlighted;
}
function colors(language) {
  return language === "json" ? {
    keyword: Bi,
    capitalized: ci,
    liquid_open: a,
    liquid_close: a,
    jsx_element: St,
    jsx_attribute: kt,
    jsx_identifier: Ci,
    punctuator: St,
    function: ci,
    number: P,
    string: Bi,
    regex: Ai,
    comment: a,
    invalid: w.bold,
    reset: Ee
  } : {
    keyword: Bi,
    capitalized: ci,
    liquid_open: a,
    liquid_close: a,
    jsx_element: St,
    jsx_attribute: kt,
    jsx_identifier: Ci,
    punctuator: language === "markup" ? mi : a,
    function: ci,
    number: me,
    string: P,
    regex: Ai,
    comment: a,
    invalid: w.bold,
    reset: Ee
  };
}
function getMarkerLines(loc, source, opts) {
  const startLoc = { column: 0, line: -1, ...loc.start };
  const endLoc = { ...startLoc, ...loc.end };
  const { linesAbove = 2, linesBelow = 3 } = opts;
  const startLine = startLoc.line;
  const startColumn = startLoc.column;
  const endLine = endLoc.line;
  const endColumn = endLoc.column;
  let start = Math.max(startLine - (linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + linesBelow);
  if (startLine === -1) start = 0;
  if (endLine === -1) end = source.length;
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
      markerLines[startLine] = startColumn ? [startColumn, 0] : true;
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
function CodeFrame(rawLines, loc, opts) {
  const lines = rawLines.split(NEWLINE);
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts);
  const numberMaxWidth = String(end).length;
  const highlightedLines = opts.highlight ? highlight(rawLines, opts.language) : rawLines;
  const treeLine = opts.type === "error" ? l.red : opts.type === "warning" ? l.yellow : l.line;
  const treeLineTrim = opts.type === "error" ? l.redTrim : opts.type === "warning" ? l.yellowTrim : l.trim;
  const frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index) => {
    const number = start + 1 + index;
    const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
    const hasMarker = markerLines[number];
    if (hasMarker) {
      const gutter = ` ${k(paddedNumber)} ${l.trim}`;
      let markerLine = "";
      if (Array.isArray(hasMarker)) {
        const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, be);
        const numberOfMarkers = hasMarker[1] || 1;
        markerLine = g(
          Ye,
          treeLine,
          be.repeat(paddedNumber.length),
          vt,
          be,
          l.trim,
          be,
          markerSpacing,
          k("^").repeat(numberOfMarkers)
        );
      }
      return g(
        k("\u27A4"),
        gutter,
        line.length > 0 ? ` ${line}` : "",
        markerLine
      );
    } else {
      return g(
        Mi,
        hi(paddedNumber),
        be,
        l.trim,
        line.length > 0 ? ` ${line}` : ""
      );
    }
  });
  return g.nl(frame.map((line) => treeLineTrim + be + line)) + Ye;
}
var esc = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function getLineInfo(text, lineNumber) {
  if (!text || lineNumber < 1) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }
  const totalLines = (text.match(/\n/g) || []).length + 1;
  if (lineNumber > totalLines) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }
  let lineStart = 0;
  let currentLine = 1;
  let pos = 0;
  while (currentLine < lineNumber && pos < text.length) {
    pos = text.indexOf("\n", pos);
    if (pos === -1) break;
    lineStart = pos + 1;
    pos++;
    currentLine++;
  }
  if (currentLine < lineNumber) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }
  let nextLineNumber = lineNumber;
  let nextLineStart = text.indexOf("\n", lineStart);
  if (nextLineStart === -1) {
    nextLineStart = text.length;
  } else {
    nextLineStart++;
  }
  if (lineNumber < totalLines) nextLineNumber++;
  return {
    lineNumber,
    lineStart,
    nextLineNumber,
    nextLineStart
  };
}
function getTokenInfo(source, lineNumber, tokenRegex) {
  let lines = getLineInfo(source, lineNumber);
  if (lines.lineStart < 0 && lines.nextLineStart < 0) return null;
  let input = source.slice(lines.lineStart);
  let match = input.match(tokenRegex);
  let startPos = lines.lineStart;
  if (!match) {
    let currentLine = lineNumber;
    while (currentLine > 1 && !match) {
      currentLine--;
      lines = getLineInfo(source, currentLine);
      input = source.slice(lines.lineStart);
      match = input.match(tokenRegex);
      if (match && match.index >= 0) {
        startPos = lines.lineStart;
        break;
      }
    }
    if (!match) return lines;
  }
  const token = match[0];
  const tokenStartInInput = match.index;
  const tokenStart = startPos + tokenStartInInput;
  const tokenEnd = tokenStart + token.length;
  const tokenNewlines = (token.match(/\n/g) || []).length;
  if (tokenNewlines === 0) {
    return {
      lineNumber,
      lineStart: tokenStart,
      nextLineNumber: lineNumber,
      nextLineStart: tokenEnd,
      token
    };
  }
  const startNewlinesBefore = (source.slice(0, tokenStart).match(/\n/g) || []).length;
  const adjustedLineNumber = startNewlinesBefore + 1;
  const nextLineNumber = adjustedLineNumber + tokenNewlines;
  const nextLineStart = tokenEnd;
  return {
    lineNumber: adjustedLineNumber,
    lineStart: tokenStart,
    nextLineNumber,
    nextLineStart,
    token
  };
}
function getTokenRange(query, source, lineNumber) {
  const lines = query instanceof RegExp ? getTokenInfo(source, lineNumber, query) : getLineInfo(source, lineNumber);
  if (!lines || lines.lineStart < 0 && lines.nextLineStart < 0) return null;
  const token = typeof query === "string" ? query : lines.token;
  if (!token) {
    const input = source.slice(lines.lineStart, lines.nextLineStart);
    return {
      token: input,
      range: {
        start: { line: lines.lineNumber, column: 1 },
        ender: { line: lines.nextLineNumber, column: input.length || 1 }
      }
    };
  }
  const lineStartPos = getLineInfo(source, lines.lineNumber).lineStart;
  const column = lines.lineStart >= lineStartPos ? lines.lineStart - lineStartPos + 1 : lines.lineStart - getLineInfo(source, lines.lineNumber - 1).lineStart + 1;
  if (column <= 0) {
    const input = source.slice(lines.lineStart, lines.nextLineStart);
    return {
      token: input,
      range: {
        start: { line: lines.lineNumber, column: 1 },
        ender: { line: lines.nextLineNumber, column: input.length || 1 }
      }
    };
  }
  const enderLine = token.includes("\n") ? lines.nextLineNumber : lines.lineNumber;
  let enderColumn;
  if (token.includes("\n")) {
    const lastNewlineIndex = token.lastIndexOf("\n");
    enderColumn = token.slice(lastNewlineIndex + 1).length;
  } else {
    enderColumn = column + token.length;
  }
  const range = {
    start: { line: lines.lineNumber, column },
    ender: { line: enderLine, column: enderColumn }
  };
  return { token, range };
}
function getErrorLocation(source, errMsg, line) {
  for (const test of [
    /^Syntax Error in '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^Syntax Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^Syntax Error in tag '(#)'/i,
    /^in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^'([a-z_]+)' is not a valid delimiter for (?:[a-z_]+) tags\. use/i,
    /^Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^'?([a-z_]+)'? tag was never closed/i,
    /^(For) loops require an 'in' clause/i,
    /^Invalid attribute in (for) loop. Valid attributes are limit and offset/i,
    /^'?[a-z]+'? is not a valid delimiter for '?([a-z_]+)'? tags/i,
    /^Unexpected outer '{%-?\s*([a-z_]+)/i,
    /^Unknown tag '([a-z_]+)/i,
    /^Tag '{%-?\s*([a-z_]+)/i
  ]) {
    const detect2 = errMsg.trimStart().match(test);
    if (detect2 === null) continue;
    const name = detect2[1];
    const tag = name.toLowerCase().replace(/_/g, "");
    const exp = new RegExp(`{%-?\\s*${tag}[\\s\\S]*?%}`);
    return getTokenRange(exp, source, line);
  }
  for (const test of [
    /^Variable '(.*?)' was not properly terminated with regexp/i,
    /^\[:[a-z_]+, ".+"\] is not a valid expression in "({{.*?}})/i,
    /^Expected (?:[a-z_]+) but found (?:.*?) in "(.*?)"/i,
    /^Tag '({{.*?}})/i
  ]) {
    const detect2 = errMsg.trimStart().match(test);
    if (detect2 === null) continue;
    const exp = new RegExp(esc(detect2[1]));
    return getTokenRange(exp, source, line);
  }
  for (const test of [
    /^Unexpected character (?:.+?) in "([\S\s]+)/i
  ]) {
    const detect2 = errMsg.trimStart().match(test);
    if (detect2 === null) continue;
    if (/\n/.test(detect2[2])) {
      const exp = esc(detect2[2].slice(0, detect2.indexOf("\n")));
      return getTokenRange(exp, source, line);
    } else {
      return getTokenRange(detect2[2], source, line);
    }
  }
  const detect = errMsg.trimStart().match(/({{[\s\S]*?}}|{%[\s\S]*?%})/);
  if (detect !== null) {
    return getTokenRange(detect[1], source, line);
  }
  return null;
}
function better_details(errMsg) {
  let update = errMsg;
  for (const [regex, change] of [
    [/- Valid syntax: (.*?)/i, valid_syntax],
    [/'(.*?)' is not a valid delimiter for/, invalid_delimiter],
    [/^For loops require an 'in' clause/, for_loops],
    [/Unexpected character (.*?) in "/, unexpected_character],
    [/was not properly terminated with regexp:/, terminated_with_regexp],
    [/\[:([a-z_]+), "(.+)"\] is not a valid expression/, valid_expression]
  ]) {
    if (regex.test(update)) update = change(update);
  }
  return update;
}
function invalid_delimiter(errMsg) {
  const message = errMsg.match(/'(.*?)' is not a valid delimiter for ([a-z_]+) tags\. use ([a-z_]+)/i);
  if (message === null) return errMsg;
  return g.ws(
    `Unterminated "${message[2]}" tag due to an "${message[1]}" tag name. This is not a valid ender,`,
    `you need to use: "${message[3]}"`
  );
}
function for_loops() {
  return 'The "for" loop tag requires an "in" clause operator be provided.';
}
function unexpected_character(errMsg) {
  const message = errMsg.match(/Unexpected character (\S+) in "([\S\s]*)/i);
  if (message === null) return errMsg;
  if (/\n/.test(message[2])) {
    return `Unexpected character occurrence "${message[1]}" detected`;
  }
  return `Unexpected character occurrence "${message[1]}" detected in "${message[2]}"`;
}
function terminated_with_regexp(errMsg) {
  if (!/(regexp: )((?:\/\\}|\\}\/)|(?:\/\\\$|\\}\/))/.test(errMsg)) return errMsg;
  return errMsg.replace(/(')(.*?)(')/, '"$2"').replace(/regexp: /, "closing delimiter token: ").replace(/[/\\]+/g, xe);
}
function line_number(errMsg) {
  if (!/\(line (\d+)\):/.test(errMsg)) return errMsg;
  return errMsg.replace(/\(line (\d+)\):/, "on line $1");
}
function valid_syntax(errMsg) {
  const inexp = /^in tag '([a-z_]+)(?:\s[a-z]+)?'/;
  const in_tag = errMsg.match(inexp);
  const prefix = in_tag !== null ? `Invalid "${in_tag[1]}" tag,` : "An invalid or incomplete expression provided";
  const tag = errMsg.match(/- Valid syntax: (.*?)/i);
  if (tag === null) {
    return in_tag !== null ? errMsg.replace(inexp, prefix) : errMsg;
  }
  const example = errMsg.slice(errMsg.indexOf("- Valid syntax:") + 15).trim();
  const valid = example.replace(/[[\]]/g, "");
  return g.ws(
    `${prefix} likely due to a missing operator or keyword.`,
    `Expected syntax: {% ${valid} %}`
  );
}
function valid_expression(errMsg) {
  const message = errMsg.match(/\[:([a-z_]+), "(.+)"\] is not a valid expression in "({{.*?}})"/i);
  if (message === null) return errMsg;
  return g.ws(
    `Invalid "${y(message[2])}" (${message[1].replace(/_/g, be)}) placement detected in liquid expression.`,
    `This is not a valid output tag: ${message[3]}`
  );
}
function highlight2(string) {
  return A.stream(string)(
    (value) => A(/(<\/?|>)/g, value, a),
    (value) => A.quoted(value, y),
    (value) => A.colons(value, a),
    (value) => A.pipes(value, a),
    (value) => A.url(value, a),
    (value) => value.replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, Bi.bold("$1")),
    (value) => value.replace(/({[{%]-?)([\s\S]*?)(-?%}})/g, (_m, open, inner, close) => {
      const token = A.stream(q(inner))(
        (value2) => A.quoted(value2, pi),
        (value2) => A.colons(value2, a),
        (value2) => A.pipes(value2, a),
        (value2) => value2.replace(/(?<=\s)(=|==|!=|>=|>|<|<=|in)(?=\s)/g, hi("$1")),
        (value2) => value2.replace(/^\s*([a-z]+)(?=\s)/g, be + Ai("$1")),
        (value2) => A(/(\d+)/g, value2, kt)
      );
      return A.dash(Bi(open), a) + token + A.dash(Bi(close), a);
    })
  );
}
function extract(lead, text) {
  let details = xe;
  let summary = xe;
  let message = xe;
  const valid = text.indexOf("- Valid syntax:");
  if (valid > -1) {
    summary = line_number(lead.replace(/(Syntax Error)/, "Syntax error"));
    details = better_details(text.trim());
    message = g(
      y(summary),
      R,
      Wi,
      A.stream(details)((value) => A.colons(value, a))
    );
  } else {
    summary = line_number(lead);
    details = better_details(text.trim());
    message = g(
      y(summary),
      R,
      Wi,
      details
    );
  }
  return {
    summary,
    details,
    message
  };
}
function shopify(source, errMsg, opts = {}) {
  const options = {
    type: "error",
    language: "liquid",
    highlight: true,
    linesAbove: 2,
    linesBelow: 2,
    ...opts
  };
  const context = {};
  if (LINE_EXP.test(errMsg)) {
    const lineNoIndex = errMsg.indexOf("(line") + 6;
    const lineNoEnder = errMsg.indexOf("):");
    const lineInteger = Number(errMsg.slice(lineNoIndex, lineNoEnder));
    const lineNoSlice = lineNoEnder + 2;
    const lineDetails = errMsg.slice(lineNoSlice);
    const {
      summary,
      details,
      message
    } = extract(errMsg.slice(0, lineNoSlice), errMsg.slice(lineNoSlice));
    context.line = lineInteger;
    context.summary = summary;
    context.details = details;
    context.message = ce(highlight2(message), { color: k });
    const location = getErrorLocation(source, lineDetails, lineInteger);
    if (location !== null) {
      context.hasFrame = true;
      context.column = location.range.start.column;
      context.frame = codeframe(source, {
        start: location.range.start,
        language: "liquid",
        end: location.range.ender,
        ...options
      });
    } else {
      context.hasFrame = false;
      context.column = 0;
      context.frame = null;
    }
  } else {
    context.hasFrame = false;
    context.summary = xe;
    context.details = xe;
    context.message = ce(errMsg, { color: k, line: l.red }) + Ye;
    context.line = NaN;
    context.column = NaN;
    context.frame = null;
  }
  return context;
}
function codeframe(source, options) {
  return CodeFrame(source, {
    start: options.start,
    end: options.end
  }, {
    language: "javascript",
    type: "error",
    highlight: true,
    linesAbove: 2,
    linesBelow: 2,
    ...options
  });
}
codeframe.shopify = shopify;
var File = class {
  constructor(uri) {
    assign(this, path2.parse(uri));
  }
  /**
   * Configuration reference. This will hold a reference to additional data.
   * Typically, this is used for transforms, wherein it holds the indexed config.
   *
   * @default undefined // getter when required
   */
  data = void 0;
  /**
   * File value is set in the final process cycle and will hold the file
   * content after transforms conclude.
   *
   * @default ''
   */
  value = "";
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
   * The absolute passed path - this is full URI file path.
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

// syncify/cli/errors.ts
function error(...message) {
  forEach((line) => stderr.prefix("").write(line), message);
}
error.upsert = (failed) => {
  const isWatch = $.mode.bulk || $.mode.push;
  const record = {};
  const errors = [];
  const write2 = pt({ type: "error" });
  for (const { code, file, message, summary, graph: graph2 } of failed) {
    const index = file.key in record ? record[file.key] : null;
    if (index === null) {
      record[file.key] = errors.length;
      errors.push({ code, file, summary, graph: graph2, messages: [message] });
    } else {
      errors[index].messages.push(message);
    }
  }
  let notifier3 = isWatch;
  let heading = "";
  let context;
  for (const { code, file, messages: messages2, summary, graph: graph2 } of errors) {
    heading = "";
    const issue = $.errors.has(file) ? $.errors.get(file) : $.errors.set(file, []).get(file);
    for (const message of messages2) {
      const cf = codeframe.shopify(file.value, message);
      if (cf.hasFrame) {
        isWatch ? write2.Header(cf.summary, w.bold) : write2.Prepend(cf.summary, w.bold);
        write2.Wrap(cf.details, k).Newline().Insert(cf.frame, a).Context({
          entries: {
            line: cf.line,
            column: cf.column,
            input: file.input,
            output: file.output,
            code: me(code),
            graph: kt(graph2)
          }
        });
        if (notifier3 === false) {
          notifier3 = true;
          log.error(file.relative, {
            notify: {
              title: `Error in ${file.key}`,
              message: cf.summary
            }
          });
        }
        if (issue.length === 1) {
          write2.Newline().Unshift(`Type ${y("i")} and press ${y("enter")} to view all file erros`, a);
        }
        write2.toString((message2) => issue.push(message2));
      } else {
        context = {
          entries: {
            input: file.input,
            output: file.output,
            namespace: file.namespace,
            code: me(code),
            graph: kt(graph2)
          }
        };
        if (notifier3 === false) {
          notifier3 = true;
          log.error(`${failed.length} ${plur("error", failed.length)} detected`, {
            notify: {
              title: "Request Failed",
              message: `Rejected by Shopify with ${failed.length} ${plur("Error", failed.length)}`
            }
          });
        }
        if (heading === summary) {
          write2.Insert(cf.message, a);
        } else {
          if (heading !== "") {
            write2.Context(context).Newline().toString(issue.push);
          }
          heading = summary;
          write2.Header(summary, y).Insert(cf.message, a);
        }
      }
    }
    if (heading !== "") {
      issue.push(
        write2.Context(context).Newline().toString()
      );
    }
    if (write2.isEmpty) issue.push(write2.toString());
  }
  if (isWatch === false) {
    for (const [file, messages2] of $.errors) {
      error(messages2.shift());
      if (messages2.length > 0) $.errors.delete(file);
      break;
    }
  }
};
error.graph = (e2) => {
  const count = e2.errors.length;
  const write2 = pt({ type: "error" }).Header(`${count} GRAPHQL ${plur("ERROR", count)}`, y.redBright);
  for (const item of e2.errors) {
    write2.Wrap(item.message.replace(/(\s+'.*?'\s*)/g, y("$1")));
    if (has("path", item)) {
      write2.Newline();
      let indent = "";
      const max = item.path.length - 1;
      item.path.forEach((path5, i) => {
        if (i !== 0) indent += "  ";
        if (max !== i) {
          write2.Line(`${indent}${path5} ${a("{")}`, x);
        } else {
          write2.Line(`${indent}${path5}`, w.bold);
          indent = indent.slice(2);
        }
      });
      item.path.forEach((path5, i) => {
        if (max !== i) {
          write2.Line(`${indent}${a("}")}`);
          indent = indent.slice(2);
        }
      });
    }
    write2.Newline();
  }
  write2.Context({
    entries: {
      target: e2.target.target,
      domain: e2.target.store.domain,
      graph: me(e2.graph)
    }
  });
  write2.Newline().End($.log.group).Break().toLog();
  kill.exit(0);
};
error.request = (e2) => {
  if ($.running) {
    log.spinner.stop();
  } else {
    log.error("Request failed", {
      suffix: e2.graph,
      notify: {
        message: `An error was thrown when attempting to interface with ${e2.target.store.domain} store.`
      }
    });
  }
  if (e2 instanceof TypeError) {
    pt({ type: "error" }).Header("TYPE ERROR", y.redBright).Wrap(e2.message).Context({
      stack: e2.stack,
      cleanStack: true,
      entries: {
        code: e2.code,
        status: e2.status,
        name: e2.name,
        graph: e2.graph,
        detail: "POSSIBLY INTERNAL"
      }
    }).Newline().End($.log.group).Break().toLog();
    kill.exit(0);
  } else if (e2.isGraphError) {
    return error.graph(e2);
  } else if (e2.isGraphError) {
    pt({ type: "error" }).Header("REQUEST ERROR", y.redBright).Wrap(e2.message).Context({
      entries: {
        code: e2.code,
        status: e2.status,
        graph: e2.name
      }
    }).Newline().toLog({ clear: true });
  }
};
error.toml = (file, e2) => {
  if (e2 instanceof $import.toml.TomlError) {
    const context = {
      entries: {
        location: `${e2.line}${R}${e2.column}`,
        input: file,
        cause: e2.cause,
        processor: me("TOML")
      }
    };
    const code = e2.codeblock.replace(/\[/g, oi("[")).replace(/=/g, pi("=")).replace(/("[\s\S]*")/g, P("$1")).replace(/(\d+)(:)/g, `${li("$1")} ${l.line}`).replace(/(\^)/, "$1 " + l.line);
    pt({ type: "error" }).Line(`TOML Error on Line ${e2.line}`, y).Newline().Wrap(e2.message.replace(e2.codeblock, "").trim()).Newline().Wrap(code).Newline().Context(context).Newline().toLog({ clear: true });
  }
};
error.throw = (e2, entries) => {
  const context = {
    stack: false,
    entries: { ...entries }
  };
  const message = e2.message.replace(/(OnlineStoreThemeFileReadResult)/, y("$1"));
  if (has("stack", e2)) context.stack = e2.stack;
  if (has("code", e2)) context.entries.code = e2.code;
  if (has("name", e2)) context.entries.name = e2.name;
  const tui = pt({ type: "error" });
  if (context.stack === false) {
    error(tui.Wrap(message, k).Context(context).toString());
    kill.exit(0);
  } else {
    $.stacks.add(tui.Wrap(message).Context(context).toString());
  }
};
error.write = (message, context) => (e2) => {
  pt({ type: "error" }).Newline().Wrap(e2.message).Context({ stack: e2.stack, entries: { ...context, code: e2.code, name: e2.name, details: message } }).Newline().toLog({ clear: true });
};
error.read = (details, entries) => {
  return function(e2) {
    pt({ type: "error" }).Header("FILE ERROR").Wrap(e2.message).Newline().Context({
      stack: e2.stack,
      entries: {
        code: e2.code,
        details,
        ...entries,
        name: e2.name
      }
    }).toLog({ clear: true });
  };
};
error.json = (e2, file, details = "JSON Parse Error" + R) => {
  const frame = codeframe(e2.source, {
    language: "json",
    start: {
      line: e2.line,
      column: e2.column
    }
  });
  pt({ type: "error" }).Prepend(details, y).Wrap(A.numbers(e2.message.replace(/Line \d+:\s+/, ""), y), k).Newline().Insert(frame).Context({
    entries: {
      line: e2.line,
      column: e2.column,
      input: isString(file) ? path2.relative($.cwd, path2.basename(file)) : file.relative,
      processor: me("JSON")
    }
  }).toLog({ clear: true });
};
error.sass = (file, e2) => {
  const entries = {};
  const write2 = pt({ type: "error" }).Newline().Wrap(e2.sassMessage, w.bold).Newline();
  const { span } = e2;
  const source = node_fs.readFileSync(span.url.pathname, "utf8");
  const frame = codeframe(source, {
    start: {
      line: span.start.line + 1,
      column: span.start.column
    }
  });
  write2.Insert(frame);
  const uri = Be + path2.relative($.cwd, span.url.pathname);
  entries.line = span.start.line + 1;
  entries.column = span.start.column;
  entries.input = Be + file.relative;
  if (entries.input !== uri) entries.source = uri;
  if (/\/node_modules\//.test(span.url.pathname)) {
    entries.module = kt(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
  }
  entries.cause = e2.cause;
  entries.processor = me("SASS Dart");
  write2.Newline().Context({ entries }).toLog();
};
error.terser = (file, e2) => {
  pt({ type: "error" }).Header("Terse minification error").Wrap(e2.message, w.bold).Newline().Context({
    entries: {
      input: file.input,
      cause: e2.cause,
      processor: me("html-minifier-terser")
    }
  }).NL.toWrite(error);
};
error.esbuild = (file, errors) => {
  if (errors.length === 0) return;
  const { length } = errors;
  const multiple = length > 1;
  const isSyncifyConfig = file.type === 20 /* Syncify */;
  if (!isSyncifyConfig) {
    log.error(file.relative, {
      suffix: "transform failed",
      notify: {
        title: `${length} ${file.kind} ${plur("Error", length)}`,
        message: `${file.key || file.base}`
      }
    });
  }
  if (errors.length > 1) log.nl("red");
  file.value = node_fs.readFileSync(file.input, "utf8");
  const issues = errors.map(({
    location,
    text,
    pluginName
  }, no) => {
    const write2 = pt({ type: "error" }).Template({ id: "errors" }).True(multiple, (tui) => tui.Update("errors", `${y("ERROR")} ${y(no + 1)} of ${y(length)}`)).Header(multiple ? ze(file.input) : y.redBright(`${file.kind} Error`));
    if (location === null) {
      const context = { entries: {} };
      if (pluginName === "acquire") {
        context.entries.internal = "@syncify/acquire";
      } else {
        context.entries.plugin = pluginName;
      }
      context.entries.namespace = file.namespace;
      context.entries.processor = me("ESBuild");
      if (/Require stack:\n/.test(text)) {
        text = text.replace(/Require stack:\n/, "\nRequire stack:\n");
      }
      write2.Wrap(text, k).Newline().Context(context).Newline();
    } else {
      const frame = codeframe(file.value, {
        language: "javascript",
        highlight: true,
        start: {
          line: location.line,
          column: location.column
        }
      });
      write2.Wrap(`${text} on line ${location.line}`, k).Newline().Insert(frame).Context({
        entries: {
          line: location.line,
          column: location.column,
          file: location.file,
          plugin: pluginName,
          namespace: location.namespace,
          processor: me("ESBuild")
        }
      });
    }
    if (multiple) {
      write2.Mark("legend").Tree("info").Newline().Dash(stdin.ansi.legend.e, a).Newline().End(stdin.ansi.footer, false);
    }
    return write2;
  });
  if (isSyncifyConfig) {
    issues.forEach((message) => message.Newline().End("Error").toLog({ clear: true }));
    kill.exit(0);
  } else if (issues.length > 1) {
    stdin.errors.listen(issues);
  } else {
    issues[0].toLog({ clear: true });
  }
};
error.postcss = (file, e2) => {
  const stack = [];
  const trace = gr(e2.stack, { pretty: true, basePath: $.cwd }).split("\n");
  while (trace.length !== 0) stack.push(l.red + trace.shift());
  $.stacks.add(stack.join("\n"));
  const context = {
    stack: true,
    entries: {
      line: e2.line,
      column: e2.column,
      source: file.input,
      file: file.input === e2.file ? void 0 : e2.file,
      plugin: li(e2.plugin),
      processor: me("PostCSS")
    }
  };
  pt({ type: "error" }).Newline().Wrap(`${e2.name}${R} ${e2.reason}`, w.bold).Newline().Multiline(e2.showSourceCode(true)).Context(context).toLog();
};
error.generic = (e2) => {
  pt({ type: "error" }).Wrap(e2.message, k).True(e2.stack, (tui) => tui.Context(e2.context)).End("Error").Break().toLog();
  kill.exit(0);
};

// syncify/cli/log.ts
function log(...message) {
  forEach((line) => console2.stdout.prefix("").write(line), message);
  return log;
}
log.renamed = [];
log.progress = uo;
log.update = z;
log.spinner = Le();
log.line = console2.info;
log.bulk = bulk;
log.begin = function(message, {
  timestamp = true,
  clear = true,
  group = false
} = {}) {
  if (clear) log.clear();
  if (group) $.log.group = message;
  log(Er(message, timestamp) + l.next);
};
log.ender = function(message, { timestamp = true, clear = true } = {}) {
  if (!message) message = $.log.group;
  if (clear) log.clear();
  log(l.trim + "\n" + Br(message));
  return this;
};
log.wrap = (...message) => {
  if (isFunction(last(message))) {
    const color = message.pop();
    console2.info(ce(message, { color, firstLineTree: false }));
  } else {
    console2.info(ce(message, { firstLineTree: false }));
  }
};
log.hline = (options = {}) => {
  const { wrap } = $.terminal;
  if (isEmpty(options)) {
    options.width = wrap;
    options.newlines = false;
  } else {
    const has2 = hasProp(options);
    if (!has2("width")) options.width = wrap;
    if (!has2("newlines")) options.newlines = false;
  }
  log(
    BD(
      options.width,
      options.newlines
    )
  );
};
log.write = (message, {
  color = null,
  type: type2 = null,
  prefix = null,
  suffix = null
} = {}) => {
  if (type2 === "error") {
    if (prefix === null) {
      error(
        g.ws(
          yD(color ? color(message) : k(message)),
          dr(suffix)
        )
      );
    } else {
      error(
        yD(
          (color || k)(
            ae(
              prefix,
              g.ws(
                message,
                dr(suffix)
              )
            )
          )
        )
      );
    }
  } else if (type2 === "warning") {
    if (prefix === null) {
      console2.info(
        wD(
          g.ws(
            color ? color(message) : P(message),
            dr(suffix)
          )
        )
      );
    } else {
      console2.info(
        wD(
          (color || P)(
            ae(
              prefix,
              g.ws(
                message,
                dr(suffix)
              )
            )
          )
        )
      );
    }
  } else {
    if (prefix === null) {
      console2.info(
        xD(
          g.ws(
            color ? color(message) : Y(message),
            dr(suffix)
          )
        )
      );
    } else {
      console2.info(
        xD(
          (color || Y)(
            ae(
              prefix,
              g.ws(
                message,
                dr(suffix)
              )
            )
          )
        )
      );
    }
  }
};
log.nl = function(entry) {
  entry === "" ? console2.nl() : console2.ln(entry);
  return this;
};
log.clear = (force = false) => {
  if (force === false && $.config.log.clear === false) return;
  log(ui);
};
log.group = function(name) {
  if ($.config.log.silent || $.env.tree === false) return;
  if ($.mode.bulk) {
    name = `Bulk ${Ri} ${toUpcase(name)}`;
    if ($.log.group === name) return this;
    $.log.group = name;
  }
  log.ender($.log.group);
  if ($.config.log.clear && name !== false) log.clear();
  if (isString(name)) {
    $.log.group = name;
    log.begin($.log.group);
  }
  return this;
};
log.task = (name, timestamp = true) => {
  if ($.config.log.silent || $.env.tree === false) return;
  if (isString(name)) {
    log(kD(g.ws(a(name), timestamp ? dr(getTime()) : "")));
  } else {
    log.clear();
    log(l.after + kD(g.ws(a($.log.group), dr(getTime()))));
  }
};
log.process = (label, ...message) => {
  if ($.mode.pack || $.mode.build || $.config.log.silent) return;
  const print = ae(
    "process",
    message.length === 2 ? g.ws(
      y(label),
      Ri,
      message[0],
      dr(message[1])
    ) : g.ws(
      y(label),
      dr(message[0])
    )
  );
  console2.info(Y(print));
};
log.deleted = (file, theme2) => {
  const message = $.mode.bulk ? ae("deleted", file) : ae("deleted", file, theme2.target, theme2.store.domain);
  console2.info(hi(message));
};
log.upload = (theme2, input) => {
  if ($.config.log.silent) return;
  if ($.mode.watch) {
    if (input) {
      if (isArray(input)) {
        if (input.length > 0) {
          if (isString(input[0])) {
            forEach((file) => log.upload(theme2, file), input);
          } else {
            forEach(({ filename }) => log.upload(theme2, filename), input);
          }
        }
      } else {
        console2.info(
          Q(
            ae(
              "uploaded",
              input,
              theme2.target,
              theme2.store.name,
              import_timer2.timer.stop()
            )
          )
        );
      }
    } else {
      $.log.queue.add([theme2.target, theme2.store.domain, import_timer2.timer.stop()]);
      if ($.log.idle) return;
      $.log.idle = true;
      q2.http.onIdle().then(() => {
        for (const [target, store, ctime] of $.log.queue) {
          console2.info(
            Q(
              ae(
                "uploaded",
                y(target),
                store,
                ctime
              )
            )
          );
        }
        $.log.queue.clear();
        $.log.idle = false;
      });
    }
  } else {
    console2.info(
      Q(
        ae(
          "uploaded",
          y(theme2.target),
          theme2.store.domain,
          import_timer2.timer.stop()
        )
      )
    );
  }
};
log.upsert = (upsert) => {
  if ($.mode.bulk) {
    const { target, store } = upsert.target;
    forEach(({ filename }) => {
      bulk.synced(filename, target, store.name);
      bulk.progress.increment();
      bulk.tui.Update($.bulk.type, bulk.progress.render()).toUpdate();
    }, upsert.synced);
    if (upsert.errors.length > 0) {
      error.upsert(upsert.errors);
      bulk.progress.increment(upsert.errors.length);
      bulk.tui.Update($.bulk.type, bulk.progress.render()).Update("errors", `${y($.errors.size)} ${plur("Error", $.errors.size)}`, k).toUpdate();
    }
  } else {
    forEach(({ filename }) => {
      console2.info(
        Q(
          ae(
            "uploaded",
            y(upsert.target.target),
            upsert.target.store.name,
            filename,
            import_timer2.timer.stop()
          )
        )
      );
    }, upsert.synced);
    if (upsert.errors.length > 0) {
      error.upsert(upsert.errors);
    }
  }
};
log.changed = (file) => {
  if ($.errors.size > 0) $.errors.clear();
  if ($.warnings.size > 0) {
    $.warnings.clear();
    stdin.warnings.reset();
  }
  if ($.config.log.silent === true || $.mode.watch === false) return;
  import_timer2.timer.start();
  const name = `${file.kind} ${Ri} ${toUpcase(file.namespace)}`;
  const change = $.log.changes.has(file.relative) ? $.log.changes.get(file.relative) + 1 : 1;
  $.log.changes.set(file.relative, change);
  if ($.log.group !== name) {
    log.group(name);
    if ($.log.title !== file.namespace) $.log.title = file.namespace;
  } else if ($.config.log.clear) {
    log.group(name);
  }
  if ($.log.uri !== file.input) $.log.uri = file.input;
  log(
    xD(
      Bi(
        ae(
          "changed",
          `${file.relative} ${dr(`${change} ${plur("change", change)}`)}`
        )
      )
    )
  );
};
log.syncing = (path5, { hot = false } = {}) => {
  if ($.mode.pack || $.mode.bulk || $.mode.build || $.mode.debug || $.config.log.silent) return;
  if ($.warnings.has(path5)) {
    const { size } = $.warnings.get(path5);
    log.warn(`${y(size)} ${plur("warning", size)}`, Fe.warning);
  }
  console2.info(
    pi(
      ae(
        "syncing",
        path5.replace(/^(\d+)/, y("$1"))
      )
    )
  );
  if (q2.http.pending > (hot ? 0 : 2)) {
    console2.info(
      Ei(
        ae(
          "queued",
          g.ws(
            path5,
            Be,
            y(addSuffix(q2.http.pending)),
            "in queue"
          )
        )
      )
    );
  }
};
log.prompt = (message, notify) => {
  console2.info(
    xD(
      Ei(
        ae("prompt", message)
      )
    ),
    Br($.log.group)
  );
  if (isObject(notify)) notifier2__default.default.notify(notify).notify();
  return () => console2.info(Er($.log.group));
};
log.resource = (type2, store) => {
  if ($.mode.watch) {
    $.log.queue.add(
      [
        type2,
        store.domain,
        import_timer2.timer.stop()
      ]
    );
    if ($.log.idle) return;
    else $.log.idle = true;
    q2.http.onIdle().then(() => {
      for (const [type3, store2, ctime] of $.log.queue) {
        console2.info(
          xD(
            Q(
              ae(
                "uploaded",
                g.ws(
                  y(type3),
                  K,
                  store2,
                  dr(ctime)
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
    console2.info(
      xD(
        Q(
          ae(
            "uploaded",
            g.ws(
              y(type2),
              K,
              store.domain,
              dr(import_timer2.timer.stop())
            )
          )
        )
      )
    );
  }
};
log.invalid = (path5, message) => {
  error(
    w(
      ae("invalid", path5)
    )
  );
  notifier2__default.default.notify(
    {
      title: "Syncify Error",
      sound: "Pop",
      open: path5,
      subtitle: path5,
      message: "Invalid error"
    }
  ).notify();
  if (message) {
    error(
      ce(
        ...message,
        { line: "red", color: k }
      )
    );
  }
};
log.error = (input, { suffix = null, notify = null } = {}) => {
  if ($.mode.bulk) return;
  const message = A.numbers(input, y);
  error(
    yD(
      k(
        ae(
          "failed",
          suffix ? `${message} ${dr(suffix)}` : message
        )
      )
    )
  );
  if (notify !== null) {
    notify.contentImage = $.file.notifier;
    notifier2__default.default.notify(notify).notify();
  }
};
log.warn = (message, suffix) => {
  console2.warn(
    P(
      ae(
        "warnings",
        suffix ? `${message} ${dr(suffix)}` : `${message}`
      )
    )
  );
};
log.transform = (label, ...suffix) => {
  if ($.mode.build || $.mode.bulk || $.mode.debug) return;
  console2.info(
    Y(
      ae(
        "transform",
        y(label),
        ...suffix
      )
    )
  );
};
log.minified = (...p) => {
  if ($.mode.pack || $.mode.bulk || $.mode.build || $.config.log.silent) return;
  const message = p.length === 1 ? Y(
    ae(
      "minified",
      y(p[0])
    )
  ) : p.length === 4 ? Y(
    ae(
      "minified",
      `${y(p[0])} ${K} ${p[1]} ${Li} ${p[2]} ${dr(`saved ${p[3]}`)}`
    )
  ) : Y(
    ae(
      "minified",
      `${y(p[0])} ${Li} ${p[1]} ${Ri} saved ${p[2]} ${dr(import_timer2.timer.now())}`
    )
  );
  console2.info(message);
};
log.zipped = (size, path5) => {
  console2.info(
    Y(
      ae(
        "zipped",
        `${y("ZIP")} ${size} ${dr(path5)}`
      )
    )
  );
};
log.skipped = (file, reason) => {
  if ($.mode.pack || $.mode.build || $.mode.bulk) return null;
  console2.info(
    a(
      ae(
        "skipped",
        `${isString(file) ? file : file.key} ${dr(reason)}`
      )
    )
  );
  return null;
};
log.ignored = (path5) => {
  console2.info(
    P(
      ae("ignored", path5)
    )
  );
};
log.header = (label, color = Y.bold) => {
  log(ct(color(label)));
};
log.rename = (from, to) => {
  log.renamed.push(
    Y(
      ae(
        "renamed",
        `${y(from)} ${Li} ${y(to)}`
      )
    )
  );
};
log.hot = (id) => {
  console2.info(
    St(
      ae(
        "reloaded",
        `${y("HOT RELOAD")} ${dr(import_timer2.timer.now(id))}`
      )
    )
  );
};
log.exported = (from, to) => {
  if ($.mode.build) return;
  console2.info(
    Ci(
      ae(
        "exported",
        `${y(from)} ${Li} ${y(to)}`
      )
    )
  );
};
log.retrying = (file, theme2) => {
  console2.info(
    Ei(
      ae(
        "retrying",
        file,
        theme2.target,
        theme2.store.domain
      )
    )
  );
};
log.reloaded = (path5, time) => {
  console2.info(
    Y(
      ae(
        "reloaded",
        `${path5} ${dr(time)}`
      )
    )
  );
};
log.version = (vc, type2) => {
  console2.info(
    Y(
      ae(
        "version",
        `${y(vc.number)} ${Li} ${y(vc.update.number)} ${dr(type2)}`
      )
    )
  );
};

// syncify/cli/runtime.ts
function runtime() {
  if ($.config.log.silent || $.running) return;
  import_timer3.timer.start("runtime");
}
runtime.log = pt();
runtime.startup = function() {
  if ($.running) {
    return null;
  } else {
    runtime.log.Top("Syncify").Newline().Template(ze.dim(`v${$.version}`), { id: "v" }).True($.terminal.cols < 80, function() {
      this.Header("TERMINAL WIDTH WARNING", y.red).Wrap(
        w,
        `Your terminal width is below ${y(80)} columns (currently ${y($.terminal.cols)})`,
        "This is not recommended for usage with Syncify (size matters).",
        "Expand your terminal width wider for an optimal console experience."
      );
    }).Newline().toLog({ clear: true });
    N2("@syncify/cli", $.version).then((version) => {
      if (version !== false) {
        const latest = `${Q(`${y(version.registry)} (available)`)}`;
        runtime.log.Update("v", `${w.dim($.version)} ${Li} ${latest}`).toUpdate().done();
      }
    });
  }
};
runtime.time = () => {
  if ($.mode.build || $.running) return;
  runtime.log.Line(`${Ot} Runtime ~ ${import_timer3.timer.stop("runtime")}`, a.dim).toLog({
    clear: true,
    trim: true
  });
};
runtime.modes = function() {
  if ($.mode.link) {
    log.wrap(
      "Select theme target/s to be inserted into your package.json file.",
      "You will be given a code example after selecting where you will define",
      "a custom target name. If you would like to create a new theme, then run",
      `the ${si("publish")} resource`,
      a
    );
  } else {
    if (!isEmpty($.filters)) {
      const tui = pt().Newline().Line(`Filters${R}`, ze.bold);
      const space = eqWS($.filters);
      for (const group in $.filters) {
        const join29 = ze($.filters[group].map((k2) => path2.relative($.cwd, k2)).join(", "));
        tui.Line(` ${Be} ${group}${R}${space(group)}${join29}`, Bi);
      }
      tui.Newline().toLog({ clear: true });
    }
  }
};
runtime.stores = function() {
  if (!$.mode.watch) return;
  getThemeURLS($.target, "editor");
  getThemeURLS($.target, "preview");
  runtime.log.Newline().toLog({ clear: true });
};
runtime.hot = ({ isError = false } = {}) => {
  runtime.log.Stop("Reloads" + R, Y.bold);
  if (isError) {
    runtime.log.Line(`  ${vt} ${k("server")}  ${K}  ${k("FAILED")}`).Append(`  ${vt} ${k("socket")}  ${K}  ${k("FAILED")}`).toLog({ clear: true });
  } else {
    runtime.log.Line(`  ${Be} ${me("method")}  ${K}  ${me.bold(`${$.hot.method.toUpperCase()}`)}`).Line(`  ${Be} ${me("server")}  ${K}  ${me(`${$.hot.server}`)}`).Append(`  ${Be} ${me("socket")}  ${K}  ${me(`${$.hot.socket}`)}`).toLog({ clear: true });
  }
};
runtime.warnings = () => {
  if (!$.config.log.warnings) return;
  const props = keys(warnings);
  const amount = props.reduce((n, k2) => n = n + warnings[k2].length, 0);
  if (amount === 0) return;
  runtime.log.Tree("warning").Line(`${amount} ${plur("Runtime Warning", amount)}`, y);
  for (const key of props) {
    const item = warnings[key];
    if (item.length > 0) {
      item.length === amount ? runtime.log.Line(`${key} ${plur("Warning", item.length)}${R}`, y) : runtime.log.Prepend(`${item.length} ${key} ${plur("Warning", item.length)}`, y);
      runtime.log.Each(item, function(message) {
        this.Line(`  \uD800\uDD02 ${message}`, P);
      });
    }
  }
  runtime.log.Tree("info").Newline().toLog({ clear: true });
};
function getThemeURLS(themes, url) {
  const editor = url === "editor";
  const width = themes.reduce((size, { target, store }) => {
    if (store.name.length > size.store) size.store = store.name.length;
    if (target.length > size.theme) size.theme = target.length;
    return size;
  }, { store: 0, theme: 0 });
  runtime.log.Line(plur(toUpcase(url), themes.length) + R, y.white).Each(themes, function({ target, store, editor: editor2, preview }) {
    this.Line(
      g.ws(
        " ",
        Be,
        kt(store.name),
        be.repeat(width.store - store.name.length),
        K,
        be,
        kt.bold(target),
        be.repeat(width.theme - target.length),
        K,
        be,
        a.underline(editor2 || preview)
      )
    );
  }).True(editor, (tui) => tui.Newline());
}

// syncify/cli/throws.ts
var warnings = o();
var severities = o();
function warnOption(group) {
  if (!has(group, warnings)) warnings[group] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      warnings[group].push(P(message));
    } else {
      warnings[group].push(P(message + R + " " + y(value)));
    }
  };
}
function warnSevere(group) {
  if (!has(group, severities)) severities[group] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      severities[group].push(l.red + w(message));
    } else {
      severities[group].push(l.red + w(message + R + " " + y(value)));
    }
  };
}
function internalError(e2) {
  const message = pt({ type: "error" }).Line("INTERNAL ERROR ~ Thrown during define()", y).Header(e2.message).Wrap(gr(e2.stack)).Newline().Line("Submit Issue", a.bold).Line("This is an internal error thrown by Syncify. Please report to the", a).Line("Github repository and provide re-production information", a).Newline().Line(Ri + " " + Ce.gray("https://github.com/panoply/syncify/issues")).Newline().End($.log.group).Break().toString();
  error(message);
  $.running ? kill.exit(0) : process.exit(0);
}
function typeError({ option, name, provided, expects }) {
  const base = path2.basename($.file.config);
  error(
    pt({ type: "error" }).Line("TYPE ERROR", y).Newline().Line(`An invalid ${si(option)} type value was provided within your ${y(base)} file.`).Line(`The ${si(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`).Newline().Line(`provided${R} ${P(type(provided).toLowerCase())}`).Line(`expected${R} ${li(expects.replace(/([|,])/g, a("$1")))}`).Line(`location${R} ${Be}${a.underline(base)}`).Newline().Line("How to fix?", a.bold).Line(`You need to change the option value to use the ${li("expected")} type.`, a).Line(`Use the ${ze("defineConfig")} named export for type checking`, a).End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function invalidCommand({
  message,
  expected,
  provided = void 0,
  fix
}) {
  if (!provided) {
    provided = g.ws($.argv);
    expected = Y(`sy ${provided} ${si(expected.replace(/([|,-])/g, a("$1")))}`);
  } else {
    expected = Y(`sy ${expected}`);
  }
  error(
    pt({ type: "error" }).Line("COMMAND ERROR", y).Newline().Wrap(message).Newline().Line(`provided${R} ${Y("$")} ${provided}`).Line(`expected${R} ${Y("$")} ${expected}`).Newline().Line("How to fix?", a.bold).Wrap(fix, a).Newline().End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function enoentError({
  type: type2,
  path: path5,
  message,
  task
}) {
  error(
    pt({ type: "error" }).Line("ENOENT ERROR", y).Newline().Wrap(`Failed to resolve ${si(path5)} ${type2}.`, ...message).Newline().Line(`task${R} ${P(task)}`).Line(`path${R} ${li(path5)}`).Newline().End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function missingDependency(deps) {
  const tui = pt({ type: "error" }).Line("DEPENDENCY ERROR", y).Newline();
  if (isString(deps)) {
    const message = g.ws(
      `Missing ${si(deps)} dependency. You need to install ${si(deps)} to use it as`,
      "a processor or remove the reference to it within your transform/s."
    );
    tui.Wrap(message).Newline().Line("How to fix?", a.bold).Line("Install the above module as a development dependency, for example:", a).Newline().Line(`$ pnpm add ${deps} -D`, Y);
  } else {
    const message = g.ws(
      `Missing ${si(`${deps.length}`)} dependencies. You are attempting to use a processor`,
      "transform that is not yet installed in your project. Install the below module/s as",
      "development dependencies or disable the transform:"
    );
    tui.Wrap(message).Newline();
    for (const dep of deps) {
      tui.Line(`$ pnpm add ${dep} -D`, Y);
    }
  }
  error(
    tui.Newline().End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function missingOption({ option, key, expects, reason }) {
  const base = path2.basename($.file.config);
  if (option.indexOf(".") > -1) {
    option = option.split(".").filter(Boolean).join(a(" \u2192 "));
  }
  error(
    pt({ type: "error" }).Line("MISSING OPTION", y).Newline().Line(`Missing ${mD("CB", si(option), { spaced: true })} config option.`).Line(`The ${si(key)} option must be defined`).Newline().Line(`expected${R} ${li(expects.replace(/([|,])/g, a("$1")))}`).Line(`location${R} ${a.underline(base)}`).Newline().Line("Why?", a.bold).Wrap(reason, a).Newline("line").End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function invalidError({
  option,
  name,
  value,
  expects,
  reason = [""]
}) {
  if (option.indexOf(".") > -1) {
    option = option.split(".").filter(Boolean).join(a(" \u2192 "));
  }
  error(
    pt({ type: "error" }).Line("INVALID ERROR", y).Newline().Wrap(`Invalid ${si(option)} configuration. The ${si(name)} option is invalid. `, ...reason).Newline().Line(`provided${R} ${P(value)}`).Line(`expected${R} ${li(expects.replace(/([|,])/g, a("$1")))}`).Newline().Line("How to fix?", a.bold).Line("You need to update the option and use one of the expected values.", a).Line(`Use the ${ze("defineConfig")} named export for type checking`, a).Newline().End($.log.group).Break().toString({ color: w })
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function unknownProject() {
  const message = g.ws(
    "Syncify cannot run from this location as it is unknown. The necessary files",
    "and references that would auto-confirm this directory as a valid project could",
    "not be located."
  );
  const write2 = pt({ type: "error" }).Line("UNKNOWN PROJECT", y).Newline().Wrap(message).Header(`${Ce.redBright($.cwd)}`);
  let _stores = false;
  let _credential = false;
  let _config = false;
  if ($.project.credentials === null) {
    write2.Line(`${vt} no credentials`, y);
  } else {
    _credential = true;
  }
  if ($.stores.length === 0) {
    write2.Line(`${vt} no targets`, y);
  } else {
    _stores = true;
  }
  if ($.file.config === null) {
    write2.Line(`${vt} no config file`, y);
  } else {
    _config = true;
  }
  if (_config) write2.Line(`${Pi} ${path2.basename($.file.config)}`, Q);
  if (_stores) write2.Line(`${Pi} stores defined`, Q);
  if (_credential) {
    if ($.project.credentials === "env") {
      write2.Line(`${Pi} .env file`, Q);
    } else {
      write2.Line(`${Pi} using keychain`, Q);
    }
  }
  const suggest = g.ws(
    `Run the ${Bi("sy init")} command if you would like to make this directory a Syncify project.`,
    "You can alternatively provide the necessary files/references. For more information",
    `visit the setup guide: ${Ce("https://syncify.sh/setup/")}`
  );
  error(
    write2.Newline().Line("How to fix?", a.bold).Wrap(suggest, a).Newline("line").End($.log.group).Break().toString({ color: w })
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function missingEnv() {
  const message = g.ws(
    `Missing ${si(".env")} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${si(".env")} file present in the root of your project`
  );
  error(
    pt({ type: "error" }).Line("MISSING ENV", y).Newline().Wrap(message).Newline().End($.log.group).Break().toString({ color: w })
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function invalidCredentials() {
  const message = g.ws(
    "The project's authorization access failed due to missing or invalid credentials.",
    "Syncify could not obtain the store access tokens. Check that you have correctly",
    `provided API access within your ${si(".env")} file.`
  );
  const suggest = g.ws(
    "Credentials are expected to adhere to a specific format and can be expressed",
    'in either uppercase or lowercase. The store name must be is appended with "_api_token".',
    `If the Shopify store (domain) name is ${ze("foo-store.myshopify.com")}:`
  );
  error(
    pt({ type: "error" }).Line("BAD CREDENTIALS", y).Newline().Wrap(message).Newline().Line($.file.env, Ce.redBright).Newline().Line("How to fix?", a.bold).Wrap(suggest, a).Newline().Line("FOO-STORE_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz'", a).Newline().End($.log.group).Break().toString({ color: w })
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function errorRuntime(e2, options) {
  const message = e2 instanceof Error ? has("message", e2) ? e2.message : e2.toString() : e2;
  if (has("code", e2)) options.entries.code = e2.code;
  if (has("name", e2)) options.entries.name = e2.name;
  runtime.log.Tree("error").Header("ERROR", y.red).Wrap(options.message, k).Newline().Wrap(message, k.bold).Newline().Line("How to fix?", a.bold).Wrap(options.solution, a).Newline().Context({ entries: options.entries }).Newline().End($.log.group).Break().toLog({ clear: true });
  $.running ? kill.exit(0) : process.exit(0);
}
function throwError(message, solution, errName) {
  if (!errName) errName = "ERROR";
  const tui = pt({ type: "error" }).Line(errName.toUpperCase(), y).Newline().Wrap(message);
  if (solution && solution.length > 0) {
    tui.Line("How to fix?", a.bold).Wrap(solution, a);
  }
  error(
    tui.Newline(l.trim).End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}
function throwCommand(message) {
  pt({ type: "error" }).Top(`Syncify ${Ri} Error`, false).Newline(l.trim).Line("COMMAND LINE ERROR", y).Newline().Wrap(message).Newline().Line("Need Help?", a.bold).Line("Refer to the usage documentation for more information:", a).Line(Ce("https://syncify.sh/usage/syncify-cli"), a).Newline(l.trim).End(`Syncify ${Ri} Error`, false).toLog();
  $.running ? kill.exit(0) : process.exit(0);
}
function unknownError(option, value) {
  if (option.indexOf(".") > -1) {
    const opts = option.split(".").filter(Boolean).join(" " + K + " ");
    const join29 = g.ws(opts, K, w.bold(value));
    option = mD("CB", join29, { spaced: true });
  }
  const base = path2.basename($.file.config);
  const file = base === "package.json" ? `${li("syncify")} config in the ${li("package.json")} file.` : `${li(base)} file.`;
  error(
    pt({ type: "error" }).Line("ERROR", y).Newline().Line(`Unknown ${si(option)} option provided.`).Newline().Line("How to fix?", a.bold).Line(`The ${si(value)} option is invalid or unsupported.`).Line(`You need to remove it from the ${file}`).Newline().End($.log.group).Break().toString()
  );
  $.running ? kill.exit(0) : process.exit(0);
}

// syncify/modes/build.ts
var import_anymatch2 = __toESM(require_anymatch());

// node_modules/.pnpm/p-map@7.0.3/node_modules/p-map/index.js
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true,
  signal
} = {}) {
  return new Promise((resolve_, reject_) => {
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
    const signalListener = () => {
      reject(signal.reason);
    };
    const cleanup = () => {
      signal == null ? void 0 : signal.removeEventListener("abort", signalListener);
    };
    const resolve2 = (value) => {
      resolve_(value);
      cleanup();
    };
    const reject = (reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
      cleanup();
    };
    if (signal) {
      if (signal.aborted) {
        reject(signal.reason);
      }
      signal.addEventListener("abort", signalListener, { once: true });
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
            resolve2(result);
            return;
          }
          const pureResult = [];
          for (const [index2, value] of result.entries()) {
            if (skippedIndexesMap.get(index2) === pMapSkip) {
              continue;
            }
            pureResult.push(value);
          }
          resolve2(pureResult);
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
        } catch (error2) {
          if (stopOnError) {
            reject(error2);
          } else {
            errors.push(error2);
            resolvingCount--;
            try {
              await next();
            } catch (error3) {
              reject(error3);
            }
          }
        }
      })();
    };
    (async () => {
      for (let index = 0; index < concurrency; index++) {
        try {
          await next();
        } catch (error2) {
          reject(error2);
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

// syncify/modes/build.ts
var import_timer10 = __toESM(require_dist());
function http(domain, token) {
  if (domain in http.tokens) {
    return http.client[domain];
  } else if (domain && token) {
    http.tokens[domain] = token;
    http.client[domain] = xior__default.default.create({
      baseURL: `https://${domain}.myshopify.com/admin/api/${http.VERSION}`,
      method: "POST",
      url: "graphql.json",
      responseType: "json",
      headers: {
        "X-Shopify-Access-Token": http.tokens[domain],
        "Content-Type": "application/json"
      }
    });
    http.client[domain].interceptors.response.use(
      (response) => response.data && response.data.data ? response.data : response.data,
      (error2) => Promise.reject(error2)
    );
  } else {
    throwError(domain ? [
      `Xior instance cannot be found for ${domain}`
    ] : [
      "Xior instance could not be created"
    ], []);
  }
}
http.request = (domain, token) => {
  const client = xior__default.default.create({
    baseURL: `https://${domain}.myshopify.com/admin/api/${http.GQL_VERSION}`,
    method: "POST",
    url: "graphql.json",
    responseType: "json",
    headers: token ? {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json"
    } : {
      "Content-Type": "application/json"
    }
  });
  client.interceptors.response.use(
    (response) => response.data && response.data.data ? response.data : response.data,
    (error2) => Promise.reject(error2)
  );
  return client.request;
};
http.chain = (path5, reject) => (object) => pathOr(object, path5, (reason) => {
  reason.isGraphError = true;
  reject(reason);
});
http.client = o();
http.tokens = o();
http.VERSION = "2025-01";

// syncify/http/enums.ts
var OnlineStoreThemeFileReadResult = (code) => ({
  BAD_REQUEST: "Operation was malformed or invalid.",
  CONFLICT: "Operation faced a conflict with the current state of the file.",
  ERROR: "Operation encountered an error.",
  NOT_FOUND: "Operation file could not be found.",
  SUCCESS: "Operation was successful.",
  TIMEOUT: "Operation timed out.",
  UNPROCESSABLE_ENTITY: "Operation could not be processed due to issues with input data.",
  _: null
})[code || "__UNKNOWN__"];
var OnlineStoreThemeFilesUserErrors = (code) => ({
  ACCESS_DENIED: "Access denied.",
  DUPLICATE_FILE_INPUT: "There are files with the same filename.",
  ERROR: "Error.",
  FILE_VALIDATION_ERROR: "The file is invalid.",
  LESS_THAN_OR_EQUAL_TO: "The input value should be less than or equal to the maximum value allowed.",
  NOT_FOUND: "The record with the ID used as the input value couldn't be found.",
  THEME_FILES_CONFLICT: "There are theme files with conflicts.",
  THEME_LIMITED_PLAN: "This action is not available on your current plan. Please upgrade to access theme editing features.",
  _: null
})[code || "_"];

// syncify/http/utils.ts
function graph(object, path5, reject) {
  if (!isObject(object)) return reject(Object.assign(object, { isGraphError: true }));
  const keys2 = isString(path5) ? path5.split(".").filter(Boolean) : path5;
  if (keys2.length === 0) {
    object.isGraphError = true;
    return reject(object);
  }
  let result = object;
  for (const key of keys2) {
    if (result == null || !(key in result)) {
      reject(Object.assign(object, { isGraphError: true }));
    } else {
      result = result[key];
    }
  }
  return result;
}
function params(parameters) {
  let files = null;
  let query = parameters[0];
  let target;
  let onError = null;
  let onNext = null;
  if (isObject(query)) {
    const has2 = hasProp(query);
    target = has2("target") ? query.target : $.target.default;
    if (has2("onError")) onError = query.onError;
    if (has2("onNext")) onNext = query.onNext;
    if (has2("input")) {
      if (isArray(query.input)) {
        const [first] = query.input;
        if (isObject(first) && "key" in query.input) {
          files = query.input;
          query = files.map(({ key, value }) => ({
            filename: key,
            body: {
              type: "TEXT",
              value
            }
          }));
        } else {
          query = query.input;
        }
      } else if (isObject(query.input)) {
        if ("key" in query.input) {
          files = [query.input];
          query = [{ filename: query.input.key, body: { type: "TEXT", value: query.input.value } }];
        } else {
          query = [query.input];
        }
      } else if (isString(query.input)) {
        query = [query.input];
      }
    }
  } else {
    target = parameters.length === 2 ? parameters[1] : $.target.default;
    if (isArray(query)) {
      const [first] = query;
      if (isObject(first) && "key" in first) {
        files = query;
        query = files.map(({ key, value }) => ({
          filename: key,
          body: {
            type: "TEXT",
            value
          }
        }));
      }
    } else if (isObject(query)) {
      if ("key" in query) {
        files = [query];
        query = [
          {
            filename: query.key,
            body: { type: "TEXT", value: query.value }
          }
        ];
      } else {
        query = [query];
      }
    } else if (isString(query)) {
      query = [query];
    }
  }
  return {
    query,
    target,
    files,
    onError,
    onNext
  };
}
params.upsert = function(parameters) {
  let files = null;
  let query = parameters[0];
  let target;
  let onError = null;
  let onNext = null;
  if (isObject(query)) {
    const has2 = hasProp(query);
    if (has2("onError")) onError = query.onError;
    if (has2("onNext")) onNext = query.onNext;
    target = has2("target") ? query.target : $.target.default;
    if (has2("input")) {
      if (isArray(query.input)) {
        if (query.input.length > 0) {
          const [first] = query.input;
          if (isObject(first) && "key" in query.input) {
            files = query.input;
            query = forMap(({
              key,
              value
            }) => ({
              filename: key,
              body: {
                type: "TEXT",
                value
              }
            }), files);
          } else {
            query = query.input;
          }
        }
      } else if (isObject(query.input)) {
        if ("key" in query.input) {
          files = [query.input];
          query = [
            {
              filename: query.input.key,
              body: {
                type: "TEXT",
                value: query.input.value
              }
            }
          ];
        } else {
          query = [query.input];
        }
      } else if (isString(query.input)) {
        query = [query.input];
      }
    }
  } else {
    target = parameters.length === 2 ? parameters[1] : $.target.default;
    if (isArray(query)) {
      const [first] = query;
      if (isObject(first) && "key" in first) {
        files = query;
        query = forMap(({ key, value }) => ({
          filename: key,
          body: {
            type: "TEXT",
            value
          }
        }), files);
      }
    } else if (isObject(query)) {
      if ("key" in query) {
        files = [query];
        query = [
          {
            filename: query.key,
            body: {
              type: "TEXT",
              value: query.value
            }
          }
        ];
      } else {
        query = [query];
      }
    } else if (isString(query)) {
      query = [query];
    }
  }
  return {
    query,
    target,
    files,
    onError,
    onNext
  };
};

// syncify/http/theme/files.ts
function getErrors({ filename, code }) {
  return {
    filename,
    code: code.replace(/_/g, " "),
    graph: "OnlineStoreThemeFile",
    message: OnlineStoreThemeFileReadResult(code)
  };
}
function themeFiles(target, callback = null) {
  return new Promise((resolve2, reject) => (async () => {
    let after = null;
    let hasNextPage = true;
    let count = 0;
    const files = {};
    while (hasNextPage) {
      await http(target.store.name).request({
        data: {
          query: `query ThemeFilesMap($gid:ID!,$after:String){theme(id:$gid){files(first:180,after:$after){nodes{filename}pageInfo{hasNextPage endCursor}}}}`,
          variables: {
            gid: target.gid,
            after
          }
        }
      }).then((response) => {
        const { nodes, pageInfo } = graph(response.data, "theme.files", reject);
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        count += nodes.length;
        callback && callback(count);
        forEach(({ filename }) => {
          const directory = filename.slice(0, filename.lastIndexOf("/"));
          has(directory, files) ? files[directory].push(filename) : files[directory] = [filename];
        }, nodes);
      }).catch((e2) => {
        e2.target = target;
        e2.graph = "OnlineStoreThemeFile";
        error.request(e2);
        hasNextPage = false;
      });
    }
    resolve2({ count, files });
  })());
}
function themeFilesUpsert(...input) {
  const { query, target, files, onError } = params(input);
  return new Promise((resolve2, reject) => {
    http(target.store.name).request({
      data: {
        query: `mutation ThemeFilesUpsert($query:[OnlineStoreThemeFilesUpsertFileInput!]!,$gid:ID!){themeFilesUpsert(files:$query,themeId:$gid){upsertedThemeFiles{filename}userErrors{code,field,filename,message,}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { upsertedThemeFiles, userErrors } = graph(response.data, "themeFilesUpsert", reject);
      resolve2(
        {
          target,
          synced: upsertedThemeFiles,
          errors: userErrors.length > 0 ? userErrors.map((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, " "),
            field: userError.field,
            graph: "OnlineStoreThemeFilesUpsertFileInput",
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            file: files.find((file) => file.key === userError.filename) || null
          })) : []
        }
      );
    }).catch((e2) => {
      e2.target = target;
      e2.files = files;
      e2.graph = "OnlineStoreThemeFilesUpsertFileInput";
      onError ? onError(e2) : reject(e2);
    });
  });
}
function themeFilesList(...input) {
  const { query, target, onError, onNext } = params(input);
  return new Promise((resolve2, reject) => (async () => {
    let after = null;
    let hasNextPage = true;
    let files = [];
    let errors = [];
    while (hasNextPage) {
      await http(target.store.name).request({
        data: {
          query: `query ThemeFilesList($gid:ID!,$query:[String!]!$after:String){theme(id:$gid){files(first:100,after:$after,filenames:$query){nodes{filename,size,createdAt,updatedAt,checksumMd5,body{...on OnlineStoreThemeFileBodyText{content}}}userErrors{code filename},pageInfo{hasNextPage endCursor}}}}`,
          variables: {
            gid: target.gid,
            query,
            after
          }
        }
      }).then((response) => {
        const { nodes, pageInfo, userErrors } = graph(response.data, "theme.files", reject);
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        files = files.concat(nodes);
        if (onNext) onNext(files.length);
        if (userErrors.length > 0) errors = errors.concat(userErrors.map(getErrors));
      }).catch((e2) => {
        e2.target = target;
        e2.files = files;
        e2.graph = "OnlineStoreThemeFile";
        onError ? onError(e2) : error.request(e2);
        hasNextPage = false;
      });
    }
    resolve2(
      {
        get target() {
          return target;
        },
        get files() {
          return files;
        },
        get errors() {
          return errors;
        }
      }
    );
  })());
}
function themeFilesGet(...input) {
  const { query, target, files, onError } = params(input);
  return new Promise((resolve2, reject) => {
    http(target.store.name).request({
      data: {
        query: `query ThemeFilesGet($gid:ID!,$query:[String!]!){theme(id:$gid){files(filenames:$query){userErrors{code filename},nodes{filename,size,createdAt,updatedAt,body{...on OnlineStoreThemeFileBodyText{content}}},}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { nodes, userErrors } = graph(response.data, "theme.files", reject);
      resolve2(
        {
          get target() {
            return target;
          },
          get file() {
            return nodes.length === 1 ? nodes[0] : null;
          },
          get errors() {
            return userErrors.length > 0 ? userErrors.map(getErrors) : [];
          }
        }
      );
    }).catch((e2) => {
      e2.target = target;
      e2.files = files;
      e2.graph = "OnlineStoreThemeFile";
      onError ? onError(e2) : error.request(e2);
    });
  });
}
function themeFilesDelete(...input) {
  const { query, target, files, onError } = params(input);
  return new Promise((resolve2, reject) => {
    http(target.store.name).request({
      data: {
        query: `mutation ThemeFilesDelete($gid:ID!,$query:[String!]!){themeFilesDelete(themeId:$gid,files:$query){deletedThemeFiles{filename}userErrors{message,filename,code}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { deletedThemeFiles, userErrors } = graph(response.data, "themeFilesDelete", reject);
      resolve2(
        {
          target,
          synced: deletedThemeFiles,
          errors: userErrors.length > 0 ? userErrors.map((userError) => ({
            ...userError,
            code: userError.code.replace(/_/g, " "),
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            graph: "OnlineStoreThemeFileOperationResult",
            file: files.find((file) => file.key === userError.filename) || null
          })) : []
        }
      );
    }).catch((e2) => {
      e2.target = target;
      e2.files = files;
      e2.graph = "OnlineStoreThemeFileOperationResult";
      onError ? onError(e2) : reject(e2);
    });
  });
}
async function themeFilesUpsertMap(file, callback) {
  const files = isArray(file) ? file : [file];
  await q2.http.add(async () => {
    try {
      const targets = await pMap($.target, (target) => themeFilesUpsert(files, target));
      event.each(targets);
    } catch (e2) {
      error.request(e2);
    }
  });
}
async function themeFilesDeleteMap(file) {
  const files = isArray(file) ? file : [file];
  await q2.http.add(async () => {
    try {
      const targets = await pMap($.target, (target) => themeFilesDelete(files, target));
      event.each(targets);
    } catch (e2) {
      error.request(e2);
    }
  });
}

// syncify/transform/asset.ts
async function passthrough(file) {
  await fsExtra.writeFile(file.output, file.value).catch(
    error.write("Error writing asset to output directory", {
      input: file.input,
      output: file.output
    })
  );
  if ($.mode.hot) {
    log.syncing(file.key, { hot: $.mode.hot });
    if (file.kind === "JavaScript" /* JavaScript */) {
      $.wss.script(file.uuid, file.base);
    } else if (file.kind === "CSS" /* CSS */) {
      $.wss.stylesheet(file.uuid, file.base);
    }
  }
  if ($.mode.build === false) {
    await themeFilesUpsertMap(file);
  }
}
async function AssetTransform(file) {
  const value = await fsExtra.readFile(file.input, "utf8").catch(
    error.write("Error reading asset file", {
      input: file.input,
      output: file.output
    })
  );
  if (isString(value)) {
    file.value = value;
    if (isEmptyString(value)) {
      if ($.mode.watch) log.skipped(file, "empty file");
      return null;
    }
    await passthrough(file);
  }
  return null;
}

// syncify/transform/json.ts
var import_timer5 = __toESM(require_dist());

// syncify/process/cache.ts
var import_write_file_atomic = __toESM(require_lib());
var gunzipAsync = node_util.promisify(zlib2__default.default.gunzip);
var gzipAsync = node_util.promisify(zlib2__default.default.gzip);
async function decode(uri) {
  const content = await fsExtra.readFile(uri);
  const gunzip = await gunzipAsync(content);
  return cbor__default.default.decode(gunzip);
}
function save(uri, data) {
  return async () => {
    if ($.file.project === null) {
      throwError([
        "Project cache has not been created"
      ]);
      return;
    }
    if (!/[/]/.test(uri)) {
      uri = $.cache.uri[uri];
      if (!data) data = $.cache[uri];
    }
    const encoded = await cbor__default.default.encodeAsync(data, { omitUndefinedProperties: true, canonical: true });
    const gzip = await gzipAsync(encoded);
    gzip[9] = 3;
    await (0, import_write_file_atomic.default)(uri, gzip);
  };
}
function clearCache(id = null) {
  if (id === null) {
    for (const key of CACHE_FILES) {
      if (!isEmpty($.cache[key])) {
        $.cache[key] = {};
        q2.cache.add(save($.cache.uri[key], $.cache[key]));
      }
    }
    return q2.cache.onIdle();
  }
  $.cache[id] = {};
  return q2.cache.add(save($.cache.uri[id], $.cache[id]));
}
function runChecksum(input, value) {
  const hash = checksum(value);
  if (has(input, $.cache.checksum) && $.cache.checksum[input] === hash) return true;
  $.cache.checksum[input] = hash;
  q2.cache.add(save($.cache.uri.checksum, $.cache.checksum));
  return false;
}
function saveCache(id = null) {
  if (id === null) {
    for (const key of CACHE_FILES) {
      if (!isEmpty($.cache[key])) {
        q2.cache.add(save($.cache.uri[key], $.cache[key]));
      }
    }
    return q2.cache.onIdle();
  } else {
    return q2.cache.add(save($.cache.uri[id], $.cache[id]));
  }
}
function getPageCache(domain, pageId = NaN) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (isNaN(pageId) === false) {
    if (hasPath(`${store}.${pageId}`, $.cache.pages)) {
      return $.cache.pages[store][pageId];
    }
    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = { [pageId]: {} };
    } else {
      $.cache.pages[store][pageId] = {};
    }
    q2.cache.add(save($.cache.uri.pages, $.cache.pages));
    return $.cache.pages[store][pageId];
  } else {
    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = {};
      q2.cache.add(save($.cache.uri.pages, $.cache.pages));
    }
  }
  return $.cache.pages[store];
}
function setPageCache(domain, data) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (!has(store, $.cache.pages)) {
    $.cache.pages[store] = { [data.id]: data };
  } else {
    $.cache.pages[store][data.id] = data;
  }
  q2.cache.add(save($.cache.uri.pages, $.cache.pages));
  return $.cache.pages[store][data.id];
}
function setTemplateCache(domain, themeId, path5, data) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (!has(store, $.cache.templates)) {
    $.cache.templates[store] = { [themeId]: { [path5]: data } };
  } else if (!has(`${themeId}`, $.cache.templates[store])) {
    $.cache.templates[store][themeId] = { [path5]: data };
  } else {
    $.cache.templates[store][themeId][path5] = data;
  }
  q2.cache.add(save($.cache.uri.templates, $.cache.templates));
  return $.cache.templates[store][themeId][path5];
}
function setPathCache(input, output) {
  let update = null;
  if (!has("paths", $.cache)) {
    $.cache.paths = {};
  }
  if (!has(input, $.cache.paths)) {
    update = $.cache.paths[input] = output;
  }
  if ($.cache.paths[input] !== output) {
    update = $.cache.paths[input] = output;
  }
  if (!has(output, $.cache.paths)) {
    update = $.cache.paths[output] = input;
  }
  if ($.cache.paths[output] !== input) {
    update = $.cache.paths[output] = input;
  }
  if (update) {
    q2.cache.add(save($.cache.uri.paths, $.cache.paths));
  }
}
var theme = {
  pointer(choice, index) {
    const line = this.state.index === index ? l.dash : l.line;
    return index === 0 ? l.trim + "\n" + line : line;
  },
  prefix: l.trim + " ",
  styles: {
    primary: Q,
    success: Q,
    danger: w,
    warning: P,
    muted: a,
    disabled: a,
    typing: Y
  },
  symbols: {
    ellipsis: y("?"),
    prefix: {
      pending: "",
      submitted: "\u2713",
      cancelled: "\u2715"
    },
    separator: {
      pending: "",
      submitted: "\u2794 ",
      cancelled: `${k("\u2715")} `
    }
  }
};
function cancel() {
  kill(() => {
    log($D(St("PROCESS EXIT WITH CODE 0")));
    log.ender("Prompt Exit", { clear: false }).nl("");
  });
  kill.exit(0);
  return null;
}
function labels({
  prompts: prompts2,
  padding = 2
}) {
  const space = eqWS(prompts2, { padding });
  const model = o();
  for (let i = 0, size = prompts2.length, name = ""; i < size; i++) {
    name = prompts2[i];
    model[toPascalCase(name)] = y(name + R + space(name));
  }
  return model;
}
function intercept() {
  const native = process.stdout.write;
  process2.stdout.write = function(chunk, encoding, callback) {
    let modified = chunk.toString();
    if (/ERROR|INVALID|MISSING|REQUIRED/i.test(modified)) {
      modified = modified.replace(/\n/, "\n" + l.trim).replace(/(?<=\u001b\[31m) /, "").replace(/(?<=\[39m)\n? +(?=\u001b\[38;2;42;42;46m)/, "").replace(/( (?:ERROR|INVALID|MISSING|REQUIRED))/i, "$1");
    }
    native.call(process2.stdout, modified, encoding, callback);
  };
  return () => {
    process2.stdout.write = native;
  };
}

// syncify/prompts/enquirer/snippet.ts
async function render() {
  const { index, keys: keys2 = [], submitted, size } = this.state;
  const newline = [this.options.newline].find((v3) => v3 != null);
  const prefix = await this.prefix();
  const separator = await this.separator();
  const message = await this.message();
  let prompt2 = [
    prefix,
    message,
    separator
  ].filter(Boolean).join(" ");
  this.state.prompt = prompt2;
  const header = await this.header();
  const error2 = await this.error() || "";
  const hint = await this.hint() || "";
  const body = submitted ? "" : await this.interpolate(this.state);
  const key = this.state.key = keys2[index] || "";
  const input = await this.format(key);
  const footer = await this.footer();
  if (input) prompt2 += " " + input;
  if (hint && !input && this.state.completed === 0) prompt2 += " " + hint;
  this.clear(size);
  const lines = [
    header,
    prompt2,
    body.split("\n").join(l.next),
    footer,
    error2.trim()
  ];
  this.write(lines.filter(Boolean).join(newline));
  this.restore();
}
var import_timer4 = __toESM(require_dist());
function warn(...message) {
  forEach((line) => console2.stderr.prefix("").write(line), message);
}
warn.count = () => {
  let total = 0;
  $.warnings.get($.log.uri).values().forEach((stack) => total += stack.size);
  return total;
};
function messages(processor2, uri) {
  if ($.warnings.has(uri)) {
    const file = $.warnings.get(uri);
    return file.has(processor2) ? file.get(processor2) : file.set(processor2, s()).get(processor2);
  }
  return $.warnings.set(uri, m([[processor2, s()]])).get(uri).get(processor2);
}
warn.schema = (file, options) => {
  const stack = messages("Shared Schema", file.input);
  const tui = pt({ type: "warning" }).Newline().Wrap(options.message, P).Newline().Context({
    stack: false,
    type: "warning",
    entries: {
      reference: options.$ref,
      schema: options.schema,
      section: file.relative,
      shared: options.shared
    }
  });
  stack.add(tui.toString());
};
warn.sass = (file) => (message, options) => {
  const stack = messages("sass", file.input);
  const text = A.url(message.replace(/\n+/g, " "), (text2) => Ce(text2));
  const tui = pt({ type: "warning" }).Wrap(text, P);
  const location = {};
  if (has("span", options)) {
    if (isObject(options.span)) {
      const { span } = options;
      const source = fsExtra.readFileSync(span.url.pathname, "utf8");
      const frame = codeframe(source, {
        type: "warning",
        start: {
          line: span.start.line + 1,
          column: span.start.column
        }
      });
      tui.Newline().Insert(frame);
      location.line = span.start.line + 1;
      location.column = span.start.column;
      location.input = Be + file.relative;
      location.source = Be + path2.relative($.cwd, options.span.url.pathname);
      if (/\/node_modules\//.test(span.url.pathname)) {
        location.module = kt(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
      }
    } else {
      location.input = Be + file.relative;
    }
  } else {
    location.input = Be + file.relative;
  }
  location.processor = me("SASS Dart");
  if (options.deprecation) {
    location.details = "DEPRECATION WARNING";
  }
  tui.Newline().Context({
    stack: false,
    type: "warning",
    entries: {
      ...location,
      processor: me("SASS Dart")
    }
  });
  const context = tui.toString({ trim: false });
  if (!stack.has(context)) stack.add(context);
};
warn.esbuild = (data) => {
};
warn.postcss = (file, data) => {
  const stack = messages("postcss", file.input);
  function Sample(code, {
    line = l.line,
    span = null
  } = {}) {
    if (line === "red") {
      line = l.red;
    } else if (line === "yellow") {
      line = l.yellow;
    }
    if (span !== null) {
      const end = has("end", span) ? span.end : span.start + 1;
      return line + "\n" + g.nl(
        line + li(`${span.start - 1}`) + R,
        line + li(`${span.start}`) + R + code,
        line + li(`${end}`) + R
      );
    }
    return line + "\n" + line + code;
  }
  const output = g(
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
    Ar({
      stack: false,
      entries: {
        column: data.column,
        file: file.relative,
        plugin: data.plugin
      }
    })
  );
  if (!stack.has(output)) {
    stack.add(output);
  }
};

// syncify/options/utils.ts
var import_anymatch = __toESM(require_anymatch());
function globPath(path5) {
  return isArray(path5) ? path5.filter((uri) => /\*/.test(uri)) : /\*/.test(path5) ? path5 : null;
}
function lastPath(path5) {
  if (isArray(path5)) return path5.map(lastPath);
  if (path5.indexOf("/") === -1) return path5;
  const dir = path5.endsWith("/") ? path2.dirname(path5.slice(0, -1)) : path2.dirname(path5);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
}
function parentPath(path5) {
  if (isArray(path5)) return path5.map(parentPath);
  const last2 = path5.lastIndexOf("/");
  if (last2 === -1) return path5;
  const glob9 = path5.indexOf("*");
  return glob9 === -1 ? path5.slice(0, last2) : path5.slice(0, glob9);
}
function normalPath(input, cwd2 = null) {
  const regex = new RegExp(`^\\.?\\/?${input}\\/`);
  const source = new RegExp(`^\\.?\\/?${path2.basename(input)}\\/`);
  return function prepend(path5) {
    if (Array.isArray(path5)) return path5.map(prepend);
    const ignore = path5.charCodeAt(0) === 33;
    if (ignore) path5 = path5.slice(1);
    if (regex.test(path5)) return ignore ? "!" + path5 : path5;
    if (path5.charCodeAt(0) === 46 && path5.charCodeAt(1) === 46 && path5.charCodeAt(2) === 47) {
      throwError(
        `Invalid path defined at: ${R} ${P(`"${path5}"`)}`,
        ["Paths must be relative to source"]
      );
    }
    if (cwd2 !== null) {
      const exists2 = path2.join(cwd2, path5);
      return (ignore ? "!" : "") + (exists2.startsWith(input) ? exists2 : path2.join(input, path5));
    } else {
      return (ignore ? "!" : "") + path2.join(input, source.test(path5) ? path5.replace(source, "") : path5);
    }
  };
}
var basePath = (cwd2) => (path5) => {
  if (path5.indexOf("*") !== -1) {
    throwError(
      `Base directory path cannot contain glob${R} ${P(`"${path5}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
  if (path5.charCodeAt(0) === 46) {
    if (path5.length === 1) return cwd2 + "/";
    if (path5.charCodeAt(1) === 47) {
      path5 = path5.slice(1);
    } else {
      throwError(
        `Directory path is invalid at${R} ${P(`"${path5}"`)}`,
        ["Ensure that the path you attempting to resolve is correctly formed"]
      );
    }
  }
  if (path5.charCodeAt(0) === 47) {
    if (path5.length === 1) {
      return cwd2 + "/";
    } else {
      path5 = path5.slice(1);
    }
  }
  if (/^[a-zA-Z0-9_-]+/.test(path5)) {
    path5 = path2.join(cwd2, path5);
    return path5[path5.length - 1].charCodeAt(0) === 47 ? path5 : path5 + "/";
  } else {
    throwError(
      `Directory path is invalid at${R} ${P(`"${path5}"`)}`,
      ["Ensure that the path you attempting to resolve is correctly formed"]
    );
  }
};

// syncify/options/utils.ts
function getResolvedPaths(filePath, hook2) {
  const { cwd: cwd2 } = $;
  const match = isFunction(hook2) ? [] : false;
  const warn2 = warnOption("Path Resolver");
  const path5 = normalPath($.dirs.input, $.cwd);
  if (isArray(filePath)) {
    const paths2 = [];
    for (const item of filePath) {
      const uri = path5(item);
      const resolved = glob__default.default.sync(uri, { cwd: cwd2, absolute: true });
      if (match !== false) {
        const test = hook2(uri);
        if (isString(test)) {
          match.push(test);
        } else if (isArray(test)) {
          match.push(...test);
        }
      }
      if (resolved.length === 0) {
        warn2("No files can be resolved in", item);
      } else {
        paths2.push(...resolved);
      }
    }
    return match === false ? paths2 : { paths: paths2, match: (0, import_anymatch.default)(match) };
  }
  if (isString(filePath)) {
    const uri = path5(filePath);
    const paths2 = glob__default.default.sync(uri, { cwd: cwd2 });
    if (paths2.length === 0) {
      warn2("No files can be resolved in", filePath);
    }
    if (match !== false) {
      const test = hook2(uri);
      if (isString(test)) {
        match.push(test);
      } else if (isArray(test)) {
        match.push(...test);
      }
    }
    return match === false ? paths2 : { paths: paths2, match: (0, import_anymatch.default)(match) };
  }
  typeError({
    option: "uri",
    name: "uri/path",
    provided: filePath,
    expects: "string | string[]"
  });
}
function getTransform(transforms, opts) {
  if (!has("assertSnippet", opts)) opts.assertSnippet = true;
  if (isString(transforms)) {
    const { paths: paths2, match } = getResolvedPaths(transforms, (watch) => globPath(watch));
    if (paths2) {
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: path2.basename(input),
          snippet: false
        } : {
          input,
          rename: path2.basename(input)
        });
      } else {
        return opts.assertSnippet ? {
          input: paths2,
          rename: "[name].[ext]",
          snippet: false,
          match
        } : {
          input: paths2,
          rename: "[name].[ext]",
          match
        };
      }
    }
  } else if (isArray(transforms)) {
    if (transforms.every(isString)) {
      const { paths: paths2, match } = getResolvedPaths(transforms, (watch) => globPath(watch));
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: path2.basename(input),
          snippet: false
        } : {
          input,
          rename: path2.basename(input)
        });
      } else {
        return opts.assertSnippet ? {
          input: paths2,
          rename: "[name].[ext]",
          snippet: false,
          match
        } : {
          input: paths2,
          rename: "[name].[ext]",
          match
        };
      }
    } else if (transforms.every(isObject)) {
      return transforms.map((option) => {
        if (!has("input", option)) {
          invalidError({
            option: "tranform",
            name: "input",
            value: option,
            expects: "{ input: string | string[] }"
          });
        }
        const { paths: paths2, match } = getResolvedPaths(option.input, (watch) => globPath(watch));
        option.match = match;
        option.input = paths2[0];
        if (opts.assertSnippet && !has("snippet", option)) option.snippet = false;
        if (!has("rename", option)) {
          option.rename = option.snippet ? "[name].liquid" : "[name].[ext]";
        }
        return option;
      });
    }
  } else if (isObject(transforms)) {
    const config = [];
    if (has("input", transforms)) {
      const record = merge(transforms);
      const { paths: paths2, match } = getResolvedPaths(record.input, (watch) => {
        return globPath(watch);
      });
      if (opts.assertSnippet && !has("snippet", record)) {
        record.snippet = false;
      }
      if (!has("rename", record)) {
        record.rename = record.snippet ? "[name].liquid" : "[name].[ext]";
      }
      if (opts.flatten) {
        for (const input of paths2) {
          config.push(assign({}, record, { input }));
        }
      } else {
        record.input = paths2;
        record.match = match;
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
          const { paths: paths2, match } = getResolvedPaths(option, (watch) => {
            return globPath(watch);
          });
          if (paths2) {
            if (opts.flatten) {
              for (const input of paths2) config.push(assign({}, record, { input }));
            } else {
              config.push(assign({}, record, { input: paths2, match }));
            }
          }
        } else if (isObject(option)) {
          if (!has("input", option)) {
            invalidError({
              option: "transform",
              name: prop,
              value: option,
              expects: "{ input: string | string[] }"
            });
          }
          const { paths: paths2, match } = getResolvedPaths(option.input, (watch) => {
            return globPath(watch);
          });
          if (paths2.length > 0) {
            const merge2 = rename ? assign({}, option, record, { rename: asset ? prop.slice(7) : prop.slice(9) }) : assign({}, record, option);
            if (opts.flatten) {
              for (const input of paths2) {
                config.push(assign({}, merge2, { input }));
              }
            } else {
              config.push(assign(merge2, { input: paths2, match }));
            }
          }
        } else if (isArray(option)) {
          if (option.every(isString)) {
            const { paths: paths2, match } = getResolvedPaths(option, (watch) => globPath(watch));
            if (hasRenameNamespace(prop)) record.rename = path2.basename(prop);
            if (paths2) {
              if (opts.flatten) {
                for (const input of paths2) {
                  config.push(assign({}, record, { input }));
                }
              } else {
                config.push(assign({}, record, { input: paths2, match }));
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
  if (has("devDependencies", pkg)) {
    if (has(name, pkg.devDependencies)) return true;
  }
  if (has("dependencies", pkg)) {
    if (has(name, pkg.dependencies)) return true;
  }
  if (has("peerDependencies", pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }
  if (has("optionalDependencies", pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }
  return false;
}
async function getConfigFilePath(filename) {
  for (const ext of CONFIG_FILE_EXT) {
    const filepath = `${filename}.${ext}`;
    const fileExists = await fsExtra.pathExists(filepath);
    if (fileExists) return filepath;
  }
  return null;
}
async function readConfigFile(path5, namespace, onRebuild) {
  try {
    const file = await getConfigFilePath(path5);
    if (file !== null) {
      const config = await acquire.acquire({
        file,
        cwd: $.cwd,
        tsconfig: false,
        type: has("type", $.pkg) ? $.pkg.type : "commonjs",
        onRebuild,
        onError: (errors) => {
          const p = parseProcessorConfigs(file, namespace);
          pt({ type: "error" }).Append("BUILD ERROR", y).Wrap(`The ${P(p.base)} file could not be processed.`).toLog({ clear: true });
          error.esbuild(p, errors);
        }
      });
      return { file, config };
    }
    return null;
  } catch (e2) {
    return null;
  }
}
function hasRenameNamespace(rename) {
  return /\[(?:file|name|dir|ext)\]/.test(rename);
}
function renameFileParse(src, pattern) {
  let rename = pattern;
  const dir = lastPath(src);
  const ext = path2.extname(src);
  const file = path2.basename(src, ext);
  if (isUndefined(pattern)) return { dir, ext, file, name: file, base: file + ext };
  if (/(\[dir\])/.test(rename)) rename = rename.replace("[dir]", dir);
  if (/(\[name\])/.test(rename)) rename = rename.replace("[name]", file);
  if (/(\[file\])/.test(rename)) rename = rename.replace("[file]", file);
  if (/(\.?\[ext\])/.test(rename)) rename = rename.replace(/\.?\[ext\]/, ext);
  const name = pattern.replace(pattern, rename);
  return {
    ext,
    file,
    dir,
    name,
    base: name + ext
  };
}

// syncify/process/context.ts
function svg(file) {
  const config = $.svg.filter((context) => {
    if (context.input.has(file.input)) return true;
    if (!context.match(file.input)) return false;
    context.input.add(file.input);
    return true;
  });
  if (isUndefined(config)) return file;
  defineProperty(file, "data", {
    get() {
      return config;
    }
  });
  return file;
}
function style(file) {
  const config = $.style.find((x2) => x2.watch(file.input));
  if (isUndefined(config)) {
    file.type = 16 /* Asset */;
    return file;
  }
  defineProperty(file, "data", {
    get() {
      return config;
    }
  });
  if (config.snippet) {
    file.namespace = "snippets" /* Snippets */;
    file.key = path2.join("snippets", config.rename);
  } else {
    file.key = path2.join("assets", config.rename);
  }
  if (file.output) {
    if (file.data.rename !== path2.basename(file.output)) {
      if (config.snippet) {
        file.output = path2.join($.dirs.output, file.key);
      } else {
        file.output = path2.join(parentPath(file.output), file.data.rename);
      }
    }
  } else {
    file.output = path2.join($.dirs.output, file.key);
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
function schema(parse11, file) {
  defineProperty(file, "data", { get() {
    return parse11;
  } });
  return file;
}
function section(file) {
  if ($.paths.sections.rename.length > 0) {
    const path5 = file.input;
    const find = $.paths.sections.rename.find(([match]) => match(path5));
    if (isUndefined(find)) return file;
    const oldName = file.base;
    const rename = renameFileParse(file.input, find[1]);
    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = path2.join(file.namespace, rename.base);
    file.output = path2.join(path2.dirname(file.output), rename.base);
    log.rename(oldName, file.base);
  }
  return file;
}
function snippet(file) {
  if ($.paths.snippets.rename.length > 0) {
    const path5 = file.input;
    const find = $.paths.snippets.rename.find(([match]) => match(path5));
    if (isUndefined(find)) return file;
    const oldName = file.base;
    const rename = renameFileParse(file.input, find[1]);
    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = path2.join(file.namespace, rename.base);
    file.output = path2.join(path2.dirname(file.output), rename.base);
    log.rename(oldName, file.base);
  }
  return file;
}

// syncify/process/files.ts
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
    if (type2 === 17 /* Metafield */ || type2 === 18 /* Page */) {
      key = path2.join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = path2.join(namespace, file.base);
      output = path2.join(output, key);
    }
    if (kind === -1) {
      input = $.cache.paths[output];
    } else {
      setPathCache(input, output);
    }
    file.uuid = uuid();
    file.type = type2;
    file.key = key;
    file.namespace = namespace;
    file.kind = kind;
    file.input = input;
    file.output = output;
    file.relative = input ? path2.relative($.cwd, input) : $.cwd;
    return file;
  };
}
function parseProcessorConfigs(path5, namespace) {
  const file = new File(path5);
  file.namespace = namespace;
  file.input = path5;
  file.relative = path2.relative($.cwd, file.input);
  switch (file.ext) {
    case ".ts":
      file.kind = "TypeScript" /* TypeScript */;
      break;
    case ".js":
    case ".mjs":
    case ".cjs":
      file.kind = "JavaScript" /* JavaScript */;
      break;
  }
  return file;
}
function parseSyncifyConfig(path5) {
  const file = new File(path5);
  file.namespace = "syncify" /* Syncify */;
  file.input = path5;
  file.type = 20 /* Syncify */;
  file.relative = path2.relative($.cwd, file.input);
  switch (file.ext) {
    case ".ts":
      file.kind = "TypeScript" /* TypeScript */;
      break;
    case ".js":
    case ".mjs":
    case ".cjs":
      file.kind = "JavaScript" /* JavaScript */;
      break;
  }
  return file;
}
function parse2(path5) {
  const { paths: paths2 } = $;
  const file = new File(path5);
  const define = setFile(file, path5, $.dirs.output);
  if (file.ext === ".liquid") {
    if (paths2.sections.match(path5)) {
      return section(define("sections" /* Sections */, 5 /* Section */, "Liquid" /* Liquid */));
    } else if (paths2.snippets.match(path5)) {
      return snippet(define("snippets" /* Snippets */, 4 /* Snippet */, "Liquid" /* Liquid */));
    } else if (paths2.layout.match(path5)) {
      return define("layout" /* Layout */, 2 /* Layout */, "Liquid" /* Liquid */);
    } else if (paths2.templates.match(path5)) {
      return define("templates" /* Templates */, 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths2.customers.match(path5)) {
      return define("templates/customers" /* Customers */, 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths2.metaobject.match(path5)) {
      return define("templates/metaobject" /* Metaobject */, 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths2.transforms.get(path5) === 11 /* Style */) {
      return style(define("snippets" /* Snippets */, 11 /* Style */, "CSS" /* CSS */));
    }
  } else if (file.ext === ".schema" && paths2.schema.match(path5)) {
    return schema(parse2, define("schema" /* Schema */, 7 /* Schema */, "JSON" /* JSON */));
  } else if (file.ext === ".json") {
    if (paths2.metafields.match(path5)) {
      return define("metafields" /* Metafields */, 17 /* Metafield */, "JSON" /* JSON */);
    } else if (paths2.sections.match(path5)) {
      return define("sections" /* Sections */, 6 /* Group */, "JSON" /* JSON */);
    } else if (paths2.templates.match(path5)) {
      return define("templates" /* Templates */, 1 /* Template */, "JSON" /* JSON */);
    } else if (paths2.config.match(path5)) {
      return define("config" /* Config */, 9 /* Config */, "JSON" /* JSON */);
    } else if (paths2.locales.match(path5)) {
      return define("locales" /* Locales */, 10 /* Locale */, "JSON" /* JSON */);
    } else if (paths2.customers.match(path5)) {
      return define("templates/customers" /* Customers */, 1 /* Template */, "JSON" /* JSON */);
    } else if (paths2.metaobject.match(path5)) {
      return define("templates/metaobject" /* Metaobject */, 8 /* Metaobject */, "JSON" /* JSON */);
    } else if (paths2.schema.match(path5)) {
      return schema(parse2, define("schema" /* Schema */, 7 /* Schema */, "JSON" /* JSON */));
    }
  }
  if (paths2.assets.match(path5)) {
    switch (file.ext) {
      case ".js":
      case ".mjs":
        return define("assets" /* Assets */, 16 /* Asset */, "JavaScript" /* JavaScript */);
      case ".json":
        return define("assets" /* Assets */, 16 /* Asset */, "JSON" /* JSON */);
      case ".svg":
        return define("assets" /* Assets */, 16 /* Asset */, "SVG" /* SVG */);
      case ".css":
        return define("assets" /* Assets */, 16 /* Asset */, "CSS" /* CSS */);
      case ".ico":
      case ".jpg":
      case ".png":
      case ".gif":
      case ".webp":
      case ".pjpg":
        return define("assets" /* Assets */, 16 /* Asset */, "Image" /* Image */);
      case ".mov":
      case ".mp4":
      case ".webm":
      case ".ogg":
        return define("assets" /* Assets */, 16 /* Asset */, "Video" /* Video */);
      case ".pdf":
        return define("assets" /* Assets */, 16 /* Asset */, "PDF" /* PDF */);
      case ".eot":
      case ".ttf":
      case ".woff":
      case ".woff2":
        return define("assets" /* Assets */, 16 /* Asset */, "Font" /* Font */);
      default:
        return define("assets" /* Assets */, 16 /* Asset */, "Unknown" /* Unknown */);
    }
  }
  switch (file.ext) {
    case ".js":
    case ".mjs":
      return script(define("assets" /* Assets */, 12 /* Script */, "JavaScript" /* JavaScript */));
    case ".ts":
      return script(define("assets" /* Assets */, 12 /* Script */, "TypeScript" /* TypeScript */));
    case ".tsx":
      return script(define("assets" /* Assets */, 12 /* Script */, "TSX" /* TSX */));
    case ".jsx":
      return script(define("assets" /* Assets */, 12 /* Script */, "JSX" /* JSX */));
    case ".svg":
      return svg(define("assets" /* Assets */, 13 /* Svg */, "SVG" /* SVG */));
    case ".css":
      return style(define("assets" /* Assets */, 11 /* Style */, "CSS" /* CSS */));
    case ".scss":
      return style(define("assets" /* Assets */, 11 /* Style */, "SCSS" /* SCSS */));
    case ".sass":
      return style(define("assets" /* Assets */, 11 /* Style */, "SASS" /* SASS */));
    case ".md":
      return define("pages" /* Pages */, 18 /* Page */, "Markdown" /* Markdown */);
    case ".html":
      return define("pages" /* Pages */, 18 /* Page */, "HTML" /* HTML */);
  }
  return void 0;
}
var outputFile = (output) => (path5) => {
  const file = new File(path5);
  const define = setFile(file, path5, output);
  switch (path2.basename(file.dir)) {
    case "sections":
      return define("sections" /* Sections */, 5 /* Section */, -1);
    case "blocks":
      return define("blocks" /* Blocks */, 3 /* Block */, -1);
    case "snippets":
      return define("snippets" /* Snippets */, 4 /* Snippet */, -1);
    case "layout":
      return define("layout" /* Layout */, 2 /* Layout */);
    case "templates":
      return define("templates" /* Templates */, 1 /* Template */, -1);
    case "customers":
      return define("templates/customers" /* Customers */, 1 /* Template */, -1);
    case "metaobject":
      return define("templates/metaobject" /* Metaobject */, 1 /* Template */, -1);
    case "config":
      return define("config" /* Config */, 9 /* Config */, -1);
    case "locales":
      return define("locales" /* Locales */, 10 /* Locale */, -1);
    case "assets":
      return define("assets" /* Assets */, 16 /* Asset */, -1);
  }
};

// syncify/transform/style.ts
function write(file, { noUpsert = false } = {}) {
  return async (data) => {
    if (isNil(data)) return null;
    runChecksum(file.input, data);
    fsExtra.writeFile(file.output, data).catch(error.write("Error writing stylesheet to output", {
      input: file.relative,
      output: path2.relative($.cwd, file.output)
    }));
    file.value = data;
    const size = sizeDiff(file.value, file.size);
    if (size.isSmaller) {
      if (file.kind === "SCSS" /* SCSS */ || file.kind === "SASS" /* SASS */ || file.kind === "Tailwind" /* Tailwind */) {
        log.transform(file.kind, y("CSS"), size.before, import_timer4.timer.stop(file.uuid));
      } else {
        log.transform("CSS", size.before, `brotli ${size.brotli}`);
      }
    } else {
      if (file.kind === "Tailwind" /* Tailwind */) {
        log.minified("Tailwind" /* Tailwind */, size.before, size.after, size.saved);
      } else {
        log.minified("CSS", size.before, size.after, size.saved);
      }
    }
    if ($.mode.hot) {
      $.wss.stylesheet(file.uuid, path2.basename(file.key));
    }
    if (file.kind !== "Tailwind" /* Tailwind */) {
      log.syncing(file.key);
    }
    if ($.mode.watch && !noUpsert) {
      await themeFilesUpsertMap(file);
      if (!$.mode.build) {
        if ($.warnings.size > 0) {
          const size2 = warn.count();
          log.warn(`${y(size2)} Compiler ${plur("Warning", size2)}`, `Press ${y("v")} to view all warning/s`);
        }
      }
    }
    return file.value;
  };
}
async function sassProcess(file) {
  if (isUndefined(file.data) || isBoolean(file.data.sass) && file.data.sass === false) {
    return readStyleFile(file);
  }
  const options = isObject(file.data.sass) ? merge($.processor.sass.config, file.data.sass) : $.processor.sass.config;
  if (file.ext === ".scss" || file.ext === ".sass") {
    $.mode.watch && import_timer4.timer.start();
    try {
      const { css, sourceMap } = await $import.sass.compileAsync(file.data.input, {
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
          warn: warn.sass(file)
        }
      });
      if (options.sourcemap) {
        const map = path2.join($.dirs.sourcemaps.styles, file.base + ".map");
        fsExtra.writeFile(map, JSON.stringify(sourceMap)).catch(
          error.write("Error writing SASS Source Map file to the cache directory", {
            file: path2.relative($.cwd, map),
            source: file.relative
          })
        );
      }
      log.process("SASS Dart", import_timer4.timer.stop());
      file.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e2) {
      if ($.mode.watch) {
        import_timer4.timer.clear();
        log.error(file.relative, {
          notify: {
            title: `Error in ${file.base}`,
            message: "SASS style transform failed, SCSS was not complied."
          }
        });
        error.sass(file, e2);
      }
      return null;
    }
  }
  return readStyleFile(file);
}
async function tailwindParse(file) {
  const files = [];
  for (const map in $.processor.tailwind.map) {
    if ($.processor.tailwind.map[map].has(file.input)) {
      const file2 = parse2($.style[map].input);
      if (isUndefined(file2)) continue;
      import_timer4.timer.start(file2.uuid);
      file2.kind = "Tailwind" /* Tailwind */;
      file2.value = await tailwindProcess(file2, { noUpsert: true });
      if (isString(file2.value)) {
        files.push(file2);
      }
    }
  }
  files.push(file);
  files.length > 1 ? log.syncing(`${files.length} files processed`, { hot: $.mode.hot }) : log.syncing(files[0].key, { hot: $.mode.hot });
  return files;
}
async function tailwindProcess(file, upsert) {
  if ($.mode.hot) import_timer4.timer.start(file.uuid);
  const output = write(file, upsert);
  const read = await readStyleFile(file);
  const post = await postcssProcess(file, read.css, read.map);
  if (post === null) return null;
  file.hash = checksum(post);
  if ($.checksum[file.input] === file.hash) {
    log.skipped(file, "no changes");
    return null;
  }
  $.checksum[file.input] = file.hash;
  if (file.data.snippet) {
    return output(createSnippet(post, file.data.attrs));
  } else {
    return output(post);
  }
}
async function readStyleFile(file) {
  try {
    const css = await fsExtra.readFile(file.input, "utf8");
    file.size = byteSize(css);
    return { css, map: null };
  } catch (e2) {
    import_timer4.timer.clear();
    log.error(file.relative, {
      notify: {
        title: "Read Error",
        message: `File ${file.base} could not be read`
      }
    });
    error.throw(e2, {
      source: file.relative,
      transform: "style"
    });
    return null;
  }
}
async function postcssProcess(file, css, map) {
  const { data } = file;
  const isTWCSS = isBoolean(data.tailwind) === false;
  const plugins2 = isTWCSS && data.tailwind ? [$import.tailwind(data.tailwind)].concat(data.postcss) : data.postcss;
  try {
    if ($.mode.watch && file.kind !== "Tailwind" /* Tailwind */) import_timer4.timer.start();
    const result = await $import.postcss(plugins2).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? {
        prev: map,
        inline: false,
        absolute: true
      } : null
    });
    if ($.mode.watch && file.kind !== "Tailwind" /* Tailwind */) {
      log.process("PostCSS", import_timer4.timer.stop());
    }
    const issues = result.warnings();
    if (issues.length > 0) {
      for (const warning of issues) {
        warn.postcss(file, warning);
      }
    }
    return result.css.toString();
  } catch (e2) {
    if ($.mode.watch) {
      import_timer4.timer.clear();
      log.error(file.relative, {
        notify: {
          title: `Error in ${file.base}`,
          message: "PostCSS Transform Error, file failed to process"
        }
      });
      error.postcss(file, e2);
    }
    return null;
  }
}
function createSnippet(string, attrs) {
  return attrs.length > 0 ? `<style ${g.ws(attrs)}>${string}</style>` : `<style>${string}</style>`;
}
async function StyleTransform(file) {
  if ($.mode.watch) import_timer4.timer.start();
  if ($.mode.hot) import_timer4.timer.start(file.uuid);
  const output = write(file);
  try {
    if (isUndefined(file.data)) return readStyleFile(file);
    const out = await sassProcess(file);
    if (out === null) return null;
    if (isNil($import.postcss) || isUndefined(file.data) || !file.data.postcss && !file.data.snippet) {
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
  } catch (e2) {
    console.log(e2);
    return null;
  }
}

// syncify/transform/json.ts
function parseJson(file, actual, expected) {
  try {
    return expected ? json.evaluate(actual, expected, $.json.options) : json.evaluate(actual, $.json.options);
  } catch (e2) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Parse error occurred due to invalid syntax"
      }
    });
    error.json(e2, file, "JSON Parse Error");
    return null;
  }
}
async function jsonCompile(file, json$1) {
  const { parsed, string } = isString(json$1) ? parseJson(file, json$1) : json$1;
  const indent = $.json.terse.enabled ? indentSize(file.type) : $.json.indent;
  const output = indent === 0 ? json.stringify(parsed, {
    removeComments: true,
    indentSize: 0,
    arrays: $.json.options.arrays,
    objects: $.json.options.objects,
    exclude: $.json.options.exclude
  }) : string;
  if (isNil(output)) {
    if ($.mode.watch) import_timer5.timer.stop();
    return output;
  }
  if (indent === 0) {
    const { before, after, saved } = sizeDiff(output, file.size);
    log.minified("JSON", before, after, saved);
  } else {
    log.transform("JSON", file.namespace, byteConvert(file.size), import_timer5.timer.now());
  }
  if (file.type === 17 /* Metafield */) return output;
  fsExtra.writeFile(file.output, output).catch(
    error.write("Error writing JSON", {
      file: file.input
    })
  );
  return output;
}
async function jsonCompare(file, local) {
  const json = [];
  for (const theme2 of $.target) {
    const remote = await themeFilesGet(file.key, theme2);
    if (remote.file !== null) {
      const data = parseJson(file, local, remote.file.body.content);
      if (data === null) return null;
      json.push(data);
    }
  }
  if (json.length > 0) {
    log.error(file.key, {
      suffix: "version mismatch",
      notify: {
        title: "Version Mismatch",
        message: `Local and remote versions do not align on ${file.key}`
      }
    });
    log.nl();
    const { action } = await enquirer.prompt({
      name: "action",
      type: "select",
      multiple: false,
      message: "action",
      theme,
      choices: [
        {
          name: "open",
          hint: "View the remote version in your editor"
        },
        {
          name: "push",
          hint: "Replaces the remote version with local version"
        },
        {
          name: "pull",
          hint: "Replaces the local version with the remote version"
        },
        {
          name: "stash",
          hint: "Stash the remote version and push the local version"
        },
        {
          name: "cancel",
          hint: "Cancel the sync operation"
        }
      ]
    });
    if (action === "open") {
      const uri = path2.join($.dirs.temp, file.key);
      await fsExtra.writeFile(uri, json[0].string);
      openInEditor(uri);
      return null;
    } else if (action === "push") {
      return json[0].string;
    } else if (action === "pull") {
      await fsExtra.writeFile(file.input, json[0].string);
      return null;
    }
  }
  return json[0].string;
}
function indentSize(type2) {
  const { options } = $.json.terse;
  switch (type2) {
    case 6 /* Group */:
      if (options.groups) return 0;
      break;
    case 16 /* Asset */:
      if (options.assets) return 0;
      break;
    case 10 /* Locale */:
      if (options.locales) return 0;
      break;
    case 1 /* Template */:
      if (options.templates) return 0;
      break;
    case 9 /* Config */:
      if (options.config) return 0;
      break;
    case 17 /* Metafield */:
      if (options.metafields) return 0;
      break;
    case 8 /* Metaobject */:
      if (options.metaobject) return 0;
      break;
  }
  return $.json.useTab ? "	".repeat(Math.floor($.json.indent / 2)) : $.json.indent;
}
var isDiff = (type2) => type2 === 9 /* Config */ || type2 === 1 /* Template */ || type2 === 8 /* Metaobject */ || type2 === 10 /* Locale */ || type2 === 6 /* Group */;
async function JsonTransform(file) {
  $.mode.watch && import_timer5.timer.start();
  const read = await fsExtra.readFile(file.input, "utf8").catch(
    error.write("Error reading JSON file", {
      input: file.input,
      output: file.output
    })
  );
  if (!isString(read)) return;
  const local = read.trim();
  file.size = byteSize(local);
  if (local.length === 0) return log.skipped(file, "empty file");
  if ($.mode.build === false && isDiff(file.type)) {
    file.value = await jsonCompare(file, local);
  } else {
    file.value = await jsonCompile(file, local);
  }
  if ($.mode.build) return file.value;
  if (runChecksum(file.input, file.value)) {
    log.skipped(file.key, "no changes");
    await themeFilesUpsertMap(file);
  } else {
    if (file.type !== 11 /* Style */ && $.processor.tailwind.map !== null) {
      await tailwindParse(file).then(themeFilesUpsertMap);
    } else {
      log.syncing(file.key);
      await themeFilesUpsertMap(file);
    }
    if ($.mode.hot && $.mode.bulk === false) {
      await q2.http.onIdle().then(() => $.wss.replace());
    }
    return file.value;
  }
}
var import_timer7 = __toESM(require_dist());

// syncify/hot/socket.ts
var import_timer6 = __toESM(require_dist());
function server() {
  const assets = path2.join($.dirs.output, "assets");
  const app = uws.uWS.App();
  app.get("/*", (response, request2) => {
    const key = request2.getUrl();
    if (key === "/") {
      response.endWithoutBody();
    } else {
      const uri = path2.join(assets, key);
      response.writeHeader("Access-Control-Allow-Origin", "*");
      response.writeHeader("Cache-Control", "public, max-age=0");
      switch (path2.extname(key)) {
        case ".js":
        case ".mjs":
          response.writeHeader("Content-Type", "application/javascript");
          break;
        case "css":
          response.writeHeader("Content-Type", "text/css");
          break;
        case "json":
          response.writeHeader("Content-Type", "application/json");
          break;
      }
      if (fsExtra.existsSync(uri) && fsExtra.ensureFile(uri)) {
        response.end(fsExtra.readFileSync(uri));
      } else {
        response.endWithoutBody();
      }
    }
  }).listen($.hot.server, (token) => {
    if (token === false) {
      console.log("Failed to listen to port " + $.hot.server);
    }
  });
  return app;
}

// syncify/hot/socket.ts
var wss = function wss2() {
  const app = server();
  let listener;
  const ws = app.ws("/ws", {
    compression: uws.uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    sendPingsAutomatically: false,
    open(ws2) {
      HOT_SOCKET_TOPICS.forEach((topic) => ws2.subscribe(topic));
    },
    message(ws2, message, isBinary) {
      const string = Buffer.from(message).toString(isBinary ? "binary" : "utf8");
      if (string.startsWith("ROUTE:")) {
        $.hot.route = JSON.parse(string.slice(6));
      } else {
        log.hot(string);
      }
    }
  });
  $.wss = defineProperty(o(), "http", { get() {
    return ws;
  } });
  $.wss.alias = (json) => ws.publish("alias", `alias|${json}`);
  $.wss.script = (uuid2, src) => ws.publish("script", `script,${src},${uuid2}`);
  $.wss.stylesheet = (uuid2, href) => ws.publish("stylesheet", `stylesheet,${href},${uuid2}`);
  $.wss.section = (id) => ws.publish("section", `section,${id}`);
  $.wss.svg = (id) => ws.publish("svg", `svg,${id}`);
  $.wss.assets = () => ws.publish("assets", "assets");
  $.wss.reload = () => ws.publish("reload", "reload");
  $.wss.replace = () => ws.publish("replace", "replace");
  $.wss.disconnect = () => ws.publish("disconnect", "disconnect");
  ws.publish("connected", "connected");
  ws.listen($.hot.socket, (token) => {
    listener = token;
    event.emit("hot:socket");
    if (token === false) {
      log.error("Websocket connection failed", { suffix: "HOT" });
    }
  });
  event.on("hot:socket", () => {
    $.wss.alias(JSON.stringify($.hot.alias));
  });
  event.on("hot:failed", () => {
    ws.close();
    app.close();
    uws.uWS.us_listen_socket_close(listener);
    prexit.hooks.delete("hot:eject");
    runtime.hot({ isError: true });
  });
  if ($.hot.eject) {
    prexit("hot:eject", async function() {
      import_timer6.timer.start();
      log.ender($.log.group);
      log.begin(`HOT ${Ri} Ejection`, { group: true });
      log.spinner("HOT snippet ejection", { style: "brielle", color: Bi });
      await removeSnippetInjections().then((layouts) => {
        log.spinner.stop();
        forEach((layout) => log.line(`${oi(layout)} ${dr("HOT Snippet Removed")}`), layouts);
        log.nl();
        log.line(a.dim(`${Ot} Exit took ~ ${import_timer6.timer.stop()}`));
        log.ender($.log.group, { clear: false });
        log.nl("");
        kill(() => {
          ws.close();
          uws.uWS.us_listen_socket_close(listener);
        });
      });
    });
  }
};

// syncify/hot/snippet.ts
function setHotOptions(injection) {
  const { hot } = $;
  return injection.replace("# inject@options", g.nl(
    `assign server = ${hot.server}`,
    `  assign socket = ${hot.socket}`,
    `  assign method = '${hot.method}'`,
    `  assign no-preview-bar = ${hot.flags["no-preview-bar"]}`,
    `  assign no-web-pixels-manager = ${hot.flags["no-web-pixels-manager"]}`,
    `  assign no-shopify-features = ${hot.flags["no-shopify-features"]}`,
    `  assign no-checkout-preloads = ${hot.flags["no-checkout-preloads"]}`,
    `  assign no-trekkie = ${hot.flags["no-trekkie"]}`,
    `  assign no-perfkit = ${hot.flags["no-perfkit"]}`
  ));
}
function getSnippetVersion(content) {
  const source = content || fsExtra.readFileSync($.hot.source, "utf8");
  const start = source.indexOf("# v") + 3;
  if (start > 2) {
    const ender = source.indexOf("\n", start);
    if (ender > -1) return source.slice(start, ender);
  }
  return null;
}
function removeRenderTag(content) {
  const render2 = content.search(REGEX_HOT_SNIPPET);
  if (render2 > -1) {
    const start = content.slice(0, render2);
    const slice = content.slice(content.indexOf("%}") + 2);
    return start.replace(/\n$/, "") + slice.replace(/^\n/, "");
  }
  return content;
}
function injectRenderSnippet(content) {
  const ender = content.indexOf("<head>") + 6;
  const start = content.slice(0, ender);
  return start + "\n{%- render 'hot.js' -%}\n" + content.slice(ender);
}
function hasSnippetInjection(content) {
  return REGEX_HOT_SNIPPET.test(content);
}
function removeSnippetInjections() {
  const request2 = forMap((key) => ({
    filename: `layout/${path2.basename(key)}`,
    body: {
      type: "TEXT",
      value: fsExtra.readFileSync(key, "utf8")
    }
  }), $.hot.cache.layouts);
  return new Promise((resolve2) => {
    themeFilesUpsert(request2).then(({ synced }) => {
      resolve2(forMap(({ filename }) => filename, synced));
    });
  });
}
async function snippet2(theme2) {
  const input = [HOT_SNIPPET_KEY, ...$.hot.layouts.map((layout) => `layout/${layout}`)];
  return new Promise((resolve2, reject) => {
    themeFilesList({ input, onError: reject }).then(({ files, errors }) => {
      if (errors.length > 0) {
        const warn2 = warnOption("HOT");
        forEach(({ filename, message }) => warn2(message, filename), errors);
      }
      const match = m(files.map((file) => [file.filename, file.body.content]));
      const upsert = forMap((filename) => {
        if (filename === HOT_SNIPPET_KEY) {
          $.hot.alive.snippet = match.has(filename);
          if (match.has(filename)) {
            const content = match.get(filename);
            $.hot.alive.snippet = true;
            $.hot.version.remote = getSnippetVersion(content);
            q2.cache.add(() => fsExtra.writeFile($.hot.cache.snippet, content));
          }
          const source = fsExtra.readFileSync($.hot.source, "utf8");
          return {
            filename,
            body: {
              type: "TEXT",
              value: setHotOptions(source)
            }
          };
        } else if (match.has(filename)) {
          const cache = path2.join($.hot.cache.root, path2.basename(filename));
          const content = match.get(filename);
          const exists2 = $.hot.alive.layouts[filename] = hasSnippetInjection(content);
          $.hot.cache.layouts.push(cache);
          q2.cache.add(() => fsExtra.writeFile(cache, exists2 ? removeRenderTag(content) : content));
          return exists2 ? void 0 : {
            filename,
            body: {
              type: "TEXT",
              value: injectRenderSnippet(content)
            }
          };
        } else {
          $.hot.alive.layouts[filename] = false;
        }
      }, input);
      themeFilesUpsert({ input: upsert, onError: reject }).then(() => {
        if ($.mode.align) {
          event.once("alignment", () => resolve2("hot:active"));
        } else {
          resolve2("hot:active");
        }
      });
    });
  }).then(wss);
}

// syncify/transform/terser/liquid.ts
function minifySchema(schema2) {
  if ($.liquid.terse.liquid.minifySchema === false) {
    if ($.json.useTab) {
      return JSON.stringify(schema2, null, "	".repeat($.json.indent));
    } else {
      return JSON.stringify(schema2, null, $.json.indent);
    }
  }
  return JSON.stringify(schema2, null, 0);
}

// syncify/transform/schema.ts
async function ExtractSchema(file) {
  const content = await fsExtra.readFile(file.input, "utf-8");
  const open = content.search(/{%-?\s*schema/);
  if (open < 0) return [content, null, null];
  const begin = content.indexOf("%}", open + 2) + 2;
  const start = content.slice(begin);
  const ender = begin + start.search(/{%-?\s*endschema/);
  if (ender < 0) {
    log.error("Missing {% endschema %} tag in file.", {
      suffix: file.relative,
      notify: {
        title: `Error in ${file.base}`,
        message: "Liquid schema tag in section is missing an endschema token"
      }
    });
    return null;
  }
  try {
    const schema2 = json.parse(content.slice(begin, ender));
    return [
      content.slice(0, begin),
      schema2,
      content.slice(ender)
    ];
  } catch (e2) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Parse error occurred in the section schema tag"
      }
    });
    error.json(e2, file);
    return null;
  }
}
function InjectSettings(file, schema2) {
  const settings = [];
  for (let i = 0, s2 = schema2.length; i < s2; i++) {
    if (!has("$ref", schema2[i])) {
      settings.push(schema2[i]);
      continue;
    }
    const [key, prop] = schema2[i].$ref.split(".");
    if ($.section.shared.has(key)) {
      const shared = $.section.shared.get(key);
      if (has(prop, shared.schema)) {
        if (isArray(shared.schema[prop])) {
          settings.push(...shared.schema[prop]);
        } else if (isObject(shared.schema[prop])) {
          if (has("settings", shared.schema[prop])) {
            settings.push(...shared.schema[prop].settings);
          } else {
            settings.push(shared.schema[prop]);
          }
        }
      } else {
        if ($.mode.build) {
          warn.schema(file, {
            shared: shared.uri,
            $ref: schema2[i].$ref,
            schema: "settings",
            message: [
              `An unknown Shared Schema reference key of ${y(schema2[i].$ref)} was provided.`,
              `There is no such key ${y(prop)} within the shared schema.`
            ]
          });
        } else {
          log.warn(`undefined $ref ${y(prop)} in ${y(key)} `, file.base);
        }
      }
    } else {
      if ($.mode.build) {
        warn.schema(file, {
          shared: prop,
          $ref: schema2[i].$ref,
          schema: "settings",
          message: [
            `An unknown Shared Schema file reference ${y(schema2[i].$ref)} was provided`,
            `to ${y("settings")} within section file ${y(file.base)}. There is no known shared`,
            "schema file using that name."
          ]
        });
      } else {
        log.warn(`unknown $ref ${y(schema2[i].$ref)} `, file.base);
      }
    }
  }
  return settings;
}
function InjectBlocks(file, schema2) {
  const blocks = [];
  for (let i = 0, s2 = schema2.length; i < s2; i++) {
    if (has("$ref", schema2[i])) {
      const [key, prop] = schema2[i].$ref.split(".");
      if ($.section.shared.has(key)) {
        const shared = $.section.shared.get(key);
        if (has(prop, shared.schema)) {
          if (isArray(shared.schema[prop])) {
            blocks.push(...shared.schema[prop]);
          } else {
            blocks.push(shared.schema[prop]);
          }
        } else {
          if ($.mode.build) {
            warn.schema(file, {
              shared: prop,
              $ref: schema2[i].$ref,
              schema: "blocks",
              message: [
                `An unknown Shared Schema key reference of ${y(schema2[i].$ref)} was provided`,
                `to the ${y("blocks")} within section file ${y(file.base)}. The shared schema`,
                `file exists, but the key ${y(prop)} does not.`
              ]
            });
          } else {
            log.warn(`undefined $ref ${y(prop)} in ${y(key)} `, file.base);
          }
        }
      } else {
        if ($.mode.build) {
          warn.schema(file, {
            shared: prop,
            $ref: schema2[i].$ref,
            schema: "blocks",
            message: [
              `An unknown Shared Schema file reference ${y(schema2[i].$ref)} was provided`,
              `to ${y("blocks")} within section file ${y(file.base)}. There is no known shared`,
              "schema file using that name."
            ]
          });
        } else {
          log.warn(`unknown $ref ${y(schema2[i].$ref)} `, file.base);
        }
      }
    } else {
      const block = {};
      for (const prop in schema2[i]) {
        if (prop !== "settings") block[prop] = schema2[i][prop];
      }
      if (block.type === "@app") {
        blocks.push(block);
        continue;
      }
      block.settings = [];
      if (has("settings", schema2[i])) {
        for (const setting of schema2[i].settings) {
          if (has("$ref", setting)) {
            const [key, prop] = setting.$ref.split(".");
            if ($.section.shared.has(key)) {
              const shared = $.section.shared.get(key);
              if (has(prop, shared.schema)) {
                if (isArray(shared.schema[prop])) {
                  block.settings.push(...shared.schema[prop]);
                } else if (isObject(shared.schema[prop])) {
                  if (has("settings", shared.schema[prop])) {
                    block.settings.push(...shared.schema[prop].settings);
                  } else {
                    block.settings.push(shared.schema[prop]);
                  }
                }
              } else {
                if ($.mode.build) {
                  warn.schema(file, {
                    shared: prop,
                    $ref: schema2[i].$ref,
                    schema: `blocks ${K} settings`,
                    message: [
                      `An unknown Shared Schema key reference of ${y(schema2[i].$ref)} was provided`,
                      `to the ${y("blocks")} schema id ${y(setting.id)} within section file`,
                      `${y(file.base)}. The shared schema file exists, but the key ${y(prop)} does not.`
                    ]
                  });
                } else {
                  log.warn(`undefined $ref ${y(prop)} in ${y(key)} `, file.base);
                }
              }
            } else {
              if ($.mode.build) {
                warn.schema(file, {
                  shared: prop,
                  $ref: schema2[i].$ref,
                  schema: `blocks ${K} settings`,
                  message: [
                    `An unknown Shared Schema file reference ${y(schema2[i].$ref)} was provided`,
                    `to ${y("blocks")} schema id ${y(setting.id)} within section file ${y(file.base)}.`,
                    "There is no known shared schema file using that name."
                  ]
                });
              } else {
                log.warn(`unknown $ref ${y(setting.$ref)} `, file.base);
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
    const read = await fsExtra.readFile(file.input);
    const hash = checksum(read);
    if (has(file.input, $.cache.schema) && $.cache.checksum[file.input] === hash && $.section.shared.has(file.name)) {
      return $.section.shared.get(file.name);
    }
    ;
    $.cache.checksum[file.input] = hash;
    const data = read.toString();
    if (data.trim().length === 0) {
      log.warn("empty file", "no shared schema defined");
      return null;
    }
    const schema2 = json.parse(data.toString());
    if (has("$schema", schema2)) delete schema2.$schema;
    if (has("$description", schema2)) delete schema2.$description;
    for (const prop in schema2) {
      if (isObject(schema2[prop])) {
        if (has("$description", schema2[prop])) {
          delete schema2[prop].$description;
        }
      } else if (isArray(schema2[prop])) {
        for (const setting of schema2[prop]) {
          if (has("$description", setting)) delete setting.$description;
        }
      }
    }
    return $.section.shared.set(file.name, { uri: file.input, schema: schema2 }).get(file.name);
  } catch (e2) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Syntax error in shared schema file"
      }
    });
    error.json(e2, file);
    return null;
  }
}
async function CreateSection(file) {
  const read = await ExtractSchema(file);
  if (read === null) return null;
  const [before, schema2, after] = read;
  if (schema2 === null) return before;
  const schemaProp = hasProp(schema2);
  if (schemaProp("settings")) {
    schema2.settings = InjectSettings(file, schema2.settings);
  }
  if (schemaProp("blocks")) {
    schema2.blocks = InjectBlocks(file, schema2.blocks);
  }
  return g(before.trimEnd(), "\n", minifySchema(schema2), "\n", after.trimStart());
}
async function getSchemaFiles(sections) {
  for (let i = 0, s2 = sections.length; i < s2; i++) {
    sections[i].value = await CreateSection(sections[i]);
  }
  return sections;
}
async function SchemaTransform(file) {
  const shared = await ParseSharedSchema(file);
  if (shared === null) return null;
  const schemas = toArray($.cache.schema[shared.uri]);
  const sections = await pMap(schemas, (p) => {
    return defineProperty(file.data(p), "data", {
      get() {
        return $.cache.sections[p];
      }
    });
  });
  log.process("Shared Schema", `${sections.length} ${plur("section", sections.length)}`);
  const files = await getSchemaFiles(sections);
  if (files.length > 1) {
    log.syncing(`${files.length} files`);
  } else {
    log.syncing(files[0].key);
  }
  await themeFilesUpsertMap(files);
  if ($.mode.hot && $.mode.bulk === false) {
    for (const section2 of files) {
      if (file.type === 5 /* Section */) {
        $.wss.section(section2.name);
      } else if (section2.type !== 12 /* Script */ && section2.type !== 11 /* Style */) {
        await q2.http.onIdle().then(() => $.wss.replace());
      }
    }
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
      const parse11 = JSON.parse(content.slice(begin, ender));
      const minified = JSON.stringify(parse11, null, 0);
      const schema2 = content.slice(0, begin) + minified + content.slice(ender);
      return removeComments(schema2);
    }
    log.invalid(file.relative);
  }
  return removeComments(content);
}
function removeDashes(content) {
  if (!$.liquid.terse.liquid.stripTrims) return content;
  return content;
}
async function htmlMinify(file, content) {
  try {
    const htmlmin = await $import.terser.minify(content, $.liquid.terse.markup);
    return htmlmin;
  } catch (e2) {
    log.error(file.relative, {
      notify: {
        title: "Parse Error",
        message: `Terse minification error in ${file.base}`
      }
    });
    error.terser(file, e2);
    return null;
  }
}
async function transform(file, data) {
  if (!$.mode.terse) {
    fsExtra.writeFile(file.output, data).catch(
      error.write("Error writing liquid file to output", {
        input: file.relative,
        output: path2.relative($.cwd, file.output)
      })
    );
    log.transform(
      toUpcase(file.namespace),
      file.kind,
      byteConvert(file.size),
      import_timer7.timer.now()
    );
    return data;
  }
  let htmlmin;
  if (file.base.endsWith(".js.liquid")) {
    htmlmin = data.replace(ScriptJsonWhitespace, "").replace(/(?<=[:,]) +(?=['"{[])/g, "").replace(/{{%/g, "{ {%").replace(/%}}/g, "%} }").replace(/(?<=[%}]})\s+(?=[\]}])/g, " ").replace(/>\s+(?=[{[])/, ">").replace(/(?<=[}\]])\s<\//g, "</");
  } else if (file.base.endsWith(".json.liquid")) {
    htmlmin = JSON.stringify(JSON.parse(data), null, 0);
  } else {
    const content = file.type === 5 /* Section */ ? minifySchema2(file, data) : removeComments(data);
    const htmlterser = await htmlMinify(file, content);
    htmlmin = minifyLiquidTag(htmlterser);
  }
  log.process("HTML Terser", import_timer7.timer.now());
  if (isNil(htmlmin)) {
    fsExtra.writeFile(file.output, data).catch(
      error.write("Error writing liquid file to output", {
        input: file.relative,
        output: path2.relative($.cwd, file.output)
      })
    );
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, "");
  fsExtra.writeFile(file.output, postmin);
  const size = sizeDiff(data, file.size);
  if (size.isSmaller) {
    log.transform(`${file.namespace} ${size.before} \u2192 brotli ${size.brotli}`);
  } else {
    log.minified("Liquid", size.before, size.after, size.saved);
  }
  return postmin;
}
async function LiquidTransform(file) {
  if ($.mode.watch) import_timer7.timer.start();
  let input = await fsExtra.readFile(file.input, "utf8");
  if ($.mode.hot && $.hot.layouts.includes(file.base)) {
    input = injectRenderSnippet(input);
  }
  if (file.type === 5 /* Section */) {
    input = await CreateSection(file);
    if (input === null) return null;
  }
  file.size = byteSize(input);
  file.value = await transform(file, input);
  if ($.mode.build) return file.value;
  if (file.type !== 11 /* Style */ && $.processor.tailwind.map !== null) {
    await tailwindParse(file).then(themeFilesUpsertMap);
  } else {
    log.syncing(`${file.key}`, { hot: $.mode.hot });
    await themeFilesUpsertMap(file);
  }
  if ($.mode.hot && $.mode.bulk === false) {
    if (file.type === 5 /* Section */) {
      $.wss.alias(JSON.stringify($.hot.alias));
      $.wss.section(file.name);
    } else {
      await q2.http.onIdle().then(() => $.wss.replace());
    }
  }
  return file.value;
}
var import_timer8 = __toESM(require_dist());
async function esbuildBundle(bundle) {
  bundle.watch.clear();
  const result = await esbuild__default.default.build(bundle.esbuild);
  if ($.mode.terse && $.mode.build) {
    bundle.size = byteSize(result.outputFiles[0].text);
  }
  if ($.mode.watch) {
    await getWatchPaths(bundle, result.metafile.inputs);
  } else {
    if (!bundle.watch.has(bundle.input)) {
      bundle.watch.add(bundle.input);
    }
  }
}
async function getWatchPaths(bundle, inputs) {
  const { cwd: cwd2, mode } = $;
  for (const file in inputs) {
    if (file.indexOf("/node_modules/") > -1) continue;
    const path5 = path2.join(cwd2, file);
    if (!bundle.watch.has(path5)) bundle.watch.add(path5);
    if (mode.watch) ;
  }
  if (mode.watch) {
    await pNext().then(() => {
      for (const path5 of bundle.watch) {
        if (path5.indexOf("/node_modules/") > -1) continue;
        if (bundle.watchCustom !== null && bundle.watchCustom(path5)) continue;
        if (!has(path5.slice(cwd2.length + 1), inputs)) bundle.watch.delete(path5);
      }
    });
  }
}
function createSnippet2(string, attrs) {
  return attrs.length > 0 ? `<script ${g.ws(attrs)}>${string}</script>` : `<script>${string}</script>`;
}
async function ScriptTransform(file) {
  if (!file.data) return;
  const { hot, watch, terse, bulk: bulk2, build } = $.mode;
  if (watch) import_timer8.timer.start();
  if (hot) import_timer8.timer.start(file.uuid);
  const files = await pMap(file.data, async (bundle) => {
    const { key, input, output, snippet: snippet3, attrs, esbuild: { format: format2 } } = bundle;
    const { metafile, outputFiles, warnings: warnings2 } = await esbuild__default.default.build(bundle.esbuild);
    if (file.data.length > 1) {
      log.nl().write(path2.relative($.cwd, input));
    }
    if ($.mode.watch) {
      await getWatchPaths(bundle, metafile.inputs);
    }
    if (warnings2.length > 0) {
      warn.esbuild(warnings2);
    }
    for (const { text, path: path5 } of outputFiles) {
      if (path5.endsWith(".map")) {
        const map = path2.join($.dirs.sourcemaps.scripts, `${file.base}.map`);
        q2.tasks.add(() => fsExtra.writeFile(map, text).catch(
          error.write("Error writing JavaScript Source Map to cache", {
            output: $.dirs.sourcemaps.scripts,
            source: file.relative
          })
        ));
      } else {
        if (terse) {
          if (isNaN(bundle.size)) {
            log.transform(file.kind, `${y(format2.toUpperCase())} bundle`);
            log.minified(stringSize(text));
          } else {
            const size = sizeDiff(text, bundle.size);
            log.transform(`${y(format2.toUpperCase())} bundle ${K} ${y(stringSize(text))}`);
            log.minified(null, size.before, size.after, size.saved);
          }
        } else {
          log.transform(`${y(format2.toUpperCase())} bundle ${K} ${y(stringSize(text))}`);
        }
        if (snippet3) {
          bundle.value = createSnippet2(text, attrs);
          await fsExtra.writeFile(output, bundle.value).catch(
            error.write("Error writing inline <script> snippet", {
              source: file.relative
            })
          );
          log.exported("script", "snippet");
        } else {
          bundle.value = text;
          await fsExtra.writeFile(output, bundle.value).catch(
            error.write("Error writing JavaScript asset", {
              source: file.relative
            })
          );
        }
        if (bulk2 === false || build === false) {
          log.syncing(key, { hot });
          hot && $.wss.script(file.uuid, path2.basename(key));
        }
      }
    }
    ;
    return bundle;
  }).catch((issue) => {
    if (inProp("errors", issue)) {
      import_timer8.timer.clear();
      error.esbuild(file, issue.errors);
    }
  });
  if (files && isEmpty(files) === false && build === false) {
    await themeFilesUpsertMap(files);
  }
}
var import_timer9 = __toESM(require_dist());
function hasLiquid(svg2) {
  return /^(?:{{[\s\S]+?}}|{%[\s\S]+?%})|[^"'](?:{{[\s\S]+?}}|{%[\s\S]+?%})[^'"]/m.test(svg2);
}
function patchPathVoids(svg2) {
  const patch = /<path[^>]*[a-zA-Z"'\s](>)(?!\s*<\/path>)/g;
  if (patch.test(svg2)) {
    const before = `${a(`<${ze("path")}>`)}`;
    const after = `${Q(`<${ze("path")} />`)}`;
    log.transform("SVG", before, after, "patched solidus");
    return svg2.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, "$1 /$2");
  }
  return svg2;
}
function createSymbol(id, code) {
  code = code.replace(/\s+/g, " ").replace(/\s*>\s*/g, ">").replace(/\s*\/>/g, "/>").trim();
  const viewBoxMatch = code.match(/viewBox=["']([^"']*)["']/i);
  let viewBox = viewBoxMatch ? viewBoxMatch[1] : "";
  if (!viewBox) {
    const widthMatch = code.match(/width=["'](\d*\.?\d+(?:px)?)["']/i);
    const heightMatch = code.match(/height=["'](\d*\.?\d+(?:px)?)["']/i);
    const width = widthMatch ? parseFloat(widthMatch[1]) : null;
    const height = heightMatch ? parseFloat(heightMatch[1]) : null;
    if (width !== null && height !== null) {
      viewBox = `0 0 ${width} ${height}`;
    }
  }
  const titleMatch = code.match(/<title[^>]*>([^<]*)<\/title>/i);
  const symbolId = id || (titleMatch ? titleMatch[1].trim() : id);
  let content = code.replace(/<svg[^>]*>/, "").replace(/<\/svg>.*$/, "").replace(/<title[^>]*>([^<]*)<\/title>/i, "").trim();
  content = content.replace(/(\S)\s+(\S)/g, "$1 $2").replace(/\s*\/>/g, "/>");
  const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
  return `<symbol ${xmlns} id="${symbolId}"${viewBox ? ` viewBox="${viewBox}"` : ""}>${content}</symbol>`;
}
function createSprite(symbols) {
  const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
  const xlink = 'xmlns:xlink="http://www.w3.org/1999/xlink"';
  const style2 = 'style="display:none;"';
  return `<svg ${xmlns} ${xlink} ${style2}>${symbols.join("")}</svg>`;
}
function compileSprite(context) {
  async function run(config) {
    const file = assign({}, context);
    if ($.mode.watch) import_timer9.timer.start();
    file.kind = "Sprite" /* Sprite */;
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = path2.join("snippets", renameFile(file, config.rename));
      file.output = path2.join($.dirs.output, file.key);
    } else {
      file.key = path2.join("assets", renameFile(file, config.rename));
      file.output = path2.join($.dirs.output, file.key);
    }
    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const items = await pMap(toArray(config.input), async (path5) => {
      const id = "svg-" + path2.basename(path5, ".svg");
      const svg2 = await fsExtra.readFile(path5, "utf-8");
      if (hasLiquid(svg2)) {
        return {
          path: path5,
          id,
          svg: createSymbol(id, svg2),
          size: byteSize(svg2),
          skipped: true
        };
      }
      const patch = patchPathVoids(svg2);
      try {
        const transform2 = $import.svgo.optimize(patch, options);
        return {
          path: path5,
          id,
          svg: createSymbol(id, transform2.data),
          size: byteSize(svg2),
          skipped: false
        };
      } catch (e2) {
        log.error(file.relative, {
          notify: {
            title: "Transform Error",
            message: `SVGO failed to optimize ${file.key}`
          }
        });
        error.throw(e2, {
          source: file.relative,
          output: file.key,
          processor: "SVGO"
        });
        return null;
      }
    });
    if (items) {
      file.size = 0;
      const skipped = items.filter(({ skipped: skipped2, size }) => {
        file.size = file.size + size;
        return skipped2;
      });
      if (skipped.length > 0) {
        if (skipped.length === 1) {
          log.skipped(file, " Liquid Detected");
        } else {
          log.skipped(`${skipped.length}`, " Files with Liquid Detected");
        }
      }
      file.value = createSprite(items.map(({ svg: svg2 }) => svg2));
      const length = items.length;
      log.process("SVG Sprite", `${length} ${plur("SVG", length)}`, import_timer9.timer.stop());
      fsExtra.writeFile(file.output, file.value).catch(
        error.write("Error writing SVG Sprite", {
          file: file.key,
          caller: context.relative
        })
      );
      log.syncing(file.key);
      if ($.mode.build) return file;
      await themeFilesUpsertMap(file);
    }
  }
  return run;
}
function compileInline(context) {
  const file = assign({}, context);
  async function run(config) {
    if ($.mode.watch) import_timer9.timer.start();
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = path2.join("snippets", renameFile(file, config.rename));
      file.output = path2.join($.dirs.output, file.key);
    } else {
      file.key = path2.join("assets", renameFile(file, config.rename));
      file.output = path2.join($.dirs.output, file.key);
    }
    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const read = await fsExtra.readFile(file.input);
    const node = read.toString();
    if (hasLiquid(node)) {
      log.skipped(file, "Liquid Detected");
      return null;
    }
    const patch = patchPathVoids(node);
    file.size = byteSize(patch);
    let svg2;
    try {
      svg2 = $import.svgo.optimize(patch, options);
    } catch (e2) {
      log.error(file.relative, {
        notify: {
          title: "Transform Error",
          message: `SVGO failed to optimize ${file.key}`
        }
      });
      error.throw(e2, {
        source: file.relative,
        output: file.key,
        processor: "SVGO"
      });
      return null;
    }
    log.process("SVGO", import_timer9.timer.stop());
    file.value = svg2.data;
    const size = sizeDiff(file.value, file.size);
    if (size.isSmaller) {
      log.transform(`${file.kind} ${size.before} \u2192 brotli ${size.brotli}`);
    } else {
      log.minified(file.kind, size.before, size.after, size.saved);
    }
    fsExtra.writeFile(file.output, file.value).catch(
      error.write("Error writing SVG", {
        file: file.key,
        caller: context.relative
      })
    );
    log.syncing(file.key);
    if ($.mode.build) return file;
    await themeFilesUpsertMap(file);
  }
  return run;
}
async function SvgTransform(file) {
  if ($.mode.watch) import_timer9.timer.start();
  const sprite = compileSprite(file);
  const inline = compileInline(file);
  const length = file.data.length;
  for (let i = 0; i < length; i++) {
    const config = file.data[i];
    if (i > 0 && $.mode.watch) {
      log.changed(file);
    }
    if (config.format === "sprite") {
      await sprite(config);
    } else if (config.format === "file") {
      await inline(config);
    }
  }
}

// syncify/modes/build.ts
function getGlobs() {
  const paths2 = [];
  for (const p in $.paths) if ($.paths[p].input) paths2.push(...$.paths[p].input.values());
  paths2.push(...$.script.map(({ input }) => input));
  paths2.push(...$.style.map(({ input }) => input));
  paths2.push(...$.svg.flatMap(({ input }) => toArray(input)));
  return paths2;
}
function getModel(globs) {
  const match = (0, import_anymatch2.default)(getGlobs());
  const report = {
    stats: {
      total: 0,
      errors: 0,
      skipped: 0,
      bundled: 0
    }
  };
  for (const group of BUILD_GROUPS) {
    report[group] = {
      group,
      type: "",
      time: "",
      size: 0,
      files: [],
      report: null
    };
  }
  for (const path5 of globs.filter(match)) {
    const file = parse2(path5);
    if (isUndefined(file)) continue;
    setPathCache(file.input, file.output);
    switch (file.type) {
      case 11 /* Style */:
        report.styles.files.push(file);
        break;
      case 12 /* Script */:
        report.scripts.files.push(file);
        break;
      case 5 /* Section */:
        report.sections.files.push(file);
        break;
      case 2 /* Layout */:
        report.layouts.files.push(file);
        break;
      case 3 /* Block */:
        report.blocks.files.push(file);
        break;
      case 4 /* Snippet */:
        report.snippets.files.push(file);
        break;
      case 10 /* Locale */:
        report.locales.files.push(file);
        break;
      case 9 /* Config */:
        report.configs.files.push(file);
        break;
      case 1 /* Template */:
        report.templates.files.push(file);
        break;
      case 18 /* Page */:
        report.pages.files.push(file);
        break;
      case 16 /* Asset */:
        report.assets.files.push(file);
        break;
      case 17 /* Metafield */:
        report.metafields.files.push(file);
        break;
      case 13 /* Svg */:
        report.svgs.files.push(file);
        break;
    }
  }
  return report;
}
function getLogs() {
  const write2 = pt().Prefix("version", `  ${$.vc.number}`, y).Template({ id: "version", prefix: true }).Template({ id: "processed", prefix: true }).Template({ id: "bundled", prefix: true }).Template({ id: "skipped", prefix: true }).Template({ id: "duration", prefix: true }).Template({ id: "warnings", prefix: true }).Template({ id: "errors", prefix: true }).Newline().Template("Building", { id: "build", dash: true, color: a }).Newline().Template({ id: "svg", prefix: true }).Template({ id: "layouts", prefix: true }).Template({ id: "templates", prefix: true }).Template({ id: "blocks", prefix: true }).Template({ id: "sections", prefix: true }).Template({ id: "snippets", prefix: true }).Template({ id: "locales", prefix: true }).Template({ id: "configs", prefix: true }).Template({ id: "assets", prefix: true }).Template({ id: "styles", prefix: true }).Template({ id: "scripts", prefix: true });
  return {
    write: write2,
    update: (report) => write2.Update("processed", `  ${y(`${report.stats.total}`)} files`).Update("bundled", `  ${y(`${report.stats.bundled}`)} files`).Update("skipped", `  ${y(`${report.stats.skipped}`)} files`).Update("duration", `  ${A.numbers(import_timer10.timer.now("build"), y)}`).Update("warnings", `  ${y(`${$.warnings.size}`)}`).Update("errors", `  ${y(`${report.stats.errors}`)}`)
  };
}
async function Build(cb) {
  $.running = true;
  import_timer10.timer.start("build");
  const stderr2 = pt({ type: "error" });
  const hasFilter = isEmpty($.filters) === false;
  const globs = await glob__default.default("**", { absolute: true, cwd: $.dirs.input });
  const report = getModel(globs);
  const { write: write2, update } = getLogs();
  update(report);
  await delay(250);
  function handle(record, Transform2) {
    import_timer10.timer.start(record.group);
    return async (file) => {
      import_timer10.timer.start(file.uuid);
      report.stats.total += 1;
      try {
        setPathCache(file.output, file.input);
        const value = file.ext === ".json" ? await JsonTransform(file) : await Transform2(file);
        if (value === null || isNaN(file.size)) {
          report.stats.skipped += 1;
          return {
            name: file.base,
            input: file.relative,
            time: import_timer10.timer.stop(file.uuid),
            output: file.key,
            error: "File is empty"
          };
        }
        report.stats.bundled += 1;
        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          error: null,
          time: import_timer10.timer.stop(file.uuid),
          size: sizeDiff(isObject(value) && has("css", value) ? value.css : value, file.size)
        };
      } catch (e2) {
        report.stats.errors += 1;
        stderr2.Line(e2.message);
        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          time: import_timer10.timer.stop(file.uuid),
          error: e2.message
        };
      }
    };
  }
  async function bundle(group, fn2) {
    const filter = hasFilter && has(group, $.filters) ? $.filters[group] : null;
    if (filter && filter.includes(group) === false) return 0;
    const record = report[group];
    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn2), { stopOnError: true });
    record.time = import_timer10.timer.stop(group);
    const files = record.report.length;
    const before = files > 100 ? " " : "  ";
    const count = before + y(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? "  " : " ";
    update(report).Update(group, `${count} ${plur("file", files)}${space}${dr(record.time)}`).toUpdate();
  }
  await bundle("svgs", SvgTransform);
  await bundle("layouts", LiquidTransform);
  await bundle("templates", LiquidTransform);
  await bundle("blocks", LiquidTransform);
  await bundle("sections", LiquidTransform);
  await bundle("snippets", LiquidTransform);
  await bundle("locales", JsonTransform);
  await bundle("configs", JsonTransform);
  await bundle("assets", AssetTransform);
  await bundle("styles", StyleTransform);
  await bundle("scripts", ScriptTransform);
  if ($.mode.publish === false) {
    write2.Update("build", "Build").toUpdate();
    write2.Newline().Template("Caching", { id: "cache", dash: true, color: a }).Newline().Spinner("Saving Cache", { color: Bi, style: "spinning" });
    await saveCache();
    write2.Stop().Update("cache", "Cached").Header(`${$.dirs.cache}`, a).toUpdate();
    if ($.warnings.size > 0) {
      write2.Dash("Warnings", a).Newline();
      let group;
      let count = 0;
      for (const err of $.warnings.keys()) {
        for (const [processor2, warnings2] of $.warnings.get(err)) {
          count = count + 1;
          if (group !== processor2) {
            group = processor2;
          } else {
            write2.Ruler();
          }
          write2.Warn(`${y("WARNING")} ${ki}${y(`${count}`)}`, P).Newline("yellow").Warn(group, P);
          for (const warn2 of warnings2) {
            write2.Insert(warn2).Break();
          }
        }
      }
      write2.toUpdate();
      write2.Newline();
    } else {
      write2.toUpdate();
    }
    write2.End($.log.group).Break().toUpdate();
    kill.exit(0);
  }
}

// syncify/modes/init.ts
function Init() {
  if ($.mode.init) ;
}
var import_timer11 = __toESM(require_dist());

// node_modules/.pnpm/write-json-file@6.0.0/node_modules/write-json-file/index.js
var import_write_file_atomic2 = __toESM(require_lib2(), 1);

// node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// node_modules/.pnpm/sort-keys@5.1.0/node_modules/sort-keys/index.js
function sortKeys(object, options = {}) {
  if (!isPlainObject(object) && !Array.isArray(object)) {
    throw new TypeError("Expected a plain object or array");
  }
  const { deep, compare } = options;
  const cache = /* @__PURE__ */ new WeakMap();
  const deepSortArray = (array) => {
    const resultFromCache = cache.get(array);
    if (resultFromCache !== void 0) {
      return resultFromCache;
    }
    const result = [];
    cache.set(array, result);
    result.push(...array.map((item) => {
      if (Array.isArray(item)) {
        return deepSortArray(item);
      }
      if (isPlainObject(item)) {
        return _sortKeys(item);
      }
      return item;
    }));
    return result;
  };
  const _sortKeys = (object2) => {
    const resultFromCache = cache.get(object2);
    if (resultFromCache !== void 0) {
      return resultFromCache;
    }
    const result = {};
    const keys2 = Object.keys(object2).sort(compare);
    cache.set(object2, result);
    for (const key of keys2) {
      const value = object2[key];
      let newValue;
      if (deep && Array.isArray(value)) {
        newValue = deepSortArray(value);
      } else {
        newValue = deep && isPlainObject(value) ? _sortKeys(value) : value;
      }
      Object.defineProperty(result, key, {
        ...Object.getOwnPropertyDescriptor(object2, key),
        value: newValue
      });
    }
    return result;
  };
  if (Array.isArray(object)) {
    return deep ? deepSortArray(object) : [...object];
  }
  return _sortKeys(object);
}

// node_modules/.pnpm/detect-indent@7.0.1/node_modules/detect-indent/index.js
var INDENT_REGEX = /^(?:( )+|\t+)/;
var INDENT_TYPE_SPACE = "space";
var INDENT_TYPE_TAB = "tab";
function makeIndentsMap(string, ignoreSingleSpaces) {
  const indents = /* @__PURE__ */ new Map();
  let previousSize = 0;
  let previousIndentType;
  let key;
  for (const line of string.split(/\n/g)) {
    if (!line) {
      continue;
    }
    let indent;
    let indentType;
    let use;
    let weight;
    let entry;
    const matches = line.match(INDENT_REGEX);
    if (matches === null) {
      previousSize = 0;
      previousIndentType = "";
    } else {
      indent = matches[0].length;
      indentType = matches[1] ? INDENT_TYPE_SPACE : INDENT_TYPE_TAB;
      if (ignoreSingleSpaces && indentType === INDENT_TYPE_SPACE && indent === 1) {
        continue;
      }
      if (indentType !== previousIndentType) {
        previousSize = 0;
      }
      previousIndentType = indentType;
      use = 1;
      weight = 0;
      const indentDifference = indent - previousSize;
      previousSize = indent;
      if (indentDifference === 0) {
        use = 0;
        weight = 1;
      } else {
        const absoluteIndentDifference = indentDifference > 0 ? indentDifference : -indentDifference;
        key = encodeIndentsKey(indentType, absoluteIndentDifference);
      }
      entry = indents.get(key);
      entry = entry === void 0 ? [1, 0] : [entry[0] + use, entry[1] + weight];
      indents.set(key, entry);
    }
  }
  return indents;
}
function encodeIndentsKey(indentType, indentAmount) {
  const typeCharacter = indentType === INDENT_TYPE_SPACE ? "s" : "t";
  return typeCharacter + String(indentAmount);
}
function decodeIndentsKey(indentsKey) {
  const keyHasTypeSpace = indentsKey[0] === "s";
  const type2 = keyHasTypeSpace ? INDENT_TYPE_SPACE : INDENT_TYPE_TAB;
  const amount = Number(indentsKey.slice(1));
  return { type: type2, amount };
}
function getMostUsedKey(indents) {
  let result;
  let maxUsed = 0;
  let maxWeight = 0;
  for (const [key, [usedCount, weight]] of indents) {
    if (usedCount > maxUsed || usedCount === maxUsed && weight > maxWeight) {
      maxUsed = usedCount;
      maxWeight = weight;
      result = key;
    }
  }
  return result;
}
function makeIndentString(type2, amount) {
  const indentCharacter = type2 === INDENT_TYPE_SPACE ? " " : "	";
  return indentCharacter.repeat(amount);
}
function detectIndent(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  let indents = makeIndentsMap(string, true);
  if (indents.size === 0) {
    indents = makeIndentsMap(string, false);
  }
  const keyOfMostUsedIndent = getMostUsedKey(indents);
  let type2;
  let amount = 0;
  let indent = "";
  if (keyOfMostUsedIndent !== void 0) {
    ({ type: type2, amount } = decodeIndentsKey(keyOfMostUsedIndent));
    indent = makeIndentString(type2, amount);
  }
  return {
    amount,
    type: type2,
    indent
  };
}

// node_modules/.pnpm/write-json-file@6.0.0/node_modules/write-json-file/index.js
var init = (function_, filePath, data, options) => {
  if (!filePath) {
    throw new TypeError("Expected a filepath");
  }
  if (data === void 0) {
    throw new TypeError("Expected data to stringify");
  }
  options = {
    indent: "	",
    sortKeys: false,
    ...options
  };
  if (options.sortKeys && isPlainObject(data)) {
    data = sortKeys(data, {
      deep: true,
      compare: typeof options.sortKeys === "function" ? options.sortKeys : void 0
    });
  }
  return function_(filePath, data, options);
};
var main = async (filePath, data, options) => {
  let { indent } = options;
  let trailingNewline = "\n";
  try {
    const file = await node_fs.promises.readFile(filePath, "utf8");
    if (!file.endsWith("\n")) {
      trailingNewline = "";
    }
    if (options.detectIndent) {
      indent = detectIndent(file).indent;
    }
  } catch (error2) {
    if (error2.code !== "ENOENT") {
      throw error2;
    }
  }
  const json = JSON.stringify(data, options.replacer, indent);
  return (0, import_write_file_atomic2.default)(filePath, `${json}${trailingNewline}`, { mode: options.mode, chown: false });
};
async function writeJsonFile(filePath, data, options) {
  await node_fs.promises.mkdir(path2__default.default.dirname(filePath), { recursive: true });
  await init(main, filePath, data, options);
}
var dependencyKeys = /* @__PURE__ */ new Set([
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies"
]);
function normalize(packageJson) {
  const result = {};
  for (const key of Object.keys(packageJson)) {
    if (!dependencyKeys.has(key)) {
      result[key] = packageJson[key];
    } else if (Object.keys(packageJson[key]).length > 0) {
      result[key] = sortKeys(packageJson[key]);
    }
  }
  return result;
}
function sanitize(filePath, data, options, { sanitizeData = true } = {}) {
  if (typeof filePath !== "string") {
    options = data;
    data = filePath;
    filePath = ".";
  }
  options = {
    normalize: true,
    ...options,
    detectIndent: true
  };
  filePath = path2__default.default.basename(filePath) === "package.json" ? filePath : path2__default.default.join(filePath, "package.json");
  if (options.normalize && sanitizeData) {
    data = normalize(data);
  }
  return { filePath, data, options };
}

// node_modules/.pnpm/write-package@7.1.0/node_modules/write-package/source/write-package.js
async function writePackage(filePath, data, options) {
  ({ filePath, data, options } = sanitize(filePath, data, options));
  return writeJsonFile(filePath, data, options);
}

// node_modules/.pnpm/parse-json@8.1.0/node_modules/parse-json/index.js
var import_code_frame = __toESM(require_lib4(), 1);

// node_modules/.pnpm/index-to-position@0.1.2/node_modules/index-to-position/index.js
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
var _message;
var _JSONError = class _JSONError extends Error {
  constructor(message) {
    var _a14;
    super();
    __publicField(this, "name", "JSONError");
    __publicField(this, "fileName");
    __publicField(this, "codeFrame");
    __publicField(this, "rawCodeFrame");
    __privateAdd(this, _message);
    __privateSet(this, _message, message);
    (_a14 = Error.captureStackTrace) == null ? void 0 : _a14.call(Error, this, _JSONError);
  }
  get message() {
    const { fileName, codeFrame } = this;
    return `${__privateGet(this, _message)}${fileName ? ` in ${fileName}` : ""}${codeFrame ? `

${codeFrame}
` : ""}`;
  }
  set message(message) {
    __privateSet(this, _message, message);
  }
};
_message = new WeakMap();
var JSONError = _JSONError;
var generateCodeFrame = (string, location, highlightCode = true) => (0, import_code_frame.codeFrameColumns)(string, { start: location }, { highlightCode });
var getErrorLocation2 = (string, message) => {
  const match = message.match(/in JSON at position (?<index>\d+)(?: \(line (?<line>\d+) column (?<column>\d+)\))?$/);
  if (!match) {
    return;
  }
  let { index, line, column } = match.groups;
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
function parseJson2(string, reviver, fileName) {
  let message;
  try {
    return JSON.parse(string, reviver);
  } catch (error2) {
    message = error2.message;
  }
  let location;
  if (string) {
    location = getErrorLocation2(string, message);
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

// node_modules/.pnpm/read-pkg@9.0.1/node_modules/read-pkg/index.js
var import_normalize_package_data = __toESM(require_normalize(), 1);
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? node_url.fileURLToPath(urlOrPath) : urlOrPath;
}

// node_modules/.pnpm/read-pkg@9.0.1/node_modules/read-pkg/index.js
var getPackagePath = (cwd2) => path2__default.default.resolve(toPath(cwd2) ?? ".", "package.json");
var _readPackage = (file, normalize2) => {
  const json = typeof file === "string" ? parseJson2(file) : file;
  if (normalize2) {
    (0, import_normalize_package_data.default)(json);
  }
  return json;
};
async function readPackage({ cwd: cwd2, normalize: normalize2 = true } = {}) {
  const packageFile = await fsPromises2__default.default.readFile(getPackagePath(cwd2), "utf8");
  return _readPackage(packageFile, normalize2);
}

// node_modules/.pnpm/deepmerge-ts@7.1.5/node_modules/deepmerge-ts/dist/index.mjs
var actions = {
  defaultMerge: Symbol("deepmerge-ts: default merge"),
  skip: Symbol("deepmerge-ts: skip")
};
({
  defaultMerge: actions.defaultMerge
});
function defaultMetaDataUpdater(previousMeta, metaMeta) {
  return metaMeta;
}
function defaultFilterValues(values3, meta) {
  return values3.filter((value) => value !== void 0);
}
var ObjectType;
(function(ObjectType2) {
  ObjectType2[ObjectType2["NOT"] = 0] = "NOT";
  ObjectType2[ObjectType2["RECORD"] = 1] = "RECORD";
  ObjectType2[ObjectType2["ARRAY"] = 2] = "ARRAY";
  ObjectType2[ObjectType2["SET"] = 3] = "SET";
  ObjectType2[ObjectType2["MAP"] = 4] = "MAP";
  ObjectType2[ObjectType2["OTHER"] = 5] = "OTHER";
})(ObjectType || (ObjectType = {}));
function getObjectType(object) {
  if (typeof object !== "object" || object === null) {
    return 0;
  }
  if (Array.isArray(object)) {
    return 2;
  }
  if (isRecord(object)) {
    return 1;
  }
  if (object instanceof Set) {
    return 3;
  }
  if (object instanceof Map) {
    return 4;
  }
  return 5;
}
function getKeys(objects) {
  const keys2 = /* @__PURE__ */ new Set();
  for (const object of objects) {
    for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
      keys2.add(key);
    }
  }
  return keys2;
}
function objectHasProperty(object, property) {
  return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
function getIterableOfIterables(iterables) {
  var _a14;
  let mut_iterablesIndex = 0;
  let mut_iterator = (_a14 = iterables[0]) == null ? void 0 : _a14[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return {
        next() {
          var _a15;
          do {
            if (mut_iterator === void 0) {
              return { done: true, value: void 0 };
            }
            const result = mut_iterator.next();
            if (result.done === true) {
              mut_iterablesIndex += 1;
              mut_iterator = (_a15 = iterables[mut_iterablesIndex]) == null ? void 0 : _a15[Symbol.iterator]();
              continue;
            }
            return {
              done: false,
              value: result.value
            };
          } while (true);
        }
      };
    }
  };
}
var validRecordToStringValues = ["[object Object]", "[object Module]"];
function isRecord(value) {
  if (!validRecordToStringValues.includes(Object.prototype.toString.call(value))) {
    return false;
  }
  const { constructor } = value;
  if (constructor === void 0) {
    return true;
  }
  const prototype = constructor.prototype;
  if (prototype === null || typeof prototype !== "object" || !validRecordToStringValues.includes(Object.prototype.toString.call(prototype))) {
    return false;
  }
  if (!prototype.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function mergeRecords$1(values3, utils, meta) {
  const result = {};
  for (const key of getKeys(values3)) {
    const propValues = [];
    for (const value of values3) {
      if (objectHasProperty(value, key)) {
        propValues.push(value[key]);
      }
    }
    if (propValues.length === 0) {
      continue;
    }
    const updatedMeta = utils.metaDataUpdater(meta, {
      key,
      parents: values3
    });
    const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
    if (propertyResult === actions.skip) {
      continue;
    }
    if (key === "__proto__") {
      Object.defineProperty(result, key, {
        value: propertyResult,
        configurable: true,
        enumerable: true,
        writable: true
      });
    } else {
      result[key] = propertyResult;
    }
  }
  return result;
}
function mergeArrays$1(values3) {
  return values3.flat();
}
function mergeSets$1(values3) {
  return new Set(getIterableOfIterables(values3));
}
function mergeMaps$1(values3) {
  return new Map(getIterableOfIterables(values3));
}
function mergeOthers$1(values3) {
  return values3.at(-1);
}
var mergeFunctions = {
  mergeRecords: mergeRecords$1,
  mergeArrays: mergeArrays$1,
  mergeSets: mergeSets$1,
  mergeMaps: mergeMaps$1,
  mergeOthers: mergeOthers$1
};
function deepmerge(...objects) {
  return deepmergeCustom({})(...objects);
}
function deepmergeCustom(options, rootMetaData) {
  const utils = getUtils(options, customizedDeepmerge);
  function customizedDeepmerge(...objects) {
    return mergeUnknowns(objects, utils, rootMetaData);
  }
  return customizedDeepmerge;
}
function getUtils(options, customizedDeepmerge) {
  return {
    defaultMergeFunctions: mergeFunctions,
    mergeFunctions: {
      ...mergeFunctions,
      ...Object.fromEntries(Object.entries(options).filter(([key, option]) => Object.hasOwn(mergeFunctions, key)).map(([key, option]) => option === false ? [key, mergeFunctions.mergeOthers] : [key, option]))
    },
    metaDataUpdater: options.metaDataUpdater ?? defaultMetaDataUpdater,
    deepmerge: customizedDeepmerge,
    useImplicitDefaultMerging: options.enableImplicitDefaultMerging ?? false,
    filterValues: options.filterValues === false ? void 0 : options.filterValues ?? defaultFilterValues,
    actions
  };
}
function mergeUnknowns(values3, utils, meta) {
  var _a14;
  const filteredValues = ((_a14 = utils.filterValues) == null ? void 0 : _a14.call(utils, values3, meta)) ?? values3;
  if (filteredValues.length === 0) {
    return void 0;
  }
  if (filteredValues.length === 1) {
    return mergeOthers(filteredValues, utils, meta);
  }
  const type2 = getObjectType(filteredValues[0]);
  if (type2 !== 0 && type2 !== 5) {
    for (let mut_index = 1; mut_index < filteredValues.length; mut_index++) {
      if (getObjectType(filteredValues[mut_index]) === type2) {
        continue;
      }
      return mergeOthers(filteredValues, utils, meta);
    }
  }
  switch (type2) {
    case 1: {
      return mergeRecords(filteredValues, utils, meta);
    }
    case 2: {
      return mergeArrays(filteredValues, utils, meta);
    }
    case 3: {
      return mergeSets(filteredValues, utils, meta);
    }
    case 4: {
      return mergeMaps(filteredValues, utils, meta);
    }
    default: {
      return mergeOthers(filteredValues, utils, meta);
    }
  }
}
function mergeRecords(values3, utils, meta) {
  const result = utils.mergeFunctions.mergeRecords(values3, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords) {
    return utils.defaultMergeFunctions.mergeRecords(values3, utils, meta);
  }
  return result;
}
function mergeArrays(values3, utils, meta) {
  const result = utils.mergeFunctions.mergeArrays(values3, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays) {
    return utils.defaultMergeFunctions.mergeArrays(values3);
  }
  return result;
}
function mergeSets(values3, utils, meta) {
  const result = utils.mergeFunctions.mergeSets(values3, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets) {
    return utils.defaultMergeFunctions.mergeSets(values3);
  }
  return result;
}
function mergeMaps(values3, utils, meta) {
  const result = utils.mergeFunctions.mergeMaps(values3, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps) {
    return utils.defaultMergeFunctions.mergeMaps(values3);
  }
  return result;
}
function mergeOthers(values3, utils, meta) {
  const result = utils.mergeFunctions.mergeOthers(values3, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers) {
    return utils.defaultMergeFunctions.mergeOthers(values3);
  }
  return result;
}

// node_modules/.pnpm/write-package@7.1.0/node_modules/write-package/source/update-package.js
async function updatePackage(filePath, data, options) {
  ({ filePath, data, options } = sanitize(filePath, data, options));
  let package_;
  try {
    package_ = await readPackage({ cwd: path2__default.default.dirname(filePath), normalize: false });
  } catch (error2) {
    if (error2.code === "ENOENT") {
      return writeJsonFile(filePath, data, options);
    }
    throw error2;
  }
  package_ = deepmerge(package_, data);
  if (options.normalize) {
    package_ = normalize(package_);
  }
  return writeJsonFile(filePath, package_, options);
}
async function getPkg(cwd2) {
  const path5 = cwd2 ? path2.join(cwd2, "package.json") : $.file.pkg;
  if (await fsExtra.pathExists(path5)) {
    try {
      const read = await fsExtra.readFile(path5, "utf8");
      const json$1 = json.parse(read);
      if (isString(cwd2) && cwd2 !== $.cwd) return json$1;
      $.pkg = json$1;
    } catch (e2) {
      throw error.json(e2, { base: "package.json" });
    }
  }
}
async function setPkg(json, cwd2) {
  try {
    if (cwd2) {
      await writePackage(path2.join(cwd2, "package.json"), json);
      return getPkg(cwd2);
    } else {
      await updatePackage($.file.pkg, json);
      return getPkg();
    }
  } catch (e2) {
    throw error.json(e2, { base: "package.json" });
  }
}
async function setPkgVersion(current, version) {
  try {
    if ($.pkg.version === version) {
      await setPkg({ version });
      return true;
    } else {
      return false;
    }
  } catch (e2) {
    throw new Error(e2);
  }
}
async function hasTemplateMismatch(cwd2) {
  const files = await glob.glob("templates/*", { cwd: cwd2, absolute: true });
  const exclude = s();
  const exists2 = s();
  for (const file of files) {
    const { name } = path2.parse(file);
    const templates = files.filter((path5) => path2.parse(path5).name === name);
    if (templates.length > 1 && !exists2.has(name)) exists2.add(name);
  }
  if (exists2.size === 0) return 1 /* None */;
  if (exists2.size > 1) {
    log.write(`${y(`${exists2.size}`)} mismatch template files`, {
      suffix: "error",
      type: "error"
    });
  } else {
    log.write(`${y(`${exists2.size}`)} mismatch template file`, {
      suffix: "error",
      type: "error"
    });
  }
  const resume = log.prompt(`select ${y(".json")} or ${y(".liquid")} template`, {
    title: "Export Error",
    message: "Multiple templates detected"
  });
  const { action } = await prompts([
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
            exclude.add(path2.join(cwd2, "templates", `${name}.liquid`));
          } else {
            exclude.add(path2.join(cwd2, "templates", `${name}.json`));
          }
        }
      });
    }
    await prompts(choices).then(() => resume());
    return exclude;
  } else if (action === "json") {
    for (const name of exists2) {
      exclude.add(path2.join(cwd2, "templates", `${name}.json`));
    }
    resume();
    return exclude;
  } else if (action === "liquid") {
    for (const name of exists2) {
      exclude.add(path2.join(cwd2, "templates", `${name}.liquid`));
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
      `There are no files within ${Bi(path2.relative($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${Bi.bold("syncify build")} command and try again.`
    ]);
  }
}

// syncify/modes/pack.ts
async function Pack() {
  await $import("adm-zip");
  $.running = true;
  let { themeVersion } = $.project;
  import_timer11.timer.start("export");
  if ($.mode.build) {
    log.group("Build");
    await Build();
  } else {
    isEmptyOutputDir($.stats);
  }
  const validate = await hasTemplateMismatch($.dirs.output);
  if (validate === 2 /* Cancel */) return;
  if (validate === 1 /* None */) {
    if ($.mode.build) import_timer11.timer.stop("build");
  }
  log.group("Packing");
  log.nl();
  if (!await fsExtra.pathExists($.cwd)) {
    await fsExtra.mkdir($.cwd);
  }
  const zip = new $import.AdmZip();
  for (const dir of THEME_DIRS) {
    const uri = path2.join($.dirs.output, dir);
    const has2 = await fsExtra.pathExists(uri);
    if (has2) {
      const files = await glob.glob("*", { cwd: uri, absolute: true });
      for (const file of files) {
        const path5 = `${dir}/${path2.basename(file)}`;
        const stat = fsExtra.statSync(file);
        if (stat.size === 0) {
          zip.addFile(path5, toBuffer(" "));
          log.warn(path5, "empty file");
        } else {
          if (validate === 1 /* None */ || validate.has(file) === false) {
            zip.addLocalFile(file, dir);
          }
        }
      }
    }
  }
  const size = byteSize(zip.toBuffer());
  if ($.vc.update !== null) {
    if (!await fsExtra.pathExists($.vc.update.dir)) await fsExtra.mkdir($.vc.update.dir);
    log.version($.vc, "bump");
    log.zipped(stringSize(size), path2.relative($.cwd, $.vc.update.zip));
    try {
      await zip.writeZipPromise($.vc.update.zip);
      themeVersion = $.vc.update.number;
    } catch (e2) {
      return error.throw(e2, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  } else {
    if (!await fsExtra.pathExists($.vc.dir)) {
      await fsExtra.mkdir($.vc.dir);
      log.version($.vc, "created");
    } else {
      log.version($.vc, "overwrite");
    }
    log.zipped(stringSize(size), path2.relative($.cwd, $.vc.zip));
    try {
      await zip.writeZipPromise($.vc.zip);
    } catch (e2) {
      return error.throw(e2, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  }
  if ($.pkg.version !== themeVersion) {
    const bump = await setPkgVersion($.pkg.version, themeVersion);
    if (bump) {
      log.process("package.json", "version bumped");
      $.project.themeVersion = themeVersion;
      await saveCache("build");
    } else {
      log.warn("package.json version failed to bump", "manual increment required");
    }
  }
  import_timer11.timer.stop("export");
  if ($.mode.publish === false) {
    log.group();
    log.nl("");
    process.exit(0);
  }
}

// syncify/modes/publish.ts
var import_timer12 = __toESM(require_dist());
async function Publish() {
  $.running = true;
  await Pack();
  import_timer12.timer.start("publish");
  const stdout3 = pt().Header("Publishing Theme");
  const progress = log.progress(300);
  event.on("publish:progress", ({ task, step }) => {
    progress.increment(step);
    log.update(
      stdout3.Header(task, a).Insert(progress.render()).toString()
    );
  });
  const hasThemes = $.target.length > 0;
  for (const target of $.target) {
    const { id } = await request.publish(target.store);
    console.log(id);
    if (hasThemes) {
      const syncify2 = $.pkg.syncify;
      if (isObject(syncify2.stores)) {
        if (target.store.domain.startsWith(syncify2.stores.domain)) {
          for (const target2 in syncify2.stores.themes) {
            if (syncify2.stores.themes[target2] === -1) {
              syncify2.stores.themes[target2] = id;
            }
          }
        }
        $.pkg.syncify = syncify2;
        await setPkg($.pkg);
      }
    }
  }
  kill.exit(0);
}
var import_timer13 = __toESM(require_dist());
async function runAlignment(write2) {
  if (!$.mode.align) return;
  if (!write2 && $.mode.watch) write2 = runtime.log;
  write2.Spinner("Theme Alignments", { color: Bi, style: "spinning" });
  await q2.cache.onIdle();
  const output = outputFile($.dirs.output);
  const list2 = await themeFilesList({
    target: $.target.default,
    input: [
      "config/*.json",
      "locales/*.json",
      "templates/index.json",
      "templates/customers/*.json",
      "templates/metaobject/*.json",
      "sections/*.json"
    ]
  });
  const align = {
    count: 0,
    total: list2.files.length,
    create: m(),
    update: m(),
    skipped: []
  };
  write2.True(list2.files.length > 10, (tui) => tui.Spinner(`${align.count} of ${align.total} Files`)).Newline().Template("...", { id: "align" }).toUpdate();
  for (const { filename, body } of list2.files) {
    await delay(75);
    const dir = filename.split("/");
    const pop = dir.pop();
    const itm = dir.length > 1 ? dir.pop() : dir[0];
    const file = output(filename);
    if (file.input) {
      const read = await fsExtra.readFile(file.input, "utf8");
      if (read.trim().length === 0) {
        write2.Update("align", filename, a).Spinner(`${++align.count} of ${align.total} Files`);
        continue;
      }
      const json$1 = json.evaluate(read, body.content, $.json.options);
      if (json$1.change) {
        file.value = json$1.string;
        align.update.set(filename, file);
        await fsExtra.writeFile(file.input, file.value).catch(
          error.write("Error writing file during alignment", {
            input: file.input
          })
        );
        write2.Update("align", filename, Q).Spinner(`${++align.count} of ${align.total} Files`);
      } else {
        write2.Update("align", filename, a).Spinner(`${++align.count} of ${align.total} Files`);
        align.skipped.push(file);
      }
    } else {
      file.input = path2.join($.stash[itm], pop);
      await fsExtra.pathExists($.stash[itm]);
      await fsExtra.writeFile(file.input, file.value).catch(
        error.write("Error writing file during alignment", {
          input: file.input
        })
      );
      write2.Update("align", filename, Q).Spinner(`${++align.count} of ${align.total} Files`);
    }
  }
  write2.Pop().Stop().toUpdate({ clear: true, trim: true }).clear();
  event.emit("alignment");
}
async function Pull() {
  $.running = true;
  import_timer13.timer.start("pull");
  if ($.mode.align) return runAlignment(pt());
  const write2 = pt().Line($.target.default.store.domain, y).Newline().Spinner("0 Files", { style: "spinning", color: Bi }).Template({ prefix: true, id: "elapsed", color: Y }).Template({ prefix: true, id: "download", color: Y }).Newline().Template({ id: "progress" });
  const remote = await themeFiles($.target.default, (n) => write2.Spinner(`${n} Files`));
  const progress = uo(remote.count, { prepend: null, clearOnComplete: false });
  const state = {
    count: 0,
    get total() {
      return remote.count;
    },
    get files() {
      return remote.files;
    }
  };
  write2.Stop();
  let ref = null;
  function interval() {
    if (ref !== null) {
      clearInterval(ref);
      ref = null;
    }
    ref = setInterval(() => {
      write2.Update("elapsed", A.numbers(import_timer13.timer.now("push"), y)).Update("downloaded", `${state.count} of ${state.total}`).Update("progress", progress.render()).toUpdate();
    }, 100);
  }
  for (const directory in state.files) {
    const items = state.files[directory];
    for (const input of getChunk(items.map(({ filename }) => filename), 100)) {
      state.count += items.length;
      progress.increment(items.length);
      interval();
      const { files } = await themeFilesList({
        target: $.target.default,
        input
      });
      for (const file of files) {
        try {
          console.log(file.filename);
        } catch (e2) {
        }
      }
    }
  }
}
var import_timer15 = __toESM(require_dist());
var import_timer14 = __toESM(require_dist());

// syncify/process/metafields.ts
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
        log.invalid(file.relative, [
          `Missing ${li.bold(prop)} property key value in a ${P.bold("metafields")}`,
          "value in frontmatter. Frontmatter metafields require you provide the following keys:",
          "",
          `${a("-")} ${ze("key")}`,
          `${a("-")} ${ze("type")}`,
          `${a("-")} ${ze("value")}`,
          `${a("-")} ${ze("namespace")}`,
          "",
          `${a("Update the metafield entry to include")} ${ze(prop)}`
        ]);
        return false;
      }
      if (prop === "type") {
        const type2 = metafield[prop];
        if (!checkMetafieldType(type2)) {
          log.invalid(file.relative, [
            `Invalid type ${li.bold(type2)} provided in frontmatter ${P.bold("metafields")}`,
            `value. Frontmatter metafields ${y("must")} be one of following types:`,
            "",
            `${a("-")} ${ze("boolean")}`,
            `${a("-")} ${ze("color")}`,
            `${a("-")} ${ze("date")}`,
            `${a("-")} ${ze("date_time")}`,
            `${a("-")} ${ze("dimension")}`,
            `${a("-")} ${ze("json")}`,
            `${a("-")} ${ze("money")}`,
            `${a("-")} ${ze("multi_line_text_field")}`,
            `${a("-")} ${ze("number_decimal")}`,
            `${a("-")} ${ze("number_integer")}`,
            `${a("-")} ${ze("rating")}`,
            `${a("-")} ${ze("rich_text_field")}`,
            `${a("-")} ${ze("single_line_text_field")}`,
            `${a("-")} ${ze("url")}`,
            `${a("-")} ${ze("volume")}`,
            `${a("-")} ${ze("weigh")}`,
            "",
            `${a("Update the metafield entry to an accepted")} ${ze("type")}`
          ]);
          return false;
        }
      }
    }
  }
  return true;
}

// syncify/transform/pages.ts
function toMarkdown(content) {
  return new turndown.Turndown($.page.import).use(turndown.GithubFlavor).turndown(content);
}
async function promptAction(store) {
  const resume = log.prompt("No matching pages, select an option", {
    title: "No matching pages",
    message: "Open CLI and select an option"
  });
  const prompt2 = await prompts({
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
    action: prompt2.action
  };
}
async function selectPage(store) {
  const remote = await pages.list(store);
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
      title: log.hline({ width: 20, newlines: false }),
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
  const prompt2 = await prompts({
    type: "select",
    name: "action",
    message: "Choose Page",
    hint: " ",
    instructions: false,
    choices
  });
  return prompt2.action;
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
  const resume = log.prompt("Remote version is newer than local version", {
    title: "Remote \u2192 Local",
    message: "Remote version has changed"
  });
  const prompt2 = await prompts({
    type: "select",
    name: "action",
    message: "Page Resources",
    hint: " ",
    instructions: false,
    choices
  });
  if (prompt2.action === 5 /* View */) {
    log.nl("");
    log.out(remote.body_html);
    log.nl("");
    const next = await prompts({
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
      action: prompt2.action
    };
  }
}
function getPayloadFromFrontmatter(file, data) {
  const payload = {
    title: has("title", data) ? data.title : toUpcase(file.name.replace(/[._-]/g, " "))
  };
  if (has("handle", data)) {
    let before;
    let handle = data.handle;
    if (/^[./]{1,2}/.test(handle)) {
      before = handle;
      handle = handle.replace(/^[./]{1,2}/, "");
      log.warn(`handle ${Ri} ${before} ${K} ${handle}`, "fixed start");
    }
    if (/^pages\//.test(handle)) {
      before = handle;
      handle = handle.replace(/^pages\//, "");
      log.warn(`handle ${Ri} ${before} ${K} ${handle}`, "fixed sub-path");
    }
    if (/[_/]/.test(data.handle)) {
      before = handle;
      handle = handle.replace(/[_/]/g, "-");
      log.warn(`handle ${Ri} ${before} ${K} ${handle}`, "fixed invalid characters");
    }
    payload.handle = handle;
  } else {
    if (has("title", data)) {
      payload.handle = handleize(data.title);
    } else {
      payload.handle = file.name.toLowerCase();
    }
  }
  if (has("author", data) && $.page.author !== "") {
    let before;
    let author = data.author;
    if (/\//.test(data.author)) {
      before = data.author;
      author = before.replace(/\//g, " ");
      log.warn(`author ${Ri} ${before} ${K} ${author}`, "fixed invalid characters");
    }
    payload.author = author;
  } else {
    data.author = $.page.author;
  }
  if (has("published", data)) {
    if (isBoolean(data.published)) {
      payload.published = data.published;
    } else {
      log.warn(`published ${Ri} expected boolean, got ${typeof data.published}`, "defaulted to false");
      payload.published = false;
    }
  } else {
    payload.published = true;
  }
  if (has("template_suffix", data)) {
    if (has("template", data)) {
      log.warn("duplicate template_suffix references", "using template");
      delete data.template_suffix;
    } else {
      data.template = data.template_suffix;
      delete data.template_suffix;
    }
  }
  if (has("template", data)) {
    payload.template_suffix = data.template;
  } else {
    if ($.page.suffixDir && (isRegex($.page.global) && $.page.global.test(file.input) !== false)) {
      payload.template_suffix = lastPath(file.input);
    }
  }
  if (has("metafield", data)) {
    log.warn("use metafields instead of metafield", "sync will still process");
    data.metafields = data.metafield;
    delete data.metafield;
  }
  if (has("metafields", data)) {
    if (isObject(data.metafields)) {
      payload.metafields = [data.metafields];
    }
  } else {
    payload.metafields = void 0;
  }
  return payload;
}
async function PagesTransform(file) {
  await $import("gray-matter");
  await $import("markdown-it");
  if ($.sync.stores.length > 1) {
    log.skipped(file, "pages do not support multistore sync");
    return null;
  }
  const read = await fsExtra.readFile(file.input);
  if (isEmpty(read.toString())) {
    if ($.mode.watch) log.skipped(file, "empty file");
    return null;
  }
  const frontmatter = $import.matter(read);
  const { data, content } = merge(frontmatter);
  const payload = getPayloadFromFrontmatter(file, data);
  if (isArray(payload.metafields) && !getPageMetafields(file, payload.metafields)) {
    return null;
  }
  if (file.kind === "Markdown" /* Markdown */) {
    import_timer14.timer.start();
    payload.body_html = $import.markdown($.page.export).render(content);
    log.transform(`${y("Markdown")} ${K} ${y("HTML")} ${Be} ${import_timer14.timer.stop()}`);
  } else {
    log.transform("HTML");
    payload.body_html = content;
  }
  const store = $.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await pages.find(store, { handle: payload.handle });
  if (isArray(remote)) {
    log.invalid(file.relative, [
      `Multiple pages returned when matching on handle ${li.bold(payload.handle)}`,
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
      const prompt2 = await promptAction(store);
      if (prompt2.action === 2 /* Select */) {
        const action = await selectPage(store);
        if (action === 4 /* Cancel */) {
          return prompt2.resume();
        } else if (action === 1 /* Create */) {
          prompt2.resume();
          log.syncing(`/pages/${payload.handle} ${K} ${payload.title} ${a(`${Be} ${file.relative}`)}`);
          return pages.create(store, payload);
        } else {
          payload.id = action;
          prompt2.resume();
        }
      } else if (prompt2.action === 1 /* Create */) {
        prompt2.resume();
        log.syncing(`/pages/${payload.handle} ${K} ${payload.title} ${a(`${Be} ${file.relative}`)}`);
        return pages.create(store, payload);
      } else {
        return prompt2.resume();
      }
    }
  }
  if (isObject(remote)) {
    const online = new Date(remote.updated_at).getTime();
    const local = new Date(cached.updated_at).getTime();
    if (online > local && remote.body_html !== payload.body_html) {
      const prompt2 = await promptOverwrite(remote);
      if (prompt2.action === 3 /* Update */) {
        prompt2.resume();
        let convert = remote.body_html;
        if ($.page.language === "markdown") {
          const markdown = toMarkdown(convert);
          log.transform(`${file.name}.html ${K} ${file.base}`);
          convert = stringify("\n" + markdown, frontmatter.data);
        }
        $.watch.unwatch(file.input);
        await fsExtra.writeFile(file.input, convert);
        setPageCache(store.domain, remote);
        $.watch.add(file.input);
      } else if (prompt2.action === 4 /* Cancel */) {
        return prompt2.resume();
      } else if (prompt2.action === 6 /* Overwrite */) {
        prompt2.resume();
      }
    }
  }
  if ($.mode.build) return payload.body_html;
  log.syncing(`/pages/${payload.handle} ${K} ${payload.title} ${a(`${Be} ${file.relative}`)}`);
  const update = await pages.sync(store, file, payload);
  if (!update) return;
  await saveCache("pages");
}

// syncify/modes/watch.ts
function Watch() {
  stdin.watch.listen();
  event.on("watch", log.upsert);
  $.running = true;
  watcher.subscribe($.dirs.input, (e2, changes) => {
    stdin.errors.isAttached && event.emit("stdin:dispose");
    changes.length > 1 ? Bulk(changes) : Change(changes);
  }).then(({ unsubscribe }) => {
    event.on("restart", (Define) => {
      unsubscribe().then(() => Define().then(Watch));
    });
  });
}
async function Change(changes) {
  const [change] = changes;
  const file = parse2(change.path);
  if (isObject(file) && file.input !== $.file.config) {
    q2.change.add(async () => {
      log.changed(file);
      if (change.type === "delete") {
        await themeFilesDeleteMap(file);
      } else {
        await Transform(file);
      }
    });
  }
}
async function Bulk(changes) {
  if (!$.mode.bulk) $.mode.bulk = true;
  const change = reduce(changes, (state, { type: type2, path: path5 }) => {
    state[type2 === "delete" ? "delete" : "update"].push(parse2(path5));
    return state;
  }, { delete: [], update: [] });
  if (change.update.length > 0) {
    $.bulk.files += change.update.length;
    $.bulk.type = "uploaded";
    log.group("update").bulk();
    await q2.bulk.add(async () => await pMap(change.update, Transform));
  }
  if (change.delete.length > 0) {
    $.bulk.files += change.delete.length;
    $.bulk.type = "deleted";
    log.group("delete").bulk();
    await q2.bulk.add(async () => await pMap(getChunk(change.delete, 4), themeFilesDeleteMap));
  }
  await q2.bulk.onIdle().then(() => log.bulk.complete());
}
async function Transform(file) {
  switch (file.type) {
    case 7 /* Schema */:
      return SchemaTransform(file);
    case 2 /* Layout */:
    case 4 /* Snippet */:
    case 5 /* Section */:
    case 3 /* Block */:
      return LiquidTransform(file);
    case 1 /* Template */:
    case 8 /* Metaobject */:
      return file.kind === "JSON" /* JSON */ ? JsonTransform(file) : LiquidTransform(file);
    case 9 /* Config */:
    case 10 /* Locale */:
    case 6 /* Group */:
    case 17 /* Metafield */:
      return JsonTransform(file);
    case 11 /* Style */:
      return StyleTransform(file);
    case 12 /* Script */:
      return ScriptTransform(file);
    case 13 /* Svg */:
      return SvgTransform(file);
    case 18 /* Page */:
      return PagesTransform(file);
    case 16 /* Asset */:
    case 19 /* Spawn */:
      return AssetTransform(file);
  }
}

// syncify/modes/push.ts
function setState(write2, files) {
  if (files.length === 0) {
    throwError([
      "Empty output directory"
    ], [
      `There are no files within ${Bi(path2.relative($.cwd, $.dirs.output) + "/**")}`,
      `Run the ${Bi.bold("sy build")} command and try again.`
    ]);
  }
  const state = {
    kb: 0,
    files: files.sort(),
    stream: [],
    completed: [],
    interval: null,
    parsed: m(),
    stores: s(),
    transfer: m(),
    synced: m(),
    warnings: m(),
    errors: m(),
    write: write2
  };
  const whitespace = eqWS($.target, { prop: "target" });
  $.target.forEach((target) => {
    if (state.stores.has(target.store) === false) {
      state.stores.add(target.store);
      state.write.Prepend(target.store.domain, y).Template({ id: `${target.uid}:files` }).Template({ id: `${target.uid}:progress` });
    }
    state.write.Template(Li + "  " + target.target, {
      hidden: true,
      id: `${target.uid}`,
      color: a
    });
    state.synced.set(target, {
      target,
      total: 0,
      ws: whitespace(target.target) + K + "  ",
      success: 0,
      transfer: 0,
      interval: null,
      progress: uo(state.files.length, {
        prepend: null,
        clearOnComplete: false
      })
    });
  });
  return state;
}
function setLogInterval(state) {
  if (state.interval !== null) {
    clearInterval(state.interval);
    state.interval = null;
  }
  state.interval = setInterval(() => {
    state.write.Update("elapsed", A.numbers(import_timer15.timer.now("upload"), y)).Update("synced", state.stream.length > 1 ? state.stream.pop() : state.stream[0]).toUpdate();
  }, 100);
}
async function setBatchUpserts(state) {
  const { write: write2 } = state;
  const parse11 = outputFile($.dirs.output);
  const batches = [];
  write2.Spinner(`${state.files.length} Files`);
  for (let i = 0, s2 = state.files.length; i < s2; i++) {
    const path5 = state.files[i];
    const file = parse11(path5);
    try {
      file.value = await fsExtra.readFile(file.output, "utf8");
      file.size = byteSize(file.value);
      state.transfer.set(file.key, file.size);
      state.parsed.set(file.key, file);
      batches.push(file);
    } catch (e2) {
      error.write("Error reading output file", {
        file: file.key,
        source: file.relative
      })(e2);
    }
  }
  await delay();
  import_timer15.timer.start("batch");
  for (const batch of getChunk(batches, $.cmd.batch)) {
    await themeFilesUpsertMap(batch);
  }
}
function onUpsert(state) {
  const { write: write2 } = state;
  return (upsert) => {
    const record = state.synced.get(upsert.target);
    forEach(({ filename }) => {
      state.kb += state.transfer.get(filename);
      state.stream.push(a(filename));
    }, upsert.synced);
    record.progress.increment(upsert.synced.length);
    record.success += upsert.synced.length;
    write2.Stop().Update("version", $.vc.number).Update("elapsed", A.numbers(import_timer15.timer.now("upload"), y)).Update("uploads", `${y(record.success)} of ${y(state.files.length)}`).Update("transfer", stringSize(state.kb)).Update("errors", $.errors.size > 0 ? w.bold($.errors.size) : a($.errors.size)).Update("synced", state.stream.length > 1 ? state.stream.pop() : state.stream[0]).Update(`${record.target.uid}:progress`, record.progress.render()).Update(`${record.target.uid}`).toUpdate();
    if (upsert.errors.length > 0) {
      error.upsert(upsert.errors);
      record.progress.increment(upsert.errors.length);
      write2.Update("errors", k.bold($.errors.size)).Update(`${record.target.uid}:progress`, record.progress.render());
      forEach((error2) => {
        const tui = pt().Mark("legend").Newline().Template({ id: "s", color: a }).Template({ id: "p", color: a }).Template({ id: "e", color: a }).Template({ id: "w", color: a }).Template({ id: "s", color: a }).Template({ id: "q", color: a }).Mark("results").Header(upsert.target.store.domain, y.whiteBright).Template({ prefix: true, id: "uploads", color: Q }).Template({ prefix: true, id: "errors", color: k }).Template({ prefix: true, id: "warnings", color: P, hidden: true }).Template({ prefix: true, id: "skipped", color: a }).Newline().Mark("debug").Tree("error").Template({ id: "count", color: k });
        state.errors.set(error2.file.key, tui);
        state.stream.push(k(error2.file.key));
      }, upsert.errors);
    }
    if (state.interval === null) {
      setLogInterval(state);
    }
  };
}
async function Complete(state) {
  await q2.http.onIdle();
  clearInterval(state.interval);
  state.write.Each($.target, ({ store }) => state.write.Remove("version", Infinity)).toUpdate({ clear: true }).clear();
  if ($.errors.size > 0) return Debug(state);
}
function Debug(state) {
  const debug = {
    error: [],
    skips: [],
    first: false
  };
  entries();
  observe();
  stdin.errors.warn((index) => {
    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }
    entries();
  });
  stdin.errors.skip((index) => {
    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }
    entries();
  });
  function observe() {
    watcher.subscribe($.dirs.input, (e2, [event2]) => {
      const change2 = parse2(event2.path);
      if (debug.error.some(([{ output }]) => change2.output === output)) {
        event2.type !== "delete" ? Transform(change2) : NooP();
      }
    }).then(({ unsubscribe }) => {
      $.mode.debug = true;
      event.mode("debug").on("debug", change);
      kill(async () => await unsubscribe());
    });
  }
  function entries() {
    if ($.errors.size === 0) return null;
    if (debug.first === true) {
      debug.error.forEach(([file, tui], number) => {
        const amount = `${a("of")} ${y(state.files.length)}`;
        const count = `${y(number + 1)} of ${y(debug.error.length)}`;
        tui.Update("uploads", `${y(state.completed)} ${amount}`).Update("errors", `${y(debug.error.length)} ${a("of")} ${y(state.errors.size)}`).Update("skipped", `${y(debug.skips.length)} ${a("of")} ${y(state.errors.size)} `).Update("count", `${y("ERROR")} ${count}`);
      });
      if (debug.error.length === 0) {
        stdin.errors.dispose();
      } else {
        stdin.errors.update(debug.error.map((tui) => tui[1]));
      }
    } else {
      $.errors.entries().forEach(([file, messages2], number) => {
        const tui = state.errors.get(file.key);
        const amount = `${a("of")} ${y(state.errors.size)}`;
        const count = `${y(number + 1)} of ${y(state.errors.size)}`;
        tui.Tree("info").Newline().Update("s", stdin.ansi.legend.s, a).Update("p", stdin.ansi.legend.p, a).Update("e", stdin.ansi.legend.e, a).Update("q", stdin.ansi.legend.q, a).Newline().Update("uploads", `${y(state.completed.length)} ${amount}`).Update("skipped", `${y(debug.skips.length)} of ${y(state.errors.size)}`).Update("errors", `${y(state.errors.size)} of ${y(state.errors.size)}`).Update("count", `${y("ERROR")} ${count}`).Pop(2).Each(messages2, (message) => tui.Insert(message).Break()).Tree("info").Newline().End(stdin.ansi.footer, false);
        debug.error.push([file, tui]);
      });
      debug.first = true;
      stdin.errors.listen(debug.error.map((tui) => tui[1]));
    }
  }
  function change(upsert) {
    const record = state.synced.get(upsert.target);
    for (const { filename } of upsert.synced) {
      const find = debug.error.find(([{ key }]) => key === filename);
      if (find) {
        $.errors.delete(find[0]);
        record.success += upsert.synced.length;
        entries();
      }
    }
  }
}
async function Push() {
  $.running = true;
  import_timer15.timer.start("upload");
  const write2 = pt().Newline().Spinner("0 Files").Template({ prefix: true, id: "version", color: y }).Template({ prefix: true, id: "elapsed", color: Y }).Template({ prefix: true, id: "uploads", color: Y }).Template({ prefix: true, id: "transfer", color: Y }).Template({ prefix: true, id: "errors", color: Y }).Template({ prefix: true, id: "warnings", color: Y }).Template({ prefix: true, id: "synced", color: Y });
  const files = await glob__default.default([`${$.dirs.output}/**`]);
  const state = setState(write2, files);
  event.mode("push").on("push", onUpsert(state));
  await setBatchUpserts(state);
  await Complete(state);
}

// syncify/options/define/project.ts
var import_write_file_atomic3 = __toESM(require_lib());
async function createProject(path5) {
  $.file.project = path5;
  await (0, import_write_file_atomic3.default)($.file.project, JSON.stringify($.project));
}
function updateProject() {
  q2.cache.add(async () => {
    if ($.file.project !== null) {
      await (0, import_write_file_atomic3.default)($.file.project, JSON.stringify($.project));
    }
  });
}
function projectProxy(model) {
  return new Proxy(model, {
    set: (target, prop, value) => {
      if (has(prop, target)) {
        const current = target[prop];
        if (current !== value) {
          target[prop] = value;
          updateProject();
        }
      }
      return true;
    }
  });
}
function project() {
  runtime.startup();
  const dir = $.cwd;
  const name = path2.basename(dir);
  const date = Date.now();
  if (fsExtra.existsSync($.root)) {
    $.file.project = path2.join($.root, name);
    $.project = projectProxy(fsExtra.readJSONSync($.file.project));
    $.project.lastRunAt = date;
    $.mode.prune = $.mode.prune === false && $.project.expires > date;
  } else {
    $.project = projectProxy({
      name,
      dir,
      syncifyVersion: "1.0.0-alpha.1",
      hotVersion: "0.4.9",
      configVersion: null,
      themeVersion: null,
      targetSource: null,
      textEditor: null,
      gitRemote: null,
      expires: getFuture(3),
      credentials: null,
      createdAt: date,
      lastRunAt: date,
      lastVersionCheck: date
    });
    getGitAddress();
  }
}
function getGitAddress() {
  if (!$.project.gitRemote) {
    try {
      $.project.gitRemote = child_process.execSync("git config --get remote.origin.url").toString().trim();
    } catch {
      return false;
    }
  }
}

// syncify/options/define/caches.ts
function caches({ create = false } = {}) {
  const generate = () => {
    forEach(fsExtra.ensureDirSync, [
      $.root,
      $.dirs.cache,
      $.dirs.hot,
      $.dirs.temp,
      $.dirs.sourcemaps.root,
      $.dirs.sourcemaps.scripts,
      $.dirs.sourcemaps.styles
    ]);
    if ($.file.project === null) {
      $.file.project = path2.join($.root, $.project.name);
      updateProject();
    }
  };
  if (create) generate();
}
async function createCaches(hash) {
  if (!fsExtra.pathExistsSync($.home)) fsExtra.mkdirSync($.home);
  if (hash) $.hash = hash;
  $.root = path2.join($.home, $.hash);
  $.dirs.cache = path2.join($.root, "cache");
  $.dirs.temp = path2.join($.root, "temp");
  $.dirs.hot = path2.join($.root, "hot");
  $.dirs.sourcemaps.root = path2.join($.root, "sourcemaps");
  $.dirs.sourcemaps.scripts = path2.join($.dirs.sourcemaps.root, "scripts");
  $.dirs.sourcemaps.styles = path2.join($.dirs.sourcemaps.root, "styles");
  for (const path5 of [
    $.root,
    $.dirs.cache,
    $.dirs.temp,
    $.dirs.sourcemaps.root,
    $.dirs.sourcemaps.scripts,
    $.dirs.sourcemaps.styles,
    $.dirs.hot
  ]) {
    await fsExtra.ensureDir(path5, { mode: READ_WRITE_OWNER });
  }
  for (const file of CACHE_FILES) {
    const path5 = path2.join($.dirs.cache, file);
    const alive = await fsExtra.pathExists(path5);
    if (alive !== true) {
      await save(path5, {})();
    }
  }
}
async function getCaches() {
  if ($.mode.init === false && $.file.project === null) {
    if ($.project.credentials !== null) {
      caches({ create: true });
    } else {
      unknownProject();
      return;
    }
  }
  $.cache.uri = o();
  for (const file of CACHE_FILES) {
    $.cache.uri[file] = path2.join($.dirs.cache, file);
    if (await fsExtra.pathExists($.cache.uri[file])) {
      q2.cache.add(async () => {
        $.cache[file] = await decode($.cache.uri[file]);
      });
    } else {
      $.cache[file] = {};
      q2.cache.add(save($.cache.uri[file], $.cache[file]));
    }
  }
  if ($.mode.prune) {
    q2.cache.onIdle().then(() => clearCache());
  }
}
async function getTSConfig() {
  for (const file of JS_TS_CONFIGS) {
    const uri = path2.join($.cwd, file);
    if (await fsExtra.pathExists(uri)) {
      $.file.tsconfig = uri;
      break;
    }
  }
  if ($.file.tsconfig === null && $.cwd !== $.dirs.config) {
    for (const file of JS_TS_CONFIGS) {
      const uri = path2.join($.dirs.config, file);
      if (await fsExtra.pathExists(uri)) {
        $.file.tsconfig = uri;
        break;
      }
    }
  }
  if ($.file.tsconfig === null) return void 0;
  try {
    const file = await fsExtra.readFile($.file.tsconfig, "utf8");
    const config = json.parse(file);
    return config;
  } catch (e2) {
    throw error.json(e2, $.file.tsconfig);
  }
}
async function getConfigFile() {
  for (const file of SYNCIFY_CONFIG) {
    const path5 = path2.join($.cwd, file);
    if (await fsExtra.pathExists(path5)) {
      $.file.config = path5;
      break;
    }
  }
  if ($.file.config === null) {
    if ($.pkg !== null) {
      if (hasPath("syncify.config", $.pkg) && !isEmpty($.pkg.syncify.config)) {
        $.file.config = $.file.pkg;
        return $.pkg.syncify.config;
      }
    }
    return null;
  }
  if (path2.extname($.file.config) === ".json") {
    try {
      const json$1 = await fsExtra.readFile($.file.config, "utf8");
      return json.parse(json$1);
    } catch (e2) {
      throw error.json(e2, $.file.config);
    }
  } else {
    const tsconfig = await getTSConfig();
    try {
      const config = await acquire.acquire({
        named: "syncify",
        file: $.file.config,
        cwd: $.cwd,
        tsconfig,
        type: has("type", $.pkg) ? $.pkg.type : "commonjs",
        onRebuild: $.mode.watch ? (bundle) => {
          $.config = bundle;
          $.running && event.emit("restart", Configure);
        } : void 0,
        onError: (errors) => {
          const file = parseSyncifyConfig($.file.config);
          pt({ type: "error" }).Append("ERROR IN SYNCIFY CONFIG", y).Wrap(`The ${P.bold(file.base)} file could not be processed.`).toLog({ clear: true });
          error.esbuild(file, errors);
        }
      });
      kill(async () => await acquire.acquire.dispose("syncify"));
      return config;
    } catch (e2) {
      error.generic(e2);
    }
  }
}
async function getConfig() {
  if ($.running) return;
  const settings = await getConfigFile();
  if (settings !== null) $.config = settings;
}
async function setThemeDirs(basePath2) {
  if (!basePath2) basePath2 = $.dirs.output;
  if (await fsExtra.pathExists(basePath2)) {
    if ($.mode.clean) {
      try {
        await fsExtra.emptyDir(basePath2);
      } catch (e2) {
        throw new Error(e2);
      }
    }
  } else {
    try {
      await fsExtra.mkdir(basePath2);
    } catch (e2) {
      throw new Error(e2);
    }
  }
  for (const dir of THEME_DIRS) {
    const uri = path2.join(basePath2, dir);
    const name = dir.startsWith("templates/") ? dir.slice(10) : dir;
    if (!await fsExtra.pathExists(uri)) {
      try {
        await fsExtra.mkdir(uri);
        $.stats[name] = 0;
      } catch (e2) {
        throw new Error(e2);
      }
    } else {
      $.stats[name] = fsExtra.readdirSync(uri).length;
    }
  }
}
async function setBaseDirs() {
  if ($.running) return;
  const base = basePath($.cwd);
  for (const [key, dir] of BASE_DIRS) {
    if (has(key, $.cmd) && $.cmd[key] === dir && $.config[key] === dir) {
      $.dirs[key] = base($.cmd[key]);
      continue;
    }
    const path5 = has(key, $.cmd) && isString($.cmd[key]) ? $.cmd[key] : $.config[key];
    if (isString(path5)) {
      $.dirs[key] = base(path5);
    } else {
      typeError({
        option: "config",
        name: key,
        provided: path5,
        expects: "string"
      });
    }
  }
}
async function setImportDirs() {
  return;
}

// syncify/options/define/env.ts
var import_dotenv = __toESM(require_main());
async function getEnv(cwd2 = $.cwd) {
  const path5 = path2.join(cwd2, ".env");
  if (await fsExtra.pathExists(path5)) {
    $.file.env = path5;
    $.project.credentials = "env";
  } else {
    if ($.file.project !== null) {
      const kc = path2.join($.root, ".env");
      if (await fsExtra.pathExists(kc)) {
        $.file.env = kc;
        $.project.credentials = "kc";
      }
    }
  }
  if ($.file.env !== null) {
    const env2 = import_dotenv.default.config({ path: $.file.env });
    if (env2.error) {
      error.throw(env2.error, { path: $.file.env });
    }
    defineProperty($.env, "vars", { get() {
      return env2.parsed;
    } });
    if ($.project.credentials === "env") {
      if (isEmpty($.env.vars)) {
        invalidCredentials();
      } else {
        setStoreClient($.env.vars);
      }
    }
  } else {
    if (!$.mode.create && !$.mode.init && !$.mode.keychain) {
      if ($.file.project !== null) missingEnv();
    } else {
      if (await fsExtra.pathExists($.file.keychain)) {
        await getKeychain();
      } else {
        throwError([
          "Syncify is missing core reference files. Please report this issue on the",
          `github repo, ${si("https://github.com/panoply/syncify/issues")}). This`,
          `error may be due to a corrupted installation which prevented ${li("postinstall")}`,
          "hooks from firing."
        ], [
          "Programmatic generation of core references may resolve this issue. Use the",
          `${si("sy doctor")} command and syncify will try and fix the problem.`,
          "If the error persists, please ensure read/write access permissions allow",
          `for directory and file generation within ${si($.home)} location.`
        ]);
      }
    }
  }
}
async function getKeychain() {
  $.keychain = await fsExtra.readJson($.file.keychain);
  if (!isEmpty($.keychain)) {
    if ($.project !== null) ;
  }
}
function setStoreClient(vars) {
  const getStorefrontPassword = (domain) => {
    const lowercase = `${domain}_password`;
    const uppercase = lowercase.toUpperCase();
    return lowercase in vars ? vars[lowercase] : uppercase in vars ? vars[uppercase] : null;
  };
  for (const prop in vars) {
    const p = prop.toLowerCase().trimEnd();
    const m2 = p.search(/_a(?:pi|ccess)_token$/m);
    if (m2 > -1) {
      const name = p.slice(0, m2);
      const password = getStorefrontPassword(name);
      const token = getAxiosConfig(vars, name);
      $.stores.push({
        name,
        token,
        password,
        domain: `${name}.myshopify.com`,
        themes: null
      });
    }
  }
  if (isEmpty($.stores)) invalidCredentials();
}
function getAxiosConfig(vars, name) {
  let api_token = name + "_api_token";
  if (!has(api_token, vars)) {
    api_token = api_token.toUpperCase();
    if (!has(api_token, vars)) {
      api_token = name + "_access_token";
      if (!has(api_token, vars)) {
        api_token = api_token.toUpperCase();
      }
    }
  }
  if (has(api_token, vars)) {
    const token = vars[api_token];
    http(name, token);
    return token;
  } else {
    throwError(
      `Invalid or missing ${si(name + ".myshopify.com")} credentials`,
      [
        `Your shop credentials in the ${si.bold(".env")} file could`,
        "not be read correctly or are missing. Please check your environment file and ensure",
        "you have provided valid authorization, or if you are using the Keychain, please check",
        "credential association has been applied.\n\n",
        `Run the ${si("sy doctor")} command for additional support.`
      ]
    );
  }
}
function throwCommandError(type2, cmd2) {
  const pattern = [];
  const ref = o();
  if ($.mode.push) {
    ref.base = "output";
    ref.from = "output";
    ref.dirs = THEME_DIRS.map((dir) => `${ze("-")} ${li(dir)}`);
    ref.fix = [
      `The ${li("--filter")} (or ${li("-F")}) flag command argument expects that you`,
      "provide a theme output directory as the starting point. Filters begin with",
      "the Shopify (theme) output directory name, for example:",
      "",
      `${ze("$")} ${ze(`sy -F ${li("sections/file.liquid")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("snippets/*")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("templates/*.json")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${y(ref.base)} directory`,
      "based on the starting point directory name. You can pass glob star matches following the",
      `directory namespace or starting point ignores (${li("!")}) as long the directory can match.`
    ];
  } else {
    ref.base = "input";
    ref.from = "paths";
    ref.dirs = PATH_KEYS.map((dir) => `${ze("-")} ${li(dir)}`);
    ref.fix = [
      `The ${li("--filter")} (or ${li("-F")}) flag command argument expects you`,
      `provide a ${x.bold("paths")} key name as the starting point. Filtering begins with`,
      "a Shopify output directory name, for example:",
      "",
      `${ze("$")} ${ze(`sy -F ${li("sections/file.liquid")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("snippets/*")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("templates/*.json")}`)}`,
      `${ze("$")} ${ze(`sy -F ${li("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${y(ref.base)} directory`,
      `based on the starting point ${y("paths")} name. You can pass glob star matches following the`,
      `starting point or ignores (${li("!")}) as long the reference can match.`
    ];
  }
  if (type2 === "pattern") {
    pattern.push(`Invalid ${li("--filter")} pattern provided. You cannot pass starting point`);
    if (cmd2[0] === "*") {
      pattern.push(`glob (${li("*")}) stars as filters, Syncify does not support this.`);
    } else if (cmd2[0] === "/") {
      pattern.push(`path (${li("/")}) roots as filters, Syncify does not support this.`);
    } else if (cmd2[0] === ".") {
      pattern.push(`dot paths (${li(".")}) as filters, Syncify does not support this.`);
    }
    pattern.push(
      `Use a starting point reference name based on the ${li(ref.from)} key property`,
      `in your ${li(path2.basename($.file.config))} file.`
    );
  } else {
    pattern.push(
      `Invalid directory provided. The ${li("--filter")} pattern expects the starting point`,
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
  const path5 = input.slice(0, input.indexOf("/"));
  if (!isArray($.filters[path5])) $.filters[path5] = [];
  $.filters[path5].push(path2.join(base, input));
}
function setFilters() {
  if ($.cmd.filter.length === 0) return;
  for (const cmd2 of $.cmd.filter) {
    const base = $.mode.push ? $.dirs.output : $.dirs.input;
    const filter = cmd2.replace(/\s+/g, " ").trim();
    const regexp = $.mode.push ? new RegExp(`^(${THEME_DIRS.join("|")})`) : new RegExp(`^(${PATH_KEYS.join("|")})`);
    if (filter.indexOf(",") > -1) {
      const multiple = filter.split(",").filter(Boolean).map((entry) => entry.trim());
      for (const input of multiple) {
        parseFilter(base, input, regexp);
      }
    } else {
      parseFilter(base, filter, regexp);
    }
  }
}

// syncify/options/define/paths.ts
var import_anymatch3 = __toESM(require_anymatch());
async function setPaths() {
  const path5 = normalPath($.dirs.input);
  const warn2 = warnOption("paths");
  const setStash = (key, files, stash = null) => {
    if (key === "schema" || key === "metafields" || key === "redirects") return;
    if (stash !== null) {
      const isNum = isNumber(stash.stash);
      const index = "index" in stash ? stash.index : isNum ? stash.stash : 0;
      const val = isNum ? "*" : stash.stash === true ? "stash" : stash.stash;
      const uri = files[index];
      if (uri[0] === "!") {
        throwError([
          "custom stash uri is referencing an ignored glob pattern"
        ], [
          "Change the stash value to a path which is not an ignore"
        ]);
      }
      if (val === "*") {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, "");
      } else if (val === "stash") {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, "/stash");
      } else {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, "/" + val.replace(/^\//, ""));
      }
    } else {
      const value = files.find((p) => p[0] !== "!");
      $.stash[key] = value ? value.replace(/\/\*{1,2}.*$/, "") : path2.join($.cwd, "stash");
    }
  };
  const getGlobs2 = (key, files, fallback) => {
    if (isNil(files)) {
      const fb = [path5(fallback)];
      setStash(key, fb);
      return fb;
    } else if (isString(files)) {
      const str = [path5(files)];
      setStash(key, str);
      return str;
    } else if (isArray(files)) {
      if (isObject(files[files.length - 1])) {
        const stashed = files.pop();
        const resolve3 = files.map(path5);
        setStash(key, resolve3, stashed);
        return resolve3;
      }
      const resolve2 = files.map(path5);
      setStash(key, resolve2);
      return resolve2;
    }
    typeError({
      option: "paths",
      expects: "string | string[]",
      provided: files,
      name: key
    });
  };
  const renameGlobs = (key, fallback) => {
    const files = $.config.paths[key];
    if (isObject(files)) {
      if (isEmpty(files)) {
        warn2(`Undefined path/s on "${key}", using fallback`, "{}");
        return [path5(fallback)];
      }
      if ("*" in files && "[name]" in files) {
        warn2("Multiple fallback rename keys, paths will be merged", '"*" and "[name]"');
        if (isArray(files["*"])) {
          if (isObject(files["*"][files["*"].length - 1])) {
            const stashed = files["*"].pop();
            const resolve2 = files["*"].map(path5);
            setStash(key, resolve2, stashed);
          }
          if (isArray(files["[name]"])) {
            files["*"] = files["*"].concat(files["[name]"]);
          } else if (isString(files["[name]"])) {
            files["*"].push(files["[name]"]);
          }
          delete files["[name]"];
        } else if (isArray(files["[name]"])) {
          if (isObject(files["[name]"][files["[name]"].length - 1])) {
            const stashed = files["[name]"].pop();
            const resolve2 = files["[name]"].map(path5);
            setStash(key, resolve2, stashed);
          }
          if (isArray(files["*"])) {
            files["[name]"] = files["[name]"].concat(files["*"]);
          } else if (isString(files["*"])) {
            files["[name]"].push(files["*"]);
          }
          delete files["*"];
        }
      }
      const global = m();
      const rename = m();
      let stash = [];
      for (const pattern in files) {
        if (isArray(files[pattern])) {
          if ($.stash[key] === null) {
            if (isObject(files[pattern][files[pattern].length - 1])) {
              const stashed = files[pattern].pop();
              const resolve2 = files[pattern].map(path5);
              setStash(key, resolve2, stashed);
            } else {
              stash = stash.concat(files[pattern].map(path5));
            }
          }
          if (pattern === "*" || pattern === "[name]") {
            global.set(pattern, s(files[pattern].map(path5)));
          } else {
            rename.set(pattern, s(files[pattern].map(path5)));
          }
        } else if (isString(files[pattern])) {
          if ($.stash[key] === null) {
            stash.push(path5(files[pattern]));
          }
          pattern === "*" || pattern === "[name]" ? global.has(pattern) ? global.get(pattern).add(path5(files[pattern])) : global.set(pattern, s([path5(files[pattern])])) : rename.has(pattern) ? rename.get(pattern).add(path5(files[pattern])) : rename.set(pattern, s([path5(files[pattern])]));
        } else if (isNil(files[pattern])) {
          typeError({
            option: `paths ${K} ${key}`,
            expects: "string | string[]",
            provided: files[pattern],
            name: pattern
          });
        }
      }
      if ($.stash[key] === null) {
        setStash(key, stash);
      }
      const globals = toArray(global.values()).flatMap((globs) => toArray(globs));
      const entries = globals;
      for (const [pattern, paths2] of rename) {
        const spread = toArray(paths2);
        const match = (0, import_anymatch3.default)(spread);
        if (match(globals)) {
          const value = [];
          if (isArray(files[pattern])) {
            for (const p of files[pattern]) value.push(`${vt} ${y(p)}`);
          } else {
            value.push(`${vt} ${y(files[pattern])}`);
          }
          throwError([
            "Mixed global and rename path patterns defined which will result in resolution collisions.",
            `The paths provided to ${P(key)} ${K} ${P(pattern)} overlap with the globals.`,
            "\n\n",
            `${value.join("\n")}`
          ], [
            `Provide a verbose pattern on the ${P.bold("*")} global, which resolve to directory level.`,
            `Both global and rename paths accept ${ze("string[]")} types, so this error can`,
            "be easily fixed."
          ]);
        } else {
          $.paths[key].rename.push([
            match,
            pattern
          ]);
        }
        entries.push(...spread);
      }
      const ignores = s(entries.filter((p) => p.startsWith("!")).map((p) => p.slice(1)));
      const find = s(entries);
      entries.forEach((p, i) => {
        if (ignores.has(p)) {
          find.delete(`!${p}`);
        }
      });
      return [...find];
    } else {
      return getGlobs2(key, files, fallback);
    }
  };
  for (const key of PATH_KEYS) {
    let paths2 = [];
    if (key === "snippets" || key === "sections") {
      paths2 = renameGlobs(key, `${key}/*`);
    } else if (key === "customers" || key === "metaobject") {
      paths2 = getGlobs2(key, $.config.paths[key], `templates/${key}/*`);
    } else {
      paths2 = getGlobs2(key, $.config.paths[key], `${key}/*`);
    }
    $.paths[key].match = (0, import_anymatch3.default)(paths2);
    const globs = await glob__default.default.async(paths2, { cwd: $.cwd });
    if (key !== "metafields" && key !== "redirects") {
      if ($.paths[key].input === null) {
        $.paths[key].input = s(globs);
      } else {
        for (let i = 0, s2 = globs.length; i < s2; i++) {
          $.paths[key].input.add(globs[i]);
        }
      }
    }
  }
  q2.cache.add(() => {
    for (const prop of THEME_KEYS) {
      for (const uri of $.paths[prop].input) {
        const file = parse2(uri);
        if (file) {
          setPathCache(file.input, file.output);
        }
      }
    }
  });
}
async function setSectionOptions() {
  if ($.paths.schema.input !== null && $.paths.schema.input.size > 0 && $.running === false) {
    await setSharedSchema();
    await setSchemaJson();
    defineProperty($.section, "schema", { get() {
      return $.cache.schema;
    } });
  }
}
async function setSharedSchema() {
  for (const uri of $.paths.schema.input) {
    const ext = path2.extname(uri);
    const key = path2.basename(uri, ext);
    if ($.section.shared.has(key)) {
      throwError(`Duplicated shared schema file name ${y.yellow(key + ext)} detected.`, [
        "Shared Schema JSON file names must be unique across the workspace.",
        "Update the file name and try again."
      ]);
    }
    try {
      const data = await fsExtra.readFile(uri, "utf8");
      if (data.trim().length === 0) continue;
      const schema2 = json.parse(data);
      if (has("$schema", schema2)) delete schema2.$schema;
      if (has("$description", schema2)) delete schema2.$description;
      for (const prop in schema2) {
        if (isObject(schema2[prop])) {
          if (has("$description", schema2[prop])) {
            delete schema2[prop].$description;
          }
        } else if (isArray(schema2[prop])) {
          for (const setting of schema2[prop]) {
            if (has("$description", setting)) delete setting.$description;
          }
        }
      }
      $.cache.schema[uri] = s();
      $.section.shared.set(key, { uri, schema: schema2 });
    } catch (e2) {
      if (e2 instanceof json.JSONError) {
        log.error(path2.relative($.cwd, uri), {
          notify: {
            title: "JSON Error (setSharedSchema)",
            message: `Error when parsing ${path2.basename(uri)}`
          }
        });
        error.json(e2, {
          relative: path2.relative($.cwd, uri),
          base: path2.basename(uri)
        });
      } else {
        error.throw(e2, {
          relative: path2.relative($.cwd, uri),
          base: path2.basename(uri)
        });
      }
      return null;
    }
  }
}
async function setSchemaJson() {
  const { shared } = $.section;
  const warn2 = warnOption("Section Schema");
  for (const file of $.paths.sections.input) {
    const read = await fsExtra.readFile(file, "utf8");
    const hash = checksum(read);
    if (has(file, $.cache.schema) && $.cache.checksum[file] === hash) continue;
    $.cache.checksum[file] = hash;
    const data = read.toString();
    const open = data.search(/{%-?\s*schema/);
    if (open < 0) continue;
    const begin = data.indexOf("%}", open + 2) + 2;
    const start = data.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);
    if (ender < 0) {
      warn2("Liquid Parse Error", path2.relative($.cwd, file));
      continue;
    }
    try {
      const schema2 = json.parse(data.slice(begin, ender));
      const schemaProp = hasProp(schema2);
      if (schemaProp("settings")) {
        for (const setting of schema2.settings) {
          if (has("$ref", setting)) {
            const fname = setting.$ref.split(".")[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }
        }
      }
      if (schemaProp("blocks")) {
        for (const block of schema2.blocks) {
          const blockProp = hasProp(block);
          if (blockProp("$ref")) {
            const fname = block.$ref.split(".")[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }
          if (blockProp("settings")) {
            for (const setting of block.settings) {
              if (has("$ref", setting)) {
                const fname = setting.$ref.split(".")[0];
                if (shared.has(fname)) {
                  $.cache.schema[shared.get(fname).uri].add(file);
                }
              }
            }
          }
        }
      }
    } catch (e2) {
      if (has(file, $.cache.sections)) {
        delete $.cache.sections[file];
      }
      warn2("JSON Parse Error", path2.relative($.cwd, file));
    }
  }
}

// syncify/prompts/targets.ts
function JsonTemplate(store) {
  let template = g.nl(
    `${a(`package.json ${Ri} syncify ${Ri} stores`)}
`,
    "{",
    `  "${ze("stores")}": {`,
    `    "${ze(store.toLowerCase())}": {
`
  );
  return {
    insert: (theme2) => {
      template += `      "\${${theme2.name}}": ${ze(theme2.id)},${"\n"}`;
    },
    output: () => template.replace(/,\n$/, "\n") + g.nl("    }", "  }", "}"),
    string: (input) => {
      const trim = input.trim();
      return trim.slice(trim.indexOf("{")).trim();
    },
    parse: (input) => {
      const trim = input.trim();
      const slice = trim.slice(trim.indexOf("{"));
      return JSON.parse(slice);
    }
  };
}
function TomlTemplate(store) {
  let template = g.nl(
    `${a("theme.toml")}
`,
    `[${store.toLowerCase()}]
`
  );
  return {
    insert: (theme2) => {
      template += `  \${${theme2.name}} = ${ze(theme2.id)}${"\n"}`;
    },
    output: () => template,
    string: (input) => input.trim().replace("theme.toml", "").trim(),
    parse: (input) => $import.toml.parse(input)
  };
}
function YamlTemplate(store) {
  let template = g.nl(
    `${a("theme.yaml")}
`,
    `${store.toLowerCase()}:
`
  );
  return {
    insert: (theme2) => {
      template += `  \${${theme2.name}}: ${ze(theme2.id)}${"\n"}`;
    },
    output: () => template,
    string: (input) => input.trim().replace("theme.yaml", "").trim(),
    parse: (input) => $import.yaml.load(input.trim().replace("theme.yaml", ""))
  };
}
async function PromptTargetFileTemplate({
  store,
  method,
  targets
}) {
  const template = method === "package.json" ? JsonTemplate(store.name) : method === "store.toml" ? TomlTemplate(store.name) : YamlTemplate(store.name);
  const fields = [];
  for (const theme2 of targets) {
    template.insert(theme2);
    fields.push({
      name: theme2.name,
      message: theme2.name,
      validate(value, state, field) {
        this.state.symbols.pointer = "";
        if (field && field.name === theme2.name) {
          if (/[A-Z]/.test(value)) {
            return Ee.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return Ee.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return Ee.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return Ee.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = Bi;
  theme.styles.typing = Q;
  const snippet3 = await enquirer.prompt({
    theme,
    fields,
    render,
    name: "stores",
    type: "snippet",
    required: targets.map(({ name }) => name),
    message: "Theme Targets",
    newline: l.next + l.next,
    template: template.output(),
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return Q(`${this.state.completed}% completed`);
        }
      }
      return `${K}  ${a(`${this.state.completed}% completed`)}`;
    }
  }).catch(cancel);
  const { result } = snippet3.stores;
  const string = template.string(result);
  const parsed = template.parse(string);
  return {
    string,
    parsed
  };
}
async function PromptSelectThemes(method) {
  const stores = keys($.target);
  if (stores.length > 1) {
    for (const name of stores) {
      await PromptEachStore($.target.get(name));
    }
  } else {
    const targets = await PromptEachStore($.targets[stores[0]]);
    return PromptTargetFileTemplate({
      method,
      store: $.targets[stores[0]],
      targets
    });
  }
  async function PromptEachStore(store) {
    log.spinner("fetching themes", {
      color: a,
      style: "brielle"
    });
    const items = await list(store);
    const themes = items.filter(({ role }) => role !== "demo").sort((a2, b) => a2.role === "main" ? -1 : b.role === "main" ? 1 : 0);
    const space = eqWS(themes, { prop: "name" });
    log.spinner.stop();
    const dispose = intercept();
    const resolve2 = await enquirer.prompt({
      theme,
      name: "targets",
      type: "select",
      multiple: true,
      required: true,
      message: "Select Themes",
      hint: "Press spacebar to select",
      choices: themes.map(
        (value) => ({
          name: value.name,
          message: value.name,
          hint: `${space(value.name)} ${Be} ${a(value.role)}`,
          value
        })
      ),
      validate(value) {
        this.state.symbols.pointer = l.red;
        if (value.length === 0) return "Error: You must select at least 1 theme";
        return true;
      },
      result(names) {
        return values(this.map(names));
      },
      format(value) {
        if (isArray(value) && value.length > 0) {
          return Q(`${value.join(Y(", "))}`);
        }
      }
    }).catch(cancel);
    dispose();
    return resolve2.targets;
  }
}
async function PromptStorage(message) {
  !message || log(pt({ type: "warning" }).Wrap(message, P.bold).toLine());
  const resolve2 = await enquirer.prompt({
    theme,
    message: "Target Storage",
    name: "storage",
    type: "select",
    choices: [
      { name: "package.json" },
      { name: "theme.toml" },
      { name: "theme.yaml" }
    ]
  }).catch(cancel);
  return resolve2.storage;
}
async function PromptThemeTargets(message) {
  !message || log(pt({ type: "warning" }).Wrap(message, P.bold).toLine());
  const resolve2 = await enquirer.prompt({
    theme,
    message: "Theme Targets",
    name: "theme",
    type: "select",
    required: true,
    choices: [
      {
        name: "select",
        message: "Select Theme",
        hint: "  Links an existing theme/s from the store"
      },
      {
        name: "create",
        message: "Create Theme",
        hint: "  Creates a new unpublished theme in the store"
      }
    ]
  }).catch(cancel);
  return resolve2.theme;
}
async function parseToml(uri) {
  const toml = await $import("smol-toml");
  const file = await fsExtra.readFile(uri, "utf-8");
  return toml.parse(file);
}
async function parseYaml(uri) {
  const file = await fsExtra.readFile(uri, "utf-8");
  const yaml = await $import("js-yaml");
  return yaml.load(file);
}

// syncify/options/define/store.ts
async function getTargetFile() {
  let type2 = -1 /* NONE */;
  for (let i = 0, s2 = TARGET_FILES.length; i < s2; i++) {
    const path5 = path2.join($.cwd, TARGET_FILES[i]);
    if (await fsExtra.pathExists(path5)) {
      type2 = i;
      $.file.targets = path5;
      return type2;
    }
  }
  return -1 /* NONE */;
}
async function getStoresFromFile() {
  const file = await getTargetFile();
  if (file === 0 /* TOML */) {
    try {
      const targets = await parseToml($.file.targets);
      return targets;
    } catch (err) {
      error.toml($.file.targets, err);
    }
  } else if (file === 1 /* YAML */ || file === 2 /* YML */) {
    try {
      const targets = await parseYaml($.file.targets);
      return targets;
    } catch (err) {
      error.throw(err, { file: $.file.targets });
    }
  } else {
    return null;
  }
}
async function getTargets() {
  let action = 0 /* NOTHING */;
  let method;
  let target;
  if ($.pkg !== null) {
    if (hasPath("syncify.stores", $.pkg)) {
      if (isObject($.pkg.syncify.stores)) {
        method = "package.json";
        if (isEmpty($.pkg.syncify.stores)) {
          action = 4 /* PROMPT_THEMES */;
          method = "package.json";
        } else {
          target = $.pkg.syncify.stores;
        }
      } else {
        throwError([
          `Invalid store/theme target references defined in ${y("package.json")} file`
        ], [
          `Syncify expects and ${si("object")} type structure`
        ]);
      }
    } else if (has("syncify", $.pkg)) {
      action = 1 /* PKG_KEY */;
      method = "package.json";
    } else {
      action = 2 /* CHECK_FILES */;
    }
  } else {
    action = 2 /* CHECK_FILES */;
  }
  if (action === 2 /* CHECK_FILES */ || action === 1 /* PKG_KEY */) {
    const targets = await getStoresFromFile();
    if (targets !== null) {
      method = $.file.targets.endsWith("toml") ? "theme.toml" : "theme.yaml";
      if (isEmpty(targets)) {
        action = 4 /* PROMPT_THEMES */;
      } else {
        action = 0 /* NOTHING */;
        target = targets;
      }
    } else if (action === 2 /* CHECK_FILES */) {
      action = 3 /* PROMPT */;
    }
  }
  if (action === 1 /* PKG_KEY */) action = 4 /* PROMPT_THEMES */;
  let banner = false;
  if (action === 3 /* PROMPT */) {
    banner = true;
    action = 4 /* PROMPT_THEMES */;
    method = await PromptStorage([
      "You have not provided store and theme targets. Syncify requires a hard-reference",
      "to be defined in your projects root directory. Please select a storage method to use",
      "and follow the prompts" + R
    ]);
  }
  if (action === 4 /* PROMPT_THEMES */) {
    const message = banner ? void 0 : [
      "You have not provided theme target references which are required by Syncify.",
      "You can choose to associate existing theme/s from your store or create and publish",
      "a new theme based on the current project" + R
    ];
    const run = await PromptThemeTargets(message);
    if (run === "select") {
      const { string, parsed } = await PromptSelectThemes(method);
      if (method !== "package.json") {
        target = parsed;
        await fsExtra.writeFile($.file.targets, string);
      } else {
        $.pkg = await setPkg({ syncify: parsed });
        target = $.pkg.syncify.stores;
      }
    }
  }
  const warn2 = warnSevere("targets");
  $.target.raw = target;
  for (const name in target) {
    if ($.stores.has(name)) {
      $.stores.set(name, {
        get themes() {
          return $.target.raw[name];
        }
      });
    } else {
      warn2("missing target credentials", name);
      $.stores.push({
        name,
        domain: `${name}.myshopify.com`,
        password: null,
        token: null,
        get themes() {
          return $.target.raw[name];
        }
      });
    }
  }
  if ($.cmd.target.length === 0) {
    const store = $.stores.default;
    for (const target2 in store.themes) {
      const id = store.themes[target2];
      $.target.push(
        {
          target: target2,
          id,
          role: "unknown",
          uid: murmur(store.name, id),
          get store() {
            return $.stores.get(store.name);
          },
          get gid() {
            return `gid://shopify/OnlineStoreTheme/${this.id}`;
          },
          get preview() {
            return `https://${this.store.domain}?preview_theme_id=${this.id}`;
          },
          get editor() {
            return `https://${this.store.domain}/admin/themes/${this.id}/editor`;
          }
        }
      );
      break;
    }
  }
}
function syncTheme(storeName, themeTarget, themeId) {
  return {
    target: themeTarget,
    id: themeId,
    role: "unknown",
    uid: murmur(storeName, themeId),
    get gid() {
      return `gid://shopify/OnlineStoreTheme/${this.id}`;
    },
    get store() {
      return $.stores.get(storeName);
    },
    get preview() {
      return `https://${this.store.domain}?preview_theme_id=${this.id}`;
    },
    get editor() {
      return `https://${this.store.domain}/admin/themes/${this.id}/editor`;
    }
  };
}
async function setTargets() {
  if ($.target.length === 1 || $.cmd.target.length === 0) {
    runtime.stores();
    return;
  }
  const duplicate = s();
  const ambiguous = s();
  for (const cmd2 of $.cmd.target) {
    const col = cmd2.indexOf(":");
    if (col > -1) {
      const storeName = cmd2.slice(0, col).trim();
      const themes = cmd2.slice(col + 1).split(",");
      if (storeName === "") {
        let exists2 = false;
        for (const themeTarget of themes) {
          duplicate.clear();
          for (const store of $.stores) {
            if (has(themeTarget, store.themes)) {
              exists2 = true;
              const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);
              if (duplicate.has(target.id)) {
                duplicateThemeTarget(target.id, store.name);
              } else {
                $.target.push(target);
                duplicate.add(target.id);
              }
            }
          }
        }
        if (!exists2) {
          invalidTarget({ type: "theme", provided: themes.join(",") });
        }
      } else {
        if (!$.stores.has(storeName)) {
          invalidTarget({ type: "store", provided: storeName });
        }
        const store = $.stores.get(storeName);
        for (const themeTarget of themes) {
          if (has(themeTarget, store.themes)) {
            const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);
            if (duplicate.has(target.id)) {
              duplicateThemeTarget(target.id, store.name);
            } else {
              $.target.push(target);
              duplicate.add(target.id);
            }
          } else {
            invalidTarget({
              type: "theme",
              provided: themeTarget,
              storeName
            });
          }
        }
      }
    } else {
      const targets = cmd2.split(",");
      for (const value of targets) {
        if ($.stores.has(value)) {
          for (const theme2 in $.stores.get(value).themes) {
            const target = syncTheme(value, theme2, $.stores.get(value).themes[theme2]);
            if (duplicate.has(target.id)) {
              duplicateThemeTarget(target.id, target.store.name);
            } else {
              $.target.push(target);
              duplicate.add(target.id);
            }
          }
        } else {
          let exists2 = false;
          for (const store of $.stores) {
            if (has(value, store.themes)) {
              const target = syncTheme(store.name, value, store.themes[value]);
              if (duplicate.has(target.id)) {
                duplicateThemeTarget(target.id, store.name);
              } else {
                if (ambiguous.has(value)) {
                  ambiguousThemeTarget(value);
                } else {
                  $.target.push(syncTheme(store.name, value, store.themes[value]));
                  ambiguous.add(value);
                  duplicate.add(target.id);
                  exists2 = true;
                }
              }
            }
          }
          if (!exists2) {
            invalidTarget({ type: "theme", provided: value });
          }
        }
      }
    }
  }
  runtime.stores();
}
function ambiguousThemeTarget(target) {
  const expected = $.stores.filter(({ themes }) => target in themes).map(({ name }) => `${name}${R}${target}`).join(" ");
  const alias = A.dash($.argv.some((value) => value === "--target") ? "--target" : "-T", a);
  const message = [
    `The theme target name "${si(target)}" is an ambiguous reference and used`,
    "by multiple stores in this project. Syncify is unable to determine which theme you wish interface"
  ];
  pt({ type: "error" }).Newline("line").Append("AMBIGUOUS THEME TARGET", y).Wrap(message).Header("Prefix command with store name/s" + R).Line(`${y("provided")}${R} ${P(`${alias} ${target}`)}`).Line(`${y("expected")}${R} ${hi(`${alias} ${expected}`)}`).Header(`Use an empty colon ${si(":")} prefix to instruct Syncify to target all stores${R}`).Line(`${y("provided")}${R} ${P(`${alias} ${target}`)}`).Line(`${y("expected")}${R} ${hi(`${alias} :${R}${target}`)}`).Newline("line").End($.log.group).toLog().Break();
  kill.exit(2);
}
function invalidTarget({
  type: type2,
  provided,
  storeName = null
}) {
  const targets = $.file.targets === null ? "package.json" : path2.basename($.file.targets);
  const message = storeName ? [
    `The ${y(storeName)} ${type2} has no theme "${y.redBright(provided)}" target defined.`,
    `Provide one or more valid ${storeName} theme target/s as defined in your ${targets} file:`
  ] : [
    `The ${type2} target "${y.redBright(provided)}" is either undefined or unknown.`,
    `Provide one or more valid ${type2} target/s as defined in your ${targets} file:`
  ];
  const solution = [
    `Check for typos in the ${type2} target name. If you intended to use this target`,
    `ensure it is properly defined and associated or use ${li("sy setup")} to connect it.`
  ];
  const expected = storeName ? keys($.stores.get(storeName).themes).map((name) => `${It} ${k(name)}`) : type2 === "store" ? $.stores.map(({ name }) => `${It} ${k(name)}`) : $.stores.flatMap(({ themes }) => keys(themes).map((name) => `${It} ${k(name)}`));
  pt({ type: "error" }).Newline("line").Append(`INVALID ${type2.toUpperCase()} TARGET`, y).Wrap(message).Newline().Multiline(expected).Newline().Line("How to fix?", a.bold).Wrap(solution, a).Newline("line").End($.log.group).toLog().Break();
  kill.exit(2);
}
function duplicateThemeTarget(id, store) {
  const write2 = pt({ type: "error" }).Newline("line").Append("DUPLICATE THEME TARGET", y).Wrap(`Theme id (${si(id)}) is using multiple target name references.`).Newline().Line(a("{")).Line(`  "${store}": {`, a);
  const targets = $.file.targets === null ? "package.json" : path2.basename($.file.targets);
  const themes = $.stores.get(store).themes;
  const eq = eqWS(themes, { padding: 1 });
  const last2 = keys(themes).pop();
  const solution = [
    "Remove target occurrences which point to the same theme id defined",
    `on the "${li(store)}" store in your ${y(targets)} file.`
  ];
  for (const p in themes) {
    const c = last2 === p ? "" : ",";
    write2.Line(
      themes[p] === id ? `    ${k(`"${p}": ${themes[p]}`)}${c + eq(p) + vt} ${w.bold("duplicate id")}` : `    "${p}": ${themes[p] + c}`,
      a
    );
  }
  write2.Line(a("  }")).Line(a("}")).Newline().Line("How to fix?", a.bold).Wrap(solution, a).Newline().End($.log.group).toLog().Break();
  kill.exit(2);
}
function parseJson3(file, data) {
  try {
    return json.parse(data);
  } catch (e2) {
    if (e2 instanceof json.JSONError) {
      error.json(e2, file, "Runtime failure due to invalid JSON syntax");
    }
    return null;
  }
}
async function setTemplates() {
  for (const template of ["templates", "customers", "metaobject"]) {
    for (const file of $.paths[template].input) {
      if (!file.endsWith(".json")) continue;
      const json = await fsExtra.readFile(file, "utf8");
      const warn2 = warnOption("Templates");
      const base = path.basename(file, ".json");
      const dir = lastPath(file);
      const rel = path.join(dir, base + ".json");
      if (json.trim().length === 0) {
        warn2("empty file", rel);
        continue;
      }
      const data = parseJson3(file, json);
      if ($.mode.hot) {
        $.hot.alias[base] = {};
        if (!has("order", data)) continue;
        if (has("sections", data)) {
          for (const alias of data.order) {
            if (has(alias, data.sections)) {
              if (has("type", data.sections[alias])) {
                const { type: type2 } = data.sections[alias];
                if (!has(type2, $.hot.alias[base])) $.hot.alias[base][type2] = [];
                if (!$.hot.alias[base][type2].includes(alias)) {
                  $.hot.alias[base][type2].push(alias);
                }
              } else {
                warn2(`missing "type" in sections ${K} ${alias} object`, rel);
              }
            } else {
              warn2(`missing "${alias}" in sections object`, rel);
            }
          }
        } else {
          warn2(A.punctuation("order[] requires {sections} object", a), rel);
        }
      }
      for (const target of values($.target)) {
        setTemplateCache(target.store.domain, target.id, file, data);
      }
    }
  }
}
async function cmd(command2) {
  return new Promise((resolve2) => {
    const isWindows = node_os.platform() === "win32";
    const checkCommand = isWindows ? `where ${command2}` : `which ${command2}`;
    node_child_process.spawn(isWindows ? "cmd" : "sh", [isWindows ? "/c" : "-c", checkCommand], { stdio: "ignore" }).on("exit", (code) => resolve2(code === 0)).on("error", () => resolve2(false));
  });
}
async function getEditor() {
  if ($.project.textEditor !== null && $.config.editor === null) return;
  const warn2 = warnOption("os / editor");
  if ($.config.editor !== null) {
    if ($.project.textEditor !== null && $.project.textEditor === $.config.editor) return;
    const TEXT_EDITORS = {
      darwin: {
        vscode: "code",
        cursor: "cursor",
        sublime: "subl",
        atom: "atom",
        webstorm: "webstorm",
        intellij: "idea",
        textmate: "mate",
        xcode: "xcode"
      },
      win32: {
        vscode: "code.cmd",
        cursor: "cursor.cmd",
        sublime: "sublime_text.exe",
        atom: "atom.cmd",
        webstorm: "webstorm64.exe",
        intellij: "idea64.exe",
        "notepad++": "notepad++.exe"
      },
      linux: {
        vscode: "code",
        cursor: "cursor",
        sublime: "subl",
        // Fixed typo
        atom: "atom",
        webstorm: "webstorm",
        // Fixed typo
        intellij: "idea",
        gedit: "gedit",
        nano: "nano",
        vim: "vim"
      }
    }[$.platform] || null;
    if (TEXT_EDITORS === null) {
      warn2("unsupported platform", $.platform);
    } else if (has($.config.editor, TEXT_EDITORS)) {
      $.project.textEditor = TEXT_EDITORS[$.config.editor];
    } else {
      warn2("unsupported editor", $.config.editor);
    }
  } else {
    const SUPPORTED_EDITORS = {
      darwin: [
        "code",
        "cursor",
        "subl",
        "atom",
        "webstorm",
        "idea",
        "mate",
        "xcode"
      ],
      win32: [
        "code.cmd",
        "cursor.cmd",
        "sublime_text.exe",
        "atom.cmd",
        "webstorm64.exe",
        "idea64.exe",
        "notepad++.exe"
      ],
      linux: [
        "code",
        "cursor",
        "subl",
        "atom",
        "webstorm",
        "idea",
        "gedit",
        "nano",
        "vim"
      ]
    }[$.platform] || null;
    if (SUPPORTED_EDITORS === null) {
      warn2("unsupported platform", $.platform);
    } else {
      for (const editor of SUPPORTED_EDITORS) {
        if (await cmd(editor)) {
          $.project.textEditor = editor;
          break;
        }
      }
      if ($.project.textEditor === null) {
        warn2("unsupported editor");
      }
    }
  }
}
async function setHotReloads() {
  if ($.mode.watch === false && $.mode.hot === false || $.running === true) return;
  runtime.log.Spinner("HOT Reloads", {
    color: Bi,
    style: "spinning"
  });
  const warn2 = warnOption("HOT Reloads");
  if ($.env.sync > 1) {
    warn2("HOT Reloads can only be used on 1 store");
    return;
  } else if ($.target.length > 1) {
    warn2("HOT Reloads can only be used on 1 theme");
    return;
  }
  if (!isObject($.config.hot) && !isNil($.config.hot) && $.config.hot !== false) {
    typeError(
      {
        option: "config",
        name: "hot",
        provided: $.config.hot,
        expects: "boolean | {}"
      }
    );
  }
  if (isObject($.config.hot) && isEmpty($.config.hot) === false) {
    for (const prop in $.config.hot) {
      if (prop === "server" || prop === "socket") {
        if (isNumber($.config.hot[prop])) {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError(
            {
              option: "hot",
              name: prop,
              value: $.config.hot[prop],
              expects: "number"
            }
          );
        }
      } else if (prop === "label" || prop === "eject") {
        if (isBoolean($.config.hot[prop])) {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError(
            {
              option: "hot",
              name: prop,
              value: $.config.hot[prop],
              expects: "visible | hidden"
            }
          );
        }
      } else if (prop === "client") {
        if ($.config.hot[prop] === "inject" || $.config.hot[prop] === "extension") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError(
            {
              option: "hot",
              name: prop,
              value: $.config.hot[prop],
              expects: "inject | extension"
            }
          );
        }
      } else if (prop === "flags") {
        if (isArray($.config.hot[prop])) {
          for (const flag of $.config.hot[prop]) {
            $.hot[prop][flag] = false;
          }
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "string[]"
          });
        }
      } else if (prop === "method") {
        if ($.config.hot[prop] === "hot" || $.config.hot[prop] === "live" || $.config.hot[prop] === "refresh") {
          $.hot[prop] = $.config.hot[prop];
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "hot | live | refresh"
          });
        }
      } else if (prop === "layouts") {
        if (isArray($.config.hot[prop])) {
          $.hot[prop] = [];
          for (const layout of $.config.hot[prop]) {
            if (isString(layout)) {
              const filename = path2.basename(layout);
              if (!$.hot[prop].includes(filename)) {
                $.hot[prop].push(filename);
              }
            } else {
              invalidError({
                option: "hot",
                name: prop,
                value: $.config.hot[prop],
                expects: "string"
              });
            }
          }
        } else {
          invalidError({
            option: "hot",
            name: prop,
            value: $.config.hot[prop],
            expects: "string[]"
          });
        }
      } else {
        if (!has(prop, $.hot)) {
          unknownError(`hot.${prop}`, $.config.hot[prop]);
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
  }
  const from = path2.join($.dirs.module, HOT_SNIPPET);
  if (!fsExtra.existsSync(from)) {
    return throwError([
      "Failed to obtain the source HOT Snippet injection file.",
      "This is required and should be located within the Syncify",
      `installation path: ${si(from)}`
    ], [
      "Please submit an issue to: https://github.com/panoply/syncify",
      "You can also try to re-install Syncify and trying again."
    ]);
  }
  $.hot.source = path2.join($.root, HOT_SOURCE);
  if (!fsExtra.existsSync($.hot.source)) {
    fsExtra.copyFileSync(path2.join($.dirs.module, HOT_SNIPPET), $.hot.source);
  } else {
    if ($.project.hotVersion !== "0.4.9") {
      fsExtra.copyFileSync(path2.join($.dirs.module, HOT_SNIPPET), $.hot.source);
      $.project.hotVersion = "0.4.9";
    }
  }
  $.hot.cache.root = path2.join($.dirs.hot, `${$.target.default.id}`);
  $.hot.cache.snippet = path2.join($.hot.cache.root, HOT_SNIPPET);
  if (!fsExtra.existsSync($.hot.cache.root)) fsExtra.mkdirSync($.hot.cache.root);
  await snippet2($.target.default);
  runtime.hot();
}

// syncify/options/settings/json.ts
var import_anymatch4 = __toESM(require_anymatch());
function setJsonOptions() {
  if (!has("transform", $.config) || !has("json", $.config.transform)) return;
  const { json } = $.config.transform;
  if (isNil(json)) return;
  if (!isObject(json)) {
    typeError(
      {
        option: "processors",
        name: "json",
        expects: "{}",
        provided: typeof json
      }
    );
  }
  if (isEmpty(json)) return;
  const warn2 = warnOption("JSON Transform");
  for (const option in json) {
    if (option === "indent") {
      if (isNumber(json[option])) {
        $.json[option] = $.json.options.indentSize = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "number"
          }
        );
      }
    } else if (option === "crlf") {
      if (isBoolean(json[option])) {
        $.json[option] = $.json.options.crlf = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "number"
          }
        );
      }
    } else if (option === "stripComments") {
      if (isBoolean(json[option])) {
        $.json[option] = $.json.options.removeComments = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "boolean"
          }
        );
      }
    } else if (option === "useTab") {
      if (isBoolean(json[option])) {
        $.json[option] = $.json.options.useTab = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "boolean"
          }
        );
      }
    } else if (option === "sortArrays") {
      if (isBoolean(json[option]) || isArray(json[option])) {
        $.json[option] = $.json.options.arrays = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "boolean | string[]"
          }
        );
      }
    } else if (option === "sortObjects") {
      if (isBoolean(json[option]) || isArray(json[option])) {
        $.json[option] = $.json.options.objects = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "boolean | string[]"
          }
        );
      }
    } else if (option === "noSortList") {
      if (isArray(json[option])) {
        $.json[option] = $.json.options.exclude = json[option];
      } else {
        typeError(
          {
            option: "json",
            name: option,
            provided: json[option],
            expects: "string[]"
          }
        );
      }
    } else if (option === "exclude") {
      const exclude = isString(json[option]) ? [json[option]] : json[option];
      if (isArray(exclude)) {
        $.json[option] = (0, import_anymatch4.default)(getResolvedPaths(json[option]));
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
    } else if (option === "terse" && $.mode.terse === true) {
      if (isEmpty(json.terse)) {
        $.json.terse.enabled = false;
        warn2("Terse option is empty, minification will not apply");
      } else if (isBoolean(json.terse) && json.terse === true) {
        $.json.terse.enabled = true;
      } else if (isObject(json.terse)) {
        $.json.terse.enabled = true;
        for (const p in json.terse) {
          if (p !== "exclude" && has(p, $.json.terse)) {
            if (isBoolean(json.terse[option])) {
              $.json.terse[p] = json.terse[p];
            } else {
              typeError(
                {
                  option: `json ${K} terse`,
                  name: p,
                  provided: json.terse[p],
                  expects: "boolean"
                }
              );
            }
          } else if (p === "exclude") {
            $.json.terse.exclude = (0, import_anymatch4.default)(getResolvedPaths(json.terse[option]));
          }
        }
      }
    }
  }
}

// syncify/options/settings/liquid.ts
var import_anymatch5 = __toESM(require_anymatch());
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
  if (!has("liquid", $.config.transform) || isEmpty($.config.transform.liquid)) return;
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
  const warn2 = warnOption("Liquid Transform");
  if (has("terse", $.config.transform.liquid) && $.mode.terse === true) {
    $import("html-minifier-terser");
    if (isEmpty($.config.transform.liquid.terse)) {
      $.liquid.terse.enabled = false;
      warn2("Terse option is empty, minification will not apply");
    } else if (isBoolean($.config.transform.liquid) && $.config.transform.liquid === true) {
      $.liquid.terse.enabled = true;
    } else if (isObject($.config.transform.liquid.terse)) {
      $.liquid.terse.enabled = true;
      const { terse } = $.config.transform.liquid;
      for (const p of LIQUID_TERSE_KEYS) {
        if (has(p, terse)) $.liquid.terse.liquid[p] = terse[p];
      }
      for (const p in MARKUP_TERSE_KEYS) {
        if (has(p, terse)) $.liquid.terse.markup[p] = terse[p];
      }
      if (has("exclude", terse)) {
        $.liquid.terse.exclude = (0, import_anymatch5.default)(getResolvedPaths(terse.exclude));
      }
    }
  }
}

// syncify/options/settings/plugins.ts
function setPlugins() {
  if (!has("plugins", $.config)) return;
  if (!isArray($.config.plugins)) return;
  for (const plugin of $.config.plugins) {
    if (has("onInit", plugin)) plugin.onInit.call({ ...$ }, $.config);
    if (has("onChange", plugin)) {
      $.plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }
    if (has("onTransform", plugin)) {
      $.plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }
    if ($.mode.watch) {
      if (has("onWatch", plugin)) {
        $.plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }
      if (has("onReload", plugin)) {
        $.plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }
    if ($.mode.build) {
      if (has("onBuild", plugin)) {
        $.plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }
  }
}

// syncify/options/settings/processors.ts
function setProcessors() {
  if (has("processor", $.config) && isObject($.config.processor)) {
    for (const prop in $.config.processor) {
      if (isEmpty($.config.processor[prop])) {
        continue;
      }
      if (isArray($.config.processor[prop])) {
        $.processor[prop].config = $.config.processor[prop];
      } else if (isObject($.config.processor[prop])) {
        if (prop === "esbuild") {
          $.processor[prop] = merge($.processor[prop], $.config.processor[prop]);
        } else {
          $.processor[prop].config = merge($.processor[prop].config, $.config.processor[prop]);
        }
      }
    }
  }
}

// syncify/options/settings/publish.ts
async function setPublishConfig() {
  return;
}

// syncify/options/settings/script.ts
var import_anymatch6 = __toESM(require_anymatch());
async function setScriptOptions() {
  if (!has("script", $.config.transform)) return;
  if (!$.config.transform.script || isEmpty($.config.transform.script)) return;
  const warn2 = warnOption("Script Transform");
  if (has("entryPoints", $.processor.esbuild)) {
    warn2("processor option is not allowed and was omitted", "entryPoints");
    delete $.processor.esbuild.entryPoints;
  }
  const transforms = getTransform($.config.transform.script, {
    addWatch: false,
    flatten: true
  });
  if (!has("absWorkingDir", $.processor.esbuild)) {
    $.processor.esbuild.absWorkingDir = $.cwd;
  }
  for (const script2 of transforms) {
    const keyDir = script2.snippet ? "snippets" : "assets";
    const { name } = renameFileParse(script2.input, script2.rename);
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
    const has2 = hasProp(script2);
    const bundle = o();
    if (script2.snippet) {
      if (!rename.endsWith(".liquid")) rename = rename + ".liquid";
      bundle.attrs = [];
      bundle.snippet = true;
      bundle.namespace = "snippets" /* Snippets */;
      bundle.type = 4 /* Snippet */;
      if (has2("attrs") && isEmpty(script2.attrs) === false) {
        if (isArray(script2.attrs)) {
          for (let i = 0; i < script2.attrs.length; i++) {
            const attr = script2.attrs[i];
            if (isArray(attr)) {
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
      bundle.type = 12 /* Script */;
    }
    bundle.uuid = uuid();
    bundle.snippet = script2.snippet;
    bundle.input = script2.input;
    bundle.output = path2.join($.dirs.output, keyDir, rename);
    bundle.key = path2.join(keyDir, rename);
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;
    $.processor.esbuild.outfile = bundle.output;
    if (has2("esbuild")) {
      if (isBoolean(script2.esbuild) || isNil(script2.esbuild)) {
        bundle.esbuild = merge($.processor.esbuild);
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
            warn2('Option is not allowed, use Syncify "input" instead', prop);
          } else if (prop === "outdir" && esProp(prop)) {
            warn2("Option is not allowed, Syncify will handle output location", prop);
          } else if (prop === "watch" && esProp(prop)) {
            warn2("Option is not allowed, declare watch paths using Syncify", prop);
          } else if (esProp(prop)) {
            warn2("Option is not allowed and will be ignored", prop);
          }
        }
        if (esProp("plugins") && has("plugins", $.processor.esbuild)) {
          script2.esbuild.plugins.unshift(...$.processor.esbuild.plugins);
        }
        bundle.esbuild = merge($.processor.esbuild, script2.esbuild);
      } else {
        typeError({
          option: "script",
          name: "esbuild",
          provided: typeof script2.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      bundle.esbuild = merge($.processor.esbuild);
    }
    bundle.esbuild.entryPoints = [bundle.input];
    if ($.mode.watch) {
      if (!has2("watch")) {
        bundle.watch = s();
      } else {
        if (!isArray(script2.watch)) {
          typeError({
            option: "script",
            name: "watch",
            provided: script2.watch,
            expects: "string[]"
          });
        }
        const watchers = getResolvedPaths(script2.watch);
        bundle.watchCustom = (0, import_anymatch6.default)(watchers);
        bundle.watch = s(watchers);
      }
    } else {
      bundle.watch = s();
    }
    try {
      await esbuildBundle(bundle);
    } catch (e2) {
      errorRuntime(e2, {
        message: [
          "Syncify has failed to initialize due to a script transform prebuild error.",
          "Script transforms execute at runtime builds but the compile process did not complete.",
          "This error may have been thrown because of an early process exit and be unrelated to",
          "your script transforms."
        ],
        solution: [
          "You may need to correct the error encountered. It is unclear why the error was thrown",
          "so consult the message response and act accordingly."
        ],
        entries: {
          processor: "ESBuild"
        }
      });
    }
    if ($.mode.terse) {
      bundle.esbuild = merge(bundle.esbuild, {
        exclude: void 0
      });
    }
    $.script.push(bundle);
  }
}

// syncify/options/settings/style.ts
var import_anymatch7 = __toESM(require_anymatch());
async function getExternalModules() {
  const postcss = await readConfigFile(
    path2.join($.dirs.config, "postcss.config"),
    "PostCSS",
    (config) => {
      if (config !== null) {
        $.processor.postcss.config = config;
      }
    }
  );
  if (postcss !== null) {
    $.processor.postcss.file = postcss.file;
    $.processor.postcss.config = postcss.config;
  }
  $.processor.tailwind.installed = getModules($.pkg, "tailwindcss");
  if ($.processor.tailwind.installed) {
    await $import("tailwindcss");
    const tw = await readConfigFile(
      path2.join($.dirs.config, "tailwind.config"),
      "Tailwind",
      (config) => {
        if (config !== null) {
          $.processor.tailwind.config = config;
        }
      }
    );
    if (tw !== null) {
      $.processor.tailwind.file = tw.file;
      $.processor.tailwind.config = tw.config;
    }
  }
  $.processor.sass.installed = getModules($.pkg, "sass");
  if ($.processor.sass.installed) ;
}
async function setStyleConfig() {
  if (!has("style", $.config.transform)) return;
  if (!$.config.transform.style || isEmpty($.config.transform.style)) return;
  $import("postcss");
  $import("clean-css");
  await getExternalModules();
  const warn2 = warnOption("Style Transform");
  const styles = getTransform($.config.transform.style, {
    addWatch: false,
    flatten: true
  });
  const path5 = normalPath($.config.input);
  for (let i = 0; i < styles.length; i++) {
    const style2 = styles[i];
    const has2 = hasProp(style2);
    const bundle = o();
    if (isUndefined(style2.input)) {
      throw invalidError({
        option: "transform.style",
        name: style2.rename || style2.input,
        expects: "string",
        value: style2.input
      });
    }
    bundle.uuid = uuid();
    bundle.input = style2.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = null;
    bundle.sass = false;
    bundle.tailwind = null;
    if (has2("postcss")) {
      if (isArray(style2.postcss) && style2.postcss.length > 0) {
        defineProperty(bundle, "postcss", {
          get() {
            return style2.postcss;
          }
        });
      } else {
        if (isBoolean(style2.postcss) && style2.postcss !== false && isNil(style2.postcss) === false) {
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
    if (has2("tailwind")) {
      if (!$.processor.tailwind.installed) {
        missingDependency("tailwindcss");
      }
      const override = isObject(style2.tailwind);
      if (override || isBoolean(style2.tailwind) && style2.tailwind !== false && isNil(style2.tailwind) === false) {
        const tw = merge(override ? style2.tailwind : $.processor.tailwind.config);
        if (isArray(tw.content) && isEmpty(tw.content)) {
          tw.content = [
            path2.join(
              $.dirs.input,
              "**",
              "*.{js,ts,jsx,tsx,vue,svelte,liquid,json,schema}"
            )
          ];
        }
        defineProperty(bundle, "tailwind", {
          get() {
            return tw;
          }
        });
        if ($.mode.watch && isArray(bundle.tailwind.content)) {
          const files = await glob__default.default(bundle.tailwind.content);
          if ($.processor.tailwind.map === null) {
            $.processor.tailwind.map = o();
          }
          $.processor.tailwind.map[i] = s(files);
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
    if (has2("sass") && style2.sass !== false && $.processor.sass.installed === true) {
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && isNil(style2.sass) === false) {
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
              if (isArray(style2.sass[option])) {
                const includePaths = [];
                for (const path6 of style2.sass[option]) {
                  const resolve2 = path2.join($.cwd, path6);
                  if (await fsExtra.exists(resolve2)) {
                    includePaths.push(resolve2);
                  } else {
                    warn2("Cannot resolve sass includePath entry", path6);
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
      if (style2.snippet === false && !/\.s[ac]ss/.test(path2.extname(bundle.input))) {
        warn2("Input is not a sass file", bundle.input);
      }
    }
    let rename = renameFileParse(style2.rename);
    if (has2("rename") && isNil(style2) === false) {
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
      rename = renameFileParse(bundle.input, style2.rename);
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
    const watch = [];
    if ($.mode.watch && has2("watch")) {
      if (!isArray(style2.watch)) {
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
        const globs = await glob__default.default(path2.join($.cwd, path5(uri)));
        if (globs.length === 0 && uri[0] !== "!") {
          warn2("Cannot resolve watch glob/path uri", uri);
        }
        for (const p of globs) {
          if (await fsExtra.exists(p)) {
            watch.push(p);
          } else {
            warn2("No file exists in path", p);
          }
        }
      }
      watch.push(bundle.input);
      bundle.watch = (0, import_anymatch7.default)(watch);
    } else {
      bundle.watch = (0, import_anymatch7.default)([bundle.input]);
    }
    if (isObject(bundle.sass)) {
      bundle.sass.include.unshift($.cwd, path2.join($.cwd, rename.dir));
      if (hasPath("sass.include", style2)) {
        bundle.sass.include = style2.sass.include.map((p) => path2.join($.cwd, p));
      }
    }
    if (has2("snippet")) {
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
      if (bundle.snippet === true && has2("attrs") && isEmpty(style2.attrs) === false) {
        if (isArray(style2.attrs)) {
          for (let i2 = 0; i2 < style2.attrs.length; i2++) {
            const attr = style2.attrs[i2];
            if (isArray(attr)) {
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
      if (!has("rename", bundle)) {
        bundle.rename = rename.name;
      }
      if (rename.name.endsWith(".liquid") === false || bundle.rename.endsWith(".liquid") === false) {
        bundle.rename = rename.name + ".liquid";
      }
      $.paths.transforms.set(bundle.input, 11 /* Style */);
    } else {
      bundle.rename = rename.name;
    }
    $.style.push(bundle);
  }
}
function setSvgOptions() {
  if (!has("svg", $.config.transform)) return;
  if (!$.config.transform.svg || isEmpty($.config.transform.svg)) return;
  $import("svgo");
  const warn2 = warnOption("SVG Transform");
  const svgs = getTransform($.config.transform.svg, {
    addWatch: true,
    flatten: false
  });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path5) => {
      if (path2.extname(path5) === ".svg") return true;
      warn2("Excluded file which is not an SVG type", path2.relative($.cwd, path5));
      return false;
    });
    if (files.length === 0) {
      warn2("No SVG file paths were resolved");
      continue;
    }
    const has2 = hasProp(svg2);
    const bundle = o();
    bundle.uuid = uuid();
    bundle.input = s(files);
    bundle.format = null;
    bundle.match = svg2.match;
    bundle.rename = svg2.rename;
    bundle.snippet = svg2.snippet;
    bundle.sprite = {
      attrs: [],
      symbols: {
        id: "svg-[name]",
        xmlns: false
      }
    };
    if (has2("format")) {
      bundle.format = svg2.format;
      bundle.svgo = isObject(svg2.svgo) ? merge($.processor.svgo, svg2.svgo) : true;
      if (bundle.format === "sprite") {
        if (isObject(svg2.sprite)) {
          const hasSvgProp = hasProp(svg2.sprite);
          if (hasSvgProp("attrs") && isEmpty(svg2.sprite.attrs) === false) {
            if (isArray(svg2.sprite.attrs)) {
              for (let i = 0; i < svg2.sprite.attrs.length; i++) {
                const attr = svg2.sprite.attrs[i];
                if (isArray(attr)) {
                  bundle.sprite.attrs.push(attr.join(""));
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
                  option: "transform.svg.sprite",
                  name: "attrs",
                  provided: svg2.sprite.attrs,
                  expects: "[ [ name: string, value: string ] ]"
                }
              );
            }
          }
          if (hasSvgProp("symbols")) {
            if (isObject(svg2.sprite.symbols)) {
              const hasSymbolProp = hasProp(svg2.sprite.symbols);
              if (hasSymbolProp("id")) {
                if (isString(svg2.sprite.symbols.id)) {
                  bundle.sprite.symbols.id = svg2.sprite.symbols.id;
                } else {
                  typeError({
                    option: "transform.svg.sprite.symbols",
                    name: "id",
                    expects: "string",
                    provided: svg2.sprite.symbols.id
                  });
                }
              }
              if (hasSymbolProp("xmlns")) {
                if (isBoolean(svg2.sprite.symbols.xmlns)) {
                  bundle.sprite.symbols.xmlns = svg2.sprite.symbols.xmlns;
                } else {
                  typeError({
                    option: "transform.svg.sprite.symbols",
                    name: "xmlns",
                    expects: "true | false",
                    provided: svg2.sprite.symbols.xmlns
                  });
                }
              }
            } else {
              typeError({
                option: "transform.svg.sprite",
                name: "symbols",
                expects: "{}",
                provided: svg2.sprite.symbols
              });
            }
          }
        }
      }
    } else {
      missingOption({
        option: "transform.svg",
        key: "format",
        expects: "sprite | file",
        reason: [
          `SVG transforms require you to provide a ${si("format")}. Syncify needs to knows how`,
          "it should handle the SVG input and what to generate as an output."
        ]
      });
    }
    $.svg.push(bundle);
  }
}
function parseVersionNumber(version) {
  const match = version.match(/^(\d{1,2})\.(\d{1,2})\.(\d{1,2})$/);
  if (!match) {
    throw new Error("Unable to parse: " + version);
  }
  return {
    patch: parseInt(match[3], 10),
    minor: parseInt(match[2], 10),
    major: parseInt(match[1], 10)
  };
}
function setVersion() {
  if ($.project.themeVersion === $.pkg.version) {
    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = path2.join($.dirs.versions, `v${$.vc.major}`);
    $.vc.update.zip = path2.join($.vc.update.dir, `${$.vc.number}.zip`);
    const v3 = parseVersionNumber($.project.themeVersion);
    $.vc.number = $.project.themeVersion;
    $.vc.patch = v3.patch;
    $.vc.minor = v3.minor;
    $.vc.major = v3.major;
    $.vc.dir = path2.join($.dirs.versions, `v${$.vc.major}`);
    $.vc.zip = path2.join($.vc.dir, `${$.vc.number}.zip`);
  } else {
    const v3 = parseVersionNumber($.pkg.version);
    $.vc.number = $.pkg.version;
    $.vc.patch = v3.patch;
    $.vc.minor = v3.minor;
    $.vc.major = v3.major;
    $.vc.dir = path2.join($.dirs.versions, `v${$.vc.major}`);
    $.vc.zip = path2.join($.vc.dir, `${$.vc.number}.zip`);
  }
  $.vc.update = merge({}, $.vc);
  $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
  $.vc.update.zip = path2.join($.vc.update.dir, `${$.vc.update.number}.zip`);
}

// syncify/utils/piper.ts
function piper(...initialTasks) {
  const stages = [
    {
      type: "tasks",
      tasks: initialTasks
    }
  ];
  let isCancelled = false;
  async function executeTasks(tasks) {
    for (const task of tasks) {
      if (isCancelled) break;
      try {
        const result = task();
        await Promise.resolve(result);
      } catch (e2) {
      }
    }
  }
  const chain = {
    stop(condition) {
      return (...nextTasks) => {
        if (!isCancelled) {
          const queue = isArray(nextTasks[0]) && nextTasks.length === 1;
          const tasks = queue ? nextTasks[0] : nextTasks;
          stages.push({ type: "tasks", condition, tasks, queue });
        }
        return chain;
      };
    },
    next(condition) {
      const trueHandler = (ifTrue) => {
        if (!isCancelled) {
          const queue = isArray(ifTrue[0]) && ifTrue.length === 1;
          const truthy = queue ? ifTrue[0] : isArray(ifTrue) ? ifTrue : [ifTrue];
          stages.push({
            type: "true",
            condition,
            queue,
            truthy
          });
        }
        const chainWithOptionalFalse = Object.assign(function(ifFalse) {
          if (!isCancelled) {
            const last2 = stages[stages.length - 1];
            if (last2.type === "true") {
              last2.queue = isArray(ifFalse[0]) && ifFalse.length === 1;
              last2.falsy = last2.queue ? ifFalse[0] : isArray(ifFalse) ? ifFalse : [ifFalse];
            }
          }
          return chain;
        }, chain);
        return chainWithOptionalFalse;
      };
      return trueHandler;
    },
    then: null,
    catch: null,
    finally: null
  };
  const promise = (async () => {
    for (const stage of stages) {
      if (isCancelled) break;
      switch (stage.type) {
        case "tasks":
          if (stage.condition) {
            isCancelled = true;
            break;
          }
          if (stage.queue) {
            q2.tasks.addAll(stage.tasks);
          } else {
            await executeTasks(stage.tasks);
          }
          break;
        case "true":
          if (stage.condition && stage.truthy) {
            if (stage.queue) {
              q2.tasks.addAll(stage.truthy);
            } else {
              await executeTasks(stage.truthy);
            }
          } else if (!stage.condition && stage.falsy) {
            if (stage.queue) {
              q2.tasks.addAll(stage.falsy);
            } else {
              await executeTasks(stage.falsy);
            }
          }
          break;
      }
    }
    return q2.tasks.size > 0 ? q2.tasks.onIdle() : void 0;
  })();
  chain.then = promise.then.bind(promise);
  chain.catch = promise.catch.bind(promise);
  chain.finally = promise.finally.bind(promise);
  return chain;
}

// syncify/options/configure.ts
async function Configure() {
  return piper(
    project
  ).stop($.mode.create || $.mode.projects)(
    getPkg,
    getEnv,
    getCaches,
    getTargets,
    getConfig,
    getEditor
  ).stop($.mode.init || $.mode.keychain)(
    setBaseDirs,
    setTargets,
    setFilters
  ).stop($.mode.link)(
    setProcessors,
    setPublishConfig,
    setThemeDirs,
    setImportDirs,
    setPaths,
    setVersion,
    setJsonOptions,
    setLiquidOptions,
    setPlugins,
    setStdin
  ).stop($.mode.pull || $.mode.push)([
    setSectionOptions,
    setScriptOptions,
    setSvgOptions,
    setStyleConfig,
    setTemplates
  ]).next($.mode.align)(
    runAlignment
  ).next($.mode.hot)(
    setHotReloads
  ).next($.mode.watch)(
    runtime.time
  );
}

// syncify/prompts/create.ts
var import_write_file_atomic4 = __toESM(require_lib());

// syncify/http/access/accessScopes.ts
function accessScopeList(domain, token) {
  return new Promise((resolve2, reject) => {
    http.request(domain, token)({
      data: `query AccessScopeList{currentAppInstallation{accessScopes{description handle}}}`
    }).then(({ data: { currentAppInstallation } }) => {
      resolve2(currentAppInstallation.accessScopes);
    }).catch((failed) => {
      accessScopeList.error = failed;
      return false;
    });
  });
}
accessScopeList.error = null;
async function storeExists(store) {
  return xior__default.default.head(`https://${store}.myshopify.com`).then(() => ({
    exists: true,
    error: null
  })).catch((error2) => ({
    exists: false,
    error: error2
  }));
}

// syncify/prompts/credentials.ts
async function credentials(options) {
  pt();
  const date = Date.now();
  const state = {
    env: null,
    store: null,
    domain: null,
    name: null,
    created: date,
    updated: date,
    token: null,
    existing: false,
    method: null,
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
  const label = labels({
    padding: 0,
    prompts: [
      "Storage Method",
      "Existing Token",
      "Which Keychain",
      "Select Token",
      "Shopify Domain",
      "API Admin Token",
      "API Token Name"
    ]
  });
  state.method = await PromptStoreMethod();
  if (isEmpty($.keychain) === false) {
    state.existing = await PromptExisting();
    if (state.existing) await PromptKeychain();
  }
  if (state.domain === null) {
    state.domain = await PromptStoreDomain();
  }
  if (state.token === null) {
    state.token = await PromptStoreToken();
  }
  if (state.method === null) {
    state.method = await PromptStoreMethod();
  }
  if (state.method === "keychain") {
    state.name = await PromptTokenName();
  }
  state.store = state.domain;
  state.domain = `${state.store}.myshopify.com`;
  const credential = g.nl(
    `# Credentials: ${state.domain}`,
    `${state.store}_api_token = '${state.token.trim()}'`
  );
  if ($.file.env !== null) {
    const env2 = fsExtra.readFileSync($.file.env, "utf8");
    state.env = env2.trimEnd() + "\n\n" + credential;
  } else {
    state.env = credential;
  }
  return state;
  async function PromptStoreMethod() {
    const choices = [
      {
        name: "env",
        value: "env",
        hint: "Per-Project .env file token storage"
      },
      {
        name: "keychain",
        value: "keychain",
        hint: "Gobally accessible token vault storage"
      }
    ];
    const spacing = eqWS(choices, { prop: "name", padding: 4 });
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.StorageMethod,
      name: "method",
      type: "select",
      choices: choices.map(({ name, value, hint }) => ({
        name,
        value,
        hint: spacing(name) + hint
      }))
    }).catch(cancel);
    return resolve2.method;
  }
  async function PromptExisting() {
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.ExistingToken,
      name: "existing",
      type: "toggle",
      hint: "   Choose an existing token from keychain?",
      default: "Yes",
      disabled: "No",
      enabled: "Yes"
    }).catch(cancel);
    return resolve2.existing;
  }
  async function PromptKeychain() {
    const { domain } = await enquirer.prompt({
      theme,
      message: label.WhichKeychain,
      type: "select",
      name: "domain",
      choices: keys($.keychain).map((value) => ({
        name: value,
        message: value.replace(".myshopify.com", ""),
        hint: `   https://${value}`
      }))
    }).catch(cancel);
    state.domain = domain;
    const store = $.keychain[domain];
    const tokens = keys(store);
    if (tokens.length > 0) {
      if (tokens.length > 1) {
        const { name } = await enquirer.prompt({
          theme,
          message: label.SelectToken,
          type: "select",
          name: "name",
          choices: tokens.map((name2) => ({
            name: name2,
            hint: `    Created ${prettyDate(store[name2].created)}`
          }))
        }).catch(cancel);
        state.name = name;
        state.token = store[name].token;
      } else {
        state.name = tokens[0];
        state.token = store[tokens[0]].token;
      }
    }
  }
  async function PromptStoreDomain() {
    let valid = 2;
    const dispose = intercept();
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.ShopifyDomain,
      type: "input",
      name: "domain",
      format(value) {
        return valid === 1 ? Q(`${value}.myshopify.com`) : valid === 3 ? w(`${value}`) + a(".myshopify.com") : value + a(".myshopify.com");
      },
      async validate(value) {
        this.state.symbols.pointer = "";
        if (value.length === 0) {
          valid = 3;
          return mr(
            w.bold("MISSING STORE NAME"),
            "\n",
            `Please enter the ${si("myshopify.com")} store domain name.`
          );
        } else if (value.length < 3) {
          valid = 3;
          return mr(
            w.bold("INVALID STORE NAME"),
            "\n",
            `Store name must be more than ${si("3")} characters long.`,
            "Shopify does support short-name store domains."
          );
        } else if (has(value, $.stores)) {
          valid = 3;
          return mr(
            w.bold("INVALID STORE NAME"),
            "\n",
            "There is an existing project connected to this domain.",
            "You cannot overwrite existing credentials in the keychain."
          );
        }
        const { exists: exists2, error: error2 } = await storeExists(value);
        if (exists2 === false) {
          const context = error2.status === 404 ? `Store "${si(`${value}.myshopify.com`)}" does not exist on the Shopify platform.` : `Connection failed to interface with ${w.bold(`${value}.myshopify.com`)} store.`;
          valid = 3;
          return mr(
            w.bold(`ERROR ${Ri} STORE NOT FOUND`),
            "\n",
            error2.message.replace(/(\d+)/, w.bold("$1")) + ".",
            context,
            "Please check the correct store name has been provided."
          );
        }
        valid = 1;
        return true;
      }
    }).catch(cancel);
    dispose();
    return resolve2.domain;
  }
  async function PromptStoreToken() {
    const dispose = intercept();
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.APIAdminToken,
      type: "input",
      name: "token",
      async validate(value) {
        this.state.symbols.pointer = "";
        if (value.length === 0) {
          return mr(
            w.bold("REQUIRED"),
            "\n",
            "You must provide an API Token"
          );
        } else if (value.length < 10) {
          return mr(
            w.bold("INVALID TOKEN"),
            "\n",
            "The API Access token you provided is far too short to be valid.",
            "Tokens have a minimum length, please check the token and try again."
          );
        }
        const scopes = await accessScopeList(state.domain, value);
        if (isBoolean(scopes)) {
          return mr(
            w.bold(`ERROR ${accessScopeList.error.status}`),
            "\n",
            accessScopeList.error.message,
            "Please check the API Access Token is active and try again."
          );
        } else {
          const tui2 = pt().Prepend("ERROR IN SCOPES", w.bold).Line(`Syncify requires certain ${si("read")} and ${si("write")} access scopes.`, w).Prepend("Ensure the token has access to all scopes listed in red (below) and try again.", w);
          if (scopes.length > 0) {
            for (const { handle } of scopes) {
              if (handle in state.scopes) {
                state.scopes[handle] = true;
                tui2.Line(`${Pi} ${handle}`, Q);
              }
            }
          }
          let count = 0;
          for (const scope in state.scopes) {
            if (state.scopes[scope] === false) {
              tui2.Line(`${vt} ${scope}`, w);
              count = count + 1;
            }
          }
          if (count > 0) {
            return tui2.Newline().toString();
          }
        }
        return true;
      }
    }).catch(cancel);
    dispose();
    return resolve2.token;
  }
  async function PromptTokenName() {
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.APITokenName,
      required: true,
      type: "input",
      name: "name",
      hint: "Name the API Access Token"
    }).catch(cancel);
    return resolve2.name;
  }
}

// syncify/utils/child.ts
async function execAsync(cmd2) {
  try {
    const { stdout: stdout3 } = await command(cmd2);
    return stdout3;
  } catch (e2) {
    throwError(e2, [
      `This ${si("child_process")} error and likely unrelated to Syncify.`,
      "It is unclear what has caused the issue, but consult the error message",
      "or please submit an issue on github repository."
    ]);
  }
}

// syncify/prompts/create.ts
async function Create() {
  const straps = /* @__PURE__ */ new Set([
    // THEMES
    ...STRAP_THEMES.map(([name]) => name),
    // EXAMPLES
    ...STRAP_EXAMPLES.map(([name]) => name)
  ]);
  $.keychain = fsExtra.readJSONSync($.file.keychain);
  const select = $.argv.length > 1 ? $.argv[1] : null;
  const tui = pt().Newline().Wrap(
    a,
    "Hello Hacker \uD83D\uDC4B\n\n",
    "This command prompt can be used to jump start a new project. Choose one of the open source themes",
    "or usage examples available. Alternatively, you can import a theme from a store and Syncify will",
    "strap it for you."
  );
  const state = {
    template: null,
    strap: null,
    repository: null,
    projectPath: null,
    cacheRootPath: null,
    checksum: null,
    name: null};
  const label = labels({
    padding: 3,
    prompts: [
      "Strap Source",
      "Choose Strap",
      "Project Name",
      "Credentials",
      "Installation",
      "Overwrite"
    ]
  });
  if (straps.has(select)) {
    state.template = select;
    state.repository = `https://github.com/syncifycli/${select}.git`;
  }
  tui.Newline().toLog({
    clear: true,
    trim: true
  });
  if (state.template === null) {
    state.strap = await PromptSelectStap();
    state.template = await PromptChooseTemplate();
    state.repository = `https://github.com/syncifycli/${state.template}.git`;
  }
  state.name = await PromptEnterProjectName();
  state.projectPath = path2.join($.cwd, state.name);
  state.checksum = checksum(state.projectPath);
  state.cacheRootPath = path2.join($.home, state.checksum);
  const pkguri = path2.join(state.projectPath, "package.json");
  const access = await credentials();
  await CreateStrap();
  process2.chdir(state.name);
  await CreatePackage();
  if ($.pm === "?") {
    $.pm = await PromptPackageManager();
  }
  await InstallDependencies();
  await CreateCache();
  tui.Header(`${Pi} Project ${Q.bold(state.name)} Created`, y.white).Wrap(`You can now ${si(`cd ${state.name}`)} into the directory and start hacking.`, a).Newline().End($.log.group).toLog({ clear: true });
  async function PromptSelectStap() {
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.StrapSource,
      type: "select",
      name: "strap",
      choices: [
        {
          name: "themes",
          message: "Themes",
          hint: "       Boilerplate theme straps"
        },
        {
          name: "examples",
          message: "Examples",
          hint: "     One of the usage examples"
        }
      ]
    }).catch(cancel);
    return resolve2.strap;
  }
  async function PromptChooseTemplate() {
    const boilers = (strap) => strap === "themes" ? STRAP_THEMES : STRAP_EXAMPLES;
    const resolve2 = await enquirer.prompt({
      theme,
      type: "select",
      name: "template",
      message: label.ChooseStrap,
      choices: boilers(state.strap).map(([name, hint, disabled = false]) => ({
        name,
        hint,
        disabled
      }))
    }).catch(cancel);
    return resolve2.template;
  }
  async function PromptEnterProjectName() {
    const dispose = intercept();
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.ProjectName,
      type: "input",
      name: "name",
      hint: "This will be the name of the project directory",
      validate(value) {
        this.state.symbols.pointer = "";
        if (value.length === 0) {
          return mr(
            w.bold("REQUIRED"),
            "\n",
            "You must provide a directory name for your project.",
            "Keep it simple, lowercase and no special characters."
          );
        } else if (!/[A-Za-z0-9_+-]+/.test(value)) {
          return mr(
            w.bold("INVALID NAME"),
            "\n",
            "The project directy name is invalid or contains bad characters.",
            `Names must match the following pattern${R} ${si("[A-Za-z0-9_+-]+")}`
          );
        } else if (fsExtra.existsSync(path2.join($.cwd, value))) {
          return mr(
            w.bold("INVALID DIRECTORY"),
            "\n",
            "Directory already exists in this location, please use a different name.",
            "Alternatively, run the command from a different folder/path."
          );
        }
        return true;
      }
    }).catch(cancel);
    dispose();
    return resolve2.name;
  }
  async function PromptPackageManager() {
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.Installation,
      type: "select",
      name: "pm",
      choices: [
        {
          name: "pnpm",
          message: "pnpm"
        },
        {
          name: "npm",
          message: "npm"
        },
        {
          name: "yarn",
          message: "yarn"
        },
        {
          name: "bun",
          message: "bun"
        }
      ]
    }).catch(cancel);
    return resolve2.pm;
  }
  async function InstallDependencies() {
    log.spinner("Installing Dependencies", {
      style: "spinning",
      color: Q
    });
    await execAsync(`${$.pm} install`);
    await delay();
    log.spinner.stop();
  }
  async function CreatePackage() {
    if (!await fsExtra.pathExists(pkguri)) {
      log.spinner.stop();
      throw enoentError({
        type: "file",
        path: pkguri,
        task: g.ws($.argv),
        message: [
          `The strap does not contain a ${si("package.json")} file.`,
          "If you are using a pre-release version of Syncify, this will be addressed",
          "upon official release. Please choose another strap."
        ]
      });
    }
    const pkg = await getPkg(state.projectPath);
    pkg.name = state.name;
    pkg.syncify.stores = {};
    $.project.themeVersion = pkg.version;
    if (hasPath("devDependencies.@syncify/config", pkg)) {
      $.project.configVersion = pkg.devDependencies["@syncify/config"];
    }
    await setPkg(pkg, state.projectPath);
    log.spinner.stop();
  }
  async function CreateStrap() {
    log.spinner("Cloning Strap", {
      style: "spinning",
      color: Q
    });
    await execAsync(`git clone --depth 1 ${state.repository} ${state.name}`);
    await delay();
    await fsExtra.rm(path2.join(state.projectPath, ".git"), { recursive: true, force: true });
  }
  async function CreateCache() {
    $.project.dir = state.projectPath;
    $.project.name = state.name;
    $.project.credentials = access.method === "env" ? "env" : "kc";
    $.project.createdAt = Date.now();
    await createCaches(state.checksum);
    await createProject(path2.join(state.cacheRootPath, state.name));
    if (access.method === "keychain") {
      await SaveKeychain();
    } else {
      await (0, import_write_file_atomic4.default)(path2.join(state.projectPath, ".env"), access.env);
    }
  }
  async function SaveKeychain() {
    if (has(access.domain, $.keychain)) {
      if (has(access.name, $.keychain[access.domain])) {
        const kc = $.keychain[access.domain][access.name];
        kc.updated = access.updated;
        kc.projects.includes(state.checksum) || kc.projects.push(state.checksum);
      } else {
        assign($.keychain[access.domain], {
          [access.name]: {
            name: access.name,
            created: access.created,
            updated: access.updated,
            projects: [state.checksum],
            token: access.token
          }
        });
      }
    } else {
      $.keychain[access.domain] = {
        [access.name]: {
          name: access.name,
          created: access.created,
          updated: access.updated,
          projects: [state.checksum],
          token: access.token
        }
      };
    }
    await (0, import_write_file_atomic4.default)($.file.keychain, JSON.stringify($.keychain));
    await (0, import_write_file_atomic4.default)(path2.join(state.cacheRootPath, ".env"), access.env);
  }
}
function themesList(store) {
  return new Promise((resolve2, reject) => {
    http(store.name).request({
      data: `query ThemeList{themes(first:100){nodes{id createdAt name prefix role themeStoreId updatedAt}}}`
    }).then(({
      data: {
        themes: {
          nodes
        }
      }
    }) => {
      resolve2(nodes.map((theme2) => ({ ...theme2, id: +path2.basename(theme2.id) })));
    }).catch((failed) => {
      const e2 = {};
      e2.failed = failed;
      e2.store = store;
      reject(e2);
    });
  });
}

// syncify/prompts/link.ts
async function listThemes(store) {
  const stdout3 = pt({ type: "info" });
  labels({
    padding: 3,
    prompts: [
      "Associate",
      "Create",
      "Publish",
      "Unpublish",
      "Remove"
    ]
  });
  stdout3.Wrap(
    `Select themes to target and develop on. Selections will be written to the ${si("package.json")}`,
    "file. If you wish to create, publish of change theme role, this is also possible.",
    a
  );
  let separator = 0;
  const items = await themesList(store);
  const themes = items.filter(({ role }) => role !== "demo");
  const space = eqWS(themes, { prop: "name" });
  const choices = themes.map((value) => {
    if (value.name.length > separator) separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${Be} ${a(value.role)}`,
      value
    };
  });
  choices.push(
    {
      role: "separator",
      message: F("\u2500".repeat(separator))
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
  if ($.stores.length > 1) {
    choices.push(
      {
        role: "separator",
        message: F("\u2500".repeat(separator))
      },
      {
        name: "store",
        message: "Select Stores",
        hint: `${space("Select Stores")} ${Be} ${a("go back and choose store")}`
      }
    );
  }
  const { targets } = await enquirer.prompt({
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
      if (isArray(value) && value.length > 0) {
        return Bi(`${value.join(Y(", "))}`);
      }
    }
  });
  const config = { themes: { [store.name]: {} } };
  const fields = [];
  for (const theme2 of targets) {
    config.themes["${" + theme2.name + "}"] = theme2.id;
    fields.push({
      name: theme2.name,
      message: theme2.name,
      validate(value, _, field) {
        if (field && field.name === theme2.name) {
          if (/[A-Z]/.test(value)) {
            return "\n" + _.reset.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + _.reset.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + _.reset.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + _.reset.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = Bi.italic;
  theme.styles.typing = Q;
  const template = JSON.stringify(config, null, 2);
  const snippet3 = await enquirer.prompt({
    name: "stores",
    type: "snippet",
    required: targets.map(({ name }) => name),
    message: "Theme Targets",
    newline: l.next + l.next,
    render,
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return Q(`${this.state.completed}% completed`);
        }
      }
      return ` ${K}  ${Ei(`${this.state.completed}% completed`)}`;
    },
    theme,
    fields,
    template
  });
  const json = { syncify: JSON.parse(snippet3.stores.result) };
  const { save: save2 } = await enquirer.prompt({
    name: "save",
    type: "confirm",
    message: "Save Settings",
    theme,
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    },
    footer: l.line + [
      "",
      a("The following store and theme references will be saved"),
      a("to your package.json file on the syncify key property."),
      "",
      " " + JSON.stringify(json.syncify, null, 2).split("\n").join(l.next),
      ""
    ].join("\n" + l.line)
  });
  if (save2) {
    await setPkg({
      syncify: {
        targets: JSON.parse(snippet3.stores.result)
      }
    });
  }
  return $.pkg.syncify.stores;
}
async function listStores() {
  const space = eqWS($.stores, { prop: "name" });
  const choices = $.stores.map((value) => ({
    name: value.name,
    message: value.domain,
    hint: `${space(value.name)} ${Be} ${a(`https://${value.domain}`)}`,
    value
  }));
  const { store } = await enquirer.prompt({
    name: "store",
    type: "select",
    message: "Select Stores",
    choices,
    theme,
    result() {
      return this.focused.value;
    },
    format(value) {
      return Q(value);
    }
  });
  return listThemes(store);
}
async function Link() {
  const stores = values($.stores);
  if (stores.length > 1) {
    return listStores();
  } else {
    return listThemes($.stores.default);
  }
}
async function GetProjectsDirs() {
  const dirs = await glob.glob(`${$.home}/*`, {
    onlyFiles: false,
    onlyDirectories: true,
    absolute: true,
    cwd: $.home
  });
  return dirs;
}
async function GetProjectNames(dirs) {
  const projects = [];
  for (const dir of dirs) {
    const file = await glob.glob([`${dir}/*`, `!${dir}/hot-snippet`], { cwd: $.home, absolute: true });
    const uri = file[0];
    projects.push({
      hash: path.basename(dir),
      name: path.basename(uri),
      project: fsExtra.readJsonSync(uri),
      uri
    });
  }
  return projects;
}
async function Projects() {
  const write2 = pt({ type: "info" });
  const label = labels({
    padding: 0,
    prompts: [
      "Project",
      "Action"
    ]
  });
  const directories = await GetProjectsDirs();
  if (directories.length === 0) return;
  const files = await GetProjectNames(directories);
  const count = directories.length === 1 ? "is 1 project" : `are ${directories.length} projects`;
  const greeting = write2.Wrap(
    a,
    "Syncify Projects \uD83D\uDEE0\uFE0F\n\n",
    `There ${count} using Syncify on this device. Select the project you wish to inspect or configure.`
  );
  greeting.NL.toWrite(log);
  const select = await PromptProjects();
  const file = files[select];
  const project2 = files[select].project;
  write2.NL.Line(` ${a("NAME")}${R}              ${Y(project2.name)}`).Line(` ${a("UUID")}${R}              ${Y(file.hash)}`).Line(` ${a("LOCATION")}${R}          ${Y(project2.dir)}`).Line(` ${a("CACHE")}${R}             ${Y(file.uri)}`).Line(` ${a("CACHE EXPIRY")}${R}      ${Y(prettyDate(project2.expires))}`).Line(` ${a("LAST RUN")}${R}          ${Y(prettyDate(project2.lastRunAt))}`).Line(` ${a("CREATED AT")}${R}        ${Y(prettyDate(project2.createdAt))}`);
  if (project2.credentials === "env") {
    write2.Line(` ${a("CREDENTIALS")}${R}       ${Y(".env")}`);
  } else {
    write2.Line(` ${a("CREDENTIALS")}${R}       ${Y("keychain")}`);
  }
  write2.Line(` ${a("SYNCIFY VERSION")}${R}   v${Y(project2.syncifyVersion)}`).Line(` ${a("HOT VERSION")}${R}       v${Y(project2.hotVersion)}`).NL.End("Syncify").Break().toWrite(log);
  async function PromptProjects() {
    const spacing = eqWS(files, {
      prop: "name",
      padding: 1
    });
    const choices = files.map(({ name, hash }, value) => ({
      name,
      value,
      message: name,
      hint: spacing(name) + hash
    }));
    const resolve2 = await enquirer.prompt({
      theme,
      message: label.Project,
      name: "project",
      type: "select",
      choices,
      result(name) {
        return Object.entries(this.map([name]))[0][1];
      }
    }).catch(cancel);
    return resolve2.project;
  }
}

// packages/config/dist/index.mjs
var r = { get dev() {
  return process.env.SYNCIFY_ENV === "dev";
}, get prod() {
  return process.env.SYNCIFY_ENV === "prod";
}, get watch() {
  return process.env.SYNCIFY_WATCH === "true";
} };
var t = (e2) => e2;

// syncify/index.ts
async function syncify() {
  await Configure().then(() => {
    if ($.mode.init) {
      Init();
    } else if ($.mode.link) {
      Link();
    } else if ($.mode.create) {
      Create();
    } else if ($.mode.projects) {
      Projects();
    } else if ($.mode.keychain) ; else {
      if ($.mode.build) {
        Build();
      } else if ($.mode.watch) {
        Watch();
      } else if ($.mode.push) {
        Push();
      } else if ($.mode.pull) {
        Pull();
      } else if ($.mode.pack) {
        Pack();
      } else if ($.mode.publish) {
        Publish();
      }
    }
  }).catch(internalError);
}

exports.$ = $;
exports.Be = Be;
exports.COMMAND_MODES = COMMAND_MODES;
exports.Ce = Ce;
exports.DIST_PATH = DIST_PATH;
exports.F = F;
exports.Fo = Fo;
exports.It = It;
exports.K = K;
exports.Li = Li;
exports.NooP = NooP;
exports.P = P;
exports.Pi = Pi;
exports.R = R;
exports.Ri = Ri;
exports.STRAP_EXAMPLES = STRAP_EXAMPLES;
exports.STRAP_THEMES = STRAP_THEMES;
exports.Y = Y;
exports._t = _t;
exports.a = a;
exports.assign = assign;
exports.eqWS = eqWS;
exports.event = event;
exports.fi = fi;
exports.forEach = forEach;
exports.forKeys = forKeys;
exports.g = g;
exports.includes = includes;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.jt = jt;
exports.li = li;
exports.log = log;
exports.mD = mD;
exports.o = o;
exports.oi = oi;
exports.pt = pt;
exports.r = r;
exports.runtime = runtime;
exports.syncify = syncify;
exports.t = t;
exports.throwCommand = throwCommand;
exports.toArray = toArray;
exports.w = w;
exports.y = y;
exports.ze = ze;
