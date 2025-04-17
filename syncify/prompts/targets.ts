import type { Fields, LiteralString, OnlineStoreTheme, PromiseString, SnippetPromptOptions, Store } from 'types';

import { join } from 'node:path';

import { $import } from 'modules';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { log } from '~cli/log';
import { themesList } from '~http/themeFiles';
import { setPkg } from '~options/define/package';
import { cancel, choose, intercept, label, prompt, render, theme } from '~prompt';
import { delay, isArray, timeAgo, values } from '~utils';

import { $ } from '$';

function JsonTemplate (store: string) {

  let template = glue.nl(
    `${_.gray(`package.json ${_.CHV} syncify ${_.CHV} stores`)}` + NWL,
    '{',
    `  "${_.white('stores')}": {`,
    `    "${_.white(store.toLowerCase())}": {` + NWL
  );

  return {
    insert: (theme: { name: string; id: string; }) => {
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

async function TomlTemplate (store: string) {

  await $import('smol-toml');

  let template = glue.nl(
    `${_.gray('stores.toml')}` + NWL,
    `[${store.toLowerCase()}]` + NWL
  );

  return {
    insert: (theme: { name: string; id: string }) => {
      template += `  \${${theme.name}} = ${_.magentaBright(theme.id)}${NWL}`;
    },
    output: () => template,
    string: (input: string) => input.trim().replace('stores.toml', '').trim(),
    parse: (input: string) => $import.toml.parse(input)
  };

}

async function YamlTemplate (store: string) {

  await $import('js-yaml');

  let template = glue.nl(
    `${_.gray('stores.yaml')}` + NWL,
    `${store.toLowerCase()}:` + NWL
  );

  return {
    insert: (theme: { name: string; id: string }) => {
      template += `  \${${theme.name}}: ${_.magentaBright(theme.id)}${NWL}`;
    },
    output: () => template,
    string: (input: string) => input.trim().replace('stores.yaml', '').trim(),
    parse: (input: string) => $import.yaml.load(input.trim().replace('stores.yaml', ''))
  };

}

export async function PromptTargetFileTemplate ({ store, method, targets }: {
  store: Store,
  targets: OnlineStoreTheme[],
  method: LiteralString<'package.json' | 'stores.toml' | 'stores.yaml'>
}) {

  const template = method === 'package.json'
    ? JsonTemplate(store.name)
    : method === 'stores.toml' ? await TomlTemplate(store.name) : await YamlTemplate(store.name);

  const fields: Fields[] = [];

  for (const { name, id } of targets) {
    template.insert({ name, id });
    fields.push({
      name,
      message: name,
      validate (value, state, field) {

        this.state.symbols.pointer = _.Tree.red;

        if (field && field.name === name) {
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
    message: label.DefineTargets,
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
  | 'stores.toml'
  | 'stores.yaml'
>) {

  const selected: Record<string, Array<{ name: string }>> = {};

  if ($.stores.length > 1) {

    for (const store of $.stores) {
      selected[store.name] = await PromptEachStore(store);
    }

  } else {

    const targets = await PromptEachStore($.stores.default);

    return PromptTargetFileTemplate({
      store: $.stores.default,
      method,
      targets
    });

  }

  async function PromptEachStore (store: Store) {

    log.spinner('Fetching Themes', { color: _.gray });

    const items = await themesList(store);
    const themes = items
    .filter(({ role }) => role !== 'demo')
    .sort((a, b) => (a.role === 'main' ? -1 : b.role === 'main' ? 1 : 0));

    await delay();

    log.spinner.stop();

    const dispose = intercept();
    const resolve = await prompt<{ targets: Record<string, OnlineStoreTheme> }>({
      theme,
      name: 'targets',
      type: 'select',
      multiple: true,
      required: true,
      message: label.SelectThemes,
      hint: '   Press spacebar to select',
      choices: choose(themes, { prop: 'name' })((choice, value) => {

        const updated = timeAgo(choice.updatedAt);
        const label = updated + ' '.repeat((14 - updated.length));

        return {
          name: choice.name,
          hint: choice.role === 'MAIN'
            ? _.gray(`updated ${label + _.ARR + WSR + _.neonCyan('Live Theme')}`)
            : _.gray(`updated ${label}`),
          value: choice
        };
      }),
      validate (value) {
        this.state.symbols.pointer = _.Tree.red;
        return value.length === 0 ? 'You must select at least 1 theme' : true;
      },
      result (names: string[]) {
        return this.map(names);
      },
      format (value: string | string[]) {
        if (isArray(value) && value.length > 0) {
          return _.neonGreen(`${value.join(_.whiteBright(', '))}`);
        }
      }
    }).catch(cancel);

    dispose();

    return values(resolve.targets);

  }
}

/**
 * Prompt selection for the target file storage method to be used.
 */
export async function PromptStorage (message?: string[]) {

  if (message) {
    _.Create({ type: 'warning' })
    .Wrap(message, _.yellowBright.bold)
    .Newline('line')
    .toLog({ clear: true });
  }

  const resolve = await prompt<{ storage: LiteralString<'package.json' | 'stores.toml' | 'stores.yaml'> }>({
    theme,
    message: label.TargetStorage,
    name: 'storage',
    type: 'select',
    choices: choose([
      { name: 'package.json', hint: 'Saves targets in package.json file' },
      { name: 'stores.toml', hint: 'Saves targets in stores.toml file' },
      { name: 'stores.yaml', hint: 'Saves targets in stores.yaml file' }
    ], {
      prop: 'name',
      padding: 4
    })()
  }).catch(cancel);

  if (resolve.storage === 'package.json' && $.pkg === null) {

    await setPkg({
      version: `${$.vc.patch}.${$.vc.minor}.${$.vc.major}`,
      name: $.project.name,
      private: true,
      description: '',
      license: 'UNLICENSED'
    });

  }

  $.project.targetSource = resolve.storage;
  $.file.targets = join($.cwd, resolve.storage);

  return resolve.storage;

}

export async function PromptThemeTargets (message?: string[]): PromiseString<'select' | 'create'> {

  if (message) {
    _.Create({ type: 'warning' })
    .Wrap(message, _.yellowBright.bold)
    .Newline('line')
    .toLog({ clear: true });
  }

  const resolve = await prompt<{
    theme: LiteralString<'select' | 'create'>
  }>({
    theme,
    message: label.ThemeTargets,
    type: 'select',
    name: 'theme',
    required: true,
    choices: choose([
      {
        name: 'select',
        message: 'Select Theme',
        hint: 'Link existing theme/s from the store'
      },
      {
        name: 'create',
        message: 'Create Theme',
        disabled: true,
        hint: 'Create a new unpublished theme in the store'
      }
    ], {
      padding: 3,
      prop: 'message'
    })()

  }).catch(cancel);

  return resolve.theme;

}
