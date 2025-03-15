/**
 * Detects the indentation of a JSON (or other) structure.
 * Determines indent by the frequency occurrence and returns a basic model.
 *
 * @param string
 * JSON string structure
 *
 * @example
 *
 * const detect = getIndent(`
 * {
 *   "foo": 1,
 *   "bar": 2,
 *   "baz": 3,
 * }
 * `)
 *
 * detect.type        // => 'space'
 * detect.indent      // => '  '
 * detect.indentSize  // => 2
 * detect.indentChar  // => ' '
 */
export function getIndent (string: string) {

  if (typeof string !== 'string') throw new TypeError('Expected a string');

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

    const indent = match[0].length;
    const type = match[1] ? 's' : 't';

    if (type !== prevType) prevSize = 0;

    const diff = indent - prevSize;

    prevSize = indent;
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

  const result = {
    type: undefined,
    indentSize: 0,
    indentChar: '',
    indent: ''
  };

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
