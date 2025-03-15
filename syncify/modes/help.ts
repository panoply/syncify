import * as Type from 'types';

import { log } from '~cli/log';
import { Default } from '~help/default';
import { Inspect, Version } from '~help/information';
import { Modes } from '~help/modes';
import { Suggest } from '~help/suggest';
import { isNull } from '~utils';

/**
 * `sy` OR `sy help <mode>`
 *
 * Dispatch function for the help command and help command options.
 */
export function Help (mode: Type.Modes) {

  log.clear();

  if (mode.suggest) {

    Suggest();

  } else if (mode.inspect) {

    Inspect();

  } else if (mode.version) {

    Version();

  } else {

    const target = mode._;

    if (isNull(target)) {

      Default();

    } else {

      Modes(target);

    }

  }

};
