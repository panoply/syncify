'use strict';

var path2 = require('node:path');
var node_child_process = require('node:child_process');
var s = require('node:process');
var node_url = require('node:url');
var node_console = require('node:console');
var node_os = require('node:os');
var S2 = require('node:readline');
var types = require('node:util/types');
var notifier2 = require('node-notifier');
var EventEmitter = require('node:events');
var node_crypto = require('node:crypto');
var node_util = require('node:util');
var zlib = require('node:zlib');
var glob = require('fast-glob');
var fsExtra = require('fs-extra');
var acquire = require('@syncify/acquire');
var node_fs = require('node:fs');
var cborX = require('cbor-x');
var xior = require('xior');
var json = require('@syncify/json');
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
var s__default = /*#__PURE__*/_interopDefault(s);
var S2__default = /*#__PURE__*/_interopDefault(S2);
var notifier2__default = /*#__PURE__*/_interopDefault(notifier2);
var EventEmitter__default = /*#__PURE__*/_interopDefault(EventEmitter);
var zlib__default = /*#__PURE__*/_interopDefault(zlib);
var glob__default = /*#__PURE__*/_interopDefault(glob);
var xior__default = /*#__PURE__*/_interopDefault(xior);
var esbuild__default = /*#__PURE__*/_interopDefault(esbuild);
var fsPromises2__default = /*#__PURE__*/_interopDefault(fsPromises2);

/**
 * SYNCIFY CLI ~ v1.0.0-unstable.3
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
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
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
    var { floor: e3 } = Math;
    var f2 = new class {
      marks = [];
      time = /* @__PURE__ */ Object.create(null);
      cache = /* @__PURE__ */ Object.create(null);
      now(t3) {
        return this.stop(t3 || true);
      }
      sec(t3) {
        let r2 = this.stop(t3 || true);
        return r2.slice(0, r2.lastIndexOf(" "));
      }
      pause(t3) {
        t3 in this.marks && (this.cache[t3] = this.stop(t3 || true));
      }
      start(t3) {
        t3 ? this.time[t3] = perf_hooks.performance.now() : this.marks.push(perf_hooks.performance.now());
      }
      clear(t3) {
        if (t3) {
          if (t3 in this.time) {
            delete this.time[t3];
            return;
          }
          if (t3 in this.cache) {
            delete this.cache[t3];
            return;
          }
        }
        for (; this.marks.length !== 0; ) this.marks.pop();
      }
      stop(t3 = false, r2 = false, o3 = false) {
        let n;
        if (typeof t3 == "boolean") n = t3 ? this.marks[this.marks.length - 1] : this.marks.pop();
        else if (t3) {
          if (t3 in this.cache) {
            let m3 = this.cache[t3];
            return delete this.cache[t3], m3;
          }
          r2 ? (n = this.time[t3], delete this.time[t3]) : n = this.time[t3];
        }
        let s3 = perf_hooks.performance.now() - n;
        if (isNaN(s3)) return "";
        if (s3 < 1) return `${Math.round(s3 * 1e3)}\u03BCs`;
        if (s3 < 1e3) return `${Math.floor(s3)}ms`;
        let i2 = e3(s3 / 1e3);
        if (i2 < 60) return `${i2}s ${e3(s3 % 1e3)}ms`;
        let h2 = e3(i2 / 60), a2 = i2 % 60;
        return h2 < 60 ? `${h2}m ${a2}s ${e3(s3 % 1e3)}ms` : `${e3(h2 / 60)}h ${h2 % 60}m ${i2 % 60}s ${e3(s3 % 1e3)}ms`;
      }
    }();
    exports.timer = f2;
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
          const i2 = slashes[idx];
          const value = input.slice(n, i2);
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
          prevIndex = i2;
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
        return args.map((v2) => utils.escapeRegex(v2)).join("..");
      }
      return value;
    };
    var syntaxError = (type2, char) => {
      return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse10 = (input, options) => {
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
            const expression = parse10(rest, { ...options, fastpaths: false }).output;
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
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m3, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m3;
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
          return esc ? m3 : `\\${m3}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m3) => {
              return m3.length % 2 === 0 ? "\\\\" : m3 ? "\\" : "";
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
            for (let i2 = arr.length - 1; i2 >= 0; i2--) {
              tokens.pop();
              if (arr[i2].type === "brace") {
                break;
              }
              if (arr[i2].type !== "dots") {
                range.unshift(arr[i2].value);
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
            for (const t3 of toks) {
              state.output += t3.output || t3.value;
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
    parse10.fastpaths = (input, options) => {
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
    module.exports = parse10;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    var path5 = __require("path");
    var scan = require_scan();
    var parse10 = require_parse();
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
      if (Array.isArray(pattern)) return pattern.map((p2) => picomatch.parse(p2, options));
      return parse10(pattern, { ...options, fastpaths: false });
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
        parsed.output = parse10.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse10(input, options);
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
        return (testString2, ri2 = false) => {
          const returnIndex2 = typeof ri2 === "boolean" ? ri2 : false;
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
        var m3 = this instanceof MurmurHash3 ? this : cache;
        m3.reset(seed);
        if (typeof key === "string" && key.length > 0) {
          m3.hash(key);
        }
        if (m3 !== this) {
          return m3;
        }
      }
      MurmurHash3.prototype.hash = function(key) {
        var h1, k1, i2, top, len;
        len = key.length;
        this.len += len;
        k1 = this.k1;
        i2 = 0;
        switch (this.rem) {
          case 0:
            k1 ^= len > i2 ? key.charCodeAt(i2++) & 65535 : 0;
          case 1:
            k1 ^= len > i2 ? (key.charCodeAt(i2++) & 65535) << 8 : 0;
          case 2:
            k1 ^= len > i2 ? (key.charCodeAt(i2++) & 65535) << 16 : 0;
          case 3:
            k1 ^= len > i2 ? (key.charCodeAt(i2) & 255) << 24 : 0;
            k1 ^= len > i2 ? (key.charCodeAt(i2++) & 65280) >> 8 : 0;
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
            if (i2 >= len) {
              break;
            }
            k1 = key.charCodeAt(i2++) & 65535 ^ (key.charCodeAt(i2++) & 65535) << 8 ^ (key.charCodeAt(i2++) & 65535) << 16;
            top = key.charCodeAt(i2++);
            k1 ^= (top & 255) << 24 ^ (top & 65280) >> 8;
          }
          k1 = 0;
          switch (this.rem) {
            case 3:
              k1 ^= (key.charCodeAt(i2 + 2) & 65535) << 16;
            case 2:
              k1 ^= (key.charCodeAt(i2 + 1) & 65535) << 8;
            case 1:
              k1 ^= key.charCodeAt(i2) & 65535;
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
    var processOk = (process3) => !!process3 && typeof process3 === "object" && typeof process3.removeListener === "function" && typeof process3.emit === "function" && typeof process3.reallyExit === "function" && typeof process3.listeners === "function" && typeof process3.kill === "function" && typeof process3.pid === "number" && typeof process3.on === "function";
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
        const list = this.listeners[ev];
        const i2 = list.indexOf(fn2);
        if (i2 === -1) {
          return;
        }
        if (i2 === 0 && list.length === 1) {
          list.length = 0;
        } else {
          list.splice(i2, 1);
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
      constructor(process3) {
        super();
        __privateAdd(this, _SignalExit_instances);
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        /* c8 ignore start */
        __privateAdd(this, _hupSig, process2.platform === "win32" ? "SIGINT" : "SIGHUP");
        /* c8 ignore stop */
        __privateAdd(this, _emitter, new Emitter());
        __privateAdd(this, _process);
        __privateAdd(this, _originalProcessEmit);
        __privateAdd(this, _originalProcessReallyExit);
        __privateAdd(this, _sigListeners, {});
        __privateAdd(this, _loaded, false);
        __privateSet(this, _process, process3);
        __privateSet(this, _sigListeners, {});
        for (const sig of signals_js_1.signals) {
          __privateGet(this, _sigListeners)[sig] = () => {
            const listeners = __privateGet(this, _process).listeners(sig);
            let { count } = __privateGet(this, _emitter);
            const p2 = process3;
            if (typeof p2.__signal_exit_emitter__ === "object" && typeof p2.__signal_exit_emitter__.count === "number") {
              count += p2.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = __privateGet(this, _emitter).emit("exit", null, sig);
              const s3 = sig === "SIGHUP" ? __privateGet(this, _hupSig) : sig;
              if (!ret)
                process3.kill(process3.pid, s3);
            }
          };
        }
        __privateSet(this, _originalProcessReallyExit, process3.reallyExit);
        __privateSet(this, _originalProcessEmit, process3.emit);
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
          } catch (_2) {
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
          } catch (_2) {
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
    var process2 = globalThis.process;
    _a14 = signalExitWrap(processOk(process2) ? new SignalExit(process2) : new SignalExitFallback()), /**
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
    module.exports = writeFile14;
    module.exports.sync = writeFileSync;
    module.exports._getTmpname = getTmpname;
    module.exports._cleanupOnExit = cleanupOnExit;
    var fs3 = __require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit } = require_cjs();
    var path5 = __require("path");
    var { promisify: promisify3 } = __require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = __require("worker_threads");
        return workerThreads.threadId;
      } catch (e3) {
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
          fs3.unlinkSync(typeof tmpfile === "function" ? tmpfile() : tmpfile);
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
      const removeOnExitHandler = onExit(cleanupOnExit(() => tmpfile));
      const absoluteName = path5.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify3(fs3.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify3(fs3.stat)(truename).catch(() => {
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
        fd = await promisify3(fs3.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify3(fs3.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify3(fs3.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify3(fs3.fsync)(fd);
        }
        await promisify3(fs3.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify3(fs3.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify3(fs3.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify3(fs3.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify3(fs3.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify3(fs3.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile14(filename, data, options, callback) {
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
    function writeFileSync(filename, data, options) {
      if (typeof options === "string") {
        options = { encoding: options };
      } else if (!options) {
        options = {};
      }
      try {
        filename = fs3.realpathSync(filename);
      } catch (ex) {
      }
      const tmpfile = getTmpname(filename);
      if (!options.mode || !options.chown) {
        try {
          const stats = fs3.statSync(filename);
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
        fd = fs3.openSync(tmpfile, "w", options.mode || 438);
        if (options.tmpfileCreated) {
          options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          fs3.writeSync(fd, data, 0, data.length, 0);
        } else if (data != null) {
          fs3.writeSync(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          fs3.fsyncSync(fd);
        }
        fs3.closeSync(fd);
        fd = null;
        if (options.chown) {
          try {
            fs3.chownSync(tmpfile, options.chown.uid, options.chown.gid);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        if (options.mode) {
          try {
            fs3.chmodSync(tmpfile, options.mode);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        fs3.renameSync(tmpfile, filename);
        threw = false;
      } finally {
        if (fd) {
          try {
            fs3.closeSync(fd);
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
      var names = [], events, name2;
      if (this._eventsCount === 0) return names;
      for (name2 in events = this._events) {
        if (has2.call(events, name2)) names.push(prefix ? name2.slice(1) : name2);
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
      for (var i2 = 0, l2 = handlers.length, ee2 = new Array(l2); i2 < l2; i2++) {
        ee2[i2] = handlers[i2].fn;
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
      var listeners = this._events[evt], len = arguments.length, args, i2;
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
        for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j2;
        for (i2 = 0; i2 < length; i2++) {
          if (listeners[i2].once) this.removeListener(event2, listeners[i2].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i2].fn.call(listeners[i2].context);
              break;
            case 2:
              listeners[i2].fn.call(listeners[i2].context, a1);
              break;
            case 3:
              listeners[i2].fn.call(listeners[i2].context, a1, a2);
              break;
            case 4:
              listeners[i2].fn.call(listeners[i2].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j2 = 1, args = new Array(len - 1); j2 < len; j2++) {
                args[j2 - 1] = arguments[j2];
              }
              listeners[i2].fn.apply(listeners[i2].context, args);
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
        for (var i2 = 0, events = [], length = listeners.length; i2 < length; i2++) {
          if (listeners[i2].fn !== fn2 || once && !listeners[i2].once || context && listeners[i2].context !== context) {
            events.push(listeners[i2]);
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

// node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js
var require_symbols = __commonJS({
  "node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js"(exports, module) {
    var isHyper = typeof process !== "undefined" && process.env.TERM_PROGRAM === "Hyper";
    var isWindows = typeof process !== "undefined" && process.platform === "win32";
    var isLinux = typeof process !== "undefined" && process.platform === "linux";
    var common = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      question: "?",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    };
    var windows = Object.assign({}, common, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    });
    var other = Object.assign({}, common, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: isLinux ? "\u25B8" : "\u276F",
      pointerSmall: isLinux ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    module.exports = isWindows && !isHyper ? windows : other;
    Reflect.defineProperty(module.exports, "common", { enumerable: false, value: common });
    Reflect.defineProperty(module.exports, "windows", { enumerable: false, value: windows });
    Reflect.defineProperty(module.exports, "other", { enumerable: false, value: other });
  }
});

// node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/index.js
var require_ansi_colors = __commonJS({
  "node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/index.js"(exports, module) {
    var isObject2 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    var hasColor = () => {
      if (typeof process !== "undefined") {
        return process.env.FORCE_COLOR !== "0";
      }
      return false;
    };
    var create = () => {
      const colors = {
        enabled: hasColor(),
        visible: true,
        styles: {},
        keys: {}
      };
      const ansi = (style3) => {
        let open = style3.open = `\x1B[${style3.codes[0]}m`;
        let close = style3.close = `\x1B[${style3.codes[1]}m`;
        let regex = style3.regex = new RegExp(`\\u001b\\[${style3.codes[1]}m`, "g");
        style3.wrap = (input, newline) => {
          if (input.includes(close)) input = input.replace(regex, close + open);
          let output = open + input + close;
          return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
        };
        return style3;
      };
      const wrap = (style3, input, newline) => {
        return typeof style3 === "function" ? style3(input) : style3.wrap(input, newline);
      };
      const style2 = (input, stack) => {
        if (input === "" || input == null) return "";
        if (colors.enabled === false) return input;
        if (colors.visible === false) return "";
        let str = "" + input;
        let nl = str.includes("\n");
        let n = stack.length;
        if (n > 0 && stack.includes("unstyle")) {
          stack = [.../* @__PURE__ */ new Set(["unstyle", ...stack])].reverse();
        }
        while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
        return str;
      };
      const define = (name2, codes, type2) => {
        colors.styles[name2] = ansi({ name: name2, codes });
        let keys2 = colors.keys[type2] || (colors.keys[type2] = []);
        keys2.push(name2);
        Reflect.defineProperty(colors, name2, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name2, value);
          },
          get() {
            let color = (input) => style2(input, color.stack);
            Reflect.setPrototypeOf(color, colors);
            color.stack = this.stack ? this.stack.concat(name2) : [name2];
            return color;
          }
        });
      };
      define("reset", [0, 0], "modifier");
      define("bold", [1, 22], "modifier");
      define("dim", [2, 22], "modifier");
      define("italic", [3, 23], "modifier");
      define("underline", [4, 24], "modifier");
      define("inverse", [7, 27], "modifier");
      define("hidden", [8, 28], "modifier");
      define("strikethrough", [9, 29], "modifier");
      define("black", [30, 39], "color");
      define("red", [31, 39], "color");
      define("green", [32, 39], "color");
      define("yellow", [33, 39], "color");
      define("blue", [34, 39], "color");
      define("magenta", [35, 39], "color");
      define("cyan", [36, 39], "color");
      define("white", [37, 39], "color");
      define("gray", [90, 39], "color");
      define("grey", [90, 39], "color");
      define("bgBlack", [40, 49], "bg");
      define("bgRed", [41, 49], "bg");
      define("bgGreen", [42, 49], "bg");
      define("bgYellow", [43, 49], "bg");
      define("bgBlue", [44, 49], "bg");
      define("bgMagenta", [45, 49], "bg");
      define("bgCyan", [46, 49], "bg");
      define("bgWhite", [47, 49], "bg");
      define("blackBright", [90, 39], "bright");
      define("redBright", [91, 39], "bright");
      define("greenBright", [92, 39], "bright");
      define("yellowBright", [93, 39], "bright");
      define("blueBright", [94, 39], "bright");
      define("magentaBright", [95, 39], "bright");
      define("cyanBright", [96, 39], "bright");
      define("whiteBright", [97, 39], "bright");
      define("bgBlackBright", [100, 49], "bgBright");
      define("bgRedBright", [101, 49], "bgBright");
      define("bgGreenBright", [102, 49], "bgBright");
      define("bgYellowBright", [103, 49], "bgBright");
      define("bgBlueBright", [104, 49], "bgBright");
      define("bgMagentaBright", [105, 49], "bgBright");
      define("bgCyanBright", [106, 49], "bgBright");
      define("bgWhiteBright", [107, 49], "bgBright");
      colors.ansiRegex = ANSI_REGEX;
      colors.hasColor = colors.hasAnsi = (str) => {
        colors.ansiRegex.lastIndex = 0;
        return typeof str === "string" && str !== "" && colors.ansiRegex.test(str);
      };
      colors.alias = (name2, color) => {
        let fn2 = typeof color === "string" ? colors[color] : color;
        if (typeof fn2 !== "function") {
          throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
        }
        if (!fn2.stack) {
          Reflect.defineProperty(fn2, "name", { value: name2 });
          colors.styles[name2] = fn2;
          fn2.stack = [name2];
        }
        Reflect.defineProperty(colors, name2, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name2, value);
          },
          get() {
            let color2 = (input) => style2(input, color2.stack);
            Reflect.setPrototypeOf(color2, colors);
            color2.stack = this.stack ? this.stack.concat(fn2.stack) : fn2.stack;
            return color2;
          }
        });
      };
      colors.theme = (custom) => {
        if (!isObject2(custom)) throw new TypeError("Expected theme to be an object");
        for (let name2 of Object.keys(custom)) {
          colors.alias(name2, custom[name2]);
        }
        return colors;
      };
      colors.alias("unstyle", (str) => {
        if (typeof str === "string" && str !== "") {
          colors.ansiRegex.lastIndex = 0;
          return str.replace(colors.ansiRegex, "");
        }
        return "";
      });
      colors.alias("noop", (str) => str);
      colors.none = colors.clear = colors.noop;
      colors.stripColor = colors.unstyle;
      colors.symbols = require_symbols();
      colors.define = define;
      return colors;
    };
    module.exports = create();
    module.exports.create = create;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/utils.js"(exports) {
    var toString2 = Object.prototype.toString;
    var colors = require_ansi_colors();
    var onExitCalled = false;
    var onExitCallbacks = /* @__PURE__ */ new Set();
    var complements = {
      "yellow": "blue",
      "cyan": "red",
      "green": "magenta",
      "black": "white",
      "blue": "yellow",
      "red": "cyan",
      "magenta": "green",
      "white": "black"
    };
    exports.longest = (arr, prop) => {
      return arr.reduce((a2, v2) => Math.max(a2, prop ? v2[prop].length : v2.length), 0);
    };
    exports.hasColor = (str) => !!str && colors.hasColor(str);
    var isObject2 = exports.isObject = (val) => {
      return val !== null && typeof val === "object" && !Array.isArray(val);
    };
    exports.nativeType = (val) => {
      return toString2.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    exports.isAsyncFn = (val) => {
      return exports.nativeType(val) === "asyncfunction";
    };
    exports.isPrimitive = (val) => {
      return val != null && typeof val !== "object" && typeof val !== "function";
    };
    exports.resolve = (context, value, ...rest) => {
      if (typeof value === "function") {
        return value.call(context, ...rest);
      }
      return value;
    };
    exports.scrollDown = (choices = []) => [...choices.slice(1), choices[0]];
    exports.scrollUp = (choices = []) => [choices.pop(), ...choices];
    exports.reorder = (arr = []) => {
      let res = arr.slice();
      res.sort((a2, b2) => {
        if (a2.index > b2.index) return 1;
        if (a2.index < b2.index) return -1;
        return 0;
      });
      return res;
    };
    exports.swap = (arr, index, pos) => {
      let len = arr.length;
      let idx = pos === len ? 0 : pos < 0 ? len - 1 : pos;
      let choice = arr[index];
      arr[index] = arr[idx];
      arr[idx] = choice;
    };
    exports.width = (stream, fallback = 80) => {
      let columns = stream && stream.columns ? stream.columns : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        columns = stream.getWindowSize()[0];
      }
      if (process.platform === "win32") {
        return columns - 1;
      }
      return columns;
    };
    exports.height = (stream, fallback = 20) => {
      let rows = stream && stream.rows ? stream.rows : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        rows = stream.getWindowSize()[1];
      }
      return rows;
    };
    exports.wordWrap = (str, options = {}) => {
      if (!str) return str;
      if (typeof options === "number") {
        options = { width: options };
      }
      let { indent = "", newline = "\n" + indent, width = 80 } = options;
      let spaces = (newline + indent).match(/[^\S\n]/g) || [];
      width -= spaces.length;
      let source = `.{1,${width}}([\\s\\u200B]+|$)|[^\\s\\u200B]+?([\\s\\u200B]+|$)`;
      let output = str.trim();
      let regex = new RegExp(source, "g");
      let lines = output.match(regex) || [];
      lines = lines.map((line) => line.replace(/\n$/, ""));
      if (options.padEnd) lines = lines.map((line) => line.padEnd(width, " "));
      if (options.padStart) lines = lines.map((line) => line.padStart(width, " "));
      return indent + lines.join(newline);
    };
    exports.unmute = (color) => {
      let name2 = color.stack.find((n) => colors.keys.color.includes(n));
      if (name2) {
        return colors[name2];
      }
      let bg = color.stack.find((n) => n.slice(2) === "bg");
      if (bg) {
        return colors[name2.slice(2)];
      }
      return (str) => str;
    };
    exports.pascal = (str) => str ? str[0].toUpperCase() + str.slice(1) : "";
    exports.inverse = (color) => {
      if (!color || !color.stack) return color;
      let name2 = color.stack.find((n) => colors.keys.color.includes(n));
      if (name2) {
        let col = colors["bg" + exports.pascal(name2)];
        return col ? col.black : color;
      }
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (bg) {
        return colors[bg.slice(2).toLowerCase()] || color;
      }
      return colors.none;
    };
    exports.complement = (color) => {
      if (!color || !color.stack) return color;
      let name2 = color.stack.find((n) => colors.keys.color.includes(n));
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (name2 && !bg) {
        return colors[complements[name2] || name2];
      }
      if (bg) {
        let lower = bg.slice(2).toLowerCase();
        let comp = complements[lower];
        if (!comp) return color;
        return colors["bg" + exports.pascal(comp)] || color;
      }
      return colors.none;
    };
    exports.meridiem = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      let hrs = hours === 0 ? 12 : hours;
      let min = minutes < 10 ? "0" + minutes : minutes;
      return hrs + ":" + min + " " + ampm;
    };
    exports.set = (obj = {}, prop = "", val) => {
      return prop.split(".").reduce((acc, k2, i2, arr) => {
        let value = arr.length - 1 > i2 ? acc[k2] || {} : val;
        if (!exports.isObject(value) && i2 < arr.length - 1) value = {};
        return acc[k2] = value;
      }, obj);
    };
    exports.get = (obj = {}, prop = "", fallback) => {
      let value = obj[prop] == null ? prop.split(".").reduce((acc, k2) => acc && acc[k2], obj) : obj[prop];
      return value == null ? fallback : value;
    };
    exports.mixin = (target, b2) => {
      if (!isObject2(target)) return b2;
      if (!isObject2(b2)) return target;
      for (let key of Object.keys(b2)) {
        let desc = Object.getOwnPropertyDescriptor(b2, key);
        if (hasOwnProperty.call(desc, "value")) {
          if (hasOwnProperty.call(target, key) && isObject2(desc.value)) {
            let existing = Object.getOwnPropertyDescriptor(target, key);
            if (isObject2(existing.value) && existing.value !== desc.value) {
              target[key] = exports.merge({}, target[key], b2[key]);
            } else {
              Reflect.defineProperty(target, key, desc);
            }
          } else {
            Reflect.defineProperty(target, key, desc);
          }
        } else {
          Reflect.defineProperty(target, key, desc);
        }
      }
      return target;
    };
    exports.merge = (...args) => {
      let target = {};
      for (let ele of args) exports.mixin(target, ele);
      return target;
    };
    exports.mixinEmitter = (obj, emitter) => {
      let proto = emitter.constructor.prototype;
      for (let key of Object.keys(proto)) {
        let val = proto[key];
        if (typeof val === "function") {
          exports.define(obj, key, val.bind(emitter));
        } else {
          exports.define(obj, key, val);
        }
      }
    };
    var onExit = (quit, code) => {
      if (onExitCalled) return;
      onExitCalled = true;
      onExitCallbacks.forEach((fn2) => fn2());
      if (quit === true) {
        process.exit(128 + code);
      }
    };
    var onSigTerm = onExit.bind(null, true, 15);
    var onSigInt = onExit.bind(null, true, 2);
    exports.onExit = (callback) => {
      if (onExitCallbacks.size === 0) {
        process.once("SIGTERM", onSigTerm);
        process.once("SIGINT", onSigInt);
        process.once("exit", onExit);
      }
      onExitCallbacks.add(callback);
      return () => {
        onExitCallbacks.delete(callback);
        if (onExitCallbacks.size === 0) {
          process.off("SIGTERM", onSigTerm);
          process.off("SIGINT", onSigInt);
          process.off("exit", onExit);
        }
      };
    };
    exports.define = (obj, key, value) => {
      Reflect.defineProperty(obj, key, { value });
    };
    exports.defineExport = (obj, key, fn2) => {
      let custom;
      Reflect.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set(val) {
          custom = val;
        },
        get() {
          return custom ? custom() : fn2();
        }
      });
    };
  }
});

// node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports, module) {
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
    var ansiRegex = require_ansi_regex();
    module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/combos.js
var require_combos = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/combos.js"(exports) {
    exports.ctrl = {
      a: "first",
      b: "backward",
      c: "cancel",
      d: "deleteForward",
      e: "last",
      f: "forward",
      g: "reset",
      i: "tab",
      k: "cutForward",
      l: "reset",
      n: "newItem",
      m: "cancel",
      j: "submit",
      p: "search",
      r: "remove",
      s: "save",
      u: "undo",
      w: "cutLeft",
      x: "toggleCursor",
      v: "paste"
    };
    exports.shift = {
      up: "shiftUp",
      down: "shiftDown",
      left: "shiftLeft",
      right: "shiftRight",
      tab: "prev"
    };
    exports.fn = {
      up: "pageUp",
      down: "pageDown",
      left: "pageLeft",
      right: "pageRight",
      delete: "deleteForward"
    };
    exports.option = {
      b: "backward",
      f: "forward",
      d: "cutRight",
      left: "cutLeft",
      up: "altUp",
      down: "altDown"
    };
    exports.keys = {
      pageup: "pageUp",
      // <fn>+<up> (mac), <Page Up> (windows)
      pagedown: "pageDown",
      // <fn>+<down> (mac), <Page Down> (windows)
      home: "home",
      // <fn>+<left> (mac), <home> (windows)
      end: "end",
      // <fn>+<right> (mac), <end> (windows)
      cancel: "cancel",
      delete: "deleteForward",
      backspace: "delete",
      down: "down",
      enter: "submit",
      escape: "cancel",
      left: "left",
      space: "space",
      number: "number",
      return: "submit",
      right: "right",
      tab: "next",
      up: "up"
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/queue.js
var require_queue = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/queue.js"(exports, module) {
    module.exports = class Queue {
      _queue = [];
      _executing = false;
      _jobRunner = null;
      constructor(jobRunner) {
        this._jobRunner = jobRunner;
      }
      enqueue = (...args) => {
        this._queue.push(args);
        this._dequeue();
      };
      destroy() {
        this._queue.length = 0;
        this._jobRunner = null;
      }
      _dequeue() {
        if (this._executing || !this._queue.length) return;
        this._executing = true;
        this._jobRunner(...this._queue.shift());
        setTimeout(() => {
          this._executing = false;
          this._dequeue();
        });
      }
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/keypress.js
var require_keypress = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/keypress.js"(exports, module) {
    var readline = __require("readline");
    var combos = require_combos();
    var Queue = require_queue();
    var metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
    var fnKeyRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
    var keyName = {
      /* xterm/gnome ESC O letter */
      "OP": "f1",
      "OQ": "f2",
      "OR": "f3",
      "OS": "f4",
      /* xterm/rxvt ESC [ number ~ */
      "[11~": "f1",
      "[12~": "f2",
      "[13~": "f3",
      "[14~": "f4",
      /* from Cygwin and used in libuv */
      "[[A": "f1",
      "[[B": "f2",
      "[[C": "f3",
      "[[D": "f4",
      "[[E": "f5",
      /* common */
      "[15~": "f5",
      "[17~": "f6",
      "[18~": "f7",
      "[19~": "f8",
      "[20~": "f9",
      "[21~": "f10",
      "[23~": "f11",
      "[24~": "f12",
      /* xterm ESC [ letter */
      "[A": "up",
      "[B": "down",
      "[C": "right",
      "[D": "left",
      "[E": "clear",
      "[F": "end",
      "[H": "home",
      /* xterm/gnome ESC O letter */
      "OA": "up",
      "OB": "down",
      "OC": "right",
      "OD": "left",
      "OE": "clear",
      "OF": "end",
      "OH": "home",
      /* xterm/rxvt ESC [ number ~ */
      "[1~": "home",
      "[2~": "insert",
      "[3~": "delete",
      "[4~": "end",
      "[5~": "pageup",
      "[6~": "pagedown",
      /* putty */
      "[[5~": "pageup",
      "[[6~": "pagedown",
      /* rxvt */
      "[7~": "home",
      "[8~": "end",
      /* rxvt keys with modifiers */
      "[a": "up",
      "[b": "down",
      "[c": "right",
      "[d": "left",
      "[e": "clear",
      "[2$": "insert",
      "[3$": "delete",
      "[5$": "pageup",
      "[6$": "pagedown",
      "[7$": "home",
      "[8$": "end",
      "Oa": "up",
      "Ob": "down",
      "Oc": "right",
      "Od": "left",
      "Oe": "clear",
      "[2^": "insert",
      "[3^": "delete",
      "[5^": "pageup",
      "[6^": "pagedown",
      "[7^": "home",
      "[8^": "end",
      /* misc. */
      "[Z": "tab"
    };
    function isShiftKey(code) {
      return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(code);
    }
    function isCtrlKey(code) {
      return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(code);
    }
    var keypress = (s3 = "", event2 = {}) => {
      let parts;
      let key = {
        name: event2.name,
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        sequence: s3,
        raw: s3,
        ...event2
      };
      if (Buffer.isBuffer(s3)) {
        if (s3[0] > 127 && s3[1] === void 0) {
          s3[0] -= 128;
          s3 = "\x1B" + String(s3);
        } else {
          s3 = String(s3);
        }
      } else if (s3 !== void 0 && typeof s3 !== "string") {
        s3 = String(s3);
      } else if (!s3) {
        s3 = key.sequence || "";
      }
      key.sequence = key.sequence || s3 || key.name;
      if (s3 === "\r") {
        key.raw = void 0;
        key.name = "return";
      } else if (s3 === "\n") {
        key.name = "enter";
      } else if (s3 === "	") {
        key.name = "tab";
      } else if (s3 === "\b" || s3 === "\x7F" || s3 === "\x1B\x7F" || s3 === "\x1B\b") {
        key.name = "backspace";
        key.meta = s3.charAt(0) === "\x1B";
      } else if (s3 === "\x1B" || s3 === "\x1B\x1B") {
        key.name = "escape";
        key.meta = s3.length === 2;
      } else if (s3 === " " || s3 === "\x1B ") {
        key.name = "space";
        key.meta = s3.length === 2;
      } else if (s3 <= "") {
        key.name = String.fromCharCode(s3.charCodeAt(0) + "a".charCodeAt(0) - 1);
        key.ctrl = true;
      } else if (s3.length === 1 && s3 >= "0" && s3 <= "9") {
        key.name = "number";
      } else if (s3.length === 1 && s3 >= "a" && s3 <= "z") {
        key.name = s3;
      } else if (s3.length === 1 && s3 >= "A" && s3 <= "Z") {
        key.name = s3.toLowerCase();
        key.shift = true;
      } else if (parts = metaKeyCodeRe.exec(s3)) {
        key.meta = true;
        key.shift = /^[A-Z]$/.test(parts[1]);
      } else if (parts = fnKeyRe.exec(s3)) {
        let segs = [...s3];
        if (segs[0] === "\x1B" && segs[1] === "\x1B") {
          key.option = true;
        }
        let code = [parts[1], parts[2], parts[4], parts[6]].filter(Boolean).join("");
        let modifier = (parts[3] || parts[5] || 1) - 1;
        key.ctrl = !!(modifier & 4);
        key.meta = !!(modifier & 10);
        key.shift = !!(modifier & 1);
        key.code = code;
        key.name = keyName[code];
        key.shift = isShiftKey(code) || key.shift;
        key.ctrl = isCtrlKey(code) || key.ctrl;
      }
      return key;
    };
    keypress.listen = (options = {}, onKeypress) => {
      let { stdin: stdin2 } = options;
      if (!stdin2 || stdin2 !== process.stdin && !stdin2.isTTY) {
        throw new Error("Invalid stream passed");
      }
      let rl = readline.createInterface({ terminal: true, input: stdin2 });
      readline.emitKeypressEvents(stdin2, rl);
      const queue = new Queue((buf, key) => onKeypress(buf, keypress(buf, key), rl));
      let isRaw = stdin2.isRaw;
      if (stdin2.isTTY) stdin2.setRawMode(true);
      stdin2.on("keypress", queue.enqueue);
      rl.resume();
      let off = () => {
        if (stdin2.isTTY) stdin2.setRawMode(isRaw);
        stdin2.removeListener("keypress", queue.enqueue);
        queue.destroy();
        rl.pause();
        rl.close();
      };
      return off;
    };
    keypress.action = (buf, key, customActions) => {
      let obj = { ...combos, ...customActions };
      if (key.ctrl) {
        key.action = obj.ctrl[key.name];
        return key;
      }
      if (key.option && obj.option) {
        key.action = obj.option[key.name];
        return key;
      }
      if (key.shift) {
        key.action = obj.shift[key.name];
        return key;
      }
      key.action = obj.keys[key.name];
      return key;
    };
    module.exports = keypress;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/timer.js
var require_timer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/timer.js"(exports, module) {
    module.exports = (prompt2) => {
      prompt2.timers = prompt2.timers || {};
      let timers = prompt2.options.timers;
      if (!timers) return;
      for (let key of Object.keys(timers)) {
        let opts = timers[key];
        if (typeof opts === "number") {
          opts = { interval: opts };
        }
        create(prompt2, key, opts);
      }
    };
    function create(prompt2, name2, options = {}) {
      let timer16 = prompt2.timers[name2] = { name: name2, start: Date.now(), ms: 0, tick: 0 };
      let ms = options.interval || 120;
      timer16.frames = options.frames || [];
      timer16.loading = true;
      let interval = setInterval(() => {
        timer16.ms = Date.now() - timer16.start;
        timer16.tick++;
        prompt2.render();
      }, ms);
      timer16.stop = () => {
        timer16.loading = false;
        clearInterval(interval);
      };
      Reflect.defineProperty(timer16, "interval", { value: interval });
      prompt2.once("close", () => timer16.stop());
      return timer16.stop;
    }
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/state.js"(exports, module) {
    var { define, width } = require_utils2();
    var State = class {
      constructor(prompt2) {
        let options = prompt2.options;
        define(this, "_prompt", prompt2);
        this.type = prompt2.type;
        this.name = prompt2.name;
        this.message = "";
        this.header = "";
        this.footer = "";
        this.error = "";
        this.hint = "";
        this.input = "";
        this.cursor = 0;
        this.index = 0;
        this.lines = 0;
        this.tick = 0;
        this.prompt = "";
        this.buffer = "";
        this.width = width(options.stdout || process.stdout);
        Object.assign(this, options);
        this.name = this.name || this.message;
        this.message = this.message || this.name;
        this.symbols = prompt2.symbols;
        this.styles = prompt2.styles;
        this.required = /* @__PURE__ */ new Set();
        this.cancelled = false;
        this.submitted = false;
      }
      clone() {
        let state = { ...this };
        state.status = this.status;
        state.buffer = Buffer.from(state.buffer);
        delete state.clone;
        return state;
      }
      set color(val) {
        this._color = val;
      }
      get color() {
        let styles = this.prompt.styles;
        if (this.cancelled) return styles.cancelled;
        if (this.submitted) return styles.submitted;
        let color = this._color || styles[this.status];
        return typeof color === "function" ? color : styles.pending;
      }
      set loading(value) {
        this._loading = value;
      }
      get loading() {
        if (typeof this._loading === "boolean") return this._loading;
        if (this.loadingChoices) return "choices";
        return false;
      }
      get status() {
        if (this.cancelled) return "cancelled";
        if (this.submitted) return "submitted";
        return "pending";
      }
    };
    module.exports = State;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/styles.js
var require_styles = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/styles.js"(exports, module) {
    var utils = require_utils2();
    var colors = require_ansi_colors();
    var styles = {
      default: colors.noop,
      noop: colors.noop,
      /**
       * Modifiers
       */
      set inverse(custom) {
        this._inverse = custom;
      },
      get inverse() {
        return this._inverse || utils.inverse(this.primary);
      },
      set complement(custom) {
        this._complement = custom;
      },
      get complement() {
        return this._complement || utils.complement(this.primary);
      },
      /**
       * Main color
       */
      primary: colors.cyan,
      /**
       * Main palette
       */
      success: colors.green,
      danger: colors.magenta,
      strong: colors.bold,
      warning: colors.yellow,
      muted: colors.dim,
      disabled: colors.gray,
      dark: colors.dim.gray,
      underline: colors.underline,
      set info(custom) {
        this._info = custom;
      },
      get info() {
        return this._info || this.primary;
      },
      set em(custom) {
        this._em = custom;
      },
      get em() {
        return this._em || this.primary.underline;
      },
      set heading(custom) {
        this._heading = custom;
      },
      get heading() {
        return this._heading || this.muted.underline;
      },
      /**
       * Statuses
       */
      set pending(custom) {
        this._pending = custom;
      },
      get pending() {
        return this._pending || this.primary;
      },
      set submitted(custom) {
        this._submitted = custom;
      },
      get submitted() {
        return this._submitted || this.success;
      },
      set cancelled(custom) {
        this._cancelled = custom;
      },
      get cancelled() {
        return this._cancelled || this.danger;
      },
      /**
       * Special styling
       */
      set typing(custom) {
        this._typing = custom;
      },
      get typing() {
        return this._typing || this.dim;
      },
      set placeholder(custom) {
        this._placeholder = custom;
      },
      get placeholder() {
        return this._placeholder || this.primary.dim;
      },
      set highlight(custom) {
        this._highlight = custom;
      },
      get highlight() {
        return this._highlight || this.inverse;
      }
    };
    styles.merge = (options = {}) => {
      if (options.styles && typeof options.styles.enabled === "boolean") {
        colors.enabled = options.styles.enabled;
      }
      if (options.styles && typeof options.styles.visible === "boolean") {
        colors.visible = options.styles.visible;
      }
      let result = utils.merge({}, styles, options.styles);
      delete result.merge;
      for (let key of Object.keys(colors)) {
        if (!hasOwnProperty.call(result, key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      for (let key of Object.keys(colors.styles)) {
        if (!hasOwnProperty.call(result, key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      return result;
    };
    module.exports = styles;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/symbols.js
var require_symbols2 = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/symbols.js"(exports, module) {
    var isWindows = process.platform === "win32";
    var colors = require_ansi_colors();
    var utils = require_utils2();
    var symbols = {
      ...colors.symbols,
      upDownDoubleArrow: "\u21D5",
      upDownDoubleArrow2: "\u2B0D",
      upDownArrow: "\u2195",
      asterisk: "*",
      asterism: "\u2042",
      bulletWhite: "\u25E6",
      electricArrow: "\u2301",
      ellipsisLarge: "\u22EF",
      ellipsisSmall: "\u2026",
      fullBlock: "\u2588",
      identicalTo: "\u2261",
      indicator: colors.symbols.check,
      leftAngle: "\u2039",
      mark: "\u203B",
      minus: "\u2212",
      multiplication: "\xD7",
      obelus: "\xF7",
      percent: "%",
      pilcrow: "\xB6",
      pilcrow2: "\u2761",
      pencilUpRight: "\u2710",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      plus: "+",
      plusMinus: "\xB1",
      pointRight: "\u261E",
      rightAngle: "\u203A",
      section: "\xA7",
      hexagon: { off: "\u2B21", on: "\u2B22", disabled: "\u2B22" },
      ballot: { on: "\u2611", off: "\u2610", disabled: "\u2612" },
      stars: { on: "\u2605", off: "\u2606", disabled: "\u2606" },
      folder: { on: "\u25BC", off: "\u25B6", disabled: "\u25B6" },
      prefix: {
        pending: colors.symbols.question,
        submitted: colors.symbols.check,
        cancelled: colors.symbols.cross
      },
      separator: {
        pending: colors.symbols.pointerSmall,
        submitted: colors.symbols.middot,
        cancelled: colors.symbols.middot
      },
      radio: {
        off: isWindows ? "( )" : "\u25EF",
        on: isWindows ? "(*)" : "\u25C9",
        disabled: isWindows ? "(|)" : "\u24BE"
      },
      numbers: ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473", "\u3251", "\u3252", "\u3253", "\u3254", "\u3255", "\u3256", "\u3257", "\u3258", "\u3259", "\u325A", "\u325B", "\u325C", "\u325D", "\u325E", "\u325F", "\u32B1", "\u32B2", "\u32B3", "\u32B4", "\u32B5", "\u32B6", "\u32B7", "\u32B8", "\u32B9", "\u32BA", "\u32BB", "\u32BC", "\u32BD", "\u32BE", "\u32BF"]
    };
    symbols.merge = (options) => {
      let result = utils.merge({}, colors.symbols, symbols, options.symbols);
      delete result.merge;
      return result;
    };
    module.exports = symbols;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/theme.js
var require_theme = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/theme.js"(exports, module) {
    var styles = require_styles();
    var symbols = require_symbols2();
    var utils = require_utils2();
    module.exports = (prompt2) => {
      prompt2.options = utils.merge({}, prompt2.options.theme, prompt2.options);
      prompt2.symbols = symbols.merge(prompt2.options);
      prompt2.styles = styles.merge(prompt2.options);
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/ansi.js
var require_ansi = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/ansi.js"(exports, module) {
    var isTerm = process.env.TERM_PROGRAM === "Apple_Terminal";
    var stripAnsi = require_strip_ansi();
    var utils = require_utils2();
    var ansi = module.exports = exports;
    var ESC = "\x1B[";
    var BEL = "\x07";
    var hidden = false;
    var code = ansi.code = {
      bell: BEL,
      beep: BEL,
      beginning: `${ESC}G`,
      down: `${ESC}J`,
      esc: ESC,
      getPosition: `${ESC}6n`,
      hide: `${ESC}?25l`,
      line: `${ESC}2K`,
      lineEnd: `${ESC}K`,
      lineStart: `${ESC}1K`,
      restorePosition: ESC + (isTerm ? "8" : "u"),
      savePosition: ESC + (isTerm ? "7" : "s"),
      screen: `${ESC}2J`,
      show: `${ESC}?25h`,
      up: `${ESC}1J`
    };
    var cursor = ansi.cursor = {
      get hidden() {
        return hidden;
      },
      hide() {
        hidden = true;
        return code.hide;
      },
      show() {
        hidden = false;
        return code.show;
      },
      forward: (count = 1) => `${ESC}${count}C`,
      backward: (count = 1) => `${ESC}${count}D`,
      nextLine: (count = 1) => `${ESC}E`.repeat(count),
      prevLine: (count = 1) => `${ESC}F`.repeat(count),
      up: (count = 1) => count ? `${ESC}${count}A` : "",
      down: (count = 1) => count ? `${ESC}${count}B` : "",
      right: (count = 1) => count ? `${ESC}${count}C` : "",
      left: (count = 1) => count ? `${ESC}${count}D` : "",
      to(x, y) {
        return y ? `${ESC}${y + 1};${x + 1}H` : `${ESC}${x + 1}G`;
      },
      move(x = 0, y = 0) {
        let res = "";
        res += x < 0 ? cursor.left(-x) : x > 0 ? cursor.right(x) : "";
        res += y < 0 ? cursor.up(-y) : y > 0 ? cursor.down(y) : "";
        return res;
      },
      strLen(str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i2 = 0; i2 < len; i2++) {
          charCode = str.charCodeAt(i2);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        return realLength;
      },
      restore(state = {}) {
        let { after, cursor: cursor2, initial, input, prompt: prompt2, size, value } = state;
        initial = utils.isPrimitive(initial) ? String(initial) : "";
        input = utils.isPrimitive(input) ? String(input) : "";
        value = utils.isPrimitive(value) ? String(value) : "";
        if (size) {
          let codes = ansi.cursor.up(size) + ansi.cursor.to(this.strLen(prompt2));
          let diff = input.length - cursor2;
          if (diff > 0) {
            codes += ansi.cursor.left(diff);
          }
          return codes;
        }
        if (value || after) {
          let pos = !input && !!initial ? -this.strLen(initial) : -this.strLen(input) + cursor2;
          if (after) pos -= this.strLen(after);
          if (input === "" && initial && !prompt2.includes(initial)) {
            pos += this.strLen(initial);
          }
          return ansi.cursor.move(pos);
        }
      }
    };
    var erase = ansi.erase = {
      screen: code.screen,
      up: code.up,
      down: code.down,
      line: code.line,
      lineEnd: code.lineEnd,
      lineStart: code.lineStart,
      lines(n) {
        let str = "";
        for (let i2 = 0; i2 < n; i2++) {
          str += ansi.erase.line + (i2 < n - 1 ? ansi.cursor.up(1) : "");
        }
        if (n) str += ansi.code.beginning;
        return str;
      }
    };
    ansi.clear = (input = "", columns = process.stdout.columns) => {
      if (!columns) return erase.line + cursor.to(0);
      let width = (str) => [...stripAnsi(str)].length;
      let lines = input.split(/\r?\n/);
      let rows = 0;
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / columns);
      }
      return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompt.js
var require_prompt = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompt.js"(exports, module) {
    var Events = __require("events");
    var stripAnsi = require_strip_ansi();
    var keypress = require_keypress();
    var timer16 = require_timer();
    var State = require_state();
    var theme2 = require_theme();
    var utils = require_utils2();
    var ansi = require_ansi();
    var Prompt = class _Prompt extends Events {
      constructor(options = {}) {
        super();
        this.name = options.name;
        this.type = options.type;
        this.options = options;
        theme2(this);
        timer16(this);
        this.state = new State(this);
        this.initial = [options.initial, options.default].find((v2) => v2 != null);
        this.stdout = options.stdout || process.stdout;
        this.stdin = options.stdin || process.stdin;
        this.scale = options.scale || 1;
        this.term = this.options.term || process.env.TERM_PROGRAM;
        this.margin = margin(this.options.margin);
        this.setMaxListeners(0);
        setOptions(this);
      }
      async keypress(input, event2 = {}) {
        this.keypressed = true;
        let key = keypress.action(input, keypress(input, event2), this.options.actions);
        this.state.keypress = key;
        this.emit("keypress", input, key);
        this.emit("state", this.state.clone());
        const fn2 = this.options[key.action] || this[key.action] || this.dispatch;
        if (typeof fn2 === "function") {
          return await fn2.call(this, input, key);
        }
        this.alert();
      }
      alert() {
        delete this.state.alert;
        if (this.options.show === false) {
          this.emit("alert");
        } else {
          this.stdout.write(ansi.code.beep);
        }
      }
      cursorHide() {
        this.stdout.write(ansi.cursor.hide());
        const releaseOnExit = utils.onExit(() => this.cursorShow());
        this.on("close", () => {
          this.cursorShow();
          releaseOnExit();
        });
      }
      cursorShow() {
        this.stdout.write(ansi.cursor.show());
      }
      write(str) {
        if (!str) return;
        if (this.stdout && this.state.show !== false) {
          this.stdout.write(str);
        }
        this.state.buffer += str;
      }
      clear(lines = 0) {
        let buffer = this.state.buffer;
        this.state.buffer = "";
        if (!buffer && !lines || this.options.show === false) return;
        this.stdout.write(ansi.cursor.down(lines) + ansi.clear(buffer, this.width));
      }
      restore() {
        if (this.state.closed || this.options.show === false) return;
        let { prompt: prompt2, after, rest } = this.sections();
        let { cursor, initial = "", input = "", value = "" } = this;
        let size = this.state.size = rest.length;
        let state = { after, cursor, initial, input, prompt: prompt2, size, value };
        let codes = ansi.cursor.restore(state);
        if (codes) {
          this.stdout.write(codes);
        }
      }
      sections() {
        let { buffer, input, prompt: prompt2 } = this.state;
        prompt2 = stripAnsi(prompt2);
        let buf = stripAnsi(buffer);
        let idx = buf.indexOf(prompt2);
        let header = buf.slice(0, idx);
        let rest = buf.slice(idx);
        let lines = rest.split("\n");
        let first = lines[0];
        let last = lines[lines.length - 1];
        let promptLine = prompt2 + (input ? " " + input : "");
        let len = promptLine.length;
        let after = len < first.length ? first.slice(len + 1) : "";
        return { header, prompt: first, after, rest: lines.slice(1), last };
      }
      async submit() {
        this.state.submitted = true;
        this.state.validating = true;
        if (this.options.onSubmit) {
          await this.options.onSubmit.call(this, this.name, this.value, this);
        }
        let result = this.state.error || await this.validate(this.value, this.state);
        if (result !== true) {
          let error2 = "\n" + this.symbols.pointer + " ";
          if (typeof result === "string") {
            error2 += result.trim();
          } else {
            error2 += "Invalid input";
          }
          this.state.error = "\n" + this.styles.danger(error2);
          this.state.submitted = false;
          await this.render();
          await this.alert();
          this.state.validating = false;
          this.state.error = void 0;
          return;
        }
        this.state.validating = false;
        await this.render();
        await this.close();
        this.value = await this.result(this.value);
        this.emit("submit", this.value);
      }
      async cancel(err) {
        this.state.cancelled = this.state.submitted = true;
        await this.render();
        await this.close();
        if (typeof this.options.onCancel === "function") {
          await this.options.onCancel.call(this, this.name, this.value, this);
        }
        this.emit("cancel", await this.error(err));
      }
      async close() {
        this.state.closed = true;
        try {
          let sections = this.sections();
          let lines = Math.ceil(sections.prompt.length / this.width);
          if (sections.rest) {
            this.write(ansi.cursor.down(sections.rest.length));
          }
          this.write("\n".repeat(lines));
        } catch (err) {
        }
        this.emit("close");
      }
      start() {
        if (!this.stop && this.options.show !== false) {
          this.stop = keypress.listen(this, this.keypress.bind(this));
          this.once("close", this.stop);
          this.emit("start", this);
        }
      }
      async skip() {
        this.skipped = this.options.skip === true;
        if (typeof this.options.skip === "function") {
          this.skipped = await this.options.skip.call(this, this.name, this.value);
        }
        return this.skipped;
      }
      async initialize() {
        let { format: format2, options, result } = this;
        this.format = () => format2.call(this, this.value);
        this.result = () => result.call(this, this.value);
        if (typeof options.initial === "function") {
          this.initial = await options.initial.call(this, this);
        }
        if (typeof options.onRun === "function") {
          await options.onRun.call(this, this);
        }
        if (typeof options.onSubmit === "function") {
          let onSubmit = options.onSubmit.bind(this);
          let submit = this.submit.bind(this);
          delete this.options.onSubmit;
          this.submit = async () => {
            await onSubmit(this.name, this.value, this);
            return submit();
          };
        }
        await this.start();
        await this.render();
      }
      render() {
        throw new Error("expected prompt to have a custom render method");
      }
      run() {
        return new Promise(async (resolve3, reject) => {
          this.once("submit", resolve3);
          this.once("cancel", reject);
          if (await this.skip()) {
            this.render = () => {
            };
            return this.submit();
          }
          await this.initialize();
          this.emit("run");
        });
      }
      async element(name2, choice, i2) {
        let { options, state, symbols, timers } = this;
        let timer17 = timers && timers[name2];
        state.timer = timer17;
        let value = options[name2] || state[name2] || symbols[name2];
        let val = choice && choice[name2] != null ? choice[name2] : await value;
        if (val === "") return val;
        let res = await this.resolve(val, state, choice, i2);
        if (!res && choice && choice[name2]) {
          return this.resolve(value, state, choice, i2);
        }
        return res;
      }
      async prefix() {
        let element = await this.element("prefix") || this.symbols;
        let timer17 = this.timers && this.timers.prefix;
        let state = this.state;
        state.timer = timer17;
        if (utils.isObject(element)) element = element[state.status] || element.pending;
        if (!utils.hasColor(element)) {
          let style2 = this.styles[state.status] || this.styles.pending;
          return style2(element);
        }
        return element;
      }
      async message() {
        let message = await this.element("message");
        if (!utils.hasColor(message)) {
          return this.styles.strong(message);
        }
        return message;
      }
      async separator() {
        let element = await this.element("separator") || this.symbols;
        let timer17 = this.timers && this.timers.separator;
        let state = this.state;
        state.timer = timer17;
        let value = element[state.status] || element.pending || state.separator;
        let ele = await this.resolve(value, state);
        if (utils.isObject(ele)) ele = ele[state.status] || ele.pending;
        if (!utils.hasColor(ele)) {
          return this.styles.muted(ele);
        }
        return ele;
      }
      async pointer(choice, i2) {
        let val = await this.element("pointer", choice, i2);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles = this.styles;
          let focused = this.index === i2;
          let style2 = focused ? styles.primary : (val2) => val2;
          let ele = await this.resolve(val[focused ? "on" : "off"] || val, this.state);
          let styled = !utils.hasColor(ele) ? style2(ele) : ele;
          return focused ? styled : " ".repeat(ele.length);
        }
      }
      async indicator(choice, i2) {
        let val = await this.element("indicator", choice, i2);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles = this.styles;
          let enabled = choice.enabled === true;
          let style2 = enabled ? styles.success : styles.dark;
          let ele = val[enabled ? "on" : "off"] || val;
          return !utils.hasColor(ele) ? style2(ele) : ele;
        }
        return "";
      }
      body() {
        return null;
      }
      footer() {
        if (this.state.status === "pending") {
          return this.element("footer");
        }
      }
      header() {
        if (this.state.status === "pending") {
          return this.element("header");
        }
      }
      async hint() {
        if (this.state.status === "pending" && !this.isValue(this.state.input)) {
          let hint = await this.element("hint");
          if (!utils.hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      error(err) {
        return !this.state.submitted ? err || this.state.error : "";
      }
      format(value) {
        return value;
      }
      result(value) {
        return value;
      }
      validate(value) {
        if (this.options.required === true) {
          return this.isValue(value);
        }
        return true;
      }
      isValue(value) {
        return value != null && value !== "";
      }
      resolve(value, ...args) {
        return utils.resolve(this, value, ...args);
      }
      get base() {
        return _Prompt.prototype;
      }
      get style() {
        return this.styles[this.state.status];
      }
      get height() {
        return this.options.rows || utils.height(this.stdout, 25);
      }
      get width() {
        return this.options.columns || utils.width(this.stdout, 80);
      }
      get size() {
        return { width: this.width, height: this.height };
      }
      set cursor(value) {
        this.state.cursor = value;
      }
      get cursor() {
        return this.state.cursor;
      }
      set input(value) {
        this.state.input = value;
      }
      get input() {
        return this.state.input;
      }
      set value(value) {
        this.state.value = value;
      }
      get value() {
        let { input, value } = this.state;
        let result = [value, input].find(this.isValue.bind(this));
        return this.isValue(result) ? result : this.initial;
      }
      static get prompt() {
        return (options) => new this(options).run();
      }
    };
    function setOptions(prompt2) {
      let isValidKey = (key) => {
        return prompt2[key] === void 0 || typeof prompt2[key] === "function";
      };
      let ignore = [
        "actions",
        "choices",
        "initial",
        "margin",
        "roles",
        "styles",
        "symbols",
        "theme",
        "timers",
        "value"
      ];
      let ignoreFn = [
        "body",
        "footer",
        "error",
        "header",
        "hint",
        "indicator",
        "message",
        "prefix",
        "separator",
        "skip"
      ];
      for (let key of Object.keys(prompt2.options)) {
        if (ignore.includes(key)) continue;
        if (/^on[A-Z]/.test(key)) continue;
        let option = prompt2.options[key];
        if (typeof option === "function" && isValidKey(key)) {
          if (!ignoreFn.includes(key)) {
            prompt2[key] = option.bind(prompt2);
          }
        } else if (typeof prompt2[key] !== "function") {
          prompt2[key] = option;
        }
      }
    }
    function margin(value) {
      if (typeof value === "number") {
        value = [value, value, value, value];
      }
      let arr = [].concat(value || []);
      let pad = (i2) => i2 % 2 === 0 ? "\n" : " ";
      let res = [];
      for (let i2 = 0; i2 < 4; i2++) {
        let char = pad(i2);
        if (arr[i2]) {
          res.push(char.repeat(arr[i2]));
        } else {
          res.push("");
        }
      }
      return res;
    }
    module.exports = Prompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/roles.js
var require_roles = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/roles.js"(exports, module) {
    var utils = require_utils2();
    var roles = {
      default(prompt2, choice) {
        return choice;
      },
      checkbox(prompt2, choice) {
        throw new Error("checkbox role is not implemented yet");
      },
      editable(prompt2, choice) {
        throw new Error("editable role is not implemented yet");
      },
      expandable(prompt2, choice) {
        throw new Error("expandable role is not implemented yet");
      },
      heading(prompt2, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v2) => v2 != null);
        choice.message = choice.message || "";
        return choice;
      },
      input(prompt2, choice) {
        throw new Error("input role is not implemented yet");
      },
      option(prompt2, choice) {
        return roles.default(prompt2, choice);
      },
      radio(prompt2, choice) {
        throw new Error("radio role is not implemented yet");
      },
      separator(prompt2, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v2) => v2 != null);
        choice.message = choice.message || prompt2.symbols.line.repeat(5);
        return choice;
      },
      spacer(prompt2, choice) {
        return choice;
      }
    };
    module.exports = (name2, options = {}) => {
      let role = utils.merge({}, roles, options.roles);
      return role[name2] || role.default;
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/array.js
var require_array = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/array.js"(exports, module) {
    var stripAnsi = require_strip_ansi();
    var Prompt = require_prompt();
    var roles = require_roles();
    var utils = require_utils2();
    var { reorder, scrollUp, scrollDown, isObject: isObject2, swap } = utils;
    var ArrayPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.maxSelected = options.maxSelected || Infinity;
        this.multiple = options.multiple || false;
        this.initial = options.initial || 0;
        this.delay = options.delay || 0;
        this.longest = 0;
        this.num = "";
      }
      async initialize() {
        if (typeof this.options.initial === "function") {
          this.initial = await this.options.initial.call(this);
        }
        await this.reset(true);
        await super.initialize();
      }
      async reset() {
        let { choices, initial, autofocus, suggest } = this.options;
        this.state._choices = [];
        this.state.choices = [];
        this.choices = await Promise.all(await this.toChoices(choices));
        this.choices.forEach((ch) => ch.enabled = false);
        if (typeof suggest !== "function" && this.selectable.length === 0) {
          throw new Error("At least one choice must be selectable");
        }
        if (isObject2(initial)) initial = Object.keys(initial);
        if (Array.isArray(initial)) {
          if (autofocus != null) this.index = this.findIndex(autofocus);
          initial.forEach((v2) => this.enable(this.find(v2)));
          await this.render();
        } else {
          if (autofocus != null) initial = autofocus;
          if (typeof initial === "string") initial = this.findIndex(initial);
          if (typeof initial === "number" && initial > -1) {
            this.index = Math.max(0, Math.min(initial, this.choices.length));
            this.enable(this.find(this.index));
          }
        }
        if (this.isDisabled(this.focused)) {
          await this.down();
        }
      }
      async toChoices(value, parent) {
        this.state.loadingChoices = true;
        let choices = [];
        let index = 0;
        let toChoices = async (items, parent2) => {
          if (typeof items === "function") items = await items.call(this);
          if (items instanceof Promise) items = await items;
          for (let i2 = 0; i2 < items.length; i2++) {
            let choice = items[i2] = await this.toChoice(items[i2], index++, parent2);
            choices.push(choice);
            if (choice.choices) {
              await toChoices(choice.choices, choice);
            }
          }
          return choices;
        };
        return toChoices(value, parent).then((choices2) => {
          this.state.loadingChoices = false;
          return choices2;
        });
      }
      async toChoice(ele, i2, parent) {
        if (typeof ele === "function") ele = await ele.call(this, this);
        if (ele instanceof Promise) ele = await ele;
        if (typeof ele === "string") ele = { name: ele };
        if (ele.normalized) return ele;
        ele.normalized = true;
        let origVal = ele.value;
        let role = roles(ele.role, this.options);
        ele = role(this, ele);
        if (typeof ele.disabled === "string" && !ele.hint) {
          ele.hint = ele.disabled;
          ele.disabled = true;
        }
        if (ele.disabled === true && ele.hint == null) {
          ele.hint = "(disabled)";
        }
        if (ele.index != null) return ele;
        ele.name = ele.name || ele.key || ele.title || ele.value || ele.message;
        ele.message = ele.message || ele.name || "";
        ele.value = [ele.value, ele.name].find(this.isValue.bind(this));
        ele.input = "";
        ele.index = i2;
        ele.cursor = 0;
        utils.define(ele, "parent", parent);
        ele.level = parent ? parent.level + 1 : 1;
        if (ele.indent == null) {
          ele.indent = parent ? parent.indent + "  " : ele.indent || "";
        }
        ele.path = parent ? parent.path + "." + ele.name : ele.name;
        ele.enabled = !!(this.multiple && !this.isDisabled(ele) && (ele.enabled || this.isSelected(ele)));
        if (!this.isDisabled(ele)) {
          this.longest = Math.max(this.longest, stripAnsi(ele.message).length);
        }
        let choice = { ...ele };
        ele.reset = (input = choice.input, value = choice.value) => {
          for (let key of Object.keys(choice)) ele[key] = choice[key];
          ele.input = input;
          ele.value = value;
        };
        if (origVal == null && typeof ele.initial === "function") {
          ele.input = await ele.initial.call(this, this.state, ele, i2);
        }
        return ele;
      }
      async onChoice(choice, i2) {
        this.emit("choice", choice, i2, this);
        if (typeof choice.onChoice === "function") {
          await choice.onChoice.call(this, this.state, choice, i2);
        }
      }
      async addChoice(ele, i2, parent) {
        let choice = await this.toChoice(ele, i2, parent);
        this.choices.push(choice);
        this.index = this.choices.length - 1;
        this.limit = this.choices.length;
        return choice;
      }
      async newItem(item, i2, parent) {
        let ele = { name: "New choice name?", editable: true, newChoice: true, ...item };
        let choice = await this.addChoice(ele, i2, parent);
        choice.updateChoice = () => {
          delete choice.newChoice;
          choice.name = choice.message = choice.input;
          choice.input = "";
          choice.cursor = 0;
        };
        return this.render();
      }
      indent(choice) {
        if (choice.indent == null) {
          return choice.level > 1 ? "  ".repeat(choice.level - 1) : "";
        }
        return choice.indent;
      }
      dispatch(s3, key) {
        if (this.multiple && this[key.name]) return this[key.name]();
        this.alert();
      }
      focus(choice, enabled) {
        if (typeof enabled !== "boolean") enabled = choice.enabled;
        if (enabled && !choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        this.index = choice.index;
        choice.enabled = enabled && !this.isDisabled(choice);
        return choice;
      }
      space() {
        if (!this.multiple) return this.alert();
        if (!this.focused) return;
        this.toggle(this.focused);
        return this.render();
      }
      a() {
        if (this.maxSelected < this.choices.length) return this.alert();
        let enabled = this.selectable.every((ch) => ch.enabled);
        this.choices.forEach((ch) => ch.enabled = !enabled);
        return this.render();
      }
      i() {
        if (this.choices.length - this.selected.length > this.maxSelected) {
          return this.alert();
        }
        this.choices.forEach((ch) => ch.enabled = !ch.enabled);
        return this.render();
      }
      g() {
        if (!this.choices.some((ch) => !!ch.parent)) return this.a();
        const focused = this.focused;
        this.toggle(focused.parent && !focused.choices ? focused.parent : focused);
        return this.render();
      }
      toggle(choice, enabled) {
        if (!choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        if (typeof enabled !== "boolean") enabled = !choice.enabled;
        choice.enabled = enabled;
        if (choice.choices) {
          choice.choices.forEach((ch) => this.toggle(ch, enabled));
        }
        let parent = choice.parent;
        while (parent) {
          let choices = parent.choices.filter((ch) => this.isDisabled(ch));
          parent.enabled = choices.every((ch) => ch.enabled === true);
          parent = parent.parent;
        }
        reset(this, this.choices);
        this.emit("toggle", choice, this);
        return choice;
      }
      enable(choice) {
        if (this.selected.length >= this.maxSelected) return this.alert();
        choice.enabled = !this.isDisabled(choice);
        choice.choices && choice.choices.forEach(this.enable.bind(this));
        return choice;
      }
      disable(choice) {
        choice.enabled = false;
        choice.choices && choice.choices.forEach(this.disable.bind(this));
        return choice;
      }
      number(n) {
        this.num += n;
        let number = (num) => {
          let i2 = Number(num);
          if (i2 > this.choices.length - 1) return this.alert();
          let focused = this.focused;
          let choice = this.choices.find((ch) => i2 === ch.index);
          if (!choice.enabled && this.selected.length >= this.maxSelected) {
            return this.alert();
          }
          if (this.visible.indexOf(choice) === -1) {
            let choices = reorder(this.choices);
            let actualIdx = choices.indexOf(choice);
            if (focused.index > actualIdx) {
              let start = choices.slice(actualIdx, actualIdx + this.limit);
              let end = choices.filter((ch) => !start.includes(ch));
              this.choices = start.concat(end);
            } else {
              let pos = actualIdx - this.limit + 1;
              this.choices = choices.slice(pos).concat(choices.slice(0, pos));
            }
          }
          this.index = this.choices.indexOf(choice);
          this.toggle(this.focused);
          return this.render();
        };
        clearTimeout(this.numberTimeout);
        return new Promise((resolve3) => {
          let len = this.choices.length;
          let num = this.num;
          let handle = (val = false, res) => {
            clearTimeout(this.numberTimeout);
            if (val) res = number(num);
            this.num = "";
            resolve3(res);
          };
          if (num === "0" || num.length === 1 && Number(num + "0") > len) {
            return handle(true);
          }
          if (Number(num) > len) {
            return handle(false, this.alert());
          }
          this.numberTimeout = setTimeout(() => handle(true), this.delay);
        });
      }
      home() {
        this.choices = reorder(this.choices);
        this.index = 0;
        return this.render();
      }
      end() {
        let pos = this.choices.length - this.limit;
        let choices = reorder(this.choices);
        this.choices = choices.slice(pos).concat(choices.slice(0, pos));
        this.index = this.limit - 1;
        return this.render();
      }
      first() {
        this.index = 0;
        return this.render();
      }
      last() {
        this.index = this.visible.length - 1;
        return this.render();
      }
      prev() {
        if (this.visible.length <= 1) return this.alert();
        return this.up();
      }
      next() {
        if (this.visible.length <= 1) return this.alert();
        return this.down();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.cursor++;
        return this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.cursor--;
        return this.render();
      }
      up() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === 0) {
          return this.alert();
        }
        if (len > vis && idx === 0) {
          return this.scrollUp();
        }
        this.index = (idx - 1 % len + len) % len;
        if (this.isDisabled() && !this.allChoicesAreDisabled()) {
          return this.up();
        }
        return this.render();
      }
      down() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === vis - 1) {
          return this.alert();
        }
        if (len > vis && idx === vis - 1) {
          return this.scrollDown();
        }
        this.index = (idx + 1) % len;
        if (this.isDisabled() && !this.allChoicesAreDisabled()) {
          return this.down();
        }
        return this.render();
      }
      scrollUp(i2 = 0) {
        this.choices = scrollUp(this.choices);
        this.index = i2;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      scrollDown(i2 = this.visible.length - 1) {
        this.choices = scrollDown(this.choices);
        this.index = i2;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      async shiftUp() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index - 1);
          await this.up();
          this.sorting = false;
          return;
        }
        return this.scrollUp(this.index);
      }
      async shiftDown() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index + 1);
          await this.down();
          this.sorting = false;
          return;
        }
        return this.scrollDown(this.index);
      }
      pageUp() {
        if (this.visible.length <= 1) return this.alert();
        this.limit = Math.max(this.limit - 1, 0);
        this.index = Math.min(this.limit - 1, this.index);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      pageDown() {
        if (this.visible.length >= this.choices.length) return this.alert();
        this.index = Math.max(0, this.index);
        this.limit = Math.min(this.limit + 1, this.choices.length);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      swap(pos) {
        swap(this.choices, this.index, pos);
      }
      allChoicesAreDisabled(choices = this.choices) {
        return choices.every((choice) => this.isDisabled(choice));
      }
      isDisabled(choice = this.focused) {
        let keys2 = ["disabled", "collapsed", "hidden", "completing", "readonly"];
        if (choice && keys2.some((key) => choice[key] === true)) {
          return true;
        }
        return choice && choice.role === "heading";
      }
      isEnabled(choice = this.focused) {
        if (Array.isArray(choice)) return choice.every((ch) => this.isEnabled(ch));
        if (choice.choices) {
          let choices = choice.choices.filter((ch) => !this.isDisabled(ch));
          return choice.enabled && choices.every((ch) => this.isEnabled(ch));
        }
        return choice.enabled && !this.isDisabled(choice);
      }
      isChoice(choice, value) {
        return choice.name === value || choice.index === Number(value);
      }
      isSelected(choice) {
        if (Array.isArray(this.initial)) {
          return this.initial.some((value) => this.isChoice(choice, value));
        }
        return this.isChoice(choice, this.initial);
      }
      map(names = [], prop = "value") {
        return [].concat(names || []).reduce((acc, name2) => {
          acc[name2] = this.find(name2, prop);
          return acc;
        }, {});
      }
      filter(value, prop) {
        let isChoice = (ele, i2) => [ele.name, i2].includes(value);
        let fn2 = typeof value === "function" ? value : isChoice;
        let choices = this.options.multiple ? this.state._choices : this.choices;
        let result = choices.filter(fn2);
        if (prop) {
          return result.map((ch) => ch[prop]);
        }
        return result;
      }
      find(value, prop) {
        if (isObject2(value)) return prop ? value[prop] : value;
        let isChoice = (ele, i2) => [ele.name, i2].includes(value);
        let fn2 = typeof value === "function" ? value : isChoice;
        let choice = this.choices.find(fn2);
        if (choice) {
          return prop ? choice[prop] : choice;
        }
      }
      findIndex(value) {
        return this.choices.indexOf(this.find(value));
      }
      async submit() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.newChoice) {
          if (!choice.input) return this.alert();
          choice.updateChoice();
          return this.render();
        }
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        let { reorder: reorder2, sort } = this.options;
        let multi = this.multiple === true;
        let value = this.selected;
        if (value === void 0) {
          return this.alert();
        }
        if (Array.isArray(value) && reorder2 !== false && sort !== true) {
          value = utils.reorder(value);
        }
        this.value = multi ? value.map((ch) => ch.name) : value.name;
        return super.submit();
      }
      set choices(choices = []) {
        this.state._choices = this.state._choices || [];
        this.state.choices = choices;
        for (let choice of choices) {
          if (!this.state._choices.some((ch) => ch.name === choice.name)) {
            this.state._choices.push(choice);
          }
        }
        if (!this._initial && this.options.initial) {
          this._initial = true;
          let init2 = this.initial;
          if (typeof init2 === "string" || typeof init2 === "number") {
            let choice = this.find(init2);
            if (choice) {
              this.initial = choice.index;
              this.focus(choice, true);
            }
          }
        }
      }
      get choices() {
        return reset(this, this.state.choices || []);
      }
      set visible(visible) {
        this.state.visible = visible;
      }
      get visible() {
        return (this.state.visible || this.choices).slice(0, this.limit);
      }
      set limit(num) {
        this.state.limit = num;
      }
      get limit() {
        let { state, options, choices } = this;
        let limit = state.limit || this._limit || options.limit || choices.length;
        return Math.min(limit, this.height);
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        if (typeof super.value !== "string" && super.value === this.initial) {
          return this.input;
        }
        return super.value;
      }
      set index(i2) {
        this.state.index = i2;
      }
      get index() {
        return Math.max(0, this.state ? this.state.index : 0);
      }
      get enabled() {
        return this.filter(this.isEnabled.bind(this));
      }
      get focused() {
        let choice = this.choices[this.index];
        if (choice && this.state.submitted && this.multiple !== true) {
          choice.enabled = true;
        }
        return choice;
      }
      get selectable() {
        return this.choices.filter((choice) => !this.isDisabled(choice));
      }
      get selected() {
        return this.multiple ? this.enabled : this.focused;
      }
    };
    function reset(prompt2, choices) {
      if (choices instanceof Promise) return choices;
      if (typeof choices === "function") {
        if (utils.isAsyncFn(choices)) return choices;
        choices = choices.call(prompt2, prompt2);
      }
      for (let choice of choices) {
        if (Array.isArray(choice.choices)) {
          let items = choice.choices.filter((ch) => !prompt2.isDisabled(ch));
          choice.enabled = items.every((ch) => ch.enabled === true);
        }
        if (prompt2.isDisabled(choice) === true) {
          delete choice.enabled;
        }
      }
      return choices;
    }
    module.exports = ArrayPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/select.js
var require_select = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/select.js"(exports, module) {
    var ArrayPrompt = require_array();
    var utils = require_utils2();
    var SelectPrompt = class extends ArrayPrompt {
      constructor(options) {
        super(options);
        this.emptyError = this.options.emptyError || "No items were selected";
      }
      async dispatch(s3, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s3, key) : await super.dispatch(s3, key);
        }
        this.alert();
      }
      separator() {
        if (this.options.separator) return super.separator();
        let sep3 = this.styles.muted(this.symbols.ellipsis);
        return this.state.submitted ? super.separator() : sep3;
      }
      pointer(choice, i2) {
        return !this.multiple || this.options.pointer ? super.pointer(choice, i2) : "";
      }
      indicator(choice, i2) {
        return this.multiple ? super.indicator(choice, i2) : "";
      }
      choiceMessage(choice, i2) {
        let message = this.resolve(choice.message, this.state, choice, i2);
        if (choice.role === "heading" && !utils.hasColor(message)) {
          message = this.styles.strong(message);
        }
        return this.resolve(message, this.state, choice, i2);
      }
      choiceSeparator() {
        return ":";
      }
      async renderChoice(choice, i2) {
        await this.onChoice(choice, i2);
        let focused = this.index === i2;
        let pointer = await this.pointer(choice, i2);
        let check = await this.indicator(choice, i2) + (choice.pad || "");
        let hint = await this.resolve(choice.hint, this.state, choice, i2);
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let ind = this.indent(choice);
        let msg = await this.choiceMessage(choice, i2);
        let line = () => [this.margin[3], ind + pointer + check, msg, this.margin[1], hint].filter(Boolean).join(" ");
        if (choice.role === "heading") {
          return line();
        }
        if (choice.disabled) {
          if (!utils.hasColor(msg)) {
            msg = this.styles.disabled(msg);
          }
          return line();
        }
        if (focused) {
          msg = this.styles.em(msg);
        }
        return line();
      }
      async renderChoices() {
        if (this.state.loading === "choices") {
          return this.styles.warning("Loading choices");
        }
        if (this.state.submitted) return "";
        let choices = this.visible.map(async (ch, i2) => await this.renderChoice(ch, i2));
        let visible = await Promise.all(choices);
        if (!visible.length) visible.push(this.styles.danger("No matching choices"));
        let result = this.margin[0] + visible.join("\n");
        let header;
        if (this.options.choicesHeader) {
          header = await this.resolve(this.options.choicesHeader, this.state);
        }
        return [header, result].filter(Boolean).join("\n");
      }
      format() {
        if (!this.state.submitted || this.state.cancelled) return "";
        if (Array.isArray(this.selected)) {
          return this.selected.map((choice) => this.styles.primary(choice.name)).join(", ");
        }
        return this.styles.primary(this.selected.name);
      }
      async render() {
        let { submitted, size } = this.state;
        let prompt2 = "";
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        if (this.options.promptLine !== false) {
          prompt2 = [prefix, message, separator, ""].join(" ");
          this.state.prompt = prompt2;
        }
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output) prompt2 += output;
        if (help && !prompt2.includes(help)) prompt2 += " " + help;
        if (submitted && !output && !body.trim() && this.multiple && this.emptyError != null) {
          prompt2 += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([header, prompt2, body, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module.exports = SelectPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/autocomplete.js"(exports, module) {
    var Select = require_select();
    var highlight = (input, color) => {
      const regex = input ? new RegExp(input, "ig") : /$^/;
      return (str) => {
        return input ? str.replace(regex, (match) => color(match)) : str;
      };
    };
    var AutoComplete = class extends Select {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      moveCursor(n) {
        this.state.cursor += n;
      }
      dispatch(ch) {
        return this.append(ch);
      }
      space(ch) {
        return this.options.multiple ? super.space(ch) : this.append(ch);
      }
      append(ch) {
        let { cursor, input } = this.state;
        this.input = input.slice(0, cursor) + ch + input.slice(cursor);
        this.moveCursor(1);
        return this.complete();
      }
      delete() {
        let { cursor, input } = this.state;
        if (!input) return this.alert();
        this.input = input.slice(0, cursor - 1) + input.slice(cursor);
        this.moveCursor(-1);
        return this.complete();
      }
      deleteForward() {
        let { cursor, input } = this.state;
        if (input[cursor] === void 0) return this.alert();
        this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        return this.complete();
      }
      number(ch) {
        return this.append(ch);
      }
      async complete() {
        this.completing = true;
        this.choices = await this.suggest(this.input, this.state._choices);
        this.state.limit = void 0;
        this.index = Math.min(Math.max(this.visible.length - 1, 0), this.index);
        await this.render();
        this.completing = false;
      }
      suggest(input = this.input, choices = this.state._choices) {
        if (typeof this.options.suggest === "function") {
          return this.options.suggest.call(this, input, choices);
        }
        let str = input.toLowerCase();
        return choices.filter((ch) => ch.message.toLowerCase().includes(str));
      }
      pointer() {
        return "";
      }
      format() {
        if (!this.focused) return this.input;
        if (this.options.multiple && this.state.submitted) {
          return this.selected.map((ch) => this.styles.primary(ch.message)).join(", ");
        }
        if (this.state.submitted) {
          let value = this.value = this.input = this.focused.value;
          return this.styles.primary(value);
        }
        return this.input;
      }
      async render() {
        if (this.state.status !== "pending") return super.render();
        const hl = this.options.highlight || this.styles.complement;
        const style2 = (input, color2) => {
          if (!input) return input;
          if (hl.stack) return hl(input);
          return hl.call(this, input);
        };
        const color = highlight(this.input, style2);
        const choices = this.choices;
        this.choices = choices.map((ch) => ({ ...ch, message: color(ch.message) }));
        await super.render();
        this.choices = choices;
      }
      submit() {
        if (this.options.multiple) {
          this.value = this.selected.map((ch) => ch.name);
        }
        return super.submit();
      }
    };
    module.exports = AutoComplete;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/placeholder.js
var require_placeholder = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/placeholder.js"(exports, module) {
    var utils = require_utils2();
    module.exports = (prompt2, options = {}) => {
      prompt2.cursorHide();
      let { input = "", initial = "", pos, showCursor = true, color } = options;
      let style2 = color || prompt2.styles.placeholder;
      let inverse = utils.inverse(prompt2.styles.primary);
      let blinker = (str) => inverse(prompt2.styles.black(str));
      let output = input;
      let char = " ";
      let reverse = blinker(char);
      if (prompt2.blink && prompt2.blink.off === true) {
        blinker = (str) => str;
        reverse = "";
      }
      if (showCursor && pos === 0 && initial === "" && input === "") {
        return blinker(char);
      }
      if (showCursor && pos === 0 && (input === initial || input === "")) {
        return blinker(initial[0]) + style2(initial.slice(1));
      }
      initial = utils.isPrimitive(initial) ? `${initial}` : "";
      input = utils.isPrimitive(input) ? `${input}` : "";
      let placeholder = initial && initial.startsWith(input) && initial !== input;
      let cursor = placeholder ? blinker(initial[input.length]) : reverse;
      if (pos !== input.length && showCursor === true) {
        output = input.slice(0, pos) + blinker(input[pos]) + input.slice(pos + 1);
        cursor = "";
      }
      if (showCursor === false) {
        cursor = "";
      }
      if (placeholder) {
        let raw = prompt2.styles.unstyle(output + cursor);
        return output + cursor + style2(initial.slice(raw.length));
      }
      return output + cursor;
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/form.js
var require_form = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/form.js"(exports, module) {
    var stripAnsi = require_strip_ansi();
    var SelectPrompt = require_select();
    var placeholder = require_placeholder();
    var FormPrompt = class extends SelectPrompt {
      constructor(options) {
        super({ ...options, multiple: true });
        this.type = "form";
        this.initial = this.options.initial;
        this.align = [this.options.align, "right"].find((v2) => v2 != null);
        this.emptyError = "";
        this.values = {};
      }
      async reset(first) {
        await super.reset();
        if (first === true) this._index = this.index;
        this.index = this._index;
        this.values = {};
        this.choices.forEach((choice) => choice.reset && choice.reset());
        return this.render();
      }
      dispatch(char) {
        return !!char && this.append(char);
      }
      append(char) {
        let choice = this.focused;
        if (!choice) return this.alert();
        let { cursor, input } = choice;
        choice.value = choice.input = input.slice(0, cursor) + char + input.slice(cursor);
        choice.cursor++;
        return this.render();
      }
      delete() {
        let choice = this.focused;
        if (!choice || choice.cursor <= 0) return this.alert();
        let { cursor, input } = choice;
        choice.value = choice.input = input.slice(0, cursor - 1) + input.slice(cursor);
        choice.cursor--;
        return this.render();
      }
      deleteForward() {
        let choice = this.focused;
        if (!choice) return this.alert();
        let { cursor, input } = choice;
        if (input[cursor] === void 0) return this.alert();
        let str = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        choice.value = choice.input = str;
        return this.render();
      }
      right() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.cursor >= choice.input.length) return this.alert();
        choice.cursor++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.cursor <= 0) return this.alert();
        choice.cursor--;
        return this.render();
      }
      space(ch, key) {
        return this.dispatch(ch, key);
      }
      number(ch, key) {
        return this.dispatch(ch, key);
      }
      next() {
        let ch = this.focused;
        if (!ch) return this.alert();
        let { initial, input } = ch;
        if (initial && initial.startsWith(input) && input !== initial) {
          ch.value = ch.input = initial;
          ch.cursor = ch.value.length;
          return this.render();
        }
        return super.next();
      }
      prev() {
        let ch = this.focused;
        if (!ch) return this.alert();
        if (ch.cursor === 0) return super.prev();
        ch.value = ch.input = "";
        ch.cursor = 0;
        return this.render();
      }
      separator() {
        return "";
      }
      format(value) {
        return !this.state.submitted ? super.format(value) : "";
      }
      pointer() {
        return "";
      }
      indicator(choice) {
        return choice.input ? "\u29BF" : "\u2299";
      }
      async choiceSeparator(choice, i2) {
        let sep3 = await this.resolve(choice.separator, this.state, choice, i2) || ":";
        return sep3 ? " " + this.styles.disabled(sep3) : "";
      }
      async renderChoice(choice, i2) {
        await this.onChoice(choice, i2);
        let { state, styles } = this;
        let { cursor, initial = "", name: name2, input = "" } = choice;
        let { muted, submitted, primary, danger } = styles;
        let focused = this.index === i2;
        let validate = choice.validate || (() => true);
        let sep3 = await this.choiceSeparator(choice, i2);
        let msg = choice.message;
        if (this.align === "right") msg = msg.padStart(this.longest + 1, " ");
        if (this.align === "left") msg = msg.padEnd(this.longest + 1, " ");
        let value = this.values[name2] = input || initial;
        let color = input ? "success" : "dark";
        if (await validate.call(choice, value, this.state) !== true) {
          color = "danger";
        }
        let style2 = styles[color];
        let indicator = style2(await this.indicator(choice, i2)) + (choice.pad || "");
        let indent = this.indent(choice);
        let line = () => [indent, indicator, msg + sep3, input].filter(Boolean).join(" ");
        if (state.submitted) {
          msg = stripAnsi(msg);
          input = submitted(input);
          return line();
        }
        if (choice.format) {
          input = await choice.format.call(this, input, choice, i2);
        } else {
          let color2 = this.styles.muted;
          let options = { input, initial, pos: cursor, showCursor: focused, color: color2 };
          input = placeholder(this, options);
        }
        if (!this.isValue(input)) {
          input = this.styles.muted(this.symbols.ellipsis);
        }
        if (choice.result) {
          this.values[name2] = await choice.result.call(this, value, choice, i2);
        }
        if (focused) {
          msg = primary(msg);
        }
        if (choice.error) {
          input += (input ? " " : "") + danger(choice.error.trim());
        } else if (choice.hint) {
          input += (input ? " " : "") + muted(choice.hint.trim());
        }
        return line();
      }
      async submit() {
        this.value = this.values;
        return super.base.submit.call(this);
      }
    };
    module.exports = FormPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/auth.js
var require_auth = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/auth.js"(exports, module) {
    var FormPrompt = require_form();
    var defaultAuthenticate = () => {
      throw new Error("expected prompt to have a custom authenticate method");
    };
    var factory = (authenticate = defaultAuthenticate) => {
      class AuthPrompt extends FormPrompt {
        constructor(options) {
          super(options);
        }
        async submit() {
          this.value = await authenticate.call(this, this.values, this.state);
          super.base.submit.call(this);
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return AuthPrompt;
    };
    module.exports = factory();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/basicauth.js
var require_basicauth = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/basicauth.js"(exports, module) {
    var AuthPrompt = require_auth();
    function defaultAuthenticate(value, state) {
      if (value.username === this.options.username && value.password === this.options.password) {
        return true;
      }
      return false;
    }
    var factory = (authenticate = defaultAuthenticate) => {
      const choices = [
        { name: "username", message: "username" },
        {
          name: "password",
          message: "password",
          format(input) {
            if (this.options.showPassword) {
              return input;
            }
            let color = this.state.submitted ? this.styles.primary : this.styles.muted;
            return color(this.symbols.asterisk.repeat(input.length));
          }
        }
      ];
      class BasicAuthPrompt extends AuthPrompt.create(authenticate) {
        constructor(options) {
          super({ ...options, choices });
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return BasicAuthPrompt;
    };
    module.exports = factory();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/boolean.js
var require_boolean = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/boolean.js"(exports, module) {
    var Prompt = require_prompt();
    var { isPrimitive, hasColor } = require_utils2();
    var BooleanPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
      }
      async initialize() {
        let initial = await this.resolve(this.initial, this.state);
        this.input = await this.cast(initial);
        await super.initialize();
      }
      dispatch(ch) {
        if (!this.isValue(ch)) return this.alert();
        this.input = ch;
        return this.submit();
      }
      format(value) {
        let { styles, state } = this;
        return !state.submitted ? styles.primary(value) : styles.success(value);
      }
      cast(input) {
        return this.isTrue(input);
      }
      isTrue(input) {
        return /^[ty1]/i.test(input);
      }
      isFalse(input) {
        return /^[fn0]/i.test(input);
      }
      isValue(value) {
        return isPrimitive(value) && (this.isTrue(value) || this.isFalse(value));
      }
      async hint() {
        if (this.state.status === "pending") {
          let hint = await this.element("hint");
          if (!hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      async render() {
        let { input, size } = this.state;
        let prefix = await this.prefix();
        let sep3 = await this.separator();
        let msg = await this.message();
        let hint = this.styles.muted(this.default);
        let promptLine = [prefix, msg, hint, sep3].filter(Boolean).join(" ");
        this.state.prompt = promptLine;
        let header = await this.header();
        let value = this.value = this.cast(input);
        let output = await this.format(value);
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !promptLine.includes(help)) output += " " + help;
        promptLine += " " + output;
        this.clear(size);
        this.write([header, promptLine, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        return this.cast(super.value);
      }
    };
    module.exports = BooleanPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/confirm.js
var require_confirm = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/confirm.js"(exports, module) {
    var BooleanPrompt = require_boolean();
    var ConfirmPrompt = class extends BooleanPrompt {
      constructor(options) {
        super(options);
        this.default = this.options.default || (this.initial ? "(Y/n)" : "(y/N)");
      }
    };
    module.exports = ConfirmPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/editable.js
var require_editable = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/editable.js"(exports, module) {
    var Select = require_select();
    var Form = require_form();
    var form = Form.prototype;
    var Editable = class extends Select {
      constructor(options) {
        super({ ...options, multiple: true });
        this.align = [this.options.align, "left"].find((v2) => v2 != null);
        this.emptyError = "";
        this.values = {};
      }
      dispatch(char, key) {
        let choice = this.focused;
        let parent = choice.parent || {};
        if (!choice.editable && !parent.editable) {
          if (char === "a" || char === "i") return super[char]();
        }
        return form.dispatch.call(this, char, key);
      }
      append(char, key) {
        return form.append.call(this, char, key);
      }
      delete(char, key) {
        return form.delete.call(this, char, key);
      }
      space(char) {
        return this.focused.editable ? this.append(char) : super.space();
      }
      number(char) {
        return this.focused.editable ? this.append(char) : super.number(char);
      }
      next() {
        return this.focused.editable ? form.next.call(this) : super.next();
      }
      prev() {
        return this.focused.editable ? form.prev.call(this) : super.prev();
      }
      async indicator(choice, i2) {
        let symbol = choice.indicator || "";
        let value = choice.editable ? symbol : super.indicator(choice, i2);
        return await this.resolve(value, this.state, choice, i2) || "";
      }
      indent(choice) {
        return choice.role === "heading" ? "" : choice.editable ? " " : "  ";
      }
      async renderChoice(choice, i2) {
        choice.indent = "";
        if (choice.editable) return form.renderChoice.call(this, choice, i2);
        return super.renderChoice(choice, i2);
      }
      error() {
        return "";
      }
      footer() {
        return this.state.error;
      }
      async validate() {
        let result = true;
        for (let choice of this.choices) {
          if (typeof choice.validate !== "function") {
            continue;
          }
          if (choice.role === "heading") {
            continue;
          }
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.editable) {
            val = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val = choice.enabled === true;
          }
          result = await choice.validate(val, this.state);
          if (result !== true) {
            break;
          }
        }
        if (result !== true) {
          this.state.error = typeof result === "string" ? result : "Invalid Input";
        }
        return result;
      }
      submit() {
        if (this.focused.newChoice === true) return super.submit();
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        this.value = {};
        for (let choice of this.choices) {
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.role === "heading") {
            this.value[choice.name] = {};
            continue;
          }
          if (choice.editable) {
            val[choice.name] = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val[choice.name] = choice.enabled === true;
          }
        }
        return this.base.submit.call(this);
      }
    };
    module.exports = Editable;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/string.js
var require_string = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/string.js"(exports, module) {
    var Prompt = require_prompt();
    var keypress = require_keypress();
    var placeholder = require_placeholder();
    var { isPrimitive } = require_utils2();
    var StringPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.initial = isPrimitive(this.initial) ? String(this.initial) : "";
        if (this.initial) this.cursorHide();
        this.state.prevCursor = 0;
        this.state.clipboard = [];
        this.keypressTimeout = this.options.keypressTimeout !== void 0 ? this.options.keypressTimeout : null;
      }
      async keypress(input, key = input ? keypress(input, {}) : {}) {
        const now = Date.now();
        const elapsed = now - this.lastKeypress;
        this.lastKeypress = now;
        const isEnterKey = key.name === "return" || key.name === "enter";
        let prev = this.state.prevKeypress;
        let append;
        this.state.prevKeypress = key;
        if (this.keypressTimeout != null && isEnterKey) {
          if (elapsed < this.keypressTimeout) {
            return this.submit();
          }
          this.state.multilineBuffer = this.state.multilineBuffer || "";
          this.state.multilineBuffer += input;
          append = true;
          prev = null;
        }
        if (append || this.options.multiline && isEnterKey) {
          if (!prev || prev.name !== "return") {
            return this.append("\n", key);
          }
        }
        return super.keypress(input, key);
      }
      moveCursor(n) {
        this.cursor += n;
      }
      reset() {
        this.input = this.value = "";
        this.cursor = 0;
        return this.render();
      }
      dispatch(ch, key) {
        if (!ch || key.ctrl || key.code) return this.alert();
        this.append(ch);
      }
      append(ch) {
        let { cursor, input } = this.state;
        this.input = `${input}`.slice(0, cursor) + ch + `${input}`.slice(cursor);
        this.moveCursor(String(ch).length);
        this.render();
      }
      insert(str) {
        this.append(str);
      }
      delete() {
        let { cursor, input } = this.state;
        if (cursor <= 0) return this.alert();
        this.input = `${input}`.slice(0, cursor - 1) + `${input}`.slice(cursor);
        this.moveCursor(-1);
        this.render();
      }
      deleteForward() {
        let { cursor, input } = this.state;
        if (input[cursor] === void 0) return this.alert();
        this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        this.render();
      }
      cutForward() {
        let pos = this.cursor;
        if (this.input.length <= pos) return this.alert();
        this.state.clipboard.push(this.input.slice(pos));
        this.input = this.input.slice(0, pos);
        this.render();
      }
      cutLeft() {
        let pos = this.cursor;
        if (pos === 0) return this.alert();
        let before = this.input.slice(0, pos);
        let after = this.input.slice(pos);
        let words = before.split(" ");
        this.state.clipboard.push(words.pop());
        this.input = words.join(" ");
        this.cursor = this.input.length;
        this.input += after;
        this.render();
      }
      paste() {
        if (!this.state.clipboard.length) return this.alert();
        this.insert(this.state.clipboard.pop());
        this.render();
      }
      toggleCursor() {
        if (this.state.prevCursor) {
          this.cursor = this.state.prevCursor;
          this.state.prevCursor = 0;
        } else {
          this.state.prevCursor = this.cursor;
          this.cursor = 0;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.input.length - 1;
        this.render();
      }
      next() {
        let init2 = this.initial != null ? String(this.initial) : "";
        if (!init2 || !init2.startsWith(this.input)) return this.alert();
        this.input = this.initial;
        this.cursor = this.initial.length;
        this.render();
      }
      prev() {
        if (!this.input) return this.alert();
        this.reset();
      }
      backward() {
        return this.left();
      }
      forward() {
        return this.right();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.moveCursor(1);
        return this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.moveCursor(-1);
        return this.render();
      }
      isValue(value) {
        return !!value;
      }
      async format(input = this.value) {
        let initial = await this.resolve(this.initial, this.state);
        if (!this.state.submitted) {
          return placeholder(this, { input, initial, pos: this.cursor });
        }
        return this.styles.submitted(input || initial);
      }
      async render() {
        let size = this.state.size;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt2 = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt2;
        let header = await this.header();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !output.includes(help)) output += " " + help;
        prompt2 += " " + output;
        this.clear(size);
        this.write([header, prompt2, footer].filter(Boolean).join("\n"));
        this.restore();
      }
    };
    module.exports = StringPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/completer.js
var require_completer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/completer.js"(exports, module) {
    var unique = (arr) => arr.filter((v2, i2) => arr.lastIndexOf(v2) === i2);
    var compact = (arr) => unique(arr).filter(Boolean);
    module.exports = (action, data = {}, value = "") => {
      let { past = [], present = "" } = data;
      let rest, prev;
      switch (action) {
        case "prev":
        case "undo":
          rest = past.slice(0, past.length - 1);
          prev = past[past.length - 1] || "";
          return {
            past: compact([value, ...rest]),
            present: prev
          };
        case "next":
        case "redo":
          rest = past.slice(1);
          prev = past[0] || "";
          return {
            past: compact([...rest, value]),
            present: prev
          };
        case "save":
          return {
            past: compact([...past, value]),
            present: ""
          };
        case "remove":
          prev = compact(past.filter((v2) => v2 !== value));
          present = "";
          if (prev.length) {
            present = prev.pop();
          }
          return {
            past: prev,
            present
          };
        default: {
          throw new Error(`Invalid action: "${action}"`);
        }
      }
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/input.js
var require_input = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/input.js"(exports, module) {
    var Prompt = require_string();
    var completer = require_completer();
    var Input = class extends Prompt {
      constructor(options) {
        super(options);
        let history = this.options.history;
        if (history && history.store) {
          let initial = history.values || this.initial;
          this.autosave = !!history.autosave;
          this.store = history.store;
          this.data = this.store.get("values") || { past: [], present: initial };
          this.initial = this.data.present || this.data.past[this.data.past.length - 1];
        }
      }
      completion(action) {
        if (!this.store) return this.alert();
        this.data = completer(action, this.data, this.input);
        if (!this.data.present) return this.alert();
        this.input = this.data.present;
        this.cursor = this.input.length;
        return this.render();
      }
      altUp() {
        return this.completion("prev");
      }
      altDown() {
        return this.completion("next");
      }
      prev() {
        this.save();
        return super.prev();
      }
      save() {
        if (!this.store) return;
        this.data = completer("save", this.data, this.input);
        this.store.set("values", this.data);
      }
      submit() {
        if (this.store && this.autosave === true) {
          this.save();
        }
        return super.submit();
      }
    };
    module.exports = Input;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/invisible.js
var require_invisible = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/invisible.js"(exports, module) {
    var StringPrompt = require_string();
    var InvisiblePrompt = class extends StringPrompt {
      format() {
        return "";
      }
    };
    module.exports = InvisiblePrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/list.js
var require_list = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/list.js"(exports, module) {
    var StringPrompt = require_string();
    var ListPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super(options);
        this.sep = this.options.separator || /, */;
        this.initial = options.initial || "";
      }
      split(input = this.value) {
        return input ? String(input).split(this.sep) : [];
      }
      format() {
        let style2 = this.state.submitted ? this.styles.primary : (val) => val;
        return this.list.map(style2).join(", ");
      }
      async submit(value) {
        let result = this.state.error || await this.validate(this.list, this.state);
        if (result !== true) {
          this.state.error = result;
          return super.submit();
        }
        this.value = this.list;
        return super.submit();
      }
      get list() {
        return this.split();
      }
    };
    module.exports = ListPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/multiselect.js"(exports, module) {
    var Select = require_select();
    var MultiSelect = class extends Select {
      constructor(options) {
        super({ ...options, multiple: true });
      }
    };
    module.exports = MultiSelect;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/number.js
var require_number = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/number.js"(exports, module) {
    var StringPrompt = require_string();
    var NumberPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super({ style: "number", ...options });
        this.min = this.isValue(options.min) ? this.toNumber(options.min) : -Infinity;
        this.max = this.isValue(options.max) ? this.toNumber(options.max) : Infinity;
        this.delay = options.delay != null ? options.delay : 1e3;
        this.float = options.float !== false;
        this.round = options.round === true || options.float === false;
        this.major = options.major || 10;
        this.minor = options.minor || 1;
        this.initial = options.initial != null ? options.initial : "";
        this.input = String(this.initial);
        this.cursor = this.input.length;
        this.cursorShow();
      }
      append(ch) {
        if (!/[-+.]/.test(ch) || ch === "." && this.input.includes(".")) {
          return this.alert("invalid number");
        }
        return super.append(ch);
      }
      number(ch) {
        return super.append(ch);
      }
      next() {
        if (this.input && this.input !== this.initial) return this.alert();
        if (!this.isValue(this.initial)) return this.alert();
        this.input = this.initial;
        this.cursor = String(this.initial).length;
        return this.render();
      }
      up(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num > this.max + step) return this.alert();
        this.input = `${num + step}`;
        return this.render();
      }
      down(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num < this.min - step) return this.alert();
        this.input = `${num - step}`;
        return this.render();
      }
      shiftDown() {
        return this.down(this.major);
      }
      shiftUp() {
        return this.up(this.major);
      }
      format(input = this.input) {
        if (typeof this.options.format === "function") {
          return this.options.format.call(this, input);
        }
        return this.styles.info(input);
      }
      toNumber(value = "") {
        return this.float ? +value : Math.round(+value);
      }
      isValue(value) {
        return /^[-+]?[0-9]+((\.)|(\.[0-9]+))?$/.test(value);
      }
      submit() {
        let value = [this.input, this.initial].find((v2) => this.isValue(v2));
        this.value = this.toNumber(value || 0);
        return super.submit();
      }
    };
    module.exports = NumberPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/numeral.js
var require_numeral = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/numeral.js"(exports, module) {
    module.exports = require_number();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/password.js
var require_password = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/password.js"(exports, module) {
    var StringPrompt = require_string();
    var PasswordPrompt = class extends StringPrompt {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      format(input = this.input) {
        if (!this.keypressed) return "";
        let color = this.state.submitted ? this.styles.primary : this.styles.muted;
        return color(this.symbols.asterisk.repeat(input.length));
      }
    };
    module.exports = PasswordPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/scale.js
var require_scale = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/scale.js"(exports, module) {
    var stripAnsi = require_strip_ansi();
    var ArrayPrompt = require_array();
    var utils = require_utils2();
    var LikertScale = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.widths = [].concat(options.messageWidth || 50);
        this.align = [].concat(options.align || "left");
        this.linebreak = options.linebreak || false;
        this.edgeLength = options.edgeLength || 3;
        this.newline = options.newline || "\n   ";
        let start = options.startNumber || 1;
        if (typeof this.scale === "number") {
          this.scaleKey = false;
          this.scale = Array(this.scale).fill(0).map((v2, i2) => ({ name: i2 + start }));
        }
      }
      async reset() {
        this.tableized = false;
        await super.reset();
        return this.render();
      }
      tableize() {
        if (this.tableized === true) return;
        this.tableized = true;
        let longest = 0;
        for (let ch of this.choices) {
          longest = Math.max(longest, ch.message.length);
          ch.scaleIndex = ch.initial || 2;
          ch.scale = [];
          for (let i2 = 0; i2 < this.scale.length; i2++) {
            ch.scale.push({ index: i2 });
          }
        }
        this.widths[0] = Math.min(this.widths[0], longest + 3);
      }
      async dispatch(s3, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s3, key) : await super.dispatch(s3, key);
        }
        this.alert();
      }
      heading(msg, item, i2) {
        return this.styles.strong(msg);
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIndex >= this.scale.length - 1) return this.alert();
        choice.scaleIndex++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIndex <= 0) return this.alert();
        choice.scaleIndex--;
        return this.render();
      }
      indent() {
        return "";
      }
      format() {
        if (this.state.submitted) {
          let values2 = this.choices.map((ch) => this.styles.info(ch.index));
          return values2.join(", ");
        }
        return "";
      }
      pointer() {
        return "";
      }
      /**
       * Render the scale "Key". Something like:
       * @return {String}
       */
      renderScaleKey() {
        if (this.scaleKey === false) return "";
        if (this.state.submitted) return "";
        let scale = this.scale.map((item) => `   ${item.name} - ${item.message}`);
        let key = ["", ...scale].map((item) => this.styles.muted(item));
        return key.join("\n");
      }
      /**
       * Render the heading row for the scale.
       * @return {String}
       */
      renderScaleHeading(max) {
        let keys2 = this.scale.map((ele) => ele.name);
        if (typeof this.options.renderScaleHeading === "function") {
          keys2 = this.options.renderScaleHeading.call(this, max);
        }
        let diff = this.scaleLength - keys2.join("").length;
        let spacing = Math.round(diff / (keys2.length - 1));
        let names = keys2.map((key) => this.styles.strong(key));
        let headings = names.join(" ".repeat(spacing));
        let padding = " ".repeat(this.widths[0]);
        return this.margin[3] + padding + this.margin[1] + headings;
      }
      /**
       * Render a scale indicator => ◯ or ◉ by default
       */
      scaleIndicator(choice, item, i2) {
        if (typeof this.options.scaleIndicator === "function") {
          return this.options.scaleIndicator.call(this, choice, item, i2);
        }
        let enabled = choice.scaleIndex === item.index;
        if (item.disabled) return this.styles.hint(this.symbols.radio.disabled);
        if (enabled) return this.styles.success(this.symbols.radio.on);
        return this.symbols.radio.off;
      }
      /**
       * Render the actual scale => ◯────◯────◉────◯────◯
       */
      renderScale(choice, i2) {
        let scale = choice.scale.map((item) => this.scaleIndicator(choice, item, i2));
        let padding = this.term === "Hyper" ? "" : " ";
        return scale.join(padding + this.symbols.line.repeat(this.edgeLength));
      }
      /**
       * Render a choice, including scale =>
       *   "The website is easy to navigate. ◯───◯───◉───◯───◯"
       */
      async renderChoice(choice, i2) {
        await this.onChoice(choice, i2);
        let focused = this.index === i2;
        let pointer = await this.pointer(choice, i2);
        let hint = await choice.hint;
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let pad = (str) => this.margin[3] + str.replace(/\s+$/, "").padEnd(this.widths[0], " ");
        let newline = this.newline;
        let ind = this.indent(choice);
        let message = await this.resolve(choice.message, this.state, choice, i2);
        let scale = await this.renderScale(choice, i2);
        let margin = this.margin[1] + this.margin[3];
        this.scaleLength = stripAnsi(scale).length;
        this.widths[0] = Math.min(this.widths[0], this.width - this.scaleLength - margin.length);
        let msg = utils.wordWrap(message, { width: this.widths[0], newline });
        let lines = msg.split("\n").map((line) => pad(line) + this.margin[1]);
        if (focused) {
          scale = this.styles.info(scale);
          lines = lines.map((line) => this.styles.info(line));
        }
        lines[0] += scale;
        if (this.linebreak) lines.push("");
        return [ind + pointer, lines.join("\n")].filter(Boolean);
      }
      async renderChoices() {
        if (this.state.submitted) return "";
        this.tableize();
        let choices = this.visible.map(async (ch, i2) => await this.renderChoice(ch, i2));
        let visible = await Promise.all(choices);
        let heading = await this.renderScaleHeading();
        return this.margin[0] + [heading, ...visible.map((v2) => v2.join(" "))].join("\n");
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt2 = "";
        if (this.options.promptLine !== false) {
          prompt2 = [prefix, message, separator, ""].join(" ");
          this.state.prompt = prompt2;
        }
        let header = await this.header();
        let output = await this.format();
        let key = await this.renderScaleKey();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        let err = this.emptyError;
        if (output) prompt2 += output;
        if (help && !prompt2.includes(help)) prompt2 += " " + help;
        if (submitted && !output && !body.trim() && this.multiple && err != null) {
          prompt2 += this.styles.danger(err);
        }
        this.clear(size);
        this.write([header, prompt2, key, body, footer].filter(Boolean).join("\n"));
        if (!this.state.submitted) {
          this.write(this.margin[2]);
        }
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIndex;
        }
        return this.base.submit.call(this);
      }
    };
    module.exports = LikertScale;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/interpolate.js
var require_interpolate = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/interpolate.js"(exports, module) {
    var stripAnsi = require_strip_ansi();
    var clean = (str = "") => {
      return typeof str === "string" ? str.replace(/^['"]|['"]$/g, "") : "";
    };
    var Item = class {
      constructor(token) {
        this.name = token.key;
        this.field = token.field || {};
        this.value = clean(token.initial || this.field.initial || "");
        this.message = token.message || this.name;
        this.cursor = 0;
        this.input = "";
        this.lines = [];
      }
    };
    var tokenize = async (options = {}, defaults2 = {}, fn2 = (token) => token) => {
      let unique = /* @__PURE__ */ new Set();
      let fields = options.fields || [];
      let input = options.template;
      let tabstops = [];
      let items = [];
      let keys2 = [];
      let line = 1;
      if (typeof input === "function") {
        input = await input();
      }
      let i2 = -1;
      let next = () => input[++i2];
      let peek = () => input[i2 + 1];
      let push = (token) => {
        token.line = line;
        tabstops.push(token);
      };
      push({ type: "bos", value: "" });
      while (i2 < input.length - 1) {
        let value = next();
        if (/^[^\S\n ]$/.test(value)) {
          push({ type: "text", value });
          continue;
        }
        if (value === "\n") {
          push({ type: "newline", value });
          line++;
          continue;
        }
        if (value === "\\") {
          value += next();
          push({ type: "text", value });
          continue;
        }
        if ((value === "$" || value === "#" || value === "{") && peek() === "{") {
          let n = next();
          value += n;
          let token = { type: "template", open: value, inner: "", close: "", value };
          let ch;
          while (ch = next()) {
            if (ch === "}") {
              if (peek() === "}") ch += next();
              token.value += ch;
              token.close = ch;
              break;
            }
            if (ch === ":") {
              token.initial = "";
              token.key = token.inner;
            } else if (token.initial !== void 0) {
              token.initial += ch;
            }
            token.value += ch;
            token.inner += ch;
          }
          token.template = token.open + (token.initial || token.inner) + token.close;
          token.key = token.key || token.inner;
          if (hasOwnProperty.call(defaults2, token.key)) {
            token.initial = defaults2[token.key];
          }
          token = fn2(token);
          push(token);
          keys2.push(token.key);
          unique.add(token.key);
          let item = items.find((item2) => item2.name === token.key);
          token.field = fields.find((ch2) => ch2.name === token.key);
          if (!item) {
            item = new Item(token);
            items.push(item);
          }
          item.lines.push(token.line - 1);
          continue;
        }
        let last = tabstops[tabstops.length - 1];
        if (last.type === "text" && last.line === line) {
          last.value += value;
        } else {
          push({ type: "text", value });
        }
      }
      push({ type: "eos", value: "" });
      return { input, tabstops, unique, keys: keys2, items };
    };
    module.exports = async (prompt2) => {
      let options = prompt2.options;
      let required = new Set(options.required === true ? [] : options.required || []);
      let defaults2 = { ...options.values, ...options.initial };
      let { tabstops, items, keys: keys2 } = await tokenize(options, defaults2);
      let result = createFn("result", prompt2);
      let format2 = createFn("format", prompt2);
      let isValid = createFn("validate", prompt2, options, true);
      let isVal = prompt2.isValue.bind(prompt2);
      return async (state = {}, submitted = false) => {
        let index = 0;
        state.required = required;
        state.items = items;
        state.keys = keys2;
        state.output = "";
        let validate = async (value, state2, item, index2) => {
          let error2 = await isValid(value, state2, item, index2);
          if (error2 === false) {
            return "Invalid field " + item.name;
          }
          return error2;
        };
        for (let token of tabstops) {
          let value = token.value;
          let key = token.key;
          if (token.type !== "template") {
            if (value) state.output += value;
            continue;
          }
          if (token.type === "template") {
            let item = items.find((ch) => ch.name === key);
            if (options.required === true) {
              state.required.add(item.name);
            }
            let val = [item.input, state.values[item.value], item.value, value].find(isVal);
            let field = item.field || {};
            let message = field.message || token.inner;
            if (submitted) {
              let error2 = await validate(state.values[key], state, item, index);
              if (error2 && typeof error2 === "string" || error2 === false) {
                state.invalid.set(key, error2);
                continue;
              }
              state.invalid.delete(key);
              let res = await result(state.values[key], state, item, index);
              state.output += stripAnsi(res);
              continue;
            }
            item.placeholder = false;
            let before = value;
            value = await format2(value, state, item, index);
            if (val !== value) {
              state.values[key] = val;
              value = prompt2.styles.typing(val);
              state.missing.delete(message);
            } else {
              state.values[key] = void 0;
              val = `<${message}>`;
              value = prompt2.styles.primary(val);
              item.placeholder = true;
              if (state.required.has(key)) {
                state.missing.add(message);
              }
            }
            if (state.missing.has(message) && state.validating) {
              value = prompt2.styles.warning(val);
            }
            if (state.invalid.has(key) && state.validating) {
              value = prompt2.styles.danger(val);
            }
            if (index === state.index) {
              if (before !== value) {
                value = prompt2.styles.underline(value);
              } else {
                value = prompt2.styles.heading(stripAnsi(value));
              }
            }
            index++;
          }
          if (value) {
            state.output += value;
          }
        }
        let lines = state.output.split("\n").map((l2) => " " + l2);
        let len = items.length;
        let done = 0;
        for (let item of items) {
          if (state.invalid.has(item.name)) {
            item.lines.forEach((i2) => {
              if (lines[i2][0] !== " ") return;
              lines[i2] = state.styles.danger(state.symbols.bullet) + lines[i2].slice(1);
            });
          }
          if (prompt2.isValue(state.values[item.name])) {
            done++;
          }
        }
        state.completed = (done / len * 100).toFixed(0);
        state.output = lines.join("\n");
        return state.output;
      };
    };
    function createFn(prop, prompt2, options, fallback) {
      return (value, state, item, index) => {
        if (typeof item.field[prop] === "function") {
          return item.field[prop].call(prompt2, value, state, item, index);
        }
        return [fallback, value].find((v2) => prompt2.isValue(v2));
      };
    }
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/snippet.js
var require_snippet = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/snippet.js"(exports, module) {
    var stripAnsi = require_strip_ansi();
    var interpolate = require_interpolate();
    var Prompt = require_prompt();
    var SnippetPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.reset(true);
      }
      async initialize() {
        this.interpolate = await interpolate(this);
        await super.initialize();
      }
      async reset(first) {
        this.state.keys = [];
        this.state.invalid = /* @__PURE__ */ new Map();
        this.state.missing = /* @__PURE__ */ new Set();
        this.state.completed = 0;
        this.state.values = {};
        if (first !== true) {
          await this.initialize();
          await this.render();
        }
      }
      moveCursor(n) {
        let item = this.getItem();
        this.cursor += n;
        item.cursor += n;
      }
      dispatch(ch, key) {
        if (!key.code && !key.ctrl && ch != null && this.getItem()) {
          this.append(ch, key);
          return;
        }
        this.alert();
      }
      append(ch, key) {
        let item = this.getItem();
        let prefix = item.input.slice(0, this.cursor);
        let suffix = item.input.slice(this.cursor);
        this.input = item.input = `${prefix}${ch}${suffix}`;
        this.moveCursor(1);
        this.render();
      }
      delete() {
        let item = this.getItem();
        if (this.cursor <= 0 || !item.input) return this.alert();
        let suffix = item.input.slice(this.cursor);
        let prefix = item.input.slice(0, this.cursor - 1);
        this.input = item.input = `${prefix}${suffix}`;
        this.moveCursor(-1);
        this.render();
      }
      increment(i2) {
        return i2 >= this.state.keys.length - 1 ? 0 : i2 + 1;
      }
      decrement(i2) {
        return i2 <= 0 ? this.state.keys.length - 1 : i2 - 1;
      }
      first() {
        this.state.index = 0;
        this.render();
      }
      last() {
        this.state.index = this.state.keys.length - 1;
        this.render();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.moveCursor(1);
        this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.moveCursor(-1);
        this.render();
      }
      prev() {
        this.state.index = this.decrement(this.state.index);
        this.getItem();
        this.render();
      }
      next() {
        this.state.index = this.increment(this.state.index);
        this.getItem();
        this.render();
      }
      up() {
        this.prev();
      }
      down() {
        this.next();
      }
      format(value) {
        let color = this.state.completed < 100 ? this.styles.warning : this.styles.success;
        if (this.state.submitted === true && this.state.completed !== 100) {
          color = this.styles.danger;
        }
        return color(`${this.state.completed}% completed`);
      }
      async render() {
        let { index, keys: keys2 = [], submitted, size } = this.state;
        let newline = [this.options.newline, "\n"].find((v2) => v2 != null);
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt2 = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt2;
        let header = await this.header();
        let error2 = await this.error() || "";
        let hint = await this.hint() || "";
        let body = submitted ? "" : await this.interpolate(this.state);
        let key = this.state.key = keys2[index] || "";
        let input = await this.format(key);
        let footer = await this.footer();
        if (input) prompt2 += " " + input;
        if (hint && !input && this.state.completed === 0) prompt2 += " " + hint;
        this.clear(size);
        let lines = [header, prompt2, body, footer, error2.trim()];
        this.write(lines.filter(Boolean).join(newline));
        this.restore();
      }
      getItem(name2) {
        let { items, keys: keys2, index } = this.state;
        let item = items.find((ch) => ch.name === keys2[index]);
        if (item && item.input != null) {
          this.input = item.input;
          this.cursor = item.cursor;
        }
        return item;
      }
      async submit() {
        if (typeof this.interpolate !== "function") await this.initialize();
        await this.interpolate(this.state, true);
        let { invalid, missing, output, values: values2 } = this.state;
        if (invalid.size) {
          let err = "";
          for (let [key, value] of invalid) err += `Invalid ${key}: ${value}
`;
          this.state.error = err;
          return super.submit();
        }
        if (missing.size) {
          this.state.error = "Required: " + [...missing.keys()].join(", ");
          return super.submit();
        }
        let lines = stripAnsi(output).split("\n");
        let result = lines.map((v2) => v2.slice(1)).join("\n");
        this.value = { values: values2, result };
        return super.submit();
      }
    };
    module.exports = SnippetPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/sort.js
var require_sort = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/sort.js"(exports, module) {
    var hint = "(Use <shift>+<up/down> to sort)";
    var Prompt = require_select();
    var Sort = class extends Prompt {
      constructor(options) {
        super({ ...options, reorder: false, sort: true, multiple: true });
        this.state.hint = [this.options.hint, hint].find(this.isValue.bind(this));
      }
      indicator() {
        return "";
      }
      async renderChoice(choice, i2) {
        let str = await super.renderChoice(choice, i2);
        let sym = this.symbols.identicalTo + " ";
        let pre = this.index === i2 && this.sorting ? this.styles.muted(sym) : "  ";
        if (this.options.drag === false) pre = "";
        if (this.options.numbered === true) {
          return pre + `${i2 + 1} - ` + str;
        }
        return pre + str;
      }
      get selected() {
        return this.choices;
      }
      submit() {
        this.value = this.choices.map((choice) => choice.value);
        return super.submit();
      }
    };
    module.exports = Sort;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/survey.js
var require_survey = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/survey.js"(exports, module) {
    var ArrayPrompt = require_array();
    var Survey = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.emptyError = options.emptyError || "No items were selected";
        this.term = process.env.TERM_PROGRAM;
        if (!this.options.header) {
          let header = ["", "4 - Strongly Agree", "3 - Agree", "2 - Neutral", "1 - Disagree", "0 - Strongly Disagree", ""];
          header = header.map((ele) => this.styles.muted(ele));
          this.state.header = header.join("\n   ");
        }
      }
      async toChoices(...args) {
        if (this.createdScales) return false;
        this.createdScales = true;
        let choices = await super.toChoices(...args);
        for (let choice of choices) {
          choice.scale = createScale(5, this.options);
          choice.scaleIdx = 2;
        }
        return choices;
      }
      dispatch() {
        this.alert();
      }
      space() {
        let choice = this.focused;
        let ele = choice.scale[choice.scaleIdx];
        let selected = ele.selected;
        choice.scale.forEach((e3) => e3.selected = false);
        ele.selected = !selected;
        return this.render();
      }
      indicator() {
        return "";
      }
      pointer() {
        return "";
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIdx >= choice.scale.length - 1) return this.alert();
        choice.scaleIdx++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIdx <= 0) return this.alert();
        choice.scaleIdx--;
        return this.render();
      }
      indent() {
        return "   ";
      }
      async renderChoice(item, i2) {
        await this.onChoice(item, i2);
        let focused = this.index === i2;
        let isHyper = this.term === "Hyper";
        let n = !isHyper ? 8 : 9;
        let s3 = !isHyper ? " " : "";
        let ln2 = this.symbols.line.repeat(n);
        let sp = " ".repeat(n + (isHyper ? 0 : 1));
        let dot = (enabled) => (enabled ? this.styles.success("\u25C9") : "\u25EF") + s3;
        let num = i2 + 1 + ".";
        let color = focused ? this.styles.heading : this.styles.noop;
        let msg = await this.resolve(item.message, this.state, item, i2);
        let indent = this.indent(item);
        let scale = indent + item.scale.map((e3, i3) => dot(i3 === item.scaleIdx)).join(ln2);
        let val = (i3) => i3 === item.scaleIdx ? color(i3) : i3;
        let next = indent + item.scale.map((e3, i3) => val(i3)).join(sp);
        let line = () => [num, msg].filter(Boolean).join(" ");
        let lines = () => [line(), scale, next, " "].filter(Boolean).join("\n");
        if (focused) {
          scale = this.styles.cyan(scale);
          next = this.styles.cyan(next);
        }
        return lines();
      }
      async renderChoices() {
        if (this.state.submitted) return "";
        let choices = this.visible.map(async (ch, i2) => await this.renderChoice(ch, i2));
        let visible = await Promise.all(choices);
        if (!visible.length) visible.push(this.styles.danger("No matching choices"));
        return visible.join("\n");
      }
      format() {
        if (this.state.submitted) {
          let values2 = this.choices.map((ch) => this.styles.info(ch.scaleIdx));
          return values2.join(", ");
        }
        return "";
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt2 = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt2;
        let header = await this.header();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output || !help) prompt2 += " " + output;
        if (help && !prompt2.includes(help)) prompt2 += " " + help;
        if (submitted && !output && !body && this.multiple && this.type !== "form") {
          prompt2 += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([prompt2, header, body, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIdx;
        }
        return this.base.submit.call(this);
      }
    };
    function createScale(n, options = {}) {
      if (Array.isArray(options.scale)) {
        return options.scale.map((ele) => ({ ...ele }));
      }
      let scale = [];
      for (let i2 = 1; i2 < n + 1; i2++) scale.push({ i: i2, selected: false });
      return scale;
    }
    module.exports = Survey;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/text.js
var require_text = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/text.js"(exports, module) {
    module.exports = require_input();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/toggle.js
var require_toggle = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/toggle.js"(exports, module) {
    var BooleanPrompt = require_boolean();
    var TogglePrompt = class extends BooleanPrompt {
      async initialize() {
        await super.initialize();
        this.value = this.initial = this.resolve(this.options.initial);
        this.disabled = this.options.disabled || "no";
        this.enabled = this.options.enabled || "yes";
        await this.render();
      }
      reset() {
        this.value = this.initial;
        this.render();
      }
      delete() {
        this.alert();
      }
      toggle() {
        this.value = !this.value;
        this.render();
      }
      enable() {
        if (this.value === true) return this.alert();
        this.value = true;
        this.render();
      }
      disable() {
        if (this.value === false) return this.alert();
        this.value = false;
        this.render();
      }
      up() {
        this.toggle();
      }
      down() {
        this.toggle();
      }
      right() {
        this.toggle();
      }
      left() {
        this.toggle();
      }
      next() {
        this.toggle();
      }
      prev() {
        this.toggle();
      }
      dispatch(ch = "", key) {
        switch (ch.toLowerCase()) {
          case " ":
            return this.toggle();
          case "1":
          case "y":
          case "t":
            return this.enable();
          case "0":
          case "n":
          case "f":
            return this.disable();
          default: {
            return this.alert();
          }
        }
      }
      format() {
        let active = (str) => this.styles.primary.underline(str);
        let value = [
          this.value ? this.disabled : active(this.disabled),
          this.value ? active(this.enabled) : this.enabled
        ];
        return value.join(this.styles.muted(" / "));
      }
      async render() {
        let { size } = this.state;
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        let prompt2 = [prefix, message, separator, output].join(" ");
        this.state.prompt = prompt2;
        if (help && !prompt2.includes(help)) prompt2 += " " + help;
        this.clear(size);
        this.write([header, prompt2, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module.exports = TogglePrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/quiz.js
var require_quiz = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/quiz.js"(exports, module) {
    var SelectPrompt = require_select();
    var Quiz = class extends SelectPrompt {
      constructor(options) {
        super(options);
        if (typeof this.options.correctChoice !== "number" || this.options.correctChoice < 0) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
      }
      async toChoices(value, parent) {
        let choices = await super.toChoices(value, parent);
        if (choices.length < 2) {
          throw new Error("Please give at least two choices to the user");
        }
        if (this.options.correctChoice > choices.length) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
        return choices;
      }
      check(state) {
        return state.index === this.options.correctChoice;
      }
      async result(selected) {
        return {
          selectedAnswer: selected,
          correctAnswer: this.options.choices[this.options.correctChoice].value,
          correct: await this.check(this.state)
        };
      }
    };
    module.exports = Quiz;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/index.js
var require_prompts = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/index.js"(exports) {
    var utils = require_utils2();
    var define = (key, fn2) => {
      utils.defineExport(exports, key, fn2);
      utils.defineExport(exports, key.toLowerCase(), fn2);
    };
    define("AutoComplete", () => require_autocomplete());
    define("BasicAuth", () => require_basicauth());
    define("Confirm", () => require_confirm());
    define("Editable", () => require_editable());
    define("Form", () => require_form());
    define("Input", () => require_input());
    define("Invisible", () => require_invisible());
    define("List", () => require_list());
    define("MultiSelect", () => require_multiselect());
    define("Numeral", () => require_numeral());
    define("Password", () => require_password());
    define("Scale", () => require_scale());
    define("Select", () => require_select());
    define("Snippet", () => require_snippet());
    define("Sort", () => require_sort());
    define("Survey", () => require_survey());
    define("Text", () => require_text());
    define("Toggle", () => require_toggle());
    define("Quiz", () => require_quiz());
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/index.js
var require_types = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/index.js"(exports, module) {
    module.exports = {
      ArrayPrompt: require_array(),
      AuthPrompt: require_auth(),
      BooleanPrompt: require_boolean(),
      NumberPrompt: require_number(),
      StringPrompt: require_string()
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/index.js
var require_enquirer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/index.js"(exports, module) {
    var assert = __require("assert");
    var Events = __require("events");
    var utils = require_utils2();
    var Enquirer = class extends Events {
      constructor(options, answers) {
        super();
        this.options = utils.merge({}, options);
        this.answers = { ...answers };
      }
      /**
       * Register a custom prompt type.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       * enquirer.register('customType', require('./custom-prompt'));
       * ```
       * @name register()
       * @param {String} `type`
       * @param {Function|Prompt} `fn` `Prompt` class, or a function that returns a `Prompt` class.
       * @return {Object} Returns the Enquirer instance
       * @api public
       */
      register(type2, fn2) {
        if (utils.isObject(type2)) {
          for (let key of Object.keys(type2)) this.register(key, type2[key]);
          return this;
        }
        assert.equal(typeof fn2, "function", "expected a function");
        const name2 = type2.toLowerCase();
        if (fn2.prototype instanceof this.Prompt) {
          this.prompts[name2] = fn2;
        } else {
          this.prompts[name2] = fn2(this.Prompt, this);
        }
        return this;
      }
      /**
       * Prompt function that takes a "question" object or array of question objects,
       * and returns an object with responses from the user.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       *
       * const response = await enquirer.prompt({
       *   type: 'input',
       *   name: 'username',
       *   message: 'What is your username?'
       * });
       * console.log(response);
       * ```
       * @name prompt()
       * @param {Array|Object} `questions` Options objects for one or more prompts to run.
       * @return {Promise} Promise that returns an "answers" object with the user's responses.
       * @api public
       */
      async prompt(questions = []) {
        for (let question of [].concat(questions)) {
          try {
            if (typeof question === "function") question = await question.call(this);
            await this.ask(utils.merge({}, this.options, question));
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return this.answers;
      }
      async ask(question) {
        if (typeof question === "function") {
          question = await question.call(this);
        }
        let opts = utils.merge({}, this.options, question);
        let { type: type2, name: name2 } = question;
        let { set, get } = utils;
        if (typeof type2 === "function") {
          type2 = await type2.call(this, question, this.answers);
        }
        if (!type2) return this.answers[name2];
        if (type2 === "number") type2 = "numeral";
        assert(this.prompts[type2], `Prompt "${type2}" is not registered`);
        let prompt2 = new this.prompts[type2](opts);
        let value = get(this.answers, name2);
        prompt2.state.answers = this.answers;
        prompt2.enquirer = this;
        if (name2) {
          prompt2.on("submit", (value2) => {
            this.emit("answer", name2, value2, prompt2);
            set(this.answers, name2, value2);
          });
        }
        let emit = prompt2.emit.bind(prompt2);
        prompt2.emit = (...args) => {
          this.emit.call(this, ...args);
          return emit(...args);
        };
        this.emit("prompt", prompt2, this);
        if (opts.autofill && value != null) {
          prompt2.value = prompt2.input = value;
          if (opts.autofill === "show") {
            await prompt2.submit();
          }
        } else {
          value = prompt2.value = await prompt2.run();
        }
        return value;
      }
      /**
       * Use an enquirer plugin.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       * const plugin = enquirer => {
       *   // do stuff to enquire instance
       * };
       * enquirer.use(plugin);
       * ```
       * @name use()
       * @param {Function} `plugin` Plugin function that takes an instance of Enquirer.
       * @return {Object} Returns the Enquirer instance.
       * @api public
       */
      use(plugin) {
        plugin.call(this, this);
        return this;
      }
      set Prompt(value) {
        this._Prompt = value;
      }
      get Prompt() {
        return this._Prompt || this.constructor.Prompt;
      }
      get prompts() {
        return this.constructor.prompts;
      }
      static set Prompt(value) {
        this._Prompt = value;
      }
      static get Prompt() {
        return this._Prompt || require_prompt();
      }
      static get prompts() {
        return require_prompts();
      }
      static get types() {
        return require_types();
      }
      /**
       * Prompt function that takes a "question" object or array of question objects,
       * and returns an object with responses from the user.
       *
       * ```js
       * const { prompt } = require('enquirer');
       * const response = await prompt({
       *   type: 'input',
       *   name: 'username',
       *   message: 'What is your username?'
       * });
       * console.log(response);
       * ```
       * @name Enquirer#prompt
       * @param {Array|Object} `questions` Options objects for one or more prompts to run.
       * @return {Promise} Promise that returns an "answers" object with the user's responses.
       * @api public
       */
      static get prompt() {
        const fn2 = (questions, ...rest) => {
          let enquirer = new this(...rest);
          let emit = enquirer.emit.bind(enquirer);
          enquirer.emit = (...args) => {
            fn2.emit(...args);
            return emit(...args);
          };
          return enquirer.prompt(questions);
        };
        utils.mixinEmitter(fn2, new Events());
        return fn2;
      }
    };
    utils.mixinEmitter(Enquirer, new Events());
    var prompts2 = Enquirer.prompts;
    for (let name2 of Object.keys(prompts2)) {
      let key = name2.toLowerCase();
      let run = (options) => new prompts2[name2](options).run();
      Enquirer.prompt[key] = run;
      Enquirer[key] = run;
      if (!Enquirer[name2]) {
        Reflect.defineProperty(Enquirer, name2, { get: () => prompts2[name2] });
      }
    }
    var define = (name2) => {
      utils.defineExport(Enquirer, name2, () => Enquirer.types[name2]);
    };
    define("ArrayPrompt");
    define("AuthPrompt");
    define("BooleanPrompt");
    define("NumberPrompt");
    define("StringPrompt");
    module.exports = Enquirer;
  }
});

// node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/write-file-atomic@5.0.1/node_modules/write-file-atomic/lib/index.js"(exports, module) {
    module.exports = writeFile14;
    module.exports.sync = writeFileSync;
    module.exports._getTmpname = getTmpname;
    module.exports._cleanupOnExit = cleanupOnExit;
    var fs3 = __require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit } = require_cjs();
    var path5 = __require("path");
    var { promisify: promisify3 } = __require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = __require("worker_threads");
        return workerThreads.threadId;
      } catch (e3) {
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
          fs3.unlinkSync(typeof tmpfile === "function" ? tmpfile() : tmpfile);
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
      const removeOnExitHandler = onExit(cleanupOnExit(() => tmpfile));
      const absoluteName = path5.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify3(fs3.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify3(fs3.stat)(truename).catch(() => {
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
        fd = await promisify3(fs3.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify3(fs3.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify3(fs3.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify3(fs3.fsync)(fd);
        }
        await promisify3(fs3.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify3(fs3.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify3(fs3.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify3(fs3.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify3(fs3.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify3(fs3.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile14(filename, data, options, callback) {
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
    function writeFileSync(filename, data, options) {
      if (typeof options === "string") {
        options = { encoding: options };
      } else if (!options) {
        options = {};
      }
      try {
        filename = fs3.realpathSync(filename);
      } catch (ex) {
      }
      const tmpfile = getTmpname(filename);
      if (!options.mode || !options.chown) {
        try {
          const stats = fs3.statSync(filename);
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
        fd = fs3.openSync(tmpfile, "w", options.mode || 438);
        if (options.tmpfileCreated) {
          options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          fs3.writeSync(fd, data, 0, data.length, 0);
        } else if (data != null) {
          fs3.writeSync(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          fs3.fsyncSync(fd);
        }
        fs3.closeSync(fd);
        fd = null;
        if (options.chown) {
          try {
            fs3.chownSync(tmpfile, options.chown.uid, options.chown.gid);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        if (options.mode) {
          try {
            fs3.chmodSync(tmpfile, options.mode);
          } catch (err) {
            if (!isChownErrOk(err)) {
              throw err;
            }
          }
        }
        fs3.renameSync(tmpfile, filename);
        threw = false;
      } finally {
        if (fd) {
          try {
            fs3.closeSync(fd);
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
    var p2 = process || {};
    var argv = p2.argv || [];
    var env2 = p2.env || {};
    var isColorSupported = !(!!env2.NO_COLOR || argv.includes("--no-color")) && (!!env2.FORCE_COLOR || argv.includes("--color") || p2.platform === "win32" || (p2.stdout || {}).isTTY && env2.TERM !== "dumb" || !!env2.CI);
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
      let f2 = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f2("\x1B[0m", "\x1B[0m"),
        bold: f2("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f2("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f2("\x1B[3m", "\x1B[23m"),
        underline: f2("\x1B[4m", "\x1B[24m"),
        inverse: f2("\x1B[7m", "\x1B[27m"),
        hidden: f2("\x1B[8m", "\x1B[28m"),
        strikethrough: f2("\x1B[9m", "\x1B[29m"),
        black: f2("\x1B[30m", "\x1B[39m"),
        red: f2("\x1B[31m", "\x1B[39m"),
        green: f2("\x1B[32m", "\x1B[39m"),
        yellow: f2("\x1B[33m", "\x1B[39m"),
        blue: f2("\x1B[34m", "\x1B[39m"),
        magenta: f2("\x1B[35m", "\x1B[39m"),
        cyan: f2("\x1B[36m", "\x1B[39m"),
        white: f2("\x1B[37m", "\x1B[39m"),
        gray: f2("\x1B[90m", "\x1B[39m"),
        bgBlack: f2("\x1B[40m", "\x1B[49m"),
        bgRed: f2("\x1B[41m", "\x1B[49m"),
        bgGreen: f2("\x1B[42m", "\x1B[49m"),
        bgYellow: f2("\x1B[43m", "\x1B[49m"),
        bgBlue: f2("\x1B[44m", "\x1B[49m"),
        bgMagenta: f2("\x1B[45m", "\x1B[49m"),
        bgCyan: f2("\x1B[46m", "\x1B[49m"),
        bgWhite: f2("\x1B[47m", "\x1B[49m"),
        blackBright: f2("\x1B[90m", "\x1B[39m"),
        redBright: f2("\x1B[91m", "\x1B[39m"),
        greenBright: f2("\x1B[92m", "\x1B[39m"),
        yellowBright: f2("\x1B[93m", "\x1B[39m"),
        blueBright: f2("\x1B[94m", "\x1B[39m"),
        magentaBright: f2("\x1B[95m", "\x1B[39m"),
        cyanBright: f2("\x1B[96m", "\x1B[39m"),
        whiteBright: f2("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f2("\x1B[100m", "\x1B[49m"),
        bgRedBright: f2("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f2("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f2("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f2("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f2("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f2("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f2("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
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
      for (let i2 = 0, length = set.length; i2 < length; i2 += 2) {
        pos += set[i2];
        if (pos > code) return false;
        pos += set[i2 + 1];
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
    function isIdentifierName(name2) {
      let isFirst = true;
      for (let i2 = 0; i2 < name2.length; i2++) {
        let cp = name2.charCodeAt(i2);
        if ((cp & 64512) === 55296 && i2 + 1 < name2.length) {
          const trail = name2.charCodeAt(++i2);
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.27.1/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
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

// node_modules/.pnpm/@babel+code-frame@7.27.1/node_modules/@babel/code-frame/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/@babel+code-frame@7.27.1/node_modules/@babel/code-frame/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var picocolors = require_picocolors();
    var jsTokens = require_js_tokens();
    var helperValidatorIdentifier = require_lib3();
    function isColorSupported() {
      return typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? false : picocolors.isColorSupported;
    }
    var compose = (f2, g2) => (v2) => f2(g2(v2));
    function buildDefs(colors) {
      return {
        keyword: colors.cyan,
        capitalized: colors.yellow,
        jsxIdentifier: colors.yellow,
        punctuator: colors.yellow,
        number: colors.magenta,
        string: colors.green,
        regex: colors.magenta,
        comment: colors.gray,
        invalid: compose(compose(colors.white, colors.bgRed), colors.bold),
        gutter: colors.gray,
        marker: compose(colors.red, colors.bold),
        message: compose(colors.red, colors.bold),
        reset: colors.reset
      };
    }
    var defsOn = buildDefs(picocolors.createColors(true));
    var defsOff = buildDefs(picocolors.createColors(false));
    function getDefs(enabled) {
      return enabled ? defsOn : defsOff;
    }
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    var NEWLINE$1 = /\r\n|[\n\r\u2028\u2029]/;
    var BRACKET = /^[()[\]{}]$/;
    var tokenize;
    {
      const JSX_TAG = /^[a-z][\w-]*$/i;
      const getTokenType = function(token, offset, text) {
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
        if (token.type === "punctuator" && BRACKET.test(token.value)) {
          return "bracket";
        }
        if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
          return "punctuator";
        }
        return token.type;
      };
      tokenize = function* (text) {
        let match;
        while (match = jsTokens.default.exec(text)) {
          const token = jsTokens.matchToToken(match);
          yield {
            type: getTokenType(token, match.index, text),
            value: token.value
          };
        }
      };
    }
    function highlight(text) {
      if (text === "") return "";
      const defs = getDefs(true);
      let highlighted = "";
      for (const {
        type: type2,
        value
      } of tokenize(text)) {
        if (type2 in defs) {
          highlighted += value.split(NEWLINE$1).map((str) => defs[type2](str)).join("\n");
        } else {
          highlighted += value;
        }
      }
      return highlighted;
    }
    var deprecationWarningShown = false;
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
        for (let i2 = 0; i2 <= lineDiff; i2++) {
          const lineNumber = i2 + startLine;
          if (!startColumn) {
            markerLines[lineNumber] = true;
          } else if (i2 === 0) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
          } else if (i2 === lineDiff) {
            markerLines[lineNumber] = [0, endColumn];
          } else {
            const sourceLength = source[lineNumber - i2].length;
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
      const lines = rawLines.split(NEWLINE);
      const {
        start,
        end,
        markerLines
      } = getMarkerLines(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = shouldHighlight ? highlight(rawLines) : rawLines;
      let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index2) => {
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
    exports.highlight = highlight;
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
    var re3 = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t3 = exports.t = {};
    var R = 0;
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
    var createToken = (name2, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name2, index, value);
      t3[name2] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re3[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t3.NUMERICIDENTIFIER]}|${src[t3.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t3.NUMERICIDENTIFIERLOOSE]}|${src[t3.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t3.PRERELEASEIDENTIFIER]}(?:\\.${src[t3.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t3.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t3.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t3.BUILDIDENTIFIER]}(?:\\.${src[t3.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t3.MAINVERSION]}${src[t3.PRERELEASE]}?${src[t3.BUILD]}?`);
    createToken("FULL", `^${src[t3.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t3.MAINVERSIONLOOSE]}${src[t3.PRERELEASELOOSE]}?${src[t3.BUILD]}?`);
    createToken("LOOSE", `^${src[t3.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t3.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t3.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:${src[t3.PRERELEASE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:${src[t3.PRERELEASELOOSE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t3.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t3.COERCEPLAIN] + `(?:${src[t3.PRERELEASE]})?(?:${src[t3.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t3.COERCE], true);
    createToken("COERCERTLFULL", src[t3.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t3.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t3.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t3.GTLT]}\\s*(${src[t3.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]}|${src[t3.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t3.XRANGEPLAIN]})\\s+-\\s+(${src[t3.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t3.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t3.XRANGEPLAINLOOSE]})\\s*$`);
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
    var compareIdentifiers = (a2, b2) => {
      const anum = numeric.test(a2);
      const bnum = numeric.test(b2);
      if (anum && bnum) {
        a2 = +a2;
        b2 = +b2;
      }
      return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
    };
    var rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
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
    var { safeRe: re3, safeSrc: src, t: t3 } = require_re();
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
        const m3 = version.trim().match(options.loose ? re3[t3.LOOSE] : re3[t3.FULL]);
        if (!m3) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m3[1];
        this.minor = +m3[2];
        this.patch = +m3[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m3[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m3[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m3[5] ? m3[5].split(".") : [];
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
        let i2 = 0;
        do {
          const a2 = this.prerelease[i2];
          const b2 = other.prerelease[i2];
          debug("prerelease compare", i2, a2, b2);
          if (a2 === void 0 && b2 === void 0) {
            return 0;
          } else if (b2 === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b2) {
            continue;
          } else {
            return compareIdentifiers(a2, b2);
          }
        } while (++i2);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i2 = 0;
        do {
          const a2 = this.build[i2];
          const b2 = other.build[i2];
          debug("build compare", i2, a2, b2);
          if (a2 === void 0 && b2 === void 0) {
            return 0;
          } else if (b2 === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b2) {
            continue;
          } else {
            return compareIdentifiers(a2, b2);
          }
        } while (++i2);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const r2 = new RegExp(`^${this.options.loose ? src[t3.PRERELEASELOOSE] : src[t3.PRERELEASE]}$`);
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
              let i2 = this.prerelease.length;
              while (--i2 >= 0) {
                if (typeof this.prerelease[i2] === "number") {
                  this.prerelease[i2]++;
                  i2 = -2;
                }
              }
              if (i2 === -1) {
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
    var parse10 = (version, options, throwErrors = false) => {
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
    module.exports = parse10;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/valid.js"(exports, module) {
    var parse10 = require_parse2();
    var valid = (version, options) => {
      const v2 = parse10(version, options);
      return v2 ? v2.version : null;
    };
    module.exports = valid;
  }
});

// node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/.pnpm/semver@7.7.1/node_modules/semver/functions/clean.js"(exports, module) {
    var parse10 = require_parse2();
    var clean = (version, options) => {
      const s3 = parse10(version.trim().replace(/^[=v]+/, ""), options);
      return s3 ? s3.version : null;
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
        for (var i2 = 0; i2 < possibilities.length; i2++) {
          string = read(possibilities[i2]);
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
        var t3 = token();
        if (t3 && t3.type === "OPERATOR" && operator === t3.string) {
          next();
          return t3.string;
        }
      }
      function parseWith() {
        if (parseOperator("WITH")) {
          var t3 = token();
          if (t3 && t3.type === "EXCEPTION") {
            next();
            return t3.string;
          }
          throw new Error("Expected exception after `WITH`");
        }
      }
      function parseLicenseRef() {
        var begin = index;
        var string = "";
        var t3 = token();
        if (t3.type === "DOCUMENTREF") {
          next();
          string += "DocumentRef-" + t3.string + ":";
          if (!parseOperator(":")) {
            throw new Error("Expected `:` after `DocumentRef-...`");
          }
        }
        t3 = token();
        if (t3.type === "LICENSEREF") {
          next();
          string += "LicenseRef-" + t3.string;
          return { license: string };
        }
        index = begin;
      }
      function parseLicense() {
        var t3 = token();
        if (t3 && t3.type === "LICENSE") {
          next();
          var node2 = { license: t3.string };
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
    var parse10 = require_parse3();
    module.exports = function(source) {
      return parse10(scan(source));
    };
  }
});

// node_modules/.pnpm/spdx-correct@3.2.0/node_modules/spdx-correct/index.js
var require_spdx_correct = __commonJS({
  "node_modules/.pnpm/spdx-correct@3.2.0/node_modules/spdx-correct/index.js"(exports, module) {
    var parse10 = require_spdx_expression_parse();
    var spdxLicenseIds = require_spdx_license_ids();
    function valid(string) {
      try {
        parse10(string);
        return true;
      } catch (error2) {
        return false;
      }
    }
    function sortTranspositions(a2, b2) {
      var length = b2[0].length - a2[0].length;
      if (length !== 0) return length;
      return a2[0].toUpperCase().localeCompare(b2[0].toUpperCase());
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
      for (var i2 = 0; i2 < transforms.length; i2++) {
        var transformed = transforms[i2](identifier).trim();
        if (transformed !== identifier && valid(transformed)) {
          return transformed;
        }
      }
      return null;
    };
    var validLastResort = function(identifier) {
      var upperCased = identifier.toUpperCase();
      for (var i2 = 0; i2 < lastResorts.length; i2++) {
        var lastResort = lastResorts[i2];
        if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
          return lastResort[IDENTIFIER];
        }
      }
      return null;
    };
    var anyCorrection = function(identifier, check) {
      for (var i2 = 0; i2 < transpositions.length; i2++) {
        var transposition = transpositions[i2];
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
    var parse10 = require_spdx_expression_parse();
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
        ast = parse10(argument);
      } catch (e3) {
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
        addEventListener(_2, fn2) {
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
        const s3 = new _Stack(max, HeapCls);
        __privateSet(_Stack, _constructing, false);
        return s3;
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
        __privateAdd(this, _removeItemSize, (_i3) => {
        });
        __privateAdd(this, _addItemSize, (_i3, _s2, _st) => {
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
          isBackgroundFetch: (p2) => {
            var _a16;
            return __privateMethod(_a16 = c, _LRUCache_instances, isBackgroundFetch_fn).call(_a16, p2);
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
            yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          if (__privateGet(this, _valList)[i2] !== void 0 && __privateGet(this, _keyList)[i2] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
            yield [__privateGet(this, _keyList)[i2], __privateGet(this, _valList)[i2]];
          }
        }
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const k2 = __privateGet(this, _keyList)[i2];
          if (k2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const k2 = __privateGet(this, _keyList)[i2];
          if (k2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
            yield k2;
          }
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v2 = __privateGet(this, _valList)[i2];
          if (v2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
            yield __privateGet(this, _valList)[i2];
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const v2 = __privateGet(this, _valList)[i2];
          if (v2 !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i2])) {
            yield __privateGet(this, _valList)[i2];
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v2 = __privateGet(this, _valList)[i2];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
          if (value === void 0)
            continue;
          if (fn2(value, __privateGet(this, _keyList)[i2], this)) {
            return this.get(__privateGet(this, _keyList)[i2], getOptions);
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
          const v2 = __privateGet(this, _valList)[i2];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
          if (value === void 0)
            continue;
          fn2.call(thisp, value, __privateGet(this, _keyList)[i2], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn2, thisp = this) {
        for (const i2 of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
          const v2 = __privateGet(this, _valList)[i2];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
          if (value === void 0)
            continue;
          fn2.call(thisp, value, __privateGet(this, _keyList)[i2], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = false;
        for (const i2 of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
          if (__privateGet(this, _isStale).call(this, i2)) {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[i2], "expire");
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
        const i2 = __privateGet(this, _keyMap).get(key);
        if (i2 === void 0)
          return void 0;
        const v2 = __privateGet(this, _valList)[i2];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
        if (value === void 0)
          return void 0;
        const entry = { value };
        if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
          const ttl = __privateGet(this, _ttls)[i2];
          const start = __privateGet(this, _starts)[i2];
          if (ttl && start) {
            const remain = ttl - (perf.now() - start);
            entry.ttl = remain;
            entry.start = Date.now();
          }
        }
        if (__privateGet(this, _sizes)) {
          entry.size = __privateGet(this, _sizes)[i2];
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
        for (const i2 of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this, { allowStale: true })) {
          const key = __privateGet(this, _keyList)[i2];
          const v2 = __privateGet(this, _valList)[i2];
          const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
          if (value === void 0 || key === void 0)
            continue;
          const entry = { value };
          if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
            entry.ttl = __privateGet(this, _ttls)[i2];
            const age = perf.now() - __privateGet(this, _starts)[i2];
            entry.start = Math.floor(Date.now() - age);
          }
          if (__privateGet(this, _sizes)) {
            entry.size = __privateGet(this, _sizes)[i2];
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
      set(k2, v2, setOptions = {}) {
        var _a16, _b13, _c5, _d4, _e4;
        if (v2 === void 0) {
          this.delete(k2);
          return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = __privateGet(this, _requireSize).call(this, k2, v2, setOptions.size || 0, sizeCalculation);
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
          __privateGet(this, _valList)[index] = v2;
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
          if (v2 !== oldVal) {
            if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              const { __staleWhileFetching: s3 } = oldVal;
              if (s3 !== void 0 && !noDisposeOnSet) {
                if (__privateGet(this, _hasDispose)) {
                  (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, s3, k2, "set");
                }
                if (__privateGet(this, _hasDisposeAfter)) {
                  (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([s3, k2, "set"]);
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
            __privateGet(this, _valList)[index] = v2;
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
            (_e4 = __privateGet(this, _disposeAfter)) == null ? void 0 : _e4.call(this, ...task);
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
          const v2 = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) && v2.__staleWhileFetching === void 0) {
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
        const v2 = __privateGet(this, _valList)[index];
        return __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2) ? v2.__staleWhileFetching : v2;
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
          const p2 = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k2, index, options, context);
          return p2.__returned = p2;
        } else {
          const v2 = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
            const stale = allowStale && v2.__staleWhileFetching !== void 0;
            if (status) {
              status.fetch = "inflight";
              if (stale)
                status.returnedStale = true;
            }
            return stale ? v2.__staleWhileFetching : v2.__returned = v2;
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
            return v2;
          }
          const p2 = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k2, index, options, context);
          const hasStale = p2.__staleWhileFetching !== void 0;
          const staleVal = hasStale && allowStale;
          if (status) {
            status.fetch = isStale ? "stale" : "refresh";
            if (staleVal && isStale)
              status.returnedStale = true;
          }
          return staleVal ? p2.__staleWhileFetching : p2.__returned = p2;
        }
      }
      async forceFetch(k2, fetchOptions = {}) {
        const v2 = await this.fetch(k2, fetchOptions);
        if (v2 === void 0)
          throw new Error("fetch() returned undefined");
        return v2;
      }
      memo(k2, memoOptions = {}) {
        const memoMethod = __privateGet(this, _memoMethod);
        if (!memoMethod) {
          throw new Error("no memoMethod provided to constructor");
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v2 = this.get(k2, options);
        if (!forceRefresh && v2 !== void 0)
          return v2;
        const vv = memoMethod(k2, v2, {
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
          const t3 = setTimeout(() => {
            if (__privateGet(this, _isStale).call(this, index)) {
              __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[index], "expire");
            }
          }, ttl + 1);
          if (t3.unref) {
            t3.unref();
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
          const t3 = setTimeout(() => cachedNow = 0, this.ttlResolution);
          if (t3.unref) {
            t3.unref();
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
        const s3 = starts[index];
        const t3 = ttls[index];
        return !!t3 && !!s3 && (cachedNow || getNow()) - s3 > t3;
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
      __privateSet(this, _requireSize, (k2, v2, size, sizeCalculation) => {
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
          return 0;
        }
        if (!isPosInt(size)) {
          if (sizeCalculation) {
            if (typeof sizeCalculation !== "function") {
              throw new TypeError("sizeCalculation must be a function");
            }
            size = sizeCalculation(v2, k2);
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
        for (let i2 = __privateGet(this, _tail); true; ) {
          if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i2)) {
            break;
          }
          if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
            yield i2;
          }
          if (i2 === __privateGet(this, _head)) {
            break;
          } else {
            i2 = __privateGet(this, _prev)[i2];
          }
        }
      }
    };
    rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
      if (__privateGet(this, _size)) {
        for (let i2 = __privateGet(this, _head); true; ) {
          if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i2)) {
            break;
          }
          if (allowStale || !__privateGet(this, _isStale).call(this, i2)) {
            yield i2;
          }
          if (i2 === __privateGet(this, _tail)) {
            break;
          } else {
            i2 = __privateGet(this, _next)[i2];
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
      const v2 = __privateGet(this, _valList)[head];
      if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
        v2.__abortController.abort(new Error("evicted"));
      } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
        if (__privateGet(this, _hasDispose)) {
          (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v2, k2, "evict");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v2, k2, "evict"]);
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
      const v2 = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
        return v2;
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
      const cb = (v3, updateCache = false) => {
        const { aborted } = ac.signal;
        const ignoreAbort = options.ignoreFetchAbort && v3 !== void 0;
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
        const bf2 = p2;
        if (__privateGet(this, _valList)[index] === p2) {
          if (v3 === void 0) {
            if (bf2.__staleWhileFetching) {
              __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
            } else {
              __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k2, "fetch");
            }
          } else {
            if (options.status)
              options.status.fetchUpdated = true;
            this.set(k2, v3, fetchOpts.options);
          }
        }
        return v3;
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
        const bf2 = p2;
        if (__privateGet(this, _valList)[index] === p2) {
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
        const fmp = (_a16 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a16.call(this, k2, v2, fetchOpts);
        if (fmp && fmp instanceof Promise) {
          fmp.then((v3) => res(v3 === void 0 ? void 0 : v3), rej);
        }
        ac.signal.addEventListener("abort", () => {
          if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
            res(void 0);
            if (options.allowStaleOnFetchAbort) {
              res = (v3) => cb(v3, true);
            }
          }
        });
      };
      if (options.status)
        options.status.fetchDispatched = true;
      const p2 = new Promise(pcall).then(cb, eb);
      const bf = Object.assign(p2, {
        __abortController: ac,
        __staleWhileFetching: v2,
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
    isBackgroundFetch_fn = function(p2) {
      if (!__privateGet(this, _hasFetchMethod))
        return false;
      const b2 = p2;
      return !!b2 && b2 instanceof Promise && b2.hasOwnProperty("__staleWhileFetching") && b2.__abortController instanceof AC;
    };
    connect_fn = function(p2, n) {
      __privateGet(this, _prev)[n] = p2;
      __privateGet(this, _next)[p2] = n;
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
            const v2 = __privateGet(this, _valList)[index];
            if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
              v2.__abortController.abort(new Error("deleted"));
            } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
              if (__privateGet(this, _hasDispose)) {
                (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v2, k2, reason);
              }
              if (__privateGet(this, _hasDisposeAfter)) {
                (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v2, k2, reason]);
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
              const ni2 = __privateGet(this, _next)[index];
              __privateGet(this, _prev)[ni2] = __privateGet(this, _prev)[index];
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
        const v2 = __privateGet(this, _valList)[index];
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v2)) {
          v2.__abortController.abort(new Error("deleted"));
        } else {
          const k2 = __privateGet(this, _keyList)[index];
          if (__privateGet(this, _hasDispose)) {
            (_a16 = __privateGet(this, _dispose)) == null ? void 0 : _a16.call(this, v2, k2, reason);
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_b13 = __privateGet(this, _disposed)) == null ? void 0 : _b13.push([v2, k2, reason]);
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
    var formatHashFragment = (f2) => f2.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
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
    for (const [name2, host] of Object.entries(hosts)) {
      hosts[name2] = Object.assign({}, defaults2, host);
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
      static addHost(name2, host) {
        __privateGet(_GitHost, _gitHosts)[name2] = host;
        __privateGet(_GitHost, _gitHosts).byDomain[host.domain] = name2;
        __privateGet(_GitHost, _gitHosts).byShortcut[`${name2}:`] = name2;
        __privateGet(_GitHost, _protocols)[`${name2}:`] = { name: name2 };
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
    for (const [name2, host] of Object.entries(hosts)) {
      GitHost.addHost(name2, host);
    }
    module.exports = GitHost;
  }
});

// node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/extract_description.js
var require_extract_description = __commonJS({
  "node_modules/.pnpm/normalize-package-data@6.0.2/node_modules/normalize-package-data/lib/extract_description.js"(exports, module) {
    module.exports = extractDescription;
    function extractDescription(d2) {
      if (!d2) {
        return;
      }
      if (d2 === "ERROR: No README data found!") {
        return;
      }
      d2 = d2.trim().split("\n");
      let s3 = 0;
      while (d2[s3] && d2[s3].trim().match(/^(#|$)/)) {
        s3++;
      }
      const l2 = d2.length;
      let e3 = s3 + 1;
      while (e3 < l2 && d2[e3].trim()) {
        e3++;
      }
      return d2.slice(s3, e3).join(" ").trim();
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
        Object.keys(typos.topLevel).forEach(function(d2) {
          if (Object.prototype.hasOwnProperty.call(data, d2)) {
            this.warn("typo", d2, typos.topLevel[d2]);
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
          var b2 = {};
          var match;
          if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
            b2[match[1]] = data.bin;
          } else {
            b2[data.name] = data.bin;
          }
          data.bin = b2;
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
          Object.keys(data[deps]).forEach(function(d2) {
            var r2 = data[deps][d2];
            if (typeof r2 !== "string") {
              this.warn("nonStringDependency", d2, JSON.stringify(r2));
              delete data[deps][d2];
            }
            var hosted = hostedGitInfo.fromUrl(data[deps][d2]);
            if (hosted) {
              data[deps][d2] = hosted.toString();
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
    function ensureValidName(name2, strict, allowLegacyCase) {
      if (name2.charAt(0) === "." || !(isValidScopedPackageName(name2) || isCorrectlyEncodedName(name2)) || strict && !allowLegacyCase && name2 !== name2.toLowerCase() || name2.toLowerCase() === "node_modules" || name2.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name2));
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
      var name2 = person.name || "";
      var u = person.url || person.web;
      var wrappedUrl = u ? " (" + u + ")" : "";
      var e3 = person.email || person.mail;
      var wrappedEmail = e3 ? " <" + e3 + ">" : "";
      return name2 + wrappedEmail + wrappedUrl;
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
      var o3 = data.optionalDependencies;
      if (!o3) {
        return;
      }
      var d2 = data.dependencies || {};
      Object.keys(o3).forEach(function(k2) {
        d2[k2] = o3[k2];
      });
      data.dependencies = d2;
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
      var o3 = {};
      deps.filter(function(d2) {
        return typeof d2 === "string";
      }).forEach(function(d2) {
        d2 = d2.trim().split(/(:?[@\s><=])/);
        var dn2 = d2.shift();
        var dv = d2.join("");
        dv = dv.trim();
        dv = dv.replace(/^@/, "");
        o3[dn2] = dv;
      });
      return o3;
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
    module.exports = normalize3;
    var fixer = require_fixer();
    normalize3.fixer = fixer;
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
    function normalize3(data, warn2, strict) {
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

// node_modules/.pnpm/dotenv@16.5.0/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.5.0/node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.5.0",
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
      homepage: "https://github.com/motdotla/dotenv#readme",
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

// node_modules/.pnpm/dotenv@16.5.0/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.5.0/node_modules/dotenv/lib/main.js"(exports, module) {
    var fs3 = __require("fs");
    var path5 = __require("path");
    var os2 = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse10(src) {
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
      for (let i2 = 0; i2 < length; i2++) {
        try {
          const key = keys2[i2].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error2) {
          if (i2 + 1 >= length) {
            throw error2;
          }
        }
      }
      return DotenvModule.parse(decrypted);
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
      let uri2;
      try {
        uri2 = new URL(dotenvKey);
      } catch (error2) {
        if (error2.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error2;
      }
      const key = uri2.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri2.searchParams.get("environment");
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
            if (fs3.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path5.resolve(process.cwd(), ".env.vault");
      }
      if (fs3.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path5.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = Boolean(options && options.debug);
      if (debug) {
        _debug("Loading env from encrypted .env.vault");
      }
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
          const parsed = DotenvModule.parse(fs3.readFileSync(path6, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e3) {
          if (debug) {
            _debug(`Failed to load ${path6} ${e3.message}`);
          }
          lastError = e3;
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
      parse: parse10,
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
  return arguments.length === 1 ? (...t3) => typeof t3[0] == "string" ? t3.join(n) : t3[0].join(n) : typeof r2[0] == "string" ? r2.join(n) : r2[0].join(n);
};
g.ws = (...n) => typeof n[0] == "string" ? n.join(" ") : n[0].join(" ");
g.nl = (...n) => typeof n[0] == "string" ? n.join(`
`) : n[0].join(`
`);
var xr = Object.create;
var Ne = Object.defineProperty;
var yr = Object.getOwnPropertyDescriptor;
var wr = Object.getOwnPropertyNames;
var Tr = Object.getPrototypeOf;
var $r = Object.prototype.hasOwnProperty;
var Sr = (e3, t3) => () => (e3 && (t3 = e3(e3 = 0)), t3);
var kr = (e3, t3) => () => (t3 || e3((t3 = { exports: {} }).exports, t3), t3.exports);
var vr = (e3, t3) => {
  for (var r2 in t3) Ne(e3, r2, { get: t3[r2], enumerable: true });
};
var Or = (e3, t3, r2, n) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let i2 of wr(t3)) !$r.call(e3, i2) && i2 !== r2 && Ne(e3, i2, { get: () => t3[i2], enumerable: !(n = yr(t3, i2)) || n.enumerable });
  return e3;
};
var Pr = (e3, t3, r2) => (r2 = e3 != null ? xr(Tr(e3)) : {}, Or(Ne(r2, "default", { value: e3, enumerable: true }) , e3));
var l = Sr(() => {
});
var At = kr((oi, Bt) => {
  l();
  var pt, Me, _e4, { defineProperty: Ir, setPrototypeOf: Et, create: Lr, keys: Rr } = Object, N3 = "", { round: W, max: Nr } = Math, ht = (e3) => {
    var _a14;
    let t3 = (_a14 = /([a-f\d]{3,6})/i.exec(e3)) == null ? void 0 : _a14[1], r2 = t3 == null ? void 0 : t3.length, n = parseInt(6 ^ r2 ? 3 ^ r2 ? "0" : t3[0] + t3[0] + t3[1] + t3[1] + t3[2] + t3[2] : t3, 16);
    return [n >> 16 & 255, n >> 8 & 255, 255 & n];
  }, ft = (e3, t3, r2) => e3 ^ t3 || t3 ^ r2 ? 16 + 36 * W(e3 / 51) + 6 * W(t3 / 51) + W(r2 / 51) : 8 > e3 ? 16 : e3 > 248 ? 231 : W(24 * (e3 - 8) / 247) + 232, je2 = (e3) => {
    let t3, r2, n, i2, u;
    return 8 > e3 ? 30 + e3 : 16 > e3 ? e3 - 8 + 90 : (232 > e3 ? (u = (e3 -= 16) % 36, t3 = (e3 / 36 | 0) / 5, r2 = (u / 6 | 0) / 5, n = u % 6 / 5) : t3 = r2 = n = (10 * (e3 - 232) + 8) / 255, i2 = 2 * Nr(t3, r2, n), i2 ? 30 + (W(n) << 2 | W(r2) << 1 | W(t3)) + (2 ^ i2 ? 0 : 60) : 30);
  }, Mr = (() => {
    var _a14, _b12, _c5;
    let e3 = (f2) => n.some((g2) => f2.test(g2)), t3 = globalThis, r2 = t3.process ?? {}, n = r2.argv ?? [], i2 = r2.env ?? {}, u = -1;
    try {
      pt = "," + Rr(i2).join(",");
    } catch {
      i2 = {}, u = 0;
    }
    let s3 = "FORCE_COLOR", D2 = { false: 0, 0: 0, 1: 1, 2: 2, 3: 3 }[i2[s3]] ?? -1, a2 = s3 in i2 && D2 || e3(/^--color=?(true|always)?$/);
    return a2 && (u = D2), ~u || (u = ((f2, g2, p2) => (Me = f2.TERM, { "24bit": 3, truecolor: 3, ansi256: 2, ansi: 1 }[f2.COLORTERM] || (f2.CI ? /,GITHUB/.test(pt) ? 3 : 1 : g2 && Me !== "dumb" ? p2 ? 3 : /-256/.test(Me) ? 2 : 1 : 0)))(i2, !!i2.PM2_HOME || ((_a14 = i2.NEXT_RUNTIME) == null ? void 0 : _a14.includes("edge")) || !!((_b12 = r2.stdout) == null ? void 0 : _b12.isTTY), r2.platform === "win32")), !D2 || i2.NO_COLOR || e3(/^--(no-color|color=(false|never))$/) ? 0 : ((_c5 = t3.window) == null ? void 0 : _c5.chrome) || a2 && !u ? 3 : u;
  })(), gt = { open: N3, close: N3 }, J = 39, X = 49, dt = {}, Ct = ({ p: e3 }, { open: t3, close: r2 }) => {
    let n = (s3, ...D2) => {
      if (!s3) {
        if (t3 && t3 === r2) return t3;
        if ((s3 ?? N3) === N3) return N3;
      }
      let a2, f2 = s3.raw ? String.raw({ raw: s3 }, ...D2) : N3 + s3, g2 = n.p, p2 = g2.o, E = g2.c;
      if (f2.includes("\x1B")) for (; g2; g2 = g2.p) {
        let { open: m3, close: x } = g2, c = x.length, A = N3, y = 0;
        if (c) for (; ~(a2 = f2.indexOf(x, y)); y = a2 + c) A += f2.slice(y, a2) + m3;
        f2 = A + f2.slice(y);
      }
      return p2 + (f2.includes(`
`) ? f2.replace(/(\r?\n)/g, E + "$1" + p2) : f2) + E;
    }, i2 = t3, u = r2;
    return e3 && (i2 = e3.o + t3, u = r2 + e3.c), Et(n, _e4), n.p = { open: t3, close: r2, o: i2, c: u, p: e3 }, n.open = i2, n.close = u, n;
  }, mt = function(e3 = Mr) {
    let t3 = { Ansis: mt, isSupported: () => r2, strip: (c) => c.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, N3), extend(c) {
      for (let A in c) {
        let y = c[A], R = (typeof y)[0], ie = R === "s" ? a2(...ht(y)) : y;
        dt[A] = R === "f" ? { get() {
          return (...K2) => Ct(this, y(...K2));
        } } : { get() {
          let K2 = Ct(this, ie);
          return Ir(this, A, { value: K2 }), K2;
        } };
      }
      return _e4 = Lr({}, dt), Et(t3, _e4), t3;
    } }, r2 = e3 > 0, n = (c, A) => r2 ? { open: `\x1B[${c}m`, close: `\x1B[${A}m` } : gt, i2 = (c) => (A) => c(...ht(A)), u = (c, A) => (y, R, ie) => n(`${c}8;2;${y};${R};${ie}`, A), s3 = (c, A) => (y, R, ie) => n(((K2, Ar, br) => je2(ft(K2, Ar, br)))(y, R, ie) + c, A), D2 = (c) => (A, y, R) => c(ft(A, y, R)), a2 = u(3, J), f2 = u(4, X), g2 = (c) => n("38;5;" + c, J), p2 = (c) => n("48;5;" + c, X);
    e3 === 2 ? (a2 = D2(g2), f2 = D2(p2)) : e3 === 1 && (a2 = s3(0, J), f2 = s3(10, X), g2 = (c) => n(je2(c), J), p2 = (c) => n(je2(c) + 10, X));
    let E, m3 = { fg: g2, bg: p2, rgb: a2, bgRgb: f2, hex: i2(a2), bgHex: i2(f2), visible: gt, reset: n(0, 0), bold: n(1, 22), dim: n(2, 22), italic: n(3, 23), underline: n(4, 24), inverse: n(7, 27), hidden: n(8, 28), strikethrough: n(9, 29) }, x = "Bright";
    return "black,red,green,yellow,blue,magenta,cyan,white,gray".split(",").map((c, A) => {
      E = "bg" + c[0].toUpperCase() + c.slice(1), 8 > A ? (m3[c + x] = n(90 + A, J), m3[E + x] = n(100 + A, X)) : A = 60, m3[c] = n(30 + A, J), m3[E] = n(40 + A, X);
    }), t3.extend(m3);
  }, We = new mt();
  Bt.exports = We, We.default = We;
});
l();
l();
l();
l();
var Ge = Pr(At());
var ue = Ge.default;
var { Ansis: jr, fg: ai, bg: Fi, rgb: ci, bgRgb: pi, hex: hi, bgHex: fi, reset: gi, inverse: di, hidden: Ci, visible: Ei, bold: Ue, dim: mi, italic: Bi, underline: Ai, strikethrough: bi, black: xi, red: yi, green: wi, yellow: Ti, blue: $i, magenta: Si, cyan: ki, white: vi, gray: Oi, redBright: Pi, greenBright: Ii, yellowBright: Li, blueBright: Ri, magentaBright: Ni, cyanBright: Mi, whiteBright: ji, bgBlack: Wi, bgRed: _i, bgGreen: Gi, bgYellow: Ui, bgBlue: Hi, bgMagenta: zi, bgCyan: Vi, bgWhite: Yi, bgGray: qi, bgRedBright: Ki, bgGreenBright: Ji, bgYellowBright: Xi, bgBlueBright: Zi, bgMagentaBright: Qi, bgCyanBright: eu, bgWhiteBright: tu } = Ge.default;
l();
var su = "\x1B[H\x1B[2J";
ue.extend({ brown: "#c19a6b", pink: "#ff75d1", teal: "#91EBC2", lightGray: "#2a2a2e", midGray: "#2a2929", orange: "#FFAB40", lavender: "#BECAFF", neonTeal: "#03E4DC", neonGreen: "#56ef83", neonCyan: "#69d5fd", neonRouge: "#FF8095", neonMagenta: "#7b68ee" });
var { cyan: ou, red: S, green: lu, yellow: T, magenta: au, blue: Fu, white: He, gray: F, dim: cu, cyanBright: pu, redBright: k, greenBright: hu, yellowBright: P, magentaBright: fu, blueBright: gu, whiteBright: I, strip: _, underline: Ee, bold: $, reset: me, strikethrough: du, lightGray: h, midGray: Cu, pink: bt, brown: Eu, teal: mu, orange: Bu, lavender: Au, neonGreen: se, neonCyan: bu, neonRouge: xt, neonMagenta: yt, neonTeal: wt } = ue;
`${Ue.open + T.open}!${T.close + Ue.close}`;
`${F.open}\u1D20${F.close}`;
`${F.open}|${F.close}`;
var vu = `${F.open}#${F.close}`;
`${F.open}+${F.close}`;
`${F.open}\xB5${F.close}`;
`${F.open}-${F.close}`;
`${F.open},${F.close}`;
var Ru = `${se.open}\u2713${se.close}`;
var Tt = `${k.open}\u2715${k.close}`;
var M = `${F.open}:${F.close}`;
var Z = `${F.open}\u2794${F.close}`;
var $t = `${F.open}\xBB${F.close}`;
var Nu = `${F.open}\u27A4${F.close}`;
var Mu = `${F.open}\u2942${F.close}`;
var Be = `${F.open}~${F.close}`;
var St = `${F.open}\u2014${F.close}`;
var kt = `${F.open}(${F.close}`;
var vt = `${F.open})${F.close}`;
var Ot = `${F.open}{${F.close}`;
var Pt = `${F.open}}${F.close}`;
var It = `${F.open}[${F.close}`;
var Lt = `${F.open}]${F.close}`;
var Rt = `${F.open}<${F.close}`;
var Nt = `${F.open}>${F.close}`;
function Ae(e3) {
  return Buffer.isBuffer(e3) ? e3.toString() : Array.isArray(e3) || typeof e3 == "object" ? JSON.stringify(e3) : typeof e3 == "boolean" || typeof e3 == "number" ? `${e3}` : typeof e3 == "string" ? e3 : String(e3);
}
function Mt(e3, t3 = null) {
  let r2 = 0;
  if (Array.isArray(e3)) for (let n of e3) t3 ? n[t3].length > r2 && (r2 = n[t3].length) : n.length > r2 && (r2 = n.length);
  else for (let n in e3) n.length > r2 && (r2 = n.length);
  return r2 = r2 + 1, function(i2) {
    let u = typeof i2 == "string" ? r2 - i2.length : r2 - i2;
    return u < 1 ? " " : " ".repeat(u);
  };
}
function ze() {
  let e3 = /* @__PURE__ */ new Date(), t3 = e3.getHours(), r2 = e3.getMinutes(), n = e3.getSeconds();
  return (t3 < 10 ? `0${t3}` : t3) + M + (r2 < 10 ? `0${r2}` : r2) + M + (n < 10 ? `0${n}` : n);
}
function De(e3, { onlyFirst: t3 = false } = {}) {
  let r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"], n = e3.match(new RegExp(r2.join("|"), t3 ? void 0 : "g"));
  return n !== null ? n : false;
}
l();
var G = " ";
var Hu = "  ";
var oe = `
`;
var zu = `

`;
var be = "";
l();
function xe(e3, t3, r2) {
  return node_child_process.execFileSync(e3, t3, { encoding: "utf8", shell: r2, stdio: ["ignore", "pipe", "ignore"] }).trim();
}
function Wt(e3, t3) {
  let r2 = path2.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('syncify.js', document.baseURI).href))));
  return xe(path2.join(r2, e3), [], t3).split(/\r?\n/);
}
function j(e3, t3) {
  let r2 = Number.parseInt(e3, 10);
  return { wrap: r2 > 85 ? 85 : r2, cols: Number.parseInt(e3, 10), rows: Number.parseInt(t3, 10) };
}
function ce() {
  if (s.stdout && s.stdout.columns && s.stdout.rows) return j(s.stdout.columns, s.stdout.rows);
  if (s.stderr && s.stderr.columns && s.stderr.rows) return j(s.stderr.columns, s.stderr.rows);
  if (s.env.COLUMNS && s.env.LINES) return j(s.env.COLUMNS, s.env.LINES);
  if (s.platform === "win32") try {
    let e3 = Wt("vendor/windows/term-size.exe", false);
    if (e3.length === 2) return j(e3[0], e3[1]);
  } catch {
  }
  else {
    if (s.platform === "darwin") try {
      let e3 = Wt("vendor/macos/term-size", true);
      if (e3.length === 2) return j(e3[0], e3[1]);
    } catch {
    }
    try {
      let e3 = xe("resize", ["-u"]).match(/\d+/g);
      if (e3.length === 2) return j(e3[0], e3[1]);
    } catch {
    }
    if (s.env.TERM) try {
      let e3 = xe("tput", ["cols"]), t3 = xe("tput", ["lines"]);
      if (e3 && t3) return j(e3, t3);
    } catch {
    }
  }
  return j(80, 24);
}
l();
var o = { open: `${h.open}\u250C\u2500${h.close} `, stub: `${h.open}\u251C${h.close}  `, dash: `${h.open}\u251C\u2500${h.close} `, trim: `${h.open}\u2502${h.close}`, line: `${h.open}\u2502${h.close}  `, next: `
${h.open}\u2502${h.close}`, newline: `
${h.open}\u2502${h.close}
${h.open}\u2502${h.close}  `, after: `${h.open}\u2502${h.close}
`, wrap: `
${h.open}\u2502${h.close}
`, base: `${h.open}\u2514\u2500${h.close} `, red: `${S.dim.open}\u2502${S.dim.close}  `, redTrim: `${S.dim.open}\u2502${S.dim.close}`, redDash: `${S.dim.open}\u251C\u2500${S.dim.close} `, redStub: `${S.dim.open}\u251C${S.dim.close} `, yellow: `${T.dim.open}\u2502${T.dim.close}  `, yellowTrim: `${T.dim.open}\u2502${T.dim.close}`, yellowDash: `${T.dim.open}\u251C\u2500${T.dim.close} `, yellowStub: `${T.dim.open}\u251C${T.dim.close} `, indent: { edge: `${h.open}\u251C\u2500\u2500\u252C\u2500${h.close} `, fall: `${h.open}\u251C\u2500\u2500\u2510${h.close} `, line: `${h.open}\u2502  \u2502${h.close} `, stub: `${h.open}\u2502  \u251C${h.close} `, dash: `${h.open}\u2502  \u251C\u2500${h.close} `, base: `${h.open}\u2502  \u2514\u2500${h.close} ` } };
l();
l();
l();
var ge = {};
vr(ge, { beep: () => gn, clearScreen: () => cn, clearTerminal: () => pn, cursorBackward: () => Jr, cursorDown: () => qr, cursorForward: () => Kr, cursorGetPosition: () => Qr, cursorHide: () => rn, cursorLeft: () => Ut, cursorMove: () => Yr, cursorNextLine: () => en, cursorPrevLine: () => tn, cursorRestorePosition: () => Zr, cursorSavePosition: () => Xr, cursorShow: () => nn, cursorTo: () => Vr, cursorUp: () => Gt, enterAlternativeScreen: () => hn, eraseDown: () => on, eraseEndLine: () => sn, eraseLine: () => Ht, eraseLines: () => un, eraseScreen: () => Ve, eraseStartLine: () => Dn, eraseUp: () => ln, exitAlternativeScreen: () => fn, iTerm: () => En, image: () => Cn, link: () => dn, scrollDown: () => Fn, scrollUp: () => an });
l();
l();
var _a;
var ye = ((_a = globalThis.window) == null ? void 0 : _a.document) !== void 0;
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
var pe = (_b6 = (_a7 = globalThis.navigator) == null ? void 0 : _a7.userAgentData) == null ? void 0 : _b6.platform;
var _a8, _b7, _c, _d;
pe === "macOS" || ((_a8 = globalThis.navigator) == null ? void 0 : _a8.platform) === "MacIntel" || ((_c = (_b7 = globalThis.navigator) == null ? void 0 : _b7.userAgent) == null ? void 0 : _c.includes(" Mac ")) === true || ((_d = globalThis.process) == null ? void 0 : _d.platform) === "darwin";
var _a9, _b8;
pe === "Windows" || ((_a9 = globalThis.navigator) == null ? void 0 : _a9.platform) === "Win32" || ((_b8 = globalThis.process) == null ? void 0 : _b8.platform) === "win32";
var _a10, _b9, _c2, _d2, _e;
pe === "Linux" || ((_b9 = (_a10 = globalThis.navigator) == null ? void 0 : _a10.platform) == null ? void 0 : _b9.startsWith("Linux")) === true || ((_d2 = (_c2 = globalThis.navigator) == null ? void 0 : _c2.userAgent) == null ? void 0 : _d2.includes(" Linux ")) === true || ((_e = globalThis.process) == null ? void 0 : _e.platform) === "linux";
var _a11, _b10, _c3;
pe === "iOS" || ((_a11 = globalThis.navigator) == null ? void 0 : _a11.platform) === "MacIntel" && ((_b10 = globalThis.navigator) == null ? void 0 : _b10.maxTouchPoints) > 1 || /iPad|iPhone|iPod/.test((_c3 = globalThis.navigator) == null ? void 0 : _c3.platform);
var _a12, _b11, _c4, _d3;
pe === "Android" || ((_a12 = globalThis.navigator) == null ? void 0 : _a12.platform) === "Android" || ((_c4 = (_b11 = globalThis.navigator) == null ? void 0 : _b11.userAgent) == null ? void 0 : _c4.includes(" Android ")) === true || ((_d3 = globalThis.process) == null ? void 0 : _d3.platform) === "android";
var B = "\x1B[";
var fe = "\x1B]";
var Q = "\x07";
var he = ";";
var _t = !ye && s__default.default.env.TERM_PROGRAM === "Apple_Terminal";
var Hr = !ye && s__default.default.platform === "win32";
var zr = ye ? () => {
  throw new Error("`process.cwd()` only works in Node.js, not the browser.");
} : s__default.default.cwd;
var Vr = (e3, t3) => {
  if (typeof e3 != "number") throw new TypeError("The `x` argument is required");
  return typeof t3 != "number" ? B + (e3 + 1) + "G" : B + (t3 + 1) + he + (e3 + 1) + "H";
};
var Yr = (e3, t3) => {
  if (typeof e3 != "number") throw new TypeError("The `x` argument is required");
  let r2 = "";
  return e3 < 0 ? r2 += B + -e3 + "D" : e3 > 0 && (r2 += B + e3 + "C"), t3 < 0 ? r2 += B + -t3 + "A" : t3 > 0 && (r2 += B + t3 + "B"), r2;
};
var Gt = (e3 = 1) => B + e3 + "A";
var qr = (e3 = 1) => B + e3 + "B";
var Kr = (e3 = 1) => B + e3 + "C";
var Jr = (e3 = 1) => B + e3 + "D";
var Ut = B + "G";
var Xr = _t ? "\x1B7" : B + "s";
var Zr = _t ? "\x1B8" : B + "u";
var Qr = B + "6n";
var en = B + "E";
var tn = B + "F";
var rn = B + "?25l";
var nn = B + "?25h";
var un = (e3) => {
  let t3 = "";
  for (let r2 = 0; r2 < e3; r2++) t3 += Ht + (r2 < e3 - 1 ? Gt() : "");
  return e3 && (t3 += Ut), t3;
};
var sn = B + "K";
var Dn = B + "1K";
var Ht = B + "2K";
var on = B + "J";
var ln = B + "1J";
var Ve = B + "2J";
var an = B + "S";
var Fn = B + "T";
var cn = "\x1Bc";
var pn = Hr ? `${Ve}${B}0f` : `${Ve}${B}3J${B}H`;
var hn = B + "?1049h";
var fn = B + "?1049l";
var gn = Q;
var dn = (e3, t3) => [fe, "8", he, he, t3, Q, e3, fe, "8", he, he, Q].join("");
var Cn = (e3, t3 = {}) => {
  let r2 = `${fe}1337;File=inline=1`;
  return t3.width && (r2 += `;width=${t3.width}`), t3.height && (r2 += `;height=${t3.height}`), t3.preserveAspectRatio === false && (r2 += ";preserveAspectRatio=0"), r2 + ":" + Buffer.from(e3).toString("base64") + Q;
};
var En = { setCwd: (e3 = zr()) => `${fe}50;CurrentDir=${e3}${Q}`, annotation(e3, t3 = {}) {
  let r2 = `${fe}1337;`, n = t3.x !== void 0, i2 = t3.y !== void 0;
  if ((n || i2) && !(n && i2 && t3.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
  return e3 = e3.replaceAll("|", ""), r2 += t3.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", t3.length > 0 ? r2 += (n ? [e3, t3.length, t3.x, t3.y] : [t3.length, e3]).join("|") : r2 += e3, r2 + Q;
} };
l();
l();
l();
l();
var mn = (e3, t3, r2, n) => {
  if (r2 === "length" || r2 === "prototype" || r2 === "arguments" || r2 === "caller") return;
  let i2 = Object.getOwnPropertyDescriptor(e3, r2), u = Object.getOwnPropertyDescriptor(t3, r2);
  !Bn(i2, u) && n || Object.defineProperty(e3, r2, u);
};
var Bn = function(e3, t3) {
  return e3 === void 0 || e3.configurable || e3.writable === t3.writable && e3.enumerable === t3.enumerable && e3.configurable === t3.configurable && (e3.writable || e3.value === t3.value);
};
var An = (e3, t3) => {
  let r2 = Object.getPrototypeOf(t3);
  r2 !== Object.getPrototypeOf(e3) && Object.setPrototypeOf(e3, r2);
};
var bn = (e3, t3) => `/* Wrapped ${e3}*/
${t3}`;
var xn = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var yn = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var wn = (e3, t3, r2) => {
  let n = r2 === "" ? "" : `with ${r2.trim()}() `, i2 = bn.bind(null, n, t3.toString());
  Object.defineProperty(i2, "name", yn);
  let { writable: u, enumerable: s3, configurable: D2 } = xn;
  Object.defineProperty(e3, "toString", { value: i2, writable: u, enumerable: s3, configurable: D2 });
};
function qe(e3, t3, { ignoreNonConfigurable: r2 = false } = {}) {
  let { name: n } = e3;
  for (let i2 of Reflect.ownKeys(t3)) mn(e3, t3, i2, r2);
  return An(e3, t3), wn(e3, t3, n), e3;
}
var we = /* @__PURE__ */ new WeakMap();
var zt = (e3, t3 = {}) => {
  if (typeof e3 != "function") throw new TypeError("Expected a function");
  let r2, n = 0, i2 = e3.displayName || e3.name || "<anonymous>", u = function(...s3) {
    if (we.set(u, ++n), n === 1) r2 = e3.apply(this, s3), e3 = void 0;
    else if (t3.throw === true) throw new Error(`Function \`${i2}\` can only be called once`);
    return r2;
  };
  return qe(u, e3), we.set(u, n), u;
};
zt.callCount = (e3) => {
  if (!we.has(e3)) throw new Error(`The given function \`${e3.name}\` is not wrapped by the \`onetime\` package`);
  return we.get(e3);
};
var Vt = zt;
l();
l();
var U = [];
U.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && U.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
process.platform === "linux" && U.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
var Te = (e3) => !!e3 && typeof e3 == "object" && typeof e3.removeListener == "function" && typeof e3.emit == "function" && typeof e3.reallyExit == "function" && typeof e3.listeners == "function" && typeof e3.kill == "function" && typeof e3.pid == "number" && typeof e3.on == "function";
var Ke = Symbol.for("signal-exit emitter");
var Je = globalThis;
var Tn = Object.defineProperty.bind(Object);
var Xe = class {
  emitted = { afterExit: false, exit: false };
  listeners = { afterExit: [], exit: [] };
  count = 0;
  id = Math.random();
  constructor() {
    if (Je[Ke]) return Je[Ke];
    Tn(Je, Ke, { value: this, writable: false, enumerable: false, configurable: false });
  }
  on(t3, r2) {
    this.listeners[t3].push(r2);
  }
  removeListener(t3, r2) {
    let n = this.listeners[t3], i2 = n.indexOf(r2);
    i2 !== -1 && (i2 === 0 && n.length === 1 ? n.length = 0 : n.splice(i2, 1));
  }
  emit(t3, r2, n) {
    if (this.emitted[t3]) return false;
    this.emitted[t3] = true;
    let i2 = false;
    for (let u of this.listeners[t3]) i2 = u(r2, n) === true || i2;
    return t3 === "exit" && (i2 = this.emit("afterExit", r2, n) || i2), i2;
  }
};
var $e = class {
};
var $n = (e3) => ({ onExit(t3, r2) {
  return e3.onExit(t3, r2);
}, load() {
  return e3.load();
}, unload() {
  return e3.unload();
} });
var Ze = class extends $e {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var _s, _t2, _e2, _i2, _u, _n, _r2, _Qe_instances, D_fn, o_fn, _a13;
var Qe = (_a13 = class extends $e {
  constructor(t3) {
    super();
    __privateAdd(this, _Qe_instances);
    __privateAdd(this, _s, et.platform === "win32" ? "SIGINT" : "SIGHUP");
    __privateAdd(this, _t2, new Xe());
    __privateAdd(this, _e2);
    __privateAdd(this, _i2);
    __privateAdd(this, _u);
    __privateAdd(this, _n, {});
    __privateAdd(this, _r2, false);
    __privateSet(this, _e2, t3), __privateSet(this, _n, {});
    for (let r2 of U) __privateGet(this, _n)[r2] = () => {
      let n = __privateGet(this, _e2).listeners(r2), { count: i2 } = __privateGet(this, _t2), u = t3;
      if (typeof u.__signal_exit_emitter__ == "object" && typeof u.__signal_exit_emitter__.count == "number" && (i2 += u.__signal_exit_emitter__.count), n.length === i2) {
        this.unload();
        let s3 = __privateGet(this, _t2).emit("exit", null, r2), D2 = r2 === "SIGHUP" ? __privateGet(this, _s) : r2;
        s3 || t3.kill(t3.pid, D2);
      }
    };
    __privateSet(this, _u, t3.reallyExit), __privateSet(this, _i2, t3.emit);
  }
  onExit(t3, r2) {
    if (!Te(__privateGet(this, _e2))) return () => {
    };
    __privateGet(this, _r2) === false && this.load();
    let n = (r2 == null ? void 0 : r2.alwaysLast) ? "afterExit" : "exit";
    return __privateGet(this, _t2).on(n, t3), () => {
      __privateGet(this, _t2).removeListener(n, t3), __privateGet(this, _t2).listeners.exit.length === 0 && __privateGet(this, _t2).listeners.afterExit.length === 0 && this.unload();
    };
  }
  load() {
    if (!__privateGet(this, _r2)) {
      __privateSet(this, _r2, true), __privateGet(this, _t2).count += 1;
      for (let t3 of U) try {
        let r2 = __privateGet(this, _n)[t3];
        r2 && __privateGet(this, _e2).on(t3, r2);
      } catch {
      }
      __privateGet(this, _e2).emit = (t3, ...r2) => __privateMethod(this, _Qe_instances, o_fn).call(this, t3, ...r2), __privateGet(this, _e2).reallyExit = (t3) => __privateMethod(this, _Qe_instances, D_fn).call(this, t3);
    }
  }
  unload() {
    __privateGet(this, _r2) && (__privateSet(this, _r2, false), U.forEach((t3) => {
      let r2 = __privateGet(this, _n)[t3];
      if (!r2) throw new Error("Listener not defined for signal: " + t3);
      try {
        __privateGet(this, _e2).removeListener(t3, r2);
      } catch {
      }
    }), __privateGet(this, _e2).emit = __privateGet(this, _i2), __privateGet(this, _e2).reallyExit = __privateGet(this, _u), __privateGet(this, _t2).count -= 1);
  }
}, _s = new WeakMap(), _t2 = new WeakMap(), _e2 = new WeakMap(), _i2 = new WeakMap(), _u = new WeakMap(), _n = new WeakMap(), _r2 = new WeakMap(), _Qe_instances = new WeakSet(), D_fn = function(t3) {
  return Te(__privateGet(this, _e2)) ? (__privateGet(this, _e2).exitCode = t3 || 0, __privateGet(this, _t2).emit("exit", __privateGet(this, _e2).exitCode, null), __privateGet(this, _u).call(__privateGet(this, _e2), __privateGet(this, _e2).exitCode)) : 0;
}, o_fn = function(t3, ...r2) {
  let n = __privateGet(this, _i2);
  if (t3 === "exit" && Te(__privateGet(this, _e2))) {
    typeof r2[0] == "number" && (__privateGet(this, _e2).exitCode = r2[0]);
    let i2 = n.call(__privateGet(this, _e2), t3, ...r2);
    return __privateGet(this, _t2).emit("exit", __privateGet(this, _e2).exitCode, null), i2;
  } else return n.call(__privateGet(this, _e2), t3, ...r2);
}, _a13);
var et = globalThis.process;
var { onExit: Yt} = $n(Te(et) ? new Qe(et) : new Ze());
var qt = s__default.default.stderr.isTTY ? s__default.default.stderr : s__default.default.stdout.isTTY ? s__default.default.stdout : void 0;
var Sn = qt ? Vt(() => {
  Yt(() => {
    qt.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var Kt = Sn;
var ke = false;
var ee = {};
ee.show = (e3 = s__default.default.stderr) => {
  e3.isTTY && (ke = false, e3.write("\x1B[?25h"));
};
ee.hide = (e3 = s__default.default.stderr) => {
  e3.isTTY && (Kt(), ke = true, e3.write("\x1B[?25l"));
};
ee.toggle = (e3, t3) => {
  e3 !== void 0 && (ke = e3), ke ? ee.show(t3) : ee.hide(t3);
};
var tt = ee;
l();
l();
l();
l();
function rt({ onlyFirst: e3 = false } = {}) {
  let r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(r2, e3 ? void 0 : "g");
}
var kn = rt();
function H(e3) {
  if (typeof e3 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e3}\``);
  return e3.replace(kn, "");
}
l();
l();
function Xt(e3) {
  return e3 === 161 || e3 === 164 || e3 === 167 || e3 === 168 || e3 === 170 || e3 === 173 || e3 === 174 || e3 >= 176 && e3 <= 180 || e3 >= 182 && e3 <= 186 || e3 >= 188 && e3 <= 191 || e3 === 198 || e3 === 208 || e3 === 215 || e3 === 216 || e3 >= 222 && e3 <= 225 || e3 === 230 || e3 >= 232 && e3 <= 234 || e3 === 236 || e3 === 237 || e3 === 240 || e3 === 242 || e3 === 243 || e3 >= 247 && e3 <= 250 || e3 === 252 || e3 === 254 || e3 === 257 || e3 === 273 || e3 === 275 || e3 === 283 || e3 === 294 || e3 === 295 || e3 === 299 || e3 >= 305 && e3 <= 307 || e3 === 312 || e3 >= 319 && e3 <= 322 || e3 === 324 || e3 >= 328 && e3 <= 331 || e3 === 333 || e3 === 338 || e3 === 339 || e3 === 358 || e3 === 359 || e3 === 363 || e3 === 462 || e3 === 464 || e3 === 466 || e3 === 468 || e3 === 470 || e3 === 472 || e3 === 474 || e3 === 476 || e3 === 593 || e3 === 609 || e3 === 708 || e3 === 711 || e3 >= 713 && e3 <= 715 || e3 === 717 || e3 === 720 || e3 >= 728 && e3 <= 731 || e3 === 733 || e3 === 735 || e3 >= 768 && e3 <= 879 || e3 >= 913 && e3 <= 929 || e3 >= 931 && e3 <= 937 || e3 >= 945 && e3 <= 961 || e3 >= 963 && e3 <= 969 || e3 === 1025 || e3 >= 1040 && e3 <= 1103 || e3 === 1105 || e3 === 8208 || e3 >= 8211 && e3 <= 8214 || e3 === 8216 || e3 === 8217 || e3 === 8220 || e3 === 8221 || e3 >= 8224 && e3 <= 8226 || e3 >= 8228 && e3 <= 8231 || e3 === 8240 || e3 === 8242 || e3 === 8243 || e3 === 8245 || e3 === 8251 || e3 === 8254 || e3 === 8308 || e3 === 8319 || e3 >= 8321 && e3 <= 8324 || e3 === 8364 || e3 === 8451 || e3 === 8453 || e3 === 8457 || e3 === 8467 || e3 === 8470 || e3 === 8481 || e3 === 8482 || e3 === 8486 || e3 === 8491 || e3 === 8531 || e3 === 8532 || e3 >= 8539 && e3 <= 8542 || e3 >= 8544 && e3 <= 8555 || e3 >= 8560 && e3 <= 8569 || e3 === 8585 || e3 >= 8592 && e3 <= 8601 || e3 === 8632 || e3 === 8633 || e3 === 8658 || e3 === 8660 || e3 === 8679 || e3 === 8704 || e3 === 8706 || e3 === 8707 || e3 === 8711 || e3 === 8712 || e3 === 8715 || e3 === 8719 || e3 === 8721 || e3 === 8725 || e3 === 8730 || e3 >= 8733 && e3 <= 8736 || e3 === 8739 || e3 === 8741 || e3 >= 8743 && e3 <= 8748 || e3 === 8750 || e3 >= 8756 && e3 <= 8759 || e3 === 8764 || e3 === 8765 || e3 === 8776 || e3 === 8780 || e3 === 8786 || e3 === 8800 || e3 === 8801 || e3 >= 8804 && e3 <= 8807 || e3 === 8810 || e3 === 8811 || e3 === 8814 || e3 === 8815 || e3 === 8834 || e3 === 8835 || e3 === 8838 || e3 === 8839 || e3 === 8853 || e3 === 8857 || e3 === 8869 || e3 === 8895 || e3 === 8978 || e3 >= 9312 && e3 <= 9449 || e3 >= 9451 && e3 <= 9547 || e3 >= 9552 && e3 <= 9587 || e3 >= 9600 && e3 <= 9615 || e3 >= 9618 && e3 <= 9621 || e3 === 9632 || e3 === 9633 || e3 >= 9635 && e3 <= 9641 || e3 === 9650 || e3 === 9651 || e3 === 9654 || e3 === 9655 || e3 === 9660 || e3 === 9661 || e3 === 9664 || e3 === 9665 || e3 >= 9670 && e3 <= 9672 || e3 === 9675 || e3 >= 9678 && e3 <= 9681 || e3 >= 9698 && e3 <= 9701 || e3 === 9711 || e3 === 9733 || e3 === 9734 || e3 === 9737 || e3 === 9742 || e3 === 9743 || e3 === 9756 || e3 === 9758 || e3 === 9792 || e3 === 9794 || e3 === 9824 || e3 === 9825 || e3 >= 9827 && e3 <= 9829 || e3 >= 9831 && e3 <= 9834 || e3 === 9836 || e3 === 9837 || e3 === 9839 || e3 === 9886 || e3 === 9887 || e3 === 9919 || e3 >= 9926 && e3 <= 9933 || e3 >= 9935 && e3 <= 9939 || e3 >= 9941 && e3 <= 9953 || e3 === 9955 || e3 === 9960 || e3 === 9961 || e3 >= 9963 && e3 <= 9969 || e3 === 9972 || e3 >= 9974 && e3 <= 9977 || e3 === 9979 || e3 === 9980 || e3 === 9982 || e3 === 9983 || e3 === 10045 || e3 >= 10102 && e3 <= 10111 || e3 >= 11094 && e3 <= 11097 || e3 >= 12872 && e3 <= 12879 || e3 >= 57344 && e3 <= 63743 || e3 >= 65024 && e3 <= 65039 || e3 === 65533 || e3 >= 127232 && e3 <= 127242 || e3 >= 127248 && e3 <= 127277 || e3 >= 127280 && e3 <= 127337 || e3 >= 127344 && e3 <= 127373 || e3 === 127375 || e3 === 127376 || e3 >= 127387 && e3 <= 127404 || e3 >= 917760 && e3 <= 917999 || e3 >= 983040 && e3 <= 1048573 || e3 >= 1048576 && e3 <= 1114109;
}
function Zt(e3) {
  return e3 === 12288 || e3 >= 65281 && e3 <= 65376 || e3 >= 65504 && e3 <= 65510;
}
function Qt(e3) {
  return e3 >= 4352 && e3 <= 4447 || e3 === 8986 || e3 === 8987 || e3 === 9001 || e3 === 9002 || e3 >= 9193 && e3 <= 9196 || e3 === 9200 || e3 === 9203 || e3 === 9725 || e3 === 9726 || e3 === 9748 || e3 === 9749 || e3 >= 9776 && e3 <= 9783 || e3 >= 9800 && e3 <= 9811 || e3 === 9855 || e3 >= 9866 && e3 <= 9871 || e3 === 9875 || e3 === 9889 || e3 === 9898 || e3 === 9899 || e3 === 9917 || e3 === 9918 || e3 === 9924 || e3 === 9925 || e3 === 9934 || e3 === 9940 || e3 === 9962 || e3 === 9970 || e3 === 9971 || e3 === 9973 || e3 === 9978 || e3 === 9981 || e3 === 9989 || e3 === 9994 || e3 === 9995 || e3 === 10024 || e3 === 10060 || e3 === 10062 || e3 >= 10067 && e3 <= 10069 || e3 === 10071 || e3 >= 10133 && e3 <= 10135 || e3 === 10160 || e3 === 10175 || e3 === 11035 || e3 === 11036 || e3 === 11088 || e3 === 11093 || e3 >= 11904 && e3 <= 11929 || e3 >= 11931 && e3 <= 12019 || e3 >= 12032 && e3 <= 12245 || e3 >= 12272 && e3 <= 12287 || e3 >= 12289 && e3 <= 12350 || e3 >= 12353 && e3 <= 12438 || e3 >= 12441 && e3 <= 12543 || e3 >= 12549 && e3 <= 12591 || e3 >= 12593 && e3 <= 12686 || e3 >= 12688 && e3 <= 12773 || e3 >= 12783 && e3 <= 12830 || e3 >= 12832 && e3 <= 12871 || e3 >= 12880 && e3 <= 42124 || e3 >= 42128 && e3 <= 42182 || e3 >= 43360 && e3 <= 43388 || e3 >= 44032 && e3 <= 55203 || e3 >= 63744 && e3 <= 64255 || e3 >= 65040 && e3 <= 65049 || e3 >= 65072 && e3 <= 65106 || e3 >= 65108 && e3 <= 65126 || e3 >= 65128 && e3 <= 65131 || e3 >= 94176 && e3 <= 94180 || e3 === 94192 || e3 === 94193 || e3 >= 94208 && e3 <= 100343 || e3 >= 100352 && e3 <= 101589 || e3 >= 101631 && e3 <= 101640 || e3 >= 110576 && e3 <= 110579 || e3 >= 110581 && e3 <= 110587 || e3 === 110589 || e3 === 110590 || e3 >= 110592 && e3 <= 110882 || e3 === 110898 || e3 >= 110928 && e3 <= 110930 || e3 === 110933 || e3 >= 110948 && e3 <= 110951 || e3 >= 110960 && e3 <= 111355 || e3 >= 119552 && e3 <= 119638 || e3 >= 119648 && e3 <= 119670 || e3 === 126980 || e3 === 127183 || e3 === 127374 || e3 >= 127377 && e3 <= 127386 || e3 >= 127488 && e3 <= 127490 || e3 >= 127504 && e3 <= 127547 || e3 >= 127552 && e3 <= 127560 || e3 === 127568 || e3 === 127569 || e3 >= 127584 && e3 <= 127589 || e3 >= 127744 && e3 <= 127776 || e3 >= 127789 && e3 <= 127797 || e3 >= 127799 && e3 <= 127868 || e3 >= 127870 && e3 <= 127891 || e3 >= 127904 && e3 <= 127946 || e3 >= 127951 && e3 <= 127955 || e3 >= 127968 && e3 <= 127984 || e3 === 127988 || e3 >= 127992 && e3 <= 128062 || e3 === 128064 || e3 >= 128066 && e3 <= 128252 || e3 >= 128255 && e3 <= 128317 || e3 >= 128331 && e3 <= 128334 || e3 >= 128336 && e3 <= 128359 || e3 === 128378 || e3 === 128405 || e3 === 128406 || e3 === 128420 || e3 >= 128507 && e3 <= 128591 || e3 >= 128640 && e3 <= 128709 || e3 === 128716 || e3 >= 128720 && e3 <= 128722 || e3 >= 128725 && e3 <= 128727 || e3 >= 128732 && e3 <= 128735 || e3 === 128747 || e3 === 128748 || e3 >= 128756 && e3 <= 128764 || e3 >= 128992 && e3 <= 129003 || e3 === 129008 || e3 >= 129292 && e3 <= 129338 || e3 >= 129340 && e3 <= 129349 || e3 >= 129351 && e3 <= 129535 || e3 >= 129648 && e3 <= 129660 || e3 >= 129664 && e3 <= 129673 || e3 >= 129679 && e3 <= 129734 || e3 >= 129742 && e3 <= 129756 || e3 >= 129759 && e3 <= 129769 || e3 >= 129776 && e3 <= 129784 || e3 >= 131072 && e3 <= 196605 || e3 >= 196608 && e3 <= 262141;
}
function vn(e3) {
  if (!Number.isSafeInteger(e3)) throw new TypeError(`Expected a code point, got \`${typeof e3}\`.`);
}
function ve(e3, { ambiguousAsWide: t3 = false } = {}) {
  return vn(e3), Zt(e3) || Qt(e3) || t3 && Xt(e3) ? 2 : 1;
}
l();
var er = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var On = new Intl.Segmenter();
var Pn = new RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function z(e3, t3 = {}) {
  if (typeof e3 != "string" || e3.length === 0) return 0;
  let { ambiguousIsNarrow: r2 = true, countAnsiEscapeCodes: n = false } = t3;
  if (n || (e3 = H(e3)), e3.length === 0) return 0;
  let i2 = 0, u = { ambiguousAsWide: !r2 };
  for (let { segment: s3 } of On.segment(e3)) {
    let D2 = s3.codePointAt(0);
    if (!(D2 <= 31 || D2 >= 127 && D2 <= 159) && !(D2 >= 8203 && D2 <= 8207 || D2 === 65279) && !(D2 >= 768 && D2 <= 879 || D2 >= 6832 && D2 <= 6911 || D2 >= 7616 && D2 <= 7679 || D2 >= 8400 && D2 <= 8447 || D2 >= 65056 && D2 <= 65071) && !(D2 >= 55296 && D2 <= 57343) && !(D2 >= 65024 && D2 <= 65039) && !Pn.test(s3)) {
      if (er().test(s3)) {
        i2 += 2;
        continue;
      }
      i2 += ve(D2, u);
    }
  }
  return i2;
}
l();
var tr = (e3 = 0) => (t3) => `\x1B[${t3 + e3}m`;
var rr = (e3 = 0) => (t3) => `\x1B[${38 + e3};5;${t3}m`;
var nr = (e3 = 0) => (t3, r2, n) => `\x1B[${38 + e3};2;${t3};${r2};${n}m`;
var b = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(b.modifier);
var In = Object.keys(b.color);
var Ln = Object.keys(b.bgColor);
[...In, ...Ln];
function Rn() {
  let e3 = /* @__PURE__ */ new Map();
  for (let [t3, r2] of Object.entries(b)) {
    for (let [n, i2] of Object.entries(r2)) b[n] = { open: `\x1B[${i2[0]}m`, close: `\x1B[${i2[1]}m` }, r2[n] = b[n], e3.set(i2[0], i2[1]);
    Object.defineProperty(b, t3, { value: r2, enumerable: false });
  }
  return Object.defineProperty(b, "codes", { value: e3, enumerable: false }), b.color.close = "\x1B[39m", b.bgColor.close = "\x1B[49m", b.color.ansi = tr(), b.color.ansi256 = rr(), b.color.ansi16m = nr(), b.bgColor.ansi = tr(10), b.bgColor.ansi256 = rr(10), b.bgColor.ansi16m = nr(10), Object.defineProperties(b, { rgbToAnsi256: { value: (t3, r2, n) => t3 === r2 && r2 === n ? t3 < 8 ? 16 : t3 > 248 ? 231 : Math.round((t3 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t3 / 255 * 5) + 6 * Math.round(r2 / 255 * 5) + Math.round(n / 255 * 5), enumerable: false }, hexToRgb: { value: (t3) => {
    let r2 = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t3.toString(16));
    if (!r2) return [0, 0, 0];
    let [n] = r2;
    n.length === 3 && (n = [...n].map((u) => u + u).join(""));
    let i2 = Number.parseInt(n, 16);
    return [i2 >> 16 & 255, i2 >> 8 & 255, i2 & 255];
  }, enumerable: false }, hexToAnsi256: { value: (t3) => b.rgbToAnsi256(...b.hexToRgb(t3)), enumerable: false }, ansi256ToAnsi: { value: (t3) => {
    if (t3 < 8) return 30 + t3;
    if (t3 < 16) return 90 + (t3 - 8);
    let r2, n, i2;
    if (t3 >= 232) r2 = ((t3 - 232) * 10 + 8) / 255, n = r2, i2 = r2;
    else {
      t3 -= 16;
      let D2 = t3 % 36;
      r2 = Math.floor(t3 / 36) / 5, n = Math.floor(D2 / 6) / 5, i2 = D2 % 6 / 5;
    }
    let u = Math.max(r2, n, i2) * 2;
    if (u === 0) return 30;
    let s3 = 30 + (Math.round(i2) << 2 | Math.round(n) << 1 | Math.round(r2));
    return u === 2 && (s3 += 60), s3;
  }, enumerable: false }, rgbToAnsi: { value: (t3, r2, n) => b.ansi256ToAnsi(b.rgbToAnsi256(t3, r2, n)), enumerable: false }, hexToAnsi: { value: (t3) => b.ansi256ToAnsi(b.hexToAnsi256(t3)), enumerable: false } }), b;
}
var Nn = Rn();
var O = Nn;
var Pe = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
var Mn = 39;
var it = "\x07";
var sr = "[";
var jn = "]";
var Dr = "m";
var Oe = `${jn}8;;`;
var ir = (e3) => `${Pe.values().next().value}${sr}${e3}${Dr}`;
var ur = (e3) => `${Pe.values().next().value}${Oe}${e3}${it}`;
var Wn = (e3) => e3.split(" ").map((t3) => z(t3));
var nt = (e3, t3, r2) => {
  let n = [...t3], i2 = false, u = false, s3 = z(H(e3.at(-1)));
  for (let [D2, a2] of n.entries()) {
    let f2 = z(a2);
    if (s3 + f2 <= r2 ? e3[e3.length - 1] += a2 : (e3.push(a2), s3 = 0), Pe.has(a2) && (i2 = true, u = n.slice(D2 + 1, D2 + 1 + Oe.length).join("") === Oe), i2) {
      u ? a2 === it && (i2 = false, u = false) : a2 === Dr && (i2 = false);
      continue;
    }
    s3 += f2, s3 === r2 && D2 < n.length - 1 && (e3.push(""), s3 = 0);
  }
  !s3 && e3.at(-1).length > 0 && e3.length > 1 && (e3[e3.length - 2] += e3.pop());
};
var _n2 = (e3) => {
  let t3 = e3.split(" "), r2 = t3.length;
  for (; r2 > 0 && !(z(t3[r2 - 1]) > 0); ) r2--;
  return r2 === t3.length ? e3 : t3.slice(0, r2).join(" ") + t3.slice(r2).join("");
};
var Gn = (e3, t3, r2 = {}) => {
  if (r2.trim !== false && e3.trim() === "") return "";
  let n = "", i2, u, s3 = Wn(e3), D2 = [""];
  for (let [p2, E] of e3.split(" ").entries()) {
    r2.trim !== false && (D2[D2.length - 1] = D2.at(-1).trimStart());
    let m3 = z(D2.at(-1));
    if (p2 !== 0 && (m3 >= t3 && (r2.wordWrap === false || r2.trim === false) && (D2.push(""), m3 = 0), (m3 > 0 || r2.trim === false) && (D2[D2.length - 1] += " ", m3++)), r2.hard && s3[p2] > t3) {
      let x = t3 - m3, c = 1 + Math.floor((s3[p2] - x - 1) / t3);
      Math.floor((s3[p2] - 1) / t3) < c && D2.push(""), nt(D2, E, t3);
      continue;
    }
    if (m3 + s3[p2] > t3 && m3 > 0 && s3[p2] > 0) {
      if (r2.wordWrap === false && m3 < t3) {
        nt(D2, E, t3);
        continue;
      }
      D2.push("");
    }
    if (m3 + s3[p2] > t3 && r2.wordWrap === false) {
      nt(D2, E, t3);
      continue;
    }
    D2[D2.length - 1] += E;
  }
  r2.trim !== false && (D2 = D2.map((p2) => _n2(p2)));
  let a2 = D2.join(`
`), f2 = [...a2], g2 = 0;
  for (let [p2, E] of f2.entries()) {
    if (n += E, Pe.has(E)) {
      let { groups: x } = new RegExp(`(?:\\${sr}(?<code>\\d+)m|\\${Oe}(?<uri>.*)${it})`).exec(a2.slice(g2)) || { groups: {} };
      if (x.code !== void 0) {
        let c = Number.parseFloat(x.code);
        i2 = c === Mn ? void 0 : c;
      } else x.uri !== void 0 && (u = x.uri.length === 0 ? void 0 : x.uri);
    }
    let m3 = O.codes.get(Number(i2));
    f2[p2 + 1] === `
` ? (u && (n += ur("")), i2 && m3 && (n += ir(m3))) : E === `
` && (i2 && m3 && (n += ir(i2)), u && (n += ur(u))), g2 += E.length;
  }
  return n;
};
function L(e3, t3, r2) {
  return String(e3).normalize().replaceAll(`\r
`, `
`).split(`
`).map((n) => Gn(n, t3, r2)).join(`
`);
}
l();
l();
function ut(e3) {
  return Number.isInteger(e3) ? ve(e3) === 2 : false;
}
var Un = /* @__PURE__ */ new Set([27, 155]);
var Hn = "0".codePointAt(0);
var zn = "9".codePointAt(0);
var Dt = /* @__PURE__ */ new Set();
var st = /* @__PURE__ */ new Map();
for (let [e3, t3] of O.codes) Dt.add(O.color.ansi(t3)), st.set(O.color.ansi(e3), O.color.ansi(t3));
function Vn(e3) {
  if (Dt.has(e3)) return e3;
  if (st.has(e3)) return st.get(e3);
  e3 = e3.slice(2), e3.includes(";") && (e3 = e3[0] + "0");
  let t3 = O.codes.get(Number.parseInt(e3, 10));
  return t3 ? O.color.ansi(t3) : O.reset.open;
}
function Yn(e3) {
  for (let t3 = 0; t3 < e3.length; t3++) {
    let r2 = e3.codePointAt(t3);
    if (r2 >= Hn && r2 <= zn) return t3;
  }
  return -1;
}
function qn(e3, t3) {
  e3 = e3.slice(t3, t3 + 19);
  let r2 = Yn(e3);
  if (r2 !== -1) {
    let n = e3.indexOf("m", r2);
    return n === -1 && (n = e3.length), e3.slice(0, n + 1);
  }
}
function Kn(e3, t3 = Number.POSITIVE_INFINITY) {
  let r2 = [], n = 0, i2 = 0;
  for (; n < e3.length; ) {
    let u = e3.codePointAt(n);
    if (Un.has(u)) {
      let a2 = qn(e3, n);
      if (a2) {
        r2.push({ type: "ansi", code: a2, endCode: Vn(a2) }), n += a2.length;
        continue;
      }
    }
    let s3 = ut(u), D2 = String.fromCodePoint(u);
    if (r2.push({ type: "character", value: D2, isFullWidth: s3 }), n += D2.length, i2 += s3 ? 2 : D2.length, i2 >= t3) break;
  }
  return r2;
}
function or(e3) {
  let t3 = [];
  for (let r2 of e3) r2.code === O.reset.open ? t3 = [] : Dt.has(r2.code) ? t3 = t3.filter((n) => n.endCode !== r2.code) : (t3 = t3.filter((n) => n.endCode !== r2.endCode), t3.push(r2));
  return t3;
}
function Jn(e3) {
  return or(e3).map(({ endCode: n }) => n).reverse().join("");
}
function ot(e3, t3, r2) {
  let n = Kn(e3, r2), i2 = [], u = 0, s3 = "", D2 = false;
  for (let a2 of n) {
    a2.type === "ansi" ? (i2.push(a2), D2 && (s3 += a2.code)) : (!D2 && u >= t3 && (D2 = true, i2 = or(i2), s3 = i2.map(({ code: f2 }) => f2).join("")), D2 && (s3 += a2.value), u += a2.isFullWidth ? 2 : a2.value.length);
  }
  return s3 += Jn(i2), s3;
}
var Xn = 24;
var lt = ({ columns: e3 = 80 }) => e3;
var Zn = (e3, t3) => {
  let r2 = e3.rows ?? Xn, n = t3.split(`
`), i2 = Math.max(0, n.length - r2);
  return i2 ? ot(t3, H(n.slice(0, i2).join(`
`)).length + 1) : t3;
};
function Ie(e3, { showCursor: t3 = false } = {}) {
  let r2 = 0, n = lt(e3), i2 = "", u = () => {
    i2 = "", n = lt(e3), r2 = 0;
  }, s3 = (...D2) => {
    t3 || tt.hide();
    let a2 = Zn(e3, D2.join(" ") + `
`), f2 = lt(e3);
    a2 === i2 && n === f2 || (i2 = a2, n = f2, a2 = L(a2, f2, { trim: false, hard: true, wordWrap: false }), e3.write(ge.eraseLines(r2) + a2), r2 = a2.split(`
`).length);
  };
  return s3.clear = () => {
    e3.write(ge.eraseLines(r2)), u();
  }, s3.done = () => {
    u(), t3 || tt.show();
  }, s3;
}
var Qn = Ie(s__default.default.stdout);
var V = Qn;
Ie(s__default.default.stderr);
l();
l();
l();
function ti(e3) {
  if (typeof e3 != "string") throw new TypeError("Expected a string");
  return e3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var ar = /\s+at.*[(\s](.*)\)?/;
var Fr = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function cr(e3, { pretty: t3 = false, basePath: r2, pathFilter: n } = {}) {
  let i2 = r2 && new RegExp(`(file://)?${ti(r2.replace(/\\/g, "/"))}/?`, "g"), u = t3 ? node_os.homedir().replace(/\\/g, "/") : "";
  if (typeof e3 == "string") return e3.replace(/\\/g, "/").split(`
`).filter((s3) => {
    let D2 = s3.match(ar);
    if (D2 === null || !D2[1]) return true;
    let a2 = D2[1];
    return a2.includes(".app/Contents/Resources/electron.asar") || a2.includes(".app/Contents/Resources/default_app.asar") || a2.includes("node_modules/electron/dist/resources/electron.asar") || a2.includes("node_modules/electron/dist/resources/default_app.asar") ? false : n ? !Fr.test(a2) && n(a2) : !Fr.test(a2);
  }).filter((s3) => s3.trim() !== "").map((s3) => (i2 && (s3 = s3.replace(i2, "")), t3 && (s3 = s3.replace(ar, (D2, a2) => D2.replace(a2, a2.replace(u, "~")))), s3)).join(`
`);
}
var pr = 9;
var Le = " ";
var ri = pr + Le.length;
var ni = /\d+[μmsec]{1,3}$/;
function re(e3, ...t3) {
  let r2 = De(e3) ? _(e3).trim() : e3.trim(), n = r2.length > pr ? Le : " ".repeat(ri - r2.length), i2 = /^(error|invalid|failed|rejected)$/.test(r2) ? Tt : $t, u = r2 + Le + n + i2 + Le, s3 = t3.length;
  if (s3 > 0) {
    if (s3 === 1) return g.ws(u, t3[0]);
    if (s3 === 2) return ni.test(_(t3[1])) ? g.ws(u, t3[0], at(t3[1])) : g.ws(u, t3[0], Z, t3[1]);
    if (s3 === 3) return g.ws(u, t3[0], Z, t3[1], at(t3[2]));
    if (s3 === 4) return g.ws(u, t3[0], Z, t3[1], Z, t3[2], at(t3[3]));
  }
  return u;
}
function at(e3) {
  return e3 ? Be + " " + me.gray(e3) : "";
}
function qD(e3, t3, { spaced: r2 = false } = {}) {
  let n = r2 ? " " : "";
  switch (e3) {
    case "AN":
      return Rt + n + t3 + n + Nt;
    case "CB":
      return Ot + n + t3 + n + Pt;
    case "PR":
      return kt + n + t3 + n + vt;
    case "SB":
      return It + n + t3 + n + Lt;
  }
}
var de = /* @__PURE__ */ Object.create(null);
de.warning = T(` ${Be} Type ${$("w")} and press ${$("enter")} to view all warning/s`);
de.error = S(` ${Be} Type ${$("v")} and press ${$("enter")} to view all error/s`);
de.stack = F(`Type ${$("s")} and press ${$("enter")} to view stack trace`);
de.bulk = F(`Type ${$("i")} and press ${$("enter")} to inspect bulk file/s`);
var KD = (e3 = void 0, t3 = true) => {
  e3 === void 0 && (e3 = ce().wrap);
  let r2 = h.open + "\u251C" + "\u2500".repeat(e3 - 10) + h.close;
  return t3 ? o.trim + `
` + r2 + `
` + o.trim : r2;
};
function hr(e3, t3 = true) {
  return o.open + me.gray(t3 ? `${e3} ~ ${ze()}` : e3);
}
var fr = (...e3) => {
  let t3 = { color: null, line: o.line }, r2 = "", n;
  for (Array.isArray(e3[0]) ? (typeof e3[1] == "object" && Object.assign(t3, e3[1]), n = e3[0]) : (typeof e3[e3.length - 1] == "object" && Object.assign(t3, e3.pop()), n = e3); n.length !== 0; ) {
    let i2 = n.shift();
    if (/^\n+$/.test(i2)) {
      let u = i2.split(`
`).length - 1;
      for (let s3 = 0; s3 < u; s3++) r2 += t3.line + `
`;
    } else i2 = i2.trim(), i2.length > 0 ? r2 += t3.line + (t3.color ? t3.color(i2) : i2) + `
` : r2 += t3.line + `
`;
  }
  return r2.slice(0, -1);
};
var ne = (...e3) => {
  let t3 = { color: null, line: o.line, firstLineTree: true }, r2 = ce().wrap - 5, n, i2 = "";
  Array.isArray(e3[0]) ? (typeof e3[1] == "object" && Object.assign(t3, e3[1]), n = L(g.ws(e3[0]), r2, { hard: true }).split(`
`)) : (typeof e3[e3.length - 1] == "object" && Object.assign(t3, e3.pop()), n = L(e3.join(" "), r2, { hard: true }).split(`
`));
  for (let u = 0, s3 = n.length; u < s3; u++) {
    let D2 = n[u], a2 = u === 0 && t3.firstLineTree === false ? "" : t3.line;
    i2 += a2 + (D2.length > 0 ? t3.color ? t3.color(D2) : D2 : "") + `
`;
  }
  return i2.trimEnd();
};
var Ce = (e3) => o.trim + `
` + o.line + e3 + `
` + o.trim;
function gr(e3) {
  return o.line + e3;
}
function dr(e3) {
  return o.dash + e3;
}
function Cr(e3, t3 = true) {
  return o.base + me.gray(t3 ? `${e3} ~ ${ze()}` : e3) + `
`;
}
function Er(e3) {
  let t3 = Mt(e3.entries), r2 = Ft({ type: e3.type || "error", tree: "tree" in e3 ? e3.tree : true }).Newline();
  if (typeof e3.stack == "string") {
    let u = e3.cleanStack ? cr(e3.stack, { pretty: true }) : e3.stack;
    /TypeError/.test(u.trimStart()) && (u = u.slice(u.indexOf(`
`) + 1).replace(/^ +/gm, Z + G)), r2.Multiline(F(u)).Newline();
  }
  let n = "", i2 = "";
  "line" in e3.entries && (n = `:${typeof e3.entries.line == "number" ? e3.entries.line : _(e3.entries.line)}`), n !== "" && "column" in e3.entries && (i2 = `:${typeof e3.entries.column == "number" ? e3.entries.column : _(e3.entries.column)}`);
  for (let u in e3.entries) {
    if (e3.entries[u] === void 0) continue;
    let s3, D2 = u === "failed";
    if (typeof e3.entries[u] == "number") {
      if (isNaN(e3.entries[u])) continue;
      s3 = xt(Ae(e3.entries[u]));
    } else D2 || (s3 = Ae(e3.entries[u]));
    if (s3.length === 0) continue;
    let a2 = e3.type === "warning" ? P(u) : k(u);
    if (u === "source" || u === "output" || u === "input" || u === "file") r2.Line(`${a2}${M} ${t3(u)}${Ee(s3 + n + i2)}`, F);
    else if (D2) if (Array.isArray(e3.entries[u])) for (let f2 of e3.entries[u]) r2.Line(`${a2}${M} ${t3(u)}${Ee(f2)}`, F);
    else r2.Line(`${a2}${M} ${t3(u)}${Ee(e3.entries[u])}`, F);
    else r2.Line(`${a2}${M} ${t3(u)}${s3}`, F);
  }
  return e3.stack === true && r2.Newline().Line(de.stack), r2.toString();
}
function Re() {
  let e3, t3 = false, r2 = "", n = true, { loaders: i2 } = Re, u = { label: "", line: true, color: null, style: "spinning", action: null }, s3 = function(a2, f2) {
    let g2 = { ...u };
    typeof a2 == "object" ? g2 = Object.assign(g2, a2) : typeof a2 == "string" && (g2.label = a2, typeof f2 == "object" && (g2 = Object.assign(g2, f2))), t3 = true, n = g2.line;
    let p2, E = 0, m3, x = 0;
    g2.action !== null ? (g2.style = "arrows", p2 = "color" in g2.action ? g2.action.color : se, m3 = i2.arrows.frames, x = m3.length) : (p2 = typeof g2.color == "function" ? g2.color : bt, r2 = g2.label, m3 = i2[g2.style].frames, x = m3.length), V.done(), e3 = setInterval(() => {
      if (!t3) return;
      let c;
      if (g2.action !== null) {
        let A = $(g2.action.before) + " " + m3[E = ++E % x] + " " + g2.action.after;
        c = p2(r2 !== "" ? re(r2, A) : A);
      } else c = p2(m3[E = ++E % x] + " " + r2);
      V(g2.line ? Ce(c) : c);
    }, i2[g2.style].interval);
  };
  return s3.update = function(D2) {
    r2 = D2;
  }, s3.stop = function(D2) {
    t3 !== false && (t3 = false, D2 ? (V(n ? Ce(D2) : D2), V.done()) : V.clear(), clearInterval(e3), e3 = void 0, r2 = "");
  }, Object.defineProperty(s3, "active", { get() {
    return t3;
  } }), s3;
}
Re.loaders = { dots: { interval: 100, frames: [".", "..", "...", "...."] }, arrows: { interval: 120, frames: ["\u25B9\u25B9\u25B9\u25B9", "\u25B8\u25B9\u25B9\u25B9", "\u25B9\u25B8\u25B9\u25B9", "\u25B9\u25B9\u25B8\u25B9", "\u25B9\u25B9\u25B9\u25B8"] }, brielle: { interval: 80, frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"] }, spinning: { interval: 80, frames: ["\u25D0", "\u25D3", "\u25D1", "\u25D2"] } };
var Y = class e extends node_console.Console {
  static get stdout() {
    return s__default.default.stdout;
  }
  static get stderr() {
    return s__default.default.stderr;
  }
  static update = Ie(e.stdout);
  constructor() {
    super(e.stdout, e.stderr);
  }
  write(t3) {
    e.stdout.write(t3);
  }
  info(t3, r2 = I) {
    e.stdout.write(gr(r2(t3.trim())) + `
`);
  }
  dash(t3, r2 = I) {
    e.stdout.write(dr(r2(t3)) + `
`);
  }
  error(t3) {
    e.stderr.write(o.red + k(t3.trim()) + `
`);
  }
  warn(t3) {
    e.stderr.write(o.yellow + P(t3.trim()) + `
`);
  }
  header(t3, r2 = I) {
    return e.stdout.write(Ce(r2(t3.trim())) + `
`), this;
  }
  wrap(...t3) {
    let r2 = typeof t3[t3.length - 1] == "function" ? t3.pop() : F;
    return e.stdout.write(ne(t3, { color: r2, firstLineTree: false }) + `
`), this;
  }
  tree(t3) {
    return e.stdout.write((t3 === "red" ? o.redTrim : t3 === "yellow" ? o.yellowTrim : o.trim) + `
`), this;
  }
  break() {
    return e.stdout.write(`

`), this;
  }
};
var q = class e2 {
  static store = /* @__PURE__ */ new Map();
  spin = { active: false, index: NaN, label: be, color: yt, style: "spinning", interval: null, stopOn: "clear" };
  id = null;
  type = "info";
  track = /* @__PURE__ */ new Map();
  line;
  trim;
  dash;
  tree = { enable: true, switch: false };
  stack;
  lamdas = /* @__PURE__ */ new Map();
  writes = 0;
  data;
  get update() {
    return Y.update;
  }
  constructor(t3) {
    typeof t3 == "object" ? (this.id = "id" in t3 ? t3.id : null, this.tree.enable = "tree" in t3 ? t3.tree : true, this.type = "type" in t3 ? t3.type : "info", this.stack = "stack" in t3 ? t3.stack : [], this.tree.enable ? this.type === "error" ? (this.line = o.red, this.trim = o.redTrim, this.dash = o.redDash) : this.type === "warning" ? (this.line = o.yellow, this.trim = o.yellowTrim, this.dash = o.yellowDash) : (this.line = o.line, this.trim = o.trim, this.dash = o.dash) : (this.line = "", this.trim = "", this.dash = "")) : (this.id = null, this.line = o.line, this.trim = o.trim, this.dash = o.dash, this.stack = []);
  }
  toLog(...t3) {
    let r2 = { clear: false, color: void 0, trim: false }, n = null;
    t3.length > 0 && (t3.length === 1 ? typeof t3[0] == "function" ? n = t3[0] : Object.assign(r2, t3[0]) : (Object.assign(r2, t3[0]), n = t3[1]));
    let i2 = this.toString(r2, n);
    return this.type === "error" || this.type === "warning" ? Y.stderr.write(i2) : Y.stdout.write(i2), this;
  }
  toWrite(t3) {
    let r2 = Object.assign({ clear: false, trim: false, color: void 0, from: this.writes }, t3), n = this.toString(r2);
    return this.type === "error" || this.type === "warning" ? Y.stderr.write(n) : Y.stdout.write(n), this.writes = this.index + 1, this;
  }
  toLine(t3) {
    if (this.stack.length === 0) return "";
    this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd(), this.stack.push(`
` + this.trim);
    let r2 = g(this.stack);
    return this.stack = [], this.track.clear(), t3 ? t3(r2) : this.type === "info" ? He(r2) : this.type === "error" ? k(r2) : this.type === "warning" ? P(r2) : r2;
  }
  toUpdate(t3) {
    if (t3 === null) return this;
    let r2 = { clear: false, trim: false, update: [], ...t3 }, n = this.toString({ clear: r2.clear, trim: r2.trim });
    return this.spin.stopOn = "done", this.update(n), r2.update.length > 0 && (r2.update.includes("clear") && this.update.clear(), r2.update.includes("done") && this.update.done()), this;
  }
  toString(...t3) {
    if (this.stack.length === 0) return "";
    let r2 = { clear: true, trim: true, from: 0, color: void 0 }, n = null;
    t3.length > 0 && (t3.length === 1 ? typeof t3[0] == "function" ? n = t3[0] : Object.assign(r2, t3[0]) : (Object.assign(r2, t3[0]), n = t3[1])), r2.trim && (this.stack[this.index] = this.stack[this.index].trimEnd());
    let i2 = r2.from > 0 ? this.stack.slice(r2.from) : this.stack, u;
    if (r2.color ? u = r2.color(g(i2)) : this.type === "info" ? u = He(g(i2)) : this.type === "error" ? u = k(g(i2)) : this.type === "warning" ? u = P(g(i2)) : u = g(i2), r2.clear === true) this.Reset();
    else if (Array.isArray(r2.clear)) {
      for (let s3 of r2.clear) if (this.track.has(s3)) {
        let D2 = this.track.get(s3);
        this.stack[D2.index] = "";
      }
    } else if (typeof r2.clear == "string" && this.track.has(r2.clear)) {
      let s3 = this.track.get(r2.clear);
      this.stack[s3.index] = "";
    }
    return n === null ? u : n(u);
  }
  toStack() {
    return this.stack;
  }
  Lambda(t3, r2) {
    return typeof r2 == "function" ? this.lamdas.set(t3, r2) : this.lamdas.has(t3) && (r2 === null ? this.lamdas.delete(t3) : this.lamdas.get(t3).call(this, this)), this;
  }
  String(t3, r2) {
    return r2(this.toString(t3)), this;
  }
  True(t3, r2) {
    return t3 && r2.call(this, this), this;
  }
  False(t3, r2) {
    return t3 || r2.call(this, this), this;
  }
  Tree(t3 = this.type) {
    return this.tree.switch = this.type !== t3, t3 === "error" ? (this.line = o.red, this.trim = o.redTrim, this.dash = o.redDash) : t3 === "warning" ? (this.line = o.yellow, this.trim = o.yellowTrim, this.dash = o.yellowDash) : t3 === "nil" ? (this.line = "", this.trim = "", this.dash = "") : (this.line = o.line, this.trim = o.trim, this.dash = o.dash), this;
  }
  Each(t3, r2) {
    for (let n = 0, i2 = t3.length; n < i2; n++) r2.call(this, t3[n], n);
    return this;
  }
  Reset() {
    this.stack = [], this.track.clear(), this.writes = 0, this.id !== null && e2.store.has(this.id) && e2.store.delete(this.id);
  }
  get isEmpty() {
    return this.stack.length > 0;
  }
  get isEndline() {
    if (this.stack.length > 0) {
      let t3 = this.Get();
      return t3[t3.length - 1] === `
`;
    }
    return false;
  }
  Get(t3 = this.stack.length - 1) {
    return typeof t3 == "string" && this.track.has(t3) && (t3 = this.track.get(t3).index), this.stack[t3];
  }
  Template(...t3) {
    let r2 = t3.length === 2 ? t3[0] : null, n = Object.assign({ color: null, prefix: false, insert: false, hidden: false, id: null, label: null, message: null, dash: false, index: this.stack.length }, r2 ? t3[1] : t3[0]);
    if (typeof n.prefix == "string" && (n.label = n.prefix, n.prefix = true), r2 !== null) {
      let i2 = Array.isArray(r2) ? r2 : [r2];
      n.hidden ? (n.message = i2, this.stack.push("")) : n.prefix ? this.stack.push(re(typeof n.label == "string" ? n.label : n.id, n.color ? n.color(g(i2)) : g(i2)) + oe) : this.stack.push(fr(i2, { color: n.color, line: n.dash ? this.dash : this.line }) + oe);
    } else this.stack.push("");
    return n.id !== null && (n.index !== this.stack.length - 1 && (n.index = this.stack.length - 1), this.track.set(n.id, n)), this;
  }
  Update(t3, r2 = null, n = null) {
    let i2 = NaN, u;
    if (typeof t3 == "string" && this.track.has(t3) && (u = this.track.get(t3), i2 = u.index), isNaN(i2) || typeof this.stack[i2] != "string") return this;
    let s3 = u.hidden ? r2 === null ? [...u.message] : [""] : typeof r2 == "string" ? [r2] : Array.isArray(r2) ? r2 : [`${r2}`], D2 = s3.length > 1, a2 = [], f2 = n || u.color, { prefix: g2, insert: p2, label: E, dash: m3 } = u, x = m3 ? this.dash : this.line, c = 0;
    for (; s3.length !== 0; ) {
      let y = s3.shift();
      D2 && c > 0 && p2 === false ? a2.push(y + (f2 ? f2(y) : y)) : a2.push(f2 ? f2(y) : y), c++;
    }
    let A = g2 ? re(typeof E == "string" ? E : t3, g(a2)) : D2 ? g.nl(a2) : g(a2);
    return p2 ? this.stack.splice(i2, 1, A) : this.stack.splice(i2, 1, x + A + `
`), this;
  }
  Spinner(t3, r2) {
    if (r2 = Object.assign({ style: "spinning", color: wt, indent: 0 }, { color: this.spin.color, style: this.spin.style }, r2), this.spin.active === false) {
      this.spin.stopOn === "done" && this.update.clear();
      let n = 0;
      this.spin.style = r2.style;
      let i2 = Re.loaders[this.spin.style], u = i2.frames, s3 = u.length, D2 = G.repeat(r2.indent);
      this.spin.index = this.stack.push("") - 1, this.spin.color = r2.color, this.spin.label = t3, this.spin.active = true, this.update(this.line + F.dim("...")), this.spin.interval = setInterval(() => {
        this.spin.active && this.update(g(this.line, D2, this.spin.color(u[++n % s3] + G + this.spin.label), oe));
      }, i2.interval);
    } else this.spin.label = t3, this.spin.color = r2.color;
    return this;
  }
  Stop(t3, r2) {
    return this.spin.interval !== null && clearInterval(this.spin.interval), this.spin.active === false ? (this.update.done(), this) : (this.update.clear(), this.spin.active = false, this.spin.interval = null, this.True(this.writes > 0, () => this.Remove(this.spin.index, 1 / 0)).True(t3, () => this.Line(t3, r2)), this.spin.index = NaN, this);
  }
  Trim() {
    let t3 = this.stack[this.stack.length - 1] + `
`;
    return t3 ? ((t3 === o.line || t3 === o.trim || t3 === o.red || t3 === o.redTrim || t3 === o.yellow || t3 === o.yellowTrim) && this.Pop(), this) : this;
  }
  Remove(t3, r2 = 1) {
    let n;
    if (typeof t3 == "string") {
      if (!this.track.has(t3)) return this;
      n = this.track.get(t3).index, this.track.delete(t3);
    } else n = t3;
    if (r2 === 1 / 0) {
      this.stack.splice(n);
      for (let [i2, u] of this.track.entries()) u.index >= n && this.track.delete(i2);
      this.stack = this.stack.slice(0, n);
    } else {
      let i2;
      typeof r2 == "string" ? this.track.has(r2) ? (i2 = this.track.get(r2).index, this.track.delete(r2)) : i2 = 1 : i2 = r2, this.stack.splice(n, i2);
      for (let [u, s3] of this.track.entries()) s3.index > n && (this.track.get(u).index = s3.index - i2);
    }
    return this;
  }
  Mark(t3) {
    return this.track.set(t3, { id: t3, index: this.stack.length, label: null, prefix: false, color: void 0, insert: false, dash: false, hidden: false, message: null }), this.stack.push(""), this;
  }
  Replace(t3, r2, n) {
    let i2;
    if (typeof t3 == "string") {
      if (!this.track.has(t3)) return this;
      i2 = this.track.get(t3).index;
    } else i2 = t3;
    return this.stack[i2] && (this.stack[i2] = this.line + (n ? n(r2) : r2) + `
`), this;
  }
  Ruler(t3 = void 0, { noLines: r2 = false } = {}) {
    return t3 === void 0 && (t3 = ce().wrap), this.tree.enable ? r2 ? this.stack.push(h(`\u251C${"\u2500".repeat(t3)}`) + `
`) : this.stack.push(o.trim + `
` + h(`\u251C${"\u2500".repeat(t3)}`) + `
` + o.trim + `
`) : this.stack.push(h("\u2500".repeat(t3)) + `
`), this;
  }
  get index() {
    return this.stack.length - 1;
  }
  get newlines() {
    return this.stack.join("").split(oe).length;
  }
  get NL() {
    return this.stack.push(this.trim + `
`), this;
  }
  get BR() {
    return this.stack.push(`
`), this;
  }
  Break(t3) {
    return typeof t3 == "number" ? this.stack.push(`
`.repeat(t3)) : this.stack.push(`
`), this;
  }
  Pop(t3 = 1) {
    for (; t3-- > 0; ) this.stack.pop();
    return this;
  }
  Newline(t3, r2) {
    if (typeof t3 == "number") {
      let n = this.trim + `
`;
      r2 && this.tree.enable && (r2 === "yellow" ? n = o.yellowTrim + `
` : r2 === "red" && (n = o.redTrim + `
`));
      for (let i2 = 0; i2 < t3; i2++) this.stack.push(n);
    } else t3 === "" ? this.stack.push(`
`) : t3 === "line" ? this.stack.push(o.trim + `
`) : t3 === "yellow" ? this.stack.push((this.tree.enable ? o.yellowTrim : "") + `
`) : t3 === "red" ? this.stack.push((this.tree.enable ? o.redTrim : "") + `
`) : typeof t3 == "string" ? this.stack.push(t3 + `
`) : this.stack.push(this.trim + `
`);
    return this;
  }
  Inline(t3, ...r2) {
    let n = this.stack.length > 0 ? this.stack.length - 1 : NaN, i2 = null;
    return r2.length > 0 && (r2.length === 2 ? (n = r2[0], i2 = r2[1]) : r2.length === 1 && (typeof r2[0] == "number" ? n = r2[0] : i2 = r2[0])), n > -1 ? this.stack[n] = this.stack[n].trimEnd() + " " + (i2 ? i2(t3) : t3) + `
` : this.stack.push(this.line + (i2 ? i2(t3) : t3) + `
`), this;
  }
  Insert(t3, r2) {
    return this.stack.push(r2 ? r2(t3) : t3), this;
  }
  Line(t3, r2) {
    return this.type === "error" ? this.Error(t3, r2) : this.type === "warning" ? this.Warn(t3, r2) : (this.stack.push(this.line + (r2 ? r2(t3) : t3) + `
`), this);
  }
  Prefix(t3, ...r2) {
    let n = typeof r2[r2.length - 1] == "function" ? r2.pop() : null, i2 = n ? r2.map((s3) => n(s3)) : r2, u = re(t3, ...i2);
    return this.stack.push(this.line + u + `
`), this;
  }
  Prepend(t3, r2) {
    return this.type === "error" ? this.NL.Error(t3, r2) : this.type === "warning" ? this.NL.Warn(t3, r2) : this.NL.Line(t3, r2);
  }
  Append(t3, r2) {
    return this.type === "error" ? this.Error(t3, r2) : this.type === "warning" ? this.Warn(t3, r2) : this.Line(t3, r2), this.Newline();
  }
  Error(t3, r2) {
    return this.stack.push((this.tree.enable ? this.tree.switch ? this.line : o.red : "") + (r2 ? r2(t3) : k(t3)) + `
`), this;
  }
  Warn(t3, r2) {
    return this.stack.push((this.tree.enable ? this.tree.switch ? this.line : o.yellow : "") + (r2 ? r2(t3) : P(t3)), `
`), this;
  }
  Header(t3, r2) {
    return this.stack.push(this.trim + `
` + this.line + (r2 ? r2(t3) : t3) + `
` + this.trim + `
`), this;
  }
  Top(t3, r2 = true) {
    return this.stack.push(hr(t3, r2) + `
`), this;
  }
  End(t3, r2 = true) {
    return this.stack.push(Cr(t3, r2)), this;
  }
  Context(t3) {
    return "tree" in t3 || (t3.tree = this.line !== ""), this.stack.push(Er(t3) + `
`), this;
  }
  Dash(t3, r2) {
    return this.stack.push((this.tree.enable ? this.dash : `${St} `) + (r2 ? r2(t3) : t3) + `
`), this;
  }
  Multiline(...t3) {
    let r2 = typeof t3[0] == "string" ? t3.length === 1 ? t3[0].split(`
`) : t3 : t3[0];
    for (; r2.length !== 0; ) this.stack.push(this.line + r2.shift() + `
`);
    return this;
  }
  Unshift(t3, r2) {
    return r2 || r2 !== null && (this.type === "error" && (r2 = k), this.type === "warning" && (r2 = P)), this.stack.push(this.line + (r2 ? r2(t3) : t3) + `
`), this;
  }
  Wrap(...t3) {
    let r2 = I;
    return this.type === "error" ? r2 = k : this.type === "warning" && (r2 = P), typeof t3[0] == "string" ? (typeof t3[t3.length - 1] == "function" && (r2 = t3.pop()), this.stack.push(ne(t3, { color: r2, line: this.line }) + `
`)) : Array.isArray(t3[0]) ? (typeof t3[1] == "function" && (r2 = t3.pop()), this.stack.push(ne(t3[0], { color: r2, line: this.line }) + `
`)) : typeof t3[0] == "function" ? (r2 = t3.shift(), this.stack.push(ne(t3, { color: r2, line: this.line }) + `
`)) : Array.isArray(t3[1]) && (r2 = t3[0], this.stack.push(ne(t3[1], { color: r2, line: this.line }) + `
`)), this;
  }
};
function Ft(...e3) {
  let t3, r2;
  if (e3.length === 2 ? (t3 = e3[0], r2 = e3[1]) : e3.length === 1 && (typeof e3[0] == "string" ? t3 = e3[0] : r2 = e3[0]), t3) {
    r2 ? r2.id = t3 : r2 = { id: t3 };
    let n = new q(r2);
    return q.store.set(t3, n).get(t3);
  }
  return new q(r2);
}
function wo(e3) {
  return q.store.has(e3) ? q.store.get(e3) : Ft(e3);
}
l();
function Io(e3, t3 = {}) {
  let r2 = Object.assign({ showPercentage: true, barColor: "neonGreen", prepend: o.line, percentColor: "whiteBright", barSize: 40, clearOnComplete: false }, t3), n = 0, i2 = (p2) => typeof r2.prepend == "string" ? r2.prepend + p2 + " ".repeat(Math.max(0, r2.barSize - p2.length)) : p2 + " ".repeat(Math.max(0, r2.barSize - p2.length)), u = (p2, E = false) => (E ? "\u25B1" : "\u25B0").repeat(p2), s3 = () => {
    r2.clearOnComplete && console.clear();
  };
  return { stop: s3, increment: (p2 = 1) => {
    let E = n + p2;
    n = Math.min(E, e3), n === e3 && s3();
  }, decrement: (p2 = 1) => {
    let E = n - p2;
    n = Math.max(E, 0);
  }, render: (p2) => {
    let E = Math.round(n / e3 * r2.barSize), m3 = u(E), x = u(r2.barSize - E, true), c = ue[r2.barColor](m3) + h(x);
    return r2.showPercentage && (c += (p2 || I)(` ${String(Math.round(n / e3 * 100))}%`)), i2(c);
  }, reset: (p2) => {
    typeof p2 == "number" && (e3 = p2), n !== 0 && (n = 0);
  }, get percent() {
    return n;
  } };
}
l();
var ct = class {
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
  set x(t3) {
    this.options.xPos = t3;
  }
  get y() {
    return this.options.yPos;
  }
  set y(t3) {
    this.options.yPos = t3;
  }
  constructor(t3) {
    Object.assign(this.options, t3), this.prefix = this.options.tree ? o.line : "", this.suffix = this.options.newline ? `
` : "", this.empty = g(Array(this.width).fill(G)), typeof this.options.input == "string" ? this.content = this.options.input : (this.content = g.nl(this.options.input), this.lines = this.options.input), this.options.height = "height" in t3 ? t3.height : this.content.split(`
`).length, this.maxHeight = this.content.split(`
`).length - this.options.height - 1;
  }
  setKeypress(t3, r2) {
    return process.stdin.setRawMode(true), S2.emitKeypressEvents(process.stdin), process.stdin.on("keypress", (n, i2) => {
      if (i2.sequence === "" || i2.sequence === "" || i2.sequence === "") process.exit(0);
      else if (i2.name === "up") {
        if (this.position === 0) return;
        this.scroll(-2).print(), process.stdout.cursorTo(0, t3 + 2);
      } else if (i2.name === "down") {
        if (this.position >= r2) return;
        this.scroll(2).print(), process.stdout.cursorTo(0, t3 + 2);
      }
    });
  }
  setContent(t3) {
    return this.content = t3, this.resetLines(), this;
  }
  setPosition(t3 = {}) {
    return "x" in t3 && (this.x = t3.x), "y" in t3 && (this.y = t3.y), this.resetLines(), this;
  }
  setSize(t3) {
    return "width" in t3 && (this.options.width = t3.width), "height" in t3 && (this.options.height = t3.height), this.resetLines(), this;
  }
  setWrap(t3) {
    return typeof t3 == "boolean" ? this.options.wrap = t3 : (this.options.wrap || (this.options.wrap = true), Object.assign(this.wrap, t3)), this.options.wrap && this.resetLines(), this;
  }
  print() {
    this.lines.length === 0 && this.splitContentIntoLines(), this.clear(), process.stdout.cursorTo(this.x, this.y);
    for (let t3 = 0; t3 < this.height; t3++) {
      let r2 = this.lines[t3 + this.position];
      process.stdout.write(this.prefix + (r2 ?? this.empty) + this.suffix);
    }
    return this;
  }
  scroll(t3) {
    return this.position += t3, this;
  }
  clear() {
    process.stdout.cursorTo(this.x, this.y);
    for (let t3 = 0; t3 < this.height; t3++) process.stdout.cursorTo(this.x), process.stdout.write(this.empty + `
`);
    return this;
  }
  resetLines() {
    this.lines = [], this.position = 0;
  }
  splitContentIntoLines() {
    this.content && (this.options.wrap ? this.lines = L(this.content, this.width, this.wrap).split(`
`) : this.lines = this.content.split(`
`));
  }
};
function Go(e3) {
  return new ct(e3);
}
l();
var w = function(e3, t3, r2) {
  return De(t3) ? t3.replace(/(?:\u001b\[[;\d]+m)([\s\S]*?)(?=\u001b)/g, function(n, i2) {
    let u = i2.trim().replace(/([^a-z0-9\s]+)/g, "\\$1"), s3 = new RegExp(`(${u})`, "g");
    return n.replace(s3, (D2) => D2 === be ? D2 : D2.replace(e3, r2("$1")));
  }) : t3.replace(e3, r2("$1"));
};
w.stream = (e3) => (...t3) => {
  let r2 = e3;
  for (let n of t3) r2 = n(r2);
  return r2;
};
w.quoted = (e3, t3) => w.stream(e3)((r2) => r2.replace(/\B'(?:(?!'\B).)+'/g, t3), (r2) => r2.replace(/\B"(?:(?!"\B).)+"/g, t3));
w.url = (e3, t3) => e3.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, (r2) => {
  let n = _("$1");
  return /^(https?:\/\/|www\.)[./:0-9A-Za-z-]+$/.test(n) ? t3(n) : r2;
});
w.punctuation = (e3, t3) => w(/([|$[\]{}<>:-]+)/, e3, t3);
w.numbers = (e3, t3) => w(/([\d]+)/g, e3, t3);
w.braces = (e3, t3) => e3.replace(/[{}]+/g, (r2) => t3(r2));
w.angles = (e3, t3) => e3.replace(/[<>]+/g, (r2) => t3(r2));
w.brackets = (e3, t3) => w(/([[\]]+)/g, e3, t3);
w.pipes = (e3, t3) => e3.replace(/[|]+/g, (r2) => t3(r2));
w.colons = (e3, t3) => e3.replace(/[:]+/g, (r2) => t3(r2));
w.dash = (e3, t3) => e3.replace(/[-]+/g, (r2) => t3(r2));
w.commas = (e3, t3) => e3.replace(/[,]+/g, (r2) => t3(r2));
w.dollar = (e3, t3) => e3.replace(/[$]+/g, (r2) => t3(r2));
var p = s__default.default.platform === "linux";
var d = s__default.default.platform === "win32";
var a = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
d || a.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
p && a.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
var i = function(e3) {
  if (i.hooks.add(e3), !i.setup) {
    i.setup = true, s__default.default.once("exit", () => f());
    for (let o3 of a) try {
      s__default.default.once(o3, () => f(o3));
    } catch {
    }
  }
  return () => i.hooks.delete(e3);
};
i.hooks = /* @__PURE__ */ new Set();
i.setup = false;
i.fired = false;
i.exit = function(e3 = 0) {
  e3 > 0 && (i.hooks.clear(), s__default.default.exit(e3));
  let o3 = () => {
    i.hooks.size > 0 && i.hooks.clear(), s__default.default.exit(e3);
  }, n = [];
  i.hooks.forEach((r2) => types.isAsyncFunction(r2) ? n.push(r2()) : r2()), Promise.allSettled(n).finally(o3);
};
function f(e3) {
  if (i.fired === true) return;
  let o3 = [], n = () => {
    e3 && (d && e3 !== "SIGINT" && e3 !== "SIGTERM" && e3 !== "SIGKILL" ? s__default.default.kill(s__default.default.pid, "SIGTERM") : s__default.default.kill(s__default.default.pid, e3));
  };
  i.fired = true, i.hooks.forEach((r2) => types.isAsyncFunction(r2) ? o3.push(r2()) : r2()), Promise.allSettled(o3).finally(n);
}
var t = function(...e3) {
  let o3, n;
  if (e3.length === 3 ? [o3, n, t.code] = e3 : e3.length === 2 ? typeof e3[0] == "string" ? [o3, n] = e3 : (n = e3[0], o3 = n.name || Date.now().toString(), t.code = e3[1]) : e3.length === 1 && (n = e3[0], o3 = n.name || Date.now().toString()), n) {
    if (typeof n != "function") throw new Error("Callback must be a function");
    t.hooks.set(o3, n);
  }
  return t.setup || (t.setup = true, S2__default.default.emitKeypressEvents(s__default.default.stdin), s__default.default.stdin.isTTY && s__default.default.stdin.setRawMode(true), s__default.default.stdin.resume(), s__default.default.stdin.on("keypress", async (r2, l2) => {
    t.fired || (t.intercept.escape && l2.sequence === "\x1B" || t.intercept["ctrl+c"] && l2.sequence === "" || t.intercept["ctrl+d"] && l2.sequence === "" || t.intercept["ctrl+z"] && l2.sequence === "") && await m();
  })), o3 ? () => t.hooks.delete(o3) : () => false;
};
t.hooks = /* @__PURE__ */ new Map();
t.code = 130;
t.setup = false;
t.fired = false;
t.intercept = { escape: true, "ctrl+c": true, "ctrl+d": false, "ctrl+z": false };
t.listener = (e3) => {
  t.setup || t(), s__default.default.stdin.on("keypress", e3);
};
async function m() {
  if (t.fired) return;
  t.fired = true;
  let e3 = [];
  for (let [o3, n] of t.hooks) try {
    let r2 = n();
    (types.isAsyncFunction(n) || r2 instanceof Promise) && e3.push(r2);
  } catch (r2) {
    console.error(`Error in hook ${o3}:`, r2);
  }
  await Promise.allSettled(e3), s__default.default.exit(t.code);
}
var import_timer2 = __toESM(require_dist());
var import_timer = __toESM(require_dist());
var event = new class Event extends EventEmitter__default.default {
  id;
  /**
   * Whether or not an event is listening with the provided name
   */
  has(name2) {
    return this.listenerCount(name2) > 0;
  }
  /**
   * Changes the current event listening mode. Used for specific run-modes
   * such a bulk operations or stdin debugs.
   */
  mode(name2) {
    this.id = name2;
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

// syncify/utils/const.ts
var READ_WRITE_OWNER = 493;
var WATCH_BUFFER = 100;
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
  "stores.toml",
  "stores.yaml",
  "stores.yml"
];
var CACHE_FILES = [
  "checksum",
  "metafields",
  "pages",
  "paths",
  "maps",
  "schema",
  "sections",
  "settings",
  "templates"
];
var BASE_DIRS = [
  ["input", "source"],
  ["output", "theme"]
];
var PATH_PLUS_KEYS = [
  "blogs",
  "files",
  "metafields",
  "navigation",
  "pages",
  "policies",
  "schema"
];
var PATH_THEME_KEYS = [
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
var PATH_KEYS = [
  ...PATH_THEME_KEYS,
  ...PATH_PLUS_KEYS
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
var THEME_PATHS = [
  ["assets", "assets"],
  ["blocks", "blocks"],
  ["config", "config"],
  ["layout", "layout"],
  ["locales", "locales"],
  ["sections", "sections"],
  ["snippets", "snippets"],
  ["templates", "templates"],
  ["customers", "templates/customers"],
  ["metaobject", "templates/metaobject"]
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
  ["skeleton", "    Based on Shopify Skeleton with no feautres"],
  ["dusk", "        Stripped down bare-minimum theme structure"],
  ["dawn", "        The official Shopify slop using Syncify"],
  ["silk", "        Advanced Hybrid with SPX and mithril.js", true],
  ["hexx", "        Intermediate starting point with basics", true]
];
var STRAP_EXAMPLES = [
  ["using-paths", "       Strap with paths usage"],
  ["using-rename", "      Strap with rename usage"],
  ["using-sass", "        Strap with sass transform"],
  ["using-schema", "      Strap using Shared Schema"],
  ["using-tailwind", "    Strap using Tailwind transform"],
  ["using-typescript", "  Strap using TypeScript transform"]
];
var TIME = [
  { label: "year", seconds: 31536e3 },
  { label: "month", seconds: 2592e3 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 }
];
var REGEX_HOT_SNIPPET = /{%-?\s*render\s*['"]hot\.js['"]\s*-?%}/;
var REGEX_PATH_ESC = /[.*+?^${}()|[\]\\]/g;
var REGEX_BASE_PATH = /[/\\:]+|\.\./;

// syncify/model/defaults.ts
var defaults = () => ({
  input: "source",
  output: "theme",
  editor: null,
  paths: {
    assets: "assets/*",
    config: "config/*.json",
    layout: "layout/*.liquid",
    locales: "locales/*.json",
    templates: "templates/*",
    customers: "templates/customers/*",
    metaobject: "templates/metaobject/*",
    snippets: "snippets/**/*.liquid",
    sections: "sections/**/*.{liquid,json}",
    blocks: "blocks/*.liquid",
    files: "+/files/*",
    metafields: "+/metafields/**/*.json",
    blogs: "+/blogs/*.{html,md}",
    navigation: "+/navigation/*.json",
    policies: "+/policies/*.{html,md}",
    schema: "+/schema/*.{schema,json}",
    pages: "+/pages/*.{html,json}"
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
  static map = o2();
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
  set(name2, store) {
    const index = _Stores.map[name2];
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
  get(name2) {
    const index = _Stores.map[name2];
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
  has(name2) {
    const index = _Stores.map[name2];
    return index !== void 0 && this[index] !== void 0;
  }
};
var Targets = class _Targets extends Array {
  static raw = o2();
  static map = o2();
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
  onDefine: [],
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
    loaded: false,
    config: {
      warnings: true,
      style: "compressed",
      sourcemap: true,
      quietDeps: false,
      fatalDeprecations: [],
      functions: {},
      futureDeprecations: [],
      silenceDeprecations: [],
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

// syncify/options/utils.ts
var import_anymatch = __toESM(require_anymatch());

// packages/codeframe/dist/index.mjs
var fe2 = Object.create;
var K = Object.defineProperty;
var _e3 = Object.getOwnPropertyDescriptor;
var xe2 = Object.getOwnPropertyNames;
var ye2 = Object.getPrototypeOf;
var he2 = Object.prototype.hasOwnProperty;
var ve2 = (e3, t3) => () => (t3 || e3((t3 = { exports: {} }).exports, t3), t3.exports);
var be2 = (e3, t3, a2, s3) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let o3 of xe2(t3)) !he2.call(e3, o3) && o3 !== a2 && K(e3, o3, { get: () => t3[o3], enumerable: !(s3 = _e3(t3, o3)) || s3.enumerable });
  return e3;
};
var Se2 = (e3, t3, a2) => (a2 = e3 != null ? fe2(ye2(e3)) : {}, be2(!e3 || !e3.__esModule ? K(a2, "default", { value: e3, enumerable: true }) : a2, e3));
var re2 = ve2((We, ie) => {
  var ee2, E, $3, J, P2, X, L2, R, w3, C2, te, j2, k2, z2, q3, B2, v2, ne2, O2, W;
  z2 = /\/(?![*\/])(?:\[(?:[^\]\\\n\r\u2028\u2029]+|\\.)*\]?|[^\/[\\\n\r\u2028\u2029]+|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu;
  k2 = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y;
  E = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]+|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu;
  B2 = /(['"])(?:[^'"\\\n\r]+|(?!\1)['"]|\\(?:\r\n|[^]))*(\1)?/y;
  j2 = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y;
  v2 = /[`}](?:[^`\\$]+|\\[^]|\$(?!\{))*(`|\$\{)?/y;
  W = /[\t\v\f\ufeff\p{Zs}]+/yu;
  w3 = /\r?\n|[\r\u2028\u2029]/y;
  C2 = /\/\*(?:[^*]+|\*(?!\/))*(\*\/)?/y;
  q3 = /\/\/.*/y;
  ee2 = /^#!.*/;
  J = /[<>.:={}]|\/(?![\/*])/y;
  $3 = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu;
  P2 = /(['"])(?:[^'"]+|(?!\1)['"])*(\1)?/y;
  X = /[^<>{}]+/y;
  O2 = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/;
  ne2 = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/;
  L2 = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/;
  R = /^(?:return|throw|yield)$/;
  te = RegExp(w3.source);
  ie.exports = function* (e3, { jsx: t3 = false } = {}) {
    var a2, s3, o3, i2, r2, u, n, g2, _2, f2, x, p2, y, d2;
    for ({ length: u } = e3, i2 = 0, r2 = "", d2 = [{ tag: "JS" }], a2 = [], x = 0, p2 = false, (n = ee2.exec(e3)) && (yield { type: "HashbangComment", value: n[0] }, i2 = n[0].length); i2 < u; ) {
      switch (g2 = d2[d2.length - 1], g2.tag) {
        case "JS":
        case "JSNonExpressionParen":
        case "InterpolationInTemplate":
        case "InterpolationInJSX":
          if (e3[i2] === "/" && (O2.test(r2) || L2.test(r2)) && (z2.lastIndex = i2, n = z2.exec(e3))) {
            i2 = z2.lastIndex, r2 = n[0], p2 = true, yield { type: "RegularExpressionLiteral", value: n[0], closed: n[1] !== void 0 && n[1] !== "\\" };
            continue;
          }
          if (k2.lastIndex = i2, n = k2.exec(e3)) {
            switch (y = n[0], _2 = k2.lastIndex, f2 = y, y) {
              case "(":
                r2 === "?NonExpressionParenKeyword" && d2.push({ tag: "JSNonExpressionParen", nesting: x }), x++, p2 = false;
                break;
              case ")":
                x--, p2 = true, g2.tag === "JSNonExpressionParen" && x === g2.nesting && (d2.pop(), f2 = "?NonExpressionParenEnd", p2 = false);
                break;
              case "{":
                k2.lastIndex = 0, o3 = !ne2.test(r2) && (O2.test(r2) || L2.test(r2)), a2.push(o3), p2 = false;
                break;
              case "}":
                switch (g2.tag) {
                  case "InterpolationInTemplate":
                    if (a2.length === g2.nesting) {
                      v2.lastIndex = i2, n = v2.exec(e3), i2 = v2.lastIndex, r2 = n[0], n[1] === "${" ? (r2 = "?InterpolationInTemplate", p2 = false, yield { type: "TemplateMiddle", value: n[0] }) : (d2.pop(), p2 = true, yield { type: "TemplateTail", value: n[0], closed: n[1] === "`" });
                      continue;
                    }
                    break;
                  case "InterpolationInJSX":
                    if (a2.length === g2.nesting) {
                      d2.pop(), i2 += 1, r2 = "}", yield { type: "JSXPunctuator", value: "}" };
                      continue;
                    }
                }
                p2 = a2.pop(), f2 = p2 ? "?ExpressionBraceEnd" : "}";
                break;
              case "]":
                p2 = true;
                break;
              case "++":
              case "--":
                f2 = p2 ? "?PostfixIncDec" : "?UnaryIncDec";
                break;
              case "<":
                if (t3 && (O2.test(r2) || L2.test(r2))) {
                  d2.push({ tag: "JSXTag" }), i2 += 1, r2 = "<", yield { type: "JSXPunctuator", value: y };
                  continue;
                }
                p2 = false;
                break;
              default:
                p2 = false;
            }
            i2 = _2, r2 = f2, yield { type: "Punctuator", value: y };
            continue;
          }
          if (E.lastIndex = i2, n = E.exec(e3)) {
            switch (i2 = E.lastIndex, f2 = n[0], n[0]) {
              case "for":
              case "if":
              case "while":
              case "with":
                r2 !== "." && r2 !== "?." && (f2 = "?NonExpressionParenKeyword");
            }
            r2 = f2, p2 = !L2.test(n[0]), yield { type: n[1] === "#" ? "PrivateIdentifier" : "IdentifierName", value: n[0] };
            continue;
          }
          if (B2.lastIndex = i2, n = B2.exec(e3)) {
            i2 = B2.lastIndex, r2 = n[0], p2 = true, yield { type: "StringLiteral", value: n[0], closed: n[2] !== void 0 };
            continue;
          }
          if (j2.lastIndex = i2, n = j2.exec(e3)) {
            i2 = j2.lastIndex, r2 = n[0], p2 = true, yield { type: "NumericLiteral", value: n[0] };
            continue;
          }
          if (v2.lastIndex = i2, n = v2.exec(e3)) {
            i2 = v2.lastIndex, r2 = n[0], n[1] === "${" ? (r2 = "?InterpolationInTemplate", d2.push({ tag: "InterpolationInTemplate", nesting: a2.length }), p2 = false, yield { type: "TemplateHead", value: n[0] }) : (p2 = true, yield { type: "NoSubstitutionTemplate", value: n[0], closed: n[1] === "`" });
            continue;
          }
          break;
        case "JSXTag":
        case "JSXTagEnd":
          if (J.lastIndex = i2, n = J.exec(e3)) {
            switch (i2 = J.lastIndex, f2 = n[0], n[0]) {
              case "<":
                d2.push({ tag: "JSXTag" });
                break;
              case ">":
                d2.pop(), r2 === "/" || g2.tag === "JSXTagEnd" ? (f2 = "?JSX", p2 = true) : d2.push({ tag: "JSXChildren" });
                break;
              case "{":
                d2.push({ tag: "InterpolationInJSX", nesting: a2.length }), f2 = "?InterpolationInJSX", p2 = false;
                break;
              case "/":
                r2 === "<" && (d2.pop(), d2[d2.length - 1].tag === "JSXChildren" && d2.pop(), d2.push({ tag: "JSXTagEnd" }));
            }
            r2 = f2, yield { type: "JSXPunctuator", value: n[0] };
            continue;
          }
          if ($3.lastIndex = i2, n = $3.exec(e3)) {
            i2 = $3.lastIndex, r2 = n[0], yield { type: "JSXIdentifier", value: n[0] };
            continue;
          }
          if (P2.lastIndex = i2, n = P2.exec(e3)) {
            i2 = P2.lastIndex, r2 = n[0], yield { type: "JSXString", value: n[0], closed: n[2] !== void 0 };
            continue;
          }
          break;
        case "JSXChildren":
          if (X.lastIndex = i2, n = X.exec(e3)) {
            i2 = X.lastIndex, r2 = n[0], yield { type: "JSXText", value: n[0] };
            continue;
          }
          switch (e3[i2]) {
            case "<":
              d2.push({ tag: "JSXTag" }), i2++, r2 = "<", yield { type: "JSXPunctuator", value: "<" };
              continue;
            case "{":
              d2.push({ tag: "InterpolationInJSX", nesting: a2.length }), i2++, r2 = "?InterpolationInJSX", p2 = false, yield { type: "JSXPunctuator", value: "{" };
              continue;
          }
      }
      if (W.lastIndex = i2, n = W.exec(e3)) {
        i2 = W.lastIndex, yield { type: "WhiteSpace", value: n[0] };
        continue;
      }
      if (w3.lastIndex = i2, n = w3.exec(e3)) {
        i2 = w3.lastIndex, p2 = false, R.test(r2) && (r2 = "?NoLineTerminatorHere"), yield { type: "LineTerminatorSequence", value: n[0] };
        continue;
      }
      if (C2.lastIndex = i2, n = C2.exec(e3)) {
        i2 = C2.lastIndex, te.test(n[0]) && (p2 = false, R.test(r2) && (r2 = "?NoLineTerminatorHere")), yield { type: "MultiLineComment", value: n[0], closed: n[1] !== void 0 };
        continue;
      }
      if (q3.lastIndex = i2, n = q3.exec(e3)) {
        i2 = q3.lastIndex, p2 = false, yield { type: "SingleLineComment", value: n[0] };
        continue;
      }
      s3 = String.fromCodePoint(e3.codePointAt(i2)), i2 += s3.length, r2 = s3, p2 = false, yield { type: g2.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid", value: s3 };
    }
  };
});
var I2 = /\r\n|[\n\r\u2028\u2029]/;
var G2 = /^[()[\]{}]$/;
var Z2 = /\(line \d+\):/;
var Q2 = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
var Y2 = /* @__PURE__ */ new Set(["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"]);
var M2 = /* @__PURE__ */ new Set(["console", "break", "constructor", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"]);
var oe2 = Se2(re2());
function ke2(e3, t3) {
  return t3 && e3 === "await" || e3 === "enum" || Y2.has(e3);
}
var ae2 = function(e3) {
  if (e3.type === "IdentifierName") {
    if (M2.has(e3.value) || ke2(e3.value, true) || Q2.has(e3.value)) return "keyword";
    if (e3.value[0] !== e3.value[0].toLowerCase()) return "capitalized";
  }
  if (e3.type === "Punctuator" && G2.test(e3.value)) return "uncolored";
  if (e3.type === "Invalid" && e3.value === "@") return "punctuator";
  switch (e3.type) {
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
function we2(e3) {
  let t3 = Array.from((0, oe2.default)(e3, { jsx: true })), a2 = [], s3 = /* @__PURE__ */ new Set(), o3 = 0, i2 = false;
  for (let r2 = 0, u = t3.length; r2 < u; r2++) {
    let n = t3[r2];
    if (n.type === "RegularExpressionLiteral" && s3.has(n.value)) {
      let g2 = n.value[0], _2 = n.value.slice(1, -1), f2 = n.value[n.value.length - 1];
      a2.push({ type: "punctuator", value: g2 }), a2.push({ type: "jsx_element", value: _2 }), a2.push({ type: "punctuator", value: f2 });
    } else n.type === "TemplateHead" ? (a2.push({ type: "string", value: n.value.slice(0, -2) }), a2.push({ type: "punctuator", value: "${" })) : n.type === "TemplateMiddle" ? (a2.push({ type: "punctuator", value: "}" }), a2.push({ type: "string", value: n.value.slice(1, -2) }), a2.push({ type: "punctuator", value: "${" })) : n.type === "TemplateTail" ? (a2.push({ type: "punctuator", value: "}" }), a2.push({ type: "string", value: n.value.slice(1) })) : i2 ? (n.value === "}" || n.value === "%") && t3[r2 + 1].value === "}" ? (i2 = false, a2.push({ type: "liquid", value: n.value }), a2.push({ type: "liquid", value: t3[r2 + 1].value }), r2 = r2 + 1) : a2.push({ type: "liquid", value: n.value }) : n.type === "JSXIdentifier" ? t3[r2 - 1].value === "<" ? (a2.push({ type: "jsx_element", value: n.value }), s3.add(`/${n.value}>`)) : r2 >= 2 && t3[r2 - 2].value === "<" && t3[r2 - 1].value === "/" ? a2.push({ type: "jsx_element", value: n.value }) : a2.push({ type: ae2(n), value: n.value }) : n.value === "{" && (t3[r2 + 1].value === "{" || t3[r2 + 1].value === "%") ? (i2 = true, a2.push({ type: "liquid", value: "{" }), a2.push({ type: "liquid", value: t3[r2 + 1].value }), r2 = r2 + 1) : u >= r2 + 2 && n.type === "Punctuator" && n.value === "." && t3[r2 + 1].type === "IdentifierName" && t3[r2 + 2].type === "Punctuator" && t3[r2 + 2].value === "(" ? (a2.push({ type: "punctuator", value: n.value }, { type: "function", value: t3[r2 + 1].value }, { type: "punctuator", value: "(" }), o3 = o3 + 1, r2 = r2 + 2) : n.type === "Punctuator" && n.value === ")" && o3 > 0 ? (o3 = o3 - 1, a2.push({ type: "punctuator", value: n.value })) : a2.push({ type: ae2(n), value: n.value });
  }
  return a2;
}
function se2(e3, t3) {
  if (e3 === "") return "";
  let a2 = Te2(t3), s3 = we2(e3), o3 = "";
  for (let { type: i2, value: r2 } of s3) i2 in a2 ? o3 += g.nl(r2.split(I2).map(a2[i2])) : o3 += r2;
  return o3;
}
function Te2(e3) {
  return e3 === "json" ? { keyword: bu, capitalized: hu, liquid_open: F, liquid_close: F, jsx_element: xt, jsx_attribute: bt, jsx_identifier: mu, punctuator: xt, function: hu, number: P, string: bu, regex: wt, comment: F, invalid: S.bold, reset: me } : { keyword: bu, capitalized: hu, liquid_open: F, liquid_close: F, jsx_element: xt, jsx_attribute: bt, jsx_identifier: mu, punctuator: e3 === "markup" ? Au : F, function: hu, number: yt, string: P, regex: wt, comment: F, invalid: S.bold, reset: me };
}
function Ne2(e3, t3, a2) {
  let s3 = { column: 0, line: -1, ...e3.start }, o3 = { ...s3, ...e3.end }, { linesAbove: i2 = 2, linesBelow: r2 = 3 } = a2 || {}, u = s3.line, n = s3.column, g2 = o3.line, _2 = o3.column, f2 = Math.max(u - (i2 + 1), 0), x = Math.min(t3.length, g2 + r2);
  u === -1 && (f2 = 0), g2 === -1 && (x = t3.length);
  let p2 = g2 - u, y = {};
  if (p2) for (let d2 = 0; d2 <= p2; d2++) {
    let h2 = d2 + u;
    if (!n) y[h2] = true;
    else if (d2 === 0) {
      let S3 = t3[h2 - 1].length;
      y[h2] = [n, S3 - n + 1];
    } else if (d2 === p2) y[h2] = [0, _2];
    else {
      let S3 = t3[h2 - d2].length;
      y[h2] = [0, S3];
    }
  }
  else n === _2 ? y[u] = n ? [n, 0] : true : y[u] = [n, _2 - n];
  return { start: f2, end: x, markerLines: y };
}
function le2(e3, t3, a2) {
  let s3 = e3.split(I2), { start: o3, end: i2, markerLines: r2 } = Ne2(t3, s3, a2), u = String(i2).length, n = a2.highlight ? se2(e3, a2.language) : e3, g2 = a2.type === "error" ? o.red : a2.type === "warning" ? o.yellow : o.line, _2 = a2.type === "error" ? o.redTrim : a2.type === "warning" ? o.yellowTrim : o.trim, f2 = n.split(I2, i2).slice(o3, i2).map((x, p2) => {
    let y = o3 + 1 + p2, d2 = ` ${y}`.slice(-u), h2 = r2[y];
    if (h2) {
      let S3 = ` ${k(d2)} ${o.trim}`, H2 = "";
      if (Array.isArray(h2)) {
        let me2 = x.slice(0, Math.max(h2[0] - 1, 0)).replace(/[^\t]/g, G), ge2 = h2[1] || 1;
        H2 = g(oe, g2, G.repeat(d2.length), Tt, G, o.trim, G, me2, k("^").repeat(ge2));
      }
      return g(k("\u27A4"), S3, x.length > 0 ? ` ${x}` : "", H2);
    } else return g(Hu, gu(d2), G, o.trim, x.length > 0 ? ` ${x}` : "");
  });
  return g.nl(f2.map((x) => _2 + G + x)) + oe;
}
var ue2 = (e3) => e3.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function N(e3, t3) {
  if (!e3 || t3 < 1) return { lineNumber: -1, lineStart: -1, nextLineNumber: -1, nextLineStart: -1 };
  let a2 = (e3.match(/\n/g) || []).length + 1;
  if (t3 > a2) return { lineNumber: -1, lineStart: -1, nextLineNumber: -1, nextLineStart: -1 };
  let s3 = 0, o3 = 1, i2 = 0;
  for (; o3 < t3 && i2 < e3.length && (i2 = e3.indexOf(`
`, i2), i2 !== -1); ) s3 = i2 + 1, i2++, o3++;
  if (o3 < t3) return { lineNumber: -1, lineStart: -1, nextLineNumber: -1, nextLineStart: -1 };
  let r2 = t3, u = e3.indexOf(`
`, s3);
  return u === -1 ? u = e3.length : u++, t3 < a2 && r2++, { lineNumber: t3, lineStart: s3, nextLineNumber: r2, nextLineStart: u };
}
function Ee2(e3, t3, a2) {
  let s3 = N(e3, t3);
  if (s3.lineStart < 0 && s3.nextLineStart < 0) return null;
  let o3 = e3.slice(s3.lineStart), i2 = o3.match(a2), r2 = s3.lineStart;
  if (!i2) {
    let h2 = t3;
    for (; h2 > 1 && !i2; ) if (h2--, s3 = N(e3, h2), o3 = e3.slice(s3.lineStart), i2 = o3.match(a2), i2 && i2.index >= 0) {
      r2 = s3.lineStart;
      break;
    }
    if (!i2) return s3;
  }
  let u = i2[0], n = i2.index, g2 = r2 + n, _2 = g2 + u.length, f2 = (u.match(/\n/g) || []).length;
  if (f2 === 0) return { lineNumber: t3, lineStart: g2, nextLineNumber: t3, nextLineStart: _2, token: u };
  let p2 = (e3.slice(0, g2).match(/\n/g) || []).length + 1, y = p2 + f2;
  return { lineNumber: p2, lineStart: g2, nextLineNumber: y, nextLineStart: _2, token: u };
}
function T2(e3, t3, a2) {
  let s3 = e3 instanceof RegExp ? Ee2(t3, a2, e3) : N(t3, a2);
  if (!s3 || s3.lineStart < 0 && s3.nextLineStart < 0) return null;
  let o3 = typeof e3 == "string" ? e3 : s3.token;
  if (!o3) {
    let _2 = t3.slice(s3.lineStart, s3.nextLineStart);
    return { token: _2, range: { start: { line: s3.lineNumber, column: 1 }, ender: { line: s3.nextLineNumber, column: _2.length || 1 } } };
  }
  let i2 = N(t3, s3.lineNumber).lineStart, r2 = s3.lineStart >= i2 ? s3.lineStart - i2 + 1 : s3.lineStart - N(t3, s3.lineNumber - 1).lineStart + 1;
  if (r2 <= 0) {
    let _2 = t3.slice(s3.lineStart, s3.nextLineStart);
    return { token: _2, range: { start: { line: s3.lineNumber, column: 1 }, ender: { line: s3.nextLineNumber, column: _2.length || 1 } } };
  }
  let u = o3.includes(`
`) ? s3.nextLineNumber : s3.lineNumber, n;
  if (o3.includes(`
`)) {
    let _2 = o3.lastIndexOf(`
`);
    n = o3.slice(_2 + 1).length;
  } else n = r2 + o3.length;
  let g2 = { start: { line: s3.lineNumber, column: r2 }, ender: { line: u, column: n } };
  return { token: o3, range: g2 };
}
function ce2(e3, t3, a2) {
  for (let o3 of [/^Syntax Error in '([a-z_]+)(?:\s[a-z]+)?'/i, /^Syntax Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i, /^Syntax Error in tag '(#)'/i, /^in tag '([a-z_]+)(?:\s[a-z]+)?'/i, /^'([a-z_]+)' is not a valid delimiter for (?:[a-z_]+) tags\. use/i, /^Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i, /^'?([a-z_]+)'? tag was never closed/i, /^(For) loops require an 'in' clause/i, /^Invalid attribute in (for) loop. Valid attributes are limit and offset/i, /^'?[a-z]+'? is not a valid delimiter for '?([a-z_]+)'? tags/i, /^Unexpected outer '{%-?\s*([a-z_]+)/i, /^Unknown tag '([a-z_]+)/i, /^Tag '{%-?\s*([a-z_]+)/i]) {
    let i2 = t3.trimStart().match(o3);
    if (i2 === null) continue;
    let u = i2[1].toLowerCase().replace(/_/g, ""), n = new RegExp(`{%-?\\s*${u}[\\s\\S]*?%}`);
    return T2(n, e3, a2);
  }
  for (let o3 of [/^Variable '(.*?)' was not properly terminated with regexp/i, /^\[:[a-z_]+, ".+"\] is not a valid expression in "({{.*?}})/i, /^Expected (?:[a-z_]+) but found (?:.*?) in "(.*?)"/i, /^Tag '({{.*?}})/i]) {
    let i2 = t3.trimStart().match(o3);
    if (i2 === null) continue;
    let r2 = new RegExp(ue2(i2[1]));
    return T2(r2, e3, a2);
  }
  for (let o3 of [/^Unexpected character (?:.+?) in "([\S\s]+)/i]) {
    let i2 = t3.trimStart().match(o3);
    if (i2 !== null) if (/\n/.test(i2[2])) {
      let r2 = ue2(i2[2].slice(0, i2.indexOf(`
`)));
      return T2(r2, e3, a2);
    } else return T2(i2[2], e3, a2);
  }
  let s3 = t3.trimStart().match(/({{[\s\S]*?}}|{%[\s\S]*?%})/);
  return s3 !== null ? T2(s3[1], e3, a2) : null;
}
function V2(e3) {
  let t3 = e3;
  for (let [a2, s3] of [[/- Valid syntax: (.*?)/i, Ce2], [/'(.*?)' is not a valid delimiter for/, $e2], [/^For loops require an 'in' clause/, Je2], [/Unexpected character (.*?) in "/, Pe2], [/was not properly terminated with regexp:/, Xe2], [/\[:([a-z_]+), "(.+)"\] is not a valid expression/, je]]) a2.test(t3) && (t3 = s3(t3));
  return t3;
}
function $e2(e3) {
  let t3 = e3.match(/'(.*?)' is not a valid delimiter for ([a-z_]+) tags\. use ([a-z_]+)/i);
  return t3 === null ? e3 : g.ws(`Unterminated "${t3[2]}" tag due to an "${t3[1]}" tag name. This is not a valid ender,`, `you need to use: "${t3[3]}"`);
}
function Je2() {
  return 'The "for" loop tag requires an "in" clause operator be provided.';
}
function Pe2(e3) {
  let t3 = e3.match(/Unexpected character (\S+) in "([\S\s]*)/i);
  return t3 === null ? e3 : /\n/.test(t3[2]) ? `Unexpected character occurrence "${t3[1]}" detected` : `Unexpected character occurrence "${t3[1]}" detected in "${t3[2]}"`;
}
function Xe2(e3) {
  return /(regexp: )((?:\/\\}|\\}\/)|(?:\/\\\$|\\}\/))/.test(e3) ? e3.replace(/(')(.*?)(')/, '"$2"').replace(/regexp: /, "closing delimiter token: ").replace(/[/\\]+/g, be) : e3;
}
function D(e3) {
  return /\(line (\d+)\):/.test(e3) ? e3.replace(/\(line (\d+)\):/, "on line $1") : e3;
}
function Ce2(e3) {
  let t3 = /^in tag '([a-z_]+)(?:\s[a-z]+)?'/, a2 = e3.match(t3), s3 = a2 !== null ? `Invalid "${a2[1]}" tag,` : "An invalid or incomplete expression provided";
  if (e3.match(/- Valid syntax: (.*?)/i) === null) return a2 !== null ? e3.replace(t3, s3) : e3;
  let r2 = e3.slice(e3.indexOf("- Valid syntax:") + 15).trim().replace(/[[\]]/g, "");
  return g.ws(`${s3} likely due to a missing operator or keyword.`, `Expected syntax: {% ${r2} %}`);
}
function je(e3) {
  let t3 = e3.match(/\[:([a-z_]+), "(.+)"\] is not a valid expression in "({{.*?}})"/i);
  return t3 === null ? e3 : g.ws(`Invalid "${$(t3[2])}" (${t3[1].replace(/_/g, G)}) placement detected in liquid expression.`, `This is not a valid output tag: ${t3[3]}`);
}
function ze2(e3) {
  return w.stream(e3)((t3) => w(/(<\/?|>)/g, t3, F), (t3) => w.quoted(t3, $), (t3) => w.colons(t3, F), (t3) => w.pipes(t3, F), (t3) => w.url(t3, F), (t3) => t3.replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, bu.bold("$1")), (t3) => t3.replace(/({[{%]-?)([\s\S]*?)(-?%}})/g, (a2, s3, o3, i2) => {
    let r2 = w.stream(_(o3))((u) => w.quoted(u, fu), (u) => w.colons(u, F), (u) => w.pipes(u, F), (u) => u.replace(/(?<=\s)(=|==|!=|>=|>|<|<=|in)(?=\s)/g, gu("$1")), (u) => u.replace(/^\s*([a-z]+)(?=\s)/g, G + wt("$1")), (u) => w(/(\d+)/g, u, bt));
    return w.dash(bu(s3), F) + r2 + w.dash(bu(i2), F);
  }));
}
function qe2(e3, t3) {
  let a2 = be, s3 = be, o3 = be;
  return t3.indexOf("- Valid syntax:") > -1 ? (s3 = D(e3.replace(/(Syntax Error)/, "Syntax error")), a2 = V2(t3.trim()), o3 = g($(s3), M, zu, w.stream(a2)((r2) => w.colons(r2, F)))) : (s3 = D(e3), a2 = V2(t3.trim()), o3 = g($(s3), M, zu, a2)), { summary: s3, details: a2, message: o3 };
}
function de2(e3, t3, a2 = {}) {
  let s3 = { type: "error", language: "liquid", highlight: true, linesAbove: 2, linesBelow: 2, ...a2 }, o3 = {};
  if (Z2.test(t3)) {
    let i2 = t3.indexOf("(line") + 6, r2 = t3.indexOf("):"), u = Number(t3.slice(i2, r2)), n = r2 + 2, g2 = t3.slice(n), { summary: _2, details: f2, message: x } = qe2(t3.slice(0, n), t3.slice(n));
    o3.line = u, o3.summary = _2, o3.details = f2, o3.message = ne(ze2(x), { color: k });
    let p2 = ce2(e3, g2, u);
    p2 !== null ? (o3.hasFrame = true, o3.column = p2.range.start.column, o3.frame = U2(e3, { start: p2.range.start, language: "liquid", end: p2.range.ender, ...s3 })) : (o3.hasFrame = false, o3.column = 0, o3.frame = null);
  } else o3.hasFrame = false, o3.summary = be, o3.details = be, o3.message = ne(t3, { color: k, line: o.red }) + oe, o3.line = NaN, o3.column = NaN, o3.frame = null;
  return o3;
}
function U2(e3, t3) {
  return le2(e3, { start: t3.start, end: t3.end }, { language: "javascript", type: "error", highlight: true, linesAbove: 2, linesBelow: 2, ...t3 });
}
U2.shopify = de2;

// syncify/model/console.ts
var console2 = new Y();
var { stdout, stderr } = Y;

// syncify/cli/warnings.ts
function warn(...message) {
  forEach((line) => stderr.write(line), message);
}
var warnings = o2();
var severities = o2();
function warnOption(group) {
  if (!has(group, warnings)) warnings[group] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      warnings[group].push(P(message));
    } else {
      warnings[group].push(P(message + M + " " + $(value)));
    }
  };
}
function warnSevere(group) {
  if (!has(group, severities)) severities[group] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      severities[group].push(o.red + S(message));
    } else {
      severities[group].push(o.red + S(message + M + " " + $(value)));
    }
  };
}
warn.count = () => {
  let total = 0;
  $2.warnings.get($2.log.uri).values().forEach((stack) => total += stack.size);
  return total;
};
function messages(processor2, uri2) {
  if ($2.warnings.has(uri2)) {
    const file = $2.warnings.get(uri2);
    return file.has(processor2) ? file.get(processor2) : file.set(processor2, s2()).get(processor2);
  }
  return $2.warnings.set(uri2, m2([[processor2, s2()]])).get(uri2).get(processor2);
}
warn.schema = (file, options) => {
  const stack = messages("Shared Schema", file.input);
  const tui = Ft({ type: "warning" }).Newline().Wrap(options.message, P).Newline().Context({
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
  const text = w.url(message.replace(/\n+/g, " "), (text2) => Ee(text2));
  const tui = Ft({ type: "warning" }).Wrap(text, P);
  const location = {};
  if (options && has("span", options)) {
    if (isObject(options.span)) {
      const { span } = options;
      const source = fsExtra.readFileSync(span.url.pathname, "utf8");
      const frame = U2(source, {
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
      location.source = Be + path2.relative($2.cwd, options.span.url.pathname);
      if (/\/node_modules\//.test(span.url.pathname)) {
        location.module = bt(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
      }
    } else {
      location.input = Be + file.relative;
    }
  } else {
    location.input = Be + file.relative;
  }
  location.processor = yt("SASS Dart");
  if (options && options.deprecation) {
    location.details = "DEPRECATION WARNING";
  }
  tui.Newline().Context({
    stack: false,
    type: "warning",
    entries: {
      ...location,
      processor: yt("SASS Dart")
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
    line = o.line,
    span = null
  } = {}) {
    if (line === "red") {
      line = o.red;
    } else if (line === "yellow") {
      line = o.yellow;
    }
    if (span !== null) {
      const end = has("end", span) ? span.end : span.start + 1;
      return line + "\n" + g.nl(
        line + Fu(`${span.start - 1}`) + M,
        line + Fu(`${span.start}`) + M + code,
        line + Fu(`${end}`) + M
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
    Er({
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

// syncify/model/modules.ts
var IMPORT_MAP = o2({
  "smol-toml": "toml",
  "js-yaml": "yaml",
  "svgo": "svgo",
  "tailwindcss": "tailwind",
  "@tailwindcss/postcss": "tailwind",
  "postcss": "postcss",
  "sass-embedded": "sass",
  "clean-css": "cleancss",
  "markdown-it": "markdown",
  "adm-zip": "admzip",
  "gray-matter": "matter",
  "html-minifier-terser": "terser"
});
var $import = Object.assign(async function(name2, { as: as2 = false } = {}) {
  const id = IMPORT_MAP[name2];
  if ($import[id] !== null) return $import[id];
  try {
    const resolve3 = await import(name2);
    $import[id] = as2 ? resolve3 : resolve3.default || resolve3;
    return $import[id];
  } catch (e3) {
    $import[id] = null;
    throws(`Module import failed for ${name2}`, [
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
var File = class {
  constructor(uri2) {
    assign(this, path2.parse(uri2));
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
  forEach((line) => stderr.write(line), message);
}
error.upsert = (failed) => {
  const isWatch = $2.mode.bulk || $2.mode.push;
  const record = {};
  const errors = [];
  const write2 = Ft({ type: "error" });
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
    const issue = $2.errors.has(file) ? $2.errors.get(file) : $2.errors.set(file, []).get(file);
    for (const message of messages2) {
      const cf = U2.shopify(file.value, message);
      if (cf.hasFrame) {
        isWatch ? write2.Header(cf.summary, S.bold) : write2.Prepend(cf.summary, S.bold);
        write2.Wrap(cf.details, k).NL.Insert(cf.frame, F).Context({
          entries: {
            line: cf.line,
            column: cf.column,
            input: path2.relative($2.cwd, file.input),
            output: path2.relative($2.cwd, file.output),
            code: yt(code),
            graph: bt(graph2)
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
          write2.NL.Unshift(`Press ${qD("SB", $("e"))} to view all file errors`, F);
        }
        write2.toString((message2) => issue.push(message2));
      } else {
        context = {
          entries: {
            input: path2.relative($2.cwd, file.input),
            output: path2.relative($2.cwd, file.output),
            namespace: file.namespace,
            code: yt(code),
            graph: bt(graph2)
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
          write2.Insert(cf.message, F);
        } else {
          if (heading !== "") {
            write2.Context(context).NL.toString(issue.push);
          }
          heading = summary;
          write2.Header(summary, $).Insert(cf.message, F);
        }
      }
    }
    if (heading !== "") {
      issue.push(
        write2.Context(context).NL.toString()
      );
    }
    if (write2.isEmpty) issue.push(write2.toString());
  }
  if (isWatch === false) {
    for (const [file, messages2] of $2.errors) {
      error(messages2.shift());
      if (messages2.length > 0) $2.errors.delete(file);
      break;
    }
  }
};
error.graph = (e3) => {
  const count = e3.errors.length;
  const write2 = Ft({ type: "error" }).Header(`${count} GRAPHQL ${plur("ERROR", count)}`, $.redBright);
  for (const item of e3.errors) {
    write2.Wrap(item.message.replace(/(\s+'.*?'\s*)/g, $("$1")));
    if (has("path", item)) {
      write2.Newline();
      let indent = "";
      const max = item.path.length - 1;
      item.path.forEach((path5, i2) => {
        if (i2 !== 0) indent += "  ";
        if (max !== i2) {
          write2.Line(`${indent}${path5} ${F("{")}`, T);
        } else {
          write2.Line(`${indent}${path5}`, S.bold);
          indent = indent.slice(2);
        }
      });
      item.path.forEach((path5, i2) => {
        if (max !== i2) {
          write2.Line(`${indent}${F("}")}`);
          indent = indent.slice(2);
        }
      });
    }
    write2.Newline();
  }
  write2.Context({
    entries: {
      target: e3.target.target,
      domain: e3.target.store.domain,
      graph: yt(e3.graph)
    }
  });
  write2.NL.End($2.log.group).Break().toLog();
  i.exit(0);
};
error.request = (e3) => {
  if ($2.running) {
    log.spinner.stop();
  } else {
    log.error("Request failed", {
      suffix: e3.graph,
      notify: {
        message: `An error was thrown when attempting to interface with ${e3.target.store.domain} store.`
      }
    });
  }
  if (e3 instanceof TypeError) {
    Ft({ type: "error" }).Header("TYPE ERROR", $.redBright).Wrap(e3.message).Context({
      stack: e3.stack,
      cleanStack: true,
      entries: {
        name: e3.name,
        graph: e3.graph,
        detail: "POSSIBLY INTERNAL"
      }
    }).NL.End($2.log.group).Break().toLog();
    i.exit(0);
  } else if (e3.isGraphError) {
    return error.graph(e3);
  } else if (e3.isGraphError) {
    Ft({ type: "error" }).Header("REQUEST ERROR", $.redBright).Wrap(e3.message).Context({
      entries: {
        cause: e3.cause,
        status: e3.response.status,
        graph: e3.name
      }
    }).NL.toLog({ clear: true });
  }
};
error.toml = (file, e3) => {
  if (e3 instanceof $import.toml.TomlError) {
    const context = {
      entries: {
        location: `${e3.line}${M}${e3.column}`,
        input: file,
        cause: e3.cause,
        processor: yt("TOML")
      }
    };
    const code = e3.codeblock.replace(/\[/g, au("[")).replace(/=/g, fu("=")).replace(/("[\s\S]*")/g, P("$1")).replace(/(\d+)(:)/g, `${Fu("$1")} ${o.line}`).replace(/(\^)/, "$1 " + o.line);
    Ft({ type: "error" }).Append(`TOML Error on Line ${e3.line}`, $).Wrap(e3.message.replace(e3.codeblock, "").trim()).NL.Wrap(code).NL.Context(context).NL.toLog({ clear: true });
  }
};
error.throw = (e3, entries) => {
  const context = {
    stack: false,
    entries: { ...entries }
  };
  const message = e3.message.replace(/(OnlineStoreThemeFileReadResult)/, $("$1"));
  if (has("stack", e3)) context.stack = e3.stack;
  if (has("code", e3)) context.entries.code = e3.code;
  if (has("name", e3)) context.entries.name = e3.name;
  const tui = Ft({ type: "error" }).Line(message, k.bold).Context(context);
  if (context.stack === false) {
    i.exit(0);
  } else {
    $2.stacks.add(tui.toString());
  }
};
error.write = (message, context) => (e3) => {
  Ft({ type: "error" }).NL.Wrap(e3.message).Context({ stack: e3.stack, entries: { ...context, code: e3.code, name: e3.name, details: message } }).NL.toLog({ clear: true });
};
error.read = (details, entries) => {
  return function(e3) {
    Ft({ type: "error" }).Header("FILE ERROR").Wrap(e3.message).NL.Context({
      stack: e3.stack,
      entries: {
        code: e3.code,
        details,
        ...entries,
        name: e3.name
      }
    }).toLog({ clear: true });
  };
};
error.json = (e3, file, ...contexts) => {
  let details = "JSON Parse Error";
  let lineOffset = 0;
  let message;
  if (contexts.length > 0) {
    if (typeof contexts[0] === "string") details = contexts[0];
    if (typeof contexts[0] === "number") lineOffset = contexts[0];
    if (contexts.length > 1) {
      if (typeof contexts[1] === "string") details = contexts[1];
      if (typeof contexts[1] === "number") lineOffset = contexts[1];
    }
  }
  const frame = U2(e3.source, {
    language: "json",
    start: {
      line: e3.line + lineOffset,
      column: e3.column
    }
  });
  if (lineOffset > 0) {
    message = e3.message.replace(/(line number:?|line:?) (\d+)/i, `$1 ${e3.line + lineOffset}`).replace(/Line \d+:\s+/, "");
  } else {
    message = e3.message.replace(/Line \d+:\s+/, "");
  }
  Ft({ type: "eor" }).Prepend(details, $).Wrap(w.numbers(message, $), k).NL.Insert(frame).Context({
    entries: {
      line: e3.line + lineOffset,
      column: e3.column,
      input: isString(file) ? path2.relative($2.cwd, file) : file.relative,
      processor: yt("JSON")
    }
  }).toLog({ clear: true });
};
error.sass = (file, e3) => {
  const entries = {};
  const write2 = Ft({ type: "error" }).NL.Wrap(e3.sassMessage, S.bold).Newline();
  const { span } = e3;
  const source = node_fs.readFileSync(span.url.pathname, "utf8");
  const frame = U2(source, {
    start: {
      line: span.start.line + 1,
      column: span.start.column
    }
  });
  write2.Insert(frame);
  const uri2 = Be + path2.relative($2.cwd, span.url.pathname);
  entries.line = span.start.line + 1;
  entries.column = span.start.column;
  entries.input = Be + file.relative;
  if (entries.input !== uri2) entries.source = uri2;
  if (/\/node_modules\//.test(span.url.pathname)) {
    entries.module = bt(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
  }
  entries.cause = e3.cause;
  entries.processor = yt("SASS Dart");
  write2.NL.Context({ entries }).toLog();
};
error.terser = (file, e3) => {
  Ft({ type: "error" }).Header("Terse minification error").Wrap(e3.message, S.bold).NL.Context({
    entries: {
      input: file.input,
      cause: e3.cause,
      processor: yt("html-minifier-terser")
    }
  }).NL.toLog();
};
error.esbuild = (file, errors) => {
  if (errors.length === 0) return;
  const { length } = errors;
  const multiple = length > 1;
  const isSyncifyConfig = file.type === 19 /* Syncify */;
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
    const write2 = Ft({ type: "error" }).Template({ id: "errors" }).True(multiple, (tui) => tui.Update("errors", `${$("ERROR")} ${$(no + 1)} of ${$(length)}`)).Header(multiple ? He(file.input) : $.redBright(`${file.kind} Error`));
    if (location === null) {
      const context = { entries: {} };
      if (pluginName === "acquire") {
        context.entries.internal = "@syncify/acquire";
      } else {
        context.entries.plugin = pluginName;
      }
      context.entries.namespace = file.namespace;
      context.entries.processor = yt("ESBuild");
      if (/Require stack:\n/.test(text)) {
        text = text.replace(/Require stack:\n/, "\nRequire stack:\n");
      }
      write2.Wrap(text, k).NL.Context(context).Newline();
    } else {
      const frame = U2(file.value, {
        language: "javascript",
        highlight: true,
        start: {
          line: location.line,
          column: location.column
        }
      });
      write2.Wrap(`${text} on line ${location.line}`, k).NL.Insert(frame).Context({
        entries: {
          line: location.line,
          column: location.column,
          file: location.file,
          plugin: pluginName,
          namespace: location.namespace,
          processor: yt("ESBuild")
        }
      });
    }
    if (multiple) {
      write2.Mark("legend").Tree("info").NL.Dash(stdin.ansi.legend.e, F).NL.End(stdin.ansi.footer, false);
    }
    return write2;
  });
  if (isSyncifyConfig) {
    issues.forEach((message) => message.Newline().End("Error").toLog({ clear: true }));
    i.exit(0);
  } else if (issues.length > 1) {
    stdin.errors.listen(issues);
  } else {
    issues[0].toLog({ clear: true });
  }
};
error.postcss = (file, e3) => {
  const write2 = Ft({ type: "error" });
  const stack = [];
  const trace = cr(e3.stack, { pretty: true, basePath: $2.cwd }).split("\n");
  while (trace.length !== 0) stack.push(o.red + trace.shift());
  $2.stacks.add(stack.join("\n"));
  const frame = U2(e3.source, {
    start: {
      line: e3.line,
      column: e3.column
    },
    end: {
      line: e3.endLine,
      column: e3.endColumn
    }
  });
  write2.Insert(frame).NL.Wrap(`${e3.name}${M} ${e3.reason}`, S.bold).Context({
    stack: true,
    entries: {
      line: e3.line,
      column: e3.column,
      source: file.input,
      file: file.input === e3.file ? void 0 : e3.file,
      plugin: Fu(e3.plugin),
      processor: yt("PostCSS")
    }
  }).toLog();
};
error.acquire = (e3) => {
  Ft({ type: "error" }).Append(e3.type.toUpperCase(), $.red).True(e3.summary, (tui) => tui.Header(e3.summary, $.red)).Wrap(e3.message, k).Context({ entries: { ...e3.context } }).Tree("info").NL.End("Error").Break().toLog({ clear: true });
  i.exit(1);
};

// syncify/process/cache.ts
var import_write_file_atomic = __toESM(require_lib());
var gunzipAsync = node_util.promisify(zlib__default.default.gunzip);
var gzipAsync = node_util.promisify(zlib__default.default.gzip);
async function decode(uri2) {
  const content = await fsExtra.readFile(uri2);
  const gunzip = await gunzipAsync(content);
  return cborX.decode(gunzip);
}
function save(uri2, data) {
  return async () => {
    if ($2.mode.init === false && $2.file.project === null) {
      throws(["Project cache has not been created"]);
      return;
    }
    if (!/[/]/.test(uri2)) {
      uri2 = $2.cache.uri[uri2];
      if (!data) data = $2.cache[uri2];
    }
    const encoded = cborX.encode(data);
    const gzip = await gzipAsync(encoded);
    gzip[9] = 3;
    await (0, import_write_file_atomic.default)(uri2, gzip);
  };
}
function clearCache(id = null) {
  if (id === null) {
    for (const key of CACHE_FILES) {
      if (key === "paths") {
        if ($2.cache[key] instanceof Map) {
          $2.cache[key].clear();
          q2.cache.add(save($2.cache.uri[key], $2.cache[key]));
        }
      } else {
        if (!isEmpty($2.cache[key])) {
          $2.cache[key] = {};
          q2.cache.add(save($2.cache.uri[key], $2.cache[key]));
        }
      }
    }
    return q2.cache.onIdle();
  }
  $2.cache[id] = id === "paths" ? m2() : {};
  return q2.cache.add(save($2.cache.uri[id], $2.cache[id]));
}
function runChecksum(input, value) {
  const hash = checksum(value);
  if (has(input, $2.cache.checksum) && $2.cache.checksum[input] === hash) return true;
  $2.cache.checksum[input] = hash;
  q2.cache.add(save($2.cache.uri.checksum, $2.cache.checksum));
  return false;
}
function saveCache(id = null) {
  if (id === null) {
    for (const key of CACHE_FILES) {
      if (!isEmpty($2.cache[key])) {
        q2.cache.add(save($2.cache.uri[key], $2.cache[key]));
      }
    }
    return q2.cache.onIdle();
  } else {
    return q2.cache.add(save($2.cache.uri[id], $2.cache[id]));
  }
}
function getPageCache(domain, pageId = NaN) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (isNaN(pageId) === false) {
    if (hasPath(`${store}.${pageId}`, $2.cache.pages)) {
      return $2.cache.pages[store][pageId];
    }
    if (!has(store, $2.cache.pages)) {
      $2.cache.pages[store] = { [pageId]: {} };
    } else {
      $2.cache.pages[store][pageId] = {};
    }
    q2.cache.add(save($2.cache.uri.pages, $2.cache.pages));
    return $2.cache.pages[store][pageId];
  } else {
    if (!has(store, $2.cache.pages)) {
      $2.cache.pages[store] = {};
      q2.cache.add(save($2.cache.uri.pages, $2.cache.pages));
    }
  }
  return $2.cache.pages[store];
}
function setPageCache(domain, data) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (!has(store, $2.cache.pages)) {
    $2.cache.pages[store] = { [data.id]: data };
  } else {
    $2.cache.pages[store][data.id] = data;
  }
  q2.cache.add(save($2.cache.uri.pages, $2.cache.pages));
  return $2.cache.pages[store][data.id];
}
function setTemplateCache(domain, themeId, path5, data) {
  const store = domain.endsWith(".myshopify.com") ? domain.slice(0, domain.indexOf(".myshopify.com")).toLowerCase() : domain.toLowerCase();
  if (!has(store, $2.cache.templates)) {
    $2.cache.templates[store] = { [themeId]: { [path5]: data } };
  } else if (!has(`${themeId}`, $2.cache.templates[store])) {
    $2.cache.templates[store][themeId] = { [path5]: data };
  } else {
    $2.cache.templates[store][themeId][path5] = data;
  }
  q2.cache.add(save($2.cache.uri.templates, $2.cache.templates));
  return $2.cache.templates[store][themeId][path5];
}
function setPathCache(input, output, rename) {
  let update = 0;
  if (!has("paths", $2.cache)) $2.cache.paths = m2();
  if (rename && rename.length > 0) {
    const find = rename.find(({ match }) => match(input));
    if (!isUndefined(find)) {
      const correct = renameCorrect(input, output, find.pattern);
      output = correct.output;
      if (!$2.cache.paths.has(correct.key)) {
        $2.cache.paths.set(correct.key, input);
        update = 1;
      }
      if ($2.cache.paths.get(correct.key) !== input) {
        $2.cache.paths.set(correct.key, input);
        update = 1;
      }
    }
  } else {
    const dir = extractKeyDirName(output);
    const key = path2.join(dir, path2.basename(input));
    if (!$2.cache.paths.has(key)) {
      $2.cache.paths.set(key, input);
      update = 1;
    }
    if ($2.cache.paths.get(key) !== input) {
      $2.cache.paths.set(key, input);
      update = 1;
    }
  }
  if (!$2.cache.paths.has(input)) {
    $2.cache.paths.set(input, output);
    update = 1;
  }
  if ($2.cache.paths.get(input) !== output) {
    $2.cache.paths.set(input, output);
    update = 1;
  }
  if (!$2.cache.paths.has(output)) {
    $2.cache.paths.set(output, input);
    update = 1;
  }
  if ($2.cache.paths.get(output) !== input) {
    $2.cache.paths.set(output, input);
    update = 1;
  }
  if (update > 0) {
    return q2.cache.add(save($2.cache.uri.paths, $2.cache.paths));
  }
}
function globPath(path5) {
  return isArray(path5) ? path5.filter((uri2) => /\*/.test(uri2)) : /\*/.test(path5) ? path5 : null;
}
function lastPath(path5) {
  if (isArray(path5)) return path5.map(lastPath);
  const cleanPath = path5.endsWith(path2.sep) ? path5.slice(0, -1) : path5;
  const parts = cleanPath.split(path2.sep);
  if (parts.length <= 1) return parts[0] || "";
  const lastComponent = parts[parts.length - 1];
  const hasExtension = path2.extname(lastComponent) !== "";
  return hasExtension ? parts[parts.length - 2] : lastComponent;
}
function parentPath(path5) {
  if (isArray(path5)) return path5.map(parentPath);
  const cleanPath = path5.endsWith(path2.sep) ? path5.slice(0, -1) : path5;
  const globIndex = cleanPath.indexOf("*");
  if (globIndex !== -1) {
    const before = cleanPath.slice(0, globIndex);
    return before.includes(path2.sep) ? path2.dirname(before) : "";
  }
  return path2.dirname(cleanPath);
}
function normalPath(uri2, cwd2 = null) {
  const input = uri2.replace(REGEX_PATH_ESC, "\\$&");
  const regex = new RegExp(`^\\.?\\/?${input}\\/`);
  const source = new RegExp(`^\\.?\\/?${path2.basename(input)}\\/`);
  return function prepend(path5) {
    if (isArray(path5)) return path5.map(prepend);
    const ignore = path5.startsWith("!");
    if (ignore) path5 = path5.slice(1);
    if (regex.test(path5)) return ignore ? "!" + path5 : path5;
    if (path5.startsWith("../")) {
      throws(`Invalid path defined at${M} ${P(`"${path5}"`)}`, [
        "Paths must be relative to the input directory"
      ]);
    }
    if (cwd2 !== null) {
      const exists2 = path2.join(cwd2, path5);
      return (ignore ? "!" : "") + (exists2.startsWith(input) ? exists2 : path2.join(input, path5));
    }
    return (ignore ? "!" : "") + path2.join(input, source.test(path5) ? path5.replace(source, "") : path5);
  };
}
function basePath(cwd2) {
  const normalizedCwd = path2.normalize(cwd2);
  return function prepend(path5) {
    if (path5.includes("*")) {
      throws(`Base directory path cannot contain glob${M} ${P(`"${path5}"`)}`, [
        "Ensure that path you are resolving is correctly formed"
      ]);
    }
    if (path5 === "." || path5 === "/") return normalizedCwd + path2.sep;
    const cleanPath = path5.startsWith("./") || path5.startsWith("/") ? path5.slice(1) : path5;
    if (REGEX_BASE_PATH.test(cleanPath)) {
      throws(`Invalid directory path${M} ${P(`"${path5}"`)}`, [
        "Path must be a single directory name without subdirectories or special characters."
      ]);
    }
    const result = path2.join(normalizedCwd, cleanPath);
    return result.endsWith(path2.sep) ? result : result + path2.sep;
  };
}

// syncify/process/context.ts
function svg(file) {
  const config = $2.svg.filter((context) => {
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
  const config = $2.style.find((x) => x.watch(file.input));
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
        file.output = path2.join($2.dirs.output, file.key);
      } else {
        file.output = path2.join(parentPath(file.output), file.data.rename);
      }
    }
  } else {
    file.output = path2.join($2.dirs.output, file.key);
  }
  return file;
}
function script(file) {
  const config = $2.script.filter((config2) => config2.watch.has(file.input));
  if (config.length === 0) return file;
  defineProperty(file, "data", { get() {
    return config;
  } });
  return file;
}
function schema(parse10, file) {
  defineProperty(file, "data", { get() {
    return parse10;
  } });
  return file;
}
function section(file) {
  if ($2.paths.sections.rename.length > 0) {
    const path5 = file.input;
    const find = $2.paths.sections.rename.find(({ match }) => match(path5));
    if (isUndefined(find)) return file;
    const oldName = file.base;
    const rename = renameFileParse(file.input, find.pattern);
    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = path2.join(file.namespace, rename.base);
    file.output = path2.join(path2.dirname(file.output), rename.base);
    if ($2.mode.watch) log.rename(oldName, file.base);
  }
  return file;
}
function snippet(file) {
  if ($2.paths.snippets.rename.length > 0) {
    const path5 = file.input;
    const find = $2.paths.snippets.rename.find(({ match }) => match(path5));
    if (isUndefined(find)) return file;
    const oldName = file.base;
    const rename = renameFileParse(file.input, find.pattern);
    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = path2.join(file.namespace, rename.base);
    file.output = path2.join(path2.dirname(file.output), rename.base);
    if ($2.mode.watch) log.rename(oldName, file.base);
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
function renameFile({ name: name2, dir, ext, namespace }, rename) {
  let newName = rename;
  if (/\[dir\]/.test(newName)) newName = newName.replace(/\[dir\]/g, dir);
  if (/\[name\]/.test(newName)) newName = newName.replace(/\[name\]/g, name2);
  if (/\[file\]/.test(newName)) newName = newName.replace(/\[file\]/g, name2);
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
      input = $2.cache.paths.get(output);
      kind = getFileKind(file.ext);
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
    file.relative = input ? path2.relative($2.cwd, input) : $2.cwd;
    return file;
  };
}
function parseProcessorConfigs(path5, namespace) {
  const file = new File(path5);
  file.namespace = namespace;
  file.input = path5;
  file.relative = path2.relative($2.cwd, file.input);
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
function parsePackageJson(path5) {
  const file = new File(path5);
  file.namespace = "package" /* Package */;
  file.input = path5;
  file.type = 20 /* Package */;
  file.relative = path2.relative($2.cwd, file.input);
  file.kind = "JSON" /* JSON */;
  return file;
}
function parseSyncifyConfig(path5) {
  const file = new File(path5);
  file.namespace = "syncify" /* Syncify */;
  file.input = path5;
  file.type = 19 /* Syncify */;
  file.relative = path2.relative($2.cwd, file.input);
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
  const { paths } = $2;
  const file = new File(path5);
  const define = setFile(file, path5, $2.dirs.output);
  if (file.ext === ".liquid") {
    if (paths.sections.match(path5)) {
      return section(define("sections" /* Sections */, 5 /* Section */, "Liquid" /* Liquid */));
    } else if (paths.snippets.match(path5)) {
      return snippet(define("snippets" /* Snippets */, 4 /* Snippet */, "Liquid" /* Liquid */));
    } else if (paths.blocks.match(path5)) {
      return snippet(define("blocks" /* Blocks */, 3 /* Block */, "Liquid" /* Liquid */));
    } else if (paths.layout.match(path5)) {
      return define("layout" /* Layout */, 2 /* Layout */, "Liquid" /* Liquid */);
    } else if (paths.templates.match(path5)) {
      return define("templates" /* Templates */, 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths.customers.match(path5)) {
      return define("templates/customers" /* Customers */, 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths.metaobject.match(path5)) {
      return define("templates/metaobject" /* Metaobject */, 1 /* Template */, "Liquid" /* Liquid */);
    }
  } else if (file.ext === ".schema" && paths.schema.match(path5)) {
    return schema(parse2, define("schema" /* Schema */, 7 /* Schema */, "JSON" /* JSON */));
  } else if (file.ext === ".json") {
    if (paths.metafields.match(path5)) {
      return define("metafields" /* Metafields */, 17 /* Metafield */, "JSON" /* JSON */);
    } else if (paths.sections.match(path5)) {
      return define("sections" /* Sections */, 6 /* Group */, "JSON" /* JSON */);
    } else if (paths.templates.match(path5)) {
      return define("templates" /* Templates */, 1 /* Template */, "JSON" /* JSON */);
    } else if (paths.config.match(path5)) {
      return define("config" /* Config */, 9 /* Config */, "JSON" /* JSON */);
    } else if (paths.locales.match(path5)) {
      return define("locales" /* Locales */, 10 /* Locale */, "JSON" /* JSON */);
    } else if (paths.customers.match(path5)) {
      return define("templates/customers" /* Customers */, 1 /* Template */, "JSON" /* JSON */);
    } else if (paths.metaobject.match(path5)) {
      return define("templates/metaobject" /* Metaobject */, 8 /* Metaobject */, "JSON" /* JSON */);
    } else if (paths.schema.match(path5)) {
      return schema(parse2, define("schema" /* Schema */, 7 /* Schema */, "JSON" /* JSON */));
    }
  }
  if (paths.assets.match(path5) && !paths.assets.exclude.has(path5)) {
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

// syncify/options/utils.ts
function createPathsState() {
  const state = o2();
  for (const path5 of PATH_KEYS) {
    state[path5] = o2({
      input: null,
      root: null,
      match: null,
      config: null,
      exclude: s2(),
      rename: []
    });
  }
  return state;
}
function getResolvedPaths(filePath, hook) {
  const match = isFunction(hook) ? [] : false;
  const warn2 = warnOption("Path Resolver");
  const getUri = normalPath($2.dirs.input, $2.cwd);
  if (isArray(filePath)) {
    const paths = [];
    for (const item of filePath) {
      const uri2 = getUri(item);
      const resolved = glob__default.default.sync(uri2, {
        cwd: $2.cwd,
        absolute: true
      });
      if (match !== false) {
        const test = hook(uri2);
        if (isString(test)) {
          match.push(test);
        } else if (isArray(test)) {
          match.push(...test);
        }
      }
      if (resolved.length === 0) {
        warn2("No files can be resolved in", item);
      } else {
        paths.push(...resolved);
      }
    }
    return match === false ? paths : {
      paths,
      match: (0, import_anymatch.default)(match)
    };
  }
  if (isString(filePath)) {
    const uri2 = getUri(filePath);
    const paths = glob__default.default.sync(uri2, { cwd: $2.cwd });
    if (paths.length === 0) {
      warn2("No files can be resolved in", filePath);
    }
    if (match !== false) {
      const test = hook(uri2);
      if (isString(test)) {
        match.push(test);
      } else if (isArray(test)) {
        match.push(...test);
      }
    }
    return match === false ? paths : {
      paths,
      match: (0, import_anymatch.default)(match)
    };
  }
  throws.typeError({
    option: "uri",
    name: "uri/path",
    provided: filePath,
    expects: "string | string[]"
  });
}
function getTransform(transforms, opts) {
  if (!has("assertSnippet", opts)) opts.snippet = true;
  if (isString(transforms)) {
    const { paths, match } = getResolvedPaths(transforms, (watch) => globPath(watch));
    return opts.flatten ? paths.map((input) => ({ input, rename: path2.basename(input), snippet: false })) : { input: paths, rename: "[name].[ext]", snippet: false, match };
  } else if (isArray(transforms)) {
    if (transforms.every(isString)) {
      const { paths, match } = getResolvedPaths(transforms, globPath);
      return opts.flatten ? paths.map((input) => ({ input, rename: path2.basename(input), snippet: false })) : { input: paths, rename: "[name].[ext]", snippet: false, match };
    } else if (transforms.every(isObject)) {
      return transforms.map((option) => {
        if (!has("input", option)) {
          throws.option({
            option: "tranform",
            name: "input",
            value: option,
            expects: "{ input: string | string[] }"
          });
        }
        const { paths, match } = getResolvedPaths(option.input, globPath);
        option.match = match;
        option.input = paths[0];
        option.snippet = has("snippet", option) ? option.snippet : false;
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
      const { paths, match } = getResolvedPaths(record.input, globPath);
      if (!has("snippet", record)) {
        record.snippet = false;
      }
      if (!has("rename", record)) {
        record.rename = record.snippet ? "[name].liquid" : "[name].[ext]";
      }
      if (opts.flatten) {
        forEach((input) => config.push({ ...record, input }), paths);
      } else {
        record.input = paths;
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
          if (rename) record.rename = asset ? prop.slice(7) : prop.slice(9);
          const { paths, match } = getResolvedPaths(option, globPath);
          if (opts.flatten) {
            for (const input of paths) {
              config.push({ ...record, input });
            }
          } else {
            config.push({ ...record, input: paths, match });
          }
        } else if (isObject(option)) {
          if (!has("input", option)) {
            throws.option({
              option: "transform",
              name: prop,
              value: option,
              expects: "{ input: string | string[] }"
            });
          }
          const { paths, match } = getResolvedPaths(option.input, globPath);
          if (paths.length > 0) {
            const merge2 = rename ? { ...option, ...record, rename: asset ? prop.slice(7) : prop.slice(9) } : { ...record, ...option };
            if (opts.flatten) {
              forEach((input) => config.push({ ...merge2, input }), paths);
            } else {
              config.push({ ...merge2, input: paths, match });
            }
          }
        } else if (isArray(option)) {
          if (option.every(isString)) {
            const { paths, match } = getResolvedPaths(option, globPath);
            if (hasRenameNamespace(prop)) record.rename = path2.basename(prop);
            if (paths) {
              if (opts.flatten) {
                forEach((input) => config.push({ ...record, input }), paths);
              } else {
                config.push({ ...record, input: paths, match });
              }
            }
          } else {
            throws.typeError({
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
function getModules(pkg, name2) {
  if (has("devDependencies", pkg)) {
    if (has(name2, pkg.devDependencies)) return true;
  }
  if (has("dependencies", pkg)) {
    if (has(name2, pkg.dependencies)) return true;
  }
  if (has("peerDependencies", pkg)) {
    if (has(name2, pkg.peerDependencies)) return true;
  }
  if (has("optionalDependencies", pkg)) {
    if (has(name2, pkg.peerDependencies)) return true;
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
async function readConfigFile(filename, namespace, onRebuild) {
  try {
    const path5 = path2.join($2.dirs.config, filename);
    const file = await getConfigFilePath(path5);
    if (file !== null) {
      const config = await acquire.acquire({
        file,
        cwd: $2.cwd,
        tsconfig: false,
        type: has("type", $2.pkg) ? $2.pkg.type : "commonjs",
        onRebuild,
        onError: (errors) => {
          const p2 = parseProcessorConfigs(file, namespace);
          Ft({ type: "error" }).Append("BUILD ERROR", $).Wrap(`The ${P(p2.base)} file could not be processed.`).toLog({ clear: true });
          error.esbuild(p2, errors);
        }
      });
      return { file, config };
    }
    return null;
  } catch (e3) {
    throw error.acquire(e3);
  }
}
function hasRenameNamespace(rename) {
  return /\[(?:file|name|dir|ext)\]/.test(rename);
}
function extractKeyDirName(uri2) {
  const dir = path2.dirname(uri2).replace(/\\/g, "/");
  return dir.endsWith("templates/metaobject") ? "templates/metaobject" : dir.endsWith("templates/customers") ? "templates/customers" : lastPath(uri2);
}
function renameCorrect(input, output, pattern) {
  const dir = extractKeyDirName(output);
  const { base } = renameFileParse(input, pattern);
  return {
    key: path2.join(dir, base),
    output: path2.join(path2.dirname(output), base)
  };
}
function renameFileParse(src, pattern) {
  const dir = lastPath(src);
  const base = path2.basename(src);
  const ext = path2.extname(base);
  const file = path2.basename(base, ext);
  if (!pattern) {
    return {
      ext,
      file,
      dir,
      name: file,
      base: file + ext
    };
  }
  const name2 = pattern.replace(/\[dir\]|\[name\]|\[file\]|\.?\[ext\]/g, (match) => {
    switch (match) {
      case "[dir]":
        return dir;
      case "[name]":
        return file;
      case "[file]":
        return file;
      case "[ext]":
        return ext;
      case ".[ext]":
        return ext;
      default:
        return match;
    }
  });
  return {
    ext,
    file,
    dir,
    name: name2,
    base: name2 + ext
  };
}

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
  const wrappedPromise = new Promise((resolve3, reject) => {
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
      promise.then(resolve3, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer16 = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve3(fallback());
        } catch (error2) {
          reject(error2);
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
    const index = lowerBound(__privateGet(this, _queue), element, (a2, b2) => b2.priority - a2.priority);
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
    return new Promise((resolve3, reject) => {
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
          resolve3(result);
          this.emit("completed", result);
        } catch (error2) {
          if (error2 instanceof TimeoutError && !options.throwOnTimeout) {
            resolve3();
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
var $2 = new class Bundle {
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
  static cache = o2();
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
  version = "1.0.0-unstable.3";
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
  cmd = o2({
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
  cwd = s.cwd();
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
   * Project cache root directory base
   *
   * @example
    * '/Users/sissel/.syncify/eb4e712f2f3970b7'
    */
  root = path2.join(this.home, this.hash);
  /**
   * Base directory path references. These are fully resolved absolute URI
   * paths pointing to all base directory locations, included cached locations.
   */
  dirs = o2({
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
  file = o2({
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
  stats = o2();
  /**
   * CLI provided filters
   *
   * @default null
   */
  filters = o2();
  /**
   * Error store, holds reference to errors. Map key is {@link File}
   * and values are an array list of string error messages.
   *
   * @default Map<File, string>
   */
  errors = m2();
  /**
   * Error stack store. Used in some instances where stack-trace is
   * required and reference is to exist. Stacks are temporary.
   *
   * @default Set<string>
   */
  stacks = s2();
  /**
   * Error store, holds reference to errors
   *
   * The file uri input path - The `Map` will hold
   * process identifier and a `Set` of stack messages.
   *
   * @default
   * {}
   */
  warnings = m2();
  /**
   * Directory structure paths.
   */
  paths = createPathsState();
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
  env = o2({
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
  vc = o2({
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
  hot = o2({
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
    version: o2({
      source: null,
      remote: null,
      local: "0.6.0"
    }),
    flags: o2({
      "no-preview-bar": true,
      "no-checkout-preloads": false,
      "no-perfkit": false,
      "no-trekkie": false,
      "no-shopify-features": false,
      "no-web-pixels-manager": false
    }),
    cache: o2({
      root: null,
      snippet: null,
      layouts: []
    }),
    alive: o2({
      snippet: false,
      layouts: o2()
    })
  });
  /**
   * Log state and console references
   */
  log = o2({
    idle: false,
    group: "Syncify",
    mode: null,
    title: "",
    uri: "",
    queue: s2(),
    changes: m2()
  });
  /**
   * Bulk batch model - used when performing bulk operations in `watch` mode.
   */
  bulk = o2({
    id: null,
    group: "",
    files: 0,
    type: null,
    synced: s2()
  });
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = o2({
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
  section = o2({
    schema: null,
    shared: m2(),
    template: o2()
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
  liquid = o2({
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
  json = o2({
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
   * Returns the users package manager
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
    return ce();
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
    for (const _2 in input) return false;
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
function pm() {
  if (!s.env.npm_config_user_agent) return "?";
  const userAgent = s.env.npm_config_user_agent;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name2 = pmSpec.substring(0, separatorPos);
  return name2 === "npminstall" ? "cnpm" : name2;
}
function o2(input) {
  return input ? Object.assign(/* @__PURE__ */ Object.create(null), input) : /* @__PURE__ */ Object.create(null);
}
function s2(value) {
  return new Set(value);
}
function m2(input) {
  return new Map(input);
}
function checksum(input, outputLength = -1) {
  const hash = outputLength > -1 ? node_crypto.createHash("shake256", { outputLength }) : node_crypto.createHash("md5");
  return hash.update(input).digest("hex");
}
async function openInEditor(filePath) {
  return new Promise((resolve3, reject) => {
    try {
      const process2 = node_child_process.spawn($2.project.textEditor, [filePath], {
        stdio: "ignore",
        detached: true
      });
      process2.unref();
      resolve3(true);
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
function includes(a2, list) {
  let index = -1;
  const size = list.length;
  while (++index < size) {
    if (String(list[index]) === String(a2)) return true;
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
        for (const p2 of patch) copy = apply(isArr, copy, p2);
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
  const s3 = array.length;
  if (s3 === 0) return [];
  const a2 = [];
  let i2 = 0;
  for (; i2 < s3; i2++) {
    const v2 = cb(array[i2]);
    if (!isNil(v2)) a2.push(v2);
  }
  return a2;
}
function reduce(array, cb, model) {
  const s3 = array.length;
  if (s3 === 0) return model;
  let i2 = 0;
  for (; i2 < s3; i2++) cb(model, array[i2]);
  return model;
}
function forEach(cb, array) {
  const s3 = array.length;
  if (s3 === 0) return;
  let i2 = 0;
  for (; i2 < s3; i2++) if (cb(array[i2]) === false) break;
}
function forKeys(cb, object) {
  for (const k2 in object) if (cb(k2) === false) break;
}
function pNext() {
  return new Promise((resolve3) => isFunction(setImmediate) ? setImmediate(resolve3) : setTimeout(resolve3));
}
function delay(ms = 1e3) {
  return new Promise((resolve3) => setTimeout(resolve3, ms));
}
function eqWS(array, { prop = null, padding = 0 } = {}) {
  let size = 0;
  if (isArray(array)) {
    for (let i2 = 0, s3 = array.length; i2 < s3; i2++) {
      if (prop) {
        if (array[i2][prop].length > size) {
          size = array[i2][prop].length;
        }
      } else {
        if (array[i2].length > size) {
          size = array[i2].length;
        }
      }
    }
  } else {
    for (const item in array) {
      if (item.length > size) size = item.length;
    }
  }
  size = size + 1;
  const p2 = padding > 0 ? " ".repeat(padding) : "";
  return (string) => {
    const n = isString(string) ? size - string.length : size - string;
    const s3 = n < 1 ? " " : " ".repeat(n);
    return s3 + p2;
  };
}
function murmur(str, seed) {
  const string = new TextEncoder().encode(str);
  let s3 = string.length;
  let h2 = seed ^ s3;
  let i2 = 0;
  let k2;
  while (s3 >= 4) {
    k2 = string[i2] & 255 | (string[++i2] & 255) << 8 | (string[++i2] & 255) << 16 | (string[++i2] & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + (((k2 >>> 16) * 1540483477 & 65535) << 16);
    k2 ^= k2 >>> 24;
    k2 = (k2 & 65535) * 1540483477 + (((k2 >>> 16) * 1540483477 & 65535) << 16);
    h2 = (h2 & 65535) * 1540483477 + (((h2 >>> 16) * 1540483477 & 65535) << 16) ^ k2;
    s3 -= 4;
    ++i2;
  }
  if (s3 === 3) h2 ^= (string[i2 + 2] & 255) << 16;
  if (s3 === 2) h2 ^= (string[i2 + 1] & 255) << 8;
  if (s3 === 1) {
    h2 ^= string[i2] & 255;
    h2 = (h2 & 65535) * 1540483477 + (((h2 >>> 16) * 1540483477 & 65535) << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = (h2 & 65535) * 1540483477 + (((h2 >>> 16) * 1540483477 & 65535) << 16);
  h2 ^= h2 >>> 15;
  return h2 >>> 0;
}
function uuid() {
  return Math.random().toString(36).slice(2);
}
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
function toPascalCase(string) {
  return string.replace(/[^a-zA-Z0-9_:]+(.)/g, (_2, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
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
  const b2 = number % 100;
  return number + (a2 === 1 && b2 !== 11 ? "st" : a2 === 2 && b2 !== 12 ? "nd" : a2 === 3 && b2 !== 13 ? "rd" : "th");
}
function stringSize(value) {
  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}
function byteSize(string) {
  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;
}
function byteConvert(bytes) {
  if (bytes === 0) return `${$("0")}b`;
  const size = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
  return size === 0 ? `${$(`${bytes}`)}${UNITS[size]}` : `${$((bytes / 1024 ** size).toFixed(1))}${UNITS[size]}`;
}
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
function getFuture(months) {
  const current = new Date(Date.now());
  current.setMonth(current.getMonth() + months);
  const d2 = current.getDate();
  current.setDate(1);
  current.setDate(Math.min(d2, new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()));
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
function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
  const absSeconds = Math.abs(seconds);
  for (const interval of TIME) {
    const count = Math.floor(absSeconds / interval.seconds);
    if (count >= 1) {
      const prefix = seconds < 0 ? "in " : "";
      const suffix = seconds >= 0 ? " ago" : "";
      return `${prefix}${count} ${interval.label}${count === 1 ? "" : "s"}${suffix}`;
    }
  }
  return "1 second ago";
}
function getTime() {
  const now = /* @__PURE__ */ new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (hur < 10 ? `0${hur}` : hur) + ":" + (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec);
}

// syncify/cli/stdin.ts
var setStdin = stdin;
function stdin() {
  stdin.errors = stdinerr();
  if ($2.mode.watch) {
    stdin.bulk = stdinbulk();
    stdin.watch = stdinwatch();
    stdin.warnings = stdinwarn();
  }
}
stdin.errors = void 0;
stdin.watch = void 0;
stdin.bulk = void 0;
stdin.warnings = void 0;
stdin.ansi = o2({
  footer: `USE ${qD("SB", F("\u25C4"))} AND ${qD("SB", F("\u25BA"))} ARROW KEYS TO NAVIGATE`,
  legend: {
    /** `[q] Exit Debug` */
    q: qD("SB", F.bold("q")) + " Exit Debug",
    /** `[s] Skip Error */
    s: qD("SB", F.bold("s")) + " Skip Error",
    /** `[w] View Warnings */
    w: qD("SB", F.bold("w")) + " View Warnings",
    /** `[e] View Errors */
    e: qD("SB", F.bold("e")) + " View Errors",
    /** `[v] View All' */
    v: qD("SB", F.bold("v")) + " View all"
  }
});
function stdinerr() {
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
  const next = () => {
    if (state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  };
  const prev = () => {
    if (state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  };
  const view = ({ exit = false } = {}) => {
    log.update.clear();
    log.update.done();
    log.nl();
    event.emit("stdin:view", state.index);
    state.write.forEach((write2, index) => {
      write2.Remove("legend", "debug").True(index !== state.write.length - 1, (tui) => tui.Pop()).True(index !== state.write.length - 1, (tui) => tui.Ruler()).toLog({ clear: true });
    });
    dispose();
    if (exit) i.exit(0);
  };
  const quit = () => {
    log.update.clear();
    log.update.done();
    log.ender($2.log.group).nl("");
    dispose();
    i.exit(0);
  };
  const on2 = (id, callback) => {
    if (id === "error") {
      if (!state.errors) {
        state.errors = () => callback(state.index);
        event.on("stdin:error", state.errors);
      }
    } else if (id === "warning") {
      if (!state.warnings) {
        state.warnings = () => callback(state.index);
        event.on("stdin:warn", state.warnings);
      }
    } else if (id === "skip") {
      if (!state.skipped) {
        state.skipped = () => callback(state.index);
        event.on("stdin:skip", state.skipped);
      }
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
      if (key.name === "v") return view();
      if (key.name === "s") return event.emit("stdin:skip");
      if (key.name === "w") return event.emit("stdin:warn");
      if (key.name === "e") return event.emit("stdin:errors");
    };
    t.listener(state.keypress);
    log.update(state.shown.toString({ clear: false }));
    event.on("stdin:dispose", () => {
      log.update.done();
      dispose();
    });
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
  return {
    get isAttached() {
      return state.isAttached;
    },
    listen,
    dispose,
    update,
    on: on2
  };
}
function stdinwatch() {
  const state = {
    write: null,
    isShown: false,
    isAttached: false,
    keypress: void 0
  };
  const create = () => {
    state.write = Ft().Ruler();
    const width = $2.target.reduce((size, { target, store }) => {
      if (store.name.length > size.store) size.store = store.name.length;
      if (target.length > size.theme) size.theme = target.length;
      return size;
    }, { store: 0, theme: 0 });
    for (const url of ["Preview", "Editor"]) {
      state.write.Line(plur(url, $2.target.length) + M, F).Each($2.target, function({ target, store, editor, preview }) {
        this.Line(
          g(
            Hu,
            Be,
            G,
            I(store.name),
            G.repeat(width.store - (store.name.length - 1)),
            Z,
            G,
            I.bold(target),
            G.repeat(width.theme - (target.length - 1)),
            Z,
            G,
            F.underline(url === "Editor" ? editor : preview)
          )
        );
      }).True(url === "Preview", (tui) => tui.Newline());
    }
  };
  const listen = () => {
    if (state.isAttached) return;
    if (state.write === null) create();
    state.keypress = (_data, key) => {
      if (key.name === "i" && state.isShown === false) {
        state.isShown = true;
        state.write.toLog({ trim: false });
      }
    };
    t.listener(state.keypress);
    state.isAttached = true;
  };
  const dispose = () => {
    if (state.keypress) {
      process.stdin.removeListener("keypress", state.keypress);
      state.keypress = void 0;
      state.isAttached = false;
    }
  };
  return {
    get isAttached() {
      return state.isAttached;
    },
    get isShown() {
      return state.isShown;
    },
    set isShown(shown) {
      state.isShown = shown;
    },
    listen,
    dispose
  };
}
function stdinbulk() {
  const state = {
    index: 0,
    isAttached: false,
    write: [],
    keypress: void 0,
    get active() {
      return this.write[this.index];
    }
  };
  const next = () => {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.active.toString({ clear: false, trim: false }));
    }
  };
  const prev = () => {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.active.toString({ clear: false, trim: false }));
    }
  };
  const reset = () => {
    log.update.clear();
    state.write = [];
    state.index = 0;
  };
  const render2 = () => {
    if ($2.errors.size === 0) return;
    state.write = [];
    state.index = 0;
    let count = 0;
    $2.errors.values().forEach((stack) => count += stack.length);
    for (const stack of $2.errors.values()) {
      stack.forEach((value) => {
        const T3 = Ft({ type: "error" });
        count > 1 ? T3.Newline("line").Line(`ERROR ${state.write.length + 1} of ${count}`, $).Insert(value).BR.Newline("line").True(count > 1, (tux) => tux.End(stdin.ansi.footer, false)) : T3.Insert(value).BR.Newline("line");
        state.write.push(T3);
      });
    }
    log.update(
      state.active.toString({
        clear: false,
        trim: false
      })
    );
  };
  const dispose = () => {
    if (!state.keypress) return;
    process.stdin.removeListener("keypress", state.keypress);
    log.update.clear();
    log.update.done();
    state.write.forEach((write2, i2) => {
      write2.Pop().True(i2 !== state.write.length - 1, (tui) => tui.Ruler()).toLog({ clear: true });
    });
    state.keypress = void 0;
    state.isAttached = false;
    state.write = [];
    state.index = 0;
    $2.log.mode = 1 /* Watch */;
    if (!stdin.watch.isAttached) {
      stdin.watch.listen();
      stdin.warnings.listen();
    }
  };
  const listen = () => {
    if (state.isAttached) return;
    stdin.warnings.dispose();
    stdin.watch.dispose();
    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === "left") return prev();
      if (key.name === "right") return next();
    };
    t.listener(state.keypress);
    render2();
    $2.log.mode = 3 /* BulkErrors */;
  };
  return {
    get isAttached() {
      return state.isAttached;
    },
    listen,
    dispose,
    reset
  };
}
function stdinwarn() {
  const state = {
    index: 0,
    isAttached: false,
    write: void 0,
    keypress: void 0,
    pressed: false,
    get active() {
      return this.write[this.index];
    }
  };
  const next = () => {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.active.toString({ clear: false }));
    }
  };
  const prev = () => {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.active.toString({ clear: false }));
    }
  };
  const reset = () => {
    log.update.clear();
    state.write = [];
    state.index = 0;
  };
  const view = () => {
    if (state.pressed) return;
    if (!$2.warnings.has($2.log.uri)) return;
    state.write = void 0;
    state.index = 0;
    state.pressed = true;
    let count = 0;
    $2.warnings.get($2.log.uri).values().forEach((stack) => count += stack.size);
    for (const stack of $2.warnings.get($2.log.uri).values()) {
      stack.forEach((value) => {
        const tui = Ft({ type: "warning" });
        if (count > 1) {
          tui.Newline("line").Append(`WARNING ${state.write.length + 1} of ${count}`, $.yellowBright).Insert(value).Newline("line").End(stdin.ansi.footer);
        } else {
          tui.Insert(value);
        }
        state.write.push(tui);
      });
    }
    log.update(
      state.active.toString({
        clear: false
      })
    );
  };
  const dispose = () => {
    if (!state.keypress) return;
    process.stdin.removeListener("keypress", state.keypress);
    state.keypress = void 0;
    state.isAttached = false;
    state.write = [];
    state.index = 0;
    state.pressed = false;
    log.update.done();
  };
  const listen = () => {
    if (state.isAttached) return;
    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === "left") return prev();
      if (key.name === "right") return next();
      if (key.name === "v") return view();
    };
    t.listener(state.keypress);
  };
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

// syncify/cli/bulk.ts
function bulk() {
  if ($2.bulk.id === null) {
    $2.bulk.id = uuid();
    import_timer.timer.start($2.bulk.id);
  }
  if ($2.bulk.synced.size > 0) {
    $2.bulk.synced.clear();
    $2.errors.clear();
    $2.warnings.clear();
  }
  if (bulk.tui === null) {
    bulk.tui = Ft().Template({ prefix: true, id: "changes", color: bu }).Template({ prefix: true, id: "errors", color: F }).Template({ prefix: true, id: "warnings", color: F }).Template({ prefix: true, id: $2.bulk.type, color: I });
  }
  if (bulk.progress === null) {
    bulk.progress = Io($2.bulk.files, {
      barSize: 30,
      prepend: null,
      barColor: $2.bulk.type === "uploaded" ? "neonGreen" : "blueBright"
    });
  } else {
    bulk.progress.reset($2.bulk.files);
  }
  bulk.tui.Update("changes", `${$($2.bulk.files)} Files`).Update("errors", `${$($2.errors.size)} Errors`).Update("warnings", `${$($2.warnings.size)} Warnings`).Update($2.bulk.type, bulk.progress.render()).toUpdate();
}
bulk.notifier = (type2) => {
  notifier2__default.default.notify({
    warnings: {
      contentImage: $2.file.notifier,
      title: `Bulk ${plur("Warning", $2.warnings.size)}`,
      message: `${$2.warnings.size} ${plur("warning", $2.warnings.size)} encountered`
    },
    errors: {
      contentImage: $2.file.notifier,
      title: `Bulk ${plur("Error", $2.errors.size)}`,
      message: `${$2.errors.size} ${plur("Error", $2.errors.size)} encountered`
    }
  }[type2]);
};
bulk.complete = () => {
  if (!$2.mode.bulk) return;
  const color = $2.bulk.type === "deleted" ? gu : se;
  bulk.tui.Update($2.bulk.type, `${$($2.bulk.synced.size)} Files ${at(import_timer.timer.stop($2.bulk.id))}`, color);
  if ($2.errors.size > 0) {
    bulk.notifier("errors");
    bulk.tui.toUpdate({ clear: true, trim: true, update: ["done"] });
    stdin.bulk.listen();
  }
  bulk.tui = null;
  bulk.progress = null;
  $2.mode.bulk = false;
  $2.bulk.files = 0;
  $2.bulk.id = null;
};
bulk.synced = (filename, target, store) => {
  const message = $2.bulk.type === "uploaded" ? se(re("uploaded", filename, $(target), store, import_timer.timer.stop())) : gu(re("deleted", filename, $(target), store));
  $2.bulk.synced.add(gr(message));
};
bulk.progress = null;
bulk.tui = null;

// syncify/cli/log.ts
function log(...message) {
  forEach((line) => console2.write(line), message);
  return log;
}
log.runtime = wo("runtime");
log.progress = Io;
log.update = V;
log.spinner = Re();
log.line = console2.info;
log.header = console2.header;
log.bulk = bulk;
log.wrap = console2.wrap;
log.hline = (options = {}) => {
  const { wrap } = $2.terminal;
  if (isEmpty(options)) {
    options.width = wrap;
    options.newlines = false;
  } else {
    const has2 = hasProp(options);
    if (!has2("width")) options.width = wrap;
    if (!has2("newlines")) options.newlines = false;
  }
  log(
    KD(
      options.width,
      options.newlines
    )
  );
};
log.nl = function(entry) {
  entry === "" ? console2.break() : console2.tree(entry);
  return this;
};
log.clear = (clear = true) => clear ? log(su) : log;
log.group = function(name2) {
  if ($2.config.log.silent || $2.env.tree === false) return;
  if ($2.log.mode === 3 /* BulkErrors */) stdin.bulk.dispose();
  log.ender();
  if (isString(name2)) {
    if ($2.mode.bulk) {
      log.begin(`Bulk ${Nu} ${toUpcase(name2)}`, { group: true });
    } else {
      log.begin(name2, { group: true });
    }
  }
  return this;
};
log.task = (name2, timestamp = true) => {
  if ($2.config.log.silent || $2.env.tree === false) return;
  if (isString(name2)) {
    console2.dash(
      g.ws(F(name2), timestamp ? at(getTime()) : "")
    );
  } else {
    log.clear()(
      o.trim,
      dr(g.ws(F($2.log.group), at(getTime())))
    );
  }
};
log.process = (label2, ...message) => {
  if ($2.mode.pack || $2.mode.build || $2.config.log.silent) return;
  console2.info(
    re(
      "process",
      message.length === 2 ? g.ws($(label2), Nu, message[0], at(message[1])) : g.ws($(label2), at(message[0]))
    )
  );
};
log.upsert = (upsert) => {
  const { target, store } = upsert.target;
  if ($2.mode.bulk) {
    forEach(({ filename }) => {
      bulk.synced(filename, target, store.name);
      bulk.progress.increment();
      bulk.tui.Update($2.bulk.type, bulk.progress.render()).toUpdate();
    }, upsert.synced);
    if (upsert.errors.length > 0) {
      error.upsert(upsert.errors);
      bulk.progress.increment(upsert.errors.length);
      bulk.tui.Update($2.bulk.type, bulk.progress.render()).Update("errors", `${$($2.errors.size)} ${plur("Error", $2.errors.size)}`, k).toUpdate();
    }
  } else {
    forEach(({ filename }) => {
      console2.info(
        re("uploaded", $(target), store.name, filename, import_timer2.timer.stop()),
        se
      );
    }, upsert.synced);
    upsert.errors.length > 0 && error.upsert(upsert.errors);
  }
};
log.changed = (file) => {
  if (stdin.watch.isShown) stdin.watch.isShown = false;
  if ($2.errors.size > 0) $2.errors.clear();
  if ($2.warnings.size > 0) {
    $2.warnings.clear();
    stdin.warnings.reset();
  }
  if ($2.config.log.silent === true || $2.mode.watch === false) return;
  import_timer2.timer.start();
  const name2 = `${file.kind} ${Nu} ${toUpcase(file.namespace)}`;
  const change = $2.log.changes.has(file.relative) ? $2.log.changes.get(file.relative) + 1 : 1;
  $2.log.changes.set(file.relative, change);
  if ($2.log.group !== name2) {
    log.group(name2);
    if ($2.log.title !== file.namespace) $2.log.title = file.namespace;
  } else {
    log.group(name2);
  }
  if ($2.log.uri !== file.input) $2.log.uri = file.input;
  console2.info(
    re("changed", `${file.relative} ${at(`${change} ${plur("change", change)}`)}`),
    bu
  );
};
log.syncing = (path5, { hot = false } = {}) => {
  if ($2.mode.pack || $2.mode.bulk || $2.mode.build || $2.mode.debug || $2.config.log.silent) return;
  if ($2.warnings.has(path5)) {
    const { size } = $2.warnings.get(path5);
    log.warn(`${$(size)} ${plur("warning", size)}`, de.warning);
  }
  console2.info(
    fu(
      re(
        "syncing",
        path5.replace(/^(\d+)/, $("$1"))
      )
    )
  );
  if (q2.http.pending > (hot ? 0 : 2)) {
    console2.info(
      Bu(
        re(
          "queued",
          g.ws(
            path5,
            Be,
            $(addSuffix(q2.http.pending)),
            "in queue"
          )
        )
      )
    );
  }
};
log.resource = (type2, store) => {
  if ($2.mode.watch) {
    $2.log.queue.add(
      [
        type2,
        store.domain,
        import_timer2.timer.stop()
      ]
    );
    if ($2.log.idle) return;
    else $2.log.idle = true;
    q2.http.onIdle().then(() => {
      for (const [type3, store2, ctime] of $2.log.queue) {
        console2.info(
          gr(
            se(
              re(
                "uploaded",
                g.ws(
                  $(type3),
                  Z,
                  store2,
                  at(ctime)
                )
              )
            )
          )
        );
      }
      $2.log.queue.clear();
      $2.log.idle = false;
    });
  } else {
    console2.info(
      gr(
        se(
          re(
            "uploaded",
            g.ws(
              $(type2),
              Z,
              store.domain,
              at(import_timer2.timer.stop())
            )
          )
        )
      )
    );
  }
};
log.invalid = (path5, message) => {
  console2.error(re("invalid", path5));
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
    console2.error(ne(...message, { line: "red", color: k }));
  }
};
log.error = (input, { suffix = null, notify = null } = {}) => {
  if ($2.mode.bulk) return;
  const message = w.numbers(input, $);
  console2.error(re("failed", suffix ? `${message} ${at(suffix)}` : message));
  if (notify !== null) {
    notify.contentImage = $2.file.notifier;
    notifier2__default.default.notify(notify).notify();
  }
};
log.transform = (label2, ...suffix) => $2.mode.build || $2.mode.bulk || $2.mode.debug || console2.info(
  re("transform", $(label2), ...suffix),
  I
);
log.minified = (...p2) => $2.mode.pack || $2.mode.bulk || $2.mode.build || console2.info(
  re("minified", $(p2.shift()), ...p2.slice(0, -1), `saved ${p2.pop()}`),
  I
);
log.begin = (message, { timestamp = true, clear = true, group = false } = {}) => log.clear(clear)(
  oe,
  hr(group ? $2.log.group = message : message, timestamp),
  o.next + oe
);
log.ender = (message, { timestamp = true, clear = true } = {}) => log.clear(clear)(
  o.trim + "\n",
  Cr(message || $2.log.group, timestamp),
  zu
);
log.skipped = (file, reason) => $2.mode.pack || $2.mode.build || $2.mode.bulk || console2.info(
  re("skipped", `${isString(file) ? file : file.key} ${at(reason)}`),
  F
);
log.deleted = (file, theme2) => console2.info(
  re("deleted", file, ...[$2.mode.bulk ? (theme2.target, theme2.store.domain) : void 0]),
  gu
);
log.zipped = (size, path5) => console2.info(
  re("zipped", `${$("ZIP")} ${size} ${at(path5)}`),
  I
);
log.ignored = (path5) => console2.info(
  re("ignored", path5),
  P
);
log.rename = (from, to) => $2.running === false || $2.mode.watch || console2.info(
  re("renamed", $(from), $(to)),
  I
);
log.warn = (message, suffix) => console2.info(
  re("warnings", suffix ? `${message} ${at(suffix)}` : `${message}`),
  P
);
log.hot = (id) => console2.info(
  re("reloaded", $("HOT RELOAD"), import_timer2.timer.now(id)),
  xt
);
log.exported = (from, to) => console2.info(
  re("exported", $(from), $(to)),
  mu
);
log.retrying = (file, theme2) => console2.info(
  re("retrying", file, theme2.target, theme2.store.domain),
  Bu
);
log.reloaded = (path5, time) => console2.info(
  re("reloaded", path5, time),
  I
);
log.version = (version, action) => console2.info(
  re("version", $(version.number), $(version.update.number), action),
  I
);

// syncify/cli/throws.ts
function throws(message, solution, name2) {
  if (!name2) name2 = "ERROR";
  Ft({ type: "error" }).Line(name2.toUpperCase(), $).Newline().Wrap(message).Tree("info").True(solution && solution.length > 0, (tui) => tui.NL.Line("Solution?", F.bold).Wrap(solution, F)).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
  $2.running ? i.exit(0) : process.exit(0);
}
throws.internal = (err) => {
  Ft({ type: "error" }).Line("INTERNAL ERROR ~ Thrown during define()", $).Header(err.message).Wrap(cr(err.stack)).Tree("info").NL.Line("Submit Issue", F.bold).Line("This is an internal error thrown by Syncify. Please report to the", F).Line("Github repository and provide re-production information.", F).Header(Nu + " " + Ee.gray("https://github.com/panoply/syncify/issues")).End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};
throws.typeError = ({ option, name: name2, provided, expects }) => {
  Ft({ type: "error" }).Line("TYPE ERROR", $).NL.Line(`An invalid ${ou(option)} type value was provided in your ${$(path2.basename($2.file.config))} file.`).Append(`The ${ou(name2)} option has an incorrect type. Syncify will not intialize until this is fixed.`).NL.Line(`provided${M} ${P(type(provided).toLowerCase())}`).Line(`expected${M} ${Fu(expects.replace(/([|,])/g, F("$1")))}`).Tree("info").NL.Line("How to fix?", F.bold).Line(`You need to change the option value to reflect the ${Fu("expected")} type.`, F).Append(`Use the ${Fu("defineConfig")} named export for type checking`, F).End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};
throws.command = ({
  message,
  expected,
  provided,
  fix
}) => {
  if (!provided) {
    provided = g.ws($2.argv);
    expected = I(`sy ${provided} ${ou(expected.replace(/([|,-])/g, F("$1")))}`);
  } else {
    expected = I(`sy ${expected}`);
  }
  Ft({ type: "error" }).Line("COMMAND ERROR", $).NL.Wrap(message).NL.Line(`provided${M} ${I("$")} ${provided}`).Line(`expected${M} ${I("$")} ${expected}`).Tree("info").Prepend("How to fix?", F.bold).Wrap(fix, F).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(2) : process.exit(2);
};
throws.stores = () => {
  Ft({ type: "error" }).Line(`${"MISSING REFERENCE"}`, $).NL.Line(`You have not provided any ${$("stores")} within your ${ou("package.json")} file.`).Tree("info").NL.Line("How to fix?", He.bold).Line(`You need to provide ${ou("stores")} via ${ou("syncify")} key`, F).Line("passing both the shop name and a key > value list of theme targets.", F).NL.Line("{", F).Line('  "syncify": {'.replace(/"/g, He('"')), F).Line('    "stores": {'.replace(/"/g, He('"')), F).Line(`      "${k("your-store")}": {}`.replace(/"/g, He('"')), F).Line("    }", F).Line("  }", F).Line("}", F).NL.Line(`Replace the ${He("your-store")} with the name of your .myshopify domain.`, F).Line("Syncify will prompt you and provide a list of theme targets to select from.", F).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};
throws.enoent = ({
  type: type2,
  path: path5,
  message,
  task
}) => {
  Ft({ type: "error" }).Line("ENOENT ERROR", $).Newline().Wrap(`Failed to resolve ${ou(path5)} ${type2}.`, ...message).Newline().Line(`task${M} ${P(task)}`).Line(`path${M} ${Fu(path5)}`).Tree("info").NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(1) : process.exit(1);
};
throws.dependency = (dependencies) => {
  log.runtime.Stop();
  Ft({ type: "error" }).Append("DEPENDENCY ERROR", $).Wrap("You are attempting to use transform processor/s that are not yet installed in this project.").NL.Line("How to fix?", F.bold).Wrap(F, "Install these modules as development dependencies or disable the transform using them.").NL.Each(dependencies, function(name2) {
    this.Line(`$ pnpm add ${name2} -D`, I);
  }).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};
throws.option = ({ option, name: name2, value, expects, reason = [""] }) => {
  if (option.includes(".")) option = option.split(".").filter(Boolean).join(F(" \u2192 "));
  Ft({ type: "error" }).Line("INVALID ERROR", $).NL.Wrap(`Error in ${ou(option)} configuration. The ${ou(name2)} option is invalid. `, ...reason).NL.Line(`provided${M} ${P(value)}`).Line(`expected${M} ${Fu(expects.replace(/([|,])/g, F("$1")))}`).Tree("info").Prepend("How to fix?", F.bold).Line("You need to update the option and use one of the expected values.", F).Append(`Use the ${Fu("defineConfig")} named export for type checking`, F).End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};
throws.runtime = (e3, options) => {
  const message = e3 instanceof Error ? has("message", e3) ? e3.message : e3.toString() : e3;
  if (has("code", e3)) options.entries.code = e3.code;
  if (has("name", e3)) options.entries.name = e3.name;
  log.runtime.Tree("error").Header("ERROR", $.red).Wrap(options.message, k).Newline().Wrap(message, k.bold).Newline().Line("How to fix?", F.bold).Wrap(options.solution, F).Newline().True(has("entries", options), (_2) => _2.Context({ entries: options.entries })).Newline().End($2.log.group).BR.toWrite({ clear: true });
  $2.running ? i.exit(0) : process.exit(0);
};
throws.unknown = () => {
  const message = g.ws(
    "Syncify cannot run from this location as it is unknown. The necessary files",
    "and references that would auto-confirm this directory as a valid project could",
    "not be located."
  );
  const write2 = Ft({ type: "error" }).Line("UNKNOWN PROJECT", $).Newline().Wrap(message).Header(`${Ee.redBright($2.cwd)}`);
  let _stores = false;
  let _credential = false;
  let _config = false;
  if ($2.project.credentials === null) {
    write2.Line(`${Tt} no credentials`, $);
  } else {
    _credential = true;
  }
  if ($2.stores.length === 0) {
    write2.Line(`${Tt} no targets`, $);
  } else {
    _stores = true;
  }
  if ($2.file.config === null) {
    write2.Line(`${Tt} no config file`, $);
  } else {
    _config = true;
  }
  if (_config) write2.Line(`${Ru} ${path2.basename($2.file.config)}`, se);
  if (_stores) write2.Line(`${Ru} stores defined`, se);
  if (_credential) {
    if ($2.project.credentials === "env") {
      write2.Line(`${Ru} .env file`, se);
    } else {
      write2.Line(`${Ru} using keychain`, se);
    }
  }
  const suggest = g.ws(
    `Run the ${bu("sy init")} command if you would like to make this directory a Syncify project.`,
    "You can alternatively provide the necessary files/references. For more information",
    `visit the setup guide: ${Ee("https://syncify.sh/setup/")}`
  );
  write2.Tree("info").NL.Line("How to fix?", F.bold).Wrap(suggest, F).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
};

// syncify/mode/build.ts
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
    const resolve3 = (value) => {
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

// syncify/mode/build.ts
var import_timer10 = __toESM(require_dist());
function http(domain, token) {
  if (domain in http.tokens) {
    return http.client[domain];
  } else if (domain && token) {
    http.tokens[domain] = token;
    http.client[domain] = xior__default.default.create({
      baseURL: `https://${domain}.myshopify.com/admin/api/${http.VERSION}`,
      url: "graphql.json",
      responseType: "json",
      // @ts-ignore
      method: "POST",
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
    throws(domain ? [
      `Xior instance cannot be found for ${domain}`
    ] : [
      "Xior instance could not be created"
    ], []);
  }
}
http.request = (domain, token) => {
  const client = xior__default.default.create({
    baseURL: `https://${domain}.myshopify.com/admin/api/${http.VERSION}`,
    url: "graphql.json",
    responseType: "json",
    // @ts-ignore
    method: "POST",
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
  return (data) => client.request(data);
};
http.chain = (path5, reject) => (object) => pathOr(
  object,
  path5,
  (reason) => {
    reason.isGraphError = true;
    reject(reason);
  }
);
http.client = o2();
http.tokens = o2();
http.VERSION = "2025-01";

// syncify/http/utils.ts
function graph(object, path5, reject) {
  if (!isObject(object)) return reject(Object.assign(object || {}, { isGraphError: true }));
  if (has("errors", object)) return reject(Object.assign(object, { isGraphError: true }));
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
    target = has2("target") ? query.target : $2.target.default;
    if (has2("onError")) onError = query.onError;
    if (has2("onNext")) onNext = query.onNext;
    if (has2("input")) {
      if (isArray(query.input)) {
        const [first] = query.input;
        if (isObject(first) && "key" in query.input) {
          files = query.input;
          query = files.map(({ key }) => key);
        } else {
          query = query.input;
        }
      } else if (isObject(query.input)) {
        if ("key" in query.input) {
          files = [query.input];
          query = [query.input.key];
        } else {
          query = [query.input];
        }
      } else if (isString(query.input)) {
        query = [query.input];
      }
    }
  } else {
    target = parameters.length === 2 ? parameters[1] : $2.target.default;
    if (isArray(query)) {
      const [first] = query;
      if (isObject(first) && "key" in first) {
        files = query;
        query = files.map(({ key }) => key);
      }
    } else if (isObject(query)) {
      if ("key" in query) {
        files = [query];
        query = [query.key];
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
    target = has2("target") ? query.target : $2.target.default;
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
    target = parameters.length === 2 ? parameters[1] : $2.target.default;
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

// syncify/http/themeFiles/themeFilesMap.ts
function themeFilesMap(target, callback = null) {
  return new Promise((resolve3, reject) => (async () => {
    let after = null;
    let hasNextPage = true;
    const files = { files: {}, total: 0 };
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
        const { nodes, pageInfo } = graph(response, "data.theme.files", reject);
        files.total += nodes.length;
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
        callback && callback(files.total);
        forEach(({ filename }) => {
          const directory = filename.slice(0, filename.lastIndexOf("/"));
          has(directory, files.files) ? files.files[directory].push(filename) : files.files[directory] = [filename];
        }, nodes);
      }).catch((e3) => {
        e3.target = target;
        e3.graph = "OnlineStoreThemeFile";
        error.request(e3);
        hasNextPage = false;
      });
    }
    resolve3(files);
  })());
}

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

// syncify/http/themeFiles/themeFilesDelete.ts
function themeFilesDelete(...input) {
  const { query, target, files, onError } = params(input);
  return new Promise((resolve3, reject) => {
    http(target.store.name).request({
      data: {
        query: `mutation ThemeFilesDelete($gid:ID!,$query:[String!]!){themeFilesDelete(themeId:$gid,files:$query){deletedThemeFiles{filename}userErrors{message filename code,field}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { deletedThemeFiles, userErrors } = graph(response, "data.themeFilesDelete", reject);
      resolve3(
        {
          target,
          synced: deletedThemeFiles,
          errors: forMap((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, " "),
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            graph: "MutationThemeFilesDelete",
            file: files.find((file) => file.key === userError.filename) || null
          }), userErrors)
        }
      );
    }).catch((e3) => {
      e3.target = target;
      e3.files = files;
      e3.graph = "OnlineStoreThemeFileOperationResult";
      onError ? onError(e3) : reject(e3);
    });
  });
}
async function themeFilesDeleteMap(file) {
  const files = isArray(file) ? file : [file];
  await q2.http.add(async () => {
    try {
      const targets = await pMap($2.target, (target) => themeFilesDelete(files, target));
      event.each(targets);
    } catch (e3) {
      error.request(e3);
    }
  });
}

// syncify/http/themeFiles/themeFilesUpsert.ts
function themeFilesUpsert(...input) {
  const { query, target, files, onError } = params.upsert(input);
  return new Promise((resolve3, reject) => {
    http(target.store.name).request({
      data: {
        query: `mutation ThemeFilesUpsert($query:[OnlineStoreThemeFilesUpsertFileInput!]!,$gid:ID!){themeFilesUpsert(files:$query,themeId:$gid){upsertedThemeFiles{filename}userErrors{code,field,filename,message,}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { upsertedThemeFiles, userErrors } = graph(response, "data.themeFilesUpsert", reject);
      resolve3(
        {
          target,
          synced: upsertedThemeFiles,
          errors: forMap((userError) => ({
            message: userError.message,
            filename: userError.filename,
            code: userError.code.replace(/_/g, " "),
            graph: "OnlineStoreThemeFilesUpsertFileInput",
            summary: OnlineStoreThemeFilesUserErrors(userError.code),
            file: files.find((file) => file.key === userError.filename) || null
          }), userErrors)
        }
      );
    }).catch((e3) => {
      e3.target = target;
      e3.files = files;
      e3.graph = "OnlineStoreThemeFilesUpsertFileInput";
      onError ? onError(e3) : reject(e3);
    });
  });
}
async function themeFilesUpsertMap(file) {
  const files = isArray(file) ? file : [file];
  await q2.http.add(async () => {
    try {
      const targets = await pMap($2.target, (target) => themeFilesUpsert(files, target));
      event.each(targets);
    } catch (e3) {
      error.request(e3);
    }
  });
}

// syncify/http/themeFiles/themeFilesList.ts
function themeFilesList(...input) {
  const { query, target, onError, onNext } = params(input);
  return new Promise((resolve3, reject) => (async () => {
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
        if (userErrors.length > 0) {
          errors = errors.concat(forMap(({ filename, code }) => ({
            filename,
            code: code.replace(/_/g, " "),
            graph: "QueryOnlineStoreThemeFile",
            message: OnlineStoreThemeFileReadResult(code)
          }), userErrors));
        }
      }).catch((e3) => {
        e3.target = target;
        e3.files = files;
        e3.graph = "OnlineStoreThemeFile";
        onError ? onError(e3) : error.request(e3);
        hasNextPage = false;
      });
    }
    resolve3(
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

// syncify/http/themeFiles/themeFilesGet.ts
function themeFilesGet(...input) {
  const { query, target, files, onError } = params(input);
  return new Promise((resolve3, reject) => {
    http(target.store.name).request({
      data: {
        query: `query ThemeFilesGet($gid:ID!,$query:[String!]!){theme(id:$gid){files(filenames:$query){userErrors{code filename},nodes{filename,size,createdAt,updatedAt,body{...on OnlineStoreThemeFileBodyText{content}}}}}}`,
        variables: {
          gid: target.gid,
          query
        }
      }
    }).then((response) => {
      const { nodes, userErrors } = graph(response, "data.theme.files", reject);
      resolve3(
        {
          get target() {
            return target;
          },
          file: nodes.length === 1 ? nodes[0] : null,
          errors: forMap(({ filename, code }) => ({
            filename,
            code: code.replace(/_/g, " "),
            graph: "QueryOnlineStoreThemeFile",
            message: OnlineStoreThemeFileReadResult(code)
          }), userErrors)
        }
      );
    }).catch((e3) => {
      e3.target = target;
      e3.files = files;
      e3.graph = "QueryOnlineStoreThemeFile";
      onError ? onError(e3) : error.request(e3);
    });
  });
}
function themesList(store) {
  return new Promise((resolve3, reject) => {
    http(store.name).request({
      data: {
        query: `query ThemeList{themes(first:100){nodes{id createdAt name prefix role themeStoreId updatedAt}}}`
      }
    }).then(({
      data: {
        themes: {
          nodes
        }
      }
    }) => {
      resolve3(nodes.map((theme2) => ({ ...theme2, id: path2.basename(theme2.id) })));
    }).catch((failed) => {
      const e3 = {};
      e3.failed = failed;
      e3.store = store;
      reject(e3);
    });
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
  if ($2.mode.hot) {
    log.syncing(file.key, { hot: $2.mode.hot });
    if (file.kind === "JavaScript" /* JavaScript */) {
      $2.wss.script(file.uuid, file.base);
    } else if (file.kind === "CSS" /* CSS */) {
      $2.wss.stylesheet(file.uuid, file.base);
    }
  }
  if ($2.mode.build === false) {
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
      if ($2.mode.watch) log.skipped(file, "empty file");
      return null;
    }
    await passthrough(file);
  }
  return null;
}

// syncify/transform/json.ts
var import_timer4 = __toESM(require_dist());

// syncify/prompts/enquirer/index.ts
var import_enquirer = __toESM(require_enquirer());
var theme = {
  pointer(choice, index) {
    const line = this.state.index === index ? o.dash : o.line;
    return index === 0 ? o.trim + "\n" + line : line;
  },
  prefix: o.trim + " ",
  styles: {
    primary: se,
    success: se,
    danger: S,
    warning: P,
    muted: F,
    disabled: F,
    typing: I
  },
  symbols: {
    ellipsis: $("?"),
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
function cancel(e3) {
  i(() => {
    log.nl().line("PROCESS EXIT WITH CODE 0", xt);
    log.ender("Prompt Exit", { clear: false });
  });
  i.exit(0);
  throw new Error(e3);
}
function choose(array, {
  prop = "",
  padding = 2
} = {}) {
  const p2 = prop.length > 0;
  const maxLen = Math.max(...array.map((s3) => p2 ? s3[prop].length : s3.length));
  const padded = array.map((s3) => " ".repeat(maxLen - (p2 ? s3[prop].length : s3.length) + padding));
  return (cb) => array.map((x, i2) => {
    if (cb) {
      const c = cb(x, i2);
      c.hint = padded[i2] + c.hint;
      return c;
    }
    x.hint = padded[i2] + x.hint;
    return x;
  });
}
function labels({
  prompts: prompts2,
  padding = 2
}) {
  const space = eqWS(prompts2, { padding });
  const model = o2();
  for (let i2 = 0, size = prompts2.length, name2 = ""; i2 < size; i2++) {
    name2 = prompts2[i2];
    model[toPascalCase(name2)] = $(name2 + M + space(name2));
  }
  return model;
}
function intercept() {
  const native = process.stdout.write;
  s.stdout.write = function(chunk, encoding, callback) {
    let modified = chunk.toString();
    if (/ERROR|INVALID|MISSING|REQUIRED/i.test(modified)) {
      modified = modified.replace(/\n/, "\n" + o.trim).replace(/(?<=\u001b\[31m) /, "").replace(/(?<=\[39m)\n? +(?=\u001b\[38;2;42;42;46m)/, "").replace(/( (?:ERROR|INVALID|MISSING|REQUIRED))/i, "$1");
    }
    native.call(s.stdout, modified, encoding, callback);
  };
  return () => {
    s.stdout.write = native;
  };
}

// syncify/prompts/enquirer/snippet.ts
async function render() {
  const { index, keys: keys2 = [], submitted, size } = this.state;
  const newline = [this.options.newline].find((v2) => v2 != null);
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
    body.split("\n").join(o.next),
    footer,
    error2.trim()
  ];
  this.write(lines.filter(Boolean).join(newline));
  this.restore();
}

// syncify/prompts/enquirer/labels.ts
var label = labels({
  padding: 0,
  prompts: [
    // credentials.ts prompt
    "Storage Method",
    "Existing Token",
    "Which Keychain",
    "Select Token",
    "Shopify Domain",
    "API Admin Token",
    "API Token Name",
    // directories.ts prompt
    "Select Action",
    "Directory Name",
    "Path Directory",
    "Sub-Directory",
    // create.ts prompt
    "Project Path",
    "Strap Source",
    "Choose Strap",
    "Project Name",
    "Credentials",
    "Installation",
    "Overwrite",
    // targets.ts prompt
    "Theme Targets",
    "Target Storage",
    "Select Themes",
    "Define Targets"
  ]
});
var import_timer3 = __toESM(require_dist());
function write(file, { noUpsert = false } = {}) {
  return async (data) => {
    if (isNil(data)) return null;
    runChecksum(file.input, data);
    fsExtra.writeFile(file.output, data).catch(error.write("Error writing stylesheet to output", {
      input: file.relative,
      output: path2.relative($2.cwd, file.output)
    }));
    file.value = data;
    const size = sizeDiff(file.value, file.size);
    if (size.isSmaller) {
      if (file.kind === "SCSS" /* SCSS */ || file.kind === "SASS" /* SASS */ || file.kind === "Tailwind" /* Tailwind */) {
        log.transform(file.kind, $("CSS"), size.before, import_timer3.timer.stop(file.uuid));
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
    if ($2.mode.hot) {
      $2.wss.stylesheet(file.uuid, path2.basename(file.key));
    }
    if (file.kind !== "Tailwind" /* Tailwind */) {
      log.syncing(file.key);
    }
    if ($2.mode.watch && !noUpsert) {
      await themeFilesUpsertMap(file);
      if (!$2.mode.build) {
        if ($2.warnings.size > 0) {
          const size2 = warn.count();
          log.warn(`${$(size2)} Compiler ${plur("Warning", size2)}`, `Press ${$("v")} to view all warning/s`);
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
  const options = isObject(file.data.sass) ? merge($2.processor.sass.config, file.data.sass) : $2.processor.sass.config;
  if (file.ext === ".scss" || file.ext === ".sass") {
    $2.mode.watch && import_timer3.timer.start();
    try {
      const { css, sourceMap } = $import.sass.compile(file.data.input, {
        loadPaths: options.include,
        sourceMapIncludeSources: file.data.postcss,
        sourceMap: options.sourcemap,
        style: options.style,
        fatalDeprecations: options.fatalDeprecations,
        futureDeprecations: options.futureDeprecations,
        functions: options.functions,
        silenceDeprecations: options.silenceDeprecations,
        alertColor: false,
        alertAscii: false,
        quietDeps: options.quietDeps,
        charset: file.data.snippet === false,
        logger: {
          warn: warn.sass(file)
        }
      });
      if (options.sourcemap) {
        const map = path2.join($2.dirs.sourcemaps.styles, file.base + ".map");
        fsExtra.writeFile(map, JSON.stringify(sourceMap)).catch(
          error.write("Error writing SASS Source Map file to the cache directory", {
            file: path2.relative($2.cwd, map),
            source: file.relative
          })
        );
      }
      log.process("SASS Dart", import_timer3.timer.stop());
      file.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e3) {
      if ($2.mode.watch) {
        import_timer3.timer.clear();
        log.error(file.relative, {
          notify: {
            title: `Error in ${file.base}`,
            message: "SASS style transform failed, SCSS was not complied."
          }
        });
        error.sass(file, e3);
      }
      return null;
    }
  }
  return readStyleFile(file);
}
async function tailwindParse(file) {
  const files = [];
  for (const map in $2.processor.tailwind.map) {
    if ($2.processor.tailwind.map[map].has(file.input)) {
      const file2 = parse2($2.style[map].input);
      if (isUndefined(file2)) continue;
      import_timer3.timer.start(file2.uuid);
      file2.kind = "Tailwind" /* Tailwind */;
      file2.value = await tailwindProcess(file2, { noUpsert: true });
      if (isString(file2.value)) {
        files.push(file2);
      }
    }
  }
  files.push(file);
  files.length > 1 ? log.syncing(`${files.length} files processed`, { hot: $2.mode.hot }) : log.syncing(files[0].key, { hot: $2.mode.hot });
  return files;
}
async function tailwindProcess(file, upsert) {
  if ($2.mode.hot) import_timer3.timer.start(file.uuid);
  const output = write(file, upsert);
  const read = await readStyleFile(file);
  const post = await postcssProcess(file, read.css, read.map);
  if (post === null) return null;
  file.hash = checksum(post);
  if ($2.checksum[file.input] === file.hash) {
    log.skipped(file, "no changes");
    return null;
  }
  $2.checksum[file.input] = file.hash;
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
  } catch (e3) {
    import_timer3.timer.clear();
    log.error(file.relative, {
      notify: {
        title: "Read Error",
        message: `File ${file.base} could not be read`
      }
    });
    error.throw(e3, {
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
    if ($2.mode.watch && file.kind !== "Tailwind" /* Tailwind */) import_timer3.timer.start();
    const result = await $import.postcss(plugins2).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? {
        prev: map,
        inline: false,
        absolute: true
      } : null
    });
    if ($2.mode.watch && file.kind !== "Tailwind" /* Tailwind */) {
      log.process("PostCSS", import_timer3.timer.stop());
    }
    const issues = result.warnings();
    if (issues.length > 0) {
      for (const warning of issues) {
        warn.postcss(file, warning);
      }
    }
    return result.css.toString();
  } catch (e3) {
    if ($2.mode.watch) {
      import_timer3.timer.clear();
      log.error(file.relative, {
        notify: {
          title: `Error in ${file.base}`,
          message: "PostCSS Transform Error, file failed to process"
        }
      });
    }
    error.postcss(file, e3);
    return null;
  }
}
function createSnippet(string, attrs) {
  return attrs.length > 0 ? `<style ${g.ws(attrs)}>${string}</style>` : `<style>${string}</style>`;
}
async function StyleTransform(file) {
  if ($2.mode.watch) import_timer3.timer.start();
  if ($2.mode.hot) import_timer3.timer.start(file.uuid);
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
  } catch (e3) {
    error.throw(e3, {
      transform: "Style",
      input: file.input
    });
    return null;
  }
}

// syncify/transform/json.ts
function parseJson(file, actual, expected) {
  try {
    return expected ? json.evaluate(actual, expected, $2.json.options) : json.evaluate(actual, $2.json.options);
  } catch (e3) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Parse error occurred due to invalid syntax"
      }
    });
    error.json(e3, file, "JSON Parse Error");
    return null;
  }
}
async function jsonCompile(file, json$1) {
  const { parsed, string } = isString(json$1) ? parseJson(file, json$1) : json$1;
  const indent = $2.json.terse.enabled ? indentSize(file.type) : $2.json.indent;
  const output = indent === 0 ? json.stringify(parsed, {
    removeComments: true,
    indentSize: 0,
    arrays: $2.json.options.arrays,
    objects: $2.json.options.objects,
    exclude: $2.json.options.exclude
  }) : string;
  if (isNil(output)) {
    if ($2.mode.watch) import_timer4.timer.stop();
    return output;
  }
  if (indent === 0) {
    const { before, after, saved } = sizeDiff(output, file.size);
    log.minified("JSON", before, after, saved);
  } else {
    log.transform("JSON", file.namespace, byteConvert(file.size), import_timer4.timer.now());
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
  for (const theme2 of $2.target) {
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
    const { action } = await (0, import_enquirer.prompt)({
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
      const uri2 = path2.join($2.dirs.temp, file.key);
      await fsExtra.writeFile(uri2, json[0].string);
      openInEditor(uri2);
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
  const { options } = $2.json.terse;
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
  return $2.json.useTab ? "	".repeat(Math.floor($2.json.indent / 2)) : $2.json.indent;
}
var isDiff = (type2) => type2 === 9 /* Config */ || type2 === 1 /* Template */ || type2 === 8 /* Metaobject */ || type2 === 10 /* Locale */ || type2 === 6 /* Group */;
async function JsonTransform(file) {
  $2.mode.watch && import_timer4.timer.start();
  const read = await fsExtra.readFile(file.input, "utf8").catch(
    error.write("Error reading JSON file", {
      input: file.input,
      output: file.output
    })
  );
  if (!isString(read)) return;
  const local = read.trim();
  file.size = byteSize(local);
  if (local.length === 0) {
    log.skipped(file, "empty file");
    return;
  }
  if ($2.mode.build === false && isDiff(file.type)) {
    file.value = await jsonCompare(file, local);
  } else {
    file.value = await jsonCompile(file, local);
  }
  if ($2.mode.build) return file.value;
  if (runChecksum(file.input, file.value)) {
    log.skipped(file.key, "no changes");
    await themeFilesUpsertMap(file);
  } else {
    if (file.type !== 11 /* Style */ && $2.processor.tailwind.map !== null) {
      await tailwindParse(file).then(themeFilesUpsertMap);
    } else {
      log.syncing(file.key);
      await themeFilesUpsertMap(file);
    }
    if ($2.mode.hot && $2.mode.bulk === false) {
      await q2.http.onIdle().then(() => $2.wss.replace());
    }
    return file.value;
  }
}
var import_timer7 = __toESM(require_dist());

// syncify/hot/socket.ts
var import_timer6 = __toESM(require_dist());
var import_timer5 = __toESM(require_dist());

// packages/update/dist/index.mjs
var w2 = /^(\d+)\.(\d+)\.(\d+)(-([a-z]+)(?:\.(\d+))?)?$/i;
function C(o3, a2, n) {
  let i2 = (s3) => {
    let e3 = s3.match(w2);
    if (!e3) throw new Error(`Invalid version format: ${s3}`);
    return { parts: [parseInt(e3[1], 10), parseInt(e3[2], 10), parseInt(e3[3], 10)], release: e3[5] || "latest", preRelease: e3[5] ? `${e3[5]}${e3[6] ? `.${e3[6]}` : ""}` : void 0, stage: e3[5] ? parseInt(e3[6] || "0", 10) : null };
  }, p2 = (s3, e3) => {
    if (!s3 && !e3) return { comparison: 0, step: false };
    if (!s3) return { comparison: 1, step: false };
    if (!e3) return { comparison: -1, step: false };
    let [u, h2 = "0"] = s3.split("."), [$3, y = "0"] = e3.split("."), m3 = n[u.toLowerCase()] || 0, g2 = n[$3.toLowerCase()] || 0;
    if (m3 !== g2) return { comparison: m3 - g2, step: false };
    let f2 = Number(h2) - Number(y);
    return { comparison: f2, step: f2 !== 0 };
  }, r2 = i2(o3), t3 = i2(a2), d2 = () => {
    for (let e3 = 0; e3 < 3; e3++) if (r2.parts[e3] - t3.parts[e3] !== 0) return e3 === 0 ? "major" : e3 === 1 ? "minor" : "patch";
    return p2(r2.preRelease, t3.preRelease).comparison !== 0, "patch";
  };
  if (r2.preRelease === t3.preRelease) {
    if (r2.parts.every((s3, e3) => s3 === t3.parts[e3])) return false;
    if (Number(r2.parts.join("")) > Number(t3.parts.join(""))) throw new Error(`Current version is greater than registry version: ${o3} > ${a2}`);
  }
  let l2 = d2(), c = p2(r2.preRelease, t3.preRelease), b2 = l2 === "major" || (n[r2.release.toLowerCase()] || 0) < (n[t3.release.toLowerCase()] || 0) || c.comparison > 0 || t3.stage > r2.stage, R = r2.preRelease && t3.preRelease ? r2.release === t3.release ? `${r2.release}.${r2.stage} \u2192 ${t3.release}.${t3.stage}` : `${r2.release} \u2192 ${t3.release}` : r2.preRelease ? `${r2.release} \u2192 latest` : `latest \u2192 ${t3.release}`;
  return { change: l2, bump: R, release: t3.release, breaking: b2, step: c.step, current: o3, registry: a2, parse: { get current() {
    return { major: r2.parts[0], minor: r2.parts[1], patch: r2.parts[2], release: r2.release, stage: r2.stage };
  }, get registry() {
    return { major: t3.parts[0], minor: t3.parts[1], patch: t3.parts[2], release: t3.release, stage: t3.stage };
  } } };
}
async function I3(o3) {
  let a2 = new AbortController();
  i(() => a2.abort());
  try {
    return (await (await fetch(`https://registry.npmjs.org/${o3}`, { signal: a2.signal })).json()).version;
  } catch {
    return null;
  }
}
async function v(o3, a2, { tag: n = "latest", priorities: i2 = void 0 } = {}) {
  var _a14;
  if (!((_a14 = process == null ? void 0 : process.stdout) == null ? void 0 : _a14.isTTY)) return;
  let p2 = await I3(`${o3}/${n}`);
  return p2 === null ? false : C(a2, p2, { alpha: 1, beta: 2, rc: 3, ...i2 });
}
var N2 = v;

// syncify/cli/runtime.ts
function runtime() {
  if ($2.config.log.silent || $2.running) return;
  import_timer5.timer.start("runtime");
}
runtime.startup = function() {
  if ($2.running) {
    return null;
  } else {
    log.runtime.Break().Top("Syncify").Newline().Template(He.dim(`v${$2.version}`), { id: "v" }).True($2.terminal.cols < 80, function() {
      this.Header("TERMINAL WIDTH WARNING", $.red).Wrap(
        S,
        `Your terminal width is below ${$(80)} columns (currently ${$($2.terminal.cols)})`,
        "This is not recommended for usage with Syncify (size matters).",
        "Expand your terminal width wider for an optimal console experience."
      );
    }).Newline().toWrite();
    N2("@syncify/cli", $2.version).then((version) => {
      if (version !== false) {
        const latest = `${se(`${$(version.registry)} (available)`)}`;
        log.runtime.Update("v", `${S.dim($2.version)} ${Mu} ${latest}`);
      }
    });
  }
};
runtime.time = () => {
  if ($2.running) return;
  log.runtime.Prepend(`${$t} Runtime ~ ${import_timer5.timer.stop("runtime")}`, F.dim).toWrite({ trim: true }).Reset();
};
runtime.modes = function() {
  if ($2.mode.link) {
    log.wrap(
      "Select theme target/s to be inserted into your package.json file.",
      "You will be given a code example after selecting where you will define",
      "a custom target name. If you would like to create a new theme, then run",
      `the ${ou("publish")} resource`,
      F
    );
  } else {
    if (!isEmpty($2.filters)) {
      const tui = Ft().Newline().Line(`Filters${M}`, He.bold);
      const space = eqWS($2.filters);
      for (const group in $2.filters) {
        const join33 = He($2.filters[group].map((k2) => path2.relative($2.cwd, k2)).join(", "));
        tui.Line(` ${Be} ${group}${M}${space(group)}${join33}`, bu);
      }
      tui.Newline().toLog({ clear: true });
    }
  }
};
runtime.stores = function() {
  if (!$2.mode.watch) return;
  for (const url of ["editor", "preview"]) {
    const width = $2.target.reduce((size, { target, store }) => {
      if (store.name.length > size.store) size.store = store.name.length;
      if (target.length > size.theme) size.theme = target.length;
      return size;
    }, {
      store: 0,
      theme: 0
    });
    log.runtime.Line(plur(toUpcase(url), $2.target.length) + M, $.white).Each($2.target, function({ target, store, editor, preview }) {
      this.Line(
        g.ws(
          " ",
          Be,
          bt(store.name),
          G.repeat(width.store - store.name.length),
          Z,
          bt.bold(target),
          G.repeat(width.theme - target.length),
          Z,
          G,
          F.underline(url === "editor" ? editor : preview)
        )
      );
    }).True(url === "editor", (tui) => tui.Newline());
  }
  log.runtime.NL.toWrite();
  if ($2.mode.hot) {
    if ($2.mode.align) {
      log.runtime.Spinner(`Remote ${Mu} Local Merges`, { color: F });
    } else {
      log.runtime.Line("Reloads" + M, $).toWrite();
      log.runtime.Spinner("Preparing uWS Sockets", { color: F, indent: 2 });
    }
  } else if ($2.mode.align) {
    log.runtime.Spinner(`Remote ${Mu} Local Merges`, { color: F });
  }
};
runtime.hot = ({ isError = false } = {}) => {
  log.runtime.Stop();
  if (isError) {
    log.runtime.Line(`  ${Tt} ${k("server")}  ${Z}  ${k("FAILED")}`).Line(`  ${Tt} ${k("socket")}  ${Z}  ${k("FAILED")}`);
  } else {
    log.runtime.True($2.mode.align, (tui) => tui.Line("Reloads" + M, $)).Line(`  ${Be} ${yt("method")}  ${Z}  ${yt.bold(`${$2.hot.method.toUpperCase()}`)}`).Line(`  ${Be} ${yt("server")}  ${Z}  ${yt(`${$2.hot.server}`)}`).Line(`  ${Be} ${yt("socket")}  ${Z}  ${yt(`${$2.hot.socket}`)}`);
  }
};
runtime.warnings = () => {
  if (!$2.config.log.warnings) return;
  const props = keys(warnings);
  const amount = props.reduce((n, k2) => n = n + warnings[k2].length, 0);
  if (amount === 0) return;
  log.runtime.Tree("warning").Line(`${amount} ${plur("Runtime Warning", amount)}`, $);
  for (const key of props) {
    const item = warnings[key];
    if (item.length > 0) {
      const condition = item.length === amount;
      log.runtime.True(condition, (tui) => tui.Line(`${key} ${plur("Warning", item.length)}${M}`, $)).False(condition, (tui) => tui.Prepend(`${item.length} ${key} ${plur("Warning", item.length)}`, $)).Each(item, function(message) {
        this.Line(`  \uD800\uDD02 ${message}`, P);
      });
    }
  }
  log.runtime.Tree("info").Newline().toLog({ clear: true });
};
function server() {
  const assets = path2.join($2.dirs.output, "assets");
  const app = uws.uWS.App();
  app.get("/*", (response, request2) => {
    const key = request2.getUrl();
    if (key === "/") {
      response.endWithoutBody();
    } else {
      const uri2 = path2.join(assets, key);
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
      if (fsExtra.existsSync(uri2) && fsExtra.ensureFile(uri2)) {
        response.end(fsExtra.readFileSync(uri2));
      } else {
        response.endWithoutBody();
      }
    }
  }).listen($2.hot.server, (token) => {
    if (token === false) {
      console.log("Failed to listen to port " + $2.hot.server);
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
    sendPingsAutomatically: true,
    open(ws2) {
      HOT_SOCKET_TOPICS.forEach((topic) => ws2.subscribe(topic));
    },
    message(ws2, message, isBinary) {
      const string = Buffer.from(message).toString(isBinary ? "binary" : "utf8");
      if (string.startsWith("ROUTE:")) {
        $2.hot.route = JSON.parse(string.slice(6));
      } else {
        log.hot(string);
      }
    }
  });
  $2.wss = defineProperty(o2(), "http", { get() {
    return ws;
  } });
  $2.wss.alias = (json) => ws.publish("alias", `alias|${json}`);
  $2.wss.script = (uuid2, src) => ws.publish("script", `script,${src},${uuid2}`);
  $2.wss.stylesheet = (uuid2, href) => ws.publish("stylesheet", `stylesheet,${href},${uuid2}`);
  $2.wss.section = (id) => ws.publish("section", `section,${id}`);
  $2.wss.svg = (id) => ws.publish("svg", `svg,${id}`);
  $2.wss.assets = () => ws.publish("assets", "assets");
  $2.wss.reload = () => ws.publish("reload", "reload");
  $2.wss.replace = () => ws.publish("replace", "replace");
  $2.wss.disconnect = () => ws.publish("disconnect", "disconnect");
  ws.publish("connected", "connected");
  ws.listen($2.hot.socket, (token) => {
    listener = token;
    event.emit("hot:socket");
    token === false && log.error("Websocket connection failed", { suffix: "HOT" });
  });
  event.on("hot:socket", () => {
    $2.wss.alias(JSON.stringify($2.hot.alias));
  });
  event.on("hot:failed", () => {
    ws.close();
    app.close();
    uws.uWS.us_listen_socket_close(listener);
    t.hooks.delete("hot:eject");
    runtime.hot({ isError: true });
  });
  if ($2.hot.eject) {
    t("hot:eject", async function() {
      import_timer6.timer.start();
      log.ender($2.log.group);
      log.begin(`HOT ${Nu} Ejection`, { group: true });
      log.spinner("HOT snippet ejection", { color: F });
      await removeSnippetInjections().then((layouts) => {
        log.spinner.stop();
        forEach((layout) => log.line(`${au(layout)} ${at("HOT Snippet Removed")}`), layouts);
        log.nl();
        log.line(F.dim(`${$t} Exit took ~ ${import_timer6.timer.stop()}`));
        log.ender($2.log.group, { clear: false });
        i(() => {
          ws.close();
          uws.uWS.us_listen_socket_close(listener);
        });
      });
    });
  }
};

// syncify/hot/snippet.ts
function setHotOptions(injection) {
  const { hot } = $2;
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
  const source = content || fsExtra.readFileSync($2.hot.source, "utf8");
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
  }), $2.hot.cache.layouts);
  return new Promise((resolve3) => {
    themeFilesUpsert(request2).then(({ synced }) => {
      resolve3(forMap(({ filename }) => filename, synced));
    });
  });
}
async function snippet2(theme2) {
  const input = [HOT_SNIPPET_KEY, ...$2.hot.layouts.map((layout) => `layout/${layout}`)];
  const promise = new Promise((resolve3, reject) => {
    themeFilesList({ input, onError: reject }).then(({ files, errors }) => {
      if (errors.length > 0) {
        const warn2 = warnOption("HOT");
        forEach(({ filename, message }) => warn2(message, filename), errors);
      }
      const match = m2(files.map((file) => [file.filename, file.body.content]));
      const upsert = forMap((filename) => {
        if (filename === HOT_SNIPPET_KEY) {
          $2.hot.alive.snippet = match.has(filename);
          if (match.has(filename)) {
            const content = match.get(filename);
            $2.hot.alive.snippet = true;
            $2.hot.version.remote = getSnippetVersion(content);
            q2.cache.add(() => fsExtra.writeFile($2.hot.cache.snippet, content));
          }
          const source = fsExtra.readFileSync($2.hot.source, "utf8");
          return {
            filename,
            body: {
              type: "TEXT",
              value: setHotOptions(source)
            }
          };
        } else if (match.has(filename)) {
          const cache = path2.join($2.hot.cache.root, path2.basename(filename));
          const content = match.get(filename);
          const exists2 = $2.hot.alive.layouts[filename] = hasSnippetInjection(content);
          $2.hot.cache.layouts.push(cache);
          q2.cache.add(() => fsExtra.writeFile(cache, exists2 ? removeRenderTag(content) : content));
          return exists2 ? void 0 : {
            filename,
            body: {
              type: "TEXT",
              value: injectRenderSnippet(content)
            }
          };
        } else {
          $2.hot.alive.layouts[filename] = false;
        }
      }, input);
      themeFilesUpsert({ input: upsert, onError: reject }).then(() => resolve3("hot:active"));
    });
  }).then(wss);
  await promise;
}

// syncify/transform/terser/liquid.ts
function minifySchema(schema2) {
  if ($2.liquid.terse.liquid.minifySchema === false) {
    if ($2.json.useTab) {
      return JSON.stringify(schema2, null, "	".repeat($2.json.indent));
    } else {
      return JSON.stringify(schema2, null, $2.json.indent);
    }
  }
  return JSON.stringify(schema2, null, 0);
}

// syncify/transform/schema.ts
var SCHEMA_REGEX = /{%-?\s*schema/;
function SkipSchemaWithinComments(content) {
  const length = content.length;
  let searchFrom = 0;
  do {
    searchFrom = content.indexOf("endcomment", searchFrom);
    if (searchFrom === -1) return 0;
    const from = content.lastIndexOf("{%", searchFrom) + 2;
    if (from > -1) {
      const to = content.indexOf("%}", searchFrom + 10);
      if (from > -1 && /-?endcomment-?/.test(content.slice(from, to).trim())) return to + 2;
    }
  } while (searchFrom < length);
  return 0;
}
function GetSchemaTagLine(content) {
  return content.split("\n").length - 1;
}
function GetSchemaIndices(content) {
  if (!SCHEMA_REGEX.test(content)) return null;
  const fromIndex = SkipSchemaWithinComments(content);
  let start = -1;
  if (fromIndex > -1) {
    start = fromIndex + content.slice(fromIndex).search(SCHEMA_REGEX);
    if (start < 0) return null;
  }
  const begin = content.indexOf("%}", start) + 2;
  const ender = begin + content.slice(begin).search(/{%-?\s*endschema/);
  return { start, begin, ender };
}
async function ExtractSchema(file) {
  const content = await fsExtra.readFile(file.input, "utf-8");
  const indices = GetSchemaIndices(content);
  if (indices === null) return [content, null, null];
  const { begin, ender } = indices;
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
  } catch (err) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Parse error occurred in the section schema tag"
      }
    });
    err.source = content;
    error.json(err, file, GetSchemaTagLine(content.slice(0, begin)));
    return null;
  }
}
function InjectSettings(file, schema2) {
  const settings = [];
  for (let i2 = 0, s3 = schema2.length; i2 < s3; i2++) {
    if (!has("$ref", schema2[i2])) {
      settings.push(schema2[i2]);
      continue;
    }
    const [key, prop] = schema2[i2].$ref.split(".");
    if ($2.section.shared.has(key)) {
      const shared = $2.section.shared.get(key);
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
        if ($2.mode.build) {
          warn.schema(file, {
            shared: shared.uri,
            $ref: schema2[i2].$ref,
            schema: "settings",
            message: [
              `An unknown Shared Schema reference key of ${$(schema2[i2].$ref)} was provided.`,
              `There is no such key ${$(prop)} within the shared schema.`
            ]
          });
        } else {
          log.warn(`undefined $ref ${$(prop)} in ${$(key)} `, file.base);
        }
      }
    } else {
      if ($2.mode.build) {
        warn.schema(file, {
          shared: prop,
          $ref: schema2[i2].$ref,
          schema: "settings",
          message: [
            `An unknown Shared Schema file reference ${$(schema2[i2].$ref)} was provided`,
            `to ${$("settings")} within section file ${$(file.base)}. There is no known shared`,
            "schema file using that name."
          ]
        });
      } else {
        log.warn(`unknown $ref ${$(schema2[i2].$ref)} `, file.base);
      }
    }
  }
  return settings;
}
function InjectBlocks(file, schema2) {
  const blocks = [];
  for (let i2 = 0, s3 = schema2.length; i2 < s3; i2++) {
    if (has("$ref", schema2[i2])) {
      const [key, prop] = schema2[i2].$ref.split(".");
      if ($2.section.shared.has(key)) {
        const shared = $2.section.shared.get(key);
        if (has(prop, shared.schema)) {
          if (isArray(shared.schema[prop])) {
            blocks.push(...shared.schema[prop]);
          } else {
            blocks.push(shared.schema[prop]);
          }
        } else {
          if ($2.mode.build) {
            warn.schema(file, {
              shared: prop,
              $ref: schema2[i2].$ref,
              schema: "blocks",
              message: [
                `An unknown Shared Schema key reference of ${$(schema2[i2].$ref)} was provided`,
                `to the ${$("blocks")} within section file ${$(file.base)}. The shared schema`,
                `file exists, but the key ${$(prop)} does not.`
              ]
            });
          } else {
            log.warn(`undefined $ref ${$(prop)} in ${$(key)} `, file.base);
          }
        }
      } else {
        if ($2.mode.build) {
          warn.schema(file, {
            shared: prop,
            $ref: schema2[i2].$ref,
            schema: "blocks",
            message: [
              `An unknown Shared Schema file reference ${$(schema2[i2].$ref)} was provided`,
              `to ${$("blocks")} within section file ${$(file.base)}. There is no known shared`,
              "schema file using that name."
            ]
          });
        } else {
          log.warn(`unknown $ref ${$(schema2[i2].$ref)} `, file.base);
        }
      }
    } else {
      const block = {};
      for (const prop in schema2[i2]) {
        if (prop !== "settings") block[prop] = schema2[i2][prop];
      }
      if (block.type === "@theme" || block.type === "@app") {
        blocks.push(block);
        continue;
      }
      block.settings = [];
      if (has("settings", schema2[i2])) {
        for (const setting of schema2[i2].settings) {
          if (has("$ref", setting)) {
            const [key, prop] = setting.$ref.split(".");
            if ($2.section.shared.has(key)) {
              const shared = $2.section.shared.get(key);
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
                if ($2.mode.build) {
                  warn.schema(file, {
                    shared: prop,
                    $ref: schema2[i2].$ref,
                    schema: `blocks ${Z} settings`,
                    message: [
                      `An unknown Shared Schema key reference of ${$(schema2[i2].$ref)} was provided`,
                      `to the ${$("blocks")} schema id ${$(setting.id)} within section file`,
                      `${$(file.base)}. The shared schema file exists, but the key ${$(prop)} does not.`
                    ]
                  });
                } else {
                  log.warn(`undefined $ref ${$(prop)} in ${$(key)} `, file.base);
                }
              }
            } else {
              if ($2.mode.build) {
                warn.schema(file, {
                  shared: prop,
                  $ref: schema2[i2].$ref,
                  schema: `blocks ${Z} settings`,
                  message: [
                    `An unknown Shared Schema file reference ${$(schema2[i2].$ref)} was provided`,
                    `to ${$("blocks")} schema id ${$(setting.id)} within section file ${$(file.base)}.`,
                    "There is no known shared schema file using that name."
                  ]
                });
              } else {
                log.warn(`unknown $ref ${$(setting.$ref)} `, file.base);
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
    if (has(file.input, $2.cache.schema) && $2.cache.checksum[file.input] === hash && $2.section.shared.has(file.name)) {
      return $2.section.shared.get(file.name);
    }
    ;
    $2.cache.checksum[file.input] = hash;
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
    return $2.section.shared.set(file.name, { uri: file.input, schema: schema2 }).get(file.name);
  } catch (e3) {
    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: "JSON Syntax error in shared schema file"
      }
    });
    error.json(e3, file);
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
  for (let i2 = 0, s3 = sections.length; i2 < s3; i2++) {
    sections[i2].value = await CreateSection(sections[i2]);
  }
  return sections;
}
async function SchemaTransform(file) {
  const shared = await ParseSharedSchema(file);
  if (shared === null) return null;
  const schemas = toArray($2.cache.schema[shared.uri]);
  const sections = await pMap(schemas, (p2) => {
    return defineProperty(file.data(p2), "data", {
      get() {
        return $2.cache.sections[p2];
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
  if ($2.mode.hot && $2.mode.bulk === false) {
    for (const section2 of files) {
      if (file.type === 5 /* Section */) {
        $2.wss.section(section2.name);
      } else if (section2.type !== 12 /* Script */ && section2.type !== 11 /* Style */) {
        await q2.http.onIdle().then(() => $2.wss.replace());
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
  return $2.liquid.terse.markup.removeComments ? content.replace(LiquidBlockComments, "").replace(LiquidLineComments, "") : content;
}
function minifyLiquidTag(content) {
  return content.replace(LiquidTag, (tag) => "\n" + tag.replace(/#.*?$/gm, "") + "\n");
}
function minifySchema2(file, content) {
  if (!$2.liquid.terse.liquid.minifySchema) return removeComments(content);
  const open = content.search(/{%-?\s*schema/);
  if (open > -1) {
    const begin = content.indexOf("%}", open + 2) + 2;
    const start = content.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);
    if (ender > -1) {
      const parse10 = JSON.parse(content.slice(begin, ender));
      const minified = JSON.stringify(parse10, null, 0);
      const schema2 = content.slice(0, begin) + minified + content.slice(ender);
      return removeComments(schema2);
    }
    log.invalid(file.relative);
  }
  return removeComments(content);
}
function removeDashes(content) {
  if (!$2.liquid.terse.liquid.stripTrims) return content;
  return content;
}
async function htmlMinify(file, content) {
  try {
    const htmlmin = await $import.terser.minify(content, $2.liquid.terse.markup);
    return htmlmin;
  } catch (e3) {
    log.error(file.relative, {
      notify: {
        title: "Parse Error",
        message: `Terse minification error in ${file.base}`
      }
    });
    error.terser(file, e3);
    return null;
  }
}
async function transform(file, data) {
  if (!$2.mode.terse) {
    fsExtra.writeFile(file.output, data).catch(
      error.write("Error writing liquid file to output", {
        input: file.relative,
        output: path2.relative($2.cwd, file.output)
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
        output: path2.relative($2.cwd, file.output)
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
  if ($2.mode.watch) import_timer7.timer.start();
  let input = await fsExtra.readFile(file.input, "utf-8");
  if ($2.mode.hot && $2.hot.layouts.includes(file.base)) {
    input = injectRenderSnippet(input);
  }
  if (file.type === 5 /* Section */ || file.type === 3 /* Block */) {
    input = await CreateSection(file);
    if (input === null) return null;
  }
  file.size = byteSize(input);
  file.value = await transform(file, input);
  if ($2.mode.build) return file.value;
  if (file.type !== 11 /* Style */ && $2.processor.tailwind.map !== null) {
    await tailwindParse(file).then(themeFilesUpsertMap);
  } else {
    log.syncing(file.key, { hot: $2.mode.hot });
    await themeFilesUpsertMap(file);
  }
  if ($2.mode.hot) {
    if ($2.mode.bulk === false) {
      if (file.type === 5 /* Section */) {
        $2.wss.alias(JSON.stringify($2.hot.alias));
        $2.wss.section(file.name);
      } else {
        await q2.http.onIdle().then(() => $2.wss.replace());
      }
    } else {
      await q2.http.onIdle().then(() => $2.wss.replace());
    }
  }
  return file.value;
}
var import_timer8 = __toESM(require_dist());
async function esbuildBundle(bundle) {
  bundle.watch.clear();
  const result = await esbuild__default.default.build(bundle.esbuild);
  if ($2.mode.terse && $2.mode.build) {
    bundle.size = byteSize(result.outputFiles[0].text);
  }
  if ($2.mode.watch) {
    await getWatchPaths(bundle, result.metafile.inputs);
  } else {
    if (!bundle.watch.has(bundle.input)) bundle.watch.add(bundle.input);
    if ($2.paths.assets.match(bundle.input)) $2.paths.assets.exclude.add(bundle.input);
  }
}
async function getWatchPaths(bundle, inputs) {
  const { cwd: cwd2, mode } = $2;
  for (const file in inputs) {
    if (file.includes("/node_modules/")) continue;
    const path5 = path2.join(cwd2, file);
    if (!bundle.watch.has(path5)) bundle.watch.add(path5);
    if (mode.watch) ;
    if ($2.paths.assets.match(bundle.input)) $2.paths.assets.exclude.add(bundle.input);
  }
  if (mode.watch) {
    await pNext().then(() => {
      for (const path5 of bundle.watch) {
        if (path5.includes("/node_modules/")) continue;
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
  const { hot, watch, terse, bulk: bulk2, build } = $2.mode;
  if (watch) import_timer8.timer.start();
  if (hot) import_timer8.timer.start(file.uuid);
  const files = await pMap(file.data, async (bundle) => {
    const { key, input, output, snippet: snippet3, attrs, esbuild: { format: format2 } } = bundle;
    const { metafile, outputFiles, warnings: warnings2 } = await esbuild__default.default.build(bundle.esbuild);
    if (file.data.length > 1) {
      log.nl().line(path2.relative($2.cwd, input));
    }
    if ($2.mode.watch) {
      await getWatchPaths(bundle, metafile.inputs);
    }
    if (warnings2.length > 0) {
      warn.esbuild(warnings2);
    }
    for (const { text, path: path5 } of outputFiles) {
      if (path5.endsWith(".map")) {
        const map = path2.join($2.dirs.sourcemaps.scripts, `${file.base}.map`);
        q2.tasks.add(() => fsExtra.writeFile(map, text).catch(
          error.write("Error writing JavaScript Source Map to cache", {
            output: $2.dirs.sourcemaps.scripts,
            source: file.relative
          })
        ));
      } else {
        if (terse) {
          if (isNaN(bundle.size)) {
            log.transform(file.kind, `${$(format2.toUpperCase())} bundle`);
            log.minified(stringSize(text));
          } else {
            const size = sizeDiff(text, bundle.size);
            log.transform(`${$(format2.toUpperCase())} bundle ${Z} ${$(stringSize(text))}`);
            log.minified(null, size.before, size.after, size.saved);
          }
        } else {
          log.transform(`${$(format2.toUpperCase())} bundle ${Z} ${$(stringSize(text))}`);
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
          hot && $2.wss.script(file.uuid, path2.basename(key));
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
    const before = `${F(`<${He("path")}>`)}`;
    const after = `${se(`<${He("path")} />`)}`;
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
    if ($2.mode.watch) import_timer9.timer.start();
    file.kind = "Sprite" /* Sprite */;
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = path2.join("snippets", renameFile(file, config.rename));
      file.output = path2.join($2.dirs.output, file.key);
    } else {
      file.key = path2.join("assets", renameFile(file, config.rename));
      file.output = path2.join($2.dirs.output, file.key);
    }
    const options = config.svgo === true ? $2.processor.svgo : config.svgo;
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
      } catch (e3) {
        log.error(file.relative, {
          notify: {
            title: "Transform Error",
            message: `SVGO failed to optimize ${file.key}`
          }
        });
        error.throw(e3, {
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
      if ($2.mode.build) return file;
      await themeFilesUpsertMap(file);
    }
  }
  return run;
}
function compileInline(context) {
  const file = assign({}, context);
  async function run(config) {
    if ($2.mode.watch) import_timer9.timer.start();
    if (config.snippet) {
      file.namespace = "snippets" /* Snippets */;
      file.key = path2.join("snippets", renameFile(file, config.rename));
      file.output = path2.join($2.dirs.output, file.key);
    } else {
      file.key = path2.join("assets", renameFile(file, config.rename));
      file.output = path2.join($2.dirs.output, file.key);
    }
    const options = config.svgo === true ? $2.processor.svgo : config.svgo;
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
    } catch (e3) {
      log.error(file.relative, {
        notify: {
          title: "Transform Error",
          message: `SVGO failed to optimize ${file.key}`
        }
      });
      error.throw(e3, {
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
    if ($2.mode.build) return file;
    await themeFilesUpsertMap(file);
  }
  return run;
}
async function SvgTransform(file) {
  if ($2.mode.watch) import_timer9.timer.start();
  const sprite = compileSprite(file);
  const inline = compileInline(file);
  const length = file.data.length;
  for (let i2 = 0; i2 < length; i2++) {
    const config = file.data[i2];
    if (i2 > 0 && $2.mode.watch) {
      log.changed(file);
    }
    if (config.format === "sprite") {
      await sprite(config);
    } else if (config.format === "file") {
      await inline(config);
    }
  }
}

// syncify/mode/build.ts
function getGlobs() {
  const paths = [];
  for (const p2 in $2.paths) if ($2.paths[p2].input) paths.push(...$2.paths[p2].input.values());
  paths.push(...$2.script.map(({ input }) => input));
  paths.push(...$2.style.map(({ input }) => input));
  paths.push(...$2.svg.flatMap(({ input }) => toArray(input)));
  return paths;
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
  const write2 = Ft().Prefix("version", `  ${$2.vc.number}`, $).Template({ id: "processed", prefix: true }).Template({ id: "bundled", prefix: true }).Template({ id: "skipped", prefix: true }).toUpdate().Template({ id: "duration", prefix: true }).Template({ id: "warnings", prefix: true }).Template({ id: "errors", prefix: true }).Newline().Template("Building", { id: "build", dash: true, color: F }).Newline().Template({ id: "svg", prefix: true }).Template({ id: "layouts", prefix: true }).Template({ id: "templates", prefix: true }).Template({ id: "blocks", prefix: true }).Template({ id: "sections", prefix: true }).Template({ id: "snippets", prefix: true }).Template({ id: "locales", prefix: true }).Template({ id: "configs", prefix: true }).Template({ id: "assets", prefix: true }).Template({ id: "styles", prefix: true }).Template({ id: "scripts", prefix: true });
  return {
    write: write2,
    update: (report) => write2.Update("processed", `  ${$(`${report.stats.total}`)} files`).Update("bundled", `  ${$(`${report.stats.bundled}`)} files`).Update("skipped", `  ${$(`${report.stats.skipped}`)} files`).Update("duration", `  ${w.numbers(import_timer10.timer.now("build"), $)}`).Update("warnings", `  ${$(`${$2.warnings.size}`)}`).Update("errors", `  ${$(`${report.stats.errors}`)}`).toUpdate()
  };
}
async function Build() {
  $2.running = true;
  import_timer10.timer.start("build");
  const { write: write2, update } = getLogs();
  const stderr2 = Ft({ type: "error" });
  const hasFilter = isEmpty($2.filters) === false;
  const globs = await glob__default.default("**", { absolute: true, cwd: $2.dirs.input });
  const report = getModel(globs);
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
      } catch (e3) {
        report.stats.errors += 1;
        stderr2.Line(e3.message);
        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          time: import_timer10.timer.stop(file.uuid),
          error: e3.message
        };
      }
    };
  }
  async function bundle(group, fn2) {
    const filter = hasFilter && has(group, $2.filters) ? $2.filters[group] : null;
    if (filter && filter.includes(group) === false) return 0;
    const record = report[group];
    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn2), { stopOnError: true });
    record.time = import_timer10.timer.stop(group);
    const files = record.report.length;
    const before = files > 100 ? " " : "  ";
    const count = before + $(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? "  " : " ";
    update(report).Update(group, `${count} ${plur("file", files)}${space}${at(record.time)}`);
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
  if ($2.mode.publish === false) {
    write2.Update("build", "Build").NL.Dash("Caching", F).NL.toUpdate({ clear: true, trim: true }).Stop().Spinner("Saving Cache", { color: bu, style: "spinning" });
    await saveCache();
    write2.Stop().Update("cache", "Cached").Append(`${$2.dirs.cache}`, F).toUpdate();
    if ($2.warnings.size > 0) {
      write2.Dash("Warnings", F).Newline();
      let group;
      let count = 0;
      for (const err of $2.warnings.keys()) {
        for (const [processor2, warnings2] of $2.warnings.get(err)) {
          count = count + 1;
          if (group !== processor2) {
            group = processor2;
          } else {
            write2.Ruler();
          }
          write2.Warn(`${$("WARNING")} ${vu}${$(`${count}`)}`, P).Newline("yellow").Warn(group, P).Each(toArray(warnings2), function(item) {
            this.Insert(item).Break();
          });
        }
      }
      write2.toUpdate().Newline();
    } else {
      write2.toUpdate();
    }
    write2.End($2.log.group).BR.toUpdate();
    i.exit(0);
  }
}

// syncify/mode/doctor.ts
function Doctor() {
  Ft().Header("Syncify Doctor \uD83E\uDE7A", $).Wrap(F, "Doctor mode will attempt to diagnose and treat configuration issues.").Template({ id: "version", prefix: true }).Template({ id: "caches", prefix: true }).Template({ id: "credentials", prefix: true }).Template({ id: "projects", prefix: true }).Template({ id: "installation", prefix: true }).Template({ id: "location", prefix: true }).Template({ id: "structure", prefix: true }).toLog();
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
function normalize2(packageJson) {
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
    data = normalize2(data);
  }
  return { filePath, data, options };
}

// node_modules/.pnpm/write-package@7.1.0/node_modules/write-package/source/write-package.js
async function writePackage(filePath, data, options) {
  ({ filePath, data, options } = sanitize(filePath, data, options));
  return writeJsonFile(filePath, data, options);
}

// node_modules/.pnpm/parse-json@8.3.0/node_modules/parse-json/index.js
var import_code_frame = __toESM(require_lib4(), 1);

// node_modules/.pnpm/index-to-position@1.1.0/node_modules/index-to-position/index.js
function getPosition(text, textIndex) {
  const lineBreakBefore = textIndex === 0 ? -1 : text.lastIndexOf("\n", textIndex - 1);
  return {
    line: lineBreakBefore === -1 ? 0 : text.slice(0, lineBreakBefore + 1).match(/\n/g).length,
    column: textIndex - lineBreakBefore - 1
  };
}
function indexToPosition(text, textIndex, { oneBased = false } = {}) {
  if (typeof text !== "string") {
    throw new TypeError("Text parameter should be a string");
  }
  if (!Number.isInteger(textIndex)) {
    throw new TypeError("Index parameter should be an integer");
  }
  if (textIndex < 0 || textIndex > text.length) {
    throw new RangeError("Index out of bounds");
  }
  const position = getPosition(text, textIndex);
  return oneBased ? { line: position.line + 1, column: position.column + 1 } : position;
}

// node_modules/.pnpm/parse-json@8.3.0/node_modules/parse-json/index.js
var getCodePoint = (character) => `\\u{${character.codePointAt(0).toString(16)}}`;
var _input, _jsonParseError, _message, _codeFrame, _rawCodeFrame, _JSONError_instances, getCodeFrame_fn;
var _JSONError = class _JSONError extends Error {
  constructor(messageOrOptions) {
    var __super = (...args) => {
      super(...args);
      __privateAdd(this, _JSONError_instances);
      __publicField(this, "name", "JSONError");
      __publicField(this, "fileName");
      __privateAdd(this, _input);
      __privateAdd(this, _jsonParseError);
      __privateAdd(this, _message);
      __privateAdd(this, _codeFrame);
      __privateAdd(this, _rawCodeFrame);
      return this;
    };
    var _a14;
    if (typeof messageOrOptions === "string") {
      __super();
      __privateSet(this, _message, messageOrOptions);
    } else {
      const { jsonParseError, fileName, input } = messageOrOptions;
      __super(void 0, { cause: jsonParseError });
      __privateSet(this, _input, input);
      __privateSet(this, _jsonParseError, jsonParseError);
      this.fileName = fileName;
    }
    (_a14 = Error.captureStackTrace) == null ? void 0 : _a14.call(Error, this, _JSONError);
  }
  get message() {
    __privateGet(this, _message) ?? __privateSet(this, _message, `${addCodePointToUnexpectedToken(__privateGet(this, _jsonParseError).message)}${__privateGet(this, _input) === "" ? " while parsing empty string" : ""}`);
    const { codeFrame } = this;
    return `${__privateGet(this, _message)}${this.fileName ? ` in ${this.fileName}` : ""}${codeFrame ? `

${codeFrame}
` : ""}`;
  }
  set message(message) {
    __privateSet(this, _message, message);
  }
  get codeFrame() {
    __privateGet(this, _codeFrame) ?? __privateSet(this, _codeFrame, __privateMethod(this, _JSONError_instances, getCodeFrame_fn).call(
      this,
      /* highlightCode */
      true
    ));
    return __privateGet(this, _codeFrame);
  }
  get rawCodeFrame() {
    __privateGet(this, _rawCodeFrame) ?? __privateSet(this, _rawCodeFrame, __privateMethod(this, _JSONError_instances, getCodeFrame_fn).call(
      this,
      /* highlightCode */
      false
    ));
    return __privateGet(this, _rawCodeFrame);
  }
};
_input = new WeakMap();
_jsonParseError = new WeakMap();
_message = new WeakMap();
_codeFrame = new WeakMap();
_rawCodeFrame = new WeakMap();
_JSONError_instances = new WeakSet();
getCodeFrame_fn = function(highlightCode) {
  if (!__privateGet(this, _jsonParseError)) {
    return;
  }
  const input = __privateGet(this, _input);
  const location = getErrorLocation(input, __privateGet(this, _jsonParseError).message);
  if (!location) {
    return;
  }
  return (0, import_code_frame.codeFrameColumns)(input, { start: location }, { highlightCode });
};
var JSONError = _JSONError;
var getErrorLocation = (string, message) => {
  const match = message.match(/in JSON at position (?<index>\d+)(?: \(line (?<line>\d+) column (?<column>\d+)\))?$/);
  if (!match) {
    return;
  }
  const { index, line, column } = match.groups;
  if (line && column) {
    return { line: Number(line), column: Number(column) };
  }
  return indexToPosition(string, Number(index), { oneBased: true });
};
var addCodePointToUnexpectedToken = (message) => message.replace(
  // TODO[engine:node@>=20]: The token always quoted after Node.js 20
  /(?<=^Unexpected token )(?<quote>')?(.)\k<quote>/,
  (_2, _quote, token) => `"${token}"(${getCodePoint(token)})`
);
function parseJson2(string, reviver, fileName) {
  try {
    return JSON.parse(string, reviver);
  } catch (error2) {
    throw new JSONError({
      jsonParseError: error2,
      fileName,
      input: string
    });
  }
}

// node_modules/.pnpm/read-pkg@9.0.1/node_modules/read-pkg/index.js
var import_normalize_package_data = __toESM(require_normalize(), 1);
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? node_url.fileURLToPath(urlOrPath) : urlOrPath;
}

// node_modules/.pnpm/read-pkg@9.0.1/node_modules/read-pkg/index.js
var getPackagePath = (cwd2) => path2__default.default.resolve(toPath(cwd2) ?? ".", "package.json");
var _readPackage = (file, normalize3) => {
  const json = typeof file === "string" ? parseJson2(file) : file;
  if (normalize3) {
    (0, import_normalize_package_data.default)(json);
  }
  return json;
};
async function readPackage({ cwd: cwd2, normalize: normalize3 = true } = {}) {
  const packageFile = await fsPromises2__default.default.readFile(getPackagePath(cwd2), "utf8");
  return _readPackage(packageFile, normalize3);
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
function defaultFilterValues(values2, meta) {
  return values2.filter((value) => value !== void 0);
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
function mergeRecords$1(values2, utils, meta) {
  const result = {};
  for (const key of getKeys(values2)) {
    const propValues = [];
    for (const value of values2) {
      if (objectHasProperty(value, key)) {
        propValues.push(value[key]);
      }
    }
    if (propValues.length === 0) {
      continue;
    }
    const updatedMeta = utils.metaDataUpdater(meta, {
      key,
      parents: values2
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
function mergeArrays$1(values2) {
  return values2.flat();
}
function mergeSets$1(values2) {
  return new Set(getIterableOfIterables(values2));
}
function mergeMaps$1(values2) {
  return new Map(getIterableOfIterables(values2));
}
function mergeOthers$1(values2) {
  return values2.at(-1);
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
function mergeUnknowns(values2, utils, meta) {
  var _a14;
  const filteredValues = ((_a14 = utils.filterValues) == null ? void 0 : _a14.call(utils, values2, meta)) ?? values2;
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
function mergeRecords(values2, utils, meta) {
  const result = utils.mergeFunctions.mergeRecords(values2, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords) {
    return utils.defaultMergeFunctions.mergeRecords(values2, utils, meta);
  }
  return result;
}
function mergeArrays(values2, utils, meta) {
  const result = utils.mergeFunctions.mergeArrays(values2, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays) {
    return utils.defaultMergeFunctions.mergeArrays(values2);
  }
  return result;
}
function mergeSets(values2, utils, meta) {
  const result = utils.mergeFunctions.mergeSets(values2, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets) {
    return utils.defaultMergeFunctions.mergeSets(values2);
  }
  return result;
}
function mergeMaps(values2, utils, meta) {
  const result = utils.mergeFunctions.mergeMaps(values2, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps) {
    return utils.defaultMergeFunctions.mergeMaps(values2);
  }
  return result;
}
function mergeOthers(values2, utils, meta) {
  const result = utils.mergeFunctions.mergeOthers(values2, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === void 0 && utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers) {
    return utils.defaultMergeFunctions.mergeOthers(values2);
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
    package_ = normalize2(package_);
  }
  return writeJsonFile(filePath, package_, options);
}
async function getPkg(cwd2) {
  const path5 = $2.file.pkg;
  if (await fsExtra.pathExists(path5)) {
    try {
      const read = await fsExtra.readFile(path5, "utf8");
      const json$1 = json.parse(read);
      if (isString(cwd2) && cwd2 !== $2.cwd) return json$1;
      $2.pkg = json$1;
      return json$1;
    } catch (e3) {
      throw error.json(e3, parsePackageJson(path5));
    }
  } else {
    if ($2.file.project !== null && $2.project.targetSource === "package.json") $2.project.targetSource = null;
  }
}
async function setPkg(json, cwd2) {
  try {
    if (cwd2) ; else {
      if ($2.pkg === null) {
        await writePackage($2.file.pkg, json, {
          indent: $2.json.useTab ? "	" : $2.json.indent
        });
      } else {
        await updatePackage($2.file.pkg, json);
      }
      return getPkg();
    }
  } catch (e3) {
    throw error.json(e3, parsePackageJson($2.file.pkg));
  }
}
async function setPkgVersion(current, version) {
  try {
    if ($2.pkg.version === version) {
      await setPkg({ version });
      return true;
    } else {
      return false;
    }
  } catch (e3) {
    throw new Error(e3);
  }
}
async function hasTemplateMismatch(cwd2) {
  const files = await glob.glob("templates/*", { cwd: cwd2, absolute: true });
  const exclude = s2();
  const exists2 = s2();
  for (const file of files) {
    const { name: name2 } = path2.parse(file);
    const templates = files.filter((path5) => path2.parse(path5).name === name2);
    if (templates.length > 1 && !exists2.has(name2)) exists2.add(name2);
  }
  if (exists2.size === 0) return 1 /* None */;
  if (exists2.size > 1) {
    log.write(`${$(`${exists2.size}`)} mismatch template files`, {
      suffix: "error",
      type: "error"
    });
  } else {
    log.write(`${$(`${exists2.size}`)} mismatch template file`, {
      suffix: "error",
      type: "error"
    });
  }
  const resume = log.prompt(`select ${$(".json")} or ${$(".liquid")} template`, {
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
    for (const name2 of exists2) {
      choices.push({
        name: "choice",
        type: "toggle",
        message: "templates",
        hint: " ",
        active: `${name2}.json`,
        inactive: `${name2}.liquid`,
        onState: ({ value }) => {
          if (value) {
            exclude.add(path2.join(cwd2, "templates", `${name2}.liquid`));
          } else {
            exclude.add(path2.join(cwd2, "templates", `${name2}.json`));
          }
        }
      });
    }
    await prompts(choices).then(() => resume());
    return exclude;
  } else if (action === "json") {
    for (const name2 of exists2) {
      exclude.add(path2.join(cwd2, "templates", `${name2}.json`));
    }
    resume();
    return exclude;
  } else if (action === "liquid") {
    for (const name2 of exists2) {
      exclude.add(path2.join(cwd2, "templates", `${name2}.liquid`));
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
    throws("Empty output directory", [
      `There are no files within ${bu(path2.relative($2.cwd, $2.dirs.output) + "/**")}`,
      `You may need to run the ${bu.bold("syncify build")} command and try again.`
    ]);
  }
}

// syncify/mode/pack.ts
async function Pack() {
  await $import("adm-zip");
  $2.running = true;
  let { themeVersion } = $2.project;
  import_timer11.timer.start("export");
  if ($2.mode.build) {
    log.group("Build");
    await Build();
  } else {
    isEmptyOutputDir($2.stats);
  }
  const validate = await hasTemplateMismatch($2.dirs.output);
  if (validate === 2 /* Cancel */) return;
  if (validate === 1 /* None */) {
    if ($2.mode.build) import_timer11.timer.stop("build");
  }
  log.group("Packing");
  log.nl();
  if (!await fsExtra.pathExists($2.cwd)) {
    await fsExtra.mkdir($2.cwd);
  }
  const zip = new $import.admzip();
  for (const [, dir] of THEME_PATHS) {
    const uri2 = path2.join($2.dirs.output, dir);
    const has2 = await fsExtra.pathExists(uri2);
    if (has2) {
      const files = await glob.glob("*", { cwd: uri2, absolute: true });
      for (const file of files) {
        const path5 = `${dir}/${path2.basename(file)}`;
        const stat2 = fsExtra.statSync(file);
        if (stat2.size === 0) {
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
  if ($2.vc.update !== null) {
    if (!await fsExtra.pathExists($2.vc.update.dir)) await fsExtra.mkdir($2.vc.update.dir);
    log.version($2.vc, "bump");
    log.zipped(stringSize(size), path2.relative($2.cwd, $2.vc.update.zip));
    try {
      await zip.writeZipPromise($2.vc.update.zip);
      themeVersion = $2.vc.update.number;
    } catch (e3) {
      return error.throw(e3, {
        file: $2.vc.zip,
        details: "Failed to write zip file"
      });
    }
  } else {
    if (!await fsExtra.pathExists($2.vc.dir)) {
      await fsExtra.mkdir($2.vc.dir);
      log.version($2.vc, "created");
    } else {
      log.version($2.vc, "overwrite");
    }
    log.zipped(stringSize(size), path2.relative($2.cwd, $2.vc.zip));
    try {
      await zip.writeZipPromise($2.vc.zip);
    } catch (e3) {
      return error.throw(e3, {
        file: $2.vc.zip,
        details: "Failed to write zip file"
      });
    }
  }
  if ($2.pkg.version !== themeVersion) {
    const bump = await setPkgVersion($2.pkg.version, themeVersion);
    if (bump) {
      log.process("package.json", "version bumped");
      $2.project.themeVersion = themeVersion;
      await saveCache("build");
    } else {
      log.warn("package.json version failed to bump", "manual increment required");
    }
  }
  import_timer11.timer.stop("export");
  if ($2.mode.publish === false) {
    log.group();
    log.nl("");
    process.exit(0);
  }
}

// syncify/mode/publish.ts
var import_timer12 = __toESM(require_dist());
async function Publish() {
  $2.running = true;
  await Pack();
  import_timer12.timer.start("publish");
  const stdout3 = Ft().Header("Publishing Theme");
  const progress = log.progress(300);
  event.on("publish:progress", ({ task, step }) => {
    progress.increment(step);
    log.update(
      stdout3.Header(task, F).Insert(progress.render()).toString()
    );
  });
  const hasThemes = $2.target.length > 0;
  for (const target of $2.target) {
    const { id } = await request.publish(target.store);
    console.log(id);
    if (hasThemes) {
      const syncify2 = $2.pkg.syncify;
      if (isObject(syncify2.stores)) {
        if (target.store.domain.startsWith(syncify2.stores.domain)) {
          for (const target2 in syncify2.stores.themes) {
            if (syncify2.stores.themes[target2] === -1) {
              syncify2.stores.themes[target2] = id;
            }
          }
        }
        $2.pkg.syncify = syncify2;
        await setPkg($2.pkg);
      }
    }
  }
  i.exit(0);
}
var import_timer13 = __toESM(require_dist());
async function setAlignMerge() {
  if (!$2.mode.align) return;
  const state = {
    count: 0,
    total: 0,
    create: m2(),
    update: m2(),
    skipped: []
  };
  await q2.cache.onIdle();
  const output = outputFile($2.dirs.output);
  const list = await themeFilesList({
    target: $2.target.default,
    input: [
      "config/*.json",
      "locales/*.json",
      "templates/index.json",
      "templates/customers/*.json",
      "templates/metaobject/*.json",
      "sections/*.json"
    ]
  });
  state.total = list.files.length;
  const print = (filename) => g.nl(
    `${++state.count} of ${state.total} files`,
    o.trim,
    o.line + F(filename)
  );
  log.runtime.True(list.files.length > 10, (tui) => tui.Spinner(`${state.count} of ${state.total} files`));
  for (const { filename, body } of list.files) {
    await delay(85);
    log.runtime.Spinner(print(filename));
    const splitDir = filename.split("/");
    splitDir.pop();
    splitDir.length > 1 ? splitDir.pop() : splitDir[0];
    const file = output(filename);
    if (file.input) {
      const read = await fsExtra.readFile(file.input, "utf-8");
      const json$1 = json.evaluate(read, body.content, $2.json.options);
      if (json$1.change) {
        file.value = json$1.string;
        state.update.set(filename, file);
        await fsExtra.writeFile(file.input, file.value).then(() => {
          state.update.set(filename, file);
        }).catch(error.write("Error writing file during alignment", {
          input: file.input,
          output: file.output
        })).then(() => state.update.set(filename, file));
      } else {
        state.skipped.push(file);
      }
    }
  }
  log.runtime.True($2.mode.hot, (tui) => tui.Spinner("Preparing HOT Reloads")).False($2.mode.hot, (tui) => tui.Stop());
}
async function Pull() {
  $2.running = true;
  if ($2.mode.align) return setAlignMerge();
  log.spinner("0 Files", { style: "spinning", color: I });
  const state = {
    write: Ft(),
    count: 0,
    total: 0,
    interval: null,
    progress: null,
    files: {
      create: [],
      update: [],
      stash: [],
      writes: m2()
    }
  };
  function interval() {
    if (state.interval !== null) {
      clearInterval(state.interval);
      state.interval = null;
    }
    state.interval = setInterval(() => {
      state.write.Update("elapsed", w.numbers(import_timer13.timer.now("pull"), $)).Update("pulled", `${$(state.count)} of ${$(state.total)}`).Update("created", $(state.files.create.length)).Update("updated", $(state.files.update.length)).Update("stashed", $(state.files.stash.length)).Update("progress", state.progress.render()).toUpdate();
    }, 100);
  }
  const remote = await themeFilesMap($2.target.default, (n) => log.spinner.update(`${n} Files`));
  const output = outputFile($2.dirs.output);
  log.spinner.stop();
  import_timer13.timer.start("pull");
  state.total = remote.total;
  state.progress = Io(remote.total, {
    prepend: null,
    clearOnComplete: false
  });
  state.write.Append($2.target.default.store.domain, $).Template({ prefix: true, id: "elapsed", color: I }).Template({ prefix: true, id: "pulled", color: I }).Template({ prefix: true, id: "created", color: I }).Template({ prefix: true, id: "updated", color: I }).Template({ prefix: true, id: "stashed", color: I }).Newline().Template({ id: "progress" });
  interval();
  for (const directory in remote.files) {
    const items = remote.files[directory];
    for (const input of getChunk(items, 40)) {
      const { files } = await themeFilesList({
        input,
        target: $2.target.default
      });
      state.count += input.length;
      state.progress.increment(input.length);
      for (const item of files) {
        const splitDir = item.filename.split("/");
        splitDir.pop();
        splitDir.length > 1 ? splitDir.pop() : splitDir[0];
        const file = output(item.filename);
        file.value = file.kind === "JSON" /* JSON */ ? json.format(item.body.content, $2.json.options) : item.body.content;
        if (file.input) {
          if (await fsExtra.pathExists(file.input)) {
            state.files.update.push(file);
          } else {
            state.files.create.push(file);
          }
        } else {
          if (!state.files.writes.has(directory)) {
            state.files.writes.set(directory, [file]);
          } else {
            state.files.writes.get(directory).push(file);
          }
          state.files.stash.push(file);
        }
      }
    }
  }
  clearInterval(state.interval);
  state.interval = null;
  for (const [dir, files] of state.files.writes) {
    const base = path2.join($2.dirs.input, dir);
    await fsExtra.ensureDir(base);
    for (const file of files) {
      file.input = path2.join(base, file.base);
      console.log(file.input);
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
          `Missing ${Fu.bold(prop)} property key value in a ${P.bold("metafields")}`,
          "value in frontmatter. Frontmatter metafields require you provide the following keys:",
          "",
          `${F("-")} ${He("key")}`,
          `${F("-")} ${He("type")}`,
          `${F("-")} ${He("value")}`,
          `${F("-")} ${He("namespace")}`,
          "",
          `${F("Update the metafield entry to include")} ${He(prop)}`
        ]);
        return false;
      }
      if (prop === "type") {
        const type2 = metafield[prop];
        if (!checkMetafieldType(type2)) {
          log.invalid(file.relative, [
            `Invalid type ${Fu.bold(type2)} provided in frontmatter ${P.bold("metafields")}`,
            `value. Frontmatter metafields ${$("must")} be one of following types:`,
            "",
            `${F("-")} ${He("boolean")}`,
            `${F("-")} ${He("color")}`,
            `${F("-")} ${He("date")}`,
            `${F("-")} ${He("date_time")}`,
            `${F("-")} ${He("dimension")}`,
            `${F("-")} ${He("json")}`,
            `${F("-")} ${He("money")}`,
            `${F("-")} ${He("multi_line_text_field")}`,
            `${F("-")} ${He("number_decimal")}`,
            `${F("-")} ${He("number_integer")}`,
            `${F("-")} ${He("rating")}`,
            `${F("-")} ${He("rich_text_field")}`,
            `${F("-")} ${He("single_line_text_field")}`,
            `${F("-")} ${He("url")}`,
            `${F("-")} ${He("volume")}`,
            `${F("-")} ${He("weigh")}`,
            "",
            `${F("Update the metafield entry to an accepted")} ${He("type")}`
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
  return new turndown.Turndown($2.page.import).use(turndown.GithubFlavor).turndown(content);
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
      log.warn(`handle ${Nu} ${before} ${Z} ${handle}`, "fixed start");
    }
    if (/^pages\//.test(handle)) {
      before = handle;
      handle = handle.replace(/^pages\//, "");
      log.warn(`handle ${Nu} ${before} ${Z} ${handle}`, "fixed sub-path");
    }
    if (/[_/]/.test(data.handle)) {
      before = handle;
      handle = handle.replace(/[_/]/g, "-");
      log.warn(`handle ${Nu} ${before} ${Z} ${handle}`, "fixed invalid characters");
    }
    payload.handle = handle;
  } else {
    if (has("title", data)) {
      payload.handle = handleize(data.title);
    } else {
      payload.handle = file.name.toLowerCase();
    }
  }
  if (has("author", data) && $2.page.author !== "") {
    let before;
    let author = data.author;
    if (/\//.test(data.author)) {
      before = data.author;
      author = before.replace(/\//g, " ");
      log.warn(`author ${Nu} ${before} ${Z} ${author}`, "fixed invalid characters");
    }
    payload.author = author;
  } else {
    data.author = $2.page.author;
  }
  if (has("published", data)) {
    if (isBoolean(data.published)) {
      payload.published = data.published;
    } else {
      log.warn(`published ${Nu} expected boolean, got ${typeof data.published}`, "defaulted to false");
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
    if ($2.page.suffixDir && (isRegex($2.page.global) && $2.page.global.test(file.input) !== false)) {
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
  if ($2.sync.stores.length > 1) {
    log.skipped(file, "pages do not support multistore sync");
    return null;
  }
  const read = await fsExtra.readFile(file.input);
  if (isEmpty(read.toString())) {
    if ($2.mode.watch) log.skipped(file, "empty file");
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
    payload.body_html = $import.markdown($2.page.export).render(content);
    log.transform(`${$("Markdown")} ${Z} ${$("HTML")} ${Be} ${import_timer14.timer.stop()}`);
  } else {
    log.transform("HTML");
    payload.body_html = content;
  }
  const store = $2.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await pages.find(store, { handle: payload.handle });
  if (isArray(remote)) {
    log.invalid(file.relative, [
      `Multiple pages returned when matching on handle ${Fu.bold(payload.handle)}`,
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
    if ($2.page.safeSync) {
      const prompt2 = await promptAction(store);
      if (prompt2.action === 2 /* Select */) {
        const action = await selectPage(store);
        if (action === 4 /* Cancel */) {
          return prompt2.resume();
        } else if (action === 1 /* Create */) {
          prompt2.resume();
          log.syncing(`/pages/${payload.handle} ${Z} ${payload.title} ${F(`${Be} ${file.relative}`)}`);
          return pages.create(store, payload);
        } else {
          payload.id = action;
          prompt2.resume();
        }
      } else if (prompt2.action === 1 /* Create */) {
        prompt2.resume();
        log.syncing(`/pages/${payload.handle} ${Z} ${payload.title} ${F(`${Be} ${file.relative}`)}`);
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
        if ($2.page.language === "markdown") {
          const markdown = toMarkdown(convert);
          log.transform(`${file.name}.html ${Z} ${file.base}`);
          convert = stringify("\n" + markdown, frontmatter.data);
        }
        $2.watch.unwatch(file.input);
        await fsExtra.writeFile(file.input, convert);
        setPageCache(store.domain, remote);
        $2.watch.add(file.input);
      } else if (prompt2.action === 4 /* Cancel */) {
        return prompt2.resume();
      } else if (prompt2.action === 6 /* Overwrite */) {
        prompt2.resume();
      }
    }
  }
  if ($2.mode.build) return payload.body_html;
  log.syncing(`/pages/${payload.handle} ${Z} ${payload.title} ${F(`${Be} ${file.relative}`)}`);
  const update = await pages.sync(store, file, payload);
  if (!update) return;
  await saveCache("pages");
}

// syncify/mode/watch.ts
function Watch() {
  stdin.watch.listen();
  event.on("watch", log.upsert);
  $2.running = true;
  let buffer = [];
  let timeout = null;
  watcher.subscribe($2.dirs.input, (e3, changes) => {
    stdin.errors.isAttached && event.emit("stdin:dispose");
    buffer.push(...changes);
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      buffer.length < 1 || buffer.length > 1 ? Bulk(buffer) : Change(buffer);
      buffer = [];
    }, WATCH_BUFFER);
  }).then(({ unsubscribe }) => {
    event.on("restart", (Define) => {
      unsubscribe().then(() => Define().then(Watch));
    });
  });
}
async function Change(changes) {
  const [change] = changes;
  const file = parse2(change.path);
  if (isObject(file) && file.input !== $2.file.config) {
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
  if (!$2.mode.bulk) $2.mode.bulk = true;
  const change = reduce(changes, (state, { type: type2, path: path5 }) => {
    state[type2 === "delete" ? "delete" : "update"].push(parse2(path5));
    return state;
  }, { delete: [], update: [] });
  if (change.update.length > 0) {
    $2.bulk.files += change.update.length;
    $2.bulk.type = "uploaded";
    log.group("update").bulk();
    await q2.bulk.add(async () => await pMap(change.update, Transform));
  }
  if (change.delete.length > 0) {
    $2.bulk.files += change.delete.length;
    $2.bulk.type = "deleted";
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
      return AssetTransform(file);
  }
}

// syncify/mode/push.ts
function setState(write2, files) {
  if (files.length === 0) {
    throws([
      "Empty output directory"
    ], [
      `There are no files within ${bu(path2.relative($2.cwd, $2.dirs.output) + "/**")}`,
      `Run the ${bu.bold("sy build")} command and try again.`
    ]);
  }
  const state = {
    kb: 0,
    files: files.sort(),
    stream: [],
    completed: [],
    interval: null,
    parsed: m2(),
    stores: s2(),
    transfer: m2(),
    synced: m2(),
    warnings: m2(),
    errors: m2(),
    write: write2
  };
  const whitespace = eqWS($2.target, { prop: "target" });
  $2.target.forEach((target) => {
    if (state.stores.has(target.store) === false) {
      state.stores.add(target.store);
      state.write.Prepend(target.store.domain, $).Template({ id: `${target.uid}:files` }).Template({ id: `${target.uid}:progress` });
    }
    state.write.Template(Mu + "  " + target.target, {
      hidden: true,
      id: `${target.uid}`,
      color: F
    });
    state.synced.set(target, {
      target,
      total: 0,
      ws: whitespace(target.target) + Z + "  ",
      success: 0,
      transfer: 0,
      interval: null,
      progress: Io(state.files.length, {
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
    state.write.Update("elapsed", w.numbers(import_timer15.timer.now("upload"), $)).Update("synced", state.stream.length > 1 ? state.stream.pop() : state.stream[0]).toUpdate();
  }, 100);
}
async function setBatchUpserts(state) {
  const parse10 = outputFile($2.dirs.output);
  const batches = [];
  for (let i2 = 0, s3 = state.files.length; i2 < s3; i2++) {
    const path5 = state.files[i2];
    const file = parse10(path5);
    try {
      file.value = await fsExtra.readFile(file.output, "utf-8");
      file.size = byteSize(file.value);
      state.transfer.set(file.key, file.size);
      state.parsed.set(file.key, file);
      state.write.Spinner(`${i2 + 1} Files`);
      batches.push(file);
      await delay(5);
    } catch (e3) {
      error.write("Error reading output file", {
        file: file.key,
        source: file.relative
      })(e3);
    }
  }
  import_timer15.timer.start("batch");
  for (const batch of getChunk(batches, $2.cmd.batch)) {
    await themeFilesUpsertMap(batch);
  }
}
function onUpsert(state) {
  return (upsert) => {
    if (state.stream.length === 0) state.write.Stop();
    const record = state.synced.get(upsert.target);
    forEach(({ filename }) => {
      state.kb += state.transfer.get(filename);
      state.stream.push(F(filename));
    }, upsert.synced);
    record.progress.increment(upsert.synced.length);
    record.success += upsert.synced.length;
    state.write.Update("version", $2.vc.number).Update("elapsed", w.numbers(import_timer15.timer.now("upload"), $)).Update("uploads", `${$(record.success)} of ${$(state.files.length)}`).Update("transfer", stringSize(state.kb)).Update("errors", $2.errors.size > 0 ? S.bold($2.errors.size) : F($2.errors.size)).Update("synced", state.stream.length > 1 ? state.stream.pop() : state.stream[0]).Update(`${record.target.uid}:progress`, record.progress.render()).Update(`${record.target.uid}`).toUpdate();
    if (upsert.errors.length > 0) {
      error.upsert(upsert.errors);
      record.progress.increment(upsert.errors.length);
      state.write.Update("errors", k.bold($2.errors.size)).Update(`${record.target.uid}:progress`, record.progress.render());
      forEach((error2) => {
        const tui = Ft().Mark("legend").Newline().Template({ id: "s", color: F }).Template({ id: "p", color: F }).Template({ id: "e", color: F }).Template({ id: "w", color: F }).Template({ id: "s", color: F }).Template({ id: "q", color: F }).Mark("results").Header(upsert.target.store.domain, $.whiteBright).Template({ prefix: true, id: "uploads", color: se }).Template({ prefix: true, id: "errors", color: k }).Template({ prefix: true, id: "warnings", color: P, hidden: true }).Template({ prefix: true, id: "skipped", color: F }).Newline().Mark("debug").Tree("error").Template({ id: "count", color: k });
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
  state.write.Each($2.target, ({ store }) => state.write.Remove("version", Infinity)).toUpdate({ clear: true });
  if ($2.errors.size > 0) return Debug(state);
}
function Debug(state) {
  const debug = {
    error: [],
    skips: [],
    first: false
  };
  entries();
  observe();
  stdin.errors.on("error", (index) => {
    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }
    entries();
  });
  stdin.errors.on("warning", (index) => {
    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }
    entries();
  });
  function observe() {
    watcher.subscribe($2.dirs.input, (e3, [event2]) => {
      const change2 = parse2(event2.path);
      if (debug.error.some(([{ output }]) => change2.output === output)) {
        event2.type !== "delete" ? Transform(change2) : NooP();
      }
    }).then(({ unsubscribe }) => {
      $2.mode.debug = true;
      event.mode("debug").on("debug", change);
      i(async () => await unsubscribe());
    });
  }
  function entries() {
    if ($2.errors.size === 0) return null;
    if (debug.first === true) {
      debug.error.forEach(([file, tui], number) => {
        const amount = `${F("of")} ${$(state.files.length)}`;
        const count = `${$(number + 1)} of ${$(debug.error.length)}`;
        tui.Update("uploads", `${$(state.completed)} ${amount}`).Update("errors", `${$(debug.error.length)} ${F("of")} ${$(state.errors.size)}`).Update("skipped", `${$(debug.skips.length)} ${F("of")} ${$(state.errors.size)} `).Update("count", `${$("ERROR")} ${count}`);
      });
      if (debug.error.length === 0) {
        stdin.errors.dispose();
      } else {
        stdin.errors.update(debug.error.map((tui) => tui[1]));
      }
    } else {
      $2.errors.entries().forEach(([file, messages2], number) => {
        const tui = state.errors.get(file.key);
        const amount = `${F("of")} ${$(state.errors.size)}`;
        const count = `${$(number + 1)} of ${$(state.errors.size)}`;
        tui.Tree("info").Newline().Update("s", stdin.ansi.legend.s, F).Update("p", stdin.ansi.legend.v, F).Update("e", stdin.ansi.legend.e, F).Update("q", stdin.ansi.legend.q, F).Newline().Update("uploads", `${$(state.completed.length)} ${amount}`).Update("skipped", `${$(debug.skips.length)} of ${$(state.errors.size)}`).Update("errors", `${$(state.errors.size)} of ${$(state.errors.size)}`).Update("count", `${$("ERROR")} ${count}`).Pop(2).Each(messages2, (message) => tui.Insert(message).Break()).Tree("info").Newline().End(stdin.ansi.footer, false);
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
        $2.errors.delete(find[0]);
        record.success += upsert.synced.length;
        entries();
      }
    }
  }
}
async function Push() {
  $2.running = true;
  import_timer15.timer.start("upload");
  const write2 = Ft().Spinner("0 Files").Template({ prefix: true, id: "version", color: $ }).Template({ prefix: true, id: "elapsed", color: I }).Template({ prefix: true, id: "uploads", color: I }).Template({ prefix: true, id: "transfer", color: I }).Template({ prefix: true, id: "errors", color: I }).Template({ prefix: true, id: "warnings", color: I }).Template({ prefix: true, id: "synced", color: I });
  const files = await glob__default.default([`${$2.dirs.output}/**`]);
  const state = setState(write2, files);
  event.mode("push").on("push", onUpsert(state));
  await setBatchUpserts(state);
  await Complete(state);
}

// syncify/options/define/project.ts
var import_write_file_atomic3 = __toESM(require_lib());
async function createProject(path5) {
  $2.file.project = path5;
  await (0, import_write_file_atomic3.default)($2.file.project, JSON.stringify($2.project));
}
function updateProject() {
  if ($2.file.project !== null) {
    q2.cache.add(async () => {
      await (0, import_write_file_atomic3.default)($2.file.project, JSON.stringify($2.project));
    });
  }
}
function projectProxy(model) {
  return new Proxy(model, {
    set: (target, prop, value) => {
      if (has(prop, target) && target[prop] !== value) {
        target[prop] = value;
        updateProject();
      }
      return true;
    }
  });
}
function project() {
  runtime.startup();
  const dir = $2.cwd;
  const name2 = path2.basename(dir);
  const date = Date.now();
  if (fsExtra.existsSync($2.root)) {
    $2.file.project = path2.join($2.root, name2);
    $2.project = projectProxy(fsExtra.readJSONSync($2.file.project));
    $2.project.lastRunAt = date;
    $2.mode.prune = $2.mode.prune === false && $2.project.expires > date;
  } else {
    $2.project = projectProxy({
      name: name2,
      dir,
      syncifyVersion: "1.0.0-unstable.3",
      hotVersion: "0.6.0",
      configVersion: null,
      themeVersion: null,
      targetSource: null,
      textEditor: null,
      gitRemote: null,
      syncifyConfig: null,
      expires: getFuture(3),
      credentials: null,
      createdAt: date,
      lastRunAt: date,
      lastVersionCheck: date
    });
    if (!$2.project.gitRemote) getGitAddress();
  }
}
function getGitAddress() {
  try {
    $2.project.gitRemote = child_process.execSync("git config --get remote.origin.url").toString().trim();
  } catch {
    $2.project.gitRemote = null;
    return false;
  }
}

// syncify/options/define/caches.ts
function caches({ create = false } = {}) {
  const generate = () => {
    forEach(fsExtra.ensureDirSync, [
      $2.root,
      $2.dirs.cache,
      $2.dirs.hot,
      $2.dirs.temp,
      $2.dirs.sourcemaps.root,
      $2.dirs.sourcemaps.scripts,
      $2.dirs.sourcemaps.styles
    ]);
    if ($2.file.project === null) {
      $2.file.project = path2.join($2.root, $2.project.name);
      updateProject();
    }
  };
  if (create) generate();
}
async function createCaches(hash) {
  if (!fsExtra.pathExistsSync($2.home)) fsExtra.mkdirSync($2.home);
  if (hash) $2.hash = hash;
  $2.root = path2.join($2.home, $2.hash);
  $2.dirs.cache = path2.join($2.root, "cache");
  $2.dirs.temp = path2.join($2.root, "temp");
  $2.dirs.hot = path2.join($2.root, "hot");
  $2.dirs.sourcemaps.root = path2.join($2.root, "sourcemaps");
  $2.dirs.sourcemaps.scripts = path2.join($2.dirs.sourcemaps.root, "scripts");
  $2.dirs.sourcemaps.styles = path2.join($2.dirs.sourcemaps.root, "styles");
  for (const path5 of [
    $2.root,
    $2.dirs.cache,
    $2.dirs.temp,
    $2.dirs.sourcemaps.root,
    $2.dirs.sourcemaps.scripts,
    $2.dirs.sourcemaps.styles,
    $2.dirs.hot
  ]) {
    await fsExtra.ensureDir(path5, { mode: READ_WRITE_OWNER });
  }
  for (const file of CACHE_FILES) {
    const path5 = path2.join($2.dirs.cache, file);
    if (await fsExtra.pathExists(path5)) {
      if (file === "paths") {
        await save(path5, /* @__PURE__ */ new Map())();
      } else {
        await save(path5, {})();
      }
    }
  }
}
async function getCaches() {
  if ($2.file.project === null) {
    if ($2.mode.init === false) {
      if ($2.project.credentials !== null) {
        caches({ create: true });
      } else {
        throws.unknown();
        return;
      }
    } else {
      return;
    }
  }
  $2.cache.uri = o2();
  for (const file of CACHE_FILES) {
    $2.cache.uri[file] = path2.join($2.dirs.cache, file);
    if (await fsExtra.pathExists($2.cache.uri[file])) {
      q2.cache.add(async () => {
        $2.cache[file] = await decode($2.cache.uri[file]);
      });
    } else {
      $2.cache[file] = file === "paths" ? m2() : {};
      q2.cache.add(save($2.cache.uri[file], $2.cache[file]));
    }
  }
  if ($2.mode.prune) {
    q2.cache.onIdle().then(() => clearCache());
  }
}
async function getTSConfig() {
  for (const file of JS_TS_CONFIGS) {
    const uri2 = path2.join($2.cwd, file);
    if (await fsExtra.pathExists(uri2)) {
      $2.file.tsconfig = uri2;
      break;
    }
  }
  if ($2.file.tsconfig === null && $2.cwd !== $2.dirs.config) {
    for (const file of JS_TS_CONFIGS) {
      const uri2 = path2.join($2.dirs.config, file);
      if (await fsExtra.pathExists(uri2)) {
        $2.file.tsconfig = uri2;
        break;
      }
    }
  }
  if ($2.file.tsconfig === null) return void 0;
  try {
    const file = await fsExtra.readFile($2.file.tsconfig, "utf-8");
    const config = json.parse(file);
    return config;
  } catch (e3) {
    throw error.json(e3, $2.file.tsconfig);
  }
}
async function getConfigFile() {
  if ($2.project.syncifyConfig !== null) {
    if (await fsExtra.pathExists($2.project.syncifyConfig)) {
      $2.file.config = $2.project.syncifyConfig;
    } else {
      $2.file.config = null;
    }
  }
  if ($2.file.config === null) {
    for (const file of SYNCIFY_CONFIG) {
      const path5 = path2.join($2.cwd, file);
      if (await fsExtra.pathExists(path5)) {
        $2.file.config = path5;
        $2.project.syncifyConfig = path5;
        break;
      }
    }
  }
  if ($2.file.config === null || $2.file.config !== null && $2.file.config.endsWith(".json")) {
    if ($2.pkg !== null && hasPath("syncify.config", $2.pkg) && isEmpty($2.pkg.syncify.config) === false) {
      $2.project.syncifyConfig = $2.file.config = $2.file.pkg;
      return $2.pkg.syncify.config;
    }
    if ($2.file.config !== null) {
      try {
        const json$1 = await fsExtra.readFile($2.file.config, "utf-8");
        return json.parse(json$1);
      } catch (e3) {
        throw error.json(e3, $2.file.config);
      }
    }
  } else {
    const tsconfig = await getTSConfig();
    try {
      const config = await acquire.acquire({
        named: "syncify",
        file: $2.file.config,
        cwd: $2.cwd,
        tsconfig,
        type: has("type", $2.pkg) ? $2.pkg.type : "commonjs",
        onRebuild: $2.mode.watch ? (bundle) => {
          $2.config = bundle;
          $2.running && event.emit("restart", Configure);
        } : void 0,
        onError: (errors) => {
          const file = parseSyncifyConfig($2.file.config);
          Ft({ type: "error" }).Append("ERROR IN SYNCIFY CONFIG", $).Wrap(`The ${P.bold(file.base)} file could not be processed.`).toLog({ clear: true });
          error.esbuild(file, errors);
        }
      });
      i(async () => await acquire.acquire.dispose("syncify"));
      return config;
    } catch (e3) {
      throw error.acquire(e3);
    }
  }
}
async function getConfig() {
  if ($2.running) return;
  const settings = await getConfigFile();
  if (settings !== null) {
    $2.config = settings;
  }
}
async function setOutputDirs(basePath2) {
  if (!basePath2) basePath2 = $2.dirs.output;
  if (await fsExtra.pathExists(basePath2)) {
    if ($2.mode.clean) {
      try {
        await fsExtra.emptyDir(basePath2);
      } catch (e3) {
        throw new Error(e3);
      }
    }
  } else {
    try {
      await fsExtra.mkdir(basePath2);
    } catch (e3) {
      throw new Error(e3);
    }
  }
  for (const [name2, dir] of THEME_PATHS) {
    const uri2 = path2.join(basePath2, dir);
    if (!await fsExtra.pathExists(uri2)) {
      try {
        await fsExtra.mkdir(uri2);
        $2.stats[name2] = 0;
      } catch (e3) {
        throw new Error(e3);
      }
    } else {
      $2.stats[name2] = fsExtra.readdirSync(uri2).length;
    }
  }
}
async function setBaseDirs() {
  if ($2.running) return;
  const base = basePath($2.cwd);
  for (const [key, dir] of BASE_DIRS) {
    if (has(key, $2.cmd) && $2.cmd[key] === dir && $2.config[key] === dir) {
      $2.dirs[key] = base($2.cmd[key]);
      continue;
    }
    const path5 = has(key, $2.cmd) && isString($2.cmd[key]) ? $2.cmd[key] : $2.config[key];
    if (isString(path5)) {
      $2.dirs[key] = base(path5);
    } else {
      throws.typeError({
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
async function getEnv(cwd2 = $2.cwd) {
  const path5 = path2.join(cwd2, ".env");
  if (await fsExtra.pathExists(path5)) {
    $2.file.env = path5;
    $2.project.credentials = "env";
  } else {
    if ($2.file.project !== null) {
      const kc = path2.join($2.root, ".env");
      if (await fsExtra.pathExists(kc)) {
        $2.file.env = kc;
        $2.project.credentials = "kc";
      }
    }
  }
  if ($2.file.env !== null) {
    const env2 = import_dotenv.default.config({ path: $2.file.env });
    if (env2.error) {
      error.throw(env2.error, { path: $2.file.env });
    }
    defineProperty($2.env, "vars", { get() {
      return env2.parsed;
    } });
    if ($2.project.credentials === "env") {
      if (isEmpty($2.env.vars)) {
        ThrowCredentials();
      } else {
        setStoreClient($2.env.vars);
      }
    }
  } else {
    if (!$2.mode.create && !$2.mode.init && !$2.mode.keychain) {
      if ($2.file.project !== null) ThrowCredentials({ missing: true });
    } else {
      if (await fsExtra.pathExists($2.file.keychain)) {
        await getKeychain();
      } else {
        throws([
          "Syncify is missing core reference files. Please report this issue on the",
          `github repo, ${ou.underline("https://github.com/panoply/syncify/issues")}). This`,
          `error may be due to a corrupted installation which prevented ${Fu("postinstall")}`,
          "hooks from firing."
        ], [
          "Programmatic generation of core references may resolve this issue. Use the",
          `${ou("sy doctor")} command and syncify will try to fix the problem.`,
          "If the error persists, please ensure read/write access permissions allow",
          `for directory and file generation within ${ou($2.home)} location.`
        ]);
      }
    }
  }
}
async function getKeychain() {
  $2.keychain = await fsExtra.readJson($2.file.keychain);
  if (!isEmpty($2.keychain)) {
    if ($2.project !== null) ;
  }
}
function setStoreClient(vars) {
  const getStorefrontPassword = (domain) => {
    const lowercase = `${domain}_password`;
    const uppercase = lowercase.toUpperCase();
    return lowercase in vars ? vars[lowercase] : uppercase in vars ? vars[uppercase] : null;
  };
  for (const prop in vars) {
    const p2 = prop.toLowerCase().trimEnd();
    const m3 = p2.search(/_a(?:pi|ccess)_token$/m);
    if (m3 > -1) {
      const name2 = p2.slice(0, m3);
      const password = getStorefrontPassword(name2);
      const token = getXiorConfig(vars, name2);
      $2.stores.push({
        name: name2,
        token,
        password,
        domain: `${name2}.myshopify.com`,
        themes: null
      });
    }
  }
  if (isEmpty($2.stores)) ThrowCredentials();
}
function getXiorConfig(vars, name2) {
  let api_token = name2 + "_api_token";
  if (!has(api_token, vars)) {
    api_token = api_token.toUpperCase();
    if (!has(api_token, vars)) {
      api_token = name2 + "_access_token";
      if (!has(api_token, vars)) {
        api_token = api_token.toUpperCase();
      }
    }
  }
  if (has(api_token, vars)) {
    const token = vars[api_token];
    http(name2, token);
    return token;
  } else {
    throws(`Invalid or missing ${ou(name2 + ".myshopify.com")} credentials`, [
      `Your shop credentials in the ${ou.bold(".env")} file could`,
      "not be read correctly or are missing. Please check your environment file and ensure",
      "you have provided valid authorization, or if you are using the Keychain, please check",
      "credential association has been applied."
    ]);
  }
}
function ThrowCredentials({ missing = false } = {}) {
  Ft({ type: "error" }).Line(missing ? "MISSING CREDENTIALS" : "BAD CREDENTIALS", $).Newline().Wrap(missing ? [
    "Missing authorization credentials. Syncify could not resolve API tokens within this project.",
    `There is no ${ou(".env")} file present or keychain association.`
  ] : [
    "The project's authorization access failed due to missing or invalid credentials.",
    "Syncify could not obtain shop api access tokens. Check that you have correctly",
    `provided token reference within your ${ou(".env")} file or use the keychain.`
  ]).Tree("info").NL.Line("How to fix?", F.bold).Line("Refer to the documentation for credential options and setup", F).Header(`${Nu} ${Ee("https://syncify.sh/setup/credentials")}`, F).End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
}
function parseFilter(base, input, regexp) {
  if (input[0] === "*" || input[0] === "/" || input[0] === ".") {
    ErrorFilterPattern("pattern", input);
  }
  if (input[0] === "!") {
    if (!regexp.test(input.slice(1))) ErrorFilterPattern("dir", input);
    return;
  }
  if (!regexp.test(input)) ErrorFilterPattern("dir", input);
  const path5 = input.slice(0, input.indexOf("/"));
  if (!isArray($2.filters[path5])) $2.filters[path5] = [];
  $2.filters[path5].push(path2.join(base, input));
}
function setFilters() {
  if ($2.cmd.filter.length === 0) return;
  for (const cmd2 of $2.cmd.filter) {
    const base = $2.mode.push ? $2.dirs.output : $2.dirs.input;
    const filter = cmd2.replace(/\s+/g, " ").trim();
    const regexp = $2.mode.push ? new RegExp(`^(${THEME_PATHS.map(([dir]) => dir).join("|")})`) : new RegExp(`^(${PATH_KEYS.join("|")})`);
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
function ErrorFilterPattern(type2, cmd2) {
  const pattern = [];
  const ref = o2();
  if ($2.mode.push) {
    ref.base = "output";
    ref.from = "output";
    ref.dirs = THEME_PATHS.map(([, dir]) => `${He("-")} ${Fu(dir)}`);
    ref.fix = [
      `The ${Fu("--filter")} (or ${Fu("-F")}) flag command argument expects that you`,
      "provide a theme output directory as the starting point. Filters begin with",
      "the Shopify (theme) output directory name, for example:",
      "",
      `${He("$")} ${He(`sy -F ${Fu("sections/file.liquid")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("snippets/*")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("templates/*.json")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${$(ref.base)} directory`,
      "based on the starting point directory name. You can pass glob star matches following the",
      `directory namespace or starting point ignores (${Fu("!")}) as long the directory can match.`
    ];
  } else {
    ref.base = "input";
    ref.from = "paths";
    ref.dirs = PATH_KEYS.map((dir) => `${He("-")} ${Fu(dir)}`);
    ref.fix = [
      `The ${Fu("--filter")} (or ${Fu("-F")}) flag command argument expects you`,
      `provide a ${T.bold("paths")} key name as the starting point. Filtering begins with`,
      "a Shopify output directory name, for example:",
      "",
      `${He("$")} ${He(`sy -F ${Fu("sections/file.liquid")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("snippets/*")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("templates/*.json")}`)}`,
      `${He("$")} ${He(`sy -F ${Fu("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${$(ref.base)} directory`,
      `based on the starting point ${$("paths")} name. You can pass glob star matches following the`,
      `starting point or ignores (${Fu("!")}) as long the reference can match.`
    ];
  }
  if (type2 === "pattern") {
    pattern.push(`Invalid ${Fu("--filter")} pattern provided. You cannot pass starting point`);
    if (cmd2[0] === "*") {
      pattern.push(`glob (${Fu("*")}) stars as filters, Syncify does not support this.`);
    } else if (cmd2[0] === "/") {
      pattern.push(`path (${Fu("/")}) roots as filters, Syncify does not support this.`);
    } else if (cmd2[0] === ".") {
      pattern.push(`dot paths (${Fu(".")}) as filters, Syncify does not support this.`);
    }
    pattern.push(
      `Use a starting point reference name based on the ${Fu(ref.from)} key property`,
      `in your ${Fu(path2.basename($2.file.config))} file.`
    );
  } else {
    pattern.push(
      `Invalid directory provided. The ${Fu("--filter")} pattern expects the starting point`,
      "directory path be one of the following:",
      "",
      ...ref.dirs,
      ""
    );
  }
  throws.command({
    message: pattern,
    expected: "--filter <dir>",
    fix: ref.fix
  });
}

// syncify/options/define/paths.ts
var import_anymatch3 = __toESM(require_anymatch());
async function setPaths() {
  if (!await fsExtra.pathExists($2.dirs.input)) {
    return throws(
      [
        `Failed to obtain resolution of the ${$("input")} base directory.`,
        "The path does not exist or the directory is empty.\n\n",
        `${Tt} ${$.underline($2.dirs.input.replace($2.cwd, "").slice(1))}**`
      ],
      [`Check that the ${ou(path2.basename($2.dirs.input))} directory can be resolved.`],
      "Missing input directory"
    );
  }
  const getUri = normalPath($2.dirs.input);
  const warn2 = warnOption("paths");
  for (const path5 of PATH_KEYS) {
    let paths = [];
    if (path5 === "snippets" || path5 === "sections") {
      paths = setRenamePaths(path5, `${path5}/*`);
    } else if (path5 === "customers" || path5 === "metaobject") {
      paths = setBaseUri(path5, $2.config.paths[path5], `templates/${path5}/*`);
    } else if (path5 === "schema" || path5 === "blogs" || path5 === "files" || path5 === "metafields" || path5 === "navigation" || path5 === "pages" || path5 === "policies") {
      paths = setBaseUri(path5, $2.config.paths[path5], `+/${path5}/*`);
    } else {
      paths = setBaseUri(path5, $2.config.paths[path5], `${path5}/*`);
    }
    $2.paths[path5].config = paths;
    $2.paths[path5].match = (0, import_anymatch3.default)(paths);
    const globs = await glob__default.default.async(paths, { cwd: $2.cwd });
    if ($2.paths[path5].input === null) {
      $2.paths[path5].input = s2(globs);
    } else {
      forEach((x) => $2.paths[path5].input.add(x), globs);
    }
  }
  q2.cache.add(async () => {
    for (const [key, dir] of THEME_PATHS) {
      const path5 = $2.paths[key];
      for (const input of path5.input) {
        const output = path2.join($2.dirs.output, dir, path2.basename(input));
        await setPathCache(input, output, path5.rename);
      }
    }
  });
  function setBaseUri(name2, files, fallback) {
    if (isNil(files)) {
      return getUri(fallback);
    } else if (isString(files)) {
      return [getUri(files)];
    } else if (isArray(files)) {
      return getUri(files);
    }
    throws.typeError({
      option: "paths",
      expects: "string | string[]",
      provided: files,
      name: name2
    });
  }
  function setRenamePaths(name2, fallback) {
    var _a14;
    const files = $2.config.paths[name2];
    if (isEmpty(files)) {
      warn2(`Undefined path/s on "${name2}", using fallback`, "{}");
      return [getUri(fallback)];
    }
    if (isArray(files)) return getUri(files);
    if (isString(files)) return [getUri(fallback)];
    const config = o2({ ...files });
    const entries = Object.entries(config);
    const transformed = {};
    const allPatterns = [];
    try {
      for (const [key, patterns] of entries) {
        transformed[key] = [];
        if (isArray(patterns)) {
          for (const pattern of patterns) {
            getPattern(key, pattern);
          }
        } else {
          getPattern(key, patterns);
        }
      }
      if (allPatterns.length === 0) return [getUri(fallback)];
      const patternOwners = /* @__PURE__ */ new Map();
      for (const { pattern, key, isExclusion } of allPatterns) {
        if (!isExclusion) {
          const specificity = getGlobSpecific(pattern);
          const existing = patternOwners.get(pattern);
          if (!existing || specificity > existing.specificity) {
            patternOwners.set(pattern, { key, specificity });
          }
        }
      }
      for (const [key, patterns] of entries) {
        const inclusions = [];
        const exclusions = /* @__PURE__ */ new Set();
        for (const pattern of patterns) {
          if (pattern.startsWith("!")) {
            exclusions.add(`!${getUri(pattern.slice(1))}`);
          } else {
            const isExcludedHere = patterns.some((p2) => p2.startsWith("!") && p2.slice(1) === pattern);
            if (((_a14 = patternOwners.get(pattern)) == null ? void 0 : _a14.key) === key && !isExcludedHere) {
              inclusions.push(getUri(pattern));
            }
          }
        }
        for (const [otherPattern, owner] of patternOwners) {
          if (owner.key !== key) {
            for (const pattern of patterns) {
              if (!pattern.startsWith("!")) {
                if ((0, import_anymatch3.default)(pattern, otherPattern) && getGlobSpecific(otherPattern) > getGlobSpecific(pattern)) {
                  const excludePath = `!${getUri(otherPattern)}`;
                  exclusions.add(excludePath);
                }
              }
            }
          }
        }
        transformed[key].push(...toArray(exclusions).sort(), ...inclusions.sort());
      }
      $2.paths[name2].rename = keys(transformed).map((pattern) => ({
        pattern,
        match: (0, import_anymatch3.default)(transformed[pattern])
      }));
      const inclusionPatterns = allPatterns.filter((p2) => !p2.isExclusion).sort((a2, b2) => b2.generality - a2.generality);
      const generalPatterns = [];
      const coveredPatterns = s2();
      for (const { pattern, generality } of inclusionPatterns) {
        if (!coveredPatterns.has(pattern)) {
          let isGeneral = true;
          for (const other of inclusionPatterns) {
            if (other.pattern !== pattern && !coveredPatterns.has(other.pattern)) {
              if ((0, import_anymatch3.default)(pattern, other.pattern)) {
                coveredPatterns.add(other.pattern);
              } else if (generality === other.generality && !(0, import_anymatch3.default)(other.pattern, pattern)) {
                continue;
              } else if (generality < other.generality && !(0, import_anymatch3.default)(other.pattern, pattern)) {
                isGeneral = false;
                break;
              }
            }
          }
          if (isGeneral && !generalPatterns.includes(getUri(pattern))) {
            generalPatterns.push(getUri(pattern));
            coveredPatterns.add(pattern);
          }
        }
      }
      return generalPatterns.length > 0 ? generalPatterns.sort() : [getUri(fallback)];
    } catch (error2) {
      warn2(`Error processing rename paths for "${name2}": ${error2.message}`, "{}");
      return [getUri(fallback)];
    }
    function getPattern(key, pattern) {
      const isExclusion = pattern.startsWith("!");
      const cleanPattern = isExclusion ? pattern.slice(1) : pattern;
      allPatterns.push({
        pattern: cleanPattern,
        key,
        generality: getGlobGeneral(cleanPattern),
        isExclusion
      });
    }
    function getGlobSpecific(glob9) {
      const segments = glob9.split(path2.sep).filter(Boolean);
      let score = segments.length;
      if (glob9.includes("**")) score -= 1;
      if (/\.[a-z]+$/.test(glob9)) score += 1;
      return score;
    }
    function getGlobGeneral(glob9) {
      const segments = glob9.split(path2.sep).filter(Boolean);
      let score = 0;
      if (glob9.includes("**")) score += 2;
      if (glob9.includes("*")) score += 1;
      score -= segments.length;
      if (/\.[a-z]+$/.test(glob9)) score -= 2;
      return score;
    }
  }
}
async function setSectionOptions() {
  if ($2.paths.schema.input !== null && $2.paths.schema.input.size > 0 && $2.running === false) {
    await setSharedSchema();
    await setSchemaJson();
    defineProperty($2.section, "schema", {
      get() {
        return $2.cache.schema;
      }
    });
  }
}
async function setSharedSchema() {
  for (const uri2 of $2.paths.schema.input) {
    const ext = path2.extname(uri2);
    const key = path2.basename(uri2, ext);
    if ($2.section.shared.has(key)) {
      throws(`Duplicated shared schema file name ${$.yellow(key + ext)} detected.`, [
        "Shared Schema JSON file names must be unique across the workspace.",
        "Update the file name and try again."
      ]);
    }
    try {
      const data = await fsExtra.readFile(uri2, "utf8");
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
      $2.cache.schema[uri2] = s2();
      $2.section.shared.set(key, { uri: uri2, schema: schema2 });
    } catch (e3) {
      if (e3 instanceof json.JSONError) {
        log.error(path2.relative($2.cwd, uri2), {
          notify: {
            title: "JSON Error (setSharedSchema)",
            message: `Error when parsing ${path2.basename(uri2)}`
          }
        });
        error.json(e3, {
          relative: path2.relative($2.cwd, uri2),
          base: path2.basename(uri2)
        });
      } else {
        error.throw(e3, {
          relative: path2.relative($2.cwd, uri2),
          base: path2.basename(uri2)
        });
      }
      return null;
    }
  }
}
async function setSchemaJson() {
  const { shared } = $2.section;
  const warn2 = warnOption("Section Schema");
  for (const file of $2.paths.sections.input) {
    const read = await fsExtra.readFile(file, "utf8");
    const hash = checksum(read);
    if (has(file, $2.cache.schema) && $2.cache.checksum[file] === hash) continue;
    $2.cache.checksum[file] = hash;
    const data = read.toString();
    const indices = GetSchemaIndices(data);
    if (indices === null) {
      warn2("Liquid Parse Error", path2.relative($2.cwd, file));
      continue;
    }
    try {
      const schema2 = json.parse(data.slice(indices.begin, indices.ender));
      const schemaProp = hasProp(schema2);
      if (schemaProp("settings")) {
        for (const setting of schema2.settings) {
          if (has("$ref", setting)) {
            const fname = setting.$ref.split(".")[0];
            if (shared.has(fname)) {
              $2.cache.schema[shared.get(fname).uri].add(file);
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
              $2.cache.schema[shared.get(fname).uri].add(file);
            }
          }
          if (blockProp("settings")) {
            for (const setting of block.settings) {
              if (has("$ref", setting)) {
                const fname = setting.$ref.split(".")[0];
                if (shared.has(fname)) {
                  $2.cache.schema[shared.get(fname).uri].add(file);
                }
              }
            }
          }
        }
      }
    } catch (e3) {
      if (has(file, $2.cache.sections)) {
        delete $2.cache.sections[file];
      }
      warn2("JSON Parse Error", path2.relative($2.cwd, file));
    }
  }
}
function JsonTemplate(store) {
  let template = g.nl(
    `${F(`package.json ${Nu} syncify ${Nu} stores`)}
`,
    "{",
    `  "${He("stores")}": {`,
    `    "${He(store.toLowerCase())}": {
`
  );
  return {
    insert: (theme2) => {
      template += `      "\${${theme2.name}}": ${He(theme2.id)},${"\n"}`;
    },
    output: () => {
      return template.replace(/,\n$/, "\n") + g.nl("    }", "  }", "}");
    },
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
async function TomlTemplate(store) {
  await $import("smol-toml");
  let template = g.nl(
    `${F("stores.toml")}
`,
    `[${store.toLowerCase()}]
`
  );
  return {
    insert: (theme2) => {
      template += `  \${${theme2.name}} = ${fu(theme2.id)}${"\n"}`;
    },
    output: () => template,
    string: (input) => input.trim().replace("stores.toml", "").trim(),
    parse: (input) => $import.toml.parse(input)
  };
}
async function YamlTemplate(store) {
  await $import("js-yaml");
  let template = g.nl(
    `${F("stores.yaml")}
`,
    `${store.toLowerCase()}:
`
  );
  return {
    insert: (theme2) => {
      template += `  \${${theme2.name}}: ${fu(theme2.id)}${"\n"}`;
    },
    output: () => template,
    string: (input) => input.trim().replace("stores.yaml", "").trim(),
    parse: (input) => $import.yaml.load(input.trim().replace("stores.yaml", ""))
  };
}
async function PromptTargetFileTemplate({ store, method, targets }) {
  const template = method === "package.json" ? JsonTemplate(store.name) : method === "stores.toml" ? await TomlTemplate(store.name) : await YamlTemplate(store.name);
  const fields = [];
  for (const { name: name2, id } of targets) {
    template.insert({ name: name2, id });
    fields.push({
      name: name2,
      message: name2,
      validate(value, state, field) {
        this.state.symbols.pointer = o.red;
        if (field && field.name === name2) {
          if (/[A-Z]/.test(value)) {
            return me.redBright("  Target name must be lowercase");
          }
          if (/[0-9]/.test(value)) {
            return me.redBright("  Target name cannot contain numbers");
          }
          if (/[ ]/.test(value)) {
            return me.redBright("  Target name cannot contain spaces");
          }
          if (/-/.test(value)) {
            return me.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = bu;
  theme.styles.typing = se;
  const snippet3 = await (0, import_enquirer.prompt)({
    theme,
    fields,
    render,
    name: "stores",
    type: "snippet",
    required: targets.map(({ name: name2 }) => name2),
    message: label.DefineTargets,
    newline: o.next + o.next,
    template: template.output(),
    format() {
      if (this.state.submitted === true && this.state.completed !== 100) {
        return se(`${this.state.completed}% completed`);
      }
      return `${Z}  ${F(`${this.state.completed}% completed`)}`;
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
  const selected = {};
  if ($2.stores.length > 1) {
    for (const store of $2.stores) {
      selected[store.name] = await PromptEachStore(store);
    }
  } else {
    const targets = await PromptEachStore($2.stores.default);
    return PromptTargetFileTemplate({
      store: $2.stores.default,
      method,
      targets
    });
  }
  async function PromptEachStore(store) {
    log.spinner("Fetching Themes", { color: F });
    const items = await themesList(store);
    const themes = items.filter(({ role }) => role !== "demo").sort((a2, b2) => a2.role === "main" ? -1 : b2.role === "main" ? 1 : 0);
    await delay();
    log.spinner.stop();
    const dispose = intercept();
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      name: "targets",
      type: "select",
      multiple: true,
      required: true,
      message: label.SelectThemes,
      hint: "   Press spacebar to select",
      choices: choose(themes, { prop: "name" })((choice, value) => {
        const updated = timeAgo(choice.updatedAt);
        const label2 = updated + " ".repeat(14 - updated.length);
        return {
          name: choice.name,
          hint: choice.role === "MAIN" ? F(`updated ${label2 + Z + "  " + bu("Live Theme")}`) : F(`updated ${label2}`),
          value: choice
        };
      }),
      validate(value) {
        this.state.symbols.pointer = o.red;
        return value.length === 0 ? "You must select at least 1 theme" : true;
      },
      result(names) {
        return this.map(names);
      },
      format(value) {
        if (isArray(value) && value.length > 0) {
          return se(`${value.join(I(", "))}`);
        }
      }
    }).catch(cancel);
    dispose();
    return values(resolve3.targets);
  }
}
async function PromptStorage(message) {
  if (message) {
    Ft({ type: "warning" }).Wrap(message, P.bold).Newline("line").toLog({ clear: true });
  }
  const resolve3 = await (0, import_enquirer.prompt)({
    theme,
    message: label.TargetStorage,
    name: "storage",
    type: "select",
    choices: choose([
      { name: "package.json", hint: "Saves targets in package.json file" },
      { name: "stores.toml", hint: "Saves targets in stores.toml file" },
      { name: "stores.yaml", hint: "Saves targets in stores.yaml file" }
    ], {
      prop: "name",
      padding: 4
    })()
  }).catch(cancel);
  if (resolve3.storage === "package.json" && $2.pkg === null) {
    await setPkg({
      version: `${$2.vc.patch}.${$2.vc.minor}.${$2.vc.major}`,
      name: $2.project.name,
      private: true,
      description: "",
      license: "UNLICENSED"
    });
  }
  $2.project.targetSource = resolve3.storage;
  $2.file.targets = path2.join($2.cwd, resolve3.storage);
  return resolve3.storage;
}
async function PromptThemeTargets(message) {
  if (message) {
    Ft({ type: "warning" }).Wrap(message, P.bold).Newline("line").toLog({ clear: true });
  }
  const resolve3 = await (0, import_enquirer.prompt)({
    theme,
    message: label.ThemeTargets,
    type: "select",
    name: "theme",
    required: true,
    choices: choose([
      {
        name: "select",
        message: "Select Theme",
        hint: "Link existing theme/s from the store"
      },
      {
        name: "create",
        message: "Create Theme",
        disabled: true,
        hint: "Create a new unpublished theme in the store"
      }
    ], {
      padding: 3,
      prop: "message"
    })()
  }).catch(cancel);
  return resolve3.theme;
}
async function parseToml(uri2) {
  const toml = await $import("smol-toml");
  const file = await fsExtra.readFile(uri2, "utf-8");
  return toml.parse(file);
}
async function parseYaml(uri2) {
  const file = await fsExtra.readFile(uri2, "utf-8");
  const yaml = await $import("js-yaml");
  return yaml.load(file);
}

// syncify/options/define/store.ts
async function getTargetFile() {
  let type2 = -1 /* NONE */;
  if ($2.project.targetSource !== null) {
    const path5 = path2.join($2.cwd, $2.project.targetSource);
    type2 = path5.endsWith("toml") ? 0 /* TOML */ : path5.endsWith("yaml") ? 1 /* YAML */ : 2 /* YML */;
    if (await fsExtra.pathExists(path5)) {
      $2.file.targets = path5;
      return type2;
    }
    $2.project.targetSource = null;
    return -1 /* NONE */;
  }
  for (let i2 = 0, s3 = TARGET_FILES.length; i2 < s3; i2++) {
    const path5 = path2.join($2.cwd, TARGET_FILES[i2]);
    if (await fsExtra.pathExists(path5)) {
      type2 = i2;
      $2.file.targets = path5;
      $2.project.targetSource = TARGET_FILES[i2];
      return type2;
    }
  }
  return -1 /* NONE */;
}
async function getStoresFromFile() {
  const file = await getTargetFile();
  if (file === 0 /* TOML */) {
    try {
      const targets = await parseToml($2.file.targets);
      return targets;
    } catch (err) {
      error.toml($2.file.targets, err);
    }
  } else if (file === 1 /* YAML */ || file === 2 /* YML */) {
    try {
      const targets = await parseYaml($2.file.targets);
      return targets;
    } catch (err) {
      error.throw(err, { file: $2.file.targets });
    }
  } else {
    return null;
  }
}
async function getTargets(options) {
  let {
    action,
    method,
    target,
    banner,
    oninit
  } = assign({
    action: 0 /* NOTHING */,
    method: void 0,
    target: void 0,
    banner: false,
    oninit: $2.mode.init
  }, options);
  if (action === 0 /* NOTHING */) {
    if ($2.pkg !== null) {
      if (hasPath("syncify.stores", $2.pkg)) {
        if (isObject($2.pkg.syncify.stores)) {
          method = "package.json";
          if (isEmpty($2.pkg.syncify.stores)) {
            action = 4 /* PROMPT_THEMES */;
            method = "package.json";
          } else {
            target = $2.pkg.syncify.stores;
            $2.project.targetSource = "package.json";
          }
        } else {
          throws([
            `Invalid store/theme target references defined in ${$("package.json")} file`
          ], [
            `Syncify expects and ${ou("object")} type structure`
          ]);
        }
      } else if (has("syncify", $2.pkg)) {
        action = 1 /* PKG_KEY */;
        method = "package.json";
      } else {
        action = 2 /* CHECK_FILES */;
      }
    } else {
      action = 2 /* CHECK_FILES */;
    }
  }
  if (action === 2 /* CHECK_FILES */ || action === 1 /* PKG_KEY */) {
    const targets = await getStoresFromFile();
    if (targets !== null) {
      method = $2.file.targets.endsWith("toml") ? "stores.toml" : "stores.yaml";
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
  if (oninit) return;
  if (action === 1 /* PKG_KEY */) action = 4 /* PROMPT_THEMES */;
  if (action === 3 /* PROMPT */) {
    if ($2.project.credentials !== null) {
      banner = true;
      action = 4 /* PROMPT_THEMES */;
      method = await PromptStorage([
        "You have not provided store and theme targets. Syncify requires a hard-reference",
        "to be defined in your projects root directory. Please select a storage method to use",
        "and follow the prompts" + M
      ]);
    }
  }
  if (action === 4 /* PROMPT_THEMES */) {
    if ($2.project.credentials !== null) {
      const message = banner ? void 0 : [
        "You have not provided theme target references which are required by Syncify.",
        "You can choose to associate existing theme/s from your store or create and publish",
        "a new theme based on the current project" + M
      ];
      const run = await PromptThemeTargets(message);
      if (run === "select") {
        const { string, parsed } = await PromptSelectThemes(method);
        if (method !== "package.json") {
          target = parsed;
          await fsExtra.writeFile($2.file.targets, string);
        } else {
          await setPkg({ syncify: parsed });
          target = $2.pkg.syncify.stores;
        }
      }
    }
  }
  if ($2.project.credentials === null) return;
  const warn2 = warnSevere("targets");
  $2.target.raw = target;
  for (const name2 in target) {
    if ($2.stores.has(name2)) {
      $2.stores.set(name2, {
        get themes() {
          return $2.target.raw[name2];
        }
      });
    } else {
      warn2("missing target credentials", name2);
      $2.stores.push({
        name: name2,
        domain: `${name2}.myshopify.com`,
        password: null,
        token: null,
        get themes() {
          return $2.target.raw[name2];
        }
      });
    }
  }
  if ($2.cmd.target.length === 0) {
    const store = $2.stores.default;
    for (const target2 in store.themes) {
      const id = store.themes[target2];
      $2.target.push(
        {
          target: target2,
          id,
          role: "unknown",
          uid: murmur(store.name, id),
          get store() {
            return $2.stores.get(store.name);
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
      return $2.stores.get(storeName);
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
  if ($2.target.length === 1 || $2.cmd.target.length === 0) {
    runtime.stores();
    return;
  }
  const duplicate = s2();
  const ambiguous = s2();
  for (const cmd2 of $2.cmd.target) {
    const col = cmd2.indexOf(":");
    if (col > -1) {
      const storeName = cmd2.slice(0, col).trim();
      const themes = cmd2.slice(col + 1).split(",");
      if (storeName === "") {
        let exists2 = false;
        for (const themeTarget of themes) {
          duplicate.clear();
          for (const store of $2.stores) {
            if (has(themeTarget, store.themes)) {
              exists2 = true;
              const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);
              if (duplicate.has(target.id)) {
                ErrorDuplicate(target.id, store.name);
              } else {
                $2.target.push(target);
                duplicate.add(target.id);
              }
            }
          }
        }
        if (!exists2) {
          ErrorTarget({
            type: "theme",
            provided: themes.join(",")
          });
        }
      } else {
        if (!$2.stores.has(storeName)) {
          ErrorTarget({
            type: "store",
            provided: storeName
          });
        }
        const store = $2.stores.get(storeName);
        for (const themeTarget of themes) {
          if (has(themeTarget, store.themes)) {
            const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);
            if (duplicate.has(target.id)) {
              ErrorDuplicate(target.id, store.name);
            } else {
              $2.target.push(target);
              duplicate.add(target.id);
            }
          } else {
            ErrorTarget({
              type: "theme",
              provided: themeTarget,
              target: storeName
            });
          }
        }
      }
    } else {
      const targets = cmd2.split(",");
      for (const value of targets) {
        if ($2.stores.has(value)) {
          for (const theme2 in $2.stores.get(value).themes) {
            const target = syncTheme(value, theme2, $2.stores.get(value).themes[theme2]);
            if (duplicate.has(target.id)) {
              ErrorDuplicate(target.id, target.store.name);
            } else {
              $2.target.push(target);
              duplicate.add(target.id);
            }
          }
        } else {
          let exists2 = false;
          for (const store of $2.stores) {
            if (has(value, store.themes)) {
              const target = syncTheme(store.name, value, store.themes[value]);
              if (duplicate.has(target.id)) {
                ErrorDuplicate(target.id, store.name);
              } else {
                if (ambiguous.has(value)) {
                  ErrorAmbiguous(value);
                } else {
                  $2.target.push(syncTheme(store.name, value, store.themes[value]));
                  ambiguous.add(value);
                  duplicate.add(target.id);
                  exists2 = true;
                }
              }
            }
          }
          if (!exists2) {
            ErrorTarget({
              type: "theme",
              provided: value
            });
          }
        }
      }
    }
  }
  runtime.stores();
}
function ErrorTarget({ type: type2, provided, target = null }) {
  const targets = $2.file.targets === null ? "package.json" : path2.basename($2.file.targets);
  const message = target ? [
    `The ${ou(target)} ${type2} has no theme "${$.redBright(provided)}" target defined.`,
    `Provide one or more valid ${target} theme target/s as defined in your ${targets} file:`
  ] : [
    `The ${type2} target "${$.redBright(provided)}" is either undefined or unknown.`,
    `Provide one or more valid ${type2} target/s as defined in your ${targets} file:`
  ];
  const expected = target ? keys($2.stores.get(target).themes).map((name2) => `${St} ${k(name2)}`) : type2 === "store" ? $2.stores.map(({ name: name2 }) => `${St} ${k(name2)}`) : $2.stores.flatMap(({ themes }) => keys(themes).map((name2) => `${St} ${k(name2)}`));
  Ft({ type: "error" }).Newline("line").Append(`INVALID ${type2.toUpperCase()} TARGET`, $).Wrap(message).NL.Multiline(expected).Tree("info").Prepend("How to fix?", F.bold).Wrap(
    F,
    `Check for typos in the ${type2} target name. If you intended to use this target`,
    `ensure it is properly defined and associated or use ${Fu("sy setup")} to connect it.`
  ).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(2) : process.exit(2);
}
function ErrorAmbiguous(target) {
  const alias = w.dash($2.argv.some((value) => value === "--target") ? "--target" : "-T", F);
  const expected = $2.stores.filter(({ themes }) => has(target, themes)).map(({ name: name2 }) => `${name2}${M}${target}`).join(" ");
  Ft({ type: "error" }).Newline("line").Append("AMBIGUOUS THEME TARGET", $).Wrap(
    `The theme target name "${ou(target)}" is an ambiguous reference and used by multiple`,
    "stores in this project. Syncify is unable to determine which theme you want interface with."
  ).Header("Prefix command with store name/s" + M).Line(`${$("provided")}${M} ${P(`${alias} ${target}`)}`).Line(`${$("expected")}${M} ${gu(`${alias} ${expected}`)}`).Header(`Use a glob star ${ou("*")} prefix to instruct Syncify to target all stores${M}`).Line(`${$("provided")}${M} ${P(`${alias} ${target}`)}`).Line(`${$("expected")}${M} ${gu(`${alias} *${M}${target}`)}`).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(2) : process.exit(2);
}
function ErrorDuplicate(id, store) {
  const write2 = Ft({ type: "error" }).Newline("line").Append("DUPLICATE THEME TARGET", $).Wrap(`Theme id (${ou(id)}) is using multiple target name references.`).Newline().Line(F("{")).Line(`  "${store}": {`, F);
  const targets = $2.file.targets === null ? "package.json" : path2.basename($2.file.targets);
  const themes = $2.stores.get(store).themes;
  const eq = eqWS(themes, { padding: 1 });
  const last = keys(themes).pop();
  const solution = [
    "Remove target occurrences which point to the same theme id defined",
    `on the "${Fu(store)}" store in your ${$(targets)} file.`
  ];
  for (const p2 in themes) {
    const c = last === p2 ? "" : ",";
    write2.Line(
      themes[p2] === id ? `    ${k(`"${p2}": ${themes[p2]}`)}${c + eq(p2) + Tt} ${S.bold("duplicate id")}` : `    "${p2}": ${themes[p2] + c}`,
      F
    );
  }
  write2.Line(F("  }")).Line(F("}")).Newline().Line("How to fix?", F.bold).Wrap(solution, F).Newline().End($2.log.group).toLog().Break();
  $2.running ? i.exit(2) : process.exit(2);
}
function parseJson3(file, data) {
  try {
    return json.parse(data);
  } catch (e3) {
    if (e3 instanceof json.JSONError) {
      error.json(e3, file, "Runtime failure due to invalid JSON syntax");
    }
    return null;
  }
}
async function setTemplates() {
  for (const template of ["templates", "customers", "metaobject"]) {
    for (const file of $2.paths[template].input) {
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
      if ($2.mode.hot) {
        $2.hot.alias[base] = {};
        if (!has("order", data)) continue;
        if (has("sections", data)) {
          for (const alias of data.order) {
            if (has(alias, data.sections)) {
              if (has("type", data.sections[alias])) {
                const { type: type2 } = data.sections[alias];
                if (!has(type2, $2.hot.alias[base])) $2.hot.alias[base][type2] = [];
                if (!$2.hot.alias[base][type2].includes(alias)) {
                  $2.hot.alias[base][type2].push(alias);
                }
              } else {
                warn2(`missing "type" in sections ${Z} ${alias} object`, rel);
              }
            } else {
              warn2(`missing "${alias}" in sections object`, rel);
            }
          }
        } else {
          warn2(w.punctuation("order[] requires {sections} object", F), rel);
        }
      }
      for (const target of values($2.target)) {
        setTemplateCache(target.store.domain, target.id, file, data);
      }
    }
  }
}
async function cmd(command2) {
  return new Promise((resolve3) => {
    const isWindows = node_os.platform() === "win32";
    const checkCommand = isWindows ? `where ${command2}` : `which ${command2}`;
    node_child_process.spawn(isWindows ? "cmd" : "sh", [isWindows ? "/c" : "-c", checkCommand], { stdio: "ignore" }).on("exit", (code) => resolve3(code === 0)).on("error", () => resolve3(false));
  });
}
async function getEditor() {
  if ($2.project.textEditor !== null && $2.config.editor === null) return;
  const warn2 = warnOption("os / editor");
  if ($2.config.editor !== null) {
    if ($2.project.textEditor !== null && $2.project.textEditor === $2.config.editor) return;
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
    }[$2.platform] || null;
    if (TEXT_EDITORS === null) {
      warn2("unsupported platform", $2.platform);
    } else if (has($2.config.editor, TEXT_EDITORS)) {
      $2.project.textEditor = TEXT_EDITORS[$2.config.editor];
    } else {
      warn2("unsupported editor", $2.config.editor);
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
    }[$2.platform] || null;
    if (SUPPORTED_EDITORS === null) {
      warn2("unsupported platform", $2.platform);
    } else {
      for (const editor of SUPPORTED_EDITORS) {
        if (await cmd(editor)) {
          $2.project.textEditor = editor;
          break;
        }
      }
      if ($2.project.textEditor === null) {
        warn2("unsupported editor");
      }
    }
  }
}
async function setHotReloads() {
  if ($2.mode.watch === false && $2.mode.hot === false || $2.running === true) return;
  const warn2 = warnOption("HOT Reloads");
  if ($2.env.sync > 1) {
    warn2("HOT Reloads can only be used on 1 store");
    return;
  } else if ($2.target.length > 1) {
    warn2("HOT Reloads can only be used on 1 theme");
    return;
  }
  if (!isObject($2.config.hot) && !isNil($2.config.hot) && $2.config.hot !== false) {
    throws.typeError(
      {
        option: "config",
        name: "hot",
        provided: $2.config.hot,
        expects: "boolean | {}"
      }
    );
  }
  if (isObject($2.config.hot) && isEmpty($2.config.hot) === false) {
    for (const prop in $2.config.hot) {
      if (prop === "server" || prop === "socket") {
        if (isNumber($2.config.hot[prop])) {
          $2.hot[prop] = $2.config.hot[prop];
        } else {
          throws.option(
            {
              option: "hot",
              name: prop,
              value: $2.config.hot[prop],
              expects: "number"
            }
          );
        }
      } else if (prop === "label" || prop === "eject") {
        if (isBoolean($2.config.hot[prop])) {
          $2.hot[prop] = $2.config.hot[prop];
        } else {
          throws.option(
            {
              option: "hot",
              name: prop,
              value: $2.config.hot[prop],
              expects: "visible | hidden"
            }
          );
        }
      } else if (prop === "client") {
        if ($2.config.hot[prop] === "inject" || $2.config.hot[prop] === "extension") {
          $2.hot[prop] = $2.config.hot[prop];
        } else {
          throws.option(
            {
              option: "hot",
              name: prop,
              value: $2.config.hot[prop],
              expects: "inject | extension"
            }
          );
        }
      } else if (prop === "flags") {
        if (isArray($2.config.hot[prop])) {
          for (const flag of $2.config.hot[prop]) {
            $2.hot[prop][flag] = false;
          }
        } else {
          throws.option({
            option: "hot",
            name: prop,
            value: $2.config.hot[prop],
            expects: "string[]"
          });
        }
      } else if (prop === "method") {
        if ($2.config.hot[prop] === "hot" || $2.config.hot[prop] === "live" || $2.config.hot[prop] === "refresh") {
          $2.hot[prop] = $2.config.hot[prop];
        } else {
          throws.option({
            option: "hot",
            name: prop,
            value: $2.config.hot[prop],
            expects: "hot | live | refresh"
          });
        }
      } else if (prop === "layouts") {
        if (isArray($2.config.hot[prop])) {
          $2.hot[prop] = [];
          for (const layout of $2.config.hot[prop]) {
            if (isString(layout)) {
              const filename = path2.basename(layout);
              if (!$2.hot[prop].includes(filename)) {
                $2.hot[prop].push(filename);
              }
            } else {
              throws.option({
                option: "hot",
                name: prop,
                value: $2.config.hot[prop],
                expects: "string"
              });
            }
          }
        } else {
          throws.option({
            option: "hot",
            name: prop,
            value: $2.config.hot[prop],
            expects: "string[]"
          });
        }
      } else {
        if (has(prop, $2.hot)) {
          throws.typeError({
            option: "hot",
            name: prop,
            provided: $2.config.hot[prop],
            expects: typeof $2.hot[prop]
          });
        }
      }
    }
  }
  const from = path2.join($2.dirs.module, HOT_SNIPPET);
  if (!fsExtra.existsSync(from)) {
    return throws([
      "Failed to obtain the source HOT Snippet injection file.",
      "This is required and should be located within the Syncify",
      `installation path: ${ou(from)}`
    ], [
      `Please submit an issue to: ${Ee("https://github.com/panoply/syncify")}`,
      "You can also try to re-install Syncify and trying again."
    ]);
  }
  $2.hot.source = path2.join($2.root, HOT_SOURCE);
  if (!fsExtra.existsSync($2.hot.source)) {
    fsExtra.copyFileSync(path2.join($2.dirs.module, HOT_SNIPPET), $2.hot.source);
  } else {
    if ($2.project.hotVersion !== "0.6.0") {
      fsExtra.copyFileSync(path2.join($2.dirs.module, HOT_SNIPPET), $2.hot.source);
      $2.project.hotVersion = "0.6.0";
    }
  }
  $2.hot.cache.root = path2.join($2.dirs.hot, `${$2.target.default.id}`);
  $2.hot.cache.snippet = path2.join($2.hot.cache.root, HOT_SNIPPET);
  if (!fsExtra.existsSync($2.hot.cache.root)) fsExtra.mkdirSync($2.hot.cache.root);
  await snippet2($2.target.default);
  runtime.hot();
}

// syncify/options/settings/json.ts
var import_anymatch4 = __toESM(require_anymatch());
function setJsonOptions() {
  if (!has("transform", $2.config) || !has("json", $2.config.transform)) return;
  const { json } = $2.config.transform;
  if (isNil(json)) return;
  if (!isObject(json)) {
    throws.typeError(
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
        $2.json[option] = $2.json.options.indentSize = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.crlf = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.removeComments = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.useTab = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.arrays = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.objects = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = $2.json.options.exclude = json[option];
      } else {
        throws.typeError(
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
        $2.json[option] = (0, import_anymatch4.default)(getResolvedPaths(json[option]));
      } else {
        throws.typeError(
          {
            option: "json",
            name: option,
            provided: exclude[option],
            expects: "string | string[]"
          }
        );
      }
    } else if (option === "terse" && $2.mode.terse === true) {
      if (isEmpty(json.terse)) {
        $2.json.terse.enabled = false;
        warn2("Terse option is empty, minification will not apply");
      } else if (isBoolean(json.terse) && json.terse === true) {
        $2.json.terse.enabled = true;
      } else if (isObject(json.terse)) {
        $2.json.terse.enabled = true;
        for (const p2 in json.terse) {
          if (p2 !== "exclude" && has(p2, $2.json.terse)) {
            if (isBoolean(json.terse[option])) {
              $2.json.terse[p2] = json.terse[p2];
            } else {
              throws.typeError(
                {
                  option: `json ${Z} terse`,
                  name: p2,
                  provided: json.terse[p2],
                  expects: "boolean"
                }
              );
            }
          } else if (p2 === "exclude") {
            $2.json.terse.exclude = (0, import_anymatch4.default)(getResolvedPaths(json.terse[option]));
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
  if (!has("liquid", $2.config.transform) || isEmpty($2.config.transform.liquid)) return;
  if (!isObject($2.config.transform.liquid)) {
    throws.typeError(
      {
        option: "transform",
        name: "liquid",
        expects: "{}",
        provided: typeof $2.config.transform.liquid
      }
    );
  }
  const warn2 = warnOption("Liquid Transform");
  if (has("terse", $2.config.transform.liquid) && $2.mode.terse === true) {
    $import("html-minifier-terser");
    if (isEmpty($2.config.transform.liquid.terse)) {
      $2.liquid.terse.enabled = false;
      warn2("Terse option is empty, minification will not apply");
    } else if (isBoolean($2.config.transform.liquid) && $2.config.transform.liquid === true) {
      $2.liquid.terse.enabled = true;
    } else if (isObject($2.config.transform.liquid.terse)) {
      $2.liquid.terse.enabled = true;
      const { terse } = $2.config.transform.liquid;
      for (const p2 of LIQUID_TERSE_KEYS) {
        if (has(p2, terse)) $2.liquid.terse.liquid[p2] = terse[p2];
      }
      for (const p2 in MARKUP_TERSE_KEYS) {
        if (has(p2, terse)) $2.liquid.terse.markup[p2] = terse[p2];
      }
      if (has("exclude", terse)) {
        $2.liquid.terse.exclude = (0, import_anymatch5.default)(getResolvedPaths(terse.exclude));
      }
    }
  }
}

// syncify/options/settings/plugins.ts
function setPlugins() {
  if (!has("plugins", $2.config)) return;
  if (!isArray($2.config.plugins)) return;
  for (const plugin of $2.config.plugins) {
    if (has("onInit", plugin)) plugin.onInit.call({ ...$2 }, $2.config);
    if (has("onChange", plugin)) {
      $2.plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }
    if (has("onTransform", plugin)) {
      $2.plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }
    if ($2.mode.watch) {
      if (has("onWatch", plugin)) {
        $2.plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }
      if (has("onReload", plugin)) {
        $2.plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }
    if ($2.mode.build) {
      if (has("onBuild", plugin)) {
        $2.plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }
  }
}

// syncify/options/settings/processors.ts
function setProcessors() {
  if (has("processor", $2.config) && isObject($2.config.processor)) {
    for (const prop in $2.config.processor) {
      if (isEmpty($2.config.processor[prop])) {
        continue;
      }
      if (isArray($2.config.processor[prop])) {
        $2.processor[prop].config = $2.config.processor[prop];
      } else if (isObject($2.config.processor[prop])) {
        if (prop === "esbuild") {
          $2.processor[prop] = merge($2.processor[prop], $2.config.processor[prop]);
        } else {
          $2.processor[prop].config = merge($2.processor[prop].config, $2.config.processor[prop]);
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
  if (!has("script", $2.config.transform)) return;
  if (!$2.config.transform.script || isEmpty($2.config.transform.script)) return;
  const warn2 = warnOption("Script Transform");
  if (has("entryPoints", $2.processor.esbuild)) {
    warn2("processor option is not allowed and was omitted", "entryPoints");
    delete $2.processor.esbuild.entryPoints;
  }
  const transforms = getTransform($2.config.transform.script, { flatten: true });
  if (!has("absWorkingDir", $2.processor.esbuild)) {
    $2.processor.esbuild.absWorkingDir = $2.cwd;
  }
  for (const script2 of transforms) {
    const keyDir = script2.snippet ? "snippets" : "assets";
    const { name: name2 } = renameFileParse(script2.input, script2.rename);
    let rename;
    if (!name2.endsWith(".js") && !name2.endsWith(".mjs")) {
      rename = name2 + ".js";
    } else if (name2.endsWith(".cjs")) {
      throws.option({
        option: "transform.script",
        name: "rename",
        value: name2,
        expects: ".js | .mjs",
        reason: [
          "You cannot use cjs extensions in Shopify themes.",
          "The .cjs extension is for Node, themes are a web environment. "
        ]
      });
    } else {
      rename = name2;
    }
    const has2 = hasProp(script2);
    const bundle = o2();
    if (script2.snippet) {
      if (!rename.endsWith(".liquid")) rename = rename + ".liquid";
      bundle.attrs = [];
      bundle.snippet = true;
      bundle.namespace = "snippets" /* Snippets */;
      bundle.type = 4 /* Snippet */;
      if (has2("attrs") && isEmpty(script2.attrs) === false) {
        if (isArray(script2.attrs)) {
          for (let i2 = 0; i2 < script2.attrs.length; i2++) {
            const attr = script2.attrs[i2];
            if (isArray(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              throws.typeError(
                {
                  option: "transform.script",
                  name: `attrs[${i2}]`,
                  provided: attr,
                  expects: "string[]"
                }
              );
            }
          }
        } else {
          throws.typeError(
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
    bundle.output = path2.join($2.dirs.output, keyDir, rename);
    bundle.key = path2.join(keyDir, rename);
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;
    $2.processor.esbuild.outfile = bundle.output;
    if (has2("esbuild")) {
      if (isBoolean(script2.esbuild) || isNil(script2.esbuild)) {
        bundle.esbuild = merge($2.processor.esbuild);
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
        if (esProp("plugins") && has("plugins", $2.processor.esbuild)) {
          script2.esbuild.plugins.unshift(...$2.processor.esbuild.plugins);
        }
        bundle.esbuild = merge($2.processor.esbuild, script2.esbuild);
      } else {
        throws.typeError({
          option: "script",
          name: "esbuild",
          provided: typeof script2.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      bundle.esbuild = merge($2.processor.esbuild);
    }
    bundle.esbuild.entryPoints = [bundle.input];
    if ($2.mode.watch) {
      if (!has2("watch")) {
        bundle.watch = s2();
      } else {
        if (!isArray(script2.watch)) {
          throws.typeError({
            option: "script",
            name: "watch",
            provided: script2.watch,
            expects: "string[]"
          });
        }
        const watchers = getResolvedPaths(script2.watch);
        bundle.watchCustom = (0, import_anymatch6.default)(watchers);
        bundle.watch = s2(watchers);
      }
    } else {
      bundle.watch = s2();
    }
    try {
      await esbuildBundle(bundle);
    } catch (err) {
      throws.runtime(err, {
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
    if ($2.mode.terse) {
      bundle.esbuild = merge(bundle.esbuild, {
        exclude: void 0
      });
    }
    $2.script.push(bundle);
  }
}

// syncify/options/settings/style.ts
var import_anymatch7 = __toESM(require_anymatch());
async function getExternalModules() {
  await $import("postcss");
  await $import("clean-css");
  const postcss = await readConfigFile("postcss.config", "PostCSS", (config) => {
    if (config !== null) {
      $2.processor.postcss.config = config;
    }
  });
  if (postcss !== null) {
    $2.processor.postcss.file = postcss.file;
    $2.processor.postcss.config = postcss.config;
  }
  $2.processor.tailwind.installed = getModules($2.pkg, "tailwindcss");
  if ($2.processor.tailwind.installed) {
    await $import("tailwindcss");
    const tw = await readConfigFile("tailwind.config", "Tailwind", (config) => {
      if (config !== null) {
        $2.processor.tailwind.config = config;
      }
    });
    if (tw !== null) {
      $2.processor.tailwind.file = tw.file;
      $2.processor.tailwind.config = tw.config;
    }
  }
}
async function setStyleConfig() {
  if (!has("style", $2.config.transform)) return;
  if (!$2.config.transform.style || isEmpty($2.config.transform.style)) return;
  await getExternalModules();
  const warn2 = warnOption("Style Transform");
  const styles = getTransform($2.config.transform.style, { flatten: true });
  const path5 = normalPath($2.config.input);
  for (let i2 = 0; i2 < styles.length; i2++) {
    const style2 = styles[i2];
    const has2 = hasProp(style2);
    const bundle = o2();
    if (isUndefined(style2.input)) {
      throws.option({
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
    bundle.sass = /\.s[ca]ss$/.test(style2.input);
    bundle.tailwind = null;
    if (has2("postcss")) {
      if (isArray(style2.postcss) && style2.postcss.length > 0) {
        defineProperty(bundle, "postcss", { get() {
          return style2.postcss;
        } });
      } else {
        if (isBoolean(style2.postcss) && style2.postcss !== false && isNil(style2.postcss) === false) {
          defineProperty(bundle, "postcss", { get() {
            return merge($2.processor.postcss.config);
          } });
        } else {
          throws.typeError(
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
      defineProperty(bundle, "postcss", { get() {
        return merge($2.processor.postcss.config);
      } });
    }
    if (has2("tailwind")) {
      if (!$2.processor.tailwind.installed) {
        throws.dependency(["tailwindcss"]);
      }
      const override = isObject(style2.tailwind);
      if (override || isBoolean(style2.tailwind) && style2.tailwind !== false && isNil(style2.tailwind) === false) {
        const tw = merge(override ? style2.tailwind : $2.processor.tailwind.config);
        if (isArray(tw.content) && isEmpty(tw.content)) {
          tw.content = [
            path2.join(
              path2.relative($2.cwd, $2.dirs.input),
              "**",
              "*.{css,js,ts,jsx,tsx,vue,svelte,liquid,json,schema}"
            )
          ];
        }
        defineProperty(bundle, "tailwind", { get() {
          return tw;
        } });
        if ($2.mode.watch && isArray(bundle.tailwind.content)) {
          const files = await glob__default.default(bundle.tailwind.content);
          if ($2.processor.tailwind.map === null) {
            $2.processor.tailwind.map = o2();
          }
          $2.processor.tailwind.map[i2] = s2(files);
        }
      } else {
        throws.typeError(
          {
            option: "style",
            name: "tailwind",
            provided: bundle.tailwind,
            expects: "boolean | {}"
          }
        );
      }
    }
    if (has2("sass") && style2.sass !== false) {
      if ($2.processor.sass.loaded === false) {
        await $import("sass-embedded", { as: true });
        $2.processor.sass.loaded = true;
      }
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && isNil(style2.sass) === false) {
        if (override === false) {
          defineProperty(bundle, "sass", { get() {
            return style2.sass;
          } });
        } else {
          bundle.sass = merge($2.processor.sass.config, style2.sass);
          for (const option in style2.sass) {
            if (option === "sourcemap" || option === "warnings" || option === "quietDeps") {
              if (isBoolean(style2.sass[option])) {
                bundle.sass[option] = style2.sass[option];
              } else {
                throws.typeError(
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
                throws.typeError(
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
                throws.option(
                  {
                    option: "sass",
                    name: option,
                    value: style2.sass[option],
                    expects: "expanded | compressed"
                  }
                );
              }
            }
          }
        }
      } else {
        throws.typeError(
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
        throws.typeError(
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
        throws.typeError(
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
    if ($2.mode.watch && has2("watch")) {
      if (!isArray(style2.watch)) {
        throws.typeError(
          {
            option: "styles",
            name: "watch",
            provided: style2.watch,
            expects: "string[]"
          }
        );
      }
      for (const uri2 of style2.watch) {
        const globs = await glob__default.default(path2.join($2.cwd, path5(uri2)));
        if (globs.length === 0 && uri2[0] !== "!") {
          warn2("Cannot resolve watch glob/path uri", uri2);
        }
        for (const p2 of globs) {
          if (await fsExtra.exists(p2)) {
            watch.push(p2);
          } else {
            warn2("No file exists in path", p2);
          }
        }
      }
      watch.push(bundle.input);
      watch.forEach((x) => $2.paths.assets.exclude.add(x));
      bundle.watch = (0, import_anymatch7.default)(watch);
    } else {
      bundle.watch = (0, import_anymatch7.default)([bundle.input]);
      $2.paths.assets.exclude.add(bundle.input);
    }
    if (isObject(bundle.sass)) {
      bundle.sass.include.unshift($2.cwd, path2.join($2.cwd, rename.dir));
      if (hasPath("sass.include", style2)) {
        bundle.sass.include = style2.sass.include.map((p2) => path2.join($2.cwd, p2));
      }
    }
    if (has2("snippet")) {
      if (!isBoolean(style2.snippet)) {
        throws.typeError(
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
          for (let i3 = 0; i3 < style2.attrs.length; i3++) {
            const attr = style2.attrs[i3];
            if (isArray(attr)) {
              bundle.attrs.push(attr.join(""));
            } else {
              throws.typeError(
                {
                  option: "style",
                  name: `attrs[${i3}]`,
                  provided: attr,
                  expects: "string[]"
                }
              );
            }
          }
        } else {
          throws.typeError(
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
      if (!(rename.name.endsWith(".liquid") && bundle.rename.endsWith(".liquid"))) {
        bundle.rename = rename.name + ".liquid";
      }
    } else {
      bundle.rename = rename.name;
    }
    $2.style.push(bundle);
  }
}
function setSvgOptions() {
  if (!has("svg", $2.config.transform)) return;
  if (!$2.config.transform.svg || isEmpty($2.config.transform.svg)) return;
  $import("svgo");
  const warn2 = warnOption("SVG Transform");
  const svgs = getTransform($2.config.transform.svg, { flatten: false });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path5) => {
      if (path2.extname(path5) === ".svg") return true;
      warn2("Excluded file which is not an SVG type", path2.relative($2.cwd, path5));
      return false;
    });
    if (files.length === 0) {
      warn2("No SVG file paths were resolved");
      continue;
    }
    const has2 = hasProp(svg2);
    const bundle = o2();
    bundle.uuid = uuid();
    bundle.input = s2(files);
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
      bundle.svgo = isObject(svg2.svgo) ? merge($2.processor.svgo, svg2.svgo) : true;
      if (bundle.format === "sprite") {
        if (isObject(svg2.sprite)) {
          const hasSvgProp = hasProp(svg2.sprite);
          if (hasSvgProp("attrs") && isEmpty(svg2.sprite.attrs) === false) {
            if (isArray(svg2.sprite.attrs)) {
              for (let i2 = 0; i2 < svg2.sprite.attrs.length; i2++) {
                const attr = svg2.sprite.attrs[i2];
                if (isArray(attr)) {
                  bundle.sprite.attrs.push(attr.join(""));
                } else {
                  throws.typeError(
                    {
                      option: "transform.script",
                      name: `attrs[${i2}]`,
                      provided: attr,
                      expects: "string[]"
                    }
                  );
                }
              }
            } else {
              throws.typeError(
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
                  throws.typeError({
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
                  throws.typeError({
                    option: "transform.svg.sprite.symbols",
                    name: "xmlns",
                    expects: "true | false",
                    provided: svg2.sprite.symbols.xmlns
                  });
                }
              }
            } else {
              throws.typeError({
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
      throws.option({
        option: "transform.svg",
        name: "format",
        value: "undefined",
        expects: "sprite | file",
        reason: [
          `SVG transforms require you to provide a ${ou("format")}. Syncify needs to knows how`,
          "it should handle the SVG input and what to generate as an output."
        ]
      });
    }
    $2.svg.push(bundle);
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
  if ($2.project.themeVersion === $2.pkg.version) {
    $2.vc.update = parseVersionNumber($2.pkg.version);
    $2.vc.update.number = $2.pkg.version;
    $2.vc.update.dir = path2.join($2.dirs.versions, `v${$2.vc.major}`);
    $2.vc.update.zip = path2.join($2.vc.update.dir, `${$2.vc.number}.zip`);
    const v2 = parseVersionNumber($2.project.themeVersion);
    $2.vc.number = $2.project.themeVersion;
    $2.vc.patch = v2.patch;
    $2.vc.minor = v2.minor;
    $2.vc.major = v2.major;
    $2.vc.dir = path2.join($2.dirs.versions, `v${$2.vc.major}`);
    $2.vc.zip = path2.join($2.vc.dir, `${$2.vc.number}.zip`);
  } else {
    const v2 = parseVersionNumber($2.pkg.version);
    $2.vc.number = $2.pkg.version;
    $2.vc.patch = v2.patch;
    $2.vc.minor = v2.minor;
    $2.vc.major = v2.major;
    $2.vc.dir = path2.join($2.dirs.versions, `v${$2.vc.major}`);
    $2.vc.zip = path2.join($2.vc.dir, `${$2.vc.number}.zip`);
  }
  $2.vc.update = merge({}, $2.vc);
  $2.vc.update.number = `${$2.vc.update.major}.${$2.vc.update.minor}.${$2.vc.update.patch}`;
  $2.vc.update.zip = path2.join($2.vc.update.dir, `${$2.vc.update.number}.zip`);
}

// syncify/options/configure.ts
async function Configure() {
  project();
  if ($2.mode.create || $2.mode.projects) return;
  await getPkg();
  await getEnv();
  await getCaches();
  await getTargets();
  await getConfig();
  await getEditor();
  if ($2.mode.init || $2.mode.keychain) return;
  await setBaseDirs();
  await setTargets();
  setFilters();
  if ($2.mode.link) return;
  setProcessors();
  await setPublishConfig();
  await setOutputDirs();
  await setImportDirs();
  await setPaths();
  setVersion();
  setJsonOptions();
  setLiquidOptions();
  setPlugins();
  setStdin();
  if ($2.mode.pull || $2.mode.push) return;
  await setSectionOptions();
  await setScriptOptions();
  setSvgOptions();
  await setStyleConfig();
  await setTemplates();
  if ($2.mode.align) await setAlignMerge();
  if ($2.mode.hot) await setHotReloads();
  if ($2.mode.watch) runtime.time();
}
var import_write_file_atomic4 = __toESM(require_lib());

// syncify/http/access/accessScopes.ts
function accessScopeList(domain, token) {
  return new Promise((resolve3) => {
    http.request(domain, token)({
      data: {
        query: `query AccessScopeList{currentAppInstallation{accessScopes{description handle}}}`
      }
    }).then(({ data: { currentAppInstallation } }) => {
      resolve3({ scopes: currentAppInstallation.accessScopes, error: null });
    }).catch((error2) => {
      resolve3({ scopes: [], error: error2.response });
    });
  });
}
async function accessStore(store) {
  return xior__default.default.head(`https://${store}.myshopify.com`).then(() => ({
    exists: true,
    error: null
  })).catch((error2) => ({
    exists: false,
    error: error2
  }));
}

// syncify/prompts/credentials.ts
async function PromptCredentialsFile(options) {
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
  state.method = await PromptStoreMethod();
  if (isEmpty($2.keychain) === false) {
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
  if (state.domain !== null && state.store === null) {
    state.store = state.domain.replace(/\.myshopify\.com$/, "");
  }
  const credential = g.nl(
    `# Credentials: ${state.domain}`,
    `${state.store}_api_token = '${state.token.trim()}'`
  );
  if ($2.file.env !== null) {
    const env2 = fsExtra.readFileSync($2.file.env, "utf8");
    state.env = env2.trimEnd() + "\n\n" + credential;
  } else {
    state.env = credential;
  }
  return state;
  async function PromptStoreMethod() {
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.StorageMethod,
      name: "method",
      type: "select",
      choices: choose([
        {
          name: "env",
          hint: "Per-Project .env file token storage"
        },
        {
          name: "keychain",
          hint: "Globally accessible token vault storage"
        }
      ], { prop: "name", padding: 3 })()
    }).catch(cancel);
    return resolve3.method;
  }
  async function PromptExisting() {
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.ExistingToken,
      name: "existing",
      type: "toggle",
      hint: "   Choose an existing token from keychain?",
      default: "Yes",
      disabled: "No",
      enabled: "Yes"
    }).catch(cancel);
    return resolve3.existing;
  }
  async function PromptKeychain() {
    const { domain } = await (0, import_enquirer.prompt)({
      theme,
      message: label.WhichKeychain,
      type: "select",
      name: "domain",
      choices: choose(keys($2.keychain))((domain2, value) => {
        const tokens2 = keys($2.keychain[domain2]);
        const hint = `${tokens2.length} ${plur("token", tokens2.length)} available`;
        return {
          name: domain2,
          hint
        };
      })
    }).catch(cancel);
    state.domain = domain;
    state.store = domain.replace(/\.myshopify\.com$/, "");
    const tokens = keys($2.keychain[domain]);
    if (tokens.length > 1) {
      const { name: name2 } = await (0, import_enquirer.prompt)({
        theme,
        message: label.SelectToken,
        type: "select",
        name: "name",
        choices: choose(tokens)((name3) => ({
          name: name3,
          hint: `added ${timeAgo($2.keychain[domain][name3].updated)}`
        }))
      }).catch(cancel);
      state.name = name2;
      state.token = $2.keychain[domain][name2].token;
    } else {
      state.name = tokens[0];
      state.token = $2.keychain[domain][state.name].token;
    }
  }
  async function PromptStoreDomain() {
    let valid = 2;
    const dispose = intercept();
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.ShopifyDomain,
      type: "input",
      name: "domain",
      format(value) {
        return valid === 1 ? se(`${value}.myshopify.com`) : (valid === 3 ? S(`${value}`) : value) + F(".myshopify.com");
      },
      async validate(value) {
        this.state.symbols.pointer = "";
        if (value.length === 0) {
          valid = 3;
          return fr(
            S.bold("MISSING STORE NAME"),
            "\n",
            `Please enter the ${ou("myshopify.com")} store domain name.`
          );
        } else if (value.length < 3) {
          valid = 3;
          return fr(
            S.bold("INVALID STORE NAME"),
            "\n",
            `Store name must be more than ${ou("3")} characters long.`,
            "Shopify does support short-name store domains."
          );
        } else if (has(value, $2.stores)) {
          valid = 3;
          return fr(
            S.bold("INVALID STORE NAME"),
            "\n",
            "There is an existing project connected to this domain.",
            "You cannot overwrite existing credentials in the keychain."
          );
        }
        const { exists: exists2, error: error2 } = await accessStore(value);
        if (exists2 === false) {
          const context = error2.response.status === 404 ? `Store "${ou(`${value}.myshopify.com`)}" does not exist on the Shopify platform.` : `Connection failed to interface with ${S.bold(`${value}.myshopify.com`)} store.`;
          valid = 3;
          return fr(
            S.bold(`ERROR ${Nu} STORE NOT FOUND`),
            "\n",
            error2.message.replace(/(\d+)/, S.bold("$1")) + ".",
            context,
            "Please check the correct store name has been provided."
          );
        }
        valid = 1;
        return true;
      }
    }).catch(cancel);
    dispose();
    return resolve3.domain;
  }
  async function PromptStoreToken() {
    const dispose = intercept();
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.APIAdminToken,
      type: "input",
      name: "token",
      async validate(value) {
        this.state.symbols.pointer = "";
        if (value.length === 0) {
          return fr(
            S.bold("REQUIRED"),
            "\n",
            "You must provide an API Token"
          );
        } else if (value.length < 10) {
          return fr(
            S.bold("INVALID TOKEN"),
            "\n",
            "The API Access token you provided is far too short to be valid.",
            "Tokens have a minimum length, please check the token and try again."
          );
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return fr(
            S.bold("BAD TOKEN"),
            "\n",
            "The API Access token you provided contains invalid characters.",
            `Shopify tokens must match the following pattern${M} ${ou("^[a-zA-Z0-9_]+$")}`
          );
        }
        const { scopes, error: error2 } = await accessScopeList(state.domain, value);
        if (!isNil(error2)) {
          return fr(
            S.bold(`ERROR ${error2.status}`),
            "\n",
            error2.data.errors || error2.statusText,
            "Please check the API Access Token is active and try again."
          );
        } else {
          const tui = Ft().Prepend("ERROR IN SCOPES", S.bold).Line(`Syncify requires certain ${ou("read")} and ${ou("write")} access scopes.`, S).Prepend("Ensure the token has access to all scopes listed in red (below) and try again.", S);
          if (scopes.length > 0) {
            for (const { handle } of scopes) {
              if (handle in state.scopes) {
                state.scopes[handle] = true;
                tui.Line(`${Ru} ${handle}`, se);
              }
            }
          }
          let count = 0;
          for (const scope in state.scopes) {
            if (state.scopes[scope] === false) {
              tui.Line(`${Tt} ${scope}`, S);
              count = count + 1;
            }
          }
          if (count > 0) {
            return tui.Newline().toString();
          }
        }
        return true;
      }
    }).catch(cancel);
    dispose();
    return resolve3.token.trim();
  }
  async function PromptTokenName() {
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.APITokenName,
      required: true,
      type: "input",
      name: "name",
      hint: "Name the API Access Token (internal use)"
    }).catch(cancel);
    return resolve3.name;
  }
}

// syncify/utils/child.ts
async function execAsync(cmd2) {
  try {
    const { stdout: stdout3 } = await command(cmd2);
    return stdout3;
  } catch (e3) {
    throws(e3, [
      `This ${ou("child_process")} error and likely unrelated to Syncify.`,
      "It is unclear what has caused the issue, but consult the error message",
      "or please submit an issue on github repository."
    ]);
  }
}

// syncify/prompts/create.ts
async function SaveKeychain(access, options) {
  const { hash, cacheRootPath } = assign({ hash: $2.hash, cacheRootPath: $2.root }, options);
  if (has(access.domain, $2.keychain)) {
    if (has(access.name, $2.keychain[access.domain])) {
      const kc = $2.keychain[access.domain][access.name];
      kc.updated = access.updated;
      kc.projects.includes(hash) || kc.projects.push(hash);
    } else {
      assign($2.keychain[access.domain], {
        [access.name]: {
          name: access.name,
          created: access.created,
          updated: access.updated,
          projects: [hash],
          token: access.token
        }
      });
    }
  } else {
    $2.keychain[access.domain] = {
      [access.name]: {
        name: access.name,
        created: access.created,
        updated: access.updated,
        projects: [hash],
        token: access.token
      }
    };
  }
  await (0, import_write_file_atomic4.default)($2.file.keychain, JSON.stringify($2.keychain));
  await (0, import_write_file_atomic4.default)(path2.join(cacheRootPath, ".env"), access.env);
}
async function isFlatStructure() {
  try {
    for (const dir of [
      "assets",
      "config",
      "layout",
      "locales",
      "sections",
      "snippets",
      "templates"
    ]) {
      const dirPath = path2.resolve(dir);
      const exists2 = await fsExtra.pathExists(dirPath);
      if (!exists2) return false;
      const stats = await fsExtra.stat(dirPath);
      if (!stats.isDirectory()) return false;
    }
    return true;
  } catch (e3) {
    throws([
      `Error checking directories when performing ${Fu("sy init")} tasks.`
    ], [
      "This error was thrown during fs operations. It is typically rare and likely",
      "unrelated to Syncify. Please report the issue on github."
    ]);
    return false;
  }
}

// syncify/prompts/init.ts
async function Init() {
  if ($2.file.project !== null && $2.project.credentials !== null && $2.project.targetSource !== null) {
    return ErrorProjectExists();
  } else if (await isFlatStructure()) {
    return ErrorFlatStructure();
  }
  const write2 = Ft().Wrap(
    F,
    "Hello Hacker \uD83D\uDC4B\n\n",
    "Launch a new project by selecting an open-source theme, usage example, or importing a store theme,",
    `which Syncify will strap for you. API credentials can be stored in a project-level ${ou(".env")} file`,
    "or within the Syncify keychain."
  );
  write2.NL.toLog({ clear: true });
  await PromptDirectory();
  await PromptBootstrap();
  await PromptCredentials();
  await PromptTargets().then((tasks) => {
    write2.Each(tasks, (task) => write2.Line(`${Ru} ${task}`)).NL.End($2.log.group).Break().toLog();
  });
  process.exit(0);
}
async function PromptDirectory() {
  if ($2.project.credentials === null && $2.project.targetSource === null) {
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label.ProjectPath,
      name: "cwd",
      type: "toggle",
      header: o.line + F.bold("Initialise in current directory?") + o.next,
      hint: "  " + $2.cwd,
      default: "Yes",
      disabled: "No",
      enabled: "Yes"
    }).catch(cancel);
    if (!resolve3.cwd) {
      Ft().NL.Wrap(
        T.bold,
        "Change or create a new directory where you want to initialize a Syncify project",
        `and then run the ${ou("sy init")} command from that location.`
      ).toLog({ clear: true });
      return cancel(null);
    }
  }
}
async function PromptSelectStap() {
  const resolve3 = await (0, import_enquirer.prompt)({
    theme,
    message: label.StrapSource,
    type: "select",
    name: "strap",
    choices: choose([
      {
        name: "themes",
        message: "Themes",
        hint: "Boilerplate theme straps"
      },
      {
        name: "examples",
        message: "Examples",
        hint: "One of the usage examples"
      },
      {
        name: "import",
        message: "Import",
        hint: "Import from Shopify store",
        disabled: true
      },
      {
        name: "repository",
        message: "Repository",
        hint: "Clone from github repository",
        disabled: true
      },
      {
        name: "skip",
        message: "Skip",
        hint: "Skip theme strapping"
      }
    ], { prop: "name" })()
  }).catch(cancel);
  return resolve3.strap;
}
async function PromptBootstrap() {
  const straps = s2([
    ...STRAP_THEMES.map(([name3]) => name3),
    ...STRAP_EXAMPLES.map(([name3]) => name3)
  ]);
  const select = $2.argv.length > 1 ? $2.argv[1] : null;
  let name2 = null;
  let repository = null;
  let strap = null;
  if (straps.has(select)) {
    name2 = select;
    repository = `https://github.com/syncifycli/${select}.git`;
  }
  if (name2 === null) {
    strap = await PromptSelectStap();
  }
  if (strap === "examples" || strap === "themes") {
    name2 = await PromptChooseTemplate(strap);
    repository = `https://github.com/syncifycli/${name2}.git`;
  }
  if (name2 !== null && repository !== null && strap !== null) {
    await CreateStrap({ repository, projectPath: $2.cwd });
  }
}
async function PromptCredentials() {
  if ($2.project.credentials === null) {
    const access = await PromptCredentialsFile();
    $2.project.credentials = access.method === "env" ? "env" : "kc";
    $2.project.createdAt = Date.now();
    await createCaches($2.hash);
    await createProject(path2.join($2.root, $2.project.name));
    if (access.method === "keychain") {
      await SaveKeychain(access);
    } else {
      $2.file.env = path2.join($2.cwd, ".env");
      await fsExtra.writeFile($2.file.env, access.env);
      await getEnv();
    }
  }
}
async function PromptTargets() {
  const tasks = [];
  if ($2.file.targets === null || $2.project.targetSource === null) {
    const hasPKG = $2.pkg !== null;
    const method = await PromptStorage();
    if (method === "package.json") {
      hasPKG || tasks.push("Generated a package.json file in project");
      tasks.push("Project targets stored in package.json file");
    } else {
      tasks.push(`Project targets stored in ${method} file`);
    }
    await getTargets({
      method,
      action: 4 /* PROMPT_THEMES */,
      banner: true,
      oninit: false
    });
    tasks.push(`Linked ${$2.target.length} ${plur("theme", $2.target.length)} from store`);
  }
  return tasks;
}
async function PromptChooseTemplate(strap) {
  const boilers = (strap2) => strap2 === "themes" ? STRAP_THEMES : STRAP_EXAMPLES;
  const resolve3 = await (0, import_enquirer.prompt)({
    theme,
    type: "select",
    name: "template",
    message: label.ChooseStrap,
    choices: boilers(strap).map(([name2, hint, disabled = false]) => ({
      name: name2,
      hint,
      disabled
    }))
  }).catch(cancel);
  return resolve3.template;
}
async function CreateStrap(options) {
  log.spinner("Cloning Strap", { color: se });
  await execAsync(`git clone --depth 1 ${options.repository} .`);
  await delay();
  await fsExtra.rm(path2.join(options.projectPath, ".git"), { recursive: true, force: true });
  log.spinner.stop();
}
function ErrorProjectExists() {
  Ft({ type: "error" }).Line(`PROJECT ALREADY EXISTS ${Tt}`, $.redBright).NL.Line("You cannot initialize inside of a pre-existing project.").Tree("info").NL.Line(`${F("NAME")}${M}     ${I($2.project.name)}`).Line(`${F("CWD")}${M}      ${I($2.cwd)}`).Line(`${F("CACHE")}${M}    ${I($2.dirs.cache)}`).Line(`${F("CREATED")}${M}  ${I(prettyDate($2.project.createdAt))}`).Line(`${F("UPDATED")}${M}  ${I(prettyDate($2.project.lastRunAt))}`).Line(`${F("TARGETS")}${M}  ${I($2.project.targetSource)}`).Line(`${F("AUTH")}${M}     ${I($2.project.credentials)}`).NL.End(`Syncify ${Nu} Error`, false).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
}
function ErrorFlatStructure() {
  Ft({ type: "error" }).Line(`FLAT DIRECTORY STRUCTURE ${Tt}`, $).NL.Line("Attempting to initialize a Syncify project within a flat structure.").Line("You will need to convert to a hierarchical structure and try again.").Tree("info").NL.Line("How to fix?", F.bold).Line(`Move theme directories into a sub-directory called ${Fu("source")}`, F).Line("Please refer to the documentation for more information:", F).NL.Line(`${Nu} ${Ee("https://syncify.sh/usage/directory-structures")}`, F).NL.End($2.log.group).BR.toLog();
  $2.running ? i.exit(0) : process.exit(0);
}

// syncify/prompts/link.ts
async function listThemes(store) {
  const stdout3 = Ft({ type: "info" });
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
    `Select themes to target and develop on. Selections will be written to the ${ou("package.json")}`,
    "file. If you wish to create, publish of change theme role, this is also possible.",
    F
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
      hint: `${space(value.name)} ${Be} ${F(value.role)}`,
      value
    };
  });
  choices.push(
    {
      role: "separator",
      message: h("\u2500".repeat(separator))
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
  if ($2.stores.length > 1) {
    choices.push(
      {
        role: "separator",
        message: h("\u2500".repeat(separator))
      },
      {
        name: "store",
        message: "Select Stores",
        hint: `${space("Select Stores")} ${Be} ${F("go back and choose store")}`
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
      if (isArray(value) && value.length > 0) {
        return bu(`${value.join(I(", "))}`);
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
      validate(value, _2, field) {
        if (field && field.name === theme2.name) {
          if (/[A-Z]/.test(value)) {
            return "\n" + _2.reset.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + _2.reset.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + _2.reset.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + _2.reset.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = bu.italic;
  theme.styles.typing = se;
  const template = JSON.stringify(config, null, 2);
  const snippet3 = await (0, import_enquirer.prompt)({
    name: "stores",
    type: "snippet",
    required: targets.map(({ name: name2 }) => name2),
    message: "Theme Targets",
    newline: o.next + o.next,
    render,
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return se(`${this.state.completed}% completed`);
        }
      }
      return ` ${Z}  ${Bu(`${this.state.completed}% completed`)}`;
    },
    theme,
    fields,
    template
  });
  const json = { syncify: JSON.parse(snippet3.stores.result) };
  const { save: save2 } = await (0, import_enquirer.prompt)({
    name: "save",
    type: "confirm",
    message: "Save Settings",
    theme,
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    },
    footer: o.line + [
      "",
      F("The following store and theme references will be saved"),
      F("to your package.json file on the syncify key property."),
      "",
      " " + JSON.stringify(json.syncify, null, 2).split("\n").join(o.next),
      ""
    ].join("\n" + o.line)
  });
  if (save2) {
    await setPkg({
      syncify: {
        targets: JSON.parse(snippet3.stores.result)
      }
    });
  }
  return $2.pkg.syncify.stores;
}
async function listStores() {
  const space = eqWS($2.stores, { prop: "name" });
  const choices = $2.stores.map((value) => ({
    name: value.name,
    message: value.domain,
    hint: `${space(value.name)} ${Be} ${F(`https://${value.domain}`)}`,
    value
  }));
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
      return se(value);
    }
  });
  return listThemes(store);
}
async function Link() {
  const stores = values($2.stores);
  if (stores.length > 1) {
    return listStores();
  } else {
    return listThemes($2.stores.default);
  }
}
async function GetProjectsDirs() {
  const dirs = await glob.glob(`${$2.home}/*`, {
    onlyFiles: false,
    onlyDirectories: true,
    absolute: true,
    cwd: $2.home
  });
  return dirs;
}
async function GetProjectNames(dirs) {
  const projects = [];
  for (const dir of dirs) {
    const file = await glob.glob([`${dir}/*`, `!${dir}/hot-snippet`], { cwd: $2.home, absolute: true });
    const uri2 = file[0];
    projects.push({
      hash: path.basename(dir),
      name: path.basename(uri2),
      project: fsExtra.readJsonSync(uri2),
      uri: uri2
    });
  }
  return projects;
}
async function Projects() {
  const label2 = labels({
    padding: 0,
    prompts: [
      "Project",
      "Action"
    ]
  });
  const directories = await GetProjectsDirs();
  if (directories.length === 0) return;
  const write2 = Ft();
  const files = await GetProjectNames(directories);
  const count = directories.length === 1 ? `is ${$("1")} project` : `are ${$(directories.length)} projects`;
  write2.Wrap(
    F,
    `There ${count} using Syncify on this device. Select the project you wish to inspect or configure.`
  ).Newline().toLog({ clear: true });
  const select = await PromptProjects();
  const file = files[select];
  const project2 = files[select].project;
  const auth = project2.credentials === "env" ? ".env" : "keychain";
  write2.NL.Line(` ${F("NAME")}${M}              ${I(project2.name)}`).Line(` ${F("UUID")}${M}              ${I(file.hash)}`).Line(` ${F("LOCATION")}${M}          ${I(project2.dir)}`).Line(` ${F("CACHE")}${M}             ${I(file.uri)}`).Line(` ${F("CACHE EXPIRY")}${M}      ${I(prettyDate(project2.expires))}`).Line(` ${F("LAST RUN")}${M}          ${I(prettyDate(project2.lastRunAt))}`).Line(` ${F("CREATED AT")}${M}        ${I(prettyDate(project2.createdAt))}`).Line(` ${F("CREDENTIALS")}${M}       ${I(auth)}`).Line(` ${F("SYNCIFY VERSION")}${M}   v${I(project2.syncifyVersion)}`).Line(` ${F("HOT VERSION")}${M}       v${I(project2.hotVersion)}`).NL.End("Syncify").Break().toLog();
  async function PromptProjects() {
    const resolve3 = await (0, import_enquirer.prompt)({
      theme,
      message: label2.Project,
      name: "project",
      type: "select",
      choices: choose(files, { prop: "name" })(({ name: name2, project: project3 }, value) => ({
        name: name2,
        value,
        message: name2,
        hint: project3.dir
      })),
      result(name2) {
        return Object.entries(this.map([name2]))[0][1];
      }
    }).catch(cancel);
    return resolve3.project;
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
var t2 = (e3) => e3;

// syncify/index.ts
async function syncify() {
  await Configure().then(() => {
    if ($2.mode.init) {
      Init();
    } else if ($2.mode.doctor) {
      Doctor();
    } else if ($2.mode.link) {
      Link();
    } else if ($2.mode.projects) {
      Projects();
    } else if ($2.mode.keychain) ; else if ($2.mode.build) {
      Build();
    } else if ($2.mode.watch) {
      Watch();
    } else if ($2.mode.push) {
      Push();
    } else if ($2.mode.pull) {
      Pull();
    } else if ($2.mode.pack) {
      Pack();
    } else if ($2.mode.publish) {
      Publish();
    }
  }).catch(throws.internal);
}

exports.$ = $;
exports.$2 = $2;
exports.Be = Be;
exports.COMMAND_MODES = COMMAND_MODES;
exports.Ee = Ee;
exports.F = F;
exports.Ft = Ft;
exports.Fu = Fu;
exports.Go = Go;
exports.He = He;
exports.I = I;
exports.It = It;
exports.Lt = Lt;
exports.M = M;
exports.Mu = Mu;
exports.NooP = NooP;
exports.Nu = Nu;
exports.P = P;
exports.Ru = Ru;
exports.S = S;
exports.STRAP_EXAMPLES = STRAP_EXAMPLES;
exports.STRAP_THEMES = STRAP_THEMES;
exports.St = St;
exports.Tt = Tt;
exports.Z = Z;
exports.assign = assign;
exports.au = au;
exports.cu = cu;
exports.du = du;
exports.eqWS = eqWS;
exports.event = event;
exports.forEach = forEach;
exports.forKeys = forKeys;
exports.g = g;
exports.h = h;
exports.i = i;
exports.includes = includes;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.k = k;
exports.log = log;
exports.o = o;
exports.o2 = o2;
exports.qD = qD;
exports.r = r;
exports.runtime = runtime;
exports.syncify = syncify;
exports.t = t2;
exports.toArray = toArray;
