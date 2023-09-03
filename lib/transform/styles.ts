import type PostCSS from 'postcss';
import type SASS from 'sass';
import { join, relative } from 'pathe';
import { File, StyleTransform, Syncify, Processors } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { isFunction, isString, isUndefined, isBuffer, nl, wsr } from '~utils/native';
import { byteSize, fileSize } from '~utils/utils';
import * as timer from '~utils/timer';
import { error, log, bold, warning } from '~log';
import { $ } from '~state';

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
    const pcss = await import('postcss') as any;
    postcss = pcss.default;
    return isNil(postcss) === false;
  }

  if (id === 'sass') {
    sass = require('sass');
    return isNil(sass) === false;
  }

};

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

function write (file: File<StyleTransform>, cb: Syncify) {

  const scope = isFunction(cb) ? { ...file } : false;

  return async function (data: string) {

    if (isNil(data)) return null;

    let content: string;

    if (scope !== false) {

      const update = cb.apply({ ...file }, Buffer.from(data));

      if (isUndefined(update) || update === false) {
        content = data;
      } else if (isString(update) || isBuffer(update)) {
        content = update;
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

    const size = fileSize(data, file.size);

    if (size.isSmaller) {
      log.transform(`${bold('CSS')} ${size.before} → gzip ${size.gzip}`);
    } else {
      log.minified('CSS', size.before, size.after, size.saved);
    }

    if ($.mode.hot) {
      $.wss.stylesheet(file.key);
    }

    return content;

  };
};

async function sassProcess (file: File<StyleTransform>) {

  const { data } = file;

  const opts = data.sass === true
    ? $.processor.sass.config
    : data.sass as Processors['sass'];

  if (file.ext === '.scss' || file.ext === '.sass') {

    if ($.mode.watch) timer.start();

    try {

      const { css, sourceMap } = sass.compile(data.input as string, {
        loadPaths: opts.include,
        sourceMapIncludeSources: false,
        sourceMap: opts.sourcemap,
        style: opts.style,
        logger: {
          debug: msg => console.log('DEBUG', msg),
          warn: warning.sass(file)
        }
      });

      if (opts.sourcemap) {

        const map = join($.cache.sourcemaps.style, file.base + '.map');

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

      log.invalid(file.relative);
      error.sass(file, e);

      return null;

    }

  }

  try {

    const css = await readFile(file.input);
    file.size = byteSize(css);

    return {
      css: css.toString(),
      map: null
    };

  } catch (e) {

    log.invalid(file.relative);
    log.throws(e);

    return null;

  }

};

/**
 * Post Processor
 *
 * Runs postcss on compiled SASS or CSS styles
 */
async function postcssProcess (file: File<StyleTransform>, css: string, map: any) {

  const { data } = file;

  try {

    if ($.mode.watch) timer.start();

    const result = await postcss($.processor.postcss.config).process(css, {
      from: data.rename,
      to: data.rename,
      map: map ? { prev: map, inline: false } : null
    });

    if ($.mode.watch) log.process('PostCSS', timer.stop());

    const issues = result.warnings();

    if (issues.length > 0) for (const warn of issues) warning.postcss(file, warn);

    return result.toString();

  } catch (e) {

    log.invalid(file.relative);
    console.log(e);

    return null;

  }

};

/**
 * Create inline snippet
 */
function snippet (css: string) {

  return `<style>${nl + wsr(2) + css}</style>`;

};

/**
 * SASS and PostCSS Compiler
 */
export async function compile (file: File<StyleTransform>, cb: Syncify): Promise<string> {

  if ($.mode.watch) timer.start();

  const output = write(file, cb);

  try {

    const out = await sassProcess(file);

    if (out === null) return null;

    if (isNil(postcss) || (!file.data.postcss && !file.data.snippet)) {
      return output(out.css);
    }

    if (file.data.postcss) {
      const post = await postcssProcess(file, out.css, out.map);
      if (post === null) return null;
      if (file.data.snippet) return output(snippet(post));
    }

    return file.data.snippet ? output(snippet(out.css)) : output(out.css);

  } catch (e) {

    console.log(e);

    return null;
  }

};
