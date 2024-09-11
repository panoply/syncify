import { Args } from 'types/internal';
import { parseArgs } from 'node:util';
import { $ } from 'syncify:state';
import { assign } from 'syncify:utils/native';
import { has } from 'syncify:utils';
import { setBaseDirs } from 'syncify:options/dirs';
import { setModes } from 'syncify:options/modes';

export function cmd (args: string[], options: Omit<Args, 'strap' | 'mode' | 'store'>) {

  const { values, tokens } = parseArgs({
    args,
    options,
    allowPositionals: true,
    tokens: true
  });

  $.argv = args.slice(2).join(WSP).trimStart();
  $.cmd = assign(values);

  if (tokens[2].kind === 'positional') {
    for (const token of tokens.slice(2)) {
      if (token.kind !== 'positional') break;
      if (/\b(themes|strap|setup)\b/.test(token.value)) {
        $.cmd.mode = token.value;
      } else {
        $.cmd.stores = token.value.split(',').filter(Boolean);
      }
    }
  }

  if (!has('stores', $.cmd)) $.cmd.stores = [];

  $.env.cli = true;
  $.env.prod = $.cmd.prod;
  $.env.dev = $.cmd.dev && !$.cmd.prod;
  $.terminal.wrap = Math.round($.terminal.cols - ($.terminal.cols / 3));

  setModes($.cmd);
  setBaseDirs($.cmd);

  return $.cmd;

};
