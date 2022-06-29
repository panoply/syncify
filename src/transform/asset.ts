import { IFile, Syncify } from 'types';
import * as c from 'cli/ansi';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { log } from 'cli/stdout';

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
export async function compile (file: IFile, cb: typeof Syncify.hook) {

  const copy = passthrough(file);
  const read = await readFile(file.input);

  const data = read.toString();

  log[file.namespace](`${c.cyan(file.key)}`);

  if (!isType('Function', cb)) return copy(data);

  const update = cb.apply({ ...file }, data);

  if (isType('Undefined', update) || update === false) {

    return copy(data);

  } else if (isType('String', update)) {

    return copy(update);

  } else if (Buffer.isBuffer(update)) {

    return copy(update.toString());

  }

  return copy(data);

};
