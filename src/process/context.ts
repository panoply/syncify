import { File, ScriptBundle, SVGBundle, StyleBundle } from 'types';
import { join, dirname, basename } from 'node:path';
import { defineProperty, isRegex, isUndefined } from '../utils/native';
import { bundle } from '../config';
import { lastPath, parentPath } from '../utils/paths';

/**
 * Script Context
 *
 * Locate the entry and apply context to the script change
 */
export function svg (file: File<SVGBundle>) {

  const config = bundle.svg.filter(context => {

    if (context.input.has(file.input)) return true;

    if (context.match(file.input)) {
      context.input.add(file.input);
      return true;
    }

    return false;
  });

  if (isUndefined(config)) return file;

  // Assign the bundle configuration to a getter
  defineProperty(file, 'config', { get () { return config; } });

  return file;

};

/**
 * Style Context
 *
 * Augment the file configuration to accept
 * style types.
 */
export function style (file: File<StyleBundle>) {

  const config = bundle.style.find(x => x.watch(file.input));

  if (isUndefined(config)) return file;

  defineProperty(file, 'config', { get () { return config; } });

  if (config.snippet) {
    file.namespace = 'snippets';
    file.key = join('snippets', config.rename);
  } else {
    file.key = join('assets', config.rename);
  }

  if (file.output) {
    if (file.config.rename !== basename(file.output)) {
      if (config.snippet) {
        file.output = join(bundle.dirs.output, file.key);
      } else {
        file.output = join(parentPath(file.output), file.config.rename);
      }
    }
  } else {

    file.output = join(bundle.dirs.output, file.key);

  }

  return file;

};

/**
 * Script Context
 *
 * Locate the entry and apply context to the script change
 */
export function script (file: File<ScriptBundle[]>) {

  const config = bundle.script.filter(config => config.watch.has(file.input));

  if (config.length === 0) return file;

  defineProperty(file, 'config', { get () { return config; } });

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function section (file: File) {

  if (bundle.section.prefixDir) {

    if (file.base.endsWith('-group.json')) return file;
    if (isRegex(bundle.section.global) && bundle.section.global.test(file.input)) return file;

    const rename = lastPath(file.input) + bundle.section.separator + file.base;

    file.name = rename;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);

  }

  return file;

};

/**
 * Augment the file configuration to accept
 * metafield types.
 */
export function snippet (file: File) {

  if (bundle.snippet.prefixDir) {

    if (isRegex(bundle.snippet.global) && bundle.snippet.global.test(file.input)) return file;

    const rename = lastPath(file.input) + bundle.snippet.separator + file.base;

    file.name = rename;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);

  }

  return file;

};
