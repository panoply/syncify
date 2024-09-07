import type { SchemaBlocks, SchemaSectionTag, SchemaSettings, SharedSchema } from 'types/internal';
import { basename, extname, relative } from 'pathe';
import { readFile } from 'fs-extra';
import { File } from 'syncify:file';
import parseJSON, { JSONError } from 'parse-json';
import { typeError, invalidError, throwError, warnOption } from 'syncify:log/throws';
import { isObject, isString, isArray, isBoolean, checksum, has, hasProp, isEmpty } from 'syncify:utils';
import * as error from 'syncify:errors';
import * as log from 'syncify:log';
import { bold } from 'syncify:colors';
import { $ } from 'syncify:state';
import { defineProperty } from 'syncify:native';
import { Sections } from 'types';

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages in the next validate check,
 */
export async function setSectionOptions () {

  if (!isObject($.config.paths.snippets)) return;

  const { sections } = $.config.paths as { sections: Sections };

  if (has('input', sections)) return;
  if (isEmpty(sections.input)) return;

  // Ensure the section option is an object
  if (!isObject(sections)) {

    typeError({
      option: 'views',
      name: 'sections',
      expects: '{}',
      provided: typeof sections
    });

  }

  // Iterate over all the properties in sections option
  for (const option in $.section) {

    if (option === 'input') continue;

    // Validate the boolean type values of the option
    if (option === 'prefixDir') {
      if (isBoolean(sections[option])) {

        $.section[option] = sections[option];
        continue;

      } else {

        typeError(
          {
            option: 'views.sections',
            name: option,
            provided: sections[option],
            expects: 'boolean'
          }
        );
      }
    }

    // Validate the prefix separator option, in Shopify sections
    // We cannot use dot prefixes, we ensure only accepted values are defined.
    if (option === 'separator') {
      if (isString(sections[option])) {

        // Only these character can be prefixers
        if (/[@:_-]/.test(sections[option])) {

          $.section[option] = sections[option];

          continue;

        } else {

          invalidError(
            {
              option: 'view.sections',
              name: option,
              value: sections[option],
              expects: '@ | _ | : | -'
            }
          );
        }
      } else {

        typeError(
          {
            option: 'views.sections',
            name: option,
            provided: sections[option],
            expects: 'string'
          }
        );
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'global') {

      const globals = isString(sections[option]) ? [ sections[option] ] : sections[option];

      if (isArray(globals)) {

        if (globals.length > 0) {
          $.section[option] = new RegExp(`${globals.join('|')}`);
          continue;
        }

      } else {

        typeError(
          {
            option: 'paths.sections',
            name: option,
            provided: sections[option],
            expects: 'string | string[]'
          }
        );
      }
    }

    if (
      option === 'shared' &&
      $.paths.schema.input !== null &&
      $.paths.schema.input.size > 0) {

      await setSharedSchema();
      await setSchemaJson();

      defineProperty($.section, 'schema', { get () { return $.cache.schema; } });

    }
  }
};

export async function setSharedSchema () {

  for (const uri of $.paths.schema.input) {

    const ext = extname(uri);
    const key = basename(uri, ext);

    if ($.section.shared.has(key)) {
      throwError(`Duplicated shared schema file name ${bold.yellow(key + ext)} detected.`, [
        'Shared Schema JSON file names must be unique across the workspace.',
        'Update the file name and try again.'
      ]);
    }

    try {

      const read = await readFile(uri);
      const data = read.toString();

      if (data.trim().length === 0) continue;

      const schema = parseJSON(data.toString()) as unknown as SharedSchema;

      if (has('$schema', schema)) delete schema.$schema;
      if (has('$description', schema)) delete schema.$description;

      // Remove $description occurances from schema
      for (const prop in schema) {
        if (isObject<SchemaSettings>(schema[prop])) {
          if (has('$description', schema[prop])) {
            delete (schema[prop] as SchemaSettings).$description;
          }
        } else if (isArray(schema[prop])) {
          for (const setting of schema[prop] as SchemaBlocks[] | SchemaSettings[]) {
            if (has('$description', setting)) delete setting.$description;
          }
        }
      }

      $.cache.schema[uri] = new Set();
      $.section.shared.set(key, { uri, schema: schema as any });

    } catch (e) {

      log.error(relative($.cwd, uri), {
        notify: {
          title: 'JSON Error (setSharedSchema)',
          message: `Error when parsing ${basename(uri)}`
        }
      });

      if (e instanceof JSONError) {

        error.json(e, {
          relative: relative($.cwd, uri),
          base: basename(uri)
        } as File);

      }

      return null;

    }

  }

}

export async function setSchemaJson () {

  const { shared } = $.section;
  const warn = warnOption('Section Schema');

  for (const file of $.paths.sections.input) {

    const read = await readFile(file);
    const hash = checksum(read);

    if (has(file, $.cache.schema) && $.cache.checksum[file] === hash) continue;

    $.cache.checksum[file] = hash;

    const data = read.toString();
    const open = data.search(/{%-?\s*schema/);

    if (open < 0) continue;

    // TODO: Ensure schema blocks within comments are ignored

    const begin = data.indexOf('%}', open + 2) + 2;
    const start = data.slice(begin);
    const ender = begin + start.search(/{%-?\s*endschema/);

    if (ender < 0) {
      warn('Liquid Parse Error', relative($.cwd, file));
      continue;
    }

    try {

      const schema = <SchemaSectionTag>JSON.parse(data.slice(begin, ender));
      const schemaProp = hasProp(schema);

      if (schemaProp('settings')) {
        for (const setting of schema.settings) {
          if (has('$ref', setting)) {
            const fname = setting.$ref.split('.')[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }
        }
      }

      if (schemaProp('blocks')) {
        for (const block of schema.blocks) {

          const blockProp = hasProp(block);

          if (blockProp('$ref')) {
            const fname = block.$ref.split('.')[0];
            if (shared.has(fname)) {
              $.cache.schema[shared.get(fname).uri].add(file);
            }
          }

          if (blockProp('settings')) {
            for (const setting of block.settings) {
              if (has('$ref', setting)) {
                const fname = setting.$ref.split('.')[0];
                if (shared.has(fname)) {
                  $.cache.schema[shared.get(fname).uri].add(file);
                }
              }
            }
          }
        }
      }

    } catch (e) {

      if (has(file, $.cache.sections)) delete $.cache.sections[file];

      warn('JSON Parse Error', relative($.cwd, file));

    }
  }

}
