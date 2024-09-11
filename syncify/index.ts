import type { Syncify, Config } from 'types';
import type { Commands } from 'types/internal';
import process from 'node:process';
import { upload } from 'syncify:modes/upload';
import { build } from 'syncify:modes/build';
import { watch } from 'syncify:modes/watch';
import { themes } from 'syncify:modes/themes';
import { importing } from 'syncify:modes/import';
import { exporting } from 'syncify:modes/export';
import { publish } from 'syncify:modes/publish';
import { stdin } from 'syncify:log/stdin';
import { help } from 'syncify:log/help';
import { define } from 'syncify:options/define';
import { setup } from 'syncify:modes/setup';
import { strap } from 'syncify:modes/strap';
import { $ } from 'syncify:state';
// import { exception, rejection, signal } from './cli/emitters';

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
  get terse () {
    return $.cmd.terse;
  },
  get prod () {
    return process.env.SYNCIFY_ENV === 'prod';
  },
  get watch () {
    return process.env.SYNCIFY_WATCH === 'true';
  }
};

export async function run (cmd: Commands, config?: Config, callback?: Syncify) {

  /* -------------------------------------------- */
  /* HELP                                         */
  /* -------------------------------------------- */

  if (cmd.help) return help(cmd);

  /* -------------------------------------------- */
  /* DEFINE OPTIONS                               */
  /* -------------------------------------------- */

  await define(cmd, config);

  /* -------------------------------------------- */
  /* THEMES                                       */
  /* -------------------------------------------- */

  if ($.mode.themes) return themes();
  if ($.mode.setup) return setup();
  if ($.mode.strap) return strap();

  /* -------------------------------------------- */
  /* STDIN                                        */
  /* -------------------------------------------- */

  process.stdin.on('data', stdin);

  /* -------------------------------------------- */
  /* PROCESS LISTENERS                            */
  /* -------------------------------------------- */

  // process.on('SIGINT', signal);
  // process.on('unhandledRejection', rejection);
  // process.on('uncaughtException', exception);
  // process.on('rejectionHandled', rejection);

  // if ($.mode.hot) await server();

  /* -------------------------------------------- */
  /* EXECUTE MODE                                 */
  /* -------------------------------------------- */

  try {

    $.env.ready = true;

    if ($.mode.build && $.mode.export === false) {

      return build(callback);

    } else if ($.mode.watch) {

      return watch(callback);

    } else if ($.mode.upload) {

      return upload(callback);

    } else if ($.mode.import) {

      return importing(callback);

    } else if ($.mode.export && $.mode.publish === false) {

      return exporting(callback);

    } else if ($.mode.publish) {

      return publish(callback);

    } else if ($.mode.interactive) {

      return console.log('TODO: --interactive is not yet supported');

    } else if ($.mode.metafields) {

      return console.log('TODO: --metafields is not yet supported');

    }

  } catch (e) {

    console.log(e);

    // log.throws(e);

  }
};
