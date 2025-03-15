import type { ESBuildOptions } from '@syncify/types';
import type { Tester } from 'anymatch';
import type { Tsconfig } from 'tsconfig-type';
import type { Merge } from 'type-fest';

/**
 * Processor Configuration
 */
export type ESBuildProcesser = Merge<ESBuildOptions, {
  /**
   * Despite the name, this getter represents both
   * `tsconfig.json` or `jsconfig.json` files.
   */
  get tsconfig(): Tsconfig;

}>

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration for scripts
 */
export interface ScriptBundle {
  /**
   * A UUID reference for this $.
   */
  uuid: string;
  /**
   * Resolved input path. Passed to the ESBuild `entryPoint` option.
   */
  input: string;
  /**
   * The file contents
   */
  value: string;
  /**
   * The namespace value, used in CLI logs
   */
  namespace: string;
  /**
   * The file type reference
   */
  type: number;
  /**
   * Whether or not to export as a snippet
   */
  snippet: boolean;
  /**
   * Snippet attributes to apply
   */
  attrs: string[]
  /**
   * Resolved key reference, used in the Shopify sync requests
   */
  key: string;
  /**
   * Resolved output path where the transformed file should be written.
   * This value will have a rename applied in the uri.
   */
  output: string;
  /**
   * Imports contained in the input. This is used to trigger a build.
   * Matches applied to the anymatch pattern at runtime.
   */
  watch: Set<string>;
  /**
   * The size in bytes of the generated file. This metric is obtained
   * on the pre-complile at runtime when importer paths are collected.
   * The value will be `NaN` unless executing in `--terse` (or `--prod`).
   */
  size: number;
  /**
   * Watch extendables - This `Set` accounts for watch paths defined
   * by the user. We keep them isolated to ensure they are not removed
   * when importers are adjusted during re-builds.
   */
  watchCustom: Tester;
  /**
   * ESBuild options which will either use the processor defaults or
   * if defined on script $, will be merged with processor defaults.
   */
  esbuild: ESBuildOptions
}
