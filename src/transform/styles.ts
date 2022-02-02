import { compileString } from 'sass';
import * as log from 'cli/logs';
import * as parse from 'cli/parse';
import { is } from 'utils/native';
import { IFile, IStyle } from 'types';
import { writeFile } from 'fs-extra';
import { Processor } from 'postcss';
import { isNil } from 'rambdax';
import { Type } from 'config/file';

/**
 * PostCSS Module
 */
let postcss: Processor = null;

/**
 * Loads PostCSS
 *
 * This is executed and the `postcss` variable is
 * assigned upon initialization.
 */
export function processer (path: string) {

  postcss = require('postcss')(require(path));

}

/**
 * Create inline snippet
 */
function snippet (isSnippet: boolean, css: string) {

  return Buffer.from(isSnippet ? '<style>' + css + '</style>' : css);

}

function sass (config: IStyle, data: string) {

  const { css, sourceMap } = compileString(data, {
    sourceMapIncludeSources: true,
    style: 'compressed',
    sourceMap: true, // or an absolute or relative (to outFile) path
    loadPaths: config.include
  });

  return {
    to: config.output,
    css,
    map: sourceMap
  };
}

/**
 * Post Processor
 *
 * Runs postcss on compiled SASS or CSS styles
 */
async function postprocess ({ css, map, to }: any) {

  const result = await postcss.process(css, {
    from: undefined,
    to,
    map: map ? {
      prev: map,
      inline: false
    } : null
  });

  result.warnings().forEach(warning => log.warn(parse.postcss(warning)));

  return result.toString();

}

function write (request: any, file: IFile<IStyle>) {

  return async (css: Buffer, _map?: string) => {

    try {

      writeFile(file.output, css);

      return request('put', file, css.toString('base64'));

    } catch (e) {

      return log.error(e);

    }
  };

}

/**
 * SASS and PostCSS Compiler
 */
export async function compile (file: IFile<IStyle>, data: string, request: any) {

  const generate = write(request, file);

  if (is(file.type, Type.SASS)) {

    const compiled = sass(file.config, data);
    const css = isNil(postcss)
      ? compiled.css
      : await postprocess(compiled);

    return generate(snippet(file.config.snippet, css), compiled.map);

  }

  if (!isNil(postcss)) {
    if (is(file.type, Type.CSS)) {

      const css = await postprocess({
        css: data,
        map: undefined,
        to: file.output
      });

      return generate(snippet(file.config.snippet, css), null);

    }
  }

  return generate(snippet(file.config.snippet, data), null);

}
