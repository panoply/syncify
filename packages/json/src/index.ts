import type { EvaluateOptions, FormatOptions, StringifyOptions } from './index.d';

import { createHash } from 'node:crypto';

import CJSON from 'comment-json';

import { getMessage, getPosition, JSONError } from './errors';
import { sort } from './sort';

export { JSONError, sort };

// Used to fix: https://github.com/kaelzhang/node-comment-json/issues/28
const PATCH_NWL = /^(\/\*[\s\S]*?\*\/)\s*([{[])/;

const toJsonString = (input: string, crlf: boolean) => {
  let result = input;
  if (PATCH_NWL.test(result)) result = result.replace(PATCH_NWL, '$1\n$2');
  return crlf ? result.replace(/\n/g, '\r\n') : result;
};

const checksum = (input: string) => createHash('md5').update(input).digest('hex');

type EvaluateParams = [
  source: string,
  compare: string,
  options?: EvaluateOptions
] | [
  source: string,
  options?: EvaluateOptions
];

const jsonOptions = <T>(opts: any = {}): T => Object.assign({
  useTab: false,
  crlf: false,
  indentSize: 2,
  removeComments: false,
  replacer: null,
  arrays: false,
  objects: false,
  exclude: []
}, opts);

export const evaluate = (...params: EvaluateParams) => {

  let actual = params.shift() as string;
  const options = params.pop() as EvaluateOptions;
  let expected = params.length > 0 ? params[0] : false;
  const jsonOpts: EvaluateOptions = jsonOptions<EvaluateOptions>(options);

  let aParse: unknown;
  let bParse: unknown;

  try {

    if (typeof actual === 'string') {
      if (actual.trim() === '') actual = '{}' as string;
    } else {
      actual = '{}' as string;
    }

    aParse = CJSON.parse(actual, null, jsonOpts.removeComments);

  } catch (error) {

    const message = getMessage(error);
    const position = getPosition(actual, error);

    throw new JSONError(`${message} on line number ${position.line}`, {
      line: position.line,
      column: position.column,
      source: actual,
      details: expected !== false ? 'Index 0 (actual) of arguments' : null
    });
  }

  if (expected !== false) {

    try {

      if (typeof expected === 'string') {
        if (expected.trim() === '') expected = '{}' as string;
      } else {
        expected = '{}' as string;
      }

      bParse = CJSON.parse(expected, null, jsonOpts.removeComments);

    } catch (error) {

      const message = getMessage(error);
      const position = getPosition(expected, error);

      throw new JSONError(`${message} on line number ${position.line}`, {
        line: position.line,
        column: position.column,
        source: expected,
        details: 'Index 1 (expect) of arguments'
      });
    }
  }

  const indent = jsonOpts.useTab ? '\t'.repeat(Math.floor(jsonOpts.indentSize / 2)) : jsonOpts.indentSize;
  const aSort = sort(aParse, jsonOpts); // Use flat options
  const aString = toJsonString(CJSON.stringify(aSort, null, indent), jsonOpts.crlf);
  const aHash = checksum(aString);

  if (expected !== false) {

    const bSort = sort(bParse, jsonOpts); // Use flat options
    const bString = toJsonString(CJSON.stringify(bSort, null, indent), jsonOpts.crlf);
    const bHash = checksum(bString);

    return {
      get source () { return expected; },
      get parsed () { return bParse; },
      get string () { return bString; },
      get hashed () { return bHash; },
      get change () { return aHash !== bHash; },
      get actual () {
        return {
          get parsed () { return aParse; },
          get source () { return actual; },
          get string () { return aString; },
          get hashed () { return aHash; }
        };
      }
    };
  }

  return {
    get parsed () { return aParse; },
    get source () { return actual; },
    get string () { return aString; },
    get hashed () { return aHash; }
  };
};

export const format = (json: string, options: FormatOptions = {}) => {
  const o = jsonOptions<FormatOptions>(options);

  try {
    const indent = o.useTab ? '\t'.repeat(Math.floor(o.indentSize / 2)) : o.indentSize;
    const parseResult = CJSON.parse(json, null, o.removeComments);
    const sorted = sort(parseResult, o); // Use flat options
    const string = CJSON.stringify(sorted, null, indent);
    return toJsonString(string, o.crlf);
  } catch (error) {
    const message = getMessage(error);
    const position = getPosition(json, error);
    throw new JSONError(`${message} on line number ${position.line}`, {
      line: position.line,
      column: position.column,
      source: json
    });
  }
};

export const stringify = (value: unknown, options: StringifyOptions = {}) => {
  const o = jsonOptions<StringifyOptions>(options);
  const indent = o.useTab ? '\t'.repeat(Math.floor(o.indentSize / 2)) : o.indentSize;
  const sorted = sort(value, o); // Use flat options
  const string = CJSON.stringify(sorted, o.replacer, indent);
  return toJsonString(string, o.crlf);
};

export const parse = (json: string, reviver = null, removeComments?: boolean) => {
  if (reviver !== null && typeof reviver === 'boolean') {
    removeComments = reviver;
  } else {
    if (removeComments === undefined) removeComments = false;
  }

  try {
    return CJSON.parse(json, reviver, removeComments);
  } catch (error) {
    const message = getMessage(error);
    const position = getPosition(json, error);
    throw new JSONError(`${message} on line number ${position.line}`, {
      line: position.line,
      column: position.column,
      source: json
    });
  }
};

// getIndent function remains unchanged
export function getIndent (string: string) {
  const regex = /^(?:( )+|\t+)/m;
  const indents = new Map();
  const lines = string.split(/\r?\n/g);
  const size = lines.length;

  let prevSize = 0;
  let prevType = '';
  let key: string;
  let i = -1;

  while (++i < size) {
    if (!lines[i]) continue;

    const match = lines[i].match(regex);

    if (match === null) {
      prevSize = 0;
      prevType = '';
      continue;
    }

    const ind = match[0].length;
    const type = match[1] ? 's' : 't';

    if (type !== prevType) prevSize = 0;

    const diff = ind - prevSize;

    prevSize = ind;
    prevType = type;

    if (diff !== 0) {
      key = type + Math.abs(diff);
      indents.set(key, (indents.get(key) || [ 0, 0 ]));
    }

    indents.get(key)[0]++;

    if (diff === 0) {
      indents.get(key)[1]++;
    }
  }

  let usage = [ '', [ 0, 0 ] ];

  for (const [ k, v ] of indents) {
    if (v[0] > usage[1][0] || (v[0] === usage[1][0] && v[1] > usage[1][1])) {
      usage = [ k, v ];
    }
  }

  const result = Object.create(null);

  result.type = undefined;
  result.indentSize = 0;
  result.indentChar = '';
  result.indent = '';

  if (usage[0]) {
    if (usage[0][0] === 't') {
      result.type = 'tab';
      result.indentChar = '\t';
    } else {
      result.type = 'space';
      result.indentChar = ' ';
    }
    result.indentSize = +usage[0].slice(1);
    result.indent = result.indentChar.repeat(result.indentSize);
  }

  return result;
}
