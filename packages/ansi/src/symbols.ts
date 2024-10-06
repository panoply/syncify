import { gray, neonGreen, redBright, lightGray, red, yellow } from './colors';

/**
 * Tree Characters
 */
export const Tree = {
  /**
   * Tree Line Top
   *
   * ```bash
   * ┌─
   * ```
   */
  open: `${lightGray.open}┌─${lightGray.close} `,
  /**
   * Tree Line Stub
   *
   * ```bash
   * ├
   * ```
   */
  stub: `${lightGray.open}├${lightGray.close}  `,
  /**
   * Tree Line Dash
   *
   * ```bash
   * ├─
   * ```
   */
  dash: `${lightGray.open}├─${lightGray.close} `,
  /**
   * Tree Line (without suffixed whitespace)
   *
   * ```bash
   * │
   * ```
   */
  trim: `${lightGray.open}│${lightGray.close}`,
  /**
   * Tree Line
   *
   * ```bash
   * │
   * ```
   */
  line: `${lightGray.open}│${lightGray.close}  `,
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
  next: `\n${lightGray.open}│${lightGray.close}`,
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
  after: `${lightGray.open}│${lightGray.close}\n`,
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
  wrap: `\n${lightGray.open}│${lightGray.close}\n`,
  /**
   * Tree Line Base
   *
   * ```bash
   * └─
   * ```
   */
  base: `${lightGray.open}└─${lightGray.close} `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  red: `${red.dim.open}│${red.dim.close}  `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  redTrim: `${red.dim.open}│${red.dim.close}`,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellow: `${yellow.dim.open}│${yellow.dim.close}  `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellowTrim: `${yellow.dim.open}│${yellow.dim.close}`,
  /**
   * Tree Line Indentation
   *
   * Symbols used for next level lines
   */
  indent: {
    /**
     * Tree Indent Line Top
     *
     * ```bash
     * ├──┬─
     * ```
     */
    edge: `${lightGray.open}├──┬─${lightGray.close} `,
    /**
     * Tree Indent Line Fall
     *
     * ```bash
     * ├──┐
     * ```
     */
    fall: `${lightGray.open}├──┐${lightGray.close} `,
    /**
     * Tree Indent Line
     *
     * ```bash
     * │  │
     * ```
     */
    line: `${lightGray.open}│  │${lightGray.close} `,
    /**
     * Tree Indent Line Stub
     *
     * ```bash
     * │  ├
     * ```
     */
    stub: `${lightGray.open}│  ├${lightGray.close} `,
    /**
     * Tree Indent Line Dash
     *
     * ```bash
     * │  ├─
     * ```
     */
    dash: `${lightGray.open}│  ├─${lightGray.close} `,
    /**
     * Tree Indent Line Base
     *
     * ```bash
     * │  └─
     * ```
     */
    base: `${lightGray.open}│  └─${lightGray.close} `
  }
};

/* -------------------------------------------- */
/* CHARACTER HELPERS                            */
/* -------------------------------------------- */

/**
 * Pipe character in gray
 *
 * ```bash
 * |
 * ```
 */
export const PIP = `${gray.open}|${gray.close}`;

/**
 * Hash character in gray
 *
 * ```bash
 * #
 * ```
 */
export const HSH = `${gray.open}#${gray.close}`;

/**
 * Plus character in gray
 *
 * ```bash
 * +
 * ```
 */
export const PLS = `${gray.open}+${gray.close}`;

/**
 * Minus character in gray
 *
 * ```bash
 * -
 * ```
 */
export const MIN = `${gray.open}-${gray.close}`;

/**
 * Comma character in gray
 *
 * ```bash
 * ,
 * ```
 */
export const COM = `${gray.open},${gray.close}`;

/**
 * Checkmark character in neonGreen
 *
 * ```bash
 * ✓
 * ```
 */
export const CHK = `${neonGreen.open}✓${neonGreen.close}`;

/**
 * Cross character in redBright
 *
 * ```bash
 * 𐄂
 * ```
 */
export const BAD = `${redBright.open}𐄂${redBright.close}`;

/**
 * Colon character in gray
 *
 * ```bash
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
 * ▸
 * ```
 */
export const CHV = `${gray.open}▸${gray.close}`;

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

/* -------------------------------------------- */
/* INFIX WRAPPERS                               */
/* -------------------------------------------- */

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

/**
 * Left Square Brace in gray
 *
 * ```bash
 * [
 * ```
 */
export const LSB = `${gray.open}[${gray.close}`;

/**
 * Right Square Brace in gray
 *
 * ```bash
 * ]
 * ```
 */
export const RSB = `${gray.open}]${gray.close}`;

/**
 * Left Angle Brace in gray
 *
 * ```bash
 * <
 * ```
 */
export const LAN = `${gray.open}<${gray.close}`;

/**
 * Right Angle Brace in gray
 *
 * ```bash
 * >
 * ```
 */
export const RAN = `${gray.open}>${gray.close}`;
