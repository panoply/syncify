/* eslint-disable no-unused-vars */
import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import type { Tsconfig } from 'tsconfig-type';
import type { BuildOptions as ESBuildOptions } from 'esbuild';
import type { GetProcessorConfigs, RenamePaths } from '../shared';

type TargetBrowser = (
  | 'chrome'
  | 'deno'
  | 'edge'
  | 'firefox'
  | 'hermes'
  | 'ie'
  | 'ios'
  | 'node'
  | 'opera'
  | 'rhino'
  | 'safari'
);

type TargetBrowserVersion = (
  | `${TargetBrowser}${number}`
  | `${TargetBrowser}${number}.${number}`
  | `${TargetBrowser}${number}.${number}.${number}`
);

type TargetESVersion = (
  | 'es3'
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021'
  | 'es2022'
  | 'esnext'
);

type ESBuildAllowedOptions = Pick<ESBuildOptions, (
  | 'alias'
  | 'assetNames'
  | 'banner'
  | 'bundle'
  | 'charset'
  | 'chunkNames'
  | 'entryNames'
  | 'conditions'
  | 'define'
  | 'external'
  | 'footer'
  | 'format'
  | 'globalName'
  | 'tsconfigRaw'
  | 'tsconfig'
  | 'treeShaking'
  | 'target'
  | 'jsx'
  | 'jsxDev'
  | 'jsxFactory'
  | 'jsxFragment'
  | 'jsxImportSource'
  | 'jsxSideEffects'
  | 'inject'
  | 'ignoreAnnotations'
  | 'drop'
  | 'splitting'
  | 'supported'
  | 'sourcesContent'
  | 'sourceRoot'
  | 'sourcemap'
  | 'pure'
  | 'plugins'
  | 'metafile'
  | 'loader'
  | 'publicPath'
)>

export { ESBuildOptions };

export type Target = (
  | TargetBrowser
  | TargetBrowserVersion
  | TargetESVersion
);

/**
 * Public exposed configurations
 */
export type ESBuildConfig = Merge<ESBuildAllowedOptions, {
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

interface ScriptSharedConfig {
  /**
   * JS/TS input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * ---
   *
   * @default undefined
   */
  input: string | string[];
  /**
   * This sets the target environment for the generated JavaScript. It
   * tells esbuild to transform JavaScript syntax which is too new for
   * these environments into older JavaScript syntax that works in this
   * environment\s.
   *
   * ---
   *
   * @default 'es2016'
   */
  target?: Target | Target[];
  /**
   * Instructs ESBuild to treat these modules as external. The import/s
   * will be preserved and evaluated at run time instead.
   *
   * ---
   *
   * @see
   * https://esbuild.github.io/api/#external
   *
   * @default
   * []
   */
  external?: string[];
  /**
   * Rename the JavaScript file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   *
   * ---
   *
   * @default undefined
   */
  rename?: string;
  /**
   * Optionally write the javascript file inline as a snippet. This will transform
   * the JS and contained code will be output within `<script></script>` tags as a
   * `snippet.liquid` file.
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * When `snippet` is `true` you can provide an additional list of attributes to
   * be applied to `<script>` tag which code will be output within. This only applies
   * to snippet generation and entries will be ignored if snippet is `false`.
   *
   * **Example Definition**
   *
   * ```js
   * // Attribute definitions
   * {
   *   attrs: [
   *    ['id', 'foo']
   *    ['data-attr', 'bar'],
   *    ['{{ object.prop }}'],
   *    ['{% if xxx %}', 'data-xxx', '{% endif %}']
   *   ]
   * }
   * ```
   *
   * **Example Output**
   *
   * ```liquid
   * <script
   *  id="foo"
   *  data-attr="bar"
   *  {{ object.prop }}
   *  {% if xxx %}data-xxx{% endif %}></script>
   * ```
   *
   * // Output
   * @default []
   */
  attrs?: Array<string[]>;
  /**
   * Entry points (paths/files) to watch that will trigger a rebuilds of
   * the defined _input_ file. By default, Syncify will watch all import entries
   * imported by the _input_.
   *
   * @default []
   */
  watch?: string[]
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

interface ScriptFormatESM extends ScriptSharedConfig {

  /**
   * The format to be generated. Because we are targeting
   * browser environments, Syncify does not allow for CJS (commonjs)
   * bundles to be produced.
   *
   * @default 'esm'
   */
  format?: 'esm';
}

interface ScriptFormatIIFE extends ScriptSharedConfig {
  /**
   * The format to be generated. Because we are targeting
   * browser environments, Syncify does not allow for CJS (commonjs)
   * bundles to be produced.
   *
   * @see https://esbuild.github.io/api/#format
   * @default 'esm'
   */
  format?: 'iife';
  /**
   * Sets the name of the global variable which is used to store the
   * exports from the entry point.
   *
   * @see https://esbuild.github.io/api/#global-name
   * @default undefined
   */
  globalName?: string;
}

export type ScriptTransform = ScriptFormatESM | ScriptFormatIIFE;

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

export type ScriptTransformer = (
  | string
  | string[]
  | ScriptTransform
  | ScriptTransform[]
  | { [rename: RenamePaths]: string | string[] | Omit<ScriptTransform, 'rename'> }
)

/* -------------------------------------------- */
/* INTERAL USE                                  */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor Configuration
 */
export type ESBuildProcesser = Merge<GetProcessorConfigs<ESBuildOptions>, {
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
