import { Bundle, Config, ESBuildConfig, Package, Processors, ScriptTransform } from 'types';
import { relative, join } from 'node:path';
import { has, hasPath, isEmpty, omit } from 'rambdax';
import { getModules, readConfigFile } from '../shared/options';
import { warnOption, missingDependency, invalidError, typeError } from './validate';
import { getTransform, renameFile } from './utilities';
import { assign, defineProperty, isArray, isObject } from '../shared/native';
import { getTSConfig } from './files';
import { bundle, processor } from '../config';
import { runtime, pluginWatch, pluginPaths } from '../transform/script';
import { c } from '../logger';
import merge from 'mergerino';
import anymatch from 'anymatch';

type ESBuildProcess = Processors['esbuild']

/**
 * Script Transform
 *
 * Normalizes and generates the configuration model which will
 * be used for script transformations using ESBuild.
 */
export async function setScriptOptions (config: Config, pkg: Package) {

  if (!has('script', config.transforms)) return;

  const { esbuild } = processor;
  const { script } = config.transforms;
  const warn = warnOption('script transform option');

  esbuild.installed = getModules(pkg, 'esbuild');

  if (esbuild.installed) {

    const esb = await readConfigFile<ESBuildProcess>('esbuild.config');

    if (esb !== null) {
      esbuild.file = esb.path;
      esbuild.config = merge(esbuild.config, esb.config);
    }

  } else {
    missingDependency('esbuild');
  }

  if (has('entryPoints', esbuild.config)) {
    warn('processor config is not allowed and was omitted', 'entryPoints');
    delete esbuild.config.entryPoints;
  }

  const tsconfig = await getTSConfig(bundle.cwd);
  const transforms = getTransform<ScriptTransform[]>(script, true);
  const esboptions = omit([ 'input', 'watch', 'rename', 'snippet' ]);

  defineProperty(esbuild, 'tsconfig', { get () { return tsconfig; } });

  // Set global plugins
  if (esbuild.config.plugins.length > 0) {
    esbuild.config.plugins.unshift(pluginPaths(), pluginWatch());
  } else {
    esbuild.config.plugins.push(pluginPaths(), pluginWatch());
  }

  esbuild.config.absWorkingDir = bundle.cwd;

  for (const transform of transforms) {

    if (bundle.watch.has(transform.input as string)) {
      warn('input already in use', relative(bundle.cwd, transform.input as string));
    }

    const o: Bundle['script'][number] = {
      input: transform.input as string,
      snippet: transform.snippet,
      rename: null,
      watch: null,
      esbuild: null
    };

    const build = assign({ entryPoints: [ transform.input ] }, esbuild.config) as unknown;
    const esb = esboptions(transform);
    const { name } = renameFile(transform.input as string, transform.rename); // Rename file

    if (!name.endsWith('.js') && !name.endsWith('.mjs')) {
      o.rename = name + '.js';
    } else if (name.endsWith('.cjs')) {
      invalidError('rename', 'file extension', name, '.js | .mjs');
    } else {
      o.rename = name;
    }

    if (transform.snippet) {
      if (!name.endsWith('.liquid')) o.rename = name + '.liquid';
      bundle.watch.add(`!${join(bundle.cwd, config.output, 'snippets', o.rename)}`);
    } else {
      if (name.endsWith('.liquid')) warn('Using .liquid extension rename for asset', name);
      bundle.watch.add(`!${join(bundle.cwd, config.output, 'assets', o.rename)}`);
    }

    if (isEmpty(esb)) {

      defineProperty(o, 'esbuild', { get () { return build; } });

    } else {

      for (const prop in esb) {

        if (prop === 'entryPoints') {
          warn('Option is not allowed, use Syncify input instead', prop);
        } else if (prop === 'outdir') {
          warn('Option is not allowed, Syncify will handle output', prop);
        } else if (prop === 'watch') {
          warn('Option is not allowed, declare watch using Syncify', prop);
        } else if (
          prop === 'absWorkingDir' ||
          prop === 'watch' ||
          prop === 'incremental' ||
          prop === 'write' ||
          prop === 'logLevel'
        ) {
          warn('Option is not allowed and will be ignored', prop);
        } else if (prop === 'plugins') {
          build[prop].push(...esb[prop]);
        } else {
          build[prop] = esb[prop]; // Apply override
        }
      }

      defineProperty(o, 'esbuild', { get () { return build; } });
    }

    if (!has('watch', transform)) transform.watch = [];
    if (!isArray(transform.watch)) typeError('script', 'watch', transform.watch, 'string[]');

    // Lets run a pre-build to obtain all the entry points
    // of script imports. We will use this in watch process
    const entries: ESBuildConfig = assign({}, isObject(transform.esbuild) ? transform.esbuild : esbuild.config, {
      entryPoints: [ transform.input ],
      write: false,
      watch: false,
      incremental: true,
      logLevel: 'silent',
      absWorkingDir: bundle.cwd,
      plugins: []
    }) as unknown;

    if (esbuild.tsconfig !== null && hasPath('compilerOptions.paths', esbuild.tsconfig)) {
      entries.plugins.push(pluginPaths(transform), pluginWatch(transform));
    } else {
      entries.plugins.push(pluginWatch(transform));
    }

    await runtime(entries);

    transform.watch.forEach(p => bundle.watch.add(p));

    o.watch = anymatch(transform.watch);

    bundle.script.push(o);

  }

  esbuild.loaded = true;

}
