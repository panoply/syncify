import anymatch from 'anymatch';
import { typeError } from 'syncify:log/throws';
import { isArray, isBoolean, isNumber, isObject, isString, has, isEmpty, isNil } from 'syncify:utils';
import { $ } from 'syncify:state';

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function setJsonOptions () {

  if (!has('processors', $.config)) return;
  if (!has('json', $.config.processors)) return;

  const { json } = $.config.processors;

  if (isNil(json)) return;
  if (isObject(json) && isEmpty(json)) return;

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

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate theindent number
    if (option === 'indent') {
      if (isNumber(json[option])) {
        $.processor.json[option] = json[option];
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

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTab') {
      if (isBoolean(json[option])) {
        $.processor.json[option] = json[option];
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
        $.processor.json[option] = anymatch(exclude as string[]);
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

  }

}
