import { minify } from 'html-minifier-terser';
import { IFile, ILiquidMinifyOptions, IViews, Syncify } from 'types';
import { join } from 'path';
import * as log from 'cli/logs';
import { readFile, writeFile } from 'fs-extra';
import { isType } from 'rambdax';
import { Type } from 'config/file';
import { is, nil } from 'utils/native';
import * as R from 'utils/regex';

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
function minifySchema (content: string, options: ILiquidMinifyOptions) {

  if (!options.minifySectionSchema) return removeComments(content, options);

  const minified = content.replace(R.LiquidSchemaTag, data => {

    try {

      const parsed = JSON.parse(data);
      const minified = JSON.stringify(parsed, null, 0);

      return minified;

    } catch (e) {

      log.error(e);

      return data;

    }

  });

  return removeComments(minified, options);

}

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
function removeComments (content: string, options: ILiquidMinifyOptions) {

  if (!options.removeLiquidComments) return stripNewlinesFromAttrs(content, options);

  const minified = content.replace(R.LiquidComments, nil);

  return stripNewlinesFromAttrs(minified, options);

}

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
function stripNewlinesFromAttrs (content: string, options: ILiquidMinifyOptions) {

  if (!options.removeLiquidNewlineAttributes) return content;

  return content.replace(R.HTMLAttributeValues, match => {

    return R.LiquidDelimiter.test(match)
      ? match
        .replace(/\n/g, nil)
        .replace(/\s{2,}/g, ' ')
        .replace(/(?<=[%}]})\s(?={[{%])/g, nil)
      : match;

  });

}

/**
 * Remove Extranous Whitespace Dashes
 *
 * Strips Liquid whitespace dashes when previous characters
 * are of not whitespace. this is executed in the post-minify
 * cycle and will help reduce the render times imposed by Liquid.
 */
function stripExtranousDashes (content: string, options: ILiquidMinifyOptions) {

  if (!options.removeRedundantWhitespaceDashes) return content;

  return content
    .replace(/(?<=[>}])\s(?={[{%])/g, nil)
    .replace(/(?<=-?[%}]})\s(?=<\/?[a-zA-Z])/g, nil)
    .replace(/(?<=\S){[{%]-|-?[%}]}{[{%]-|-[%}]}<\/?(?=[a-zA-Z]{1,})/g, match => match.replace(/-/g, nil));
}

function transform (file: IFile, config: IViews['minify']) {

  return async (data: string) => {

    if (!config.apply) return Buffer.from(data).toString('base64');

    const content = is(file.type, Type.Section)
      ? minifySchema(data, config.liquid)
      : removeComments(data, config.liquid);

    const htmlmin = await minify(content, config.terser);
    const minified = stripExtranousDashes(htmlmin, config.liquid);

    await writeFile(join(file.output, file.key), minified);

    log.created(file.key);

    return Buffer.from(minified).toString('base64');

  };

}

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: IFile, config: IViews['minify'], callback: typeof Syncify.hook) {

  const read = await readFile(file.path);
  const edit = transform(file, config);
  const data = read.toString();

  if (!isType('Function', callback)) return edit(data);

  const update = callback.apply({ ...file }, data);

  if (isType('Undefined', update) || update === false) {

    return edit(data);

  } else if (isType('String', update)) {

    return edit(update);

  } else if (Buffer.isBuffer(update)) {

    return edit(update.toString());

  }

  return edit(data);

}
