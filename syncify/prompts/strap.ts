/* eslint-disable no-unused-vars */
import type { Choice, ArrayPromptOptions, StringPromptOptions } from 'types/internal';
import { join } from 'node:path';
import PackageJson from '@npmcli/package-json';
import { copy, pathExists, remove } from 'fs-extra';
import { delay } from 'rambdax';
import { prompt } from 'enquirer';
import { theme } from 'syncify:prompts/enquirer';
import { assign, command } from 'syncify:native';
import { object, hasPath, has } from 'syncify:utils';
import { execAsync } from 'syncify:utils/child';
import * as c from '@syncify/ansi';
import * as log from 'syncify:log';
import * as throws from 'syncify:log/throws';
import * as errors from 'syncify:log/errors';
import { $ } from 'syncify:state';
import { Config, PKG, Stores } from 'types';

const STRAPS = <const>[
  [ 'dawn', '    Shopify Slop' ],
  [ 'dusk', '    Stripped Theme' ],
  [ 'silk', '    Sissel Theme' ]
];

const EXAMPLES = <const>[
  [ 'using-paths', '       Strap with paths usage' ],
  [ 'using-rename', '      Strap with rename usage' ],
  [ 'using-sass', '        Strap with sass transform' ],
  [ 'using-schema', '      Strap using Shared Schema' ],
  [ 'using-tailwind', '    Strap using Tailwind transform' ],
  [ 'using-typescript', '  Strap using TypeScript transform' ]
];

export async function strap (fromSetup = true) {

  const straps: {
    [k in 'themes' | 'examples']: Record<typeof STRAPS[number][0] | typeof EXAMPLES[number][0], {
      path: string;
      name: string;
    }>
  } = {
    examples: object(),
    themes: object()
  };
  const choices: { themes: Choice[], examples: Choice[] } = {
    themes: [],
    examples: []
  };
  for (const [ name, hint ] of STRAPS) {
    straps.themes[name] = { name, path: join($.dirs.straps, name) };
    choices.themes.push({ name, message: name, hint });
  }
  for (const [ name, hint ] of EXAMPLES) {
    straps.examples[name] = { name, path: join($.dirs.examples, name) };
    choices.examples.push({ name, message: name, hint });
  }

  const message = c.Create({ type: 'info' });
  const filter = (src: string) => /(package\.json|\.git)|/.test(src);

  if (!fromSetup) {
    log.out(
      message
      .Wrap(
        'Syncify straps provide starting-point themes you can use to jump start a new project.',
        'You can choose one of available open source themes or a usage example',
        c.gray
      )
      .NL
      .toString()
    );
  }

  const { kind } = await prompt<{ kind: string }>(<ArrayPromptOptions> {
    type: 'select',
    name: 'kind',
    message: c.bold(`Select From${c.COL} `),
    required: true,
    theme,
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
  });

  const { template } = await prompt<{ template: string }>(<ArrayPromptOptions> {
    type: 'select',
    name: 'template',
    message: `Choose Strap${c.COL}`,
    required: true,
    theme,
    choices: choices[kind]
  });

  const { name } = await prompt<{ name: string}>(<StringPromptOptions>{
    type: 'input',
    name: 'name',
    hint: 'This will be used as the theme target name',
    message: `Theme Name${c.COL}`,
    theme
  });

  const dir = fromSetup ? $.cwd : join($.cwd, name);

  // log.spinner('Creating Strap', { style: 'spinning' });

  const strapTemplate = join(dir, template);
  const strapPkgPath = join(strapTemplate, 'package.json');

  await execAsync(`git clone https://github.com/syncifycli/${template}.git`);

  await copy(strapTemplate, dir, { filter }).catch(
    errors.write('Error copying contents to directory', {
      from: strapTemplate,
      to: dir
    })
  );

  if (!(await pathExists(strapPkgPath))) {

    throw throws.enoentError({
      type: 'file',
      path,
      task: $.argv,
      message: [
        `The strap does not contain a ${c.cyan('package.json')} file.`,
        'If you are using a pre-release version of Syncify, this will be addressed',
        'upon official release. Please choose another strap.'
      ]
    });

  }

  /** Strap Package */
  const strapPkg = await PackageJson.load(strapTemplate);

  /** Syncify key */
  const syncify: {
    stores?: Stores;
    config?: Omit<Config, 'stores'>;
} = {};

  if (hasPath('syncify.config', $.pkg)) {
    syncify.config = $.pkg.syncify.config;
  }

  await $.package.update({
    // @ts-expect-error
    syncify,
    devDependencies: assign(
      strapPkg.content.devDependencies,
      $.pkg.devDependencies
    )
  }).save();

  log.spinner.update('Installing Dependencies');

  await execAsync(`${$.pm} install`);

  remove(join(dir, template));

  log.spinner.update('Building Theme');

  await execAsync(`${$.pm} sy -b`);

  if (fromSetup) {

    log.spinner.update('Publishing theme');

    await execAsync(`${$.pm} sy -p`);

    log.spinner.stop();
    log.group(false);
    process.exit(0);

  } else {

    log.out(
      message
      .NL
      .Line(`${c.CHK} Strap Generated`, c.bold.white)
      .NL
      .Wrap(
        `You can now ${c.cyan('cd')} into the directory and install dependencies.`
        , c.gray
      )
      .NL
      .End($.log.group)
      .toString()
    );

  }
}
