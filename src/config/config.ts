import { resolve } from 'path';
import { readFile, pathExistsSync } from 'fs-extra';
import { IConfigFile } from '../typings';
import chalk from 'chalk';
import dotenv from 'dotenv';
import * as log from './logger';

/**
 * Parses JSON configuration file
 */
function parseConfig (config: string, filename: string) {

  try {
    return JSON.parse(config);
  } catch (e) {
    throw new Error(`Your '${filename}' file is corrupt. JSON failed to parse`);
  }

}

function getConfig (config: string): IConfigFile {

  const options:{ shopifysync: IConfigFile } = parseConfig(config, 'package.json');

  if (!options?.shopifysync) {
    throw new Error('Your package.json file is missing a "shopifysync" property!');
  }

  for (const file of options.shopifysync.targets) {
    Object.assign(file, parseENV(file.domain));
  }

  return options.shopifysync;

}

/**
 * Parses `.env` file for API and Password keys
 */
export function parseENV (store?: string) {

  const cwd = process.cwd();
  const env = dotenv.config({ path: resolve(cwd, '.env') });

  if (env.error) throw env.error;

  const store_domain = store.toUpperCase();
  const store_api_key = `${store_domain}_API_KEY`;
  const store_password = `${store_domain}_PASSWORD`;

  const api_key = env.parsed?.[store_api_key] ?? env.parsed?.[store_api_key.toLowerCase()];

  if (!api_key) {
    throw new Error(`The "${store_domain}_password" is missing in .env file!`);
  }

  const password = env.parsed?.[store_password] ?? env.parsed?.[store_password.toLowerCase()];

  if (!password) {
    throw new Error(`The "${store_domain}_password" is missing in .env file!`);
  }

  return { api_key, password };

}

export async function readConfig () {

  const cwd = process.cwd();
  const shopifysync = resolve(cwd, '.shopifysync.json');
  const pkg = resolve(cwd, 'package.json');

  if (pathExistsSync(shopifysync)) {

    log.print(
      chalk`The {cyan .shopifysync.json} configuration file approach is deprecated and will stop working in future releases. Define configuration in your {cyan package.json} file via {cyan "shopifysync"} and place credentials in a {cyan .env} file.\n\nFor more information: {white.underline https://github.com/panoply/shopify-sync}\n`,
      'yellowBright',
      'console'
    );

    const config = await readFile(shopifysync, 'utf8');

    return parseConfig(config, '.shopifysync');

  } if (pathExistsSync(pkg)) {

    const config = await readFile(pkg, 'utf8');

    return getConfig(config);

  } else {

    throw new Error('Configuration file is missing. Your workspace requires a ".shopifysync.json" or "ssconfig.json" configuration file!');

  }

}
