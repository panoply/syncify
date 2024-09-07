import { typeError, invalidError } from 'syncify:log/throws';
import { isObject, isString, isArray, isBoolean, has, isEmpty } from 'syncify:utils';
import { $ } from 'syncify:state';
import { Snippets } from 'types';

/**
 * Snippet Options
 *
 * Supports section sub-directories
 */
export function setSnippetOptions () {

  if (!isObject($.config.paths.snippets)) return;

  const { snippets } = $.config.paths as { snippets: Snippets };

  if (has('input', snippets)) return;
  if (isEmpty(snippets.input)) return;

  // Ensure the section option is an object
  if (!isObject(snippets)) {
    typeError({
      option: 'paths',
      name: 'snippets',
      expects: '{}',
      provided: typeof snippets
    });
  }

  // Iterate over all the properties in sections option
  for (const option in $.snippet) {

    if (option === 'input') continue;

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (isBoolean(snippets[option])) {
        $.snippet[option] = snippets[option];
        continue;
      } else {
        typeError({
          option: 'views.snippets',
          name: option,
          provided: snippets[option],
          expects: 'boolean'
        });
      }
    }

    // Validate the prefix separator option, in Shopify snippets
    // We support dot prefixes in snippets unlike sections where such is invalid.
    if (option === 'separator') {
      if (isString(snippets[option])) {

        // Only these character can be prefixers
        if (/[.@:_-]/.test(snippets[option])) {

          $.section[option] = snippets[option];
          continue;

        } else {
          invalidError({
            option: 'views.snippets',
            name: option,
            value: snippets[option],
            expects: '@ | _ | : | - | .'
          });
        }
      } else {
        typeError({
          option: 'views.snippets',
          name: option,
          provided: snippets[option],
          expects: 'string'
        });
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'global') {

      const globals = isString(snippets[option]) ? [ snippets[option] ] : snippets[option];

      if (isArray(globals)) {

        if (globals.length > 0) {
          $.snippet[option] = new RegExp(`${globals.join('|')}`);
          continue;
        }

      } else {

        typeError({
          option: 'views.snippets',
          name: option,
          provided: snippets[option],
          expects: 'string | string[]'
        });

      }
    }
  }

};
