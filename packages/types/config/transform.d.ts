import type { JSONTransform } from './json';
import type { LiquidTransform } from './liquid';
import type { ScriptTransformer } from './script';
import type { StyleTransformer } from './style';
import type { SVGTransformer } from './svg';

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

export type Transforms = {
  /**
   * **Style File transforms**
   *
   * Style transformations perform CSS processing. Syncify supports various cascades,
   * including SASS, Tailwind and PostCSS.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/style/)
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
   * [Syncify Documentation](https://syncify.sh/options/transform/script/)
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
   *
   * Inline SVG files and Sprites generation. Uses SVGO under the hood
   * and can export as assets (or snippets).
   *
   *  [Syncify Documentation](https://syncify.sh/options/transform/svg/)
   */
  svg?: SVGTransformer;
  /**
   * **JSON File Transforms**
   *
   * Options defined here are used when writing to the file system and
   * uploading `.json` files to themes. When running `sy pull` or operations
   * that import from online stores, configuration defined here will be respected.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/json/)
   */
  json?: JSONTransform;
  /**
   * **Liquid File Transforms**
   *
   * Liquid transform options are terse-specific and related to minification operations.
   * Syncify uses HTML Minifier Terser under the hood, it has been configured to work with
   * Liquid files.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/liquid/)
   *
   * > **NOTE**
   *
   * > Liquid transforms will only be carried out under the `--prod` or `--terse` flag.
   * > If this option is set to `false` then no minification will be applied to `.liquid` files.
   */
  liquid?: LiquidTransform;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * **Markdown File Transforms**
   *
   * Supported markdown transforms accepted for resource specific operations.
   */
  markdown?: SVGTransformer;

}
