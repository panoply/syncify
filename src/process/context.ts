import { Bundle, File } from 'types';
import { join, dirname, basename } from 'path';
import { defineProperty, isRegex, isUndefined } from '../utils/native';
import { bundle } from '../config';
import { lastPath, parentPath } from '../utils/paths';

/**
 * Style Context
 *
 * Augment the file configuration to accept
 * style types.
 */
export function style (file: File<Bundle['style'][number]>) {

  const config = bundle.style.find(x => x.watch(file.input));

  if (isUndefined(config)) return file;

  defineProperty(file, 'config', { get () { return config; } });

  if (config.snippet) {
    file.namespace = 'snippets';
    file.key = join('snippets', config.rename);
  } else {
    file.key = join('assets', config.rename);
  }

  if (file.config.rename !== basename(file.output)) {
    if (config.snippet) {
      file.output = join(bundle.dirs.output, file.key);
    } else {
      file.output = join(parentPath(file.output), file.config.rename);
    }
  }

  return file;

};

/**
 * Style Context
 *
 * Augment the file configuration to accept
 * style types.
 */
export function script (file: File<Bundle['script'][number]>) {

  const config = bundle.script.find(x => x.watch(file.input));

  if (isUndefined(config)) return file;

  defineProperty(file, 'config', { get () { return config; } });

  if (config.snippet) {
    file.namespace = 'snippets';
    file.key = join('snippets', config.rename);
  } else {
    file.key = join('assets', config.rename);
  }

  if (config.rename !== basename(file.output)) {
    if (config.snippet) {
      file.output = join(bundle.dirs.output, file.key);
    } else {
      file.output = join(parentPath(file.output), config.rename);
    }
  }

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function section (file: File) {

  if (bundle.section.prefixDir) {

    if (isRegex(bundle.section.global)) {
      if (bundle.section.global.test(file.input)) return file;
    }

    const rename = lastPath(file.input) + bundle.section.separator + file.base;

    file.name = rename;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);
  }

  return file;

};
