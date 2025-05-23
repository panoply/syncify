import type { AccessScopes, Choice, Keychain, LiteralString } from 'types';

import { join } from 'node:path';
import { chdir } from 'node:process';

import { existsSync, pathExists, readJSONSync, rm } from 'fs-extra';
import writeFile from 'write-file-atomic';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { CredentialsPrompt, PromptCredentialsFile } from './credentials';

import { log } from '~cli/log';
import { throws } from '~cli/throws';
import { STRAP_EXAMPLES, STRAP_THEMES } from '~const';
import { createCaches } from '~options/define/caches';
import { getPkg, setPkg } from '~options/define/package';
import { createProject } from '~options/define/project';
import { cancel, intercept, label, prompt, theme } from '~prompt';
import { assign, checksum, delay, has, hasPath } from '~utils';
import { execAsync } from '~utils/child';

import { $ } from '$';

interface CreatePrompt {
  /** The name of the strap */
  template: string;
  /** The Resolved URI of project */
  projectPath: string;
  /** The cache root path */
  cacheRootPath: string;
  /** The strap group to choose from */
  strap: LiteralString<'themes' | 'examples'>;
  /** The hashed checksum of the project */
  checksum: string;
  /** The github respository for cloning */
  repository: string;
  /** The project name to use */
  name: string;
  /** Whether or not overwrite is to apply - Only if directory name exists */
  overwrite: boolean;
  /** The package manager selection */
  pm: string;
  /** The syncify credentials model */
  credentials: {
    env: string;
    store: string;
    password: string;
    domain: string;
    token: string;
    version: string;
    keychain: boolean;
    selected: number;
    scopes: Record<AccessScopes, boolean>
  }
}

export async function Create () {

  /**
   * Set of starting point straps available within https://github.com/SyncifyStraps
   */
  const straps = new Set([
    // THEMES
    ...STRAP_THEMES.map(([ name ]) => name),
    // EXAMPLES
    ...STRAP_EXAMPLES.map(([ name ]) => name)
  ]);

  // Read keychain File
  $.keychain = readJSONSync($.file.keychain);

  /** CLI Argv */
  const select = $.argv.length > 1 ? $.argv[1] : null;

  /** TUI Tree */
  const write = _.Create()
  .Wrap(
    _.gray,
    'Hello Hacker 👋' + NLR,
    'This command prompt can be used to jump start a new project. Choose one of the open source themes',
    'or usage examples available. Alternatively, you can import a theme from a store and Syncify will',
    'strap it for you.'
  )
  .Newline()
  .toLog({ clear: true });

  /** Prompt Model */
  const state: CreatePrompt = {
    template: null,
    strap: null,
    repository: null,
    projectPath: null,
    cacheRootPath: null,
    checksum: null,
    name: null,
    pm: null,
    overwrite: false,
    credentials: null
  };

  /* PRE-SELECT STRAP --------------------------- */

  if (straps.has(select)) {
    state.template = select;
    state.repository = `https://github.com/syncifycli/${select}.git`;
  }

  /* -------------------------------------------- */
  /* BEGIN PROMPTS                                */
  /* -------------------------------------------- */

  if (state.template === null) {
    state.strap = await PromptSelectStap();
    state.template = await PromptChooseTemplate();
    state.repository = `https://github.com/syncifycli/${state.template}.git`;
  }

  state.name = await PromptEnterProjectName();
  state.projectPath = join($.cwd, state.name);
  state.checksum = checksum(state.projectPath);
  state.cacheRootPath = join($.home, state.checksum);

  /* -------------------------------------------- */
  /* CREDENTIALS                                  */
  /* -------------------------------------------- */

  const pkguri = join(state.projectPath, 'package.json');
  const access = await PromptCredentialsFile({ keychain: true });

  // Clone the strap from and add into project
  await CreateStrap();

  /* CHANGE DIRECTORY --------------------------- */

  chdir(state.name);

  // Refactor the strap package.json
  await CreatePackage();

  // at this point we have created the project
  // lets now install any dependencies and set things up
  // first let's grag the package manager if we don't have it.
  if ($.pm === '?') $.pm = await PromptPackageManager();

  /* CREATE CACHE STORES ------------------------ */

  await CreateCache({
    access,
    cacheRootPath: state.cacheRootPath,
    hash: state.checksum,
    name: state.name,
    projectPath: state.projectPath
  });

  /* INSTALL PROJECT DEPS ----------------------- */

  await InstallDependencies();

  /* PUBLISH THEME ------------------------------ */

  write
  .Header(`${_.CHK} Project ${_.neonGreen.bold(state.name)} Created`, _.bold.white)
  .Wrap(`You can now ${_.cyan(`cd ${state.name}`)} into the directory and start hacking.`, _.gray)
  .NL
  .End($.log.group)
  .toLog({ clear: true })
  .Break();

  /* -------------------------------------------- */
  /* PROMPTS                                      */
  /* -------------------------------------------- */

  /**
   * `1` Select Strap
   *
   * Prompt choices for selecting theme or example strap
   */
  async function PromptSelectStap () {

    const resolve = await prompt<{ strap: string }>({
      theme,
      message: label.StrapSource,
      type: 'select',
      name: 'strap',
      choices: [
        {
          name: 'themes',
          message: 'Themes',
          hint: '       Boilerplate theme straps'
        },
        {
          name: 'examples',
          message: 'Examples',
          hint: '     One of the usage examples'
        }
      ]
    }).catch(cancel);

    return resolve.strap;

  }

  /**
   * `2` Choose Template
   *
   * Dependening on the the strap selection
   */
  async function PromptChooseTemplate () {

    /** Returns the strap boilerplates */
    const boilers = (strap: string) => (strap === 'themes' ? STRAP_THEMES : STRAP_EXAMPLES);

    const resolve = await prompt<{ template: string }>({
      theme,
      type: 'select',
      name: 'template',
      message: label.ChooseStrap,
      choices: boilers(state.strap).map(([ name, hint, disabled = false ]) => (
        <Choice>{
          name,
          hint,
          disabled
        }))
    }).catch(cancel);

    return resolve.template;

  }

  /**
   * `3` Project Name
   *
   * Prompt Input for entering a project name which will be used as directory name
   */
  async function PromptEnterProjectName () {

    const dispose = intercept();
    const resolve = await prompt<{ name: string}>({
      theme,
      message: label.ProjectName,
      type: 'input',
      name: 'name',
      hint: 'This will be the name of the project directory',
      validate (value: string) {

        this.state.symbols.pointer = NIL;

        if (value.length === 0) {

          return _.Multiline(
            _.red.bold('REQUIRED'),
            NWL,
            'You must provide a directory name for your project.',
            'Keep it simple, lowercase and no special characters or whitespace.'
          );

        } else if (!/^[A-Za-z0-9_+-]+$/.test(value)) {

          return _.Multiline(
            _.red.bold('INVALID NAME'),
            NWL,
            'The project directory name is invalid or contains bad characters.',
            `Names must match the following pattern${_.COL} ${_.cyan('[A-Za-z0-9_+-]+')}`
          );

        } else if (existsSync(join($.cwd, value))) {

          return _.Multiline(
            _.red.bold('INVALID DIRECTORY'),
            NWL,
            'Directory already exists in this location, please use a different name.',
            'Alternatively, run the command from a different folder/path.'
          );

        }

        return true;

      }
    }).catch(cancel);

    dispose();

    return resolve.name;

  }

  /**
   * `4` Package Manager
   *
   * Prompts user to choose the package manager they will be using to install strap dependencies.
   */
  async function PromptPackageManager () {

    const resolve = await prompt<{ pm: string }>({
      theme,
      message: label.Installation,
      type: 'select',
      name: 'pm',
      choices: [
        {
          name: 'pnpm',
          message: 'pnpm',
          hint: WSP + _.gray('recommended')
        },
        {
          name: 'npm',
          message: 'npm'
        },
        {
          name: 'yarn',
          message: 'yarn'
        },
        {
          name: 'bun',
          message: 'bun'
        }
      ]
    }).catch(cancel);

    return resolve.pm;

  }

  /* -------------------------------------------- */
  /* UTILITIES                                    */
  /* -------------------------------------------- */

  /**
   * Creates and updates the straps `package.json` file of the strap.
   */
  async function CreatePackage () {

    if (!(await pathExists(pkguri))) {

      log.spinner.stop();

      throw throws.enoent({
        type: 'file',
        path: pkguri,
        task: glue.ws($.argv),
        message: [
          `The strap does not contain a ${_.cyan('package.json')} file.`,
          'If you are using a pre-release version of Syncify, this will be addressed',
          'upon official release. Please choose another strap.'
        ]
      });

    }

    const pkg = await getPkg(state.projectPath);

    pkg.name = state.name;
    pkg.syncify.stores = {};

    $.project.themeVersion = pkg.version;

    if (hasPath('devDependencies.@syncify/config', pkg)) {
      $.project.configVersion = pkg.devDependencies['@syncify/config'];
    }

    await setPkg(pkg, state.projectPath);

    log.spinner.stop();

  }

  /**
   * Creates the selected strap by cloning from github. Removes the `.git` directory.
   */
  async function CreateStrap () {

    log.spinner('Cloning Strap', { color: _.neonGreen });

    await execAsync(`git clone --depth 1 ${state.repository} ${state.name}`);
    await delay(); // Ensure clone has finished
    await rm(join(state.projectPath, '.git'), { recursive: true, force: true });

  }

}

/**
 * Internal operation for creating the cache references in the `.syncify` directory.
 */
export async function CreateCache (options: {
  /** The Resolved URI of project, this will be {@link $.cwd} in most cases, assigns {@link $.project.dir}. */
  projectPath: string;
  /** The projects name that will be assigned to {@link $.project.name} */
  name: string;
  /** The cache hash reference for directory names */
  hash: string;
  /** Used for joining project name and cacheRootPath then assigned to {@link $.file.project} value */
  cacheRootPath: string;
  /** Access object obtained by the {@link PromptCredentialsFile} prompt. */
  access: CredentialsPrompt
}) {

  $.project.dir = options.projectPath;
  $.project.name = options.name;
  $.project.credentials = options.access.method === 'env' ? 'env' : 'kc';
  $.project.createdAt = Date.now();

  await createCaches(options.hash);
  await createProject(join(options.cacheRootPath, options.name));

  /* CREATE CREDENTIALS ------------------------- */

  if (options.access.method === 'keychain') {

    await SaveKeychain(options.access, {
      hash: options.hash,
      cacheRootPath: options.cacheRootPath
    });

  } else {

    await writeFile(join(options.projectPath, '.env'), options.access.env);

  }

}

/**
 * Executes package manager installation
 */
export async function InstallDependencies () {

  log.spinner('Installing Dependencies', { style: 'spinning', color: _.neonGreen });

  await execAsync(`${$.pm} install`);
  await delay();

  log.spinner.stop();

}

/**
 * `4` Package Manager
 *
 * Prompts user to choose the package manager they will be using to install strap dependencies.
 */
export async function PromptPackageManager () {

  const resolve = await prompt<{ pm: string }>({
    theme,
    message: label.Installation,
    type: 'select',
    name: 'pm',
    choices: [
      {
        name: 'pnpm',
        hint: WSP + _.gray('recommended')
      },
      {
        name: 'npm'
      },
      {
        name: 'yarn'
      },
      {
        name: 'bun'
      }
    ]
  }).catch(cancel);

  return resolve.pm;

}

/**
 * Saves keychain token references.
 */
export async function SaveKeychain (access: CredentialsPrompt, options?: { hash: string; cacheRootPath: string; }) {

  const { hash, cacheRootPath } = assign({ hash: $.hash, cacheRootPath: $.root }, options);

  if (has(access.domain, $.keychain)) {

    if (has(access.name, $.keychain[access.domain])) {

      const kc = $.keychain[access.domain][access.name];

      kc.updated = access.updated;
      kc.projects.includes(hash) || kc.projects.push(hash);

    } else {

      assign($.keychain[access.domain], {
        [access.name]: <Keychain>{
          name: access.name,
          created: access.created,
          updated: access.updated,
          projects: [ hash ],
          token: access.token
        }
      });

    }

  } else {

    $.keychain[access.domain] = {
      [access.name]: <Keychain>{
        name: access.name,
        created: access.created,
        updated: access.updated,
        projects: [ hash ],
        token: access.token
      }
    };

  }

  await writeFile($.file.keychain, JSON.stringify($.keychain));
  await writeFile(join(cacheRootPath, '.env'), access.env);

}
