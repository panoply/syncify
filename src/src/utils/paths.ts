import { last } from 'rambdax';
import { join } from 'path';
import { is, isArray } from 'shared/native';

/**
 * Last Path
 *
 * Will return the portion of a URI path. If
 * the path does not not contain forward slashes it
 * returns the passed string.
 *
 * @see https://regex101.com/r/lrnhEe/1
 * @example
 *
 * // File name is excluded
 * '/some/path/to/file.ext' => '/to'
 *
 * // last directory name
 * '/some/path/foo/bar/baz' => '/baz'
 */
export const lastPath = (path: string | string[]) => {

  if (isArray(path)) return path.map(lastPath);
  if (is(path.indexOf('/'), -1)) return path;

  const ender = path.lastIndexOf('/');
  const file = path.slice(ender);

  if (!/(?:[/*]{1,}|(\w|[/*]{1,})\.[a-z]+)$/.test(file)) return file;

  const trim = path.slice(0, ender);

  return trim.slice(trim.lastIndexOf('/'));

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
export const parentPath = (path: string | string[]) => {

  if (isArray(path)) return path.map(parentPath);

  const last = path.lastIndexOf('/');

  if (is(last, -1)) return path;

  const glob = path.indexOf('*');

  return is(glob, -1) ? path.slice(0, last) : path.slice(0, glob);

};

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * who accepts a string or array of strings. Paths will include
 * the directory `input` folder name.
 *
 * @example
 *
 * // basic usage
 * normalPath('input')('/some/path') => 'input/some/path'
 *
 * // handles ignores
 * normalPath('input')('!ignore') => '!input/ignore'
 */
export const normalPath = (input: string) => {

  const regex = new RegExp(`^\\.?\\/?${input}\\/`);

  return function prepend (path: string | string[]) {

    if (isArray(path)) return path.map(prepend);

    const ignore = is(path.charCodeAt(0), 33);

    if (ignore) path = path.slice(1);
    if (regex.test(path)) return ignore ? '!' + path : path;

    if (is(path.charCodeAt(0), 46) && is(path.charCodeAt(1), 46) && is(path.charCodeAt(2), 47)) {
      throw new Error('Invalid path at: ' + path + ' - Paths must be relative to source');
    }

    return (ignore ? '!' : '') + join(input, path);

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

  if (!is(path.indexOf('*'), -1)) {
    console.error(`Base directory path cannot contain glob, at "${path}"`);
    process.exit(1);
  }

  // path directory starts with . character
  if (is(path.charCodeAt(0), 46)) {

    // path define is root (dot)
    if (is(path.length, 1)) return cwd + '/';

    // path directory next character is not a forward slash
    // for example, ".folder" this will be invalid
    if (is(path.charCodeAt(1), 47)) {
      path = path.slice(1);
    } else {
      console.error('Directory path is invalid at: "' + path + '"');
      process.exit(1);
    }

  }

  // path directory starts with / character
  if (is(path.charCodeAt(0), 47)) {
    if (is(path.length, 1)) {
      return cwd + '/'; // path defined is root (slash)
    } else {
      path = path.slice(1);
    }
  }

  // path directory is valid, eg: path
  // dirs cannot reference sub directorys, eg: path/sub
  if (/^[a-zA-Z0-9_-]+/.test(path)) {
    path = join(cwd, path);
    return is(last(path).charCodeAt(0), 47) ? path : path + '/';
  } else {
    throw new Error('Directory path is invalid at: "' + path + '"');
  }
};
