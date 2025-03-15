/* eslint-disable no-unused-vars */

import { LiteralUnion } from 'type-fest';

/**
 * File types are represented as numeric values.
 * The infer the following:
 */
export enum FileTypes {
  Template = 1,
  Layout,
  Snippet,
  Section,
  SectionGroup,
  Config,
  Locale,
  Style,
  Script,
  Svg,
  Redirect,
  File,
  Asset,
  Metafield,
  Page,
  Spawn
}

/**
 * File Kinds
 *
 * Applied to `file.kind` context. The is a text value
 * Used to describe of file being handled.
 */
export type FileKinds = LiteralUnion<
  | 'style'
  | 'script'
  | 'liquid'
  | 'json'
  | 'image'
  | 'svg'
  | 'markdown'
  | 'html'
  | 'redirect'
  | 'video'
  | 'font'
  | 'document'
  , string
>

/**
 * Shopify Asset Key
 *
 * Applied to `file.key` context and required in theme asset
 * requests. The `key` represents to the file and directory
 * structure.
 *
 * > Used in REST API request payload
 *
 * @example
 *
 * 'snippets/filename.liquid'
 *
 */
export type FileKeys = LiteralUnion<
  | `templates/${string}${'.liquid' | '.json'}`
  | `templates/customer/${string}${'.liquid' | '.json'}`
  | `assets/${string}`
  | `sections/${string}${'.liquid' | '-group.json'}`
  | `snippets/${string}${'.liquid'}`
  | `layout/${string}${'.liquid'}`
  | `locales/${string}${'.json'}`
  | `config/settings_${'data' | 'schema'}${'.json'}`
  , string
>

/**
 * File Namespace
 *
 * Applied to `file.namespace` context. This value represents the
 * the output theme directory where a file should be written, but
 * may also represent an endpoint.
 *
 * > Used in logs, reports and other logic
 */
export type FileNamespaces = LiteralUnion<
  | 'template'
  | 'template/customer'
  | 'snippet'
  | 'section'
  | 'locale'
  | 'config'
  | 'layout'
  | 'asset'
  | 'metafield'
  | 'page'
  | 'redirect'
  | 'files'
  , string
>

/**
 * File Resource - Applied to `file.resource` context
 *
 * Applied to `file.resource` context. Infers the REST API endpoint
 * excluding `files` which will use the insufferable Shopify GraphQL endpoint.
 */
export type FileResources = LiteralUnion<
  | 'pages'
  | 'redirects'
  | 'assets'
  | 'themes'
  | 'metafields'
  | 'files'
  , string
>
