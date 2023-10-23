'use strict';

var process3 = require('process');
var mm = require('minimist');
var glob6 = require('fast-glob');
var pathe = require('pathe');
var fsExtra = require('fs-extra');
var axios3 = require('axios');
var perf_hooks = require('perf_hooks');
var console$1 = require('console');
var events = require('events');
var module$1 = require('module');
var crypto = require('crypto');
var zlib2 = require('zlib');
var child_process = require('child_process');
var url = require('url');
var readline = require('readline');
require('util');
var notifier = require('node-notifier');
require('stream');
var os = require('os');
var prompts2 = require('prompts');
var timers = require('timers');
var anymatch3 = require('anymatch');
var htmlMinifierTerser = require('html-minifier-terser');
var cbor = require('cbor');
var writeFileAtomic = require('write-file-atomic');
var matter = require('gray-matter');
var markdown = require('markdown-it');
var turndown = require('@syncify/turndown');
var enquirer = require('enquirer');
var AdmZip = require('adm-zip');
var dotenv = require('dotenv');
var esbuild$1 = require('esbuild');
var http = require('http');
var statics = require('serve-static');
var handler = require('finalhandler');
var ngrok = require('ngrok');
var ws$1 = require('ws');
var chokidar = require('chokidar');
var treeKill = require('tree-kill');
var crossSpawn = require('cross-spawn');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var process3__default = /*#__PURE__*/_interopDefault(process3);
var mm__default = /*#__PURE__*/_interopDefault(mm);
var glob6__default = /*#__PURE__*/_interopDefault(glob6);
var axios3__default = /*#__PURE__*/_interopDefault(axios3);
var zlib2__default = /*#__PURE__*/_interopDefault(zlib2);
var notifier__default = /*#__PURE__*/_interopDefault(notifier);
var os__default = /*#__PURE__*/_interopDefault(os);
var prompts2__default = /*#__PURE__*/_interopDefault(prompts2);
var anymatch3__default = /*#__PURE__*/_interopDefault(anymatch3);
var cbor__default = /*#__PURE__*/_interopDefault(cbor);
var writeFileAtomic__default = /*#__PURE__*/_interopDefault(writeFileAtomic);
var matter__default = /*#__PURE__*/_interopDefault(matter);
var markdown__default = /*#__PURE__*/_interopDefault(markdown);
var AdmZip__default = /*#__PURE__*/_interopDefault(AdmZip);
var dotenv__default = /*#__PURE__*/_interopDefault(dotenv);
var http__default = /*#__PURE__*/_interopDefault(http);
var statics__default = /*#__PURE__*/_interopDefault(statics);
var handler__default = /*#__PURE__*/_interopDefault(handler);
var ngrok__default = /*#__PURE__*/_interopDefault(ngrok);
var treeKill__default = /*#__PURE__*/_interopDefault(treeKill);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
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

// node_modules/.pnpm/tsup@7.2.0_postcss@8.4.31_typescript@5.2.2/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl, importMetaUrl;
var init_cjs_shims = __esm({
  "node_modules/.pnpm/tsup@7.2.0_postcss@8.4.31_typescript@5.2.2/node_modules/tsup/assets/cjs_shims.js"() {
    getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
    importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    init_cjs_shims();
    var has3 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events2() {
    }
    if (Object.create) {
      Events2.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events2().__proto__)
        prefix = false;
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
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events2();
      else
        delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events2();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has3.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event2) {
      var evt = prefix ? prefix + event2 : event2, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event2) {
      var evt = prefix ? prefix + event2 : event2, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event2, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event2, listeners.fn, void 0, true);
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
          if (listeners[i].once)
            this.removeListener(event2, listeners[i].fn, void 0, true);
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
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
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
      if (!this._events[evt])
        return this;
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
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event2) {
      var evt;
      if (event2) {
        evt = prefix ? prefix + event2 : event2;
        if (this._events[evt])
          clearEvent(this, evt);
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
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter3;
    }
  }
});

// node_modules/.pnpm/ansis@1.5.6/node_modules/ansis/bundle.js
var require_bundle = __commonJS({
  "node_modules/.pnpm/ansis@1.5.6/node_modules/ansis/bundle.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var e2 = (e3) => {
      let [, t3] = /([a-f\d]{3,6})/i.exec(e3) || [], r2 = t3 ? t3.length : 0;
      if (3 === r2)
        t3 = t3[0] + t3[0] + t3[1] + t3[1] + t3[2] + t3[2];
      else if (6 !== r2)
        return [0, 0, 0];
      let n2 = parseInt(t3, 16);
      return [n2 >> 16 & 255, n2 >> 8 & 255, 255 & n2];
    };
    var t2 = (e3, t3, r2) => t3 > e3 ? t3 : e3 > r2 ? r2 : e3;
    var r = (e3, t3, r2) => {
      if ("" === t3)
        return e3;
      let n2 = e3.indexOf(t3);
      if (n2 < 0)
        return e3;
      let i2 = t3.length, o3 = 0, l2 = "";
      for (; ~n2; )
        l2 += e3.slice(o3, n2) + r2, o3 = n2 + i2, n2 = e3.indexOf(t3, o3);
      return l2 + e3.slice(o3);
    };
    var n = { open: "", close: "" };
    var i = ((e3) => {
      const t3 = (e4) => !!l2.find((t4) => e4.test(t4)), r2 = e3 || ("undefined" != typeof process ? process : {}), { stdout: n2, platform: i2 } = r2, o3 = r2.env || {}, l2 = r2.argv || [], s2 = "FORCE_COLOR" in o3, g2 = o3.FORCE_COLOR, c2 = "true" === g2 || parseInt(g2) > 0, a2 = "NO_COLOR" in o3 || s2 && !c2 || t3(/^-{1,2}(no-color|color=false|color=never)$/), b2 = s2 && c2 || t3(/^-{1,2}(color|color=true|color=always)$/), p2 = n2 && "isTTY" in n2 && /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o3.TERM);
      return !a2 && (b2 || p2 || "win32" === i2 || "CI" in o3);
    })() ? (e3, t3) => ({ open: `\x1B[${e3}m`, close: `\x1B[${t3}m` }) : () => n;
    var o2 = (e3, t3, r2) => i(`38;2;${e3};${t3};${r2}`, 39);
    var l = (e3, t3, r2) => i(`48;2;${e3};${t3};${r2}`, 49);
    var s = { visible: n, reset: i(0, 0), inverse: i(7, 27), hidden: i(8, 28), bold: i(1, 22), dim: i(2, 22), faint: i(2, 22), italic: i(3, 23), underline: i(4, 24), doubleUnderline: i(21, 24), strikethrough: i(9, 29), strike: i(9, 29), frame: i(51, 54), encircle: i(52, 54), overline: i(53, 55), black: i(30, 39), red: i(31, 39), green: i(32, 39), yellow: i(33, 39), blue: i(34, 39), magenta: i(35, 39), cyan: i(36, 39), white: i(37, 39), grey: i(90, 39), gray: i(90, 39), blackBright: i(90, 39), redBright: i(91, 39), greenBright: i(92, 39), yellowBright: i(93, 39), blueBright: i(94, 39), magentaBright: i(95, 39), cyanBright: i(96, 39), whiteBright: i(97, 39), bgBlack: i(40, 49), bgRed: i(41, 49), bgGreen: i(42, 49), bgYellow: i(43, 49), bgBlue: i(44, 49), bgMagenta: i(45, 49), bgCyan: i(46, 49), bgWhite: i(47, 49), bgBlackBright: i(100, 49), bgRedBright: i(101, 49), bgGreenBright: i(102, 49), bgYellowBright: i(103, 49), bgBlueBright: i(104, 49), bgMagentaBright: i(105, 49), bgCyanBright: i(106, 49), bgWhiteBright: i(107, 49) };
    var { defineProperty: g, defineProperties: c, setPrototypeOf: a } = Object;
    var b = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    var p = /(\r*\n)/g;
    var u = function() {
      const t3 = (e3) => e3;
      return t3.strip = (e3) => e3.replace(b, ""), t3.extend = (r2) => {
        for (let t4 in r2) {
          let n2 = r2[t4], i2 = null != n2.open ? n2 : o2(...e2(n2));
          B[t4] = { get() {
            const e3 = f(this, i2);
            return g(this, t4, { value: e3 }), e3;
          } };
        }
        O = c(() => {
        }, B), a(t3, O);
      }, t3.extend(s), t3;
    };
    var f = ({ props: e3 }, { open: t3, close: r2 }) => {
      const n2 = (e4, ...t4) => d(e4, t4, n2.props);
      let i2 = t3, o3 = r2;
      return void 0 !== e3 && (i2 = e3.openStack + t3, o3 = r2 + e3.closeStack), a(n2, O), n2.props = { open: t3, close: r2, openStack: i2, closeStack: o3, parent: e3 }, n2.open = i2, n2.close = o3, n2;
    };
    var d = (e3, t3, n2) => {
      if (!e3)
        return "";
      const { openStack: i2, closeStack: o3 } = n2;
      let l2 = null != e3.raw ? String.raw(e3, ...t3) : e3;
      if (~l2.indexOf("\x1B"))
        for (; void 0 !== n2; )
          l2 = r(l2, n2.close, n2.open), n2 = n2.parent;
      return ~l2.indexOf("\n") && (l2 = l2.replace(p, o3 + "$1" + i2)), i2 + l2 + o3;
    };
    var h = { ansi: (e3) => ((e4) => i(`38;5;${e4}`, 39))(t2(e3, 0, 255)), bgAnsi: (e3) => ((e4) => i(`48;5;${e4}`, 49))(t2(e3, 0, 255)), hex: (t3) => o2(...e2(t3)), bgHex: (t3) => l(...e2(t3)), rgb: (e3, r2, n2) => o2(t2(e3, 0, 255), t2(r2, 0, 255), t2(n2, 0, 255)), bgRgb: (e3, r2, n2) => l(t2(e3, 0, 255), t2(r2, 0, 255), t2(n2, 0, 255)) };
    var B = {};
    var O;
    for (let e3 in h)
      B[e3] = { get() {
        return (...t3) => f(this, h[e3](...t3));
      } };
    B.ansi256 = B.fg = B.ansi, B.bgAnsi256 = B.bg = B.bgAnsi;
    var x = new u();
    exports.Ansis = u, exports.default = x;
  }
});

// node_modules/.pnpm/ansis@1.5.6/node_modules/ansis/index.js
var require_ansis = __commonJS({
  "node_modules/.pnpm/ansis@1.5.6/node_modules/ansis/index.js"(exports, module) {
    init_cjs_shims();
    var bundle = require_bundle();
    module.exports = bundle.default;
    module.exports.Ansis = bundle.Ansis;
  }
});

// node_modules/.pnpm/eastasianwidth@0.2.0/node_modules/eastasianwidth/eastasianwidth.js
var require_eastasianwidth = __commonJS({
  "node_modules/.pnpm/eastasianwidth@0.2.0/node_modules/eastasianwidth/eastasianwidth.js"(exports, module) {
    init_cjs_shims();
    var eaw = {};
    if ("undefined" == typeof module) {
      window.eastasianwidth = eaw;
    } else {
      module.exports = eaw;
    }
    eaw.eastAsianWidth = function(character) {
      var x = character.charCodeAt(0);
      var y = character.length == 2 ? character.charCodeAt(1) : 0;
      var codePoint = x;
      if (55296 <= x && x <= 56319 && (56320 <= y && y <= 57343)) {
        x &= 1023;
        y &= 1023;
        codePoint = x << 10 | y;
        codePoint += 65536;
      }
      if (12288 == codePoint || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510) {
        return "F";
      }
      if (8361 == codePoint || 65377 <= codePoint && codePoint <= 65470 || 65474 <= codePoint && codePoint <= 65479 || 65482 <= codePoint && codePoint <= 65487 || 65490 <= codePoint && codePoint <= 65495 || 65498 <= codePoint && codePoint <= 65500 || 65512 <= codePoint && codePoint <= 65518) {
        return "H";
      }
      if (4352 <= codePoint && codePoint <= 4447 || 4515 <= codePoint && codePoint <= 4519 || 4602 <= codePoint && codePoint <= 4607 || 9001 <= codePoint && codePoint <= 9002 || 11904 <= codePoint && codePoint <= 11929 || 11931 <= codePoint && codePoint <= 12019 || 12032 <= codePoint && codePoint <= 12245 || 12272 <= codePoint && codePoint <= 12283 || 12289 <= codePoint && codePoint <= 12350 || 12353 <= codePoint && codePoint <= 12438 || 12441 <= codePoint && codePoint <= 12543 || 12549 <= codePoint && codePoint <= 12589 || 12593 <= codePoint && codePoint <= 12686 || 12688 <= codePoint && codePoint <= 12730 || 12736 <= codePoint && codePoint <= 12771 || 12784 <= codePoint && codePoint <= 12830 || 12832 <= codePoint && codePoint <= 12871 || 12880 <= codePoint && codePoint <= 13054 || 13056 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42124 || 42128 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 55216 <= codePoint && codePoint <= 55238 || 55243 <= codePoint && codePoint <= 55291 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65106 || 65108 <= codePoint && codePoint <= 65126 || 65128 <= codePoint && codePoint <= 65131 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127490 || 127504 <= codePoint && codePoint <= 127546 || 127552 <= codePoint && codePoint <= 127560 || 127568 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 194367 || 177984 <= codePoint && codePoint <= 196605 || 196608 <= codePoint && codePoint <= 262141) {
        return "W";
      }
      if (32 <= codePoint && codePoint <= 126 || 162 <= codePoint && codePoint <= 163 || 165 <= codePoint && codePoint <= 166 || 172 == codePoint || 175 == codePoint || 10214 <= codePoint && codePoint <= 10221 || 10629 <= codePoint && codePoint <= 10630) {
        return "Na";
      }
      if (161 == codePoint || 164 == codePoint || 167 <= codePoint && codePoint <= 168 || 170 == codePoint || 173 <= codePoint && codePoint <= 174 || 176 <= codePoint && codePoint <= 180 || 182 <= codePoint && codePoint <= 186 || 188 <= codePoint && codePoint <= 191 || 198 == codePoint || 208 == codePoint || 215 <= codePoint && codePoint <= 216 || 222 <= codePoint && codePoint <= 225 || 230 == codePoint || 232 <= codePoint && codePoint <= 234 || 236 <= codePoint && codePoint <= 237 || 240 == codePoint || 242 <= codePoint && codePoint <= 243 || 247 <= codePoint && codePoint <= 250 || 252 == codePoint || 254 == codePoint || 257 == codePoint || 273 == codePoint || 275 == codePoint || 283 == codePoint || 294 <= codePoint && codePoint <= 295 || 299 == codePoint || 305 <= codePoint && codePoint <= 307 || 312 == codePoint || 319 <= codePoint && codePoint <= 322 || 324 == codePoint || 328 <= codePoint && codePoint <= 331 || 333 == codePoint || 338 <= codePoint && codePoint <= 339 || 358 <= codePoint && codePoint <= 359 || 363 == codePoint || 462 == codePoint || 464 == codePoint || 466 == codePoint || 468 == codePoint || 470 == codePoint || 472 == codePoint || 474 == codePoint || 476 == codePoint || 593 == codePoint || 609 == codePoint || 708 == codePoint || 711 == codePoint || 713 <= codePoint && codePoint <= 715 || 717 == codePoint || 720 == codePoint || 728 <= codePoint && codePoint <= 731 || 733 == codePoint || 735 == codePoint || 768 <= codePoint && codePoint <= 879 || 913 <= codePoint && codePoint <= 929 || 931 <= codePoint && codePoint <= 937 || 945 <= codePoint && codePoint <= 961 || 963 <= codePoint && codePoint <= 969 || 1025 == codePoint || 1040 <= codePoint && codePoint <= 1103 || 1105 == codePoint || 8208 == codePoint || 8211 <= codePoint && codePoint <= 8214 || 8216 <= codePoint && codePoint <= 8217 || 8220 <= codePoint && codePoint <= 8221 || 8224 <= codePoint && codePoint <= 8226 || 8228 <= codePoint && codePoint <= 8231 || 8240 == codePoint || 8242 <= codePoint && codePoint <= 8243 || 8245 == codePoint || 8251 == codePoint || 8254 == codePoint || 8308 == codePoint || 8319 == codePoint || 8321 <= codePoint && codePoint <= 8324 || 8364 == codePoint || 8451 == codePoint || 8453 == codePoint || 8457 == codePoint || 8467 == codePoint || 8470 == codePoint || 8481 <= codePoint && codePoint <= 8482 || 8486 == codePoint || 8491 == codePoint || 8531 <= codePoint && codePoint <= 8532 || 8539 <= codePoint && codePoint <= 8542 || 8544 <= codePoint && codePoint <= 8555 || 8560 <= codePoint && codePoint <= 8569 || 8585 == codePoint || 8592 <= codePoint && codePoint <= 8601 || 8632 <= codePoint && codePoint <= 8633 || 8658 == codePoint || 8660 == codePoint || 8679 == codePoint || 8704 == codePoint || 8706 <= codePoint && codePoint <= 8707 || 8711 <= codePoint && codePoint <= 8712 || 8715 == codePoint || 8719 == codePoint || 8721 == codePoint || 8725 == codePoint || 8730 == codePoint || 8733 <= codePoint && codePoint <= 8736 || 8739 == codePoint || 8741 == codePoint || 8743 <= codePoint && codePoint <= 8748 || 8750 == codePoint || 8756 <= codePoint && codePoint <= 8759 || 8764 <= codePoint && codePoint <= 8765 || 8776 == codePoint || 8780 == codePoint || 8786 == codePoint || 8800 <= codePoint && codePoint <= 8801 || 8804 <= codePoint && codePoint <= 8807 || 8810 <= codePoint && codePoint <= 8811 || 8814 <= codePoint && codePoint <= 8815 || 8834 <= codePoint && codePoint <= 8835 || 8838 <= codePoint && codePoint <= 8839 || 8853 == codePoint || 8857 == codePoint || 8869 == codePoint || 8895 == codePoint || 8978 == codePoint || 9312 <= codePoint && codePoint <= 9449 || 9451 <= codePoint && codePoint <= 9547 || 9552 <= codePoint && codePoint <= 9587 || 9600 <= codePoint && codePoint <= 9615 || 9618 <= codePoint && codePoint <= 9621 || 9632 <= codePoint && codePoint <= 9633 || 9635 <= codePoint && codePoint <= 9641 || 9650 <= codePoint && codePoint <= 9651 || 9654 <= codePoint && codePoint <= 9655 || 9660 <= codePoint && codePoint <= 9661 || 9664 <= codePoint && codePoint <= 9665 || 9670 <= codePoint && codePoint <= 9672 || 9675 == codePoint || 9678 <= codePoint && codePoint <= 9681 || 9698 <= codePoint && codePoint <= 9701 || 9711 == codePoint || 9733 <= codePoint && codePoint <= 9734 || 9737 == codePoint || 9742 <= codePoint && codePoint <= 9743 || 9748 <= codePoint && codePoint <= 9749 || 9756 == codePoint || 9758 == codePoint || 9792 == codePoint || 9794 == codePoint || 9824 <= codePoint && codePoint <= 9825 || 9827 <= codePoint && codePoint <= 9829 || 9831 <= codePoint && codePoint <= 9834 || 9836 <= codePoint && codePoint <= 9837 || 9839 == codePoint || 9886 <= codePoint && codePoint <= 9887 || 9918 <= codePoint && codePoint <= 9919 || 9924 <= codePoint && codePoint <= 9933 || 9935 <= codePoint && codePoint <= 9953 || 9955 == codePoint || 9960 <= codePoint && codePoint <= 9983 || 10045 == codePoint || 10071 == codePoint || 10102 <= codePoint && codePoint <= 10111 || 11093 <= codePoint && codePoint <= 11097 || 12872 <= codePoint && codePoint <= 12879 || 57344 <= codePoint && codePoint <= 63743 || 65024 <= codePoint && codePoint <= 65039 || 65533 == codePoint || 127232 <= codePoint && codePoint <= 127242 || 127248 <= codePoint && codePoint <= 127277 || 127280 <= codePoint && codePoint <= 127337 || 127344 <= codePoint && codePoint <= 127386 || 917760 <= codePoint && codePoint <= 917999 || 983040 <= codePoint && codePoint <= 1048573 || 1048576 <= codePoint && codePoint <= 1114109) {
        return "A";
      }
      return "N";
    };
    eaw.characterLength = function(character) {
      var code = this.eastAsianWidth(character);
      if (code == "F" || code == "W" || code == "A") {
        return 2;
      } else {
        return 1;
      }
    };
    function stringToArray(string) {
      return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    }
    eaw.length = function(string) {
      var characters = stringToArray(string);
      var len = 0;
      for (var i = 0; i < characters.length; i++) {
        len = len + this.characterLength(characters[i]);
      }
      return len;
    };
    eaw.slice = function(text, start, end) {
      textLen = eaw.length(text);
      start = start ? start : 0;
      end = end ? end : 1;
      if (start < 0) {
        start = textLen + start;
      }
      if (end < 0) {
        end = textLen + end;
      }
      var result = "";
      var eawLen = 0;
      var chars = stringToArray(text);
      for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var charLen = eaw.length(char);
        if (eawLen >= start - (charLen == 2 ? 1 : 0)) {
          if (eawLen + charLen <= end) {
            result += char;
          } else {
            break;
          }
        }
        eawLen += charLen;
      }
      return result;
    };
  }
});

// node_modules/.pnpm/emoji-regex@9.2.2/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/.pnpm/emoji-regex@9.2.2/node_modules/emoji-regex/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js"(exports, module) {
    init_cjs_shims();
    var mimicFn = (to, from) => {
      for (const prop of Reflect.ownKeys(from)) {
        Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
      }
      return to;
    };
    module.exports = mimicFn;
    module.exports.default = mimicFn;
  }
});

// node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js
var require_onetime = __commonJS({
  "node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js"(exports, module) {
    init_cjs_shims();
    var mimicFn = require_mimic_fn();
    var calledFunctions = /* @__PURE__ */ new WeakMap();
    var onetime2 = (function_, options = {}) => {
      if (typeof function_ !== "function") {
        throw new TypeError("Expected a function");
      }
      let returnValue;
      let callCount = 0;
      const functionName = function_.displayName || function_.name || "<anonymous>";
      const onetime3 = function(...arguments_) {
        calledFunctions.set(onetime3, ++callCount);
        if (callCount === 1) {
          returnValue = function_.apply(this, arguments_);
          function_ = null;
        } else if (options.throw === true) {
          throw new Error(`Function \`${functionName}\` can only be called once`);
        }
        return returnValue;
      };
      mimicFn(onetime3, function_);
      calledFunctions.set(onetime3, callCount);
      return onetime3;
    };
    module.exports = onetime2;
    module.exports.default = onetime2;
    module.exports.callCount = (function_) => {
      if (!calledFunctions.has(function_)) {
        throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
      }
      return calledFunctions.get(function_);
    };
  }
});

// node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
var require_signals = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js"(exports, module) {
    init_cjs_shims();
    module.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module.exports.push(
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
      module.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  }
});

// node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
var require_signal_exit = __commonJS({
  "node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js"(exports, module) {
    init_cjs_shims();
    var process6 = global.process;
    var processOk = function(process7) {
      return process7 && typeof process7 === "object" && typeof process7.removeListener === "function" && typeof process7.emit === "function" && typeof process7.reallyExit === "function" && typeof process7.listeners === "function" && typeof process7.kill === "function" && typeof process7.pid === "number" && typeof process7.on === "function";
    };
    if (!processOk(process6)) {
      module.exports = function() {
        return function() {
        };
      };
    } else {
      assert = __require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process6.platform);
      EE = __require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process6.__signal_exit_emitter__) {
        emitter = process6.__signal_exit_emitter__;
      } else {
        emitter = process6.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module.exports = function(cb, opts) {
        if (!processOk(global.process)) {
          return function() {
          };
        }
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load3();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      unload = function unload2() {
        if (!loaded || !processOk(global.process)) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process6.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process6.emit = originalProcessEmit;
        process6.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module.exports.unload = unload;
      emit = function emit2(event2, code, signal) {
        if (emitter.emitted[event2]) {
          return;
        }
        emitter.emitted[event2] = true;
        emitter.emit(event2, code, signal);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (!processOk(global.process)) {
            return;
          }
          var listeners = process6.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process6.kill(process6.pid, sig);
          }
        };
      });
      module.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load3 = function load4() {
        if (loaded || !processOk(global.process)) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process6.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process6.emit = processEmit;
        process6.reallyExit = processReallyExit;
      };
      module.exports.load = load3;
      originalProcessReallyExit = process6.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process6.exitCode = code || /* istanbul ignore next */
        0;
        emit("exit", process6.exitCode, null);
        emit("afterexit", process6.exitCode, null);
        originalProcessReallyExit.call(process6, process6.exitCode);
      };
      originalProcessEmit = process6.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process6.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process6.exitCode, null);
          emit("afterexit", process6.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      };
    }
    var assert;
    var signals;
    var isWin;
    var EE;
    var emitter;
    var unload;
    var emit;
    var sigListeners;
    var loaded;
    var load3;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "node_modules/.pnpm/is-arrayish@0.2.1/node_modules/is-arrayish/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function isArrayish(obj) {
      if (!obj) {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && obj.splice instanceof Function;
    };
  }
});

// node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js
var require_error_ex = __commonJS({
  "node_modules/.pnpm/error-ex@1.3.2/node_modules/error-ex/index.js"(exports, module) {
    init_cjs_shims();
    var util = __require("util");
    var isArrayish = require_is_arrayish();
    var errorEx2 = function errorEx3(name, properties) {
      if (!name || name.constructor !== String) {
        properties = name || {};
        name = Error.name;
      }
      var errorExError = function ErrorEXError(message) {
        if (!this) {
          return new ErrorEXError(message);
        }
        message = message instanceof Error ? message.message : message || this.message;
        Error.call(this, message);
        Error.captureStackTrace(this, errorExError);
        this.name = name;
        Object.defineProperty(this, "message", {
          configurable: true,
          enumerable: false,
          get: function() {
            var newMessage = message.split(/\r?\n/g);
            for (var key in properties) {
              if (!properties.hasOwnProperty(key)) {
                continue;
              }
              var modifier = properties[key];
              if ("message" in modifier) {
                newMessage = modifier.message(this[key], newMessage) || newMessage;
                if (!isArrayish(newMessage)) {
                  newMessage = [newMessage];
                }
              }
            }
            return newMessage.join("\n");
          },
          set: function(v) {
            message = v;
          }
        });
        var overwrittenStack = null;
        var stackDescriptor = Object.getOwnPropertyDescriptor(this, "stack");
        var stackGetter = stackDescriptor.get;
        var stackValue = stackDescriptor.value;
        delete stackDescriptor.value;
        delete stackDescriptor.writable;
        stackDescriptor.set = function(newstack) {
          overwrittenStack = newstack;
        };
        stackDescriptor.get = function() {
          var stack = (overwrittenStack || (stackGetter ? stackGetter.call(this) : stackValue)).split(/\r?\n+/g);
          if (!overwrittenStack) {
            stack[0] = this.name + ": " + this.message;
          }
          var lineCount = 1;
          for (var key in properties) {
            if (!properties.hasOwnProperty(key)) {
              continue;
            }
            var modifier = properties[key];
            if ("line" in modifier) {
              var line2 = modifier.line(this[key]);
              if (line2) {
                stack.splice(lineCount++, 0, "    " + line2);
              }
            }
            if ("stack" in modifier) {
              modifier.stack(this[key], stack);
            }
          }
          return stack.join("\n");
        };
        Object.defineProperty(this, "stack", stackDescriptor);
      };
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(errorExError.prototype, Error.prototype);
        Object.setPrototypeOf(errorExError, Error);
      } else {
        util.inherits(errorExError, Error);
      }
      return errorExError;
    };
    errorEx2.append = function(str, def) {
      return {
        message: function(v, message) {
          v = v || def;
          if (v) {
            message[0] += " " + str.replace("%s", v.toString());
          }
          return message;
        }
      };
    };
    errorEx2.line = function(str, def) {
      return {
        line: function(v) {
          v = v || def;
          if (v) {
            return str.replace("%s", v.toString());
          }
          return null;
        }
      };
    };
    module.exports = errorEx2;
  }
});

// node_modules/.pnpm/json-parse-even-better-errors@3.0.0/node_modules/json-parse-even-better-errors/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/json-parse-even-better-errors@3.0.0/node_modules/json-parse-even-better-errors/lib/index.js"(exports, module) {
    init_cjs_shims();
    var hexify = (char) => {
      const h = char.charCodeAt(0).toString(16).toUpperCase();
      return "0x" + (h.length % 2 ? "0" : "") + h;
    };
    var parseError2 = (e2, txt, context) => {
      if (!txt) {
        return {
          message: e2.message + " while parsing empty string",
          position: 0
        };
      }
      const badToken = e2.message.match(/^Unexpected token (.) .*position\s+(\d+)/i);
      const errIdx = badToken ? +badToken[2] : e2.message.match(/^Unexpected end of JSON.*/i) ? txt.length - 1 : null;
      const msg = badToken ? e2.message.replace(/^Unexpected token ./, `Unexpected token ${JSON.stringify(badToken[1])} (${hexify(badToken[1])})`) : e2.message;
      if (errIdx !== null && errIdx !== void 0) {
        const start = errIdx <= context ? 0 : errIdx - context;
        const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
        const slice = (start === 0 ? "" : "...") + txt.slice(start, end) + (end === txt.length ? "" : "...");
        const near = txt === slice ? "" : "near ";
        return {
          message: msg + ` while parsing ${near}${JSON.stringify(slice)}`,
          position: errIdx
        };
      } else {
        return {
          message: msg + ` while parsing '${txt.slice(0, context * 2)}'`,
          position: 0
        };
      }
    };
    var JSONParseError = class extends SyntaxError {
      constructor(er, txt, context, caller) {
        context = context || 20;
        const metadata = parseError2(er, txt, context);
        super(metadata.message);
        Object.assign(this, metadata);
        this.code = "EJSONPARSE";
        this.systemError = er;
        Error.captureStackTrace(this, caller || this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
      set name(n) {
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    var kIndent = Symbol.for("indent");
    var kNewline = Symbol.for("newline");
    var formatRE = /^\s*[{[]((?:\r?\n)+)([\s\t]*)/;
    var emptyRE = /^(?:\{\}|\[\])((?:\r?\n)+)?$/;
    var parseJson2 = (txt, reviver, context) => {
      const parseText = stripBOM(txt);
      context = context || 20;
      try {
        const [, newline = "\n", indent = "  "] = parseText.match(emptyRE) || parseText.match(formatRE) || [null, "", ""];
        const result = JSON.parse(parseText, reviver);
        if (result && typeof result === "object") {
          result[kNewline] = newline;
          result[kIndent] = indent;
        }
        return result;
      } catch (e2) {
        if (typeof txt !== "string" && !Buffer.isBuffer(txt)) {
          const isEmptyArray = Array.isArray(txt) && txt.length === 0;
          throw Object.assign(new TypeError(
            `Cannot parse ${isEmptyArray ? "an empty array" : String(txt)}`
          ), {
            code: "EJSONPARSE",
            systemError: e2
          });
        }
        throw new JSONParseError(e2, parseText, context, parseJson2);
      }
    };
    var stripBOM = (txt) => String(txt).replace(/^\uFEFF/, "");
    module.exports = parseJson2;
    parseJson2.JSONParseError = JSONParseError;
    parseJson2.noExceptions = (txt, reviver) => {
      try {
        return JSON.parse(stripBOM(txt), reviver);
      } catch (e2) {
      }
    };
  }
});

// node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
  "node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports.matchToToken = function(match2) {
      var token = { type: "invalid", value: match2[0], closed: void 0 };
      if (match2[1])
        token.type = "string", token.closed = !!(match2[3] || match2[4]);
      else if (match2[5])
        token.type = "comment";
      else if (match2[6])
        token.type = "comment", token.closed = !!match2[7];
      else if (match2[8])
        token.type = "regex";
      else if (match2[9])
        token.type = "number";
      else if (match2[10])
        token.type = "name";
      else if (match2[11])
        token.type = "punctuator";
      else if (match2[12])
        token.type = "whitespace";
      return token;
    };
  }
});

// node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isIdentifierChar = isIdentifierChar;
    exports.isIdentifierName = isIdentifierName;
    exports.isIdentifierStart = isIdentifierStart;
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
        if (pos > code)
          return false;
        pos += set[i + 1];
        if (pos >= code)
          return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65)
        return code === 36;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48)
        return code === 36;
      if (code < 58)
        return true;
      if (code < 65)
        return false;
      if (code <= 90)
        return true;
      if (code < 97)
        return code === 95;
      if (code <= 122)
        return true;
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
    init_cjs_shims();
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.22.20/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
    init_cjs_shims();
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

// node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports, module) {
    init_cjs_shims();
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/.pnpm/color-name@1.1.3/node_modules/color-name/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = {
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
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/conversions.js"(exports, module) {
    init_cjs_shims();
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (key in cssKeywords) {
      if (cssKeywords.hasOwnProperty(key)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
    }
    var key;
    var convert = module.exports = {
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
    convert.rgb.hsl = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
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
    convert.rgb.hsv = function(rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
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
    convert.rgb.hwb = function(rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
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
    convert.rgb.keyword = function(rgb) {
      var reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      var currentClosestDistance = Infinity;
      var currentClosestKeyword;
      for (var keyword in cssKeywords) {
        if (cssKeywords.hasOwnProperty(keyword)) {
          var value = cssKeywords[keyword];
          var distance = comparativeDistance(rgb, value);
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
    convert.rgb.xyz = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      var xyz = convert.rgb.xyz(rgb);
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
      var rgb;
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
      rgb = [0, 0, 0];
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
        rgb[i] = val * 255;
      }
      return rgb;
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
      var t2 = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t2, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t2];
        case 3:
          return [p, q, v];
        case 4:
          return [t2, p, v];
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
    convert.rgb.hcg = function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
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
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = convert.gray.hsv = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hwb = function(gray2) {
      return [0, 100, gray2[0]];
    };
    convert.gray.cmyk = function(gray2) {
      return [0, 0, 0, gray2[0]];
    };
    convert.gray.lab = function(gray2) {
      return [gray2[0], 0, 0];
    };
    convert.gray.hex = function(gray2) {
      var val = Math.round(gray2[0] / 100 * 255) & 255;
      var integer = (val << 16) + (val << 8) + val;
      var string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/route.js"(exports, module) {
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
    function link(from, to) {
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
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path2;
      return fn;
    }
    module.exports = function(fromModel) {
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
  "node_modules/.pnpm/color-convert@1.9.3/node_modules/color-convert/index.js"(exports, module) {
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
    module.exports = convert;
  }
});

// node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/.pnpm/ansi-styles@3.2.1/node_modules/ansi-styles/index.js"(exports, module) {
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
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
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
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles2
    });
  }
});

// node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = (flag, argv5) => {
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
  "node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module) {
    init_cjs_shims();
    var os2 = __require("os");
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
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js
var require_templates = __commonJS({
  "node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/templates.js"(exports, module) {
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
    module.exports = (chalk, tmp) => {
      const styles2 = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style2, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style2) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles2.length === 0 ? str : buildStyle(chalk, styles2)(str));
          styles2.push({ inverse, styles: parseStyle(style2) });
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
  "node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js"(exports, module) {
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
    module.exports = Chalk();
    module.exports.supportsColor = stdoutColor;
    module.exports.default = module.exports;
  }
});

// node_modules/.pnpm/@babel+highlight@7.22.20/node_modules/@babel/highlight/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@babel+highlight@7.22.20/node_modules/@babel/highlight/lib/index.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = highlight2;
    exports.shouldHighlight = shouldHighlight;
    var _jsTokens = require_js_tokens();
    var _helperValidatorIdentifier = require_lib2();
    var _chalk = _interopRequireWildcard(require_chalk(), true);
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    function getDefs(chalk) {
      return {
        keyword: chalk.cyan,
        capitalized: chalk.yellow,
        jsxIdentifier: chalk.yellow,
        punctuator: chalk.yellow,
        number: chalk.magenta,
        string: chalk.green,
        regex: chalk.magenta,
        comment: chalk.grey,
        invalid: chalk.white.bgRed.bold
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET = /^[()[\]{}]$/;
    var tokenize;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType = function(token, offset, text) {
        if (token.type === "name") {
          if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, true) || sometimesKeywords.has(token.value)) {
            return "keyword";
          }
          if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.slice(offset - 2, offset) == "</")) {
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
      tokenize = function* (text) {
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
      } of tokenize(text)) {
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
      return _chalk.default.level > 0 || options.forceColor;
    }
    var chalkWithForcedColor = void 0;
    function getChalk(forceColor) {
      if (forceColor) {
        var _chalkWithForcedColor;
        (_chalkWithForcedColor = chalkWithForcedColor) != null ? _chalkWithForcedColor : chalkWithForcedColor = new _chalk.default.constructor({
          enabled: true,
          level: 1
        });
        return chalkWithForcedColor;
      }
      return _chalk.default;
    }
    {
      exports.getChalk = (options) => getChalk(options.forceColor);
    }
    function highlight2(code, options = {}) {
      if (code !== "" && shouldHighlight(options)) {
        const defs = getDefs(getChalk(options.forceColor));
        return highlightTokens(defs, code);
      } else {
        return code;
      }
    }
  }
});

// node_modules/.pnpm/@babel+code-frame@7.22.13/node_modules/@babel/code-frame/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/@babel+code-frame@7.22.13/node_modules/@babel/code-frame/lib/index.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.codeFrameColumns = codeFrameColumns2;
    exports.default = _default;
    var _highlight = require_lib3();
    var _chalk = _interopRequireWildcard(require_chalk(), true);
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var chalkWithForcedColor = void 0;
    function getChalk(forceColor) {
      if (forceColor) {
        var _chalkWithForcedColor;
        (_chalkWithForcedColor = chalkWithForcedColor) != null ? _chalkWithForcedColor : chalkWithForcedColor = new _chalk.default.constructor({
          enabled: true,
          level: 1
        });
        return chalkWithForcedColor;
      }
      return _chalk.default;
    }
    var deprecationWarningShown = false;
    function getDefs(chalk) {
      return {
        gutter: chalk.grey,
        marker: chalk.red.bold,
        message: chalk.red.bold
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
      const chalk = getChalk(opts.forceColor);
      const defs = getDefs(chalk);
      const maybeHighlight = (chalkFn, string) => {
        return highlighted ? chalkFn(string) : string;
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
      let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line2, index) => {
        const number = start + 1 + index;
        const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
        const gutter = ` ${paddedNumber} |`;
        const hasMarker = markerLines[number];
        const lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line2.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
            const numberOfMarkers = hasMarker[1] || 1;
            markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
            if (lastMarkerLine && opts.message) {
              markerLine += " " + maybeHighlight(defs.message, opts.message);
            }
          }
          return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line2.length > 0 ? ` ${line2}` : "", markerLine].join("");
        } else {
          return ` ${maybeHighlight(defs.gutter, gutter)}${line2.length > 0 ? ` ${line2}` : ""}`;
        }
      }).join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (highlighted) {
        return chalk.reset(frame);
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

// node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js"(exports, module) {
    init_cjs_shims();
    var ansiRegex2 = require_ansi_regex();
    module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex2(), "") : string;
  }
});

// node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS({
  "node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js"(exports, module) {
    init_cjs_shims();
    var isFullwidthCodePoint2 = (codePoint) => {
      if (Number.isNaN(codePoint)) {
        return false;
      }
      if (codePoint >= 4352 && (codePoint <= 4447 || // Hangul Jamo
      codePoint === 9001 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 9002 || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      12880 <= codePoint && codePoint <= 19903 || // CJK Unified Ideographs .. Yi Radicals
      19968 <= codePoint && codePoint <= 42182 || // Hangul Jamo Extended-A
      43360 <= codePoint && codePoint <= 43388 || // Hangul Syllables
      44032 <= codePoint && codePoint <= 55203 || // CJK Compatibility Ideographs
      63744 <= codePoint && codePoint <= 64255 || // Vertical Forms
      65040 <= codePoint && codePoint <= 65049 || // CJK Compatibility Forms .. Small Form Variants
      65072 <= codePoint && codePoint <= 65131 || // Halfwidth and Fullwidth Forms
      65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || // Kana Supplement
      110592 <= codePoint && codePoint <= 110593 || // Enclosed Ideographic Supplement
      127488 <= codePoint && codePoint <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      131072 <= codePoint && codePoint <= 262141)) {
        return true;
      }
      return false;
    };
    module.exports = isFullwidthCodePoint2;
    module.exports.default = isFullwidthCodePoint2;
  }
});

// node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js
var require_emoji_regex2 = __commonJS({
  "node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js
var require_string_width = __commonJS({
  "node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js"(exports, module) {
    init_cjs_shims();
    var stripAnsi2 = require_strip_ansi();
    var isFullwidthCodePoint2 = require_is_fullwidth_code_point();
    var emojiRegex2 = require_emoji_regex2();
    var stringWidth2 = (string) => {
      if (typeof string !== "string" || string.length === 0) {
        return 0;
      }
      string = stripAnsi2(string);
      if (string.length === 0) {
        return 0;
      }
      string = string.replace(emojiRegex2(), "  ");
      let width = 0;
      for (let i = 0; i < string.length; i++) {
        const code = string.codePointAt(i);
        if (code <= 31 || code >= 127 && code <= 159) {
          continue;
        }
        if (code >= 768 && code <= 879) {
          continue;
        }
        if (code > 65535) {
          i++;
        }
        width += isFullwidthCodePoint2(code) ? 2 : 1;
      }
      return width;
    };
    module.exports = stringWidth2;
    module.exports.default = stringWidth2;
  }
});

// node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
var require_color_name2 = __commonJS({
  "node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = {
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

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
var require_conversions2 = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports, module) {
    init_cjs_shims();
    var cssKeywords = require_color_name2();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
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
    module.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
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
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
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
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
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
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t2 = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t2, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t2];
        case 3:
          return [p, q, v];
        case 4:
          return [t2, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
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
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match2 = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match2) {
        return [0, 0, 0];
      }
      let colorString = match2[0];
      if (match2[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
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
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
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
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray2) {
      return [0, 100, gray2[0]];
    };
    convert.gray.cmyk = function(gray2) {
      return [0, 0, 0, gray2[0]];
    };
    convert.gray.lab = function(gray2) {
      return [gray2[0], 0, 0];
    };
    convert.gray.hex = function(gray2) {
      const val = Math.round(gray2[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
var require_route2 = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports, module) {
    init_cjs_shims();
    var conversions = require_conversions2();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
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
      const graph = buildGraph();
      const queue2 = [fromModel];
      graph[fromModel].distance = 0;
      while (queue2.length) {
        const current = queue2.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue2.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path2 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path2.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path2;
      return fn;
    }
    module.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
var require_color_convert2 = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports, module) {
    init_cjs_shims();
    var conversions = require_conversions2();
    var route = require_route2();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
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
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  }
});

// node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
var require_ansi_styles2 = __commonJS({
  "node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports, module) {
    init_cjs_shims();
    var wrapAnsi162 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi2562 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m2 = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object2, property, get3) => {
      Object.defineProperty(object2, property, {
        get: () => {
          const value = get3();
          Object.defineProperty(object2, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert2();
      }
      const offset = isBackground ? 10 : 0;
      const styles2 = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles2[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles2[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles2;
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
          // Bright color
          blackBright: [90, 39],
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
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group2] of Object.entries(styles2)) {
        for (const [styleName, style2] of Object.entries(group2)) {
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
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      setLazyProperty(styles2.color, "ansi", () => makeDynamicStyles(wrapAnsi162, "ansi16", ansi2ansi, false));
      setLazyProperty(styles2.color, "ansi256", () => makeDynamicStyles(wrapAnsi2562, "ansi256", ansi2ansi, false));
      setLazyProperty(styles2.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m2, "rgb", rgb2rgb, false));
      setLazyProperty(styles2.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi162, "ansi16", ansi2ansi, true));
      setLazyProperty(styles2.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi2562, "ansi256", ansi2ansi, true));
      setLazyProperty(styles2.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m2, "rgb", rgb2rgb, true));
      return styles2;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles2
    });
  }
});

// node_modules/.pnpm/wrap-ansi@7.0.0/node_modules/wrap-ansi/index.js
var require_wrap_ansi = __commonJS({
  "node_modules/.pnpm/wrap-ansi@7.0.0/node_modules/wrap-ansi/index.js"(exports, module) {
    init_cjs_shims();
    var stringWidth2 = require_string_width();
    var stripAnsi2 = require_strip_ansi();
    var ansiStyles2 = require_ansi_styles2();
    var ESCAPES3 = /* @__PURE__ */ new Set([
      "\x1B",
      "\x9B"
    ]);
    var END_CODE2 = 39;
    var ANSI_ESCAPE_BELL2 = "\x07";
    var ANSI_CSI2 = "[";
    var ANSI_OSC2 = "]";
    var ANSI_SGR_TERMINATOR2 = "m";
    var ANSI_ESCAPE_LINK2 = `${ANSI_OSC2}8;;`;
    var wrapAnsi3 = (code) => `${ESCAPES3.values().next().value}${ANSI_CSI2}${code}${ANSI_SGR_TERMINATOR2}`;
    var wrapAnsiHyperlink2 = (uri) => `${ESCAPES3.values().next().value}${ANSI_ESCAPE_LINK2}${uri}${ANSI_ESCAPE_BELL2}`;
    var wordLengths2 = (string) => string.split(" ").map((character) => stringWidth2(character));
    var wrapWord2 = (rows, word, columns) => {
      const characters = [...word];
      let isInsideEscape = false;
      let isInsideLinkEscape = false;
      let visible = stringWidth2(stripAnsi2(rows[rows.length - 1]));
      for (const [index, character] of characters.entries()) {
        const characterLength = stringWidth2(character);
        if (visible + characterLength <= columns) {
          rows[rows.length - 1] += character;
        } else {
          rows.push(character);
          visible = 0;
        }
        if (ESCAPES3.has(character)) {
          isInsideEscape = true;
          isInsideLinkEscape = characters.slice(index + 1).join("").startsWith(ANSI_ESCAPE_LINK2);
        }
        if (isInsideEscape) {
          if (isInsideLinkEscape) {
            if (character === ANSI_ESCAPE_BELL2) {
              isInsideEscape = false;
              isInsideLinkEscape = false;
            }
          } else if (character === ANSI_SGR_TERMINATOR2) {
            isInsideEscape = false;
          }
          continue;
        }
        visible += characterLength;
        if (visible === columns && index < characters.length - 1) {
          rows.push("");
          visible = 0;
        }
      }
      if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
        rows[rows.length - 2] += rows.pop();
      }
    };
    var stringVisibleTrimSpacesRight2 = (string) => {
      const words = string.split(" ");
      let last2 = words.length;
      while (last2 > 0) {
        if (stringWidth2(words[last2 - 1]) > 0) {
          break;
        }
        last2--;
      }
      if (last2 === words.length) {
        return string;
      }
      return words.slice(0, last2).join(" ") + words.slice(last2).join("");
    };
    var exec3 = (string, columns, options = {}) => {
      if (options.trim !== false && string.trim() === "") {
        return "";
      }
      let returnValue = "";
      let escapeCode;
      let escapeUrl;
      const lengths = wordLengths2(string);
      let rows = [""];
      for (const [index, word] of string.split(" ").entries()) {
        if (options.trim !== false) {
          rows[rows.length - 1] = rows[rows.length - 1].trimStart();
        }
        let rowLength = stringWidth2(rows[rows.length - 1]);
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
          wrapWord2(rows, word, columns);
          continue;
        }
        if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
          if (options.wordWrap === false && rowLength < columns) {
            wrapWord2(rows, word, columns);
            continue;
          }
          rows.push("");
        }
        if (rowLength + lengths[index] > columns && options.wordWrap === false) {
          wrapWord2(rows, word, columns);
          continue;
        }
        rows[rows.length - 1] += word;
      }
      if (options.trim !== false) {
        rows = rows.map(stringVisibleTrimSpacesRight2);
      }
      const pre = [...rows.join("\n")];
      for (const [index, character] of pre.entries()) {
        returnValue += character;
        if (ESCAPES3.has(character)) {
          const { groups } = new RegExp(`(?:\\${ANSI_CSI2}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK2}(?<uri>.*)${ANSI_ESCAPE_BELL2})`).exec(pre.slice(index).join("")) || { groups: {} };
          if (groups.code !== void 0) {
            const code2 = Number.parseFloat(groups.code);
            escapeCode = code2 === END_CODE2 ? void 0 : code2;
          } else if (groups.uri !== void 0) {
            escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
          }
        }
        const code = ansiStyles2.codes.get(Number(escapeCode));
        if (pre[index + 1] === "\n") {
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink2("");
          }
          if (escapeCode && code) {
            returnValue += wrapAnsi3(code);
          }
        } else if (character === "\n") {
          if (escapeCode && code) {
            returnValue += wrapAnsi3(escapeCode);
          }
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink2(escapeUrl);
          }
        }
      }
      return returnValue;
    };
    module.exports = (string, columns, options) => {
      return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line2) => exec3(line2, columns, options)).join("\n");
    };
  }
});

// node_modules/.pnpm/scrollable-cli@1.0.2/node_modules/scrollable-cli/dist/scrollable.js
var require_scrollable = __commonJS({
  "node_modules/.pnpm/scrollable-cli@1.0.2/node_modules/scrollable-cli/dist/scrollable.js"(exports) {
    init_cjs_shims();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scrollable = void 0;
    var wrap_ansi_1 = __importDefault(require_wrap_ansi());
    var Scrollable = class {
      /**
       * The options for the Scrollable instance.
       */
      get options() {
        return this._options;
      }
      /**
       * Creates a new Scrollable instance.
       * @param options - The options for the Scrollable instance.
       */
      constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        this.lines = [];
        this.currentLine = 0;
        this._options = {
          content: options === null || options === void 0 ? void 0 : options.content,
          start: {
            x: (_b = (_a = options === null || options === void 0 ? void 0 : options.start) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0,
            y: (_d = (_c = options === null || options === void 0 ? void 0 : options.start) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0
          },
          stdout: (_e = options === null || options === void 0 ? void 0 : options.stdout) !== null && _e !== void 0 ? _e : process.stdout,
          size: {
            width: (_j = (_g = (_f = options === null || options === void 0 ? void 0 : options.size) === null || _f === void 0 ? void 0 : _f.width) !== null && _g !== void 0 ? _g : (_h = options === null || options === void 0 ? void 0 : options.stdout) === null || _h === void 0 ? void 0 : _h.columns) !== null && _j !== void 0 ? _j : process.stdout.columns,
            height: (_o = (_l = (_k = options === null || options === void 0 ? void 0 : options.size) === null || _k === void 0 ? void 0 : _k.height) !== null && _l !== void 0 ? _l : (_m = options === null || options === void 0 ? void 0 : options.stdout) === null || _m === void 0 ? void 0 : _m.rows) !== null && _o !== void 0 ? _o : process.stdout.rows
          },
          wrapOptions: {
            hard: (_q = (_p = options === null || options === void 0 ? void 0 : options.wrapOptions) === null || _p === void 0 ? void 0 : _p.hard) !== null && _q !== void 0 ? _q : false,
            wordWrap: (_s = (_r = options === null || options === void 0 ? void 0 : options.wrapOptions) === null || _r === void 0 ? void 0 : _r.wordWrap) !== null && _s !== void 0 ? _s : true,
            trim: (_u = (_t = options === null || options === void 0 ? void 0 : options.wrapOptions) === null || _t === void 0 ? void 0 : _t.trim) !== null && _u !== void 0 ? _u : true
          }
        };
      }
      /**
       * Sets the content to display in the scrollable area.
       * @param content - The content to display.
       * @returns The Scrollable instance.
       */
      setContent(content) {
        this._options.content = content;
        this.resetLines();
        return this;
      }
      /**
       * Sets the starting position of the scrollable area.
       * @param start - The starting position.
       * @returns The Scrollable instance.
       */
      setStart(start) {
        this._options.start = start;
        this.resetLines();
        return this;
      }
      /**
       * Sets the size of the scrollable area.
       * @param size - The size.
       * @returns The Scrollable instance.
       */
      setSize(size2) {
        this._options.size = size2;
        this.resetLines();
        return this;
      }
      /**
       * Sets the options for wrapping the content in the scrollable area.
       * @param wrapOptions - The options for wrapping the content.
       * @returns The Scrollable instance.
       */
      setWrapOptions(wrapOptions) {
        this._options.wrapOptions = wrapOptions;
        this.resetLines();
        return this;
      }
      /**
       * Prints the scrollable area to the console.
       * @returns The Scrollable instance.
       */
      print() {
        if (this.lines.length == 0)
          this.splitContentIntoLines();
        const { x, y } = this._options.start;
        const { width, height } = this._options.size;
        const emptyLine = Array(width).fill(" ").join("");
        const { stdout: stdout5 } = this._options;
        this.clear();
        stdout5.cursorTo(x, y);
        for (let i = 0; i < height; i++) {
          const line2 = this.lines[i + this.currentLine];
          stdout5.cursorTo(x);
          stdout5.write((line2 !== null && line2 !== void 0 ? line2 : emptyLine) + "\n");
        }
        return this;
      }
      /**
       * Scrolls by the specified number of lines.
       * @param lines - The number of lines to scroll.
       * @returns The Scrollable instance.
       */
      scroll(lines) {
        this.currentLine += lines;
        return this;
      }
      /**
       * Clears the scrollable area.
       * @returns The Scrollable instance.
       */
      clear() {
        const { x, y } = this._options.start;
        const { width, height } = this._options.size;
        const emptyLine = Array(width).fill(" ").join("");
        const { stdout: stdout5 } = this._options;
        stdout5.cursorTo(x, y);
        for (let i = 0; i < height; i++) {
          stdout5.cursorTo(x);
          stdout5.write(emptyLine + "\n");
        }
        return this;
      }
      resetLines() {
        this.lines = [];
        this.currentLine = 0;
      }
      splitContentIntoLines() {
        if (!this._options.content)
          return;
        const wrapped = (0, wrap_ansi_1.default)(this._options.content, this._options.size.width, this._options.wrapOptions);
        this.lines = wrapped.split("\n");
      }
    };
    exports.Scrollable = Scrollable;
  }
});

// node_modules/.pnpm/scrollable-cli@1.0.2/node_modules/scrollable-cli/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/scrollable-cli@1.0.2/node_modules/scrollable-cli/dist/index.js"(exports) {
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scrollable = void 0;
    var scrollable_1 = require_scrollable();
    Object.defineProperty(exports, "Scrollable", { enumerable: true, get: function() {
      return scrollable_1.Scrollable;
    } });
    exports.default = (options) => new scrollable_1.Scrollable(options);
  }
});

// syncify/cli.ts
init_cjs_shims();

// syncify/index.ts
init_cjs_shims();

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/allFalse.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/_internals/isTruthy.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/type.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/_internals/isArray.js
init_cjs_shims();
var { isArray } = Array;

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/_internals/isTruthy.js
function isTruthy(x) {
  if (isArray(x)) {
    return x.length > 0;
  }
  if (type(x) === "Object") {
    return Object.keys(x).length > 0;
  }
  return Boolean(x);
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/allFalse.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/allTrue.js
init_cjs_shims();

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/_internals/isFalsy.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/allTrue.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/anyTrue.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/_internals/createPath.js
init_cjs_shims();
function createPath(path2, delimiter = ".") {
  return typeof path2 === "string" ? path2.split(delimiter) : path2;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/path.js
init_cjs_shims();
function pathFn(pathInput, obj) {
  let willReturn = obj;
  let counter = 0;
  const pathArrValue = createPath(pathInput);
  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === void 0) {
      return void 0;
    }
    if (willReturn[pathArrValue[counter]] === null)
      return void 0;
    willReturn = willReturn[pathArrValue[counter]];
    counter++;
  }
  return willReturn;
}
function path(pathInput, obj) {
  if (arguments.length === 1)
    return (_obj) => path(pathInput, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  return pathFn(pathInput, obj);
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/equals.js
init_cjs_shims();
function _indexOf(valueToFind, list3) {
  if (!isArray(list3)) {
    throw new Error(`Cannot read property 'indexOf' of ${list3}`);
  }
  const typeOfValue = type(valueToFind);
  if (!["Object", "Array", "NaN", "RegExp"].includes(typeOfValue))
    return list3.indexOf(valueToFind);
  let index = -1;
  let foundIndex = -1;
  const { length } = list3;
  while (++index < length && foundIndex === -1) {
    if (equals(list3[index], valueToFind)) {
      foundIndex = index;
    }
  }
  return foundIndex;
}
function _arrayFromIterator(iter) {
  const list3 = [];
  let next;
  while (!(next = iter.next()).done) {
    list3.push(next.value);
  }
  return list3;
}
function _equalsSets(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  const aList = _arrayFromIterator(a.values());
  const bList = _arrayFromIterator(b.values());
  const filtered = aList.filter((aInstance) => _indexOf(aInstance, bList) === -1);
  return filtered.length === 0;
}
function parseError(maybeError) {
  const typeofError = maybeError.__proto__.toString();
  if (!["Error", "TypeError"].includes(typeofError))
    return [];
  return [typeofError, maybeError.message];
}
function parseDate(maybeDate) {
  if (!maybeDate.toDateString)
    return [false];
  return [true, maybeDate.getTime()];
}
function parseRegex(maybeRegex) {
  if (maybeRegex.constructor !== RegExp)
    return [false];
  return [true, maybeRegex.toString()];
}
function equals(a, b) {
  if (arguments.length === 1)
    return (_b) => equals(a, _b);
  const aType = type(a);
  if (aType !== type(b))
    return false;
  if (aType === "Function") {
    return a.name === void 0 ? false : a.name === b.name;
  }
  if (["NaN", "Undefined", "Null"].includes(aType))
    return true;
  if (aType === "Number") {
    if (Object.is(-0, a) !== Object.is(-0, b))
      return false;
    return a.toString() === b.toString();
  }
  if (["String", "Boolean"].includes(aType)) {
    return a.toString() === b.toString();
  }
  if (aType === "Array") {
    const aClone = Array.from(a);
    const bClone = Array.from(b);
    if (aClone.toString() !== bClone.toString()) {
      return false;
    }
    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex])) {
          loopArrayFlag = false;
        }
      }
    });
    return loopArrayFlag;
  }
  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);
  if (aRegex[0]) {
    return bRegex[0] ? aRegex[1] === bRegex[1] : false;
  } else if (bRegex[0])
    return false;
  const aDate = parseDate(a);
  const bDate = parseDate(b);
  if (aDate[0]) {
    return bDate[0] ? aDate[1] === bDate[1] : false;
  } else if (bDate[0])
    return false;
  const aError = parseError(a);
  const bError = parseError(b);
  if (aError[0]) {
    return bError[0] ? aError[0] === bError[0] && aError[1] === bError[1] : false;
  }
  if (aType === "Set") {
    return _equalsSets(a, b);
  }
  if (aType === "Object") {
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length) {
      return false;
    }
    let loopObjectFlag = true;
    aKeys.forEach((aKeyInstance) => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];
        if (aValue !== bValue && !equals(aValue, bValue)) {
          loopObjectFlag = false;
        }
      }
    });
    return loopObjectFlag;
  }
  return false;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/delay.js
init_cjs_shims();
var DELAY = "RAMBDAX_DELAY";
function delay(ms) {
  return new Promise((resolve3) => {
    setTimeout(() => {
      resolve3(DELAY);
    }, ms);
  });
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/includes.js
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
  if (!isArray(iterable))
    return false;
  return _indexOf(valueToFind, iterable) > -1;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/isType.js
init_cjs_shims();
function isType(xType, x) {
  if (arguments.length === 1) {
    return (xHolder) => isType(xType, xHolder);
  }
  return type(x) === xType;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/mapParallelAsync.js
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

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/omit.js
init_cjs_shims();
function omit(propsToOmit, obj) {
  if (arguments.length === 1)
    return (_obj) => omit(propsToOmit, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  const propsToOmitValue = createPath(propsToOmit, ",");
  const willReturn = {};
  for (const key in obj) {
    if (!propsToOmitValue.includes(key)) {
      willReturn[key] = obj[key];
    }
  }
  return willReturn;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/has.js
init_cjs_shims();
function has(prop, obj) {
  if (arguments.length === 1)
    return (_obj) => has(prop, _obj);
  if (!obj)
    return false;
  return obj.hasOwnProperty(prop);
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/hasPath.js
init_cjs_shims();
function hasPath(pathInput, obj) {
  if (arguments.length === 1) {
    return (objHolder) => hasPath(pathInput, objHolder);
  }
  return path(pathInput, obj) !== void 0;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/isEmpty.js
init_cjs_shims();
function isEmpty(input) {
  const inputType = type(input);
  if (["Undefined", "NaN", "Number", "Null"].includes(inputType))
    return false;
  if (!input)
    return true;
  if (inputType === "Object") {
    return Object.keys(input).length === 0;
  }
  if (inputType === "Array") {
    return input.length === 0;
  }
  return false;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/isNil.js
init_cjs_shims();
function isNil(x) {
  return x === void 0 || x === null;
}

// node_modules/.pnpm/rambdax@10.0.0/node_modules/rambdax/src/last.js
init_cjs_shims();
function last(listOrString) {
  if (typeof listOrString === "string") {
    return listOrString[listOrString.length - 1] || "";
  }
  return listOrString[listOrString.length - 1];
}

// syncify/modes/upload.ts
init_cjs_shims();

// syncify/requests/client.ts
init_cjs_shims();

// node_modules/.pnpm/p-map@6.0.0/node_modules/p-map/index.js
init_cjs_shims();
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
    if (!((Number.isSafeInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency >= 1)) {
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
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
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

// node_modules/.pnpm/p-queue@7.4.1/node_modules/p-queue/dist/index.js
init_cjs_shims();

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
init_cjs_shims();
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/.pnpm/p-timeout@5.1.0/node_modules/p-timeout/index.js
init_cjs_shims();
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
var AbortError2 = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
var getDOMException2 = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError2(errorMessage) : new DOMException(errorMessage);
var getAbortedReason2 = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException2("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException2(reason);
};
function pTimeout(promise, milliseconds, fallback2, options) {
  let timer2;
  const cancelablePromise = new Promise((resolve3, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve3(promise);
      return;
    }
    options = {
      customTimers: { setTimeout, clearTimeout },
      ...options
    };
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason2(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason2(signal));
      });
    }
    timer2 = options.customTimers.setTimeout.call(void 0, () => {
      if (typeof fallback2 === "function") {
        try {
          resolve3(fallback2());
        } catch (error3) {
          reject(error3);
        }
        return;
      }
      const message = typeof fallback2 === "string" ? fallback2 : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError = fallback2 instanceof Error ? fallback2 : new TimeoutError(message);
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError);
    }, milliseconds);
    (async () => {
      try {
        resolve3(await promise);
      } catch (error3) {
        reject(error3);
      } finally {
        options.customTimers.clearTimeout.call(void 0, timer2);
      }
    })();
  });
  cancelablePromise.clear = () => {
    clearTimeout(timer2);
    timer2 = void 0;
  };
  return cancelablePromise;
}

// node_modules/.pnpm/p-queue@7.4.1/node_modules/p-queue/dist/priority-queue.js
init_cjs_shims();

// node_modules/.pnpm/p-queue@7.4.1/node_modules/p-queue/dist/lower-bound.js
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

// node_modules/.pnpm/p-queue@7.4.1/node_modules/p-queue/dist/priority-queue.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PriorityQueue_queue;
var PriorityQueue = class {
  constructor() {
    _PriorityQueue_queue.set(this, []);
  }
  enqueue(run2, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run: run2
    };
    if (this.size && __classPrivateFieldGet(this, _PriorityQueue_queue, "f")[this.size - 1].priority >= options.priority) {
      __classPrivateFieldGet(this, _PriorityQueue_queue, "f").push(element);
      return;
    }
    const index = lowerBound(__classPrivateFieldGet(this, _PriorityQueue_queue, "f"), element, (a, b) => b.priority - a.priority);
    __classPrivateFieldGet(this, _PriorityQueue_queue, "f").splice(index, 0, element);
  }
  dequeue() {
    const item = __classPrivateFieldGet(this, _PriorityQueue_queue, "f").shift();
    return item === null || item === void 0 ? void 0 : item.run;
  }
  filter(options) {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length;
  }
};
_PriorityQueue_queue = /* @__PURE__ */ new WeakMap();
var priority_queue_default = PriorityQueue;

// node_modules/.pnpm/p-queue@7.4.1/node_modules/p-queue/dist/index.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PQueue_instances;
var _PQueue_carryoverConcurrencyCount;
var _PQueue_isIntervalIgnored;
var _PQueue_intervalCount;
var _PQueue_intervalCap;
var _PQueue_interval;
var _PQueue_intervalEnd;
var _PQueue_intervalId;
var _PQueue_timeoutId;
var _PQueue_queue;
var _PQueue_queueClass;
var _PQueue_pending;
var _PQueue_concurrency;
var _PQueue_isPaused;
var _PQueue_throwOnTimeout;
var _PQueue_doesIntervalAllowAnother_get;
var _PQueue_doesConcurrentAllowAnother_get;
var _PQueue_next;
var _PQueue_onResumeInterval;
var _PQueue_isIntervalPaused_get;
var _PQueue_tryToStartAnother;
var _PQueue_initializeIntervalIfNeeded;
var _PQueue_onInterval;
var _PQueue_processQueue;
var _PQueue_throwOnAbort;
var _PQueue_onEvent;
var AbortError3 = class extends Error {
};
var PQueue = class extends import_index.default {
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    var _a, _b, _c, _d;
    super();
    _PQueue_instances.add(this);
    _PQueue_carryoverConcurrencyCount.set(this, void 0);
    _PQueue_isIntervalIgnored.set(this, void 0);
    _PQueue_intervalCount.set(this, 0);
    _PQueue_intervalCap.set(this, void 0);
    _PQueue_interval.set(this, void 0);
    _PQueue_intervalEnd.set(this, 0);
    _PQueue_intervalId.set(this, void 0);
    _PQueue_timeoutId.set(this, void 0);
    _PQueue_queue.set(this, void 0);
    _PQueue_queueClass.set(this, void 0);
    _PQueue_pending.set(this, 0);
    _PQueue_concurrency.set(this, void 0);
    _PQueue_isPaused.set(this, void 0);
    _PQueue_throwOnTimeout.set(this, void 0);
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: priority_queue_default,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
    }
    __classPrivateFieldSet(this, _PQueue_carryoverConcurrencyCount, options.carryoverConcurrencyCount, "f");
    __classPrivateFieldSet(this, _PQueue_isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0, "f");
    __classPrivateFieldSet(this, _PQueue_intervalCap, options.intervalCap, "f");
    __classPrivateFieldSet(this, _PQueue_interval, options.interval, "f");
    __classPrivateFieldSet(this, _PQueue_queue, new options.queueClass(), "f");
    __classPrivateFieldSet(this, _PQueue_queueClass, options.queueClass, "f");
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    __classPrivateFieldSet(this, _PQueue_throwOnTimeout, options.throwOnTimeout === true, "f");
    __classPrivateFieldSet(this, _PQueue_isPaused, options.autoStart === false, "f");
  }
  get concurrency() {
    return __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    __classPrivateFieldSet(this, _PQueue_concurrency, newConcurrency, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      throwOnTimeout: __classPrivateFieldGet2(this, _PQueue_throwOnTimeout, "f"),
      ...options
    };
    return new Promise((resolve3, reject) => {
      __classPrivateFieldGet2(this, _PQueue_queue, "f").enqueue(async () => {
        var _a;
        var _b, _c;
        __classPrivateFieldSet(this, _PQueue_pending, (_b = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet2(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
        try {
          if ((_a = options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
            throw new AbortError3("The task was aborted.");
          }
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), options.timeout);
          }
          if (options.signal) {
            operation = Promise.race([operation, __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_throwOnAbort).call(this, options.signal)]);
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
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_next).call(this);
        }
      }, options);
      this.emit("add");
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
      return this;
    }
    __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
  }
  /**
  Clear the queue.
  */
  clear() {
    __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet2(this, _PQueue_queueClass, "f"))(), "f");
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit2) {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit2) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit2);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return __classPrivateFieldGet2(this, _PQueue_pending, "f");
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return __classPrivateFieldGet2(this, _PQueue_isPaused, "f");
  }
};
_PQueue_carryoverConcurrencyCount = /* @__PURE__ */ new WeakMap(), _PQueue_isIntervalIgnored = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCount = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCap = /* @__PURE__ */ new WeakMap(), _PQueue_interval = /* @__PURE__ */ new WeakMap(), _PQueue_intervalEnd = /* @__PURE__ */ new WeakMap(), _PQueue_intervalId = /* @__PURE__ */ new WeakMap(), _PQueue_timeoutId = /* @__PURE__ */ new WeakMap(), _PQueue_queue = /* @__PURE__ */ new WeakMap(), _PQueue_queueClass = /* @__PURE__ */ new WeakMap(), _PQueue_pending = /* @__PURE__ */ new WeakMap(), _PQueue_concurrency = /* @__PURE__ */ new WeakMap(), _PQueue_isPaused = /* @__PURE__ */ new WeakMap(), _PQueue_throwOnTimeout = /* @__PURE__ */ new WeakMap(), _PQueue_instances = /* @__PURE__ */ new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet2(this, _PQueue_intervalCap, "f");
}, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_pending, "f") < __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
}, _PQueue_next = function _PQueue_next2() {
  var _a;
  __classPrivateFieldSet(this, _PQueue_pending, (_a = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _a--, _a), "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
  this.emit("next");
}, _PQueue_onResumeInterval = function _PQueue_onResumeInterval2() {
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
  __classPrivateFieldSet(this, _PQueue_timeoutId, void 0, "f");
}, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get2() {
  const now = Date.now();
  if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f") === void 0) {
    const delay2 = __classPrivateFieldGet2(this, _PQueue_intervalEnd, "f") - now;
    if (delay2 < 0) {
      __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
    } else {
      if (__classPrivateFieldGet2(this, _PQueue_timeoutId, "f") === void 0) {
        __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
        }, delay2), "f");
      }
      return true;
    }
  }
  return false;
}, _PQueue_tryToStartAnother = function _PQueue_tryToStartAnother2() {
  if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
    if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
      clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
    }
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
    this.emit("empty");
    if (__classPrivateFieldGet2(this, _PQueue_pending, "f") === 0) {
      this.emit("idle");
    }
    return false;
  }
  if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
    const canInitializeInterval = !__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_isIntervalPaused_get);
    if (__classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesIntervalAllowAnother_get) && __classPrivateFieldGet2(this, _PQueue_instances, "a", _PQueue_doesConcurrentAllowAnother_get)) {
      const job = __classPrivateFieldGet2(this, _PQueue_queue, "f").dequeue();
      if (!job) {
        return false;
      }
      this.emit("active");
      job();
      if (canInitializeInterval) {
        __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
      }
      return true;
    }
  }
  return false;
}, _PQueue_initializeIntervalIfNeeded = function _PQueue_initializeIntervalIfNeeded2() {
  if (__classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalId, "f") !== void 0) {
    return;
  }
  __classPrivateFieldSet(this, _PQueue_intervalId, setInterval(() => {
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  }, __classPrivateFieldGet2(this, _PQueue_interval, "f")), "f");
  __classPrivateFieldSet(this, _PQueue_intervalEnd, Date.now() + __classPrivateFieldGet2(this, _PQueue_interval, "f"), "f");
}, _PQueue_onInterval = function _PQueue_onInterval2() {
  if (__classPrivateFieldGet2(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_pending, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
    clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
  }
  __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
}, _PQueue_processQueue = function _PQueue_processQueue2() {
  while (__classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) {
  }
}, _PQueue_throwOnAbort = async function _PQueue_throwOnAbort2(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new AbortError3("The task was aborted."));
    }, { once: true });
  });
}, _PQueue_onEvent = async function _PQueue_onEvent2(event2, filter) {
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
};
var dist_default = PQueue;
var axios = axios3__default.default.create({
  responseType: "json",
  headers: {}
});
var queue = new dist_default({
  // concurrency: 5,
  interval: 500,
  intervalCap: 2
});
function requeue(status) {
  if (status === 429 || status === 500)
    return true;
  if (!queue.isPaused)
    queue.pause();
  return false;
}

// syncify/utils/timer.ts
init_cjs_shims();

// syncify/utils/native.ts
init_cjs_shims();
var {
  error,
  log,
  warn,
  clear
} = new console$1.Console(process3.stdout, process3.stderr);
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
var { toString } = Object.prototype;

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
    const t2 = this.stop(id || true);
    return t2.slice(0, t2.lastIndexOf(" "));
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
      this.time[id] = perf_hooks.performance.now();
    } else {
      this.marks.push(perf_hooks.performance.now());
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
    while (this.marks.length !== 0)
      this.marks.pop();
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
    const ms = perf_hooks.performance.now() - gt;
    if (ms < 1e3)
      return `${abs(+ms.toFixed(0))}ms`;
    const s = ms / 1e3;
    if (s < 60)
      return `${abs(+s.toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
    const m = abs(+(s / 60).toFixed(0));
    return `${m}m ${abs(+(s - 60 * Number(m)).toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
  }
}();

// syncify/utils/utils.ts
init_cjs_shims();

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

// syncify/const.ts
init_cjs_shims();
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
var UNITS = [
  "b",
  "kb",
  "mb",
  "gb",
  "tb"
];
var ESBUILD_NOT_INSTALLED = [
  "You cannot use script minification without esbuild installed",
  "and configured as a processor. Install esbuild and configure Syncify",
  "to apply transforms to leverage script minification."
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

// syncify/ansi/symbol.ts
init_cjs_shims();

// syncify/ansi/colors.ts
init_cjs_shims();
var import_ansis = __toESM(require_ansis());
var clear2 = "\x1B[H\x1B[2J";
import_ansis.default.extend(
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
  cyan,
  red,
  green,
  yellow,
  magenta,
  blue,
  white,
  gray,
  dim,
  // BRIGHT
  cyanBright,
  redBright,
  greenBright,
  yellowBright,
  magentaBright,
  blueBright,
  whiteBright,
  // OTHER
  strip,
  // STYLES
  underline,
  bold,
  reset,
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
} = import_ansis.default;

// syncify/ansi/symbol.ts
var Tree = object({
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
  red: `${red.dim.open}\u2502${red.dim.close}  `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  redTrim: `${red.dim.open}\u2502${red.dim.close}`,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellow: `${yellow.dim.open}\u2502${yellow.dim.close}  `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellowTrim: `${yellow.dim.open}\u2502${yellow.dim.close}`,
  /**
   * Tree Line Indentation
   *
   * Symbols used for next level lines
   */
  indent: object({
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
  })
});
`${gray.open}|${gray.close}`;
`${gray.open}#${gray.close}`;
`${gray.open}+${gray.close}`;
`${gray.open}-${gray.close}`;
`${gray.open},${gray.close}`;
var CHK = `${neonGreen.open}\u2713${neonGreen.close}`;
var BAD = `${redBright.open}\u{10102}${redBright.close}`;
var COL = `${gray.open}:${gray.close}`;
var ARR = `${gray.open}\u2192${gray.close}`;
var CHV = `${gray.open}\u25B8${gray.close}`;
var ARL = `${gray.open}\u2942${gray.close}`;
var TLD = `${gray.open}~${gray.close}`;
var DSH = `${gray.open}\u2014${gray.close}`;
var LPR = `${gray.open}(${gray.close}`;
var RPR = `${gray.open})${gray.close}`;
var LCB = `${gray.open}{${gray.close}`;
var RCB = `${gray.open}}${gray.close}`;
var LSB = `${gray.open}[${gray.close}`;
var RSB = `${gray.open}]${gray.close}`;
var LAN = `${gray.open}<${gray.close}`;
var RAN = `${gray.open}>${gray.close}`;

// syncify/utils/utils.ts
function has2(prop, object2) {
  return prop in object2;
}
function hasProp(object2) {
  return (prop) => prop in object2;
}
function getChunk(array, perChunk = 2) {
  return array.reduce((acc, item, index) => {
    const ci = Math.floor(index / perChunk);
    if (!acc[ci])
      acc[ci] = [];
    acc[ci].push(item);
    return acc;
  }, []);
}
var event = new events.EventEmitter();
function ws(array, prop = null) {
  let size2 = 0;
  if (isArray2(array)) {
    for (const item of array) {
      if (prop) {
        if (item[prop].length > size2)
          size2 = item[prop].length;
      } else {
        if (item.length > size2)
          size2 = item.length;
      }
    }
  } else {
    for (const item in array)
      if (item.length > size2)
        size2 = item.length;
  }
  size2 = size2 + 1;
  return function curried(string) {
    const n = isString(string) ? size2 - string.length : size2 - string;
    return n < 1 ? " " : " ".repeat(n);
  };
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
function glueString(...input) {
  return input.join(" ");
}
function glue(...input) {
  return isArray2(input[0]) ? input[0].join("") : input.join("");
}
function checksum(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}
function jsonc(data) {
  if (stripJsonComments(data).trim() === "")
    return {};
  try {
    return JSON.parse(stripJsonComments(data).trim());
  } catch (e2) {
    throw new Error(e2);
  }
}
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
function plural(word, size2, zero = false) {
  if (size2 >= 2) {
    return word[word.length - 1] !== "s" ? `${word}s` : word;
  } else {
    return word[word.length - 1] !== "s" ? word : word.slice(0, -1);
  }
}
function sanitize(message) {
  if (isBuffer(message))
    return message.toString();
  if (isObject(message) || isArray2(message))
    return JSON.stringify(message);
  if (isBoolean(message) || isNumber(message))
    return `${message}`;
  return isString(message) ? message : String(message);
}
async function dynamicImport(id, { format }) {
  if (format === "esm") {
    return (file) => import(file);
  } else {
    return getImport(id);
  }
}
function getImport(name) {
  if (isFunction(__require))
    return __require(name);
  return module$1.createRequire(importMetaUrl)(name);
}
function inferLoader(ext) {
  if (ext === ".mjs" || ext === ".cjs")
    return "js";
  return ext.slice(1);
}
function toUpcase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function getSizeStr(value) {
  return typeof value === "number" ? byteConvert(value) : byteConvert(byteSize(value));
}
function byteSize(string) {
  return isString(string) ? toBuffer(string).toString().length : string.toString().length;
}
function byteConvert(bytes) {
  if (bytes === 0)
    return "0b";
  const size2 = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return size2 === 0 ? `${bold(String(bytes))}${UNITS[size2]}` : `${bold((bytes / 1024 ** size2).toFixed(1))}${UNITS[size2]}`;
}
function fileSize(content, beforeSize) {
  const size2 = byteSize(content);
  const gzip = byteConvert(zlib2__default.default.gzipSync(content).length);
  const before = byteConvert(beforeSize);
  const after = byteConvert(size2);
  const saved = byteConvert(beforeSize - size2);
  return {
    isSmaller: size2 > beforeSize || size2 === beforeSize,
    gzip,
    before,
    after,
    saved
  };
}
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? `0${hur}` : hur) + COL + (min < 10 ? `0${min}` : min) + COL + (sec < 10 ? `0${sec}` : sec);
}
function addSuffix(number) {
  const a = number % 10;
  const b = number % 100;
  return number + (a === 1 && b !== 11 ? "st" : a === 2 && b !== 12 ? "nd" : a === 3 && b !== 13 ? "rd" : "th");
}
function uuid() {
  return Math.random().toString(36).slice(2);
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
function isNil2(input) {
  return input === void 0 || input === null;
}
function isEmptyString(input) {
  if (isBuffer(input))
    return input.toString().trim().length === 0;
  return input.trim().length === 0;
}
function isEmpty2(input) {
  if (isObject(input)) {
    for (const _ in input)
      return false;
    return true;
  }
  if (isArray2(input))
    return input.length === 0;
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN2(input))
    return false;
  return !input;
}
function isArray2(param) {
  return toString.call(param).slice(8, -1) === "Array";
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
  return toString.call(param).slice(8, -1) === "Function";
}
function isBoolean(param) {
  return toString.call(param).slice(8, -1) === "Boolean";
}
function isNumber(param) {
  return toString.call(param).slice(8, -1) === "Number";
}
function isNaN2(param) {
  return Number.isNaN(param);
}
function isNull(param) {
  return toString.call(param).slice(8, -1) === "Null";
}
function isUndefined(param) {
  return toString.call(param).slice(8, -1) === "Undefined";
}
function isBuffer(param) {
  return Buffer.isBuffer(param);
}

// syncify/model/$.ts
init_cjs_shims();

// node_modules/.pnpm/mergerino@0.4.0/node_modules/mergerino/dist/mergerino.min.js
init_cjs_shims();
var e = Object.assign || ((e2, t2) => (t2 && Object.keys(t2).forEach((o2) => e2[o2] = t2[o2]), e2));
var t = (e2, r, s) => {
  const c = typeof s;
  if (s && "object" === c)
    if (Array.isArray(s))
      for (const o2 of s)
        r = t(e2, r, o2);
    else
      for (const c2 of Object.keys(s)) {
        const f = s[c2];
        "function" == typeof f ? r[c2] = f(r[c2], o) : void 0 === f ? e2 && !isNaN(c2) ? r.splice(c2, 1) : delete r[c2] : null === f || "object" != typeof f || Array.isArray(f) ? r[c2] = f : "object" == typeof r[c2] ? r[c2] = f === r[c2] ? f : o(r[c2], f) : r[c2] = t(false, {}, f);
      }
  else
    "function" === c && (r = s(r, o));
  return r;
};
var o = (o2, ...r) => {
  const s = Array.isArray(o2);
  return t(s, s ? o2.slice() : e({}, o2), r);
};
var mergerino_min_default = o;

// syncify/cli/size.ts
init_cjs_shims();
function exec(command, args, shell) {
  return child_process.execFileSync(command, args, {
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
  const __dirname = pathe.dirname(url.fileURLToPath(importMetaUrl));
  return exec(pathe.join(__dirname, command), [], shell).split(/\r?\n/);
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
  if (process3.stdout && process3.stdout.columns && process3.stdout.rows)
    return create2(process3.stdout.columns, process3.stdout.rows);
  if (process3.stderr && process3.stderr.columns && process3.stderr.rows)
    return create2(process3.stderr.columns, process3.stderr.rows);
  if (process3.env.COLUMNS && process3.env.LINES)
    return create2(process3.env.COLUMNS, process3.env.LINES);
  if (process3.platform === "win32") {
    try {
      const size2 = execNative("vendor/windows/term-size.exe", false);
      if (size2.length === 2)
        return create2(size2[0], size2[1]);
    } catch {
    }
  } else {
    if (process3.platform === "darwin") {
      try {
        const size2 = execNative("vendor/macos/term-size", true);
        if (size2.length === 2)
          return create2(size2[0], size2[1]);
      } catch {
      }
    }
    try {
      const size2 = exec("resize", ["-u"]).match(/\d+/g);
      if (size2.length === 2)
        return create2(size2[0], size2[1]);
    } catch {
    }
    if (process3.env.TERM) {
      try {
        const cols = exec("tput", ["cols"]);
        const rows = exec("tput", ["lines"]);
        if (cols && rows)
          return create2(cols, rows);
      } catch {
      }
    }
  }
  return create2(80, 24);
}

// syncify/model/terser.ts
init_cjs_shims();
var terser = () => ({
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    metaobject: true,
    groups: true,
    templates: true,
    exclude: []
  },
  script: {
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    mangleProps: void 0,
    legalComments: "none",
    mangleQuoted: false,
    keepNames: false,
    exclude: []
  },
  liquid: {
    minifyJavascript: false,
    minifyStylesheet: false,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    collapseInner: false,
    collapseWhitespace: true,
    stripDashes: true,
    exclude: []
  },
  style: {
    exclude: [],
    format: false,
    inline: false,
    purgeUnusedCSS: false,
    obfuscateAlphabet: "abcefghijklmnopqrstuvwxyz0123456789",
    obfuscateClassNames: false,
    obfuscateWhitelist: []
  },
  markup: {
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
    collapseWhitespace: true,
    continueOnParseError: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    trimCustomFragments: false,
    ignoreCustomFragments: [
      /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
      /<style[\s\S]*?<\/style>/,
      /<script[\s\S]*?<\/script>/,
      /{%[\s\S]*?%}/
    ]
  }
});

// syncify/model/defaults.ts
init_cjs_shims();
var defaults = () => ({
  input: "source",
  output: "theme",
  import: "import",
  export: "export",
  config: ".",
  hot: false,
  stores: null,
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
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  },
  paths: {
    assets: "assets/*",
    config: "config/*.json",
    layout: "layout/*.liquid",
    locales: "locales/*.json",
    metafields: "metafields/**/*.json",
    redirects: "redirects.yaml",
    schema: "schema/*.json",
    snippets: "snippets/**/*.liquid",
    metaobject: "templates/metaobject/*",
    sections: [
      "sections/**/*.json",
      "sections/**/*.liquid"
    ],
    pages: "pages/*",
    templates: "templates/*",
    customers: "templates/customers/*"
  },
  views: {
    sections: {
      prefixDir: false,
      separator: "-",
      global: []
    },
    snippets: {
      prefixDir: false,
      separator: "-",
      global: []
    },
    pages: {
      author: "",
      safeSync: true,
      language: "html",
      suffixDir: false,
      global: []
    }
  },
  transform: {
    svg: null,
    style: null,
    script: null
  },
  terser: {
    json: false,
    markup: false,
    liquid: false,
    script: false
  }
});

// syncify/model/processor.ts
init_cjs_shims();
var processor = () => ({
  json: {
    indent: 2,
    useTab: false,
    crlf: false,
    exclude: null
  },
  postcss: {
    installed: false,
    loaded: false,
    file: false,
    config: []
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
    installed: false,
    loaded: false,
    file: false,
    config: {
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
    }
  },
  sharp: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {}
  },
  sprite: {
    installed: false,
    loaded: false,
    file: false,
    config: {
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
    }
  },
  svgo: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      multipass: true,
      datauri: "enc",
      js2svg: {
        indent: 2,
        pretty: true
      },
      plugins: [
        "preset-default"
      ]
    }
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
    state[path2] = object({ input: null, match: null });
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
   * The terse minification configuration settings
   */
  static terser = terser();
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
  cli = object();
  /**
   * Websockets HOT reloading
   */
  wss = null;
  /**
   * Stats information for the output directory
   *
   * @default null
   */
  stats = object();
  /**
   * CLI provided filters
   *
   * @default null
   */
  filters = object();
  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  commands = object();
  /**
   * The version defined in the package.json
   *
   * @default null
   */
  version = "1.0.0";
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
  argv = process3.argv.slice(2).join(" ");
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
  warnings = object();
  /**
   * Theme Publishing
   */
  publish = object({
    ngrok: null,
    bindVersion: false,
    publishRole: "unpublished",
    themeLimit: 3,
    tunnelPort: 80
  });
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
  vc = object({
    dir: null,
    number: null,
    zip: null,
    patch: 0,
    major: 0,
    minor: 0,
    update: null
  });
  /**
   * Execution options which describe the invocation and operation
   * instructions which Syncify was initialised.
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
  env = object({
    cli: false,
    tree: false,
    dev: true,
    prod: false,
    ready: false,
    sync: 0,
    file: null,
    vars: {}
  });
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
  hot = object({
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
  });
  /**
   * Log State
   */
  log = object({
    idle: false,
    group: "Syncify",
    title: "",
    uri: "",
    listen: null,
    thrown: null,
    queue: /* @__PURE__ */ new Set(),
    changes: object(),
    config: object({
      clear: true,
      silent: false,
      stats: true,
      warnings: true
    })
  });
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = object({
    build: false,
    interactive: false,
    dev: true,
    prod: false,
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
  });
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
  file = object({
    base: null,
    path: null,
    relative: null
  });
  /**
   * Files store - Holds a `Set` reference to all files
   */
  files = /* @__PURE__ */ new Map();
  /**
   * Base directory path references
   */
  dirs = object();
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
  cmd = object({
    config: null,
    delete: null,
    filter: null,
    input: null,
    output: null
  });
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
  section = object({
    prefixDir: false,
    separator: "-",
    global: null,
    baseDir: /* @__PURE__ */ new Set(),
    schema: null,
    shared: /* @__PURE__ */ new Map()
  });
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
  snippet = object({
    prefixDir: false,
    separator: "-",
    global: null,
    baseDir: /* @__PURE__ */ new Set()
  });
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
    export: object({
      quotes: "\u201C\u201D\u2018\u2019",
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: "language-"
    }),
    import: object({
      codeBlockStyle: "fenced",
      emDelimiter: "_",
      fence: "```",
      headingStyle: "atx",
      hr: "---",
      linkReferenceStyle: "full",
      linkStyle: "inlined",
      strongDelimiter: "**",
      bulletListMarker: "-"
    })
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
   * Image transforms
   */
  image;
  /**
   * Terser Minification Options
   */
  terse = object({
    /**
     * Terse JSON Minification
     *
     * @default false
     */
    json: false,
    /**
     * Terse Liquid minification
     */
    liquid: false,
    /**
     * Terse Markup (HTML) minification
     */
    markup: false,
    /**
      * **NOTE YET AVAILABLE**
      *
      * Terse Style (CSS) Minification
      */
    style: false,
    /**
      * Terse Script (JS/TS) Minification
      */
    script: false
  });
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
  * Merged terse minification configuration
  */
  get terser() {
    return Bundle.terser;
  }
  /**
    * Merged terse minification configuration
    */
  set terser(options) {
    Bundle.terser = mergerino_min_default(Bundle.terser, options);
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
    Bundle.defaults = mergerino_min_default(Bundle.defaults, data);
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
  constructor({ base, dir, ext, name, root }) {
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
   * value will assigned post-context, typically in a transform.
   *
   * @example
   *
   * 1024 // => 1.24kb
   */
  size;
};

// syncify/log/loggers.ts
init_cjs_shims();

// syncify/cli/intercept.ts
init_cjs_shims();

// syncify/cli/interpolate.ts
init_cjs_shims();

// syncify/ansi/ansi.ts
init_cjs_shims();

// node_modules/.pnpm/wrap-ansi@8.1.0/node_modules/wrap-ansi/index.js
init_cjs_shims();

// node_modules/.pnpm/string-width@5.1.2/node_modules/string-width/index.js
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

// node_modules/.pnpm/string-width@5.1.2/node_modules/string-width/index.js
var import_eastasianwidth = __toESM(require_eastasianwidth(), 1);
var import_emoji_regex = __toESM(require_emoji_regex(), 1);
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  options = {
    ambiguousIsNarrow: true,
    ...options
  };
  string = stripAnsi(string);
  if (string.length === 0) {
    return 0;
  }
  string = string.replace((0, import_emoji_regex.default)(), "  ");
  const ambiguousCharacterWidth = options.ambiguousIsNarrow ? 1 : 2;
  let width = 0;
  for (const character of string) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879) {
      continue;
    }
    const code = import_eastasianwidth.default.eastAsianWidth(character);
    switch (code) {
      case "F":
      case "W":
        width += 2;
        break;
      case "A":
        width += ambiguousCharacterWidth;
        break;
      default:
        width += 1;
    }
  }
  return width;
}

// node_modules/.pnpm/ansi-styles@6.2.1/node_modules/ansi-styles/index.js
init_cjs_shims();
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red2, green2, blue2) => `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
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
Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
[...foregroundColorNames, ...backgroundColorNames];
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
      value: (red2, green2, blue2) => {
        if (red2 === green2 && green2 === blue2) {
          if (red2 < 8) {
            return 16;
          }
          if (red2 > 248) {
            return 231;
          }
          return Math.round((red2 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red2 / 255 * 5) + 6 * Math.round(green2 / 255 * 5) + Math.round(blue2 / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value: (hex) => {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
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
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
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
        let red2;
        let green2;
        let blue2;
        if (code >= 232) {
          red2 = ((code - 232) * 10 + 8) / 255;
          green2 = red2;
          blue2 = red2;
        } else {
          code -= 16;
          const remainder = code % 36;
          red2 = Math.floor(code / 36) / 5;
          green2 = Math.floor(remainder / 6) / 5;
          blue2 = remainder % 6 / 5;
        }
        const value = Math.max(red2, green2, blue2) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue2) << 2 | Math.round(green2) << 1 | Math.round(red2));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red2, green2, blue2) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red2, green2, blue2)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/wrap-ansi@8.1.0/node_modules/wrap-ansi/index.js
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
var wrapAnsiHyperlink = (uri) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;
var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
var wrapWord = (rows, word, columns) => {
  const characters = [...word];
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
  for (const [index, character] of characters.entries()) {
    const characterLength = stringWidth(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (ESCAPES.has(character)) {
      isInsideEscape = true;
      isInsideLinkEscape = characters.slice(index + 1).join("").startsWith(ANSI_ESCAPE_LINK);
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
    visible += characterLength;
    if (visible === columns && index < characters.length - 1) {
      rows.push("");
      visible = 0;
    }
  }
  if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
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
      rows[rows.length - 1] = rows[rows.length - 1].trimStart();
    }
    let rowLength = stringWidth(rows[rows.length - 1]);
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
  const pre = [...rows.join("\n")];
  for (const [index, character] of pre.entries()) {
    returnValue += character;
    if (ESCAPES.has(character)) {
      const { groups } = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join("")) || { groups: {} };
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
  }
  return returnValue;
};
function wrapAnsi(string, columns, options) {
  return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line2) => exec2(line2, columns, options)).join("\n");
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
var getHomeDirectory = () => os__default.default.homedir().replace(/\\/g, "/");
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
  return stack.replace(/\\/g, "/").split("\n").filter((line2) => {
    const pathMatches = line2.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match2 = pathMatches[1];
    if (match2.includes(".app/Contents/Resources/electron.asar") || match2.includes(".app/Contents/Resources/default_app.asar") || match2.includes("node_modules/electron/dist/resources/electron.asar") || match2.includes("node_modules/electron/dist/resources/default_app.asar")) {
      return false;
    }
    return pathFilter ? !pathRegex.test(match2) && pathFilter(match2) : !pathRegex.test(match2);
  }).filter((line2) => line2.trim() !== "").map((line2) => {
    if (basePathRegex) {
      line2 = line2.replace(basePathRegex, "");
    }
    if (pretty) {
      line2 = line2.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDirectory, "~")));
    }
    return line2;
  }).join("\n");
}

// syncify/ansi/ansi.ts
function Prefix(name, ...suffix) {
  const spacer = name.length > 9 ? "  " : " ".repeat(11 - name.length);
  const joiner = suffix.length > 0 ? suffix.length === 1 ? ARR + "  " + suffix[0] : suffix.length === 2 ? ARR + "  " + suffix[0] + " " + ARR + " " + suffix[1] : ARR + "  " + suffix[0] + " " + ARR + " " + suffix[1] + " " + Append(suffix[2]) : "";
  return name + spacer + joiner;
}
function Append(input) {
  return input ? TLD + " " + reset.gray(input) : "";
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
  warning: yellow(` ${TLD} Type ${bold("w")} and press ${bold("enter")} to view`),
  /**
   * Error in red stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type v and press enter to view
   * ```
   */
  error: red(` ${TLD} Type ${bold("v")} and press ${bold("enter")} to view`),
  /**
   * Stack Trace in Gray applied to error contexts
   *
   * ```bash
   * Type s and press enter to view stack trace
   * ```
   */
  stack: gray(`Type ${bold("s")} and press ${bold("enter")} to view stack trace`)
});
function Ruler(width = $.terminal.wrap, newlines = true) {
  const line2 = "\u251C" + "\u2500".repeat(width - 10);
  return newlines ? `${lightGray.open}${"\n"}${line2}${"\n"}\u2502${lightGray.close}` : `${lightGray.open}${line2}${lightGray.close}`;
}
function Top(label) {
  return Tree.open + reset.gray(`${label} ~ ${getTime()}`);
}
function Wrap(...input) {
  const style2 = object({ color: null, line: Tree.line });
  let lines;
  let write4 = "";
  if (isArray2(input[0])) {
    if (isObject(input[1]))
      assign(style2, input[1]);
    lines = wrapAnsi(input[0].join(" "), $.terminal.wrap).split("\n");
  } else {
    if (isObject(input[input.length - 1]))
      assign(style2, input.pop());
    lines = wrapAnsi(input.join(" "), $.terminal.wrap).split("\n");
  }
  while (lines.length !== 0) {
    const line2 = lines.shift().trim();
    if (line2.length > 0) {
      write4 += style2.line + (style2.color ? style2.color(line2) : line2) + "\n";
    } else {
      write4 += style2.line + "\n";
    }
  }
  return write4.trimEnd();
}
function Break(input) {
  return Tree.trim + "\n" + Tree.line + input + "\n" + Tree.trim;
}
function Line(input) {
  return Tree.line + input;
}
function LineRed(input) {
  return Tree.red + input;
}
function LineYellow(input) {
  return Tree.yellow + input;
}
function NextLine(input) {
  return Tree.trim + "\n" + Tree.line + input;
}
function Next(input) {
  return Tree.line + input + "\n" + Tree.line;
}
function Dash(input) {
  return Tree.dash + input;
}
function End(input) {
  return Tree.base + reset.gray(`${input} ~ ${getTime()}`) + "\n";
}
function Context(data) {
  const space = ws(data.entries);
  const message = Create({ type: data.type || "error" });
  if (isString(data.stack)) {
    const stack = data.cleanStack ? cleanStack(data.stack, { pretty: true, basePath: $.cwd }) : data.stack;
    message.Wrap(stack.split("\n"), gray).NL.Newline();
  }
  for (const key in data.entries) {
    if (isUndefined(data.entries[key]))
      continue;
    let string;
    if (isNumber(data.entries[key])) {
      if (isNaN2(data.entries[key]))
        continue;
      string = neonRouge(sanitize(data.entries[key]));
    } else {
      string = sanitize(data.entries[key]);
    }
    if (string.length === 0)
      continue;
    const entry = data.type === "warning" ? yellowBright(key) : redBright(key);
    if (key === "source" || key === "output" || key === "input" || key === "file") {
      message.Line(entry + COL + " " + space(key) + underline(string), gray);
    } else {
      message.Line(entry + COL + " " + space(key) + string, gray);
    }
  }
  if (data.stack === true)
    message.NL.Line(Suffix.stack);
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
    if (this.text.length === 0)
      return "";
    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
    let output;
    if (color) {
      output = color(glue(this.text));
    } else if (this.type === "info") {
      output = white(glue(this.text));
    } else if (this.type === "error") {
      output = red(glue(this.text));
    } else if (this.type === "warning") {
      output = yellowBright(glue(this.text));
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
    if (this.text.length === 0)
      return "";
    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
    let output;
    if (color) {
      output = color(glue(this.text));
    } else if (this.type === "info") {
      output = white(glue(this.text));
    } else if (this.type === "error") {
      output = red(glue(this.text));
    } else if (this.type === "warning") {
      output = yellowBright(glue(this.text));
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
  Newline(line2, color) {
    if (isNumber(line2)) {
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
      for (let i = 0; i < line2; i++)
        this.text.push(input);
    } else {
      if (line2 === "") {
        this.text.push("\n");
      } else if (line2 === "line") {
        this.text.push(Tree.trim + "\n");
      } else if (line2 === "yellow") {
        this.text.push(Tree.yellowTrim + "\n");
      } else if (line2 === "red") {
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
    if (this.type === "error")
      return this.Error(input, color);
    if (this.type === "warning")
      return this.Warn(input, color);
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
    this.text.push(Tree.red + (color ? color(input) : red(input)) + "\n");
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
    this.text.push(Tree.yellow + (color ? color(input) : yellow(input)) + "\n");
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
      style2.color = red;
    } else if (this.type === "warning") {
      style2.color = yellow;
    } else {
      style2.color = whiteBright;
    }
    if (isArray2(input[0])) {
      if (isFunction(input[1]))
        style2.color = input.pop();
      this.text.push(Wrap(input[0], style2) + "\n");
    } else {
      if (isFunction(input[input.length - 1]))
        style2.color = input.pop();
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
    const line2 = lines.shift();
    if (line2.trim().length > 0) {
      message.Line(line2.trimEnd());
    } else {
      message.Newline(color);
    }
  }
  return message.Newline(color).toString();
}
function Context2(data) {
  const space = ws(data.entries);
  const hasMessage = has2("message", data);
  if (!has2("warning", data))
    data.warning = false;
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
      data.message.Line(white(key) + COL + space(key) + TLD + underline(string), gray);
    } else {
      data.message.Line(white(key) + COL + space(key) + string, gray);
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
  line: line2 = Tree.line,
  span = null
} = {}) {
  if (line2 === "red") {
    line2 = Tree.red;
  } else if (line2 === "yellow") {
    line2 = Tree.yellow;
  }
  if (span !== null) {
    const end = has2("end", span) ? span.end : span.start + 1;
    return line2 + "\n" + [
      line2 + blue(`${span.start - 1}`) + COL,
      line2 + blue(`${span.start}`) + COL + code,
      line2 + blue(`${end}`) + COL
    ].join("\n");
  }
  return line2 + "\n" + line2 + code;
}
function Multiline(input, { type: type2 = "info", color = white } = {}) {
  const line2 = type2 === "error" ? "red" : type2 === "warn" ? "yellow" : "line";
  return Create({ type: type2 }).Newline(line2).Wrap(input, color).toLine();
}

// syncify/cli/spinner.ts
init_cjs_shims();

// node_modules/.pnpm/log-update@5.0.1/node_modules/log-update/index.js
init_cjs_shims();

// node_modules/.pnpm/ansi-escapes@5.0.0/node_modules/ansi-escapes/index.js
init_cjs_shims();
var ESC = "\x1B[";
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal";
var ansiEscapes = {};
ansiEscapes.cursorTo = (x, y) => {
  if (typeof x !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  if (typeof y !== "number") {
    return ESC + (x + 1) + "G";
  }
  return ESC + (y + 1) + ";" + (x + 1) + "H";
};
ansiEscapes.cursorMove = (x, y) => {
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
ansiEscapes.cursorUp = (count = 1) => ESC + count + "A";
ansiEscapes.cursorDown = (count = 1) => ESC + count + "B";
ansiEscapes.cursorForward = (count = 1) => ESC + count + "C";
ansiEscapes.cursorBackward = (count = 1) => ESC + count + "D";
ansiEscapes.cursorLeft = ESC + "G";
ansiEscapes.cursorSavePosition = isTerminalApp ? "\x1B7" : ESC + "s";
ansiEscapes.cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC + "u";
ansiEscapes.cursorGetPosition = ESC + "6n";
ansiEscapes.cursorNextLine = ESC + "E";
ansiEscapes.cursorPrevLine = ESC + "F";
ansiEscapes.cursorHide = ESC + "?25l";
ansiEscapes.cursorShow = ESC + "?25h";
ansiEscapes.eraseLines = (count) => {
  let clear4 = "";
  for (let i = 0; i < count; i++) {
    clear4 += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
  }
  if (count) {
    clear4 += ansiEscapes.cursorLeft;
  }
  return clear4;
};
ansiEscapes.eraseEndLine = ESC + "K";
ansiEscapes.eraseStartLine = ESC + "1K";
ansiEscapes.eraseLine = ESC + "2K";
ansiEscapes.eraseDown = ESC + "J";
ansiEscapes.eraseUp = ESC + "1J";
ansiEscapes.eraseScreen = ESC + "2J";
ansiEscapes.scrollUp = ESC + "S";
ansiEscapes.scrollDown = ESC + "T";
ansiEscapes.clearScreen = "\x1Bc";
ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC}0f` : (
  // 1. Erases the screen (Only done in case `2` is not supported)
  // 2. Erases the whole screen including scrollback buffer
  // 3. Moves cursor to the top-left position
  // More info: https://www.real-world-systems.com/docs/ANSIcode.html
  `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`
);
ansiEscapes.beep = BEL;
ansiEscapes.link = (text, url) => {
  return [
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
};
ansiEscapes.image = (buffer, options = {}) => {
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
  return returnValue + ":" + buffer.toString("base64") + BEL;
};
ansiEscapes.iTerm = {
  setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
  annotation: (message, options = {}) => {
    let returnValue = `${OSC}1337;`;
    const hasX = typeof options.x !== "undefined";
    const hasY = typeof options.y !== "undefined";
    if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== "undefined")) {
      throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
    }
    message = message.replace(/\|/g, "");
    returnValue += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
    if (options.length > 0) {
      returnValue += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join("|");
    } else {
      returnValue += message;
    }
    return returnValue + BEL;
  }
};
var ansi_escapes_default = ansiEscapes;

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
init_cjs_shims();

// node_modules/.pnpm/restore-cursor@4.0.0/node_modules/restore-cursor/index.js
init_cjs_shims();
var import_onetime = __toESM(require_onetime(), 1);
var import_signal_exit = __toESM(require_signal_exit(), 1);
var restoreCursor = (0, import_onetime.default)(() => {
  (0, import_signal_exit.default)(() => {
    process3__default.default.stderr.write("\x1B[?25h");
  }, { alwaysLast: true });
});
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process3__default.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process3__default.default.stderr) => {
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

// node_modules/.pnpm/slice-ansi@5.0.0/node_modules/slice-ansi/index.js
init_cjs_shims();

// node_modules/.pnpm/is-fullwidth-code-point@4.0.0/node_modules/is-fullwidth-code-point/index.js
init_cjs_shims();
function isFullwidthCodePoint(codePoint) {
  if (!Number.isInteger(codePoint)) {
    return false;
  }
  return codePoint >= 4352 && (codePoint <= 4447 || // Hangul Jamo
  codePoint === 9001 || // LEFT-POINTING ANGLE BRACKET
  codePoint === 9002 || // RIGHT-POINTING ANGLE BRACKET
  // CJK Radicals Supplement .. Enclosed CJK Letters and Months
  11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
  12880 <= codePoint && codePoint <= 19903 || // CJK Unified Ideographs .. Yi Radicals
  19968 <= codePoint && codePoint <= 42182 || // Hangul Jamo Extended-A
  43360 <= codePoint && codePoint <= 43388 || // Hangul Syllables
  44032 <= codePoint && codePoint <= 55203 || // CJK Compatibility Ideographs
  63744 <= codePoint && codePoint <= 64255 || // Vertical Forms
  65040 <= codePoint && codePoint <= 65049 || // CJK Compatibility Forms .. Small Form Variants
  65072 <= codePoint && codePoint <= 65131 || // Halfwidth and Fullwidth Forms
  65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || // Kana Supplement
  110592 <= codePoint && codePoint <= 110593 || // Enclosed Ideographic Supplement
  127488 <= codePoint && codePoint <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
  131072 <= codePoint && codePoint <= 262141);
}

// node_modules/.pnpm/slice-ansi@5.0.0/node_modules/slice-ansi/index.js
var astralRegex = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/;
var ESCAPES2 = [
  "\x1B",
  "\x9B"
];
var wrapAnsi2 = (code) => `${ESCAPES2[0]}[${code}m`;
var checkAnsi = (ansiCodes, isEscapes, endAnsiCode) => {
  let output = [];
  ansiCodes = [...ansiCodes];
  for (let ansiCode of ansiCodes) {
    const ansiCodeOrigin = ansiCode;
    if (ansiCode.includes(";")) {
      ansiCode = ansiCode.split(";")[0][0] + "0";
    }
    const item = ansi_styles_default.codes.get(Number.parseInt(ansiCode, 10));
    if (item) {
      const indexEscape = ansiCodes.indexOf(item.toString());
      if (indexEscape === -1) {
        output.push(wrapAnsi2(isEscapes ? item : ansiCodeOrigin));
      } else {
        ansiCodes.splice(indexEscape, 1);
      }
    } else if (isEscapes) {
      output.push(wrapAnsi2(0));
      break;
    } else {
      output.push(wrapAnsi2(ansiCodeOrigin));
    }
  }
  if (isEscapes) {
    output = output.filter((element, index) => output.indexOf(element) === index);
    if (endAnsiCode !== void 0) {
      const fistEscapeCode = wrapAnsi2(ansi_styles_default.codes.get(Number.parseInt(endAnsiCode, 10)));
      output = output.reduce((current, next) => next === fistEscapeCode ? [next, ...current] : [...current, next], []);
    }
  }
  return output.join("");
};
function sliceAnsi(string, begin, end) {
  const characters = [...string];
  const ansiCodes = [];
  let stringEnd = typeof end === "number" ? end : characters.length;
  let isInsideEscape = false;
  let ansiCode;
  let visible = 0;
  let output = "";
  for (const [index, character] of characters.entries()) {
    let leftEscape = false;
    if (ESCAPES2.includes(character)) {
      const code = /\d[^m]*/.exec(string.slice(index, index + 18));
      ansiCode = code && code.length > 0 ? code[0] : void 0;
      if (visible < stringEnd) {
        isInsideEscape = true;
        if (ansiCode !== void 0) {
          ansiCodes.push(ansiCode);
        }
      }
    } else if (isInsideEscape && character === "m") {
      isInsideEscape = false;
      leftEscape = true;
    }
    if (!isInsideEscape && !leftEscape) {
      visible++;
    }
    if (!astralRegex.test(character) && isFullwidthCodePoint(character.codePointAt())) {
      visible++;
      if (typeof end !== "number") {
        stringEnd++;
      }
    }
    if (visible > begin && visible <= stringEnd) {
      output += character;
    } else if (visible === begin && !isInsideEscape && ansiCode !== void 0) {
      output = checkAnsi(ansiCodes);
    } else if (visible >= stringEnd) {
      output += checkAnsi(ansiCodes, true, ansiCode);
      break;
    }
  }
  return output;
}

// node_modules/.pnpm/log-update@5.0.1/node_modules/log-update/index.js
var defaultTerminalHeight = 24;
var getWidth = (stream) => {
  const { columns } = stream;
  if (!columns) {
    return 80;
  }
  return columns;
};
var fitToTerminalHeight = (stream, text) => {
  const terminalHeight = stream.rows || defaultTerminalHeight;
  const lines = text.split("\n");
  const toRemove = lines.length - terminalHeight;
  if (toRemove <= 0) {
    return text;
  }
  return sliceAnsi(
    text,
    stripAnsi(lines.slice(0, toRemove).join("\n")).length + 1
  );
};
function createLogUpdate(stream, { showCursor = false } = {}) {
  let previousLineCount = 0;
  let previousWidth = getWidth(stream);
  let previousOutput = "";
  const render = (...arguments_) => {
    if (!showCursor) {
      cli_cursor_default.hide();
    }
    let output = arguments_.join(" ") + "\n";
    output = fitToTerminalHeight(stream, output);
    const width = getWidth(stream);
    if (output === previousOutput && previousWidth === width) {
      return;
    }
    previousOutput = output;
    previousWidth = width;
    output = wrapAnsi(output, width, {
      trim: false,
      hard: true,
      wordWrap: false
    });
    stream.write(ansi_escapes_default.eraseLines(previousLineCount) + output);
    previousLineCount = output.split("\n").length;
  };
  render.clear = () => {
    stream.write(ansi_escapes_default.eraseLines(previousLineCount));
    previousOutput = "";
    previousWidth = getWidth(stream);
    previousLineCount = 0;
  };
  render.done = () => {
    previousOutput = "";
    previousWidth = getWidth(stream);
    previousLineCount = 0;
    if (!showCursor) {
      cli_cursor_default.show();
    }
  };
  return render;
}
var logUpdate = createLogUpdate(process3__default.default.stdout);
var log_update_default = logUpdate;
createLogUpdate(process3__default.default.stderr);

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
      if (!active)
        return;
      let label;
      if (options.action !== null) {
        const string = glueString(
          bold(options.action.before),
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
    if (active === false)
      return;
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
var errors_exports = {};
__export(errors_exports, {
  esbuild: () => esbuild,
  json: () => json,
  postcss: () => postcss,
  read: () => read,
  request: () => request,
  sass: () => sass,
  spawn: () => spawn,
  throws: () => throws,
  write: () => write
});
init_cjs_shims();

// syncify/ansi/codeframe.ts
init_cjs_shims();
function highlight(string) {
  return redBright(string.replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, orange("$1")).replace(/({{2}-?[a-zA-Z0-9_\-.'"[\]]+-?}{2})/g, teal("$1")).replace(/((?:www|http:|https:)+[^\s]+[\w])/g, underline("$1")).replace(/(\/)(.*?)(\/)/g, teal("$1") + neonCyan("$2") + teal("$3")).replace(/(\\)(\W)/g, gray("$1") + neonCyan("$2")).replace(/(:)(?= )/g, gray("$1")).replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, neonCyan.bold("$1")));
}
function tokens(string) {
  return string.replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>|:|,)/g, neonCyan("$1")).replace(/(['"].*?['"])/g, gray("$1"));
}
function extract(text) {
  let lines = "";
  const valid = text.indexOf("- Valid syntax:");
  if (valid > -1) {
    lines = "\n" + text.slice(valid).slice(1).replace(/(Valid syntax)(:)(.*)/, redBright("$1") + gray("$2") + teal("$3"));
    return text.slice(0, valid) + lines;
  }
  return text;
}
function Shopify(input, source) {
  const output = [];
  const lineExp = /\(line \d+\):/;
  const nameExp = /'(.*?)'/;
  let indent = "  ";
  const wrapLimit = $.terminal.cols - 10;
  let line2 = NaN;
  let column = NaN;
  let space = 0;
  if (isString(input)) ;
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
            red.bold(text.slice(0, lineIndex + 2)),
            "\n",
            Tree.redTrim
          )
        );
        line2 = Number(text.slice(numberIndex + 6, lineIndex));
        space = sanitize(line2).length + 3;
        text = extract(text.slice(lineIndex + 2));
        output.push(
          glue(
            highlight(Wrap(text, { line: Tree.red, color: redBright })),
            "\n",
            Tree.redTrim,
            "\n",
            Tree.redTrim
          )
        );
        if (source.length > 1) {
          const before = glue(
            Tree.redTrim,
            " ".repeat(space - sanitize(line2 - 1).length),
            blue(`${line2 - 1}`),
            " ",
            Tree.trim
          );
          const current = glue(
            Tree.redTrim,
            " ",
            red.bold(">"),
            " ",
            blue(`${line2}`),
            " ",
            Tree.trim
          );
          let match2 = "";
          let errLine = source[line2 - 1].replace(/\t/g, "  ").trimEnd();
          const errLead = errLine.match(/^\s*/)[0];
          if (nameExp.test(text)) {
            match2 = text.match(nameExp)[1];
            column = source[line2 - 1].indexOf(match2);
            if (column < 0)
              column = NaN;
          }
          let prevLine = source[line2 - 2].replace(/\t/g, "  ").trimEnd();
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
          frame.push(before + gray(prevLine));
          errLine = indent + errLine.trimStart();
          if (errLine.length > wrapLimit) {
            errLine = errLine.slice(0, wrapLimit - 3) + "...";
          }
          if (isNaN(column)) {
            frame.push(
              glue(
                current,
                white(tokens(errLine)),
                "\n",
                Tree.redTrim
              )
            );
          } else {
            frame.push(
              current + white(tokens(errLine)),
              glue(
                Tree.redTrim,
                " ".repeat(space - 1),
                BAD,
                " ",
                Tree.redTrim,
                " ".repeat(errLine.indexOf(match2)),
                redBright("^".repeat(match2.length)),
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
            color: redBright
          })
        )
      );
    }
  }
  return {
    line: line2,
    column,
    output: output.join("\n") + "\n" + frame.join("\n")
  };
}

// syncify/log/errors.ts
function spawn(data) {
  const newlines = data.split("\n").reduce((acc, line2) => {
    const ansi = detect(line2);
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
    const clean = line2.trim().replace(new RegExp($.cwd, "g"), "");
    if (clean.length === 0) {
      acc.push([Tree.trim]);
    } else {
      const prefix = [];
      const nwl2 = wrapAnsi(clean, $.terminal.wrap, {
        hard: true
      }).split("\n");
      while (nwl2.length !== 0) {
        let line3 = nwl2.shift();
        if (nwl2.length !== 0) {
          if (nwl2[0].length === 1) {
            line3 = line3 + nwl2.shift();
          }
        }
        prefix.push(Tree.line + before + line3 + after);
      }
      acc.push(prefix);
    }
    return acc;
  }, []);
  const format = [];
  let n = false;
  while (newlines.length !== 0) {
    const line2 = newlines.shift();
    if (newlines.length !== 0 && line2.length > 1) {
      if (format.length > 0 && format[format.length - 1] !== Tree.trim) {
        format.push(Tree.trim);
      }
      format.push(line2.join("\n"));
    } else if (line2 === Tree.trim) {
      if (n) {
        n = false;
      } else {
        n = true;
        format.push(line2[0]);
      }
    } else {
      format.push(line2[0]);
    }
  }
  log_update_default(format.join("\n"));
}
function request(file, e2, options) {
  const defaults2 = object({
    log: true,
    store: false
  });
  const config = assign(defaults2, options);
  if (config.store === true)
    config.data = object();
  const response = hasPath("error.asset", e2.data) ? e2.data.error.asset : hasPath("errors.asset", e2.data) ? e2.data.errors.asset : null;
  if (e2.status === 422) {
    const { value } = JSON.parse(e2.config.data).asset;
    const { output: output2, line: line2, column } = Shopify(response, value.split("\n"));
    const context2 = object({
      stack: false,
      entries: object({
        column,
        line: line2,
        file: TLD + file,
        details: e2.statusText,
        status: white(sanitize(e2.status)),
        processor: neonMagenta("SHOPIFY API")
      })
    });
    const message2 = Create({ type: "error" }).NL.Insert(output2, gray).NL.Context(context2).toString();
    if (config.store) {
      config.data.message = output2;
      config.data.rawMessage = strip(output2);
      config.data.context = context2;
    }
    if (config.log)
      error(message2);
    if (config.store)
      return config.data;
    return message2;
  }
  if (e2.status in SHOPIFY_REQUEST_ERRORS) {
    const message2 = Create({ type: "error" }).NL.Wrap(SHOPIFY_REQUEST_ERRORS[e2.status]).toLine();
    const context2 = object({
      stack: false,
      entries: object({
        status: e2.status,
        message: e2.statusText,
        source: `${file}`
      })
    });
    if (config.store) {
      config.data.message = message2;
      config.data.context = context2;
    }
    const output2 = glue(Tree.red, "\n", message2, Context2(context2));
    if (config.log)
      error(output2);
    if (config.store)
      return config.data;
    return output2;
  }
  const message = red("Unknown error has occured");
  const context = {
    stack: false,
    entries: {
      status: e2.status,
      message: e2.statusText,
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
        status: e2.status,
        message: e2.statusText,
        source: `${file}`
      })
    })
  );
  if (config.log)
    error(output);
  if (config.store)
    return config.data;
  return output;
}
function throws(e2, entries) {
  const context = {
    stack: false,
    entries: {
      ...entries
    }
  };
  const message = e2 instanceof Error ? has2("message", e2) ? e2.message : e2.toString() : e2;
  if (has2("stack", e2))
    context.stack = e2.stack;
  if (has2("code", e2))
    context.entries.code = e2.code;
  if (has2("name", e2))
    context.entries.name = e2.name;
  error(
    glue(
      Format(message, { type: "error" }),
      Context2(context)
    )
  );
  if (context.stack === false)
    process.exit(0);
}
var write = (message, context) => (e2) => {
  error(
    glue(
      Format(e2.message, { type: "error" }),
      Context2(
        {
          stack: e2.stack,
          entries: {
            ...context,
            code: e2.code,
            name: e2.name,
            details: message
          }
        }
      )
    )
  );
};
function read(details, entries) {
  const message = Create({ type: "error" }).Break("FILE ERROR");
  return function(e2) {
    error(
      message.Wrap(e2.message).Newline().Context({
        stack: e2.stack,
        entries: {
          code: e2.code,
          details,
          ...entries,
          name: e2.name
        }
      }).toLine()
    );
  };
}
function json(e2, file) {
  e2.fileName = file.base;
  const entries = object();
  let line2;
  const message = Create({ type: "error" }).NL.Wrap(e2.message.split("\n")[0], red.bold).NL;
  if (has2("codeFrame", e2)) {
    message.Newline();
    const lines = e2.codeFrame.split("\n");
    const rawFrame = e2.rawCodeFrame.split("\n");
    let i = 0;
    while (lines.length !== 0) {
      if (has2("line", entries) === false) {
        const raw = rawFrame[i].trimStart();
        if (raw[0] === ">") {
          const number = raw.slice(1).trimStart().match(/^\d+/);
          if (number !== null)
            line2 = Number(number[0]);
        }
      }
      message.Line(lines.shift());
      i = i + 1;
    }
    message.Newline();
  }
  const stack = [];
  const trace = e2.stack.split("\n");
  while (trace.length !== 0)
    stack.push(Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    message.NL.Context({
      stack: true,
      entries: {
        line: line2,
        name: e2.name,
        file: TLD + file.relative,
        processor: neonMagenta("JSON")
      }
    }).toString()
  );
}
function sass(file, e2) {
  const message = Create({ type: "error" }).NL.Wrap(e2.sassMessage, red.bold).Newline();
  if (has2("span", e2)) {
    const { span } = e2;
    const code = has2("context", span) ? span.context : span.text;
    if (code.length === 0)
      return "";
    message.Newline();
    const { start, end } = span;
    const space = sanitize(end.line + 1).length;
    if (start.line === end.line) {
      let same = space - sanitize(end.line).length;
      if (start.line > 1)
        message.Line(`${" ".repeat(same) + blue(`${end.line}`)} ${Tree.trim}`);
      same = space - sanitize(end.line + 1).length;
      message.Line(`${" ".repeat(same) + blue(`${end.line + 1}`)} ${Tree.trim} ${code.trimEnd()}`);
      message.Line(`${" ".repeat(space - 1) + BAD} ${Tree.redTrim} ${" ".repeat(end.column) + bold("^")}`);
    } else {
      const content = code.slice(span.start.offset, span.end.offset);
      const lines = content.split("\n");
      let from = span.start.line + 1;
      for (const line2 of lines) {
        const number = sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        message.Line(`${align + blue(number)} ${Tree.trim} ${line2}`);
      }
    }
  }
  error(
    message.NL.Context({
      stack: e2.sassStack,
      entries: {
        line: e2.span.start.line,
        name: e2.name,
        input: file.input,
        cause: e2.cause,
        processor: neonMagenta("SASS Dart")
      }
    }).toString()
  );
}
function esbuild(e2) {
  const message = Create({ type: "error" }).NL.Wrap(e2.text, red.bold).Newline();
  const span = e2.location;
  const space = sanitize(span.line).length;
  let same = space - sanitize(e2.location.line).length;
  if (span.line > 1)
    message.Line(`${" ".repeat(same) + blue(`${span.line - 1}`)} ${Tree.trim}`);
  same = space - sanitize(span.line).length;
  error(
    message.Line(`${" ".repeat(same) + blue(`${span.line}`)} ${Tree.trim} ${span.lineText}`).Line(`${" ".repeat(space - 1) + BAD} ${Tree.redTrim} ${" ".repeat(span.column) + bold("^")}`).NL.NL.Context({
      stack: false,
      entries: {
        suggest: whiteBright(span.suggestion),
        line: e2.location.line,
        column: e2.location.column,
        plugin: e2.pluginName,
        namespace: span.namespace,
        file: TLD + e2.location.file,
        processor: neonMagenta("ESBuild")
      }
    }).toString()
  );
}
function postcss(file, e2) {
  const stack = [];
  const trace = cleanStack(e2.stack, { pretty: true, basePath: $.cwd }).split("\n");
  while (trace.length !== 0)
    stack.push(Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    Create({ type: "error" }).NL.Wrap(`${e2.name}${COL} ${e2.reason}`, red.bold).Newline().Multiline(e2.showSourceCode(true)).NL.NL.Context({
      stack: true,
      entries: {
        line: e2.line,
        column: e2.column,
        source: file.input,
        file: file.input === e2.file ? void 0 : e2.file,
        plugin: blue(e2.plugin),
        processor: neonMagenta("PostCSS")
      }
    }).toString()
  );
}

// syncify/cli/progress.ts
init_cjs_shims();
var import_ansis2 = __toESM(require_ansis());
function progress(total, opts = {}) {
  const options = assign({
    showPercentage: true,
    barColor: "neonGreen",
    percentColor: "whiteBright",
    barSize: 40,
    clearOnComplete: false
  }, opts);
  let percent = 0;
  function align(output) {
    return Tree.line + output + " ".repeat(Math.max(0, options.barSize - output.length));
  }
  function bar(length, empty = false) {
    return (empty ? "\u25B1" : "\u25B0").repeat(length);
  }
  function stop() {
    if (options.clearOnComplete)
      console.clear();
  }
  function increment(incrementBy = 1) {
    const filled = percent + incrementBy;
    percent = Math.min(filled, total);
    if (percent === total)
      stop();
  }
  function decrement(decrementBy = 1) {
    const filled = percent - decrementBy;
    percent = Math.max(filled, 0);
  }
  function render(percentColor) {
    const progress2 = Math.round(percent / total * options.barSize);
    const filled = bar(progress2);
    const empty = bar(options.barSize - progress2, true);
    let output = import_ansis2.default[options.barColor](filled) + lightGray(empty);
    if (options.showPercentage) {
      output += (percentColor || whiteBright)(` ${String(Math.round(percent / total * 100))}%`);
    }
    return align(output);
  }
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

// syncify/log/throws.ts
init_cjs_shims();
var warnings = {};
function warnOption(group2) {
  if (!has(group2, warnings))
    warnings[group2] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      warnings[group2].push(yellowBright(message));
    } else {
      warnings[group2].push(yellowBright(message + COL + " " + bold(value)));
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
    Create({ type: "error" }).Line("TYPE ERROR", bold).NL.Line(`An invalid ${cyan(option)} type value was provided within your ${bold($.file.base)} file.`).Line(`The ${cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`).NL.Line(`provided${COL} ${yellowBright(type(provided).toLowerCase())}`).Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`).Line(`location${COL} ${TLD}${gray.underline($.file.base)}`).NL.Line("How to fix?", gray.bold).Line(`You need to change the option value to use the ${blue("expected")} type.`, gray).Line(`Use the ${white("defineConfig")} named export for type checking`, gray).End($.log.group).BR.toString()
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
    provided = process3.argv.slice(2).join(" ");
    expected = whiteBright(`syncify ${provided} ${cyan(expected.replace(/([|,-])/g, gray("$1")))}`);
  } else {
    expected = whiteBright(`syncify ${expected}`);
  }
  error(
    Create({ type: "error" }).Line("COMMAND ERROR", bold).NL.Wrap(message).NL.Line(`provided${COL} ${whiteBright("$")} ${whiteBright("syncify " + provided)}`).Line(`expected${COL} ${whiteBright("$")} ${expected}`).NL.Line("How to fix?", gray.bold).Wrap(fix, gray).NL.End($.log.group).BR.toString()
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
    provided = provided.replace(REGEX_OR_CHARS, gray("$1"));
  }
  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, gray("$1"));
  }
  error(
    Create({ type: "error" }).Line("INVALID TARGET", bold).NL.Wrap(`Invalid ${cyan(type2)} target provided. `, ...message).NL.Line(`provided${COL} ${yellowBright(expected)}`).Line(`expected${COL} ${blue(provided)}`).NL.Line("How to fix?", gray.bold).Wrap(fix, gray).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingDependency(deps) {
  const message = Create({
    type: "error"
  }).Line("DEPENDENCY ERROR", bold).NL;
  if (isString(deps)) {
    message.Wrap(`Missing ${cyan(deps)} dependency. You need to install ${cyan(deps)} to use it as a processor.`).NL.Line("How to fix?", gray.bold).Line("Install the above module as a development dependency, for example:").NL.Line(`$ pnpm add ${deps} -D`, whiteBright);
  } else {
    const info = [
      `Missing ${cyan(`${deps.length}`)} dependencies. You are attempting to use processor`,
      "(transforms) which are not yet installed. Install the below modules as development",
      "dependencies or disable the transform:"
    ];
    message.Wrap(info).Newline();
    for (const dep of deps) {
      message.Line(`$ pnpm add ${dep} -D`, whiteBright);
    }
  }
  error(
    message.NL.Wrap("If you are using a different package manager please consider adopting pnpm.", gray).End($.log.group).BR.toString()
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
    option = option.split(".").filter(Boolean).join(gray(" \u2192 "));
  }
  error(
    Create({ type: "error" }).Line("MISSING OPTION", bold).NL.Wrap(`Missing ${Encase("CB", cyan(option))} config option. The ${cyan(key)} option needs to be defined`).NL.Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`).Line(`location${COL} ${gray.underline($.file.base)}`).NL.Line("Why?", gray.bold).Wrap(reason, gray).End($.log.group).BR.toString()
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
    option = option.split(".").filter(Boolean).join(gray(" \u2192 "));
  }
  error(
    Create({ type: "error" }).Line("INVALID ERROR", bold).NL.Wrap(`Invalid ${cyan(option)} configuration. The ${cyan(name)} option is invalid. `, ...reason).NL.Line(`provided${COL} ${yellowBright(value)}`).Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`).NL.Line("How to fix?", gray.bold).Line("You need to update the option and use one of the expected values.", gray).Line(`Use the ${white("defineConfig")} named export for type checking`, gray).End($.log.group).BR.toString(red)
  );
  process.exit(0);
}
function missingStores(cwd) {
  error(
    Create({ type: "error" }).Line(`${"MISSING REFERENCE"}`, bold).NL.Line(`You have not provided any ${bold("stores")} within your ${cyan("package.json")} file.`).NL.Line("How to fix?", white.bold).Line(`You need to provide ${cyan("stores")} via ${cyan("syncify")} key`, gray).Line("passing both your store name and a key > value list of theme targets.", gray).NL.Line("{", gray).Line('  "syncify": {'.replace(/"/g, white('"')), gray).Line('    "stores": {'.replace(/"/g, white('"')), gray).Line(`      "domain": "${redBright("your-store")}"`.replace(/"/g, white('"')), gray).Line('      "themes": {}'.replace(/"/g, white('"')), gray).Line("    }", gray).Line("  }", gray).Line("}", gray).NL.Line(`Replace the ${white("your-store")} with the name of your .myshopify domain.`, gray).Line("Syncify will prompt you and provide a list of theme targets to select from.", gray).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingConfig(cwd) {
  error(
    Create({ type: "nil" }).Line(`${`Missing ${cyan("syncify.config.js")} configuration`}`, bold).BR.Line("Unable to resolve a configuration file within the workspace").BR.Line(`at${COL} ${gray.underline("~" + cwd)}`).BR.Line("How to fix?", white.bold).Line("You need to add one the following files to your project", gray).BR.Line(` - ${white("syncify.config.ts")}`, gray).Line(` - ${white("syncify.config.js")}`, gray).Line(` - ${white("syncify.config.mjs")}`, gray).Line(` - ${white("syncify.config.cjs")}`, gray).Line(` - ${white("syncify.config.json")}`, gray).BR.Line(`You can also provide configuration in your ${white("package.json")}`, gray).Line(`file using the ${cyan('"syncify": { "config": {} }')} 'property.`, gray).BR.toString(red)
  );
  process.exit(0);
}
function missingEnv(cwd) {
  const message = [
    `Missing ${cyan(".env")} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${cyan(".env")} or ${cyan("syncify.env")} file present in the root of your project`
  ];
  error(
    Create({ type: "error" }).Line("MISSING ENV", bold).NL.Wrap(message).NL.End($.log.group).BR.toString(red)
  );
  process.exit(0);
}
function throwError(message, solution) {
  error(
    Create({ type: "error" }).Line("ERROR", bold).NL.Wrap(message).NL.Line("How to fix?", gray.bold).Wrap(solution, gray).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function unknownError(option, value) {
  if (option.indexOf(".") > -1) {
    option = Encase("CB", glueString(
      option.split(".").filter(Boolean).join(gray(" \u2192 ")),
      ARR,
      redBright.bold(value)
    ), { spaced: true });
  }
  const file = $.file.base === "package.json" ? `${blue("syncify")} config in the ${blue("package.json")} file.` : `${blue($.file.base)} file.`;
  error(
    Create({ type: "error" }).Line("ERROR", bold).NL.Line(`Unknown ${cyan(option)} option provided.`).NL.Line("How to fix?", gray.bold).Line(`The ${cyan(value)} option is invalid or unsupported.`).Line(`You need to remove it from the ${file}`).End($.log.group).BR.toString()
  );
  process.exit(0);
}

// syncify/log/runtime.ts
var runtime = function($2) {
  clear3();
  if ($2.log.config.silent)
    return;
  $2.env.tree = true;
  const message = Create().BR.Top("Syncify").NL.Line(`v${$2.version}`, bold.whiteBright);
  if ($2.terminal.cols < 80) {
    message.Newline("red").Error("TERMINAL WIDTH WARNING", bold).Newline("red").Error(`Your terminal width is below ${bold(`${100}`)} columns (currently ${bold(`${$2.terminal.cols}`)})`).Error("This is not recommended for usage with Syncify (size matters).").Error("Expand your terminal wider for an optimal logging experience.");
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
        `the ${cyan("publish")} resource`,
        gray
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
    message.Line(seq, gray);
    seq = "";
  }
  if (!isEmpty($2.filters)) {
    message.NL.Line(`Filters${COL}`, white.bold);
    const space = ws($2.filters);
    for (const group2 in $2.filters) {
      const join23 = white($2.filters[group2].map((k) => pathe.relative($2.cwd, k)).join(", "));
      message.Line(` ${TLD} ${group2}${COL}${space(group2)}${join23}`, neonCyan);
    }
  }
  log(message.toLine());
};
runtime.spawns = function($2) {
  if ($2.mode.build || $2.mode.watch) {
    const message = Create().Line(`Spawned${COL}`, white.bold);
    const space = ws($2.spawn.commands);
    for (const name in $2.spawn.commands) {
      const sp = space(name);
      const pid = $2.spawn.commands[name].pid;
      message.Line(` ${TLD} ${neonCyan(name)}${COL}${sp}PID ${ARR} #${pink(`${pid}`)}`, gray);
    }
    log(message.toLine());
  }
};
runtime.stores = function($2) {
  const text = Create();
  const size2 = $2.sync.themes.length;
  if (allFalse($2.mode.upload, $2.mode.import, $2.mode.build, $2.mode.clean)) {
    if (size2 > 0) {
      text.Line(`Editors${COL}`, bold.white);
      getThemeURLS(text, $2.sync.themes, "editor");
    }
  }
  if (anyTrue($2.mode.upload, $2.mode.import, $2.mode.watch)) {
    if (size2 > 0) {
      if ($2.mode.upload || $2.mode.import) {
        text.NL.Line(`Targets${COL}`, bold.white);
      } else {
        text.NL.Line(`Previews${COL}`, bold.white);
      }
      getThemeURLS(text, $2.sync.themes, "preview");
    }
  }
  log(text.toLine());
};
runtime.warnings = function getRuntimeWarnings($2) {
  if (!$2.log.config.warnings)
    return;
  const props = keys(warnings);
  const amount = props.reduce((n, k) => {
    n = n + warnings[k].length;
    return n;
  }, 0);
  if (amount === 0)
    return;
  const message = Create({
    type: "warning"
  }).Line(`${amount} ${plural("Warning", amount)}`, bold);
  for (const key of props) {
    const item = warnings[key];
    if (item.length > 0) {
      if (item.length === amount) {
        message.Newline().Line(`${key} ${plural("Warning", item.length)}`, bold).Newline();
      } else {
        message.Newline().Line(`${item.length} ${key} ${plural("Warning", item.length)}`, bold);
      }
      for (const text of item) {
        message.Line(`${DSH} ${text}`, yellowBright);
      }
    }
  }
  warn(message.toString());
};
function getThemeURLS(text, themes2, url) {
  const width = themes2.reduce((size2, { target, store }) => {
    const name = store.indexOf(".");
    if (name > size2.store)
      size2.store = name;
    if (target.length > size2.theme)
      size2.theme = target.length;
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
        gray.underline(type2)
      )
    );
  }
}

// syncify/log/loggers.ts
var spinner = Spinner2();
function hline(options) {
  log(
    Ruler(
      options.width,
      options.newlines
    )
  );
}
function write2(message, {
  color,
  type: type2 = null,
  prefix = null,
  suffix = null
} = {}) {
  if (type2 === "error") {
    if (prefix === null) {
      error(
        glueString(
          LineRed(color ? color(message) : redBright(message)),
          Append(suffix)
        )
      );
    } else {
      error(
        LineRed(
          (color || redBright)(
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
            color ? color(message) : yellowBright(message),
            Append(suffix)
          )
        )
      );
    } else {
      log(
        LineYellow(
          (color || yellowBright)(
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
            color ? color(message) : whiteBright(message),
            Append(suffix)
          )
        )
      );
    } else {
      log(
        Line(
          (color || whiteBright)(
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
}
function nwl(entry) {
  if (entry === "") {
    log("\n");
  } else if (entry === "red") {
    log(Tree.red);
  } else if (entry === "yellow") {
    log(Tree.yellow);
  } else {
    log(Tree.line);
  }
}
function clear3(force = false) {
  if (force === false && $.log.config.clear === false)
    return;
  const count = process3.stdout.rows - 2;
  log(count > 0 ? "\n".repeat(count) : "");
  readline.cursorTo(process3.stdout, 0, 0);
  readline.clearScreenDown(process3.stdout);
}
function group(name) {
  if ($.log.config.silent || $.env.tree === false)
    return;
  log(End($.log.group));
  if ($.log.config.clear && name !== false)
    clear3();
  if (isString(name)) {
    $.log.group = name;
    log("\n" + Top($.log.group));
  }
}
function task(name) {
  if ($.log.config.silent || $.env.tree === false)
    return;
  if (isString(name)) {
    log(Dash(gray(name) + " " + Append(getTime())));
  } else {
    clear3();
    log(
      Tree.line + "\n" + Dash(
        glueString(
          gray($.log.group),
          Append(getTime())
        )
      )
    );
  }
}
function process5(label, ...message) {
  if ($.mode.export || $.mode.build || $.log.config.silent)
    return;
  if (message.length === 2) {
    log(
      Line(
        whiteBright(
          Prefix(
            "process",
            glueString(
              bold(label),
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
        whiteBright(
          Prefix(
            "process",
            glueString(
              bold(label),
              Append(message[0])
            )
          )
        )
      )
    );
  }
}
function changed(file) {
  if ($.log.config.silent === true || $.mode.watch === false)
    return;
  timer.start();
  const name = glueString(file.kind, CHV, toUpcase(file.namespace));
  const change = has2(file.relative, $.log.changes) ? $.log.changes[file.relative] + 1 : 1;
  $.log.changes[file.relative] = change;
  if ($.log.group !== name) {
    nwl();
    group(name);
    if ($.log.title !== file.namespace)
      $.log.title = file.namespace;
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
        Prefix("changed", glueString(file.relative, Append(`${change} change${change > 1 ? "s" : ""}`)))
      )
    )
  );
}
function minified(...p) {
  if ($.mode.export || $.mode.build || $.log.config.silent)
    return;
  if (p.length === 1) {
    log(
      Line(
        whiteBright(
          Prefix("minified", bold(p[0]))
        )
      )
    );
  } else if (p.length === 4) {
    log(
      Line(
        whiteBright(
          Prefix(
            "minified",
            glueString(
              bold(p[0]),
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
        whiteBright(
          Prefix(
            "minified",
            glueString(
              bold(p[0]),
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
}
function syncing(path2, { hot: hot2 = false } = {}) {
  if ($.mode.export || $.mode.build || $.log.config.silent)
    return;
  if ($.warnings[path2]) {
    log(
      LineYellow(
        yellowBright(
          Prefix(
            "warning",
            glueString(
              sanitize($.warnings[path2].size),
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
      magentaBright(
        Prefix("syncing", path2)
      )
    )
  );
  if (queue.pending > (hot2 ? 0 : 2)) {
    log(
      Line(
        orange(
          Prefix("queued", glueString(path2, TLD, bold(addSuffix(queue.pending)), "in queue"))
        )
      )
    );
  }
}
function prompt(message, notify) {
  log(
    Line(
      orange(
        Prefix("prompt", message)
      )
    ),
    End($.log.group)
  );
  if (isObject(notify))
    notifier__default.default.notify(notify).notify();
  return () => log(
    Top($.log.group)
  );
}
function resource(type2, store) {
  if ($.mode.watch) {
    $.log.queue.add(
      [
        type2,
        store.domain,
        timer.stop()
      ]
    );
    if ($.log.idle)
      return;
    else
      $.log.idle = true;
    queue.onIdle().then(() => {
      for (const [type3, store2, ctime] of $.log.queue) {
        log(
          Line(
            neonGreen(
              Prefix(
                "uploaded",
                glueString(
                  bold(type3),
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
              bold(type2),
              ARR,
              store.domain,
              Append(timer.stop())
            )
          )
        )
      )
    );
  }
}
function upload(theme3) {
  if ($.log.config.silent)
    return;
  if ($.mode.watch) {
    $.log.queue.add([theme3.target, theme3.store, timer.stop()]);
    if ($.log.idle)
      return;
    else
      $.log.idle = true;
    queue.onIdle().then(() => {
      for (const [
        target,
        store,
        ctime
      ] of $.log.queue) {
        log(
          Line(
            neonGreen(
              Prefix("uploaded", bold(target), store, ctime)
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
          Prefix("uploaded", bold(theme3.target), theme3.store, timer.stop())
        )
      )
    );
  }
}
function invalid(path2, message) {
  log(
    LineRed(
      red(
        Prefix("invalid", path2)
      )
    )
  );
  notifier__default.default.notify(
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
          color: red.bold
        }
      )
    );
  }
}
function error2(input, { suffix = null, notify = null } = {}) {
  error(
    LineRed(
      red(
        Prefix("error", suffix ? input + " " + Append(suffix) : input)
      )
    )
  );
  if (notify !== null) {
    notifier__default.default.notify(notify).notify();
  }
}
function spawn2(name) {
  return function(...input) {
    if (!$.spawn.invoked)
      $.spawn.invoked = true;
    if ($.log.group !== "Spawn") {
      log(End($.log.group));
      if ($.log.group !== "Syncify")
        clear3();
      log(Top("Spawn"));
      $.log.group = "Spawn";
    }
    if ($.log.title !== name) {
      log(Next(neonCyan(name)));
      $.log.title = name;
    }
    spawn.call(this, input.toString());
  };
}
function warn2(message, suffix) {
  if (suffix) {
    log(
      LineYellow(
        yellowBright(
          Prefix("warning", message) + Append(suffix)
        )
      )
    );
  } else {
    log(
      LineYellow(
        yellowBright(
          Prefix("warning", message)
        )
      )
    );
  }
}
function retrying(file, theme3) {
  log(
    Line(
      orange(
        Prefix("retrying", file, theme3.target, theme3.store)
      )
    )
  );
}
function deleted(file, theme3) {
  log(
    Line(
      blueBright(
        Prefix("deleted", file, theme3.target, theme3.store)
      )
    )
  );
}
function transform(label, ...suffix) {
  if ($.mode.build)
    return;
  if (suffix.length > 0) {
    log(
      Line(
        whiteBright(
          Prefix(
            "transform",
            glueString(
              bold(label),
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
        whiteBright(
          Prefix(
            "transform",
            bold(label)
          )
        )
      )
    );
  }
}
function zipped(size2, path2) {
  log(
    Line(
      whiteBright(
        Prefix(
          "zipped",
          glueString(
            bold("ZIP"),
            size2,
            Append(path2)
          )
        )
      )
    )
  );
}
function skipped(file, reason) {
  if ($.mode.export || $.mode.build)
    return;
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
}
function title(label) {
  log(
    Break(
      whiteBright.bold(label)
    )
  );
}
function hot(id) {
  log(
    Line(
      neonRouge(
        Prefix(
          "reloaded",
          glueString(
            bold("HOT RELOAD"),
            Append(timer.now(id))
          )
        )
      )
    )
  );
}
function exported(from, to) {
  if ($.mode.build)
    return;
  log(
    Line(
      teal(
        Prefix(
          "exported",
          glueString(
            bold(from),
            ARR,
            bold(to)
          )
        )
      )
    )
  );
}
function version(vc, type2) {
  log(
    Line(
      whiteBright(
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
}

// syncify/requests/assets.ts
async function find(asset, theme3) {
  const request2 = mergerino_min_default($.sync.stores[theme3.sidx].client, {
    method: "get",
    url: theme3.url,
    params: {
      "asset[key]": asset
    }
  });
  return axios(request2).then(({ data }) => data.asset.value).catch(() => false);
}
async function upload2(asset, config) {
  const request2 = mergerino_min_default($.sync.stores[config.theme.sidx].client, {
    method: "put",
    url: config.theme.url,
    data: {
      asset: {
        key: config.key,
        value: asset
      }
    }
  });
  return axios(request2).then(() => true).catch((e2) => {
    error2(config.key);
    request(config.key, e2.response);
    return false;
  });
}
async function get(theme3, config) {
  const request2 = mergerino_min_default(config, {
    method: "get",
    url: theme3.url
  });
  try {
    const { data } = await axios(request2);
    return data;
  } catch (e2) {
    if (e2.response && (e2.response.status === 429 || e2.response.status === 500)) {
      if (config.params["asset[key]"]) {
        retrying(config.params["asset[key]"], theme3);
        queue.add(() => get(theme3, config));
      }
    } else {
      if ($.mode.upload) {
        throw e2.response;
      } else {
        if (config.params["asset[key]"]) {
          error2(config.params["asset[key]"]);
          request(config.params["asset[key]"], e2.response);
        }
      }
    }
  }
}
var limit;
async function sync(theme3, file, config) {
  if (queue.isPaused)
    return;
  if (queue.concurrency > 2) {
    if (limit >= 20)
      queue.concurrency--;
    if (limit >= 32)
      queue.concurrency--;
    if (limit >= 39)
      await delay(500);
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }
  if ($.mode.upload === false && $.mode.import === false)
    timer.start();
  const promise = await axios(config).then(({ headers, data }) => {
    if ($.mode.import === false && config.method === "get")
      return data;
    if (config.method === "delete") {
      deleted(file.relative, theme3);
    } else {
      if ($.mode.watch) {
        if ($.mode.hot === true && file.type !== 10 /* Script */ && file.type !== 9 /* Style */)
          hot();
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
  }).catch((e2) => {
    if (e2.response && (e2.response.status === 429 || e2.response.status === 500)) {
      if ($.mode.upload === false && $.mode.import === false)
        retrying(file.key, theme3);
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
          error: e2.response,
          get theme() {
            return theme3;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        if (e2.response === void 0) {
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
            error: e2.response,
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
        if (e2.isAxiosError) {
          request(file.relative, e2.response);
        }
      }
    }
    return pMapSkip;
  });
  return promise;
}

// syncify/requests/metafields.ts
init_cjs_shims();
async function find2(store, field) {
  if (is(arguments.length, 1))
    return (_field) => find2(store, _field);
  if (allFalse(has("namespace", field), has("key", field))) {
    invalid("invalid fields");
    return void 0;
  }
  return axios3__default.default.get("metafields.json", store.client).then(({ data }) => {
    return data.metafields.find((m) => field.namespace === m.namespace && field.key === m.key);
  }).catch((e2) => {
    console.log(e2);
    return void 0;
  });
}
async function create3(store, metafield) {
  if (is(arguments.length, 1))
    return (_metafield) => create3(store, _metafield);
  metafield.type = "json";
  metafield.namespace = "email";
  metafield.value_type = "json_string";
  metafield.key = "eng";
  return axios3__default.default.post("metafields.json", { metafield }, store.client).then(({ data }) => {
    console.log("created", data);
    return data.metafield;
  }).catch((e2) => {
    console.log(e2);
    if (!store.queue)
      return errors_exports(metafield.namespace, e2.response);
    if (requeue(e2.response.status)) {
      queue.add(() => create3(store, metafield));
      return void 0;
    } else {
      return errors_exports(store.store, e2.response);
    }
  });
}
async function update(store, id, metafield) {
  if (is(arguments.length, 1))
    return (_id, _field) => update(store, _id, _field);
  return axios3__default.default.put(`metafields/${id}.json`, { metafield }, store.client).then((d) => {
    console.log("created");
    return d.data.metafield;
  }).catch((e2) => {
    if (!store.queue)
      return errors_exports(metafield.namespace, e2.response);
    if (requeue(e2.response.status)) {
      queue.add(() => update(store, id, metafield));
    } else {
      return errors_exports(store.store, e2.response);
    }
  });
}
async function sync2(store, field) {
  if (is(arguments.length, 1))
    return (_field) => sync2(store, _field);
  const data = await find2(store, field);
  if (!data)
    return create3(store, field);
  return update(store, data.id, assign(field, { id: data.id, type: "json" })).catch((e2) => {
    if (!store.queue)
      return errors_exports(field.namespace, e2.response);
    if (requeue(e2.response.status)) {
      queue.add(() => sync2(store, field));
    } else {
      return errors_exports(store.store, e2.response);
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
        if ($.mode.upload)
          timer.start(file.uuid);
        await sync(theme3, file, assign(
          { url: theme3.url },
          stores[theme3.sidx].client,
          payload
        ));
      }));
    },
    pages: async (method, file, content) => {
      await queue.add(() => pMap(stores, async (store) => {
        if ($.mode.upload)
          timer.start();
        console.log(content);
      }));
    },
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

// syncify/process/context.ts
init_cjs_shims();

// syncify/utils/paths.ts
init_cjs_shims();
function globPath(path2) {
  return isArray2(path2) ? path2.filter((uri) => /\*/.test(uri)) : /\*/.test(path2) ? path2 : null;
}
function lastPath(path2) {
  if (isArray2(path2))
    return path2.map(lastPath);
  if (path2.indexOf("/") === -1)
    return path2;
  const dir = pathe.dirname(path2);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
}
function parentPath(path2) {
  if (isArray2(path2))
    return path2.map(parentPath);
  const last2 = path2.lastIndexOf("/");
  if (last2 === -1)
    return path2;
  const glob9 = path2.indexOf("*");
  return glob9 === -1 ? path2.slice(0, last2) : path2.slice(0, glob9);
}
function normalPath(input) {
  const regex2 = new RegExp(`^\\.?\\/?${input}\\/`);
  return function prepend(path2) {
    if (isArray2(path2))
      return path2.map(prepend);
    const ignore = path2.charCodeAt(0) === 33;
    if (ignore)
      path2 = path2.slice(1);
    if (regex2.test(path2))
      return ignore ? "!" + path2 : path2;
    if (path2.charCodeAt(0) === 46 && path2.charCodeAt(1) === 46 && path2.charCodeAt(2) === 47) {
      throwError(
        `Invalid path defined at: ${COL} ${yellowBright(`"${path2}"`)}`,
        ["Paths must be relative to source"]
      );
    }
    return (ignore ? "!" : "") + pathe.join(input, path2);
  };
}
var basePath = (cwd) => (path2) => {
  if (path2.indexOf("*") !== -1) {
    throwError(
      `Base directory path cannot contain glob${COL} ${yellowBright(`"${path2}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
  if (path2.charCodeAt(0) === 46) {
    if (path2.length === 1)
      return cwd + "/";
    if (path2.charCodeAt(1) === 47) {
      path2 = path2.slice(1);
    } else {
      throwError(
        `Directory path is invalid at${COL} ${yellowBright(`"${path2}"`)}`,
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
    path2 = pathe.join(cwd, path2);
    return last(path2).charCodeAt(0) === 47 ? path2 : path2 + "/";
  } else {
    throwError(
      `Directory path is invalid at${COL} ${yellowBright(`"${path2}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
};

// syncify/process/context.ts
function svg(file) {
  const config = $.svg.filter((context) => {
    if (context.input.has(file.input))
      return true;
    if (!context.match(file.input))
      return false;
    context.input.add(file.input);
    return true;
  });
  if (isUndefined(config))
    return file;
  defineProperty(file, "data", { get() {
    return config;
  } });
  return file;
}
function style(file) {
  const config = $.style.find((x) => x.watch(file.input));
  if (isUndefined(config))
    return file;
  defineProperty(file, "data", {
    get() {
      return config;
    }
  });
  if (config.snippet) {
    file.namespace = "snippets";
    file.key = pathe.join("snippets", config.rename);
  } else {
    file.key = pathe.join("assets", config.rename);
  }
  if (file.output) {
    if (file.data.rename !== pathe.basename(file.output)) {
      if (config.snippet) {
        file.output = pathe.join($.dirs.output, file.key);
      } else {
        file.output = pathe.join(parentPath(file.output), file.data.rename);
      }
    }
  } else {
    file.output = pathe.join($.dirs.output, file.key);
  }
  return file;
}
function script(file) {
  const config = $.script.filter((config2) => config2.watch.has(file.input));
  if (config.length === 0)
    return file;
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
    if (file.base.endsWith("-group.json"))
      return file;
    if (isRegex($.section.global) && $.section.global.test(file.input))
      return file;
    const last2 = lastPath(file.input);
    if ($.section.baseDir.has(last2))
      return file;
    const rename = lastPath(file.input) + $.section.separator + file.base;
    file.name = rename;
    file.key = pathe.join(file.namespace, rename);
    file.output = pathe.join(pathe.dirname(file.output), rename);
  }
  return file;
}
function snippet(file) {
  if ($.snippet.prefixDir) {
    if (isRegex($.snippet.global) && $.snippet.global.test(file.input))
      return file;
    const last2 = lastPath(file.input);
    if ($.snippet.baseDir.has(last2))
      return file;
    const rename = last2 + $.snippet.separator + file.base;
    file.name = rename;
    file.key = pathe.join(file.namespace, rename);
    file.output = pathe.join(pathe.dirname(file.output), rename);
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
  if (/\[dir\]/.test(newName))
    newName = newName.replace(/\[dir\]/g, dir);
  if (/\[file\]/.test(newName))
    newName = newName.replace(/\[file\]/g, name);
  if (/\[ext\]/.test(newName))
    newName = newName.replace(/\[ext\]/g, ext);
  if (namespace === "snippets" && rename.endsWith(".liquid") === false)
    return newName + ".liquid";
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
      key = pathe.join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = pathe.join(namespace, file.base);
      output = pathe.join(output, key);
    }
    if (kind === -1)
      input = $.cache.paths[input];
    file.uuid = uuid();
    file.type = type2;
    file.key = key;
    file.namespace = namespace;
    file.kind = kind;
    file.input = input;
    file.output = output;
    file.relative = pathe.relative($.cwd, input);
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
      relative: pathe.relative($.cwd, output)
    });
  };
}
function parseFile(paths2, output) {
  return function fn(path2) {
    const file = new File(pathe.parse(path2));
    const define2 = setFile(file, path2, output);
    if (file.ext === ".liquid") {
      if (paths2.sections.match(path2)) {
        return section(define2("sections" /* Sections */, 4 /* Section */, "Liquid" /* Liquid */));
      } else if (paths2.snippets.match(path2)) {
        return snippet(define2("snippets" /* Snippets */, 3 /* Snippet */, "Liquid" /* Liquid */));
      } else if (paths2.layout.match(path2)) {
        return define2("layout" /* Layout */, 2 /* Layout */, "Liquid" /* Liquid */);
      } else if (paths2.templates.match(path2)) {
        return define2("layout" /* Layout */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.customers.match(path2)) {
        return define2("templates/customers" /* Customers */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.metaobject.match(path2)) {
        return define2("templates/metaobject" /* Metaobject */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.transforms.has(path2)) {
        if (paths2.transforms.get(path2) === 9 /* Style */) {
          return style(define2("snippets" /* Snippets */, 9 /* Style */, "CSS" /* CSS */));
        }
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
      if ($.spawn.invoked)
        return define2("assets" /* Assets */, 17 /* Spawn */);
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
  const path2 = pathe.join(outputPath, key);
  const file = new File(pathe.parse(path2));
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
  const file = new File(pathe.parse(path2));
  const merge = setFile(file, path2, output);
  switch (pathe.basename(file.dir)) {
    case "sections":
      return merge("sections" /* Sections */, 4 /* Section */, -1);
    case "snippets":
      return merge("snippets" /* Snippets */, 3 /* Snippet */, -1);
    case "layout":
      return merge("layout" /* Layout */, 2 /* Layout */);
    case "templates":
      return merge("templates" /* Templates */, 1 /* Template */, -1);
    case "customers":
      return merge("templates/customers" /* Customers */, 1 /* Template */, -1);
    case "metaobject":
      return merge("templates/metaobject" /* Metaobject */, 1 /* Template */, -1);
    case "config":
      return merge("config" /* Config */, 7 /* Config */, -1);
    case "locales":
      return merge("locales" /* Locales */, 8 /* Locale */, -1);
    case "assets":
      return merge("assets" /* Assets */, 14 /* Asset */, -1);
  }
};

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
var EXP = /{%-?\s*render\s+['"]hot\.js['"]/;
async function injectSnippet() {
  const key = "snippets/hot.js.liquid";
  const [theme3] = $.sync.themes;
  const snippet2 = await fsExtra.readFile($.hot.snippet);
  const upload4 = await upload2(snippet2.toString(), { theme: theme3, key });
  log_update_default(Line(gray(` ${TLD} ${neonCyan(key)} uploaded snippet injection`)));
  return upload4;
}
function hasSnippet(content) {
  return EXP.test(content);
}
function inject(content) {
  if (!hasSnippet(content))
    return writeRender(content);
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
  const exists2 = await fsExtra.pathExists(path2);
  if (!exists2)
    return null;
  const local = await fsExtra.readFile(path2);
  let content = local.toString();
  const [theme3] = $.sync.themes;
  const name = pathe.basename(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme3);
  if (isString(string)) {
    if (EXP.test(string)) {
      content = removeRender(content);
      const removed = await upload2(content, { theme: theme3, key });
      return removed;
    }
    return true;
  }
}
async function injectRender(path2) {
  const exists2 = await fsExtra.pathExists(path2);
  if (!exists2)
    return null;
  const local = await fsExtra.readFile(path2);
  let content = local.toString();
  if (!EXP.test(content)) {
    content = writeRender(content);
    await fsExtra.writeFile(path2, content);
    log_update_default(Line(gray(` ${TLD} injected render tag in output layout`)));
  }
  const [theme3] = $.sync.themes;
  const name = pathe.basename(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme3);
  if (isString(string)) {
    if (EXP.test(string))
      content = removeRender(content);
    const upload4 = await upload2(content, { theme: theme3, key });
    if (upload4) {
      log_update_default(Line(gray(` ${TLD} uploaded and inject render tag`)));
      return true;
    }
    return false;
  }
}

// syncify/modes/upload.ts
function getModel(size2) {
  if (size2 === 0) {
    throwError("Empty output directory", [
      `There are no files within ${neonCyan(pathe.relative($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme3 of $.sync.themes) {
    if (theme3.target.length > width)
      width = theme3.target.length;
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
  const files = glob6__default.default.sync(`${$.dirs.output}/**`).sort();
  const sync4 = getModel(files.length);
  let interval = null;
  await delay(500);
  function logger2(message) {
    const record = message.toRaw();
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    log_update_default(message.toString());
    interval = setInterval(() => {
      record[3] = Line(
        gray(
          Prefix(
            "Elapsed",
            whiteBright.bold(timer.now("upload"))
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
    const message = Create().NL.Line(toUpcase(file.namespace), bold.whiteBright).NL.Line(Prefix("Elapsed", whiteBright.bold(timer.now("upload"))), gray).Line(Prefix("Duration", whiteBright(timer.stop(file.uuid))), gray).Line(Prefix("Size", whiteBright(getSizeStr(file.size))), gray).Newline();
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
        record.processed = redBright(file.key);
      }
    }
    for (const [id, { success, size: size2, failed, retry, progress: progress2, processed }] of sync4) {
      const [store, target] = id.split(":");
      const uploaded = `${bold(`${success}`)} ${white("of")} ${bold(`${size2}`)}`;
      const retrying2 = bold(`${retry}`);
      const failures = bold(`${failed}`);
      message.Line(`${bold(target.toUpperCase())}  ${ARR}  ${store}`, whiteBright).NL.Line(processed).NL.Line(Prefix("uploaded", uploaded), whiteBright).Line(Prefix("retrying", retrying2), retry > 0 ? orange : whiteBright).Line(Prefix("failures", failures), failed > 0 ? redBright : whiteBright).NL.Insert(progress2.render()).Newline();
    }
    logger2(message);
  }
  event.on("upload", callback);
  await delay(500);
  for (const path2 of files) {
    const file = parse5(path2);
    let input;
    try {
      const read2 = await fsExtra.readFile(file.output);
      input = read2.toString();
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
    } catch (e2) {
      write("Error reading output file", {
        file: file.key,
        source: file.relative
      })(e2);
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
      const name = bold(`${theme3.target.toUpperCase()} THEME`);
      const failures = bold(`${failed}`);
      const uploaded = `${bold(`${success}`)} ${white("of")} ${bold(`${size2}`)}`;
      log(
        Create().Line(`${name}  ${ARR}  ${theme3.store}`).NL.Line(Prefix("uploaded", uploaded), neonGreen).Line(Prefix("failures", failures), redBright).NL.toString()
      );
      let number = 1;
      for (const record of errors.remote.values()) {
        const errno = `${(number < 10 ? "0" : "") + number++}`;
        nwl();
        write2(redBright.bold(`ERROR ${errno}`));
        request(record.file.input, record.error);
      }
      hline();
      hasErrors = true;
    }
  }
  await delay(500);
  if (!hasErrors) {
    log(Break(gray("No errors!")));
  }
  log_update_default(Break("Uploaded Completed"));
  process.exit(0);
}

// syncify/modes/build.ts
init_cjs_shims();

// syncify/transform/asset.ts
init_cjs_shims();
function passthrough(file, sync4) {
  const { type: type2, relative: relative15, kind, key, output } = file;
  return async function(data) {
    if (type2 !== 17 /* Spawn */) {
      if ($.mode.watch) {
        $.watch.unwatch(output);
      }
      await fsExtra.writeFile(output, data).catch(
        write("Error writing asset to output directory", {
          file: relative15,
          source: relative15
        })
      );
    }
    if ($.mode.hot) {
      syncing(key, { hot: true });
      if (kind === "JavaScript" /* JavaScript */) {
        $.wss.script(file.uuid, pathe.basename(key));
      } else if (kind === "CSS" /* CSS */) {
        $.wss.stylesheet(file.uuid, pathe.basename(key));
      }
    }
    if ($.env.sync !== 0 && $.mode.build === false) {
      await sync4("put", file, data);
    }
  };
}
async function compile(file, sync4, cb) {
  const copy = passthrough(file, sync4);
  const data = await fsExtra.readFile(file.input).catch(
    write("Error reading asset file", {
      file: file.relative,
      source: file.relative
    })
  );
  if (data) {
    const value = data.toString();
    if (isEmptyString(value)) {
      if ($.mode.watch)
        skipped(file, "empty file");
      return null;
    }
    if (!isFunction(cb))
      return copy(value);
    const update2 = cb.apply({ ...file }, value);
    if (isUndefined(update2) || update2 === false) {
      return copy(value);
    } else if (isType(update2)) {
      return copy(update2);
    } else if (isBuffer(update2)) {
      return copy(update2.toString());
    }
    await copy(value);
  }
  return null;
}

// syncify/transform/liquid.ts
init_cjs_shims();

// syncify/transform/schema.ts
init_cjs_shims();

// node_modules/.pnpm/parse-json@7.1.0/node_modules/parse-json/index.js
init_cjs_shims();
var import_error_ex = __toESM(require_error_ex(), 1);
var import_json_parse_even_better_errors = __toESM(require_lib(), 1);
var import_code_frame = __toESM(require_lib4(), 1);

// node_modules/.pnpm/lines-and-columns@2.0.3/node_modules/lines-and-columns/build/index.mjs
init_cjs_shims();
var LF = "\n";
var CR = "\r";
var LinesAndColumns = (
  /** @class */
  function() {
    function LinesAndColumns2(string) {
      this.length = string.length;
      var offsets = [0];
      for (var offset = 0; offset < string.length; ) {
        switch (string[offset]) {
          case LF:
            offset += LF.length;
            offsets.push(offset);
            break;
          case CR:
            offset += CR.length;
            if (string[offset] === LF) {
              offset += LF.length;
            }
            offsets.push(offset);
            break;
          default:
            offset++;
            break;
        }
      }
      this.offsets = offsets;
    }
    LinesAndColumns2.prototype.locationForIndex = function(index) {
      if (index < 0 || index > this.length) {
        return null;
      }
      var line2 = 0;
      var offsets = this.offsets;
      while (offsets[line2 + 1] <= index) {
        line2++;
      }
      var column = index - offsets[line2];
      return { line: line2, column };
    };
    LinesAndColumns2.prototype.indexForLocation = function(location) {
      var line2 = location.line, column = location.column;
      if (line2 < 0 || line2 >= this.offsets.length) {
        return null;
      }
      if (column < 0 || column > this.lengthOfLine(line2)) {
        return null;
      }
      return this.offsets[line2] + column;
    };
    LinesAndColumns2.prototype.lengthOfLine = function(line2) {
      var offset = this.offsets[line2];
      var nextOffset = line2 === this.offsets.length - 1 ? this.length : this.offsets[line2 + 1];
      return nextOffset - offset;
    };
    return LinesAndColumns2;
  }()
);

// node_modules/.pnpm/parse-json@7.1.0/node_modules/parse-json/index.js
var JSONError = (0, import_error_ex.default)("JSONError", {
  fileName: import_error_ex.default.append("in %s"),
  codeFrame: import_error_ex.default.append("\n\n%s\n")
});
function parseJson(string, reviver, filename) {
  if (typeof reviver === "string") {
    filename = reviver;
    reviver = null;
  }
  try {
    try {
      return JSON.parse(string, reviver);
    } catch (error3) {
      (0, import_json_parse_even_better_errors.default)(string, reviver);
      throw error3;
    }
  } catch (error3) {
    error3.message = error3.message.replace(/\n/g, "");
    const indexMatch = error3.message.match(/in JSON at position (\d+) while parsing/);
    const jsonError = new JSONError(error3);
    if (filename) {
      jsonError.fileName = filename;
    }
    if (indexMatch && indexMatch.length > 0) {
      const lines = new LinesAndColumns(string);
      const index = Number(indexMatch[1]);
      const location = lines.locationForIndex(index);
      const generateCodeFrame = ({ highlightCode }) => (0, import_code_frame.codeFrameColumns)(
        string,
        { start: { line: location.line + 1, column: location.column + 1 } },
        { highlightCode }
      );
      jsonError.codeFrame = generateCodeFrame({ highlightCode: true });
      jsonError.rawCodeFrame = generateCodeFrame({ highlightCode: false });
    }
    throw jsonError;
  }
}

// syncify/log/warnings.ts
init_cjs_shims();
function getStack(processor2, uri) {
  if (has2(uri, $.warnings)) {
    if ($.warnings[uri].has(processor2))
      return $.warnings[uri].get(processor2);
    return $.warnings[uri].set(processor2, /* @__PURE__ */ new Set()).get(processor2);
  }
  $.warnings[uri] = /* @__PURE__ */ new Map([[processor2, /* @__PURE__ */ new Set()]]);
  return $.warnings[uri].get(processor2);
}
function schema2(file, options) {
  const stack = getStack("schema", file.input);
  const output = Create({ type: "warning" }).NL.Wrap(options.message, yellowBright).Context({
    stack: false,
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
  const output = Create({ type: "warning" }).NL.Wrap(message, yellowBright);
  if (has2("span", options)) {
    const { span } = options;
    const code = has2("context", span) ? span.context : span.text;
    const content = code.slice(span.start.offset, span.end.offset);
    const lines = content.split("\n");
    if (lines.length < 15) {
      const space = sanitize(span.end.line).length;
      let from = span.start.line + 1;
      for (const line2 of lines) {
        const number = sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        output.Trim(`   ${align + blue(number)} ${Tree.trim} ${line2}`);
      }
    }
  }
  const context = output.NL.Wrap(options.stack, yellowBright).NL.Context({
    stack: false,
    entries: {
      source: file.relative,
      deprecated: options.deprecation ? "Yes" : "No"
    }
  }).toString();
  if (!stack.has(context))
    stack.add(context);
  if (!$.mode.build) {
    log(
      LineYellow(
        yellowBright(
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
  if ($.terser.liquid.minifySchema === false) {
    if ($.processor.json.useTab) {
      return JSON.stringify(schema3, null, "	".repeat($.processor.json.indent));
    } else {
      return JSON.stringify(schema3, null, $.processor.json.indent);
    }
  }
  return JSON.stringify(schema3, null, 0);
}

// syncify/transform/schema.ts
async function ExtractSchema(file) {
  const read2 = await fsExtra.readFile(file.input);
  const content = read2.toString();
  const open = content.search(/{%-?\s*schema/);
  if (open < 0)
    return [content, null, null];
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
  } catch (e2) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base}`
      }
    });
    if (e2 instanceof JSONError) {
      json(e2, file);
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
            message: "unknown schema key",
            schema: "settings"
          });
        } else {
          warn2(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
        }
      }
    } else {
      if ($.mode.build) {
        schema2(file, {
          shared: prop,
          $ref: schema3[i].$ref,
          message: "unknown schema",
          schema: "settings"
        });
      } else {
        warn2(`unknown $ref ${bold(schema3[i].$ref)} `, file.base);
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
              shared: shared.uri,
              $ref: schema3[i].$ref,
              message: "unknown schema key",
              schema: "blocks"
            });
          } else {
            warn2(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
          }
        }
      } else {
        if ($.mode.build) {
          schema2(file, {
            shared: key,
            $ref: schema3[i].$ref,
            message: "unknown schema",
            schema: "settings"
          });
        } else {
          warn2(`unknown $ref ${bold(schema3[i].$ref)} `, file.base);
        }
      }
    } else {
      const block = {};
      for (const prop in schema3[i]) {
        if (prop !== "settings")
          block[prop] = schema3[i][prop];
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
                    shared: shared.uri,
                    $ref: setting.$ref,
                    message: "unknown schema key",
                    schema: "blocks"
                  });
                } else {
                  warn2(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
                }
              }
            } else {
              if ($.mode.build) {
                schema2(file, {
                  shared: prop,
                  $ref: setting.$ref,
                  message: "unknown schema",
                  schema: "blocks"
                });
              } else {
                warn2(`unknown $ref ${bold(setting.$ref)} `, file.base);
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
    const read2 = await fsExtra.readFile(file.input);
    const hash = checksum(file.input);
    if (has2(file.input, $.cache.schema) && $.cache.checksum[file.input] === hash && $.section.shared.has(file.name)) {
      return $.section.shared.get(file.name);
    }
    ;
    $.cache.checksum[file.input] = hash;
    const data = read2.toString();
    if (data.trim().length === 0) {
      warn2("empty file", "no shared schema defined");
      return null;
    }
    const schema3 = parseJson(data.toString());
    if (has2("$schema", schema3))
      delete schema3.$schema;
    if (has2("$description", schema3))
      delete schema3.$description;
    for (const prop in schema3) {
      if (isObject(schema3[prop])) {
        if (has2("$description", schema3[prop])) {
          delete schema3[prop].$description;
        }
      } else if (isArray2(schema3[prop])) {
        for (const setting of schema3[prop]) {
          if (has2("$description", setting))
            delete setting.$description;
        }
      }
    }
    return $.section.shared.set(file.name, {
      uri: file.input,
      schema: schema3
    }).get(file.name);
  } catch (e2) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base}`
      }
    });
    if (e2 instanceof JSONError) {
      json(e2, file);
    }
    return null;
  }
}
async function CreateSection(file) {
  const read2 = await ExtractSchema(file);
  if (read2 === null)
    return null;
  const [before, schema3, after] = read2;
  if (schema3 === null)
    return before;
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
  if (shared === null)
    return null;
  const files = toArray($.cache.schema[shared.uri]);
  const sections = await pMap(files, (p) => {
    return defineProperty(file.data(p), "data", {
      get() {
        return $.cache.sections[p];
      }
    });
  });
  process5("Shared Schema", `${sections.length} ${plural("section", sections.length)}`);
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

// syncify/transform/liquid.ts
var LiquidLineComments = /{%-?\s*#[\s\S]+?%}/g;
var LiquidBlockComments = /{%-?\s*comment\s*-?%}[\s\S]+?{%-?\s*endcomment\s*-?%}/g;
var LiquidTag = /{%-?\s*liquid[\s\S]+?%}/g;
var ScriptJsonWhitespace = /[^,:'"a-zA-Z0-9=] +[^'"a-zA-Z0-9=}{]/g;
function removeComments(content) {
  return $.terser.liquid.removeComments ? content.replace(LiquidBlockComments, "").replace(LiquidLineComments, "") : content;
}
function minifyLiquidTag(content) {
  return content.replace(LiquidTag, (tag) => "\n" + tag.replace(/#.*?$/gm, "") + "\n");
}
function minifySchema2(file, content) {
  if (!$.terser.liquid.minifySchema)
    return removeComments(content);
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
  if (!$.terser.liquid.stripDashes)
    return content;
  return content;
}
async function htmlMinify(file, content) {
  try {
    const htmlmin = await htmlMinifierTerser.minify(content, $.terser.markup);
    return htmlmin;
  } catch (e2) {
    invalid(file.relative);
    console.error(e2);
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
    await fsExtra.writeFile(file.output, data);
    transform(`${file.namespace} \u2192 ${byteConvert(file.size)}`);
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
  process5("HTML Terser", timer.now());
  if (isNil(htmlmin)) {
    await fsExtra.writeFile(file.output, data);
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, "");
  await fsExtra.writeFile(file.output, postmin);
  const size2 = fileSize(data, file.size);
  if (size2.isSmaller) {
    transform(`${file.namespace} ${size2.before} \u2192 gzip ${size2.gzip}`);
  } else {
    minified("Liquid", size2.before, size2.after, size2.saved);
  }
  return postmin;
};
async function compile3(file, cb) {
  if ($.mode.watch)
    timer.start();
  const read2 = await fsExtra.readFile(file.input);
  let input = read2.toString();
  if ($.mode.build) {
    if (file.namespace === "layout") {
      if (hasSnippet(input)) {
        input = removeRender(input);
      }
    }
  }
  if (file.type === 4 /* Section */) {
    const section2 = await CreateSection(file);
    if (section2 === null)
      return;
    input = section2;
  }
  file.size = byteSize(input);
  const edit = transform2(file);
  if (!isType("Function", cb))
    return edit(input);
  const update2 = cb.apply({ ...file }, input);
  if (isType("Undefined", update2) || update2 === false) {
    return edit(input);
  } else if (isType("String", update2)) {
    return edit(update2);
  } else if (Buffer.isBuffer(update2)) {
    return edit(update2.toString());
  }
  return edit(input);
}

// syncify/transform/json.ts
init_cjs_shims();
function parse2(file, data) {
  try {
    return parseJson(data);
  } catch (e2) {
    error2(file.relative, {
      notify: {
        title: "JSON Error",
        message: `Error when parsing ${file.base}`
      }
    });
    if (e2 instanceof JSONError) {
      json(e2, file);
    }
    return null;
  }
}
function minifyJSON(data, space = 0) {
  try {
    return JSON.stringify(data, null, space);
  } catch (e2) {
    console.log(e2);
    return null;
  }
}
async function jsonCompile(file, data, space = 0) {
  const minified2 = minifyJSON(data, space);
  if (isNil(minified2)) {
    if ($.mode.watch)
      timer.stop();
    return data;
  }
  if (space === 0) {
    const size2 = fileSize(minified2, file.size);
    minified("JSON", size2.before, size2.after, size2.saved);
  } else {
    transform(file.namespace, byteConvert(file.size));
  }
  if (file.type === 15 /* Metafield */)
    return minified2;
  fsExtra.writeFile(file.output, minified2).catch(
    write("Error writing JSON", {
      file: file.relative
    })
  );
  return minified2;
}
async function compile4(file, cb) {
  if ($.mode.watch)
    timer.start();
  const json2 = await fsExtra.readFile(file.input).catch(
    write("Error reading JSON file", {
      file: file.relative
    })
  );
  if (isBuffer(json2)) {
    const read2 = json2.toString();
    file.size = byteSize(read2);
    if (read2.trim().length === 0) {
      skipped(file, "empty file");
      return null;
    }
    if (file.type === 7 /* Config */ && file.name === "settings_data") {
      for (const theme3 of $.sync.themes) {
        await find("config/settings_data.json", theme3);
      }
    }
    const data = parse2(file, read2);
    if (data === null)
      return null;
    if (isEmpty2(data)) {
      skipped(file, "empty file");
      return null;
    }
    let space = $.processor.json.indent;
    if ($.mode.terse) {
      if (file.type === 14 /* Asset */) {
        if ($.terser.json.assets)
          space = 0;
      } else if (file.type === 8 /* Locale */) {
        if ($.terser.json.locales)
          space = 0;
      } else if (file.type === 1 /* Template */) {
        if ($.terser.json.templates)
          space = 0;
      } else if (file.type === 15 /* Metafield */) {
        if ($.terser.json.metafields)
          space = 0;
      } else if (file.type === 6 /* Metaobject */) {
        if ($.terser.json.metaobject)
          space = 0;
      } else if (file.type === 4 /* Section */) {
        if ($.terser.json.groups)
          space = 0;
      } else if (file.type === 7 /* Config */) {
        if ($.terser.json.config)
          space = 0;
      }
    }
    if (!isFunction(cb))
      return jsonCompile(file, data, space);
    const update2 = cb.apply({ ...file }, data);
    if (isUndefined(update2)) {
      return jsonCompile(file, data, space);
    } else if (isArray2(update2) || isObject(update2)) {
      return jsonCompile(file, sanitize(update2), space);
    } else if (isString(update2)) {
      return jsonCompile(file, parse2(file, update2), space);
    } else if (isBuffer(update2)) {
      return jsonCompile(file, parse2(file, update2.toString()), space);
    }
    await jsonCompile(file, data, space);
  }
}

// syncify/transform/script.ts
init_cjs_shims();
var esbuild3 = null;
function esbuildModule() {
  esbuild3 = getImport("esbuild");
  if (isNil(esbuild3)) {
    esbuild3 = null;
    return false;
  }
  return true;
}
async function esbuildBundle(config) {
  if ($.processor.esbuild.loaded)
    config.watch.clear();
  const result = await esbuild3.build(config.esbuild);
  if ($.mode.terse && $.mode.build) {
    config.size = byteSize(result.outputFiles[0].text);
  }
  if ($.mode.watch) {
    await getWatchPaths(config, result.metafile.inputs);
  } else {
    if (!config.watch.has(config.input))
      config.watch.add(config.input);
    if (!$.watch.has(config.input))
      $.watch.add(config.input);
  }
}
async function getWatchPaths(config, inputs) {
  const { cwd, watch: watch2, mode } = $;
  for (const file in inputs) {
    if (file.indexOf("/node_modules/") > -1)
      continue;
    const path2 = pathe.join(cwd, file);
    if (!config.watch.has(path2))
      config.watch.add(path2);
    if (!watch2.has(path2))
      watch2.add(path2);
    if (mode.watch)
      ;
  }
  if (mode.watch && $.processor.esbuild.loaded) {
    await pNext().then(() => {
      for (const path2 of config.watch) {
        if (path2.indexOf("/node_modules/") > -1)
          continue;
        if (config.watchCustom !== null && config.watchCustom(path2))
          continue;
        if (!has2(path2.slice(cwd.length + 1), inputs)) {
          config.watch.delete(path2);
          watch2.unwatch(path2);
        }
      }
    });
  }
}
function createSnippet(string, attrs) {
  return attrs.length > 0 ? `<script ${attrs.join(" ")}>${string}</script>` : `<script>${string}</script>`;
}
function runHook(hook) {
  if (!isType("Function", hook))
    return false;
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
async function compile5(file, sync4, hooks2) {
  if (!file.data)
    return;
  if ($.mode.watch)
    timer.start();
  if ($.mode.hot)
    timer.start(file.uuid);
  const hook = runHook(hooks2);
  const trigger2 = file.data.length;
  for (const config of file.data) {
    const {
      key,
      input,
      output,
      snippet: snippet2,
      attrs,
      esbuild: { format }
    } = config;
    try {
      const {
        metafile,
        outputFiles,
        warnings: warnings2
      } = await esbuild3.build(config.esbuild);
      if (trigger2 > 1) {
        nwl();
        write2(pathe.relative($.cwd, input));
      }
      if ($.mode.watch) {
        await getWatchPaths(config, metafile.inputs);
      }
      if (warnings2.length > 0)
        esbuild2(warnings2);
      for (const { text, path: path2 } of outputFiles) {
        if (path2.endsWith(".map")) {
          const map = pathe.join($.dirs.sourcemaps.scripts, `${file.base}.map`);
          fsExtra.writeFile(map, text).catch(
            write("Error writing JavaScript Source Map to cache", {
              file: pathe.relative($.cwd, map),
              source: file.relative
            })
          );
        } else {
          if ($.mode.terse) {
            if (isNaN(config.size)) {
              transform(file.kind, `${bold(format.toUpperCase())} bundle`);
              minified(getSizeStr(text));
            } else {
              const { before, after, saved } = fileSize(text, config.size);
              transform(`${bold(format.toUpperCase())} bundle \u2192 ${bold(getSizeStr(text))}`);
              minified(null, before, after, saved);
            }
          } else {
            transform(`${bold(format.toUpperCase())} bundle \u2192 ${bold(getSizeStr(text))}`);
          }
          let content;
          if (snippet2) {
            content = createSnippet(text, attrs);
            if (hook) {
              content = hook(file, content);
              if (content === null)
                continue;
            }
            await fsExtra.writeFile(output, content).catch(
              write("Error writing inline <script> snippet", {
                file: file.relative
              })
            );
            exported("script", "snippet");
          } else {
            content = text;
            if (hook) {
              content = hook(file, content);
              if (content === null)
                continue;
            }
            await fsExtra.writeFile(output, content).catch(
              write("Error writing JavaScript asset", {
                file: file.relative
              })
            );
          }
          if ($.mode.hot) {
            syncing(key, { hot: true });
            $.wss.script(file.uuid, pathe.basename(key));
            await sync4("put", config, content);
          } else if (!$.mode.build) {
            syncing(key);
            await sync4("put", config, content);
          }
        }
      }
      ;
    } catch (e2) {
      if (has2("errors", e2)) {
        timer.clear();
        error2(file.relative, {
          notify: {
            title: "JavaScript Error",
            message: `Transform failed for ${file.base}`
          }
        });
        $.errors.add(input);
        e2.errors.forEach(esbuild);
      }
    }
  }
  if (trigger2 > 1)
    nwl();
}

// syncify/transform/style.ts
init_cjs_shims();
var postcss3 = null;
var sass3 = null;
async function load(id) {
  if (id === "postcss") {
    const pcss = await import('postcss');
    postcss3 = pcss.default;
    return isNil2(postcss3) === false;
  }
  if (id === "sass") {
    sass3 = __require("sass");
    return isNil2(sass3) === false;
  }
}
function write3(file, cb) {
  const scope = isFunction(cb) ? { ...file } : false;
  return async function(data) {
    if (isNil2(data))
      return null;
    let content;
    if (scope !== false) {
      const update2 = cb.apply({ ...file }, Buffer.from(data));
      if (isUndefined(update2) || update2 === false) {
        content = data;
      } else if (isString(update2) || isBuffer(update2)) {
        content = sanitize(update2);
      }
    } else {
      content = data;
    }
    fsExtra.writeFile(file.output, content).catch(
      write("Error writing stylesheet to output", {
        input: file.relative,
        output: pathe.relative($.cwd, file.output)
      })
    );
    const size2 = fileSize(data, file.size);
    if (size2.isSmaller) {
      if (file.kind === "SCSS" /* SCSS */ || file.kind === "SASS" /* SASS */) {
        transform(file.kind, bold("CSS"), size2.before);
      } else {
        transform("CSS", size2.before, `gzip ${size2.gzip}`);
      }
    } else {
      minified("CSS", size2.before, size2.after, size2.saved);
    }
    if ($.mode.hot) {
      $.wss.stylesheet(file.uuid, pathe.basename(file.key));
    }
    return content;
  };
}
async function sassProcess(file) {
  const { data } = file;
  if (isBoolean(data.sass) && data.sass === false)
    return readStyleFile(file);
  const options = isObject(data.sass) ? mergerino_min_default($.processor.sass.config, data.sass) : $.processor.sass.config;
  if (file.ext === ".scss" || file.ext === ".sass") {
    if ($.mode.watch)
      timer.start();
    try {
      const { css, sourceMap } = sass3.compile(data.input, {
        loadPaths: options.include,
        sourceMapIncludeSources: data.postcss,
        sourceMap: options.sourcemap,
        style: options.style,
        alertColor: false,
        alertAscii: false,
        quietDeps: options.quietDeps,
        charset: data.snippet === false,
        logger: {
          debug: (msg) => console.log("DEBUG", msg),
          warn: sass2(file)
        }
      });
      if (options.sourcemap) {
        const map = pathe.join($.dirs.sourcemaps.styles, file.base + ".map");
        fsExtra.writeFile(map, JSON.stringify(sourceMap)).catch(
          write("Error writing SASS Source Map file to the cache directory", {
            file: pathe.relative($.cwd, map),
            source: file.relative
          })
        );
      }
      process5("SASS Dart", timer.stop());
      file.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e2) {
      if ($.mode.watch) {
        timer.clear();
        error2(file.relative, {
          notify: {
            title: "SCSS Transform Error",
            message: `SASS Dart failed to process ${file.base}`
          }
        });
        sass(file, e2);
      }
      return null;
    }
  }
  return readStyleFile(file);
}
async function readStyleFile(file) {
  try {
    const css = await fsExtra.readFile(file.input);
    file.size = byteSize(css);
    return {
      css: css.toString(),
      map: null
    };
  } catch (e2) {
    timer.clear();
    error2(file.relative, {
      notify: {
        title: "Read Error",
        message: `File ${file.base} could not be read`
      }
    });
    throws(e2, {
      source: file.relative,
      transform: "style"
    });
    return null;
  }
}
async function postcssProcess(file, css, map) {
  const { data } = file;
  try {
    if ($.mode.watch)
      timer.start();
    const cfg = isBoolean(file.data.postcss) ? $.processor.postcss.config : file.data.postcss;
    const plugins2 = isArray2(cfg) ? cfg : cfg.plugins;
    const result = await postcss3(plugins2).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? {
        prev: map,
        inline: false,
        absolute: true
      } : null
    });
    if ($.mode.watch)
      process5("PostCSS", timer.stop());
    const issues = result.warnings();
    if (issues.length > 0) {
      for (const warning of issues) {
        postcss2(file, warning);
      }
    }
    return result.css.toString();
  } catch (e2) {
    if ($.mode.watch) {
      timer.clear();
      error2(file.relative, {
        notify: {
          title: "PostCSS Transform Error",
          message: `PostCSS failed to process ${file.base}`
        }
      });
      postcss(file, e2);
    }
    return null;
  }
}
function createSnippet2(string, attrs) {
  return attrs.length > 0 ? `<style ${attrs.join(" ")}>${string}</style>` : `<style>${string}</style>`;
}
async function compile6(file, cb) {
  if ($.mode.watch)
    timer.start();
  if ($.mode.hot)
    timer.start(file.uuid);
  const output = write3(file, cb);
  try {
    const out = await sassProcess(file);
    if (out === null)
      return null;
    if (isNil2(postcss3) || !file.data.postcss && !file.data.snippet) {
      return output(out.css);
    }
    if (file.data.postcss) {
      const post = await postcssProcess(file, out.css, out.map);
      if (post === null)
        return null;
      if (file.data.snippet) {
        return output(createSnippet2(post, file.data.attrs));
      } else {
        return output(post);
      }
    }
    return file.data.snippet ? output(createSnippet2(out.css, file.data.attrs)) : output(out.css);
  } catch (e2) {
    console.log(e2);
    return null;
  }
}

// syncify/transform/svg.ts
init_cjs_shims();
var Svgo = null;
var SVGSprite = null;
async function load2(id) {
  if (id === "svg-sprite") {
    SVGSprite = (await import('svg-sprite')).default;
    return isNil(SVGSprite) === false;
  }
  if (id === "svgo") {
    Svgo = (await import('svgo')).default;
    return isNil(Svgo) === false;
  }
}
async function getFile(path2) {
  const svg2 = await fsExtra.readFile(path2);
  return [
    path2,
    svg2.toString(),
    byteSize(svg2)
  ];
}
function getSprite(sprite) {
  return new Promise(function(resolve3, reject) {
    sprite.compile((error3, svg2) => {
      if (error3)
        return reject(error3);
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
    if ($.mode.watch)
      timer.start();
    file.kind = "Sprite" /* Sprite */;
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = pathe.join("snippets", renameFile(file, config.rename));
      file.output = pathe.join($.dirs.output, file.key);
    } else {
      file.key = pathe.join("assets", renameFile(file, config.rename));
      file.output = pathe.join($.dirs.output, file.key);
    }
    const options = config.sprite === true ? $.processor.sprite.config : config.sprite;
    const sprite = new SVGSprite(options);
    const items = await pMap(toArray(config.input), getFile).catch(
      write("Error reading an SVG file", {
        file: file.base,
        source: file.relative
      })
    );
    if (items) {
      const svgs = items.filter(([path2, svg2]) => {
        if (hasLiquid(svg2)) {
          skipped(pathe.relative($.cwd, path2), "Liquid Detected");
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
      process5("SVG Sprite", `${length} ${plural("SVG", length)}`, timer.stop());
      await fsExtra.writeFile(file.output, content).catch(
        write("Error writing SVG Sprite", {
          file: file.key,
          caller: context.relative
        })
      );
      const size2 = fileSize(content, file.size);
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
  return run2;
}
function hasLiquid(svg2) {
  return /^(?:{{[\s\S]+?}}|{%[\s\S]+?%})|[^"'](?:{{[\s\S]+?}}|{%[\s\S]+?%})[^'"]/m.test(svg2);
}
function patchPathVoids(svg2) {
  const patch = /<path[^>]*[a-zA-Z"'\s](>)(?!\s*<\/path>)/g;
  if (patch.test(svg2)) {
    const before = `${gray(`<${white("path")}>`)}`;
    const after = `${neonGreen(`<${white("path")} />`)}`;
    transform("SVG", before, after, "patched solidus");
    return svg2.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, "$1 /$2");
  }
  return svg2;
}
function compileInline(context, request2, _cb) {
  const file = assign({}, context);
  async function run2(config) {
    if ($.mode.watch)
      timer.start();
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = pathe.join("snippets", renameFile(file, config.rename));
      file.output = pathe.join($.dirs.output, file.key);
    } else {
      file.key = pathe.join("assets", renameFile(file, config.rename));
      file.output = pathe.join($.dirs.output, file.key);
    }
    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const read2 = await fsExtra.readFile(file.input);
    const node = read2.toString();
    if (hasLiquid(node)) {
      skipped(file, "Liquid Detected");
      return null;
    }
    const patch = patchPathVoids(node);
    file.size = byteSize(patch);
    let svg2;
    try {
      svg2 = Svgo.optimize(patch, options);
    } catch (e2) {
      error2(file.relative, {
        notify: {
          title: "Transform Error",
          message: `SVGO failed to optimize ${file.key}`
        }
      });
      throws(e2, {
        source: file.relative,
        output: file.key,
        processor: "SVGO"
      });
      return null;
    }
    process5("SVGO", timer.stop());
    const { data } = svg2;
    const size2 = fileSize(data, file.size);
    if (size2.isSmaller) {
      transform(`${file.kind} ${size2.before} \u2192 gzip ${size2.gzip}`);
    } else {
      minified(file.kind, size2.before, size2.after, size2.saved);
    }
    await fsExtra.writeFile(file.output, data).catch(
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
  return run2;
}
async function compile7(file, request2, cb) {
  if ($.mode.watch)
    timer.start();
  const sprite = compileSprite(file, request2);
  const inline = compileInline(file, request2);
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
var cq = new dist_default();
function decode(uri) {
  const content = fsExtra.readFileSync(uri);
  const gunzip = zlib2__default.default.gunzipSync(content);
  return cbor__default.default.decode(gunzip);
}
function save(uri, data) {
  return async () => {
    const encoded = await cbor__default.default.encodeAsync(data, {
      omitUndefinedProperties: true,
      canonical: true
    });
    const gzip = zlib2__default.default.gzipSync(encoded);
    gzip[9] = 3;
    return writeFileAtomic__default.default(uri, gzip);
  };
}
async function getCache(cli) {
  $.cache.uri = create(null);
  const cachdir = pathe.join($.cwd, "node_modules", ".cache");
  if (!fsExtra.existsSync(cachdir))
    fsExtra.mkdirSync(cachdir);
  const root = pathe.join(cachdir, "syncify");
  if (!fsExtra.existsSync(root))
    fsExtra.mkdirSync(root);
  for (const file of CACHE_REFS) {
    $.cache.uri[file] = pathe.join(root, `${file}.bin`);
    if (fsExtra.existsSync($.cache.uri[file])) {
      $.cache[file] = decode($.cache.uri[file]);
    } else {
      $.cache[file] = {};
      cq.add(save($.cache.uri[file], $.cache[file]));
    }
  }
  if (!has2("hotSnippet", $.cache.build))
    $.cache.build.hotSnippet = [];
  if (cli.cache) {
    return clearCache();
  }
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
  const report = object({
    stats: object({
      total: 0,
      errors: 0,
      skipped: 0,
      bundled: 0
    })
  });
  for (const group2 of [
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
  ]) {
    report[group2] = object({
      group: group2,
      time: "",
      size: 0,
      files: [],
      report: null
    });
  }
  return report;
}
function logger(message) {
  let timeout = null;
  function update2() {
    log_update_default(
      message.toRaw().join("")
    );
  }
  return {
    begin(ms) {
      if (timeout === null)
        timeout = timers.setInterval(update2, ms);
    },
    clear() {
      clearInterval(timeout);
      timeout = null;
    }
  };
}
async function build(cb) {
  timer.start("build");
  if (!$.mode.export) {
    task("Build");
  }
  const message = Create().Newline();
  const interval = logger(message);
  const SVG = /* @__PURE__ */ new Set();
  const report = getModel2();
  const hasFilter = isEmpty2($.filters) === false;
  const parse5 = parseFile($.paths, $.dirs.output);
  const match2 = anymatch3__default.default(toArray($.watch.values()));
  const globs = await glob6__default.default("**", { absolute: true, cwd: $.dirs.input });
  const cache = $.cache.paths;
  interval.begin(100);
  for (const path2 of globs.filter(match2)) {
    const file = parse5(path2);
    if (isUndefined(file))
      continue;
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
        const value = file.ext === ".json" ? await compile4(file, cb) : await transform3(file, cb);
        if (value === null || isNaN(file.size)) {
          report.stats.skipped += 1;
          return object(
            {
              name: file.base,
              input: file.relative,
              time: timer.stop(file.uuid),
              output: file.key,
              error: "Skipped File"
            }
          );
        }
        report.stats.bundled += 1;
        return object(
          {
            name: file.base,
            input: file.relative,
            output: file.key,
            error: null,
            time: timer.stop(file.uuid),
            size: fileSize(value, file.size)
          }
        );
      } catch (e2) {
        report.stats.errors += 1;
        return object(
          {
            name: file.base,
            input: file.relative,
            output: file.key,
            time: timer.stop(file.uuid),
            error: e2.message
          }
        );
      }
    };
  }
  async function bundle(group2, fn) {
    const filter = hasFilter && has2(group2, $.filters) ? $.filters[group2] : null;
    if (filter && filter.includes(group2) === false)
      return 0;
    const record = report[group2];
    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn), { stopOnError: false });
    record.time = timer.stop(group2);
    const files = record.report.length;
    const count = bold(files < 10 ? ` ${files}` : `${files}`);
    message.Line(Prefix(group2, `${count} ${plural("file", files)} ${Append(record.time)}`));
  }
  await bundle("svgs", compile7);
  await bundle("layouts", compile3);
  await bundle("templates", compile3);
  await bundle("sections", compile3);
  await bundle("snippets", compile3);
  await bundle("locales", compile4);
  await bundle("configs", compile4);
  await bundle("assets", compile);
  await bundle("styles", compile6);
  await bundle("scripts", compile5);
  await saveCache();
  timer.pause("build");
  interval.clear();
  if ($.mode.export === false && $.mode.publish === false) {
    log_update_default(
      message.Remove(0).NL.Dash("Completed", gray).NL.Line(Prefix("version", `${$.vc.number}`)).Line(Prefix("processed", `${bold(`${report.stats.total}`)} files`)).Line(Prefix("bundled", `${bold(`${report.stats.bundled}`)} files`)).Line(Prefix("skipped", `${bold(`${report.stats.skipped}`)} files`)).Line(Prefix("duration", timer.now("build"))).Line(Prefix("errors", bold(`${report.stats.errors}`))).NL.End($.log.group).BR.toString(whiteBright)
    );
    process.exit(0);
  }
}

// syncify/modes/watch.ts
init_cjs_shims();

// syncify/transform/pages.ts
init_cjs_shims();

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
          `Missing ${blue.bold(prop)} property key value in a ${yellowBright.bold("metafields")}`,
          "value of page frontmatter. Frontmatter metafields require you provide the following keys:",
          "",
          `${gray("-")} ${white("key")}`,
          `${gray("-")} ${white("type")}`,
          `${gray("-")} ${white("value")}`,
          `${gray("-")} ${white("namespace")}`,
          "",
          `${gray("Update the metafield entry to include")} ${white(prop)}`
        ]);
        return false;
      }
      if (prop === "type") {
        const type2 = metafield[prop];
        if (!checkMetafieldType(type2)) {
          invalid(file.relative, [
            `Invalid type ${blue.bold(type2)} provided in a page frontmatter ${yellowBright.bold("metafields")}`,
            `value. Frontmatter metafields ${bold("must")} be one of following types:`,
            "",
            `${gray("-")} ${white("boolean")}`,
            `${gray("-")} ${white("color")}`,
            `${gray("-")} ${white("date")}`,
            `${gray("-")} ${white("date_time")}`,
            `${gray("-")} ${white("dimension")}`,
            `${gray("-")} ${white("json")}`,
            `${gray("-")} ${white("money")}`,
            `${gray("-")} ${white("multi_line_text_field")}`,
            `${gray("-")} ${white("number_decimal")}`,
            `${gray("-")} ${white("number_integer")}`,
            `${gray("-")} ${white("rating")}`,
            `${gray("-")} ${white("rich_text_field")}`,
            `${gray("-")} ${white("single_line_text_field")}`,
            `${gray("-")} ${white("url")}`,
            `${gray("-")} ${white("volume")}`,
            `${gray("-")} ${white("weigh")}`,
            "",
            `${gray("Update the metafield entry to an accepted")} ${white("type")}`
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
async function list(store) {
  return axios3__default.default.get("pages.json", store.client).then(({ data }) => {
    return data.pages;
  }).catch((e2) => {
    return request(store.store, e2.response);
  });
}
async function find3(store, page) {
  if (allFalse(has("handle", page), has("title", page))) {
    console.log("invalid fields");
    return void 0;
  }
  return axios3__default.default.get("pages.json", store.client).then(({ data }) => {
    if (has("handle", page) && has("title", page)) {
      return data.pages.find((p) => page.title === p.title && page.handle === p.handle);
    } else if (has("handle", page)) {
      return data.pages.find((p) => page.handle === p.handle);
    } else if (has("title", page)) {
      return data.pages.find((p) => page.title === p.title);
    } else {
      return void 0;
    }
  }).catch((e2) => {
    console.log(e2);
    return void 0;
  });
}
async function create4(store, page) {
  if (!$.mode.upload)
    timer.start();
  const promise = await axios3__default.default.post("/pages.json", { page }, store.client).then(({ data }) => {
    resource("page", store);
    return data.page;
  }).catch((e2) => {
    if (requeue(e2.response.status)) {
      queue.add(() => create4(store, page));
    } else {
      if (hasPath("response.data", e2.response)) {
        request(page.title, e2.response);
      }
    }
  });
  if (!promise)
    return void 0;
  setPageCache(store.domain, promise);
  return promise;
}
async function sync3(store, file, page) {
  const { mode } = $;
  if (!mode.upload)
    timer.start();
  const url = `pages/${page.id}.json`;
  const promise = await axios3__default.default.put(url, { page }, store.client).then(({ data }) => {
    if (mode.watch) {
      resource("page", store);
    } else if (mode.upload) {
      event.emit("upload", "uploaded", page, {
        key: file.key,
        namespace: file.namespace,
        fileSize: getSizeStr(page.body_html)
      });
    }
    return data.page;
  }).catch((e2) => {
    if (requeue(e2.response.status)) {
      queue.add(() => sync3(store, file, page));
    } else {
      console.log(e2);
    }
  });
  if (!promise)
    return void 0;
  return promise;
}

// syncify/transform/pages.ts
function toMarkdown(content) {
  const td = new turndown.Turndown($.page.import);
  td.use(turndown.gfm);
  return td.turndown(content);
}
async function promptAction(store) {
  const resume = prompt("No matching pages, select an option", {
    title: "No matching pages",
    message: "Open CLI and select an option"
  });
  const prompt5 = await prompts2__default.default({
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
    action: prompt5.action
  };
}
async function selectPage(store) {
  const remote = await list(store);
  if (!remote)
    return;
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
  const prompt5 = await prompts2__default.default({
    type: "select",
    name: "action",
    message: "Choose Page",
    hint: " ",
    instructions: false,
    choices
  });
  return prompt5.action;
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
  const prompt5 = await prompts2__default.default({
    type: "select",
    name: "action",
    message: "Page Resources",
    hint: " ",
    instructions: false,
    choices
  });
  if (prompt5.action === 5 /* View */) {
    nwl("");
    log(remote.body_html);
    nwl("");
    const next = await prompts2__default.default({
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
      action: prompt5.action
    };
  }
}
function getPayloadFromFrontmatter(file, data) {
  const payload = {};
  if (has2("title", data)) {
    payload.title = `${data.title}`;
  } else {
    payload.title = toUpcase(file.name.replace(/[._-]/g, " "));
  }
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
  const read2 = await fsExtra.readFile(file.input);
  if (isEmpty(read2.toString())) {
    if ($.mode.watch)
      skipped(file, "empty file");
    return null;
  }
  const frontmatter = matter__default.default(read2);
  const { data, content } = { ...frontmatter };
  const payload = getPayloadFromFrontmatter(file, data);
  if (isArray2(payload.metafields) && !getPageMetafields(file, payload.metafields)) {
    return null;
  }
  if (file.kind === "Markdown" /* Markdown */) {
    timer.start();
    payload.body_html = markdown__default.default($.page.export).render(content);
    transform(`${bold("Markdown")} ${ARR} ${bold("HTML")} ${TLD} ${timer.stop()}`);
  } else {
    transform("HTML");
    payload.body_html = content;
  }
  const store = $.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await find3(store, { handle: payload.handle });
  if (isArray2(remote)) {
    invalid(file.relative, [
      `Multiple pages returned when matching on handle ${blue.bold(payload.handle)}`,
      "Syncify is unsure of to handle this request and has cancelled the sync. Please",
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
      const prompt5 = await promptAction(store);
      if (prompt5.action === 2 /* Select */) {
        const action = await selectPage(store);
        if (action === 4 /* Cancel */) {
          return prompt5.resume();
        } else if (action === 1 /* Create */) {
          prompt5.resume();
          syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray(`${TLD} ${file.relative}`)}`);
          return create4(store, payload);
        } else {
          payload.id = action;
          prompt5.resume();
        }
      } else if (prompt5.action === 1 /* Create */) {
        prompt5.resume();
        syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray(`${TLD} ${file.relative}`)}`);
        return create4(store, payload);
      } else {
        return prompt5.resume();
      }
    }
  }
  if ($.page.safeSync && isObject(remote)) {
    const online = new Date(remote.updated_at).getTime();
    const local = new Date(cached.updated_at).getTime();
    if (online > local && remote.body_html !== payload.body_html) {
      const prompt5 = await promptOverwrite(remote);
      if (prompt5.action === 3 /* Update */) {
        prompt5.resume();
        let convert = remote.body_html;
        if ($.page.importLanguage === "markdown") {
          const markdown2 = toMarkdown(convert);
          transform(`${file.name}.html ${ARR} ${file.base}`);
          convert = matter.stringify("\n" + markdown2, frontmatter.data);
        }
        $.watch.unwatch(file.input);
        await fsExtra.writeFile(file.input, convert);
        setPageCache(store.domain, remote);
        $.watch.add(file.input);
      } else if (prompt5.action === 4 /* Cancel */) {
        return prompt5.resume();
      } else if (prompt5.action === 6 /* Overwrite */) {
        prompt5.resume();
      }
    }
  }
  if ($.mode.build)
    return payload.body_html;
  syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${gray(`${TLD} ${file.relative}`)}`);
  const update2 = await sync3(store, file, payload);
  if (!update2)
    return;
  await saveCache("pages");
}

// syncify/modes/watch.ts
function watch(callback) {
  const request2 = client($.sync);
  const parse5 = parseFile($.paths, $.dirs.output);
  if ($.mode.hot)
    $.wss.connected();
  $.watch.on("all", function(event2, path2) {
    const file = parse5(path2);
    if (isUndefined(file))
      return;
    if (file.base === $.file.base)
      return;
    if (file.type !== 17 /* Spawn */)
      changed(file);
    if (event2 === "change" || event2 === "add") {
      handler3(file);
    } else if (event2 === "unlink") {
      if (file.type === 16 /* Page */) {
        return request2.pages("delete", file);
      } else {
        return request2.assets("delete", file);
      }
    }
  });
  async function handler3(file) {
    try {
      let value = null;
      switch (file.type) {
        case 10 /* Script */:
          return compile5(file, request2.assets, callback);
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
          value = await compile6(file, callback);
          break;
        case 2 /* Layout */:
        case 3 /* Snippet */:
          value = await compile3(file, callback);
          break;
        case 4 /* Section */:
          if (file.kind === "JSON" /* JSON */) {
            value = await compile4(file, callback);
          } else {
            value = await compile3(file, callback);
          }
          break;
        case 1 /* Template */:
          if (file.kind === "JSON" /* JSON */) {
            value = await compile4(file, callback);
          } else {
            value = await compile3(file, callback);
          }
          break;
        case 7 /* Config */:
        case 8 /* Locale */:
          value = await compile4(file, callback);
          break;
        case 15 /* Metafield */:
          value = await compile4(file, callback);
          return request2.metafields({ value, namespace: file.namespace, key: file.key });
      }
      if (!isNil2(value)) {
        syncing(file.key);
        await request2.assets("put", file, value);
        if ($.mode.hot) {
          if (file.type === 4 /* Section */) {
            $.wss.section(file.name);
          } else if (file.type !== 9 /* Style */) {
            await queue.onIdle().then(() => $.wss.replace());
          }
        }
      }
    } catch (e2) {
      console.error(e2);
      error2(e2);
    }
  }
}

// syncify/modes/themes.ts
init_cjs_shims();

// syncify/requests/themes.ts
init_cjs_shims();
async function list2(store) {
  return axios3__default.default.get("themes.json", store.client).then(({ data }) => {
    return data.themes;
  }).catch((e2) => {
    return request(store.store, e2.response);
  });
}
var theme = {
  pointer(choice, i) {
    const item = this.state.index === i ? lightGray("\u251C ") : lightGray("\u2502 ");
    return i === 0 ? lightGray("\u2502 ") + "\n" + item : item;
  },
  prefix: lightGray("\u2502 "),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red.bold,
    warning: yellowBright,
    muted: gray,
    disabled: gray,
    typing: gray
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
    if (value.name.length > separator)
      separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${gray(value.role)}`,
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
        hint: `${space("Select Stores")} ${TLD} ${gray("go back and choose store")}`
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
      if (isArray2(value) && value.length > 0) {
        return neonCyan(`${value.join(whiteBright(", "))}`);
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
            return "\n" + reset.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = neonCyan.italic;
  theme.styles.typing = neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet2 = await enquirer.prompt({
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
  const save2 = await enquirer.prompt({
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
      gray("The following store and theme references will be saved"),
      gray("to your package.json file on the syncify key property."),
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
      hint: `${space(value.store)} ${TLD} ${gray(`https://${value.domain}`)}`,
      value
    };
  });
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
async function getModel3() {
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme3 of $.sync.themes) {
    if (theme3.target.length > width)
      width = theme3.target.length;
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
  const success = `${bold(`${record.success}`)} ${white("of")} ${bold(`${record.size}`)}`;
  const failed = bold(`${record.failed}`);
  const target = bold(`${record.theme.target.toUpperCase()}`);
  return Create().Line(Prefix(target, ARR), neonCyan).NL.Line(`completed in ${gray(time)}`).NL.Line(Prefix("synced", success), whiteBright).Line(Prefix("errors", failed), record.failed > 0 ? redBright : whiteBright).Line(Prefix("location", gray.underline(output))).NL.Insert(record.progress.render()).Line.toString();
}
function getWaitLog(record) {
  return Create().Line(`${bold(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, gray.dim).NL.Line(`${bold(addSuffix(record.number))} in queue`, magenta).NL.Line(Prefix("synced", `${bold("0")} ${white("of")} ${bold(`${record.size}`)}`), gray.dim).Line(Prefix("retry", bold("0")), gray.dim).Line(Prefix("errors", bold("0")), gray.dim).NL.Insert(record.progress.render(gray.dim)).NL.toString();
}
async function importing(cb) {
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
    const prefix = Create().NL.Line(Prefix("Duration", whiteBright(timer.now("import"))), gray).Line(Prefix("Transfers", whiteBright(`${transfers++}`)), gray).Line(Prefix("Syncing", pink(`${bold(theme3.target)}  ${ARR}  ${theme3.store}`)), gray).Line(Prefix("Preview", underline(preview)), gray).Ruler();
    let processing = "";
    if (item.status === 3 /* Empty */) {
      fsExtra.writeFileSync(file.output, "");
      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);
      processing = yellowBright(file.key);
    } else if (item.status === 0 /* Success */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);
      const buffer = Buffer.from(item.data.value || null, "utf8");
      fsExtra.writeFileSync(file.output, buffer);
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
      processing = redBright(file.key);
    }
    const success = `${bold(`${record.success}`)} ${white("of")} ${bold(`${record.size}`)}`;
    const retried = bold(`${record.retry}`);
    const failed = bold(`${record.failed}`);
    const warnings2 = bold(`${record.warning}`);
    const status = Create().NL.Line(`${bold(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, neonCyan).NL.Line(processing).NL.Line(Prefix("synced", success), whiteBright).Line(Prefix("retry", retried), record.retry > 0 ? orange : whiteBright).Line(Prefix("warning", warnings2), record.warning > 0 ? yellowBright : whiteBright).Line(Prefix("failed", failed), record.failed > 0 ? redBright : whiteBright).NL.Insert(record.progress.render()).NL.Ruler();
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
  sync4.size - 1;
  for (const [id, record] of sync4) {
    const [store, target] = id.split(":");
    const output = pathe.join($.dirs.import, store, target);
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
    record.active = false;
    record.log = getDoneLog(sync4.get(id), pathe.relative($.cwd, output), timer.stop(id));
  }
  for (const { errors } of sync4.values()) {
    if (errors.remote.size > 0) ;
  }
}

// syncify/modes/export.ts
init_cjs_shims();

// syncify/process/validate.ts
init_cjs_shims();
async function hasTemplateMismatch(cwd) {
  const files = await glob6.glob("templates/*", { cwd, absolute: true });
  const exclude = /* @__PURE__ */ new Set();
  const exists2 = /* @__PURE__ */ new Set();
  for (const file of files) {
    const { name } = pathe.parse(file);
    const templates = files.filter((path2) => pathe.parse(path2).name === name);
    if (templates.length > 1 && !exists2.has(name))
      exists2.add(name);
  }
  if (exists2.size === 0)
    return 1 /* None */;
  if (exists2.size > 1) {
    write2(`${bold(`${exists2.size}`)} mismatch template files`, {
      suffix: "error",
      type: "error"
    });
  } else {
    write2(`${bold(`${exists2.size}`)} mismatch template file`, {
      suffix: "error",
      type: "error"
    });
  }
  const resume = prompt(`select ${bold(".json")} or ${bold(".liquid")} template`, {
    title: "Export Error",
    message: "Multiple templates detected"
  });
  const { action } = await prompts2__default.default([
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
            exclude.add(pathe.join(cwd, "templates", `${name}.liquid`));
          } else {
            exclude.add(pathe.join(cwd, "templates", `${name}.json`));
          }
        }
      });
    }
    await prompts2__default.default(choices).then(() => resume());
    return exclude;
  } else if (action === "json") {
    for (const name of exists2) {
      exclude.add(pathe.join(cwd, "templates", `${name}.json`));
    }
    resume();
    return exclude;
  } else if (action === "liquid") {
    for (const name of exists2) {
      exclude.add(pathe.join(cwd, "templates", `${name}.liquid`));
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
      `There are no files within ${neonCyan(pathe.relative($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
}

// syncify/options/files.ts
init_cjs_shims();

// syncify/requests/require.ts
init_cjs_shims();
function findUp(name, startDir, stopDir = pathe.parse(startDir).root) {
  let dir = startDir;
  while (dir !== stopDir) {
    const file = pathe.join(dir, name);
    if (fsExtra.existsSync(file))
      return file;
    if (pathe.extname(file) !== ".json") {
      const path2 = file + ".json";
      if (fsExtra.existsSync(path2))
        return path2;
    }
    dir = pathe.dirname(dir);
  }
  return null;
}
function getTSConfigFromFile(cwd, filename) {
  return pathe.isAbsolute(filename) ? fsExtra.existsSync(filename) ? filename : null : findUp(filename, cwd);
}
function getTSConfigFromExtends(cwd, name) {
  if (pathe.isAbsolute(name))
    return fsExtra.existsSync(name) ? name : null;
  if (name.startsWith("."))
    return findUp(name, cwd);
  return __require.resolve(name, { paths: [cwd] });
}
function getTSConfig(dir = $.cwd, name = "tsconfig.json", isExtends = false) {
  dir = pathe.resolve(dir);
  const id = isExtends ? getTSConfigFromExtends(dir, name) : getTSConfigFromFile(dir, name);
  if (!id)
    return null;
  const data = jsonc(fsExtra.readFileSync(id, "utf-8"));
  const configDir = pathe.dirname(id);
  if (has("baseURL", data.compilerOptions)) {
    data.compilerOptions.baseUrl = pathe.join(configDir, data.compilerOptions.baseUrl);
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
  if (typeof jest === "undefined")
    return "cjs";
  const ext = pathe.extname(inputFile);
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
  if (!patterns)
    return false;
  return patterns.some((p) => {
    if (isRegex(p))
      return p.test(id);
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
        if (args.path.charCodeAt(0) === 46 || pathe.isAbsolute(args.path))
          return;
        if (match(args.path, external))
          return { external: true };
        if (match(args.path, notExternal))
          return;
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
        const contents = await fsExtra.readFile(args.path, "utf-8");
        const injectLines = [
          `const __injected_filename__ = ${JSON.stringify(args.path)};`,
          `const __injected_dirname__ = ${JSON.stringify(pathe.dirname(args.path))};`,
          `const __injected_import_meta_url__ = ${JSON.stringify(url.pathToFileURL(args.path).href)};`
        ];
        return {
          contents: glue(injectLines) + contents,
          loader: inferLoader(pathe.extname(args.path))
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
    const outfile = pathe.join($.dirs.cache, getOutputFile(options.filepath, format));
    fsExtra.writeFileSync(outfile, text, "utf8");
    let mod;
    const req = options.require || dynamicImport;
    try {
      mod = await req(format === "esm" ? url.pathToFileURL(outfile).href : outfile, { format });
    } finally {
      if (!preserveTemporaryFile)
        await fsExtra.unlink(outfile);
    }
    return {
      mod,
      dependencies: result.metafile ? keys(result.metafile.inputs) : []
    };
  }
  const ctx = await esbuild$1.build({
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
  for (const file of [
    "syncify.config.js",
    "syncify.config.mjs",
    "syncify.config.cjs",
    "syncify.config.ts",
    "syncify.config.json"
  ]) {
    path2 = pathe.join(cwd, file);
    const exists2 = await fsExtra.pathExists(path2);
    if (exists2)
      break;
    path2 = null;
  }
  if (path2 === null)
    return null;
  try {
    if (pathe.extname(path2) === ".json") {
      $.file.path = path2;
      $.file.relative = pathe.relative(cwd, path2);
      $.file.base = pathe.basename(path2);
      const json2 = await fsExtra.readFile(path2);
      return jsonc(json2.toString());
    } else {
      $.file.path = path2;
      $.file.relative = pathe.relative(cwd, path2);
      $.file.base = pathe.basename(path2);
      const config = await bundleRequire({
        cwd,
        filepath: path2
      });
      return config.mod.syncify || config.mod.default || config.mod;
    }
  } catch (e2) {
    console.log(e2);
    const jsonconfig = pathe.join(cwd, "syncify.config.json");
    const hasFile = await fsExtra.pathExists(jsonconfig);
    if (hasFile)
      return fsExtra.readJson(jsonconfig);
    return null;
  }
}
async function getPackageJson(cwd) {
  const uri = pathe.join(cwd, "package.json");
  const has3 = await fsExtra.pathExists(uri);
  if (!has3)
    throw new Error('Missing "package.json" file');
  try {
    $.pkg = await fsExtra.readJson(uri);
    if (hasPath("syncify.stores", $.pkg)) {
      if (isArray2($.pkg.syncify.stores)) {
        $.stores = $.pkg.syncify.stores;
      } else if (isObject($.pkg.syncify.stores) && isEmpty2($.pkg.syncify.stores) === false) {
        $.stores = [$.pkg.syncify.stores];
      }
    } else {
      missingStores(cwd);
    }
  } catch (e2) {
    throw new Error(e2);
  }
}
async function setPkgVersion(current, increment) {
  const uri = pathe.join($.cwd, "package.json");
  try {
    const pkg = await fsExtra.readFile(uri);
    const str = pkg.toString();
    const ver = str.indexOf('"version"');
    const sqo = str.indexOf('"', ver + 10) + 1;
    const eqo = str.indexOf('"', sqo + 1);
    const num = str.slice(sqo, eqo);
    if (num === current) {
      await fsExtra.writeFile(uri, `${str.slice(0, sqo)}${increment}${str.slice(eqo)}`);
      await getPackageJson($.cwd);
      return true;
    } else {
      return false;
    }
  } catch (e2) {
    throw new Error(e2);
  }
}
async function getEnvFile(cli) {
  let path2 = pathe.join(cli.cwd, ".env");
  if (await fsExtra.pathExists(path2)) {
    const env2 = dotenv__default.default.config({ path: path2 });
    if (env2.error) {
      throws(env2.error, { path: path2 });
      return null;
    }
    $.env.file = path2;
    $.env.vars = env2.parsed;
  } else {
    path2 = pathe.join(cli.cwd, "syncify.env");
    if (await fsExtra.pathExists(path2)) {
      const env2 = dotenv__default.default.config({ path: path2 });
      if (env2.error) {
        throws(env2.error.message, { path: path2 });
        return null;
      }
      $.env.file = path2;
      $.env.vars = env2.parsed;
    } else {
      if (cli.setup === false) {
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
  const validate = await hasTemplateMismatch($.dirs.output);
  if (validate === 2 /* Cancel */)
    return;
  if (validate === 1 /* None */) {
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
  if (!await fsExtra.pathExists($.dirs.export)) {
    await fsExtra.mkdir($.dirs.export);
  }
  const zip = new AdmZip__default.default();
  for (const dir of THEME_DIRS) {
    const uri = pathe.join($.dirs.output, dir);
    const has3 = await fsExtra.pathExists(uri);
    if (has3) {
      const files = await glob6.glob("*", { cwd: uri, absolute: true });
      for (const file of files) {
        const path2 = `${dir}/${pathe.basename(file)}`;
        const stat2 = fsExtra.statSync(file);
        if (stat2.size === 0) {
          zip.addFile(path2, toBuffer(" "));
          warn2(path2, "empty file");
        } else {
          if (validate === 1 /* None */ || validate.has(file) === false) {
            zip.addLocalFile(file, dir);
          }
        }
      }
    }
  }
  const size2 = byteSize(zip.toBuffer());
  if ($.vc.update !== null) {
    if (!await fsExtra.pathExists($.vc.update.dir))
      await fsExtra.mkdir($.vc.update.dir);
    version($.vc, "bump");
    zipped(getSizeStr(size2), pathe.relative($.cwd, $.vc.update.zip));
    try {
      await zip.writeZipPromise($.vc.update.zip);
      themeVersion = $.vc.update.number;
    } catch (e2) {
      return throws(e2, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  } else {
    if (!await fsExtra.pathExists($.vc.dir)) {
      await fsExtra.mkdir($.vc.dir);
      version($.vc, "created");
    } else {
      version($.vc, "overwrite");
    }
    zipped(getSizeStr(size2), pathe.relative($.cwd, $.vc.zip));
    try {
      await zip.writeZipPromise($.vc.zip);
    } catch (e2) {
      return throws(e2, {
        file: $.vc.zip,
        details: "Failed to write zip file"
      });
    }
  }
  if ($.pkg.version !== themeVersion) {
    const bump = await setPkgVersion($.pkg.version, themeVersion);
    if (bump) {
      process5("package.json", "version bumped");
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
async function publish(cb) {
  await exporting(cb);
  timer.start("publish");
  title("Publishing");
  const versions = statics__default.default($.vc.dir);
  const server2 = http__default.default.createServer((req, res) => versions(req, res, handler__default.default(req, res)));
  const onerror = (e2) => {
    if (e2.code === "EADDRINUSE") {
      error2("EADDRINUSE");
      return null;
    }
  };
  const onconnect = () => {
    server2.removeListener("error", onerror);
    server2.removeListener("connect", onconnect);
  };
  server2.on("error", onerror);
  server2.on("connect", onconnect);
  server2.listen($.publish.tunnelPort);
  await delay(500);
  timer.start("ngrok");
  const url = await ngrok__default.default.connect({
    addr: $.publish.tunnelPort,
    onStatusChange(status) {
      if (status === "closed") {
        write2("disconnect", { prefix: "ngrok" });
      } else {
        write2(`${bold("connected")} PORT${COL}${$.publish.tunnelPort}`, {
          prefix: "ngrok",
          suffix: timer.stop("ngrok")
        });
      }
    }
  });
  const src = `${url}/${$.vc.number}.zip`;
  write2(gray(src), { prefix: "server" });
  for (const store of $.sync.stores) {
    timer.start(store.domain);
    write2(store.domain, { prefix: "webshop", color: neonCyan });
    write2(`${bold("role")} ${ARR} ${$.publish.publishRole}`, { prefix: "publish" });
    write2(bold(`v${$.vc.number}`), { prefix: "version", color: magentaBright });
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
    write2(`${bold("published")} ${ARR} ${store.domain}`, {
      prefix: "status",
      color: neonGreen,
      suffix: timer.now(store.domain)
    });
  }
  server2.close();
  await ngrok__default.default.disconnect();
  nwl();
  group();
  nwl();
  await prompts2__default.default([
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

// syncify/hot/server.ts
init_cjs_shims();

// syncify/cli/exit.ts
init_cjs_shims();
var trigger = false;
var register = false;
var hooks = /* @__PURE__ */ new Set();
function exit(manual, signal) {
  if (trigger)
    return;
  trigger = true;
  for (const hook of hooks)
    hook();
  if (manual)
    process.exit(128 + signal);
}
function kill(callback) {
  hooks.add(callback);
  if (!register) {
    register = true;
    process.once("exit", exit);
    process.once("SIGINT", exit.bind(void 0, true, 2));
    process.once("SIGTERM", exit.bind(void 0, true, 15));
    process.on("message", (message) => {
      if (message === "shutdown")
        exit(true, -128);
    });
  }
  return () => hooks.delete(callback);
}

// syncify/hot/server.ts
var HOTError = {
  enable: true,
  output: []
};
async function injection() {
  log_update_default(Line(gray("validating snippet injection")));
  const snippet2 = await injectSnippet();
  if (snippet2) {
    log_update_default(Line(gray("validating layouts")));
    for (const layout in $.hot.alive) {
      const exists2 = await fsExtra.pathExists(layout);
      if (!exists2) {
        log_update_default(Line(gray("layout has not yet been bundled, building now...")));
        const files = glob6__default.default.sync($.config.paths.layout, {
          cwd: $.dirs.input,
          absolute: true
        });
        for (const input of files) {
          if (pathe.basename(input) === pathe.basename(layout)) {
            const source = await fsExtra.readFile(input);
            await fsExtra.writeFile(layout, source);
          }
        }
        log_update_default(Line(gray("layout was bundled from source, injecting hot snippet")));
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
      } catch (e2) {
        console.log(e2);
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
      Tree.red + redBright("Change the socket port address or kill the session occupying it."),
      Tree.red + redBright("This error typically occurs when multiple Syncify instances are active.")
    );
    error2(redBright(`${bold("ERROR")} on ${bold(`${$.hot.method === "hot" ? "HOT" : "LIVE"} Reload:`)}`));
    log(HOTError.output.join("\n"));
    return null;
  }
  log(Line(bold(`${$.hot.method === "hot" ? "HOT Reload" : "LIVE Reload"}${COL}`)));
  log_update_default(Line("configuring HOT Reload"));
  await injection();
  function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=0");
  }
  const assets = statics__default.default(pathe.join($.dirs.output, "assets"), { setHeaders });
  const server2 = http__default.default.createServer((req, res) => assets(req, res, handler__default.default(req, res)));
  const localhost = `http://localhost:${$.hot.server}`;
  const onerror = (e2) => {
    if (e2.code === "EADDRINUSE") {
      HOTError.output.push(
        Tree.red + redBright(`${bold("EADDRINUSE")} ${ARR} ${localhost}`),
        Tree.red,
        Tree.red + redBright.bold(`Server Port ${$.hot.server} address already in use`),
        Tree.red,
        Tree.red + redBright("Change the server port address or kill the session occupying it."),
        Tree.red + redBright("This error typically occurs when multiple Syncify instances are active.")
      );
      log_update_default.clear();
      log(HOTError.output.join("\n"));
      $.wss.http.close();
      return null;
    }
  };
  const onconnect = () => {
    log_update_default.done();
    $.wss.connected();
    server2.removeListener("error", onerror);
    server2.removeListener("connect", onconnect);
  };
  server2.on("error", onerror);
  server2.on("connect", onconnect);
  server2.listen($.hot.server);
  const port = `${gray("PORT")}  ${ARR} ${pink(`${$.hot.server}`)}`;
  const sock = `${gray("PORT")}  ${ARR} ${pink(`${$.hot.socket}`)}`;
  log_update_default(Line(`${neonCyan("server")}  ${ARR}  ${port}`));
  log(Line(`${neonCyan("socket")}  ${ARR}  ${sock}`));
  for (const p in $.hot.alive) {
    log(Line(`${neonCyan("layout")}  ${ARR}  ${gray(pathe.relative($.cwd, p))}`));
  }
  nwl();
}
function socket() {
  if ($.mode.hot === false)
    return;
  const wss = new ws$1.Server({
    port: $.hot.socket,
    path: "/ws",
    skipUTF8Validation: true
  });
  kill(() => {
    wss.emit("disconnect");
    wss.close();
  });
  const onerror = (error3) => {
    if (error3.code === "EADDRINUSE") {
      wss.close();
      HOTError.enable = false;
      HOTError.output.push(
        Tree.red + redBright(`${bold("EADDRINUSE")} ${ARR} ws://localhost:${$.hot.server}`),
        Tree.red,
        Tree.red + redBright.bold(`Socket Port ${$.hot.server} address already in use`)
      );
    }
  };
  const onclose = () => {
    wss.removeAllListeners("script");
    wss.removeAllListeners("stylesheet");
    wss.removeAllListeners("section");
    wss.removeAllListeners("svg");
    wss.removeAllListeners("assets");
    wss.removeAllListeners("reload");
    wss.removeAllListeners("replace");
  };
  const onconnection = (socket2) => {
    wss.removeListener("error", onerror);
    wss.prependListener("script", (src) => socket2.send(`script,${src}`));
    wss.prependListener("stylesheet", (href) => socket2.send(`stylesheet,${href}`));
    wss.prependListener("section", (id) => socket2.send(`section,${id}`));
    wss.prependListener("svg", (id) => socket2.send(`svg,${id}`));
    wss.prependListener("assets", () => socket2.send("assets"));
    wss.prependListener("reload", () => socket2.send("reload"));
    wss.prependListener("replace", () => socket2.send("replace"));
    wss.prependListener("connected", () => socket2.send("connected"));
    wss.prependListener("disconnect", () => socket2.send("disconnect"));
    socket2.addEventListener("message", ({ data }) => hot(data));
  };
  wss.on("close", onclose);
  wss.on("error", onerror);
  wss.on("connection", onconnection);
  return {
    get http() {
      return wss;
    },
    script: (uuid2, src) => wss.emit("script", `${src},${uuid2}`),
    stylesheet: (uuid2, href) => wss.emit("stylesheet", `${href},${uuid2}`),
    section: (id) => wss.emit("section", id),
    svg: (id) => wss.emit("svg", id),
    assets: () => wss.emit("assets"),
    reload: () => wss.emit("reload"),
    replace: () => wss.emit("replace"),
    connected: () => wss.emit("connected"),
    disconnect: () => wss.emit("disconnected")
  };
}

// syncify/log/stdin.ts
init_cjs_shims();
function stdin(data) {
  const input = data.toString().trim().toLowerCase();
  if (input === "v") {
    const items = keys($.errors);
    for (let i = 0, l = items.length; i < l; i++) {
      const prop = items[i];
      if ($.errors[prop].size === 0)
        continue;
      if (i > 0)
        hline();
      write2(bold.whiteBright(prop));
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
      if (warning.size === 0)
        continue;
      const message = Create({ type: "warning" }).Newline("yellow").Ruler().Newline("yellow").Line(prop.toUpperCase(), bold.yellow).Newline("yellow");
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
var import_scrollable_cli = __toESM(require_dist());
function help(cli) {
  log(clear2);
  const DSH2 = lightGray("-".repeat(80));
  const HZR = "\n" + lightGray("\u2500".repeat(80)) + "\n";
  const usage = `
    ${bold("SYNCIFY CLI  " + ARR + whiteBright("  v1.0.0"))}

    ${whiteBright("Please provide a command argument.")}

    ${bold("USAGE" + COL)}

    $ syncify                    ${gray.italic("Show this screen")}
    $ syncify {store} [theme]    ${gray.italic("Store and theme targeting")}

    ${bold("HELP" + COL)}

    -h, --help                   ${gray.italic("Print a list of all available commands")}
    -h, --help examples          ${gray.italic("Print a list of command examples")}

  `;
  if (cli.help === null) {
    const name = __require("figlet").textSync("  syncify", {
      font: "Slant",
      whitespaceBreak: true
    });
    return log(
      neonRouge.bold.bgBlack(name) + "\n\n",
      usage
    );
  } else {
    const title2 = " ".repeat(10) + "syncify";
    const name = __require("figlet").textSync(title2, {
      font: "Slant",
      whitespaceBreak: true
    });
    log(
      neonRouge.bold.bgBlack(name) + "\n",
      HZR,
      gray(`Scroll up ${neonRouge("\u25B2")} and ${neonRouge("\u25BC")} down using the arrow keys.`),
      HZR
    );
  }
  const examples = `
    ${bold("SYNCIFY CLI  " + ARR + whiteBright("  v1.0.0"))}

    Below are some usage examples for working with the Syncify CLI.
    The ${gray("=")} character is optional and samples are using the ${gray("$ sy")} alias.

    ${bold("TARGETING" + COL)}

    ${gray("Target 1 store and 1 theme")}:
    $ sy your-store${gray("=")}theme-1

    ${gray("Target 1 store and 2 theme")}:
    $ sy your-store${gray("=")}theme-1,some-theme,test-theme

    ${gray("Target 2 stores and 1 theme")}:
    $ sy ---your-store${gray("=")}theme-1 --another-store${gray("=")}some-theme

    ${gray("Target 2 stores and 4 theme")}:
    $ sy --your-store${gray("=")}theme-1,theme-2 --another-store${gray("=")}some-theme,test-theme

  ${DSH2}

    ${bold("BUILDING" + COL)}

    ${gray("Build theme from source")}:
    $ sy --build

    ${gray("Build theme with terse minification")}:
    $ sy --build --terse

    ${gray("Build theme and clean")}:
    $ sy --build --clean --terse

  ${DSH2}

    ${bold("WATCHING" + COL)}

    ${gray("Watch 1 store and 1 theme")}:
    $ sy your-store${gray("=")}theme-1 --watch

    ${gray("Watch 1 store and 2 themes with hot reloading")}:
    $ sy your-store${gray("=")}theme-1,theme-2 --watch --hot

    ${gray("Watch 2 stores and 1 theme")}:
    $ sy --your-store${gray("=")}theme-1 --another-store${gray("=")}some-theme --watch

    ${gray("Watch 2 stores and 2 themes")}:
    $ sy --your-store${gray("=")}theme-1,theme-2 --another-store${gray("=")}some-theme,test-theme --watch

    ${gray("Watch 1 store with 2 themes and clean mode with hot live reloads")}:
    $ sy your-store${gray("=")}theme-1,theme-2 --watch --clean --hot

    ${gray("Watch 1 store with 2 themes in production mode")}:
    $ sy your-store${gray("=")}theme-1,theme-2 --prod --watch

  `;
  const commands = `
    ${bold("SYNCIFY CLI  " + ARR + whiteBright("  v1.0.0"))}

    Welcome to the Syncify CLI. The command line utility assumes that you have
    defined stores, themes and setup credentials within a ${gray(".env")} file.

    ${bold("ALIASES" + COL)}

      $ sy                         ${gray.italic("Shorthand for syncify")}

    ${bold("COMMANDS" + COL)}

      $ syncify                    ${gray.italic("Show this screen")}
      $ syncify {store} [theme]    ${gray.italic("Store and theme targeting")}

    ${bold("THEMES" + COL)}

        --{store} [theme]          ${gray.italic("A store reference command (run examples)")}
      -t, --theme [theme]          ${gray.italic("A comma seprated list of themes")}

    ${bold("PATHS" + COL)}

      -c, --config    <path>       ${gray.italic("Set config directory path")}
      -i, --input     <path>       ${gray.italic("Set input directory path")}
      -o, --output    <path>       ${gray.italic("Set output directory path")}

    ${bold("MODES" + COL)}

      -w, --watch                  ${gray.italic("Run watch mode")}
      -b, --build                  ${gray.italic("Run build mode from input")}
      -u, --upload                 ${gray.italic("Run upload mode theme to stores")}
      -d, --import                 ${gray.italic("Run download mode from theme and stores")}
      -e, --export                 ${gray.italic("Run export mode and generate theme zip")}
      -p, --publish                ${gray.italic("Run publish and create a release")}
      -r, --resource               ${gray.italic("Run resource mode, resource name expected")}

    ${bold("RESOURCES" + COL)}

      -r, --resource themes        ${gray.italic("Run the themes resource")}
      -r, --resource assets        ${gray.italic("Run the theme assets resource")}
      -r, --resource pages         ${gray.italic("Run the pages resource")}
      -r, --resource metafields    ${gray.italic("Run the metafields resource")}
      -r, --resource redirects     ${gray.italic("Run the redirects resource")}
      -r, --resource files         ${gray.italic("Run the files resource")}

    ${bold("ENVIRONMENT" + COL)}

      --dev                       ${gray.italic("Build in development mode (default)")}
      --prod                      ${gray.italic("Build in production mode")}
      --hot                       ${gray.italic("Run watch with hot-reloads")}

    ${bold("OPERATIONS" + COL)}

      --clean                     ${gray.italic("Clean the output, use with modes")}
      --silent                    ${gray.italic("Silent logging, only errors will print")}
      --cache                     ${gray.italic("Purges the local .cache references")}

    ${bold("TRIGGERS" + COL)}

      --spawn  [list]             ${gray.italic("Invoke a defined spawn child process/s")}
      --delete [list]             ${gray.italic("Delete a remote and local file")}
      --terse  [list]             ${gray.italic("invoke minify mode, accepts resource/s")}

    ${bold("TRANSFORMS" + COL)}

      --script                    ${gray.italic("Run the script transform in isolation")}
      --style                     ${gray.italic("Run the style transform in isolation")}
      --svg                       ${gray.italic("Run the svg transform in isolation")}
      --image                     ${gray.italic("Run the image transform in isolation")}

    ${bold("UTILITY" + COL)}

      -f, --filter <path>         ${gray.italic("Filter operation to be used with modes")}

    ${bold("VERSIONING" + COL)}

      --bump patch                ${gray.italic("Apply a patch version bump, use in export mode")}
      --bump minor                ${gray.italic("Apply a minor version bump, use in export mode")}
      --bump major                ${gray.italic("Apply a major version bump, use in export mode")}

    ${bold("STRAPS" + COL)}

      --strap dusk                ${gray.italic("Import and generate a dusk strap")}
      --strap dawn                ${gray.italic("Import and generate a dawn strap")}
      --strap silk                ${gray.italic("Import and generate a silk strap")}

    ${bold("HELP" + COL)}

      -h, --help                  ${gray.italic("Print this screen")}
      -h, --help examples         ${gray.italic("Print a list of command examples")}

    ${DSH2}

    ${gray("BY \u039D\u0399\u039A\u039F\u039B\u0391\u03A3 \u03A3\u0391\u0392\u0392\u0399\u0394\u0397\u03A3")}

    ${gray.underline("https://github.com/panoply")}
    ${gray.underline("https://x.com/niksavvidis")}

  `;
  readline.emitKeypressEvents(process.stdin);
  const help2 = (0, import_scrollable_cli.default)().setContent(cli.help === "examples" ? examples : commands).setStart({ x: 0, y: 11 }).setSize({ width: 100, height: 30 }).setWrapOptions({ trim: false, hard: false, wordWrap: false }).print();
  log(
    HZR,
    gray(`Type ${neonRouge.bold("Q")} or press ${neonRouge.bold("esc")} key to quit and exit this screen`),
    HZR
  );
  process3.stdout.cursorTo(0, 40);
  process3.stdin.setRawMode(true);
  process3.stdin.on("keypress", (_, key) => {
    if (key.name === "up")
      help2.scroll(-2).print();
    if (key.name === "down")
      help2.scroll(2).print();
    if (key.name === "q")
      process.exit();
    if (key.name === "escape")
      process.exit();
  });
}

// syncify/options/define.ts
init_cjs_shims();

// syncify/options/dirs.ts
init_cjs_shims();
async function setCacheDirs() {
  const { dirs } = $;
  await createDirs(dirs.cache);
  await createDirs(dirs.sourcemaps.root);
  return Promise.all([
    createDirs(dirs.sourcemaps.scripts),
    createDirs(dirs.sourcemaps.styles)
  ]);
}
async function setThemeDirs(basePath2) {
  if (!basePath2)
    basePath2 = $.dirs.output;
  const hasBase = await fsExtra.pathExists(basePath2);
  if (hasBase) {
    if ($.mode.clean) {
      try {
        await fsExtra.emptyDir(basePath2);
      } catch (e2) {
        console.error(e2);
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
    const uri = pathe.join(basePath2, dir);
    const has3 = await fsExtra.pathExists(uri);
    const name = dir.startsWith("templates/") ? dir.slice(10) : dir;
    if (!has3) {
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
function setBaseDirs(cli) {
  const base = basePath($.cwd);
  for (const [dir, def] of BASE_DIRS) {
    let path2;
    if (dir === "cache") {
      $.dirs[dir] = pathe.join($.cwd, def, ".syncify");
      $.dirs.sourcemaps = create(null);
      $.dirs.sourcemaps.root = pathe.join($.dirs[dir], "sourcemaps");
      $.dirs.sourcemaps.scripts = pathe.join($.dirs.sourcemaps.root, "scripts");
      $.dirs.sourcemaps.styles = pathe.join($.dirs.sourcemaps.root, "styles");
      continue;
    }
    if (dir === "import") {
      if ($.mode.import) {
        if (has2("output", cli)) {
          $.dirs[dir] = base(cli.output);
        } else {
          $.dirs[dir] = base($.config.import);
        }
      } else {
        $.dirs[dir] = base($.config.import);
      }
      continue;
    } else if (dir === "export") {
      if ($.mode.export) {
        if (has2("output", cli)) {
          $.dirs[dir] = base(cli.output);
        } else {
          $.dirs[dir] = base($.config.export);
        }
      } else {
        $.dirs[dir] = base($.config.export);
      }
      continue;
    } else if (has2(dir, cli) && cli[dir] === def) {
      if ($.config[dir] === def) {
        $.dirs[dir] = base(cli[dir]);
        continue;
      } else {
        path2 = $.config[dir];
      }
    } else if (isString(cli[dir])) {
      path2 = cli[dir];
    } else {
      path2 = $.config[dir];
    }
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
  if (!mode.import)
    return;
  const hasBase = await fsExtra.pathExists(dirs.import);
  if (!hasBase) {
    try {
      await fsExtra.mkdir(dirs.import);
    } catch (e2) {
      throw new Error(e2);
    }
  }
  for (const theme3 in sync4.themes) {
    const { store, target } = sync4.themes[theme3];
    const dir = pathe.join(dirs.import, store);
    const has3 = await fsExtra.pathExists(dir);
    if (has3) {
      if (mode.clean) {
        try {
          await fsExtra.emptyDir(dir);
        } catch (e2) {
          console.error(e2);
        }
      }
    } else {
      try {
        await fsExtra.mkdir(dir);
      } catch (e2) {
        throw new Error(e2);
      }
    }
    await setThemeDirs(pathe.join(dir, target));
  }
}
async function createDirs(path2) {
  if (isArray2(path2)) {
    for (const uri of path2) {
      const has3 = await fsExtra.pathExists(uri);
      if (!has3) {
        try {
          await fsExtra.mkdir(uri);
        } catch (e2) {
          throw new Error(e2);
        }
      }
    }
  } else {
    const has3 = await fsExtra.pathExists(path2);
    if (!has3) {
      try {
        await fsExtra.mkdir(path2);
      } catch (e2) {
        throw new Error(e2);
      }
    }
  }
}

// syncify/options/json.ts
init_cjs_shims();
function setJsonOptions() {
  if (!has2("processors", $.config))
    return;
  if (!has2("json", $.config.processors))
    return;
  const { json: json2 } = $.config.processors;
  if (isNil2(json2))
    return;
  if (isObject(json2) && isEmpty2(json2))
    return;
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
  for (const option in json2) {
    if (option === "indent") {
      if (isNumber(json2[option])) {
        $.processor.json[option] = json2[option];
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
    if (option === "useTab") {
      if (isBoolean(json2[option])) {
        $.processor.json[option] = json2[option];
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
        $.processor.json[option] = anymatch3__default.default(exclude);
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
        `Attempting to purge cache outside ${bold("build")} mode Syncify requires you to pass`,
        "the build mode flags when executing a cache reset, for example:",
        "\n\n",
        `${whiteBright("$")} ${white(`syncify ${$.argv} ${blue("-b --cache")}`)}`,
        "\n\n",
        `Run ${gray("syncify --help")} for more information, or pass an execution`,
        `operation mode as per the ${whiteBright("expected")} value.`,
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
          `${whiteBright("$")} ${whiteBright(`syncify ${LAN}${cyan("mode")}${RAN}`)}`,
          "\n\n",
          `Run ${blue("syncify --help")} for more information`
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
      if (mode === "build" || mode === "clean" || mode === "cache" || mode === "export")
        continue;
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
              `Bad command ${LPR}argv${RPR} sequence passed with ${blue("export")} mode.`,
              "Theme exports are performed in isolation. You command includes",
              "execution modes that cannot be run when exporting theme/s"
            ],
            provided: $.argv.replace(pexp, red("$1")).replace(/(--export)/, blue("$1")),
            expected: $.argv.replace(eexp, "").replace(/(--export)/, blue("$1")),
            fix: [
              `Removed the flags marked ${red("red")} as shown in provided aboved.`
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
  if (!has2("snippets", $.config.views))
    return;
  const { snippets } = $.config.views;
  if (isNil2(snippets))
    return;
  if (isObject(snippets) && isEmpty2(snippets))
    return;
  if (!isObject(snippets)) {
    typeError({
      option: "views",
      name: "snippets",
      expects: "{}",
      provided: typeof snippets
    });
  }
  for (const option in $.snippet) {
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
async function setSectionOptions() {
  if (!has2("sections", $.config.views))
    return;
  const { sections } = $.config.views;
  if (isNil2($.config.views.sections))
    return;
  if (isObject(sections) && isEmpty2(sections))
    return;
  if (!isObject(sections)) {
    typeError({
      option: "views",
      name: "sections",
      expects: "{}",
      provided: typeof sections
    });
  }
  for (const option in $.section) {
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
            option: "views.sections",
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
    const ext = pathe.extname(uri);
    const key = pathe.basename(uri, ext);
    if ($.section.shared.has(key)) {
      throwError(`Duplicated shared schema file name ${bold.yellow(key + ext)} detected.`, [
        "Shared Schema JSON file names must be unique across the workspace.",
        "Update the file name and try again."
      ]);
    }
    try {
      const read2 = await fsExtra.readFile(uri);
      const data = read2.toString();
      if (data.trim().length === 0)
        continue;
      const schema3 = parseJson(data.toString());
      if (has2("$schema", schema3))
        delete schema3.$schema;
      if (has2("$description", schema3))
        delete schema3.$description;
      for (const prop in schema3) {
        if (isObject(schema3[prop])) {
          if (has2("$description", schema3[prop])) {
            delete schema3[prop].$description;
          }
        } else if (isArray2(schema3[prop])) {
          for (const setting of schema3[prop]) {
            if (has2("$description", setting))
              delete setting.$description;
          }
        }
      }
      $.cache.schema[uri] = /* @__PURE__ */ new Set();
      $.section.shared.set(key, { uri, schema: schema3 });
    } catch (e2) {
      error2(pathe.relative($.cwd, uri), {
        notify: {
          title: "JSON Error",
          message: `Error when parsing ${pathe.basename(uri)}`
        }
      });
      if (e2 instanceof JSONError) {
        json(e2, {
          relative: pathe.relative($.cwd, uri),
          base: pathe.basename(uri)
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
    const read2 = await fsExtra.readFile(file);
    const hash = checksum(read2);
    if (has2(file, $.cache.schema) && $.cache.checksum[file] === hash)
      continue;
    $.cache.checksum[file] = hash;
    const data = read2.toString();
    const open = data.search(/{%-?\s*schema/);
    if (open < 0)
      continue;
    const begin = data.indexOf("%}", open + 2) + 2;
    const start = data.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);
    if (ender < 0) {
      warn3("Liquid Parse Error", pathe.relative($.cwd, file));
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
    } catch (e2) {
      if (has2(file, $.cache.sections))
        delete $.cache.sections[file];
      warn3("JSON Parse Error", pathe.relative($.cwd, file));
    }
  }
}

// syncify/options/sync.ts
init_cjs_shims();

// syncify/utils/options.ts
init_cjs_shims();
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
      const d = `${p.slice(0, p.indexOf("_api_key"))}`;
      if (!admin.has(d)) {
        stores.push({ domain: d, themes: {} });
        admin.add(d);
      }
    } else if (p.endsWith("_api_secret")) {
      const d = `${p.slice(0, p.indexOf("_api_secret"))}`;
      if (!admin.has(d)) {
        stores.push({ domain: d, themes: {} });
        admin.add(d);
      }
    }
  }
  if (stores.length > 0)
    return stores;
  missingEnv($.cwd);
}
function authURL(domain) {
  let api_token = domain + "_api_token";
  if (!has2(api_token, $.env.vars))
    api_token = api_token.toUpperCase();
  if (has2(api_token, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { "X-Shopify-Access-Token": $.env.vars[api_token] }
    };
  }
  let api_key = domain + "_api_key";
  let api_secret = domain + "_api_secret";
  if (!has2(api_key, $.env.vars))
    api_key = api_key.toUpperCase();
  if (!has2(api_secret, $.env.vars))
    api_secret = api_secret.toUpperCase();
  if (has2(api_key, $.env.vars) && has2(api_secret, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: $.env.vars[api_key],
        password: $.env.vars[api_secret]
      }
    };
  }
  throwError(`Invalid or missing ${cyan(domain + ".myshopify.com")} credentials`, [
    `Your shop credentials in the ${cyan.bold(pathe.basename($.env.file))} file could`,
    "not be read correctly or are missing. Please check your environment file and ensure",
    "you have provided authorization."
  ]);
}
function getResolvedPaths(filePath, hook) {
  const { cwd } = $;
  const match2 = isFunction(hook) ? [] : false;
  const warn3 = warnOption("Path Resolver");
  const path2 = normalPath($.dirs.input);
  if (isArray2(filePath)) {
    const paths2 = [];
    for (const item of filePath) {
      const uri = path2(item);
      const resolved = glob6__default.default.sync(uri, {
        cwd,
        absolute: true
      });
      if (match2) {
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
    return match2 === false ? paths2 : { paths: paths2, match: anymatch3__default.default(match2) };
  }
  if (isString(filePath)) {
    const uri = path2(filePath);
    const paths2 = glob6__default.default.sync(uri, { cwd });
    if (paths2.length === 0) {
      warn3("No files can be resolved in", filePath);
    }
    if (match2) {
      const test = hook(uri);
      if (isString(test)) {
        match2.push(test);
      } else if (isArray2(test)) {
        match2.push(...test);
      }
    }
    return match2 === false ? paths2 : { paths: paths2, match: anymatch3__default.default(match2) };
  }
  typeError({
    option: "uri",
    name: "uri/path",
    provided: filePath,
    expects: "string | string[]"
  });
}
function getTransform(transforms, opts) {
  if (!has2("assertSnippet", opts))
    opts.assertSnippet = true;
  if (isString(transforms)) {
    const { paths: paths2, match: match2 } = getResolvedPaths(transforms, (watch2) => {
      if (opts.addWatch)
        $.watch.add(watch2);
      return globPath(watch2);
    });
    if (paths2) {
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: pathe.basename(input),
          snippet: false
        } : {
          input,
          rename: pathe.basename(input)
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
        if (opts.addWatch)
          $.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: pathe.basename(input),
          snippet: false
        } : {
          input,
          rename: pathe.basename(input)
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
          if (opts.addWatch)
            $.watch.add(watch2);
          return globPath(watch2);
        });
        option.match = match2;
        option.input = paths2;
        if (opts.assertSnippet && !has2("snippet", option))
          option.snippet = false;
        if (!has2("rename", option)) {
          option.rename = option.snippet ? "[name].liquid" : "[name].[ext]";
        }
        return option;
      });
    }
  } else if (isObject(transforms)) {
    const config = [];
    if (has2("input", transforms)) {
      const record = mergerino_min_default(transforms);
      const { paths: paths2, match: match2 } = getResolvedPaths(record.input, (watch2) => {
        if (opts.addWatch)
          $.watch.add(watch2);
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
          config.push(assign(record, { input }));
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
            if (opts.addWatch)
              $.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths2) {
            if (opts.flatten) {
              for (const input of paths2)
                config.push(assign({}, record, { input }));
            } else {
              config.push(assign({}, record, { input: paths2, match: match2 }));
            }
          }
        } else if (isObject(option)) {
          if (!has2("input", option)) {
            invalidError({
              option: "tranform",
              name: prop,
              value: option,
              expects: "{ input: string | string[] }"
            });
          }
          const { paths: paths2, match: match2 } = getResolvedPaths(option.input, (watch2) => {
            if (opts.addWatch)
              $.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths2) {
            const merge = rename ? assign({}, option, record, { rename: asset ? prop.slice(7) : prop.slice(9) }) : assign({}, record, option);
            if (opts.flatten) {
              for (const input of paths2) {
                config.push(assign({}, merge, { input }));
              }
            } else {
              config.push(assign(merge, { input: paths2, match: match2 }));
            }
          }
        } else if (isArray2(option)) {
          if (option.every(isString)) {
            const { paths: paths2, match: match2 } = getResolvedPaths(option, (watch2) => {
              if (opts.addWatch)
                $.watch.add(watch2);
              return globPath(watch2);
            });
            if (hasRenameNamespace(prop))
              record.rename = pathe.basename(prop);
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
    if (has2(name, pkg.devDependencies))
      return true;
  }
  if (has2("dependencies", pkg)) {
    if (has2(name, pkg.dependencies))
      return true;
  }
  if (has2("peerDependencies", pkg)) {
    if (has2(name, pkg.peerDependencies))
      return true;
  }
  if (has2("optionalDependencies", pkg)) {
    if (has2(name, pkg.peerDependencies))
      return true;
  }
  return false;
}
async function getConfigFilePath(filename) {
  for (const ext of CONFIG_FILE_EXT) {
    const filepath = `${filename}.${ext}`;
    const fileExists = await fsExtra.pathExists(filepath);
    if (fileExists)
      return filepath;
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
  } catch (e2) {
    return null;
  }
}
function hasRenameNamespace(rename) {
  return /\[(?:file|dir|ext)\]/.test(rename);
}
function renameFile2(src, rename) {
  let name = rename;
  const dir = lastPath(src);
  const ext = pathe.extname(src);
  const file = pathe.basename(src, ext);
  if (isUndefined(rename))
    return { dir, ext, file, name: file };
  if (/(\[dir\])/.test(name))
    name = name.replace("[dir]", dir);
  if (/(\[file\])/.test(name))
    name = name.replace("[file]", file);
  if (/(\.?\[ext\])/.test(name))
    name = name.replace(/\.?\[ext\]/, ext);
  return {
    ext,
    file,
    dir,
    name: rename.replace(rename, name)
  };
}

// syncify/cli/prompts.ts
init_cjs_shims();
var theme2 = {
  prefix: lightGray("\u2502 "),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red.bold,
    warning: yellowBright,
    muted: gray,
    disabled: gray,
    typing: gray
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
    if (value.name.length > separator)
      separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${gray(value.role)}`,
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
  const { targets } = await enquirer.prompt({
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
        return neonCyan(`${value.join(whiteBright(", "))}`);
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
            return "\n" + reset.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + reset.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  style2.styles.primary = neonCyan.italic;
  style2.styles.typing = neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet2 = await enquirer.prompt({
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
  const save2 = await enquirer.prompt({
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
      gray("The following store and theme references will be saved"),
      gray("to your package.json file on the syncify key property."),
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
  if (cli._.length === 0) {
    if (storeRequired) {
      invalidCommand({
        expected: "syncify <store>",
        message: [
          "You have not provided store to target, which is required",
          "when running in a resource mode that syncs to a remote source"
        ],
        fix: [
          "Provide the store target name as the first command argument",
          "followed by themes target/s and other flags."
        ]
      });
    }
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
    if ($.mode.themes)
      continue;
    if ($.mode.metafields || $.mode.pages)
      return;
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
        invalidTarget(
          {
            type: "theme",
            expected: keys(store.themes).join(","),
            provided: target,
            message: [
              `Unknown theme target (${blue(target)}) provided to ${blue(store.domain)} store`,
              `Your ${blue($.file.base)} file contains no such theme using this name.`
            ],
            fix: [
              `Provide an ${blue("expected")} theme target or update/add an existing target.`,
              `You have ${blue(`${themes2.length}`)} theme targets defined for ${blue(store.domain)}:`,
              "\n\n",
              `${DSH} ${themes2.join(`
${DSH} `)}`,
              "\n\n"
            ]
          }
        );
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
  if (storeRequired) {
    if ($.sync.stores.length === 0) {
      return invalidCommand(
        {
          expected: "syncify <store>",
          message: [
            "You have not provided store to target, which is required",
            "when running in a resource mode that syncs to a remote source"
          ],
          fix: [
            "Provide the store target name as the first command argument followed by themes",
            "target/s and other flags. Based on your current configuration:",
            "\n\n",
            `${DSH} ${white("$")} syncify ${$.stores.join(`
${DSH} ${white("$")} syncify `)}`,
            "\n\n"
          ]
        }
      );
    }
  }
  if ($.sync.themes.length === 0) {
    if (themeRequired) {
      return invalidCommand(
        {
          expected: "-t <theme>",
          message: [
            "You have not provided a theme to target, which is required",
            "when running this resource mode."
          ],
          fix: [
            `Provide a theme name to target following a ${blue("-t")} or ${blue("--theme")} flag.`,
            "Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s."
          ]
        }
      );
    }
  }
  if ($.sync.stores.length === 0) {
    throwError("Unknown, missing or invalid store/theme targets", [
      "Check your store config"
    ]);
  }
  if ($.sync.stores.length === 1 && $.sync.themes.length === 1) {
    $.env.sync = 1;
  } else if ($.sync.stores.length > 1 || $.sync.themes.length > 1) {
    $.env.sync = 2;
  }
}

// syncify/options/paths.ts
init_cjs_shims();
async function setPaths() {
  const path2 = normalPath($.dirs.input);
  const warn3 = warnOption("Path Resolution");
  const has3 = hasProp($.config.paths);
  for (const key of PATH_KEYS) {
    let uri;
    if (key === "customers") {
      uri = has3(key) ? isArray2($.config.paths[key]) ? $.config.paths[key].map(path2) : [path2($.config.paths[key])] : [path2("templates/customers")];
    } else if (key === "metaobject") {
      uri = has3(key) ? isArray2($.config.paths[key]) ? $.config.paths[key].map(path2) : [path2($.config.paths[key])] : [path2("templates/metaobject")];
    } else if (has3(key)) {
      uri = isArray2($.config.paths[key]) ? $.config.paths[key].map(path2) : [path2($.config.paths[key])];
      if (key === "snippets") {
        for (const p of uri) {
          $.snippet.baseDir.add(lastPath(pathe.dirname(p)));
        }
      } else if (key === "sections") {
        for (const p of uri) {
          $.section.baseDir.add(lastPath(pathe.dirname(p)));
        }
      } else if (key === "assets") {
        uri.push(pathe.join($.dirs.output, "assets/*"));
      }
    } else if (key === "redirects" && has3(key)) {
      uri = [pathe.join($.cwd, $.config.paths[key])];
    } else {
      uri = [path2(key)];
    }
    for (const p of uri) {
      if (key !== "metafields" && key !== "redirects") {
        const paths2 = await glob6__default.default(p, { cwd: $.cwd });
        if (paths2.length === 0) {
          if (key === "assets" && p === pathe.join($.dirs.output, "assets/*"))
            continue;
          warn3("No files could be resolved in", pathe.relative($.cwd, p));
        } else {
          if ($.paths[key].input === null) {
            $.paths[key].input = new Set(paths2);
          } else {
            for (const entry of paths2) {
              $.paths[key].input.add(entry);
            }
          }
          $.watch.add(p);
        }
      }
      $.paths[key].match = anymatch3__default.default(uri);
    }
  }
}

// syncify/options/version.ts
init_cjs_shims();
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
  if (!has2("syncifyVersion", $.cache.build)) {
    $.cache.build.syncifyVersion = $.version;
  }
  if (!has2("themeVersion", $.cache.build)) {
    $.cache.build.themeVersion = $.pkg.version;
  }
  if ($.cache.build.themeVersion !== $.pkg.number) {
    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = pathe.join($.dirs.export, `v${$.vc.major}`);
    $.vc.update.zip = pathe.join($.vc.update.dir, `${$.vc.number}.zip`);
    const { patch, minor, major } = parseVersionNumber($.cache.build.themeVersion);
    $.vc.number = $.cache.build.themeVersion;
    $.vc.patch = patch;
    $.vc.minor = minor;
    $.vc.major = major;
    $.vc.dir = pathe.join($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = pathe.join($.vc.dir, `${$.vc.number}.zip`);
  } else {
    const { patch, minor, major } = parseVersionNumber($.pkg.version);
    $.vc.number = $.pkg.version;
    $.vc.patch = patch;
    $.vc.minor = minor;
    $.vc.major = major;
    $.vc.dir = pathe.join($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = pathe.join($.vc.dir, `${$.vc.number}.zip`);
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
      $.vc.update.dir = pathe.join($.dirs.export, `v${$.vc.update.major}`);
    }
    $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
    $.vc.update.zip = pathe.join($.vc.update.dir, `${$.vc.update.number}.zip`);
  }
}

// syncify/options/spawn.ts
init_cjs_shims();

// syncify/cli/spawn.ts
init_cjs_shims();
function spawned(name, command, callback) {
  const child = crossSpawn.spawn(command.cmd, command.args, { stdio: "pipe" });
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

// syncify/options/spawn.ts
function setSpawns() {
  const { mode, spawn: spawn4, config } = $;
  if (!has2("spawn", config) || isNil2(config.spawn))
    return;
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
  if (mode.build && has3("build"))
    run2 = "build";
  if (mode.watch && has3("watch"))
    run2 = "watch";
  if (isNil2(mode) || isNil2(config.spawn[run2]))
    return;
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
  if (isEmpty2(config.spawn[run2]))
    return;
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
      log(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
      treeKill__default.default(child.pid);
    });
    nwl("");
    spawn4.streams.clear();
    process.exit(0);
  });
}

// syncify/options/script.ts
init_cjs_shims();
async function setScriptOptions() {
  if (!has2("script", $.config.transform))
    return;
  if (!$.config.transform.script || isEmpty2($.config.transform.script))
    return;
  const warn3 = warnOption("Script Transform");
  const { esbuild: esbuild4 } = $.processor;
  const { script: script2 } = $.config.transform;
  esbuild4.installed = getModules($.pkg, "esbuild");
  if (esbuild4.installed) {
    const loaded = esbuildModule();
    if (!loaded) {
      throwError("failed to import ESBuild", [
        "Ensure you have installed esbuild in your project"
      ]);
    }
    const esbuildConfigFile = await readConfigFile("esbuild.config");
    if (esbuildConfigFile !== null) {
      esbuild4.file = esbuildConfigFile.path;
      esbuild4.config = mergerino_min_default(esbuild4.config, esbuildConfigFile.config);
    }
  } else {
    missingDependency("esbuild");
  }
  if (has2("entryPoints", esbuild4.config)) {
    warn3("processor option is not allowed and was omitted", "entryPoints");
    delete esbuild4.config.entryPoints;
  }
  const transforms = getTransform(script2, {
    addWatch: false,
    flatten: true
  });
  const esbuildOptions = omit([
    "input",
    "watch",
    "rename",
    "snippet"
  ]);
  if (!has2("absWorkingDir", esbuild4.config)) {
    esbuild4.config.absWorkingDir = $.cwd;
  }
  for (const script3 of transforms) {
    const keyDir = script3.snippet ? "snippets" : "assets";
    const { name } = renameFile2(script3.input, script3.rename);
    let rename;
    if (name.endsWith(".js") === false && name.endsWith(".mjs") === false) {
      rename = name + ".js";
    } else if (name.endsWith(".cjs")) {
      invalidError({
        option: "transform.script",
        name: "rename",
        value: name,
        expects: ".js | .mjs",
        reason: [
          "You cannot use cjs extensions in web environments"
        ]
      });
    } else {
      rename = name;
    }
    if (script3.snippet === true && rename.endsWith(".liquid") === false) {
      rename = rename + ".liquid";
    }
    const has3 = hasProp(script3);
    const bundle = object();
    if (script3.snippet) {
      bundle.snippet = true;
      bundle.namespace = "snippets" /* Snippets */;
      bundle.type = 3 /* Snippet */;
      if (has3("attrs") && isEmpty2(script3.attrs) === false) {
        if (isArray2(script3.attrs)) {
          for (let i = 0; i < script3.attrs.length; i++) {
            const attr = script3.attrs[i];
            if (isArray2(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              typeError(
                {
                  option: "style",
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
              option: "style",
              name: "attrs",
              provided: script3.attrs,
              expects: "[ string[] ]"
            }
          );
        }
      }
    } else {
      bundle.snippet = false;
      bundle.namespace = "assets" /* Assets */;
      bundle.type = 10 /* Script */;
    }
    bundle.uuid = uuid();
    bundle.snippet = script3.snippet;
    bundle.input = script3.input;
    bundle.output = pathe.join($.dirs.output, keyDir, rename);
    bundle.key = pathe.join(keyDir, rename);
    bundle.attrs = [];
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;
    esbuild4.config.outfile = bundle.output;
    if ($.mode.watch)
      $.watch.unwatch(bundle.output);
    if (has3("esbuild")) {
      if (isBoolean(script3.esbuild) || isNil2(script3.esbuild)) {
        if (isEmpty2(esbuildOptions)) {
          bundle.esbuild = mergerino_min_default(esbuild4.config);
        } else {
          bundle.esbuild = mergerino_min_default(esbuild4.config, esbuildOptions);
        }
      } else if (isObject(script3.esbuild)) {
        const esProp = hasProp(script3.esbuild);
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
            warn3("Option is not allowed, Syncify will handle output", prop);
          } else if (prop === "watch" && esProp(prop)) {
            warn3("Option is not allowed, declare watch using Syncify", prop);
          } else if (esProp(prop)) {
            warn3("Option is not allowed and will be ignored", prop);
          }
        }
        if (esProp("plugins") && has2("plugins", esbuild4.config)) {
          script3.esbuild.plugins.unshift(...esbuild4.config.plugins);
        }
        if (isEmpty2(esbuildOptions)) {
          bundle.esbuild = mergerino_min_default(esbuild4.config, script3.esbuild);
        } else {
          bundle.esbuild = mergerino_min_default(esbuild4.config, script3.esbuild, esbuildOptions);
        }
      } else {
        typeError({
          option: "script",
          name: "esbuild",
          provided: typeof script3.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      if (isEmpty2(esbuildOptions)) {
        bundle.esbuild = esbuild4.config;
      } else {
        bundle.esbuild = mergerino_min_default(esbuild4.config, esbuildOptions);
      }
    }
    bundle.esbuild.entryPoints = [bundle.input];
    if ($.mode.watch) {
      if (!has3("watch")) {
        bundle.watch = /* @__PURE__ */ new Set();
      } else {
        if (!isArray2(script3.watch)) {
          typeError({
            option: "script",
            name: "watch",
            provided: script3.watch,
            expects: "string[]"
          });
        }
        const watchers = getResolvedPaths(script3.watch);
        bundle.watchCustom = anymatch3__default.default(watchers);
        bundle.watch = new Set(watchers);
      }
    } else {
      bundle.watch = /* @__PURE__ */ new Set();
    }
    try {
      await esbuildBundle(bundle);
    } catch (e2) {
      throw new Error(e2);
    }
    if ($.mode.terse) {
      bundle.esbuild = mergerino_min_default(bundle.esbuild, $.terser.script, { exclude: void 0 });
    }
    $.script.push(bundle);
  }
  esbuild4.loaded = true;
}

// syncify/options/style.ts
init_cjs_shims();
async function setStyleConfig() {
  if (!has2("style", $.config.transform))
    return;
  if (!$.config.transform.style || isEmpty2($.config.transform.style))
    return;
  const { postcss: postcss4, sass: sass4 } = $.processor;
  const warn3 = warnOption("Style Transform");
  sass4.installed = getModules($.pkg, "sass");
  if (sass4.installed) {
    const loaded = await load("sass");
    if (!loaded) {
      throwError("Unable to dynamically import SASS", [
        "Ensure you have installed sass"
      ]);
    }
  }
  postcss4.installed = getModules($.pkg, "postcss");
  if (postcss4.installed) {
    const loaded = await load("postcss");
    if (!loaded) {
      throwError("Unable to dynamically import PostCSS", [
        "Ensure you have installed postcss"
      ]);
    }
    const pcss = await readConfigFile("postcss.config", {
      tsconfig: null
    });
    if (pcss !== null) {
      postcss4.file = pcss.path;
      postcss4.config = pcss.config;
    }
  }
  const styles2 = getTransform($.config.transform.style, {
    addWatch: false,
    flatten: true
  });
  const path2 = normalPath($.config.input);
  for (const style2 of styles2) {
    const has3 = hasProp(style2);
    const bundle = object();
    bundle.uuid = uuid();
    bundle.input = style2.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = false;
    bundle.sass = false;
    bundle.tailwind = false;
    if (has3("postcss")) {
      if (!postcss4.installed)
        missingDependency("postcss");
      if (isArray2(style2.postcss)) {
        bundle.postcss = style2.postcss;
      } else {
        const override = isObject(style2.postcss);
        if (isBoolean(style2.postcss) || override) {
          if (style2.postcss !== false && isNil2(style2.postcss) === false) {
            if (!postcss4.installed)
              missingDependency("postcss");
            bundle.postcss = override ? mergerino_min_default(postcss4.config, style2.postcss) : true;
          }
        } else {
          typeError(
            {
              option: "style",
              name: "postcss",
              provided: bundle.postcss,
              expects: "boolean | {}"
            }
          );
        }
      }
    } else {
      bundle.postcss = postcss4.installed;
    }
    if (has3("sass") && style2.sass !== false && sass4.installed === true) {
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && isNil2(style2.sass) === false) {
        if (!sass4.installed)
          missingDependency("sass");
        if (override === false) {
          defineProperty(bundle, "sass", { get() {
            return style2.sass;
          } });
        } else {
          bundle.sass = mergerino_min_default(sass4.config, style2.sass);
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
                  const resolve3 = pathe.join($.cwd, path3);
                  if (await fsExtra.exists(resolve3)) {
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
      if (style2.snippet === false && !/\.s[ac]ss/.test(pathe.extname(bundle.input))) {
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
        const globs = await glob6__default.default(pathe.join($.cwd, path2(uri)));
        if (globs.length === 0 && uri[0] !== "!") {
          warn3("Cannot resolve watch glob/path uri", uri);
        }
        for (const p of globs) {
          if (await fsExtra.exists(p)) {
            watch2.push(p);
          } else {
            warn3("No file exists in path", p);
          }
        }
      }
      watch2.push(bundle.input);
      for (const path3 of watch2)
        $.watch.add(path3);
      bundle.watch = anymatch3__default.default(watch2);
    } else {
      bundle.watch = anymatch3__default.default([bundle.input]);
      $.watch.add(bundle.input);
    }
    if (isObject(bundle.sass)) {
      bundle.sass.include.unshift($.cwd, pathe.join($.cwd, rename.dir));
      if (hasPath("sass.include", style2)) {
        bundle.sass.include = style2.sass.include.map((p) => pathe.join($.cwd, p));
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
          for (let i = 0; i < style2.attrs.length; i++) {
            const attr = style2.attrs[i];
            if (isArray2(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              typeError(
                {
                  option: "style",
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
        $.watch.unwatch(pathe.join($.dirs.output, "snippets", bundle.rename));
      }
    } else {
      bundle.rename = rename.name;
      if ($.mode.watch) {
        $.watch.unwatch(pathe.join($.dirs.output, "assets", rename.name));
      }
    }
    $.style.push(bundle);
  }
}

// syncify/options/svg.ts
init_cjs_shims();
async function setSvgOptions() {
  if (!has2("svg", $.config.transform))
    return;
  if (!$.config.transform.svg || isEmpty2($.config.transform.svg))
    return;
  const { sprite, svgo } = $.processor;
  const warn3 = warnOption("SVG Transform");
  svgo.installed = getModules($.pkg, "svgo");
  if (svgo.installed) {
    const loaded = await load2("svgo");
    if (!loaded) {
      throwError("Unable to dynamically import SVGO", [
        "Ensure you have installed svgo"
      ]);
    }
  }
  sprite.installed = getModules($.pkg, "svg-sprite");
  if (sprite.installed) {
    const loaded = await load2("svg-sprite");
    if (!loaded) {
      throwError("Unable to dynamically import SVG Sprite", [
        "Ensure you have installed svg-sprite"
      ]);
    }
  }
  if (sprite.installed === false && svgo.installed === false) {
    missingDependency([
      "svgo",
      "svg-sprite"
    ]);
  }
  const svgs = getTransform($.config.transform.svg, {
    addWatch: true,
    flatten: false
  });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path2) => {
      if (pathe.extname(path2) === ".svg")
        return true;
      warn3("Excluded file which is not an SVG type", pathe.relative($.cwd, path2));
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
        if (!svgo.installed)
          missingDependency("svgo");
        bundle.format = "file";
        bundle.svgo = isObject(svg2.svgo) ? mergerino_min_default(svgo.config, svg2.svgo) : true;
      } else if (has3("sprite")) {
        if (!sprite.installed)
          missingDependency("svg-sprite");
        bundle.format = "sprite";
        bundle.sprite = isObject(svg2.sprite) ? mergerino_min_default(sprite.config, svg2.sprite) : true;
      } else {
        if (svgo.installed && sprite.installed) {
          missingOption(
            {
              option: "transform.svg",
              key: "format",
              expects: "sprite | file",
              reason: [
                `SVG transforms require you to define ${cyan("format")} when both SVGO and SVG Sprite`,
                "processors are installed. Syncify needs to knows how is should handle the input and",
                "which processor to use for the transform."
              ]
            }
          );
        } else if (svgo.installed && !sprite.installed) {
          bundle.format = "file";
          bundle.svgo = true;
        } else if (sprite.installed && !svgo.installed) {
          bundle.format = "sprite";
          bundle.sprite = true;
        } else {
          unknownError(
            "transform > svg",
            "Cannot resolve processor, try defining a format."
          );
        }
      }
    } else {
      if (svg2.format === "file" || svg2.format === "sprite") {
        bundle.format = svg2.format;
        if (svg2.format === "file") {
          bundle.svgo = true;
          if (!svgo.installed)
            missingDependency("svgo");
        } else {
          bundle.sprite = true;
          if (!sprite.installed)
            missingDependency("svg-sprite");
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
}

// syncify/options/hot.ts
init_cjs_shims();
async function setHotReloads() {
  if ($.mode.watch !== true) {
    if ($.cache.build.hotSnippet.length > 0) {
      for (const path2 of $.cache.build.hotSnippet)
        await ejectRender(path2);
      $.cache.build.hotSnippet = [];
    }
    return;
  }
  if ($.mode.hot === false && $.config.hot === false) {
    if ($.cache.build.hotSnippet.length > 0) {
      for (const path2 of $.cache.build.hotSnippet)
        await ejectRender(path2);
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
  if (allFalse(
    isObject($.config.hot),
    isBoolean($.config.hot),
    isNil2($.config.hot)
  )) {
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
  $.hot.snippet = pathe.join($.cwd, "node_modules", "@syncify/cli", "hot.js.liquid");
  $.hot.output = pathe.join($.dirs.output, "snippets", "hot.js.liquid");
  const base = pathe.join($.dirs.output, "layout");
  for (const layout of $.hot.layouts) {
    const path2 = pathe.join(base, layout);
    $.hot.alive[path2] = false;
    if (!$.cache.build.hotSnippet.includes(base))
      $.cache.build.hotSnippet.push(base);
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
  $.wss = socket();
}

// syncify/options/filters.ts
init_cjs_shims();
function throwCommandError(type2, cmd) {
  const pattern = [];
  const ref = object();
  if ($.mode.upload) {
    ref.base = "output";
    ref.from = "output";
    ref.dirs = THEME_DIRS.map((dir) => `${white("-")} ${blue(dir)}`);
    ref.fix = [
      `The ${blue("--filter")} (or ${blue("-f")}) flag command argument expects you`,
      "provide a theme output directory as the starting point. Filtering begins with",
      "a Shopify output directory name, for example:",
      "",
      `${white("$")} ${white(`syncify --filter ${blue("sections/file.liquid")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("snippets/*")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("templates/*.json")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${bold(ref.base)} directory`,
      "based on the starting point directory name. You can pass glob star matches following the",
      `directory namespace or starting point ignores (${blue("!")}) as long the directory can match.`
    ];
  } else {
    ref.base = "input";
    ref.from = "paths";
    ref.dirs = PATH_KEYS.map((dir) => `${white("-")} ${blue(dir)}`);
    ref.fix = [
      `The ${blue("--filter")} (or ${blue("-f")}) flag command argument expects you`,
      `provide a ${yellow.bold("paths")} key name as the starting point. Filtering begins with`,
      "a Shopify output directory name, for example:",
      "",
      `${white("$")} ${white(`syncify --filter ${blue("sections/file.liquid")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("snippets/*")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("templates/*.json")}`)}`,
      `${white("$")} ${white(`syncify --filter ${blue("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${bold(ref.base)} directory`,
      `based on the starting point ${bold("paths")} name. You can pass glob star matches following the`,
      `starting point or ignores (${blue("!")}) as long the reference can match.`
    ];
  }
  if (type2 === "pattern") {
    pattern.push(`Invalid ${blue("--filter")} pattern provided. You cannot pass starting point`);
    if (cmd[0] === "*") {
      pattern.push(`glob (${blue("*")}) stars as filters, Syncify does not support this.`);
    } else if (cmd[0] === "/") {
      pattern.push(`path (${blue("/")}) roots as filters, Syncify does not support this.`);
    } else if (cmd[0] === ".") {
      pattern.push(`dot paths (${blue(".")})  as filters, Syncify does not support this.`);
    }
    pattern.push(
      `Use a starting point reference name based on the ${blue(ref.from)} key property`,
      `in your ${blue($.file.base)} file.`
    );
  } else {
    pattern.push(
      `Invalid directory provided. The ${blue("--filter")} pattern expects the starting point`,
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
    if (!regexp.test(input.slice(1)))
      throwCommandError("dir", input);
    return;
  }
  if (!regexp.test(input))
    throwCommandError("dir", input);
  const path2 = input.slice(0, input.indexOf("/"));
  if (!isArray2($.filters[path2]))
    $.filters[path2] = [];
  $.filters[path2].push(pathe.join(base, input));
}
function setFilters(cli) {
  if (!has2("filter", cli))
    return;
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

// syncify/options/terser.ts
init_cjs_shims();
function setTerserOptions() {
  const { terser: terser2, mode } = $;
  if (isBoolean($.config.terser)) {
    if (mode.terse === false && $.config.terser === false)
      return;
    if (mode.terse === false && $.config.terser === true)
      mode.terse = true;
  }
  const warn3 = warnOption("terser configuration");
  if (typeof $.config.terser === "object") {
    for (const key in $.config.terser) {
      if ($.config.terser[key] === false || isNil2($.config.terser[key])) {
        if ($.mode.terse === true)
          $.terse[key] = true;
        continue;
      }
      if (key === "script") {
        if ($.processor.esbuild.installed === false && (isObject($.config.terser[key]) && isEmpty2($.config.terser[key]) === false || isBoolean($.config.terser[key]) && $.config.terser[key] === true)) {
          throwError("esbuild is not installed", ESBUILD_NOT_INSTALLED);
        }
      }
      if (isBoolean($.config.terser[key])) {
        $.terser[key] = $.config.terser[key];
      } else if (isObject(terser2[key])) {
        if (isEmpty2(terser2[key]))
          continue;
        for (const opt in $.config.terser[key]) {
          if (opt === "exclude") {
            if (!isEmpty2($.config.terser[key][opt])) {
              terser2[key][opt] = getResolvedPaths($.config.terser[key][opt]);
            }
            continue;
          }
          if (!has2(opt, terser2[key]))
            unknownError(`terser.${key}`, opt);
          if (opt === "mangleProps") {
            if (!isNil2($.config.terser[key][opt]) && !isRegex(terser2[key][opt])) {
              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: `${typeof $.config.terser[key][opt]} (${$.config.terser[key][opt]})`,
                expects: "Regex | string | undefined"
              });
            }
          } else {
            if (!isNil2($.config.terser[key][opt]) && typeof terser2[key][opt] !== typeof $.config.terser[key][opt]) {
              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: typeof $.config.terser[key][opt],
                expects: typeof terser2[key][opt]
              });
            }
          }
          if (opt === "collapseWhitespace") {
            terser2.markup.collapseWhitespace = $.config.terser[key][opt];
          } else {
            terser2[key][opt] = $.config.terser[key][opt];
          }
        }
      } else {
        warn3("unkown option provided", key);
      }
    }
  }
}

// syncify/options/pages.ts
init_cjs_shims();
function setPageOptions() {
  if (!hasProp($.config.views)("pages"))
    return;
  const { pages } = $.config.views;
  if (!isObject(pages) && !isNil2(pages)) {
    typeError({
      option: "views",
      name: "pages",
      provided: typeof pages,
      expects: "{}"
    });
  }
  if (isEmpty2(pages))
    return;
  const has3 = hasProp(pages);
  for (const option in pages) {
    if (!has3(option))
      unknownError("pages", option);
    if (option === "language") {
      if (isString(pages[option])) {
        if (pages[option] === "markdown" || pages[option] === "html") {
          $.page[option] = pages[option];
        } else {
          invalidError({
            option: "views.pages",
            name: option,
            value: pages[option],
            expects: "markdown | html"
          });
        }
      } else {
        typeError({
          option: "views.pages",
          name: option,
          provided: pages[option],
          expects: "markdown | html"
        });
      }
    } else if (option === "author") {
      if (isNil2(pages[option]))
        continue;
      if (isString(pages[option])) {
        $.page[option] = pages[option];
      } else {
        typeError({
          option: "views.pages",
          name: option,
          provided: pages[option],
          expects: "string"
        });
      }
    } else if (option === "suffixDir" || option === "safeSync") {
      if (isNil2(pages[option]))
        continue;
      if (isBoolean(pages[option])) {
        $.page[option] = pages[option];
      } else {
        typeError({
          option: "views.pages",
          name: option,
          provided: pages[option],
          expects: "object"
        });
      }
    } else if (option === "global") {
      if (isNil2(pages[option]))
        continue;
      if (isArray2(pages[option])) {
        if (pages[option].length > 0) {
          $.page[option] = new RegExp(`${pages[option].join("|")}`);
          continue;
        }
      } else {
        typeError({
          option: "views.pages",
          name: option,
          provided: pages[option],
          expects: "string | string[]"
        });
      }
    }
  }
}

// syncify/options/publish.ts
init_cjs_shims();
async function setPublishConfig() {
  if (isObject($.config.publish) && isEmpty2($.config.publish) === false) {
    for (const prop in $.config.publish) {
      if (!has2(prop, $.publish))
        unknownError(`publish.${prop}`, $.config.publish[prop]);
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
          `This is easy to obtain, visit ${underline("https://ngrok.com")}`,
          `and create a ${bold("free")} account to get a token.`,
          "",
          `Once you have obtained an auth token, provide it in your ${gray(".env")}`,
          "file, use the following environment variable name:",
          "",
          `${whiteBright('ngrok_auth_token = ""')}`
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
  await getPackageJson(cli.cwd);
  await getConfig(cli);
  await getCache(cli);
  setMisc(cli);
  setModes(cli);
  if ($.mode.setup)
    return;
  process.env.SYNCIFY_ENV = $.env.dev ? "dev" : "prod";
  process.env.SYNCIFY_WATCH = String($.mode.watch);
  setBaseDirs(cli);
  setVersion(cli);
  setFilters(cli);
  runtime.modes($);
  await setSync(cli);
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
  ).catch((e2) => {
    throws(e2, {
      details: "Directory and path generation error"
    });
  });
  if ($.mode.themes)
    return;
  setPageOptions();
  setJsonOptions();
  setSnippetOptions();
  setPlugins();
  if (!$.mode.build)
    runtime.stores($);
  const promise = await Promise.all(
    [
      setSectionOptions(),
      setScriptOptions(),
      setStyleConfig(),
      setSvgOptions(),
      setHotReloads(),
      cacheDone()
    ]
  ).catch((e2) => {
    throws(e2, {
      details: "Runtime error"
    });
  });
  setTerserOptions();
  runtime.warnings($);
  if (!$.mode.build)
    runtime.time();
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
  if (prop("silent"))
    $.log.config.silent = $.config.log.silent;
  if (prop("clear"))
    $.log.config.clear = $.config.log.clear;
  if (prop("stats"))
    $.log.config.stats = $.config.log.stats;
  if (prop("warnings"))
    $.log.config.warnings = $.config.log.warnings;
}
function setChokidar(watch2) {
  if (!watch2)
    return;
  $.watch = new chokidar.FSWatcher(
    {
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      interval: 75,
      binaryInterval: 100,
      ignored: ["**/*.map"],
      ignorePermissionErrors: true
    }
  );
  $.watch = Object.defineProperties($.watch, {
    has: {
      value(path2, dir = $.cwd) {
        return $.watch._watched.has(dir) ? $.watch._watched.get(dir).items.has(path2) : false;
      }
    },
    paths: {
      get() {
        return toArray($.watch.values());
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
      if (isEmpty2($.config.processors[prop]))
        continue;
      if (isArray2($.config.processors[prop])) {
        $.processor[prop].config = $.config.processors[prop];
      } else if (isObject($.config.processors[prop])) {
        $.processor[prop].config = mergerino_min_default($.processor[prop].config, $.config.processors[prop]);
      }
    }
  }
}
function setPlugins() {
  if (!has2("plugins", $.config))
    return;
  if (!isArray2($.config.plugins))
    return;
  for (const plugin of $.config.plugins) {
    if (has2("onInit", plugin))
      plugin.onInit.call({ ...$ }, $.config);
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
  const cfg = await configFile(cli.cwd);
  if (cfg !== null) {
    $.config = cfg;
  } else {
    if (has2("syncify", $.pkg)) {
      if (has2("config", $.pkg.syncify)) {
        $.config = $.pkg.syncify.config;
      } else if (!has2("stores", $.pkg.syncify)) {
        if (cli.setup === false) {
          missingConfig(cli.cwd);
        }
      }
    }
  }
}

// syncify/modes/setup.ts
init_cjs_shims();

// syncify/requests/access.ts
init_cjs_shims();
async function get2(client2) {
  return axios.get("/oauth/access_scopes.json", client2).then(({ data }) => {
    return data;
  }).catch((e2) => {
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
  const { domain } = await enquirer.prompt({
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
  const { token } = await enquirer.prompt({
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
  const { ngrok: ngrok2 } = await enquirer.prompt({
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
  const client2 = {
    baseURL: `https://${domain}.myshopify.com/admin`,
    headers: {
      "X-Shopify-Access-Token": token.trim()
    }
  };
  const scopes = await get2(client2);
  if (isBoolean(scopes)) {
    return log(
      message.NL.Wrap(
        `Connection failed on ${cyan(`${domain}.myshopify.com`)}. Please check the API Access Token`,
        "is correct and you have set the correct scopes, then try again.",
        red
      ).NL.End($.log.group).BR.toString()
    );
  }
  for (const { handle } of scopes.access_scopes) {
    if (handle in model.scopes) {
      model.scopes[handle] = true;
      message.Line(`${CHK} ${handle}`);
    }
  }
  let count = 0;
  for (const scope in model.scopes) {
    if (model.scopes[scope] === false) {
      message.Line(`${BAD} ${scope}`, red);
      count = count + 1;
    }
  }
  if (count > 0) {
    return log(
      message.NL.Wrap(
        "Syncify requires read and write access to all the above resources.",
        "Provide access to all scopes in red above and try again.",
        red
      ).NL.End($.log.group).BR.toString()
    );
  }
  log(message.toLine());
  model.store = domain;
  model.domain = `${domain}.myshopify.com`;
  model.token = token.trim();
  model.ngrok = ngrok2.trim();
}

// syncify/api.ts
init_cjs_shims();

// syncify/index.ts
async function run(options, config, callback) {
  if (has("_", options))
    options._ = options._.slice(1);
  if (process3.argv.slice(2).length === 0 || options.help === "examples" || isString(options.help) && options.help.length === 0)
    return help(options);
  await define(options);
  if ($.mode.setup)
    return setup();
  if ($.mode.themes)
    return themes();
  process.stdin.on("data", stdin);
  if ($.mode.hot)
    await server();
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
  } catch (e2) {
    console.log(e2);
  }
}

// syncify/cli.ts
run(mm__default.default(process3.argv.slice(1), {
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
    /* VERSIONING -------------------------------- */
    bump: null,
    /* HELP --------------------------------------- */
    help: null,
    /* TODO --------------------------------------- */
    strap: false
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
    // --strap silk | --strap dawn
  ]
})).catch(console.error);
