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

      let resolved: number = 0;

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

      const global: [ string?, string[]? ] = [];
      const rename: Array<[string, string[]]> = [];

      for (const pattern in files) {

        if (isArray<string[]>(files[pattern])) {

          const value: [ string, string[] ] = [
            pattern,
            files[pattern].map(p => {
              const v = path(p);
              $.watch.add(v);
              return v;
            })
          ];

          if (resolved === 0) resolved = value[1].length;

          if (pattern === '*' || pattern === '[name]') {
            global.push(...value);
          } else {
            rename.push(value);
          }

        } else if (isString(files)) {

          const value: [ string, string[] ] = [ pattern, [ path(files[pattern]) ] ];

          if (resolved === 0) resolved = value[1].length;

          $.watch.add(value[1]);

          if (pattern === '*' || pattern === '[name]') {
            global.push(...value);
          } else {
            rename.push(value);
          }

        } else if (isNil(files[pattern])) {

          typeError({
            option: `paths ${ARR} ${key}`,
            expects: 'string | string[]',
            provided: files[pattern],
            name: pattern
          });

        }
      }

      if (resolved === 0) {
        warn(`Unresolved path/s in "${key}"`, '{}');
        return [ path(fallback) ];
      }

      $.paths[key].rename = [ [ anymatch(global[1]), global[0] ] ];

      for (const [ pattern, globs ] of rename) {

        $.paths[key].rename.push([
          anymatch([ ...global[1].map(p => p[0] !== '!' ? `!${p}` : p), ...globs ]),
          pattern
        ]);

      }

      return global[1].concat(rename.flatMap((value) => value[1]));

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
