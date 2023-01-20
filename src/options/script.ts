import { Config, ESBuildConfig, Package, ScriptBundle, ScriptTransform } from 'types';
import { relative, join } from 'node:path';
import { has, hasPath, isEmpty, omit } from 'rambdax';
import merge from 'mergerino';
import anymatch from 'anymatch';
import { getModules, readConfigFile } from '~utils/options';
import { warnOption, missingDependency, invalidError, typeError, throwError } from '~log/validate';
import { getTransform, renameFile } from './utilities';
import { assign, defineProperty, isArray, isObject } from '~utils/native';
import { getTSConfig } from './files';
import { bundle, processor } from '~config';
import { module, pluginWatch, pluginPaths, esbuild as runtime } from '~transform/script';
import { uuid } from '~utils/utils';
import { Type } from '~process/files';
// import { log } from '~log';

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

    const loaded = await module();

    if (!loaded) throwError('failed to import ESBuild', 'Ensure you have installed esbuild');

    const esb = await readConfigFile<ESBuildConfig>('esbuild.config');

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
  const transforms = getTransform<ScriptTransform[]>(script, {
    addWatch: false,
    flatten: true
  });

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

    const o: ScriptBundle = {
      uuid: uuid(),
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
      bundle.paths.transforms.set(o.input, Type.Script);
    } else {
      if (name.endsWith('.liquid')) warn('Using .liquid extension rename for asset', name);
      bundle.watch.add(`!${join(bundle.cwd, config.output, 'assets', o.rename)}`);
    }

    if (isEmpty(esb)) {

      defineProperty(o, 'esbuild', { get () { return build; } });

    } else {

      for (const prop in esb) {

        if (prop === 'entryPoints') {
          warn('Option is not allowed, use Syncify "input" instead', prop);
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
    const entries: ESBuildConfig = assign(
      {},
      isObject(transform.esbuild) ? transform.esbuild : esbuild.config,
      {
        entryPoints: [ transform.input ],
        write: false,
        sourcemap: false,
        // logLevel: 'silent',
        absWorkingDir: bundle.cwd,
        plugins: [],
        outdir: transform.snippet
          ? join(bundle.dirs.output, 'snippets')
          : join(bundle.dirs.output, 'assets'),
        loader: {
          '.liquid': 'file'
        }
      }
    ) as unknown;

    if (esbuild.tsconfig !== null && hasPath('compilerOptions.paths', esbuild.tsconfig)) {
      entries.plugins.push(pluginPaths(transform), pluginWatch(transform));
    } else {
      entries.plugins.push(pluginWatch(transform));
    }

    try {

      await runtime.build(entries);

    } catch (e) {

      // TODO - HANDLE RUNTIME ERRORS
      throw new Error(e);

    }

    transform.watch.forEach(p => {

      if (!bundle.watch.has(p)) bundle.watch.add(p);

    });

    o.watch = anymatch(transform.watch);

    await module(o);

    bundle.script.push(o);

  }

  esbuild.loaded = true;

}
