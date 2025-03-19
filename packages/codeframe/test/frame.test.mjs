import test from 'ava';

import { codeframe } from '../dist/index.mjs';
import * as sample_1 from './samples/shopify/sample-1.mjs';
import * as sample_2 from './samples/shopify/sample-2.mjs';
import * as sample_3 from './samples/shopify/sample-3.mjs';
import * as sample_4 from './samples/shopify/sample-4.mjs';
import * as sample_5 from './samples/shopify/sample-5.mjs';
import * as sample_6 from './samples/shopify/sample-6.mjs';
import * as sample_7 from './samples/shopify/sample-7.mjs';
import * as sample_8 from './samples/shopify/sample-8.mjs';

test(sample_1.test, t => {

  const frame = codeframe.shopify(sample_1.source, sample_1.message);

  t.log(frame);
  t.pass();

});

test(sample_2.test, t => {

  const frame = codeframe.shopify(sample_2.source, sample_2.message);

  t.log(frame);
  t.pass();

});

test(sample_3.test, t => {

  const frame = codeframe.shopify(sample_3.source, sample_3.message);

  t.log(frame);
  t.pass();

});

test.skip('Frame JS', t => {

  const frame = codeframe(`class Foo {
  constructor() {
    console.log("hello");
  }
}`, {
    highlight: true,
    start: {
      line: 2,
      column: 4
    }
  });

  t.log(frame);
  t.pass();

});

test(sample_4.test, t => {

  const frame = codeframe.shopify(sample_4.source, sample_4.message);

  t.log(frame);
  t.pass();

});

test(sample_5.test, t => {

  const frame = codeframe.shopify(sample_5.source, sample_5.message);

  t.log(frame);
  t.pass();

});

test(sample_6.test, t => {

  const frame = codeframe.shopify(sample_6.source, sample_6.message);

  t.log(frame);
  t.pass();

});

test(sample_7.test, t => {

  const frame = codeframe.shopify(sample_7.source, sample_7.message);

  t.log(frame);
  t.pass();

});

test(sample_8.test, t => {

  const frame = codeframe(sample_8.source);

  t.log(frame);
  t.pass();

});
