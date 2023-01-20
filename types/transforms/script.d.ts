/* eslint-disable no-unused-vars */
import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import type { Tsconfig } from 'tsconfig-type';
import type { BuildOptions as ESBuildOptions } from 'esbuild';
import type { GetProcessorConfigs, RenamePaths } from '../misc/shared';

export type ESBuildConfig = Merge<Pick<ESBuildOptions,
  | 'bundle'
  | 'treeShaking'
  | 'tsconfig'
  | 'target'
  | 'splitting'
  | 'pure'
  | 'define'
  | 'format'
  | 'banner'
  | 'footer'
  | 'charset'
  | 'chunkNames'
  | 'drop'
  | 'ignoreAnnotations'
  | 'jsx'
  | 'jsxDev'
  | 'jsxFactory'
  | 'jsxFragment'
  | 'jsxImportSource'
  | 'mainFields'
  | 'metafile'
  | 'resolveExtensions'
  | 'supported'
  | 'plugins'
  >, {
    /**
     * The format to be generated. Because we are targeting
     * browser environments, Syncify does not allow for CJS (commonjs)
     * bundles to be produced.
     *
     * @default 'esm'
     */
    format?: 'esm' | 'iife';
    /**
     * Whether or not sourcemaps should be generated.
     * Syncify will process sourcemap generation internally,
     * so this option only accepts a boolean value.
     *
     * @default true
     */
    sourcemap?: boolean;
  }
>;

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

export interface ScriptTransform {
  /**
   * JS/TS input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default undefined
   */
  input: string | string[];
   /**
     * The format to be generated. Because we are targeting
     * browser environments, Syncify does not allow for CJS (commonjs)
     * bundles to be produced.
     *
     * @default 'esm'
     */
  format?: 'esm' | 'iife';
  /**
   * Rename the stylesheet file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   *
   * ---
   *
   * @default undefined
   */
  rename?: string;
  /**
   * Optionally write the javascript file inline as a snippet. This will transform
   * the JS and contained code will be output within `<script></script>` tags output as a
   * `snippet.liquid` file.
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * Entry points (paths/files) to watch that will trigger a rebuilds of
   * the define _input_ file. By default, Syncify will watch all import entries
   * imported by the _input_.
   *
   * @default []
   */
  watch?: string[];
  /**
   * [ESBuild](https://esbuild.github.io/) Override
   *
   * ESBuild file transforms will use the options provided to `processor.esbuild`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.esbuild`.
   *
   * You can also skip pre-processing with esbuild by passing a _boolean_
   * `false` which will inform Syncify to process scripts with ESBuild.
   *
   * @default true // if esbuild is not installed this is false
   */
  esbuild?: boolean | ESBuildConfig;
}

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

export type ScriptTransformer = (
  | string
  | string[]
  | ScriptTransform
  | ScriptTransform[]
  | {
    [K in RenamePaths]: (
      | string
      | string[]
      | Pick<ScriptTransform,
        | 'input'
        | 'format'
        | 'snippet'
        | 'watch'
        | 'esbuild'
      >
    )
  }
)

/* -------------------------------------------- */
/* INTERAL USE                                  */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor Configuration
 */
export type ESBuildProcesser = Merge<
  GetProcessorConfigs<ESBuildOptions>,
  {
    get tsconfig(): Tsconfig,
  }
>

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration
 */
export type ScriptBundle = Merge<ScriptTransform, {
  /**
   * A UUID reference for this bundle.
   */
  uuid: string;
  /**
   * Resolved input path
   */
  input: string;
  /**
   * All entry points (imports) contained in the input.
   * Matches applied to the anymatch pattern and applied
   * at runtime.
   */
  watch: Tester;
}>;
