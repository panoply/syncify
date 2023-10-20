import type { LiteralUnion } from 'type-fest';
import type { Store, Theme } from '../$/index';
import type { File } from '../$/file';
import type { Notification } from 'node-notifier';
import { Ansis } from 'ansis';

/**
 * Log Prefixes
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 */
export type Prefixes = LiteralUnion<string, (
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
)>

export type MinifiedParams = (
 | [ size: string]
 | [ kind: string, before: string, after: string, saved: string ]
 | [ before: string, after: string, saved: string]
)

export interface LogOptions {
  /**
   * The color of the message
   *
   * @default whiteBright
   */
  color?: Ansis;
  /**
   * The type of message - The message `color` will reflect
   * if unspecific, meaning if `type` is `warning` text is yellow,
   * if `type` is `error` text is red.
   *
   * @default null
   */
  type?: 'warning' | 'error'
  /**
   * Whether or not to apply an append suffix.
   *
   * @default null
   */
  suffix?: string;

}
