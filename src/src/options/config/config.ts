import { anyTrue, isNil, has, uniq } from 'rambdax';
import { normalize, join } from 'path';
import { PartialDeep } from 'type-fest';
import { ICLICommands, IConfig, IModes, IOptions, IPackage } from 'types';
import { bundle, update, defaults } from './conf';
import * as file from './files';
import { readJson } from 'fs-extra';
import { basePath, parentPath } from 'shared/helpers';
import { isArray, is } from 'shared/native';
import * as stdout from '../../cli/stdout';

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
export async function runtime (cli: ICLICommands) {

  update.bundle({
    cli: cli.cli,
    cwd: cli.cwd,
    silent: cli.silent,
    prod: cli.prod,
    dev: cli.dev && !cli.prod,
    mode: modes(cli),
    dirs: {
      input: cli.input,
      output: cli.output,
      config: cli.config
    }
  });

  const pkg = await file.pkgJson(bundle.cwd);
  const config = await getConfig(pkg);

  bundle.version = pkg.version;
  bundle.cache = await file.cacheMap(bundle.cwd);
  bundle.spawn = config.spawn[bundle.mode.build ? 'build' : 'watch'];

  // env variables
  process.env.SYNCIFY_ENV = bundle.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);

  return baseDirs(config);

  // await dirs.themeDirs(config.dirs.input);

};

async function getConfig (pkg: IPackage) {

  const config = await file.configFile(bundle.dirs.config);

  if (isNil(config)) {
    if (has('syncify', pkg)) {
      return defaults(pkg.syncify);
    } else {

      const rcf = await file.rcFile(bundle.cwd);

      if (!isNil(rcf)) return defaults(config);

      throw new Error('Missing Configuration');

    }
  }

  return defaults(config);

}

/**
 * Base Directories
 *
 * Generates the base directory paths. The function
 * also normalizes paths to ensure the mapping are
 * correct.
 */
function baseDirs (config: IOptions) {

  const base = basePath(bundle.cwd);

  for (const dir of [
    'input',
    'output',
    'export',
    'import',
    'config',
    'metafields',
    'pages'
  ]) {

    let path: string | string[];

    if (dir === 'metafields' || dir === 'pages') {

      path = parentPath(config.paths[dir]);

    } else {

      if (!has(dir, config)) {
        bundle.dirs[dir] = base(config[dir]);
        continue;
      }

      path = config[dir];

    }

    if (isArray(path)) {
      const roots = uniq(path.map(base));
      bundle.dirs[dir] = is(roots.length, 1) ? roots[0] : roots;
    } else {
      bundle.dirs[dir] = base(path);
    }
  }

  stdout.logger(bundle.spawn, { clear: true });
};

function modes (cli: ICLICommands) {

  const resource = anyTrue(
    cli.pages,
    cli.metafields,
    cli.redirects
  );

  return {
    vsc: cli.vsc,
    server: cli.server,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    prompt: cli.prompt,
    pull: cli.pull,
    push: cli.push,
    clean: anyTrue(resource, cli.upload) ? false : cli.clean,
    build: anyTrue(resource, cli.upload, cli.watch, cli.download) ? false : cli.build,
    watch: anyTrue(resource, cli.upload, cli.download) ? false : cli.watch,
    upload: anyTrue(resource, cli.download, cli.watch) ? false : cli.upload,
    download: anyTrue(resource, cli.upload, cli.watch, cli.build) ? false : cli.download
  };
}
