import type { Tester } from 'anymatch';

/**
 * JSON File Minification
 */
export interface JSONTerse {
  /**
   * Minify `.json` files writing to `theme/assets`
   *
   * @default true
   */
  assets?: boolean;
  /**
   * Minify `settings_schema.json` and `settings_data.json` config files.
   *
   * @default true
   */
  config?: boolean;
  /**
   * Minify `locale` and `.json` files.
   *
   * @default true
   */
  locales?: boolean;
  /**
   * Minify `metafield` and `.json` files.
   *
   * @default true
   */
  metafields?: boolean;
  /**
   * Minify `metaobject` and `.json` files.
   *
   * @default true
   */
  metaobject?: boolean;
  /**
   * Minify section group `.json` files
   *
   * @default true
   */
  groups?: boolean;
  /**
   * Minify `template` and `.json` files.
   *
   * @default true
   */
  templates?: boolean;
  /**
   * An optional list of paths/files to exclude from minification.
   *
   * @default []
   */
  exclude?: string[]
}

export interface JSONTransform {
  /**
   * The indentation level
   *
   * @default 2
   */
  indent?: number;
  /**
   * Whether to use `\t` identation characters.
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * Whether or not comments should be stripped or preserved
   *
   * @default false
   */
  comments?: boolean;
  /**
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   *
   * @default false
   */
  crlf?: boolean;
  /**
   * An optional string list of paths/filenames to exclude
   * from processing, ie: pass through
   *
   * @default false
   */
  exclude?: string[];
  /**
   * JSON minification options. By default, the option is set to `false`
   * which disables minification being applied to `.json` file types. Setting
   * this to `true` will enabled JSON minification.
   *
   * > **NOTE**
   * >
   * > Terse operations require explicit `--prod` OR `--terse` flags be provided.
   * > Failure to pass such flags will result in minification being skipped.
   */
  terse?: boolean | JSONTerse;
}

/* -------------------------------------------- */
/* INTERAL USE                                  */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration
 */
export interface JSONBundle extends Required<Omit<JSONTransform, 'exclude' | 'terse'>> {
  /**
   * Paths to exclude from JSON processing
   */
  exclude: Tester;
  /**
   * The resolved cache path.
   */
  cache: string;
  /**
   * Terse minification options
   */
  terse: {
    /**
     * Whether or not terse minificiation applies
     */
    enabled: boolean;
    /**
     * Paths to exclude from JSON processing
     */
    exclude: Tester;
    /**
     * Terse Options
     */
    options: Omit<JSONTerse, 'exclude'>;
  }
}
