/* eslint-disable no-template-curly-in-string */
import type { Resource, Store } from 'types';
import { list } from 'syncify:requests/themes';
import { $ } from 'syncify:state';
import { isArray, ws } from 'syncify:utils';
import { prompt } from 'enquirer';
import { values } from 'syncify:native';
import { ARR,
  TLD,
  Tree,
  gray,
  lightGray,
  neonCyan,
  neonGreen,
  orange,
  red,
  reset,
  whiteBright,
  yellowBright
} from '@syncify/ansi';

interface Choice {
  name?: string
  message?: string
  value?: any
  hint?: string
  role?: string
  enabled?: boolean
  disabled?: boolean | string
}

const theme = {
  pointer (choice: Choice, i: number): string {
    const item = this.state.index === i ? lightGray('├ ') : lightGray('│ ');
    return i === 0 ? lightGray('│ ') + NWL + item : item;
  },
  prefix: lightGray('│ '),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red.bold,
    warning: yellowBright,
    muted: gray,
    disabled: gray,
    typing: gray
  },
  symbols: {
    ellipsisLarge: '',
    ellipsisSmall: '',
    prefix: {
      pending: '',
      submitted: '✓',
      cancelled: '𐄂'
    },
    separator: {
      pending: '',
      submitted: ' → ',
      cancelled: ' 𐄂 '
    }
  }
};

export async function resources () {

  const { resource }: { action: string } = await prompt(<any>{
    name: 'resource',
    type: 'select',
    message: 'Choose Operation',
    choices: [
      { name: 'Watch', value: 'watch' },
      { name: 'Build', value: 'build' },
      { name: 'Export', value: 'export' },
      { name: 'Import', value: 'import' },
      { name: 'Publish', value: 'publish' },
      {
        role: 'separator',
        message: gray('Remote Resources')
      },
      { name: 'Themes', value: 'themes' },
      { name: 'Pages', value: 'pages' },
      { name: 'Files', value: 'files' },
      { name: 'Redirects', value: 'redirects' },
      { name: 'Metafields', value: 'metafields' }
    ],
    theme,
    result () {
      return this.focused.value;
    },
    format (value: string) {
      return neonGreen(value);
    }
  });

  if (resource === 'themes') {

  }

  const operations = {
    remote: [
      { name: 'List      ', value: 'pull' },
      { name: 'Pull      ', value: 'pull' },
      { name: 'Push      ', value: 'push' },
      { name: 'Merge     ', value: 'merge' },
      { name: 'Publish   ', value: 'publish' },
      { name: 'Unpublish ', value: 'unpublish' },
      { name: 'Delete    ', value: 'delete' }
    ]
  };

}

async function listThemes (store: Store) {

  let separator: number = 0;

  const items = await list(store);
  const themes = items.filter(({ role }) => role !== 'demo');
  const space = ws(themes, 'name');
  const choices = themes.map<Choice>((value) => {

    if (value.name.length > separator) separator = value.name.length;

    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${gray(value.role)}`,
      value
    };

  });

  choices.push(
    {
      role: 'separator',
      message: lightGray('─'.repeat(separator))
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
        message: lightGray('─'.repeat(separator))
      },
      {
        name: 'store',
        message: 'Select Stores',
        hint: `${space('Select Stores')} ${TLD} ${gray('go back and choose store')}`
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
        return neonCyan(`${value.join(whiteBright(', '))}`);
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
            return NWL + reset.redBright('  Target name must be lowercase');
          } else if (/[0-9]/.test(value)) {
            return NWL + reset.redBright('  Target name cannot contain numbers');
          } else if (/[ ]/.test(value)) {
            return NWL + reset.redBright('  Target name cannot contain spaces');
          } else if (/-/.test(value)) {
            return NWL + reset.redBright('  Target name cannot contain dashes');
          }

        }

        return true;

      }
    });
  }

  theme.styles.primary = neonCyan.italic;
  theme.styles.typing = neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet: {
    stores: {
      values: {
        [name: string]: string
      };
      result: string;
    }
  } = await prompt(<any>{
    name: 'stores',
    type: 'snippet',
    required: targets.map(({ name }) => name),
    message: 'Theme Targets',
    newline: NWL,
    format () {

      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return neonGreen(`${this.state.completed}% completed`);
        }
      }

      return ` ${ARR}  ${orange(`${this.state.completed}% completed`)}`;

    },
    theme,
    fields,
    template
  });

  const json = { syncify: JSON.parse(snippet.stores.result) };

  const save = await prompt({
    name: 'save',
    type: 'confirm',
    message: 'Save Settings',
    theme,
    initial: true,
    newline: NWL,
    format () {
      return /^[ty1]/i.test(this.input) ? 'Yes' : 'No';
    },
    footer: Tree.line + [
      '',
      gray('The following store and theme references will be saved'),
      gray('to your package.json file on the syncify key property.'),
      '',
      JSON.stringify(json.syncify, null, 2).split(NWL).join(NWL + Tree.line),
      ''

    ].join(NWL + Tree.line)

  });

  console.log(save);

}

export async function listStores () {

  const space = ws($.sync.stores, 'store');
  const choices = $.sync.stores.map((value) => {
    return {
      name: value.domain,
      message: value.store,
      hint: `${space(value.store)} ${TLD} ${gray(`https://${value.domain}`)}`,
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
      return neonGreen(value);
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
