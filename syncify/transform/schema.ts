import type { ClientParam, Syncify } from 'types';
import type {
  BlockSingleton,
  BlockSpread,
  SchemaBlocks,
  SchemaSectionTag,
  SchemaSettings,
  SettingsGroup,
  SettingsSingleton,
  SettingsSpread,
  SharedSchema
} from 'types/internal';
import pMap from 'p-map';
import { readFile } from 'fs-extra';
import parseJSON, { JSONError } from 'parse-json';
import { defineProperty, toArray } from 'syncify:native';
import * as log from 'syncify:log';
import * as warn from 'syncify:log/warnings';
import * as error from 'syncify:errors';
import { queue } from 'syncify:requests/queue';
import { File, Type } from 'syncify:file';
import { $ } from 'syncify:state';
import { hasProp, plural, has, isArray, isObject, glue, checksum } from 'syncify:utils';
import { bold } from 'syncify:colors';
import { minifySchema } from 'lib/terser/liquid';

export function HasSchemaTag (content: string) {

  const open = content.search(/{%-?\s*schema/);

  if (open > -1) {

    const before = content.slice(0, open);
    const comm = before.match(/{%-?\s*comment\s*-?%}/g);

    if (comm !== null) {
      const last = before.slice(before.lastIndexOf(comm.pop()));
      const endcomm = last.search(/{%-?\s*endcomment\s*-?%}/);
      return endcomm > -1;
    }

    return true;

  }

  return false;

}

/**
 * Extract Schema
 *
 * Extracts the `{% schema %}` json from section files and returns an array
 * consisting of 3 items making up the section:
 *
 * @example
 * [
 *  before, // Content up until end of opening {% schema %} tag
 *  schema, // The parsed JSON schema within, if null no schema exists
 *  after?,  // Content from and after the opening {% endschem %} tag
 * ]
 *
 */
export async function ExtractSchema (file: File): Promise<[
  before: string,
  schema: SchemaSectionTag,
  after?: string,
]> {

  const read = await readFile(file.input);
  const content = read.toString();
  const open = content.search(/{%-?\s*schema/);

  if (open < 0) return [ content, null, null ];

  const begin = content.indexOf('%}', open + 2) + 2;
  const start = content.slice(begin);
  const ender = begin + start.search(/{%-?\s*endschema/);

  if (ender < 0) {

    log.error('Missing {% endschema %} tag in file.', {
      suffix: file.relative,
      notify: {
        title: 'Invalid Syntax',
        message: 'Missing {% endschema %} tag in file.'
      }
    });

    return null;

  }

  try {

    const schema = parseJSON(content.slice(begin, ender)) as unknown as SchemaSectionTag;

    return [
      content.slice(0, begin),
      schema,
      content.slice(ender)
    ];

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: 'JSON Error',
        message: `Error when parsing ${file.base}`
      }
    });

    if (e instanceof JSONError) {
      error.json(e, file);
    }

    return null;

  }
}

/**
 * Inject Settings
 *
 * Traverses the `settings[]` of section schema and replaces all
 * `$ref` occurances with the shared schema. Returns a new settings
 * array to be re-assigned to schema.
 *
 * Any unknown or undefined schema references will be omitted
 *
 */
export function InjectSettings (file: File, schema: SchemaSettings[]) {

  const settings: SchemaSettings[] = [];

  for (let i = 0, s = schema.length; i < s; i++) {

    if (!has('$ref', schema[i])) {
      settings.push(schema[i]);
      continue;
    }

    const [ key, prop ] = schema[i].$ref.split('.');

    if ($.section.shared.has(key)) {

      const shared = $.section.shared.get(key);

      if (has(prop, shared.schema)) {

        if (isArray(shared.schema[prop])) {

          // Settings Spread Shared Schema
          //
          settings.push(...(shared.schema[prop] as SettingsSpread));

        } else if (isObject(shared.schema[prop])) {
          if (has('settings', shared.schema[prop])) {

            // Settings Group Shared Schema
            //
            settings.push(...(shared.schema[prop] as SettingsGroup).settings);
          } else {

            // Settings Singleton
            //
            settings.push(shared.schema[prop] as SettingsSingleton);
          }
        }

      } else {
        if ($.mode.build) {
          warn.schema(file, {
            shared: shared.uri,
            $ref: schema[i].$ref,
            message: 'unknown schema key',
            schema: 'settings'
          });
        } else {
          log.warn(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
        }
      }

    } else {
      if ($.mode.build) {
        warn.schema(file, {
          shared: prop,
          $ref: schema[i].$ref,
          message: 'unknown schema',
          schema: 'settings'
        });
      } else {
        log.warn(`unknown $ref ${bold(schema[i].$ref)} `, file.base);
      }
    }
  }

  return settings;

}

/**
 * Inject Blocks
 *
 * Traverses the `blocks[]` of section schema and replaces all
 * `$ref` occurances with the shared schema. Returns a new blocks
 * array to be re-assigned to schema.
 *
 * Any unknown or undefined schema references will be omitted
 *
 */
export function InjectBlocks (file: File, schema: SchemaBlocks[]) {

  const blocks: SchemaBlocks[] = [];

  for (let i = 0, s = schema.length; i < s; i++) {

    if (has('$ref', schema[i])) {

      const [ key, prop ] = schema[i].$ref.split('.');

      if ($.section.shared.has(key)) {

        const shared = $.section.shared.get(key);

        if (has(prop, shared.schema)) {

          if (isArray(shared.schema[prop])) {

            // Blocks Spread
            //
            blocks.push(...(shared.schema[prop] as BlockSpread));

          } else {

            // Blocks Singleton
            //
            blocks.push(shared.schema[prop] as BlockSingleton);

          }

        } else {

          if ($.mode.build) {
            warn.schema(file, {
              shared: shared.uri,
              $ref: schema[i].$ref,
              message: 'unknown schema key',
              schema: 'blocks'
            });
          } else {
            log.warn(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
          }

        }
      } else {
        if ($.mode.build) {
          warn.schema(file, {
            shared: key,
            $ref: schema[i].$ref,
            message: 'unknown schema',
            schema: 'settings'
          });
        } else {
          log.warn(`unknown $ref ${bold(schema[i].$ref)} `, file.base);
        }
      }

    } else {

      const block = <SchemaBlocks>{};

      for (const prop in schema[i]) {
        if (prop !== 'settings') block[prop] = schema[i][prop];
      }

      block.settings = [];

      if (has('settings', schema[i])) {

        for (const setting of schema[i].settings) {

          if (has('$ref', setting)) {

            const [ key, prop ] = setting.$ref.split('.');

            if ($.section.shared.has(key)) {

              const shared = $.section.shared.get(key);

              if (has(prop, shared.schema)) {

                if (isArray(shared.schema[prop])) {

                  // Settings Spread Shared Schema
                  //
                  block.settings.push(...(shared.schema[prop] as SettingsSpread));

                } else if (isObject(shared.schema[prop])) {

                  if (has('settings', shared.schema[prop])) {

                    // Settings Group Shared Schema
                    //
                    block.settings.push(...(shared.schema[prop] as SettingsGroup).settings);
                  } else {

                    // Settings Singleton
                    //
                    block.settings.push(shared.schema[prop] as SettingsSingleton);
                  }
                }

              } else {
                if ($.mode.build) {
                  warn.schema(file, {
                    shared: shared.uri,
                    $ref: setting.$ref,
                    message: 'unknown schema key',
                    schema: 'blocks'
                  });
                } else {
                  log.warn(`undefined $ref ${bold(prop)} in ${bold(key)} `, file.base);
                }
              }

            } else {
              if ($.mode.build) {
                warn.schema(file, {
                  shared: prop,
                  $ref: setting.$ref,
                  message: 'unknown schema',
                  schema: 'blocks'
                });
              } else {
                log.warn(`unknown $ref ${bold(setting.$ref)} `, file.base);
              }
            }

          } else {

            block.settings.push(setting);

          }

        }

      }

      blocks.push(block);

    }
  }

  return blocks;

}

/**
 * Parse Shared Schema
 *
 * Re-parsed the shared schema file where a change was detected.
 * This function will also update cache reference occurances and checksum.
 */
async function ParseSharedSchema (file: File) {

  try {

    const read = await readFile(file.input);
    const hash = checksum(file.input);

    if (
      has(file.input, $.cache.schema) &&
      $.cache.checksum[file.input] === hash &&
      $.section.shared.has(file.name)) {

      return $.section.shared.get(file.name);

    };

    $.cache.checksum[file.input] = hash;

    const data = read.toString();

    if (data.trim().length === 0) {
      log.warn('empty file', 'no shared schema defined');
      return null;
    }

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

    return $.section.shared.set(file.name, {
      uri: file.input,
      schema: schema as any
    }).get(file.name);

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: 'JSON Error',
        message: `Error when parsing ${file.base}`
      }
    });

    if (e instanceof JSONError) {
      error.json(e, file);
    }

    return null;

  }

}

/**
 * Create Section
 *
 * Returns re-generated section files with the applied shared
 * schema injects.
 */
export async function CreateSection (file: File<SchemaSectionTag>) {

  const read = await ExtractSchema(file);

  if (read === null) return null;

  const [ before, schema, after ] = read;

  if (schema === null) return before;

  const schemaProp = hasProp(schema);

  if (schemaProp('settings')) {
    schema.settings = InjectSettings(file, schema.settings);
  }

  if (schemaProp('blocks')) {
    schema.blocks = InjectBlocks(file, schema.blocks);
  }

  return glue(
    before.trimEnd(),
    NWL,
    minifySchema(schema),
    NWL,
    after.trimStart()
  );
}

/**
 * Shared Schema Files
 */
export async function compile (file: File, sync: ClientParam<any>, cb: Syncify) {

  const shared = await ParseSharedSchema(file);

  if (shared === null) return null;

  const files = toArray($.cache.schema[shared.uri]);
  const sections = await pMap<string, File<SchemaSectionTag>>(files, p => {
    return defineProperty(file.data(p), 'data', {
      get () {
        return $.cache.sections[p];
      }
    });
  });

  log.process('Shared Schema', `${sections.length} ${plural('section', sections.length)}`);

  for (const section of sections) {

    const value = await CreateSection(section);

    log.syncing(section.key);

    await sync('put', section, value);

    if ($.mode.hot) {

      if (file.type === Type.Section) {

        $.wss.section(section.name);

      } else if (section.type !== Type.Script && section.type !== Type.Style) {

        await queue.onIdle().then(() => $.wss.replace());

      }
    }

  }

};
