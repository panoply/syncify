/* eslint-disable no-template-curly-in-string */
import type { Resource, Store } from 'types';
import type { SnippetPromptOptions } from 'types/internal';
import { list } from 'syncify:requests/themes';
import { $ } from 'syncify:state';
import { hasPath, isArray } from 'syncify:utils';
import { prompt } from 'enquirer';
import { render, theme } from 'syncify:prompts/enquirer';
import { values } from 'syncify:native';
import * as c from '@syncify/ansi';

interface Choice {
  name?: string
  message?: string
  value?: any
  hint?: string
  role?: string
  enabled?: boolean
  disabled?: boolean | string
}

export async function listThemes (store: Store) {

  let separator: number = 0;

  const items = await list(store);
  const themes = items.filter(({ role }) => role !== 'demo');
  const space = c.eq(themes, 'name');
  const choices = themes.map<Choice>((value) => {

    if (value.name.length > separator) separator = value.name.length;

    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${c.TLD} ${c.gray(value.role)}`,
      value
    };

  });

  choices.push(
    {
      role: 'separator',
      message: c.lightGray('─'.repeat(separator))
    },
    {
      name: 'create',
      message: 'Create Theme'
    },
    {
      name: 'create',
      message: 'Remove Theme'
    }

  );

  if ($.sync.stores.length > 1) {
    choices.push(
      {
        role: 'separator',
        message: c.lightGray('─'.repeat(separator))
      },
      {
        name: 'store',
        message: 'Select Stores',
        hint: `${space('Select Stores')} ${c.TLD} ${c.gray('go back and choose store')}`
      }
    );
  }

  const { targets }: { targets: Resource.Theme[] } = await prompt(<any>{
    name: 'targets',
    type: 'select',
    multiple: true,
    message: 'Select Themes',
    hint: 'Press spacebar to select',
    theme,
    choices,
    result (names: string[]) {
      return values(this.map(names));
    },
    format (value: string | string[]) {
      if (isArray(value) && value.length > 0) {
        return c.neonCyan(`${value.join(c.whiteBright(', '))}`);
      }
    }
  });

  const config = {
    domain: store.store.toLowerCase(),
    themes: {}
  };

  const fields: any[] = [];

  for (const theme of targets) {

    config.themes['${' + theme.name + '}'] = theme.id;

    fields.push({
      name: theme.name,
      message: theme.name,
      validate (value: string, _: any, field: { name: string }) {

        if (field && field.name === theme.name) {
          if (/[A-Z]/.test(value)) {
            return NWL + c.reset.redBright('  Target name must be lowercase');
          } else if (/[0-9]/.test(value)) {
            return NWL + c.reset.redBright('  Target name cannot contain numbers');
          } else if (/[ ]/.test(value)) {
            return NWL + c.reset.redBright('  Target name cannot contain spaces');
          } else if (/-/.test(value)) {
            return NWL + c.reset.redBright('  Target name cannot contain dashes');
          }

        }

        return true;

      }
    });
  }

  theme.styles.primary = c.neonCyan.italic;
  theme.styles.typing = c.neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet = await prompt<{
    stores: {
      values: {
        [name: string]: string
      };
      result: string;
    }
  }>(<SnippetPromptOptions> {
    name: 'stores',
    type: 'snippet',
    required: targets.map(({ name }) => name) as any,
    message: 'Theme Targets',
    newline: c.Tree.next + c.Tree.next,
    render,
    format () {

      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return c.neonGreen(`${this.state.completed}% completed`);
        }
      }

      return ` ${c.ARR}  ${c.orange(`${this.state.completed}% completed`)}`;

    },
    theme,
    fields,
    template
  });

  const json = { syncify: JSON.parse(snippet.stores.result) };

  const save = await prompt(<any>{
    name: 'save',
    type: 'confirm',
    message: 'Save Settings',
    theme,
    initial: true,
    newline: NWL,
    format () {
      return /^[ty1]/i.test(this.input) ? 'Yes' : 'No';
    },
    footer: c.Tree.line + [
      '',
      c.gray('The following store and theme references will be saved'),
      c.gray('to your package.json file on the syncify key property.'),
      '',
      JSON.stringify(json.syncify, null, 2).split(NWL).join(c.Tree.next),
      ''

    ].join(NWL + c.Tree.line)

  });

  if (hasPath('syncify.config', $.pkg)) {

    json.syncify.config = $.pkg.config;

  }

  console.log(save);

}

export async function listStores () {

  const space = c.eq($.sync.stores, 'store');
  const choices = $.sync.stores.map((value) => {
    return {
      name: value.domain,
      message: value.store,
      hint: `${space(value.store)} ${c.TLD} ${c.gray(`https://${value.domain}`)}`,
      value
    };
  });

  const { store }: { store: Store } = await prompt(<any>{
    name: 'store',
    type: 'select',
    message: 'Select Stores',
    choices,
    theme,
    result () {
      return this.focused.value;
    },
    format (value: string) {
      return c.neonGreen(value);
    }
  });

  return listThemes(store);

}

export async function themes () {

  if ($.sync.stores.length > 1) {

    return listStores();

  } else {

    return listThemes($.sync.stores[0]);

  }
}
