import type { SnippetPromptOptions, Store, StoreThemes } from 'types';

import * as _ from '@syncify/ansi';

import { themesList } from '~http/themeFiles/themesList';
import { setPkg } from '~options/define/package';
import { labels, prompt } from '~prompt';
import { render, theme } from '~prompts/enquirer';
import { eqWS, isArray, values } from '~utils';

import { $ } from '$';

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

  /** TUI Tree */
  const stdout = _.Create({ type: 'info' });

  /** Prompt Labels */
  const label = labels({
    padding: 3,
    prompts: <const>[
      'Associate',
      'Create',
      'Publish',
      'Unpublish',
      'Remove'
    ]
  });

  /** Prompt Greeting */
  const greeting = stdout.Wrap(
    `Select themes to target and develop on. Selections will be written to the ${_.cyan('package.json')}`,
    'file. If you wish to create, publish of change theme role, this is also possible.'
    , _.gray
  );

  let separator: number = 0;

  const items = await themesList(store);
  const themes = items.filter(({ role }) => role !== 'demo');
  const space = eqWS(themes, { prop: 'name' });
  const choices = themes.map<Choice>((value) => {

    if (value.name.length > separator) separator = value.name.length;

    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${_.TLD} ${_.gray(value.role)}`,
      value
    };

  });

  choices.push(
    {
      role: 'separator',
      message: _.lightGray('─'.repeat(separator))
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

  if ($.stores.length > 1) {
    choices.push(
      {
        role: 'separator',
        message: _.lightGray('─'.repeat(separator))
      },
      {
        name: 'store',
        message: 'Select Stores',
        hint: `${space('Select Stores')} ${_.TLD} ${_.gray('go back and choose store')}`
      }
    );
  }

  const { targets }: { targets: StoreThemes.Nodes[] } = await prompt(<any>{
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
        return _.neonCyan(`${value.join(_.whiteBright(', '))}`);
      }
    }
  });

  const config = { themes: { [store.name]: {} } };
  const fields: any[] = [];

  for (const theme of targets) {

    config.themes['${' + theme.name + '}'] = theme.id;

    fields.push({
      name: theme.name,
      message: theme.name,
      validate (value: string, _: any, field: { name: string }) {

        if (field && field.name === theme.name) {
          if (/[A-Z]/.test(value)) {
            return NWL + _.reset.redBright('  Target name must be lowercase');
          } else if (/[0-9]/.test(value)) {
            return NWL + _.reset.redBright('  Target name cannot contain numbers');
          } else if (/[ ]/.test(value)) {
            return NWL + _.reset.redBright('  Target name cannot contain spaces');
          } else if (/-/.test(value)) {
            return NWL + _.reset.redBright('  Target name cannot contain dashes');
          }

        }

        return true;

      }
    });
  }

  theme.styles.primary = _.neonCyan.italic;
  theme.styles.typing = _.neonGreen;
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
    newline: _.Tree.next + _.Tree.next,
    render,
    format () {

      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return _.neonGreen(`${this.state.completed}% completed`);
        }
      }

      return ` ${_.ARR}  ${_.orange(`${this.state.completed}% completed`)}`;

    },
    theme,
    fields,
    template
  });

  const json = { syncify: JSON.parse(snippet.stores.result) };

  const { save } = await prompt<{ save: boolean }>(<any>{
    name: 'save',
    type: 'confirm',
    message: 'Save Settings',
    theme,
    initial: true,
    newline: NWL,
    format () {
      return /^[ty1]/i.test(this.input) ? 'Yes' : 'No';
    },
    footer: _.Tree.line + [
      '',
      _.gray('The following store and theme references will be saved'),
      _.gray('to your package.json file on the syncify key property.'),
      '',
      ' ' + JSON.stringify(json.syncify, null, 2).split(NWL).join(_.Tree.next),
      ''

    ].join(NWL + _.Tree.line)

  });

  if (save) {

    await setPkg({
      syncify: {
        targets: JSON.parse(snippet.stores.result)
      }
    });

  }

  return $.pkg.syncify.stores;

}

export async function listStores () {

  const space = eqWS($.stores, { prop: 'name' });
  const choices = $.stores.map((value) => ({
    name: value.name,
    message: value.domain,
    hint: `${space(value.name)} ${_.TLD} ${_.gray(`https://${value.domain}`)}`,
    value
  }));

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
      return _.neonGreen(value);
    }
  });

  return listThemes(store);

}

export async function Link () {

  const stores = values($.stores);

  if (stores.length > 1) {

    return listStores();

  } else {

    return listThemes($.stores.default);

  }
}
