/* -------------------------------------------- */
/* PATHS                                        */
/* -------------------------------------------- */

import type { Tester } from 'anymatch';

export type PathRename = Array<{
  /**
   * An anymatch tester function
   */
  match: Tester,
  /**
   * The rename pattern
   *
   * @example
   * '[name]'
   * '[dir]-[name]'
   * // etc etc
   */
  pattern: string;
}>

/**
 * Internal structure for project paths
 */
export type PathConfig = {
  /**
   * Holds a hard Set reference containing all resolved file uri paths
   *
   * @default null
   */
  input: Set<string>;
  /**
   * Base directory reference in input - Used as a fallback to write new files
   * when executing a pull operation.
   *
   * @default null
   */
  root: string;
  /**
   * An expanded copy of the users defined paths
   *
   * @default null
   */
  config: string[];
  /**
   * Anymatch tester of all resolved paths.
   *
   * @default null
   */
  match: Tester;
  /**
   * Path excludes
   */
  exclude: Set<string>
 /**
   * Match rename paths, this array will map to a rename pattern.
   *
   * @default []
   */
  rename: PathRename
};

export type PathsPlus = {
  /**
   * The resolved blogs directory path
   *
   * @default 'source/+/schema/*'
   */
  blogs?: PathConfig;
  /**
   * The resolved shared schema file paths
   *
   * @default 'source/+/schema/*.{schema,json}'
   */
  schema?: PathConfig;
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/+/metafields/**'
   */
  metafields?: PathConfig;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/+/navigation/*.json'
   */
  navigation?: PathConfig;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/+/pages/*'
   */
  pages?: PathConfig;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/+/policies/*.{html,md}'
   */
  policies?: PathConfig;
  /**
   * The resolved `files` directory path
   *
   * @default 'source/+/files/**'
   */
  files?: PathConfig;
}

export type PathsBundle = PathsPlus & {
  /**
   * Resolved match and path references uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: PathConfig;
  /**
   * Resolved match and path references uploaded as blocks
   *
   * @default 'source/blocks'
   */
  blocks?: PathConfig
  /**
   * Resolved match and path references uploaded as configs
   *
   * @default 'source/config'
   */
  config?: PathConfig
  /**
   * Resolved match and path references uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: PathConfig
  /**
   * Resolved match and path references uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: PathConfig;
  /**
   * Resolved match and path references uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: PathConfig;
  /**
   * Resolved match and path references uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: PathConfig
  /**
   * Resolved match and path references uploaded as template/metaobject
   *
   * @default 'source/templates/metaobjects'
   */
  metaobject?: PathConfig
  /**
   * Resolved match and path references uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: PathConfig
 /**
   * Resolved match and path references uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: PathConfig

}
