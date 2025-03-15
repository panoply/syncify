import { readFile, writeFile } from 'fs-extra';
import { $import } from 'modules';

import { parse } from '@syncify/json';

/**
 * Parse `.toml` file.
 */
export async function parseToml <T> (uri: string): Promise<T> {

  const toml = await $import<'toml'>('smol-toml');
  const file = await readFile(uri, 'utf-8');

  return <T> toml.parse(file);

}

/**
 * Parse `.toml` file.
 */
export async function writeToml <T> (uri: string, input: T) {

  const toml = await $import<'toml'>('smol-toml');
  const file = toml.stringify(input);

  return writeFile(uri, file);

}

export async function parseJson (uri: string) {

  try {

    const file = await readFile(uri, 'utf-8');

    return parse(file);

  } catch (e) {

  }

}

export async function parseYaml <T> (uri: string): Promise<T> {

  const file = await readFile(uri, 'utf-8');
  const yaml = await $import<'yaml'>('js-yaml');

  return <T>yaml.load(file);

}

export async function writeYaml <T> (uri: string, input: T) {

  const yaml = await $import<'yaml'>('js-yaml');
  const file = yaml.dump(input);

  return writeFile(uri, file);

}
