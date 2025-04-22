/**
 * String or Array of strings
 */
export type Path = string | string[];

/**
 * Root Paths
 */
export type Roots = {
  /**
   * Root path for assets
   */
  assets?: string;
  /**
   * Root path for snippets
   */
  snippets?: string;
  /**
   * Root path for sections
   */
  sections?: string;
  /**
   * Root path for sections groups
   */
  groups?: string;
  /**
   * Root path for blocks
   */
  blocks?: string;
  /**
   * Root path for metaobject templates
   */
  metaobject?: string;
  /**
   * Root path for templates
   */
  templates?: string;
  /**
   * Root path for customers
   */
  customers?: string;
  /**
   * Root path for layouts
   */
  layout?: string;
  /**
   * Root path for config
   */
  config?: string;
  /**
   * Root path for locations
   */
  locales?: string;
}

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
   *    '[name]': [
   *      './sections/**'   // all other sections will use source name
   *    ],
   *   },
   *   snippets: {
   *    '[dir]-[name]': [
   *      'snippets/foo/*', // snippets in this directory will prefix foo-
   *      'snippets/bar/*' // snippets in this directory will prefix bar-
   *    ],
   *    '[name]': [
   *      './snippets/**',  // all other snippets will use source name
   *    ]
   *   }
   * }
   */
  '*'?: Path;
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
  '[name]'?: Path;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout-header.liquid'
   */
  '[dir]-[name]'?: Path;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout_header.liquid'
   */
  '[dir]_[name]'?: Path;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header-layout.liquid'
   */
  '[name]-[dir]'?: Path;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header_layout.liquid'
   */
  '[name]_[dir]'?: Path;
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
  '[name].[dir]'?: Path;
  /**
   * Prefix directory and suffix filename with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'layout.header.liquid'
   */
  '[dir].[name]'?: Path;
}

export type Paths = {
  /**
   * Root path defintions represent write locations in projects with custom structures and
   * complex path Paths.
   *
   * This is optional, it is only required if custom structures cannot resolve due to advanced
   * glob uri's. IN most cases, you can omit this, Syncify will complain and inform when it is
   * required.
   *
   * @example
   * {
   *   roots: {
   *    assets: 'source/assets/import',
   *    snippets: 'source/snippets/import',
   *    sections: 'source/sections/import',
   *    blocks: 'source/blocks/import',
   *    templates: 'source/templates',
   *    customers: 'source/templates/customers',
   *    layout: 'source/layout',
   *    config: 'source/config',
   *    locales: 'source/locales'
   *   }
   * }
   */
  roots?: Roots;
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
  snippets?: Path | RenameSnippets
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
  sections?: Path | Rename;
  /**
   * A glob string or glob array of files to be uploaded as blocks
   *
   * @default 'source/blocks/*.{liquid}'
   */
  blocks?: Path;
  /**
   * A glob string or glob array of files to be uploaded as templates.
   *
   * @default 'source/templates/*.{liquid,json}'
   */
  templates?: Path;
  /**
   * A glob string or glob array of files to be uploaded asas metaobject templates
   *
   * @default 'source/templates/metaobject/*.{liquid,json}'
   */
  metaobject?: Path;
  /**
   * A glob string or glob array of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers/*.{liquid,json}'
   */
  customers?: Path;
  /**
   * A glob string or glob array of files to be uploaded as assets
   *
   * @default 'source/assets/*'
   */
  assets?: Path;
  /**
   * A glob string or glob array of files to be uploaded as layouts
   *
   * @default 'source/layout/*.liquid'
   */
  layout?: Path;
  /**
   * A glob string or glob array of files to be uploaded as configs, i.e, `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: Path;
  /**
   * A glob string or glob array of files to be uploaded as config, i.e, `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: Path;
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
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * A glob string or glob array string to be uploaded, published and controlled as `pages`
   *
   * @default 'source/+/pages/*.{md,html}'
   */
  pages?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/blogs/*'
   */
  blogs?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/menus/*.json'
   */
  navigation?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/policies/*.{html,md}'
   */
  policies?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/files/**'
   */
  files?: Path;
}
