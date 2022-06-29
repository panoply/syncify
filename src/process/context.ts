import { IFile, IStyle, Syncify } from 'types';
import { join, dirname, basename } from 'path';
import { defineProperty, isRegex, isUndefined } from 'shared/native';
import { transform } from 'options';
import { parentPath } from 'shared/paths';

/**
 * Style Context
 *
 * Augment the file configuration to accept
 * style types.
 */
export function style (file: IFile<IStyle>) {

  const config = transform.styles.find(x => x.watch(file.input));

  if (isUndefined(config)) return file;

  defineProperty(file, 'config', { get () { return config; } });

  if (config.snippet) {
    file.namespace = 'snippets';
    file.key = join('snippets', config.rename);
  } else {
    file.key = join('assets', config.rename);
  }

  if (file.config.rename !== basename(file.output)) {
    file.output = join(parentPath(file.output), file.config.rename);
  }

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function section (file: IFile) {

  if (transform.sections.directoryPrefixing) {

    if (isRegex(transform.sections.global)) {
      if (transform.sections.global.test(file.input)) return file;
    }

    const rename = file.namespace + transform.sections.prefixSeparator + file.base;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);
  }

  return file;

};

/**
 * Asset Modifier
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export function asset (file: IFile, data: Buffer | string | object | any[], cb?: typeof Syncify.hook) {

  if (typeof cb !== 'function') return data.toString();

  const update = cb.call({ ...file }, data);

  if (isUndefined(update)) return data;

  if (/\.(liquid|html|json|js|css|scss|sass|txt|svg)/.test(file.ext)) {
    return update.toString();
  }

  return data.toString();

};
