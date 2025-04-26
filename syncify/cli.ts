import { syncify } from '.';

import { command } from '~options/command';

command(
  [
    {
      mode: 'build',
      accepts: [
        'script',
        'style',
        'svg',
        'liquid',
        'json'
      ],
      flags: [
        'help',
        'input',
        'output',
        'config',
        'filter',
        'dev',
        'prod',
        'terse',
        'clean',
        'silent'
      ]
    },
    {
      mode: 'watch',
      accepts: null,
      flags: [
        'help',
        'hot',
        'bind',
        'align',
        'input',
        'output',
        'config',
        'target',
        'filter',
        'dev',
        'prod',
        'terse',
        'clean',
        'silent'
      ]
    },
    {
      mode: 'pack',
      accepts: null,
      flags: [
        'help',
        'output',
        'config',
        'clean',
        'dev',
        'prod',
        'terse',
        'patch',
        'minor',
        'major'
      ]
    },
    {
      mode: 'delete',
      accepts: null,
      flags: [
        'config',
        'target',
        'filter',
        'force'
      ]
    },
    {
      mode: 'push',
      accepts: null,
      flags: [
        'help',
        'input',
        'config',
        'target',
        'align',
        'filter',
        'force',
        'batch'
      ]
    },
    {
      mode: 'pull',
      accepts: null,
      flags: [
        'help',
        'new',
        'output',
        'config',
        'target',
        'filter',
        'align',
        'merge',
        'force',
        'batch'
      ]
    },
    {
      mode: 'publish',
      accepts: null,
      flags: [
        'output',
        'config',
        'patch',
        'minor',
        'major',
        'clean',
        'dev',
        'prod',
        'terse',
        'target',
        'main',
        'unpublished'
      ]
    },
    {
      mode: 'version',
      accepts: null,
      alias: [ 'version' ],
      flags: [
        'help',
        'patch',
        'minor',
        'major'
      ]
    },
    {
      mode: 'create',
      flags: [
        'help'
      ],
      accepts: [
        'dawn',
        'dusk',
        'silk',
        'using-paths',
        'using-rename',
        'using-sass',
        'using-schema',
        'using-tailwind',
        'using-typescript'
      ]
    },
    {
      mode: 'keychain',
      flags: [
        'help'
      ],
      accepts: [
        'create',
        'update',
        'associate',
        'migrate',
        'inspect'
      ]
    },
    {
      mode: 'help',
      alias: [ 'help' ],
      accepts: [
        'examples',
        // SUPPORTED
        'init',
        'watch',
        'build',
        'push',
        'pull',
        'create',
        'inspect',
        'projects',
        // TODO
        'export',
        'import',
        'stash',
        'publish',
        'version',
        'keychain',
        'theme',
        'git',
        'prune',
        'doctor'
      ]
    },
    {
      mode: 'init',
      accepts: null
    },
    {
      mode: 'link',
      accepts: [
        'theme',
        'store'
      ]
    },
    {
      mode: 'projects',
      accepts: null,
      flags: [
        'help'
      ]
    },
    {
      mode: 'link',
      accepts: null
    },
    {
      mode: 'git',
      accepts: null
    },
    {
      mode: 'prune',
      accepts: null
    },
    {
      mode: 'doctor',
      accepts: null
    },
    {
      mode: 'inspect',
      accepts: null
    }
  ]

)(syncify);
