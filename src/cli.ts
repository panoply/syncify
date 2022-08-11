import { has } from 'rambdax';
import { ICLICommands, Syncify } from 'types';
import { upload } from './modes/upload';
import { download } from './modes/download';
import { clean } from './modes/clean';
import { build } from './modes/build';
import { watch } from './modes/watch';
import { server } from './modes/server';
// import { resource } from 'modes/resource';
// import { readConfig } from 'config/config';
import { help } from './logger/help';
import { log } from './logger';
import { define } from './options/define';
import { bundle } from './options/index';

// import * as log from 'cli/logs';

/**
 * Client
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function cli (options: ICLICommands, callback?: Syncify) {

  if (has('_', options)) options._ = options._.slice(1);
  if (options.help) return console.info(help);

  await define(options);

  if (bundle.mode.clean) {
    try {
      await clean();
    } catch (error) {
      throw new Error(error);
    }
  }

  server('https://' + bundle.sync.stores[0].domain, bundle);

  // console.log(bundle);

  try {

    if (bundle.mode.build) {
      return build(callback);
    } else if (bundle.mode.watch) {
      return watch(callback);
    } else if (bundle.mode.upload) {
      return upload(callback);
    } else if (bundle.mode.download) {
      return download(callback);
    }

    /* if (config.mode.vsc) {
        return null;
      } else if (config.mode.prompt) {
        return prompt(config);
         } else if (config.mode.build) {
        return build(config, callback);
      } else if (config.mode.watch) {
        return watch(config, callback);
      } else if (config.mode.upload) {
        return upload(config, callback);
      } else if (config.mode.download) {
        return download(config, callback);
      } else if (config.mode.metafields) {
        return resource(config);
      } */

  } catch (error) {

    log.error(error);

  }

}
