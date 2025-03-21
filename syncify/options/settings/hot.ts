import { basename, join } from 'node:path';

import { copyFileSync, existsSync, mkdirSync } from 'fs-extra';

import { cyan } from '@syncify/ansi';

import { runtime } from '~cli/runtime';
import { invalidError, throwError, typeError, unknownError, warnOption } from '~cli/throws';
import { HOT_SNIPPET, HOT_SOURCE } from '~const';
import { snippet } from '~hot/snippet';
import { has, isArray, isBoolean, isEmpty, isNil, isNumber, isObject, isString } from '~utils';

import { $ } from '$';

/**
 * Hot Reloading Setup
 *
 * Validates the hot reload configuration
 * defined options.
 */
export async function setHotReloads () {

  if (($.mode.watch === false && $.mode.hot === false) || $.running === true) return;

  const warn = warnOption('HOT Reloads');

  if ($.env.sync > 1) {
    warn('HOT Reloads can only be used on 1 store');
    return;
  } else if ($.target.length > 1) {
    warn('HOT Reloads can only be used on 1 theme');
    return;
  }

  if (!isObject($.config.hot) && !isNil($.config.hot) && $.config.hot !== false) {

    typeError(
      {
        option: 'config',
        name: 'hot',
        provided: $.config.hot,
        expects: 'boolean | {}'
      }
    );

  }

  if (isObject($.config.hot) && isEmpty($.config.hot) === false) {

    for (const prop in $.config.hot) {

      if (prop === 'server' || prop === 'socket') {

        if (isNumber($.config.hot[prop])) {

          $.hot[prop] = $.config.hot[prop];

        } else {

          invalidError(
            {
              option: 'hot',
              name: prop,
              value: $.config.hot[prop],
              expects: 'number'
            }
          );

        }

      } else if (prop === 'label' || prop === 'eject') {

        if (isBoolean($.config.hot[prop])) {

          $.hot[prop] = $.config.hot[prop];

        } else {

          invalidError(
            {
              option: 'hot',
              name: prop,
              value: $.config.hot[prop],
              expects: 'visible | hidden'
            }
          );

        }

      } else if (prop === 'client') {

        if (
          $.config.hot[prop] === 'inject' ||
          $.config.hot[prop] === 'extension') {

          $.hot[prop] = $.config.hot[prop];

        } else {

          invalidError(
            {
              option: 'hot',
              name: prop,
              value: $.config.hot[prop],
              expects: 'inject | extension'
            }
          );

        }

      } else if (prop === 'flags') {

        if (isArray($.config.hot[prop])) {

          for (const flag of $.config.hot[prop]) {

            $.hot[prop][flag] = false;

          }

        } else {

          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'string[]'
          });

        }

      } else if (prop === 'method') {

        if (
          $.config.hot[prop] === 'hot' ||
          $.config.hot[prop] === 'live' ||
          $.config.hot[prop] === 'refresh') {

          $.hot[prop] = $.config.hot[prop];

        } else {

          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'hot | live | refresh'
          });

        }

      } else if (prop === 'layouts') {

        if (isArray($.config.hot[prop])) {
          $.hot[prop] = []; // clear the defaults

          for (const layout of $.config.hot[prop]) {

            if (isString(layout)) {

              const filename = basename(layout);

              if (!$.hot[prop].includes(filename)) {

                $.hot[prop].push(filename);

              }

            } else {

              invalidError({
                option: 'hot',
                name: prop,
                value: $.config.hot[prop],
                expects: 'string'
              });

            }

          }

        } else {

          invalidError({
            option: 'hot',
            name: prop,
            value: $.config.hot[prop],
            expects: 'string[]'
          });

        }

      } else {

        if (!has(prop, $.hot)) {

          unknownError(`hot.${prop}`, $.config.hot[prop]);

        } else {

          typeError({
            option: 'hot',
            name: prop,
            provided: $.config.hot[prop],
            expects: typeof $.hot[prop]
          });

        }
      }

    }
  }

  const from = join($.dirs.module, HOT_SNIPPET);

  if (!existsSync(from)) {

    return throwError([
      'Failed to obtain the source HOT Snippet injection file.',
      'This is required and should be located within the Syncify',
      `installation path: ${cyan(from)}`
    ], [
      'Please submit an issue to: https://github.com/panoply/syncify',
      'You can also try to re-install Syncify and trying again.'
    ]);

  }

  $.hot.source = join($.root, HOT_SOURCE);

  if (!existsSync($.hot.source)) {

    copyFileSync(join($.dirs.module, HOT_SNIPPET), $.hot.source);

  } else {

    if ($.project.hotVersion !== HOT_VERSION) {
      copyFileSync(join($.dirs.module, HOT_SNIPPET), $.hot.source);
      $.project.hotVersion = HOT_VERSION;
    }

  }

  $.hot.cache.root = join($.dirs.hot, `${$.target.default.id}`);
  $.hot.cache.snippet = join($.hot.cache.root, HOT_SNIPPET);

  if (!existsSync($.hot.cache.root)) mkdirSync($.hot.cache.root);

  // BEGIN SNIPPET AND INJECTION OPERATIONS
  //
  await snippet($.target.default);

  runtime.hot();

}
