import type { PageMetafield, File } from 'types';
import { has } from 'rambdax';
import { c, log } from '~log';

/**
 * Check Metafield Type
 *
 * Returns `true` when a valid metafield type name
 * was provided.
 */
function checkMetafieldType (type: string): boolean {

  return (
    type === 'boolean' ||
    type === 'color' ||
    type === 'date' ||
    type === 'date_time' ||
    type === 'dimension' ||
    type === 'json' ||
    type === 'money' ||
    type === 'multi_line_text_field' ||
    type === 'number_decimal' ||
    type === 'number_integer' ||
    type === 'rating' ||
    type === 'rich_text_field' ||
    type === 'single_line_text_field' ||
    type === 'url' ||
    type === 'volume' ||
    type === 'weight'
  );

}

/**
 * Checks Page metafields
 *
 * Throws when a property is missing that will
 * otherwise be required
 */
export function getPageMetafields (file: File, metafields: PageMetafield[]): boolean {

  for (const metafield of metafields) {

    for (const prop of [
      'key',
      'type',
      'value',
      'namespace',
      'description'
    ]) {

      if (prop !== 'description' && !has(prop, metafield)) {

        log.invalid(file.relative, [
          `Missing ${c.blue.bold(prop)} property key value in a ${c.yellowBright.bold('metafields')}`,
          'value of page frontmatter. Frontmatter metafields require you provide the following keys:',
          '',
          `${c.gray('-')} ${c.white('key')}`,
          `${c.gray('-')} ${c.white('type')}`,
          `${c.gray('-')} ${c.white('value')}`,
          `${c.gray('-')} ${c.white('namespace')}`,
          '',
          `${c.gray('Update the metafield entry to include')} ${c.white(prop)}`
        ]);

        return false;

      }

      if (prop === 'type') {

        const type = metafield[prop];

        if (!checkMetafieldType(type)) {

          log.invalid(file.relative, [
            `Invalid type ${c.blue.bold(type)} provided in a page frontmatter ${c.yellowBright.bold('metafields')}`,
            `value. Frontmatter metafields ${c.bold('must')} be one of following types:`,
            '',

            `${c.gray('-')} ${c.white('boolean')}`,
            `${c.gray('-')} ${c.white('color')}`,
            `${c.gray('-')} ${c.white('date')}`,
            `${c.gray('-')} ${c.white('date_time')}`,
            `${c.gray('-')} ${c.white('dimension')}`,
            `${c.gray('-')} ${c.white('json')}`,
            `${c.gray('-')} ${c.white('money')}`,
            `${c.gray('-')} ${c.white('multi_line_text_field')}`,
            `${c.gray('-')} ${c.white('number_decimal')}`,
            `${c.gray('-')} ${c.white('number_integer')}`,
            `${c.gray('-')} ${c.white('rating')}`,
            `${c.gray('-')} ${c.white('rich_text_field')}`,
            `${c.gray('-')} ${c.white('single_line_text_field')}`,
            `${c.gray('-')} ${c.white('url')}`,
            `${c.gray('-')} ${c.white('volume')}`,
            `${c.gray('-')} ${c.white('weigh')}`,
            '',
            `${c.gray('Update the metafield entry to an accepted')} ${c.white('type')}`
          ]);

          return false;
        }

      }
    }

  }

  return true;

}
