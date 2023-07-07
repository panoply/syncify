'use strict';

var process2 = require('process');
var connect = require('axios');
var events = require('events');
var module$1 = require('module');
var zlib = require('zlib');
var stream = require('stream');
var console$1 = require('console');
var perf_hooks = require('perf_hooks');
var os = require('os');
var readline = require('readline');
var child_process = require('child_process');
var path$1 = require('path');
var url = require('url');
var notifier = require('node-notifier');
var glob3 = require('fast-glob');
var fsExtra = require('fs-extra');
require('prompts');
var anymatch3 = require('anymatch');
var htmlMinifierTerser = require('html-minifier-terser');
var matter = require('gray-matter');
require('turndown');
require('turndown-plugin-gfm');
var Markdown = require('markdown-it');
var ws$1 = require('ws');
var statics = require('serve-static');
var handler = require('finalhandler');
var http = require('http');
var chokidar = require('chokidar');
var dotenv = require('dotenv');
var spawn3 = require('cross-spawn');
var loadTsconfig = require('load-tsconfig');
var esbuild$1 = require('esbuild');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var process2__default = /*#__PURE__*/_interopDefault(process2);
var connect__default = /*#__PURE__*/_interopDefault(connect);
var zlib__default = /*#__PURE__*/_interopDefault(zlib);
var os__default = /*#__PURE__*/_interopDefault(os);
var readline__default = /*#__PURE__*/_interopDefault(readline);
var notifier__default = /*#__PURE__*/_interopDefault(notifier);
var glob3__default = /*#__PURE__*/_interopDefault(glob3);
var anymatch3__default = /*#__PURE__*/_interopDefault(anymatch3);
var matter__default = /*#__PURE__*/_interopDefault(matter);
var Markdown__default = /*#__PURE__*/_interopDefault(Markdown);
var statics__default = /*#__PURE__*/_interopDefault(statics);
var handler__default = /*#__PURE__*/_interopDefault(handler);
var http__default = /*#__PURE__*/_interopDefault(http);
var dotenv__default = /*#__PURE__*/_interopDefault(dotenv);
var spawn3__default = /*#__PURE__*/_interopDefault(spawn3);

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

// node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module) {
    var has3 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context2, once) {
      this.fn = fn;
      this.context = context2;
      this.once = once || false;
    }
    function addListener(emitter, event2, fn, context2, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context2 || emitter, once), evt = prefix ? prefix + event2 : event2;
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
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter3() {
      this._events = new Events();
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
    EventEmitter3.prototype.on = function on(event2, fn, context2) {
      return addListener(this, event2, fn, context2, false);
    };
    EventEmitter3.prototype.once = function once(event2, fn, context2) {
      return addListener(this, event2, fn, context2, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event2, fn, context2, once) {
      var evt = prefix ? prefix + event2 : event2;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context2 || listeners.context === context2)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context2 && listeners[i].context !== context2) {
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

// node_modules/.pnpm/eastasianwidth@0.2.0/node_modules/eastasianwidth/eastasianwidth.js
var require_eastasianwidth = __commonJS({
  "node_modules/.pnpm/eastasianwidth@0.2.0/node_modules/eastasianwidth/eastasianwidth.js"(exports, module) {
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
    eaw.slice = function(text, start3, end) {
      textLen = eaw.length(text);
      start3 = start3 ? start3 : 0;
      end = end ? end : 1;
      if (start3 < 0) {
        start3 = textLen + start3;
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
        if (eawLen >= start3 - (charLen == 2 ? 1 : 0)) {
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
    module.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/bundle.js
var require_bundle = __commonJS({
  "node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/bundle.js"(exports) {
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

// node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/index.js
var require_ansis = __commonJS({
  "node_modules/.pnpm/ansis@1.5.5/node_modules/ansis/index.js"(exports, module) {
    var bundle2 = require_bundle();
    module.exports = bundle2.default;
    module.exports.Ansis = bundle2.Ansis;
  }
});

// node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js"(exports, module) {
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
    var process9 = global.process;
    var processOk = function(process10) {
      return process10 && typeof process10 === "object" && typeof process10.removeListener === "function" && typeof process10.emit === "function" && typeof process10.reallyExit === "function" && typeof process10.listeners === "function" && typeof process10.kill === "function" && typeof process10.pid === "number" && typeof process10.on === "function";
    };
    if (!processOk(process9)) {
      module.exports = function() {
        return function() {
        };
      };
    } else {
      assert = __require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process9.platform);
      EE = __require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process9.__signal_exit_emitter__) {
        emitter = process9.__signal_exit_emitter__;
      } else {
        emitter = process9.__signal_exit_emitter__ = new EE();
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
            process9.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process9.emit = originalProcessEmit;
        process9.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      };
      module.exports.unload = unload;
      emit = function emit2(event2, code, signal2) {
        if (emitter.emitted[event2]) {
          return;
        }
        emitter.emitted[event2] = true;
        emitter.emit(event2, code, signal2);
      };
      sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          if (!processOk(global.process)) {
            return;
          }
          var listeners = process9.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process9.kill(process9.pid, sig);
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
            process9.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process9.emit = processEmit;
        process9.reallyExit = processReallyExit;
      };
      module.exports.load = load3;
      originalProcessReallyExit = process9.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process9.exitCode = code || /* istanbul ignore next */
        0;
        emit("exit", process9.exitCode, null);
        emit("afterexit", process9.exitCode, null);
        originalProcessReallyExit.call(process9, process9.exitCode);
      };
      originalProcessEmit = process9.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process9.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process9.exitCode, null);
          emit("afterexit", process9.exitCode, null);
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/type.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/_internals/isArray.js
var { isArray } = Array;

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/_internals/isTruthy.js
function isTruthy(x) {
  if (isArray(x)) {
    return x.length > 0;
  }
  if (type(x) === "Object") {
    return Object.keys(x).length > 0;
  }
  return Boolean(x);
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/allFalse.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/anyTrue.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/_internals/createPath.js
function createPath(path2, delimiter = ".") {
  return typeof path2 === "string" ? path2.split(delimiter) : path2;
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/path.js
function path(pathInput, obj) {
  if (arguments.length === 1)
    return (_obj) => path(pathInput, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/equals.js
function _indexOf(valueToFind, list) {
  if (!isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`);
  }
  const typeOfValue = type(valueToFind);
  if (!["Object", "Array", "NaN", "RegExp"].includes(typeOfValue))
    return list.indexOf(valueToFind);
  let index = -1;
  let foundIndex = -1;
  const { length } = list;
  while (++index < length && foundIndex === -1) {
    if (equals(list[index], valueToFind)) {
      foundIndex = index;
    }
  }
  return foundIndex;
}
function _arrayFromIterator(iter) {
  const list = [];
  let next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/includes.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/mapAsync.js
async function mapAsyncFn(fn, listOrObject) {
  if (isArray(listOrObject)) {
    const willReturn2 = [];
    let i = 0;
    for (const a of listOrObject) {
      willReturn2.push(await fn(a, i++));
    }
    return willReturn2;
  }
  const willReturn = {};
  for (const prop in listOrObject) {
    willReturn[prop] = await fn(listOrObject[prop], prop);
  }
  return willReturn;
}
function mapAsync(fn, listOrObject) {
  if (arguments.length === 1) {
    return async (_listOrObject) => mapAsyncFn(fn, _listOrObject);
  }
  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, listOrObject).then(resolve).catch(reject);
  });
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/mergeRight.js
function mergeRight(target, newProps) {
  if (arguments.length === 1)
    return (_newProps) => mergeRight(target, _newProps);
  return Object.assign(
    {},
    target || {},
    newProps || {}
  );
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/isType.js
function isType(xType, x) {
  if (arguments.length === 1) {
    return (xHolder) => isType(xType, xHolder);
  }
  return type(x) === xType;
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/mapParallelAsync.js
async function mapParallelAsyncFn(fn, arr) {
  const promised = arr.map((a, i) => fn(a, i));
  return Promise.all(promised);
}
function mapParallelAsync(fn, arr) {
  if (arguments.length === 1) {
    return async (holder) => mapParallelAsyncFn(fn, holder);
  }
  return new Promise((resolve, reject) => {
    mapParallelAsyncFn(fn, arr).then(resolve).catch(reject);
  });
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/omit.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/_internals/set.js
var _Set = class {
  constructor() {
    this.set = /* @__PURE__ */ new Set();
    this.items = {};
  }
  checkUniqueness(item) {
    const type2 = type(item);
    if (["Null", "Undefined", "NaN"].includes(type2)) {
      if (type2 in this.items) {
        return false;
      }
      this.items[type2] = true;
      return true;
    }
    if (!["Object", "Array"].includes(type2)) {
      const prevSize = this.set.size;
      this.set.add(item);
      return this.set.size !== prevSize;
    }
    if (!(type2 in this.items)) {
      this.items[type2] = [item];
      return true;
    }
    if (_indexOf(item, this.items[type2]) === -1) {
      this.items[type2].push(item);
      return true;
    }
    return false;
  }
};

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/uniq.js
function uniq(list) {
  const set = new _Set();
  const willReturn = [];
  list.forEach((item) => {
    if (set.checkUniqueness(item)) {
      willReturn.push(item);
    }
  });
  return willReturn;
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/has.js
function has(prop, obj) {
  if (arguments.length === 1)
    return (_obj) => has(prop, _obj);
  if (!obj)
    return false;
  return obj.hasOwnProperty(prop);
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/hasPath.js
function hasPath(pathInput, obj) {
  if (arguments.length === 1) {
    return (objHolder) => hasPath(pathInput, objHolder);
  }
  return path(pathInput, obj) !== void 0;
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/isEmpty.js
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

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/isNil.js
function isNil(x) {
  return x === void 0 || x === null;
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/join.js
function join(glue2, list) {
  if (arguments.length === 1)
    return (_list) => join(glue2, _list);
  return list.join(glue2);
}

// node_modules/.pnpm/rambdax@9.1.1/node_modules/rambdax/src/last.js
function last(listOrString) {
  if (typeof listOrString === "string") {
    return listOrString[listOrString.length - 1] || "";
  }
  return listOrString[listOrString.length - 1];
}

// lib/utils/native.ts
var { error, log, warn } = console;
var nil = "";
var ws = " ";
var nl = "\n";
var wsr = (i) => ws.repeat(i);
var nlr = (i) => nl.repeat(i);
join(nl);
var glue = join(nil);
var assign = Object.assign;
var defineProperty = Object.defineProperty;
var keys = Object.keys;
var values = Object.values;
var toArray = Array.from;
Buffer.from;
var isArray2 = Array.isArray;
var isBuffer = Buffer.isBuffer;
var isUndefined = isType("Undefined");
var isObject = isType("Object");
var isBoolean = isType("Boolean");
var isRegex = isType("RegExp");
var isNumber = isType("Number");
var isString = isType("String");
var isFunction = isType("Function");
isType("Async");

// lib/log/loggers.ts
var loggers_exports = {};
__export(loggers_exports, {
  build: () => build,
  changed: () => changed,
  clear: () => clear2,
  deleted: () => deleted,
  err: () => err,
  exported: () => exported,
  external: () => external,
  failed: () => failed,
  hline: () => hline,
  hook: () => hook,
  ignored: () => ignored,
  importer: () => importer,
  invalid: () => invalid,
  minified: () => minified,
  newGroup: () => newGroup,
  nwl: () => nwl,
  out: () => log,
  process: () => process6,
  progress: () => progress,
  reloaded: () => reloaded,
  retrying: () => retrying,
  skipped: () => skipped,
  spawn: () => spawn2,
  spinner: () => spinner,
  start: () => start2,
  syncing: () => syncing,
  throws: () => throws,
  transform: () => transform,
  unhook: () => unhook,
  update: () => log_update_default,
  upload: () => upload,
  write: () => write2
});
var cache = {
  /* DYNAMICALLY POPULATED */
};
var warning = {
  current: null,
  count: 0,
  process: {}
};
var terser = {
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    sectionGroups: true,
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
    minifyScript: true,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    stripDashes: true,
    exclude: []
  },
  style: {
    exclude: [],
    format: false,
    inline: false
  },
  html: {
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
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    continueOnParseError: true,
    removeComments: true,
    trimCustomFragments: true,
    ignoreCustomFragments: [
      /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
      /<style[\s\S]*?<\/style>/,
      /<script[\s\S]*?<\/script>/,
      /{%-?\s*liquid[\s\S]*?%}/,
      /{%[\s\S]*?%}/
    ]
  }
};
var processor = {
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
        "preset-default",
        {
          name: "pluginName",
          fn: () => {
            return {
              root: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              element: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              doctype: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              instruction: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              comment: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              cdata: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              },
              text: {
                enter: (node) => {
                },
                exit: (node) => {
                }
              }
            };
          }
        }
      ]
    }
  }
};
var defaults = {
  input: "source",
  output: "theme",
  import: "import",
  export: "export",
  config: ".",
  hot: false,
  stores: null,
  spawn: {
    build: null,
    watch: null
  },
  logger: {
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
    snippets: "snippets/*.liquid",
    metafields: "metafields/**/*.json",
    redirects: "redirects.yaml",
    sections: [
      "sections/**/*.json",
      "sections/**/*.liquid"
    ],
    pages: [
      "pages/*.html",
      "pages/*.md"
    ],
    templates: [
      "templates/customers/*.liquid",
      "templates/customers/*.json"
    ],
    customers: [
      "templates/customers/*.liquid",
      "templates/customers/*.json"
    ]
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
      language: "html"
    }
  },
  transforms: {
    svg: null,
    style: null,
    script: null
  },
  terser: {
    json: false,
    views: false,
    script: false
  }
};
var plugins = {
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
};
var bundle = new class Bundle {
  /**
   * The users configuration settings merged with defaults
   */
  static defaults = defaults;
  /**
   * The parsed contents of `package.json` file
   */
  static package = {};
  /**
   * The terse minification configuration settings
   */
  static terser = terser;
  /**
   * Websockets HOT reloading
   */
  wss = null;
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
  commands = null;
  /**
   * The version defined in the package.json
   *
   * @default null
   */
  version = null;
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
  argv = process2.argv.slice(2).join(" ");
  /**
   * Error store, holds reference to errors
   *
   * @default Set<string>
   */
  errors = /* @__PURE__ */ new Set();
  /**
   * Execution options which describe the invocation and operation
   * instructions which Syncify was initialised.
   *
   * @default
   * {
   *  cli: false,
   *  dev: true,
   *  prod: false
   *  sync: 0
   * }
   */
  env = {
    cli: false,
    dev: true,
    prod: false,
    sync: 0
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
    scroll: "preserved",
    layouts: ["theme.liquid"],
    label: "visible",
    renderer: "{% render 'hot.js', server: 3000, socket: 8089 %}",
    snippet: null,
    output: null,
    alive: {}
  };
  /**
   * Logger Options
   */
  logger = {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  };
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = {
    build: false,
    interactive: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    terse: false,
    hot: false,
    pages: false,
    pull: false,
    force: false,
    vsc: false,
    views: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false
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
   * Base directory path references
   */
  dirs = {};
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
   * The sync clients. Multiple stores and themes can run concurrently.
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  sync = {
    themes: [],
    stores: []
  };
  /**
   * Spawn related configuration operations
   */
  spawn = {
    paths: /* @__PURE__ */ new Set(),
    streams: /* @__PURE__ */ new Map(),
    invoked: false,
    commands: {}
  };
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
    prefixDir: false,
    separator: "-",
    global: null
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
    prefixDir: false,
    separator: "-",
    global: null
  };
  /**
   * Holds an instance of FSWatcher. Chokidar is leveraged in for watching,
   * and this value exposes the instance and it can be used anywhere in the
   * module. In addition, the main Chokidar is extended to support `.has()`
   *
   *  @default null // defaults to null unless watch mode is invoked
   */
  watch = /* @__PURE__ */ new Set();
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
  paths = {
    transforms: /* @__PURE__ */ new Map()
  };
  /**
   * Page transforms
   *
   * @default []
   */
  page = {
    export: {
      quotes: "\u201C\u201D\u2018\u2019",
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: "language-"
    },
    import: {
      codeBlockStyle: "fenced",
      emDelimiter: "_",
      fence: "```",
      headingStyle: "atx",
      hr: "***",
      linkReferenceStyle: "full",
      linkStyle: "inlined",
      strongDelimiter: "**",
      bulletListMarker: "-"
    }
  };
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
  terse = {
    /**
     * Terse JSON Minification
     *
     * @default false
     */
    json: false,
    /**
      * View minification
      */
    views: false,
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
  };
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
    Bundle.terser = mergeRight(Bundle.terser, options);
  }
  /**
   * Processor Configurations
   */
  get processor() {
    return processor;
  }
  /**
   * Merge users configuration with default
   */
  set config(data) {
    Bundle.defaults = mergeRight(Bundle.defaults, data);
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
    Bundle.package = mergeRight(Bundle.package, data);
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
    return plugins;
  }
}();

// node_modules/.pnpm/p-queue@7.3.4/node_modules/p-queue/dist/index.js
var import_eventemitter3 = __toESM(require_eventemitter3(), 1);

// node_modules/.pnpm/p-timeout@5.1.0/node_modules/p-timeout/index.js
var TimeoutError = class extends Error {
  constructor(message2) {
    super(message2);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  constructor(message2) {
    super();
    this.name = "AbortError";
    this.message = message2;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal2) => {
  const reason = signal2.reason === void 0 ? getDOMException("This operation was aborted.") : signal2.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, milliseconds, fallback, options) {
  let timer;
  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise);
      return;
    }
    options = {
      customTimers: { setTimeout, clearTimeout },
      ...options
    };
    if (options.signal) {
      const { signal: signal2 } = options;
      if (signal2.aborted) {
        reject(getAbortedReason(signal2));
      }
      signal2.addEventListener("abort", () => {
        reject(getAbortedReason(signal2));
      });
    }
    timer = options.customTimers.setTimeout.call(void 0, () => {
      if (typeof fallback === "function") {
        try {
          resolve(fallback());
        } catch (error4) {
          reject(error4);
        }
        return;
      }
      const message2 = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message2);
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error4) {
        reject(error4);
      } finally {
        options.customTimers.clearTimeout.call(void 0, timer);
      }
    })();
  });
  cancelablePromise.clear = () => {
    clearTimeout(timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/.pnpm/p-queue@7.3.4/node_modules/p-queue/dist/lower-bound.js
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

// node_modules/.pnpm/p-queue@7.3.4/node_modules/p-queue/dist/priority-queue.js
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

// node_modules/.pnpm/p-queue@7.3.4/node_modules/p-queue/dist/index.js
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
var AbortError2 = class extends Error {
};
var PQueue = class extends import_eventemitter3.default {
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
      queueClass: PriorityQueue,
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
    return new Promise((resolve, reject) => {
      __classPrivateFieldGet2(this, _PQueue_queue, "f").enqueue(async () => {
        var _a;
        var _b, _c;
        __classPrivateFieldSet(this, _PQueue_pending, (_b = __classPrivateFieldGet2(this, _PQueue_pending, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet2(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
        try {
          if ((_a = options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
            throw new AbortError2("The task was aborted.");
          }
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), options.timeout);
          }
          if (options.signal) {
            operation = Promise.race([operation, __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_throwOnAbort).call(this, options.signal)]);
          }
          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error4) {
          if (error4 instanceof TimeoutError && !options.throwOnTimeout) {
            resolve();
            return;
          }
          reject(error4);
          this.emit("error", error4);
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
  const now2 = Date.now();
  if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f") === void 0) {
    const delay = __classPrivateFieldGet2(this, _PQueue_intervalEnd, "f") - now2;
    if (delay < 0) {
      __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pending, "f") : 0, "f");
    } else {
      if (__classPrivateFieldGet2(this, _PQueue_timeoutId, "f") === void 0) {
        __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
          __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
        }, delay), "f");
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
}, _PQueue_throwOnAbort = async function _PQueue_throwOnAbort2(signal2) {
  return new Promise((_resolve, reject) => {
    signal2.addEventListener("abort", () => {
      reject(new AbortError2("The task was aborted."));
    }, { once: true });
  });
}, _PQueue_onEvent = async function _PQueue_onEvent2(event2, filter) {
  return new Promise((resolve) => {
    const listener = () => {
      if (filter && !filter()) {
        return;
      }
      this.off(event2, listener);
      resolve();
    };
    this.on(event2, listener);
  });
};
var axios = connect__default.default.create({
  responseType: "json",
  headers: {}
});
var queue = new PQueue({
  concurrency: 5,
  interval: 250,
  intervalCap: 2
});
function requeue(status) {
  if (status === 429 || status === 500)
    return true;
  if (!queue.isPaused)
    queue.pause();
  return false;
}

// node_modules/.pnpm/strip-json-comments@5.0.0/node_modules/strip-json-comments/index.js
var singleComment = Symbol("singleComment");
var multiComment = Symbol("multiComment");
var stripWithoutWhitespace = () => "";
var stripWithWhitespace = (string, start3, end) => string.slice(start3, end).replace(/\S/g, " ");
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
  const strip = whitespace ? stripWithWhitespace : stripWithoutWhitespace;
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
      buffer += strip(jsonString, offset, index);
      offset = index;
      continue;
    } else if (isInsideComment === singleComment && currentCharacter === "\n") {
      isInsideComment = false;
      buffer += strip(jsonString, offset, index);
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
      buffer += strip(jsonString, offset, index + 1);
      offset = index + 1;
      continue;
    } else if (trailingCommas && !isInsideComment) {
      if (commaIndex !== -1) {
        if (currentCharacter === "}" || currentCharacter === "]") {
          buffer += jsonString.slice(offset, index);
          result += strip(buffer, 0, 1) + buffer.slice(1);
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
  return result + buffer + (isInsideComment ? strip(jsonString.slice(offset)) : jsonString.slice(offset));
}

// lib/const.ts
var HOT_SNIPPET_FILE = "hot.js.liquid";
var HOT_SNIPPET_NAME = "hot.js";
var SPINNER_FRAMES = [
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
];
var CACHE_DIRS = [
  "style",
  "script",
  "svg",
  "metafields",
  "pages",
  "sections",
  "redirects",
  "vscode"
];
var BASE_DIRS = [
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
  "snippets",
  "templates",
  "metafields",
  "pages",
  "redirects"
];
var THEME_DIRS = [
  "templates",
  "templates/customers",
  "assets",
  "config",
  "layout",
  "locales",
  "sections",
  "snippets"
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
var DIRNAME_VAR_NAME = "__injected_dirname__";
var FILENAME_VAR_NAME = "__injected_filename__";
var IMPORT_META_URL_VAR_NAME = "__injected_import_meta_url__";
var REGEX_OR_CHARS = /([|,])/g;
var REGEX_EXTJS = /\.(mjs|cjs|ts|js|tsx|jsx)$/;
var REGEX_LINE_NO = /(\()(line\s[0-9]+)(\))(:)/g;
var REGEX_QUOTES = /('[\w\s.-]*?'|"[\w\s.-]*?")/g;
var REGEX_OBJECT = /({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g;
var REGEX_ADDRESS = /((?:www|http:|https:)+[^\s]+[\w])/g;
var REGEX_STRING = /(\/)(.*?)(\/)/g;
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

// lib/utils/utils.ts
var event = new events.EventEmitter();
function jsonc(data) {
  try {
    return JSON.parse(stripJsonComments(data).trim());
  } catch (e2) {
    throw new Error(e2);
  }
}
function hasRenamespace(rename) {
  return /\[(?:file|dir|ext)\]/.test(rename);
}
function plural(word, length, zeroS = false) {
  return length > 1 ? `${word}s` : word;
}
function sanitize(message2) {
  if (isBuffer(message2))
    return message2.toString();
  if (isObject(message2) || isArray2(message2))
    return JSON.stringify(message2);
  return String(message2);
}
async function dynamicImport(id, { format }) {
  if (format === "esm") {
    return (file2) => import(file2);
  } else {
    return getImport(id);
  }
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
  return byteConvert(byteSize(value));
}
function byteSize(string) {
  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;
}
function byteConvert(bytes) {
  if (bytes === 0)
    return "0b";
  const size2 = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return size2 === 0 ? `${bold(String(bytes))}${UNITS[size2]}` : `${bold((bytes / 1024 ** size2).toFixed(1))}${UNITS[size2]}`;
}
function fileSize(content, beforeSize) {
  const size2 = byteSize(content);
  const gzip = byteConvert(zlib__default.default.gzipSync(content).length);
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
  const now2 = /* @__PURE__ */ new Date();
  const hur = now2.getHours();
  const min = now2.getMinutes();
  const sec = now2.getSeconds();
  const col = gray(":");
  return (hur < 10 ? `0${hur}` : hur) + col + (min < 10 ? `0${min}` : min) + col + (sec < 10 ? `0${sec}` : sec);
}
function addSuffix(i) {
  const a = i % 10;
  const b = i % 100;
  return i + (a === 1 && b !== 11 ? "st" : a === 2 && b !== 12 ? "nd" : a === 3 && b !== 13 ? "rd" : "th");
}
function getImport(id) {
  if (isFunction(globalThis.require)) {
    return globalThis.require(id);
  }
  return module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (document.currentScript && document.currentScript.src || new URL('out.js', document.baseURI).href)))(id);
}
function uuid() {
  return Math.random().toString(36).slice(2);
}
function pNext() {
  return new Promise((resolve) => {
    if (typeof setImmediate === "function") {
      setImmediate(resolve);
    } else {
      setTimeout(resolve);
    }
  });
}
var native = /* @__PURE__ */ new Map();
var methods = [
  "assert",
  "count",
  "countReset",
  "debug",
  "dir",
  "dirxml",
  "error",
  "group",
  "groupCollapsed",
  "groupEnd",
  "info",
  "log",
  "table",
  "time",
  "timeEnd",
  "timeLog",
  "trace",
  "warn"
];
function intercept(callback) {
  const stdout = new stream.PassThrough();
  const stderr = new stream.PassThrough();
  stdout.write = (data) => callback("stdout", data);
  stderr.write = (data) => callback("stderr", data);
  const internal = new console$1.Console(stdout, stderr);
  for (const method of methods) {
    native.set(method, console[method]);
    console[method] = internal[method];
  }
  return () => {
    for (const method of methods) {
      console[method] = native.get(method);
    }
    native.clear();
  };
}
var marks = [];
var time = {};
var now = (id) => stop(id || true);
var start = (id) => {
  if (id) {
    time[id] = perf_hooks.performance.now();
  } else {
    marks.push(perf_hooks.performance.now());
  }
};
function stop(now2 = false, end = false) {
  let gt;
  if (typeof now2 === "boolean") {
    gt = now2 ? marks[marks.length - 1] : marks.pop();
  } else if (now2) {
    if (end) {
      gt = time[now2];
      delete time[now2];
    } else {
      gt = time[now2];
    }
  }
  const ms = perf_hooks.performance.now() - gt;
  if (ms < 1e3)
    return `${ms.toFixed(0)}ms`;
  const s = ms / 1e3;
  if (s < 60)
    return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1, 4)}ms`;
  const m = (s / 60).toFixed(0);
  return `${m}m ${(s - 60 * Number(m)).toFixed(0)}s ${+ms.toFixed(0).slice(1, 4)}ms`;
}

// lib/log/errors.ts
var errors_exports = {};
__export(errors_exports, {
  errors: () => errors,
  esbuild: () => esbuild,
  postcss: () => postcss,
  request: () => request,
  sass: () => sass,
  spawn: () => spawn,
  write: () => write
});

// node_modules/.pnpm/escape-string-regexp@5.0.0/node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var getHomeDirectory = () => os__default.default.homedir().replace(/\\/g, "/");
var home_directory_default = getHomeDirectory;

// node_modules/.pnpm/clean-stack@5.2.0/node_modules/clean-stack/index.js
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function cleanStack(stack2, { pretty = false, basePath: basePath2, pathFilter } = {}) {
  const basePathRegex = basePath2 && new RegExp(`(file://)?${escapeStringRegexp(basePath2.replace(/\\/g, "/"))}/?`, "g");
  const homeDirectory = pretty ? home_directory_default() : "";
  if (typeof stack2 !== "string") {
    return void 0;
  }
  return stack2.replace(/\\/g, "/").split("\n").filter((line2) => {
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

// node_modules/.pnpm/ansi-regex@6.0.1/node_modules/ansi-regex/index.js
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
var wrapAnsiHyperlink = (uri2) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri2}${ANSI_ESCAPE_BELL}`;
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
var exec = (string, columns, options = {}) => {
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
  return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line2) => exec(line2, columns, options)).join("\n");
}

// lib/log/tui.ts
var tui_exports = {};
__export(tui_exports, {
  clear: () => clear2,
  closer: () => closer,
  context: () => context,
  hline: () => hline,
  indent: () => indent,
  message: () => message,
  multiline: () => multiline,
  opener: () => opener,
  sample: () => sample,
  shopify: () => shopify,
  stack: () => stack,
  suffix: () => suffix,
  tree: () => tree
});

// lib/cli/ansi.ts
var ansi_exports = {};
__export(ansi_exports, {
  ARL: () => ARL,
  ARR: () => ARR,
  BAD: () => BAD,
  CHK: () => CHK,
  CHV: () => CHV,
  COL: () => COL,
  DSH: () => DSH,
  LCB: () => LCB,
  LPR: () => LPR,
  RCB: () => RCB,
  RPR: () => RPR,
  TLD: () => TLD,
  blue: () => blue,
  blueBright: () => blueBright,
  bold: () => bold,
  bottom: () => bottom,
  clear: () => clear,
  close: () => close,
  cyan: () => cyan,
  cyanBright: () => cyanBright,
  dash: () => dash,
  dim: () => dim,
  error: () => error2,
  gray: () => gray,
  green: () => green,
  greenBright: () => greenBright,
  hr: () => hr,
  italic: () => italic,
  lavender: () => lavender,
  lightGray: () => lightGray,
  line: () => line,
  magenta: () => magenta,
  magentaBright: () => magentaBright,
  neonCyan: () => neonCyan,
  neonGreen: () => neonGreen,
  neonMagenta: () => neonMagenta,
  neonRouge: () => neonRouge,
  newline: () => newline,
  open: () => open,
  orange: () => orange,
  pink: () => pink,
  purge: () => purge,
  red: () => red,
  redBright: () => redBright,
  reset: () => reset,
  strike: () => strike,
  time: () => time2,
  top: () => top,
  underline: () => underline,
  warning: () => warning2,
  white: () => white,
  whiteBright: () => whiteBright,
  yellow: () => yellow,
  yellowBright: () => yellowBright
});
var import_ansis = __toESM(require_ansis());
function exec2(command, args, shell) {
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
  const __dirname = path$1.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (document.currentScript && document.currentScript.src || new URL('out.js', document.baseURI).href))));
  return exec2(path$1.join(__dirname, command), [], shell).split(/\r?\n/);
}
function create(columns, rows) {
  return {
    cols: Number.parseInt(columns, 10),
    rows: Number.parseInt(rows, 10)
  };
}
function size() {
  const { env: env2, stdout, stderr } = process2__default.default;
  if (stdout && stdout.columns && stdout.rows)
    return create(stdout.columns, stdout.rows);
  if (stderr && stderr.columns && stderr.rows)
    return create(stderr.columns, stderr.rows);
  if (env2.COLUMNS && env2.LINES)
    return create(env2.COLUMNS, env2.LINES);
  if (process2__default.default.platform === "win32") {
    try {
      const size2 = execNative("vendor/windows/term-size.exe", false);
      if (size2.length === 2)
        return create(size2[0], size2[1]);
    } catch {
    }
  } else {
    if (process2__default.default.platform === "darwin") {
      try {
        const size2 = execNative("vendor/macos/term-size", true);
        if (size2.length === 2)
          return create(size2[0], size2[1]);
      } catch {
      }
    }
    try {
      const size2 = exec2("resize", ["-u"]).match(/\d+/g);
      if (size2.length === 2)
        return create(size2[0], size2[1]);
    } catch {
    }
    if (process2__default.default.env.TERM) {
      try {
        const columns = exec2("tput", ["cols"]);
        const rows = exec2("tput", ["lines"]);
        if (columns && rows)
          return create(columns, rows);
      } catch {
      }
    }
  }
  return create(80, 24);
}

// lib/cli/ansi.ts
var clear = "\x1B[H\x1B[2J";
var purge = "\x1B[2J\x1B[3J\x1B[H\x1Bc";
var {
  cyan,
  cyanBright,
  red,
  redBright,
  green,
  greenBright,
  yellow,
  yellowBright,
  magenta,
  magentaBright,
  blue,
  blueBright,
  white,
  whiteBright,
  gray,
  underline,
  bold,
  reset,
  italic,
  strike,
  dim
} = import_ansis.default;
var lightGray = import_ansis.default.hex("#2a2a2e");
var pink = import_ansis.default.hex("#ff75d1");
var orange = import_ansis.default.hex("#FFAB40");
var lavender = import_ansis.default.hex("#8080FF");
var neonGreen = import_ansis.default.hex("#56ef83");
var neonCyan = import_ansis.default.hex("#69d5fd");
var neonRouge = import_ansis.default.hex("#FF8095");
var neonMagenta = import_ansis.default.hex("#B319FF");
var open = lightGray("\u250C\u2500 ");
var line = {
  /**
   * Light Gray (default) line
   */
  gray: lightGray("\u2502  "),
  /**
   * Red dim - used in errors
   */
  red: red.dim("\u2502  "),
  /**
   * Yellow dim - used in warnings
   */
  yellow: yellow.dim("\u2502  ")
};
var newline = lightGray(`${nl}\u2502${nl}`);
var dash = lightGray("\u2502  \u251C\u2500 ");
var top = lightGray("\u251C\u2500 ");
var bottom = lightGray("\u2502  \u2514\u2500 ");
var close = lightGray("\u2514\u2500 ");
var hr = (minus) => lightGray(`\u2502${nl}\u251C${"\u2500".repeat(size().cols - minus)}${nl}\u2502`);
var CHK = neonGreen("\u2713 ");
var BAD = redBright("\u{10102}");
var COL = gray(":");
var ARR = gray("\u2192");
var CHV = gray("\u2023");
var ARL = gray("\u2942");
var TLD = gray("~");
var DSH = gray("\u2014");
var LPR = gray("(");
var RPR = gray(")");
var LCB = gray("{");
var RCB = gray("}");
var warning2 = yellowBright(` ~ Type ${bold("w")} and press ${bold("enter")} to view`);
var error2 = redBright(` ~ Type ${bold("v")} and press ${bold("enter")} to view`);
var time2 = (now2) => now2 ? reset.gray(` ~ ${now2}`) : nil;

// lib/log/tui.ts
var stack = nil;
function clear2() {
  const count = process.stdout.rows - 2;
  const blank = count > 0 ? nlr(count) : nil;
  log(blank);
  readline__default.default.cursorTo(process.stdout, 0, 0);
  readline__default.default.clearScreenDown(process.stdout);
}
function hline(minus = 15) {
  log(hr(minus));
}
function suffix(color, prefix, message2) {
  const line2 = bundle.mode.build ? dash : prefix === "invalid" || prefix === "failed" ? line.red : prefix === "warning" ? line.yellow : line.gray;
  return line2 + ansi_exports[color](prefix) + wsr(10 - prefix.length) + ARR + ws + ansi_exports[color](message2);
}
function opener(name) {
  return nl + open + gray(`${name} ~ ${getTime()}`);
}
function tree(direction, name) {
  return direction === "top" ? top + name : bottom + name;
}
function closer(name) {
  return line.gray + nl + close + gray(`${name} ~ ${getTime()}`);
}
function message(color, message2) {
  return line.gray + ansi_exports[color](message2);
}
function shopify(message2) {
  if (isArray2(message2))
    return glue(message2.map(shopify));
  let output = message2;
  output = output.replace(REGEX_LINE_NO, gray("$1") + white("$2") + gray("$3") + white("$4") + nlr(2));
  output = output.replace(REGEX_QUOTES, yellowBright.bold("$1"));
  output = output.replace(REGEX_OBJECT, cyan("$1") + whiteBright("$2") + cyan("$3"));
  output = output.replace(REGEX_ADDRESS, underline("$1"));
  output = output.replace(REGEX_STRING, magenta("$1") + cyan("$2") + magenta("$3"));
  return indent(red(wrapAnsi(output, size().columns - 15)), { line: line.red });
}
function sample(code, data = {}) {
  const line2 = has("line", data) ? data.line : line.gray;
  if (hasPath("span.start", data)) {
    const end = has("end", data.span) ? data.span.end : data.span.start + 1;
    return line2 + nl + glue([
      `${line2}${blue(`${data.span.start - 1}`)}${COL + nl}${line2}${blue(`${data.span.start}`)}${COL} ${code + nl}${line2}${blue(`${end}`)}${COL + nl}`
    ]);
  }
  return line2 + nl + line2 + code;
}
function indent(message2, ansi = {}) {
  const lines = isArray2(message2) ? message2 : message2.split(nl).filter(Boolean);
  const line2 = has("line", ansi) ? ansi.line : line.gray;
  let output = has("nwl", ansi) ? `${line2 + nl}` : nil;
  while (lines.length !== 0) {
    const text = lines.shift();
    if (text.trim().length > 0) {
      if (!text.trim().startsWith(line2)) {
        output += line2 + (has("text", ansi) ? ansi.text(text.trimStart()) : text.trimStart()) + nl;
      } else {
        output += (has("text", ansi) ? ansi.text(text) : text) + nl;
      }
    } else {
      output += line2 + nl;
    }
  }
  return output;
}
function context(data) {
  let space = 0;
  let output = line.red + nl;
  for (const k in data.entries)
    if (space < k.length && data.entries[k])
      space = k.length;
  for (const k in data.entries) {
    if (data.entries[k]) {
      output += glue([
        line.red,
        red(k),
        COL + ws,
        wsr(space - k.length),
        gray(`${data.entries[k]}`) + nl
      ]);
    }
  }
  if (data.stack) {
    stack = data.stack;
    output += glue([
      line.red,
      red("stack"),
      COL + ws,
      wsr(space - 5),
      gray(`Type ${bold("s")} and press ${bold("enter")} to view stack trace`),
      nl + line.gray
    ]);
  }
  return output.trimEnd();
}
function multiline(type2, message2) {
  let line2 = line.gray;
  let color = white;
  if (type2 === "error") {
    line2 = line.red;
    color = red;
  } else if (type2 === "warning") {
    line2 = line.yellow;
    color = yellowBright;
  }
  const stdout = [];
  const input = message2.trim();
  const lines = wrapAnsi(input, size().columns - 15).split(nl);
  while (lines.length !== 0) {
    const text = lines.shift();
    if (text.trim().length > 0)
      stdout.push(line2 + color(text));
  }
  return line2 + nl + stdout.join(nl);
}

// lib/log/errors.ts
var errors = {};
function spawn(data) {
  const stdout = [];
  const stderr = [line.red];
  const stackerr = data.search(/(?:\n {4}at .*)/);
  const limit2 = process.stdout.columns - 5;
  let message2 = [];
  if (/\berror\b:?/i.test(data) && stackerr > 0) {
    message2 = data.slice(0, stackerr).split(nl);
    const stack2 = cleanStack(data.slice(stackerr), { pretty: true, basePath: bundle.cwd });
    const lines = wrapAnsi(stack2, limit2).split(nl);
    stderr.push(nl);
    while (lines.length !== 0) {
      const line2 = lines.shift();
      if (line2.trim().length > 0)
        stderr.push(reset(line.red + line2));
    }
  }
  if (message2.length === 0)
    message2 = data.split(nl);
  while (message2.length !== 0) {
    const line2 = message2.shift();
    if (line2.trim().length > 0)
      stdout.push(reset(line.gray) + line2);
  }
  error(`${stdout.join(nl)}${stderr.length > 1 ? stderr.join(nl) : nil}`);
}
function request(file2, e2, logError = true) {
  const message2 = hasPath("error.asset", e2.data) ? e2.data.error.asset : hasPath("errors.asset", e2.data) ? e2.data.errors.asset : null;
  if (e2.status === 422) {
    const output = glue([
      line.red,
      nl,
      shopify(message2),
      context({
        stack: false,
        entries: {
          details: "File did not sync because Shopify rejected the request",
          status: e2.status,
          message: e2.statusText,
          source: `${file2}`
        }
      })
    ]);
    return logError ? error(output) : output;
  } else if (e2.status in SHOPIFY_REQUEST_ERRORS) {
    const output = glue([
      line.red,
      nl,
      multiline("error", SHOPIFY_REQUEST_ERRORS[e2.status]) + context({
        stack: false,
        entries: {
          status: e2.status,
          message: e2.statusText,
          source: `${file2}`
        }
      })
    ]);
    return logError ? error(output) : output;
  } else {
    const output = glue([
      line.red,
      nl,
      red("Unknown error has occured") + context({
        stack: false,
        entries: {
          status: e2.status,
          message: e2.statusText,
          source: `${file2}`
        }
      })
    ]);
    return logError ? error(output) : output;
  }
}
var write = (message2, context2) => (e2) => {
  error(
    indent(e2.message, {
      nwl: true,
      line: line.red,
      text: red.bold
    }) + context({
      stack: e2.stack,
      entries: {
        ...context2,
        code: e2.code,
        name: e2.name,
        details: message2
      }
    })
  );
};
function sass(file2, e2) {
  error(
    indent(e2.message, {
      nwl: true,
      line: line.red,
      text: red
    }) + context({
      stack: e2.sassStack,
      entries: {
        input: file2.relative,
        message: e2.sassMessage
      }
    })
  );
}
function esbuild(e2) {
  error(
    indent(e2.text, {
      nwl: true,
      line: line.red,
      text: red
    }) + sample(e2.location.lineText, {
      line: line.red,
      span: {
        start: e2.location.line,
        end: e2.location.line + 1
      }
    }) + context({
      stack: false,
      entries: {
        file: e2.location.file,
        line: e2.location.line,
        column: e2.location.column,
        plugin: e2.pluginName
      }
    })
  );
}
function postcss(e2) {
}

// node_modules/.pnpm/ansi-escapes@5.0.0/node_modules/ansi-escapes/index.js
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
  let clear3 = "";
  for (let i = 0; i < count; i++) {
    clear3 += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
  }
  if (count) {
    clear3 += ansiEscapes.cursorLeft;
  }
  return clear3;
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
  annotation: (message2, options = {}) => {
    let returnValue = `${OSC}1337;`;
    const hasX = typeof options.x !== "undefined";
    const hasY = typeof options.y !== "undefined";
    if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== "undefined")) {
      throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
    }
    message2 = message2.replace(/\|/g, "");
    returnValue += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
    if (options.length > 0) {
      returnValue += (hasX ? [message2, options.length, options.x, options.y] : [options.length, message2]).join("|");
    } else {
      returnValue += message2;
    }
    return returnValue + BEL;
  }
};
var ansi_escapes_default = ansiEscapes;

// node_modules/.pnpm/restore-cursor@4.0.0/node_modules/restore-cursor/index.js
var import_onetime = __toESM(require_onetime(), 1);
var import_signal_exit = __toESM(require_signal_exit(), 1);
var restoreCursor = (0, import_onetime.default)(() => {
  (0, import_signal_exit.default)(() => {
    process2__default.default.stderr.write("\x1B[?25h");
  }, { alwaysLast: true });
});
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process2__default.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process2__default.default.stderr) => {
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

// node_modules/.pnpm/is-fullwidth-code-point@4.0.0/node_modules/is-fullwidth-code-point/index.js
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
var logUpdate = createLogUpdate(process2__default.default.stdout);
var log_update_default = logUpdate;
createLogUpdate(process2__default.default.stderr);
var warnings = {};
function warnOption(group2) {
  if (!has(group2, warnings))
    warnings[group2] = [];
  return (message2, value) => {
    if (isUndefined(value)) {
      warnings[group2].push(line.yellow + yellowBright(message2));
    } else {
      warnings[group2].push(line.yellow + yellowBright(message2 + COL + ws + bold(value)));
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
    nlr(2),
    red(`${bold(`Invalid ${cyan(option)} type value provided`)}`) + nlr(2),
    red(`The ${cyan(name)} option has an incorrect type value`) + nlr(2),
    red(`provided${COL} ${yellowBright(type(provided).toLowerCase())}`) + nl,
    red(`expected${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`) + nlr(2),
    red(`in${COL} ${gray.underline(bundle.file.base)}`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
    ${gray("You need to change the option value to use the")} ${blue("expected")} ${gray("type.")}
    ${gray(`Use the ${cyan("defineConfig")} named export for type checking`)}
    `
  );
  process.exit(0);
}
function invalidCommand({
  message: message2,
  expected,
  fix
}) {
  const provided = process2.argv.slice(2).join(" ");
  expected = white("syncify " + provided + " ") + blue(expected.replace(/([|,])/g, gray("$1")));
  error(
    nlr(2),
    red(`${bold("Invalid or incomplete command passed")}`) + nlr(2),
    red(isArray2(message2) ? message2.join("\n ") : message2) + nlr(2),
    red(`provided${COL} ${white("$")} ${white("syncify " + provided)}`) + nl,
    red(`expected${COL} ${white("$")} ${expected}`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
   ${gray(isArray2(fix) ? fix.join("\n   ") : fix)}
   `
  );
  process.exit(0);
}
function invalidTarget({
  type: type2,
  message: message2,
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
  if (isArray2(message2)) {
    message2 = message2.join("\n ");
  }
  error(
    nlr(2),
    red(bold(`Invalid ${cyan(type2)} target provided`)) + nlr(2),
    red(message2) + nlr(2),
    red(`provided${COL} ${yellowBright(expected)}`) + nl,
    red(`expected${COL} ${blue(provided)}`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
   ${gray(isArray2(fix) ? fix.join("\n   ") : fix)}
   `
  );
  process.exit(0);
}
function missingDependency(deps) {
  if (isString(deps)) {
    error(
      nlr(2),
      red(`${bold(`Missing ${cyan(deps)} dependency`)}`) + nlr(2),
      red(`You need to install ${cyan(deps)} to use it as a processor`) + nlr(2),
      white.bold("How to fix?") + nl,
      `
      $ ${blue.bold("pnpm add " + deps + " -D")}

      ${gray("If you are using a different package manager (i.e: Yarn or NPM) then")}
      ${gray("please consider adopting pnpm. Pnpm is dope and does dope shit.")}
      `
    );
  } else {
    error(
      nlr(2),
      red(`${bold(`Missing ${cyan(`${deps.length}`)} dependencies`)}`) + nlr(2),
      red("You are attempting to use processors which are not yet installed!") + nlr(2),
      whiteBright(gray("-") + ws + deps.join(nl + gray(" -") + ws)) + nlr(2),
      white.bold("How to fix?") + nl,
      `
     $ ${blueBright("pnpm add " + deps.join(ws) + " -D")}

     ${gray("If you are using a different package manager (i.e: Yarn or NPM) then")}
     ${gray("please consider adopting pnpm. Pnpm is dope and does dope shit.")}
     `
    );
  }
  process.exit(0);
}
function missingOption(option, name, expects, why) {
  if (option.indexOf(".") > -1)
    option = option.split(".").filter(Boolean).join(gray(" \u2192 "));
  error(
    nlr(2),
    red(`${bold(`Missing ${LCB} ${cyan(option)} ${RCB} configuration option`)}`) + nlr(2),
    red(`The ${cyan(name)} option needs to be defined`) + nlr(2),
    red(`expects${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`) + nlr(2),
    red(`at${COL} ${gray.underline(bundle.file.base)}`) + nlr(2),
    white.bold("Why?") + nl + nl + gray(isArray2(why) ? ` ${why.join("\n ")}` : ` ${why}`) + nl + nl
  );
  process.exit(0);
}
function invalidError(option, name, value, expects) {
  error(
    nlr(2),
    redBright.bold("ERROR (!)"),
    nlr(2),
    red(`${bold(`Invalid ${cyan(option)} configuration`)}`) + nlr(2),
    red(`The ${cyan(name)} option has an invalid or missing value`) + nlr(2),
    red(`provided${COL} ${yellowBright(value)}`) + nl,
    red(`expected${COL} ${blue(expects.replace(/([|,])/g, gray("$1")))}`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
    ${gray("You need to update the option and use one of the expected values.")}
    ${gray(`Use the ${cyan("defineConfig")} named export for type checking`)}
    `
  );
  process.exit(0);
}
function missingConfig(cwd) {
  error(
    nlr(2),
    redBright.bold("ERROR (!)"),
    nlr(2),
    red(`${bold(`Missing ${cyan("syncify.config.js")} configuration`)}`) + nlr(2),
    red("Unable to resolve a configuration file within the workspace") + nlr(2),
    red(`at${COL} ${gray.underline(cwd)}`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
    ${gray("You need to add one the following files to your project")}

    ${gray("-")} ${white("syncify.config.ts")}
    ${gray("-")} ${white("syncify.config.js")}
    ${gray("-")} ${white("syncify.config.mjs")}
    ${gray("-")} ${white("syncify.config.cjs")}
    ${gray("-")} ${white("syncify.config.json")}

    ${gray("You can also provide configuration in your")} ${white("package.json")}
    ${gray("file using on a")} ${yellowBright('"syncify": {}')} ${gray("property.")}
    `
  );
  process.exit(0);
}
function throwError(message2, solution) {
  error(
    nlr(2),
    redBright.bold("(!) ERROR"),
    nlr(2),
    red.bold(message2) + nlr(2),
    white.bold("How to fix?") + nl,
    gray(isArray2(solution) ? solution.join(nl).trimStart() : solution),
    nlr(2)
  );
  process.exit(0);
}
function unknownError(option, value) {
  if (option.indexOf(".") > -1) {
    option = gray.bold("{ ") + option.split(".").filter(Boolean).join(gray(" \u2192 ")) + gray(" \u2192 ") + redBright.bold(value) + gray.bold(" }");
  }
  const cfile = bundle.file.base === "package.json" ? `${blue("syncify")} config in the ${blue("package.json")} file.` : `${blue(bundle.file.base)} file.`;
  error(
    nlr(2),
    redBright.bold("ERROR (!)"),
    nlr(2),
    redBright(`Unknown ${option} option provided.`) + nlr(2),
    white.bold("How to fix?") + nl,
    `
    ${gray(`The ${blue(value)} option is invalid or unsupported.`)}
    ${gray(`You need to remove it from the ${cfile}`)}
    `
  );
  process.exit(0);
}

// lib/log/start.ts
function start2(bundle2) {
  const text = [];
  if (bundle2.mode.metafields)
    return nil;
  text.push(
    `${open}${gray("Syncify")} ${gray("~")} ${gray(getTime())}`,
    `${line.gray}`
  );
  getTerminalWarning(text);
  text.push(
    `${line.gray}${whiteBright.bold(`v${bundle2.version}`)}`,
    `${line.gray}`
  );
  const _st = bundle2.sync.stores.length;
  const _th = keys(bundle2.sync.themes).length;
  const _ss = keys(bundle2.spawn.commands).length;
  const { mode, spawn: spawn4 } = bundle2;
  const stores = cyan.bold(String(_st)) + (_st > 1 ? " stores" : " store");
  const themes = cyan.bold(String(_th)) + (_th > 1 ? " themes" : " theme");
  const env2 = cyan.bold(`${bundle2.env.dev ? "development" : "production"}`);
  if (mode.build) {
    text.push(`${line.gray}Running ${cyan.bold("build")} in ${env2}`);
  } else if (mode.watch) {
    text.push(`${line.gray}Running ${cyan.bold("watch")} in ${env2}`);
  } else if (mode.upload) {
    text.push(`${line.gray}Running ${cyan.bold("upload")} mode`);
  } else if (mode.download) {
    text.push(`${line.gray}Running ${cyan.bold("download")} mode`);
  } else if (mode.vsc) {
    text.push(`${line.gray}Generate ${cyan.bold("vscode")} schema`);
  } else if (mode.clean) {
    text.push(`${line.gray}Running ${cyan.bold("clean")} mode`);
  } else if (mode.export) {
    text.push(`${line.gray}Running ${cyan.bold("export")} mode`);
  }
  text.push(`${line.gray}${_st > 0 && _th > 0 ? `Syncing ${themes} to ${stores}` : nil}`);
  if (!isEmpty(bundle2.filters)) {
    text.push(
      `${line.gray}${whiteBright.bold("Filters")}`,
      `${line.gray}` + getFilters(bundle2.filters)
    );
  }
  if (bundle2.logger.warnings)
    getRuntimeWarnings(bundle2, text);
  if (anyTrue(mode.build, mode.watch) && _ss > 0) {
    text.push(
      `${line.gray}Spawned ${cyan.bold(`${_ss}`)} child ${_ss > 1 ? "processes" : "process"}`,
      `${line.gray}`
    );
  } else {
    text.push(line.gray);
  }
  if (allFalse(mode.upload, mode.download, mode.build, mode.clean, mode.vsc)) {
    if (_ss > 0) {
      text.push(
        `${line.gray}${bold("Child Processes:")}`,
        `${line.gray}${getSpawnProcessors(toArray(spawn4.streams))}`,
        `${line.gray}`
      );
    }
    if (_th > 0) {
      text.push(
        `${line.gray}${bold("Theme Editors:")}`,
        `${line.gray}${getThemeURLS(bundle2.sync.themes, "editor")}`,
        `${line.gray}`
      );
    }
  }
  if (anyTrue(mode.upload, mode.download, mode.watch)) {
    if (_th > 0) {
      text.push(
        `${line.gray}${bold(mode.upload || mode.download ? "Theme Targets:" : "Theme Previews:")}`,
        `${line.gray}${getThemeURLS(bundle2.sync.themes, "preview")}`
      );
    }
  }
  if (bundle2.mode.hot)
    text.push(`${line.gray}`);
  log(text.join(nl));
}
function getFilters(filters) {
  return values(filters).flat().reduce((string, path2) => {
    string += nl + line.gray + DSH + ws + whiteBright(path2);
    return string;
  }, nil);
}
function getTerminalWarning(text) {
  const cs = size().cols;
  if (cs >= 100)
    return;
  text.push(
    `${line.gray}${red.bold("TERMINAL WIDTH WARNING")}`,
    `${line.gray}`,
    `${line.gray}${red(`Your terminal width is below ${bold(`${100}`)} columns (currently ${bold(`${cs}`)})`)}`,
    `${line.gray}${red("This is not recommended for usage with Syncify (size matters).")}`,
    `${line.gray}${red("Expand your terminal wider for an optimal logging experience.")}`,
    `${line.gray}`
  );
}
function getRuntimeWarnings(bundle2, text) {
  let title2 = false;
  for (const prop in warnings) {
    const warn2 = warnings[prop];
    if (warn2.length > 0) {
      if (title2 === false) {
        title2 = true;
        text.push(
          `${line.gray}`,
          `${line.yellow}${yellowBright(`${bold("Warnings")} in ${bold(bundle2.file.base)}`)}`
        );
      }
      text.push(
        line.yellow,
        line.yellow + yellow.bold(`${warn2.length} ${prop} ${plural("warning", warn2.length)}`),
        line.yellow,
        warn2.join(nl)
      );
    }
  }
}
function getSpawnProcessors(spwns) {
  const width = spwns.reduce((size2, [name]) => name.length > size2 ? name.length : size2, 0);
  return spwns.reduce((string, [name, child]) => {
    string += nl + line.gray + wsr(width - name.length) + neonCyan(toUpcase(name)) + `${COL} ` + gray("PID") + " \u2192 " + gray("#") + pink(`${child.pid}`);
    return string;
  }, nil);
}
function getThemeURLS(themes, url) {
  const width = themes.reduce((size2, { target, store }) => {
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
  return themes.reduce((string, { target, store, id }) => {
    const name = store.slice(0, store.indexOf("."));
    const type2 = url === "editor" ? `https://${store}/admin/themes/${id}/editor` : `https://${store}?preview_theme_id=${id}`;
    string += nl + line.gray + pink(name) + wsr(width.store - name.length) + white("  \u2192  ") + pink.bold(target) + wsr(width.theme - target.length) + white(" \u2192  ") + gray.underline(type2);
    return string;
  }, nil);
}

// lib/log/spinner.ts
var interval;
var active = false;
var spinner = function spinner2(text, color = "pink") {
  active = true;
  let f = 0;
  const size2 = SPINNER_FRAMES.length;
  interval = setInterval(() => {
    if (!active)
      return;
    log_update_default(`${line.gray} ${ansi_exports[color](`${SPINNER_FRAMES[f = ++f % size2]}`)}${text ? ` ${text}` : nil}`);
  }, 50);
};
spinner.stop = (text) => {
  if (!active)
    return;
  active = false;
  if (text) {
    log_update_default(line.gray + text);
    log_update_default.done();
  } else {
    log_update_default.clear();
  }
  clearInterval(interval);
  interval = void 0;
};

// lib/cli/progress.ts
function progress(total, opts = {}) {
  const options = assign({
    showPercentage: true,
    barColor: "neonGreen",
    percentColor: "whiteBright",
    barSize: 40,
    clearOnComplete: false
  }, opts);
  let current = 0;
  function align(output) {
    return ansi_exports.line.gray + output + " ".repeat(Math.max(0, options.barSize - output.length));
  }
  function bar(length, empty = false) {
    return (empty ? "\u25B1" : "\u25B0").repeat(length);
  }
  function stop2() {
    if (options.clearOnComplete)
      console.clear();
  }
  function increment(incrementBy = 1) {
    const filled = current + incrementBy;
    current = Math.min(filled, total);
    if (current === total)
      stop2();
  }
  function decrement(decrementBy = 1) {
    const filled = current - decrementBy;
    current = Math.max(filled, 0);
  }
  function render() {
    const progress2 = Math.round(current / total * options.barSize);
    const filled = bar(progress2);
    const empty = bar(options.barSize - progress2, true);
    let output = ansi_exports[options.barColor](filled) + ansi_exports.lightGray(empty);
    if (options.showPercentage) {
      output += ` ${String(Math.round(current / total * 100))}%`;
    }
    return align(output);
  }
  return {
    stop: stop2,
    increment,
    decrement,
    render,
    /**
     * Returns the current filled amount
     */
    get percent() {
      return current;
    }
  };
}

// lib/log/loggers.ts
var uploads = /* @__PURE__ */ new Set();
var listen = null;
var idle = false;
var group = "Syncify";
var title = nil;
var uri = nil;
function build(id, count, file2) {
  const close2 = title !== id;
  start();
  if (close2) {
    log(closer(group));
  }
  if (group === "Syncify")
    clear2();
  group = id;
  if (close2) {
    log(opener(group));
    nwl();
    log(line.gray + bold(`${count} ${toUpcase(id)}`));
    nwl();
    title = id;
  }
  nwl();
  log(tree("top", neonCyan(typeof file2 === "string" ? file2 : file2.relative)));
}
function nwl(entry = "gray") {
  if (isEmpty(entry)) {
    log(nl);
  } else {
    log(line[entry]);
  }
}
function err(input) {
  if (isArray2(input)) {
    error(red(input.map((text) => line.red + sanitize(text)).join(nl)));
  } else {
    error(line.red + sanitize(input));
  }
}
function write2(input) {
  if (isArray2(input)) {
    log(input.map((text) => line.gray + sanitize(text)).join(nl));
  } else {
    log(line.gray + sanitize(input));
  }
}
function external(operation) {
  log(suffix("cyan", "external", operation));
}
function hook(name) {
  if (warning.current !== name)
    warning.current = name;
  if (!has(name, warning.process)) {
    warning.current = name;
    warning.process[name] = /* @__PURE__ */ new Set();
  }
  listen = intercept((stream, data) => {
    if (data.charCodeAt(0) === 9474) {
      process6[stream].write(data);
    } else {
      warning.count += 1;
      const text = data.split("\n");
      while (text.length !== 0) {
        warning.process[name].add(`${yellowBright(text.shift().trimStart())}`);
      }
    }
  });
}
function unhook() {
  listen();
  listen = null;
}
function newGroup(name, clear3 = false) {
  log(closer(group));
  if (clear3)
    clear2();
  log(opener(name));
  group = name;
  nwl();
}
function changed(file2) {
  const close2 = title !== file2.relative;
  start();
  if (close2)
    log(closer(group));
  if (group !== "Syncify" && close2)
    clear2();
  group = file2.namespace;
  if (close2) {
    clear2();
    log(opener(file2.kind));
    title = file2.relative;
  }
  if (!has(file2.relative, warning))
    warning[file2.relative] = /* @__PURE__ */ new Set();
  if (uri !== file2.relative)
    uri = file2.relative;
  if (bundle.mode.watch) {
    nwl();
    log(suffix("neonCyan", "changed", file2.relative));
  }
}
function upload(theme2) {
  if (bundle.mode.watch) {
    uploads.add([
      theme2.target,
      theme2.store,
      stop()
    ]);
    if (idle)
      return;
    idle = true;
    queue.onIdle().then(() => {
      for (const [target, store, time3] of uploads) {
        log(suffix("neonGreen", "uploaded", `${bold(target)} \u2192 ${store}` + time2(time3)));
      }
      uploads.clear();
      idle = false;
    });
  } else {
    log(suffix("neonGreen", "uploaded", `${bold(theme2.target)} \u2192 ${theme2.store}` + time2(stop())));
  }
}
function syncing(path2) {
  if (warning.count > 0) {
    suffix("yellowBright", "warning", `${warning.count} ${plural("warning", warning.count)}`);
  }
  if (bundle.mode.hot) {
    log(suffix("neonRouge", "reloaded", `${bold("HOT RELOAD")}${time2(now())}`));
    log(suffix("magentaBright", "syncing", path2));
    if (queue.pending > 2) {
      log(suffix("orange", "queued", `${path2} ~ ${bold(addSuffix(queue.pending))} in queue`));
    }
  } else {
    log(suffix("magentaBright", "syncing", path2));
    if (queue.pending > 0) {
      log(suffix("orange", "queued", `${path2} ~ ${bold(addSuffix(queue.pending))} in queue`));
    }
  }
}
function process6(name, ...message2) {
  let time3 = message2[0];
  let text = nil;
  if (message2.length === 2) {
    text = ` ${CHV} ${message2[0]}`;
    time3 = message2[1];
  }
  log(suffix("whiteBright", "process", bold(name) + text + time2(time3)));
}
function exported(file2) {
  log(suffix("whiteBright", "exports", file2));
}
function importer(message2) {
  if (!bundle.mode.build) {
    log(suffix("lavender", "importer", message2));
  }
}
function transform(message2) {
  log(suffix("whiteBright", "transform", message2));
}
function retrying(file2, theme2) {
  log(suffix("orange", "retrying", `${file2} \u2192 ${theme2.target} ${gray(`~ ${theme2.store}`)}`));
}
function deleted(file2, theme2) {
  log(suffix("blueBright", "deleted", `${file2} \u2192 ${theme2.target} ${gray(`~ ${theme2.store}`)}`));
}
function minified(kind, before, after, saved) {
  const suffix2 = kind ? `${bold(kind)} ${ARR} ${before} ${ARL} ${after} ${gray(`~ saved ${saved}`)}` : `${before} ${ARL} ${after} ${gray(`~ saved ${saved}`)}`;
  log(suffix("whiteBright", "minified", suffix2));
}
function reloaded(path2, time3) {
  log(suffix("whiteBright", "reloaded", path2 + time3));
}
function skipped(file2, reason) {
  log(suffix("gray", "skipped", `${typeof file2 === "string" ? file2 : file2.key} ~ ${reason}`));
}
function ignored(path2) {
  log(suffix("gray", "ignored", path2));
}
function invalid(path2) {
  log(suffix("red", "invalid", path2));
  const notification = notifier__default.default.notify({
    title: "Syncify Error",
    sound: "Pop",
    open: path2,
    subtitle: path2,
    message: "Invalid error"
  });
  notification.notify();
}
function failed(path2) {
  log(suffix("red", "failed", path2));
  const notification = notifier__default.default.notify({
    title: "Syncify Error",
    sound: "Pop",
    open: path2,
    subtitle: path2,
    message: "Request failed"
  });
  notification.notify();
}
function throws(data) {
  throw new Error(data);
}
function spawn2(name) {
  return (...message2) => {
    if (!bundle.spawn.invoked)
      bundle.spawn.invoked = true;
    if (group !== "Spawn") {
      log(closer(group));
      if (group !== "Syncify")
        clear2();
      log(opener("Spawn"));
      group = "Spawn";
    }
    if (title !== name) {
      log(message("pink", name));
      title = name;
    }
    spawn(sanitize(message2.shift()));
  };
}

// lib/log/warnings.ts
var warnings_exports = {};
__export(warnings_exports, {
  esbuild: () => esbuild2,
  postcss: () => postcss2,
  sass: () => sass2,
  warnings: () => warnings2
});
var warnings2 = {};
var sass2 = (file2) => (message2, options) => {
  let output = nil;
  if (!has(file2.input, warnings2)) {
    warnings2[file2.input] = /* @__PURE__ */ new Map([["sass", /* @__PURE__ */ new Set()]]);
  } else {
    if (!warnings2[file2.input].has("sass")) {
      warnings2[file2.input].set("sass", /* @__PURE__ */ new Set());
    }
  }
  const cache2 = warnings2[file2.input].get("sass");
  output += indent(message2, {
    nwl: true,
    line: line.yellow,
    text: yellowBright.bold
  });
  if (has("span", options)) {
    const span = has("start", options.span) && has("end", options.span) ? {
      start: options.span.start.line,
      end: options.span.end.line
    } : null;
    const code = has("context", options.span) ? options.span.context : has("text", options.span) ? options.span.text : null;
    if (code !== null) {
      if (span !== null) {
        output += sample(code, {
          line: line.yellow,
          span
        });
      } else {
        output += sample(code);
      }
    }
  }
  output += context({
    stack: options.stack,
    entries: {
      file: file2.relative,
      deprecated: options.deprecation ? "Yes" : "No"
    }
  });
  if (!cache2.has(output)) {
    cache2.add(output);
    log(suffix("yellowBright", "warning", `${cache2.size} ${plural("warning", cache2.size) + warning2}`));
  } else {
    log(suffix("yellowBright", "warning", `${cache2.size} ${plural("warning", cache2.size) + warning2}`));
  }
};
function esbuild2(data) {
}
function postcss2(file2, data) {
  let output = nil;
  if (!has(file2.input, warnings2)) {
    warnings2[file2.input] = /* @__PURE__ */ new Map([["postcss", /* @__PURE__ */ new Set()]]);
  } else {
    if (!warnings2[file2.input].has("postcss")) {
      warnings2[file2.input].set("postcss", /* @__PURE__ */ new Set());
    }
  }
  const cache2 = warnings2[file2.input].get("postcss");
  output += sample(data.node.toString(), {
    line: line.yellow,
    span: isNumber(data.endLine) ? {
      start: data.line,
      end: data.endLine
    } : {
      start: data.line,
      end: data.endLine
    }
  });
  output += context({
    stack: false,
    entries: {
      column: data.column,
      file: file2.relative,
      plugin: data.plugin
    }
  });
  if (!cache2.has(output)) {
    cache2.add(output);
    warn(output);
  }
}

// lib/cli/emitters.ts
function signal() {
  loggers_exports.nwl("");
  loggers_exports.out(gray("SIGINT"));
  process.exit();
}
function rejection(reason, p) {
  loggers_exports.nwl();
  loggers_exports.err(`Unhandled Promise Rejection at: ${p}`);
  loggers_exports.nwl("red");
  loggers_exports.out(reason ? gray(reason) : "Unkown Reason");
}
function exception(e2) {
  loggers_exports.nwl();
  loggers_exports.err(`Uncaught Exception: ${e2.message}`);
  loggers_exports.nwl("red");
  loggers_exports.err(`${e2.stack}`);
}

// node_modules/.pnpm/p-map@6.0.0/node_modules/p-map/index.js
var AbortError3 = class extends Error {
  constructor(message2) {
    super();
    this.name = "AbortError";
    this.message = message2;
  }
};
var getDOMException2 = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError3(errorMessage) : new DOMException(errorMessage);
var getAbortedReason2 = (signal2) => {
  const reason = signal2.reason === void 0 ? getDOMException2("This operation was aborted.") : signal2.reason;
  return reason instanceof Error ? reason : getDOMException2(reason);
};
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true,
  signal: signal2
} = {}) {
  return new Promise((resolve, reject_) => {
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
    const errors2 = [];
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
    if (signal2) {
      if (signal2.aborted) {
        reject(getAbortedReason2(signal2));
      }
      signal2.addEventListener("abort", () => {
        reject(getAbortedReason2(signal2));
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
          if (!stopOnError && errors2.length > 0) {
            reject(new AggregateError(errors2));
            return;
          }
          isResolved = true;
          if (skippedIndexesMap.size === 0) {
            resolve(result);
            return;
          }
          const pureResult = [];
          for (const [index2, value] of result.entries()) {
            if (skippedIndexesMap.get(index2) === pMapSkip) {
              continue;
            }
            pureResult.push(value);
          }
          resolve(pureResult);
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
        } catch (error4) {
          if (stopOnError) {
            reject(error4);
          } else {
            errors2.push(error4);
            resolvingCount--;
            try {
              await next();
            } catch (error5) {
              reject(error5);
            }
          }
        }
      })();
    };
    (async () => {
      for (let index = 0; index < concurrency; index++) {
        try {
          await next();
        } catch (error4) {
          reject(error4);
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

// node_modules/.pnpm/mergerino@0.4.0/node_modules/mergerino/dist/mergerino.min.js
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

// lib/requests/assets.ts
async function has2(asset, theme2) {
  return axios({
    ...bundle.sync.stores[theme2.sidx].client,
    method: "get",
    url: theme2.url,
    params: {
      "asset[key]": asset
    }
  }).then(() => true).catch(() => false);
}
async function find(asset, theme2) {
  return axios({
    ...bundle.sync.stores[theme2.sidx].client,
    method: "get",
    url: theme2.url,
    params: {
      "asset[key]": asset
    }
  }).then(({ data }) => data.asset).catch(() => false);
}
async function upload2(asset, config) {
  const request2 = mergerino_min_default(bundle.sync.stores[config.theme.sidx].client, {
    method: "put",
    url: config.theme.url,
    data: {
      asset: {
        key: config.key,
        value: asset
      }
    }
  });
  return axios(request2).then(() => {
    return true;
  }).catch((e2) => {
    loggers_exports.failed(config.key);
    errors_exports.request(config.key, e2.response);
    return false;
  });
}
async function get(url, config) {
  return axios.get(url, config).then(({ data }) => {
    return data;
  }).catch((e2) => {
    if (e2.response && (e2.response.status === 429 || e2.response.status === 500)) {
      loggers_exports.retrying(file.key, theme);
      queue.add(() => sync(theme, file, config));
    } else {
      if (bundle.mode.upload) {
        throw e2.response;
      } else {
        loggers_exports.failed(file.key);
        errors_exports.request(file.relative, e2.response);
      }
    }
    loggers_exports.failed(url);
    errors_exports.request(url, e2.response);
  });
}
var limit;
async function sync(theme2, file2, config) {
  if (queue.isPaused)
    return;
  const { mode } = bundle;
  if (queue.concurrency > 2) {
    if (limit >= 20)
      queue.concurrency--;
    if (limit >= 35)
      queue.concurrency--;
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }
  if (!mode.upload)
    start();
  const promise = await axios(config).then(({ headers, data }) => {
    if (config.method === "get")
      return data;
    if (config.method === "delete") {
      loggers_exports.deleted(file2.relative, theme2);
    } else {
      if (mode.watch) {
        loggers_exports.upload(theme2);
      } else if (mode.upload) {
        event.emit("upload", "uploaded", theme2, {
          key: file2.key,
          namespace: file2.namespace,
          fileSize: getSizeStr(config.data.asset.value)
        });
      }
    }
    limit = parseInt(headers["x-shopify-shop-api-call-limit"].slice(0, 2), 10);
  }).catch((e2) => {
    if (e2.response && (e2.response.status === 429 || e2.response.status === 500)) {
      if (!mode.upload)
        loggers_exports.retrying(file2.key, theme2);
      queue.add(() => sync(theme2, file2, config));
    } else {
      if (mode.upload) {
        event.emit("upload", "failed", theme2, {
          key: file2.key,
          namespace: file2.namespace,
          fileSize: getSizeStr(config.data.asset.value),
          get file() {
            return file2;
          },
          get error() {
            return e2.response;
          }
        });
      } else {
        loggers_exports.failed(file2.key);
        errors_exports.request(file2.relative, e2.response);
      }
    }
    return pMapSkip;
  });
  return promise;
}
var Blocker = class {
  /* CONSTRUCTOR */
  constructor(stream = process.stdin) {
    this.onKeypress = (_, key) => {
      if (key.ctrl && key.name === "c") {
        return process.exit(0);
      }
    };
    this.isBlocked = () => {
      return this.blocked;
    };
    this.block = () => {
      return this.toggle(true);
    };
    this.unblock = () => {
      return this.toggle(false);
    };
    this.toggle = (force = !this.blocked) => {
      this.blocked = force;
      if (force) {
        if (this.stream.isTTY) {
          this.stream.setRawMode(true);
        }
        this.interface = readline__default.default.createInterface({ input: this.stream, escapeCodeTimeout: 50 });
        readline__default.default.emitKeypressEvents(this.stream, this.interface);
        this.stream.on("keypress", this.onKeypress);
      } else {
        if (this.stream.isTTY) {
          this.stream.setRawMode(false);
        }
        if (this.interface) {
          this.interface.close();
        }
        this.stream.off("keypress", this.onKeypress);
      }
    };
    this.stream = stream;
    this.blocked = false;
  }
};
var blocker_default = Blocker;

// node_modules/.pnpm/stdin-blocker@2.0.0/node_modules/stdin-blocker/dist/index.js
new blocker_default();

// node_modules/.pnpm/tiny-colors@2.0.2/node_modules/tiny-colors/dist/constants.js
var ENV = globalThis.process?.env || {};
var ARGV = globalThis.process?.argv || [];
!("NO_COLOR" in ENV) && ENV.TERM !== "dumb" && !ARGV.includes("--no-color") && !ARGV.includes("--no-colors");
var IS_LINUX = process2__default.default.platform === "linux";
var IS_WINDOWS = process2__default.default.platform === "win32";

// node_modules/.pnpm/when-exit@2.1.0/node_modules/when-exit/dist/node/signals.js
var Signals = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
if (!IS_WINDOWS) {
  Signals.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}
if (IS_LINUX) {
  Signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}
var signals_default = Signals;

// node_modules/.pnpm/when-exit@2.1.0/node_modules/when-exit/dist/node/interceptor.js
var Interceptor = class {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set();
    this.exited = false;
    this.hooked = false;
    this.exit = (signal2) => {
      if (this.exited)
        return;
      this.exited = true;
      for (const callback of this.callbacks) {
        callback();
      }
      if (signal2) {
        process2__default.default.kill(process2__default.default.pid, signal2);
      }
    };
    this.hook = () => {
      if (this.hooked)
        return;
      this.hooked = true;
      process2__default.default.once("exit", () => this.exit());
      for (const signal2 of signals_default) {
        process2__default.default.once(signal2, () => this.exit(signal2));
      }
    };
    this.register = (callback) => {
      this.hook();
      this.callbacks.add(callback);
      return () => {
        this.callbacks.delete(callback);
      };
    };
  }
};
var interceptor_default = new Interceptor();

// node_modules/.pnpm/when-exit@2.1.0/node_modules/when-exit/dist/node/index.js
var whenExit = interceptor_default.register;
var node_default = whenExit;

// node_modules/.pnpm/tiny-cursor@2.0.0/node_modules/tiny-cursor/dist/cursor.js
var Cursor = class {
  /* CONSTRUCTOR */
  constructor(stream = process.stdout) {
    this.has = () => {
      return this.visible;
    };
    this.hide = () => {
      return this.toggle(false);
    };
    this.show = () => {
      return this.toggle(true);
    };
    this.toggle = (force = !this.visible) => {
      if (!this.stream.isTTY)
        return;
      this.visible = force;
      const command = force ? "\x1B[?25h" : "\x1B[?25l";
      this.stream.write(command);
    };
    this.stream = stream;
    this.visible = true;
    node_default(this.show);
  }
};
var cursor_default = Cursor;

// node_modules/.pnpm/tiny-cursor@2.0.0/node_modules/tiny-cursor/dist/index.js
new cursor_default();

// lib/requests/metafields.ts
async function find2(store, field) {
  if (is(arguments.length, 1))
    return (_field) => find2(store, _field);
  if (allFalse(has("namespace", field), has("key", field))) {
    loggers_exports.error("invalid fields");
    return void 0;
  }
  return axios.get("metafields.json", store.client).then(({ data }) => {
    return data.metafields.find((m) => field.namespace === m.namespace && field.key === m.key);
  }).catch((e2) => {
    console.log(e2);
    return void 0;
  });
}
async function create2(store, metafield) {
  if (is(arguments.length, 1))
    return (_metafield) => create2(store, _metafield);
  metafield.type = "json";
  metafield.namespace = "email";
  metafield.value_type = "json_string";
  metafield.key = "eng";
  return axios.post("metafields.json", { metafield }, store.client).then(({ data }) => {
    console.log("created", data);
    return data.metafield;
  }).catch((e2) => {
    console.log(e2);
    if (!store.queue)
      return errors_exports(metafield.namespace, e2.response);
    if (requeue(e2.response.status)) {
      queue.add(() => create2(store, metafield));
      return void 0;
    } else {
      return errors_exports(store.store, e2.response);
    }
  });
}
async function update(store, id, metafield) {
  if (is(arguments.length, 1))
    return (_id, _field) => update(store, _id, _field);
  return axios.put(`metafields/${id}.json`, { metafield }, store.client).then((d) => {
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
    return create2(store, field);
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

// lib/requests/client.ts
function client({ stores, themes }) {
  return {
    assets: async (method, file2, content) => {
      const payload = isUndefined(content) ? {
        method,
        params: {
          "asset[key]": file2.key
        }
      } : {
        method,
        data: {
          asset: {
            key: file2.key,
            value: content
          }
        }
      };
      await queue.add(() => pMap(themes, async (theme2) => {
        if (bundle.mode.upload) {
          start();
        }
        await sync(
          theme2,
          file2,
          mergerino_min_default({ url: theme2.url }, stores[theme2.sidx].client, payload)
        );
      }));
    },
    pages: (content) => {
      return queue.add(function() {
        return mapParallelAsync(async function(store) {
        }, stores);
      });
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
function globPath(path2) {
  return isArray2(path2) ? path2.filter((uri2) => /\*/.test(uri2)) : /\*/.test(path2) ? path2 : null;
}
function lastPath(path2) {
  if (isArray2(path2))
    return path2.map(lastPath);
  if (path2.indexOf("/") === -1)
    return path2;
  const dir = path$1.dirname(path2);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
}
function parentPath(path2) {
  if (isArray2(path2))
    return path2.map(parentPath);
  const last2 = path2.lastIndexOf("/");
  if (last2 === -1)
    return path2;
  const glob6 = path2.indexOf("*");
  return glob6 === -1 ? path2.slice(0, last2) : path2.slice(0, glob6);
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
        "Paths must be relative to source"
      );
    }
    return (ignore ? "!" : "") + path$1.join(input, path2);
  };
}
var basePath = (cwd) => (path2) => {
  if (path2.indexOf("*") !== -1) {
    throwError(
      `Base directory path cannot contain glob${COL} ${yellowBright(`"${path2}"`)}`,
      "Ensure that path you are resolving is correctly formed"
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
        "Ensure that path you are resolving is correctly formed"
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
    path2 = path$1.join(cwd, path2);
    return last(path2).charCodeAt(0) === 47 ? path2 : path2 + "/";
  } else {
    throwError(
      `Directory path is invalid at${COL} ${yellowBright(`"${path2}"`)}`,
      "Ensure that path you are resolving is correctly formed"
    );
  }
};
function svg(file2) {
  const config = bundle.svg.filter((context2) => {
    if (context2.input.has(file2.input))
      return true;
    if (!context2.match(file2.input))
      return false;
    context2.input.add(file2.input);
    return true;
  });
  if (isUndefined(config))
    return file2;
  defineProperty(file2, "data", { get() {
    return config;
  } });
  return file2;
}
function style(file2) {
  const config = bundle.style.find((x) => x.watch(file2.input));
  if (isUndefined(config))
    return file2;
  defineProperty(file2, "data", { get() {
    return config;
  } });
  if (config.snippet) {
    file2.namespace = "snippets";
    file2.key = path$1.join("snippets", config.rename);
  } else {
    file2.key = path$1.join("assets", config.rename);
  }
  if (file2.output) {
    if (file2.data.rename !== path$1.basename(file2.output)) {
      if (config.snippet) {
        file2.output = path$1.join(bundle.dirs.output, file2.key);
      } else {
        file2.output = path$1.join(parentPath(file2.output), file2.data.rename);
      }
    }
  } else {
    file2.output = path$1.join(bundle.dirs.output, file2.key);
  }
  return file2;
}
function script(file2) {
  const config = bundle.script.filter((config2) => config2.watch.has(file2.input));
  if (config.length === 0)
    return file2;
  defineProperty(file2, "data", { get() {
    return config;
  } });
  return file2;
}
function section(file2) {
  if (bundle.section.prefixDir) {
    if (file2.base.endsWith("-group.json"))
      return file2;
    if (isRegex(bundle.section.global) && bundle.section.global.test(file2.input))
      return file2;
    const rename = lastPath(file2.input) + bundle.section.separator + file2.base;
    file2.name = rename;
    file2.key = path$1.join(file2.namespace, rename);
    file2.output = path$1.join(path$1.dirname(file2.output), rename);
  }
  return file2;
}
function snippet(file2) {
  if (bundle.snippet.prefixDir) {
    if (isRegex(bundle.snippet.global) && bundle.snippet.global.test(file2.input))
      return file2;
    const rename = lastPath(file2.input) + bundle.snippet.separator + file2.base;
    file2.name = rename;
    file2.key = path$1.join(file2.namespace, rename);
    file2.output = path$1.join(path$1.dirname(file2.output), rename);
  }
  return file2;
}

// lib/process/files.ts
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
function setFile(parsedFile, input, output) {
  const file2 = parsedFile;
  return (namespace, type2, kind) => {
    let key;
    if (type2 === 13 /* Metafield */ || type2 === 14 /* Page */) {
      key = path$1.join(lastPath(file2.dir), file2.base);
      output = null;
    } else {
      key = path$1.join(namespace, file2.base);
      output = path$1.join(output, key);
    }
    return assign({}, file2, {
      uuid: uuid(),
      type: type2,
      input,
      output,
      key,
      namespace,
      kind,
      relative: path$1.relative(bundle.cwd, input),
      size: NaN,
      data: void 0
    });
  };
}
function parseFile(paths, output) {
  return (path2) => {
    const file2 = path$1.parse(path2);
    const define2 = setFile(file2, path2, output);
    if (file2.ext === ".liquid") {
      if (paths.sections(path2)) {
        return section(define2("sections", 4 /* Section */, "Liquid" /* Liquid */));
      } else if (paths.snippets(path2)) {
        return snippet(define2("snippets", 3 /* Snippet */, "Liquid" /* Liquid */));
      } else if (paths.layout(path2)) {
        return define2("layout", 2 /* Layout */, "Liquid" /* Liquid */);
      } else if (paths.templates(path2)) {
        return define2("templates", 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths.customers(path2)) {
        return define2("templates/customers", 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths.transforms.has(path2)) {
        switch (paths.transforms.get(path2)) {
          case 7 /* Style */:
            return style(define2("snippets", 7 /* Style */, "CSS" /* CSS */));
        }
      }
    } else if (file2.ext === ".md" || file2.ext === ".html") {
      return define2("pages", 14 /* Page */, file2.ext === ".html" ? "HTML" /* HTML */ : "Markdown" /* Markdown */);
    } else if (file2.ext === ".json") {
      if (paths.metafields(path2)) {
        return define2("metafields", 13 /* Metafield */, "JSON" /* JSON */);
      } else if (paths.sections(path2)) {
        return section(define2("sections", 4 /* Section */, "JSON" /* JSON */));
      } else if (paths.templates(path2)) {
        return define2("templates", 1 /* Template */, "JSON" /* JSON */);
      } else if (paths.config(path2)) {
        return define2("config", 5 /* Config */, "JSON" /* JSON */);
      } else if (paths.locales(path2)) {
        return define2("locales", 6 /* Locale */, "JSON" /* JSON */);
      } else if (paths.customers(path2)) {
        return define2("templates/customers", 1 /* Template */, "JSON" /* JSON */);
      }
    } else if (file2.ext === ".svg") {
      return svg(define2("assets", 9 /* Svg */, "SVG" /* SVG */));
    } else if (file2.ext === ".css") {
      return style(define2("assets", 7 /* Style */, "CSS" /* CSS */));
    } else if (file2.ext === ".scss") {
      return style(define2("assets", 7 /* Style */, "SCSS" /* SCSS */));
    } else if (file2.ext === ".sass") {
      return style(define2("assets", 7 /* Style */, "SASS" /* SASS */));
    } else if (file2.ext === ".js" || file2.ext === ".mjs") {
      return script(define2("assets", 8 /* Script */, "JavaScript" /* JavaScript */));
    } else if (file2.ext === ".ts") {
      return script(define2("assets", 8 /* Script */, "TypeScript" /* TypeScript */));
    } else if (file2.ext === ".jsx") {
      return script(define2("assets", 8 /* Script */, "JSX" /* JSX */));
    } else if (file2.ext === ".tsx") {
      return script(define2("assets", 8 /* Script */, "TSK" /* TSX */));
    } else if (paths.assets(path2)) {
      if (bundle.spawn.invoked) {
        return define2("assets", 15 /* Spawn */);
      } else if (file2.ext === ".jpg" || file2.ext === ".png" || file2.ext === ".gif" || file2.ext === ".pjpg") {
        return define2("assets", 12 /* Asset */, "Image" /* Image */);
      } else if (file2.ext === ".mov" || file2.ext === ".mp4" || file2.ext === ".webm" || file2.ext === ".ogg") {
        return define2("assets", 12 /* Asset */, "Video" /* Video */);
      } else if (file2.ext === ".pdf") {
        return define2("assets", 12 /* Asset */, "PDF" /* PDF */);
      } else if (file2.ext === ".eot" || file2.ext === ".ttf" || file2.ext === ".woff" || file2.ext === ".woff2") {
        return define2("assets", 12 /* Asset */, "Font" /* Font */);
      }
    }
    return void 0;
  };
}
var outputFile = (output) => (path2) => {
  const file2 = path$1.parse(path2);
  const merge = setFile(file2, path2, output);
  switch (path$1.basename(file2.dir)) {
    case "sections":
      return merge("sections", 4 /* Section */);
    case "snippets":
      return merge("snippets", 3 /* Snippet */);
    case "layout":
      return merge("layout", 2 /* Layout */);
    case "templates":
      return merge("templates", 1 /* Template */);
    case "customers":
      return merge("templates/customers", 1 /* Template */);
    case "config":
      return merge("config", 5 /* Config */);
    case "locales":
      return merge("locales", 6 /* Locale */);
    case "assets":
      return merge("assets", 12 /* Asset */);
  }
};
var EXP = new RegExp(`{%-?\\s*render\\s+['"]${HOT_SNIPPET_NAME}['"][,\\slablsockvetr:0-9'"]+?-?%}\\s+`);
async function injectSnippet(force = false) {
  const key = `snippets/${HOT_SNIPPET_FILE}`;
  const [theme2] = bundle.sync.themes;
  if (force === false) {
    const exists = await has2(key, theme2);
    if (exists) {
      loggers_exports.update(tui_exports.message("gray", `${key} snippet injection exists`));
      return true;
    }
  }
  const snippet3 = await fsExtra.readFile(bundle.hot.snippet);
  const upload4 = await upload2(snippet3.toString(), { theme: theme2, key });
  loggers_exports.update(tui_exports.message("gray", `${key} uploaded snippet injection`));
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
    const start3 = content.slice(0, render);
    const slice = content.slice(content.indexOf("%}") + 2);
    return start3 + slice;
  }
  return content;
}
function writeRender(content) {
  const ender = content.indexOf("<head>") + 6;
  const start3 = content.slice(0, ender);
  return start3 + nl + bundle.hot.renderer + nl + content.slice(ender);
}
async function injectRender(path2) {
  const exists = await fsExtra.pathExists(path2);
  if (!exists)
    return null;
  const local = await fsExtra.readFile(path2);
  let content = local.toString();
  if (!EXP.test(content)) {
    content = writeRender(content);
    await fsExtra.writeFile(path2, content);
    loggers_exports.update(tui_exports.message("gray", "injected render tag in output layout"));
  }
  const [theme2] = bundle.sync.themes;
  const name = path$1.basename(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme2);
  if (EXP.test(string))
    content = removeRender(content);
  const upload4 = await upload2(content, { theme: theme2, key });
  if (upload4) {
    loggers_exports.update(tui_exports.message("gray", "uploaded and inject render tag"));
    return true;
  }
  return false;
}

// lib/modes/upload.ts
async function upload3(cb) {
  loggers_exports.newGroup("Upload");
  loggers_exports.spinner("Preparing");
  start("upload");
  const $ = {
    files: [],
    sync: {}
  };
  const parse3 = outputFile(bundle.dirs.output);
  const files = glob3__default.default.sync(`${bundle.dirs.output}/**`).sort();
  const request2 = client(bundle.sync);
  const hashook = isFunction(cb);
  const errs = /* @__PURE__ */ new Map();
  let pass = 0;
  let width = 0;
  const size2 = files.length;
  for (const { store, target } of bundle.sync.themes) {
    if (target.length > width)
      width = target.length;
    if (!has(store, $.sync))
      $.sync[store] = [];
    $.sync[store].push({
      theme: target,
      uploaded: 0,
      failed: 0,
      progress: loggers_exports.progress(size2)
    });
  }
  event.on("upload", function(type2, { target, store }, item) {
    loggers_exports.spinner.stop();
    const isErr = type2 === "failed";
    const items = [
      tui_exports.message("whiteBright", bold(item.namespace)),
      newline,
      tui_exports.message(type2 === "failed" ? "redBright" : "neonGreen", item.key),
      newline,
      tui_exports.suffix("white", "size ", `  ${item.fileSize}`),
      nl,
      tui_exports.suffix("white", "duration ", `  ${stop()}`),
      nl,
      tui_exports.suffix("white", "elapsed ", `  ${now("upload")}`),
      newline
    ];
    for (const prop in $.sync) {
      for (const th of $.sync[prop]) {
        if (prop === store && target === th.theme) {
          th[type2] += 1;
          th.progress.increment(1);
        }
        const title2 = `${bold(th.theme.toUpperCase()) + wsr(width - target.length)}  ${ARR}  ${prop}`;
        items.push(
          tui_exports.message("neonCyan", title2),
          newline,
          tui_exports.suffix("whiteBright", "uploaded ", `  ${bold(`${th.uploaded}`)} ${white("of")} ${bold(`${size2}`)}`),
          nl,
          tui_exports.suffix(th.failed > 0 ? "redBright" : "white", "failed ", `  ${bold(`${th.failed}`)}`),
          newline,
          th.progress.render(false),
          newline
        );
        if (isErr) {
          if (errs.has([prop, target])) {
            errs.get([prop, target]).push([item.file, item.error]);
          } else {
            errs.set([prop, target], [[item.file, item.error]]);
          }
        }
      }
    }
    loggers_exports.update(glue(items));
  });
  for (const path2 of files) {
    const file2 = parse3(path2);
    let input;
    try {
      const read = await fsExtra.readFile(file2.input);
      input = read.toString();
      if (file2.namespace === "layout") {
        if (hasSnippet(input)) {
          input = removeRender(input);
        }
      }
      if (!hashook) {
        await request2.assets("put", file2, input);
      } else {
        const update2 = cb.apply({ ...file2 }, input);
        if (isUndefined(update2) || update2 === false) {
          await request2.assets("put", file2, input);
        } else if (isString(update2)) {
          await request2.assets("put", file2, update2);
        } else if (isBuffer(update2)) {
          await request2.assets("put", file2, update2.toString());
        } else {
          await request2.assets("put", file2, input);
        }
      }
      pass++;
    } catch (e2) {
      console.log(e2);
    }
  }
}
async function download(cb) {
  start();
  const hashook = isFunction(cb);
  for (const theme2 of bundle.sync.themes) {
    const store = bundle.sync.stores[theme2.sidx];
    const { assets } = await get(theme2.url, store.client);
    for (const { key } of assets) {
      try {
        const data = mergerino_min_default(store.client, { params: { "asset[key]": key } });
        const { asset } = await get(theme2.url, data);
        const output = path$1.join(bundle.dirs.import, store.domain, theme2.target, key);
        const buffer = has("attachment", asset) ? Buffer.from(asset.attachment, "base64") : Buffer.from(asset.value || null, "utf8");
        loggers_exports.write(`${ansi_exports.neonCyan(key)}`);
        if (hashook) {
          const update2 = cb.apply({ asset, output }, buffer);
          if (isUndefined(update2) || update2 === false) {
            await fsExtra.writeFile(output, buffer);
          } else if (isString(update2) || isBuffer(update2)) {
            await fsExtra.writeFile(output, update2);
          } else {
            await fsExtra.writeFile(output, buffer);
          }
        } else {
          await fsExtra.writeFile(output, buffer);
        }
      } catch (e2) {
        loggers_exports.failed(key);
      }
    }
  }
}
var passthrough = (file2) => async (data) => {
  if (file2.type !== 15 /* Spawn */) {
    await fsExtra.writeFile(file2.output, data).catch(
      errors_exports.write("Error writing asset to output", {
        file: file2.relative,
        source: file2.relative
      })
    );
  }
  return data;
};
async function compile(file2, cb) {
  const copy = passthrough(file2);
  const data = await fsExtra.readFile(file2.input).catch(
    errors_exports.write("Error reading asset file", {
      file: file2.relative,
      source: file2.relative
    })
  );
  if (data) {
    if (!isFunction(cb))
      return copy(data);
    const update2 = cb.apply({ ...file2 }, data);
    if (isUndefined(update2) || update2 === false) {
      return copy(data);
    } else if (isType(update2)) {
      return copy(update2);
    } else if (isBuffer(update2)) {
      return copy(update2.toString());
    }
    return copy(data);
  }
}
var LiquidLineComments = /{%-?\s*#[\s\S]+?%}/g;
var LiquidBlockComments = /{%-?\s*comment\s*-?%}[\s\S]+?{%-?\s*endcomment\s*-?%}/g;
var LiquidTag = /{%-?\s*liquid[\s\S]+?%}/g;
var ScriptJsonWhitespace = /[^,:'"a-zA-Z0-9=] +[^'"a-zA-Z0-9=}{]/g;
function removeComments(content) {
  return bundle.terser.liquid.removeComments ? content.replace(LiquidBlockComments, nil).replace(LiquidLineComments, nil) : content;
}
function minifyLiquidTag(content) {
  return content.replace(LiquidTag, (tag) => "\n" + tag.replace(/#.*?$/gm, nil) + "\n");
}
function minifySchema(file2, content) {
  if (!bundle.terser.liquid.minifySchema)
    return removeComments(content);
  const open2 = content.search(/{%-?\s*schema/);
  if (open2 > -1) {
    const begin = content.indexOf("%}", open2 + 2) + 2;
    const start3 = content.slice(begin);
    const ender = begin + start3.search(/{%-?\s*endschema/);
    if (ender > -1) {
      const parse3 = JSON.parse(content.slice(begin, ender));
      const minified2 = JSON.stringify(parse3, null, 0);
      const schema = content.slice(0, begin) + minified2 + content.slice(ender);
      return removeComments(schema);
    }
    loggers_exports.invalid(file2.relative);
  }
  return removeComments(content);
}
function removeDashes(content) {
  if (!bundle.terser.liquid.stripDashes)
    return content;
  return content;
}
async function htmlMinify(file2, content) {
  try {
    const htmlmin = await htmlMinifierTerser.minify(content, bundle.terser.html);
    return htmlmin;
  } catch (e2) {
    loggers_exports.invalid(file2.relative);
    console.error(e2);
    return null;
  }
}
var transform2 = (file2) => async (data) => {
  if (file2.type === 2 /* Layout */ && bundle.mode.hot) {
    if (!hasSnippet(data))
      data = inject(data);
  }
  if (!bundle.mode.terse) {
    await fsExtra.writeFile(file2.output, data);
    loggers_exports.transform(`${file2.namespace} \u2192 ${byteConvert(file2.size)}`);
    return data;
  }
  let htmlmin;
  if (file2.base.endsWith(".js.liquid")) {
    htmlmin = data.replace(ScriptJsonWhitespace, nil).replace(/(?<=[:,]) +(?=['"{[])/g, nil).replace(/{{%/g, "{ {%").replace(/%}}/g, "%} }").replace(/(?<=[%}]})\s+(?=[\]}])/g, " ").replace(/>\s+(?=[{[])/, ">").replace(/(?<=[}\]])\s<\//g, "</");
  } else if (file2.base.endsWith(".json.liquid")) {
    htmlmin = JSON.stringify(JSON.parse(data), null, 0);
  } else {
    const content = file2.type === 4 /* Section */ ? minifySchema(file2, data) : removeComments(data);
    const htmlterser = await htmlMinify(file2, content);
    htmlmin = minifyLiquidTag(htmlterser);
  }
  loggers_exports.process("HTML Terser", now());
  if (isNil(htmlmin)) {
    await fsExtra.writeFile(file2.output, data);
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, nil);
  await fsExtra.writeFile(file2.output, postmin);
  const size2 = fileSize(data, file2.size);
  if (size2.isSmaller) {
    loggers_exports.transform(`${file2.namespace} ${size2.before} \u2192 gzip ${size2.gzip}`);
  } else {
    loggers_exports.minified("Liquid", size2.before, size2.after, size2.saved);
  }
  return postmin;
};
async function compile2(file2, cb) {
  if (bundle.mode.watch)
    start();
  const read = await fsExtra.readFile(file2.input);
  let input = read.toString();
  if (bundle.mode.build) {
    if (file2.namespace === "layout") {
      if (hasSnippet(input)) {
        input = removeRender(input);
      }
    }
  }
  file2.size = byteSize(input);
  const edit = transform2(file2);
  if (!isType("Function", cb))
    return edit(input);
  const update2 = cb.apply({ ...file2 }, input);
  if (isType("Undefined", update2) || update2 === false) {
    return edit(input);
  } else if (isType("String", update2)) {
    return edit(update2);
  } else if (Buffer.isBuffer(update2)) {
    return edit(update2.toString());
  }
  return edit(input);
}
function parse2(data) {
  try {
    return JSON.parse(data);
  } catch (e2) {
    console.log(e2);
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
async function jsonCompile(file2, data, space = 0) {
  const minified2 = minifyJSON(data, space);
  if (isNil(minified2)) {
    if (bundle.mode.watch)
      stop();
    return data;
  }
  if (space === 0) {
    const size2 = fileSize(minified2, file2.size);
    loggers_exports.minified("JSON", size2.before, size2.after, size2.saved);
  } else {
    loggers_exports.transform(`${file2.namespace} \u2192 ${byteConvert(file2.size)}`);
  }
  if (file2.type === 13 /* Metafield */)
    return minified2;
  fsExtra.writeFile(file2.output, minified2).catch(
    errors_exports.write("Error writing JSON", {
      file: file2.relative
    })
  );
  return minified2;
}
async function compile3(file2, cb) {
  if (bundle.mode.watch)
    start();
  const json = await fsExtra.readFile(file2.input).catch(
    errors_exports.write("Error reading JSON file", {
      file: file2.relative
    })
  );
  if (isBuffer(json)) {
    const read = json.toString();
    file2.size = byteSize(read);
    if (read.trim().length === 0) {
      loggers_exports.skipped(file2, "empty file");
      return null;
    }
    const data = parse2(read);
    if (isEmpty(data)) {
      loggers_exports.skipped(file2, "empty file");
      return null;
    }
    let space = bundle.processor.json.indent;
    const { mode, terser: terser3 } = bundle;
    if (mode.terse) {
      if (file2.type === 12 /* Asset */) {
        if (terser3.json.assets)
          space = 0;
      } else if (file2.type === 6 /* Locale */) {
        if (terser3.json.locales)
          space = 0;
      } else if (file2.type === 1 /* Template */) {
        if (terser3.json.templates)
          space = 0;
      } else if (file2.type === 13 /* Metafield */) {
        if (terser3.json.metafields)
          space = 0;
      } else if (file2.type === 5 /* Config */) {
        if (terser3.json.config)
          space = 0;
      }
    }
    if (!isFunction(cb))
      return jsonCompile(file2, data, space);
    const update2 = cb.apply({ ...file2 }, data);
    if (isUndefined(update2)) {
      return jsonCompile(file2, data, space);
    } else if (isArray2(update2) || isObject(update2)) {
      return jsonCompile(file2, update2, space);
    } else if (isString(update2)) {
      return jsonCompile(file2, parse2(update2), space);
    } else if (isBuffer(update2)) {
      return jsonCompile(file2, parse2(update2.toString()), space);
    }
    return jsonCompile(file2, data, space);
  }
}
async function compile4(file2, cb) {
  const read = await fsExtra.readFile(file2.input);
  if (isEmpty(read.toString())) {
    if (bundle.mode.watch)
      loggers_exports.skipped(file2, "empty file");
    return null;
  }
  const { data, content } = matter__default.default(read);
  if (!has("title", data)) {
    data.title = "";
  }
  if (has("html", data)) {
    bundle.page.export.html = data.html;
  }
  if (has("linkify", data)) {
    bundle.page.export.linkify = data.linkify;
  }
  if (has("breaks", data)) {
    bundle.page.export.breaks = data.breaks;
  }
  const body_html = Markdown__default.default(bundle.page.export).render(content);
  fsExtra.writeFile(path$1.join(cache.pages.uri, file2.base), body_html).catch(
    errors_exports.write("Error writing Page reference", {
      file: file2.relative
    })
  );
  return bundle.mode.build ? body_html : {
    title: data.title,
    body_html
  };
}
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
  if (processor.esbuild.loaded)
    config.watch.clear();
  const result = await esbuild3.build(config.esbuild);
  if (bundle.mode.terse && bundle.mode.build) {
    config.size = byteSize(result.outputFiles[0].text);
  }
  if (bundle.mode.watch) {
    getWatchPaths(config, result.metafile.inputs);
  } else {
    if (!config.watch.has(config.input))
      config.watch.add(config.input);
    if (!bundle.watch.has(config.input))
      bundle.watch.add(config.input);
  }
}
async function getWatchPaths(config, inputs) {
  const { cwd, watch: watch2, mode } = bundle;
  for (const file2 in inputs) {
    if (file2.indexOf("/node_modules/") > -1)
      continue;
    const path2 = path$1.join(cwd, file2);
    if (!config.watch.has(path2))
      config.watch.add(path2);
    if (!watch2.has(path2))
      watch2.add(path2);
    if (mode.watch)
      ;
  }
  if (mode.watch && processor.esbuild.loaded) {
    await pNext().then(() => {
      for (const path2 of config.watch) {
        if (path2.indexOf("/node_modules/") > -1)
          continue;
        if (config.watchCustom !== null && config.watchCustom(path2))
          continue;
        if (!has(path2.slice(cwd.length + 1), inputs)) {
          config.watch.delete(path2);
          watch2.unwatch(path2);
        }
      }
    });
  }
}
function createSnippet(string) {
  return "<script>" + string + "</script>";
}
function runHook(hook2) {
  if (!isType("Function", hook2))
    return false;
  return function(file2, content) {
    const update2 = hook2.apply({ ...file2 }, content);
    if (update2 === false) {
      loggers_exports.external("cancelled");
      return null;
    }
    if (isType("String", update2)) {
      loggers_exports.external("augment");
      return update2;
    }
    if (isBuffer(update2)) {
      loggers_exports.external("augment");
      return update2.toString();
    }
    return content;
  };
}
async function compile5(file2, sync3, hooks2) {
  if (!file2.data)
    return;
  if (bundle.mode.watch)
    start();
  const hook2 = runHook(hooks2);
  const { errors: errors2, wss, mode, cwd } = bundle;
  const trigger2 = file2.data.length;
  const req = [];
  for (const config of file2.data) {
    const {
      key,
      input,
      output,
      snippet: snippet3,
      esbuild: { format }
    } = config;
    try {
      const { metafile, outputFiles, warnings: warnings3 } = await esbuild3.build(config.esbuild);
      if (trigger2 > 1) {
        loggers_exports.nwl();
        loggers_exports.importer(path$1.relative(cwd, input));
      }
      if (mode.watch) {
        await getWatchPaths(config, metafile.inputs);
      }
      if (warnings3.length > 0) {
        esbuild2(warnings3);
      }
      for (const { text, path: path2 } of outputFiles) {
        if (path2.endsWith(".map")) {
          const map = path$1.join(cache.script.uri, file2.base + ".map");
          fsExtra.writeFile(map, text).catch(
            errors_exports.write("Error writing JavaScript Source Map to cache", {
              file: path$1.relative(cwd, map),
              source: file2.relative
            })
          );
        } else {
          if (mode.terse) {
            const { before, after, saved } = fileSize(text, config.size);
            loggers_exports.transform(`${bold(format.toUpperCase())} bundle`);
            loggers_exports.minified(null, before, after, saved);
          } else {
            loggers_exports.transform(`${bold(format.toUpperCase())} bundle \u2192 ${bold(getSizeStr(text))}`);
          }
          let content;
          if (snippet3) {
            content = createSnippet(text);
            if (hook2) {
              content = hook2(file2, content);
              if (content === null)
                continue;
            }
            await fsExtra.writeFile(output, content).catch(
              errors_exports.write("Error writing inline <script> snippet", {
                file: file2.relative
              })
            );
            loggers_exports.transform(`exported as ${bold("snippet")}`);
          } else {
            content = text;
            if (hook2) {
              content = hook2(file2, content);
              if (content === null)
                continue;
            }
            await fsExtra.writeFile(output, content).catch(
              errors_exports.write("Error writing JavaScript asset", {
                file: file2.relative
              })
            );
          }
          if (mode.hot) {
            loggers_exports.syncing(key);
            wss.script(key);
          } else if (!mode.build) {
            loggers_exports.syncing(key);
            req.push(sync3("put", config, content));
          }
        }
      }
      ;
    } catch (e2) {
      if (has("errors", e2)) {
        loggers_exports.invalid(file2.relative);
        errors2.add(input);
        e2.errors.forEach(errors_exports.esbuild);
      }
    }
  }
  if (trigger2 > 1)
    loggers_exports.nwl();
  await Promise.all(req);
}
var postcss3 = null;
var sass3 = null;
async function load(id) {
  if (id === "postcss") {
    const pcss = await import('postcss');
    postcss3 = pcss.default;
    return isNil(postcss3) === false;
  }
  if (id === "sass") {
    sass3 = __require("sass");
    return isNil(sass3) === false;
  }
}
function write3(file2, cb) {
  const scope = isFunction(cb) ? { ...file2 } : false;
  return async function(data) {
    if (isNil(data))
      return null;
    let content;
    if (scope !== false) {
      const update2 = cb.apply({ ...file2 }, Buffer.from(data));
      if (isUndefined(update2) || update2 === false) {
        content = data;
      } else if (isString(update2) || isBuffer(update2)) {
        content = update2;
      }
    } else {
      content = data;
    }
    fsExtra.writeFile(file2.output, content).catch(
      errors_exports.write("Error writing stylesheet to output", {
        input: file2.relative,
        output: path$1.relative(bundle.cwd, file2.output)
      })
    );
    const size2 = fileSize(data, file2.size);
    if (size2.isSmaller) {
      loggers_exports.transform(`${bold("CSS")} ${size2.before} \u2192 gzip ${size2.gzip}`);
    } else {
      loggers_exports.minified("CSS", size2.before, size2.after, size2.saved);
    }
    if (bundle.mode.hot) {
      bundle.wss.stylesheet(file2.key);
    }
    return content;
  };
}
async function sassProcess(file2) {
  const { data } = file2;
  const opts = data.sass === true ? processor.sass.config : data.sass;
  if (file2.ext === ".scss" || file2.ext === ".sass") {
    if (bundle.mode.watch)
      start();
    try {
      const { css, sourceMap } = sass3.compile(data.input, {
        loadPaths: opts.include,
        sourceMapIncludeSources: false,
        sourceMap: opts.sourcemap,
        style: opts.style,
        logger: {
          debug: (msg) => console.log("DEBUG", msg),
          warn: warnings_exports.sass(file2)
        }
      });
      if (opts.sourcemap) {
        const map = path$1.join(cache.style.uri, file2.base + ".map");
        fsExtra.writeFile(map, JSON.stringify(sourceMap)).catch(
          errors_exports.write("Error writing SASS Source Map file to the cache directory", {
            file: path$1.relative(bundle.cwd, map),
            source: file2.relative
          })
        );
      }
      loggers_exports.process("SASS Dart", stop());
      file2.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e2) {
      loggers_exports.invalid(file2.relative);
      errors_exports.sass(file2, e2);
      return null;
    }
  }
  try {
    const css = await fsExtra.readFile(file2.input);
    file2.size = byteSize(css);
    return {
      css: css.toString(),
      map: null
    };
  } catch (e2) {
    loggers_exports.invalid(file2.relative);
    loggers_exports.throws(e2);
    return null;
  }
}
async function postcssProcess(file2, css, map) {
  const { data } = file2;
  try {
    if (bundle.mode.watch)
      start();
    const result = await postcss3(processor.postcss.config).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? { prev: map, inline: false } : null
    });
    if (bundle.mode.watch)
      loggers_exports.process("PostCSS", stop());
    const issues = result.warnings();
    if (issues.length > 0)
      for (const warn2 of issues)
        warnings_exports.postcss(file2, warn2);
    return result.toString();
  } catch (e2) {
    loggers_exports.invalid(file2.relative);
    console.log(e2);
    return null;
  }
}
function snippet2(css) {
  return `<style>${nl + wsr(2) + css}</style>`;
}
async function compile6(file2, cb) {
  if (bundle.mode.watch)
    start();
  const output = write3(file2, cb);
  try {
    const out = await sassProcess(file2);
    if (out === null)
      return null;
    if (isNil(postcss3) || !file2.data.postcss && !file2.data.snippet) {
      return output(out.css);
    }
    if (file2.data.postcss) {
      const post = await postcssProcess(file2, out.css, out.map);
      if (post === null)
        return null;
      if (file2.data.snippet)
        return output(snippet2(post));
    }
    return file2.data.snippet ? output(snippet2(out.css)) : output(out.css);
  } catch (e2) {
    console.log(e2);
    return null;
  }
}
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
  return new Promise(function(resolve, reject) {
    sprite.compile((error4, svg2) => {
      if (error4)
        return reject(error4);
      for (const m in svg2) {
        for (const p in svg2[m]) {
          resolve(svg2[m][p].contents.toString());
        }
      }
    });
  });
}
function compileSprite(context2, request2, _cb) {
  async function run2(config) {
    const file2 = assign({}, context2);
    if (bundle.mode.watch)
      start();
    file2.kind = "SVG Sprite" /* Sprite */;
    if (config.snippet) {
      file2.namespace = "snippets";
      file2.key = path$1.join("snippets", renameFile(file2, config.rename));
      file2.output = path$1.join(bundle.dirs.output, file2.key);
    } else {
      file2.key = path$1.join("assets", renameFile(file2, config.rename));
      file2.output = path$1.join(bundle.dirs.output, file2.key);
    }
    const options = config.sprite === true ? processor.sprite.config : config.sprite;
    const sprite = new SVGSprite(options);
    const items = await mapAsync(getFile, toArray(config.input)).catch(
      errors_exports.write("Error reading an SVG file", {
        file: file2.base,
        source: file2.relative
      })
    );
    if (items) {
      const svgs = items.filter(([path2, svg2]) => {
        if (hasLiquid(svg2)) {
          loggers_exports.skipped(path$1.relative(bundle.cwd, path2), "Liquid Detected");
          return false;
        }
        return true;
      });
      file2.size = 0;
      for (const [path2, svg2, size3] of svgs) {
        sprite.add(path2, null, svg2);
        file2.size = file2.size + size3;
      }
      const content = await getSprite(sprite);
      const length = svgs.length;
      loggers_exports.process("SVG Sprite", `${length} ${plural("SVG", length)}`, stop());
      await fsExtra.writeFile(file2.output, content).catch(
        errors_exports.write("Error writing SVG Sprite", {
          file: file2.key,
          caller: context2.relative
        })
      );
      const size2 = fileSize(content, file2.size);
      if (size2.isSmaller) {
        loggers_exports.transform(`${file2.kind} ${size2.before} \u2192 gzip ${size2.gzip}`);
      } else {
        loggers_exports.minified(file2.kind, size2.before, size2.after, size2.saved);
      }
      if (request2) {
        loggers_exports.syncing(file2.key);
        await request2("put", file2, content);
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
    const before = `${ansi_exports.redBright(`<${ansi_exports.white("path")}>`)}`;
    const after = `${ansi_exports.greenBright(`<${ansi_exports.white("path")} />`)}`;
    loggers_exports.transform(`${before} ${ansi_exports.ARR} ${after} ${ansi_exports.TLD} ${ansi_exports.gray("patched solidus")}`);
    return svg2.replace(/(<path[^>]*[a-zA-Z"'\s])(>)(?!\s*<\/path>)/g, "$1 /$2");
  }
  return svg2;
}
function compileInline(context2, request2, _cb) {
  const file2 = assign({}, context2);
  async function run2(config) {
    if (bundle.mode.watch)
      start();
    if (config.snippet) {
      file2.namespace = "snippets";
      file2.key = path$1.join("snippets", renameFile(file2, config.rename));
      file2.output = path$1.join(bundle.dirs.output, file2.key);
    } else {
      file2.key = path$1.join("assets", renameFile(file2, config.rename));
      file2.output = path$1.join(bundle.dirs.output, file2.key);
    }
    const options = config.svgo === true ? processor.svgo : config.svgo;
    const read = await fsExtra.readFile(file2.input);
    const node = read.toString();
    if (hasLiquid(node)) {
      loggers_exports.skipped(file2, "Liquid Detected");
      return null;
    }
    const patch = patchPathVoids(node);
    file2.size = byteSize(patch);
    let svg2;
    try {
      svg2 = Svgo.optimize(patch, options);
    } catch (error4) {
      loggers_exports.err(error4.toString());
      return null;
    }
    loggers_exports.process("SVGO", stop());
    const { data } = svg2;
    const size2 = fileSize(data, file2.size);
    if (size2.isSmaller) {
      loggers_exports.transform(`${file2.kind} ${size2.before} \u2192 gzip ${size2.gzip}`);
    } else {
      loggers_exports.minified(file2.kind, size2.before, size2.after, size2.saved);
    }
    await fsExtra.writeFile(file2.output, data).catch(
      errors_exports.write("Error writing SVG", {
        file: file2.key,
        caller: context2.relative
      })
    );
    if (request2) {
      loggers_exports.syncing(file2.key);
      await request2("put", file2, data);
    }
  }
  return run2;
}
async function compile7(file2, request2, cb) {
  if (bundle.mode.watch)
    start();
  const sprite = compileSprite(file2, request2);
  const inline = compileInline(file2, request2);
  const length = file2.data.length;
  for (let i = 0; i < length; i++) {
    const config = file2.data[i];
    if (i > 0 && bundle.mode.watch)
      loggers_exports.changed(file2);
    if (config.format === "sprite") {
      await sprite(config);
    }
    if (config.format === "file") {
      await inline(config);
    }
  }
}

// lib/modes/build.ts
async function build2(callback) {
  start();
  const { paths, dirs, watch: watch2, filters, mode } = bundle;
  const hasFilter = isEmpty(filters) === false;
  const parse3 = parseFile(paths, dirs.output);
  const match2 = anymatch3__default.default(toArray(watch2.values()));
  const files = await glob3__default.default("**", {
    onlyFiles: true,
    absolute: true,
    cwd: dirs.input
  });
  const SVG = {};
  const source = files.filter(match2).reduce((acc, path2) => {
    const file2 = parse3(path2);
    if (isUndefined(file2))
      return acc;
    switch (file2.type) {
      case 7 /* Style */:
        acc.styles.files.push(file2);
        break;
      case 8 /* Script */:
        acc.scripts.files.push(file2);
        break;
      case 4 /* Section */:
        acc.sections.files.push(file2);
        break;
      case 2 /* Layout */:
        acc.layouts.files.push(file2);
        break;
      case 3 /* Snippet */:
        acc.snippets.files.push(file2);
        break;
      case 6 /* Locale */:
        acc.locales.files.push(file2);
        break;
      case 5 /* Config */:
        acc.configs.files.push(file2);
        break;
      case 1 /* Template */:
        acc.templates.files.push(file2);
        break;
      case 14 /* Page */:
        acc.pages.files.push(file2);
        break;
      case 12 /* Asset */:
        acc.assets.files.push(file2);
        break;
      case 13 /* Metafield */:
        acc.metafields.files.push(file2);
        break;
      case 9 /* Svg */: {
        for (const { uuid: uuid2, format, input } of file2.data) {
          if (!has(uuid2, SVG)) {
            SVG[uuid2] = true;
            if (format === "sprite") {
              acc.svgs.files.push(file2);
            } else {
              for (const snippet3 of input)
                acc.svgs.files.push(parse3(snippet3));
            }
          }
        }
        break;
      }
    }
    return acc;
  }, {
    styles: {
      time: nil,
      files: [],
      report: null
    },
    scripts: {
      time: nil,
      files: [],
      report: null
    },
    svgs: {
      time: nil,
      files: [],
      report: null
    },
    sections: {
      time: nil,
      files: [],
      report: null
    },
    layouts: {
      time: nil,
      files: [],
      report: null
    },
    templates: {
      time: nil,
      files: [],
      report: null
    },
    snippets: {
      time: nil,
      files: [],
      report: null
    },
    locales: {
      time: nil,
      files: [],
      report: null
    },
    configs: {
      time: nil,
      files: [],
      report: null
    },
    pages: {
      time: nil,
      files: [],
      report: null
    },
    metafields: {
      time: nil,
      files: [],
      report: null
    },
    assets: {
      time: nil,
      files: [],
      report: null
    }
  });
  const handle = (group2, count, call) => async (file2) => {
    start();
    try {
      loggers_exports.build(group2, count, file2);
      const value = await (file2.ext === ".json" ? compile3(file2, callback) : call(file2, callback));
      loggers_exports.out(tui_exports.tree("bottom", ansi_exports.neonGreen(file2.key)));
      if (value === null || isNaN(file2.size)) {
        return {
          name: file2.base,
          input: file2.relative,
          time: stop(),
          output: file2.key,
          error: "Skipped File"
        };
      }
      const done = {
        name: file2.base,
        input: file2.relative,
        output: file2.key,
        error: null,
        time: "",
        size: fileSize(value, file2.size)
      };
      return done;
    } catch (e2) {
      loggers_exports.out(tui_exports.tree("bottom", ansi_exports.redBright(file2.key)));
      return {
        name: file2.base,
        input: file2.relative,
        output: file2.key,
        time: stop(),
        error: e2.message
      };
    }
  };
  for (const id in source) {
    start();
    const item = source[id].files;
    const size2 = item.length;
    if (id === "styles" && mode.style) {
      if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
        continue;
      source[id].report = await mapAsync(handle(id, size2, compile6), item);
      source[id].time = stop();
    } else if (id === "scripts" && mode.script) {
      if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
        continue;
      source[id].report = await mapAsync(handle(id, size2, compile5), item);
      source[id].time = stop();
    } else if (id === "layouts" || id === "snippets" || id === "sections" || id === "templates") {
      if (mode.views) {
        if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
          continue;
        source[id].report = await mapAsync(handle(id, size2, compile2), item);
        source[id].time = stop();
      }
    } else if (id === "locales" || id === "configs" || id === "metafields") {
      if (mode.views) {
        if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
          continue;
        source[id].report = await mapAsync(handle(id, size2, compile3), item);
        source[id].time = stop();
      }
    } else if (id === "pages" && mode.views) {
      if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
        continue;
      source[id].report = await mapAsync(handle(id, size2, compile4), item);
      source[id].time = stop();
    } else if (id === "assets" && mode.views) {
      if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
        continue;
      source[id].report = await mapAsync(handle(id, size2, compile), item);
      source[id].time = stop();
    } else if (id === "svgs" && mode.svg) {
      if (hasFilter && !(has(id, filters) && filters[id].includes(id)))
        continue;
      source[id].report = await mapAsync(handle(id, size2, compile7), item);
      source[id].time = stop();
    }
  }
  loggers_exports.nwl();
  loggers_exports.update(`${line.gray}Build Completed ${gray(`~ ${stop()}`)}`);
  loggers_exports.nwl();
  process.exit(0);
}

// lib/modes/watch.ts
function watch(callback) {
  const request2 = client(bundle.sync);
  const parse3 = parseFile(bundle.paths, bundle.dirs.output);
  bundle.watch.on("all", async function(event2, path2) {
    const file2 = parse3(path2);
    if (isUndefined(file2))
      return;
    if (file2.type !== 15 /* Spawn */)
      loggers_exports.changed(file2);
    if (event2 === "change" || event2 === "add") {
      handler2(file2);
    } else if (event2 === "unlink") {
      return request2.assets("delete", file2);
    }
  });
  async function handler2(file2) {
    try {
      let value = null;
      if (file2.type === 8 /* Script */) {
        return compile5(file2, request2.assets, callback);
      } else if (file2.type === 14 /* Page */) {
        return compile4(file2, callback);
      } else if (file2.type === 9 /* Svg */) {
        return compile7(file2, request2.assets, callback);
      }
      if (file2.type === 7 /* Style */) {
        value = await compile6(file2, callback);
      } else if (file2.type === 4 /* Section */ && file2.kind === "Liquid" /* Liquid */) {
        value = await compile2(file2, callback);
      }
      if (file2.type === 4 /* Section */ && file2.kind === "JSON" /* JSON */) {
        value = await compile3(file2, callback);
      } else if (file2.type === 2 /* Layout */) {
        value = await compile2(file2, callback);
      } else if (file2.type === 3 /* Snippet */) {
        value = await compile2(file2, callback);
      } else if (file2.type === 6 /* Locale */ || file2.type === 5 /* Config */) {
        value = await compile3(file2, callback);
      } else if (file2.type === 13 /* Metafield */) {
        value = await compile3(file2, callback);
        return request2.metafields({ value, namespace: file2.namespace, key: file2.key });
      } else if (file2.type === 1 /* Template */ && file2.kind === "JSON" /* JSON */) {
        value = await compile3(file2, callback);
      } else if (file2.type === 1 /* Template */ && file2.kind === "Liquid" /* Liquid */) {
        value = await compile2(file2, callback);
      } else if (file2.type === 12 /* Asset */ || file2.type === 15 /* Spawn */) {
        value = await compile(file2, callback);
      }
      if (!isNil(value)) {
        loggers_exports.syncing(file2.key);
        await request2.assets("put", file2, value);
        if (bundle.mode.hot) {
          if (file2.type === 4 /* Section */ && file2.kind === "Liquid" /* Liquid */) {
            bundle.wss.section(file2.name);
          } else if (file2.type !== 8 /* Script */ && file2.type !== 7 /* Style */) {
            await queue.onIdle().then(() => bundle.wss.replace());
          }
        }
      }
    } catch (e2) {
      console.error(e2);
      loggers_exports.err(e2);
    }
  }
}

// lib/cli/exit.ts
var trigger = false;
var register = false;
var hooks = /* @__PURE__ */ new Set();
function exit(manual, signal2) {
  if (trigger)
    return;
  trigger = true;
  for (const hook2 of hooks) {
    hook2();
  }
  if (manual) {
    process.exit(128 + signal2);
  }
}
function kill(callback) {
  hooks.add(callback);
  if (!register) {
    register = true;
    process.once("exit", exit);
    process.once("SIGINT", exit.bind(void 0, true, 2));
    process.once("SIGTERM", exit.bind(void 0, true, 15));
    process.on("message", (message2) => {
      if (message2 === "shutdown")
        exit(true, -128);
    });
  }
  return () => hooks.delete(callback);
}
var HOTError = {
  enable: true,
  output: []
};
async function injection() {
  loggers_exports.update(tui_exports.message("gray", "validating snippet injection"));
  const snippet3 = await injectSnippet();
  if (snippet3) {
    loggers_exports.update(tui_exports.message("gray", "validating layouts"));
    for (const layout in bundle.hot.alive) {
      const exists = await fsExtra.pathExists(layout);
      if (!exists) {
        loggers_exports.update(tui_exports.message("gray", "layout has not yet been bundled, building now..."));
        const find3 = isArray2(bundle.config.paths.layout) ? bundle.config.paths.layout : [bundle.config.paths.layout];
        for (const input of find3) {
          const path2 = path$1.join(bundle.dirs.input, input);
          const source = await fsExtra.readFile(path2);
          await fsExtra.writeFile(layout, source);
        }
        loggers_exports.update(tui_exports.message("gray", "layout was bundled from source, injecting hot snippet"));
      }
      const render = await injectRender(layout);
      if (!render) {
        loggers_exports.update.clear();
        loggers_exports.err("Failed to inject hot reload render tag");
      }
    }
    loggers_exports.update.clear();
  } else {
    loggers_exports.update.clear();
    loggers_exports.err("Failed to upload snippet");
  }
}
async function server() {
  if (!HOTError.enable) {
    HOTError.output.push(
      line.red,
      line.red + redBright("Change the socket port address or kill the session occupying it."),
      line.red + redBright("This error typically occurs when multiple Syncify instances are active.")
    );
    loggers_exports.err(redBright(`${bold("ERROR")} on ${bold(`${bundle.hot.method === "hot" ? "HOT" : "LIVE"} Reload:`)}`));
    loggers_exports.out(HOTError.output.join(nl));
    return null;
  }
  loggers_exports.out(tui_exports.message("whiteBright", bold(`${bundle.hot.method === "hot" ? "HOT" : "LIVE"} Reloading:`)));
  loggers_exports.nwl();
  loggers_exports.update(tui_exports.message("gray", "configuring HOT Reload"));
  await injection();
  function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=0");
  }
  const assets = statics__default.default(path$1.join(bundle.dirs.output, "assets"), { setHeaders });
  const server2 = http__default.default.createServer((req, res) => assets(req, res, handler__default.default(req, res)));
  const localhost = `http://localhost:${bundle.hot.server}`;
  const onerror = (e2) => {
    if (e2.code === "EADDRINUSE") {
      HOTError.output.push(
        line.red + redBright(`${bold("EADDRINUSE")} ${ARR} ${localhost}`),
        line.red,
        line.red + redBright.bold(`Server Port ${bundle.hot.server} address already in use`),
        line.red,
        line.red + redBright("Change the server port address or kill the session occupying it."),
        line.red + redBright("This error typically occurs when multiple Syncify instances are active.")
      );
      loggers_exports.update.clear();
      loggers_exports.out(HOTError.output.join(nl));
      bundle.wss.http.close();
      return null;
    }
  };
  const onconnect = () => {
    loggers_exports.update.done();
    server2.removeListener("error", onerror);
    server2.removeListener("connect", onconnect);
  };
  server2.on("error", onerror);
  server2.on("connect", onconnect);
  server2.listen(bundle.hot.server);
  loggers_exports.update(tui_exports.message("pink", `server \u2192 ${bold("assets")} \u2192 ${gray.underline(localhost)}`));
}
function socket() {
  if (bundle.mode.hot === false)
    return;
  const wss = new ws$1.Server({
    port: bundle.hot.socket,
    path: "/ws"
  });
  kill(() => wss.close());
  const onerror = (error4) => {
    if (error4.code === "EADDRINUSE") {
      wss.close();
      HOTError.enable = false;
      HOTError.output.push(
        line.red + redBright(`${bold("EADDRINUSE")} ${ARR} ws://localhost:${bundle.hot.server}`),
        line.red,
        line.red + redBright.bold(`Socket Port ${bundle.hot.server} address already in use`)
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
    wss.on("script", (src) => socket2.send(`script,${src}`));
    wss.on("stylesheet", (href) => socket2.send(`stylesheet,${href}`));
    wss.on("section", (id) => socket2.send(`section,${id}`));
    wss.on("svg", (id) => socket2.send(`svg,${id}`));
    wss.on("assets", () => socket2.send("assets"));
    wss.on("reload", () => socket2.send("reload"));
    wss.on("replace", () => socket2.send("replace"));
  };
  wss.on("close", onclose);
  wss.on("error", onerror);
  wss.on("connection", onconnection);
  return {
    get http() {
      return wss;
    },
    script: (src) => wss.emit("script", path$1.basename(src)),
    stylesheet: (href) => wss.emit("stylesheet", path$1.basename(href)),
    section: (id) => wss.emit("section", id),
    svg: (id) => wss.emit("svg", id),
    assets: () => wss.emit("assets"),
    reload: () => wss.emit("reload"),
    replace: () => wss.emit("replace")
  };
}

// lib/log/stdin.ts
function stdin(data) {
  const input = data.toString().trim().toLowerCase();
  if (input === "v") {
    const items = keys(errors);
    for (let i = 0, l = items.length; i < l; i++) {
      const prop = items[i];
      if (errors[prop].size === 0)
        continue;
      if (i > 0)
        loggers_exports.hline(10);
      loggers_exports.write(ansi_exports.bold.whiteBright(prop));
      for (const message2 of errors[prop].values()) {
        if (typeof message2 === "string" && message2.length > 0) {
          error(message2);
        }
      }
      errors[prop].clear();
    }
    if (bundle.mode.upload) {
      log(tui_exports.closer("Upload"), nl);
      process.exit(0);
    }
  } else if (input === "w") {
    for (const prop in warning.process) {
      if (warning.process[prop].size === 0)
        continue;
      loggers_exports.nwl();
      loggers_exports.write(ansi_exports.bold.yellow(prop));
      loggers_exports.nwl();
      for (const message2 of warning.process[prop].values()) {
        if (typeof message2 === "string" && message2.length > 0) {
          loggers_exports.write(tui_exports.multiline("warning", message2));
        }
      }
      warning.process[prop].clear();
    }
    warning.count = 0;
  }
}

// lib/log/help.ts
`
  ${gray("-----------------------------------------------------------------------------")}
  ${bold("Syncify CLI Examples")}                                             ${gray("by Panoply")}
  ${gray("-----------------------------------------------------------------------------")}

  ${bold("Watching" + COL)}

  ${gray("Targeting 1 store and 1 theme")}:
  $ sync your-store${gray("=")}theme-1 --watch

  ${gray("Targeting 1 store and 2 themes with hot reloading")}:
  $ sync your-store${gray("=")}theme-1,theme-2 --watch --hot

  ${gray("Targeting 2 stores and 1 theme")}:
  $ sync --your-store${gray("=")}theme-1 --another-store${gray("=")}some-theme --watch

  ${gray("Targeting 2 stores and 2 themes")}:
  $ sync --your-store${gray("=")}theme-1,theme-2 --another-store${gray("=")}some-theme,test-theme --watch

  ${gray("Targeting 1 store with 2 themes and clean mode with hot live reloads")}:
  $ sync your-store${gray("=")}theme-1,theme-2 --watch --clean --hot

  ${gray("Targeting 1 store with 2 themes in production mode")}:
  $ sync your-store${gray("=")}theme-1,theme-2 --prod --watch

`;
var help = `
  ${gray("-----------------------------------------------------------------------------")}
  ${bold("Syncify")}  <!version!>                                               ${gray("by Panoply")}
  ${gray("-----------------------------------------------------------------------------")}

  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined stores, themes and setup credentials within a ${gray(".env")} file.

  ${bold("Aliases" + COL)}

  $ sync

  ${bold("Commands" + COL)}

  $ syncify                    ${gray.italic("Interactive prompt")}
  $ syncify {store} [theme]    ${gray.italic("Prints list of connected stores")}

  ${bold("Themes" + COL)}

       --<store>    [theme]     ${gray.italic("A store reference command (run examples)")}
    -t, --theme     [theme]     ${gray.italic("A comma seprated list of themes")}

  ${bold("Paths" + COL)}

    -c, --config    <path>     ${gray.italic("Set configs path")}
    -i, --input     <path>     ${gray.italic("Set input path")}
    -o, --output    <path>     ${gray.italic("Set output path")}

  ${bold("Utility" + COL)}

    -f, --filter    <path>     ${gray.italic("Glob path, use with pull or push triggers")}

  ${bold("Environment" + COL)}

    --dev                      ${gray.italic("Build in development mode (default)")}
    --prod                     ${gray.italic("Build in production mode")}
    --hot                      ${gray.italic("Run watch with hot-reloads")}

  ${bold("Modes" + COL)}

    -w, --watch                ${gray.italic("Run watch mode")}
    -b, --build                ${gray.italic("Run build mode from input")}
    -u, --upload               ${gray.italic("Run upload mode theme to stores")}
    -d, --download             ${gray.italic("Run download mode from theme and stores")}
    -m, --metafields           ${gray.italic("Run metafields resource mode")}
    -p, --pages                ${gray.italic("Run pages resource mode")}
    -r, --redirects            ${gray.italic("Run redirects resource mode")}

  ${bold("Resource" + COL)}

    --pull                     ${gray.italic("Pull a resource from a shop or theme")}
    --push                     ${gray.italic("Push a resource to a shop or theme")}
    --silent                   ${gray.italic("Silent logs, only warnings or errors are printed")}

  ${bold("Trigger" + COL)}

    --spawn   [list]           ${gray.italic("Invoke a defined spawn child process/s")}
    --delete  [list]           ${gray.italic("Delete a remote and local file")}
    --minify  [list]           ${gray.italic("invoke minify mode, accepts resource/s")}

  ${bold("Other" + COL)}

    --strap                    ${gray.italic("Import a strap into the project")}
    --vsc                      ${gray.italic("Generate vscode specific settings")}
    --help                     ${gray.italic("Show the screen")}

  ${bold("Help" + COL)}

    -h, --help                 ${gray.italic("Print this screen")}
    -h, --help  {examples}     ${gray.italic("Print a list of command examples")}

 ${gray("-----------------------------------------------------------------------------")}

`;
function spawned(name, command, callback) {
  const child = spawn3__default.default(command.cmd, command.args, { stdio: "pipe" });
  child.stdio[0].on("data", callback);
  child.stdio[1].on("data", callback);
  child.stdio[2].on("data", callback);
  command.pid = child.pid;
  bundle.spawn.streams.set(name, child);
}
function defaultGetOutputFile(filepath, format) {
  return filepath.replace(REGEX_EXTJS, `.bundled_${uuid()}.${format === "esm" ? "mjs" : "cjs"}`);
}
function isCommonJSorESM(inputFile) {
  if (typeof jest === "undefined")
    return "cjs";
  const ext = path$1.extname(inputFile);
  if (ext === ".js") {
    return bundle.pkg.type === "module" ? "esm" : "cjs";
  } else if (ext === ".ts") {
    return "esm";
  } else if (ext === ".mjs") {
    return "esm";
  }
  return "cjs";
}
function tsconfigPathsToRegExp(paths) {
  return keys(paths || {}).map((key) => new RegExp(`^${key.replace(/\*/, ".*")}$`));
}
function match(id, patterns) {
  if (!patterns)
    return false;
  return patterns.some((p) => {
    if (p instanceof RegExp)
      return p.test(id);
    return id === p || id.startsWith(p + "/");
  });
}
function externalPlugin({
  external: external2,
  notExternal
} = {}) {
  return {
    name: "bundle-require:external",
    setup({ onResolve }) {
      onResolve({ filter: /.*/ }, async (args) => {
        if (args.path.charCodeAt(0) === 46 || path$1.isAbsolute(args.path))
          return;
        if (match(args.path, external2))
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
        __dirname: DIRNAME_VAR_NAME,
        __filename: FILENAME_VAR_NAME,
        "import.meta.url": IMPORT_META_URL_VAR_NAME
      };
      ctx.onLoad({ filter: REGEX_EXTJS }, async (args) => {
        const contents = await fsExtra.readFile(args.path, "utf-8");
        const injectLines = [
          `const ${FILENAME_VAR_NAME} = ${JSON.stringify(args.path)};`,
          `const ${DIRNAME_VAR_NAME} = ${JSON.stringify(path$1.dirname(args.path))};`,
          `const ${IMPORT_META_URL_VAR_NAME} = ${JSON.stringify(url.pathToFileURL(args.path).href)};`
        ];
        return {
          contents: injectLines.join("") + contents,
          loader: inferLoader(path$1.extname(args.path))
        };
      });
    }
  };
}
async function bundleRequire(options) {
  if (!REGEX_EXTJS.test(options.filepath))
    throw new Error(`${options.filepath} is not a valid JS file`);
  const preserveTemporaryFile = options.preserveTemporaryFile ?? !!process.env.BUNDLE_REQUIRE_PRESERVE;
  const cwd = options.cwd || process.cwd();
  const format = options.format ?? isCommonJSorESM(options.filepath);
  const tsc = loadTsconfig.loadTsConfig(cwd, options.tsconfig);
  const resolvePaths = tsconfigPathsToRegExp(tsc?.data.compilerOptions?.paths || {});
  async function extractResult(result) {
    if (!result.outputFiles)
      throw new Error("[bundle-require] no output files");
    const { text } = result.outputFiles[0];
    const getOutputFile = options.getOutputFile || defaultGetOutputFile;
    const outfile = getOutputFile(options.filepath, format);
    await fsExtra.writeFile(outfile, text, "utf8");
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
      ...options.esbuildOptions?.plugins || [],
      externalPlugin({
        external: options.external,
        notExternal: resolvePaths
      }),
      injectFileScopePlugin()
    ]
  });
  const extract = await extractResult(ctx);
  return extract;
}

// lib/options/files.ts
async function configFile(cwd) {
  let path2 = null;
  for (const file2 of [
    "syncify.config.js",
    "syncify.config.mjs",
    "syncify.config.cjs",
    "syncify.config.ts",
    "syncify.config.json"
  ]) {
    path2 = path$1.join(cwd, file2);
    const exists = await fsExtra.pathExists(path2);
    if (exists)
      break;
    path2 = null;
  }
  if (path2 === null)
    return null;
  try {
    if (path2.endsWith(".json")) {
      bundle.file.path = path2;
      bundle.file.relative = path$1.relative(cwd, path2);
      bundle.file.base = path$1.basename(path2);
      const json = await fsExtra.readFile(path2);
      return jsonc(json.toString());
    } else {
      bundle.file.path = path2;
      bundle.file.relative = path$1.relative(cwd, path2);
      bundle.file.base = path$1.basename(path2);
      const config = await bundleRequire({ filepath: path2 });
      return config.mod.syncify || config.mod.default || config.mod;
    }
  } catch (e2) {
    console.log(e2);
    const jsonconfig = path$1.join(cwd, "syncify.config.json");
    const hasFile = await fsExtra.pathExists(jsonconfig);
    if (hasFile)
      return fsExtra.readJson(jsonconfig);
    return null;
  }
}
async function getPackageJson(cwd) {
  const uri2 = path$1.join(cwd, "package.json");
  const has3 = await fsExtra.pathExists(uri2);
  if (!has3)
    throw new Error('Missing "package.json" file');
  try {
    bundle.pkg = await fsExtra.readJson(uri2);
  } catch (e2) {
    throw new Error(e2);
  }
}
async function setCacheDirs(path2, options = { purge: false }) {
  bundle.dirs.cache = `${path2}/`;
  const hasBase = await fsExtra.pathExists(path2);
  if (!hasBase) {
    try {
      await fsExtra.mkdir(path2);
    } catch (e2) {
      throw new Error(e2);
    }
  }
  for (const dir of CACHE_DIRS) {
    if (dir === "sections") {
      cache[dir] = [];
    } else {
      cache[dir] = {};
      const uri2 = path$1.join(path2, dir, "/");
      const has3 = await fsExtra.pathExists(uri2);
      if (!has3) {
        try {
          await fsExtra.mkdir(uri2);
        } catch (e2) {
          throw new Error(e2);
        }
        assign(cache[dir], { uri: uri2, data: {} });
      } else {
        if (options.purge)
          await fsExtra.emptyDir(uri2);
      }
      assign(cache[dir], { uri: uri2, data: {} });
    }
  }
  fsExtra.writeJson(path$1.join(path2, "store.map"), cache, { spaces: 0 }, (e2) => {
    if (e2)
      throw e2;
  });
}
async function setThemeDirs(basePath2) {
  const hasBase = await fsExtra.pathExists(basePath2);
  if (hasBase) {
    if (bundle.mode.clean) {
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
    const uri2 = path$1.join(basePath2, dir);
    const has3 = await fsExtra.pathExists(uri2);
    if (!has3) {
      try {
        await fsExtra.mkdir(uri2);
      } catch (e2) {
        throw new Error(e2);
      }
    }
  }
}
function setBaseDirs(cli) {
  const { config, cwd, mode, dirs } = bundle;
  const base = basePath(cwd);
  for (const [dir, def] of BASE_DIRS) {
    let path2;
    if (dir === "import") {
      if (mode.download) {
        if (has("output", cli)) {
          bundle.dirs[dir] = base(cli.output);
        } else {
          bundle.dirs[dir] = base(config.import);
        }
      } else {
        bundle.dirs[dir] = base(config.import);
      }
      continue;
    } else if (dir === "export") {
      if (mode.download) {
        if (has("output", cli)) {
          bundle.dirs[dir] = base(cli.output);
        } else {
          bundle.dirs[dir] = base(config.export);
        }
      } else {
        bundle.dirs[dir] = base(config.export);
      }
      continue;
    } else if (has(dir, cli) && cli[dir] === def) {
      if (config[dir] === def) {
        bundle.dirs[dir] = base(cli[dir]);
        continue;
      } else {
        path2 = config[dir];
      }
    } else if (isString(cli[dir])) {
      path2 = cli[dir];
    } else {
      path2 = config[dir];
    }
    if (isArray2(path2)) {
      const roots = uniq(path2.map(base));
      dirs[dir] = roots.length === 1 ? roots[0] : roots;
    } else if (isString(path2)) {
      dirs[dir] = base(path2);
    } else {
      typeError({
        option: "config",
        name: dir,
        provided: path2,
        expects: "string"
      });
    }
  }
  bundle.watch.add(bundle.file.path);
}
async function setImportDirs() {
  const { dirs, sync: sync3, mode } = bundle;
  if (!mode.download)
    return;
  const hasBase = await fsExtra.pathExists(dirs.import);
  if (!hasBase) {
    try {
      await fsExtra.mkdir(dirs.import);
    } catch (e2) {
      throw new Error(e2);
    }
  }
  for (const theme2 in sync3.themes) {
    const { store, target } = sync3.themes[theme2];
    const dir = path$1.join(dirs.import, store);
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
    await setThemeDirs(path$1.join(dir, target));
  }
}
function setSectionOptions(config) {
  if (!has("sections", config.views))
    return;
  const { sections } = config.views;
  if (isNil(config.views.sections))
    return;
  if (isObject(sections) && isEmpty(sections))
    return;
  if (!isObject(sections)) {
    typeError({
      option: "views",
      name: "sections",
      expects: "{}",
      provided: typeof sections
    });
  }
  for (const option in bundle.section) {
    if (option === "prefixDir") {
      if (isBoolean(sections[option])) {
        bundle.section[option] = sections[option];
        continue;
      } else {
        typeError({
          option: "views.sections",
          name: option,
          provided: sections[option],
          expects: "boolean"
        });
      }
    }
    if (option === "separator") {
      if (isString(sections[option])) {
        if (/[@:_-]/.test(sections[option])) {
          bundle.section[option] = sections[option];
          continue;
        } else {
          invalidError("view.sections", option, sections[option], "@ | _ | : | -");
        }
      } else {
        typeError({
          option: "views.sections",
          name: option,
          provided: sections[option],
          expects: "string"
        });
      }
    }
    if (option === "global") {
      const globals = isString(sections[option]) ? [sections[option]] : sections[option];
      if (isArray2(globals)) {
        if (globals.length > 0) {
          bundle.section[option] = new RegExp(`${globals.join("|")}`);
          continue;
        }
      } else {
        typeError({
          option: "views.sections",
          name: option,
          provided: sections[option],
          expects: "string | string[]"
        });
      }
    }
  }
}
function setSnippetOptions(config) {
  if (!has("snippets", config.views))
    return;
  const { snippets } = config.views;
  if (isNil(snippets))
    return;
  if (isObject(snippets) && isEmpty(snippets))
    return;
  if (!isObject(snippets)) {
    typeError({
      option: "views",
      name: "snippets",
      expects: "{}",
      provided: typeof snippets
    });
  }
  for (const option in bundle.snippet) {
    if (option === "prefixDir") {
      if (isBoolean(snippets[option])) {
        bundle.snippet[option] = snippets[option];
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
          bundle.section[option] = snippets[option];
          continue;
        } else {
          invalidError("sections", option, snippets[option], "@ | _ | : | - | .");
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
          bundle.snippet[option] = new RegExp(`${globals.join("|")}`);
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
function setJsonOptions(config) {
  if (!has("json", config.processors))
    return;
  const { json } = config.processors;
  if (isNil(json))
    return;
  if (isObject(json) && isEmpty(json))
    return;
  if (!isObject(json)) {
    typeError({
      option: "processors",
      name: "json",
      expects: "{}",
      provided: typeof json
    });
  }
  for (const option in json) {
    if (option === "indent") {
      if (isNumber(json[option])) {
        processor.json[option] = json[option];
        continue;
      } else {
        typeError({
          option: "json",
          name: option,
          provided: json[option],
          expects: "number"
        });
      }
    }
    if (option === "useTab") {
      if (isBoolean(json[option])) {
        processor.json[option] = json[option];
        continue;
      } else {
        typeError({
          option: "json",
          name: option,
          provided: json[option],
          expects: "boolean"
        });
      }
    }
    if (option === "exclude") {
      const exclude = isString(json[option]) ? [json[option]] : json[option];
      if (isArray2(exclude)) {
        processor.json[option] = anymatch3__default.default(exclude);
        continue;
      } else {
        typeError({
          option: "json",
          name: option,
          provided: exclude[option],
          expects: "string | string[]"
        });
      }
    }
  }
}
function getModules(pkg, name) {
  if (has("devDependencies", pkg) && has(name, pkg.devDependencies)) {
    if (has(name, pkg.devDependencies))
      return true;
  }
  if (has("dependencies", pkg)) {
    if (has(name, pkg.dependencies))
      return true;
  }
  if (has("peerDependencies", pkg)) {
    if (has(name, pkg.peerDependencies))
      return true;
  }
  if (has("optionalDependencies", pkg)) {
    if (has(name, pkg.peerDependencies))
      return true;
  }
  return false;
}
async function getConfigFilePath(filename) {
  for (const ext of ["js", "cjs", "mjs"]) {
    const filepath = `${filename}.${ext}`;
    const fileExists = await fsExtra.pathExists(`${filepath}.${ext}`);
    if (fileExists)
      return filepath;
  }
  return null;
}
async function readConfigFile(filename) {
  try {
    const path2 = await getConfigFilePath(filename);
    if (path2 !== null) {
      const config = await bundleRequire({ filepath: path2 });
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
function renameFile2(src, rename) {
  let name = rename;
  const dir = lastPath(src);
  const ext = path$1.extname(src);
  const file2 = path$1.basename(src, ext);
  if (isUndefined(rename))
    return { dir, ext, file: file2, name: file2 };
  if (/(\[dir\])/.test(name))
    name = name.replace("[dir]", dir);
  if (/(\[file\])/.test(name))
    name = name.replace("[file]", file2);
  if (/(\.?\[ext\])/.test(name))
    name = name.replace(/\.?\[ext\]/, ext);
  return {
    ext,
    file: file2,
    dir,
    name: rename.replace(rename, name)
  };
}
function authURL(domain, env2, type2) {
  let api_token = domain + "_api_token";
  if (!has(api_token, env2))
    api_token = api_token.toUpperCase();
  if (has(api_token, env2)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { "X-Shopify-Access-Token": env2[api_token] }
    };
  }
  let api_key = domain + "_api_key";
  let api_secret = domain + "_api_secret";
  if (!has(api_key, env2))
    api_key = api_key.toUpperCase();
  if (!has(api_secret, env2))
    api_secret = api_secret.toUpperCase();
  if (has(api_key, env2) && has(api_secret, env2)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: env2[api_key],
        password: env2[api_secret]
      }
    };
  }
  if (type2 === 1 /* DOTENV */) {
    throwError(`Invalid or missing ${cyan(domain + ".myshopify.com")} credentials`, [
      `Your shop credentials in the ${cyan.bold(".env")} file could`,
      "not be read correctly or are missing."
    ]);
  } else if (type2 === 2 /* VARENV */) {
    throwError(`Missing credentials for: ${cyan(domain + ".myshopify.com")}`, `
    You need to provide shop credentials within a ${cyan.bold(".env")} file.
    Please check you project setup and ensure you have correctly provided authorization.`);
  }
}
function getResolvedPaths(filePath, hook2) {
  const { cwd } = bundle;
  const match2 = isFunction(hook2) ? [] : false;
  const warn2 = warnOption("Path Resolver");
  const path2 = normalPath(bundle.dirs.input);
  if (isArray2(filePath)) {
    const paths = [];
    for (const item of filePath) {
      const uri2 = path2(item);
      const resolved = glob3__default.default.sync(uri2, {
        cwd,
        absolute: true
      });
      if (match2) {
        const test = hook2(uri2);
        if (isString(test)) {
          match2.push(test);
        } else if (isArray2(test)) {
          match2.push(...test);
        }
      }
      if (resolved.length === 0) {
        warn2("No files can be resolved in", item);
      } else {
        paths.push(...resolved);
      }
    }
    return match2 ? { paths, match: anymatch3__default.default(match2) } : paths;
  }
  if (isString(filePath)) {
    const uri2 = path2(filePath);
    const paths = glob3__default.default.sync(uri2, { cwd });
    if (paths.length === 0) {
      warn2("No files can be resolved in", filePath);
    }
    if (match2) {
      const test = hook2(uri2);
      if (isString(test)) {
        match2.push(test);
      } else if (isArray2(test)) {
        match2.push(...test);
      }
    }
    return match2 ? { paths, match: anymatch3__default.default(match2) } : paths;
  }
  typeError({
    option: "uri",
    name: "uri/path",
    provided: filePath,
    expects: "string | string[]"
  });
}
function getTransform(transforms, opts) {
  if (!has("assertSnippet", opts))
    opts.assertSnippet = true;
  if (isString(transforms)) {
    const { paths, match: match2 } = getResolvedPaths(transforms, (watch2) => {
      if (opts.addWatch)
        bundle.watch.add(watch2);
      return globPath(watch2);
    });
    if (paths) {
      if (opts.flatten) {
        return paths.map((input) => opts.assertSnippet ? {
          input,
          rename: path$1.basename(input),
          snippet: false
        } : {
          input,
          rename: path$1.basename(input)
        });
      } else {
        const returnValue = {
          input: paths,
          rename: "[name].[ext]",
          match: match2
        };
        if (opts.assertSnippet)
          returnValue.snippet = false;
        return returnValue;
      }
    }
  } else if (isArray2(transforms)) {
    if (transforms.every(isString)) {
      const { paths, match: match2 } = getResolvedPaths(transforms, (watch2) => {
        if (opts.addWatch)
          bundle.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.flatten) {
        return paths.map((input) => opts.assertSnippet ? {
          input,
          rename: path$1.basename(input),
          snippet: false
        } : {
          input,
          rename: path$1.basename(input)
        });
      } else {
        const returnValue = {
          input: paths,
          rename: "[name].[ext]",
          match: match2
        };
        if (opts.assertSnippet)
          returnValue.snippet = false;
        return returnValue;
      }
    } else if (transforms.every(isObject)) {
      return transforms.map((option) => {
        if (!has("input", option)) {
          invalidError("tranform", "input", option, "{ input: string | string[] }");
        }
        const { paths, match: match2 } = getResolvedPaths(transforms, (watch2) => {
          if (opts.addWatch)
            bundle.watch.add(watch2);
          return globPath(watch2);
        });
        option.match = match2;
        option.input = paths;
        if (opts.assertSnippet && !has("snippet", option))
          option.snippet = false;
        if (!has("rename", option)) {
          option.rename = option.snippet ? "[name].liquid" : "[name].[ext]";
        }
        return option;
      });
    }
  } else if (isObject(transforms)) {
    const config = [];
    if (has("input", transforms)) {
      const { paths, match: match2 } = getResolvedPaths(transforms.input, (watch2) => {
        if (opts.addWatch)
          bundle.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.assertSnippet && !has("snippet", transforms)) {
        transforms.snippet = false;
      }
      if (!has("rename", transforms)) {
        transforms.rename = transforms.snippet ? "[name].liquid" : "[name].[ext]";
      }
      if (opts.flatten) {
        for (const input of paths) {
          config.push(assign(transforms, { input }));
        }
      } else {
        transforms.input = paths;
        transforms.match = match2;
        config.push(transforms);
      }
    } else {
      for (const prop in transforms) {
        const o2 = { snippet: prop.startsWith("snippets/") };
        const asset = prop.startsWith("assets/");
        const option = transforms[prop];
        const rename = asset || o2.snippet;
        if (isString(option)) {
          if (rename)
            o2.rename = asset ? prop.slice(7) : prop.slice(9);
          const { paths, match: match2 } = getResolvedPaths(option, (watch2) => {
            if (opts.addWatch)
              bundle.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths) {
            if (opts.flatten) {
              for (const input of paths)
                config.push(assign({}, o2, { input }));
            } else {
              config.push(assign({}, o2, { input: paths, match: match2 }));
            }
          }
        } else if (isObject(option)) {
          if (!has("input", option)) {
            invalidError("tranform", prop, option, "{ input: string | string[] }");
          }
          const { paths, match: match2 } = getResolvedPaths(option.input, (watch2) => {
            if (opts.addWatch)
              bundle.watch.add(watch2);
            return globPath(watch2);
          });
          if (paths) {
            const merge = rename ? assign({}, option, o2, { rename: asset ? prop.slice(7) : prop.slice(9) }) : assign({}, o2, option);
            if (opts.flatten) {
              for (const input of paths)
                config.push(assign({}, merge, { input }));
            } else {
              config.push(assign(merge, { input: paths, match: match2 }));
            }
          }
        } else if (isArray2(option)) {
          if (option.every(isString)) {
            const { paths, match: match2 } = getResolvedPaths(option, (watch2) => {
              if (opts.addWatch)
                bundle.watch.add(watch2);
              return globPath(watch2);
            });
            if (hasRenamespace(prop))
              o2.rename = path$1.basename(prop);
            if (paths) {
              if (opts.flatten) {
                for (const input of paths) {
                  config.push(assign({}, o2, { input }));
                }
              } else {
                config.push(assign({}, o2, { input: paths, match: match2 }));
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
function getModules2(name) {
  const { pkg } = bundle;
  return anyTrue(
    has("devDependencies", pkg) && has(name, pkg.devDependencies),
    has("dependencies", pkg) && has(name, pkg.dependencies),
    has("peerDependencies", pkg) && has(name, pkg.peerDependencies),
    has("optionalDependencies", pkg) && has(name, pkg.peerDependencies)
  );
}
function renameFile3(src, rename) {
  let name = rename;
  const dir = lastPath(src);
  const ext = path$1.extname(src);
  const file2 = path$1.basename(src, ext);
  if (isUndefined(rename))
    return { dir, ext, file: file2, name: file2 };
  if (/(\[dir\])/.test(name))
    name = name.replace("[dir]", dir);
  if (/(\[file\])/.test(name))
    name = name.replace("[file]", file2);
  if (/(\.?\[ext\])/.test(name))
    name = name.replace(/\.?\[ext\]/, ext);
  return {
    ext,
    file: file2,
    dir,
    name: rename.replace(rename, name)
  };
}
async function setScriptOptions(config) {
  if (!has("script", config.transforms))
    return;
  if (config.transforms.script === false)
    return;
  const warn2 = warnOption("script transform option");
  const { esbuild: esbuild4 } = processor;
  const { script: script2 } = config.transforms;
  esbuild4.installed = getModules(bundle.pkg, "esbuild");
  if (esbuild4.installed) {
    const loaded = esbuildModule();
    if (!loaded) {
      throwError(
        "failed to import ESBuild",
        "Ensure you have installed esbuild"
      );
    }
    const esbuildConfigFile = await readConfigFile("esbuild.config");
    if (esbuildConfigFile !== null) {
      esbuild4.file = esbuildConfigFile.path;
      esbuild4.config = mergerino_min_default(esbuild4.config, esbuildConfigFile.config);
    }
  } else {
    missingDependency("esbuild");
  }
  if (has("entryPoints", esbuild4.config)) {
    warn2("processor option is not allowed and was omitted", "entryPoints");
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
  if (!has("absWorkingDir", esbuild4.config)) {
    esbuild4.config.absWorkingDir = bundle.cwd;
  }
  for (const transform3 of transforms) {
    const { snippet: snippet3 } = transform3;
    const keyDir = snippet3 ? "snippets" : "assets";
    const { name } = renameFile3(transform3.input, transform3.rename);
    let rename;
    if (!name.endsWith(".js") && !name.endsWith(".mjs")) {
      rename = name + ".js";
    } else if (name.endsWith(".cjs")) {
      invalidError("rename", "file extension", name, ".js | .mjs");
    } else {
      rename = name;
    }
    if (snippet3 && !/\.liquid$/.test(rename))
      rename = rename + ".liquid";
    const scriptBundle = {
      uuid: uuid(),
      snippet: snippet3,
      input: transform3.input,
      output: path$1.join(bundle.dirs.output, keyDir, rename),
      key: path$1.join(keyDir, rename),
      namespace: transform3.snippet ? "snippets" : "assets",
      size: NaN,
      watch: null,
      watchCustom: null,
      esbuild: null
    };
    esbuild4.config.outfile = scriptBundle.output;
    if (bundle.mode.watch) {
      bundle.watch.unwatch(scriptBundle.output);
    }
    if (has("esbuild", transform3)) {
      if (isBoolean(transform3.esbuild) || isNil(transform3.esbuild)) {
        if (isEmpty(esbuildOptions)) {
          scriptBundle.esbuild = mergerino_min_default(esbuild4.config);
        } else {
          scriptBundle.esbuild = mergerino_min_default(esbuild4.config, esbuildOptions);
        }
      } else if (typeof transform3.esbuild === "object") {
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
          if (prop === "entryPoints" && has(prop, transform3.esbuild)) {
            warn2('Option is not allowed, use Syncify "input" instead', prop);
          } else if (prop === "outdir" && has(prop, transform3.esbuild)) {
            warn2("Option is not allowed, Syncify will handle output", prop);
          } else if (prop === "watch" && has(prop, transform3.esbuild)) {
            warn2("Option is not allowed, declare watch using Syncify", prop);
          } else if (has(prop, transform3.esbuild)) {
            warn2("Option is not allowed and will be ignored", prop);
          }
        }
        if (has("plugins", transform3.esbuild) && has("plugins", esbuild4.config)) {
          transform3.esbuild.plugins.unshift(...esbuild4.config.plugins);
        }
        if (isEmpty(esbuildOptions)) {
          scriptBundle.esbuild = mergerino_min_default(esbuild4.config, transform3.esbuild);
        } else {
          scriptBundle.esbuild = mergerino_min_default(esbuild4.config, transform3.esbuild, esbuildOptions);
        }
      } else {
        typeError({
          option: "script",
          name: "esbuild",
          provided: typeof transform3.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      if (isEmpty(esbuildOptions)) {
        scriptBundle.esbuild = esbuild4.config;
      } else {
        scriptBundle.esbuild = mergerino_min_default(esbuild4.config, esbuildOptions);
      }
    }
    scriptBundle.esbuild.entryPoints = [scriptBundle.input];
    if (bundle.mode.watch) {
      if (!has("watch", transform3)) {
        scriptBundle.watch = /* @__PURE__ */ new Set();
      } else {
        if (!isArray2(transform3.watch)) {
          typeError({
            option: "script",
            name: "watch",
            provided: transform3.watch,
            expects: "string[]"
          });
        }
        const watchers = getResolvedPaths(transform3.watch);
        scriptBundle.watchCustom = anymatch3__default.default(watchers);
        scriptBundle.watch = new Set(watchers);
      }
    } else {
      scriptBundle.watch = /* @__PURE__ */ new Set();
    }
    try {
      await esbuildBundle(scriptBundle);
    } catch (e2) {
      throw new Error(e2);
    }
    if (bundle.mode.terse) {
      scriptBundle.esbuild = mergerino_min_default(scriptBundle.esbuild, bundle.terser.script, {
        exclude: void 0
      });
    }
    bundle.script.push(scriptBundle);
  }
  esbuild4.loaded = true;
}
async function setStyleConfig(config) {
  if (!has("style", config.transforms))
    return;
  const { postcss: postcss4, sass: sass4 } = processor;
  const warn2 = warnOption("style transform option");
  sass4.installed = getModules(bundle.pkg, "sass");
  if (sass4.installed) {
    const loaded = await load("sass");
    if (!loaded) {
      throwError("Unable to dynamically import SASS", "Ensure you have installed sass");
    }
  }
  postcss4.installed = getModules(bundle.pkg, "postcss");
  if (postcss4.installed) {
    const loaded = await load("postcss");
    if (!loaded) {
      throwError("Unable to dynamically import PostCSS", "Ensure you have installed postcss");
    }
    const pcss = await readConfigFile("postcss.config");
    if (pcss !== null) {
      postcss4.file = pcss.path;
      postcss4.config = pcss.config;
    }
  }
  const styles2 = getTransform(config.transforms.style, {
    addWatch: false,
    flatten: true
  });
  const path2 = normalPath(config.input);
  for (const style2 of styles2) {
    const compile8 = {
      uuid: uuid(),
      input: style2.input,
      watch: null,
      postcss: false,
      sass: false
    };
    if (has("postcss", style2)) {
      if (!postcss4.installed)
        missingDependency("postcss");
      if (isArray2(style2.postcss)) {
        compile8.postcss = style2.postcss;
      } else {
        const override = isObject(style2.postcss);
        if ((isBoolean(style2.postcss) || override) && !isNil(style2.postcss)) {
          if (style2.postcss !== false) {
            if (!postcss4.installed)
              missingDependency("postcss");
            compile8.postcss = override ? mergerino_min_default(postcss4.config, style2.postcss) : true;
          }
        } else {
          typeError({
            option: "style",
            name: "postcss",
            provided: compile8.postcss,
            expects: "boolean | {}"
          });
        }
      }
    }
    if (has("sass", style2) && style2.sass !== false && sass4.installed === true) {
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && !isNil(style2.sass)) {
        if (!sass4.installed)
          missingDependency("sass");
        if (!override) {
          defineProperty(compile8, "sass", { get() {
            return style2.sass;
          } });
        } else {
          compile8.sass = assign(sass4.config, style2.sass);
          for (const option in style2.sass) {
            if (option === "sourcemap" || option === "warnings") {
              if (isBoolean(style2.sass[option])) {
                compile8.sass[option] = style2.sass[option];
              } else {
                typeError({
                  option: "sass",
                  name: option,
                  provided: style2.sass[option],
                  expects: "boolean"
                });
              }
            } else if (option === "style") {
              if (!isString(style2.sass[option])) {
                typeError({
                  option: "sass",
                  name: option,
                  provided: style2.sass[option],
                  expects: "string"
                });
              }
              if (style2.sass[option] === "expanded" || style2.sass[option] === "compressed") {
                compile8.sass[option] = style2.sass[option];
              } else {
                invalidError("sass", option, style2.sass[option], "expanded | compressed");
              }
            } else if (option === "includePaths") {
              if (isArray2(style2.sass[option])) {
                compile8.sass[option] = uniq(style2.sass[option]).map((p) => path$1.join(bundle.cwd, p));
              } else {
                typeError({
                  option: "sass",
                  name: option,
                  provided: style2.sass[option],
                  expects: "string[]"
                });
              }
            }
          }
        }
      } else {
        typeError({
          option: "style",
          name: "sass",
          provided: style2.sass,
          expects: "boolean | {}"
        });
      }
      if (!style2.snippet && !/\.s[ac]ss/.test(path$1.extname(compile8.input))) {
        warn2("Input is not a sass file", compile8.input);
      }
    }
    let rename = renameFile2(style2.rename);
    if (has("rename", style2) && !isNil(style2)) {
      if (!isString(style2.rename)) {
        typeError({
          option: "styles",
          name: "rename",
          provided: style2.rename,
          expects: "string"
        });
      }
      rename = renameFile2(compile8.input, style2.rename);
      if (!/[a-zA-Z0-9_.-]+/.test(rename.name)) {
        typeError({
          option: "sass",
          name: "rename",
          provided: rename,
          expects: "Characters: [a-zA-Z0-9_.-]"
        });
      }
      if (rename.name.endsWith(".css")) {
        compile8.rename = rename.name;
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
    if (bundle.mode.watch && has("watch", style2)) {
      if (!isArray2(style2.watch)) {
        typeError({
          option: "styles",
          name: "watch",
          provided: style2.watch,
          expects: "string[]"
        });
      }
      for (const uri2 of style2.watch) {
        const globs = await glob3__default.default(path$1.join(bundle.cwd, path2(uri2)));
        if (globs.length === 0 && uri2[0] !== "!")
          warn2("Cannot resolve watch glob/path uri", uri2);
        for (const p of globs) {
          if (fsExtra.existsSync(p)) {
            watch2.push(p);
          } else {
            warn2("No file exists in path", p);
          }
        }
      }
      watch2.push(compile8.input);
      watch2.forEach((p) => bundle.watch.add(p));
      compile8.watch = anymatch3__default.default(watch2);
    } else {
      compile8.watch = anymatch3__default.default([compile8.input]);
      bundle.watch.add(compile8.input);
    }
    if (typeof compile8.sass === "object") {
      compile8.sass.include.unshift(bundle.cwd, path$1.join(bundle.cwd, rename.dir));
      if (hasPath("sass.include", style2)) {
        compile8.sass.include = style2.sass.include.map((p) => path$1.join(bundle.cwd, p));
      }
    }
    if (has("snippet", style2)) {
      if (!isBoolean(style2.snippet)) {
        typeError({
          option: "styles",
          name: "snippet",
          provided: style2.snippet,
          expects: "boolean"
        });
      }
      compile8.snippet = style2.snippet;
    }
    if (compile8.snippet) {
      if (!has("rename", compile8))
        compile8.rename = rename.name;
      if (!rename.name.endsWith(".liquid") || !compile8.rename.endsWith(".liquid")) {
        compile8.rename = rename.name + ".liquid";
      }
      bundle.paths.transforms.set(compile8.input, 7 /* Style */);
      if (bundle.mode.watch) {
        bundle.watch.unwatch(`${path$1.join(bundle.cwd, config.output, "snippets", compile8.rename)}`);
      }
    } else {
      compile8.rename = rename.name;
      if (bundle.mode.watch) {
        bundle.watch.unwatch(`${path$1.join(bundle.cwd, config.output, "assets", rename.name)}`);
      }
    }
    bundle.style.push(compile8);
  }
}
async function setSvgOptions(config) {
  if (!has("svg", config.transforms))
    return;
  const { sprite, svgo } = processor;
  const warn2 = warnOption("svg transform");
  svgo.installed = getModules2("svgo");
  if (svgo.installed) {
    const loaded = await load2("svgo");
    if (!loaded)
      throwError("Unable to dynamically import SVGO", "Ensure you have installed svgo");
  }
  sprite.installed = getModules2("svg-sprite");
  if (sprite.installed) {
    const loaded = await load2("svg-sprite");
    if (!loaded)
      throwError("Unable to dynamically import SVG Sprite", "Ensure you have installed svg-sprite");
  }
  if (!sprite.installed && !svgo.installed) {
    missingDependency(["svgo", "svg-sprite"]);
  }
  const svgs = getTransform(config.transforms.svg, {
    addWatch: true,
    flatten: false
  });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path2) => {
      if (path$1.extname(path2) !== ".svg") {
        warn2("Excluded file which is not an SVG type", path$1.relative(bundle.cwd, path2));
        return false;
      } else {
        return true;
      }
    });
    if (files.length === 0) {
      warn2("No SVG file paths were resolved");
      continue;
    }
    const o2 = {
      uuid: uuid(),
      input: new Set(files),
      match: svg2.match,
      format: null,
      rename: svg2.rename,
      snippet: svg2.snippet
    };
    if (has("svgo", svg2) && has("sprite", svg2)) {
      invalidError("transform", "svg", "svgo AND sprite", "svgo OR sprite");
    }
    if (!has("format", svg2)) {
      if (has("svgo", svg2)) {
        if (!svgo.installed)
          missingDependency("svgo");
        o2.format = "file";
        o2.svgo = isObject(svg2.svgo) ? mergerino_min_default(svgo.config, svg2.svgo) : true;
      } else if (has("sprite", svg2)) {
        if (!sprite.installed)
          missingDependency("svg-sprite");
        o2.format = "sprite";
        o2.sprite = isObject(svg2.sprite) ? mergerino_min_default(sprite.config, svg2.sprite) : true;
      } else {
        if (svgo.installed && sprite.installed) {
          missingOption("transform.svg", "format", "sprite | file", [
            `SVG transforms require you to define ${cyan("format")} when both SVGO and SVG Sprite`,
            "processors are installed. Syncify needs to knows how is should handle the input and",
            "which processor to use for the transform."
          ]);
        } else if (svgo.installed && !sprite.installed) {
          o2.format = "file";
          o2.svgo = true;
        } else if (sprite.installed && !svgo.installed) {
          o2.format = "sprite";
          o2.sprite = true;
        } else {
          unknownError("transform > svg", "Cannot resolve processor, try defining a format.");
        }
      }
    } else {
      if (svg2.format === "file" || svg2.format === "sprite") {
        o2.format = svg2.format;
        if (svg2.format === "file") {
          o2.svgo = true;
          if (!svgo.installed)
            missingDependency("svgo");
        } else {
          o2.sprite = true;
          if (!sprite.installed)
            missingDependency("svg-sprite");
        }
      } else {
        invalidError("transform > svg", "format", svg2.format, '"sprite" | "file"');
      }
    }
    bundle.svg.push(o2);
  }
}

// lib/options/terser.ts
function setMinifyOptions(config) {
  if (isBoolean(config.terser)) {
    if (bundle.mode.terse === false && config.terser === false)
      return;
    if (bundle.mode.terse === false && config.terser === true) {
      bundle.mode.terse = true;
    }
  }
  const warn2 = warnOption("terser configuration");
  if (typeof config.terser === "object") {
    for (const key in config.terser) {
      if (config.terser[key] === false || isNil(config.terser[key])) {
        if (bundle.mode.terse === true)
          bundle.terse[key] = true;
        continue;
      }
      if (key === "script") {
        if (processor.esbuild.installed === false && (isObject(config.terser[key]) && isEmpty(config.terser[key]) === false || isBoolean(config.terser[key]) && config.terser[key] === true)) {
          throwError("esbuild is not installed", ESBUILD_NOT_INSTALLED);
        }
      }
      if (isBoolean(config.terser[key])) {
        bundle.terser[key] = config.terser[key];
      } else if (isObject(terser[key])) {
        if (isEmpty(terser[key]))
          continue;
        for (const opt in config.terser[key]) {
          const p = key === "views" ? "liquid" : key;
          if (!has(opt, terser[p]))
            unknownError(`terser.${key}`, opt);
          if (opt === "mangleProps") {
            if (!isNil(config.terser[key][opt]) && !isRegex(terser[p][opt])) {
              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: `${typeof config.terser[key][opt]} (${config.terser[key][opt]})`,
                expects: "Regex | string | undefined"
              });
            }
          } else {
            if (!isNil(config.terser[key][opt]) && typeof terser[p][opt] !== typeof config.terser[key][opt]) {
              typeError({
                option: `terser.${key}`,
                name: opt,
                provided: typeof config.terser[key][opt],
                expects: typeof terser[p][opt]
              });
            }
          }
          if (opt === "exclude" && !isEmpty(config.terser[key][opt])) {
            terser[key][opt] = getResolvedPaths(config.terser[key][opt]);
          } else if (opt === "collapseWhitespace") {
            terser.html.collapseWhitespace = config.terser[key][opt];
          } else {
            terser[key][opt] = config.terser[key][opt];
          }
        }
      } else {
        warn2("unkown option provided", key);
      }
    }
  }
}

// lib/options/define.ts
async function define(cli, _options) {
  loggers_exports.clear();
  await getPackageJson(cli.cwd);
  await getConfig(cli);
  bundle.version = "0.2.2-beta";
  bundle.mode = setModes(cli);
  bundle.cwd = cli.cwd;
  bundle.env.cli = cli.cli;
  bundle.env.prod = cli.prod;
  bundle.env.dev = cli.dev && !cli.prod;
  bundle.logger.silent = cli.silent;
  process.env.SYNCIFY_ENV = bundle.env.dev ? "dev" : "prod";
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);
  const { config, cwd } = bundle;
  const promise = await Promise.all([
    setChokidar(cli.watch, cwd),
    setBaseDirs(cli),
    setCaches(cwd),
    setThemeDirs(bundle.dirs.output),
    setImportDirs(),
    setStores(cli, config),
    setPaths(config),
    setFilters(cli),
    setProcessors(config),
    setSectionOptions(config),
    setSnippetOptions(config),
    setJsonOptions(config),
    setScriptOptions(config),
    setStyleConfig(config),
    setSvgOptions(config),
    setMinifyOptions(config),
    setSpawns(config),
    setPlugins(config),
    setHotReloads(config)
  ]).catch((e2) => {
    console.log(e2);
  });
  loggers_exports.start(bundle);
  return promise;
}
function setModes(cli) {
  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transfrom = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  const watch2 = anyTrue(resource, cli.upload, cli.download) ? false : cli.watch;
  const modes = assign(bundle.mode, {
    watch: watch2,
    hot: watch2 && cli.hot,
    vsc: cli.vsc,
    interactive: cli.interactive,
    export: cli.export,
    import: cli.import,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    force: cli.force,
    views: cli.views,
    script: transfrom ? cli.script : false,
    style: transfrom ? cli.style : false,
    image: transfrom ? cli.image : false,
    svg: transfrom ? cli.svg : false,
    terse: anyTrue(cli.terse, cli.prod),
    clean: anyTrue(resource, transfrom, cli.upload) ? false : cli.clean,
    build: anyTrue(cli.export, cli.watch, cli.download) ? false : cli.build,
    upload: anyTrue(transfrom, watch2) ? false : cli.upload,
    download: anyTrue(resource, transfrom, cli.upload, cli.watch, cli.build) ? false : cli.download
  });
  if (allFalse(...values(modes))) {
    invalidCommand({
      message: [
        "Execution is unclear, you have not provided Syncify a operation mode to run."
      ],
      expected: "--<cmd>",
      fix: [
        "Syncify requires that you provide an operation. In most cases, this",
        "error occurs when you have forgotten to pass the mode, for example:",
        "",
        `${white("$")} ${white(`syncify ${bundle.argv} ${blue("--watch")}`)}`,
        `${white("$")} ${white(`syncify ${bundle.argv} ${blue("--build")}`)}`,
        `${white("$")} ${white(`syncify ${bundle.argv} ${blue("--upload")}`)}`,
        "",
        `Run ${blue("syncify --help")} for more information, or pass an execution`,
        `operation mode as per the ${blue("expected")} value and ensure to replace ${blue("--<cmd>")}`,
        "with one the examples provided or a supported mode."
      ]
    });
  }
  if (modes.build) {
    if (allFalse(modes.script, modes.style, modes.svg, modes.pages, modes.metafields, modes.image)) {
      modes.script = true;
      modes.style = true;
      modes.svg = true;
      modes.image = true;
      modes.views = true;
    }
  }
  return modes;
}
function setChokidar(watch2, cwd) {
  if (!watch2) {
    bundle.watch = /* @__PURE__ */ new Set();
  } else {
    bundle.watch = new chokidar.FSWatcher({
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      interval: 75,
      binaryInterval: 100,
      ignored: ["**/*.map"],
      ignorePermissionErrors: true
    });
    Object.defineProperties(bundle.watch, {
      has: {
        value(path2, dir = cwd) {
          return bundle.watch._watched.get(dir).items.has(path2);
        }
      },
      paths: {
        get() {
          return toArray(bundle.watch.values());
        }
      },
      watching: {
        get() {
          return bundle.watch._watched;
        }
      }
    });
  }
}
async function setHotReloads(config) {
  if (bundle.mode.watch !== true)
    return;
  if (bundle.mode.hot === false && config.hot === false)
    return;
  if (bundle.mode.hot === false && config.hot === true)
    bundle.mode.hot = true;
  const warn2 = warnOption("HOT Reloads");
  if (bundle.env.sync > 1) {
    warn2("HOT Reloads can only be used on 1 store");
    return;
  } else if (bundle.sync.themes.length > 1) {
    warn2("HOT Reloads can only be used on 1 theme");
    return;
  }
  if (allFalse(
    isObject(config.hot),
    isBoolean(config.hot),
    isNil(config.hot)
  )) {
    typeError({
      option: "config",
      name: "hot",
      provided: config.hot,
      expects: "boolean | {}"
    });
  }
  const { hot } = bundle;
  if (isObject(config.hot) && isEmpty(config.hot) === false) {
    for (const prop in config.hot) {
      if (!has(prop, bundle.hot))
        unknownError(`hot.${prop}`, config.hot[prop]);
      if (prop === "label") {
        if (config.hot[prop] === "visible" || config.hot[prop] === "hidden") {
          hot[prop] = config.hot[prop];
        } else {
          invalidError("hot", prop, config.hot[prop], "visible | hidden");
        }
      } else if (prop === "method") {
        if (config.hot[prop] === "hot" || config.hot[prop] === "refresh") {
          hot[prop] = config.hot[prop];
        } else {
          invalidError("hot", prop, config.hot[prop], "hot | refresh");
        }
      } else if (prop === "scroll") {
        if (config.hot[prop] === "preserved" || config.hot[prop] === "top") {
          hot[prop] = config.hot[prop];
        } else {
          invalidError("hot", prop, config.hot[prop], "preserved | top");
        }
      } else if (typeof hot[prop] === typeof config.hot[prop]) {
        hot[prop] = config.hot[prop];
      } else {
        typeError({
          option: "hot",
          name: prop,
          provided: config.hot[prop],
          expects: typeof hot[prop]
        });
      }
    }
  }
  hot.snippet = path$1.join(bundle.cwd, "node_modules", "@syncify/cli", HOT_SNIPPET_FILE);
  hot.output = path$1.join(bundle.dirs.output, "snippets", HOT_SNIPPET_FILE);
  for (const layout of hot.layouts) {
    hot.alive[path$1.join(bundle.dirs.output, "layout", layout)] = false;
  }
  bundle.wss = socket();
}
function setProcessors(config) {
  for (const prop in config.processors) {
    processor[prop].config = isArray2(config.processors[prop]) ? config.processors[prop] : assign(processor[prop].config, config.processors[prop]);
  }
}
function setPlugins(config) {
  if (!has("plugins", config))
    return;
  if (!isArray2(config.plugins))
    return;
  for (const plugin of config.plugins) {
    if (has("onInit", plugin))
      plugin.onInit.call({ ...bundle }, config);
    if (has("onChange", plugin)) {
      plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }
    if (has("onTransform", plugin)) {
      plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }
    if (bundle.mode.watch) {
      if (has("onWatch", plugin)) {
        plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }
      if (has("onReload", plugin)) {
        plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }
    if (bundle.mode.build) {
      if (has("onBuild", plugin)) {
        plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }
  }
}
function setSpawns(config) {
  const { mode, spawn: spawn4 } = bundle;
  if (!has("spawn", config) || isNil(config.spawn))
    return;
  if (!isObject(config.spawn)) {
    typeError({
      option: "config",
      name: "spawn",
      provided: config.spawn,
      expects: "{ build: {}, watch: {} }"
    });
  }
  let run2 = null;
  if (mode.build && has("build", config.spawn))
    run2 = "build";
  if (mode.watch && has("watch", config.spawn))
    run2 = "watch";
  if (isNil(mode) || isNil(config.spawn[run2]))
    return;
  if (!isObject(config.spawn[run2])) {
    typeError({
      option: "spawn",
      name: run2,
      provided: config.spawn[run2],
      expects: "{ build: {}, watch: {} }"
    });
  }
  const props = keys(config.spawn[run2]);
  if (props.length === 0)
    return;
  for (const name in config.spawn[run2]) {
    const command = config.spawn[run2][name];
    if (isString(command)) {
      bundle.spawn.commands[name] = {
        cmd: nil,
        args: [],
        pid: NaN
      };
      const cmd = command.trimStart().indexOf(ws) > -1 ? command.trimStart().split(ws) : [command];
      bundle.spawn.commands[name].cmd = cmd.shift();
      bundle.spawn.commands[name].args = cmd;
      spawned(name, bundle.spawn.commands[name], loggers_exports.spawn(name));
    } else if (isArray2(command)) {
      const cmd = command.shift();
      bundle.spawn.commands[name] = { cmd, args: command, pid: NaN };
      spawned(name, bundle.spawn.commands[name], loggers_exports.spawn(name));
    } else {
      typeError({
        option: "spawn",
        name: run2,
        provided: config.spawn[run2],
        expects: "string | string[]"
      });
    }
  }
  kill(() => {
    queue.pause();
    queue.clear();
    loggers_exports.nwl(nil);
    spawn4.streams.forEach((child, name) => {
      error(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
      child.kill();
    });
    loggers_exports.nwl(nil);
    spawn4.streams.clear();
    process.exit(0);
  });
}
function setFilters(cli) {
  if (!has("filter", cli))
    return;
  const exp = new RegExp(`^(${[
    "assets",
    "config",
    "locales",
    "metafields",
    "layout",
    "pages",
    "customers",
    "templates",
    "snippets",
    "sections"
  ].join("|")})`);
  const parse3 = cli.filter.replace(/\s+/g, " ").trim();
  if (parse3.indexOf(",") > -1) {
    const multiple = parse3.split(",").filter(Boolean).map((entry) => entry.trim());
    for (const cmd of multiple) {
      if (cmd[0] === "!") {
        if (!exp.test(cmd.slice(1)))
          throwCommandError("dir", cmd);
      } else if (cmd[0] === "*" || cmd[0] === "/" || cmd[0] === ".") {
        throwCommandError("pattern", parse3);
      } else {
        if (!exp.test(cmd))
          throwCommandError("dir", cmd);
        if (cmd.indexOf("/") > -1) ; else {
          if (!isArray2(bundle.filters[cmd]))
            bundle.filters[cmd] = [];
          bundle.filters[cmd].push(cmd);
        }
      }
    }
  } else if (parse3[0] === "*" || parse3[0] === "/" || parse3[0] === ".") {
    throwCommandError("pattern", parse3);
  } else if (parse3.indexOf("/") > -1) ; else {
    if (!isArray2(bundle.filters[parse3]))
      bundle.filters[parse3] = [];
    bundle.filters[parse3].push(parse3);
  }
  function throwCommandError(type2, cmd) {
    const pattern = [];
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
        `Use a starting point directory name based on the ${blue("paths")} key property`,
        `in your ${blue(bundle.file.base)} file.`
      );
    } else {
      pattern.push(
        `Invalid directory provided. The ${blue("--filter")} pattern expects the starting point`,
        "directory path be one of the following:",
        "",
        `${white("-")} ${blue("assets")}`,
        `${white("-")} ${blue("config")}`,
        `${white("-")} ${blue("locales")}`,
        `${white("-")} ${blue("metafields")}`,
        `${white("-")} ${blue("layout")}`,
        `${white("-")} ${blue("pages")}`,
        `${white("-")} ${blue("customers")}`,
        `${white("-")} ${blue("templates")}`,
        `${white("-")} ${blue("snippets")}`,
        `${white("-")} ${blue("sections`")}`,
        ""
      );
    }
    invalidCommand({
      message: pattern,
      expected: "--filter <dir>",
      fix: [
        `The ${blue("--filter")} (or ${blue("-f")}) flag command argument expects you`,
        "provide a theme output directory as the starting point. Filtering begins with",
        "a Shopify output directory name, for example:",
        "",
        `${white("$")} ${white(`syncify --filter ${blue("sections/file.liquid")}`)}`,
        `${white("$")} ${white(`syncify --filter ${blue("snippets/*")}`)}`,
        `${white("$")} ${white(`syncify --filter ${blue("templates/*.json")}`)}`,
        `${white("$")} ${white(`syncify --filter ${blue("!assets/some-file.ext")}`)}`,
        "",
        `Syncify will automatically resolve files from within your defined ${bold("input")} directory`,
        "based on the starting point directory name. You can pass glob star matches following the",
        `directory namespace or starting point ignores (${blue("!")}) as long the directory can match.`
      ]
    });
  }
}
async function setCaches(cwd) {
  const dir = path$1.join(cwd, "node_modules/.syncify");
  const map = path$1.join(dir, "store.map");
  const has3 = await fsExtra.pathExists(map);
  if (!has3)
    return setCacheDirs(dir);
  bundle.dirs.cache = `${dir}/`;
  const read = await fsExtra.readJson(map);
  assign(cache, read);
}
async function getConfig(cli) {
  const cfg = await configFile(cli.cwd);
  if (cfg !== null) {
    bundle.config = cfg;
  } else if (has("syncify", bundle.pkg)) {
    bundle.config = bundle.pkg.syncify;
  } else {
    missingConfig(cli.cwd);
  }
}
function setStores(cli, config) {
  const storeRequired = anyTrue(
    bundle.mode.metafields,
    bundle.mode.pages,
    bundle.mode.redirects
  );
  const themeRequired = anyTrue(
    bundle.mode.watch,
    bundle.mode.upload,
    bundle.mode.download
  );
  if (cli._.length === 0) {
    if (storeRequired) {
      invalidCommand({
        message: [
          "You have not provided store to target, which is required",
          "when running in a resource mode that syncs to a remote source"
        ],
        expected: "syncify <store>",
        fix: [
          "Provide the store target name as the first command argument",
          "followed by themes target/s and other flags."
        ]
      });
    }
    return;
  }
  const stores = cli._[0].split(",");
  const file2 = dotenv__default.default.config({ path: path$1.join(bundle.cwd, ".env") });
  const array = isArray2(config.stores) ? config.stores : [config.stores];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue3 = items.length > 1;
  for (const store of items) {
    const domain = `${store.domain}.myshopify.com`.toLowerCase();
    const client2 = file2.error ? authURL(store.domain, process.env, 2) : authURL(store.domain, file2.parsed, 1);
    const sidx = bundle.sync.stores.push({
      store: store.domain,
      domain,
      client: client2,
      queue: queue3
    }) - 1;
    if (bundle.mode.metafields || bundle.mode.pages)
      return;
    const themes = has("theme", cli) ? cli.theme.split(",") : has(store.domain, cli) ? cli[store.domain].split(",") : keys(store.themes);
    for (const target of themes) {
      if (!has(target, store.themes)) {
        invalidTarget({
          type: "theme",
          expected: keys(store.themes).join(","),
          provided: target,
          message: [
            `Unknown theme target (${blue(target)}) provided to ${blue(store.domain)} store`,
            `Your ${blue(bundle.file.base)} file contains no such theme using this name.`
          ],
          fix: [
            `Provide an ${blue("expected")} theme target or update/add an existing target.`,
            `You have ${blue(`${themes.length}`)} theme targets defined for ${blue(store.domain)}:`,
            "",
            `${DSH} ${themes.join(`
${DSH} `)}`,
            ""
          ]
        });
      }
      bundle.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });
    }
  }
  if (storeRequired) {
    if (bundle.sync.stores.length === 0) {
      return invalidCommand({
        expected: "syncify <store>",
        message: [
          "You have not provided store to target, which is required",
          "when running in a resource mode that syncs to a remote source"
        ],
        fix: [
          "Provide the store target name as the first command argument followed by themes",
          "target/s and other flags. Based on your current configuration:",
          "",
          `${DSH} ${white("$")} syncify ${array.join(`
${DSH} ${white("$")} syncify `)}`,
          ""
        ]
      });
    }
  }
  if (bundle.sync.themes.length === 0) {
    if (themeRequired) {
      return invalidCommand({
        expected: "-t <theme>",
        message: [
          "You have not provided a theme to target, which is required",
          "when running this resource mode."
        ],
        fix: [
          `Provide a theme name to target following a ${blue("-t")} or ${blue("--theme")} flag.`,
          "Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s."
        ]
      });
    }
  }
  if (bundle.sync.stores.length === 0) {
    throwError(
      "Unknown, missing or invalid store/theme targets",
      "Check your store config"
    );
  }
  if (bundle.sync.stores.length === 1 && bundle.sync.themes.length === 1) {
    bundle.env.sync = 1;
  } else if (bundle.sync.stores.length > 1 || bundle.sync.themes.length > 1) {
    bundle.env.sync = 2;
  }
}
async function setPaths(config) {
  const path2 = normalPath(bundle.dirs.input);
  const warn2 = warnOption("path resolution");
  for (const key of PATH_KEYS) {
    let uri2;
    if (key === "customers") {
      uri2 = has(key, config.paths) ? isArray2(config.paths[key]) ? config.paths[key].map(path2) : [path2(config.paths[key])] : [path2("templates/customers")];
    } else if (has(key, config.paths)) {
      uri2 = isArray2(config.paths[key]) ? config.paths[key].map(path2) : [path2(config.paths[key])];
      if (key === "assets")
        uri2.push(path$1.join(bundle.dirs.output, "assets/*"));
    } else if (key === "redirects" && has(key, config.paths)) {
      uri2 = [path$1.join(bundle.cwd, config.paths[key])];
    } else {
      uri2 = [path2(key)];
    }
    for (const p of uri2) {
      if (p.endsWith("metafields") || p.endsWith("pages") || p.endsWith("redirects"))
        continue;
      const exists = await glob3__default.default(p);
      if (exists.length === 0)
        warn2("No files could be resolved in", path$1.relative(bundle.cwd, p));
      bundle.watch.add(p);
    }
    bundle.paths[key] = anymatch3__default.default(uri2);
  }
}

// lib/index.ts
var env = {
  get dev() {
    return process.env.SYNCIFY_ENV === "dev";
  },
  get prod() {
    return process.env.SYNCIFY_ENV === "prod";
  },
  get watch() {
    return process.env.SYNCIFY_WATCH === "true";
  },
  get options() {
    return bundle.config;
  }
};
async function run(options, config, callback) {
  process.stdin.on("data", stdin);
  if (has("_", options))
    options._ = options._.slice(1);
  if (options.help)
    return console.info(help);
  await define(options);
  process.on("SIGINT", signal);
  process.stdin.on("data", stdin);
  process.on("uncaughtException", exception);
  process.on("unhandledRejection", rejection);
  if (bundle.mode.hot)
    await server();
  try {
    if (bundle.mode.build) {
      return build2(callback);
    } else if (bundle.mode.watch) {
      return watch(callback);
    } else if (bundle.mode.upload) {
      return upload3(callback);
    } else if (bundle.mode.download) {
      return download(callback);
    } else if (bundle.mode.export) {
      return console.log("TODO");
    }
  } catch (e2) {
    console.log(e2);
    loggers_exports.throws(e2);
  }
}

// lib/api.ts
var defineConfig = (config) => config;
function api(resource, options) {
  if (isString(resource)) {
    if (/watch|build|download|upload/.test(resource)) {
      return (cb) => run({
        cli: false,
        [resource]: true
      }, options, cb);
    }
  } else if (isObject(resource)) {
    if (!isUndefined(options)) {
      throw new Error("You cannot provide options when running instance");
    }
    return {
      watch: (cb) => run({
        cli: false,
        watch: true
      }, options, cb),
      build: (cb) => run({
        cli: false,
        build: true
      }, options, cb),
      download: (cb) => run({
        cli: false,
        download: true
      }, options, cb),
      upload: (cb) => run({
        cli: false,
        upload: true
      }, options, cb)
    };
  }
}
var api_default = api;

exports.api_default = api_default;
exports.defineConfig = defineConfig;
exports.env = env;
exports.loggers_exports = loggers_exports;
exports.run = run;
