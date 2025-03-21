import type { Choice, LiteralString, Paths, StringPromptOptions } from 'types';

import { join, relative } from 'path';

import { glob } from 'fast-glob';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { PATH_KEYS } from '~const';
import { cancel, labels, prompt } from '~prompt';
import { theme } from '~prompts/enquirer';
import { assign, constructTree, s } from '~utils';

import { $ } from '$';

interface State {
  /**
   * The action which applies
   *
   * @default 'select'
   */
  action?: LiteralString<'select' | 'create' | 'cancel'>;
  /**
   * Directory selected
   *
   * @default null
   */
  directory?: string;
  /**
   * Directory name to be created. A value of `null` prevents creation
   *
   * @default null
   */
  dirName?: string;
  /**
   * Renders the base input directories selection
   *
   * @default null
   */
  pathDir?: LiteralString<keyof Paths>
  /**
   * Renders sub-directories within base input directories
   *
   * @default null
   */
  subDir?: string;
}

/**
 * Applies Tree indentation
 */
const indent = (index: number, tree: string) => index === 0
  ? _.Tree.trim + NWL + _.lightGray(tree)
  : _.lightGray(tree);

/**
 * Obtains all possible sub-directory paths in accordance with
 * configuration `paths` entries.
 */
const getPaths = async () => {

  const model: Record<string, {
    path?: string;
    name?: string;
    tree?: string;
    space?: string;
  }[]> = {};

  for (const key of PATH_KEYS) {

    const paths = $.paths[key].config
    .filter(c => c.indexOf('/*') > 0)
    .map(c => c.slice(0, c.indexOf('/*')));

    const match = await glob($.paths[key].config, {
      markDirectories: true,
      onlyDirectories: true
    });

    const dirs = [ ...s([ ...match, ...paths ].map(x => relative($.dirs.input, x))) ].sort();

    model[key] = buildTree(dirs);

  }

  return model;
};

function buildTree (paths: string[]) {

  const tree = {};
  const item: Array<{ path?: string; name?: string; tree?: string; space?: string; }> = [];

  for (const path of paths) {
    let current = tree;
    path.split('/').forEach(segment => {
      current[segment] = current[segment] || {};
      current = current[segment];
    });
  }

  function printTree (object: any, prefix = '') {

    Object.entries<string>(object).forEach(([ name, path ], index, entries) => {
      const isLast = index === entries.length - 1;
      const tree = `${prefix}${isLast ? '└─' : '├─'}`;
      const space = tree + ' ' + name;
      item.push({ tree, name, path: paths[index], space });
      printTree(path, `${prefix}${isLast ? '  ' : '│  '}`);
    });

  }

  printTree(tree);

  return item;

}

/**
 * Select Directories Prompt
 *
 * This is a prompt interface used for directory selection
 * or creation. Rendered via various modes with additional
 * context is required from the user.
 */
export async function selectDirsPrompt (options: State) {

  const state = assign<State, State>({
    action: 'select',
    directory: null,
    pathDir: null,
    dirName: null,
    subDir: null
  }, options);

  /** Prompt Labels */
  const label = labels({
    padding: 0,
    prompts: <const>[
      'Action',
      'Directory Name',
      'Path Directory',
      'Sub-Directory'
    ]
  });

  if (state.action !== 'select') {
    state.action = await PromptAction();
  }

  if (state.action === 'create') {
    state.dirName = await PromptDirectoryName();
  }

  if (state.directory === null) {
    state.directory = await PromptDirectories();
  }

  if (state.pathDir === null) {
    state.pathDir = await PromptPathDirectories();
  }

  if (state.pathDir !== null) {
    state.subDir = await PromptSubDirectories();
  }

  /* -------------------------------------------- */
  /* PROMPTS                                      */
  /* -------------------------------------------- */

  /**
   * Prompt Action
   *
   * Renders the action to take
   */
  async function PromptAction () {

    const resolve: { action: string } = await prompt<{ action: string }>({
      theme,
      message: label.Action,
      name: 'action',
      type: 'select',
      required: true,
      choices: [
        {
          name: 'select',
          message: 'Select',
          hint: '    Select an existing directory'
        },
        {
          name: 'create',
          message: 'Create',
          hint: '    Create a new sub-directory'
        },
        {
          name: 'cancel',
          message: 'Cancel',
          hint: '    Cancel and exit'
        }
      ]
    }).catch(cancel);

    return resolve.action;
  }

  /**
   * Prompt Directories
   *
   * Renders all directories in input
   */
  async function PromptDirectories () {

    const match = await glob($.dirs.input + '**', { markDirectories: true, onlyDirectories: true });
    const tree = constructTree(match.sort().map(path => relative($.cwd, path)));
    const choices = tree.map<Choice>(({ name, tree, path }, index) => ({
      name,
      value: path,
      message: name,
      indent: index === 0
        ? glue(_.Tree.trim, NWL, _.lightGray('└─┬─'))
        : _.lightGray(tree)
    }));

    const resolve: { dir: LiteralString<keyof Paths> } = await prompt<{ dir: string }>({
      theme,
      message: label.PathDirectory,
      name: 'dir',
      type: 'select',
      choices,
      pointer (choice: Choice, index: number): string {
        choice.hint = this.state.index === index ? glue(WSP, _.TLD, _.gray(choice.value)) : NIL;
        return '';
      }
    }).catch(cancel);

    return resolve.dir;

  }

  /**
   * Prompt Directory Name
   *
   * Renders the directory name input
   */
  async function PromptDirectoryName () {

    const { dirname } = await prompt<{ dirname: string }>(<StringPromptOptions> {
      theme,
      type: 'input',
      name: 'dirname',
      message: 'Directory Name',
      required: true,
      validate (value) {

        if (value.length === 0) {

          return _.Multiline(
            _.red.bold('REQUIRED'),
            NWL,
            'You must provide a directory name to be created.',
            'Keep it simple, lowercase and no special characters or whitespace.'
          );

        } else if (!/[@A-Za-z0-9_+-]+/.test(value)) {

          return _.Multiline(
            _.red.bold('INVALID NAME'),
            NWL,
            'The project directory name is invalid or contains bad characters.',
            `Names must match the following pattern${_.COL} ${_.cyan('[A-Za-z0-9_+-]+')}`
          );

        }

        return true;

      }
    }).catch(cancel);

    return dirname;

  }

  /**
   * Prompt Path Directories
   *
   * Renders the base directories contained in `input`
   */
  async function PromptPathDirectories () {

    const choices = PATH_KEYS.sort().map<Choice>(name => ({
      name,
      value: name,
      message: name
    }));

    choices.push({
      role: 'separator',
      message: _.lightGray('─'.repeat(50))
    }, {
      name: 'create',
      message: 'Create',
      hint: 'Create a new sub-directory'
    });

    const resolve: { pathdir: LiteralString<keyof Paths> } = await prompt<{ pathdir: string }>({
      theme,
      message: label.PathDirectory,
      name: 'pathdir',
      type: 'select',
      choices
    }).catch(cancel);

    return resolve.pathdir;

  }

  /**
   * Prompt Sub-Directories
   *
   * Renders a tree choice selection of sub-directories
   */
  async function PromptSubDirectories () {

    /** Project Paths */
    const paths = await getPaths();

    const choices = paths[state.pathDir].map<Choice>(({ name, tree, path }) => ({
      name,
      message: name,
      value: join($.cwd, path),
      indent: _.lightGray(tree)
    }));

    choices.unshift({
      name: '*',
      message: state.pathDir,
      value: join($.config.input, state.pathDir, '*'),
      indent: _.Tree.line
    });

    const resolve = await prompt<{ subdir: string }>({
      theme,
      message: label.SubDirectory,
      name: 'subdir',
      type: 'select',
      hint: 'Select the sub-directory',
      choices,
      pointer (choice: Choice, index: number): string {

        if (index === 0) {
          choice.hint = glue.ws(WSR, _.TLD, _.gray(join($.config.input, state.pathDir, '*')));
          choice.indent = indent(0, _.Tree.dash);
        } else {
          choice.hint = this.state.index === index
            ? glue.ws(WSR, _.TLD, _.gray(join($.config.input, paths.sections[index].path, '*')))
            : NIL;
        }

        return NIL;

      }
    }).catch(cancel);

    return resolve.subdir;

  }

}
