import type PostCSS from 'postcss';
import type SASS from 'sass';
import type { Syncify, SASSConfig, StyleBundle } from 'types';
import { basename, join, relative } from 'pathe';
import { readFile, writeFile } from 'fs-extra';
import { timer } from 'syncify:timer';
import * as u from 'syncify:utils';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import * as warn from 'syncify:log/warnings';
import { File, Kind } from 'syncify:file';
import { $ } from 'syncify:state';
import { bold } from 'syncify:colors';
import merge from 'mergerino';

/**
 * PostCSS Module
 */
export let postcss: typeof PostCSS = null;

/**
 * SASS Dart module
 */
export let sass: typeof SASS = null;

/**
 * Load PostCSS / SASS
 *
 * Dynamically imports PostCSS and SASS. Assigns the modules to
 * lettings `sass` or `postcss`. This allows users to optionally
 * include modules in the build.
 */
export async function load (id: 'postcss' | 'sass') {

  if (id === 'postcss') {
    const pcss = await import('postcss');
    postcss = pcss.default;
    return u.isNil(postcss) === false;
  }

  if (id === 'sass') {
    sass = require('sass');
    return u.isNil(sass) === false;
  }

};

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

function write (file: File<StyleBundle>, cb: Syncify) {

  const scope = u.isFunction(cb) ? { ...file } : false;

  return async function (data: string) {

    if (u.isNil(data)) return null;

    let content: string;

    if (scope !== false) {

      const update = cb.apply({ ...file }, Buffer.from(data));

      if (u.isUndefined(update) || update === false) {
        content = data;
      } else if (u.isString(update) || u.isBuffer(update)) {
        content = u.sanitize(update);
      }
    } else {
      content = data;
    }

    writeFile(file.output, content).catch(
      error.write('Error writing stylesheet to output', {
        input: file.relative,
        output: relative($.cwd, file.output)
      })
    ); ;

    const size = u.fileSize(data, file.size);

    if (size.isSmaller) {
      if (file.kind === Kind.SCSS || file.kind === Kind.SASS) {
        log.transform(file.kind, bold('CSS'), size.before);
      } else {
        log.transform('CSS', size.before, `gzip ${size.gzip}`);
      }
    } else {
      log.minified('CSS', size.before, size.after, size.saved);
    }

    if ($.mode.hot) {

      $.wss.stylesheet(file.uuid, basename(file.key));

    }

    return content;

  };
};

async function sassProcess (file: File) {

  const { data } = file;

  if (u.isBoolean(data.sass) && data.sass === false) return readStyleFile(file);

  const options: SASSConfig = u.isObject(data.sass)
    ? merge($.processor.sass.config, data.sass)
    : $.processor.sass.config;

  if (file.ext === '.scss' || file.ext === '.sass') {

    if ($.mode.watch) timer.start();

    try {

      const { css, sourceMap } = sass.compile(data.input, {
        loadPaths: options.include,
        sourceMapIncludeSources: data.postcss,
        sourceMap: options.sourcemap,
        style: options.style,
        alertColor: false,
        alertAscii: false,
        quietDeps: options.quietDeps,
        charset: data.snippet === false,
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

async function readStyleFile (file: File<StyleBundle>) {

  try {

    const css = await readFile(file.input);
    file.size = u.byteSize(css);

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
async function postcssProcess (file: File<StyleBundle>, css: string, map: any) {

  const { data } = file;

  try {

    if ($.mode.watch) timer.start();

    const cfg = u.isBoolean(file.data.postcss) ? $.processor.postcss.config : file.data.postcss;
    const plugins = u.isArray(cfg) ? cfg : cfg.plugins;
    const result = await postcss(plugins).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? {
        prev: map,
        inline: false,
        absolute: true
      } : null
    });

    if ($.mode.watch) log.process('PostCSS', timer.stop());

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
export async function compile (file: File<StyleBundle>, cb: Syncify): Promise<string> {

  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);

  const output = write(file, cb);

  try {

    const out = await sassProcess(file);

    if (out === null) return null;

    if (u.isNil(postcss) || (!file.data.postcss && !file.data.snippet)) {
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

    return file.data.snippet ? output(createSnippet(out.css, file.data.attrs)) : output(out.css);

  } catch (e) {

    console.log(e);

    return null;
  }

};
