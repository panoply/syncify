// import { upload } from '../sync/upload';
import { watch } from '../sync/watch';
// import { download } from '../sync/download';
import { readConfig } from './config';
import { help } from './cli';
import * as log from '../logs/console';
import { IOptions, Callback } from '../typings';
import { has } from 'rambdax';
import * as cli from '../cli/default';

/**
 * Client
 */
export async function client (options: IOptions, callback?: typeof Callback) {

  if (!has('_', options)) {
    options.cli = false;
  } else {
    options._ = options._.slice(1);
    options.cli = true;
    options.interactive = true;
  }

  const config = await readConfig(options).catch(log.error);

  if (options.interactive) return cli.options(config);

  if (config) {

    try {

      switch (config.resource) {
        case 'watch':
          await watch(config, callback);
          break;
        case 'upload':
          // await upload(config, callback);
          break;
        case 'download':
        //  await download(config);
          break;
        default:
          process.stdout.write(help);
      }

      // if (typeof result !== 'undefined') process.stdout.write(result as string);

    } catch (e) {

      log.issue(e.message);

    }

  }
}
