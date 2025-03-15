/**
 * **glue**
 *
 * Join a string together with no spaces, this performs a standard join
 *
 * @example
 *
 * glue('foo', 'bar', 'baz') // foobarbaz
 */
const glue = function glue (...input: [ string[] ] | string[]) {

  return typeof input[0] === 'string' ? input.join('') : input[0].join('');

};

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
glue.join = function (ch: string, ...input: [ string[] ] | string[]) {

  return arguments.length === 1
    ? (...items: [ string[] ] | string[]) => typeof items[0] === 'string' ? items.join(ch) : items[0].join(ch)
    : typeof input[0] === 'string' ? input.join(ch) : input[0].join(ch);

};

glue.ws = (...input: [ string[] ] | string[]) => {

  return typeof input[0] === 'string' ? input.join(' ') : input[0].join(' ');

};

glue.nl = (...input: [ string[] ] | string[]) => {

  return typeof input[0] === 'string' ? input.join('\n') : input[0].join('\n');

};

/* -------------------------------------------- */
/* EXPORT                                       */
/* -------------------------------------------- */

export { glue };
