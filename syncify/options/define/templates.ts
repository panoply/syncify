import type { SchemaTemplates } from 'types';

import { basename, join } from 'path';

import { readFile } from 'fs-extra';

import { ARR, capture, gray } from '@syncify/ansi';
import { JSONError, parse } from '@syncify/json';

import { warnOption } from '~cli/warnings';
import { error } from '~errors';
import { setTemplateCache } from '~process/cache';
import { has, values } from '~utils';
import { lastPath } from '~utils/paths';

import { $ } from '$';

function parseJson <T extends SchemaTemplates> (file: string, data: string): T {

  try {

    return parse<T>(data);

  } catch (e) {

    if (e instanceof JSONError) {
      error.json(e, file, 'Runtime failure due to invalid JSON syntax');
    }

    return null;

  }

}

export async function setTemplates () {

  for (const template of [ 'templates', 'customers', 'metaobject' ]) {
    for (const file of $.paths[template].input) {

      if (!file.endsWith('.json')) continue;

      const json = await readFile(file, 'utf8');
      const warn = warnOption('Templates');
      const base = basename(file, '.json');
      const dir = lastPath(file);
      const rel = join(dir, base + '.json');

      if (json.trim().length === 0) {
        warn('empty file', rel);
        continue;
      }

      const data = parseJson(file, json);

      if ($.mode.hot) {

        $.hot.alias[base] = {};

        if (!has('order', data)) continue;

        if (has('sections', data)) {
          for (const alias of data.order) {

            if (has(alias, data.sections)) {
              if (has('type', data.sections[alias])) {

                const { type } = data.sections[alias];

                if (!has(type, $.hot.alias[base])) $.hot.alias[base][type] = [];
                if (!$.hot.alias[base][type].includes(alias)) {
                  $.hot.alias[base][type].push(alias);
                }

              } else {
                warn(`missing "type" in sections ${ARR} ${alias} object`, rel);
              }

            } else {
              warn(`missing "${alias}" in sections object`, rel);
            }
          }
        } else {
          warn(capture.punctuation('order[] requires {sections} object', gray), rel);
        }

      }

      for (const target of values($.target)) {

        setTemplateCache(target.store.domain, target.id, file, data);

      }

    }
  }
}
