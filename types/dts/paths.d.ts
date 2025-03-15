/* -------------------------------------------- */
/* PATHS                                        */
/* -------------------------------------------- */

import type { LiteralString } from './utilities';
import type { Paths, RenamePaths } from '@syncify/types';
import type { Tester } from 'anymatch';
import type { Merge } from 'type-fest';

export type PathsBundle = Merge<Paths<Tester>, { transforms?: Map<string, 7 | 8 | 9> }>;

export type PathsRef = {
  /**
   * Set of all resolved paths;
   *
   * @default null
   */
  input: Set<string>;
  /**
   * A copy of the user define paths
   *
   * @default null
   */
  config: string;
  /**
   * Anymatch tester of all resolved paths which determine to which theme directory
   * the path belongs.
   *
   * @default null
   */
  match: Tester;
 /**
   * Match rename paths, this array will map to a rename pattern.
   *
   * - `[0]` ~ _anymatch tester function_
   * - `[1]` ~ _rename pattern being used_
   *
   * @default []
   *
   * @example
   * {
   *   rename: [
   *    [ anymatch(), '[name]', false],
   *    [ anymatch(), '[dir]-[name]', true]
   *   ]
   * }
   */
  rename: Array<[
    match: Tester,
    pattern: LiteralString<keyof RenamePaths>
  ]>
};

export interface PathBundle {
  /**
   * Resolved match and path references uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: PathsRef
  /**
   * Resolved match and path references uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: PathsRef
  /**
   * Resolved match and path references uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: PathsRef
  /**
   * Resolved match and path references uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: PathsRef
  /**
   * Resolved match and path references uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: PathsRef
  /**
   * Resolved match and path references uploaded as template/metaobject
   *
   * @default 'source/templates/metaobjects'
   */
  metaobject?: PathsRef
  /**
   * Resolved match and path references uploaded as blocks
   *
   * @default 'source/blocks'
   */
  blocks?: PathsRef
  /**
   * Resolved match and path references uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: PathsRef
  /**
   * Resolved match and path references uploaded as configs
   *
   * @default 'source/config'
   */
  config?: PathsRef
  /**
   * Resolved match and path references uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: PathsRef
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields'
   */
  metafields?: PathsRef
  /**
   * The resolved shared `schema` paths
   *
   * @default 'source/schema'
   */
  schema?: PathsRef;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: PathsRef
  /**
   * The resolved `redirects` yaml file
   *
   * @default 'redirects.yaml'
   */
  redirects?: PathsRef
  /**
   * Special Transforms reference
   *
   * @default 'source/assets'
   */
  transforms?: Map<string, 9 | 10 | 11>
}

export interface PathStash {
  /**
   * Resolved match and path references uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: string
  /**
   * Resolved match and path references uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: string
  /**
   * Resolved match and path references uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: string
  /**
   * Resolved match and path references uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: string
  /**
   * Resolved match and path references uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: string
  /**
   * Resolved match and path references uploaded as template/metaobject
   *
   * @default 'source/templates/metaobjects'
   */
  metaobject?: string
  /**
   * Resolved match and path references uploaded as blocks
   *
   * @default 'source/blocks'
   */
  blocks?: string
  /**
   * Resolved match and path references uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: string
  /**
   * Resolved match and path references uploaded as configs
   *
   * @default 'source/config'
   */
  config?: string
  /**
   * Resolved match and path references uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: string
}
