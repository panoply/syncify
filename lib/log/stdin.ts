import { errors } from './errors';
import { log, tui } from 'syncify:log';
import * as c from 'syncify:ansi';
import { error, keys } from 'syncify:native';
import { isString } from 'syncify:utils';
import { $, warning } from 'syncify:state';

export const stacks: Set<string> = new Set();

export function stdin (data: Buffer) {

  const input = data.toString().trim().toLowerCase();

  if (input === 'v') {

    const items = keys(errors);

    for (let i = 0, l = items.length; i < l; i++) {

      const prop = items[i];

      if (errors[prop].size === 0) continue;

      if (i > 0) log.hline(10);

      log.write(c.bold.whiteBright(prop));

      for (const message of errors[prop].values()) {
        if (isString(message) && message.length > 0) {
          error(message);
        }
      }

      errors[prop].clear();

    }

    if ($.mode.upload) {

      log.out(tui.closer('Upload'), NWL);
      process.exit(0);

    }

  } else if (input === 'w') {

    for (const prop in warning.process) {

      if (warning.process[prop].size === 0) continue;

      log.nwl();
      log.write(c.bold.yellow(prop));
      log.nwl();

      for (const message of warning.process[prop].values()) {
        if (typeof message === 'string' && message.length > 0) {
          log.write(tui.multiline('warning', message));
        }
      }

      warning.process[prop].clear();

    }

    warning.count = 0;
  }

}
