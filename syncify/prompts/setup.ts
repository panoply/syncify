import type { AccessScopes } from 'types';
import type { Choice, StringPromptOptions } from 'types/internal';
import { join } from 'node:path';
import { prompt } from 'enquirer';
import { writeFile } from 'fs-extra';
import { assign } from 'syncify:native';
import { theme as Theme } from 'syncify:prompts/enquirer';
import { glueLines, isBoolean } from 'syncify:utils';
import { getEnvFile, setPackageSyncify } from 'syncify:options/files';
import { strap } from 'syncify:prompts/strap';
import * as c from '@syncify/ansi';
import * as log from 'syncify:log';
import * as access from 'syncify:requests/access';
import { $ } from 'syncify:state';

export async function setup () {

  const message = c.Create({ type: 'info' });
  const model: {
    store: string;
    password: string;
    domain: string;
    token: string;
    version: string;
    scopes: Record<AccessScopes, boolean>
  } = {
    store: null,
    password: null,
    domain: null,
    token: null,
    version: null,
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

  const theme = assign({}, Theme, {
    pointer (choice: Choice, index: number) {
      const prefix = this.state.index === index ? c.Tree.stub.trimEnd() + WSP : c.Tree.trim + WSP;
      return prefix;
    }
  });

  const messages: string[] = [
    `Existing Setup${c.COL}  `,
    `Shopify Domain${c.COL}  `,
    `Store Password${c.COL}  `,
    `Admin API Token${c.COL} `
  ];

  if ($.env.file === null) {

    log.out(
      message
      .Line('Hello Hacker 👋', c.gray)
      .NL
      .Wrap(
        `This prompt will generate a ${c.cyan('.env')} file containing storefront credentials.`,
        `When asked for your ${c.bold('Store Password')} this refers to the password used on`,
        'Password Protected theme pages, not your admin password and is totally optional.',
        c.gray
      )
      .NL
      .toString()
    );

  }

  const { domain } = await prompt<{ domain: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'domain',
    message: messages[1],
    required: true,
    format (value) {
      return value + '.myshopify.com';
    },
    validate (value) {

      this.state.symbols.pointer = '  ';

      if (value === '.myshopify.com') return 'Enter myshopify.com domain name';

      return $.stores.length > 0 && $.stores.some(({ domain }) => domain === value)
        ? 'You cannot overwrite existing store credentials'
        : true;

    },
    theme
  });

  const { password } = await prompt<{ password: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'password',
    message: messages[2],
    required: false,
    theme,
    validate (value) {
      this.state.symbols.pointer = '  ';
      return true;
    }
  });

  const { token } = await prompt<{ token: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'token',
    required: true,
    message: messages[3],
    theme,
    validate (value) {
      this.state.symbols.pointer = '  ';
      return (!value || value.length < 10) ? 'Invalid Admin API Token' : true;
    }
  });

  const scopes = await access.get({
    baseURL: `https://${domain}.myshopify.com/admin`,
    headers: { 'X-Shopify-Access-Token': token.trim() }
  });

  if (isBoolean(scopes)) {

    return log.out(
      message
      .NL
      .Wrap(
        `Connection failed on ${c.cyan(`${domain}.myshopify.com`)}. Please check the API Access Token`,
        'is correct and you have set the right access scopes, then try again.',
        c.red
      )
      .NL
      .End($.log.group)
      .BR
      .toString()
    );

  }

  if (scopes.access_scopes.length > 0) {

    message.Newline();

    for (const { handle } of scopes.access_scopes) {
      if (handle in model.scopes) {
        model.scopes[handle] = true;
        message.Line(`${c.CHK} ${handle}`);
      }
    }
  }

  let count: number = 0;

  for (const scope in model.scopes) {
    if (model.scopes[scope] === false) {
      message.Line(`${c.BAD} ${scope}`, c.red);
      count = count + 1;
    }
  }

  if (count > 0) {
    return log.out(
      message
      .NL
      .Wrap(
        'Syncify requires read and write access to all the above resources.',
        'Provide access to all scopes listed in red (above) and try again.',
        c.red
      )
      .NL
      .End($.log.group)
      .BR
      .toString()
    );
  }

  model.store = domain;
  model.domain = `${domain}.myshopify.com`;
  model.token = `${domain}_api_token = '${token.trim()}'`;
  model.password = `${domain}_password = '${password.trim()}'`;

  $.env.file = join($.cwd, '.env');

  await writeFile($.env.file, glueLines(`# Credentials: ${model.domain}`, model.token, model.password));
  await getEnvFile();
  await setPackageSyncify();

  log.out(message.NL.toString());

  const { bootstrap } = await prompt<{ bootstrap: string }>(<any>{
    theme,
    name: 'bootstrap',
    type: 'confirm',
    message: 'Import Strap',
    initial: true,
    newline: NWL,
    format () {
      return /^[ty1]/i.test(this.input) ? 'Yes' : 'No';
    }
  });

  if (bootstrap) {

    return strap(true);

  }

  log.out(message.NL.End($.log.group).toString());

}
