import { basename, dirname, join } from 'node:path';

import { ScriptBundle, StyleBundle, SVGBundle } from 'types';

import { log } from '~cli/log';
import { File, Namespace, Type } from '~file';
import { renameFileParse } from '~options/utils';
import { defineProperty, isUndefined } from '~utils';
import { parentPath } from '~utils/paths';

import { $ } from '$';

/**
 * SVG Context
 *
 * Locate the entry and apply context to the SVG change
 */
export function svg (file: File<SVGBundle>) {

  const config = $.svg.filter(context => {
    if (context.input.has(file.input)) return true;
    if (!context.match(file.input)) return false;
    context.input.add(file.input);
    return true;
  });

  if (isUndefined(config)) return file;

  // Assign the bundle configuration to a "data" getter
  defineProperty(file, 'data', {
    get () {
      return config;
    }
  });

  return file;

};

/**
 * Style Context
 *
 * Augment the file configuration to accept style types.
 */
export function style (file: File<StyleBundle>) {

  const config = $.style.find(x => x.watch(file.input));

  if (isUndefined(config)) {
    file.type = Type.Asset;
    return file;
  }

  // Assign the bundle configuration to a "data" getter
  defineProperty(file, 'data', {
    get () {
      return config;
    }
  });

  if (config.snippet) {
    file.namespace = Namespace.Snippets;
    file.key = join('snippets', config.rename);
  } else {
    file.key = join('assets', config.rename);
  }

  if (file.output) {
    if (file.data.rename !== basename(file.output)) {
      if (config.snippet) {
        file.output = join($.dirs.output, file.key);
      } else {
        file.output = join(parentPath(file.output), file.data.rename);
      }
    }
  } else {

    file.output = join($.dirs.output, file.key);

  }

  return file;

};

/**
 * Script Context
 *
 * Locate the entry and apply context to the script change
 */
export function script (file: File<ScriptBundle[]>) {

  const config = $.script.filter(config => config.watch.has(file.input));

  if (config.length === 0) return file;

  // Assign the bundle configuration to a "data" getter
  defineProperty(file, 'data', { get () { return config; } });

  return file;

};

export function schema (parse: (path: string) => File, file: File) {

  // Assign the bundle configuration to a "data" getter
  defineProperty(file, 'data', { get () { return parse; } });

  return file;

};

/**
 * Section Rename
 *
 * Applies rename to section files.
 */
export function section (file: File) {

  if ($.paths.sections.rename.length > 0) {

    const path = file.input;
    const find = $.paths.sections.rename.find(({ match }) => match(path));

    if (isUndefined(find)) return file;

    const oldName = file.base;
    const rename = renameFileParse(file.input, find.pattern);

    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = join(file.namespace, rename.base);
    file.output = join(dirname(file.output), rename.base);

    if ($.mode.watch) log.rename(oldName, file.base);

  }

  return file;

};

/**
 * Snippet Rename
 *
 * Applies rename to snippet files.
 */
export function snippet (file: File) {

  if ($.paths.snippets.rename.length > 0) {

    const path = file.input;
    const find = $.paths.snippets.rename.find(({ match }) => match(path));

    if (isUndefined(find)) return file;

    const oldName = file.base;
    const rename = renameFileParse(file.input, find.pattern);

    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = join(file.namespace, rename.base);
    file.output = join(dirname(file.output), rename.base);

    if ($.mode.watch) log.rename(oldName, file.base);

  }

  return file;

};
