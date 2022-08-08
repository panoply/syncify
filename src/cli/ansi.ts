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
/* FONT STYLE                                   */
/* -------------------------------------------- */

/**
 * Underline
 */
export const underline = ansis.underline;

/**
 * Bold
 */
export const bold = ansis.bold;

/**
 * Reset
 */
export const reset = ansis.reset;

/**
 * Italic
 */
export const italic = ansis.italic;

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
/* STANDARD COLORS                              */
/* -------------------------------------------- */

/**
 * Cyan
 */
export const cyan = ansis.cyanBright;

/**
 * Red
 */
export const red = ansis.red;

/**
 * Red Bright
 */
export const redBright = ansis.redBright;

/**
 * Green
 */
export const green = ansis.green;

/**
 * Green Bright
 */
export const greenBright = ansis.greenBright;

/**
 * Yellow
 */
export const yellow = ansis.yellow;

/**
 * Yellow Bright
 */
export const yellowBright = ansis.yellowBright;

/**
 * Magenta
 */
export const magenta = ansis.magenta;

/**
 * Magenta Bright
 */
export const magentaBright = ansis.magentaBright;

/**
 * Blue
 */
export const blue = ansis.blue;

/**
 * Blue Bright
 */
export const blueBright = ansis.blueBright;

/**
 * White
 */
export const white = ansis.white;

/**
 * White Bright
 */
export const whiteBright = ansis.whiteBright;

/**
 * Gray
 */
export const gray = ansis.gray;

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
