import { ICLICommands, IConfig, IOptions } from 'types';
import merge from 'mergerino';
import { PartialDeep } from 'type-fest';
import { join } from 'path';
import * as defaults from './conf';

const update = (cli: ICLICommands): PartialDeep<IConfig> => ({
  cli: cli.cli,
  cwd: cli.cwd,
  silent: cli.silent,
  prod: cli.prod,
  dev: cli.dev && !cli.prod,
  dirs: {
    input: cli.input,
    output: cli.output,
    config: cli.config
  }
});

export const presets = (options: IOptions) => merge<IOptions>({
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.',
  paths: {},
  spawn: {},
  stores: [],
  terser: {
    json: 'never',
    html: 'never',
    pages: 'never',
    rules: {}
  },
  transforms: {
    json: {},
    sections: {},
    styles: [],
    icons: {},
    pages: {
      markdown: {
        highlight: false
      }
    }
  }
}, options);

export class Model {

  constructor (cli: ICLICommands) {

  }

  get config () {
    return defaults.bundle;
  }

  get transform () {
    return defaults.transform;
  }

  get terser () {
    return defaults.terser;
  }

}
