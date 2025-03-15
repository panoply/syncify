/* eslint-disable no-unused-vars */
import type { ArrayPromptOptions, Choice, Store, Stores, StringPromptOptions } from 'types';

import { join } from 'node:path';

import { copy, exists, pathExists, readJson, remove } from 'fs-extra';
import access from 'syncify/terser/requests/access';
import { AccessScopes, Config, Keychain, KeychainToken, PKG, Store } from 'types';

import * as c from '@syncify/ansi';

import { error } from '~cli/errors';
import { log } from '~cli/log';
import * as throws from '~cli/throws';
import { prompt, theme } from '~prompts/enquirer';
import { assign, command, delay, has, hasPath, isBoolean, isEmpty, keys, object } from '~utils';
import { execAsync } from '~utils/child';
import { getTokensFromEnv } from '~utils/keychain';

import { $ } from '$';

export const Keychain = function () {

  const options: Array<[string, string]> = <const>[
    [ 'Create', '    Create a storefront token entry in keychain' ],
    [ 'Associate', ' Associate existing token to project' ],
    [ 'Update', '    Update tokens in the keychain' ],
    [ 'Inspect', '   View tokens in the global keychain' ],
    [ 'Delete', '    Remove tokens in the global keychain' ]
  ];

};

Keychain.associate = function (stores: Stores[]) {

  const choice: Choice[] = [];

  for (const store of stores) {
    const tokens = $.keychain[store.domain];
    choice.push({ name: tokens.name });
  }

};
