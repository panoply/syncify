import type { LiteralUnion } from 'type-fest';

export interface StashIndex {
 /**
   * If there are multiple glob paths defined, and you'd like to cherry-pick
   * a specific entry, provide its index here.
   *
   * @default 0
   */
  index?: number;
  /**
   * Set a stash import location for remote `pull` operations. Files which cannot
   * be mapped to existing local path relative to your `input` will be written to
   * a provided stash destination.
   *
   * When no stash reference is defined, Syncify will determine output
   * location based on the path resolutions.
   *
   * > `*`
   * >
   * > asterisk value signals for stashes to be written within directory at index `0`
   *
   * > `number`
   * >
   * > number value will default to `*` and write within directories at that index.
   *
   * > `true`
   * >
   * > boolean `true` value signals for stashed to be written in `stash/` directory at index `0`
   *
   * ---
   *
   * You can optionally provide a sub-directory path.
   *
   */
  stash: LiteralUnion<'*', string> | true | number;
}

export interface StashWithIndex extends StashIndex {
  /**
   * If there are multiple glob paths defined, and you'd like to cherry-pick
   * a specific entry, provide its index here.
   *
   * @default 0
   */
  index?: number;
}

export type CustomStash = StashIndex | StashWithIndex
export type PathsGlob = string | string[];
export type PathsStash = [ ...globs: string[], stash: CustomStash ]
export type PathsType = PathsGlob | PathsStash;

/**
 * Section and Snippet Rename Paths
 */
export interface RenamePaths<T = PathsType> {
  /**
   * Uses the filename as per the source, idenitical behaviour as that of `[name]`.
   *
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *      'sections/bar/*' // sections in this directory will prefix bar-
   *    ],
   *    '*': [
   *      './sections/**',   // all other sections will use source name
   *      { stash: 'files' } // stashes imports within sections/files
   *    ],
   *   },
   *   snippets: {
   *    '[dir]-[name]': [
   *      'snippets/foo/*', // snippets in this directory will prefix foo-
   *      'snippets/bar/*' // snippets in this directory will prefix bar-
   *    ],
   *    '*': [
   *      './snippets/**',  // all other snippets will use source name
   *      { stash: true }   // stashes will be written
   *    ]
   *   }
   * }
   */
  '*'?: T;
  /**
   * Use the filename as per the source. Passing `[name]` only will result in fallback
   * behaviour, as that of `'*'`.
   *
   * @example
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *    ],
   *    'xxx-[name]': [
   *      'sections/bar/*', // sections in this directory will prefix xxx-
   *    ],
   *    '[name]': [
   *      './sections/**'  // all other sections will use source filename
   *    ]
   *   },
   *   snippets: {
   *    '[dir]-[name]': [
   *      'snippets/foo/*', // snippets in this directory will prefix foo-
   *    ],
   *    'xxx-[name]': [
   *      'snippets/bar/*', // snippets in this directory will prefix xxx-
   *    ],
   *    '[name]': [
   *      './snippets/**'  // all other sections will use source filename
   *    ]
   *   }
   * }
   */
  '[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout-header.liquid'
   */
  '[dir]-[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout_header.liquid'
   */
  '[dir]_[name]'?: T;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header-layout.liquid'
   */
  '[name]-[dir]'?: T;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header_layout.liquid'
   */
  '[name]_[dir]'?: T;
}

export interface RenameSnippets<T = PathsType> {
  /**
   * Prefix filename and suffix directory with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'header.layout.liquid'
   */
  '[name].[dir]'?: T;
  /**
   * Prefix directory and suffix filename with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'layout.header.liquid'
   */
  '[dir].[name]'?: T;
}

export interface Paths<T = PathsType> {
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as snippets.
   *
   * @default 'source/snippets/*.{liquid}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   snippets: 'source/snippets/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   snippets: [
   *    'source/snippets/*.liquid',
   *    'source/snippets/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object
   * {
   *   snippets: {
   *    // Output will be: snippets/foo.bar.liquid
   *    '[dir].[name]': 'source/snippets/foo/bar.liquid',
   *    // Output will be: snippets/quz-baz.liquid
   *    '[name]-[dir]': 'source/snippets/baz/qux.liquid'
   *   }
   * }
   *
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   snippets: {
   *    // Output will be: snippets/foo.bar.liquid
   *    // Output will be: snippets/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/snippets/foo/bar.liquid',
   *       'source/snippets/baz/qux.liquid'
   *    ]
   *   }
   * }
   */
  snippets?: T | Record<string, T> | RenamePaths<T>;
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as sections.
   *
   * > **NOTE**
   * > This path reference will also sync section group files.
   *
   * @default 'source/sections/*.{liquid,json}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   sections: 'source/sections/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   sections: [
   *    'source/sections/*.liquid',
   *    'source/sections/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object Glob
   * {
   *   sections: {
   *    // Output will be: sections/foo.bar.liquid
   *    '[dir].[name]': 'source/sections/foo/bar.liquid',
   *    // Output will be: sections/quz-baz.liquid
   *    '[name]-[dir]': 'source/sections/baz/qux.liquid'
   *   }
   * }
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   sections: {
   *    // Output will be: sections/foo.bar.liquid
   *    // Output will be: sections/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/sections/foo/bar.liquid',
   *       'source/sections/baz/qux.liquid'
   *    ]
   *   }
   * }
   *
   * //OPTION 5 - Define a custom stash
   * {
   *   sections: [
   *    'source/sections/*.liquid',
   *    'source/sections/xxx/*',
   *    { stash: '*' }  // pull stashes will write to source/sections/*
   *   ]
   * }
   */
  sections?: T | Record<string, T> | RenamePaths<T>;
  /**
   * A glob string or glob array of files to be uploaded as blocks
   *
   * @default 'source/blocks/*.{liquid}'
   */
  blocks?: T;
  /**
   * A glob string or glob array of files to be uploaded as templates.
   *
   * @default 'source/templates/*.{liquid,json}'
   */
  templates?: T;
  /**
   * A glob string or glob array of files to be uploaded asas metaobject templates
   *
   * @default 'source/templates/metaobject/*.{liquid,json}'
   */
  metaobject?: T;
  /**
   * A glob string or glob array of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers/*.{liquid,json}'
   */
  customers?: T;
  /**
   * A glob string or glob array of files to be uploaded as assets
   *
   * @default 'source/assets/*'
   */
  assets?: T;
  /**
   * A glob string or glob array of files to be uploaded as layouts
   *
   * @default 'source/layout/*.liquid'
   */
  layout?: T;
  /**
   * A glob string or glob array of files to be uploaded as configs, i.e, `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: T;
  /**
   * A glob string or glob array of files to be uploaded as config, i.e, `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: T;
  /**
   * A glob string or glob array of files to be uploaded as **shared schema** `.json` or `.schema` files.
   *
   * @default 'source/schema/*.{json,schema}'
   */
  schema?: PathsGlob;
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields/'
   */
  metafields?: PathsGlob;
  /**
   * A glob string or glob array string to be uploaded, published and controlled as `pages`
   *
   * @default 'source/pages/*.{md,html}'
   */
  pages?: T;
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'redirects.yaml'
   */
  redirects?: `${string}.${'yaml' | 'yml'}`;
}
