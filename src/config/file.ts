import path from 'path';
import { drop, isType } from 'rambdax';
import * as log from '../logs/console';
import { Syncify, IFile } from 'types';

/**
 * Parse File
 *
 * Parses the filename and returns a workable
 * object that we will pass into requests. Determines
 * whether or not we are working with metafield or asset
 * and vice-versa.
 */
export function parseFile (dir: string, file: string): IFile {

  const parts = file.split(path.sep);
  const parent = drop(parts.lastIndexOf(dir) + 1, parts);
  const ext = path.extname(file);
  const base = path.basename(file);

  return parent[0] === 'metafields' ? {
    ext,
    base,
    path: path.resolve(file),
    metafield: true,
    namespace: parent[1],
    key: parent[2].slice(0, 5)
  } : {
    ext,
    base,
    path: path.resolve(file),
    metafield: false,
    namespace: parent[0],
    key: parent.join(path.sep)
  };

}

/**
 * Minify JSON
 *
 * Metafields are trimmed of whitespace
 * and comments. Syncify allows JSON with
 * comments be provided, this function strips
 * them and will push a minified to the store.
 */
export function minifyJSON (data: string) {

  try {

    const parse = JSON.parse(data);

    return JSON.stringify(parse, null, 0);

  } catch (e) {

    return log.error(e);

  }

}

/**
 * Metafields Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export function setMetafield (
  file: IFile,
  data: Buffer | string | object | any[],
  callback: typeof Syncify.hook
) {

  if (typeof callback !== 'function') return minifyJSON(data.toString());

  const update = callback.apply({ ...file, ...path.parse(file.path) }, data);

  if (isType('Undefined', update)) return minifyJSON(data.toString());
  if (isType('String', update) || isType('Array', update) || isType('Object', update)) {
    return minifyJSON(update);
  }

  return minifyJSON(data.toString());

}

/**
 * Asset Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export function setAsset (
  file: IFile,
  data: Buffer | string | object | any[],
  callback: typeof Syncify.hook
) {

  if (typeof callback !== 'function') return data.toString('base64');

  const update = callback.apply({ ...file, ...path.parse(file.path) }, data);

  if (isType('Undefined', update)) return data.toString('base64');

  if (/\.(liquid|html|json|js|css|scss|sass|txt)/.test(file.ext)) {
    return update.toString('base64');
  }

  return data.toString('base64');

}
