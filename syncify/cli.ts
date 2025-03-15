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
        'patch',
        'minor',
        'major'
      ]
    },
    {
      mode: 'create',
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
        'watch',
        'build',
        'push',
        'pull',
        'create',
        'inspect',
        // TODO
        'export',
        'import',
        'stash',
        'publish',
        'version',
        'keychain',
        'projects',
        'theme',
        'git',
        'setup',
        'prune',
        'doctor'
      ]
    },
    {
      mode: 'init',
      accepts: null
    },
    {
      mode: 'projects',
      accepts: null
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
