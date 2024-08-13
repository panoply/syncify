import { last } from 'rambdax';
import { join, dirname, resolve } from 'pathe';
import { COL } from 'syncify:symbol';
import { yellowBright } from 'syncify:colors';
import { throwError } from 'syncify:log/throws';
import { isArray } from 'syncify:utils';

/**
 * Generate File Path
 */
export default function fileUrl (filePath: string) {

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

  return isArray(path)
    ? path.filter(uri => /\*/.test(uri)) as T
    : /\*/.test(path)
      ? path
      : null;

}

/**
 * Last Path
 *
 * Will return the portion of a URI path. If
 * the path does not not contain forward slashes it
 * returns the passed string.
 *
 * @example
 *
 * // File name is excluded
 * '/some/path/to/file.ext' => 'to'
 *
 * // last directory name
 * '/some/path/foo/bar/baz' => 'baz'
 */
export function lastPath (path: string | string[]) {

  if (isArray(path)) return path.map(lastPath);
  if (path.indexOf('/') === -1) return path;

  const dir = path.endsWith('/') ? dirname(path.slice(0, -1)) : dirname(path);
  const ender = dir.lastIndexOf('/') + 1;

  return dir.slice(ender);
};

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

  const last = path.lastIndexOf('/');

  if (last === -1) return path;

  const glob = path.indexOf('*');

  return glob === -1 ? path.slice(0, last) : path.slice(0, glob);

};

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * who accepts a string or array of strings. Paths will include
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
export function normalPath (input: string, cwd = null) {

  const regex = new RegExp(`^\\.?\\/?${input}\\/`);

  /**
   * Prepends the provided input to the path and
   * returns a correctly formed uri.
   */
  return function prepend (path: string | string[]) {

    if (isArray(path)) return path.map(prepend);

    const ignore = path.charCodeAt(0) === 33;

    if (ignore) path = path.slice(1);
    if (regex.test(path)) return ignore ? '!' + path : path;

    if (path.charCodeAt(0) === 46 && path.charCodeAt(1) === 46 && path.charCodeAt(2) === 47) {
      throwError(
        `Invalid path defined at: ${COL} ${yellowBright(`"${path}"`)}`,
        [ 'Paths must be relative to source' ]
      );
    }

    if (cwd !== null) {
      const exists = join(cwd, path);
      return (ignore ? '!' : '') + (exists.startsWith(input) ? exists : join(input, path));
    } else {
      return (ignore ? '!' : '') + join(input, path);
    }

  };
};

/**
 * Base Paths
 *
 * Normalizes base directory paths, handling any
 * malformed or invalid base references. Returns
 * the uri appended with forward slash.
 *
 * @example
 *
 * // current work directory prepends
 * basePath('User/name/etc')('some/path') => '/User/name/etc/some/path/'
 *
 * // root directory
 * basePath('User/name/etc')('.') => '/User/name/etc/'
 */
export const basePath = (cwd: string) => (path: string) => {

  if (path.indexOf('*') !== -1) {
    throwError(
      `Base directory path cannot contain glob${COL} ${yellowBright(`"${path}"`)}`,
      [ 'Ensure that path you are resolving is correctly formed' ]
    );
  }

  // path directory starts with . character
  if (path.charCodeAt(0) === 46) {

    // path define is root (dot)
    if (path.length === 1) return cwd + '/';

    // path directory next character is not a forward slash
    // for example, ".folder" this will be invalid
    if (path.charCodeAt(1) === 47) {
      path = path.slice(1);
    } else {
      throwError(
        `Directory path is invalid at${COL} ${yellowBright(`"${path}"`)}`,
        [ 'Ensure that path you are resolving is correctly formed' ]
      );
    }

  }

  // path directory starts with / character
  if (path.charCodeAt(0) === 47) {
    if (path.length === 1) {
      return cwd + '/'; // path defined is root (slash)
    } else {
      path = path.slice(1);
    }
  }

  // path directory is valid, eg: path
  // dirs cannot reference sub directorys, eg: path/sub
  if (/^[a-zA-Z0-9_-]+/.test(path)) {
    path = join(cwd, path);
    return last(path).charCodeAt(0) === 47 ? path : path + '/';
  } else {
    throwError(
      `Directory path is invalid at${COL} ${yellowBright(`"${path}"`)}`,
      [ 'Ensure that path you are resolving is correctly formed' ]
    );
  }
};
