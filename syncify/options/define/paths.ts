import type { Path, Rename } from '@syncify/types/config/paths';

import { basename, join, sep } from 'node:path';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import { pathExists } from 'fs-extra';

import * as _ from '@syncify/ansi';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { PATH_KEYS, THEME_PATHS } from '~const';
import { setPathCache } from '~process/cache';
import { forEach, isArray, isEmpty, isNil, isString, keys, o, s, toArray } from '~utils';
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

  if (!(await pathExists($.dirs.input))) {
    return throws(
      [
        `Failed to obtain resolution of the ${_.bold('input')} base directory.`,
        'The path does not exist or the directory is empty.' + NLR,
        `${_.BAD} ${_.bold.underline($.dirs.input.replace($.cwd, '').slice(1))}**`
      ]
      , [ `Check that the ${_.cyan(basename($.dirs.input))} directory can be resolved.` ]
      , 'Missing input directory'
    );
  }

  const getUri = normalPath($.dirs.input);
  const warn = warnOption('paths');

  for (const path of PATH_KEYS) {

    let paths: string[] = [];

    if (
      path === 'snippets' ||
      path === 'sections') {

      // snippets and sections accepts object rename structures
      //
      paths = setRenamePaths(path, `${path}/*`);

    } else if (
      path === 'customers' ||
      path === 'metaobject') {

      // These paths as defaults are sudirectories of the themes templates
      //
      paths = setBaseUri(path, $.config.paths[path], `templates/${path}/*`);

    } else if (
      path === 'schema' ||
      path === 'blogs' ||
      path === 'files' ||
      path === 'metafields' ||
      path === 'navigation' ||
      path === 'pages' ||
      path === 'policies') {

      // Plus paths are extended references which default to a + prefix
      //
      paths = setBaseUri(path, $.config.paths[path], `+/${path}/*`);

    } else {

      // all other paths with either be glob string or glob array
      //
      paths = setBaseUri(path, $.config.paths[path], `${path}/*`);

    }

    $.paths[path].config = paths;
    $.paths[path].match = anymatch(paths);

    const globs = await glob.async(paths, { cwd: $.cwd });

    if ($.paths[path].input === null) {
      $.paths[path].input = s(globs);
    } else {
      forEach(x => $.paths[path].input.add(x), globs);
    }

  }

  q.cache.add(async () => {
    for (const [ key, dir ] of THEME_PATHS) {
      const path = $.paths[key];
      for (const input of path.input) {
        const output = join($.dirs.output, dir, basename(input));
        await setPathCache(input, output, path.rename);
      }
    }
  });

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Determines the path value type and applies resolution if required.
   * A path value can be a string, arrays or object. Paths can also accept
   * additional stash references.
   */
  function setBaseUri (name: string, files: Path, fallback: string): string[] {

    if (isNil(files)) {

      return getUri(fallback);

    } else if (isString(files)) {

      return [ getUri(files) ];

    } else if (isArray<string[]>(files)) {

      return getUri(files);

    }

    throws.typeError({
      option: 'paths',
      expects: 'string | string[]',
      provided: files,
      name
    });

  }

  /**
   * An analysis of Rename Paths - Performs globbing and auto-applies patterns for
   * paths which use ranme patterns.
   */
  function setRenamePaths (name: 'sections' | 'snippets', fallback: string): string[] {

    const files = $.config.paths[name];

    if (isEmpty(files)) {
      warn(`Undefined path/s on "${name}", using fallback`, '{}');
      return [ getUri(fallback) ];
    }

    if (isArray(files)) return getUri(files);
    if (isString(files)) return [ getUri(fallback) ];

    const config: Rename = o({ ...files });
    const entries = Object.entries(config);
    const transformed: { [key: string]: string[] } = {};
    const allPatterns: { pattern: string, key: string, generality: number, isExclusion: boolean }[] = [];

    try {

      for (const [ key, patterns ] of entries) {
        transformed[key] = [];
        if (isArray(patterns)) {
          for (const pattern of patterns) {
            getPattern(key, pattern);
          }
        } else {
          getPattern(key, patterns);
        }
      }

      // If no patterns, return fallback
      if (allPatterns.length === 0) return [ getUri(fallback) ];

      // Step 2: Generate transformed object
      const patternOwners = new Map<string, { key: string, specificity: number }>();

      // Assign ownership based on specificity (inclusions only)
      for (const { pattern, key, isExclusion } of allPatterns) {
        if (!isExclusion) {
          const specificity = getGlobSpecific(pattern);
          const existing = patternOwners.get(pattern);
          if (!existing || specificity > existing.specificity) {
            patternOwners.set(pattern, { key, specificity });
          }
        }
      }

      // Build transformed object
      for (const [ key, patterns ] of entries) {

        const inclusions: string[] = [];
        const exclusions: Set<string> = new Set();

        // Process input patterns
        for (const pattern of patterns as string[]) {
          if (pattern.startsWith('!')) {
            exclusions.add(`!${getUri(pattern.slice(1))}`);
          } else {

            // Only include if owned by this key and not excluded in this key
            const isExcludedHere = (patterns as string[]).some(p => p.startsWith('!') && p.slice(1) === pattern);

            if (patternOwners.get(pattern)?.key === key && !isExcludedHere) {
              inclusions.push(getUri(pattern));
            }
          }
        }

        // Add exclusions for more specific patterns from other keys
        for (const [ otherPattern, owner ] of patternOwners) {
          if (owner.key !== key) {
            for (const pattern of patterns as string[]) {
              if (!pattern.startsWith('!')) {
                if (
                  anymatch(pattern, otherPattern) &&
                  getGlobSpecific(otherPattern) > getGlobSpecific(pattern)
                ) {
                  const excludePath = `!${getUri(otherPattern)}`;
                  exclusions.add(excludePath);
                }
              }
            }
          }
        }

        transformed[key].push(...toArray(exclusions).sort(), ...inclusions.sort());

      }

      $.paths[name].rename = keys(transformed).map(pattern => ({
        pattern,
        match: anymatch(transformed[pattern])
      }));

      // Step 4: Find general pattern(s) (inclusions only)
      const inclusionPatterns = allPatterns.filter(p => !p.isExclusion).sort((a, b) => b.generality - a.generality);
      const generalPatterns: string[] = [];
      const coveredPatterns = s<string>();

      for (const { pattern, generality } of inclusionPatterns) {
        if (!coveredPatterns.has(pattern)) {
          let isGeneral = true;
          for (const other of inclusionPatterns) {
            if (other.pattern !== pattern && !coveredPatterns.has(other.pattern)) {
              if (anymatch(pattern, other.pattern)) {
                coveredPatterns.add(other.pattern);
              } else if (generality === other.generality && !anymatch(other.pattern, pattern)) {
                continue;
              } else if (generality < other.generality && !anymatch(other.pattern, pattern)) {
                isGeneral = false;
                break;
              }
            }
          }
          if (isGeneral && !generalPatterns.includes(getUri(pattern))) {
            generalPatterns.push(getUri(pattern));
            coveredPatterns.add(pattern);
          }
        }
      }

      return generalPatterns.length > 0 ? generalPatterns.sort() : [ getUri(fallback) ];

    } catch (error) {

      warn(`Error processing rename paths for "${name}": ${error.message}`, '{}');

      return [ getUri(fallback) ];

    }

    /**
     * Generate pattern model for analysis
     */
    function getPattern (key: string, pattern: string) {
      const isExclusion = pattern.startsWith('!');
      const cleanPattern = isExclusion ? pattern.slice(1) : pattern;
      allPatterns.push({
        pattern: cleanPattern,
        key,
        generality: getGlobGeneral(cleanPattern),
        isExclusion
      });
    };

    /**
     * Specificity helper (for transformed object)
     */
    function getGlobSpecific (glob: string): number {
      const segments = glob.split(sep).filter(Boolean);
      let score = segments.length;
      if (glob.includes('**')) score -= 1;
      if (/\.[a-z]+$/.test(glob)) score += 1;
      return score;
    }

    /**
     * Generality helper (for return value)
     */
    function getGlobGeneral (glob: string): number {
      const segments = glob.split(sep).filter(Boolean);
      let score = 0;
      if (glob.includes('**')) score += 2;
      if (glob.includes('*')) score += 1;
      score -= segments.length;
      if (/\.[a-z]+$/.test(glob)) score -= 2;
      return score;
    }
  }
}
