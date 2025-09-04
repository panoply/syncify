import type { AccessScopes, LiteralString } from 'types';

import { join } from 'node:path';

import { pathExists, rm, writeFile } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';

import { STRAP_EXAMPLES, STRAP_THEMES } from '~const';
import { log } from '~log';
import { createCaches } from '~options/define/caches';
import { getEnv } from '~options/define/env';
import { createProject } from '~options/define/project';
import { Action, getTargets } from '~options/define/store';
import { cancel, choose, label, prompt, theme } from '~prompt';
import { SaveKeychain } from '~prompts/create';
import { PromptCredentialsFile } from '~prompts/credentials';
import { PromptStorage } from '~prompts/targets';
import { delay, plur, prettyDate, s } from '~utils';
import { execAsync } from '~utils/child';
import { isFlatStructure } from '~utils/directory';

import { $ } from '$';

// @ts-expect-error
// eslint-disable-next-line no-unused-vars
interface State {
  /** The directory prompt answer */
  directory?: LiteralString<'create' | 'current'>;
  /** If `change` was selected this will hold the directory name input */
  dirName?: string;
  /** The current working directory */
  cwd: string;
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

export async function Init () {

  if ($.file.project !== null && $.project.credentials !== null && $.project.targetSource !== null) {

    return ErrorProjectExists();

  } else if (await isFlatStructure()) {

    return ErrorFlatStructure();

  }

  const write = _.Create().Wrap(
    _.gray
    , 'Hello Hacker 👋' + NLR
    , 'Launch a new project by selecting an open-source theme, usage example, or importing a store theme,'
    , `which Syncify will strap for you. API credentials can be stored in a project-level ${_.cyan('.env')} file`
    , 'or within the Syncify keychain.'
  );

  write.NL.toLog({ clear: true });

  await PromptDirectory();
  await PromptBootstrap();
  await PromptCredentials();
  await PromptTargets().then(tasks => {
    write
    .Each(tasks, task => write.Line(`${_.CHK} ${task}`))
    .NL
    .End($.log.group)
    .Break()
    .toLog();
  });

  process.exit(0);

}

/**
 * Confirmation prompt to determine whether or not user wants
 * to initialise in the current directory that `sy init` was ran.
 */
async function PromptDirectory () {

  if ($.project.credentials === null && $.project.targetSource === null) {

    const resolve = await prompt<{ cwd: boolean }>({
      theme,
      message: label.ProjectPath,
      name: 'cwd',
      type: 'toggle',
      header: _.Tree.line + _.gray.bold('Initialise in current directory?') + _.Tree.next,
      hint: WSR + $.cwd,
      default: 'Yes',
      disabled: 'No',
      enabled: 'Yes'
    }).catch(cancel);

    if (!resolve.cwd) {

      _.Create()
      .NL
      .Wrap(
        _.yellow.bold
        , 'Change or create a new directory where you want to initialize a Syncify project'
        , `and then run the ${_.cyan('sy init')} command from that location.`
      )
      .toLog({ clear: true });

      return cancel(null);

    }
  }
}

/**
 * Selection prompt for initialising a new project from a template
 * of some sort. Provides Syncify straps or other location.
 */
async function PromptSelectStap () {

  const resolve = await prompt<{ strap: string }>({
    theme,
    message: label.StrapSource,
    type: 'select',
    name: 'strap',
    choices: choose([
      {
        name: 'themes',
        message: 'Themes',
        hint: 'Boilerplate theme straps'
      },
      {
        name: 'examples',
        message: 'Examples',
        hint: 'One of the usage examples'
      },
      {
        name: 'import',
        message: 'Import',
        hint: 'Import from Shopify store',
        disabled: true
      },
      {
        name: 'repository',
        message: 'Repository',
        hint: 'Clone from github repository',
        disabled: true
      },
      {
        name: 'skip',
        message: 'Skip',
        hint: 'Skip theme strapping'
      }
    ], { prop: 'name' })()

  }).catch(cancel);

  return resolve.strap;

}

/**
 * Bootstrapping prompt for `sy init` - allows for user to select
 * a starting point reference for theme development.
 */
async function PromptBootstrap () {

  /** Set of starting point straps available within https://github.com/SyncifyStraps  */
  const straps = s([
    ...STRAP_THEMES.map(([ name ]) => name),
    ...STRAP_EXAMPLES.map(([ name ]) => name)
  ]);

  /** CLI Argv */
  const select = $.argv.length > 1 ? $.argv[1] : null;

  let name: string = null;
  let repository: string = null;
  let strap: string = null;

  if (straps.has(select)) {
    name = select;
    repository = `https://github.com/syncifycli/${select}.git`;
  }

  if (name === null) {
    strap = await PromptSelectStap();
  }

  if (strap === 'examples' || strap === 'themes') {
    name = await PromptChooseTemplate(strap);
    repository = `https://github.com/syncifycli/${name}.git`;
  }

  if (name !== null && repository !== null && strap !== null) {

    await CreateStrap({ name, repository, projectPath: $.cwd });

  }

}

/**
 * Credentials prompt for creating storefront authorisation
 */
async function PromptCredentials () {

  if ($.project.credentials === null) {

    const access = await PromptCredentialsFile({ keychain: true });

    $.project.credentials = access.method === 'env' ? 'env' : 'kc';
    $.project.createdAt = Date.now();

    await createCaches($.hash);
    await createProject(join($.root, $.project.name));

    /* CREATE CREDENTIALS ------------------------- */

    if (access.method === 'keychain') {

      await SaveKeychain(access);

    } else {

      $.file.env = join($.cwd, '.env');

      await writeFile($.file.env, access.env);
      await getEnv();

    }

  }

}

async function PromptTargets () {

  const tasks: string[] = [];

  if ($.file.targets === null || $.project.targetSource === null) {

    const hasPKG = $.pkg !== null;
    const method = await PromptStorage();

    if (method === 'package.json') {
      hasPKG || tasks.push('Generated a package.json file in project');
      tasks.push('Project targets stored in package.json file');
    } else {
      tasks.push(`Project targets stored in ${method} file`);
    }

    await getTargets({
      method,
      action: Action.PROMPT_THEMES,
      banner: true,
      oninit: false
    });

    tasks.push(`Linked ${$.target.length} ${plur('theme', $.target.length)} from store`);

  }

  return tasks;

}

async function PromptChooseTemplate (strap: string) {

  /** Returns the strap boilerplates */
  const boilers = (strap: string) => (strap === 'themes' ? STRAP_THEMES : STRAP_EXAMPLES);

  const resolve = await prompt<{ template: string }>({
    theme,
    type: 'select',
    name: 'template',
    message: label.ChooseStrap,
    choices: boilers(strap).map(([ name, hint, disabled = false ]) => ({
      name,
      hint,
      disabled
    }))
  }).catch(cancel);

  return resolve.template;

}

async function CreateStrap (options: { repository: string; name: string; projectPath: string; }) {

  log.spinner('Cloning Strap', { color: _.neonGreen });

  if (await pathExists(join(options.projectPath, '.git'))) {
    return ErrorGitInitialized();
  }

  await execAsync(`git clone --depth 1 ${options.repository} .`);
  await delay(); // Ensure clone has finished
  await rm(join(options.projectPath, '.git'), { recursive: true, force: true });

  log.spinner.stop();

}

/* -------------------------------------------- */
/* ERRORS                                       */
/* -------------------------------------------- */

/**
 * Throws when attempting to initialise in an existing project
 */
function ErrorProjectExists () {

  _
  .Create({ type: 'error' })
  .Line(`PROJECT ALREADY EXISTS ${_.BAD}`, _.bold.redBright)
  .NL
  .Line('You cannot initialize inside of a pre-existing project.')
  .Tree('info')
  .NL
  .Line(`${_.gray('NAME')}${_.COL}     ${_.whiteBright($.project.name)}`)
  .Line(`${_.gray('CWD')}${_.COL}      ${_.whiteBright($.cwd)}`)
  .Line(`${_.gray('CACHE')}${_.COL}    ${_.whiteBright($.dirs.cache)}`)
  .Line(`${_.gray('CREATED')}${_.COL}  ${_.whiteBright(prettyDate($.project.createdAt))}`)
  .Line(`${_.gray('UPDATED')}${_.COL}  ${_.whiteBright(prettyDate($.project.lastRunAt))}`)
  .Line(`${_.gray('TARGETS')}${_.COL}  ${_.whiteBright($.project.targetSource)}`)
  .Line(`${_.gray('AUTH')}${_.COL}     ${_.whiteBright($.project.credentials)}`)
  .NL
  .End(`Syncify ${_.CHV} Error`, false)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Throws when attempting to initialise in a project that is determined to be a flat structure
 */
function ErrorFlatStructure () {

  _
  .Create({ type: 'error' })
  .Line(`FLAT DIRECTORY STRUCTURE ${_.BAD}`, _.bold)
  .NL
  .Line('Attempting to initialize a Syncify project within a flat structure.')
  .Line('You will need to convert to a hierarchical structure and try again.')
  .Tree('info')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Line(`Move theme directories into a sub-directory called ${_.blue('source')}`, _.gray)
  .Line('Please refer to the documentation for more information:', _.gray)
  .NL
  .Line(`${_.CHV} ${_.underline('https://syncify.sh/usage/directory-structures')}`, _.gray)
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Throws when attempting to clone a repository in a project that already has git initialized
 */
function ErrorGitInitialized () {

  _
  .Create({ type: 'error' })
  .Line(`GIT ALREADY INITIALIZED ${_.BAD}`, _.bold)
  .NL
  .Line('Attempting to clone theme into existing directory that')
  .Line('already has git initialized.')
  .Tree('info')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Line(`You will need to remove the existing  ${_.blue('.git')} folder.`, _.gray)
  .Line(`Run '${_.red('rm -rf .git')}' in your project directory.`, _.gray)
  .NL
  .Line('WARNING: This could be dangerous.', _.bold)
  .Line('Ensure you\'re in the right directory before attempting fix!')
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

}
