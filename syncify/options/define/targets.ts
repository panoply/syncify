import { basename } from 'node:path';

import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';

import { runtime } from '~cli/runtime';
import { eqWS, has, keys, murmur, s } from '~utils';

import { $ } from '$';

/**
 * Generate the entry per-sync model which represents each theme
 * configuration reference.
 */
function syncTheme (storeName: string, themeTarget: string, themeId: number) {

  return {
    target: themeTarget,
    id: themeId,
    role: 'unknown',
    uid: murmur(storeName, themeId),
    get gid () { return `gid://shopify/OnlineStoreTheme/${this.id}`; },
    get store () { return $.stores.get(storeName); },
    get preview () { return `https://${this.store.domain}?preview_theme_id=${this.id}`; },
    get editor () { return `https://${this.store.domain}/admin/themes/${this.id}/editor`; }
  };

}

/**
 * Set Targets
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 *
 * **RUNTIME CALLS**
 *
 * This function will trigger:
 *
 * - {@link runtime.startup}
 */
export async function setTargets () {

  if ($.target.length === 1 || $.cmd.target.length === 0) {
    runtime.stores();
    return;
  }

  const duplicate = s<number>();
  const ambiguous = s<string>();

  for (const cmd of $.cmd.target) {

    const col = cmd.indexOf(':');

    // Store name prefix expessed,
    //
    // -T store-name:foo-theme
    // -T store-name:foo-theme,bar-theme,baz-theme
    // -T :foo-theme
    //
    if (col > -1) {

      const storeName = cmd.slice(0, col).trim();
      const themes = cmd.slice(col + 1).split(',');

      // Target a theme in all stores
      if (storeName === '') {

        /** When no store or theme target can be found */
        let exists = false;

        for (const themeTarget of themes) {

          duplicate.clear();

          for (const store of $.stores) {
            if (has(themeTarget, store.themes)) {
              exists = true;
              const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);
              if (duplicate.has(target.id)) {
                duplicateThemeTarget(target.id, store.name);
              } else {
                $.target.push(target);
                duplicate.add(target.id);
              }
            }
          }
        }

        if (!exists) {
          invalidTarget({ type: 'theme', provided: themes.join(',') });
        }

      } else {

        if (!$.stores.has(storeName)) {
          invalidTarget({ type: 'store', provided: storeName });
        }

        const store = $.stores.get(storeName);

        for (const themeTarget of themes) {
          if (has(themeTarget, store.themes)) {

            const target = syncTheme(store.name, themeTarget, store.themes[themeTarget]);

            if (duplicate.has(target.id)) {
              duplicateThemeTarget(target.id, store.name);
            } else {
              $.target.push(target);
              duplicate.add(target.id);
            }
          } else {
            invalidTarget({
              type: 'theme',
              provided: themeTarget,
              storeName
            });
          }
        }
      }
    } else {

      // Either a store and all store themes or a theme
      //
      // -T store-1
      // -T foo-theme
      // -T foo-theme,bar-theme
      // -T store-1,store-2
      //
      const targets = cmd.split(',');

      for (const value of targets) {

        // We are targeting a store and store themes
        //
        if ($.stores.has(value)) {

          for (const theme in $.stores.get(value).themes) {
            const target = syncTheme(value, theme, $.stores.get(value).themes[theme]);
            if (duplicate.has(target.id)) {
              duplicateThemeTarget(target.id, target.store.name);
            } else {
              $.target.push(target);
              duplicate.add(target.id);
            }
          }

        } else {

          /** When no store or theme target can be found */
          let exists = false;

          // Lets attempt to find the theme in store we are targeting
          //
          for (const store of $.stores) {
            if (has(value, store.themes)) {
              const target = syncTheme(store.name, value, store.themes[value]);
              if (duplicate.has(target.id)) {
                duplicateThemeTarget(target.id, store.name);
              } else {
                if (ambiguous.has(value)) {
                  ambiguousThemeTarget(value);
                } else {
                  $.target.push(syncTheme(store.name, value, store.themes[value]));
                  ambiguous.add(value);
                  duplicate.add(target.id);
                  exists = true;
                }
              }
            }
          }

          if (!exists) {
            invalidTarget({ type: 'theme', provided: value });
          }

        }

      }
    }
  }

  runtime.stores();

};

/* -------------------------------------------- */
/* ERRORS                                       */
/* -------------------------------------------- */

/**
 * Ambiguous Target
 *
 * Throws if command line argument expression is referencing a theme
 * name that can result in repeat targets. Reaching this error would
 * mean that targets take a structure like:
 *
 * ```json
 * {
 *   "store-1": {
 *     "example": 1234567890
 *   },
 *   "store-2": {
 *     "example": 0987654321
 *   }
 * }
 * ```
 *
 * If the user was to pass the following target command:
 *
 * ```bash
 * $ sy watch -T example
 * ```
 *
 * Then this error will be thrown, because it is unclear of the exact
 * theme that should be targeted, because both `store-1` and `store-2`
 * use the same name.
 *
 * ```bash
 * │ AMBIGUOUS THEME TARGET
 * │
 * │ The theme target name "example" is an ambiguous reference and used
 * │ by multiple stores in this project. Syncify is unable to determine
 * │ which theme you wish interface.
 * │
 * │ Prefix command with store name/s:
 * │
 * │ provided: -T example
 * │ expected: -T store-1:example
 * │
 * │ Use a glob star * prefix to instruct Syncify to target all stores:
 * │
 * │ provided: -T example
 * │ expected: -T :example
 * ```
 */
function ambiguousThemeTarget (target: string) {

  const expected = $.stores
  .filter(({ themes }) => target in themes)
  .map(({ name }) => `${name}${_.COL}${target}`)
  .join(WSP);

  const alias = _.capture.dash($.argv.some(value => value === '--target') ? '--target' : '-T', _.gray);
  const message = [
    `The theme target name "${_.cyan(target)}" is an ambiguous reference and used`,
    'by multiple stores in this project. Syncify is unable to determine which theme you wish interface'
  ];

  _.Create({ type: 'error' })
  .Newline('line')
  .Append('AMBIGUOUS THEME TARGET', _.bold)
  .Wrap(message)
  .Header('Prefix command with store name/s' + _.COL)
  .Line(`${_.bold('provided')}${_.COL} ${_.yellowBright(`${alias} ${target}`)}`)
  .Line(`${_.bold('expected')}${_.COL} ${_.blueBright(`${alias} ${expected}`)}`)
  .Header(`Use an empty colon ${_.cyan(':')} prefix to instruct Syncify to target all stores${_.COL}`)
  .Line(`${_.bold('provided')}${_.COL} ${_.yellowBright(`${alias} ${target}`)}`)
  .Line(`${_.bold('expected')}${_.COL} ${_.blueBright(`${alias} :${_.COL}${target}`)}`)
  .Newline('line')
  .End($.log.group)
  .toLog()
  .Break();

  kill.exit(2);

}

/**
 * Invalid Target
 *
 * Throws an error when an invalid command expression was passed.
 * Determined by the `-T` (or `--target`) argument.
 *
 * ```
 * │ INVALID THEME TARGET
 * │
 * │ The theme target "name" is either undefined or unknown. Please provide
 * │ One or more valid theme targets as defined in your package.json:
 * │
 * │ — foo
 * │ — bar
 * │ — baz
 * │
 * │ How to fix?
 * │ Check for typos in the theme target name. If you intended to use this target,
 * │ ensure it is properly defined and associated or connect it using sy setup.
 * ```
 */
export function invalidTarget ({
  type,
  provided,
  storeName = null
}: {
  type: 'theme' | 'store';
  provided: string;
  storeName?: string
}) {

  const targets = $.file.targets === null
    ? 'package.json'
    : basename($.file.targets);

  const message = storeName ? [
    `The ${_.bold(storeName)} ${type} has no theme "${_.bold.redBright(provided)}" target defined.`,
    `Provide one or more valid ${storeName} theme target/s as defined in your ${targets} file:`
  ] : [
    `The ${type} target "${_.bold.redBright(provided)}" is either undefined or unknown.`,
    `Provide one or more valid ${type} target/s as defined in your ${targets} file:`
  ];

  const solution = [
    `Check for typos in the ${type} target name. If you intended to use this target`,
    `ensure it is properly defined and associated or use ${_.blue('sy setup')} to connect it.`
  ];

  const expected = storeName
    ? keys($.stores.get(storeName).themes).map(name => `${_.DSH} ${_.redBright(name)}`)
    : type === 'store'
      ? $.stores.map(({ name }) => `${_.DSH} ${_.redBright(name)}`)
      : $.stores.flatMap(({ themes }) => keys(themes).map(name => `${_.DSH} ${_.redBright(name)}`));

  _.Create({ type: 'error' })
  .Newline('line')
  .Append(`INVALID ${type.toUpperCase()} TARGET`, _.bold)
  .Wrap(message)
  .Newline()
  .Multiline(expected)
  .Newline()
  .Line('How to fix?', _.gray.bold)
  .Wrap(solution, _.gray)
  .Newline('line')
  .End($.log.group)
  .toLog()
  .Break();

  kill.exit(2);

}

/**
 * Duplicate Theme Targets
 *
 * Throws an error when the theme id is defined on multiple theme targets
 *
 * ```
 * │ DUPLICATE THEME TARGET
 * │
 * │ Theme id (1234567890) is using multiple target name references.
 * │
 * │ {
 * │   "store-name": {
 * │     "foo": 1234567890, ✕ matches "baz"
 * │     "bar": 0987654321,
 * │     "baz": 1234567890  ✕ matches "foo"
 * │   }
 * │ }
 * │
 * │ How to fix?
 * │ Remove target occurrences which point to the same theme id defined
 * │ on the "store-name" store in your package.json file.
 * ```
 */
export function duplicateThemeTarget (id: number, store: string) {

  const write = _.Create({ type: 'error' })
  .Newline('line')
  .Append('DUPLICATE THEME TARGET', _.bold)
  .Wrap(`Theme id (${_.cyan(id)}) is using multiple target name references.`)
  .Newline()
  .Line(_.gray('{'))
  .Line(`  "${store}": {`, _.gray);

  const targets = $.file.targets === null ? 'package.json' : basename($.file.targets);
  const themes = $.stores.get(store).themes;
  const eq = eqWS(themes, { padding: 1 });
  const last = keys(themes).pop();
  const solution = [
    'Remove target occurrences which point to the same theme id defined',
    `on the "${_.blue(store)}" store in your ${_.bold(targets)} file.`
  ];

  for (const p in themes) {
    const c = last === p ? '' : ',';
    write.Line(
      themes[p] === id
        ? `    ${_.redBright(`"${p}": ${themes[p]}`)}${c + eq(p) + _.BAD} ${_.red.bold('duplicate id')}`
        : `    "${p}": ${themes[p] + c}`,
      _.gray
    );
  }

  write
  .Line(_.gray('  }'))
  .Line(_.gray('}'))
  .Newline()
  .Line('How to fix?', _.gray.bold)
  .Wrap(solution, _.gray)
  .Newline()
  .End($.log.group)
  .toLog()
  .Break();

  kill.exit(2);

}
