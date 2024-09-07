import anymatch from 'anymatch';
import { typeError, warnOption } from 'syncify:log/throws';
import { isArray, isBoolean, isNumber, isObject, isString, has, isEmpty, isNil } from 'syncify:utils';
import { $ } from 'syncify:state';
import { getResolvedPaths } from 'syncify:utils/options';
import { ARR } from 'syncify:symbol';

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
    typeError(
      {
        option: 'processors',
        name: 'json',
        expects: '{}',
        provided: typeof json
      }
    );
  }

  if (isEmpty(json)) return;

  const warn = warnOption('liquid configuration');

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate theindent number
    if (option === 'indent') {
      if (isNumber(json[option])) {

        $.json[option] = json[option];

        continue;

      } else {
        typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'number'
          }
        );
      }
    }

    // Validate theindent number
    if (option === 'comments') {
      if (isBoolean(json[option])) {

        $.json[option] = json[option];

        continue;

      } else {
        typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean'
          }
        );
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTab') {
      if (isBoolean(json[option])) {
        $.json[option] = json[option];
        continue;
      } else {
        typeError(
          {
            option: 'json',
            name: option,
            provided: json[option],
            expects: 'boolean'
          }
        );

      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = isString(json[option]) ? [ json[option] ] : json[option];

      if (isArray(exclude)) {
        $.json[option] = anymatch(getResolvedPaths<string[]>(json[option]));
        continue;
      } else {
        typeError(
          {
            option: 'json',
            name: option,
            provided: exclude[option],
            expects: 'string | string[]'
          }
        );
      }
    }

    if (option === 'terse' && $.mode.terse === true) {

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
              continue;
            } else {
              typeError(
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
