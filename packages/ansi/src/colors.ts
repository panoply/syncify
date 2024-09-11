import type { Merge } from 'type-fest';
import ansis, { Ansis } from 'ansis';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type AnsisExtend = Merge<Ansis, {
  readonly lightGray?: Ansis
  readonly brown?: Ansis
  readonly pink?: Ansis
  readonly teal?: Ansis
  readonly orange?: Ansis
  readonly lavender?: Ansis
  readonly neonGreen?: Ansis
  readonly neonCyan?: Ansis
  readonly neonRouge?: Ansis
  readonly neonMagenta?: Ansis
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
  | 'teal'
  | 'brown'
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
/* EXTEND COLORS                                */
/* -------------------------------------------- */

ansis.extend(
  {
    brown: '#c19a6b',
    pink: '#ff75d1',
    teal: '#91EBC2',
    lightGray: '#2a2a2e',
    orange: '#FFAB40',
    lavender: '#8080FF',
    neonGreen: '#56ef83',
    neonCyan: '#69d5fd',
    neonRouge: '#FF8095',
    neonMagenta: '#7b68ee'
  }
);

/* -------------------------------------------- */
/* REXPORT COLORS                               */
/* -------------------------------------------- */

export const {

  // STANDARD

  cyan,
  red,
  green,
  yellow,
  magenta,
  blue,
  white,
  gray,
  dim,

  // BRIGHT
  cyanBright,
  redBright,
  greenBright,
  yellowBright,
  magentaBright,
  blueBright,
  whiteBright,

  // OTHER

  strip,

  // STYLES

  underline,
  bold,
  reset,

  // CUSTOM

  lightGray,
  pink,
  brown,
  teal,
  orange,
  lavender,
  neonGreen,
  neonCyan,
  neonRouge,
  neonMagenta

}: AnsisExtend = ansis;
