/* eslint-disable no-unused-vars */

declare global {

  /* -------------------------------------------- */
  /* TSUP DEFINE                                  */
  /* -------------------------------------------- */

  // ESBuild will replace there Occurances via TSUP
  // The globals are merely sugars. See the tsup.config.ts
  // file for replacements.

  /**
   * The `package.json` version entry.
   */
  const VERSION: string;
  /**
   * Empty String, e.g: `''`
   */
  const NIL: string;
  /**
   * Newline Repeats x2, e.g: `'\n\n'`
   */
  const NLR: string;
  /**
   * Newline Character, e.g: `'\n'`
   */
  const NWL: string;
  /**
   * Whitespace Character e.g: `' '`
   */
  const WSP: string;
  /**
   * Whitespace Repeats x2  e.g: `'  '`
   */
  const WSR: string;
  /**
   * Jest Global
   */
  const jest: undefined;

}

export default global;
