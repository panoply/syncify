import { IFile, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { log } from 'cli/logger';
import { isFunction, isBuffer, isUndefined } from 'shared/native';

/* -------------------------------------------- */
/* EXPORTED FUNCTION                            */
/* -------------------------------------------- */

/**
 * Liquid File Transforms
 *
 * Applies minification and handles `.liquid` files.
 * Determines what action should take place.
 */
const passthrough = (file: IFile) => async (data: string) => {

  await writeFile(file.output, data);

  return data;

};

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: IFile, cb: Syncify) {

  log.group(file.namespace).file(file.key);

  const copy = passthrough(file);
  const read = await readFile(file.input);
  const data = read.toString();

  if (!isFunction(cb)) return copy(data);

  const update = cb.apply({ ...file }, data);

  if (isUndefined(update) || update === false) {
    return copy(data);
  } else if (isType(update)) {
    return copy(update);
  } else if (isBuffer(update)) {
    return copy(update.toString());
  }

  return copy(data);

};