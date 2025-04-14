import type { Config as SVGOConfig } from 'svgo';
import type { LiteralUnion } from 'type-fest';

/* -------------------------------------------- */
/* PROCESSOR CONFIGS                            */
/* -------------------------------------------- */

export { SVGOConfig };

/* -------------------------------------------- */
/* SHARED                                       */
/* -------------------------------------------- */

type RenamePaths = `${'assets' | 'snippets'}/${string}`

export type SVGFile = {
  /**
   * SVG input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default ''
   */
  input: string | string[];
  /**
   * The SVG export format. Syncify can produce 2 different SVG formats.
   * All SVG file types will pre-process and transform using [SVGO](https://github.com/svg/svgo).
   * This option cannot be undefined and is required.
   *
   * ---
   *
   * > `file`
   * >
   * > SVG transforms using a `file` format will produce individual `.svg` files from
   * that can be output as an`asset` or inlined into a `snippet`
   *
   * > `sprite`
   * >
   * > SVG transforms using a `sprite` format will produce an SVG Sprite that can be
   * output as an `asset` or inlined into a `snippet`
   */
  format: 'file';
  /**
   * Rename the svg file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   * ---
   *
   * @default undefined
   *
   * @example
   * 'source/svgs/arrow.svg' > 'arrow.svg' // if snippet is false
   * 'source/svgs/checkmark.svg' > 'checkmark.liquid' // if snippet is true
   */
  rename?: string;
  /**
   * Whether to generate svg as snippet or asset. When `true` the
   * svg source will be written as a snippet
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * [SVGO](https://github.com/svg/svgo) Override
   *
   * SVG File transforms will use the options provided to `processor.svgo`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.svgo`.
   *
   * @default
   * processor.svgo // When processor configuration is defined
   */
  svgo?: SVGOConfig;
}

export type SVGSprite = Omit<SVGFile, 'format'> & {
  /**
   * The SVG export format. Syncify can produce 2 different SVG formats.
   * All SVG file types will pre-process and transform using [SVGO](https://github.com/svg/svgo).
   * This option cannot be undefined and is required.
   *
   * ---
   *
   * > `file`
   * >
   * > SVG transforms using a `file` format will produce individual `.svg` files from
   * that can be output as an`asset` or inlined into a `snippet`
   *
   * > `sprite`
   * >
   * > SVG transforms using a `sprite` format will produce an SVG Sprite that can be
   * output as an `asset` or inlined into a `snippet`
   */
  format: 'sprite';
  /**
   * Add a DOCTYPE declaration to SVG documents
   *
   * @type {boolean}
   */
  sprite?: {
    /**
     * Apply a custome set of sprite attributes on the
     * parent `<svg>` element containing the `<symbol>` reference.
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
     * <svg
     *  id="foo"
     *  data-attr="bar"
     *  {{ object.prop }}
     *  {% if xxx %}data-xxx{% endif %}>
     *    <symbol id="a">....</symbol>
     *    <symbol id="b">....</symbol>
     *    <symbol id="c">....</symbol>
     * </svg>
     * ```
     *
     * // Output
     * @default []
     */
    attrs?: Array<string[]>;
    /**
     * Additional optional to be applied on containing `<symbol>`
     * elements in the sprite.
     */
    symbols?: {
      /**
       * The identifier applied to `<symbol>` elements. This
       * value will be the `<use>` referenced via `xlink:href`.
       * By default, Syncify prefixes `svg-` followed by SVG filename.
       *
       * > `[id]`
       * >
       * > Passing a value of `[id]` will instruct syncify to use the `id=""` value
       * > already applied and when missing fallback to the default `svg-`
       *
       *
       * **Example**
       *
       * ```liquid
       * <!-- REFERENCING -->
       * <svg><use xlink:href="#svg-a"></use></svg>
       * <svg><use xlink:href="#svg-b"></use></svg>
       * <svg><use xlink:href="#svg-c"></use></svg>
       *
       * <!-- EXAMPLE SPRITE -->
       * <svg>
       *  <symbol id="a">...</symbol>
       *  <symbol id="b">...</symbol>
       *  <symbol id="c">...</symbol>
       * </svg>
       * ```
       */
      id?: LiteralUnion<`${string}-[name]` | `[name]-${string}` | '[id]', string>;
      /**
       * Whether or not containing `<symbol>` elements should be annotated
       * with `xmlns` attributes. Defaults to `false`.
       *
       * **Example Output**
       *
       * ```liquid
       * <svg>
       *  <symbol id="a" xmlns="http://www.w3.org/2000/svg">...</symbol>
       *  <symbol id="b" xmlns="http://www.w3.org/2000/svg">...</symbol>
       *  <symbol id="c" xmlns="http://www.w3.org/2000/svg">...</symbol>
       * </svg>
       * ```
       *
       * @default false
       */
      xmlns?: boolean;
    }
  }
}

export type SVGTransform = SVGFile | SVGSprite

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

export type SVGTransformer = (
  | string
  | string[]
  | SVGTransform
  | SVGTransform[]
  | Record<RenamePaths, string>
  | Record<RenamePaths, string[]>
  | Record<RenamePaths, SVGTransform>
)
