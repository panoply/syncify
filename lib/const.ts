/**
 * HOT reload snippet filename
 */
export const HOT_SNIPPET_FILE = 'hot.js.liquid';

/**
 * HOT reload snippet filename
 */
export const HOT_SNIPPET_NAME = 'hot.js';

/**
 * Log Snipper frames
 */
export const SPINNER_FRAMES = [
  '⠋',
  '⠙',
  '⠹',
  '⠸',
  '⠼',
  '⠴',
  '⠦',
  '⠧',
  '⠇',
  '⠏'
];

/**
 * Syncify configuration files
 */
export const CONFIG_FILES = [
  'syncify.config.js',
  'syncify.config.mjs',
  'syncify.config.cjs',
  'syncify.config.ts',
  'syncify.config.json'
];

/**
 * Syncify cache directories
 */
export const CACHE_DIRS = [
  'style',
  'script',
  'svg',
  'metafields',
  'pages',
  'sections',
  'redirects',
  'vscode'
];

/**
 * Syncify base directory defaults
 */
export const BASE_DIRS = [
  [ 'input', 'source' ],
  [ 'output', 'theme' ],
  [ 'export', 'export' ],
  [ 'import', 'import' ],
  [ 'config', '.' ]
];

/**
 * Syncify path Keys
 */
export const PATH_KEYS = [
  'assets',
  'config',
  'layout',
  'customers',
  'locales',
  'sections',
  'snippets',
  'templates',
  'metafields',
  'pages',
  'redirects'
];

/**
 * Shopify theme directories
 */
export const THEME_DIRS = [
  'templates',
  'templates/customers',
  'assets',
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
 * Error message when esbuild is not installed
 */
export const ESBUILD_NOT_INSTALLED = [
  'You cannot use script minification without esbuild installed',
  'and configured as a processor. Install esbuild and configure Syncify',
  'to apply transforms to leverage script minification.'
];

/**
 * Bundle Require related constant
 */
export const DIRNAME_VAR_NAME = '__injected_dirname__';

/**
 * Bundle Require related constant
 */
export const FILENAME_VAR_NAME = '__injected_filename__';

/**
 * Bundle Require related constant
 */
export const IMPORT_META_URL_VAR_NAME = '__injected_import_meta_url__';

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
 * Shopify response regex capture
 */
export const REGEX_STRING = /(\/)(.*?)(\/)/g;

/**
 * Shopify Request Error response information
 */
export const SHOPIFY_REQUEST_ERRORS = {
  /**
   * 404 ERROR
   */
  404: 'The requested resource was not found.',
  /**
   * 400 ERROR
   */
  400: 'The request was not understood by the server, generally due to bad syntax or because the Content-Type header was not correctly set to application / json. This status is also returned when the request provides an invalid code parameter during the OAuth token exchange process.',
  /**
   * 303 ERROR
   */
  303: 'The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource.',
  /**
   * 401 ERROR
   */
  401: 'The necessary authentication credentials are not present in the request or are incorrect',
  /**
   * 402 ERROR
   */
  402: 'The requested shop is currently frozen. The shop owner needs to log in to the shop\'s admin, and pay the outstanding balance to unfreeze the shop.',
  /**
   * 406 ERROR
   */
  406: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.',
  /**
   * 423 ERROR
   */
  423: 'The requested shop is currently locked. Shops are locked if they repeatedly exceed their API request limit. or if there is an issue with the account, such as a detected compromise or fraud risk.',
  /**
   * 403 ERROR
   */
  403: 'The server is refusing to respond to the request. This is generally because you have not requested the appropriate scope for this action.',
  /**
   * 501 ERROR
   */
  501: 'The requested endpoint is not available on that particular shop, e.g. requesting access to a Shopify Plus–only API on a non-Plus shop. This response may also indicate that this endpoint is reserved for future use.',
  /**
   * 503 ERROR
   */
  503: 'The server is currently unavailable. Check the Shopify status page for reported service outages. See https://www.shopifystatus.com'
};
