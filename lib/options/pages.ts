import { Config } from 'types';
import { has, isEmpty, isNil } from 'rambdax';
import { typeError, unknownError, invalidError } from '~options/validate';
import { $ } from '~state';
import * as u from '~utils/native';

export function setPageOptions (config: Config) {

  if (has('pages', config.views)) return;

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

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, $.page)) unknownError('pages', option);

    if (option === 'language') {
      if (u.isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          $.page[option] = pages[option];
        } else {
          invalidError('pages', option, pages[option], 'markdown | html');
        }
      } else {
        typeError({
          option: 'pages',
          name: option,
          provided: pages[option],
          expects: 'string'
        });
      }
    } else if (option === 'author') {
      if (u.isString(pages[option])) {
        $.page[option] = pages[option];
      } else {
        typeError({
          option: 'pages',
          name: option,
          provided: pages[option],
          expects: 'string'
        });
      }
    } else if (option === 'markdown') {

      if (u.isObject(pages[option])) {

        u.assign($.page[option], pages[option]);

      } else {
        typeError({
          option: 'pages',
          name: option,
          provided: pages[option],
          expects: 'object'
        });
      }
    }
  }

}
