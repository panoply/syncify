import { Config } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { typeError, invalidError } from '~options/validate';
import { isObject, isString, isArray, isBoolean } from '~utils/native';
import { $ } from '~state';

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function setSectionOptions (config: Config) {

  if (!has('sections', config.views)) return;

  const { sections } = config.views;

  if (isNil(config.views.sections)) return;
  if (isObject(sections) && isEmpty(sections)) return;

  // Ensure the section option is an object
  if (!isObject(sections)) {

    typeError({
      option: 'views',
      name: 'sections',
      expects: '{}',
      provided: typeof sections
    });

  }

  // Iterate over all the properties in sections option
  for (const option in $.section) {

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (isBoolean(sections[option])) {

        $.section[option] = sections[option];

        continue;

      } else {
        typeError({
          option: 'views.sections',
          name: option,
          provided: sections[option],
          expects: 'boolean'
        });
      }
    }

    // Validate the prefix separator option, in Shopify sections
    // We cannot use dot prefixes, we ensure only accepts values are defined.
    if (option === 'separator') {
      if (isString(sections[option])) {

        // Only these character can be prefixers
        if (/[@:_-]/.test(sections[option])) {
          $.section[option] = sections[option];
          continue;
        } else {
          invalidError('view.sections', option, sections[option], '@ | _ | : | -');
        }
      } else {
        typeError({
          option: 'views.sections',
          name: option,
          provided: sections[option],
          expects: 'string'
        });
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'global') {

      const globals = isString(sections[option]) ? [ sections[option] ] : sections[option];

      if (isArray(globals)) {

        if (globals.length > 0) {
          $.section[option] = new RegExp(`${globals.join('|')}`);
          continue;
        }

      } else {
        typeError({
          option: 'views.sections',
          name: option,
          provided: sections[option],
          expects: 'string | string[]'
        });
      }
    }
  }

};
