
/* -------------------------------------------- */
/* CLI OPTIONS                                  */
/* -------------------------------------------- */

export interface ICLIOptions {
  /**
   * The command triggered (converted into stores)
   */
  _?: string[];
  /**
   * Whether or not syncify was called via the cli
   */
  cli?: boolean;
  /**
   * The `package.json` url path
   */
  pkg?: string;
  /**
   * The current working directory
   */
  cwd?: string;
  /**
   * The environment variable passed
   */
  env?: string;
  /**
   *  The resource to be executed
   */
  resource?: string;
  /**
   *  Run in watch mode
   */
  watch?: boolean;
  /**
   *  Run in build mode
   */
  build?: boolean;
  /**
   *  Run in  upload mode
   */
  upload?: boolean;
  /**
   *  Run in download mode
   */
  download?: boolean;
  /**
   * Generate VS Code JSON schema spec
   */
  vsc?: boolean;
  /**
   *  Run a clean of output directory
   */
  clean?: boolean;
  /**
   *  Show help
   */
  help?: boolean;
  /**
   * Provided stores to run sync on
   */
  store?: string | string[];
  /**
   * Themes within stores to run sync on
   */
  theme?: string[];
  /**
   * The output directory
   */
  output?: string;
}
