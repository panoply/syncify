import type { Project } from 'types';

import { basename } from 'path';

import { glob } from 'fast-glob';
import { readJsonSync } from 'fs-extra';

import * as _ from '@syncify/ansi';

import { log } from '~cli/log';
import { cancel, labels, prompt } from '~prompt';
import { theme } from '~prompts/enquirer';
import { eqWS, prettyDate } from '~utils';

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

async function GetProjectsDirs () {

  const dirs = await glob(`${$.home}/*`, {
    onlyFiles: false,
    onlyDirectories: true,
    absolute: true,
    cwd: $.home
  });

  return dirs;

}

async function GetProjectNames (dirs: string[]) {

  const projects: Array<{
    name: string;
    uri: string;
    hash: string;
    project: Project
  }> = [];

  for (const dir of dirs) {

    const file = await glob([ `${dir}/*`, `!${dir}/hot-snippet` ], { cwd: $.home, absolute: true });

    const uri = file[0];
    projects.push({
      hash: basename(dir),
      name: basename(uri),
      project: readJsonSync(uri),
      uri
    });

  }

  return projects;

}

export async function Projects () {

  /** TUI Tree */
  const write = _.Create({ type: 'info' });

  /** Prompt Labels */
  const label = labels({
    padding: 0,
    prompts: <const>[
      'Project',
      'Action'
    ]
  });

  const directories = await GetProjectsDirs();

  if (directories.length === 0) return;

  const files = await GetProjectNames(directories);
  const count = directories.length === 1 ? 'is 1 project' : `are ${directories.length} projects`;

  /** Prompt Greeting */
  const greeting = write.Wrap(
    _.gray
    , 'Syncify Projects 🛠️' + NLR
    , `There ${count} using Syncify on this device. Select the project you wish to inspect or configure.`
  );

  greeting.NL.toWrite(log);

  const select = await PromptProjects();

  // TODO: PROVIDE ADDITIONAL OPTIONS
  //
  // const action = await PromptAction();

  const file = files[select];
  const project = files[select].project;

  write
  .NL
  .Line(` ${_.gray('NAME')}${_.COL}              ${_.whiteBright(project.name)}`)
  .Line(` ${_.gray('UUID')}${_.COL}              ${_.whiteBright(file.hash)}`)
  .Line(` ${_.gray('LOCATION')}${_.COL}          ${_.whiteBright(project.dir)}`)
  .Line(` ${_.gray('CACHE')}${_.COL}             ${_.whiteBright(file.uri)}`)
  .Line(` ${_.gray('CACHE EXPIRY')}${_.COL}      ${_.whiteBright(prettyDate(project.expires))}`)
  .Line(` ${_.gray('LAST RUN')}${_.COL}          ${_.whiteBright(prettyDate(project.lastRunAt))}`)
  .Line(` ${_.gray('CREATED AT')}${_.COL}        ${_.whiteBright(prettyDate(project.createdAt))}`);

  if (project.credentials === 'env') {
    write.Line(` ${_.gray('CREDENTIALS')}${_.COL}       ${_.whiteBright('.env')}`);
  } else {
    write.Line(` ${_.gray('CREDENTIALS')}${_.COL}       ${_.whiteBright('keychain')}`);
  }

  write
  .Line(` ${_.gray('SYNCIFY VERSION')}${_.COL}   v${_.whiteBright(project.syncifyVersion)}`)
  .Line(` ${_.gray('HOT VERSION')}${_.COL}       v${_.whiteBright(project.hotVersion)}`)
  .NL
  .End('Syncify')
  .Break()
  .toWrite(log);

  async function PromptProjects (): Promise<number> {

    const spacing = eqWS(files, {
      prop: 'name',
      padding: 1
    });

    const choices = files.map<Choice>(({ name, hash }, value) => ({
      name,
      value,
      message: name,
      hint: spacing(name) + hash
    }));

    const resolve = await prompt<{ project: [string, number ]}>({
      theme,
      message: label.Project,
      name: 'project',
      type: 'select',
      choices,
      result (name: string) {
        return Object.entries(this.map([ name ]))[0][1];
      }
    }).catch(cancel);

    return resolve.project;

  }

  // @ts-expect-error
  // eslint-disable-next-line
  async function PromptAction () {

    const resolve = await prompt<{ action: string }>({
      theme,
      message: label.Action,
      name: 'action',
      type: 'select',
      choices: <Choice[]>[
        {
          name: 'inspect',
          message: 'Inspect',
          hint: '   Print information about the project'
        },
        {
          name: 'cancel',
          message: 'Cancel',
          hint: '   Exit the prompt'
        }
      ]
    }).catch(cancel);

    return resolve.action;

  }

}
