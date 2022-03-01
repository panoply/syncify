import { runtime } from '../options/config/config';
import { has } from 'rambdax';
import { ICLICommands, IConfig, Syncify } from 'types';

/**
 * Client
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function cli (options: ICLICommands, callback?: typeof Syncify.hook) {

  if (has('_', options)) options._ = options._.slice(1);

  const config: IConfig = await runtime(options);

  /* if (config) {

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

  } */
}
