import { warning } from '../config';
import { warn } from '../utils/native';
import { log } from '~log';

export const stacks: Set<string> = new Set();

export function stdin (data: Buffer) {

  const input = data.toString().trim().toLowerCase();

  if (input === 's') {



  } else if (input === 'w') {

    for (const prop in warning.process) {

      if (warning.process[prop].size === 0) continue;

      log.nwl();
      // warn(log.message('yellowBright', prop));
      log.nwl();

      for (const message of warning.process[prop].values()) {
        if (typeof message === 'string' && message.length > 0) {
          //  log.multiline('warning', message);
        }
      }

      warning.process[prop].clear();
    }

    warning.count = 0;
  }

}
