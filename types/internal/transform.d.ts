import type { LiteralUnion } from 'type-fest';
import type { Tester } from 'anymatch';
import type { RenamePaths } from '../shared';

/**
 * Input Transform Structures
 *
 * Describes transfrom input structures
 */
export namespace Input {

  /**
   * **INTERNAL USE**
   *
   * Rename with single input transform configuration
   *
   * @example
   * {
   *   style: {
   *     input: 'path/to/source/file.scss',
   *     rename: 'filename.min.css',
   *     postcss: [ plugin() ] // use some postcss plugin with this file
   *     sass: {
   *       includePaths: [
   *        'node_modules/bootstrap' // include this path
   *       ]
   *     }
   *   }
   * }
   */
  interface SingleConfig {
    /**
     * Config transform option using `rename` definition. Available on
     * the following transform configurations:
     *
     * - `style`
     * - `script`
     * - `svg`
     */
    input: string | string[];
    /**
     * Config transfrom option using `snippet` definition. Available on
     * the following transform configurations:
     *
     * - `style`
     * - `script`
     * - `svg`
     */
    snippet?: boolean;
    /**
     * Config tranform option using `rename` definition. Available on
     * the following transform configurations:
     *
     * - `style`
     * - `script`
     * - `svg`
     */
    rename?: string;
  }

  /* -------------------------------------------- */
  /* TRANSFORM CONFIG TYPES                       */
  /* -------------------------------------------- */

  /**
   * **INTERNAL USE**
   *
   * Rename with multiple inputs transform configuration
   *
   * @example
   * {
   *   style: [
   *    {
   *      input: 'path/to/source/file-1.css',
   *      snippet: true,
   *      rename: 'some-name.liquid',
   *      postcss: [ plugin() ], // use some plugin with this file
   *      sass: false // do not process with sass
   *    },
   *    {
   *      input: 'path/to/source/file-2.scss',
   *      postcss: false, // do not process with postcss
   *      sass: true, // use processor defined settings
   *      watch: [
   *       'path/to/files/*.scss'
   *      ]
   *    }
   *   ]
   * }
   */
  export type MultipleConfig = SingleConfig[]

  /**
   * **INTERNAL USE**
   *
   * Rename with single input transform configuration
   *
   * @example
   * {
   *   style: {
   *    'assets/stylesheet.css': 'path/to/file.scss', // write to assets dir and compile with sass
   *    'snippets/style.liquid': 'path/to/foo.css' // write as snippet
   *   }
   * }
   */
  export interface RenameSingle {
    /**
     * The rename path and input string (as value)
     */
    [rename: RenamePaths]: string;

  }

  /**
   * **INTERNAL USE**
   *
   * Rename with multiple inputs transform configuration
   *
   * @example
   * {
   *   style: {
   *    'assets/stylesheet.css': [
   *       'path/to/source/file-1.scss',
   *       'path/to/source/file-2.scss',
   *     ]
   *   }
   * }
   */
  export interface RenameMultiple {
    /**
     * The rename path and input string (as value)
     */
    [rename: RenamePaths]: string[];

  }

  /**
   * **INTERNAL USE**
   *
   * Rename with override transform configuration
   *
   * @example
   * {
   *   script: {
   *    'assets/filename.min.js': {
   *       input: 'path/to/source/file.ts',
   *       splitting: true,
   *       treeShaking: false
   *    }
   *   }
   * }
   */
  export interface RenameConfig {
    /**
     * The rename path and the transform override
     */
    [input: string]: Omit<SingleConfig, 'input'>
  }

}

export namespace Transform {

  /**
   * **INTERNAL USE**
   *
   * Transform Types
   *
   * Type holds partial configuration that will be digested
   * during option define operations, specifically those in the
   * `utils/options.ts` file.
   */
  export type Types = (
    | string
    | string[]
    | Input.RenameSingle
    | Input.RenameMultiple
    | Input.RenameConfig
    | Input.MultipleConfig
    | Input.SingleConfig
  )

  /**
   * **INTERNAL USE**
   *
   * Normalize Transform return type parameter options. This
   * is used by within the `utils/options.ts` file, specifically
   * the `getTransform()` helper which is responsible for path
   * resolution and dissecting the config structure.
   *
   * The resturning type is then used in `define/*` transfrom config
   * construction.
   */
  export interface Options {
    /**
     * Whether or not to flatten inputs, when `true`a transform model will be created
     * for every resolved input. Also note that when `true`, then the `anymatch` tester
     * will not be assigned.
     *
     * @default false
     *
     * @example
     *
     * // syncify.config.ts
     * { input: ['dir/glob/*'], rename: 'foo-[file]' }
     *
     * // A model will be created for every glob:
     * return [
     *   { input: 'dir/glob/file-1', rename: 'foo-file-1' },
     *   { input: 'dir/glob/file-2', rename: 'foo-file-2' }
     * ]
     *
     */
    flatten?: boolean;
    /**
     * Whether or not the input should be added to the bundle _watch_ `Set<string>` reference.
     * When `true` the resolved globs are added to `$.watch` model.
     */
    addWatch?: boolean;
    /**
     * Whether or not snippet assertion should be applied. When `true`, the retuning value
     * will include a `snippet` boolean property to signal whether or not the transform output
     * should export as a snippet.
     *
     * @default true
     *
     * @example
     *
     * // syncify.config.ts
     * {
     *   'snippets/[file]-xxxx': 'dir/file-1.js',
     *   'assets/some-new-name': 'dir/file-2.js'
     * }
     *
     * // The return value will assert snippet boolean
     * return [
     *   { input: 'dir/file-1.js', rename: 'file-1-xxxx.js', snippet: true },
     *   { input: 'dir/file-2.js', rename: 'some-new-name.js', snippet: false }
     * ]
     *
     */
    assertSnippet?: boolean;
  }

  /**
   * **INTERNAL USE**
   *
   * Resolver
   *
   * The resolver return type contains the internal reference
   * configurations for path resolutions.
   */
  export interface Resolver {
    /**
     * Resolved path list based on `getTransform()` parameter
     */
    paths: string[];
    /**
     * The Paths anymatch tester instance
     */
    match: Tester
  }

  /**
   * **INTERNAL USE**
   *
   * The returning value of the `getTransform()` utility.
   * The return type will use a "Multiple Config" structure
   * that holds resolved URI paths and normalized definitions.
   *
   * This value will be used to create to Bundle config in each
   * transform (or related) option define operation. In some cases
   * the returning value will persist throughout the Syncify instance.
   */
  export interface Resolved {
    /**
     * The resolved inputs anymatch instance of the transform
     */
    match?: Tester;
    /**
     * Resolved input path as per the transfrom resolved return type.
     * The entries are input paths will full resolution.
     */
    input?: string | string[];
    /**
     * The rename pattern to be handled. This will either be a namespace
     * entry or the input basename.
     */
    rename?: LiteralUnion<RenamePaths, string>;
    /**
     * Boolean indicating whether or not output should be generated as a
     * snippet. This will be applied according to transform pattern or config.
     */
    snippet?: boolean;
  }
}
