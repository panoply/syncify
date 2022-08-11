import type { Processor } from 'postcss';
import { IFile, IStyle, Syncify } from 'types';
import { compile, Logger } from 'sass';
import stringify from 'fast-safe-stringify';
import { readFile, writeFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { isFunction, isString, isUndefined, isBuffer, nl } from 'shared/native';
import { byteSize } from '../shared/utils';
import { log, c } from '../logger';
import { bundle, cache } from '../options/index';
import * as timer from '../process/timer';

/**
 * PostCSS Module
 */
let pcss: Processor = null;

/**
 * Loads PostCSS
 *
 * This is executed and the `postcss` variable is
 * assigned upon initialization.
 */
export const processer = (config: any) => {

  pcss = require('postcss')(config);

};

function write (file: IFile<IStyle>, cb: Syncify) {

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

    log.filesize(file, data);

    return content;

  };
};

async function sass (file: IFile<IStyle>) {

  const { config } = file;

  if (file.ext === '.scss' || file.ext === '.sass') {

    if (bundle.mode.watch) timer.start();

    try {

      log.hook('sass');

      const { css, sourceMap } = compile(file.input, {
        sourceMapIncludeSources: false,
        style: config.sass.style,
        quietDeps: config.sass.warnings,
        sourceMap: config.sass.sourcemap,
        loadPaths: config.sass.include,
        logger: config.sass.warnings ? Logger.silent : {
          debug: msg => console.log('DEBUG', msg),
          warn: (msg, opts) => {
            log.warn(msg + '\n\n' + opts.stack);
          }
        }
      });

      if (config.sass.sourcemap) {
        writeFile(`${cache.styles.uri + file.base}.map`, stringify(sourceMap)).catch(e => log.warn(e));
      }

      if (bundle.mode.watch) {
        log.compile(`compiled ${c.bold('sass')} to ${c.bold('css')} ${c.gray(`~ ${timer.stop()}`)}`);
      }

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

    const css = await readFile(config.input);
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
async function postcss (file: IFile<IStyle>, css: string, map: any) {

  const { config } = file;

  log.hook('postcss');

  try {

    const result = await pcss.process(css, {
      from: config.rename,
      to: config.rename,
      map: map ? { prev: map, inline: false } : null
    });

    if (bundle.mode.watch) {
      log.compile(`processed ${c.bold('css')} with ${c.bold('postcss')} ${c.gray(`~ ${timer.stop()}`)}`);
    }

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
    log.throws(e);

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
export async function styles (file: IFile<IStyle>, cb: Syncify): Promise<string> {

  if (bundle.mode.watch) timer.start();

  const output = write(file, cb);

  try {

    const out = await sass(file);

    if (isNil(pcss) || (
      file.config.postcss === false &&
      file.config.snippet === false)) {
      return output(out.css);
    }

    if (file.config.postcss) {
      const post = await postcss(file, out.css, out.map);
      if (post === null) return null;
      if (file.config.snippet) return output(snippet(post));
    }

    return file.config.snippet ? output(snippet(out.css)) : output(out.css);

  } catch (e) {

    log.throws(e);

    return null;
  }

};
