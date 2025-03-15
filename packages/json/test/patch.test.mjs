import test from 'ava';
import { jsonc } from 'language-literals';

import { parse, stringify } from '../dist/index.mjs';

test('patch - fixes newline after block comment (example 1)', t => {

  const input = jsonc`
    /*
     * ------------------------------------------------------------
     * IMPORTANT: The contents of this file are auto-generated.
     *
     * This file may be updated by the Shopify admin theme editor
     * or related systems. Please exercise caution as any changes
     * made to this file may be overwritten.
     * ------------------------------------------------------------
     */{}
  `;

  const expected = jsonc`
    /*
     * ------------------------------------------------------------
     * IMPORTANT: The contents of this file are auto-generated.
     *
     * This file may be updated by the Shopify admin theme editor
     * or related systems. Please exercise caution as any changes
     * made to this file may be overwritten.
     * ------------------------------------------------------------
     */
    {}
    `;

  t.deepEqual(stringify(parse(input)), expected);

});

test('patch - fixes newline after block comment (example 2)', t => {

  const input = jsonc`
    /*
     * ------------------------------------------------------------
     * IMPORTANT: The contents of this file are auto-generated.
     *
     * This file may be updated by the Shopify admin theme editor
     * or related systems. Please exercise caution as any changes
     * made to this file may be overwritten.
     * ------------------------------------------------------------
     */{
      "order": [ "collapsible_content_DjDJkR", "main", "foos", "bar"],
    }
  `;

  const expected = jsonc`
    /*
     * ------------------------------------------------------------
     * IMPORTANT: The contents of this file are auto-generated.
     *
     * This file may be updated by the Shopify admin theme editor
     * or related systems. Please exercise caution as any changes
     * made to this file may be overwritten.
     * ------------------------------------------------------------
     */
    {
      "order": [
        "collapsible_content_DjDJkR",
        "main",
        "foos",
        "bar"
      ]
    }
    `;

  t.deepEqual(stringify(parse(input)), expected);

});
