import ansis from 'ansis';
import { nil, nl } from '~utils/native';
import { size } from '~cli/size';

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
  | 'neonRouge'
  | 'neonMagenta'
  | 'orange'
  | 'pink'
  | 'lavender'
)

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
 * Dark Pink
 */
export const lavender = ansis.hex('#8080FF');

/**
 * Neon Green
 */
export const neonGreen = ansis.hex('#56ef83');

/**
 * Neon Cyan
 */
export const neonCyan = ansis.hex('#69d5fd');

/**
 * Neon Rouge
 */
export const neonRouge = ansis.hex('#FF8095');

/**
 * Neon Magenta
 */
export const neonMagenta = ansis.hex('#B319FF');

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
export const line = {
  /**
   * Light Gray (default) line
   */
  gray: lightGray('│  '),
  /**
   * Red dim - used in errors
   */
  red: red.dim('│  '),
  /**
   * Yellow dim - used in warnings
   */
  yellow: yellow.dim('│  ')
};

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
 * TUI Branch - line
 *
 * ```
 * ├─
 * ```
 */
export const dash = lightGray('│  ├─ ');

/**
 * TUI Arrow - line
 *
 * ```
 * │ ╭───────────────────────────
 * ├─┤ line
 * │ └─╮
 *     ├─
 * ```
 */
export const top = lightGray('├─ ');

/**
 * TUI Arrow - line
 *
 * ```
 * │  ┌┘
 * ```
 */
export const bottom = lightGray('│  └─ ');

/**
 * TUI Tree - close
 *
 * ```
 * └─
 * ```
 */
export const close = lightGray('└─ ');

/**
 * TUI Horizontal Row
 *
 * Prints a horizontal line separator. Will span the length
 * of the terminal pane.
 *
 * ```
 * │
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export const hr = (minus: number) => lightGray(`│${nl}├${'─'.repeat(size().columns - minus)}${nl}│`);

/* -------------------------------------------- */
/* CHARACTER HELPERS                            */
/* -------------------------------------------- */

/**
 * Checkmark character in neonGreen suffixed with single space
 *
 * ```
 * ✓
 * ```
 */
export const CHK = neonGreen('✓ ');

/**
 * Cross character in redBright
 *
 * ```
 * 𐄂
 * ```
 */
export const BAD = redBright('𐄂');

/**
 * Colon character in gray suffixed with single space
 *
 * ```
 * :
 * ```
 */
export const COL = gray(':');

/**
 * Right Arrow character in gray
 *
 * ```
 * →
 * ```
 */
export const ARR = gray('→');

/**
 * Right Chevron solid character in gray
 *
 * ```
 * ‣
 * ```
 */
export const CHV = gray('‣');

/**
 * Right + Small Left Arrow character in gray
 *
 * ```
 * ⥂
 * ```
 */
export const ARL = gray('⥂');

/**
 * Tilde character in gray
 *
 * ```
 * ~
 * ```
 */
export const TLD = gray('~');

/**
 * Long EnDash character in gray
 *
 * ```
 * —
 * ```
 */
export const DSH = gray('—');

/**
 * Left Parenthesis in gray
 *
 * ```
 * (
 * ```
 */
export const LPR = gray('(');

/**
 * Right Parenthesis in gray
 *
 * ```
 * )
 * ```
 */
export const RPR = gray(')');

/**
 * Left Curly Brace in gray
 *
 * ```
 * {
 * ```
 */
export const LCB = gray('{');

/**
 * Right Curly Brace in gray
 *
 * ```
 * }
 * ```
 */
export const RCB = gray('}');

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
 *  ~ Type v and press enter to view
 * ```
 */
export const error = redBright(` ~ Type ${bold('v')} and press ${bold('enter')} to view`);

/**
 * Time Suffix
 *
 * ```
 *  ~ 01:59:20
 * ```
 */
export const time = (now: string) => now ? reset.gray(` ~ ${now}`) : nil;
