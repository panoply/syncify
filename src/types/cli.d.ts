/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

type Log = (...message: string[]) => void

export interface IBuildLog {
  /**
   * Styles Group
   */
  styles?: Log,
  /**
   * Pages Group
   */
  pages?: Log,
  /**
   * Assets Group
   */
  assets?: Log,
  /**
   * Sections Group
   */
  sections?: Log,
  /**
   * Snippets Group
   */
  snippets?: Log,
  /**
   * Layout Group
   */
  layout?: Log,
  /**
   * Templates Group
   */
  templates?: Log,
  /**
   * Template Customers Group
   */
  'templates/customers'?: Log,
  /**
   * Config Group
   */
  config?: Log,
  /**
   * Locales Group
   */
  locales?: Log,
  /**
   * Metafields Group
   */
  metafields?: Log,
}

export interface ILog extends IBuildLog {
  tracked?: string;
  files?: Log,
  vscode?: Log,
  clean?: Log,
  throw?: Log,
  error?: Log,
  print?: Log,
  warning?: Log,
}

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
   * An optional config file path
   */
  config?: string;
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
   *  Run in production mode
   */
  prod?: boolean;
  /**
   *  Run in development mode
   */
  dev?: boolean;
  /**
   * Show command prompt
   */
  prompt?: boolean;
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
   *  Metafields resource mode
   */
  metafields?: boolean;
  /**
   *  Pages resource mode
   */
  pages?: boolean;
  /**
   *  Pull data reference, can be `metafields`, `settings_data.json` or `locales`
   */
  pull?: boolean;
  /**
   *  Merges data with remote, can be `metafields`, `settings_data.json` or `locales`
   */
  merge?: boolean;
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
