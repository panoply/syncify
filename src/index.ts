import log from 'fancy-log';
import chalk from 'chalk';
import { client } from './config/client';
import { Resource, APIOptions, CLIOptions, Callback } from './index.d';

function sync (
  resource: Resource | CLIOptions,
  options?: APIOptions,
  callback?: typeof Callback
): any {

  if (typeof resource === 'object') return client(resource);

  if (!resource) {

    return log(chalk`{red Error! The {bold resource} option is missing}!`);
  }

  if (!options.target) {

    return log(chalk`{red Error! Please define a {bold theme target}!}`);
  }

  const defaults = {
    resource,
    target: '',
    concurrency: 20,
    dir: 'theme',
    files: [],
    forceIgnore: false,
    ignore: []
  };

  const config = Object.assign(defaults, options);

  return client(config, callback);
}

export { sync as default };
