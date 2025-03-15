import type { Config, Syncify } from 'types';

import { syncify } from '.';

import { isObject, isString, isUndefined } from '~utils';

/**
 * **NOT YET AVAILABLE**
 *
 * Syncify API (default export)
 *
 * For usage in programs. The default export can be imported and used in projects.
 */
function api (resource: Config, options?: Config) {

  if (isString(resource)) {

    if (
      resource === 'watch' ||
      resource === 'build' ||
      resource === 'export' ||
      resource === 'import' ||
      resource === 'upload') {

      return (cb: Syncify) => syncify();

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
      watch: (cb: Syncify) => syncify(),
      build: (cb: Syncify) => syncify(),
      download: (cb: Syncify) => syncify(),
      upload: (cb: Syncify) => syncify()
    };
  }

}

export default api;
