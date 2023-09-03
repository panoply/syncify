import { Config } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { typeError, unknownError, invalidError } from '~options/validate';
import { $ } from '~state';
import * as u from '~utils/native';

export function setPageOptions (config: Config) {

  if (!has('pages', config.views)) return;

  const { pages } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(pages) && !isNil(pages)) {
    typeError({
      option: 'views',
      name: 'pages',
      provided: typeof pages,
      expects: '{}'
    });
  }

  // Skip if empty object
  if (isEmpty(pages)) return;

  const defaults = $.config.views.pages;

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, defaults)) unknownError('pages', option);

    if (option === 'importLanguage') {

      if (u.isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          $.page[option] = pages[option];
        } else {
          invalidError('views.pages', option, pages[option], 'markdown | html');
        }
      } else {
        typeError({
          option: 'views.pages',
          name: option,
          provided: pages[option],
          expects: 'markdown | html'
        });
      }

    } else if (option === 'author') {

      if (isNil(pages[option])) continue;

      if (u.isString(pages[option])) {

        $.page[option] = pages[option];

      } else {
        typeError({
          option: 'views.pages',
          name: option,
          provided: pages[option],
          expects: 'string'
        });
      }

    } else if (option === 'suffixDir' || option === 'safeSync') {

      if (isNil(pages[option])) continue;

      if (u.isBoolean(pages[option])) {

        $.page[option] = pages[option];

      } else {

        typeError({
          option: 'views.pages',
          name: option,
          provided: pages[option],
          expects: 'object'
        });
      }

    } else if (option === 'global') {

      if (isNil(pages[option])) continue;

      if (u.isArray(pages[option])) {

        if (pages[option].length > 0) {
          $.page[option] = new RegExp(`${pages[option].join('|')}`);
          continue;
        }

      } else {

        typeError({
          option: 'views.pages',
          name: option,
          provided: pages[option],
          expects: 'string | string[]'
        });

      }

    }
  }

}
