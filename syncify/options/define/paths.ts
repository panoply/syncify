import type { PathsType } from '@syncify/types/config/paths';

import { join } from 'node:path';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import { CustomStash, RenamePaths } from 'types';

import { ARR, BAD, bold, white, yellowBright } from '@syncify/ansi';

import { throwError, typeError, warnOption } from '~cli/throws';
import { PATH_KEYS, THEME_KEYS } from '~const';
import { setPathCache } from '~process/cache';
import { parse } from '~process/files';
import { isArray, isEmpty, isNil, isNumber, isObject, isString, m, s, toArray } from '~utils';
import { normalPath } from '~utils/paths';

import { $, q } from '$';

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user defines the
 * build directory input in directory paths it will ensure it is formed correctly.
 */
export async function setPaths () {

  const path = normalPath($.dirs.input);
  const warn = warnOption('paths');

  const setStash = (key: string, files: string[], stash: CustomStash = null) => {

    if (key === 'schema' || key === 'metafields' || key === 'redirects') return;

    if (stash !== null) {

      const isNum = isNumber(stash.stash);
      const index = 'index' in stash
        ? stash.index
        : isNum ? stash.stash as number : 0;

      const val = isNum ? '*' : stash.stash === true ? 'stash' : stash.stash;
      const uri = files[index];

      if (uri[0] === '!') {
        throwError([
          'custom stash uri is referencing an ignored glob pattern'
        ], [
          'Change the stash value to a path which is not an ignore'
        ]);
      }

      if (val === '*') {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, '');
      } else if (val === 'stash') {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, '/stash');
      } else {
        $.stash[key] = uri.replace(/\/\*{1,2}.*$/, '/' + (val as string).replace(/^\//, '') as string);
      }

    } else {

      const value = files.find(p => p[0] !== '!');
      $.stash[key] = value ? value.replace(/\/\*{1,2}.*$/, '') : join($.cwd, 'stash');

    }

  };

  const getGlobs = (key: string, files: PathsType, fallback: string): string[] => {

    if (isNil(files)) {
      const fb = [ path(fallback) ];
      setStash(key, fb);
      return fb;
    } else if (isString(files)) {
      const str = [ path(files) ];
      setStash(key, str);
      return str;
    } else if (isArray<string[]>(files)) {

      if (isObject(files[files.length - 1])) {
        const stashed = files.pop() as unknown as CustomStash;
        const resolve = files.map(path);
        setStash(key, resolve, stashed);
        return resolve;
      }

      const resolve = files.map(path);
      setStash(key, resolve);
      return resolve;

    }

    typeError({
      option: 'paths',
      expects: 'string | string[]',
      provided: files,
      name: key
    });

  };

  const renameGlobs = (key: 'sections' | 'snippets', fallback: string): string[] => {

    const files = $.config.paths[key];

    // sections and snippets accept glob rename objects, so we need to
    // do a little extra work in order to find resolution correctly.
    if (isObject<RenamePaths>(files)) {

      if (isEmpty(files)) {
        warn(`Undefined path/s on "${key}", using fallback`, '{}');
        return [ path(fallback) ];
      }

      if ('*' in files && '[name]' in files) {

        warn('Multiple fallback rename keys, paths will be merged', '"*" and "[name]"');

        if (isArray(files['*'])) {

          if (isObject(files['*'][files['*'].length - 1])) {
            const stashed = files['*'].pop() as unknown as CustomStash;
            const resolve = files['*'].map(path);
            setStash(key, resolve, stashed);
          }

          if (isArray(files['[name]'])) {
            files['*'] = files['*'].concat(files['[name]']);
          } else if (isString(files['[name]'])) {
            files['*'].push(files['[name]']);
          }

          delete files['[name]'];

        } else if (isArray(files['[name]'])) {

          if (isObject(files['[name]'][files['[name]'].length - 1])) {
            const stashed = files['[name]'].pop() as unknown as CustomStash;
            const resolve = files['[name]'].map(path);
            setStash(key, resolve, stashed);
          }

          if (isArray(files['*'])) {
            files['[name]'] = files['[name]'].concat(files['*']);
          } else if (isString(files['*'])) {
            files['[name]'].push(files['*']);
          }

          delete files['*'];

        }
      }

      const global: Map<string, Set<string>> = m();
      const rename: Map<string, Set<string>> = m();

      let stash: string[] = [];

      for (const pattern in files) {

        if (isArray<string[]>(files[pattern])) {

          if ($.stash[key] === null) {
            if (isObject(files[pattern][files[pattern].length - 1])) {
              const stashed = files[pattern].pop() as unknown as CustomStash;
              const resolve = files[pattern].map(path);
              setStash(key, resolve, stashed);
            } else {
              stash = stash.concat(files[pattern].map(path));
            }
          }

          if (pattern === '*' || pattern === '[name]') {
            global.set(pattern, s(files[pattern].map(path)));
          } else {
            rename.set(pattern, s(files[pattern].map(path)));
          }

        } else if (isString(files[pattern])) {

          if ($.stash[key] === null) {
            stash.push(path(files[pattern]));
          }

          (pattern === '*' || pattern === '[name]')
            ? global.has(pattern)
              ? global.get(pattern).add(path(files[pattern]))
              : global.set(pattern, s([ path(files[pattern]) ]))
            : rename.has(pattern)
              ? rename.get(pattern).add(path(files[pattern]))
              : rename.set(pattern, s([ path(files[pattern]) ]));

        } else if (isNil(files[pattern])) {

          typeError({
            option: `paths ${ARR} ${key}`,
            expects: 'string | string[]',
            provided: files[pattern],
            name: pattern
          });

        }
      }

      if ($.stash[key] === null) {
        setStash(key, stash);
      }

      const globals = toArray(global.values()).flatMap(globs => toArray(globs));
      const entries = globals;

      for (const [ pattern, paths ] of rename) {

        const spread = toArray(paths);
        const match = anymatch(spread);

        if (match(globals)) {

          const value: string[] = [];

          if (isArray(files[pattern])) {
            for (const p of files[pattern]) value.push(`${BAD} ${bold(p)}`);
          } else {
            value.push(`${BAD} ${bold(files[pattern])}`);
          }

          throwError([
            'Mixed global and rename path patterns defined which will result in resolution collisions.',
            `The paths provided to ${yellowBright(key)} ${ARR} ${yellowBright(pattern)} overlap with the globals.`,
            NLR,
            `${value.join(NWL)}`
          ], [
            `Provide a verbose pattern on the ${yellowBright.bold('*')} global, which resolve to directory level.`,
            `Both global and rename paths accept ${white('string[]')} types, so this error can`,
            'be easily fixed.'
          ]);

        } else {

          $.paths[key].rename.push([
            match,
            pattern
          ]);

        }

        entries.push(...spread);

      }

      const ignores = s(entries.filter(p => p.startsWith('!')).map(p => p.slice(1)));
      const find = s(entries);

      entries.forEach((p, i) => {
        if (ignores.has(p)) {
          find.delete(`!${p}`);
        }
      });

      return [ ...find ];

    } else {

      return getGlobs(key, files as string | string[], fallback);

    }
  };

  for (const key of PATH_KEYS) {

    let paths: string[] = [];

    if (key === 'snippets' || key === 'sections') {

      // snippets and sections accepts object rename structures
      paths = renameGlobs(key, `${key}/*`);

    } else if (key === 'customers' || key === 'metaobject') {

      // These paths as defaults are sudirectories of the themes templates
      paths = getGlobs(key, $.config.paths[key], `templates/${key}/*`);

    } else {

      // all other paths with either be glob string or glob array
      paths = getGlobs(key, $.config.paths[key], `${key}/*`);

    }

    $.paths[key].match = anymatch(paths);

    const globs = await glob.async(paths, { cwd: $.cwd });

    if (key !== 'metafields' && key !== 'redirects') {

      if ($.paths[key].input === null) {

        $.paths[key].input = s(globs);

      } else {

        for (let i = 0, s = globs.length; i < s; i++) {

          $.paths[key].input.add(globs[i]);

        }

      }
    }
  }

  q.cache.add(() => {

    for (const prop of THEME_KEYS) {
      for (const uri of $.paths[prop].input) {

        const file = parse(uri);

        if (file) {
          setPathCache(file.input, file.output);
        }
      }
    }

  });

}
