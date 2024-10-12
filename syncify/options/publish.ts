import * as u from 'syncify:utils';
import { typeError, unknownError, invalidError, throwError } from 'syncify:log/throws';
import { bold, gray, underline, whiteBright } from '@syncify/ansi';
import { $ } from 'syncify:state';

/**
 * Publishing Configuration
 *
 * Validates the hot reload configuration
 * defined options.
 */
export async function setPublishConfig () {

  return;

  if (u.isObject($.config.publish) && u.isEmpty($.config.publish) === false) {

    for (const prop in $.config.publish) {

      if (!u.has(prop, $.publish)) unknownError(`publish.${prop}`, $.config.publish[prop]);

      if (prop === 'tunnelPort') {

        if (u.isNumber($.config.publish[prop]) && isNaN($.config.publish[prop]) === false) {

          $.publish[prop] = $.config.publish[prop];

        } else {
          invalidError({
            option: 'publish',
            name: prop,
            value: $.config.hot[prop],
            expects: 'visible | hidden'
          });
        }

      } else if (prop === 'publishRole') {

        if (
          $.config.publish[prop] === 'main' ||
          $.config.publish[prop] === 'unpublished' ||
          $.config.publish[prop] === 'development') {

          $.publish[prop] = $.config.publish[prop];

        } else {

          invalidError({
            option: 'publish',
            name: prop,
            value: $.config.hot[prop],
            expects: 'main | unpublished | development'
          });

        }

      } else if (prop === 'bindVersion') {

        if (u.isBoolean($.config.publish[prop])) {

          $.publish[prop] = $.config.publish[prop];

        } else {

          typeError({
            option: 'bindVersion',
            name: prop,
            provided: $.config.publish[prop],
            expects: typeof $.publish[prop]
          });
        }

      } else if (prop === 'themeLimit') {

        if (u.isNumber($.config.publish[prop])) {

          if ($.config.publish[prop] > 5) {
            invalidError({
              option: 'publish',
              name: prop,
              value: $.config.hot[prop],
              expects: '1 - 5',
              reason: [
                'Syncify requries a theme limit between 1 and 5.'
              ]
            });

          } else {
            $.publish[prop] = $.config.publish[prop];
          }
        } else {

          typeError({
            option: 'themeLimit',
            name: prop,
            provided: $.config.publish[prop],
            expects: typeof $.publish[prop]
          });
        }

      }

    }
  }

  if ($.mode.publish === true || $.mode.release === true) {

  }

}
