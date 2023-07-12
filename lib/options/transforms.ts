import { Config } from 'types';
import anymatch from 'anymatch';
import { has, isEmpty, isNil } from 'rambdax';
import { typeError, unknownError, invalidError } from '~options/validate';
import { bundle, processor } from '~config';
import * as u from '~utils/native';

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
  if (u.isObject(sections) && isEmpty(sections)) return;

  // Ensure the section option is an object
  if (!u.isObject(sections)) {
    typeError({
      option: 'views',
      name: 'sections',
      expects: '{}',
      provided: typeof sections
    });
  }

  // Iterate over all the properties in sections option
  for (const option in bundle.section) {

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (u.isBoolean(sections[option])) {
        bundle.section[option] = sections[option];
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
      if (u.isString(sections[option])) {

        // Only these character can be prefixers
        if (/[@:_-]/.test(sections[option])) {
          bundle.section[option] = sections[option];
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

      const globals = u.isString(sections[option]) ? [ sections[option] ] : sections[option];

      if (u.isArray(globals)) {
        if (globals.length > 0) {
          bundle.section[option] = new RegExp(`${globals.join('|')}`);
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

/**
 * Section Options
 *
 * Supports section sub-directories
 */
export function setSnippetOptions (config: Config) {

  if (!has('snippets', config.views)) return;

  const { snippets } = config.views;

  if (isNil(snippets)) return;
  if (u.isObject(snippets) && isEmpty(snippets)) return;

  // Ensure the section option is an object
  if (!u.isObject(snippets)) {
    typeError({
      option: 'views',
      name: 'snippets',
      expects: '{}',
      provided: typeof snippets
    });
  }
  // Iterate over all the properties in sections option
  for (const option in bundle.snippet) {

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (u.isBoolean(snippets[option])) {
        bundle.snippet[option] = snippets[option];
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

    // Validate the prefix separator option, in Shopifysnippets
    // We cannot use dot prefixes, we ensure only accepts values are defined.
    if (option === 'separator') {
      if (u.isString(snippets[option])) {

        // Only these character can be prefixers
        if (/[.@:_-]/.test(snippets[option])) {
          bundle.section[option] = snippets[option];
          continue;
        } else {
          invalidError('sections', option, snippets[option], '@ | _ | : | - | .');
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

      const globals = u.isString(snippets[option]) ? [ snippets[option] ] : snippets[option];

      if (u.isArray(globals)) {

        if (globals.length > 0) {
          bundle.snippet[option] = new RegExp(`${globals.join('|')}`);
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

export function setPageOptions (config: Config) {

  if (has('pages', config.views)) return;

  const { pages } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(pages)) unknownError('pages', pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, bundle.page)) unknownError('pages', option);

    if (option === 'language') {
      if (u.isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          bundle.page[option] = pages[option];
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
        bundle.page[option] = pages[option];
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
        u.assign(bundle.page[option], pages[option]);
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

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function setJsonOptions (config: Config) {

  if (!has('json', config.processors)) return;

  const { json } = config.processors;

  if (isNil(json)) return;
  if (u.isObject(json) && isEmpty(json)) return;

  // Ensure the section option is an object
  if (!u.isObject(json)) {
    typeError({
      option: 'processors',
      name: 'json',
      expects: '{}',
      provided: typeof json
    });
  }

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate theindent number
    if (option === 'indent') {
      if (u.isNumber(json[option])) {
        processor.json[option] = json[option];
        continue;
      } else {
        typeError({
          option: 'json',
          name: option,
          provided: json[option],
          expects: 'number'
        });
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTab') {
      if (u.isBoolean(json[option])) {
        processor.json[option] = json[option];
        continue;
      } else {
        typeError({
          option: 'json',
          name: option,
          provided: json[option],
          expects: 'boolean'
        });

      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

      if (u.isArray(exclude)) {
        processor.json[option] = anymatch(exclude as string[]);
        continue;
      } else {
        typeError({
          option: 'json',
          name: option,
          provided: exclude[option],
          expects: 'string | string[]'
        });
      }
    }

  }

}