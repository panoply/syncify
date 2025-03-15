import type { PagesConfig } from 'types';

import { invalidError, typeError, unknownError } from '~cli/throws';
import { hasProp, isArray, isBoolean, isEmpty, isNil, isString } from '~utils';

import { $ } from '$';

export function setPageOptions () {

  return;

  $.page = object<Type.PageBundle>({
    safeSync: true,
    author: '',
    global: null,
    language: 'html',
    export: {
      quotes: '“”‘’',
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'language-'
    },
    import: {
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
      fence: '```',
      headingStyle: 'atx',
      hr: '---',
      linkReferenceStyle: 'full',
      linkStyle: 'inlined',
      strongDelimiter: '**',
      bulletListMarker: '-'
    }
  });

  const has = hasProp(pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option as keyof PagesConfig)) unknownError('pages', option);

    if (option === 'language') {

      if (isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          $.page[option] = pages[option];
        } else {
          invalidError({
            option: 'views.pages',
            name: option,
            value: pages[option],
            expects: 'markdown | html'
          });
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

      if (isString(pages[option])) {

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

      if (isBoolean(pages[option])) {

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

      if (isArray(pages[option])) {

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
