import type postcss from 'postcss';
import type { SASSConfig, StyleBundle } from 'types';

import { basename, join, relative } from 'node:path';

import { readFile, writeFile } from 'fs-extra';
import { $import } from 'modules';

import { bold } from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { warn } from '~cli/warnings';
import { error } from '~errors';
import { File, Kind } from '~file';
import { themeFilesUpsertMap } from '~http/themeFiles';
import { runChecksum } from '~process/cache';
import { parse } from '~process/files';
import * as u from '~utils';

import { $ } from '$';

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

function write <T extends StyleBundle> (file: File<T>, { noUpsert = false } = {}) {

  return async (data: string) => {

    if (u.isNil(data)) return null;

    runChecksum(file.input, data);

    writeFile(file.output, data).catch(error.write('Error writing stylesheet to output', {
      input: file.relative,
      output: relative($.cwd, file.output)
    }));

    file.value = data;
    const size = u.sizeDiff(file.value, file.size);

    if (size.isSmaller) {
      if (file.kind === Kind.SCSS || file.kind === Kind.SASS || file.kind === Kind.Tailwind) {
        log.transform(file.kind, bold('CSS'), size.before, timer.stop(file.uuid));
      } else {
        log.transform('CSS', size.before, `brotli ${size.brotli}`);
      }
    } else {
      if (file.kind === Kind.Tailwind) {
        log.minified(Kind.Tailwind, size.before, size.after, size.saved);
      } else {
        log.minified('CSS', size.before, size.after, size.saved);
      }
    }

    if ($.mode.hot) {
      $.wss.stylesheet(file.uuid, basename(file.key));
    }

    if (file.kind !== Kind.Tailwind) {
      log.syncing(file.key);
    }

    if ($.mode.watch && !noUpsert) {

      await themeFilesUpsertMap(file);

      if (!$.mode.build) {
        if ($.warnings.size > 0) {
          const size = warn.count();
          log.warn(`${bold(size)} Compiler ${u.plur('Warning', size)}`, `Press ${bold('v')} to view all warning/s`);
        }
      }

    }

    return file.value;

  };
};

async function sassProcess (file: File) {

  if (u.isUndefined(file.data) || (u.isBoolean(file.data.sass) && file.data.sass === false)) {

    return readStyleFile(file);

  }

  const options: SASSConfig = u.isObject(file.data.sass)
    ? u.merge($.processor.sass.config, file.data.sass)
    : $.processor.sass.config;

  if (file.ext === '.scss' || file.ext === '.sass') {

    $.mode.watch && timer.start();

    try {

      const { css, sourceMap } = await $import.sass.compileAsync(file.data.input, {
        loadPaths: options.include,
        sourceMapIncludeSources: file.data.postcss,
        sourceMap: options.sourcemap,
        style: options.style,
        alertColor: false,
        alertAscii: false,
        quietDeps: options.quietDeps,
        charset: file.data.snippet === false,
        logger: {
          debug: msg => console.log('DEBUG', msg),
          warn: warn.sass(file)
        }
      });

      if (options.sourcemap) {

        const map = join($.dirs.sourcemaps.styles, file.base + '.map');

        writeFile(map, JSON.stringify(sourceMap)).catch(
          error.write('Error writing SASS Source Map file to the cache directory', {
            file: relative($.cwd, map),
            source: file.relative
          })
        );
      }

      log.process('SASS Dart', timer.stop());

      file.size = u.byteSize(css);

      return {
        css,
        map: sourceMap
      };

    } catch (e) {

      if ($.mode.watch) {

        timer.clear();

        log.error(file.relative, {
          notify: {
            title: `Error in ${file.base}`,
            message: 'SASS style transform failed, SCSS was not complied.'
          }
        });

        error.sass(file, e);

      }

      return null;

    }

  }

  return readStyleFile(file);

};

/**
 * Index `[0]` is the view file which triggers the change
 */
export async function tailwindParse (file: File) {

  const files: File[] = [];

  for (const map in $.processor.tailwind.map) {

    if ($.processor.tailwind.map[map].has(file.input)) {

      const file = parse($.style[map].input);

      if (u.isUndefined(file)) continue;

      timer.start(file.uuid);

      file.kind = Kind.Tailwind;
      file.value = await tailwindProcess(file, { noUpsert: true });

      if (u.isString(file.value)) {

        files.push(file);

      }
    }
  }

  files.push(file);
  files.length > 1
    ? log.syncing(`${files.length} files processed`, { hot: $.mode.hot })
    : log.syncing(files[0].key, { hot: $.mode.hot });

  return files;

}

/**
 * Tailwind Processor
 *
 * An isolated tailwind transform used in `content[]` triggered from views.
 */
export async function tailwindProcess (file: File<StyleBundle>, upsert: { noUpsert: boolean }) {

  if ($.mode.hot) timer.start(file.uuid);

  const output = write(file, upsert);
  const read = await readStyleFile(file);
  const post = await postcssProcess(file, read.css, read.map);

  if (post === null) return null;

  file.hash = u.checksum(post);

  if ($.checksum[file.input] === file.hash) {
    log.skipped(file, 'no changes');
    return null;
  }

  $.checksum[file.input] = file.hash;

  if (file.data.snippet) {
    return output(createSnippet(post, file.data.attrs));
  } else {
    return output(post);
  }

}

export async function readStyleFile (file: File<StyleBundle>) {

  try {

    const css = await readFile(file.input, 'utf8');
    file.size = u.byteSize(css);

    return { css, map: null };

  } catch (e) {

    timer.clear();

    log.error(file.relative, {
      notify: {
        title: 'Read Error',
        message: `File ${file.base} could not be read`
      }
    });

    error.throw(e, {
      source: file.relative,
      transform: 'style'
    });

    return null;

  }

}

/**
 * Post Processor
 *
 * Runs postcss on compiled SASS or CSS styles
 */
export async function postcssProcess (file: File<StyleBundle>, css: string, map: any) {

  const { data } = file;
  const isTWCSS = u.isBoolean(data.tailwind) === false;
  const plugins: postcss.AcceptedPlugin[] = isTWCSS && data.tailwind
    ? [ $import.tailwind(data.tailwind) ].concat(data.postcss)
    : data.postcss;

  try {

    if ($.mode.watch && file.kind !== Kind.Tailwind) timer.start();

    const result = await $import.postcss(plugins).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? {
        prev: map,
        inline: false,
        absolute: true
      } : null
    });

    if ($.mode.watch && file.kind !== Kind.Tailwind) {
      log.process('PostCSS', timer.stop());
    }

    const issues = result.warnings();

    if (issues.length > 0) {
      for (const warning of issues) {
        warn.postcss(file, warning);
      }
    }

    return result.css.toString();

  } catch (e) {

    if ($.mode.watch) {

      timer.clear();

      log.error(file.relative, {
        notify: {
          title: `Error in ${file.base}`,
          message: 'PostCSS Transform Error, file failed to process'
        }
      });

      error.postcss(file, e);

    }

    return null;

  }

};

/**
 * Create inline snippet
 */
export function createSnippet (string: string, attrs: string[]) {

  return attrs.length > 0
    ? `<style ${glue.ws(attrs)}>${string}</style>`
    : `<style>${string}</style>`;

};

/**
 * SASS and PostCSS Compiler
 */
export async function StyleTransform (file: File<StyleBundle>) {

  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);

  const output = write(file);

  try {

    if (u.isUndefined(file.data)) return readStyleFile(file);

    const out = await sassProcess(file);

    if (out === null) return null;

    if (u.isNil($import.postcss) || u.isUndefined(file.data) || (
      !file.data.postcss &&
      !file.data.snippet)) {
      return output(out.css);
    }

    if (file.data.postcss) {

      const post = await postcssProcess(file, out.css, out.map);
      if (post === null) return null;

      if (file.data.snippet) {
        return output(createSnippet(post, file.data.attrs));
      } else {
        return output(post);
      }
    }

    return file.data.snippet
      ? output(createSnippet(out.css, file.data.attrs))
      : output(out.css);

  } catch (e) {

    console.log(e);

    return null;
  }

}
