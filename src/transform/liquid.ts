import { minify } from 'html-minifier-terser';
import stringify from 'fast-safe-stringify';
import { IFile, ILiquidMinifyOptions, IViews, Syncify, ITerser } from 'types';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';
import { isNil, isType } from 'rambdax';
import { Type } from 'config/file';
import { is, nil } from 'shared/native';
import { byteSize } from 'shared/helpers';
import * as log from 'cli/logs';

/* -------------------------------------------- */
/* REGEX EXPRESSIONS                            */
/* -------------------------------------------- */

/**
 * Liquid Delimiter
 */
const LiquidDelimiter = /{[{%]/g;

/**
 * Liquid Comments
 */
const LiquidComments = /{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g;

/**
 * Liquid Schema Tag
 */
const LiquidSchemaTag = /(?<={%-?\s{0,}schema\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endschema\s{0,}-?%})/;

/**
 * Liquid Strip Dash Spaces
 */
const LiquidStripDashSpace = /(?<=-?[%}]})\s(?=<\/?[a-zA-Z])/g;

/**
 * Liquid Useless Whitespace Dashes
 */
const LiquidUselessDashes = /(?<=\S){[{%]-|-?[%}]}{[{%]-?|-}[%}]<\/?(?=[a-zA-Z]{1,})/g;

/**
 * Liquid Strip Dash Spaces
 */
const HTMLStripDashSpace = /(?<=-?[%}]})\s(?=<\/?[a-zA-Z])/g;

/**
 * HTML Attribute Values
 */
const HTMLAttributeValues = /(?<==["])[\s\S]*?(?=["][a-zA-Z\s\n/{>])/g;

/**
 * Touching Attrbiutes
 */
const TouchingAttributes = /(?<=[%}]})\s(?={[{%])/g;

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
const removeAttrNewline = (content: string, options: ILiquidMinifyOptions) => {

  if (!options.removeLiquidNewlineAttributes) return content;

  return content.replace(HTMLAttributeValues, match => (

    LiquidDelimiter.test(match) ? match
      .replace(/\n/g, nil)
      .replace(/\s{2,}/g, ' ')
      .replace(TouchingAttributes, nil) : match

  ));

};

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML terser.
 */
const removeComments = (content: string, options: ILiquidMinifyOptions) => {

  if (!options.removeLiquidComments) return removeAttrNewline(content, options);

  const remove = content.replace(LiquidComments, nil);

  return removeAttrNewline(remove, options);

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
const minifySchema = (file: IFile, content: string, options: ILiquidMinifyOptions) => {

  if (!options.minifySectionSchema) return removeComments(content, options);

  const minified = content.replace(LiquidSchemaTag, data => {

    try {

      const parsed = JSON.parse(data);
      const minified = stringify(parsed, null, 0);

      log.fileTask(file, 'minified JSON section schema');

      return minified;

    } catch (e) {

      log.fileError(e);

      return data;

    }

  });

  return removeComments(minified, options);

};

/**
 * Remove Extranous Whitespace Dashes
 *
 * Strips Liquid whitespace dashes when previous characters
 * are of not whitespace. this is executed in the post-minify
 * cycle and will help reduce the render times imposed by Liquid.
 */
const removeDashes = (content: string, options: ILiquidMinifyOptions) => {

  if (!options.removeRedundantWhitespaceDashes) return content;

  return content
    .replace(HTMLStripDashSpace, nil)
    .replace(LiquidStripDashSpace, nil)
    .replace(LiquidUselessDashes, m => m.replace(/-/g, nil));
};

/**
 * HTML Minfication
 *
 * Executes html terser on remaining document contents
 * and applied rules that were previously setup in config.
 */
const htmlMinify = async (content: string, terser: ITerser) => {

  try {

    const htmlmin = await minify(content, terser);

    return htmlmin;

  } catch (error) {

    log.errors(error);

    return null;

  }

};

/**
 * Liquid File Transforms
 *
 * Applies minification and handles `.liquid` files.
 * Determines what action should take place.
 */
const transform = (file: IFile, config: IViews['minify']) => async (data: string) => {

  if (!config.apply) return data;

  const content = is(file.type, Type.Section)
    ? minifySchema(file, data, config.liquid)
    : removeComments(data, config.liquid);

  const htmlmin = await htmlMinify(content, config.terser);

  if (isNil(htmlmin)) return data;

  const postmin = removeDashes(htmlmin, config.liquid);

  writeFile(join(file.output, file.key), postmin, (e) => e ? log.errors(e) : null);

  log.fileTask(file, 'minified liquid + html');
  log.fileSize(file.size, byteSize(postmin));

  return postmin;

};

/* -------------------------------------------- */
/* EXPORTED FUNCTION                            */
/* -------------------------------------------- */

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export const compile = async (file: IFile, config: IViews['minify'], cb: typeof Syncify.hook) => {

  const read = await readFile(file.path);

  file.size = byteSize(read);

  const edit = transform(file, config);
  const data = read.toString();

  if (!isType('Function', cb)) return edit(data);

  const update = cb.apply({ ...file }, data);

  if (isType('Undefined', update) || update === false) {

    return edit(data);

  } else if (isType('String', update)) {

    return edit(update);

  } else if (Buffer.isBuffer(update)) {

    return edit(update.toString());

  }

  return edit(data);

};
