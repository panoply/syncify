import { bold } from 'ansis';

import { gray, neonGreen, redBright, yellow } from './colors';

/* -------------------------------------------- */
/* CHARACTER HELPERS                            */
/* -------------------------------------------- */

/**
 * Warning ALT symbol in yellow
 *
 * ```bash
 * ⚠
 * ```
 */
export const WRN = `${bold.open + yellow.open}!${yellow.close + bold.close}`;

/**
 * Letter `v` in small caps
 *
 * ```bash
 * ᴠ
 * ```
 */
export const VER = `${gray.open}ᴠ${gray.close}`;

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
 * Micro character in gray
 *
 * ```bash
 * µ
 * ```
 */
export const MIC = `${gray.open}µ${gray.close}`;

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
 * ✕
 * ```
 */
export const BAD = `${redBright.open}✕${redBright.close}`;

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
 * ➔
 * ```
 */
export const ARR = `${gray.open}➔${gray.close}`;

/**
 * Right double Chevron character in gray
 *
 * ```bash
 * »
 * ```
 */
export const NXT = `${gray.open}»${gray.close}`;

/**
 * Right Chevron solid character in gray
 *
 * ```bash
 * ➤
 * ```
 */
export const CHV = `${gray.open}➤${gray.close}`;

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
