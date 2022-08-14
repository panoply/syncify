import ansis from 'ansis';
import { nl } from '../shared/native';

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
  blackBright,
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

/* -------------------------------------------- */
/* NEON COLORS                                  */
/* -------------------------------------------- */

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
 * `┌─`
 */
export const open = lightGray('┌─ ');

/**
 * TUI Tree - line
 *
 * `│`
 */
export const line = lightGray('│  ');

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
 * TUI Tree - item
 *
 * `├ `
 */
export const item = lightGray('├  ');

/**
 * TUI Tree - close
 *
 * `└─`
 */
export const close = lightGray('└─ ');

/* -------------------------------------------- */
/* EXTENDED HELPERS                             */
/* -------------------------------------------- */

/**
 * Left Parenthesis in gray
 *
 * `(`
 */
export const lpr = gray('(');

/**
 * Right Parenthesis in gray
 *
 * `)`
 */
export const rpr = gray(')');
