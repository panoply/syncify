import type { Choice, StringPromptOptions, ArrayPromptOptions } from 'types/internal';
import { BAD, CHK, COL, Tree } from 'syncify:symbol';
import { Create } from 'syncify:ansi';
import { assign } from 'syncify:native';
import { theme as Theme } from 'syncify:cli/prompts';
import { prompt } from 'enquirer';
import * as c from 'syncify:colors';
import * as log from 'syncify:log';
import * as access from 'syncify:requests/access';
import { isBoolean } from 'syncify:utils';
import { copy } from 'fs-extra';
import { $ } from 'syncify:state';
import { join } from 'pathe';

export async function strap () {

  const dir = join($.cwd, 'node_modules', '@syncify/cli', 'straps');
  const straps = {
    dawn: join(dir, 'dawn'),
    dusk: join(dir, 'dusk'),
    silk: join(dir, 'silk')
  };

  const theme = assign({}, Theme, {
    pointer (choice: Choice, index: number) {
      const prefix = this.state.index === index ? Tree.stub.trimEnd() + WSP : Tree.trim + WSP;
      return prefix;
    }
  });

  const { template } = await prompt<{ template: string }>(<ArrayPromptOptions> {
    type: 'select',
    name: 'template',
    message: `Choose Strap${COL}    `,
    required: true,
    theme,
    choices: [
      {
        name: 'dusk',
        message: 'Dusk  ',
        hint: 'Stripped theme'
      },
      {
        name: 'dawn',
        message: 'Dawn  ',
        hint: 'Shopify Slop'
      },
      {
        name: 'silk',
        message: 'Silk  ',
        hint: 'Custom theme'
      }
    ]
  });

  copy(straps[template], $.cwd);

}
