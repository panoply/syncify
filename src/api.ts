import { Config, Resource, Syncify } from 'types';
import { isObject, isString, isUndefined } from './shared/native';
import { run } from '.';

/**
 * Define Config (named export)
 *
 * Used in `syncify.config.js` files and provides
 * type completions to the export.
 */
export const defineConfig = (config: Config) => config;

/* -------------------------------------------- */
/* BIN EXECUTABLE                               */
/* -------------------------------------------- */

/**
 * Syncify API (default export)
 *
 * For usage in programs. The default export can
 * be imported and used in projects.
 */
function api (resource: Resource | Config, options?: Config) {

  if (isString(resource)) {
    if (/watch|build|download|upload/.test(resource as string)) {
      return (cb: Syncify) => run({
        cli: false,
        [resource as string]: true
      }, options, cb);
    }
  } else if (isObject(resource)) {

    if (!isUndefined(options)) {
      throw new Error('You cannot provide options when running instance');
    }

    return {
      watch: (cb: Syncify) => run({
        cli: false,
        watch: true
      }, options, cb),
      build: (cb: Syncify) => run({
        cli: false,
        build: true
      }, options, cb),
      download: (cb: Syncify) => run({
        cli: false,
        download: true
      }, options, cb),
      upload: (cb: Syncify) => run({
        cli: false,
        upload: true
      }, options, cb)
    };
  }

}

export default api;
