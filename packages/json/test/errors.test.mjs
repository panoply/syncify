import test from 'ava';
import { jsonc } from 'language-literals';

import { JSONError, parse } from '../dist/index.mjs';

test('error - instanceof JSONError', t => {

  const json = jsonc`{
    "order": [
      "main",
      "fos",
      "bar"
    ],
    "sections": {
      "bar": {
        // hello
        /* bar */
        "boolean": true,
        "settings": {"a":123},,
        "type": "page"
      },
      "foos": {
        "settings": {},
        "type": "page2"
      },
      "main": {
        "settings": {},
        "type": "page"
      }
    }
  }`;

  try {

    parse(json);

  } catch (e) {

    if (e instanceof JSONError) {
      t.pass();
    } else {
      t.fail('Not an instance of JSONError');
    }

  }

});

test('error - line and columns', t => {

  const json = jsonc`{
    "order": [
      "main",
      "fos",
      "bar"
    ],
    "sections": {
      "bar": {
        // hello
        /* bar */
        "boolean": true,
        "settings": {"a":123},,
        "type": "page"
      },
      "foos": {
        "settings": {},
        "type": "page2"
      },
      "main": {
        "settings": {},
        "type": "page"
      }
    }
  }`;

  try {

    parse(json);

  } catch (e) {

    t.log(e);
    t.is(e.line, 12);
    t.is(e.column, 28);

  }

});
