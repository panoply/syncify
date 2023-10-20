import type { Config, Resource, Syncify } from 'types';
import { isObject, isString, isUndefined } from 'syncify:utils';
import { run } from '.';

/* -------------------------------------------- */
/* REXPORT                                      */
/* -------------------------------------------- */

export { $ } from 'syncify:state';

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
 * For usage in programs. The default export can be imported and used in projects.
 */
function api (resource: Resource | Config, options?: Config) {

  if (isString(resource)) {

    if (
      resource === 'watch' ||
      resource === 'build' ||
      resource === 'export' ||
      resource === 'import' ||
      resource === 'upload' ||
      resource === 'watch') {

      return (cb: Syncify) => run({ cli: false, [resource]: true }, options, cb);

    } else {

      throw new Error([
        'Invalid Resource, available resource modes via API:',
        '',
        '- "watch"',
        '- "build"',
        '- "export"',
        '- "import"',
        '- "upload"',
        ''
      ].join(NWL));

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
        import: true
      }, options, cb),
      upload: (cb: Syncify) => run({
        cli: false,
        upload: true
      }, options, cb)
    };
  }

}

export default api;
