import glob from 'fast-glob';
import anymatch from 'anymatch';
import { PATH_KEYS } from 'syncify:const';
import { isArray, isEmpty, isNil, isObject, isString } from 'syncify:utils';
import { normalPath } from 'syncify:utils/paths';
import { typeError, warnOption } from 'syncify:log/throws';
import { $ } from 'syncify:state';
import { ARR } from '@syncify/ansi';
import { SectionPaths } from 'types';

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

  const getGlobs = (key: string, files: string | string[], fallback: string): string[] => {

    if (isNil(files)) return [ path(fallback) ];
    if (isArray<string[]>(files)) return files.map(path);
    if (isString(files)) return [ path(files) ];

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
    if (isObject<SectionPaths>(files)) {

      if (isEmpty(files)) {
        warn(`Undefined path/s on "${key}", using fallback`, '{}');
        return [ path(fallback) ];
      }

      if ('*' in files && '[name]' in files) {

        warn('Multiple fallback rename keys, paths will be merged', '"*" and "[name]"');

        if (isArray(files['*'])) {

          if (isArray(files['[name]'])) {
            files['*'] = [ ...files['*'], ...files['[name]'] ];
          } else if (isString(files['[name]'])) {
            files['*'].push(files['[name]']);
          }

          delete files['[name]'];

        } else if (isArray(files['[name]'])) {

          if (isArray(files['*'])) {
            files['[name]'] = [ ...files['[name]'], ...files['*'] ];
          } else if (isString(files['*'])) {
            files['[name]'].push(files['*']);
          }

          delete files['*'];

        }
      }

      const global: Map<string, Set<string>> = new Map();
      const rename: Map<string, Set<string>> = new Map();

      for (const pattern in files) {

        if (isArray<string[]>(files[pattern])) {

          const model = (pattern === '*' || pattern === '[name]')
            ? global.has(pattern)
              ? global.get(pattern)
              : global.set(pattern, new Set()).get(pattern)
            : rename.has(pattern)
              ? rename.get(pattern)
              : rename.set(pattern, new Set()).get(pattern);

          for (let i = 0, s = files[pattern].length; i < s; i++) {
            const glob = path(files[pattern][i]);
            $.watch.add(glob);
            model.add(glob);
          }

        } else if (isString(files)) {

          (pattern === '*' || pattern === '[name]')
            ? global.has(pattern)
              ? global.get(pattern).add(path(files[pattern]))
              : global.set(pattern, new Set([ path(files[pattern]) ]))
            : rename.has(pattern)
              ? rename.get(pattern).add(path(files[pattern]))
              : rename.set(pattern, new Set([ path(files[pattern]) ]));

        } else if (isNil(files[pattern])) {

          typeError({
            option: `paths ${ARR} ${key}`,
            expects: 'string | string[]',
            provided: files[pattern],
            name: pattern
          });

        }
      }

      const entries = [ ...global.values() ].flatMap(globs => [ ...globs ]);

      for (const [ pattern, globs ] of rename) {
        const spread = [ ...globs.values() ];
        entries.push(...spread);
        $.paths[key].rename.push([ anymatch(spread), pattern ]);
      }

      return entries;

    } else {

      return getGlobs(key, files as string | string[], fallback);

    }
  };

  // Loop through each path type
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

    if (key !== 'metafields' && key !== 'redirects') {

      for (const p of paths) {

        const globs = await glob.async(paths, { cwd: $.cwd });

        $.watch.add(p);

        for (let i = 0, s = globs.length; i < s; i++) {
          $.paths[key].input.add(globs[i]);
          $.watch.add(globs[i]);
        }
      }
    }
  }

}
