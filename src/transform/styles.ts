import type PostCSS from 'postcss';
import type SASS from 'sass';
import { File, StyleTransform, Syncify, Processors } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { isFunction, isString, isUndefined, isBuffer, nl } from '../shared/native';
import { byteSize, fileSize } from '../shared/utils';
import { log, c } from '../logger';
import { bundle, cache, processor } from '../config';
import * as timer from '../process/timer';

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

    writeFile(file.output, data, (e) => e ? console.log(e) : null);

    const { isSmaller, after, before, gzip, saved } = fileSize(data, file.size);

    if (isSmaller) {
      log.transform(`${c.bold('CSS')} ${before} → gzip ${gzip}`);
    } else {
      log.transform(`${c.bold('CSS')} minified ${before} to ${after} ${c.gray(`~ saved ${saved}`)}`);
    }

    return content;

  };
};

async function sassProcess (file: File<StyleTransform>) {

  const { config } = file;
  const opts = config.sass === true
    ? processor.sass.config
    : config.sass as Processors['sass'];

  // console.log(opts);

  if (file.ext === '.scss' || file.ext === '.sass') {

    if (bundle.mode.watch) timer.start();

    try {

      log.hook('sass');

      const { css, sourceMap } = sass.compile(file.input, {
        ...opts,
        loadPaths: opts.includePaths,
        sourceMapIncludeSources: false,
        logger: opts.warnings ? sass.Logger.silent : {
          debug: msg => console.log('DEBUG', msg),
          warn: (msg, opts) => {
            log.warn(msg + '\n\n' + opts.stack);
          }
        }
      });

      if (opts.sourcemap) {
        writeFile(`${cache.styles.uri + file.base}.map`, JSON.stringify(sourceMap)).catch(e => log.warn(e));
      }

      if (bundle.mode.watch) log.process(`${c.bold('SASS Dart')}`, timer.stop());

      log.unhook();

      file.size = byteSize(css);

      return {
        css,
        map: sourceMap
      };

    } catch (e) {

      log.unhook();
      log.error('error occurred compiling sass to css', file);
      log.throws(e);

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

    log.error('error reading css file', file);
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

  log.hook('postcss');

  try {

    const result = await postcss(processor.postcss.config as any).process(css, {
      from: config.rename,
      to: config.rename,
      map: map ? { prev: map, inline: false } : null
    });

    if (bundle.mode.watch) log.process(`${c.bold('PostCSS')}`, timer.stop());

    const warn = result.warnings();

    if (warn.length > 0) {
      log.warning.count += warn.length;
      log.warn(warn.join(nl));
    }

    log.unhook();

    return result.toString();

  } catch (e) {

    log.unhook();
    log.error('error occured processing css with postcss', file);
    console.log(e);

    return null;

  }

};

/**
 * Create inline snippet
 */
function snippet (css: string) {

  return `<style>${css}</style>`;

};

/**
 * SASS and PostCSS Compiler
 */
export async function styles (file: File<StyleTransform>, cb: Syncify): Promise<string> {

  if (bundle.mode.watch) timer.start();

  const output = write(file, cb);

  try {

    const out = await sassProcess(file);

    if (isNil(postcss) || (!file.config.postcss && !file.config.snippet)) return output(out.css);
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
