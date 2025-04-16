import type { AccessScopes, Choice, LiteralString } from 'types';

import { readFileSync } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { accessScopeList, accessStore } from '~http/access';
import { cancel, intercept, label, prompt, theme } from '~prompt';
import { eqWS, has, isEmpty, isNil, keys, prettyDate } from '~utils';

import { $ } from '$';

export interface CredentialsPrompt {
  /** String copy of .env file to be written */
  env?: string;
  /** The store */
  store?: string;
  /** The store domain name */
  domain: string;
  /** The token name */
  name: string;
  /** The date keychain reference was created */
  created: number;
  /** The date keychain reference was updated */
  updated: number;
  /** The token */
  token: string;
  /** Whether or not credentials are from existing keychain  */
  existing: boolean;
  /** The storage method  */
  method: LiteralString<'keychain' | 'env'>;
  /** Access scopes */
  scopes: Record<AccessScopes, boolean>
}

/* -------------------------------------------- */
/* PROMPTS                                      */
/* -------------------------------------------- */

export async function PromptCredentialsFile (options: {
  /** Whether or not the greeting message logs */
  greeting: boolean;
  /** Whether or not we are working with the keychain */
  keychain: boolean;
}) {

  /** TUI Tree */
  const tui = _.Create();

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

  /* GREETING ----------------------------------- */

  if (options.greeting) {

    tui.Wrap(
      _.gray
      , 'Hello Hacker 👋' + NLR
      , `Projects require Shopify API Authorization tokens. Store them in a ${_.cyan('.env')} file`
      , 'on a per project basis, or for a more secure, file-free option, use the Syncify keychain.'
      , 'The keychain bcrypts tokens on your system and auto-loads them on-demand during development.'
    ).Newline().toLog({ clear: true });

  }

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

  state.store = state.domain;
  state.domain = `${state.store}.myshopify.com`;

  const credential = glue.nl(
    `# Credentials: ${state.domain}`,
    `${state.name}_api_token = '${state.token.trim()}'`
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

    const choices: Choice[] = [
      {
        name: 'env',
        value: 'env',
        hint: 'Per-Project .env file token storage'
      },
      {
        name: 'keychain',
        value: 'keychain',
        hint: 'Gobally accessible token vault storage'
      }
    ];

    const spacing = eqWS(choices, { prop: 'name', padding: 4 });
    const resolve = await prompt<{ method: string }>({
      theme,
      message: label.StorageMethod,
      name: 'method',
      type: 'select',
      choices: choices.map(({ name, value, hint }) => ({
        name,
        value,
        hint: spacing(name) + hint
      }))
    }).catch(cancel);

    return resolve.method;

  }

  /**
   * Confirm whether or not user prefers to choose credentials that already exist in keychain.
   */
  async function PromptExisting () {

    const resolve = await prompt<{ existing: string }>({
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
   */
  async function PromptKeychain () {

    const items = keys($.keychain);
    const maxLen = Math.max(...items.map(s => s.length));
    const padded = items.map(s => ' '.repeat(maxLen - s.length + 2));
    const { domain } = await prompt<{ domain: string }>({
      theme,
      message: label.WhichKeychain,
      type: 'select',
      name: 'domain',
      choices: items.map((value, i) => ({
        name: value,
        message: value.replace('.myshopify.com', ''),
        hint: padded[i] + `https://${value}`
      }))
    }).catch(cancel);

    state.domain = domain;

    const store = $.keychain[domain];
    const tokens = keys(store);

    if (tokens.length > 0) {
      if (tokens.length > 1) {

        const maxLen = Math.max(...tokens.map(s => s.length));
        const padded = tokens.map(s => ' '.repeat(maxLen - s.length + 2));
        const { name } = await prompt<{ name: string }>({
          theme,
          message: label.SelectToken,
          type: 'select',
          name: 'name',
          choices: tokens.map((name, i) => ({
            name,
            hint: padded[i] + `Created ${prettyDate(store[name].created)}`
          }))
        }).catch(cancel);

        state.name = name;
        state.token = store[name].token;

      } else {

        state.name = tokens[0];
        state.token = store[tokens[0]].token;

      }

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

    return resolve.token;

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
      hint: 'Name the API Access Token'
    }).catch(cancel);

    return resolve.name;

  }
}
