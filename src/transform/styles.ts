import type { Processor } from 'postcss';
import { IFile, IStyle } from 'types';
import { compile, Logger } from 'sass';
import { basename } from 'path';
import stringify from 'fast-safe-stringify';
import { readFile, writeFile } from 'fs-extra';
import { isNil, pipeAsync } from 'rambdax';
import * as c from 'cli/ansi';
import * as parse from 'cli/parse';
import { log } from 'cli/stdout';
import { message, newline } from 'cli/tui';
import { cache } from 'options';

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

const write = (path: string) => (data: string) => {

  if (isNil(data)) return null;

  writeFile(path, data, (e) => e ? console.log(e) : null);

  process.stdout.write(
    message(`${c.cyan(basename(path))}`, {
      indent: true,
      ender: true
    })
  );

  process.stdout.write(newline());

  return data;

};

async function sass ({ config, ext, base }: IFile<IStyle>) {

  if (ext === '.scss' || ext === '.sass') {

    try {

      const { css, sourceMap } = compile(config.input, {
        sourceMapIncludeSources: false,
        style: config.sass.style,
        quietDeps: config.sass.warnings,
        sourceMap: config.sass.sourcemap,
        loadPaths: config.sass.include,
        logger: config.sass.warnings ? {
          debug: log.error,
          warn: log.error
        } : Logger.silent
      });

      if (config.sass.sourcemap) {
        writeFile(`${cache.styles.uri + base}.map`, stringify(sourceMap)).catch(e => log.error(e));
      }

      process.stdout.write(
        message(`${c.gray('compiled SASS to CSS')}`, {
          indent: true
        })
      );

      return [
        css,
        sourceMap,
        config
      ];

    } catch (e) {

      log.error(e);

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
async function postcss (params:[ string, any, IStyle]) {

  if (isNil(params)) return null;

  const [ css, map, style ] = params;

  if (isNil(postcss) || style.postcss === false) {

    process.stdout.write(
      message(`${c.gray('skipping')} ${c.gray('postcss')}`, {
        indent: true,
        ender: false
      })
    );

    return [ css, style ];

  }

  const result = await pcss.process(css, {
    from: style.rename,
    to: style.rename,
    map: map ? { prev: map, inline: false } : null
  });

  result.warnings().forEach(warning => log.warning(parse.postcss(warning)));

  process.stdout.write(
    message(`${c.gray('processed CSS with PostCSS')}`, {
      indent: true,
      ender: false
    })
  );

  return [ result.toString(), style ];

};

/**
 * Create inline snippet
 */
function snippet (params: [ string, IStyle ]) {

  if (isNil(params)) return null;

  return params[1].snippet ? '<style>' + params[0] + '</style>' : params[0];

};

/**
 * SASS and PostCSS Compiler
 */
export async function styles (file: IFile<IStyle>): Promise<string> {

  const output = write(file.output);

  log.styles(`${c.pink(file.base)}`);

  return pipeAsync<string>(
    sass,
    postcss,
    snippet,
    output
  )(file);

};
