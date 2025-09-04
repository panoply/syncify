import { join } from 'node:path';

import dotenv from 'dotenv';
import { pathExists, readJson } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';

import { error } from '~cli/errors';
import { throws } from '~cli/throws';
import { http } from '~http/client';
import { defineProperty, has, isEmpty } from '~utils';

import { $ } from '$';

/**
 * Looks for the existence of a `.env` file in the project root directory.
 * This file can optionally include credential information, when no `.env`
 * file exists then the Syncify Keychain is assumed and looked up.
 *
 * If neither references exist for the project, we notify.
 */
export async function getEnv (cwd = $.cwd) {

  const path = join(cwd, '.env');

  // First, we look for project level .env

  if (await pathExists(path)) {
    $.file.env = path;
    $.project.credentials = 'env';
  } else {
    if ($.file.project !== null) {
      const kc = join($.root, '.env');
      if (await pathExists(kc)) { // Keychain exists, we can proceeed as normal
        $.file.env = kc;
        $.project.credentials = 'kc';
      }
    }
  }

  // if the file .env reference is null, there is no associated
  // credentials within this project, so we consult the global keychain.
  //
  if ($.file.env !== null) {

    const env = dotenv.config({ path: $.file.env, quiet: true });

    if (env.error) {
      error.throw(env.error, { path: $.file.env });
    }

    defineProperty($.env, 'vars', { get () { return env.parsed; } });

    // Let's now validate environment variables and ensure we have valid entries
    // we only need to validate project level credentials defined in a .env file
    if ($.project.credentials === 'env') {
      if (isEmpty($.env.vars)) {
        ThrowCredentials();
      } else {
        setStoreClient($.env.vars);
      }
    }

  } else {

    // At this point, we will consult global keychain
    // We need to ensure that we are not running in any
    // potentially conflicting modes before throwing our
    // error informing that no credentials (.env) file is present.

    if (!$.mode.create && !$.mode.init && !$.mode.keychain) {

      if ($.file.project !== null) ThrowCredentials({ missing: true });

    } else {

      if (await pathExists($.file.keychain)) {

        await getKeychain();

      } else {

        // this is a critical failure, the keychain should exist
        // lets notify and give programmatic option.

        throws([
          'Syncify is missing core reference files. Please report this issue on the',
          `github repo, ${_.cyan.underline('https://github.com/panoply/syncify/issues')}). This`,
          `error may be due to a corrupted installation which prevented ${_.blue('postinstall')}`,
          'hooks from firing.'
        ], [
          'Programmatic generation of core references may resolve this issue. Use the',
          `${_.cyan('sy doctor')} command and syncify will try to fix the problem.`,
          'If the error persists, please ensure read/write access permissions allow',
          `for directory and file generation within ${_.cyan($.home)} location.`
        ]);

      }

    }
  }
};

export async function getKeychain () {

  // We may already have the keychain in state
  //
  if ($.keychain === null) {
    $.keychain = await readJson($.file.keychain);
  }

  if (!isEmpty($.keychain)) {

    // We have project context, lets attempt to obtain
    // credentials from keychain
    if ($.project !== null) {

      // TODO

    }

  }

}

/**
 * Constructs the `$.clients` model which is used by Axios requests and
 * contains the workable structures used for the API.
 */
export function setStoreClient (vars: { [key: string]: string; }) {

  const getStorefrontPassword = (domain: string) => {

    const lowercase = `${domain}_password`;
    const uppercase = lowercase.toUpperCase();

    return lowercase in vars
      ? vars[lowercase]
      : uppercase in vars ? vars[uppercase] : null;
  };

  for (const prop in vars) {

    const p = prop.toLowerCase().trimEnd();
    const m = p.search(/_a(?:pi|ccess)_token$/m);

    if (m > -1) {

      const name = p.slice(0, m);
      const password = getStorefrontPassword(name);
      const token = getXiorConfig(vars, name);

      $.stores.push({
        name,
        token,
        password,
        domain: `${name}.myshopify.com`,
        themes: null
      });

    }

  }

  if (isEmpty($.stores)) ThrowCredentials();

}

/**
 * Generate the the authorization request url for axios clients. This will contain the
 * `X-Shopify-Access-Token` headers and endpoint URL.
 */
export function getXiorConfig (vars: { [key: string]: string; }, name: string) {

  let api_token = name + '_api_token'; // => some-store_api_token

  if (!has(api_token, vars)) {

    api_token = api_token.toUpperCase(); // =>  SOME-STORE_API_TOKEN

    if (!has(api_token, vars)) {

      api_token = name + '_access_token'; // => some-store_access_token

      if (!has(api_token, vars)) {
        api_token = api_token.toUpperCase(); // => // SOME-STORE_ACCESS_TOKEN
      }

    }

  }

  if (has(api_token, vars)) {

    const token = vars[api_token];

    http(name, token);

    return token;

  } else {

    throws(`Invalid or missing ${_.cyan(name + '.myshopify.com')} credentials`, [
      `Your shop credentials in the ${_.cyan.bold('.env')} file could`,
      'not be read correctly or are missing. Please check your environment file and ensure',
      'you have provided valid authorization, or if you are using the Keychain, please check',
      'credential association has been applied.'
    ]);
  }

};

/* -------------------------------------------- */
/* ERRORS                                       */
/* -------------------------------------------- */

function ThrowCredentials ({ missing = false } = {}) {

  _
  .Create({ type: 'error' })
  .Line(missing ? 'MISSING CREDENTIALS' : 'BAD CREDENTIALS', _.bold)
  .Newline()
  .Wrap(missing ? [
    'Missing authorization credentials. Syncify could not resolve API tokens within this project.',
    `There is no ${_.cyan('.env')} file present or keychain association.`
  ] : [
    'The project\'s authorization access failed due to missing or invalid credentials.',
    'Syncify could not obtain shop api access tokens. Check that you have correctly',
    `provided token reference within your ${_.cyan('.env')} file or use the keychain.`
  ])
  .Tree('info')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Line('Refer to the documentation for credential options and setup', _.gray)
  .Header(`${_.CHV} ${_.underline('https://syncify.sh/setup/credentials')}`, _.gray)
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};
