import type { Choice } from 'types';

import { choose, prompt } from '~prompt';
import { theme } from '~prompts/enquirer';

export async function Action (message: string, choices: Choice[]) {

  const { action } = await prompt<{ action: string }>({
    name: 'action',
    type: 'select',
    multiple: false,
    message,
    theme,
    choices: choose(choices, { prop: 'name', padding: 3 })()
  });

  return action;
}
