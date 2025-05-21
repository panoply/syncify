import { relative } from 'node:path';

import { readFile, writeFile } from 'fs-extra';
import { $import } from 'modules';

import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { error } from '~errors';
import { File, Type } from '~file';
import { injectRenderSnippet } from '~hot/snippet';
import { themeFilesUpsertMap } from '~http/themeFiles';
import { CreateSection } from '~schema';
import { tailwindParse } from '~style';
import * as util from '~utils';

import { $, q } from '$';

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

  return $.liquid.terse.markup.removeComments ? content
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

  if (!$.liquid.terse.liquid.minifySchema) return removeComments(content);

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

  if (!$.liquid.terse.liquid.stripTrims) return content;

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

    const htmlmin = await $import.terser.minify(content, $.liquid.terse.markup);

    return htmlmin;

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: 'Parse Error',
        message: `Terse minification error in ${file.base}`
      }
    });

    error.terser(file, e);

    return null;

  }

};

/**
 * Liquid File Transforms
 *
 * Applies minification and handles `.liquid` files.
 * Determines what action should take place.
 */
async function transform (file: File, data: string) {

  if (!$.mode.terse) {

    writeFile(file.output, data).catch(
      error.write('Error writing liquid file to output', {
        input: file.relative,
        output: relative($.cwd, file.output)
      })
    );

    log.transform(
      util.toUpcase(file.namespace),
      file.kind,
      util.byteConvert(file.size),
      timer.now()
    );

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

  if (util.isNil(htmlmin)) {

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

  const size = util.sizeDiff(data, file.size);

  if (size.isSmaller) {
    log.transform(`${file.namespace} ${size.before} → brotli ${size.brotli}`);
  } else {
    log.minified('Liquid', size.before, size.after, size.saved);
  }

  return postmin;

};

export async function LiquidTransform (file: File) {

  if ($.mode.watch) timer.start();

  let input = await readFile(file.input, 'utf8');

  if ($.mode.hot && $.hot.layouts.includes(file.base)) {

    input = injectRenderSnippet(input);

  }

  if (file.type === Type.Section || file.type === Type.Block) {
    input = await CreateSection(file);
    if (input === null) return null;
  }

  file.size = util.byteSize(input);
  file.value = await transform(file, input);

  if ($.mode.build) return file.value;
  if (file.type !== Type.Style && $.processor.tailwind.map !== null) {

    await tailwindParse(file).then(themeFilesUpsertMap);

  } else {

    log.syncing(file.key, { hot: $.mode.hot });

    await themeFilesUpsertMap(file);

  }

  if ($.mode.hot && $.mode.bulk === false) {
    if (file.type === Type.Section) {

      $.wss.alias(JSON.stringify($.hot.alias));
      $.wss.section(file.name);

    } else {

      await q.http.onIdle().then(() => $.wss.replace());

    }
  }

  return file.value;

};
