import anymatch from 'anymatch';

import { ARR } from '@syncify/ansi';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { getResolvedPaths } from '~options/utils';
import { has, isArray, isBoolean, isEmpty, isNil, isNumber, isObject, isString } from '~utils';

import { $ } from '$';

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function setJsonOptions () {

  if (!has('transform', $.config) || !has('json', $.config.transform)) return;

  const { json } = $.config.transform;

  if (isNil(json)) return;

  // Ensure the section option is an object
  if (!isObject(json)) {
    throws.typeError(
      {
        option: 'processors',
        name: 'json',
        expects: '{}',
        provided: typeof json
      }
    );
  }

  if (isEmpty(json)) return;

  const warn = warnOption('JSON Transform');

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate the indent number
    if (option === 'indent') {
      if (isNumber(json[option])) {

        $.json[option] = $.json.options.indentSize = json[option];

      } else {
        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'number'
          }
        );
      }
    } else if (option === 'crlf') {
      if (isBoolean(json[option])) {

        $.json[option] = $.json.options.crlf = json[option];

      } else {
        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'number'
          }
        );
      }
    } else if (option === 'stripComments') {

      if (isBoolean(json[option])) {

        $.json[option] = $.json.options.removeComments = json[option];

      } else {

        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean'
          }
        );
      }
    } else if (option === 'useTab') {

      if (isBoolean(json[option])) {

        $.json[option] = $.json.options.useTab = json[option];

      } else {

        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean'
          }
        );

      }
    } else if (option === 'sortArrays') {

      if (isBoolean(json[option]) || isArray(json[option])) {

        $.json[option] = $.json.options.arrays = json[option];

      } else {

        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean | string[]'
          }
        );

      }
    } else if (option === 'sortObjects') {

      if (isBoolean(json[option]) || isArray(json[option])) {

        $.json[option] = $.json.options.objects = json[option];

      } else {

        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean | string[]'
          }
        );

      }
    } else if (option === 'noSortList') {

      if (isArray(json[option])) {

        $.json[option] = $.json.options.exclude = json[option];

      } else {

        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'string[]'
          }
        );

      }

    } else if (option === 'exclude') {

      const exclude = isString(json[option]) ? [ json[option] ] : json[option];

      if (isArray(exclude)) {
        $.json[option] = anymatch(getResolvedPaths<string[]>(json[option]));

      } else {
        throws.typeError(
          {
            option: 'json',
            name: option,
            provided: exclude[option],
            expects: 'string | string[]'
          }
        );
      }
    } else if (option === 'terse' && $.mode.terse === true) {

      if (isEmpty(json.terse)) {

        $.json.terse.enabled = false;

        warn('Terse option is empty, minification will not apply');

      } else if (isBoolean(json.terse) && json.terse === true) {

        $.json.terse.enabled = true;

      } else if (isObject(json.terse)) {

        $.json.terse.enabled = true;

        for (const p in json.terse) {

          if (p !== 'exclude' && has(p, $.json.terse)) {

            if (isBoolean(json.terse[option])) {

              $.json.terse[p] = json.terse[p];

            } else {
              throws.typeError(
                {
                  option: `json ${ARR} terse`,
                  name: p,
                  provided: json.terse[p],
                  expects: 'boolean'
                }
              );
            }

          } else if (p === 'exclude') {

            $.json.terse.exclude = anymatch(getResolvedPaths<string[]>(json.terse[option]));

          }
        }

      }
    }

  }

}
