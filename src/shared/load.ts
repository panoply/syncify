import { Config } from 'types';
import fs from 'fs';
import JoyCon from 'joycon';
import path from 'path';
import { bundleRequire } from 'bundle-require';
import { jsonc } from './utils';
import { from, keys } from './native';

const joycon = new JoyCon();

const loadJson = async (filepath: string) => {

  try {

    return jsonc(await fs.promises.readFile(filepath, 'utf8'));

  } catch (error) {

    if (error instanceof Error) {
      throw new Error(`Failed to parse ${path.relative(process.cwd(), filepath)}: ${error.message}`);
    } else {
      throw error;
    }
  }
};

joycon.addLoader({
  test: /\.json$/,
  load: (filepath: string) => loadJson(filepath)
});

export async function loadSyncifyConfig (cwd: string, configFile?: string): Promise<{
  path?: string;
  data?: Config
}> {

  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve({
    files: configFile
      ? [ configFile ]
      : [
        'syncify.config.ts',
        'syncify.config.js',
        'syncify.config.cjs',
        'syncify.config.mjs',
        'syncify.config.json',
        'package.json'
      ],
    cwd,
    packageKey: 'syncify'
  });

  if (configPath) {

    if (configPath.endsWith('.json')) {

      let data = await loadJson(configPath) as { syncify?: Config };

      if (configPath.endsWith('package.json')) {

        data = data.syncify;
      }

      if (data) return { path: configPath, data };

      return {};
    }

    const config = await bundleRequire({ filepath: configPath });

    return {
      path: configPath,
      data: config.mod.syncify || config.mod.default || config.mod
    };
  }

  return {};
}

export async function loadPkg (cwd: string) {

  const { data } = await joycon.load([ 'package.json' ], cwd, path.dirname(cwd));
  return data || {};
}

export async function getDeps (cwd: string) {
  const data = await loadPkg(cwd);

  const deps = from(
    new Set([
      ...keys(data.dependencies || {}),
      ...keys(data.peerDependencies || {})
    ])
  );

  return deps;
}
