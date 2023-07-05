import { has } from 'rambdax';
import { Commands, Syncify, Config } from 'types';
import { exception, rejection, signal } from './cli/emitters';
import { upload } from './modes/upload';
import { download } from './modes/download';
import { build } from './modes/build';
import { watch } from './modes/watch';
import { server } from './hot/server';
import { stdin } from './log/stdin';
// import { resource } from 'modes/resource';
// import { readConfig } from 'config/config';
import { help } from '~log/help';
import { log } from '~log';
import { define } from './options/define';
import { bundle } from '~config';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export * from './api';

/**
 * ENV Utilities
 *
 * Helper utility for checking environment variables
 * and returning some other data references
 */
export const env = {
  get dev () {
    return process.env.SYNCIFY_ENV === 'dev';
  },
  get prod () {
    return process.env.SYNCIFY_ENV === 'prod';
  },
  get watch () {
    return process.env.SYNCIFY_WATCH === 'true';
  },
  get options () {
    return bundle.config;
  }
};

/**
 * Run Syncify
 *
 * Determines how Syncify was initialized.
 * It will dispatch and construct the correct
 * configuration model accordingly.
 */
export async function run (options: Commands, config?: Config, callback?: Syncify) {

  /* -------------------------------------------- */
  /* STDIN                                        */
  /* -------------------------------------------- */

  process.stdin.on('data', stdin);

  /* -------------------------------------------- */
  /* LAUNCH SYNCIFY                               */
  /* -------------------------------------------- */

  if (has('_', options)) options._ = options._.slice(1);
  if (options.help) return console.info(help);

  await define(options, config);

  /* -------------------------------------------- */
  /* PROCESS LISTENERS                            */
  /* -------------------------------------------- */

  process.on('SIGINT', signal);
  process.stdin.on('data', stdin);

  process.on('uncaughtException', exception);
  process.on('unhandledRejection', rejection);

  if (bundle.mode.hot) await server();

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
    } else if (bundle.mode.export) {
      return console.log('TODO');
    }

  } catch (e) {

    console.log(e);

    log.throws(e);

  }
};
