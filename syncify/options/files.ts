import type { Config, ENV, Tsconfig } from 'types';
import dotenv from 'dotenv';
import { join, relative, basename, extname } from 'pathe';
import { pathExists, readFile, readJson, writeFile } from 'fs-extra';
import stripJsonComments from 'strip-json-comments';
import { bundleRequire } from 'syncify:requests/require';
import { jsonc } from 'syncify:utils';
import { throws } from 'syncify:log/errors';
import { $ } from 'syncify:state';
import { missingEnv } from 'syncify:log/throws';

/**
 * Config Files
 *
 * Looks for syncify configuration files within
 * the users project. Looks for a `syncify.config.js`
 * file, if one does not exists it will look for a
 * `syncify.config.json` file, if none found, returns `null`.
 *
 * > When `null` is returned, the `package.json` file is
 * assumed to contain configuration requirements.
 */
export async function configFile (cwd: string): Promise<Config> {

  let path: string = null;

  for (const file of [
    'syncify.config.js',
    'syncify.config.mjs',
    'syncify.config.cjs',
    'syncify.config.ts',
    'syncify.config.json'
  ]) {

    path = join(cwd, file);

    const exists = await pathExists(path);

    if (exists) break;

    path = null;

  }

  if (path === null) return null;

  try {

    if (extname(path) === '.json') {

      $.file.path = path;
      $.file.relative = relative(cwd, path);
      $.file.base = basename(path);

      const json = await readFile(path);

      return jsonc<Config>(json.toString());

    } else {

      $.file.path = path;
      $.file.relative = relative(cwd, path);
      $.file.base = basename(path);

      const config = await bundleRequire({
        cwd,
        filepath: path
      });

      return config.mod.syncify || config.mod.default || config.mod;

    }

  } catch (e) {

    console.log(e);

    const jsonconfig = join(cwd, 'syncify.config.json');
    const hasFile = await pathExists(jsonconfig);

    if (hasFile) return readJson(jsonconfig);

    return null;
  }

};

/**
 * Parse tsconfig.json / jsconfig.json
 *
 * Resolves `tsconfig.json` or `jsconfig.json` files for usage
 * with _script_ transforms and esbuild to support different
 * capabilities like path aliases.
 */
export async function getTSConfig (cwd: string): Promise<Tsconfig> {

  let uri: string;

  // Save path reference of package
  uri = join(cwd, 'tsconfig.json');

  const tsconfig = await pathExists(uri);

  if (!tsconfig) {
    uri = join(cwd, 'jsconfig.json');
    const jsconfig = await pathExists(uri);
    if (!jsconfig) return null;
  }

  try {

    const file = await readFile(uri);
    const config = stripJsonComments(file.toString());

    return JSON.parse(config);

  } catch (e) {

    throw new Error(e);

  }

};

/**
 * Set Package.json File
 *
 * Resolves `package.json` file. This is triggered
 * at runtime, the module requires the existence of
 * a `package.json` file.
 */
export async function getPackageJson (cwd: string) {

  // Save path reference of package
  const uri = join(cwd, 'package.json');
  const has = await pathExists(uri);

  if (!has) throw new Error('Missing "package.json" file');

  try {
    $.pkg = await readJson(uri);
  } catch (e) {
    throw new Error(e);
  }

};

/**
 * Set Package.json Version
 *
 * Resolves `package.json` file and overwrites the
 * version number, while preserving the JSON indentation.
 * Applies a reparse following the write, updating the the state `$.pkg` reference.
 */
export async function setPkgVersion (current: string, increment: string) {

  const uri = join($.cwd, 'package.json');

  try {

    const pkg = await readFile(uri);
    const str = pkg.toString();
    const ver = str.indexOf('"version"');
    const sqo = str.indexOf('"', ver + 10) + 1;
    const eqo = str.indexOf('"', sqo + 1);
    const num = str.slice(sqo, eqo);

    if (num === current) {

      await writeFile(uri, `${str.slice(0, sqo)}${increment}${str.slice(eqo)}`);
      await getPackageJson($.cwd);

      return true;

    } else {

      return false;

    }

  } catch (e) {

    throw new Error(e);
  }

};

/**
 * Read rcfile
 *
 * Looks for the existence of a `.env.syncify` or
 * `.env.syncify.json` file. This file can optionally
 * include credential information.
 */
export async function getEnvFile (cwd: string): Promise<ENV.RCFile> {

  let path = join(cwd, '.env');

  if (await pathExists(path)) {

    const env = dotenv.config({ path });

    if (env.error) {
      throws(env.error, { path });
      return null;
    }

    $.env.file = path;
    $.env.vars = env.parsed;

  } else {

    path = join(cwd, 'syncify.env');

    if (await pathExists(path)) {

      const env = dotenv.config({ path });

      if (env.error) {
        throws(env.error.message, { path });
        return null;
      }

      $.env.file = path;
      $.env.vars = env.parsed;

    } else {

      missingEnv(cwd);

    }

  }

};
