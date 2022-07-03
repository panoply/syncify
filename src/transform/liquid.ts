import { minify } from 'html-minifier-terser';
import stringify from 'fast-safe-stringify';
import { IFile, Syncify, IHTML } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil, isType } from 'rambdax';
import { Type } from 'process/files';
import { is, nil } from 'shared/native';
import { byteSize, byteConvert } from 'shared/shared';
import { log, c } from 'cli/log';
import { terser } from '../options/index';

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
const removeAttrNewline = (content: string) => {

  if (!terser.liquid.removeLiquidNewlineAttributes) return content;

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
const removeComments = (content: string) => {

  if (!terser.liquid.removeLiquidComments) return removeAttrNewline(content);

  const remove = content.replace(LiquidComments, nil);

  return removeAttrNewline(remove);

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
const minifySchema = (content: string) => {

  if (!terser.liquid.minifyLiquidSectionSchema) return removeComments(content);

  const minified = content.replace(LiquidSchemaTag, data => {

    try {

      const parsed = JSON.parse(data);
      const minified = stringify(parsed, null, 0);

      return minified;

    } catch (e) {

      log.error(e);

      return data;

    }

  });

  return removeComments(minified);

};

/**
 * Remove Extranous Whitespace Dashes
 *
 * Strips Liquid whitespace dashes when previous characters
 * are of not whitespace. this is executed in the post-minify
 * cycle and will help reduce the render times imposed by Liquid.
 */
const removeDashes = (content: string) => {

  if (!terser.liquid.stripRedundantWhitespaceDashes) return content;

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
const htmlMinify = async (content: string, terser: IHTML) => {

  try {

    const htmlmin = await minify(content, terser);

    return htmlmin;

  } catch (error) {

    log.error(error);

    return null;

  }

};

/**
 * Liquid File Transforms
 *
 * Applies minification and handles `.liquid` files.
 * Determines what action should take place.
 */
const transform = (file: IFile) => async (data: string) => {

  if (!terser.minify.html) {
    await writeFile(file.output, data);
    return data;
  }

  const content = is(file.type, Type.Section)
    ? minifySchema(data)
    : removeComments(data);

  const htmlmin = await htmlMinify(content, terser.html);

  if (isNil(htmlmin)) {
    await writeFile(file.output, data);
    return data;
  }

  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, nil);

  await writeFile(file.output, postmin);

  const size = byteSize(postmin);

  log(c.gray('Minified Liquid and HTML'));
  log(c.gray(`${byteConvert(size)} (saved ${byteConvert(file.size - size)})`), true);

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
export async function compile (file: IFile, cb: Syncify) {

  const read = await readFile(file.input);

  file.size = byteSize(read);

  const edit = transform(file);
  const data = read.toString();

  log(file.namespace, c.cyan(file.key));

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
