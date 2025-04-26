import { basename, dirname, extname, join, normalize, resolve, sep } from 'node:path';

import { COL, yellowBright } from '@syncify/ansi';

import { throws } from '~cli/throws';
import { REGEX_BASE_PATH, REGEX_PATH_ESC } from '~const';
import { isArray } from '~utils';

/**
 * Generate File Path
 */
export function fileUrl (filePath: string) {

  let path: string;

  path = resolve(filePath);
  path = path.replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash.
  if (path[0] !== '/') path = `/${path}`;

  // Escape required characters for path components.
  // See: https://tools.ietf.org/html/rfc3986#section-3.3
  return encodeURI(`file://${path}`).replace(/[?#]/g, encodeURIComponent);

}

/**
 * Glob Path
 *
 * Returns the path/s containing globs patterns,
 * filtering out paths which point to a file.
 */
export function globPath <T extends string | string[]> (path: T): T {

  return isArray(path) ? path.filter(uri => /\*/.test(uri)) as T : /\*/.test(path) ? path : null;

}

/**
 * Last Path
 *
* Returns the last directory name in a URI path, excluding the file name if present.
 * If the path contains no slashes, returns the input string.
 * Handles single paths or arrays of paths, cross-platform separators, and edge cases.
 *
 * @example
 * lastPath('/some/path/to/file.ext') => 'to'
 * lastPath('/some/path/foo/bar/baz') => 'baz'
 * lastPath('file.txt') => 'file.txt'
 * lastPath('/path/to/dir/') => 'dir'
 */
export function lastPath (path: string | string[]) {

  // Handle array input
  if (isArray(path)) return path.map(lastPath);

  // Remove trailing separator if present
  const cleanPath = path.endsWith(sep) ? path.slice(0, -1) : path;

  // Split path using OS-specific separator
  const parts = cleanPath.split(sep);

  // Handle single component or empty path
  if (parts.length <= 1) return parts[0] || '';

  // Check if the last component is a file (has an extension)
  const lastComponent = parts[parts.length - 1];
  const hasExtension = extname(lastComponent) !== '';

  return hasExtension ? parts[parts.length - 2] : lastComponent;

}

/**
 * Parent Path
 *
 * Will return the parent path of a URL, ie: that of which
 * omits the file name. Omits any glob patterns.
 *
 * @example
 *
 * // File name is excluded
 * '/some/path/to/file.ext' => '/some/path/to'
 *
 * // last directory name
 * '/some/path/foo/bar/baz' => '/some/path/foo/bar'
 */
export function parentPath (path: string | string[]) {

  if (isArray(path)) return path.map(parentPath);

  // Remove trailing separator if present
  const cleanPath = path.endsWith(sep) ? path.slice(0, -1) : path;

  // Check for glob pattern
  const globIndex = cleanPath.indexOf('*');

  if (globIndex !== -1) {
    // Truncate at glob, then get parent directory
    const before = cleanPath.slice(0, globIndex);
    return before.includes(sep) ? dirname(before) : '';
  }

  // No glob: return parent directory
  return dirname(cleanPath);

};

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * that accepts a string or array of strings. Paths will include
 * the directory `input` folder name.
 *
 * When passing a `cwd` then input path will check `startsWith`
 * this is used in transform paths to ensure correct resolution
 *
 * @example
 *
 * // basic usage
 * normalPath('input')('/some/path') => 'input/some/path'
 *
 * // handles input repeats
 * normalPath('input')('/some/path/input') => 'input/some/path'
 *
 * // handles ignores
 * normalPath('input')('!ignore') => '!input/ignore'
 */
export function normalPath (uri: string, cwd = null) {

  // Create regexes once, using hardcoded '/' to match original
  const input = uri.replace(REGEX_PATH_ESC, '\\$&');
  const regex = new RegExp(`^\\.?\\/?${input}\\/`);
  const source = new RegExp(`^\\.?\\/?${basename(input)}\\/`);

  return function prepend <T extends string | string[]> (path: any): T {

    if (isArray(path)) return <T>path.map(prepend);

    // Handle ignore prefix
    const ignore = path.startsWith('!');
    if (ignore) path = path.slice(1);

    // If path starts with input/, return unchanged (with ignore prefix)
    if (regex.test(path)) return <T>(ignore ? '!' + path : path);

    // Reject paths starting with '../'
    if (path.startsWith('../')) {
      throws(`Invalid path defined at${COL} ${yellowBright(`"${path}"`)}`, [
        'Paths must be relative to the input directory'
      ]);
    }

    if (cwd !== null) {
      const exists = join(cwd, path);
      return <T>((ignore ? '!' : '') + (exists.startsWith(input) ? exists : join(input, path)));
    }

    // Remove basename(input)/ prefix if present, then prepend input
    return <T>((ignore ? '!' : '') + join(input, source.test(path) ? path.replace(source, NIL) : path));
  };
}

/**
 * Base Paths
 *
 * Normalizes base directory paths, handling any malformed or invalid base references.
 * Returns the uri appended with forward slash.
 *
 * @example
 *
 * // current work directory prepends
 * basePath('User/name/etc')('some/path') => '/User/name/etc/some/path/'
 *
 * // root directory
 * basePath('User/name/etc')('.') => '/User/name/etc/'
 */
export function basePath (cwd: string) {

  // Normalize cwd to remove redundant separators
  const normalizedCwd = normalize(cwd);

  /**
   * Normalizes the path by prepending cwd and ensuring a trailing separator.
   */
  return function prepend (path: string) {

    // Reject glob patterns
    if (path.includes('*')) {
      throws(`Base directory path cannot contain glob${COL} ${yellowBright(`"${path}"`)}`, [
        'Ensure that path you are resolving is correctly formed'
      ]);
    }

    // Handle root paths ('.' or '/')
    if (path === '.' || path === '/') return normalizedCwd + sep;

    // Handle paths starting with './' or '/'
    const cleanPath = path.startsWith('./') || path.startsWith('/') ? path.slice(1) : path;

    // Validate path: must be a single directory name (no separators, no relative paths, no colons)
    if (REGEX_BASE_PATH.test(cleanPath)) {
      throws(`Invalid directory path${COL} ${yellowBright(`"${path}"`)}`, [
        'Path must be a single directory name without subdirectories or special characters.'
      ]);
    }

    // Join cwd and path, normalize, and ensure trailing separator
    const result = join(normalizedCwd, cleanPath);

    return result.endsWith(sep) ? result : result + sep;

  };
}
