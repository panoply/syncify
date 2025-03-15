declare class Methods {

  /**
   * Join `string[]` or `...string[]` (spread) together with custom character.
   *
   * > Curried expression is supported
   *
   * @example
   *
   * glue.join('-', 'foo', 'bar', 'baz') // foo-bar-baz
   * glue.join('-', ['foo', 'bar', 'baz']) // foo-bar-baz
   *
   * // Curried Example
   *
   * const join = glue.join('-')
   *
   * join('foo', 'bar', 'baz') // foo-bar-baz
   * join(['foo', 'bar', 'baz']) // foo-bar-baz
   */
  static join(
    character: string,
    ...input: [ string[] ] | string[]
  ): string | ((...input: [ string[] ] | string[]) => string)

  /**
   * Join `string[]` or `...string[]` (spread) together with single whitespace
   *
   * @example
   *
   * glue.ws('foo', 'bar', 'bar')    // foo bar baz
   * glue.ws(['foo', 'bar', 'bar']) // foo bar baz
   */
  static ws(...input: [ string[] ] | string[]): string;
  /**
   * Join `string[]` or `...string[]` (spread) together with newlines
   *
   * @example
   *
   * glue.nl('foo', 'bar', 'bar')
   * // foo
   * // bar
   * // baz
   *
   * glue.nl(['foo', 'bar', 'baz'])
   * // foo
   * // bar
   * // baz
   */
  static nl(...input: [ string[] ] | string[]): string

}

type Identity<T> = T

interface Glue extends Identity<typeof Methods> {
  /**
   * **glue**
   *
   * Join a string together with no spaces, this performs a standard join
   *
   * @example
   *
   * glue('foo', 'bar', 'baz') // foobarbaz
   */
  (...input: [ string[] ] | string[]): string;
}

/**
 * Join a string together with no spaces, this performs a standard join
 *
 * @example
 *
 * glue('foo', 'bar', 'baz')
 * // => foobarbaz
 *
 * glue.join('-', 'a', 'b', 'c')
 * // => a-b-c
 *
 * glue.ws('foo', 'bar', 'baz')
 * // => foo bar baz
 *
 * glue.nl('foo', 'bar', 'baz')
 * /* => foo
 *       bar
 *       baz /
 */
export const glue: Glue;
