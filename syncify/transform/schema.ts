import type {
  BlockSingleton,
  BlockSpread,
  SchemaBlocks,
  SchemaSectionTag,
  SchemaSettings,
  SettingsSchema,
  SettingsSingleton,
  SettingsSpread,
  SharedSchema
} from 'types';

import { readFile } from 'fs-extra';
import pMap from 'p-map';

import { bold } from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { parse } from '@syncify/json';

import { minifySchema } from './terser/liquid';

import { log } from '~cli/log';
import { warn } from '~cli/warnings';
import { error } from '~errors';
import { File, Type } from '~file';
import { JsonTransform } from '~json';
import { LiquidTransform } from '~liquid';
import { checksum, defineProperty, has, hasProp, includes, isArray, isEmpty, isNull, isObject, isString, merge, o, omit, plur, replaceAllOccurrences, s, toArray, values } from '~utils';

import { $, q } from '$';

const SCHEMA_REGEX = /{%-?\s*schema/;

/**
 * Find the last {% endcomment %} and check that {% schema %}
 * is not contained within. We skip over it in such cases to
 * ensure we are not capturing commented out schema tags in sections.
 */
function SkipSchemaWithinComments (content: string) {

  const length = content.length;

  let searchFrom = 0;

  do {

    searchFrom = content.indexOf('endcomment', searchFrom);

    if (searchFrom === -1) return 0;
    const from = content.lastIndexOf('{%', searchFrom) + 2;
    if (from > -1) {
      const to = content.indexOf('%}', searchFrom + 10);
      if (from > -1 && /-?endcomment-?/.test(content.slice(from, to).trim())) return to + 2;
    }

  } while (searchFrom < length);

  return 0;

}

/**
 * We need to obtain the line number of the {% schema %} tag,
 * for situations were syntax errors are apparent. We need to
 * offset the actual line numbers reported by `@syncify/json`
 * codeframes, this ensure reports are accurate.
 */
function GetSchemaTagLine (content: string) {

  return content.split('\n').length - 1;

}

/**
 * Partial parse to obtain Schema tag indices in a Liquid document.
 * This is used in the runtime definition operations, and also during
 * extraction (below). If `null` is returned, schema tag could not be
 * obtained. The extraction function will perform error reporting.
 */
export function GetSchemaIndices (content: string): {
  /**
   * The index up until `^{% schema %}`
   */
  start: number;
  /**
   * The starting point of the schema JSON `{% schema %}^`
   */
  begin: number;
  /**
   * The ending point of the schema JSON `^{% endschema %}`
   */
  ender: number;
} {

  if (!SCHEMA_REGEX.test(content)) return null;

  const fromIndex = SkipSchemaWithinComments(content);

  let start: number = -1;

  if (fromIndex > -1) {
    start = fromIndex + content.slice(fromIndex).search(SCHEMA_REGEX);
    if (start < 0) return null;
  }

  const begin = content.indexOf('%}', start) + 2;
  const ender = begin + content.slice(begin).search(/{%-?\s*endschema/);

  return { start, begin, ender };
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
 *  after?,  // Content from and after the opening {% endschema %} tag
 * ]
 *
 */
export async function ExtractSchema (file: File): Promise<[
  before: string,
  schema: SchemaSectionTag,
  after?: string,
]> {

  const content = await readFile(file.input, 'utf-8');
  const indices = GetSchemaIndices(content);

  if (indices === null) return [ content, null, null ];

  const { begin, ender } = indices;

  if (ender < 0) {

    log.error('Missing {% endschema %} tag in file.', {
      suffix: file.relative,
      notify: {
        title: `Error in ${file.base}`,
        message: 'Liquid schema tag in section is missing an endschema token'
      }
    });

    return null;

  }

  try {

    const schema = parse<SchemaSectionTag>(content.slice(begin, ender));

    return [
      content.slice(0, begin),
      schema,
      content.slice(ender)
    ];

  } catch (err) {

    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: 'JSON Parse error occurred in the section schema tag'
      }
    });

    err.source = content;
    error.json(err, file, GetSchemaTagLine(content.slice(0, begin)));

    return null;

  }

}

/**
 * Overrides Builder
 *
 * Takes the current schema item and the existing overrides,
 * to compute the new set of overrides for the next level of recursion.
 *
 * @param schema The schema object being processed (can be a setting or a block).
 * @param overrides The computed overrides from the previous levels of recursion.
 * @param type [default: 'setting'] A scoping setting that determines how to process the schema and overrides
 *
 * @returns A new object with updated block or settings overrides.
 */
export function OverridesBuilder (
  schema: SchemaSettings | SchemaBlocks,
  overrides: {
    [key: string]: { label: string; value: string; } | string | object;
    _blocks?: object;
    _settings?: object;
  },
  type: 'block' | 'setting' = 'setting'
) {

  let allowedProps: string[] = [];

  if (type === 'setting') {

    schema = schema as SchemaSettings;

    allowedProps.push('id', 'label', 'info', 'visible_if', 'default', 'options', 'placeholder', 'content');

    if (has('_settings', schema)) {
      schema = merge(schema, schema._settings);
    }

    if (has('_settings', overrides)) {
      overrides = merge(overrides, overrides._settings);
    }

  }

  if (type === 'block') {

    schema = schema as SchemaBlocks;

    allowedProps.push('name', 'type');

    if (has('_blocks', schema)) {
      schema = merge(schema, schema._blocks);
    }

    if (has('_blocks', overrides)) {
      overrides = merge(overrides, overrides._blocks);
    }
  }

  overrides = omit([ '_blocks', '_settings' ], overrides) as typeof overrides;

  for (const [ key, value ] of Object.entries(schema)) {

    if (key === 'type' && value !== 'select' && value !== 'radio' && includes('options', allowedProps)) {
      allowedProps = allowedProps.filter(function (item) {
        return item !== 'options';
      });

      delete overrides.options;
    }

    if (key === 'type' && value !== 'header' && value !== 'paragraph' && includes('content', allowedProps)) {
      allowedProps = allowedProps.filter(function (item) {
        return item !== 'content';
      });

      delete overrides.content;
    }

    if (key === 'type' && (value === 'header' || value === 'paragraph')) {
      allowedProps.forEach(item => {
        if (item !== 'content') {
          delete overrides[item];
        }
      });

      allowedProps.filter(function (item) {
        return item === 'content';
      });
    }

    if (!s(allowedProps).has(key)) {
      delete overrides[key];
      continue;
    }

    if (isNull(value) || isNull(overrides[key])) {

      if (!has(key, overrides)) {
        overrides[key] = value;
      }

      continue;
    }

    if (key === 'visible_if') {
      // This mixes liquid in a string so could be dangerous searching for wildcard '*' values
      continue;
    }

    if (isString(value)) {

      if (!has(key, overrides)) {
        overrides[key] = value;
        continue;
      }

      if (isString(overrides[key]) && overrides[key].includes('*')) {
        overrides[key] = replaceAllOccurrences(overrides[key], '*', value);
      }

      continue;

    }

    if (key === 'options') {

      const override = overrides[key] as { label?: string; value?: string };

      if (isObject(value) && !isArray(value)) {

        const option = value as { label?: string; value?: string };

        if (!has(key, overrides)) {

          overrides[key] = {
            label: option.label ?? '',
            value: option.value ?? ''
          };

          if (!has('default', overrides)) {

            overrides.default = option.value;

          }

          continue;

        }

        if (isObject(override)) {

          if (has('label', override) && isString(override.label) && override.label?.includes('*')) {

            override.label = replaceAllOccurrences(override.label, '*', option.label);

          }

          if (has('value', override) && isString(override.value) && override.value?.includes('*')) {

            override.value = replaceAllOccurrences(override.value, '*', option.value);

            overrides.default = override.value;

          }

        }

        continue;

      }

      if (schema.type === 'select' || schema.type === 'radio') {

        if (isArray(value) && has('options', overrides) && isObject(override)) {

          const options: object[] = [];

          for (let option of value) {

            option = o(option);

            if (has('label', override)) {

              if (isEmpty(override.label)) {

                override.label = '*';

              }

              if (isString(override.label)) {

                if (override.label.includes('*')) {

                  option.label = replaceAllOccurrences(override.label, '*', option.label);

                } else {

                  option.label = override.label;

                }

              };

            }

            if (has('value', override)) {

              if (isEmpty(override.value)) {

                override.value = '*';

              }

              if (isString(override.value)) {

                if (override.value.includes('*')) {

                  option.value = replaceAllOccurrences(override.value, '*', option.value);

                } else {

                  option.value = override.value;

                }

              }

            }

            options.push(option);

          }

          overrides[key] = options;

          continue;

        }

      }

    }

  }

  return o(overrides);

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
export function InjectSettings (file: File, schema: SchemaSettings[], overrides: { [key: string]: any; _blocks?: object; _settings?: object; } = {}) {

  const settings: SchemaSettings[] = [];

  for (let i = 0, s = schema.length; i < s; i++) {

    const settingsOverrides = OverridesBuilder(schema[i], o(overrides), 'setting');

    if (!has('$ref', schema[i])) {

      const setting: SettingsSingleton = o(schema[i]);

      for (const [ key, value ] of Object.entries(settingsOverrides)) {

        if (isNull(value)) {
          delete setting[key];
          continue;
        }

        setting[key] = value;

      };

      settings.push(setting);
      continue;

    }

    const [ key, prop ] = schema[i].$ref.split('.');

    if ($.section.shared.has(key)) {

      const shared = $.section.shared.get(key);

      if (!$.cache.schema[shared.uri].has(file.input)) {

        $.cache.schema[shared.uri].add(file.input);

      }

      if (has(prop, shared.schema)) {

        if (isObject(shared.schema[prop]) && !has('settings', shared.schema[prop])) {

          const setting: SettingsSpread = InjectSettings(file, [ (shared.schema[prop] as SettingsSingleton) ], settingsOverrides);

          settings.push(...(setting));
          continue;

        }

        if (isObject(shared.schema[prop]) && has('settings', shared.schema[prop])) {

          const setting: SettingsSpread = InjectSettings(file, (shared.schema[prop] as SettingsSchema).settings, settingsOverrides);

          settings.push(...(setting));
          continue;

        }

        if (isArray(shared.schema[prop])) {

          for (const item of shared.schema[prop]) {

            if (item.$ref && item.$ref === schema[i].$ref) {

              if ($.mode.build) {

                warn.schema(file, {
                  shared: shared.uri,
                  $ref: schema[i].$ref,
                  schema: 'settings',
                  message: [
                    `Shared Schema reference of ${bold(schema[i].$ref)} was provided.`,
                    'This caused a loop and has been skipped. Please check your provided schema.'
                  ]
                });

              } else {

                log.warn(`shared schema loop detected (skipping this schema): ${bold(schema[i].$ref)}`, file.base);

              }

              continue;

            }

            const setting: SettingsSpread = InjectSettings(file, [ item ] as SettingsSpread, o(settingsOverrides));

            settings.push(...(setting));

          }

          continue;

        }

      } else {

        if ($.mode.build) {

          warn.schema(file, {
            shared: shared.uri,
            $ref: schema[i].$ref,
            schema: 'settings',
            message: [
              `An unknown Shared Schema reference key of ${bold(schema[i].$ref)} was provided.`,
              `There is no such key ${bold(prop)} within the shared schema.`
            ]
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
          schema: 'settings',
          message: [
            `An unknown Shared Schema file reference ${bold(schema[i].$ref)} was provided`,
            `to ${bold('settings')} within section file ${bold(file.base)}. There is no known shared`,
            'schema file using that name.'
          ]
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
export function InjectBlocks (file: File, schema: SchemaBlocks[], overrides: { [key: string]: any; _blocks?: object; _settings?: object; } = {}) {

  const blocks: SchemaBlocks[] = [];

  for (let i = 0, s = schema.length; i < s; i++) {

    const blockOverrides = OverridesBuilder(schema[i], o(overrides), 'block');
    const settingsOverrides = OverridesBuilder(schema[i], o(overrides), 'setting');

    if (!has('$ref', schema[i])) {

      const block = <SchemaBlocks>{};

      for (const prop in schema[i]) {
        if (prop !== 'settings') block[prop] = schema[i][prop];
      }

      if (block.type === '@theme' || block.type === '@app') {
        blocks.push(block);
        continue;
      }

      for (const [ key, value ] of Object.entries(blockOverrides)) {

        if (isNull(value)) {
          delete block[key];
          continue;
        }

        block[key] = value;

      };

      block.settings = [];

      if (has('settings', schema[i])) {
        block.settings = InjectSettings(file, schema[i].settings, settingsOverrides);
      }

      blocks.push(block as BlockSingleton);

      continue;

    }

    const [ key, prop ] = schema[i].$ref.split('.');

    if ($.section.shared.has(key)) {

      const shared = $.section.shared.get(key);

      if (!$.cache.schema[shared.uri].has(file.input)) {

        $.cache.schema[shared.uri].add(file.input);

      }

      if (has(prop, shared.schema)) {

        if (!isArray(shared.schema[prop])) {
          shared.schema[prop] = [ shared.schema[prop] ] as BlockSpread;
        }

        for (let block of shared.schema[prop]) {

          [ block ] = InjectBlocks(file, [ block ] as BlockSpread, { _blocks: blockOverrides, _settings: settingsOverrides });

          blocks.push(block);

        }

      } else {

        if ($.mode.build) {

          warn.schema(file, {
            shared: prop,
            $ref: schema[i].$ref,
            schema: 'blocks',
            message: [
              `An unknown Shared Schema key reference of ${bold(schema[i].$ref)} was provided`,
              `to the ${bold('blocks')} within section file ${bold(file.base)}. The shared schema`,
              `file exists, but the key ${bold(prop)} does not.`
            ]
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
          schema: 'blocks',
          message: [
            `An unknown Shared Schema file reference ${bold(schema[i].$ref)} was provided`,
            `to ${bold('blocks')} within section file ${bold(file.base)}. There is no known shared`,
            'schema file using that name.'
          ]
        });

      } else {
        log.warn(`unknown $ref ${bold(schema[i].$ref)} `, file.base);
      }
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
    const hash = checksum(read);

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

    const schema = parse<SharedSchema>(data.toString());

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

    if (!$.cache.schema[file.input]) {
      $.cache.schema[file.input] = s();
    }

    return $.section.shared.set(file.name, { uri: file.input, schema }).get(file.name);

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: 'JSON Syntax error in shared schema file'
      }
    });

    error.json(e, file);

    return null;

  }

}

/**
 * Create Section
 *
 * Returns re-generated section files with the applied shared schema injects.
 */
export async function CreateSection <T extends SchemaSectionTag> (file: File<T>) {

  const read = await ExtractSchema(file);

  if (read === null) return null;

  const [ before, schema, after ] = read;

  if (schema === null) return before;

  const schemaFiles = values($.cache.schema);

  for (const schemaFile of schemaFiles) {
    schemaFile.delete(file.input);
  }

  const schemaProp = hasProp(schema);

  if (schemaProp('settings')) {
    schema.settings = InjectSettings(file, schema.settings);
  }

  if (schemaProp('blocks')) {
    schema.blocks = InjectBlocks(file, schema.blocks);
  }

  return glue(before.trimEnd(), NWL, minifySchema(schema), NWL, after.trimStart());

}

async function getSchemaFiles (sections: File<SchemaSectionTag>[]) {

  for (let i = 0, s = sections.length; i < s; i++) {

    sections[i].value = await CreateSection(sections[i]);

  }

  return sections;

}

/**
 * Shared Schema Files
 */
export async function SchemaTransform (file: File) {

  const shared = await ParseSharedSchema(file);

  if (shared === null) return null;

  const schemas = toArray($.cache.schema[shared.uri]);
  const sections = await pMap<string, File<SchemaSectionTag>>(schemas, p => {
    return defineProperty(file.data(p), 'data', {
      get () {
        return $.cache.sections[p];
      }
    });
  });

  log.process('Shared Schema', `${sections.length} ${plur('file', sections.length)}`);

  const files = await getSchemaFiles(sections);

  log.nl();

  for (const file of files) {
    switch (file.type) {

      case Type.Section:
      case Type.Block:

        await LiquidTransform(file);
        break;

      case Type.Config:

        await JsonTransform(file);
        break;

    }
  }

  if ($.mode.hot && $.mode.bulk === false) {
    for (const section of files) {
      if (file.type === Type.Section) {
        $.wss.section(section.name);
      } else if (section.type !== Type.Script && section.type !== Type.Style) {
        await q.http.onIdle().then(() => $.wss.replace());
      }
    }
  }
};
