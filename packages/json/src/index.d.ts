import type { Reviver } from 'comment-json';

export class JSONError extends Error {

  /**
   * The raw JSON as a string
   */
  source: string;
  /**
   * The line number of the error within the source
   */
  line: number;
  /**
   * The column number of the error within the source
   */
  column: number;

}

export interface SortOptions {
  /**
   * Whether or not objects should be sorted in the structure.
   * Accepts boolean `true` to sort all objects, or array list to
   * cherry pick paths in JSON structures.
   *
   * @default false
   * @example
   *
   * // Defaults to true
   * { objects: false }
   *
   * // BEFORE
   *
   * {
   *  b: ['b','c','a'],
   *  c: { b: 2, c: 3, a: 1 }
   *  a: [2,1]
   * }
   *
   * // AFTER
   *
   * {
   *  a: [1,2]
   *  b: ['a','b','c'],
   *  c: { b: 2, c: 3, a: 1 } // preserved when false
   * }
   */
  objects?: boolean | string[];
  /**
   * Whether or not arrays should be sorted in the structure.
   * Accepts boolean `true` to sort all objects, or array list to
   * cherry pick paths in JSON structures.
   *
   * @default false
   *
   * > **NOTE**
   * >
   * > Typically to be avoided, but be as you are and do as you wish.
   *
   * @default false
   *
   * @example
   *
   * // Defaults to false
   * { arrays: true }
   *
   * // BEFORE
   *
   * {
   *  a: ['b','c','a'],
   *  b: [2,1]
   * }
   *
   * // AFTER
   *
   * {
   *  a: ['a','b','c'], // sorted
   *  b: [1,2] // sorted
   * }
   */
  arrays?: boolean | string[];
  /**
   * String list of property names whos value is either an object or array
   * that should be excluded from sorting.
   *
   * @default []
   *
   * @example
   *
   * // EXCLUDE
   *
   * ['b', 'c']
   *
   * // BEFORE
   *
   * {
   *  a: { b: 'x' },
   *  c: true,
   *  d: { c: { f: 'x', e: 'x' } },
   *  b: [2,1],
   * }
   *
   * // AFTER
   *
   * {
   *  a: { b: 'x' },
   *  b: [2,1],  // b prop was sorted but value was not
   *  c: true,
   *  d: { c: { e: 'x', f: 'x' } } // c was sorted
   * }
   */
  exclude?: string[];
}

export interface EvaluateOptions extends SortOptions {
  /**
   * Whether or not stringify should use tab `\t` characters
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * The indentation size. When `useTab` is `true` will apply at division of `2`
   *
   * @default 2
   */
  indentSize?: number;
  /**
   * Whether or not to remove comments from the structure
   *
   * @default false
   */
  removeComments?: boolean;
  /**
   * CRLF Line endings, When `true` will apply `\r\n` line enders, otherwise `\n`
   *
   * @default false
   */
  crlf?: boolean;
}

export interface FormatOptions extends SortOptions {
  /**
   * Whether or not stringify should use tab `\t` characters
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * The indentation size. When `useTab` is `true` will apply at division of `2`
   *
   * @default 2
   */
  indentSize?: number;
  /**
   * CRLF Line endings, When `true` will apply `\r\n` line enders, otherwise `\n`
   *
   * @default false
   */
  crlf?: boolean;
  /**
   * Whether or not to remove comments from the structure
   *
   * @default false
   */
  removeComments?: boolean;
}

export interface StringifyOptions extends EvaluateOptions {
  /**
   * A function that transforms the results or an array of strings and numbers that acts as a approved
   * list for selecting the object properties that will be stringified.
   *
   * @default null
   */
  replacer?: Reviver | null;
}

export interface ParseEvaluate<T = any> {
  /**
   * The original `source` JSON string passed into the function, this
   * is untouched and will be identical to the `evaluate(source)` value.
   */
  source: string;
  /**
   * The processed `source` JSON string with applied format and sorting changes.
   *
   * > This is the value you'd use when writing to disk.
   */
  string: string;
  /**
   * The `source` JSON parsed into a workable format.
   */
  parsed: T;
  /**
   * A **checksum** of the `string` value. This is used for diffing and might be
   * helpful to have reference of.
   */
  hashed: string;
}

export interface ParseEvaluateAssert<T = any> {
  /**
   * The original `actual` JSON string passed into the function, this
   * is untouched and will be identical to the `evaluate(actual)` value.
   */
  actual: {
    /**
     * The original `expect` JSON string passed into the function, this
     * is untouched and will be identical to the `evaluate(actual, expect)` value.
     */
    source: string;
    /**
     * The original `actual` parsed value
     */
    parsed: T;
    /**
     * The original `actual` as a string value
     */
    string: string;
    /**
     * The original `actual` as a checksum
     */
    hashed: string;
  };
  /**
   * The original `expect` JSON string passed into the function, this
   * is untouched and will be identical to the `evaluate(actual, expect)` value.
   */
  source: string;
  /**
   * The processed `expect` JSON string with applied format and sorting changes.
   *
   * > This is the value you'd use when writing to disk.
   */
  string: string;
  /**
   * This will be the `expected` value if `change` is `true` and represents the
   * JSON parsed into a workable format.
   */
  parsed: T;
  /**
   * Whether or not `actual` and `expect` are different. When `true` the `string` and
   * `parsed` will hold `expect` value, otherwise `actual` value.
   *
   * When `false` the values of `string` and `parsed` will not matter, because `actual` and
   * `expect` are identical, there was no difference incurred during comparison.
   */
  change: boolean;
  /**
   * A **checksum** of the `string` value. This is used for diffing and might be
   * helpful to have reference of.
   */
  hashed: string;
}

/**
 * Deep alpha-numeric sorting of an object or array structure.
 *
 * @param source
 * An object or array to be sorted
 *
 * @param options
 * Elementary level control over sorting operations
 */
export const sort: <T = any>(source: T, options?: SortOptions) => T;

/**
 * Evaluate returns model representing the various structures produced.
 * This can be used to diff two different JSON structures or a single
 * JSON structure.
 *
 * @example
 *
 * const actual = `{
 *   a: {
 *     b: [
 *       // line comment
 *       { c: 'string' }
 *     ]
 *   }
 * }`
 *
 * const expect = `{
 *   a: {
 *     b: [
 *       // line comment
 *       { c: 'string' }
 *     ]
 *   }
 * }`
 *
 * // Evaluate accepts both actual and expect of one of each.
 * // Parses the value and returns the following variations
 *
 * const {
 *
 *   string,               // (getter) Writeable string with comments
 *   parsed,               // (getter) The parsed JSON object
 *   hashed                // (getter) Checksum MD5 hash
 *
 *   // These are available when passing expect
 *
 *   actual,               // (getter) The original source value (when passing expect)
 *   change                // (getter) Boolean, whether or not actual > expect are different
 *
 * } = evaluate(actual, expect, {
 *   crlf: false,           // Use CRLF line endings (optional)
 *   useTab: false,         // Use Tab spacing (optional)
 *   indentSize: 2,         // The indentation size (optional)
 *   removeComments: false, // Strips the comments for JSON (optional)
 *   sorting: {
 *     objects: true,      // Sort Objects in structure (optional)
 *     arrays: false,      // Sort Arrays in structure (optional)
 *     target: [],         // Sort specific objects only (optional)
 *     exclude: []         // Property names to excude in sorting
 *   }
 * })
 */
export const evaluate: {
  <T>(actual: unknown, expected: unknown, options?: EvaluateOptions): ParseEvaluateAssert<T>;
  <T>(source: unknown, options?: EvaluateOptions): ParseEvaluate<T>
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 */
export const stringify: (value: unknown, options?: StringifyOptions) => string;

/**
 * Parses and formats a JSON structure. Returns the formatted result as a string
 */
export const format: (value: unknown, options?: FormatOptions) => string;

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
export const getIndent: (value: string) => {
  /**
   * The type of indentation
   */
  type: 'space' | 'tab';
  /**
   * String representation of the indentation
   */
  indent: string;
  /**
   * Indentation Size
   */
  indentSize: number;
  /**
   * The indentation character, e.g:`\t` or ` `
   */
  indentChar: string;
};

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @param value
 * A valid JSON string.
 *
 * @param
 * Reviver function, same as `JSON.parse({}, () => {})
 * If boolean `true` or `false` will be considered a `removeComments` param
 *
 * @param
 * Whether or not to remove comments
 */
export const parse: <T = any>(value: string, reviver?: Reviver | null | boolean, removeComments?: boolean) => T;
