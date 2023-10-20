import { error, keys, warn } from 'syncify:native';
import { isString } from 'syncify:utils';
import { bold } from 'syncify:colors';
import * as log from 'syncify:log';
import { $ } from 'syncify:state';
import { Create } from 'syncify:ansi';

export function stdin (data: Buffer) {

  const input = data.toString().trim().toLowerCase();

  if (input === 'v') {

    const items = keys($.errors);

    for (let i = 0, l = items.length; i < l; i++) {

      const prop = items[i];

      if ($.errors[prop].size === 0) continue;

      if (i > 0) log.hline();

      log.write(bold.whiteBright(prop));

      for (const message of $.errors[prop].values()) {
        if (isString(message) && message.length > 0) {
          error(message);
        }
      }

      $.errors[prop].clear();

    }

    if ($.mode.upload) {
      log.group();
      process.exit(0);
    }

  } else if (input === 's') {

    for (const message of $.errors) {
      if (isString(message) && message.length > 0) {
        error(message);
      }
    }

    $.errors.clear();

  } else if (input === 'w') {

    const warnings = $.warnings[$.log.uri];

    for (const prop of warnings.keys()) {

      const warning = warnings.get(prop);

      if (warning.size === 0) continue;

      const message = Create({ type: 'warning' })
      .Newline('yellow')
      .Ruler()
      .Newline('yellow')
      .Line(prop.toUpperCase(), bold.yellow)
      .Newline('yellow');

      for (const text of warning.values()) {
        if (isString(text) && text.length > 0) {
          message.Line(text);
        }
      }

      warn(message.toString());

      warning.clear();

    }

  }

}
