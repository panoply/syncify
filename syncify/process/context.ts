import { File, ScriptBundle, SVGBundle, StyleBundle } from 'types';
import { join, dirname, basename } from 'node:path';
import { defineProperty } from 'syncify:native';
import { isRegex, isUndefined } from 'syncify:utils';
import { $ } from 'syncify:state';
import { lastPath, parentPath } from 'syncify:utils/paths';
import { Type } from 'syncify:file';

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
    file.namespace = 'snippets';
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

  if ($.section.prefixDir) {

    if (file.base.endsWith('-group.json')) return file;
    if (isRegex($.section.global) && $.section.global.test(file.input)) return file;

    const last = lastPath(file.input);

    if ($.section.baseDir.has(last)) return file;

    const rename = lastPath(file.input) + $.section.separator + file.base;

    file.name = rename;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);

  }

  return file;

};

export function snippet (file: File) {

  if ($.snippet.prefixDir) {

    if (isRegex($.snippet.global) && $.snippet.global.test(file.input)) return file;

    const last = lastPath(file.input);

    if ($.snippet.baseDir.has(last)) return file;

    const rename = last + $.snippet.separator + file.base;

    file.name = rename;
    file.key = join(file.namespace, rename);
    file.output = join(dirname(file.output), rename);

  }

  return file;

};
