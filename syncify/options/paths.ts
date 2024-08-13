import glob from 'fast-glob';
import anymatch from 'anymatch';
import { dirname, join } from 'pathe';
import { PATH_KEYS } from 'syncify:const';
import { isArray, hasProp } from 'syncify:utils';
import { lastPath, normalPath } from 'syncify:utils/paths';
// import { warnOption } from 'syncify:log/throws';
import { $ } from 'syncify:state';

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function setPaths () {

  // Path normalize,
  const path = normalPath($.dirs.input);
  // const warn = warnOption('Path Resolution');
  const has = hasProp($.config.paths);

  // iterate over the defined path mappings
  for (const key of PATH_KEYS) {

    let uri: string[];

    if (key === 'customers') {

      uri = has(key)
        ? isArray($.config.paths[key])
          ? ($.config.paths[key] as string[]).map(path)
          : [ path($.config.paths[key]) ]
        : [ path('templates/customers/*') ];

    } else if (key === 'metaobject') {

      uri = has(key)
        ? isArray($.config.paths[key])
          ? ($.config.paths[key] as string[]).map(path)
          : [ path($.config.paths[key]) ]
        : [ path('templates/metaobject/*') ];

    } else if (key === 'schema') {

      uri = has(key)
        ? isArray($.config.paths[key])
          ? ($.config.paths[key] as string[]).map(path)
          : [ path($.config.paths[key]) ]
        : [ path('schema/*') ];

    } else if (has(key)) {

      uri = isArray($.config.paths[key])
        ? ($.config.paths[key] as string[]).map(path)
        : [ path($.config.paths[key]) ];

      if (key === 'snippets') {

        for (const p of uri) {
          $.snippet.baseDir.add(lastPath(dirname(p)));
        }

      } else if (key === 'sections') {

        for (const p of uri) {
          $.section.baseDir.add(lastPath(dirname(p)));
        }

      } else if (key === 'assets') {

        uri.push(join($.dirs.output, 'assets/*'));

      }

    } else if (key === 'redirects' && has(key)) {

      uri = [ join($.cwd, $.config.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    for (const p of uri) {

      if (key !== 'metafields' && key !== 'redirects') {

        const paths = await glob(p, { cwd: $.cwd });

        if (paths.length === 0) {

          if (key === 'assets' && p === join($.dirs.output, 'assets/*')) continue;

          // warn('No files could be resolved in', relative($.cwd, p));

        } else {

          // We will create the set if null
          // otherwise we iterate and populate the set.
          //
          if ($.paths[key].input === null) {
            $.paths[key].input = new Set(paths);
          } else {
            for (const entry of paths) {
              $.paths[key].input.add(entry);
            }
          }

          // TODO
          // IMPROVE THIS LOGIC
          //
          $.watch.add(p);

        }

      }

      $.paths[key].match = anymatch(uri);

    }

  }

}
