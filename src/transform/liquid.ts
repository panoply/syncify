import { minify as terser } from 'html-minifier-terser';
import { File, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isNil, isType } from 'rambdax';
import { Type } from '../process/files';
import { is, nil } from '../shared/native';
import { byteConvert, byteSize, fileSize } from '../shared/utils';
import { log, c } from '../logger';
import { bundle, minify } from '../config';
import * as timer from '../process/timer';

/* -------------------------------------------- */
/* REGEX EXPRESSIONS                            */
/* -------------------------------------------- */

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

  return minify.liquid.removeComments
    ? content.replace(LiquidComments, nil)
    : content;

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
function minifySchema (file: File, content: string) {

  if (!minify.liquid.minifySchema) return removeComments(content);

  const minified = content.replace(LiquidSchemaTag, data => {

    const before = byteSize(data);

    try {

      const parsed = JSON.parse(data);
      const minified = JSON.stringify(parsed, null, 0);
      const after = byteSize(data);

      log.transform(`minified section ${c.bold('schema')} ~ saved ${byteConvert(before - after)}`);
      return minified;

    } catch (e) {

      log.error('error occured minifying schema', file);
      log.throws(e);

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
function removeDashes (content: string) {

  if (!minify.liquid.stripDashes) return content;

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
async function htmlMinify (file: File, content: string) {

  try {

    const htmlmin = await terser(content, minify.html);

    return htmlmin;

  } catch (e) {

    log.error('error occured during minfication', file);
    log.throws(e);

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
    log.transform(`${c.bold(file.namespace)} → ${byteConvert(file.size)}`);
    return data;
  }

  const content = is(file.type, Type.Section)
    ? minifySchema(file, data)
    : removeComments(data);

  const htmlmin = await htmlMinify(file, content);

  log.process('HTML Terser', timer.now());

  if (isNil(htmlmin)) {
    await writeFile(file.output, data);
    return data;
  }

  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, nil);

  await writeFile(file.output, postmin);

  const { isSmaller, after, before, gzip, saved } = fileSize(data, file.size);

  if (isSmaller) {
    log.transform(`${c.bold('View')} ${before} → gzip ${gzip}`);
  } else {
    log.transform(`${c.bold('View')} minified ${before} to ${after} ${c.gray(`~ saved ${saved}`)}`);
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
