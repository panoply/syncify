import type { AccessScopes } from 'types';
import type { Choice, StringPromptOptions } from 'types/internal';
import { writeFile } from 'fs-extra';
import { join } from 'node:path';
import { BAD, CHK, COL, Tree } from '@syncify/ansi';
import { Create } from 'syncify:cli/tree';
import { assign } from 'syncify:native';
import { theme as Theme } from 'syncify:cli/prompts';
import { prompt } from 'enquirer';
import * as c from '@syncify/ansi';
import * as log from 'syncify:log';
import * as access from 'syncify:requests/access';
import { glueLines, isBoolean } from 'syncify:utils';
import { $ } from 'syncify:state';
import { getEnvFile, setPackageSyncify } from 'syncify:options/files';

export async function setup () {

  const message = Create({ type: 'info' });

  const model: {
    store: string;
    password: string;
    domain: string;
    token: string;
    ngrok: string;
    version: string;
    scopes: Record<AccessScopes, boolean>
  } = {
    store: null,
    password: null,
    domain: null,
    token: null,
    ngrok: null,
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
      const prefix = this.state.index === index ? Tree.stub.trimEnd() + WSP : Tree.trim + WSP;
      return prefix;
    }
  });

  const messages: string[] = [
    `Existing Setup${COL}  `,
    `Shopify Domain${COL}  `,
    `Store Password${COL}  `,
    `Admin API Token${COL} `,
    `Ngrok API Token${COL} `
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

      if ($.stores.length > 0 && $.stores.some(({ domain }) => domain === value)) {
        return 'You cannot overwrite existing store credentials';
      }

      return true;

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

  const { ngrok } = await prompt<{ ngrok: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'ngrok',
    required: false,
    message: messages[4],
    theme,
    validate (value) {
      this.state.symbols.pointer = '  ';
      return (value.length > 2 && value.length < 10) ? 'Invalid Ngrok API Token' : true;
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
        message.Line(`${CHK} ${handle}`);
      }
    }
  }

  let count: number = 0;

  for (const scope in model.scopes) {
    if (model.scopes[scope] === false) {
      message.Line(`${BAD} ${scope}`, c.red);
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

  model.password = password.trim() === ''
    ? `# ${domain}_password = ''`
    : `${domain}_password = '${password.trim()}'`;

  model.ngrok = ngrok.trim() === ''
    ? '# ngrok_auth_token = \'\''
    : `ngrok_auth_token = '${ngrok.trim()}'`;

  $.env.file = join($.cwd, '.env');

  const env = glueLines(
    '# Ngrok Authorization',
    model.ngrok,
    '',
    `# Credentials: ${model.domain}`,
    model.token,
    model.password
  );

  await writeFile($.env.file, env);
  await getEnvFile();
  await setPackageSyncify();

  log.out(
    message
    .NL
    .Line(`${CHK} Generated ${c.cyan('.env')} credentials`, c.bold.white)
    .Line(`${CHK} Defined ${c.cyan('package.json')} stores`, c.bold.white)
    .End($.log.group)
    .toString()
  );

}
