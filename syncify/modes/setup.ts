import type { AccessScopes } from 'types';
import type { Choice, StringPromptOptions } from 'types/internal';
import { BAD, CHK, COL, Tree } from 'syncify:symbol';
import { Create } from 'syncify:ansi';
import { assign } from 'syncify:native';
import { theme as Theme } from 'syncify:cli/prompts';
import { prompt } from 'enquirer';
import * as c from 'syncify:colors';
import * as log from 'syncify:log';
import * as access from 'syncify:requests/access';
import { isBoolean } from 'syncify:utils';
import { $ } from 'syncify:state';

export async function setup () {

  const message = Create({ type: 'info' });

  const model: {
    store: string;
    domain: string;
    token: string;
    ngrok: string;
    version: string;
    scopes: Record<AccessScopes, boolean>
  } = {
    store: null,
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
    `Admin API Token${COL} `,
    `Ngrok API Token${COL} `
  ];

  if ($.env.file !== null) {

    return log.out(
      message
      .Line('Environment references exist, setup can only be used for new installations.')
      .NL
      .End($.log.group)
      .BR
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
      return (
        value === '.myshopify.com' || value.length === 0
      ) ? 'Enter myshopify.com domain name' : true;
    },
    theme
  });

  const { token } = await prompt<{ token: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'token',
    required: true,
    message: messages[2],
    theme,
    validate (value) {
      this.state.symbols.pointer = '  ';
      return (!value || value.length < 10) ? 'Invalid Admin API Token' : true;
    }
  });

  const { ngrok } = await prompt<{ ngrok: string }>(<StringPromptOptions> {
    type: 'input',
    name: 'ngrok',
    required: true,
    message: messages[3],
    theme,
    validate (value) {
      this.state.symbols.pointer = '  ';
      return (!value || value.length < 10) ? 'Invalid Ngrok API Token' : true;
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

  log.out(message.toLine());

  model.store = domain;
  model.domain = `${domain}.myshopify.com`;
  model.token = token.trim();
  model.ngrok = ngrok.trim();

}
