import { has, isArray, isEmpty, isObject, merge } from '~utils';

import { $ } from '$';

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided in configuration.
 */
export function setProcessors () {

  if (has('processor', $.config) && isObject($.config.processor)) {

    for (const prop in $.config.processor) {

      if (isEmpty($.config.processor[prop])) {
        continue;
      }

      if (isArray($.config.processor[prop])) {

        $.processor[prop].config = $.config.processor[prop];

      } else if (isObject($.config.processor[prop])) {

        if (prop === 'esbuild') {
          $.processor[prop] = merge($.processor[prop], $.config.processor[prop] as any);
        } else {
          $.processor[prop].config = merge($.processor[prop].config, $.config.processor[prop]);
        }

      }
    }
  }

};
