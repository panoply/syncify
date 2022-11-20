import { minify as terser } from 'html-minifier-terser';
import { File, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil, isType } from 'rambdax';
import { Type } from '~process/files';
import { nil } from '~utils/native';
import { byteConvert, byteSize, fileSize } from '~utils/utils';
import { bundle, minify } from '~config';
import * as timer from '~utils/timer';
import { log } from '~log';

/* -------------------------------------------- */
/* REGEX EXPRESSIONS                            */
/* -------------------------------------------- */

/**
 * Liquid Comments
 */
const LiquidLineComments = /{%-?\s*#[\s\S]+?%}/g;

/**
 * Liquid Comments
 */
const LiquidBlockComments = /{%-?\s*comment\s*-?%}[\s\S]+?{%-?\s*endcomment\s*-?%}/g;

/**
 * Liquid Strip Dash Spaces
 */
const LiquidTag = /{%-?\s*liquid[\s\S]+?%}/g;

const ScriptJsonWhitespace = /[^,:'"a-zA-Z0-9=] +[^'"a-zA-Z0-9=}{]/g;

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML bundle.minify.
 */
function removeComments (content: string) {

  return minify.liquid.removeComments ? content
    .replace(LiquidBlockComments, nil)
    .replace(LiquidLineComments, nil) : content;

};

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML bundle.minify.
 */
function minifyLiquidTag (content: string) {

  return content.replace(LiquidTag, (tag) => '\n' + tag.replace(/#.*?$/gm, nil) + '\n');

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
function minifySchema (file: File, content: string) {

  if (!minify.liquid.minifySchema) return removeComments(content);

  const open = content.search(/{%-?\s*schema/);

  if (open > -1) {

    const begin = content.indexOf('%}', open + 2) + 2;
    const start = content.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);

    if (ender > -1) {
      const parse = JSON.parse(content.slice(begin, ender));
      const minified = JSON.stringify(parse, null, 0);
      const schema = content.slice(0, begin) + minified + content.slice(ender);
      return removeComments(schema);
    }

    log.invalid(file.relative);

  }

  return removeComments(content);

};

/**
 * Remove Extranous Whitespace Dashes
 *
 * Strips Liquid whitespace dashes when previous characters
 * are of not whitespace. this is executed in the post-minify
 * cycle and will help reduce the render times imposed by Liquid.
 */
function removeDashes (content: string) {

  if (!minify.liquid.stripDashes) return content;

  return content;

};

/**
 * HTML Minfication
 *
 * Executes html terser on remaining document contents
 * and applied rules that were previously setup in config.
 */
async function htmlMinify (file: File, content: string) {

  try {

    const htmlmin = await terser(content, minify.html);

    return htmlmin;

  } catch (e) {

    log.invalid(file.relative);
    console.error(e);

    return null;

  }

};

/**
 * Liquid File Transforms
 *
 * Applies minification and handles `.liquid` files.
 * Determines what action should take place.
 */
const transform = (file: File) => async (data: string) => {

  if (!bundle.mode.minify) {
    await writeFile(file.output, data);
    log.transform(`${file.namespace} → ${byteConvert(file.size)}`);
    return data;
  }
  let htmlmin: string;

  if (file.base.endsWith('.js.liquid')) {

    htmlmin = data
      .replace(ScriptJsonWhitespace, nil)
      .replace(/(?<=[:,]) +(?=['"{[])/g, nil);

  } else if (file.base.endsWith('.json.liquid')) {

    htmlmin = JSON.stringify(JSON.parse(data), null, 0);

  } else {

    const content = file.type === Type.Section
      ? minifySchema(file, data)
      : removeComments(data);

    const htmlterser = await htmlMinify(file, content);

    htmlmin = minifyLiquidTag(htmlterser);

  }

  log.process('HTML Terser', timer.now());

  if (isNil(htmlmin)) {
    await writeFile(file.output, data);
    return data;
  }

  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, nil);

  await writeFile(file.output, postmin);

  if (!bundle.mode.build) {
    const size = fileSize(data, file.size);
    if (size.isSmaller) {
      log.transform(`${file.namespace} ${size.before} → gzip ${size.gzip}`);
    } else {
      log.minified('Liquid', size.before, size.after, size.saved);
    }
  }

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
export async function compile (file: File, cb: Syncify) {

  if (bundle.mode.watch) timer.start();

  const read = await readFile(file.input);

  file.size = byteSize(read);

  const edit = transform(file);
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
