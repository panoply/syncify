import { size } from './size';
import type { Merge } from 'type-fest';
import ansis, { AnsiColorsExtend, Ansis } from 'ansis';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type AnsisExtend = Merge<Ansis, {
  readonly lightGray: Ansis
  readonly pink: Ansis
  readonly orange: Ansis
  readonly lavender: Ansis
  readonly neonGreen: Ansis
  readonly neonCyan: Ansis
  readonly neonRouge: Ansis
  readonly neonMagenta: Ansis
}>

export type Colors = (
  | 'cyan'
  | 'cyanBright'
  | 'red'
  | 'redBright'
  | 'green'
  | 'greenBright'
  | 'yellow'
  | 'yellowBright'
  | 'magenta'
  | 'magentaBright'
  | 'blue'
  | 'blueBright'
  | 'white'
  | 'whiteBright'
  | 'gray'
  | 'underline'
  | 'bold'
  | 'reset'
  | 'italic'
  | 'strike'
  | 'lightGray'
  | 'neonCyan'
  | 'neonGreen'
  | 'neonRouge'
  | 'neonMagenta'
  | 'orange'
  | 'pink'
  | 'lavender'
)

/* -------------------------------------------- */
/* EXTEND COLORS                                */
/* -------------------------------------------- */

ansis.extend({
  lightGray: '#2a2a2e',
  pink: '#ff75d1',
  orange: '#FFAB40',
  lavender: '#8080FF',
  neonGreen: '#56ef83',
  neonCyan: '#69d5fd',
  neonRouge: '#FF8095',
  neonMagenta: '#B319FF'
});

/* -------------------------------------------- */
/* EXTEND COLORS                                */
/* -------------------------------------------- */
// /**
//  * Light gray
//  */
// export const lightGray = ansis.hex('#2a2a2e');
// /**
//  * Pink
//  */
// export const pink = ansis.hex('#ff75d1');
// /**
//  * Orange
//  */
// export const orange = ansis.hex('#FFAB40');
// /**
//  * Dark Pink
//  */
// export const lavender = ansis.hex('#8080FF');
// /**
//  * Neon Green
//  */
// export const neonGreen = ansis.hex('#56ef83');
// /**
//  * Neon Cyan
//  */
// export const neonCyan = ansis.hex('#69d5fd');
// /**
//  * Neon Rouge
//  */
// export const neonRouge = ansis.hex('#FF8095');
// /**
//  * Neon Magenta
//  */
// export const neonMagenta = ansis.hex('#B319FF');

/* -------------------------------------------- */
/* REXPORT COLORS                               */
/* -------------------------------------------- */

export const {

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
  dim,

  // OTHER
  strip,

  // STYLES
  underline,
  bold,
  reset,
  italic,
  strike,

  // CUSTOM

  lightGray,
  pink,
  orange,
  lavender,
  neonGreen,
  neonCyan,
  neonRouge,
  neonMagenta

}: AnsisExtend = ansis;

/* -------------------------------------------- */
/* HELPER UTILITIES                             */
/* -------------------------------------------- */

/**
 * Clear console but preserve history
 */
export const clear = '\x1B[H\x1B[2J';

/**
 * Clear console and history
 */
export const purge = '\x1B[2J\x1B[3J\x1B[H\x1Bc';

/* -------------------------------------------- */
/* TREE CHARACTERS                              */
/* -------------------------------------------- */

/**
 * TUI Tree - Crown
 *
 * ```bash
 * ┌─
 * ```
 */
export const open = `${lightGray.open}┌─ ${lightGray.close}`;

/**
 * TUI Tree - line
 *
 * ```bash
 * │
 * ```
 */
export const line = {
  /**
   * Light Gray (default) line
   */
  gray: `${lightGray.open}│  ${lightGray.close}`,
  /**
   * Red dim - used in errors
   */
  red: `${red.dim.open}│  ${red.dim.close}`,
  /**
   * Yellow dim - used in warnings
   */
  yellow: `${yellow.dim.open}│  ${yellow.dim.close}`
};

/**
 * TUI Tree - newline plus line, ie: `\n` is prepended but not appended
 *
 * ```bash
 *
 * │
 * ```
 */
export const nextline = `${lightGray.open}${NWL}│${lightGray.close}`;

/**
 * TUI Tree - newline lines, ie: `\n` are prepended and appended
 *
 * ```bash
 *
 * │
 *
 * ```
 */
export const newline = `${lightGray.open}${NWL}│${NWL}${lightGray.close}`;

/**
 * TUI Branch - line
 *
 * ```bash
 * ├─
 * ```
 */
export const dash = `${lightGray.open}│  ├─ ${lightGray.close}`;

/**
 * TUI Arrow - line
 *
 * ```bash
 *├─
 * ```
 */
export const top = `${lightGray.open}├─ ${lightGray.close}`;

/**
 * TUI Arrow - line
 *
 * ```bash
 * │  └─
 * ```
 */
export const bottom = `${lightGray.open}│  └─ ${lightGray.close}`;

/**
 * TUI Tree - close
 *
 * ```bash
 * └─
 * ```
 */
export const close = `${lightGray.open}└─ ${lightGray.close}`;

/**
 * TUI Horizontal Rule Size
 *
 * Same as `hr()` but oNWLy applies horizonal lines `x` amount of times
 *
 * ```bash
 * │
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export const hrs = (x: number = size().cols - 10) => `${lightGray.open}│ ${'─'.repeat(x)}${lightGray.close}`;

/**
 * TUI Horizontal Row
 *
 * Prints a horizontal line separator. Will span the length
 * of the terminal pane.
 *
 * ```bash
 * │
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export const hr = (m: number) => `${lightGray.open}│${NWL}├${'─'.repeat(size().cols - m)}${NWL}│${lightGray.close}`;

/* -------------------------------------------- */
/* CHARACTER HELPERS                            */
/* -------------------------------------------- */

/**
 * Checkmark character in neonGreen suffixed with single space
 *
 * ```bash
 * ✓
 * ```
 */
export const CHK = `${neonGreen.open}✓ ${neonGreen.close}`;

/**
 * Cross character in redBright
 *
 * ```bash
 * 𐄂
 * ```
 */
export const BAD = `${redBright.open}𐄂${redBright.close}`;

/**
 * Colon character in gray suffixed with single space
 *
 * ```
 * :
 * ```
 */
export const COL = `${gray.open}:${gray.close}`;

/**
 * Right Arrow character in gray
 *
 * ```bash
 * →
 * ```
 */
export const ARR = `${gray.open}→${gray.close}`;

/**
 * Right Chevron solid character in gray
 *
 * ```bash
 * ‣
 * ```
 */
export const CHV = `${gray.open}‣${gray.close}`;

/**
 * Right + Small Left Arrow character in gray
 *
 * ```bash
 * ⥂
 * ```
 */
export const ARL = `${gray.open}⥂${gray.close}`;

/**
 * Tilde character in gray
 *
 * ```bash
 * ~
 * ```
 */
export const TLD = `${gray.open}~${gray.close}`;

/**
 * Long EnDash character in gray
 *
 * ```bash
 * —
 * ```
 */
export const DSH = `${gray.open}—${gray.close}`;

/**
 * Left Parenthesis in gray
 *
 * ```bash
 * (
 * ```
 */
export const LPR = `${gray.open}(${gray.close}`;

/**
 * Right Parenthesis in gray
 *
 * ```bash
 * )
 * ```
 */
export const RPR = `${gray.open})${gray.close}`;

/**
 * Left Curly Brace in gray
 *
 * ```bash
 * {
 * ```
 */
export const LCB = `${gray.open}{${gray.close}`;

/**
 * Right Curly Brace in gray
 *
 * ```bash
 * }
 * ```
 */
export const RCB = `${gray.open}}${gray.close}`;

/* -------------------------------------------- */
/* EXTENDED HELPERS                             */
/* -------------------------------------------- */

/**
 * Warning stdin suffix
 *
 * ```
 *  ~ Type w and press enter to view
 * ```
 */
export const warning = yellowBright(` ~ Type ${bold('w')} and press ${bold('enter')} to view`);

/**
 * Error stdin suffix
 *
 * ```
 */
export const error = redBright(` ~ Type ${bold('v')} and press ${bold('enter')} to view`);

/**
 * Time Suffix
 *
 * ```
 */
export const time = (now: string) => now ? reset.gray(` ~ ${now}`) : NIL;
