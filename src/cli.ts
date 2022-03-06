import { has } from 'rambdax';
import { ICLICommands, Syncify } from 'types';
// import { upload } from 'modes/upload';
// import { download } from 'modes/download';
import { build } from 'modes/build';
import { watch } from 'modes/watch';
// import { resource } from 'modes/resource';
// import { readConfig } from 'config/config';
import { help } from 'cli/help';
import { define } from 'options/define';
import { log } from 'cli/stdout';
import { bundle } from 'options';
// import * as log from 'cli/logs';

/**
 * Client
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function cli (options: ICLICommands, callback?: typeof Syncify.hook) {

  if (has('_', options)) options._ = options._.slice(1);
  if (options.help) return console.info(help);

  await define(options);

  // console.log(config.sync);

  // const host = server('https://' + config.sync.stores[0].domain + '?preview_theme_id=' + config.sync.themes[0].id, config);

  try {

    if (bundle.mode.build) {
      return build(callback);
    } else if (bundle.mode.watch) {
      return watch(callback);
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
