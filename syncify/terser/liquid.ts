import { $ } from 'syncify:state';
import { SchemaSectionTag } from 'types/internal';

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

/**
 * Remove Liquid Comments
 *
 * Strips Liquid comments from file content.
 */
export function removeComments (content: string) {

  if ($.terser.liquid.removeComments === false) return content;

  let output: string = content;

  output = output.replace(/{%-?\s*comment\s*-?%}[\s\S]+?{%-?\s*endcomment\s*-?%}/g, NIL);
  output = output.replace(/{%-?\s*#[\s\S]+?%}/g, NIL);
  output = output.replace(/{%-?\s*liquid[\s\S]+?%}/g, tag => NWL + tag.replace(/#.*?$/gm, NIL) + NWL);

  return output;

};

/**
 * Minify Section Schema
 *
 * Minfies the contents of a `{% schema %}` tag within sections.
 */
export function minifySchema (schema: SchemaSectionTag) {

  if ($.terser.liquid.minifySchema === false) {
    if ($.processor.json.useTab) {
      return JSON.stringify(schema, null, '\t'.repeat($.processor.json.indent));
    } else {
      return JSON.stringify(schema, null, $.processor.json.indent);
    }
  }

  return JSON.stringify(schema, null, 0);

};

/**
 * Remove Extranous Whitespace Dashes
 *
 * Strips Liquid whitespace dashes when previous characters
 * are of not whitespace. this is executed in the post-minify
 * cycle and will help reduce the render times imposed by Liquid.
 */
export function removeDashes (content: string) {

  if (!$.terser.liquid.stripDashes) return content;

  return content;

};
