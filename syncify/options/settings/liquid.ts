import anymatch from 'anymatch';
import { $import } from 'modules';

import { typeError, warnOption } from '~cli/throws';
import { has, isBoolean, isEmpty, isObject } from '~utils';
import { getResolvedPaths } from '~options/utils';

import { $ } from '$';

const LIQUID_TERSE_KEYS = [
  'minifySchema'
];

const MARKUP_TERSE_KEYS = [
  'minifyCSS',
  'minifyJS',
  'collapseWhitespace',
  'removeComments'
];

/**
 * Liquid Transform
 *
 * Currently we only process the `terse` option.
 */
export function setLiquidOptions () {

  if (!has('liquid', $.config.transform) || isEmpty($.config.transform.liquid)) return;

  if (!isObject($.config.transform.liquid)) {
    typeError(
      {
        option: 'transform',
        name: 'liquid',
        expects: '{}',
        provided: typeof $.config.transform.liquid
      }
    );
  }

  const warn = warnOption('Liquid Transform');

  if (has('terse', $.config.transform.liquid) && $.mode.terse === true) {

    $import('html-minifier-terser');

    if (isEmpty($.config.transform.liquid.terse)) {

      $.liquid.terse.enabled = false;

      warn('Terse option is empty, minification will not apply');

    } else if (isBoolean($.config.transform.liquid) && $.config.transform.liquid === true) {

      $.liquid.terse.enabled = true;

    } else if (isObject($.config.transform.liquid.terse)) {

      $.liquid.terse.enabled = true;

      const { terse } = $.config.transform.liquid;

      for (const p of LIQUID_TERSE_KEYS) {
        if (has(p, terse)) $.liquid.terse.liquid[p] = terse[p];
      }

      for (const p in MARKUP_TERSE_KEYS) {
        if (has(p, terse)) $.liquid.terse.markup[p] = terse[p];
      }

      if (has('exclude', terse)) {
        $.liquid.terse.exclude = anymatch(getResolvedPaths<string[]>(terse.exclude));
      }
    }

  }

};
