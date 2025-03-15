/* eslint-disable no-unused-vars */

declare global {

  /* -------------------------------------------- */
  /* TSUP DEFINE                                  */
  /* -------------------------------------------- */

  // ESBuild will replace there Occurances via TSUP
  // The globals are merely sugars. See the tsup.config.ts
  // file for replacements.

  /**
   * GraphQL query function which is replaced by ESBuild
   */
  const gql: (value: any) => any;
  /**
   * The `package.json` version entry.
   */
  const VERSION: string;
  /**
   * The `@syncify/hot` version entry.
   */
  const HOT_VERSION: string;
  /**
   * The `@syncify/hot` alias define
   */
  const HOT_ALIAS: string;
  /**
   * The `@syncify/config` version entry.
   */
  const CONFIG_VERSION: string;
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
