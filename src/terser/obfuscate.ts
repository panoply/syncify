/**
 * Class Expression
 *
 * Matches CSS class names and comments
 */
const Regex = /\/\*[\s\S]*?\*\/|\.([\w-]*)\b(?=[^{}]*{)/g;

/**
 * Parse Class names
 *
 * Used when `obfuscate` is `true`. Classes are
 * parsed with a regular expression. In later versions
 * CSS files will be walked opposed to the current approach.
 *
 * The return value will be passed to the typings generator
 * which creates a declaration of the class names.
 */
export function parseClasses (css: string) {

  let className: RegExpExecArray;
  let ignored: number = 0;

  const remove = new Set(Array.from(config.types.values()));
  const before = Number(remove.size);
  const exclude = config.ignoredClasses;

  while ((className = Regex.exec(css)) !== null) {
    if (className.index === Regex.lastIndex) Regex.lastIndex++;
    if (config.types.has(className[1])) remove.delete(className[1]);
    else if (exclude && exclude.test(className[1])) ignored++;
    else if (!config.types.has(className[1])) config.types.add(className[1]);
  }

  if (ignored > 0) {
    info(ignored > 1
      ? `${ignored} class selectors were ignored`
      : `${ignored} class selector was ignored`);
  }

  if (remove.size === config.types.size) return false;

  if (config.types.size > before) {
    const plural = config.types.size - before;
    log(plural > 1
      ? `${plural} class selectors were added to mcss.d.ts`
      : `${plural} class selector was added to mcss.d.ts`);

  }

  if (remove.size > 0) {
    const plural = remove.size;
    warn(
      plural > 1
        ? `${plural} class selectors were removed from mcss.d.ts`
        : `${plural} class selector was removed from mcss.d.ts`
    );

    for (const name of remove.values()) config.types.delete(name);

  }

  remove.clear();

  return Array.from(config.types.values());

}

/**
 * Obfuscate class names
 */
export function obfuscateClasses (css: string) {

  const exclude = config.ignoredClasses;
  const options = { alphabet: config.opts.alphabet, length: 1, index: 0 };

  return css.replace(Regex, (match: string, className: string) => {

    if (!className) return match;
    if (exclude && exclude.test(className)) return className;
    if (config.maps?.[className]) return '.' + config.maps[className];

    let name: string;
    do name = generateShortName(options); while (/^[0-9-].*$/.test(name));

    config.maps[className] = name;

    return '.' + name;

  });

};

/**
 * Generates an obfuscation class name mapping.
 * In order to offset complications in build modes,
 * this will be executed after existing watch mode.
 */
export function createObfuscationMap () {

  const options = { alphabet: config.opts.alphabet, length: 1, index: 0 };
  const map = {};

  for (const className of config.types) {
    if (map[className]) continue;

    let name: string;

    do name = generateShortName(options);
    while (/^[0-9-].*$/.test(name));

    map[className] = name;

  }

  return writeJSONSync(config.cachePath, map);

}

/**
 * Gets the short name obfuscated class name
 */
function generateShortName (options: {
  alphabet: string;
  index: number;
  length: number;
}) {

  let str = '';
  let idx = options.length - 1;

  for (; idx >= 0; idx--) {
    const x = Math.pow(config.opts.alphabet.length, idx);
    const n = Math.floor(options.index / x);
    str += options.alphabet[n % options.alphabet.length];
  }

  options.index++;

  if (options.index > Math.pow(options.alphabet.length, options.length) - 1) {
    options.length++;
    options.index = 0;
  }

  return str;

};
