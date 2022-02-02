import { has } from 'rambdax';
import { ICLIOptions, Syncify } from 'types';
// import { upload } from 'sync/upload';
import { watch } from 'sync/watch';
import { readConfig } from 'config/config';
import { help } from 'cli/help';
import * as log from 'cli/logs';
import * as cli from 'cli/prompts';

/**
 * Client
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function client (options: ICLIOptions, callback?: typeof Syncify.hook) {

  options.cli = has('_', options);

  if (options.cli) options._ = options._.slice(1);

  const config = await readConfig(options);

  // console.log(config.transform.icons.sprites);

  if (config) {

    try {

      switch (config.resource) {
        case 'interactive':
          return cli.options(config);
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

      log.error(e);

    }

  }
}
