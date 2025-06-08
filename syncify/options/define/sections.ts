import type { SchemaSectionTag, SchemaSettings, SharedSchema } from 'types';

import { basename, extname, relative } from 'node:path';

import { readFile } from 'fs-extra';

import { bold } from '@syncify/ansi';
import { JSONError, parse } from '@syncify/json';

import { log } from '~cli/log';
import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { error } from '~errors';
import { GetSchemaIndices } from '~schema';
import { checksum, defineProperty, has, hasProp, isArray, isObject, s } from '~utils';

import { $ } from '$';

/**
 * Section Options
 *
 * Traverses all sections within the project and constructs workable data models.
 * This operation is responsible for extracting `{% schema %}` JSON contents from
 * section files so we can perform faster section transforms and ensure that shared
 * schema injections perform in quick succession whenever changes occur.
 */
export async function setSectionOptions () {

  if ($.paths.schema.input !== null && $.paths.schema.input.size > 0 && $.running === false) {

    await setSharedSchema();
    await setSchemaJson();

    defineProperty($.section, 'schema', {
      get () {
        return $.cache.schema;
      }
    });

  }

};

async function setSharedSchema () {

  for (const uri of $.paths.schema.input) {

    const ext = extname(uri);
    const key = basename(uri, ext);

    if ($.section.shared.has(key)) {
      throws(`Duplicated shared schema file name ${bold.yellow(key + ext)} detected.`, [
        'Shared Schema JSON file names must be unique across the workspace.',
        'Update the file name and try again.'
      ]);
    }

    try {

      const data = await readFile(uri, 'utf8');

      if (data.trim().length === 0) continue;

      const schema = parse<SharedSchema>(data);

      if (has('$schema', schema)) delete schema.$schema;
      if (has('$description', schema)) delete schema.$description;

      // Remove $description occurances from schema
      for (const prop in schema) {
        if (isObject<SchemaSettings>(schema[prop])) {
          if (has('$description', schema[prop])) {
            delete schema[prop].$description;
          }
        } else if (isArray(schema[prop])) {
          for (const setting of schema[prop]) {
            if (has('$description', setting)) delete setting.$description;
          }
        }
      }

      $.cache.schema[uri] = s();
      $.section.shared.set(key, { uri, schema });

    } catch (e) {

      if (e instanceof JSONError) {

        log.error(relative($.cwd, uri), {
          notify: {
            title: 'JSON Error (setSharedSchema)',
            message: `Error when parsing ${basename(uri)}`
          }
        });

        error.json(e, {
          relative: relative($.cwd, uri),
          base: basename(uri)
        });

      } else {

        error.throw(e, {
          relative: relative($.cwd, uri),
          base: basename(uri)
        });

      }

      return null;

    }

  }

}

async function setSchemaJson () {

  const { shared } = $.section;
  const warn = warnOption('Section Schema');

  for (const file of $.paths.sections.input) {

    const read = await readFile(file, 'utf8');
    const hash = checksum(read);

    if (has(file, $.cache.schema) && $.cache.checksum[file] === hash) continue;

    $.cache.checksum[file] = hash;

    const data = read.toString();
    const indices = GetSchemaIndices(data);

    if (indices === null) {
      warn('Liquid Parse Error', relative($.cwd, file));
      continue;
    }

    try {

      const schema = parse<SchemaSectionTag>(data.slice(indices.begin, indices.ender));
      const schemaProp = hasProp(schema);

      function buildSettingsCache (file, settings) {

        if (has('settings', settings)) {
          settings = settings.settings
        };

        for (const setting of settings) {
          if (has('$ref', setting)) {

            const [ key, prop ] = setting.$ref.split('.');

            if (shared.has(key)) {

              if ($.cache.schema[shared.get(key).uri].has(file)) continue;

              $.cache.schema[shared.get(key).uri].add(file);
              buildSettingsCache(file, shared.get(key).schema[prop]);

            }

          }
        }

      }

      if (schemaProp('settings')) {
        buildSettingsCache(file, schema.settings);
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

      if (has(file, $.cache.sections)) {

        delete $.cache.sections[file];

      }

      warn('JSON Parse Error', relative($.cwd, file));

    }
  }

  console.log(['$.cache.schema', $.cache.schema]);
}
