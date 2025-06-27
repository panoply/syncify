import type { SchemaBlocks, SchemaSectionTag, SchemaSettings, SettingsGroup, SharedSchema } from 'types';

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

      if (!$.cache.schema[uri]) {
        $.cache.schema[uri] = s();
      }
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
  const files = [ ...$.paths.blocks.input, ...$.paths.sections.input ];

  for (const file of files) {

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

      function buildSettingsCache (file: string, settings: SchemaSettings[]) {

        const refs = [];

        for (const setting of settings) {

          if (has('$ref', setting)) {

            const [ key, prop ] = setting.$ref.split('.');

            if (shared.has(key)) {

              if (!$.cache.schema[shared.get(key).uri].has(file)) {

                $.cache.schema[shared.get(key).uri].add(file);

                if (has('settings', shared.get(key).schema[prop])) {

                  refs.push((shared.get(key).schema[prop] as SettingsGroup).settings);

                  continue;

                }

                refs.push(shared.get(key).schema[prop]);

              }

            }

          }
        }

        for (const settings of refs) {

          buildSettingsCache(file, settings);

        }

      }

      function buildBlockCache (file: string, blocks: SchemaBlocks[]) {

        const blockRefs: SchemaBlocks[] = [];
        const settingsRefs = [];

        for (const block of blocks) {

          const blockProp = hasProp(block);

          if (blockProp('$ref')) {

            const [ key, prop ] = block.$ref.split('.');

            if (shared.has(key)) {

              if (!$.cache.schema[shared.get(key).uri].has(file)) {

                $.cache.schema[shared.get(key).uri].add(file);

                blockRefs.push(shared.get(key).schema[prop] as SchemaBlocks);

              };

            }

          }

          if (blockProp('settings')) {

            settingsRefs.push(block.settings);

          }
        }

        for (const block of blockRefs) {

          buildBlockCache(file, [ block ]);

        }

        for (const settings of settingsRefs) {

          buildSettingsCache(file, settings);

        }

      }

      if (schemaProp('settings')) {

        buildSettingsCache(file, schema.settings);

      }

      if (schemaProp('blocks')) {

        buildBlockCache(file, schema.blocks);

      }

    } catch (e) {

      if (has(file, $.cache.sections)) {

        delete $.cache.sections[file];

      }

      warn('JSON Parse Error', relative($.cwd, file));

    }

  }

}
