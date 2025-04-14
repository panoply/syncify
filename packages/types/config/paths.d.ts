export type StashType = string | number;

/**
 * Stash Reference
 */
export type Stash = {
  /**
   * Set a stash import location for remote `pull` operations. Files which cannot
   * be mapped to an existing project-level path location (relative to your `input`)
   * will be written the provided stash destination defined here.
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
  stash: StashType;
}

/**
 * String or Array of strings
 */
export type Path = string | string[];

/**
 * Union join of accepted Path patterns
 */
export type Pattern = Path | [ ...globs: string[], stash: Stash ];

/**
 * Section and Snippet Rename Paths
 */
export type Rename = {
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
  '*'?: Pattern;
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
  '[name]'?: Pattern;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout-header.liquid'
   */
  '[dir]-[name]'?: Pattern;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout_header.liquid'
   */
  '[dir]_[name]'?: Pattern;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header-layout.liquid'
   */
  '[name]-[dir]'?: Pattern;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header_layout.liquid'
   */
  '[name]_[dir]'?: Pattern;
}

/**
 * Snippet Renames accept `.` separated values
 */
export type RenameSnippets = Rename & {
  /**
   * Prefix filename and suffix directory with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'header.layout.liquid'
   */
  '[name].[dir]'?: Pattern;
  /**
   * Prefix directory and suffix filename with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'layout.header.liquid'
   */
  '[dir].[name]'?: Pattern;
}

export type Paths = {
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
  snippets?: Pattern | RenameSnippets
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
  sections?: Pattern | Rename;
  /**
   * A glob string or glob array of files to be uploaded as blocks
   *
   * @default 'source/blocks/*.{liquid}'
   */
  blocks?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as templates.
   *
   * @default 'source/templates/*.{liquid,json}'
   */
  templates?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded asas metaobject templates
   *
   * @default 'source/templates/metaobject/*.{liquid,json}'
   */
  metaobject?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers/*.{liquid,json}'
   */
  customers?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as assets
   *
   * @default 'source/assets/*'
   */
  assets?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as layouts
   *
   * @default 'source/layout/*.liquid'
   */
  layout?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as configs, i.e, `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as config, i.e, `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: Pattern;
  /**
   * A glob string or glob array of files to be uploaded as **shared schema** `.json` or `.schema` files.
   *
   * @default 'source/+/schema/*.{json,schema}'
   */
  schema?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * ---
   *
   * The resolved `metafields` directory path
   *
   * @default 'source/+/metafields/**'
   */
  metafields?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * A glob string or glob array string to be uploaded, published and controlled as `pages`
   *
   * @default 'source/+/pages/*.{md,html}'
   */
  pages?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * @default 'source/+/blogs/*'
   */
  blogs?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * @default 'source/+/menus/*.json'
   */
  navigation?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * @default 'source/+/policies/*.{html,md}'
   */
  policies?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * @default 'source/+/files/**'
   */
  files?: Path;
}
