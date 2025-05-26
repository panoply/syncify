import type { AccessScopes, Choice, LiteralString } from 'types';

import { readFileSync } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { accessScopeList, accessStore } from '~http/access';
import { cancel, choose, intercept, label, prompt, theme } from '~prompt';
import { has, isEmpty, isNil, keys, plur, timeAgo } from '~utils';

import { $ } from '$';

export interface CredentialsPrompt {
  /**
   * String copy of .env file to be written
   *
   * ```env
   * # Credentials syncify.myshopify.com
   * syncify_api_token = 'shppa_88aabbccddeeffgghhiijjllmmnn'
   * ```
   */
  env?: string;
  /**
   * The store name
   *
   * @example
   * 'syncify' in 'syncify.myshopify.com'
   */
  store?: string;
  /**
   * The store domain name
   *
   * @example
   * 'syncify.myshopify.com'
   */
  domain: string;
  /**
   * The date keychain reference was created
   */
  created: number;
  /**
   * The date keychain reference was updated
   */
  updated: number;
  /**
   * The actual API Token
   *
   * @example
   * 'shppa_88aabbccddeeffgghhiijjllmmnn'
   */
  token: string;
  /**
   * A token name alias to either add to the keychain domain list or
   * to be selected. This value represents the key names within the
   * keychain object.
   *
   * @example
   * {
   *   "syncify.myshopify.com": {
   *     "<here>": {
   *       "name":"<here>",
   *       // ...
   *      }
   *    }
   *  }
   * }
   */
  name: string;
  /**
   * Whether or not credentials are from existing keychain
   */
  existing: boolean;
  /**
   * The storage method
   */
  method: LiteralString<'keychain' | 'env'>;
  /**
   * Access scopes
   *
   */
  scopes: Partial<Record<AccessScopes, boolean>>
}

/* -------------------------------------------- */
/* PROMPTS                                      */
/* -------------------------------------------- */

/**
 * Credential Prompt
 *
 * ```plaintext
 * │  Storage Method:   ➔  env
 * │  Shopify Domain:   ➔  store.myshopify.com
 * │  API Admin Token:  ➔  shpat_***
 * │  Target Storage:   ➔  package.json
 * │  Theme Targets:    ➔  select
 * │  Select Themes:    ➔  Dawn, Example
 * │  Define Targets:   ➔  0% completed
 * ```
 */
export async function PromptCredentialsFile (options: {
  /** Whether or not we should use keychain related prompts */
  keychain: boolean;
}) {

  /** Current timestamp */
  const date = Date.now();

  /** Prompt Model */
  const state: CredentialsPrompt = {
    env: null,
    store: null,
    domain: null,
    name: null,
    created: date,
    updated: date,
    token: null,
    existing: false,
    method: null,
    scopes: {
      read_content: false,
      read_files: false,
      read_online_store_pages: false,
      read_themes: false,
      write_content: false,
      write_files: false,
      write_online_store_pages: false,
      write_themes: false
    }
  };

  /* -------------------------------------------- */
  /* BEGIN PROMPTS                                */
  /* -------------------------------------------- */

  state.method = await PromptStoreMethod();

  /* KEYCHAIN ----------------------------------- */

  if (options.keychain && isEmpty($.keychain) === false) {

    state.existing = await PromptExisting();

    if (state.existing) await PromptKeychain();

  }

  /* DOMAIN ------------------------------------- */

  if (state.domain === null) {
    state.domain = await PromptStoreDomain();
  }

  /* API TOKEN ---------------------------------- */

  if (state.token === null) {
    state.token = await PromptStoreToken();
  }

  /* METHOD FALLBACK ---------------------------- */

  if (state.method === null) {
    state.method = await PromptStoreMethod();
  }

  /* TOKEN NAME --------------------------------- */

  if (state.method === 'keychain') {
    state.name = await PromptTokenName();
  }

  /* ADDING NEW CREDENTIAL ---------------------- */

  if (state.domain !== null && state.store === null) {
    state.store = state.domain.replace(/\.myshopify\.com$/, '');
  }

  const credential = glue.nl(
    `# Credentials: ${state.domain}`,
    `${state.store}_api_token = '${state.token.trim()}'`
  );

  if ($.file.env !== null) {
    const env = readFileSync($.file.env, 'utf8');
    state.env = env.trimEnd() + NLR + credential;
  } else {
    state.env = credential;
  }

  // Return Credentials State
  //
  return state;

  /* -------------------------------------------- */
  /* FUNCTION PROMPTS                             */
  /* -------------------------------------------- */

  /**
   * Select the storage method for tokens to use.
   */
  async function PromptStoreMethod () {

    const resolve = await prompt<{ method: string }>({
      theme,
      message: label.StorageMethod,
      name: 'method',
      type: 'select',
      choices: choose(<Choice[]>[
        {
          name: 'env',
          hint: 'Per-Project .env file token storage'
        },
        {
          name: 'keychain',
          hint: 'Globally accessible token vault storage'
        }
      ], { prop: 'name', padding: 3 })()
    }).catch(cancel);

    return resolve.method;

  }

  /**
   * Confirm whether or not user prefers to choose credentials that already exist in keychain.
   */
  async function PromptExisting () {

    const resolve = await prompt<{ existing: boolean }>({
      theme,
      message: label.ExistingToken,
      name: 'existing',
      type: 'toggle',
      hint: '   Choose an existing token from keychain?',
      default: 'Yes',
      disabled: 'No',
      enabled: 'Yes'
    }).catch(cancel);

    return resolve.existing;

  }

  /**
   * Select store keychain reference and the API token to use.
   * Prompts each keychain key which is the related store domain name
   * in which the token belongs.
   */
  async function PromptKeychain () {

    const { domain } = await prompt<{ domain: string }>({
      theme,
      message: label.WhichKeychain,
      type: 'select',
      name: 'domain',
      choices: choose(keys($.keychain))((domain, value) => {
        const tokens = keys($.keychain[domain]);
        const hint = `${tokens.length} ${plur('token', tokens.length)} available`;
        return {
          name: domain,
          hint
        };
      })
    }).catch(cancel);

    state.domain = domain;
    state.store = domain.replace(/\.myshopify\.com$/, '');

    const tokens = keys($.keychain[domain]);

    if (tokens.length > 1) {

      const { name } = await prompt<{ name: string; }>({
        theme,
        message: label.SelectToken,
        type: 'select',
        name: 'name',
        choices: choose(tokens)(name => ({
          name,
          hint: `added ${timeAgo($.keychain[domain][name].updated)}`
        }))
      }).catch(cancel);

      state.name = name;
      state.token = $.keychain[domain][name].token;

    } else {

      state.name = tokens[0];
      state.token = $.keychain[domain][state.name].token;

    }

  }

  /**
   * Enter the shopify store domain for credentials
   */
  async function PromptStoreDomain () {

    let valid: 1 | 2 | 3 = 2;

    const dispose = intercept();
    const resolve = await prompt<{ domain: string }>({
      theme,
      message: label.ShopifyDomain,
      type: 'input',
      name: 'domain',
      format (value: string) {

        return valid === 1
          ? _.neonGreen(`${value}.myshopify.com`)
          : (valid === 3 ? _.red(`${value}`) : value) + _.gray('.myshopify.com');

      },
      async validate (value: string) {

        this.state.symbols.pointer = NIL;

        if (value.length === 0) {

          valid = 3;

          return _.Multiline(
            _.red.bold('MISSING STORE NAME'),
            NWL,
            `Please enter the ${_.cyan('myshopify.com')} store domain name.`
          );

        } else if (value.length < 3) {

          valid = 3;

          return _.Multiline(
            _.red.bold('INVALID STORE NAME'),
            NWL,
            `Store name must be more than ${_.cyan('3')} characters long.`,
            'Shopify does support short-name store domains.'
          );

        } else if (has(value, $.stores)) {

          valid = 3;

          return _.Multiline(
            _.red.bold('INVALID STORE NAME'),
            NWL,
            'There is an existing project connected to this domain.',
            'You cannot overwrite existing credentials in the keychain.'
          );

        }

        const { exists, error } = await accessStore(value);

        if (exists === false) {

          const context = error.response.status === 404
            ? `Store "${_.cyan(`${value}.myshopify.com`)}" does not exist on the Shopify platform.`
            : `Connection failed to interface with ${_.red.bold(`${value}.myshopify.com`)} store.`;

          valid = 3;

          return _.Multiline(
            _.red.bold(`ERROR ${_.CHV} STORE NOT FOUND`),
            NWL,
            error.message.replace(/(\d+)/, _.red.bold('$1')) + '.',
            context,
            'Please check the correct store name has been provided.'
          );

        }

        valid = 1;

        return true;

      }
    }).catch(cancel);

    dispose();

    return resolve.domain;

  }

  /**
   * Validate the provided API Access token
   */
  async function PromptStoreToken () {

    const dispose = intercept();
    const resolve = await prompt<{ token: string }>({
      theme,
      message: label.APIAdminToken,
      type: 'input',
      name: 'token',
      async validate (value: string) {

        this.state.symbols.pointer = '';

        if (value.length === 0) {

          return _.Multiline(
            _.red.bold('REQUIRED'),
            NWL,
            'You must provide an API Token'
          );

        } else if (value.length < 10) {

          return _.Multiline(
            _.red.bold('INVALID TOKEN'),
            NWL,
            'The API Access token you provided is far too short to be valid.',
            'Tokens have a minimum length, please check the token and try again.'
          );

        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {

          return _.Multiline(
            _.red.bold('BAD TOKEN'),
            NWL,
            'The API Access token you provided contains invalid characters.',
            `Shopify tokens must match the following pattern${_.COL} ${_.cyan('^[a-zA-Z0-9_]+$')}`
          );

        }

        const { scopes, error } = await accessScopeList(state.domain, value);

        if (!isNil(error)) {

          return _.Multiline(
            _.red.bold(`ERROR ${error.status}`),
            NWL,
            error.data.errors || error.statusText,
            'Please check the API Access Token is active and try again.'
          );

        } else {

          const tui = _.Create()
          .Prepend('ERROR IN SCOPES', _.red.bold)
          .Line(`Syncify requires certain ${_.cyan('read')} and ${_.cyan('write')} access scopes.`, _.red)
          .Prepend('Ensure the token has access to all scopes listed in red (below) and try again.', _.red);

          if (scopes.length > 0) {
            for (const { handle } of scopes) {
              if (handle in state.scopes) {
                state.scopes[handle] = true;
                tui.Line(`${_.CHK} ${handle}`, _.neonGreen);
              }
            }
          }

          let count: number = 0;

          for (const scope in state.scopes) {
            if (state.scopes[scope] === false) {
              tui.Line(`${_.BAD} ${scope}`, _.red);
              count = count + 1;
            }
          }

          if (count > 0) {

            return tui.Newline().toString();

          }

        }

        return true;

      }
    }).catch(cancel);

    dispose();

    return resolve.token.trim();

  }

  /**
   * When keychain method we need to name the token we provided
   */
  async function PromptTokenName () {

    const resolve = await prompt<{ name: string}>({
      theme,
      message: label.APITokenName,
      required: true,
      type: 'input',
      name: 'name',
      hint: 'Name the API Access Token (internal use)'
    }).catch(cancel);

    return resolve.name;

  }
}
