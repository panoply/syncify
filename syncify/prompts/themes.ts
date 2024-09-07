import type { Resource, Store } from 'types';
import type { Choice, ArrayPromptOptions, BooleanPromptOptions } from 'types/internal';
import { list } from 'syncify:requests/themes';
import { theme as themeing } from 'syncify:cli/prompts';
import { isArray, merge, ws } from 'syncify:utils';
import { prompt } from 'enquirer';
import { values } from 'syncify:native';
import { ARR, TLD, Tree } from 'syncify:symbol';
import * as c from 'syncify:colors';

export async function Connect (store: Store) {

  let separator: number = 0;

  const theme = merge(themeing);
  const items = await list(store);
  const themes = items.filter(({ role }) => role !== 'demo');
  const space = ws(themes, 'name');
  const choices = themes.map<Choice>((value) => {

    if (value.name.length > separator) {
      separator = value.name.length;
    }

    return {
      name: value.name,
      message: value.name,
      hint: `${space(value.name)} ${TLD} ${c.gray(value.role)}`,
      value
    };

  });

  const { targets } = await prompt<{
    targets: Resource.Theme[]
  }>(<ArrayPromptOptions>{
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
  }>(<any>{
    name: 'stores',
    type: 'snippet',
    required: targets.map(({ name }) => name),
    message: 'Theme Targets',
    newline: NWL,
    theme,
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
    theme,
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
