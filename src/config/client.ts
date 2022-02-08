import { has } from 'rambdax';
import { ICLIOptions, Syncify } from 'types';
import { upload } from 'sync/upload';
import { build } from 'sync/build';
import { watch } from 'sync/watch';
import { prompt } from 'cli/prompts';
import { readConfig } from 'config/config';
import { help } from 'cli/help';
import * as log from 'cli/logs';

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

  if (config) {

    try {

      if (config.mode.vsc) {
        return null;
      } else if (config.mode.build) {
        return build(config, callback);
      } else if (config.mode.watch) {
        return watch(config, callback);
      } else if (config.mode.upload) {
        return upload(config, callback);
      } else if (config.mode.download) {
        return null;
      } else if (config.mode.help) {
        return process.stdout.write(help);
      }

      return prompt(config);

    } catch (error) {

      log.errors(error);

    }

  }
}
