import type SASS from 'sass';
import type { Config as TailwindConfig } from 'tailwindcss';
import type { Syncify, SASSConfig, StyleBundle, ClientParam } from 'types';
import { basename, join, relative } from 'node:path';
import { readFile, writeFile } from 'fs-extra';
import { timer } from 'syncify:timer';
import { byteSize, sizeDiff } from 'syncify:sizes';
import * as u from 'syncify:utils';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import * as warn from 'syncify:log/warnings';
import { File, Kind } from 'syncify:file';
import { bold } from '@syncify/ansi';
import postcss, { PluginCreator } from 'postcss';
import { toBuffer } from 'syncify:utils/native';
import { $ } from 'syncify:state';
import { parseFileQuick } from 'syncify:process/files';

/**
 * SASS Dart module
 */
export let sass: typeof SASS = null;

/**
 * TailwindCSS module
 */
export let tailwind: PluginCreator<Partial<TailwindConfig>> = null;

/**
 * Load PostCSS / SASS
 *
 * Dynamically imports PostCSS and SASS. Assigns the modules to
 * lettings `sass` or `postcss`. This allows users to optionally
 * include modules in the build.
 */
export async function load (id: 'tailwind' | 'sass') {

  if (id === 'sass') {
    sass = require('sass');
    return u.isNil(sass) === false;
  }

  if (id === 'tailwind') {
    tailwind = require('tailwindcss');
    return u.isNil(tailwind) === false;
  }

};

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

function write <T extends StyleBundle> (file: File<T>, sync: ClientParam<T>, hook: Syncify) {

  const scope = u.isFunction(hook) ? { ...file } : false;

  return async (data: string) => {

    if (u.isNil(data)) return null;

    let content: string;

    if (scope !== false) {

      const update = hook.apply({ ...file }, toBuffer(data));

      if (u.isUndefined(update) || update === false) {
        content = data;
      } else if (u.isString(update) || u.isBuffer(update)) {
        content = u.sanitize(update);
      }
    } else {
      content = data;
    }

    $.cache.checksum[file.input] = u.checksum(content);

    writeFile(file.output, content).catch(error.write('Error writing stylesheet to output', {
      input: file.relative,
      output: relative($.cwd, file.output)
    }));

    const size = sizeDiff(data, file.size);

    if (size.isSmaller) {
      if (file.kind === Kind.SCSS || file.kind === Kind.SASS || file.kind === Kind.Tailwind) {
        log.transform(file.kind, bold('CSS'), size.before, timer.stop(file.uuid));
      } else {
        log.transform('CSS', size.before, `gzip ${size.gzip}`);
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

    if (sync === null) return content;

    await sync('put', file, content);

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

      const { css, sourceMap } = sass.compile(file.data.input, {
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

      file.size = byteSize(css);

      return {
        css,
        map: sourceMap
      };

    } catch (e) {

      if ($.mode.watch) {

        timer.clear();

        log.error(file.relative, {
          notify: {
            title: 'SCSS Transform Error',
            message: `SASS Dart failed to process ${file.base}`
          }
        });

        error.sass(file, e);

      }

      return null;

    }

  }

  return readStyleFile(file);

};

export async function tailwindParse (file: File, queue: [File, string][]) {

  for (const map in $.processor.tailwind.map) {

    if ($.processor.tailwind.map[map].has(file.input)) {

      const item = parseFileQuick<StyleBundle>($.style[map].input);

      if (u.isUndefined(item)) continue;

      timer.start(item.uuid);
      item.kind = Kind.Tailwind;

      const style = await tailwindProcess(item);

      u.isString(style) && queue.push([ item, style ]);

    }
  }

  return queue;
}

/**
 * Tailwind Processor
 *
 * An isolated tailwind transform used in `content[]` triggered from views.
 */
export async function tailwindProcess (file: File<StyleBundle>) {

  if ($.mode.hot) timer.start(file.uuid);

  const output = write(file, null, null);
  const read = await readStyleFile(file);
  const post = await postcssProcess(file, read.css, read.map);

  if (post === null) return null;

  if (file.data.snippet) {
    return output(createSnippet(post, file.data.attrs));
  } else {
    return output(post);
  }

}

export async function readStyleFile (file: File<StyleBundle>) {

  try {

    const css = await readFile(file.input);
    file.size = byteSize(css);

    return {
      css: css.toString(),
      map: null
    };

  } catch (e) {

    timer.clear();

    log.error(file.relative, {
      notify: {
        title: 'Read Error',
        message: `File ${file.base} could not be read`
      }
    });

    error.throws(e, {
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
    ? [ tailwind(data.tailwind) as postcss.AcceptedPlugin ].concat(data.postcss)
    : data.postcss;

  try {

    if ($.mode.watch && file.kind !== Kind.Tailwind) timer.start();

    const result = await postcss(plugins).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? { prev: map, inline: false, absolute: true } : null
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
          title: 'PostCSS Transform Error',
          message: `PostCSS failed to process ${file.base}`
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
    ? `<style ${attrs.join(' ')}>${string}</style>`
    : `<style>${string}</style>`;

};

/**
 * SASS and PostCSS Compiler
 */
export async function compile <T extends StyleBundle> (file: File<StyleBundle>, sync: ClientParam, cb: Syncify) {

  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);

  const output = write(file, sync, cb);

  try {

    if (u.isUndefined(file.data)) {

      return readStyleFile(file);

    }

    const out = await sassProcess(file);

    if (out === null) return null;

    if (u.isNil(postcss) || u.isUndefined(file.data) || (!file.data.postcss && !file.data.snippet)) {
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
