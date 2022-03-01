/**
 * Style Transformer
 *
 * Use within a `syncify.config.js` file to compile SASS
 * or process CSS with PostCSS.
 *
 * > Requires [PostCSS](https://postcss.org/) and [SASS Dart](https://sass-lang.com/dart-sass)
 */
export function style (options?: Array<{
  input?: string | string[];
  snippet?: boolean;
  watch?: string[]
  postcss?: boolean;
  include?: string[];
  sass?: {
    sourcemap?: boolean;
    style?: 'expanded' | 'compressed';
    warnings?: boolean;
  };
}>) {

  return {
    options
  };
}

/**
 * JSON Transformer
 *
 * Use within a `syncify.config.js` file to customise JSON
 * language transforms.
 */
export function json (options?: {
  spaces?: number;
  exclude?: string[];
}) {

  return {
    options
  };

}

/**
 * Sections Transformer
 *
 * Use within a `syncify.config.js` file to customize liquid
 * theme sections, like structure grouping and output path transforms.
 */
export function sections (options?: {
  prefix: boolean;
  prefixSeparator: string;
  duplicatesOnly: boolean;
  globals: string[];
}) {

  return {
    options
  };

}

/**
 * Markdown Transformer (experimental)
 *
 * Use within a `syncify.config.js` file to enable
 * markdown `.md` file support for Page content sync.
 *
 * > Store Pages only accept static HTML. Options are
 * passed to the [Marked](https://marked.js.org/) parser.
 */
export function markdown (options?: {
  breaks?: boolean;
  baseUrl?: string;
  headerIds?: boolean;
  headerPrefix?: string;
  mangle?: boolean;
  silent?: boolean;
  smartypants?: boolean;
}) {

  return {
    options
  };

}

/**
 * Icon Transformer
 *
 * Use within a `syncify.config.js` file to generate SVG
 * icon sprites or inlined SVG snippets.
 *
 * > Requires [SVGO](https://github.com/svg/svgo)
 */
export function icons (options?: {
  snippets?: [];
  sprites?: Array<{
    input: string | string[];
    output: string;
    options?: {
      dimensionAttributes?: boolean;
      namespaceClassnames?: boolean;
      namespaceIDS?: boolean;
      rootAttributes?: {
        [prop: string]: string
      }
    }
  }>;
}) {

  return {
    options
  };

}
