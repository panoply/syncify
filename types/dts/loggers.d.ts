import type { LiteralString } from './utilities';

/**
 * Log Minified Params
 *
 * Spread types used by minified logger
 */
export type LogMinifiedParams = (
  | [ size: string]
  | [ kind: string, before: string, after: string, saved: string ]
  | [ before: string, after: string, saved: string]
 )

/**
 * Log Prefixes
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 */
export type LogPrefixes = LiteralString<
  | 'changed'
  | 'updated'
  | 'external'
  | 'publish'
  | 'release'
  | 'process'
  | 'export'
  | 'skipped'
  | 'version'
  | 'importer'
  | 'transform'
  | 'minified'
  | 'reloaded'
  | 'syncing'
  | 'queued'
  | 'pending'
  | 'retrying'
  | 'uploaded'
  | 'invalid'
  | 'failed'
  | 'warning'
  | 'deleted'
  | 'ignored'
>
