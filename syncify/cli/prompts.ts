import type { Resource, Store } from 'types';
import type { ArrayPromptOptions, Choice, BooleanPromptOptions, StringPromptOptions } from 'types/internal';
import { TLD, Tree, ARR, COL } from '@syncify/ansi';
import * as u from 'syncify:utils';
import { $ } from 'syncify:state';
import { prompt } from 'enquirer';
import { list } from 'syncify:requests/themes';
import { isArray, ws } from 'syncify:utils';
import { log, values } from 'syncify:native';
import * as c from '@syncify/ansi';

export const theme = {
  prefix: c.lightGray('│ '),
  styles: {
    primary: c.neonGreen,
    success: c.neonGreen,
    danger: c.red.bold,
    warning: c.yellowBright,
    muted: c.gray,
    disabled: c.gray,
    typing: c.gray
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
  },
  pointer (choice: Choice, index: number) {
    const prefix = this.state.index === index ? Tree.stub.trimEnd() + WSP : Tree.trim + WSP;
    return index === 0 ? (Tree.trim + NWL + prefix) : prefix;
  }
};

export async function Create () {

}

export async function Connect (store: Store) {

  let separator: number = 0;

  const style = { ...theme };
  const items = await list(store);
  const themes = items.filter(({ role }) => role !== 'demo');
  const space = ws(themes, 'name');
  const choices = themes.map<Choice>((value) => {
    if (value.name.length > separator) separator = value.name.length;
    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${c.gray(value.role)}`,
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
      message: 'Create Theme',
      value: 'create'
    }
  );

  const { targets } = await prompt< { targets: Resource.Theme[] }>(<ArrayPromptOptions>{
    name: 'targets',
    type: 'select',
    multiple: true,
    message: 'Select Themes',
    hint: 'Press spacebar to select',
    theme: style,
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

  const config = { domain: store.store.toLowerCase(), themes: {} };
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

  style.styles.primary = c.neonCyan.italic;
  style.styles.typing = c.neonGreen;
  const template = JSON.stringify(config, null, 2);
  const snippet = await prompt<{
    stores: {
      values: {
        [name: string]: string
      };
      result: string;
    }
  }>(<any>{
    name: 'stores',
    type: 'snippet',
    required: targets.map(({ name }) => name),
    message: 'Theme Targets',
    newline: NWL,
    theme: style,
    fields,
    template,
    format () {

      if (this.state.submitted === true) {
        if (this.state.completed !== 100) {
          return c.neonGreen(`${this.state.completed}% completed`);
        }
      }

      return ` ${ARR}  ${c.orange(`${this.state.completed}% completed`)}`;
    }
  });

  const json = { syncify: JSON.parse(snippet.stores.result) };

  const save = await prompt(<BooleanPromptOptions>{
    name: 'save',
    type: 'confirm',
    message: 'Save Settings',
    theme: style,
    initial: true,
    newline: NWL,
    format () {
      return /^[ty1]/i.test(this.input) ? 'Yes' : 'No';
    },
    footer: Tree.line + [
      NIL,
      c.gray('The following store and theme references will be saved'),
      c.gray('to your package.json file on the syncify key property.'),
      NIL,
      JSON.stringify(json.syncify, null, 2)
      .split(NWL)
      .join(NWL + Tree.line),
      NIL
    ].join(NWL + Tree.line)

  });

  console.log(save);

}

/* -------------------------------------------- */
/* PROMPTS                                      */
/* -------------------------------------------- */

/**
 * Stores Prompt
 */
export async function Stores <T> (type: 'select' | 'multiselect'): Promise<T> {

  const space = u.ws($.sync.stores, 'store');
  const choices = $.sync.stores.map((value) => ({
    name: value.domain,
    message: value.store,
    hint: `${space(value.store)} ${TLD} ${c.gray(`https://${value.domain}`)}`,
    value
  }));

  return prompt(<ArrayPromptOptions>{
    name: 'store',
    message: 'Select Stores',
    type,
    choices,
    theme,
    result () {
      return this.focused.value;
    },
    format (value: string) {
      return c.neonGreen(value);
    }
  });

}

/**
 * Theme Targets
 */
export async function Target (domain: string): Promise<{ target: string }> {

  return prompt(<ArrayPromptOptions>{
    type: 'select',
    name: 'target',
    message: 'Theme Resources',
    theme,
    choices: [
      {
        name: 'Connect',
        hint: `     Connect themes from ${domain}`,
        value: 'connect'
      },
      {
        name: 'List',
        hint: `        List all themes from ${domain}`,
        value: 'list'
      },
      {
        name: 'Publish',
        hint: `     Publish theme on ${domain}`,
        value: 'publish'
      },
      {
        name: 'Unpublish',
        hint: `   Unpublish theme on ${domain}`,
        value: 'unpublish'
      },
      {
        name: 'Delete',
        hint: `      Delete theme on ${domain}`,
        value: 'delete'
      }
    ]
  });

}

/**
 * Theme Target Actions
 */
export async function Actions <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Choose Action',
    theme,
    choices: [
      {
        name: 'Watch',
        hint: 'watch and build theme from source',
        value: 'watch'
      },
      {
        name: 'Build',
        hint: 'Build theme from source',
        value: 'build'
      },
      {
        name: 'Export',
        hint: 'Export from output',
        value: 'export'
      },
      {
        name: 'Upload',
        hint: 'Upload an export',
        value: 'upload'
      },
      {
        name: 'Import',
        hint: 'Download a theme from store',
        value: 'import'
      }
    ]
  });

}

/**
 * Theme Targets
 */
export async function Option <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Options',
    theme,
    choices: [
      {
        name: 'HOT Reloading',
        hint: 'Live reload in changes',
        value: 'hot'
      },
      {
        name: 'Development',
        hint: 'Run in development mode',
        value: 'dev'
      },
      {
        name: 'Production',
        hint: 'Run in production mode',
        value: 'prod'
      },
      {
        name: 'Terser',
        hint: 'Run in terser mode',
        value: 'terse'
      }
    ]
  });

}

/**
 * Pages Prompt
 */
export async function Pages <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Page Resource',
    theme,
    choices: [
      {
        name: 'Push',
        hint: `Upload pages to ${domain}`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download pages from ${domain}`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: 'Merge remote pages with local records',
        value: 'merge'
      },
      {
        name: 'Delete',
        hint: `Delete pages from ${domain}`,
        value: 'delete'
      },
      {
        name: 'Publish',
        hint: `Publish pages on ${domain}`,
        value: 'pushlist'
      },
      {
        name: 'Unpublish',
        hint: `Unpublish pages on ${domain}`,
        value: 'unpublish'
      }
    ]
  });

}

/**
 * Pages Prompt
 */
export async function Assets <T> (theme: string, domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Asset Resources',
    initial: 0,
    choices: [
      {
        name: 'Delete',
        hint: `Delete asset in ${theme} → ${domain} from remote source`,
        value: 'delete'
      },
      {
        name: 'Push',
        hint: `Upload assets to ${theme} → ${domain} from local source`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download assets from ${theme} → ${domain} to export directory`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: `Merge assets from ${theme} → ${domain} to local source`,
        value: 'merge'
      }
    ]
  });

}

/**
 * Pages Prompt
 */
export async function Metafields <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Metafield Resources',
    theme,
    choices: [
      {
        name: 'Push',
        hint: `Upload metafields to ${domain}`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download metafields from ${domain}`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: 'Merge remote metafields with local records',
        value: 'merge'
      },
      {
        name: 'Delete',
        hint: `Delete metafields from ${domain}`,
        value: 'delete'
      }
    ]
  });

}
