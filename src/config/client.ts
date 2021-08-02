import { upload } from '../sync/upload';
import { watch } from '../sync/watch';
import { download } from '../sync/download';
import * as log from './logger';
import { help } from './cli';
import { CLIOptions, Callback } from '../index.d';

/**
 * Client
 */
export async function client (options: CLIOptions, callback?: typeof Callback) {

  let command: string;
  let result: unknown;

  if (!options?._) {
    command = options.resource;
    options.file = true;
  } else {
    command = options._[0];
    options._ = options._.slice(1);
    options.file = false;
  }

  try {

    switch (command) {
      case 'watch':
        result = await watch(options, callback);
        break;
      case 'upload':
        result = await upload(options, callback);
        break;
      case 'download':
        result = await download(options, callback);
        break;
      default:
        process.stdout.write(help);
    }

    if (typeof result !== 'undefined') {
      process.stdout.write(result as string);
    }

  } catch (error) {

    log.print(error.stack ?? error, 'red');

  }

  return result;

}
