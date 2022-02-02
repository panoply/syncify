import { compile } from 'sass';
import * as log from 'cli/logs';
import * as parse from 'cli/parse';
import { is, isUndefined } from 'utils/native';
import { IFile, IStyle, Methods } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { Processor } from 'postcss';
import { isNil, pipeAsync, curry, F } from 'rambdax';
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

const write = (path: string) => (data: Buffer | string) => {

  writeFile(path, data, (e) => e ? console.log(e) : null);

  return data;

};

const sass = async ({ config, type, base }: IFile<IStyle>) => {

  if (is(type, Type.SASS)) {

    const { css, sourceMap } = compile(config.input, {
      sourceMapIncludeSources: true,
      style: 'compressed',
      sourceMap: true, // or an absolute or relative (to outFile) path
      loadPaths: config.include
    });

    log.updated('processed scss');

    write(config.cache + base + '.map')(stringify(sourceMap));

    return [
      css,
      sourceMap,
      config
    ];

  }

  try {

    const css = await readFile(config.input);

    return [ css.toString(), null, config ];

  } catch (e) {

    log.error(e);
  }

};

/**
 * Post Processor
 *
 * Runs postcss on compiled SASS or CSS styles
 */
const postcss = async ([ css, map, style ]:[ string, any, IStyle]) => {

  if (isNil(postcss)) return css;

  const result = await pcss.process(css, {
    from: style.output,
    to: style.output,
    map: map ? { prev: map, inline: false } : null
  });

  result.warnings().forEach(warning => log.warn(parse.postcss(warning)));

  return [ result.toString(), style ];

};

/**
 * Create inline snippet
 */
const snippet = ([ css, style ]:[ string, IStyle ]) => {

  return style.snippet ? '<style>' + css + '</style>' : css;

};

/**
 * SASS and PostCSS Compiler
 */
export async function transform (
  file: IFile<IStyle>,
  request?: (
    method: Methods,
    file: IFile,
    content: string
  ) => Promise<void>
) {

  log.updated(file.key);

  const queue = isUndefined(request) ? (a, b) => F : curry(request);
  const output = write(file.output);

  return pipeAsync(
    sass,
    postcss,
    snippet,
    Buffer.from,
    output,
    queue('put', file)
  )(file);

}
