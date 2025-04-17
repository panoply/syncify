import type { Cache, PathsBundle, PathsPlus } from 'types';

/**
 * The packaged distribution path to syncify
 */
export const DIST_PATH = '@syncify/cli/dist/';

/**
 * Sets file permissions when creating or writing
 *
 * **Grants**
 *
 * - Owner: Read, write, and execute permissions.
 * - Group: Read and execute permissions
 * - Others: Read and execute permissions
*/
export const READ_WRITE_OWNER = 0o755;

/**
 * Number of milliseconds in a day.
 */
export const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * The snippet filename
 *
 * @example
* 'hot.js.liquid'
*/
export const HOT_SNIPPET = 'hot.js.liquid';

/**
 * The source snippet name written to the global store cache
 *
 * @example
 * 'hot-snippet'
 *
 * // Users/sissel/.syncify/eb4e712f2f3970b7/hot-snippet
 */
export const HOT_SOURCE = 'hot-snippet';

/**
 * The snippet key of HOT Snippet
 *
 * @example
 * 'snippets/hot.js.liquid'
 */
export const HOT_SNIPPET_KEY = 'snippets/hot.js.liquid';

/**
 * JS/TS Config files - e.g, `tsconfig.json` and `jsconfig.json`
 */
export const JS_TS_CONFIGS = [
  'tsconfig.json',
  'jsconfig.json'
];

/**
 * Command line mode names to be intercepted - These are triggers in the `argv`
 *
 * **Example**
 *
 * - `sy setup`
 * - `sy create`
 * - `sy publish`
 */
export const COMMAND_MODES = new Set([
  'init',
  'create',
  'build',
  'watch',
  'pack',
  'push',
  'pull',
  'publish',
  'version',
  'keychain',
  'projects',
  'link',
  'git',
  'help',
  'prune',
  'doctor',
  'inspect'
]);

/**
 * Websocket topics used in HOT Reloading
 */
export const HOT_SOCKET_TOPICS = [
  'alias',
  'script',
  'stylesheet',
  'section',
  'svg',
  'assets',
  'reload',
  'replace',
  'connect',
  'disconnect',
  'connected'
];

/**
 * Syncify configuration file types
 */
export const SYNCIFY_CONFIG = [
  'syncify.config.ts',
  'syncify.config.js',
  'syncify.config.mjs',
  'syncify.config.cjs',
  'syncify.config.json'
];

/**
 * Syncify target files
 */
export const TARGET_FILES = [
  'stores.toml',
  'stores.yaml',
  'stores.yml'
];

/**
 * Syncify cache file names and storage keys
 *
 * @example
 * // REPRESENTS THESE ENTRIES
 * //
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/checksum'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/metafields'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/pages'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/paths'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/schema'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/sections'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/settings'
 * 'Users/sissel/.syncify/eb4e712f2f3970b7/templates'
 */
export const CACHE_FILES: Array<Cache.Keys> = [
  'checksum',
  'metafields',
  'pages',
  'paths',
  'schema',
  'sections',
  'settings',
  'templates'
];

/**
 * Syncify base directory defaults
 */
export const BASE_DIRS: [ 'input' | 'output' | 'config', string ][] = [
  [ 'input', 'source' ],
  [ 'output', 'theme' ],
  [ 'config', '.' ]
];

/**
 * Directories which obtain files that can be changed by theme customizer
 */
export const PULL_ALIGN = [
  'config',
  'locales',
  'templates',
  'templates/customers',
  'templates/metaobject',
  'sections'
] as const;

/**
 * Syncify Plus Paths for extended features
 */
export const PATH_PLUS_KEYS: Array<keyof PathsPlus> = [
  'blogs',
  'files',
  'metafields',
  'navigation',
  'pages',
  'policies',
  'schema'
] as const;

export const PATH_THEME_KEYS = [
  'assets',
  'config',
  'layout',
  'customers',
  'locales',
  'sections',
  'blocks',
  'snippets',
  'templates',
  'metaobject'
] as const;

/**
 * Syncify path Keys as per the `syncify.config` > `paths`
 */
export const PATH_KEYS: Array<keyof PathsBundle> = [
  ...PATH_THEME_KEYS,
  ...PATH_PLUS_KEYS
];

/**
 * Syncify theme path keys - Represents official representation of theme directory
 */
export const THEME_KEYS = [
  'assets',
  'config',
  'layout',
  'customers',
  'locales',
  'sections',
  'blocks',
  'snippets',
  'templates',
  'metaobject'
] as const;

/**
 * Theme **build** groups
 */
export const BUILD_GROUPS = [
  'styles',
  'scripts',
  'svgs',
  'sections',
  'layouts',
  'blocks',
  'metaobject',
  'templates',
  'snippets',
  'locales',
  'configs',
  'schema',
  'pages',
  'metafields',
  'assets'
];

/**
 * Shopify theme directories - Represents a correct theme structure
 */
export const THEME_DIRS = [
  'templates',
  'templates/customers',
  'templates/metaobject',
  'assets',
  'blocks',
  'config',
  'layout',
  'locales',
  'sections',
  'snippets'
];

/**
 * Configuration file extensions
 */
export const CONFIG_FILE_EXT = [
  'js',
  'cjs',
  'mjs',
  'ts'
];

/**
 * Transform Units
 */
export const UNITS = [
  'b',
  'kb',
  'mb',
  'gb',
  'tb'
];

/**
 * Set of starting point strap themes within https://github.com/SyncifyStraps
 */
export const STRAP_THEMES: [
  repoName: string,
  desciption: string,
  unavailable?: boolean
][] = [
  [ 'dusk', '    Stripped down skeleton theme structure' ],
  [ 'dawn', '    The official Shopify slop using Syncify' ],
  [ 'silk', '    Advanced Hybrid with SPX and mithril.js', true ],
  [ 'hexx', '    Intermediate starting point with basics', true ]
];

/**
 * Set of starting point strap examples within https://github.com/SyncifyStraps
 */
export const STRAP_EXAMPLES: [
  repoName: string,
  description: string,
  available?: boolean
][] = [
  [ 'using-paths', '       Strap with paths usage' ],
  [ 'using-rename', '      Strap with rename usage' ],
  [ 'using-sass', '        Strap with sass transform' ],
  [ 'using-schema', '      Strap using Shared Schema' ],
  [ 'using-tailwind', '    Strap using Tailwind transform' ],
  [ 'using-typescript', '  Strap using TypeScript transform' ]
];

/**
 * Time ago reference
 */
export const TIME = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

/**
 * Regex HOT Snippet
 */
export const REGEX_HOT_SNIPPET = /{%-?\s*render\s*['"]hot\.js['"]\s*-?%}/;

/**
 * Log error validations for or type characters
 */
export const REGEX_OR_CHARS = /([|,])/g;

/**
 * Bundle Require esbuild extension validation
 */
export const REGEX_EXTJS = /\.(mjs|cjs|ts|js|tsx|jsx)$/;

/**
 * Shopify response line number
 */
export const REGEX_LINE_NO = /(\()(line\s[0-9]+)(\))(:)/g;

/**
 * Shopify response quoted words
 */
export const REGEX_QUOTES = /('[\w\s.-]*?'|"[\w\s.-]*?")/g;

/**
 * Shopify response object tag
 */
export const REGEX_OBJECT = /({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g;

/**
 * Shopify response URI/URL address
 */
export const REGEX_ADDRESS = /((?:www|http:|https:)+[^\s]+[\w])/g;

/**
 * Shopify Filename exists error
 */
export const REGEX_FILENAME = /(?<=Filename\s)([\w._-]+)(?=\salready)/;

/**
 * Shopify response regex capture
 */
export const REGEX_STRING = /(\/)(.*?)(\/)/g;

/**
 * Shopify Request Error response information
 */
export const SHOPIFY_GQL_ERROR_CODES = {
  FILE_READ: {
    BAD_REQUEST: 'Operation was malformed or invalid.',
    CONFLICT: 'Operation faced a conflict with the current state of the file.',
    ERROR: 'Operation encountered an error.',
    NOT_FOUND: 'Operation file could not be found.',
    SUCCESS: 'Operation was successful.',
    TIMEOUT: 'Operation timed out.',
    UNPROCESSABLE_ENTITY: 'Operation could not be processed due to issues with input data.'
  },
  UPSERT: {
    ACCESS_DENIED: 'Access denied.',
    DUPLICATE_FILE_INPUT: 'There are files with the same filename.',
    ERROR: 'Error.',
    FILE_VALIDATION_ERROR: 'The file is invalid.',
    LESS_THAN_OR_EQUAL_TO: 'The input value should be less than or equal to the maximum value allowed.',
    NOT_FOUND: 'The record with the ID used as the input value couldn\'t be found.',
    THEME_FILES_CONFLICT: 'There are theme files with conflicts.',
    THEME_LIMITED_PLAN: 'This action is not available on your current plan. Please upgrade to access theme editing features.'
  },
  THEME_PUBLISH: {
    CANNOT_PUBLISH_THEME_DURING_INSTALL: 'Theme publishing is not available during install.',
    NOT_FOUND: 'The record with the ID used as the input value couldn\'t be found.'
  }
};
