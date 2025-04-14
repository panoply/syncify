/**
 * JSON File Minification
 */
export type JSONTerse = {
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

export type JSONTransform = {
  /**
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   *
   * @default false
   */
  crlf?: boolean;
  /**
   * The indentation level
   *
   * @default 2
   */
  indent?: number;
  /**
   * Whether to use tabbed `\t` identation characters. When `true`, tabs will apply
   * at the division of `2` relative to the `indent` option value.
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * Whether or not comments should be stripped or preserved.
   * This effects how Syncify handles both local and remote sources.
   *
   * @default false
   */
  stripComments?: boolean;
  /**
   * Whether or not Syncify should apply alpha-numeric sorting to object properties
   * or not. This will apply deep sorting, so all objects within a structure will adhere.
   *
   * Apply object sorting on a specific list of entries in the JSON structure. Target deeply nested
   * property objects and their values using dot `.` separated expressions by passing sting list.
   *
   * ```js
   * { sortObjects: ['a.b'] } // sort only these objects
   *
   * // BEFORE
   * { a: { b: { z: '2', x: '1' } }, c: { b: '2', a: '1' } }
   *
   * // AFTER
   * { a: { b: { x: '1', z: '2', } }, c: { b: '2', a: '1' } }
   * ```
   *
   * @default false
   */
  sortObjects?: boolean | string[];
  /**
   * Whether or not Syncify should apply alpha-numeric sorting to arrays in JSON.
   * You should avoid setting this to `true` and use with caution.
   *
   * Apply array sorting on a specific list of entries in the JSON structure. Target deeply nested
   * properties and their values using dot `.` separated expressions by passing sting list.
   *
   * @default false
   */
  sortArrays?: boolean | string[];
  /**
   * Define a list of property names with object values that should be excluded and skipped
   * from sorting. This option only applies when `sortObjects` and/or `sortArrays` is set to
   * `true` and will have no effect if `sortObjects` and/or `sortArrays` is not enabled.
   *
   * @default []
   */
  noSortList?: string[];
  /**
   * An optional string list of paths/filenames to exclude
   * from processing, ie: pass through
   *
   * @default false
   */
  exclude?: string[];
  /**
   * JSON minification options. By default, this option is set to `false`
   * which disables minification being applied to `.json` file types. Setting
   * this to `true` will enabled JSON minification to apply.
   *
   * > **NOTE**
   * >
   * > Terse operations require the explicit `--prod` OR `--terse` flags be provided.
   * > Failure to pass such flags will result in minification being skipped.
   */
  terse?: boolean | JSONTerse;
}
