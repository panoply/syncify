import { typeError, warnOption } from 'syncify:log/throws';
import { isBoolean, isObject, has, isEmpty } from 'syncify:utils';
import { $ } from 'syncify:state';
import anymatch from 'anymatch';
import { getResolvedPaths } from 'syncify:utils/options';

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

  const { mode } = $;

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

  const warn = warnOption('liquid configuration');

  if (has('terse', $.config.transform.liquid) && mode.terse === true) {

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
