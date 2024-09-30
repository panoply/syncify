import { ScriptBundle, SVGBundle, StyleBundle } from 'types';
import { join, dirname, basename } from 'node:path';
import { defineProperty } from 'syncify:native';
import { isUndefined } from 'syncify:utils';
import { $ } from 'syncify:state';
import { parentPath } from 'syncify:utils/paths';
import { Type, File, Namespace } from 'syncify:file';
import { renameFileParse } from 'syncify:utils/options';
import * as log from 'syncify:log';

/**
 * Script Context
 *
 * Locate the entry and apply context to the script change
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
  defineProperty(file, 'data', { get () { return config; } });

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
  defineProperty(file, 'data', { get () { return config; } });

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

export function schema (fn: (path: string) => File, file: File) {

  // Assign the bundle configuration to a "data" getter
  defineProperty(file, 'data', { get () { return fn; } });

  return file;

};

export function section (file: File) {

  if (file.base.endsWith('-group.json')) return file;

  if ($.paths.sections.rename.length > 0) {

    const find = $.paths.sections.rename.find(([ match ]) => match(file.input));

    if (isUndefined(find)) return file;

    const oldName = file.base;
    const rename = renameFileParse(file.input, find[1]);

    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = join(file.namespace, rename.base);
    file.output = join(dirname(file.output), rename.base);

    log.rename(oldName, file.base);

  }

  return file;

};

export function snippet (file: File) {

  if ($.paths.snippets.rename.length > 0) {

    const find = $.paths.snippets.rename.find(([ match ]) => match(file.input));

    if (isUndefined(find)) return file;

    const oldName = file.base;
    const rename = renameFileParse(file.input, find[1]);

    file.name = rename.name;
    file.ext = rename.ext;
    file.base = rename.base;
    file.key = join(file.namespace, rename.base);
    file.output = join(dirname(file.output), rename.base);

    log.rename(oldName, file.base);

  }

  return file;

};
