import test from 'ava';
import { jsonc } from 'language-literals';

import { parse, stringify } from '../dist/index.mjs';

test('sort - json parse and stringify - basic with comments', t => {
  const input = jsonc`{
    // foo
    "a": {
      "b": [ 3, 1, 2 ], // bar
      "c": { "d": "z", "e": "a" },
      "f": { "g": 5, "h": 4 }
    },
    "i": "last"
  }`;

  const expected = jsonc`{
    // foo
    "a": {
      "b": [
        1,
        2,
        3
      ], // bar
      "c": {
        "d": "z",
        "e": "a"
      },
      "f": {
        "g": 5,
        "h": 4
      }
    },
    "i": "last"
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true }), expected);
});

test('sort - json with leading block comment', t => {
  const input = jsonc`/* Leading comment */
  {
    "a": [ 2, 1 ],
    "b": { "d": "z", "c": "a" }
  }`;

  const expected = jsonc`/* Leading comment */
  {
    "a": [
      1,
      2
    ],
    "b": {
      "c": "a",
      "d": "z"
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true }), expected);
});

test('sort - json with multi-line leading comment', t => {
  const input = jsonc`/*
  * Auto-generated file
  * Do not edit
  */
  {
    "x": { "z": 2, "y": 1 },
    "w": [ 3, 1, 2 ]
  }`;

  const expected = jsonc`/*
  * Auto-generated file
  * Do not edit
  */
  {
    "w": [
      1,
      2,
      3
    ],
    "x": {
      "y": 1,
      "z": 2
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true }), expected);
});

test('sort - json with exclude path', t => {
  const input = jsonc`{
    "a": {
      // Keep this unsorted
      "b": { "d": 2, "c": 1 },
      "e": [ 3, 1, 2 ]
    },
    "f": "end"
  }`;

  const expected = jsonc`{
    "a": {
      // Keep this unsorted
      "b": {
        "d": 2,
        "c": 1
      },
      "e": [
        1,
        2,
        3
      ]
    },
    "f": "end"
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true, exclude: [ 'a.b' ] }), expected);
});

test('sort - json with target path', t => {
  const input = jsonc`{
    "a": {
      "b": [ 3, 1, 2 ], // Sort this
      "c": { "d": "z", "e": "a" }
    },
    "f": { "h": 2, "g": 1 }
  }`;

  const expected = jsonc`{
    "a": {
      "b": [
        1,
        2,
        3
      ], // Sort this
      "c": {
        "d": "z",
        "e": "a"
      }
    },
    "f": {
      "h": 2,
      "g": 1
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: [ 'a.b' ] }), expected);
});

test('sort - json with nested comments', t => {
  const input = jsonc`{
    "a": {
      "b": [
        3, // First
        1, /* Middle */
        2  // Last
      ],
      "c": { "d": "z" /* Deep comment */, "e": "a" }
    }
  }`;

  const expected = jsonc`{
    "a": {
      "b": [
        1, /* Middle */
        2,  // Last
        3 // First
      ],
      "c": {
        "d": "z" /* Deep comment */,
        "e": "a"
      }
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true }), expected);
});

test('sort - json with no sorting', t => {
  const input = jsonc`{
    // No change expected
    "a": [ 3, 1, 2 ],
    "b": { "d": "z", "c": "a" }
  }`;

  const expected = jsonc`{
    // No change expected
    "a": [
      3,
      1,
      2
    ],
    "b": {
      "d": "z",
      "c": "a"
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: false, objects: false }), expected);
});

test('sort - json with mixed types in array', t => {
  const input = jsonc`{
    "arr": [ 3, "b", true, 1, "a" ] // Mixed types
  }`;

  const expected = jsonc`{
    "arr": [
      1,
      3,
      true,
      "a",
      "b"
    ] // Mixed types
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true }), expected);
});

test('sort - json with deep nesting and exclude', t => {
  const input = jsonc`{
    "root": {
      "nest1": {
        "deep": { "z": 2, "y": 1 } // Don’t sort
      },
      "nest2": [ 3, 1, 2 ]
    }
  }`;

  const expected = jsonc`{
    "root": {
      "nest1": {
        "deep": {
          "z": 2,
          "y": 1
        } // Don’t sort
      },
      "nest2": [
        1,
        2,
        3
      ]
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true, exclude: [ 'root.nest1.deep' ] }), expected);
});

test('sort - json with multiple targets', t => {
  const input = jsonc`{
    "a": { "b": [ 3, 1, 2 ] },
    "c": { "d": { "f": 2, "e": 1 } },
    "g": { "h": "z" }
  }`;

  const expected = jsonc`{
    "a": {
      "b": [
        1,
        2,
        3
      ]
    },
    "c": {
      "d": {
        "e": 1,
        "f": 2
      }
    },
    "g": {
      "h": "z"
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: [ 'a.b' ], objects: [ 'c.d' ] }), expected);
});

test('sort - json with inline and block comments', t => {
  const input = jsonc`{
    "a": 1, // Inline
    "b": { /* Block */ "c": 3, "d": 2 }
  }`;

  const expected = jsonc`{
    "a": 1, // Inline
    "b": { /* Block */
      "c": 3,
      "d": 2
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true }), expected);
});

test('sort - json with empty structures', t => {
  const input = jsonc`{
    "emptyArr": [], // Nothing to sort
    "emptyObj": {}
  }`;

  const expected = jsonc`{
    "emptyArr": [], // Nothing to sort
    "emptyObj": {}
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true, objects: true }), expected);
});

test('sort - json with target mismatch', t => {
  const input = jsonc`{
    "a": [ 3, 1, 2 ], // Should still sort
    "b": { "c": "z", "d": "a" }
  }`;

  const expected = jsonc`{
    "a": [
      1,
      2,
      3
    ], // Should still sort
    "b": {
      "c": "z",
      "d": "a"
    }
  }`;

  t.deepEqual(stringify(parse(input), { arrays: true }), expected);
});
