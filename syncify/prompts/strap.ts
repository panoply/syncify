/* eslint-disable no-unused-vars */
import type { Choice, ArrayPromptOptions } from 'types/internal';
import * as c from '@syncify/ansi';
import { prompt } from 'enquirer';
import { object, ws, has } from 'syncify:utils';
import { copy } from 'fs-extra';
import { $ } from 'syncify:state';
import { join } from 'node:path';
import { theme } from './enquirer';
import * as log from 'syncify:log';
import { Create } from 'syncify:ansi';
import { delay } from 'rambdax';
import PackageJson from '@npmcli/package-json';
import { PKG } from 'types';

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

export async function strap () {

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

  const message = Create({ type: 'info' });

  log.out(
    message
    .Wrap(
      'Syncify straps provide starting-point themes you can use to jump-start a new project.',
      'You can choose one of available themes or usage examples.',
      c.gray
    )
    .NL
    .toString()
  );

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

  const strap: { path: string; name: string; } = straps[kind][template];

  const { name } = await prompt<{ name: string}>(<any>{
    type: 'input',
    name: 'name',
    message: `Strap Name${c.COL}  `,
    theme
  });

  log.spinner('Generating', { style: 'spinning' });

  await delay(1000);

  const dest = join($.cwd, name);

  await copy(strap.path, dest, {
    filter: async (from, to) => {

      return !(
        /\/node_modules\/|\/theme\/?|\/\.env|\/\.npmrc/.test(from) &&
        /\/node_modules\/|\/theme\/?|\/\.env|\/\.npmrc/.test(to)
      );

    }
  });

  const pkg = await PackageJson.load(dest);

  const syncify: any = {};

  if (has('config', (pkg.content as PKG).syncify)) {
    syncify.config = (pkg.content as PKG).syncify.config;
  }

  pkg.update({
    name,
    syncify,
    devDependencies: Object.assign(pkg.content.devDependencies, {
      '@syncify/cli': $.module
    })
  });

  await pkg.save();

  log.spinner.stop();

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
