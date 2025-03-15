/**
 * Escape Characters
 *
 * Ensures the regex expressions are correctly parsed.
 */
export const esc = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Obtain the index location based on the line number contained in error messages.
 * This function will return both the starting point index of the line number and
 * the proceeding (next line) index.
 *
 * Based on this we can perform further analysis to determine the column and range
 * of the syntax error that has occurred. If obtaining this information fails, `-1`
 * is returned in the closure object value.
 */

export function getLineInfo (text: string, lineNumber: number) {
  if (!text || lineNumber < 1) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }

  const totalLines = (text.match(/\n/g) || []).length + 1;
  if (lineNumber > totalLines) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }

  let lineStart = 0;
  let currentLine = 1;
  let pos = 0;

  while (currentLine < lineNumber && pos < text.length) {
    pos = text.indexOf('\n', pos);
    if (pos === -1) break;
    lineStart = pos + 1;
    pos++;
    currentLine++;
  }

  if (currentLine < lineNumber) {
    return {
      lineNumber: -1,
      lineStart: -1,
      nextLineNumber: -1,
      nextLineStart: -1
    };
  }

  let nextLineNumber = lineNumber;
  let nextLineStart = text.indexOf('\n', lineStart);

  if (nextLineStart === -1) {
    nextLineStart = text.length;
  } else {
    nextLineStart++;
  }

  if (lineNumber < totalLines) nextLineNumber++;

  return {
    lineNumber,
    lineStart,
    nextLineNumber,
    nextLineStart
  };
}

/**
 * Determines the range of a regex-matched token (e.g., a Liquid tag) starting at a given line number
 * within a text string. This function extends basic line information by adjusting the next line
 * number and position to encompass the full span of the matched token, which may cross multiple lines.
 *
 * If the token regex matches at the start of the specified line, it returns the token and updated
 * line boundaries. Otherwise, it falls back to basic single-line information. If the line number is
 * invalid, it returns `null` or an object with `-1` values for all properties.
 */
export function getTokenInfo (source: string, lineNumber: number, tokenRegex: RegExp) {
  let lines = getLineInfo(source, lineNumber);
  if (lines.lineStart < 0 && lines.nextLineStart < 0) return null;

  let input = source.slice(lines.lineStart);
  let match = input.match(tokenRegex);
  let startPos = lines.lineStart;

  if (!match) {
    let currentLine = lineNumber;
    while (currentLine > 1 && !match) {
      currentLine--;
      lines = getLineInfo(source, currentLine);
      input = source.slice(lines.lineStart);
      match = input.match(tokenRegex);
      if (match && match.index >= 0) {
        startPos = lines.lineStart;
        break;
      }
    }
    if (!match) return lines;
  }

  const token = match[0];
  const tokenStartInInput = match.index;
  const tokenStart = startPos + tokenStartInInput;
  const tokenEnd = tokenStart + token.length;
  const tokenNewlines = (token.match(/\n/g) || []).length;

  if (tokenNewlines === 0) {
    return {
      lineNumber,
      lineStart: tokenStart,
      nextLineNumber: lineNumber,
      nextLineStart: tokenEnd,
      token
    };
  }

  const startNewlinesBefore = (source.slice(0, tokenStart).match(/\n/g) || []).length;
  const adjustedLineNumber = startNewlinesBefore + 1;
  const nextLineNumber = adjustedLineNumber + tokenNewlines;
  const nextLineStart = tokenEnd;

  return {
    lineNumber: adjustedLineNumber,
    lineStart: tokenStart,
    nextLineNumber,
    nextLineStart,
    token
  };
}

/**
 * Retrieves the range of a token within a source string based on a starting line number.
 * The token can be specified as a literal string or a regular expression, such as a Liquid
 * tag (e.g., `{% for ... %}`). This function returns an object containing the matched
 * token and its positional range (start and end line/column coordinates).
 *
 * For string queries, it searches within a single line’s range. For regex queries, it
 * can span multiple lines (e.g., multi-line Liquid tokens), adjusting the end line and
 * position accordingly. If no match is found or the line number is invalid, it returns
 * either a fallback range for the line or `null`, respectively.
 */
export function getTokenRange (query: string | RegExp, source: string, lineNumber: number) {
  const lines: {
    lineNumber: number;
    lineStart: number;
    nextLineNumber: number;
    nextLineStart: number;
    token?: string;
  } = query instanceof RegExp
    ? getTokenInfo(source, lineNumber, query)
    : getLineInfo(source, lineNumber);

  if (!lines || (lines.lineStart < 0 && lines.nextLineStart < 0)) return null;

  const token = typeof query === 'string' ? query : lines.token;
  if (!token) {
    const input = source.slice(lines.lineStart, lines.nextLineStart);
    return {
      token: input,
      range: {
        start: { line: lines.lineNumber, column: 1 },
        ender: { line: lines.nextLineNumber, column: input.length || 1 }
      }
    };
  }

  const lineStartPos = getLineInfo(source, lines.lineNumber).lineStart;
  const column = lines.lineStart >= lineStartPos
    ? (lines.lineStart - lineStartPos) + 1
    : (lines.lineStart - getLineInfo(source, lines.lineNumber - 1).lineStart) + 1;

  if (column <= 0) {
    const input = source.slice(lines.lineStart, lines.nextLineStart);
    return {
      token: input,
      range: {
        start: { line: lines.lineNumber, column: 1 },
        ender: { line: lines.nextLineNumber, column: input.length || 1 }
      }
    };
  }

  const enderLine = token.includes('\n') ? lines.nextLineNumber : lines.lineNumber;

  let enderColumn: number;

  if (token.includes('\n')) {
    const lastNewlineIndex = token.lastIndexOf('\n');
    enderColumn = token.slice(lastNewlineIndex + 1).length;
  } else {
    enderColumn = column + token.length;
  }

  const range = {
    start: { line: lines.lineNumber, column },
    ender: { line: enderLine, column: enderColumn }
  };

  return { token, range };
}

/**
 * This function handles multiple possible error messages that may be returned. Leveraging
 * pre-existing context about expected patterns, it uses regular expressions to extract
 * key references from the error messages.
 *
 * Several checks are performed to determine where to search within the file source,
 * guided solely by the error message. While the approach may not always be perfectly
 * accurate, it strives to narrow down the location predictably and effectively.
 *
 * Below is the current list of known error messages that could trigger this logic:
 *
 * - `Syntax Error in 'assign' - Valid syntax: assign [var] = [source]`
 * - `Syntax Error in 'capture' - Valid syntax: capture [var]`
 * - `Syntax Error in 'case' - Valid syntax: case [condition]`
 * - `Syntax Error in 'for loop' - Valid syntax: for [item] in [collection]`
 * - `Syntax Error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]`
 * - `Syntax Error in 'table_row loop' - Valid syntax: table_row [item] in [collection] cols=3`
 * - `Syntax Error in tag '#' - Each line of comments must be prefixed by the '#' character`
 * - `Syntax Error in tag 'if' - Valid syntax: if [expression]`
 * - `Syntax Error in tag 'render' - Template name must be a quoted string`
 * - `Syntax Error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %}`
 * - `Syntax Error in tag 'case' - Valid else condition: {% else %} (no parameters)`
 * - `Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]`
 * - `[:pipe, "|"] is not a valid expression in "{{|test}}"`
 * - `For loops require an 'in' clause`
 * - `Invalid attribute in for loop. Valid attributes are limit and offset`
 * - `'%{block_name}' tag was never closed`
 * - `'%{block_name}' tag does not expect 'else' tag`
 * - `'%{tag}' is not a valid delimiter for %{block_name} tags. use %{block_delimiter}`
 * - `Unexpected outer '%{tag}' tag`
 * - `Unexpected character = in "`
 * - `Unknown tag '%{tag}'`
 * - `Tag '%{token}' was not properly terminated with regexp: %{tag_end}`
 * - `Expected [:end_of_string] but found %{something} in "%{token}"`
 *
 * **NOT YET SUPPORTED**
 *
 * - `Variable '%{token}' was not properly terminated with regexp: %{tag_end}`
 * - `invalid_expression = '[:end_of_string] is not a valid expression in "%{token}`
 * - `Invalid expression type '#{invalid_expr}' in range expression`
 */
export function getErrorLocation (source: string, errMsg: string, line: number) {

  /* -------------------------------------------- */
  /* TAG SPECIFIC                                 */
  /* -------------------------------------------- */

  for (const test of [
    /^Syntax Error in '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^Syntax Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^Syntax Error in tag '(#)'/i,
    /^in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^'([a-z_]+)' is not a valid delimiter for (?:[a-z_]+) tags\. use/i,
    /^Error in tag '([a-z_]+)(?:\s[a-z]+)?'/i,
    /^'?([a-z_]+)'? tag was never closed/i,
    /^(For) loops require an 'in' clause/i,
    /^Invalid attribute in (for) loop. Valid attributes are limit and offset/i,
    /^'?[a-z]+'? is not a valid delimiter for '?([a-z_]+)'? tags/i,
    /^Unexpected outer '{%-?\s*([a-z_]+)/i,
    /^Unknown tag '([a-z_]+)/i,
    /^Tag '{%-?\s*([a-z_]+)/i
  ]) {

    const detect = errMsg.trimStart().match(test);

    if (detect === null) continue;

    const name = detect[1];
    const tag = name.toLowerCase().replace(/_/g, '');
    const exp = new RegExp(`{%-?\\s*${tag}[\\s\\S]*?%}`);

    return getTokenRange(exp, source, line);

  }

  /* -------------------------------------------- */
  /* ESCAPE REQUIRED                              */
  /* -------------------------------------------- */

  for (const test of [
    /^Variable '(.*?)' was not properly terminated with regexp/i,
    /^\[:[a-z_]+, ".+"\] is not a valid expression in "({{.*?}})/i,
    /^Expected (?:[a-z_]+) but found (?:.*?) in "(.*?)"/i,
    /^Tag '({{.*?}})/i
  ]) {

    const detect = errMsg.trimStart().match(test);

    if (detect === null) continue;

    const exp = new RegExp(esc(detect[1]));
    return getTokenRange(exp, source, line);

  }

  /* -------------------------------------------- */
  /* WILDCARD                                     */
  /* -------------------------------------------- */

  for (const test of [
    /^Unexpected character (?:.+?) in "([\S\s]+)/i
  ]) {

    const detect = errMsg.trimStart().match(test);

    if (detect === null) continue;

    if (/\n/.test(detect[2])) {
      const exp = esc(detect[2].slice(0, detect.indexOf('\n')));
      return getTokenRange(exp, source, line);
    } else {
      return getTokenRange(detect[2], source, line);
    }

  }

  /* -------------------------------------------- */
  /* FALLBACK                                     */
  /* -------------------------------------------- */

  const detect = errMsg.trimStart().match(/({{[\s\S]*?}}|{%[\s\S]*?%})/);

  if (detect !== null) {

    return getTokenRange(detect[1], source, line);

  }

  return null;

}
