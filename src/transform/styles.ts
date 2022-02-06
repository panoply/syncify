import { compile, Logger } from 'sass';
import c from 'ansis';
import * as log from 'cli/logs';
import * as parse from 'cli/parse';
import { is } from 'shared/native';
import { IFile, IStyle } from 'types';
import { readFile, writeFile } from 'fs-extra';
import type { Processor } from 'postcss';
import { isNil, pipeAsync } from 'rambdax';
import { Type } from 'config/file';
import stringify from 'fast-safe-stringify';

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
        loadPaths: config.include,
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

    log.throws(e);
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
