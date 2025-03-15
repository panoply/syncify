import type { BuildOptions as ESBuildOptions } from 'esbuild';
import type { Merge } from 'type-fest';

type ScriptRename = `${'assets' | 'snippets'}/${string}`

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
  | 'inject'
  | 'ignoreAnnotations'
  | 'tsconfigRaw'
  | 'tsconfig'
  | 'treeShaking'
  | 'target'
  | 'jsx'
  | 'keepNames'
  | 'jsxDev'
  | 'jsxFactory'
  | 'jsxFragment'
  | 'jsxImportSource'
  | 'jsxSideEffects'
  | 'loader'
  | 'minify'
  | 'mangleCache'
  | 'mangleQuoted'
  | 'mangleProps'
  | 'minifyIdentifiers'
  | 'minifySyntax'
  | 'minifyWhitespace'
  | 'mangleQuoted'
  | 'metafile'
  | 'drop'
  | 'splitting'
  | 'supported'
  | 'sourcesContent'
  | 'sourceRoot'
  | 'sourcemap'
  | 'pure'
  | 'plugins'
  | 'publicPath'
)>

export { ESBuildOptions };

export type ESBuildTarget = (
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
  target?: ESBuildTarget | ESBuildTarget[];
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
   * when undefined. Accepts namespaces, `[file]` or `[name]`, `[dir]` and/or `[ext]`.
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
   * be applied to inlined `<script>` tag which code will be output within. This only applies
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
   * `false` which will inform Syncify to skip processing scripts with ESBuild.
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
  | Record<ScriptRename, string>
  | Record<ScriptRename, string[]>
  | Record<ScriptRename, Omit<ScriptTransform, 'rename'>>
)
