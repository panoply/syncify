import { has } from 'rambdax';
import { Commands, Syncify, Config } from 'types';
import { exception, rejection, signal } from './cli/emitters';
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

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export * from './api';
export * as utils from './utils';

/**
 * Run Syncify
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function run (options: Commands, config?: Config, callback?: Syncify) {

  /* -------------------------------------------- */
  /* PROCESS LISTENERS                            */
  /* -------------------------------------------- */

  process.on('SIGINT', signal);
  process.on('uncaughtException', exception);
  process.on('unhandledRejection', rejection);

  /* -------------------------------------------- */
  /* LAUNCH SYNCIFY                               */
  /* -------------------------------------------- */

  if (has('_', options)) options._ = options._.slice(1);
  if (options.help) return console.info(help);

  await define(options, config);

  /* -------------------------------------------- */
  /* CLEAN MODE                                   */
  /* -------------------------------------------- */

  if (bundle.mode.clean) {
    try {
      await clean();
    } catch (error) {
      throw new Error(error);
    }
  }

  server(bundle);

  // console.log(bundle);

  /* -------------------------------------------- */
  /* EXECUTE MODE                                 */
  /* -------------------------------------------- */

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

  } catch (e) {

    log.warn(e);

  }
};
