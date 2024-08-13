import type { ClientParam, Syncify } from 'types';
import { minify } from 'html-minifier-terser';
import { relative } from 'pathe';
import { readFile, writeFile } from 'fs-extra';
import { File, Type } from 'syncify:file';
import { queue } from 'syncify:requests/client';
import { hasSnippet, inject, removeRender } from 'syncify:hot/inject';
import { byteConvert, byteSize, sizeDiff } from 'syncify:sizes';
import { timer } from 'syncify:timer';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { CreateSection } from 'syncify:schema';
import { checksum, isBuffer, isFunction, isString, isUndefined, isNil, toUpcase } from 'syncify:utils';
import { tailwindParse } from 'syncify:style';
import { $ } from 'syncify:state';

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
 * Liquid Tag Preservation
 */
const LiquidTag = /{%-?\s*liquid[\s\S]+?%}/g;

/**
 * JSON Whitespace
 */
const ScriptJsonWhitespace = /[^,:'"a-zA-Z0-9=] +[^'"a-zA-Z0-9=}{]/g;

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML $.minify.
 */
function removeComments (content: string) {

  return $.terser.liquid.removeComments ? content
  .replace(LiquidBlockComments, NIL)
  .replace(LiquidLineComments, NIL) : content;

};

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 * This is executed before passing to HTML $.minify.
 */
function minifyLiquidTag (content: string) {

  return content.replace(LiquidTag, (tag) => '\n' + tag.replace(/#.*?$/gm, NIL) + '\n');

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag
 * from within sections.
 */
function minifySchema (file: File, content: string) {

  if (!$.terser.liquid.minifySchema) return removeComments(content);

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

  if (!$.terser.liquid.stripDashes) return content;

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

    const htmlmin = await minify(content, $.terser.markup);

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

  if (file.type === Type.Layout && $.mode.hot) {
    if (hasSnippet(data) === false) {
      data = inject(data);
    }
  }

  if (!$.mode.terse) {

    writeFile(file.output, data).catch(
      error.write('Error writing liquid file to output', {
        input: file.relative,
        output: relative($.cwd, file.output)
      })
    );

    log.transform(file.kind, toUpcase(file.namespace), byteConvert(file.size), timer.now());

    return data;

  }

  let htmlmin: string;

  if (file.base.endsWith('.js.liquid')) {

    htmlmin = data
    .replace(ScriptJsonWhitespace, NIL)
    .replace(/(?<=[:,]) +(?=['"{[])/g, NIL)
    .replace(/{{%/g, '{ {%')
    .replace(/%}}/g, '%} }')
    .replace(/(?<=[%}]})\s+(?=[\]}])/g, ' ')
    .replace(/>\s+(?=[{[])/, '>')
    .replace(/(?<=[}\]])\s<\//g, '</');

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

    writeFile(file.output, data).catch(
      error.write('Error writing liquid file to output', {
        input: file.relative,
        output: relative($.cwd, file.output)
      })
    );

    return data;
  }

  const postmin = removeDashes(htmlmin).replace(/^\s+/gm, NIL);

  writeFile(file.output, postmin);

  const size = sizeDiff(data, file.size);

  if (size.isSmaller) {
    log.transform(`${file.namespace} ${size.before} → gzip ${size.gzip}`);
  } else {
    log.minified('Liquid', size.before, size.after, size.saved);
  }

  return postmin;

};

/**
 * Minifier
 *
 * Compiles file content and applies minification
 * returning the base64 processed string.
 */
export async function compile (file: File, sync: ClientParam<File>, cb: Syncify) {

  if ($.mode.watch) timer.start();

  const read = await readFile(file.input);

  let input = read.toString();

  if ($.mode.build) {
    if (file.namespace === 'layout') {
      if (hasSnippet(input)) {
        input = removeRender(input);
      }
    }
  }

  if (file.type === Type.Section) {
    const section = await CreateSection(file);
    if (section === null) return null;
    input = section;
  }

  file.size = byteSize(input);

  const edit = transform(file);

  let content: string;

  if (isFunction(cb)) {

    const update = cb.apply({ ...file }, input);

    if (isUndefined(update) || update === false) {
      content = await edit(input);
    } else if (isString(update)) {
      content = await edit(update);
    } else if (isBuffer(update)) {
      content = await edit(update.toString());
    }

  } else {
    content = await edit(input);
  }

  $.cache.checksum[file.input] = checksum(content);

  if ($.processor.tailwind.map !== null && file.type !== Type.Style) {

    const request = await tailwindParse(file, [ [ file, content ] ]);

    for (const req of request) {
      await sync('put', req[0], req[1]);
      log.syncing(req[0].key);
    }

  } else {

    log.syncing(file.key);

    await sync('put', file, content);

  }

  if ($.mode.hot) {
    if (file.type === Type.Section) {
      $.wss.section(file.name);
    } else {
      await queue.onIdle().then(() => $.wss.replace());
    }
  }

};
