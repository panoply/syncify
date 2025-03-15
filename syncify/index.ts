import { internalError } from '~cli/throws';
import { Build } from '~modes/build';
import { Init } from '~modes/init';
import { Pack } from '~modes/pack';
import { Publish } from '~modes/publish';
import { Pull } from '~modes/pull';
import { Push } from '~modes/push';
import { Watch } from '~modes/watch';
import { Configure } from '~options/configure';
import { Create } from '~prompts/create';
import { Keychain } from '~prompts/keychain';
import { Link } from '~prompts/link';
import { Projects } from '~prompts/projects';

import { $ } from '$';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export { defineConfig, env } from '@syncify/config';

/**
 * Syncify Initialise
 *
 * The callback execution for both the CLI and API runtime.
 * This function is what initializes Syncify. It sets the runtime
 * state and dispatches to the runtime mode.
 */
export async function syncify () {

  await Configure().then(() => {

    if ($.mode.init) {

      Init();

    } else if ($.mode.link) {

      Link();

    } else if ($.mode.create) {

      Create();

    } else if ($.mode.projects) {

      Projects();

    } else if ($.mode.keychain) {

      Keychain();

    } else {

      if ($.mode.build) {

        Build();

      } else if ($.mode.watch) {

        Watch();

      } else if ($.mode.push) {

        Push();

      } else if ($.mode.pull) {

        Pull();

      } else if ($.mode.pack) {

        Pack();

      } else if ($.mode.publish) {

        Publish();

      }

    }

  }).catch(internalError);

};
