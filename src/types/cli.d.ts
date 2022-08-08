/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

import { LiteralUnion } from 'type-fest';

export type Group = LiteralUnion<
  | 'syncify'
  | 'asset'
  | 'spawns'
  | 'icon'
  | 'snippet'
  | 'layout'
  | 'section'
  | 'page'
  | 'locale'
  | 'config'
  | 'template'
  | 'template/customer'
  | 'metafield'
  , string
>

/**
 * TUI Tree
 */
export type Logger = [
  /**
   * `0` TUI Crown
   *
   * `┌─`
   *
   * Prints an opening log line
   */
  (message: string) => void,
  /**
   * `1` TUI Trunk
   *
   * `│`
   *
   * Prints a single level line
   */
  (message: string) => void,
  /**
   * TUI Tree - Branch
   *
   * `├ `
   */
  (message: string) => void,
  /**
   * `2` TUI Root
   *
   * `└─`
   *
   * Prints a closing log line
   */
   (message: string) => void
]

interface LogOptions {
  /**
   * Tree level indents:
   *
 * - `0` `┌─`
 * - `1` `│`
 * - `2` `└─`
   */
  level?: 1 | 2 | 3;
  /**
   * Whether this is the last log to be written to the
   * tree (level 5). This is not definite, level might be
   * changed depending on running mode.
   */
  last?: boolean;
  /**
   * Whether or not to invoke timer
   */
  timer?: boolean;
  /**
   * Log stores for later usage
   */
  store?: 'errors' | 'warnings';
  /**
   * Group title
   */
  group?: LiteralUnion<
  | 'styles'
  | 'pages'
  | 'assets'
  | 'sections'
  | 'snippets'
  | 'layout'
  | 'template'
  | 'customers'
  | 'config'
  | 'locales'
  | 'metafields'
  | 'redirect'
  | 'files', string>
}

type Log = (message: string, options?: LogOptions) => void

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

export interface ILog {
  /**
   * Prints log to the `last` known tree reference.
   */
  (message: string): void;
  /**
   * Standard `group` namespace log with `message` as
   * second parameter.
   */
  (group: string, message: string): void;
   /**
   * Tree level indents:
   *
   * 1. `┌─`
   * 2. `│`
   * 3. `├─`
   * 4. `│ ├─`
   * 5. `│ └─ `
   * 6. `└─`
   */
  (message: string, tree: 1 | 2 | 3 | 4 | 5): void;
  stack?: { group: string; warnings: { [file: string]: Set<string>} };
  group?: string;
  last?: number;
  spawn?: (...message: string[]) => void;
  throw?: (...message: string[]) => void;
  error?: (...message: string[]) => void;
  warn?: (filename: string, message: string) => void;
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
