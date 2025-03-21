import type { Stores, Targets } from 'syncify/model/extends';
import type { Choice, Fields, LiteralString, PromiseString, SnippetPromptOptions } from 'types';

import { $import } from 'modules';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { log } from '~cli/log';
import { themesList } from '~http/themeFiles';
import { cancel, intercept, prompt, render, theme } from '~prompt';
import { eqWS, isArray, keys, values } from '~utils';

import { $ } from '$';

function JsonTemplate (store: string) {

  let template = glue.nl(
    `${_.gray(`package.json ${_.CHV} syncify ${_.CHV} stores`)}` + NWL,
    '{',
    `  "${_.white('stores')}": {`,
    `    "${_.white(store.toLowerCase())}": {` + NWL
  );

  return {
    insert: (theme: { name: string; id: number }) => {
      template += `      "\${${theme.name}}": ${_.white(theme.id)},${NWL}`;
    },
    output: () => {
      return template.replace(/,\n$/, '\n') + glue.nl('    }', '  }', '}');
    },
    string: (input: string) => {
      const trim = input.trim();
      return trim.slice(trim.indexOf('{')).trim();
    },
    parse: (input: string) => {
      const trim = input.trim();
      const slice = trim.slice(trim.indexOf('{'));
      return JSON.parse(slice);
    }
  };

}

function TomlTemplate (store: string) {

  let template = glue.nl(
    `${_.gray('theme.toml')}` + NWL,
    `[${store.toLowerCase()}]` + NWL
  );

  return {
    insert: (theme: { name: string; id: number }) => {
      template += `  \${${theme.name}} = ${_.white(theme.id)}${NWL}`;
    },
    output: () => template,
    string: (input: string) => input.trim().replace('theme.toml', '').trim(),
    parse: (input: string) => $import.toml.parse(input)
  };

}

function YamlTemplate (store: string) {

  let template = glue.nl(
    `${_.gray('theme.yaml')}` + NWL,
    `${store.toLowerCase()}:` + NWL
  );

  return {
    insert: (theme: { name: string; id: number }) => {
      template += `  \${${theme.name}}: ${_.white(theme.id)}${NWL}`;
    },
    output: () => template,
    string: (input: string) => input.trim().replace('theme.yaml', '').trim(),
    parse: (input: string) => $import.yaml.load(input.trim().replace('theme.yaml', ''))
  };

}

export async function PromptTargetFileTemplate ({
  store,
  method,
  targets
}: {
  store: Stores,
  targets: Targets,
  method: LiteralString<'package.json' | 'store.toml' | 'store.yaml'>
}) {

  const template = method === 'package.json'
    ? JsonTemplate(store.name)
    : method === 'store.toml'
      ? TomlTemplate(store.name)
      : YamlTemplate(store.name);

  const fields: Fields[] = [];

  for (const theme of targets) {
    template.insert(theme);
    fields.push({
      name: theme.name,
      message: theme.name,
      validate (value, state, field) {

        this.state.symbols.pointer = '';

        if (field && field.name === theme.name) {
          if (/[A-Z]/.test(value)) {
            return _.reset.redBright('  Target name must be lowercase');
          }
          if (/[0-9]/.test(value)) {
            return _.reset.redBright('  Target name cannot contain numbers');
          }
          if (/[ ]/.test(value)) {
            return _.reset.redBright('  Target name cannot contain spaces');
          }
          if (/-/.test(value)) {
            return _.reset.redBright('  Target name cannot contain dashes');
          }
        }

        return true;

      }
    });
  }

  theme.styles.primary = _.neonCyan;
  theme.styles.typing = _.neonGreen;

  const snippet = await prompt<{
    stores: {
      result: string;
      values: {
        [name: string]: string
      };
    }
  }>(<SnippetPromptOptions> {
    theme,
    fields,
    render,
    name: 'stores',
    type: 'snippet',
    required: targets.map(({ name }) => name),
    message: 'Theme Targets',
    newline: _.Tree.next + _.Tree.next,
    template: template.output(),
    format () {

      if (this.state.submitted === true && this.state.completed !== 100) {

        return _.neonGreen(`${this.state.completed}% completed`);

      }

      return `${_.ARR}  ${_.gray(`${this.state.completed}% completed`)}`;

    }

  }).catch(cancel);

  const { result } = snippet.stores;
  const string = template.string(result);
  const parsed = template.parse(string);

  return {
    string,
    parsed
  };

}

export async function PromptSelectThemes (method: LiteralString<
  | 'package.json'
  | 'store.toml'
  | 'store.yaml'
>) {

  const selected: Record<string, Array<{ name: string }>> = {};
  const stores = keys($.target);

  if (stores.length > 1) {

    for (const { target, uid } of $.target) {

      selected[target] = await PromptEachStore($.target.get(uid));

    }

  } else {

    const targets = await PromptEachStore($.stores.default);

    return PromptTargetFileTemplate({
      store: $.stores.default,
      method,
      targets
    });

  }

  async function PromptEachStore (store: Themes) {

    log.spinner('fetching themes', {
      color: _.gray,
      style: 'brielle'
    });

    const items = await themesList(store);
    const themes = items
    .filter(({ role }) => role !== 'demo')
    .sort((a, b) => (a.role === 'main' ? -1 : b.role === 'main' ? 1 : 0));

    const space = eqWS(themes, { prop: 'name' });

    log.spinner.stop();

    const dispose = intercept();

    const resolve: {
      targets: Array<{
        name: string;
        id: number
      }>
    } = await prompt({
      theme,
      name: 'targets',
      type: 'select',
      multiple: true,
      required: true,
      message: 'Select Themes',
      hint: 'Press spacebar to select',
      choices: themes.map<Choice>(
        value => ({
          name: value.name,
          message: value.name,
          hint: `${space(value.name)} ${_.TLD} ${_.gray(value.role)}`,
          value
        })
      ),
      validate (value) {
        this.state.symbols.pointer = _.Tree.red;
        if (value.length === 0) return 'Error: You must select at least 1 theme';
        return true;
      },
      result (names: string[]) {
        return values(this.map(names));
      },
      format (value: string | string[]) {
        if (isArray(value) && value.length > 0) {
          return _.neonGreen(`${value.join(_.whiteBright(', '))}`);
        }
      }
    }).catch(cancel);

    dispose();

    return resolve.targets;
  }
}

/**
 * Prompt selection for the target file storage method to be used.
 */
export async function PromptStorage (message?: string[]): PromiseString<'package.json' | 'store.toml' | 'store.yaml'> {

  !message || log(_.Create({ type: 'warning' }).Wrap(message, _.yellowBright.bold).toLine());

  const resolve: { storage: LiteralString<'package.json' | 'store.toml' | 'store.yaml'> } = await prompt<{
    storage: string
  }>({
    theme,
    message: 'Target Storage',
    name: 'storage',
    type: 'select',
    choices: [
      { name: 'package.json' },
      { name: 'store.toml' },
      { name: 'store.yaml' }
    ]
  }).catch(cancel);

  return resolve.storage;

}

export async function PromptThemeTargets (message?: string[]): PromiseString<'select' | 'create'> {

  !message || log(_.Create({ type: 'warning' }).Wrap(message, _.yellowBright.bold).toLine());

  const resolve: { theme: LiteralString<'select' | 'create'> } = await prompt<{ theme: string }>({
    theme,
    message: 'Theme Targets',
    name: 'theme',
    type: 'select',
    required: true,
    choices: [
      {
        name: 'select',
        message: 'Select Theme',
        hint: '  Links an existing theme/s from the store'
      },
      {
        name: 'create',
        message: 'Create Theme',
        hint: '  Creates a new unpublished theme in the store'
      }
    ]
  }).catch(cancel);

  return resolve.theme;

}
