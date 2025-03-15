import fs from 'fs';
import { createRequire } from 'module';
import { dirname, isAbsolute, join, parse, resolve } from 'path';

import { Loaded } from './types';
import { jsonc } from './utils';

/**
 * Traverse directory structure up
 */
function findUp (name: string, startDir: string, stopDir = parse(startDir).root) {

  let dir = startDir;

  while (dir !== stopDir) {

    const file = join(dir, name);

    if (fs.existsSync(file)) return file;

    if (!file.endsWith('.json')) {
      const ext = file + '.json';
      if (fs.existsSync(ext)) return ext;
    }

    dir = dirname(dir);
  }

  return null;

};

/**
 * Generate regular expression for `tsconfig.json` paths
 */
export function tsconfigPaths (paths: Record<string, any>) {

  return Object.keys(paths || {}).map(path => new RegExp(`^${path.replace(/\*/, '.*')}$`));

};

/**
 * Resolve `tsconfig.json` from file
 */
export function tsconfigFile (cwd: string, filename: string) {

  return isAbsolute(filename) ? fs.existsSync(filename) ? filename : null : findUp(filename, cwd);

};

/**
 * Resolve `tsconfig.json` from extends value
 */
export const tsconfigExtends = (cwd: string, name: string) => {

  if (isAbsolute(name)) return fs.existsSync(name) ? name : null;
  if (name.startsWith('.')) return findUp(name, cwd);

  return createRequire(import.meta.url).resolve(name, { paths: [ cwd ] });

};

export function $tsconfig (dir: string, name = 'tsconfig.json', isExtends = false): Loaded | null {

  dir = resolve(dir);
  const path = isExtends ? tsconfigExtends(dir, name) : tsconfigFile(dir, name);

  if (!path) return null;

  const data: { extends?: string | string[]; [k: string]: any; } = jsonc(fs.readFileSync(path, 'utf8'));
  const configDir = dirname(path);

  if (data.compilerOptions?.baseUrl) {
    data.compilerOptions.baseUrl = join(configDir, data.compilerOptions.baseUrl);
  }

  const extendsFiles: string[] = [];

  if (data.extends) {

    const extendsList = Array.isArray(data.extends) ? data.extends : [ data.extends ];
    const extendsData: Record<string, any> = {};

    for (const name of extendsList) {

      const parentConfig = $tsconfig(configDir, name, true);

      if (parentConfig) {

        Object.assign(extendsData, {
          ...parentConfig?.data,
          compilerOptions: {
            ...extendsData.compilerOptions,
            ...parentConfig?.data?.compilerOptions
          }
        });

        extendsFiles.push(...parentConfig.files);

      }
    }

    Object.assign(data, {
      ...extendsData,
      ...data,
      compilerOptions: {
        ...extendsData.compilerOptions,
        ...data.compilerOptions
      }
    });
  }

  delete data.extends;

  return {
    path,
    data,
    files: [
      ...extendsFiles,
      path
    ]
  };

};
