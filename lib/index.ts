import { has } from 'rambdax';
import { Commands, Syncify, Config } from 'types';
import { exception, rejection, signal } from './cli/emitters';
import { upload } from './modes/upload';
import { build } from './modes/build';
import { watch } from './modes/watch';
import { importing } from './modes/import';
import { exporting } from './modes/export';
import { server } from './hot/server';
import { stdin } from 'syncify:log/stdin';
import { $ } from 'syncify:state';
// import { resource } from 'modes/resource';
// import { readConfig } from 'config/config';
import { help } from 'syncify:log/help';
import { log } from 'syncify:log';
import { define } from './options/define';

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
    return $.config;
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
  // process.on('unhandledRejection', rejection);
  // process.on('uncaughtException', exception);
  // process.on('rejectionHandled', rejection);

  if ($.mode.hot) await server();

  /* -------------------------------------------- */
  /* EXECUTE MODE                                 */
  /* -------------------------------------------- */

  try {

    if ($.mode.build && $.mode.export === false) {

      return build(callback);

    } else if ($.mode.watch) {

      return watch(callback);

    } else if ($.mode.upload) {

      return upload(callback);

    } else if ($.mode.import) {

      return importing(callback);

    } else if ($.mode.export) {

      return exporting(callback);

    } else if ($.mode.interactive) {

      return console.log('TODO: --interactive is not yet supported');

    } else if ($.mode.metafields) {

      return console.log('TODO: --metafields is not yet supported');

    }

  } catch (e) {

    console.log(e);

    log.throws(e);

  }
};
