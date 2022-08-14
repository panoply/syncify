import { File, Transforms } from 'types';
import { join, dirname, basename } from 'path';
import { defineProperty, isRegex, isUndefined } from '../shared/native';
import { bundle } from '../options/index';
import { lastPath, parentPath } from '../shared/paths';

/**
 * Style Context
 *
 * Augment the file configuration to accept
 * style types.
 */
export function style (file: File<Transforms.Style>) {

  const config = bundle.style.find(x => x.watch(file.input));

  // console.log(file, config);

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

  file.input = config.input;

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function section (file: File) {

  if (bundle.section.directoryPrefixing) {

    if (isRegex(bundle.section.global)) {
      if (bundle.section.global.test(file.input)) return file;
    }

    const rename = lastPath(file.input) + bundle.section.prefixSeparator + file.base;

    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);
  }

  return file;

};
