import { cli } from './cli';
import { Resource } from 'types';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

function sync <R extends Resource> (
  resource: R | IOptions,
  options: Omit<APIOptions, 'resource'>,
  callback?: R extends 'watch' ? typeof Callback : undefined
): any {

  // Initialized via CLI
  if (typeof resource === 'object' && resource?.cli === true) return cli(resource);

  // Initialized via API
  // if (!resource) return log.issue('The resource option is missing!');

  // if (!options.target) return log.issue('Missing target!');

  const defaults: APIOptions = {
    resource: resource as R,
    dir: 'theme',
    metafields: true,
    store: '',
    target: [],
    concurrency: 20,
    forceIgnore: false,
    ignore: []
  };

  const config = Object.assign(defaults, options);

  client(config, callback);

}

export { sync as default };
