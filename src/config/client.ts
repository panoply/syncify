import { has } from 'rambdax';
import { ICLIOptions, IConfig, Syncify } from 'types';
import { upload } from 'modes/upload';
import { download } from 'modes/download';
import { build } from 'modes/build';
import { watch } from 'modes/watch';
import { resource } from 'modes/resource';
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

  if (has('_', options)) options._ = options._.slice(1);
  if (options.help) return console.info(help);

  const config: IConfig = await readConfig(options);

  // console.log(config.sync);

  // const host = server('https://' + config.sync.stores[0].domain + '?preview_theme_id=' + config.sync.themes[0].id, config);

  if (config) {

    try {

      if (config.mode.vsc) {
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
      }

    } catch (error) {

      log.errors(error);

    }

  }
}
