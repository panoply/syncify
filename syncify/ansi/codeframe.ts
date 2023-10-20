import { Wrap } from 'syncify:ansi';
import * as c from 'syncify:colors';
import { $ } from 'syncify:state';
import { BAD, Tree } from 'syncify:symbol';
import { glue, isString, sanitize } from 'syncify:utils';

/**
 * Shopify Error Highlights
 *
 * Parses and applies some normalization to response
 * messages by applying colours.
 */
function highlight (string: string) {

  return c.redBright(string
  .replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, c.orange('$1'))
  .replace(/({{2}-?[a-zA-Z0-9_\-.'"[\]]+-?}{2})/g, c.teal('$1'))
  .replace(/((?:www|http:|https:)+[^\s]+[\w])/g, c.underline('$1'))
  .replace(/(\/)(.*?)(\/)/g, c.teal('$1') + c.neonCyan('$2') + c.teal('$3'))
  .replace(/(\\)(\W)/g, c.gray('$1') + c.neonCyan('$2'))
  .replace(/(:)(?= )/g, c.gray('$1'))
  .replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, c.neonCyan.bold('$1')));

}

/**
 * Token Highlights
 *
 * Used for code sample, applies minor highights to specific characters.
 */
function tokens (string: string) {

  return string
  .replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>|:|,)/g, c.neonCyan('$1'))
  .replace(/(['"].*?['"])/g, c.gray('$1'));

}

function extract (text: string) {

  let lines: string = NIL;

  const valid = text.indexOf('- Valid syntax:');

  if (valid > -1) {

    lines = NWL + text
    .slice(valid)
    .slice(1)
    .replace(/(Valid syntax)(:)(.*)/, c.redBright('$1') + c.gray('$2') + c.teal('$3'));

    return text.slice(0, valid) + lines;

  }

  return text;

}

/**
 * TUI Shopify
 *
 * Parse Shopify 422 error responses from failed requests.
 * Applies some sanity and normalization to the output.
 *
 *
 * **Example**
 *
 * ```
 * │
 * │
 * │   10 │ <div class="fooo">
 * │   11 │   <ul>
 * │ > 12 │     {% unknown 'tag' %}
 * │               ^^^^^^^
 * │
 * │  Lorem ipsum lorem ipsum ipsum lorem ipsum
 * │  Lorem ipsum lorem ipsum
 * │
 * ```
 */
export function Shopify (input: string | string[], source: string[]): {
  /**
   * Line Number detected within response
   *
   * @default NaN
   */
  line: number;
  /**
   * Column number
   *
   * @default NaN
   */
  column: number;
  /**
   * The codeframe output generated
   */
  output: string;
} {

  /**
   * The Codeframe entries
   */
  const output: string[] = [];

  /**
   * The line number expression, eg: `(line 25):`
   */
  const lineExp = /\(line \d+\):/;

  /**
   * Error responses may also include the name of the
   * incurred error in syntax issues. This is wrapped in
   * single quotations, for example:
   *
   * ```
   * Unknown tag 'something'
   * ```
   * Where the `'something'` infers the cause of error.
   */
  const nameExp = /'(.*?)'/;

  /**
   * Indentation
   */
  let indent: string = '  ';

  /**
   * Wrap limit that content should not exceed
   */
  const wrapLimit = ($.terminal.cols - 10);

  /**
   * The Line number extract from Shopify Response
   */
  let line: number = NaN;

  /**
   * The Column number obtained from the error parse
   */
  let column: number = NaN;

  /**
   * The amount of additional spacing required when
   * line numbers differ, e.g: `9` has a smaller length than `10`.
   */
  let space: number = 0;

  if (isString(input)) {
    // TODO
  }

  const frame: string[] = [];

  for (let i = 0, s = input.length; i < s; i++) {

    let text = input[i];

    if (lineExp.test(text)) {

      const lineIndex = text.indexOf('):');
      const numberIndex = text.indexOf('(line');

      // Obtain Line number
      if (lineIndex > -1 && numberIndex > -1) {

        // When we ahve a line number, we insert at the
        // start of the codeframe, typical response will be:
        //
        // Liquid syntax error (line 28):
        //
        // The below slice will extract that portion of the response
        //
        output.unshift(
          glue(
            Tree.red,
            c.red.bold(text.slice(0, lineIndex + 2)),
            NWL,
            Tree.redTrim
          )
        );

        // Lets obtain the line number for stack references
        // + 6 characters to skip over the `(line ` portion
        //
        line = Number(text.slice(numberIndex + 6, lineIndex));

        /**
         * Let's create a reference so that our line numbers
         * are spaced correctly, for example:
         *
         * ```
         * │  9 │ # we need to add an extra whitespace here
         * │ 10 │
         * ```
         */
        space = sanitize(line).length + 3;

        // Lets re-align the text varaiable by remove the above
        // potion we have already pushed onto the code frame response.
        //
        // This sequence might include a name reference, from which we
        // can obtain column number.
        //
        text = extract(text.slice(lineIndex + 2));

        output.push(
          glue(
            highlight(Wrap(text, { line: Tree.red, color: c.redBright })),
            NWL,
            Tree.redTrim,
            NWL,
            Tree.redTrim
          )
        );

        // Lets ensure that we have a source reference, this is
        // the request asset payload that was rejected. We need to
        // ensure that the length is more than 1 to apply prepend
        // code references.
        //
        if (source.length > 1) {

          /**
           * The before line number prefix
           */
          const before = glue(
            Tree.redTrim,
            WSP.repeat(space - sanitize(line - 1).length),
            c.blue(`${line - 1}`),
            WSP,
            Tree.trim
          );

          /**
           * The error line prefix
           */
          const current = glue(
            Tree.redTrim,
            WSP,
            c.red.bold('>'),
            WSP,
            c.blue(`${line}`),
            WSP,
            Tree.trim
          );

          /**
           * Obtain the name from text
           */
          let match: string = NIL;

          /**
           * Lets obtain the error line, we will use this
           * after reasoning about with before line.
           *
           * In addition, we will replace tabs with spaces
           */
          let errLine = source[line - 1].replace(/\t/g, '  ').trimEnd();

          /**
           * Error Leading space
           */
          const errLead = errLine.match(/^\s*/)[0];

          if (nameExp.test(text)) {

            /**
             * Obtain the name from text
             */
            match = text.match(nameExp)[1];

            // Line number is not zero based, so we need to
            // ensure we are pulling the correct line.
            //
            column = source[line - 1].indexOf(match);

            // Ensure we can detect the match on the source line
            if (column < 0) column = NaN;

          }

          /**
           * Lets obtain the line before the error, keep in
           * mind that `line` is not zero based, so we need to
           * go backwards by 2.
           *
           * In addition, we will replace tabs with spaces
           */
          let prevLine: string = source[line - 2].replace(/\t/g, '  ').trimEnd();

          // So if we get here the previous line is way too fucking long
          // lets see if we can patch that logic quickly, if we cant then
          // we will slice it.
          //
          // First, lets check leading indentation space
          const prevLead = prevLine.match(/^\s*/)[0].length;

          if (errLead.length === prevLead) {
            prevLine = '  ' + prevLine.trimStart();
            indent = '  ';
          } else if (errLead.length < prevLead) {
            prevLine = '    ' + prevLine.trimStart();
            indent = '  ';
          } else {
            prevLine = '  ' + prevLine.trimStart();
            indent = '    ';
          }

          // We don't want previous line to exceed terminal
          // wrap, so lets quickly ensure is not going to fuck us.
          // we are not going to respect wrap for code frames, we
          // instead refer to the terminal column length.
          //
          if (prevLine.length > wrapLimit) {
            prevLine = prevLine.slice(0, wrapLimit - 3) + '...';
          }

          // Insert the before line
          frame.push(before + c.gray(prevLine));

          errLine = indent + errLine.trimStart();

          if (errLine.length > wrapLimit) {
            errLine = errLine.slice(0, wrapLimit - 3) + '...';
          }

          // Lets construct the error line
          //
          // If column is `NaN` our error did not contain a matcher
          // we will simply insert the line in this case.
          //
          if (isNaN(column)) {

            frame.push(
              glue(
                current,
                c.white(tokens(errLine)),
                NWL, Tree.redTrim
              )
            );

          } else {

            frame.push(
              current + c.white(tokens(errLine)),
              glue(
                Tree.redTrim,
                WSP.repeat(space - 1),
                BAD,
                WSP,
                Tree.redTrim,
                WSP.repeat(errLine.indexOf(match)),
                c.redBright('^'.repeat(match.length)),
                NWL + Tree.redTrim
              )
            );

          }

        }
      }
    } else {

      output.push(
        highlight(
          Wrap(text, {
            line: Tree.red,
            color: c.redBright
          })
        )
      );
    }

  }

  return {
    line,
    column,
    output: output.join(NWL) + NWL + frame.join(NWL)
  };

}
