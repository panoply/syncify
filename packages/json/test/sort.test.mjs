import test from 'ava';
import { jsonc } from 'language-literals';

import { parse, sort, stringify } from '../dist/index.mjs';

// Helper to normalize JSONC strings for comparison
const normalizeJsonc = (str) => str.replace(/\s+/g, ' ').trim();

test('sort - primitives remain unchanged', t => {
  t.deepEqual(sort(42), 42);
  t.deepEqual(sort('string'), 'string');
  t.deepEqual(sort(true), true);
  t.deepEqual(sort(undefined), undefined);
  t.deepEqual(sort(null), null);
});

test('sort - no options means no sorting', t => {
  const input = { arr: [ 3, 1, 2 ], obj: { b: 2, a: 1 } };
  t.deepEqual(sort(input), input);
});

test('sort - sort all arrays', t => {
  const input = { arr: [ 3, 1, 2 ], nested: { arr2: [ 2, 1 ] } };
  const expected = { arr: [ 1, 2, 3 ], nested: { arr2: [ 1, 2 ] } };
  t.deepEqual(sort(input, { arrays: true }), expected);
});

test('sort - sort specific arrays', t => {
  const input = { arr: [ 3, 1, 2 ], nested: { arr2: [ 2, 1 ] } };
  const expected = { arr: [ 3, 1, 2 ], nested: { arr2: [ 1, 2 ] } };
  t.deepEqual(sort(input, { arrays: [ 'nested.arr2' ] }), expected);
});

test('sort - sort all objects', t => {
  const input = { f: { b: 2, a: 1 }, a: { d: 2, c: 1 } };
  const expected = { f: { a: 1, b: 2 }, a: { c: 1, d: 2 } };
  t.deepEqual(sort(input, { objects: true }), expected);
});

test('sort - sort specific objects', t => {
  const input = { f: { b: 2, a: 1 }, a: { b: { z: 2, a: 1 } } };
  const expected = { f: { b: 2, a: 1 }, a: { b: { a: 1, z: 2 } } };
  t.deepEqual(sort(input, { objects: [ 'a.b' ] }), expected);
});

test('sort - sort all arrays and objects', t => {
  const input = { arr: [ 3, 1, 2 ], obj: { b: 2, a: 1 }, nested: { arr2: [ 2, 1 ], obj2: { d: 2, c: 1 } } };
  const expected = { arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 }, nested: { arr2: [ 1, 2 ], obj2: { c: 1, d: 2 } } };
  t.deepEqual(sort(input, { arrays: true, objects: true }), expected);
});

test('sort - exclude specific path', t => {
  const input = { arr: [ 3, 1, 2 ], obj: { b: 2, a: 1 } };
  const expected = { arr: [ 1, 2, 3 ], obj: { b: 2, a: 1 } };
  t.deepEqual(sort(input, { arrays: true, objects: true, exclude: [ 'obj' ] }), expected);
});

test('sort - exclude nested path', t => {
  const input = { a: { b: [ 3, 1, 2 ], c: { d: 2, e: 1 } }, f: { g: 2, h: 1 } };
  const expected = { a: { b: [ 1, 2, 3 ], c: { d: 2, e: 1 } }, f: { g: 2, h: 1 } };
  t.deepEqual(sort(input, { arrays: true, objects: true, exclude: [ 'a.c', 'f' ] }), expected);
});

test('sort - mixed arrays and objects with specific paths', t => {
  const input = {
    arr: [ 3, 1, 2 ],
    obj: { b: 2, a: 1 },
    nested: { arr2: [ 2, 1 ], obj2: { d: 2, c: 1 } }
  };
  const expected = {
    arr: [ 3, 1, 2 ],
    obj: { b: 2, a: 1 },
    nested: { arr2: [ 1, 2 ], obj2: { c: 1, d: 2 } }
  };
  t.deepEqual(sort(input, { arrays: [ 'nested.arr2' ], objects: [ 'nested.obj2' ] }), expected);
});

test('sort - nested arrays with comments', t => {
  const input = jsonc`{
    "a": [
      3, // First
      [ 2, 1 ], /* Middle */
      2  // Last
    ]
  }`;
  const expected = jsonc`{
    "a": [
      2,  // First
      [ 1, 2 ], /* Middle */
      3 // Last
    ]
  }`;
  t.deepEqual(normalizeJsonc(stringify(parse(input), { arrays: true })), normalizeJsonc(expected));
});

test('sort - deep nested structure with specific object sorting', t => {
  const input = {
    a: {
      b: { z: 'c', a: 'b', c: 'a' },
      c: { d: 2, e: 1 }
    },
    f: { g: 2, h: 1 }
  };
  const expected = {
    a: {
      b: { a: 'b', c: 'a', z: 'c' },
      c: { d: 2, e: 1 }
    },
    f: { g: 2, h: 1 }
  };
  t.deepEqual(sort(input, { objects: [ 'a.b' ] }), expected);
});

test('sort - array of objects with mixed sorting', t => {
  const input = {
    arr: [ { b: 2, a: 1 }, { d: 4, c: 3 } ],
    obj: { z: 2, y: 1 }
  };
  const expected = {
    arr: [ { a: 1, b: 2 }, { c: 3, d: 4 } ],
    obj: { z: 2, y: 1 }
  };
  t.deepEqual(sort(input, { arrays: true, objects: [ 'arr' ] }), expected);
});

test('sort - exclude overrides specific paths', t => {
  const input = {
    a: { b: [ 3, 1, 2 ], c: { d: 2, e: 1 } },
    f: { g: 2, h: 1 }
  };
  const expected = {
    a: { b: [ 3, 1, 2 ], c: { d: 2, e: 1 } },
    f: { g: 2, h: 1 }
  };
  t.deepEqual(sort(input, { arrays: [ 'a.b' ], objects: [ 'a.c' ], exclude: [ 'a.b', 'a.c' ] }), expected);
});

test('sort - sort all with deep exclusion', t => {
  const input = {
    a: {
      b: { c: [ 3, 1, 2 ], d: { z: 2, y: 1 } },
      e: { f: 2, g: 1 }
    }
  };
  const expected = {
    a: {
      b: { c: [ 3, 1, 2 ], d: { z: 2, y: 1 } }, // Excluded
      e: { f: 2, g: 1 } // Not sorted (objects: false)
    }
  };
  t.deepEqual(sort(input, { arrays: true, exclude: [ 'a.b' ] }), expected);
});

test('sort - empty structures', t => {
  const input = jsonc`{
    "emptyArr": [], // Nothing here
    "emptyObj": {}
  }`;
  const expected = jsonc`{
    "emptyArr": [], // Nothing here
    "emptyObj": {}
  }`;
  t.deepEqual(normalizeJsonc(stringify(parse(input), { arrays: true, objects: true })), normalizeJsonc(expected));
});

test('sort - mixed types in array', t => {
  const input = jsonc`{
    "arr": [ 3, "b", true, 1, "a" ] // Mixed types sorted
  }`;
  const expected = jsonc`{
    "arr": [ 1, 3, true, "a", "b" ] // Mixed types sorted
  }`;
  const parsedInput = parse(input);
  const sorted = sort(parsedInput, { arrays: true });
  t.deepEqual(normalizeJsonc(stringify(sorted)), normalizeJsonc(expected));
});

test('sort - complex structure with comments', t => {
  const input = jsonc`{
    // Top-level comment
    "a": {
      "b": [ 3, 1, 2 ], // Array comment
      "c": { "d": "z" /* Nested comment */, "e": "a" }
    },
    "f": { "g": 2, "h": 1 }
  }`;
  const expected = jsonc`{
    // Top-level comment
    "a": {
      "b": [ 1, 2, 3 ], // Array comment
      "c": { "d": "z" /* Nested comment */, "e": "a" }
    },
    "f": { "g": 2, "h": 1 }
  }`;
  t.deepEqual(normalizeJsonc(stringify(parse(input), { arrays: [ 'a.b' ] })), normalizeJsonc(expected));
});

test('sort - specific path with non-existent target', t => {
  const input = { a: [ 3, 1, 2 ], b: { c: 2, d: 1 } };
  const expected = { a: [ 1, 2, 3 ], b: { c: 2, d: 1 } };
  t.deepEqual(sort(input, { arrays: [ 'x.y' ], objects: [ 'b' ] }), { a: [ 3, 1, 2 ], b: { c: 2, d: 1 } }); // Non-existent path ignored
  t.deepEqual(sort(input, { arrays: true, exclude: [ 'x.y' ] }), expected); // Sort all except non-existent
});
