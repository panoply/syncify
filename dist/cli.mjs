var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
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

// node_modules/.pnpm/tsup@8.3.0_jiti@2.3.3_postcss@8.4.47_typescript@5.6.3_yaml@2.5.1/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
var getFilename, __filename;
var init_esm_shims = __esm({
  "node_modules/.pnpm/tsup@8.3.0_jiti@2.3.3_postcss@8.4.47_typescript@5.6.3_yaml@2.5.1/node_modules/tsup/assets/esm_shims.js"() {
    getFilename = () => fileURLToPath(import.meta.url);
    __filename = /* @__PURE__ */ getFilename();
  }
});

// packages/ansi/dist/index.js
var require_dist = __commonJS({
  "packages/ansi/dist/index.js"(exports, module) {
    init_esm_shims();
    var ht = Object.create;
    var Fe = Object.defineProperty;
    var dt = Object.getOwnPropertyDescriptor;
    var Bt = Object.getOwnPropertyNames;
    var mt = Object.getPrototypeOf;
    var At = Object.prototype.hasOwnProperty;
    var xt = (e, u) => () => (u || e((u = { exports: {} }).exports, u), u.exports);
    var gu = (e, u) => {
      for (var t in u) Fe(e, t, { get: u[t], enumerable: true });
    };
    var hu = (e, u, t, D) => {
      if (u && typeof u == "object" || typeof u == "function") for (let n of Bt(u)) !At.call(e, n) && n !== t && Fe(e, n, { get: () => u[n], enumerable: !(D = dt(u, n)) || D.enumerable });
      return e;
    };
    var W = (e, u, t) => (t = e != null ? ht(mt(e)) : {}, hu(u || !e || !e.__esModule ? Fe(t, "default", { value: e, enumerable: true }) : t, e));
    var bt = (e) => hu(Fe({}, "__esModule", { value: true }), e);
    var Iu = xt((Ru, _e) => {
      "use strict";
      Object.defineProperty(Ru, "__esModule", { value: true });
      var { round: P, floor: du, max: yt } = Math, wu = (e) => {
        let [, u] = /([a-f\d]{3,6})/i.exec(e) || [], t = u ? u.length : 0;
        if (t === 3) u = u[0] + u[0] + u[1] + u[1] + u[2] + u[2];
        else if (t !== 6) return [0, 0, 0];
        let D = parseInt(u, 16);
        return [D >> 16 & 255, D >> 8 & 255, 255 & D];
      }, $u = (e, u, t) => e === u && u === t ? e < 8 ? 16 : e > 248 ? 231 : P((e - 8) / 247 * 24) + 232 : 16 + 36 * P(e / 51) + 6 * P(u / 51) + P(t / 51), Oe = (e) => {
        let u, t, D, n, r, o;
        return e < 8 ? 30 + e : e < 16 ? e - 8 + 90 : (e >= 232 ? u = t = D = (10 * (e - 232) + 8) / 255 : (o = (e -= 16) % 36, u = du(e / 36) / 5, t = du(o / 6) / 5, D = o % 6 / 5), n = 2 * yt(u, t, D), n === 0 ? 30 : (r = 30 + (P(D) << 2 | P(t) << 1 | P(u)), n === 2 ? r + 60 : r));
      }, Bu = (e, u, t) => Oe($u(e, u, t)), Re = ((e) => {
        let u = (v) => !!s.find((Te) => v.test(Te)), t = globalThis, D = t.Deno, n = D != null, r = t.process || D || {}, o = r.stdout, i = (n ? D.build.os : r.platform) === "win32", s = r.argv || r.args || [], E = r.env || {}, a = -1;
        if (n) try {
          E = E.toObject();
        } catch {
          a = 0;
        }
        let f = "FORCE_COLOR", d = E[f], p = parseInt(d), B = d === "false" ? 0 : isNaN(p) ? 3 : p, A = "NO_COLOR" in E || B === 0 || u(/^-{1,2}(no-color|color=(false|never))$/), T = f in E && B || u(/^-{1,2}color=?(true|always)?$/), Et = (E.NEXT_RUNTIME || "").indexOf("edge") > -1 || "PM2_HOME" in E && "pm_id" in E || (n ? D.isatty(1) : o && "isTTY" in o);
        return A ? 0 : (a < 0 && (a = ((v, Te, pt) => {
          let { TERM: se, COLORTERM: pu } = v;
          return "TF_BUILD" in v ? 1 : "TEAMCITY_VERSION" in v ? 2 : "CI" in v ? ["GITHUB_ACTIONS", "GITEA_ACTIONS"].some((gt) => gt in v) ? 3 : 1 : !Te || /-mono|dumb/i.test(se) ? 0 : pt || pu === "truecolor" || pu === "24bit" || se === "xterm-kitty" ? 3 : /-256(colou?r)?$/i.test(se) ? 2 : /^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(se) ? 1 : 3;
        })(E, Et, i)), T && a === 0 ? 3 : a);
      })(), Su = Re > 0, Tu = { open: "", close: "" }, g = Su ? (e, u) => ({ open: `\x1B[${e}m`, close: `\x1B[${u}m` }) : () => Tu, O = 39, R = 49, mu = (e) => (u, t, D) => e($u(u, t, D)), Au = (e) => (u) => {
        let [t, D, n] = wu(u);
        return e(t, D, n);
      }, le = (e) => g(`38;5;${e}`, O), ae = (e) => g(`48;5;${e}`, R), q = (e, u, t) => g(`38;2;${e};${u};${t}`, O), ce = (e, u, t) => g(`48;2;${e};${u};${t}`, R);
      Re === 1 ? (le = (e) => g(Oe(e), O), ae = (e) => g(Oe(e) + 10, R), q = (e, u, t) => g(Bu(e, u, t), O), ce = (e, u, t) => g(Bu(e, u, t) + 10, R)) : Re === 2 && (q = mu(le), ce = mu(ae));
      var V, ve, J = { ansi256: le, bgAnsi256: ae, fg: le, bg: ae, rgb: q, bgRgb: ce, hex: Au(q), bgHex: Au(ce), visible: Tu, reset: g(0, 0), inverse: g(7, 27), hidden: g(8, 28), bold: g(1, 22), dim: g(2, 22), italic: g(3, 23), underline: g(4, 24), strikethrough: g(9, 29), strike: g(9, 29), grey: g(90, O), gray: g(90, O), bgGrey: g(100, R), bgGray: g(100, R) }, wt = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"], xu = "Bright", K = 30;
      for (V of wt) ve = "bg" + V[0].toUpperCase() + V.slice(1), J[V] = g(K, O), J[V + xu] = g(K + 60, O), J[ve] = g(K + 10, R), J[ve + xu] = g(K + 70, R), K++;
      var { defineProperty: $t, defineProperties: St, setPrototypeOf: vu } = Object, Tt = /[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, vt = /(\r?\n)/g, bu = {}, yu = ({ _p: e }, { open: u, close: t }) => {
        let D = (o, ...i) => {
          if (!o) return "";
          let s = D._p, { _a: E, _b: a } = s, f = o.raw != null ? String.raw(o, ...i) : "" + o;
          if (f.includes("\x1B")) for (; s != null; ) {
            let d = s.close, p = d.length;
            if (p) {
              let B, A = 0, T = "";
              for (; ~(B = f.indexOf(d, A)); ) T += f.slice(A, B) + s.open, A = B + p;
              A && (f = T + f.slice(A));
            }
            s = s._p;
          }
          return f.includes(`
`) && (f = f.replace(vt, a + "$1" + E)), E + f + a;
        }, n = u, r = t;
        return e != null && (n = e._a + u, r = t + e._b), vu(D, Ie), D._p = { open: u, close: t, _a: n, _b: r, _p: e }, D.open = n, D.close = r, D;
      }, Ou = function() {
        let e = (u) => "" + u;
        return e.isSupported = () => Su, e.strip = (u) => u.replace(Tt, ""), e.extend = (u) => {
          for (let t in u) {
            let D = u[t], n = typeof D, r = n === "string" ? q(...wu(D)) : D;
            bu[t] = n === "function" ? { get() {
              return (...o) => yu(this, D(...o));
            } } : { get() {
              let o = yu(this, r);
              return $t(this, t, { value: o }), o;
            } };
          }
          Ie = St({}, bu), vu(e, Ie);
        }, e.extend(J), e;
      }, Ie, Ot = new Ou();
      _e.exports = Ot, _e.exports.Ansis = Ou;
    });
    var _n = {};
    gu(_n, { ARL: () => rD, ARR: () => N, Ansis: () => y.Ansis, Append: () => Xu, BAD: () => DD, Break: () => Ae, BreakRed: () => bD, BreakYellow: () => yD, CHK: () => tD, CHV: () => nD, COL: () => S, COM: () => uD, Context: () => tt, Create: () => Dt, DSH: () => pe, Dash: () => OD, Encase: () => mD, End: () => ut, HSH: () => Xt, IndentDash: () => ID, IndentEnd: () => _D, IndentLine: () => RD, LAN: () => He, LCB: () => Me, LPR: () => ke, LSB: () => We, Line: () => wD, LineRed: () => $D, LineYellow: () => SD, MIN: () => eD, Multiline: () => xD, Next: () => vD, NextLine: () => TD, PIP: () => Zt, PLS: () => Qt, Prefix: () => Qe, RAN: () => ze, RCB: () => Ge, RPR: () => je, RSB: () => Ue, Ruler: () => AD, Spinner: () => In, Suffix: () => Qu, TLD: () => ue, Top: () => et, Tree: () => F, Wrap: () => Ze, blue: () => Nt, blueBright: () => Wt, bold: () => $2, brown: () => Ht, cleanStack: () => te, clear: () => Rt, cyan: () => _t, cyanBright: () => jt, dim: () => kt, eq: () => qe, getDateTime: () => BD, getTime: () => me, glue: () => M, gray: () => l, green: () => Lt, greenBright: () => Mt, lavender: () => Vt, lightGray: () => c19, magenta: () => Pt, magentaBright: () => Gt, neonCyan: () => Kt, neonGreen: () => H, neonMagenta: () => Jt, neonRouge: () => Ne, orange: () => Yt, pink: () => Pe, progress: () => LD, purge: () => It, red: () => x, redBright: () => U, reset: () => Q, sanitize: () => Be, strip: () => Ut, teal: () => zt, tsize: () => ee, underline: () => Le, update: () => L, white: () => fe, whiteBright: () => X, wrapAnsi: () => _, yellow: () => w, yellowBright: () => Z });
    module.exports = bt(_n);
    var y = W(Iu(), 1);
    var { ansi256: Pn, fg: Nn, bgAnsi256: kn, bg: jn, rgb: Mn, bgRgb: Gn, hex: Wn, bgHex: Un, reset: Hn, inverse: zn, hidden: Yn, visible: Vn, bold: Kn, dim: Jn, italic: qn, underline: Zn, strikethrough: Xn, strike: Qn, black: er, red: ur, green: tr, yellow: Dr, blue: nr, magenta: rr, cyan: ir, white: or, grey: sr, gray: Fr, blackBright: lr, redBright: ar, greenBright: cr, yellowBright: fr, blueBright: Cr, magentaBright: Er, cyanBright: pr, whiteBright: gr, bgBlack: hr, bgRed: dr, bgGreen: Br, bgYellow: mr, bgBlue: Ar, bgMagenta: xr, bgCyan: br, bgWhite: yr, bgGrey: wr, bgGray: $r, bgBlackBright: Sr, bgRedBright: Tr, bgGreenBright: vr, bgYellowBright: Or, bgBlueBright: Rr, bgMagentaBright: Ir, bgCyanBright: _r, bgWhiteBright: Lr } = y.default;
    var Rt = "\x1B[H\x1B[2J";
    var It = "\x1B[2J\x1B[3J\x1B[H\x1Bc";
    y.default.extend({ brown: "#c19a6b", pink: "#ff75d1", teal: "#91EBC2", lightGray: "#2a2a2e", orange: "#FFAB40", lavender: "#8080FF", neonGreen: "#56ef83", neonCyan: "#69d5fd", neonRouge: "#FF8095", neonMagenta: "#7b68ee" });
    var { cyan: _t, red: x, green: Lt, yellow: w, magenta: Pt, blue: Nt, white: fe, gray: l, dim: kt, cyanBright: jt, redBright: U, greenBright: Mt, yellowBright: Z, magentaBright: Gt, blueBright: Wt, whiteBright: X, strip: Ut, underline: Le, bold: $2, reset: Q, lightGray: c19, pink: Pe, brown: Ht, teal: zt, orange: Yt, lavender: Vt, neonGreen: H, neonCyan: Kt, neonRouge: Ne, neonMagenta: Jt } = y.default;
    var m = __require("process");
    var Lu = __require("child_process");
    var Pu = __require("url");
    var Ee = __require("path");
    var qt = {};
    function Ce(e, u, t) {
      return (0, Lu.execFileSync)(e, u, { encoding: "utf8", shell: t, stdio: ["ignore", "pipe", "ignore"] }).trim();
    }
    function _u(e, u) {
      let t = (0, Ee.dirname)((0, Pu.fileURLToPath)(qt.url));
      return Ce((0, Ee.join)(t, e), [], u).split(/\r?\n/);
    }
    function I(e, u) {
      let t = Number.parseInt(e, 10);
      return { wrap: t > 85 ? 85 : t, cols: Number.parseInt(e, 10), rows: Number.parseInt(u, 10) };
    }
    function ee() {
      if (m.stdout && m.stdout.columns && m.stdout.rows) return I(m.stdout.columns, m.stdout.rows);
      if (m.stderr && m.stderr.columns && m.stderr.rows) return I(m.stderr.columns, m.stderr.rows);
      if (m.env.COLUMNS && m.env.LINES) return I(m.env.COLUMNS, m.env.LINES);
      if (m.platform === "win32") try {
        let e = _u("vendor/windows/term-size.exe", false);
        if (e.length === 2) return I(e[0], e[1]);
      } catch {
      }
      else {
        if (m.platform === "darwin") try {
          let e = _u("vendor/macos/term-size", true);
          if (e.length === 2) return I(e[0], e[1]);
        } catch {
        }
        try {
          let e = Ce("resize", ["-u"]).match(/\d+/g);
          if (e.length === 2) return I(e[0], e[1]);
        } catch {
        }
        if (m.env.TERM) try {
          let e = Ce("tput", ["cols"]), u = Ce("tput", ["lines"]);
          if (e && u) return I(e, u);
        } catch {
        }
      }
      return I(80, 24);
    }
    var Zt = `${l.open}|${l.close}`;
    var Xt = `${l.open}#${l.close}`;
    var Qt = `${l.open}+${l.close}`;
    var eD = `${l.open}-${l.close}`;
    var uD = `${l.open},${l.close}`;
    var tD = `${H.open}\u2713${H.close}`;
    var DD = `${U.open}\u{10102}${U.close}`;
    var S = `${l.open}:${l.close}`;
    var N = `${l.open}\u2192${l.close}`;
    var nD = `${l.open}\u25B8${l.close}`;
    var rD = `${l.open}\u2942${l.close}`;
    var ue = `${l.open}~${l.close}`;
    var pe = `${l.open}\u2014${l.close}`;
    var ke = `${l.open}(${l.close}`;
    var je = `${l.open})${l.close}`;
    var Me = `${l.open}{${l.close}`;
    var Ge = `${l.open}}${l.close}`;
    var We = `${l.open}[${l.close}`;
    var Ue = `${l.open}]${l.close}`;
    var He = `${l.open}<${l.close}`;
    var ze = `${l.open}>${l.close}`;
    function Ye({ onlyFirst: e = false } = {}) {
      let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
      return new RegExp(t, e ? void 0 : "g");
    }
    var iD = Ye();
    function k(e) {
      if (typeof e != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
      return e.replace(iD, "");
    }
    function Nu(e) {
      return e === 161 || e === 164 || e === 167 || e === 168 || e === 170 || e === 173 || e === 174 || e >= 176 && e <= 180 || e >= 182 && e <= 186 || e >= 188 && e <= 191 || e === 198 || e === 208 || e === 215 || e === 216 || e >= 222 && e <= 225 || e === 230 || e >= 232 && e <= 234 || e === 236 || e === 237 || e === 240 || e === 242 || e === 243 || e >= 247 && e <= 250 || e === 252 || e === 254 || e === 257 || e === 273 || e === 275 || e === 283 || e === 294 || e === 295 || e === 299 || e >= 305 && e <= 307 || e === 312 || e >= 319 && e <= 322 || e === 324 || e >= 328 && e <= 331 || e === 333 || e === 338 || e === 339 || e === 358 || e === 359 || e === 363 || e === 462 || e === 464 || e === 466 || e === 468 || e === 470 || e === 472 || e === 474 || e === 476 || e === 593 || e === 609 || e === 708 || e === 711 || e >= 713 && e <= 715 || e === 717 || e === 720 || e >= 728 && e <= 731 || e === 733 || e === 735 || e >= 768 && e <= 879 || e >= 913 && e <= 929 || e >= 931 && e <= 937 || e >= 945 && e <= 961 || e >= 963 && e <= 969 || e === 1025 || e >= 1040 && e <= 1103 || e === 1105 || e === 8208 || e >= 8211 && e <= 8214 || e === 8216 || e === 8217 || e === 8220 || e === 8221 || e >= 8224 && e <= 8226 || e >= 8228 && e <= 8231 || e === 8240 || e === 8242 || e === 8243 || e === 8245 || e === 8251 || e === 8254 || e === 8308 || e === 8319 || e >= 8321 && e <= 8324 || e === 8364 || e === 8451 || e === 8453 || e === 8457 || e === 8467 || e === 8470 || e === 8481 || e === 8482 || e === 8486 || e === 8491 || e === 8531 || e === 8532 || e >= 8539 && e <= 8542 || e >= 8544 && e <= 8555 || e >= 8560 && e <= 8569 || e === 8585 || e >= 8592 && e <= 8601 || e === 8632 || e === 8633 || e === 8658 || e === 8660 || e === 8679 || e === 8704 || e === 8706 || e === 8707 || e === 8711 || e === 8712 || e === 8715 || e === 8719 || e === 8721 || e === 8725 || e === 8730 || e >= 8733 && e <= 8736 || e === 8739 || e === 8741 || e >= 8743 && e <= 8748 || e === 8750 || e >= 8756 && e <= 8759 || e === 8764 || e === 8765 || e === 8776 || e === 8780 || e === 8786 || e === 8800 || e === 8801 || e >= 8804 && e <= 8807 || e === 8810 || e === 8811 || e === 8814 || e === 8815 || e === 8834 || e === 8835 || e === 8838 || e === 8839 || e === 8853 || e === 8857 || e === 8869 || e === 8895 || e === 8978 || e >= 9312 && e <= 9449 || e >= 9451 && e <= 9547 || e >= 9552 && e <= 9587 || e >= 9600 && e <= 9615 || e >= 9618 && e <= 9621 || e === 9632 || e === 9633 || e >= 9635 && e <= 9641 || e === 9650 || e === 9651 || e === 9654 || e === 9655 || e === 9660 || e === 9661 || e === 9664 || e === 9665 || e >= 9670 && e <= 9672 || e === 9675 || e >= 9678 && e <= 9681 || e >= 9698 && e <= 9701 || e === 9711 || e === 9733 || e === 9734 || e === 9737 || e === 9742 || e === 9743 || e === 9756 || e === 9758 || e === 9792 || e === 9794 || e === 9824 || e === 9825 || e >= 9827 && e <= 9829 || e >= 9831 && e <= 9834 || e === 9836 || e === 9837 || e === 9839 || e === 9886 || e === 9887 || e === 9919 || e >= 9926 && e <= 9933 || e >= 9935 && e <= 9939 || e >= 9941 && e <= 9953 || e === 9955 || e === 9960 || e === 9961 || e >= 9963 && e <= 9969 || e === 9972 || e >= 9974 && e <= 9977 || e === 9979 || e === 9980 || e === 9982 || e === 9983 || e === 10045 || e >= 10102 && e <= 10111 || e >= 11094 && e <= 11097 || e >= 12872 && e <= 12879 || e >= 57344 && e <= 63743 || e >= 65024 && e <= 65039 || e === 65533 || e >= 127232 && e <= 127242 || e >= 127248 && e <= 127277 || e >= 127280 && e <= 127337 || e >= 127344 && e <= 127373 || e === 127375 || e === 127376 || e >= 127387 && e <= 127404 || e >= 917760 && e <= 917999 || e >= 983040 && e <= 1048573 || e >= 1048576 && e <= 1114109;
    }
    function ku(e) {
      return e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
    }
    function ju(e) {
      return e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9800 && e <= 9811 || e === 9855 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12771 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e === 94192 || e === 94193 || e >= 94208 && e <= 100343 || e >= 100352 && e <= 101589 || e >= 101632 && e <= 101640 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128727 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129672 || e >= 129680 && e <= 129725 || e >= 129727 && e <= 129733 || e >= 129742 && e <= 129755 || e >= 129760 && e <= 129768 || e >= 129776 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
    }
    function oD(e) {
      if (!Number.isSafeInteger(e)) throw new TypeError(`Expected a code point, got \`${typeof e}\`.`);
    }
    function ge(e, { ambiguousAsWide: u = false } = {}) {
      return oD(e), ku(e) || ju(e) || u && Nu(e) ? 2 : 1;
    }
    var Mu = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    var sD = new Intl.Segmenter();
    var FD = /^\p{Default_Ignorable_Code_Point}$/u;
    function j(e, u = {}) {
      if (typeof e != "string" || e.length === 0) return 0;
      let { ambiguousIsNarrow: t = true, countAnsiEscapeCodes: D = false } = u;
      if (D || (e = k(e)), e.length === 0) return 0;
      let n = 0, r = { ambiguousAsWide: !t };
      for (let { segment: o } of sD.segment(e)) {
        let i = o.codePointAt(0);
        if (!(i <= 31 || i >= 127 && i <= 159) && !(i >= 8203 && i <= 8207 || i === 65279) && !(i >= 768 && i <= 879 || i >= 6832 && i <= 6911 || i >= 7616 && i <= 7679 || i >= 8400 && i <= 8447 || i >= 65056 && i <= 65071) && !(i >= 55296 && i <= 57343) && !(i >= 65024 && i <= 65039) && !FD.test(o)) {
          if (Mu().test(o)) {
            n += 2;
            continue;
          }
          n += ge(i, r);
        }
      }
      return n;
    }
    var Gu = (e = 0) => (u) => `\x1B[${u + e}m`;
    var Wu = (e = 0) => (u) => `\x1B[${38 + e};5;${u}m`;
    var Uu = (e = 0) => (u, t, D) => `\x1B[${38 + e};2;${u};${t};${D}m`;
    var h = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    var ui = Object.keys(h.modifier);
    var lD = Object.keys(h.color);
    var aD = Object.keys(h.bgColor);
    var ti = [...lD, ...aD];
    function cD() {
      let e = /* @__PURE__ */ new Map();
      for (let [u, t] of Object.entries(h)) {
        for (let [D, n] of Object.entries(t)) h[D] = { open: `\x1B[${n[0]}m`, close: `\x1B[${n[1]}m` }, t[D] = h[D], e.set(n[0], n[1]);
        Object.defineProperty(h, u, { value: t, enumerable: false });
      }
      return Object.defineProperty(h, "codes", { value: e, enumerable: false }), h.color.close = "\x1B[39m", h.bgColor.close = "\x1B[49m", h.color.ansi = Gu(), h.color.ansi256 = Wu(), h.color.ansi16m = Uu(), h.bgColor.ansi = Gu(10), h.bgColor.ansi256 = Wu(10), h.bgColor.ansi16m = Uu(10), Object.defineProperties(h, { rgbToAnsi256: { value: (u, t, D) => u === t && t === D ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(D / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
        let t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
        if (!t) return [0, 0, 0];
        let [D] = t;
        D.length === 3 && (D = [...D].map((r) => r + r).join(""));
        let n = Number.parseInt(D, 16);
        return [n >> 16 & 255, n >> 8 & 255, n & 255];
      }, enumerable: false }, hexToAnsi256: { value: (u) => h.rgbToAnsi256(...h.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
        if (u < 8) return 30 + u;
        if (u < 16) return 90 + (u - 8);
        let t, D, n;
        if (u >= 232) t = ((u - 232) * 10 + 8) / 255, D = t, n = t;
        else {
          u -= 16;
          let i = u % 36;
          t = Math.floor(u / 36) / 5, D = Math.floor(i / 6) / 5, n = i % 6 / 5;
        }
        let r = Math.max(t, D, n) * 2;
        if (r === 0) return 30;
        let o = 30 + (Math.round(n) << 2 | Math.round(D) << 1 | Math.round(t));
        return r === 2 && (o += 60), o;
      }, enumerable: false }, rgbToAnsi: { value: (u, t, D) => h.ansi256ToAnsi(h.rgbToAnsi256(u, t, D)), enumerable: false }, hexToAnsi: { value: (u) => h.ansi256ToAnsi(h.hexToAnsi256(u)), enumerable: false } }), h;
    }
    var fD = cD();
    var b = fD;
    var de = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
    var CD = 39;
    var Ke = "\x07";
    var Yu = "[";
    var ED = "]";
    var Vu = "m";
    var he = `${ED}8;;`;
    var Hu = (e) => `${de.values().next().value}${Yu}${e}${Vu}`;
    var zu = (e) => `${de.values().next().value}${he}${e}${Ke}`;
    var pD = (e) => e.split(" ").map((u) => j(u));
    var Ve = (e, u, t) => {
      let D = [...u], n = false, r = false, o = j(k(e.at(-1)));
      for (let [i, s] of D.entries()) {
        let E = j(s);
        if (o + E <= t ? e[e.length - 1] += s : (e.push(s), o = 0), de.has(s) && (n = true, r = D.slice(i + 1, i + 1 + he.length).join("") === he), n) {
          r ? s === Ke && (n = false, r = false) : s === Vu && (n = false);
          continue;
        }
        o += E, o === t && i < D.length - 1 && (e.push(""), o = 0);
      }
      !o && e.at(-1).length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
    };
    var gD = (e) => {
      let u = e.split(" "), t = u.length;
      for (; t > 0 && !(j(u[t - 1]) > 0); ) t--;
      return t === u.length ? e : u.slice(0, t).join(" ") + u.slice(t).join("");
    };
    var hD = (e, u, t = {}) => {
      if (t.trim !== false && e.trim() === "") return "";
      let D = "", n, r, o = pD(e), i = [""];
      for (let [f, d] of e.split(" ").entries()) {
        t.trim !== false && (i[i.length - 1] = i.at(-1).trimStart());
        let p = j(i.at(-1));
        if (f !== 0 && (p >= u && (t.wordWrap === false || t.trim === false) && (i.push(""), p = 0), (p > 0 || t.trim === false) && (i[i.length - 1] += " ", p++)), t.hard && o[f] > u) {
          let B = u - p, A = 1 + Math.floor((o[f] - B - 1) / u);
          Math.floor((o[f] - 1) / u) < A && i.push(""), Ve(i, d, u);
          continue;
        }
        if (p + o[f] > u && p > 0 && o[f] > 0) {
          if (t.wordWrap === false && p < u) {
            Ve(i, d, u);
            continue;
          }
          i.push("");
        }
        if (p + o[f] > u && t.wordWrap === false) {
          Ve(i, d, u);
          continue;
        }
        i[i.length - 1] += d;
      }
      t.trim !== false && (i = i.map((f) => gD(f)));
      let s = i.join(`
`), E = [...s], a = 0;
      for (let [f, d] of E.entries()) {
        if (D += d, de.has(d)) {
          let { groups: B } = new RegExp(`(?:\\${Yu}(?<code>\\d+)m|\\${he}(?<uri>.*)${Ke})`).exec(s.slice(a)) || { groups: {} };
          if (B.code !== void 0) {
            let A = Number.parseFloat(B.code);
            n = A === CD ? void 0 : A;
          } else B.uri !== void 0 && (r = B.uri.length === 0 ? void 0 : B.uri);
        }
        let p = b.codes.get(Number(n));
        E[f + 1] === `
` ? (r && (D += zu("")), n && p && (D += Hu(p))) : d === `
` && (n && p && (D += Hu(n)), r && (D += zu(r))), a += d.length;
      }
      return D;
    };
    function _(e, u, t) {
      return String(e).normalize().replaceAll(`\r
`, `
`).split(`
`).map((D) => hD(D, u, t)).join(`
`);
    }
    function Je(e) {
      if (typeof e != "string") throw new TypeError("Expected a string");
      return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    var Ku = W(__require("os"), 1);
    var dD = () => Ku.default.homedir().replace(/\\/g, "/");
    var Ju = dD;
    var qu = /\s+at.*[(\s](.*)\)?/;
    var Zu = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
    function te(e, { pretty: u = false, basePath: t, pathFilter: D } = {}) {
      let n = t && new RegExp(`(file://)?${Je(t.replace(/\\/g, "/"))}/?`, "g"), r = u ? Ju() : "";
      if (typeof e == "string") return e.replace(/\\/g, "/").split(`
`).filter((o) => {
        let i = o.match(qu);
        if (i === null || !i[1]) return true;
        let s = i[1];
        return s.includes(".app/Contents/Resources/electron.asar") || s.includes(".app/Contents/Resources/default_app.asar") || s.includes("node_modules/electron/dist/resources/electron.asar") || s.includes("node_modules/electron/dist/resources/default_app.asar") ? false : D ? !Zu.test(s) && D(s) : !Zu.test(s);
      }).filter((o) => o.trim() !== "").map((o) => (n && (o = o.replace(n, "")), u && (o = o.replace(qu, (i, s) => i.replace(s, s.replace(r, "~")))), o)).join(`
`);
    }
    function Be(e) {
      return Buffer.isBuffer(e) ? e.toString() : Array.isArray(e) || typeof e == "object" ? JSON.stringify(e) : typeof e == "boolean" || typeof e == "number" ? `${e}` : typeof e == "string" ? e : String(e);
    }
    function M(...e) {
      return Array.isArray(e[0]) ? e[0].join("") : e.join("");
    }
    function qe(e, u = null) {
      let t = 0;
      if (Array.isArray(e)) for (let D of e) u ? D[u].length > t && (t = D[u].length) : D.length > t && (t = D.length);
      else for (let D in e) D.length > t && (t = D.length);
      return t = t + 1, function(n) {
        let r = typeof n == "string" ? t - n.length : t - n;
        return r < 1 ? " " : " ".repeat(r);
      };
    }
    function me() {
      let e = /* @__PURE__ */ new Date(), u = e.getHours(), t = e.getMinutes(), D = e.getSeconds();
      return (u < 10 ? `0${u}` : u) + S + (t < 10 ? `0${t}` : t) + S + (D < 10 ? `0${D}` : D);
    }
    function BD() {
      let e = /* @__PURE__ */ new Date(), u = e.getDate(), t = e.getMonth() + 1, D = e.getFullYear(), n = e.getHours(), r = e.getMinutes(), o = e.getSeconds();
      return (u < 10 ? `0${u + 1}` : `${u + 1}`) + pe + (t < 10 ? `0${t}` : t) + pe + D + " " + (n < 10 ? `0${n}` : n) + S + (r < 10 ? `0${r}` : r) + S + (o < 10 ? `0${o}` : o);
    }
    var F = { open: `${c19.open}\u250C\u2500${c19.close} `, stub: `${c19.open}\u251C${c19.close}  `, dash: `${c19.open}\u251C\u2500${c19.close} `, trim: `${c19.open}\u2502${c19.close}`, line: `${c19.open}\u2502${c19.close}  `, next: `
${c19.open}\u2502${c19.close}`, after: `${c19.open}\u2502${c19.close}
`, wrap: `
${c19.open}\u2502${c19.close}
`, base: `${c19.open}\u2514\u2500${c19.close} `, red: `${x.dim.open}\u2502${x.dim.close}  `, redTrim: `${x.dim.open}\u2502${x.dim.close}`, yellow: `${w.dim.open}\u2502${w.dim.close}  `, yellowTrim: `${w.dim.open}\u2502${w.dim.close}`, indent: { edge: `${c19.open}\u251C\u2500\u2500\u252C\u2500${c19.close} `, fall: `${c19.open}\u251C\u2500\u2500\u2510${c19.close} `, line: `${c19.open}\u2502  \u2502${c19.close} `, stub: `${c19.open}\u2502  \u251C${c19.close} `, dash: `${c19.open}\u2502  \u251C\u2500${c19.close} `, base: `${c19.open}\u2502  \u2514\u2500${c19.close} ` } };
    function Qe(e, ...u) {
      let t = e.length > 9 ? "  " : " ".repeat(11 - e.length), D = u.length > 0 ? u.length === 1 ? N + "  " + u[0] : u.length === 2 ? N + "  " + u[0] + " " + N + " " + u[1] : N + "  " + u[0] + " " + N + " " + u[1] + " " + Xu(u[2]) : "";
      return e + t + D;
    }
    function Xu(e) {
      return e ? ue + " " + Q.gray(e) : "";
    }
    function mD(e, u, { spaced: t = false } = {}) {
      let D = t ? " " : "";
      switch (e) {
        case "AN":
          return He + D + u + D + ze;
        case "CB":
          return Me + D + u + D + Ge;
        case "PR":
          return ke + D + u + D + je;
        case "SB":
          return We + D + u + D + Ue;
      }
    }
    var Qu = { warning: w(` ${ue} Type ${$2("w")} and press ${$2("enter")} to view`), error: x(` ${ue} Type ${$2("v")} and press ${$2("enter")} to view`), stack: l(`Type ${$2("s")} and press ${$2("enter")} to view stack trace`) };
    var AD = (e = void 0, u = true) => {
      e === void 0 && (e = ee().wrap);
      let t = "\u251C" + "\u2500".repeat(e - 10);
      return u ? `${c19.open}
${t}
\u2502${c19.close}` : `${c19.open}${t}${c19.close}`;
    };
    var et = (e) => F.open + Q.gray(`${e} ~ ${me()}`);
    var xD = (...e) => {
      let u = { color: null, line: F.line }, t, D = "";
      for (Array.isArray(e[0]) ? (typeof e[1] == "object" && Object.assign(u, e[1]), t = e[0]) : (typeof e[e.length - 1] == "object" && Object.assign(u, e.pop()), t = e); t.length !== 0; ) {
        let n = t.shift().trim();
        n.length > 0 ? D += u.line + (u.color ? u.color(n) : n) + `
` : D += u.line + `
`;
      }
      return D.slice(0, -1);
    };
    var Ze = (...e) => {
      let u = { color: null, line: F.line }, t = ee().wrap, D, n = "";
      for (Array.isArray(e[0]) ? (typeof e[1] == "object" && Object.assign(u, e[1]), D = _(e[0].join(" "), t).split(`
`)) : (typeof e[e.length - 1] == "object" && Object.assign(u, e.pop()), D = _(e.join(" "), t).split(`
`)); D.length !== 0; ) {
        let r = D.shift().trim();
        r.length > 0 ? n += u.line + (u.color ? u.color(r) : r) + `
` : n += u.line + `
`;
      }
      return n.trimEnd();
    };
    var Ae = (e) => F.trim + `
` + F.line + e + `
` + F.trim;
    function bD(e) {
      return F.redTrim + `
` + F.red + x(e) + `
` + F.redTrim;
    }
    function yD(e) {
      return F.yellowTrim + `
` + F.yellow + w(e) + `
` + F.yellowTrim;
    }
    function wD(e) {
      return F.line + e;
    }
    function $D(e) {
      return F.red + e;
    }
    function SD(e) {
      return F.yellow + e;
    }
    function TD(e) {
      return F.trim + `
` + F.line + e;
    }
    function vD(e) {
      return F.line + e + `
` + F.line;
    }
    function OD(e) {
      return F.dash + e;
    }
    function ut(e) {
      return F.base + Q.gray(`${e} ~ ${me()}`) + `
`;
    }
    function RD(e) {
      return F.indent.line + e;
    }
    function ID(e) {
      return F.indent.dash + e;
    }
    function _D(e) {
      return F.indent.base + e + `
` + F.trim;
    }
    function tt(e) {
      let u = qe(e.entries), t = Dt({ type: e.type || "error" });
      if (typeof e.stack == "string") {
        let D = e.cleanStack ? te(e.stack, { pretty: true }) : e.stack;
        t.Wrap(D.split(`
`), l).NL.Newline();
      }
      for (let D in e.entries) {
        if (e.entries[D] === void 0) continue;
        let n;
        if (typeof e.entries[D] == "number") {
          if (isNaN(e.entries[D])) continue;
          n = Ne(Be(e.entries[D]));
        } else n = Be(e.entries[D]);
        if (n.length === 0) continue;
        let r = e.type === "warning" ? Z(D) : U(D);
        D === "source" || D === "output" || D === "input" || D === "file" ? t.Line(r + S + " " + u(D) + Le(n), l) : t.Line(r + S + " " + u(D) + n, l);
      }
      return e.stack === true && t.NL.Line(Qu.stack), t.toString();
    }
    var Xe = class {
      type = "info";
      line;
      trim;
      text;
      constructor(u) {
        typeof u == "object" ? (this.type = "type" in u ? u.type : "info", this.text = "text" in u ? u.text : [], this.type === "error" ? (this.line = F.red, this.trim = F.redTrim) : this.type === "warning" ? (this.line = F.yellow, this.trim = F.yellowTrim) : this.type === "nil" ? (this.line = "", this.trim = "") : (this.line = F.line, this.trim = F.trim)) : (this.line = F.line, this.trim = F.trim, this.text = []);
      }
      toRaw() {
        return this.text;
      }
      toLine(u) {
        if (this.text.length === 0) return "";
        this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
        let t;
        return u ? t = u(M(this.text)) : this.type === "info" ? t = fe(M(this.text)) : this.type === "error" ? t = x(M(this.text)) : this.type === "warning" ? t = Z(M(this.text)) : t = M(this.text), this.text = [], t + `
` + this.trim;
      }
      toString(u) {
        if (this.text.length === 0) return "";
        this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();
        let t;
        return u ? t = u(this.text.join("")) : this.type === "info" ? t = fe(this.text.join("")) : this.type === "error" ? t = x(this.text.join("")) : this.type === "warning" ? t = Z(this.text.join("")) : t = this.text.join(""), this.text = [], t;
      }
      Get(u = this.text.length - 1) {
        return this.text[u];
      }
      Remove(u) {
        return this.text.splice(u, 1), this;
      }
      Replace(u, t, D) {
        return this.text[u] && (this.text[u] = this.line + (D ? D(t) : t) + `
`), this;
      }
      Ruler(u = void 0) {
        return u === void 0 && (u = ee().wrap), this.text.push(F.trim + `
` + c19(`\u251C${"\u2500".repeat(u)}`) + `
` + F.trim + `
`), this;
      }
      get NL() {
        return this.text.push(this.trim + `
`), this;
      }
      get BR() {
        return this.text.push(`
`), this;
      }
      Pop() {
        return this.text.pop(), this;
      }
      Newline(u, t) {
        if (typeof u == "number") {
          let D = this.trim + `
`;
          t && (t === "yellow" ? D = F.yellowTrim + `
` : t === "red" ? D = F.redTrim + `
` : t === "" && (D = `
`));
          for (let n = 0; n < u; n++) this.text.push(D);
        } else u === "" ? this.text.push(`
`) : u === "line" ? this.text.push(F.trim + `
`) : u === "yellow" ? this.text.push(F.yellowTrim + `
`) : u === "red" ? this.text.push(F.redTrim + `
`) : this.text.push(this.trim + `
`);
        return this;
      }
      Inline(u, t) {
        let D = this.text.length;
        return D > 0 ? this.text[D - 1] = this.text[D - 1].trimEnd() + " " + (t ? t(u) : u) + `
` : this.text.push(this.line + (t ? t(u) : u) + `
`), this;
      }
      Trim(u, t) {
        return this.text.push(this.line + (t ? t(u) : u) + `
`), this;
      }
      Insert(u, t) {
        return this.text.push(t ? t(u) : u), this;
      }
      Line(u, t) {
        return this.type === "error" ? this.Error(u, t) : this.type === "warning" ? this.Warn(u, t) : (this.text.push(this.line + (t ? t(u) : u) + `
`), this);
      }
      Error(u, t) {
        return this.text.push(F.red + (t ? t(u) : x(u)) + `
`), this;
      }
      Warn(u, t) {
        return this.text.push(F.yellow + (t ? t(u) : w(u)) + `
`), this;
      }
      Break(u, t) {
        return this.text.push(this.trim + `
` + this.line + (t ? t(u) : u) + `
` + this.trim + `
`), this;
      }
      Top(u) {
        return this.text.push(et(u) + `
`), this;
      }
      End(u) {
        return this.text.push(ut(u)), this;
      }
      Context(u) {
        return this.text.push(tt(u) + `
`), this;
      }
      Dash(u, t) {
        return this.text.push(F.dash + (t ? t(u) : u) + `
`), this;
      }
      Multiline(u) {
        let t = Array.isArray(u) ? u : u.split(`
`);
        for (; t.length !== 0; ) this.text.push(this.line + t.shift() + `
`);
        return this;
      }
      Wrap(...u) {
        let t = { line: this.line };
        return this.type === "error" ? t.color = x : this.type === "warning" ? t.color = w : t.color = X, Array.isArray(u[0]) ? (typeof u[1] == "function" && (t.color = u.pop()), this.text.push(Ze(u[0], t) + `
`)) : (typeof u[u.length - 1] == "function" && (t.color = u.pop()), this.text.push(Ze(u, t) + `
`)), this;
      }
    };
    function Dt(e = void 0) {
      return e === void 0 ? e = { type: "", tree: true } : Object.assign({ type: "", tree: true }, e), new Xe(e);
    }
    function LD(e, u = {}) {
      let t = Object.assign({ showPercentage: true, barColor: "neonGreen", percentColor: "whiteBright", barSize: 40, clearOnComplete: false }, u), D = 0, n = (a) => F.line + a + " ".repeat(Math.max(0, t.barSize - a.length)), r = (a, f = false) => (f ? "\u25B1" : "\u25B0").repeat(a), o = () => {
        t.clearOnComplete && console.clear();
      };
      return { stop: o, increment: (a = 1) => {
        let f = D + a;
        D = Math.min(f, e), D === e && o();
      }, decrement: (a = 1) => {
        let f = D - a;
        D = Math.max(f, 0);
      }, render: (a) => {
        let f = Math.round(D / e * t.barSize), d = r(f), p = r(t.barSize - f, true), B = y.default[t.barColor](d) + c19(p);
        return t.showPercentage && (B += (a || X)(` ${String(Math.round(D / e * 100))}%`)), n(B);
      }, get percent() {
        return D;
      } };
    }
    var Eu = W(__require("process"), 1);
    var ie = {};
    gu(ie, { beep: () => sn, clearScreen: () => Dn, clearTerminal: () => nn, cursorBackward: () => WD, cursorDown: () => MD, cursorForward: () => GD, cursorGetPosition: () => zD, cursorHide: () => KD, cursorLeft: () => it, cursorMove: () => jD, cursorNextLine: () => YD, cursorPrevLine: () => VD, cursorRestorePosition: () => HD, cursorSavePosition: () => UD, cursorShow: () => JD, cursorTo: () => kD, cursorUp: () => rt, enterAlternativeScreen: () => rn, eraseDown: () => QD, eraseEndLine: () => ZD, eraseLine: () => ot, eraseLines: () => qD, eraseScreen: () => eu, eraseStartLine: () => XD, eraseUp: () => en, exitAlternativeScreen: () => on, iTerm: () => an, image: () => ln, link: () => Fn, scrollDown: () => tn, scrollUp: () => un });
    var be = W(__require("process"), 1);
    var xe = globalThis.window?.document !== void 0;
    var Si = globalThis.process?.versions?.node !== void 0;
    var Ti = globalThis.process?.versions?.bun !== void 0;
    var vi = globalThis.Deno?.version?.deno !== void 0;
    var Oi = globalThis.process?.versions?.electron !== void 0;
    var Ri = globalThis.navigator?.userAgent?.includes("jsdom") === true;
    var Ii = typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
    var _i = typeof DedicatedWorkerGlobalScope < "u" && globalThis instanceof DedicatedWorkerGlobalScope;
    var Li = typeof SharedWorkerGlobalScope < "u" && globalThis instanceof SharedWorkerGlobalScope;
    var Pi = typeof ServiceWorkerGlobalScope < "u" && globalThis instanceof ServiceWorkerGlobalScope;
    var De = globalThis.navigator?.userAgentData?.platform;
    var Ni = De === "macOS" || globalThis.navigator?.platform === "MacIntel" || globalThis.navigator?.userAgent?.includes(" Mac ") === true || globalThis.process?.platform === "darwin";
    var ki = De === "Windows" || globalThis.navigator?.platform === "Win32" || globalThis.process?.platform === "win32";
    var ji = De === "Linux" || globalThis.navigator?.platform?.startsWith("Linux") === true || globalThis.navigator?.userAgent?.includes(" Linux ") === true || globalThis.process?.platform === "linux";
    var Mi = De === "iOS" || globalThis.navigator?.platform === "MacIntel" && globalThis.navigator?.maxTouchPoints > 1 || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform);
    var Gi = De === "Android" || globalThis.navigator?.platform === "Android" || globalThis.navigator?.userAgent?.includes(" Android ") === true || globalThis.process?.platform === "android";
    var C = "\x1B[";
    var re = "\x1B]";
    var z = "\x07";
    var ne = ";";
    var nt = !xe && be.default.env.TERM_PROGRAM === "Apple_Terminal";
    var PD = !xe && be.default.platform === "win32";
    var ND = xe ? () => {
      throw new Error("`process.cwd()` only works in Node.js, not the browser.");
    } : be.default.cwd;
    var kD = (e, u) => {
      if (typeof e != "number") throw new TypeError("The `x` argument is required");
      return typeof u != "number" ? C + (e + 1) + "G" : C + (u + 1) + ne + (e + 1) + "H";
    };
    var jD = (e, u) => {
      if (typeof e != "number") throw new TypeError("The `x` argument is required");
      let t = "";
      return e < 0 ? t += C + -e + "D" : e > 0 && (t += C + e + "C"), u < 0 ? t += C + -u + "A" : u > 0 && (t += C + u + "B"), t;
    };
    var rt = (e = 1) => C + e + "A";
    var MD = (e = 1) => C + e + "B";
    var GD = (e = 1) => C + e + "C";
    var WD = (e = 1) => C + e + "D";
    var it = C + "G";
    var UD = nt ? "\x1B7" : C + "s";
    var HD = nt ? "\x1B8" : C + "u";
    var zD = C + "6n";
    var YD = C + "E";
    var VD = C + "F";
    var KD = C + "?25l";
    var JD = C + "?25h";
    var qD = (e) => {
      let u = "";
      for (let t = 0; t < e; t++) u += ot + (t < e - 1 ? rt() : "");
      return e && (u += it), u;
    };
    var ZD = C + "K";
    var XD = C + "1K";
    var ot = C + "2K";
    var QD = C + "J";
    var en = C + "1J";
    var eu = C + "2J";
    var un = C + "S";
    var tn = C + "T";
    var Dn = "\x1Bc";
    var nn = PD ? `${eu}${C}0f` : `${eu}${C}3J${C}H`;
    var rn = C + "?1049h";
    var on = C + "?1049l";
    var sn = z;
    var Fn = (e, u) => [re, "8", ne, ne, u, z, e, re, "8", ne, ne, z].join("");
    var ln = (e, u = {}) => {
      let t = `${re}1337;File=inline=1`;
      return u.width && (t += `;width=${u.width}`), u.height && (t += `;height=${u.height}`), u.preserveAspectRatio === false && (t += ";preserveAspectRatio=0"), t + ":" + Buffer.from(e).toString("base64") + z;
    };
    var an = { setCwd: (e = ND()) => `${re}50;CurrentDir=${e}${z}`, annotation(e, u = {}) {
      let t = `${re}1337;`, D = u.x !== void 0, n = u.y !== void 0;
      if ((D || n) && !(D && n && u.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
      return e = e.replaceAll("|", ""), t += u.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", u.length > 0 ? t += (D ? [e, u.length, u.x, u.y] : [u.length, e]).join("|") : t += e, t + z;
    } };
    var su = W(__require("process"), 1);
    var oe = W(__require("process"), 1);
    var cn = (e, u, t, D) => {
      if (t === "length" || t === "prototype" || t === "arguments" || t === "caller") return;
      let n = Object.getOwnPropertyDescriptor(e, t), r = Object.getOwnPropertyDescriptor(u, t);
      !fn(n, r) && D || Object.defineProperty(e, t, r);
    };
    var fn = function(e, u) {
      return e === void 0 || e.configurable || e.writable === u.writable && e.enumerable === u.enumerable && e.configurable === u.configurable && (e.writable || e.value === u.value);
    };
    var Cn = (e, u) => {
      let t = Object.getPrototypeOf(u);
      t !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, t);
    };
    var En = (e, u) => `/* Wrapped ${e}*/
${u}`;
    var pn = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
    var gn = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
    var hn = (e, u, t) => {
      let D = t === "" ? "" : `with ${t.trim()}() `, n = En.bind(null, D, u.toString());
      Object.defineProperty(n, "name", gn);
      let { writable: r, enumerable: o, configurable: i } = pn;
      Object.defineProperty(e, "toString", { value: n, writable: r, enumerable: o, configurable: i });
    };
    function uu(e, u, { ignoreNonConfigurable: t = false } = {}) {
      let { name: D } = e;
      for (let n of Reflect.ownKeys(u)) cn(e, u, n, t);
      return Cn(e, u), hn(e, u, D), e;
    }
    var ye = /* @__PURE__ */ new WeakMap();
    var st = (e, u = {}) => {
      if (typeof e != "function") throw new TypeError("Expected a function");
      let t, D = 0, n = e.displayName || e.name || "<anonymous>", r = function(...o) {
        if (ye.set(r, ++D), D === 1) t = e.apply(this, o), e = void 0;
        else if (u.throw === true) throw new Error(`Function \`${n}\` can only be called once`);
        return t;
      };
      return uu(r, e), ye.set(r, D), r;
    };
    st.callCount = (e) => {
      if (!ye.has(e)) throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
      return ye.get(e);
    };
    var Ft = st;
    var G = [];
    G.push("SIGHUP", "SIGINT", "SIGTERM");
    process.platform !== "win32" && G.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
    process.platform === "linux" && G.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    var we = (e) => !!e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
    var tu = Symbol.for("signal-exit emitter");
    var Du = globalThis;
    var dn = Object.defineProperty.bind(Object);
    var nu = class {
      emitted = { afterExit: false, exit: false };
      listeners = { afterExit: [], exit: [] };
      count = 0;
      id = Math.random();
      constructor() {
        if (Du[tu]) return Du[tu];
        dn(Du, tu, { value: this, writable: false, enumerable: false, configurable: false });
      }
      on(u, t) {
        this.listeners[u].push(t);
      }
      removeListener(u, t) {
        let D = this.listeners[u], n = D.indexOf(t);
        n !== -1 && (n === 0 && D.length === 1 ? D.length = 0 : D.splice(n, 1));
      }
      emit(u, t, D) {
        if (this.emitted[u]) return false;
        this.emitted[u] = true;
        let n = false;
        for (let r of this.listeners[u]) n = r(t, D) === true || n;
        return u === "exit" && (n = this.emit("afterExit", t, D) || n), n;
      }
    };
    var $e = class {
    };
    var Bn = (e) => ({ onExit(u, t) {
      return e.onExit(u, t);
    }, load() {
      return e.load();
    }, unload() {
      return e.unload();
    } });
    var ru = class extends $e {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    var iu = class extends $e {
      #i = ou.platform === "win32" ? "SIGINT" : "SIGHUP";
      #u = new nu();
      #e;
      #n;
      #r;
      #D = {};
      #t = false;
      constructor(u) {
        super(), this.#e = u, this.#D = {};
        for (let t of G) this.#D[t] = () => {
          let D = this.#e.listeners(t), { count: n } = this.#u, r = u;
          if (typeof r.__signal_exit_emitter__ == "object" && typeof r.__signal_exit_emitter__.count == "number" && (n += r.__signal_exit_emitter__.count), D.length === n) {
            this.unload();
            let o = this.#u.emit("exit", null, t), i = t === "SIGHUP" ? this.#i : t;
            o || u.kill(u.pid, i);
          }
        };
        this.#r = u.reallyExit, this.#n = u.emit;
      }
      onExit(u, t) {
        if (!we(this.#e)) return () => {
        };
        this.#t === false && this.load();
        let D = t?.alwaysLast ? "afterExit" : "exit";
        return this.#u.on(D, u), () => {
          this.#u.removeListener(D, u), this.#u.listeners.exit.length === 0 && this.#u.listeners.afterExit.length === 0 && this.unload();
        };
      }
      load() {
        if (!this.#t) {
          this.#t = true, this.#u.count += 1;
          for (let u of G) try {
            let t = this.#D[u];
            t && this.#e.on(u, t);
          } catch {
          }
          this.#e.emit = (u, ...t) => this.#s(u, ...t), this.#e.reallyExit = (u) => this.#o(u);
        }
      }
      unload() {
        this.#t && (this.#t = false, G.forEach((u) => {
          let t = this.#D[u];
          if (!t) throw new Error("Listener not defined for signal: " + u);
          try {
            this.#e.removeListener(u, t);
          } catch {
          }
        }), this.#e.emit = this.#n, this.#e.reallyExit = this.#r, this.#u.count -= 1);
      }
      #o(u) {
        return we(this.#e) ? (this.#e.exitCode = u || 0, this.#u.emit("exit", this.#e.exitCode, null), this.#r.call(this.#e, this.#e.exitCode)) : 0;
      }
      #s(u, ...t) {
        let D = this.#n;
        if (u === "exit" && we(this.#e)) {
          typeof t[0] == "number" && (this.#e.exitCode = t[0]);
          let n = D.call(this.#e, u, ...t);
          return this.#u.emit("exit", this.#e.exitCode, null), n;
        } else return D.call(this.#e, u, ...t);
      }
    };
    var ou = globalThis.process;
    var { onExit: lt, load: Zi, unload: Xi } = Bn(we(ou) ? new iu(ou) : new ru());
    var at = oe.default.stderr.isTTY ? oe.default.stderr : oe.default.stdout.isTTY ? oe.default.stdout : void 0;
    var mn = at ? Ft(() => {
      lt(() => {
        at.write("\x1B[?25h");
      }, { alwaysLast: true });
    }) : () => {
    };
    var ct = mn;
    var Se = false;
    var Y = {};
    Y.show = (e = su.default.stderr) => {
      e.isTTY && (Se = false, e.write("\x1B[?25h"));
    };
    Y.hide = (e = su.default.stderr) => {
      e.isTTY && (ct(), Se = true, e.write("\x1B[?25l"));
    };
    Y.toggle = (e, u) => {
      e !== void 0 && (Se = e), Se ? Y.show(u) : Y.hide(u);
    };
    var Fu = Y;
    function lu(e) {
      return Number.isInteger(e) ? ge(e) === 2 : false;
    }
    var An = /* @__PURE__ */ new Set([27, 155]);
    var xn = "0".codePointAt(0);
    var bn = "9".codePointAt(0);
    var cu = /* @__PURE__ */ new Set();
    var au = /* @__PURE__ */ new Map();
    for (let [e, u] of b.codes) cu.add(b.color.ansi(u)), au.set(b.color.ansi(e), b.color.ansi(u));
    function yn(e) {
      if (cu.has(e)) return e;
      if (au.has(e)) return au.get(e);
      e = e.slice(2), e.includes(";") && (e = e[0] + "0");
      let u = b.codes.get(Number.parseInt(e, 10));
      return u ? b.color.ansi(u) : b.reset.open;
    }
    function wn(e) {
      for (let u = 0; u < e.length; u++) {
        let t = e.codePointAt(u);
        if (t >= xn && t <= bn) return u;
      }
      return -1;
    }
    function $n(e, u) {
      e = e.slice(u, u + 19);
      let t = wn(e);
      if (t !== -1) {
        let D = e.indexOf("m", t);
        return D === -1 && (D = e.length), e.slice(0, D + 1);
      }
    }
    function Sn(e, u = Number.POSITIVE_INFINITY) {
      let t = [], D = 0, n = 0;
      for (; D < e.length; ) {
        let r = e.codePointAt(D);
        if (An.has(r)) {
          let s = $n(e, D);
          if (s) {
            t.push({ type: "ansi", code: s, endCode: yn(s) }), D += s.length;
            continue;
          }
        }
        let o = lu(r), i = String.fromCodePoint(r);
        if (t.push({ type: "character", value: i, isFullWidth: o }), D += i.length, n += o ? 2 : i.length, n >= u) break;
      }
      return t;
    }
    function ft(e) {
      let u = [];
      for (let t of e) t.code === b.reset.open ? u = [] : cu.has(t.code) ? u = u.filter((D) => D.endCode !== t.code) : (u = u.filter((D) => D.endCode !== t.endCode), u.push(t));
      return u;
    }
    function Tn(e) {
      return ft(e).map(({ endCode: D }) => D).reverse().join("");
    }
    function fu(e, u, t) {
      let D = Sn(e, t), n = [], r = 0, o = "", i = false;
      for (let s of D) {
        if (t !== void 0 && r >= t) break;
        s.type === "ansi" ? (n.push(s), i && (o += s.code)) : (!i && r >= u && (i = true, n = ft(n), o = n.map(({ code: E }) => E).join("")), i && (o += s.value), r += s.isFullWidth ? 2 : s.value.length);
      }
      return o += Tn(n), o;
    }
    var vn = 24;
    var Cu = ({ columns: e = 80 }) => e;
    var On = (e, u) => {
      let t = e.rows ?? vn, D = u.split(`
`), n = Math.max(0, D.length - t);
      return n ? fu(u, k(D.slice(0, n).join(`
`)).length + 1) : u;
    };
    function Ct(e, { showCursor: u = false } = {}) {
      let t = 0, D = Cu(e), n = "", r = () => {
        n = "", D = Cu(e), t = 0;
      }, o = (...i) => {
        u || Fu.hide();
        let s = On(e, i.join(" ") + `
`), E = Cu(e);
        s === n && D === E || (n = s, D = E, s = _(s, E, { trim: false, hard: true, wordWrap: false }), e.write(ie.eraseLines(t) + s), t = s.split(`
`).length);
      };
      return o.clear = () => {
        e.write(ie.eraseLines(t)), r();
      }, o.done = () => {
        r(), u || Fu.show();
      }, o;
    }
    var Rn = Ct(Eu.default.stdout);
    var L = Rn;
    var Eo = Ct(Eu.default.stderr);
    function In() {
      let e, u = false, t = "", D = true, n = { arrows: { interval: 120, frames: ["\u25B9\u25B9\u25B9\u25B9", "\u25B8\u25B9\u25B9\u25B9", "\u25B9\u25B8\u25B9\u25B9", "\u25B9\u25B9\u25B8\u25B9", "\u25B9\u25B9\u25B9\u25B8"] }, brielle: { interval: 50, frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"] }, spinning: { interval: 60, frames: ["\u25D0", "\u25D3", "\u25D1", "\u25D2"] } }, r = { label: "", line: true, color: null, style: "spinning", action: null }, o = function(s, E) {
        let a = { ...r };
        typeof s == "object" ? a = Object.assign(a, s) : typeof s == "string" && (a.label = s, typeof E == "object" && (a = Object.assign(a, E))), u = true, D = a.line;
        let f, d = 0, p, B = 0;
        a.action !== null ? (a.style = "arrows", f = "color" in a.action ? a.action.color : H, p = n.arrows.frames, B = p.length) : (f = typeof a.color == "function" ? a.color : Pe, t = a.label, p = n[a.style].frames, B = p.length), L.done(), e = setInterval(() => {
          if (!u) return;
          let A;
          if (a.action !== null) {
            let T = $2(a.action.before) + " " + p[d = ++d % B] + " " + a.action.after;
            A = f(t !== "" ? Qe(t, T) : T);
          } else A = f(p[d = ++d % B] + " " + t);
          L(a.line ? Ae(A) : A);
        }, n[a.style].interval);
      };
      return o.update = function(i) {
        t = i;
      }, o.stop = function(i) {
        u !== false && (u = false, i ? (L(D ? Ae(i) : i), L.done()) : L.clear(), clearInterval(e), e = void 0, t = "");
      }, Object.defineProperty(o, "active", { get() {
        return u;
      } }), o;
    }
  }
});

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var has4 = Object.prototype.hasOwnProperty;
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
    function EventEmitter4() {
      this._events = new Events2();
      this._eventsCount = 0;
    }
    EventEmitter4.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has4.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter4.prototype.listeners = function listeners(event2) {
      var evt = prefix ? prefix + event2 : event2, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter4.prototype.listenerCount = function listenerCount(event2) {
      var evt = prefix ? prefix + event2 : event2, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter4.prototype.emit = function emit(event2, a1, a2, a3, a4, a5) {
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
    EventEmitter4.prototype.on = function on(event2, fn, context) {
      return addListener(this, event2, fn, context, false);
    };
    EventEmitter4.prototype.once = function once(event2, fn, context) {
      return addListener(this, event2, fn, context, true);
    };
    EventEmitter4.prototype.removeListener = function removeListener(event2, fn, context, once) {
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
    EventEmitter4.prototype.removeAllListeners = function removeAllListeners(event2) {
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
    EventEmitter4.prototype.off = EventEmitter4.prototype.removeListener;
    EventEmitter4.prototype.addListener = EventEmitter4.prototype.on;
    EventEmitter4.prefixed = prefix;
    EventEmitter4.EventEmitter = EventEmitter4;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter4;
    }
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var path4 = __require("path");
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
      SEP: path4.sep,
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
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    init_esm_shims();
    var path4 = __require("path");
    var win322 = process.platform === "win32";
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
      return str.replace(REGEX_REMOVE_BACKSLASH, (match2) => {
        return match2 === "\\" ? "" : match2;
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
      return win322 === true || path4.sep === "\\";
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
    "use strict";
    init_esm_shims();
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
      let glob8 = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob8 = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob8 = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob8) glob8 = utils.removeBackslashes(glob8);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob8,
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
    module.exports = scan;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
      const win322 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win322);
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
      const win322 = utils.isWindows(options);
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
      } = constants.globChars(win322);
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
      const create4 = (str) => {
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
            const source2 = create4(match2[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match2[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create4(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse5;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var path4 = __require("path");
    var scan = require_scan();
    var parse5 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject2 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob8, options, returnState = false) => {
      if (Array.isArray(glob8)) {
        const fns = glob8.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob8) && glob8.tokens && glob8.input;
      if (glob8 === "" || typeof glob8 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob8, options) : picomatch.makeRe(glob8, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match: match2, output } = picomatch.test(input, regex, options, { glob: glob8, posix });
        const result = { glob: glob8, state, regex, posix, input, output, match: match2, isMatch };
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
    picomatch.test = (input, regex, options, { glob: glob8, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match2 = input === glob8;
      let output = match2 && format ? format(input) : input;
      if (match2 === false) {
        output = format ? format(input) : input;
        match2 = output === glob8;
      }
      if (match2 === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match2 = picomatch.matchBase(input, regex, options, posix);
        } else {
          match2 = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match2), match: match2, output };
    };
    picomatch.matchBase = (input, glob8, options, posix = utils.isWindows(options)) => {
      const regex = glob8 instanceof RegExp ? glob8 : picomatch.makeRe(glob8, options);
      return regex.test(path4.basename(input));
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
    module.exports = picomatch;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = require_picomatch();
  }
});

// node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports, module) {
    init_esm_shims();
    module.exports = function(path4, stripTrailing) {
      if (typeof path4 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path4 === "\\" || path4 === "/") return "/";
      var len = path4.length;
      if (len <= 1) return path4;
      var prefix = "";
      if (len > 4 && path4[3] === "\\") {
        var ch = path4[2];
        if ((ch === "?" || ch === ".") && path4.slice(0, 2) === "\\\\") {
          path4 = path4.slice(2);
          prefix = "//";
        }
      }
      var segs = path4.split(/[/\\]+/);
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
    "use strict";
    init_esm_shims();
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
        const glob8 = picomatch(matcher, options);
        return (string) => matcher === string || glob8(string);
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
      const path4 = normalizePath(_path, false);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path4)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path4].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path4)) {
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

// node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js
var require_js_tokens = __commonJS({
  "node_modules/.pnpm/js-tokens@4.0.0/node_modules/js-tokens/index.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;
    exports.matchToToken = function(match2) {
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
    "use strict";
    init_esm_shims();
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
    "use strict";
    init_esm_shims();
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

// node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@babel+helper-validator-identifier@7.25.7/node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
    "use strict";
    init_esm_shims();
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

// node_modules/.pnpm/picocolors@1.1.0/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.0/node_modules/picocolors/picocolors.js"(exports, module) {
    init_esm_shims();
    var argv3 = process.argv || [];
    var env = process.env;
    var isColorSupported = !("NO_COLOR" in env || argv3.includes("--no-color")) && ("FORCE_COLOR" in env || argv3.includes("--color") || process.platform === "win32" || __require != null && __require("tty").isatty(1) && env.TERM !== "dumb" || "CI" in env);
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
        bgWhite: init("\x1B[47m", "\x1B[49m"),
        blackBright: init("\x1B[90m", "\x1B[39m"),
        redBright: init("\x1B[91m", "\x1B[39m"),
        greenBright: init("\x1B[92m", "\x1B[39m"),
        yellowBright: init("\x1B[93m", "\x1B[39m"),
        blueBright: init("\x1B[94m", "\x1B[39m"),
        magentaBright: init("\x1B[95m", "\x1B[39m"),
        cyanBright: init("\x1B[96m", "\x1B[39m"),
        whiteBright: init("\x1B[97m", "\x1B[39m"),
        bgBlackBright: init("\x1B[100m", "\x1B[49m"),
        bgRedBright: init("\x1B[101m", "\x1B[49m"),
        bgGreenBright: init("\x1B[102m", "\x1B[49m"),
        bgYellowBright: init("\x1B[103m", "\x1B[49m"),
        bgBlueBright: init("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: init("\x1B[105m", "\x1B[49m"),
        bgCyanBright: init("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: init("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
    "use strict";
    init_esm_shims();
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
    init_esm_shims();
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
      var diffc = function(c19) {
        return (v - c19) / 6 / diff + 1 / 2;
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
      var c19;
      var m;
      var y;
      var k;
      k = Math.min(1 - r, 1 - g, 1 - b);
      c19 = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c19 * 100, m * 100, y * 100, k * 100];
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
      var c19 = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c19 * (1 - k) + k);
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
      var c19;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      c19 = Math.sqrt(a * a + b * b);
      return [l, c19, h];
    };
    convert.lch.lab = function(lch) {
      var l = lch[0];
      var c19 = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr;
      hr = h / 360 * 2 * Math.PI;
      a = c19 * Math.cos(hr);
      b = c19 * Math.sin(hr);
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
        var c19 = (args - 232) * 10 + 8;
        return [c19, c19, c19];
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
      var c19 = 1;
      var f = 0;
      if (l < 0.5) {
        c19 = 2 * s * l;
      } else {
        c19 = 2 * s * (1 - l);
      }
      if (c19 < 1) {
        f = (l - 0.5 * c19) / (1 - c19);
      }
      return [hsl[0], c19 * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c19 = s * v;
      var f = 0;
      if (c19 < 1) {
        f = (v - c19) / (1 - c19);
      }
      return [hsv[0], c19 * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      var h = hcg[0] / 360;
      var c19 = hcg[1] / 100;
      var g = hcg[2] / 100;
      if (c19 === 0) {
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
      mg = (1 - c19) * g;
      return [
        (c19 * pure[0] + mg) * 255,
        (c19 * pure[1] + mg) * 255,
        (c19 * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      var c19 = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c19 + g * (1 - c19);
      var f = 0;
      if (v > 0) {
        f = c19 / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      var c19 = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1 - c19) + 0.5 * c19;
      var s = 0;
      if (l > 0 && l < 0.5) {
        s = c19 / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c19 / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      var c19 = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c19 + g * (1 - c19);
      return [hcg[0], (v - c19) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c19 = v - w;
      var g = 0;
      if (c19 < 1) {
        g = (v - c19) / (1 - c19);
      }
      return [hwb[0], c19 * 100, g * 100];
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
    convert.gray.hwb = function(gray24) {
      return [0, 100, gray24[0]];
    };
    convert.gray.cmyk = function(gray24) {
      return [0, 0, 0, gray24[0]];
    };
    convert.gray.lab = function(gray24) {
      return [gray24[0], 0, 0];
    };
    convert.gray.hex = function(gray24) {
      var val = Math.round(gray24[0] / 100 * 255) & 255;
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
    init_esm_shims();
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
      var path4 = [graph[toModel].parent, toModel];
      var fn = conversions[graph[toModel].parent][toModel];
      var cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path4.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path4;
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
    init_esm_shims();
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
    "use strict";
    init_esm_shims();
    var colorConvert = require_color_convert();
    var wrapAnsi16 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => function() {
      const code = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => function() {
      const rgb = fn.apply(colorConvert, arguments);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
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
      styles.color.grey = styles.color.gray;
      for (const groupName of Object.keys(styles)) {
        const group2 = styles[groupName];
        for (const styleName of Object.keys(group2)) {
          const style2 = group2[styleName];
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
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
      }
      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b) => [r, g, b];
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
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
          styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
        }
        if ("ansi256" in suite) {
          styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
        }
        if ("rgb" in suite) {
          styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
        }
      }
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = (flag, argv3) => {
      argv3 = argv3 || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv3.indexOf(prefix + flag);
      const terminatorPos = argv3.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var os = __require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
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
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
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
    "use strict";
    init_esm_shims();
    var TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
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
    function unescape(c19) {
      if (c19[0] === "u" && c19.length === 5 || c19[0] === "x" && c19.length === 3) {
        return String.fromCharCode(parseInt(c19.slice(1), 16));
      }
      return ESCAPES.get(c19) || c19;
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
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
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
      const styles = [];
      const chunks = [];
      let chunk = [];
      tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style2, close, chr) => {
        if (escapeChar) {
          chunk.push(unescape(escapeChar));
        } else if (style2) {
          const str = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
          styles.push({ inverse, styles: parseStyle(style2) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(chr);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMsg);
      }
      return chunks.join("");
    };
  }
});

// node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js
var require_chalk = __commonJS({
  "node_modules/.pnpm/chalk@2.4.2/node_modules/chalk/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var escapeStringRegexp = require_escape_string_regexp();
    var ansiStyles = require_ansi_styles();
    var stdoutColor = require_supports_color().stdout;
    var template = require_templates();
    var isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
    var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
    var skipModels = /* @__PURE__ */ new Set(["gray"]);
    var styles = /* @__PURE__ */ Object.create(null);
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
      ansiStyles.blue.open = "\x1B[94m";
    }
    for (const key of Object.keys(ansiStyles)) {
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      styles[key] = {
        get() {
          const codes = ansiStyles[key];
          return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
        }
      };
    }
    styles.visible = {
      get() {
        return build3.call(this, this._styles || [], true, "visible");
      }
    };
    ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), "g");
    for (const model of Object.keys(ansiStyles.color.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      styles[model] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.color.close,
              closeRe: ansiStyles.color.closeRe
            };
            return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), "g");
    for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
      if (skipModels.has(model)) {
        continue;
      }
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const level = this.level;
          return function() {
            const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
            const codes = {
              open,
              close: ansiStyles.bgColor.close,
              closeRe: ansiStyles.bgColor.closeRe
            };
            return build3.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, styles);
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
      const originalDim = ansiStyles.dim.open;
      if (isSimpleWindowsTerm && this.hasGrey) {
        ansiStyles.dim.open = "";
      }
      for (const code of this._styles.slice().reverse()) {
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
      }
      ansiStyles.dim.open = originalDim;
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
    Object.defineProperties(Chalk.prototype, styles);
    module.exports = Chalk();
    module.exports.supportsColor = stdoutColor;
    module.exports.default = module.exports;
  }
});

// node_modules/.pnpm/@babel+highlight@7.25.7/node_modules/@babel/highlight/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/@babel+highlight@7.25.7/node_modules/@babel/highlight/lib/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = highlight2;
    exports.shouldHighlight = shouldHighlight;
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
    var colors2 = typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? (0, _picocolors.createColors)(false) : _picocolors.default;
    var compose = (f, g) => (v) => f(g(v));
    var sometimesKeywords = /* @__PURE__ */ new Set(["as", "async", "from", "get", "of", "set"]);
    function getDefs(colors3) {
      return {
        keyword: colors3.cyan,
        capitalized: colors3.yellow,
        jsxIdentifier: colors3.yellow,
        punctuator: colors3.yellow,
        number: colors3.magenta,
        string: colors3.green,
        regex: colors3.magenta,
        comment: colors3.gray,
        invalid: compose(compose(colors3.white, colors3.bgRed), colors3.bold)
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
      return colors2.isColorSupported || options.forceColor;
    }
    var pcWithForcedColor = void 0;
    function getColors(forceColor) {
      if (forceColor) {
        var _pcWithForcedColor;
        (_pcWithForcedColor = pcWithForcedColor) != null ? _pcWithForcedColor : pcWithForcedColor = (0, _picocolors.createColors)(true);
        return pcWithForcedColor;
      }
      return colors2;
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
      exports.getChalk = ({
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

// node_modules/.pnpm/@babel+code-frame@7.25.7/node_modules/@babel/code-frame/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@babel+code-frame@7.25.7/node_modules/@babel/code-frame/lib/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.codeFrameColumns = codeFrameColumns2;
    exports.default = _default;
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
    var colors2 = typeof process === "object" && (process.env.FORCE_COLOR === "0" || process.env.FORCE_COLOR === "false") ? (0, _picocolors.createColors)(false) : _picocolors.default;
    var compose = (f, g) => (v) => f(g(v));
    var pcWithForcedColor = void 0;
    function getColors(forceColor) {
      if (forceColor) {
        var _pcWithForcedColor;
        (_pcWithForcedColor = pcWithForcedColor) != null ? _pcWithForcedColor : pcWithForcedColor = (0, _picocolors.createColors)(true);
        return pcWithForcedColor;
      }
      return colors2;
    }
    var deprecationWarningShown = false;
    function getDefs(colors3) {
      return {
        gutter: colors3.gray,
        marker: compose(colors3.red, colors3.bold),
        message: compose(colors3.red, colors3.bold)
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
      const colors3 = getColors(opts.forceColor);
      const defs = getDefs(colors3);
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
        return colors3.reset(frame);
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
  "node_modules/.pnpm/imurmurhash@0.1.4/node_modules/imurmurhash/imurmurhash.js"(exports, module) {
    init_esm_shims();
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
    "use strict";
    init_esm_shims();
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
    "use strict";
    init_esm_shims();
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unload = exports.load = exports.onExit = exports.signals = void 0;
    var signals_js_1 = require_signals();
    Object.defineProperty(exports, "signals", { enumerable: true, get: function() {
      return signals_js_1.signals;
    } });
    var processOk = (process6) => !!process6 && typeof process6 === "object" && typeof process6.removeListener === "function" && typeof process6.emit === "function" && typeof process6.reallyExit === "function" && typeof process6.listeners === "function" && typeof process6.kill === "function" && typeof process6.pid === "number" && typeof process6.on === "function";
    var kExitEmitter = Symbol.for("signal-exit emitter");
    var global = globalThis;
    var ObjectDefineProperty = Object.defineProperty.bind(Object);
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
    var SignalExit = class extends SignalExitBase {
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process5.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter2();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process6) {
        super();
        this.#process = process6;
        this.#sigListeners = {};
        for (const sig of signals_js_1.signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count } = this.#emitter;
            const p = process6;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process6.kill(process6.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process6.reallyExit;
        this.#originalProcessEmit = process6.emit;
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
    var process5 = globalThis.process;
    _a = signalExitWrap(processOk(process5) ? new SignalExit(process5) : new SignalExitFallback()), /**
     * Called when the process is exiting, whether via signal, explicit
     * exit, or running out of stuff to do.
     *
     * If the global process object is not suitable for instrumentation,
     * then this will be a no-op.
     *
     * Returns a function that may be used to unload signal-exit.
     */
    exports.onExit = _a.onExit, /**
     * Load the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports.load = _a.load, /**
     * Unload the listeners.  Likely you never need to call this, unless
     * doing a rather deep integration with signal-exit functionality.
     * Mostly exposed for the benefit of testing.
     *
     * @internal
     */
    exports.unload = _a.unload;
  }
});

// node_modules/.pnpm/write-file-atomic@6.0.0/node_modules/write-file-atomic/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/.pnpm/write-file-atomic@6.0.0/node_modules/write-file-atomic/lib/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = writeFile9;
    module.exports.sync = writeFileSync3;
    module.exports._getTmpname = getTmpname;
    module.exports._cleanupOnExit = cleanupOnExit;
    var fs3 = __require("fs");
    var MurmurHash3 = require_imurmurhash();
    var { onExit } = require_cjs();
    var path4 = __require("path");
    var { promisify: promisify2 } = __require("util");
    var activeFiles = {};
    var threadId = function getId() {
      try {
        const workerThreads = __require("worker_threads");
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
      const absoluteName = path4.resolve(filename);
      try {
        await serializeActiveFile(absoluteName);
        const truename = await promisify2(fs3.realpath)(filename).catch(() => filename);
        tmpfile = getTmpname(truename);
        if (!options.mode || !options.chown) {
          const stats = await promisify2(fs3.stat)(truename).catch(() => {
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
        fd = await promisify2(fs3.open)(tmpfile, "w", options.mode);
        if (options.tmpfileCreated) {
          await options.tmpfileCreated(tmpfile);
        }
        if (ArrayBuffer.isView(data)) {
          await promisify2(fs3.write)(fd, data, 0, data.length, 0);
        } else if (data != null) {
          await promisify2(fs3.write)(fd, String(data), 0, String(options.encoding || "utf8"));
        }
        if (options.fsync !== false) {
          await promisify2(fs3.fsync)(fd);
        }
        await promisify2(fs3.close)(fd);
        fd = null;
        if (options.chown) {
          await promisify2(fs3.chown)(tmpfile, options.chown.uid, options.chown.gid).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        if (options.mode) {
          await promisify2(fs3.chmod)(tmpfile, options.mode).catch((err) => {
            if (!isChownErrOk(err)) {
              throw err;
            }
          });
        }
        await promisify2(fs3.rename)(tmpfile, truename);
      } finally {
        if (fd) {
          await promisify2(fs3.close)(fd).catch(
            /* istanbul ignore next */
            () => {
            }
          );
        }
        removeOnExitHandler();
        await promisify2(fs3.unlink)(tmpfile).catch(() => {
        });
        activeFiles[absoluteName].shift();
        if (activeFiles[absoluteName].length > 0) {
          activeFiles[absoluteName][0]();
        } else {
          delete activeFiles[absoluteName];
        }
      }
    }
    async function writeFile9(filename, data, options, callback) {
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

// node_modules/.pnpm/tree-kill@1.2.2/node_modules/tree-kill/index.js
var require_tree_kill = __commonJS({
  "node_modules/.pnpm/tree-kill@1.2.2/node_modules/tree-kill/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var childProcess2 = __require("child_process");
    var spawn5 = childProcess2.spawn;
    var exec2 = childProcess2.exec;
    module.exports = function(pid, signal, callback) {
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
          exec2("taskkill /pid " + pid + " /T /F", callback);
          break;
        case "darwin":
          buildProcessTree(pid, tree, pidsToProcess, function(parentPid) {
            return spawn5("pgrep", ["-P", parentPid]);
          }, function() {
            killAll2(tree, signal, callback);
          });
          break;
        // case 'sunos':
        //     buildProcessTreeSunOS(pid, tree, pidsToProcess, function () {
        //         killAll(tree, signal, callback);
        //     });
        //     break;
        default:
          buildProcessTree(pid, tree, pidsToProcess, function(parentPid) {
            return spawn5("ps", ["-o", "pid", "--no-headers", "--ppid", parentPid]);
          }, function() {
            killAll2(tree, signal, callback);
          });
          break;
      }
    };
    function killAll2(tree, signal, callback) {
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

// node_modules/.pnpm/escape-string-regexp@4.0.0/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp2 = __commonJS({
  "node_modules/.pnpm/escape-string-regexp@4.0.0/node_modules/escape-string-regexp/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    };
  }
});

// node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js"(exports, module) {
    init_esm_shims();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type2 = typeof val;
      if (type2 === "string" && val.length > 0) {
        return parse5(val);
      } else if (type2 === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse5(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type2 = (match2[2] || "ms").toLowerCase();
      switch (type2) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural2(ms, d, "day") || plural2(ms, h, "hour") || plural2(ms, m, "minute") || plural2(ms, s, "second") || ms + " ms";
    }
    function plural2(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js"(exports, module) {
    init_esm_shims();
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug2() {
        if (!debug2.enabled) return;
        var self = debug2;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match2, format) {
          if (match2 === "%%") return match2;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match2 = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match2;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug2.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug2.namespace = namespace;
      debug2.enabled = exports.enabled(namespace);
      debug2.useColors = exports.useColors();
      debug2.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug2);
      }
      return debug2;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js"(exports, module) {
    init_esm_shims();
    exports = module.exports = require_debug();
    exports.log = log2;
    exports.formatArgs = formatArgs;
    exports.save = save2;
    exports.load = load2;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2) return;
      var c19 = "color: " + this.color;
      args.splice(1, 0, c19, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match2) {
        if ("%%" === match2) return;
        index++;
        if ("%c" === match2) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c19);
    }
    function log2() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save2(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load2() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load2());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/node.js"(exports, module) {
    init_esm_shims();
    var tty = __require("tty");
    var util = __require("util");
    exports = module.exports = require_debug();
    exports.init = init;
    exports.log = log2;
    exports.formatArgs = formatArgs;
    exports.save = save2;
    exports.load = load2;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c19 = this.color;
        var prefix = "  \x1B[3" + c19 + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c19 + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log2() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save2(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load2() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs3 = __require("fs");
          stream2 = new fs3.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net2 = __require("net");
          stream2 = new net2.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      var keys2 = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys2.length; i++) {
        debug2.inspectOpts[keys2[i]] = exports.inspectOpts[keys2[i]];
      }
    }
    exports.enable(load2());
  }
});

// node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/index.js"(exports, module) {
    init_esm_shims();
    if (typeof process !== "undefined" && process.type === "renderer") {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js
var require_is_docker = __commonJS({
  "node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var fs3 = __require("fs");
    var isDocker;
    function hasDockerEnv() {
      try {
        fs3.statSync("/.dockerenv");
        return true;
      } catch (_) {
        return false;
      }
    }
    function hasDockerCGroup() {
      try {
        return fs3.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
      } catch (_) {
        return false;
      }
    }
    module.exports = () => {
      if (isDocker === void 0) {
        isDocker = hasDockerEnv() || hasDockerCGroup();
      }
      return isDocker;
    };
  }
});

// node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js
var require_is_wsl = __commonJS({
  "node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var os = __require("os");
    var fs3 = __require("fs");
    var isDocker = require_is_docker();
    var isWsl3 = () => {
      if (process.platform !== "linux") {
        return false;
      }
      if (os.release().toLowerCase().includes("microsoft")) {
        if (isDocker()) {
          return false;
        }
        return true;
      }
      try {
        return fs3.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : false;
      } catch (_) {
        return false;
      }
    };
    if (process.env.__IS_WSL_TEST__) {
      module.exports = isWsl3;
    } else {
      module.exports = isWsl3();
    }
  }
});

// syncify/cli.ts
init_esm_shims();
import { argv as argv2 } from "node:process";

// syncify/cli/args.ts
init_esm_shims();
import { parseArgs } from "node:util";

// syncify/model/$.ts
init_esm_shims();
var import_ansi2 = __toESM(require_dist());
import { join } from "node:path";
import { homedir, tmpdir } from "node:os";

// syncify/const.ts
init_esm_shims();
var HOT_SOCKET_TOPICS = [
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
var HOME_DIRS = [
  "chrome"
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
init_esm_shims();
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
  spawn: {
    build: null,
    watch: null
  },
  hot: {
    server: 3e3,
    socket: 8089,
    method: "hot",
    strategy: "hydrate",
    label: "visible",
    previewBar: false,
    loadEventJS: "",
    chromeFlags: [
      "--restore-last-session",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-sync",
      "--disable-password-manager",
      "--disable-save-password-bubble",
      "--disable-translate",
      "--disable-features=TranslateUI",
      "--disable-infobars",
      "--disable-web-security",
      "--test-type"
    ]
  },
  log: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  }
});

// syncify/model/processor.ts
init_esm_shims();
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
init_esm_shims();
var plugins = () => ({
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
});

// syncify/utils/utils.ts
init_esm_shims();
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

// node_modules/.pnpm/strip-json-comments@5.0.1/node_modules/strip-json-comments/index.js
init_esm_shims();
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
  const strip3 = whitespace ? stripWithWhitespace : stripWithoutWhitespace;
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
      buffer += strip3(jsonString, offset, index);
      offset = index;
      continue;
    } else if (isInsideComment === singleComment && currentCharacter === "\n") {
      isInsideComment = false;
      buffer += strip3(jsonString, offset, index);
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
      buffer += strip3(jsonString, offset, index + 1);
      offset = index + 1;
      continue;
    } else if (trailingCommas && !isInsideComment) {
      if (commaIndex !== -1) {
        if (currentCharacter === "}" || currentCharacter === "]") {
          buffer += jsonString.slice(offset, index);
          result += strip3(buffer, 0, 1) + buffer.slice(1);
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
  return result + buffer + (isInsideComment ? strip3(jsonString.slice(offset)) : jsonString.slice(offset));
}

// syncify/utils/utils.ts
var import_ansi = __toESM(require_dist());

// syncify/utils/native.ts
init_esm_shims();
import { Console } from "node:console";
import { stdout, stderr } from "node:process";
import { EventEmitter } from "node:events";
import { exec } from "node:child_process";
import { promisify } from "node:util";
var command = promisify(exec);
var event = new EventEmitter();
var { error, log, warn, clear: clear2 } = new Console(stdout, stderr);
var { create, assign, defineProperty, defineProperties, keys, values, setPrototypeOf } = Object;
var toArray = Array.from;
var toBuffer = Buffer.from;
var { abs } = Math;
var { toString } = Object.prototype;

// syncify/utils/utils.ts
function merge(source, ...patches) {
  const arr = isArray(source);
  return function apply(isArr, copy2, patch) {
    const type2 = typeof patch;
    if (patch && type2 === "object") {
      if (isArray(patch)) {
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
          } else if (val === null || isObject(val) === false || isArray(val)) {
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
function hasPath(path4, param) {
  if (isNil(param)) return false;
  if (isObject(param) === false) return false;
  let object2 = param;
  let counter = 0;
  const props = path4.split(".");
  while (counter < props.length) {
    if (isNil(object2)) return false;
    if (object2[props[counter]] === null) return false;
    object2 = object2[props[counter]];
    counter++;
  }
  return object2 !== void 0;
}
function has(prop, object2) {
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
  if (isFunction(__require)) return __require(name);
  return createRequire(import.meta.url)(name);
}
function inferLoader(ext) {
  if (ext === ".mjs" || ext === ".cjs") return "js";
  return ext.slice(1);
}
function getTime2() {
  const now2 = /* @__PURE__ */ new Date();
  const hur = now2.getHours();
  const min = now2.getMinutes();
  const sec = now2.getSeconds();
  return (hur < 10 ? `0${hur}` : hur) + import_ansi.COL + (min < 10 ? `0${min}` : min) + import_ansi.COL + (sec < 10 ? `0${sec}` : sec);
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
function checksum(input) {
  return createHash("md5").update(input).digest("hex");
}
function handleize(string) {
  return string.toLowerCase().replace(/[^a-z0-9_:]+/g, "-").replace(/-$/, "").replace(/^-/, "");
}
function plural(word, size) {
  if (size >= 2 || size === 0) return word[word.length - 1] !== "s" ? `${word}s` : word;
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
function pm() {
  if (!process.env.npm_config_user_agent) return "npm";
  const userAgent = process.env.npm_config_user_agent;
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return name === "npminstall" ? "cnpm" : name;
}
function glueString(...input) {
  return input.join(" ");
}
function glueLines(...input) {
  return isArray(input[0]) ? input[0].join("\n") : input.join("\n");
}
function uuid() {
  return Math.random().toString(36).slice(2);
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
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN2(input)) return false;
  return !input;
}
function isArray(param) {
  return Array.isArray(param);
}
function isObject(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === "Object";
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
  return param === null;
}
function isUndefined(param) {
  return typeof param === "undefined";
}
function isBuffer(param) {
  return Buffer.isBuffer(param);
}

// syncify/model/$.ts
var paths = () => {
  const state = object();
  for (const path4 of PATH_KEYS) {
    state[path4] = object({
      input: /* @__PURE__ */ new Set(),
      match: null,
      config: null,
      rename: []
    });
  }
  state.transforms = /* @__PURE__ */ new Map();
  return state;
};
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
  static package;
  /**
   * Cache interface
   */
  static cache = object();
  /**
   * Chokidar watch instance
   */
  static watch = /* @__PURE__ */ new Set();
  /**
   * Detects what package manager executed the process
   *
   * @default 'npm'
   */
  pm = pm();
  /**
   * The Syncify Module installation reference
   *
   * > This is temporary and will be removed in future versions as it exists
   * > for support with `--strap` command and applied to dependency key of package.json
   */
  module = "github:panoply/syncify#next";
  /**
   * The Syncify Github Repository
   */
  github = object({ url: "https://github.com/panoply/syncify.git", branch: "next" });
  /**
   * Process Child
   */
  process;
  /**
   * Whether or not to restart process
   */
  restart = false;
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
   * The version defined in the package.json
   *
   * @default null
   */
  version = "0.0.1-rc.1";
  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  cmd = object();
  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  argv = null;
  /**
   * CLI provided filters
   *
   * @default null
   */
  filters = object();
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
   * Home or temporary directory is home fails
   *
   * @example
   * '/Users/sissel/.syncify/'
   * // OR
   * '/var/folders/m3/5574nnhn0yj488ccryqr7tc80000gn/T'
   */
  home = join(homedir() || tmpdir(), ".syncify");
  /**
   * The current working directory
   *
   * @default null
   */
  cwd = process.cwd();
  /**
   * Base directory path references
   */
  dirs = object({
    module: join(this.cwd, "node_modules", "@syncify/cli"),
    straps: join(this.cwd, "node_modules", "@syncify/cli", "straps"),
    examples: join(this.cwd, "node_modules", "@syncify/cli", "examples"),
    chrome: null,
    static: null,
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
    server: 3e3,
    socket: 8089,
    method: "hot",
    strategy: "hydrate",
    label: "visible",
    source: null,
    previewBar: false,
    loadEventJS: "",
    chromeFlags: [
      "--restore-last-session",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-sync",
      "--disable-password-manager",
      "--disable-save-password-bubble",
      "--disable-translate",
      "--disable-features=TranslateUI",
      "--disable-infobars",
      "--disable-web-security",
      "--test-type"
    ]
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
    config: {
      clear: true,
      silent: false,
      stats: true,
      warnings: true
    }
  });
  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  mode = object({
    dev: true,
    build: false,
    interactive: false,
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
   * Files store - Holds a `Set` reference to all files
   */
  files = /* @__PURE__ */ new Map();
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
    schema: null,
    shared: /* @__PURE__ */ new Map()
  };
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
   * Returns the `package.json` contents
   */
  get pkg() {
    return Bundle.package.content;
  }
  /**
   * Returns the `package.json` contents
   */
  get package() {
    return Bundle.package;
  }
  /**
   * Returns the `package.json` contents
   */
  set package(pkg) {
    Bundle.package = pkg;
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
    return (0, import_ansi2.tsize)();
  }
}();

// syncify/options/modes.ts
init_esm_shims();
var import_ansi3 = __toESM(require_dist());

// syncify/log/throws.ts
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/allFalse.js
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isTruthy.js
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/type.js
init_esm_shims();
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
init_esm_shims();
var { isArray: isArray2 } = Array;

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isTruthy.js
function isTruthy(x) {
  if (isArray2(x)) {
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

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/anyTrue.js
init_esm_shims();
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
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/isInteger.js
init_esm_shims();
function _isInteger(n) {
  return n << 0 === n;
}
var isInteger = Number.isInteger || _isInteger;

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/createPath.js
function createPath(path4, delimiter = ".") {
  return typeof path4 === "string" ? path4.split(delimiter).map((x) => isInteger(x) ? Number(x) : x) : path4;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/path.js
init_esm_shims();
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
function path2(pathInput, obj) {
  if (arguments.length === 1) return (_obj) => path2(pathInput, _obj);
  if (obj === null || obj === void 0) {
    return void 0;
  }
  return pathFn(pathInput, obj);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/equals.js
init_esm_shims();
function _indexOf(valueToFind, list3) {
  if (!isArray2(list3))
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
init_esm_shims();
var DELAY = "RAMBDAX_DELAY";
function delay(ms) {
  return new Promise((resolve3) => {
    setTimeout(() => {
      resolve3(DELAY);
    }, ms);
  });
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/includes.js
init_esm_shims();
function includes(valueToFind, iterable) {
  if (arguments.length === 1)
    return (_iterable) => includes(valueToFind, _iterable);
  if (typeof iterable === "string") {
    return iterable.includes(valueToFind);
  }
  if (!iterable) {
    throw new TypeError(`Cannot read property 'indexOf' of ${iterable}`);
  }
  if (!isArray2(iterable)) return false;
  return _indexOf(valueToFind, iterable) > -1;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/isType.js
init_esm_shims();
function isType(xType, x) {
  if (arguments.length === 1) {
    return (xHolder) => isType(xType, xHolder);
  }
  return type(x) === xType;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/mapParallelAsync.js
init_esm_shims();
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
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/includes.js
init_esm_shims();

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/_internals/compare.js
init_esm_shims();
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
init_esm_shims();
function has2(prop, obj) {
  if (arguments.length === 1) return (_obj) => has2(prop, _obj);
  if (!obj) return false;
  return obj.hasOwnProperty(prop);
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/hasPath.js
init_esm_shims();
function hasPath2(pathInput, obj) {
  if (arguments.length === 1) {
    return (objHolder) => hasPath2(pathInput, objHolder);
  }
  return path2(pathInput, obj) !== void 0;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/isEmpty.js
init_esm_shims();
function isEmpty2(input) {
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
init_esm_shims();
function isNil2(x) {
  return x === void 0 || x === null;
}

// node_modules/.pnpm/rambdax@11.2.0/node_modules/rambdax/src/last.js
init_esm_shims();
function last(listOrString) {
  if (typeof listOrString === "string") {
    return listOrString[listOrString.length - 1] || "";
  }
  return listOrString[listOrString.length - 1];
}

// syncify/log/throws.ts
import { argv } from "node:process";
var c = __toESM(require_dist());
var warnings = {};
function warnOption(group2) {
  if (!has2(group2, warnings)) warnings[group2] = [];
  return (message, value) => {
    if (isUndefined(value)) {
      warnings[group2].push(c.yellowBright(message));
    } else {
      warnings[group2].push(c.yellowBright(message + c.COL + " " + c.bold(value)));
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
    c.Create({ type: "error" }).Line("TYPE ERROR", c.bold).NL.Line(`An invalid ${c.cyan(option)} type value was provided within your ${c.bold($.file.base)} file.`).Line(`The ${c.cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`).NL.Line(`provided${c.COL} ${c.yellowBright(type(provided).toLowerCase())}`).Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray("$1")))}`).Line(`location${c.COL} ${c.TLD}${c.gray.underline($.file.base)}`).NL.Line("How to fix?", c.gray.bold).Line(`You need to change the option value to use the ${c.blue("expected")} type.`, c.gray).Line(`Use the ${c.white("defineConfig")} named export for type checking`, c.gray).End($.log.group).BR.toString()
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
    provided = argv.slice(2).join(" ");
    expected = c.whiteBright(`syncify ${provided} ${c.cyan(expected.replace(/([|,-])/g, c.gray("$1")))}`);
  } else {
    expected = c.whiteBright(`syncify ${expected}`);
  }
  error(
    c.Create({ type: "error" }).Line("COMMAND ERROR", c.bold).NL.Wrap(message).NL.Line(`provided${c.COL} ${c.whiteBright("$")} ${c.whiteBright("syncify " + provided)}`).Line(`expected${c.COL} ${c.whiteBright("$")} ${expected}`).NL.Line("How to fix?", c.gray.bold).Wrap(fix, c.gray).NL.End($.log.group).BR.toString()
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
    provided = provided.replace(REGEX_OR_CHARS, c.gray("$1"));
  }
  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, c.gray("$1"));
  }
  error(
    c.Create({ type: "error" }).Line("INVALID TARGET", c.bold).NL.Wrap(`Invalid ${c.cyan(type2)} target provided. `, ...message).NL.Line(`provided${c.COL} ${c.yellowBright(expected)}`).Line(`expected${c.COL} ${c.blue(provided)}`).NL.Line("How to fix?", c.gray.bold).Wrap(fix, c.gray).End($.log.group).BR.toString()
  );
  process.exit(0);
}
function enoentError({
  type: type2,
  path: path4,
  message,
  task: task2
}) {
  error(
    c.Create({ type: "error" }).Line("ENOENT ERROR", c.bold).NL.Wrap(`Failed to resolve ${c.cyan(path4)} ${type2}.`, ...message).NL.Line(`task${c.COL} ${c.yellowBright(task2)}`).Line(`path${c.COL} ${c.blue(path4)}`).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingDependency(deps) {
  const message = c.Create({
    type: "error"
  }).Line("DEPENDENCY ERROR", c.bold).NL;
  if (isString(deps)) {
    message.Wrap(`Missing ${c.cyan(deps)} dependency. You need to install ${c.cyan(deps)} to use it as a processor.`).NL.Line("How to fix?", c.gray.bold).Line("Install the above module as a development dependency, for example:").NL.Line(`$ pnpm add ${deps} -D`, c.whiteBright);
  } else {
    const info = [
      `Missing ${c.cyan(`${deps.length}`)} dependencies. You are attempting to use processor`,
      "(transforms) which are not yet installed. Install the below modules as development",
      "dependencies or disable the transform:"
    ];
    message.Wrap(info).Newline();
    for (const dep of deps) {
      message.Line(`$ pnpm add ${dep} -D`, c.whiteBright);
    }
  }
  error(
    message.NL.Wrap("If you are using a different package manager please consider adopting pnpm.", c.gray).End($.log.group).BR.toString()
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
    option = option.split(".").filter(Boolean).join(c.gray(" \u2192 "));
  }
  error(
    c.Create({ type: "error" }).Line("MISSING OPTION", c.bold).NL.Wrap(
      `Missing ${c.Encase("CB", c.cyan(option), { spaced: true })} config option.`,
      `The ${c.cyan(key)} option must be defined`
    ).NL.Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray("$1")))}`).Line(`location${c.COL} ${c.gray.underline($.file.base)}`).NL.Line("Why?", c.gray.bold).Wrap(reason, c.gray).Newline("line").End($.log.group).BR.toString()
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
    option = option.split(".").filter(Boolean).join(c.gray(" \u2192 "));
  }
  error(
    c.Create({ type: "error" }).Line("INVALID ERROR", c.bold).NL.Wrap(`Invalid ${c.cyan(option)} configuration. The ${c.cyan(name)} option is invalid. `, ...reason).NL.Line(`provided${c.COL} ${c.yellowBright(value)}`).Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray("$1")))}`).NL.Line("How to fix?", c.gray.bold).Line("You need to update the option and use one of the expected values.", c.gray).Line(`Use the ${c.white("defineConfig")} named export for type checking`, c.gray).End($.log.group).BR.toString(c.red)
  );
  process.exit(0);
}
function missingStores(cwd) {
  error(
    c.Create({ type: "error" }).Line(`${"MISSING REFERENCE"}`, c.bold).NL.Line(`You have not provided any ${c.bold("stores")} within your ${c.cyan("package.json")} file.`).NL.Line("How to fix?", c.white.bold).Line(`You need to provide ${c.cyan("stores")} via ${c.cyan("syncify")} key`, c.gray).Line("passing both your store name and a key > value list of theme targets.", c.gray).NL.Line("{", c.gray).Line('  "syncify": {'.replace(/"/g, c.white('"')), c.gray).Line('    "stores": {'.replace(/"/g, c.white('"')), c.gray).Line(`      "domain": "${c.redBright("your-store")}"`.replace(/"/g, c.white('"')), c.gray).Line('      "themes": {}'.replace(/"/g, c.white('"')), c.gray).Line("    }", c.gray).Line("  }", c.gray).Line("}", c.gray).NL.Line(`Replace the ${c.white("your-store")} with the name of your .myshopify domain.`, c.gray).Line("Syncify will prompt you and provide a list of theme targets to select from.", c.gray).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function missingConfig(cwd) {
  error(
    c.Create({ type: "nil" }).Line(`${`Missing ${c.cyan("syncify.config.js")} configuration`}`, c.bold).BR.Line("Unable to resolve a configuration file within the workspace").BR.Line(`at${c.COL} ${c.gray.underline("~" + cwd)}`).BR.Line("How to fix?", c.white.bold).Line("You need to add one the following files to your project", c.gray).BR.Line(` - ${c.white("syncify.config.ts")}`, c.gray).Line(` - ${c.white("syncify.config.js")}`, c.gray).Line(` - ${c.white("syncify.config.mjs")}`, c.gray).Line(` - ${c.white("syncify.config.cjs")}`, c.gray).Line(` - ${c.white("syncify.config.json")}`, c.gray).BR.Line(`You can also provide configuration in your ${c.white("package.json")}`, c.gray).Line(`file using the ${c.cyan('"syncify": { "config": {} }')} 'property.`, c.gray).BR.toString(c.red)
  );
  process.exit(0);
}
function missingEnv(cwd) {
  const message = [
    `Missing ${c.cyan(".env")} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${c.cyan(".env")} file present in the root of your project`
  ];
  error(
    c.Create({ type: "error" }).Line("MISSING ENV", c.bold).NL.Wrap(message).NL.End($.log.group).BR.toString(c.red)
  );
  process.exit(0);
}
function errorRuntime(e, options) {
  const message = e instanceof Error ? has2("message", e) ? e.message : e.toString() : e;
  if (has2("code", e)) options.entries.code = e.code;
  if (has2("name", e)) options.entries.name = e.name;
  error(
    c.Create({ type: "error" }).Line("ERROR", c.bold).NL.Wrap(options.message, c.redBright).NL.Wrap(message, c.redBright.bold).NL.Line("How to fix?", c.gray.bold).Wrap(options.solution, c.gray).NL.Context({
      entries: options.entries
    }).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function throwError(message, solution) {
  error(
    c.Create({ type: "error" }).Line("ERROR", c.bold).NL.Wrap(message).NL.Line("How to fix?", c.gray.bold).Wrap(solution, c.gray).NL.End($.log.group).BR.toString()
  );
  process.exit(0);
}
function unknownError(option, value) {
  if (option.indexOf(".") > -1) {
    option = c.Encase("CB", glueString(
      option.split(".").filter(Boolean).join(c.gray(" \u2192 ")),
      c.ARR,
      c.redBright.bold(value)
    ), {
      spaced: true
    });
  }
  const file = $.file.base === "package.json" ? `${c.blue("syncify")} config in the ${c.blue("package.json")} file.` : `${c.blue($.file.base)} file.`;
  error(
    c.Create({ type: "error" }).Line("ERROR", c.bold).NL.Line(`Unknown ${c.cyan(option)} option provided.`).NL.Line("How to fix?", c.gray.bold).Line(`The ${c.cyan(value)} option is invalid or unsupported.`).Line(`You need to remove it from the ${file}`).End($.log.group).BR.toString()
  );
  process.exit(0);
}

// syncify/options/modes.ts
function setModes(cli) {
  const prop = hasProp($.config.log);
  if (prop("silent")) $.log.config.silent = $.config.log.silent;
  if (prop("clear")) $.log.config.clear = $.config.log.clear;
  if (prop("stats")) $.log.config.stats = $.config.log.stats;
  if (prop("warnings")) $.log.config.warnings = $.config.log.warnings;
  const resource2 = cli.pages || cli.metafields || cli.redirects;
  const transform3 = cli.style || cli.script || cli.image || cli.svg;
  const watch2 = resource2 || cli.upload || cli.import ? false : cli.watch;
  $.mode = assign($.mode, {
    watch: watch2,
    dev: !cli.prod,
    prod: cli.prod,
    setup: cli.mode === "setup",
    strap: cli.mode === "strap",
    themes: cli.mode === "themes",
    hot: cli.watch && cli.hot,
    interactive: cli.interactive,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    cache: cli.build && cli.cache,
    force: cli.force,
    script: transform3 ? cli.script : false,
    style: transform3 ? cli.style : false,
    image: transform3 ? cli.image : false,
    svg: transform3 ? cli.svg : false,
    terse: cli.terse || cli.prod,
    clean: resource2 || transform3 || cli.upload ? false : cli.export && cli.build || cli.clean,
    build: cli.watch || cli.import ? false : cli.build,
    upload: transform3 || watch2 ? false : cli.upload,
    export: cli.export,
    import: resource2 || transform3 || cli.upload || cli.watch || cli.build ? false : cli.import,
    publish: cli.publish,
    release: isString(cli.release)
  });
  validateCommands($.mode, cli);
  if ($.mode.release) {
    $.mode.clean = true;
    $.mode.build = true;
    $.mode.export = true;
    $.mode.publish = true;
  }
  if ($.mode.build) {
    const build3 = !$.mode.script && !$.mode.style && !$.mode.svg && !$.mode.pages && !$.mode.metafields && !$.mode.image;
    if (build3) {
      $.mode.script = true;
      $.mode.style = true;
      $.mode.svg = true;
      $.mode.image = true;
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
        `Attempting to purge cache outside ${(0, import_ansi3.bold)("build")} mode Syncify requires you to pass`,
        "the build mode flags when executing a cache reset, for example:",
        "\n\n",
        `${(0, import_ansi3.whiteBright)("$")} ${(0, import_ansi3.white)(`syncify ${$.argv} ${(0, import_ansi3.blue)("-b --cache")}`)}`,
        "\n\n",
        `Run ${(0, import_ansi3.gray)("syncify --help")} for more information, or pass an execution`,
        `operation mode as per the ${(0, import_ansi3.whiteBright)("expected")} value.`,
        "\n\n"
      ]
    });
  }
  if (values(modes).every((cmd2) => cmd2 === false)) {
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
          `${(0, import_ansi3.whiteBright)("$")} ${(0, import_ansi3.whiteBright)(`syncify ${import_ansi3.LAN}${(0, import_ansi3.cyan)("mode")}${import_ansi3.RAN}`)}`,
          "\n\n",
          `Run ${(0, import_ansi3.blue)("syncify --help")} for more information`
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
        const invalid2 = props.filter((cmd2) => cmd2 !== "build" && cmd2 !== "clean" && cmd2 !== "export");
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
        const valid = invalid2.map((cmd2) => {
          if (cmd2 === "filter" || cmd2 === "f" || cmd2 === "resource" || cmd2 === "-r") {
            return `--?${cmd2}.*?(?=(--?${invalid2.join("|--?")}))`;
          } else {
            return `--?${cmd2}`;
          }
        }).join("|");
        const pexp = new RegExp(`(--?${invalid2.join("|--?")})`, "g");
        const eexp = new RegExp(`(${valid})`, "g");
        return invalidCommand(
          {
            message: [
              `Bad command ${import_ansi3.LPR}argv${import_ansi3.RPR} sequence passed with ${(0, import_ansi3.blue)("export")} mode.`,
              "Theme exports are performed in isolation. You command includes",
              "execution modes that cannot be run when exporting theme/s"
            ],
            provided: $.argv.replace(pexp, (0, import_ansi3.red)("$1")).replace(/(--export)/, (0, import_ansi3.blue)("$1")),
            expected: $.argv.replace(eexp, "").replace(/(--export)/, (0, import_ansi3.blue)("$1")),
            fix: [
              `Removed the flags marked ${(0, import_ansi3.red)("red")} as shown in provided aboved.`
            ]
          }
        );
      }
    }
  }
}

// syncify/cli/args.ts
function cmd(args, options) {
  const { values: values2, tokens: tokens2 } = parseArgs({
    args,
    options,
    allowPositionals: true,
    tokens: true
  });
  $.argv = args.slice(2).join(" ").trimStart();
  $.cmd = assign($.cmd, { help: null }, values2);
  if (tokens2.length === 2) {
    $.cmd.help = "show";
    return $.cmd;
  }
  if (tokens2[2].kind === "positional") {
    for (const token of tokens2.slice(2)) {
      if (token.kind !== "positional") break;
      if (/\b(themes|strap|setup)\b/.test(token.value)) {
        $.cmd.mode = token.value;
      } else {
        $.cmd.stores = token.value.split(",").filter(Boolean);
      }
    }
  }
  if (!has("stores", $.cmd)) $.cmd.stores = [];
  $.env.cli = true;
  $.env.prod = $.cmd.prod;
  $.env.dev = $.cmd.dev && !$.cmd.prod;
  $.terminal.wrap = Math.round($.terminal.cols - $.terminal.cols / 3);
  setModes($.cmd);
  return $.cmd;
}

// syncify/index.ts
init_esm_shims();
import process4 from "node:process";

// syncify/modes/upload.ts
init_esm_shims();
import glob2 from "fast-glob";
import { relative as relative3 } from "node:path";
import { readFile as readFile2 } from "fs-extra";

// syncify/requests/client.ts
init_esm_shims();

// node_modules/.pnpm/p-map@7.0.2/node_modules/p-map/index.js
init_esm_shims();
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
init_esm_shims();

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/index.js
init_esm_shims();

// node_modules/.pnpm/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
init_esm_shims();
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/.pnpm/p-timeout@6.1.2/node_modules/p-timeout/index.js
init_esm_shims();
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
init_esm_shims();

// node_modules/.pnpm/p-queue@8.0.1/node_modules/p-queue/dist/lower-bound.js
init_esm_shims();
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
    const now2 = Date.now();
    if (this.#intervalId === void 0) {
      const delay3 = this.#intervalEnd - now2;
      if (delay3 < 0) {
        this.#intervalCount = this.#carryoverConcurrencyCount ? this.#pending : 0;
      } else {
        if (this.#timeoutId === void 0) {
          this.#timeoutId = setTimeout(() => {
            this.#onResumeInterval();
          }, delay3);
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
import connect from "axios";
var axios = connect.create({
  responseType: "json",
  headers: {}
});
var queue = new PQueue({
  interval: 500,
  intervalCap: 2
});
function requeue(status) {
  if (status === 429 || status === 500) return true;
  if (!queue.isPaused) queue.pause();
  return false;
}

// syncify/utils/timer.ts
init_esm_shims();
import { performance as performance2 } from "node:perf_hooks";
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
      this.time[id] = performance2.now();
    } else {
      this.marks.push(performance2.now());
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
  stop(now2 = false, end = false) {
    let gt;
    if (typeof now2 === "boolean") {
      gt = now2 ? this.marks[this.marks.length - 1] : this.marks.pop();
    } else if (now2) {
      if (now2 in this.cache) {
        const s2 = this.cache[now2];
        delete this.cache[now2];
        return s2;
      }
      if (end) {
        gt = this.time[now2];
        delete this.time[now2];
      } else {
        gt = this.time[now2];
      }
    }
    const ms = performance2.now() - gt;
    if (ms < 1e3) return `${abs(+ms.toFixed(0))}ms`;
    const s = ms / 1e3;
    if (s < 60) return `${abs(+s.toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
    const m = abs(+(s / 60).toFixed(0));
    return `${m}m ${abs(+(s - 60 * Number(m)).toFixed(0))}s ${abs(+ms.toFixed(0).slice(1, 4))}ms`;
  }
}();

// syncify/requests/assets.ts
init_esm_shims();

// syncify/model/file.ts
init_esm_shims();
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
init_esm_shims();
import { cursorTo, clearScreenDown } from "node:readline";
import { stdout as stdout2, stderr as stderr2 } from "node:process";
import notifier from "node-notifier";

// syncify/cli/intercept.ts
init_esm_shims();

// syncify/cli/interpolate.ts
init_esm_shims();
var c2 = __toESM(require_dist());
function Format(input, { type: type2 = "info" } = {}) {
  const message = c2.Create({ type: type2 });
  const lines = isArray(input) ? input : input.split("\n");
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
  const space = c2.eq(data.entries);
  const hasMessage = has("message", data);
  if (!has("warning", data)) data.warning = false;
  if (!hasMessage) {
    if (data.warning === false) {
      data.message = c2.Create({ type: "error" }).NL;
    } else {
      data.message = c2.Create({ type: "warn" }).NL;
    }
  }
  for (const key in data.entries) {
    const string = c2.sanitize(data.entries[key]);
    if (key === "source" || key === "output" || key === "input" || key === "file") {
      data.message.Line(c2.white(key) + c2.COL + space(key) + c2.TLD + c2.underline(string), c2.gray);
    } else {
      data.message.Line(c2.white(key) + c2.COL + space(key) + string, c2.gray);
    }
  }
  if (isString(data.stack)) {
    if (data.warning === false) {
      $.errors.add(data.stack);
    }
    data.message.Break(c2.Suffix.stack);
  }
  return data.message.toLine();
}
function Sample(code, {
  line = c2.Tree.line,
  span = null
} = {}) {
  if (line === "red") {
    line = c2.Tree.red;
  } else if (line === "yellow") {
    line = c2.Tree.yellow;
  }
  if (span !== null) {
    const end = has("end", span) ? span.end : span.start + 1;
    return line + "\n" + [
      line + c2.blue(`${span.start - 1}`) + c2.COL,
      line + c2.blue(`${span.start}`) + c2.COL + code,
      line + c2.blue(`${end}`) + c2.COL
    ].join("\n");
  }
  return line + "\n" + line + code;
}
function Multiline2(input, { type: type2 = "info", color = c2.white } = {}) {
  const line = type2 === "error" ? "red" : type2 === "warn" ? "yellow" : "line";
  return c2.Create({ type: type2 }).Newline(line).Wrap(input, color).toLine();
}

// syncify/log/errors.ts
init_esm_shims();

// syncify/cli/codeframe.ts
init_esm_shims();
var c3 = __toESM(require_dist());
var import_ansi4 = __toESM(require_dist());
var highlight = (string) => c3.redBright(string.replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, c3.orange("$1")).replace(/({{2}-?[a-zA-Z0-9_\-.'"[\]]+-?}{2})/g, c3.teal("$1")).replace(/((?:www|http:|https:)+[^\s]+[\w])/g, c3.underline("$1")).replace(/(\/)(.*?)(\/)/g, c3.teal("$1") + c3.neonCyan("$2") + c3.teal("$3")).replace(/(\\)(\W)/g, c3.gray("$1") + c3.neonCyan("$2")).replace(/(:)(?= )/g, c3.gray("$1")).replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, c3.neonCyan.bold("$1")));
var tokens = (string) => string.replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>|:|,)/g, c3.neonCyan("$1")).replace(/(['"].*?['"])/g, c3.gray("$1"));
var extract = (text) => {
  let lines = "";
  const valid = text.indexOf("- Valid syntax:");
  if (valid > -1) {
    lines = "\n" + text.slice(valid).slice(1).replace(/(Valid syntax)(:)(.*)/, c3.redBright("$1") + c3.gray("$2") + c3.teal("$3"));
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
          (0, import_ansi4.glue)(
            import_ansi4.Tree.red,
            c3.red.bold(text.slice(0, lineIndex + 2)),
            "\n",
            import_ansi4.Tree.redTrim
          )
        );
        line = Number(text.slice(numberIndex + 6, lineIndex));
        space = (0, import_ansi4.sanitize)(line).length + 3;
        text = extract(text.slice(lineIndex + 2));
        output.push(
          (0, import_ansi4.glue)(
            highlight((0, import_ansi4.Wrap)(text, { line: import_ansi4.Tree.red, color: c3.redBright })),
            "\n",
            import_ansi4.Tree.redTrim,
            "\n",
            import_ansi4.Tree.redTrim
          )
        );
        if (source.length > 1) {
          const before = (0, import_ansi4.glue)(
            import_ansi4.Tree.redTrim,
            " ".repeat(space - (0, import_ansi4.sanitize)(line - 1).length),
            c3.blue(`${line - 1}`),
            " ",
            import_ansi4.Tree.trim
          );
          const current = (0, import_ansi4.glue)(
            import_ansi4.Tree.redTrim,
            " ",
            c3.red.bold(">"),
            " ",
            c3.blue(`${line}`),
            " ",
            import_ansi4.Tree.trim
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
          frame.push(before + c3.gray(prevLine));
          errLine = indent + errLine.trimStart();
          if (errLine.length > wrapLimit) {
            errLine = errLine.slice(0, wrapLimit - 3) + "...";
          }
          if (isNaN(column)) {
            frame.push(
              (0, import_ansi4.glue)(
                current,
                c3.white(tokens(errLine)),
                "\n",
                import_ansi4.Tree.redTrim
              )
            );
          } else {
            frame.push(
              current + c3.white(tokens(errLine)),
              (0, import_ansi4.glue)(
                import_ansi4.Tree.redTrim,
                " ".repeat(space - 1),
                import_ansi4.BAD,
                " ",
                import_ansi4.Tree.redTrim,
                " ".repeat(errLine.indexOf(match2)),
                c3.redBright("^".repeat(match2.length)),
                "\n" + import_ansi4.Tree.redTrim
              )
            );
          }
        }
      }
    } else {
      output.push(
        highlight(
          (0, import_ansi4.Wrap)(text, {
            line: import_ansi4.Tree.red,
            color: c3.redBright
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
var c4 = __toESM(require_dist());
function spawn(data) {
  const newlines = data.split("\n").reduce((acc, line) => {
    const ansi = detect(line);
    let before = "";
    let after = "";
    if (ansi !== false) {
      if (ansi.length > 2) {
        const chunk = getChunk(ansi, ansi.length / 2);
        before = c4.glue(chunk[0]);
        after = c4.glue(chunk[1] || "");
      } else {
        before = ansi[0];
        after = ansi[1] || "";
      }
    }
    const clean = line.trim().replace(new RegExp($.cwd, "g"), "");
    if (clean.length === 0) {
      acc.push([c4.Tree.trim]);
    } else {
      const prefix = [];
      const nwl2 = c4.wrapAnsi(clean, $.terminal.wrap, {
        hard: true
      }).split("\n");
      while (nwl2.length !== 0) {
        let line2 = nwl2.shift();
        if (nwl2.length !== 0) {
          if (nwl2[0].length === 1) {
            line2 = line2 + nwl2.shift();
          }
        }
        prefix.push(c4.Tree.line + before + line2 + after);
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
      if (format.length > 0 && format[format.length - 1] !== c4.Tree.trim) {
        format.push(c4.Tree.trim);
      }
      format.push(line.join("\n"));
    } else if (line === c4.Tree.trim) {
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
  (0, import_ansi5.update)(format.join("\n"));
}
function request(file, e, options) {
  const defaults3 = { log: true, store: false };
  const config = assign(defaults3, options);
  if (config.store === true) config.data = object();
  const response = hasPath2("error.asset", e.data) ? e.data.error.asset : hasPath2("errors.asset", e.data) ? e.data.errors.asset : null;
  if (e.status === 422) {
    const { value } = JSON.parse(e.config.data).asset;
    const { output: output2, line, column } = Shopify(response, value.split("\n"));
    const context2 = object({
      stack: false,
      entries: object({
        column,
        line,
        file: c4.TLD + file,
        details: e.statusText,
        status: c4.white(c4.sanitize(e.status)),
        processor: c4.neonMagenta("SHOPIFY API")
      })
    });
    const message2 = c4.Create({ type: "error" }).NL.Insert(output2, c4.gray).NL.Context(context2).toString();
    if (config.store) {
      config.data.message = output2;
      config.data.rawMessage = c4.strip(output2);
      config.data.context = context2;
    }
    if (config.log) error(message2);
    if (config.store) return config.data;
    return message2;
  }
  if (e.status in SHOPIFY_REQUEST_ERRORS) {
    const message2 = c4.Create({ type: "error" }).NL.Wrap(SHOPIFY_REQUEST_ERRORS[e.status]).toLine();
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
    const output2 = c4.glue(c4.Tree.red, "\n", message2, Context2(context2));
    if (config.log) error(output2);
    if (config.store) return config.data;
    return output2;
  }
  const message = c4.red("Unknown error has occured");
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
  const output = c4.glue(
    c4.Tree.red,
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
  const message = e instanceof Error ? has("message", e) ? e.message : e.toString() : e;
  if (has("stack", e)) context.stack = e.stack;
  if (has("code", e)) context.entries.code = e.code;
  if (has("name", e)) context.entries.name = e.name;
  if (context.stack === false) {
    error(
      c4.glue(
        Format(message, { type: "error" }),
        Context2(context)
      )
    );
    process.exit(0);
  } else {
    $.errors.add(
      c4.glue(
        Format(message, { type: "error" }),
        Context2(context)
      )
    );
  }
}
var write = (message, context) => (e) => {
  error(
    c4.glue(
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
  const message = c4.Create({ type: "error" }).NL.Wrap(e.message.split("\n")[0], c4.red.bold).NL;
  if (has("codeFrame", e)) {
    message.Newline();
    const lines = e.codeFrame.split("\n");
    const rawFrame = e.rawCodeFrame.split("\n");
    let i = 0;
    while (lines.length !== 0) {
      if (has("line", entries) === false) {
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
  while (trace.length !== 0) stack.push(c4.Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    message.NL.Context({
      stack: true,
      entries: {
        line,
        name: e.name,
        file: c4.TLD + file.relative,
        processor: c4.neonMagenta("JSON")
      }
    }).toString()
  );
}
function sass(file, e) {
  const message = c4.Create({ type: "error" }).NL.Wrap(e.sassMessage, c4.red.bold).Newline();
  if (has("span", e)) {
    const { span } = e;
    const code = has("context", span) ? span.context : span.text;
    if (code.length === 0) return "";
    message.Newline();
    const { start, end } = span;
    const space = c4.sanitize(end.line + 1).length;
    if (start.line === end.line) {
      let same = space - c4.sanitize(end.line).length;
      if (start.line > 1) message.Line(`${" ".repeat(same) + c4.blue(`${end.line}`)} ${c4.Tree.trim}`);
      same = space - c4.sanitize(end.line + 1).length;
      message.Line(`${" ".repeat(same) + c4.blue(`${end.line + 1}`)} ${c4.Tree.trim} ${code.trimEnd()}`);
      message.Line(`${" ".repeat(space - 1) + c4.BAD} ${c4.Tree.redTrim} ${" ".repeat(end.column) + c4.bold("^")}`);
    } else {
      const content = code.slice(span.start.offset, span.end.offset);
      const lines = content.split("\n");
      let from = span.start.line + 1;
      for (const line of lines) {
        const number = c4.sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        message.Line(`${align + c4.blue(number)} ${c4.Tree.trim} ${line}`);
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
        processor: c4.neonMagenta("SASS Dart")
      }
    }).toString()
  );
}
function esbuild(e) {
  const message = c4.Create({ type: "error" }).NL.Wrap(e.text, c4.red.bold).Newline();
  const span = e.location;
  const space = c4.sanitize(span.line).length;
  let same = space - c4.sanitize(e.location.line).length;
  if (span.line > 1) message.Line(`${" ".repeat(same) + c4.blue(`${span.line - 1}`)} ${c4.Tree.trim}`);
  same = space - c4.sanitize(span.line).length;
  error(
    message.Line(`${" ".repeat(same) + c4.blue(`${span.line}`)} ${c4.Tree.trim} ${span.lineText}`).Line(`${" ".repeat(space - 1) + c4.BAD} ${c4.Tree.redTrim} ${" ".repeat(span.column) + c4.bold("^")}`).NL.NL.Context({
      stack: false,
      entries: {
        suggest: c4.whiteBright(span.suggestion),
        line: e.location.line,
        column: e.location.column,
        plugin: e.pluginName,
        namespace: span.namespace,
        file: c4.TLD + e.location.file,
        processor: c4.neonMagenta("ESBuild")
      }
    }).toString()
  );
}
function postcss(file, e) {
  const stack = [];
  const trace = c4.cleanStack(e.stack, { pretty: true, basePath: $.cwd }).split("\n");
  while (trace.length !== 0) stack.push(c4.Tree.red + trace.shift());
  $.errors.add(stack.join("\n"));
  error(
    c4.Create({ type: "error" }).NL.Wrap(`${e.name}${c4.COL} ${e.reason}`, c4.red.bold).Newline().Multiline(e.showSourceCode(true)).NL.NL.Context({
      stack: true,
      entries: {
        line: e.line,
        column: e.column,
        source: file.input,
        file: file.input === e.file ? void 0 : e.file,
        plugin: c4.blue(e.plugin),
        processor: c4.neonMagenta("PostCSS")
      }
    }).toString()
  );
}

// syncify/log/loggers.ts
var c6 = __toESM(require_dist());

// syncify/log/runtime.ts
init_esm_shims();
import { relative } from "node:path";
var c5 = __toESM(require_dist());
var runtime = function($2) {
  clear3();
  if ($2.log.config.silent) return;
  $2.env.tree = true;
  const message = c5.Create().BR.Top("Syncify").NL.Line(`v${$2.version}`, c5.bold.whiteBright);
  if ($2.terminal.cols < 80) {
    message.Newline("red").Error("TERMINAL WIDTH WARNING", c5.bold).Newline("red").Error(`Your terminal width is below ${c5.bold(`${100}`)} columns (currently ${c5.bold(`${$2.terminal.cols}`)})`).Error("This is not recommended for usage with Syncify (size matters).").Error("Expand your terminal wider for an optimal logging experience.");
  }
  log(message.toLine());
};
runtime.time = function() {
  log(
    c5.Break(c5.lightGray(`Started in ${timer.stop("runtime")}`))
  );
};
runtime.modes = function($2) {
  const message = c5.Create();
  let seq = $2.env.prod ? "--prod" : "--dev";
  if ($2.mode.themes) {
    return log(
      message.Wrap(
        "Select theme target/s to be inserted into your package.json file.",
        "You will be given a code example after selecting where you will define",
        "a custom target name. If you would like to create a new theme, then run",
        `the ${c5.cyan("publish")} resource`,
        c5.gray
      ).toLine()
    );
  }
  if ($2.mode.cache) {
    if (seq !== "") {
      seq += ` ${c5.TLD} cache`;
    } else {
      seq += "cache";
    }
  }
  if ($2.mode.clean) {
    if (seq !== "") {
      seq += ` ${c5.TLD} clean`;
    } else {
      seq += "clean";
    }
  }
  if ($2.spawn.invoked) {
    if (seq !== "") {
      seq += ` ${c5.TLD} build`;
    } else {
      seq += "build";
    }
  }
  if ($2.mode.build) {
    if (seq !== "") {
      seq += ` ${c5.TLD} build`;
    } else {
      seq += "build";
    }
  }
  if ($2.mode.export) {
    if (seq !== "") {
      seq += ` ${c5.TLD} export`;
    } else {
      seq += "export";
    }
  }
  if ($2.mode.publish) {
    if (seq !== "") {
      seq += ` ${c5.TLD} publish`;
    } else {
      seq += "publish";
    }
  }
  if ($2.mode.import) {
    if (seq !== "") {
      seq += ` ${c5.TLD} import`;
    } else {
      seq += "import";
    }
  }
  if ($2.mode.watch) {
    if (seq !== "") {
      seq += ` ${c5.TLD} watch`;
    } else {
      seq += "watch";
    }
    if ($2.mode.hot) {
      seq += ` ${c5.TLD} hot`;
    }
  }
  if (seq !== "") {
    message.Line(seq, c5.gray);
    seq = "";
  }
  if (!isEmpty2($2.filters)) {
    message.NL.Line(`Filters${c5.COL}`, c5.white.bold);
    const space = c5.eq($2.filters);
    for (const group2 in $2.filters) {
      const join24 = c5.white($2.filters[group2].map((k) => relative($2.cwd, k)).join(", "));
      message.Line(` ${c5.TLD} ${group2}${c5.COL}${space(group2)}${join24}`, c5.neonCyan);
    }
  }
  log(message.toLine());
};
runtime.spawns = function($2) {
  if ($2.mode.build || $2.mode.watch) {
    const message = c5.Create().Line(`Spawned${c5.COL}`, c5.white.bold);
    const space = c5.eq($2.spawn.commands);
    for (const name in $2.spawn.commands) {
      const sp = space(name);
      const pid = $2.spawn.commands[name].pid;
      message.Line(` ${c5.TLD} ${c5.neonCyan(name)}${c5.COL}${sp}PID ${c5.ARR} #${c5.pink(`${pid}`)}`, c5.gray);
    }
    log(message.toLine());
  }
};
runtime.stores = function($2) {
  const text = c5.Create();
  const size = $2.sync.themes.length;
  if (allFalse($2.mode.upload, $2.mode.import, $2.mode.build, $2.mode.clean)) {
    if (size > 0) {
      text.Line(`Editors${c5.COL}`, c5.bold.white);
      getThemeURLS(text, $2.sync.themes, "editor");
    }
  }
  if (anyTrue($2.mode.upload, $2.mode.import, $2.mode.watch)) {
    if (size > 0) {
      if ($2.mode.upload || $2.mode.import) {
        text.NL.Line(`Targets${c5.COL}`, c5.bold.white);
      } else {
        text.NL.Line(`Previews${c5.COL}`, c5.bold.white);
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
  const message = c5.Create({ type: "warning" }).Line(`${amount} ${plural("Warning", amount)}`, c5.bold);
  for (const key of props) {
    const item = warnings[key];
    if (item.length > 0) {
      if (item.length === amount) {
        message.Newline().Line(`${key} ${plural("Warning", item.length)}`, c5.bold).Newline();
      } else {
        message.Newline().Line(`${item.length} ${key} ${plural("Warning", item.length)}`, c5.bold);
      }
      for (const text of item) {
        message.Line(`${c5.DSH} ${text}`, c5.yellowBright);
      }
    }
  }
  warn(message.toString());
};
function getThemeURLS(text, themes2, url) {
  const width = themes2.reduce((size, { target, store }) => {
    const name = store.indexOf(".");
    if (name > size.store) size.store = name;
    if (target.length > size.theme) size.theme = target.length;
    return size;
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
        c5.TLD,
        c5.pink(name),
        " ".repeat(width.store - name.length),
        c5.ARR,
        " ",
        c5.pink.bold(target),
        " ".repeat(width.theme - target.length),
        c5.ARR,
        " ",
        c5.gray.underline(type2)
      )
    );
  }
}

// syncify/log/loggers.ts
var import_ansi5 = __toESM(require_dist());
var spinner = c6.Spinner();
var renamed = [];
var hline = (options = {}) => {
  if (isEmpty(options)) {
    options.width = $.terminal.wrap;
    options.newlines = false;
  } else {
    assign({
      width: $.terminal.wrap,
      newlines: false
    }, options);
  }
  log(
    c6.Ruler(
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
          c6.LineRed(color ? color(message) : c6.redBright(message)),
          c6.Append(suffix)
        )
      );
    } else {
      error(
        c6.LineRed(
          (color || c6.redBright)(
            c6.Prefix(
              prefix,
              glueString(
                message,
                c6.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else if (type2 === "warning") {
    if (prefix === null) {
      log(
        c6.LineYellow(
          glueString(
            color ? color(message) : c6.yellowBright(message),
            c6.Append(suffix)
          )
        )
      );
    } else {
      log(
        c6.LineYellow(
          (color || c6.yellowBright)(
            c6.Prefix(
              prefix,
              glueString(
                message,
                c6.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else {
    if (prefix === null) {
      log(
        c6.Line(
          glueString(
            color ? color(message) : c6.whiteBright(message),
            c6.Append(suffix)
          )
        )
      );
    } else {
      log(
        c6.Line(
          (color || c6.whiteBright)(
            c6.Prefix(
              prefix,
              glueString(
                message,
                c6.Append(suffix)
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
    log(c6.Tree.red);
  } else if (entry === "yellow") {
    log(c6.Tree.yellow);
  } else {
    log(c6.Tree.line);
  }
};
var clear3 = (force = false) => {
  if (force === false && $.log.config.clear === false) return;
  const count = stdout2.rows - 2;
  log(count > 0 ? "\n".repeat(count) : "");
  cursorTo(stdout2, 0, 0);
  clearScreenDown(stdout2);
};
var group = (name) => {
  if ($.log.config.silent || $.env.tree === false) return;
  log(c6.End($.log.group));
  if ($.log.config.clear && name !== false) clear3();
  if (isString(name)) {
    $.log.group = name;
    log("\n" + c6.Top($.log.group));
  }
};
var task = (name) => {
  if ($.log.config.silent || $.env.tree === false) return;
  if (isString(name)) {
    log(c6.Dash(c6.gray(name) + " " + c6.Append(getTime2())));
  } else {
    clear3();
    log(
      c6.Tree.line + "\n" + c6.Dash(
        glueString(
          c6.gray($.log.group),
          c6.Append(getTime2())
        )
      )
    );
  }
};
var process2 = (label, ...message) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if (message.length === 2) {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "process",
            glueString(
              c6.bold(label),
              c6.CHV,
              message[0],
              c6.Append(message[1])
            )
          )
        )
      )
    );
  } else {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "process",
            glueString(
              c6.bold(label),
              c6.Append(message[0])
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
  const name = glueString(file.kind, c6.CHV, toUpcase(file.namespace));
  const change = has(file.relative, $.log.changes) ? $.log.changes[file.relative] + 1 : 1;
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
    c6.NextLine(
      c6.neonCyan(
        c6.Prefix("changed", glueString(
          file.relative,
          c6.Append(`${change} change${change > 1 ? "s" : ""}`)
        ))
      )
    )
  );
  if (renamed.length > 0) log(renamed.shift());
};
var minified = (...p) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if (p.length === 1) {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix("minified", c6.bold(p[0]))
        )
      )
    );
  } else if (p.length === 4) {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "minified",
            glueString(
              c6.bold(p[0]),
              c6.ARR,
              p[1],
              c6.ARL,
              p[2],
              c6.TLD,
              "saved",
              p[3]
            )
          )
        )
      )
    );
  } else {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "minified",
            glueString(
              c6.bold(p[0]),
              c6.ARL,
              p[1],
              c6.TLD,
              "saved",
              p[2],
              c6.Append(
                timer.now()
              )
            )
          )
        )
      )
    );
  }
};
var syncing = (path4, { hot: hot2 = false } = {}) => {
  if ($.mode.export || $.mode.build || $.log.config.silent) return;
  if ($.warnings.has(path4)) {
    log(
      c6.LineYellow(
        c6.yellowBright(
          c6.Prefix(
            "warning",
            glueString(
              c6.sanitize($.warnings.get(path4).size),
              plural("warning", $.warnings[path4].size),
              c6.Suffix.warning
            )
          )
        )
      )
    );
  }
  log(
    c6.Line(
      c6.magentaBright(
        c6.Prefix("syncing", path4)
      )
    )
  );
  if (queue.pending > (hot2 ? 0 : 2)) {
    log(
      c6.Line(
        c6.orange(
          c6.Prefix("queued", glueString(path4, c6.TLD, c6.bold(addSuffix(queue.pending)), "in queue"))
        )
      )
    );
  }
};
var prompt = (message, notify) => {
  log(
    c6.Line(
      c6.orange(
        c6.Prefix("prompt", message)
      )
    ),
    c6.End($.log.group)
  );
  if (isObject(notify)) notifier.notify(notify).notify();
  return () => log(c6.Top($.log.group));
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
          c6.Line(
            c6.neonGreen(
              c6.Prefix(
                "uploaded",
                glueString(
                  c6.bold(type3),
                  c6.ARR,
                  store2,
                  c6.Append(ctime)
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
      c6.Line(
        c6.neonGreen(
          c6.Prefix(
            "uploaded",
            glueString(
              c6.bold(type2),
              c6.ARR,
              store.domain,
              c6.Append(timer.stop())
            )
          )
        )
      )
    );
  }
};
var upload = (theme2) => {
  if ($.log.config.silent) return;
  if ($.mode.watch) {
    $.log.queue.add([theme2.target, theme2.store, timer.stop()]);
    if ($.log.idle) return;
    else $.log.idle = true;
    queue.onIdle().then(() => {
      for (const [
        target,
        store,
        ctime
      ] of $.log.queue) {
        log(
          c6.Line(
            c6.neonGreen(
              c6.Prefix("uploaded", c6.bold(target), store, ctime)
            )
          )
        );
      }
      $.log.queue.clear();
      $.log.idle = false;
    });
  } else {
    log(
      c6.Line(
        c6.neonGreen(
          c6.Prefix("uploaded", c6.bold(theme2.target), theme2.store, timer.stop())
        )
      )
    );
  }
};
var invalid = (path4, message) => {
  log(
    c6.LineRed(
      c6.red(
        c6.Prefix("invalid", path4)
      )
    )
  );
  notifier.notify(
    {
      title: "Syncify Error",
      sound: "Pop",
      open: path4,
      subtitle: path4,
      message: "Invalid error"
    }
  ).notify();
  if (message) {
    error(
      Multiline2(
        message,
        {
          type: "error",
          color: c6.red.bold
        }
      )
    );
  }
};
var error2 = (input, { suffix = null, notify = null } = {}) => {
  error(
    c6.LineRed(
      c6.red(
        c6.Prefix("error", suffix ? input + " " + c6.Append(suffix) : input)
      )
    )
  );
  if (notify !== null) {
    notifier.notify(notify).notify();
  }
};
var spawn2 = (name) => {
  return function(...input) {
    if (!$.spawn.invoked) $.spawn.invoked = true;
    if ($.log.group !== "Spawn") {
      log(c6.End($.log.group));
      if ($.log.group !== "Syncify") clear3();
      log(c6.Top("Spawn"));
      $.log.group = "Spawn";
    }
    if ($.log.title !== name) {
      log(c6.Next(c6.neonCyan(name)));
      $.log.title = name;
    }
    spawn.call(this, input.toString());
  };
};
var warn2 = (message, suffix) => {
  if (suffix) {
    log(
      c6.LineYellow(
        c6.yellowBright(
          c6.Prefix("warning", message) + c6.Append(suffix)
        )
      )
    );
  } else {
    log(
      c6.LineYellow(
        c6.yellowBright(
          c6.Prefix("warning", message)
        )
      )
    );
  }
};
var retrying = (file, theme2) => {
  log(
    c6.Line(
      c6.orange(
        c6.Prefix("retrying", file, theme2.target, theme2.store)
      )
    )
  );
};
var deleted = (file, theme2) => {
  log(
    c6.Line(
      c6.blueBright(
        c6.Prefix("deleted", file, theme2.target, theme2.store)
      )
    )
  );
};
var transform = (label, ...suffix) => {
  if ($.mode.build) return;
  if (suffix.length > 0) {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "transform",
            glueString(
              c6.bold(label),
              c6.ARR,
              suffix[0],
              suffix.length === 2 ? glueString(
                c6.ARR,
                suffix[1]
              ) : suffix.length === 3 ? glueString(
                c6.ARR,
                suffix[1],
                c6.Append(suffix[2])
              ) : ""
            )
          )
        )
      )
    );
  } else {
    log(
      c6.Line(
        c6.whiteBright(
          c6.Prefix(
            "transform",
            c6.bold(label)
          )
        )
      )
    );
  }
};
var zipped = (size, path4) => {
  log(
    c6.Line(
      c6.whiteBright(
        c6.Prefix(
          "zipped",
          glueString(
            c6.bold("ZIP"),
            size,
            c6.Append(path4)
          )
        )
      )
    )
  );
};
var skipped = (file, reason) => {
  if ($.mode.export || $.mode.build) return;
  log(
    c6.Line(
      c6.Prefix(
        "skipped",
        glueString(
          isString(file) ? file : file.key,
          c6.Append(reason)
        )
      )
    )
  );
};
var title = (label) => {
  log(
    c6.Break(
      c6.whiteBright.bold(label)
    )
  );
};
var rename = (from, to) => {
  renamed.push(
    c6.Line(
      c6.whiteBright(
        c6.Prefix(
          "renamed",
          glueString(
            c6.bold(from),
            c6.ARL,
            c6.bold(to)
          )
        )
      )
    )
  );
};
var hot = (id) => {
  log(
    c6.Line(
      c6.neonRouge(
        c6.Prefix(
          "reloaded",
          glueString(
            c6.bold("HOT RELOAD"),
            c6.Append(timer.now(id))
          )
        )
      )
    )
  );
};
var exported = (from, to) => {
  if ($.mode.build) return;
  log(
    c6.Line(
      c6.teal(
        c6.Prefix(
          "exported",
          glueString(
            c6.bold(from),
            c6.ARR,
            c6.bold(to)
          )
        )
      )
    )
  );
};
var version = (vc, type2) => {
  log(
    c6.Line(
      c6.whiteBright(
        c6.Prefix(
          "version",
          glueString(
            vc.number,
            c6.ARL,
            vc.update.number,
            c6.Append(type2)
          )
        )
      )
    )
  );
};

// syncify/requests/assets.ts
async function find(asset, theme2) {
  const request2 = merge($.sync.stores[theme2.sidx].client, {
    method: "get",
    url: theme2.url,
    params: { "asset[key]": asset }
  });
  return axios(request2).then(({ data }) => data.asset.value).catch(() => false);
}
async function get(theme2, config) {
  const request2 = merge(config, { method: "get", url: theme2.url });
  try {
    const { data } = await axios(request2);
    return data;
  } catch (e) {
    if (e.response && (e.response.status === 429 || e.response.status === 500)) {
      if (config.params["asset[key]"]) {
        retrying(config.params["asset[key]"], theme2);
        queue.add(() => get(theme2, config));
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
async function sync(theme2, file, config) {
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
      deleted(file.relative, theme2);
    } else {
      if ($.mode.watch) {
        $.mode.hot === true && file.type !== 10 /* Script */ && file.type !== 9 /* Style */ && hot();
        upload(theme2);
      } else if ($.mode.upload) {
        event.emit("upload", {
          status: 0 /* Success */,
          get theme() {
            return theme2;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        event.emit("import", {
          status: 0 /* Success */,
          get theme() {
            return theme2;
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
        retrying(file.key, theme2);
      }
      queue.add(() => sync(theme2, file, config));
      if ($.mode.upload) {
        event.emit("upload", {
          status: 1 /* Retry */,
          get theme() {
            return theme2;
          },
          get file() {
            return file;
          }
        });
      } else if ($.mode.import) {
        event.emit("import", {
          status: 1 /* Retry */,
          get theme() {
            return theme2;
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
            return theme2;
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
              return theme2;
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
              return theme2;
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
init_esm_shims();
import axios2 from "axios";
import { stat, writeJson, mkdir, pathExists } from "fs-extra";
var c7 = __toESM(require_dist());
async function find2(store, field) {
  if (arguments.length === 1) return (_field) => find2(store, _field);
  if (allFalse(has2("namespace", field), has2("key", field))) {
    invalid("invalid fields");
    return void 0;
  }
  return axios2.get("metafields.json", store.client).then(({ data }) => {
    return data.metafields.find((m) => field.namespace === m.namespace && field.key === m.key);
  }).catch((e) => {
    console.log(e);
    return void 0;
  });
}
async function create2(store, metafield) {
  if (arguments.length === 1) return (_metafield) => create2(store, _metafield);
  metafield.type = "json";
  metafield.namespace = "email";
  metafield.value_type = "json_string";
  metafield.key = "eng";
  return axios2.post("metafields.json", { metafield }, store.client).then(({ data }) => {
    console.log("created", data);
    return data.metafield;
  }).catch((e) => {
    console.log(e);
    if (!store.queue) return request(metafield.namespace, e.response);
    if (requeue(e.response.status)) {
      queue.add(() => create2(store, metafield));
      return void 0;
    } else {
      return request(store.store, e.response);
    }
  });
}
async function update3(store, id, metafield) {
  if (is(arguments.length, 1)) return (_id, _field) => update3(store, _id, _field);
  return axios2.put(`metafields/${id}.json`, { metafield }, store.client).then((d) => {
    console.log("created");
    return d.data.metafield;
  }).catch((e) => {
    if (!store.queue) return request(metafield.namespace, e.response);
    if (requeue(e.response.status)) {
      queue.add(() => update3(store, id, metafield));
    } else {
      return request(store.store, e.response);
    }
  });
}
async function sync2(store, field) {
  if (is(arguments.length, 1)) return (_field) => sync2(store, _field);
  const data = await find2(store, field);
  if (!data) return create2(store, field);
  return update3(store, data.id, assign(field, { id: data.id, type: "json" })).catch((e) => {
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
      await queue.add(() => pMap(themes2, async (theme2) => {
        if ($.mode.upload) timer.start(file.uuid);
        await sync(theme2, file, assign(
          { url: theme2.url },
          stores[theme2.sidx].client,
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
init_esm_shims();
import { join as join5, parse as parse2, relative as relative2, basename as basename4 } from "node:path";

// syncify/process/context.ts
init_esm_shims();
import { join as join4, dirname as dirname3, basename as basename3 } from "node:path";

// syncify/utils/paths.ts
init_esm_shims();
var import_ansi6 = __toESM(require_dist());
import { join as join2, dirname, resolve, basename } from "node:path";
function globPath(path4) {
  return isArray(path4) ? path4.filter((uri) => /\*/.test(uri)) : /\*/.test(path4) ? path4 : null;
}
function lastPath(path4) {
  if (isArray(path4)) return path4.map(lastPath);
  if (path4.indexOf("/") === -1) return path4;
  const dir = path4.endsWith("/") ? dirname(path4.slice(0, -1)) : dirname(path4);
  const ender = dir.lastIndexOf("/") + 1;
  return dir.slice(ender);
}
function parentPath(path4) {
  if (isArray(path4)) return path4.map(parentPath);
  const last2 = path4.lastIndexOf("/");
  if (last2 === -1) return path4;
  const glob8 = path4.indexOf("*");
  return glob8 === -1 ? path4.slice(0, last2) : path4.slice(0, glob8);
}
function normalPath(input, cwd = null) {
  const regex = new RegExp(`^\\.?\\/?${input}\\/`);
  const source = new RegExp(`^\\.?\\/?${basename(input)}\\/`);
  return function prepend(path4) {
    if (Array.isArray(path4)) return path4.map(prepend);
    const ignore = path4.charCodeAt(0) === 33;
    if (ignore) path4 = path4.slice(1);
    if (regex.test(path4)) return ignore ? "!" + path4 : path4;
    if (path4.charCodeAt(0) === 46 && path4.charCodeAt(1) === 46 && path4.charCodeAt(2) === 47) {
      throwError(
        `Invalid path defined at: ${import_ansi6.COL} ${(0, import_ansi6.yellowBright)(`"${path4}"`)}`,
        ["Paths must be relative to source"]
      );
    }
    if (cwd !== null) {
      const exists2 = join2(cwd, path4);
      return (ignore ? "!" : "") + (exists2.startsWith(input) ? exists2 : join2(input, path4));
    } else {
      return (ignore ? "!" : "") + join2(input, source.test(path4) ? path4.replace(source, "") : path4);
    }
  };
}
var basePath = (cwd) => (path4) => {
  if (path4.indexOf("*") !== -1) {
    throwError(
      `Base directory path cannot contain glob${import_ansi6.COL} ${(0, import_ansi6.yellowBright)(`"${path4}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
  if (path4.charCodeAt(0) === 46) {
    if (path4.length === 1) return cwd + "/";
    if (path4.charCodeAt(1) === 47) {
      path4 = path4.slice(1);
    } else {
      throwError(
        `Directory path is invalid at${import_ansi6.COL} ${(0, import_ansi6.yellowBright)(`"${path4}"`)}`,
        ["Ensure the path you are resolving is correctly formed"]
      );
    }
  }
  if (path4.charCodeAt(0) === 47) {
    if (path4.length === 1) {
      return cwd + "/";
    } else {
      path4 = path4.slice(1);
    }
  }
  if (/^[a-zA-Z0-9_-]+/.test(path4)) {
    path4 = join2(cwd, path4);
    return last(path4).charCodeAt(0) === 47 ? path4 : path4 + "/";
  } else {
    throwError(
      `Directory path is invalid at${import_ansi6.COL} ${(0, import_ansi6.yellowBright)(`"${path4}"`)}`,
      ["Ensure that path you are resolving is correctly formed"]
    );
  }
};

// syncify/utils/options.ts
init_esm_shims();
var import_anymatch = __toESM(require_anymatch());
import { basename as basename2, extname as extname2 } from "node:path";
import glob from "fast-glob";
import { pathExists as pathExists2 } from "fs-extra";

// syncify/requests/require.ts
init_esm_shims();
var import_ansi7 = __toESM(require_dist());
import { pathToFileURL } from "node:url";
import { isAbsolute, dirname as dirname2, extname, join as join3, parse, resolve as resolve2 } from "node:path";
import { build } from "esbuild";
import { readFile, unlink, existsSync, readFileSync, writeFileSync } from "fs-extra";
function findUp(name, startDir, stopDir = parse(startDir).root) {
  let dir = startDir;
  while (dir !== stopDir) {
    const file = join3(dir, name);
    if (existsSync(file)) return file;
    if (extname(file) !== ".json") {
      const path4 = file + ".json";
      if (existsSync(path4)) return path4;
    }
    dir = dirname2(dir);
  }
  return null;
}
function getTSConfigFromFile(cwd, filename) {
  if (!existsSync(join3(cwd, filename))) return null;
  return isAbsolute(filename) ? existsSync(filename) ? filename : null : findUp(filename, cwd);
}
function getTSConfigFromExtends(cwd, name) {
  if (isAbsolute(name)) return existsSync(name) ? name : null;
  if (name.startsWith(".")) return findUp(name, cwd);
  return __require.resolve(name, { paths: [cwd] });
}
function getTSConfig(dir = process.cwd(), name = "tsconfig.json", isExtends = false) {
  dir = resolve2(dir);
  const id = isExtends ? getTSConfigFromExtends(dir, name) : getTSConfigFromFile(dir, name);
  if (!id) return null;
  const data = jsonc(readFileSync(id, "utf-8"));
  const configDir = dirname2(id);
  if (has("baseURL", data.compilerOptions)) {
    data.compilerOptions.baseUrl = join3(configDir, data.compilerOptions.baseUrl);
  }
  const extendsFiles = [];
  if (data.extends) {
    const extendsList = isArray(data.extends) ? data.extends : [data.extends];
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
function defaultGetOutputFile(path4, format) {
  return path4.replace(REGEX_EXTJS, `.bundled_${uuid()}.${format === "esm" ? "mjs" : "cjs"}`);
}
function isCommonJSorESM(inputFile) {
  if (typeof jest === "undefined") return "cjs";
  const ext = extname(inputFile);
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
        if (args.path.charCodeAt(0) === 46 || isAbsolute(args.path)) return;
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
        const contents = await readFile(args.path, "utf-8");
        const injectLines = [
          `const __injected_filename__ = ${JSON.stringify(args.path)};`,
          `const __injected_dirname__ = ${JSON.stringify(dirname2(args.path))};`,
          `const __injected_import_meta_url__ = ${JSON.stringify(pathToFileURL(args.path).href)};`
        ];
        return {
          contents: (0, import_ansi7.glue)(injectLines) + contents,
          loader: inferLoader(extname(args.path))
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
    const outfile = getOutputFile(options.filepath, format);
    writeFileSync(outfile, text, "utf8");
    let mod;
    const req = options.require || dynamicImport;
    try {
      mod = await req(format === "esm" ? pathToFileURL(outfile).href : outfile, { format });
    } finally {
      if (!preserveTemporaryFile) await unlink(outfile);
    }
    return {
      mod,
      dependencies: result.metafile ? keys(result.metafile.inputs) : []
    };
  }
  ;
  const ctx = await build({
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
  return extractResult(ctx);
}

// syncify/utils/options.ts
var import_ansi8 = __toESM(require_dist());
function getStoresFromEnv() {
  const stores = [];
  const admin = /* @__PURE__ */ new Set();
  const getStorefrontPassword = (domain) => {
    const lowercase = `${domain}_password`;
    const uppercase = lowercase.toUpperCase();
    return lowercase in $.env.vars ? $.env.vars[lowercase] : uppercase in $.env.vars ? $.env.vars[uppercase] : null;
  };
  for (const prop in $.env.vars) {
    const p = prop.toLowerCase();
    if (p.endsWith("_api_token")) {
      const domain = p.slice(0, p.indexOf("_api_token"));
      const password = getStorefrontPassword(domain);
      stores.push({
        domain,
        password,
        themes: {}
      });
    } else if (p.endsWith("_api_key")) {
      const domain = `${p.slice(0, p.indexOf("_api_key"))}`;
      if (!admin.has(domain)) {
        const password = getStorefrontPassword(domain);
        stores.push({ domain, password, themes: {} });
        admin.add(domain);
      }
    } else if (p.endsWith("_api_secret")) {
      const domain = `${p.slice(0, p.indexOf("_api_secret"))}`;
      if (!admin.has(domain)) {
        const password = getStorefrontPassword(domain);
        stores.push({ domain, password, themes: {} });
        admin.add(domain);
      }
    }
  }
  if (stores.length > 0) return stores;
  missingEnv($.cwd);
}
function authURL(domain) {
  let api_token = domain + "_api_token";
  if (!has(api_token, $.env.vars)) {
    api_token = api_token.toUpperCase();
  }
  if (has(api_token, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { "X-Shopify-Access-Token": $.env.vars[api_token] }
    };
  }
  let api_key = domain + "_api_key";
  let api_secret = domain + "_api_secret";
  if (!has(api_key, $.env.vars)) {
    api_key = api_key.toUpperCase();
  }
  if (!has(api_secret, $.env.vars)) {
    api_secret = api_secret.toUpperCase();
  }
  if (has(api_key, $.env.vars) && has(api_secret, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: $.env.vars[api_key],
        password: $.env.vars[api_secret]
      }
    };
  }
  throwError(
    `Invalid or missing ${(0, import_ansi8.cyan)(domain + ".myshopify.com")} credentials`,
    [
      `Your shop credentials in the ${import_ansi8.cyan.bold(basename2($.env.file))} file could`,
      "not be read correctly or are missing. Please check your environment file and ensure",
      "you have provided valid authorization."
    ]
  );
}
function getResolvedPaths(filePath, hook) {
  const { cwd } = $;
  const match2 = isFunction(hook) ? [] : false;
  const warn3 = warnOption("Path Resolver");
  const path4 = normalPath($.dirs.input, $.cwd);
  if (isArray(filePath)) {
    const paths2 = [];
    for (const item of filePath) {
      const uri = path4(item);
      const resolved = glob.sync(uri, { cwd, absolute: true });
      if (match2 !== false) {
        const test = hook(uri);
        if (isString(test)) {
          match2.push(test);
        } else if (isArray(test)) {
          match2.push(...test);
        }
      }
      if (resolved.length === 0) {
        warn3("No files can be resolved in", item);
      } else {
        paths2.push(...resolved);
      }
    }
    return match2 === false ? paths2 : { paths: paths2, match: (0, import_anymatch.default)(match2) };
  }
  if (isString(filePath)) {
    const uri = path4(filePath);
    const paths2 = glob.sync(uri, { cwd });
    if (paths2.length === 0) {
      warn3("No files can be resolved in", filePath);
    }
    if (match2 !== false) {
      const test = hook(uri);
      if (isString(test)) {
        match2.push(test);
      } else if (isArray(test)) {
        match2.push(...test);
      }
    }
    return match2 === false ? paths2 : { paths: paths2, match: (0, import_anymatch.default)(match2) };
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
    const { paths: paths2, match: match2 } = getResolvedPaths(transforms, (watch2) => {
      if (opts.addWatch) $.watch.add(watch2);
      return globPath(watch2);
    });
    if (paths2) {
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: basename2(input),
          snippet: false
        } : {
          input,
          rename: basename2(input)
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
  } else if (isArray(transforms)) {
    if (transforms.every(isString)) {
      const { paths: paths2, match: match2 } = getResolvedPaths(transforms, (watch2) => {
        if (opts.addWatch) $.watch.add(watch2);
        return globPath(watch2);
      });
      if (opts.flatten) {
        return paths2.map((input) => opts.assertSnippet ? {
          input,
          rename: basename2(input),
          snippet: false
        } : {
          input,
          rename: basename2(input)
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
        if (!has("input", option)) {
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
      const { paths: paths2, match: match2 } = getResolvedPaths(record.input, (watch2) => {
        if (opts.addWatch) $.watch.add(watch2);
        return globPath(watch2);
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
        record.match = match2;
        config.push(record);
      }
    } else {
      for (const prop in transforms) {
        const record = { snippet: prop.startsWith("snippets/") };
        const asset = prop.startsWith("assets/");
        const option = transforms[prop];
        const rename2 = asset || record.snippet;
        if (isString(option)) {
          if (rename2) {
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
          if (!has("input", option)) {
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
            const merge2 = rename2 ? assign({}, option, record, { rename: asset ? prop.slice(7) : prop.slice(9) }) : assign({}, record, option);
            if (opts.flatten) {
              for (const input of paths2) {
                config.push(assign({}, merge2, { input }));
              }
            } else {
              config.push(assign(merge2, { input: paths2, match: match2 }));
            }
          }
        } else if (isArray(option)) {
          if (option.every(isString)) {
            const { paths: paths2, match: match2 } = getResolvedPaths(option, (watch2) => {
              if (opts.addWatch) $.watch.add(watch2);
              return globPath(watch2);
            });
            if (hasRenameNamespace(prop)) record.rename = basename2(prop);
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
    const fileExists = await pathExists2(filepath);
    if (fileExists) return filepath;
  }
  return null;
}
async function readConfigFile(filename, options) {
  try {
    const path4 = await getConfigFilePath(filename);
    if (path4 !== null) {
      const config = await bundleRequire({
        cwd: $.cwd,
        filepath: path4,
        ...options || {}
      });
      return {
        path: path4,
        config: config.mod.syncify || config.mod.default || config.mod
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}
function hasRenameNamespace(rename2) {
  return /\[(?:file|name|dir|ext)\]/.test(rename2);
}
function renameFileParse(src, pattern) {
  let rename2 = pattern;
  const dir = lastPath(src);
  const ext = extname2(src);
  const file = basename2(src, ext);
  if (isUndefined(pattern)) return { dir, ext, file, name: file, base: file + ext };
  if (/(\[dir\])/.test(rename2)) rename2 = rename2.replace("[dir]", dir);
  if (/(\[name\])/.test(rename2)) rename2 = rename2.replace("[name]", file);
  if (/(\[file\])/.test(rename2)) rename2 = rename2.replace("[file]", file);
  if (/(\.?\[ext\])/.test(rename2)) rename2 = rename2.replace(/\.?\[ext\]/, ext);
  const name = pattern.replace(pattern, rename2);
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
    file.namespace = "snippets" /* Snippets */;
    file.key = join4("snippets", config.rename);
  } else {
    file.key = join4("assets", config.rename);
  }
  if (file.output) {
    if (file.data.rename !== basename3(file.output)) {
      if (config.snippet) {
        file.output = join4($.dirs.output, file.key);
      } else {
        file.output = join4(parentPath(file.output), file.data.rename);
      }
    }
  } else {
    file.output = join4($.dirs.output, file.key);
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
  if (file.base.endsWith("-group.json")) return file;
  if ($.paths.sections.rename.length > 0) {
    const path4 = file.input;
    const find4 = $.paths.sections.rename.find(([match2]) => match2(path4));
    if (isUndefined(find4)) return file;
    const oldName = file.base;
    const rename2 = renameFileParse(file.input, find4[1]);
    file.name = rename2.name;
    file.ext = rename2.ext;
    file.base = rename2.base;
    file.key = join4(file.namespace, rename2.base);
    file.output = join4(dirname3(file.output), rename2.base);
    rename(oldName, file.base);
  }
  return file;
}
function snippet(file) {
  if ($.paths.snippets.rename.length > 0) {
    const path4 = file.input;
    const find4 = $.paths.snippets.rename.find(([match2]) => match2(path4));
    if (isUndefined(find4)) return file;
    const oldName = file.base;
    const rename2 = renameFileParse(file.input, find4[1]);
    file.name = rename2.name;
    file.ext = rename2.ext;
    file.base = rename2.base;
    file.key = join4(file.namespace, rename2.base);
    file.output = join4(dirname3(file.output), rename2.base);
    rename(oldName, file.base);
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
function renameFile({ name, dir, ext, namespace }, rename2) {
  let newName = rename2;
  if (/\[dir\]/.test(newName)) newName = newName.replace(/\[dir\]/g, dir);
  if (/\[name\]/.test(newName)) newName = newName.replace(/\[name\]/g, name);
  if (/\[file\]/.test(newName)) newName = newName.replace(/\[file\]/g, name);
  if (/\[ext\]/.test(newName)) newName = newName.replace(/\[ext\]/g, ext);
  if (namespace === "snippets" && rename2.endsWith(".liquid") === false) return newName + ".liquid";
  if (!rename2.endsWith(".[ext]") || !rename2.endsWith(ext)) {
    return /\.[a-z]+$/.test(rename2) ? newName : newName + ext;
  }
  return newName;
}
function setFile(file, input, output) {
  file.size = NaN;
  return function(namespace, type2, kind) {
    let key;
    if (type2 === 15 /* Metafield */ || type2 === 16 /* Page */) {
      key = join5(lastPath(file.dir), file.base);
      output = null;
    } else {
      key = join5(namespace, file.base);
      output = join5(output, key);
    }
    if (kind === -1) input = $.cache.paths[input];
    file.uuid = uuid();
    file.type = type2;
    file.key = key;
    file.namespace = namespace;
    file.kind = kind;
    file.input = input;
    file.output = output;
    file.relative = input ? relative2($.cwd, input) : $.cwd;
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
      relative: relative2($.cwd, output)
    });
  };
}
function parseFileQuick(path4) {
  return parseFile($.paths, $.dirs.output)(path4);
}
function parseFile(paths2, output) {
  return function fn(path4) {
    const file = new File(parse2(path4));
    const define2 = setFile(file, path4, output);
    if (file.ext === ".liquid") {
      if (paths2.sections.match(path4)) {
        return section(define2("sections" /* Sections */, 4 /* Section */, "Liquid" /* Liquid */));
      } else if (paths2.snippets.match(path4)) {
        return snippet(define2("snippets" /* Snippets */, 3 /* Snippet */, "Liquid" /* Liquid */));
      } else if (paths2.layout.match(path4)) {
        return define2("layout" /* Layout */, 2 /* Layout */, "Liquid" /* Liquid */);
      } else if (paths2.templates.match(path4)) {
        return define2("templates" /* Templates */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.customers.match(path4)) {
        return define2("templates/customers" /* Customers */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.metaobject.match(path4)) {
        return define2("templates/metaobject" /* Metaobject */, 1 /* Template */, "Liquid" /* Liquid */);
      } else if (paths2.transforms.get(path4) === 9 /* Style */) {
        return style(define2("snippets" /* Snippets */, 9 /* Style */, "CSS" /* CSS */));
      }
    } else if (file.ext === ".schema" && paths2.schema.match(path4)) {
      return schema(fn, define2("schema" /* Schema */, 5 /* Schema */, "JSON" /* JSON */));
    } else if (file.ext === ".json") {
      if (paths2.metafields.match(path4)) {
        return define2("metafields" /* Metafields */, 15 /* Metafield */, "JSON" /* JSON */);
      } else if (paths2.sections.match(path4)) {
        return section(define2("sections" /* Sections */, 4 /* Section */, "JSON" /* JSON */));
      } else if (paths2.templates.match(path4)) {
        return define2("templates" /* Templates */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.config.match(path4)) {
        return define2("config" /* Config */, 7 /* Config */, "JSON" /* JSON */);
      } else if (paths2.locales.match(path4)) {
        return define2("locales" /* Locales */, 8 /* Locale */, "JSON" /* JSON */);
      } else if (paths2.customers.match(path4)) {
        return define2("templates/customers" /* Customers */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.metaobject.match(path4)) {
        return define2("templates/metaobject" /* Metaobject */, 1 /* Template */, "JSON" /* JSON */);
      } else if (paths2.schema.match(path4)) {
        return schema(fn, define2("schema" /* Schema */, 5 /* Schema */, "JSON" /* JSON */));
      }
    }
    if (paths2.assets.match(path4)) {
      if ($.spawn.invoked) return define2("assets" /* Assets */, 17 /* Spawn */);
      switch (file.ext) {
        case ".js":
        case ".mjs":
          return define2("assets" /* Assets */, 14 /* Asset */, "JavaScript" /* JavaScript */);
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
    return void 0;
  };
}
function importFile(key, outputPath) {
  const path4 = join5(outputPath, key);
  const file = new File(parse2(path4));
  const define2 = setImportFile(file, path4);
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
var outputFile = (output) => (path4) => {
  const file = new File(parse2(path4));
  const merge2 = setFile(file, path4, output);
  switch (basename4(file.dir)) {
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
init_esm_shims();
import zlib from "node:zlib";
var import_ansi9 = __toESM(require_dist());
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
  if (bytes === 0) return `${(0, import_ansi9.bold)("0")}b`;
  const size = parseInt(String(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    )
  ), 10);
  return size === 0 ? `${(0, import_ansi9.bold)(`${bytes}`)}${UNITS[size]}` : `${(0, import_ansi9.bold)((bytes / 1024 ** size).toFixed(1))}${UNITS[size]}`;
}
function sizeDiff(content, beforeSize) {
  const size = byteSize(content);
  return {
    isSmaller: size > beforeSize || size === beforeSize,
    gzip: byteConvert(zlib.gzipSync(content).length),
    before: byteConvert(beforeSize),
    after: byteConvert(size),
    saved: byteConvert(beforeSize - size)
  };
}

// syncify/plugins/hooks.ts
init_esm_shims();
async function onAsset(file, input, update4, request2) {
  if (isUndefined(update4) || update4 === false) {
    return request2("put", file, input);
  } else if (isString(update4)) {
    return request2("put", file, update4);
  } else if (isBuffer(update4)) {
    return request2("put", file, update4.toString());
  } else {
    return request2("put", file, input);
  }
}

// syncify/modes/upload.ts
var c8 = __toESM(require_dist());
function getModel(size) {
  if (size === 0) {
    throwError("Empty output directory", [
      `There are no files within ${c8.neonCyan(relative3($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${c8.neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme2 of $.sync.themes) {
    if (theme2.target.length > width) width = theme2.target.length;
    const key = `${theme2.store}:${theme2.target}`;
    if (!sync4.has(key)) {
      sync4.set(key, {
        active: sync4.size === 0,
        log: null,
        size,
        processed: "",
        failed: 0,
        success: 0,
        retry: 0,
        progress: import_ansi5.progress(size),
        get theme() {
          return theme2;
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
async function upload2(cb) {
  group("Upload");
  spinner("Preparing", { style: "spinning" });
  timer.start("upload");
  const request2 = client($.sync);
  const hashook = isFunction(cb);
  const parse5 = outputFile($.dirs.output);
  const files = glob2.sync(`${$.dirs.output}/**`).sort();
  const sync4 = getModel(files.length);
  let interval = null;
  await delay(500);
  function logger(message) {
    const record = message.toRaw();
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    import_ansi5.update(message.toString());
    interval = setInterval(() => {
      record[3] = c8.Line(
        c8.gray(
          c8.Prefix(
            "Elapsed",
            c8.whiteBright.bold(timer.now("upload"))
          )
        )
      ) + "\n";
      import_ansi5.update(c8.glue(record));
    }, 100);
  }
  function callback(item) {
    spinner.stop();
    const { file, theme: theme2 } = item;
    const key = `${theme2.store}:${theme2.target}`;
    const record = sync4.get(key);
    const message = c8.Create().NL.Line(toUpcase(file.namespace), c8.bold.whiteBright).NL.Line(c8.Prefix("Elapsed", c8.whiteBright.bold(timer.now("upload"))), c8.gray).Line(c8.Prefix("Duration", c8.whiteBright(timer.stop(file.uuid))), c8.gray).Line(c8.Prefix("Size", c8.whiteBright(stringSize(file.size))), c8.gray).Newline();
    if (item.status === 0 /* Success */) {
      if (record.errors.retry.has(file.input)) {
        record.retry -= 1;
        record.errors.retry.delete(file.input);
      }
      record.success += 1;
      record.progress.increment(1);
      record.processed = c8.neonCyan(file.key);
    } else if (item.status === 1 /* Retry */) {
      if (!record.errors.retry.has(file.input)) {
        record.retry += 1;
        record.errors.retry.add(file.input);
      }
      record.processed = c8.orange(file.key);
    } else if (item.status === 2 /* Failed */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      if (!record.errors.remote.has(file.output)) {
        record.failed += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);
        record.processed = c8.redBright(file.key);
      }
    }
    for (const [id, { success, size, failed, retry, progress: progress3, processed }] of sync4) {
      const [store, target] = id.split(":");
      const uploaded = `${c8.bold(`${success}`)} ${c8.white("of")} ${c8.bold(`${size}`)}`;
      const retrying2 = c8.bold(`${retry}`);
      const failures = c8.bold(`${failed}`);
      message.Line(`${c8.bold(target.toUpperCase())}  ${c8.ARR}  ${store}`, c8.whiteBright).NL.Line(processed).NL.Line(c8.Prefix("uploaded", uploaded), c8.whiteBright).Line(c8.Prefix("retrying", retrying2), retry > 0 ? c8.orange : c8.whiteBright).Line(c8.Prefix("failures", failures), failed > 0 ? c8.redBright : c8.whiteBright).NL.Insert(progress3.render()).Newline();
    }
    logger(message);
  }
  event.on("upload", callback);
  await delay(500);
  for (const path4 of files) {
    const file = parse5(path4);
    let input;
    try {
      const read = await readFile2(file.output);
      input = read.toString();
      file.size = byteSize(input);
      if (!hashook) {
        await request2.assets("put", file, input);
      } else {
        const update4 = cb.apply({ ...file }, input);
        await onAsset(file, input, update4, request2.assets);
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
  for (const {
    errors,
    theme: theme2,
    failed,
    success,
    size
  } of sync4.values()) {
    if (errors.remote.size > 0) {
      import_ansi5.update.clear();
      group("Errors");
      const name = c8.bold(`${theme2.target.toUpperCase()} THEME`);
      const failures = c8.bold(`${failed}`);
      const uploaded = `${c8.bold(`${success}`)} ${c8.white("of")} ${c8.bold(`${size}`)}`;
      log(
        c8.Create().NL.Line(`${name}  ${c8.ARR}  ${theme2.store}`).NL.Line(c8.Prefix("uploaded", uploaded), c8.neonGreen).Line(c8.Prefix("failures", failures), c8.redBright).toString()
      );
      let number = 1;
      for (const record of errors.remote.values()) {
        const errno = `${(number < 10 ? "0" : "") + number++}`;
        nwl();
        write2(c8.bold(`ERROR ${errno}`), { type: "error" });
        request(record.file.input, record.error);
      }
      nwl();
      hline();
    }
  }
  await delay(500);
  import_ansi5.update(c8.Break(c8.neonGreen.bold("Uploaded Completed")));
  group(false);
  process.exit(0);
}

// syncify/modes/build.ts
init_esm_shims();
var import_anymatch2 = __toESM(require_anymatch());
import glob3 from "fast-glob";

// syncify/transform/asset.ts
init_esm_shims();
import { basename as basename5 } from "node:path";
import { readFile as readFile3, writeFile } from "fs-extra";
function passthrough(file, sync4) {
  const { type: type2, relative: relative14, kind, key, output } = file;
  return async (data) => {
    if (type2 !== 17 /* Spawn */) {
      if ($.mode.watch) {
        $.watch.unwatch(output);
      }
      await writeFile(output, data).catch(
        write("Error writing asset to output directory", {
          file: relative14,
          source: relative14
        })
      );
    }
    ;
    if ($.mode.hot) {
      syncing(key, { hot: true });
      if (kind === "JavaScript" /* JavaScript */) {
        $.wss.script(file.uuid, basename5(key));
      } else if (kind === "CSS" /* CSS */) {
        $.wss.stylesheet(file.uuid, basename5(key));
      }
    }
    if ($.env.sync !== 0 && $.mode.build === false) {
      await sync4("put", file, data);
    }
  };
}
async function compile(file, sync4, cb) {
  const copy2 = passthrough(file, sync4);
  const data = await readFile3(file.input).catch(
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
    const update4 = cb.apply({ ...file }, value);
    if (isUndefined(update4) || update4 === false) {
      return copy2(value);
    } else if (isType(update4)) {
      return copy2(update4);
    } else if (isBuffer(update4)) {
      return copy2(update4.toString());
    }
    await copy2(value);
  }
  return null;
}

// syncify/transform/liquid.ts
init_esm_shims();
import { minify } from "html-minifier-terser";
import { relative as relative5 } from "node:path";
import { readFile as readFile6, writeFile as writeFile3 } from "fs-extra";

// syncify/transform/schema.ts
init_esm_shims();
import { readFile as readFile4 } from "fs-extra";

// node_modules/.pnpm/parse-json@8.1.0/node_modules/parse-json/index.js
init_esm_shims();
var import_code_frame = __toESM(require_lib3(), 1);

// node_modules/.pnpm/index-to-position@0.1.2/node_modules/index-to-position/index.js
init_esm_shims();
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
init_esm_shims();
var c9 = __toESM(require_dist());
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
  const output = c9.Create({ type: "warning" }).NL.Wrap(options.message, c9.yellowBright).NL.Context({
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
  const output = c9.Create({ type: "warning" }).NL.Wrap(message, c9.yellowBright);
  if (has("span", options)) {
    if (isUndefined(options.span)) return;
    const { span } = options;
    const code = has("context", span) ? span.context : span.text;
    const content = code.slice(span.start.offset, span.end.offset);
    const lines = content.split("\n");
    if (lines.length < 15) {
      const space = c9.sanitize(span.end.line).length;
      let from = span.start.line + 1;
      for (const line of lines) {
        const number = c9.sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? "" : " ".repeat(same);
        output.Trim(`   ${align + c9.blue(number)} ${c9.Tree.trim} ${line}`);
      }
    }
  }
  const context = output.NL.Wrap(options.stack, c9.yellowBright).NL.Context({
    stack: false,
    entries: {
      source: file.relative,
      deprecated: options.deprecation ? "Yes" : "No"
    }
  }).toString();
  if (!stack.has(context)) stack.add(context);
  if (!$.mode.build) {
    log(
      c9.LineYellow(
        c9.yellowBright(
          c9.Prefix(
            "warning",
            glueString(c9.sanitize(stack.size), plural("warning", stack.size))
          ) + c9.Suffix.warning
        )
      )
    );
  }
};
function esbuild2(data) {
}
function postcss2(file, data) {
  const stack = getStack("postcss", file.input);
  const output = c9.glue(
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
    c9.Context(
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

// syncify/transform/schema.ts
var import_ansi10 = __toESM(require_dist());

// syncify/terser/liquid.ts
init_esm_shims();
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
  const read = await readFile4(file.input);
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
    if (!has("$ref", schema3[i])) {
      settings.push(schema3[i]);
      continue;
    }
    const [key, prop] = schema3[i].$ref.split(".");
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
          schema2(file, {
            shared: shared.uri,
            $ref: schema3[i].$ref,
            schema: "settings",
            message: [
              `An unknown Shared Schema reference key of ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided.`,
              `There is no such key ${(0, import_ansi10.bold)(prop)} within the shared schema.`
            ]
          });
        } else {
          warn2(`undefined $ref ${(0, import_ansi10.bold)(prop)} in ${(0, import_ansi10.bold)(key)} `, file.base);
        }
      }
    } else {
      if ($.mode.build) {
        schema2(file, {
          shared: prop,
          $ref: schema3[i].$ref,
          schema: "settings",
          message: [
            `An unknown Shared Schema file reference ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided`,
            `to ${(0, import_ansi10.bold)("settings")} within section file ${(0, import_ansi10.bold)(file.base)}. There is no known shared`,
            "schema file using that name."
          ]
        });
      } else {
        warn2(`unknown $ref ${(0, import_ansi10.bold)(schema3[i].$ref)} `, file.base);
      }
    }
  }
  return settings;
}
function InjectBlocks(file, schema3) {
  const blocks = [];
  for (let i = 0, s = schema3.length; i < s; i++) {
    if (has("$ref", schema3[i])) {
      const [key, prop] = schema3[i].$ref.split(".");
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
            schema2(file, {
              shared: prop,
              $ref: schema3[i].$ref,
              schema: "blocks",
              message: [
                `An unknown Shared Schema key reference of ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided`,
                `to the ${(0, import_ansi10.bold)("blocks")} within section file ${(0, import_ansi10.bold)(file.base)}. The shared schema`,
                `file exists, but the key ${(0, import_ansi10.bold)(prop)} does not.`
              ]
            });
          } else {
            warn2(`undefined $ref ${(0, import_ansi10.bold)(prop)} in ${(0, import_ansi10.bold)(key)} `, file.base);
          }
        }
      } else {
        if ($.mode.build) {
          schema2(file, {
            shared: prop,
            $ref: schema3[i].$ref,
            schema: "blocks",
            message: [
              `An unknown Shared Schema file reference ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided`,
              `to ${(0, import_ansi10.bold)("blocks")} within section file ${(0, import_ansi10.bold)(file.base)}. There is no known shared`,
              "schema file using that name."
            ]
          });
        } else {
          warn2(`unknown $ref ${(0, import_ansi10.bold)(schema3[i].$ref)} `, file.base);
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
      if (has("settings", schema3[i])) {
        for (const setting of schema3[i].settings) {
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
                  schema2(file, {
                    shared: prop,
                    $ref: schema3[i].$ref,
                    schema: `blocks ${import_ansi10.ARR} settings`,
                    message: [
                      `An unknown Shared Schema key reference of ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided`,
                      `to the ${(0, import_ansi10.bold)("blocks")} schema id ${(0, import_ansi10.bold)(setting.id)} within section file`,
                      `${(0, import_ansi10.bold)(file.base)}. The shared schema file exists, but the key ${(0, import_ansi10.bold)(prop)} does not.`
                    ]
                  });
                } else {
                  warn2(`undefined $ref ${(0, import_ansi10.bold)(prop)} in ${(0, import_ansi10.bold)(key)} `, file.base);
                }
              }
            } else {
              if ($.mode.build) {
                schema2(file, {
                  shared: prop,
                  $ref: schema3[i].$ref,
                  schema: `blocks ${import_ansi10.ARR} settings`,
                  message: [
                    `An unknown Shared Schema file reference ${(0, import_ansi10.bold)(schema3[i].$ref)} was provided`,
                    `to ${(0, import_ansi10.bold)("blocks")} schema id ${(0, import_ansi10.bold)(setting.id)} within section file ${(0, import_ansi10.bold)(file.base)}.`,
                    "There is no known shared schema file using that name."
                  ]
                });
              } else {
                warn2(`unknown $ref ${(0, import_ansi10.bold)(setting.$ref)} `, file.base);
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
    const read = await readFile4(file.input);
    const hash = checksum(read);
    if (has(file.input, $.cache.schema) && $.cache.checksum[file.input] === hash && $.section.shared.has(file.name)) {
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
    if (has("$schema", schema3)) delete schema3.$schema;
    if (has("$description", schema3)) delete schema3.$description;
    for (const prop in schema3) {
      if (isObject(schema3[prop])) {
        if (has("$description", schema3[prop])) {
          delete schema3[prop].$description;
        }
      } else if (isArray(schema3[prop])) {
        for (const setting of schema3[prop]) {
          if (has("$description", setting)) delete setting.$description;
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
  return (0, import_ansi10.glue)(
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
  process2("Shared Schema", `${sections.length} ${plural("section", sections.length)}`);
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
init_esm_shims();
import { basename as basename6, join as join6, relative as relative4 } from "node:path";
import { readFile as readFile5, writeFile as writeFile2 } from "fs-extra";
var import_ansi11 = __toESM(require_dist());
import postcss3 from "postcss";
var sass3 = null;
var tailwind = null;
async function load(id) {
  if (id === "sass") {
    sass3 = __require("sass");
    return isNil(sass3) === false;
  }
  if (id === "tailwind") {
    tailwind = __require("tailwindcss");
    return isNil(tailwind) === false;
  }
}
function write3(file, sync4, hook) {
  const scope = isFunction(hook) ? { ...file } : false;
  return async (data) => {
    if (isNil(data)) return null;
    let content;
    if (scope !== false) {
      const update4 = hook.apply({ ...file }, toBuffer(data));
      if (isUndefined(update4) || update4 === false) {
        content = data;
      } else if (isString(update4) || isBuffer(update4)) {
        content = (0, import_ansi11.sanitize)(update4);
      }
    } else {
      content = data;
    }
    $.cache.checksum[file.input] = checksum(content);
    writeFile2(file.output, content).catch(write("Error writing stylesheet to output", {
      input: file.relative,
      output: relative4($.cwd, file.output)
    }));
    const size = sizeDiff(data, file.size);
    if (size.isSmaller) {
      if (file.kind === "SCSS" /* SCSS */ || file.kind === "SASS" /* SASS */ || file.kind === "Tailwind" /* Tailwind */) {
        transform(file.kind, (0, import_ansi11.bold)("CSS"), size.before, timer.stop(file.uuid));
      } else {
        transform("CSS", size.before, `gzip ${size.gzip}`);
      }
    } else {
      if (file.kind === "Tailwind" /* Tailwind */) {
        minified("Tailwind" /* Tailwind */, size.before, size.after, size.saved);
      } else {
        minified("CSS", size.before, size.after, size.saved);
      }
    }
    if ($.mode.hot) {
      $.wss.stylesheet(file.uuid, basename6(file.key));
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
        const map = join6($.dirs.sourcemaps.styles, file.base + ".map");
        writeFile2(map, JSON.stringify(sourceMap)).catch(
          write("Error writing SASS Source Map file to the cache directory", {
            file: relative4($.cwd, map),
            source: file.relative
          })
        );
      }
      process2("SASS Dart", timer.stop());
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
    const css = await readFile5(file.input);
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
    const result = await postcss3(plugins2).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? { prev: map, inline: false, absolute: true } : null
    });
    if ($.mode.watch && file.kind !== "Tailwind" /* Tailwind */) {
      process2("PostCSS", timer.stop());
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
    if (isUndefined(file.data)) {
      return readStyleFile(file);
    }
    const out = await sassProcess(file);
    if (out === null) return null;
    if (isNil(postcss3) || isUndefined(file.data) || !file.data.postcss && !file.data.snippet) {
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
    const htmlmin = await minify(content, $.liquid.terse.markup);
    return htmlmin;
  } catch (e) {
    invalid(file.relative);
    console.error(e);
    return null;
  }
}
var transform2 = (file) => async (data) => {
  if (!$.mode.terse) {
    writeFile3(file.output, data).catch(
      write("Error writing liquid file to output", {
        input: file.relative,
        output: relative5($.cwd, file.output)
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
  process2("HTML Terser", timer.now());
  if (isNil(htmlmin)) {
    writeFile3(file.output, data).catch(
      write("Error writing liquid file to output", {
        input: file.relative,
        output: relative5($.cwd, file.output)
      })
    );
    return data;
  }
  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, "");
  writeFile3(file.output, postmin);
  const size = sizeDiff(data, file.size);
  if (size.isSmaller) {
    transform(`${file.namespace} ${size.before} \u2192 gzip ${size.gzip}`);
  } else {
    minified("Liquid", size.before, size.after, size.saved);
  }
  return postmin;
};
async function compile4(file, sync4, cb) {
  if ($.mode.watch) timer.start();
  const read = await readFile6(file.input);
  let input = read.toString();
  if (file.type === 4 /* Section */) {
    const section2 = await CreateSection(file);
    if (section2 === null) return null;
    input = section2;
  }
  file.size = byteSize(input);
  const edit = transform2(file);
  let content;
  if (isFunction(cb)) {
    const update4 = cb.apply({ ...file }, input);
    if (isUndefined(update4) || update4 === false) {
      content = await edit(input);
    } else if (isString(update4)) {
      content = await edit(update4);
    } else if (isBuffer(update4)) {
      content = await edit(update4.toString());
    }
  } else {
    content = await edit(input);
  }
  $.cache.checksum[file.input] = checksum(content);
  if ($.processor.tailwind.map !== null && file.type !== 9 /* Style */) {
    const request2 = await tailwindParse(file, [[file, content]]);
    for (const req of request2) {
      syncing(req[0].key);
      if (sync4 === null) continue;
      await sync4("put", req[0], req[1]);
    }
  } else {
    syncing(file.key);
    if (sync4 && sync4 !== null) {
      await sync4("put", file, content);
    }
  }
  if ($.mode.hot) {
    if (file.type === 4 /* Section */) {
      $.wss.section(file.name);
    } else {
      await queue.onIdle().then(() => $.wss.replace());
    }
  }
  return content;
}

// syncify/transform/json.ts
init_esm_shims();
import { readFile as readFile7, writeFile as writeFile4 } from "fs-extra";
var import_ansi12 = __toESM(require_dist());
function parse3(file, data) {
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
  if (isNil2(minified2)) {
    if ($.mode.watch) timer.stop();
    return data;
  }
  if (space === 0) {
    const size = sizeDiff(minified2, file.size);
    minified("JSON", size.before, size.after, size.saved);
  } else {
    transform("JSON", file.namespace, byteConvert(file.size), timer.now());
  }
  if (file.type === 15 /* Metafield */) return minified2;
  writeFile4(file.output, minified2).catch(
    write("Error writing JSON", {
      file: file.relative
    })
  );
  return minified2;
}
async function compile5(file, sync4, cb) {
  $.mode.watch && timer.start();
  const json2 = await readFile7(file.input).catch(
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
      for (const theme2 of $.sync.themes) {
        const settings_data = await find("config/settings_data.json", theme2);
        if (settings_data) {
        }
      }
    }
    const data = parse3(file, read);
    if (data === null) return null;
    if (isEmpty(data)) {
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
      const update4 = cb.apply({ ...file }, data);
      if (isUndefined(update4)) {
        content = await jsonCompile(file, data, space);
      } else if (isArray(update4) || isObject(update4)) {
        content = await jsonCompile(file, (0, import_ansi12.sanitize)(update4), space);
      } else if (isString(update4)) {
        content = await jsonCompile(file, parse3(file, update4), space);
      } else if (isBuffer(update4)) {
        content = await jsonCompile(file, parse3(file, update4.toString()), space);
      }
    } else {
      content = await jsonCompile(file, data, space);
    }
    $.cache.checksum[file.input] = checksum(content);
    if (isFunction(sync4)) {
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
    return content;
  }
}

// syncify/transform/script.ts
init_esm_shims();
import { basename as basename7, join as join7, relative as relative6 } from "node:path";
import { writeFile as writeFile5 } from "fs-extra";
import esbuild3 from "esbuild";
var import_ansi13 = __toESM(require_dist());
async function esbuildBundle(bundle) {
  bundle.watch.clear();
  const result = await esbuild3.build(bundle.esbuild);
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
    const path4 = join7(cwd, file);
    if (!bundle.watch.has(path4)) bundle.watch.add(path4);
    if (!watch2.has(path4)) watch2.add(path4);
    if (mode.watch) store.push(path4);
  }
  if (mode.watch) {
    await pNext().then(() => {
      for (const path4 of bundle.watch) {
        if (path4.indexOf("/node_modules/") > -1) continue;
        if (bundle.watchCustom !== null && bundle.watchCustom(path4)) continue;
        if (!has(path4.slice(cwd.length + 1), inputs)) {
          bundle.watch.delete(path4);
          watch2.unwatch(path4);
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
    const update4 = hook.apply({ ...file }, content);
    if (update4 === false) {
      write2("cancelled");
      return null;
    }
    if (isType("String", update4)) {
      write2("augment");
      return update4;
    }
    if (isBuffer(update4)) {
      write2("augment");
      return update4.toString();
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
      const { metafile, outputFiles, warnings: warnings2 } = await esbuild3.build(bundle.esbuild);
      if (trigger2 > 1) {
        nwl();
        write2(relative6($.cwd, input));
      }
      if ($.mode.watch) {
        await getWatchPaths(bundle, metafile.inputs);
      }
      if (warnings2.length > 0) esbuild2(warnings2);
      for (const { text, path: path4 } of outputFiles) {
        if (path4.endsWith(".map")) {
          const map = join7($.dirs.sourcemaps.scripts, `${file.base}.map`);
          writeFile5(map, text).catch(write("Error writing JavaScript Source Map to cache", {
            file: relative6($.cwd, map),
            source: file.relative
          }));
        } else {
          if ($.mode.terse) {
            if (isNaN(bundle.size)) {
              transform(file.kind, `${(0, import_ansi13.bold)(format.toUpperCase())} bundle`);
              minified(stringSize(text));
            } else {
              const { before, after, saved } = sizeDiff(text, bundle.size);
              transform(`${(0, import_ansi13.bold)(format.toUpperCase())} bundle \u2192 ${(0, import_ansi13.bold)(stringSize(text))}`);
              minified(null, before, after, saved);
            }
          } else {
            transform(`${(0, import_ansi13.bold)(format.toUpperCase())} bundle \u2192 ${(0, import_ansi13.bold)(stringSize(text))}`);
          }
          let content;
          if (snippet2) {
            content = createSnippet2(text, attrs);
            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }
            await writeFile5(output, content).catch(
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
            await writeFile5(output, content).catch(write("Error writing JavaScript asset", {
              file: file.relative
            }));
          }
          if ($.mode.hot) {
            syncing(key, { hot: true });
            $.wss.script(file.uuid, basename7(key));
            sync4("put", bundle, content);
          } else if (!$.mode.build) {
            syncing(key);
            await sync4("put", bundle, content);
          }
        }
      }
      ;
    } catch (e) {
      if (has("errors", e)) {
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
init_esm_shims();
import { join as join8, relative as relative7 } from "node:path";
import Svgo from "svgo";
import SVGSprite from "svg-sprite";
import { readFile as readFile8, writeFile as writeFile6 } from "fs-extra";
var c10 = __toESM(require_dist());
async function getFile(path4) {
  const svg2 = await readFile8(path4);
  return [
    path4,
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
      file.key = join8("snippets", renameFile(file, config.rename));
      file.output = join8($.dirs.output, file.key);
    } else {
      file.key = join8("assets", renameFile(file, config.rename));
      file.output = join8($.dirs.output, file.key);
    }
    const options = config.sprite === true ? $.processor.sprite : config.sprite;
    const sprite = new SVGSprite(options);
    const items = await pMap(toArray(config.input), getFile).catch(
      write("Error reading an SVG file", {
        file: file.base,
        source: file.relative
      })
    );
    if (items) {
      const svgs = items.filter(([path4, svg2]) => {
        if (hasLiquid(svg2)) {
          skipped(relative7($.cwd, path4), "Liquid Detected");
          return false;
        }
        return true;
      });
      file.size = 0;
      for (const [path4, svg2, size2] of svgs) {
        sprite.add(path4, null, svg2);
        file.size = file.size + size2;
      }
      const content = await getSprite(sprite);
      const length = svgs.length;
      process2("SVG Sprite", `${length} ${plural("SVG", length)}`, timer.stop());
      await writeFile6(file.output, content).catch(
        write("Error writing SVG Sprite", {
          file: file.key,
          caller: context.relative
        })
      );
      const size = sizeDiff(content, file.size);
      if (size.isSmaller) {
        transform(`${file.kind} ${size.before}`, `gzip ${size.gzip}`);
      } else {
        minified(file.kind, size.before, size.after, size.saved);
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
    const before = `${c10.gray(`<${c10.white("path")}>`)}`;
    const after = `${c10.neonGreen(`<${c10.white("path")} />`)}`;
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
      file.key = join8("snippets", renameFile(file, config.rename));
      file.output = join8($.dirs.output, file.key);
    } else {
      file.key = join8("assets", renameFile(file, config.rename));
      file.output = join8($.dirs.output, file.key);
    }
    const options = config.svgo === true ? $.processor.svgo : config.svgo;
    const read = await readFile8(file.input);
    const node = read.toString();
    if (hasLiquid(node)) {
      skipped(file, "Liquid Detected");
      return null;
    }
    const patch = patchPathVoids(node);
    file.size = byteSize(patch);
    let svg2;
    try {
      svg2 = Svgo.optimize(patch, options);
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
    process2("SVGO", timer.stop());
    const { data } = svg2;
    const size = sizeDiff(data, file.size);
    if (size.isSmaller) {
      transform(`${file.kind} ${size.before} \u2192 gzip ${size.gzip}`);
    } else {
      minified(file.kind, size.before, size.after, size.saved);
    }
    await writeFile6(file.output, data).catch(
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
init_esm_shims();
import { join as join9 } from "node:path";
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync2 } from "fs-extra";
var import_write_file_atomic = __toESM(require_lib4());
import zlib2 from "node:zlib";
import cbor from "cbor";
var cq = new PQueue();
function decode(uri) {
  const content = readFileSync2(uri);
  const gunzip = zlib2.gunzipSync(content);
  return cbor.decode(gunzip);
}
function save(uri, data) {
  return async () => {
    const encoded = await cbor.encodeAsync(data, {
      omitUndefinedProperties: true,
      canonical: true
    });
    const gzip = zlib2.gzipSync(encoded);
    gzip[9] = 3;
    await (0, import_write_file_atomic.default)(uri, gzip);
  };
}
async function getCache() {
  $.cache.uri = create(null);
  const cachdir = join9($.cwd, "node_modules", ".cache");
  if (!existsSync2(cachdir)) mkdirSync(cachdir);
  const root = join9(cachdir, "syncify");
  if (!existsSync2(root)) mkdirSync(root);
  for (const file of CACHE_REFS) {
    $.cache.uri[file] = join9(root, `${file}.bin`);
    if (existsSync2($.cache.uri[file])) {
      $.cache[file] = decode($.cache.uri[file]);
    } else {
      $.cache[file] = {};
      cq.add(save($.cache.uri[file], $.cache[file]));
    }
  }
  if ($.cmd.cache) {
    return clearCache();
  }
}
function clearCache(id = null) {
  if (id === null) {
    for (const key of CACHE_REFS) {
      if (!isEmpty2($.cache[key])) {
        $.cache[key] = object();
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
      if (!isEmpty2($.cache[key])) {
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
    if (hasPath2(`${store}.${pageId}`, $.cache.pages)) {
      return $.cache.pages[store][pageId];
    }
    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = { [pageId]: {} };
    } else {
      $.cache.pages[store][pageId] = {};
    }
    cq.add(save($.cache.uri.pages, $.cache.pages));
    return $.cache.pages[store][pageId];
  } else {
    if (!has(store, $.cache.pages)) {
      $.cache.pages[store] = {};
      cq.add(save($.cache.uri.pages, $.cache.pages));
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
  cq.add(save($.cache.uri.pages, $.cache.pages));
  return $.cache.pages[store][data.id];
}

// syncify/modes/build.ts
var import_ansi14 = __toESM(require_dist());
var c11 = __toESM(require_dist());
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
async function build2(cb) {
  timer.start("build");
  if (!$.mode.export) {
    nwl();
    task("Build");
    nwl();
  }
  const SVG = /* @__PURE__ */ new Set();
  const errors = c11.Create({ type: "error" });
  const message = c11.Create().Newline();
  const report = getModel2();
  const hasFilter = isEmpty($.filters) === false;
  const parse5 = parseFile($.paths, $.dirs.output);
  const match2 = (0, import_anymatch2.default)(toArray($.watch.values()));
  const globs = await glob3("**", { absolute: true, cwd: $.dirs.input });
  const cache = $.cache.paths;
  for (const path4 of globs.filter(match2)) {
    const file = parse5(path4);
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
        const value = file.ext === ".json" ? await compile5(file, null, cb) : await transform3(file, null, cb);
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
          size: sizeDiff(isObject(value) && has("css", value) ? value.css : value, file.size)
        };
      } catch (e) {
        report.stats.errors += 1;
        errors.Line(e.message);
        console.log(e);
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
    const filter = hasFilter && has(group2, $.filters) ? $.filters[group2] : null;
    if (filter && filter.includes(group2) === false) return 0;
    const record = report[group2];
    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn), { stopOnError: true });
    record.time = timer.stop(group2);
    const files = record.report.length;
    const count = c11.bold(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? "  " : " ";
    message.Line(c11.Prefix(group2, `${count} ${plural("file", files)}${space}${c11.Append(record.time)}`));
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
    message.NL.Dash("Completed", c11.gray).NL.Line(c11.Prefix("version", `${$.vc.number}`)).Line(c11.Prefix("processed", `${c11.bold(`${report.stats.total}`)} files`)).Line(c11.Prefix("bundled", `${c11.bold(`${report.stats.bundled}`)} files`)).Line(c11.Prefix("skipped", `${c11.bold(`${report.stats.skipped}`)} files`)).Line(c11.Prefix("duration", timer.now("build"))).Line(c11.Prefix("warnings", c11.bold(`${$.warnings.size}`))).Line(c11.Prefix("errors", c11.bold(`${report.stats.errors}`)));
    if ($.warnings.size > 0) {
      message.NL.Dash("Warnings", c11.gray).Newline();
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
          message.Warn(`${c11.bold("WARNING")} ${import_ansi14.HSH}${c11.bold(`${count}`)}`, c11.yellowBright).Newline("yellow").Warn(group2, c11.yellowBright);
          for (const warn3 of warnings2) {
            message.Insert(warn3);
          }
        }
      }
      log(
        message.NL.End($.log.group).BR.toString(c11.whiteBright)
      );
    } else {
      log(
        message.NL.End($.log.group).BR.toString(c11.whiteBright)
      );
    }
    process.exit(0);
  } else {
  }
}

// syncify/modes/watch.ts
init_esm_shims();

// syncify/transform/pages.ts
init_esm_shims();
import { readFile as readFile9, writeFile as writeFile7 } from "fs-extra";
import matter, { stringify } from "gray-matter";
import markdown from "markdown-it";
import { Turndown, GithubFlavor } from "@syncify/turndown";

// syncify/process/metafields.ts
init_esm_shims();
var c12 = __toESM(require_dist());
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
      if (prop !== "description" && !has2(prop, metafield)) {
        invalid(file.relative, [
          `Missing ${c12.blue.bold(prop)} property key value in a ${c12.yellowBright.bold("metafields")}`,
          "value in frontmatter. Frontmatter metafields require you provide the following keys:",
          "",
          `${c12.gray("-")} ${c12.white("key")}`,
          `${c12.gray("-")} ${c12.white("type")}`,
          `${c12.gray("-")} ${c12.white("value")}`,
          `${c12.gray("-")} ${c12.white("namespace")}`,
          "",
          `${c12.gray("Update the metafield entry to include")} ${c12.white(prop)}`
        ]);
        return false;
      }
      if (prop === "type") {
        const type2 = metafield[prop];
        if (!checkMetafieldType(type2)) {
          invalid(file.relative, [
            `Invalid type ${c12.blue.bold(type2)} provided in frontmatter ${c12.yellowBright.bold("metafields")}`,
            `value. Frontmatter metafields ${c12.bold("must")} be one of following types:`,
            "",
            `${c12.gray("-")} ${c12.white("boolean")}`,
            `${c12.gray("-")} ${c12.white("color")}`,
            `${c12.gray("-")} ${c12.white("date")}`,
            `${c12.gray("-")} ${c12.white("date_time")}`,
            `${c12.gray("-")} ${c12.white("dimension")}`,
            `${c12.gray("-")} ${c12.white("json")}`,
            `${c12.gray("-")} ${c12.white("money")}`,
            `${c12.gray("-")} ${c12.white("multi_line_text_field")}`,
            `${c12.gray("-")} ${c12.white("number_decimal")}`,
            `${c12.gray("-")} ${c12.white("number_integer")}`,
            `${c12.gray("-")} ${c12.white("rating")}`,
            `${c12.gray("-")} ${c12.white("rich_text_field")}`,
            `${c12.gray("-")} ${c12.white("single_line_text_field")}`,
            `${c12.gray("-")} ${c12.white("url")}`,
            `${c12.gray("-")} ${c12.white("volume")}`,
            `${c12.gray("-")} ${c12.white("weigh")}`,
            "",
            `${c12.gray("Update the metafield entry to an accepted")} ${c12.white("type")}`
          ]);
          return false;
        }
      }
    }
  }
  return true;
}

// syncify/transform/pages.ts
var c13 = __toESM(require_dist());

// syncify/requests/pages.ts
init_esm_shims();
import axios3 from "axios";
async function list(store) {
  return axios3.get("pages.json", store.client).then(({ data }) => {
    return data.pages;
  }).catch((e) => {
    return request(store.store, e.response);
  });
}
async function find3(store, page) {
  if (allFalse(has2("handle", page), has2("title", page))) {
    console.log("invalid fields");
    return void 0;
  }
  return axios3.get("pages.json", store.client).then(({ data }) => {
    if (has2("handle", page) && has2("title", page)) {
      return data.pages.find((p) => page.title === p.title && page.handle === p.handle);
    } else if (has2("handle", page)) {
      return data.pages.find((p) => page.handle === p.handle);
    } else if (has2("title", page)) {
      return data.pages.find((p) => page.title === p.title);
    } else {
      return void 0;
    }
  }).catch((e) => {
    console.log(e);
    return void 0;
  });
}
async function create3(store, page) {
  if (!$.mode.upload) timer.start();
  const promise = await axios3.post("/pages.json", { page }, store.client).then(({ data }) => {
    resource("page", store);
    return data.page;
  }).catch((e) => {
    if (requeue(e.response.status)) {
      queue.add(() => create3(store, page));
    } else {
      if (hasPath2("response.data", e.response)) {
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
  const promise = await axios3.put(url, { page }, store.client).then(({ data }) => {
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
var import_ansi15 = __toESM(require_dist());
function toMarkdown(content) {
  return new Turndown($.page.import).use(GithubFlavor).turndown(content);
}
async function promptAction(store) {
  const resume = prompt("No matching pages, select an option", {
    title: "No matching pages",
    message: "Open CLI and select an option"
  });
  const prompt5 = await prompts({
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
  const prompt5 = await prompts({
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
  const prompt5 = await prompts({
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
      action: prompt5.action
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
      warn2(`handle ${import_ansi15.CHV} ${before} ${import_ansi15.ARR} ${handle}`, "fixed start");
    }
    if (/^pages\//.test(handle)) {
      before = handle;
      handle = handle.replace(/^pages\//, "");
      warn2(`handle ${import_ansi15.CHV} ${before} ${import_ansi15.ARR} ${handle}`, "fixed sub-path");
    }
    if (/[_/]/.test(data.handle)) {
      before = handle;
      handle = handle.replace(/[_/]/g, "-");
      warn2(`handle ${import_ansi15.CHV} ${before} ${import_ansi15.ARR} ${handle}`, "fixed invalid characters");
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
      warn2(`author ${import_ansi15.CHV} ${before} ${import_ansi15.ARR} ${author}`, "fixed invalid characters");
    }
    payload.author = author;
  } else {
    data.author = $.page.author;
  }
  if (has("published", data)) {
    if (isBoolean(data.published)) {
      payload.published = data.published;
    } else {
      warn2(`published ${import_ansi15.CHV} expected boolean, got ${typeof data.published}`, "defaulted to false");
      payload.published = false;
    }
  } else {
    payload.published = true;
  }
  if (has("template_suffix", data)) {
    if (has("template", data)) {
      warn2("duplicate template_suffix references", "using template");
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
    warn2("use metafields instead of metafield", "sync will still process");
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
async function compile8(file, _cb) {
  if ($.sync.stores.length > 1) {
    skipped(file, "pages do not support multistore sync");
    return null;
  }
  const read = await readFile9(file.input);
  if (isEmpty2(read.toString())) {
    if ($.mode.watch) skipped(file, "empty file");
    return null;
  }
  const frontmatter = matter(read);
  const { data, content } = merge(frontmatter);
  const payload = getPayloadFromFrontmatter(file, data);
  if (isArray(payload.metafields) && !getPageMetafields(file, payload.metafields)) {
    return null;
  }
  if (file.kind === "Markdown" /* Markdown */) {
    timer.start();
    payload.body_html = markdown($.page.export).render(content);
    transform(`${c13.bold("Markdown")} ${import_ansi15.ARR} ${c13.bold("HTML")} ${import_ansi15.TLD} ${timer.stop()}`);
  } else {
    transform("HTML");
    payload.body_html = content;
  }
  const store = $.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await find3(store, { handle: payload.handle });
  if (isArray(remote)) {
    invalid(file.relative, [
      `Multiple pages returned when matching on handle ${c13.blue.bold(payload.handle)}`,
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
      const prompt5 = await promptAction(store);
      if (prompt5.action === 2 /* Select */) {
        const action = await selectPage(store);
        if (action === 4 /* Cancel */) {
          return prompt5.resume();
        } else if (action === 1 /* Create */) {
          prompt5.resume();
          syncing(`/pages/${payload.handle} ${import_ansi15.ARR} ${payload.title} ${c13.gray(`${import_ansi15.TLD} ${file.relative}`)}`);
          return create3(store, payload);
        } else {
          payload.id = action;
          prompt5.resume();
        }
      } else if (prompt5.action === 1 /* Create */) {
        prompt5.resume();
        syncing(`/pages/${payload.handle} ${import_ansi15.ARR} ${payload.title} ${c13.gray(`${import_ansi15.TLD} ${file.relative}`)}`);
        return create3(store, payload);
      } else {
        return prompt5.resume();
      }
    }
  }
  if (isObject(remote)) {
    const online = new Date(remote.updated_at).getTime();
    const local = new Date(cached.updated_at).getTime();
    if (online > local && remote.body_html !== payload.body_html) {
      const prompt5 = await promptOverwrite(remote);
      if (prompt5.action === 3 /* Update */) {
        prompt5.resume();
        let convert = remote.body_html;
        if ($.page.language === "markdown") {
          const markdown2 = toMarkdown(convert);
          transform(`${file.name}.html ${import_ansi15.ARR} ${file.base}`);
          convert = stringify("\n" + markdown2, frontmatter.data);
        }
        $.watch.unwatch(file.input);
        await writeFile7(file.input, convert);
        setPageCache(store.domain, remote);
        $.watch.add(file.input);
      } else if (prompt5.action === 4 /* Cancel */) {
        return prompt5.resume();
      } else if (prompt5.action === 6 /* Overwrite */) {
        prompt5.resume();
      }
    }
  }
  if ($.mode.build) return payload.body_html;
  syncing(`/pages/${payload.handle} ${import_ansi15.ARR} ${payload.title} ${c13.gray(`${import_ansi15.TLD} ${file.relative}`)}`);
  const update4 = await sync3(store, file, payload);
  if (!update4) return;
  await saveCache("pages");
}

// syncify/modes/watch.ts
function watch(callback) {
  const request2 = client($.sync);
  const parse5 = parseFile($.paths, $.dirs.output);
  if ($.mode.hot) $.wss.connected();
  $.watch.on("all", onchange);
  function onchange(event2, path4) {
    const file = parse5(path4);
    if (isUndefined(file)) return;
    if (file.base === $.file.base) return;
    if (file.type !== 17 /* Spawn */) changed(file);
    if (event2 === "change" || event2 === "add") {
      handler(file);
    } else if (event2 === "unlink") {
      if (file.type === 16 /* Page */) {
        return request2.pages("delete", file);
      } else {
        return request2.assets("delete", file);
      }
    }
  }
  ;
  async function handler(file) {
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

// syncify/modes/import.ts
init_esm_shims();
import { join as join10, relative as relative8 } from "node:path";
import { writeFileSync as writeFileSync2 } from "fs-extra";
var c14 = __toESM(require_dist());
async function getModel3() {
  const sync4 = /* @__PURE__ */ new Map();
  let width = 0;
  for (const theme2 of $.sync.themes) {
    if (theme2.target.length > width) width = theme2.target.length;
    const store = $.sync.stores[theme2.sidx];
    const key = `${theme2.store}:${theme2.target}`;
    const { assets } = await get(theme2, store.client);
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
        progress: import_ansi5.progress(assets.length),
        get files() {
          return assets;
        },
        get theme() {
          return theme2;
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
  const success = `${c14.bold(`${record.success}`)} ${c14.white("of")} ${c14.bold(`${record.size}`)}`;
  const failed = c14.bold(`${record.failed}`);
  const target = c14.bold(`${record.theme.target.toUpperCase()}`);
  return c14.Create().Line(c14.Prefix(target, c14.ARR), c14.neonCyan).NL.Line(`completed in ${c14.gray(time)}`).NL.Line(c14.Prefix("synced", success), c14.whiteBright).Line(c14.Prefix("errors", failed), record.failed > 0 ? c14.redBright : c14.whiteBright).Line(c14.Prefix("location", c14.gray.underline(output))).NL.Insert(record.progress.render()).Line.toString();
}
function getWaitLog(record) {
  return c14.Create().Line(`${c14.bold(record.theme.target.toUpperCase())}  ${c14.ARR}  ${record.theme.store}`, c14.gray.dim).NL.Line(`${c14.bold(addSuffix(record.number))} in queue`, c14.magenta).NL.Line(c14.Prefix("synced", `${c14.bold("0")} ${c14.white("of")} ${c14.bold(`${record.size}`)}`), c14.gray.dim).Line(c14.Prefix("retry", c14.bold("0")), c14.gray.dim).Line(c14.Prefix("errors", c14.bold("0")), c14.gray.dim).NL.Insert(record.progress.render(c14.gray.dim)).NL.toString();
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
    const { theme: theme2, file } = item;
    const key = `${theme2.store}:${theme2.target}`;
    const record = sync4.get(key);
    const preview = `https://${theme2.store}?preview_theme_id=${theme2.id}`;
    const prefix = c14.Create().NL.Line(c14.Prefix("Duration", c14.whiteBright(timer.now("import"))), c14.gray).Line(c14.Prefix("Transfers", c14.whiteBright(`${transfers++}`)), c14.gray).Line(c14.Prefix("Syncing", c14.pink(`${c14.bold(theme2.target)}  ${c14.ARR}  ${theme2.store}`)), c14.gray).Line(c14.Prefix("Preview", c14.underline(preview)), c14.gray).Ruler();
    let processing = "";
    if (item.status === 3 /* Empty */) {
      writeFileSync2(file.output, "");
      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);
      processing = c14.yellowBright(file.key);
    } else if (item.status === 0 /* Success */) {
      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }
      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);
      const buffer = Buffer.from(item.data.value || null, "utf8");
      writeFileSync2(file.output, buffer);
      processing = c14.neonGreen(file.key);
    } else if (item.status === 1 /* Retry */) {
      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.add(file.output);
      }
      processing = c14.orange(file.key);
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
      processing = c14.redBright(file.key);
    }
    const success = `${c14.bold(`${record.success}`)} ${c14.white("of")} ${c14.bold(`${record.size}`)}`;
    const retried = c14.bold(`${record.retry}`);
    const failed = c14.bold(`${record.failed}`);
    const warnings2 = c14.bold(`${record.warning}`);
    const status = c14.Create().NL.Line(`${c14.bold(record.theme.target.toUpperCase())}  ${c14.ARR}  ${record.theme.store}`, c14.neonCyan).NL.Line(processing).NL.Line(c14.Prefix("synced", success), c14.whiteBright).Line(c14.Prefix("retry", retried), record.retry > 0 ? c14.orange : c14.whiteBright).Line(c14.Prefix("warning", warnings2), record.warning > 0 ? c14.yellowBright : c14.whiteBright).Line(c14.Prefix("failed", failed), record.failed > 0 ? c14.redBright : c14.whiteBright).NL.Insert(record.progress.render()).NL.Ruler();
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
    import_ansi5.update(c14.glue(message));
  }
  event.on("import", callback);
  remaining = sync4.size - 1;
  for (const [id, record] of sync4) {
    const [store, target] = id.split(":");
    const output = join10($.dirs.import, store, target);
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
    record.log = getDoneLog(sync4.get(id), relative8($.cwd, output), timer.stop(id));
  }
  for (const { errors } of sync4.values()) {
    if (errors.remote.size > 0) {
    }
  }
}

// syncify/modes/export.ts
init_esm_shims();
import { mkdir as mkdir2, pathExists as pathExists4, statSync } from "fs-extra";
import { basename as basename9, join as join13, relative as relative11 } from "node:path";
import { glob as glob5 } from "fast-glob";
import AdmZip from "adm-zip";

// syncify/process/validate.ts
init_esm_shims();
var c15 = __toESM(require_dist());
import { join as join11, parse as parse4, relative as relative9 } from "node:path";
import { glob as glob4 } from "fast-glob";
var import_ansi16 = __toESM(require_dist());
async function hasTemplateMismatch(cwd) {
  const files = await glob4("templates/*", { cwd, absolute: true });
  const exclude = /* @__PURE__ */ new Set();
  const exists2 = /* @__PURE__ */ new Set();
  for (const file of files) {
    const { name } = parse4(file);
    const templates = files.filter((path4) => parse4(path4).name === name);
    if (templates.length > 1 && !exists2.has(name)) exists2.add(name);
  }
  if (exists2.size === 0) return 1 /* None */;
  if (exists2.size > 1) {
    write2(`${c15.bold(`${exists2.size}`)} mismatch template files`, {
      suffix: "error",
      type: "error"
    });
  } else {
    write2(`${c15.bold(`${exists2.size}`)} mismatch template file`, {
      suffix: "error",
      type: "error"
    });
  }
  const resume = prompt(`select ${c15.bold(".json")} or ${c15.bold(".liquid")} template`, {
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
            exclude.add(join11(cwd, "templates", `${name}.liquid`));
          } else {
            exclude.add(join11(cwd, "templates", `${name}.json`));
          }
        }
      });
    }
    await prompts(choices).then(() => resume());
    return exclude;
  } else if (action === "json") {
    for (const name of exists2) {
      exclude.add(join11(cwd, "templates", `${name}.json`));
    }
    resume();
    return exclude;
  } else if (action === "liquid") {
    for (const name of exists2) {
      exclude.add(join11(cwd, "templates", `${name}.liquid`));
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
      `There are no files within ${c15.neonCyan(relative9($.cwd, $.dirs.output) + "/**")}`,
      `You may need to run the ${c15.neonCyan.bold("syncify build")} command and try again.`
    ]);
  }
}

// syncify/options/files.ts
init_esm_shims();
import dotenv from "dotenv";
import { join as join12, relative as relative10, basename as basename8, extname as extname3 } from "node:path";
import { pathExists as pathExists3, readFile as readFile10, readJson } from "fs-extra";
import PackageJson from "@npmcli/package-json";
async function configFile() {
  let path4 = null;
  for (const file of SYNCIFY_CONFIG) {
    path4 = join12($.cwd, file);
    const exists2 = await pathExists3(path4);
    if (exists2) break;
    path4 = null;
  }
  if (path4 === null) return null;
  try {
    if (extname3(path4) === ".json") {
      $.file.path = path4;
      $.file.relative = relative10($.cwd, path4);
      $.file.base = basename8(path4);
      const json2 = await readFile10(path4);
      return jsonc(json2.toString());
    } else {
      $.file.path = path4;
      $.file.relative = relative10($.cwd, path4);
      $.file.base = basename8(path4);
      const config = await bundleRequire({
        cwd: $.cwd,
        filepath: path4
      });
      return config.mod.syncify || config.mod.default || config.mod;
    }
  } catch (e) {
    const jsonconfig = join12($.cwd, "syncify.config.json");
    const hasFile = await pathExists3(jsonconfig);
    if (hasFile) return readJson(jsonconfig);
    return null;
  }
}
async function setPackageSyncify(pkg = $.pkg) {
  const syncify = has2("syncify", pkg) ? pkg.syncify : {};
  if ($.env.file !== null && isEmpty($.env.vars) === false) {
    const props = keys($.env.vars);
    const stores = has2("stores", syncify) ? isArray(syncify.stores) ? syncify.stores : [syncify.stores] : [];
    for (const name of props) {
      const match2 = name.match(/^([a-zA-Z0-9-]+)_api_(token|key)$/);
      if (match2 !== null) {
        if (stores.some(({ domain }) => domain === `${match2[1]}.myshopify.com`)) continue;
        if (match2[2] === "token") {
          stores.push({ domain: match2[1], themes: {} });
        } else if (match2[2] === "key" && has2(`${match2[1]}_api_secret`, $.env.vars)) {
          stores.push({ domain: match2[1], themes: {} });
        }
      }
    }
    if (stores.length > 0) {
      $.package.update({
        syncify: {
          stores: stores.length > 1 ? stores : stores[0]
        }
      });
      await $.package.save();
      return true;
    }
  }
  return false;
}
async function getPackageJson() {
  const has4 = await pathExists3(join12($.cwd, "package.json"));
  if (!has4) throw new Error('Missing "package.json" file');
  try {
    $.package = await PackageJson.load($.cwd);
    const pkg = $.pkg;
    if (hasPath2("syncify.stores", pkg)) {
      if (isArray(pkg.syncify.stores)) {
        $.stores = pkg.syncify.stores;
      } else if (isObject(pkg.syncify.stores) && isEmpty(pkg.syncify.stores) === false) {
        $.stores = [pkg.syncify.stores];
      }
    } else if (!$.cmd.strap && $.cmd.mode !== "setup") {
      const hasReference = await setPackageSyncify();
      if (hasReference) {
        return getPackageJson();
      } else {
        missingStores($.cwd);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function setPkgVersion(current, version2) {
  try {
    if ($.pkg.version === version2) {
      $.package.update({ version: version2 });
      await $.package.save();
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function getEnvFile() {
  const path4 = join12($.cwd, ".env");
  if (await pathExists3(path4)) {
    const env = dotenv.config({ path: path4 });
    if (env.error) {
      throws(env.error, { path: path4 });
      return null;
    }
    $.env.file = path4;
    $.env.vars = env.parsed;
  } else {
    if ($.cmd.mode !== "setup") {
      missingEnv($.cwd);
    }
  }
}

// syncify/modes/export.ts
async function exporting(cb) {
  let { themeVersion } = $.cache.build;
  timer.start("export");
  if ($.mode.build) {
    group("Build");
    await build2(cb);
  } else {
    isEmptyOutputDir($.stats);
  }
  const validate = await hasTemplateMismatch($.dirs.output);
  if (validate === 2 /* Cancel */) return;
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
  if (!await pathExists4($.dirs.export)) {
    await mkdir2($.dirs.export);
  }
  const zip = new AdmZip();
  for (const dir of THEME_DIRS) {
    const uri = join13($.dirs.output, dir);
    const has4 = await pathExists4(uri);
    if (has4) {
      const files = await glob5("*", { cwd: uri, absolute: true });
      for (const file of files) {
        const path4 = `${dir}/${basename9(file)}`;
        const stat2 = statSync(file);
        if (stat2.size === 0) {
          zip.addFile(path4, toBuffer(" "));
          warn2(path4, "empty file");
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
    if (!await pathExists4($.vc.update.dir)) await mkdir2($.vc.update.dir);
    version($.vc, "bump");
    zipped(stringSize(size), relative11($.cwd, $.vc.update.zip));
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
    if (!await pathExists4($.vc.dir)) {
      await mkdir2($.vc.dir);
      version($.vc, "created");
    } else {
      version($.vc, "overwrite");
    }
    zipped(stringSize(size), relative11($.cwd, $.vc.zip));
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
      process2("package.json", "version bumped");
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
init_esm_shims();

// syncify/requests/publish.ts
init_esm_shims();
import axios4 from "axios";
import FormData from "form-data";
import { createReadStream } from "fs-extra";
async function stageUpload(store) {
  try {
    const {
      data: {
        data: {
          stagedUploadsCreate: {
            stagedTargets,
            userErrors
          }
        }
      }
    } = await axios4.post("api/graphql.json", {
      query: `
        mutation {
          stagedUploadsCreate(input: {
            resource: FILE,
            filename: "${$.vc.number}.zip",
            mimeType: "application/zip",
            httpMethod: POST
          }) {
            userErrors {
              field
              message
            }
            stagedTargets {
              url
              resourceUrl
              parameters {
                name
                value
              }
            }
          }
        }
      `
    }, store.client);
    if (userErrors && userErrors.length > 0) {
      throws(store.store, userErrors[0].message);
    }
    return stagedTargets[0];
  } catch (e) {
    request(store.store, e.response);
  }
}
async function uploadFile({ url, parameters, resourceUrl }, store) {
  const form = new FormData();
  parameters.forEach((param) => form.append(param.name, param.value));
  form.append("file", createReadStream($.vc.zip));
  try {
    await axios4.post(url, form, { headers: form.getHeaders() });
    return resourceUrl;
  } catch (e) {
    request(store.store, e.response);
  }
}
async function publishTheme(fileUrl, store) {
  const {
    data: {
      data: {
        themeCreate: { theme: theme2 }
      }
    }
  } = await axios4.post("api/2024-10/graphql.json", {
    query: `
      mutation CreateTheme {
        themeCreate(
          name: "${$.vc.number}",
          source: "${fileUrl}"
        ) {
          theme {
            id
            name
            createdAt
            role
          }
          userErrors {
            field
            message
          }
        }
      }
    `
  }, store.client);
  return theme2;
}
async function deleteFile(fileUrl, store) {
  await axios4.post("api/graphql.json", {
    query: `
      mutation {
        fileDelete(input: { url: "${fileUrl}" }) {
          deletedId
          userErrors {
            field
            message
          }
        }
      }
    `
  }, store.client);
}
async function publish(store) {
  try {
    const stagedUrl = await stageUpload(store);
    const fileUrl = await uploadFile(stagedUrl, store);
    const theme2 = await publishTheme(fileUrl, store);
    await deleteFile(fileUrl, store);
    return theme2;
  } catch (e) {
    return request(store.store, e.response);
  }
}

// syncify/modes/publish.ts
async function publish2(cb) {
  await exporting(cb);
  timer.start("publish");
  title("Publishing");
  const hasThemes = $.sync.themes.length > 0;
  for (const store of $.sync.stores) {
    const { id } = await publish(store);
    if (hasThemes) {
      const syncify = $.pkg.syncify;
      if (isObject(syncify.stores)) {
        if (store.domain.startsWith(syncify.stores.domain)) {
          for (const theme2 in syncify.stores.themes) {
            if (syncify.stores.themes[theme2] === -1) {
              syncify.stores.themes[theme2] = id;
            }
          }
        }
        await $.package.update({ syncify }).save();
      }
    }
  }
}

// syncify/log/stdin.ts
init_esm_shims();
var import_ansi17 = __toESM(require_dist());
function stdin(data) {
  const input = data.toString().trim().toLowerCase();
  if (input === "v") {
    const items = keys($.errors);
    for (let i = 0, l = items.length; i < l; i++) {
      const prop = items[i];
      if ($.errors[prop].size === 0) continue;
      if (i > 0) hline();
      write2(import_ansi17.bold.whiteBright(prop));
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
      const message = (0, import_ansi17.Create)({ type: "warning" }).Newline("yellow").Ruler().Newline("yellow").Line(prop.toUpperCase(), import_ansi17.bold.yellow).Newline("yellow");
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
init_esm_shims();
var import_ansi18 = __toESM(require_dist());
function help(cli) {
  log(import_ansi18.clear);
  const DSH6 = (0, import_ansi18.lightGray)("-".repeat(80));
  const usage = `
    ${(0, import_ansi18.bold)("SYNCIFY CLI  " + import_ansi18.ARR + (0, import_ansi18.whiteBright)("  v0.0.1-rc.1"))}

    ${(0, import_ansi18.whiteBright)("Please provide a command argument.")}

    ${(0, import_ansi18.bold)("USAGE" + import_ansi18.COL)}

    $ syncify                    ${import_ansi18.gray.italic("Show this screen")}
    $ syncify {store} [theme]    ${import_ansi18.gray.italic("Store and theme targeting")}

    ${(0, import_ansi18.bold)("HELP" + import_ansi18.COL)}

    -h, --help                   ${import_ansi18.gray.italic("Print a list of all available commands")}
    -h, --help examples          ${import_ansi18.gray.italic("Print a list of command examples")}

    ${DSH6}

    ${(0, import_ansi18.gray)("BY \u039D\u0399\u039A\u039F\u039B\u0391\u03A3 \u03A3\u0391\u0392\u0392\u0399\u0394\u0397\u03A3")}

    ${import_ansi18.gray.underline("https://github.com/panoply")}
    ${import_ansi18.gray.underline("https://x.com/niksavvidis")}

  `;
  if (cli.help === "show" || cli.help === null) {
    return log(usage);
  }
  const examples = `
    ${(0, import_ansi18.bold)("SYNCIFY CLI  " + import_ansi18.ARR + (0, import_ansi18.whiteBright)("  v0.0.1-rc.1"))}

    Below are some usage examples for working with the Syncify CLI.
    The ${(0, import_ansi18.gray)("=")} character is optional and samples are using the ${(0, import_ansi18.gray)("$ sy")} alias.

    ${(0, import_ansi18.bold)("TARGETING" + import_ansi18.COL)}

    ${(0, import_ansi18.gray)("Target 1 store and 1 theme")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1

    ${(0, import_ansi18.gray)("Target 1 store and 2 theme")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1,some-theme,test-theme

    ${(0, import_ansi18.gray)("Target 2 stores and 1 theme")}:
    $ sy --your-store${(0, import_ansi18.gray)("=")}theme-1 --another-store${(0, import_ansi18.gray)("=")}some-theme

    ${(0, import_ansi18.gray)("Target 2 stores and 4 theme")}:
    $ sy --your-store${(0, import_ansi18.gray)("=")}theme-1,theme-2 --another-store${(0, import_ansi18.gray)("=")}some-theme,test-theme

  ${DSH6}

    ${(0, import_ansi18.bold)("BUILDING" + import_ansi18.COL)}

    ${(0, import_ansi18.gray)("Build theme from source")}:
    $ sy --build

    ${(0, import_ansi18.gray)("Build theme with terse minification")}:
    $ sy --build --terse

    ${(0, import_ansi18.gray)("Build theme and clean")}:
    $ sy --build --clean --terse

  ${DSH6}

    ${(0, import_ansi18.bold)("WATCHING" + import_ansi18.COL)}

    ${(0, import_ansi18.gray)("Watch 1 store and 1 theme")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1 --watch

    ${(0, import_ansi18.gray)("Watch 1 store and 2 themes with hot reloading")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1,theme-2 --watch --hot

    ${(0, import_ansi18.gray)("Watch 2 stores and 1 theme")}:
    $ sy --your-store${(0, import_ansi18.gray)("=")}theme-1 --another-store${(0, import_ansi18.gray)("=")}some-theme --watch

    ${(0, import_ansi18.gray)("Watch 2 stores and 2 themes")}:
    $ sy --your-store${(0, import_ansi18.gray)("=")}theme-1,theme-2 --another-store${(0, import_ansi18.gray)("=")}some-theme,test-theme --watch

    ${(0, import_ansi18.gray)("Watch 1 store with 2 themes and clean mode with hot live reloads")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1,theme-2 --watch --clean --hot

    ${(0, import_ansi18.gray)("Watch 1 store with 2 themes in production mode")}:
    $ sy your-store${(0, import_ansi18.gray)("=")}theme-1,theme-2 --prod --watch

  `;
  const commands = `
    ${(0, import_ansi18.bold)("SYNCIFY CLI  " + import_ansi18.ARR + (0, import_ansi18.whiteBright)("  v0.0.1-rc.1"))}

    Welcome to the Syncify CLI. The command line utility assumes that you have
    defined stores, themes and setup credentials within a ${(0, import_ansi18.gray)(".env")} file.

    ${(0, import_ansi18.bold)("ALIASES" + import_ansi18.COL)}

      $ sy                         ${import_ansi18.gray.italic("Shorthand for syncify")}

    ${(0, import_ansi18.bold)("COMMANDS" + import_ansi18.COL)}

      $ syncify                    ${import_ansi18.gray.italic("Show this screen")}
      $ syncify {store} [theme]    ${import_ansi18.gray.italic("Store and theme targeting")}

    ${(0, import_ansi18.bold)("THEMES" + import_ansi18.COL)}

        --{store} [theme]          ${import_ansi18.gray.italic("A store reference command (run examples)")}
      -t, --theme [theme]          ${import_ansi18.gray.italic("A comma seprated list of themes")}

    ${(0, import_ansi18.bold)("PATHS" + import_ansi18.COL)}

      -c, --config    <path>       ${import_ansi18.gray.italic("Set config directory path")}
      -i, --input     <path>       ${import_ansi18.gray.italic("Set input directory path")}
      -o, --output    <path>       ${import_ansi18.gray.italic("Set output directory path")}

    ${(0, import_ansi18.bold)("MODES" + import_ansi18.COL)}

      -w, --watch                  ${import_ansi18.gray.italic("Run watch mode")}
      -b, --build                  ${import_ansi18.gray.italic("Run build mode from input")}
      -u, --upload                 ${import_ansi18.gray.italic("Run upload mode theme to stores")}
      -d, --import                 ${import_ansi18.gray.italic("Run download mode from theme and stores")}
      -e, --export                 ${import_ansi18.gray.italic("Run export mode and generate theme zip")}
      -p, --publish                ${import_ansi18.gray.italic("Run publish and create a release")}
      -r, --resource               ${import_ansi18.gray.italic("Run resource mode, resource name expected")}

    ${(0, import_ansi18.bold)("RESOURCES" + import_ansi18.COL)}

      -r, --resource themes        ${import_ansi18.gray.italic("Run the themes resource")}
      -r, --resource assets        ${import_ansi18.gray.italic("Run the theme assets resource")}
      -r, --resource pages         ${import_ansi18.gray.italic("Run the pages resource")}
      -r, --resource metafields    ${import_ansi18.gray.italic("Run the metafields resource")}
      -r, --resource redirects     ${import_ansi18.gray.italic("Run the redirects resource")}
      -r, --resource files         ${import_ansi18.gray.italic("Run the files resource")}

    ${(0, import_ansi18.bold)("ENVIRONMENT" + import_ansi18.COL)}

      --dev                       ${import_ansi18.gray.italic("Build in development mode (default)")}
      --prod                      ${import_ansi18.gray.italic("Build in production mode")}
      --hot                       ${import_ansi18.gray.italic("Run watch with hot-reloads")}

    ${(0, import_ansi18.bold)("OPERATIONS" + import_ansi18.COL)}

      --clean                     ${import_ansi18.gray.italic("Clean the output, use with modes")}
      --silent                    ${import_ansi18.gray.italic("Silent logging, only errors will print")}
      --cache                     ${import_ansi18.gray.italic("Purges the local .cache references")}

    ${(0, import_ansi18.bold)("TRIGGERS" + import_ansi18.COL)}

      --spawn  [list]             ${import_ansi18.gray.italic("Invoke a defined spawn child process/s")}
      --delete [list]             ${import_ansi18.gray.italic("Delete a remote and local file")}
      --terse  [list]             ${import_ansi18.gray.italic("invoke minify mode, accepts resource/s")}

    ${(0, import_ansi18.bold)("TRANSFORMS" + import_ansi18.COL)}

      --script                    ${import_ansi18.gray.italic("Run the script transform in isolation")}
      --style                     ${import_ansi18.gray.italic("Run the style transform in isolation")}
      --svg                       ${import_ansi18.gray.italic("Run the svg transform in isolation")}
      --image                     ${import_ansi18.gray.italic("Run the image transform in isolation")}

    ${(0, import_ansi18.bold)("UTILITY" + import_ansi18.COL)}

      -f, --filter <path>         ${import_ansi18.gray.italic("Filter operation to be used with modes")}

    ${(0, import_ansi18.bold)("VERSIONING" + import_ansi18.COL)}

      --bump patch                ${import_ansi18.gray.italic("Apply a patch version bump, use in export mode")}
      --bump minor                ${import_ansi18.gray.italic("Apply a minor version bump, use in export mode")}
      --bump major                ${import_ansi18.gray.italic("Apply a major version bump, use in export mode")}

    ${(0, import_ansi18.bold)("STRAPS" + import_ansi18.COL)}

      --strap dusk                ${import_ansi18.gray.italic("Import and generate a dusk strap")}
      --strap dawn                ${import_ansi18.gray.italic("Import and generate a dawn strap")}
      --strap silk                ${import_ansi18.gray.italic("Import and generate a silk strap")}

    ${(0, import_ansi18.bold)("HELP" + import_ansi18.COL)}

      -h, --help                  ${import_ansi18.gray.italic("Print this screen")}
      -h, --help examples         ${import_ansi18.gray.italic("Print a list of command examples")}

    ${DSH6}

    ${(0, import_ansi18.gray)("BY \u039D\u0399\u039A\u039F\u039B\u0391\u03A3 \u03A3\u0391\u0392\u0392\u0399\u0394\u0397\u03A3")}

    ${import_ansi18.gray.underline("https://github.com/panoply")}
    ${import_ansi18.gray.underline("https://x.com/niksavvidis")}

  `;
  log(cli.help === "examples" ? examples : commands);
}

// syncify/options/define.ts
init_esm_shims();
import { FSWatcher } from "chokidar";

// syncify/options/dirs.ts
init_esm_shims();
import { mkdir as mkdir3, emptyDir, pathExists as pathExists5, readdirSync } from "fs-extra";
import { join as join14 } from "node:path";
async function setHomeDirs() {
  await createDirs($.home);
  for (const dir of HOME_DIRS) {
    $.dirs[dir] = join14($.home, `.${dir}`);
    await createDirs($.dirs[dir]);
  }
}
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
  if (await pathExists5(basePath2)) {
    if ($.mode.clean) {
      try {
        await emptyDir(basePath2);
      } catch (e) {
        throw new Error(e);
      }
    }
  } else {
    try {
      await mkdir3(basePath2);
    } catch (e) {
      throw new Error(e);
    }
  }
  for (const dir of THEME_DIRS) {
    const uri = join14(basePath2, dir);
    const name = dir.startsWith("templates/") ? dir.slice(10) : dir;
    if (!await pathExists5(uri)) {
      try {
        await mkdir3(uri);
        $.stats[name] = 0;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      $.stats[name] = readdirSync(uri).length;
    }
  }
}
async function setBaseDirs(cli) {
  const base = basePath($.cwd);
  for (const [key, dir] of BASE_DIRS) {
    if (key === "cache") {
      $.dirs[key] = join14($.cwd, dir, ".syncify");
      $.dirs.static = join14($.dirs[key], "static");
      $.dirs.sourcemaps = create(null);
      $.dirs.sourcemaps.root = join14($.dirs[key], "sourcemaps");
      $.dirs.sourcemaps.scripts = join14($.dirs.sourcemaps.root, "scripts");
      $.dirs.sourcemaps.styles = join14($.dirs.sourcemaps.root, "styles");
      continue;
    }
    if (key === "import") {
      $.dirs[key] = base($.mode.import && has("output", cli) ? cli.output : $.config.import);
      continue;
    } else if (key === "export") {
      $.dirs[key] = base($.mode.export && has("output", cli) ? cli.output : $.config.export);
      continue;
    } else if (has(key, cli) && cli[key] === dir && $.config[key] === dir) {
      $.dirs[key] = base(cli[key]);
      continue;
    }
    const path4 = isString(cli[key]) ? cli[key] : $.config[key];
    if (isString(path4)) {
      $.dirs[key] = base(path4);
    } else {
      typeError({
        option: "config",
        name: key,
        provided: path4,
        expects: "string"
      });
    }
  }
  $.watch.add($.file.path);
}
async function setImportDirs() {
  const { dirs, sync: sync4, mode } = $;
  if (!mode.import) return;
  if (!await pathExists5(dirs.import)) {
    try {
      await mkdir3(dirs.import);
    } catch (e) {
      throw new Error(e);
    }
  }
  for (const theme2 in sync4.themes) {
    const { store, target } = sync4.themes[theme2];
    const dir = join14(dirs.import, store);
    if (await pathExists5(dir)) {
      if (mode.clean) {
        try {
          await emptyDir(dir);
        } catch (e) {
          throw new Error(e);
        }
      }
    } else {
      try {
        await mkdir3(dir);
      } catch (e) {
        throw new Error(e);
      }
    }
    await setThemeDirs(join14(dir, target));
  }
}
async function createDirs(path4) {
  if (isArray(path4)) {
    for (const uri of path4) {
      if (!await pathExists5(uri)) {
        try {
          await mkdir3(uri);
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  } else {
    if (!await pathExists5(path4)) {
      try {
        await mkdir3(path4);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}

// syncify/options/json.ts
init_esm_shims();
var import_anymatch3 = __toESM(require_anymatch());
var import_ansi19 = __toESM(require_dist());
function setJsonOptions() {
  if (!has("transform", $.config) || !has("json", $.config.transform)) return;
  const { json: json2 } = $.config.transform;
  if (isNil(json2)) return;
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
  if (isEmpty(json2)) return;
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
      if (isArray(exclude)) {
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
      if (isEmpty(json2.terse)) {
        $.json.terse.enabled = false;
        warn3("Terse option is empty, minification will not apply");
      } else if (isBoolean(json2.terse) && json2.terse === true) {
        $.json.terse.enabled = true;
      } else if (isObject(json2.terse)) {
        $.json.terse.enabled = true;
        for (const p in json2.terse) {
          if (p !== "exclude" && has(p, $.json.terse)) {
            if (isBoolean(json2.terse[option])) {
              $.json.terse[p] = json2.terse[p];
              continue;
            } else {
              typeError(
                {
                  option: `json ${import_ansi19.ARR} terse`,
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

// syncify/options/sections.ts
init_esm_shims();
import { basename as basename10, extname as extname4, relative as relative12 } from "node:path";
import { readFile as readFile11 } from "fs-extra";
var import_ansi20 = __toESM(require_dist());
async function setSectionOptions() {
  if ($.paths.schema.input !== null && $.paths.schema.input.size > 0) {
    await setSharedSchema();
    await setSchemaJson();
    defineProperty($.section, "schema", { get() {
      return $.cache.schema;
    } });
  }
}
async function setSharedSchema() {
  for (const uri of $.paths.schema.input) {
    const ext = extname4(uri);
    const key = basename10(uri, ext);
    if ($.section.shared.has(key)) {
      throwError(`Duplicated shared schema file name ${import_ansi20.bold.yellow(key + ext)} detected.`, [
        "Shared Schema JSON file names must be unique across the workspace.",
        "Update the file name and try again."
      ]);
    }
    try {
      const read = await readFile11(uri);
      const data = read.toString();
      if (data.trim().length === 0) continue;
      const schema3 = parseJson(data.toString());
      if (has("$schema", schema3)) delete schema3.$schema;
      if (has("$description", schema3)) delete schema3.$description;
      for (const prop in schema3) {
        if (isObject(schema3[prop])) {
          if (has("$description", schema3[prop])) {
            delete schema3[prop].$description;
          }
        } else if (isArray(schema3[prop])) {
          for (const setting of schema3[prop]) {
            if (has("$description", setting)) delete setting.$description;
          }
        }
      }
      $.cache.schema[uri] = /* @__PURE__ */ new Set();
      $.section.shared.set(key, { uri, schema: schema3 });
    } catch (e) {
      error2(relative12($.cwd, uri), {
        notify: {
          title: "JSON Error (setSharedSchema)",
          message: `Error when parsing ${basename10(uri)}`
        }
      });
      if (e instanceof JSONError) {
        json(e, {
          relative: relative12($.cwd, uri),
          base: basename10(uri)
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
    const read = await readFile11(file);
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
      warn3("Liquid Parse Error", relative12($.cwd, file));
      continue;
    }
    try {
      const schema3 = JSON.parse(data.slice(begin, ender));
      const schemaProp = hasProp(schema3);
      if (schemaProp("settings")) {
        for (const setting of schema3.settings) {
          if (has("$ref", setting)) {
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
    } catch (e) {
      if (has(file, $.cache.sections)) delete $.cache.sections[file];
      warn3("JSON Parse Error", relative12($.cwd, file));
    }
  }
}

// syncify/options/sync.ts
init_esm_shims();
var import_ansi22 = __toESM(require_dist());

// syncify/prompts/themes.ts
init_esm_shims();

// syncify/requests/themes.ts
init_esm_shims();
import axios5 from "axios";
import { readFile as readFile12 } from "fs-extra";
import FormData2 from "form-data";
async function list2(store) {
  return axios5.get("themes.json", store.client).then(({ data }) => {
    return data.themes;
  }).catch((e) => {
    return request(store.store, e.response);
  });
}

// syncify/prompts/themes.ts
import { prompt as prompt2 } from "enquirer";

// syncify/prompts/enquirer.ts
init_esm_shims();
var import_ansi21 = __toESM(require_dist());
async function render() {
  const { index, keys: keys2 = [], submitted, size } = this.state;
  const newline = [this.options.newline, "\n"].find((v) => v != null);
  const prefix = await this.prefix();
  const separator = await this.separator();
  const message = await this.message();
  let prompt5 = [
    prefix,
    message,
    separator
  ].filter(Boolean).join(" ");
  this.state.prompt = prompt5;
  const header = await this.header();
  const error3 = await this.error() || "";
  const hint = await this.hint() || "";
  const body = submitted ? "" : await this.interpolate(this.state);
  const key = this.state.key = keys2[index] || "";
  const input = await this.format(key);
  const footer = await this.footer();
  if (input) prompt5 += " " + input;
  if (hint && !input && this.state.completed === 0) prompt5 += " " + hint;
  this.clear(size);
  const lines = [
    header,
    prompt5,
    body.split("\n").join(import_ansi21.Tree.next),
    footer,
    error3.trim()
  ];
  this.write(lines.filter(Boolean).join(newline));
  this.restore();
}
var theme = {
  pointer(choice, i) {
    const item = this.state.index === i ? (0, import_ansi21.lightGray)("\u251C ") : (0, import_ansi21.lightGray)("\u2502 ");
    return i === 0 ? (0, import_ansi21.lightGray)("\u2502 ") + "\n" + item : item;
  },
  prefix: (0, import_ansi21.lightGray)("\u2502 "),
  styles: {
    primary: import_ansi21.neonGreen,
    success: import_ansi21.neonGreen,
    danger: import_ansi21.red.bold,
    warning: import_ansi21.yellowBright,
    muted: import_ansi21.gray,
    disabled: import_ansi21.gray,
    typing: import_ansi21.gray
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

// syncify/prompts/themes.ts
var c16 = __toESM(require_dist());
async function listThemes(store) {
  let separator = 0;
  const items = await list2(store);
  const themes2 = items.filter(({ role }) => role !== "demo");
  const space = c16.eq(themes2, "name");
  const choices = themes2.map((value) => {
    if (value.name.length > separator) separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${c16.TLD} ${c16.gray(value.role)}`,
      value
    };
  });
  choices.push(
    {
      role: "separator",
      message: c16.lightGray("\u2500".repeat(separator))
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
        message: c16.lightGray("\u2500".repeat(separator))
      },
      {
        name: "store",
        message: "Select Stores",
        hint: `${space("Select Stores")} ${c16.TLD} ${c16.gray("go back and choose store")}`
      }
    );
  }
  const { targets } = await prompt2({
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
        return c16.neonCyan(`${value.join(c16.whiteBright(", "))}`);
      }
    }
  });
  const config = {
    domain: store.store.toLowerCase(),
    themes: {}
  };
  const fields = [];
  for (const theme2 of targets) {
    config.themes["${" + theme2.name + "}"] = theme2.id;
    fields.push({
      name: theme2.name,
      message: theme2.name,
      validate(value, _, field) {
        if (field && field.name === theme2.name) {
          if (/[A-Z]/.test(value)) {
            return "\n" + c16.reset.redBright("  Target name must be lowercase");
          } else if (/[0-9]/.test(value)) {
            return "\n" + c16.reset.redBright("  Target name cannot contain numbers");
          } else if (/[ ]/.test(value)) {
            return "\n" + c16.reset.redBright("  Target name cannot contain spaces");
          } else if (/-/.test(value)) {
            return "\n" + c16.reset.redBright("  Target name cannot contain dashes");
          }
        }
        return true;
      }
    });
  }
  theme.styles.primary = c16.neonCyan.italic;
  theme.styles.typing = c16.neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet2 = await prompt2({
    name: "stores",
    type: "snippet",
    required: targets.map(({ name }) => name),
    message: "Theme Targets",
    newline: c16.Tree.next + c16.Tree.next,
    render,
    format() {
      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return c16.neonGreen(`${this.state.completed}% completed`);
        }
      }
      return ` ${c16.ARR}  ${c16.orange(`${this.state.completed}% completed`)}`;
    },
    theme,
    fields,
    template
  });
  const json2 = { syncify: JSON.parse(snippet2.stores.result) };
  const save2 = await prompt2({
    name: "save",
    type: "confirm",
    message: "Save Settings",
    theme,
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    },
    footer: c16.Tree.line + [
      "",
      c16.gray("The following store and theme references will be saved"),
      c16.gray("to your package.json file on the syncify key property."),
      "",
      JSON.stringify(json2.syncify, null, 2).split("\n").join(c16.Tree.next),
      ""
    ].join("\n" + c16.Tree.line)
  });
  if (hasPath("syncify.config", $.pkg)) {
    json2.syncify.config = $.pkg.config;
  }
  console.log(save2);
}
async function listStores() {
  const space = c16.eq($.sync.stores, "store");
  const choices = $.sync.stores.map((value) => {
    return {
      name: value.domain,
      message: value.store,
      hint: `${space(value.store)} ${c16.TLD} ${c16.gray(`https://${value.domain}`)}`,
      value
    };
  });
  const { store } = await prompt2({
    name: "store",
    type: "select",
    message: "Select Stores",
    choices,
    theme,
    result() {
      return this.focused.value;
    },
    format(value) {
      return c16.neonGreen(value);
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

// syncify/options/sync.ts
async function setSync(cli) {
  const storeRequired = $.mode.metafields || $.mode.pages || $.mode.redirects || $.mode.themes;
  const themeRequired = $.mode.watch || $.mode.upload || $.mode.import;
  let stores;
  let items = [];
  let queue2 = false;
  if (storeRequired && $.cmd.stores.length === 0 && $.mode.themes === false) {
    invalidCommand({
      expected: "syncify <store>",
      message: [
        "You have not provided a store to target, which is required when",
        "there are multiple stores defined in your setup. Because you are",
        "executing syncify in a mode which will transfers files to a remote",
        "source, it is unable to determine which store to target."
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
    stores = $.cmd.stores.length === 0 ? $.stores.map(({ domain }) => domain) : $.cmd.stores;
    items = $.stores.filter(({ domain }) => includes(domain, stores));
    queue2 = items.length > 1;
  }
  for (const store of items) {
    const domain = `${store.domain}.myshopify.com`.toLowerCase();
    const client2 = authURL(store.domain);
    const sidx = $.sync.stores.push({
      store: store.domain,
      password: store.password,
      domain,
      client: client2,
      queue: queue2
    }) - 1;
    if ($.mode.themes) continue;
    if ($.mode.metafields || $.mode.pages) return;
    let themes2 = [];
    if (has("theme", cli)) {
      themes2 = cli.theme.split(",");
    } else if (has(store.domain, cli)) {
      themes2 = cli[store.domain].split(",");
    } else if (has("themes", store)) {
      themes2 = keys(store.themes);
    }
    if (themes2.length === 0 && !$.mode.build && !$.mode.publish) {
      await listThemes($.sync.stores[sidx]);
    }
    for (const target of themes2) {
      if (!has(target, store.themes)) {
        invalidTarget({
          type: "theme",
          expected: keys(store.themes).join(","),
          provided: target,
          message: [
            `Unknown theme target (${(0, import_ansi22.blue)(target)}) provided to ${(0, import_ansi22.blue)(store.domain)} store`,
            `Your ${(0, import_ansi22.blue)("package.json")} file contains no such theme using this name.`
          ],
          fix: [
            `Provide an ${(0, import_ansi22.blue)("expected")} theme target or update/add an existing target.`,
            `You have ${(0, import_ansi22.blue)(`${themes2.length}`)} theme targets defined for ${(0, import_ansi22.blue)(store.domain)}:`,
            "\n\n",
            `${import_ansi22.DSH} ${themes2.join(`
${import_ansi22.DSH} `)}`,
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
  if (themeRequired && $.sync.themes.length === 0) {
    invalidCommand(
      {
        expected: "-t <theme>",
        message: [
          "You have not provided a theme to target, which is required",
          "when running syncify in this resource mode."
        ],
        fix: [
          `Provide a theme name to target following a ${(0, import_ansi22.blue)("-t")} or ${(0, import_ansi22.blue)("--theme")} flag.`,
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
init_esm_shims();
var import_anymatch4 = __toESM(require_anymatch());
import glob6 from "fast-glob";
var import_ansi23 = __toESM(require_dist());
async function setPaths() {
  const path4 = normalPath($.dirs.input);
  const warn3 = warnOption("paths");
  const getGlobs = (key, files, fallback) => {
    if (isNil(files)) return [path4(fallback)];
    if (isArray(files)) return files.map(path4);
    if (isString(files)) return [path4(files)];
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
        warn3(`Undefined path/s on "${key}", using fallback`, "{}");
        return [path4(fallback)];
      }
      if ("*" in files && "[name]" in files) {
        warn3("Multiple fallback rename keys, paths will be merged", '"*" and "[name]"');
        if (isArray(files["*"])) {
          if (isArray(files["[name]"])) {
            files["*"] = [...files["*"], ...files["[name]"]];
          } else if (isString(files["[name]"])) {
            files["*"].push(files["[name]"]);
          }
          delete files["[name]"];
        } else if (isArray(files["[name]"])) {
          if (isArray(files["*"])) {
            files["[name]"] = [...files["[name]"], ...files["*"]];
          } else if (isString(files["*"])) {
            files["[name]"].push(files["*"]);
          }
          delete files["*"];
        }
      }
      const global = /* @__PURE__ */ new Map();
      const rename2 = /* @__PURE__ */ new Map();
      for (const pattern in files) {
        if (isArray(files[pattern])) {
          const model = pattern === "*" || pattern === "[name]" ? global.has(pattern) ? global.get(pattern) : global.set(pattern, /* @__PURE__ */ new Set()).get(pattern) : rename2.has(pattern) ? rename2.get(pattern) : rename2.set(pattern, /* @__PURE__ */ new Set()).get(pattern);
          for (let i = 0, s = files[pattern].length; i < s; i++) {
            const glob8 = path4(files[pattern][i]);
            $.watch.add(glob8);
            model.add(glob8);
          }
        } else if (isString(files)) {
          pattern === "*" || pattern === "[name]" ? global.has(pattern) ? global.get(pattern).add(path4(files[pattern])) : global.set(pattern, /* @__PURE__ */ new Set([path4(files[pattern])])) : rename2.has(pattern) ? rename2.get(pattern).add(path4(files[pattern])) : rename2.set(pattern, /* @__PURE__ */ new Set([path4(files[pattern])]));
        } else if (isNil(files[pattern])) {
          typeError({
            option: `paths ${import_ansi23.ARR} ${key}`,
            expects: "string | string[]",
            provided: files[pattern],
            name: pattern
          });
        }
      }
      const entries = [...global.values()].flatMap((globs) => [...globs]);
      for (const [pattern, globs] of rename2) {
        const spread = [...globs.values()];
        entries.push(...spread);
        $.paths[key].rename.push([(0, import_anymatch4.default)(spread), pattern]);
      }
      return entries;
    } else {
      return getGlobs(key, files, fallback);
    }
  };
  for (const key of PATH_KEYS) {
    let paths2 = [];
    if (key === "snippets" || key === "sections") {
      paths2 = renameGlobs(key, `${key}/*`);
    } else if (key === "customers" || key === "metaobject") {
      paths2 = getGlobs(key, $.config.paths[key], `templates/${key}/*`);
    } else {
      paths2 = getGlobs(key, $.config.paths[key], `${key}/*`);
    }
    $.paths[key].match = (0, import_anymatch4.default)(paths2);
    if (key !== "metafields" && key !== "redirects") {
      for (const p of paths2) {
        const globs = await glob6.async(paths2, { cwd: $.cwd });
        $.watch.add(p);
        for (let i = 0, s = globs.length; i < s; i++) {
          $.paths[key].input.add(globs[i]);
          $.watch.add(globs[i]);
        }
      }
    }
  }
}

// syncify/options/version.ts
init_esm_shims();
import { join as join15 } from "node:path";
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
  const has4 = hasProp($.cache.build);
  if (!has4("syncifyVersion")) {
    $.cache.build.syncifyVersion = $.version;
  }
  if (!has4("themeVersion")) {
    $.cache.build.themeVersion = $.pkg.version;
  }
  if ($.cache.build.themeVersion !== $.pkg.number) {
    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = join15($.dirs.export, `v${$.vc.major}`);
    $.vc.update.zip = join15($.vc.update.dir, `${$.vc.number}.zip`);
    const v = parseVersionNumber($.cache.build.themeVersion);
    $.vc.number = $.cache.build.themeVersion;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = join15($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = join15($.vc.dir, `${$.vc.number}.zip`);
  } else {
    const v = parseVersionNumber($.pkg.version);
    $.vc.number = $.pkg.version;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = join15($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = join15($.vc.dir, `${$.vc.number}.zip`);
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
      $.vc.update.dir = join15($.dirs.export, `v${$.vc.update.major}`);
    }
    $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
    $.vc.update.zip = join15($.vc.update.dir, `${$.vc.update.number}.zip`);
  }
}

// syncify/options/spawn.ts
init_esm_shims();
var import_tree_kill = __toESM(require_tree_kill());
var import_ansi24 = __toESM(require_dist());

// syncify/cli/spawn.ts
init_esm_shims();
import { spawn as spawn3 } from "node:child_process";
function spawned(name, command3, callback) {
  const child = spawn3(command3.cmd, command3.args, { stdio: "pipe" });
  command3.pid = child.pid;
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
init_esm_shims();
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
  const { mode, spawn: spawn5, config } = $;
  if (!has("spawn", config) || isNil(config.spawn)) return;
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
  const has4 = hasProp(config.spawn);
  let run2 = null;
  if (mode.build && has4("build")) run2 = "build";
  if (mode.watch && has4("watch")) run2 = "watch";
  if (isNil(mode) || isNil(config.spawn[run2])) return;
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
  if (isEmpty(config.spawn[run2])) return;
  for (const name in config.spawn[run2]) {
    const command3 = config.spawn[run2][name];
    if (isString(command3)) {
      $.spawn.commands[name] = object();
      const cmd2 = command3.trimStart().indexOf(" ") > -1 ? command3.trimStart().split(" ") : [command3];
      $.spawn.commands[name].cmd = cmd2.shift().trim();
      $.spawn.commands[name].args = cmd2;
      $.spawn.commands[name].pid = NaN;
      spawned(name, $.spawn.commands[name], spawn2(name));
    } else if (isArray(command3)) {
      const cmd2 = command3.shift().trim();
      $.spawn.commands[name] = object({
        cmd: cmd2,
        args: command3,
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
    spawn5.streams.forEach((child, name) => {
      log(`- ${(0, import_ansi24.gray)(`pid: #${child.pid} (${name}) process exited`)}`);
      (0, import_tree_kill.default)(child.pid);
    });
    nwl("");
    spawn5.streams.clear();
    process.exit(0);
  });
}

// syncify/options/script.ts
init_esm_shims();
var import_anymatch5 = __toESM(require_anymatch());
import { join as join16 } from "node:path";
async function setScriptOptions() {
  if (!has("script", $.config.transform)) return;
  if (!$.config.transform.script || isEmpty($.config.transform.script)) return;
  const warn3 = warnOption("Script Transform");
  if (has("entryPoints", $.processor.esbuild)) {
    warn3("processor option is not allowed and was omitted", "entryPoints");
    delete $.processor.esbuild.entryPoints;
  }
  const transforms = getTransform($.config.transform.script, {
    addWatch: false,
    flatten: true
  });
  const esbuildOptions = omit(["input", "watch", "rename", "snippet"]);
  if (!has("absWorkingDir", $.processor.esbuild)) {
    $.processor.esbuild.absWorkingDir = $.cwd;
  }
  for (const script2 of transforms) {
    const keyDir = script2.snippet ? "snippets" : "assets";
    const { name } = renameFileParse(script2.input, script2.rename);
    let rename2;
    if (!name.endsWith(".js") && !name.endsWith(".mjs")) {
      rename2 = name + ".js";
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
      rename2 = name;
    }
    const has4 = hasProp(script2);
    const bundle = object();
    if (script2.snippet) {
      if (!rename2.endsWith(".liquid")) rename2 = rename2 + ".liquid";
      bundle.attrs = [];
      bundle.snippet = true;
      bundle.namespace = "snippets" /* Snippets */;
      bundle.type = 3 /* Snippet */;
      if (has4("attrs") && isEmpty(script2.attrs) === false) {
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
      bundle.type = 10 /* Script */;
    }
    bundle.uuid = uuid();
    bundle.snippet = script2.snippet;
    bundle.input = script2.input;
    bundle.output = join16($.dirs.output, keyDir, rename2);
    bundle.key = join16(keyDir, rename2);
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;
    $.processor.esbuild.outfile = bundle.output;
    if ($.mode.watch) $.watch.unwatch(bundle.output);
    if (has4("esbuild")) {
      if (isBoolean(script2.esbuild) || isNil(script2.esbuild)) {
        bundle.esbuild = isEmpty(esbuildOptions) ? merge($.processor.esbuild) : merge($.processor.esbuild, esbuildOptions);
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
        if (esProp("plugins") && has("plugins", $.processor.esbuild)) {
          script2.esbuild.plugins.unshift(...$.processor.esbuild.plugins);
        }
        bundle.esbuild = isEmpty(esbuildOptions) ? merge($.processor.esbuild, script2.esbuild) : merge($.processor.esbuild, script2.esbuild, esbuildOptions);
      } else {
        typeError({
          option: "script",
          name: "esbuild",
          provided: typeof script2.esbuild,
          expects: "boolean | null | {}"
        });
      }
    } else {
      bundle.esbuild = isEmpty(esbuildOptions) ? merge($.processor.esbuild) : merge($.processor.esbuild, esbuildOptions);
    }
    bundle.esbuild.entryPoints = [bundle.input];
    if ($.mode.watch) {
      if (!has4("watch")) {
        bundle.watch = /* @__PURE__ */ new Set();
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
init_esm_shims();
var import_anymatch6 = __toESM(require_anymatch());
import glob7 from "fast-glob";
import { join as join17, extname as extname5 } from "node:path";
import { exists } from "fs-extra";
async function getExternalModules() {
  const postcss4 = await readConfigFile(join17($.dirs.config, "postcss.config"), {
    tsconfig: null
  });
  if (postcss4 !== null) {
    $.processor.postcss.file = postcss4.path;
    $.processor.postcss.config = postcss4.config;
    $.watch.add(postcss4.path);
  }
  $.processor.tailwind.installed = getModules($.pkg, "tailwindcss");
  if ($.processor.tailwind.installed) {
    const loaded = await load("tailwind");
    if (!loaded) {
      throwError("Unable to dynamically import TailwindCSS", [
        "Ensure you have installed tailwindcss"
      ]);
    }
    const tw = await readConfigFile(join17($.dirs.config, "tailwind.config"), {
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
    const loaded = await load("sass");
    if (!loaded) {
      throwError("Unable to dynamically import SASS", [
        "Ensure you have installed sass"
      ]);
    }
  }
}
async function setStyleConfig() {
  if (!has("style", $.config.transform)) return;
  if (!$.config.transform.style || isEmpty($.config.transform.style)) return;
  await getExternalModules();
  const warn3 = warnOption("Style Transform");
  const styles = getTransform($.config.transform.style, {
    addWatch: false,
    flatten: true
  });
  const path4 = normalPath($.config.input);
  for (let i = 0; i < styles.length; i++) {
    const style2 = styles[i];
    const has4 = hasProp(style2);
    const bundle = object();
    bundle.uuid = uuid();
    bundle.input = style2.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = null;
    bundle.sass = false;
    bundle.tailwind = null;
    if (has4("postcss")) {
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
    if (has4("tailwind")) {
      if (!$.processor.tailwind.installed) {
        missingDependency("tailwindcss");
      }
      const override = isObject(style2.tailwind);
      if (override || isBoolean(style2.tailwind) && style2.tailwind !== false && isNil(style2.tailwind) === false) {
        const tw = merge(override ? style2.tailwind : $.processor.tailwind.config);
        if (isArray(tw.content) && isEmpty(tw.content)) {
          tw.content = [join17($.dirs.input, "**", "*.{js,ts,jsx,tsx,vue,svelte,liquid,json,schema}")];
        }
        defineProperty(bundle, "tailwind", {
          get() {
            return tw;
          }
        });
        if ($.mode.watch && isArray(bundle.tailwind.content)) {
          const files = await glob7(bundle.tailwind.content);
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
    if (has4("sass") && style2.sass !== false && $.processor.sass.installed === true) {
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
                for (const path5 of style2.sass[option]) {
                  const resolve3 = join17($.cwd, path5);
                  if (await exists(resolve3)) {
                    includePaths.push(resolve3);
                  } else {
                    warn3("Cannot resolve sass includePath entry", path5);
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
      if (style2.snippet === false && !/\.s[ac]ss/.test(extname5(bundle.input))) {
        warn3("Input is not a sass file", bundle.input);
      }
    }
    let rename2 = renameFileParse(style2.rename);
    if (has4("rename") && isNil(style2) === false) {
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
      rename2 = renameFileParse(bundle.input, style2.rename);
      if (/[a-zA-Z0-9_.-]+/.test(rename2.name) === false) {
        typeError(
          {
            option: "sass",
            name: "rename",
            provided: rename2,
            expects: "Characters: [a-zA-Z0-9_.-]"
          }
        );
      }
      if (rename2.name.endsWith(".css")) {
        bundle.rename = rename2.name;
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
    if ($.mode.watch && has4("watch")) {
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
        const globs = await glob7(join17($.cwd, path4(uri)));
        if (globs.length === 0 && uri[0] !== "!") {
          warn3("Cannot resolve watch glob/path uri", uri);
        }
        for (const p of globs) {
          if (await exists(p)) {
            watch2.push(p);
          } else {
            warn3("No file exists in path", p);
          }
        }
      }
      ;
      watch2.push(bundle.input);
      for (const path5 of watch2) $.watch.add(path5);
      bundle.watch = (0, import_anymatch6.default)(watch2);
    } else {
      bundle.watch = (0, import_anymatch6.default)([bundle.input]);
      $.watch.add(bundle.input);
    }
    if (isObject(bundle.sass)) {
      bundle.sass.include.unshift($.cwd, join17($.cwd, rename2.dir));
      if (hasPath2("sass.include", style2)) {
        bundle.sass.include = style2.sass.include.map((p) => join17($.cwd, p));
      }
    }
    if (has4("snippet")) {
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
      if (bundle.snippet === true && has4("attrs") && isEmpty(style2.attrs) === false) {
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
        bundle.rename = rename2.name;
      }
      if (rename2.name.endsWith(".liquid") === false || bundle.rename.endsWith(".liquid") === false) {
        bundle.rename = rename2.name + ".liquid";
      }
      $.paths.transforms.set(bundle.input, 9 /* Style */);
      if ($.mode.watch) {
        $.watch.unwatch(join17($.dirs.output, "snippets", bundle.rename));
      }
    } else {
      bundle.rename = rename2.name;
      if ($.mode.watch) {
        $.watch.unwatch(join17($.dirs.output, "assets", rename2.name));
      }
    }
    $.style.push(bundle);
  }
  ;
}

// syncify/options/liquid.ts
init_esm_shims();
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
  const warn3 = warnOption("liquid configuration");
  if (has("terse", $.config.transform.liquid) && mode.terse === true) {
    if (isEmpty($.config.transform.liquid.terse)) {
      $.liquid.terse.enabled = false;
      warn3("Terse option is empty, minification will not apply");
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
        $.liquid.terse.exclude = (0, import_anymatch7.default)(getResolvedPaths(terse.exclude));
      }
    }
  }
}

// syncify/options/svg.ts
init_esm_shims();
var import_ansi25 = __toESM(require_dist());
import { extname as extname6, relative as relative13 } from "node:path";
async function setSvgOptions() {
  if (!has("svg", $.config.transform)) return;
  if (!$.config.transform.svg || isEmpty($.config.transform.svg)) return;
  const warn3 = warnOption("SVG Transform");
  const svgs = getTransform($.config.transform.svg, {
    addWatch: true,
    flatten: false
  });
  for (const svg2 of svgs) {
    const files = svg2.input.filter((path4) => {
      if (extname6(path4) === ".svg") return true;
      warn3("Excluded file which is not an SVG type", relative13($.cwd, path4));
      return false;
    });
    if (files.length === 0) {
      warn3("No SVG file paths were resolved");
      continue;
    }
    const has4 = hasProp(svg2);
    const bundle = object();
    bundle.uuid = uuid();
    bundle.input = new Set(files);
    bundle.format = null;
    bundle.match = svg2.match;
    bundle.rename = svg2.rename;
    bundle.snippet = svg2.snippet;
    if (has4("svgo") && has4("sprite")) {
      invalidError(
        {
          option: "transform",
          name: "svg",
          value: "svgo AND sprite",
          expects: "svgo OR sprite"
        }
      );
    }
    if (!has4("format")) {
      if (has4("svgo")) {
        bundle.format = "file";
        bundle.svgo = isObject(svg2.svgo) ? merge($.processor.svgo, svg2.svgo) : true;
      } else if (has4("sprite")) {
        bundle.format = "sprite";
        bundle.sprite = isObject(svg2.sprite) ? merge($.processor.sprite, svg2.sprite) : true;
      } else if (bundle.snippet === true) {
        bundle.format = "file";
        bundle.svgo = isObject(svg2.svgo) ? merge($.processor.svgo, svg2.svgo) : true;
      } else {
        missingOption(
          {
            option: "transform.svg",
            key: "format",
            expects: "sprite | file",
            reason: [
              `SVG transforms require you to define ${(0, import_ansi25.cyan)("format")} Syncify needs to knows how`,
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
init_esm_shims();
import { join as join19 } from "node:path";

// syncify/hot/socket.ts
init_esm_shims();
import { uWS as uWS2 } from "@syncify/uws";
var import_ansi27 = __toESM(require_dist());

// syncify/hot/server.ts
init_esm_shims();
var import_ansi26 = __toESM(require_dist());
import { uWS } from "@syncify/uws";
import { readFileSync as readFileSync3, existsSync as existsSync3, ensureFile, readFile as readFile13 } from "fs-extra";
import { join as join18, extname as extname7 } from "node:path";
var HOTError = {
  enable: true,
  output: []
};
async function server() {
  if (!HOTError.enable) {
    HOTError.output.push(
      import_ansi26.Tree.red,
      import_ansi26.Tree.red + (0, import_ansi26.redBright)("Change the socket port address or kill the session occupying it."),
      import_ansi26.Tree.red + (0, import_ansi26.redBright)("This error typically occurs when multiple Syncify instances are active.")
    );
    error2((0, import_ansi26.redBright)(`${(0, import_ansi26.bold)("ERROR")} on ${(0, import_ansi26.bold)(`${$.hot.method === "hot" ? "HOT" : "LIVE"} Reload:`)}`));
    log(HOTError.output.join("\n"));
    return null;
  }
  log((0, import_ansi26.Line)((0, import_ansi26.bold)(`${$.hot.method === "hot" ? "HOT Reload" : "LIVE Reload"}${import_ansi26.COL}`)));
  import_ansi5.update((0, import_ansi26.Line)("configuring HOT Reload"));
  const url = join18($.dirs.output, "assets");
  const app = uWS.App();
  const hot2 = await readFile13($.hot.source);
  app.get("/*", (response, request2) => {
    const key = request2.getUrl();
    if (key === "/") {
      response.endWithoutBody();
    } else {
      const ext = extname7(key);
      const uri = join18(url, key);
      response.writeHeader("Access-Control-Allow-Origin", "*");
      response.writeHeader("Cache-Control", "public, max-age=0");
      if (ext === ".js" || ext === ".mjs") {
        response.writeHeader("Content-Type", "application/javascript");
      } else if (ext === ".css") {
        response.writeHeader("Content-Type", "text/css");
      } else if (ext === ".json") {
        response.writeHeader("Content-Type", "application/json");
      }
      if (existsSync3(uri) && ensureFile(uri)) {
        response.end(readFileSync3(uri));
      } else if (key.endsWith("hot.js")) {
        response.end(hot2);
      } else {
        response.endWithoutBody();
      }
    }
  });
  app.listen($.hot.server, (token) => {
    if (token) {
      import_ansi5.update((0, import_ansi26.Line)(`${(0, import_ansi26.neonCyan)("server")}  ${import_ansi26.ARR}  ${(0, import_ansi26.gray)("PORT")}  ${import_ansi26.ARR} ${(0, import_ansi26.pink)(`${$.hot.server}`)}`));
    } else {
      console.log("Failed to listen to port " + $.hot.server);
    }
  });
  return app;
}

// syncify/hot/socket.ts
async function socket() {
  let listener;
  const app = await server();
  const ws = app.ws("/ws", {
    compression: uWS2.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    open: (ws2) => {
      HOT_SOCKET_TOPICS.forEach((topic) => ws2.subscribe(topic));
    },
    message: (_, message, isBinary) => {
      hot(Buffer.from(message).toString(isBinary ? "binary" : "utf8"));
    }
  }).listen($.hot.socket, (token) => {
    listener = token;
    if (token) {
      log((0, import_ansi27.Line)(`${(0, import_ansi27.neonCyan)("socket")}  ${import_ansi27.ARR}  ${(0, import_ansi27.gray)("PORT")}  ${import_ansi27.ARR} ${(0, import_ansi27.pink)(`${$.hot.socket}`)}`));
      nwl();
    } else {
      console.log("Failed to listen on websocket");
    }
  });
  kill(() => {
    ws.close();
    uWS2.us_listen_socket_close(listener);
  });
  return {
    get http() {
      return ws;
    },
    script: (uuid2, src) => ws.publish("script", `script,${src},${uuid2}`),
    stylesheet: (uuid2, href) => ws.publish("stylesheet", `stylesheet,${href},${uuid2}`),
    section: (id) => ws.publish("section", `section,${id}`),
    svg: (id) => ws.publish("svg", `svg,${id}`),
    assets: () => ws.publish("assets", "assets"),
    reload: () => ws.publish("reload", "reload"),
    replace: () => ws.publish("replace", "replace"),
    connected: () => ws.publish("connected", "connected"),
    disconnect: () => ws.publish("disconnect", "disconnect")
  };
}

// syncify/options/hot.ts
async function setHotReloads() {
  if ($.mode.watch !== true) return;
  if ($.mode.hot === false && $.config.hot === false) return;
  $.hot.source = join19($.cwd, "node_modules", "@syncify/cli", "hot.js");
  const warn3 = warnOption("HOT Reloads");
  if ($.env.sync > 1) {
    warn3("HOT Reloads can only be used on 1 store");
    return;
  } else if ($.sync.themes.length > 1) {
    warn3("HOT Reloads can only be used on 1 theme");
    return;
  }
  if (allFalse(isObject($.config.hot), isBoolean($.config.hot), isNil($.config.hot))) {
    typeError({
      option: "config",
      name: "hot",
      provided: $.config.hot,
      expects: "boolean | {}"
    });
  }
  if (isObject($.config.hot) && isEmpty($.config.hot) === false) {
    const has4 = hasProp($.hot);
    for (const prop in $.config.hot) {
      if (!has4(prop)) {
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
  $.wss = await socket();
}

// syncify/options/filters.ts
init_esm_shims();
import { join as join20 } from "node:path";
var import_ansi28 = __toESM(require_dist());
function throwCommandError(type2, cmd2) {
  const pattern = [];
  const ref = object();
  if ($.mode.upload) {
    ref.base = "output";
    ref.from = "output";
    ref.dirs = THEME_DIRS.map((dir) => `${(0, import_ansi28.white)("-")} ${(0, import_ansi28.blue)(dir)}`);
    ref.fix = [
      `The ${(0, import_ansi28.blue)("--filter")} (or ${(0, import_ansi28.blue)("-f")}) flag command argument expects you`,
      "provide a theme output directory as the starting point. Filtering begins with",
      "a Shopify output directory name, for example:",
      "",
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("sections/file.liquid")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("snippets/*")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("templates/*.json")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${(0, import_ansi28.bold)(ref.base)} directory`,
      "based on the starting point directory name. You can pass glob star matches following the",
      `directory namespace or starting point ignores (${(0, import_ansi28.blue)("!")}) as long the directory can match.`
    ];
  } else {
    ref.base = "input";
    ref.from = "paths";
    ref.dirs = PATH_KEYS.map((dir) => `${(0, import_ansi28.white)("-")} ${(0, import_ansi28.blue)(dir)}`);
    ref.fix = [
      `The ${(0, import_ansi28.blue)("--filter")} (or ${(0, import_ansi28.blue)("-f")}) flag command argument expects you`,
      `provide a ${import_ansi28.yellow.bold("paths")} key name as the starting point. Filtering begins with`,
      "a Shopify output directory name, for example:",
      "",
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("sections/file.liquid")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("snippets/*")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("templates/*.json")}`)}`,
      `${(0, import_ansi28.white)("$")} ${(0, import_ansi28.white)(`syncify --filter ${(0, import_ansi28.blue)("!assets/some-file.ext")}`)}`,
      "",
      `Syncify will automatically resolve files from within your defined ${(0, import_ansi28.bold)(ref.base)} directory`,
      `based on the starting point ${(0, import_ansi28.bold)("paths")} name. You can pass glob star matches following the`,
      `starting point or ignores (${(0, import_ansi28.blue)("!")}) as long the reference can match.`
    ];
  }
  if (type2 === "pattern") {
    pattern.push(`Invalid ${(0, import_ansi28.blue)("--filter")} pattern provided. You cannot pass starting point`);
    if (cmd2[0] === "*") {
      pattern.push(`glob (${(0, import_ansi28.blue)("*")}) stars as filters, Syncify does not support this.`);
    } else if (cmd2[0] === "/") {
      pattern.push(`path (${(0, import_ansi28.blue)("/")}) roots as filters, Syncify does not support this.`);
    } else if (cmd2[0] === ".") {
      pattern.push(`dot paths (${(0, import_ansi28.blue)(".")})  as filters, Syncify does not support this.`);
    }
    pattern.push(
      `Use a starting point reference name based on the ${(0, import_ansi28.blue)(ref.from)} key property`,
      `in your ${(0, import_ansi28.blue)($.file.base)} file.`
    );
  } else {
    pattern.push(
      `Invalid directory provided. The ${(0, import_ansi28.blue)("--filter")} pattern expects the starting point`,
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
  const path4 = input.slice(0, input.indexOf("/"));
  if (!isArray($.filters[path4])) $.filters[path4] = [];
  $.filters[path4].push(join20(base, input));
}
function setFilters(cli) {
  if (!has("filter", cli)) return;
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
init_esm_shims();
async function setPublishConfig() {
  return;
  if (isObject($.config.publish) && isEmpty($.config.publish) === false) {
    for (const prop in $.config.publish) {
      if (!has(prop, $.publish)) unknownError(`publish.${prop}`, $.config.publish[prop]);
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
  }
}

// syncify/hot/launch.ts
init_esm_shims();

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/index.js
init_esm_shims();

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/chrome-launcher.js
init_esm_shims();
import * as fs2 from "fs";
import * as net from "net";

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/chrome-finder.js
var chrome_finder_exports = {};
__export(chrome_finder_exports, {
  darwin: () => darwin,
  darwinFast: () => darwinFast,
  linux: () => linux,
  win32: () => win32,
  wsl: () => wsl
});
init_esm_shims();
var import_escape_string_regexp = __toESM(require_escape_string_regexp2(), 1);
import fs from "fs";
import path3 from "path";
import { homedir as homedir2 } from "os";
import { execSync, execFileSync } from "child_process";

// node_modules/.pnpm/lighthouse-logger@2.0.1/node_modules/lighthouse-logger/index.js
init_esm_shims();
var import_debug = __toESM(require_src(), 1);
import process3 from "process";
import { EventEmitter as EventEmitter3 } from "events";

// node_modules/.pnpm/marky@1.2.5/node_modules/marky/lib/marky.es.js
init_esm_shims();
var perf = typeof performance !== "undefined" && performance;
var nowPolyfillForNode;
{
  hrtime = process.hrtime;
  getNanoSeconds = function() {
    var hr = hrtime();
    return hr[0] * 1e9 + hr[1];
  };
  loadTime = getNanoSeconds();
  nowPolyfillForNode = function() {
    return (getNanoSeconds() - loadTime) / 1e6;
  };
}
var hrtime;
var getNanoSeconds;
var loadTime;
var now = perf && perf.now ? function() {
  return perf.now();
} : nowPolyfillForNode;
function throwIfEmpty(name) {
  if (!name) {
    throw new Error("name must be non-empty");
  }
}
function insertSorted(arr, item) {
  var low = 0;
  var high = arr.length;
  var mid;
  while (low < high) {
    mid = low + high >>> 1;
    if (arr[mid].startTime < item.startTime) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  arr.splice(low, 0, item);
}
var mark;
var stop;
var getEntries;
var clear5;
if (perf && perf.mark && perf.measure && perf.getEntriesByName && perf.getEntriesByType && perf.clearMarks && perf.clearMeasures && // In Node, we want to detect that this perf/correctness fix [1] is available, which
// landed in Node 16.15.0, 17.6.0, and 18.0.0. However, it's not observable, and
// we don't want to rely on fragile version checks.
// So we can rely on this observable change [2] to add clearResourceTimings, which
// landed a bit later (18.2.0), but is close enough for our purposes.
// [1]: https://github.com/nodejs/node/pull/42032
// [2]: https://github.com/nodejs/node/pull/42725
perf.clearResourceTimings) {
  mark = function(name) {
    throwIfEmpty(name);
    perf.mark("start " + name);
  };
  stop = function(name) {
    throwIfEmpty(name);
    perf.mark("end " + name);
    var measure = perf.measure(name, "start " + name, "end " + name);
    if (measure) {
      return measure;
    }
    var entries = perf.getEntriesByName(name);
    return entries[entries.length - 1];
  };
  getEntries = function() {
    return perf.getEntriesByType("measure");
  };
  clear5 = function() {
    perf.clearMarks();
    perf.clearMeasures();
  };
} else {
  marks = {};
  entries = [];
  mark = function(name) {
    throwIfEmpty(name);
    var startTime = now();
    marks["$" + name] = startTime;
  };
  stop = function(name) {
    throwIfEmpty(name);
    var endTime = now();
    var startTime = marks["$" + name];
    if (!startTime) {
      throw new Error("no known mark: " + name);
    }
    var entry = {
      startTime,
      name,
      duration: endTime - startTime,
      entryType: "measure"
    };
    insertSorted(entries, entry);
    return entry;
  };
  getEntries = function() {
    return entries;
  };
  clear5 = function() {
    marks = {};
    entries = [];
  };
}
var marks;
var entries;

// node_modules/.pnpm/lighthouse-logger@2.0.1/node_modules/lighthouse-logger/index.js
var isWindows = process3.platform === "win32";
var isBrowser = process3.browser;
var colors = {
  red: isBrowser ? "crimson" : 1,
  yellow: isBrowser ? "gold" : 3,
  cyan: isBrowser ? "darkturquoise" : 6,
  green: isBrowser ? "forestgreen" : 2,
  blue: isBrowser ? "steelblue" : 4,
  magenta: isBrowser ? "palevioletred" : 5
};
import_debug.default.colors = [colors.cyan, colors.green, colors.blue, colors.magenta];
var Emitter = class extends EventEmitter3 {
  /**
   * Fires off all status updates. Listen with
   * `require('lib/log').events.addListener('status', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueStatus(title2, argsArray) {
    if (title2 === "status" || title2 === "statusEnd") {
      this.emit(title2, [title2, ...argsArray]);
    }
  }
  /**
   * Fires off all warnings. Listen with
   * `require('lib/log').events.addListener('warning', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueWarning(title2, argsArray) {
    this.emit("warning", [title2, ...argsArray]);
  }
};
var loggersByTitle = {};
var loggingBufferColumns = 25;
var level_;
var Log = class _Log {
  static _logToStdErr(title2, argsArray) {
    const log2 = _Log.loggerfn(title2);
    log2(...argsArray);
  }
  /**
   * @param {string} title
   */
  static loggerfn(title2) {
    title2 = `LH:${title2}`;
    let log2 = loggersByTitle[title2];
    if (!log2) {
      log2 = (0, import_debug.default)(title2);
      loggersByTitle[title2] = log2;
      if (title2.endsWith("error")) {
        log2.color = colors.red;
      } else if (title2.endsWith("warn")) {
        log2.color = colors.yellow;
      }
    }
    return log2;
  }
  /**
   * @param {string} level
   */
  static setLevel(level) {
    level_ = level;
    switch (level) {
      case "silent":
        import_debug.default.enable("-LH:*");
        break;
      case "verbose":
        import_debug.default.enable("LH:*");
        break;
      case "warn":
        import_debug.default.enable("-LH:*, LH:*:warn, LH:*:error");
        break;
      case "error":
        import_debug.default.enable("-LH:*, LH:*:error");
        break;
      default:
        import_debug.default.enable("LH:*, -LH:*:verbose");
    }
  }
  /**
   * A simple formatting utility for event logging.
   * @param {string} prefix
   * @param {!Object} data A JSON-serializable object of event data to log.
   * @param {string=} level Optional logging level. Defaults to 'log'.
   */
  static formatProtocol(prefix, data, level) {
    const columns = !process3 || process3.browser ? Infinity : process3.stdout.columns;
    const method = data.method || "?????";
    const maxLength = columns - method.length - prefix.length - loggingBufferColumns;
    const snippet2 = data.params && method !== "IO.read" ? JSON.stringify(data.params).substr(0, maxLength) : "";
    _Log._logToStdErr(`${prefix}:${level || ""}`, [method, snippet2]);
  }
  /**
   * @return {boolean}
   */
  static isVerbose() {
    return level_ === "verbose";
  }
  /**
   * @param {{msg: string, id: string, args?: any[]}} status
   * @param {string} level
   */
  static time({ msg, id, args = [] }, level = "log") {
    mark(id);
    _Log[level]("status", msg, ...args);
  }
  /**
   * @param {{msg: string, id: string, args?: any[]}} status
   * @param {string} level
   */
  static timeEnd({ msg, id, args = [] }, level = "verbose") {
    _Log[level]("statusEnd", msg, ...args);
    stop(id);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static log(title2, ...args) {
    _Log.events.issueStatus(title2, args);
    return _Log._logToStdErr(title2, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static warn(title2, ...args) {
    _Log.events.issueWarning(title2, args);
    return _Log._logToStdErr(`${title2}:warn`, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static error(title2, ...args) {
    return _Log._logToStdErr(`${title2}:error`, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static verbose(title2, ...args) {
    _Log.events.issueStatus(title2, args);
    return _Log._logToStdErr(`${title2}:verbose`, args);
  }
  /**
   * Add surrounding escape sequences to turn a string green when logged.
   * @param {string} str
   * @return {string}
   */
  static greenify(str) {
    return `${_Log.green}${str}${_Log.reset}`;
  }
  /**
   * Add surrounding escape sequences to turn a string red when logged.
   * @param {string} str
   * @return {string}
   */
  static redify(str) {
    return `${_Log.red}${str}${_Log.reset}`;
  }
  static get green() {
    return "\x1B[32m";
  }
  static get red() {
    return "\x1B[31m";
  }
  static get yellow() {
    return "\x1B[33m";
  }
  static get purple() {
    return "\x1B[95m";
  }
  static get reset() {
    return "\x1B[0m";
  }
  static get bold() {
    return "\x1B[1m";
  }
  static get dim() {
    return "\x1B[2m";
  }
  static get tick() {
    return isWindows ? "\u221A" : "\u2713";
  }
  static get cross() {
    return isWindows ? "\xD7" : "\u2718";
  }
  static get whiteSmallSquare() {
    return isWindows ? "\u0387" : "\u25AB";
  }
  static get heavyHorizontal() {
    return isWindows ? "\u2500" : "\u2501";
  }
  static get heavyVertical() {
    return isWindows ? "\u2502 " : "\u2503 ";
  }
  static get heavyUpAndRight() {
    return isWindows ? "\u2514" : "\u2517";
  }
  static get heavyVerticalAndRight() {
    return isWindows ? "\u251C" : "\u2523";
  }
  static get heavyDownAndHorizontal() {
    return isWindows ? "\u252C" : "\u2533";
  }
  static get doubleLightHorizontal() {
    return "\u2500\u2500";
  }
};
Log.events = new Emitter();
Log.takeTimeEntries = () => {
  const entries = getEntries();
  clear5();
  return entries;
};
Log.getTimeEntries = () => getEntries();
var lighthouse_logger_default = Log;

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/utils.js
init_esm_shims();
var import_is_wsl = __toESM(require_is_wsl(), 1);
import { join as join21 } from "path";
import childProcess from "child_process";
import { mkdirSync as mkdirSync2 } from "fs";
function defaults2(val, def) {
  return typeof val === "undefined" ? def : val;
}
async function delay2(time) {
  return new Promise((resolve3) => setTimeout(resolve3, time));
}
var LauncherError = class extends Error {
  constructor(message = "Unexpected error", code) {
    super();
    this.message = message;
    this.code = code;
    this.stack = new Error().stack;
    return this;
  }
};
var ChromePathNotSetError = class extends LauncherError {
  constructor() {
    super(...arguments);
    this.message = "The CHROME_PATH environment variable must be set to a Chrome/Chromium executable no older than Chrome stable.";
    this.code = "ERR_LAUNCHER_PATH_NOT_SET";
  }
};
var InvalidUserDataDirectoryError = class extends LauncherError {
  constructor() {
    super(...arguments);
    this.message = "userDataDir must be false or a path.";
    this.code = "ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY";
  }
};
var UnsupportedPlatformError = class extends LauncherError {
  constructor() {
    super(...arguments);
    this.message = `Platform ${getPlatform()} is not supported.`;
    this.code = "ERR_LAUNCHER_UNSUPPORTED_PLATFORM";
  }
};
var ChromeNotInstalledError = class extends LauncherError {
  constructor() {
    super(...arguments);
    this.message = "No Chrome installations found.";
    this.code = "ERR_LAUNCHER_NOT_INSTALLED";
  }
};
function getPlatform() {
  return import_is_wsl.default ? "wsl" : process.platform;
}
function makeTmpDir() {
  switch (getPlatform()) {
    case "darwin":
    case "linux":
      return makeUnixTmpDir();
    case "wsl":
      process.env.TEMP = getWSLLocalAppDataPath(`${process.env.PATH}`);
    case "win32":
      return makeWin32TmpDir();
    default:
      throw new UnsupportedPlatformError();
  }
}
function toWinDirFormat(dir = "") {
  const results = /\/mnt\/([a-z])\//.exec(dir);
  if (!results) {
    return dir;
  }
  const driveLetter = results[1];
  return dir.replace(`/mnt/${driveLetter}/`, `${driveLetter.toUpperCase()}:\\`).replace(/\//g, "\\");
}
function toWin32Path(dir = "") {
  if (/[a-z]:\\/iu.test(dir)) {
    return dir;
  }
  try {
    return childProcess.execFileSync("wslpath", ["-w", dir]).toString().trim();
  } catch {
    return toWinDirFormat(dir);
  }
}
function toWSLPath(dir, fallback) {
  try {
    return childProcess.execFileSync("wslpath", ["-u", dir]).toString().trim();
  } catch {
    return fallback;
  }
}
function getLocalAppDataPath(path4) {
  const userRegExp = /\/mnt\/([a-z])\/Users\/([^\/:]+)\/AppData\//;
  const results = userRegExp.exec(path4) || [];
  return `/mnt/${results[1]}/Users/${results[2]}/AppData/Local`;
}
function getWSLLocalAppDataPath(path4) {
  const userRegExp = /\/([a-z])\/Users\/([^\/:]+)\/AppData\//;
  const results = userRegExp.exec(path4) || [];
  return toWSLPath(`${results[1]}:\\Users\\${results[2]}\\AppData\\Local`, getLocalAppDataPath(path4));
}
function makeUnixTmpDir() {
  return childProcess.execSync("mktemp -d -t lighthouse.XXXXXXX").toString().trim();
}
function makeWin32TmpDir() {
  const winTmpPath = process.env.TEMP || process.env.TMP || (process.env.SystemRoot || process.env.windir) + "\\temp";
  const randomNumber = Math.floor(Math.random() * 9e7 + 1e7);
  const tmpdir2 = join21(winTmpPath, "lighthouse." + randomNumber);
  mkdirSync2(tmpdir2, { recursive: true });
  return tmpdir2;
}

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/chrome-finder.js
var newLineRegex = /\r?\n/;
function darwinFast() {
  const priorityOptions = [
    process.env.CHROME_PATH,
    process.env.LIGHTHOUSE_CHROMIUM_PATH,
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  ];
  for (const chromePath of priorityOptions) {
    if (chromePath && canAccess(chromePath))
      return chromePath;
  }
  return darwin()[0];
}
function darwin() {
  const suffixes = ["/Contents/MacOS/Google Chrome Canary", "/Contents/MacOS/Google Chrome"];
  const LSREGISTER = "/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister";
  const installations = [];
  const customChromePath = resolveChromePath();
  if (customChromePath) {
    installations.push(customChromePath);
  }
  execSync(`${LSREGISTER} -dump | grep -i 'google chrome\\( canary\\)\\?\\.app' | awk '{$1=""; print $0}'`).toString().split(newLineRegex).forEach((inst) => {
    suffixes.forEach((suffix) => {
      const execPath = path3.join(inst.substring(0, inst.indexOf(".app") + 4).trim(), suffix);
      if (canAccess(execPath) && installations.indexOf(execPath) === -1) {
        installations.push(execPath);
      }
    });
  });
  const home = (0, import_escape_string_regexp.default)(process.env.HOME || homedir2());
  const priorities = [
    { regex: new RegExp(`^${home}/Applications/.*Chrome\\.app`), weight: 50 },
    { regex: new RegExp(`^${home}/Applications/.*Chrome Canary\\.app`), weight: 51 },
    { regex: /^\/Applications\/.*Chrome.app/, weight: 100 },
    { regex: /^\/Applications\/.*Chrome Canary.app/, weight: 101 },
    { regex: /^\/Volumes\/.*Chrome.app/, weight: -2 },
    { regex: /^\/Volumes\/.*Chrome Canary.app/, weight: -1 }
  ];
  if (process.env.LIGHTHOUSE_CHROMIUM_PATH) {
    priorities.unshift({ regex: new RegExp((0, import_escape_string_regexp.default)(process.env.LIGHTHOUSE_CHROMIUM_PATH)), weight: 150 });
  }
  if (process.env.CHROME_PATH) {
    priorities.unshift({ regex: new RegExp((0, import_escape_string_regexp.default)(process.env.CHROME_PATH)), weight: 151 });
  }
  return sort(installations, priorities);
}
function resolveChromePath() {
  if (canAccess(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  if (canAccess(process.env.LIGHTHOUSE_CHROMIUM_PATH)) {
    lighthouse_logger_default.warn("ChromeLauncher", "LIGHTHOUSE_CHROMIUM_PATH is deprecated, use CHROME_PATH env variable instead.");
    return process.env.LIGHTHOUSE_CHROMIUM_PATH;
  }
  return void 0;
}
function linux() {
  let installations = [];
  const customChromePath = resolveChromePath();
  if (customChromePath) {
    installations.push(customChromePath);
  }
  const desktopInstallationFolders = [
    path3.join(homedir2(), ".local/share/applications/"),
    "/usr/share/applications/"
  ];
  desktopInstallationFolders.forEach((folder) => {
    installations = installations.concat(findChromeExecutables(folder));
  });
  const executables = [
    "google-chrome-stable",
    "google-chrome",
    "chromium-browser",
    "chromium"
  ];
  executables.forEach((executable) => {
    try {
      const chromePath = execFileSync("which", [executable], { stdio: "pipe" }).toString().split(newLineRegex)[0];
      if (canAccess(chromePath)) {
        installations.push(chromePath);
      }
    } catch (e) {
    }
  });
  if (!installations.length) {
    throw new ChromePathNotSetError();
  }
  const priorities = [
    { regex: /chrome-wrapper$/, weight: 51 },
    { regex: /google-chrome-stable$/, weight: 50 },
    { regex: /google-chrome$/, weight: 49 },
    { regex: /chromium-browser$/, weight: 48 },
    { regex: /chromium$/, weight: 47 }
  ];
  if (process.env.LIGHTHOUSE_CHROMIUM_PATH) {
    priorities.unshift({ regex: new RegExp((0, import_escape_string_regexp.default)(process.env.LIGHTHOUSE_CHROMIUM_PATH)), weight: 100 });
  }
  if (process.env.CHROME_PATH) {
    priorities.unshift({ regex: new RegExp((0, import_escape_string_regexp.default)(process.env.CHROME_PATH)), weight: 101 });
  }
  return sort(uniq(installations.filter(Boolean)), priorities);
}
function wsl() {
  process.env.LOCALAPPDATA = getWSLLocalAppDataPath(`${process.env.PATH}`);
  process.env.PROGRAMFILES = toWSLPath("C:/Program Files", "/mnt/c/Program Files");
  process.env["PROGRAMFILES(X86)"] = toWSLPath("C:/Program Files (x86)", "/mnt/c/Program Files (x86)");
  return win32();
}
function win32() {
  const installations = [];
  const suffixes = [
    `${path3.sep}Google${path3.sep}Chrome SxS${path3.sep}Application${path3.sep}chrome.exe`,
    `${path3.sep}Google${path3.sep}Chrome${path3.sep}Application${path3.sep}chrome.exe`
  ];
  const prefixes = [
    process.env.LOCALAPPDATA,
    process.env.PROGRAMFILES,
    process.env["PROGRAMFILES(X86)"]
  ].filter(Boolean);
  const customChromePath = resolveChromePath();
  if (customChromePath) {
    installations.push(customChromePath);
  }
  prefixes.forEach((prefix) => suffixes.forEach((suffix) => {
    const chromePath = path3.join(prefix, suffix);
    if (canAccess(chromePath)) {
      installations.push(chromePath);
    }
  }));
  return installations;
}
function sort(installations, priorities) {
  const defaultPriority = 10;
  return installations.map((inst) => {
    for (const pair of priorities) {
      if (pair.regex.test(inst)) {
        return { path: inst, weight: pair.weight };
      }
    }
    return { path: inst, weight: defaultPriority };
  }).sort((a, b) => b.weight - a.weight).map((pair) => pair.path);
}
function canAccess(file) {
  if (!file) {
    return false;
  }
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    return false;
  }
}
function uniq(arr) {
  return Array.from(new Set(arr));
}
function findChromeExecutables(folder) {
  const argumentsRegex = /(^[^ ]+).*/;
  const chromeExecRegex = "^Exec=/.*/(google-chrome|chrome|chromium)-.*";
  let installations = [];
  if (canAccess(folder)) {
    let execPaths;
    try {
      execPaths = execSync(`grep -ER "${chromeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: "pipe" });
    } catch (e) {
      execPaths = execSync(`grep -Er "${chromeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: "pipe" });
    }
    execPaths = execPaths.toString().split(newLineRegex).map((execPath) => execPath.replace(argumentsRegex, "$1"));
    execPaths.forEach((execPath) => canAccess(execPath) && installations.push(execPath));
  }
  return installations;
}

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/random-port.js
init_esm_shims();
import { createServer } from "http";
function getRandomPort() {
  return new Promise((resolve3, reject) => {
    const server2 = createServer();
    server2.listen(0);
    server2.once("listening", () => {
      const { port } = server2.address();
      server2.close(() => resolve3(port));
    });
    server2.once("error", reject);
  });
}

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/flags.js
init_esm_shims();
var DEFAULT_FLAGS = [
  "--disable-features=" + [
    // Disable built-in Google Translate service
    "Translate",
    // Disable the Chrome Optimization Guide background networking
    "OptimizationHints",
    //  Disable the Chrome Media Router (cast target discovery) background networking
    "MediaRouter",
    /// Avoid the startup dialog for _Do you want the application “Chromium.app” to accept incoming network connections?_. This is a sub-component of the MediaRouter.
    "DialMediaRouteProvider",
    // Disable the feature of: Calculate window occlusion on Windows will be used in the future to throttle and potentially unload foreground tabs in occluded windows.
    "CalculateNativeWinOcclusion",
    // Disables the Discover feed on NTP
    "InterestFeedContentSuggestions",
    // Don't update the CT lists
    "CertificateTransparencyComponentUpdater",
    // Disables autofill server communication. This feature isn't disabled via other 'parent' flags.
    "AutofillServerCommunication",
    // Disables "Enhanced ad privacy in Chrome" dialog (though as of 2024-03-20 it shouldn't show up if the profile has no stored country).
    "PrivacySandboxSettings4"
  ].join(","),
  // Disable all chrome extensions
  "--disable-extensions",
  // Disable some extensions that aren't affected by --disable-extensions
  "--disable-component-extensions-with-background-pages",
  // Disable various background network services, including extension updating,
  //   safe browsing service, upgrade detector, translate, UMA
  "--disable-background-networking",
  // Don't update the browser 'components' listed at chrome://components/
  "--disable-component-update",
  // Disables client-side phishing detection.
  "--disable-client-side-phishing-detection",
  // Disable syncing to a Google account
  "--disable-sync",
  // Disable reporting to UMA, but allows for collection
  "--metrics-recording-only",
  // Disable installation of default apps on first run
  "--disable-default-apps",
  // Mute any audio
  "--mute-audio",
  // Disable the default browser check, do not prompt to set it as such
  "--no-default-browser-check",
  // Skip first run wizards
  "--no-first-run",
  // Disable backgrounding renders for occluded windows
  "--disable-backgrounding-occluded-windows",
  // Disable renderer process backgrounding
  "--disable-renderer-backgrounding",
  // Disable task throttling of timer tasks from background pages.
  "--disable-background-timer-throttling",
  // Disable the default throttling of IPC between renderer & browser processes.
  "--disable-ipc-flooding-protection",
  // Avoid potential instability of using Gnome Keyring or KDE wallet. crbug.com/571003 crbug.com/991424
  "--password-store=basic",
  // Use mock keychain on Mac to prevent blocking permissions dialogs
  "--use-mock-keychain",
  // Disable background tracing (aka slow reports & deep reports) to avoid 'Tracing already started'
  "--force-fieldtrials=*BackgroundTracing/default/",
  // Suppresses hang monitor dialogs in renderer processes. This flag may allow slow unload handlers on a page to prevent the tab from closing.
  "--disable-hang-monitor",
  // Reloading a page that came from a POST normally prompts the user.
  "--disable-prompt-on-repost",
  // Disables Domain Reliability Monitoring, which tracks whether the browser has difficulty contacting Google-owned sites and uploads reports to Google.
  "--disable-domain-reliability",
  // Disable the in-product Help (IPH) system.
  "--propagate-iph-for-testing"
];

// node_modules/.pnpm/chrome-launcher@1.1.2/node_modules/chrome-launcher/dist/chrome-launcher.js
import { spawn as spawn4, spawnSync } from "child_process";
var isWsl2 = getPlatform() === "wsl";
var isWindows2 = getPlatform() === "win32";
var _SIGINT = "SIGINT";
var _SIGINT_EXIT_CODE = 130;
var _SUPPORTED_PLATFORMS = /* @__PURE__ */ new Set(["darwin", "linux", "win32", "wsl"]);
var instances = /* @__PURE__ */ new Set();
var sigintListener = () => {
  killAll();
  process.exit(_SIGINT_EXIT_CODE);
};
async function launch(opts = {}) {
  opts.handleSIGINT = defaults2(opts.handleSIGINT, true);
  const instance = new Launcher(opts);
  if (opts.handleSIGINT && instances.size === 0) {
    process.on(_SIGINT, sigintListener);
  }
  instances.add(instance);
  await instance.launch();
  const kill2 = () => {
    instances.delete(instance);
    if (instances.size === 0) {
      process.removeListener(_SIGINT, sigintListener);
    }
    instance.kill();
  };
  return { pid: instance.pid, port: instance.port, kill: kill2, process: instance.chromeProcess };
}
function killAll() {
  let errors = [];
  for (const instance of instances) {
    try {
      instance.kill();
      instances.delete(instance);
    } catch (err) {
      errors.push(err);
    }
  }
  return errors;
}
var Launcher = class _Launcher {
  constructor(opts = {}, moduleOverrides = {}) {
    this.opts = opts;
    this.tmpDirandPidFileReady = false;
    this.fs = moduleOverrides.fs || fs2;
    this.spawn = moduleOverrides.spawn || spawn4;
    lighthouse_logger_default.setLevel(defaults2(this.opts.logLevel, "silent"));
    this.startingUrl = defaults2(this.opts.startingUrl, "about:blank");
    this.chromeFlags = defaults2(this.opts.chromeFlags, []);
    this.prefs = defaults2(this.opts.prefs, {});
    this.requestedPort = defaults2(this.opts.port, 0);
    this.portStrictMode = opts.portStrictMode;
    this.chromePath = this.opts.chromePath;
    this.ignoreDefaultFlags = defaults2(this.opts.ignoreDefaultFlags, false);
    this.connectionPollInterval = defaults2(this.opts.connectionPollInterval, 500);
    this.maxConnectionRetries = defaults2(this.opts.maxConnectionRetries, 50);
    this.envVars = defaults2(opts.envVars, Object.assign({}, process.env));
    if (typeof this.opts.userDataDir === "boolean") {
      if (!this.opts.userDataDir) {
        this.useDefaultProfile = true;
        this.userDataDir = void 0;
      } else {
        throw new InvalidUserDataDirectoryError();
      }
    } else {
      this.useDefaultProfile = false;
      this.userDataDir = this.opts.userDataDir;
    }
  }
  get flags() {
    const flags = this.ignoreDefaultFlags ? [] : DEFAULT_FLAGS.slice();
    flags.push(`--remote-debugging-port=${this.port}`);
    if (!this.ignoreDefaultFlags && getPlatform() === "linux") {
      flags.push("--disable-setuid-sandbox");
    }
    if (!this.useDefaultProfile) {
      flags.push(`--user-data-dir=${isWsl2 ? toWin32Path(this.userDataDir) : this.userDataDir}`);
    }
    if (process.env.HEADLESS)
      flags.push("--headless");
    flags.push(...this.chromeFlags);
    flags.push(this.startingUrl);
    return flags;
  }
  static defaultFlags() {
    return DEFAULT_FLAGS.slice();
  }
  /** Returns the highest priority chrome installation. */
  static getFirstInstallation() {
    if (getPlatform() === "darwin")
      return darwinFast();
    return chrome_finder_exports[getPlatform()]()[0];
  }
  /** Returns all available chrome installations in decreasing priority order. */
  static getInstallations() {
    return chrome_finder_exports[getPlatform()]();
  }
  // Wrapper function to enable easy testing.
  makeTmpDir() {
    return makeTmpDir();
  }
  prepare() {
    const platform = getPlatform();
    if (!_SUPPORTED_PLATFORMS.has(platform)) {
      throw new UnsupportedPlatformError();
    }
    this.userDataDir = this.userDataDir || this.makeTmpDir();
    this.outFile = this.fs.openSync(`${this.userDataDir}/chrome-out.log`, "a");
    this.errFile = this.fs.openSync(`${this.userDataDir}/chrome-err.log`, "a");
    this.setBrowserPrefs();
    this.pidFile = `${this.userDataDir}/chrome.pid`;
    lighthouse_logger_default.verbose("ChromeLauncher", `created ${this.userDataDir}`);
    this.tmpDirandPidFileReady = true;
  }
  setBrowserPrefs() {
    if (Object.keys(this.prefs).length === 0) {
      return;
    }
    const profileDir = `${this.userDataDir}/Default`;
    if (!this.fs.existsSync(profileDir)) {
      this.fs.mkdirSync(profileDir, { recursive: true });
    }
    const preferenceFile = `${profileDir}/Preferences`;
    try {
      if (this.fs.existsSync(preferenceFile)) {
        const file = this.fs.readFileSync(preferenceFile, "utf-8");
        const content = JSON.parse(file);
        this.fs.writeFileSync(preferenceFile, JSON.stringify({ ...content, ...this.prefs }), "utf-8");
      } else {
        this.fs.writeFileSync(preferenceFile, JSON.stringify({ ...this.prefs }), "utf-8");
      }
    } catch (err) {
      lighthouse_logger_default.log("ChromeLauncher", `Failed to set browser prefs: ${err.message}`);
    }
  }
  async launch() {
    if (this.requestedPort !== 0) {
      this.port = this.requestedPort;
      try {
        await this.isDebuggerReady();
        lighthouse_logger_default.log("ChromeLauncher", `Found existing Chrome already running using port ${this.port}, using that.`);
        return;
      } catch (err) {
        if (this.portStrictMode) {
          throw new Error(`found no Chrome at port ${this.requestedPort}`);
        }
        lighthouse_logger_default.log("ChromeLauncher", `No debugging port found on port ${this.port}, launching a new Chrome.`);
      }
    }
    if (this.chromePath === void 0) {
      const installation = _Launcher.getFirstInstallation();
      if (!installation) {
        throw new ChromeNotInstalledError();
      }
      this.chromePath = installation;
    }
    if (!this.tmpDirandPidFileReady) {
      this.prepare();
    }
    this.pid = await this.spawnProcess(this.chromePath);
    return Promise.resolve();
  }
  async spawnProcess(execPath) {
    const spawnPromise = (async () => {
      if (this.chromeProcess) {
        lighthouse_logger_default.log("ChromeLauncher", `Chrome already running with pid ${this.chromeProcess.pid}.`);
        return this.chromeProcess.pid;
      }
      if (this.requestedPort === 0) {
        this.port = await getRandomPort();
      }
      lighthouse_logger_default.verbose("ChromeLauncher", `Launching with command:
"${execPath}" ${this.flags.join(" ")}`);
      this.chromeProcess = this.spawn(execPath, this.flags, {
        // On non-windows platforms, `detached: true` makes child process a leader of a new
        // process group, making it possible to kill child process tree with `.kill(-pid)` command.
        // @see https://nodejs.org/api/child_process.html#child_process_options_detached
        detached: process.platform !== "win32",
        stdio: ["ignore", this.outFile, this.errFile],
        env: this.envVars
      });
      if (this.chromeProcess.pid) {
        this.fs.writeFileSync(this.pidFile, this.chromeProcess.pid.toString());
      }
      lighthouse_logger_default.verbose("ChromeLauncher", `Chrome running with pid ${this.chromeProcess.pid} on port ${this.port}.`);
      return this.chromeProcess.pid;
    })();
    const pid = await spawnPromise;
    await this.waitUntilReady();
    return pid;
  }
  cleanup(client2) {
    if (client2) {
      client2.removeAllListeners();
      client2.end();
      client2.destroy();
      client2.unref();
    }
  }
  // resolves if ready, rejects otherwise
  isDebuggerReady() {
    return new Promise((resolve3, reject) => {
      const client2 = net.createConnection(this.port, "127.0.0.1");
      client2.once("error", (err) => {
        this.cleanup(client2);
        reject(err);
      });
      client2.once("connect", () => {
        this.cleanup(client2);
        resolve3();
      });
    });
  }
  // resolves when debugger is ready, rejects after 10 polls
  waitUntilReady() {
    const launcher = this;
    return new Promise((resolve3, reject) => {
      let retries = 0;
      let waitStatus = "Waiting for browser.";
      const poll = () => {
        if (retries === 0) {
          lighthouse_logger_default.log("ChromeLauncher", waitStatus);
        }
        retries++;
        waitStatus += "..";
        lighthouse_logger_default.log("ChromeLauncher", waitStatus);
        launcher.isDebuggerReady().then(() => {
          lighthouse_logger_default.log("ChromeLauncher", waitStatus + `${lighthouse_logger_default.greenify(lighthouse_logger_default.tick)}`);
          resolve3();
        }).catch((err) => {
          if (retries > launcher.maxConnectionRetries) {
            lighthouse_logger_default.error("ChromeLauncher", err.message);
            const stderr3 = this.fs.readFileSync(`${this.userDataDir}/chrome-err.log`, { encoding: "utf-8" });
            lighthouse_logger_default.error("ChromeLauncher", `Logging contents of ${this.userDataDir}/chrome-err.log`);
            lighthouse_logger_default.error("ChromeLauncher", stderr3);
            return reject(err);
          }
          delay2(launcher.connectionPollInterval).then(poll);
        });
      };
      poll();
    });
  }
  kill() {
    if (!this.chromeProcess) {
      return;
    }
    this.chromeProcess.on("close", () => {
      delete this.chromeProcess;
      this.destroyTmp();
    });
    lighthouse_logger_default.log("ChromeLauncher", `Killing Chrome instance ${this.chromeProcess.pid}`);
    try {
      if (isWindows2) {
        const taskkillProc = spawnSync(`taskkill /pid ${this.chromeProcess.pid} /T /F`, { shell: true, encoding: "utf-8" });
        const { stderr: stderr3 } = taskkillProc;
        if (stderr3)
          lighthouse_logger_default.error("ChromeLauncher", `taskkill stderr`, stderr3);
      } else {
        if (this.chromeProcess.pid) {
          process.kill(-this.chromeProcess.pid, "SIGKILL");
        }
      }
    } catch (err) {
      const message = `Chrome could not be killed ${err.message}`;
      lighthouse_logger_default.warn("ChromeLauncher", message);
    }
    this.destroyTmp();
  }
  destroyTmp() {
    if (this.outFile) {
      this.fs.closeSync(this.outFile);
      delete this.outFile;
    }
    if (this.userDataDir === void 0 || this.opts.userDataDir !== void 0) {
      return;
    }
    if (this.errFile) {
      this.fs.closeSync(this.errFile);
      delete this.errFile;
    }
    const rmSync = this.fs.rmSync || this.fs.rmdirSync;
    rmSync(this.userDataDir, { recursive: true, force: true, maxRetries: 10 });
  }
};

// syncify/hot/launch.ts
import CDP from "chrome-remote-interface";
var PreviewBar = () => $.hot.previewBar ? "" : (
  /* js */
  `
  const preview = document.getElementById("preview-bar-iframe");
  if (preview) preview.style.display = "none";
`
);
var Expression = () => (
  /* js */
  `

  const injection = new Promise((resolve, reject) => {

    try {

      const inject = document.getElementById('syncify-hot-injection');

      if (inject) return resolve();

      const script = document.createElement('script');
      script.setAttribute('id', 'syncify-hot-injection');
      script.setAttribute('spx-eval', 'false');
      script.setAttribute('src', 'http://localhost:${$.hot.server}/hot.js');

      script.onload = () => {

        window.syncify.connect({
          label: ${$.hot.label === "visible" ? "true" : "false"},
          server: ${$.hot.server},
          socket: ${$.hot.socket},
          strategy: "${$.hot.strategy}",
          mode: "${$.hot.method}"
        });

        resolve();

      };

      script.onerror = (e) => {
        console.error('Failed to load script:', e);
        reject(new Error('Script load error'));
      };

      document.head.appendChild(script);

    } catch (err) {

      reject(err);

    }
  });

  injection.then(() => {

    ${$.hot.loadEventJS}

  });
`
);
var LaunchChrome = async () => {
  try {
    const chrome2 = await launch({
      port: 9222,
      chromeFlags: $.hot.chromeFlags,
      ignoreDefaultFlags: true,
      userDataDir: $.dirs.chrome
    });
    const client2 = await CDP({ port: chrome2.port });
    const { Page, Runtime } = client2;
    await Runtime.enable();
    await Page.enable();
    await Page.navigate({
      url: `https://${$.sync.themes[0].store}?preview_theme_id=${$.sync.themes[0].id}`
    });
    await Page.loadEventFired(async () => {
      await Runtime.evaluate({
        returnByValue: true,
        awaitPromise: true,
        expression: (
          /* js */
          `
            ${PreviewBar()}
            ${$.mode.hot ? Expression() : ""}
          `
        )
      });
    });
    if ($.mode.hot) {
      Page.navigatedWithinDocument(async (params) => {
        await Runtime.evaluate({
          returnByValue: true,
          awaitPromise: true,
          expression: (
            /* js */
            `
            window.syncify.sections.load();
          `
          )
        });
      });
    }
    process.on("exit", () => chrome2.kill());
  } catch (error3) {
    console.error("An error occurred:", error3);
  }
};

// syncify/options/define.ts
async function define(cli, options) {
  timer.start("runtime");
  runtime($);
  await getEnvFile();
  await getPackageJson();
  await getConfig();
  await getCache();
  if ($.mode.setup || $.mode.strap) return;
  await setBaseDirs(cli);
  process.env.SYNCIFY_ENV = $.env.dev ? "dev" : "prod";
  process.env.SYNCIFY_WATCH = String($.mode.watch);
  setVersion(cli);
  setFilters(cli);
  runtime.modes($);
  await setSync(cli);
  if ($.mode.themes) return;
  setChokidar();
  setProcessors();
  setPublishConfig();
  setSpawns();
  await Promise.all(
    [
      setHomeDirs(),
      setCacheDirs(),
      setThemeDirs(),
      setImportDirs(),
      setPaths()
    ]
  ).catch((e) => {
    throws(e, { details: "Directory and path generation error" });
  });
  if ($.mode.themes && !$.mode.build) return;
  setJsonOptions();
  setLiquidOptions();
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
    throws(e, { details: "Runtime error" });
  });
  runtime.warnings($);
  if (!$.mode.build) {
    runtime.time();
  }
  if ($.mode.watch && $.mode.hot) {
    await LaunchChrome().catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
  return promise;
}
function setChokidar() {
  if (!($.cmd.watch || $.cmd.upload)) return;
  $.watch = new FSWatcher({
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: ["*.map"],
    ignorePermissionErrors: true
  });
  $.watch = defineProperties($.watch, {
    has: {
      value(path4, dir = $.cwd) {
        return $.watch._watched.has(dir) ? $.watch._watched.get(dir).items.has(path4) : false;
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
  if (has("processors", $.config) && isObject(process.config)) {
    for (const prop in $.config.processors) {
      if (isEmpty($.config.processors[prop])) {
        continue;
      }
      if (isArray($.config.processors[prop])) {
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
async function getConfig() {
  const config = await configFile();
  if (config !== null) {
    $.config = config;
  } else if (has("syncify", $.pkg)) {
    if (has("config", $.pkg.syncify)) {
      $.config = $.pkg.syncify.config;
    } else if (!has("stores", $.pkg.syncify) && $.cmd.setup === false && !$.cmd.strap) {
      missingConfig($.cwd);
    }
  }
}

// syncify/prompts/setup.ts
init_esm_shims();
import { join as join23 } from "node:path";
import { prompt as prompt4 } from "enquirer";
import { writeFile as writeFile8 } from "fs-extra";

// syncify/prompts/strap.ts
init_esm_shims();
import { join as join22 } from "node:path";
import PackageJson2 from "@npmcli/package-json";
import { copy, pathExists as pathExists6, remove } from "fs-extra";
import { prompt as prompt3 } from "enquirer";

// syncify/utils/child.ts
init_esm_shims();
var import_ansi29 = __toESM(require_dist());
async function execAsync(cmd2) {
  try {
    const { stdout: stdout3 } = await command(cmd2);
    return stdout3;
  } catch (e) {
    throwError(e, [
      `This ${(0, import_ansi29.cyan)("child_process")} error and likely unrelated to Syncify.`,
      "It is unclear what has caused the issue, but consult the error message",
      "or please submit an issue on github repository"
    ]);
  }
}

// syncify/prompts/strap.ts
var c17 = __toESM(require_dist());
var STRAPS = [
  ["dawn", "    Shopify Slop"],
  ["dusk", "    Stripped Theme"],
  ["silk", "    Sissel Theme"]
];
var EXAMPLES = [
  ["using-paths", "       Strap with paths usage"],
  ["using-rename", "      Strap with rename usage"],
  ["using-sass", "        Strap with sass transform"],
  ["using-schema", "      Strap using Shared Schema"],
  ["using-tailwind", "    Strap using Tailwind transform"],
  ["using-typescript", "  Strap using TypeScript transform"]
];
async function strap(fromSetup = true) {
  const straps = {
    examples: object(),
    themes: object()
  };
  const choices = {
    themes: [],
    examples: []
  };
  for (const [name2, hint] of STRAPS) {
    straps.themes[name2] = { name: name2, path: join22($.dirs.straps, name2) };
    choices.themes.push({ name: name2, message: name2, hint });
  }
  for (const [name2, hint] of EXAMPLES) {
    straps.examples[name2] = { name: name2, path: join22($.dirs.examples, name2) };
    choices.examples.push({ name: name2, message: name2, hint });
  }
  const message = c17.Create({ type: "info" });
  const filter = (src) => /(package\.json|\.git)|/.test(src);
  if (!fromSetup) {
    log(
      message.Wrap(
        "Syncify straps provide starting-point themes you can use to jump start a new project.",
        "You can choose one of available open source themes or a usage example",
        c17.gray
      ).NL.toString()
    );
  }
  const { kind } = await prompt3({
    type: "select",
    name: "kind",
    message: c17.bold(`Select From${c17.COL} `),
    required: true,
    theme,
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
  });
  const { template } = await prompt3({
    type: "select",
    name: "template",
    message: `Choose Strap${c17.COL}`,
    required: true,
    theme,
    choices: choices[kind]
  });
  const { name } = await prompt3({
    type: "input",
    name: "name",
    hint: "This will be used as the theme target name",
    message: `Theme Name${c17.COL}`,
    theme
  });
  const dir = fromSetup ? $.cwd : join22($.cwd, name);
  const strapTemplate = join22(dir, template);
  const strapPkgPath = join22(strapTemplate, "package.json");
  await execAsync(`git clone https://github.com/syncifycli/${template}.git`);
  await copy(strapTemplate, dir, { filter }).catch(
    write("Error copying contents to directory", {
      from: strapTemplate,
      to: dir
    })
  );
  if (!await pathExists6(strapPkgPath)) {
    throw enoentError({
      type: "file",
      path,
      task: $.argv,
      message: [
        `The strap does not contain a ${c17.cyan("package.json")} file.`,
        "If you are using a pre-release version of Syncify, this will be addressed",
        "upon official release. Please choose another strap."
      ]
    });
  }
  const strapPkg = await PackageJson2.load(strapTemplate);
  const syncify = {};
  if (hasPath("syncify.config", $.pkg)) {
    syncify.config = $.pkg.syncify.config;
  }
  await $.package.update({
    // @ts-expect-error
    syncify,
    devDependencies: assign(
      strapPkg.content.devDependencies,
      $.pkg.devDependencies
    )
  }).save();
  spinner.update("Installing Dependencies");
  await execAsync(`${$.pm} install`);
  remove(join22(dir, template));
  spinner.update("Building Theme");
  await execAsync(`${$.pm} sy -b`);
  if (fromSetup) {
    spinner.update("Publishing theme");
    await execAsync(`${$.pm} sy -p`);
    spinner.stop();
    group(false);
    process.exit(0);
  } else {
    log(
      message.NL.Line(`${c17.CHK} Strap Generated`, c17.bold.white).NL.Wrap(
        `You can now ${c17.cyan("cd")} into the directory and install dependencies.`,
        c17.gray
      ).NL.End($.log.group).toString()
    );
  }
}

// syncify/prompts/setup.ts
var c18 = __toESM(require_dist());

// syncify/requests/access.ts
init_esm_shims();
async function get2(client2) {
  return axios.get("/oauth/access_scopes.json", client2).then(({ data }) => {
    return data;
  }).catch((e) => {
    return false;
  });
}

// syncify/prompts/setup.ts
async function setup() {
  const message = c18.Create({ type: "info" });
  const model = {
    store: null,
    password: null,
    domain: null,
    token: null,
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
  const theme2 = assign({}, theme, {
    pointer(choice, index) {
      const prefix = this.state.index === index ? c18.Tree.stub.trimEnd() + " " : c18.Tree.trim + " ";
      return prefix;
    }
  });
  const messages = [
    `Existing Setup${c18.COL}  `,
    `Shopify Domain${c18.COL}  `,
    `Store Password${c18.COL}  `,
    `Admin API Token${c18.COL} `
  ];
  if ($.env.file === null) {
    log(
      message.Line("Hello Hacker \u{1F44B}", c18.gray).NL.Wrap(
        `This prompt will generate a ${c18.cyan(".env")} file containing storefront credentials.`,
        `When asked for your ${c18.bold("Store Password")} this refers to the password used on`,
        "Password Protected theme pages, not your admin password and is totally optional.",
        c18.gray
      ).NL.toString()
    );
  }
  const { domain } = await prompt4({
    type: "input",
    name: "domain",
    message: messages[1],
    required: true,
    format(value) {
      return value + ".myshopify.com";
    },
    validate(value) {
      this.state.symbols.pointer = "  ";
      if (value === ".myshopify.com") return "Enter myshopify.com domain name";
      return $.stores.length > 0 && $.stores.some(({ domain: domain2 }) => domain2 === value) ? "You cannot overwrite existing store credentials" : true;
    },
    theme: theme2
  });
  const { password } = await prompt4({
    type: "input",
    name: "password",
    message: messages[2],
    required: false,
    theme: theme2,
    validate(value) {
      this.state.symbols.pointer = "  ";
      return true;
    }
  });
  const { token } = await prompt4({
    type: "input",
    name: "token",
    required: true,
    message: messages[3],
    theme: theme2,
    validate(value) {
      this.state.symbols.pointer = "  ";
      return !value || value.length < 10 ? "Invalid Admin API Token" : true;
    }
  });
  const scopes = await get2({
    baseURL: `https://${domain}.myshopify.com/admin`,
    headers: { "X-Shopify-Access-Token": token.trim() }
  });
  if (isBoolean(scopes)) {
    return log(
      message.NL.Wrap(
        `Connection failed on ${c18.cyan(`${domain}.myshopify.com`)}. Please check the API Access Token`,
        "is correct and you have set the right access scopes, then try again.",
        c18.red
      ).NL.End($.log.group).BR.toString()
    );
  }
  if (scopes.access_scopes.length > 0) {
    message.Newline();
    for (const { handle } of scopes.access_scopes) {
      if (handle in model.scopes) {
        model.scopes[handle] = true;
        message.Line(`${c18.CHK} ${handle}`);
      }
    }
  }
  let count = 0;
  for (const scope in model.scopes) {
    if (model.scopes[scope] === false) {
      message.Line(`${c18.BAD} ${scope}`, c18.red);
      count = count + 1;
    }
  }
  if (count > 0) {
    return log(
      message.NL.Wrap(
        "Syncify requires read and write access to all the above resources.",
        "Provide access to all scopes listed in red (above) and try again.",
        c18.red
      ).NL.End($.log.group).BR.toString()
    );
  }
  model.store = domain;
  model.domain = `${domain}.myshopify.com`;
  model.token = `${domain}_api_token = '${token.trim()}'`;
  model.password = `${domain}_password = '${password.trim()}'`;
  $.env.file = join23($.cwd, ".env");
  await writeFile8($.env.file, glueLines(`# Credentials: ${model.domain}`, model.token, model.password));
  await getEnvFile();
  await setPackageSyncify();
  log(message.NL.toString());
  const { bootstrap } = await prompt4({
    theme: theme2,
    name: "bootstrap",
    type: "confirm",
    message: "Import Strap",
    initial: true,
    newline: "\n",
    format() {
      return /^[ty1]/i.test(this.input) ? "Yes" : "No";
    }
  });
  if (bootstrap) {
    return strap(true);
  }
  log(message.NL.End($.log.group).toString());
}

// syncify/api.ts
init_esm_shims();

// syncify/index.ts
async function run(cmd2, config, callback) {
  if (cmd2.help === "show") return help(cmd2);
  await define(cmd2, config);
  if ($.mode.themes) return themes();
  if ($.mode.setup) return setup();
  if ($.mode.strap) return strap();
  process4.stdin.on("data", stdin);
  try {
    $.env.ready = true;
    if ($.mode.build && $.mode.export === false) {
      return build2(callback);
    } else if ($.mode.watch) {
      return watch(callback);
    } else if ($.mode.upload) {
      return upload2(callback);
    } else if ($.mode.import) {
      return importing(callback);
    } else if ($.mode.export && $.mode.publish === false) {
      return exporting(callback);
    } else if ($.mode.publish) {
      return publish2(callback);
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
run(
  cmd(argv2, {
    /* PATHS -------------------------------------- */
    config: {
      type: "string",
      short: "c"
    },
    input: {
      type: "string",
      short: "i"
    },
    output: {
      type: "string",
      short: "o"
    },
    /* TARGETS ------------------------------------ */
    theme: {
      type: "string",
      short: "t"
    },
    spawn: {
      type: "string",
      short: "s"
    },
    delete: {
      type: "string",
      short: "d"
    },
    filter: {
      type: "string",
      short: "f"
    },
    help: {
      type: "string",
      short: "h"
    },
    /* VERSION CONTROL ---------------------------- */
    publish: {
      type: "boolean",
      short: "p",
      default: false
    },
    release: {
      type: "string"
    },
    bump: {
      type: "string"
    },
    /* HELPERS ------------------------------------ */
    setup: {
      type: "boolean",
      default: false
    },
    /* ENVIRONMENTS ------------------------------- */
    dev: {
      type: "boolean",
      default: true
    },
    prod: {
      type: "boolean",
      default: false
    },
    /* MODES -------------------------------------- */
    import: {
      type: "boolean",
      default: false
    },
    export: {
      type: "boolean",
      default: false
    },
    build: {
      type: "boolean",
      short: "b",
      default: false
    },
    watch: {
      type: "boolean",
      short: "w",
      default: false
    },
    upload: {
      type: "boolean",
      short: "u",
      default: false
    },
    terse: {
      type: "boolean",
      default: false
    },
    hot: {
      type: "boolean",
      default: false
    },
    interactive: {
      type: "boolean",
      default: false
    },
    /* TRANSFORMS --------------------------------- */
    script: {
      type: "boolean",
      default: false
    },
    style: {
      type: "boolean",
      default: false
    },
    svg: {
      type: "boolean",
      default: false
    },
    image: {
      type: "boolean",
      default: false
    },
    /* RESOURCES ---------------------------------- */
    metafields: {
      type: "boolean",
      default: false
    },
    pages: {
      type: "boolean",
      default: false
    },
    redirects: {
      type: "boolean",
      default: false
    },
    /* OPERATIONS --------------------------------- */
    doctor: {
      type: "boolean",
      default: false
    },
    clean: {
      type: "boolean",
      default: false
    },
    silent: {
      type: "boolean",
      default: false
    },
    force: {
      type: "boolean",
      default: false
    },
    cache: {
      type: "boolean",
      default: false
    }
  })
).catch(console.error);
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

lighthouse-logger/index.js:
  (**
   * @license Copyright 2016 The Lighthouse Authors. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

chrome-launcher/dist/utils.js:
  (**
   * @license Copyright 2017 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

chrome-launcher/dist/chrome-finder.js:
  (**
   * @license Copyright 2016 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

chrome-launcher/dist/random-port.js:
  (**
   * @license Copyright 2016 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

chrome-launcher/dist/flags.js:
  (**
   * @license Copyright 2017 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

chrome-launcher/dist/chrome-launcher.js:
  (**
   * @license Copyright 2016 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)
*/
