import type { Processor } from 'postcss';
import { IFile, IStyle, Syncify } from 'types';
import { compile, Logger } from 'sass';
import { basename } from 'path';
import stringify from 'fast-safe-stringify';
import { readFile, writeFile } from 'fs-extra';
import { isNil } from 'rambdax';
import { isFunction, isString, isUndefined, isBuffer } from 'shared/native';
import * as parse from 'cli/parse';
import { log, c, warnings } from 'cli/log';
import { cache } from '../options/index';

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

function write (file: IFile, cb: Syncify) {

  const scope = isFunction(cb) ? { ...file } : false;

  return function (data: string) {

    if (isNil(data)) return null;

    let content: string;

    if (scope !== false) {

      const update = cb.apply({ ...file }, Buffer.from(data));

      if (isUndefined(update) || update === false) {
        writeFile(file.output, data, (e) => e ? console.log(e) : null);
        content = data;
      } else if (isString(update) || isBuffer(update)) {
        writeFile(file.output, update, (e) => e ? console.log(e) : null);
        content = update;
      }
    } else {
      writeFile(file.output, data, (e) => e ? console.log(e) : null);
      content = data;
    }

    log(c.white(basename(file.output)), true);

    warnings(file.base);

    return content;

  };
};

async function sass (file: IFile<IStyle>) {

  const { config } = file;

  if (file.ext === '.scss' || file.ext === '.sass') {

    try {

      let warn: number = 0;

      const { css, sourceMap } = compile(config.input, {
        sourceMapIncludeSources: false,
        style: config.sass.style,
        quietDeps: config.sass.warnings,
        sourceMap: config.sass.sourcemap,
        loadPaths: config.sass.include,
        logger: config.sass.warnings ? Logger.silent : {
          debug: msg => console.log('DEBUG', msg),
          warn: (msg, opts) => {
            log.warn(file.base, parse.sassPetty(msg, opts.span, opts.stack));
            warn = warn + 1;
          }
        }
      });

      if (config.sass.sourcemap) {
        writeFile(`${cache.styles.uri + file.base}.map`, stringify(sourceMap)).catch(e => log.error(e));
      }

      log(`${c.gray('Compiled SASS to CSS')}`);

      if (warn > 0) {
        log(c.yellowBright(`${warn} SASS ${warn > 1 ? 'warnings' : 'warning'}`));
      }

      return {
        css,
        map: sourceMap
      };

    } catch (e) {

      log.error(e);

      return null;

    }

  }

  try {

    const css = await readFile(config.input);

    return {
      css: css.toString(),
      map: null
    };

  } catch (e) {

    log.throw(e);

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

  try {

    const result = await pcss.process(css, {
      from: config.rename,
      to: config.rename,
      map: map ? { prev: map, inline: false } : null
    });

    log(c.gray('Processed CSS with PostCSS'));

    const warn = result.warnings();

    if (warn.length > 0) {
      log(c.yellowBright(`${warn.length} PostCSS ${warn.length > 1 ? 'warnings' : 'warning'}`));
      log.warn(file.base, warn.join('\n'));
    }

    return result.toString();

  } catch (e) {

    log.error(e);

  }

};

/**
 * Create inline snippet
 */
function snippet (css: string) {

  log(c.gray('Snippet Generated'));

  return '<style>' + css + '</style>';

};

/**
 * SASS and PostCSS Compiler
 */
export async function styles (file: IFile<IStyle>, cb: Syncify): Promise<string> {

  const output = write(file, cb);

  log('styles', c.cyan(file.base));

  try {

    const out = await sass(file);

    if (isNil(pcss) || (file.config.postcss === false && file.config.snippet === false)) {
      return output(out.css);
    }

    if (file.config.postcss) {
      const post = await postcss(file, out.css, out.map);
      if (file.config.snippet) return output(snippet(post));
    }

    if (file.config.snippet) return output(snippet(out.css));

    return output(out.css);

  } catch (e) {

    log.error(e);

  }

};
