import { Commands, Config, Modes, HOTConfig, WatchBundle } from 'types';
import { join, relative } from 'node:path';
import { anyTrue, isNil, has, includes, isEmpty, allFalse } from 'rambdax';
import { FSWatcher } from 'chokidar';
import glob from 'fast-glob';
import dotenv from 'dotenv';
import anymatch from 'anymatch';
import { pathExists, readJson } from 'fs-extra';
import { queue } from '~requests/queue';
import { spawned } from '~cli/spawn';
import { kill } from '~cli/exit';
import { DSH, blue, bold, gray, white } from '~cli/ansi';
import { normalPath } from '~utils/paths';
import { configFile, getPackageJson } from '~options/files';
import { setCacheDirs, setImportDirs, setThemeDirs, setBaseDirs } from '~options/dirs';
import { setJsonOptions, setSectionOptions, setSnippetOptions } from '~options/transforms';
import { setScriptOptions } from '~options/script';
import { setStyleConfig } from '~options/style';
import { setSvgOptions } from '~options/svgs';
import { setMinifyOptions } from '~options/terser';
import { authURL } from '~options/utilities';
import { PATH_KEYS, HOT_SNIPPET_FILE } from '~const';
import { log } from '~log';
import { bundle, cache, processor, plugins } from '~config';
import { socket } from '~hot/server';
import {
  isArray,
  keys,
  assign,
  nil,
  isString,
  isObject,
  ws,
  isBoolean,
  error,
  toArray,
  values
} from '~utils/native';
import {
  warnOption,
  invalidError,
  missingConfig,
  throwError,
  typeError,
  unknownError,
  invalidCommand,
  invalidTarget
} from '~log/validate';

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
export async function define (cli: Commands, _options?: Config) {

  log.clear();

  await getPackageJson(cli.cwd);
  await getConfig(cli);

  // @ts-expect-error
  bundle.version = VERSION;
  bundle.mode = setModes(cli);
  bundle.cwd = cli.cwd;
  bundle.env.cli = cli.cli;
  bundle.env.prod = cli.prod;
  bundle.env.dev = cli.dev && !cli.prod;
  bundle.logger.silent = cli.silent;

  process.env.SYNCIFY_ENV = bundle.env.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);

  const { config, cwd } = bundle;

  const promise = await Promise.all([
    setChokidar(cli.watch, cwd),
    setBaseDirs(cli),
    setCaches(cwd),
    setThemeDirs(bundle.dirs.output),
    setImportDirs(),
    setStores(cli, config),
    setPaths(config),
    setFilters(cli),
    setProcessors(config),
    setSectionOptions(config),
    setSnippetOptions(config),
    setJsonOptions(config),
    setScriptOptions(config),
    setStyleConfig(config),
    setSvgOptions(config),
    setMinifyOptions(config),
    setSpawns(config),
    setPlugins(config),
    setHotReloads(config)
  ]).catch(e => {

    console.log(e);

  });

  log.start(bundle);

  return promise;

};

/**
 * Set Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
function setModes (cli: Commands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transfrom = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  const watch = anyTrue(resource, cli.upload, cli.download) ? false : cli.watch;
  const modes = <Modes> assign(bundle.mode, {
    watch,
    hot: watch && cli.hot,
    vsc: cli.vsc,
    interactive: cli.interactive,
    export: cli.export,
    import: cli.import,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    force: cli.force,
    script: transfrom ? cli.script : false,
    style: transfrom ? cli.style : false,
    image: transfrom ? cli.image : false,
    svg: transfrom ? cli.svg : false,
    terse: anyTrue(cli.terse, cli.prod),
    clean: anyTrue(resource, transfrom, cli.upload) ? false : cli.clean,
    build: anyTrue(cli.export, cli.watch, cli.download) ? false : cli.build,
    upload: anyTrue(transfrom, watch) ? false : cli.upload,
    download: anyTrue(resource, transfrom, cli.upload, cli.watch, cli.build) ? false : cli.download
  });

  if (allFalse(...values(modes))) {

    invalidCommand({
      message: [
        'Execution is unclear, you have not provided Syncify a operation mode to run.'
      ],
      expected: '--<cmd>',
      fix: [
        'Syncify requires that you provide an operation. In most cases, this',
        'error occurs when you have forgotten to pass the mode, for example:',
        '',
        `${white('$')} ${white(`syncify ${bundle.argv} ${blue('--watch')}`)}`,
        `${white('$')} ${white(`syncify ${bundle.argv} ${blue('--build')}`)}`,
        `${white('$')} ${white(`syncify ${bundle.argv} ${blue('--upload')}`)}`,
        '',
        `Run ${blue('syncify --help')} for more information, or pass an execution`,
        `operation mode as per the ${blue('expected')} value and ensure to replace ${blue('--<cmd>')}`,
        'with one the examples provided or a supported mode.'

      ]
    });
  }

  if (modes.build) {
    if (allFalse(modes.script, modes.style, modes.svg, modes.pages, modes.metafields, modes.image)) {
      modes.script = true;
      modes.style = true;
      modes.svg = true;
      modes.image = true;
    }
  }

  return modes;

};
/**
 * Set Chokidar
 *
 * Creates an instance of chodkidar FSWatcher, we will assign watch paths
 * during the initialization process that executes in directly after this.
 */
function setChokidar (watch: boolean, cwd: string) {

  if (!watch) {
    bundle.watch = new Set() as any;

  } else {

    bundle.watch = new FSWatcher({
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      interval: 75,
      binaryInterval: 100,
      ignored: [ '**/*.map' ],
      ignorePermissionErrors: true
    });

    Object.defineProperties(bundle.watch, {
      has: {
        value (path: string, dir = cwd) {
          return (bundle.watch as WatchBundle)._watched.get(dir).items.has(path);
        }
      },
      paths: {
        get () {
          return toArray(bundle.watch.values());
        }
      },
      watching: {
        get () {
          return (bundle.watch as WatchBundle)._watched;
        }
      }
    });
  }
}

/**
 * Hot Reloading Setup
 *
 * Validates the hot reload configuration
 * defined options.
 */
async function setHotReloads (config: Config) {

  if (bundle.mode.watch !== true) return;
  if (bundle.mode.hot === false && config.hot === false) return;
  if (bundle.mode.hot === false && config.hot === true) bundle.mode.hot = true;

  const warn = warnOption('HOT Reloads');

  if (bundle.env.sync > 1) {
    warn('HOT Reloads can only be used on 1 store');
    return;
  } else if (bundle.sync.themes.length > 1) {
    warn('HOT Reloads can only be used on 1 theme');
    return;
  }

  if (allFalse(
    isObject(config.hot),
    isBoolean(config.hot),
    isNil(config.hot)
  )) {
    typeError({
      option: 'config',
      name: 'hot',
      provided: config.hot,
      expects: 'boolean | {}'
    });
  }

  const { hot } = bundle;

  if (isObject(config.hot) && isEmpty(config.hot) === false) {

    for (const prop in config.hot as HOTConfig) {

      if (!has(prop, bundle.hot)) unknownError(`hot.${prop}`, config.hot[prop]);

      if (prop === 'label') {

        if (config.hot[prop] === 'visible' || config.hot[prop] === 'hidden') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'visible | hidden');
        }

      } else if (prop === 'method') {

        if (config.hot[prop] === 'hot' || config.hot[prop] === 'refresh') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'hot | refresh');
        }

      } else if (prop === 'scroll') {

        if (config.hot[prop] === 'preserved' || config.hot[prop] === 'top') {
          hot[prop] = config.hot[prop];
        } else {
          invalidError('hot', prop, config.hot[prop], 'preserved | top');
        }

      } else if (typeof hot[prop] === typeof config.hot[prop]) {

        hot[prop] = config.hot[prop];

      } else {

        typeError({
          option: 'hot',
          name: prop,
          provided: config.hot[prop],
          expects: typeof hot[prop]
        });

      }

    }
  }

  hot.snippet = join(bundle.cwd, 'node_modules', '@syncify/cli', HOT_SNIPPET_FILE);
  hot.output = join(bundle.dirs.output, 'snippets', HOT_SNIPPET_FILE);

  for (const layout of hot.layouts) {
    hot.alive[join(bundle.dirs.output, 'layout', layout)] = false;
  }

  bundle.wss = socket();

}

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided in configuration.
 */
function setProcessors (config: Config) {

  for (const prop in config.processors) {
    processor[prop].config = isArray(config.processors[prop])
      ? config.processors[prop]
      : assign(processor[prop].config, config.processors[prop]);
  }

};

/**
 * Set Plugins
 *
 * Sets and constructs the Syncify plugin model of all
 * plugins defined in the configuration.
 */
function setPlugins (config: Config) {

  if (!has('plugins', config)) return;
  if (!isArray(config.plugins)) return; // TODO: Throw error if not array

  for (const plugin of config.plugins) {

    if (has('onInit', plugin)) plugin.onInit.call({ ...bundle }, config);

    if (has('onChange', plugin)) {
      plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }

    if (has('onTransform', plugin)) {
      plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }

    if (bundle.mode.watch) {

      if (has('onWatch', plugin)) {
        plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }

      if (has('onReload', plugin)) {
        plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }

    if (bundle.mode.build) {
      if (has('onBuild', plugin)) {
        plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }

  }

};

/**
 * Set Spawns
 *
 * Invokes the spawned processes. The `spawn()` function
 * parameter passed in `spawned()` returns a function located
 * in `logger/console.ts` and will pipe the child processes output
 * as parameter value.
 *
 * > See the `cli/spawn.ts` which is used to normalize the log output.
 */
function setSpawns (config: Config) {

  const { mode, spawn } = bundle;

  if (!has('spawn', config) || isNil(config.spawn)) return;

  if (!isObject(config.spawn)) {
    typeError({
      option: 'config',
      name: 'spawn',
      provided: config.spawn,
      expects: '{ build: {}, watch: {} }'
    });
  }

  let run: 'build' | 'watch' = null;

  if (mode.build && has('build', config.spawn)) run = 'build';
  if (mode.watch && has('watch', config.spawn)) run = 'watch';
  if (isNil(mode) || isNil(config.spawn[run])) return;

  if (!isObject(config.spawn[run])) {
    typeError({
      option: 'spawn',
      name: run,
      provided: config.spawn[run],
      expects: '{ build: {}, watch: {} }'
    });
  }

  const props = keys(config.spawn[run]);

  if (props.length === 0) return;

  for (const name in config.spawn[run]) {

    const command = config.spawn[run][name];

    if (isString(command)) {

      // create the command model
      bundle.spawn.commands[name] = {
        cmd: nil,
        args: [],
        pid: NaN
      };

      // convert to an array
      const cmd = (command as string).trimStart().indexOf(ws) > -1
        ? (command as string).trimStart().split(ws) as string[]
        : [ command ] as string[];

      bundle.spawn.commands[name].cmd = cmd.shift();
      bundle.spawn.commands[name].args = cmd;

      spawned(name, bundle.spawn.commands[name], log.spawn(name));

    } else if (isArray(command)) {

      // create the command model
      const cmd = command.shift();
      bundle.spawn.commands[name] = { cmd, args: command, pid: NaN };

      spawned(name, bundle.spawn.commands[name], log.spawn(name));

    } else {
      typeError({
        option: 'spawn',
        name: run,
        provided: config.spawn[run],
        expects: 'string | string[]'
      });
    }

  }

  kill(() => {

    queue.pause();
    queue.clear();

    log.nwl(nil);

    spawn.streams.forEach((child, name) => {

      error(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
      child.kill();

    });

    log.nwl(nil);

    spawn.streams.clear();
    process.exit(0);

  });

};

function setFilters (cli: Commands) {

  if (!has('filter', cli)) return;

  const exp = new RegExp(`^(${[
    'assets',
    'config',
    'locales',
    'metafields',
    'layout',
    'pages',
    'customers',
    'templates',
    'snippets',
    'sections'
  ].join('|')})`);

  const parse = cli.filter.replace(/\s+/g, ' ').trim();

  if (parse.indexOf(',') > -1) {

    const multiple = parse
      .split(',')
      .filter(Boolean)
      .map(entry => entry.trim());

    for (const cmd of multiple) {

      if (cmd[0] === '!') {

        if (!exp.test(cmd.slice(1))) throwCommandError('dir', cmd);

        // TODO - Support ignore filters

      } else if (cmd[0] === '*' || cmd[0] === '/' || cmd[0] === '.') {

        throwCommandError('pattern', parse);

      } else {

        if (!exp.test(cmd)) throwCommandError('dir', cmd);

        if (cmd.indexOf('/') > -1) {

          // TODO - Support file anymatches

        } else {

          if (!isArray(bundle.filters[cmd])) bundle.filters[cmd] = [];

          bundle.filters[cmd].push(cmd);

        }
      }
    }

  } else if (parse[0] === '*' || parse[0] === '/' || parse[0] === '.') {

    throwCommandError('pattern', parse);

  } else if (parse.indexOf('/') > -1) {

    // TODO - Support file anymatches

  } else {

    if (!isArray(bundle.filters[parse])) bundle.filters[parse] = [];

    bundle.filters[parse].push(parse);

  }

  function throwCommandError (type: 'pattern' | 'dir', cmd: string) {

    const pattern: string[] = [];

    if (type === 'pattern') {

      pattern.push(`Invalid ${blue('--filter')} pattern provided. You cannot pass starting point`);

      if (cmd[0] === '*') {
        pattern.push(`glob (${blue('*')}) stars as filters, Syncify does not support this.`);
      } else if (cmd[0] === '/') {
        pattern.push(`path (${blue('/')}) roots as filters, Syncify does not support this.`);
      } else if (cmd[0] === '.') {
        pattern.push(`dot paths (${blue('.')})  as filters, Syncify does not support this.`);
      }

      pattern.push(
        `Use a starting point directory name based on the ${blue('paths')} key property`,
        `in your ${blue(bundle.file.base)} file.`
      );

    } else {

      pattern.push(
        `Invalid directory provided. The ${blue('--filter')} pattern expects the starting point`,
        'directory path be one of the following:',
        '',
        `${white('-')} ${blue('assets')}`,
        `${white('-')} ${blue('config')}`,
        `${white('-')} ${blue('locales')}`,
        `${white('-')} ${blue('metafields')}`,
        `${white('-')} ${blue('layout')}`,
        `${white('-')} ${blue('pages')}`,
        `${white('-')} ${blue('customers')}`,
        `${white('-')} ${blue('templates')}`,
        `${white('-')} ${blue('snippets')}`,
        `${white('-')} ${blue('sections`')}`,
        ''
      );

    }

    invalidCommand({
      message: pattern,
      expected: '--filter <dir>',
      fix: [
        `The ${blue('--filter')} (or ${blue('-f')}) flag command argument expects you`,
        'provide a theme output directory as the starting point. Filtering begins with',
        'a Shopify output directory name, for example:',
        '',
        `${white('$')} ${white(`syncify --filter ${blue('sections/file.liquid')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('snippets/*')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('templates/*.json')}`)}`,
        `${white('$')} ${white(`syncify --filter ${blue('!assets/some-file.ext')}`)}`,
        '',
        `Syncify will automatically resolve files from within your defined ${bold('input')} directory`,
        'based on the starting point directory name. You can pass glob star matches following the',
        `directory namespace or starting point ignores (${blue('!')}) as long the directory can match.`

      ]
    });

  }

}

/**
 * Set Cache
 *
 * Resolves the cache mapping records, which will exist within
 * the `node_modules/.syncify` directory. This file holds important
 * information about the users project. If no maps are found, they
 * will be generated.
 */
async function setCaches (cwd: string) {

  const dir = join(cwd, 'node_modules/.syncify');
  const map = join(dir, 'store.map');
  const has = await pathExists(map);

  if (!has) return setCacheDirs(dir);

  bundle.dirs.cache = `${dir}/`;
  const read = await readJson(map);

  assign(cache, read);

};

/**
 * Get Config
 *
 * Resolves the `syncify.config.js` file or configuration
 * property contained in the _package.json_ file.
 */
async function getConfig (cli: Commands) {

  const cfg = await configFile(cli.cwd);

  if (cfg !== null) {
    bundle.config = cfg;
  } else if (has('syncify', bundle.pkg)) {
    bundle.config = bundle.pkg.syncify as unknown as Config;
  } else {
    missingConfig(cli.cwd);
  }
};

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
function setStores (cli: Commands, config: Config) {

  /**
   * Modes which require store arguments
   */
  const storeRequired = anyTrue(
    bundle.mode.metafields,
    bundle.mode.pages,
    bundle.mode.redirects
  );

  /**
   * Modes which require theme arguments
   */
  const themeRequired = anyTrue(
    bundle.mode.watch,
    bundle.mode.upload,
    bundle.mode.download
  );

  if (cli._.length === 0) {

    if (storeRequired) {
      invalidCommand({
        message: [
          'You have not provided store to target, which is required',
          'when running in a resource mode that syncs to a remote source'
        ],
        expected: 'syncify <store>',
        fix: [
          'Provide the store target name as the first command argument',
          'followed by themes target/s and other flags.'
        ]
      });
    }

    return;

  }

  const stores = cli._[0].split(',');
  const file = dotenv.config({ path: join(bundle.cwd, '.env') });
  const array = isArray(config.stores) ? config.stores : [ config.stores ];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue = items.length > 1;

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Get authorization url for the store
    const client = file.error
      ? authURL(store.domain, process.env, 2) // fallback to environment variables
      : authURL(store.domain, file.parsed, 1); // using .env file

    // Set store endpoints
    const sidx = bundle.sync.stores.push({
      store: store.domain,
      domain,
      client,
      queue
    }) - 1;

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if (bundle.mode.metafields || bundle.mode.pages) return;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? (cli.theme as any).split(',')
      : has(store.domain, cli)
        ? cli[store.domain].split(',')
        : keys(store.themes);

    for (const target of themes) {

      if (!has(target, store.themes)) {

        invalidTarget({
          type: 'theme',
          expected: keys(store.themes).join(','),
          provided: target,
          message: [
            `Unknown theme target (${blue(target)}) provided to ${blue(store.domain)} store`,
            `Your ${blue(bundle.file.base)} file contains no such theme using this name.`
          ],
          fix: [
            `Provide an ${blue('expected')} theme target or update/add an existing target.`,
            `You have ${blue(`${themes.length}`)} theme targets defined for ${blue(store.domain)}:`,
            '',
            `${DSH} ${themes.join(`\n${DSH} `)}`,
            ''
          ]

        });
      }

      // Let populate the model with theme
      bundle.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });

    }

  }

  if (storeRequired) {
    if (bundle.sync.stores.length === 0) {
      return invalidCommand({
        expected: 'syncify <store>',
        message: [
          'You have not provided store to target, which is required',
          'when running in a resource mode that syncs to a remote source'
        ],
        fix: [
          'Provide the store target name as the first command argument followed by themes',
          'target/s and other flags. Based on your current configuration:',
          '',
          `${DSH} ${white('$')} syncify ${array.join(`\n${DSH} ${white('$')} syncify `)}`,
          ''
        ]
      });
    }
  }

  if (bundle.sync.themes.length === 0) {
    if (themeRequired) {
      return invalidCommand({
        expected: '-t <theme>',
        message: [
          'You have not provided a theme to target, which is required',
          'when running this resource mode.'
        ],
        fix: [
          `Provide a theme name to target following a ${blue('-t')} or ${blue('--theme')} flag.`,
          'Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s.'
        ]
      });
    }
  }

  if (bundle.sync.stores.length === 0) {
    throwError(
      'Unknown, missing or invalid store/theme targets',
      'Check your store config'
    );
  }

  if (bundle.sync.stores.length === 1 && bundle.sync.themes.length === 1) {
    bundle.env.sync = 1;
  } else if (bundle.sync.stores.length > 1 || bundle.sync.themes.length > 1) {
    bundle.env.sync = 2;
  }
};

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
async function setPaths (config: Config) {

  // Path normalize,
  const path = normalPath(bundle.dirs.input);
  const warn = warnOption('path resolution');

  // iterate over the defined path mappings
  for (const key of PATH_KEYS) {

    let uri: string[];

    if (key === 'customers') {

      uri = has(key, config.paths)
        ? isArray(config.paths[key])
          ? (config.paths[key] as string[]).map(path)
          : [ path(config.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, config.paths)) {

      uri = isArray(config.paths[key])
        ? config.paths[key].map(path)
        : [ path(config.paths[key]) ];

      if (key === 'assets') uri.push(join(bundle.dirs.output, 'assets/*'));

    } else if (key === 'redirects' && has(key, config.paths)) {

      uri = [ join(bundle.cwd, config.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    for (const p of uri) {
      const exists = await glob(p);
      if (exists.length === 0) warn('No files could be resolved in', relative(bundle.cwd, p));
      bundle.watch.add(p);
    }

    bundle.paths[key] = anymatch(uri);

  }

}
