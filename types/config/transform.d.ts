import type { LiquidTransform } from '../transform/liquid';
import type { JSONTransform } from '../transform/json';
import type { ScriptTransformer } from '../transform/script';
import type { StyleTransformer } from '../transform/style';
import type { SVGTransformer } from '../transform/svg';
/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

export interface Transforms {
  /**
   * Style File transforms
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   style: {
   *    'assets/stylesheet.css': 'path/to/file.scss', // write to assets dir and compile with sass
   *    'snippets/style.liquid': 'path/to/foo.css' // write as snippet
   *   }
   * }
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   style: {
   *    'assets/stylesheet.css': [
   *      'path/to/source/file-1.scss',
   *      'path/to/source/file-2.scss',
   *    ]
   *   }
   * }
   *
   * // OPTION 3 - Rename with overrides
   * {
   *   style: {
   *    'assets/filename.min.css': {
   *       input: 'path/to/source/file.scss',
   *       includePaths: ['node_modules'],
   *       watch: []
   *    }
   *   }
   * }
   *
   * // OPTION 4 - Single config
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
   *
   * // OPTION 5 - Multiple configs
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
  style?: StyleTransformer;

  /**
   * **JavaScript/TypeScript Transforms**
   *
   * Script inputs can be defined a few different ways depending on your preference.
   * You can also override ESBuild `processor` defined options on a per-file basis.
   * Options 1, 2 and 3 are typically the preferred structures.
   *
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   script: {
   *    'assets/filename.min.js': 'path/to/source/file.ts', // write to assets dir
   *    'snippets/js-file.liquid': 'path/to/source/foo.ts' // write as snippet
   *   }
   * }
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   script: {
   *    'assets/[file].min.[ext]': [
   *      'path/to/source/file-1.ts', // outputs assets/file-1.min.js
   *      'path/to/source/file-2.ts', // outputs assets/file-2.min.js
   *    ]
   *   }
   * }
   *
   * // OPTION 3 - Rename with overrides
   * {
   *   script: {
   *    'assets/filename.min.js': {
   *       input: 'path/to/source/file.ts',
   *       splitting: true,
   *       treeShaking: false
   *    }
   *   }
   * }
   *
   * // OPTION 4 - Single config
   * {
   *   script: {
   *     input: 'path/to/source/file.ts',
   *     rename: 'filename.min.js',
   *     esbuild: {}
   *   }
   * }
   *
   * // OPTION 5 - Multiple configs
   * {
   *   script: [
   *    {
   *      input: 'path/to/source/file-1.ts',
   *      rename: 'filename.min.js',
   *      esbuild: {}
   *    },
   *    {
   *      input: 'path/to/source/file-2.ts',
   *      snippet: true
   *    }
   *   ]
   * }
   */
  script?: false | ScriptTransformer
  /**
   * **SVG File Transforms**
   */
  svg?: SVGTransformer;
  /**
   * **JSON File Transforms**
   *
   * Options defined here are used when writing to the file system and
   * uploading `.json` files to themes. When running sync operations that
   * import from remote sources will also use these options, they include:
   *
   * - `--merge`
   * - `--pull`
   * - `--download`
   */
  json?: JSONTransform;
  /**
   * **Liquid File Transforms**
   *
   * Liquid transform options are terse-specific and related to minification operations.
   * Syncify uses HTML Minifier Terser under the hood, it has been configured to work with
   * Liquid files.
   *
   * > **NOTE**
   *
   * > Liquid transforms will only be carried out under the `--prod` or `--terse` flag.
   * > If this option is set to `false` then no minification will be applied to `.liquid`
   * > files.
   */
  liquid?: LiquidTransform;

}
