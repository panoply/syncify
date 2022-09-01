import type PostCSS from 'postcss';
import type SASS from 'sass';
import { join, relative } from 'node:path';
import { File, StyleTransform, Syncify, Processors } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { isFunction, isString, isUndefined, isBuffer, nl, wsr } from '~utils/native';
import { byteSize, fileSize } from '~utils/utils';
import * as timer from '~utils/timer';
import { error, log, bold, warning } from '~log';
import { bundle, cache, processor } from '~config';

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
    sass = await import('sass');
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
        output: relative(bundle.cwd, file.output)
      })
    ); ;

    const size = fileSize(data, file.size);

    if (size.isSmaller) {
      log.transform(`${bold('CSS')} ${size.before} → gzip ${size.gzip}`);
    } else {
      log.minified('CSS', size.before, size.after, size.saved);
    }

    return content;

  };
};

async function sassProcess (file: File<StyleTransform>) {

  const { config } = file;
  const opts = config.sass === true
    ? processor.sass.config
    : config.sass as Processors['sass'];

  if (file.ext === '.scss' || file.ext === '.sass') {

    if (bundle.mode.watch) timer.start();

    try {

      const { css, sourceMap } = sass.compile(file.input, {
        loadPaths: opts.includePaths,
        sourceMapIncludeSources: false,
        sourceMap: opts.sourcemap,
        style: opts.style,
        logger: {
          debug: msg => console.log('DEBUG', msg),
          warn: warning.sass(file)
        }
      });

      if (opts.sourcemap) {

        const map = join(cache.styles.uri, file.base + '.map');

        writeFile(map, JSON.stringify(sourceMap)).catch(
          error.write('Error writing SASS Source Map file to the cache directory', {
            file: relative(bundle.cwd, map),
            source: file.relative
          })
        );
      }

      if (bundle.mode.watch) log.process(`${bold('SASS Dart')}`, timer.stop());

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

  const { config } = file;

  try {

    const result = await postcss(processor.postcss.config as any).process(css, {
      from: config.rename,
      to: config.rename,
      map: map ? { prev: map, inline: false } : null
    });

    if (bundle.mode.watch) log.process(`${bold('PostCSS')}`, timer.stop());

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

  return `<style type="text/css">${nl + wsr(2) + css}</style>`;

};

/**
 * SASS and PostCSS Compiler
 */
export async function styles (file: File<StyleTransform>, cb: Syncify): Promise<string> {

  if (bundle.mode.watch) timer.start();

  const output = write(file, cb);

  try {

    const out = await sassProcess(file);

    if (out === null) return null;

    if (isNil(postcss) || (!file.config.postcss && !file.config.snippet)) {
      return output(out.css);
    }

    if (file.config.postcss) {
      const post = await postcssProcess(file, out.css, out.map);
      if (post === null) return null;
      if (file.config.snippet) return output(snippet(post));
    }

    return file.config.snippet ? output(snippet(out.css)) : output(out.css);

  } catch (e) {

    console.log(e);

    return null;
  }

};
