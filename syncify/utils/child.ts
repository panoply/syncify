import { command } from './native';
import * as throws from 'syncify:log/throws';
import { cyan } from '@syncify/ansi';

export async function execAsync (cmd: string) {

  try {

    const { stdout } = await command(cmd);

    return stdout;

  } catch (e) {

    throws.throwError(e, [
      `This ${cyan('child_process')} error and likely unrelated to Syncify.`,
      'It is unclear what has caused the issue, but consult the error message',
      'or please submit an issue on github repository'
    ]);

  }
}
