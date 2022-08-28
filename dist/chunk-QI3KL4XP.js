'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var os = require('os');
var events = require('events');
var zlib = require('zlib');
var glob4 = require('glob');
var fsExtra = require('fs-extra');
var connect = require('axios');
var notifier = require('node-notifier');
var stream = require('stream');
var console$1 = require('console');
var perf_hooks = require('perf_hooks');
var path$1 = require('path');
var anymatch4 = require('anymatch');
var htmlMinifierTerser = require('html-minifier-terser');
var matter = require('gray-matter');
var Markdown = require('markdown-it');
var sass$1 = require('sass');
var chokidar = require('chokidar');
var process3 = require('process');
var ws$1 = require('ws');
var statics = require('serve-static');
var handler = require('finalhandler');
var http = require('http');
var dotenv = require('dotenv');
var bundleRequire = require('bundle-require');
var spawn3 = require('cross-spawn');
var utils = require('markdown-it/lib/common/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var glob4__default = /*#__PURE__*/_interopDefaultLegacy(glob4);
var connect__default = /*#__PURE__*/_interopDefaultLegacy(connect);
var notifier__default = /*#__PURE__*/_interopDefaultLegacy(notifier);
var anymatch4__default = /*#__PURE__*/_interopDefaultLegacy(anymatch4);
var matter__default = /*#__PURE__*/_interopDefaultLegacy(matter);
var Markdown__default = /*#__PURE__*/_interopDefaultLegacy(Markdown);
var chokidar__default = /*#__PURE__*/_interopDefaultLegacy(chokidar);
var process3__default = /*#__PURE__*/_interopDefaultLegacy(process3);
var statics__default = /*#__PURE__*/_interopDefaultLegacy(statics);
var handler__default = /*#__PURE__*/_interopDefaultLegacy(handler);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var spawn3__default = /*#__PURE__*/_interopDefaultLegacy(spawn3);

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
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/ansis@1.4.0/node_modules/ansis/bundle.js
var require_bundle = __commonJS({
  "node_modules/.pnpm/ansis@1.4.0/node_modules/ansis/bundle.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var e2 = function(e3) {
      let [, t3] = /([a-f\d]{3,6})/i.exec(e3) || [];
      const r2 = t3 ? t3.length : 0;
      if (3 === r2)
        t3 = t3[0] + t3[0] + t3[1] + t3[1] + t3[2] + t3[2];
      else if (6 !== r2)
        return [0, 0, 0];
      const n2 = parseInt(t3, 16);
      return [n2 >> 16 & 255, n2 >> 8 & 255, 255 & n2];
    };
    var t2 = (e3, t3, r2) => t3 > e3 ? t3 : e3 > r2 ? r2 : e3;
    var r = function(e3, t3, r2) {
      let n2 = e3.indexOf(t3);
      if (n2 < 0)
        return e3;
      const o3 = t3.length;
      let s2 = 0, i2 = "";
      for (; ~n2; )
        i2 += e3.substr(s2, n2 - s2) + r2, s2 = n2 + o3, n2 = e3.indexOf(t3, s2);
      return i2 + e3.substr(s2);
    };
    var n = ((e3) => {
      const t3 = e3 || (process || {}), r2 = t3.env || {}, n2 = t3.argv || [], o3 = t3.stdout && t3.stdout.isTTY, s2 = "NO_COLOR" in r2 || n2.includes("--no-color") || n2.includes("--color=false"), i2 = "FORCE_COLOR" in r2 || n2.includes("--color"), c2 = "dumb" !== r2.TERM && /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r2.TERM), g2 = o3 && c2 || "win32" === t3.platform;
      return !s2 && (i2 || g2 || "CI" in r2);
    })();
    var o2 = { open: "", close: "" };
    var s = n ? ([e3, t3]) => ({ open: `\x1B[${e3}m`, close: `\x1B[${t3}m` }) : () => o2;
    var i = { reset: s([0, 0]), inverse: s([7, 27]), hidden: s([8, 28]), bold: s([1, 22]), dim: s([2, 22]), faint: s([2, 22]), italic: s([3, 23]), underline: s([4, 24]), doubleUnderline: s([21, 24]), strikethrough: s([9, 29]), strike: s([9, 29]), frame: s([51, 54]), encircle: s([52, 54]), overline: s([53, 55]), black: s([30, 39]), red: s([31, 39]), green: s([32, 39]), yellow: s([33, 39]), blue: s([34, 39]), magenta: s([35, 39]), cyan: s([36, 39]), white: s([37, 39]), gray: s([90, 39]), grey: s([90, 39]), blackBright: s([90, 39]), redBright: s([91, 39]), greenBright: s([92, 39]), yellowBright: s([93, 39]), blueBright: s([94, 39]), magentaBright: s([95, 39]), cyanBright: s([96, 39]), whiteBright: s([97, 39]), bgBlack: s([40, 49]), bgRed: s([41, 49]), bgGreen: s([42, 49]), bgYellow: s([43, 49]), bgBlue: s([44, 49]), bgMagenta: s([45, 49]), bgCyan: s([46, 49]), bgWhite: s([47, 49]), bgBlackBright: s([100, 49]), bgRedBright: s([101, 49]), bgGreenBright: s([102, 49]), bgYellowBright: s([103, 49]), bgBlueBright: s([104, 49]), bgMagentaBright: s([105, 49]), bgCyanBright: s([106, 49]), bgWhiteBright: s([107, 49]) };
    var c = { ansi256: n ? (e3) => ({ open: `\x1B[38;5;${e3}m`, close: "\x1B[39m" }) : () => o2, bgAnsi256: n ? (e3) => ({ open: `\x1B[48;5;${e3}m`, close: "\x1B[49m" }) : () => o2, rgb: n ? (e3, t3, r2) => ({ open: `\x1B[38;2;${e3};${t3};${r2}m`, close: "\x1B[39m" }) : () => o2, bgRgb: n ? (e3, t3, r2) => ({ open: `\x1B[48;2;${e3};${t3};${r2}m`, close: "\x1B[49m" }) : () => o2 };
    var g = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    var l = class {
      constructor() {
        const e3 = (e4) => e4;
        return e3.strip = (e4) => e4.replace(g, ""), Object.setPrototypeOf(e3, a), e3;
      }
    };
    var p = {};
    var b = /(\r*\n)/g;
    var u = (e3, t3, n2) => {
      let o3 = e3, s2 = t3;
      void 0 !== n2 && (o3 = n2.openStack + e3, s2 = t3 + n2.closeStack);
      const i2 = (e4) => ((e5, t4) => {
        if (!e5)
          return "";
        const { openStack: n3, closeStack: o4 } = t4;
        if (~e5.indexOf("\x1B"))
          for (; void 0 !== t4; )
            e5 = r(e5, t4.close, t4.open), t4 = t4.parent;
        return ~e5.indexOf("\n") && (e5 = e5.replace(b, o4 + "$1" + n3)), n3 + e5 + o4;
      })(e4, i2.props);
      return Object.setPrototypeOf(i2, a), i2.props = { open: e3, close: t3, openStack: o3, closeStack: s2, parent: n2 }, i2.open = o3, i2.close = s2, i2;
    };
    for (let e3 in i) {
      const { open: t3, close: r2 } = i[e3];
      p[e3] = { get() {
        const n2 = u(t3, r2, this.props);
        return Object.defineProperty(this, e3, { value: n2 }), n2;
      } };
    }
    p.visible = { get() {
      return u("", "", this.props);
    } }, p.ansi256 = { get() {
      return (e3) => {
        e3 = t2(e3, 0, 255);
        const { open: r2, close: n2 } = c.ansi256(e3);
        return u(r2, n2, this.props);
      };
    } }, p.bgAnsi256 = { get() {
      return (e3) => {
        e3 = t2(e3, 0, 255);
        const { open: r2, close: n2 } = c.bgAnsi256(e3);
        return u(r2, n2, this.props);
      };
    } }, p.rgb = { get() {
      return (e3, r2, n2) => {
        e3 = t2(e3, 0, 255), r2 = t2(r2, 0, 255), n2 = t2(n2, 0, 255);
        const { open: o3, close: s2 } = c.rgb(e3, r2, n2);
        return u(o3, s2, this.props);
      };
    } }, p.hex = { get() {
      return (t3) => {
        const { open: r2, close: n2 } = c.rgb(...e2(t3));
        return u(r2, n2, this.props);
      };
    } }, p.bgRgb = { get() {
      return (e3, r2, n2) => {
        e3 = t2(e3, 0, 255), r2 = t2(r2, 0, 255), n2 = t2(n2, 0, 255);
        const { open: o3, close: s2 } = c.bgRgb(e3, r2, n2);
        return u(o3, s2, this.props);
      };
    } }, p.bgHex = { get() {
      return (t3) => {
        const { open: r2, close: n2 } = c.bgRgb(...e2(t3));
        return u(r2, n2, this.props);
      };
    } }, p.ansi = p.ansi256, p.fg = p.ansi256, p.bgAnsi = p.bgAnsi256, p.bg = p.bgAnsi256;
    var a = Object.defineProperties(() => {
    }, p);
    var h = new l();
    exports.Ansis = l, exports.default = h;
  }
});

// node_modules/.pnpm/ansis@1.4.0/node_modules/ansis/index.js
var require_ansis = __commonJS({
  "node_modules/.pnpm/ansis@1.4.0/node_modules/ansis/index.js"(exports, module) {
    var bundle2 = require_bundle();
    module.exports = bundle2.default;
    module.exports.Ansis = bundle2.Ansis;
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
    eaw.slice = function(text, start2, end) {
      textLen = eaw.length(text);
      start2 = start2 ? start2 : 0;
      end = end ? end : 1;
      if (start2 < 0) {
        start2 = textLen + start2;
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
        if (eawLen >= start2 - (charLen == 2 ? 1 : 0)) {
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

// node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module) {
    var has2 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
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
        if (has2.call(events, name))
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

// node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js"(exports, module) {
    var mimicFn = (to, from2) => {
      for (const prop2 of Reflect.ownKeys(from2)) {
        Object.defineProperty(to, prop2, Object.getOwnPropertyDescriptor(from2, prop2));
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
    var process5 = global.process;
    var processOk = function(process6) {
      return process6 && typeof process6 === "object" && typeof process6.removeListener === "function" && typeof process6.emit === "function" && typeof process6.reallyExit === "function" && typeof process6.listeners === "function" && typeof process6.kill === "function" && typeof process6.pid === "number" && typeof process6.on === "function";
    };
    if (!processOk(process5)) {
      module.exports = function() {
        return function() {
        };
      };
    } else {
      assert = __require("assert");
      signals = require_signals();
      isWin = /^win/i.test(process5.platform);
      EE = __require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      if (process5.__signal_exit_emitter__) {
        emitter = process5.__signal_exit_emitter__;
      } else {
        emitter = process5.__signal_exit_emitter__ = new EE();
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
          load();
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
            process5.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process5.emit = originalProcessEmit;
        process5.reallyExit = originalProcessReallyExit;
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
          var listeners = process5.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process5.kill(process5.pid, sig);
          }
        };
      });
      module.exports.signals = function() {
        return signals;
      };
      loaded = false;
      load = function load2() {
        if (loaded || !processOk(global.process)) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process5.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process5.emit = processEmit;
        process5.reallyExit = processReallyExit;
      };
      module.exports.load = load;
      originalProcessReallyExit = process5.reallyExit;
      processReallyExit = function processReallyExit2(code) {
        if (!processOk(global.process)) {
          return;
        }
        process5.exitCode = code || 0;
        emit("exit", process5.exitCode, null);
        emit("afterexit", process5.exitCode, null);
        originalProcessReallyExit.call(process5, process5.exitCode);
      };
      originalProcessEmit = process5.emit;
      processEmit = function processEmit2(ev, arg) {
        if (ev === "exit" && processOk(global.process)) {
          if (arg !== void 0) {
            process5.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process5.exitCode, null);
          emit("afterexit", process5.exitCode, null);
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
    var load;
    var originalProcessReallyExit;
    var processReallyExit;
    var originalProcessEmit;
    var processEmit;
  }
});

// node_modules/.pnpm/rambdax@8.1.0/node_modules/rambdax/dist/rambdax.mjs
function type(input) {
  if (input === null) {
    return "Null";
  } else if (input === void 0) {
    return "Undefined";
  } else if (Number.isNaN(input)) {
    return "NaN";
  }
  const typeResult = Object.prototype.toString.call(input).slice(8, -1);
  return typeResult === "AsyncFunction" ? "Async" : typeResult;
}
var _isArray = Array.isArray;
function isTruthy(x) {
  if (_isArray(x)) {
    return x.length > 0;
  }
  if (type(x) === "Object") {
    return Object.keys(x).length > 0;
  }
  return Boolean(x);
}
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
function curry(fn, args = []) {
  return (..._args) => ((rest) => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
}
function path(pathInput, obj) {
  if (arguments.length === 1)
    return (_obj) => path(pathInput, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  let willReturn = obj;
  let counter = 0;
  const pathArrValue = typeof pathInput === "string" ? pathInput.split(".") : pathInput;
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
function _indexOf(valueToFind, list) {
  if (!_isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`);
  }
  const typeOfValue = type(valueToFind);
  if (!["Object", "Array", "NaN", "RegExp"].includes(typeOfValue))
    return list.indexOf(valueToFind);
  let index = -1;
  let foundIndex = -1;
  const {
    length
  } = list;
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
function includes(valueToFind, iterable) {
  if (arguments.length === 1)
    return (_iterable) => includes(valueToFind, _iterable);
  if (typeof iterable === "string") {
    return iterable.includes(valueToFind);
  }
  if (!iterable) {
    throw new TypeError(`Cannot read property 'indexOf' of ${iterable}`);
  }
  if (!_isArray(iterable))
    return false;
  return _indexOf(valueToFind, iterable) > -1;
}
function isType(xType, x) {
  if (arguments.length === 1) {
    return (xHolder) => isType(xType, xHolder);
  }
  return type(x) === xType;
}
async function mapFastAsyncFn(fn, arr) {
  const promised = arr.map((a, i) => fn(a, i));
  return Promise.all(promised);
}
function mapFastAsync(fn, arr) {
  if (arguments.length === 1) {
    return async (holder) => mapFastAsyncFn(fn, holder);
  }
  return new Promise((resolve2, reject) => {
    mapFastAsyncFn(fn, arr).then(resolve2).catch(reject);
  });
}
function omit(propsToOmit, obj) {
  if (arguments.length === 1)
    return (_obj) => omit(propsToOmit, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  const propsToOmitValue = typeof propsToOmit === "string" ? propsToOmit.split(",") : propsToOmit;
  const willReturn = {};
  for (const key in obj) {
    if (!propsToOmitValue.includes(key)) {
      willReturn[key] = obj[key];
    }
  }
  return willReturn;
}
function reduceFn(reducer, acc, list) {
  if (!_isArray(list)) {
    throw new TypeError("reduce: list must be array or iterable");
  }
  let index = 0;
  const len = list.length;
  while (index < len) {
    acc = reducer(acc, list[index], index, list);
    index++;
  }
  return acc;
}
var reduce = curry(reduceFn);
var _Set = class {
  constructor() {
    this.set = /* @__PURE__ */ new Set();
    this.items = {};
  }
  checkUniqueness(item3) {
    const type$1 = type(item3);
    if (["Null", "Undefined", "NaN"].includes(type$1)) {
      if (type$1 in this.items) {
        return false;
      }
      this.items[type$1] = true;
      return true;
    }
    if (!["Object", "Array"].includes(type$1)) {
      const prevSize = this.set.size;
      this.set.add(item3);
      return this.set.size !== prevSize;
    }
    if (!(type$1 in this.items)) {
      this.items[type$1] = [item3];
      return true;
    }
    if (_indexOf(item3, this.items[type$1]) === -1) {
      this.items[type$1].push(item3);
      return true;
    }
    return false;
  }
};
function uniq(list) {
  const set2 = new _Set();
  const willReturn = [];
  list.forEach((item3) => {
    if (set2.checkUniqueness(item3)) {
      willReturn.push(item3);
    }
  });
  return willReturn;
}
function has(prop2, obj) {
  if (arguments.length === 1)
    return (_obj) => has(prop2, _obj);
  if (!obj)
    return false;
  return obj.hasOwnProperty(prop2);
}
function hasPath(pathInput, obj) {
  if (arguments.length === 1) {
    return (objHolder) => hasPath(pathInput, objHolder);
  }
  return path(pathInput, obj) !== void 0;
}
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
function isNil(x) {
  return x === void 0 || x === null;
}
function last(listOrString) {
  if (typeof listOrString === "string") {
    return listOrString[listOrString.length - 1] || "";
  }
  return listOrString[listOrString.length - 1];
}
function multiply(x, y) {
  if (arguments.length === 1)
    return (_y) => multiply(x, _y);
  return x * y;
}
reduce(multiply, 1);

// src/shared/native.ts
var log = console.log;
var nil = "";
var ws = " ";
var nl = "\n";
var assign = Object.assign;
var defineProperty = Object.defineProperty;
var keys = Object.keys;
var values = Object.values;
var is = Object.is;
var from = Array.from;
var isArray = Array.isArray;
var isBuffer = Buffer.isBuffer;
var isUndefined = isType("Undefined");
var isObject = isType("Object");
var isBoolean = isType("Boolean");
var isRegex = isType("RegExp");
var isNumber = isType("Number");
var isString = isType("String");
var isFunction = isType("Function");
isType("Async");

// src/cli/ansi.ts
var ansi_exports = {};
__export(ansi_exports, {
  blackBright: () => blackBright,
  blue: () => blue,
  bold: () => bold,
  clear: () => clear,
  close: () => close,
  cyan: () => cyan,
  cyanBright: () => cyanBright,
  gray: () => gray,
  green: () => green,
  greenBright: () => greenBright,
  italic: () => italic,
  item: () => item,
  lightGray: () => lightGray,
  line: () => line,
  lpr: () => lpr,
  magenta: () => magenta,
  magentaBright: () => magentaBright,
  neonCyan: () => neonCyan,
  neonGreen: () => neonGreen,
  newline: () => newline,
  open: () => open,
  orange: () => orange,
  pink: () => pink,
  purge: () => purge,
  red: () => red,
  redBright: () => redBright,
  reset: () => reset,
  rpr: () => rpr,
  strike: () => strike,
  underline: () => underline,
  white: () => white,
  whiteBright: () => whiteBright,
  yellow: () => yellow,
  yellowBright: () => yellowBright
});
var import_ansis = __toESM(require_ansis());
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
  blackBright,
  white,
  whiteBright,
  gray,
  underline,
  bold,
  reset,
  italic,
  strike
} = import_ansis.default;
var lightGray = import_ansis.default.hex("#2a2a2e");
var pink = import_ansis.default.hex("#ff75d1");
var orange = import_ansis.default.hex("#FFAB40");
var neonGreen = import_ansis.default.hex("#56ef83");
var neonCyan = import_ansis.default.hex("#69d5fd");
var open = lightGray("\u250C\u2500 ");
var line = lightGray("\u2502  ");
var newline = lightGray(`${nl}\u2502${nl}`);
var item = lightGray("\u251C  ");
var close = lightGray("\u2514\u2500 ");
var lpr = gray("(");
var rpr = gray(")");

// src/cli/tui.ts
var tui_exports = {};
__export(tui_exports, {
  changed: () => changed,
  clear: () => clear2,
  closed: () => closed,
  compile: () => compile,
  deleted: () => deleted,
  ignored: () => ignored,
  item: () => item2,
  message: () => message,
  nwl: () => nwl,
  opened: () => opened,
  processor: () => processor,
  queued: () => queued,
  reloaded: () => reloaded,
  spawn: () => spawn,
  syncing: () => syncing,
  title: () => title,
  transform: () => transform,
  updated: () => updated,
  uploaded: () => uploaded,
  warning: () => warning,
  write: () => write
});

// node_modules/.pnpm/ansi-regex@6.0.1/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.0.1/node_modules/strip-ansi/index.js
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(ansiRegex(), "");
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

// node_modules/.pnpm/ansi-styles@6.1.0/node_modules/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red2, green2, blue2) => `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  const styles2 = {
    modifier: {
      reset: [0, 0],
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
  styles2.color.ansi = wrapAnsi16();
  styles2.color.ansi256 = wrapAnsi256();
  styles2.color.ansi16m = wrapAnsi16m();
  styles2.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles2, {
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
        const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let { colorString } = matches.groups;
        if (colorString.length === 3) {
          colorString = colorString.split("").map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
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
      value: (red2, green2, blue2) => styles2.ansi256ToAnsi(styles2.rgbToAnsi256(red2, green2, blue2)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles2.ansi256ToAnsi(styles2.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles2;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/wrap-ansi@8.0.1/node_modules/wrap-ansi/index.js
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

// node_modules/.pnpm/escape-string-regexp@5.0.0/node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/.pnpm/clean-stack@4.2.0/node_modules/clean-stack/index.js
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
var homeDir = typeof os__default["default"].homedir === "undefined" ? "" : os__default["default"].homedir().replace(/\\/g, "/");
function cleanStack(stack, { pretty = false, basePath: basePath2 } = {}) {
  const basePathRegex = basePath2 && new RegExp(`(at | \\()${escapeStringRegexp(basePath2.replace(/\\/g, "/"))}`, "g");
  if (typeof stack !== "string") {
    return void 0;
  }
  return stack.replace(/\\/g, "/").split("\n").filter((line2) => {
    const pathMatches = line2.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) {
      return false;
    }
    return !pathRegex.test(match);
  }).filter((line2) => line2.trim() !== "").map((line2) => {
    if (basePathRegex) {
      line2 = line2.replace(basePathRegex, "$1");
    }
    if (pretty) {
      line2 = line2.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
    }
    return line2;
  }).join("\n");
}

// node_modules/.pnpm/strip-json-comments@5.0.0/node_modules/strip-json-comments/index.js
var singleComment = Symbol("singleComment");
var multiComment = Symbol("multiComment");
var stripWithoutWhitespace = () => "";
var stripWithWhitespace = (string, start2, end) => string.slice(start2, end).replace(/\S/g, " ");
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

// src/constants.ts
var HOT_SNIPPET = "hot.js.liquid";
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
  "styles",
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
var CONSOLE_METHODS = [
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

// src/shared/utils.ts
var event = new events.EventEmitter();
function jsonc(data) {
  try {
    return JSON.parse(stripJsonComments(data).trim());
  } catch (e2) {
    throw new Error(e2);
  }
}
var sanitize = (message2) => {
  if (isBuffer(message2))
    return message2.toString();
  if (isObject(message2) || isArray(message2))
    return JSON.stringify(message2);
  return String(message2);
};
var toUpcase = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
var byteSize = (string) => {
  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;
};
var byteConvert = (bytes) => {
  if (bytes === 0)
    return "0b";
  const size = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return size === 0 ? `${bold(String(bytes))}${UNITS[size]}` : `${bold((bytes / 1024 ** size).toFixed(1))}${UNITS[size]}`;
};
var fileSize = (content, beforeSize) => {
  const size = byteSize(content);
  const gzip = byteConvert(zlib__default["default"].gzipSync(content).length);
  const before = byteConvert(beforeSize);
  const after = byteConvert(size);
  const saved = byteConvert(beforeSize - size);
  return {
    isSmaller: size > beforeSize || size === beforeSize,
    gzip,
    before,
    after,
    saved
  };
};
function getTime() {
  const now2 = new Date();
  return gray(
    (now2.getHours() < 10 ? "0" + now2.getHours() : now2.getHours()) + gray(":") + (now2.getMinutes() < 10 ? "0" + now2.getMinutes() : now2.getMinutes()) + gray(":") + (now2.getSeconds() < 10 ? "0" + now2.getSeconds() : now2.getSeconds())
  );
}
function addSuffix(i) {
  const a = i % 10;
  const b = i % 100;
  if (a === 1 && b !== 11)
    return i + "st";
  else if (a === 2 && b !== 12)
    return i + "nd";
  else if (a === 3 && b !== 13)
    return i + "rd";
  else
    return i + "th";
}

// src/cli/tui.ts
var opened = (name) => log(`${nl}${open}${gray(`${name} ~ ${getTime()}`)}`);
var closed = (name) => log(`${line}${nl}${close}${gray(`${name} ~ ${getTime()}`)}`);
var title = (name, color = "gray") => {
  log(`${nl}${open}${ansi_exports[color](`${name} ~ ${getTime()}`)}`);
};
var timer = (time) => time ? gray(` ~ ${time}`) : nil;
var arrow = gray(" \u2192  ");
var changed = (message2) => log(line + neonCyan("changed  ") + arrow + neonCyan(message2) + timer(getTime()));
var processor = (message2, time) => log(line + whiteBright("processor") + arrow + whiteBright(message2) + timer(time));
var transform = (message2) => log(line + whiteBright("transform") + arrow + whiteBright(message2));
var syncing = (file) => log(line + magentaBright("syncing  ") + arrow + magentaBright(file));
var queued = (file, pos) => log(line + yellowBright("waiting  ") + arrow + yellowBright(`${file} ~ ${bold(addSuffix(pos))} in queue`));
var uploaded = (theme, store, time) => log(line + neonGreen("uploaded ") + arrow + neonGreen(bold(theme) + " \u2192 " + store) + timer(time));
var reloaded = (type2, time) => log(line + orange("reloaded ") + arrow + orange(type2) + timer(time));
var message = (message2) => log(line + whiteBright(`${message2}`));
var compile = (message2) => log(item + whiteBright(`${message2}`));
var deleted = (message2) => log(item + orange(`deleted ${message2}`));
var updated = (message2) => log(item + neonGreen(`updated ${message2}`));
var ignored = (message2) => log(item + gray(`ignored ${message2}`));
var warning = (message2) => log(item + yellowBright(`${message2}`));
var clear2 = (purge2) => process.stdout.write(purge2 ? purge : clear);
var nwl = (blank) => isNil(blank) ? log(line) : log(nl);
var write = (message2) => log(line + message2);
var item2 = (message2) => log(item + message2);
var spawn = (data) => {
  const limit2 = process.stdout.columns - 5;
  const stdout = [];
  const stderr = [reset(line)];
  const error3 = data.search(/(?:\n {4}at .*)/);
  let message2 = [];
  if (/\berror\b:?/i.test(data) && error3 > 0) {
    message2 = data.slice(0, error3).split(nl);
    const stack = cleanStack(data.slice(error3), { pretty: true, basePath: process.cwd() });
    const lines = wrapAnsi(stack, limit2).split(nl);
    stderr.push(nl);
    while (lines.length !== 0) {
      const line2 = lines.shift();
      if (line2.trim().length > 0)
        stderr.push(reset(item + line2));
    }
  }
  if (message2.length === 0)
    message2 = data.split(nl);
  while (message2.length !== 0) {
    const line2 = message2.shift();
    if (line2.trim().length > 0)
      stdout.push(reset(line) + line2);
  }
  log(`${stdout.join(nl)}${stderr.length > 1 ? stderr.join(nl) : nil}`);
};

// src/cli/emitters.ts
function signal() {
  nwl(nil);
  log(gray("SIGINT"));
  process.exit();
}
function rejection(reason, p) {
  nwl();
  write(redBright(`Unhandled Promise Rejection at: ${p}`));
  nwl();
  write(gray(`${reason}`));
}
function exception(e2) {
  write(`Uncaught Exception: ${e2.message}`);
  nwl();
  write(`${e2.stack}`);
}

// node_modules/.pnpm/p-queue@7.3.0/node_modules/p-queue/dist/index.js
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
  let timer2;
  const cancelablePromise = new Promise((resolve2, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve2(promise);
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
    timer2 = options.customTimers.setTimeout.call(void 0, () => {
      if (typeof fallback === "function") {
        try {
          resolve2(fallback());
        } catch (error3) {
          reject(error3);
        }
        return;
      }
      const message2 = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError2 = fallback instanceof Error ? fallback : new TimeoutError(message2);
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError2);
    }, milliseconds);
    (async () => {
      try {
        resolve2(await promise);
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

// node_modules/.pnpm/p-queue@7.3.0/node_modules/p-queue/dist/lower-bound.js
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

// node_modules/.pnpm/p-queue@7.3.0/node_modules/p-queue/dist/priority-queue.js
var __classPrivateFieldGet = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
    const item3 = __classPrivateFieldGet(this, _PriorityQueue_queue, "f").shift();
    return item3 === null || item3 === void 0 ? void 0 : item3.run;
  }
  filter(options) {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __classPrivateFieldGet(this, _PriorityQueue_queue, "f").length;
  }
};
_PriorityQueue_queue = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/p-queue@7.3.0/node_modules/p-queue/dist/index.js
var __classPrivateFieldSet = function(receiver, state, value, kind2, f) {
  if (kind2 === "m")
    throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
var _PQueue_pendingCount;
var _PQueue_concurrency;
var _PQueue_isPaused;
var _PQueue_throwOnTimeout;
var _PQueue_doesIntervalAllowAnother_get;
var _PQueue_doesConcurrentAllowAnother_get;
var _PQueue_next;
var _PQueue_emitEvents;
var _PQueue_onResumeInterval;
var _PQueue_isIntervalPaused_get;
var _PQueue_tryToStartAnother;
var _PQueue_initializeIntervalIfNeeded;
var _PQueue_onInterval;
var _PQueue_processQueue;
var _PQueue_onEvent;
var timeoutError = new TimeoutError();
var AbortError2 = class extends Error {
};
var PQueue = class extends import_eventemitter3.default {
  constructor(options) {
    var _a3, _b, _c, _d;
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
    _PQueue_pendingCount.set(this, 0);
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
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a3 = options.intervalCap) === null || _a3 === void 0 ? void 0 : _a3.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
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
  async add(fn, options = {}) {
    return new Promise((resolve2, reject) => {
      const run2 = async () => {
        var _a3;
        var _b, _c;
        __classPrivateFieldSet(this, _PQueue_pendingCount, (_b = __classPrivateFieldGet2(this, _PQueue_pendingCount, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet2(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
        try {
          if ((_a3 = options.signal) === null || _a3 === void 0 ? void 0 : _a3.aborted) {
            reject(new AbortError2("The task was aborted."));
            return;
          }
          const operation = this.timeout === void 0 && options.timeout === void 0 ? fn({ signal: options.signal }) : pTimeout(Promise.resolve(fn({ signal: options.signal })), options.timeout === void 0 ? this.timeout : options.timeout, () => {
            if (options.throwOnTimeout === void 0 ? __classPrivateFieldGet2(this, _PQueue_throwOnTimeout, "f") : options.throwOnTimeout) {
              reject(timeoutError);
            }
            return void 0;
          });
          const result = await operation;
          resolve2(result);
          this.emit("completed", result);
        } catch (error3) {
          reject(error3);
          this.emit("error", error3);
        }
        __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_next).call(this);
      };
      __classPrivateFieldGet2(this, _PQueue_queue, "f").enqueue(run2, options);
      __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
      this.emit("add");
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  start() {
    if (!__classPrivateFieldGet2(this, _PQueue_isPaused, "f")) {
      return this;
    }
    __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    return this;
  }
  pause() {
    __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
  }
  clear() {
    __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet2(this, _PQueue_queueClass, "f"))(), "f");
  }
  async onEmpty() {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
  }
  async onSizeLessThan(limit2) {
    if (__classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit2) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet2(this, _PQueue_queue, "f").size < limit2);
  }
  async onIdle() {
    if (__classPrivateFieldGet2(this, _PQueue_pendingCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
  }
  get size() {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").size;
  }
  sizeBy(options) {
    return __classPrivateFieldGet2(this, _PQueue_queue, "f").filter(options).length;
  }
  get pending() {
    return __classPrivateFieldGet2(this, _PQueue_pendingCount, "f");
  }
  get isPaused() {
    return __classPrivateFieldGet2(this, _PQueue_isPaused, "f");
  }
};
_PQueue_carryoverConcurrencyCount = /* @__PURE__ */ new WeakMap(), _PQueue_isIntervalIgnored = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCount = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCap = /* @__PURE__ */ new WeakMap(), _PQueue_interval = /* @__PURE__ */ new WeakMap(), _PQueue_intervalEnd = /* @__PURE__ */ new WeakMap(), _PQueue_intervalId = /* @__PURE__ */ new WeakMap(), _PQueue_timeoutId = /* @__PURE__ */ new WeakMap(), _PQueue_queue = /* @__PURE__ */ new WeakMap(), _PQueue_queueClass = /* @__PURE__ */ new WeakMap(), _PQueue_pendingCount = /* @__PURE__ */ new WeakMap(), _PQueue_concurrency = /* @__PURE__ */ new WeakMap(), _PQueue_isPaused = /* @__PURE__ */ new WeakMap(), _PQueue_throwOnTimeout = /* @__PURE__ */ new WeakMap(), _PQueue_instances = /* @__PURE__ */ new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet2(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet2(this, _PQueue_intervalCap, "f");
}, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get2() {
  return __classPrivateFieldGet2(this, _PQueue_pendingCount, "f") < __classPrivateFieldGet2(this, _PQueue_concurrency, "f");
}, _PQueue_next = function _PQueue_next2() {
  var _a3;
  __classPrivateFieldSet(this, _PQueue_pendingCount, (_a3 = __classPrivateFieldGet2(this, _PQueue_pendingCount, "f"), _a3--, _a3), "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
  this.emit("next");
}, _PQueue_emitEvents = function _PQueue_emitEvents2() {
  this.emit("empty");
  if (__classPrivateFieldGet2(this, _PQueue_pendingCount, "f") === 0) {
    this.emit("idle");
  }
}, _PQueue_onResumeInterval = function _PQueue_onResumeInterval2() {
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
  __classPrivateFieldSet(this, _PQueue_timeoutId, void 0, "f");
}, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get2() {
  const now2 = Date.now();
  if (__classPrivateFieldGet2(this, _PQueue_intervalId, "f") === void 0) {
    const delay = __classPrivateFieldGet2(this, _PQueue_intervalEnd, "f") - now2;
    if (delay < 0) {
      __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pendingCount, "f") : 0, "f");
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
    __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_emitEvents).call(this);
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
  if (__classPrivateFieldGet2(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_pendingCount, "f") === 0 && __classPrivateFieldGet2(this, _PQueue_intervalId, "f")) {
    clearInterval(__classPrivateFieldGet2(this, _PQueue_intervalId, "f"));
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
  }
  __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet2(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet2(this, _PQueue_pendingCount, "f") : 0, "f");
  __classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
}, _PQueue_processQueue = function _PQueue_processQueue2() {
  while (__classPrivateFieldGet2(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) {
  }
}, _PQueue_onEvent = async function _PQueue_onEvent2(event2, filter) {
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
var axios = connect__default["default"].create(
  {
    responseType: "json",
    headers: {}
  }
);
var queue = new PQueue(
  {
    concurrency: 5,
    interval: 250,
    intervalCap: 5
  }
);
var requeue = (status) => {
  if (is(status, 429) || is(status, 500))
    return true;
  if (!queue.isPaused)
    queue.pause();
  return false;
};

// src/logger/console.ts
var console_exports = {};
__export(console_exports, {
  catcher: () => catcher,
  changed: () => changed2,
  complete: () => complete,
  deleted: () => deleted,
  error: () => error,
  filesize: () => filesize,
  hook: () => hook,
  info: () => info,
  process: () => processor,
  spawn: () => spawn2,
  syncing: () => syncing2,
  throws: () => throws,
  transform: () => transform,
  unhook: () => unhook,
  updated: () => updated,
  upload: () => upload,
  uploaded: () => uploaded,
  warn: () => warn,
  warning: () => warning2
});
var native = /* @__PURE__ */ new Map();
var intercept = (callback) => {
  const stdout = new stream.PassThrough();
  const stderr = new stream.PassThrough();
  stdout.write = (data) => callback("stdout", data);
  stderr.write = (data) => callback("stderr", data);
  const internal = new console$1.Console(stdout, stderr);
  for (const method of CONSOLE_METHODS) {
    native.set(method, console[method]);
    console[method] = internal[method];
  }
  return () => {
    for (const method of CONSOLE_METHODS)
      console[method] = native.get(method);
    native.clear();
  };
};

// src/options/index.ts
var cache = {};
var minify = {
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    templates: true,
    exclude: []
  },
  script: {
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    mangleProps: null,
    legalComments: "inline",
    mangleQuoted: false,
    keepNames: false
  },
  views: {
    minifyScript: true,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    stripDashes: true,
    collapseWhitespace: true,
    ignoreTags: [],
    ignoreObjects: [],
    exclude: []
  }
};
var processor2 = {
  json: {
    indent: 2,
    useTab: false,
    crlf: false,
    exclude: []
  },
  postcss: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: []
  },
  sass: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {
      warnings: true,
      style: "compressed",
      sourcemap: true,
      includePaths: ["node_modules"]
    }
  },
  esbuild: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {
      bundle: true,
      format: "esm",
      splitting: false,
      sourcemap: true,
      watch: false,
      write: false,
      incremental: true,
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
    required: false,
    loaded: false,
    file: false,
    config: {
      svg: {
        dimensionAttributes: false,
        namespaceClassnames: false,
        namespaceIDs: false
      }
    }
  },
  svgo: {
    installed: false,
    required: false,
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
        "prefixIds"
      ]
    }
  }
};
var hot = {
  inject: true,
  server: 3e3,
  socket: 8089,
  method: "hot",
  scroll: "preserved",
  layouts: ["theme.liquid"],
  label: "visible",
  output: null,
  renderer: "{% render 'hot.js.liquid', server: 3000, socket: 8089 %}",
  snippet: null,
  alive: {},
  assets: {
    js: /* @__PURE__ */ new Set(),
    css: /* @__PURE__ */ new Set(),
    svg: /* @__PURE__ */ new Set()
  }
};
var config = {
  input: "source",
  output: "theme",
  import: "import",
  export: "export",
  stores: null,
  config: ".",
  hot: false,
  spawn: {
    build: null,
    watch: null
  },
  paths: {
    assets: "assets/*",
    config: "config/*.json",
    layout: "layout/*.liquid",
    locales: "locales/*.json",
    sections: "sections/**/*.liquid",
    snippets: "snippets/*.liquid",
    metafields: "metafields/**/*.json",
    redirects: "redirects.yaml",
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
    pages: {
      author: "",
      language: "html"
    }
  },
  transforms: {
    svg: null,
    image: null,
    style: null,
    script: null
  },
  minify: {
    json: false,
    views: false,
    script: false
  }
};
var bundle = {
  version: null,
  cli: false,
  cwd: null,
  silent: false,
  prod: false,
  dev: true,
  hot: false,
  dirs: {},
  sync: {
    themes: [],
    stores: []
  },
  mode: {
    build: false,
    prompt: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    pages: false,
    pull: false,
    push: false,
    vsc: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false
  },
  spawn: {
    paths: /* @__PURE__ */ new Set(),
    invoked: false,
    commands: {}
  },
  watch: /* @__PURE__ */ new Set(),
  paths: {},
  section: {},
  cmd: {},
  json: {},
  page: {
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
  },
  image: [],
  style: [],
  script: [],
  svg: {
    sprite: [],
    inline: []
  },
  set config(merge) {
    assign(config, merge);
  },
  get config() {
    return config;
  },
  get processor() {
    return processor2;
  },
  get minify() {
    return minify;
  }
};
var mark = [];
function start() {
  mark.push(perf_hooks.performance.now());
}
var active;
function now() {
  const ms = perf_hooks.performance.now() - mark[mark.length - 1];
  if (ms < 1e3)
    return `${ms.toFixed(0)}ms`;
  const s = ms / 1e3;
  if (s < 60)
    return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;
  const m = (s / 60).toFixed(0);
  return `${m}m ${s - 60 * Number(m)}s ${+ms.toFixed(0).slice(1)}ms`;
}
function stop(id = active) {
  const ms = perf_hooks.performance.now() - mark.pop();
  delete mark[id];
  if (ms < 1e3)
    return `${ms.toFixed(0)}ms`;
  const s = ms / 1e3;
  if (s < 60)
    return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;
  const m = (s / 60).toFixed(0);
  return `${m}m ${s - 60 * Number(m)}s ${+ms.toFixed(0).slice(1)}ms`;
}

// src/logger/console.ts
var warning2 = {
  current: null,
  count: 0,
  process: {}
};
var uploads = /* @__PURE__ */ new Set();
var listen = null;
var idle = false;
var group = "Syncify";
var title2 = nil;
process.stdin.on("data", (data) => {
  const input = data.toString().trim().toLowerCase();
  if (input === "w") {
    for (const prop2 in warning2.process) {
      if (warning2.process[prop2].size === 0)
        continue;
      title(prop2, "yellow");
      for (const message2 of warning2.process[prop2].values()) {
        if (typeof message2 === "string" && message2.length > 0)
          write(message2);
      }
      warning2.process[prop2].clear();
    }
    warning2.count = 0;
  }
});
var hook = (name) => {
  if (warning2.current !== name)
    warning2.current = name;
  if (!has(name, warning2.process)) {
    warning2.current = name;
    warning2.process[name] = /* @__PURE__ */ new Set();
  }
  listen = intercept((stream, data) => {
    if (data.charCodeAt(0) === 9474) {
      process[stream].write(data);
    } else {
      warning2.count += 1;
      const text = data.split("\n");
      while (text.length !== 0) {
        warning2.process[name].add(`${yellowBright(text.shift().trimStart())}`);
      }
    }
  });
};
var complete = () => {
};
var unhook = () => {
  listen();
  listen = null;
};
var syncing2 = (message2) => {
  if (warning2.count > 0) {
    const count = bold(`! ${warning2.count} ${warning2.count > 1 ? "warnings" : "warning"}`);
    warning(`${count} ${yellowBright(`~ Type ${bold("w")} and press ${bold("enter")} to view`)}`);
  }
  if (bundle.hot) {
    reloaded(bold("HOT REPLACEMENT"), now());
  }
  syncing(message2);
  if (queue.pending > 0)
    queued(message2, queue.pending);
};
var changed2 = (file) => {
  const close2 = title2 !== file.relative;
  start();
  if (close2)
    closed(group);
  if (group !== "Syncify" && close2)
    clear2();
  group = file.namespace;
  if (close2) {
    clear2();
    title(file.kind);
    title2 = file.relative;
  }
  if (!(file.relative in warning2))
    warning2[file.relative] = /* @__PURE__ */ new Set();
  if (bundle.mode.watch) {
    nwl();
    changed(file.relative);
  }
};
var upload = (theme) => {
  uploads.add([theme.target, theme.store, stop()]);
  if (!idle) {
    idle = true;
    queue.onIdle().then(() => {
      uploads.forEach(([target, store, time]) => uploaded(target, store, time));
      uploads.clear();
      idle = false;
    });
  }
};
var filesize = (file, content) => {
  const size = byteSize(content);
  const before = byteConvert(file.size);
  const after = byteConvert(size);
  if (size > file.size || size === file.size) {
    const gzip = byteConvert(zlib__default["default"].gzipSync(content).length);
    transform(`filesize ${before} \u2192 gzip ${gzip}`);
  } else {
    item2(`minified ${before} \u2192 ${after} ${gray(`saved ${byteConvert(file.size - size)}`)}`);
  }
};
var info = (message2) => {
  message(message2);
};
var throws = (message2) => {
  nwl();
  console.log(message2);
};
var error = (message2, file) => {
  if (queue.pending > 0) {
    item2(orange.bold(`${queue.pending} ${queue.pending > 1 ? "requests" : "request"} in queue`));
    queue.pause();
  }
  notifier__default["default"].notify({
    title: "Syncify Error",
    sound: "Pop",
    open: file.input,
    subtitle: message2,
    message: file.relative
  }).notify();
  write(redBright.bold(message2));
  nwl();
};
var warn = (message2) => {
  if (typeof message2 === "string") {
    const text = message2.split("\n");
    warning2.count += 1;
    while (text.length !== 0)
      warning2.process[warning2.current].add(text.shift());
  }
};
var spawn2 = (name) => (...message2) => {
  if (!bundle.spawn.invoked)
    bundle.spawn.invoked = true;
  if (group !== "SPAWNS") {
    closed(group);
    if (group !== "SYNCIFY")
      clear2();
    opened("SPAWNS");
    group = "SPAWNS";
  }
  if (title2 !== name) {
    title(name);
    title2 = name;
  }
  spawn(sanitize(message2.shift()));
};
var catcher = (error3) => {
  nwl();
  while (error3.length !== 0) {
    const text = sanitize(error3.shift()).split("\n");
    while (text.length !== 0)
      write(text.shift());
  }
};

// src/logger/parse.ts
var QuotedString = /(['"][\w\s]+['"])/g;
var RegExpURLs = /((?:www|http:|https:)+[^\s]+[\w])/g;
var RegExpRegex = /(\/)(.*?)(\/)/g;
var LiquidLineNo = /\((line\s[0-9]+)\)(:)/g;
var LiquidTags = /['"]({?[{%])(.*?)([%}]}?)['"]/g;
var LiquidObjects = /({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g;
var liquidPretty = (message2) => {
  return isArray(message2) ? message2.map(liquidPretty).join("\n") : message2.replace(LiquidLineNo, white("$1") + gray("$2") + "\n\n").replace(QuotedString, yellow("$1")).replace(LiquidTags, cyan("$1") + magenta("$2") + cyan("$3")).replace(RegExpURLs, underline("$1")).replace(LiquidObjects, white("$1") + gray("$2") + white("$3")).replace(RegExpRegex, magenta("$1") + cyan("$2") + magenta("$3"));
};

// src/logger/errors.ts
function error2(e2) {
  var _a3;
  switch (e2.status) {
    case 422:
      error(
        e2.statusText,
        liquidPretty(((_a3 = e2.data.errors) == null ? void 0 : _a3.asset) || e2.data.error.asset)
      );
      break;
    case 404:
      error(
        e2.statusText,
        "The requested resource was not found."
      );
      break;
    case 400:
      error(
        e2.statusText,
        "The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application/json. This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process."
      );
      break;
    case 303:
      error(
        e2.statusText,
        "The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource."
      );
      break;
    case 401:
      error(
        e2.statusText,
        "The necessary authentication credentials are not present in the request or are incorrect.\n"
      );
      return process.exit();
    case 402:
      error(
        e2.statusText,
        "The requested shop is currently frozen. The shop owner needs to log in to the shop's admin and pay the outstanding balance to unfreeze the shop."
      );
      break;
    case 406:
      error(
        e2.statusText,
        "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request."
      );
      break;
    case 423:
      error(
        e2.statusText,
        "The requested shop is currently locked. Shops are locked if they repeatedly exceed their API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk."
      );
      break;
    case 403:
      error(
        e2.statusText,
        "The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action."
      );
      break;
    case 501:
      error(
        e2.statusText,
        "The requested endpoint is not available on that particular shop, e.g. requesting access to a Shopify Plus\u2013only API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use."
      );
      break;
    case 503:
      error(
        e2.statusText,
        "The server is currently unavailable. Check the Shopify status page for reported service outages. See https://www.shopifystatus.com"
      );
      break;
    default:
      error(
        e2.statusText,
        "An unknown error has occured. Please submit stack trace to the Syncify Github repository for help or support. See https://github.com/panoply/syncify"
      );
  }
}

// src/requests/assets.ts
async function find(asset, theme) {
  return axios({
    ...bundle.sync.stores[theme.sidx].client,
    method: "get",
    url: theme.url,
    params: {
      "asset[key]": asset
    }
  }).then(({ data }) => data.asset).catch(() => false);
}
async function upload2(asset, config2) {
  const request = assign({}, bundle.sync.stores[config2.theme.sidx].client, {
    method: "put",
    url: config2.theme.url,
    data: {
      asset: {
        key: config2.key,
        value: asset
      }
    }
  });
  return axios(request).then(() => true).catch(() => false);
}
async function get(url, config2) {
  return axios.get(url, config2).then(({ data }) => {
    return data;
  }).catch((e2) => {
    console_exports.throws(e2.message);
  });
}
var limit;
async function sync(theme, file, config2) {
  if (queue.isPaused)
    return;
  if (queue.concurrency > 1) {
    if (limit >= 20)
      queue.concurrency--;
    if (limit >= 35)
      queue.concurrency--;
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }
  start();
  return axios(config2).then(({ headers, data }) => {
    if (config2.method === "get")
      return data;
    if (config2.method === "delete") {
      console_exports.info(theme.store);
    } else {
      console_exports.upload(theme);
    }
    limit = parseInt(headers["x-shopify-shop-api-call-limit"].slice(0, 2), 10);
  }).catch((e2) => {
    if (is(e2.response.status, 429) || is(e2.response.status, 500)) {
      console_exports.info(`${ansi_exports.orange("\u21BB")} ${ansi_exports.orange(file.key)}`);
      queue.add(() => sync(theme, file, config2));
    } else {
      console_exports.info(`${ansi_exports.redBright("invalid")} ${ansi_exports.redBright.bold(file.key)}`);
      error2(e2.response);
    }
  });
}

// node_modules/.pnpm/tiny-colors@2.0.1/node_modules/tiny-colors/dist/constants.js
var _a;
var ENV = ((_a = globalThis.process) == null ? void 0 : _a.env) || {};
var _a2;
var ARGV = ((_a2 = globalThis.process) == null ? void 0 : _a2.argv) || [];
!("NO_COLOR" in ENV) && !ARGV.includes("--no-color");

// node_modules/.pnpm/when-exit@2.0.0/node_modules/when-exit/dist/constants.js
var IS_LINUX = process.platform === "linux";
var IS_WINDOWS = process.platform === "win32";

// node_modules/.pnpm/when-exit@2.0.0/node_modules/when-exit/dist/signals.js
var Signals = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
if (!IS_WINDOWS) {
  Signals.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}
if (IS_LINUX) {
  Signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}
var signals_default = Signals;

// node_modules/.pnpm/when-exit@2.0.0/node_modules/when-exit/dist/interceptor.js
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
        process.kill(process.pid, signal2);
      }
    };
    this.hook = () => {
      if (this.hooked)
        return;
      this.hooked = true;
      process.once("exit", () => this.exit());
      for (const signal2 of signals_default) {
        process.once(signal2, () => this.exit(signal2));
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

// node_modules/.pnpm/when-exit@2.0.0/node_modules/when-exit/dist/index.js
var whenExit = interceptor_default.register;
var dist_default = whenExit;

// node_modules/.pnpm/tiny-cursor@2.0.0/node_modules/tiny-cursor/dist/cursor.js
var Cursor = class {
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
    dist_default(this.show);
  }
};
var cursor_default = Cursor;

// node_modules/.pnpm/tiny-cursor@2.0.0/node_modules/tiny-cursor/dist/index.js
new cursor_default();

// src/requests/metafields.ts
async function find2(store, field) {
  if (is(arguments.length, 1))
    return (_field) => find2(store, _field);
  if (allFalse(has("namespace", field), has("key", field))) {
    console_exports.error("invalid fields");
    return void 0;
  }
  return axios.get("metafields.json", store.client).then(({ data }) => {
    return data.metafields.find((m) => field.namespace === m.namespace && field.key === m.key);
  }).catch((e2) => {
    console.log(e2);
    return void 0;
  });
}
async function create(store, metafield) {
  if (is(arguments.length, 1))
    return (_metafield) => create(store, _metafield);
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
      return error2(metafield.namespace);
    if (requeue(e2.response.status)) {
      queue.add(() => create(store, metafield));
      return void 0;
    } else {
      return error2(store.store);
    }
  });
}
async function update2(store, id, metafield) {
  if (is(arguments.length, 1))
    return (_id, _field) => update2(store, _id, _field);
  return axios.put(`metafields/${id}.json`, { metafield }, store.client).then((d) => {
    console.log("created");
    return d.data.metafield;
  }).catch((e2) => {
    if (!store.queue)
      return error2(metafield.namespace);
    if (requeue(e2.response.status)) {
      queue.add(() => update2(store, id, metafield));
    } else {
      return error2(store.store);
    }
  });
}
async function sync2(store, field) {
  if (is(arguments.length, 1))
    return (_field) => sync2(store, _field);
  const data = await find2(store, field);
  if (!data)
    return create(store, field);
  return update2(store, data.id, assign(field, { id: data.id, type: "json" })).catch((e2) => {
    if (!store.queue)
      return error2(field.namespace);
    if (requeue(e2.response.status)) {
      queue.add(() => sync2(store, field));
    } else {
      return error2(store.store);
    }
  });
}

// src/requests/client.ts
var client = ({ stores, themes }) => ({
  assets: (method, file, content) => {
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
    return queue.add(() => mapFastAsync((theme) => {
      return sync(theme, file, assign(
        { url: theme.url },
        stores[theme.sidx].client,
        payload
      ));
    }, themes));
  },
  pages: (content) => {
    return queue.add(function() {
      return mapFastAsync(async function(store) {
      }, stores);
    });
  },
  metafields: (content) => {
    return queue.add(function() {
      return mapFastAsync(async function(store) {
        await sync2(store, content);
      }, stores);
    });
  }
});
var lastPath = (path2) => {
  if (isArray(path2))
    return path2.map(lastPath);
  if (path2.indexOf("/") === -1)
    return path2;
  const dir = path$1.dirname(path2);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
};
var parentPath = (path2) => {
  if (isArray(path2))
    return path2.map(parentPath);
  const last2 = path2.lastIndexOf("/");
  if (is(last2, -1))
    return path2;
  const glob7 = path2.indexOf("*");
  return is(glob7, -1) ? path2.slice(0, last2) : path2.slice(0, glob7);
};
var normalPath = (input) => {
  const regex = new RegExp(`^\\.?\\/?${input}\\/`);
  return function prepend(path2) {
    if (isArray(path2))
      return path2.map(prepend);
    const ignore = is(path2.charCodeAt(0), 33);
    if (ignore)
      path2 = path2.slice(1);
    if (regex.test(path2))
      return ignore ? "!" + path2 : path2;
    if (is(path2.charCodeAt(0), 46) && is(path2.charCodeAt(1), 46) && is(path2.charCodeAt(2), 47)) {
      throw new Error("Invalid path at: " + path2 + " - Paths must be relative to source");
    }
    return (ignore ? "!" : "") + path$1.join(input, path2);
  };
};
var basePath = (cwd) => (path2) => {
  if (!is(path2.indexOf("*"), -1)) {
    console.error(`Base directory path cannot contain glob, at "${path2}"`);
    process.exit(1);
  }
  if (is(path2.charCodeAt(0), 46)) {
    if (is(path2.length, 1))
      return cwd + "/";
    if (is(path2.charCodeAt(1), 47)) {
      path2 = path2.slice(1);
    } else {
      console.error('Directory path is invalid at: "' + path2 + '"');
      process.exit(1);
    }
  }
  if (is(path2.charCodeAt(0), 47)) {
    if (is(path2.length, 1)) {
      return cwd + "/";
    } else {
      path2 = path2.slice(1);
    }
  }
  if (/^[a-zA-Z0-9_-]+/.test(path2)) {
    path2 = path$1.join(cwd, path2);
    return is(last(path2).charCodeAt(0), 47) ? path2 : path2 + "/";
  } else {
    throw new Error('Directory path is invalid at: "' + path2 + '"');
  }
};
function style(file) {
  const config2 = bundle.style.find((x) => x.watch(file.input));
  if (isUndefined(config2))
    return file;
  defineProperty(file, "config", { get() {
    return config2;
  } });
  if (config2.snippet) {
    file.namespace = "snippets";
    file.key = path$1.join("snippets", config2.rename);
  } else {
    file.key = path$1.join("assets", config2.rename);
  }
  if (file.config.rename !== path$1.basename(file.output)) {
    if (config2.snippet) {
      file.output = path$1.join(bundle.dirs.output, file.key);
    } else {
      file.output = path$1.join(parentPath(file.output), file.config.rename);
    }
  }
  return file;
}
function script(file) {
  const config2 = bundle.script.find((x) => x.watch(file.input));
  if (isUndefined(config2))
    return file;
  defineProperty(file, "config", { get() {
    return config2;
  } });
  if (config2.snippet) {
    file.namespace = "snippets";
    file.key = path$1.join("snippets", config2.rename);
  } else {
    file.key = path$1.join("assets", config2.rename);
  }
  if (config2.rename !== path$1.basename(file.output)) {
    if (config2.snippet) {
      file.output = path$1.join(bundle.dirs.output, file.key);
    } else {
      file.output = path$1.join(parentPath(file.output), config2.rename);
    }
  }
  return file;
}
function section(file) {
  if (bundle.section.prefixDir) {
    if (isRegex(bundle.section.global)) {
      if (bundle.section.global.test(file.input))
        return file;
    }
    const rename2 = lastPath(file.input) + bundle.section.separator + file.base;
    file.name = rename2;
    file.key = path$1.join(file.namespace, rename2);
    file.output = path$1.join(path$1.dirname(file.output), rename2);
  }
  return file;
}

// src/process/files.ts
function setFile(file, input, output) {
  return (namespace, type2, kind2) => {
    let key;
    if (type2 === 13 /* Metafield */ || type2 === 14 /* Page */) {
      key = path$1.join(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = path$1.join(namespace, file.base);
      output = path$1.join(output, key);
    }
    return assign({}, file, {
      type: type2,
      input,
      output,
      key,
      namespace,
      kind: kind2,
      relative: path$1.relative(bundle.cwd, input),
      config: void 0,
      size: NaN
    });
  };
}
var parseFile = (paths2, output) => (path2) => {
  const file = path$1.parse(path2);
  const merge = setFile(file, path2, output);
  if (file.ext === ".liquid") {
    if (paths2.sections(path2)) {
      return section(merge("sections", 4 /* Section */, "Liquid" /* Liquid */));
    } else if (paths2.snippets(path2)) {
      return merge("snippets", 3 /* Snippet */, "Liquid" /* Liquid */);
    } else if (paths2.layout(path2)) {
      return merge("layout", 2 /* Layout */, "Liquid" /* Liquid */);
    } else if (paths2.templates(path2)) {
      return merge("templates", 1 /* Template */, "Liquid" /* Liquid */);
    } else if (paths2.customers(path2)) {
      return merge("templates/customers", 1 /* Template */, "Liquid" /* Liquid */);
    }
  } else if (file.ext === ".md" || file.ext === ".html") {
    return merge("pages", 14 /* Page */, file.ext === ".html" ? "HTML" /* HTML */ : "Markdown" /* Markdown */);
  } else if (file.ext === ".json") {
    if (paths2.metafields(path2)) {
      return merge("metafields", 13 /* Metafield */, "JSON" /* JSON */);
    } else if (paths2.templates(path2)) {
      return merge("templates", 1 /* Template */, "JSON" /* JSON */);
    } else if (paths2.config(path2)) {
      return merge("config", 5 /* Config */, "JSON" /* JSON */);
    } else if (paths2.locales(path2)) {
      return merge("locales", 6 /* Locale */, "JSON" /* JSON */);
    } else if (paths2.customers(path2)) {
      return merge("templates/customers", 1 /* Template */, "JSON" /* JSON */);
    }
  } else if (file.ext === ".css") {
    return style(merge("assets", 7 /* Style */, "CSS" /* CSS */));
  } else if (file.ext === ".scss") {
    return style(merge("assets", 7 /* Style */, "SCSS" /* SCSS */));
  } else if (file.ext === ".sass") {
    return style(merge("assets", 7 /* Style */, "SASS" /* SASS */));
  } else if (file.ext === ".js") {
    return script(merge("assets", 8 /* Script */, "JavaScript" /* JavaScript */));
  } else if (file.ext === ".ts") {
    return script(merge("assets", 8 /* Script */, "TypeScript" /* TypeScript */));
  } else if (file.ext === ".jsx") {
    return script(merge("assets", 8 /* Script */, "JSX" /* JSX */));
  } else if (file.ext === ".tsx") {
    return script(merge("assets", 8 /* Script */, "TSK" /* TSX */));
  } else if (paths2.assets(path2)) {
    if (bundle.spawn.invoked) {
      return merge("assets", 15 /* Spawn */);
    } else if (file.ext === ".svg") {
      return merge("assets", 11 /* Svg */, "SVG" /* SVG */);
    } else if (file.ext === ".jpg" || file.ext === ".png" || file.ext === ".gif" || file.ext === ".pjpg") {
      return merge("assets", 12 /* Asset */, "Image" /* Image */);
    } else if (file.ext === ".mov" || file.ext === ".mp4" || file.ext === ".webm" || file.ext === ".ogg") {
      return merge("assets", 12 /* Asset */, "Video" /* Video */);
    } else if (file.ext === ".pdf") {
      return merge("assets", 12 /* Asset */, "PDF" /* PDF */);
    } else if (file.ext === ".eot" || file.ext === ".ttf" || file.ext === ".woff" || file.ext === ".woff2") {
      return merge("assets", 12 /* Asset */, "Font" /* Font */);
    }
  }
  return void 0;
};
var outputFile = (output) => (path2) => {
  const file = path$1.parse(path2);
  const merge = setFile(file, path2, output);
  switch (lastPath(file.dir)) {
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

// src/modes/upload.ts
async function upload3(cb) {
  start();
  const parse3 = outputFile(bundle.dirs.output);
  const files = glob4__default["default"].sync(`${bundle.dirs.output}/**`, { nodir: true, mark: true }).sort();
  const request = client(bundle.sync);
  const hashook = isFunction(cb);
  await mapFastAsync(async (path2) => {
    const file = parse3(path2);
    const read = await fsExtra.readFile(path2);
    if (!hashook)
      return request.assets("put", file, read.toString());
    const update3 = cb.apply({ ...file }, read.toString());
    if (isUndefined(update3) || update3 === false) {
      return request.assets("put", file, read.toString());
    } else if (isString(update3)) {
      return request.assets("put", file, update3);
    } else if (isBuffer(update3)) {
      return request.assets("put", file, update3.toString());
    }
    return request.assets("put", file, read.toString());
  }, files);
  return queue.onIdle().then(() => console_exports.info("Completed Upload", 3));
}
async function download(cb) {
  start();
  const hashook = isFunction(cb);
  for (const store of bundle.sync.stores) {
    const theme = bundle.sync.themes[store.domain];
    const { assets } = await get(theme.url, store.client);
    for (const { key } of assets) {
      try {
        const data = assign({}, store.client, { params: { "asset[key]": key } });
        const { asset } = await get(theme.url, data);
        const output = path$1.join(bundle.dirs.import, store.domain, theme.target, key);
        const buffer = has("attachment", asset) ? Buffer.from(asset.attachment, "base64") : Buffer.from(asset.value || null, "utf8");
        if (hashook) {
          const update3 = cb.apply({ asset, output }, buffer);
          if (isUndefined(update3) || update3 === false) {
            await fsExtra.writeFile(output, buffer);
          } else if (isString(update3) || isBuffer(update3)) {
            await fsExtra.writeFile(output, update3);
          } else {
            await fsExtra.writeFile(output, buffer);
          }
        } else {
          await fsExtra.writeFile(output, buffer);
        }
      } catch (e2) {
        console_exports.error(e2);
      }
    }
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
    } else if (dir === "pages") {
      cache[dir] = {};
    } else {
      cache[dir] = {};
      const uri2 = path$1.join(path2, dir, "/");
      const has2 = await fsExtra.pathExists(uri2);
      if (!has2) {
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
    const has2 = await fsExtra.pathExists(uri2);
    if (!has2) {
      try {
        await fsExtra.mkdir(uri2);
      } catch (e2) {
        throw new Error(e2);
      }
    }
  }
}
function setBaseDirs(cli, config2) {
  const base = basePath(cli.cwd);
  for (const [dir, def] of BASE_DIRS) {
    let path2;
    if (cli[dir] === def) {
      if (config2[dir] === def) {
        bundle.dirs[dir] = base(cli[dir]);
        return;
      } else {
        path2 = config2[dir];
      }
    } else {
      path2 = cli[dir];
    }
    if (isArray(path2)) {
      const roots = uniq(path2.map(base));
      bundle.dirs[dir] = roots.length === 1 ? roots[0] : roots;
    } else {
      bundle.dirs[dir] = base(path2);
    }
  }
  bundle.watch.add(bundle.file);
}
async function setImportDirs({ dirs, sync: sync3, mode }) {
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
  for (const theme in sync3.themes) {
    const { store, target } = sync3.themes[theme];
    const dir = path$1.join(dirs.import, store);
    const has2 = await fsExtra.pathExists(dir);
    if (has2) {
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

// src/modes/clean.ts
async function clean() {
  const files = glob4.glob.sync(`${bundle.dirs.output}/**`, { nodir: true });
  const size = files.length;
  if (size === 0)
    return console_exports.info(ansi_exports.yellowBright("\u2713 output directory is clean"));
  console_exports.info(ansi_exports.yellowBright(`${ansi_exports.bold("+")} cleaning ${ansi_exports.bold(String(size))} files from output`));
  const deleted2 = await mapFastAsync(async (path2) => {
    try {
      await fsExtra.unlink(path2);
      return true;
    } catch (e2) {
      console.log(e2);
      return e2;
    }
  }, files);
  console_exports.info(`\u2713 removed ${ansi_exports.bold(String(deleted2.length))} of ${ansi_exports.bold(String(size))} files`);
  console_exports.info(`\u2713 cleaned ${ansi_exports.bold(path$1.dirname(bundle.dirs.output) + "/**")}`);
  await setThemeDirs(bundle.cwd);
  return true;
}
var passthrough = (file) => async (data) => {
  if (file.type !== 15 /* Spawn */)
    await fsExtra.writeFile(file.output, data);
  return data;
};
async function compile2(file, cb) {
  const copy = passthrough(file);
  const read = await fsExtra.readFile(file.input);
  const data = read.toString();
  if (!isFunction(cb))
    return copy(data);
  const update3 = cb.apply({ ...file }, data);
  if (isUndefined(update3) || update3 === false) {
    return copy(data);
  } else if (isType(update3)) {
    return copy(update3);
  } else if (isBuffer(update3)) {
    return copy(update3.toString());
  }
  return copy(data);
}
var LiquidComments = /{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g;
var LiquidSchemaTag = /(?<={%-?\s{0,}schema\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endschema\s{0,}-?%})/;
var LiquidStripDashSpace = /(?<=-?[%}]})\s(?=<\/?[a-zA-Z])/g;
var LiquidUselessDashes = /(?<=\S){[{%]-|-?[%}]}{[{%]-?|-}[%}]<\/?(?=[a-zA-Z]{1,})/g;
var HTMLStripDashSpace = /(?<=-?[%}]})\s(?=<\/?[a-zA-Z])/g;
var removeComments = (content) => {
  return content.replace(LiquidComments, nil);
};
var minifySchema = (file, content) => {
  if (!bundle.minify.views.minifySchema)
    return removeComments(content);
  const minified = content.replace(LiquidSchemaTag, (data) => {
    const before = byteSize(data);
    try {
      const parsed = JSON.parse(data);
      const minified2 = JSON.stringify(parsed, null, 0);
      const after = byteSize(data);
      console_exports.transform(`minified section ${ansi_exports.bold("schema")} ~ saved ${byteConvert(before - after)}`);
      return minified2;
    } catch (e2) {
      console_exports.error("error occured minifying schema", file);
      console_exports.throws(e2);
      return data;
    }
  });
  return removeComments(minified);
};
var removeDashes = (content) => {
  if (!bundle.minify.views.stripDashes)
    return content;
  return content.replace(HTMLStripDashSpace, nil).replace(LiquidStripDashSpace, nil).replace(LiquidUselessDashes, (m) => m.replace(/-/g, nil));
};
var htmlMinify = async (file, content, terser) => {
  try {
    const htmlmin = await htmlMinifierTerser.minify(content, terser);
    return htmlmin;
  } catch (e2) {
    console_exports.error("error occured during minfication", file);
    console_exports.throws(e2);
    return null;
  }
};
var transform2 = (file) => async (data) => {
  if (!bundle.prod) {
    await fsExtra.writeFile(file.output, data);
    console_exports.transform(`${ansi_exports.bold(file.namespace)} \u2192 ${byteConvert(file.size)}`);
    return data;
  }
  const content = is(file.type, 4 /* Section */) ? minifySchema(file, data) : removeComments(data);
  const htmlmin = await htmlMinify(file, content, bundle.minify.views);
  console_exports.process("HTML Terser", now());
  if (isNil(htmlmin)) {
    await fsExtra.writeFile(file.output, data);
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, nil);
  await fsExtra.writeFile(file.output, postmin);
  const { isSmaller, after, before, gzip, saved } = fileSize(data, file.size);
  if (isSmaller) {
    console_exports.transform(`${ansi_exports.bold("View")} ${before} \u2192 gzip ${gzip}`);
  } else {
    console_exports.transform(`${ansi_exports.bold("View")} minified ${before} to ${after} ${ansi_exports.gray(`~ saved ${saved}`)}`);
  }
  return postmin;
};
async function compile3(file, cb) {
  if (bundle.mode.watch)
    start();
  const read = await fsExtra.readFile(file.input);
  file.size = byteSize(read);
  const edit = transform2(file);
  const data = read.toString();
  if (!isType("Function", cb))
    return edit(data);
  const update3 = cb.apply({ ...file }, data);
  if (isType("Undefined", update3) || update3 === false) {
    return edit(data);
  } else if (isType("String", update3)) {
    return edit(update3);
  } else if (Buffer.isBuffer(update3)) {
    return edit(update3.toString());
  }
  return edit(data);
}
function parse2(data) {
  try {
    return JSON.parse(data);
  } catch (e2) {
    console_exports.throws(e2);
    return null;
  }
}
function minify3(data, space = 0) {
  try {
    return JSON.stringify(data, null, space);
  } catch (e2) {
    console_exports.throws(e2);
    return null;
  }
}
function jsonCompile(file, data, space = 0) {
  const minified = minify3(data, space);
  if (isNil(minified)) {
    stop();
    return minified;
  }
  if (is(space, 0)) {
    const size = byteSize(minified);
    if (bundle.mode.watch) {
      console_exports.info(`created ${ansi_exports.bold(file.key)} ${ansi_exports.gray(`\xB5${stop()}`)}`);
    } else {
      console_exports.info(`${ansi_exports.cyan(file.key)} ${ansi_exports.bold(byteConvert(size))} ${ansi_exports.gray(`saved ${byteConvert(file.size - size)}`)}`);
    }
  }
  if (is(file.type, 13 /* Metafield */)) {
    return minified;
  } else {
    fsExtra.writeFile(file.output, minified, (e2) => e2 ? console_exports.throws(e2.message) : null);
    return minified;
  }
}
async function compile4(file, cb) {
  if (bundle.mode.watch)
    start();
  const json = await fsExtra.readFile(file.input);
  file.size = byteSize(json);
  const data = parse2(json.toString());
  const space = bundle.minify.json[file.namespace] ? 0 : bundle.json.indent;
  if (bundle.mode.watch) {
    console_exports.info(`created ${ansi_exports.bold(file.key)} ${ansi_exports.gray(`\xB5${stop()}`)}`);
  }
  if (!isType("Function", cb))
    return jsonCompile(file, data, space);
  const update3 = cb.apply({ ...file }, data);
  if (isUndefined(update3)) {
    return jsonCompile(file, data, space);
  } else if (isArray(update3) || isObject(update3)) {
    return jsonCompile(file, update3, space);
  } else if (isString(update3)) {
    return jsonCompile(file, parse2(update3), space);
  } else if (isBuffer(update3)) {
    return jsonCompile(file, parse2(update3.toString()), space);
  }
  return jsonCompile(file, data, space);
}
async function compile5(file, cb) {
  const read = await fsExtra.readFile(file.input);
  const { data, content } = matter__default["default"](read);
  if (!has("title", data)) {
    throw console_exports.error("Missing Title", file);
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
  const body_html = Markdown__default["default"](bundle.page.export).render(content);
  await fsExtra.writeFile(path$1.join(bundle.dirs.cache, "pages", file.base), body_html);
  return {
    title: data.title,
    body_html
  };
}
var pcss = null;
function write2(file, cb) {
  const scope = isFunction(cb) ? { ...file } : false;
  return async function(data) {
    if (isNil(data))
      return null;
    let content;
    if (scope !== false) {
      const update3 = cb.apply({ ...file }, Buffer.from(data));
      if (isUndefined(update3) || update3 === false) {
        content = data;
      } else if (isString(update3) || isBuffer(update3)) {
        content = update3;
      }
    } else {
      content = data;
    }
    fsExtra.writeFile(file.output, data, (e2) => e2 ? console.log(e2) : null);
    const { isSmaller, after, before, gzip, saved } = fileSize(data, file.size);
    if (isSmaller) {
      console_exports.transform(`${ansi_exports.bold("CSS")} ${before} \u2192 gzip ${gzip}`);
    } else {
      console_exports.transform(`${ansi_exports.bold("CSS")} minified ${before} to ${after} ${ansi_exports.gray(`~ saved ${saved}`)}`);
    }
    return content;
  };
}
async function sass(file) {
  const { config: config2 } = file;
  const opts = config2.sass === true ? processor2.sass.config : config2.sass;
  if (file.ext === ".scss" || file.ext === ".sass") {
    if (bundle.mode.watch)
      start();
    try {
      console_exports.hook("sass");
      const { css, sourceMap } = sass$1.compile(file.input, {
        ...opts,
        loadPaths: opts.includePaths,
        sourceMapIncludeSources: false,
        logger: opts.warnings ? sass$1.Logger.silent : {
          debug: (msg) => console.log("DEBUG", msg),
          warn: (msg, opts2) => {
            console_exports.warn(msg + "\n\n" + opts2.stack);
          }
        }
      });
      if (opts.sourcemap) {
        fsExtra.writeFile(`${cache.styles.uri + file.base}.map`, JSON.stringify(sourceMap)).catch((e2) => console_exports.warn(e2));
      }
      if (bundle.mode.watch)
        console_exports.process(`${ansi_exports.bold("SASS Dart")}`, stop());
      console_exports.unhook();
      file.size = byteSize(css);
      return {
        css,
        map: sourceMap
      };
    } catch (e2) {
      console_exports.unhook();
      console_exports.error("error occurred compiling sass to css", file);
      console_exports.throws(e2);
      return null;
    }
  }
  try {
    const css = await fsExtra.readFile(file.input);
    file.size = byteSize(css);
    return {
      css: css.toString(),
      map: null
    };
  } catch (e2) {
    console_exports.error("error reading css file", file);
    console_exports.throws(e2);
    return null;
  }
}
async function postcss(file, css, map2) {
  const { config: config2 } = file;
  console_exports.hook("postcss");
  try {
    const result = await pcss.process(css, {
      from: config2.rename,
      to: config2.rename,
      map: map2 ? { prev: map2, inline: false } : null
    });
    if (bundle.mode.watch)
      console_exports.process(`${ansi_exports.bold("PostCSS")}`, stop());
    const warn2 = result.warnings();
    if (warn2.length > 0) {
      console_exports.warning.count += warn2.length;
      console_exports.warn(warn2.join(nl));
    }
    console_exports.unhook();
    return result.toString();
  } catch (e2) {
    console_exports.unhook();
    console_exports.error("error occured processing css with postcss", file);
    console_exports.throws(e2);
    return null;
  }
}
function snippet(css) {
  return `<style>${css}</style>`;
}
async function styles(file, cb) {
  if (bundle.mode.watch)
    start();
  const output = write2(file, cb);
  try {
    const out = await sass(file);
    if (isNil(pcss) || file.config.postcss === false && file.config.snippet === false) {
      return output(out.css);
    }
    if (file.config.postcss) {
      const post = await postcss(file, out.css, out.map);
      if (post === null)
        return null;
      if (file.config.snippet)
        return output(snippet(post));
    }
    return file.config.snippet ? output(snippet(out.css)) : output(out.css);
  } catch (e2) {
    console_exports.throws(e2);
    return null;
  }
}

// src/modes/build.ts
async function build(callback) {
  start();
  if (bundle.mode.clean)
    await clean();
  const parse3 = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch4__default["default"](bundle.watch);
  const paths2 = glob4.glob.sync(bundle.dirs.input + "**", { nodir: true });
  const source = paths2.filter(match).reduce((acc, path2) => {
    const file = parse3(path2);
    if (isUndefined(file))
      return acc;
    switch (file.type) {
      case 7 /* Style */:
        acc.style.push(file);
        break;
      case 4 /* Section */:
        acc.section.push(file);
        break;
      case 2 /* Layout */:
        acc.layout.push(file);
        break;
      case 3 /* Snippet */:
        acc.snippet.push(file);
        break;
      case 6 /* Locale */:
        acc.locale.push(file);
        break;
      case 5 /* Config */:
        acc.config.push(file);
        break;
      case 1 /* Template */:
        acc.template.push(file);
        break;
      case 14 /* Page */:
        acc.page.push(file);
        break;
      case 12 /* Asset */:
        acc.asset.push(file);
        break;
      case 13 /* Metafield */:
        acc.metafield.push(file);
        break;
    }
    return acc;
  }, {
    style: [],
    section: [],
    layout: [],
    snippet: [],
    locale: [],
    page: [],
    config: [],
    metafield: [],
    template: [],
    asset: []
  });
  for (const file of source.style) {
    console_exports.changed(file);
    try {
      await styles(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.section) {
    console_exports.changed(file);
    try {
      await compile3(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.layout) {
    console_exports.changed(file);
    try {
      await compile3(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.template) {
    console_exports.changed(file);
    try {
      if (file.ext === ".json") {
        await compile4(file, callback);
      } else {
        await compile3(file, callback);
      }
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.snippet) {
    console_exports.changed(file);
    try {
      await compile3(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.locale) {
    console_exports.changed(file);
    try {
      await compile4(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.config) {
    console_exports.changed(file);
    try {
      await compile4(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.page) {
    console_exports.changed(file);
    try {
      await compile5(file);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.metafield) {
    console_exports.changed(file);
    try {
      await compile4(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  for (const file of source.asset) {
    console_exports.changed(file);
    try {
      console_exports.info(ansi_exports.cyan(`${file.base}`));
      await compile2(file, callback);
    } catch (error3) {
      console_exports.error(error3, file);
    }
  }
  console_exports.info(ansi_exports.greenBright.bold("Completed in " + stop()));
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
ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC}0f` : `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;
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
    process3__default["default"].stderr.write("\x1B[?25h");
  }, { alwaysLast: true });
});
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@4.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process3__default["default"].stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process3__default["default"].stderr) => {
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
  return codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141);
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
    const item3 = ansi_styles_default.codes.get(Number.parseInt(ansiCode, 10));
    if (item3) {
      const indexEscape = ansiCodes.indexOf(item3.toString());
      if (indexEscape === -1) {
        output.push(wrapAnsi2(isEscapes ? item3 : ansiCodeOrigin));
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
var logUpdate = createLogUpdate(process3__default["default"].stdout);
var log_update_default = logUpdate;
createLogUpdate(process3__default["default"].stderr);

// src/hot/inject.ts
var EXP = new RegExp(`{%-?\\s*render\\s+['"]${HOT_SNIPPET}['"][,\\slablsockvetr:0-9'"]+?-?%}\\s+`);
async function injectSnippet() {
  const key = `snippets/${HOT_SNIPPET}`;
  const [theme] = bundle.sync.themes;
  const snippet2 = await fsExtra.readFile(hot.snippet);
  const upload4 = await upload2(snippet2.toString(), { theme, key });
  log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray(`${key} uploaded snippet injection`)}`);
  return upload4;
}
function inject(content) {
  if (!EXP.test(content))
    return writeRender(content);
}
function removeRender(content) {
  const render = content.search(EXP);
  const start2 = content.slice(0, render);
  const slice2 = content.slice(content.indexOf("%}") + 2);
  return start2 + slice2;
}
function writeRender(content) {
  const ender = content.lastIndexOf("<head>") + 6;
  const start2 = content.slice(0, ender);
  return start2 + nl + hot.renderer + nl + content.slice(ender);
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
    log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray("injected render tag in output layout")}`);
  }
  const [theme] = bundle.sync.themes;
  const name = path$1.basename(path2);
  const key = `layout/${name}`;
  const string = await find(`layout/${name}`, theme);
  if (EXP.test(string))
    content = removeRender(content);
  const upload4 = await upload2(content, { theme, key });
  if (upload4) {
    log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray(`${key} uploaded and inject render tag`)}`);
    return true;
  }
  return false;
}
var paths = /* @__PURE__ */ new Set();
function pluginPaths(transform3) {
  const { compilerOptions } = processor2.esbuild.tsconfig;
  if (!has("paths", compilerOptions))
    return;
  const aliases = keys(compilerOptions.paths);
  const filter = new RegExp(`^(${aliases.join("|")})`);
  return {
    name: "syncify-paths",
    setup(build2) {
      build2.onResolve({ filter }, function(args) {
        const alias = aliases.find((p) => new RegExp(`^${p}`).test(args.path));
        const [dir] = alias.split("*");
        let file = args.path.replace(dir, nil);
        if (file === args.path)
          file = nil;
        for (const dir2 of compilerOptions.paths[alias]) {
          const uri2 = path$1.normalize(path$1.resolve(bundle.cwd, dir2).replace("*", file));
          if (!uri2.endsWith("*")) {
            if (!paths.has(args.path)) {
              if (!processor2.esbuild.loaded) {
                transform3.watch.push(uri2);
              } else {
                event.emit("script:watch", args.path);
              }
            }
            return { path: uri2 };
          }
          let [path2] = glob4__default["default"].sync(`${uri2}.*`);
          if (!path2) {
            const [fileidx] = glob4__default["default"].sync(`${uri2}/index.*`);
            path2 = fileidx;
          }
          if (path2)
            return { path: path2 };
        }
        return { path: args.path };
      });
    }
  };
}
function pluginWatch(transform3) {
  return {
    name: "syncify-watch",
    setup(build2) {
      build2.onStart(() => start());
      build2.onResolve({ filter: /.*/ }, (args) => {
        if (!/node_modules/.test(args.importer)) {
          if (/^[./]/.test(args.path)) {
            if (args.importer !== nil) {
              const [path2] = glob4__default["default"].sync(path$1.join(parentPath(args.importer), args.path + ".*"));
              if (isString(path2) && !paths.has(path2)) {
                if (!processor2.esbuild.loaded) {
                  transform3.watch.push(path2);
                } else {
                  event.emit("script:watch", path2);
                }
              }
            } else {
              if (!paths.has(args.path)) {
                if (!processor2.esbuild.loaded) {
                  transform3.watch.push(args.path);
                } else {
                  event.emit("script:watch", args.path);
                }
              }
            }
          }
        }
        return void 0;
      });
    }
  };
}
var esbuild;
async function runtime(options) {
  const { build: build2 } = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('esbuild')); });
  esbuild = build2;
  return build2(options);
}
var createSnippet = (string) => "<script>" + string + "<\/script>";
async function script2(file, cb) {
  start();
  const { config: config2 } = file;
  try {
    const compile7 = await esbuild(file.config.esbuild);
    for (const { text, path: path2 } of compile7.outputFiles) {
      if (/\.map$/.test(path2)) {
        fsExtra.writeFile(path$1.join(cache.script.uri, file.base), text);
      } else {
        console_exports.process(`${ansi_exports.bold("ESBuild")}`, stop());
        const { format } = file.config.esbuild;
        console_exports.transform(`created ${ansi_exports.bold(format.toUpperCase())} bundle \u2192 ${ansi_exports.bold(byteConvert(byteSize(text)))}`);
        if (config2.snippet) {
          await fsExtra.writeFile(file.output, createSnippet(text));
          console_exports.transform(`exported as ${ansi_exports.bold("snippet")}`);
        } else {
          await fsExtra.writeFile(file.output, text);
        }
      }
    }
  } catch (e2) {
    for (const { text, location } of e2.errors) {
      console_exports.error(text, file);
      console_exports.info(ansi_exports.redBright(`Line ${location.line} in ${ansi_exports.bold(location.file)}`));
    }
    return null;
  }
}
async function injection() {
  log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray("validating snippet injection")}`);
  const snippet2 = await injectSnippet();
  if (snippet2) {
    log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray("validating layouts")}`);
    for (const layout in hot.alive) {
      const render = await injectRender(layout);
      if (!render) {
        log_update_default(`${ansi_exports.line}${ansi_exports.redBright.bold("Failed to inject render tag")}`);
      }
    }
    log_update_default.clear();
  } else {
    log_update_default(`${ansi_exports.line}${ansi_exports.redBright.bold("Failed to upload snippet")}`);
  }
}
async function server(bundle2) {
  log(`${ansi_exports.line}${ansi_exports.bold(`${hot.method === "hot" ? "HOT" : "LIVE"} Reloading:`)}`);
  tui_exports.nwl();
  log_update_default(`${ansi_exports.line}${ansi_exports.italic.gray("configuring HOT Reload")}`);
  await injection();
  function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=0");
  }
  const assets = statics__default["default"](path$1.join(bundle2.dirs.output, "assets"), { setHeaders });
  const server2 = http__default["default"].createServer((req, res) => assets(req, res, handler__default["default"](req, res)));
  server2.listen(hot.server);
  log(ansi_exports.line + ansi_exports.pink(`server \u2192 ${ansi_exports.bold("assets")} \u2192 ${ansi_exports.gray.underline(`http://localhost:${hot.server}`)}`));
}
function socket() {
  const wss = new ws$1.Server({
    port: hot.socket,
    path: "/ws"
  });
  wss.on("connection", (v) => {
    wss.on("script", (src) => v.send(`script,${src}`));
    wss.on("stylesheet", (href) => v.send(`stylesheet,${href}`));
    wss.on("section", (id) => v.send(`section,${id}`));
    wss.on("svg", (id) => v.send(`svg,${id}`));
    wss.on("assets", () => v.send("assets"));
    wss.on("reload", () => v.send("reload"));
    wss.on("replace", () => v.send("replace"));
  });
  return {
    script: (src) => wss.emit("script", path$1.basename(src)),
    stylesheet: (href) => wss.emit("stylesheet", path$1.basename(href)),
    section: (id) => wss.emit("section", id),
    svg: (id) => wss.emit("svg", id),
    assets: () => wss.emit("assets"),
    reload: () => wss.emit("reload"),
    replace: () => wss.emit("replace")
  };
}

// src/modes/watch.ts
function watch(callback) {
  const wss = socket();
  const request = client(bundle.sync);
  const parse3 = parseFile(bundle.paths, bundle.dirs.output);
  const watcher = chokidar__default["default"].watch(from(bundle.watch.values()), {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: ["**/*.map"]
  });
  event.on("script:watch", (d) => {
  });
  watcher.on("all", async function(event2, path2) {
    const file = parse3(path2);
    if (isUndefined(file))
      return;
    if (file.type !== 15 /* Spawn */)
      console_exports.changed(file);
    if (is(event2, "change") || is(event2, "add")) {
      try {
        let value = null;
        if (file.type === 8 /* Script */) {
          value = await script2(file);
          wss.script(file.key);
        } else if (file.type === 7 /* Style */) {
          value = await styles(file, callback);
          wss.stylesheet(file.key);
        } else if (file.type === 4 /* Section */) {
          value = await compile3(file, callback);
        } else if (file.type === 2 /* Layout */) {
          value = await compile3(file, callback);
          if (bundle.hot)
            value = inject(value);
        } else if (file.type === 3 /* Snippet */) {
          value = await compile3(file, callback);
        } else if (file.type === 6 /* Locale */ || file.type === 5 /* Config */) {
          value = await compile4(file, callback);
        } else if (file.type === 13 /* Metafield */) {
          value = await compile4(file, callback);
          return request.metafields({ value, namespace: file.namespace, key: file.key });
        } else if (file.type === 1 /* Template */ && file.kind === "JSON" /* JSON */) {
          value = await compile4(file, callback);
        } else if (file.type === 1 /* Template */ && file.kind === "Liquid" /* Liquid */) {
          value = await compile3(file, callback);
        } else if (file.type === 14 /* Page */) {
          value = await compile5(file);
          return;
        } else if (file.type === 12 /* Asset */ || file.type === 15 /* Spawn */) {
          value = await compile2(file, callback);
        }
        if (value !== null) {
          console_exports.syncing(file.key);
          await request.assets("put", file, value);
          if (file.type === 4 /* Section */) {
            wss.section(file.name);
          } else if (file.type !== 8 /* Script */ && file.type !== 7 /* Style */) {
            await queue.onIdle().then(() => wss.replace());
          }
        }
      } catch (e2) {
        console_exports.throws(e2);
      }
    } else if (is(event2, "delete")) {
      return request.assets("delete", file);
    }
  });
}

// src/logger/help.ts
var help = `
  ${gray("-----------------------------------------------------------------------------")}
  ${bold("Syncify")}  <!version!>                                               ${gray("by Panoply")}
  ${gray("-----------------------------------------------------------------------------")}

  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined stores, themes and setup credentials within a ${gray(".env")} file.

  ${bold("Aliases:")}

  $ sync

  ${bold("Commands:")}

  $ syncify                    ${gray.italic("Interactive prompt")}
  $ syncify <store>            ${gray.italic("Prints list of connected stores")}

  ${bold("Themes:")}

       --<store>    <list>     ${gray.italic("A store reference command (see examples)")}
    -t, --theme     <list>     ${gray.italic("A comma seprated list of themes")}

  ${bold("Paths:")}

    -c, --config    <path>     ${gray.italic("Set configs path")}
    -i, --input     <path>     ${gray.italic("Set input path")}
    -o, --output    <path>     ${gray.italic("Set output path")}

  ${bold("Utility:")}

    -f, --filter    <path>     ${gray.italic("Glob path, use with pull or push triggers")}

  ${bold("Environment:")}

    --dev                      ${gray.italic("Build in development mode (default)")}
    --prod                     ${gray.italic("Build in production mode")}
    --hot                      ${gray.italic("Run watch with hot-reloads")}

  ${bold("Modes:")}

    -b, --build                ${gray.italic("Build theme from input")}
    -w, --watch                ${gray.italic("Run watch mode")}
    -u, --upload               ${gray.italic("Upload theme to stores")}
    -d, --download             ${gray.italic("Download theme from stores")}
    -m, --metafields           ${gray.italic("Run metafields resource mode")}
    -p, --pages                ${gray.italic("Run pages resource mode")}
    -r, --redirects            ${gray.italic("Run redirects resource mode")}

  ${bold("Resource:")}

    --pull                     ${gray.italic("Pull a resource from a shop or theme")}
    --push                     ${gray.italic("Push a resource to a shop or theme")}
    --silent                   ${gray.italic("Silent logs, only warnings or errors are printed")}

  ${bold("Trigger:")}

      -s, --spawn     <list>   ${gray.italic("Invoke a defined spawn child process/s")}
    -del, --delete    <list>   ${gray.italic("Delete a remote and local file")}
    -min, --minify    <list>   ${gray.italic("invoke minify mode, accepts resource/s")}

  ${bold("Other:")}

    --strap                    ${gray.italic("Import a strap into the project")}
    --vsc                      ${gray.italic("Generate vscode specific settings")}
    --help                     ${gray.italic("Show the screen")}

 ${gray("-----------------------------------------------------------------------------")}

`;

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

// src/options/validate.ts
var warnings = {};
function warnOption(group2) {
  if (!has(group2, warnings))
    warnings[group2] = [];
  return (message2, value) => {
    if (isUndefined(value)) {
      warnings[group2].push(
        `${ansi_exports.line}  ${ansi_exports.yellowBright(`${message2}`)}`
      );
    } else {
      warnings[group2].push(
        `${ansi_exports.line}  ${ansi_exports.yellowBright(`${message2}${ansi_exports.whiteBright(":")} ${ansi_exports.bold(value)}`)}`
      );
    }
  };
}
function typeError(option, name, value, expects) {
  console.error(ansi_exports.red(`
    ${ansi_exports.bold(`Invalid ${ansi_exports.cyan(option)} configuration`)}

    The ${ansi_exports.cyan(name)} option has an incorrect type value.

    Provided${ansi_exports.gray(":")} ${ansi_exports.yellow.bold(type(value).toLowerCase())}
    Expected${ansi_exports.gray(":")} ${ansi_exports.blue.bold(expects)}

    ${ansi_exports.white.bold("How to fix?")}
    ${ansi_exports.white("You need to update the option type.")}

  `));
  process.exit(1);
}
function missingDependency(dep) {
  console.error(
    ansi_exports.red(`
      ${ansi_exports.bold(`Missing ${ansi_exports.cyan(dep)} dependency`)}

      You need to install ${ansi_exports.cyan(dep)} to use it as a processor

      ${ansi_exports.white.bold("How to fix?")}
      ${ansi_exports.white("Run " + ansi_exports.bold("pnpm add " + dep + "-D"))}

    `)
  );
  process.exit(1);
}
function invalidError(option, name, value, expects) {
  console.error(
    ansi_exports.red(`
      ${ansi_exports.bold(`Invalid ${ansi_exports.cyan(option)} configuration`)}

      The ${ansi_exports.cyan(name)} option has an invalid or missing value.

      Provided${ansi_exports.gray(":")} ${ansi_exports.yellow.bold(value)}
      Expected${ansi_exports.gray(":")} ${ansi_exports.blue(expects.replace(/([|,])/g, ansi_exports.gray("$1")))}

      ${ansi_exports.white.bold("How to fix?")}
      ${ansi_exports.white("You need to update the option and use one of the expected values.")}

    `)
  );
  process.exit(1);
}
function missingConfig(cwd) {
  console.error(
    ansi_exports.red(`
      ${ansi_exports.bold(`Missing ${ansi_exports.cyan("syncify.config.js")} configuration`)}

      Unable to resolve a configuration file in the workspace.

      Directory${ansi_exports.gray(":")} ${ansi_exports.gray.underline(cwd)}

      ${ansi_exports.white.bold("How to fix?")}
      ${ansi_exports.white("Add one of the following files to your workspace:")}
        ${ansi_exports.gray("-")} ${ansi_exports.white("syncify.config.ts")}
        ${ansi_exports.gray("-")} ${ansi_exports.white("syncify.config.js")}
        ${ansi_exports.gray("-")} ${ansi_exports.white("syncify.config.mjs")}
        ${ansi_exports.gray("-")} ${ansi_exports.white("syncify.config.cjs")}
        ${ansi_exports.gray("-")} ${ansi_exports.white("syncify.config.json")}
    `)
  );
  process.exit(1);
}
function throwError(message2, solution) {
  console.error(
    ansi_exports.redBright.bold(`Error ${message2} option

`),
    ansi_exports.gray(`${solution}`)
  );
  process.exit(1);
}
function unknownError(option, value) {
  console.error(
    ansi_exports.redBright.bold(`Unknown ${option} option

`),
    ansi_exports.redBright(`The ${ansi_exports.bold(value)} option in invalid, remove it from the config`)
  );
  process.exit(1);
}
function authURL(domain, env2) {
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
  throw new Error(`Missing "${domain}" credentials`);
}
function getModules(pkg, name) {
  if (has("devDependencies", pkg)) {
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
      const config2 = await bundleRequire.bundleRequire({ filepath: path2 });
      return {
        path: path2,
        config: config2.mod.syncify || config2.mod.default || config2.mod
      };
    }
    return null;
  } catch (e2) {
    return null;
  }
}
function renameFile(src, rename2) {
  let name = rename2;
  const dir = lastPath(src);
  const ext = path$1.extname(src);
  const file = path$1.basename(src, ext);
  if (isUndefined(rename2))
    return { dir, ext, file, name: file };
  if (/(\[dir\])/.test(name))
    name = name.replace("[dir]", dir);
  if (/(\[file\])/.test(name))
    name = name.replace("[file]", file);
  if (/(\[ext\])/.test(name))
    name = name.replace(".[ext]", ext);
  return {
    ext,
    file,
    dir,
    name: rename2.replace(rename2, name)
  };
}
var spawns = /* @__PURE__ */ new Map();
var spawned = (name, command, callback) => {
  const child = spawn3__default["default"](command.cmd, command.args, { stdio: "pipe" });
  child.stdio[0].on("data", callback);
  child.stdio[1].on("data", callback);
  child.stdio[2].on("data", callback);
  command.pid = child.pid;
  spawns.set(name, child);
};

// src/logger/heading.ts
function logHeader(bundle2) {
  const text = [];
  if (bundle2.mode.metafields)
    return nil;
  text.push(
    `${open}${gray("Syncify")} ${gray("~")} ${gray(getTime())}`,
    `${line}`,
    `${line}${whiteBright.bold(`v${bundle2.version}`)}`,
    `${line}`
  );
  const _st = bundle2.sync.stores.length;
  const _th = keys(bundle2.sync.themes).length;
  const _ss = keys(bundle2.spawn.commands).length;
  const { mode } = bundle2;
  const stores = cyan.bold(String(_st)) + (_st > 1 ? " stores" : " store");
  const themes = cyan.bold(String(_th)) + (_th > 1 ? " themes" : " theme");
  const env2 = cyan.bold(`${bundle2.dev ? "development" : "production"}`);
  if (mode.build) {
    text.push(`${line}Running ${cyan.bold("build")} in ${env2}`);
  } else if (mode.watch) {
    text.push(`${line}Running ${cyan.bold("watch")} in ${env2}`);
  } else if (mode.upload) {
    text.push(`${line}Running ${cyan.bold("upload")} mode`);
  } else if (mode.download) {
    text.push(`${line}Running ${cyan.bold("download")} mode`);
  } else if (mode.vsc) {
    text.push(`${line}Generate ${cyan.bold("vscode")} schema`);
  } else if (mode.clean) {
    text.push(`${line}Running ${cyan.bold("clean")} mode`);
  } else if (mode.export) {
    text.push(`${line}Running ${cyan.bold("export")} mode`);
  }
  text.push(`${line}${_st > 0 && _th > 0 ? `Syncing ${themes} to ${stores}` : nil}`);
  if (anyTrue(mode.build, mode.watch) && _ss > 0) {
    text.push(`Spawned ${cyan.bold(`${_ss}`)} child ${_ss > 1 ? "processes" : "process"}${nl}`);
  } else {
    text.push(line);
  }
  if (allFalse(
    mode.upload,
    mode.download,
    mode.build,
    mode.clean,
    mode.vsc
  )) {
    if (_ss > 0) {
      const spwns = from(spawns);
      const width = spwns.reduce((size, [name]) => name.length > size ? name.length : size, 0);
      const pids = spwns.map(([name, child]) => line + ws.repeat(width - name.length) + whiteBright(toUpcase(name)) + gray(":") + ws + gray("PID") + " \u2192 " + gray("#") + pink(`${child.pid}`));
      text.push(`${line}${bold("Processes:")}${newline}${pids.join(nl)}${_th > 0 ? nl : nil}`);
    }
    if (_th > 0) {
      const themes2 = values(bundle2.sync.themes);
      const width = themes2.reduce((size, { target }) => target.length > size ? target.length : size, 0);
      const urls = themes2.map(({ id, store, target }) => ws.repeat(width - target.length) + newline + line + pink(`${store.slice(0, store.indexOf("."))} \u2192 `) + pink.bold(target) + pink(" \u2192 ") + gray.underline(`https://${store}/admin/themes/${id}/editor`));
      text.push(`${line}${bold("Theme Editors:")}${urls.join(nl)}${nl}${line}`);
    }
    if (_th > 0) {
      const themes2 = values(bundle2.sync.themes);
      const width = themes2.reduce((size, { target }) => target.length > size ? target.length : size, 0);
      const urls = themes2.map(({ id, store, target }) => ws.repeat(width - target.length) + newline + line + pink(`${store.slice(0, store.indexOf("."))} \u2192 `) + pink.bold(target) + pink(" \u2192 ") + gray.underline("https://" + store + "?preview_theme_id=" + id));
      text.push(`${line}${bold("Theme Previews:")}${urls.join(nl)}${nl}${line}`);
    }
  }
  let hasWarning = false;
  const cf = path$1.basename(bundle2.file);
  for (const prop2 in warnings) {
    const warn2 = warnings[prop2];
    if (warn2.length > 0) {
      if (!hasWarning) {
        text.push(`${line}${yellowBright(`${bold("Warnings")} in ${bold(cf)}`)}:${nl}${line}`);
        hasWarning = true;
      }
      const title3 = yellowBright(`${bold(`${warn2.length}`)} ${prop2} ${warn2.length > 1 ? "warnings" : "warning"}`);
      text.push(`${line}${title3}${newline}${warn2.join(nl)}${nl}${line}`);
    }
  }
  return text.join(`${nl}`);
}

// src/cli/exit.ts
var trigger = false;
var register = false;
var hooks = /* @__PURE__ */ new Set();
function exit(manual, signal2) {
  if (trigger)
    return;
  trigger = true;
  hooks.forEach((callback) => callback());
  if (manual)
    process.exit(128 + signal2);
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
async function configFile(cwd) {
  let path2 = null;
  for (const file of [
    "syncify.config.js",
    "syncify.config.mjs",
    "syncify.config.cjs",
    "syncify.config.ts",
    "syncify.config.json"
  ]) {
    path2 = path$1.join(cwd, file);
    const exists = await fsExtra.pathExists(path2);
    if (exists)
      break;
    path2 = null;
  }
  if (path2 === null)
    return null;
  try {
    if (path2.endsWith(".json")) {
      bundle.file = path2;
      const json = await fsExtra.readFile(path2);
      return jsonc(json.toString());
    } else {
      bundle.file = path2;
      const config2 = await bundleRequire.bundleRequire({ filepath: path2 });
      return config2.mod.syncify || config2.mod.default || config2.mod;
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
async function getTSConfig(cwd) {
  let uri2;
  uri2 = path$1.join(cwd, "tsconfig.json");
  const tsconfig = await fsExtra.pathExists(uri2);
  if (!tsconfig) {
    uri2 = path$1.join(cwd, "jsconfig.json");
    const jsconfig = await fsExtra.pathExists(uri2);
    if (!jsconfig)
      return null;
  }
  try {
    const file = await fsExtra.readFile(uri2);
    const config2 = stripJsonComments(file.toString());
    return JSON.parse(config2);
  } catch (e2) {
    throw new Error(e2);
  }
}
async function getPackageJson(cwd) {
  const uri2 = path$1.join(cwd, "package.json");
  const has2 = await fsExtra.pathExists(uri2);
  if (!has2)
    throw new Error('Missing "package.json" file');
  try {
    const pkg = await fsExtra.readJson(uri2);
    return pkg;
  } catch (e2) {
    throw new Error(e2);
  }
}
var setViewOptions = (config2) => {
  if (!has("sections", config2.views))
    return;
  const { sections } = config2.views;
  if (!isObject(config2.views.sections)) {
    unknownError("sections", config2.views.sections);
  }
  for (const option in bundle.section) {
    if (!has(option, sections))
      unknownError("sections", option);
    if (option === "prefixDir") {
      if (isBoolean(sections[option])) {
        bundle.section[option] = sections[option];
        continue;
      } else {
        typeError("sections", option, sections[option], "boolean");
      }
    }
    if (option === "separator") {
      if (isString(sections[option])) {
        if (/[@:_-]/.test(sections[option])) {
          bundle.section[option] = sections[option];
          continue;
        } else {
          invalidError("sections", option, sections[option], "@ | _ | : | -");
        }
      } else {
        typeError("sections", option, sections[option], "string");
      }
    }
    if (option === "global") {
      const globals = isString(sections[option]) ? [sections[option]] : sections[option];
      if (isArray(globals)) {
        bundle.section[option] = new RegExp(`${globals.join("|")}`);
        continue;
      } else {
        typeError("sections", option, sections[option], "string | string[]");
      }
    }
  }
};
function setJsonOptions(config2) {
  if (!has("json", config2.transforms))
    return;
  const { json } = config2.transforms;
  if (!isObject(json))
    unknownError("json", json);
  for (const option in json) {
    if (option === "indent") {
      if (isNumber(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError("json", option, json[option], "number");
      }
    }
    if (option === "useTab") {
      if (isBoolean(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError("json", option, json[option], "boolean");
      }
    }
    if (option === "exclude") {
      const exclude = isString(json[option]) ? [json[option]] : json[option];
      if (isArray(exclude)) {
        bundle.json[option] = anymatch4__default["default"](exclude);
        continue;
      } else {
        typeError("exclude", option, exclude[option], "string | string[]");
      }
    }
  }
}
function getResolvedPaths(filePath) {
  const warn2 = warnOption("URI Resolver");
  const { cwd } = bundle;
  const path2 = normalPath(bundle.config.input);
  if (isArray(filePath)) {
    return filePath.flatMap((item3) => {
      const match = glob4__default["default"].sync(path2(item3), { cwd, realpath: true });
      if (match.length === 0) {
        warn2("Path could not be resolved at", item3);
        return null;
      } else {
        return match;
      }
    });
  }
  if (isString(filePath)) {
    const match = glob4__default["default"].sync(path2(filePath), { cwd, realpath: true });
    if (match.length === 0) {
      warn2("Path could not be resolved at", filePath);
      return null;
    } else {
      return match;
    }
  }
  typeError("uri", "uri/path", filePath, "string | string[]");
}
function getTransform(transforms, flatten = false) {
  const config2 = [];
  for (const prop2 in transforms) {
    const o2 = { snippet: prop2.startsWith("snippets/") };
    const asset = prop2.startsWith("assets/");
    const option = transforms[prop2];
    const isArr = isArray(option);
    const rename2 = asset || o2.snippet;
    if (isString(option) || isArr && rename2) {
      if (rename2)
        o2.rename = asset ? prop2.slice(7) : prop2.slice(9);
      if (isArr && !option.every(isString))
        typeError("transform", prop2, option, "string[]");
      const paths2 = getResolvedPaths(option);
      if (paths2) {
        if (flatten) {
          for (const input of paths2)
            config2.push(utils.assign({}, o2, { input }));
        } else {
          config2.push(utils.assign({}, o2, { input: paths2 }));
        }
      }
    } else if (isObject(option)) {
      if (!has("input", option))
        invalidError("tranform", prop2, option, "{ input: string | string[] }");
      const paths2 = getResolvedPaths(option.input);
      if (paths2) {
        const merge = rename2 ? utils.assign({}, option, o2, { rename: asset ? prop2.slice(7) : prop2.slice(9) }) : utils.assign({}, o2, option);
        if (flatten) {
          for (const input of paths2)
            config2.push(utils.assign(merge, { input }));
        } else {
          config2.push(utils.assign(merge, { input: paths2 }));
        }
      }
    } else if (isArray(option)) {
      if (option.every(isString)) {
        const paths2 = getResolvedPaths(option);
        if (paths2) {
          if (flatten) {
            for (const input of paths2)
              config2.push(utils.assign({}, o2, option, { input }));
          } else {
            config2.push(utils.assign({}, o2, option, { input: paths2 }));
          }
        }
      } else if (isObject(option[0])) {
        for (const item3 of option) {
          if (!isObject(item3))
            typeError("transform", prop2, item3, "{ input: string }");
          if (!has("input", item3))
            invalidError("tranform", prop2, item3, "{ input: string | string[] }");
          const paths2 = getResolvedPaths(item3.input);
          if (paths2) {
            if (flatten) {
              for (const input of paths2)
                config2.push(utils.assign({}, o2, item3, { input }));
            } else {
              config2.push(utils.assign({}, o2, item3, { input: paths2 }));
            }
          }
        }
      } else {
        typeError("transform", prop2, option, "string[] | object[]");
      }
    }
  }
  return config2;
}
var renameFile2 = (src, rename2) => {
  let name = rename2;
  const dir = lastPath(src);
  const ext = path$1.extname(src);
  const file = path$1.basename(src, ext);
  if (isUndefined(rename2))
    return { dir, ext, file, name: file };
  if (/(\[dir\])/.test(name))
    name = name.replace("[dir]", dir);
  if (/(\[file\])/.test(name))
    name = name.replace("[file]", file);
  if (/(\[ext\])/.test(name))
    name = name.replace(".[ext]", ext);
  return {
    ext,
    file,
    dir,
    name: rename2.replace(rename2, name)
  };
};
async function setScriptOptions(config2, pkg) {
  if (!has("script", config2.transforms))
    return;
  const { esbuild: esbuild2 } = processor2;
  const { script: script3 } = config2.transforms;
  const warn2 = warnOption("script transform option");
  esbuild2.installed = getModules(pkg, "esbuild");
  if (esbuild2.installed) {
    const esb = await readConfigFile("esbuild.config");
    if (esb !== null) {
      esbuild2.file = esb.path;
      esbuild2.config = mergerino_min_default(esbuild2.config, esb.config);
    }
  } else {
    missingDependency("esbuild");
  }
  if (has("entryPoints", esbuild2.config)) {
    warn2("processor config is not allowed and was omitted", "entryPoints");
    delete esbuild2.config.entryPoints;
  }
  const tsconfig = await getTSConfig(bundle.cwd);
  const transforms = getTransform(script3, true);
  const esboptions = omit(["input", "watch", "rename", "snippet"]);
  defineProperty(esbuild2, "tsconfig", { get() {
    return tsconfig;
  } });
  if (esbuild2.config.plugins.length > 0) {
    esbuild2.config.plugins.unshift(pluginPaths(), pluginWatch());
  } else {
    esbuild2.config.plugins.push(pluginPaths(), pluginWatch());
  }
  esbuild2.config.absWorkingDir = bundle.cwd;
  for (const transform3 of transforms) {
    if (bundle.watch.has(transform3.input)) {
      warn2("input already in use", path$1.relative(bundle.cwd, transform3.input));
    }
    const o2 = {
      input: transform3.input,
      snippet: transform3.snippet,
      rename: null,
      watch: null,
      esbuild: null
    };
    const build2 = assign({ entryPoints: [transform3.input] }, esbuild2.config);
    const esb = esboptions(transform3);
    const { name } = renameFile2(transform3.input, transform3.rename);
    if (!name.endsWith(".js") && !name.endsWith(".mjs")) {
      o2.rename = name + ".js";
    } else if (name.endsWith(".cjs")) {
      invalidError("rename", "file extension", name, ".js | .mjs");
    } else {
      o2.rename = name;
    }
    if (transform3.snippet) {
      if (!name.endsWith(".liquid"))
        o2.rename = name + ".liquid";
      bundle.watch.add(`!${path$1.join(bundle.cwd, config2.output, "snippets", o2.rename)}`);
    } else {
      if (name.endsWith(".liquid"))
        warn2("Using .liquid extension rename for asset", name);
      bundle.watch.add(`!${path$1.join(bundle.cwd, config2.output, "assets", o2.rename)}`);
    }
    if (isEmpty(esb)) {
      defineProperty(o2, "esbuild", { get() {
        return build2;
      } });
    } else {
      for (const prop2 in esb) {
        if (prop2 === "entryPoints") {
          warn2("Option is not allowed, use Syncify input instead", prop2);
        } else if (prop2 === "outdir") {
          warn2("Option is not allowed, Syncify will handle output", prop2);
        } else if (prop2 === "watch") {
          warn2("Option is not allowed, declare watch using Syncify", prop2);
        } else if (prop2 === "absWorkingDir" || prop2 === "watch" || prop2 === "incremental" || prop2 === "write" || prop2 === "logLevel") {
          warn2("Option is not allowed and will be ignored", prop2);
        } else if (prop2 === "plugins") {
          build2[prop2].push(...esb[prop2]);
        } else {
          build2[prop2] = esb[prop2];
        }
      }
      defineProperty(o2, "esbuild", { get() {
        return build2;
      } });
    }
    if (!has("watch", transform3))
      transform3.watch = [];
    if (!isArray(transform3.watch))
      typeError("script", "watch", transform3.watch, "string[]");
    const entries = assign({}, isObject(transform3.esbuild) ? transform3.esbuild : esbuild2.config, {
      entryPoints: [transform3.input],
      write: false,
      watch: false,
      incremental: true,
      logLevel: "silent",
      absWorkingDir: bundle.cwd,
      plugins: []
    });
    if (esbuild2.tsconfig !== null && hasPath("compilerOptions.paths", esbuild2.tsconfig)) {
      entries.plugins.push(pluginPaths(transform3), pluginWatch(transform3));
    } else {
      entries.plugins.push(pluginWatch(transform3));
    }
    await runtime(entries);
    transform3.watch.forEach((p) => bundle.watch.add(p));
    o2.watch = anymatch4__default["default"](transform3.watch);
    bundle.script.push(o2);
  }
  esbuild2.loaded = true;
}
async function setStyleConfig(config2, pkg) {
  if (!has("style", config2.transforms))
    return;
  const { postcss: postcss2, sass: sass2 } = processor2;
  const warn2 = warnOption("style transform option");
  sass2.installed = getModules(pkg, "sass");
  postcss2.installed = getModules(pkg, "postcss");
  if (postcss2.installed) {
    const pcss2 = await readConfigFile("postcss.config");
    if (pcss2 !== null) {
      postcss2.file = pcss2.path;
      postcss2.config = pcss2.config;
    }
  }
  const styles2 = getTransform(config2.transforms.style, true);
  const path2 = normalPath(config2.input);
  for (const style2 of styles2) {
    const compile7 = {
      input: style2.input,
      watch: null,
      postcss: false,
      sass: false
    };
    if (has("postcss", style2)) {
      const override = isObject(style2.postcss);
      if ((isBoolean(style2.postcss) || override) && !isNil(style2.postcss)) {
        if (style2.postcss !== false) {
          if (!postcss2.installed)
            missingDependency("postcss");
          if (!postcss2.required)
            postcss2.required = true;
          compile7.postcss = override ? mergerino_min_default(postcss2.config, style2.postcss) : true;
        }
      } else {
        typeError("style", "postcss", compile7.postcss, "boolean | {}");
      }
    }
    if (has("sass", style2) && style2.sass !== false || sass2.installed === true) {
      const override = isObject(style2.sass);
      if ((isBoolean(style2.sass) || override) && !isNil(style2.sass)) {
        if (!sass2.installed)
          missingDependency("sass");
        if (!sass2.required)
          sass2.required = true;
        if (!override) {
          defineProperty(compile7, "sass", { get() {
            return style2.sass;
          } });
        } else {
          compile7.sass = assign(sass2.config, style2.sass);
          for (const option in style2.sass) {
            if (option === "sourcemap" || option === "warnings") {
              if (isBoolean(style2.sass[option])) {
                compile7.sass[option] = style2.sass[option];
              } else {
                typeError("sass", option, style2.sass[option], "boolean");
              }
            } else if (option === "style") {
              if (!isString(style2.sass[option]))
                typeError("sass", option, style2.sass[option], "string");
              if (style2.sass[option] === "expanded" || style2.sass[option] === "compressed") {
                compile7.sass[option] = style2.sass[option];
              } else {
                invalidError("sass", option, style2.sass[option], "expanded | compressed");
              }
            } else if (option === "includePaths") {
              if (isArray(style2.sass[option])) {
                compile7.sass[option] = uniq(style2.sass[option]).map((p) => path$1.join(bundle.cwd, p));
              } else {
                typeError("sass", option, style2.sass[option], "string[]");
              }
            }
          }
        }
      } else {
        typeError("style", "sass", style2.sass, "boolean | {}");
      }
      if (!style2.snippet && !/\.s[ac]ss/.test(path$1.extname(compile7.input))) {
        warn2("Input is not a sass file", compile7.input);
      }
    }
    let rename2 = renameFile(style2.rename);
    if (has("rename", style2) && !isNil(style2)) {
      if (!isString(style2.rename))
        typeError("styles", "rename", style2.rename, "string");
      rename2 = renameFile(compile7.input, style2.rename);
      if (!/[a-zA-Z0-9_.-]+/.test(rename2.name))
        typeError("sass", "rename", rename2, "Invalid rename augment");
      if (rename2.name.endsWith(".css")) {
        compile7.rename = rename2.name;
      } else {
        if (rename2.name.endsWith(".scss")) {
          rename2.name = rename2.name.replace(".scss", ".css");
        } else if (rename2.name.endsWith(".sass")) {
          rename2.name = rename2.name.replace(".sass", ".css");
        } else if (!rename2.name.endsWith(".liquid")) {
          rename2.name = rename2.name + ".css";
        }
      }
    }
    const watch2 = [];
    if (bundle.mode.watch && has("watch", style2)) {
      if (!isArray(style2.watch))
        typeError("styles", "watch", style2.watch, "string[]");
      for (const uri2 of style2.watch) {
        const globs = glob4__default["default"].sync(path$1.join(bundle.cwd, path2(uri2)));
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
      watch2.push(compile7.input);
      watch2.forEach((p) => bundle.watch.add(p));
      compile7.watch = anymatch4__default["default"](watch2);
    } else {
      compile7.watch = anymatch4__default["default"]([compile7.input]);
      bundle.watch.add(compile7.input);
    }
    if (typeof compile7.sass === "object") {
      compile7.sass.includePaths.unshift(bundle.cwd, path$1.join(bundle.cwd, rename2.dir));
      if (hasPath("sass.includePaths", style2)) {
        compile7.sass.includePaths = style2.sass.includePaths.map((p) => path$1.join(bundle.cwd, p));
      }
    }
    if (has("snippet", style2)) {
      if (!isBoolean(style2.snippet))
        typeError("styles", "snippet", style2.snippet, "boolean");
      compile7.snippet = style2.snippet;
    }
    if (compile7.snippet) {
      if (!has("rename", compile7))
        compile7.rename = rename2.name;
      if (!rename2.name.endsWith(".liquid") || !compile7.rename.endsWith(".liquid")) {
        compile7.rename = rename2.name + ".liquid";
      }
      bundle.watch.add(`!${path$1.join(bundle.cwd, config2.output, "snippets", compile7.rename)}`);
    } else {
      compile7.rename = rename2.name;
      bundle.watch.add(`!${path$1.join(bundle.cwd, config2.output, "assets", rename2.name)}`);
    }
    bundle.style.push(compile7);
  }
}

// src/options/minify.ts
var setMinifyOptions = (config2) => {
  if (!hasPath("minify", config2))
    return;
  let warn2 = warnOption("Minify");
  for (const key in config2.minify) {
    if (bundle.minify[key] === false)
      continue;
    if (config2.minify[key] === false)
      continue;
    warn2 = warnOption(`${key.toUpperCase()} Minify Rule`);
    for (const rule in config2.minify[key]) {
      if (key === "html") {
        if (rule === "minifyCSS" || rule === "minifyJS" || rule === "sortAttributes" || rule === "sortClassName") {
          warn2("Option is not allowed", key);
          continue;
        }
        if (rule === "ignoreCustomFragments")
          continue;
      }
      if (typeof config2.minify[key][rule] === typeof minify[key][rule]) {
        bundle.minify[key][rule] = config2.minify[key][rule];
      } else {
        warn2("Option type is invalid", rule);
      }
    }
  }
  if (has("ignoreCustomFragments", config2.minify.html) && typeof config2.minify.html === "object") {
    const { ignoreCustomFragments } = config2.minify.html;
    if (isArray(ignoreCustomFragments)) {
      if (ignoreCustomFragments.length > 0) {
        const tags = ignoreCustomFragments.map((v) => isRegex(v) ? v : new RegExp(v));
        bundle.minify.html.ignoreCustomFragments.push(...tags);
      }
    } else {
      typeError("minify", ignoreCustomFragments, "option must be an array type", "string[]");
    }
  }
  if (typeof bundle.minify.liquid === "object") {
    if (has("ignoreTags", bundle.minify.liquid)) {
      const { ignoreTags } = bundle.minify.liquid;
      if (isArray(ignoreTags)) {
        if (ignoreTags.length > 0) {
          const tags = new RegExp(`{%-?\\s*(?:(?!${ignoreTags.join("|")})[\\s\\S])*?%}`);
          bundle.minify.html.ignoreCustomFragments.push(tags);
        }
      } else {
        typeError("minify", ignoreTags, "option must be an array type", "string[]");
      }
    }
    if (has("ignoreObjects", bundle.minify.liquid)) {
      const { ignoreObjects } = bundle.minify.liquid;
      if (isArray(ignoreObjects)) {
        if (ignoreObjects.length > 0) {
          const tags = new RegExp(`{{-?\\s*(?:(?!${ignoreObjects.join("|")})[\\s\\S])*?-?}}`);
          bundle.minify.html.ignoreCustomFragments.push(tags);
        }
      } else {
        typeError("minify", ignoreObjects, "option must be an array type", "string[]");
      }
    }
  }
  return config2;
};

// src/options/define.ts
kill(() => {
  queue.pause();
  queue.clear();
  nwl(nil);
  spawns.forEach((child, name) => {
    log(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
    child.kill();
  });
  nwl(nil);
  spawns.clear();
  process.exit(0);
});
async function define(cli, _options) {
  clear2();
  const pkg = await getPackageJson(cli.cwd);
  defineProperty(bundle, "pkg", { get() {
    return pkg;
  } });
  bundle.config = await getConfig(pkg, cli);
  bundle.mode = setModes(cli);
  bundle.cli = cli.cli;
  bundle.version = pkg.version;
  bundle.cwd = cli.cwd;
  bundle.silent = cli.silent;
  bundle.prod = cli.prod;
  bundle.dev = cli.dev && !cli.prod;
  process.env.SYNCIFY_ENV = bundle.dev ? "dev" : "prod";
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);
  const promise = await Promise.all([
    setBaseDirs(cli, config),
    setCaches(bundle.cwd),
    setThemeDirs(bundle.dirs.output),
    setImportDirs(bundle),
    setStores(cli, config),
    setPaths(config),
    setProcessors(config),
    setMinifyOptions(config),
    setViewOptions(config),
    setJsonOptions(config),
    setScriptOptions(config, pkg),
    setStyleConfig(config, pkg),
    setSpawns(config, bundle),
    setPlugins(config, bundle),
    setHotReloads(cli, config)
  ]);
  log(logHeader(bundle));
  return promise;
}
async function setHotReloads(cli, config2) {
  if (bundle.mode.watch === false || cli.hot === false)
    return;
  const warn2 = warnOption("HOT Reloads");
  if (bundle.sync.stores.length > 1) {
    warn2("HOT Reload can only be used on 1 store");
    return;
  } else if (bundle.sync.themes.length > 1) {
    warn2("HOT Reload can only be used on 1 theme");
    return;
  }
  let defaults = true;
  if (isBoolean(config2.hot)) {
    if (config2.hot === false)
      return;
    bundle.hot = true;
  } else if (isObject(config2.hot)) {
    bundle.hot = true;
    defaults = isEmpty(config2.hot);
  } else {
    typeError("hot", "hot", config2.hot, "boolean | {}");
  }
  if (!defaults) {
    for (const prop2 in config2.hot) {
      if (has(prop2, hot)) {
        if (prop2 === "label") {
          if (config2.hot[prop2] === "visible" || config2.hot[prop2] === "hidden") {
            hot[prop2] = config2.hot[prop2];
          } else {
            invalidError("hot", prop2, config2.hot[prop2], "visible | hidden");
          }
        } else if (prop2 === "method") {
          if (config2.hot[prop2] === "hot" || config2.hot[prop2] === "refresh") {
            hot[prop2] = config2.hot[prop2];
          } else {
            invalidError("hot", prop2, config2.hot[prop2], "hot | refresh");
          }
        } else if (prop2 === "scroll") {
          if (config2.hot[prop2] === "preserved" || config2.hot[prop2] === "top") {
            hot[prop2] = config2.hot[prop2];
          } else {
            invalidError("hot", prop2, config2.hot[prop2], "preserved | top");
          }
        } else if (typeof hot[prop2] === typeof config2.hot[prop2]) {
          hot[prop2] = config2.hot[prop2];
        } else {
          typeError("hot", prop2, config2.hot[prop2], typeof hot[prop2]);
        }
      } else {
        unknownError(`hot > ${prop2}`, config2.hot[prop2]);
      }
    }
  }
  hot.snippet = path$1.join(bundle.cwd, "node_modules", "@syncify/cli", "hot.js.liquid");
  hot.output = path$1.join(bundle.dirs.output, "snippets", "hot.js.liquid");
  for (const layout of hot.layouts)
    hot.alive[path$1.join(bundle.dirs.output, "layout", layout)] = false;
}
function setProcessors(config2) {
  for (const prop2 in config2.processors) {
    processor2[prop2].config = isArray(config2.processors[prop2]) ? config2.processors[prop2] : assign(processor2[prop2].config, config2.processors[prop2]);
  }
}
function setPlugins(config2, bundle2) {
  if (!has("plugins", config2))
    return;
  if (!isArray(config2.plugins))
    return;
  for (const plugin of config2.plugins) {
    if (has("onInit", plugin))
      plugin.onInit.call({ ...bundle2 }, config2);
    if (has("onChange", plugin)) ;
    if (has("onTransform", plugin)) ;
    if (bundle2.mode.watch) {
      if (has("onWatch", plugin)) ;
      if (has("onReload", plugin)) ;
    }
    if (bundle2.mode.build) {
      if (has("onBuild", plugin)) ;
    }
  }
}
function setSpawns(config2, bundle2) {
  if (!has("spawn", config2) || isNil(config2.spawn))
    return;
  if (!isObject(config2.spawn)) {
    typeError("config", "spawn", config2.spawn, "{ build: {}, watch: {} }");
  }
  let mode = null;
  if (bundle2.mode.build && has("build", config2.spawn))
    mode = "build";
  if (bundle2.mode.watch && has("watch", config2.spawn))
    mode = "watch";
  if (isNil(mode) || isNil(config2.spawn[mode]))
    return;
  if (!isObject(config2.spawn[mode])) {
    typeError("spawn", mode, config2.spawn.build, "string | string[]");
  }
  const props = keys(config2.spawn[mode]);
  if (props.length === 0)
    return;
  for (const name in config2.spawn[mode]) {
    const command = config2.spawn[mode][name];
    if (isString(command)) {
      bundle2.spawn.commands[name] = {
        cmd: nil,
        args: [],
        pid: NaN
      };
      const cmd = command.trimStart().indexOf(ws) > -1 ? command.trimStart().split(ws) : [command];
      bundle2.spawn.commands[name].cmd = cmd.shift();
      bundle2.spawn.commands[name].args = cmd;
      spawned(name, bundle2.spawn.commands[name], spawn2(name));
    } else if (isArray(command)) {
      const cmd = command.shift();
      bundle2.spawn.commands[name] = { cmd, args: command, pid: NaN };
      spawned(name, bundle2.spawn.commands[name], spawn2(name));
    } else {
      typeError("spawn", mode, config2.spawn[mode], "string | string[]");
    }
  }
}
function setModes(cli) {
  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transfrom = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  return {
    vsc: cli.vsc,
    live: cli.watch && cli.hot,
    export: cli.export,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    prompt: cli.prompt,
    pull: cli.pull,
    push: cli.push,
    script: transfrom ? cli.script : false,
    style: transfrom ? cli.style : false,
    image: transfrom ? cli.image : false,
    svg: transfrom ? cli.svg : false,
    clean: anyTrue(
      resource,
      transfrom,
      cli.upload
    ) ? false : cli.clean,
    build: anyTrue(
      resource,
      transfrom,
      cli.upload,
      cli.watch,
      cli.download
    ) ? false : cli.build,
    watch: anyTrue(
      resource,
      cli.upload,
      cli.download
    ) ? false : cli.watch,
    upload: anyTrue(
      resource,
      transfrom,
      cli.download,
      cli.watch
    ) ? false : cli.upload,
    download: anyTrue(
      resource,
      transfrom,
      cli.upload,
      cli.watch,
      cli.build
    ) ? false : cli.download
  };
}
async function setCaches(cwd) {
  const dir = path$1.join(cwd, "node_modules/.syncify");
  const map2 = path$1.join(dir, "store.map");
  const has2 = await fsExtra.pathExists(map2);
  if (!has2)
    return setCacheDirs(dir);
  bundle.dirs.cache = `${dir}/`;
  const read = await fsExtra.readJson(map2);
  assign(cache, read);
}
async function getConfig(pkg, cli) {
  const options = await configFile(cli.cwd);
  if (options !== null)
    return mergerino_min_default(config, options);
  if (has("syncify", pkg))
    return mergerino_min_default(config, pkg.syncify);
  missingConfig(cli.cwd);
}
function setStores(cli, config2) {
  if (cli._.length === 0)
    return;
  const stores = cli._[0].split(",");
  const file = dotenv__default["default"].config({ path: path$1.join(bundle.cwd, ".env") });
  const array = isArray(config2.stores) ? config2.stores : [config2.stores];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue2 = items.length > 1;
  for (const store of items) {
    const domain = `${store.domain}.myshopify.com`.toLowerCase();
    const env2 = file.error ? process.env : file.parsed;
    const client2 = authURL(store.domain, env2);
    const sidx = bundle.sync.stores.push({
      store: store.domain,
      domain,
      client: client2,
      queue: queue2
    }) - 1;
    if (bundle.mode.metafields || bundle.mode.pages)
      return;
    const themes = has("theme", cli) ? cli.theme.split(",") : has(store.domain, cli) ? cli[store.domain].split(",") : keys(store.themes);
    for (const target of themes) {
      if (!has(target, store.themes))
        invalidError("theme", "target", target, "string");
      bundle.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });
    }
  }
  if (bundle.sync.stores.length === 0) {
    throwError(
      "Unknown, missing or invalid store/theme targets",
      "Check your store config"
    );
  }
}
async function setPaths(config2) {
  const path2 = normalPath(bundle.dirs.input);
  for (const key of PATH_KEYS) {
    let uri2;
    if (key === "customers") {
      uri2 = has(key, config2.paths) ? isArray(config2.paths[key]) ? config2.paths[key].map(path2) : [path2(config2.paths[key])] : [path2("templates/customers")];
    } else if (has(key, config2.paths)) {
      uri2 = isArray(config2.paths[key]) ? config2.paths[key].map(path2) : [path2(config2.paths[key])];
      if (key === "assets")
        uri2.push(path$1.join(bundle.dirs.output, "assets/*"));
    } else if (key === "redirects") {
      uri2 = [path$1.join(bundle.cwd, config2.paths[key])];
    } else {
      uri2 = [path2(key)];
    }
    uri2.forEach((p) => bundle.watch.add(p));
    bundle.paths[key] = anymatch4__default["default"](uri2);
  }
}

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  env: () => env
});
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

// src/index.ts
async function run(options, config2, callback) {
  process.on("SIGINT", signal);
  process.on("uncaughtException", exception);
  process.on("unhandledRejection", rejection);
  if (has("_", options))
    options._ = options._.slice(1);
  if (options.help)
    return console.info(help);
  await define(options);
  if (bundle.mode.clean) {
    try {
      await clean();
    } catch (error3) {
      throw new Error(error3);
    }
  }
  await server(bundle);
  try {
    if (bundle.mode.build) {
      return build(callback);
    } else if (bundle.mode.watch) {
      return watch(callback);
    } else if (bundle.mode.upload) {
      return upload3(callback);
    } else if (bundle.mode.download) {
      return download(callback);
    }
  } catch (e2) {
    console_exports.warn(e2);
  }
}

// src/api.ts
var defineConfig = (config2) => config2;
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
exports.run = run;
exports.throws = throws;
exports.utils_exports = utils_exports;
