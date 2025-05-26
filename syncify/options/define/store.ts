/* eslint-disable no-unused-vars */
import type { FileTargets, LiteralString } from 'types';

import { join } from 'node:path';

import { pathExists, writeFile } from 'fs-extra';

import { bold, COL, cyan } from '@syncify/ansi';

import { setPkg } from './package';

import { throws } from '~cli/throws';
import { warnSevere } from '~cli/warnings';
import { TARGET_FILES } from '~const';
import { error } from '~errors';
import { PromptSelectThemes, PromptStorage, PromptThemeTargets } from '~prompts/targets';
import { assign, has, hasPath, isEmpty, isObject, murmur } from '~utils';
import { parseToml, parseYaml } from '~utils/parsers';

import { $ } from '$';

const enum TargetFile {
  /**
   * No external `stores.toml` or `stores.yaml` config file exists.
   */
  NONE = -1,
  /**
   * An external `stores.toml` file is present
   */
  TOML = 0,
  /**
   * An external `stores.yaml` file is present
   */
  YAML = 1,
  /**
   * An external `stores.yml` file is present
   */
  YML = 2
}

export const enum Action {
  /**
   * Do nothing, this infers targets are already configured.
   */
  NOTHING = 0,
  /**
   * Package.json file contains a "syncify" key, so we will check
   * for externals and if they exist we use them, otherwise use package.json
   */
  PKG_KEY = 1,
  /**
   * We need to check for external files, this is because there is either no
   * `package.json` or no `targets` key defined in `package.json`
   */
  CHECK_FILES = 2,
  /**
   * There is no targets defined in either external files or the `package.json`
   */
  PROMPT = 3,
  /**
   * There is store target but no themes, lets prompt for next action
   */
  PROMPT_THEMES = 4,
  /**
   * This is a final process action which ensures stores match targets
   */
  VALIDATE = 5
}

/**
 * Search for the existence of `stores.toml` or `stores.yaml` file
 * in the projects workspace root directory.
 */
async function getTargetFile () {

  let type: TargetFile = TargetFile.NONE;

  if ($.project.targetSource !== null) {

    const path = join($.cwd, $.project.targetSource);

    type = path.endsWith('toml')
      ? TargetFile.TOML
      : path.endsWith('yaml')
        ? TargetFile.YAML
        : TargetFile.YML;

    if (await pathExists(path)) {
      $.file.targets = path;
      return type;
    }

    $.project.targetSource = null;

    return TargetFile.NONE;

  }

  for (let i = 0, s = TARGET_FILES.length; i < s; i++) {

    const path = join($.cwd, TARGET_FILES[i]);

    if (await pathExists(path)) {
      type = i;
      $.file.targets = path;
      $.project.targetSource = TARGET_FILES[i];
      return type;
    }
  }

  return TargetFile.NONE;

}

/**
 * Parse the external theme file and assign the `$.target` state
 * reference with value, otherwise return `false` and perform action.
 */
async function getStoresFromFile (): Promise<FileTargets> {

  const file = await getTargetFile();

  if (file === TargetFile.TOML) {

    try {

      const targets = await parseToml<FileTargets>($.file.targets);
      return targets;

    } catch (err) {

      // THROW / Process will exit
      error.toml($.file.targets, err);

    }

  } else if (file === TargetFile.YAML || file === TargetFile.YML) {

    try {

      const targets = await parseYaml<FileTargets>($.file.targets);
      return targets;

    } catch (err) {

      // TODO: Improve YAML Parse Errors
      // THROW / Process will exit
      error.throw(err, { file: $.file.targets });
    }

  } else {

    // TODO - PROMPT USER FOR THEME AND STORE ASSOCIATION
    return null;

  }

}

/**
 * Obtain store and theme targets from the available reference points.
 * Looks in the `package.json` file and when not found moves to external
 * `stores.toml` or `stores.yaml` files. If still unable to obtain, proceeds
 * with an actionable operation based on runtime commands and mode.
 */
export async function getTargets (options?: {
  action?: Action,
  method?: LiteralString<'package.json' | 'stores.toml' | 'stores.yaml'>,
  target?: FileTargets,
  banner?: boolean,
  oninit?: boolean
}) {

  let {
    action,
    method,
    target,
    banner,
    oninit
  } = assign({
    action: Action.NOTHING,
    method: undefined,
    target: undefined,
    banner: false,
    oninit: $.mode.init
  }, options);

  if (action === Action.NOTHING) {
    if ($.pkg !== null) {
      if (hasPath('syncify.stores', $.pkg)) {
        if (isObject($.pkg.syncify.stores)) {

          method = 'package.json';

          if (isEmpty($.pkg.syncify.stores)) {
            action = Action.PROMPT_THEMES;
            method = 'package.json';
          } else {
            target = $.pkg.syncify.stores;
            $.project.targetSource = 'package.json';
          }

        } else {
          throws([
            `Invalid store/theme target references defined in ${bold('package.json')} file`
          ], [
            `Syncify expects and ${cyan('object')} type structure`
          ]);
        }
      } else if (has('syncify', $.pkg)) {
        action = Action.PKG_KEY;
        method = 'package.json';
      } else {
        action = Action.CHECK_FILES;
      }
    } else {
      action = Action.CHECK_FILES;
    }
  }

  if (
    action === Action.CHECK_FILES ||
    action === Action.PKG_KEY) {

    const targets = await getStoresFromFile();

    if (targets !== null) {

      method = $.file.targets.endsWith('toml') ? 'stores.toml' : 'stores.yaml';

      if (isEmpty(targets)) {
        action = Action.PROMPT_THEMES;
      } else {
        action = Action.NOTHING;
        target = targets;
      }
    } else if (action === Action.CHECK_FILES) {
      action = Action.PROMPT;
    }
  }

  if (oninit) return;
  if (action === Action.PKG_KEY) action = Action.PROMPT_THEMES;

  if (action === Action.PROMPT) {
    if ($.project.credentials !== null) {
      banner = true;
      action = Action.PROMPT_THEMES;
      method = await PromptStorage([
        'You have not provided store and theme targets. Syncify requires a hard-reference',
        'to be defined in your projects root directory. Please select a storage method to use',
        'and follow the prompts' + COL
      ]);
    }
  }

  if (action === Action.PROMPT_THEMES) {
    if ($.project.credentials !== null) {

      const message = banner ? undefined : [
        'You have not provided theme target references which are required by Syncify.',
        'You can choose to associate existing theme/s from your store or create and publish',
        'a new theme based on the current project' + COL
      ];

      const run = await PromptThemeTargets(message);

      if (run === 'select') {

        const { string, parsed } = await PromptSelectThemes(method);

        if (method !== 'package.json') {

          target = parsed;

          await writeFile($.file.targets, string);

        } else {

          await setPkg({ syncify: parsed });

          target = $.pkg.syncify.stores;

        }

      }
    }
  }

  if ($.project.credentials === null) return;

  const warn = warnSevere('targets');

  $.target.raw = target;

  for (const name in target) {

    if ($.stores.has(name)) {

      $.stores.set(name, {
        get themes () {
          return $.target.raw[name];
        }
      });

    } else {

      warn('missing target credentials', name);

      $.stores.push({
        name,
        domain: `${name}.myshopify.com`,
        password: null,
        token: null,
        get themes () {
          return $.target.raw[name];
        }
      });

    }
  }

  if ($.cmd.target.length === 0) {

    const store = $.stores.default;

    // eslint-disable-next-line no-unreachable-loop
    for (const target in store.themes) {

      const id = store.themes[target];

      $.target.push(
        {
          target,
          id,
          role: 'unknown',
          uid: murmur(store.name, id),
          get store () {
            return $.stores.get(store.name);
          },
          get gid () {
            return `gid://shopify/OnlineStoreTheme/${this.id}`;
          },
          get preview () {
            return `https://${this.store.domain}?preview_theme_id=${this.id}`;
          },
          get editor () {
            return `https://${this.store.domain}/admin/themes/${this.id}/editor`;
          }
        }
      );

      break;

    }

  }

};
