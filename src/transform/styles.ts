import type { Processor } from 'postcss';
import { IFile, IStyle } from 'types';
import { compile, Logger } from 'sass';
import stringify from 'fast-safe-stringify';
import { readFile, writeFile } from 'fs-extra';
import { isNil, pipeAsync } from 'rambdax';
import { Type } from 'utils/files';
import { is } from 'utils/native';
import * as c from 'cli/ansi';
import * as parse from 'cli/parse';
import { log } from 'cli/stdout';

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
export const processer = (path: string) => {

  pcss = require('postcss')(require(path));

};

const write = (path: string) => (data: string) => {

  if (isNil(data)) return null;

  writeFile(path, data, (e) => e ? console.log(e) : null);

  return data;

};

const sass = async (file: IFile<IStyle>) => {

  const { config, type, base } = file;

  if (is(type, Type.SASS)) {

    try {

      const { css, sourceMap } = compile(config.input, {
        sourceMapIncludeSources: false,
        style: config.sass.style,
        quietDeps: config.sass.warnings,
        sourceMap: config.sass.sourcemap,
        loadPaths: config.sass.include,
        logger: config.sass.warnings ? {
          debug: log.sassDebug,
          warn: log.sassWarn
        } : Logger.silent
      });

      if (config.sass.sourcemap) write(config.cache + base + '.map')(stringify(sourceMap));

      log.fileTask(file, `compiled ${c.bold('sass')} to ${c.bold('css')}`);

      return [
        css,
        sourceMap,
        config
      ];

    } catch (e) {

      log.sassError(e);

      return null;

    }

  }

  try {

    const css = await readFile(config.input);

    return [ css.toString(), null, config ];

  } catch (e) {

    log.throw(e);
  }

};

/**
 * Post Processor
 *
 * Runs postcss on compiled SASS or CSS styles
 */
const postcss = async (params:[ string, any, IStyle]) => {

  if (isNil(params)) return null;

  const [ css, map, style ] = params;

  if (isNil(postcss) || style.postcss === false) return [ css, style ];

  const result = await pcss.process(css, {
    from: style.output,
    to: style.output,
    map: map ? { prev: map, inline: false } : null
  });

  result.warnings().forEach(warning => log.fileWarn(parse.postcss(warning)));

  return [ result.toString(), style ];

};

/**
 * Create inline snippet
 */
const snippet = (params: [ string, IStyle ]) => {

  if (isNil(params)) return null;

  return params[1].snippet ? '<style>' + params[0] + '</style>' : params[0];

};

/**
 * SASS and PostCSS Compiler
 */
export const transform = async (file: IFile<IStyle>): Promise<string> => {

  const output = write(file.output);

  return pipeAsync<string>(sass, postcss, snippet, output)(file);

};
