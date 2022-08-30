import ansis from 'ansis';
import { nil, nl } from '../shared/native';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

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
  | 'orange'
  | 'pink'
)

/* -------------------------------------------- */
/* STANDARD COLORS                              */
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
  underline,
  bold,
  reset,
  italic,
  strike
} = ansis;

/* -------------------------------------------- */
/* EXTEND COLORS                                */
/* -------------------------------------------- */

/**
 * Light gray
 */
export const lightGray = ansis.hex('#2a2a2e');

/**
 * Pink
 */
export const pink = ansis.hex('#ff75d1');

/**
 * Orange
 */
export const orange = ansis.hex('#FFAB40');

/**
 * Neon Green
 */
export const neonGreen = ansis.hex('#56ef83');

/**
 * Neon Cyan
 */
export const neonCyan = ansis.hex('#69d5fd');

/* -------------------------------------------- */
/* TREE CHARACTERS                              */
/* -------------------------------------------- */

/**
 * TUI Tree - Crown
 *
 * ```
 * ┌─
 * ```
 */
export const open = lightGray('┌─ ');

/**
 * TUI Tree - line
 *
 * ```
 * │
 * ```
 */
export const line = lightGray('│  ');

/**
 * TUI Tree - line
 *
 * ```
 * │
 * ```
 */
export const eline = red.dim('│  ');

/**
 * TUI Tree - newline lines, ie: `\n` are prepended and appended
 *
 * ```
 *
 * │
 *
 * ```
 */
export const newline = lightGray(`${nl}│${nl}`);

/**
 * TUI Tree - close
 *
 * ```
 * └─
 * ```
 */
export const close = lightGray('└─ ');

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
/* EXTENDED HELPERS                             */
/* -------------------------------------------- */

export const colon = gray(': ');

/**
 * Arrow character in gray
 *
 * ```
 * →
 * ```
 */
export const arrow = gray(' →  ');

/**
 * Left Parenthesis in gray
 *
 * ```
 * (
 * ```
 */
export const lpr = gray('(');

/**
 * Right Parenthesis in gray
 *
 * ```
 * )
 * ```
 */
export const rpr = gray(')');

/**
 * Warning stdin suffix
 *
 * ```
 * ~ Type w and press enter to view
 * ```
 */
export const warn = yellowBright(` ~ Type ${bold('w')} and press ${bold('enter')} to view`);

/**
 * Time Suffix
 *
 * ```
 *  ~ 01:59:20
 * ```
 */
export const time = (now: string) => now ? gray(` ~ ${now}`) : nil;
